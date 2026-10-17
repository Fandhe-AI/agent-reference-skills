---
source: https://kotlinlang.org/docs/numbers.html
---

# Numbers

The Kotlin number types represent integer values (`Byte`, `Short`, `Int`, `Long`) and floating-point values (`Float`, `Double`). Use number types to store and process numeric data, for example, in arithmetic, counters, measurements, and other calculations.

## Signature / Usage

```kotlin
val one: Int = 1

// Use underscores to improve readability
val oneBillion: Long = 1_000_000_000
val hexBytes: Int = 0x7F_EC_DE_5E
val bytes: Int = 0b01010010_01101001_10010100_10010010

val oneLong = 1L
val pi = 3.14 // Double
val eFloat = 2.7182817f // Float
```

### Choose a number type

- Use `Int` for whole numbers.
- Use `Long` for whole numbers outside the `Int` range.
- Use `Double` for decimal numbers.
- Use `Float` when lower precision is acceptable or required.
- Use `Byte` and `Short` when an API or data format requires them.

### Integer types

| Type | Size (bits) | Min value | Max value |
| --- | --- | --- | --- |
| `Byte` | 8 | -128 | 127 |
| `Short` | 16 | -32768 | 32767 |
| `Int` | 32 | -2,147,483,648 (-2^31) | 2,147,483,647 (2^31 - 1) |
| `Long` | 64 | -9,223,372,036,854,775,808 (-2^63) | 9,223,372,036,854,775,807 (2^63 - 1) |

Literal forms: decimals `123`, hexadecimals `0x0F`, binaries `0b00001011`. Kotlin does not support octal literals.

When you declare a numeric type explicitly, the compiler checks that the value fits in the range of that type:

```kotlin
// Value fits in Byte
val oneByte: Byte = 1

// Error: the value does not fit in Byte
val tooBig: Byte = 128
```

When you do not specify a numeric type, Kotlin infers `Int` if the value fits in the `Int` range. Otherwise, Kotlin infers `Long`:

```kotlin
val million = 1_000_000 // Int
val threeBillion = 3_000_000_000 // Long
```

### Floating-point types

Floating-point types follow the IEEE 754 standard. `Float` reflects the single precision. `Double` reflects the double precision.

| Type | Size (bits) | Significant bits | Exponent bits | Decimal digits |
| --- | --- | --- | --- | --- |
| `Float` | 32 | 24 | 8 | 6-7 |
| `Double` | 64 | 53 | 11 | 15-16 |

To declare a floating-point literal, include a decimal point (`.`) or use exponent notation (`6.02214076e23`). By default, Kotlin infers floating-point literals as `Double`. To declare a `Float`, add the `f` or `F` suffix. Kotlin rounds a `Float` literal that contains more precision than `Float` can store.

### Arithmetic operations

Standard operations: `+`, `-`, `*`, `/`, and `%`. The result type depends on the types of the operands.

```kotlin
fun main() {
    println(1 + 2) // 3
    println(2_500_000_000L - 1L) // 2499999999
    println(3.14 * 2.71) // 8.5094
    println(10.0 / 3) // 3.3333333333333335
}
```

Division between integer values always returns an integer result. The compiler discards the fractional part. To return a floating-point result, make at least one operand a `Float` or `Double`:

```kotlin
val intValue = 5 / 2    // 2
val a = 5 / 2.0         // 2.5
val b = 5 / 2.toDouble() // 2.5
```

### Type conversion

Numeric types are not subtypes of one another. Kotlin requires explicit conversions to avoid silent data loss and unexpected behavior.

```kotlin
fun printDouble(x: Double) { print(x) }

val x = 1.0
val xInt = 1
val one: Double = 1 // Error: initializer type mismatch

printDouble(x) // OK
printDouble(xInt) // Error: argument type mismatch
```

Explicit conversion functions: `toByte()`, `toShort()`, `toInt()`, `toLong()`, `toFloat()`, `toDouble()`. When you convert a floating-point value to an integer type, the compiler discards the fractional part:

```kotlin
val d: Double = 1.5
val l: Long = d.toLong() // 1
```

#### Mixed numeric expressions

Kotlin does not support implicit conversion for assignments or function arguments. However, you can combine different numeric types in arithmetic expressions; Kotlin determines a result type based on the operand types:

