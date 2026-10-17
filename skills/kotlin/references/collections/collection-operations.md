---
source: https://kotlinlang.org/docs/collection-operations.html
---

# Collection operations overview

Collection operations are declared as member functions of collection interfaces or as extension functions. Common operations return results without changing the original collection; write operations change mutable collections.

## Signature / Usage

```kotlin
fun main() {
//sampleStart
    val numbers = listOf("one", "two", "three", "four")  
    numbers.filter { it.length > 3 }  // nothing happens with `numbers`, result is lost
    println("numbers are still $numbers")
    val longerThan3 = numbers.filter { it.length > 3 } // result is stored in `longerThan3`
    println("numbers longer than 3 chars are $longerThan3")
//sampleEnd
}
```

Destination functions (`To` postfix, e.g. `filterTo()`, `associateTo()`, `mapTo()`) append results to a given mutable collection and return it:

```kotlin
fun main() {
    val numbers = listOf("one", "two", "three", "four")
//sampleStart
    // filter numbers right into a new hash set, 
    // thus eliminating duplicates in the result
    val result = numbers.mapTo(HashSet()) { it.length }
    println("distinct item lengths are $result")
//sampleEnd
}
```

In-place vs copy pairs, e.g. `sort()` vs `sorted()`:

```kotlin
fun main() {
//sampleStart
    val numbers = mutableListOf("one", "two", "three", "four")
    val sortedNumbers = numbers.sorted()
    println(numbers == sortedNumbers)  // false
    numbers.sort()
    println(numbers == sortedNumbers)  // true
//sampleEnd
}
```

## Notes

- Member functions define operations essential for a collection type (e.g. `Collection.isEmpty()`, `List.get()`). Custom collection implementations must implement them; skeletal implementations `AbstractCollection`, `AbstractList`, `AbstractSet`, `AbstractMap` (and mutable counterparts) make this easier.
- Other operations (filtering, transformation, ordering, ...) are extension functions.
- Common operation groups: transformations, filtering, plus and minus operators, grouping, retrieving collection parts, retrieving single elements, ordering, aggregate operations. Write operations are covered in Write operations, List-specific operations, and Map-specific operations.
- Functions with destination exist for filtering, association, grouping, flattening, and other operations (see the Kotlin collections reference for the full list).

## Related

- [Collection transformation operations](./collection-transformations.md)
- [Filtering collections](./collection-filtering.md)
- [Plus and minus operators](./collection-plus-minus.md)
- [Grouping](./collection-grouping.md)
- [Retrieve collection parts](./collection-parts.md)
- [Retrieve single elements](./collection-elements.md)
- [Ordering](./collection-ordering.md)
- [Aggregate operations](./collection-aggregate.md)
- [Collection write operations](./collection-write.md)
- [Extensions](../classes-objects/extensions.md)
