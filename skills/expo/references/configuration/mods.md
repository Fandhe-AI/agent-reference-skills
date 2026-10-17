---
source: https://docs.expo.dev/config-plugins/mods/
---

# Mods

Mods (modifiers) are asynchronous functions that modify native project files during the syncing phase of `npx expo prebuild`. Use mod plugins from `expo/config-plugins` rather than top-level mods directly.

## Signature / Usage

```ts
import { ConfigPlugin, withXcodeProject, IOSConfig } from 'expo/config-plugins';

const withCustomProductName: ConfigPlugin<string> = (config, customName) => {
  return withXcodeProject(
    config,
    async (
      config
    ) => {
      config.modResults = IOSConfig.Name.setProductName({ name: customName }, config.modResults);
      return config;
    }
  );
};
```

Inline function in a dynamic app config:

```js
const withCustom = (config, props) => config;

const config = {
  plugins: [
    [
      withCustom,
      {
        /* props */
      },
    ],
    withCustom,
  ],
};
```

## Options / Props

Android mod plugins:

| Default mod | Mod plugin | Modifies |
| --- | --- | --- |
| `mods.android.manifest` | `withAndroidManifest` | **android/app/src/main/AndroidManifest.xml** as JSON (xml2js) |
| `mods.android.strings` | `withStringsXml` | **res/values/strings.xml** as JSON |
| `mods.android.colors` | `withAndroidColors` | **res/values/colors.xml** as JSON |
| `mods.android.colorsNight` | `withAndroidColorsNight` | **res/values-night/colors.xml** as JSON |
| `mods.android.styles` | `withAndroidStyles` | **res/values/styles.xml** as JSON |
| `mods.android.gradleProperties` | `withGradleProperties` | **android/gradle.properties** as `Properties.PropertiesItem[]` |
| `mods.android.mainActivity` | `withMainActivity` | MainActivity.java as a string |
| `mods.android.mainApplication` | `withMainApplication` | MainApplication.java as a string |
| `mods.android.appBuildGradle` | `withAppBuildGradle` | **android/app/build.gradle** as a string |
| `mods.android.projectBuildGradle` | `withProjectBuildGradle` | **android/build.gradle** as a string |
| `mods.android.settingsGradle` | `withSettingsGradle` | **android/settings.gradle** as a string |

iOS mod plugins:

| Default mod | Mod plugin | Modifies |
| --- | --- | --- |
| `mods.ios.infoPlist` | `withInfoPlist` | **ios/<name>/Info.plist** as JSON (`@expo/plist`) |
| `mods.ios.entitlements` | `withEntitlementsPlist` | **.entitlements** as JSON |
| `mods.ios.expoPlist` | `withExpoPlist` | **Expo.plist** as JSON |
| `mods.ios.xcodeproj` | `withXcodeProject` | **.xcodeproj** as an `XcodeProject` object (`xcode`) |
| `mods.ios.podfile` | `withPodfile` | **ios/Podfile** as a string |
| `mods.ios.podfileProperties` | `withPodfileProperties` | **ios/Podfile.properties.json** as JSON |
| `mods.ios.appDelegate` | `withAppDelegate` | **AppDelegate.m** as a string |

`modRequest` properties passed to a mod plugin (with `modResults` holding the data to modify):

| Property | Type | Description |
| --- | --- | --- |
| `projectRoot` | `string` | Project root directory for the universal app. |
| `platformProjectRoot` | `string` | Project root for the specific platform. |
| `modName` | `string` | Name of the mod. |
| `platform` | `ModPlatform` | Name of the platform used in the mods config. |
| `projectName` | `string` | (iOS only) Path component for querying project files, e.g. `projectRoot/ios/[projectName]/`. |

## Notes

- Mod plugins wrap top-level (default) mods. Default mods are added to the `mods` object of the app config, which is not serialized; `mods` are omitted from the manifest and cannot be read via `Updates.manifest`. Mods are platform-specific and live under `mods: { ios: {...}, android: {...} }`.
- Default mods flow: config read with `getPrebuildConfig` from `@expo/prebuild-config`; core functionality added via `withIosExpoPlugins`; config passed to `compileModsAsync`, which adds base mods that read, execute a named mod, and write files, with error handling after each mod.
- Regex-based modifications can break builds and are hard to version; prefer application code (Expo Modules native API) where possible.
- Plugin resolution: plugins defined in the app project (file import, or inline function). Serialization replaces an inline function with its name (e.g. `["withCustom", {}]`). Standalone package plugins resolve in order: **app.plugin.js** in the package root, then the package `main` entry, then direct internal imports (not recommended). `app.plugin.js` is preferred because it allows different transpilation settings from the main package code. Resolution patterns not specified are unexpected behavior and subject to breaking changes.
- Source modificationDate not recorded here (unversioned guide, fetched 2026-10-17).

## Related

- [Introduction to config plugins](./config-plugins-introduction.md)
- [Using a dangerous mod](./dangerous-mods.md)
- [Create and use config plugins](./config-plugins.md)
