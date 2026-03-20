# BrowserContext, Browser, and BrowserType

## BrowserContext

A `BrowserContext` is an isolated browser session. Each context has its own cookies, storage, and permissions. Pages within a context share these, but contexts are isolated from each other. In `@playwright/test`, a fresh context is created for each test by default via the `context` fixture.

```ts
import { test, expect } from "@playwright/test";

test("example", async ({ context, page }) => {
  // page already belongs to a fresh context
  await page.goto("https://example.com");

  // Open a second page in the same context (shares cookies/storage)
  const page2 = await context.newPage();
  await page2.goto("https://example.com/other");
});
```

### Methods

| Method | Signature |
|--------|-----------|
| `addCookies` | `(cookies: Array<{ name: string; value: string; url?: string; domain?: string; path?: string; expires?: number; httpOnly?: boolean; secure?: boolean; sameSite?: "Strict" \| "Lax" \| "None" }>) => Promise<void>` |
| `addInitScript` | `(script: Function \| string \| { path?: string; content?: string }, arg?: Serializable) => Promise<void>` |
| `browser` | `() => Browser \| null` |
| `clearCookies` | `(options?: { domain?: string \| RegExp; name?: string \| RegExp; path?: string \| RegExp }) => Promise<void>` |
| `clearPermissions` | `() => Promise<void>` |
| `close` | `(options?: { reason?: string }) => Promise<void>` |
| `cookies` | `(urls?: string \| string[]) => Promise<Array<Cookie>>` |
| `exposeBinding` | `(name: string, callback: Function, options?: { handle?: boolean }) => Promise<void>` |
| `exposeFunction` | `(name: string, callback: Function) => Promise<void>` |
| `grantPermissions` | `(permissions: string[], options?: { origin?: string }) => Promise<void>` |
| `newCDPSession` | `(page: Page \| Frame) => Promise<CDPSession>` |
| `newPage` | `() => Promise<Page>` |
| `pages` | `() => Array<Page>` |
| `removeAllListeners` | `(type?: string, options?: { behavior?: "wait" \| "ignoreErrors" \| "default" }) => Promise<void>` |
| `route` | `(url: string \| RegExp \| ((url: URL) => boolean), handler: (route: Route, request: Request) => void, options?: { times?: number }) => Promise<void>` |
| `routeFromHAR` | `(har: string, options?: { notFound?: "abort" \| "fallback"; update?: boolean; updateContent?: "embed" \| "attach"; updateMode?: "full" \| "minimal"; url?: string \| RegExp }) => Promise<void>` |
| `routeWebSocket` | `(url: string \| RegExp \| ((url: URL) => boolean), handler: (ws: WebSocketRoute) => void) => Promise<void>` |
| `serviceWorkers` | `() => Array<Worker>` |
| `setDefaultNavigationTimeout` | `(timeout: number) => void` |
| `setDefaultTimeout` | `(timeout: number) => void` |
| `setExtraHTTPHeaders` | `(headers: Record<string, string>) => Promise<void>` |
| `setGeolocation` | `(geolocation: { latitude: number; longitude: number; accuracy?: number } \| null) => Promise<void>` |
| `setOffline` | `(offline: boolean) => Promise<void>` |
| `storageState` | `(options?: { indexedDB?: boolean; path?: string }) => Promise<{ cookies: Array<Cookie>; origins: Array<{ origin: string; localStorage: Array<{ name: string; value: string }> }> }>` |
| `unroute` | `(url: string \| RegExp \| ((url: URL) => boolean), handler?: Function) => Promise<void>` |
| `unrouteAll` | `(options?: { behavior?: "wait" \| "ignoreErrors" \| "default" }) => Promise<void>` |
| `waitForEvent` | `(event: string, optionsOrPredicate?: Function \| { predicate?: Function; timeout?: number }) => Promise<Object>` |

```ts
// Cookies
await context.addCookies([
  { name: "session", value: "abc123", domain: ".example.com", path: "/" },
]);
const cookies = await context.cookies("https://example.com");
await context.clearCookies();
await context.clearCookies({ name: /^session/ });

// Permissions
await context.grantPermissions(["geolocation"], {
  origin: "https://example.com",
});
await context.clearPermissions();

// Geolocation
await context.setGeolocation({ latitude: 48.8566, longitude: 2.3522 });

// Offline mode
await context.setOffline(true);

// Init script (runs in every new page in this context)
await context.addInitScript(() => {
  window.__TEST_MODE__ = true;
});

// Route all API calls in the context
await context.route("**/api/**", async (route) => {
  await route.fulfill({ status: 200, body: "{}" });
});

// Storage state (for reusing authentication)
const storageState = await context.storageState({ path: "auth.json" });

// Create a new page in this context
const page = await context.newPage();

// Wait for a new page event (popup)
const pagePromise = context.waitForEvent("page");
await page.getByRole("link", { name: "Open" }).click();
const newPage = await pagePromise;
```

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `clock` | `Clock` | Clock for time manipulation |
| `request` | `APIRequestContext` | API request context for direct HTTP calls |
| `tracing` | `Tracing` | Tracing control |

```ts
// Use context-level API request
const response = await context.request.get("https://api.example.com/data");

// Tracing
await context.tracing.start({ screenshots: true, snapshots: true });
// ... run test actions ...
await context.tracing.stop({ path: "trace.zip" });
```

### Events

