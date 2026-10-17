---
source: https://kotlinlang.org/docs/set-operations.html
---

# Set-specific operations

Extension functions for set operations: `union()`, `intersect()`, `subtract()` (also infix), applicable to sets and lists.

## Signature / Usage

```kotlin
fun main() {
//sampleStart
    val numbers = setOf("one", "two", "three")

    // same output
    println(numbers intersect setOf("two", "one"))
    // [one, two]
    println(numbers subtract setOf("three", "four"))
    // [one, two]
    println(numbers subtract setOf("four", "three"))
    // [one, two]
//sampleEnd
}
```

| Function | Description |
|----------|-------------|
| `union()` | Merge two collections; first operand's elements come first |
| `intersect()` | Elements present in both |
| `subtract()` | Elements not present in the other collection |

```kotlin
fun main() {
//sampleStart
    val numbers = setOf("one", "two", "three")
    val numbers2 = setOf("three", "four")

    // merge differences 
    println((numbers - numbers2) union (numbers2 - numbers))
    // [one, two, four]
//sampleEnd
}
```

## Notes

- For ordered collections, operand order matters for `union()`.
- Symmetric difference: union of the two differences, as above.
- Applied to lists, the result is always a `Set`: duplicates are merged and index access is not available (e.g. `listOf(1, 1, 2, 3, 5, 8, -1) intersect listOf(1, 1, 2, 2, 3, 5)` is `[1, 2, 3, 5]`).

## Related

- [Collection plus and minus operators](./collection-plus-minus.md)
- [Collections overview](./collections-overview.md)
