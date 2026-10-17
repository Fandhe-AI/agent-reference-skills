---
source: https://kotlinlang.org/docs/booleans.html
---

# Booleans

The `Boolean` type represents logical values: `true` and `false`. Use `Boolean` values in functions that answer yes-or-no questions, and in `while`, `if`, and `when` conditions.

## Signature / Usage

```kotlin
val isTrue: Boolean = true
val isFalse = false // Kotlin infers Boolean

val isEnabled: Boolean? = null // nullable
```

You cannot assign an integer value to a `Boolean` variable. In Kotlin, `0` and `1` are not `Boolean` values.

### Produce Boolean values

```kotlin
val number = 10
val isPositive = number > 0
println(isPositive) // true

val language = "Kotlin"
val isEmpty = language.isEmpty()
println(isEmpty) // false
```

### Boolean operations

| Operation | Syntax | Notes |
| --- | --- | --- |
| Negation (NOT) | `!isOn` | Inverts a `Boolean` value |
| Logical AND | `a && b` | `true` only if both operands are `true`; skips the second operand if the first is `false`. Use the `and` infix function to evaluate both |
| Logical OR | `a \|\| b` | `true` if at least one operand is `true`; skips the second operand if the first is `true`. Use the `or` infix function to evaluate both |
| Exclusive OR (XOR) | `a xor b` | `true` if the operands have different values; `xor` is an infix function, not an operator |

```kotlin
val isOn = true
val isOff = !isOn // isOff is false

val d = true && true  // true
val b = false || true // true
val c = true xor false // true
```

### Operator precedence

Precedence order for the `Boolean` operations (highest first): `!`, `xor` (and other infix functions), `&&`, `||`.

```kotlin
val result = true || false && false
println(result) // true

val result2 = (true || false) && false
println(result2) // false
```

### Boolean in conditions

`if`, `when`, and `while` evaluate `Boolean` expressions to direct program flow. A condition already has the `Boolean` type; you do not need to compare it to `true` or `false`.

```kotlin
val number = 4
val isEven = number % 2 == 0

if (isEven) {
    println("The number is even.")
} else {
    println("The number is odd.")
}
```

## Related

- [Strings](./strings.md)
- [Types overview](./types-overview.md)
