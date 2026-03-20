# Fixtures

Fixtures establish the environment for each test, providing everything a test needs and nothing else. They encapsulate setup and teardown in the same place and are composable, reusable, and on-demand.

## Built-in Fixtures

| Fixture | Type | Scope | Description |
|---------|------|-------|-------------|
| `page` | `Page` | Test | Isolated page for this test run |
| `context` | `BrowserContext` | Test | Isolated browser context for this test run |
| `browser` | `Browser` | Worker | Shared browser instance across tests in a worker |
| `browserName` | `string` | Worker | Current browser name: `chromium`, `firefox`, or `webkit` |
| `request` | `APIRequestContext` | Test | Isolated API request context for this test run |

```typescript
import { test, expect } from '@playwright/test';

test('basic test', async ({ page, context, browserName, request }) => {
  await page.goto('https://example.com');

  // Use API request context
  const response = await request.get('/api/data');
  expect(response.ok()).toBeTruthy();

  // Conditional logic based on browser
  if (browserName === 'webkit') {
    // Safari-specific assertions
  }
});
```

## Creating Custom Fixtures with test.extend()

Define custom fixtures by extending the base test object. Code before `await use()` is setup; code after is teardown.

```typescript
import { test as base, expect } from '@playwright/test';
import { TodoPage } from './todo-page';

// Declare fixture types
type MyFixtures = {
  todoPage: TodoPage;
};

// Extend the base test
export const test = base.extend<MyFixtures>({
  todoPage: async ({ page }, use) => {
    // Setup
    const todoPage = new TodoPage(page);
    await todoPage.goto();
    await todoPage.addToDo('item1');

    // Provide fixture value to the test
    await use(todoPage);

    // Teardown
    await todoPage.removeAll();
  },
});

export { expect } from '@playwright/test';
```

Use in tests:

```typescript
import { test, expect } from './fixtures';

test('add todo', async ({ todoPage }) => {
  await todoPage.addToDo('Buy milk');
  await expect(todoPage.items).toHaveCount(2);
});
```

## Test-Scoped vs Worker-Scoped Fixtures

### Test-Scoped (default)

Created and destroyed for each test. Every test gets a fresh instance.

```typescript
export const test = base.extend<{ userPage: Page }>({
  userPage: async ({ browser }, use) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await use(page);
    await context.close();
  },
});
```

### Worker-Scoped

Created once per worker process and shared across all tests in that worker. Useful for expensive resources like database connections or shared accounts.

```typescript
// Second type parameter = worker-scoped fixtures
export const test = base.extend<{}, { account: Account }>({
  account: [async ({ browser }, use, workerInfo) => {
    // Unique per worker to avoid conflicts
    const username = 'user' + workerInfo.workerIndex;
    const password = 'password' + workerInfo.workerIndex;

    // Setup: create account once
    await createAccount(username, password);
    await use({ username, password });

    // Teardown: runs when worker shuts down
    await deleteAccount(username);
  }, { scope: 'worker' }],
});
```

## Automatic Fixtures

Auto fixtures run for every test/worker even if the test does not list them in its parameters. Useful for global setup like logging or intercepting requests.

```typescript
export const test = base.extend<{ saveLogs: void }>({
  saveLogs: [async ({}, use, testInfo) => {
    const logs: string[] = [];
    // Setup: collect logs during test
    await use();
    // Teardown: save logs on failure
    if (testInfo.status !== testInfo.expectedStatus) {
      const logFile = testInfo.outputPath('logs.txt');
      await fs.promises.writeFile(logFile, logs.join('\n'), 'utf-8');
      testInfo.attachments.push({
        name: 'logs',
        contentType: 'text/plain',
        path: logFile,
      });
    }
  }, { auto: true }],
});
```

## Fixture Options

Declarative, type-safe configuration that can be set in `playwright.config.ts` or with `test.use()`.

```typescript
// fixtures.ts
export type MyOptions = {
  defaultItem: string;
  baseApiUrl: string;
};

export const test = base.extend<MyOptions & { todoPage: TodoPage }>({
  // Declare options with default values
  defaultItem: ['Something nice', { option: true }],
  baseApiUrl: ['http://localhost:3000/api', { option: true }],

  // Use options in fixtures
  todoPage: async ({ page, defaultItem }, use) => {
    const todoPage = new TodoPage(page);
    await todoPage.goto();
    await todoPage.addToDo(defaultItem);
    await use(todoPage);
  },
});
```

