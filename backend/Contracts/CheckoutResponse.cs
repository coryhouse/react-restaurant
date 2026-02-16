namespace RestaurantApi.Contracts;

public record CheckoutResponse(
    string SessionId,
    string Url,
    string OrderId
);
