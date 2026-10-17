---
source: https://kotlinlang.org/docs/java-to-kotlin-idioms-strings.html
---

# Strings in Java and Kotlin

Examples of typical string tasks in Java and their idiomatic Kotlin equivalents.

## Signature / Usage

```kotlin
fun main() {
    // Kotlin
    val name = "Joe"
    println("Hello, $name")
    println("Your name is ${name.length} characters long")
}
```

Use `$name` for a variable and `${expr}` for a complicated expression.

| Task | Java | Kotlin |
| --- | --- | --- |
| Concatenate | `"Hello, " + name` | string templates `"Hello, $name"` |
| Build a string | `StringBuilder` + `append` | `buildString { ... }` (inline function using the same `StringBuilder` via implicit `this`) |
| String from collection items | Stream `filter` / `map` / `Collectors.joining("; ")` | `joinToString(separator = ...)` |
| Default if blank | ternary `isBlank() ? "John Doe" : v` | `ifBlank { "John Doe" }` |
| Strip leading/trailing chars | `replaceAll("^##\|##$", "")` | `removeSurrounding("##")` |
| Replace occurrences | `Pattern` + `Matcher.replaceAll` | `Regex(...).replace(input, replacement = ...)` |
| Split | `split("\\.")` (regex arg) | `split(".")` (varargs of delimiters; `Regex` overload for regexes) |
| Substring after a char | `substring(indexOf("?") + 1)` | `substringAfter("?")`, `substringAfterLast(",")` |
| Multiline | `String.join` / text blocks (Java 15) | `"""..."""` + `trimIndent()` / `trimMargin("#")` |

### Build a string

```kotlin
val countDown = buildString {
    for (i in 5 downTo 1) {
        append(i)
        appendLine()
    }
}
println(countDown)
```

### Create a string from collection items

```kotlin
val numbers = listOf(1, 2, 3, 4, 5, 6)
val invertedOddNumbers = numbers
    .filter { it % 2 != 0 }
    .joinToString(separator = ";") {"${-it}"}
println(invertedOddNumbers)
```

In Java, if you want spaces between your delimiters and following items, you need to add a space to the delimiter explicitly.

### Set default value if the string is blank

```kotlin
import kotlin.random.Random

fun main() {
    val name = getName().ifBlank { "John Doe" }
    println(name)
}

fun getName(): String =
    if (Random.nextBoolean()) "" else "David"
```

### Replace characters at the beginning and end

```kotlin
val input = "##place##holder##"
val result = input.removeSurrounding("##")
println(result)
```

### Replace occurrences

Use multiline strings to reduce backslashes in a regex:

```kotlin
val regex = Regex("""\w*\d+\w*""") // multiline string
val input = "login: Pokemon5, password: 1q2w3e4r5t"
val replacementResult = regex.replace(input, replacement = "xxx")
println("Initial input: '$input'")
println("Anonymized input: '$replacementResult'")
```

### Split a string

```kotlin
println("Sometimes.text.should.be.split".split("."))
```

To split with a regular expression, use the overloaded `split()` that accepts a `Regex`.

### Take a substring

```kotlin
val input = "What is the answer to the Ultimate Question of Life, the Universe, and Everything? 42"
val answer = input.substringAfter("?")
println(answer)

val question = "To be, or not to be, that is the question.".substringAfterLast(",")
```

### Use multiline strings

In Java 15+ text blocks, a triple-quote on the next line adds an extra empty line when printed. In Kotlin the left-most character of any line identifies the beginning of the line, and there is no extra empty line; Java trims indents automatically but in Kotlin you do it explicitly:

```kotlin
val result = """
    Kotlin
       Java 
""".trimIndent()
println(result)
```

```kotlin
val result = """
   #  Kotlin
   #  Java
""".trimMargin("#")
println(result)
```

## Related

- Strings
- [Idioms](../basics/idioms.md)
- [Coding conventions](../basics/coding-conventions.md)
- [Collection transformations](../collections/collection-transformations.md)
- [Collections in Java and Kotlin](./java-to-kotlin-collections-guide.md)
- [Nullability in Java and Kotlin](./java-to-kotlin-nullability-guide.md)
