# Playwright Traces

Generate Playwright trace files (`.trace.zip`) for browser tests by setting `browser.trace`. Playwright provider only.

## Signature / Usage

```ts
import { defineConfig } from 'vitest/config'
import { playwright } from '@vitest/browser-playwright'

export default defineConfig({
  test: {
    browser: {
      provider: playwright(),
      trace: 'on',
    },
  },
})
```

```bash
vitest --browser.trace=on
npx playwright show-trace "path-to-trace-file"
```

Custom output directory:

```ts
trace: {
  mode: 'on',
  // the path is relative to the root of the project
  tracesDir: './playwright-traces',
},
```

Markers:

```ts
import { page } from 'vitest/browser'

await page.getByRole('button', { name: 'Sign in' }).mark('sign in button rendered')

await page.mark('sign in flow', async () => {
  await page.getByRole('textbox', { name: 'Email' }).fill('john@example.com')
  await page.getByRole('button', { name: 'Sign in' }).click()
})
```

## Options / Props

| Name | Description |
|------|-------------|
| `trace` / `trace.mode` | `'on'`, `'on-first-retry'`, `'on-all-retries'`, `'retain-on-failure'` (and off) |
| `trace.tracesDir` | Output directory relative to the project root; traces grouped by test file |

## Notes

- Files default to a `__traces__` folder next to test files; name format `chromium-my-test-0-0.trace.zip` = project name, test name, repeat count, retry count.
- Traces appear in reporters as annotations (e.g. a link in the HTML reporter test details).
- Open traces with `npx playwright show-trace` or upload to https://trace.playwright.dev.
- Vitest wraps `expect.element(...)` assertions and actions (`click`, `fill`, `type`, `hover`, `selectOptions`, `upload`, `dragAndDrop`, `tab`, `keyboard`, `wheel`, screenshots) in source-location groups. `page.mark()` / `locator.mark()` add custom groups; wrap helpers with `vi.defineHelper()` to point entries at the call site.
- This is distinct from Vitest's built-in `browser.traceView`.
- Source: https://vitest.dev/guide/browser/playwright-traces (Vitest v5.0.5)

## Related

- [Trace View](./trace-view.md)
- [Browser Config](./browser-config.md)
