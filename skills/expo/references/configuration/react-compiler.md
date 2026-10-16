---
source: https://docs.expo.dev/guides/react-compiler/
---

# React Compiler

React Compiler automatically memoizes components and hooks for fine-grained reactivity. Enable it in Expo through an app config experiment flag.

## Signature / Usage

Check compatibility:

```sh
npx react-compiler-healthcheck@latest
```

Enable in the app config:

```json
{
  "expo": {
    "experiments": {
      "reactCompiler": true
    }
  }
}
```

Incremental adoption (restart Metro with `npx expo start --clear` after editing):

```js
module.exports = function (api) {
  api.cache(true);

  return {
    presets: [
      [
        'babel-preset-expo',
        {
          'react-compiler': {
            sources: filename => {
              // Match file names to include in the React Compiler.
              return filename.includes('src/path/to/dir');
            },
          },
        },
      ],
    ],
  };
};
```

Opt out per component or file:

```jsx
function MyComponent() {
  'use no memo';

  return <Text>Will not be optimized</Text>;
}
```

## Options / Props

Settings under the `react-compiler` key of `babel-preset-expo` options (passed directly to the React Compiler Babel plugin; a `web` key can hold web-only settings):

| Name | Type | Description |
| --- | --- | --- |
| `sources` | `(filename: string) => boolean` | Selects files to compile (incremental adoption). |
| `compilationMode` | string | Example value in the guide: `'all'`. |
| `panicThreshold` | string | Example value in the guide: `'all_errors'`. |

## Notes

- SDK 54 and later: Babel is configured automatically. SDK 53: `npx expo install babel-plugin-react-compiler@beta`. SDK 52 and earlier: `npx expo install babel-plugin-react-compiler@beta react-compiler-runtime@beta`.
- Linter: run `npx expo lint`. SDK 55 and later include React Compiler lint rules in `eslint-config-expo` (uninstall `eslint-plugin-react-compiler` if previously installed). SDK 54 and earlier: install `eslint-plugin-react-compiler` as a dev dependency and add `reactCompiler.configs.recommended` to **eslint.config.js**.
- Improvements are automatic; `useCallback`, `useMemo`, and `React.memo` can be removed. Class components are not optimized.
- Expo's implementation runs only on application code (not node modules) and only when bundling for the client (disabled in server rendering).
- Source modificationDate not recorded here (unversioned guide, fetched 2026-10-17).

## Related

- [babel.config.js](./babel-config.md)
- [app.json / app.config.js](./app-config.md)
