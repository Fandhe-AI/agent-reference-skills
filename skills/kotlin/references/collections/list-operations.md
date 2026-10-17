---
source: https://kotlinlang.org/docs/list-operations.html
---

# List-specific operations

Index-based operations for lists: retrieving by index, sublists, searching positions (linear and binary search), and list write operations (add, set, fill, removeAt, in-place sort).

## Signature / Usage

```kotlin
fun main() {
//sampleStart
    val numbers = listOf(1, 2, 3, 4)
    println(numbers.get(0))
    println(numbers[0])
    //numbers.get(5)                         // exception!
    println(numbers.getOrNull(5))             // null
    println(numbers.getOrElse(5, {it}))        // 5
//sampleEnd
}
```

| Group | Functions |
|-------|-----------|
| Retrieve by index | `get()` / `[]`, `getOrElse()`, `getOrNull()` |
| Parts | `subList(from, to)` (a view) |
| Linear search | `indexOf()`, `lastIndexOf()`, `indexOfFirst { }`, `indexOfLast { }` (return `-1` if not found) |
| Binary search | `binarySearch(element)`, with index range, with `Comparator`, or with a comparison function `binarySearch { }` |
| Write | `add(index, e)`, `addAll(index, c)`, `set()` / `[]`, `fill()`, `removeAt()` |
| In-place sort | `sort()`, `sortDescending()`, `sortBy()`, `sortByDescending()`, `sortWith()`, `shuffle()`, `reverse()` |

```kotlin
fun main() {
//sampleStart
    val numbers = mutableListOf("one", "two", "three", "four")
    numbers.sort()
    println(numbers)
    println(numbers.binarySearch("two"))  // 3
    println(numbers.binarySearch("z")) // -5
    println(numbers.binarySearch("two", 0, 2))  // -3
//sampleEnd
}
```

```kotlin
data class Product(val name: String, val price: Double)

fun main() {
//sampleStart
    val productList = listOf(
        Product("WebStorm", 49.0),
        Product("AppCode", 99.0),
        Product("DotTrace", 129.0),
        Product("ReSharper", 149.0))

    println(productList.binarySearch(Product("AppCode", 99.0), compareBy<Product> { it.price }.thenBy { it.name }))
//sampleEnd
}
```

```kotlin
fun main() {
//sampleStart
    val numbers = mutableListOf("one", "two", "three", "four")

    numbers.sort()
    println("Sort into ascending: $numbers")
    numbers.sortDescending()
    println("Sort into descending: $numbers")

    numbers.sortBy { it.length }
    println("Sort into ascending by length: $numbers")
    numbers.sortByDescending { it.last() }
    println("Sort into descending by the last letter: $numbers")
    
    numbers.sortWith(compareBy<String> { it.length }.thenBy { it })
    println("Sort by Comparator: $numbers")

    numbers.shuffle()
    println("Shuffle: $numbers")

    numbers.reverse()
    println("Reverse: $numbers")
//sampleEnd
}
```

## Notes

- `get()` / `[]` throws if the index is out of bounds; `getOrElse()` computes a default, `getOrNull()` returns `null`.
- `subList()` returns a view: changes to the original are reflected in sublists and vice versa.
- Binary search requires the list to be sorted ascending (by natural order, the given `Comparator`, or the comparison function); otherwise the result is undefined. It returns the index if found, else `(-insertionPoint - 1)`. With duplicate values, any matching index may be returned. When elements aren't `Comparable`, pass a `Comparator`; comparison binary search takes a function mapping elements to `Int` and finds where it returns zero (return values must grow along the list). Comparator and comparison searches also work on ranges.
- In-place sort names drop the `ed` / `d` suffix of the read-only functions (`sort*` vs `sorted*`, `shuffle()` vs `shuffled()`, `reverse()` vs `reversed()`). `asReversed()` on a mutable list returns a reversed mutable view; changes are reflected in the original.
- `set()` / `[]` doesn't change the indexes of other elements; `removeAt()` decreases indices of subsequent elements by one; `add(index, ...)` shifts subsequent elements right.

## Related

- [Collection write operations](./collection-write.md)
- [Ordering](./collection-ordering.md)
- [Retrieve single elements](./collection-elements.md)
- [Retrieve collection parts](./collection-parts.md)
