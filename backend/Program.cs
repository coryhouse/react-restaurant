using Microsoft.EntityFrameworkCore;
using RestaurantApi.Data;
using RestaurantApi.Models;

var apiPort = Environment.GetEnvironmentVariable("API_PORT")
    ?? throw new InvalidOperationException("API_PORT environment variable is required");
var frontendUrl = Environment.GetEnvironmentVariable("FRONTEND_URL")
    ?? throw new InvalidOperationException("FRONTEND_URL environment variable is required");

var builder = WebApplication.CreateBuilder(args);

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection")
    ?? throw new InvalidOperationException("Connection string 'DefaultConnection' not found.");

builder.Services.AddDbContext<RestaurantDbContext>(options =>
    options.UseSqlServer(connectionString));

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins(frontendUrl)
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

builder.WebHost.ConfigureKestrel(options =>
{
    options.ListenLocalhost(int.Parse(apiPort));
});

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<RestaurantDbContext>();
    dbContext.Database.Migrate();
}

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowFrontend");

app.MapGet("/api/v1/foods", async (RestaurantDbContext db) =>
{
    var foods = await db.Foods.ToListAsync();
    return Results.Ok(foods);
})
.WithName("GetFoods")
.Produces<List<Food>>(StatusCodes.Status200OK);

app.MapGet("/api/v1/foods/{id:int}", async (int id, RestaurantDbContext db) =>
{
    var food = await db.Foods.FindAsync(id);
    return food is not null ? Results.Ok(food) : Results.NotFound();
})
.WithName("GetFood")
.Produces<Food>(StatusCodes.Status200OK)
.Produces(StatusCodes.Status404NotFound);

app.MapPost("/api/v1/foods", async (Food food, RestaurantDbContext db) =>
{
    db.Foods.Add(food);
    await db.SaveChangesAsync();
    return Results.Created($"/api/v1/foods/{food.Id}", food);
})
.WithName("CreateFood")
.Produces<Food>(StatusCodes.Status201Created)
.Produces(StatusCodes.Status400BadRequest);

app.MapPut("/api/v1/foods/{id:int}", async (int id, Food updatedFood, RestaurantDbContext db) =>
{
    var food = await db.Foods.FindAsync(id);
    if (food is null)
        return Results.NotFound();

    food.Name = updatedFood.Name;
    food.Image = updatedFood.Image;
    food.Price = updatedFood.Price;
    food.Description = updatedFood.Description;
    food.Tags = updatedFood.Tags;

    await db.SaveChangesAsync();
    return Results.Ok(food);
})
.WithName("UpdateFood")
.Produces<Food>(StatusCodes.Status200OK)
.Produces(StatusCodes.Status404NotFound)
.Produces(StatusCodes.Status400BadRequest);

app.MapDelete("/api/v1/foods/{id:int}", async (int id, RestaurantDbContext db) =>
{
    var food = await db.Foods.FindAsync(id);
    if (food is null)
        return Results.NotFound();

    db.Foods.Remove(food);
    await db.SaveChangesAsync();
    return Results.NoContent();
})
.WithName("DeleteFood")
.Produces(StatusCodes.Status204NoContent)
.Produces(StatusCodes.Status404NotFound);

app.MapGet("/health", () => Results.Ok("Healthy"))
    .WithName("HealthCheck");

app.Run();
