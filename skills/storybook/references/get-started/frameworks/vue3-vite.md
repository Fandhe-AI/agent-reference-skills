# Storybook for Vue with Vite

`@storybook/vue3-vite` is the Storybook framework for Vue 3 applications built with Vite.

## Signature / Usage

```bash
npm install --save-dev @storybook/vue3-vite
```

```ts
// .storybook/main.ts
import type { StorybookConfig } from '@storybook/vue3-vite';

const config: StorybookConfig = {
  framework: {
    name: '@storybook/vue3-vite',
    options: {
      docgen: 'vue-component-meta',
    },
  },
};

export default config;
```

Extending the Vue application (global components, plugins, directives):

```js
// .storybook/preview.ts
import { setup } from '@storybook/vue3-vite';

setup((app) => {
  app.use(MyPlugin);
  app.component('my-component', MyComponent);
  app.mixin({
    // My mixin
  });
});
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `builder` | `Record<string, any>` | Options for the framework's builder (Vite builder docs). |
| `docgen` | `'vue-docgen-api' \| 'vue-component-meta' \| boolean` (default `'vue-docgen-api'`, since 8.0) | Docgen tool used to generate controls. `false` disables docgen for build performance. |

## Notes

- Requirements: Vue ≥ 3, Vite ≥ 5.
- `vue-docgen-api` (the current default, also selected by `true`) is deprecated since Storybook 10.6 and will be removed in the next major version. Set `docgen: 'vue-component-meta'` to migrate, or enable server-side docgen with `features: { experimentalDocgenServer: true }`, which becomes the default in Storybook 11 and also uses `vue-component-meta`.
- `vue-component-meta` supports SFC, functional, and composition/options API components from `.vue`, `.ts`, `.tsx`, `.js`, `.jsx` files with default or named exports; extracts prop descriptions/JSDoc tags, emitted event types (`defineEmits`), slot types (including `defineSlots`), and exposed properties/methods (`defineExpose`).
- With `tsconfig` references (e.g. `tsconfig.app.json`), pass `docgen: { plugin: 'vue-component-meta', tsconfig: 'tsconfig.app.json' }`; otherwise component types/descriptions or import aliases like `@/some/import` may be missing.
- Disabling docgen means argTypes are not inferred automatically, so Controls and docs need manually defined `argTypes`.
- Vue 2 is not supported (EOL 2023-12-31); use the latest Storybook 7 for Vue 2 projects.
- Source: https://storybook.js.org/docs/get-started/frameworks/vue3-vite (Storybook v10.6.2 docs)

## Related

- [react-vite](./react-vite.md)
