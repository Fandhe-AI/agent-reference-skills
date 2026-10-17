---
source: https://kotlinlang.org/docs/iterators.html
---

# Iterators

Iterators give sequential access to collection elements without exposing the underlying structure. Obtained from `Iterable<T>` inheritors (including `Set` and `List`) with `iterator()`.

## Signature / Usage

```kotlin
fun main() {
//sampleStart
    val numbers = listOf("one", "two", "three", "four")
    val numbersIterator = numbers.iterator()
    while (numbersIterator.hasNext()) {
        println(numbersIterator.next())
        // one
        // two
        // three
        // four
    }
//sampleEnd
}
```

| Type | Capability |
|------|------------|
| `Iterator` | `hasNext()`, `next()` (forward only; cannot be reset) |
| `ListIterator` | Both directions: `hasPrevious()`, `previous()`, `nextIndex()`, `previousIndex()` |
| `MutableIterator` | Extends `Iterator` with `remove()` |
| `MutableListIterator` | Also `add()` and `set()` while iterating |

The `for` loop obtains the iterator implicitly; `forEach { }` iterates and runs the code for each element.

```kotlin
fun main() {
//sampleStart
    val numbers = listOf("one", "two", "three", "four")
    val listIterator = numbers.listIterator()
    while (listIterator.hasNext()) listIterator.next()
    println("Iterating backwards:")
    // Iterating backwards:
    while (listIterator.hasPrevious()) {
        print("Index: ${listIterator.previousIndex()}")
        println(", value: ${listIterator.previous()}")
        // Index: 3, value: four
        // Index: 2, value: three
        // Index: 1, value: two
        // Index: 0, value: one
    }
//sampleEnd
}
```

```kotlin
fun main() {
//sampleStart
    val numbers = mutableListOf("one", "four", "four") 
    val mutableListIterator = numbers.listIterator()
    
    mutableListIterator.next()
    mutableListIterator.add("two")
    println(numbers)
    // [one, two, four, four]
    mutableListIterator.next()
    mutableListIterator.set("three")   
    println(numbers)
    // [one, two, three, four]
//sampleEnd
}
```

## Notes

- Once an iterator passes the last element it can no longer retrieve elements and cannot be reset; create a new iterator to iterate again.
- A `ListIterator` can still be used after it reaches the last element because it iterates in both directions.
- `MutableIterator.remove()` lets you remove elements while iterating.

## Related

- [Collections overview](./collections-overview.md)
- [List-specific operations](./list-operations.md)
