# Trace View

Experimental (Vitest 5.0.0+). `browser.traceView` records browser interactions as DOM snapshots (rrweb) and replays them step by step in the browser UI, Vitest UI or HTML reporter.

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
    enabled: true,
    inlineImages: true,
    recordCanvas: true,
  },
}
```

## Options / Props

| Goal | Configuration |
|------|---------------|
| Trace replay in the normal local browser UI | `vitest --browser.traceView` |
| Headless browser + Vitest UI | `vitest --browser.traceView --browser.headless --ui` |
| Visible browser window + Vitest UI | `vitest --browser.traceView --browser.headless=false --browser.ui=false --ui` |
| Static report for CI / run mode | `vitest run --browser.traceView --reporter=html` |

| Option | Description |
|--------|-------------|
| `enabled` | Enable trace view |
| `inlineImages` | Store loaded `<img>` pixels in the snapshot (portable HTML reports) |
| `recordCanvas` | Store readable canvas pixels (not a full canvas timeline, no complete WebGL replay) |

## Notes

- `browser.traceView` and `browser.trace` (Playwright traces) are independent and can both be enabled. traceView supports all providers (rrweb DOM snapshots, viewed in browser UI / Vitest UI / HTML reporter, no external tool); `browser.trace` is Playwright only (`.trace.zip`, Playwright Trace Viewer).
- Recorded automatically: `expect.element(...)` assertions; actions `click`, `dblClick`, `tripleClick`, `fill`, `clear`, `type`, `hover`, `selectOptions`, `upload`, `dragAndDrop`, `tab`, `keyboard`, `wheel`, screenshots; lifecycle events (e.g. `vitest:onAfterRetryTask`).
- Each retry / repeat is a separate trace; the viewer opens the most recent attempt (switch in the Report tab).
- Captured: DOM tree, attributes, form values, same-origin readable CSS (via CSSOM), scroll positions, viewport. Not captured: CSS background images, fonts, non-CORS cross-origin images, videos; these stay URL-backed.
- `recordCanvas` weakens the replay iframe sandbox (scripts allowed); enable only when canvas pixels help debugging.
- Use `vi.defineHelper()` so entries from reusable helpers point at the call site.
- The previous `browser.trace` guide moved to Playwright Traces.
- Source: https://vitest.dev/guide/browser/trace-view (Vitest v5.0.5)

## Related

- [Playwright Traces](./playwright-traces.md)
- [Browser Config](./browser-config.md)
