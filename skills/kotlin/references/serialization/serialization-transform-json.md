---
source: https://kotlinlang.org/docs/serialization-transform-json.html
---

# Transform JSON structure

`JsonTransformingSerializer` modifies JSON by working on the element tree instead of using `Encoder` / `Decoder` manually. `JsonContentPolymorphicSerializer` selects a subtype from JSON content.

## Signature / Usage

```kotlin
@Serializable
data class Project(
    val name: String,
    // Specifies UserListSerializer to handle the serialization of the users property
    @Serializable(with = UserListSerializer::class)
    val users: List<User>
)

@Serializable
data class User(val name: String)

// Creates a serializer that transforms the results of the default List serializer
object UserListSerializer : JsonTransformingSerializer<List<User>>(ListSerializer(User.serializer())) {
    override fun transformDeserialize(element: JsonElement): JsonElement =
        // If the element is not a JsonArray, wraps it into a single-element array
        if (element !is JsonArray) JsonArray(listOf(element)) else element
}
```

`JsonTransformingSerializer` is an abstract `KSerializer` offering `transformSerialize()` and `transformDeserialize()` to override.

### Recipes

Unwrap a single-element array during serialization:

```kotlin
object UserListSerializer : JsonTransformingSerializer<List<User>>(ListSerializer(User.serializer())) {

    override fun transformSerialize(element: JsonElement): JsonElement {
        require(element is JsonArray)
        // Unwraps single-element lists into a single JSON object
        return element.singleOrNull() ?: element
    }
}
```

Omit a property with a specific value:

```kotlin
object ProjectSerializer : JsonTransformingSerializer<Project>(Project.serializer()) {
    override fun transformSerialize(element: JsonElement): JsonElement =
        // Omits the language property if its value is "Kotlin"
        JsonObject(element.jsonObject.filterNot {
            (k, v) -> k == "language" && v.jsonPrimitive.content == "Kotlin"
        })
}
// Json.encodeToString(ProjectSerializer, data)
```

Select a subtype by JSON content when there is no class discriminator:

```kotlin
// Creates a custom serializer that selects deserializer based on the presence of "owner"
object ProjectSerializer : JsonContentPolymorphicSerializer<Project>(Project::class) {
    override fun selectDeserializer(element: JsonElement) = when {
        // Selects the OwnedProject serializer if the JSON object contains an "owner" key
        "owner" in element.jsonObject -> OwnedProject.serializer()
        else -> BasicProject.serializer()
    }
}
```

Add custom behavior to the default serializer with `@KeepGeneratedSerializer` (Experimental) and `generatedSerializer()`:

```kotlin
@OptIn(ExperimentalSerializationApi::class)
@KeepGeneratedSerializer
@Serializable(with = UserNameSerializer::class)
// Defines a type with a name property
data class User(val name: String)

// Adds custom logic to the default serializer to combine input properties during deserialization
object UserNameSerializer : JsonTransformingSerializer<User>(User.generatedSerializer()) {
    override fun transformDeserialize(element: JsonElement): JsonElement {
        val jsonObject = element.jsonObject
        val first = jsonObject["firstName"]?.jsonPrimitive?.content
        val last = jsonObject["lastName"]?.jsonPrimitive?.content

        // Combines input properties into the name property
        // if the input doesn't match the expected structure
        return if (first != null && last != null) {
            JsonObject(mapOf("name" to JsonPrimitive("$first $last")))
        } else {
            jsonObject
        }
    }
}
```

### Custom JSON-specific serialization logic

Cast `Encoder` to `JsonEncoder` and `Decoder` to `JsonDecoder` to use `decodeJsonElement()` and `encodeJsonElement()`. Both expose a `json` property for `encodeToJsonElement()` / `decodeFromJsonElement()`, enabling two-stage conversions (decode to `JsonElement`, then to a Kotlin value; or the reverse).

```kotlin
class ResponseSerializer<T>(
    private val dataSerializer: KSerializer<T>
) : KSerializer<Response<T>> {
    // Deserializes a Response value from JSON
    override fun deserialize(decoder: Decoder): Response<T> {
        // Ensures that the decoder is a JsonDecoder
        require(decoder is JsonDecoder)

        // Decodes the input into a JsonElement
        val element = decoder.decodeJsonElement()

        // Converts the JsonElement into the corresponding Response value
        return if (element is JsonObject && "error" in element) {
            Response.Error(element["error"]!!.jsonPrimitive.content)
        } else {
            Response.Ok(
                decoder.json.decodeFromJsonElement(dataSerializer, element)
            )
        }
    }
    // serialize() builds a JsonElement and calls encoder.encodeJsonElement(element)
}
```

Preserving unknown JSON attributes: a custom serializer reads `jsonInput.decodeJsonElement().jsonObject`, extracts known properties, and keeps the rest in a `JsonObject` field.

## Notes

- When serializing an object directly, pass the custom serializer to `encodeToString()` explicitly (for example `Json.encodeToString(ProjectSerializer, data)`).
- `JsonContentPolymorphicSerializer` does not require a `sealed` class; when serializing it uses the serializer of the value's runtime type (registered in a `SerializersModule` or the default), so no discriminator is written.
- These sections build on the concepts in the create-and-use-serializers page.
- `@KeepGeneratedSerializer` is Experimental.

## Related

- [Create and use serializers](./serialization-create-and-use-serializers.md)
- [JSON elements](./serialization-json-elements.md)
- [Serialize polymorphic classes](./serialization-polymorphism.md)
