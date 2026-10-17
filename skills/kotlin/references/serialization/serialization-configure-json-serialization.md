---
source: https://kotlinlang.org/docs/serialization-configure-json-serialization.html
---

# JSON serialization overview

The `Json` class is the primary tool for converting Kotlin objects to JSON and back. Use the default instance for basic tasks or a configured instance for specific behaviors.

## Signature / Usage

```kotlin
import kotlinx.serialization.*
import kotlinx.serialization.json.*

@Serializable
data class User(val name: String, val age: Int)

fun main() {
    // Uses the default Json instance
    val json = Json

    // Creates a User object
    val user = User("Alice", 30)

    // Converts the User object to a JSON string
    val jsonString = json.encodeToString(user)
    println(jsonString)
    // {"name":"Alice","age":30}

    // Converts the JSON string back to a User object
    val deserializedUser = json.decodeFromString<User>(jsonString)
    println(deserializedUser)
    // User(name=Alice, age=30)
}
```

### With `Json` you can

| Task | API |
| --- | --- |
| Serialize to a string | `encodeToString()` |
| Deserialize from a string | `decodeFromString()` |
| Work with `JsonElement` | `encodeToJsonElement()` / `decodeFromJsonElement()` |
| Serialize I/O sources (Experimental) | JVM streams, kotlinx-io and Okio types, without intermediate strings |

A customized instance:

```kotlin
// Configures a Json instance to ignore unknown keys
val customJson = Json {
    ignoreUnknownKeys = true
}
```

## Notes

- Import `kotlinx.serialization.*` and `kotlinx.serialization.json.*`.
- The I/O source extension functions are Experimental.

## Related

- [Customize the Json instance](./serialization-json-configuration.md)
- [JSON elements](./serialization-json-elements.md)
- [Transform JSON structure](./serialization-transform-json.md)
- [Serialize JSON with I/O sources](./serialization-json-io-sources.md)
