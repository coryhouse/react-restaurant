using RestaurantApi.Data;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:3000")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

builder.WebHost.ConfigureKestrel(options =>
{
    options.ListenLocalhost(5000);
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowFrontend");

app.MapGet("/api/v1/foods", () =>
{
    var foods = FoodData.GetAllFoods();
    return Results.Ok(foods);
})
.WithName("GetFoods")
.WithOpenApi();

app.MapGet("/health", () => Results.Ok("Healthy"))
    .WithName("HealthCheck")
    .WithOpenApi();

app.Run();
