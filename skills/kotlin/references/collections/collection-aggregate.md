---
source: https://kotlinlang.org/docs/collection-aggregate.html
---

# Aggregate operations

Functions returning a single value based on the collection content: min / max, average, sum, count, and fold / reduce.

## Signature / Usage

```kotlin
fun main() {
    val numbers = listOf(6, 42, 10, 4)

    println("Count: ${numbers.count()}")
    println("Max: ${numbers.maxOrNull()}")
    println("Min: ${numbers.minOrNull()}")
    println("Average: ${numbers.average()}")
    println("Sum: ${numbers.sum()}")
}
```

| Function | Description |
|----------|-------------|
| `minOrNull()` / `maxOrNull()` | Smallest / largest element; `null` on empty collections |
| `minByOrNull()` / `maxByOrNull()` | Element for which the selector returns the smallest / largest value |
| `minWithOrNull()` / `maxWithOrNull()` | Smallest / largest element according to a `Comparator` |
| `minOfOrNull()` / `maxOfOrNull()` | Smallest / largest return value of the selector |
| `minOfWithOrNull()` / `maxOfWithOrNull()` | Smallest / largest selector value according to a `Comparator` |
| `minOf`, `maxOf`, `minOfWith`, `maxOfWith` | Same, but throw `NoSuchElementException` on empty collections |
| `average()`, `sum()`, `count()` | Average, sum, number of elements |
| `sumOf { }` | Sum of a selector (returns `Int`, `Long`, `Double`, `UInt`, `ULong`; also `BigInteger` and `BigDecimal` on the JVM) |
| `reduce()`, `fold()` | Accumulate sequentially; `fold()` takes an initial value |
| `reduceRight()`, `foldRight()` | From the last element; operation argument order is element, then accumulated value |
| `reduceIndexed()`, `foldIndexed()`, `reduceRightIndexed()`, `foldRightIndexed()` | Index passed as first argument |
| `reduceOrNull()`, `reduceRightOrNull()`, `reduceIndexedOrNull()`, `reduceRightIndexedOrNull()` | `null` instead of an exception on empty collections |
| `runningFold()` (synonym `scan()`), `runningReduce()`, `runningFoldIndexed()`, `runningReduceIndexed()` | Keep intermediate accumulator values |

```kotlin
fun main() {
//sampleStart
    val numbers = listOf(5, 2, 10, 4)

    val simpleSum = numbers.reduce { sum, element -> sum + element }
    println(simpleSum)
    val sumDoubled = numbers.fold(0) { sum, element -> sum + element * 2 }
    println(sumDoubled)

    //incorrect: the first element isn't doubled in the result
    //val sumDoubledReduce = numbers.reduce { sum, element -> sum + element * 2 } 
    //println(sumDoubledReduce)
//sampleEnd
}
```

```kotlin
fun main() {
//sampleStart
    val numbers = listOf(0, 1, 2, 3, 4, 5)
    val runningReduceSum = numbers.runningReduce { sum, item -> sum + item }
    val runningFoldSum = numbers.runningFold(10) { sum, item -> sum + item }
//sampleEnd
    val transform = { index: Int, element: Int -> "N = ${index + 1}: $element" }
    println(runningReduceSum.mapIndexed(transform).joinToString("\n", "Sum of first N elements with runningReduce:\n"))
    println(runningFoldSum.mapIndexed(transform).joinToString("\n", "Sum of first N elements with runningFold:\n"))
}
```

## Notes

- `reduce()` uses the first and second elements as operation arguments on its first step, whereas `fold()` uses the initial value as the accumulated value; passing the same function can therefore give different results.
- All `reduce` operations throw an exception on empty collections; use the `*OrNull()` counterparts to receive `null`.

## Related

- [Grouping (Grouping.fold / reduce / aggregate)](./collection-grouping.md)
- [Ordering](./collection-ordering.md)
