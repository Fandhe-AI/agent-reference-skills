---
source: https://kotlinlang.org/docs/delegation.html
---

# Delegation

Kotlin supports the delegation pattern natively (class delegation with the `by` clause), as an alternative to implementation inheritance, with zero boilerplate.

## Signature / Usage

```kotlin
interface Base {
    fun print()
}

class BaseImpl(val x: Int) : Base {
    override fun print() { print(x) }
}

class Derived(b: Base) : Base by b

fun main() {
    val base = BaseImpl(10)
    val derived = Derived(base)

    derived.print()
    // 10
}
```

The `by`-clause in the supertype list indicates that `b` is stored internally in `Derived` objects and the compiler generates all the `Base` methods forwarding to `b`.

### Overriding a member of an interface implemented by delegation

```kotlin
interface Base {
    fun printMessage()
    fun printMessageLine()
}

class BaseImpl(val x: Int) : Base {
    override fun printMessage() { print(x) }
    override fun printMessageLine() { println(x) }
}

class Derived(b: Base) : Base by b {
    override fun printMessage() { println("abc") }
}

fun main() {
    val base = BaseImpl(10)
    val derived = Derived(base)

    derived.printMessage()
    // abc
    derived.printMessageLine()
    // 10
}
```

## Notes

- Members overridden in `Derived` are used instead of the delegate's. They are not called from the delegate object's own members, which can only access the delegate's own implementations (for example, `print()` in `BaseImpl` still prints `BaseImpl: x = 10` even if `Derived` overrides `message`).

## Related

- [Delegated properties](./delegated-properties.md)
- [Interfaces](./interfaces.md)
- [Inheritance](./inheritance.md)
- [Inline value classes](./inline-classes.md) (delegation to an inlined value)
