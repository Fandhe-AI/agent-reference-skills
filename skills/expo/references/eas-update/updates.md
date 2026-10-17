---
source: https://docs.expo.dev/versions/v58.0.0/sdk/updates/
---

# Updates

A library that enables your app to manage remote updates to your application code. It communicates with the configured remote update service to get information about available updates.

## Signature / Usage

```sh
npx expo install expo-updates
```

```js
import * as Updates from 'expo-updates';
```

The library can be configured automatically using EAS Update, or manually when a different remote update service is required or configuration is only specified in native files. The remote service must implement the Expo Updates protocol. Minimum app config: `updates.url` and `runtimeVersion`.

By default, `expo-updates` checks for updates when the app launches and applies a downloaded update the next time the app is restarted. Tune this with `checkAutomatically` and `fallbackToCacheTimeout`.

Example: check for updates manually (first set `checkAutomatically` to `ON_ERROR_RECOVERY` or `NEVER`):

```jsx
import { View, Button } from 'react-native';
import * as Updates from 'expo-updates';

function App() {
  async function onFetchUpdateAsync() {
    try {
      const update = await Updates.checkForUpdateAsync();

      if (update.isAvailable) {
        await Updates.fetchUpdateAsync();
        await Updates.reloadAsync();
      }
    } catch (error) {
      // You can also add an alert() to see the error message in case of an error when fetching updates.
      alert(`Error fetching latest Expo update: ${error}`);
    }
  }

  return (
    <View>
      <Button title="Fetch update" onPress={onFetchUpdateAsync} />
    </View>
  );
}
```

## Options / Props

### Configuration

| App config property | Default | Required? | iOS plist/dictionary key | Android meta-data name | Android Map key |
| --- | --- | --- | --- | --- | --- |
| `updates.enabled` | `true` | ✗ | `EXUpdatesEnabled` | `expo.modules.updates.ENABLED` | `enabled` |
| `updates.url` | (none) | ✓ | `EXUpdatesURL` | `expo.modules.updates.EXPO_UPDATE_URL` | `updateUrl` |
| `updates.requestHeaders` | (none) | ✗ | `EXUpdatesRequestHeaders` | `expo.modules.updates.UPDATES_CONFIGURATION_REQUEST_HEADERS_KEY` | `requestHeaders` |
| `runtimeVersion` | (none) | ✓ | `EXUpdatesRuntimeVersion` | `expo.modules.updates.EXPO_RUNTIME_VERSION` | `runtimeVersion` |
| `updates.checkAutomatically` | `ON_LOAD` | ✗ | `EXUpdatesCheckOnLaunch` | `expo.modules.updates.EXPO_UPDATES_CHECK_ON_LAUNCH` | `checkOnLaunch` |
| `updates.fallbackToCacheTimeout` | `0` | ✗ | `EXUpdatesLaunchWaitMs` | `expo.modules.updates.EXPO_UPDATES_LAUNCH_WAIT_MS` | `launchWaitMs` |
| `updates.useEmbeddedUpdate` | `true` | ✗ | `EXUpdatesHasEmbeddedUpdate` | `expo.modules.updates.HAS_EMBEDDED_UPDATE` | `hasEmbeddedUpdate` |
| `updates.codeSigningCertificate` | (none) | ✗ | `EXUpdatesCodeSigningCertificate` | `expo.modules.updates.CODE_SIGNING_CERTIFICATE` | `codeSigningCertificate` |
| `updates.codeSigningMetadata` | (none) | ✗ | `EXUpdatesCodeSigningMetadata` | `expo.modules.updates.CODE_SIGNING_METADATA` | `codeSigningMetadata` |
| `updates.assetPatternsToBeBundled` | (none) | ✗ | N/A | N/A | N/A |
| `updates.disableAntiBrickingMeasures` | `false` | ✗ | `EXUpdatesDisableAntiBrickingMeasures` | `expo.modules.updates.DISABLE_ANTI_BRICKING_MEASURES` | `disableAntiBrickingMeasures` |
| `updates.enableBsdiffPatchSupport` | `true` | ✗ | `EXUpdatesEnableBsdiffPatchSupport` | `expo.modules.updates.ENABLE_BSDIFF_PATCH_SUPPORT` | `enableBsdiffPatchSupport` |
| `updates.maxUpdatesToKeep` | `2` | ✗ | `EXUpdatesMaxUpdatesToKeep` | `expo.modules.updates.EXPO_UPDATES_MAX_UPDATES_TO_KEEP` | `maxUpdatesToKeep` |

`updates.maxUpdatesToKeep` controls how many updates to keep, including the one currently running. For example, `3` keeps the running update and up to two older updates. Updates that match the manifest filters take priority, with the newest kept first. Cleanup leaves updates from other scopes and updates with the same or a newer commit time than the running update untouched, so the cache can contain more updates than this value.

