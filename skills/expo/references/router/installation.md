---
source: https://docs.expo.dev/router/installation/
---

# Manual installation

Add Expo Router to an existing project. For new projects use the quick start in the introduction.

## Signature / Usage

Install dependencies:

```sh
npx expo install expo-router react-native-safe-area-context react-native-screens expo-linking expo-constants expo-status-bar
```

Web:

```sh
npx expo install react-native-web react-dom
```

In SDK 58 and later, `expo-symbols` and `@expo/ui` are optional peer dependencies of Expo Router. Install only what the APIs you use require:

```sh
# Android md icons in native tabs
npx expo install expo-symbols
# Android Stack.Toolbar
npx expo install @expo/ui
```

Entry point in **package.json** (initial client file is **src/app/_layout.tsx**, or **app/_layout.tsx** without the src directory):

```json
{
  "main": "expo-router/entry"
}
```

Custom entry point (import `expo-router/entry` last, then point `main` at the new file):

```js
// Import side effects first and services

// Initialize services

// Register app entry through Expo Router
import 'expo-router/entry';
```

App config: add a deep linking `scheme`, the `expo-router` config plugin, and typed routes:

```json
{
  "expo": {
    "scheme": "your-app-scheme",
    "plugins": ["expo-router"],
    "experiments": {
      "typedRoutes": true
    }
  }
}
```

**babel.config.js** (use `babel-preset-expo`; delete the file if no custom config is needed):

```js
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
  };
};
```

Path aliases with the `src` directory (**tsconfig.json**):

```json
{
  "extends": "expo/tsconfig.base",
  "compilerOptions": {
    "strict": true,
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["**/*.ts", "**/*.tsx", ".expo/types/**/*.ts", "expo-env.d.ts"]
}
```

Clear the bundler cache after configuration changes:

```sh
npx expo start --clear
```

## Notes

- `npx expo install` picks versions compatible with the project's Expo SDK version.
- Custom entry point use cases: initializing global services (analytics, error reporting), polyfills, ignoring logs with `LogBox` from `react-native`.
- Page modification date: October 16, 2026.

## Related

- [Introduction](./introduction.md)
- [Navigation layouts](./navigation-layouts.md)
