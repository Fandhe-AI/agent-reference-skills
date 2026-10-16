---
source: https://kotlinlang.org/docs/equality.html
---

# Equality

Kotlin has two types of equality: structural equality (`==`, a check for the `equals()` function) and referential equality (`===`, two references pointing to the same object).

## Signature / Usage

### Structural equality

`a == b` is translated to:

```kotlin
a?.equals(b) ?: (b === null)
```

```kotlin
var a = "hello"
var b = "hello"
var c = null
var d = null
var e = d

println(a == b) // true
println(a == c) // false
println(c == e) // true
```

To provide custom equality, override `equals(other: Any?): Boolean`:

```kotlin
class Point(val x: Int, val y: Int) {
    override fun equals(other: Any?): Boolean {
        if (this === other) return true
        if (other !is Point) return false

        // Compares properties for structural equality
        return this.x == other.x && this.y == other.y
    }
}
```

### Referential equality

`a === b` is true if and only if `a` and `b` point to the same object.

```kotlin
var a = "Hello"
var b = a
var c = "world"
var d = "world"

println(a === b) // true
println(a === c) // false
println(c === d) // true
```

## Notes

- `a == null` is automatically translated to `a === null`; no point optimizing explicit null comparisons.
- `equals()` is inherited from `Any` and by default implements referential equality. Value classes and data classes automatically override it (structural equality), but if `equals()` is `final` in the parent class of a data class, its behavior remains unchanged. Non-data classes need a custom `equals()` override.
- When overriding `equals()`, also override `hashCode()`. Functions with the same name and other signatures (like `equals(other: Foo)`) don't affect `==` / `!=`. Structural equality is unrelated to `Comparable<...>`.
- For values represented by primitive types at runtime (for example `Int`), `===` is equivalent to `==`. Referential equality is implemented differently in Kotlin/JS.
- Floating-point: when operands are statically known to be `Float` or `Double` (nullable or not), the check follows IEEE 754. Otherwise structural equality applies: `NaN` equals itself, `NaN` is greater than any other element (including `POSITIVE_INFINITY`), and `-0.0` is not equal to `0.0`.
- To compare arrays element by element, use `contentEquals()`.

## Related

- [Keywords and operators](./keyword-reference.md)
- [Null safety](./null-safety.md)
