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

## Test Locks

A few tests in your suite may access a shared resource that does not support concurrent access, for example an external service or a global account setting. You can declare named locks on such tests, so that tests sharing a lock name never run at the same time, while all other tests continue to run in parallel. Locks work across files, worker processes and projects.

```typescript
// settings.spec.ts
import { test, expect } from '@playwright/test';

test('update user settings', { lock: 'user-settings' }, async ({ page }) => {
  // ...
});
```

```typescript
// profile.spec.ts
import { test, expect } from '@playwright/test';

// Never runs concurrently with 'update user settings' above,
// even in a different project.
test('rename user', { lock: 'user-settings' }, async ({ page }) => {
  // ...
});
```

A test can declare multiple locks and will only run when all of them are available. You can also declare locks on a group with `test.describe`, applying them to every test inside.

```typescript
test('reset the database', { lock: ['database', 'external-api'] }, async () => {
  // ...
});
```

You can also add locks to the enclosing file or describe group with `test.describe.configure` (v1.64). Repeated calls add locks without removing existing ones.

```typescript
test.describe.configure({ lock: 'user-settings' });
```

Playwright acquires all the locks of a test before the test starts and releases them when it finishes.

> In the default and serial modes, all tests in a file run together in order, so a lock declared on any test is held for the duration of the whole file.

## Avoiding Shared State in Parallel Tests

Playwright runs tests in separate worker processes, each with its own isolated `BrowserContext`, so cookies, storage and in-memory globals are already isolated. Flakiness comes from state that lives *outside* a single test. Here are recipes for the common cases.

### Give each test its own backend data

Two tests that create or edit the same record race with each other. Derive a unique identifier from `testInfo.testId` so parallel tests never collide:

```typescript
import { test, expect } from '@playwright/test';

test('creates an order', async ({ page }, testInfo) => {
  const orderId = `order-${testInfo.testId}`;
  await page.goto(`/orders/new?id=${orderId}`);
  await expect(page.getByText(orderId)).toBeVisible();
});
```

> `testInfo.testId` is computed from the test file name, test title and project name and is unique within one Playwright session (see `TestCase.id`), but it is the same across separate runs. If several CI runs or machines share the same backend, add a run-specific prefix (for example a CI run ID) to the identifier.

If many tests can share one dataset, create it once per worker instead (see Worker Index & Parallel Index below).

### Write to a unique file path

Multiple tests writing the same path clobber each other. `testInfo.outputPath()` returns a path scoped to the current test:

```typescript
import { test } from '@playwright/test';
import fs from 'fs';

test('exports a CSV', async ({ page }, testInfo) => {
  const file = testInfo.outputPath('export.csv');
  await fs.promises.writeFile(file, 'a,b,c', 'utf8');
});
```

### Keep tests independent

Above all, keep your tests isolated from one another. A test that leaks state through a module-level variable or depends on another test's side effects works when tests run in order, but breaks the moment they run in parallel or in a different order. Set up everything a test needs in that test or in a fixture, and never rely on another test having run first.

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

### Shuffle

`npx playwright test --shuffle [seed]` (v1.64): "Schedule tests in a random order: test files are shuffled, and so are individual tests in parallel mode. Tests that must run together, for example in a serial suite, keep their order. The seed is printed at the start of the run, pass it to reproduce the same order."

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

Sharding distributes tests across multiple machines to reduce total run time. See the dedicated [sharding reference](./sharding.md) for full details on CLI syntax, shard balancing, blob reporter integration, and GitHub Actions setup.
