---
source: https://docs.expo.dev/versions/v58.0.0/sdk/securestore/
---

# SecureStore

`expo-secure-store` encrypts and securely stores key-value pairs locally on the device. Each Expo project has a separate storage system with no access to other projects' storage.

## Signature / Usage

```sh
npx expo install expo-secure-store
```

```jsx
import * as SecureStore from 'expo-secure-store';

async function save(key, value) {
  await SecureStore.setItemAsync(key, value);
}

async function getValueFor(key) {
  let result = await SecureStore.getItemAsync(key);
  if (result) {
    alert("🔐 Here's your value 🔐 \n" + result);
  } else {
    alert('No values stored under that key.');
  }
}
```

Config plugin:

```json
{
  "expo": {
    "plugins": [
      [
        "expo-secure-store",
        {
          "configureAndroidBackup": true,
          "faceIDPermission": "Allow $(PRODUCT_NAME) to access your Face ID biometric data."
        }
      ]
    ]
  }
}
```

## Options / Props

### Config plugin properties

| Name | Default | Description |
| --- | --- | --- |
| `configureAndroidBackup` | `true` | Only for: Android. Whether to configure automatic Android backup to work correctly with `expo-secure-store`. |
| `faceIDPermission` | `"Allow $(PRODUCT_NAME) to access your Face ID biometric data."` | Only for: iOS. Sets the `NSFaceIDUsageDescription` message. |

### Methods

| Name | Parameters | Returns | Platforms | Description |
| --- | --- | --- | --- | --- |
| `SecureStore.canUseBiometricAuthentication()` | — | `boolean` | Android, iOS | `true` if the device supports biometric authentication and the enrolled method is sufficiently secure; always `false` on tvOS. |
| `SecureStore.deleteItemAsync(key, options)` | `key: string`, `options?: SecureStoreOptions` (default `{}`) | `Promise<void>` | Android, iOS, tvOS | Rejects if the value can't be deleted. |
| `SecureStore.getItem(key, options)` | `key: string`, `options?: SecureStoreOptions` | `string \| null` | Android, iOS, tvOS | Synchronous read. Blocks the JS thread (with `requireAuthentication: true` the app is not interactive until the user authenticates). `null` if no entry or the key was invalidated. |
| `SecureStore.getItemAsync(key, options)` | `key: string`, `options?: SecureStoreOptions` | `Promise<string \| null>` | Android, iOS, tvOS | Resolves `null` if no entry or the key was invalidated; rejects on retrieval errors. |
| `SecureStore.isAvailableAsync()` | — | `Promise<boolean>` | Android, iOS, tvOS | Whether the API is enabled on the device (does not check app permissions). Currently resolves `true` on Android and iOS only. |
| `SecureStore.setItem(key, value, options)` | `key: string`, `value: string`, `options?: SecureStoreOptions` | `void` | Android, iOS, tvOS | Synchronous store; blocks the JS thread when `requireAuthentication` is `true`. |
| `SecureStore.setItemAsync(key, value, options)` | `key: string`, `value: string`, `options?: SecureStoreOptions` | `Promise<void>` | Android, iOS, tvOS | Rejects if the value cannot be stored. Keys may contain alphanumeric characters, `.`, `-`, and `_`. |

### SecureStoreOptions

| Property | Type | Description |
| --- | --- | --- |
| `accessGroup` | `string` | iOS. Access group the entry belongs to. |
| `authenticationPrompt` | `string` | Custom message shown while `requireAuthentication` is on. |
| `keychainAccessible` | `KeychainAccessibilityConstant` | iOS. When the entry is accessible (`kSecAttrAccessible`). Passing it when overwriting updates accessibility; omitting keeps the previous one. Default: `SecureStore.WHEN_UNLOCKED`. |
| `keychainService` | `string` | Android: equivalent of the public/private key pair `Alias`. iOS: the item's service (`kSecAttrService`). If set when storing, it is required to later fetch the value. |
| `requireAuthentication` | `boolean` | Require device user authentication when accessing data. Android: equivalent to `setUserAuthenticationRequired(true)` (API 23), required for all operations. iOS: equivalent to `biometryCurrentSet`; prompts only when reading or updating an existing value; full functionality only with a freshly generated key (does not work with the `keychainService` value used for non-authenticated operations). Not supported in Expo Go when biometric authentication is available (missing `NSFaceIDUsageDescription`). Requires a real device for testing. |
| `requireConfirmation` | `boolean` | Android. Hint to require user confirmation after authentication; may be ignored by the system. Defaults to `true`. Only used when `requireAuthentication` is enabled. |

