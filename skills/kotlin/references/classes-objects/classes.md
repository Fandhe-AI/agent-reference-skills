---
source: https://kotlinlang.org/docs/classes.html
---

# Classes

Kotlin classes encapsulate data (properties) and behavior (functions). A class declaration consists of a header (`class` keyword, name, type parameters, optional primary constructor) and an optional body in `{}`.

## Signature / Usage

```kotlin
// Person class with a primary constructor
// that initializes the name property
class Person(val name: String) {
    // Class body with age property
    var age: Int = 0
}

fun main() {
    // Creates an instance of the Person class by calling the constructor
    val person = Person("Alice")

    // Accesses the instance's properties
    println(person.name)
    // Alice
    println(person.age)
    // 0
}
```

### Primary constructor

```kotlin
class Person constructor(name: String) { /*...*/ }

// `constructor` keyword can be omitted when there are no annotations or visibility modifiers
class Person(name: String) { /*...*/ }

// `val` / `var` declare properties; defaults are allowed; trailing commas are allowed
class Person(val name: String = "John", var age: Int = 30) { /*...*/ }
```

Parameters without `val` / `var` are not stored in the instance and are available only within the class body (for example, to initialize other properties).

### Initializer blocks

```kotlin
class Person(val age: Int) {
    init {
        require(age > 0) { "age must be positive" }
    }
}
```

`init {}` blocks run when the primary constructor executes, in the order they appear in the class body, together with property initializers.

### Secondary constructors

```kotlin
class Person(val name: String, var age: Int) {
    // Secondary constructor that takes age as a String and converts it to an Int
    constructor(name: String, age: String) : this(name, age.toIntOrNull() ?: 0) {
        println("$name created with converted age: ${this.age}")
    }
}
```

Secondary constructors must delegate to the primary constructor (directly via `this(...)`, or indirectly through another secondary constructor). Initializer blocks and property initializers run before the body of the secondary constructor. Even without a primary constructor the delegation happens implicitly.

### Classes without constructors

A class with no declared constructor has an implicit public primary constructor with no parameters. To avoid a public constructor, declare an empty primary constructor with non-default visibility:

```kotlin
class Person private constructor() { /*...*/ }
```

### Abstract classes

```kotlin
abstract class Person(val name: String, val age: Int) {
    // Abstract member: no implementation, must be implemented by subclasses
    abstract fun introduce()

    // Non-abstract member
    fun greet() {
        println("Hello, my name is $name.")
    }
}
```

### Companion objects

```kotlin
class Person(val name: String) {
    companion object {
        fun createAnonymous() = Person("Anonymous")
    }
}

val anonymous = Person.createAnonymous()
```

## Notes

- Kotlin has no `new` keyword; create instances with `Person()` / `Person("Joe")`.
- A class must have at least one constructor (primary or secondary); both are optional to declare.
- On the JVM, if all primary constructor parameters have default values, the compiler implicitly provides a parameterless constructor that uses those defaults (helps libraries such as Jackson or Spring Data JPA).
- Abstract classes and abstract members do not need `open`; they are implicitly inheritable. Abstract members must be marked `abstract` explicitly.
- Before creating a class to store data, consider a data class; to add behavior to an existing class, consider an extension.

## Related

- [Data classes](./data-classes.md)
- [Extensions](./extensions.md)
- [Inheritance](./inheritance.md)
- [Object declarations and expressions](./object-declarations.md)
- [Nested and inner classes](./nested-classes.md)
- [Properties](./properties.md)
