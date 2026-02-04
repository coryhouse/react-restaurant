# Playwright Test Writer

Expert Playwright test generator that creates end-to-end tests using the Playwright MCP server. Automatically triggers when test creation is needed and follows "should x when y" naming convention.

## When to Use This Skill

Trigger this skill when:

- User explicitly requests to write/create/add Playwright tests
- User asks to test a specific feature or user flow
- User mentions "e2e test", "end-to-end test", or "Playwright test"
- After implementing a new feature (proactive suggestion to add test coverage)
- User asks "can you test this?" or "add test coverage for..."

## Core Instructions

### 1. Always Reference Latest Playwright Documentation

- Use the Playwright MCP server and Context7 tools to fetch current Playwright best practices
- Query for specific Playwright patterns as needed (e.g., "Playwright locators best practices", "Playwright assertions")
- Stay updated with latest API changes and recommendations

### 2. Test Naming Convention (MANDATORY)

Every test MUST follow this format:

```typescript
test("should [expected behavior] when [condition/scenario]", async () => {
  // test implementation
});
```

**Good Examples:**

- `"should display all food items when page loads"`
- `"should add item to cart when user clicks add button"`
- `"should show validation error when form is submitted empty"`
- `"should navigate to detail page when food card is clicked"`
- `"should remove item from cart when delete button is clicked"`

**Bad Examples (DO NOT USE):**

- `"test food list"` ❌
- `"cart functionality"` ❌
- `"it works"` ❌

### 3. Use Playwright MCP Server Tools

Always use the available MCP tools instead of writing raw Playwright code:

- `browser_navigate` - Navigate to URLs
- `browser_snapshot` - Capture page state for verification
- `browser_click` - Click elements
- `browser_type` - Type into inputs
- `browser_fill_form` - Fill multiple form fields
- `browser_evaluate` - Execute JavaScript
- `browser_wait_for` - Wait for conditions
- `browser_take_screenshot` - Capture screenshots
- `browser_console_messages` - Check console output
- `browser_network_requests` - Verify network calls

### 4. Test Structure and Best Practices

**File Organization:**

- Write tests to `/tests` directory
- Use descriptive filenames: `feature-name.spec.ts`
- Group related tests with `test.describe()`

**Test Structure (AAA Pattern):**

```typescript
import { test, expect } from "@playwright/test";

test.describe("Feature Name", () => {
  test("should [behavior] when [condition]", async ({ page }) => {
    // Arrange - Set up test state
    await page.goto("http://localhost:3000");

    // Act - Perform action
    await page.click("button");

    // Assert - Verify outcome
    await expect(page.locator(".result")).toBeVisible();
  });
});
```

**Key Practices:**

- Use semantic locators (role, label, text) over CSS selectors
- Add meaningful assertions
- Include wait conditions when needed
- Handle async operations properly
- Add comments for complex test logic
- Consider edge cases and error states

### 5. Project-Specific Context

**Application Details:**

- React app runs on `http://localhost:3000`
- API server on `http://localhost:5000/api/v1`
- Uses TanStack Router for routing
- Uses TanStack Query for data fetching
- Toast notifications via Sonner library

**Common Test Scenarios:**

- Navigation between routes
- Form submissions with validation
- API data loading states
- Optimistic updates
- Error handling and error messages
- Toast notifications
- Cart functionality (if applicable)

### 6. Workflow

When invoked:

1. **Understand the feature** - Ask clarifying questions if needed
2. **Reference Playwright docs** - Query for relevant patterns
3. **Design test cases** - Identify scenarios to cover (happy path, edge cases, errors)
4. **Write tests** - Use MCP tools and follow naming convention
5. **Organize properly** - Place in `/tests` with good structure
6. **Verify completeness** - Ensure all critical user flows are covered

## Examples

### Example 1: Simple Page Load Test

```typescript
import { test, expect } from "@playwright/test";

test.describe("Food Menu", () => {
  test("should display food items when page loads", async ({ page }) => {
    await page.goto("http://localhost:3000");
    await expect(page.getByRole("heading", { name: "Menu" })).toBeVisible();
    await expect(page.locator('[data-testid="food-card"]')).toHaveCount(5);
  });
});
```

### Example 2: Form Interaction Test

```typescript
test("should add new food item when form is submitted with valid data", async ({
  page,
}) => {
  await page.goto("http://localhost:3000/foods/new");

  await page.fill('input[name="name"]', "Pizza");
  await page.fill('input[name="price"]', "12.99");
  await page.click('button[type="submit"]');

  await expect(page.getByText("Food added successfully")).toBeVisible();
  await expect(page).toHaveURL(/\/foods\/\d+/);
});
```

### Example 3: Error Handling Test

```typescript
test("should show validation errors when form is submitted empty", async ({
  page,
}) => {
  await page.goto("http://localhost:3000/foods/new");

  await page.click('button[type="submit"]');

  await expect(page.getByText("Name is required")).toBeVisible();
  await expect(page.getByText("Price is required")).toBeVisible();
});
```

## Output Format

After creating tests:

1. Show the test file path
2. Briefly explain what scenarios are covered
3. Suggest running `npm run pw` to execute tests
4. Play terminal bell notification when complete

---

This skill produces high-quality, maintainable Playwright tests that follow current best practices.