```kotlin
val intNumber: Int = 1
val longNumber: Long = 1000
val result = intNumber + longNumber // 1001, Long

val result2: Int = intNumber + longNumber
// Error: Initializer type mismatch
```

#### Integer literal types

During type inference, Kotlin treats unsuffixed integer literals as a special Integer Literal Type (ILT) until the surrounding context determines a specific type:

```kotlin
fun List<Any>.log() {
    println(joinToString(" | ") { it::class.simpleName ?: "Unknown" })
}

fun main() {
    listOf(1, 2).log()          // Int | Int
    listOf(1L, 2L).log()        // Long | Long
    // Compiler interprets 1 as an ILT and resolves it to Long
    listOf(1, 2L).log()         // Long | Long
    // .toInt() converts the literal to Int
    listOf(1.toInt(), 2L).log() // Int | Long
}
```

It's especially easy to miss with `Int` and `Long` values because they have the same string representation at runtime. To avoid this, specify the expected type or convert values explicitly:

```kotlin
val longValues: List<Long> = listOf(1, 2L)           // Long | Long
val numberValues: List<Number> = listOf(1.toInt(), 2L) // Int | Long
val intValues: List<Int> = listOf(1, 2L)
// Error: initializer type mismatch
```

### Data overflow

If the result of an operation falls outside the range of a type, overflow occurs. The compiler does not automatically produce an error when integer overflow occurs.

```kotlin
val intNumber: Int = 2147483647
println(intNumber + 1) // -2147483648

val min = Int.MIN_VALUE
println(-min) // -2147483648 (overflow in negation)

val large: Int = 130
println(large.toByte()) // -126 (narrowing conversion)
```

Since floating-point types follow IEEE 754, very large results can become `Infinity`:

```kotlin
println(Double.MAX_VALUE * 2) // Infinity
```

### Bitwise operations

Bitwise operations for `Int` and `Long` are a set of infix functions and `inv()`:

```kotlin
val x = 1
println(x shl 2) // 4
println(x and 0x000FF000) // 0
```

- `shl()` signed shift left
- `shr()` signed shift right
- `ushr()` unsigned shift right
- `and()` bitwise AND
- `or()` bitwise OR
- `xor()` bitwise XOR
- `inv()` bitwise inversion

### Floating-point number comparison

When the operands are statically known to be `Float` or `Double`, operations on the numbers and the range that they form follow IEEE 754. In generic use cases (such as `Any`, `Comparable<...>`, or `Collection<T>`), Kotlin uses the `equals()` and `compareTo()` implementations for `Float` and `Double`. As a result:

- `NaN` is considered equal to itself
- `NaN` is considered greater than any other element including `POSITIVE_INFINITY`
- `-0.0` is considered less than `0.0`

```kotlin
fun generalizedEquals(a: Any, b: Any): Boolean {
    return a == b
}

fun main() {
    println(Double.NaN == Double.NaN) // false
    println(0.0 == -0.0) // true

    println(generalizedEquals(Double.NaN, Double.NaN)) // true
    println(generalizedEquals(0.0, -0.0)) // false
}
```

### Boxing and caching numbers on the JVM

On the JVM, non-nullable numeric values are usually stored using primitive types (`int`, `long`, `double`). When you use generic types or nullable numeric types like `Int?`, the value is boxed and represented as an object. The JVM caches boxed `Integer` values in the range `-128` to `127`, so boxed numbers with the same value can be referentially equal. For values outside the cached range they are separate objects. Use `==` to compare numeric values:

```kotlin
val score: Int = 10000
val savedScore: Int? = score
val displayedScore: Int? = score

println(savedScore === displayedScore) // false
println(savedScore == displayedScore) // true
```

## Notes

- Unsigned integer types are stable (only unsigned arrays are Beta); the source page's 'Beta feature' wording is outdated — see [unsigned-integer-types.md](./unsigned-integer-types.md).
- Arithmetic operators can be overridden in custom number classes ([operator overloading](../functions/operator-overloading.md)).

## Related

- [Unsigned integer types](./unsigned-integer-types.md)
- [Characters](./characters.md)
- [Types overview](./types-overview.md)
