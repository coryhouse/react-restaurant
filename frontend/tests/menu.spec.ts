import { expect, test } from "@playwright/test";

test("should support adding, editing, and deleting a food", async ({
  page,
}) => {
  const uniqueSuffix = Date.now();
  const foodName = `Playwright Food ${uniqueSuffix}`;
  const editedFoodName = `Playwright Food ${uniqueSuffix} (Edited)`;

  await page.goto("http://localhost:3000/admin");

  // Check validation by submitting an empty form
  await page.getByRole("button", { name: "Add Food" }).click();
  await expect(page.getByText("Name is required")).toHaveCount(1);
  await expect(page.getByText("Description is required")).toHaveCount(1);
  await expect(page.getByText("Select at least one tag")).toHaveCount(1);

  // Fill out new food form
  await page.getByLabel("Name").fill(foodName);
  await page.getByLabel("Description").fill("New food description");
  await page.getByLabel("Price ($)").fill("1");
  await page.getByLabel("Breakfast").check();
  await page.getByRole("button", { name: "Add Food" }).click();

  // Redirects to menu after adding food
  await expect(page.getByRole("heading", { name: "Our Menu" })).toHaveCount(1);
  await expect(page.getByRole("link", { name: foodName })).toHaveCount(1);
  await expect(page.getByText("Food added!")).toHaveCount(1);

  // Find the card for the food we just added
  const newFoodCard = page.locator("section", {
    has: page.getByRole("link", { name: foodName }),
  });

  // Edit the food we just added
  await newFoodCard.getByRole("link", { name: "Edit" }).click();
  await expect(page.getByRole("heading", { name: "Edit Food" })).toHaveCount(1);

  await page.getByLabel("Name").fill(editedFoodName);
  await page
    .getByLabel("Description")
    .fill("Updated description for edit test.");
  await page.getByLabel("Price ($)").fill("10.99");
  await page.getByLabel("Breakfast").uncheck();
  await page.getByLabel("Lunch").check();

  await page.getByRole("button", { name: "Save Changes" }).click();
  await expect(page.getByText("Food saved!")).toHaveCount(1);
  await expect(page.getByRole("link", { name: editedFoodName })).toHaveCount(1);

  // Find the card for the food we just edited and delete it
  const editedFoodCard = page.locator("section", {
    has: page.getByRole("link", { name: editedFoodName }),
  });
  await editedFoodCard
    .getByRole("button", { name: `Delete ${editedFoodName}` })
    .click();
  await expect(
    page.getByRole("button", { name: `Delete ${editedFoodName}` }),
  ).toHaveCount(0);
  await expect(page.getByText("Food deleted")).toHaveCount(1);
});
