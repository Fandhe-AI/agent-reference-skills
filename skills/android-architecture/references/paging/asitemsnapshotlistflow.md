# asItemSnapshotListFlow / ItemSnapshotList

Converts a `Flow<PagingData<T>>` into a `Flow<ItemSnapshotList<T>>`. Each emitted `ItemSnapshotList` is a snapshot of all loaded data that can be cached for repeated reads.

## Signature / Usage

```kotlin
public fun <T : Any> Flow<PagingData<T>>.asItemSnapshotListFlow(
    onLoadError: (CombinedLoadStates) -> Unit = {}
): Flow<ItemSnapshotList<T>>
```

```kotlin
public class ItemSnapshotList<T>(
    @IntRange(from = 0) public val placeholdersBefore: Int,
    @IntRange(from = 0) public val placeholdersAfter: Int,
    public val items: List<T>,
) : AbstractList<T?>() {
    public override val size: Int // placeholdersBefore + items.size + placeholdersAfter
    override fun get(index: Int): T?
}
```

```kotlin
val snapshots: Flow<ItemSnapshotList<User>> =
    pager.flow
        .cachedIn(viewModelScope)
        .asItemSnapshotListFlow(onLoadError = { states -> /* handle error */ })
```

## Options / Props

`asItemSnapshotListFlow`

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `onLoadError` | `(CombinedLoadStates) -> Unit` | `{}` | Invoked when any load returns `LoadState.Error`; receives the `CombinedLoadStates` containing the error. See `Pager.retry` for a recovery option. |

`ItemSnapshotList`

| Name | Type | Description |
|------|------|-------------|
| `placeholdersBefore` | `Int` | Number of placeholders before `items`; 0 if `PagingConfig.enablePlaceholders` is `false`. |
| `placeholdersAfter` | `Int` | Number of placeholders after `items`; 0 if `PagingConfig.enablePlaceholders` is `false`. |
| `items` | `List<T>` | The presented data, excluding placeholders. |
| `size` | `Int` | Size including placeholders. Use `items.size` for the size excluding placeholders. |

## Notes

- Emits a new `ItemSnapshotList` whenever new items are loaded or loaded items are dropped (e.g. to fulfill `PagingConfig.maxSize`).
- The flow stays active as long as the collection scope is active. Use an already-managed scope (such as a ViewModel scope) or cancel it manually to avoid leaks.
- It is a cold flow and does not start loading until collected. For multiple collectors, convert to a SharedFlow with `stateIn()` or `shareIn()` (the KDoc spells it `sharedIn()`).
- `ItemSnapshotList.get(index)` takes an index that includes placeholders and returns `null` at a placeholder position; it throws `IndexOutOfBoundsException` for an out-of-range index.
- `ItemSnapshotList` is the snapshot type presented by `AsyncPagingDataDiffer` / `PagingDataAdapter`.
- Package: `androidx.paging` (paging-common 3.5.3).

## Related

- [PagingData](./pagingdata.md)
- [cachedIn](./cachedin.md)
- [LoadState](./loadstate.md)
- [PagingConfig](./pagingconfig.md)
- [Pager](./pager.md)
