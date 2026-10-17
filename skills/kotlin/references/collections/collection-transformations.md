---
source: https://kotlinlang.org/docs/collection-transformations.html
---

# Collection transformation operations

Extension functions that build new collections from existing ones: map, zip, associate, flatten, and string representation.

## Signature / Usage

```kotlin
fun main() {
//sampleStart
    val numbers = setOf(1, 2, 3)
    println(numbers.map { it * 3 })
    println(numbers.mapIndexed { idx, value -> value * idx })
//sampleEnd
}
```

| Group | Functions |
|-------|-----------|
| Map | `map()`, `mapIndexed()`, `mapNotNull()`, `mapIndexedNotNull()`, `mapKeys()`, `mapValues()` |
| Zip | `zip()` (also infix `a zip b`, or with a two-parameter transform), `unzip()` |
| Associate | `associateWith()`, `associateBy()`, `associate()` |
| Flatten | `flatten()`, `flatMap()` |
| String representation | `joinToString()`, `joinTo()` |

```kotlin
fun main() {
//sampleStart
    val colors = listOf("red", "brown", "grey")
    val animals = listOf("fox", "bear", "wolf")
    println(colors zip animals)

    val twoAnimals = listOf("fox", "bear")
    println(colors.zip(twoAnimals))
//sampleEnd
}
```

```kotlin
fun main() {
//sampleStart
    val numbers = listOf("one", "two", "three", "four")

    println(numbers.associateBy { it.first().uppercaseChar() })
    println(numbers.associateBy(keySelector = { it.first().uppercaseChar() }, valueTransform = { it.length }))
//sampleEnd
}
```

```kotlin
fun main() {
//sampleStart
    val numberSets = listOf(setOf(1, 2, 3), setOf(4, 5, 6), setOf(1, 2))
    println(numberSets.flatten())
//sampleEnd
}
```

```kotlin
fun main() {
//sampleStart
    val numbers = listOf("one", "two", "three", "four")    
    println(numbers.joinToString(separator = " | ", prefix = "start: ", postfix = ": end"))
//sampleEnd
}
```

## Options / Props

`joinToString()` / `joinTo()` parameters:

| Name | Type | Description |
|------|------|-------------|
| separator | String | Placed after each element except the last |
| prefix | String | Start of the resulting string |
| postfix | String | End of the resulting string |
| limit | Int | Number of elements included; the rest are replaced with `truncated` |
| truncated | String | Replacement for the elements beyond `limit` |
| transform | (T) -> CharSequence | Customizes the representation of elements |

## Notes

- `map()` keeps the order of the original elements. `mapNotNull()` / `mapIndexedNotNull()` drop `null` results.
- `mapKeys()` transforms keys and keeps values; `mapValues()` does the reverse. Both transformations take a map entry.
- `zip()` result has the smaller size when the collections differ in size. `zip()` returns a `List` of `Pair`; `unzip()` builds two lists from a list of pairs.
- `associateWith()` / `associateBy()`: if two elements (or keys) are equal, only the last one remains in the map.
- `associate()` produces short-living `Pair` objects, which may affect performance; use it when performance isn't critical or when key and value are produced from an element together.
- `flatMap()` behaves as `map()` (with a collection as mapping result) followed by `flatten()`.
- `joinTo()` appends the result to the given `Appendable`.

## Related

- [Collection operations overview](./collection-operations.md)
- [Grouping](./collection-grouping.md)
- [Constructing collections](./constructing-collections.md)
