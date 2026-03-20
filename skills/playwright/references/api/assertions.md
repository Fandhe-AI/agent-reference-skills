# Assertions

Playwright uses `expect` from `@playwright/test` which extends Jest-like assertions with auto-retrying, web-first matchers. Assertions that target `Locator`, `Page`, or `APIResponse` automatically retry until the condition is met or the timeout expires.

```ts
import { test, expect } from "@playwright/test";

test("example", async ({ page }) => {
  await page.goto("https://example.com");
  await expect(page).toHaveTitle(/Example/);
  await expect(page.getByRole("heading")).toHaveText("Example Domain");
});
```

## LocatorAssertions

Auto-retrying assertions for `Locator` objects. Created via `expect(locator)`.

### State Assertions

| Method | Signature |
|--------|-----------|
| `toBeAttached` | `(options?: { attached?: boolean; timeout?: number }) => Promise<void>` |
| `toBeChecked` | `(options?: { checked?: boolean; indeterminate?: boolean; timeout?: number }) => Promise<void>` |
| `toBeDisabled` | `(options?: { timeout?: number }) => Promise<void>` |
| `toBeEditable` | `(options?: { editable?: boolean; timeout?: number }) => Promise<void>` |
| `toBeEmpty` | `(options?: { timeout?: number }) => Promise<void>` |
| `toBeEnabled` | `(options?: { enabled?: boolean; timeout?: number }) => Promise<void>` |
| `toBeFocused` | `(options?: { timeout?: number }) => Promise<void>` |
| `toBeHidden` | `(options?: { timeout?: number }) => Promise<void>` |
| `toBeInViewport` | `(options?: { ratio?: number; timeout?: number }) => Promise<void>` |
| `toBeVisible` | `(options?: { timeout?: number; visible?: boolean }) => Promise<void>` |

```ts
const button = page.getByRole("button", { name: "Submit" });

await expect(button).toBeVisible();
await expect(button).toBeEnabled();
await expect(button).not.toBeDisabled();

await expect(page.getByRole("checkbox")).toBeChecked();
await expect(page.getByRole("checkbox")).toBeChecked({ checked: false }); // unchecked
await expect(page.getByRole("checkbox")).toBeChecked({ indeterminate: true });

await expect(page.getByRole("textbox")).toBeEditable();
await expect(page.getByRole("textbox")).toBeEmpty();
await expect(page.getByRole("textbox")).toBeFocused();

await expect(page.getByTestId("loading")).toBeHidden();
await expect(page.getByTestId("element")).toBeAttached();
await expect(page.getByTestId("element")).not.toBeAttached(); // detached from DOM

// At least 50% of element is in viewport
await expect(page.getByRole("banner")).toBeInViewport({ ratio: 0.5 });
```

### Content Assertions

| Method | Signature |
|--------|-----------|
| `toContainText` | `(expected: string \| RegExp \| (string \| RegExp)[], options?: { ignoreCase?: boolean; timeout?: number; useInnerText?: boolean }) => Promise<void>` |
| `toHaveText` | `(expected: string \| RegExp \| (string \| RegExp)[], options?: { ignoreCase?: boolean; timeout?: number; useInnerText?: boolean }) => Promise<void>` |
| `toHaveValue` | `(value: string \| RegExp, options?: { timeout?: number }) => Promise<void>` |
| `toHaveValues` | `(values: (string \| RegExp)[], options?: { timeout?: number }) => Promise<void>` |
| `toHaveCount` | `(count: number, options?: { timeout?: number }) => Promise<void>` |

```ts
// Exact text match (whitespace normalized)
await expect(page.getByRole("heading")).toHaveText("Welcome");

// Partial text match
await expect(page.getByRole("alert")).toContainText("success");

// Regex match
await expect(page.getByRole("heading")).toHaveText(/welcome/i);

// Case-insensitive match
await expect(page.getByRole("heading")).toHaveText("welcome", {
  ignoreCase: true,
});

// Multiple elements (array of expected values)
await expect(page.getByRole("listitem")).toHaveText([
  "First item",
  "Second item",
  "Third item",
]);

// Input value
await expect(page.getByLabel("Email")).toHaveValue("user@example.com");
await expect(page.getByLabel("Email")).toHaveValue(/.*@example\.com/);

// Multi-select values
await expect(page.getByLabel("Colors")).toHaveValues([/red/, /green/]);

// Element count
await expect(page.getByRole("listitem")).toHaveCount(3);
```

### Attribute and Property Assertions