### KeychainAccessibilityConstant constants

Type `number`, available on Android, iOS, tvOS.

| Constant | Description |
| --- | --- |
| `SecureStore.AFTER_FIRST_UNLOCK` | Not accessible after a restart until the device has been unlocked once. |
| `SecureStore.AFTER_FIRST_UNLOCK_THIS_DEVICE_ONLY` | Like `AFTER_FIRST_UNLOCK`, but not migrated to a new device from a backup. Deprecated in the source: use a level providing some user protection such as `AFTER_FIRST_UNLOCK`. |
| `SecureStore.ALWAYS` | Always accessible regardless of lock state (least secure). Deprecated: use e.g. `AFTER_FIRST_UNLOCK_THIS_DEVICE_ONLY`. |
| `SecureStore.ALWAYS_THIS_DEVICE_ONLY` | Like `ALWAYS`, but not migrated to a new device. |
| `SecureStore.WHEN_PASSCODE_SET_THIS_DEVICE_ONLY` | Like `WHEN_UNLOCKED_THIS_DEVICE_ONLY`, but a passcode must be set; removing it deletes the entry. |
| `SecureStore.WHEN_UNLOCKED` | Accessible only while the device is unlocked. |
| `SecureStore.WHEN_UNLOCKED_THIS_DEVICE_ONLY` | Like `WHEN_UNLOCKED`, but not migrated to a new device. |

Android Auto Backup exclusion (when using your own backup configuration, set `configureAndroidBackup` to `false`):

```xml
<!--  Auto Backup configuration for Android 12 and higher -->
<data-extraction-rules>
  <cloud-backup>
    <include domain="sharedpref" path="."/>
    <exclude domain="sharedpref" path="SecureStore"/>
  </cloud-backup>
  <device-transfer>
    <include domain="sharedpref" path="."/>
    <exclude domain="sharedpref" path="SecureStore"/>
  </device-transfer>
</data-extraction-rules>
```

```xml
<!--  Auto Backup configuration for Android 11 and lower -->
<full-backup-content>
  <include domain="sharedpref" path="."/>
  <exclude domain="sharedpref" path="SecureStore"/>
</full-backup-content>
```

## Notes

- Platforms: android, ios, tvos, expo-go.
- Large payloads can be rejected by the platform; historically some iOS releases refused values above roughly 2048 bytes. Expo does not enforce a limit, so handle native errors.
- Android: values are stored in `SharedPreferences`, encrypted with the Android Keystore. iOS: stored in keychain services as `kSecClassGenericPassword`.
- Persistence: on Android data is not preserved after uninstall. On iOS data persists across uninstall when reinstalled with the same bundle ID (Keychain behavior; not guaranteed). Do not use as the single source of truth for irreplaceable data. Data protected with `requireAuthentication: true` becomes inaccessible if the user's biometric settings change (for example a new fingerprint).
- When `requireAuthentication` is `true`, the biometric prompt can fail independently of the stored value (canceled, no biometrics enrolled, hardware unavailable, locked out, timeout); calls throw / reject with the native error message (for example `"User canceled the authentication"` on Android, `"User canceled the operation."` on iOS). Wrap in `try/catch` and treat it as an auth-flow outcome, not data corruption.
- Export compliance: set `ios.config.usesNonExemptEncryption` to `false` in the app config to handle the App Store Connect encryption prompt automatically.
- Existing React Native app: add `NSFaceIDUsageDescription` to `Info.plist`.
- Source: `sdk-58` branch `packages/expo-secure-store`; modificationDate September 15, 2026.

## Related

- [Constants](./constants.md)
- [Expo](./expo.md)
