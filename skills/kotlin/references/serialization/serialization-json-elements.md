---
source: https://kotlinlang.org/docs/serialization-json-elements.html
---

# JSON elements

The `JsonElement` API inspects, modifies, and builds JSON structures directly before converting them to a Kotlin type or string.

## Signature / Usage

```kotlin
import kotlinx.serialization.*
import kotlinx.serialization.json.*

fun main() {
    val element = Json.parseToJsonElement("""
        {"name":"kotlinx.serialization","language":"Kotlin"}
    """)
    // JsonElement.toString() gives you a valid JSON string
    println(element)
    // {"name":"kotlinx.serialization","language":"Kotlin"}
}
```

## Types and accessors

| Type / API | Description |
| --- | --- |
| `JsonPrimitive` | Strings, numbers, booleans, and `null`; stores a string `content`. `null` is the subclass `JsonNull` |
| `JsonArray` | A Kotlin `List` of `JsonElement` |
| `JsonObject` | A Kotlin `Map` with `String` keys and `JsonElement` values |
| `jsonPrimitive` / `jsonArray` / `jsonObject` | Cast extension properties; throw `IllegalArgumentException` on mismatch |
| `int`, `intOrNull`, `long`, `longOrNull` | `JsonPrimitive` extension properties |
| `Json.parseToJsonElement()` | Parse a string into an element tree |
| `Json.decodeFromJsonElement<T>()` | Decode an element into a serializable object |
| `JsonPrimitive(...)`, `JsonArray()`, `JsonObject()` | Constructors |
| `buildJsonArray()`, `buildJsonObject()` | Builder DSLs (`put`, `putJsonObject`, `putJsonArray`, `addJsonObject`) |
| `JsonUnquotedLiteral()` | Encode arbitrary unquoted content (Experimental) |

Sum values from a known structure:

```kotlin
val sum = element
    // Accesses the forks key from the JsonObject
    .jsonObject["forks"]!!

    // Accesses the value as a JsonArray and sums the votes values from each JsonObject as Int
    .jsonArray.sumOf { it.jsonObject["votes"]?.jsonPrimitive?.int ?: 0 }
```

Unknown structure:

```kotlin
fun processElement(element: JsonElement): String = when (element) {
    is JsonObject -> "JsonObject with keys: ${element.keys}"
    is JsonArray -> "JsonArray with ${element.size} elements"
    is JsonPrimitive -> "JsonPrimitive with content: ${element.content}"
}
```

Build:

```kotlin
val element = buildJsonObject {
    // Adds a simple key-value pair to the JsonObject
    put("name", "kotlinx.serialization")
    // Adds a nested JsonObject under the owner key
    putJsonObject("owner") {
        put("name", "kotlin")
    }
    // Adds a JsonArray with multiple JsonObjects
    putJsonArray("forks") {
        // Adds a JsonObject to the JsonArray
        addJsonObject {
            put("votes", 42)
        }
        addJsonObject {
            put("votes", 9000)
        }
    }
}
```

Literal content for arbitrary-precision numbers (`JsonPrimitive(Double)` truncates; `JsonPrimitive(String)` becomes a JSON string):

```kotlin
@OptIn(ExperimentalSerializationApi::class)
val piJsonLiteral = JsonUnquotedLiteral(pi.toString())
// "pi_literal": 3.141592653589793238462643383279
```

Decode back by reading `piObject["pi_literal"]!!.jsonPrimitive.content` and constructing `BigDecimal(...)`.

## Notes

- `JsonUnquotedLiteral("null")` throws `JsonEncodingException`; use `JsonNull` for a JSON null literal.
- The builder DSLs are similar to Kotlin's standard library collection builders with JSON-specific overloads.
- For reusable approaches to number handling, see the transform JSON page.

## Related

- [JSON serialization overview](./serialization-configure-json-serialization.md)
- [Transform JSON structure](./serialization-transform-json.md)
- [Serialize classes](./serialization-customization-options.md)
