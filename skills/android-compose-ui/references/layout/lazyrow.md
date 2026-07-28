# LazyRow

The horizontally scrolling list that only composes and lays out currently visible items.

## Signature / Usage

```kotlin
@Composable
public fun LazyRow(
    modifier: Modifier = Modifier,
    state: LazyListState = rememberLazyListState(),
    contentPadding: PaddingValues = PaddingValues(0.dp),
    reverseLayout: Boolean = false,
    horizontalArrangement: Arrangement.Horizontal =
        if (!reverseLayout) Arrangement.Start else Arrangement.End,
    verticalAlignment: Alignment.Vertical = Alignment.Top,
    flingBehavior: FlingBehavior = ScrollableDefaults.flingBehavior(),
    userScrollEnabled: Boolean = true,
    overscrollEffect: OverscrollEffect? = rememberOverscrollEffect(),
    content: LazyListScope.() -> Unit,
)
```

```kotlin
LazyRow {
    items(photos) { photo -> PhotoItem(photo) }
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `modifier` | `Modifier` | `Modifier` | Applied to the layout. |
| `state` | `LazyListState` | `rememberLazyListState()` | Controls and observes scrolling/item info. |
| `contentPadding` | `PaddingValues` | `PaddingValues(0.dp)` | Padding around the content. |
| `reverseLayout` | `Boolean` | `false` | Reverses the direction of scrolling and layout. |
| `horizontalArrangement` | `Arrangement.Horizontal` | `Arrangement.Start` (or `End` if reversed) | Arrangement of items when content is narrower than the viewport. |
| `verticalAlignment` | `Alignment.Vertical` | `Alignment.Top` | Vertical alignment of items. |
| `flingBehavior` | `FlingBehavior` | `ScrollableDefaults.flingBehavior()` | Logic describing fling behavior. |
| `userScrollEnabled` | `Boolean` | `true` | Whether user gestures can scroll the list. |
| `overscrollEffect` | `OverscrollEffect?` | `rememberOverscrollEffect()` | Overscroll effect. |
| `content` | `LazyListScope.() -> Unit` | — | DSL block using `item`/`items`/`itemsIndexed`. |

## Notes

- Shares `LazyListScope`, `LazyListState`, and item-key/content-type guidance with `LazyColumn`.
- Package: `androidx.compose.foundation.lazy`.

## Related

- [LazyColumn](./lazycolumn.md)
- [lazy-list-scope](./lazy-list-scope.md)
- [pager](./pager.md)
