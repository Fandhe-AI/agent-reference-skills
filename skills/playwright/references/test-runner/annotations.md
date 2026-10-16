# Annotations

Playwright Test provides annotations to mark tests as skipped, expected to fail, slow, or focused. Annotations can be conditional, tag-based, or custom with metadata for reporting.

## test.skip()

Marks a test as irrelevant. Playwright does not run the test.

```typescript
import { test, expect } from '@playwright/test';

// Unconditional skip
test.skip('not yet implemented', async ({ page }) => {
  // This test body is not executed
});

// Conditional skip inside the test body
test('skip in WebKit', async ({ page, browserName }) => {
  test.skip(browserName === 'webkit', 'Feature not supported in WebKit');
  // Test body runs only in non-WebKit browsers
});
```

## test.fail()

Marks a test as expected to fail. Playwright runs the test and verifies it actually fails. If the test passes, Playwright reports an error.

```typescript
test('known broken feature', async ({ page }) => {
  test.fail();
  // Test runs but is expected to fail
  await expect(page.locator('#broken')).toBeVisible();
});

// Conditional
test('fails on Firefox', async ({ page, browserName }) => {
  test.fail(browserName === 'firefox', 'Bug #1234');
  await page.goto('/feature');
});
```

## test.fixme()

Marks a test as failing but does not run it (unlike `test.fail()`). Use for tests you intend to fix later.

```typescript
test.fixme('needs investigation', async ({ page }) => {
  // Test body is not executed
});

// Conditional in hooks
test.beforeEach(async ({ page, isMobile }) => {
  test.fixme(isMobile, 'Settings page does not work in mobile yet');
  await page.goto('http://localhost:3000/settings');
});
```

## test.slow()

Marks a test as slow, tripling the test timeout.

```typescript
test('heavy computation', async ({ page }) => {
  test.slow();
  // Timeout is tripled (default: 30s -> 90s)
  await page.goto('/complex-report');
  await expect(page.locator('#report')).toBeVisible();
});

// Conditional
test('slow on CI', async ({ page }) => {
  test.slow(!!process.env.CI, 'CI machines are slower');
});
```

## test.only()

Focuses a test so only it (and other `.only` tests) run. Useful during development. Use `forbidOnly` in CI to prevent accidental commits.

```typescript
test.only('focus this test', async ({ page }) => {
  await page.goto('/important');
});
```

## Conditional Annotations with Fixtures

All annotations accept a condition and optional description. Fixture values (like `browserName`, `isMobile`) are available in the test body.

```typescript
test('conditional test', async ({ page, browserName, isMobile }) => {
  test.skip(isMobile, 'Not relevant for mobile');
  test.fail(browserName === 'firefox', 'Known Firefox bug');
  test.slow(browserName === 'webkit', 'WebKit is slower for this test');
});
```

## test.describe()

Groups tests logically. Annotations can apply to the entire group.

```typescript
test.describe('login feature', () => {
  test('valid credentials', async ({ page }) => {});
  test('invalid credentials', async ({ page }) => {});
});

// Skip entire group conditionally
test.describe('chromium only', () => {
  test.skip(({ browserName }) => browserName !== 'chromium', 'Chromium only!');

  test('test 1', async ({ page }) => {});
  test('test 2', async ({ page }) => {});
});
```

## Test Locks

You can declare named locks to prevent specific tests from running at the same time, while all other tests continue to run in parallel. Tests that share a lock name never run concurrently, even when they are declared in different files or belong to different projects. This is useful when a few tests access a shared resource that does not support concurrent access.

The `details` parameter of `test()` and `test.describe()` has existed since v1.42 (`tag`, `annotation`); `lock?: string | string[]` was added to it in v1.63. `test.describe.configure({ lock })` was added in v1.64 and sets additional named locks for all tests in the enclosing scope, including nested groups; locks are added to those declared in `test.describe` details and previous `test.describe.configure` calls.

```typescript
import { test, expect } from '@playwright/test';

test('update user settings', {
  lock: 'user-settings',
}, async ({ page }) => {
  // This test never runs concurrently with other tests
  // that declare the 'user-settings' lock.
});

test.describe('two tests with a lock', {
  lock: 'user-settings',
}, () => {
  test('one', async ({ page }) => {
    // ...
  });

  test('two', async ({ page }) => {
    // ...
  });
});

test.describe('settings', () => {
  test.describe.configure({ lock: 'user-settings' });
  test('reset user settings', async ({ page }) => {});
});
```

See also the Test locks section in `parallelism.md`.

Related:

- `test.abort(message?)` (v1.60): "Aborts the currently running test by throwing an error. The test is immediately marked as failed and execution stops." Useful from inside a fixture or a route handler. `message` is optional and is included in the failure error.
- `test.step(title, body, { box, location, params, subtitle, timeout })` and `test.step.skip`: `params` (v1.63) are "arbitrary serializable parameters describing the step", reported to the reporters as `testStep.params` and shown in the trace viewer; `subtitle` (v1.63) "complements the title, for example the target of the step", reported as `testStep.subtitle` and shown next to the title in test reports and the trace viewer.

## Tagging with @

Tags enable selective test execution via CLI filtering.

### Applying Tags

```typescript
// Tag in test options object
test('test login page', { tag: '@fast' }, async ({ page }) => {
  // ...
});

// Multiple tags
test('test full report', { tag: ['@slow', '@vrt'] }, async ({ page }) => {
  // ...
});

// Tag in test title (also works)
test('test full report @slow', async ({ page }) => {
  // ...
});

// Tag a describe block
test.describe('report tests', { tag: '@report' }, () => {
  test('header', async ({ page }) => {});
  test('body', async ({ page }) => {});
});
```

### Filtering by Tag with --grep

```bash
# Run tests with @fast tag
npx playwright test --grep @fast

# Exclude tests with @slow tag
npx playwright test --grep-invert @slow

# OR logic: run @fast or @slow tests
npx playwright test --grep "@fast|@slow"

# AND logic: run tests with both @fast and @report tags
npx playwright test --grep "(?=.*@fast)(?=.*@report)"
```

### Filtering by Tag in Config

```typescript
import { defineConfig } from '@playwright/test';

export default defineConfig({
  grep: /@fast/,
  grepInvert: /@slow/,
});
```

## Custom Annotations

Annotations have a `type` and optional `description`, visible in HTML reports and other reporters.

```typescript
// Single annotation
test('test login page', {
  annotation: {
    type: 'issue',
    description: 'https://github.com/microsoft/playwright/issues/23180',
  },
}, async ({ page }) => {
  // ...
});

// Multiple annotations
test('test full report', {
  annotation: [
    { type: 'issue', description: 'https://github.com/org/repo/issues/42' },
    { type: 'performance', description: 'Very slow test!' },
  ],
}, async ({ page }) => {
  // ...
});

// Annotate a describe block
test.describe('report tests', {
  annotation: { type: 'category', description: 'report' },
}, () => {
  test('test report header', async ({ page }) => {});
  test('test full report', async ({ page }) => {});
});
```

## Runtime Annotations

Add annotations dynamically during test execution using `test.info().annotations`.

```typescript
test('dynamic annotation', async ({ page, browser }) => {
  // Add annotation based on runtime values
  test.info().annotations.push({
    type: 'browser version',
    description: browser.version(),
  });

  test.info().annotations.push({
    type: 'environment',
    description: process.env.TEST_ENV ?? 'unknown',
  });

  await page.goto('/');
});
```

Runtime annotations appear in the same way as static annotations in HTML reports.
