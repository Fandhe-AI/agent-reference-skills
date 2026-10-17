---
source: https://kotlinlang.org/docs/collection-parts.html
---

# Retrieve collection parts

Extension functions for retrieving parts of a collection: by explicit positions, by result size, or by predicate.

## Signature / Usage

```kotlin
fun main() {
//sampleStart    
    val numbers = listOf("one", "two", "three", "four", "five", "six")    
    println(numbers.slice(1..3))
    println(numbers.slice(0..4 step 2))
    println(numbers.slice(setOf(3, 5, 0)))    
//sampleEnd
}
```

| Function | Description |
|----------|-------------|
| `slice(indices)` | Elements with given indices (a range or a collection of integers) |
| `take(n)` / `takeLast(n)` | First / last `n` elements; whole collection if `n` is larger than size |
| `drop(n)` / `dropLast(n)` | All elements except the first / last `n` |
| `takeWhile { }` | Elements up to but excluding the first not matching the predicate |
| `takeLastWhile { }` | Range of matching elements from the end |
| `dropWhile { }` | From the first element not matching the predicate to the end |
| `dropLastWhile { }` | From the beginning to the last element not matching the predicate |
| `chunked(size)` | `List` of `List`s of the given size (last may be smaller) |
| `windowed(size, step, partialWindows)` | Sliding windows starting from each element |
| `zipWithNext()` | `Pair` of adjacent elements |

```kotlin
fun main() {
//sampleStart
    val numbers = listOf("one", "two", "three", "four", "five", "six")
    println(numbers.takeWhile { !it.startsWith('f') })
    println(numbers.takeLastWhile { it != "three" })
    println(numbers.dropWhile { it.length == 3 })
    println(numbers.dropLastWhile { it.contains('i') })
//sampleEnd
}
```

```kotlin
fun main() {
//sampleStart
    val numbers = (1..10).toList()
    println(numbers.windowed(3, step = 2, partialWindows = true))
    println(numbers.windowed(3) { it.sum() })
//sampleEnd
}
```

```kotlin
fun main() {
//sampleStart
    val numbers = listOf("one", "two", "three", "four", "five")    
    println(numbers.zipWithNext())
    println(numbers.zipWithNext() { s1, s2 -> s1.length > s2.length})
//sampleEnd
}
```

## Options / Props

`windowed()` parameters:

| Name | Default | Description |
|------|---------|-------------|
| size | — | Window size |
| step | 1 | Distance between first elements of two adjacent windows |
| partialWindows | false | Include smaller windows starting from elements at the end of the collection |

## Notes

- `chunked()` and `windowed()` accept a transformation lambda. With `chunked()` the chunks passed to the lambda are short-living `List`s that should be consumed right in that lambda.
- `zipWithNext()` creates a `Pair` for each element except the last: on `[1, 2, 3, 4]` it gives `[[1, 2], [2, 3], [3, 4]]`, not `[[1, 2], [3, 4]]`. Its transformation takes two elements.
- `takeWhile()` returns an empty result if the first element does not match; `takeLastWhile()` if the last element does not match.

## Related

- [Ranges and progressions](./ranges.md)
- [List-specific operations (subList)](./list-operations.md)
- [Retrieve single elements](./collection-elements.md)
