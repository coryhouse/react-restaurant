# .NET Backend API Specification

## Overview

Create a .NET 9 Minimal API in the `backend/` folder that serves restaurant food data.

## Technical Stack

- **.NET Version**: 9
- **API Style**: Minimal APIs
- **Project Name**: RestaurantApi
- **Port**: 5000

## Endpoints

### GET /api/v1/foods

Returns all food items as a JSON array.

**Response**: `200 OK`

```json
[
  {
    "id": 1,
    "name": "Burger",
    "image": "burger.jpg",
    "price": 8.99,
    "description": "This ain't your average burger...",
    "tags": ["Lunch", "Dinner", "Spicy"]
  }
]
```

### GET /health

Health check endpoint.

**Response**: `200 OK` with `"Healthy"`

## Data Model

```csharp
public record Food(
    int Id,
    string Name,
    string Image,
    decimal Price,
    string Description,
    string[] Tags
);
```

**Note**: IDs converted from db.json format ("1a" → 1, "2a" → 2, etc.)

## Features

| Feature | Included |
|---------|----------|
| Swagger/OpenAPI | Yes |
| CORS (localhost:5173) | Yes |
| Health check | Yes |
| Ratings endpoint | Future (separate endpoint) |

## Food Data (Hardcoded)

21 items total, converted from frontend/db.json (IDs converted: "1a" → 1, "2a" → 2, etc.):

