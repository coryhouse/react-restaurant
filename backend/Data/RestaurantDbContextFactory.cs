using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace RestaurantApi.Data;

public class RestaurantDbContextFactory : IDesignTimeDbContextFactory<RestaurantDbContext>
{
    public RestaurantDbContext CreateDbContext(string[] args)
    {
        var optionsBuilder = new DbContextOptionsBuilder<RestaurantDbContext>();
        optionsBuilder.UseSqlServer("Server=localhost,1433;Database=RestaurantDb;User Id=sa;Password=YourStrong@Passw0rd;TrustServerCertificate=true;");

        return new RestaurantDbContext(optionsBuilder.Options);
    }
}
