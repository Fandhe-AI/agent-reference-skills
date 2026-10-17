---
source: https://kotlinlang.org/docs/coroutines-flow.html
---

# Flows

A flow is a sequential stream of values produced asynchronously. A pipeline has an emitter, optional intermediate operators, and a collector. Cold flows run per collector; hot flows (`SharedFlow`, `StateFlow`) emit independently of collectors.

## Signature / Usage

```kotlin
import kotlinx.coroutines.flow.*

suspend fun main() {
    // The emitter produces values
    flowOf(0x4B, 0x6F, 0x74, 0x6C, 0x69, 0x6E)
        // The intermediate operator consumes values,
        // applies an operation, and returns another flow
        .map { value -> value.toChar() }
        // The collector consumes the transformed values
        .collect { updatedValue ->
            println("Say '$updatedValue'!")
        }
}
```

### Cold flows

Lazy like sequences: the builder block does not run until collected, and each collector triggers a new, independent execution. Create with `flow()` and `emit()`, `flowOf()`, or `.asFlow()`.

```kotlin
val pageFlow = flow {
    for (page in 1..3) {
        println("Loading page $page...")

        // Emits each page as it is loaded
        emit("Page $page")
    }
}
```

Collect with `collect()`. Intermediate operators are cold; custom operators can be defined:

```kotlin
// A simplified custom implementation of the default .map() operator
fun <T, R> Flow<T>.myMap(transform: suspend (value: T) -> R): Flow<R> = flow {
    // Collects values from the upstream flow
    this@myMap.collect { value ->
        // Transforms each collected value and emits the result
        emit(transform(value))
    }
}
```

Suspending functions can be called inside `flow()`, but the builder must emit from the same coroutine context where it runs: no `withContext()` and no emitting from another coroutine. Use `.flowOn()` to change the upstream context, or `channelFlow()` to emit from multiple coroutines.

```kotlin
withContext(Dispatchers.Default + CoroutineName("downstream")) {
    flow {
        val coroutineName = currentCoroutineContext()[CoroutineName]?.name
        println("Emitting '1' in $coroutineName")
        emit(1)

    // Changes the coroutine context of the upstream flow
    }.flowOn(Dispatchers.IO + CoroutineName("upstream"))
        .collect {
        val coroutineName = currentCoroutineContext()[CoroutineName]?.name
        println("Collecting '$it' in $coroutineName")
    }
}
```

### Exceptions in cold flows

Unhandled exceptions propagate upstream from the collector to the caller of `collect()`. Wrap `collect()` in `try-catch`; when catching a collector exception inside a flow builder, rethrow it to preserve exception transparency. Use `.catch()` for upstream exceptions (it can `emit()` a fallback); it does not handle exceptions thrown by the collector lambda. To handle per-value code with `.catch()`, put it in `.onEach()` before `.catch()`. `.retry(n) { e -> Boolean }` restarts the upstream flow; `.retryWhen()` also receives the attempt number and can emit.

```kotlin
flow {
    emit("a")
    emit("b")

    // Throws an exception from the upstream flow
    throw UnsupportedOperationException(
        "I am tired of listing letters"
    )
}.catch { upstreamException ->
    println("Upstream completed with $upstreamException!")

    // Emits a fallback value downstream
    emit("Upstream terminated with an exception!")
}.collect {
    println("Got '$it'")
}
```

### Cancellation and channelFlow

Collection is tied to the collecting coroutine; canceling its `Job` stops collection and cancels the upstream flow. Throwing `CancellationException` from the collector cancels upstream and the exception propagates out of `collect()`. To keep the collecting coroutine going, catch your own thrown exception instance with try/catch and complete the flow normally, as `.take()` and the official `myTake` example do.

`channelFlow()` creates a cold flow backed by a channel; use `send()` instead of `emit()`. It has a buffer of up to 64 values by default; change it with `.buffer(n)` (`.buffer(0)` removes the buffer).

```kotlin
// Defines a simplified version of the default .merge() operator
fun <T> Flow<T>.myMerge(other: Flow<T>): Flow<T> = channelFlow {
    // CoroutineScope and SendChannel are available as receivers here
    // Launches a coroutine that collects the receiver flow
    launch {
        // Collects the receiver flow
        this@myMerge.collect {
            send(it)
        }
    }
    launch {
        // Launches a coroutine that collects the other flow
        other.collect {
            // Calls SendChannel.send
            send(it)
        }
    }
}
```

### Hot flows

Hot flows keep emitting without collectors; collectors are called subscribers. `SharedFlow` broadcasts values; `StateFlow` is a specialized `SharedFlow` that always holds the latest state value.

`MutableSharedFlow()` with a private backing property and `.asSharedFlow()`; the `replay` parameter sets how many previous emissions new subscribers receive.

