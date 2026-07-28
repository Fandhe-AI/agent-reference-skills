# AlertDialog

Material Design themed dialog that provides important prompts in a user flow, with predefined slots for icon, title, text, and buttons.

## Signature / Usage

```kotlin
@Composable
fun AlertDialog(
    onDismissRequest: () -> Unit,
    confirmButton: @Composable () -> Unit,
    modifier: Modifier = Modifier,
    dismissButton: @Composable (() -> Unit)? = null,
    icon: @Composable (() -> Unit)? = null,
    title: @Composable (() -> Unit)? = null,
    text: @Composable (() -> Unit)? = null,
    shape: Shape = AlertDialogDefaults.shape,
    containerColor: Color = AlertDialogDefaults.containerColor,
    iconContentColor: Color = AlertDialogDefaults.iconContentColor,
    titleContentColor: Color = AlertDialogDefaults.titleContentColor,
    textContentColor: Color = AlertDialogDefaults.textContentColor,
    tonalElevation: Dp = AlertDialogDefaults.TonalElevation,
    properties: DialogProperties = DialogProperties(),
)
```

```kotlin
AlertDialog(
    icon = { Icon(Icons.Default.Info, contentDescription = null) },
    title = { Text("Title") },
    text = { Text("Message body") },
    onDismissRequest = { /* dismiss */ },
    confirmButton = {
        TextButton(onClick = { /* confirm */ }) { Text("Confirm") }
    },
    dismissButton = {
        TextButton(onClick = { /* dismiss */ }) { Text("Dismiss") }
    }
)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `onDismissRequest` | `() -> Unit` | — | Called when the user dismisses the dialog (outside click, back). |
| `confirmButton` | `@Composable () -> Unit` | — | Primary action button, typically a `TextButton`. |
| `modifier` | `Modifier` | `Modifier` | Applied to the dialog container. |
| `dismissButton` | `@Composable (() -> Unit)?` | `null` | Secondary action button. |
| `icon` | `@Composable (() -> Unit)?` | `null` | Icon shown at the top of the dialog. |
| `title` | `@Composable (() -> Unit)?` | `null` | Title text. |
| `text` | `@Composable (() -> Unit)?` | `null` | Centered body text. |
| `shape` | `Shape` | `AlertDialogDefaults.shape` | Shape of the dialog container. |
| `containerColor` | `Color` | `AlertDialogDefaults.containerColor` | Background color. |
| `iconContentColor` | `Color` | `AlertDialogDefaults.iconContentColor` | Icon tint. |
| `titleContentColor` | `Color` | `AlertDialogDefaults.titleContentColor` | Title text color. |
| `textContentColor` | `Color` | `AlertDialogDefaults.textContentColor` | Body text color. |
| `tonalElevation` | `Dp` | `AlertDialogDefaults.TonalElevation` | Tonal elevation overlay. |
| `properties` | `DialogProperties` | `DialogProperties()` | Platform dialog properties (e.g. dismiss-on-back). |

## Notes

- `BasicAlertDialog(onDismissRequest, modifier, properties, content: @Composable () -> Unit)` is the unstyled counterpart: it enforces only the Material minimum dialog width (280-560dp) and lets the caller supply fully custom content instead of the title/text/button slots.
- Package: `androidx.compose.material3`. The generic, unstyled `Dialog` composable (no predefined slots) lives in `androidx.compose.ui.window` — see [Dialog](./dialog.md).

## Related

- [Dialog](./dialog.md)
