# callbackFlow and channelFlow

`callbackFlow` and `channelFlow` are `Flow` builders backed by a `Channel`, used when values must be sent (`send`/`trySend`) from a context other than the flow's own coroutine — e.g. wrapping a callback-based API, or emitting concurrently from multiple coroutines.

## Signature / Usage

```kotlin
fun <T> callbackFlow(block: suspend ProducerScope<T>.() -> Unit): Flow<T>
fun <T> channelFlow(block: suspend ProducerScope<T>.() -> Unit): Flow<T>
```

```kotlin
class FirestoreUserEventsDataSource(private val firestore: FirebaseFirestore) {
    fun getUserEvents(): Flow<UserEvents> = callbackFlow {
        val subscription = firestore.collection("events")
            .addSnapshotListener { snapshot, _ ->
                if (snapshot != null) trySend(snapshot.toUserEvents())
            }
        awaitClose { subscription.remove() }
    }
}
```

```kotlin
// channelFlow: merging two flows concurrently
fun <T> Flow<T>.myMerge(other: Flow<T>): Flow<T> = channelFlow {
    launch { this@myMerge.collect { send(it) } }
    launch { other.collect { send(it) } }
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `send(value)` | `suspend (T) -> Unit` | — | Suspends if the internal channel buffer is full. |
| `trySend(value)` | `(T) -> ChannelResult<Unit>` | — | Non-blocking attempt to send; used from non-suspend callback contexts. |
| `awaitClose { }` | `() -> Unit` | — | **Required** in `callbackFlow` — suspends until the flow is cancelled/closed, and its block is where the callback/listener is unregistered. |

## Notes

- `callbackFlow` is the standard choice for wrapping listener/callback APIs; `channelFlow` is the more general form for any flow that needs concurrent emission from multiple coroutines.
- Forgetting `awaitClose { }` in a `callbackFlow` is a common bug — without it, the flow completes immediately and the listener is never cleaned up.
- Default channel capacity backing these builders is 64 elements; use `.buffer(...)` on the resulting `Flow` to change it.
- Unlike the plain `flow { }` builder, both allow emitting from a different `CoroutineContext` than the one collecting.

## Related

- [Flow basics](./flow-basics.md)
- [Channel](./channel.md)
- [Flow operators](./flow-operators.md)
