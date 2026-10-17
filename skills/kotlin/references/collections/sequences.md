---
source: https://kotlinlang.org/docs/sequences.html
---

# Sequences

`Sequence<T>` produces elements while iterating instead of containing them. It offers the same functions as `Iterable` but processes multistep chains lazily, element by element.

## Signature / Usage

```kotlin
fun main() {
//sampleStart
    val words = "The quick brown fox jumps over the lazy dog".split(" ")
    //convert the List to a Sequence
    val wordsSequence = words.asSequence()

    val lengthsSequence = wordsSequence.filter { println("filter: $it"); it.length > 3 }
        .map { println("length: ${it.length}"); it.length }
        .take(4)

    println("Lengths of first 4 words longer than 3 chars")
    // terminal operation: obtaining the result as a List
    println(lengthsSequence.toList())
//sampleEnd
}
```

| Construct from | Function |
|----------------|----------|
| Elements | `sequenceOf(...)` |
| An `Iterable` | `asSequence()` |
| A function | `generateSequence(seed) { next }` (stops when the function returns `null`) |
| Chunks | `sequence { yield(x); yieldAll(...) }` |

```kotlin
fun main() {
//sampleStart
    val oddNumbers = sequence {
        yield(1)
        yieldAll(listOf(3, 5))
        yieldAll(generateSequence(7) { it + 2 })
    }
    println(oddNumbers.take(5).toList())
//sampleEnd
}
```

```kotlin
fun main() {
//sampleStart
    val oddNumbersLessThan10 = generateSequence(1) { if (it < 8) it + 2 else null }
    println(oddNumbersLessThan10.count())
//sampleEnd
}
```

## Notes

- With an `Iterable`, each step completes for the whole collection and produces an intermediate collection. A `Sequence` runs all steps one-by-one for every single element and computes only when the whole chain's result is requested; this avoids intermediate results. Lazy overhead can be significant for small collections or simple computations, so consider both.
- `yieldAll()` accepts an `Iterable`, an `Iterator`, or another `Sequence`; a `Sequence` argument can be infinite, but such a call must be the last (subsequent calls never execute).
- `generateSequence(1) { it + 2 }` is infinite (`count()` on it is an error); return `null` to make it finite.
- Operations are stateless (e.g. `map()`, `filter()`; `take()` / `drop()` need a small constant state) or stateful (state proportional to the number of elements). Operations returning another lazy sequence are intermediate; otherwise terminal (e.g. `toList()`, `sum()`). Elements can only be retrieved with terminal operations.
- Sequences can be iterated multiple times, but some implementations may constrain themselves to a single iteration (documented per implementation).

## Related

- [Collections overview](./collections-overview.md)
- [Collection operations overview](./collection-operations.md)
- [Retrieve collection parts](./collection-parts.md)
