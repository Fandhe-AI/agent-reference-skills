---
source: https://kotlinlang.org/docs/context-parameters.html
---

# Context parameters

Context parameters let functions and properties declare dependencies that are implicitly available in the surrounding context, so shared values (services, dependencies) need not be passed manually.

## Signature / Usage

```kotlin
// UserService defines the dependency required in context 
interface UserService {
    fun log(message: String)
    fun findUserById(id: Int): String
}

// Declares a function with a context parameter
context(users: UserService)
fun outputMessage(message: String) {
    // Uses log from the context
    users.log("Log: $message")
}

// Declares a property with a context parameter
context(users: UserService)
val firstUser: String
    // Uses findUserById from the context    
    get() = users.findUserById(1)

fun main() {
    val users = object : UserService {
        override fun log(message: String) {
            println(message)
        }

        override fun findUserById(id: Int): String {
            return "User $id"
        }
    }

    context(users) {
        outputMessage("Looking up the first user")
        println(firstUser)
        // User 1
    }
}
```

Use `context` followed by `name: Type` parameters. Use `_` as the name when you do not need to refer to the parameter; it still satisfies required contexts, and `contextOf<T>()` retrieves its value:

```kotlin
// Uses "_" as context parameter name
context(_: UserService)
fun logWelcome() {
    outputMessage("Welcome!")

    // Retrieves the UserService value explicitly
    contextOf<UserService>().log("Hi!")
}
```

### Resolution

Context values are resolved at the call site by type in the current scope. Multiple compatible values at the same scope level are reported as an ambiguity:

```kotlin
context(serviceA, serviceB) {
    // This results in an ambiguity error
    outputMessage("This will not compile")
}
```

### Pass context arguments explicitly

When overloads differ only by context parameters, pass an explicit context argument:

```kotlin
context(emailSender: EmailSender)
fun sendNotification() {
    println("Sent email notification")
}

context(smsSender: SmsSender)
fun sendNotification() {
    println("Sent SMS notification")
}

context(defaultEmailSender: EmailSender, defaultSmsSender: SmsSender)
fun notifyUser() {
    // Selects the overload with the EmailSender context parameter
    sendNotification(emailSender = defaultEmailSender)

    // Selects the overload with the SmsSender context parameter
    sendNotification(smsSender = defaultSmsSender)
}
```

For a single call use explicit context arguments; for several calls with the same context arguments use the `context()` function. Explicit context arguments are Experimental; opt in with:

```kotlin
kotlin {
    compilerOptions {
        freeCompilerArgs.add("-Xexplicit-context-arguments")
    }
}
```

Maven: add `<arg>-Xexplicit-context-arguments</arg>` under `kotlin-maven-plugin` `<configuration><args>`.

## Notes

- Explicit context arguments are marked [Experimental](../releases/components-stability.md) on the official page (requires `-Xexplicit-context-arguments`).
- Context parameters replace the older experimental context receivers; the official page points to the context parameters design document (KEEP) and an IntelliJ IDEA assisted migration.
- Restrictions: constructors can't declare context parameters; properties with context parameters can't have backing fields or initializers; they can't use delegation.

## Related

- [Type-safe builders](./type-safe-builders.md)
- [Higher-order functions and lambdas](./lambdas.md)
