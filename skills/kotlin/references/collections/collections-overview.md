---
source: https://kotlinlang.org/docs/collections-overview.html
---

# Collections overview

The Kotlin standard library provides tools for working with collections: groups of items of the same type or its subtypes (elements), with generic interfaces and functions in the `kotlin.collections` package. Main collection types: List, Set, Map, plus ArrayDeque.

## Signature / Usage

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

Each main collection type has a read-only interface (`List`) and a corresponding mutable interface (`MutableList`). `Collection<T>` is the common superinterface of `List` and `Set` and inherits from `Iterable<T>`; `Map` doesn't extend `Collection`.

## Options / Props

| Type | Description |
|------|-------------|
| `List` | Ordered collection with indexed access; may contain duplicates |
| `Set` | Collection of unique elements; no guaranteed iteration order unless the implementation preserves insertion order or sorts elements |
| `Map` (dictionary) | Set of key-value pairs; each key is unique and maps to one value |
| `ArrayDeque` | Double-ended queue usable as a queue or stack |

## Notes

- Arrays aren't a type of collection; see Arrays (when to use arrays).
- Read-only interfaces provide operations for accessing elements; mutable interfaces add adding, removing, and updating. Prefer read-only interfaces when callers don't need to modify a collection. An immutable collection can't change its elements after creation; for immutable and persistent implementations use the `kotlinx-collections-immutable` library.
- Use `Collection` as a parameter of a function that applies to different collection types; use `List` or `Set` for type-specific operations.
- Per-type details (equality, default implementations, `ArrayDeque`) are in Collection types.
- Source: https://kotlinlang.org/docs/collections-overview.html (kotlin-web-site 2f28ab9, fetched 2026-11-14). The official page was reduced to an overview; the per-type sections moved to Collection types.

## Related

- [Collection types](./collection-types.md)
- [Create collections](./constructing-collections.md)
- [Collection operations overview](./collection-operations.md)
- [Iterate collections](./iterators.md)
- [Arrays](../types/arrays.md)
