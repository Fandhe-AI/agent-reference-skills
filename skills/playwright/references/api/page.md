# Page

The `Page` class represents a single tab or popup window in a browser. It provides methods to navigate, interact with elements, evaluate scripts, intercept network requests, and more. One `BrowserContext` can have multiple pages.

```ts
import { test, expect } from "@playwright/test";

test("example", async ({ page }) => {
  await page.goto("https://example.com");
  await expect(page).toHaveTitle(/Example/);
});
```

## Navigation

| Method | Signature |
|--------|-----------|
| `goto` | `(url: string, options?: { referer?: string; timeout?: number; waitUntil?: "load" \| "domcontentloaded" \| "networkidle" \| "commit" }) => Promise<Response \| null>` |
| `goBack` | `(options?: { timeout?: number; waitUntil?: "load" \| "domcontentloaded" \| "networkidle" \| "commit" }) => Promise<Response \| null>` |
| `goForward` | `(options?: { timeout?: number; waitUntil?: "load" \| "domcontentloaded" \| "networkidle" \| "commit" }) => Promise<Response \| null>` |
| `reload` | `(options?: { timeout?: number; waitUntil?: "load" \| "domcontentloaded" \| "networkidle" \| "commit" }) => Promise<Response \| null>` |

```ts
// Navigate and wait for network idle
await page.goto("https://example.com", { waitUntil: "networkidle" });

// Go back/forward
await page.goBack();
await page.goForward();

// Reload
await page.reload();
```

## Element Location

| Method | Signature |
|--------|-----------|
| `locator` | `(selector: string, options?: { has?: Locator; hasNot?: Locator; hasNotText?: string \| RegExp; hasText?: string \| RegExp }) => Locator` |
| `getByRole` | `(role: AriaRole, options?: { checked?: boolean; disabled?: boolean; exact?: boolean; expanded?: boolean; includeHidden?: boolean; level?: number; name?: string \| RegExp; pressed?: boolean; selected?: boolean }) => Locator` |
| `getByText` | `(text: string \| RegExp, options?: { exact?: boolean }) => Locator` |
| `getByLabel` | `(text: string \| RegExp, options?: { exact?: boolean }) => Locator` |
| `getByPlaceholder` | `(text: string \| RegExp, options?: { exact?: boolean }) => Locator` |
| `getByAltText` | `(text: string \| RegExp, options?: { exact?: boolean }) => Locator` |
| `getByTitle` | `(text: string \| RegExp, options?: { exact?: boolean }) => Locator` |
| `getByTestId` | `(testId: string \| RegExp) => Locator` |
| `frameLocator` | `(selector: string) => FrameLocator` |
| `frame` | `(frameSelector: string \| { name?: string; url?: string \| RegExp \| ((url: URL) => boolean) }) => Frame \| null` |
| `frames` | `() => Array<Frame>` |
| `mainFrame` | `() => Frame` |

```ts
// Preferred: role-based locators
page.getByRole("button", { name: "Submit" });
page.getByRole("heading", { level: 1 });
page.getByRole("checkbox", { checked: true });

// Text-based
page.getByText("Welcome");
page.getByText(/welcome/i);

// Form-related
page.getByLabel("Email");
page.getByPlaceholder("Enter your email");

// Other semantic locators
page.getByAltText("Company logo");
page.getByTitle("Close dialog");
page.getByTestId("submit-button");

// CSS/XPath selector (use as fallback)
page.locator("css=div.container >> text=Hello");
page.locator("xpath=//button[@type='submit']");

// Filtering with has/hasText
page.locator("article", { hasText: "Playwright" });
page.locator("article", { has: page.getByRole("button") });

// Frame locators
const frame = page.frameLocator("#my-iframe");
await frame.getByRole("button").click();
```

## Evaluation

| Method | Signature |
|--------|-----------|
| `evaluate` | `(pageFunction: Function \| string, arg?: Serializable) => Promise<Serializable>` |
| `evaluateHandle` | `(pageFunction: Function \| string, arg?: Serializable) => Promise<JSHandle>` |
| `addInitScript` | `(script: Function \| string \| { path?: string; content?: string }, arg?: Serializable) => Promise<void>` |
| `addScriptTag` | `(options?: { content?: string; path?: string; type?: string; url?: string }) => Promise<ElementHandle>` |
| `addStyleTag` | `(options?: { content?: string; path?: string; url?: string }) => Promise<ElementHandle>` |
| `exposeFunction` | `(name: string, callback: Function) => Promise<void>` |
| `exposeBinding` | `(name: string, callback: Function, options?: { handle?: boolean }) => Promise<void>` |

