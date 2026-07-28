# detectDragGestures / detectHorizontalDragGestures / detectVerticalDragGestures / detectDragGesturesAfterLongPress

Low-level drag gesture detectors used inside a [pointerInput](./pointer-input.md) block. Report per-frame `PointerInputChange` and drag delta; the caller is responsible for updating any visual offset.

## Signature / Usage

```kotlin
suspend fun PointerInputScope.detectDragGestures(
    onDragStart: (Offset) -> Unit = {},
    onDragEnd: () -> Unit = {},
    onDragCancel: () -> Unit = {},
    onDrag: (change: PointerInputChange, dragAmount: Offset) -> Unit,
)

suspend fun PointerInputScope.detectHorizontalDragGestures(
    onDragStart: (Offset) -> Unit = {},
    onDragEnd: () -> Unit = {},
    onDragCancel: () -> Unit = {},
    onHorizontalDrag: (change: PointerInputChange, dragAmount: Float) -> Unit,
)

suspend fun PointerInputScope.detectVerticalDragGestures(
    onDragStart: (Offset) -> Unit = {},
    onDragEnd: () -> Unit = {},
    onDragCancel: () -> Unit = {},
    onVerticalDrag: (change: PointerInputChange, dragAmount: Float) -> Unit,
)

suspend fun PointerInputScope.detectDragGesturesAfterLongPress(
    onDragStart: (Offset) -> Unit = {},
    onDragEnd: () -> Unit = {},
    onDragCancel: () -> Unit = {},
    onDrag: (change: PointerInputChange, dragAmount: Offset) -> Unit,
)
```

```kotlin
var offsetX by remember { mutableFloatStateOf(0f) }
var offsetY by remember { mutableFloatStateOf(0f) }

Box(
    Modifier
        .offset { IntOffset(offsetX.roundToInt(), offsetY.roundToInt()) }
        .background(Color.Blue)
        .size(50.dp)
        .pointerInput(Unit) {
            detectDragGestures { change, dragAmount ->
                change.consume()
                offsetX += dragAmount.x
                offsetY += dragAmount.y
            }
        }
)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `onDragStart` | `(Offset) -> Unit` | no-op | Called once touch slop is exceeded and the drag begins. |
| `onDragEnd` | `() -> Unit` | no-op | Called when the drag finishes normally. |
| `onDragCancel` | `() -> Unit` | no-op | Called when the drag is cancelled (e.g. gesture consumed elsewhere). |
| `onDrag` / `onHorizontalDrag` / `onVerticalDrag` | `(PointerInputChange, Offset\|Float) -> Unit` | — | Called for each drag movement; call `change.consume()` to claim the event. |

## Notes

- `detectDragGestures` reports 2D `Offset` deltas; `detectHorizontalDragGestures` / `detectVerticalDragGestures` report a single-axis `Float` delta and only trigger once movement along that axis exceeds touch slop.
- `detectDragGesturesAfterLongPress` waits for a long press before starting drag tracking — useful for drag-to-reorder patterns that must not conflict with scrolling.
- For higher-level, single-axis dragging with state management built in, prefer [draggable](./draggable.md) instead of these low-level detectors.
- Package: `androidx.compose.foundation.gestures`.

## Related

- [draggable](./draggable.md)
- [anchored-draggable](./anchored-draggable.md)
- [pointer-input](./pointer-input.md)
