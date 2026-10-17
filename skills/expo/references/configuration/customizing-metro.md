---
source: https://docs.expo.dev/guides/customizing-metro/
---

# Metro bundler

Customize Metro by creating **metro.config.js** at the project root, exporting a Metro configuration that extends `expo/metro-config` (import `expo/metro-config`, not `@expo/metro-config`).

## Signature / Usage

```sh
npx expo customize metro.config.js
```

```js
const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

module.exports = config;
```

Add asset extensions:

```js
config.resolver.assetExts.push(
  // Adds support for `.db` files for SQLite databases
  'db'
);
```

Aliases via a custom resolver:

```js
const ALIASES = {
  'old-module': 'new-module',
};

config.resolver.resolveRequest = (context, moduleName, platform) => {
  // Ensure you call the default resolver.
  return context.resolveRequest(
    context,
    // Use an alias if one exists.
    ALIASES[moduleName] ?? moduleName,
    platform
  );
};
```

Enable Metro web:

```json
{
  "expo": {
    "web": {
      "bundler": "metro"
    }
  }
}
```

## Notes

- Expo locks down some Metro options; not every upstream option is supported. YAML Metro configs and configs outside the repository are not supported.
- Metro requires `resolver.sourceExts` and `resolver.assetExts` extensions to be explicit (without leading `.`).
- Alias resolutions are never cached and need no `--clear`; transform-based systems like `babel-plugin-module-resolver` need a cache clear. Check the `platform` argument to limit an alias to one platform (for example `'web'`).
- From SDK 56, the file map supports on-demand filesystem access (`experiments.onDemandFilesystem`, enabled by default): `watchFolders` need not include every bundled module and symlinks outside the project root resolve.
- Bundle splitting on async imports is web-only; with Expo Router it splits per route file.
- Web: dev server via `npx expo start --web` (or W in the terminal UI). Files in **public/** are served and copied to **dist/** on `npx expo export`; **public/index.html** overrides the default. Paths like `/assets` are reserved by Metro.
- TypeScript `compilerOptions.paths` and `baseUrl` from **tsconfig.json** / **jsconfig.json** are supported; existing React Native projects need extra setup.
- Source modificationDate not recorded here (unversioned guide, fetched 2026-10-17).

## Related

- [metro.config.js](./metro-config.md)
- [Tree shaking and code removal](./tree-shaking.md)
- [Using TypeScript](./typescript.md)
