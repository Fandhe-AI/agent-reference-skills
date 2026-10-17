---
source: https://kotlinlang.org/docs/serialization-polymorphism.html
---

# Serialization: Polymorphism

Serialize a sealed hierarchy with a stable `@SerialName`, and register subclasses of an open base class in a `SerializersModule`.

Closed polymorphism with a sealed class:

```kotlin
import kotlinx.serialization.*
import kotlinx.serialization.json.*

@Serializable
sealed class Project {
    abstract val name: String
}

@Serializable
@SerialName("owned")
class OwnedProject(override val name: String, val owner: String) : Project()

fun main() {
    val data: Project = OwnedProject("kotlinx.coroutines", "kotlin")
    println(Json.encodeToString(data))
    // {"type":"owned","name":"kotlinx.coroutines","owner":"kotlin"}
}
```

Open polymorphism with a `SerializersModule`:

```kotlin
import kotlinx.serialization.*
import kotlinx.serialization.json.*
import kotlinx.serialization.modules.*

// Defines a SerializersModule
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

fun main() {
    // Uses Project as the static type to make use of polymorphism
    val data: Project = OwnedProject("kotlinx.coroutines", "kotlin")

    println(format.encodeToString(data))
    // {"type":"owned","name":"kotlinx.coroutines","owner":"kotlin"}
}
```

## Notes

- Serialization is static: only properties of the declared static type are encoded, and the `type` discriminator appears only when the base type is the static type. Force it with `Json.encodeToString<Project>(data)`.
- Reusing the same `@SerialName` within one polymorphic hierarchy throws `IllegalStateException`; reuse across separate hierarchies is allowed but discouraged by the official docs because it can cause subtle serialization issues.
- The official docs describe the open-polymorphism example as JVM-only, but with a `@Serializable abstract class` base such as `Project`, `encodeToString<Project>()` works on all targets. An explicit `format.encodeToString(PolymorphicSerializer(Project::class), data)` on Kotlin/JS and Kotlin/Native is needed only when the base type is an interface (and for implicitly serializable enums) (kotlinx.serialization issue 1077).
- In open polymorphism, a non-sealed interface is not annotated with `@Serializable`; it uses `PolymorphicSerializer` by default (sealed interfaces can be `@Serializable` bases for closed polymorphism).
