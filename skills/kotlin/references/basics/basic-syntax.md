---
source: https://kotlinlang.org/docs/basic-syntax.html
---

# Basic syntax overview

A collection of basic syntax elements with examples: package, entry point, I/O, functions, variables, classes, comments, string templates, conditions, loops, `when`, ranges, collections, null checks and type checks.

## Signature / Usage

```kotlin
package my.demo

import kotlin.text.*

fun main() {
    println("Hello world!")
}

fun main(args: Array<String>) {
    println(args.contentToString())
}
```

### Standard I/O

`print` prints its argument; `println` also adds a line break. `readln()` reads the entire line the user enters as a string.

```kotlin
println("Enter any word: ")
val yourWord = readln()
print("You entered the word: ")
print(yourWord)
```

### Functions

```kotlin
fun sum(a: Int, b: Int): Int {
    return a + b
}

// Expression body, return type inferred
fun sum(a: Int, b: Int) = a + b

// No meaningful value; `: Unit` can be omitted
fun printSum(a: Int, b: Int) {
    println("sum of $a and $b is ${a + b}")
}
```

### Variables

`val` is assigned once (read-only); `var` can be reassigned. Types are inferred; a type is required when initializing later. Top-level variables are allowed.

```kotlin
val x: Int = 5
var y = 5
y += 1

val c: Int   // type required without initializer
c = 3

val PI = 3.14
var counter = 0

fun incrementX() {
    counter += 1
}
```

### Classes and instances

Classes are `final` by default; mark `open` to allow inheritance (declared with `:`).

```kotlin
open class Shape

class Rectangle(val height: Double, val length: Double): Shape() {
    val perimeter = (height + length) * 2
}

val rectangle = Rectangle(5.0, 2.0)
println("The perimeter is ${rectangle.perimeter}")
```

### Comments

Single-line and block comments; block comments can be nested.

```kotlin
// This is an end-of-line comment

/* This is a block comment
   on multiple lines. */
```

### String templates

```kotlin
var a = 1
// simple name in template:
val s1 = "a is $a"

a = 2
// arbitrary expression in template:
val s2 = "${s1.replace("is", "was")}, but now is $a"
```

### Conditional expressions

`if` can be used as an expression.

```kotlin
fun maxOf(a: Int, b: Int) = if (a > b) a else b
```

### Loops

```kotlin
val items = listOf("apple", "banana", "kiwifruit")
for (item in items) {
    println(item)
}
for (index in items.indices) {
    println("item at $index is ${items[index]}")
}

var index = 0
while (index < items.size) {
    println("item at $index is ${items[index]}")
    index++
}
```

### when expression

```kotlin
fun describe(obj: Any): String =
    when (obj) {
        1          -> "One"
        "Hello"    -> "Greeting"
        is Long    -> "Long"
        !is String -> "Not a string"
        else       -> "Unknown"
    }
```

### Ranges

```kotlin
val x = 10
val y = 9
if (x in 1..y+1) {
    println("fits in range")
}

val list = listOf("a", "b", "c")
if (-1 !in 0..list.lastIndex) {
    println("-1 is out of range")
}
if (list.size !in list.indices) {
    println("list size is out of valid list indices range, too")
}

for (x in 1..5) {
    print(x)
}
for (x in 1..10 step 2) {
    print(x)
}
for (x in 9 downTo 0 step 3) {
    print(x)
}
```

### Collections

```kotlin
val items = setOf("apple", "banana", "kiwifruit")
when {
    "orange" in items -> println("juicy")
    "apple" in items -> println("apple is fine too")
}

val fruits = listOf("banana", "avocado", "apple", "kiwifruit")
fruits
  .filter { it.startsWith("a") }
  .sortedBy { it }
  .map { it.uppercase() }
  .forEach { println(it) }
```

### Nullable values and null checks

A reference that can hold `null` must be explicitly marked nullable (`Int?`).

```kotlin
fun parseInt(str: String): Int? {
    return str.toIntOrNull()
}

fun printProduct(arg1: String, arg2: String) {
    val x = parseInt(arg1)
    val y = parseInt(arg2)

    // Using `x * y` yields error because they may hold nulls.
    if (x != null && y != null) {
        // x and y are automatically cast to non-nullable after null check
        println(x * y)
    }
    else {
        println("'$arg1' or '$arg2' is not a number")
    }
}
```

### Type checks and automatic casts

`is` checks whether an expression is an instance of a type. For an immutable local variable or property, no explicit cast is needed afterwards.

```kotlin
fun getStringLength(obj: Any): Int? {
    if (obj is String) {
        // `obj` is automatically cast to `String` in this branch
        return obj.length
    }

    // `obj` is still of type `Any` outside of the type-checked branch
    return null
}

fun getStringLength2(obj: Any): Int? {
    if (obj !is String) return null
    return obj.length
}

fun getStringLength3(obj: Any): Int? {
    // `obj` is automatically cast to `String` on the right-hand side of `&&`
    if (obj is String && obj.length >= 0) {
        return obj.length
    }
    return null
}
```

## Notes

- Package directories do not have to match packages: source files can be placed arbitrarily in the file system.
- Each section of the source page links to a detailed topic (packages, read standard input, functions, properties, classes, objects, KDoc, strings, control flow, ranges, collections, null safety, type casts).

## Related

- [Packages and imports](./packages.md)
- [Conditions and loops](./control-flow.md)
- [Null safety](./null-safety.md)
- [Document Kotlin code: KDoc](./kotlin-doc.md)
- [Idioms](./idioms.md)
