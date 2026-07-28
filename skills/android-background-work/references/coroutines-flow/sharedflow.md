# SharedFlow

`SharedFlow` is a hot, configurable flow that broadcasts emitted values to all active collectors, without holding a required current state (unlike `StateFlow`). `MutableSharedFlow` is the writable variant. `shareIn` converts a cold `Flow` into a shared, hot `SharedFlow`.

## Signature / Usage

```kotlin
class MutableSharedFlow<T>(
    replay: Int = 0,
    extraBufferCapacity: Int = 0,
    onBufferOverflow: BufferOverflow = BufferOverflow.SUSPEND
) : SharedFlow<T>

fun <T> Flow<T>.shareIn(
    scope: CoroutineScope,
    started: SharingStarted,
    replay: Int = 0
): SharedFlow<T>
```

```kotlin
class TickHandler(
    private val externalScope: CoroutineScope,
    private val tickIntervalMs: Long = 5000
) {
    private val _tickFlow = MutableSharedFlow<Unit>(replay = 0)
    val tickFlow: SharedFlow<Unit> = _tickFlow

    init {
        externalScope.launch {
            while (true) {
                _tickFlow.emit(Unit)
                delay(tickIntervalMs)
            }
        }
    }
}
```

```kotlin
val latestNews: Flow<List<ArticleHeadline>> = flow { /* cold producer */ }
    .shareIn(externalScope, replay = 1, started = SharingStarted.WhileSubscribed())
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `replay` | `Int` | `0` | Number of previous values resent to each new subscriber. |
| `extraBufferCapacity` | `Int` | `0` | Extra buffer beyond `replay` for values sent before slow collectors process them. |
| `onBufferOverflow` | `BufferOverflow` | `SUSPEND` | `SUSPEND` (suspend the emitter), `DROP_LATEST`, or `DROP_OLDEST` when the buffer is full. |
| `started` (`shareIn`) | `SharingStarted` | — | `WhileSubscribed()` (recommended — starts on first subscriber, stops when none remain), `Eagerly`, or `Lazily`. |

## Notes

- `subscriptionCount: StateFlow<Int>` on `MutableSharedFlow` lets producers scale work up/down based on the number of active collectors.
- `resetReplayCache()` clears buffered replay values without emitting a new one.
- Prefer `SharingStarted.WhileSubscribed()` on Android so the upstream producer stops when the screen goes to the background, avoiding wasted work.

## Related

- [StateFlow](./stateflow.md)
- [Flow basics](./flow-basics.md)
- [callbackFlow and channelFlow](./callbackflow-channelflow.md)
