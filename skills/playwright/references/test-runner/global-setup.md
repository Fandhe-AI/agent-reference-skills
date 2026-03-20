# Global Setup & Teardown

Playwright offers two approaches for running setup/teardown logic before and after all tests: project dependencies (recommended) and the legacy `globalSetup`/`globalTeardown` config options.

## Approach 1: Project Dependencies (Recommended)

Setup and teardown are regular test files that run as dedicated projects. This approach integrates fully with the test runner, including traces, retries, and HTML reports.

### Setup Project

```typescript
// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  projects: [
    {
      name: 'setup',
      testMatch: /global\.setup\.ts/,
    },
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        storageState: 'playwright/.auth/user.json',
      },
      dependencies: ['setup'],
    },
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
        storageState: 'playwright/.auth/user.json',
      },
      dependencies: ['setup'],
    },
  ],
});
```

```typescript
// tests/global.setup.ts
import { test as setup, expect } from '@playwright/test';

setup('authenticate', async ({ page }) => {
  await page.goto('/login');
  await page.getByLabel('Username').fill('admin');
  await page.getByLabel('Password').fill('password');
  await page.getByRole('button', { name: 'Sign in' }).click();

  await expect(page.getByText('Welcome')).toBeVisible();

  // Save signed-in state for dependent projects
  await page.context().storageState({ path: 'playwright/.auth/user.json' });
});
```

### Teardown Project

```typescript
// playwright.config.ts
export default defineConfig({
  projects: [
    {
      name: 'setup db',
      testMatch: /global\.setup\.ts/,
      teardown: 'cleanup db',
    },
    {
      name: 'cleanup db',
      testMatch: /global\.teardown\.ts/,
    },
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
      dependencies: ['setup db'],
    },
  ],
});
```

```typescript
// tests/global.setup.ts
import { test as setup } from '@playwright/test';

setup('create database', async ({}) => {
  console.log('Creating test database...');
  // Initialize database
});
```

```typescript
// tests/global.teardown.ts
import { test as teardown } from '@playwright/test';

teardown('delete database', async ({}) => {
  console.log('Deleting test database...');
  // Clean up database
});
```

Execution order:
1. `setup db` runs first.
2. `chromium` (and other dependent projects) run.
3. `cleanup db` runs after all dependent projects finish.

### Filtering Behavior

When filtering tests with `--grep`, `--project`, or location-based selection, dependency projects are automatically included.

```bash
# Runs setup first, then the filtered chromium tests
npx playwright test --project=chromium --grep @smoke

# Skip dependencies
npx playwright test --project=chromium --no-deps
```

## Approach 2: globalSetup / globalTeardown Config

A single function that runs once before (or after) all tests. Requires manual browser management and does not appear in HTML reports.

### Configuration

```typescript
// playwright.config.ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
  globalSetup: require.resolve('./global-setup'),
  globalTeardown: require.resolve('./global-teardown'),
});
```

### Function Signature

The function receives a `FullConfig` parameter with the resolved configuration.

```typescript
// global-setup.ts
import { chromium, type FullConfig } from '@playwright/test';

async function globalSetup(config: FullConfig) {
  const { baseURL, storageState } = config.projects[0].use;
  // Setup logic
}

export default globalSetup;
```

### Authentication Example

```typescript
// global-setup.ts
import { chromium, type FullConfig } from '@playwright/test';

async function globalSetup(config: FullConfig) {
  const { baseURL, storageState } = config.projects[0].use;

  // Must manually launch browser
  const browser = await chromium.launch();
  const page = await browser.newPage();

  await page.goto(baseURL!);
  await page.getByLabel('User Name').fill('user');
  await page.getByLabel('Password').fill('password');
  await page.getByText('Sign in').click();

  // Save authentication state
  await page.context().storageState({ path: storageState as string });
  await browser.close();
}

export default globalSetup;
```

```typescript
// playwright.config.ts
export default defineConfig({
  globalSetup: require.resolve('./global-setup'),
  use: {
    baseURL: 'http://localhost:3000',
    storageState: 'playwright/.auth/user.json',
  },
});
```

### Passing Environment Variables

Pass data from globalSetup to tests using `process.env`.

```typescript
// global-setup.ts
import type { FullConfig } from '@playwright/test';

async function globalSetup(config: FullConfig) {
  process.env.ADMIN_TOKEN = 'generated-token-123';
  process.env.API_DATA = JSON.stringify({ key: 'value' });
}

export default globalSetup;
```

```typescript
// tests/example.spec.ts
import { test, expect } from '@playwright/test';

test('use env from global setup', async ({ request }) => {
  const token = process.env.ADMIN_TOKEN;
  const response = await request.get('/api/admin', {
    headers: { Authorization: `Bearer ${token}` },
  });
  expect(response.ok()).toBeTruthy();
});
```

### Capturing Traces on Failure

Wrap globalSetup in try/catch to capture a trace when setup fails.

```typescript
// global-setup.ts
import { chromium, type FullConfig } from '@playwright/test';

async function globalSetup(config: FullConfig) {
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    await context.tracing.start({ screenshots: true, snapshots: true });

    // Setup operations
    await page.goto('http://localhost:3000/login');
    await page.fill('#username', 'admin');
    await page.fill('#password', 'password');
    await page.click('button[type=submit]');

    await context.tracing.stop({
      path: './test-results/setup-trace.zip',
    });
  } catch (error) {
    await context.tracing.stop({
      path: './test-results/failed-setup-trace.zip',
    });
    throw error;
  } finally {
    await browser.close();
  }
}

export default globalSetup;
```

### Global Teardown

```typescript
// global-teardown.ts
import type { FullConfig } from '@playwright/test';

async function globalTeardown(config: FullConfig) {
  // Clean up resources
  console.log('Global teardown complete');
}

export default globalTeardown;
```

## Comparison

| Feature | Project Dependencies | globalSetup/globalTeardown |
|---------|---------------------|---------------------------|
| Visible in HTML report | Yes | No |
| Trace recording | Automatic | Manual (try/catch) |
| Playwright fixtures | Fully supported | Not available |
| Browser management | Via `page`/`browser` fixtures | Manual launch/close |
| Parallelism & retries | Supported | Not applicable |
| Config options (headless, etc.) | Auto-applied | Must set manually |
| Environment variables | Via fixtures or storage | `process.env` |
| Selective execution | Automatic with `--grep` | Always runs |
| Skip with `--no-deps` | Yes | No |
