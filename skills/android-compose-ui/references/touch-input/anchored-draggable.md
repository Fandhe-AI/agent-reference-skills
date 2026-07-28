# Modifier.anchoredDraggable

Enables drag gestures between a predefined set of anchor points (values), with automatic settle/fling animation to the nearest anchor on release. The modern replacement for the deprecated Material `swipeable` modifier (replaced starting Compose Foundation 1.6.0-alpha01); commonly used for swipe-to-dismiss and expandable sheets.

## Signature / Usage

```kotlin
fun <T> Modifier.anchoredDraggable(
    state: AnchoredDraggableState<T>,
    orientation: Orientation,
    enabled: Boolean = true,
    interactionSource: MutableInteractionSource? = null,
    overscrollEffect: OverscrollEffect? = null,
    flingBehavior: FlingBehavior? = null,
): Modifier
```

```kotlin
val density = LocalDensity.current
val state = remember {
    AnchoredDraggableState(initialValue = DragValue.Start)
}
SideEffect {
    state.updateAnchors(
        DraggableAnchors {
            DragValue.Start at 0f
            DragValue.End at 300f
        }
    )
}

Box(
    Modifier
        .anchoredDraggable(state = state, orientation = Orientation.Horizontal)
        .offset { IntOffset(state.requireOffset().roundToInt(), 0) }
)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `state` | `AnchoredDraggableState<T>` | — | Holds the anchors, current/target value, and offset. |
| `orientation` | `Orientation` | — | `Orientation.Horizontal` or `Orientation.Vertical`. |
| `enabled` | `Boolean` | `true` | Whether the drag gesture is enabled. |
| `interactionSource` | `MutableInteractionSource?` | `null` | Hoisted source for observing `DragInteraction`s. |
| `overscrollEffect` | `OverscrollEffect?` | `null` | Optional overscroll visual effect applied past the outermost anchors. |
| `flingBehavior` | `FlingBehavior?` | `null` | Customizes the fling-to-anchor animation. |

## Notes

- An overload adds an explicit `reverseDirection: Boolean` parameter before `orientation` when RTL/manual direction control is needed.
- `AnchoredDraggableState<T>` does not move the element automatically; read `state.requireOffset()` (or `state.offset`) and apply it via `Modifier.offset`.
- The legacy `Modifier.swipeable` (with `SwipeableState`, `rememberSwipeableState`, `FixedThreshold` / `FractionalThreshold`) is deprecated in favor of this modifier; avoid it in new code.
- Package: `androidx.compose.foundation.gestures`.

## Related

- [draggable](./draggable.md)
- [detect-drag-gestures](./detect-drag-gestures.md)
