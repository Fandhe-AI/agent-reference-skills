---
source: https://docs.expo.dev/versions/v58.0.0/sdk/local-authentication/
---

# LocalAuthentication

`expo-local-authentication` uses the Biometric Prompt (Android) or Face ID and Touch ID (iOS) to authenticate the user with a fingerprint or face scan.

## Signature / Usage

```sh
npx expo install expo-local-authentication
```

```js
import * as LocalAuthentication from 'expo-local-authentication';
```

Config plugin (app.json):

```json
{
  "expo": {
    "plugins": [
      [
        "expo-local-authentication",
        {
          "faceIDPermission": "Allow $(PRODUCT_NAME) to use Face ID."
        }
      ]
    ]
  }
}
```

## Options / Props

Methods:

| Name | Platforms | Returns | Description |
| --- | --- | --- | --- |
| `LocalAuthentication.authenticateAsync(options?: LocalAuthenticationOptions)` | Android, iOS | `Promise<LocalAuthenticationResult>` | Attempts to authenticate via fingerprint / Touch ID (or Face ID if available). |
| `LocalAuthentication.cancelAuthenticate()` | Android | `Promise<void>` | Cancels the authentication flow. |
| `LocalAuthentication.getEnrolledLevelAsync()` | Android, iOS | `Promise<SecurityLevel>` | Kind of authentication enrolled on the device. |
| `LocalAuthentication.hasHardwareAsync()` | Android, iOS | `Promise<boolean>` | Whether a face or fingerprint scanner is available. |
| `LocalAuthentication.isEnrolledAsync()` | Android, iOS | `Promise<boolean>` | Whether the device has saved fingerprints or facial data. |
| `LocalAuthentication.supportedAuthenticationTypesAsync()` | Android, iOS | `Promise<AuthenticationType[]>` | Available authentication kinds, e.g. `[1,2]` = fingerprint and facial recognition; empty array if none. |

`LocalAuthenticationOptions` (all optional):

| Property | Type | Description |
| --- | --- | --- |
| biometricsSecurityLevel | `'weak' \| 'strong'` | Android. `strong` allows only Class 3 biometrics (fingerprint, 3D face); `weak` allows Class 3 and Class 2 (e.g. camera-based face unlock). Default: `'weak'` |
| cancelLabel | `string` | Customizes the default `Cancel` label. |
| disableDeviceFallback | `boolean` | Disables falling back to the device passcode after several failed attempts so you can handle fallback yourself. Maps to iOS `LAPolicyDeviceOwnerAuthenticationWithBiometrics` rather than `LAPolicyDeviceOwnerAuthentication`. Default: `false` |
| fallbackLabel | `string` | iOS. Customizes the `Use Passcode` label shown after several failed attempts; an empty string hides the button. |
| promptDescription | `string` | Android. Description in the middle of the prompt. |
| promptMessage | `string` | Message shown alongside the Touch ID / Face ID prompt. |
| promptSubtitle | `string` | Android. Subtitle below the prompt message. |
| requireConfirmation | `boolean` | Android. Hint whether to require user confirmation after authentication; may be ignored by the system. Default: `true` |

`LocalAuthenticationResult`: `{ success: true }` or `{ success: false, error: LocalAuthenticationError, warning?: string }`.

`LocalAuthenticationError`: `'not_enrolled' | 'user_cancel' | 'app_cancel' | 'not_available' | 'lockout' | 'no_space' | 'timeout' | 'unable_to_process' | 'unknown' | 'system_cancel' | 'user_fallback' | 'invalid_context' | 'passcode_not_set' | 'authentication_failed'`.

`AuthenticationType` enum: `FINGERPRINT = 1`, `FACIAL_RECOGNITION = 2`, `IRIS = 3` (Android only).

`SecurityLevel` enum: `NONE = 0` (no enrolled authentication), `SECRET = 1` (non-biometric, e.g. PIN or pattern), `BIOMETRIC_WEAK = 2` (e.g. 2D image-based face unlock; no weak options on iOS), `BIOMETRIC_STRONG = 3` (e.g. fingerprint scan or 3D face unlock).

Config plugin property:

| Name | Default | Description |
| --- | --- | --- |
| `faceIDPermission` | `"Allow $(PRODUCT_NAME) to use Face ID"` | iOS. Sets the `NSFaceIDUsageDescription` message. Set to `false` to omit it from Info.plist if the app does not use Face ID. |

Permissions: Android adds `USE_BIOMETRIC` and `USE_FINGERPRINT` (deprecated since API level 28) automatically via the library's AndroidManifest.xml. iOS uses `NSFaceIDUsageDescription`.

## Notes

- Platforms (frontmatter `platforms`): Android, iOS, Included in Expo Go.
- Face ID is not supported in Expo Go; create a development build to test it.
- Apple requires a Face ID usage description. On an iPhone with Face ID without `infoPlist.NSFaceIDUsageDescription` in `app.json`, the module authenticates using the device passcode.
- Without CNG (or with a manually managed ios project), add `NSFaceIDUsageDescription` to `ios/[app]/Info.plist`:

```xml
<key>NSFaceIDUsageDescription</key>
<string>Allow $(PRODUCT_NAME) to use FaceID</string>
```

- On Android devices prior to M, `getEnrolledLevelAsync` can return `SECRET` if only the SIM lock is enrolled, which is not what `authenticateAsync` prompts.
- This module performs on-device biometric checks; for sign-in flows with identity providers see AppleAuthentication and AuthSession (same category). For backend auth libraries see better-auth and supabase.
- Source code: https://github.com/expo/expo/tree/sdk-58/packages/expo-local-authentication

## Related

- [AppleAuthentication](./apple-authentication.md)
- [AuthSession](./auth-session.md)
