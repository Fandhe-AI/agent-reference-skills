---
source: https://kotlinlang.org/docs/serialization-json-configuration.html
---

# Customize the Json instance

The default `Json` instance strictly follows the JSON specification and the Kotlin class declarations. Create a custom instance with the `Json { }` builder to enable flexible features.

## Signature / Usage

```kotlin
// Creates a Json instance based on the default configuration, allowing special floating-point values
val customJson = Json {
    allowSpecialFloatingPointValues = true
}

// Use the customJson instance with the same syntax as the default one to encode a string
val jsonString = customJson.encodeToString(Data(Double.NaN))
println(jsonString)
```

Build on an existing instance:

```kotlin
// Creates a new instance based on an existing Json
val lenientJson = Json(customJson) {
    isLenient = true
    prettyPrint = true
}
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `encodeDefaults` | Boolean | `false` | Encode properties equal to their default values |
| `explicitNulls` | Boolean | `true` | When `false`, omit `null` values on encoding; missing nullable properties without defaults decode as `null` |
| `allowStructuredMapKeys` | Boolean | `false` | Encode maps with class keys as an array `[key1, value1, key2, value2,...]` |
| `allowSpecialFloatingPointValues` | Boolean | `false` | Allow `NaN` and infinities (non-standard JSON) |
| `classDiscriminator` | String | `type` | Key name identifying the subtype of polymorphic objects |
| `classDiscriminatorMode` | `ClassDiscriminatorMode` | `POLYMORPHIC` | `POLYMORPHIC`, `ALL_JSON_OBJECTS`, or `NONE` |
| `prettyPrint` | Boolean | `false` | Indent and break lines |
| `prettyPrintIndent` | String | four spaces | Indentation used by pretty printing (any allowed whitespace such as `\t` or `\n`) |
| `ignoreUnknownKeys` | Boolean | `false` | Ignore keys not present in the class |
| `coerceInputValues` | Boolean | `false` | Treat `null` for non-nullable types and unknown enum values as missing |
| `allowTrailingComma` | Boolean | `false` | Accept trailing commas |
| `allowComments` | Boolean | `false` | Accept `//` line comments and `/* */` block comments |
| `isLenient` | Boolean | `false` | Allow unquoted keys, strings, and enum values |
| `useAlternativeNames` | Boolean | `true` | Enables `@JsonNames`; set `false` for performance if unused |
| `decodeEnumsCaseInsensitive` | Boolean | `false` | Decode enum values case-insensitively (serial names and `@JsonNames`) |
| `namingStrategy` | `JsonNamingStrategy?` | none | Global serial-name transformation, e.g. `JsonNamingStrategy.SnakeCase` |
| `serializersModule` | `SerializersModule` | — | Contextual and polymorphic registrations |

The Default column is inferred from the page's prose (strict and compact by default, discriminator `type`, `useAlternativeNames` true by default), not from the API reference.

### Examples

Encode defaults:

```kotlin
// Configures a Json instance to encode default values
val format = Json { encodeDefaults = true }
// {"name":"kotlinx.serialization","language":"Kotlin","website":null}
```

Omit explicit nulls (encoding and decoding can become asymmetrical):

```kotlin
// Configures a Json instance to omit null values during serialization
val format = Json { explicitNulls = false }
```

Class discriminator:

```kotlin
// Configures a Json instance to use a custom class discriminator
val format = Json { classDiscriminator = "#class" }
// {"#class":"simple","name":"kotlinx.serialization"}
```

Discriminator on the base class, inherited by all subclasses (Experimental; `@JsonClassDiscriminator` takes priority over the `Json` configuration):

```kotlin
@Serializable
@OptIn(ExperimentalSerializationApi::class)
@JsonClassDiscriminator("message_type")
sealed class Base
```

Discriminator mode:

```kotlin
// Configures a Json instance to omit the class discriminator from the output
val format = Json { classDiscriminatorMode = ClassDiscriminatorMode.NONE }
```

Ignore unknown keys, globally or per class (`@JsonIgnoreUnknownKeys` is Experimental; opt in with `@OptIn(ExperimentalSerializationApi::class)` or `-opt-in=kotlinx.serialization.ExperimentalSerializationApi`):

```kotlin
@OptIn(ExperimentalSerializationApi::class)
@Serializable
// Unknown properties in Outer are ignored during deserialization
@JsonIgnoreUnknownKeys
data class Outer(val a: Int, val inner: Inner)
```

Coerce input values, combined with `explicitNulls` for invalid enum values:

```kotlin
val json = Json { 
  coerceInputValues = true
  explicitNulls = false
}
```

Alternative names and naming strategy:

```kotlin
@Serializable
// Maps both name and title JSON properties to the name property
data class Project(@JsonNames("title") val name: String)

// Configures a Json instance to apply SnakeCase naming strategy
val format = Json { namingStrategy = JsonNamingStrategy.SnakeCase }
```

## Notes

- `Json` instances are immutable and thread-safe; store them in a top-level property. Reusing instances improves performance by caching class-specific information.
- `coerceInputValues` currently applies to `null` for non-nullable types and unknown enum values; the list may be expanded in future versions, making instances more permissive. Missing values are replaced with defaults if present; enums become `null` only if no default is defined, `explicitNulls` is `false`, and the property is nullable.
- Without a discriminator (`ClassDiscriminatorMode.NONE`), the base class serializer cannot deserialize the output back into the appropriate type. You cannot specify different discriminators in subclasses of a sealed base class.
- A global `namingStrategy` applies to all properties, including those with `@SerialName` (use `@JsonNames` to keep specific names); conflicts with transformed names or `@JsonNames` fail deserialization; and the strategy is implicit, which hampers Find Usages, rename, and grep.
- `ignoreUnknownKeys` also ignores keys marked `@Transient` in the input.
- This is the kotlinx.serialization `Json` builder, not a JS schema library such as zod.

## Related

- [JSON serialization overview](./serialization-configure-json-serialization.md)
- [Serialize classes](./serialization-customization-options.md)
- [Serialize polymorphic classes](./serialization-polymorphism.md)
- [JSON elements](./serialization-json-elements.md)
