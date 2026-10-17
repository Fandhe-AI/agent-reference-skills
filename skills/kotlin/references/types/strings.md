---
source: https://kotlinlang.org/docs/strings.html
---

# Strings

The `String` type represents a sequence of characters. It is immutable: after you create a `String` object, its contents stay the same. Any operation that appears to modify the string actually creates a new string.

## Signature / Usage

```kotlin
val name: String = "Kotlin"
val message = "Hello, world!" // Kotlin infers String

// Escape sequences in double-quoted literals
val quote = "Kotlin says, \"Hi\"."
```

### Multiline strings

Use triple quotes (`""" """`) for text that spans multiple lines or contains quotes you don't want to escape. Multiline strings don't support escape sequences, and they preserve line breaks and indentation as written.

```kotlin
val text = """
Hello,
Kotlin
"""

val quote = """Kotlin says, "Hi"."""
```

`trimIndent()` detects the common minimal indent of non-empty lines and removes it. `trimMargin()` removes everything before and including the margin prefix (default `|`, or pass another character such as `trimMargin(">")`):

```kotlin
val text = """
    |Hello,
    |Kotlin
""".trimMargin()
```

Strings processed with `trimIndent()` or `trimMargin()` use only newline (`\n`) separators, regardless of the platform.

### String templates

Use `$` to insert a variable and `${}` to insert an expression or to place a variable directly next to other text. Templates work in regular and multiline strings.

```kotlin
val name = "Kotlin"
println("Hello, $name")
// Hello, Kotlin

val text = "abc"
println("The length of $text is ${text.length}")
// The length of abc is 3

val language = "Kotlin"
println("${language}Lang")
// KotlinLang
```

If an interpolated expression evaluates to `null`, the text `null` is inserted. Use the Elvis operator (`?:`) to replace it:

```kotlin
val text: String? = null
println("Hello, $text")
// Hello, null
println("Hello, ${text ?: "Kotlin"}")
// Hello, Kotlin
```

#### Multi-dollar string interpolation

To include literal dollar signs, put multiple `$` before the string literal; interpolation then begins only with that many consecutive dollar signs. If you use single-dollar interpolation, this feature doesn't affect your code.

```kotlin
val KClass<*>.jsonSchema : String
    get() = $$"""
    {
      "$schema": "https://json-schema.org/draft/2020-12/schema",
      "$id": "https://example.com/product.schema.json",
      "$dynamicAnchor": "meta",
      "title": "$${simpleName ?: qualifiedName ?: "unknown"}",
      "type": "object"
    }
    """
```

### Basic string operations

| Task | API | Example |
| --- | --- | --- |
| Length | `length` | `"Kotlin".length // 6` |
| Access character | `[]` (zero-based; out-of-range throws) | `language[0] // K` |
| Substring | `substring()` returns `String`; `subSequence()` returns `CharSequence` | `text.substring(1, 5) // otli` |
| Equality | `==` compares content | `"kotlin" == "Kotlin" // false` |
| Lexicographic compare | `compareTo(other, ignoreCase = false)`: `0` equal, `< 0` receiver smaller, `> 0` receiver greater | `"abc".compareTo("ABC", ignoreCase = true) == 0` |
| Modified copy | `trim()`, `replace()`, `uppercase()`, `lowercase()` | `text.replace("Kotlin", "world")` |
| Inspect | `contains()`, `startsWith()`, `endsWith()` | `domain.endsWith(".org")` |
| Split | `split()`, `lines()` | `"one, two, three".split(", ")` |

```kotlin
for (char in "Kotlin") {
    println(char)
}

println("abc".compareTo("abd") < 0)
// true

val numbers = "one\ntwo\nthree"
println(numbers.lines())
// [one, two, three]
```

### Build and format strings

For most formatting tasks, use string templates. Concatenating with `+` creates a new `String` object for each operation, which may not be beneficial in loops. Use `buildString()` (creates a `StringBuilder` internally, runs your block, returns the resulting string) or `StringBuilder` (when you need the buffer as an explicit value):

```kotlin
val hasErrors = true
val hasWarnings = true

val status = buildString {
    if (hasErrors) append("Errors found")
    if (hasWarnings) {
        if (isNotEmpty()) append("; ")
        append("Warnings found")
    }
    if (isEmpty()) append("OK")
}

println(status)
// Errors found; Warnings found

val builder = StringBuilder("Hello, Kotlin")
builder.replace(7, 13, "world")
println(builder.toString())
// Hello, world
```

On the JVM, you can also use `String.format()`:

```kotlin
val text = String.format("Hello, %s", "Kotlin")
```

### String conversion

`toString()` returns a string representation of a value. In string templates and concatenation, values are converted automatically. Parsing functions:

- Integers: `toByte()`, `toShort()`, `toInt()`, `toLong()`
- Floating-point: `toDouble()`, `toFloat()`
- Booleans: `toBoolean()`, `toBooleanStrict()`

If the input may be invalid, use the `OrNull` variants, which return `null` instead of throwing an exception:

```kotlin
val toInt = "10".toInt() // 10

// 1000000000000 exceeds maximum value of Int
val toIntInvalid = "1000000000000".toIntOrNull()

val toBoolean = "true".toBooleanStrict() // true
val toBooleanInvalid = "yes".toBooleanStrictOrNull() // null
```

## Notes

- Use `String.format()` only when you specifically need formatter-style specifiers on the JVM (see the Java `Formatter` documentation).
- Multiline strings do not support escape sequences; Kotlin treats those characters as regular text.

## Related

- [Characters](./characters.md)
- [Booleans](./booleans.md)
