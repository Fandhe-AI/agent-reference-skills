# ModalBottomSheet

Modal bottom sheet that appears above app content, disabling other functionality until dismissed, for lengthy action lists or descriptions.

## Signature / Usage

```kotlin
@Composable
@ExperimentalMaterial3Api
fun ModalBottomSheet(
    onDismissRequest: () -> Unit,
    modifier: Modifier = Modifier,
    sheetState: SheetState = rememberBottomSheetState(initialValue = Hidden),
    sheetMaxWidth: Dp = BottomSheetDefaults.SheetMaxWidth,
    sheetGesturesEnabled: Boolean = true,
    shape: Shape = BottomSheetDefaults.ExpandedShape,
    containerColor: Color = BottomSheetDefaults.ContainerColor,
    contentColor: Color = contentColorFor(containerColor),
    tonalElevation: Dp = 0.dp,
    scrimColor: Color = BottomSheetDefaults.ScrimColor,
    dragHandle: @Composable (() -> Unit)? = { BottomSheetDefaults.DragHandle() },
    contentWindowInsets: @Composable () -> WindowInsets = { BottomSheetDefaults.modalWindowInsets },
    properties: ModalBottomSheetProperties = ModalBottomSheetProperties(),
    content: @Composable ColumnScope.() -> Unit,
)
```

```kotlin
var showBottomSheet by remember { mutableStateOf(false) }
val sheetState = rememberBottomSheetState(initialValue = SheetValue.Hidden)

if (showBottomSheet) {
    ModalBottomSheet(
        onDismissRequest = { showBottomSheet = false },
        sheetState = sheetState
    ) {
        Text("Sheet content")
    }
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `onDismissRequest` | `() -> Unit` | — | Called when the user dismisses the sheet (scrim tap, swipe down, back). |
| `modifier` | `Modifier` | `Modifier` | Applied to the sheet container. |
| `sheetState` | `SheetState` | `rememberBottomSheetState(initialValue = Hidden)` | Controls and observes the sheet's visibility/expansion. |
| `sheetMaxWidth` | `Dp` | `BottomSheetDefaults.SheetMaxWidth` | Maximum width of the sheet. |
| `sheetGesturesEnabled` | `Boolean` | `true` | Whether the sheet responds to drag gestures. |
| `shape` | `Shape` | `BottomSheetDefaults.ExpandedShape` | Shape of the sheet container. |
| `containerColor` | `Color` | `BottomSheetDefaults.ContainerColor` | Background color of the sheet. |
| `contentColor` | `Color` | `contentColorFor(containerColor)` | Preferred content color. |
| `tonalElevation` | `Dp` | `0.dp` | Tonal elevation overlay. |
| `scrimColor` | `Color` | `BottomSheetDefaults.ScrimColor` | Color of the scrim behind the sheet. |
| `dragHandle` | `@Composable (() -> Unit)?` | `{ BottomSheetDefaults.DragHandle() }` | Optional drag handle shown at the top of the sheet. |
| `contentWindowInsets` | `@Composable () -> WindowInsets` | `{ BottomSheetDefaults.modalWindowInsets }` | Window insets applied to the sheet. |
| `properties` | `ModalBottomSheetProperties` | `ModalBottomSheetProperties()` | Platform dialog properties. |
| `content` | `@Composable ColumnScope.() -> Unit` | — | Sheet content, laid out in a `Column`. |

## Notes

- Experimental API (`@ExperimentalMaterial3Api`).
- `rememberModalBottomSheetState(skipPartiallyExpanded, confirmValueChange)` is deprecated in favor of `rememberBottomSheetState(initialValue = Hidden)`; both create the `SheetState` passed to `sheetState`.
- Use `sheetState.show()` / `sheetState.hide()` (suspend, via `rememberCoroutineScope`) to control visibility programmatically; remove the composable from composition once `isVisible` becomes `false`.
- Package: `androidx.compose.material3`.

## Related

- [BottomSheetScaffold](./bottomsheetscaffold.md)
