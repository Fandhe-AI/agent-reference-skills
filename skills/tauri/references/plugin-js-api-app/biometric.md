---
source: https://v2.tauri.app/reference/javascript/biometric/
---

# @tauri-apps/plugin-biometric

Prompt the user for biometric authentication on Android, iOS and macOS.

## Signature / Usage

```typescript
import { checkStatus, authenticate } from '@tauri-apps/plugin-biometric';

const status = await checkStatus();
if (status.isAvailable) {
  await authenticate('Open your wallet');
}
```

```typescript
function checkStatus(): Promise<Status>                                    // since 2.0.0
function authenticate(reason: string, options?: AuthOptions): Promise<void> // since 2.0.0
function biometricCipher(reason: string, options?: AuthOptions): Promise<{ data: string }>

enum BiometryType {
  None = 0,      // no biometry hardware available, or not enrolled
  TouchID = 1,   // Apple TouchID or Android fingerprint
  FaceID = 2,    // Apple FaceID or Android face authentication
  Iris = 3       // Android iris authentication
}

interface Status {
  isAvailable: boolean
  biometryType: BiometryType   // detected even when isAvailable is false
  error?: string               // only set when isAvailable is false
  errorCode?:                  // only set when isAvailable is false
    | 'appCancel' | 'authenticationFailed' | 'invalidContext' | 'notInteractive'
    | 'passcodeNotSet' | 'systemCancel' | 'userCancel' | 'userFallback'
    | 'biometryLockout' | 'biometryNotAvailable' | 'biometryNotEnrolled'
}
```

## Options / Props

`AuthOptions`:

| Name | Type | Description |
| --- | --- | --- |
| allowDeviceCredential | `boolean` | Enables authentication using the device's password or PIN. Android, iOS and macOS. |
| cancelTitle | `string` | Label for the cancel button. Android, iOS and macOS. |
| dataToEncrypt | `string` | Plain data to encrypt after successful authentication. Used by `biometricCipher`. Android only. |
| dataToDecrypt | `string` | Encrypted data to decrypt after successful authentication. Used by `biometricCipher`. Android only. |
| fallbackTitle | `string` | Text on the fallback button if biometric authentication fails. iOS and macOS only. |
| title | `string` | Title indicating the purpose of the biometric verification. Android only. |
| subtitle | `string` | Subtitle with contextual information. Android only. |
| confirmationRequired | `boolean` | Whether additional user confirmation is required after successful authentication. Android only. |
| maxAttemps | `number` | Maximum number of attempts before the prompt is dismissed. Defaults to `3`. Android only. (Property name is spelled `maxAttemps` in the source.) |

## Notes

- `authenticate` rejects if authentication fails, with an error object containing a `message` and, when the platform provides one, a `code` (e.g. `userCancel`).
- `biometricCipher` encrypts/decrypts a payload using biometric authentication (no `@since` tag in the source). Warning from the source: if the data is encrypted and the user changes the biometric settings, the key needed to decrypt the data is lost, so use it only for data the user can get back by other means.
- Tauri plugin (Rust core + system WebView). Not Electron's API; see the electron skill for Electron.
- Source: `tauri-apps/plugins-workspace@biometric-v2.5.0` `plugins/biometric/guest-js/index.ts`.

- `biometricCipher` is Android only (`dataToEncrypt` / `dataToDecrypt` are Android-only options) and requires the `biometric:allow-biometric-cipher` permission (`biometric:default` only allows status and authenticate).
- The upstream TSDoc example redeclares `const options` and passes the `{ data }` result object as `dataToDecrypt`; this example renames the variables and passes `encrypted.data`.

```javascript
import { biometricCipher } from "@tauri-apps/plugin-biometric";

// Android only
// how to encrypt some data
const encryptOptions = {
  dataToEncrypt: "...", // if not empty, will encrypt this data
};
const encrypted = await biometricCipher('Open your wallet', encryptOptions);

// how to decrypt the encrypted data
const decryptOptions = {
  dataToDecrypt: encrypted.data // data previously encrypted by this method
};
const decrypted = await biometricCipher('Open your wallet', decryptOptions);
console.log(decrypted.data);
```

## Related

- biometric plugin
