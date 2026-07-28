# HashAlgorithmProvider

Represents a cryptographic hash provider. Namespace: `Windows.Security.Cryptography.Core`.

## Signature / Usage

```csharp
IBuffer msg = CryptographicBuffer.ConvertStringToBinary("hello", BinaryStringEncoding.Utf8);

HashAlgorithmProvider provider = HashAlgorithmProvider.OpenAlgorithm(HashAlgorithmNames.Sha256);
IBuffer hash = provider.HashData(msg);
string hashHex = CryptographicBuffer.EncodeToHexString(hash);
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| OpenAlgorithm(String algorithmName) | static method | Opens a hash algorithm provider; names from `HashAlgorithmNames` (`Md5`, `Sha1`, `Sha256`, `Sha384`, `Sha512`). |
| AlgorithmName | String | Name of the open algorithm. |
| HashLength | UInt32 | Length in bytes of the resulting hash. |
| HashData(IBuffer) | method | Hashes binary data in one call (stateless). |
| CreateHash() | method | Creates a reusable `CryptographicHash` object for incremental/streamed hashing. |

## Notes

- MD5 and SHA1 are provided for interoperability only; prefer SHA256/SHA384/SHA512 for new designs.

## Related

- [CryptographicBuffer](./cryptographic-buffer.md)
