# RemoteMediator

Defines a set of callbacks used to incrementally load data from a remote (network) source into a local source wrapped by a `PagingSource` (e.g. a Room database). Acts as a signal from the Paging library when the app has run out of cached data, enabling offline-first pagination.

## Signature / Usage

```kotlin
@ExperimentalPagingApi
public abstract class RemoteMediator<Key : Any, Value : Any> {
    public abstract suspend fun load(
        loadType: LoadType,
        state: PagingState<Key, Value>,
    ): MediatorResult

    public open suspend fun initialize(): InitializeAction = InitializeAction.LAUNCH_INITIAL_REFRESH
}
```

```kotlin
@OptIn(ExperimentalPagingApi::class)
class ExampleRemoteMediator(
    private val query: String,
    private val database: RoomDb,
    private val networkService: ExampleBackendService,
) : RemoteMediator<Int, User>() {
    private val userDao = database.userDao()

    override suspend fun load(
        loadType: LoadType,
        state: PagingState<Int, User>,
    ): MediatorResult {
        return try {
            val loadKey = when (loadType) {
                LoadType.REFRESH -> null
                LoadType.PREPEND -> return MediatorResult.Success(endOfPaginationReached = true)
                LoadType.APPEND -> {
                    val lastItem = state.lastItemOrNull()
                        ?: return MediatorResult.Success(endOfPaginationReached = true)
                    lastItem.id
                }
            }
            val response = networkService.searchUsers(query = query, after = loadKey)
            database.withTransaction {
                if (loadType == LoadType.REFRESH) userDao.deleteByQuery(query)
                userDao.insertAll(response.users)
            }
            MediatorResult.Success(endOfPaginationReached = response.nextKey == null)
        } catch (e: IOException) {
            MediatorResult.Error(e)
        } catch (e: HttpException) {
            MediatorResult.Error(e)
        }
    }
}
```

## Options / Props

### load() parameters

| Name | Type | Description |
|------|------|-------------|
| `loadType` | `LoadType` | `REFRESH` (replace with fresh data), `APPEND` (fetch more to append), or `PREPEND` (fetch more to prepend). |
| `state` | `PagingState<Key, Value>` | Pages loaded so far, the most recently accessed index, and the `PagingConfig` used to initialize the stream. |

### MediatorResult (sealed, return type of load())

| Name | Type | Description |
|------|------|-------------|
| `Success.endOfPaginationReached` | `Boolean` | `false` if more network data is available; `true` if pagination is exhausted. |
| `Error.throwable` | `Throwable` | Recoverable network/loading error, surfaced as `LoadState.Error`. |

### InitializeAction (enum, return type of initialize())

| Name | Description |
|------|-------------|
| `LAUNCH_INITIAL_REFRESH` | Immediately dispatch a `REFRESH` load and block `PREPEND`/`APPEND` until it succeeds. Default. |
| `SKIP_INITIAL_REFRESH` | Use cached data as-is; wait for an explicit UI-triggered refresh. |

## Notes

- Requires `@OptIn(ExperimentalPagingApi::class)`.
- The library may cancel pending `PREPEND`/`APPEND` operations when a `REFRESH` is requested.
- Attach with `Pager(config, remoteMediator = ...) { pagingSource }`.
- Package: `androidx.paging`.

## Related

- [Pager](./pager.md)
- [PagingSource](./pagingsource.md)
- [LoadState / CombinedLoadStates](./loadstate.md)
