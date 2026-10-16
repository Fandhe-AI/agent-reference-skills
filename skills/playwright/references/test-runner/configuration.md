# Configuration

Playwright Test configuration is defined in `playwright.config.ts` using `defineConfig`. It controls test execution behavior, browser options, emulation, recording, and assertion settings.

## Top-Level Options

```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  // Directory containing test files (relative to config)
  testDir: './tests',

  // Run all tests in every file in parallel (default: false)
  fullyParallel: true,

  // Fail CI if test.only is left in source code
  forbidOnly: !!process.env.CI,

  // Retry failed tests
  retries: process.env.CI ? 2 : 0,

  // Limit parallel worker processes
  workers: process.env.CI ? 1 : undefined,

  // Reporter configuration
  reporter: 'html',

  // Per-test timeout in milliseconds (default: 30000)
  timeout: 30_000,

  // Output directory for artifacts (screenshots, videos, traces)
  outputDir: 'test-results',

  // Pattern to match test files
  testMatch: '**/*.spec.ts',

  // Pattern to ignore test files
  testIgnore: '**/node_modules/**',

  // Stop after N failures (0 = unlimited)
  maxFailures: process.env.CI ? 10 : 0,
});
```

Notes:

- `retryStrategy: 'immediate' | 'isolated'` (v1.62, default `'immediate'`) controls when failed tests are retried. `'immediate'`: a failed test is retried as soon as a worker is available, interleaved with the rest of the run. `'isolated'`: retries are run at the end, after all other tests have finished, one by one in a single worker; this minimizes the interference between retried tests and the rest of the suite, at the expense of the total run time. Example: `retries: 2, retryStrategy: 'isolated'`.
- `reporter` built-in names: `'list' | 'dot' | 'line' | 'github' | 'json' | 'junit' | 'null' | 'html' | 'blob' | 'perfetto'` (`'perfetto'` added in v1.63, see `reporters.md`). When unspecified, `'dot'` is used if the `CI` environment variable is set, otherwise `'list'`.
- `failOnFlakyTests` mirrors the `--fail-on-flaky-tests` flag. `workers` values of 0 or below are rejected (v1.60).
- `FullConfig` additions: `argv` (v1.61, snapshot of `process.argv`), `failOnFlakyTests` (v1.61), `filteredProjects` (v1.64, projects selected after `--project` filtering; equals `projects` without a filter).
- `FullProject.ignoreSnapshots` (v1.59, boolean): see `TestProject.ignoreSnapshots`.
- `TestInfoError.errorContext` (v1.60, optional string): "Additional context for the error, such as the aria snapshot of the receiver at the time of an `expect(...)` matcher failure."
- `expect.toHaveScreenshot.type: 'webp'` (v1.64) stores unnamed screenshots as WebP.
- The HTML reporter accepts `mergeFiles` (v1.62).

## Use Options

The `use` object configures browser context, emulation, network, and recording for all tests. These can be overridden per-project or per-test.

### Browser & Launch

```typescript
export default defineConfig({
  use: {
    // Browser engine: 'chromium' | 'firefox' | 'webkit'
    browserName: 'chromium',

    // Branded browser channel: 'chrome', 'msedge', etc.
    channel: 'chrome',

    // Run in headless mode (default: true)
    headless: true,

    // Options passed to browserType.launch()
    launchOptions: {
      slowMo: 50,
    },
  },
});
```

### Navigation & Base URL

```typescript
export default defineConfig({
  use: {
    // Base URL for page.goto() — enables relative paths
    baseURL: 'http://localhost:3000',

    // Timeout for navigations like page.goto() (default: no timeout)
    navigationTimeout: 30_000,

    // Timeout for actions like click(), fill() (default: no timeout)
    actionTimeout: 10_000,
  },
});
```

### Emulation

```typescript
export default defineConfig({
  use: {
    // Viewport dimensions
    viewport: { width: 1280, height: 720 },

    // Locale
    locale: 'en-US',

    // Timezone
    timezoneId: 'America/New_York',

    // Geolocation coordinates
    geolocation: { longitude: -73.935242, latitude: 40.730610 },

    // Granted browser permissions
    permissions: ['geolocation'],

    // Preferred color scheme: 'light' | 'dark' | 'no-preference'
    colorScheme: 'dark',

    // Custom attribute for getByTestId() (default: 'data-testid')
    testIdAttribute: 'data-pw',

    // User agent string
    userAgent: 'custom-agent',

    // Device scale factor (DPR)
    deviceScaleFactor: 2,

    // Touch event support
    hasTouch: true,

    // Mobile device emulation
    isMobile: true,

    // Enable/disable JavaScript (default: true)
    javaScriptEnabled: true,
  },
});
```

