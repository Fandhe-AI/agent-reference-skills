# Storybook for SvelteKit

`@storybook/sveltekit` is the Storybook framework for SvelteKit applications. It provides mocks for SvelteKit-specific modules.

## Signature / Usage

```bash
npm install --save-dev @storybook/sveltekit
```

```ts
// .storybook/main.ts
import type { StorybookConfig } from '@storybook/sveltekit';

const config: StorybookConfig = {
  // ...
  framework: '@storybook/sveltekit', // 👈 Add this
  // svelteOptions: { ... }, 👈 Remove this
};

export default config;
```

Mocking SvelteKit state per story:

```ts
export const MyStory: Story = {
  parameters: {
    sveltekit_experimental: {
      state: {
        page: { data: { test: 'passed' } },
        navigating: {
          to: {
            route: { id: '/storybook' },
            params: {},
            url: new URL('http://localhost/storybook'),
          },
        },
        updated: { current: true },
      },
    },
  },
};
```

## Options / Props

Framework options:

| Name | Type | Description |
|------|------|-------------|
| `builder` | `Record<string, any>` | Options for the framework's builder (Vite builder docs). |
| `docgen` | `boolean` (default `true`) | Enable or disable automatic documentation generation for component properties. |

Parameters (`sveltekit_experimental` namespace):

| Name | Type | Description |
|------|------|-------------|
| `forms` | `{ enhance: () => void }` | Mocks `$app/forms`; `forms.enhance` is called when a form with `use:enhance` is submitted. |
| `hrefs` | `Record<string, (to: string, event: MouseEvent) => void \| { callback: (to: string, event: MouseEvent) => void, asRegex?: boolean }>` | Callbacks for `<a href>` clicks matching a key (regex when `asRegex` is true); otherwise an action is logged. |
| `navigation` | See SvelteKit `$app/navigation` | Mocks `goto`, `pushState`, `replaceState`, `invalidate`, `invalidateAll`, and `afterNavigate`; without a function, an action is logged. |
| `stores` | See SvelteKit `$app/stores` | Mocks `navigating`, `page` (partial stores) and `updated` (boolean; `updated.check()` is a no-op). |
| `state` | See SvelteKit `$app/state` | Mocks `navigating`, `page`, and `updated` (`{ current: boolean }`). |

## Notes

- Requirements: SvelteKit ≥ 1.0, Vite ≥ 5.
- Module support: `$app/environment` (supported; `version` is always empty), `$app/paths` (supported, SvelteKit 1.4.0+), `$env/static/public`, `$lib`, `@sveltejs/kit/*` (supported); `$app/forms`, `$app/navigation`, `$app/stores`, `$app/state` (experimental; `$app/state` needs SvelteKit 2.12+); `$env/dynamic/public` (development mode only); `$env/dynamic/private`, `$env/static/private`, `$service-worker` (not supported).
- Default link-handling behavior logs an action to the Actions panel.
- The community Svelte CSF addon (`defineMeta` / `Story`, `legacyTemplate` option) works as described on the `svelte-vite` page.
- Manual install: install `@storybook/sveltekit`, update `framework`, and remove now-obsolete `@storybook/svelte-vite`, `storybook-builder-vite`, `@storybook/builder-vite`.
- Disabling `docgen` stops automatic argTypes inference (Controls and docs then need manual `argTypes`).
- Source: https://storybook.js.org/docs/get-started/frameworks/sveltekit (Storybook v10.6.2 docs)

## Related

- [svelte-vite](./svelte-vite.md)
