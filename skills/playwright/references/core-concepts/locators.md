# Locators

Locators are the central mechanism for finding elements on a page in Playwright. They are strict by default (throw if multiple elements match), auto-wait for elements, and auto-retry on flaky conditions. Locators pierce Shadow DOM by default (except XPath).

## Recommended Built-in Locators

Prefer these user-facing locators. They are resilient to DOM changes and read like a user would describe the page.

### getByRole

Locates by ARIA role. The primary and most recommended locator.

```typescript
import { test, expect } from "@playwright/test";

test("role locators", async ({ page }) => {
  await page.getByRole("button", { name: "Sign in" }).click();
  await page.getByRole("heading", { name: "Sign up" }).isVisible();
  await page.getByRole("checkbox", { name: "Subscribe" }).check();
  await page.getByRole("link", { name: "Get started" }).click();

  // Options: name (string | RegExp), exact, checked, disabled, expanded, includeHidden, level, pressed, selected
  await page.getByRole("button", { name: /submit/i }).click();
  await page.getByRole("heading", { name: "Welcome", level: 2 }).isVisible();
  await page.getByRole("checkbox", { checked: true }).first().click();
});
```

### getByText

Finds elements containing the given text.

```typescript
test("text locators", async ({ page }) => {
  // Substring match (default)
  await expect(page.getByText("Welcome, John")).toBeVisible();

  // Exact match
  await expect(
    page.getByText("Welcome, John", { exact: true }),
  ).toBeVisible();

  // Regex match
  await expect(page.getByText(/welcome, [A-Za-z]+$/i)).toBeVisible();
});
```

### getByLabel

Locates form controls by their associated `<label>` text.

```typescript
test("label locators", async ({ page }) => {
  await page.getByLabel("User Name").fill("John");
  await page.getByLabel("Password").fill("secret-password");
  await page.getByLabel("I agree to the terms").check();
});
```

### getByPlaceholder

Locates inputs by placeholder text.

```typescript
test("placeholder locators", async ({ page }) => {
  await page
    .getByPlaceholder("name@example.com")
    .fill("playwright@microsoft.com");
  await page.getByPlaceholder("Search...", { exact: true }).fill("query");
});
```

### getByAltText

Locates elements (typically images) by their `alt` attribute.

```typescript
test("alt text locators", async ({ page }) => {
  await page.getByAltText("playwright logo").click();
  await expect(page.getByAltText(/company logo/i)).toBeVisible();
});
```

### getByTitle

Locates elements by the `title` attribute.

```typescript
test("title locators", async ({ page }) => {
  await expect(page.getByTitle("Issues count")).toHaveText("25 issues");
});
```

### getByTestId

Locates by `data-testid` attribute (customizable).

```typescript
test("test id locators", async ({ page }) => {
  await page.getByTestId("directions").click();
  await page.getByTestId("submit-button").isEnabled();
});
```

Custom test ID attribute via config:

```typescript
// playwright.config.ts
import { defineConfig } from "@playwright/test";

export default defineConfig({
  use: {
    testIdAttribute: "data-pw",
  },
});
```

## Shadow DOM

All built-in locators pierce open Shadow DOM by default. No special syntax is needed.

```typescript
test("shadow DOM", async ({ page }) => {
  // Finds text inside shadow roots automatically
  await page.getByText("Details").click();

  // CSS locators also pierce shadow DOM
  await page.locator("x-details", { hasText: "Details" }).click();
  await expect(page.locator("x-details")).toContainText("Details");
});
```

XPath locators do **not** pierce Shadow DOM. Closed-mode shadow roots are not accessible.

## Filtering Locators

### Filter by text

```typescript
test("filter by text", async ({ page }) => {
  // hasText accepts string or RegExp
  await page
    .getByRole("listitem")
    .filter({ hasText: "Product 2" })
    .getByRole("button", { name: "Add to cart" })
    .click();
});
```

### Filter by NOT having text

```typescript
test("filter by not having text", async ({ page }) => {
  await expect(
    page.getByRole("listitem").filter({ hasNotText: "Out of stock" }),
  ).toHaveCount(5);
});
```

### Filter by child/descendant

```typescript
test("filter by child locator", async ({ page }) => {
  // has: match items containing a child that matches the inner locator
  await page
    .getByRole("listitem")
    .filter({ has: page.getByRole("heading", { name: "Product 2" }) })
    .getByRole("button", { name: "Add to cart" })
    .click();
});
```

### Filter by NOT having child/descendant

```typescript
test("filter by not having child", async ({ page }) => {
  await expect(
    page
      .getByRole("listitem")
      .filter({ hasNot: page.getByText("Product 2") }),
  ).toHaveCount(1);
});
```

### Filter by visibility

