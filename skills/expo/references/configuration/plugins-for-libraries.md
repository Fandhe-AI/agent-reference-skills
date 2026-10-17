---
source: https://docs.expo.dev/config-plugins/development-for-libraries/
---

# Plugin development for libraries

How to ship a config plugin inside a React Native library so users get automated native configuration and Continuous Native Generation (CNG) compatibility.

## Signature / Usage

Entry point exported for Expo CLI (**app.plugin.js** at the library root):

```js
module.exports = require('./plugin/build');
```

Plugin structure:

```ts
import type { ConfigPlugin } from 'expo/config-plugins';
import { withAndroidConfiguration } from './withAndroid';
import { withIosConfiguration } from './withIos';

export interface YourLibraryPluginProps {
  customProperty?: string;
  enableFeature?: boolean;
}

const withYourLibrary: ConfigPlugin<YourLibraryPluginProps> = (config, props = {}) => {
  // Apply Android configurations
  config = withAndroidConfiguration(config, props);

  // Apply iOS configurations
  config = withIosConfiguration(config, props);

  return config;
};

export default withYourLibrary;
```

Android:

```ts
import { type ConfigPlugin, withAndroidManifest, AndroidConfig } from 'expo/config-plugins';
import type { YourLibraryPluginProps } from './index';

export const withAndroidConfiguration: ConfigPlugin<YourLibraryPluginProps> = (config, props) => {
  return withAndroidManifest(config, config => {
    const mainApplication = AndroidConfig.Manifest.getMainApplicationOrThrow(config.modResults);

    AndroidConfig.Manifest.addMetaDataItemToMainApplication(
      mainApplication,
      'your_library_config_key',
      props.customProperty || 'default_value'
    );

    return config;
  });
};
```

iOS:

```ts
import { type ConfigPlugin, withInfoPlist } from 'expo/config-plugins';
import type { YourLibraryPluginProps } from './index';

export const withIosConfiguration: ConfigPlugin<YourLibraryPluginProps> = (config, props) => {
  return withInfoPlist(config, config => {
    config.modResults.YourLibraryCustomProperty = props.customProperty || 'default_value';

    if (props.enableFeature) {
      config.modResults.YourLibraryFeatureEnabled = true;
    }

    return config;
  });
};
```

## Options / Props

`package.json` scripts for `expo-module-scripts`:

| Script | Command |
| --- | --- |
| `build` | `expo-module build` |
| `build:plugin` | `expo-module build plugin` |
| `clean` | `expo-module clean` |
| `test` | `expo-module test` |
| `prepare` | `expo-module prepare` |
| `prepublishOnly` | `expo-module prepublishOnly` |

Also set `devDependencies.expo` to `^58.0.0`, `peerDependencies.expo` to `>=58.0.0`, and `peerDependenciesMeta.expo.optional` to `true`. **plugin/tsconfig.json** extends `expo-module-scripts/tsconfig.plugin` with `outDir: "build"`, `rootDir: "src"`, `include: ["./src"]`, and excludes `**/__mocks__/*` and `**/__tests__/*`.

## Notes

- Suggested layout: `android/`, `ios/`, `src/` (library), `plugin/src/{index,withAndroid,withIos}.ts`, `plugin/build`, `plugin/__tests__`, `plugin/tsconfig.json`, `example/`, **app.plugin.js**, **package.json**. Expo CLI looks for **app.plugin.js** in the library root.
- `expo` provides the config plugin API and types; `expo-module-scripts` provides build tooling and TypeScript compilation.
- Testing: unit-test transformation logic with mocked `ExpoConfig` objects in Jest, validate real prebuild output with an example app, and test error conditions. Wrap logic in `try`/`catch` and rethrow with context.
- Without `expo-module-scripts` (for example libraries made with `create-react-native-library`): add **app.plugin.js** (`module.exports = require('./lib/plugin');`) built with the main package, or publish a separate plugin package with `main: "app.plugin.js"`, `files: ["app.plugin.js", "build/"]`, and `peerDependencies` on `expo` and the library.
- Best practices: document manual setup in the README (also supports non-CNG projects) and list properties; make plugins idempotent so `npx expo prebuild` works without `--clean`; name `withFeatureName` (platform-specific: `withAndroidSplash`, `withIosSplash`); reuse built-in app config / prebuild config instead of writing a plugin; split by platform for `EXPO_DEBUG` logs; unit test (`memfs` recommended for filesystem mocking); prefer TypeScript; never modify `sdkVersion` in a config plugin (can break `expo install`).
- Source modificationDate not recorded here (unversioned guide, fetched 2026-10-17).

## Related

- [Create and use config plugins](./config-plugins.md)
- [Developing and debugging a plugin](./plugin-development-debugging.md)
- [Mods](./mods.md)
