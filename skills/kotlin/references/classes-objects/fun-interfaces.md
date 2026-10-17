---
source: https://kotlinlang.org/docs/fun-interfaces.html
---

# Functional (SAM) interfaces

An interface with exactly one abstract member function is a functional (Single Abstract Method, SAM) interface. Declare it with the `fun` modifier; it may have several non-abstract members.

## Signature / Usage

```kotlin
fun interface IntPredicate {
    fun accept(i: Int): Boolean
}

// SAM conversion: lambda instead of an anonymous object
val isEven = IntPredicate { it % 2 == 0 }

fun main() {
    println("Is 7 even? - ${isEven.accept(7)}")
}
```

Without SAM conversion the equivalent is:

```kotlin
val isEven = object : IntPredicate {
    override fun accept(i: Int): Boolean {
        return i % 2 == 0
    }
}
```

### Pass callable references to SAM parameters

```kotlin
fun interface Action {
    fun run()
}

fun execute(action: Action) {
    action.run()
}

fun start() {
    println("Run from a callable reference")
}

fun main() {
    // Kotlin converts the lambda to an Action instance
    execute { start() }

    // Kotlin adapts the reference to an Action instance
    execute(::start)
}
```

### Migration from an interface with constructor function

Starting from 1.6.20, callable references to functional interface constructors are supported. Replace

```kotlin
interface Printer {
    fun print()
}

fun Printer(block: () -> Unit): Printer = object : Printer {
    override fun print() = block()
}
```

with

```kotlin
fun interface Printer {
    fun print()
}
```

The constructor is created implicitly, so `documentsStorage.addPrinter(::Printer)` compiles. Preserve binary compatibility by marking the legacy function with `@Deprecated(message = "...", level = DeprecationLevel.HIDDEN)`.

### Functional interfaces vs. type aliases

```kotlin
typealias IntPredicate = (i: Int) -> Boolean

val isEven: IntPredicate = { it % 2 == 0 }
```

## Notes

- Type aliases only name existing types; functional interfaces create a new type, so extensions can be specific to one functional interface. Type aliases have one member; functional interfaces can have multiple non-abstract members plus one abstract member, and can implement or extend other interfaces.
- Functional interfaces are more flexible but can cost more syntactically and at runtime (conversion to a specific interface). If an API accepts any function with given parameter/return types, use a functional type or a type alias; if it accepts a richer entity with non-trivial contracts, declare a functional interface.
- SAM conversions also apply to Java interfaces (see Java interop).

## Related

- [Interfaces](./interfaces.md)
- Lambdas
- Type aliases
- Java interop
