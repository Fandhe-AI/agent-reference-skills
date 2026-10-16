---
source: https://docs.expo.dev/config-plugins/development-and-debugging/
---

# Developing and debugging a plugin

Best practices for developing, scaffolding, safely modifying native files, and debugging Expo config plugins.

## Signature / Usage

Import through the `expo` re-exports:

```js
const { ... } = require('expo/config-plugins');
const { ... } = require('expo/config');
```

```ts
import { ExpoConfig, ConfigContext } from 'expo/config';
```

Add a `<meta-data>` entry to the main application:

```ts
import { AndroidConfig, ConfigPlugin, withAndroidManifest } from 'expo/config-plugins';
import { ExpoConfig } from 'expo/config';

const { addMetaDataItemToMainApplication, getMainApplicationOrThrow } = AndroidConfig.Manifest;

export const withMyCustomConfig: ConfigPlugin = config => {
  return withAndroidManifest(config, async config => {
    config.modResults = await setCustomConfigAsync(config, config.modResults);
    return config;
  });
};
```

Info.plist:

```ts
import { ConfigPlugin, withInfoPlist } from 'expo/config-plugins';

export const withCustomConfig: ConfigPlugin<string> = (config, id) => {
  return withInfoPlist(config, config => {
    config.modResults.GADApplicationIdentifier = id;
    return config;
  });
};
```

Run-once guard recorded in `_internal.pluginHistory`:

```ts
import { ConfigPlugin, createRunOncePlugin } from 'expo/config-plugins';

const pkg = require('my-cool-plugin/package.json');

const withMyCoolPlugin: ConfigPlugin = config => config;

export default createRunOncePlugin(withMyCoolPlugin, pkg.name, pkg.version);
```

Debugging commands:

```sh
EXPO_DEBUG=1 expo prebuild
npx expo prebuild --clean
npx expo config --type prebuild
npx expo config --type introspect
```

## Options / Props

Plugin property type (props must be static because the app config is serialized to JSON):

```ts
type StaticValue = boolean | number | string | null | StaticArray | StaticObject;

type StaticArray = StaticValue[];

interface StaticObject {
  [key: string]: StaticValue | undefined;
}
```

Environment variables:

| Name | Effect |
| --- | --- |
| `EXPO_DEBUG=1` | Print plugin stack logs (which mods ran and in what order). |
| `EXPO_CONFIG_PLUGIN_VERBOSE_ERRORS` | Show all static plugin resolution errors (for plugin authors). |
| `EXPO_PROFILE=1` | Profile Expo CLI commands. |

Introspection supports only these mods: `android.manifest`, `android.gradleProperties`, `android.strings`, `android.colors`, `android.colorsNight`, `android.styles`, `ios.infoPlist`, `ios.entitlements`, `ios.expoPlist`, `ios.podfileProperties`.

## Notes

- Mod best practices: avoid regex (prefer static modification); avoid long-running tasks (network requests, installing Node modules) and interactive prompts in mods; generate, move, and delete files only in dangerous mods (otherwise introspection breaks); use built-in plugins such as `withXcodeProject` and the XML parsers prebuild uses internally.
- Prefer a package-level **AndroidManifest.xml** (build-time merge) for static, non-optional features like permissions; the drawback is no introspection preview.
- The iOS **Podfile** is Ruby and cannot be safely modified from config plugins; use Expo Autolinking hooks or the `ios.podfileProperties` mod (`withPodfileProperties`) that writes **Podfile.properties.json**. For Gradle, use static `gradle.properties` keys (camelCase separated by `.`, prefix `expo`) read with `property` / `findProperty`. For the AppDelegate prefer AppDelegate subscribers over the strongly discouraged `withAppDelegate`.
- Versioning: prebuild runs on a template tied to the Expo SDK version; static modifications generally work across SDKs, regex transforms need a documented SDK version. A beta period precedes each SDK release for testing.
- Android startup configuration pattern: `ReactActivityLifecycleListener` (`expo-modules-core`) reads a value written by `withStringsXml` into **strings.xml** (naming: package name plus value name with underscores, e.g. `expo_custom_value`); optional `SingletonModule`.
- Playground: use a monorepo with the plugin in `packages/`, or manually run via `npm pack`, `npm install path/to/package-1.0.0.tgz`, and add the package to `plugins`.
- Custom base modifiers can be added with `BaseMods.withGeneratedBaseMods` and `withMod`; the base mod MUST be added last in the `plugins` array.
- Legacy plugins: installed packages like `expo-camera` get plugins added automatically; manual entries take precedence. Check `_internal.pluginHistory` via `expo config --type prebuild`; `UNVERSIONED` entries come from the legacy fallback and are less stable.
- `npx expo install` adds a package's config plugin automatically only for static app config (**app.json** / **app.config.json**), not dynamic config (prints the entry to add manually); it does not add props and cannot detect mandatory props.
- Use the Expo Tools VS Code extension for validation and modifier previews.
- Source modificationDate not recorded here (unversioned guide, fetched 2026-10-17).

## Related

- [Mods](./mods.md)
- [Using a dangerous mod](./dangerous-mods.md)
- [Plugin development for libraries](./plugins-for-libraries.md)
