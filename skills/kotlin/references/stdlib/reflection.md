---
source: https://kotlinlang.org/docs/reflection.html
---

# Reflection

Language and library features for introspecting program structure at runtime: read or update a property, call a function, or invoke a constructor when declarations are unknown at compile time. Reflection objects describe declarations, not values.

## Signature / Usage

```kotlin
import kotlin.reflect.KClass

class User(val name: String)

open class Language
class Kotlin : Language()

fun main() {
    // Returns a KClass that represents User.
    val userClass: KClass<User> = User::class
    println(userClass.simpleName)
    // User

    val language: Language = Kotlin()

    // Returns a KClass that represents
    // the concrete class of the value at runtime
    val runtimeClass: KClass<out Language> = language::class
    println(runtimeClass.simpleName)
    // Kotlin
}
```

### Packages and dependency

| Package | Contents |
| --- | --- |
| `kotlin.reflect` | Part of the standard library; core reflection types and functions (`KClass`, `KType`, `KCallable`). |
| `kotlin.reflect.full` | Extensions for inspecting Kotlin declarations (needs `kotlin-reflect`). |
| `kotlin.reflect.jvm` | JVM-specific extensions connecting Kotlin and Java reflection. |

```kotlin
dependencies {
    implementation(kotlin("reflect"))
}
```

Maven: `org.jetbrains.kotlin:kotlin-reflect` with `<version>${kotlin.version}</version>`. The command-line compiler adds `kotlin-reflect.jar` by default; exclude it with `-no-reflect`.

### Types, casts, members

- `typeOf<T>()` returns a `KType` including type arguments and nullability; `KClass` does not preserve them (`List<String>` and `List<Int>` share `List::class`).
- For a class stored in a `KClass`: `isInstance()` checks, `cast()` returns the typed value or throws, `safeCast()` returns `null` on mismatch.
- `KClass.members` lists functions and properties including inherited ones. More specific selectors in `kotlin.reflect.full`:

| Property | Returns |
| --- | --- |
| `declaredMembers` | Functions and properties declared directly in the class, excluding inherited declarations |
| `functions` | All functions available from the class: non-static functions from the class and its superclasses, and static functions declared in the class |
| `declaredFunctions` | All functions declared in the class |
| `memberFunctions` | Non-extension, non-static functions declared in the class and its superclasses |
| `declaredMemberFunctions` | Non-extension, non-static functions declared in the class |
| `memberExtensionFunctions` | Extension functions declared as members of the class or its superclasses |
| `declaredMemberExtensionFunctions` | Extension functions declared in the class |
| `staticFunctions` | Static functions declared in the class |
| `memberProperties` | Non-extension properties declared in the class and its superclasses |
| `declaredMemberProperties` | Non-extension properties declared in the class |
| `memberExtensionProperties` | Extension properties declared as members of the class or its superclasses |
| `declaredMemberExtensionProperties` | Extension properties declared as members in the class. |
| `staticProperties` | Properties representing static fields declared in Java classes |

```kotlin
import kotlin.reflect.full.memberProperties

data class User(val name: String, val age: Int)

fun readProperty(instance: Any, propertyName: String): Any? {
    // Inspect the runtime class
    val runtimeClass = instance::class

    // Find the property declaration
    val property = runtimeClass.memberProperties
        .firstOrNull { it.name == propertyName }
        ?: error("Unknown property: $propertyName")

    // Call the getter with the object as a receiver
    return property.getter.call(instance)
}
```

Calling functions: `call(receiver, args...)` for ordered arguments; `callBy(mapOf(parameter to value))` to match `KParameter` objects or use default values.

```kotlin
import kotlin.reflect.full.instanceParameter
import kotlin.reflect.full.memberFunctions
import kotlin.reflect.full.valueParameters

class Greeter {
    fun greet(name: String, punctuation: String = "!") =
        "Hello, $name$punctuation"
}

fun main() {
    val greeter = Greeter()
    val function = Greeter::class.memberFunctions
        .single { it.name == "greet" }

    val nameParameter = function.valueParameters
        .single { it.name == "name" }

    val result = function.callBy(
        mapOf(
            function.instanceParameter!! to greeter,
            nameParameter to "Kotlin"
        )
    )

    println(result)
    // Hello, Kotlin!
}
```

### Java reflection interoperability

```kotlin
import kotlin.reflect.jvm.*

class User(val name: String)

fun main() {
    println(User::name.javaGetter)
    // public final java.lang.String User.getName()

    println(User::name.javaField)
    // private final java.lang.String User.name
}
```

`javaGetter` / `javaField` return `null` when no matching Java object exists. The `.kotlin` extension property converts a Java `Class` to `KClass`.

## Notes

- Reflection support differs between platforms; this page aligns with the Kotlin/JVM reflection API.
- On the JVM, a type created by `typeOf` has no annotations even if the source type is annotated.
- If a property is known at compile time, use direct access or a callable reference instead of reflection.
- `call()` and `callBy()` return `Any?` and report an incompatible receiver or argument at runtime.
- Use `call()` when the full ordered argument list is available; `callBy()` when matching `KParameter` objects or using default values.

## Related

- [Kotlin Metadata JVM library](./metadata-jvm.md)
- [Scope functions](./scope-functions.md)
