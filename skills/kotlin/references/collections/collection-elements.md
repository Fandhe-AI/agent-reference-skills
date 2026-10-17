---
source: https://kotlinlang.org/docs/collection-elements.html
---

# Retrieve single elements

Functions for retrieving single elements from lists and sets: by position, by condition, with a selector, randomly, and existence checks.

## Signature / Usage

```kotlin
fun main() {
//sampleStart
    val numbers = listOf("one", "two", "three", "four", "five")
    println(numbers.elementAtOrNull(5))
    println(numbers.elementAtOrElse(5) { index -> "The value for index $index is undefined"})
//sampleEnd
}
```

| Group | Functions |
|-------|-----------|
| By position | `elementAt()`, `first()`, `last()`, `elementAtOrNull()`, `elementAtOrElse()` |
| By condition | `first { }`, `last { }`, `firstOrNull { }`, `lastOrNull { }`, aliases `find()`, `findLast()` |
| With selector | `firstNotNullOf { }`, `firstNotNullOfOrNull { }` |
| Random | `random()`, `randomOrNull()` (optionally with a `Random`) |
| Existence | `contains()` / `in`, `containsAll()`, `isEmpty()`, `isNotEmpty()` |

```kotlin
fun main() {
//sampleStart
    val numbers = listOf("one", "two", "three", "four", "five", "six")
    println(numbers.first { it.length > 3 })
    println(numbers.last { it.startsWith("f") })
//sampleEnd
}
```

```kotlin
fun main() {
//sampleStart
    val list = listOf<Any>(0, "true", false)
    // Converts each element to string and returns the first one that has required length
    val longEnough = list.firstNotNullOf { item -> item.toString().takeIf { it.length >= 4 } }
    println(longEnough)
//sampleEnd
}
```

```kotlin
fun main() {
//sampleStart
    val numbers = listOf("one", "two", "three", "four", "five", "six")
    println(numbers.contains("four"))
    println("zero" in numbers)
    
    println(numbers.containsAll(listOf("four", "two")))
    println(numbers.containsAll(listOf("one", "zero")))
//sampleEnd
}
```

## Notes

- `elementAt()` is useful for collections without indexed access; for `List`, the indexed access operator (`get()` or `[]`) is more idiomatic.
- A Kotlin `Set` stores elements in some order (insertion in `LinkedHashSet`, natural order in `SortedSet`, or other), so position-based functions work but results are unpredictable unless the implementation is known.
- `first { }` / `last { }` throw exceptions when no element matches; use `firstOrNull()` / `lastOrNull()` (or `find()` / `findLast()`) to get `null`.
- `firstNotNullOf()` throws `NoSuchElementException` if no non-null mapped value exists; `firstNotNullOfOrNull()` returns `null`.
- `random()` throws on empty collections; use `randomOrNull()`.
- `contains()` returns `true` if an element `equals()` the argument.

## Related

- [List-specific operations](./list-operations.md)
- [Retrieve collection parts](./collection-parts.md)
