---
source: https://kotlinlang.org/docs/collection-combine.html
---

# Combine collections

Operators and functions for adding and removing collection elements and combining collections: `plus` / `minus`, `union()`, `intersect()`, `subtract()`; each returns a new read-only collection and leaves the originals unchanged.

## Signature / Usage

```kotlin
fun main() {
//sampleStart
    val numbers = listOf("one", "two", "three", "four")

    val plusList = numbers + "five"
    val minusList = numbers - listOf("three", "four")
    
    println(plusList)
    // [one, two, three, four, five]
   
    println(minusList)
    // [one, two]
//sampleEnd
}
```

| Operation | Description |
|-----------|-------------|
| `plus` (`+`) | Collection with the original elements and the element(s) of the second operand |
| `minus` (`-`) | Collection without the elements of the second operand (single element: first occurrence removed; collection: all occurrences of its elements removed) |
| `union()` | `Set` of distinct elements from both collections; first collection's iteration order, then new elements of the second (infix `a union b`) |
| `intersect()` | `Set` of elements present in both collections (infix) |
| `subtract()` | `Set` of elements of the first collection absent from the second (infix) |

```kotlin
fun main() {
//sampleStart
    val numbers = setOf("one", "two", "three")

    // Swapping the collections changes the result's iteration order
    println(numbers union setOf("four", "five"))
    // [one, two, three, four, five]
    println(setOf("four", "five") union numbers)
    // [four, five, one, two, three]
//sampleEnd
}
```

```kotlin
fun main() {
//sampleStart
    val numbers = setOf("one", "two", "three")

    // Finds elements present in both collections
    println(numbers intersect setOf("two", "one"))
    // [one, two]
   
    // Excludes elements present in the second collection
    println(numbers subtract setOf("three", "four"))
    // [one, two]

    // Reordering the second collection doesn't change the result
    println(numbers subtract setOf("four", "three"))
    // [one, two]
//sampleEnd
}
```

```kotlin
fun main() {
//sampleStart
    val numbers = setOf("one", "two", "three")
    val numbers2 = setOf("three", "four")

    // Combines the differences in both directions
    println((numbers - numbers2) union (numbers2 - numbers))
    // [one, two, four]
//sampleEnd
}
```

## Notes

- Augmented assignment `+=` (`plusAssign`) / `-=` (`minusAssign`): for a read-only collection in a `var`, they use `plus` / `minus` and assign the result back to the variable; for a mutable collection in a `val`, they modify the collection in place.
- Finding elements present in only one of two collections (symmetric difference): subtract the collections from each other and combine the results with `union()`; the result is a `Set`.
- For `plus` / `minus` on maps, see Map-specific operations.
- Source: https://kotlinlang.org/docs/collection-combine.html (kotlin-web-site 2f28ab9, fetched 2026-11-14). New page replacing Plus and minus operators (`collection-plus-minus`) and Set-specific operations (`set-operations`), which were removed from the official docs. The old set-operations example applying `union()` / `intersect()` to lists (result is always a `Set`, duplicates merged) is not in the new page; the new page only says the three set functions return a `Set`.

## Related

- [Change collections](./collection-write.md)
- [Map-specific operations](./map-operations.md)
- [Collection operations overview](./collection-operations.md)
- [Operator overloading](../functions/operator-overloading.md)
