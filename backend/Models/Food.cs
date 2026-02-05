using System.ComponentModel.DataAnnotations;

namespace RestaurantApi.Models;

public class Food
{
    public int Id { get; set; }

    [Required]
    [StringLength(100)]
    public string Name { get; set; } = string.Empty;

    [Required]
    [StringLength(200)]
    public string Image { get; set; } = string.Empty;

    [Required]
    [Range(0.01, 9999.99)]
    public decimal Price { get; set; }

    [Required]
    [StringLength(500)]
    public string Description { get; set; } = string.Empty;

    [Required]
    public string[] Tags { get; set; } = Array.Empty<string>();
}