### Network

```typescript
export default defineConfig({
  use: {
    // HTTP credentials for all requests
    httpCredentials: {
      username: 'user',
      password: 'pass',
    },

    // Emulate offline network
    offline: true,

    // Proxy configuration
    proxy: {
      server: 'http://myproxy.com:3128',
      bypass: 'localhost',
    },

    // Bypass Content-Security-Policy (default: false)
    bypassCSP: true,

    // Extra HTTP headers sent with every request
    extraHTTPHeaders: {
      'X-Custom-Header': 'value',
    },

    // Ignore HTTPS errors
    ignoreHTTPSErrors: true,

    // Accept downloads automatically (default: true)
    acceptDownloads: true,
  },
});
```

### Storage State

```typescript
export default defineConfig({
  use: {
    // Populate context with saved cookies/localStorage
    storageState: 'playwright/.auth/user.json',
  },
});
```

### Recording

```typescript
export default defineConfig({
  use: {
    // Screenshots: 'off' | 'on' | 'only-on-failure'
    screenshot: 'only-on-failure',

    // Traces: 'off' | 'on' | 'retain-on-failure' | 'on-first-retry'
    trace: 'on-first-retry',

    // Video: 'off' | 'on' | 'retain-on-failure' | 'on-first-retry'
    // (v1.61 adds 'on-all-retries' | 'retain-on-first-failure' | 'retain-on-failure-and-retries')
    video: 'on-first-retry',
  },
});
```

Notes:

- `video` accepts either a mode string or an object (`TestOptions.video`):

  | Field | Type | Description |
  | --- | --- | --- |
  | `mode` | `'off' \| 'on' \| 'retain-on-failure' \| 'on-first-retry' \| 'on-all-retries' \| 'retain-on-first-failure' \| 'retain-on-failure-and-retries'` | Video recording mode. |
  | `size` | `{ width: number; height: number }` | Size of the recorded video. If not specified, equal to `viewport` scaled down to fit into 800x800; if `viewport` is not configured explicitly, 800x450. |
  | `fps` | `number` | Frame rate in frames per second. Defaults to `25`. Firefox and WebKit currently capture up to 25 frames per second. |
  | `show.actions` | `{ duration?, position?, fontSize?, cursor?, style? }` | Visual annotations on interacted elements. `duration` defaults to `500` ms; `position` one of `top-left`/`top`/`top-right`/`bottom-left`/`bottom`/`bottom-right` (default `top-right`); `fontSize` defaults to `24` (deprecated, use `style.title`); `cursor` `'none' \| 'pointer'` (default `'pointer'`); `style` `{ point?, highlight?, title? }` as CSS declaration strings. |
  | `show.test` | `{ level?, position?, fontSize? }` | Test information status overlay. `level` `'file' \| 'title' \| 'step'`; `position` defaults to `top-left`; `fontSize` defaults to `14`. |

  Example: `{ mode: 'on', size: { width: 1920, height: 1080 }, fps: 60 }`. Higher frame rates and sizes use more CPU for encoding. Video modes (same rules as `trace`):

  | Mode | Records a video on | Keeps the video when |
  | --- | --- | --- |
  | `'off'` | never | - |
  | `'on'` | every run | always |
  | `'retain-on-failure'` | every run | that run failed |
  | `'retain-on-first-failure'` | first run only | the first run failed |
  | `'retain-on-failure-and-retries'` | every run | that run failed, or it is a retry |
  | `'on-first-retry'` | first retry only | always |
  | `'on-all-retries'` | every retry | always |

