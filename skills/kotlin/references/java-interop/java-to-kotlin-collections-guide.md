---
source: https://kotlinlang.org/docs/java-to-kotlin-collections-guide.html
---

# Collections in Java and Kotlin

Compares collection concepts and operations in Java and Kotlin: operations that are the same, ones that differ, ones that exist only in Kotlin, and specific cases (mutability, covariance, ranges, sequences, ...). All examples use Java and Kotlin standard library APIs only.

## Signature / Usage

```kotlin
val numbers = mutableListOf("one", "two", "three", "four")
numbers.add("five")            // This is OK
val immutableNumbers = listOf("one", "two")
//immutableNumbers.add("five") // Compilation error - Unresolved reference: add
```

### Operations that are the same in Java and Kotlin

Lists, sets, queues, deques:

| Description | Common operations | More Kotlin alternatives |
| --- | --- | --- |
| Add element(s) | `add()`, `addAll()` | plusAssign operator: `collection += element`, `collection += anotherCollection` |
| Check contains | `contains()`, `containsAll()` | `element in collection` |
| Check empty | `isEmpty()` | `isNotEmpty()` |
| Remove under a condition | `removeIf()` | |
| Leave only selected | `retainAll()` | |
| Remove all | `clear()` | |
| Get a stream | `stream()` | sequences and methods like `map()` / `filter()` |
| Get an iterator | `iterator()` | |

Maps:

| Description | Common operations | More Kotlin alternatives |
| --- | --- | --- |
| Add element(s) | `put()`, `putAll()`, `putIfAbsent()` | `map[key] = value` behaves like `put(key, value)`; `map += Pair(key, value)` or `map += anotherMap` |
| Replace element(s) | `put()`, `replace()`, `replaceAll()` | `map[key] = value` |
| Get an element | `get()` | `map[index]` |
| Contains | `containsKey()`, `containsValue()` | `element in map` |
| Empty | `isEmpty()` | `isNotEmpty()` |
| Remove an element | `remove(key)`, `remove(key, value)` | `map -= key` |
| Remove all | `clear()` | |
| Get a stream | `stream()` on entries, keys, or values | |

Lists only: `indexOf()`, `lastIndexOf()`, `get()` (Kotlin: `list[index]`), `subList()`, `set()` / `replaceAll()` (Kotlin: `list[index] = value`).

### Operations that differ a bit

Any collection type:

| Description | Java | Kotlin |
| --- | --- | --- |
| Size | `size()` | `count()`, `size` |
| Flatten nested | `collectionOfCollections.forEach(flatCollection::addAll)` or `stream().flatMap().collect()` | `flatten()` or `flatMap()` |
| Apply function to every element | `stream().map().collect()` | `map()` |
| Accumulate | `stream().reduce()` | `reduce()`, `fold()` |
| Group and count | `stream().collect(Collectors.groupingBy(classifier, counting()))` | `eachCount()` |
| Filter | `stream().filter().collect()` | `filter()` |
| Check condition | `stream().noneMatch()`, `anyMatch()`, `allMatch()` | `none()`, `any()`, `all()` |
| Sort | `stream().sorted().collect()` | `sorted()` |
| First N | `stream().limit(N).collect()` | `take(N)` |
| Take with predicate | `stream().takeWhile().collect()` | `takeWhile()` |
| Skip first N | `stream().skip(N).collect()` | `drop(N)` |
| Skip with predicate | `stream().dropWhile().collect()` | `dropWhile()` |
| Build maps | `stream().collect(toMap(keyMapper, valueMapper))` | `associate()` |

To perform these on maps, first get the map's `entrySet`.

Lists:

| Description | Java | Kotlin |
| --- | --- | --- |
| Sort natural | `sort(null)` | `sort()` |
| Sort descending | `sort(comparator)` | `sortDescending()` |
| Remove | `remove(index)`, `remove(element)` | `removeAt(index)`, `remove(element)` or `collection -= element` |
| Fill | `Collections.fill()` | `fill()` |
| Unique elements | `stream().distinct().toList()` | `distinct()` |

### Operations that don't exist in Java's standard library

- `zip()`, `unzip()` - transform a collection.
- `aggregate()` - group by a condition.
- `takeLast()`, `takeLastWhile()`, `dropLast()`, `dropLastWhile()` - take or drop elements by a predicate.
- `slice()`, `chunked()`, `windowed()` - retrieve collection parts.
- Plus (`+`) and minus (`-`) operators - add or remove elements.

## Specific cases

### Mutability

In Java you can't tell from the type whether a collection is mutable (`Arrays.asList` and `Collections.unmodifiableList` fail at runtime with `UnsupportedOperationException`). In Kotlin you explicitly declare mutable or read-only collections; modifying a read-only one doesn't compile (see snippet above).

### Covariance

Kotlin read-only collection types are covariant: `List<Rectangle>` can be used where `List<Shape>` is required. Maps are covariant on the value type, not the key type. Mutable collections aren't covariant.