### Runtime version

Each build includes the native code and configuration present at build time; this unique combination is represented by a string called a runtime version. A remote update targets one runtime version, so only binaries with a matching runtime version can load it. Set it manually as a string, or use a policy:

```json
{
  "expo": {
    "runtimeVersion": {
      "policy": "<policy_name>"
    }
  }
}
```

| Policy | Runtime version derived from |
| --- | --- |
| `appVersion` | The project's `"version"` (for example `"1.0.0"`). Manually update `"version"` on each public release; `autoIncrement` in eas.json can manage versions for Play Store Internal Test Track and TestFlight uploads. |
| `nativeVersion` | `"[version]([buildNumber\|versionCode])"` (for example `"1.0.0(1)"`). Requires manual management of native version numbers between builds; different Android and iOS native versions yield separate runtime versions. |
| `fingerprint` | Automatically calculated hash of the project (via `@expo/fingerprint`), including SDK upgrades or added custom native code. Works for projects with and without custom native code. |

### Native configuration and overriding

Without Continuous Native Generation, options can be set in native files. On Android, they are `meta-data` tags in **AndroidManifest.xml**, and can be set or overridden at runtime using `UpdatesController.overrideConfiguration()`. On iOS, they are keys in **Expo.plist**, and can be overridden by calling `AppController.overrideConfiguration`. In Objective-C++ (for example `AppDelegate.mm`), runtime overriding needs these imports to reference `EXUpdatesAppController`:

```objc
#import "ExpoModulesCore-Swift.h"
#import "EXUpdatesInterface-Swift.h"
#import "EXUpdates-Swift.h"
```

### Constants

All constants: Android, iOS, tvOS.

| Name | Type | Description |
| --- | --- | --- |
| `Updates.channel` | `string \| null` | Channel name of the current build if configured for EAS Update, `null` otherwise. Always `null` in Expo Go and development builds. |
| `Updates.checkAutomatically` | `UpdatesCheckAutomaticallyValue \| null` | Determines if and when `expo-updates` checks for and downloads updates automatically on startup. |
| `Updates.createdAt` | `Date \| null` | Creation time of the currently running update (embedded or downloaded). `null` when `expo-updates` is disabled. |
| `Updates.emergencyLaunchReason` | `string \| null` | If `isEmergencyLaunch` is true, an error message describing what failed during initialization. |
| `Updates.isEmbeddedLaunch` | `boolean` | True if the running update is the one embedded in the build. |
| `Updates.isEmergencyLaunch` | `boolean` | True if the app is launching under the fallback mechanism to the embedded update after newer updates have been downloaded and run (an "emergency launch"). |
| `Updates.isEnabled` | `boolean` | Whether `expo-updates` is enabled. May be false when enabled is false in config, URL is missing or invalid, runtime version or SDK version is missing, or storage access fails during initialization. When false, the embedded update is loaded. |
| `Updates.latestContext` | `UpdatesNativeStateMachineContext` | Native state machine context. |
| `Updates.launchDuration` | `number \| null` | Milliseconds it took to launch. |
| `Updates.manifest` | `Partial<Manifest>` | Manifest of the running update. Empty when `expo-updates` is disabled. |
| `Updates.runtimeVersion` | `string \| null` | Runtime version of the current build. |
| `Updates.updateId` | `string \| null` | UUID (canonical lowercase string) of the running update; `null` when disabled. |

### Hooks

#### `useUpdates()`

Hook that obtains information on available updates and on the currently running update. Returns `UseUpdatesReturnType`.

```tsx
import * as Updates from 'expo-updates';
import { useEffect } from 'react';

const { currentlyRunning, isUpdateAvailable, isUpdatePending } = Updates.useUpdates();

useEffect(() => {
  if (isUpdatePending) {
    // Update has successfully downloaded; apply it now
    Updates.reloadAsync();
  }
}, [isUpdatePending]);
```

`UseUpdatesReturnType` properties: `availableUpdate?` (`UpdateInfo`), `checkError?` (`Error`), `currentlyRunning` (`CurrentlyRunningInfo`), `downloadedUpdate?` (`UpdateInfo`), `downloadError?` (`Error`), `downloadProgress?` (`number`, 0 to 1 while `isDownloading`), `isChecking` (`boolean`), `isDownloading` (`boolean`), `isRestarting` (`boolean`), `isStartupProcedureRunning` (`boolean`), `isUpdateAvailable` (`boolean`), `isUpdatePending` (`boolean`), `lastCheckForUpdateTimeSinceRestart?` (`Date`), `restartCount` (`number`).

### Methods

All methods: Android, iOS, tvOS.

