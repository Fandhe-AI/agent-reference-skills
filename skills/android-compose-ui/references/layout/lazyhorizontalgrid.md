# LazyHorizontalGrid

A lazy horizontal grid layout that composes and lays out only visible columns.

## Signature / Usage

```kotlin
@Composable
public fun LazyHorizontalGrid(
    rows: GridCells,
    modifier: Modifier = Modifier,
    state: LazyGridState = rememberLazyGridState(),
    contentPadding: PaddingValues = PaddingValues(0.dp),
    reverseLayout: Boolean = false,
    horizontalArrangement: Arrangement.Horizontal =
        if (!reverseLayout) Arrangement.Start else Arrangement.End,
    verticalArrangement: Arrangement.Vertical = Arrangement.Top,
    flingBehavior: FlingBehavior = ScrollableDefaults.flingBehavior(),
    userScrollEnabled: Boolean = true,
    overscrollEffect: OverscrollEffect? = rememberOverscrollEffect(),
    content: LazyGridScope.() -> Unit,
)
```

```kotlin
LazyHorizontalGrid(rows = GridCells.Fixed(2), modifier = Modifier.height(200.dp)) {
    items(photos) { photo -> PhotoItem(photo) }
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `rows` | `GridCells` | — | `GridCells.Fixed(count)` or `GridCells.Adaptive(minSize)`. |
| `modifier` | `Modifier` | `Modifier` | Applied to the layout; must have a bounded height. |
| `state` | `LazyGridState` | `rememberLazyGridState()` | Controls and observes scroll/item info. |
| `contentPadding` | `PaddingValues` | `PaddingValues(0.dp)` | Padding around content. |
| `reverseLayout` | `Boolean` | `false` | Reverses scroll/layout direction. |
| `horizontalArrangement` | `Arrangement.Horizontal` | `Arrangement.Start` | Horizontal spacing between columns. |
| `verticalArrangement` | `Arrangement.Vertical` | `Arrangement.Top` | Vertical spacing between rows. |
| `flingBehavior` | `FlingBehavior` | `ScrollableDefaults.flingBehavior()` | Fling behavior logic. |
| `userScrollEnabled` | `Boolean` | `true` | Whether user gestures can scroll. |
| `overscrollEffect` | `OverscrollEffect?` | `rememberOverscrollEffect()` | Overscroll effect. |
| `content` | `LazyGridScope.() -> Unit` | — | DSL block (same shape as `LazyListScope`). |

## Notes

- Row-based counterpart of `LazyVerticalGrid`; needs an explicit bounded height (e.g. `Modifier.height(...)`) since it scrolls horizontally.
- Package: `androidx.compose.foundation.lazy.grid`.

## Related

- [LazyVerticalGrid](./lazyverticalgrid.md)
- [lazy-list-scope](./lazy-list-scope.md)
