---
source: https://docs.expo.dev/submit/eas-json/
---

# Configure EAS Submit with eas.json

Learn how to configure your project for EAS Submit with `eas.json`.

## Signature / Usage

`eas.json` is generated when `eas build:configure` first runs and sits next to `package.json`. It is not mandatory for EAS Submit, but simplifies switching configurations. The `production` profile below is required to run Android and iOS submissions in CI/CD such as EAS Workflows:

```json
{
  "cli": {
    "version": ">= 0.34.0"
  },
  "submit": {
    "production": {
      "android": {
        "track": "internal"
      },
      "ios": {
        "ascAppId": "your-app-store-connect-app-id"
      }
    }
  }
}
```

Multiple profiles, with sharing through `extends`:

```json
{
  "submit": {
    "SUBMIT_PROFILE_NAME_1": {
      "android": { ...ANDROID_OPTIONS },
      "ios": { ...IOS_OPTIONS }
    },
    "SUBMIT_PROFILE_NAME_2": {
      "extends": "SUBMIT_PROFILE_NAME_1",
      "android": { ...ANDROID_OPTIONS }
    }
  }
}
```

Pick a specific profile:

```sh
eas submit --platform ios --profile <profile-name>
```

## Notes

- Running `eas submit` without a profile name uses `production` if defined; if it has no values, EAS CLI prompts interactively.
- When you select a build for submission, the profile used for that build is chosen; if the profile does not exist, `production` is used.
- `extends` can be chained up to a depth of 5; circular dependencies are not allowed.
- Per-platform options (for example Android `track`, `releaseStatus`, `serviceAccountKeyPath`; iOS `ascAppId`) are listed in the EAS Submit section of the official eas.json schema reference, which is not part of this page.
- Source modificationDate: September 25, 2026 (fetched 2026-10-17).

## Related

- [Submit to the Google Play Store with EAS Submit](./submit-android.md)
- [Submit to the Apple App Store with EAS Submit](./submit-ios.md)
- [EAS CLI reference](./eas-cli.md)