```ts
// Evaluate expression in browser context
const title = await page.evaluate(() => document.title);

// Pass arguments to evaluate
const text = await page.evaluate(
  ([selector]) => document.querySelector(selector)?.textContent,
  [".my-class"],
);

// Add init script that runs before every navigation
await page.addInitScript(() => {
  window.myGlobal = "test-value";
});

// Expose a Node.js function to the browser
await page.exposeFunction("sha256", (text: string) => {
  return crypto.createHash("sha256").update(text).digest("hex");
});
```

## Waiting

| Method | Signature |
|--------|-----------|
| `waitForEvent` | `(event: string, optionsOrPredicate?: Function \| { predicate?: Function; timeout?: number }) => Promise<Object>` |
| `waitForFunction` | `(pageFunction: Function \| string, arg?: Serializable, options?: { polling?: number \| "raf"; timeout?: number }) => Promise<JSHandle>` |
| `waitForLoadState` | `(state?: "load" \| "domcontentloaded" \| "networkidle", options?: { timeout?: number }) => Promise<void>` |
| `waitForRequest` | `(urlOrPredicate: string \| RegExp \| ((request: Request) => boolean \| Promise<boolean>), options?: { timeout?: number }) => Promise<Request>` |
| `waitForResponse` | `(urlOrPredicate: string \| RegExp \| ((response: Response) => boolean \| Promise<boolean>), options?: { timeout?: number }) => Promise<Response>` |
| `waitForTimeout` | `(timeout: number) => Promise<void>` |
| `waitForURL` | `(url: string \| RegExp \| ((url: URL) => boolean), options?: { timeout?: number; waitUntil?: "load" \| "domcontentloaded" \| "networkidle" \| "commit" }) => Promise<void>` |

```ts
// Wait for navigation after a click
await page.getByRole("link", { name: "Dashboard" }).click();
await page.waitForURL("**/dashboard");

// Wait for a specific network request
const requestPromise = page.waitForRequest("**/api/users");
await page.getByRole("button", { name: "Load Users" }).click();
const request = await requestPromise;

// Wait for a specific network response
const responsePromise = page.waitForResponse(
  (resp) => resp.url().includes("/api/data") && resp.status() === 200,
);
await page.getByRole("button", { name: "Fetch" }).click();
const response = await responsePromise;

// Wait for load state
await page.waitForLoadState("networkidle");

// Wait for a condition in the page
await page.waitForFunction(() => document.querySelector(".loaded") !== null);

// Wait for an event
const popup = await page.waitForEvent("popup");
```

## Routing

| Method | Signature |
|--------|-----------|
| `route` | `(url: string \| RegExp \| ((url: URL) => boolean), handler: (route: Route, request: Request) => void, options?: { times?: number }) => Promise<void>` |
| `routeFromHAR` | `(har: string, options?: { notFound?: "abort" \| "fallback"; update?: boolean; updateContent?: "embed" \| "attach"; updateMode?: "full" \| "minimal"; url?: string \| RegExp }) => Promise<void>` |
| `unroute` | `(url: string \| RegExp \| ((url: URL) => boolean), handler?: Function) => Promise<void>` |
| `unrouteAll` | `(options?: { behavior?: "wait" \| "ignoreErrors" \| "default" }) => Promise<void>` |

```ts
// Mock an API endpoint
await page.route("**/api/users", async (route) => {
  await route.fulfill({
    status: 200,
    contentType: "application/json",
    body: JSON.stringify([{ id: 1, name: "Alice" }]),
  });
});

// Modify a request
await page.route("**/api/data", async (route, request) => {
  const headers = { ...request.headers(), "x-custom": "value" };
  await route.continue({ headers });
});

// Abort image requests
await page.route("**/*.{png,jpg,jpeg}", (route) => route.abort());

// Route only 3 times
await page.route("**/api/poll", (route) => route.fulfill({ body: "ok" }), {
  times: 3,
});

// Route from HAR file
await page.routeFromHAR("./fixtures/api.har", { url: "**/api/**" });
```

