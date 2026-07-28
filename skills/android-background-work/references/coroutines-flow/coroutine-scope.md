# CoroutineScope, coroutineScope, supervisorScope

`CoroutineScope` tracks every coroutine created within it (via `launch`/`async`) and lets you cancel all of them together, implementing structured concurrency. `coroutineScope { }` and `supervisorScope { }` are suspend functions that create a scoped child scope for parallel decomposition inside a `suspend` function, differing only in how child failures propagate.

## Signature / Usage

```kotlin
class ExampleClass {
    val scope = CoroutineScope(Job() + Dispatchers.Main)

    fun exampleMethod() {
        scope.launch { fetchDocs() }
    }

    fun cleanUp() {
        scope.cancel() // cancels all coroutines launched in this scope
    }
}
```

```kotlin
// coroutineScope: cancels all children if any child fails; waits for all to finish
suspend fun fetchTwoDocs() = coroutineScope {
    val deferredOne = async { fetchDoc(1) }
    val deferredTwo = async { fetchDoc(2) }
    listOf(deferredOne, deferredTwo).awaitAll()
}
```

```kotlin
// supervisorScope: a failing child does not cancel its siblings
suspend fun fetchBookAndAuthors() = supervisorScope {
    val books = launch(CoroutineExceptionHandler { _, e -> /* handle */ }) {
        booksRepository.getAllBooks()
    }
    val authors = launch { authorsRepository.getAllAuthors() }
}
```

## Notes

- Use `coroutineScope` for work scoped to the caller (must complete before the caller returns). Use an externally-injected `CoroutineScope` for work that should outlive the caller (e.g. a bookmark write that continues after the screen is closed).
- Do not hardcode `GlobalScope` — it is not testable and ties coroutines to no lifecycle. Inject a `CoroutineScope` instead.
- On Android, prefer platform-provided scopes over creating custom ones: `viewModelScope` and `lifecycleScope` (owned by the `android-architecture` skill's `lifecycle-viewmodel` category) — do not recreate `CoroutineScope(Job() + Dispatchers.Main)` when one of those is available.
- `supervisorScope` cancellation is one-directional (parent → children); exceptions in a child do not propagate to the parent or siblings, but each child should still handle its own exceptions (e.g. via `CoroutineExceptionHandler`).

## Related

- [Job, SupervisorJob, cancellation](./job-cancellation.md)
- [Exception handling](./exception-handling.md)
- [launch, async, await](./launch-async-await.md)
