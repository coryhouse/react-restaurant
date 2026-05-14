using Microsoft.EntityFrameworkCore;
using RestaurantApi.Contracts;
using RestaurantApi.Data;
using RestaurantApi.Models;

var apiPort = Environment.GetEnvironmentVariable("API_PORT")
    ?? throw new InvalidOperationException("API_PORT environment variable is required");
var frontendUrl = Environment.GetEnvironmentVariable("FRONTEND_URL")
    ?? throw new InvalidOperationException("FRONTEND_URL environment variable is required");

var builder = WebApplication.CreateBuilder(args);

builder.Configuration.AddJsonFile(
    $"appsettings.{builder.Environment.EnvironmentName}.local.json",
    optional: true,
    reloadOnChange: true);

if (!builder.Environment.IsEnvironment("Testing"))
{
    var connectionString = builder.Configuration.GetConnectionString("DefaultConnection")
        ?? throw new InvalidOperationException("Connection string 'DefaultConnection' not found.");

    builder.Services.AddDbContext<RestaurantDbContext>(options =>
        options.UseSqlServer(connectionString));
}

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
    if (dbContext.Database.IsSqlServer())
    {
        dbContext.Database.Migrate();
    }
    else
    {
        dbContext.Database.EnsureCreated();
    }
}

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowFrontend");

app.MapGet("/foods", async (RestaurantDbContext db) =>
{
    var foods = await db.Foods.ToListAsync();
    return Results.Ok(foods);
})
.WithName("GetFoods")
.Produces<List<Food>>(StatusCodes.Status200OK);

app.MapGet("/foods/{id:int}", async (int id, RestaurantDbContext db) =>
{
    var food = await db.Foods.FindAsync(id);
    return food is not null ? Results.Ok(food) : Results.NotFound();
})
.WithName("GetFood")
.Produces<Food>(StatusCodes.Status200OK)
.Produces(StatusCodes.Status404NotFound);

app.MapPost("/foods", async (Food food, RestaurantDbContext db) =>
{
    db.Foods.Add(food);
    await db.SaveChangesAsync();
    return Results.Created($"/foods/{food.Id}", food);
})
.WithName("CreateFood")
.Produces<Food>(StatusCodes.Status201Created)
.Produces(StatusCodes.Status400BadRequest);

app.MapPut("/foods/{id:int}", async (int id, Food updatedFood, RestaurantDbContext db) =>
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

app.MapDelete("/foods/{id:int}", async (int id, RestaurantDbContext db) =>
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

const decimal TaxRate = 0.0825m;
const decimal DeliveryFee = 9.99m;

app.MapPost("/checkout", async (CheckoutRequest request, RestaurantDbContext db) =>
{
    if (request.Items.Count == 0)
    {
        return Results.BadRequest(new { message = "At least one item is required." });
    }

    var foodIds = request.Items.Select(i => i.FoodId).Distinct().ToList();
    var foods = await db.Foods
        .Where(f => foodIds.Contains(f.Id))
        .ToDictionaryAsync(f => f.Id);

    var missingFoodIds = foodIds.Where(id => !foods.ContainsKey(id)).ToList();
    if (missingFoodIds.Count > 0)
    {
        return Results.BadRequest(new { message = "One or more items are invalid.", invalidFoodIds = missingFoodIds });
    }

    var orderItems = request.Items.Select(item =>
    {
        var food = foods[item.FoodId];
        return new OrderItem
        {
            Id = Guid.NewGuid(),
            FoodId = food.Id,
            FoodName = food.Name,
            FoodImage = food.Image,
            Price = food.Price,
            Quantity = item.Quantity
        };
    }).ToList();

    var subtotal = orderItems.Sum(item => item.Price * item.Quantity);
    var tax = decimal.Round(subtotal * TaxRate, 2, MidpointRounding.AwayFromZero);
    var total = subtotal + tax + DeliveryFee;

    var order = new Order
    {
        Id = Guid.NewGuid(),
        OrderNumber = $"ORD-{DateTime.UtcNow:yyyyMMdd}-{Guid.NewGuid().ToString("N")[..6].ToUpperInvariant()}",
        CustomerName = request.CustomerName,
        CustomerEmail = request.CustomerEmail,
        CustomerPhone = request.CustomerPhone,
        AddressLine1 = request.AddressLine1,
        AddressLine2 = request.AddressLine2,
        City = request.City,
        State = request.State,
        ZipCode = request.ZipCode,
        Country = "US",
        Subtotal = subtotal,
        Tax = tax,
        DeliveryFee = DeliveryFee,
        Total = total,
        PaymentStatus = "PENDING",
        CreatedAt = DateTime.UtcNow,
        Items = orderItems
    };

    db.Orders.Add(order);
    await db.SaveChangesAsync();

    var sessionId = $"cs_test_{Guid.NewGuid():N}";
    var checkoutUrl = $"{frontendUrl}/checkout/success?session_id={Uri.EscapeDataString(sessionId)}";

    return Results.Ok(new CheckoutResponse(
        SessionId: sessionId,
        Url: checkoutUrl,
        OrderId: order.Id.ToString()
    ));
})
.WithName("CreateCheckout")
.Produces<CheckoutResponse>(StatusCodes.Status200OK)
.Produces(StatusCodes.Status400BadRequest);

app.MapGet("/orders/{id:guid}", async (Guid id, RestaurantDbContext db) =>
{
    var order = await db.Orders
        .Include(o => o.Items)
        .SingleOrDefaultAsync(o => o.Id == id);

    if (order is null)
    {
        return Results.NotFound();
    }

    return Results.Ok(new OrderResponse(
        Id: order.Id.ToString(),
        OrderNumber: order.OrderNumber,
        CustomerName: order.CustomerName,
        CustomerEmail: order.CustomerEmail,
        CustomerPhone: order.CustomerPhone,
        AddressLine1: order.AddressLine1,
        AddressLine2: order.AddressLine2,
        City: order.City,
        State: order.State,
        ZipCode: order.ZipCode,
        Country: order.Country,
        Items: order.Items.Select(item => new OrderItemResponse(
            Id: item.Id.ToString(),
            FoodId: item.FoodId.ToString(),
            FoodName: item.FoodName,
            FoodImage: item.FoodImage,
            Price: item.Price,
            Quantity: item.Quantity
        )).ToList(),
        Subtotal: order.Subtotal,
        Tax: order.Tax,
        Total: order.Total,
        PaymentStatus: order.PaymentStatus,
        PaymentMethod: order.PaymentMethod,
        CreatedAt: order.CreatedAt
    ));
})
.WithName("GetOrderById")
.Produces<OrderResponse>(StatusCodes.Status200OK)
.Produces(StatusCodes.Status404NotFound);

app.MapGet("/health", () => Results.Ok("Healthy"))
    .WithName("HealthCheck");

app.Run();

public partial class Program { }
