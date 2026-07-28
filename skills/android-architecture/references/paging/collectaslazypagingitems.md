# collectAsLazyPagingItems / LazyPagingItems

Compose entry point for Paging: collects a `Flow<PagingData<T>>` and exposes the items as a `LazyPagingItems<T>` for use inside `LazyColumn` / `LazyRow` / `LazyVerticalGrid`, without adapters or manual diffing.

## Signature / Usage

```kotlin
@Composable
public fun <T : Any> Flow<PagingData<T>>.collectAsLazyPagingItems(
    context: CoroutineContext = EmptyCoroutineContext,
): LazyPagingItems<T>
```

```kotlin
@Composable
fun UserList(flow: Flow<PagingData<User>>) {
    val lazyPagingItems = flow.collectAsLazyPagingItems()
    LazyColumn {
        items(
            lazyPagingItems.itemCount,
            key = lazyPagingItems.itemKey { it.id },
        ) { index ->
            val user = lazyPagingItems[index]
            if (user != null) UserRow(user) else UserPlaceholder()
        }
    }
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `context` | `CoroutineContext` | `EmptyCoroutineContext` | Context used for collecting the flow. |

### LazyPagingItems<T> members

| Name | Type | Description |
|------|------|-------------|
| `itemCount` | `Int` | Number of accessible items. |
| `itemSnapshotList` | `ItemSnapshotList<T>` | Immutable snapshot of currently presented items, including placeholders. |
| `get(index)` | `operator fun get(index: Int): T?` | Returns the item at `index`, notifying Paging of the access to trigger prefetch loads. |
| `peek(index)` | `fun peek(index: Int): T?` | Returns the item at `index` without triggering a load. |
| `retry()` | `fun retry()` | Retries failed loads that resulted in `LoadState.Error`. |
| `refresh()` | `fun refresh()` | Creates a new `PagingData` from a new `PagingSource` instance. |
| `loadState` | `CombinedLoadStates` | Current combined loading state. |

## Notes

- Use `collectAsLazyPagingItems()` only inside `@Composable` functions.
- Provide unique, stable keys via `itemKey` (see [itemKey / itemContentType](./itemkey-itemcontenttype.md)); `null` items (placeholders) get an automatic placeholder key.
- Package: `androidx.paging.compose`.

## Related

- [itemKey / itemContentType](./itemkey-itemcontenttype.md)
- [LoadState / CombinedLoadStates](./loadstate.md)
- [Pager](./pager.md)
