---
source: https://kotlinlang.org/docs/collection-grouping.html
---

# Grouping

Extension functions for grouping collection elements: `groupBy()` returns a `Map`; `groupingBy()` returns a lazy `Grouping` for applying operations to all groups.

## Signature / Usage

```kotlin
fun main() {
//sampleStart
    val numbers = listOf("one", "two", "three", "four", "five")

    // Groups the strings by their first letter using groupBy()
    val groupedByFirstLetter = numbers.groupBy { it.first().uppercase() }
    println(groupedByFirstLetter)
    // {O=[one], T=[two, three], F=[four, five]}

    // Groups the strings by their first letter and transforms the values to uppercase
    val groupedAndTransformed = numbers.groupBy(keySelector = { it.first() }, valueTransform = { it.uppercase() })
    println(groupedAndTransformed)
    // {o=[ONE], t=[TWO, THREE], f=[FOUR, FIVE]}
//sampleEnd
}
```

```kotlin
fun main() {
//sampleStart
    val numbers = listOf("one", "two", "three", "four", "five")

    // Groups the strings by their first letter using groupingBy() and counts the elements in each group
    val grouped = numbers.groupingBy { it.first() }.eachCount()

    // Iterates through each group and prints the key and its associated values
    for ((key, count) in grouped) {
        println("Key: $key, Count: $count")
        // Key: o, Count: 1
        // Key: t, Count: 2
        // Key: f, Count: 2
    }
//sampleEnd
}
```

## Options / Props

`Grouping` operations:

| Name | Description |
|------|-------------|
| `eachCount()` | Counts the elements in each group |
| `fold()` / `reduce()` | Fold and reduce on each group as a separate collection, returning the results |
| `aggregate()` | Applies an operation subsequently to all elements in each group; the generic way to implement custom operations when fold or reduce are not enough |

## Notes

- `groupBy()` with a second lambda (`valueTransform`) maps keys to transformed values instead of the original elements.
- `Grouping` is lazy: groups are built right before the operation executes.

## Related

- [Aggregate operations (fold and reduce)](./collection-aggregate.md)
- [Collection transformation operations](./collection-transformations.md)
