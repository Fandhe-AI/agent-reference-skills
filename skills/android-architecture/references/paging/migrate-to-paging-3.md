# Migrate to Paging 3

Migration path from Paging 2 (`androidx.paging:paging-runtime:2.x`) to Paging 3. Paging 3 consolidates the Paging 2 `DataSource` hierarchy into a single `PagingSource`, replaces `PagedList` with a `Flow<PagingData<T>>` built by `Pager`, and adds first-class coroutines/`Flow`, built-in `LoadState`, and Compose support.

## Signature / Usage

```kotlin
// Paging 2
val config = PagedList.Config.Builder().setPageSize(20).build()
val pagedList = PagedList.Builder(dataSourceFactory, config).build()

// Paging 3
val flow: Flow<PagingData<User>> = Pager(
    PagingConfig(pageSize = 20)
) {
    ExamplePagingSource(backend, query)
}.flow.cachedIn(viewModelScope)
```

## Options / Props

| Paging 2 | Paging 3 | Notes |
|----------|----------|-------|
| `PageKeyedDataSource` / `PositionalDataSource` / `ItemKeyedDataSource` | `PagingSource` | One class, one `load(params): LoadResult` method instead of `loadInitial`/`loadBefore`/`loadAfter`. |
| `PagedList.Config` | `PagingConfig` | Same fields (page size, prefetch distance, placeholders, max size). |
| `PagedList.Builder` / `LivePagedListBuilder` | `Pager` | Exposes `.flow: Flow<PagingData<T>>` instead of `LiveData<PagedList<T>>`. |
| `PagedList.BoundaryCallback` | `RemoteMediator` | Coordinates network-into-database loads; requires `@ExperimentalPagingApi`. |
| `PagedListAdapter` | `PagingDataAdapter` (Views) / `collectAsLazyPagingItems()` (Compose) | Built-in diffing and `submitData(pagingData)` instead of `submitList(pagedList)`. |
| `DataSource.map()` / `mapByPage()` | `PagingData.map { }` / `.flatMap { }` / `.filter { }` applied on the `Pager.flow` | Transforms apply per `PagingData` generation. |

## Notes

- `getRefreshKey(state: PagingState<Key, Value>)` replaces the old positional/key-based refresh logic; return `state.anchorPosition` for positional keys or look up the closest item's key via `state.getClosestItemToPosition(...)` for item keys.
- Partial migration is supported: migrate only `DataSource` → `PagingSource` and keep the existing `PagedListAdapter` presentation layer, migrating incrementally.
- Gradle: `androidx.paging:paging-runtime:3.x.x` (Views) and `androidx.paging:paging-compose:3.x.x` (Compose) replace the Paging 2 artifact.
- This is a migration guide, not a stable API surface — always confirm current class/method names against the linked API pages before writing migration code.

## Related

- [Pager](./pager.md)
- [PagingConfig](./pagingconfig.md)
- [PagingSource](./pagingsource.md)
- [RemoteMediator](./remotemediator.md)
- [PagingDataAdapter](./pagingdataadapter.md)
- [collectAsLazyPagingItems / LazyPagingItems](./collectaslazypagingitems.md)
