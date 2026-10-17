---
source: https://kotlinlang.org/docs/serialization-customization-options.html
---

# Serialize classes

`@Serializable` enables default serialization of all properties with backing fields. Property-level annotations, defaults, and constructors customize which properties are serialized and how.

## Signature / Usage

```kotlin
import kotlinx.serialization.*
import kotlinx.serialization.json.*
import kotlinx.serialization.EncodeDefault.Mode.NEVER

@Serializable
class Project(
    // Property with a backing field – serialized
    var name: String
) {
    // Property with a backing field – serialized
    var stars: Int = 0

    // Getter-only property without a backing field - not serialized
    val path: String
        get() = "kotlin/$name"

    // Delegated property - not serialized
    var id by ::name
}

fun main() {
    val data = Project("kotlinx.serialization").apply { stars = 9000 }
    // Prints only the name and the stars properties
    println(Json.encodeToString(data))
    // {"name":"kotlinx.serialization","stars":9000}
}
```

### Annotations

| Annotation | Purpose |
| --- | --- |
| `@Serializable` | Generates serialization code; referenced classes must also be `@Serializable` |
| `@EncodeDefault` | Always encode the property, even when it equals its default value, regardless of format settings (`encodeDefaults`) |
| `@EncodeDefault(NEVER)` | Do not encode the property only when its value equals the default, regardless of format settings (non-default values are still encoded); to always exclude a property, use `@Transient` |
| `@Required` | Property must be present in the input even if it has a default value (`MissingFieldException` otherwise) |
| `@SerialName("x")` | Customizes the serial name |
| `@Transient` | Excludes a property; it must have a default value |

### Classes

- Referenced classes must also be `@Serializable`. To reference non-serializable classes, mark the property `@Transient` or provide a custom serializer.
- Repeated object references are encoded once per reference; circular structures cause stack overflow.
- Generic classes such as `Payload<T>` are supported; if `T` is not serializable, a compile-time error results.

```kotlin
@Serializable
class Payload<T>(val value: T)
```

### Optional properties

- Properties with default values are optional on deserialization and may be skipped on serialization. The default JSON configuration skips encoding default values (see `encodeDefaults` in the Json configuration page).
- `null` values of nullable properties with null defaults are not encoded. A `null` for a non-nullable property throws `JsonDecodingException` even if it has a default; to fall back to the default value, enable `coerceInputValues`. Separately, `explicitNulls = false` omits `null` values when encoding and lets missing nullable properties decode as `null`; it does not accept explicit `null` for non-nullable properties.
- When the input includes a value for an optional property, its initializer is not called, so avoid side effects in initializers.

```kotlin
@Serializable
data class Project(val name: String, val language: String = "Kotlin")

fun main() {
    val data = Json.decodeFromString<Project>("""
        {"name":"kotlinx.serialization"}
    """)
    println(data)
    // Project(name=kotlinx.serialization, language=Kotlin)
}
```

`@EncodeDefault` example:

```kotlin
@Serializable
data class Project(
    val name: String,
    // Always includes the language property in the serialized output
    // even if it has the default value "Kotlin"
    @EncodeDefault val language: String = "Kotlin"
)

@Serializable
data class User(
    val name: String,
    // Excludes projects when it's an empty list, even if it has a default value
    @EncodeDefault(NEVER) val projects: List<Project> = emptyList()
)
```

`@Required` example:

```kotlin
@Serializable
// Marks the language property as required
data class Project(val name: String, @Required val language: String = "Kotlin")
```

### Customize class serialization

Serial names:

```kotlin
@Serializable
// Changes the lang property to language using @SerialName
class Project(val name: String, @SerialName("language") val lang: String)
// {"name":"kotlinx.serialization","language":"Kotlin"}
```

Constructor properties: all parameters of the primary constructor of a `@Serializable` class must be properties. For extra initialization logic, use a secondary constructor and keep the primary constructor `private`:

```kotlin
@Serializable
class Project private constructor(val owner: String, val name: String) {
    // Creates a Project object using a path string
    constructor(path: String) : this(
        owner = path.substringBefore('/'),
        name = path.substringAfter('/')
    )

    val path: String
        get() = "$owner/$name"
}
```

Validation: after deserialization the plugin runs the class's initializer blocks, so `init { require(name.isNotEmpty()) { "name cannot be empty" } }` rejects invalid data.

Transient:

```kotlin
@Serializable
// Excludes the language property from serialization
data class Project(val name: String, @Transient val language: String = "Kotlin")
```

## Notes

- Only properties with backing fields are serialized; getter-only and delegated properties are not.
- If the input explicitly specifies a value for a `@Transient` property, even one matching the default, `JsonDecodingException` is thrown. Enable `ignoreUnknownKeys` to avoid exceptions from unknown keys, including transient ones.
- Kotlin serialization encodes plain data; it does not reconstruct arbitrary object graphs with shared references.
- kotlinx.serialization is the Kotlin library; JS schema validation (zod) is unrelated.

## Related

- [Serialize built-in types](./serialization-serialize-builtin-types.md)
- [Create and use serializers](./serialization-create-and-use-serializers.md)
- [Customize the Json instance](./serialization-json-configuration.md)
- [JSON serialization overview](./serialization-configure-json-serialization.md)
