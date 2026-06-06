# Configuration

Define `playwright.config.ts` for multi-browser projects, base URL, retries, and a dev server.

```typescript
// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: 'tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
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
      name: 'Mobile Safari',
      use: { ...devices['iPhone 13'] },
    },
  ],
  webServer: {
    command: 'npm run start',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
});
```

## Notes

- `baseURL` allows tests to use relative paths in `page.goto('/path')` instead of full URLs
- `trace: 'on-first-retry'` records a trace only when a test is retried, keeping CI storage costs low
- `forbidOnly` prevents accidentally committed `test.only()` from silently skipping tests in CI
- `webServer` starts a dev server before the test suite and waits until `url` is reachable
