# Locator

The `Locator` class represents a way to find elements on a page at any moment. Locators are strict by default -- they throw if more than one element matches. They are created with `page.locator()`, `page.getByRole()`, and similar methods.

Locators auto-wait for elements to be actionable before performing actions. They auto-retry if the element is not ready.

```ts
import { test, expect } from "@playwright/test";

test("example", async ({ page }) => {
  await page.goto("https://example.com");
  const button = page.getByRole("button", { name: "Submit" });
  await button.click();
  await expect(button).toBeDisabled();
});
```

## Actions

| Method | Signature |
|--------|-----------|
| `click` | `(options?: { button?: "left" \| "right" \| "middle"; clickCount?: number; delay?: number; force?: boolean; modifiers?: ("Alt" \| "Control" \| "ControlOrMeta" \| "Meta" \| "Shift")[]; noWaitAfter?: boolean; position?: { x: number; y: number }; timeout?: number; trial?: boolean }) => Promise<void>` |
| `dblclick` | `(options?: { button?: "left" \| "right" \| "middle"; delay?: number; force?: boolean; modifiers?: ("Alt" \| "Control" \| "ControlOrMeta" \| "Meta" \| "Shift")[]; noWaitAfter?: boolean; position?: { x: number; y: number }; timeout?: number; trial?: boolean }) => Promise<void>` |
| `check` | `(options?: { force?: boolean; noWaitAfter?: boolean; position?: { x: number; y: number }; timeout?: number; trial?: boolean }) => Promise<void>` |
| `uncheck` | `(options?: { force?: boolean; noWaitAfter?: boolean; position?: { x: number; y: number }; timeout?: number; trial?: boolean }) => Promise<void>` |
| `setChecked` | `(checked: boolean, options?: { force?: boolean; noWaitAfter?: boolean; position?: { x: number; y: number }; timeout?: number; trial?: boolean }) => Promise<void>` |
| `fill` | `(value: string, options?: { force?: boolean; noWaitAfter?: boolean; timeout?: number }) => Promise<void>` |
| `clear` | `(options?: { force?: boolean; noWaitAfter?: boolean; timeout?: number }) => Promise<void>` |
| `selectOption` | `(values: string \| string[] \| { value?: string; label?: string; index?: number } \| { value?: string; label?: string; index?: number }[], options?: { force?: boolean; noWaitAfter?: boolean; timeout?: number }) => Promise<string[]>` |
| `setInputFiles` | `(files: string \| string[] \| { name: string; mimeType: string; buffer: Buffer } \| { name: string; mimeType: string; buffer: Buffer }[], options?: { noWaitAfter?: boolean; timeout?: number }) => Promise<void>` |
| `hover` | `(options?: { force?: boolean; modifiers?: ("Alt" \| "Control" \| "ControlOrMeta" \| "Meta" \| "Shift")[]; noWaitAfter?: boolean; position?: { x: number; y: number }; timeout?: number; trial?: boolean }) => Promise<void>` |
| `tap` | `(options?: { force?: boolean; modifiers?: ("Alt" \| "Control" \| "ControlOrMeta" \| "Meta" \| "Shift")[]; noWaitAfter?: boolean; position?: { x: number; y: number }; timeout?: number; trial?: boolean }) => Promise<void>` |
| `focus` | `(options?: { timeout?: number }) => Promise<void>` |
| `blur` | `(options?: { timeout?: number }) => Promise<void>` |
| `press` | `(key: string, options?: { delay?: number; noWaitAfter?: boolean; timeout?: number }) => Promise<void>` |
| `pressSequentially` | `(text: string, options?: { delay?: number; noWaitAfter?: boolean; timeout?: number }) => Promise<void>` |
| `dragTo` | `(target: Locator, options?: { force?: boolean; noWaitAfter?: boolean; sourcePosition?: { x: number; y: number }; targetPosition?: { x: number; y: number }; timeout?: number; trial?: boolean }) => Promise<void>` |
| `scrollIntoViewIfNeeded` | `(options?: { timeout?: number }) => Promise<void>` |
| `dispatchEvent` | `(type: string, eventInit?: Serializable, options?: { timeout?: number }) => Promise<void>` |

