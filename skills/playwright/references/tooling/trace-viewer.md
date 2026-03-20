# Playwright Trace Viewer

The Playwright Trace Viewer is a GUI tool for exploring recorded traces after tests have run. It provides a time-travel debugging experience with DOM snapshots, network logs, console output, and more. It is especially useful for diagnosing failures in CI environments.

## Recording Traces

### Via Configuration

Set the `trace` option in `playwright.config.ts` under `use`:

```typescript
import { defineConfig } from "@playwright/test";

export default defineConfig({
  retries: process.env.CI ? 2 : 0,
  use: {
    trace: "on-first-retry",
  },
});
```

### Via Command Line

Override the config-level trace setting with the `--trace` flag:

```bash
npx playwright test --trace on
```

### Trace Modes

| Mode | Behavior |
| --- | --- |
| `off` | Do not record traces |
| `on` | Record a trace for every test run (high performance cost) |
| `on-first-retry` | Record a trace only on the first retry of a failed test |
| `on-all-retries` | Record a trace on every retry attempt |
| `retain-on-failure` | Record traces for all tests but only keep them for failures |
| `retain-on-first-failure` | Record traces but only keep for the first failure |

For local development, `on` is convenient for immediate debugging. For CI, `on-first-retry` is the recommended default to balance coverage and performance.

Recorded traces are saved as `trace.zip` files in the test results directory.

## Viewing Traces

### From the CLI

Open a trace file directly:

```bash
npx playwright show-trace trace.zip
```

Open a remote trace:

```bash
npx playwright show-trace https://example.com/trace.zip
```

### From the HTML Report

Run the report server, then click the trace icon next to a test or open the test detail and click the trace screenshot under the "Traces" tab:

```bash
npx playwright show-report
```

### From trace.playwright.dev

The web-based viewer at [trace.playwright.dev](https://trace.playwright.dev) loads traces entirely in the browser with no data transmitted externally.

- Drag and drop a `trace.zip` file onto the page, or use the file picker.
- Open a remote trace via query parameter:

```text
https://trace.playwright.dev/?trace=https://example.com/trace.zip
```

## Trace Viewer Tabs

### Actions

Displays every test action (clicks, fills, navigations, assertions) in order. Each entry shows:

- The locator used
- Execution duration
- Pass/fail status

Hover over an action to see the DOM snapshot change. Click an action to jump to that point in the trace timeline.

### Timeline

A horizontal bar at the top of the viewer showing the full test run. Different colors indicate navigation events and actions. Features:

- Hover over the timeline to preview page snapshots at that moment.
- Double-click an action to zoom into its time range.
- Drag the timeline slider to filter the Actions tab, Console, and Network tabs to a specific time window.

### DOM Snapshots

Full DOM snapshots captured at three moments for each action:

- **Before** -- the page state when the action started.
- **Action** -- the page state during input (click targets are highlighted).
- **After** -- the page state after the action completed.

Snapshots are interactive: you can click elements, inspect them, and open them in a separate window to use browser DevTools (inspect HTML, CSS, Console).

### Source

Displays the test source code with the line corresponding to the selected action highlighted. Allows you to see exactly which code line triggered each action.

### Call

Shows detailed metadata for the selected action:

- Duration
- Locator expression
- Strict mode status
- Key/value parameters
- Return values

### Log

A full step-by-step log of what Playwright did behind the scenes for the selected action, including:

- Element scrolling
- Waiting for actionability checks (visible, enabled, stable)
- Performing the action

### Errors

Displays error messages for failed actions. Error markers also appear on the timeline for quick identification. Shows the source code line where the error occurred.

### Console

Shows `console.log`, `console.warn`, `console.error`, and other browser console output alongside test-file console output. Icons distinguish browser logs from test logs.

Console entries can be filtered by:

- Clicking a specific action to see only its console output.
- Selecting a time range on the timeline.

### Network

Lists all network requests made during the test. Each entry shows:

- URL
- HTTP method
- Status code
- Content type
- Duration

Click a request to see:

- Request headers and body
- Response headers and body

Filter requests by type, status code, method, or duration.

### Metadata

Displays test-level information:

- Browser name and version
- Viewport size
- Test file and title
- Test duration
- OS and platform

### Attachments

Shows test attachments, particularly useful for visual regression testing. For screenshot comparisons, it provides:

- **Expected** image
- **Actual** image
- **Diff** image with highlighted differences
- Side-by-side and overlay comparison modes with sliders

## Per-Test Trace Configuration

Override the global trace setting for individual tests:

```typescript
import { test, expect } from "@playwright/test";

test.use({ trace: "on" });

test("always traced test", async ({ page }) => {
  await page.goto("https://example.com");
  await expect(page).toHaveTitle(/Example/);
});
```

## Trace Options in Configuration

Fine-tune what is captured in traces:

```typescript
import { defineConfig } from "@playwright/test";

export default defineConfig({
  use: {
    trace: {
      mode: "on-first-retry",
      screenshots: true,
      snapshots: true,
      sources: true,
    },
  },
});
```

| Option | Default | Description |
| --- | --- | --- |
| `mode` | `"off"` | When to record traces |
| `screenshots` | `true` | Capture screenshots during tracing |
| `snapshots` | `true` | Capture DOM snapshots |
| `sources` | `true` | Include test source code in the trace |
