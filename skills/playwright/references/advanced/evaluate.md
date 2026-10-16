# Evaluate and Handles

Playwright scripts run in a Node.js environment, separate from the browser page. The `page.evaluate()` API bridges these two worlds by executing JavaScript functions inside the browser page context.

## page.evaluate

Execute a function in the browser and return the result to Node.js:

```ts
const href = await page.evaluate(() => document.location.href);
```

Promises are automatically awaited:

```ts
const status = await page.evaluate(async () => {
  const response = await fetch(location.href);
  return response.status;
});
```

## Argument Passing

Variables from the Node.js scope are **not** accessible inside `evaluate`. Pass them explicitly as the second argument:

```ts
// WRONG -- `data` is not accessible inside evaluate
const data = 'some data';
const result = await page.evaluate(() => {
  window.myApp.use(data); // ReferenceError
});

// CORRECT -- pass `data` explicitly
const data = 'some data';
const result = await page.evaluate((data) => {
  window.myApp.use(data);
}, data);
```

### Supported Argument Types

Primitives, arrays, plain objects, and JSHandle instances can be passed:

```ts
// Primitive
await page.evaluate((num) => num * 2, 42);

// Array
await page.evaluate((array) => array.length, [1, 2, 3]);

// Object
await page.evaluate((obj) => obj.foo, { foo: 'bar' });
```

Multiple arguments are passed as an object:

```ts
const x = 10;
const y = 20;
await page.evaluate(({ x, y }) => x + y, { x, y });
```

### Functions as Arguments (v1.62)

Since v1.62, `evaluate` / `evaluateHandle` (Page, Frame, Locator) and `addInitScript` (Page, BrowserContext) accept an `exposeFunctions` option (`boolean`, default `false`) so functions can be passed as arguments. See the API reference page (`api/page.md`) for the signature.

`evaluate` / `evaluateHandle`: "When set to `true`, functions passed inside `arg` are exposed in the page and can be called from the page function. Calling one returns a Promise of its result. Under the hood, each function is exposed via `page.exposeFunction()`, so it is technically accessible from all frames of the page. Exposed functions are cleared upon the top-level navigation. Defaults to `false`, in which case functions are not serializable and passing one throws an error."

`addInitScript`: "When set to `true`, functions passed inside `arg` are exposed in the page and can be called from the init script. Calling one returns a Promise of its result. Under the hood, each function is exposed via `page.exposeFunction()`, so it is technically accessible from all frames of the page. Unlike functions passed to `page.evaluate()`, functions passed to an init script are exposed in every new document, so they survive navigations. Defaults to `false`, in which case functions are not serializable and are silently dropped."

```ts
const result = await page.evaluate(
  async ({ compute }) => compute(2, 3),
  { compute: (a: number, b: number) => a + b },
  { exposeFunctions: true },
);
```

## Disposable (v1.59)

`Disposable` "is returned from various methods to allow undoing the corresponding action". For example `page.addInitScript()` returns a `Disposable` that can be used to remove the init script; `disposable.dispose()` "removes the associated resource". Disposables work with `await using` for automatic cleanup, for example `await using script = await page.addInitScript('console.log("init script here")');`.

## Locator.waitForFunction (v1.62)

`locator.waitForFunction(expression, arg?, options?)` returns when `expression` returns a truthy value, called with the matching element as a first argument and `arg` as a second argument. "The locator is re-resolved on each retry, so it tolerates the element being re-rendered while waiting." If `expression` returns a Promise it is awaited; if it throws or rejects, the method throws.

```ts
const toggle = page.getByRole('button', { name: 'Menu' });
await toggle.click();
await toggle.waitForFunction(element => element.hasAttribute('aria-expanded'));
```

## evaluateHandle

Returns a JSHandle instead of a serialized value. Use this when you need a reference to an in-browser object rather than its serialized form:

```ts
const windowHandle = await page.evaluateHandle(() => window);
```

Combine with `evaluate` to work with the referenced object:

```ts
const button = await page.evaluateHandle('window.button');
const text = await page.evaluate((btn) => btn.textContent, button);
```

Pass multiple handles as an object:

```ts
const button1 = await page.evaluateHandle('window.button1');
const button2 = await page.evaluateHandle('window.button2');
const combined = await page.evaluate(
  ({ button1, button2 }) => button1.textContent + button2.textContent,
  { button1, button2 }
);
```

## addInitScript

Inject JavaScript that runs **before** any page script, on every page load or navigation. Useful for mocking browser APIs.

### Inline Function

```ts
import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    Math.random = () => 0.42;
  });
});
```

### Inline Function with Arguments

```ts
test.beforeEach(async ({ page }) => {
  const value = 42;
  await page.addInitScript((value) => {
    Math.random = () => value;
  }, value);
});
```

### From a File

```ts
import { test, expect } from '@playwright/test';
import path from 'path';

test.beforeEach(async ({ page }) => {
  await page.addInitScript({
    path: path.resolve(__dirname, '../mocks/preload.js'),
  });
});
```

### Context-Level Init Script

Apply to all pages in a browser context:

```ts
await browserContext.addInitScript(() => {
  window.__testMode = true;
});
```

## JSHandle

A JSHandle represents a reference to a JavaScript object living in the browser. Handles prevent the referenced object from being garbage collected.

### Creating Handles

```ts
const jsHandle = await page.evaluateHandle('window');
const arrayHandle = await page.evaluateHandle(() => {
  window.myArray = [1];
  return window.myArray;
});
```

### Using Handles as Arguments

```ts
const myArrayHandle = await page.evaluateHandle(() => {
  window.myArray = [1];
  return window.myArray;
});

// Read from the handle
const length = await page.evaluate((a) => a.length, myArrayHandle);

// Modify via the handle
await page.evaluate(
  (arg) => arg.myArray.push(arg.newElement),
  { myArray: myArrayHandle, newElement: 2 }
);
```

### Disposing Handles

Handles are released automatically on page navigation. For long-lived pages, manually release handles to avoid memory leaks:

```ts
const handle = await page.evaluateHandle(() => ({ data: 'large' }));
// ... use the handle ...
await handle.dispose();
```

## ElementHandle (Deprecated)

ElementHandle is a JSHandle that references a DOM element. **Its use is discouraged -- prefer Locator objects and web-first assertions instead.**

```ts
// Discouraged -- ElementHandle
const elementHandle = await page.waitForSelector('#box');
const boundingBox = await elementHandle.boundingBox();
const classNames = await elementHandle.getAttribute('class');

// Preferred -- Locator
const box = page.locator('#box');
await expect(box).toBeVisible();
await expect(box).toHaveClass(/highlighted/);
```

### Why Locators Are Preferred

| Aspect          | ElementHandle                        | Locator                                  |
| --------------- | ------------------------------------ | ---------------------------------------- |
| Binding         | Points to a specific DOM element     | Captures the logic to find an element    |
| Staleness       | Goes stale if DOM changes            | Re-queries the DOM on every action       |
| Auto-waiting    | No                                   | Yes                                      |
| Retry           | No                                   | Yes (with web-first assertions)          |
| Recommendation  | Avoid                                | Use for all new code                     |

ElementHandle fetches via `page.waitForSelector()` or `frame.waitForSelector()` wait for the element to be attached and visible, but the handle becomes stale if the element is later removed and re-added. Locators re-evaluate the selector on each interaction, making tests resilient to DOM changes.
