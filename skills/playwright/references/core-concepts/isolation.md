# Test Isolation

Playwright achieves test isolation through **BrowserContext** -- a lightweight, incognito-like browser profile. Each test gets a completely fresh context, preventing state leakage between tests.

## BrowserContext

A BrowserContext is an isolated browser session. Contexts are fast and cheap to create. Each context has its own:

- Cookies
- Local storage
- Session storage
- Cache
- Service workers

Multiple contexts can run simultaneously within a single browser instance.

## Default Isolation in Playwright Test

Each test automatically receives its own `context` and `page` fixture. No setup is needed.

```typescript
import { test, expect } from "@playwright/test";

test("first test", async ({ page, context }) => {
  // This test has its own isolated context and page
  await page.goto("https://example.com");
  await page.evaluate(() => localStorage.setItem("key", "value"));
});

test("second test", async ({ page, context }) => {
  // Completely isolated from the first test
  // localStorage is empty, cookies are clean, no shared state
  await page.goto("https://example.com");
  const value = await page.evaluate(() => localStorage.getItem("key"));
  expect(value).toBeNull();
});
```

## Multiple Contexts for Multi-User Testing

Create multiple contexts in a single test to simulate multi-user interactions such as chat, collaboration, or admin/user scenarios.

```typescript
import { test } from "@playwright/test";

test("admin and user interact", async ({ browser }) => {
  // Create two isolated contexts
  const adminContext = await browser.newContext();
  const userContext = await browser.newContext();

  // Create pages in each context
  const adminPage = await adminContext.newPage();
  const userPage = await userContext.newPage();

  // Each user navigates independently with separate sessions
  await adminPage.goto("https://example.com/admin");
  await userPage.goto("https://example.com");

  // Interact as admin
  await adminPage.getByRole("button", { name: "Send message" }).click();

  // Verify user sees the message
  await expect(
    userPage.getByText("New message from admin"),
  ).toBeVisible();

  // Clean up
  await adminContext.close();
  await userContext.close();
});
```

## Benefits of Context Isolation

- **No failure carry-over**: A failing test cannot corrupt state for subsequent tests.
- **Order-independent execution**: Tests can run in any order or in parallel without interference.
- **Easier debugging**: Each test failure is self-contained with its own state.
- **Parallel-safe**: Contexts within the same browser do not share state, making parallel execution reliable.

## Context Options

Contexts can be created with specific options for different testing scenarios:

```typescript
test("context with options", async ({ browser }) => {
  const context = await browser.newContext({
    locale: "fr-FR",
    timezoneId: "Europe/Paris",
    geolocation: { longitude: 2.3522, latitude: 48.8566 },
    permissions: ["geolocation"],
    colorScheme: "dark",
    viewport: { width: 1280, height: 720 },
  });

  const page = await context.newPage();
  await page.goto("https://example.com");

  await context.close();
});
```
