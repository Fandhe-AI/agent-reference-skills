# Modifier.dragAndDropSource / dragAndDropTarget

OS-level drag-and-drop built on the platform `DragEvent`/`ClipData` mechanism, interoperable with Android View drag-and-drop and able to cross app boundaries. Distinct from in-app gesture detection (`draggable`, `detectDragGestures`), which never touches the system drag-and-drop pipeline.

## Signature / Usage

```kotlin
fun Modifier.dragAndDropSource(
    transferData: (Offset) -> DragAndDropTransferData?
): Modifier

// overload with a custom drag shadow
fun Modifier.dragAndDropSource(
    drawDragDecoration: DrawScope.() -> Unit,
    transferData: (Offset) -> DragAndDropTransferData?,
): Modifier

fun Modifier.dragAndDropTarget(
    shouldStartDragAndDrop: (startEvent: DragAndDropEvent) -> Boolean,
    target: DragAndDropTarget,
): Modifier
```

```kotlin
// Source: start a drag carrying plain text
Text(
    modifier = Modifier.dragAndDropSource { _ ->
        DragAndDropTransferData(ClipData.newPlainText("label", "dragged value"))
    },
    text = "Drag me",
)

// Target: accept plain-text drops
val callback = remember {
    object : DragAndDropTarget {
        override fun onDrop(event: DragAndDropEvent): Boolean {
            // read event.toAndroidDragEvent().clipData
            return true
        }
    }
}

Box(
    modifier = Modifier.dragAndDropTarget(
        shouldStartDragAndDrop = { it.mimeTypes().contains(ClipDescription.MIMETYPE_TEXT_PLAIN) },
        target = callback,
    )
)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `transferData` | `(Offset) -> DragAndDropTransferData?` | — | Called with the current drag offset; returns the payload to transfer, or `null` to abort the start of the transfer. |
| `drawDragDecoration` | `DrawScope.() -> Unit` | (default shadow) | Overload param; draws a custom drag shadow instead of the default snapshot of the source composable. |
| `shouldStartDragAndDrop` | `(startEvent: DragAndDropEvent) -> Boolean` | — | Inspects the starting event (e.g. its MIME types) to decide whether this target participates in the session. |
| `target` | `DragAndDropTarget` | — | Remembered callback object receiving lifecycle events for the session. |

`DragAndDropTarget` callback methods (all but `onDrop` have no-op defaults): `onStarted`, `onEntered`, `onMoved`, `onExited`, `onChanged`, `onEnded`, `onDrop` (returns `Boolean`: `true` consumes the event, `false` lets it propagate to a parent target).

## Notes

- `dragAndDropSource` starts the transfer on a long-press by default (its internal gesture detector calls `requestDragAndDropTransfer` from `onLongPress`); there is no public parameter to swap the trigger gesture.
- `DragAndDropTransferData(clipData: ClipData, localState: Any? = null, flags: Int = 0)` (Android actual) wraps the payload as a `ClipData`; pass `flags = View.DRAG_FLAG_GLOBAL` to allow the drag to be dropped into other apps, and an optional `localState` for same-process bookkeeping (see `View.startDragAndDrop`).
- To accept a drop originating from another app, call `activity.requestDragAndDropPermissions(event.toAndroidDragEvent())` inside `onDrop`, then `release()` the returned permission when done.
- `event.toAndroidDragEvent()` converts the Compose `DragAndDropEvent` to a platform `android.view.DragEvent` for interop with View-based APIs; `event.mimeTypes()` reads the MIME types from the event's `ClipDescription`.
- This is unrelated to `Modifier.draggable`/`detectDragGestures` (in-app pixel-offset dragging, no `ClipData`/system involvement); use `dragAndDropSource`/`dragAndDropTarget` only when the data must be recognized by the system drag-and-drop pipeline (e.g. drag out to another app, or accept drags from outside the app).
- Package: `androidx.compose.foundation.draganddrop` (modifiers), `androidx.compose.ui.draganddrop` (`DragAndDropTarget`, `DragAndDropEvent`, `DragAndDropTransferData`).

## Related

- [draggable](./draggable.md)
- [detect-drag-gestures](./detect-drag-gestures.md)
