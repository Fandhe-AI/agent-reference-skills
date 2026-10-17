---
source: https://docs.expo.dev/versions/v58.0.0/sdk/crypto/
---

# Crypto

`expo-crypto` hashes data in a manner equivalent to the Node.js core `crypto` API and performs crypto operations such as AES encryption and decryption.

## Signature / Usage

```sh
npx expo install expo-crypto
```

```tsx
import * as Crypto from 'expo-crypto';

const digest = await Crypto.digestStringAsync(
  Crypto.CryptoDigestAlgorithm.SHA256,
  'GitHub stars are neat 🌟'
);
console.log('Digest: ', digest);
```

AES encryption and decryption:

```tsx
import { AESEncryptionKey, aesEncryptAsync, aesDecryptAsync } from 'expo-crypto';

const plaintext = 'Hello, world!';
const plaintextBase64 = btoa(plaintext);

const encryptionKey = await AESEncryptionKey.generate();
const sealedData = await aesEncryptAsync(plaintextBase64, encryptionKey);
const decryptedBase64 = await aesDecryptAsync(sealedData, encryptionKey, {
  output: 'base64',
});

const decrypted = atob(decryptedBase64);
```

Encrypt data and save it to a file:

```ts
import { AESEncryptionKey, aesEncryptAsync } from 'expo-crypto';
import { File, Paths } from 'expo-file-system';
import * as SecureStore from 'expo-secure-store';

async function encryptAndSaveData(plaintextData: Uint8Array) {
  // Generate encryption key
  const encryptionKey = await AESEncryptionKey.generate();

  // Encrypt data
  const sealedData = await aesEncryptAsync(plaintextData, encryptionKey);
  const encryptedBytes = await sealedData.combined();

  // Store encryption key
  const keyHex = await encryptionKey.encoded('hex');
  await SecureStore.setItemAsync('aes-encryption-key', keyHex);

  // Save encrypted file
  const file = new File(Paths.cache, 'encrypted.dat');
  file.create({ overwrite: true });
  await file.write(encryptedBytes);
}
```

Load the file and decrypt:

```ts
import { AESEncryptionKey, AESSealedData, aesDecryptAsync } from 'expo-crypto';
import { File, Paths } from 'expo-file-system';
import * as SecureStore from 'expo-secure-store';

async function loadAndDecryptData(): Promise<Uint8Array | null> {
  // Load encryption key
  const keyHex = await SecureStore.getItemAsync('aes-encryption-key');
  if (!keyHex) {
    return null;
  }
  const encryptionKey = await AESEncryptionKey.import(keyHex, 'hex');

  // Load encrypted file
  const file = new File(Paths.cache, 'encrypted.dat');
  if (!file.exists) {
    return null;
  }
  const encryptedBytes = await file.bytes();
  const sealedData = AESSealedData.fromCombined(encryptedBytes);

  // Decrypt data
  const plaintextBytes = await aesDecryptAsync(data, encryptionKey);
  return plaintextBytes;
}
```

## Options / Props

All entries below are supported on Android, iOS, tvOS and Web unless noted.

Methods:

| Name | Returns | Description |
| --- | --- | --- |
| `Crypto.digest(algorithm: CryptoDigestAlgorithm, data: BufferSource)` | `Promise<ArrayBuffer>` | Digest of the supplied bytes. On web only from a secure origin (HTTPS), otherwise an error is thrown. |
| `Crypto.digestStringAsync(algorithm, data: string, options?: CryptoDigestOptions)` | `Promise<string>` | Digest of a string; default format `HEX` (`CryptoDigestOptions.HEX`). On web only from a secure origin. |
| `Crypto.getRandomBytes(byteCount: number)` | `Uint8Array` | Random bytes from native implementations; `byteCount` must be `0`–`1024` or a `TypeError` is thrown. Falls back to `Math.random` during development to prevent issues with React Native Debugger. |
| `Crypto.getRandomBytesAsync(byteCount: number)` | `Promise<Uint8Array>` | Same as above, asynchronous. |
| `Crypto.getRandomValues<T>(typedArray: T)` | `T` | Fills an integer-based `TypedArray` in place with cryptographically secure random values. |
| `Crypto.randomUUID()` | `string` | UUIDv4 (RFC4122) using cryptographically secure random values. |
| `Crypto.aesEncryptAsync(plaintext: BinaryInput, key: AESEncryptionKey, options?: AESEncryptOptions)` | `Promise<AESSealedData>` | Encrypts using AES-GCM. `options` default `{}`. |
| `Crypto.aesDecryptAsync(sealedData: AESSealedData, key: AESEncryptionKey, options?: AESDecryptOptions)` | `Promise<string \| Uint8Array>` | Decrypts sealed data; result type depends on the `output` option. |

`AESEncryptionKey` (extends `EncryptionKey`):

