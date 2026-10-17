---
source: https://kotlinlang.org/docs/kotlin-tour-functions.html
---

# Functions: Named and Default Arguments

Declare functions with default parameter values, call them with named arguments, and shorten them to single-expression form.

```kotlin
fun printMessageWithPrefix(message: String, prefix: String = "Info") {
    println("[$prefix] $message")
}

fun main() {
    // Function called with both parameters
    printMessageWithPrefix("Hello", "Log") 
    // [Log] Hello
    
    // Function called only with message parameter
    printMessageWithPrefix("Hello")        
    // [Info] Hello
    
    printMessageWithPrefix(prefix = "Log", message = "Hello")
    // [Log] Hello
}
```

Single-expression form with inferred return type:

```kotlin
fun sum(x: Int, y: Int) = x + y

fun main() {
    println(sum(1, 2))
    // 3
}
```

## Notes

- You can skip specific parameters that have default values, but after the first skipped parameter all subsequent parameters must be named.
- If a function body uses `{}`, the return type must be declared unless it is `Unit`.
- Declaring the return type explicitly is still recommended for single-expression functions that other developers will read.
