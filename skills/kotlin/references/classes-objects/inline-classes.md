---
source: https://kotlinlang.org/docs/inline-classes.html
---

# Inline value classes

Inline (value) classes wrap a single value into a domain-specific type without the usual heap-allocation overhead. They are a subset of value-based classes: no identity, only values.

## Signature / Usage

```kotlin
// For JVM backends
@JvmInline
value class Password(private val s: String)

// No actual instantiation of class 'Password' happens
// At runtime 'securePassword' contains just 'String'
val securePassword = Password("Don't try this in production")
```

Without `@JvmInline`, `value class Password(private val s: String)` is the declaration for non-JVM backends.

### Members

```kotlin
@JvmInline
value class Person(private val fullName: String) {
    init {
        require(fullName.isNotEmpty()) {
            "Full name shouldn't be empty"
        }
    }

    constructor(firstName: String, lastName: String) : this("$firstName $lastName") {
        require(lastName.isNotBlank()) {
            "Last name shouldn't be empty"
        }
    }

    val length: Int
        get() = fullName.length

    fun greet() {
        println("Hello, $fullName")
    }
}
```

### Inheritance and delegation

```kotlin
interface Printable {
    fun prettyPrint(): String
}

@JvmInline
value class Name(val s: String) : Printable {
    override fun prettyPrint(): String = "Let's $s!"
}

@JvmInline
value class MyInterfaceWrapper(val myInterface: MyInterface) : MyInterface by myInterface
```

### Representation (boxing)

```kotlin
@JvmInline
value class Foo(val i: Int) : I

fun asInline(f: Foo) {}
fun <T> asGeneric(x: T) {}
fun asInterface(i: I) {}
fun asNullable(i: Foo?) {}

val f = Foo(42)
asInline(f)    // unboxed: used as Foo itself
asGeneric(f)   // boxed: used as generic type T
asInterface(f) // boxed: used as type I
asNullable(f)  // boxed: used as Foo?, which is different from Foo
```

### Mangling and calling from Java

```kotlin
@JvmInline
value class UInt(val x: Int)

// Represented as 'public final void compute(int x)' on the JVM
fun compute(x: Int) { }

// Mangled: 'public final void compute-<hashcode>(int x)'
fun compute(x: UInt) { }

// Disable mangling so Java can call it
@JvmName("computeUInt")
fun compute(x: UInt) { }
```

### Inline classes vs type aliases

```kotlin
typealias NameTypeAlias = String

@JvmInline
value class NameInlineClass(val s: String)

fun acceptString(s: String) {}

acceptString(nameAlias)       // OK: pass alias instead of underlying type
acceptString(nameInlineClass) // Not OK: can't pass inline class instead of underlying type
```

## Notes

- An inline class must have a single property initialized in the primary constructor. Properties can't have backing fields: only simple computable properties (no `lateinit` / delegated properties).
- Inline classes may implement interfaces but can't extend other classes and are always `final`.
- The compiler prefers underlying types but boxes inline classes whenever they are used as another type (generic `T`, interface type, nullable `Foo?`).
- Referential equality (`===`) is prohibited because instances may be represented as the underlying value or a wrapper.
- A generic type parameter as the underlying type is mapped to `Any?` or the parameter's upper bound (for example `compute-<hashcode>(s: Any?)`).
- Functions using inline classes are mangled with a stable hashcode to avoid platform signature clashes. To call such functions from Java, disable mangling with `@JvmName`. For boxed representations accessible from Java, see the Java interop guide.
- Type aliases are assignment-compatible with the underlying type; inline classes introduce a truly new type.

## Related

- [Delegation](./delegation.md)
- [Classes](./classes.md)
- [Properties](./properties.md)
- Type aliases
- Java to Kotlin interop
