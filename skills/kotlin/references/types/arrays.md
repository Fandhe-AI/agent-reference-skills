---
source: https://kotlinlang.org/docs/arrays.html
---

# Arrays

An array is a data structure that holds a fixed number of values of the same type or its subtypes. Elements are ordered and accessed by index. Kotlin provides the `Array<T>` class and primitive-type arrays.

## Signature / Usage

```kotlin
val simpleArray = arrayOf(1, 2, 3) // Array<Int>
val emptyArrayRight = emptyArray<String>()
val emptyArrayLeft: Array<String> = emptyArray()
val nullArray: Array<Int?> = arrayOfNulls(3)
val squares = Array(5) { i -> i * i } // 0, 1, 4, 9, 16
```

### When to use arrays

Use arrays for interoperability with Java APIs or low-level requirements (performance beyond regular applications, custom data structures). For most use cases, prefer collections.

| Functionality | Arrays | Collections |
| --- | --- | --- |
| Size | Fixed | Depends on the type |
| Read-only variant | No, always mutable | Yes (`List` and `Set`) |
| Adding and removing elements | No native support. Allocate and copy to a new array | Yes (mutable collections) |
| Structural equality with `==` | No, compares references. Use `.contentEquals()` instead | Yes |
| Primitive values | Primitive-type arrays store values without boxing | Usually boxed |
| Java interoperability | Maps to `T[]` | Maps to `java.util.List` and `java.util.Set` |
| Functional-style filtering and transformations | Limited | Extensive |

### Create arrays

Use `arrayOf()`, `arrayOfNulls()`, `emptyArray()`, or the `Array` constructor (size plus an initializer function). Declaring an array with `val` only prevents reassigning the variable; elements are mutable in both `val` and `var` arrays.

Nested arrays are arrays of arrays and don't have to be the same type or size:

```kotlin
val twoDArray = Array(2) { Array<Int>(2) { 0 } }
println(twoDArray.contentDeepToString())
// [[0, 0], [0, 0]]
```

#### Primitive-type arrays

Using `Array` with primitive values boxes them. To avoid boxing overhead, use dedicated primitive-type arrays. They are not subclasses of `Array<T>`, but provide a similar set of functions and properties.

| Kotlin type | Java equivalent |
| --- | --- |
| `BooleanArray` | `boolean[]` |
| `ByteArray` | `byte[]` |
| `CharArray` | `char[]` |
| `DoubleArray` | `double[]` |
| `FloatArray` | `float[]` |
| `IntArray` | `int[]` |
| `LongArray` | `long[]` |
| `ShortArray` | `short[]` |

```kotlin
// Constructor: size 5, initialized to zero
val primitiveTypeArray = IntArray(5)
val squares = IntArray(5) { i -> i * i }

// Factory functions
val numbers = intArrayOf(1, 2, 3, 4, 5)
val characters = charArrayOf('K', 't', 'l')
val doubles = doubleArrayOf(0.22, 4.16, 0.5)
```

Kotlin doesn't have a dedicated `StringArray` type; use `arrayOf()` or `arrayOf<String>()`. To convert primitive-type arrays to object-type arrays use `.toTypedArray()`; to convert back use `.toBooleanArray()`, `.toByteArray()`, `.toCharArray()`, and so on.

### Work with arrays

| Member | Returns |
| --- | --- |
| `size` | The number of elements |
| `indices` | The range of valid indices |
| `lastIndex` | The last valid index |
| `first()` and `last()` | First and last element |
| `isEmpty()` and `isNotEmpty()` | `true` if array is empty or not empty |
| `contains()` | `true` if array has the element |

#### Access and modify elements

Use the indexed access operator (`[]`). Out-of-bounds access throws `ArrayIndexOutOfBoundsException` at runtime. `fill(element, fromIndex, toIndex)` replaces elements in a range in place (`fromIndex` inclusive, `toIndex` exclusive).

```kotlin
val simpleArray = arrayOf(1, 2, 3)
simpleArray[0] = 10

val arr = IntArray(3)
arr.fill(1)       // 1, 1, 1
arr.fill(0, 0, 2) // 0, 0, 1
```

Arrays are invariant: `Array<String>` is not a subtype of `Array<Any>`. To express covariance, use the `Array<out Any>` type projection:

```kotlin
fun printArr(arr: Array<out Any>) {
    for (item in arr) print("$item, ")
}

printArr(arrayOf("k", "t", "n"))
// k, t, n,
```

#### Add and remove elements

Arrays have a fixed size, so `.add()` and `.remove()` are not available. Create a new array with `.copyOf` or the `+` / `+=` operators. If you frequently add or remove elements, use mutable collections.

```kotlin
var arr = intArrayOf(0, 1, 2)
arr = arr.copyOf(arr.size + 1)
arr[arr.lastIndex] = 3
// 0, 1, 2, 3

var arr2 = intArrayOf(0, 1, 2)
arr2 += 3
arr2 = arr2 + intArrayOf(4, 5)
// 0, 1, 2, 3, 4, 5
```

#### Compare arrays

Use `.contentEquals()` and `.contentDeepEquals()` to compare contents in order:

```kotlin
val simpleArray = arrayOf(1, 2, 3)
val anotherArray = arrayOf(1, 2, 3)

println(simpleArray.contentEquals(anotherArray))
// true

simpleArray[0] = 10
println(simpleArray contentEquals anotherArray)
// false
```

#### Transform arrays

`.sum()` works only with arrays of numeric data types. `.sort()` sorts in natural order in place, `.shuffle()` randomizes in place, and `.sortedArray()` returns a new sorted array without modifying the original.

```kotlin
val sumArray = arrayOf(1, 2, 3)
println(sumArray.sum())
// 6

val simpleArray = arrayOf(1, 2, 3)
simpleArray.shuffle()
simpleArray.sort()
// 1, 2, 3
```

#### Pass variable number of arguments

Use the spread operator (`*`) to pass an array to a `vararg` parameter; each element is passed as an individual argument:

```kotlin
fun main() {
    val lettersArray = arrayOf("c", "d")
    printAllStrings("a", "b", *lettersArray)
    // abcd
}

fun printAllStrings(vararg strings: String) {
    for (string in strings) {
        print(string)
    }
}
```

### Convert to collections

`.toList()`, `.toSet()`, and `.toMap()` copy the content into an independent copy and don't reflect subsequent changes to the array. `.toMap()` works only on an array of `Pair<K,V>`; if the same key appears more than once, the last value is used.

```kotlin
val simpleArray = arrayOf("a", "b", "c", "c")
println(simpleArray.toSet())  // [a, b, c]
println(simpleArray.toList()) // [a, b, c, c]

val pairArray = arrayOf("apple" to 120, "banana" to 150, "cherry" to 90, "apple" to 140)
println(pairArray.toMap())
// {apple=140, banana=150, cherry=90}
```

`.asList()` and related `as*` functions wrap the original array instead of copying it, so changes to the array are reflected in the list and vice versa:

```kotlin
val simpleArray = arrayOf("a", "b", "c")
val list = simpleArray.asList()
simpleArray[0] = "d"
println(list)
// [d, b, c]
```

## Notes

- Do not use `==` / `!=` to compare array contents; they check whether the variables point to the same object.
- Unsigned array types (`UByteArray` etc.) are Beta; see [unsigned-integer-types.md](./unsigned-integer-types.md).

## Related

- [Generics (type projections)](./generics.md)
- [Unsigned integer types](./unsigned-integer-types.md)
- [Collections overview](../collections/collections-overview.md)
