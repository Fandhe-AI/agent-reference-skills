# BottomSheetScaffold

Standard bottom sheet that co-exists with the screen's main UI region, allowing simultaneous viewing and interaction with both.

## Signature / Usage

```kotlin
@Composable
@ExperimentalMaterial3Api
fun BottomSheetScaffold(
    sheetContent: @Composable ColumnScope.() -> Unit,
    modifier: Modifier = Modifier,
    scaffoldState: BottomSheetScaffoldState = rememberBottomSheetScaffoldState(),
    sheetPeekHeight: Dp = BottomSheetDefaults.SheetPeekHeight,
    sheetMaxWidth: Dp = BottomSheetDefaults.SheetMaxWidth,
    sheetShape: Shape = BottomSheetDefaults.ExpandedShape,
    sheetContainerColor: Color = BottomSheetDefaults.ContainerColor,
    sheetContentColor: Color = contentColorFor(sheetContainerColor),
    sheetTonalElevation: Dp = 0.dp,
    sheetShadowElevation: Dp = BottomSheetDefaults.Elevation,
    sheetDragHandle: @Composable (() -> Unit)? = { BottomSheetDefaults.DragHandle() },
    sheetSwipeEnabled: Boolean = true,
    topBar: @Composable (() -> Unit)? = null,
    snackbarHost: @Composable (SnackbarHostState) -> Unit = { SnackbarHost(it) },
    containerColor: Color = MaterialTheme.colorScheme.surface,
    contentColor: Color = contentColorFor(containerColor),
    content: @Composable (PaddingValues) -> Unit,
)
```

```kotlin
BottomSheetScaffold(
    sheetContent = { Text("Sheet content", modifier = Modifier.padding(16.dp)) },
    sheetPeekHeight = 128.dp
) { innerPadding ->
    Text("Screen content", modifier = Modifier.padding(innerPadding))
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `sheetContent` | `@Composable ColumnScope.() -> Unit` | — | Content of the persistent sheet. |
| `modifier` | `Modifier` | `Modifier` | Applied to the root layout. |
| `scaffoldState` | `BottomSheetScaffoldState` | `rememberBottomSheetScaffoldState()` | Holds sheet and snackbar host states. |
| `sheetPeekHeight` | `Dp` | `BottomSheetDefaults.SheetPeekHeight` | Height of the sheet when collapsed/peeking. |
| `sheetMaxWidth` | `Dp` | `BottomSheetDefaults.SheetMaxWidth` | Maximum width of the sheet. |
| `sheetShape` | `Shape` | `BottomSheetDefaults.ExpandedShape` | Shape of the sheet container. |
| `sheetContainerColor` | `Color` | `BottomSheetDefaults.ContainerColor` | Background color of the sheet. |
| `sheetContentColor` | `Color` | `contentColorFor(sheetContainerColor)` | Preferred sheet content color. |
| `sheetTonalElevation` | `Dp` | `0.dp` | Tonal elevation overlay of the sheet. |
| `sheetShadowElevation` | `Dp` | `BottomSheetDefaults.Elevation` | Shadow elevation of the sheet. |
| `sheetDragHandle` | `@Composable (() -> Unit)?` | `{ BottomSheetDefaults.DragHandle() }` | Optional drag handle shown at the top of the sheet. |
| `sheetSwipeEnabled` | `Boolean` | `true` | Whether the sheet responds to swipe gestures. |
| `topBar` | `@Composable (() -> Unit)?` | `null` | App bar shown above the content. |
| `snackbarHost` | `@Composable (SnackbarHostState) -> Unit` | `{ SnackbarHost(it) }` | Slot for displaying snackbar messages. |
| `containerColor` | `Color` | `MaterialTheme.colorScheme.surface` | Background color of the main content area. |
| `contentColor` | `Color` | `contentColorFor(containerColor)` | Default content color of the main content area. |
| `content` | `@Composable (PaddingValues) -> Unit` | — | Main screen content; must apply the received `PaddingValues`. |

## Notes

- Experimental API (`@ExperimentalMaterial3Api`).
- Unlike `ModalBottomSheet`, the sheet always occupies layout space (via `sheetPeekHeight`) rather than overlaying content with a scrim.
- Package: `androidx.compose.material3`.

## Related

- [ModalBottomSheet](./modalbottomsheet.md)
- [Scaffold](./scaffold.md)
