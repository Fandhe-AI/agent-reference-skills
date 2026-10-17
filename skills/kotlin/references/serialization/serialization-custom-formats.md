---
source: https://kotlinlang.org/docs/serialization-custom-formats.html
---

# Custom serialization formats

Implement `Encoder` and `Decoder` (or extend `AbstractEncoder` / `AbstractDecoder`) to create a custom format. JSON is currently the only stable format; CBOR, ProtoBuf, and Properties are experimental.

## Signature / Usage

```kotlin
@ExperimentalSerializationApi
class ListEncoder : AbstractEncoder() {
    val list = mutableListOf<Any>()

    override val serializersModule: SerializersModule = EmptySerializersModule()

    // Stores each encoded value
    override fun encodeValue(value: Any) {
        list.add(value)
    }
}

@ExperimentalSerializationApi
fun <T> encodeToList(serializer: SerializationStrategy<T>, value: T): List<Any> {
    val encoder = ListEncoder()
    encoder.encodeSerializableValue(serializer, value)
    return encoder.list
}

@ExperimentalSerializationApi
inline fun <reified T> encodeToList(value: T) = encodeToList(serializer(), value)
```

Serializers call `beginStructure()` for structured values (classes, collections), which returns a `CompositeEncoder` / `CompositeDecoder`. `AbstractEncoder` delegates most `encodeXxx()` functions (such as `encodeString()`) to `encodeValue(value: Any)`.

### Building blocks

| Goal | Override |
| --- | --- |
| Basic decoder | `decodeValue()`, `decodeElementIndex()` (return `CompositeDecoder.DECODE_DONE` when complete), `beginStructure()` (new decoder per nested structure) |
| Sequential decoding | `decodeSequentially(): Boolean = true` (format stores values in declaration order and cannot skip optional elements) |
| Collections | `beginCollection()` in the encoder (encode the size, return `this`), `decodeCollectionSize()` in the decoder (also needs `decodeSequentially() = true` and decoder state holding the element count, e.g. `var elementsCount`) |
| Null support | `encodeNull()`, `encodeNotNullMark()`, `decodeNotNullMark()` |
| Compact binary | Override each primitive `encodeInt()` / `decodeInt()` etc. with `java.io.DataOutput` / `DataInput` |
| Format-specific types | Override `encodeSerializableValue()` / `decodeSerializableValue()` and compare `serializer.descriptor` |
| Format-specific `@Serializable` | `@MetaSerializable` |

Basic decoder:

```kotlin
@ExperimentalSerializationApi
class ListDecoder(val list: ArrayDeque<Any>) : AbstractDecoder() {
    private var elementIndex = 0

    override val serializersModule: SerializersModule = EmptySerializersModule()

    // Returns the next value from the list
    override fun decodeValue(): Any = list.removeFirst()
    
    // Reports the next element index or signals that decoding is complete
    override fun decodeElementIndex(descriptor: SerialDescriptor): Int {
        if (elementIndex == descriptor.elementsCount) return CompositeDecoder.DECODE_DONE
        return elementIndex++
    }

    // Creates a new decoder for each nested structure
    override fun beginStructure(descriptor: SerialDescriptor): CompositeDecoder =
        ListDecoder(list)
}
```

Collection support:

The collection-aware decoder replaces the basic `ListDecoder` above: it tracks `elementsCount`, returns `true` from `decodeSequentially()`, and passes `descriptor.elementsCount` to nested decoders.

