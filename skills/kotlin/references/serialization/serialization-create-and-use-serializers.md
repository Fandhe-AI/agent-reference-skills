---
source: https://kotlinlang.org/docs/serialization-create-and-use-serializers.html
---

# Create and use serializers

A serializer (`KSerializer`) defines the structure of a Kotlin type in its serialized form; format implementations such as `Json` control how that structure is encoded. This page covers obtaining generated serializers, writing custom ones, and applying them.

## Signature / Usage

```kotlin
import kotlinx.serialization.*

@Serializable
data class Color(val rgb: Int)

fun main() {
    // Retrieves the generated serializer for the Color class
    val colorSerializer: KSerializer<Color> = Color.serializer()

    println(colorSerializer.descriptor)
    // Color(rgb: kotlin.Int)
}
```

`KSerializer` extends `SerializationStrategy` and `DeserializationStrategy`.

## Obtain serializers

| Need | API |
| --- | --- |
| Generated serializer of a `@Serializable` class | `Color.serializer()` |
| Primitive / String | `Int.serializer()`, `String.serializer()` |
| Any type incl. parameterized | top-level `serializer<T>()` |
| Generic class | `Box.serializer(Color.serializer())` (one `KSerializer` argument per type parameter) |
| Collections | `ListSerializer()`, `SetSerializer()`, `MapSerializer()` from `kotlinx.serialization.builtins` |

```kotlin
val stringListSerializer: KSerializer<List<String>> = ListSerializer(String.serializer()) 
```

## Custom primitive serializer

Implement `KSerializer<Type>` as an `object`, override `descriptor` with `PrimitiveSerialDescriptor(serialName, kind)` (use a unique `serialName` and a matching `PrimitiveKind`), implement `serialize()` with an `Encoder` function matching the kind, `deserialize()` with a `Decoder`, then apply it with `@Serializable(YourSerializer::class)`.

```kotlin
object ColorAsStringSerializer : KSerializer<Color> {
    // Defines the schema for the serialized data as a single string
    override val descriptor: SerialDescriptor =
        // Specifies a unique name and a PrimitiveKind
        PrimitiveSerialDescriptor("my.app.Color", PrimitiveKind.STRING)

    // Defines how a Color value is serialized as a string
    override fun serialize(encoder: Encoder, value: Color) {
        // Converts the RGB value to a hexadecimal string
        val hexValue = value.rgb.toString(16).padStart(6, '0')
        // Encodes the serialized value as a string
        encoder.encodeString(hexValue)
    }

    // Defines how a Color value is deserialized from a string
    override fun deserialize(decoder: Decoder): Color {
        // Decodes the serialized string value
        val hexValue = decoder.decodeString()
        // Converts the decoded value back into a Color
        return Color(hexValue.toInt(16))
    }
}
// Specifies ColorAsStringSerializer as the custom serializer for the Color class
@Serializable(ColorAsStringSerializer::class)
data class Color(val rgb: Int)
```

Base64 for `ByteArray`: use a custom primitive serializer with a Kotlin Base64 variant (`Base64.Default`, `Base64.Mime`), e.g. `encoder.encodeString(base64.encode(value))` and `base64.decode(decoder.decodeString())`.

## Delegate to another serializer

Wrap the delegated serializer's descriptor in a new one (you cannot use the original class descriptor or the delegate's descriptor directly), and use `encoder.encodeSerializableValue()` / `decoder.decodeSerializableValue()`:

```kotlin
class ColorIntArraySerializer : KSerializer<Color> {
    private val delegateSerializer = IntArraySerializer()
    override val descriptor = SerialDescriptor("my.app.Color", delegateSerializer.descriptor)

    // Delegates serialization logic to IntArraySerializer
    override fun serialize(encoder: Encoder, value: Color) {
        val data = intArrayOf(
            (value.rgb shr 16) and 0xFF,
            (value.rgb shr 8) and 0xFF,
            value.rgb and 0xFF
        )
        encoder.encodeSerializableValue(delegateSerializer, data)
    }

    // Delegates deserialization and converts IntArray back to Color
    override fun deserialize(decoder: Decoder): Color {
        val array = decoder.decodeSerializableValue(delegateSerializer)
        return Color((array[0] shl 16) or (array[1] shl 8) or array[2])
    }
}
```

