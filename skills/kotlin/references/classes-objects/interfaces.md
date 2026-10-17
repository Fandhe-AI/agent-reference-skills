---
source: https://kotlinlang.org/docs/interfaces.html
---

# Interfaces

Interfaces can contain abstract methods and method implementations. Unlike abstract classes, interfaces cannot store state: properties must be abstract or provide accessor implementations.

## Signature / Usage

```kotlin
interface MyInterface {
    fun bar()
    fun foo() {
      // optional body
    }
}

class Child : MyInterface {
    override fun bar() {
        // body
    }
}
```

### Properties in interfaces

```kotlin
interface MyInterface {
    val prop: Int // abstract

    val propertyWithImplementation: String
        get() = "foo"

    fun foo() {
        print(prop)
    }
}

class Child : MyInterface {
    override val prop: Int = 29
}
```

### Interface inheritance

```kotlin
interface Named {
    val name: String
}

interface Person : Named {
    val firstName: String
    val lastName: String

    override val name: String get() = "$firstName $lastName"
}

data class Employee(
    // implementing 'name' is not required
    override val firstName: String,
    override val lastName: String,
    val position: Position
) : Person
```

### Resolving overriding conflicts

```kotlin
interface A {
    fun foo() { print("A") }
    fun bar()
}

interface B {
    fun foo() { print("B") }
    fun bar() { print("bar") }
}

class D : A, B {
    override fun foo() {
        super<A>.foo()
        super<B>.foo()
    }

    override fun bar() {
        super<B>.bar()
    }
}
```

A class inheriting the same member from several interfaces must override it and say how to implement it, including members for which only a single implementation is inherited.

### JVM default method generation

On the JVM, functions declared in interfaces are compiled to default methods. Control it with the `-jvm-default` compiler option:

| Value | Description |
| --- | --- |
| `enable` (default) | Generates default implementations in interfaces and includes bridge functions in subclasses and `DefaultImpls` classes; keeps binary compatibility with older Kotlin versions |
| `no-compatibility` | Generates only default implementations in interfaces; skips compatibility bridges and `DefaultImpls`; suitable for new Kotlin code |
| `disable` | Skips default methods; generates only compatibility bridges and `DefaultImpls` classes |

```kotlin
kotlin {
    compilerOptions {
        jvmDefault = JvmDefaultMode.NO_COMPATIBILITY
    }
}
```

## Notes

- Properties declared in interfaces can't have backing fields, so interface accessors can't reference them.
- A function without a body in an interface is abstract by default (no `abstract` keyword needed).

## Related

- [Functional (SAM) interfaces](./fun-interfaces.md)
- [Inheritance](./inheritance.md)
- [Delegation](./delegation.md)
- [Classes](./classes.md)
