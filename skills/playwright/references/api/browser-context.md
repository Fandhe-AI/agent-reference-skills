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
| `addInitScript` | `(script: Function \| string \| { path?: string; content?: string }, arg?: Serializable, options?: { exposeFunctions?: boolean }) => Promise<Disposable>` (`exposeFunctions` v1.62; returns a `Disposable` that removes the init script) |
| `browser` | `() => Browser \| null` |
| `clearCookies` | `(options?: { domain?: string \| RegExp; name?: string \| RegExp; path?: string \| RegExp }) => Promise<void>` |
| `clearPermissions` | `() => Promise<void>` |
| `close` | `(options?: { reason?: string }) => Promise<void>` |
| `cookies` | `(urls?: string \| string[]) => Promise<Array<Cookie>>` |
| `exposeBinding` | `(name: string, callback: Function) => Promise<Disposable>` (the `handle` option was removed in v1.60) |
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
| `storageState` | `(options?: { indexedDB?: boolean; opfs?: boolean; credentials?: boolean; path?: string }) => Promise<{ cookies: Array<Cookie>; origins: Array<{ origin: string; localStorage: Array<{ name: string; value: string }> }> }>` (`indexedDB` v1.51; `opfs` v1.63, origin private file system, not supported in ephemeral WebKit contexts; `credentials` v1.61, includes virtual WebAuthn credentials with private keys and signature counters) |
| `setStorageState` | `(storageState: string \| object) => Promise<void>` (v1.59; clears the existing cookies, local storage, IndexedDB entries, origin private file system entries and virtual WebAuthn credentials, then sets the new storage state; when it contains credentials the virtual WebAuthn authenticator is installed, preventing real authenticators from working in this context) |
| `isClosed` | `() => boolean` (v1.59) |
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
| `credentials` | `Credentials` | Virtual WebAuthn authenticator (v1.61) |
| `debugger` | `Debugger` | Programmatic pause/resume (v1.59) |

`Credentials` (v1.61) is a virtual WebAuthn authenticator scoped to the context: it answers `navigator.credentials.create()` / `get()` in pages so tests can use passkeys without hardware. `install()` must be called before the page first touches `navigator.credentials`. Credentials can be persisted via `storageState({ credentials: true })`. See `credentials.md` for the full API.

```ts
await context.credentials.install();
const cred = await context.credentials.create("example.com", { signCount: 5 });
await page.goto("https://example.com/login");
```

`Debugger` (v1.59, `context.debugger`) controls the Playwright debugger. `pausedDetails()` returns `{ location: { file; line?; column? }; title } | null` (`null` if not paused); `requestPause()` configures the debugger to pause before the next action is executed (throws if already paused; unlike `page.pause()`, which pauses immediately at the call site); `resume()` resumes script execution; `next()` resumes and pauses again before the next action; `runTo(location: { file: string; line?: number; column?: number })` resumes and pauses when an action originates from the given source location (`resume`, `next` and `runTo` throw if the debugger is not paused). The `pausedStateChanged` event is emitted when the debugger pauses or resumes.

```ts
await context.debugger.requestPause();
context.debugger.on("pausedStateChanged", () => {
  console.log(context.debugger.pausedDetails());
});
```

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
| `dialogClosed` | `Dialog` | Dialog closed in any page (v1.63) |
| `download` | `Download` | Download started in any page (v1.60) |
| `frameAttached` / `frameDetached` / `frameNavigated` | `Frame` | Frame lifecycle in any page (v1.60) |
| `pageClose` / `pageLoad` | `Page` | Page closed / `load` fired in any page (v1.60) |
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
| `bind` | `(title: string, options?: { workspaceDir?: string; metadata?: Record<string, any>; host?: string; port?: number }) => Promise<{ endpoint: string }>` (v1.59; binds the browser to a named pipe or web socket, making it available for other clients to connect to; `title` identifies the browser server, `workspaceDir` is its working directory, `metadata` is JS only; when `host` or `port` is specified a web socket server is created instead of a named pipe, `port: 0` lets the OS pick an available port) |
| `unbind` | `() => Promise<void>` (v1.59; unbinds the browser server previously bound with `bind()`) |
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
  // `dir` is optional: if not specified, videos are stored in `artifactsDir`
  recordVideo: {
    dir: "videos/",
    size: { width: 1280, height: 720 },
    fps: 25, // default 25; Firefox and WebKit capture up to 25 fps
    showActions: {
      duration: 500, // ms, default 500
      position: "top-right", // default
      cursor: "pointer", // or "none"
      style: { title: "font-size: 24px", highlight: "outline: 2px solid red" },
    },
  },
});

// httpCredentials also accepts an array (v1.63) for multiple origins
// httpCredentials: [{ username: "a", password: "x", origin: "https://a.example" }, ...]

// Shortcut: newPage creates a new context + page
const page = await browser.newPage({ locale: "fr-FR" });
```

---

## BrowserType

`BrowserType` provides methods to launch or connect to a browser. Access via `chromium`, `firefox`, or `webkit` from Playwright.

### Methods

| Method | Signature |
|--------|-----------|
| `connect` | `(wsEndpoint: string, options?: { exposeNetwork?: string; headers?: Record<string, string>; slowMo?: number; timeout?: number }) => Promise<Browser>` |
| `connectOverCDP` | `(endpointURL: string, options?: { headers?: Record<string, string>; slowMo?: number; timeout?: number; artifactsDir?: string; noDefaults?: boolean }) => Promise<Browser>` |
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

## Notes

Removed in v1.60 (release notes "Breaking changes"):

- `logger` option of `BrowserType.connect` and `BrowserType.connectOverCDP` — removed.
- `handle` option of `exposeBinding` (BrowserContext and Page) — removed.
- `videosPath` / `videoSize` context options — removed; use `recordVideo` (`{ dir, size }`).
- `Locator.ariaRef()` — removed; use `page.getByRef()` (v1.64).

`recordVideo` object fields (`recordVideo` context option, JS): `dir?` (defaults to `artifactsDir`), `size?`, `fps?` (default `25`), `showActions?` (`duration`, `position`, `fontSize` (deprecated, use `style.title`), `cursor`, `style` with `point` / `highlight` / `title` CSS declarations). In Python / Java / C# the flat options are `recordVideoDir`, `recordVideoSize` and `recordVideoFps` (also accepted by `launchPersistentContext`). Make sure to await `BrowserContext.close()` for videos to be saved.

Added in v1.59–v1.60: `BrowserType.launch` `artifactsDir` (v1.59), `connectOverCDP` `noDefaults` (v1.60) and `artifactsDir` (v1.61), `Browser` `context` event (v1.60), `Tracing.startHar` / `stopHar` (v1.60).