```ts
// Click with options
await page.getByRole("button", { name: "Submit" }).click();
await page.getByRole("button").click({ button: "right" });
await page.getByRole("button").click({ modifiers: ["Shift"] });
await page.getByRole("button").click({ force: true }); // skip actionability checks

// Double click
await page.getByRole("cell").dblclick();

// Fill input fields (clears existing value first)
await page.getByLabel("Email").fill("user@example.com");
await page.getByLabel("Email").clear();

// Type character by character (simulates real typing)
await page.getByLabel("Search").pressSequentially("hello", { delay: 100 });

// Press keys
await page.getByLabel("Search").press("Enter");
await page.getByRole("textbox").press("Control+a");

// Checkbox
await page.getByRole("checkbox", { name: "Agree" }).check();
await page.getByRole("checkbox", { name: "Agree" }).uncheck();
await page.getByRole("checkbox").setChecked(true);

// Select option
await page.getByLabel("Country").selectOption("US");
await page.getByLabel("Country").selectOption({ label: "United States" });
await page.getByLabel("Colors").selectOption(["red", "green", "blue"]);

// File upload
await page.getByLabel("Upload").setInputFiles("./file.pdf");
await page.getByLabel("Upload").setInputFiles([
  { name: "test.txt", mimeType: "text/plain", buffer: Buffer.from("content") },
]);
await page.getByLabel("Upload").setInputFiles([]); // clear files

// Hover
await page.getByText("Hover me").hover();

// Drag and drop
await page.getByTestId("source").dragTo(page.getByTestId("target"));

// Focus and blur
await page.getByLabel("Name").focus();
await page.getByLabel("Name").blur();

// Dispatch custom event
await page.getByTestId("canvas").dispatchEvent("click");
```

## Content Retrieval

| Method | Signature |
|--------|-----------|
| `textContent` | `(options?: { timeout?: number }) => Promise<string \| null>` |
| `innerText` | `(options?: { timeout?: number }) => Promise<string>` |
| `innerHTML` | `(options?: { timeout?: number }) => Promise<string>` |
| `inputValue` | `(options?: { timeout?: number }) => Promise<string>` |
| `getAttribute` | `(name: string, options?: { timeout?: number }) => Promise<string \| null>` |
| `allTextContents` | `() => Promise<string[]>` |
| `allInnerTexts` | `() => Promise<string[]>` |
| `boundingBox` | `(options?: { timeout?: number }) => Promise<{ x: number; y: number; width: number; height: number } \| null>` |
| `ariaSnapshot` | `(options?: { timeout?: number }) => Promise<string>` |

```ts
// Get text content
const text = await page.getByTestId("message").textContent();
const innerText = await page.getByTestId("message").innerText();
const html = await page.getByTestId("message").innerHTML();

// Get input value
const value = await page.getByLabel("Email").inputValue();

// Get attribute
const href = await page.getByRole("link", { name: "Home" }).getAttribute("href");

// Get all text contents from multiple elements
const allTexts = await page.getByRole("listitem").allTextContents();

// Get bounding box
const box = await page.getByRole("button").boundingBox();
if (box) {
  console.log(`Button at (${box.x}, ${box.y}), size ${box.width}x${box.height}`);
}
```

## State Inspection

| Method | Signature |
|--------|-----------|
| `isVisible` | `(options?: { timeout?: number }) => Promise<boolean>` |
| `isHidden` | `(options?: { timeout?: number }) => Promise<boolean>` |
| `isEnabled` | `(options?: { timeout?: number }) => Promise<boolean>` |
| `isDisabled` | `(options?: { timeout?: number }) => Promise<boolean>` |
| `isEditable` | `(options?: { timeout?: number }) => Promise<boolean>` |
| `isChecked` | `(options?: { timeout?: number }) => Promise<boolean>` |

```ts
// These do NOT auto-wait. Prefer assertions (expect) for waiting.
const visible = await page.getByRole("button").isVisible();
const enabled = await page.getByRole("button").isEnabled();
const checked = await page.getByRole("checkbox").isChecked();

// Preferred: use assertions which auto-retry
await expect(page.getByRole("button")).toBeVisible();
await expect(page.getByRole("button")).toBeEnabled();
await expect(page.getByRole("checkbox")).toBeChecked();
```

## Collection

| Method | Signature |
|--------|-----------|
| `all` | `() => Promise<Locator[]>` |
| `count` | `() => Promise<number>` |
| `first` | `() => Locator` |
| `last` | `() => Locator` |
| `nth` | `(index: number) => Locator` |

```ts
// Count elements
const count = await page.getByRole("listitem").count();

// Get first, last, nth
const first = page.getByRole("listitem").first();
const last = page.getByRole("listitem").last();
const third = page.getByRole("listitem").nth(2); // 0-indexed

// Iterate over all elements
const items = await page.getByRole("listitem").all();
for (const item of items) {
  console.log(await item.textContent());
}
```

## Filtering and Composition

