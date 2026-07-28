# launch, async, await

`launch` and `async` are coroutine builders. `launch` starts a fire-and-forget coroutine returning a `Job`; `async` starts a coroutine that computes a result, returning a `Deferred<T>` that is read with `await()`.

## Signature / Usage

```kotlin
// launch: no result, returns Job
val job: Job = scope.launch(Dispatchers.IO) {
    loginRepository.makeLoginRequest(jsonBody)
}

// async: produces a result, returns Deferred<T>
val deferred: Deferred<Doc> = scope.async { fetchDoc(1) }
val doc = deferred.await()
```

```kotlin
// Parallel decomposition with async + awaitAll
suspend fun fetchTwoDocs() = coroutineScope {
    val deferreds = listOf(async { fetchDoc(1) }, async { fetchDoc(2) })
    deferreds.awaitAll()
}
```

## Notes

- `launch` propagates uncaught exceptions immediately to the parent's `CoroutineExceptionHandler`. `async` holds exceptions until `await()` is called (or the parent `coroutineScope` fails) — an unawaited failing `async` silently drops its exception unless the scope surfaces it.
- Default dispatcher is inherited from the enclosing scope (e.g. `Dispatchers.Main` for `viewModelScope`); pass an explicit dispatcher as the first argument to override, e.g. `launch(Dispatchers.IO) { ... }`.
- Prefer `async`/`awaitAll()` for CPU/IO-bound work that can run concurrently and independently; use sequential `suspend` calls when there is no benefit from concurrency.

## Related

- [CoroutineScope, coroutineScope, supervisorScope](./coroutine-scope.md)
- [Dispatchers and withContext](./dispatchers-withcontext.md)
- [Exception handling](./exception-handling.md)
