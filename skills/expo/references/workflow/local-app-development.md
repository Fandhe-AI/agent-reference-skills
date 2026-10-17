---
source: https://docs.expo.dev/guides/local-app-development/
---

# Create a debug build locally

Build your app locally on your machine: generate native code, compile a debug build with Expo CLI `run` commands, and optionally use `expo-dev-client`.

## Signature / Usage

```sh
# Build native Android project
npx expo run:android
# Build native iOS project
npx expo run:ios

# Daily JS/TS development after the first build
npx expo start

# Android product flavors
npx expo run:android --variant freeDebug --app-id dev.expo.myapp.free
```

## Options / Props

| Command | What it does | When to use it |
| --- | --- | --- |
| `npx expo run:android` / `npx expo run:ios` | Compiles native code, installs the app, starts Metro. | First build, after adding a native library, or after modifying a config plugin. |
| `npx expo start` | Starts only the Metro bundler. | Daily development when only changing JavaScript or TypeScript code. |

| Flag | Description |
| --- | --- |
| `--device` | Select a device (physical or emulator/simulator). |
| `--variant release` (Android) / `--configuration Release` (iOS) | Production build; not signed, cannot be submitted to app stores. |
| `--variant debugOptimized` | Android only, SDK 54 and later, faster development iteration. |
| `--variant <flavorBuildType>` | camelCase product flavor + build type, for example `freeDebug`. |
| `--app-id <id>` | Launch the app after building with a customized application ID. |

## Notes

- Prerequisites: Android Studio (Android) and Xcode (iOS) set up for local compilation.
- The compile commands run `npx expo prebuild` first if **android** / **ios** directories do not exist. Re-running prebuild layers changes on existing files; use `npx expo prebuild --clean` (native directories are in **.gitignore** for new projects).
- Installing `expo-dev-client` makes the debug build a development build.
- Customizing the Android build type away from `release` breaks Expo's assumption that `release` is used for production.
- Run EAS Build locally with the `--local` flag (see local builds in EAS Build).
- Distinct from React itself and from React Native core components (View, Text, FlatList); see the react skill and a future react-native skill for those.
- Source pinned by fetch date 2026-10-17 (modificationDate: September 17, 2026).

## Related

- [Create a release build locally](./local-app-production.md)
- [Introduction to development builds](./development-builds.md)
- [Expo CLI](./expo-cli.md)
