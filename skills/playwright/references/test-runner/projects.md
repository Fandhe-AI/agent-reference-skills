# Projects

Projects organize tests into logical groups that share a common configuration. They enable running the same tests across multiple browsers, devices, and environments with distinct settings.

## Multi-Browser Configuration

```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  projects: [
    // Desktop browsers
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

    // Mobile emulation
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 13'] },
    },

    // Tablet emulation
    {
      name: 'Tablet',
      use: { ...devices['iPad (gen 7)'] },
    },
  ],
});
```

## Branded Browser Channels

Use the `channel` property to test with Google Chrome or Microsoft Edge instead of the bundled Chromium.

```typescript
export default defineConfig({
  projects: [
    {
      name: 'Google Chrome',
      use: {
        ...devices['Desktop Chrome'],
        channel: 'chrome',
      },
    },
    {
      name: 'Microsoft Edge',
      use: {
        ...devices['Desktop Edge'],
        channel: 'msedge',
      },
    },
  ],
});
```

## Running Specific Projects

```bash
# Run all projects
npx playwright test

# Run a specific project by name
npx playwright test --project=firefox

# Run multiple projects
npx playwright test --project=chromium --project=firefox
```

## Environment-Based Projects

Use projects to test against different environments with distinct settings.

```typescript
export default defineConfig({
  timeout: 60_000,
  projects: [
    {
      name: 'staging',
      use: {
        baseURL: 'https://staging.example.com',
      },
      retries: 2,
    },
    {
      name: 'production',
      use: {
        baseURL: 'https://production.example.com',
      },
      retries: 0,
    },
  ],
});
```

```bash
npx playwright test --project=staging
```

## Test Splitting with testMatch / testIgnore

Partition tests into different projects using file patterns.

```typescript
export default defineConfig({
  projects: [
    {
      name: 'Smoke',
      testMatch: /.*smoke\.spec\.ts/,
      retries: 0,
    },
    {
      name: 'Regression',
      testIgnore: /.*smoke\.spec\.ts/,
      retries: 2,
    },
    {
      name: 'API',
      testDir: './tests/api',
      testMatch: '**/*.api.spec.ts',
    },
  ],
});
```

## Project Dependencies

Projects can declare dependencies that must run first. Dependent projects only start after all dependencies pass.

```typescript
export default defineConfig({
  projects: [
    {
      name: 'setup',
      testMatch: '**/*.setup.ts',
    },
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        // Use storage state from the setup project
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

Execution order:
1. `setup` project runs and completes.
2. `chromium` and `firefox` projects run in parallel.
3. If `setup` fails, dependent projects are skipped.

## Teardown Projects

A teardown project runs after all projects that depend on its paired setup project.

```typescript
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
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
      dependencies: ['setup db'],
    },
  ],
});
```

Execution order:
1. `setup db` runs.
2. `chromium` and `firefox` run in parallel.
3. `cleanup db` runs after both `chromium` and `firefox` finish.

## Filtering with Dependencies

When you filter tests with `--grep`, `--shard`, or location-based selection, dependency projects are automatically included.

```bash
# Runs the setup project first, then only matching tests in chromium
npx playwright test --project=chromium --grep @smoke
```

### --no-deps

Skip dependency projects and run only the directly selected projects.

```bash
# Run chromium tests without running the setup project
npx playwright test --project=chromium --no-deps
```

## Per-Project Configuration

Each project can override any top-level or `use` option.

```typescript
export default defineConfig({
  timeout: 30_000,
  retries: 0,
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
      name: 'firefox-slow',
      use: { ...devices['Desktop Firefox'] },
      timeout: 60_000,
      retries: 2,
    },
    {
      name: 'api-tests',
      testDir: './tests/api',
      use: {
        baseURL: 'http://localhost:3000/api',
      },
    },
  ],
});
```

## Complete Example with Setup, Tests, and Teardown

```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  reporter: [['html'], ['github']],

  projects: [
    // Authentication setup
    { name: 'setup', testMatch: /.*\.setup\.ts/ },

    // Browser testing with auth
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
    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari'],
        storageState: 'playwright/.auth/user.json',
      },
      dependencies: ['setup'],
    },

    // Mobile testing with auth
    {
      name: 'Mobile Chrome',
      use: {
        ...devices['Pixel 5'],
        storageState: 'playwright/.auth/user.json',
      },
      dependencies: ['setup'],
    },
  ],
});
```
