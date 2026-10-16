# Storybook for Web components with Vite

`@storybook/web-components-vite` is the Storybook framework for applications using Web components built with Vite.

## Signature / Usage

```bash
npm install --save-dev @storybook/web-components-vite
```

```ts
// .storybook/main.ts
import type { StorybookConfig } from '@storybook/web-components-vite';

const config: StorybookConfig = {
  // ...
  framework: '@storybook/web-components-vite', // 👈 Add this
};

export default config;
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `builder` | `Record<string, any>` | Options for the framework's builder (Vite builder docs). |

## Notes

- Requirements: Vite ≥ 5.
- Stencil with static builds: if you register Stencil components with `defineCustomElements()` from the generated loader, enable import injection so Vite includes the lazy-loaded entry files. For Stencil 4.26+:

```ts
// stencil.config.ts
import type { Config } from '@stencil/core';

export const config: Config = {
  extras: {
    enableImportInjection: true,
  },
};
```

  For older Stencil versions use `experimentalImportInjection: true` instead.
- Source: https://storybook.js.org/docs/get-started/frameworks/web-components-vite (Storybook v10.6.2 docs)

## Related

- [preact-vite](./preact-vite.md)
