---
source: https://kotlinlang.org/docs/kotlin-tour-control-flow.html
---

# Control Flow: if and when as Expressions

Use `if` and `when` as expressions that return a value.

```kotlin
fun main() {
    val a = 1
    val b = 2

    println(if (a > b) a else b) // Returns a value: 2
}
```

`when` with a subject, used as an expression:

```kotlin
fun main() {
    val trafficLightState = "Red" // This can be "Green", "Yellow", or "Red"

    val trafficAction = when (trafficLightState) {
        "Green" -> "Go"
        "Yellow" -> "Slow down"
        "Red" -> "Stop"
        else -> "Malfunction"
    }

    println(trafficAction)  
    // Stop
}
```

## Notes

- Kotlin has no ternary operator `condition ? then : else`; use `if` as an expression.
- Branch conditions in `when` are checked sequentially and only the first matching branch runs.
- A `when` without a subject needs an `else` branch; with a subject, Kotlin can check that all cases are covered.
