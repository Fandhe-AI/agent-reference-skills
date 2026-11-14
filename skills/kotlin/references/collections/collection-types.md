---
source: https://kotlinlang.org/docs/collection-types.html
---

# Collection types

Kotlin's three main collection types, List, Set, and Map, plus `ArrayDeque`: how each stores elements, equality rules, and default implementations.

## Signature / Usage

```kotlin
fun main() {
//sampleStart
    val numbers = listOf("one", "two", "three", "four")
    
    println("Number of elements: ${numbers.size}")
    // Number of elements: 4
    
    println("Third element: ${numbers.get(2)}")
    // Third element: three
    
    println("Fourth element: ${numbers[3]}")
    // Fourth element: four

    println("Index of element \"two\": ${numbers.indexOf("two")}")
    // Index of element "two": 1
//sampleEnd
}
```

```kotlin
fun main() {
//sampleStart
    val numbers = mutableListOf(1, 2, 3, 4)
    // Adds an element to the list
    numbers.add(5)
    // Removes the element at index 1
    numbers.removeAt(1)
    // Replaces the element at index 0
    numbers[0] = 0
    
    numbers.shuffle()
    println(numbers)
//sampleEnd
}
```

```kotlin
fun main() {
//sampleStart
    // LinkedHashSet is the default implementation
    val numbers = setOf(1, 2, 3, 4)
    val numbersBackwards = setOf(4, 3, 2, 1)
    
    println(numbers.first() == numbersBackwards.first())
    // false
    
    println(numbers.first() == numbersBackwards.last())
    // true
//sampleEnd
}
```

```kotlin
fun main() {
//sampleStart
    val numbersMap = mapOf("key1" to 1, "key2" to 2, "key3" to 3, "key4" to 1)
    
    println("All keys: ${numbersMap.keys}")
    // All keys: [key1, key2, key3, key4]
    
    println("All values: ${numbersMap.values}")
    // All values: [1, 2, 3, 1]
    
    if ("key2" in numbersMap) println("Value by key \"key2\": ${numbersMap["key2"]}")
    // Value by key "key2": 2
    
    if (1 in numbersMap.values) println("The value 1 is in the map")
    // The value 1 is in the map
    
    // Checks for the value with containsValue(), equivalent to the previous condition
    if (numbersMap.containsValue(1)) println("The value 1 is in the map")
    // The value 1 is in the map
//sampleEnd
}
```

```kotlin
fun main() {
    val deque = ArrayDeque(listOf(1, 2, 3))

    deque.addFirst(0)
    deque.addLast(4)
    println(deque)
    // [0, 1, 2, 3, 4]

    println(deque.first())
    // 0
    
    println(deque.last())
    // 4

    deque.removeFirst()
    deque.removeLast()
    println(deque)
    // [1, 2, 3]
}
```

## Options / Props

| Type | Description |
|------|-------------|
| `List<T>` | Elements in a specified order with indexed access (indices `0` to `lastIndex`, which is `list.size - 1`); duplicates allowed, including multiple references to the same object. Equal if same size and structurally equal elements at the same positions. |
| `MutableList<T>` | `List` with list-specific write operations; unlike an array, can change size. Default implementation: `ArrayList`. |
| `Set<T>` | Unique elements; iteration order not guaranteed by the interface. At most one `null` if the element type is nullable and the implementation supports `null`. Equal if same size and each element of one set has an equal element in the other. |
| `MutableSet<T>` | `Set` with write operations from `MutableCollection`. Default implementation: `LinkedHashSet` (preserves insertion order); alternative `HashSet` (requires less memory, no insertion-order guarantee). |
| `Map<K, V>` | Key-value pairs (entries); keys unique, different keys can have equal values. Not an inheritor of `Collection`, but a Kotlin collection type. Equal if same key-value pairs regardless of order. |
| `MutableMap<K, V>` | `Map` with map-specific write operations (add a pair, update a value by key). Default implementation: `LinkedHashMap` (preserves insertion order); alternative `HashMap` (no order guarantee). |
| `ArrayDeque<T>` | Double-ended queue backed by a resizable array; add or remove at either end; serves as both stack and queue. |

## Notes

- Indexed access performance depends on the list implementation. When processing all elements of a list, prefer iteration over repeatedly accessing elements by index.
- A map can contain at most one `null` key if its key type is nullable and its implementation supports `null` keys. Support for `null` values depends on the value type and the implementation.
- Because `LinkedHashSet` preserves insertion order, order-dependent functions such as `first()` and `last()` return predictable results; with `HashSet` you can't rely on them returning elements in insertion order.
- Source: https://kotlinlang.org/docs/collection-types.html (kotlin-web-site 2f28ab9, fetched 2026-11-14). New page: the per-type sections of the former Collections overview moved here.

## Related

- [Collections overview](./collections-overview.md)
- [List-specific operations](./list-operations.md)
- [Map-specific operations](./map-operations.md)
- [Change collections](./collection-write.md)
- [Arrays](../types/arrays.md)
