---
source: https://docs.expo.dev/guides/permissions/
---

# Permissions

Apps must request user permission for sensitive data (location, contacts, media library). In standalone and development builds, permissions need native build-time configuration before runtime JavaScript requests; this is not required in Expo Go.

## Signature / Usage

Android (`android.permissions` / `android.blockedPermissions`):

```json
{
  "android": {
    "permissions": ["android.permission.SCHEDULE_EXACT_ALARM"]
  }
}
```

```json
{
  "android": {
    "blockedPermissions": ["android.permission.RECORD_AUDIO"]
  }
}
```

iOS (`ios.infoPlist`):

```json
{
  "ios": {
    "infoPlist": {
      "NSCameraUsageDescription": "This app uses the camera to scan barcodes on event tickets."
    }
  }
}
```

Via a library's config plugin:

```json
{
  "plugins": [
    [
      "expo-media-library",
      {
        "photosPermission": "Allow $(PRODUCT_NAME) to access your photos.",
        "savePhotosPermission": "Allow $(PRODUCT_NAME) to save photos."
      }
    ]
  ]
}
```

## Notes

- Misconfigured or unexplained native permissions may get the app rejected or pulled from the stores.
- Android: most permissions are added automatically by libraries (config plugins or package-level **AndroidManifest.xml**). Use `android.permissions` only for extras. The only way to remove permissions added by package-level manifests is `android.blockedPermissions` with the full permission name (e.g. removing audio recording added by `expo-camera`). Dangerous / signature permissions without valid reasons may be rejected by Google.
- Existing React Native app (Android): add `tools:node="remove"` to the `<uses-permission>` tag, and define `xmlns:tools="http://schemas.android.com/tools"` on `<manifest>`:

```xml
<manifest xmlns:tools="http://schemas.android.com/tools">
  <uses-permission tools:node="remove" android:name="android.permission.ACCESS_FINE_LOCATION" />
</manifest>
```

- iOS: most packages provide boilerplate reasons via config plugins; tailor them to your use case for App Store acceptance. **Info.plist** changes cannot be updated over-the-air; they are deployed only with a new native binary (e.g. `eas build`). Existing React Native app: edit **Info.plist** directly (Xcode recommended).
- Web: permissions such as Camera and Location can only be requested from a secure context (`https://` or `http://localhost`).
- Resetting permissions: OS-level restriction prevents asking for the same permission more than once; uninstall and reinstall the native app to test flows. In Expo Go, delete and reinstall by running `npx expo start` and pressing I or A in the terminal UI.
- Source modificationDate: July 28, 2026 (unversioned guide, fetched 2026-10-17).

## Related

- [app.json / app.config.js](./app-config.md)
- [Privacy manifests](./apple-privacy.md)
- [Introduction to config plugins](./config-plugins-introduction.md)
