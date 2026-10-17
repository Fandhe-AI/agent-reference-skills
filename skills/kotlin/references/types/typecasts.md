---
source: https://kotlinlang.org/docs/typecasts.html
---

# Type checks and casts

In Kotlin, you can check at runtime whether an object is a specific type (`is` / `!is`), or convert it to another type (smart casts, `as`, `as?`).

## Signature / Usage

```kotlin
fun main() {
    val input: Any = "Hello, Kotlin"

    if (input is String) {
        println("Message length: ${input.length}")
        // Message length: 13
    }

    if (input !is String) { // Same as !(input is String)
        println("Input is not a valid message")
    }
}
```

Checking against a supertype of the declared type is not worthwhile because the answer is always true.

### Smart casts

The compiler tracks type checks and explicit casts for immutable values and inserts implicit (safe) casts automatically. It also knows a cast is safe if a negative check leads to a return:

```kotlin
fun logMessage(data: Any) {
    // data is automatically cast to String
    if (data !is String) return

    println("Received text: ${data.length} characters")
}
```

#### Control flow

Smart casts work for `if`, `when`, and `while`:

```kotlin
fun processInput(data: Any) {
    when (data) {
        // data is automatically cast to Int
        is Int -> println("Log: Assigned new ID ${data + 1}")
        // data is automatically cast to String
        is String -> println("Log: Received message \"$data\"")
        // data is automatically cast to IntArray
        is IntArray -> println("Log: Processed scores, total = ${data.sum()}")
    }
}
```

If you declare a `Boolean` variable before using it in an `if`, `when`, or `while` condition, information collected by the compiler about the variable is available for smart-casting in the block:

```kotlin
fun petAnimal(animal: Any) {
    val isCat = animal is Cat
    if (isCat) {
        // animal was smart-cast to the type Cat
        animal.purr()
    }
}
```

#### Logical operators

The compiler can smart cast the right-hand side of `&&` or `||` when there is a type check on the left-hand side:

```kotlin
// x is automatically cast to String on the right-hand side of `||`
if (x !is String || x.length == 0) return

// x is automatically cast to String on the right-hand side of `&&`
if (x is String && x.length > 0) {
    print(x.length) // x is automatically cast to String
}
```

With `&&`, the compiler smart-casts to all checked types simultaneously (intersection types). With `||`, a smart cast is made to the closest common supertype:

```kotlin
interface Status {
    fun signal() {}
}

interface Ok : Status
interface Postponed : Status
interface Declined : Status

fun signalCheck(signalStatus: Any) {
    if (signalStatus is Postponed || signalStatus is Declined) {
        // signalStatus is smart-cast to a common supertype Status
        signalStatus.signal()
    }
}
```

The common supertype is an approximation of a union type. Union types are not currently supported in Kotlin.

#### Intersection types

When the compiler smart-casts an object through multiple `&&` checks, it infers an intersection type, an internal type that simultaneously satisfies all the checked constraints:

```kotlin
fun describe(animal: Any) {
    // Infers the Bird and Fish types
    if (animal is Bird && animal is Fish) {
        // Accesses fly() and swim() without additional checks or casts
        animal.fly()
        animal.swim()
    }
}
```

Intersection types are non-denotable; you may see them in compiler messages and IDE tooltips as `A & B`. The one exception is `T & Any`, which declares a definitely non-nullable type and is reserved to combine a type parameter with `Any`:

```kotlin
fun  <T> T.assertNotNull(): T & Any = this ?: throw IllegalStateException("null value")
```

#### Inline functions

Inline functions are treated as having an implicit `callsInPlace` contract, so the compiler can smart-cast variables captured within lambdas passed to inline functions:

```kotlin
inline fun inlineAction(f: () -> Unit) = f()

fun runProcessor(): Processor? {
    var processor: Processor? = null
    inlineAction {
        // If processor isn't null, processor is smart-cast
        if (processor != null) {
            processor.process()
        }
        processor = nextProcessor()
    }
    return processor
}
```

#### Exception handling

Smart cast information is passed on to `catch` and `finally` blocks. After `stringInput = null` inside `try`, the compiler discards the previous smart cast, so `stringInput` stays nullable in `catch` (`println(stringInput?.length)`).

#### Smart cast prerequisites

Smart casts work only when the compiler can guarantee that the variable won't change between the check and its usage:

| Variable kind | Condition |
| --- | --- |
| `val` local variables | Always, except local delegated properties |
| `val` properties | If the property is `private`, `internal`, or the check is performed in the same module where the property is declared. Not on `open` properties or properties with custom getters |
| `var` local variables | If the variable is not modified between the check and its usage, is not captured in a lambda that modifies it, and is not a local delegated property |
| `var` properties | Never, because the variable can be modified at any time by other code |

### `as` and `as?` cast operators

If a cast fails with `as`, a `ClassCastException` is thrown at runtime (the unsafe operator). With `as?`, the operator returns `null` when the cast fails (the safe operator).

```kotlin
val rawInput: Any = "user-1234"

val userId = rawInput as String       // OK
val wrongCast = rawInput as Int       // throws ClassCastException

val safeCast = rawInput as? Int       // null
```

You can use `as` with a nullable type (`as String?`); the result can be `null`, but it still throws `ClassCastException` if the cast is unsuccessful. `as?` is the safer option:

```kotlin
val config: Map<String, Any?> = mapOf(
    "username" to "kodee",
    "alias" to null,
    "loginAttempts" to 3
)

val username: String? = config["username"] as String?
val safeAttempts: String? = config["loginAttempts"] as? String
// null
```

#### Up and downcasting

Upcasting (to a superclass) needs no special syntax or cast operators. Downcasting (to a subclass) can be unsafe, so use explicit cast operators; prefer `as?` to return `null` on failure:

```kotlin
val animal: Animal = Dog()

// Safely downcasts animal to Dog type
val dog: Dog? = animal as? Dog

// Uses a safe call to call bark() if dog isn't null
dog?.bark()
```

Downcasting is used in serialization when deserializing a base class to a specific subtype, and when working with Java libraries that return supertype objects.

## Notes

- For generics type checks and casts (`List<T>`, `Map<K,V>`, type erasure, unchecked casts), see [generics.md](./generics.md).
- To identify the type of an object at runtime, see [Reflection](../stdlib/reflection.md).

## Related

- [Generics](./generics.md)
- [Types overview](./types-overview.md)
