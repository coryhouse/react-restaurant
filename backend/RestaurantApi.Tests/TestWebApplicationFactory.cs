using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using RestaurantApi.Data;
using Testcontainers.MsSql;
using Xunit;

namespace RestaurantApi.Tests;

public sealed class TestWebApplicationFactory : WebApplicationFactory<Program>, IAsyncLifetime
{
    private readonly MsSqlContainer _msSqlContainer = new MsSqlBuilder("mcr.microsoft.com/mssql/server:2022-latest").Build();

    public async Task InitializeAsync()
    {
        await _msSqlContainer.StartAsync();
    }

    public new async Task DisposeAsync()
    {
        await _msSqlContainer.DisposeAsync();
        await base.DisposeAsync();
    }

    protected override void ConfigureWebHost(IWebHostBuilder builder)
    {
        Environment.SetEnvironmentVariable("API_PORT", "5000");
        Environment.SetEnvironmentVariable("FRONTEND_URL", "http://localhost:5173");

        builder.UseEnvironment("Testing");

        builder.ConfigureServices(services =>
        {
            var existingDbContextOptions = services.SingleOrDefault(d =>
                d.ServiceType == typeof(DbContextOptions<RestaurantDbContext>));
            if (existingDbContextOptions is not null)
            {
                services.Remove(existingDbContextOptions);
            }

            services.AddDbContext<RestaurantDbContext>(options =>
                options.UseSqlServer(_msSqlContainer.GetConnectionString()));

            using var scope = services.BuildServiceProvider().CreateScope();
            var db = scope.ServiceProvider.GetRequiredService<RestaurantDbContext>();
            db.Database.Migrate();
        });
    }
}
