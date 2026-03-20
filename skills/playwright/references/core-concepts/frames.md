# Frames

A Page can have one or more Frame objects attached to it. Each page has a **main frame** where page-level interactions operate. Additional frames are attached via `<iframe>` HTML tags. Playwright provides two approaches: `frameLocator()` for locator-based interaction and `page.frame()` for direct Frame object access.

## frameLocator

The recommended approach for interacting with iframe content. Returns a FrameLocator that can be chained with any locator method.

```typescript
import { test, expect } from "@playwright/test";

test("interact with iframe content", async ({ page }) => {
  // Locate iframe by CSS selector, then find elements inside
  const username = page.frameLocator(".frame-class").getByLabel("User Name");
  await username.fill("John");

  // Chain with any locator method
  await page
    .frameLocator("#payment-frame")
    .getByRole("button", { name: "Pay" })
    .click();

  // Use assertions on frame content
  await expect(
    page.frameLocator("#status-frame").getByText("Success"),
  ).toBeVisible();
});
```

### frameLocator with Different Selectors

```typescript
test("frameLocator selector variants", async ({ page }) => {
  // By CSS class
  page.frameLocator(".widget-frame");

  // By ID
  page.frameLocator("#embed-frame");

  // By attribute
  page.frameLocator('iframe[name="content"]');

  // By title
  page.frameLocator('iframe[title="Payment"]');

  // By src
  page.frameLocator('iframe[src*="widget"]');

  // nth iframe (zero-based)
  page.frameLocator("iframe").nth(0);
  page.frameLocator("iframe").first();
  page.frameLocator("iframe").last();
});
```

## Nested Iframes

Chain `frameLocator()` calls to access iframes within iframes.

```typescript
test("nested iframes", async ({ page }) => {
  // Outer iframe > inner iframe > element
  const innerButton = page
    .frameLocator("#outer-frame")
    .frameLocator("#inner-frame")
    .getByRole("button", { name: "Submit" });

  await innerButton.click();

  // Multiple levels deep
  await page
    .frameLocator("#level1")
    .frameLocator("#level2")
    .frameLocator("#level3")
    .getByText("Deep content")
    .isVisible();
});
```

## page.frame() -- Frame Object Access

Access a Frame object directly by name or URL. The Frame object supports the same interaction methods as Page (`fill`, `click`, `locator`, etc.).

### By Name Attribute

```typescript
test("frame by name", async ({ page }) => {
  // Access frame by its name attribute: <iframe name="frame-login">
  const frame = page.frame("frame-login");
  if (frame) {
    await frame.fill("#username-input", "John");
    await frame.fill("#password-input", "secret");
    await frame.click("#submit");
  }
});
```

### By URL

```typescript
test("frame by URL", async ({ page }) => {
  // Exact URL
  const frame = page.frame({ url: "https://example.com/widget" });

  // URL pattern with regex
  const frame2 = page.frame({ url: /.*domain.*/ });

  if (frame2) {
    await frame2.fill("#input", "value");
    await frame2.click("button");
  }
});
```

### List All Frames

```typescript
test("list all frames", async ({ page }) => {
  await page.goto("https://example.com");

  // Get all frames including the main frame
  const allFrames = page.frames();
  console.log(`Total frames: ${allFrames.length}`);

  for (const frame of allFrames) {
    console.log(`Frame: ${frame.name()} - ${frame.url()}`);
  }
});
```

### Using Locators on Frame Objects

```typescript
test("frame.locator()", async ({ page }) => {
  const frame = page.frame("content");
  if (frame) {
    // Use locator API on the frame object
    await frame.locator("#search").fill("query");
    await frame.locator("button.submit").click();

    // Use getByRole, getByText, etc.
    await frame.getByRole("button", { name: "Search" }).click();
    await expect(frame.getByText("Results")).toBeVisible();
  }
});
```

## frameLocator vs Frame Object

| Feature                   | `frameLocator()`                 | `page.frame()`                     |
| ------------------------- | -------------------------------- | ---------------------------------- |
| Returns                   | FrameLocator (locator-oriented)  | Frame object (page-like API)       |
| Chaining with locators    | Direct: `.getByRole()`, etc.     | Via `.locator()`, `.getByRole()`   |
| Auto-waiting for iframe   | Yes                              | No (returns `null` if not found)   |
| Null safety               | Assertions fail on timeout       | Must check for `null`              |
| Nested iframes            | Chain `.frameLocator()` calls    | Navigate via child frames          |
| Best for                  | Most iframe interactions         | When you need the Frame API        |

Prefer `frameLocator()` for most use cases. Use `page.frame()` when you need to call Frame-specific APIs or need to work with the frame as an object.