## Content

| Method | Signature |
|--------|-----------|
| `content` | `() => Promise<string>` |
| `setContent` | `(html: string, options?: { timeout?: number; waitUntil?: "load" \| "domcontentloaded" \| "networkidle" \| "commit" }) => Promise<void>` |
| `dragAndDrop` | `(source: string, target: string, options?: { force?: boolean; noWaitAfter?: boolean; sourcePosition?: { x: number; y: number }; strict?: boolean; targetPosition?: { x: number; y: number }; timeout?: number; trial?: boolean }) => Promise<void>` |
| `title` | `() => Promise<string>` |
| `url` | `() => string` |

```ts
// Get page content
const html = await page.content();

// Set page content directly
await page.setContent("<h1>Test</h1><p>Hello world</p>");

// Drag and drop
await page.dragAndDrop("#source", "#target");
```

## Screenshots and PDF

| Method | Signature |
|--------|-----------|
| `screenshot` | `(options?: { animations?: "disabled" \| "allow"; caret?: "hide" \| "initial"; clip?: { x: number; y: number; width: number; height: number }; fullPage?: boolean; mask?: Locator[]; maskColor?: string; omitBackground?: boolean; path?: string; quality?: number; scale?: "css" \| "device"; style?: string; timeout?: number; type?: "png" \| "jpeg" }) => Promise<Buffer>` |
| `pdf` | `(options?: { displayHeaderFooter?: boolean; footerTemplate?: string; format?: string; headerTemplate?: string; height?: string \| number; landscape?: boolean; margin?: { top?: string \| number; right?: string \| number; bottom?: string \| number; left?: string \| number }; outline?: boolean; pageRanges?: string; path?: string; preferCSSPageSize?: boolean; printBackground?: boolean; scale?: number; tagged?: boolean; width?: string \| number }) => Promise<Buffer>` |

```ts
// Full-page screenshot
await page.screenshot({ path: "screenshot.png", fullPage: true });

// Screenshot with mask
await page.screenshot({
  path: "screenshot.png",
  mask: [page.locator(".dynamic-content")],
  maskColor: "#FF00FF",
});

// Generate PDF (Chromium only)
await page.pdf({ path: "page.pdf", format: "A4" });
```

## Configuration

| Method | Signature |
|--------|-----------|
| `emulateMedia` | `(options?: { colorScheme?: "light" \| "dark" \| "no-preference" \| null; forcedColors?: "active" \| "none" \| null; media?: "screen" \| "print" \| null; reducedMotion?: "reduce" \| "no-preference" \| null }) => Promise<void>` |
| `setExtraHTTPHeaders` | `(headers: Record<string, string>) => Promise<void>` |
| `setDefaultTimeout` | `(timeout: number) => void` |
| `setDefaultNavigationTimeout` | `(timeout: number) => void` |
| `setViewportSize` | `(viewportSize: { width: number; height: number }) => Promise<void>` |
| `viewportSize` | `() => { width: number; height: number } \| null` |

```ts
// Emulate dark mode
await page.emulateMedia({ colorScheme: "dark" });

// Emulate print media
await page.emulateMedia({ media: "print" });

// Set viewport
await page.setViewportSize({ width: 1280, height: 720 });

// Set custom headers for all requests
await page.setExtraHTTPHeaders({ Authorization: "Bearer token123" });

// Configure timeouts
page.setDefaultTimeout(10000);
page.setDefaultNavigationTimeout(30000);
```

## Handler Management

| Method | Signature |
|--------|-----------|
| `addLocatorHandler` | `(locator: Locator, handler: (locator: Locator) => Promise<void>, options?: { noWaitAfter?: boolean; times?: number }) => Promise<void>` |
| `removeLocatorHandler` | `(locator: Locator) => Promise<void>` |

```ts
// Dismiss a cookie banner whenever it appears
await page.addLocatorHandler(
  page.getByRole("button", { name: "Accept Cookies" }),
  async (button) => {
    await button.click();
  },
);

// Remove the handler later
await page.removeLocatorHandler(
  page.getByRole("button", { name: "Accept Cookies" }),
);
```

