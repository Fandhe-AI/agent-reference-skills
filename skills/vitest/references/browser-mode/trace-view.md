# Trace View

`browser.traceView` (Vitest 5.0.0+; no longer experimental and enabled by default in `'failure-only'` mode since 5.1.0) records the steps of a browser test (actions, assertions, marks) with DOM snapshots (rrweb) and replays them step by step in the browser UI, Vitest UI or HTML reporter. By default Vitest records only failed tests, prints their steps in the terminal, and keeps a snapshot of the page when each test failed.

## Signature / Usage

```ts
// vitest.config.ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    browser: {
      traceView: true,
    },
  },
})
```

```bash
vitest --browser.traceView
```

Mode values (v5.1.0): `'failure-only'` (default; each trace keeps every step and a snapshot of the page when the test failed), `true` / `'on'` (every test, with a snapshot at each step; Vitest UI streams steps as the test runs), `false` / `'off'`.

Custom trace entries:

```ts
import { page } from 'vitest/browser'

await page.mark('content rendered')

await page.getByRole('button', { name: 'Sign in' }).mark('sign in button')

await page.mark('sign in flow', async () => {
  await page.getByRole('textbox', { name: 'Email' }).fill('john@example.com')
  await page.getByRole('button', { name: 'Sign in' }).click()
})
```

Extra snapshot fidelity (object form):

```ts
browser: {
  traceView: {
    mode: 'on',
    inlineImages: true,
  },
}
```

## Options / Props

| Goal | Configuration |
|------|---------------|
| Trace replay in the normal local browser UI | `vitest` |
| Headless browser + Vitest UI | `vitest --ui --browser.headless` |
| Static report for CI / run mode | `vitest run --reporter=html` |
| Step timeline of each failure in the terminal | `vitest run` |
| Record every test instead of failures only | add `--browser.traceView` (or `--browser.traceView.mode=on`) |

| Option | Description |
|--------|-------------|
| `mode` (5.1.0) | `'off' \| 'on' \| 'failure-only'`; default `'failure-only'`. Plain `true` / `false` are shorthands for `'on'` / `'off'` |
| `ariaSnapshot` (5.1.0) | Default `true`. Captures the accessibility tree with each snapshot; the viewer header switches the snapshot pane between **DOM** and **Aria** (same format as aria snapshots) |
| `enabled` (deprecated) | Use `mode` instead: `true` equals `mode: 'on'`, `false` equals `'off'`; `mode` wins when both are set |
| `inlineImages` | Store loaded `<img>` pixels in the snapshot (portable HTML reports) |
| `recordCanvas` | Store readable canvas pixels (not a full canvas timeline, no complete WebGL replay) |

## Notes

- `browser.traceView` and `browser.trace` (Playwright traces) are independent and can both be enabled. traceView supports all providers (rrweb DOM snapshots, viewed in browser UI / Vitest UI / HTML reporter, no external tool); `browser.trace` is Playwright only (`.trace.zip`, Playwright Trace Viewer).
- Recorded automatically: `expect.element(...)` assertions; actions `click`, `dblClick`, `tripleClick`, `fill`, `clear`, `type`, `hover`, `selectOptions`, `upload`, `dragAndDrop`, `tab`, `keyboard`, `wheel`, screenshots; lifecycle events (e.g. `vitest:onAfterRetryTask`).
- Each retry / repeat is a separate trace; the viewer opens the most recent attempt (switch in the Report tab).
- Captured: DOM tree, attributes, form values, same-origin readable CSS (via CSSOM), scroll positions, viewport. Not captured: CSS background images, fonts, non-CORS cross-origin images, videos; these stay URL-backed.
- `recordCanvas` weakens the replay iframe sandbox (the viewer allows scripts in its replay iframe for those traces, because rrweb redraws canvas data through an image load handler); enable only when canvas pixels help debugging.
- Terminal output: when a test fails, the error is followed by a timeline of its recorded steps (truncated for long tests, no DOM snapshots). Outside browser mode, `experimental.traceTimeline` prints the same kind of timeline for `expect.poll`, `vi.waitFor`, and `vi.waitUntil` steps.
- Iframe content is not captured (same-origin and cross-origin iframes replay as empty frames). By default image and canvas pixels are not stored; WebGL canvases come out blank unless created with `preserveDrawingBuffer: true`. `inlineImages` rasterizes SVGs and flattens animated images; cross-origin images are inlined only when CORS-readable.
- Use `vi.defineHelper()` so entries from reusable helpers point at the call site.
- The previous `browser.trace` guide moved to Playwright Traces.
- Source: https://vitest.dev/guide/browser/trace-view and https://vitest.dev/config/browser/traceview (Vitest v5.1.0)

## Related

- [Playwright Traces](./playwright-traces.md)
- [Browser Config](./browser-config.md)
