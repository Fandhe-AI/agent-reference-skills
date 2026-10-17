---
source: https://kotlinlang.org/docs/collections-overview.html
---

# Collections overview

The Kotlin standard library provides generic interfaces, classes, and functions (package `kotlin.collections`) for creating, populating, and managing collections of any type: List, Set, Map, and ArrayDeque.

## Signature / Usage

```kotlin
fun main() {
    val numbers = mutableListOf("one", "two", "three", "four")
    numbers.add("five")   // this is OK
    println(numbers)
    //numbers = mutableListOf("six", "seven")      // compilation error
}
```

Each collection type is a pair of interfaces: a read-only interface for accessing elements, and a mutable interface that extends it with add / remove / update.

```kotlin
fun printAll(strings: Collection<String>) {
    for(s in strings) print("$s ")
    println()
}
    
fun main() {
    val stringList = listOf("one", "two", "one")
    printAll(stringList)
    
    val stringSet = setOf("one", "two", "three")
    printAll(stringSet)
}
```

```kotlin
fun main() {
    val deque = ArrayDeque(listOf(1, 2, 3))

    deque.addFirst(0)
    deque.addLast(4)
    println(deque) // [0, 1, 2, 3, 4]

    println(deque.first()) // 0
    println(deque.last()) // 4

    deque.removeFirst()
    deque.removeLast()
    println(deque) // [1, 2, 3]
}
```

## Options / Props

Collection types:

| Type | Description |
|------|-------------|
| `Collection<T>` | Root of the hierarchy (inherits `Iterable<T>`); common read-only behavior: size, membership. `MutableCollection<T>` adds `add` / `remove` |
| `List<T>` | Ordered, indexed access (indices `0..lastIndex`), duplicates allowed. Equal if same size and structurally equal elements at the same positions. `MutableList<T>` default implementation: `ArrayList` |
| `Set<T>` | Unique elements, order generally undefined; only one `null`. `MutableSet` default implementation: `LinkedHashSet` (preserves insertion order); alternative `HashSet` (no order guarantee, less memory) |
| `Map<K, V>` | Key-value pairs; unique keys, values may repeat. Not an inheritor of `Collection`. Maps with equal pairs are equal regardless of order. `MutableMap` default: `LinkedHashMap`; alternative `HashMap` |
| `ArrayDeque<T>` | Double-ended queue (resizable array); also serves as Stack and Queue |

## Notes

- Arrays are not a type of collection.
- A mutable collection does not have to be assigned to a `var`; write operations work on a `val` too. Assigning mutable collections to `val` protects the reference from reassignment (reassigning a `val` collection is a compilation error).
- Read-only collection types are covariant (a `List<Rectangle>` can be used where `List<Shape>` is required). Maps are covariant on the value type but not on the key type. Mutable collections are not covariant.
- `HashSet` / `HashMap` give unpredictable results for order-dependent functions such as `first()` / `last()`.

## Related

- [Constructing collections](./constructing-collections.md)
- [Collection operations overview](./collection-operations.md)
- [Iterators](./iterators.md)
- Arrays
- Generics (variance)
