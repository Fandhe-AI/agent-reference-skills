---
source: https://docs.expo.dev/versions/v58.0.0/sdk/constants/
---

# Constants

`expo-constants` provides system information that remains constant throughout the lifetime of the app's installation.

## Signature / Usage

```sh
npx expo install expo-constants
```

```js
import Constants from 'expo-constants';
```

## Options / Props

### `NativeConstants` properties (on `Constants`)

| Name | Type | Description |
| --- | --- | --- |
| `appOwnership` | `AppOwnership \| null` | Deprecated: use `Constants.executionEnvironment`. `expo` in Expo Go, otherwise `null`. |
| `debugMode` | `boolean` | `true` when running in debug mode (`__DEV__`). |
| `deviceName` (optional) | `string` | Human-readable name for the device type. |
| `deviceYearClass` | `number \| null` | Deprecated: moved to expo-device `Device.deviceYearClass`. |
| `easConfig` | `EASConfig \| null` | Standard EAS config object populated when using EAS. |
| `executionEnvironment` | `ExecutionEnvironment` | Current execution environment. |
| `experienceUrl` | `string` | - |
| `expoConfig` | `ExpoConfig & { hostUri: string } \| null` | Config object defined in app.json / app.config.js. |
| `expoGoConfig` | `ExpoGoConfig \| null` | Expo Go config object populated when running in Expo Go. |
| `expoRuntimeVersion` | `string \| null` | Nullable only on the web. |
| `expoVersion` | `string \| null` | Version of the Expo Go app; `null` in existing React Native projects and on web. |
| `getWebViewUserAgentAsync` | `() => Promise<string \| null>` | User agent string a web view on this device would send (likely not the one used in JS `fetch`). |
| `intentUri` (optional) | `string` | - |
| `isDetached` (optional) | `boolean` | - |
| `isHeadless` | `boolean` | `true` when running in headless mode. |
| `linkingUri` | `string` | - |
| `manifest2` | `ExpoUpdatesManifest \| null` | Manifest for apps using modern Expo Updates from a remote source (e.g. EAS Update). Use `Constants.expoConfig` to access the Expo config. |
| `platform` (optional) | `PlatformManifest` | Platform manifest object; distinct from manifest and manifest2. |
| `sessionId` | `string` | Unique to the current session; differs across apps and launches. |
| `statusBarHeight` | `number` | Default status bar height; does not factor in location tracking or active phone call. |
| `systemFonts` | `string[]` | System font names available on the device. |
| `systemVersion` (optional) | `number` | - |

### Enums

| Name | Values |
| --- | --- |
| `ExecutionEnvironment` | `Bare = "bare"` (native directories maintained directly), `Standalone = "standalone"` (production/release build with or without EAS Build), `StoreClient = "storeClient"` (Expo Go or a development build with `expo-dev-client`) |
| `UserInterfaceIdiom` | `Desktop = "desktop"`, `Handset = "handset"`, `Tablet = "tablet"`, `TV = "tv"`, `Unsupported = "unsupported"` (CarPlay shows as `unsupported`) |
| `AppOwnership` (deprecated) | `Expo = "expo"` (running inside Expo Go) |

### Types

| Name | Description |
| --- | --- |
| `PlatformManifest` | `Record<string, any>` plus optional `android: AndroidManifest`, `detach: { scheme: string }`, `developer: string`, `hostUri: string`, `ios: IOSManifest`, `scheme: string`, `web: WebManifest`. |
| `AndroidManifest` (Android) | `Record<string, any>` plus `versionCode: number` (deprecated: use expo-application `Application.nativeBuildVersion`; `null` in Expo Go). |
| `IOSManifest` (iOS) | `buildNumber: string \| null` (`CFBundleVersion`, never changes for a given binary; `null` in Expo Go); deprecated `model` (use `Device.modelName`), `platform` (use `Device.modelId`), `systemVersion` (use `Device.osVersion`), `userInterfaceIdiom` (use `Device.getDeviceTypeAsync()`). |
| `WebManifest` (Web) | `Record<string, any>` |
| `Manifest`, `ManifestAsset`, `ManifestExtra`, `EASConfig`, `ExpoGoConfig`, `ExpoGoPackagerOpts`, `ClientScopingConfig` | Aliases of types documented on the Manifests page (`ExpoUpdatesManifest`, `ManifestAsset`, `ManifestExtra`, `EASConfig`, `ExpoGoConfig`, `ExpoGoPackagerOpts`, `ClientScopingConfig`); not collected in this skill. |

## Notes

- Platforms: android, ios, tvos, web, expo-go.
- Deprecated members and their replacements are as listed above (`appOwnership`, `deviceYearClass`, `AndroidManifest.versionCode`, `IOSManifest.*`).
- Source: `sdk-58` branch `packages/expo-constants`; modificationDate September 15, 2026.

## Related

- [Application](./application.md)
- [Expo](./expo.md)
