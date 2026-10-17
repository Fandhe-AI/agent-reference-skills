---
source: https://kotlinlang.org/docs/exceptions.html
---

# Exception and error handling

Kotlin treats all exceptions as unchecked: you can catch exceptions but do not need to handle or declare them. Exceptions are subclasses of `Exception`, a subclass of `Throwable`.

## Signature / Usage

### Throw exceptions

```kotlin
throw IllegalArgumentException()

val cause = IllegalStateException("Original cause: illegal state")

// Throws an IllegalArgumentException if userInput is negative
// Additionally, it shows the original cause, represented by the cause IllegalStateException
if (userInput < 0) {
    throw IllegalArgumentException("Input must be non-negative", cause)
}
```

### Precondition functions

```kotlin
fun getIndices(count: Int): List<Int> {
    require(count >= 0) { "Count must be non-negative. You set count to $count." }
    return List(count) { it + 1 }
}

val state = checkNotNull(someState) { "State must be set beforehand!" }
check(state.isNotEmpty()) { "State must be non-empty!" }

when (user.role) {
    "admin" -> println("${user.name} is an admin.")
    else -> error("Undefined role: ${user.role}")
}
```

`require()` and `check()` allow smart casts: after a successful `require(str != null)`, `str` is smart cast to non-nullable `String`.

### try-catch-finally

The exception is caught by the first `catch` block that matches its type or a superclass. `try` is an expression.

```kotlin
val num: Int = try {
    count()
} catch (e: ArithmeticException) {
    -1
}

// Use an underscore when the exception instance is ignored
val userSettings = try {
    File("user-settings.json").readText()
} catch (_: IOException) {
    "{}"
}

try {
    // Code that may throw an exception
}
catch (e: YourException) {
    // Exception handler
}
finally {
    // Code that is always executed
}
```

Order multiple `catch` blocks from the most specific to the least specific exception.

`AutoCloseable` resources: use `.use()` instead of `finally`:

```kotlin
FileWriter("test.txt").use { writer ->
    writer.write("some text")
    // After this block, the .use function automatically calls writer.close(), similar to a finally block
}
```

### Custom exceptions

```kotlin
class MyException: Exception("My message")

class NumberTooLargeException: ArithmeticException("My message")

// Declares a custom exception as an open class, making it subclassable
open class MyCustomException(message: String): Exception(message)

// Creates a subclass of the custom exception
class SpecificCustomException: MyCustomException("Specific error message")

// Exception hierarchy with a sealed base
sealed class AccountException(message: String, cause: Throwable? = null):
Exception(message, cause)

class InvalidAccountCredentialsException : AccountException("Invalid account credentials detected")

class APIKeyExpiredException(message: String = "API key expired", cause: Throwable? = null)	: AccountException(message, cause)
```

### The Nothing type

`throw` has type `Nothing`, the bottom type (a subtype of all other types), used for functions or expressions that never complete.

```kotlin
fun fail(message: String): Nothing {
    throw IllegalArgumentException(message)
}

val s: String = person.name ?: fail("Name required")

fun notImplementedFunction(): Int {
    TODO("This function is not yet implemented")
}
```

## Options / Props

| Precondition function | Use case | Exception thrown |
|-----------------------|----------|------------------|
| `require()` | Checks user input validity | `IllegalArgumentException` |
| `check()` | Checks object or variable state validity | `IllegalStateException` |
| `error()` | Indicates an illegal state or condition | `IllegalStateException` |

Common `RuntimeException` subclasses and safer alternatives:

| Exception | Cause | Safer alternative |
|-----------|-------|-------------------|
| `ArithmeticException` | impossible arithmetic operation, e.g. `2 / 0` | — |
| `IndexOutOfBoundsException` | index out of range, e.g. `myList.removeAt(3)` | `getOrNull()` |
| `NoSuchElementException` | accessing a non-existent element, e.g. `first()` on an empty list | `firstOrNull()` |
| `NumberFormatException` | `"This is not a number".toInt()` | `toIntOrNull()` |
| `NullPointerException` | `null` use via `!!` or Java interop | — |

## Notes

- Exception hierarchy: root is `Throwable` with two direct subclasses, `Error` (serious problems an application generally should not handle, e.g. `OutOfMemoryError`, `StackOverflowError`) and `Exception` (conditions you might handle, e.g. `RuntimeException`, `IOException`).
- Exceptions are stateful objects carrying the stack trace; avoid creating them with `object` declarations. Create a new instance each time.
- A `try` expression's value is the last executed expression of the `try` or `catch` block; `finally` always runs but does not change the result. A `try` must be accompanied by at least one `catch` or a `finally`.
- Use the `@Throws` annotation to alert callers in Java, Swift, and Objective-C about possible exceptions.
- Stack trace on JVM: the first line is the exception description (type, thread, message); each `at` line is a stack frame.

## Related

- [Returns and jumps](./returns.md)
- [Null safety](./null-safety.md)