```kotlin
@ExperimentalSerializationApi
class ListEncoder : AbstractEncoder() {
    val list = mutableListOf<Any>()

    override val serializersModule: SerializersModule = EmptySerializersModule()

    override fun encodeValue(value: Any) {
        list.add(value)
    }

    // Stores the collection size before its elements
    override fun beginCollection(descriptor: SerialDescriptor, collectionSize: Int): CompositeEncoder {
        encodeInt(collectionSize)
        // Returns the same encoder because no additional collection-specific state is required
        return this
    }
}

@ExperimentalSerializationApi
class ListDecoder(val list: ArrayDeque<Any>, var elementsCount: Int = 0) : AbstractDecoder() {
    private var elementIndex = 0

    override val serializersModule: SerializersModule = EmptySerializersModule()

    override fun decodeValue(): Any = list.removeFirst()

    override fun decodeElementIndex(descriptor: SerialDescriptor): Int {
        if (elementIndex == elementsCount) return CompositeDecoder.DECODE_DONE
        return elementIndex++
    }

    override fun beginStructure(descriptor: SerialDescriptor): CompositeDecoder =
        ListDecoder(list, descriptor.elementsCount)

    // Signals that values are decoded in order because the collection size is known in advance
    override fun decodeSequentially(): Boolean = true

    // Decodes and stores the collection size before reading the collection elements
    override fun decodeCollectionSize(descriptor: SerialDescriptor): Int =
        decodeInt().also { elementsCount = it }
}
```

Null support:

```kotlin
// in ListEncoder (encodeNull, encodeNotNullMark) and ListDecoder (decodeNotNullMark)
// Represents null values as NULL
override fun encodeNull() = encodeValue("NULL")

// Marks a value as non-null with "!!"
override fun encodeNotNullMark() = encodeValue("!!")

// Checks if the next value is "NULL" to determine whether the next nullable value is null
override fun decodeNotNullMark(): Boolean = decodeString() != "NULL"
```

Compact binary primitives:

```kotlin
// in a DataOutput-backed encoder, where `output` is a java.io.DataOutput
override fun encodeBoolean(value: Boolean) = output.writeByte(if (value) 1 else 0)
override fun encodeByte(value: Byte) = output.writeByte(value.toInt())
override fun encodeShort(value: Short) = output.writeShort(value.toInt())
override fun encodeInt(value: Int) = output.writeInt(value)
override fun encodeLong(value: Long) = output.writeLong(value)
override fun encodeFloat(value: Float) = output.writeFloat(value)
override fun encodeDouble(value: Double) = output.writeDouble(value)
override fun encodeChar(value: Char) = output.writeChar(value.code)
override fun encodeString(value: String) = output.writeUTF(value)
override fun encodeEnum(enumDescriptor: SerialDescriptor, index: Int) = output.writeInt(index)
```

Format-specific `ByteArray` support:

```kotlin
override fun <T> encodeSerializableValue(serializer: SerializationStrategy<T>, value: T) {
    if (serializer.descriptor == byteArraySerializer.descriptor)
        encodeByteArray(value as ByteArray)
    else
        super.encodeSerializableValue(serializer, value)
}
```

(`private val byteArraySerializer = serializer<ByteArray>()`; the built-in `ByteArraySerializer()` works too. The decoder mirrors this in `decodeSerializableValue(deserializer, previousValue)`.)

Format-specific annotation:

```kotlin
@OptIn(ExperimentalSerializationApi::class)
// Defines a format-specific annotation that makes annotated classes serializable
@MetaSerializable
@Target(AnnotationTarget.CLASS)
annotation class BinarySerializable(val typeId: Int)

@BinarySerializable(typeId = 1)
data class Project(val name: String, val language: String)
```

## Notes

- Experimental format implementations are production-quality, but future releases may change their default serialization behavior and they may have format-specific limitations.
- Propagate `@ExperimentalSerializationApi` on encoders and decoders instead of opting in only inside individual functions.
- `decodeSequentially()` returning `true` does not guarantee that serializers use sequential decoding, so the decoder must also support `decodeElementIndex()`.
- Detect types by comparing descriptors rather than the runtime type of the value, to preserve the declared serialized form when a custom serializer is used.
- Binary example output for `Project("kotlinx.serialization", "Kotlin")` is `{00}{15}kotlinx.serialization{00}{06}Kotlin`; with a `ByteArray` attachment it is `{00}{15}kotlinx.serialization{04}{0A}{0B}{0C}{0D}`.

## Related

- [Create and use serializers](./serialization-create-and-use-serializers.md)
- [CBOR format](./serialization-cbor.md)
- [ProtoBuf format](./serialization-protobuf.md)
- [Serialization](./serialization.md)
