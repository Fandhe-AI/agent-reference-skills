# DateInput (DatePicker in DisplayMode.Input)

Not a standalone composable. The official guide's "Input modal date picker" is `DatePicker` hosted in `DatePickerDialog`, with its state created using `initialDisplayMode = DisplayMode.Input` so the user types a date instead of using the calendar.

## Signature / Usage

```kotlin
@Composable
fun DatePickerModalInput(
    onDateSelected: (Long?) -> Unit,
    onDismiss: () -> Unit
) {
    val datePickerState = rememberDatePickerState(initialDisplayMode = DisplayMode.Input)

    DatePickerDialog(
        onDismissRequest = onDismiss,
        confirmButton = {
            TextButton(onClick = {
                onDateSelected(datePickerState.selectedDateMillis)
                onDismiss()
            }) {
                Text("OK")
            }
        },
        dismissButton = {
            TextButton(onClick = onDismiss) {
                Text("Cancel")
            }
        }
    ) {
        DatePicker(state = datePickerState)
    }
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `initialDisplayMode` | `DisplayMode` | `DisplayMode.Picker` | Parameter of `rememberDatePickerState`; `DisplayMode.Input` starts in text-entry mode. |
| `DisplayMode.Picker` | `DisplayMode` | — | Date picker (calendar) mode. |
| `DisplayMode.Input` | `DisplayMode` | — | Date text input mode. |
| `DatePickerState.displayMode` | `DisplayMode` (`var`) | — | Current UI mode (picker or input); readable and settable at runtime. |
| `showModeToggle` | `Boolean` | `true` | `DatePicker` parameter; shows the toggle between calendar and input. |

## Notes

- There is no `DateInput` composable in Material 3; this page documents the `DisplayMode.Input` usage described in the official guide (Input modal date picker). No separate API signature exists for it.
- The only difference from the modal date picker example is `initialDisplayMode = DisplayMode.Input`.
- Deviation from source: the guide snippet is annotated `@OptIn(ExperimentalMaterial3Api::class)`; it is omitted here because the Long-based `DatePicker` / `rememberDatePickerState` / `DatePickerDialog` are not experimental in material3 1.4.0 (api/1.4.0-beta03.txt). Only the `java.time` `LocalDate` overloads of the `remember*State` functions remain `@ExperimentalMaterial3Api`.
- `DisplayMode` is a value class in `androidx.compose.material3` with companion values `Picker` and `Input`.
- `selectedDateMillis` is a `Long?` in epoch milliseconds.
- For keyboard entry of a time instead of a date, see `TimeInput`, which is a separate composable.
- Package: `androidx.compose.material3`.
- This is the Jetpack Compose (Kotlin) API — distinct from the same-named SwiftUI / Ark UI / Chakra UI / fandhe-frontend components.

## Related

- [DatePicker](./datepicker.md)
- [rememberDatePickerState](./rememberdatepickerstate.md)
- [DatePickerDialog](./datepickerdialog.md)
- [DateRangeInput](./daterangeinput.md)
- [TimeInput](./timeinput.md)
