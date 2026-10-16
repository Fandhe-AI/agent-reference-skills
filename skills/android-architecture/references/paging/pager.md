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

### Member functions (Paging 3.5.0+)

| Name | Signature | Description |
|------|-----------|-------------|
| `append()` | `public fun append()` | Loads a page at the end of the current loaded data, without scrolling. No-op when there is no more data (append is `LoadState.NotLoading.Complete`) and when a preceding `append()` returned `LoadState.Error` (use `retry()` to recover). Appends triggered by scrolling (`PagingConfig.prefetchDistance`) take precedence. |
| `prepend()` | `public fun prepend()` | Loads a page at the start of the current loaded data, without scrolling. No-op when there is no more data (prepend is `LoadState.NotLoading.Complete`) and when a preceding `prepend()` returned `LoadState.Error` (use `retry()` to recover). Prepends triggered by scrolling (`PagingConfig.prefetchDistance`) take precedence. |
| `refresh()` | `public fun refresh()` | Best-effort reload of all currently loaded data. The refresh key is the key used to load the current first loaded page, and the loadSize is the size of the currently loaded data. |
| `refresh(item)` | `public fun refresh(item: Value)` | Best-effort reload around a loaded item. The refresh key is the key originally used to load the page that contains `item`, and the loadSize is `PagingConfig.initialLoadSize`. |
| `retry()` | `public fun retry()` | Retries the most recent load that returned `PagingSource.LoadResult.Error`. No-op if there were no errors. Applies to all `LoadType`s; success is not guaranteed if the cause persists. |

## Notes

- `append()` / `prepend()` / `refresh()` / `refresh(item)` / `retry()` were added in Paging 3.5.0 (May 06, 2026; first in 3.5.0-alpha01, March 11, 2026). In the 3.5.3 source they are member functions of `Pager`, and `refresh` also has a `refresh(item: Value)` overload.
- With `asItemSnapshotListFlow`, `append()` / `prepend()` are the only way to load more data. With paging-runtime / paging-compose they are an alternative to scrolling.
- Since Paging 3.5.2 (October 07, 2026), calling `append()` before the initial refresh completes is a no-op and no longer throws `NoSuchElementException`.
- This is the Android Jetpack Paging 3 (Kotlin, `androidx.paging`) `Pager` — distinct from the layout `Pager` composable in `androidx.compose.foundation.pager`.
- Exposes a `flow: Flow<PagingData<Value>>` property; apply `.cachedIn(scope)` before exposing it from a `ViewModel`.
- Package: `androidx.paging`.
- Source (primary, signatures and KDoc): Google Maven sources jar https://dl.google.com/android/maven2/androidx/paging/paging-common/3.5.3/paging-common-3.5.3-sources.jar (`androidx/paging/Pager.kt`).
- Release notes: https://developer.android.com/jetpack/androidx/releases/paging (3.5.0 / 3.5.2 / 3.5.3). The API reference pages on developer.android.com are not fetchable, so the sources jar above is the basis for this page.

## Related

- [PagingConfig](./pagingconfig.md)
- [PagingSource](./pagingsource.md)
- [RemoteMediator](./remotemediator.md)
- [cachedIn](./cachedin.md)
- [asItemSnapshotListFlow / ItemSnapshotList](./asitemsnapshotlistflow.md)
