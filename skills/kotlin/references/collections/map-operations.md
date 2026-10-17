---
source: https://kotlinlang.org/docs/map-operations.html
---

# Map-specific operations

Key-based operations for maps: retrieving values, filtering by keys / values, plus and minus operators, and write operations on mutable maps.

## Signature / Usage

```kotlin
@OptIn(ExperimentalStdlibApi::class)
fun main() {
//sampleStart
    val numbersMap = mapOf("one" to 1, "two" to 2, "three" to 3)
    println(numbersMap.get("one"))
    // 1

    println(numbersMap["one"])
    // 1

    println(numbersMap.getOrDefault("four", 10))
    // 10

    println(numbersMap["five"])
    // null
    
    val nullableMap = mapOf("one" to 1, "two" to null)
    println(nullableMap.getOrElseIfNull("two") { 0 })
    // 0

    println(nullableMap.getOrElseIfMissing("two") { 0 })
    // null

    // Throws an exception because "six" is missing from the map
    // numbersMap.getValue("six")

//sampleEnd
}
```

| Group | Functions |
|-------|-----------|
| Retrieve | `get()` / `[key]` (`null` if missing), `getValue()` (throws), `getOrElse()`, `getOrDefault()`, `getOrElseIfNull()`, `getOrElseIfMissing()`, properties `keys` (a set) and `values` (a collection) |
| Filter | `filter { (key, value) -> }`, `filterKeys { }`, `filterValues { }` |
| Operators | `+` (`Pair` or `Map`; right-hand entries win on key clash), `-` (key or collection of keys) |
| Add / update | `put()`, `putAll()` (`Map` or `Iterable` / `Sequence` / `Array` of `Pair`s), `[]` = `set()`, `+=`, `getOrPut()`, `getOrPutIfNull()`, `getOrPutIfMissing()` |
| Remove | `remove(key)`, `remove(key, value)`, `keys.remove()`, `values.remove()` (first entry with that value), `-=` |

```kotlin
fun main() {
//sampleStart
    val numbersMap = mutableMapOf("one" to 1, "two" to 2)
    numbersMap["three"] = 3     // calls numbersMap.put("three", 3)
    numbersMap += mapOf("four" to 4, "five" to 5)
    println(numbersMap)
//sampleEnd
}
```

```kotlin
@OptIn(ExperimentalStdlibApi::class)
fun main() {
//sampleStart
    val mapForNull = mutableMapOf<String, Int?>("one" to null)
    val mapForMissing = mutableMapOf<String, Int?>("one" to null)

    // Replaces the value if "one" has a null value
    mapForNull.getOrPutIfNull("one") { 1 }

    println(mapForNull)
    // {one=1}

    // Keeps the null value because "one" exists in the map
    mapForMissing.getOrPutIfMissing("one") { 1 }

    println(mapForMissing)
    // {one=null}
//sampleEnd
}
```

## Notes

- `getOrElseIfNull()` / `getOrElseIfMissing()` are for maps with nullable values: the first uses the default if the key is missing or the value is `null`; the second only if the key is missing. `getOrPutIfNull()` / `getOrPutIfMissing()` follow the same split for `getOrPut()`.
- `getOrPutIfNull()` and `getOrPutIfMissing()` are Experimental; opt in with `@OptIn(ExperimentalStdlibApi::class)`. The page's example for `getOrElseIfNull()` / `getOrElseIfMissing()` also carries this opt-in, but the page marks only the `getOrPut*` pair as Experimental in prose.
- Values can be updated; keys never change. Each key has a single value. `put()` / `putAll()` / `[]` / `+=` overwrite existing values.
- New entries in `LinkedHashMap` (default) come last when iterating; in sorted maps positions follow key order.
- `remove(key, value)` removes only if the value matches (e.g. `remove("three", 4)` removes nothing).
- `plus` / `minus` on maps behave differently from other collections; `+=` / `-=` on mutable maps modify the map (`-=` of a missing key removes nothing).

## Related

- [Filtering collections](./collection-filtering.md)
- [Collection write operations](./collection-write.md)
- [Plus and minus operators](./collection-plus-minus.md)
