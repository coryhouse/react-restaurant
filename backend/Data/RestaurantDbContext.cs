using Microsoft.EntityFrameworkCore;
using RestaurantApi.Models;

namespace RestaurantApi.Data;

public class RestaurantDbContext : DbContext
{
    public RestaurantDbContext(DbContextOptions<RestaurantDbContext> options)
        : base(options)
    {
    }

    public DbSet<Food> Foods { get; set; }
    public DbSet<Order> Orders { get; set; }
    public DbSet<OrderItem> OrderItems { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        var tagsProperty = modelBuilder.Entity<Food>()
            .Property(f => f.Tags)
            .HasConversion(
                v => System.Text.Json.JsonSerializer.Serialize(v, (System.Text.Json.JsonSerializerOptions?)null),
                v => System.Text.Json.JsonSerializer.Deserialize<string[]>(v, (System.Text.Json.JsonSerializerOptions?)null) ?? Array.Empty<string>()
            )
        .HasColumnType("nvarchar(max)");

        modelBuilder.Entity<Food>()
            .Property(f => f.Price)
            .HasPrecision(10, 2);

        modelBuilder.Entity<Food>().HasData(FoodData.GetSeedData());

        modelBuilder.Entity<Order>()
            .Property(o => o.Subtotal)
            .HasPrecision(10, 2);

        modelBuilder.Entity<Order>()
            .Property(o => o.Tax)
            .HasPrecision(10, 2);

        modelBuilder.Entity<Order>()
            .Property(o => o.DeliveryFee)
            .HasPrecision(10, 2);

        modelBuilder.Entity<Order>()
            .Property(o => o.Total)
            .HasPrecision(10, 2);

        modelBuilder.Entity<Order>()
            .HasMany(o => o.Items)
            .WithOne(i => i.Order)
            .HasForeignKey(i => i.OrderId)
            .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<OrderItem>()
            .Property(i => i.Price)
            .HasPrecision(10, 2);
    }
}
