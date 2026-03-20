# Best Practices

Playwright best practices for writing reliable, maintainable, and efficient end-to-end tests.

## Test User-Visible Behavior

Tests should verify what end users see and interact with, not implementation details. Avoid testing internal function names, CSS classes, or data structures.

```typescript
// Good: test what the user sees
await expect(page.getByRole("heading", { name: "Welcome" })).toBeVisible();
await expect(page.getByText("Order confirmed")).toBeVisible();

// Bad: test implementation details
await expect(page.locator(".css-1a2b3c")).toBeVisible();
await expect(page.locator("[data-internal-state='confirmed']")).toBeVisible();
```

## Test Isolation

Each test must run independently. Tests should not depend on shared state, execution order, or side effects from other tests. Every test gets its own `BrowserContext` with fresh localStorage, sessionStorage, cookies, and data.

```typescript
import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  // Each test starts from a clean, authenticated state
  await page.goto("https://example.com/login");
  await page.getByLabel("Username").fill("user");
  await page.getByLabel("Password").fill("password");
  await page.getByRole("button", { name: "Sign in" }).click();
});

test("can view dashboard", async ({ page }) => {
  await expect(page.getByRole("heading", { name: "Dashboard" })).toBeVisible();
});

test("can view profile", async ({ page }) => {
  await page.getByRole("link", { name: "Profile" }).click();
  await expect(page.getByRole("heading", { name: "Profile" })).toBeVisible();
});
```

Use setup projects with `storageState` to authenticate once and share state without repeating login in every test.

## Avoid Testing Third-Party Dependencies

Do not test external sites or servers you do not control. Mock their responses instead:

```typescript
await page.route("**/api/fetch_data_third_party_dependency", (route) =>
  route.fulfill({
    status: 200,
    body: JSON.stringify({ data: "mocked" }),
  }),
);
await page.goto("https://example.com");
```

## Use Locators

Locators provide auto-waiting and retry-ability. They perform actionability checks before interacting with elements. Prioritize user-facing attributes:

```typescript
// Recommended: role-based locators
page.getByRole("button", { name: "Submit" });
page.getByRole("heading", { name: "Welcome" });
page.getByLabel("Email address");
page.getByPlaceholder("Search...");
page.getByText("Order confirmed");
page.getByTestId("submit-button"); // when no better option exists

// Not recommended: CSS/XPath selectors
page.locator("button.buttonIcon.episode-actions-later");
page.locator("#submit-btn");
page.locator("//button[@class='submit']");
```

### Chaining and Filtering Locators

Narrow down selections using chaining and filtering:

```typescript
const product = page
  .getByRole("listitem")
  .filter({ hasText: "Product 2" });

await page
  .getByRole("listitem")
  .filter({ hasText: "Product 2" })
  .getByRole("button", { name: "Add to cart" })
  .click();
```

## Web-First Assertions

Use web-first assertions that automatically wait and retry until the condition is met:

```typescript
// Recommended: web-first assertions (auto-wait)
await expect(page.getByText("Welcome")).toBeVisible();
await expect(page.getByRole("button", { name: "Submit" })).toBeEnabled();
await expect(page).toHaveURL("/dashboard");
await expect(page).toHaveTitle("Dashboard");

// Not recommended: manual checks (no retry)
expect(await page.getByText("Welcome").isVisible()).toBe(true);
expect(await page.title()).toBe("Dashboard");
```

The first form retries until the condition is true or timeout. The second form checks once and fails immediately if the condition is not yet met.

## Generate Tests with Codegen

Use the Playwright code generator to create tests and discover robust locators:

```bash
npx playwright codegen https://example.com
```

The generator prioritizes role, text, and test ID locators. Use the "Pick Locator" button to hover over elements and generate locators interactively.

Also available through the VS Code extension for an integrated experience.

## Debugging

### Local Debugging

Debug in VS Code by right-clicking the line number next to a test and selecting "Debug Test". Set breakpoints and step through.

Use the Playwright Inspector:

```bash
# Debug all tests
npx playwright test --debug

# Debug a specific test at a specific line
npx playwright test example.spec.ts:9 --debug
```

### UI Mode

Explore, run, and debug tests with a time-travel experience:

```bash
npx playwright test --ui
```

### CI Debugging with Traces

Use the trace viewer instead of videos/screenshots on CI. Traces provide a full timeline with DOM snapshots, network requests, and action logs:

```typescript
// playwright.config.ts
import { defineConfig } from "@playwright/test";

export default defineConfig({
  use: {
    trace: "on-first-retry", // Record trace on retry
  },
});
```

View traces:

```bash
npx playwright show-report
```

## Multi-Browser Testing

Test across Chromium, Firefox, and WebKit:

```typescript
import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  projects: [
    { name: "chromium", use: { ...devices["Desktop Chrome"] } },
    { name: "firefox", use: { ...devices["Desktop Firefox"] } },
    { name: "webkit", use: { ...devices["Desktop Safari"] } },
  ],
});
```

## CI Configuration

Run tests on every commit and pull request. Use Linux for cost efficiency:

```bash
# Install only the browsers you need
npx playwright install chromium --with-deps

# Run tests
npx playwright test
```

Keep Playwright updated to test against the latest browser versions:

```bash
pnpm add -D @playwright/test@latest
npx playwright install --with-deps
```

## Linting

Use TypeScript with `@typescript-eslint/no-floating-promises` to catch missing `await` on async calls. Run `tsc --noEmit` on CI:

```typescript
// tsconfig.json (strict mode catches more issues)
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true
  }
}
```

Missing `await` is the most common Playwright mistake. The linting rule prevents:

```typescript
// Bug: missing await - assertion passes without checking
expect(page.getByText("Welcome")).toBeVisible();

// Correct
await expect(page.getByText("Welcome")).toBeVisible();
```

## Soft Assertions

Soft assertions do not stop test execution on failure. All failures are collected and reported at the end:

```typescript
await expect.soft(page.getByTestId("status")).toHaveText("Success");
await expect.soft(page.getByTestId("count")).toHaveText("42");

// Test continues even if above assertions fail
await page.getByRole("link", { name: "Next page" }).click();
await expect.soft(page.getByRole("heading")).toHaveText("Page 2");
```

Useful for checking multiple independent conditions in a single test without stopping at the first failure.

## Parallel Execution

Playwright runs test files in parallel by default. Enable within-file parallelism:

```typescript
import { test } from "@playwright/test";

test.describe.configure({ mode: "parallel" });

test("runs in parallel 1", async ({ page }) => {
  // ...
});

test("runs in parallel 2", async ({ page }) => {
  // ...
});
```

### Sharding Across Machines

Split the test suite across multiple CI machines:

```bash
# Machine 1
npx playwright test --shard=1/3

# Machine 2
npx playwright test --shard=2/3

# Machine 3
npx playwright test --shard=3/3
```

## Database and Test Data

- Test against a staging environment with stable data
- Use API calls in `beforeAll`/`afterAll` to set up and tear down test data
- For visual regression tests, ensure consistent OS, browser version, and data

## Summary of Key Principles

1. Test user-visible behavior, not implementation details
2. Isolate every test (no shared state)
3. Mock third-party dependencies
4. Use locators with role-based selectors
5. Use web-first assertions that auto-wait
6. Generate tests and locators with codegen
7. Debug with traces, not screenshots
8. Run across multiple browsers
9. Lint for missing awaits
10. Run tests in parallel and shard on CI
