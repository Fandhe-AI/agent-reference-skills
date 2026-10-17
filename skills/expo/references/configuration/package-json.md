---
source: https://docs.expo.dev/versions/v58.0.0/config/package-json/
---

# package.json

Reference for Expo-specific properties, set by adding an `expo` field in **package.json**.

## Signature / Usage

```json
{
  "expo": {
    "install": {
      "exclude": ["expo-updates", "expo-splash-screen"]
    }
  }
}
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `expo.install.exclude` | string[] | Libraries excluded from version checks done by `npx expo start`, `npx expo-doctor`, and `npx expo install` (new installs, `--check`, `--fix`). |
| `expo.autolinking` | object | Configures module resolution behavior, e.g. `{ "nativeModulesDir": "./modules" }`. See the autolinking configuration reference. |
| `expo.doctor.reactNativeDirectoryCheck.enabled` | boolean | Validate packages against the React Native directory. Enabled by default. |
| `expo.doctor.reactNativeDirectoryCheck.exclude` | string[] | Packages / patterns to exclude, e.g. `["/foo/", "bar"]`. |
| `expo.doctor.reactNativeDirectoryCheck.listUnknownPackages` | boolean | List packages unknown to the directory. Listed by default. |
| `expo.doctor.appConfigFieldsNotSyncedCheck.enabled` | boolean | Enable / disable the check that warns when **android** / **ios** directories exist (not git- or EAS-ignored) alongside an app config. |

## Notes

- `reactNativeDirectoryCheck` example:

```json
{
  "expo": {
    "doctor": {
      "reactNativeDirectoryCheck": {
        "enabled": true,
        "exclude": ["/foo/", "bar"],
        "listUnknownPackages": true
      }
    }
  }
}
```

- `appConfigFieldsNotSyncedCheck`: when **android** or **ios** directories are present, EAS Build does not sync app config properties to the native projects; Expo Doctor warns if the directories exist but are not in **.gitignore** or **.easignore** and an app config exists (project configured to use Prebuild).
- Source modificationDate: September 15, 2026 (SDK 58, `/versions/v58.0.0/`).

## Related

- [app.json / app.config.js](./app-config.md)
