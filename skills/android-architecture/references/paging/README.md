# paging

| Name | Description | Path |
|------|-------------|------|
| Pager | Constructor for a reactive stream of `PagingData`, built from a `PagingConfig` and `PagingSource`/`RemoteMediator`. | [pager.md](./pager.md) |
| PagingConfig | Loading behavior configuration (page size, prefetch distance, placeholders, max size). | [pagingconfig.md](./pagingconfig.md) |
| PagingSource | Abstract data source class; defines `load()` / `getRefreshKey()`, and the `LoadParams` / `LoadResult` types. | [pagingsource.md](./pagingsource.md) |
| PagingData | Container for a single generation of paged data, flowing from `Pager` to the UI. | [pagingdata.md](./pagingdata.md) |
| RemoteMediator | Coordinates network loads into a local database-backed `PagingSource`; `MediatorResult` / `InitializeAction`. | [remotemediator.md](./remotemediator.md) |
| LoadState / CombinedLoadStates | Per-source and combined loading state (`NotLoading` / `Loading` / `Error`) for UI feedback. | [loadstate.md](./loadstate.md) |
| cachedIn | Caches and multicasts a `Flow<PagingData<T>>` across a `CoroutineScope`. | [cachedin.md](./cachedin.md) |
| PagingData transforms (map / filter / insertSeparators) | Extension functions to convert, filter, flatten, or insert separators/header/footer into `PagingData`. | [pagingdata-transforms.md](./pagingdata-transforms.md) |
| collectAsLazyPagingItems / LazyPagingItems | Compose entry point collecting a `PagingData` flow into `LazyColumn`/`LazyRow`-ready items. | [collectaslazypagingitems.md](./collectaslazypagingitems.md) |
| itemKey / itemContentType | Key/content-type factories for `LazyPagingItems` used with the foundation `items()` API. | [itemkey-itemcontenttype.md](./itemkey-itemcontenttype.md) |
| PagingDataAdapter | `RecyclerView` adapter wrapper around `AsyncPagingDataDiffer` for View-system paging UIs. | [pagingdataadapter.md](./pagingdataadapter.md) |
