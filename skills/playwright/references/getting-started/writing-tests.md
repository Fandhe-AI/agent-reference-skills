# Writing Tests

Playwright tests use the `@playwright/test` module, which provides a `test` function for defining tests and an `expect` function for assertions. Tests run in isolated browser contexts, ensuring no shared state between tests.

## First Test

```typescript
import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("https://playwright.dev/");

  await expect(page).toHaveTitle(/Playwright/);
});

test("get started link", async ({ page }) => {
  await page.goto("https://playwright.dev/");

  await page.getByRole("link", { name: "Get started" }).click();

  await expect(
    page.getByRole("heading", { name: "Installation" }),
  ).toBeVisible();
});
```

Each test receives a fresh `page` fixture. The `test` function takes a title and an async callback with destructured fixtures.

## Navigation

```typescript
await page.goto("https://example.com/");
```

Most tests start by navigating to a URL. The page will wait until the load event fires.

## Actions

Actions interact with page elements through locators. All actions auto-wait for the element to be actionable before performing the operation.

| Action | Description | Example |
|---|---|---|
| `locator.click()` | Click an element | `await page.getByRole("button", { name: "Submit" }).click()` |
| `locator.fill()` | Fill a form field (clears existing value) | `await page.getByLabel("Email").fill("user@example.com")` |
| `locator.check()` | Check a checkbox | `await page.getByLabel("I agree").check()` |
| `locator.uncheck()` | Uncheck a checkbox | `await page.getByLabel("I agree").uncheck()` |
| `locator.hover()` | Hover over an element | `await page.getByText("Menu").hover()` |
| `locator.press()` | Press a keyboard key | `await page.getByLabel("Search").press("Enter")` |
| `locator.focus()` | Focus an element | `await page.getByLabel("Name").focus()` |
| `locator.selectOption()` | Select a dropdown option | `await page.getByLabel("Color").selectOption("blue")` |
| `locator.setInputFiles()` | Upload files | `await page.getByLabel("Upload").setInputFiles("file.txt")` |

### Action Example

```typescript
const getStarted = page.getByRole("link", { name: "Get started" });
await getStarted.click();
```

## Assertions

Playwright assertions are async and auto-retry until the condition is met or the timeout expires. Always use `await` with assertion matchers.

### Async Assertions (Locator / Page)

| Assertion | Description | Example |
|---|---|---|
| `expect(locator).toBeVisible()` | Element is visible | `await expect(page.getByText("Welcome")).toBeVisible()` |
| `expect(locator).toBeChecked()` | Checkbox is checked | `await expect(page.getByLabel("I agree")).toBeChecked()` |
| `expect(locator).toBeEnabled()` | Control is enabled | `await expect(page.getByRole("button")).toBeEnabled()` |
| `expect(locator).toContainText()` | Element contains text | `await expect(page.locator(".status")).toContainText("Success")` |
| `expect(locator).toHaveText()` | Element matches text exactly | `await expect(page.locator(".title")).toHaveText("Dashboard")` |
| `expect(locator).toHaveValue()` | Input has a value | `await expect(page.getByLabel("Name")).toHaveValue("Alice")` |
| `expect(locator).toHaveAttribute()` | Element has an attribute | `await expect(page.locator("img")).toHaveAttribute("alt", "Logo")` |
| `expect(locator).toHaveCount()` | List has N elements | `await expect(page.getByRole("listitem")).toHaveCount(3)` |
| `expect(page).toHaveTitle()` | Page has a title | `await expect(page).toHaveTitle(/Dashboard/)` |
| `expect(page).toHaveURL()` | Page has a URL | `await expect(page).toHaveURL(/.*\/dashboard/)` |

### Sync Assertions (Plain Values)

Standard `expect` matchers work synchronously on plain values without `await`:

```typescript
const value = 5;
expect(value).toBeTruthy();
expect(value).toEqual(5);
expect(value).toBeGreaterThan(3);
```

## Test Isolation

Each test runs in its own `BrowserContext`, which is equivalent to a brand-new browser profile. This means every test gets a completely fresh environment -- cookies, local storage, session storage, and other browser state are never shared between tests.

```typescript
test("example test", async ({ page }) => {
  // "page" belongs to an isolated BrowserContext, created for this test.
});

test("another test", async ({ page }) => {
  // "page" in this test is completely isolated from the first test.
});
```

Even when multiple tests run in a single browser, their contexts are separate.

## Test Hooks

Use `test.describe` to group tests and hooks to share setup/teardown logic.

```typescript
import { test, expect } from "@playwright/test";

test.describe("navigation", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("https://playwright.dev/");
  });

  test("main navigation", async ({ page }) => {
    await expect(page).toHaveURL("https://playwright.dev/");
  });

  test("get started link", async ({ page }) => {
    await page.getByRole("link", { name: "Get started" }).click();
    await expect(page).toHaveURL(/.*intro/);
  });
});
```

### Available Hooks

| Hook | Scope | Description |
|---|---|---|
| `test.describe()` | Group | Declare a group of tests |
| `test.beforeEach()` | Per test | Run before each test in the group |
| `test.afterEach()` | Per test | Run after each test in the group |
| `test.beforeAll()` | Per worker | Run once before all tests in the group (per worker) |
| `test.afterAll()` | Per worker | Run once after all tests in the group (per worker) |

### beforeAll / afterAll

These hooks run once per worker process, not once per test. They are useful for setting up expensive resources shared across tests within a worker.

```typescript
import { test, expect } from "@playwright/test";

test.describe("database tests", () => {
  test.beforeAll(async () => {
    // Runs once per worker before all tests.
  });

  test.afterAll(async () => {
    // Runs once per worker after all tests.
  });

  test("query data", async ({ page }) => {
    // ...
  });
});
```
