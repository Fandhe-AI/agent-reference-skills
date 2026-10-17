---
source: https://kotlinlang.org/docs/idioms.html
---

# Idioms: Null Handling and Expressions

Frequently used idioms for fallbacks, `try` / `when` / `if` as expressions, and resource handling.

```kotlin
val files = File("Test").listFiles()

println(files?.size) // size is printed if files is not null

// For simple fallback values:
println(files?.size ?: "empty") // if files is null, this prints "empty"

// To calculate a more complicated fallback value in a code block, use `run`
val filesSize = files?.size ?: run {
    val someSize = getSomeSize()
    someSize * 2
}
println(filesSize)

val email = values["email"] ?: throw IllegalStateException("Email is missing!")

val mainEmail = emails.firstOrNull() ?: ""

val mapped = value?.let { transformValue(it) } ?: defaultValue
// defaultValue is returned if the value or the transform result is null.
```

```kotlin
fun transform(color: String): Int = when (color) {
    "Red" -> 0
    "Green" -> 1
    "Blue" -> 2
    else -> throw IllegalArgumentException("Invalid color param value")
}

fun test() {
    val result = try {
        count()
    } catch (e: ArithmeticException) {
        throw IllegalStateException(e)
    }

    // Working with result
}
```

```kotlin
val stream = Files.newInputStream(Paths.get("/some/file.txt"))
stream.buffered().reader().use { reader ->
    println(reader.readText())
}
```

## Notes

- These are fragments from the official Idioms page; `getSomeSize()`, `values`, `emails`, `value`, `transformValue`, `defaultValue`, and `count()` are placeholders to define yourself.
- `.use()` replaces Java's try-with-resources.
- `TODO("reason")` always throws `NotImplementedError` and returns `Nothing`, so it fits any expected type.
