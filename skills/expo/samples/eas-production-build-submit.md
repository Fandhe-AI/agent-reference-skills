---
source: https://docs.expo.dev/tutorial/eas/android-production-build/
---

# Production Build and Store Submission

Auto-increment app versions, build a production binary, and submit it to Google Play or App Store Connect with `eas submit`.

```json eas.json
{
  "cli": {
    "appVersionSource": "remote"
  },
  "build": {
    "production": {
      "autoIncrement": true
    }
  },
  "submit": {
    "production": {
      "android": {
        "track": "internal"
      }
    }
  }
}
```

```sh
# Sync existing store versions to EAS (only for apps already published)
eas build:version:set

# Android (.aab) and iOS production builds use the default production profile
eas build --platform android
eas build --platform ios

# Submit the latest build
eas submit --platform android
eas submit --platform ios

# Build and submit in one step
eas build --platform android --auto-submit
eas build --platform ios --auto-submit
```

## Notes

- `cli.appVersionSource: "remote"` plus `build.production.autoIncrement: true` auto-increments `versionCode` (Android) and `buildNumber` (iOS); the user-facing `version` in app config is not managed by EAS.
- Set `submit.production.android.track` to `internal` (default) or `production` to choose the Google Play track; a Google Service Account key must be added to the project credentials for automated submissions.
- For iOS, `eas submit` uploads to TestFlight; `--auto-submit` does not submit for App Store review, so promote the build manually.
- The first iOS build may prompt about encryption and adds `ios.infoPlist.ITSAppUsesNonExemptEncryption: false` to app config if the app only uses standard/exempt encryption.
- Production profile is the default, so `--profile production` is not required.
- Sources (fetched 2026-10-17): https://docs.expo.dev/tutorial/eas/android-production-build/ , https://docs.expo.dev/tutorial/eas/ios-production-build/ , https://docs.expo.dev/tutorial/eas/manage-app-versions/
