# Dialogs, Downloads, and Videos

Playwright handles browser dialogs (alert, confirm, prompt), file downloads, and video recording of test execution.

## Dialogs

### Auto-Dismiss Behavior

By default, Playwright automatically dismisses all dialogs. No explicit handling is required for tests that do not depend on dialog content.

### Handling Dialogs with Events

Register a handler with `page.on('dialog')` before the action that triggers the dialog. The listener must handle the dialog, otherwise the page will hang (dialogs are modal and block execution).

```typescript
import { test, expect } from "@playwright/test";

test("handle confirm dialog", async ({ page }) => {
  page.on("dialog", async (dialog) => {
    expect(dialog.type()).toBe("confirm");
    expect(dialog.message()).toBe("Are you sure?");
    await dialog.accept();
  });

  await page.goto("https://example.com");
  await page.getByRole("button", { name: "Delete" }).click();
});
```

Since v1.63, `page.on('dialogClosed')` and `context.on('dialogClosed')` fire when a dialog closes (accept, dismiss, or manually in a headed browser).

### Accept and Dismiss

```typescript
// Accept (OK / Yes)
page.on("dialog", (dialog) => dialog.accept());

// Accept prompt with a value
page.on("dialog", (dialog) => dialog.accept("my input"));

// Dismiss (Cancel / No)
page.on("dialog", (dialog) => dialog.dismiss());
```

### One-Time Handler with once

```typescript
// Handle a single dialog, then revert to auto-dismiss
page.once("dialog", (dialog) => dialog.accept("2024"));
await page.getByRole("button", { name: "Set year" }).click();
```

### Dialog Types

| Type | `dialog.type()` | Notes |
|------|-----------------|-------|
| Alert | `"alert"` | Information only, accept to close |
| Confirm | `"confirm"` | Accept or dismiss |
| Prompt | `"prompt"` | Accept with input text or dismiss |
| Beforeunload | `"beforeunload"` | Triggered on page close |

### Beforeunload Dialog

Triggered when closing a page that has unsaved changes. Must pass `runBeforeUnload: true`:

```typescript
page.on("dialog", async (dialog) => {
  expect(dialog.type()).toBe("beforeunload");
  await dialog.dismiss(); // Stay on page
  // or: await dialog.accept(); // Leave page
});

await page.close({ runBeforeUnload: true });
```

### Print Dialog Detection

Monitor when `window.print()` is called:

```typescript
await page.evaluate(() => {
  (window as any).waitForPrintDialog = new Promise<void>((resolve) => {
    window.print = () => resolve();
  });
});

await page.getByText("Print it!").click();
await page.waitForFunction("window.waitForPrintDialog");
```

## Downloads

### Basic Download Handling

Set up the download promise before triggering the download action:

```typescript
import { test, expect } from "@playwright/test";

test("download a file", async ({ page }) => {
  const downloadPromise = page.waitForEvent("download");
  await page.getByText("Download file").click();
  const download = await downloadPromise;

  // Save to a known location
  await download.saveAs(
    `/tmp/downloads/${download.suggestedFilename()}`,
  );
});
```

### Download Properties and Methods

```typescript
const download = await downloadPromise;

// Suggested filename from Content-Disposition header
const filename = download.suggestedFilename();

// URL that triggered the download
const url = download.url();

// Temporary path (available until context closes)
const tempPath = await download.path();

// Save to a permanent location
await download.saveAs("/path/to/file.pdf");

// Cancel the download
await download.cancel();

// Get failure reason (null if successful)
const failure = await download.failure();
```

### Download Lifecycle

- Downloads are triggered by `page.on('download')` events
- Files are saved to a temporary folder by default
- Temporary files are automatically deleted when the browser context closes
- Use `saveAs()` to persist files beyond the context lifetime

### Passive Download Listener

For downloads triggered by unknown actions:

```typescript
page.on("download", async (download) => {
  console.log(`Downloaded: ${download.suggestedFilename()}`);
  const path = await download.path();
  console.log(`Temp path: ${path}`);
});
```

Note: The main script may complete before download operations finish with passive listeners.

### Downloads Directory

Configure where downloads are stored via `browserType.launch()`:

```typescript
const browser = await chromium.launch({
  downloadsPath: "/path/to/downloads",
});
```

## Videos

### Video Recording Modes

Configure in `playwright.config.ts`:

```typescript
import { defineConfig } from "@playwright/test";

export default defineConfig({
  use: {
    video: "on-first-retry",
  },
});
```

The `video` option supports the same set of modes as `trace`, and they record and keep recordings using the same rules. Defaults to `'off'`. The initial run of a test is the "first run"; subsequent runs caused by retries are "retries".

| Mode | Records a video on | Keeps the video when |
|------|--------------------|----------------------|
| `"off"` | never (default) | - |
| `"on"` | every run | always |
| `"retain-on-failure"` | every run | that run failed |
| `"retain-on-first-failure"` | first run only | the first run failed |
| `"retain-on-failure-and-retries"` | every run | that run failed, or it is a retry |
| `"on-first-retry"` | first retry only | always |
| `"on-all-retries"` | every retry | always |

`on-all-retries`, `retain-on-first-failure` and `retain-on-failure-and-retries` were added in v1.61. Scenarios with `retries: 2`: passes on first run: `on` keeps the first run, the retry modes keep nothing; fails then passes on retry: `on` keeps first run + retry, `retain-on-failure` keeps first run, `retain-on-first-failure` keeps first run, `retain-on-failure-and-retries` keeps first run + retry, `on-first-retry` / `on-all-retries` keep the first retry; fails on every run: `on`, `retain-on-failure` and `retain-on-failure-and-retries` keep all three runs, `retain-on-first-failure` keeps the first run, `on-first-retry` keeps the first retry, `on-all-retries` keeps both retries.

Since v1.64 the `video` option, `recordVideo`, and `Screencast.start` accept `fps` (frame rate in frames per second; `video` / `recordVideo` default `25`; Firefox and WebKit currently capture up to 25 frames per second), and "videos are encoded with VP9 instead of VP8, which takes less CPU and produces smaller files" (release notes). `Screencast.showActions.style` takes CSS declarations and replaces the deprecated `fontSize`. `recordVideo.dir` is optional (defaults to `artifactsDir`). See `videos.md` and `../api/screencast.md`. The `videosPath` / `videoSize` context options were removed in v1.60; use `recordVideo`. `page.screencast` (v1.59) provides `start` / `stop`, `showActions`, `showChapter`, `showOverlay`, and `onFrame` frame capture.

### Custom Video Size

```typescript
export default defineConfig({
  use: {
    video: {
      mode: "on-first-retry",
      size: { width: 640, height: 480 },
    },
  },
});
```

Default video dimensions scale to a maximum of 800x800 pixels.

### Library Usage (Manual Context)

```typescript
const context = await browser.newContext({
  recordVideo: { dir: "videos/" },
});

// Perform actions...

// Video is written when context closes
await context.close();
```

With custom dimensions:

```typescript
const context = await browser.newContext({
  recordVideo: {
    dir: "videos/",
    size: { width: 640, height: 480 },
  },
});
```

### Accessing Video Files

Videos are saved to the `test-results` directory by default. Access the video path after the page or context closes:

```typescript
const path = await page.video()?.path();
```

Videos are only fully written after the browser context is closed.

## Related

- [Videos](./videos.md)
- [Screencast](../api/screencast.md)
