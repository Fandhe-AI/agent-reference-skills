---
source: https://kotlinlang.org/docs/serialization-polymorphism.html
---

# Serialize polymorphic classes

Kotlin serialization is static by default: only properties of the declared (static) type are serialized. Polymorphism is supported via closed hierarchies (sealed) or open hierarchies (registered in a `SerializersModule`).

## Signature / Usage

```kotlin
import kotlinx.serialization.*
import kotlinx.serialization.json.*

// Defines a sealed class as the base type
@Serializable
sealed class Project {
    abstract val name: String
}

// Marks the subclass as serializable
@Serializable
class OwnedProject(override val name: String, val owner: String) : Project()

fun main() {
    // Uses the base type as the static type
    val data: Project = OwnedProject("kotlinx.coroutines", "kotlin")

    // A type property is added to identify the serialized subclass
    println(Json.encodeToString(data))
    // {"type":"OwnedProject","name":"kotlinx.coroutines","owner":"kotlin"}
}
```

## Closed polymorphism

- Use a `sealed` class or interface as base type; mark it and all subclasses `@Serializable`.
- The `type` property is the class discriminator by default and appears only when the base class is the static type. With the subclass as static type it is omitted; pass the base type explicitly: `Json.encodeToString<Project>(data)`.
- The discriminator value is the fully qualified class name by default; define a stable one with `@SerialName("owned")`. Each serializable class must have a unique `@SerialName` (same name in one hierarchy throws `IllegalStateException`; reuse across hierarchies can cause subtle issues).
- Base class properties with backing fields are serialized with subclass properties.
- `object` subclasses annotated `@Serializable` are serialized like classes without properties (`{"type":"EmptyResponse"}`).

## Open polymorphism

For `open` / `abstract` classes and interfaces whose subclasses are not all known at compile time: register them in a `SerializersModule` with `polymorphic()` and `subclass()`, then pass it to `Json { serializersModule = module }`.

```kotlin
val module = SerializersModule {

    // Specifies Project as the base type
    polymorphic(Project::class) {

        // Registers OwnedProject as a subclass of Project
        subclass(OwnedProject::class)
    }
}

// Adds the SerializersModule to a Json instance
val format = Json { serializersModule = module }

// Defines the base type used as the static type during serialization
@Serializable
abstract class Project {
    abstract val name: String
}

// Defines a serializable subclass of Project
@Serializable
@SerialName("owned")
class OwnedProject(override val name: String, val owner: String) : Project()
```

| Scenario | API |
| --- | --- |
| Interface as base | Cannot be `@Serializable`; uses `PolymorphicSerializer` by default; mark implementations `@Serializable` and register them |
| Choose any base type (incl. `Any`) | `polymorphic(Any::class) { subclass(...) }` and pass `PolymorphicSerializer(Any::class)` to `encodeToString` |
| Property of non-serializable or `open` type | `@Polymorphic` on the property (`val project: Any`) |
| `open` class polymorphically | `@Serializable @Polymorphic open class Project` |
| Register all implementations of a sealed type | `subclassesOfSealed(Sub.serializer())` or `subclassesOfSealed<Sub>()` (needs `@OptIn(ExperimentalSerializationApi::class)`) |
| Generic subtype | `subclass(OkResponse.serializer(PolymorphicSerializer(Any::class)))` |
| Merge modules | `projectModule + responseModule`, or `include(projectModule)` inside a `SerializersModule` block |
| Unknown subtype on decode | `defaultDeserializer { BasicProject.serializer() }` inside `polymorphic()` |
| Serialize without registering every subtype | `polymorphicDefaultSerializer(Animal::class) { instance -> ... }` returning a `SerializationStrategy` |

Multiple base types for one subclass need explicit registration for each; use a helper:

```kotlin
val module = SerializersModule {
    // Defines a helper function that registers subclasses
    fun PolymorphicModuleBuilder<Project>.registerProjectSubclasses() {
        subclass(OwnedProject::class)
    }

    // Registers the same subclass for each base type Project and  BaseProject
    polymorphic(BaseProject::class) { registerProjectSubclasses() }
    polymorphic(Project::class) { registerProjectSubclasses() }
}
```

Default deserializer example:

```kotlin
val module = SerializersModule {
    polymorphic(Project::class) {
        subclass(OwnedProject::class)
        defaultDeserializer { BasicProject.serializer() }
    }
}
```

## Notes

- Open-polymorphism example with `format.encodeToString(data)` works only on the JVM because of `serializer()` function restrictions. In Kotlin/JS and Kotlin/Native use an explicit serializer: `format.encodeToString(PolymorphicSerializer(Project::class), data)` (tracked in kotlinx.serialization issue 1077). The same applies to interface bases on those platforms.
- If no `PolymorphicSerializer` is supplied for `Any`, `SerializationException: Serializer for class 'Any' is not found.` is thrown.
- Sealed base types do not need explicit configuration for generic subtypes because the compiler plugin can infer the subtype serializer.
- `subclassesOfSealed()` registers recursively; all subclasses must be concrete or sealed, otherwise `IllegalArgumentException`.
- An unregistered subtype fails with `SerializationException`; the default deserializer assumes unknown subtypes follow a known structure. For JSON you can combine it with `ignoreUnknownKeys`; for varying structure use a custom serializer.
- The discriminator key can be changed with `classDiscriminator` in the Json configuration page.

## Related

- [Create and use serializers](./serialization-create-and-use-serializers.md)
- [Customize the Json instance](./serialization-json-configuration.md)
- [Transform JSON structure](./serialization-transform-json.md)
- [Serialize built-in types](./serialization-serialize-builtin-types.md)
