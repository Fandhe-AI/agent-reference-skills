---
source: https://kotlinlang.org/docs/properties.html
---

# Properties

Properties store and manage data through accessors: an automatically generated getter (`get()`) and, for `var`, a setter (`set()`). They can be declared in classes, interfaces, objects, companion objects, or at top level.

## Signature / Usage

```kotlin
// File: Constants.kt
package my.app

val pi = 3.14159   // read-only
var counter = 0    // mutable

class Address {
    var name: String = "Holmes, Sherlock"
    var street: String = "Baker"
    var city: String = "London"
}
```

The type can be omitted when inferred from the initializer or getter: `var initialized = 1` (`Int`); `var allByDefault` is an error (must be initialized).

### Custom getters and setters

```kotlin
class Rectangle(val width: Int, val height: Int) {
    val area: Int
        get() = this.width * this.height
}

class Point(var x: Int, var y: Int) {
    var coordinates: String
        get() = "$x,$y"
        set(value) {
            val parts = value.split(",")
            x = parts[0].toInt()
            y = parts[1].toInt()
        }
}
```

Visibility and annotations on accessors without replacing the default implementation:

```kotlin
class BankAccount(initialBalance: Int) {
    var balance: Int = initialBalance
        // Only the class can modify the balance
        private set
}

@Target(AnnotationTarget.PROPERTY_GETTER)
annotation class Inject

class Service {
    var dependency: String = "Default Service"
        @Inject get
}
```

### Backing fields

```kotlin
class Scoreboard {
    var score: Int = 0
        set(value) {
            field = value
            println("Score updated to $field")
        }
}
```

No backing field is created when the value is computed (for example `val isEmpty: Boolean get() = this.size == 0`).

### Explicit backing fields

```kotlin
class ShoppingCart {
    // Public read-only view with explicit backing field
    val items: List<String>
        field = mutableListOf()

    fun addItem(item: String) {
        items.add(item)
    }
}

// With explicit backing field type
val items: List<String>
    field: MutableList<String> = mutableListOf()
```

Limitations: the property must not have a custom getter, must be read-only (`val`), not `open`, not delegated, not a compile-time constant; the backing field type must be a subtype of the property type and have private visibility. Work around with backing properties:

```kotlin
class UserDirectory {
    private val _users = mutableListOf("sarah", "mike", "emma")

    val users: List<String>
        get() = _users.sorted()
}
```

### Compile-time constants

```kotlin
// File: AppConfig.kt
package com.example

// Compile-time constant
const val MAX_LOGIN_ATTEMPTS = 3
```

Requirements: top-level, or a member of an object declaration or companion object; initialized with a `String` or primitive type value; no custom getter. They still have a backing field (usable via reflection) and can be used in annotations.

### Late-initialized properties

```kotlin
class WeatherStation {
    lateinit var latestReading: String

    fun printReading() {
        // Checks whether the property is initialized
        if (this::latestReading.isInitialized) {
            println("Latest reading: $latestReading")
        }
    }
}
```

## Notes

- `lateinit var` is allowed on top-level properties, local variables, and properties in a class body; not in the primary constructor and not with a custom getter/setter. The type must be non-null and not a primitive type. Accessing it before initialization throws `kotlin.UninitializedPropertyAccessException`.
- `isInitialized` works only on properties accessible in the current code: same class, an outer class, or a top-level property in the same file.
- A custom setter does not run during initialization.
- Use a leading underscore for backing property names per Kotlin coding conventions.
- Explicit backing fields: the compiler smart casts `items` to `MutableList<String>` inside the class; outside it uses the public type `List<String>`.
- Overriding properties: see Inheritance. Delegating accessor logic: see Delegated properties.

## Related

- [Delegated properties](./delegated-properties.md)
- [Inheritance](./inheritance.md)
- [Extensions](./extensions.md) (extension properties)
- [Interfaces](./interfaces.md)
- [Coding conventions](../basics/coding-conventions.md)
