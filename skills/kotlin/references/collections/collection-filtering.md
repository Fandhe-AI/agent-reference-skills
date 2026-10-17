---
source: https://kotlinlang.org/docs/collection-filtering.html
---

# Filtering collections

Extension functions that filter collections by predicates (lambdas returning a boolean). They leave the original collection unchanged, so they work on both mutable and read-only collections.

## Signature / Usage

```kotlin
fun main() {
//sampleStart
    val numbers = listOf("one", "two", "three", "four")  
    val longerThan3 = numbers.filter { it.length > 3 }
    println(longerThan3)

    val numbersMap = mapOf("key1" to 1, "key2" to 2, "key3" to 3, "key11" to 11)
    val filteredMap = numbersMap.filter { (key, value) -> key.endsWith("1") && value > 10}
    println(filteredMap)
//sampleEnd
}
```

| Function | Description |
|----------|-------------|
| `filter { }` | Elements matching the predicate. `List` and `Set` give a `List`; `Map` gives a `Map` |
| `filterIndexed { index, value -> }` | Predicate with index and value |
| `filterNot { }` | Elements for which the predicate yields `false` |
| `filterIsInstance<T>()` | Elements of a given type (`List<Any>` becomes `List<T>`) |
| `filterNotNull()` | Non-null elements (`List<T?>` becomes `List<T: Any>`) |
| `partition { }` | `Pair` of lists: matching and the rest |
| `any()`, `none()`, `all()` | Test a predicate against elements |

```kotlin
fun main() {
//sampleStart
    val numbers = listOf("one", "two", "three", "four")
    val (match, rest) = numbers.partition { it.length > 3 }

    println(match)
    println(rest)
//sampleEnd
}
```

```kotlin
fun main() {
//sampleStart
    val numbers = listOf("one", "two", "three", "four")

    println(numbers.any { it.endsWith("e") })
    println(numbers.none { it.endsWith("a") })
    println(numbers.all { it.endsWith("e") })

    println(emptyList<Int>().all { it > 5 })   // vacuous truth
//sampleEnd
}
```

## Notes

- Assign the filtering result to a variable or chain functions after filtering; the original collection is not modified.
- `all()` returns `true` for any valid predicate on an empty collection (vacuous truth).
- `any()` and `none()` without a predicate check emptiness: `any()` is `true` if there are elements; `none()` does the opposite.

## Related

- [Map-specific operations (filterKeys, filterValues)](./map-operations.md)
- [Collection operations overview](./collection-operations.md)
