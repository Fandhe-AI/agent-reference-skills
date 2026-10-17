---
source: https://docs.expo.dev/workflow/upgrading-expo-sdk-walkthrough/
---

# Upgrade Expo SDK

Incrementally upgrade the Expo SDK version in a project, one SDK at a time, to pinpoint breakages.

## Signature / Usage

```sh
# 1. Install the new version of the Expo package (SDK 58)
npm install expo@^58.0.0

# 2. Upgrade all dependencies to match, then check for common problems
npx expo install --fix
npx expo-doctor
```

## Notes

- With a new SDK release the latest version enters the current release status. Expo Go only supports the latest SDK version. Development builds are recommended for production apps, since backwards compatibility for older SDK versions on EAS services lasts much longer (but not forever).
- A specific Expo Go version can be installed from expo.dev/go or via the `expo-go` CLI.
- If you use CNG: delete **android** and **ios** directories generated for a previous SDK; they regenerate on the next `npx expo run:ios`, `npx expo prebuild`, or EAS Build.
- If you do not use CNG: run `npx pod-install` if you have an **ios** directory, apply changes from the Native project upgrade helper, or consider adopting prebuild.
- Read the SDK changelog for the target version; see "Upgrading your app" at the bottom of the release notes page. Changelogs linked on the page: SDK 58, 57, 56, 55 (current list); SDK 54 and older are listed as deprecated SDK version changelogs (e.g. `https://expo.dev/changelog/sdk-58`).
- Distinct from React itself and from React Native core components (View, Text, FlatList); see the react skill and a future react-native skill for those.
- Source pinned by fetch date 2026-10-17 (modificationDate: October 16, 2026). Page describes the SDK 58 upgrade. For Expo Router specific changes see the SDK 57 to 58 migration page in the router-reference category.

## Related

- [Adopt Prebuild](./adopting-prebuild.md)
- [Continuous Native Generation (CNG)](./continuous-native-generation.md)
- [Using Expo SDK, React Native, and third-party libraries](./using-libraries.md)
