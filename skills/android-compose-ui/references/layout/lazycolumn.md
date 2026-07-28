# LazyColumn

The vertically scrolling list that only composes and lays out currently visible items, following the same efficiency principles as `RecyclerView`.

## Signature / Usage

```kotlin
@Composable
public fun LazyColumn(
    modifier: Modifier = Modifier,
    state: LazyListState = rememberLazyListState(),
    contentPadding: PaddingValues = PaddingValues(0.dp),
    reverseLayout: Boolean = false,
    verticalArrangement: Arrangement.Vertical =
        if (!reverseLayout) Arrangement.Top else Arrangement.Bottom,
    horizontalAlignment: Alignment.Horizontal = Alignment.Start,
    flingBehavior: FlingBehavior = ScrollableDefaults.flingBehavior(),
    userScrollEnabled: Boolean = true,
    overscrollEffect: OverscrollEffect? = rememberOverscrollEffect(),
    content: LazyListScope.() -> Unit,
)
```

```kotlin
LazyColumn {
    items(messages, key = { it.id }) { message ->
        MessageRow(message)
    }
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `modifier` | `Modifier` | `Modifier` | Applied to the layout. |
| `state` | `LazyListState` | `rememberLazyListState()` | Controls and observes scrolling/item info. |
| `contentPadding` | `PaddingValues` | `PaddingValues(0.dp)` | Padding around the content; first item gets top padding, last gets bottom padding. |
| `reverseLayout` | `Boolean` | `false` | Reverses the direction of scrolling and layout. |
| `verticalArrangement` | `Arrangement.Vertical` | `Arrangement.Top` (or `Bottom` if reversed) | Arrangement of items when content is shorter than the viewport. |
| `horizontalAlignment` | `Alignment.Horizontal` | `Alignment.Start` | Horizontal alignment of items. |
| `flingBehavior` | `FlingBehavior` | `ScrollableDefaults.flingBehavior()` | Logic describing fling behavior. |
| `userScrollEnabled` | `Boolean` | `true` | Whether user gestures can scroll the list (programmatic scroll still works). |
| `overscrollEffect` | `OverscrollEffect?` | `rememberOverscrollEffect()` | Overscroll effect shown when scrolling past bounds. |
| `content` | `LazyListScope.() -> Unit` | — | DSL block using `item`/`items`/`itemsIndexed`/`stickyHeader`. |

## Notes

- Avoid nesting two same-direction scrollables (e.g. `LazyColumn` inside another vertically scrolling container); use a single `LazyColumn` with multiple item types instead.
- Provide stable `key` values (Bundle-compatible: primitives, enums, `Parcelable`) so state and `Modifier.animateItem()` survive reordering.
- Use `contentType` to maximize composition reuse across heterogeneous item shapes.
- Package: `androidx.compose.foundation.lazy`.

## Related

- [LazyRow](./lazyrow.md)
- [lazy-list-scope](./lazy-list-scope.md)
- [rememberLazyListState](./rememberlazyliststate.md)
