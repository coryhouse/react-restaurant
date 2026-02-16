namespace RestaurantApi.Contracts;

public record OrderResponse(
    string Id,
    string OrderNumber,
    string CustomerName,
    string CustomerEmail,
    string? CustomerPhone,
    string AddressLine1,
    string? AddressLine2,
    string City,
    string State,
    string ZipCode,
    string Country,
    List<OrderItemResponse> Items,
    decimal Subtotal,
    decimal Tax,
    decimal Total,
    string PaymentStatus,
    string? PaymentMethod,
    DateTime CreatedAt
);

public record OrderItemResponse(
    string Id,
    string FoodId,
    string FoodName,
    string FoodImage,
    decimal Price,
    int Quantity
);
