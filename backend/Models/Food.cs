namespace RestaurantApi.Models;

public record Food(
    int Id,
    string Name,
    string Image,
    decimal Price,
    string Description,
    string[] Tags
);