| Method | Signature |
|--------|-----------|
| `toHaveAttribute` | `(name: string, value?: string \| RegExp, options?: { ignoreCase?: boolean; timeout?: number }) => Promise<void>` |
| `toHaveClass` | `(expected: string \| RegExp \| (string \| RegExp)[], options?: { timeout?: number }) => Promise<void>` |
| `toContainClass` | `(expected: string \| string[], options?: { timeout?: number }) => Promise<void>` |
| `toHaveCSS` | `(name: string, value: string \| RegExp, options?: { timeout?: number }) => Promise<void>` |
| `toHaveId` | `(id: string \| RegExp, options?: { timeout?: number }) => Promise<void>` |
| `toHaveJSProperty` | `(name: string, value: Object, options?: { timeout?: number }) => Promise<void>` |

```ts
// Attribute exists
await expect(page.getByRole("link")).toHaveAttribute("href");

// Attribute has specific value
await expect(page.getByRole("link")).toHaveAttribute("href", "/home");
await expect(page.getByRole("link")).toHaveAttribute("href", /\/home/);

// CSS class (exact full class string)
await expect(page.getByTestId("box")).toHaveClass("btn btn-primary");

// CSS class (contains specific class)
await expect(page.getByTestId("box")).toContainClass("btn-primary");
await expect(page.getByTestId("box")).toContainClass(["btn", "btn-primary"]);

// Multiple elements' classes
await expect(page.getByRole("listitem")).toHaveClass([
  "item active",
  "item",
  "item",
]);

// CSS property
await expect(page.getByTestId("box")).toHaveCSS("color", "rgb(255, 0, 0)");
await expect(page.getByTestId("box")).toHaveCSS("display", /flex/);

// Element ID
await expect(page.getByRole("main")).toHaveId("content");

// JavaScript property on DOM element
await expect(page.getByRole("checkbox")).toHaveJSProperty("checked", true);
```

### Accessibility Assertions

| Method | Signature |
|--------|-----------|
| `toHaveAccessibleDescription` | `(description: string \| RegExp, options?: { ignoreCase?: boolean; timeout?: number }) => Promise<void>` |
| `toHaveAccessibleErrorMessage` | `(errorMessage: string \| RegExp, options?: { ignoreCase?: boolean; timeout?: number }) => Promise<void>` |
| `toHaveAccessibleName` | `(name: string \| RegExp, options?: { ignoreCase?: boolean; timeout?: number }) => Promise<void>` |
| `toHaveRole` | `(role: AriaRole, options?: { timeout?: number }) => Promise<void>` |

```ts
await expect(page.getByTestId("submit")).toHaveAccessibleName("Submit form");
await expect(page.getByTestId("submit")).toHaveAccessibleDescription(
  "Submits the registration form",
);
await expect(page.getByLabel("Email")).toHaveAccessibleErrorMessage(
  "Email is required",
);
await expect(page.getByTestId("nav")).toHaveRole("navigation");
```

### Visual Assertions

| Method | Signature |
|--------|-----------|
| `toHaveScreenshot` | `(name?: string \| string[], options?: { animations?: "disabled" \| "allow"; caret?: "hide" \| "initial"; clip?: Object; fullPage?: boolean; mask?: Locator[]; maskColor?: string; maxDiffPixelRatio?: number; maxDiffPixels?: number; omitBackground?: boolean; scale?: "css" \| "device"; stylePath?: string \| string[]; threshold?: number; timeout?: number }) => Promise<void>` |
| `toMatchAriaSnapshot` | `(expected?: string, options?: { name?: string; timeout?: number }) => Promise<void>` |

```ts
// Screenshot comparison (auto-generates name from test title)
await expect(page.getByTestId("chart")).toHaveScreenshot();

// Named screenshot
await expect(page.getByTestId("chart")).toHaveScreenshot("chart-view.png");

// With tolerance
await expect(page.getByTestId("chart")).toHaveScreenshot({
  maxDiffPixelRatio: 0.05,
  mask: [page.getByTestId("timestamp")],
});

// ARIA snapshot
await expect(page.getByRole("list")).toMatchAriaSnapshot(`
  - list:
    - listitem: First
    - listitem: Second
`);
```

---

## PageAssertions

Auto-retrying assertions for `Page` objects. Created via `expect(page)`.

| Method | Signature |
|--------|-----------|
| `toHaveTitle` | `(titleOrRegExp: string \| RegExp, options?: { timeout?: number }) => Promise<void>` |
| `toHaveURL` | `(url: string \| RegExp \| ((url: URL) => boolean), options?: { ignoreCase?: boolean; timeout?: number }) => Promise<void>` |
| `toHaveScreenshot` | `(name?: string \| string[], options?: ScreenshotOptions) => Promise<void>` |
| `not` | `PageAssertions` |

