# Parallelism & Sharding

Playwright Test runs tests in parallel using worker processes. Each worker is an independent OS process with its own browser instance. Sharding distributes tests across multiple machines.

## Worker Processes

Each worker starts its own browser and maintains an isolated environment. Workers are restarted after a test failure to guarantee a clean state.

### Configuring Workers

```bash
# CLI
npx playwright test --workers 4

# Use percentage of CPUs
npx playwright test --workers=50%
```

```typescript
// playwright.config.ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
  // Number or percentage of logical CPU cores
  workers: process.env.CI ? 2 : undefined, // undefined = half of CPUs
});
```

### Disabling Parallelism

```bash
npx playwright test --workers=1
```

```typescript
export default defineConfig({
  workers: 1,
});
```

## Parallel Execution Modes

### Default Behavior

By default, tests within a single file run sequentially while different files run in parallel across workers.

### fullyParallel

Run all tests in all files in parallel.

```typescript
// Global: all tests run in parallel
export default defineConfig({
  fullyParallel: true,
});

// Per-project
export default defineConfig({
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
      fullyParallel: true,
    },
  ],
});
```

### Parallel Mode for a Describe Block

```typescript
import { test } from '@playwright/test';

test.describe.configure({ mode: 'parallel' });

test('runs in parallel 1', async ({ page }) => {
  // ...
});

test('runs in parallel 2', async ({ page }) => {
  // ...
});
```

### Serial Mode

Tests in a serial group run in order within the same worker. If one fails, all subsequent tests in the group are skipped. With retries, the entire group retries from the beginning.

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

test('step 1: login', async () => {
  await page.goto('https://example.com/login');
  await page.fill('#username', 'user');
  await page.fill('#password', 'pass');
  await page.click('button[type=submit]');
});

test('step 2: navigate', async () => {
  await page.getByText('Dashboard').click();
});

test('step 3: verify', async () => {
  await page.waitForURL('**/dashboard');
});
```

### Opting Out of Fully Parallel

When `fullyParallel` is enabled globally, opt specific describe blocks out:

```typescript
test.describe('sequential within this block', () => {
  test.describe.configure({ mode: 'default' });

  test('runs first', async ({ page }) => {});
  test('runs second', async ({ page }) => {});
});
```

## Worker Index & Parallel Index

Use indices to isolate per-worker data (e.g., unique database users, ports).

```typescript
import { test as base } from '@playwright/test';

export const test = base.extend<{}, { workerDb: string }>({
  workerDb: [async ({}, use, workerInfo) => {
    // workerIndex: unique, incrementing index across all workers
    // parallelIndex: reused index from 0 to workers-1
    const dbName = `test_db_${workerInfo.workerIndex}`;
    await createDatabase(dbName);
    await use(dbName);
    await dropDatabase(dbName);
  }, { scope: 'worker' }],
});
```

Available via:
- `workerInfo.workerIndex` / `testInfo.workerIndex` -- unique per worker instance
- `workerInfo.parallelIndex` / `testInfo.parallelIndex` -- 0 to `workers - 1`, reused
- `process.env.TEST_WORKER_INDEX` / `process.env.TEST_PARALLEL_INDEX`

## Limiting Failures

Stop the test run early after a number of failures.

```bash
npx playwright test --max-failures=10
```

```typescript
export default defineConfig({
  maxFailures: process.env.CI ? 10 : undefined,
});
```

When the limit is reached, all remaining tests are skipped and Playwright exits.

## Test Ordering

### Default

Files run in parallel; tests within a file run sequentially (unless `fullyParallel` is on).

### Alphabetical Ordering

With `workers: 1`, name files with numeric prefixes:

```
001-user-signup.spec.ts
002-user-login.spec.ts
003-dashboard.spec.ts
```

### Test List File

Control execution order explicitly:

```typescript
// test.list.ts
import { test } from '@playwright/test';
import featureBTests from './feature-b.spec.ts';
import featureATests from './feature-a.spec.ts';

test.describe(featureBTests);
test.describe(featureATests);
```

```typescript
// playwright.config.ts
export default defineConfig({
  workers: 1,
  testMatch: 'test.list.ts',
});
```

## Sharding

Distribute tests across multiple machines to reduce total run time.

### CLI Syntax

```bash
# Run shard 1 of 4
npx playwright test --shard=1/4

# Run shard 2 of 4
npx playwright test --shard=2/4
```

### Shard Balancing

- With `fullyParallel: true`: individual tests are distributed evenly across shards.
- Without `fullyParallel`: entire test files are assigned to shards. Uneven file sizes cause imbalanced shards.

### Merging Shard Reports

1. Use the blob reporter to collect results from each shard:

```typescript
// playwright.config.ts
export default defineConfig({
  reporter: process.env.CI ? 'blob' : 'html',
});
```

2. Merge reports after all shards complete:

```bash
npx playwright merge-reports --reporter html ./all-blob-reports
```

### GitHub Actions Example

```yaml
name: Playwright Tests

jobs:
  test:
    strategy:
      fail-fast: false
      matrix:
        shardIndex: [1, 2, 3, 4]
        shardTotal: [4]
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci
      - run: npx playwright install --with-deps
      - run: npx playwright test --shard=${{ matrix.shardIndex }}/${{ matrix.shardTotal }}
      - uses: actions/upload-artifact@v4
        if: ${{ !cancelled() }}
        with:
          name: blob-report-${{ matrix.shardIndex }}
          path: blob-report
          retention-days: 1

  merge-reports:
    if: ${{ !cancelled() }}
    needs: [test]
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci
      - uses: actions/download-artifact@v4
        with:
          path: all-blob-reports
          pattern: blob-report-*
          merge-multiple: true
      - run: npx playwright merge-reports --reporter html ./all-blob-reports
      - uses: actions/upload-artifact@v4
        with:
          name: html-report
          path: playwright-report
          retention-days: 14
```
