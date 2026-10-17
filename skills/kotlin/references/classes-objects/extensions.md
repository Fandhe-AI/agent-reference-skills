---
source: https://kotlinlang.org/docs/extensions.html
---

# Extensions

Extensions let you add functions and properties to a class or interface without inheritance or patterns such as Decorator. They are called on a receiver like members, but they don't modify the extended type or add members to it.

## Signature / Usage

```kotlin
fun String.truncate(maxLength: Int): String {
    return if (this.length <= maxLength) this else take(maxLength - 3) + "..."
}

fun main() {
    val longUsername = "JetBrainsLoverForever"
    println("Long username:  ${longUsername.truncate(15)}")
    // JetBrainsLov...
}
```

### Extension on an interface

```kotlin
interface User {
    val name: String
    val email: String
}

fun User.displayInfo(): String = "User(name=$name, email=$email)"
```

### Generic extension functions

Declare the type parameter before the function name:

```kotlin
fun <T> List<T>.endpoints(): Pair<T, T> {
    return first() to last()
}
```

### Nullable receivers

```kotlin
fun Any?.toString(): String {
    if (this == null) return "null"
    // After null check, `this` is smart-cast to non-nullable Any
    // So this call resolves to the regular toString() function
    return toString()
}
```

When the receiver is `null`, `this` is also `null`; handle it with `this == null`, `?.` or `?:`.

### Extension or member functions?

Extensions are dispatched statically (by the declared receiver type):

```kotlin
open class Shape
class Rectangle: Shape()

fun Shape.getName() = "Shape"
fun Rectangle.getName() = "Rectangle"

fun printClassName(shape: Shape) {
    println(shape.getName())
}

printClassName(Rectangle())
// Shape
```

A member with the same receiver type, name, and compatible arguments wins over the extension. An extension can overload a member with the same name but a different signature:

```kotlin
class Example {
    fun printFunctionType() { println("Member function") }
}

// Same name but different signature
fun Example.printFunctionType(index: Int) { println("Extension function #$index") }
```

### Anonymous extension functions

```kotlin
data class Order(val weight: Double)
val calculateShipping = fun Order.(rate: Double): Double = this.weight * rate

val isInRange: Int.(min: Int, max: Int) -> Boolean = { min, max -> this in min..max }
println(5.isInRange(1, 10))
// true
```

### Extension properties

```kotlin
data class User(val firstName: String, val lastName: String)

// An extension property to get a username-style email handle
val User.emailUsername: String
    get() = "${firstName.lowercase()}.${lastName.lowercase()}"
```

Initializers are not allowed (no efficient backing field); define behavior with explicit getters and setters:

```kotlin
data class House(val streetName: String)

val houseNumbers = mutableMapOf<House, Int>()
var House.number: Int
    get() = houseNumbers[this] ?: 1
    set(value) {
        houseNumbers[this] = value
    }
```

### Companion object extensions

```kotlin
class Logger {
    companion object { }
}

fun Logger.Companion.logStartupMessage() {
    println("Application started.")
}

Logger.logStartupMessage()
```

### Declaring extensions as members

The class declaring the extension is the dispatch receiver; the extension's receiver type is the extension receiver. If both have same-named members, the extension receiver wins; use qualified `this` for the dispatch receiver.

```kotlin
class Connection(val host: Host, val port: Int) {
    fun printPort() { print(port) }

    // Host is the extension receiver; Connection is the dispatch receiver
    fun Host.printConnectionString() {
        printHostname()
        print(":")
        printPort()
    }
}

class Connection2 {
    fun Host.getConnectionString() {
        toString()                 // Host.toString()
        this@Connection2.toString() // Connection.toString()
    }
}
```

Member extensions can be `open` and overridden. Dispatch receiver: resolved at runtime (virtual); extension receiver: resolved at compile time (static).

```kotlin
open class NotificationSender {
    open fun User.sendNotification() { println("Sending user notification from normal sender") }
    open fun Admin.sendNotification() { println("Sending admin notification from normal sender") }
    fun notify(user: User) { user.sendNotification() }
}

class SpecialNotificationSender : NotificationSender() {
    override fun User.sendNotification() { println("Sending user notification from special sender") }
    override fun Admin.sendNotification() { println("Sending admin notification from special sender") }
}

SpecialNotificationSender().notify(Admin())
// Sending user notification from special sender  (static: declared type is User)
```

### Visibility and scope

```kotlin
package org.example.declarations

fun List<String>.getLongestString() { /*...*/}
```

```kotlin
package org.example.usage

import org.example.declarations.getLongestString
```

## Notes

- Check the standard library first; it provides many extensions for collections (`map`, `filter`, `reduce`, `fold`, `groupBy`), strings (`joinToString`) and nulls (`filterNotNull`).
- Extensions use the same visibility modifiers as regular functions in the same scope. An extension declared outside its receiver type can't access the receiver's `private` / `protected` members. An `internal` extension is accessible only within its module.
- To use an extension outside its declaring package, import it at the call site.

## Related

- [This expressions](./this-expressions.md)
- [Properties](./properties.md)
- [Object declarations and expressions](./object-declarations.md)
- Lambdas
- Generics
