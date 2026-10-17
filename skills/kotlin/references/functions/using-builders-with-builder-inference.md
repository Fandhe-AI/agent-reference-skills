---
source: https://kotlinlang.org/docs/using-builders-with-builder-inference.html
---

# Using builders with builder type inference

Builder inference lets the compiler infer type arguments of a generic builder call (such as `buildMap()` / `buildList()`) from the calls inside its lambda argument.

## Signature / Usage

```kotlin
fun addEntryToMap(baseMap: Map<String, Number>, additionalEntry: Pair<String, Int>?) {
   val myMap = buildMap {
       putAll(baseMap)
       if (additionalEntry != null) {
           put(additionalEntry.first, additionalEntry.second)
       }
   }
}
```

From the `putAll()` and `put()` calls the compiler infers the type arguments of `buildMap()` as `String` and `Number`.

### Writing your own builders

The builder needs a lambda parameter of a function type with receiver, and the receiver type must:

1. Use the type arguments to be inferred: `fun <V> buildList(builder: MutableList<V>.() -> Unit) { ... }`
2. Provide public members or extensions that contain the type parameters in their signature:

```kotlin
class ItemHolder<T> {
    private val items = mutableListOf<T>()

    fun addItem(x: T) {
        items.add(x)
    }

    fun getLastItem(): T? = items.lastOrNull()
}

fun <T> ItemHolder<T>.addAllItems(xs: List<T>) {
    xs.forEach { addItem(it) }
}

fun <T> itemHolderBuilder(builder: ItemHolder<T>.() -> Unit): ItemHolder<T> = 
    ItemHolder<T>().apply(builder)

fun test(s: String) {
    val itemHolder1 = itemHolderBuilder { // Type of itemHolder1 is ItemHolder<String>
        addItem(s)
    }
    val itemHolder3 = itemHolderBuilder { // Type of itemHolder3 is ItemHolder<String?>
        val lastItem: String? = getLastItem()
        // ...
    }
}
```

### Supported features

- Inferring several type arguments: `fun <K, V> myBuilder(builder: MutableMap<K, V>.() -> Unit): Map<K, V> { ... }`
- Inferring type arguments of several builder lambdas in one call, including interdependent ones.
- Inferring type arguments that are lambda parameter or return types.

### How it works

Inside the lambda, values whose type is still being inferred have a postponed type variable type:

```kotlin
val result = buildList {
    val x = get(0)
    val y: String = x
} // result has the List<String> type inferred
```

Collected type information comes from calling receiver methods that use the type parameter, expected types of calls returning it, passing postponed values to methods expecting concrete types, and callable references to receiver members. The result is the most specific merged type:

```kotlin
val result = buildList { // Inferring postponed type variable E
    // Considering E is Number or a subtype of Number
    val n: Number? = getOrNull(0)
    // Considering E is Int or a supertype of Int
    add(1)
    // E gets inferred into Int
} // result has the List<Int> type
```

## Notes

- Before Kotlin 1.7.0, enabling builder inference required the `-Xenable-builder-inference` compiler option; since 1.7.0 it is enabled by default.
- Passing the type parameter directly as the receiver, as in `fun <T> myBuilder(builder: T.() -> Unit)`, is not yet supported.
- You can always call `equals()`, `hashCode()` and `toString()` on a postponed type variable.
- Contradictory collected type information cannot be merged and produces a compiler error.
- The compiler uses builder inference only if regular type inference cannot infer a type argument; an expected type specified outside the builder lambda fixes the receiver type (e.g. `val x: Map<in String, String> = buildMap { ... }`).

## Related

- [Type-safe builders](./type-safe-builders.md)
- [Higher-order functions and lambdas](./lambdas.md)
