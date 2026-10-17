---
source: https://kotlinlang.org/docs/collection-plus-minus.html
---

# Plus and minus operators

`plus` (`+`) and `minus` (`-`) take a collection as the first operand and an element or another collection as the second; they return a new read-only collection.

## Signature / Usage

```kotlin
fun main() {
//sampleStart
    val numbers = listOf("one", "two", "three", "four")

    val plusList = numbers + "five"
    val minusList = numbers - listOf("three", "four")
    println(plusList)
    println(minusList)
//sampleEnd
}
```

## Notes

- `plus` result contains the elements of the original collection and of the second operand.
- `minus` result contains the original elements except those of the second operand: a single element removes its first occurrence; a collection removes all occurrences of its elements.
- Augmented assignments `+=` (`plusAssign`) and `-=` (`minusAssign`): for read-only collections they use `plus` / `minus` and assign the result to the same variable, so they work only on `var` read-only collections. For mutable collections they modify the collection even if it is a `val`.
- Maps handle `plus` / `minus` differently; see Map-specific operations.

## Related

- [Collection write operations](./collection-write.md)
- [Map-specific operations](./map-operations.md)
- Operator overloading
