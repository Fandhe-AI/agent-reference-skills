---
source: https://kotlinlang.org/docs/kotlin-tour-intermediate-scope-functions.html
---

# Scope Functions: let, apply, run, also, with

Choose the scope function that fits the task: null-check, initialize, compute, log, or call many members.

```kotlin
class Client() {
    var token: String? = null
    fun connect() = println("connected!")
    fun authenticate() = println("authenticated!")
    fun getData() : String {
        println("getting data!")
        return "Mock data"
    }
}

val client: Client = Client().apply {
    token = "asdf"
}

fun main() {
    val result: String = client.run {
        connect()
        // connected!
        authenticate()
        // authenticated!
        getData()
        // getting data!
    }
}
```

`let` for null checks, `also` for side effects in a chain:

```kotlin
val address: String? = getNextAddress()
val confirm = address?.let {
    sendNotification(it)
}
```

```kotlin
fun main() {
    val medals: List<String> = listOf("Gold", "Silver", "Bronze")
    val reversedLongUppercaseMedals: List<String> =
        medals
            .map { it.uppercase() }
            .also { println(it) }
            // [GOLD, SILVER, BRONZE]
            .filter { it.length > 4 }
            .also { println(it) }
            // [SILVER, BRONZE]
            .reversed()
    println(reversedLongUppercaseMedals)
    // [BRONZE, SILVER]
}
```

## Notes

- Quick reference: `let` (`it`, returns lambda result), `apply` (`this`, returns the object), `run` (`this`, returns lambda result), `also` (`it`, returns the object), `with` (`this`, returns lambda result).
- `with` is not an extension function: pass the receiver as an argument, `with(canvas) { ... }`.
- `sendNotification()` and `getNextAddress()` in the `let` snippet are defined in the official tour example (`sendNotification(recipientAddress: String): String`, `getNextAddress(): String`).