| Member | Returns | Description |
| --- | --- | --- |
| `size` (property) | `AESKeySize` | Key size in bits (128, 192 or 256). |
| `bytes()` | `Promise<Uint8Array>` | Key as bytes (asynchronous due to the `SubtleCrypto` `exportKey` API). |
| `encoded(encoding: 'base64' \| 'hex')` | `Promise<string>` | Key encoded as a string. |
| `generate(size?: AESKeySize)` | `Promise<EncryptionKey>` | Generates a new key; size defaults to 256. |
| `import(bytes: Uint8Array)` | `Promise<EncryptionKey>` | Imports a key from bytes; validates size. |
| `import(hexString: string, encoding: 'base64' \| 'hex')` | `Promise<EncryptionKey>` | Imports a key from a hex or base64 string; validates size. |

`AESSealedData` (extends `SealedData`; IV + ciphertext + tag):

| Member | Returns | Description |
| --- | --- | --- |
| `combinedSize` (read only) | `number` | Total size of combined data (IV + ciphertext + tag) in bytes. |
| `ivSize` (read only) | `number` | IV size in bytes. |
| `tagSize` (read only) | `GCMTagByteLength` | Authentication tag size in bytes. |
| `ciphertext(options: { encoding: 'base64' \| 'bytes', includeTag: boolean })` | `Promise<string \| Uint8Array>` | The ciphertext. |
| `combined(encoding?: 'base64' \| 'bytes')` | `Promise<string \| Uint8Array>` | Combined IV, ciphertext and tag; defaults to `bytes`. |
| `fromCombined(combined: BinaryInput, config?: AESSealedDataConfig)` (static) | `AESSealedData` | Creates from a combined array; a string must be base64. |
| `fromParts(iv, ciphertext, tag)` (static, overload 1) | `AESSealedData` | Creates from separate IV, ciphertext (without GCM tag) and tag (all `BinaryInput`). |
| `fromParts(iv, ciphertextWithTag, tagLength?: number)` (static, overload 2) | `AESSealedData` | Creates from IV and ciphertext with tag appended; `tagLength` defaults to 16. |
| `iv(encoding?: 'base64' \| 'bytes')` | `Promise<string \| Uint8Array>` | IV (nonce); defaults to `bytes`. |
| `tag(encoding?: 'base64' \| 'bytes')` | `Promise<string \| Uint8Array>` | Authentication tag; defaults to `bytes`. |

Option interfaces and types:

| Type | Definition |
| --- | --- |
| `AESEncryptOptions` | `additionalData?: BinaryInput` (AAD for GCM; string must be base64), `nonce?: GCMNonceParam`, `tagLength?: GCMTagByteLength` (Android, Web; default `16`; ignored on Apple where the tag is always 16 bytes). |
| `AESDecryptOptions` | `additionalData?: BinaryInput`, `output?: 'base64' \| 'bytes'` (default `'bytes'`). |
| `AESSealedDataConfig` | `ivLength?: number` (default `12`), `tagLength?: GCMTagByteLength` (default `16`). |
| `BinaryInput` | `string \| Uint8Array \| ArrayBuffer`; a string must be base64-encoded. |
| `CryptoDigestOptions` | `{ encoding: CryptoEncoding }` |
| `Digest` | `string` |
| `GCMNonceParam` | `{ length?: number }` (byte length to generate, default `12`) or `{ bytes: BinaryInput }` (provided nonce). |
| `GCMTagByteLength` | `16 \| 15 \| 14 \| 13 \| 12 \| 8 \| 4` (recommended and default 16; on Apple only 16 is supported for encryption). |

Enums:

| Enum | Values |
| --- | --- |
| `AESKeySize` | `AES128 = 128`, `AES192 = 192` (Android, Apple; unsupported on Web), `AES256 = 256` |
| `CryptoDigestAlgorithm` | `MD2 = "MD2"` (iOS), `MD4 = "MD4"` (iOS), `MD5 = "MD5"` (Android, iOS), `SHA1 = "SHA-1"`, `SHA256 = "SHA-256"`, `SHA384 = "SHA-384"`, `SHA512 = "SHA-512"` |
| `CryptoEncoding` | `BASE64 = "base64"` (trailing padding, no line wrapping, no trailing newline), `HEX = "hex"` |

Error codes:

| Code | Description |
| --- | --- |
| `ERR_CRYPTO_UNAVAILABLE` | Web only. Access to the WebCrypto API is restricted to secure origins (localhost/https). |
| `ERR_CRYPTO_DIGEST` | An invalid encoding type provided. |

## Notes

- Platforms (frontmatter `platforms`): Android, iOS, tvOS, Web, Included in Expo Go.
- The final example in the source calls `aesDecryptAsync(data, encryptionKey)` although the variable is named `sealedData`; the snippet is reproduced as published.
- Source code: https://github.com/expo/expo/tree/sdk-58/packages/expo-crypto

## Related

- [FileSystem](./filesystem.md)
- [LocalAuthentication](./local-authentication.md)
