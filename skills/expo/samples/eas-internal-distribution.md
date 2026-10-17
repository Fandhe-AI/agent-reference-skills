---
source: https://docs.expo.dev/tutorial/eas/internal-distribution-builds/
---

# Internal Distribution Build

Create a shareable preview build (APK / ad hoc IPA) that runs without a development server.

```json eas.json
{
  "build": {
    "preview": {
      "distribution": "internal"
    }
  }
}
```

```sh
# Android
eas build --platform android --profile preview

# iOS: register test devices (ad hoc provisioning), then build
eas device:create
eas build --platform ios --profile preview
```

## Notes

- `distribution: "internal"` produces **.apk** for Android and **.ipa** for iOS, shareable through a build page link or Expo Orbit.
- iOS ad hoc provisioning only installs on devices whose UDID is registered; only builds created after registration work on a newly added device.
- A newly registered device on a new or recently renewed Apple Developer Program membership may take Apple up to 24-72 hours to process; rerun the build if it fails right after registration.
- `eas build:resign` can re-sign an existing iOS **.ipa** with a new ad hoc provisioning profile without a full rebuild.
- To distribute both enterprise and App Store builds, use distinct bundle identifiers (see the app variants sample).
- Source: https://docs.expo.dev/tutorial/eas/internal-distribution-builds/ (fetched 2026-10-17).
