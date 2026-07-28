# LoadState / CombinedLoadStates

`LoadState` represents the loading status of a single `LoadType` (`REFRESH` / `PREPEND` / `APPEND`) from a single data source (`PagingSource` or `RemoteMediator`). `CombinedLoadStates` aggregates the signals from all sources so the UI can react in detail (loading spinners, error rows, retry).

## Signature / Usage

```kotlin
public sealed class LoadState(val endOfPaginationReached: Boolean) {
    public data class NotLoading(val endOfPaginationReached: Boolean) : LoadState(endOfPaginationReached)
    public object Loading : LoadState(false)
    public data class Error(val error: Throwable) : LoadState(false)
}

public class CombinedLoadStates(
    val refresh: LoadState,
    val prepend: LoadState,
    val append: LoadState,
    val source: LoadStates,
    val mediator: LoadStates? = null,
)
```

```kotlin
when (val state = lazyPagingItems.loadState.refresh) {
    is LoadState.Loading -> CircularProgressIndicator()
    is LoadState.Error -> ErrorButton(
        message = state.error.message ?: "Unknown error",
        onClick = { lazyPagingItems.retry() },
    )
    else -> {}
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `NotLoading.endOfPaginationReached` | `Boolean` | No active load and no error. `true` once the end of the list has been reached. |
| `Loading` | (singleton) | An active load is in progress. |
| `Error.error` | `Throwable` | The error that caused this load to fail. |
| `refresh` / `prepend` / `append` | `LoadState` | Combined state for each `LoadType`, generally deferring to `mediator` when present. |
| `source` | `LoadStates` | States corresponding to loads from the `PagingSource`. |
| `mediator` | `LoadStates?` | States corresponding to loads from the `RemoteMediator`, or `null` if none is present. |

## Notes

- `LoadType.REFRESH` always has `endOfPaginationReached == false`.
- Access via `LazyPagingItems.loadState` (Compose) or `PagingDataAdapter.loadStateFlow` / `addLoadStateListener` (View).
- Use `loadState.source.refresh` vs. `loadState.mediator?.refresh` to distinguish local-cache state from network-sync state (e.g. to avoid a full-screen spinner when cached data is already available).
- Package: `androidx.paging`.

## Related

- [collectAsLazyPagingItems / LazyPagingItems](./collectaslazypagingitems.md)
- [PagingDataAdapter](./pagingdataadapter.md)
- [RemoteMediator](./remotemediator.md)
