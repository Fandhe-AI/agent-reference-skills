# Storybook for Svelte with Vite

`@storybook/svelte-vite` is the Storybook framework for Svelte applications built with Vite.

## Signature / Usage

```bash
npm install --save-dev @storybook/svelte-vite
```

```ts
// .storybook/main.ts
import type { StorybookConfig } from '@storybook/svelte-vite';

const config: StorybookConfig = {
  // ...
  framework: '@storybook/svelte-vite', // 👈 Add this
};

export default config;
```

Native Svelte stories via the community Svelte CSF addon:

```svelte
<script>
  import { defineMeta } from '@storybook/addon-svelte-csf';

  import MyComponent from './MyComponent.svelte';

  const { Story } = defineMeta({
    component: MyComponent,
  });
</script>

<Story name="Default" args={{ exampleProperty: true }}>
  {#snippet template(args)}
    <MyComponent {...args}>Reactive component</MyComponent>
  {/snippet}
</Story>
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `builder` | `Record<string, any>` | Options for the framework's builder (Vite builder docs). |
| `docgen` | `boolean` (default `true`) | Enable or disable automatic documentation generation for component properties. |

Svelte CSF addon option:

| Name | Description |
|------|-------------|
| `legacyTemplate` | Enables the `Template` component for backward compatibility (can add performance overhead). |

## Notes

- Requirements: Svelte ≥ 5, Vite ≥ 5.
- The Svelte CSF addon (`@storybook/addon-svelte-csf`) is community maintained and lacks some features of the official Svelte framework support. It is preinstalled when initializing with this framework; when migrating, install it (e.g. via the CLI `add` command) and register it in `.storybook/main.js|ts`.
- Svelte CSF addon v5 changes: `Meta` / `meta` export replaced by `defineMeta` (returns `Story`); the `Template` component replaced by `Story` children; slots replaced by `template` snippets; `autodocs` replaced by `tags`.
- Disabling `docgen` improves build performance but argTypes are no longer inferred, so Controls and docs need manually defined `argTypes`.
- Source: https://storybook.js.org/docs/get-started/frameworks/svelte-vite (Storybook v10.6.2 docs)

## Related

- [sveltekit](./sveltekit.md)
