# Flow Basics

`Flow<T>` represents an asynchronous stream that emits multiple values sequentially, built on coroutines. A `flow { }` builder defines a **cold** producer that emits with `emit()`; a consumer starts it by calling the suspend terminal operator `collect { }`.

## Signature / Usage

```kotlin
class NewsRemoteDataSource(
    private val newsApi: NewsApi,
    private val refreshIntervalMs: Long = 5000
) {
    val latestNews: Flow<List<ArticleHeadline>> = flow {
        while (true) {
            emit(newsApi.fetchLatestNews())
            delay(refreshIntervalMs)
        }
    }
}
```

```kotlin
viewModelScope.launch {
    newsRepository.favoriteLatestNews.collect { favoriteNews ->
        // update UI with each emission
    }
}
```

## Notes

- Flows are **cold and lazy** — the producer block only runs when a terminal operator (`collect`, `first`, `toList`, ...) is called, and it runs again for each independent collector. Use `shareIn`/`stateIn` to share a single running producer across collectors.
- `collect` is a `suspend` function and must run inside a coroutine.
- The `flow { }` producer cannot `emit` from a different `CoroutineContext` (e.g. a callback thread) — use `callbackFlow` or `channelFlow` for that.
- Collection stops when the producer finishes or the collecting coroutine is cancelled (e.g. `ViewModel` cleared).
- Room DAOs can return `Flow<List<T>>` directly for live query results (owned by the `android-data` skill; mention only).

## Related

- [Flow operators](./flow-operators.md)
- [StateFlow](./stateflow.md)
- [SharedFlow](./sharedflow.md)
- [callbackFlow and channelFlow](./callbackflow-channelflow.md)
