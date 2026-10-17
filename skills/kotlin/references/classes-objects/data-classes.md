---
source: https://kotlinlang.org/docs/data-classes.html
---

# Data classes

Data classes (`data` modifier) hold data; the compiler derives `equals()`/`hashCode()`, `toString()`, `componentN()` and `copy()` from the primary constructor properties.

## Signature / Usage

```kotlin
data class User(val name: String, val age: Int)

val jack = User(name = "Jack", age = 1)
val olderJack = jack.copy(age = 2)

val jane = User("Jane", 35)
val (name, age) = jane
println("$name, $age years of age")
// Jane, 35 years of age
```

Generated members (from all properties declared in the primary constructor):

| Member | Description |
| --- | --- |
| `equals()` / `hashCode()` | Pair derived from the primary constructor properties |
| `toString()` | Form `"User(name=John, age=42)"` |
| `componentN()` | One function per property, in declaration order (used by destructuring declarations) |
| `copy()` | `fun copy(name: String = this.name, age: Int = this.age) = User(name, age)` |

## Notes

- Requirements: the primary constructor must have at least one parameter; all primary constructor parameters must be `val` or `var`; data classes can't be abstract, open, sealed, or inner.
- If `equals()`, `hashCode()`, or `toString()` are explicitly implemented in the body, or have `final` implementations in a superclass, they are not generated.
- If a supertype has `open` `componentN()` functions with compatible types, the generated ones override them; if they can't be overridden (incompatible signature or `final`), an error is reported.
- Explicit implementations of `componentN()` and `copy()` are not allowed.
- Properties declared in the class body (not in the primary constructor) are excluded from the generated functions:

```kotlin
data class Person(val name: String) {
    var age: Int = 0
}
// Two Person objects with the same name but different age are equal
```

- `copy()` creates a shallow copy: references to other objects (for example a `MutableList`) are shared between the original and the copy.
- On the JVM, a parameterless constructor requires default values for all properties: `data class User(val name: String = "", val age: Int = 0)`.
- The standard library provides `Pair` and `Triple`; named data classes are usually the better design because they give properties meaningful names.
- Data classes may extend other classes (see sealed classes for examples).

## Related

- [Sealed classes and interfaces](./sealed-classes.md)
- [Object declarations and expressions](./object-declarations.md) (`data object`)
- [Classes](./classes.md)
- [Destructuring declarations](../basics/destructuring-declarations.md)