```json
[
  {
    "id": 1,
    "name": "Burger",
    "image": "burger.jpg",
    "price": 8.99,
    "description": "This ain't your average burger. Topped with our tangy cheddar cheese sauce, fresh lettuce, and tomato.",
    "tags": ["Lunch", "Dinner", "Spicy"]
  },
  {
    "id": 2,
    "name": "Banana Blueberry French Toast",
    "image": "banana-french-toast.jpg",
    "price": 9.99,
    "description": "Delicious french toast with banana and blueberry.",
    "tags": ["Breakfast"]
  },
  {
    "id": 3,
    "name": "Cajun Pasta",
    "image": "cajun-pasta.jpg",
    "price": 16.99,
    "description": "Creole-style pasta that's guaranteed to make you sweat.",
    "tags": ["Lunch", "Dinner", "Spicy"]
  },
  {
    "id": 4,
    "name": "Charcuterie Board",
    "image": "charcuterie.jpg",
    "price": 14.99,
    "description": "Delicious assortment of locally-sourced meats, cheeses, and spreads.",
    "tags": ["Appetizer"]
  },
  {
    "id": 5,
    "name": "Raspberry Cheesecake",
    "image": "cheesecake.jpg",
    "price": 7.99,
    "description": "Heavenly cheesecake with a sweet raspberry topping.",
    "tags": ["Dessert"]
  },
  {
    "id": 6,
    "name": "Chicken Slammer",
    "image": "chicken-slammer.jpg",
    "price": 11.99,
    "description": "Our outrageous chicken sandwich topped with pickled onions and jalapenos.",
    "tags": ["Lunch", "Dinner", "Spicy"]
  },
  {
    "id": 7,
    "name": "Death by Chocolate",
    "image": "death-by-chocolate.jpg",
    "price": 8.99,
    "description": "Decadent chocolate pudding topped with chocolate cookies, chocolate frosting, and whipped cream.",
    "tags": ["Dessert"]
  },
  {
    "id": 8,
    "name": "Pile 'O Donuts",
    "image": "donuts.jpg",
    "price": 6.99,
    "description": "Delicious assortment of unique donuts. Guaranteed to please!",
    "tags": ["Dessert"]
  },
  {
    "id": 9,
    "name": "Italian Meatballs",
    "image": "italian-meatballs.jpg",
    "price": 13.99,
    "description": "Spiced meatballs served with a rich tomato sauce.",
    "tags": ["Dinner"]
  },
  {
    "id": 10,
    "name": "Lamb Chop",
    "image": "lamb-chop.jpg",
    "price": 19.99,
    "description": "Delicious lamb chop topped with a Mango chutney.",
    "tags": ["Dinner"]
  },
  {
    "id": 11,
    "name": "Mango Lassi",
    "image": "mango-lassi.jpg",
    "price": 4.99,
    "description": "Creamy Mango-flavored delight, served ice cold.",
    "tags": ["Drink"]
  },
  {
    "id": 12,
    "name": "Mojito",
    "image": "mojito.jpg",
    "price": 6.99,
    "description": "A refreshing minty cocktail.",
    "tags": ["Drink", "Alcoholic"]
  },
  {
    "id": 13,
    "name": "Old Fashioned",
    "image": "old-fashioned.jpg",
    "price": 7.99,
    "description": "A classic cocktail with a twist.",
    "tags": ["Drink", "Alcoholic"]
  },
  {
    "id": 14,
    "name": "Pesto Bowtie Pasta",
    "image": "pesto-bowtie-pasta.jpg",
    "price": 12.99,
    "description": "Delicious whole wheat pasta topped with our zesty pesto sauce.",
    "tags": ["Lunch", "Dinner"]
  },
  {
    "id": 15,
    "name": "BBQ Chicken Pizza",
    "image": "pizza.jpg",
    "price": 14.99,
    "description": "Our homemade thin-crust pizza topped with BBQ chicken and our house cheese blend.",
    "tags": ["Lunch", "Dinner"]
  },
  {
    "id": 16,
    "name": "Pork Chop",
    "image": "pork-chop.jpg",
    "price": 16.99,
    "description": "Thick-cut Pork Chop with a sweet apple glaze.",
    "tags": ["Dinner"]
  },
  {
    "id": 17,
    "name": "Pork Ramen",
    "image": "ramen.jpg",
    "price": 11.99,
    "description": "Delicious bowl of ramen with pork and vegetables.",
    "tags": ["Lunch", "Dinner"]
  },
  {
    "id": 18,
    "name": "Salmon Salad",
    "image": "salmon-salad.jpg",
    "price": 14.99,
    "description": "Fresh salad topped with grilled salmon, mixed vegetables, and our house vinaigrette.",
    "tags": ["Lunch", "Dinner", "Vegetarian"]
  },
  {
    "id": 19,
    "name": "Salmon Steak",
    "image": "salmon.jpg",
    "price": 18.99,
    "description": "Seared salmon steak topped with a sweet mango glaze.",
    "tags": ["Dinner"]
  },
  {
    "id": 20,
    "name": "Chicken Street Tacos",
    "image": "street-tacos.jpg",
    "price": 9.99,
    "description": "Delicious chicken tacos with a spicy mango salsa.",
    "tags": ["Lunch", "Dinner", "Spicy"]
  },
  {
    "id": 21,
    "name": "Veggie Sammy",
    "image": "veggie-sammy.jpg",
    "price": 8.99,
    "description": "Fresh grilled veggies on our homemade toasted sourdough.",
    "tags": ["Lunch", "Dinner", "Vegetarian"]
  }
]
```

## Project Structure

```
backend/
├── RestaurantApi.csproj
├── Program.cs           # Minimal API setup, endpoints, CORS, Swagger
├── Models/
│   └── Food.cs          # Food record
└── Data/
    └── FoodData.cs      # Hardcoded food list
```

## Implementation Steps

1. Create `backend/` folder and initialize .NET project
2. Add Swagger NuGet package
3. Create Food model
4. Create hardcoded food data
5. Configure Program.cs with:
   - CORS policy for localhost:5173
   - Swagger/OpenAPI
   - GET /api/v1/foods endpoint
   - GET /health endpoint
6. Test endpoints

## Verification

1. Run `dotnet run` from backend folder
2. Open http://localhost:5000/swagger to verify Swagger UI
3. Call GET http://localhost:5000/api/v1/foods - expect 21 food items
4. Call GET http://localhost:5000/health - expect "Healthy"
5. Verify CORS by calling from frontend (localhost:5173)
