# Job, SupervisorJob, and Cancellation

`Job` is a handle to a coroutine that tracks its lifecycle and can cancel it. `SupervisorJob` is a `Job` variant where a child's failure does not cancel the other children. Cancellation in coroutines is **cooperative**: a coroutine must check for cancellation itself, typically via `isActive`, `ensureActive()`, or a suspending call like `yield()`/`delay()`.

## Signature / Usage

```kotlin
val job: Job = scope.launch {
    for (file in files) {
        ensureActive() // throws CancellationException if the Job was cancelled
        readFile(file)
    }
}
job.cancel()
```

```kotlin
launch {
    while (isActive) {
        // cooperative check; loop exits once cancelled
    }
}
```

```kotlin
// SupervisorJob: a failing child does not cancel its siblings
val supervisor = SupervisorJob()
val scope = CoroutineScope(coroutineContext + supervisor)
scope.launch(CoroutineExceptionHandler { _, _ -> }) { throw AssertionError() }
scope.launch { /* keeps running despite the first child's failure */ }
```

```kotlin
// Timeout-based cancellation
withTimeout(1000L) { delay(2000) }              // throws TimeoutCancellationException
val result = withTimeoutOrNull(1000L) { delay(2000); "done" } // returns null on timeout
```

## Notes

- Cancellation is cooperative — a tight loop with no suspension points and no `isActive`/`ensureActive()` check will not respond to `cancel()`.
- Never swallow `CancellationException` in a `try/catch` without rethrowing it; doing so breaks structured concurrency and can leak coroutines.
- Passing a `Job` explicitly to `launch`/`async` has no effect on the coroutine's own job — a new `Job` is always created as a child of the scope's job.
- On Android, prefer `viewModelScope` / `lifecycleScope` (owned by `android-architecture`'s `lifecycle-viewmodel` category) for automatic cancellation over manually calling `job.cancel()`.

## Related

- [CoroutineScope, coroutineScope, supervisorScope](./coroutine-scope.md)
- [Exception handling](./exception-handling.md)
- [launch, async, await](./launch-async-await.md)