## Surrogate class

A surrogate class matches the serialized form of another class; use it to change serialization without modifying the class, avoid a composite serializer, or validate the serialized form first. Make it `private`, give it `@SerialName`, and wrap its generated descriptor under a different unique `serialName`.

```kotlin
// Defines a surrogate that matches the serialized form
@Serializable
@SerialName("Color")
private class ColorSurrogate(val r: Int, val g: Int, val b: Int) {
    init {
        // Enforces constraints on the serialized form
        require(r in 0..255 && g in 0..255 && b in 0..255)
    }
}

object ColorSerializer : KSerializer<Color> {
    // The serialNames of descriptors must be unique
    override val descriptor: SerialDescriptor = SerialDescriptor("my.app.Color", ColorSurrogate.serializer().descriptor)

    // Converts the original class to the surrogate representation
    override fun serialize(encoder: Encoder, value: Color) {
        val surrogate = ColorSurrogate((value.rgb shr 16) and 0xff, (value.rgb shr 8) and 0xff, value.rgb and 0xff)
        encoder.encodeSerializableValue(ColorSurrogate.serializer(), surrogate)
    }

    // Converts the surrogate representation back to the original class
    override fun deserialize(decoder: Decoder): Color {
        val surrogate = decoder.decodeSerializableValue(ColorSurrogate.serializer())
        return Color((surrogate.r shl 16) or (surrogate.g shl 8) or surrogate.b)
    }
}
```

## Custom composite serializer

Define the descriptor with `buildClassSerialDescriptor()` and `element()` (order determines indices from `0`), encode with the `encodeStructure()` DSL (`CompositeEncoder`, e.g. `encodeIntElement`), decode with the `decodeStructure()` DSL (`CompositeDecoder`) looping on `decodeElementIndex()` until `CompositeDecoder.DECODE_DONE`:

```kotlin
object ColorAsObjectSerializer : KSerializer<Color> {
    // Defines the schema for the Color class
    override val descriptor: SerialDescriptor =
        buildClassSerialDescriptor("my.app.Color") {
            // Specifies each property with its type and name with the element() function
            element<Int>("r")
            element<Int>("g")
            element<Int>("b")
        }

    // Serializes the Color in the order specified in the descriptor
    override fun serialize(encoder: Encoder, value: Color) =
        encoder.encodeStructure(descriptor) {
            encodeIntElement(descriptor, 0, (value.rgb shr 16) and 0xff)
            encodeIntElement(descriptor, 1, (value.rgb shr 8) and 0xff)
            encodeIntElement(descriptor, 2, value.rgb and 0xff)
        }

    // Deserializes the data back into a Color object
    override fun deserialize(decoder: Decoder): Color =
        decoder.decodeStructure(descriptor) {
            // Temporary variables to hold the decoded values
            var r = -1
            var g = -1
            var b = -1
            // Uses decodeElementIndex() since element order may vary by format
            while (true) {
                when (val index = decodeElementIndex(descriptor)) {
                    0 -> r = decodeIntElement(descriptor, 0)
                    1 -> g = decodeIntElement(descriptor, 1)
                    2 -> b = decodeIntElement(descriptor, 2)
                    CompositeDecoder.DECODE_DONE -> break
                    else -> error("Unexpected index: $index")
                }
            }
            // Validates values and reconstructs Color
            require(r in 0..255 && g in 0..255 && b in 0..255)
            Color((r shl 16) or (g shl 8) or b)
        }
}
```

- Encode defaults: plugin-generated serializers check whether the encoder needs to encode default values (JSON: `encodeDefaults`). A custom serializer does the same with `shouldEncodeElementDefault(descriptor, index)` and `element<Int>("r", isOptional = true)`. If a property is annotated `@EncodeDefault`, plugin-generated serializers do not call `shouldEncodeElementDefault()`.
- Sequential decoding: `decodeSequentially()` returns `true` when the current structure can be decoded in order; handle that case separately (`@OptIn(ExperimentalSerializationApi::class)`). Plugin-generated serializers use this optimization.

## Generic types

Declare the serializer as a `class` (not `object`) with one `KSerializer` constructor parameter per generic type parameter:

