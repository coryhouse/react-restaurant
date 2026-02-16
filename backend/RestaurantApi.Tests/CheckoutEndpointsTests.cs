using System.Net;
using System.Net.Http.Json;
using System.Text.Json.Nodes;
using Xunit;

namespace RestaurantApi.Tests;

public class CheckoutEndpointsTests : IClassFixture<TestWebApplicationFactory>
{
    private readonly HttpClient _client;

    public CheckoutEndpointsTests(TestWebApplicationFactory factory)
    {
        _client = factory.CreateClient();
    }

    [Fact]
    public async Task PostCheckout_CreatesPendingOrder_AndGetOrderReturnsSnapshottedValues()
    {
        var checkoutPayload = new
        {
            customerName = "Casey Jones",
            customerEmail = "casey@example.com",
            customerPhone = "555-123-4567",
            addressLine1 = "123 Main St",
            addressLine2 = "Apt 4",
            city = "New York",
            state = "NY",
            zipCode = "10001",
            items = new[]
            {
                new
                {
                    foodId = 1,
                    foodName = "Wrong Frontend Name",
                    foodImage = "wrong-image.jpg",
                    price = 0.01m,
                    quantity = 2
                }
            }
        };

        var checkoutResponse = await _client.PostAsJsonAsync("/checkout", checkoutPayload);
        checkoutResponse.EnsureSuccessStatusCode();

        var checkoutJson = await checkoutResponse.Content.ReadFromJsonAsync<JsonObject>();
        Assert.NotNull(checkoutJson);

        var orderId = checkoutJson!["orderId"]!.GetValue<string>();
        var sessionId = checkoutJson["sessionId"]!.GetValue<string>();
        var url = checkoutJson["url"]!.GetValue<string>();

        Assert.True(Guid.TryParse(orderId, out _));
        Assert.StartsWith("cs_test_", sessionId);
        Assert.Equal($"http://localhost:5173/checkout/success?session_id={sessionId}", url);

        var orderResponse = await _client.GetAsync($"/orders/{orderId}");
        orderResponse.EnsureSuccessStatusCode();
        var orderJson = await orderResponse.Content.ReadFromJsonAsync<JsonObject>();
        Assert.NotNull(orderJson);

        Assert.Equal("PENDING", orderJson!["paymentStatus"]!.GetValue<string>());
        Assert.Equal("US", orderJson["country"]!.GetValue<string>());
        Assert.Equal(17.98m, orderJson["subtotal"]!.GetValue<decimal>());
        Assert.Equal(1.48m, orderJson["tax"]!.GetValue<decimal>());
        Assert.Equal(29.45m, orderJson["total"]!.GetValue<decimal>());

        var items = orderJson["items"]!.AsArray();
        Assert.Single(items);

        var item = items[0]!.AsObject();
        Assert.Equal("1", item["foodId"]!.GetValue<string>());
        Assert.Equal("Burger", item["foodName"]!.GetValue<string>());
        Assert.Equal("burger.jpg", item["foodImage"]!.GetValue<string>());
        Assert.Equal(8.99m, item["price"]!.GetValue<decimal>());
        Assert.Equal(2, item["quantity"]!.GetValue<int>());
    }

    [Fact]
    public async Task PostCheckout_WithInvalidFoodId_ReturnsBadRequest()
    {
        var checkoutPayload = new
        {
            customerName = "Casey Jones",
            customerEmail = "casey@example.com",
            addressLine1 = "123 Main St",
            city = "New York",
            state = "NY",
            zipCode = "10001",
            items = new[]
            {
                new
                {
                    foodId = 999999,
                    foodName = "Ghost Dish",
                    foodImage = "ghost.jpg",
                    price = 9.99m,
                    quantity = 1
                }
            }
        };

        var response = await _client.PostAsJsonAsync("/checkout", checkoutPayload);
        Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
    }

    [Fact]
    public async Task GetOrder_WithUnknownId_ReturnsNotFound()
    {
        var response = await _client.GetAsync($"/orders/{Guid.NewGuid()}");
        Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
    }
}
