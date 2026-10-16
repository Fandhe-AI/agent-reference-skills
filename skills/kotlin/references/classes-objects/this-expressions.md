---
source: https://kotlinlang.org/docs/this-expressions.html
---

# This expressions

`this` refers to the current receiver: the current object in a class member, or the receiver in an extension function or a function literal with receiver. Use qualified `this@label` to choose among nested receivers.

## Signature / Usage

```kotlin
class Language(val name: String) {
    fun printName() {
        println(this.name)
    }
}

fun String.lastCharacter(): Char {
    println(this.length) // 6
    return this[this.length - 1]
}
```

### Qualified this

```kotlin
this@label
```

The label is the name of an enclosing class or extension function (for example `this@foo` for an enclosing extension function `foo`).

Outer class from an inner class:

```kotlin
class User(val name: String) {
    inner class Age(val value: Int) {
        fun printInfo() {
            // Refers to the value property of the current Age object
            println(this.value)
            // Refers to the name property of the outer User object
            println(this@User.name)
        }
    }
}
```

Extension function declared in a class (extension receiver vs dispatch receiver):

```kotlin
class User(val name: String) {
    val prefix = "Name"

    fun String.formatName(): String {
        return "${this@User.prefix}: ${this.uppercase()}"
    }
}
```

Lambda with receiver (add a label to refer to the lambda's receiver):

```kotlin
class User(val name: String) {
    fun printWithPrefix() {
        val printString: String.() -> Unit = stringLabel@ {
            println("${this@stringLabel}: ${this@User.name}")
        }

        printString("User")
    }
}
```

Anonymous object declared inside another class (unqualified `this` is the anonymous object; `this@User` is the enclosing object):

```kotlin
class User(val name: String) {
    fun createPrinter(): UserPrinter {
        return object : UserPrinter {
            override fun print() {
                // `this@User` refers to the enclosing `User` object
                println(this@User.name)
            }
        }
    }
}
```

### Implicit this

```kotlin
fun main() {
    class A {
        fun printLine() {
            println("Member function")
        }

        fun invokePrintLine() {
            fun printLine() {
                println("Local function")
            }

            printLine()
            // Local function

            this.printLine()
            // Member function
        }
    }

    A().invokePrintLine()
}
```

## Notes

- In an inner class, unqualified `this` refers to the inner class instance. Only inner classes hold a reference to an outer class instance; regular nested classes can't access the outer `this`.
- A lambda with receiver introduces a receiver into its scope, so `this` inside it refers to the lambda's receiver. A regular lambda does not.
- Anonymous objects have no class name, so they can't be used as `this` qualifiers; refer to them only with unqualified `this`.
- When an unqualified call matches a callable in a closer lexical scope (for example, a local function), it resolves to that callable instead of the member function; use `this.` to call the member.

## Related

- [Nested and inner classes](./nested-classes.md)
- [Extensions](./extensions.md)
- [Object declarations and expressions](./object-declarations.md)
- [Lambdas](../functions/lambdas.md)
