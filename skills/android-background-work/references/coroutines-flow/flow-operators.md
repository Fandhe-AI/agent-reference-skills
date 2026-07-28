# Flow Intermediate Operators

Intermediate operators transform a `Flow` without collecting it; they are lazy and only execute as values pass through when a terminal operator runs. Common ones: `map`, `filter`, `transform`, `onEach`, `catch`, `flowOn`, `debounce`, `distinctUntilChanged`, `buffer`, `conflate`.

## Signature / Usage

```kotlin
class NewsRepository(
    private val newsRemoteDataSource: NewsRemoteDataSource,
    private val userData: UserData,
    private val defaultDispatcher: CoroutineDispatcher
) {
    val favoriteLatestNews: Flow<List<ArticleHeadline>> =
        newsRemoteDataSource.latestNews
            .map { news -> news.filter { userData.isFavoriteTopic(it) } }
            .onEach { news -> saveInCache(news) }
            .flowOn(defaultDispatcher)              // affects everything upstream
            .catch { e -> emit(lastCachedNews()) }  // runs downstream, in collector's context
}
```

```kotlin
searchQueryFlow
    .debounce(300)
    .distinctUntilChanged()
    .collect { query -> search(query) }
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `map` | `(T) -> R` | — | Transforms each emitted value. |
| `filter` | `(T) -> Boolean` | — | Emits only values matching the predicate. |
| `transform` | `suspend FlowCollector<R>.(T) -> Unit` | — | General-purpose transform, can emit 0..n values per input. |
| `onEach` | `suspend (T) -> Unit` | — | Runs a side effect for each value without altering it. |
| `catch` | `suspend FlowCollector<T>.(Throwable) -> Unit` | — | Catches upstream exceptions; can emit a fallback value. |
| `flowOn(context)` | `CoroutineContext` | — | Changes the `CoroutineContext` of the flow **upstream** of this call; downstream still runs in the collector's context. |
| `debounce(timeoutMillis)` | `Long` | — | Emits a value only after the given quiet period with no new upstream emission. |
| `distinctUntilChanged()` | — | — | Suppresses consecutive duplicate emissions. |
| `buffer(capacity)` | `Int` | `64` | Decouples producer/consumer speed with a buffer; `buffer(0)` removes buffering. |
| `conflate()` | — | — | Keeps only the latest value when the collector is slower than the producer; equivalent to `buffer(1, BufferOverflow.DROP_OLDEST)`. |

## Notes

- `flowOn` only affects operators **above** it in the chain (producer side); operators below `flowOn` (e.g. a trailing `catch`/`collect`) run in the collector's original context (commonly `Dispatchers.Main`).
- `catch` only catches exceptions from upstream operators, not from the terminal `collect` block itself.
- These operators can be folded onto a single page per the research scope; equivalent operators not listed here (`take`, `drop`, `first`, `toList`, ...) follow the same lazy, chainable model.

## Related

- [Flow basics](./flow-basics.md)
- [Dispatchers and withContext](./dispatchers-withcontext.md)
- [combine, zip, flatMapLatest](./combine-zip-flatmaplatest.md)
