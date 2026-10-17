---
source: https://docs.expo.dev/submit/android/
---

# Submit to the Google Play Store with EAS Submit

EAS Submit is the recommended way to upload your Android app to the Google Play Store. `eas submit` works the same on your machine and inside CI/CD.

## Signature / Usage

```sh
# Build a production .aab, then submit it
eas build --platform android --profile production
eas submit --platform android

# Or build and submit in one step
eas build --platform android --auto-submit
```

Prerequisite in app config:

```json
{
  "android": {
    "package": "com.yourcompany.yourapp"
  }
}
```

Automate with EAS Workflows (`.eas/workflows/submit-android.yml`):

```yaml
name: Submit Android

on:
  push:
    branches: ['main']

jobs:
  build_android:
    name: Build Android app
    type: build
    params:
      platform: android
      profile: production

  submit_android:
    name: Submit to Google Play Store
    needs: [build_android]
    type: submit
    params:
      profile: production
      build_id: ${{ needs.build_android.outputs.build_id }}
```

Trigger it manually with `eas workflow:run submit-android.yml`.

## Notes

- Prerequisites: a Google Play Developer account, an app created in Google Play Console, a Google Service Account key uploaded to EAS, an `android.package` in app config, and EAS CLI logged in.
- Upload the key via the EAS dashboard (Credentials > Android > Application identifier > Service credentials > Google service account key for EAS Submit) or via `eas credentials --platform android` (select the production profile, then Google Service Account > Manage your Google Service Account Key for Play Store Submissions). One key is assigned per Android application identifier and can be reused for other apps in the account.
- A production `.aab` is required. The default `production` profile produces an `.aab`; a profile only produces an `.apk` when `android.buildType` is `apk`, and that cannot be submitted to Google Play.
- First-time submission works out of the box and creates the first release on the internal testing track. The app stays in draft status in Play Console until the store listing and setup tasks are completed. Set `releaseStatus` to `draft` in the submit profile to upload without rolling out.
- Other CI/CD services: set `EXPO_TOKEN` (personal access token) so `eas submit --platform android --profile production` can run non-interactively.
- With `--non-interactive`, `eas submit` and `eas build --auto-submit` cannot prompt for a Google Service Account key. Unless the submit profile sets `serviceAccountKeyPath`, they use the key assigned to the app; if none is assigned they fail with `Google Service Account Keys cannot be set up in --non-interactive mode.`
- Source modificationDate not recorded in the saved original; fetched 2026-10-17.

## Related

- [Configure EAS Submit with eas.json](./submit-eas-json.md)
- [Submit to the Apple App Store with EAS Submit](./submit-ios.md)
- [Syntax for EAS Workflows](./workflows-syntax.md)
- [EAS CLI reference](./eas-cli.md)
