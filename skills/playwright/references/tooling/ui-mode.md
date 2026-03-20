# Playwright UI Mode

UI Mode provides an interactive graphical interface for exploring, running, and debugging Playwright tests. It includes a time-travel experience with DOM snapshots, a timeline, locator tools, and a watch mode for rapid development.

## Starting UI Mode

```bash
npx playwright test --ui
```

This opens a browser-based interface with a sidebar listing all test files and a main panel for trace inspection.

## Filtering Tests

The sidebar supports multiple filtering methods:

### Text Search

Type in the search box to filter tests by name.

### Tag Filtering

Filter by `@tag` annotations defined in test titles:

```typescript
test("user login @smoke", async ({ page }) => {
  // ...
});
```

Filter in UI Mode by typing `@smoke` in the search box.

### Status Filters

Filter tests by execution status:

- **Passed** -- show only green tests
- **Failed** -- show only red tests
- **Skipped** -- show only skipped tests

### Project Filters

Filter by project defined in `playwright.config.ts`. Tests from specific browsers or configurations can be isolated.

Note: if a project has dependencies (e.g., a setup project), run the setup test manually before the dependent tests.

## Running Tests

- Click the **triangle icon** next to a test, describe block, or file to run it.
- Click the **play button** at the top to run all visible (filtered) tests.
- Right-click a test for additional options.

## Timeline

The timeline appears at the top of the trace panel after running a test.

- Different colors represent navigation events and user actions.
- **Hover** over the timeline to preview DOM snapshots at that moment.
- **Double-click** an action to zoom into its time range.
- **Drag** the slider to filter the Actions tab and related logs to a specific window.

## DOM Snapshot Inspection

After running a test, DOM snapshots are captured for each action. Features:

- Click any action in the Actions list to view its DOM snapshot.
- Snapshots show **Before**, **Action**, and **After** states.
- **Pop out** a snapshot into a separate window to open browser DevTools for full HTML, CSS, and Console inspection.
- Open multiple snapshots side by side for comparison.

## Pick Locator

Click the **Pick Locator** button in the toolbar, then hover over the DOM snapshot to see the locator for each element.

- Highlighted elements show their corresponding locator expression.
- Click an element to populate the locator in the **Locator Playground**.
- Edit and refine the locator in the playground -- matching elements are highlighted in real time.
- Copy the finalized locator into your test code.

This is useful for discovering resilient locators without leaving the UI.

## Watch Mode

Each test in the sidebar has an **eye icon** next to its name.

- Click the eye icon to enable watch mode for that test.
- When watch mode is active, the test automatically re-runs whenever you save changes to the test file or the application code.
- Enable watch mode on multiple tests simultaneously.
- Click the eye icon again to disable watch mode for that test.

This provides a tight feedback loop during test development.

## Tabs

### Source

Displays the test source code. The line corresponding to the currently selected action is highlighted.

The **Open in VS Code** button at the top-right navigates directly to the relevant line in your editor.

### Call

Shows detailed information for the selected action:

- Duration
- Locator used
- Strict mode status
- Key/value parameters

### Log

A step-by-step log of what Playwright did for the selected action, including scrolling, waiting for actionability, and performing the action.

### Errors

Displays error messages for failed tests with:

- Error text and stack trace
- Red markers on the timeline indicating where failures occurred
- Source code line reference

### Console

Shows browser console output (`console.log`, `console.warn`, `console.error`) and test-file console output, distinguished by icons.

Filter console entries by:

- Clicking a specific action
- Selecting a time range on the timeline

### Network

Lists all network requests with:

- URL, method, status code, content type, duration
- Click a request to see request/response headers and bodies
- Filter by type, status, method, or duration

### Attachments

Useful for visual regression testing. Provides:

- Expected, actual, and diff images
- Side-by-side comparison with sliders

### Metadata

Shows test metadata:

- Browser name and version
- Viewport size
- Test duration
- Test file path

## Visual Regression Workflow

When using screenshot assertions, UI Mode shows visual diffs in the Attachments tab:

```typescript
import { test, expect } from "@playwright/test";

test("visual test", async ({ page }) => {
  await page.goto("https://example.com");
  await expect(page).toHaveScreenshot("homepage.png");
});
```

After a test fails due to a screenshot mismatch, the Attachments tab displays the expected image, actual image, and a diff overlay. Use the slider to compare images.

## Remote Access

For running UI Mode inside Docker containers, GitHub Codespaces, or other remote environments:

### Bind to All Interfaces

```bash
npx playwright test --ui-host=0.0.0.0
```

This makes UI Mode accessible from other machines on the network.

### Specify a Static Port

```bash
npx playwright test --ui-port=8080 --ui-host=0.0.0.0
```

A fixed port is useful for port forwarding and firewall rules in remote setups.

### Security Warning

When using `--ui-host=0.0.0.0`, the UI Mode interface -- including traces, test content, passwords, and secrets visible in snapshots -- is accessible from any machine on the network. Use only in trusted environments or behind a VPN.