| Method | Signature |
|--------|-----------|
| `filter` | `(options?: { has?: Locator; hasNot?: Locator; hasNotText?: string \| RegExp; hasText?: string \| RegExp }) => Locator` |
| `and` | `(locator: Locator) => Locator` |
| `or` | `(locator: Locator) => Locator` |
| `getByRole` | `(role: AriaRole, options?: { ... }) => Locator` |
| `getByText` | `(text: string \| RegExp, options?: { exact?: boolean }) => Locator` |
| `getByLabel` | `(text: string \| RegExp, options?: { exact?: boolean }) => Locator` |
| `getByPlaceholder` | `(text: string \| RegExp, options?: { exact?: boolean }) => Locator` |
| `getByAltText` | `(text: string \| RegExp, options?: { exact?: boolean }) => Locator` |
| `getByTitle` | `(text: string \| RegExp, options?: { exact?: boolean }) => Locator` |
| `getByTestId` | `(testId: string \| RegExp) => Locator` |

```ts
// Filter by text
page.getByRole("listitem").filter({ hasText: "Product A" });
page.getByRole("listitem").filter({ hasNotText: "Out of stock" });

// Filter by child locator
page.getByRole("listitem").filter({
  has: page.getByRole("button", { name: "Add to cart" }),
});

// Filter by absence of child
page.getByRole("listitem").filter({
  hasNot: page.getByText("Sold out"),
});

// Combine with AND (both conditions must match)
const saveButton = page.getByRole("button").and(page.getByText("Save"));

// Combine with OR (either condition matches)
const actionButton = page
  .getByRole("button", { name: "Save" })
  .or(page.getByRole("button", { name: "Submit" }));

// Chained sub-locators (scoped search within parent)
const product = page.getByRole("listitem").filter({ hasText: "Widget" });
await product.getByRole("button", { name: "Add to cart" }).click();
```

## Sub-Locators

| Method | Signature |
|--------|-----------|
| `locator` | `(selectorOrLocator: string \| Locator, options?: { has?: Locator; hasNot?: Locator; hasNotText?: string \| RegExp; hasText?: string \| RegExp }) => Locator` |
| `frameLocator` | `(selector: string) => FrameLocator` |
| `contentFrame` | `() => FrameLocator` |

```ts
// Find within a parent
const dialog = page.getByRole("dialog");
await dialog.locator("input[name='email']").fill("test@test.com");
await dialog.getByRole("button", { name: "Submit" }).click();

// Access iframe content
const frame = page.locator("iframe").contentFrame();
await frame.getByRole("button", { name: "Click" }).click();

// Alternative: frameLocator
const frame2 = page.frameLocator("#my-frame");
await frame2.getByText("Hello").click();
```

## Evaluation

| Method | Signature |
|--------|-----------|
| `evaluate` | `(pageFunction: Function \| string, arg?: Serializable, options?: { timeout?: number }) => Promise<Serializable>` |
| `evaluateAll` | `(pageFunction: Function \| string, arg?: Serializable) => Promise<Serializable>` |
| `evaluateHandle` | `(pageFunction: Function \| string, arg?: Serializable, options?: { timeout?: number }) => Promise<JSHandle>` |

```ts
// Evaluate on a single element
const tagName = await page.getByTestId("element").evaluate(
  (el) => el.tagName,
);

// Evaluate on all matched elements (does NOT auto-wait)
const texts = await page.getByRole("listitem").evaluateAll(
  (elements) => elements.map((el) => el.textContent),
);
```

## Utilities

| Method | Signature |
|--------|-----------|
| `waitFor` | `(options?: { state?: "attached" \| "detached" \| "visible" \| "hidden"; timeout?: number }) => Promise<void>` |
| `screenshot` | `(options?: { animations?: "disabled" \| "allow"; caret?: "hide" \| "initial"; mask?: Locator[]; maskColor?: string; omitBackground?: boolean; path?: string; quality?: number; scale?: "css" \| "device"; style?: string; timeout?: number; type?: "png" \| "jpeg" }) => Promise<Buffer>` |
| `highlight` | `() => Promise<void>` |
| `describe` | `(description: string) => Locator` |
| `description` | `() => string \| null` |
| `toString` | `() => string` |

```ts
// Wait for element to appear
await page.getByRole("status").waitFor({ state: "visible" });

// Wait for element to be removed
await page.getByRole("progressbar").waitFor({ state: "detached" });

// Screenshot of a specific element
await page.getByTestId("chart").screenshot({ path: "chart.png" });

// Highlight for debugging
await page.getByRole("button").highlight();

// Add description for debugging
const btn = page.getByRole("button").describe("The main submit button");
console.log(btn.description()); // "The main submit button"

// String representation
console.log(page.getByRole("button", { name: "Submit" }).toString());
// → locator('role=button[name="Submit"]')
```
