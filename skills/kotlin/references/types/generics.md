---
source: https://kotlinlang.org/docs/generics.html
---

# Generics: in, out, where

Classes and functions in Kotlin can have type parameters. Kotlin has no wildcard types; instead it has declaration-site variance (`in` / `out`) and type projections.

## Signature / Usage

```kotlin
class Box<T>(t: T) {
    var value = t
}

val box: Box<Int> = Box<Int>(1)
val box2 = Box(1) // 1 has type Int, so the compiler figures out that it is Box<Int>
```

## Variance

Generic types are invariant in Java (`List<String>` is not a subtype of `List<Object>`), and Java uses wildcards (`? extends E`, `? super E`) to compensate. The mnemonic PECS (Producer-Extends, Consumer-Super) describes this. Wildcards only guarantee type safety, not immutability.

### Declaration-site variance

Annotate a type parameter with `out` when it is only returned (produced) from members, never consumed; then `C<Derived>` can be assigned to `C<Base>` (covariant). `in` makes a type parameter contravariant: it can only be consumed, never produced.

```kotlin
interface Source<out T> {
    fun nextT(): T
}

fun demo(strs: Source<String>) {
    val objects: Source<Any> = strs // This is OK, since T is an out-parameter
}

interface Comparable<in T> {
    operator fun compareTo(other: T): Int
}

fun demo(x: Comparable<Number>) {
    x.compareTo(1.0) // 1.0 has type Double, which is a subtype of Number
    val y: Comparable<Double> = x // OK!
}
```

A type parameter declared `out` may occur only in out-positions in the members of the class. Rule of thumb from the source: "Consumer in, Producer out".

## Type projections

### Use-site variance

Some classes (such as `Array`) can't be restricted to only return `T`. Use a type projection at the use site:

```kotlin
fun copy(from: Array<out Any>, to: Array<Any>) { ... }
```

`Array<out Any>` allows only methods that return `T` (corresponds to Java's `Array<? extends Object>`). `Array<in String>` corresponds to Java's `Array<? super String>`:

```kotlin
fun fill(dest: Array<in String>, value: String) { ... }
```

### Star-projections

Use `*` when you know nothing about the type argument but still want to use it safely:

- For `Foo<out T : TUpper>`, `Foo<*>` is equivalent to `Foo<out TUpper>` (safe to read `TUpper`).
- For `Foo<in T>`, `Foo<*>` is equivalent to `Foo<in Nothing>` (nothing can be written safely).
- For `Foo<T : TUpper>` (invariant), `Foo<*>` is `Foo<out TUpper>` for reading and `Foo<in Nothing>` for writing.

For `interface Function<in T, out U>`: `Function<*, String>` means `Function<in Nothing, String>`; `Function<Int, *>` means `Function<Int, out Any?>`; `Function<*, *>` means `Function<in Nothing, out Any?>`. Star-projections are like Java's raw types, but safe.

### Captured types

With a type projection such as `out T` or `in T`, the compiler represents the unknown concrete type as a captured type (non-denotable; it appears in diagnostics such as `CapturedType(out X)`). Its upper bound is used for reads and its lower bound for writes:

```kotlin
// The projected type is Array<out CharSequence>
val array: Array<out CharSequence> = arrayOf("Kotlin")

// The get() read operation uses the captured type's upper bound, CharSequence
val item = array.get(0)

// The set() write operation uses the captured type's lower bound, Nothing,
// which results in an error
array.set(0, "New value")
```

## Generic functions

Type parameters are placed before the function name. Type arguments can be omitted if they can be inferred:

```kotlin
fun <T> singletonList(item: T): List<T> {
    // ...
}

fun <T> T.basicToString(): String { // extension function
    // ...
}

val l = singletonList<Int>(1)
val l2 = singletonList(1)
```

## Generic constraints

### Upper bounds

The most common constraint is an upper bound (Java's `extends`). The default upper bound is `Any?`. Only one upper bound can be specified inside the angle brackets; for more than one, use a `where` clause, and the passed type must satisfy all conditions simultaneously:

```kotlin
fun <T : Comparable<T>> sort(list: List<T>) {  ... }

fun <T> copyWhenGreater(list: List<T>, threshold: T): List<String>
    where T : CharSequence,
          T : Comparable<T> {
    return list.filter { it > threshold }.map { it.toString() }
}
```

## Definitely non-nullable types

Declare a generic type `T` as definitely non-nullable with `T & Any`. It must have a nullable upper bound. The most common use case is overriding a Java method with `@NotNull`:

```kotlin
interface ArcadeGame<T1> : Game<T1> {
    override fun save(x: T1): T1
    // T1 is definitely non-nullable
    override fun load(x: T1 & Any): T1 & Any
}
```

When working only with Kotlin, you rarely need this explicitly because type inference handles it.

## Type erasure

Type safety checks for generics are done at compile time. At runtime, instances of generic types don't hold actual type arguments (`Foo<Bar>` and `Foo<Baz?>` are erased to `Foo<*>`).

### Generics type checks and casts

`ints is List<Int>` and `list is T` are prohibited. You can check against a star-projected type, or against the non-generic part when type arguments are known statically:

```kotlin
if (something is List<*>) {
    something.forEach { println(it) } // The items are typed as `Any?`
}

fun handleStrings(list: MutableList<String>) {
    if (list is ArrayList) {
        // `list` is smart-cast to `ArrayList<String>`
    }
}
```

Inside generic function bodies, type parameters can't be used for checks and `foo as T` is unchecked, except in inline functions with reified type parameters, where the actual type arguments are inlined at each call site. Type arguments of generic types inside checks are still erased:

```kotlin
inline fun <reified A, reified B> Pair<*, *>.asPairOf(): Pair<A, B>? {
    if (first !is A || second !is B) return null
    return first as A to second as B
}

val somePair: Pair<Any?, Any?> = "items" to listOf(1, 2, 3)

val stringToSomething = somePair.asPairOf<String, Any>()
val stringToInt = somePair.asPairOf<String, Int>()
val stringToList = somePair.asPairOf<String, List<*>>()
val stringToStringList = somePair.asPairOf<String, List<String>>() // Compiles but breaks type safety!
```

### Unchecked casts

Casts to generic types with concrete type arguments such as `foo as List<String>` can't be checked at runtime. Redesign the program structure or use generic variance and reified type parameters to avoid them. Suppress the warning by annotating the statement or declaration with `@Suppress("UNCHECKED_CAST")`:

```kotlin
inline fun <reified T> List<*>.asListOfType(): List<T>? =
    if (all { it is T })
        @Suppress("UNCHECKED_CAST")
        this as List<T> else
        null
```

On the JVM, array types retain information about the erased type of their elements, and casts to an array type are partially checked: nullability and actual type arguments of the element type are still erased.

## Underscore operator for type arguments

Use `_` for a type argument to infer it when other types are explicitly specified:

```kotlin
object Runner {
    inline fun <reified S: SomeClass<T>, T> run() : T {
        return S::class.java.getDeclaredConstructor().newInstance().execute()
    }
}

fun main() {
    // T is inferred as String because SomeImplementation derives from SomeClass<String>
    val s = Runner.run<SomeImplementation, _>()
    assert(s == "Test")
}
```

## Notes

- The Java examples on the source page (`addAll`, `Source<T>`, `Game<T>`) illustrate wildcards and `@NotNull` interop; they are not Kotlin code.

## Related

- [Type checks and casts](./typecasts.md)
- [Arrays](./arrays.md)
- [Type aliases](./type-aliases.md)
- [Inline functions (reified type parameters)](../functions/inline-functions.md)
