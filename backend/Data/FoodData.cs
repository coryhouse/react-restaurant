using RestaurantApi.Models;

namespace RestaurantApi.Data;

public static class FoodData
{
    public static List<Food> GetAllFoods() => new()
    {
        new Food(
            Id: 1,
            Name: "Burger",
            Image: "burger.jpg",
            Price: 8.99m,
            Description: "This ain't your average burger. Topped with our tangy cheddar cheese sauce, fresh lettuce, and tomato.",
            Tags: new[] { "Lunch", "Dinner", "Spicy" }
        ),
        new Food(
            Id: 2,
            Name: "Banana Blueberry French Toast",
            Image: "banana-french-toast.jpg",
            Price: 9.99m,
            Description: "Delicious french toast with banana and blueberry.",
            Tags: new[] { "Breakfast" }
        ),
        new Food(
            Id: 3,
            Name: "Cajun Pasta",
            Image: "cajun-pasta.jpg",
            Price: 16.99m,
            Description: "Creole-style pasta that's guaranteed to make you sweat.",
            Tags: new[] { "Lunch", "Dinner", "Spicy" }
        ),
        new Food(
            Id: 4,
            Name: "Charcuterie Board",
            Image: "charcuterie.jpg",
            Price: 14.99m,
            Description: "Delicious assortment of locally-sourced meats, cheeses, and spreads.",
            Tags: new[] { "Appetizer" }
        ),
        new Food(
            Id: 5,
            Name: "Raspberry Cheesecake",
            Image: "cheesecake.jpg",
            Price: 7.99m,
            Description: "Heavenly cheesecake with a sweet raspberry topping.",
            Tags: new[] { "Dessert" }
        ),
        new Food(
            Id: 6,
            Name: "Chicken Slammer",
            Image: "chicken-slammer.jpg",
            Price: 11.99m,
            Description: "Our outrageous chicken sandwich topped with pickled onions and jalapenos.",
            Tags: new[] { "Lunch", "Dinner", "Spicy" }
        ),
        new Food(
            Id: 7,
            Name: "Death by Chocolate",
            Image: "death-by-chocolate.jpg",
            Price: 8.99m,
            Description: "Decadent chocolate pudding topped with chocolate cookies, chocolate frosting, and whipped cream.",
            Tags: new[] { "Dessert" }
        ),
        new Food(
            Id: 8,
            Name: "Pile 'O Donuts",
            Image: "donuts.jpg",
            Price: 6.99m,
            Description: "Delicious assortment of unique donuts. Guaranteed to please!",
            Tags: new[] { "Dessert" }
        ),
        new Food(
            Id: 9,
            Name: "Italian Meatballs",
            Image: "italian-meatballs.jpg",
            Price: 13.99m,
            Description: "Spiced meatballs served with a rich tomato sauce.",
            Tags: new[] { "Dinner" }
        ),
        new Food(
            Id: 10,
            Name: "Lamb Chop",
            Image: "lamb-chop.jpg",
            Price: 19.99m,
            Description: "Delicious lamb chop topped with a Mango chutney.",
            Tags: new[] { "Dinner" }
        ),
        new Food(
            Id: 11,
            Name: "Mango Lassi",
            Image: "mango-lassi.jpg",
            Price: 4.99m,
            Description: "Creamy Mango-flavored delight, served ice cold.",
            Tags: new[] { "Drink" }
        ),
        new Food(
            Id: 12,
            Name: "Mojito",
            Image: "mojito.jpg",
            Price: 6.99m,
            Description: "A refreshing minty cocktail.",
            Tags: new[] { "Drink", "Alcoholic" }
        ),
        new Food(
            Id: 13,
            Name: "Old Fashioned",
            Image: "old-fashioned.jpg",
            Price: 7.99m,
            Description: "A classic cocktail with a twist.",
            Tags: new[] { "Drink", "Alcoholic" }
        ),
        new Food(
            Id: 14,
            Name: "Pesto Bowtie Pasta",
            Image: "pesto-bowtie-pasta.jpg",
            Price: 12.99m,
            Description: "Delicious whole wheat pasta topped with our zesty pesto sauce.",
            Tags: new[] { "Lunch", "Dinner" }
        ),
        new Food(
            Id: 15,
            Name: "BBQ Chicken Pizza",
            Image: "pizza.jpg",
            Price: 14.99m,
            Description: "Our homemade thin-crust pizza topped with BBQ chicken and our house cheese blend.",
            Tags: new[] { "Lunch", "Dinner" }
        ),
        new Food(
            Id: 16,
            Name: "Pork Chop",
            Image: "pork-chop.jpg",
            Price: 16.99m,
            Description: "Thick-cut Pork Chop with a sweet apple glaze.",
            Tags: new[] { "Dinner" }
        ),
        new Food(
            Id: 17,
            Name: "Pork Ramen",
            Image: "ramen.jpg",
            Price: 11.99m,
            Description: "Delicious bowl of ramen with pork and vegetables.",
            Tags: new[] { "Lunch", "Dinner" }
        ),
        new Food(
            Id: 18,
            Name: "Salmon Salad",
            Image: "salmon-salad.jpg",
            Price: 14.99m,
            Description: "Fresh salad topped with grilled salmon, mixed vegetables, and our house vinaigrette.",
            Tags: new[] { "Lunch", "Dinner", "Vegetarian" }
        ),
        new Food(
            Id: 19,
            Name: "Salmon Steak",
            Image: "salmon.jpg",
            Price: 18.99m,
            Description: "Seared salmon steak topped with a sweet mango glaze.",
            Tags: new[] { "Dinner" }
        ),
        new Food(
            Id: 20,
            Name: "Chicken Street Tacos",
            Image: "street-tacos.jpg",
            Price: 9.99m,
            Description: "Delicious chicken tacos with a spicy mango salsa.",
            Tags: new[] { "Lunch", "Dinner", "Spicy" }
        ),
        new Food(
            Id: 21,
            Name: "Veggie Sammy",
            Image: "veggie-sammy.jpg",
            Price: 8.99m,
            Description: "Fresh grilled veggies on our homemade toasted sourdough.",
            Tags: new[] { "Lunch", "Dinner", "Vegetarian" }
        )
    };
}
