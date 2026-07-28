# AsymmetricKeyAlgorithmProvider

Represents a provider of asymmetric (public/private) key algorithms (RSA, ECDSA, ECDH). Namespace: `Windows.Security.Cryptography.Core`.

## Signature / Usage

```csharp
AsymmetricKeyAlgorithmProvider provider =
    AsymmetricKeyAlgorithmProvider.OpenAlgorithm(AsymmetricAlgorithmNames.RsaPkcs1);

CryptographicKey keyPair = provider.CreateKeyPair(2048);
IBuffer publicKeyBlob = keyPair.ExportPublicKey();

// Import a peer's public key and encrypt a symmetric session key to it
CryptographicKey peerPublicKey = provider.ImportPublicKey(publicKeyBlob);
IBuffer encryptedSessionKey = CryptographicEngine.Encrypt(peerPublicKey, sessionKeyBuffer, null);
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| OpenAlgorithm(String algorithmName) | static method | Opens an asymmetric algorithm; names from `AsymmetricAlgorithmNames` (for example `RsaPkcs1`, `RsaOaepSha256`, `EcdsaP256Sha256`, `EcdhP256`). |
| AlgorithmName | String | Name of the open algorithm. |
| CreateKeyPair(UInt32 keySize) | method | Creates a new public/private key pair. |
| CreateKeyPairWithCurveName(String) | method | Creates an ECC key pair from a named curve. |
| CreateKeyPairWithCurveParameters(Byte[]) | method | Creates an ECC key pair from explicit curve parameters. |
| ImportKeyPair(IBuffer) / (IBuffer, CryptographicPrivateKeyBlobType) | method | Imports a public/private key pair from a buffer. |
| ImportPublicKey(IBuffer) / (IBuffer, CryptographicPublicKeyBlobType) | method | Imports a public key from a buffer. |

## Notes

- Because asymmetric cryptography is much slower than symmetric cryptography, the typical pattern is envelope encryption: generate a symmetric session key, encrypt the payload with it via `SymmetricKeyAlgorithmProvider`, then encrypt only the session key with the recipient's asymmetric public key.
- Exported public keys are opaque blobs (format depends on `CryptographicPublicKeyBlobType`), not raw PEM/DER by default.

## Related

- [SymmetricKeyAlgorithmProvider](./symmetric-key-algorithm-provider.md)
- [CryptographicBuffer](./cryptographic-buffer.md)
