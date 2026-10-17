---
source: https://kotlinlang.org/docs/read-standard-input.html
---

# Read standard input

Use `readln()` to read a whole line of standard input as a string, and `readlnOrNull()` to read without throwing at end-of-input.

## Signature / Usage

```kotlin
// Reads and stores the user input in a variable. For example: Hi there!
val myInput = readln()

println(myInput)
// Hi there!

// Reads and prints the user input without storing it in a variable. For example: Hi, Kotlin!
println(readln())
// Hi, Kotlin!
```

Multiline input as one string:

```kotlin
val input = generateSequence(::readlnOrNull)
  .joinToString("\n")
```

Converting and splitting input:

```kotlin
// Converts the input from a string to an integer value. For example: 12
val myNumber = readln().toInt()
println(myNumber)
// 12

// Reads the input, assuming the elements are separated by spaces, and converts them into integers. For example: 1 2 3
val numbers = readln().split(' ').map { it.toInt() }
println(numbers)
//[1, 2, 3]
```

Safe handling:

```kotlin
// Returns null if the input is invalid. For example: Hello!
val wrongInt = readln().toIntOrNull()
println(wrongInt)
// null

// Converts a valid input from a string to an integer. For example: 13
val correctInt = readln().toIntOrNull()
println(correctInt)
// 13
```

## Notes

- Conversion functions: `.toInt()`, `.toLong()`, `.toDouble()`, `.toFloat()`, `.toBoolean()`. They assume a valid representation; e.g. `.toInt()` on "hello" throws an exception.
- `readlnOrNull()` returns `null` at end of input, whereas `readln()` throws an exception. Use it to read until end-of-file.
- For an alternative on Kotlin/JVM, see the docs page "Standard input with Java Scanner" (not included in this skill).

## Related

- [Time measurement](./time-measurement.md)
