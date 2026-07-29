# VerticalDragHandle

A standalone, capsule-shaped drag handle used to let the user resize or reposition a component by dragging, most commonly for pane expansion when a screen is split into multiple panes. A vertically oriented handle conveys horizontal drag motion.

## Signature / Usage

```kotlin
@Composable
fun VerticalDragHandle(
    modifier: Modifier = Modifier,
    sizes: DragHandleSizes = VerticalDragHandleDefaults.sizes(),
    colors: DragHandleColors = VerticalDragHandleDefaults.colors(),
    shapes: DragHandleShapes = VerticalDragHandleDefaults.shapes(),
    interactionSource: MutableInteractionSource? = null,
)
```

```kotlin
VerticalDragHandle(
    modifier = Modifier.draggable(
        orientation = Orientation.Horizontal,
        state = rememberDraggableState { delta -> /* update pane split */ }
    )
)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `modifier` | `Modifier` | `Modifier` | Applied to the drag handle; the actual drag gesture handling (e.g. `Modifier.draggable`) is supplied by the caller. |
| `sizes` | `DragHandleSizes` | `VerticalDragHandleDefaults.sizes()` | Resting/pressed/dragged sizes of the handle. |
| `colors` | `DragHandleColors` | `VerticalDragHandleDefaults.colors()` | Resting/pressed/dragged colors of the handle. |
| `shapes` | `DragHandleShapes` | `VerticalDragHandleDefaults.shapes()` | Resting/pressed/dragged shapes of the handle. |
| `interactionSource` | `MutableInteractionSource?` | `null` | Optional hoisted source for observing/emitting interactions; if `null`, interactions still happen internally. |

## Notes

- This is a standalone `androidx.compose.material3.DragHandle.kt` composable, distinct from `BottomSheetDefaults.DragHandle()` used inline as the default `dragHandle`/`sheetDragHandle` slot of ModalBottomSheet and BottomSheetScaffold — it is not a bottom-sheet handle but a general-purpose, draggable-pane divider handle.
- Does not perform any layout resizing itself; wire actual drag behavior (e.g. `Modifier.draggable`) onto `modifier`.
- Package: `androidx.compose.material3`.

## Related

- [ModalBottomSheet](./modalbottomsheet.md)
- [BottomSheetScaffold](./bottomsheetscaffold.md)
