# DataProtectionProvider

Cryptographic provider that asynchronously encrypts and decrypts static data or a data stream, scoped by a protection descriptor string (local user/machine, AD security principal, or web credentials). Namespace: `Windows.Security.Cryptography.DataProtection`.

## Signature / Usage

```csharp
// Encrypt to the local user
var provider = new DataProtectionProvider("LOCAL=user");
IBuffer plaintext = CryptographicBuffer.ConvertStringToBinary("secret", BinaryStringEncoding.Utf8);
IBuffer protectedBuffer = await provider.ProtectAsync(plaintext);

// Decrypt (descriptor is embedded in the protected blob; no constructor argument needed)
var unprotectProvider = new DataProtectionProvider();
IBuffer unprotectedBuffer = await unprotectProvider.UnprotectAsync(protectedBuffer);
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| DataProtectionProvider() | constructor | For decryption; use before `UnprotectAsync` / `UnprotectStreamAsync`. |
| DataProtectionProvider(String protectionDescriptor) | constructor | For encryption; use before `ProtectAsync` / `ProtectStreamAsync`. |
| ProtectAsync(IBuffer) | method | Asynchronously encrypts static data. |
| ProtectStreamAsync(IInputStream, IOutputStream) | method | Asynchronously encrypts a data stream. |
| UnprotectAsync(IBuffer) | method | Asynchronously decrypts static data. |
| UnprotectStreamAsync(IInputStream, IOutputStream) | method | Asynchronously decrypts a data stream. |

## Notes

- Protection descriptor strings: `"LOCAL=user"` / `"LOCAL=machine"` (no extra capability needed), `"WEBCREDENTIALS=name"` / `"WEBCREDENTIALS=name,domain"` (no extra capability needed), or SID/SDDL-based AD security-principal descriptors (require the restricted `enterpriseAuthentication` app capability and additional Store onboarding validation).
- This is a general asynchronous data-at-rest encryption API distinct from `SymmetricKeyAlgorithmProvider`/`AsymmetricKeyAlgorithmProvider`, which require the caller to manage keys directly; `DataProtectionProvider` delegates key management to the OS based on the descriptor.

## Related

- [CryptographicBuffer](./cryptographic-buffer.md)
