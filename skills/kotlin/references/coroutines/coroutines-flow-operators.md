---
source: https://kotlinlang.org/docs/coroutines-flow-operators.html
---

# Flow operators

Operators transform and process values in a flow pipeline. Intermediate operators return a new downstream flow; terminal operators collect the flow and may return a result.

## Signature / Usage

```kotlin
suspend fun main() = withContext(Dispatchers.Default) {
    val flow = (0..4).asFlow().transform { value ->
        // Emits each value as many times as its value
        repeat(value) {
            emit(value)
        }
    }
    println(flow.toList())
    // [1, 2, 2, 3, 3, 3, 4, 4, 4, 4]
}
```

### Intermediate operators

| Category | Operators | Behavior |
|----------|-----------|----------|
| Transforming | `.transform()`, `.map()`, `.filter()`, `.mapNotNull()` | Transform values; lambdas are suspending and run sequentially unless a concurrency operator is used. `.transform()` is the general basis for `.map()` / `.filter()` |
| Filtering and size-limiting | `.distinctUntilChanged()`, `.drop(n)`, `.take(n)` | Control which upstream values continue downstream; `.take(n)` cancels collection after n values |
| Concurrent processing | `.buffer()`, `.conflate()`, `.flowOn()` | Introduce a buffer so upstream runs concurrently with collection |
| Combining | `.zip()`, `combine()`, `merge()` | Collect multiple upstream flows into one downstream flow |
| Lifecycle | `.onStart()`, `.onEach()`, `.onCompletion()`, `.onEmpty()`, `.onSubscription()` | Run actions at specific points of collection |

```kotlin
// Emits only values where dividing by 3 leaves a remainder of 1
val flow = (0..10).asFlow().filter { it % 3 == 1 }
println(flow.toList())
// [1, 4, 7, 10]
```

Concurrent processing: by default the collector applies backpressure (upstream suspends when the buffer is full). Set `onBufferOverflow` to drop values instead. `.conflate()` is shorthand for `buffer(1, onBufferOverflow = BufferOverflow.DROP_OLDEST)` and does not cancel processing already started (use `collectLatest()` for that). `.flowOn()` runs upstream in a different context; when it changes the dispatcher it collects upstream in a separate coroutine with a buffer. Combined with `.buffer()` / `.conflate()`, operator fusion shares a single buffer.

```kotlin
flow {
    repeat(10) {
        emit(it)
        println("Emitted $it!")
    }
}
    // Stores up to four values before applying the overflow behavior
    // Drops the oldest buffered value when the buffer is full
    .buffer(4, onBufferOverflow = BufferOverflow.DROP_OLDEST)
    .collect { value ->
        println("Processed $value!")
        delay(20.milliseconds)
    }
```

Combining: `.zip()` pairs values in order and completes when either flow completes; `combine()` emits when any upstream flow emits, using the latest value from each; `merge()` collects flows concurrently into one flow.

```kotlin
// Combines the latest values from both upstream flows
val uiStateFlow = combine(messagesFlow, themeFlow) { messages, theme ->
    UiState(messages, theme)
}
```

Lifecycle:

```kotlin
flowOf("Page 1", "Page 2", "Page 3").onCompletion {
    println("Almost done...")
    // Emits an additional value after the upstream flow completes
    emit("Last Page!")
}.collect {
    println("Collected $it")
}
```

### Terminal operators

| Operator | Behavior |
|----------|----------|
| `collect()` | Consumes each emitted value; can be called without a lambda |
| `collectLatest()` | Cancels unfinished work when a new value is emitted |
| `.first()` | Returns the first value, then cancels collection |
| `.toList()` / `.toSet()` | Collects values into a collection |
| `.reduce()` / `.fold()` | Combine values into one result; `.fold()` uses a provided start value, `.reduce()` the first emitted value |
| `.launchIn(scope)` | Collects in a given `CoroutineScope`; returns the `Job` of the collecting coroutine |

```kotlin
val reduced = flowOf(1, 2, 3).reduce { accumulator, value ->
    accumulator + value
}

val folded = flowOf(1, 2, 3).fold(2) { accumulator, value ->
    accumulator + value
}
// reduced = 6, folded = 8
```

```kotlin
class MyScreen(val scope: CoroutineScope) {
    private val _mousePosition =
        MutableStateFlow<Coordinate>(Coordinate(0, 0))
    val mousePosition get() = _mousePosition.asStateFlow()

    init {
        // Starts collecting the StateFlow in the screen's CoroutineScope
        mousePosition.onEach {
            updateStatusBar()
        }.launchIn(scope)
    }
}
```

## Notes

- The page pairs each built-in operator with a simplified custom implementation (`myMap`, `myFilter`, `myTake`, `myDrop`, `myOnStart`, ...) to illustrate behavior; the built-ins are the API to use.
- `.onSubscription()` is the hot-flow counterpart of `.onStart()`: it runs after a subscriber starts collecting but before it collects any emitted values.
- Android-side `StateFlow` UI state and lifecycle-aware collection are covered by android-architecture, and coroutines / Flow tests by android-testing; this page covers the kotlinx.coroutines operators only.

## Related

- [Flows](./coroutines-flow.md)
- [Channels](./channels.md)
- [Coroutine context and dispatchers](./coroutine-context-and-dispatchers.md)
