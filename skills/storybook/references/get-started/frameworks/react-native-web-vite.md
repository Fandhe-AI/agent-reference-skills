# Storybook for React Native Web

`@storybook/react-native-web-vite` is the Storybook framework for developing and testing React Native components in the browser, using Vite and react-native-web.

## Signature / Usage

```bash
npm install --save-dev @storybook/react-native-web-vite vite
```

```ts
// .storybook/main.ts
import type { StorybookConfig } from '@storybook/react-native-web-vite';

const config: StorybookConfig = {
  framework: {
    name: '@storybook/react-native-web-vite',
    options: {
      modulesToTranspile: ['my-library'], // add libraries that are not transpiled for web by default
      pluginReactOptions: {
        jsxRuntime: 'automatic',
        jsxImportSource: 'react',
        babel: {
          plugins: [],
          presets: [],
        },
      },
    },
  },
};

export default config;
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `modulesToTranspile` | `string[]` | Libraries (node_modules) to transpile for web. |
| `pluginReactOptions` | object | Options passed to `@vitejs/plugin-react` (e.g. `jsxRuntime`, `jsxImportSource`, `babel`, `include`, `exclude`). |
| `builder` | `Record<string, any>` | Options for the framework's builder (Vite builder docs). |

`pluginReactOptions` fields:

| Field | Type | Default |
|-------|------|---------|
| `jsxRuntime` | `'automatic' \| 'classic'` | `'automatic'` |
| `jsxImportSource` | `string` | `'react'` |
| `babel.plugins` | `Array<string \| [string, any]>` | — |
| `babel.presets` | `Array<string \| [string, any]>` | — |
| `include` | `Array<string \| RegExp>` | — |
| `exclude` | `Array<string \| RegExp>` | — |

Examples from the docs: for reanimated, put `'@babel/plugin-proposal-export-namespace-from'` and `'react-native-reanimated/plugin'` in `pluginReactOptions.babel.plugins`; for nativewind, set `pluginReactOptions.jsxImportSource: 'nativewind'`.

## Notes

- Requirements: React Native ≥ 0.72, React Native Web ≥ 0.19, Vite ≥ 5.
- Two options exist for React Native: on-device Native Storybook (high fidelity, limited feature set) and this Web framework (feature-rich: sharing, docs, testing, addons, but limited by `react-native-web` compatibility). Both can be used together by choosing "Both" in the installer; the native side needs additional manual setup.
- Migrating from the `addon-react-native-web` addon: upgrade Storybook, install this framework and its peer dependencies, set `framework` to `@storybook/react-native-web-vite`, remove `@storybook/addon-react-native-web` from `addons`, and remove the addon and `@storybook/react-webpack5` packages. Designed for Storybook 8.5 and above; older versions are unsupported.
- The official docs show `pluginReactOptions` as a type-shaped pseudo-config; values here are concrete defaults.
- Source: https://storybook.js.org/docs/get-started/frameworks/react-native-web-vite (Storybook v10.6.2 docs)

## Related

- [react-vite](./react-vite.md)
