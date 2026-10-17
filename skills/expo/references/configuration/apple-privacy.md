---
source: https://docs.expo.dev/guides/apple-privacy/
---

# Privacy manifests

Configure iOS privacy manifests (**PrivacyInfo.xcprivacy**) to declare why the app includes native code that calls "required reason" APIs.

## Signature / Usage

Set the `privacyManifests` field under `expo.ios` in the app config:

```json
{
  "expo": {
    "name": "My App",
    "slug": "my-app",
    "ios": {
      "privacyManifests": {
        "NSPrivacyAccessedAPITypes": [
          {
            "NSPrivacyAccessedAPIType": "NSPrivacyAccessedAPICategoryUserDefaults",
            "NSPrivacyAccessedAPITypeReasons": ["CA92.1"]
          }
        ]
      }
    }
  }
}
```

## Notes

- The listed APIs currently include UserDefaults, file timestamp, system boot time, disk space, and active keyboard. Apple considers it an open list that can be expanded.
- The guide states the information is still in development and may change due to new tools or new Apple requirements.
- Update Expo SDK libraries to the latest versions for your SDK with `npx expo install --fix`.
- Apple does not correctly parse all **PrivacyInfo** files in static CocoaPods dependencies (Expo SDK packages, ecosystem libraries). You may need to include their required reasons in your app's **PrivacyInfo.xcprivacy** or in the app config.
- Expo SDK packages that use required-reason APIs ship a **PrivacyInfo** file in the package directory (example: `expo-application`'s `ios/PrivacyInfo.xcprivacy`). For third-party libraries, check `node_modules/package_name/ios` for **PrivacyInfo.xcprivacy** and copy its `NSPrivacyAccessedAPITypes` / `NSPrivacyAccessedAPITypeReasons` values.
- Alternatively wait for Apple's notification email after submitting a build, then add the listed reasons (to **PrivacyInfo.xcprivacy** if not using CNG, otherwise to the app config).
- Existing React Native app: create **PrivacyInfo.xcprivacy** in Xcode and add it to the iOS app target.
- Test by building and submitting to App Store review or TestFlight external review; Apple emails within minutes if reasons are missing.
- Source modificationDate: July 29, 2026 (unversioned guide, fetched 2026-10-17).

## Related

- [app.json / app.config.js](./app-config.md)
- [Permissions](./permissions.md)
