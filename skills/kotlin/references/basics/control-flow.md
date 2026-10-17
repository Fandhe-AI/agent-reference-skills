---
source: https://kotlinlang.org/docs/control-flow.html
---

# Conditions and loops

Control flow with `if`, `when`, `for`, `while`, and `do-while`.

## Signature / Usage

### If expression

As an expression, `if` requires an `else` branch; it serves the same purpose as the ternary operator. Each branch can be a block whose last expression is the result.

```kotlin
val heightAlice = 160
val heightBob = 175

var taller = heightAlice
if (heightAlice < heightBob) taller = heightBob

// Uses if as an expression
taller = if (heightAlice > heightBob) heightAlice else heightBob

val taller2 = if (heightAlice > heightBob) {
    print("Choose Alice\n")
    heightAlice
} else {
    print("Choose Bob\n")
    heightBob
}
```

### When expressions and statements

`when` evaluates its argument and compares it against each branch in order until one condition is satisfied. It can be used as an expression (returns a value) or a statement. It can be used with or without a subject.

```kotlin
val userRole = "Editor"
when (userRole) {
    "Viewer" -> print("User has read-only access")
    "Editor" -> print("User can edit content")
    else -> print("User role is not recognized")
}
```

As a statement, cases need not be exhaustive, except when the subject is of type `Boolean`, an enum class, a sealed class/interface, or one of their nullable counterparts — such `when` statements must also cover all cases (or have an `else`). As an expression, all cases must always be covered: either list every case (possible without `else` for the subject types above) or add an `else` branch. Without a subject, an `else` branch is required.

```kotlin
enum class Bit {
    ZERO, ONE
}

val numericValue = when (getRandomBit()) {
    // No else branch is needed because all cases are covered
    Bit.ZERO -> 0
    Bit.ONE -> 1
}

val message = when {
    localFileSize > remoteFileSize -> "Local file is larger than remote file"
    localFileSize < remoteFileSize -> "Local file is smaller than remote file"
    else -> "Local and remote files are the same size"
}
```

### Other ways to use when

```kotlin
// Group multiple conditions with commas
when (ticketPriority) {
    "Low", "Medium" -> print("Standard response time")
    else -> print("High-priority handling")
}

// Expressions as branch conditions
when (enteredPin) {
    storedPin.toInt() -> print("PIN is correct")
    else -> print("Incorrect PIN")
}

// in / !in with a range or collection
when (x) {
    in 1..10 -> print("x is in the range")
    in validNumbers -> print("x is valid")
    !in 10..20 -> print("x is outside the range")
    else -> print("none of the above")
}

// is / !is (smart casts apply)
fun hasPrefix(input: Any): Boolean = when (input) {
    is String -> input.startsWith("ID-")
    else -> false
}

// Without a subject, replaces an if-else if chain
when {
    x.isOdd() -> print("x is odd")
    y.isEven() -> print("y is even")
    else -> print("x+y is odd")
}

// Capture the subject in a variable (scoped to the when body)
val message = when (val input = "yes") {
    "yes" -> "You said yes"
    "no" -> "You said no"
    else -> "Unrecognized input: $input"
}
```

### Guard conditions

Guard conditions add a second condition to a branch with `if`; they require a `when` with a subject.

```kotlin
sealed interface Animal {
    data class Cat(val mouseHunter: Boolean) : Animal
    data class Dog(val breed: String) : Animal
}

fun feedAnimal(animal: Animal) {
    when (animal) {
        // Branch with only primary condition
        is Animal.Dog -> feedDog()
        // Branch with both primary and guard conditions
        is Animal.Cat if !animal.mouseHunter -> feedCat()
        else -> println("Unknown animal")
    }
}
```

Combine guards with `&&` / `||` using parentheses, and use `else if`:

```kotlin
when (animal) {
    is Animal.Cat if (!animal.mouseHunter && animal.hungry) -> feedCat()
}

when (animal) {
    // Checks if `animal` is `Dog`
    is Animal.Dog -> feedDog()
    // Guard condition that checks if `animal` is `Cat` and not `mouseHunter`
    is Animal.Cat if !animal.mouseHunter -> feedCat()
    // Calls giveLettuce() if none of the above conditions match and animal.eatsPlants is true
    else if animal.eatsPlants -> giveLettuce()
    // Prints "Unknown animal" if none of the above conditions match
    else -> println("Unknown animal")
}
```

### For loops

```kotlin
for (item in collection) print(item)

val shoppingList = listOf("Milk", "Bananas", "Bread")
for (item in shoppingList) {
    println("- $item")
}

// Ranges
for (i in 1..6) { print(i) }          // closed-ended
for (i in 1..<6) { print(i) }         // open-ended
for (i in 6 downTo 0 step 2) { print(i) }

// Arrays with index
val routineSteps = arrayOf("Wake up", "Brush teeth", "Make coffee")
for (i in routineSteps.indices) {
    println(routineSteps[i])
}
for ((index, value) in routineSteps.withIndex()) {
    println("The step at $index is \"$value\"")
}
```

### Iterators

`for` iterates through anything that provides an `iterator()` (member or extension) returning an `Iterator<>` with `next()` and `hasNext()`. Collections provide iterators by default; ranges and arrays compile into index-based loops.

```kotlin
class Booklet(val totalPages: Int) : Iterable<Int> {
    override fun iterator(): Iterator<Int> {
        return object : Iterator<Int> {
            var current = 1
            override fun hasNext() = current <= totalPages
            override fun next() = current++
        }
    }
}
```

Alternatively, declare `operator fun iterator()`, `operator fun hasNext()`, and `operator fun next()` yourself.

### While loops

`while` checks the condition first; `do-while` runs the body first (at least once).

```kotlin
while (carsInGarage < maxCapacity) {
    println("Car entered. Cars now in garage: ${++carsInGarage}")
}

do {
    roll = Random.nextInt(1, 7)
    println("Rolled a $roll")
} while (roll != 6)
```

## Notes

- The official Control flow page states that `when` statements need not be exhaustive; the compiler nevertheless requires exhaustiveness for Boolean/enum/sealed subjects.
- Guard conditions cannot be combined with multiple comma-separated conditions in one branch (for example `0, 1 -> ...`). In a `when` expression with guard conditions and no `else`, the compiler requires every case to be handled.
- JVM 21+: the compiler generates an `invokedynamic` instruction (`SwitchBootstraps.typeSwitch()`) for eligible `when` expressions when all of these hold: all conditions except `else` are `is` or `null` checks; no guard conditions; no types that cannot be type-checked directly (for example `MutableList` or function types); at least two conditions besides `else`; all branches check the same subject.
- Context-sensitive resolution (omitting the type name for enum entries / sealed members in `when` when the expected type is known) is described in the source as "currently in preview" and is linked to the What's New 2.2 page; check its stability before use.
- `break` and `continue` are covered in Returns and jumps.

## Related

- [Returns and jumps](./returns.md)
- [Basic syntax overview](./basic-syntax.md)
- [Coding conventions](./coding-conventions.md)
