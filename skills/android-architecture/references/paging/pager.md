# Pager

Primary entry point into Paging; constructor for a reactive stream of `PagingData`. Reuse the same `Pager` instance (typically hoisted in a `ViewModel`) across the app.

## Signature / Usage

```kotlin
public class Pager<Key : Any, Value : Any> @JvmOverloads constructor(
    config: PagingConfig,
    initialKey: Key? = null,
    remoteMediator: RemoteMediator<Key, Value>? = null,
    pagingSourceFactory: () -> PagingSource<Key, Value>,
)
```

```kotlin
val userPagingFlow: Flow<PagingData<User>> = Pager(
    config = PagingConfig(pageSize = 20, enablePlaceholders = true),
    pagingSourceFactory = { ExamplePagingSource(backend, query) }
).flow.cachedIn(viewModelScope)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `config` | `PagingConfig` | — | Loading behavior configuration (page size, prefetch distance, etc.). |
| `initialKey` | `Key?` | `null` | Key passed to the first `PagingSource.load()` call. |
| `remoteMediator` | `RemoteMediator<Key, Value>?` | `null` | Optional mediator that loads from network into a local database-backed `PagingSource`. Requires `@ExperimentalPagingApi`. |
| `pagingSourceFactory` | `() -> PagingSource<Key, Value>` | — | Factory producing a new `PagingSource` for each generation of data. |

## Notes

- This is the Android Jetpack Paging 3 (Kotlin, `androidx.paging`) `Pager` — distinct from the layout `Pager` composable in `androidx.compose.foundation.pager`.
- Exposes a `flow: Flow<PagingData<Value>>` property; apply `.cachedIn(scope)` before exposing it from a `ViewModel`.
- Package: `androidx.paging`.

## Related

- [PagingConfig](./pagingconfig.md)
- [PagingSource](./pagingsource.md)
- [RemoteMediator](./remotemediator.md)
- [cachedIn](./cachedin.md)
