# Storybook for Preact with Vite

`@storybook/preact-vite` is the Storybook framework for Preact applications built with Vite.

## Signature / Usage

```bash
npm install --save-dev @storybook/preact-vite
```

```ts
// .storybook/main.ts
import type { StorybookConfig } from '@storybook/preact-vite';

const config: StorybookConfig = {
  // ...
  // framework: '@storybook/preact-webpack5', 👈 Remove this
  framework: '@storybook/preact-vite', // 👈 Add this
};

export default config;
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `builder` | `Record<string, any>` | Options for the framework's builder (Vite builder docs). |

## Notes

- Requirements: Preact 8.x or 10.x, Vite ≥ 5.
- Install into an existing project with `npm create storybook@latest`.
- Source: https://storybook.js.org/docs/get-started/frameworks/preact-vite (Storybook v10.6.2 docs)

## Related

- [react-vite](./react-vite.md)
