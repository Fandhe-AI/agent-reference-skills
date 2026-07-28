# rememberDatePickerState

Creates and remembers a `DatePickerState` for use with `DatePicker`, tracking the selected date, displayed month, and calendar/input display mode across recompositions.

## Signature / Usage

```kotlin
@Composable
public fun rememberDatePickerState(
    @Suppress("AutoBoxing") initialSelectedDateMillis: Long? = null,
    @Suppress("AutoBoxing") initialDisplayedMonthMillis: Long? = initialSelectedDateMillis,
    yearRange: IntRange = DatePickerDefaults.YearRange,
    initialDisplayMode: DisplayMode = DisplayMode.Picker,
    selectableDates: SelectableDates = DatePickerDefaults.AllDates,
): DatePickerState
```

```kotlin
val datePickerState = rememberDatePickerState(
    initialDisplayMode = DisplayMode.Input
)
DatePicker(state = datePickerState)
val selectedMillis: Long? = datePickerState.selectedDateMillis
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `initialSelectedDateMillis` | `Long?` | `null` | Initial selected date, in epoch milliseconds. |
| `initialDisplayedMonthMillis` | `Long?` | `initialSelectedDateMillis` | Initial month shown in the calendar, in epoch milliseconds. |
| `yearRange` | `IntRange` | `DatePickerDefaults.YearRange` | Range of selectable years. |
| `initialDisplayMode` | `DisplayMode` | `DisplayMode.Picker` | `DisplayMode.Picker` (calendar) or `DisplayMode.Input` (keyboard entry). |
| `selectableDates` | `SelectableDates` | `DatePickerDefaults.AllDates` | Restricts which dates/years are selectable. |

## Notes

- Returns a `DatePickerState` exposing `selectedDateMillis: Long?` and `displayMode`.
- Experimental API (`@ExperimentalMaterial3Api`).
- Package: `androidx.compose.material3`.

## Related

- [DatePicker](./datepicker.md)
- [rememberDateRangePickerState](./rememberdaterangepickerstate.md)
