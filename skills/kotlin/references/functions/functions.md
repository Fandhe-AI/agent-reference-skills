---
source: https://kotlinlang.org/docs/functions.html
---

# Functions

Declare functions with the `fun` keyword, parameters in parentheses, and an optional return type. Covers default and named arguments, return types, varargs, infix, local/member/generic functions and `tailrec`.

## Signature / Usage

```kotlin
// 'double' is the name of the function
// 'x' is a parameter of Int type
// The expected return value is of Int type too
fun double(x: Int): Int {
    return 2 * x
}

val result = double(2)
```

### Parameters

```kotlin
fun powerOf(
    number: Int,
    exponent: Int, // trailing comma
) { /*...*/ }
```

- Parameters use `name: Type`, separated by commas, each with an explicit type.
- Parameters are read-only inside the body (implicitly `val`); the object's mutable state can still be modified.

### Parameters with default values

```kotlin
fun read(
    b: ByteArray,
    // The default value of 'off' is 0
    off: Int = 0,
    // The default value of 'len' is calculated
    // as the size of the 'b' array
    len: Int = b.size,
) { /*...*/ }
```

- A default placed before a parameter without a default can only be used by naming the argument: `greeting(message = "Hello!")`.
- Trailing lambdas are an exception: `greeting() { println ("Hello!") }` uses the default for `userId`.
- Overriding methods use the base method's defaults and must omit default values from the signature.
- Defaults may be non-constant expressions (e.g. `len: Int = b.size`); parameters referring to others must be declared later. Defaults are evaluated only when the argument is omitted.

### Named arguments

```kotlin
fun reformat(
    str: String,
    normalizeCase: Boolean = true,
    upperCaseFirstLetter: Boolean = true,
    divideByCamelHumps: Boolean = false,
    wordSeparator: Char = ' ',
) { /*...*/ }

reformat(
    "This is a short String!",
    upperCaseFirstLetter = false,
    wordSeparator = '_'
)
```

- Named arguments can be listed in any order; after the first skipped argument, all subsequent arguments must be named.
- A `vararg` can be passed by name: `mergeStrings(strings = arrayOf("a", "b", "c"))`.

### Return types

- Block-body functions must declare a return type explicitly (except `Unit`); Kotlin does not infer it.
- Return multiple values with a data class (preferred, descriptive names), a collection for same-kind values, or `Pair` / `Triple` (generic `first` / `second` / `third` names).

```kotlin
data class OrderSummary(
    val subtotal: Double,
    val tax: Double,
)

fun calculateOrderSummary(prices: List<Double>): OrderSummary {
    val subtotal = prices.sum()
    val tax = subtotal * 0.2
    return OrderSummary(subtotal, tax)
}
```

### Single-expression functions

```kotlin
fun double(x: Int): Int = x * 2

// Compiler infers that the function returns Int
fun double(x: Int) = x * 2
```

- Recursive / mutually recursive functions and typeless expressions like `fun empty() = null` always require an explicit return type.
- A `return` inside an expression body requires an explicit return type:

```kotlin
fun getDisplayNameOrDefault(userId: String?): String =
    getDisplayName(userId ?: return "default")
```

### Unit-returning functions

A block-body function without a declared return type returns `Unit` (a real type with a single object value). `Unit` is optional in declarations but required in function types such as `() -> Unit`.

```kotlin
fun printHello(name: String?, action: () -> Unit) {
    if (name != null)
        println("Hello $name")
    else
        println("Hi there!")

    action()
}
```

### Variable number of arguments (varargs)

```kotlin
fun <T> asList(vararg ts: T): List<T> {
    val result = ArrayList<T>()
    for (t in ts) // ts is an Array
        result.add(t)
    return result
}

val a = arrayOf(1, 2, 3)
val list = asList(-1, 0, *a, 4)
```

- Only one parameter can be `vararg`. If it is not last, pass the following parameters by name.
- Spread an array with `*`. For a primitive array use `*a.toTypedArray()`.

### Infix notation

```kotlin
infix fun Int.shl(x: Int): Int { /*...*/ }

// Calls the function using the infix notation
1 shl 2
```

Requirements: member or extension function; single parameter; the parameter is not `vararg` and has no default value.

### Function scope

```kotlin
// Local function: declared inside another function, can access the outer closure
fun dfs(graph: SocialGraph) {
    val visited = HashSet<Person>()
    fun dfs(current: Person) {
        if (!visited.add(current)) return
        println("Visited ${current.name}")
        for (friend in current.friends)
            dfs(friend)
    }
    dfs(graph.people[0])
}
```

- Functions can be top-level, local, member (`class Sample { fun foo() { print("Foo") } }`) or extension functions.
- Generic functions declare type parameters before the name: `fun <T> singletonList(item: T): List<T> { /*...*/ }`.

### Tail recursive functions

```kotlin
tailrec fun findFixPoint(x: Double = 1.0): Double =
    if (abs(x - cos(x)) < eps) x else findFixPoint(cos(x))
```

## Notes

- Infix calls have lower precedence than arithmetic operators, type casts and `rangeTo` (`1 shl 2 + 3` is `1 shl (2 + 3)`), but higher than `&&`, `||`, `is`- and `in`-checks (`a xor b in c` is `(a xor b) in c`).
- Infix calls on the current receiver need an explicit `this` (`this add "second"`).
- Named argument syntax cannot be used when calling Java functions on the JVM (parameter names are not always preserved).
- `tailrec` applies only when the function calls itself as its final operation; not usable with code after the call, inside `try/catch/finally`, or on `open` functions.

## Related

- [Higher-order functions and lambdas](./lambdas.md)
- [Inline functions](./inline-functions.md)
- [Operator overloading](./operator-overloading.md)
