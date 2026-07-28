# DatePickerDialog

Dialog container for hosting a `DatePicker` or `DateRangePicker`, providing confirm/dismiss buttons.

## Signature / Usage

```kotlin
@Composable
public expect fun DatePickerDialog(
    onDismissRequest: () -> Unit,
    confirmButton: @Composable () -> Unit,
    modifier: Modifier = Modifier,
    dismissButton: @Composable (() -> Unit)? = null,
    shape: Shape = DatePickerDefaults.shape,
    tonalElevation: Dp = DatePickerDefaults.TonalElevation,
    colors: DatePickerColors = DatePickerDefaults.colors(),
    properties: DialogProperties = DialogProperties(usePlatformDefaultWidth = false),
    content: @Composable ColumnScope.() -> Unit,
)
```

```kotlin
val datePickerState = rememberDatePickerState()

DatePickerDialog(
    onDismissRequest = onDismiss,
    confirmButton = {
        TextButton(onClick = { onDateSelected(datePickerState.selectedDateMillis); onDismiss() }) {
            Text("OK")
        }
    },
    dismissButton = {
        TextButton(onClick = onDismiss) { Text("Cancel") }
    }
) {
    DatePicker(state = datePickerState)
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `onDismissRequest` | `() -> Unit` | — | Called when the dialog should be dismissed (e.g. tap outside, back press). |
| `confirmButton` | `@Composable () -> Unit` | — | Confirm action button, typically a `TextButton`. |
| `modifier` | `Modifier` | `Modifier` | Applied to the dialog surface. |
| `dismissButton` | `@Composable (() -> Unit)?` | `null` | Optional cancel/dismiss action button. |
| `shape` | `Shape` | `DatePickerDefaults.shape` | Shape of the dialog surface. |
| `tonalElevation` | `Dp` | `DatePickerDefaults.TonalElevation` | Tonal elevation of the dialog surface. |
| `colors` | `DatePickerColors` | `DatePickerDefaults.colors()` | Resolves colors for the dialog. |
| `properties` | `DialogProperties` | `DialogProperties(usePlatformDefaultWidth = false)` | Platform dialog window properties. |
| `content` | `@Composable ColumnScope.() -> Unit` | — | The `DatePicker` or `DateRangePicker` hosted inside the dialog. |

## Notes

- Experimental API (`@ExperimentalMaterial3Api`); declared as `expect fun` (platform-specific `actual` implementations).
- The caller must supply and wire up `confirmButton`/`dismissButton` events; the dialog itself does not read/commit the picker state.
- Package: `androidx.compose.material3`.

## Related

- [DatePicker](./datepicker.md)
- [DateRangePicker](./daterangepicker.md)
