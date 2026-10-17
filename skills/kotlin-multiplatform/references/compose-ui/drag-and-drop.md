---
source: https://kotlinlang.org/docs/multiplatform/compose-drag-drop.html
---

# Drag-and-drop operations

Accept data dragged into the app from other applications, or let users drag data out, using the `dragAndDropSource` and `dragAndDropTarget` modifiers.

## Signature / Usage

Drag source (desktop example, abridged from the source):

```kotlin
Box(Modifier
    .size(200.dp)
    .background(Color.LightGray)
    .dragAndDropSource(
        drawDragDecoration = { /* draws the visual representation */ }
    ) { offset ->
        DragAndDropTransferData(
            transferable = DragAndDropTransferable(
                StringSelection(exportedText)
            ),
            supportedActions = listOf(
                DragAndDropTransferAction.Copy,
                DragAndDropTransferAction.Move,
                DragAndDropTransferAction.Link,
            ),
            dragDecorationOffset = offset,
            onTransferCompleted = { action ->
                println("Action at the source: $action")
            }
        )
    }
) {
    Text("Drag me", Modifier.align(Alignment.Center))
}
```

Drop target: create and `remember` a `DragAndDropTarget` overriding the events you handle (`onStarted`, `onEnded`, `onDrop` in the example), then apply `dragAndDropTarget`:

```kotlin
val dragAndDropTarget = remember {
    object: DragAndDropTarget {
        override fun onStarted(event: DragAndDropEvent) {
            showTargetBorder = true
        }

        override fun onEnded(event: DragAndDropEvent) {
            showTargetBorder = false
        }

        override fun onDrop(event: DragAndDropEvent): Boolean {
            println("Action at the target: ${event.action}")
            /* ... */
            return result
        }
    }
}

Box(Modifier
    .dragAndDropTarget(
        // With "true" as the value of shouldStartDragAndDrop,
        // drag-and-drop operations are enabled unconditionally.
        shouldStartDragAndDrop = { true },
        target = dragAndDropTarget
    )
) {
    Text(targetText, Modifier.align(Alignment.Center))
}
```

Platform-specific data wrapping (the modifiers are common API, the transferred data types are not):

| Platform | Wrap data in | Source snippet |
| --- | --- | --- |
| Android | `ClipData` | `DragAndDropTransferData(ClipData.newPlainText("text", text))` |
| iOS | UIKit `UIDragItem` | `DragAndDropTransferData(listOf(UIDragItem.fromString(text)))` |
| Desktop | AWT `datatransfer.Transferable` | `DragAndDropTransferData(transferable = DragAndDropTransferable(StringSelection(text)))` |
| Web | `DataTransfer` | `createDataTransfer()` then `setData("text/plain", text)`, passed to `DragAndDropTransferData(dataTransfer)` |

## Notes

- Experimental: both `dragAndDropSource` and `dragAndDropTarget` are experimental, subject to change, and require an opt-in annotation.
- Source steps: apply `dragAndDropSource`; optionally add `drawDragDecoration`; return a `DragAndDropTransferData` describing data, supported actions and completion handling. For the target, `shouldStartDragAndDrop` decides whether the target accepts the session.
- Distance line: the common drag-and-drop modifiers are documented by android-compose-ui (Jetpack Compose side); this page covers the platform data wrapping differences. `UIDragItem` itself belongs to apple-uikit.

## Related

- [Working with modifiers](./layout-modifiers.md)
