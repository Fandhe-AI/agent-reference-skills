# Assertions

Playwright uses `expect` with auto-retrying assertions that wait until the expected condition is met. The default timeout is 5 seconds, configurable via `testConfig.expect`. Always `await` auto-retrying assertions.

## Auto-Retrying Locator Assertions (27)

These retry until the condition is met or the timeout expires.

### Visibility and State

```typescript
import { test, expect } from "@playwright/test";

test("visibility and state assertions", async ({ page }) => {
  const locator = page.locator("#element");

  // Attached to DOM (options: attached | detached)
  await expect(locator).toBeAttached();
  await expect(locator).toBeAttached({ attached: false });

  // Visible / Hidden
  await expect(locator).toBeVisible();
  await expect(locator).toBeHidden();

  // Enabled / Disabled
  await expect(locator).toBeEnabled();
  await expect(locator).toBeDisabled();

  // Editable
  await expect(locator).toBeEditable();
  await expect(locator).toBeEditable({ editable: false });

  // Focused
  await expect(locator).toBeFocused();

  // Empty (no children or text)
  await expect(locator).toBeEmpty();

  // Checked (checkbox/radio)
  await expect(page.getByRole("checkbox")).toBeChecked();
  await expect(page.getByRole("checkbox")).toBeChecked({ checked: false });

  // In viewport
  await expect(locator).toBeInViewport();
  await expect(locator).toBeInViewport({ ratio: 0.5 });
});
```

### Content and Text

```typescript
test("content assertions", async ({ page }) => {
  const locator = page.locator("#element");

  // Contains text (substring, case-insensitive by default)
  await expect(locator).toContainText("expected text");
  await expect(locator).toContainText(/regex pattern/i);

  // Exact text match
  await expect(locator).toHaveText("exact text");
  await expect(locator).toHaveText(/full regex/);

  // Multiple elements text (array)
  await expect(page.getByRole("listitem")).toHaveText([
    "first",
    "second",
    "third",
  ]);

  // Count
  await expect(page.getByRole("listitem")).toHaveCount(3);
});
```

### Attributes and Properties

```typescript
test("attribute assertions", async ({ page }) => {
  const locator = page.locator("#element");

  // DOM attribute
  await expect(locator).toHaveAttribute("href", "/docs");
  await expect(locator).toHaveAttribute("href", /\/docs/);
  await expect(locator).toHaveAttribute("href"); // attribute exists

  // CSS class
  await expect(locator).toHaveClass("btn primary");
  await expect(locator).toHaveClass(/active/);
  await expect(page.locator("li")).toHaveClass([
    "item",
    "item active",
    "item",
  ]);

  // Contains CSS classes (subset match)
  await expect(locator).toContainClass("primary");

  // CSS property (computed)
  await expect(locator).toHaveCSS("display", "flex");
  await expect(locator).toHaveCSS("color", "rgb(255, 0, 0)");

  // ID
  await expect(locator).toHaveId("main-content");

  // JavaScript property
  await expect(locator).toHaveJSProperty("loaded", true);
});
```

### Form Values

```typescript
test("form value assertions", async ({ page }) => {
  // Input value
  await expect(page.getByLabel("Username")).toHaveValue("john");
  await expect(page.getByLabel("Username")).toHaveValue(/john/i);

  // Multi-select values
  await expect(page.getByLabel("Colors")).toHaveValues([
    /red/,
    /green/,
    /blue/,
  ]);
});
```

### Accessibility

```typescript
test("accessibility assertions", async ({ page }) => {
  const locator = page.locator("#element");

  // ARIA role
  await expect(locator).toHaveRole("button");

  // Accessible name (from aria-label, label, text content, etc.)
  await expect(locator).toHaveAccessibleName("Submit form");
  await expect(locator).toHaveAccessibleName(/submit/i);

  // Accessible description (from aria-describedby, etc.)
  await expect(locator).toHaveAccessibleDescription("Click to submit");

  // Accessible error message (from aria-errormessage)
  await expect(locator).toHaveAccessibleErrorMessage("Field is required");
});
```

### Visual and Snapshots

