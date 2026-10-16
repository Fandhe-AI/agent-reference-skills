# Multiple Setups

Run several browser setups with `browser.instances`; all share one Vite server, so transforms and dependency pre-bundling happen once (better caching than test projects).

## Signature / Usage

```ts
import { defineConfig } from 'vitest/config'
import { playwright } from '@vitest/browser-playwright'

export default defineConfig({
  test: {
    browser: {
      enabled: true,
      provider: playwright(),
      headless: true,
      instances: [
        {
          browser: 'chromium',
          name: 'chromium-1',
          setupFiles: ['./ratio-setup.ts'],
          provide: { ratio: 1 },
        },
        {
          browser: 'chromium',
          name: 'chromium-2',
          provide: { ratio: 2 },
        },
      ],
    },
  },
})
```

```shell
vitest --project=chromium
```

## Notes

- Define a custom `name` when using the same browser more than once; otherwise Vitest uses `browser` as the project name.
- If the root config already has a name, names are merged: `custom` -> `custom (browser)`.
- Different `setupFiles` / `provide` values can be set per instance; `inject('ratio')` reads the `provide` value.
- Source: https://vitest.dev/guide/browser/multiple-setups (Vitest v5.0.5)

## Related

- [Browser Config](./browser-config.md)
- [Browser Mode (Getting Started)](./overview.md)
