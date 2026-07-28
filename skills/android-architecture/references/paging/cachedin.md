# cachedIn

Caches a `Flow<PagingData<T>>` so that any downstream collection from it shares the same `PagingData`, keeping the cache alive for as long as the given `CoroutineScope` is active.

## Signature / Usage

```kotlin
public fun <T : Any> Flow<PagingData<T>>.cachedIn(scope: CoroutineScope): Flow<PagingData<T>>
```

```kotlin
val userPagingFlow: Flow<PagingData<User>> = Pager(
    config = PagingConfig(pageSize = 20),
    pagingSourceFactory = { ExamplePagingSource(backend, query) },
).flow.cachedIn(viewModelScope)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `scope` | `CoroutineScope` | — | Scope in which the page cache remains active, typically `viewModelScope`. |

## Notes

- Without `cachedIn()`, a `PagingData` instance can only be collected once; recollection (e.g. after a configuration change) would otherwise re-trigger a full data reload.
- Apply it in the `ViewModel`, after any `map`/`filter`/`insertSeparators` transforms, before exposing the flow to the UI.
- Essential when combining the flow with operators such as `Flow.combine()` that collect it more than once.
- Package: `androidx.paging`.

## Related

- [Pager](./pager.md)
- [PagingData](./pagingdata.md)
- [PagingData transforms (map / filter / insertSeparators)](./pagingdata-transforms.md)
