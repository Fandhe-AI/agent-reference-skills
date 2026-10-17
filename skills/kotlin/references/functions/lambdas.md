---
source: https://kotlinlang.org/docs/lambdas.html
---

# Higher-order functions and lambdas

Kotlin functions are first-class: they can be stored in variables, passed to and returned from higher-order functions. Function types, callable references, lambdas, anonymous functions and function literals with receiver.

## Signature / Usage

```kotlin
fun <T, R> Collection<T>.fold(
    initial: R, 
    combine: (acc: R, nextElement: T) -> R
): R {
    var accumulator: R = initial
    for (element: T in this) {
        accumulator = combine(accumulator, element)
    }
    return accumulator
}

val items = listOf(1, 2, 3, 4, 5)
val joinedToString = items.fold("Elements:", { acc, i -> acc + " " + i })
val product = items.fold(1, Int::times)
```

### Function types

- `(A, B) -> C`: two arguments, returns `C`; `() -> A` for no parameters. The `Unit` return type cannot be omitted.
- With receiver: `A.(B) -> C`.
- Suspending: `suspend () -> Unit`, `suspend A.(B) -> C`.
- Optional parameter names: `(x: Int, y: Int) -> Point`.
- Nullable: `((Int, Int) -> Int)?`. Combined: `(Int) -> ((Int) -> Unit)`. Arrow is right-associative.
- Alias: `typealias ClickHandler = (Button, ClickEvent) -> Unit`.

Instantiate via a lambda `{ a, b -> a + b }`, an anonymous function `fun(s: String): Int { return s.toIntOrNull() ?: 0 }`, a callable reference (`::isOdd`, `String::toInt`, `List<Int>::size`, `::Regex`, `foo::toString`), or a class implementing a function type:

```kotlin
class IntTransformer: (Int) -> Int {
    override operator fun invoke(x: Int): Int = TODO()
}

val intFunction: (Int) -> Int = IntTransformer()
```

Invoke with `f.invoke(x)` or `f(x)`; with a receiver: `intPlus(1, 2)` or `2.intPlus(3)`.

### Callable references

```kotlin
fun isOdd(number: Int) = number % 2 != 0

fun main() {
    val numbers = listOf(1, 2, 3, 4, 5)
    println(numbers.filter(::isOdd))
    // [1, 3, 5]
}
```

- Function references: `::functionName`, typed as `KFunction<out R>` subtypes (e.g. `KFunction3`); overloads are resolved from the expected type.
- Property references: `KProperty0<V>` (no receiver), `KProperty1<T, V>` (one receiver), `KProperty2<D, E, V>` (member extension property); mutable counterparts `KMutableProperty0/1/2`. Use `get()` / `set()`.
- Constructor references: `::User` (typed as `KFunction` subtype).
- Bound vs unbound:

```kotlin
class User(val name: String) {
    fun hasName(prefix: String) = name.startsWith(prefix)
}

// The first parameter of an unbound reference is the User receiver
val unbound: (User, String) -> Boolean = User::hasName

val jane = User("Jane")
// Reference captures jane as its receiver
val bound: (String) -> Boolean = jane::hasName
```

### Lambda expressions and anonymous functions

```kotlin
val sum: (Int, Int) -> Int = { x: Int, y: Int -> x + y }
val suspendingTask = suspend { doSuspendingWork() }
```

- Trailing lambda: `val product = items.fold(1) { acc, e -> acc * e }`; if the lambda is the only argument, omit parentheses: `run { println("...") }`.
- Implicit `it` for a single parameter: `ints.filter { it > 0 }`.
- The last expression is the return value; use `return@filter shouldFilter` for a qualified return.
- Unused parameters: `map.forEach { (_, value) -> println("$value!") }`.
- Anonymous function (allows an explicit return type): `fun(x: Int, y: Int): Int = x + y`; `ints.filter(fun(item) = item > 0)`.
- Closures capture and may modify outer variables.

### Function literals with receiver

```kotlin
val sum: Int.(Int) -> Int = { other -> plus(other) }

val sum = fun Int.(other: Int): Int = this + other

fun html(init: HTML.() -> Unit): HTML {
    val html = HTML()  // create the receiver object
    html.init()        // pass the receiver object to the lambda
    return html
}
```

Inside the literal the receiver is an implicit `this`. This is the basis of [type-safe builders](./type-safe-builders.md).

## Notes

- Non-literal values of function types with and without receiver are interchangeable: `(A, B) -> C` can be used where `A.(B) -> C` is expected, and vice versa.
- A function type without receiver is inferred by default, even when initialized from a reference to an extension function; declare the type explicitly to change that.
- Anonymous functions must be passed inside parentheses; the trailing syntax works only for lambdas.
- A bare `return` in a lambda returns from the enclosing function (only allowed when inlined, see [Inline functions](./inline-functions.md)); in an anonymous function it returns from the anonymous function itself.
- Callable-reference objects implement reflection interfaces such as `KFunction` and `KProperty`.

## Related

- [Functions](./functions.md)
- [Inline functions](./inline-functions.md)
- [Type-safe builders](./type-safe-builders.md)
- [Operator overloading](./operator-overloading.md)
