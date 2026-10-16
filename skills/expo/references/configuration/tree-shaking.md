---
source: https://docs.expo.dev/guides/tree-shaking/
---

# Tree shaking and code removal

Expo CLI removes unused code from production bundles through platform shaking, dead-code conditionals, `EXPO_PUBLIC_` inlining, server-code removal, and experimental import/export tree shaking.

## Signature / Usage

Platform shaking (production only, per file):

```js
import { Platform } from 'react-native';

if (Platform.OS === 'ios') {
  console.log('Hello on iOS');
}
```

Development-only code:

```js
if (process.env.NODE_ENV === 'development') {
  console.log('Hello in development');
}

if (__DEV__) {
  console.log('Another development-only conditional...');
}
```

Experimental import support (default in SDK 54+; older SDKs):

```js
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

config.transformer.getTransformOptions = async () => ({
  transform: {
    experimentalImportSupport: true,
    inlineRequires: true,
  },
});

module.exports = config;
```

```sh
EXPO_UNSTABLE_METRO_OPTIMIZE_GRAPH=1
EXPO_UNSTABLE_TREE_SHAKING=1
```

```sh
npx expo export
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `EXPO_UNSTABLE_METRO_OPTIMIZE_GRAPH` | `1` | Keep modules until the entire graph is created. Production only. |
| `EXPO_UNSTABLE_TREE_SHAKING` | `1` | Enable tree shaking. Production only. |
| `minifyTypeofWindow` | boolean (`babel-preset-expo` option) | Transform `typeof window === 'undefined'` to `true` for client web bundles. Disabled by default (web workers have no `window`). |
| `sideEffects` | string[] / boolean (package.json) | Mark modules with side-effects (Webpack convention). |

## Notes

- Platform shaking only applies when `Platform.select` / `Platform.OS` are imported directly from `react-native` in each file; re-exports are not removed. `process.env.EXPO_OS` gives the bundled platform but does not support platform-shaking imports.
- Code elimination runs only in production builds. `EXPO_PUBLIC_` variables are inlined before minification, so they can remove code (not applied to server bundles; library authors should not use `EXPO_PUBLIC_` variables).
- `babel-preset-expo` transforms `typeof window === 'undefined'` to `true` when bundling for server environments (API routes, server rendering).
- `react-native-web` barrel: `import { View } from 'react-native'` (ESM) is rewritten to `react-native-web/dist/exports/View`; `require('react-native')` keeps the barrel.
- Unused import / export removal and star-export (barrel) expansion are marked experimental, available in SDK 52 and later. Works only on `import` / `export` modules in production bundles; avoid Babel plugins that convert to CJS (such as `@babel/plugin-transform-modules-commonjs`). Modules marked as side-effects are not removed. All Expo SDK modules ship as ESM. Ambiguous `module.exports` / `exports` stop star-export expansion. Recursion is limited to 5 passes per module. Use Expo Atlas to inspect expanded exports.
- `inlineRequires` is safe with Expo tree shaking enabled; avoid it without tree shaking because it can change side-effect order.
- Libraries should prefer ESM imports with `process.env.NODE_ENV` conditionals over conditional `require`.
- Source modificationDate not recorded here (unversioned guide, fetched 2026-10-17).

## Related

- [Metro bundler](./customizing-metro.md)
- [metro.config.js](./metro-config.md)
- [Environment variables in Expo](./environment-variables.md)
