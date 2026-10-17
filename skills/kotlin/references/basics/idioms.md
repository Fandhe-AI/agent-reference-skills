---
source: https://kotlinlang.org/docs/idioms.html
---

# Idioms

A collection of random and frequently used Kotlin idioms.

## Signature / Usage

```kotlin
// DTO: getters (setters for var), equals(), hashCode(), toString(), copy(), componentN()
data class Customer(val name: String, val email: String)

// Default values for function parameters
fun foo(a: Int = 0, b: String = "") { ... }

// Filter a list
val positives = list.filter { x -> x > 0 }
val positives = list.filter { it > 0 }

// Presence of an element
if ("john@example.com" in emailsList) { ... }
if ("jane@example.com" !in emailsList) { ... }

// String interpolation
println("Name $name")

// Read standard input safely
val wrongInt = readln().toIntOrNull()

// Instance checks
when (x) {
    is Foo -> ...
    is Bar -> ...
    else   -> ...
}

// Read-only list and map
val list = listOf("a", "b", "c")
val map = mapOf("a" to 1, "b" to 2, "c" to 3)

// Access a map entry (assignment requires a MutableMap)
val mutableMap = mutableMapOf("a" to 1)
println(mutableMap["key"])
mutableMap["key"] = value

// Traverse a map or a list of pairs
for ((k, v) in map) {
    println("$k -> $v")
}

// Iterate over a range
for (i in 1..100) { ... }  // closed-ended range: includes 100
for (i in 1..<100) { ... } // open-ended range: does not include 100
for (x in 2..10 step 2) { ... }
for (x in 10 downTo 1) { ... }
(1..10).forEach { ... }

// Lazy property
val p: String by lazy { // the value is computed only on first access
    // compute the string
}

// Extension functions
fun String.spaceToCamelCase() { ... }
"Convert this to camelcase".spaceToCamelCase()

// Singleton
object Resource {
    val name = "Name"
}

// Inline value classes for type-safe values
@JvmInline
value class EmployeeId(private val id: String)

@JvmInline
value class CustomerId(private val id: String)

// Instantiate an abstract class
abstract class MyAbstractClass {
    abstract fun doSomething()
    abstract fun sleep()
}

val myObject = object : MyAbstractClass() {
    override fun doSomething() {
        // ...
    }

    override fun sleep() { // ...
    }
}
```

### Null-handling idioms

```kotlin
// If-not-null shorthand
val files = File("Test").listFiles()
println(files?.size) // size is printed if files is not null

// If-not-null-else shorthand
println(files?.size ?: "empty") // if files is null, this prints "empty"

// To calculate a more complicated fallback value in a code block, use `run`
val filesSize = files?.size ?: run {
    val someSize = getSomeSize()
    someSize * 2
}

// Execute an expression if null
val email = values["email"] ?: throw IllegalStateException("Email is missing!")

// First item of a possibly empty collection
val mainEmail = emails.firstOrNull() ?: ""

// Execute if not null
value?.let {
    ... // execute this block if not null
}

// Map nullable value if not null
val mapped = value?.let { transformValue(it) } ?: defaultValue
// defaultValue is returned if the value or the transform result is null.
```

### Expressions

```kotlin
// Return on when statement
fun transform(color: String): Int {
    return when (color) {
        "Red" -> 0
        "Green" -> 1
        "Blue" -> 2
        else -> throw IllegalArgumentException("Invalid color param value")
    }
}

// try-catch expression
fun test() {
    val result = try {
        count()
    } catch (e: ArithmeticException) {
        throw IllegalStateException(e)
    }

    // Working with result
}

// if expression
val y = if (x == 1) {
    "one"
} else if (x == 2) {
    "two"
} else {
    "other"
}

// Single-expression functions
fun theAnswer() = 42

fun transform(color: String): Int = when (color) {
    "Red" -> 0
    "Green" -> 1
    "Blue" -> 2
    else -> throw IllegalArgumentException("Invalid color param value")
}
```

### Scope functions and other helpers

```kotlin
// Builder-style usage of methods that return Unit
fun arrayOfMinusOnes(size: Int): IntArray {
    return IntArray(size).apply { fill(-1) }
}

// Call multiple methods on an object instance (with)
val myTurtle = Turtle()
with(myTurtle) { //draw a 100 pix square
    penDown()
    for (i in 1..4) {
        forward(100.0)
        turn(90.0)
    }
    penUp()
}

// Configure properties of an object (apply)
val myRectangle = Rectangle().apply {
    length = 4
    breadth = 5
    color = 0xFAFAFA
}

// Java 7's try-with-resources
val stream = Files.newInputStream(Paths.get("/some/file.txt"))
stream.buffered().reader().use { reader ->
    println(reader.readText())
}

// Generic function that requires the generic type information
inline fun <reified T: Any> Gson.fromJson(json: JsonElement): T = this.fromJson(json, T::class.java)

// Swap two variables
var a = 1
var b = 2
a = b.also { b = a }

// Mark code as incomplete (TODO)
fun calcTaxes(): BigDecimal = TODO("Waiting for feedback from accounting")
```

## Notes

- A `data class` provides `equals()`, `hashCode()`, `toString()`, `copy()`, and `component1()`, `component2()`, ... for all properties declared in the primary constructor (see [Data classes](../classes-objects/data-classes.md)).
- Mixing up `EmployeeId` and `CustomerId` value classes triggers a compilation error; `@JvmInline` is only needed for JVM backends.
- `TODO()` always throws `NotImplementedError`; its return type is `Nothing`, so it can be used regardless of expected type. There is also an overload that accepts a reason parameter.

## Related

- [Basic syntax overview](./basic-syntax.md)
- [Null safety](./null-safety.md)
- [Coding conventions](./coding-conventions.md)
- [Destructuring declarations](./destructuring-declarations.md)
