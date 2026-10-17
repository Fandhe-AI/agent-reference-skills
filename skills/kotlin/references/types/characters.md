---
source: https://kotlinlang.org/docs/characters.html
---

# Characters

The `Char` type represents a single character as a UTF-16 code unit. Use `Char` for individual character values, such as letters, digits, punctuation marks, or whitespace. For sequences of characters, use `String`.

## Signature / Usage

```kotlin
val letter: Char = 'a'

// Kotlin infers Char because the values are written in single quotes
val digit = '1'
val symbol = '!'

val maybeAbsent: Char? = null
```

A character literal must contain exactly one character. Otherwise, the compiler reports an error:

```kotlin
val invalid = 'AB' // Error
val invalidEmpty = '' // Error
```

### Unicode support

A single `Char` stores one UTF-16 code unit, not necessarily one complete Unicode character.

- Basic Multilingual Plane: a `Char` can store values from `\u0000` to `￿`. Use `\u` followed by a four-digit hexadecimal value: `val unicodeNumber = '1' // Equals '1'`.
- Supplementary characters (outside the BMP, such as emojis) are encoded as a surrogate pair, where two `Char` values together represent one Unicode character in a `String`:

```kotlin
val emoji = "🥦"

println(emoji.length) // 2
println(emoji[0])     // First surrogate
println(emoji[1])     // Second surrogate
```

To handle 32-bit symbols individually, use Unicode code points stored as `Int` values.

### Escape sequences

| Supported sequence | Description |
| --- | --- |
| `\t` | Tab |
| `\b` | Backspace |
| `\n` | New Line (LF) |
| `\r` | Carriage Return (CR) |
| `\'` | Single quotation mark |
| `\"` | Double quotation mark |
| `\\` | Backslash |
| `\$` | Dollar sign |

### Operations

Comparison uses the standard comparison operators (`==`, `!=`, `<`, `>`, `<=`, `>=`) on numeric Unicode values:

```kotlin
val before = 'a' < 'b' // true
val different = 'A' == 'a' // false
```

Inspection and case conversion:

```kotlin
val myChar = 'A'
println(myChar.isDigit()) // false
println(myChar.isUpperCase()) // true
println(myChar.lowercaseChar()) // 'a'
```

Character arithmetic (adding or subtracting an integer) follows Unicode values, not language-specific alphabet rules. `++` and `--` work with mutable variables:

```kotlin
val a = 'a'
println(a + 1)  // b
println(a - 32) // A

var c = 'A'
c += 10
println(c)   // 'K'
println(++c) // 'L'
```

Conversion to a numeric type is explicit:

```kotlin
val letter = 'A'
println(letter.code) // 65

val digit = '7'
println(digit.digitToInt()) // 7
```

If the character may not be a valid digit, use `digitToIntOrNull()`.

## Notes

- `Char` is not a numeric type, but each character has a numeric Unicode value that you can access with `.code`.
- On the JVM, nullable `Char` values are boxed when needed, the same as numeric types.

## Related

- [Strings](./strings.md)
- [Numbers](./numbers.md)