```kotlin
class Chatroom {
    // Stores the SharedFlow in a private backing property
    private val _messages = MutableSharedFlow<Message>(

        // Replays the set amount of last emitted messages to new subscribers
        replay = MESSAGES_TO_REMEMBER
    )

    // Exposes a read-only SharedFlow to subscribers
    val messages: SharedFlow<Message>
        get() = _messages.asSharedFlow()

    // Emits the message to subscribers
    suspend fun sendMessageToEveryone(message: Message) {
        _messages.emit(message)
    }
}
```

`CoroutineStart.UNDISPATCHED` makes a collecting coroutine subscribe immediately so it does not miss earlier emissions.

`MutableStateFlow(initial)` with the `value` property; use `.asStateFlow()` to expose it read-only. A `StateFlow` emits only when the new value differs from the current one. Use `.update { }` for atomic updates based on the previous value.

```kotlin
class Post(val id: Long) {
    // Stores the current number of likes as a StateFlow
    private val _numberOfLikes = MutableStateFlow<Int>(
        // Sets the initial number of likes
        0
    )

    // Exposes a read-only StateFlow with the current number of likes
    val numberOfLikes: StateFlow<Int>
        get() = _numberOfLikes.asStateFlow()


    // Adds a like
    fun like() {
        // Increments the number of likes atomically for concurrent and multithreaded calls
        _numberOfLikes.update { it + 1 }
    }
}
```

Explicit backing fields (the page links to the Kotlin 2.3 what's-new entry "explicit backing fields") expose a read-only flow without a separate private property:

```kotlin
class Chatroom {
    // Exposes a read-only SharedFlow with a mutable backing field
    val messages: SharedFlow<Message>
        field = MutableSharedFlow<Message>(
            replay = MESSAGES_TO_REMEMBER
        )

    suspend fun sendMessageToEveryone(message: Message) {
        // Emits through the mutable backing field inside Chatroom
        messages.emit(message)
    }
}
```

### Convert cold flows to hot flows

`.shareIn(scope, started, replay)` and `.stateIn(scope, started, initialValue)` collect the upstream once in the given scope and share it with subscribers. `SharingStarted.Eagerly` starts immediately; `SharingStarted.WhileSubscribed()` starts with the first subscriber and stops when the last disappears. The three-argument `.stateIn(scope, started, initialValue)` requires an initial value because a `StateFlow` always has a current value; the one-argument `suspend fun Flow<T>.stateIn(scope: CoroutineScope): StateFlow<T>` needs none — it suspends until the upstream emits its first value and uses that value as the initial state (sharing starts eagerly).

```kotlin
val lastUpdateFlow: StateFlow<Instant?> =
    chatroom
        .messageHistory
        .map { currentHistory -> currentHistory.lastOrNull()?.time }
        .stateIn(
            // Starts the sharing coroutine in this scope
            // The upstream flow, including .map(), runs in that coroutine
            derivedFlowsScope,

            // Starts collecting when the first subscriber appears
            // and stops when the last subscriber disappears
            SharingStarted.WhileSubscribed(),
            // Sets the initial state before the first upstream emission
            null,
        )
```

### Cancel hot flows and handle their exceptions

Hot flows have no close or cancel operation. Canceling a collecting coroutine only stops that subscriber; to stop emissions, cancel the coroutine or scope that produces the values (for `.shareIn()` / `.stateIn()`, the scope that runs the sharing coroutine). Hot flows do not propagate producer exceptions to subscribers; for `.shareIn()` / `.stateIn()`, an upstream exception cancels the sharing coroutine, so place `.retry()` before sharing.

## Notes

- The official docs imply the collecting coroutine stays active after throwing `CancellationException`; it only does so when the operator catches its own exception instance, as `.take()` does.
- Avoid mutable objects inside a `StateFlow`: mutating the object does not replace the value, so collectors get no update.
- Setting `StateFlow.value` is thread-safe, but updating based on the previous value is not atomic; use `.update()`.
- Explicit backing fields are Stable since Kotlin 2.4.0 and need no opt-in; the official coroutines page still labels this section experimental and links to the Kotlin 2.3 what's-new entry.
- Explicit backing fields do not provide the read-only wrapper that `.asSharedFlow()` gives; use only when downcasting is not a concern.
- For updating a shared value without observing changes, the page suggests Kotlin Atomics APIs such as `AtomicInt` or `AtomicReference`.
- The official page says `.stateIn()` always requires an initial value; `Share.kt` (kotlinx.coroutines 7e0d1b3) also defines a suspending `stateIn(scope)` overload without one.
- Persistent collections via `kotlinx.collections.immutable` are marked Experimental on the page.
- Turbine (`cashapp/turbine`) is suggested for testing flows. Android-side `viewModelScope`, `collectAsStateWithLifecycle` and `StateFlow` UI state are covered by android-architecture, and coroutines / Flow testing in Android by android-testing; this page covers the kotlinx.coroutines Flow API only. TanStack Query and React Flow are unrelated to Kotlin `Flow`.

## Related

- [Flow operators](./coroutines-flow-operators.md)
- [Channels](./channels.md)
- [Coroutine context and dispatchers](./coroutine-context-and-dispatchers.md)
- [Cancellation and timeouts](./coroutines-cancellation.md)
