# Running and Debugging Tests

Overview of how to run Playwright tests from the command line, debug failures with the Playwright Inspector and other tools, and use trace viewer to inspect test execution.

## Running Tests

### Basic Commands

```bash
# Run all tests
npx playwright test

# Run in headed mode (visible browser)
npx playwright test --headed

# Run in UI Mode (interactive)
npx playwright test --ui
```

### Filtering Tests

```bash
# Run a single test file
npx playwright test landing-page.spec.ts

# Run tests in multiple directories
npx playwright test tests/todo-page/ tests/landing-page/

# Run files matching keywords
npx playwright test landing login

# Run tests by title (grep)
npx playwright test -g "add a todo item"

# Run a specific test by file and line number
npx playwright test example.spec.ts:10
```

### Browser Selection

```bash
# Run on a specific project/browser
npx playwright test --project webkit

# Run on multiple browsers
npx playwright test --project webkit --project firefox
```

### Parallelism

```bash
# Disable parallel execution
npx playwright test --workers 1

# Set specific worker count
npx playwright test --workers 4
```

### Other Flags

```bash
# Run only previously failed tests
npx playwright test --last-failed

# View HTML report after run
npx playwright show-report
```

## Debugging

### Playwright Inspector (--debug)

The `--debug` flag launches the Playwright Inspector, a GUI tool that lets you step through test actions. When debugging, browsers launch in headed mode and the default timeout is set to 0 (no timeout).

```bash
# Debug all tests
npx playwright test --debug

# Debug a specific test by file and line
npx playwright test example.spec.ts:10 --debug

# Debug on a specific browser
npx playwright test --project=chromium --debug

# Debug a specific test on a specific browser
npx playwright test example.spec.ts:10 --project=webkit --debug
```

The Inspector provides:

- Step-through execution of each test action
- Live locator editing and picking
- Actionability logs showing visibility, enablement, and stability checks
- Current action highlighted in both the test code and the browser

### page.pause()

Insert `page.pause()` as a breakpoint in your test code. Execution pauses at that point when running in debug mode, and you can resume from the Inspector.

```typescript
import { test, expect } from "@playwright/test";

test("debug example", async ({ page }) => {
  await page.goto("https://example.com/");

  // Execution pauses here in debug mode.
  await page.pause();

  await page.getByRole("button", { name: "Submit" }).click();
});
```

### VS Code Integration

- Set breakpoints by clicking next to line numbers.
- Right-click a test line to select "Debug Test".
- Enable "Show Browser" to see the browser and highlight locators live.
- Use "Pick locator" to click an element in the browser and copy its locator.

### PWDEBUG=console

Running with `PWDEBUG=console` makes a `playwright` object available in the browser DevTools console for interactive exploration.

```bash
PWDEBUG=console npx playwright test
```

First set a breakpoint with `page.pause()`, then run with the variable. Once the browser opens, use the DevTools console:

```javascript
// Query a single element using Playwright selectors
playwright.$('.auth-form >> text=Log in');

// Query all matching elements
playwright.$$('li >> text=John');

// Reveal element in Elements panel
playwright.inspect('text=Log in');

// Create a locator and query
playwright.locator('.auth-form', { hasText: 'Log in' });

// Generate a selector for an element ($0 = selected element in Elements panel)
playwright.selector($0);
```

### Verbose API Logs

Enable detailed logging of all Playwright API calls with the `DEBUG` environment variable:

```bash
DEBUG=pw:api npx playwright test
```

This outputs every API interaction during test execution, useful for diagnosing timing and ordering issues.

### Headed Mode and slowMo

When using the Playwright library API directly (outside `@playwright/test`), launch browsers in headed mode with an optional slowdown:

```typescript
await chromium.launch({ headless: false, slowMo: 100 });
```

The `slowMo` value (in milliseconds) adds a delay before each operation, making it easier to follow execution visually.

## Trace Viewer

Traces capture a detailed recording of test execution, including DOM snapshots, network requests, console output, and action logs.

### Enabling Traces

```bash
# Force traces on for all tests via CLI
npx playwright test --trace on
```

Or configure in `playwright.config.ts`:

```typescript
import { defineConfig } from "@playwright/test";

export default defineConfig({
  retries: process.env.CI ? 2 : 0,
  use: {
    trace: "on-first-retry",
  },
});
```

Trace options:

| Value | Behavior |
|---|---|
| `"on-first-retry"` | Record trace only on the first retry of a failed test (default) |
| `"on"` | Record trace for every test |
| `"off"` | Do not record traces |
| `"retain-on-failure"` | Record trace for every test but only keep traces for failures |

### Viewing Traces

After running tests, open the HTML report and click into a test to view its trace:

```bash
npx playwright show-report
```

The trace viewer shows:

- Timeline of test actions
- DOM snapshots before and after each action (fully interactive)
- Network requests and responses
- Console logs and errors
- Source code of the test step being executed
