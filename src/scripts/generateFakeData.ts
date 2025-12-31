// Create 10000 foods using faker.js
// import { type Food } from "../types/food.types";
import { faker } from "@faker-js/faker";
import path, { dirname } from "path";
import fs from "fs";
import { fileURLToPath } from "url";

const numFakeFoods = 5000;

const foodTags = [
  "Breakfast",
  "Lunch",
  "Dinner",
  "Dessert",
  "Drink",
  "Appetizer",
  "Spicy",
  "Vegetarian",
  "Alcoholic",
] as const;

// Array of filenames from /public/images
const foodImageFileNames = [
  "banana-french-toast.jpg",
  "burger.jpg",
  "cajun-pasta.jpg",
  "charcuterie.jpg",
  "cheesecake.jpg",
  "chicken-slammer.jpg",
  "death-by-chocolate.jpg",
  "donuts.jpg",
  "italian-meatballs.jpg",
  "lamb-chop.jpg",
  "mango-lassi.jpg",
  "mojito.jpg",
  "old-fashioned.jpg",
  "pesto-bowtie-pasta.jpg",
  "pizza.jpg",
  "pork-chop.jpg",
  "ramen.jpg",
  "salmon-salad.jpg",
  "salmon.jpg",
  "street-tacos.jpg",
  "veggie-sammy.jpg",
] as const;

const foods = [];

for (let i = 1; i < numFakeFoods; i++) {
  foods.push({
    id: i.toString(),
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: parseFloat(
      faker.commerce.price({
        min: 5,
        max: 30,
        dec: 2,
      }),
    ),
    image: faker.helpers.arrayElement(foodImageFileNames),
    tags: getRandomFoodTags(),
  });
}

function getRandomFoodTags() {
  const randomTags: string[] = [];
  const numberOfTags = 1 + Math.floor(Math.random() * 3); // Between 1 and 3 tags

  for (let i = 0; i < numberOfTags; i++) {
    const randomTag: string = faker.helpers.arrayElement(foodTags);
    if (!randomTags.includes(randomTag)) {
      randomTags.push(randomTag);
    }
  }

  return randomTags;
}

// Overwrite db.json via Node
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const dbPath = path.join(__dirname, "../../db.json");

const ratings = [
  {
    id: "1",
    userId: "u1",
    foodId: "1",
    rating: 5,
    comment: "Best burger in town! The cheddar cheese sauce is amazing.",
  },
  {
    id: "2",
    userId: "u2",
    foodId: "2",
    rating: 4,
    comment: "Really good burger, just a bit too spicy for me.",
  },
  {
    id: "3",
    userId: "u3",
    foodId: "3",
    rating: 5,
    comment: "Perfect breakfast! The banana and blueberry combo is divine.",
  },
  {
    id: "4",
    userId: "u1",
    foodId: "4",
    rating: 4,
    comment: "Great pasta, very spicy as advertised. Could use more sauce.",
  },
  {
    id: "5",
    userId: "u4",
    foodId: "5",
    rating: 5,
    comment: "Love the heat! Exactly what I was looking for.",
  },
  {
    id: "6",
    userId: "u2",
    foodId: "6",
    rating: 5,
    comment: "Heavenly indeed! The raspberry topping is perfect.",
  },
  {
    id: "7",
    userId: "u3",
    foodId: "7",
    rating: 4,
    comment:
      "Very rich and decadent. Almost too much chocolate, but in a good way!",
  },
  {
    id: "8",
    userId: "u4",
    foodId: "8",
    rating: 4,
    comment: "Refreshing mojito, good mint flavor. Perfect for summer.",
  },
  {
    id: "9",
    userId: "u1",
    foodId: "9",
    rating: 5,
    comment:
      "Best pizza I've had! Thin crust is perfect and BBQ chicken is delicious.",
  },
  {
    id: "10",
    userId: "u2",
    foodId: "10",
    rating: 4,
    comment: "Well-cooked salmon, the mango glaze adds a nice sweet touch.",
  },
];

fs.writeFileSync(dbPath, JSON.stringify({ foods, ratings }, null, 2));
