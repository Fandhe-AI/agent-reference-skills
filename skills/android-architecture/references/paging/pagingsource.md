# PagingSource

Core, abstract API class for defining how to retrieve paged data from a single source (network or local database). Override `load()` to fetch data and `getRefreshKey()` to determine the key used on refresh/invalidation.

## Signature / Usage

```kotlin
public abstract class PagingSource<Key : Any, Value : Any> {
    public abstract suspend fun load(params: LoadParams<Key>): LoadResult<Key, Value>
    public abstract fun getRefreshKey(state: PagingState<Key, Value>): Key?

    public open val jumpingSupported: Boolean = false
    public open val keyReuseSupported: Boolean = false

    public fun invalidate()
    public fun registerInvalidatedCallback(onInvalidatedCallback: () -> Unit)
    public fun unregisterInvalidatedCallback(onInvalidatedCallback: () -> Unit)
}
```

```kotlin
class ExamplePagingSource(
    val backend: ExampleBackendService,
    val query: String,
) : PagingSource<Int, User>() {

    override suspend fun load(params: LoadParams<Int>): LoadResult<Int, User> {
        try {
            val nextPageNumber = params.key ?: 1
            val response = backend.searchUsers(query, nextPageNumber)
            return LoadResult.Page(
                data = response.users,
                prevKey = null,
                nextKey = nextPageNumber + 1,
            )
        } catch (e: IOException) {
            return LoadResult.Error(e)
        } catch (e: HttpException) {
            return LoadResult.Error(e)
        }
    }

    override fun getRefreshKey(state: PagingState<Int, User>): Int? {
        return state.anchorPosition?.let { anchorPosition ->
            val anchorPage = state.closestPageToPosition(anchorPosition)
            anchorPage?.prevKey?.plus(1) ?: anchorPage?.nextKey?.minus(1)
        }
    }
}
```

## Options / Props

### LoadParams (sealed, subtypes: Refresh / Append / Prepend)

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `key` | `Key?` (Refresh) / `Key` (Append, Prepend) | — | Key to load. Nullable only for `Refresh`, since the initial load may have no key. |
| `loadSize` | `Int` | — | Requested number of items to load. |
| `placeholdersEnabled` | `Boolean` | — | Whether placeholders are enabled, mirrors `PagingConfig.enablePlaceholders`. |

### LoadResult.Page

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `data` | `List<Value>` | — | Loaded items. |
| `prevKey` | `Key?` | — | Key for the page before this one, or `null` if none. |
| `nextKey` | `Key?` | — | Key for the page after this one, or `null` if none. |
| `itemsBefore` | `Int` | `COUNT_UNDEFINED` | Number of placeholder items before this page. Required for jumping support. |
| `itemsAfter` | `Int` | `COUNT_UNDEFINED` | Number of placeholder items after this page. Required for jumping support. |

### LoadResult.Error / LoadResult.Invalid

| Name | Type | Description |
|------|------|-------------|
| `throwable` (Error) | `Throwable` | Recoverable error, surfaced as `LoadState.Error`; may be retried. |
| `Invalid` | — (no fields) | Signals the `PagingSource` is stale (underlying dataset changed) and must be replaced; terminates future loads and triggers automatic invalidation. |

## Notes

- `PagingSource<Key, Value>` has two type parameters: `Key`, the identifier used to load data (e.g. `Int` page number), and `Value`, the item type.
- `getRefreshKey()` is called automatically by the library on invalidation/refresh to determine which page to reload around the last accessed position.
- Package: `androidx.paging`.

## Related

- [Pager](./pager.md)
- [RemoteMediator](./remotemediator.md)
- [PagingState.closestItemAroundPosition](./closestitemaroundposition.md)