```kotlin
@Serializable(BoxSerializer::class)
data class Box<T>(val contents: T)

// Creates a custom serializer as a class for Box<T>
class BoxSerializer<T>(private val dataSerializer: KSerializer<T>) : KSerializer<Box<T>> {
    // Defines a unique serialName for the Box<T> descriptor
    override val descriptor: SerialDescriptor =
        SerialDescriptor("my.app.Box", dataSerializer.descriptor)

    // Delegates serialization and deserialization
    override fun serialize(encoder: Encoder, value: Box<T>) = dataSerializer.serialize(encoder, value.contents)
    override fun deserialize(decoder: Decoder) = Box(dataSerializer.deserialize(decoder))
}
```

## Plugin-generated serializer alongside a custom one

By default no serializer is generated when you specify `@Serializable(YourSerializer::class)`. Annotate with `@KeepGeneratedSerializer` and call `.generatedSerializer()` on the companion:

```kotlin
@OptIn(ExperimentalSerializationApi::class)
@KeepGeneratedSerializer
@Serializable(ColorAsStringSerializer::class)
class Color(val rgb: Int)

// Json.encodeToString(green)  -> "00ff00" (custom)
// Json.encodeToString(Color.generatedSerializer(), green) -> {"rgb":65280}
```

## Apply serializers

| Way | Example |
| --- | --- |
| Pass manually | `Json.encodeToString(DateAsLongSerializer, date)` |
| On a property | `@Serializable(DateAsLongSerializer::class) val stableReleaseDate: Date` |
| On a type (generic argument) | `List<@Serializable(DateAsLongSerializer::class) Date>` |
| For a file | `@file:UseSerializers(DateAsLongSerializer::class)` at the start of the file |
| Type alias | `typealias DateAsLong = @Serializable(DateAsLongSerializer::class) Date` |
| Contextual | `@Contextual` property + `SerializersModule { contextual(DateAsLongSerializer) }` + `Json { serializersModule = module }` |

```kotlin
object DateAsLongSerializer : KSerializer<Date> {
    override val descriptor: SerialDescriptor = PrimitiveSerialDescriptor("my.app.DateAsLong", PrimitiveKind.LONG)
    override fun serialize(encoder: Encoder, value: Date) = encoder.encodeLong(value.time)
    override fun deserialize(decoder: Decoder): Date = Date(decoder.decodeLong())
}

@Serializable
class ProgrammingLanguage(
    val name: String,
    // Specifies contextual serialization for Date
    @Contextual
    val stableReleaseDate: Date
)

// Defines a SerializersModule and registers the contextual serializer for Date
private val module = SerializersModule { 
    contextual(DateAsLongSerializer)
}

// Creates a Json instance with the custom SerializersModule
val format = Json { serializersModule = module }
```

Generic classes contextually: register a function that receives the type-argument serializers; a single serializer instance only works for one argument type.

```kotlin
val correctModule = SerializersModule {
    // args[0] is the serializer for T,
    // for example Int.serializer() or String.serializer()
    contextual(Box::class) { args -> BoxSerializer(args[0]) }
}
```

## Notes

- If the `descriptor` does not match the encode/decode functions used in a primitive serializer, future `kotlinx.serialization` updates may make it behave unpredictably in some formats.
- Each `SerialDescriptor` must have a unique `serialName`; surrogate descriptors can reuse structure but not the surrogate's `serialName`.
- Serialization strategies are normally explicit; there is no global serializer configuration except contextual serialization. `@Contextual` is a shortcut for `ContextualSerializer`; `@UseContextualSerialization` applies it across a file.
- Without a `SerializersModule`, contextually annotated types without a default serializer throw `SerializationException`.
- `JsonTransformingSerializer` can modify the JSON output of an existing serializer; see the transform JSON page. `@KeepGeneratedSerializer` is Experimental and needs `@OptIn(ExperimentalSerializationApi::class)`.
- Modules can be combined with the `plus` operator; see the polymorphism page.

## Related

- [Serialize classes](./serialization-customization-options.md)
- [Serialize polymorphic classes](./serialization-polymorphism.md)
- [Transform JSON structure](./serialization-transform-json.md)
- [Custom serialization formats](./serialization-custom-formats.md)
