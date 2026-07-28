# Exception Handling

Coroutine exceptions can be handled with ordinary `try/catch`, `runCatching`, or a `CoroutineExceptionHandler` installed in the `CoroutineContext` for uncaught exceptions of root coroutines.

## Signature / Usage

```kotlin
val handler = CoroutineExceptionHandler { _, exception ->
    println("Caught: $exception")
}

scope.launch(handler) {
    throw AssertionError() // routed to handler
}
```

```kotlin
viewModelScope.launch {
    val result = try {
        loginRepository.makeLoginRequest(jsonBody)
    } catch (e: IOException) {
        Result.Error(e)
    }
}
```

```kotlin
val result = runCatching { loginRepository.makeLoginRequest(jsonBody) }
    .getOrElse { Result.Error(it) }
```

## Notes

- `CoroutineExceptionHandler` only fires for **uncaught** exceptions on root coroutines (created directly on a `CoroutineScope`, not on a nested `launch`/`async`); it does not work for `async`, whose exception is instead delivered through `await()`.
- With a plain `Job`, an unhandled child exception cancels the parent and all siblings. With `SupervisorJob` / `supervisorScope`, a child's failure is isolated and does not cancel siblings — each child must handle its own exceptions.
- Never catch and discard `CancellationException`; always rethrow it so structured concurrency can still cancel the coroutine tree.
- `try/catch` around a `withContext(Dispatchers.IO) { ... }` block works normally — exceptions thrown inside propagate to the calling coroutine.

## Related

- [Job, SupervisorJob, cancellation](./job-cancellation.md)
- [CoroutineScope, coroutineScope, supervisorScope](./coroutine-scope.md)
- [launch, async, await](./launch-async-await.md)