```typescript
test("filter by visibility", async ({ page }) => {
  await page.locator("button").filter({ visible: true }).click();
});
```

## Locator Operators

### Chaining (narrowing)

Each chained locator narrows the search within the previous result.

```typescript
test("chaining locators", async ({ page }) => {
  const product = page.getByRole("listitem").filter({ hasText: "Product 2" });
  await product.getByRole("button", { name: "Add to cart" }).click();
});
```

### and() -- match both conditions

```typescript
test("and operator", async ({ page }) => {
  const button = page.getByRole("button").and(page.getByTitle("Subscribe"));
  await button.click();
});
```

### or() -- match either condition

```typescript
test("or operator", async ({ page }) => {
  const newEmail = page.getByRole("button", { name: "New" });
  const dialog = page.getByText("Confirm security settings");
  await expect(newEmail.or(dialog).first()).toBeVisible();

  if (await dialog.isVisible()) {
    await page.getByRole("button", { name: "Dismiss" }).click();
  }
  await newEmail.click();
});
```

### first(), last(), nth()

Positional selectors for disambiguation. Use sparingly -- prefer more specific locators.

```typescript
test("positional selectors", async ({ page }) => {
  await page.getByRole("button").first().click();
  await page.getByRole("button").last().click();
  await page.getByRole("button").nth(2).click(); // zero-based index
});
```

## Working with Lists

```typescript
test("list operations", async ({ page }) => {
  // Count items
  await expect(page.getByRole("listitem")).toHaveCount(3);

  // Assert all items text
  await expect(page.getByRole("listitem")).toHaveText([
    "apple",
    "banana",
    "orange",
  ]);

  // Get specific item (zero-based)
  const secondItem = page.getByRole("listitem").nth(1);
  await expect(secondItem).toHaveText("banana");

  // Iterate all items
  for (const item of await page.getByRole("listitem").all()) {
    console.log(await item.textContent());
  }
});
```

## Strictness

Locators are **strict by default**. Single-element operations throw if more than one element matches.

```typescript
test("strictness", async ({ page }) => {
  // Throws if multiple buttons exist
  // await page.getByRole('button').click();

  // Multi-element operations work fine with multiple matches
  await expect(page.getByRole("button")).toHaveCount(3);
  const texts = await page.getByRole("button").allTextContents();

  // Disambiguate when needed
  await page.getByRole("button").first().click();
  await page
    .getByRole("button")
    .filter({ hasText: "Submit" })
    .click();
});
```

## CSS Pseudo-Classes

Playwright extends CSS selectors with custom pseudo-classes.

```typescript
test("CSS pseudo-classes", async ({ page }) => {
  // :visible -- only visible elements
  await page.locator("button:visible").click();

  // :has-text() -- elements containing text (anywhere inside)
  await page.locator('article:has-text("Playwright")').click();

  // :has() -- elements containing a matching child
  await page.locator("article:has(div.promo)").textContent();

  // :text() -- smallest element containing text (case-insensitive substring)
  await page.locator('#nav-bar :text("Home")').click();

  // :text-is() -- exact full text match (case-sensitive)
  await page.locator(':text-is("Log")').click();

  // :text-matches() -- regex match
  await page.locator(':text-matches("Log\\\\s*in", "i")').click();

  // :is() -- matches any of the conditions
  await page
    .locator(
      'button:has-text("Log in"), button:has-text("Sign in")',
    )
    .click();

  // :nth-match() -- nth element matching selector (1-based)
  await page.locator(':nth-match(:text("Buy"), 3)').click();
});
```

## XPath Locators

```typescript
test("XPath locators", async ({ page }) => {
  // Explicit prefix
  await page.locator("xpath=//button").click();

  // Auto-detected (starts with // or ..)
  await page.locator("//html/body//button").click();

  // Union for multiple selectors
  await page
    .locator(
      `//span[contains(@class, 'spinner__loading')]|//div[@id='confirmation']`,
    )
    .waitFor();

  // Parent element via XPath
  const parent = page.getByText("Hello").locator("xpath=..");
});
```

## React Locator (Experimental)

Requires unminified application builds. Component names use CamelCase.

```typescript
test("React locators", async ({ page }) => {
  await page.locator("_react=BookItem").click();
  await page
    .locator('_react=BookItem[author = "Steven King"]')
    .click();
  // Case-insensitive
  await page.locator('[author = "steven king" i]').click();
  // Substring match
  await page.locator('_react=BookItem[author *= "King"]').click();
});
```

## Vue Locator (Experimental)

Requires unminified application builds. Component names use kebab-case.

```typescript
test("Vue locators", async ({ page }) => {
  await page.locator("_vue=book-item").click();
  await page
    .locator('_vue=book-item[author = "Steven King"]')
    .click();
  await page.locator('_vue=[author *= "King"]').click();
});
```
