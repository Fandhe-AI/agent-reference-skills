# Channel

A `Channel` is a coroutine-safe primitive for transferring a stream of values between coroutines using suspending `send`/`receive` operations, conceptually similar to a `BlockingQueue` but non-blocking.

## Signature / Usage

```kotlin
val channel = Channel<Int>()

launch {
    for (x in 1..5) channel.send(x * x)
    channel.close()
}

for (y in channel) println(y) // 1 4 9 16 25
```

```kotlin
// produce builder: structured-concurrency-friendly producer
fun CoroutineScope.produceSquares(): ReceiveChannel<Int> = produce {
    for (x in 1..5) send(x * x)
}

val squares = produceSquares()
squares.consumeEach { println(it) }
```

## Notes

- `send()`/`receive()` suspend when the channel buffer is full/empty; `close()` signals no more elements will be sent.
- On Android, `Channel` is mostly an implementation detail used inside `callbackFlow`/`channelFlow` — most application code should use `Flow` (built on `Channel`) rather than raw channels directly.
- Prefer the `produce { }` builder over manually creating and closing a `Channel` for producer-consumer patterns, since it participates in structured concurrency.

## Related

- [callbackFlow and channelFlow](./callbackflow-channelflow.md)
- [Flow basics](./flow-basics.md)
