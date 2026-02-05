using RestaurantApi.Data;

var apiPort = Environment.GetEnvironmentVariable("API_PORT")
    ?? throw new InvalidOperationException("API_PORT environment variable is required");
var frontendUrl = Environment.GetEnvironmentVariable("FRONTEND_URL")
    ?? throw new InvalidOperationException("FRONTEND_URL environment variable is required");

var builder = WebApplication.CreateBuilder(args);

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
.WithName("GetFoods");

app.MapGet("/health", () => Results.Ok("Healthy"))
    .WithName("HealthCheck");

app.Run();