| Event | Callback Argument | Description |
|-------|-------------------|-------------|
| `close` | `BrowserContext` | Context closed |
| `console` | `ConsoleMessage` | Console message from any page |
| `dialog` | `Dialog` | Dialog from any page |
| `page` | `Page` | New page created in context |
| `request` | `Request` | Request issued from any page |
| `requestfailed` | `Request` | Request failed in any page |
| `requestfinished` | `Request` | Request completed in any page |
| `response` | `Response` | Response received in any page |
| `serviceworker` | `Worker` | Service worker created |
| `weberror` | `WebError` | Uncaught error from any page |

```ts
context.on("page", async (page) => {
  console.log("New page opened:", page.url());
});

context.on("request", (request) => {
  console.log(`>> ${request.method()} ${request.url()}`);
});
```

---

## Browser

The `Browser` is launched by `BrowserType` and can create multiple isolated `BrowserContext` instances. In `@playwright/test`, you typically use the `browser` fixture.

### Methods

| Method | Signature |
|--------|-----------|
| `browserType` | `() => BrowserType` |
| `close` | `(options?: { reason?: string }) => Promise<void>` |
| `contexts` | `() => BrowserContext[]` |
| `isConnected` | `() => boolean` |
| `newBrowserCDPSession` | `() => Promise<CDPSession>` |
| `newContext` | `(options?: BrowserContextOptions) => Promise<BrowserContext>` |
| `newPage` | `(options?: BrowserContextOptions) => Promise<Page>` |
| `removeAllListeners` | `(type?: string, options?: { behavior?: "wait" \| "ignoreErrors" \| "default" }) => Promise<void>` |
| `startTracing` | `(page?: Page, options?: { categories?: string[]; path?: string; screenshots?: boolean }) => Promise<void>` |
| `stopTracing` | `() => Promise<Buffer>` |
| `version` | `() => string` |

### Events

| Event | Callback Argument | Description |
|-------|-------------------|-------------|
| `disconnected` | `Browser` | Browser disconnected |

```ts
import { test } from "@playwright/test";

test("multiple contexts", async ({ browser }) => {
  // Create two isolated contexts
  const context1 = await browser.newContext();
  const context2 = await browser.newContext();

  const page1 = await context1.newPage();
  const page2 = await context2.newPage();

  // These pages do not share cookies or storage
  await page1.goto("https://example.com");
  await page2.goto("https://example.com");

  await context1.close();
  await context2.close();
});

// newContext with options
const context = await browser.newContext({
  viewport: { width: 1280, height: 720 },
  locale: "en-US",
  timezoneId: "America/New_York",
  geolocation: { latitude: 40.7128, longitude: -74.006 },
  permissions: ["geolocation"],
  colorScheme: "dark",
  userAgent: "custom-agent",
  httpCredentials: { username: "user", password: "pass" },
  ignoreHTTPSErrors: true,
  storageState: "auth.json",
  recordVideo: { dir: "videos/", size: { width: 1280, height: 720 } },
});

// Shortcut: newPage creates a new context + page
const page = await browser.newPage({ locale: "fr-FR" });
```

---

## BrowserType

`BrowserType` provides methods to launch or connect to a browser. Access via `chromium`, `firefox`, or `webkit` from Playwright.

### Methods

| Method | Signature |
|--------|-----------|
| `connect` | `(wsEndpoint: string, options?: { exposeNetwork?: string; headers?: Record<string, string>; logger?: Logger; slowMo?: number; timeout?: number }) => Promise<Browser>` |
| `connectOverCDP` | `(endpointURL: string, options?: { headers?: Record<string, string>; logger?: Logger; slowMo?: number; timeout?: number }) => Promise<Browser>` |
| `executablePath` | `() => string` |
| `launch` | `(options?: LaunchOptions) => Promise<Browser>` |
| `launchPersistentContext` | `(userDataDir: string, options?: LaunchOptions & BrowserContextOptions) => Promise<BrowserContext>` |
| `launchServer` | `(options?: LaunchOptions & { port?: number }) => Promise<BrowserServer>` |
| `name` | `() => string` |

### Key Launch Options

| Option | Type | Description |
|--------|------|-------------|
| `headless` | `boolean` | Run in headless mode (default: `true`) |
| `channel` | `string` | Browser channel (`"chrome"`, `"msedge"`, etc.) |
| `slowMo` | `number` | Slow down operations by ms |
| `args` | `string[]` | Additional browser arguments |
| `proxy` | `{ server: string; bypass?: string; username?: string; password?: string }` | Network proxy settings |
| `downloadsPath` | `string` | Path for downloads |
| `chromiumSandbox` | `boolean` | Enable Chromium sandbox |
| `executablePath` | `string` | Path to a browser executable |
| `timeout` | `number` | Launch timeout in ms (default: 30000) |
| `tracesDir` | `string` | Directory for traces |

```ts
import { chromium, firefox, webkit } from "@playwright/test";

// Launch a browser directly (outside of test fixtures)
const browser = await chromium.launch({ headless: false, slowMo: 50 });
const page = await browser.newPage();
await page.goto("https://example.com");
await browser.close();

// Launch with a specific channel
const browser2 = await chromium.launch({ channel: "chrome" });

// Launch persistent context (retains user data between runs)
const context = await chromium.launchPersistentContext("/tmp/user-data", {
  headless: false,
});
const page2 = context.pages()[0] || (await context.newPage());

// Connect to a remote browser
const browser3 = await chromium.connect("ws://localhost:3000");

// Get browser name and path
console.log(chromium.name()); // "chromium"
console.log(chromium.executablePath());
```
