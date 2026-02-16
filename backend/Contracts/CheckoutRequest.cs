using System.ComponentModel.DataAnnotations;

namespace RestaurantApi.Contracts;

public class CheckoutRequest
{
    [Required]
    [StringLength(100)]
    public string CustomerName { get; set; } = string.Empty;

    [Required]
    [EmailAddress]
    [StringLength(255)]
    public string CustomerEmail { get; set; } = string.Empty;

    [StringLength(30)]
    public string? CustomerPhone { get; set; }

    [Required]
    [StringLength(200)]
    public string AddressLine1 { get; set; } = string.Empty;

    [StringLength(200)]
    public string? AddressLine2 { get; set; }

    [Required]
    [StringLength(100)]
    public string City { get; set; } = string.Empty;

    [Required]
    [StringLength(2, MinimumLength = 2)]
    public string State { get; set; } = string.Empty;

    [Required]
    [StringLength(10)]
    public string ZipCode { get; set; } = string.Empty;

    [Required]
    [MinLength(1)]
    public List<CheckoutItemRequest> Items { get; set; } = [];
}

public class CheckoutItemRequest
{
    public int FoodId { get; set; }

    [Required]
    [StringLength(100)]
    public string FoodName { get; set; } = string.Empty;

    [Required]
    [StringLength(200)]
    public string FoodImage { get; set; } = string.Empty;

    public decimal Price { get; set; }

    [Range(1, int.MaxValue)]
    public int Quantity { get; set; }
}
