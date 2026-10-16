---
source: https://v2.tauri.app/reference/config/#androidconfig
---

# AndroidConfig / IosConfig

General configuration for the Android target (`bundle.android`) and the iOS target (`bundle.iOS`). The `AndroidIntentAction` values used by file associations are listed here as well.

## Signature / Usage

```json
{
  "bundle": {
    "android": { "minSdkVersion": 24, "autoIncrementVersionCode": false },
    "iOS": { "minimumSystemVersion": "15.0" }
  }
}
```

## Options / Props

### AndroidConfig

`additionalProperties: false`.

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `minSdkVersion` | integer (uint32) | `24` | The minimum API level required for the application to run. The Android system will prevent the user from installing the application if the system's API level is lower. |
| `versionCode` | integer (1 to 2100000000) \| null | — | The version code of the application. Limited to 2,100,000,000 per Google Play Store requirements. By default derived from your configured version: `versionCode = version.major * 1000000 + version.minor * 1000 + version.patch`. |
| `autoIncrementVersionCode` | boolean | `false` | Whether to automatically increment the `versionCode` on each build. If `true`, the generator reads the last `versionCode` from `tauri.properties` and increments it by 1 for every build; if `false` or not set, it falls back to `versionCode` or semver-derived logic. |
| `debugApplicationIdSuffix` | string \| null | — | Application ID suffix to append for debug builds, allowing debug and release versions side-by-side on one device. E.g. ".debug" makes debug builds use "com.example.app.debug". |

### IosConfig

`additionalProperties: false`.

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `template` | string \| null | — | A custom XcodeGen `project.yml` template to use. |
| `frameworks` | string[] \| null | — | iOS frameworks to bundle with the application. You need to recreate the iOS project for the changes to be applied. |
| `developmentTeam` | string \| null | — | The development team. Required for iOS development because code signing is enforced. The `APPLE_DEVELOPMENT_TEAM` environment variable can overwrite it. |
| `bundleVersion` | string \| null | — | The version of the build that identifies an iteration of the bundle. Translates to `CFBundleVersion`. |
| `minimumSystemVersion` | string | `"15.0"` | Minimum iOS version the bundled application supports. Maps to the `IPHONEOS_DEPLOYMENT_TARGET` value. |
| `infoPlist` | string \| null | — | Path to an `Info.plist` file to merge with the default `Info.plist`. Tauri also looks for `Info.plist` and `Info.ios.plist` in the same directory as the Tauri configuration file. |

### AndroidIntentAction

| Value | Maps to |
| --- | --- |
| `send` | `ACTION_SEND` |
| `sendMultiple` | `ACTION_SEND_MULTIPLE` |
| `view` | `ACTION_VIEW` |

## Notes

- `autoIncrementVersionCode`: to use this feature, remove `/tauri.properties` from `src-tauri/gen/android/app/.gitignore` so the current versionCode is committed to the repository.
- Root `version` also feeds mobile versions: on iOS it translates to `CFBundleShortVersionString` (the `tauri ios build` command has `--build-number <number>`); on Android version 1.0 is used by default unless `versionCode` is set.
- Source: `tauri-apps/tauri@tauri-v2.12.4` `crates/tauri-schema-generator/schemas/config.schema.json` (`definitions.AndroidConfig`, `IosConfig`, `AndroidIntentAction`).

## Related

- [BundleConfig](./bundle-config.md)
- [Configuration (root Config)](./overview.md)
