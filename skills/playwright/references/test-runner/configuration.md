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
    video: 'on-first-retry',
  },
});
```

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
