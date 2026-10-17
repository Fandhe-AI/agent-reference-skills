---
source: https://kotlinlang.org/docs/operator-overloading.html
---

# Operator overloading

Provide custom implementations for the predefined set of operators by declaring a member or extension function with a specific name and the `operator` modifier.

## Signature / Usage

```kotlin
interface IndexedContainer {
    operator fun get(index: Int)
}

class OrdersList: IndexedContainer {
    override fun get(index: Int) { /*...*/ }   
}

data class Point(val x: Int, val y: Int)

operator fun Point.unaryMinus() = Point(-x, -y)

val point = Point(10, 20)
println(-point)  // prints "Point(x=-10, y=-20)"
```

When overriding an operator overload, `operator` can be omitted.

## Options / Props

| Category | Expression | Translated to |
| --- | --- | --- |
| Unary prefix | `+a` / `-a` / `!a` | `a.unaryPlus()` / `a.unaryMinus()` / `a.not()` |
| Increment / decrement | `a++` / `a--` | `a.inc()` / `a.dec()` (see Notes) |
| Arithmetic | `a + b` | `a.plus(b)` |
| | `a - b` | `a.minus(b)` |
| | `a * b` | `a.times(b)` |
| | `a / b` | `a.div(b)` |
| | `a % b` | `a.rem(b)` |
| | `a..b` | `a.rangeTo(b)` |
| | `a..<b` | `a.rangeUntil(b)` |
| in | `a in b` / `a !in b` | `b.contains(a)` / `!b.contains(a)` |
| Indexed access | `a[i]`, `a[i, j]`, `a[i_1, ..., i_n]` | `a.get(i)`, `a.get(i, j)`, `a.get(i_1, ..., i_n)` |
| | `a[i] = b`, `a[i, j] = b`, `a[i_1, ..., i_n] = b` | `a.set(i, b)`, `a.set(i, j, b)`, `a.set(i_1, ..., i_n, b)` |
| invoke | `a()`, `a(i)`, `a(i, j)`, `a(i_1, ..., i_n)` | `a.invoke()`, `a.invoke(i)`, `a.invoke(i, j)`, `a.invoke(i_1, ..., i_n)` |
| Augmented assignment | `a += b` / `-=` / `*=` / `/=` / `%=` | `a.plusAssign(b)` / `minusAssign` / `timesAssign` / `divAssign` / `remAssign` |
| Equality | `a == b` / `a != b` | `a?.equals(b) ?: (b === null)` / `!(a?.equals(b) ?: (b === null))` |
| Comparison | `a > b`, `a < b`, `a >= b`, `a <= b` | `a.compareTo(b) > 0`, `< 0`, `>= 0`, `<= 0` |

## Notes

- Resolution of `+a`: determine the type `T` of `a`, look up an `operator` function `unaryPlus()` with no parameters for receiver `T` (member or extension); absent or ambiguous is a compilation error; the return type `R` is the type of the expression.
- Operators are optimized for basic types and add no function-call overhead for them.
- `inc()` / `dec()` must return a value assigned to the variable and should not mutate the receiver. The return type must be a subtype of `T`. For `a++`: store `a` in `a0`, assign `a0.inc()` to `a`, return `a0`. Prefix forms assign `a.inc()` to `a` and return the new value.
- Augmented assignment `a += b`: if `plusAssign()` is available, and `plus()` is also available with `a` a mutable variable and `plus` returning a subtype of `a`'s type, it is an ambiguity error; `plusAssign()` must return `Unit`. Otherwise code for `a = a + b` is generated. Assignments are NOT expressions.
- `==` / `!=` only use `equals(other: Any?): Boolean`; an overload like `equals(other: Foo)` is ignored. `equals()` is called when neither operand is compared directly to `null` and the comparison is not between two floating-point types; otherwise `===` is used for direct `null` comparisons and non-null floating-point values compare by numeric value.
- `===` / `!==` are not overloadable.
- All comparisons call `compareTo`, which must return `Int`.
- `provideDelegate`, `getValue` and `setValue` are described in Delegated properties (`classes-objects` category of this skill).
- Custom infix operations can be simulated with infix function calls.

## Related

- [Functions](./functions.md)
- [Higher-order functions and lambdas](./lambdas.md)
