---
source: https://kotlinlang.org/docs/object-declarations.html
---

# Object declarations and expressions

Objects define a class and create an instance in one step: object declarations create named singletons; object expressions create anonymous one-time objects.

## Signature / Usage

```kotlin
// Declares a Singleton object to manage data providers
object DataProviderManager {
    private val providers = mutableListOf<DataProvider>()

    fun registerDataProvider(provider: DataProvider) {
        providers.add(provider)
    }

    val allDataProviders: Collection<DataProvider>
        get() = providers
}

// To refer to the object, use its name directly
DataProviderManager.registerDataProvider(exampleProvider)
```

Object declarations can have supertypes (`object DefaultListener : MouseAdapter() { ... }`).

### Data objects

```kotlin
data object MyDataObject {
    val number: Int = 3
}

fun main() {
    println(MyDataObject)
    // MyDataObject
}
```

For a `data object` the compiler generates `toString()` (the object's name) and `equals()` / `hashCode()` (all instances of the type are equal, with a consistent hash). No `copy()` and no `componentN()` are generated.

```kotlin
sealed interface ReadResult
data class Number(val number: Int) : ReadResult
data class Text(val text: String) : ReadResult
data object EndOfFile : ReadResult
```

### Companion objects

```kotlin
class User(val name: String) {
    // Defines a companion object that acts as a factory for creating User instances
    companion object Factory {
        fun create(name: String): User = User(name)
    }
}

val userInstance = User.create("John Doe")
```

The name can be omitted (the name `Companion` is used):

```kotlin
class User(val name: String) {
    companion object { }
}

val companionUser = User.Companion
```

Companion objects can implement interfaces:

```kotlin
interface Factory<T> {
    fun create(name: String): T
}

class User(val name: String) {
    companion object : Factory<User> {
        override fun create(name: String): User = User(name)
    }
}

val userFactory: Factory<User> = User
```

### Object expressions

```kotlin
// From scratch
val helloWorld = object {
    val hello = "Hello"
    val world = "World"
    // Object expressions extend the Any class, which already has a toString() function,
    // so it must be overridden
    override fun toString() = "$hello $world"
}

// Inheriting from supertypes (constructor args and several supertypes allowed)
val temporaryAccount = object : BankAccount(account.balance), Transaction {
    override val balance = account.balance + 500  // Temporary bonus

    override fun execute() {
        println("Executing special transaction. New balance is $balance.")
    }
}

// Accessing enclosing-scope variables
window.addMouseListener(object : MouseAdapter() {
    override fun mouseClicked(e: MouseEvent) {
        clickCount++
    }
})
```

Anonymous objects returned from a local or `private` function or property expose all their members. If the function or property is `public`, `protected`, or `internal`, its actual type is `Any` (no declared supertype), the declared supertype (exactly one), or the explicitly declared type (several supertypes); members added in the anonymous object are then not accessible, but overridden members declared in the actual type are.

## Notes

- Object declaration initialization is thread-safe and done on first access.
- Object declarations are not expressions (`val myObject = object MySingleton { ... }` is a syntax error) and can't be local (nested directly inside a function); they can be nested in other object declarations or non-inner classes.
- Compare `data object` instances only with `==` (structural), never `===`: a second instance can appear through platform reflection or a JVM serialization library.
- Initialization differences: object expressions are executed (initialized) immediately where used; object declarations are initialized lazily on first access; a companion object is initialized when the corresponding class is loaded (resolved), matching the semantics of a Java static initializer.
- Companion object members look like statics but are instance members of the companion object. On the JVM, `@JvmStatic` generates real static methods (for properties, static getters/setters); static fields come from `@JvmField`, `lateinit`, or `const` (see Java to Kotlin interop).
- A class name used by itself acts as a reference to the class's companion object, whether named or not. Class members can access `private` members of their companion object.

## Related

- [Classes](./classes.md)
- [Data classes](./data-classes.md)
- [Sealed classes and interfaces](./sealed-classes.md)
- [Extensions](./extensions.md) (companion object extensions)
- Java to Kotlin interop
