import { test, expect } from "@playwright/test";

test("should support adding items to cart, viewing cart, updating quantities, and removing items", async ({
  page,
}) => {
  await page.goto("http://localhost:3000");

  // Verify cart badge is not visible when empty
  await expect(page.getByRole("link", { name: /Cart \d+/ })).toHaveCount(0);

  // Add first item to cart
  await page.getByRole("button", { name: "Add to Cart" }).first().click();
  await expect(page.getByText(/added to cart!/)).toBeVisible();

  // Verify cart badge appears with count 1
  await expect(page.getByRole("link", { name: "Cart 1" })).toBeVisible();

  // Add second item to cart
  await page.getByRole("button", { name: "Add to Cart" }).nth(1).click();

  // Verify cart badge updates to 2
  await expect(page.getByRole("link", { name: "Cart 2" })).toBeVisible();

  // Navigate to cart page
  await page.getByRole("link", { name: "Cart 2" }).click();

  // Verify cart page shows correct header
  await expect(
    page.getByRole("heading", { name: "Your Cart (2 items)" }),
  ).toBeVisible();

  // Verify both items are displayed
  await expect(page.getByRole("link", { name: "Burger" })).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Banana Blueberry French Toast" }),
  ).toBeVisible();

  // Increase quantity of first item
  await page.getByLabel("Increase quantity").first().click();

  // Verify header updates to 3 items
  await expect(
    page.getByRole("heading", { name: "Your Cart (3 items)" }),
  ).toBeVisible();

  // Decrease quantity back to 2
  await page.getByLabel("Decrease quantity").first().click();
  await expect(
    page.getByRole("heading", { name: "Your Cart (2 items)" }),
  ).toBeVisible();

  // Remove first item
  await page
    .getByRole("button", { name: /Remove.*from cart/ })
    .first()
    .click();

  // Verify cart now shows 1 item
  await expect(
    page.getByRole("heading", { name: "Your Cart (1 item)" }),
  ).toBeVisible();

  // Verify removed item no longer appears
  await expect(page.getByRole("link", { name: "Burger" })).toHaveCount(0);

  // Test localStorage persistence by reloading
  await page.reload();

  // Verify cart still shows 1 item after reload
  await expect(
    page.getByRole("heading", { name: "Your Cart (1 item)" }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Banana Blueberry French Toast" }),
  ).toBeVisible();

  // Clear cart
  await page.getByRole("button", { name: "Clear Cart" }).click();

  // Verify empty state
  await expect(
    page.getByRole("heading", { name: "Your Cart" }).first(),
  ).toBeVisible();
  await expect(page.getByText("Your cart is empty")).toBeVisible();

  // Verify badge is gone from navigation
  await expect(page.getByRole("link", { name: /Cart \d+/ })).toHaveCount(0);
});

test("should persist cart across page navigation", async ({ page }) => {
  await page.goto("http://localhost:3000");

  // Add item to cart
  await page.getByRole("button", { name: "Add to Cart" }).first().click();

  // Navigate to About page
  await page.getByRole("link", { name: "About" }).click();

  // Verify cart badge still shows on About page
  await expect(page.getByRole("link", { name: "Cart 1" })).toBeVisible();

  // Navigate back to menu
  await page.getByRole("link", { name: "Menu" }).click();

  // Verify badge still visible
  await expect(page.getByRole("link", { name: "Cart 1" })).toBeVisible();
});

test("should handle adding same item multiple times", async ({ page }) => {
  await page.goto("http://localhost:3000");

  // Add same item twice
  await page.getByRole("button", { name: "Add to Cart" }).first().click();
  await page.getByRole("button", { name: "Add to Cart" }).first().click();

  // Badge should show 2 (quantity, not unique items)
  await expect(page.getByRole("link", { name: "Cart 2" })).toBeVisible();

  // Navigate to cart
  await page.getByRole("link", { name: "Cart 2" }).click();

  // Verify only one item card but with quantity 2
  await expect(page.getByRole("link", { name: "Burger" })).toHaveCount(1);

  // Verify quantity displays as 2
  const quantityText = page
    .locator("section")
    .filter({ hasText: "Burger" })
    .getByText("2");
  await expect(quantityText).toBeVisible();
});
