# DateRangeInput (DateRangePicker in DisplayMode.Input)

Not a standalone composable, and the official guide has no dedicated range-input example. The range picker's text-entry mode is selected through `DisplayMode.Input`, via `initialDisplayMode` of `rememberDateRangePickerState` or the mode toggle of `DateRangePicker`.

## Signature / Usage

```kotlin
@Composable
public fun rememberDateRangePickerState(
    @Suppress("AutoBoxing") initialSelectedStartDateMillis: Long? = null,
    @Suppress("AutoBoxing") initialSelectedEndDateMillis: Long? = null,
    @Suppress("AutoBoxing") initialDisplayedMonthMillis: Long? = initialSelectedStartDateMillis,
    yearRange: IntRange = DatePickerDefaults.YearRange,
    initialDisplayMode: DisplayMode = DisplayMode.Picker,
    selectableDates: SelectableDates = DatePickerDefaults.AllDates,
): DateRangePickerState
```

Adapted (not in the official docs): the guide's `DateRangePickerModal` example with `initialDisplayMode = DisplayMode.Input` added to the state and `@OptIn(ExperimentalMaterial3Api::class)` removed (see Notes).

```kotlin
@Composable
fun DateRangePickerModal(
    onDateRangeSelected: (Pair<Long?, Long?>) -> Unit,
    onDismiss: () -> Unit
) {
    val dateRangePickerState = rememberDateRangePickerState(initialDisplayMode = DisplayMode.Input)

    DatePickerDialog(
        onDismissRequest = onDismiss,
        confirmButton = {
            TextButton(
                onClick = {
                    onDateRangeSelected(
                        Pair(
                            dateRangePickerState.selectedStartDateMillis,
                            dateRangePickerState.selectedEndDateMillis
                        )
                    )
                    onDismiss()
                }
            ) {
                Text("OK")
            }
        },
        dismissButton = {
            TextButton(onClick = onDismiss) {
                Text("Cancel")
            }
        }
    ) {
        DateRangePicker(
            state = dateRangePickerState,
            title = {
                Text(text = "Select date range")
            },
            showModeToggle = false,
            modifier = Modifier
                .fillMaxWidth()
                .height(500.dp)
                .padding(16.dp)
        )
    }
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `initialDisplayMode` | `DisplayMode` | `DisplayMode.Picker` | Parameter of `rememberDateRangePickerState`; `DisplayMode.Input` starts in text-entry mode. |
| `DisplayMode.Picker` | `DisplayMode` | — | Date range picker (calendar) mode. |
| `DisplayMode.Input` | `DisplayMode` | — | Date text input mode. |
| `DateRangePickerState.displayMode` | `DisplayMode` (`var`) | — | Current UI mode (picker or input); readable and settable at runtime. |
| `showModeToggle` | `Boolean` | `true` | `DateRangePicker` parameter; the example above sets it to `false` (as in the guide), so the picker stays in input mode with no toggle back to the calendar. |

## Notes

- Source: https://developer.android.com/develop/ui/compose/components/datepickers (Input modal date picker / Date range picker sections)
- There is no `DateRangeInput` composable in Material 3, and the official guide shows `DisplayMode.Input` only for the single-date modal picker. This page is a derived usage note.
- Deviation from source: only `initialDisplayMode = DisplayMode.Input` was added to the guide's `DateRangePickerModal` example; with the guide's `showModeToggle = false` the picker stays in input mode.
- Deviation from source: the guide snippet is annotated `@OptIn(ExperimentalMaterial3Api::class)`; it is omitted here because the Long-based `DatePicker` / `DateRangePicker` / `rememberDatePickerState` / `rememberDateRangePickerState` / `DatePickerDialog` are not experimental in material3 1.4.0 (api/1.4.0-beta03.txt: https://raw.githubusercontent.com/androidx/androidx/androidx-main/compose/material3/material3/api/1.4.0-beta03.txt). Only the `java.time` `LocalDate` overloads remain `@ExperimentalMaterial3Api`.
- Selected values are `selectedStartDateMillis` / `selectedEndDateMillis` (`Long?`, epoch milliseconds); the guide suggests a `Pair<Long?, Long?>` or data class to capture them.
- Signature verified against the material3 1.4.0 sources jar (DateRangePicker.kt; https://dl.google.com/android/maven2/androidx/compose/material3/material3-android/1.4.0/material3-android-1.4.0-sources.jar); identical to androidx-main (https://raw.githubusercontent.com/androidx/androidx/androidx-main/compose/material3/material3/src/commonMain/kotlin/androidx/compose/material3/DateRangePicker.kt) except that 1.4.0 omits the explicit `public` modifier.
- Package: `androidx.compose.material3`.
- This is the Jetpack Compose (Kotlin) API — distinct from the same-named SwiftUI / Ark UI / Chakra UI / fandhe-frontend components.

## Related

- [DateRangePicker](./daterangepicker.md)
- [rememberDateRangePickerState](./rememberdaterangepickerstate.md)
- [DatePickerDialog](./datepickerdialog.md)
- [DateInput](./dateinput.md)
