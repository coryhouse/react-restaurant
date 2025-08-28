// Create 10000 foods using faker.js
// import { type Food } from "../types/food.types";
import { faker } from "@faker-js/faker";
import path, { dirname } from "path";
import fs from "fs";
import { fileURLToPath } from "url";

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

const foods = [];

for (let i = 0; i < 10000; i++) {
  foods.push({
    id: i.toString(),
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    price: parseFloat(faker.commerce.price()),
    image: "", //faker.image.urlLoremFlickr({ category: "nature" }),
    tags: getRandomFoodTags(),
  });
}

function getRandomFoodTags() {
  const randomTags: string[] = [];
  const numberOfTags = 2 + Math.floor(Math.random() * 3); // Between 2 and 4 tags

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
fs.writeFileSync(dbPath, JSON.stringify({ foods }, null, 2));
