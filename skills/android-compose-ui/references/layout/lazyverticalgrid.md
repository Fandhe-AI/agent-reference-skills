# LazyVerticalGrid

A lazy vertical grid layout that composes and lays out only visible rows.

## Signature / Usage

```kotlin
@Composable
public fun LazyVerticalGrid(
    columns: GridCells,
    modifier: Modifier = Modifier,
    state: LazyGridState = rememberLazyGridState(),
    contentPadding: PaddingValues = PaddingValues(0.dp),
    reverseLayout: Boolean = false,
    verticalArrangement: Arrangement.Vertical =
        if (!reverseLayout) Arrangement.Top else Arrangement.Bottom,
    horizontalArrangement: Arrangement.Horizontal = Arrangement.Start,
    flingBehavior: FlingBehavior = ScrollableDefaults.flingBehavior(),
    userScrollEnabled: Boolean = true,
    overscrollEffect: OverscrollEffect? = rememberOverscrollEffect(),
    content: LazyGridScope.() -> Unit,
)
```

```kotlin
LazyVerticalGrid(columns = GridCells.Adaptive(minSize = 128.dp)) {
    items(photos) { photo -> PhotoItem(photo) }
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `columns` | `GridCells` | — | `GridCells.Fixed(count)` for a fixed column count, or `GridCells.Adaptive(minSize)` to fit as many columns as possible at or above `minSize`. |
| `modifier` | `Modifier` | `Modifier` | Applied to the layout. |
| `state` | `LazyGridState` | `rememberLazyGridState()` | Controls and observes scroll/item info. |
| `contentPadding` | `PaddingValues` | `PaddingValues(0.dp)` | Padding around content. |
| `reverseLayout` | `Boolean` | `false` | Reverses scroll/layout direction. |
| `verticalArrangement` | `Arrangement.Vertical` | `Arrangement.Top` | Vertical spacing between rows; use `Arrangement.spacedBy(dp)` for gaps. |
| `horizontalArrangement` | `Arrangement.Horizontal` | `Arrangement.Start` | Horizontal spacing between columns. |
| `flingBehavior` | `FlingBehavior` | `ScrollableDefaults.flingBehavior()` | Fling behavior logic. |
| `userScrollEnabled` | `Boolean` | `true` | Whether user gestures can scroll. |
| `overscrollEffect` | `OverscrollEffect?` | `rememberOverscrollEffect()` | Overscroll effect. |
| `content` | `LazyGridScope.() -> Unit` | — | DSL block using `item`/`items` (same shape as `LazyListScope`). |

## Notes

- `LazyHorizontalGrid` is the row-based counterpart: same parameters with `rows: GridCells` instead of `columns`, and swapped arrangement defaults.
- Grid items support `span` (via `LazyGridItemScope`/`LazyGridScope` item configuration) to make an item occupy multiple columns/rows.
- Package: `androidx.compose.foundation.lazy.grid`.

## Related

- [LazyHorizontalGrid](./lazyhorizontalgrid.md)
- [LazyVerticalStaggeredGrid](./lazyverticalstaggeredgrid.md)
- [lazy-list-scope](./lazy-list-scope.md)
