---
source: https://docs.expo.dev/develop/development-builds/introduction/
---

# Introduction to development builds

A development build is your own version of Expo Go: a debug build that includes the `expo-dev-client` library, allowing any native library and native configuration. Recommended when you want to create your own app and release it to app stores.

## Signature / Usage

```sh
# Build locally with Expo CLI (no Expo account; Android Studio / Xcode)
npx expo install expo-dev-client
npx expo run:android
npx expo run:ios            # add --device for a physical device

# Build with EAS (cloud)
npm install --global eas-cli && eas login
eas build --platform android --profile development
eas build --platform ios --profile development

# Build locally with EAS CLI
eas build --platform android --profile development --local

# Start the JavaScript bundler (targets the development build when expo-dev-client is installed)
npx expo start
```

iOS Simulator builds with EAS need `ios.simulator` set to `true` in the `development` profile:

```json
{
  "build": {
    "development": {
      "ios": {
        "simulator": true
      }
    }
  }
}
```

## Options / Props

| Method | Where it compiles | Notes |
| --- | --- | --- |
| Build locally | Your machine (Android Studio, Xcode) via Expo CLI | No Expo account; the only way to install a development build on an iPhone without a paid Apple Developer account. |
| Build with EAS | EAS servers | No native build tools needed; iOS builds from any OS. iPhone device builds need a paid Apple Developer account for signing. |
| Build locally with EAS CLI | Your machine, `--local` flag | EAS still manages credentials, signing, and profiles. Windows Android is possible via WSL (no first-class support). |

## Notes

- Without `expo-dev-client`, start the server with `npx expo start --dev-client` to target your development build instead of Expo Go.
- Rebuild (`npx expo prebuild --clean`, then run the build again) only when installing or updating a library containing native code, changing app config, or upgrading the Expo SDK. For JS/TS-only changes, run `npx expo start`.
- `npx expo run:*` and `eas build` run prebuild automatically if no native directories exist.
- iOS: enable developer mode on the device; for local iPhone builds set a unique `ios.bundleIdentifier`. iOS Simulator builds install only on simulators; device builds only on iPhones.
- Existing React Native projects that do not use CNG need further configuration after installing `expo-dev-client`.
- Distinct from React itself and from React Native core components (View, Text, FlatList); see the react / react-native skills for those.
- Source pinned by fetch date 2026-10-17 (modificationDate: September 10, 2026). The page's AI-agent prompt blocks and Expo Skills promotion are not transcribed.

## Related

- [Use a development build](./use-development-builds.md)
- [Create a debug build locally](./local-app-development.md)
- [Continuous Native Generation (CNG)](./continuous-native-generation.md)
