# Pages

A Page represents a single tab or popup window within a BrowserContext. Pages are the primary interface for navigating to URLs and interacting with page content.

## Creating Pages

```typescript
import { test, expect } from "@playwright/test";

test("create and use a page", async ({ context }) => {
  // Create a new page in the test's context
  const page = await context.newPage();
  await page.goto("https://example.com");
  await page.locator("#search").fill("query");
  await page.locator("#submit").click();
  console.log(page.url());
});
```

In Playwright Test, the `page` fixture provides a ready-to-use page:

```typescript
test("using page fixture", async ({ page }) => {
  // page is already created in a fresh context
  await page.goto("https://example.com");
});
```

## Multiple Pages

A context can host multiple pages (tabs) simultaneously. All pages within a context share cookies, storage, and other context-level settings.

```typescript
test("multiple pages", async ({ context }) => {
  const pageOne = await context.newPage();
  const pageTwo = await context.newPage();

  await pageOne.goto("https://example.com/page1");
  await pageTwo.goto("https://example.com/page2");

  // Get all pages in the context
  const allPages = context.pages();
  console.log(`Open pages: ${allPages.length}`);
});
```

Each page behaves as if it is focused and active. There is no need to bring a page to the front before interacting with it.

## Handling New Tabs

When a page action opens a new tab (e.g., `target="_blank"` links), use the context's `page` event to capture it.

```typescript
test("handle new tab", async ({ page, context }) => {
  // Start waiting for the new page BEFORE triggering the action
  const pagePromise = context.waitForEvent("page");
  await page.getByText("open new tab").click();
  const newPage = await pagePromise;

  // Wait for the new page to load
  await newPage.waitForLoadState();

  // Interact with the new page
  console.log(await newPage.title());
  await newPage.getByRole("button").click();
});
```

Listen for all new pages continuously:

```typescript
test("listen for all new pages", async ({ context, page }) => {
  context.on("page", async (newPage) => {
    await newPage.waitForLoadState();
    console.log(await newPage.title());
  });

  await page.goto("https://example.com");
  await page.getByText("open new tab").click();
});
```

## Handling Popups

The `page` object emits a `popup` event for new windows opened by that specific page (e.g., `window.open()`).

```typescript
test("handle popup", async ({ page }) => {
  // Start waiting for the popup BEFORE triggering it
  const popupPromise = page.waitForEvent("popup");
  await page.getByText("open the popup").click();
  const popup = await popupPromise;

  // Wait for the popup to load
  await popup.waitForLoadState();

  // Interact with the popup
  console.log(await popup.title());
  await popup.getByRole("button").click();
});
```

Listen for all popups:

```typescript
test("listen for all popups", async ({ page }) => {
  page.on("popup", async (popup) => {
    await popup.waitForLoadState();
    console.log(await popup.title());
  });

  await page.goto("https://example.com");
  await page.getByText("open popup").click();
});
```

## Navigation

### page.goto

Navigates to a URL and waits for the page to reach the `load` state by default.

```typescript
test("navigation with goto", async ({ page }) => {
  // Basic navigation
  await page.goto("https://example.com");

  // With options
  await page.goto("https://example.com", {
    waitUntil: "domcontentloaded", // 'load' | 'domcontentloaded' | 'networkidle' | 'commit'
    timeout: 30_000,
  });
});
```

### waitForURL

Waits until the page URL matches a pattern. Useful after actions that trigger navigation.

```typescript
test("wait for URL", async ({ page }) => {
  await page.goto("https://example.com");

  // Click triggers navigation
  await page.getByText("Click me").click();

  // Wait for specific URL (glob pattern)
  await page.waitForURL("**/login");

  // String match
  await page.waitForURL("https://example.com/dashboard");

  // Regex match
  await page.waitForURL(/.*\/dashboard/);

  // Predicate function
  await page.waitForURL((url) => url.pathname === "/dashboard");
});
```

### Load States

Three load states define how far page loading has progressed:

- **`domcontentloaded`** -- The `DOMContentLoaded` event fires when the HTML is fully parsed. Stylesheets, images, and subframes may still be loading.
- **`load`** -- The `load` event fires when the entire page has loaded, including all dependent resources (stylesheets, scripts, iframes, images). This is the default for `goto`.
- **`networkidle`** -- Fires when there are no network connections for at least 500ms. Not recommended for testing; prefer web assertions instead.

```typescript
test("load states", async ({ page }) => {
  await page.goto("https://example.com");

  // Wait for a specific load state
  await page.waitForLoadState("domcontentloaded");
  await page.waitForLoadState("load");
  await page.waitForLoadState("networkidle");
});
```

### History Navigation

```typescript
test("history navigation", async ({ page }) => {
  await page.goto("https://example.com/page1");
  await page.goto("https://example.com/page2");

  // Go back
  await page.goBack();
  await expect(page).toHaveURL(/page1/);

  // Go forward
  await page.goForward();
  await expect(page).toHaveURL(/page2/);
});
```

### Wait for Network Events

```typescript
test("wait for network", async ({ page }) => {
  // Wait for a specific request
  const requestPromise = page.waitForRequest("**/api/data");
  await page.getByRole("button", { name: "Load" }).click();
  const request = await requestPromise;

  // Wait for a specific response
  const responsePromise = page.waitForResponse("**/api/data");
  await page.getByRole("button", { name: "Load" }).click();
  const response = await responsePromise;
  console.log(response.status());

  // With predicate
  const responsePromise2 = page.waitForResponse(
    (resp) =>
      resp.url().includes("/api/data") && resp.status() === 200,
  );
  await page.getByRole("button", { name: "Load" }).click();
  await responsePromise2;
});
```
