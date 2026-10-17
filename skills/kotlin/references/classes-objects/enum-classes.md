---
source: https://kotlinlang.org/docs/enum-classes.html
---

# Enum classes

Enum classes represent a fixed set of possible values. Each enum constant behaves like a singleton object of the enum class type and can have properties, functions, and custom behavior.

## Signature / Usage

```kotlin
enum class Direction {
    NORTH, SOUTH, WEST, EAST
}

val direction: Direction = Direction.NORTH
```

Every enum class inherits from `Enum<T>` (for example `Enum<Direction>`), which provides `name` and `ordinal` (0-based position).

### Constants with properties

```kotlin
enum class Color(val hex: String) {
    RED("#FF0000"),
    GREEN("#00FF00"),
    BLUE("#0000FF")
}

println(Color.GREEN.hex)
// #00FF00
```

### Find constants

```kotlin
enum class Color(val rgb: Int) {
    RED(0xFF0000),
    GREEN(0x00FF00),
    BLUE(0x0000FF)
}

Color.valueOf("RED")                          // throws IllegalArgumentException if no match
Color.entries.getOrNull(0)                    // by position
Color.entries.first { it.rgb == 0xFF0000 }    // by associated value; NoSuchElementException if none (use firstOrNull for null)
Color.entries.size                            // number of constants
```

Safe lookups through a companion object:

```kotlin
enum class Color(val rgb: Int) {
    RED(0xFF0000),
    GREEN(0x00FF00),
    BLUE(0x0000FF);

    companion object {
        fun fromName(name: String): Color? =
            entries.find { it.name == name }

        fun fromPosition(position: Int): Color? =
            entries.getOrNull(position)

        fun fromRgb(rgb: Int): Color? =
            entries.find { it.rgb == rgb }
    }
}
```

Generic helpers use reified type parameters:

| Function | Description |
| --- | --- |
| `enumEntries<T>()` | (Recommended) Returns all enum entries of `T`. Every call returns the same list. |
| `enumValues<T>()` | Returns an array with all enum entries of `T`. Every call creates a new array. |
| `enumValueOf<T>()` | Returns a single entry by name, throwing `IllegalArgumentException` if no entry matches. |

```kotlin
import kotlin.enums.enumEntries

enum class RGB { RED, GREEN, BLUE }

inline fun <reified T : Enum<T>> printAllValues() {
    println(enumEntries<T>().joinToString { it.name })
}

inline fun <reified T : Enum<T>> findByName(name: String): T = enumValueOf<T>(name)
```

### when expressions

```kotlin
fun describeColor(color: Color): String {
    return when (color) {
        Color.RED -> "Red is a warm color"
        Color.GREEN -> "Green is a natural color"
        Color.BLUE -> "Blue is a cool color"
    }
}
```

When all constants are used, no `else` branch is needed.

### Compare and sort

```kotlin
enum class Priority {
    LOW, MEDIUM, HIGH
}

println(Priority.LOW < Priority.HIGH)
// true

enum class Color(val brightness: Int) {
    RED(1),
    GREEN(3),
    BLUE(2)
}

println(Color.entries.sortedBy { it.brightness })
// [RED, BLUE, GREEN]
```

### Functions, operators, anonymous classes, interfaces

```kotlin
enum class Direction {
    NORTH, SOUTH, WEST, EAST;   // semicolon separates constants from members

    fun isVertical(): Boolean = this == NORTH || this == SOUTH

    operator fun not(): Direction = when (this) {
        NORTH -> SOUTH
        SOUTH -> NORTH
        WEST -> EAST
        EAST -> WEST
    }
}

enum class ProtocolState {
    WAITING {
        override fun signal() = TALKING
    },

    TALKING {
        override fun signal() = WAITING
    };

    abstract fun signal(): ProtocolState
}

enum class IntArithmetics : BinaryOperator<Int>, IntBinaryOperator {
    PLUS {
        override fun apply(t: Int, u: Int): Int = t + u
    },
    TIMES {
        override fun apply(t: Int, u: Int): Int = t * u
    };

    override fun applyAsInt(t: Int, u: Int) = apply(t, u)
}
```

## Notes

- Constants are conventionally uppercase. Kotlin does not use assignment syntax (`RED = "#FF0000"`); pass values to the constructor.
- The enum class name is a type; enum constants can't be used as types (`fun printRed(color: Color.RED)` is an error: enum entry cannot be used as a type).
- `valueOf()` needs an exact name. Kotlin doesn't let you cast an `Int` to an enum constant; use `entries.getOrNull(index)`, or define an explicit property (for example `rgb` / `code`) for values that must remain stable when constants are reordered.
- `entries` and `valueOf()` are synthetic members provided automatically by Kotlin for every enum class.
- Constants are ordered by declaration (`ordinal`); `Enum<T>` provides `compareTo()`, `equals()`, `hashCode()` and they can't be overridden. For a different order, sort by an explicit property.
- Members declared inside a constant's anonymous class body are not accessible from outside (the constant's type is the enum class itself). Declare shared members in the enum class body, using an abstract member when each constant needs its own implementation.
- An enum class can implement interfaces but can't inherit from a class.
- Context-sensitive resolution (omit the enum class name when the expected type is known) is currently in preview (introduced in What's new in Kotlin 2.2.0).
- For cases that hold different data or have different structure, use sealed classes or interfaces.

## Related

- [Sealed classes and interfaces](./sealed-classes.md)
- [Object declarations and expressions](./object-declarations.md)
- [Inline functions](../functions/inline-functions.md)
- [Operator overloading](../functions/operator-overloading.md)
- [Ordering](../collections/collection-ordering.md)
