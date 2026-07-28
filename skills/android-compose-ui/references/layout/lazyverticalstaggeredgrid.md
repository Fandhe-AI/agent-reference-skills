# LazyVerticalStaggeredGrid

A lazy vertical staggered grid that allows items of varying heights within each column, composing and laying out only visible items.

## Signature / Usage

```kotlin
@Composable
public fun LazyVerticalStaggeredGrid(
    columns: StaggeredGridCells,
    modifier: Modifier = Modifier,
    state: LazyStaggeredGridState = rememberLazyStaggeredGridState(),
    contentPadding: PaddingValues = PaddingValues(0.dp),
    reverseLayout: Boolean = false,
    verticalItemSpacing: Dp = 0.dp,
    horizontalArrangement: Arrangement.Horizontal = Arrangement.spacedBy(0.dp),
    flingBehavior: FlingBehavior = ScrollableDefaults.flingBehavior(),
    userScrollEnabled: Boolean = true,
    overscrollEffect: OverscrollEffect? = rememberOverscrollEffect(),
    content: LazyStaggeredGridScope.() -> Unit,
)
```

```kotlin
LazyVerticalStaggeredGrid(
    columns = StaggeredGridCells.Adaptive(200.dp),
    verticalItemSpacing = 4.dp,
    horizontalArrangement = Arrangement.spacedBy(4.dp),
) {
    items(randomSizedPhotos) { photo ->
        AsyncImage(model = photo, modifier = Modifier.fillMaxWidth().wrapContentHeight())
    }
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `columns` | `StaggeredGridCells` | — | `StaggeredGridCells.Fixed(count)` or `StaggeredGridCells.Adaptive(minSize)`. |
| `modifier` | `Modifier` | `Modifier` | Applied to the layout. |
| `state` | `LazyStaggeredGridState` | `rememberLazyStaggeredGridState()` | Controls and observes scroll/item info. |
| `contentPadding` | `PaddingValues` | `PaddingValues(0.dp)` | Padding around content. |
| `reverseLayout` | `Boolean` | `false` | Reverses scroll/layout direction. |
| `verticalItemSpacing` | `Dp` | `0.dp` | Vertical gap between items within a column/lane. |
| `horizontalArrangement` | `Arrangement.Horizontal` | `Arrangement.spacedBy(0.dp)` | Horizontal spacing between lanes. |
| `flingBehavior` | `FlingBehavior` | `ScrollableDefaults.flingBehavior()` | Fling behavior logic. |
| `userScrollEnabled` | `Boolean` | `true` | Whether user gestures can scroll. |
| `overscrollEffect` | `OverscrollEffect?` | `rememberOverscrollEffect()` | Overscroll effect. |
| `content` | `LazyStaggeredGridScope.() -> Unit` | — | DSL block (same shape as `LazyListScope`). |

## Notes

- A `LazyHorizontalStaggeredGrid` counterpart exists with `rows: StaggeredGridCells` and swapped spacing/arrangement parameters.
- Item child size along the main axis should not depend on the grid's own measured size to avoid layout cycles; typical items use `fillMaxWidth().wrapContentHeight()`.
- Package: `androidx.compose.foundation.lazy.staggeredgrid`.

## Related

- [LazyVerticalGrid](./lazyverticalgrid.md)
- [lazy-list-scope](./lazy-list-scope.md)