Configure in `playwright.config.ts`:

```typescript
import { defineConfig } from '@playwright/test';
import type { MyOptions } from './fixtures';

export default defineConfig<MyOptions>({
  projects: [
    {
      name: 'shopping',
      use: { defaultItem: 'Buy milk' },
    },
    {
      name: 'tasks',
      use: { defaultItem: 'Complete report' },
    },
  ],
});
```

## Overriding Built-in Fixtures

Replace or extend built-in fixtures to add custom behavior.

```typescript
export const test = base.extend({
  // Override page to always navigate to baseURL first
  page: async ({ baseURL, page }, use) => {
    await page.goto(baseURL!);
    await use(page);
  },

  // Override context to add custom cookies
  context: async ({ context }, use) => {
    await context.addCookies([{
      name: 'session',
      value: 'test-session',
      domain: 'localhost',
      path: '/',
    }]);
    await use(context);
  },
});
```

## Fixture Timeout

Set an independent timeout for slow fixtures to prevent test timeout failures.

```typescript
const test = base.extend<{ slowDatabase: Database }>({
  slowDatabase: [async ({}, use) => {
    const db = await connectToDatabase();
    await use(db);
    await db.close();
  }, { timeout: 60_000 }],
});
```

Each worker-scoped fixture gets a separate timeout equal to the test timeout by default.

## Execution Order

1. Fixtures are set up based on their dependency chain: if fixture A depends on fixture B, then B is set up first.
2. Non-automatic fixtures are lazy -- they only set up when a test actually requests them.
3. Automatic fixtures set up before the test and its hooks.
4. Teardown runs in reverse order: fixture A tears down before fixture B (its dependency).
5. Test-scoped fixtures tear down after each test.
6. Worker-scoped fixtures tear down when the worker process shuts down.

```typescript
const test = base.extend<{ a: void; b: void; c: void }>({
  a: async ({}, use) => {
    console.log('a setup');
    await use();
    console.log('a teardown');
  },
  b: async ({ a }, use) => {
    console.log('b setup');   // runs after a setup
    await use();
    console.log('b teardown'); // runs before a teardown
  },
  c: async ({ b }, use) => {
    console.log('c setup');   // runs after b setup
    await use();
    console.log('c teardown'); // runs before b teardown
  },
});
// Order: a setup -> b setup -> c setup -> TEST -> c teardown -> b teardown -> a teardown
```

## Combining Fixtures with mergeTests()

Merge fixtures from multiple test extensions into a single test object.

```typescript
import { mergeTests } from '@playwright/test';
import { test as dbTest } from 'database-test-utils';
import { test as a11yTest } from 'a11y-test-utils';

export const test = mergeTests(dbTest, a11yTest);

// Now tests can use fixtures from both extensions
test('accessible data page', async ({ database, checkA11y, page }) => {
  await database.seed();
  await page.goto('/data');
  await checkA11y();
});
```

Note: merged fixtures must not have name conflicts.

## Box Fixtures

Hide internal fixture steps from UI mode and HTML reports to reduce noise.

```typescript
export const test = base.extend({
  helperFixture: [async ({}, use) => {
    // This fixture's steps won't appear in reports
    await use();
  }, { box: true }],
});
```

Use `{ box: 'self' }` to hide only the fixture frame itself while still showing steps inside it.

## Custom Fixture Titles

Display a human-readable name in test reports instead of the fixture variable name.

```typescript
export const test = base.extend({
  innerFixture: [async ({}, use) => {
    await use();
  }, { title: 'My Custom Fixture' }],
});
```

## Global beforeEach/afterEach via Fixtures

```typescript
export const test = base.extend<{ forEachTest: void }>({
  forEachTest: [async ({ page }, use) => {
    // Runs before each test
    await page.goto('http://localhost:8000');
    await use();
    // Runs after each test
    console.log('Last URL:', page.url());
  }, { auto: true }],
});
```

## Global beforeAll/afterAll via Fixtures

```typescript
export const test = base.extend<{}, { forEachWorker: void }>({
  forEachWorker: [async ({}, use) => {
    // Runs once when worker starts
    console.log(`Starting worker ${test.info().workerIndex}`);
    await use();
    // Runs once when worker shuts down
    console.log('Stopping worker');
  }, { scope: 'worker', auto: true }],
});
```
