# TimePicker

Dial-style time picker letting users select and set a specific time by dragging a clock hand.

## Signature / Usage

```kotlin
@Composable
public fun TimePicker(
    state: TimePickerState,
    modifier: Modifier = Modifier,
    colors: TimePickerColors = TimePickerDefaults.colors(),
    layoutType: TimePickerLayoutType = TimePickerDefaults.layoutType(),
)
```

```kotlin
val timePickerState = rememberTimePickerState(
    initialHour = 13,
    initialMinute = 30,
    is24Hour = true,
)
TimePicker(state = timePickerState)
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `state` | `TimePickerState` | — | Created via `rememberTimePickerState`; exposes `hour` / `minute`. |
| `modifier` | `Modifier` | `Modifier` | Applied to this time picker. |
| `colors` | `TimePickerColors` | `TimePickerDefaults.colors()` | Resolves colors for the picker. |
| `layoutType` | `TimePickerLayoutType` | `TimePickerDefaults.layoutType()` | Vertical or horizontal layout of the clock dial. |

## Notes

- Experimental API (`@ExperimentalMaterial3Api`).
- A second overload accepts a `shapes: TimePickerShapes` parameter and `colors = TimePickerDefaults.richColors()` for a "rich" time picker with a more prominent layout, suited to larger screens.
- `TimeInput` is the alternative keyboard-entry variant sharing the same `TimePickerState`.
- Typically hosted inside `TimePickerDialog` (or a custom `AlertDialog`/`Dialog`) with confirm/dismiss buttons supplied by the caller.
- Package: `androidx.compose.material3`.

## Related

- [rememberTimePickerState](./remembertimepickerstate.md)
- [TimeInput](./timeinput.md)
- [TimePickerDialog](./timepickerdialog.md)
