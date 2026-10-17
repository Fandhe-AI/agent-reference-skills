---
source: https://kotlinlang.org/docs/visibility-modifiers.html
---

# Visibility modifiers

Classes, objects, interfaces, constructors, functions, properties and their setters can have visibility modifiers. Getters always have the same visibility as their properties. There are four: `private`, `protected`, `internal`, and `public`; the default is `public`.

## Signature / Usage

```kotlin
// file name: example.kt
package foo

private fun foo() { ... } // visible inside example.kt

public var bar: Int = 5 // property is visible everywhere
    private set         // setter is visible only in example.kt

internal val baz = 6    // visible inside the same module
```

### Class members

```kotlin
open class Outer {
    private val a = 1
    protected open val b = 2
    internal open val c = 3
    val d = 4  // public by default

    protected class Nested {
        public val e: Int = 5
    }
}

class Subclass : Outer() {
    // a is not visible
    // b, c and d are visible
    // Nested and e are visible

    override val b = 5   // 'b' is protected
    override val c = 7   // 'c' is internal
}

class Unrelated(o: Outer) {
    // o.a, o.b are not visible
    // o.c and o.d are visible (same module)
    // Outer.Nested is not visible, and Nested::e is not visible either
}
```

### Constructors

An explicit `constructor` keyword is needed to specify the visibility of the primary constructor:

```kotlin
class C private constructor(a: Int) { ... }
```

## Options / Props

| Modifier | Top-level declaration | Class member |
|----------|-----------------------|--------------|
| `public` (default) | visible everywhere | any client who sees the declaring class sees its `public` members |
| `internal` | visible everywhere in the same module | any client inside this module who sees the declaring class sees its `internal` members |
| `protected` | not available | same as `private`, but also visible in subclasses |
| `private` | visible only inside the file | visible inside this class only (including all its members) |

## Notes

- To use a visible top-level declaration from another package, import it.
- An outer class does not see private members of its inner classes.
- Overriding a `protected` or `internal` member without specifying visibility keeps the original visibility.
- By default, all constructors are `public` (visible wherever the class is visible; a constructor of an `internal` class is visible only within the same module). Sealed class constructors are `protected` by default.
- Local variables, functions, and classes can't have visibility modifiers.
- A module is a set of Kotlin files compiled together: an IntelliJ IDEA module, a Maven project, or a Gradle source set (the `test` source set can access the internal declarations of `main`).

## Related

- [Packages and imports](./packages.md)
- [Keywords and operators](./keyword-reference.md)
- [Coding conventions](./coding-conventions.md)
