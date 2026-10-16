---
source: https://docs.expo.dev/build/internal-distribution/
---

# Internal distribution

Learn how EAS Build provides shareable URLs for your builds with your team for internal distribution.

## Signature / Usage

Set `"distribution": "internal"` on a build profile in **eas.json**. EAS Build then provides a URL that lets testers install the app directly to their device.

```json
{
  "build": {
    "preview": {
      "distribution": "internal"
    }
  }
}
```

Effects of `"distribution": "internal"`:

- **Android**: the default behavior for `gradleCommand` changes to generate an APK instead of an AAB. A custom `gradleCommand` must produce an APK or it won't be directly installable. EAS Build generates a new Android keystore for signing the APK, or uses an existing one if the package name is the same as your development build.
- **iOS**: builds use either ad hoc or enterprise provisioning. With ad hoc, EAS Build generates a provisioning profile with an allow-list of device UDIDs, and only devices in the list at build time can install it. Add a device with `eas device:create` and create a new build.
- By default, internal distribution build URLs are available to anybody with the URL, each identified by a 32 character UUID. To require sign-in to an authorized Expo account, disable the **Unauthenticated access to internal builds** option in project settings.

### Automation on CI

Run internal distribution builds non-interactively with `--non-interactive`. For iOS ad hoc builds, `eas build --non-interactive` reuses a valid provisioning profile without updating its device list; the app may not install on devices registered after the profile was last updated. Pass `--refresh-ad-hoc-provisioning-profile` (requires EAS CLI 19.1.0 or later) to update the Expo-managed ad hoc provisioning profile before the build.

```sh
eas build --platform ios --profile preview --non-interactive --refresh-ad-hoc-provisioning-profile
```

The profile must set `"distribution": "internal"` and use credentials managed by EAS. You need at least one device from `eas device:create` and an App Store Connect API key in CI through environment variables (`EXPO_ASC_API_KEY_PATH`, `EXPO_ASC_KEY_ID`, `EXPO_ASC_ISSUER_ID`) or a key stored in EAS for submissions on the project. For EAS Workflows, set `refresh_ad_hoc_provisioning_profile: true` in the build job's `params`.

### Managing devices

```sh
# List devices registered for ad hoc provisioning
eas device:list

# Delete devices from your Expo account, optionally disable them on the Apple Developer Portal
eas device:delete

# Rename devices on Expo and the Apple Developer Portal
eas device:rename
```

## Notes

- Distribution mechanisms: Android APK (installable over USB, download, email or chat; AAB must be distributed through the Play Store). iOS Ad Hoc (paid Apple Developer account; at most 100 iPhones per year; requires each device UDID; adding a device requires a rebuild or re-signing). iOS Enterprise (unlimited devices, no UDIDs, requires Apple Developer Enterprise Program membership, often distributed via MDM).
- Devices registered with Expo appear on the Apple Developer Portal only after they are used to generate a provisioning profile for a new internal build, or to re-sign with `eas build:resign`. On new or recently renewed Apple Developer Program memberships, Apple can take up to 24-72 hours to process a newly registered device, so the first build or re-sign including it may fail; wait and build again.
- Disabled devices still count against Apple's limit of 100 devices for ad hoc distribution per app.
- Devices added via the website URL/QR code display their UDID by default; rename them with `eas device:rename`.
- Source modificationDate: July 28, 2026 (fetched 2026-10-17).

## Related

- [Build APKs for Android Emulators and devices](./apk.md)
- [App credentials](./app-credentials.md)
- [Trigger builds from CI](./building-on-ci.md)
- [Configure EAS Build with eas.json](./build-eas-json.md)
