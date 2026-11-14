---
source: https://docs.expo.dev/submit/ios/
---

# Submit to the Apple App Store with Expo Submit

Expo Submit is the recommended way to upload your iOS app to the Apple App Store. It works on macOS, Linux, and Windows, so a Mac is not needed.

## Signature / Usage

```sh
# Build a production .ipa, then submit it
eas build --platform ios --profile production
eas submit --platform ios

# Or build and submit in one step
eas build --platform ios --auto-submit
```

Submit profile in `eas.json`:

```json
{
  "submit": {
    "production": {
      "ios": {
        "ascAppId": "your-app-store-connect-app-id"
      }
    }
  }
}
```

Bundle identifier in app config:

```json
{
  "ios": {
    "bundleIdentifier": "com.yourcompany.yourapp"
  }
}
```

Automate with Expo Workflows (`.eas/workflows/submit-ios.yml`):

```yaml
name: Submit iOS

on:
  push:
    branches: ['main']

jobs:
  build_ios:
    name: Build iOS app
    type: build
    params:
      platform: ios
      profile: production

  submit_ios:
    name: Submit to TestFlight
    needs: [build_ios]
    type: testflight
    params:
      build_id: ${{ needs.build_ios.outputs.build_id }}
```

## Notes

- A paid Apple Developer account is required. The first `eas submit` run prompts for your Apple ID and uploads the binary to App Store Connect; the build appears in TestFlight after processing (usually 10-15 minutes). Release to production by submitting the build for App Review in App Store Connect.
- Finding `ascAppId`: App Store Connect > Apps > your app > App Store tab > General > App Information; it is the **Apple ID** under General Information.
- For Expo Workflows, configure an App Store Connect API Key: run `eas credentials --platform ios`, select the `production` build profile, log in, choose "App Store Connect: Manage your API Key" > "Set up your project to use an API Key for Expo Submit".
- Bring your own credentials: App Store Connect API Key via `ascApiKeyPath`, `ascApiKeyIssuerId`, and `ascApiKeyId` in `eas.json`; or an app-specific password via the `EXPO_APPLE_APP_SPECIFIC_PASSWORD` environment variable plus the `appleId` field in `eas.json`.
- Other CI/CD: set `EXPO_TOKEN` (personal access token) and run `eas submit --platform ios --profile production`. With `--non-interactive`, `eas submit` and `eas build --auto-submit` use the key assigned to the app; if none, they fail with `App Store Connect API Keys cannot be set up in --non-interactive mode.` The submit profile also needs `ascAppId` in non-interactive mode.
- Manual fallback: upload from a Mac with Xcode (see the official "Manually submit an iOS app with Xcode" page, not included here).
- Source modificationDate: October 12, 2026 (fetched 2026-10-17).
- Source: https://docs.expo.dev/submit/ios/ (docs/pages/submit/ios.mdx at tag expo@58.0.25).

## Related

- [Distribute an iOS app with TestFlight](./testflight.md)
- [Configure Expo Submit with eas.json](./submit-eas-json.md)
- [Submit to the Google Play Store with Expo Submit](./submit-android.md)
- [Pre-packaged jobs in Expo Workflows](./workflows-pre-packaged-jobs.md)
