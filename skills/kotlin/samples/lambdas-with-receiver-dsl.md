---
source: https://kotlinlang.org/docs/kotlin-tour-intermediate-lambdas-receiver.html
---

# Lambda Expressions with Receiver (DSL)

Build a small DSL by passing a lambda with receiver to a builder function.

```kotlin
class MenuItem(val name: String)

class Menu(val name: String) {
    val items = mutableListOf<MenuItem>()

    fun item(name: String) {
        items.add(MenuItem(name))
    }
}

fun menu(name: String, init: Menu.() -> Unit): Menu {
    val menu = Menu(name)
    menu.init()
    return menu
}

fun printMenu(menu: Menu) {
    println("Menu: ${menu.name}")
    menu.items.forEach { println("  Item: ${it.name}") }
}

// Use the DSL
fun main() {
    // Create the menu
    val mainMenu = menu("Main Menu") {
        // Add items to the menu
        item("Home")
        item("Settings")
        item("Exit")
    }

    // Print the menu
    printMenu(mainMenu)
    // Menu: Main Menu
    //   Item: Home
    //   Item: Settings
    //   Item: Exit
}
```

## Notes

- The function type `Menu.() -> Unit` declares `Menu` as the receiver; members are callable without a qualifier inside the lambda.
- `buildList()` and `buildString()` in the standard library follow the same pattern.
- For compile-time-checked DSLs, combine this with type-safe builders.
