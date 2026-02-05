using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace RestaurantApi.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Foods",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Image = table.Column<string>(type: "nvarchar(200)", maxLength: 200, nullable: false),
                    Price = table.Column<decimal>(type: "decimal(10,2)", precision: 10, scale: 2, nullable: false),
                    Description = table.Column<string>(type: "nvarchar(500)", maxLength: 500, nullable: false),
                    Tags = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Foods", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "Foods",
                columns: new[] { "Id", "Description", "Image", "Name", "Price", "Tags" },
                values: new object[,]
                {
                    { 1, "This ain't your average burger. Topped with our tangy cheddar cheese sauce, fresh lettuce, and tomato.", "burger.jpg", "Burger", 8.99m, "[\"Lunch\",\"Dinner\",\"Spicy\"]" },
                    { 2, "Delicious french toast with banana and blueberry.", "banana-french-toast.jpg", "Banana Blueberry French Toast", 9.99m, "[\"Breakfast\"]" },
                    { 3, "Creole-style pasta that's guaranteed to make you sweat.", "cajun-pasta.jpg", "Cajun Pasta", 16.99m, "[\"Lunch\",\"Dinner\",\"Spicy\"]" },
                    { 4, "Delicious assortment of locally-sourced meats, cheeses, and spreads.", "charcuterie.jpg", "Charcuterie Board", 14.99m, "[\"Appetizer\"]" },
                    { 5, "Heavenly cheesecake with a sweet raspberry topping.", "cheesecake.jpg", "Raspberry Cheesecake", 7.99m, "[\"Dessert\"]" },
                    { 6, "Our outrageous chicken sandwich topped with pickled onions and jalapenos.", "chicken-slammer.jpg", "Chicken Slammer", 11.99m, "[\"Lunch\",\"Dinner\",\"Spicy\"]" },
                    { 7, "Decadent chocolate pudding topped with chocolate cookies, chocolate frosting, and whipped cream.", "death-by-chocolate.jpg", "Death by Chocolate", 8.99m, "[\"Dessert\"]" },
                    { 8, "Delicious assortment of unique donuts. Guaranteed to please!", "donuts.jpg", "Pile 'O Donuts", 6.99m, "[\"Dessert\"]" },
                    { 9, "Spiced meatballs served with a rich tomato sauce.", "italian-meatballs.jpg", "Italian Meatballs", 13.99m, "[\"Dinner\"]" },
                    { 10, "Delicious lamb chop topped with a Mango chutney.", "lamb-chop.jpg", "Lamb Chop", 19.99m, "[\"Dinner\"]" },
                    { 11, "Creamy Mango-flavored delight, served ice cold.", "mango-lassi.jpg", "Mango Lassi", 4.99m, "[\"Drink\"]" },
                    { 12, "A refreshing minty cocktail.", "mojito.jpg", "Mojito", 6.99m, "[\"Drink\",\"Alcoholic\"]" },
                    { 13, "A classic cocktail with a twist.", "old-fashioned.jpg", "Old Fashioned", 7.99m, "[\"Drink\",\"Alcoholic\"]" },
                    { 14, "Delicious whole wheat pasta topped with our zesty pesto sauce.", "pesto-bowtie-pasta.jpg", "Pesto Bowtie Pasta", 12.99m, "[\"Lunch\",\"Dinner\"]" },
                    { 15, "Our homemade thin-crust pizza topped with BBQ chicken and our house cheese blend.", "pizza.jpg", "BBQ Chicken Pizza", 14.99m, "[\"Lunch\",\"Dinner\"]" },
                    { 16, "Thick-cut Pork Chop with a sweet apple glaze.", "pork-chop.jpg", "Pork Chop", 16.99m, "[\"Dinner\"]" },
                    { 17, "Delicious bowl of ramen with pork and vegetables.", "ramen.jpg", "Pork Ramen", 11.99m, "[\"Lunch\",\"Dinner\"]" },
                    { 18, "Fresh salad topped with grilled salmon, mixed vegetables, and our house vinaigrette.", "salmon-salad.jpg", "Salmon Salad", 14.99m, "[\"Lunch\",\"Dinner\",\"Vegetarian\"]" },
                    { 19, "Seared salmon steak topped with a sweet mango glaze.", "salmon.jpg", "Salmon Steak", 18.99m, "[\"Dinner\"]" },
                    { 20, "Delicious chicken tacos with a spicy mango salsa.", "street-tacos.jpg", "Chicken Street Tacos", 9.99m, "[\"Lunch\",\"Dinner\",\"Spicy\"]" },
                    { 21, "Fresh grilled veggies on our homemade toasted sourdough.", "veggie-sammy.jpg", "Veggie Sammy", 8.99m, "[\"Lunch\",\"Dinner\",\"Vegetarian\"]" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Foods");
        }
    }
}
