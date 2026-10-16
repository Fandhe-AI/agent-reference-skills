# paging

| Name | Description | Path |
|------|-------------|------|
| asItemSnapshotListFlow / ItemSnapshotList | Converts a `Flow<PagingData<T>>` into a `Flow<ItemSnapshotList<T>>`. Each emitted `ItemSnapshotList` is a snapshot of all loaded data that can be cached for repeated reads. | [asitemsnapshotlistflow.md](./asitemsnapshotlistflow.md) |
| cachedIn | Caches a `Flow<PagingData<T>>` so that any downstream collection from it shares the same `PagingData`, keeping the cache alive for as long as the given `CoroutineScope` is active. | [cachedin.md](./cachedin.md) |
| PagingState.closestItemAroundPosition | Coerces `anchorPosition` to the closest loaded value in `PagingState.pages` that also matches a given `predicate`. | [closestitemaroundposition.md](./closestitemaroundposition.md) |
| collectAsLazyPagingItems / LazyPagingItems | Compose entry point for Paging: collects a `Flow<PagingData<T>>` and exposes the items as a `LazyPagingItems<T>` for use inside `LazyColumn` / `LazyRow` / `LazyVerticalGrid`, without adapters or manual diffing. | [collectaslazypagingitems.md](./collectaslazypagingitems.md) |
| itemKey / itemContentType | Extension functions on `LazyPagingItems<T>` that produce index-based key / content-type factories for the foundation `items(count, key, contentType)` overload. | [itemkey-itemcontenttype.md](./itemkey-itemcontenttype.md) |
| LoadState / CombinedLoadStates | `LoadState` represents the loading status of a single `LoadType` (`REFRESH` / `PREPEND` / `APPEND`) from a single data source (`PagingSource` or `RemoteMediator`). | [loadstate.md](./loadstate.md) |
| Migrate to Paging 3 | Migration path from Paging 2 (`androidx.paging:paging-runtime:2.x`) to Paging 3. | [migrate-to-paging-3.md](./migrate-to-paging-3.md) |
| Pager | Primary entry point into Paging; constructor for a reactive stream of `PagingData`. Reuse the same `Pager` instance (typically hoisted in a `ViewModel`) across the app. | [pager.md](./pager.md) |
| PagingConfig | Object used to configure loading behavior within a `Pager`, as it loads content from a `PagingSource`. | [pagingconfig.md](./pagingconfig.md) |
| PagingData transforms (map / filter / insertSeparators) | Extension functions on `PagingData<T>` for transforming items as they load: type conversion, filtering, flattening, and inserting separator / header / footer items. | [pagingdata-transforms.md](./pagingdata-transforms.md) |
| PagingData | Container for paged data from a single generation of loads. | [pagingdata.md](./pagingdata.md) |
| PagingDataAdapter | View-system (`RecyclerView`) counterpart to `collectAsLazyPagingItems`: a convenience wrapper around `AsyncPagingDataDiffer` for presenting paginated data, with built-in diffing and load-state access. | [pagingdataadapter.md](./pagingdataadapter.md) |
| PagingSource | Core, abstract API class for defining how to retrieve paged data from a single source (network or local database). | [pagingsource.md](./pagingsource.md) |
| RemoteMediator | Defines a set of callbacks used to incrementally load data from a remote (network) source into a local source wrapped by a `PagingSource`. | [remotemediator.md](./remotemediator.md) |
| TestPager / asSnapshot | Testing utilities from the `paging-testing` artifact: `TestPager` drives a single `PagingSource` generation, and `asSnapshot()` collects a `PagingData` stream into a list for assertions. | [testpager.md](./testpager.md) |