```ts
// Title
await expect(page).toHaveTitle("Dashboard");
await expect(page).toHaveTitle(/Dashboard/);

// URL
await expect(page).toHaveURL("https://example.com/dashboard");
await expect(page).toHaveURL(/\/dashboard$/);
await expect(page).toHaveURL((url) => url.pathname === "/dashboard");

// URL with ignoreCase
await expect(page).toHaveURL("/Dashboard", { ignoreCase: true });

// Negation
await expect(page).not.toHaveURL(/\/login/);

// Full page screenshot comparison
await expect(page).toHaveScreenshot("full-page.png", { fullPage: true });
```

---

## APIResponseAssertions

Auto-retrying assertions for `APIResponse` objects. Created via `expect(apiResponse)`.

| Method | Signature |
|--------|-----------|
| `toBeOK` | `() => Promise<void>` |
| `not` | `APIResponseAssertions` |

```ts
const response = await request.get("/api/health");
await expect(response).toBeOK(); // status 200-299

const badResponse = await request.get("/api/missing");
await expect(badResponse).not.toBeOK();
```

---

## GenericAssertions

Non-retrying assertions for any value. These work like standard Jest matchers. Created via `expect(value)` with a non-Playwright value.

### Equality

| Method | Signature |
|--------|-----------|
| `toBe` | `(expected: Object) => void` |
| `toEqual` | `(expected: Object) => void` |
| `toStrictEqual` | `(expected: Object) => void` |
| `toMatchObject` | `(expected: Object \| Array) => void` |
| `toBeCloseTo` | `(expected: number, numDigits?: number) => void` |

### Truthiness

| Method | Signature |
|--------|-----------|
| `toBeTruthy` | `() => void` |
| `toBeFalsy` | `() => void` |
| `toBeDefined` | `() => void` |
| `toBeUndefined` | `() => void` |
| `toBeNull` | `() => void` |
| `toBeNaN` | `() => void` |

### Comparison

| Method | Signature |
|--------|-----------|
| `toBeGreaterThan` | `(expected: number \| bigint) => void` |
| `toBeGreaterThanOrEqual` | `(expected: number \| bigint) => void` |
| `toBeLessThan` | `(expected: number \| bigint) => void` |
| `toBeLessThanOrEqual` | `(expected: number \| bigint) => void` |

### Collections and Strings

| Method | Signature |
|--------|-----------|
| `toContain` | `(expected: string \| Object) => void` |
| `toContainEqual` | `(expected: Object) => void` |
| `toHaveLength` | `(expected: number) => void` |
| `toHaveProperty` | `(keyPath: string, expected?: Object) => void` |
| `toMatch` | `(expected: RegExp \| string) => void` |

### Type and Instance

| Method | Signature |
|--------|-----------|
| `toBeInstanceOf` | `(expected: Function) => void` |

### Errors

| Method | Signature |
|--------|-----------|
| `toThrow` | `(expected?: string \| RegExp \| Error) => void` |
| `toThrowError` | `(expected?: string \| RegExp \| Error) => void` |

### Asymmetric Matchers

| Method | Signature |
|--------|-----------|
| `expect.any` | `(constructor: Function) => any` |
| `expect.anything` | `() => any` |
| `expect.arrayContaining` | `(expected: Array) => Array` |
| `expect.arrayOf` | `(constructor: Function) => Array` |
| `expect.closeTo` | `(expected: number, numDigits?: number) => number` |
| `expect.objectContaining` | `(expected: Object) => Object` |
| `expect.stringContaining` | `(expected: string) => string` |
| `expect.stringMatching` | `(expected: string \| RegExp) => string` |

