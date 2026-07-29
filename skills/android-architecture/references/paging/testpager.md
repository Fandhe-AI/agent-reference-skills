# TestPager / asSnapshot

Testing utilities from the `paging-testing` artifact: `TestPager` fakes a `Pager` to drive a single `PagingSource` generation directly, and `Flow<PagingData<T>>.asSnapshot()` runs scroll operations against a real `Pager`/`PagingData` stream and returns the resulting list for assertions.

## Signature / Usage

```kotlin
// PagingSource unit test
public class TestPager<Key : Any, Value : Any>(
    private val config: PagingConfig,
    private val pagingSource: PagingSource<Key, Value>,
)

val pager = TestPager(CONFIG, pagingSource)
val result = pager.refresh() as PagingSource.LoadResult.Page
val page2 = pager.append() as PagingSource.LoadResult.Page

// End-to-end Pager/PagingData test
public suspend fun <Value : Any> Flow<PagingData<Value>>.asSnapshot(
    onError: LoadErrorHandler = LoadErrorHandler { THROW },
    loadOperations: suspend SnapshotLoader<Value>.() -> Unit = {},
): List<Value>

@Test
fun test_items_contain_one_to_ten() = runTest {
    val itemsSnapshot: List<String> = viewModel.items.asSnapshot {
        scrollTo(index = 50)
    }
    assertEquals(expected = (0..50).map(Int::toString), actual = itemsSnapshot)
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `config` | `PagingConfig` | — | Loading behavior configuration used to simulate the fake `Pager`. |
| `pagingSource` | `PagingSource<Key, Value>` | — | The single `PagingSource` instance under test; create a new `TestPager` for a new generation. |

### Key members (`TestPager`)

| Name | Type | Description |
|------|------|-------------|
| `refresh(initialKey)` | `suspend fun refresh(initialKey: Key? = null): LoadResult<Key, Value>` | Must be the first call; throws `IllegalStateException` if called again. |
| `append()` | `suspend fun append(): LoadResult<Key, Value>?` | Loads the next page after a prior `refresh()`/`append()`. |
| `prepend()` | `suspend fun prepend(): LoadResult<Key, Value>?` | Loads the previous page after a prior `refresh()`/`prepend()`. |
| `getLastLoadedPage()` | `suspend fun getLastLoadedPage(): LoadResult.Page<Key, Value>?` | Most recently loaded page. |
| `getPages()` | `suspend fun getPages(): List<LoadResult.Page<Key, Value>>` | All pages loaded so far, respecting `PagingConfig.maxSize` drops. |
| `getPagingState(anchorPosition)` | `suspend fun getPagingState(anchorPosition: Int): PagingState<Key, Value>` | Builds a `PagingState` anchored at a position, for `getRefreshKey()` testing. |
| `getPagingState(anchorPositionLookup)` | `suspend fun getPagingState(anchorPositionLookup: (item: Value) -> Boolean): PagingState<Key, Value>` | Builds a `PagingState` anchored at the first item matching the predicate. |

### `asSnapshot` parameters

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `onError` | `LoadErrorHandler` | `LoadErrorHandler { THROW }` | Recovery strategy (`THROW` / `RETRY` / `RETURN_CURRENT_SNAPSHOT`) when a load returns `LoadResult.Error`. |
| `loadOperations` | `suspend SnapshotLoader<Value>.() -> Unit` | `{}` | Lambda with `scrollTo(index)`, `appendScrollWhile(predicate)`, `prependScrollWhile(predicate)`, `refresh()`, `flingTo(index)`. |

## Notes

- Module: `androidx.paging:paging-testing`, package `androidx.paging.testing`.
- Use `TestPager` for isolated `PagingSource`/`RemoteMediator` unit tests; use `asSnapshot()` for end-to-end tests that exercise a real `Pager` + `PagingData` flow (including transforms and separators).
- `List<T>.asPagingSourceFactory()` / `Flow<List<T>>.asPagingSourceFactory()` build a fake `PagingSourceFactory` from an in-memory list for repository fakes in tests.
- `RemoteMediator.load()` can be called and asserted on directly (returns `RemoteMediator.MediatorResult`) without `TestPager`.
- `PagingDataAdapter`/`AsyncPagingDataDiffer` are tested by calling `submitData(pagingData)` directly with a `TestDispatcher`/`TestScope`, then asserting on `snapshot()` or `itemCount`.

## Related

- [PagingSource](./pagingsource.md)
- [RemoteMediator](./remotemediator.md)
- [PagingDataAdapter](./pagingdataadapter.md)
- [Pager](./pager.md)
