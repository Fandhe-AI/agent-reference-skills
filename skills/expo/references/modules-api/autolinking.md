---
source: https://docs.expo.dev/modules/autolinking/
---

# Autolinking

Expo Autolinking automates linking native dependencies (Expo modules and React Native modules): installing the package from npm and re-running `pod install` is usually enough. Implementation lives in the `expo-modules-autolinking` package: a CLI with module resolution algorithms, Gradle integration for Android, and CocoaPods integration for iOS.

## Signature / Usage

```json
{
  "expo": {
    "autolinking": {
      "searchPaths": ["../../packages"],
      "nativeModulesDir": "./modules",
      "android": {
        "exclude": ["expo-random", "third-party-expo-module"]
      }
    }
  }
}
```

CLI:

```sh
npx expo-modules-autolinking search
npx expo-modules-autolinking resolve --platform <apple|android>
npx expo-modules-autolinking verify
npx expo-modules-autolinking react-native-config
```

## Options / Props

Defined (lowest to highest precedence) in: `expo.autolinking` in the app's package.json; per-platform overrides `expo.autolinking.android` / `.ios` / `.apple` (`apple` falls back to `ios` when missing); options passed to the CLI, `use_expo_modules!` in the Podfile, or `useExpoModules` in settings.gradle.

| Name | Type | Description |
| --- | --- | --- |
| `searchPaths` | string[] | Paths relative to the app root searched for modules; must be structured like node_modules directories. Before SDK 54 defaulted to the app's node_modules and all node_modules above it in monorepos; restore with `["../../node_modules", "./node_modules"]`. |
| `nativeModulesDir` | string | Path relative to the app root for local modules. Default `"./modules"`. |
| `exclude` | string[] | Package names to exclude from autolinking (per platform allowed). Before SDK 54 applied only to Expo modules; React Native modules could only be excluded via react-native.config.js with the platform set to `null`. |
| `include` | string[] | SDK 55 and later. Extra package names verified for deduplication (not linked into the native build). Per-platform `include` lists are merged with the root list. |
| `flags` | object | iOS only. CocoaPods flags passed to each autolinked pod, e.g. `inhibit_warnings`. |
| `buildFromSource` | string[] | Android only. Package names to opt out of prebuilt Expo modules. |
| `legacy_shallowReactNativeLinking` | boolean | Restores pre-SDK 54 behavior of searching only the app's direct dependencies for React Native modules. Not considered for Expo modules. |

## Notes

- Module resolution steps: (1) React Native modules only: `dependencies` in the root react-native.config.js with an explicit `root` path; (2) all `searchPaths`; (3) local modules in `nativeModulesDir`; (4) recursive resolution of app dependencies and peer dependencies (Node.js resolution algorithm).
- A module is autolinkable only if it has **expo-module.config.json** at the package root next to package.json, and the platform being linked is in its `platforms` array.
- `search` output lists Expo modules with `path`, `version`, `config` (contents of expo-module.config.json), and `duplicates`. `resolve` outputs platform-specific details (for apple: `modules` entries with `packageName`, `packageVersion`, `pods`, `swiftModuleNames`, `modules`, `appDelegateSubscribers`, `reactDelegateHandlers`, `debugOnly`). `verify` reports duplicates (add `--verbose` to list all autolinked modules). `react-native-config` outputs react-native.config.js-format data for React Native modules.
- Duplicate native modules (common in monorepos / isolated installs) can crash at runtime: find them with `npx expo-doctor` or `verify`; deduplicating is the complete fix.
- Workaround: `experiments.autolinkingModuleResolution: true` in app config (from SDK 54) forces Metro resolution to match autolinking; enabled by default for apps in monorepos from SDK 55.
- Starting from SDK 52, Expo Autolinking replaces the React Native community CLI autolinking by default. To opt out for React Native modules, set `EXPO_USE_COMMUNITY_AUTOLINKING=1` and add `@react-native-community/cli` as a dev dependency; Expo modules are still autolinked by Expo.
- Differences from community CLI autolinking: built-in monorepo, workspace, transitive and isolated dependency support; faster; duplicate detection; integrates with Expo Modules API features.
- Projects created with `npx create-expo-app` are already configured; others should follow the "Installing Expo modules" guide.
- Distinct from apple-swift and android-architecture (Gradle / CocoaPods details of the host app are not covered there).
- Source modificationDate: August 27, 2026 (unversioned guide page, fetched 2026-10-17).

## Related

- [expo-module.config.json](./module-config.md)
- [Integrate in an existing library](./existing-library.md)
- [Inline modules reference](./inline-modules-reference.md)