```typescript
test("visual assertions", async ({ page }) => {
  // Screenshot comparison (locator-level)
  await expect(page.locator("#chart")).toHaveScreenshot("chart.png");
  await expect(page.locator("#chart")).toHaveScreenshot("chart.png", {
    maxDiffPixels: 100,
  });

  // ARIA snapshot
  await expect(page.locator("#nav")).toMatchAriaSnapshot(`
    - navigation:
      - link "Home"
      - link "About"
  `);
});
```

## Page Assertions (3)

```typescript
test("page assertions", async ({ page }) => {
  // Page title
  await expect(page).toHaveTitle("My App");
  await expect(page).toHaveTitle(/My App/);

  // Page URL
  await expect(page).toHaveURL("https://example.com/dashboard");
  await expect(page).toHaveURL(/dashboard/);

  // Page screenshot comparison
  await expect(page).toHaveScreenshot("full-page.png");
});
```

## API Response Assertions (1)

```typescript
test("API response assertions", async ({ page }) => {
  const response = await page.request.get("https://api.example.com/data");

  // Status is 2xx
  await expect(response).toBeOK();
  await expect(response).not.toBeOK();
});
```

## Negation (.not)

Negate any assertion by inserting `.not` before the matcher.

```typescript
test("negation", async ({ page }) => {
  await expect(page.locator("#spinner")).not.toBeVisible();
  await expect(page.locator("#input")).not.toHaveValue("old value");
  await expect(page).not.toHaveURL(/login/);
});
```

## Soft Assertions

Soft assertions do not terminate the test on failure. The test continues but is marked as failed at the end.

```typescript
test("soft assertions", async ({ page }) => {
  await expect.soft(page.getByTestId("status")).toHaveText("Success");
  await expect.soft(page.getByTestId("eta")).toHaveText("1 day");

  // Optionally bail out if any soft assertion has failed
  expect(test.info().errors).toHaveLength(0);
});
```

## Custom Expect Messages

Provide a second argument for debugging context when an assertion fails.

```typescript
test("custom messages", async ({ page }) => {
  await expect(page.getByText("Name"), "should be logged in").toBeVisible();
  expect.soft(value, "my soft assertion").toBe(56);
});
```

## expect.configure

Create pre-configured expect instances with custom timeout or soft mode.

```typescript
test("configured expect", async ({ page }) => {
  // Longer timeout
  const slowExpect = expect.configure({ timeout: 10_000 });
  await slowExpect(page.locator("#slow-element")).toHaveText("Loaded");

  // Pre-configured soft
  const softExpect = expect.configure({ soft: true });
  await softExpect(page.locator("#a")).toHaveText("A");
  await softExpect(page.locator("#b")).toHaveText("B");
});
```

## expect.poll

Convert any synchronous check into a polling/retrying assertion.

```typescript
test("polling assertion", async ({ page }) => {
  // Basic polling
  await expect
    .poll(
      async () => {
        const response = await page.request.get("https://api.example.com");
        return response.status();
      },
      {
        message: "make sure API eventually succeeds",
        timeout: 10_000,
      },
    )
    .toBe(200);

  // Custom polling intervals
  await expect
    .poll(
      async () => {
        const response = await page.request.get("https://api.example.com");
        return response.status();
      },
      {
        intervals: [1_000, 2_000, 10_000],
        timeout: 60_000,
      },
    )
    .toBe(200);
});
```

## expect.toPass

Retry a block of code until it passes without throwing.

```typescript
test("toPass retry block", async ({ page }) => {
  // Basic
  await expect(async () => {
    const response = await page.request.get("https://api.example.com");
    expect(response.status()).toBe(200);
  }).toPass();

  // With options
  await expect(async () => {
    const response = await page.request.get("https://api.example.com");
    expect(response.status()).toBe(200);
  }).toPass({
    intervals: [1_000, 2_000, 10_000],
    timeout: 60_000,
  });
});
```

## Custom Matchers (expect.extend)

Add project-specific assertions that integrate with Playwright's retry mechanism.