- Since v1.64 the `video` option accepts `fps`; videos are encoded with VP9 instead of VP8. `Screencast.showActions` `style` (CSS declarations) replaces the deprecated `fontSize` option.
- `screen: { width, height }` (v1.64, `TestOptions.screen`): "Emulates consistent window screen size available inside web page via `window.screen`. Is only used when the `viewport` is set." Example: `viewport: { width: 390, height: 664 }, screen: { width: 390, height: 844 }`.
- `reuseContext: boolean` (v1.62, `TestOptions.reuseContext`, default `false`) is **experimental** and discouraged: "This option trades test isolation for speed and is intended for component tests that drive a story gallery. Leave it unset for end-to-end tests - a fresh browser context per test is one of the core guarantees of Playwright Test." When `true`, all tests in a worker process run in a single browser context that is reused between tests. Between tests, Playwright resets the state that component tests typically touch: it clears cookies, cache, local storage and IndexedDB of visited origins, unregisters service workers, closes extra pages, removes routes, bindings and init scripts, and re-applies the configured storage state, viewport and emulation options. This reset is best-effort, not a guarantee of isolation. State that is **not** reset includes:
  - Permissions granted with `BrowserContext.grantPermissions()` during a test.
  - Runtime changes made through `BrowserContext.setGeolocation()`, `setOffline()` and `setExtraHTTPHeaders()`.
  - Browsing history, `window.name` and any browser-process-wide state.

  Additional restrictions:
  - The option is ignored when `video` recording is enabled.
  - Only a few context options may differ between consecutive tests: `colorScheme`, `forcedColors`, `reducedMotion`, `contrast`, `screen`, `userAgent`, `viewport` and `testIdAttribute`. Changing any other option in `test.use()`, for example `locale` or `storageState`, silently forces a fresh context and negates the speedup.
  - Do not combine with `connectOptions` pointing multiple workers at a shared browser; workers would compete for the single reusable context.
  - `recordHar` in `contextOptions` is not supported and produces no HAR file.

  ```typescript
  export default defineConfig({
    projects: [
      { name: 'components', testDir: './tests/components', use: { reuseContext: true } },
    ],
  });
  ```
- Since v1.63 the `trace` option accepts a `snapshots` object (`dom`, `aria`, `screen` flags), and `reducedMotion`, `forcedColors`, and `contrast` are standalone `use` options.
- `trace` mode `retain-on-failure-and-retries` was added in v1.59.
- `videosPath` / `videoSize` context options were removed in v1.60; use `recordVideo`.
- `httpCredentials` accepts an array of credentials since v1.63.

### Context Options

```typescript
export default defineConfig({
  use: {
    // Additional options passed to browser.newContext()
    contextOptions: {
      reducedMotion: 'reduce',
    },

    // Service worker policy
    serviceWorkers: 'block',
  },
});
```

## Expect Configuration

```typescript
export default defineConfig({
  expect: {
    // Timeout for auto-retrying assertions (default: 5000)
    timeout: 10_000,

    // Screenshot comparison options
    toHaveScreenshot: {
      maxDiffPixels: 10,
      maxDiffPixelRatio: 0.01,
      threshold: 0.2,
      animations: 'disabled',
    },

    // Snapshot comparison options
    toMatchSnapshot: {
      maxDiffPixelRatio: 0.1,
    },
  },
});
```

## Test Matching & Filtering

```typescript
export default defineConfig({
  // Only run files matching this pattern
  testMatch: '*todo-tests/*.spec.ts',

  // Exclude files matching this pattern
  testIgnore: '*test-assets',
});
```

These accept glob strings or regex patterns. They apply relative to `testDir`.

## Per-Project Use Overrides

```typescript
export default defineConfig({
  use: {
    locale: 'en-US',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'], locale: 'en-GB' },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 13'] },
    },
  ],
});
```

## Per-Test Use Overrides

```typescript
import { test } from '@playwright/test';

// Override for all tests in this file
test.use({ locale: 'fr-FR' });

test('french locale test', async ({ page }) => {
  // page uses fr-FR locale
});

// Override within a describe block
test.describe('german tests', () => {
  test.use({ locale: 'de-DE', timezoneId: 'Europe/Berlin' });

  test('german locale test', async ({ page }) => {
    // page uses de-DE locale
  });
});
```

## Resetting Options to Config Defaults

```typescript
// Reset an option to config value by passing undefined
test.describe(() => {
  test.use({ baseURL: undefined });

  test('no base url', async ({ page }) => {
    // baseURL is reset to the value from config
  });
});
```

## Full Example

```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['html'], ['json', { outputFile: 'test-results.json' }]],
  timeout: 30_000,
  outputDir: 'test-results',

  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    actionTimeout: 10_000,
    navigationTimeout: 30_000,
  },

  expect: {
    timeout: 10_000,
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
  ],

  webServer: {
    command: 'npm run start',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
});
```
