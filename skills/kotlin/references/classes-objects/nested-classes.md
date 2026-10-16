---
source: https://kotlinlang.org/docs/nested-classes.html
---

# Nested and inner classes

Classes (and interfaces) can be nested in other classes. A nested class marked `inner` carries a reference to an object of its outer class.

## Signature / Usage

```kotlin
class Outer {
    private val bar: Int = 1
    class Nested {
        fun foo() = 2
    }
}

val demo = Outer.Nested().foo() // == 2
```

Interfaces can be nested too; all combinations are possible (interface in class, class in interface, interface in interface):

```kotlin
interface OuterInterface {
    class InnerClass
    interface InnerInterface
}

class OuterClass {
    class InnerClass
    interface InnerInterface
}
```

### Inner classes

```kotlin
class Outer {
    private val bar: Int = 1
    inner class Inner {
        fun foo() = bar
    }
}

val demo = Outer().Inner().foo() // == 1
```

### Anonymous inner classes

Created with an object expression:

```kotlin
window.addMouseListener(object : MouseAdapter() {

    override fun mouseClicked(e: MouseEvent) { ... }

    override fun mouseEntered(e: MouseEvent) { ... }
})
```

On the JVM, if the object is an instance of a functional Java interface (a Java interface with a single abstract method), create it with a lambda prefixed with the interface type:

```kotlin
val listener = ActionListener { println("clicked") }
```

## Notes

- A plain nested class can't access the outer class members; only `inner` classes can (see qualified `this` for disambiguation).

## Related

- [This expressions](./this-expressions.md)
- [Object declarations and expressions](./object-declarations.md)
- [Functional (SAM) interfaces](./fun-interfaces.md)
