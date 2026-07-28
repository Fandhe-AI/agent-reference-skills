# verticalScroll / horizontalScroll / rememberScrollState / nestedScroll

Modifiers that make content scrollable when it exceeds its constraints, for the common case of a small, non-lazy amount of content.

## Signature / Usage

```kotlin
public fun Modifier.verticalScroll(
    state: ScrollState,
    enabled: Boolean = true,
    flingBehavior: FlingBehavior? = null,
    reverseScrolling: Boolean = false,
): Modifier

public fun Modifier.horizontalScroll(
    state: ScrollState,
    enabled: Boolean = true,
    flingBehavior: FlingBehavior? = null,
    reverseScrolling: Boolean = false,
): Modifier

@Composable
public fun rememberScrollState(initial: Int = 0): ScrollState
```

```kotlin
Column(
    modifier = Modifier
        .background(Color.LightGray)
        .size(100.dp)
        .verticalScroll(rememberScrollState())
) {
    repeat(10) { Text("Item $it", Modifier.padding(2.dp)) }
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `state` | `ScrollState` | — | From `rememberScrollState()`; holds/controls scroll offset. |
| `enabled` | `Boolean` | `true` | Whether scroll gestures are enabled. |
| `flingBehavior` | `FlingBehavior?` | `null` | Custom fling behavior; `null` uses the default. |
| `reverseScrolling` | `Boolean` | `false` | Reverses the direction content is scrolled. |
| `initial` (rememberScrollState) | `Int` | `0` | Initial scroll offset in pixels. |

## Notes

- For lists of items, use `LazyColumn`/`LazyRow` instead — they compose only visible items, while `verticalScroll`/`horizontalScroll` compose all content up front.
- `ScrollState.animateScrollTo(value)` animates to a pixel offset; use inside `LaunchedEffect` or a coroutine scope.
- `Modifier.nestedScroll(connection, dispatcher = ...)` lets a scrollable participate in nested-scroll coordination (e.g. a collapsing top bar consuming scroll before an inner `LazyColumn`).
- Lower-level `Modifier.scrollable(state, orientation, ...)` detects gestures and reports deltas without applying offset automatically; requires implementing `ScrollableState`.
- Package: `androidx.compose.foundation`.

## Related

- [LazyColumn](./lazycolumn.md)
- [Column](./column.md)
