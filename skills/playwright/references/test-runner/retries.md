# Retries

Playwright Test can automatically retry failed tests. When retries are enabled, tests are categorized as passed, flaky, or failed based on their retry outcomes.

## Enabling Retries

### CLI

```bash
npx playwright test --retries=3
```

### Configuration

```typescript
// playwright.config.ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
  retries: 3,
});
```

### Per-Group Retries

```typescript
import { test } from '@playwright/test';

test.describe(() => {
  test.describe.configure({ retries: 2 });

  test('flaky test 1', async ({ page }) => {
    // Will be retried up to 2 times
  });

  test('flaky test 2', async ({ page }) => {
    // Will be retried up to 2 times
  });
});
```

## Test Categories

| Category | Description |
|----------|-------------|
| **passed** | Test succeeded on the first attempt |
| **flaky** | Test failed on first attempt but passed on a retry |
| **failed** | Test failed on first attempt and all retries |

Example output:

```
Running 3 tests using 1 worker

  1 flaky
    1) example.spec.ts:5:2 > second flaky ─────────────────────────────
  2 passed (4s)
```

## Detecting Retries with testInfo.retry

Access the current retry attempt number (0-based) in tests, hooks, and fixtures.

```typescript
import { test, expect } from '@playwright/test';

test('my test', async ({ page }, testInfo) => {
  if (testInfo.retry) {
    // This is a retry - clean up before re-running
    await cleanSomeCachesOnTheServer();
  }

  // testInfo.retry is 0 on first run, 1 on first retry, etc.
  console.log(`Attempt ${testInfo.retry + 1}`);
});
```

### In beforeEach / afterEach

```typescript
test.beforeEach(async ({ page }, testInfo) => {
  if (testInfo.retry > 0) {
    console.log(`Retrying: ${testInfo.title}, attempt ${testInfo.retry}`);
    await resetTestState();
  }
});
```

## Worker Behavior on Retry

When a test fails, Playwright:

1. Discards the worker process along with its browser instance.
2. Starts a new worker process with a fresh browser.
3. Re-runs `beforeAll` / `beforeEach` hooks.
4. Retries the failed test.

This ensures a completely clean environment for each retry attempt.

## Serial Mode Retries

In `test.describe.configure({ mode: 'serial' })` groups:

### Without Retries

If a test fails, all subsequent tests in the group are skipped.

```
  x step 1  (failed)
  - step 2  (skipped)
  - step 3  (skipped)
```

### With Retries

The entire group retries from the first test, not just the failed one.

```
  x step 1  (failed)
  - step 2  (skipped)
  - step 3  (skipped)

  Retry #1:
  ✓ step 1  (passed)
  ✓ step 2  (passed)
  ✓ step 3  (passed)
```

```typescript
import { test, type Page } from '@playwright/test';

test.describe.configure({ mode: 'serial' });

let page: Page;

test.beforeAll(async ({ browser }) => {
  page = await browser.newPage();
});

test.afterAll(async () => {
  await page.close();
});

test('step 1', async () => {
  await page.goto('https://playwright.dev/');
});

test('step 2', async () => {
  await page.getByText('Get Started').click();
});

test('step 3', async () => {
  await page.waitForURL('**/docs/intro');
});
```

## Combining Retries with Other Features

### Retries + Screenshots on Failure

```typescript
export default defineConfig({
  retries: 2,
  use: {
    screenshot: 'only-on-failure',
    trace: 'on-first-retry',
  },
});
```

This captures a screenshot on every failure and a full trace on the first retry, providing diagnostics for flaky test investigation.

### Retries + Video

```typescript
export default defineConfig({
  retries: 2,
  use: {
    video: 'retain-on-failure',
  },
});
```

Videos are recorded for all tests but only retained for tests that fail (including retries).

## Best Practices

- Prefer isolated tests that can retry independently over serial groups.
- Use `trace: 'on-first-retry'` to capture diagnostics for flaky tests.
- Use `testInfo.retry` to perform cleanup or reset state before retrying.
- Set higher retries in CI where flakiness from infrastructure is more common.
