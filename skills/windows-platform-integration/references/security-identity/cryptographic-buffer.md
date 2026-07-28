# CryptographicBuffer

Static class with data-management helpers common to cryptographic operations: random data generation, encoding conversions, and buffer comparison. Namespace: `Windows.Security.Cryptography`.

## Signature / Usage

```csharp
// Generate random data
IBuffer buffRnd = CryptographicBuffer.GenerateRandom(32);
string hex = CryptographicBuffer.EncodeToHexString(buffRnd);

// String <-> buffer
IBuffer buffUtf8 = CryptographicBuffer.ConvertStringToBinary("hello", BinaryStringEncoding.Utf8);
string roundTrip = CryptographicBuffer.ConvertBinaryToString(BinaryStringEncoding.Utf8, buffUtf8);

// Constant-time-safe buffer comparison
bool equal = CryptographicBuffer.Compare(buff1, buff2);
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| GenerateRandom(UInt32 length) | static method | Creates a buffer of cryptographically random data. |
| GenerateRandomNumber() | static method | Creates a random 32-bit number. |
| Compare(IBuffer, IBuffer) | static method | Compares two buffers for equality. |
| ConvertStringToBinary(String, BinaryStringEncoding) | static method | Converts a string to an encoded buffer (`Utf8`, `Utf16LE`, `Utf16BE`). |
| ConvertBinaryToString(BinaryStringEncoding, IBuffer) | static method | Converts a buffer back to a string. |
| CreateFromByteArray(Byte[]) | static method | Creates a buffer from a byte array. |
| CopyToByteArray(IBuffer, out Byte[]) | static method | Copies a buffer into a byte array. |
| EncodeToBase64String(IBuffer) / DecodeFromBase64String(String) | static method | Base64 encode/decode. |
| EncodeToHexString(IBuffer) / DecodeFromHexString(String) | static method | Hexadecimal encode/decode. |

## Notes

- `IBuffer` (from `Windows.Storage.Streams`) is the common currency type across `Windows.Security.Cryptography.*` APIs; `CryptographicBuffer` is the standard way to produce/consume it from managed strings, byte arrays, and encoded strings.

## Related

- [HashAlgorithmProvider](./hash-algorithm-provider.md)
- [SymmetricKeyAlgorithmProvider](./symmetric-key-algorithm-provider.md)
- [AsymmetricKeyAlgorithmProvider](./asymmetric-key-algorithm-provider.md)
