---
source: https://docs.expo.dev/guides/new-architecture/
---

# React Native's New Architecture

SDK 55 and later run entirely on the New Architecture. It is always enabled and cannot be disabled; use SDK 54 or earlier for the legacy architecture.

## Signature / Usage

SDK 54 and earlier opt-out (SDK 54 is the last SDK where it can be disabled; requires a development build):

```json
{
  "expo": {
    "newArchEnabled": false
  }
}
```

Check dependencies against React Native Directory:

```sh
npx expo-doctor@latest
```

```json
{
  "expo": {
    "doctor": {
      "reactNativeDirectoryCheck": {
        "exclude": ["react-redux"]
      }
    }
  }
}
```

## Options / Props

`expo.doctor.reactNativeDirectoryCheck`:

| Name | Type | Description |
| --- | --- | --- |
| `enabled` | boolean | Warn if packages are missing from React Native Directory. `true` by default in SDK 52 and later, otherwise `false`. Override with `EXPO_DOCTOR_ENABLE_DIRECTORY_CHECK` (0 / 1). |
| `exclude` | string[] | Packages to exclude; exact names and regex patterns, e.g. `["exact-package", "/or-a-regex-.*/"]`. |
| `listUnknownPackages` | boolean | Set to `false` to stop warning about packages missing from the directory. |

## Notes

- React Native 0.82 was the first version to remove the option to disable the New Architecture; SDK 55 uses React Native 0.83. `newArchEnabled: false` in app config is ignored in SDK 55+; remove it. Expo Go only supports the New Architecture.
- SDK 53 and 54: enabled by default. SDK 52: enable with `newArchEnabled` at the root of the `expo` object (or per platform, e.g. `"android": { "newArchEnabled": true }`), then rebuild (`npx expo prebuild --clean && npx expo run:android`, or `eas build`). SDK 51 and earlier: needs the `expo-build-properties` plugin to set `newArchEnabled`; upgrade recommended.
- New projects use the New Architecture by default as of SDK 52. New project template: `npx create-expo-app@latest --template default@sdk-58`.
- As of SDK 53 all `expo-*` packages support the New Architecture (including bridgeless); modules written with the Expo Modules API support it by default. The page states no known New Architecture issues in Expo libraries.
- Existing React Native projects (SDK 52 and earlier): set `newArchEnabled=true` (or `false`) in **gradle.properties** on Android; on iOS set `newArchEnabled` to `"true"` / `"false"` in **Podfile.properties.json**.
- Legacy architecture was frozen in June 2025 per the page. Since React Native 0.74 interop layers are enabled by default.
- Known third-party issues listed: react-native-maps (1.20.x with interop; 1.21.0 is New Architecture-first), @stripe/react-native (supported from 0.45.0), masked-view / clipboard community packages (use `@react-native-masked-view/masked-view`, `@react-native-clipboard/clipboard`), rn-fetch-blob (use `react-native-blob-util`), react-native-fs (use `expo-file-system`), react-native-geolocation-service (use `expo-location`), react-native-datepicker (use `react-native-date-picker` or `@react-native-community/datetimepicker`).
- Distinct from React itself and from React Native core internals (Fabric, TurboModules); see the react / react-native skills for those.
- Source modificationDate not recorded here (unversioned guide, fetched 2026-10-17).

## Related

- [package.json](./package-json.md)
- [Build properties](./build-properties.md)