```typescript
// fixtures.ts
import { expect as baseExpect } from "@playwright/test";
import type { Locator } from "@playwright/test";

export const expect = baseExpect.extend({
  async toHaveAmount(
    locator: Locator,
    expected: number,
    options?: { timeout?: number },
  ) {
    const assertionName = "toHaveAmount";
    let pass: boolean;
    let matcherResult: any;

    try {
      await baseExpect(locator).toHaveAttribute(
        "data-amount",
        String(expected),
        options,
      );
      pass = !this.isNot;
    } catch (e: any) {
      matcherResult = e.matcherResult;
      pass = this.isNot;
    }

    const message = pass
      ? () =>
          this.utils.matcherHint(assertionName, undefined, undefined, {
            isNot: this.isNot,
          }) +
          `\n\nLocator: ${locator}\n` +
          `Expected: not ${this.utils.printExpected(expected)}\n` +
          (matcherResult
            ? `Received: ${this.utils.printReceived(matcherResult.actual)}`
            : "")
      : () =>
          this.utils.matcherHint(assertionName, undefined, undefined, {
            isNot: this.isNot,
          }) +
          `\n\nLocator: ${locator}\n` +
          `Expected: ${this.utils.printExpected(expected)}\n` +
          (matcherResult
            ? `Received: ${this.utils.printReceived(matcherResult.actual)}`
            : "");

    return {
      message,
      pass,
      name: assertionName,
      expected,
      actual: matcherResult?.actual,
    };
  },
});
```

Usage:

```typescript
import { test } from "@playwright/test";
import { expect } from "./fixtures";

test("custom matcher", async ({ page }) => {
  await expect(page.locator(".cart")).toHaveAmount(4);
});
```

Merge multiple custom expect extensions:

```typescript
import { mergeExpects } from "@playwright/test";
import { expect as dbExpect } from "database-test-utils";
import { expect as a11yExpect } from "a11y-test-utils";

export const expect = mergeExpects(dbExpect, a11yExpect);
```

## Non-Retrying Generic Assertions

These are synchronous, do not auto-retry, and do not require `await`.

```typescript
test("generic assertions", async ({ page }) => {
  const value = await page.locator("#count").textContent();

  // Equality
  expect(value).toBe("5");
  expect({ a: 1 }).toEqual({ a: 1 });
  expect({ a: 1 }).toStrictEqual({ a: 1 });

  // Truthiness
  expect(value).toBeTruthy();
  expect(null).toBeFalsy();
  expect(value).toBeDefined();
  expect(undefined).toBeUndefined();
  expect(null).toBeNull();
  expect(Number.NaN).toBeNaN();

  // Numbers
  expect(5).toBeGreaterThan(3);
  expect(5).toBeGreaterThanOrEqual(5);
  expect(3).toBeLessThan(5);
  expect(3).toBeLessThanOrEqual(3);
  expect(0.1 + 0.2).toBeCloseTo(0.3, 5);

  // Strings and arrays
  expect("hello world").toContain("world");
  expect([1, 2, 3]).toContain(2);
  expect([{ a: 1 }]).toContainEqual({ a: 1 });
  expect("hello").toHaveLength(5);
  expect("hello").toMatch(/ell/);

  // Objects
  expect({ a: 1, b: 2 }).toHaveProperty("a", 1);
  expect({ a: 1, b: 2 }).toMatchObject({ a: 1 });

  // Errors
  expect(() => {
    throw new Error("fail");
  }).toThrow("fail");

  // Instance
  expect(new Date()).toBeInstanceOf(Date);
});
```

## Asymmetric Matchers

Use inside other assertions for flexible matching.

```typescript
test("asymmetric matchers", async ({ page }) => {
  expect({ name: "John", age: 30 }).toEqual({
    name: expect.any(String),
    age: expect.any(Number),
  });

  expect({ name: "John", id: 123 }).toEqual({
    name: expect.anything(),
    id: expect.anything(),
  });

  expect([1, 2, 3]).toEqual(expect.arrayContaining([1, 3]));

  expect({ a: 1, b: 2 }).toEqual(
    expect.objectContaining({ a: 1 }),
  );

  expect("hello world").toEqual(expect.stringContaining("world"));
  expect("hello world").toEqual(expect.stringMatching(/world/));
  expect(0.1 + 0.2).toEqual(expect.closeTo(0.3, 5));
});
```
