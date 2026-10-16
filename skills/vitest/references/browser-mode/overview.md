# Browser Mode (Getting Started)

Run tests natively in the browser, with access to browser globals like `window` and `document`. A provider (`preview`, `playwright` or `webdriverio`) is always required.

## Signature / Usage

```bash
npx vitest init browser
# or manual install (Playwright provider)
npm install -D vitest @vitest/browser-playwright
```

```ts
// vitest.config.ts
import { defineConfig } from 'vitest/config'
import { playwright } from '@vitest/browser-playwright'

export default defineConfig({
  test: {
    browser: {
      provider: playwright(),
      enabled: true,
      // at least one instance is required
      instances: [
        { browser: 'chromium' },
      ],
    },
  }
})
```

```ts
// example.test.js
import { expect, test } from 'vitest'
import { page } from 'vitest/browser'
import { render } from './my-render-function.js'

test('properly handles form inputs', async () => {
  render() // mount DOM elements
  await expect.element(page.getByText('Hi, my name is Alice')).toBeInTheDocument()
  const usernameInput = page.getByLabelText(/username/i)
  await usernameInput.fill('Bob')
  await expect.element(page.getByText('Hi, my name is Bob')).toBeInTheDocument()
})
```

Mixing Node-based and browser tests via `projects`:

```ts
export default defineConfig({
  test: {
    projects: [
      { test: { include: ['tests/unit/**/*.{test,spec}.ts'], name: 'unit', environment: 'node' } },
      {
        test: {
          include: ['tests/browser/**/*.{test,spec}.ts'],
          name: 'browser',
          browser: { enabled: true, provider: playwright(), instances: [{ browser: 'chromium' }] },
        },
      },
    ],
  },
})
```

## Options / Props

| Topic | Details |
|-------|---------|
| Packages | `@vitest/browser-preview`, `@vitest/browser-playwright`, `@vitest/browser-webdriverio` |
| `webdriverio` browsers | `firefox`, `chrome`, `edge`, `safari` |
| `playwright` browsers | `firefox`, `webkit`, `chromium` |
| Minimum browsers | Chrome >=87, Firefox >=79, Safari >=15.4, Edge >=88 |
| CLI | `npx vitest --browser=chromium`, `npx vitest --browser.headless` |
| Default port | `63315` (change with the `api` option) |
| Renderers | `vitest-browser-vue`, `vitest-browser-svelte`, `vitest-browser-react`, `vitest-browser-angular`; community: `vitest-browser-lit`, `vitest-browser-preact`, `vitest-browser-qwik` |

## Notes

- The `preview` provider is for previewing only; to run tests in CI install `playwright` or `webdriverio`. Playwright is recommended because it supports parallel execution. `preview` simulates events instead of using Chrome DevTools Protocol.
- Since Vitest 3.2, passing `--browser` without a `browser` option in the config fails.
- Headless mode requires the `playwright` or `webdriverio` provider. With headless, the UI is not opened automatically; install `@vitest/ui` and pass `--ui` to keep it.
- Do not use `@testing-library/user-event` directly (it simulates events); use `userEvent` from `vitest/browser`. For Solid / Marko use `@solidjs/testing-library` / `@marko/testing-library`.
- Thread-blocking dialogs (`alert`, `confirm`, `print`) cannot be used natively; Vitest provides default mocks so execution does not hang.
- `vi.spyOn` on an imported module namespace throws (sealed ESM namespace). Use `vi.mock('./module.js', { spy: true })` then `vi.mocked(module.method)`. Exported variables can only be changed via an exported function.
- Source: https://vitest.dev/guide/browser/ (Vitest v5.0.5)

## Related

- [Why Browser Mode](./why.md)
- [Multiple Setups](./multiple-setups.md)
- [Browser Config](./browser-config.md)
- [Context API](./context-api.md)
