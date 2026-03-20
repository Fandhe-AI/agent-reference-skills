# Timeouts

Playwright Test enforces several timeout layers. Each timeout has a default, can be configured globally, and can be overridden per-test or per-assertion.

## Timeout Summary

| Timeout | Default | Scope |
|---------|---------|-------|
| Test timeout | 30,000 ms | Single test (includes test body, fixtures, `beforeEach`/`afterEach`) |
| Expect timeout | 5,000 ms | Individual auto-retrying assertion |
| Action timeout | No limit | Individual action (`click`, `fill`, etc.) |
| Navigation timeout | No limit | Navigation (`goto`, `goBack`, etc.) |
| Global timeout | No limit | Entire test run |
| beforeAll/afterAll timeout | 30,000 ms | Hook execution |
| Fixture timeout | No limit | Individual fixture setup/teardown |

## Test Timeout

The test timeout covers the test function, fixture setup/teardown, and `beforeEach`/`afterEach` hooks. A separate timeout of the same duration applies to `afterEach` hooks and fixture teardown after the test completes.

### Global Config

```typescript
// playwright.config.ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
  timeout: 60_000, // 60 seconds
});
```

### Per-Test Override

```typescript
import { test, expect } from '@playwright/test';

test('slow test', async ({ page }) => {
  test.setTimeout(120_000); // 2 minutes for this test
  // ...
});
```

### Using test.slow()

Triples the timeout for the current test.

```typescript
test('heavy computation', async ({ page }) => {
  test.slow(); // 30s -> 90s
  // ...
});

// Conditional
test('slow on CI', async ({ page }) => {
  test.slow(!!process.env.CI, 'CI machines are slower');
  // ...
});
```

### Extending Timeout in beforeEach

```typescript
test.beforeEach(async ({ page }, testInfo) => {
  // Add 30 seconds to the test timeout
  testInfo.setTimeout(testInfo.timeout + 30_000);
  await page.goto('/slow-page');
});
```

## Expect Timeout

Auto-retrying assertions (like `toBeVisible()`, `toHaveText()`) use a separate timeout, unrelated to the test timeout.

### Global Config

```typescript
export default defineConfig({
  expect: {
    timeout: 10_000, // 10 seconds
  },
});
```

### Per-Assertion Override

```typescript
import { test, expect } from '@playwright/test';

test('assertion timeout', async ({ page }) => {
  // Override for a single assertion
  await expect(page.locator('#slow-element')).toBeVisible({
    timeout: 15_000,
  });

  await expect(page.locator('#heading')).toHaveText('Welcome', {
    timeout: 10_000,
  });
});
```

## Action Timeout

Applies to individual Playwright actions like `click()`, `fill()`, `selectOption()`, etc.

### Global Config

```typescript
export default defineConfig({
  use: {
    actionTimeout: 10_000,
  },
});
```

### Per-Action Override

```typescript
test('action timeout', async ({ page }) => {
  // Override for a single action
  await page.getByRole('button', { name: 'Submit' }).click({
    timeout: 5_000,
  });

  await page.getByLabel('Search').fill('query', {
    timeout: 3_000,
  });
});
```

## Navigation Timeout

Applies to page navigation methods: `goto()`, `goBack()`, `goForward()`, `reload()`, and `waitForURL()`.

### Global Config

```typescript
export default defineConfig({
  use: {
    navigationTimeout: 30_000,
  },
});
```

### Per-Navigation Override

```typescript
test('navigation timeout', async ({ page }) => {
  await page.goto('https://slow-site.com', {
    timeout: 60_000,
  });

  await page.waitForURL('**/dashboard', {
    timeout: 15_000,
  });
});
```

## Global Timeout

A hard limit on the entire test run. Prevents runaway test suites from consuming resources indefinitely.

```typescript
export default defineConfig({
  globalTimeout: 3_600_000, // 1 hour for the entire run
});
```

There is no default global timeout. When reached, all running tests are terminated.

## beforeAll / afterAll Timeout

`beforeAll` and `afterAll` hooks share a separate timeout, equal to the test timeout by default.

```typescript
import { test } from '@playwright/test';

test.beforeAll(async () => {
  // Extend the hook timeout
  test.setTimeout(60_000);
  await seedDatabase();
});
```

## Fixture Timeout

Set an independent timeout for individual fixtures.

```typescript
import { test as base } from '@playwright/test';

const test = base.extend<{ slowDatabase: string }>({
  slowDatabase: [async ({}, use) => {
    const db = await connectToSlowDatabase();
    await use(db);
    await db.close();
  }, { timeout: 60_000 }],
});
```

Each worker-scoped fixture also has its own timeout, defaulting to the test timeout.

## expect().toPass() Timeout

The `toPass()` helper retries an assertion block until it passes or the timeout expires.

```typescript
test('retrying assertion block', async ({ page }) => {
  await expect(async () => {
    const response = await page.request.get('/api/status');
    expect(response.status()).toBe(200);
  }).toPass({
    timeout: 30_000,    // Total time to retry
    intervals: [1_000, 2_000, 5_000], // Retry intervals
  });
});
```

## Complete Configuration Example

```typescript
import { defineConfig } from '@playwright/test';

export default defineConfig({
  // Test timeout: 60 seconds
  timeout: 60_000,

  // Global timeout: 1 hour for entire run
  globalTimeout: 3_600_000,

  // Expect (assertion) timeout
  expect: {
    timeout: 10_000,
  },

  // Action and navigation timeouts
  use: {
    actionTimeout: 15_000,
    navigationTimeout: 30_000,
  },
});
```
