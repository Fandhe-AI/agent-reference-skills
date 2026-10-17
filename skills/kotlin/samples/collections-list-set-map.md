---
source: https://kotlinlang.org/docs/kotlin-tour-collections.html
---

# Collections: List, Set, and Map

Create read-only and mutable lists, sets, and maps, and access, add, and remove items.

```kotlin
fun main() { 
    // Read only list
    val readOnlyShapes = listOf("triangle", "square", "circle")
    println(readOnlyShapes)
    // [triangle, square, circle]
    
    // Mutable list with explicit type declaration
    val shapes: MutableList<String> = mutableListOf("triangle", "square", "circle")
    shapes.add("pentagon") 
    println(shapes)  
    // [triangle, square, circle, pentagon]

    // Set drops duplicates
    val readOnlyFruit = setOf("apple", "banana", "cherry", "cherry")
    println(readOnlyFruit)
    // [apple, banana, cherry]

    // Map with `to` pairs
    val juiceMenu: MutableMap<String, Int> = mutableMapOf("apple" to 100, "kiwi" to 190, "orange" to 100)
    juiceMenu["coconut"] = 150 // Add key "coconut" with value 150 to the map
    println(juiceMenu)
    // {apple=100, kiwi=190, orange=100, coconut=150}
    println("orange" in juiceMenu)
    // true
}
```

Read-only view of a mutable collection:

```kotlin
val shapes: MutableList<String> = mutableListOf("triangle", "square", "circle")
val shapesLocked: List<String> = shapes
```

## Notes

- Looking up a missing map key returns `null`.
- Sets are unordered, so an item cannot be accessed by index.
- Assigning a mutable collection to a `List` / `Set` / `Map` variable creates a read-only view, not a copy.
