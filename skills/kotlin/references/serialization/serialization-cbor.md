---
source: https://kotlinlang.org/docs/serialization-cbor.html
---

# CBOR format

Concise Binary Object Representation (CBOR, RFC 8949) is a compact binary format that extends the JSON data model. The `Cbor` class encodes to and decodes from byte arrays.

## Signature / Usage

```kotlin
// build.gradle(.kts)
dependencies {
    implementation("org.jetbrains.kotlinx:kotlinx-serialization-cbor:1.11.0")
}
```

```kotlin
import kotlinx.serialization.*
import kotlinx.serialization.cbor.*

@Serializable
data class Project(val name: String, val language: String)

@OptIn(ExperimentalSerializationApi::class)
fun main() {
    val data = Project("kotlinx.serialization", "Kotlin")
    
    // Serializes the object to a CBOR byte array
    val bytes = Cbor.encodeToByteArray(data)
    
    // Deserializes the byte array back to an object
    val obj = Cbor.decodeFromByteArray<Project>(bytes)
    println(obj)
    // Project(name=kotlinx.serialization, language=Kotlin)
}
```

`Cbor` also provides `decodeFromHexString`, and the hex of the sample is `{BF}dnameukotlinx.serializationhlanguagefKotlin{FF}` (printable ASCII shown as characters).

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `ignoreUnknownKeys` | Boolean | Ignore unknown keys during deserialization (default is an error) |
| `alwaysUseByteString` | Boolean | Encode all `ByteArray` values as major type 2 without `@ByteString` |
| `useDefiniteLengthEncoding` | Boolean | Switch between definite-length and indefinite-length encoding (indefinite is the default) |
| `encodeKeyTags` / `encodeValueTags` / `encodeObjectTags` | Boolean | Control encoding of tags |
| `verifyKeyTags` / `verifyValueTags` / `verifyObjectTags` | Boolean | Control verification of tags |
| `preferCborLabelsOverNames` | Boolean | Prefer numeric `@CborLabel` over serial names when both are present |

### Annotations

| Annotation | Purpose |
| --- | --- |
| `@ByteString` | Encode a `ByteArray` property as major type 2 (byte string); default is major type 4 (array) |
| `@CborArray` | Encode a class as a CBOR array (major type 4) instead of a map (major type 5), e.g. COSE structures (RFC 9052) |
| `@KeyTags` / `@ValueTags` | Tags encoding extra information for keys and values |
| `@ObjectTags` | Tags for all instances of a class, encoded directly before the object's data (value tags come before object tags) |
| `@CborLabel` | Numeric label for a map key; string labels use `@SerialName` |

```kotlin
val format = Cbor { ignoreUnknownKeys = true }
```

```kotlin
@Serializable
@CborArray
data class DataClass(
    val alg: Int,
    val kid: String?
)
 
Cbor.encodeToByteArray(DataClass(alg = -7, kid = null))
```

With `@CborArray` this is encoded as `0x8226f6`; without it, as the map `0xa263616c6726636b6964f6`.

## Notes

- Experimental: all non-JSON format libraries may change at any time; samples use `@OptIn(ExperimentalSerializationApi::class)`.
- Unlike JSON, CBOR supports maps with structured keys (instances of user-defined classes), but some parsers such as jackson-dataformat-cbor do not.
- If you verify only value tags and not object tags, the decoder can still deserialize data with additional object tags. Well-known tags are listed in `CborTag`.
- `Cbor.CoseCompliant` is a predefined instance that uses definite-length encoding, encodes and verifies all tags, and prefers numeric labels over serial names.
- CBOR encoders and decoders implement `CborEncoder` / `CborDecoder`, which expose the current `Cbor` instance through the `cbor` property for custom serializers.
- Unsigned numbers are serialized using their signed counterparts in CBOR.

## Related

- [Serialization](./serialization.md)
- [ProtoBuf format](./serialization-protobuf.md)
- [Custom serialization formats](./serialization-custom-formats.md)
- [Customize the Json instance](./serialization-json-configuration.md)
