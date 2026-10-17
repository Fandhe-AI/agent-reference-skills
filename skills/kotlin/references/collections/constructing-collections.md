---
source: https://kotlinlang.org/docs/constructing-collections.html
---

# Constructing collections

Ways to create collections: from elements, builder functions, empty collections, list initializer functions, concrete constructors, copies, and results of other operations.

## Signature / Usage

```kotlin
val numbersSet = setOf("one", "two", "three", "four")
val emptySet = mutableSetOf<String>()
val numbersMap = mapOf("key1" to 1, "key2" to 2, "key3" to 3, "key4" to 1)
```

| Way | Functions |
|-----|-----------|
| From elements | `listOf<T>()`, `setOf<T>()`, `mutableListOf<T>()`, `mutableSetOf<T>()`, `mapOf()`, `mutableMapOf()` |
| Builder functions | `buildList()`, `buildSet()`, `buildMap()` (populate a mutable collection, return a read-only one) |
| Empty | `emptyList()`, `emptySet()`, `emptyMap()` (specify the element type) |
| List initializer | `List(size) { index -> value }` |
| Concrete constructors | `ArrayList`, `LinkedList`, `HashSet(32)`, ... |
| Copy | `toList()`, `toMutableList()`, `toSet()` and others |

```kotlin
val map = buildMap { // this is MutableMap<String, Int>, types of key and value are inferred from the `put()` calls below
    put("a", 1)
    put("b", 0)
    put("c", 4)
}

println(map) // {a=1, b=0, c=4}
```

```kotlin
fun main() {
//sampleStart
    val doubled = List(3, { it * 2 })  // or MutableList if you want to change its content later
    println(doubled)
//sampleEnd
}
```

```kotlin
val linkedList = LinkedList<String>(listOf("one", "two", "three"))
val presizedSet = HashSet<Int>(32)
```

```kotlin
class Person(var name: String)
fun main() {
//sampleStart
    val alice = Person("Alice")
    val sourceList = mutableListOf(alice, Person("Bob"))
    val copyList = sourceList.toList()
    sourceList.add(Person("Charles"))
    alice.name = "Alicia"
    println("First item's name is: ${sourceList[0].name} in source and ${copyList[0].name} in copy")
    println("List size is: ${sourceList.size} in source and ${copyList.size} in copy")
//sampleEnd
}
```

```kotlin
fun main() {
//sampleStart 
    val sourceList = mutableListOf(1, 2, 3)
    val referenceList: List<Int> = sourceList
    //referenceList.add(4)            //compilation error
    sourceList.add(4)
    println(referenceList) // shows the current state of sourceList
//sampleEnd
}
```

## Notes

- Map keys and values are passed as `Pair` objects (usually via the `to` infix function). `to` creates a short-living `Pair`, so use it only if performance isn't critical; alternatively create a mutable map and populate it, e.g. `mutableMapOf<String, String>().apply { this["one"] = "1"; this["two"] = "2" }`.
- Copy functions create shallow copies: they reference the same elements, so a change to an element is reflected in all copies. Adding or removing elements in the original does not affect the copies.
- Initializing a variable with an existing collection creates a new reference to the same instance; typing it as `List` to a `MutableList` restricts mutability through that reference.
- Filtering, mapping (`map`, `mapIndexed`), and association (`associateWith`) create new collections as results.

## Related

- [Collections overview](./collections-overview.md)
- [Collection write operations](./collection-write.md)
- [Filtering collections](./collection-filtering.md)
- [Collection transformation operations](./collection-transformations.md)
- [Collection operations overview](./collection-operations.md)
