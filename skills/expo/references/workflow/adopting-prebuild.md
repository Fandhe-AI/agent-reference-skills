---
source: https://docs.expo.dev/guides/adopting-prebuild/
---

# Adopt Prebuild

Adopt Expo Prebuild in a project that was bootstrapped with React Native CLI (`npx @react-native-community/cli@latest init`).

## Signature / Usage

```diff
- import {AppRegistry} from 'react-native';
- import {name as appName} from './app.json';
+ import {registerRootComponent} from 'expo';
  import App from './App';
- AppRegistry.registerComponent(appName, () => App);
+ registerRootComponent(App);
```

Steps:

1. Install the `expo` package matching the installed `react-native` version: `npm install expo`.
2. Update the entry file to use `registerRootComponent` (above).
3. Commit changes, then regenerate native directories from the app config:

```sh
npx expo prebuild --clean
npx expo run:android
npx expo run:ios
```

## Notes

- Adopting prebuild links `expo-modules-core` natively, enabling the Expo native module API; every Expo CLI command also becomes usable.
- Not all `react-native` versions are explicitly supported; use a `react-native` version that has a corresponding Expo SDK version.
- Optional extras: add **.expo** to **.gitignore**; remove all fields outside the top-level `expo` object in **app.json**; see Customizing Metro for **metro.config.js**; change `package.json` scripts to Expo CLI `run` commands (better logging, auto code signing, better simulator handling).
- Migrating native customizations: map overlapping changes to built-in app config fields (for example `expo.icon`); check whether packages need an Expo config plugin (`npx expo install` can add some automatically; community plugins live in `expo/config-plugins`); inspect output with the VS Code Expo extension ("Expo: Preview Modifier"); write local config plugins if needed.
- Next features to adopt: EAS Build, EAS Update, Expo for web, Expo Dev Client, Expo native module API.
- Distinct from React itself and from React Native core components (View, Text, FlatList); see the react / react-native skills for those.
- Source pinned by fetch date 2026-10-17 (modificationDate: July 28, 2026). Docs describe Expo SDK 58.

## Related

- [Continuous Native Generation (CNG)](./continuous-native-generation.md)
- [Expo CLI](./expo-cli.md)
- [Add custom native code](./customizing-native-code.md)