```kotlin
open class Shape(val name: String)

class Rectangle(private val rectangleName: String) : Shape(rectangleName)

fun doSthWithShapes(shapes: List<Shape>) {
    println("The shapes are: ${shapes.joinToString { it.name }}")
}

fun main() {
    val rectangles = listOf(Rectangle("rhombus"), Rectangle("parallelepiped"))
    doSthWithShapes(rectangles)
}
```

### Ranges and progressions

```kotlin
class Version(val major: Int, val minor: Int): Comparable<Version> {
    override fun compareTo(other: Version): Int {
        if (this.major != other.major) {
            return this.major - other.major
        }
        return this.minor - other.minor
    }
}

fun main() {
    val versionRange = Version(1, 11)..Version(1, 30)

    println(Version(0, 9) in versionRange)
    println(Version(1, 20) in versionRange)
}
```

Inclusive ranges don't help when you need to exclude one of the bounds.

### Comparison by several criteria

```kotlin
data class Person(
    val name: String,
    val age: Int
)

fun main() {
    val persons = listOf(Person("Jack", 35), Person("David", 30), 
        Person("Jack", 25))
    println(persons.sortedWith(compareBy(Person::name, Person::age)))
}
```

Java equivalent: `Comparator.comparing(Person::getName).thenComparingInt(Person::getAge)`.

### Sequences

Java: `IntStream.iterate(1, e -> e + 3).limit(10).sum()`. Kotlin sequences are processed lazily when possible:

```kotlin
val sum = generateSequence(1) {
    it + 3
}.take(10).sum()
println(sum) // Prints 145
```

### Removal of elements from a list

Kotlin has two removals: by index with `removeAt()` and by value with `remove()` (Java needs `Integer.valueOf()` to remove an integer value).

```kotlin
val numbers = mutableListOf(1, 2, 3, 1)
numbers.removeAt(0)
println(numbers) // [2, 3, 1]
numbers.remove(1)
println(numbers) // [2, 3]
```

### Traverse a map

```kotlin
for ((k, v) in numbers) {
    println("Key = $k, Value = $v")
}
// Or
numbers.forEach { (k, v) -> println("Key = $k, Value = $v") }
```

### First and last items of a possibly empty collection

Java 21+ also has `getFirst()` / `getLast()` on `SequencedCollection`. Kotlin:

```kotlin
val emails = listOf<String>() // Might be empty
val theOldestEmail = emails.firstOrNull() ?: ""
val theFreshestEmail = emails.lastOrNull() ?: ""
```

### Create a set from a list

Java: `Set.copyOf(sourceList)`. Kotlin:

```kotlin
val sourceList = listOf(1, 2, 3, 1)
val copySet = sourceList.toSet()
println(copySet)
```

### Group elements

Java: `Collectors.groupingBy`. Kotlin:

```kotlin
data class Request(
    val url: String,
    val responseCode: Int
)

fun main() {
    val requests = listOf(
        Request("https://kotlinlang.org/docs/home.html", 200),
        Request("https://kotlinlang.org/docs/home.html", 400),
        Request("https://kotlinlang.org/docs/comparison-to-java.html", 200)
    )
    println(requests.groupBy(Request::url))
}
```

### Filter elements

Filtering is built into collections; `filter()` returns the same collection type.

```kotlin
val numbers = mapOf("key1" to 1, "key2" to 2, "key3" to 3, "key11" to 11)
val filteredNumbers = numbers.filter { (key, value) -> key.endsWith("1") && value > 10 }
println(filteredNumbers)
```

Filter by type (smart casts do the cast):

```kotlin
val numbers = listOf(null, 1, "two", 3.0, "four")
println("All String elements in upper case:")
numbers.filterIsInstance<String>().forEach {
    println(it.uppercase())
}
```

Test predicates:

```kotlin
val numbers = listOf("one", "two", "three", "four")
println(numbers.none { it.endsWith("e") })
println(numbers.any { it.endsWith("e") })
println(numbers.all { it.endsWith("e") })
```

### Zip and associate

```kotlin
val colors = listOf("red", "brown")
val animals = listOf("fox", "bear", "wolf")

println(colors.zip(animals) { color, animal -> 
    "The ${animal.replaceFirstChar { it.uppercase() }} is $color" })
```

`zip()` returns a List of `Pair`; if sizes differ, the result has the smaller size.

```kotlin
val numbers = listOf("one", "two", "three", "four")
println(numbers.associateWith { it.length })
```

## Related

- [Collections overview](../collections/collections-overview.md)
- [Sequences](../collections/sequences.md)
- [Ranges](../collections/ranges.md)
- [Collection plus/minus](../collections/collection-plus-minus.md)
- [Strings in Java and Kotlin](./java-to-kotlin-idioms-strings.md)
- [Nullability in Java and Kotlin](./java-to-kotlin-nullability-guide.md)
