# rememberDateRangePickerState

Creates and remembers a `DateRangePickerState` for use with `DateRangePicker`, tracking the selected start/end dates across recompositions.

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

```kotlin
val dateRangePickerState = rememberDateRangePickerState()
DateRangePicker(state = dateRangePickerState)
val range = dateRangePickerState.selectedStartDateMillis to dateRangePickerState.selectedEndDateMillis
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `initialSelectedStartDateMillis` | `Long?` | `null` | Initial selected start date, in epoch milliseconds. |
| `initialSelectedEndDateMillis` | `Long?` | `null` | Initial selected end date, in epoch milliseconds. |
| `initialDisplayedMonthMillis` | `Long?` | `initialSelectedStartDateMillis` | Initial month shown in the calendar. |
| `yearRange` | `IntRange` | `DatePickerDefaults.YearRange` | Range of selectable years. |
| `initialDisplayMode` | `DisplayMode` | `DisplayMode.Picker` | `DisplayMode.Picker` (calendar) or `DisplayMode.Input` (keyboard entry). |
| `selectableDates` | `SelectableDates` | `DatePickerDefaults.AllDates` | Restricts which dates/years are selectable. |

## Notes

- Returns a `DateRangePickerState` exposing `selectedStartDateMillis: Long?` and `selectedEndDateMillis: Long?`.
- Experimental API (`@ExperimentalMaterial3Api`).
- Package: `androidx.compose.material3`.

## Related

- [DateRangePicker](./daterangepicker.md)
- [rememberDatePickerState](./rememberdatepickerstate.md)
