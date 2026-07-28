# rememberLazyListState

Creates and remembers a `LazyListState` across compositions, used to read and control the scroll position of `LazyColumn` / `LazyRow`.

## Signature / Usage

```kotlin
@Composable
public fun rememberLazyListState(
    initialFirstVisibleItemIndex: Int = 0,
    initialFirstVisibleItemScrollOffset: Int = 0,
): LazyListState
```

```kotlin
val listState = rememberLazyListState()
val coroutineScope = rememberCoroutineScope()

LazyColumn(state = listState) {
    items(messages) { message -> MessageRow(message) }
}

Button(onClick = { coroutineScope.launch { listState.animateScrollToItem(0) } }) {
    Text("Scroll to top")
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `initialFirstVisibleItemIndex` | `Int` | `0` | Initial value for `firstVisibleItemIndex`. |
| `initialFirstVisibleItemScrollOffset` | `Int` | `0` | Initial value for `firstVisibleItemScrollOffset`. |

`LazyListState` key members:

| Member | Type | Description |
|--------|------|-------------|
| `firstVisibleItemIndex` | `Int` | Index of the first item visible in the viewport (excludes content padding region). Observable. |
| `firstVisibleItemScrollOffset` | `Int` | Scroll offset of the first visible item; positive when scrolling forward. |
| `layoutInfo` | `LazyListLayoutInfo` | Snapshot of visible items from the last layout pass. |
| `scrollToItem(index, scrollOffset = 0)` | `suspend fun` | Instantly (no animation) brings the item at `index` to the top of the viewport. |
| `animateScrollToItem(index, scrollOffset = 0)` | `suspend fun` | Smoothly animates scroll to the item at `index`. |

## Notes

- Changing `initialFirstVisibleItemIndex`/`Offset` after first composition has no effect since the state is remembered.
- Avoid reading `layoutInfo` directly during composition to prevent infinite recomposition loops; prefer `derivedStateOf` for derived booleans (e.g. "show scroll-to-top button").
- Package: `androidx.compose.foundation.lazy`.

## Related

- [LazyColumn](./lazycolumn.md)
- [lazy-list-scope](./lazy-list-scope.md)
