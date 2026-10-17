---
source: https://kotlinlang.org/docs/sealed-classes.html
---

# Sealed classes and interfaces

Sealed classes and interfaces give controlled inheritance: all direct subclasses are known at compile time, and none can appear outside the module and package where the sealed type is defined. Combined with `when`, the compiler checks exhaustiveness.

## Signature / Usage

```kotlin
// Create a sealed interface
sealed interface Error

// Create a sealed class that implements sealed interface Error
sealed class IOError(): Error

// Define subclasses that extend sealed class 'IOError'
class FileReadError(val file: File): IOError()
class DatabaseError(val source: DataSource): IOError()

// Create a singleton object implementing the 'Error' sealed interface
object RuntimeError : Error
```

### Constructors

A sealed class is always an abstract class and can't be instantiated directly; its constructors serve its subclasses. Constructor visibility is `protected` (default) or `private`; `public` and `internal` are not allowed.

```kotlin
sealed class IOError {
    // protected by default: visible inside this class and its subclasses
    constructor() { /*...*/ }

    // Private constructor, visible inside this class only
    private constructor(description: String): this() { /*...*/ }

    // This will raise an error because public and internal constructors are not allowed in sealed classes
    // public constructor(code: Int): this() {}
}
```

### Inheritance

```kotlin
// Sealed interface 'Error' has implementations only in the same package and module
sealed interface Error

// Sealed class 'IOError' extends 'Error' and is extendable only within the same package
sealed class IOError(): Error

// Open class 'CustomError' extends 'Error' and can be extended anywhere it's visible
open class CustomError(): Error
```

`enum` classes can't extend a sealed class, but they can implement sealed interfaces:

```kotlin
sealed interface Error

enum class ErrorType : Error {
    FILE_ERROR, DATABASE_ERROR
}
```

### Use with when

```kotlin
sealed class Error {
    class FileReadError(val file: String): Error()
    class DatabaseError(val source: String): Error()
    object RuntimeError : Error()
}

fun log(e: Error) = when(e) {
    is Error.FileReadError -> println("Error while reading file ${e.file}")
    is Error.DatabaseError -> println("Error while reading from database ${e.source}")
    Error.RuntimeError -> println("Runtime error")
    // No `else` clause is required because all the cases are covered
}
```

### Inspect sealed subclasses with reflection

```kotlin
sealed interface Status
data class Send(val message: String) : Status
data object Start : Status
data object Stop : Status

fun main() {
    val subclasses = Status::class.sealedSubclasses
    println(subclasses.mapNotNull { it.simpleName })
    // [Send, Start, Stop]

    val singletonStatus = subclasses.mapNotNull { subclass -> subclass.objectInstance }
    println(singletonStatus)
    // [Start, Stop]
}
```

`sealedSubclasses` returns `KClass` values; `objectInstance` returns the singleton instance for object declarations (null for regular classes). If a direct subclass is also sealed, traverse its `sealedSubclasses` recursively.

### Use cases

```kotlin
sealed class UIState {
    data object Loading : UIState()
    data class Success(val data: String) : UIState()
    data class Error(val exception: Exception) : UIState()
}

fun updateUI(state: UIState) {
    when (state) {
        is UIState.Loading -> showLoadingIndicator()
        is UIState.Success -> showData(state.data)
        is UIState.Error -> showError(state.exception)
    }
}
```

The official page also shows payment-method handling (`Payment` with `CreditCard` / `PayPal` / `Cash`) and an API request-response example using Ktor resources and `@Serializable`.

## Notes

- Direct subclasses must be declared in the same package; they may be top-level or nested in any number of named classes, interfaces, or objects. They must have a properly qualified name (not local or anonymous). Visibility follows normal inheritance rules. Restrictions don't apply to indirect subclasses.
- Multiplatform: direct subclasses of a sealed class must reside in the same source set (for sealed classes without `expect` / `actual`). If a sealed class is `expect` in common code with `actual` implementations, both versions can have subclasses in their source sets; with a hierarchical structure, subclasses can live in any source set between the `expect` and `actual` declarations. A `when` over an `expect` sealed class in common code still needs an `else` branch.
- Context-sensitive resolution (omit the type name when matching sealed class members if the expected type is known) is currently in preview (introduced in What's new in Kotlin 2.2.0).
- `when` with sealed classes also supports guard conditions for extra checks in a single branch.
- Java 15 introduced a similar concept using the `sealed` keyword with a `permits` clause.

## Related

- [Enum classes](./enum-classes.md)
- [Data classes](./data-classes.md)
- [Inheritance](./inheritance.md)
- [Control flow](../basics/control-flow.md)
- Reflection