| Method | Returns | Description |
| --- | --- | --- |
| `Updates.checkForUpdateAsync()` | `Promise<UpdateCheckResult>` | Checks the server for a newly deployed update without downloading it. Rejected in development mode, Expo Go, or when `expo-updates` is not enabled. Avoid polling in a frequent loop; updates served by Expo may be rate limited. |
| `Updates.fetchUpdateAsync()` | `Promise<UpdateFetchResult>` | Downloads the most recently deployed update to local storage. Call `reloadAsync()` afterwards to apply; otherwise applied on the next cold start. Rejected in development mode, Expo Go, or when disabled. |
| `Updates.reloadAsync(options)` | `Promise<void>` | Reloads the app using the most recently downloaded version. `options` is optional: `{ reloadScreenOptions: ReloadScreenOptions }`. Unlike `Expo.reloadAppAsync()`, it also changes the loaded JavaScript bundle. Avoid meaningful logic after `await Updates.reloadAsync()`. |
| `Updates.readLogEntriesAsync(maxAge)` | `Promise<UpdatesLogEntry[]>` | Retrieves recent log entries. `maxAge` (optional `number`, default `3600000` ms). |
| `Updates.clearLogEntriesAsync()` | `Promise<void>` | Clears log entries. For now does nothing on the client. |
| `Updates.getExtraParamsAsync()` | `Promise<Record<string, string>>` | Retrieves the current extra params. |
| `Updates.setExtraParamAsync(key, value)` | `Promise<void>` | `key: string`, `value: string \| null \| undefined`. Sets an extra param (unsets if null). Sent as an Expo Structured Field Value Dictionary in the `Expo-Extra-Params` header of update requests. |
| `Updates.setUpdateRequestHeadersOverride(requestHeaders)` | `void` | `requestHeaders: Record<string, string> \| null`. Overrides request headers at runtime. |
| `Updates.setUpdateURLAndRequestHeadersOverride(configOverride)` | `void` | `configOverride: { requestHeaders: Record<string, string>, updateUrl: string } \| null`. Requires `disableAntiBrickingMeasures` set to `true` in app.json. |

`ExpoUpdatesModule` (class extends `NativeModule<UpdatesEvents>`) also exposes `hideReloadScreen: () => Promise<void>`, `showReloadScreen: (options?: ReloadScreenOptions | null) => Promise<void>`, `setUpdateRequestHeadersOverride` and `setUpdateURLAndRequestHeadersOverride`.

### Types

| Type | Shape |
| --- | --- |
| `CurrentlyRunningInfo` | `channel?`, `createdAt?`, `emergencyLaunchReason` (`string \| null`), `isEmbeddedLaunch`, `isEmergencyLaunch`, `launchDuration?`, `manifest?`, `runtimeVersion?`, `updateId?` |
| `Manifest` | union: `ExpoUpdatesManifest \| EmbeddedManifest` |
| `UpdateCheckResult` | union: `UpdateCheckResultRollBack \| UpdateCheckResultAvailable \| UpdateCheckResultNotAvailable` |
| `UpdateCheckResultAvailable` | `isAvailable: true`, `isRollBackToEmbedded: false`, `manifest: Manifest`, `reason: undefined` |
| `UpdateCheckResultNotAvailable` | `isAvailable: false`, `isRollBackToEmbedded: false`, `manifest: undefined`, `reason: UpdateCheckResultNotAvailableReason` |
| `UpdateCheckResultRollBack` | `isAvailable: false`, `isRollBackToEmbedded: true`, `manifest: undefined`, `reason: undefined` |
| `UpdateFetchResult` | union: `UpdateFetchResultSuccess \| UpdateFetchResultFailure \| UpdateFetchResultRollBackToEmbedded` |
| `UpdateFetchResultSuccess` | `isNew: true`, `isRollBackToEmbedded: false`, `manifest: Manifest` |
| `UpdateFetchResultFailure` | `isNew: false`, `isRollBackToEmbedded: false`, `manifest: undefined` |
| `UpdateFetchResultRollBackToEmbedded` | `isNew: false`, `isRollBackToEmbedded: true`, `manifest: undefined` |
| `UpdateInfo` | union: `UpdateInfoNew \| UpdateInfoRollback` |
| `UpdateInfoNew` | `createdAt: Date`, `manifest: Manifest`, `type: UpdateInfoType.NEW`, `updateId: string` |
| `UpdateInfoRollback` | `createdAt: Date`, `manifest: undefined`, `type: UpdateInfoType.ROLLBACK`, `updateId: undefined` |
| `UpdatesCheckAutomaticallyNativeValue` | `'ALWAYS' \| 'ERROR_RECOVERY_ONLY' \| 'NEVER' \| 'WIFI_ONLY'` |
| `UpdatesLogEntry` | `assetId?`, `code: UpdatesLogEntryCode`, `level: UpdatesLogEntryLevel`, `message: string`, `stacktrace?: string[]`, `timestamp: number`, `updateId?` |
| `ReloadScreenOptions` | `backgroundColor?` (default `'#ffffff'`), `fade?` (default `false`), `image?` (`string \| number \| ReloadScreenImageSource`), `imageFullScreen?` (default `false`), `imageResizeMode?` (`'cover' \| 'contain' \| 'center' \| 'stretch'`, default `'contain'`), `spinner?` (`{ color: string, enabled: boolean, size: 'small' \| 'medium' \| 'large' }`) |
| `ReloadScreenImageSource` | `height?`, `scale?`, `url?`, `width?` |

