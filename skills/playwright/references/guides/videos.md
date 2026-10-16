# Videos

Record videos of tests. Playwright Test controls this with the `video` config option; library users use `recordVideo` on a browser context.

## Signature / Usage

```ts
// playwright.config.ts
import { defineConfig } from '@playwright/test';
export default defineConfig({
  use: {
    video: 'on-first-retry',
  },
});
```

Library usage:

```js
const context = await browser.newContext({ recordVideo: { dir: 'videos/' } });
// Make sure to await close, so that videos are saved.
await context.close();
```

Advanced configuration (size and annotations):

```ts
import { defineConfig } from '@playwright/test';
export default defineConfig({
  use: {
    video: {
      mode: 'on-first-retry',
      size: { width: 640, height: 480 },
      show: {
        actions: {
          duration: 500,
          position: 'top-right',
          style: { title: 'font-size: 14px' },
        },
        test: {
          level: 'step',
          position: 'top-left',
          fontSize: 12,
        }
      },
    },
  },
});
```

Access the video file of a page:

```js
const path = await page.video().path();
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `'off'` | video mode | Do not record video (default). |
| `'on'` | video mode | Record video for each test. |
| `'retain-on-failure'` | video mode | Record video for each test, remove videos from successful runs. |
| `'on-first-retry'` | video mode | Record video only when retrying a test for the first time. |
| `'on-all-retries'` | video mode | Record and keep a video for every retry. |
| `size` | `{ width, height }` | Video size. Defaults to the viewport size scaled down to fit 800x800. |
| `show.actions` | object (`duration`, `position`, `cursor`, `style`; `fontSize` deprecated) | Highlight each action with element outline and action title subtitle. `duration` defaults to `500` ms. `style` takes `{ point?, highlight?, title? }` CSS declaration strings; `fontSize` (default 24) is deprecated since v1.64, use `style.title`. |
| `show.test` | object (`level`, `position`, `fontSize`) | Annotate video with current test information at the configurable `level`. |

## Notes

- Videos are off by default. Video files appear in the test output directory, typically `test-results`; see `TestOptions.video` for advanced configuration.
- Videos are saved upon browser context closure at the end of a test. If you create a context manually, await `BrowserContext.close()`.
- The viewport video is placed in the top-left corner of the output video, scaled down if necessary; set the viewport size to match the desired video size.
- The video is only available (via `page.video().path()`) after the page or browser context is closed.
- `show.actions.fontSize` is deprecated since v1.64 in favor of `style.title` (CSS declarations); the upstream videos.md example still shows `fontSize: 14`, so the example here uses `style.title` instead. `show.test.fontSize` is not deprecated. See https://playwright.dev/docs/api/class-testoptions and https://playwright.dev/docs/release-notes (microsoft/playwright v1.64.1 `docs/src/test-api/class-testoptions.md`, `docs/src/release-notes-js.md`).
- Other languages (Python / Java / .NET) record via the context option (`record_video_dir` / `setRecordVideoDir` / `RecordVideoDir`), optionally with a size option.
- Source: https://playwright.dev/docs/videos (microsoft/playwright v1.64.1 `docs/src/videos.md`)

## Related

- [Screenshots](./screenshots.md)
- [Visual Testing](./visual-testing.md)
