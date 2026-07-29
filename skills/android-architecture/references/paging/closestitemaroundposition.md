# PagingState.closestItemAroundPosition

Coerces `anchorPosition` to the closest loaded value in `PagingState.pages` that also matches a given `predicate`. Added in Paging 3.4.0 to make it easier to write item-based `getRefreshKey()` implementations when the ideal anchorable item is near, but not exactly at, `anchorPosition`.

## Signature / Usage

```kotlin
public class PagingState<Key : Any, Value : Any> {
    public fun closestItemAroundPosition(
        anchorPosition: Int,
        predicate: (value: Value) -> Boolean,
    ): Value?
}
```

```kotlin
override fun getRefreshKey(state: PagingState<Int, User>): Int? {
    return state.anchorPosition?.let { anchorPosition ->
        // The item exactly at anchorPosition may not be a valid anchor (e.g. it was
        // filtered out downstream); fall back to the closest item that matches.
        val anchorItem = state.closestItemAroundPosition(anchorPosition) { isValidAnchor(it) }
        anchorItem?.id
    }
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `anchorPosition` | `Int` | — | Index in the list, including placeholders. |
| `predicate` | `(Value) -> Boolean` | — | Predicate the returned item must match. |

## Notes

- Returns the closest loaded item in `PagingState.pages` to `anchorPosition` that also matches `predicate`, or `null` if all loaded pages are empty or no loaded item matches `predicate`.
- Searches items both before and after `anchorPosition` with this priority: (1) the item closest to `anchorPosition`, (2) on a tie in proximity, the item before `anchorPosition`.
- Complements `closestItemToPosition()` (no predicate, always returns the nearest item) and `closestPageToPosition()` (returns the containing `Page` instead of an item); see [PagingSource](./pagingsource.md).
- Avoid calling on lists that do not support random access — performance takes a significant hit.
- Added in `androidx.paging:paging-*:3.4.0-alpha04` (API Changes, September 10, 2025), stabilized in `3.4.0` (January 28, 2026). Package: `androidx.paging`.

## Related

- [PagingSource](./pagingsource.md)
- [Pager](./pager.md)