#### Enums

| Enum | Values |
| --- | --- |
| `UpdateCheckResultNotAvailableReason` | `NO_UPDATE_AVAILABLE_ON_SERVER = "noUpdateAvailableOnServer"`, `ROLLBACK_NO_EMBEDDED = "rollbackNoEmbeddedConfiguration"`, `ROLLBACK_REJECTED_BY_SELECTION_POLICY = "rollbackRejectedBySelectionPolicy"`, `UPDATE_PREVIOUSLY_FAILED = "updatePreviouslyFailed"`, `UPDATE_REJECTED_BY_SELECTION_POLICY = "updateRejectedBySelectionPolicy"` |
| `UpdateInfoType` | `NEW = "new"`, `ROLLBACK = "rollback"` |
| `UpdatesCheckAutomaticallyValue` | `NEVER` (automatic checks off; use the JS API), `ON_ERROR_RECOVERY` (only after an error recovery), `ON_LOAD` (whenever the app is loaded; default), `WIFI_ONLY` (on startup with a Wi-Fi connection) |
| `UpdatesLogEntryCode` | `ASSETS_FAILED_TO_LOAD = "AssetsFailedToLoad"`, `INITIALIZATION_ERROR = "InitializationError"`, `JS_RUNTIME_ERROR = "JSRuntimeError"`, `NONE = "None"`, `NO_UPDATES_AVAILABLE = "NoUpdatesAvailable"`, `UNKNOWN = "Unknown"`, `UPDATE_ASSETS_NOT_AVAILABLE = "UpdateAssetsNotAvailable"`, `UPDATE_CODE_SIGNING_ERROR = "UpdateCodeSigningError"`, `UPDATE_FAILED_TO_LOAD = "UpdateFailedToLoad"`, `UPDATE_HAS_INVALID_SIGNATURE = "UpdateHasInvalidSignature"`, `UPDATE_SERVER_UNREACHABLE = "UpdateServerUnreachable"` |
| `UpdatesLogEntryLevel` | `DEBUG = "debug"`, `ERROR = "error"`, `FATAL = "fatal"`, `INFO = "info"`, `TRACE = "trace"`, `WARN = "warn"` |

### Error codes

| Code | Description |
| --- | --- |
| `ERR_UPDATES_DISABLED` | A method call was attempted when the Updates library was disabled, or the application was running in development mode |
| `ERR_UPDATES_RELOAD` | An error occurred when trying to reload the application and it could not be reloaded. For existing React Native projects, double-check the setup steps. |
| `ERR_UPDATES_CHECK` | An unexpected error occurred when trying to check for new updates. |
| `ERR_UPDATES_FETCH` | An unexpected error occurred when trying to fetch a new update. |
| `ERR_UPDATES_READ_LOGS` | An unexpected error occurred when trying to read log entries. |
| `ERR_NOT_AVAILABLE_IN_DEV_CLIENT` | A method is not available when running in a development build. A release build should be used to test this method. |

## Notes

- Platforms (frontmatter): Android, iOS, tvOS, Expo Go. Source code: `https://github.com/expo/expo/tree/sdk-58/packages/expo-updates`.
- Most methods and constants can be used or tested only in release builds; in debug builds the latest JavaScript always loads from a development server. A debug build with release-like updates behavior can be created (see [Debugging](./debug.md)).
- In a development build or Expo Go, `eas update` content can be browsed to simulate an update, but most of the Updates API is unavailable. Expo Go supports only updates using Expo Go-compatible libraries. The full API is available in a release build (`.apk`, simulator build, `npx expo run:android --variant release`, or `npx expo run:ios --configuration Release`).
- The `UpdatesModuleInterface` interface (common interface for native module implementations on android, ios, web) and `UpdatesEvents` (`Expo.nativeUpdatesStateChangeEvent`) are documented in the source but not reproduced here.
- Source modificationDate: October 02, 2026 (SDK 58, `/versions/v58.0.0/`; fetched 2026-10-17).

## Related

- [Get started with EAS Update](./getting-started.md)
- [Runtime versions and updates](./runtime-versions.md)
- [Downloading updates](./download-updates.md)
- [Override update configuration at runtime](./override.md)
- [Error recovery](./error-recovery.md)
