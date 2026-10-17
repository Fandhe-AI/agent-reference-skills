---
source: https://kotlinlang.org/docs/collection-write.html
---

# Collection write operations

Write operations available for all implementations of `MutableCollection`: adding, removing, and (for lists and maps) updating elements.

## Signature / Usage

```kotlin
fun main() {
//sampleStart
    val numbers = mutableListOf(1, 2, 5, 6)
    numbers.addAll(arrayOf(7, 8))
    println(numbers)
    numbers.addAll(2, setOf(3, 4))
    println(numbers)
//sampleEnd
}
```

| Operation | Functions |
|-----------|-----------|
| Add | `add()`, `addAll()` (argument: `Iterable`, `Sequence`, or `Array`; on lists optionally with a position first), `+=` (`plusAssign`) |
| Remove | `remove()` (one occurrence), `removeAll()` (collection or predicate), `retainAll()` (collection or predicate), `clear()`, `-=` (`minusAssign`) |

```kotlin
fun main() {
//sampleStart
    val numbers = mutableListOf(1, 2, 3, 4)
    println(numbers)
    numbers.retainAll { it >= 3 }
    println(numbers)
    numbers.clear()
    println(numbers)

    val numbersSet = mutableSetOf("one", "two", "three", "four")
    numbersSet.removeAll(setOf("one", "two"))
    println(numbersSet)
//sampleEnd
}
```

```kotlin
fun main() {
//sampleStart
    val numbers = mutableListOf("one", "two", "three", "three", "four")
    numbers -= "three"
    println(numbers)
    numbers -= listOf("four", "five")    
    //numbers -= listOf("four")    // does the same as above
    println(numbers)    
//sampleEnd
}
```

## Notes

- `addAll()` on lists adds elements in the argument order; with a position, the first argument element is inserted there and the receiver's elements shift to the end. Receiver and argument types may differ (e.g. add all items from a `Set` to a `List`).
- `-=` with a single element removes the first occurrence; with a collection, all occurrences of its elements are removed. Elements not present in the collection don't affect the operation.
- `remove(5)` on a collection without that element removes nothing.
- Updating sets doesn't make sense (it is removing one element and adding another). Updates for lists and maps are in List-specific operations and Map-specific operations.

## Related

- [Collection plus and minus operators](./collection-plus-minus.md)
- [List-specific operations](./list-operations.md)
- [Map-specific operations](./map-operations.md)