```ts
// Equality
expect(1 + 1).toBe(2);
expect({ a: 1 }).toEqual({ a: 1 }); // deep equality
expect({ a: 1, b: undefined }).not.toStrictEqual({ a: 1 }); // strict: undefined !== missing

// Matching objects
expect({ a: 1, b: 2, c: 3 }).toMatchObject({ a: 1, b: 2 });

// Truthiness
expect("hello").toBeTruthy();
expect(null).toBeFalsy();
expect(undefined).toBeUndefined();
expect("value").toBeDefined();
expect(null).toBeNull();
expect(0 / 0).toBeNaN();

// Numbers
expect(10).toBeGreaterThan(5);
expect(0.1 + 0.2).toBeCloseTo(0.3, 5);

// Collections
expect([1, 2, 3]).toContain(2);
expect([{ a: 1 }, { a: 2 }]).toContainEqual({ a: 1 });
expect([1, 2, 3]).toHaveLength(3);
expect("hello world").toContain("world");
expect("hello world").toMatch(/world$/);

// Properties
expect({ a: { b: 1 } }).toHaveProperty("a.b", 1);
expect({ a: 1 }).toHaveProperty("a");

// Errors
expect(() => { throw new Error("fail"); }).toThrow("fail");
expect(() => { throw new Error("fail"); }).toThrow(/fail/);

// Asymmetric matchers (useful inside toEqual/toMatchObject)
expect({ name: "Alice", age: 30 }).toEqual({
  name: expect.any(String),
  age: expect.any(Number),
});

expect({ items: [1, 2, 3] }).toEqual({
  items: expect.arrayContaining([1, 3]),
});

expect({ message: "hello world" }).toEqual({
  message: expect.stringContaining("world"),
});

expect({ data: { x: 1, y: 2, z: 3 } }).toEqual({
  data: expect.objectContaining({ x: 1 }),
});
```

---

## SnapshotAssertions

Non-retrying assertions for comparing values against stored snapshots. Created via `expect(value)`.

| Method | Signature |
|--------|-----------|
| `toMatchSnapshot` | `(name?: string \| string[], options?: { maxDiffPixelRatio?: number; maxDiffPixels?: number; threshold?: number }) => void` |
| `toMatchSnapshot` | `(options?: { maxDiffPixelRatio?: number; maxDiffPixels?: number; name?: string \| string[]; threshold?: number }) => void` |

> **Note:** For screenshot comparisons, prefer `expect(page).toHaveScreenshot()` or `expect(locator).toHaveScreenshot()` which auto-retry. `toMatchSnapshot` is mainly for non-visual data.

```ts
// Snapshot of arbitrary data
expect(await page.title()).toMatchSnapshot("page-title.txt");

// Screenshot snapshot (prefer toHaveScreenshot instead)
expect(await page.screenshot()).toMatchSnapshot("screenshot.png");

// With options
expect(await page.screenshot()).toMatchSnapshot("screenshot.png", {
  maxDiffPixelRatio: 0.05,
  threshold: 0.2,
});
```

---

## Assertion Modifiers and Utilities

### .not

Negates any assertion. Available on all assertion types.

```ts
await expect(page.getByRole("button")).not.toBeDisabled();
await expect(page).not.toHaveURL(/\/login/);
expect(value).not.toBe(0);
```

### expect.soft (Soft Assertions)

Soft assertions do not terminate the test on failure. The test continues running but is marked as failed. Useful for checking multiple conditions.

```ts
await expect.soft(page.getByTestId("status")).toHaveText("Success");
await expect.soft(page.getByTestId("name")).toHaveText("Alice");
await expect.soft(page.getByTestId("email")).toHaveText("alice@example.com");

// Optionally verify no soft assertion failures occurred
expect(test.info().errors).toHaveLength(0);
```

### expect.configure

Creates a pre-configured `expect` instance with custom defaults for `timeout` and `soft`.

```ts
// Custom timeout for slow operations
const slowExpect = expect.configure({ timeout: 10_000 });
await slowExpect(page.getByRole("status")).toHaveText("Complete");

// Pre-configured soft expect
const softExpect = expect.configure({ soft: true });
await softExpect(page.getByTestId("a")).toHaveText("A");
await softExpect(page.getByTestId("b")).toHaveText("B");

// Combine both
const slowSoftExpect = expect.configure({ timeout: 10_000, soft: true });
```

### expect.poll

Retries a function until the assertion passes. Useful for polling non-Playwright values (e.g., API status).

```ts
// Poll until API returns 200
await expect
  .poll(
    async () => {
      const response = await page.request.get("/api/status");
      return response.status();
    },
    {
      timeout: 10_000,
      intervals: [1_000, 2_000, 5_000],
      message: "API did not return 200 in time",
    },
  )
  .toBe(200);

// Poll a computed value
await expect
  .poll(async () => {
    const items = await page.getByRole("listitem").count();
    return items;
  })
  .toBeGreaterThan(0);
```

### toPass

Retries an entire block of code until all assertions inside pass. Useful for retrying a sequence of operations.

```ts
await expect(async () => {
  const response = await page.request.get("/api/data");
  expect(response.status()).toBe(200);
  const json = await response.json();
  expect(json.items).toHaveLength(10);
}).toPass({
  timeout: 60_000,
  intervals: [1_000, 2_000, 5_000],
});
```

> **Note:** The default timeout for `toPass` is `0` (no timeout). It does not inherit from `expect.configure()`. Always set an explicit timeout.
