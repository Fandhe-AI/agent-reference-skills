# rememberTimePickerState

Creates and remembers a `TimePickerState` for use with `TimePicker` / `TimeInput`, tracking the selected hour and minute.

## Signature / Usage

```kotlin
@Composable
public fun rememberTimePickerState(
    initialHour: Int = 0,
    initialMinute: Int = 0,
    is24Hour: Boolean = is24HourFormat,
): TimePickerState
```

```kotlin
val timePickerState = rememberTimePickerState(
    initialHour = 13,
    initialMinute = 30,
    is24Hour = true,
)
TimePicker(state = timePickerState)
val hour = timePickerState.hour
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `initialHour` | `Int` | `0` | Initial hour (0-23). |
| `initialMinute` | `Int` | `0` | Initial minute (0-59). |
| `is24Hour` | `Boolean` | `is24HourFormat` (system default) | Whether to use 24-hour format. |

## Notes

- Returns a `TimePickerState` exposing `hour: Int` and `minute: Int`.
- Experimental API (`@ExperimentalMaterial3Api`).
- Package: `androidx.compose.material3`.

## Related

- [TimePicker](./timepicker.md)
- [TimeInput](./timeinput.md)
