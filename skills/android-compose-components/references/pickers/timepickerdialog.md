# TimePickerDialog

Dialog container for hosting a `TimePicker` or `TimeInput`, providing title, confirm/dismiss buttons, and an optional mode-toggle button.

## Signature / Usage

```kotlin
@Composable
public fun TimePickerDialog(
    onDismissRequest: () -> Unit,
    confirmButton: @Composable () -> Unit,
    title: @Composable () -> Unit,
    modifier: Modifier = Modifier,
    properties: DialogProperties = DialogProperties(usePlatformDefaultWidth = false),
    modeToggleButton: @Composable (() -> Unit)? = null,
    dismissButton: @Composable (() -> Unit)? = null,
    shape: Shape = TimePickerDialogDefaults.shape,
    containerColor: Color = TimePickerDialogDefaults.containerColor,
    content: @Composable ColumnScope.() -> Unit,
)
```

```kotlin
val timePickerState = rememberTimePickerState(is24Hour = true)

TimePickerDialog(
    onDismissRequest = onDismiss,
    title = { Text("Select Time") },
    confirmButton = {
        TextButton(onClick = { onConfirm(timePickerState) }) { Text("OK") }
    },
    dismissButton = {
        TextButton(onClick = onDismiss) { Text("Cancel") }
    }
) {
    TimePicker(state = timePickerState)
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `onDismissRequest` | `() -> Unit` | — | Called when the dialog should be dismissed. |
| `confirmButton` | `@Composable () -> Unit` | — | Confirm action button. |
| `title` | `@Composable () -> Unit` | — | Dialog title. |
| `modifier` | `Modifier` | `Modifier` | Applied to the dialog surface. |
| `properties` | `DialogProperties` | `DialogProperties(usePlatformDefaultWidth = false)` | Platform dialog window properties. |
| `modeToggleButton` | `@Composable (() -> Unit)?` | `null` | Optional button to switch between `TimePicker` (dial) and `TimeInput` (keyboard) content. |
| `dismissButton` | `@Composable (() -> Unit)?` | `null` | Optional cancel/dismiss action button. |
| `shape` | `Shape` | `TimePickerDialogDefaults.shape` | Shape of the dialog surface. |
| `containerColor` | `Color` | `TimePickerDialogDefaults.containerColor` | Background color of the dialog surface. |
| `content` | `@Composable ColumnScope.() -> Unit` | — | The `TimePicker` or `TimeInput` hosted inside the dialog. |

## Notes

- Experimental API (`@ExperimentalMaterial3Api`).
- Use `modeToggleButton` with a toggling `IconButton` to switch `content` between `TimePicker` and `TimeInput` while sharing one `TimePickerState`.
- Package: `androidx.compose.material3`.

## Related

- [TimePicker](./timepicker.md)
- [TimeInput](./timeinput.md)
