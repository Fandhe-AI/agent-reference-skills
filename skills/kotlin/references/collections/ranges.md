---
source: https://kotlinlang.org/docs/ranges.html
---

# Ranges and progressions

Ranges and progressions define sequences of values: range operators, iteration, custom step values, and arithmetic progressions (`IntProgression`, `LongProgression`, `CharProgression`).

## Signature / Usage

```kotlin
fun main() {
//sampleStart
    // Closed-ended range: includes both 1 and 4
    println(4 in 1..4)
    // true
    
    // Open-ended range: includes 1, excludes 4
    println(4 in 1..<4)
    // false
//sampleEnd
}
```

| Syntax | Description |
|--------|-------------|
| `a..b` (`.rangeTo()`) | Closed-ended range, includes both ends |
| `a..<b` (`.rangeUntil()`) | Open-ended range, excludes the end |
| `a downTo b` | Reverse iteration |
| `range step n` | Custom step instead of the default 1 |

```kotlin
fun main() {
//sampleStart
    for (i in 0..8 step 2) print(i)
    println()
    // 02468
    for (i in 0..<8 step 2) print(i)
    println()
    // 0246
    for (i in 8 downTo 0 step 2) print(i)
    // 86420
//sampleEnd
}
```

```kotlin
fun main() {
//sampleStart
    for (i in 1..9 step 3) print(i) // the last element is 7
    // 147
//sampleEnd
}
```

```kotlin
fun main() {
//sampleStart
    println((1..10).filter { it % 2 == 0 })
    // [2, 4, 6, 8, 10]
//sampleEnd
}
```

## Notes

- Progressions have three properties: `first`, `last`, and a non-zero `step`; each next element is the previous plus `step`. Iteration with a positive step is equivalent to an indexed `for` loop in Java/JavaScript. Implicit progressions from iterating a range have the range endpoints as `first` / `last` and `step` 1.
- `last` for a positive step is the maximum value not greater than the end such that `(last - first) % step == 0`; for a negative step, the minimum value not less than the end such that `(last - first) % step == 0`. So `last` is not always the specified end value.
- Progressions implement `Iterable<N>` (`Int`, `Long`, or `Char`), so they work with collection functions such as `map` and `filter`.

## Related

- [Retrieve collection parts (slice)](./collection-parts.md)
- [Control flow](../basics/control-flow.md)
