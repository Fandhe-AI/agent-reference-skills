# TimeInput

Keyboard-entry variant of the time picker: shows hour and minute text fields instead of a clock dial.

## Signature / Usage

```kotlin
@Composable
public fun TimeInput(
    state: TimePickerState,
    modifier: Modifier = Modifier,
    colors: TimePickerColors = TimePickerDefaults.colors(),
)
```

```kotlin
val timePickerState = rememberTimePickerState(
    initialHour = 13,
    initialMinute = 30,
    is24Hour = true,
)
TimeInput(state = timePickerState)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `state` | `TimePickerState` | — | Shared with `TimePicker`; created via `rememberTimePickerState`. |
| `modifier` | `Modifier` | `Modifier` | Applied to this time input. |
| `colors` | `TimePickerColors` | `TimePickerDefaults.colors()` | Resolves colors for the text fields. |

## Notes

- Experimental API (`@ExperimentalMaterial3Api`).
- A second overload accepts `shapes: TimePickerShapes` and `colors = TimePickerDefaults.richColors()` matching the "rich" `TimePicker` variant.
- Shares `TimePickerState` with `TimePicker`; toggle between the two to let users switch dial/input modes.
- Package: `androidx.compose.material3`.

## Related

- [TimePicker](./timepicker.md)
- [TimePickerDialog](./timepickerdialog.md)
