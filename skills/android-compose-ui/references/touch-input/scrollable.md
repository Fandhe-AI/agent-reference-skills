# Modifier.scrollable

Configures low-level touch scrolling and flinging for a UI element in a single orientation. Only detects the gesture and reports deltas via `ScrollableState`; it does not clip content or lay out scrollable children (unlike `verticalScroll`/`horizontalScroll` or `LazyColumn`/`LazyRow`).

## Signature / Usage

```kotlin
fun Modifier.scrollable(
    state: ScrollableState,
    orientation: Orientation,
    enabled: Boolean = true,
    reverseDirection: Boolean = false,
    flingBehavior: FlingBehavior? = null,
    interactionSource: MutableInteractionSource? = null,
): Modifier
```

```kotlin
val scrollState = rememberScrollableState { delta ->
    offset += delta
    delta
}

Box(
    Modifier
        .scrollable(state = scrollState, orientation = Orientation.Vertical)
        .offset { IntOffset(0, offset.roundToInt()) }
)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `state` | `ScrollableState` | — | Reports scroll deltas; typically created with `rememberScrollableState { delta -> ... }`. |
| `orientation` | `Orientation` | — | `Orientation.Horizontal` or `Orientation.Vertical`. |
| `enabled` | `Boolean` | `true` | Whether the scroll gesture is enabled. |
| `reverseDirection` | `Boolean` | `false` | Reverses the sign of reported deltas. |
| `flingBehavior` | `FlingBehavior?` | `null` | Customizes the post-drag fling animation. |
| `interactionSource` | `MutableInteractionSource?` | `null` | Hoisted source for observing drag interactions. |

## Notes

- `ScrollableState` exposes `scroll(scrollPriority, block)` to run a scroll session, `dispatchRawDelta(delta)` for programmatic scrolling, and `canScrollForward` / `canScrollBackward` / `isScrollInProgress` for state inspection.
- An overload adds `overscrollEffect: OverscrollEffect?` and `bringIntoViewSpec: BringIntoViewSpec?` parameters (inserted after `orientation`) for overscroll visuals and custom bring-into-view behavior.
- Similar to [draggable](./draggable.md) — it only detects gestures; combine with [nestedScroll](./nested-scroll.md) to coordinate scrolling across parent/child containers (e.g. pull-to-refresh, collapsing toolbars).
- Package: `androidx.compose.foundation.gestures`.

## Related

- [nested-scroll](./nested-scroll.md)
- [draggable](./draggable.md)
