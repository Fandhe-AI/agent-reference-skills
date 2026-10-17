---
source: https://kotlinlang.org/docs/serialization-protobuf.html
---

# ProtoBuf format

Protocol Buffers is a language-neutral binary format, more compact than CBOR because it assigns integer numbers to fields instead of names. Kotlin serialization uses proto2 semantics (fields explicitly required or optional); a `.proto` file is optional.

## Signature / Usage

```kotlin
// build.gradle(.kts)
dependencies {
    implementation("org.jetbrains.kotlinx:kotlinx-serialization-protobuf:1.11.0")
}
```

```kotlin
import kotlinx.serialization.*
import kotlinx.serialization.protobuf.*

@Serializable
data class Project(val name: String, val language: String)

@OptIn(ExperimentalSerializationApi::class)
fun main() {
    val data = Project("kotlinx.serialization", "Kotlin")
    // Serializes the Project instance into a ProtoBuf byte array
    val bytes = ProtoBuf.encodeToByteArray(data)

    // Deserializes the ProtoBuf byte array back to an object
    val obj = ProtoBuf.decodeFromByteArray<Project>(bytes)
    println(obj)
    // Project(name=kotlinx.serialization, language=Kotlin)
}
```

## Annotations

| Annotation | Purpose |
| --- | --- |
| `@ProtoNumber(n)` | Assign a field number explicitly (stable schema; fields are numbered automatically by default) |
| `@ProtoType(ProtoIntegerType.X)` | Integer encoding for `Byte`, `Short`, `Int`, `Long`, `Char` |
| `@ProtoPacked` | Packed encoding for repeated primitive numeric collections (not maps) |
| `@ProtoOneOf` | Maps a polymorphic property to a proto `oneof` |

`ProtoIntegerType`:

| Value | Encoding | Example |
| --- | --- | --- |
| `DEFAULT` | varint (`intXX`), optimized for small non-negative numbers | `1` is one byte `01` |
| `SIGNED` | signed ZigZag (`sintXX`) | `-2` is one byte `03` |
| `FIXED` | fixed width (`fixedXX`) | `3` is `03 00 00 00` |

```kotlin
@OptIn(ExperimentalSerializationApi::class)
@Serializable
data class Project(
    // Assigns field number 1 to the name property
    @ProtoNumber(1)
    val name: String,

    // Assigns field number 3 to the language property
    @ProtoNumber(3)
    val language: String
)
```

## oneof fields

Model a `oneof` with a sealed interface, a `@ProtoOneOf` property, and subclasses whose single property carries the `oneof` field number:

```kotlin
// Represents the oneof group
@Serializable
sealed interface IPhoneType

// Represents the home_phone field
@OptIn(ExperimentalSerializationApi::class)
@Serializable @JvmInline value class HomePhone(@ProtoNumber(2) val number: String): IPhoneType

// Represents the work_phone field as a data class
@OptIn(ExperimentalSerializationApi::class)
@Serializable data class WorkPhone(@ProtoNumber(3) val number: String): IPhoneType

// Defines the data class with a oneof property
@OptIn(ExperimentalSerializationApi::class)
@Serializable
data class Data(
    // Assigns field number 1 to the name property
    @ProtoNumber(1) val name: String,

    // Maps the polymorphic property to the oneof declaration
    @ProtoOneOf val phone: IPhoneType?,
)
```

For deserialization only, a class without `@ProtoOneOf` works (`homeNumber: String? = null`, `workNumber: String? = null`), but it does not enforce exclusivity on serialization.

## Generate a ProtoBuf schema

`ProtoBufSchemaGenerator` generates a proto2-compatible schema from one or more `SerialDescriptor`s:

```kotlin
import kotlinx.serialization.protobuf.schema.ProtoBufSchemaGenerator

@Serializable
data class SampleData(
    val amount: Long,
    val description: String?,
    val department: String = "QA"
)

@OptIn(ExperimentalSerializationApi::class)
fun main() {
    val descriptors = listOf(SampleData.serializer().descriptor)
    val schemas = ProtoBufSchemaGenerator.generateSchemaText(descriptors)
    println(schemas)
}
```

## Notes

- Experimental: samples use `@OptIn(ExperimentalSerializationApi::class)`; APIs may change.
- `uintXX` and `sfixedXX` Protocol Buffer types are not supported.
- Parsers accept both packed and unpacked repeated numeric fields, so decoding does not depend on `@ProtoPacked`.
- Map each `oneof` type hierarchy to only one data class, to avoid field number conflicts or `IllegalArgumentException` at runtime. If both fields of a non-`@ProtoOneOf` class have values, another ProtoBuf parser may keep only the last field it reads.
- Default Kotlin values are not representable in `.proto` files; the generated schema adds a warning comment for them.
- Unsigned numbers are serialized using their signed counterparts.

## Related

- [Serialization](./serialization.md)
- [CBOR format](./serialization-cbor.md)
- [Serialize polymorphic classes](./serialization-polymorphism.md)
- [Custom serialization formats](./serialization-custom-formats.md)
