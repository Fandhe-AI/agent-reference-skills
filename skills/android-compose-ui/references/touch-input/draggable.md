# Modifier.draggable

High-level entry point for single-orientation drag gestures. Only detects the gesture and reports pixel deltas via `DraggableState` — the caller must apply the resulting offset (e.g. with `Modifier.offset`).

## Signature / Usage

```kotlin
fun Modifier.draggable(
    state: DraggableState,
    orientation: Orientation,
    enabled: Boolean = true,
    interactionSource: MutableInteractionSource? = null,
    startDragImmediately: Boolean = false,
    onDragStarted: suspend CoroutineScope.(startedPosition: Offset) -> Unit = {},
    onDragStopped: suspend CoroutineScope.(velocity: Float) -> Unit = {},
    reverseDirection: Boolean = false,
): Modifier

@Composable
fun rememberDraggableState(onDelta: (Float) -> Unit): DraggableState
```

```kotlin
var offsetX by remember { mutableFloatStateOf(0f) }
Text(
    modifier = Modifier
        .offset { IntOffset(offsetX.roundToInt(), 0) }
        .draggable(
            orientation = Orientation.Horizontal,
            state = rememberDraggableState { delta -> offsetX += delta },
        ),
    text = "Drag me!",
)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `state` | `DraggableState` | — | Reports drag deltas; typically created with `rememberDraggableState { delta -> ... }`. |
| `orientation` | `Orientation` | — | `Orientation.Horizontal` or `Orientation.Vertical`. |
| `enabled` | `Boolean` | `true` | Whether the drag gesture is enabled. |
| `interactionSource` | `MutableInteractionSource?` | `null` | Hoisted source for observing `DragInteraction`s. |
| `startDragImmediately` | `Boolean` | `false` | When `true`, starts a new drag session immediately even mid-animation, cancelling any in-progress fling/animation. |
| `onDragStarted` | `suspend CoroutineScope.(startedPosition: Offset) -> Unit` | no-op | Called when the drag starts. |
| `onDragStopped` | `suspend CoroutineScope.(velocity: Float) -> Unit` | no-op | Called with the final fling velocity when the drag ends. |
| `reverseDirection` | `Boolean` | `false` | Reverses the sign of reported deltas. |

## Notes

- `DraggableState` (also constructible via the top-level `DraggableState(onDelta: (Float) -> Unit)` factory) exposes `drag { ... }` for granular control and `dispatchRawDelta(delta)` for programmatic drags.
- Only single-axis; for gestures that both drag and snap to predefined states, use [anchoredDraggable](./anchored-draggable.md). For full 2D or multi-pointer control, use `pointerInput` + [detectDragGestures](./detect-drag-gestures.md).
- Package: `androidx.compose.foundation.gestures`.

## Related

- [anchored-draggable](./anchored-draggable.md)
- [detect-drag-gestures](./detect-drag-gestures.md)
- [scrollable](./scrollable.md)
