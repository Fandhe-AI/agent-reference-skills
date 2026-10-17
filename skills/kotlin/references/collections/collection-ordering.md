---
source: https://kotlinlang.org/docs/collection-ordering.html
---

# Ordering

Natural and custom orders (`Comparable`, `Comparator`, `compareBy()`, `thenBy()`) and the functions that sort, check order, reverse, and shuffle read-only collections (results are new collections).

## Signature / Usage

```kotlin
class Version(val major: Int, val minor: Int): Comparable<Version> {
    override fun compareTo(other: Version): Int = when {
        this.major != other.major -> this.major compareTo other.major // compareTo() in the infix form 
        this.minor != other.minor -> this.minor compareTo other.minor
        else -> 0
    }
}

fun main() {    
    println(Version(1, 2) > Version(1, 3))
    println(Version(2, 0) > Version(1, 5))
}
```

```kotlin
fun main() {
//sampleStart
    val sortedStrings = listOf("aaa", "bb", "c", "b", "a", "aa", "ccc")
        .sortedWith(compareBy<String> { it.length }.thenBy { it })

    println(sortedStrings)
    // [a, b, c, aa, bb, aaa, ccc]
//sampleEnd
}
```

| Function | Description |
|----------|-------------|
| `sorted()` / `sortedDescending()` | Natural order (elements must be `Comparable`) |
| `sortedBy { }` / `sortedByDescending { }` | Selector maps elements to `Comparable` values |
| `sortedWith(comparator)` | Custom `Comparator` |
| `isSorted()`, `isSortedDescending()`, `isSortedWith(comparator)`, `isSortedBy(selector)`, `isSortedByDescending(selector)` | Check whether elements already follow an order |
| `reversed()` | New collection with copies of the elements in reverse order |
| `asReversed()` | Reversed view of the same collection instance |
| `shuffled()` | New `List` in random order; optionally takes a `Random` |

```kotlin
data class User(val name: String, val age: Int)

fun main() {
//sampleStart
    val numbers = listOf(1, 2, 3, 4)
    println(numbers.isSorted())
    // true

    val users = listOf(
        User("Alice", 24),
        User("Bob", 31),
        User("Charlie", 29),
    )
    println(users.isSortedBy(User::age))
    // false

    val descending = listOf(4, 3, 2, 1)
    println(descending.isSortedDescending())
    // true
   
//sampleEnd
}
```

```kotlin
fun main() {
//sampleStart
    val numbers = mutableListOf("one", "two", "three", "four")
    val reversedNumbers = numbers.asReversed()
    println(reversedNumbers)
    numbers.add("five")
    println(reversedNumbers)
//sampleEnd
}
```

## Notes

- `compareTo()` returns a positive value if the receiver is greater, negative if less, zero if equal. `Comparator.compare()` is interpreted the same way.
- Numeric types use numeric order; `Char` and `String` use lexicographical order.
- `isSorted*` functions return `true` if elements are in the specified order or there are fewer than two elements, and stop at the first out-of-order pair. On collections without guaranteed iteration order (e.g. `HashSet`) the result may vary across calls; use them on `List`-like collections.
- For `Double` / `Float`, `isSorted*` treat `NaN` as greater than any other value and `-0.0` as less than `0.0`. `isSortedBy()` / `isSortedByDescending()` treat `null` selector results as less than any non-null value.
- On a sequence, `isSorted*` are terminal operations (they consume the sequence and return a `Boolean`).
- `isSorted*` are also available for arrays, primitive arrays, and unsigned arrays. Unsigned arrays and operations on them are Experimental and require opt-in with `@ExperimentalUnsignedTypes`.
- `asReversed()` on a mutable list reflects changes both ways; use `reversed()` if mutability is unknown or the source is not a list.
- For in-place sorting of mutable lists, see List-specific operations (`sort()`, `sortBy()`, `shuffle()`, `reverse()`).

## Related

- [List-specific operations](./list-operations.md)
- [Collections overview](./collections-overview.md)
