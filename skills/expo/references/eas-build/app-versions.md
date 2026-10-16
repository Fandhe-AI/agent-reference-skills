---
source: https://docs.expo.dev/build-reference/app-versions/
---

# App version management

Learn about different version types and how to manage them remotely or locally.

## Signature / Usage

```json
{
  "cli": {
    "appVersionSource": "remote"
  },
  "build": {
    "production": {
      "autoIncrement": true
    }
  }
}
```

Sync existing versions to EAS (remote source):

```sh
eas build:version:set
```

Update local project with remote versions (for local Android Studio / Xcode builds):

```sh
eas build:version:sync
```

## Options / Props

| Property | Description |
| --- | --- |
| `version` | User-facing version visible in stores. Android `versionName` in **android/app/build.gradle**; iOS `CFBundleShortVersionString` in **Info.plist**. |
| `android.versionCode` | Developer-facing build version for Android (`versionCode` in **android/app/build.gradle**). |
| `ios.buildNumber` | Developer-facing build version for iOS (`CFBundleVersion` in **Info.plist**). |
| `cli.appVersionSource` | `remote` (EAS servers store and manage `android.versionCode` / `ios.buildNumber`; recommended from EAS CLI `12.0.0`) or `local` (local project source is the source of truth). |

## Notes

- Show the user-facing version in-app with `Application.nativeApplicationVersion` and the build version with `Application.nativeBuildVersion` from `expo-application`.
- Update `version` yourself on production release; auto increment developer-facing build versions to avoid duplicate-version store rejections.
- Remote: the remote version is initialized with the local value (e.g. `android.versionCode` 1 becomes 2 on the next build); when enabled, build version values in app config are ignored and not updated. `eas build:version:set` asks "Do you want to set app version source to remote now?" and the version to initialize with.
- Remote limitations: `eas build:version:sync` on Android does not support existing React Native projects with multiple flavors; `autoIncrement` does not support the `version` option; not supported with EAS Update runtime policy `"runtimeVersion": { "policy": "nativeVersion" }` (use the `"appVersion"` policy instead).
- Local: EAS reads app version values and builds as-is, it does not write to the project. With `autoIncrement` you must commit changes on every build to persist them (hard on CI). For existing React Native projects, native code values take precedence; prefer `expo-application` to read versions. Gradle multiple flavors: `autoIncrement` not supported.
- Source modificationDate: September 25, 2026 (fetched 2026-10-17).

## Related

- [Configure EAS Build with eas.json](./build-eas-json.md)
- [Configuration with eas.json](./eas-json.md)
