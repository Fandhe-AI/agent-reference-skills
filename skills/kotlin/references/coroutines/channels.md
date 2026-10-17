---
source: https://kotlinlang.org/docs/channels.html
---

# Channels

Channels transfer a stream of values between coroutines (deferred values transfer a single value). A `Channel` is conceptually similar to `BlockingQueue`, with suspending `send` and `receive` instead of blocking `put` and `take`.

## Signature / Usage

```kotlin
val channel = Channel<Int>()
launch {
    // this might be heavy CPU-consuming computation or async logic, 
    // we'll just send five squares
    for (x in 1..5) channel.send(x * x)
}
// here we print five received integers:
repeat(5) { println(channel.receive()) }
println("Done!")
```

### Closing and iteration

A channel can be closed to indicate no more elements are coming. `close` is like sending a close token; iteration with `for (y in channel)` stops when it is received, so all elements sent before the close are received.

```kotlin
val channel = Channel<Int>()
launch {
    for (x in 1..5) channel.send(x * x)
    channel.close() // we're done sending
}
// here we print received values using `for` loop (until the channel is closed)
for (y in channel) println(y)
println("Done!")
```

### Producers and pipelines

`produce` builds a producer coroutine returning `ReceiveChannel`; `consumeEach` replaces the `for` loop on the consumer side. A pipeline is one coroutine producing a stream and others consuming and processing it. All functions that create coroutines are `CoroutineScope` extensions so structured concurrency avoids lingering global coroutines.

```kotlin
fun CoroutineScope.produceSquares(): ReceiveChannel<Int> = produce {
    for (x in 1..5) send(x * x)
}

fun main() = runBlocking {
    val squares = produceSquares()
    squares.consumeEach { println(it) }
    println("Done!")
}
```

```kotlin
fun CoroutineScope.numbersFrom(start: Int) = produce<Int> {
    var x = start
    while (true) send(x++) // infinite stream of integers from start
}

fun CoroutineScope.filter(numbers: ReceiveChannel<Int>, prime: Int) = produce<Int> {
    for (x in numbers) if (x % prime != 0) send(x)
}
```

The prime-number example chains `numbersFrom(2) -> filter(2) -> filter(3) -> filter(5) -> ...` and uses `coroutineContext.cancelChildren()` to stop. The same pipeline can be built with the standard-library `iterator` builder (replace `produce` with `iterator`, `send` with `yield`, `receive` with `next`), but channel pipelines can use multiple CPU cores on `Dispatchers.Default` and allow arbitrary suspension.

### Fan-out and fan-in

Multiple coroutines may receive from the same channel (fan-out) or send to the same channel (fan-in).

```kotlin
fun CoroutineScope.launchProcessor(id: Int, channel: ReceiveChannel<Int>) = launch {
    for (msg in channel) {
        println("Processor #$id received $msg")
    }    
}
```

```kotlin
suspend fun sendString(channel: SendChannel<String>, s: String, time: Long) {
    while (true) {
        delay(time)
        channel.send(s)
    }
}
```

### Buffered channels, fairness, ticker channels

Unbuffered channels transfer elements when sender and receiver meet (rendezvous). Both the `Channel()` factory and `produce` take an optional `capacity` parameter: a sender suspends only when the buffer is full.

```kotlin
val channel = Channel<Int>(4) // create buffered channel
val sender = launch { // launch sender coroutine
    repeat(10) {
        println("Sending $it") // print before sending each element
        channel.send(it) // will suspend when buffer is full
    }
}
// don't receive anything... just wait....
delay(1000)
sender.cancel() // cancel sender coroutine
```

Channels are fair: send and receive are served in first-in first-out order across coroutines. A ticker channel (`ticker(delayMillis, initialDelayMillis)`) is a rendezvous channel producing `Unit` every time the delay passes since the last consumption; cancel it with `ReceiveChannel.cancel`. By default it adjusts the next delay after a consumer pause; `mode = TickerMode.FIXED_DELAY` keeps a fixed delay between elements.

```kotlin
val tickerChannel = ticker(delayMillis = 200, initialDelayMillis = 0) // create a ticker channel
var nextElement = withTimeoutOrNull(1) { tickerChannel.receive() }
println("Initial element is available immediately: $nextElement") // no initial delay
```

## Notes

- Cancelling a producer coroutine closes its channel, which terminates iteration in the processors.
- Fan-out with an explicit `for` loop is safe from multiple coroutines; a processor written with `consumeEach` always consumes (cancels) the underlying channel on normal or abnormal completion, so one failing consumer would affect the others.
- Channels can look unfair because of the executor in use (see the linked issue `Kotlin/kotlinx.coroutines#111`).
- The official page does not mark `ticker` as non-stable, but in kotlinx.coroutines 1.11.0 sources `ticker` and `TickerMode` are `@ObsoleteCoroutinesApi` (ticker channels are not integrated with structured concurrency and their API will change).
- The official samples call `produce` without an opt-in; in kotlinx.coroutines 1.11.0 `CoroutineScope.produce` is `@ExperimentalCoroutinesApi`, so real code needs `@OptIn(ExperimentalCoroutinesApi::class)`.

## Related

- [Flows](./coroutines-flow.md)
- [Select expression (experimental)](./select-expression.md)
- [Coroutine exceptions handling](./exception-handling.md)
