---
source: https://kotlinlang.org/docs/kotlin-tour-intermediate-open-special-classes.html
---

# Enum Classes

Represent a finite set of values, with properties and member functions, and branch on them with `when`.

```kotlin
enum class Color(val rgb: Int) {
    RED(0xFF0000),
    GREEN(0x00FF00),
    BLUE(0x0000FF),
    YELLOW(0xFFFF00);

    fun containsRed() = (this.rgb and 0xFF0000 != 0)
}

fun main() {
    val red = Color.RED
    
    // Calls containsRed() function on enum constant
    println(red.containsRed())
    // true

    // Calls containsRed() function on enum constants via class names
    println(Color.BLUE.containsRed())
    // false
  
    println(Color.YELLOW.containsRed())
    // true
}
```

```kotlin
enum class State {
    IDLE, RUNNING, FINISHED
}

fun main() {
    val state = State.RUNNING
    val message = when (state) {
        State.IDLE -> "It's idle"
        State.RUNNING -> "It's running"
        State.FINISHED -> "It's finished"
    }
    println(message)
    // It's running
}
```

## Notes

- Separate enum constants with commas; end the constant list with `;` before adding member functions.
- Hexadecimal literals are stored as `Int`, so the `rgb` property has type `Int`.
