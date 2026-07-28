# SymmetricKeyAlgorithmProvider

Represents a provider of symmetric key algorithms (AES, DES, 3DES, RC2, RC4). Namespace: `Windows.Security.Cryptography.Core`.

## Signature / Usage

```csharp
SymmetricKeyAlgorithmProvider alg = SymmetricKeyAlgorithmProvider.OpenAlgorithm(SymmetricAlgorithmNames.AesCbcPkcs7);

IBuffer keyMaterial = CryptographicBuffer.GenerateRandom(32); // 256-bit key
CryptographicKey key = alg.CreateSymmetricKey(keyMaterial);
IBuffer iv = CryptographicBuffer.GenerateRandom(alg.BlockLength);

IBuffer encrypted = CryptographicEngine.Encrypt(key, plaintextBuffer, iv);
IBuffer decrypted = CryptographicEngine.Decrypt(key, encrypted, iv);
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| OpenAlgorithm(String algorithmName) | static method | Opens a symmetric algorithm; names from `SymmetricAlgorithmNames` (for example `AesCbcPkcs7`, `AesGcm`, `AesEcb`, `DesCbc`, `Rc4`). |
| AlgorithmName | String | Name of the open algorithm. |
| BlockLength | UInt32 | Cipher block size in bytes for the open algorithm. |
| CreateSymmetricKey(IBuffer keyMaterial) | method | Creates a `CryptographicKey` from raw key material. |

## Notes

- Actual encrypt/decrypt operations are performed by the separate `CryptographicEngine.Encrypt` / `CryptographicEngine.Decrypt` static methods, not by this class directly.
- Non-PKCS7 algorithm names require the plaintext length to already be a multiple of `BlockLength`; PKCS7-suffixed names auto-pad.
- Authenticated modes (`AesGcm`, `AesCcm`) return combined ciphertext+tag via `EncryptedAndAuthenticatedData`, not the plain `CryptographicEngine.Encrypt` overload.

## Related

- [CryptographicBuffer](./cryptographic-buffer.md)
- [AsymmetricKeyAlgorithmProvider](./asymmetric-key-algorithm-provider.md)
