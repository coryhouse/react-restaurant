import { test, expect } from "@playwright/test";

test("should display the About page with correct heading and description", async ({
  page,
}) => {
  await page.goto("http://localhost:3000/about");

  // Check that the About heading is displayed
  await expect(page.getByRole("heading", { name: "About" })).toHaveCount(1);

  // Check that the description paragraph is displayed
  await expect(
    page.getByText("This Restaurant management app uses React and json-server")
  ).toHaveCount(1);
});
