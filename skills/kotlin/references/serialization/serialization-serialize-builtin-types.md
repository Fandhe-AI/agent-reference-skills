---
source: https://kotlinlang.org/docs/serialization-serialize-builtin-types.html
---

# Serialize built-in types

Built-in serializers cover primitives, strings, enums, and certain standard library classes (Pair, Triple, collections, Unit, objects, Duration, Instant, Nothing).

## Signature / Usage

```kotlin
import kotlinx.serialization.*
import kotlinx.serialization.json.*

@Serializable
class Data(val signature: Long)

fun main() {
    val data = Data(0x1CAFE2FEED0BABE0)
    println(Json.encodeToString(data))
    // {"signature":2067120338512882656}
}
```

### Types

| Type | JSON representation |
| --- | --- |
| Numbers (`Int`, `Double`, ...) | Natural JSON numbers (`{"answer":42,"pi":3.141592653589793}`) |
| Unsigned (`UByte`, `UInt`, ...) | Regular JSON numbers preserving the unsigned range |
| `Long` with `LongAsStringSerializer` | JSON string (`{"signature":"2067120338512882656"}`) |
| `enum class` | String; serializable without `@Serializable` |
| `Pair` / `Triple` | `{"first":1,"second":{...}}` |
| `List` / `Set` | JSON array |
| `Map` | JSON object (primitive or enum keys; keys become strings) |
| `Unit` and `object` singletons | `{}` |
| `Duration` | ISO-8601-2 string (`"PT16M40S"`) |
| `Instant` | ISO-8601-1 string (`"2020-12-09T09:16:56.124Z"`) |
| `Nothing` | Serializable, but encoding or decoding throws (no instances) |

`Long` as a string, useful in JavaScript where `Number` cannot represent all `Long` values:

```kotlin
@Serializable
class Data(
    @Serializable(LongAsStringSerializer::class)
    val signature: Long
)
```

Enum entry serial names (requires `@Serializable` on the enum):

```kotlin
@Serializable
enum class Status { @SerialName("maintained") SUPPORTED }
```

Nothing, used when a type is syntactically required but not involved in serialization:

```kotlin
@Serializable
sealed class ParametrizedParent<out R> {
    @Serializable
    data class ChildWithoutParameter(val value: Int) : ParametrizedParent<Nothing>()
}
```

## Notes

- Other formats may handle unsigned numbers differently: ProtoBuf and CBOR serialize them using their signed counterparts.
- When targeting Kotlin/JS or Kotlin/Native, `@Serializable` is required on an `enum` class used as a root object, such as `encodeToString<Status>(Status.SUPPORTED)`.
- Ranges and `Regex` are not supported.
- A `Set` deserialized with duplicate entries has implementation-defined behavior; the declared type is used on decoding (`List` keeps duplicates, `Set` enforces uniqueness).
- JSON does not natively support complex keys in maps; see the `allowStructuredMapKeys` option in the Json configuration page. Other formats such as CBOR keep non-primitive keys.

## Related

- [Serialize classes](./serialization-customization-options.md)
- [Customize the Json instance](./serialization-json-configuration.md)
- [Serialize polymorphic classes](./serialization-polymorphism.md)
- [Create and use serializers](./serialization-create-and-use-serializers.md)