## State and Lifecycle

| Method | Signature |
|--------|-----------|
| `close` | `(options?: { reason?: string; runBeforeUnload?: boolean }) => Promise<void>` |
| `isClosed` | `() => boolean` |
| `bringToFront` | `() => Promise<void>` |
| `pause` | `() => Promise<void>` |
| `opener` | `() => Promise<Page \| null>` |
| `context` | `() => BrowserContext` |
| `requestGC` | `() => Promise<void>` |

```ts
// Close page
await page.close();

// Check if closed
if (!page.isClosed()) {
  await page.bringToFront();
}

// Pause for debugging (opens Playwright Inspector)
await page.pause();

// Access parent context
const context = page.context();
```

## Properties

| Property | Type | Description |
|----------|------|-------------|
| `keyboard` | `Keyboard` | Keyboard input control |
| `mouse` | `Mouse` | Mouse input control |
| `touchscreen` | `Touchscreen` | Touchscreen input control |
| `clock` | `Clock` | Clock control for time-related testing |
| `video` | `Video \| null` | Video recording if enabled |

```ts
// Keyboard
await page.keyboard.type("Hello World");
await page.keyboard.press("Enter");
await page.keyboard.down("Shift");
await page.keyboard.press("ArrowLeft");
await page.keyboard.up("Shift");
await page.keyboard.insertText("some text");

// Mouse
await page.mouse.move(100, 200);
await page.mouse.click(100, 200);
await page.mouse.dblclick(100, 200);
await page.mouse.down();
await page.mouse.up();
await page.mouse.wheel(0, 100);

// Touchscreen
await page.touchscreen.tap(100, 200);

// Clock - freeze time
await page.clock.install({ time: new Date("2024-01-01T00:00:00") });
await page.clock.setFixedTime(new Date("2024-06-15T12:00:00"));
await page.clock.fastForward(30000); // 30 seconds
await page.clock.pauseAt(new Date("2024-01-01T10:00:00"));
await page.clock.resume();
await page.clock.setSystemTime(new Date("2024-01-01T00:00:00"));
```

## Events

| Event | Callback Argument | Description |
|-------|-------------------|-------------|
| `close` | `Page` | Page is closed |
| `console` | `ConsoleMessage` | Console message emitted in browser |
| `dialog` | `Dialog` | Dialog appeared (alert, confirm, prompt, beforeunload) |
| `download` | `Download` | Download started |
| `filechooser` | `FileChooser` | File chooser dialog opened |
| `frameattached` | `Frame` | Frame attached to the page |
| `framedetached` | `Frame` | Frame detached from the page |
| `framenavigated` | `Frame` | Frame navigated to a new URL |
| `load` | `Page` | Load event fired |
| `pageerror` | `Error` | Uncaught exception in the page |
| `popup` | `Page` | New popup window opened |
| `request` | `Request` | Network request issued |
| `requestfailed` | `Request` | Network request failed |
| `requestfinished` | `Request` | Network request completed |
| `response` | `Response` | Network response received |
| `websocket` | `WebSocket` | WebSocket connection created |
| `worker` | `Worker` | Web Worker spawned |

```ts
// Listen for console messages
page.on("console", (msg) => {
  console.log(`Browser console [${msg.type()}]: ${msg.text()}`);
});

// Handle dialogs (alert, confirm, prompt)
page.on("dialog", async (dialog) => {
  console.log(`Dialog: ${dialog.message()}`);
  await dialog.accept("answer");
});

// Wait for a popup
const popupPromise = page.waitForEvent("popup");
await page.getByRole("link", { name: "Open Popup" }).click();
const popup = await popupPromise;
await popup.waitForLoadState();

// Capture downloads
const downloadPromise = page.waitForEvent("download");
await page.getByRole("link", { name: "Download" }).click();
const download = await downloadPromise;
await download.saveAs("/tmp/file.pdf");

// Monitor network requests
page.on("request", (request) => {
  console.log(`>> ${request.method()} ${request.url()}`);
});
page.on("response", (response) => {
  console.log(`<< ${response.status()} ${response.url()}`);
});

// Catch page errors
page.on("pageerror", (error) => {
  console.error(`Page error: ${error.message}`);
});
```
