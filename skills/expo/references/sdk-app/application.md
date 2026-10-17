---
source: https://docs.expo.dev/versions/v58.0.0/sdk/application/
---

# Application

`expo-application` provides information about the native application's ID, app name, and build version at runtime.

## Signature / Usage

```sh
npx expo install expo-application
```

```ts
import * as Application from 'expo-application';

Application.applicationId; // "com.cocoacasts.scribbles"
await Application.getInstallationTimeAsync();
```

## Options / Props

### Constants

All constants: Android, iOS, tvOS, Web. All are `string | null`; on web they are `null`.

| Name | Type | Description |
| --- | --- | --- |
| `Application.applicationId` | `string \| null` | Android application ID / iOS bundle ID. |
| `Application.applicationName` | `string \| null` | Human-readable app name shown with the icon. `null` if it could not be retrieved. |
| `Application.nativeApplicationVersion` | `string \| null` | Android: `version` in app config. iOS: `CFBundleShortVersionString`. Example `"2.11.0"`. |
| `Application.nativeBuildVersion` | `string \| null` | Android: `android.versionCode`. iOS: `CFBundleVersion` (`ios.buildNumber`). Example `"114"`. |

### Methods

| Name | Platforms | Returns | Description |
| --- | --- | --- | --- |
| `getAndroidId()` | Android | `string` | Value of `Settings.Secure.ANDROID_ID`; may change on factory reset or APK signing key change. Unavailable on iOS and web. |
| `getAppleStoreEnvironmentAsync()` | iOS, tvOS | `Promise<AppleAppStoreEnvironment>` | App Store environment of the running build; unlike `getIosApplicationReleaseTypeAsync` it distinguishes TestFlight from App Store release. In Expo Go reports Expo Go's own environment. |
| `getInstallationTimeAsync()` | Android, iOS, tvOS, Web | `Promise<Date>` | Time the app was installed, not counting updates. Android: `PackageInfo.firstInstallTime`; iOS: `NSFileCreationDate` of the document root; web: `null`. |
| `getInstallReferrerAsync()` | Android | `Promise<string>` | Referrer URL via the Google Play Install Referrer API (may not be a complete absolute URL). |
| `getIosApplicationReleaseTypeAsync()` | iOS | `Promise<ApplicationReleaseType>` | iOS application release type. |
| `getIosIdForVendorAsync()` | iOS | `Promise<string \| null>` | IDFV. May return `nil` (e.g. after restart before unlock); retry later. Changes if all apps from the vendor are uninstalled. |
| `getIosPushNotificationServiceEnvironmentAsync()` | iOS | `Promise<PushNotificationServiceEnvironment>` | `'development'` or `'production'`, or `null` on the simulator. |
| `getLastUpdateTimeAsync()` | Android | `Promise<Date>` | Last time the app was updated from Google Play. |

### Types

| Name | Values |
| --- | --- |
| `AppleAppStoreEnvironment` (iOS, tvOS) | `'production'` (App Store release) \| `'sandbox'` (TestFlight, App Review, development / ad hoc / enterprise-signed) \| `'xcode'` (StoreKit configuration file in Xcode) \| `null` (no verified app transaction or unrecognized) |
| `PushNotificationServiceEnvironment` (iOS) | `'development'` \| `'production'` \| `null` (maps to the `aps-environment` entitlement) |
| `ApplicationReleaseType` enum (iOS) | `UNKNOWN = 0`, `SIMULATOR = 1`, `ENTERPRISE = 2`, `DEVELOPMENT = 3`, `AD_HOC = 4`, `APP_STORE = 5` |

### Error codes

| Code | Description |
| --- | --- |
| `ERR_APPLICATION_PACKAGE_NAME_NOT_FOUND` | Thrown by `getInstallationTimeAsync` and `getLastUpdateTimeAsync` when package information or name could not be retrieved. |
| `ERR_APPLICATION_INSTALL_REFERRER_UNAVAILABLE` | Play Store app does not provide the install referrer API or is not installed (e.g. AVDs without Play Store). |
| `ERR_APPLICATION_INSTALL_REFERRER_CONNECTION` | Could not connect to the Google Play Store. |
| `ERR_APPLICATION_INSTALL_REFERRER_REMOTE_EXCEPTION` | A `RemoteException` after connecting to the Play Store (hosting process likely crashed). |
| `ERR_APPLICATION_INSTALL_REFERRER` | General error for `getInstallReferrerAsync`; `responseCode` is provided. |
| `ERR_APPLICATION_INSTALL_REFERRER_SERVICE_DISCONNECTED` | Connection to the install referrer service was lost. |

## Notes

- Platforms: android, ios, web, tvos, expo-go (included in Expo Go).
- On Android versions lower than 8.0 (API 26), `ANDROID_ID` remains constant for the lifetime of the user's device.
- Source: `sdk-58` branch of `expo/expo` `packages/expo-application`; modificationDate September 15, 2026.

## Related

- [Constants](./constants.md)
- [Expo](./expo.md)
