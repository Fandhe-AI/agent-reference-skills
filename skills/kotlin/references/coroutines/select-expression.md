---
source: https://kotlinlang.org/docs/select-expression.html
---

# Select expression (experimental)

`select` awaits multiple suspending functions simultaneously and selects the first one that becomes available. It is an expression that returns the result of its selected clause, and a Kotlin DSL so clauses can be provided with arbitrary code.

## Signature / Usage

```kotlin
suspend fun selectFizzBuzz(fizz: ReceiveChannel<String>, buzz: ReceiveChannel<String>) {
    select<Unit> { // <Unit> means that this select expression does not produce any result 
        fizz.onReceive { value ->  // this is the first select clause
            println("fizz -> '$value'")
        }
        buzz.onReceive { value ->  // this is the second select clause
            println("buzz -> '$value'")
        }
    }
}
```

### Clauses

| Clause | Behavior |
|--------|----------|
| `ReceiveChannel.onReceive` | Receive from a channel; fails (the `select` throws) when the channel is closed |
| `ReceiveChannel.onReceiveCatching` | Receive with a result that can represent closure (`getOrNull()`); selected immediately when the channel is already closed |
| `SendChannel.onSend` | Send a value to a channel |
| `Deferred.onAwait` | Select a deferred value |

### Selecting on close

```kotlin
suspend fun selectAorB(a: ReceiveChannel<String>, b: ReceiveChannel<String>): String =
    select<String> {
        a.onReceiveCatching { it ->
            val value = it.getOrNull()
            if (value != null) {
                "a -> '$value'"
            } else {
                "Channel 'a' is closed"
            }
        }
        b.onReceiveCatching { it ->
            val value = it.getOrNull()
            if (value != null) {
                "b -> '$value'"
            } else {
                "Channel 'b' is closed"
            }
        }
    }
```

`select` is biased to the first clause: when several clauses are selectable at the same time, the first is selected.

### Selecting to send

`onSend` combined with the biased selection lets a producer send to a side channel when the consumer on the primary channel cannot keep up:

```kotlin
fun CoroutineScope.produceNumbers(side: SendChannel<Int>) = produce<Int> {
    for (num in 1..10) { // produce 10 numbers from 1 to 10
        delay(100) // every 100 ms
        select<Unit> {
            onSend(num) {} // Send to the primary channel
            side.onSend(num) {} // or to the side channel     
        }
    }
}
```

### Selecting deferred values

```kotlin
val list = asyncStringsList()
val result = select<String> {
    list.withIndex().forEach { (index, deferred) ->
        deferred.onAwait { answer ->
            "Deferred $index produced answer '$answer'"
        }
    }
}
println(result)
val countActive = list.count { it.isActive }
println("$countActive coroutines are still active")
```

### Switch over a channel of deferred values

`onReceiveCatching` and `onAwait` combined in one `select` to await each deferred only until the next one arrives or the channel is closed:

```kotlin
fun CoroutineScope.switchMapDeferreds(input: ReceiveChannel<Deferred<String>>) = produce<String> {
    var current = input.receive() // start with first received deferred value
    while (isActive) { // loop while not cancelled/closed
        val next = select<Deferred<String>?> { // return next deferred value from this select or null
            input.onReceiveCatching { update ->
                update.getOrNull()
            }
            current.onAwait { value ->
                send(value) // send value that current deferred has produced
                input.receiveCatching().getOrNull() // and use the next deferred from the input channel
            }
        }
        if (next == null) {
            println("Channel was closed")
            break // out of loop
        } else {
            current = next
        }
    }
}
```

## Notes

- Experimental: the page states select expressions are an experimental feature of `kotlinx.coroutines` whose API is expected to evolve in upcoming updates, with potentially breaking changes.
- The official page's "experimental" label is outdated: in kotlinx.coroutines 1.11.0 sources `select`, `selectUnbiased` and `SelectBuilder` carry no opt-in annotation; only the `onTimeout` clause is `@ExperimentalCoroutinesApi`.
- The official samples call `produce` without an opt-in; in kotlinx.coroutines 1.11.0 `CoroutineScope.produce` is `@ExperimentalCoroutinesApi`, so real code needs `@OptIn(ExperimentalCoroutinesApi::class)`.

## Related

- [Channels](./channels.md)
- [Composing suspending functions](./composing-suspending-functions.md)
- [Coroutines guide](./coroutines-guide.md)
