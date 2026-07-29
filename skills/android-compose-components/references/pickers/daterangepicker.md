# DateRangePicker

Lets people select a range of dates (start and end), embedded into a `DatePickerDialog`.

## Signature / Usage

```kotlin
@Composable
public fun DateRangePicker(
    state: DateRangePickerState,
    modifier: Modifier = Modifier,
    dateFormatter: DatePickerFormatter = remember { DatePickerDefaults.dateFormatter() },
    colors: DatePickerColors = DatePickerDefaults.colors(),
    title: (@Composable () -> Unit)? = {
        DateRangePickerDefaults.DateRangePickerTitle(
            displayMode = state.displayMode,
            modifier = Modifier.padding(DateRangePickerTitlePadding),
            contentColor = colors.titleContentColor,
        )
    },
    headline: (@Composable () -> Unit)? = {
        DateRangePickerDefaults.DateRangePickerHeadline(
            selectedStartDateMillis = state.selectedStartDateMillis,
            selectedEndDateMillis = state.selectedEndDateMillis,
            displayMode = state.displayMode,
            dateFormatter,
            modifier = Modifier.padding(DateRangePickerHeadlinePadding),
            contentColor = colors.headlineContentColor,
        )
    },
    showModeToggle: Boolean = true,
    focusRequester: FocusRequester? = remember { FocusRequester() },
)
```

```kotlin
val dateRangePickerState = rememberDateRangePickerState()

DatePickerDialog(
    onDismissRequest = onDismiss,
    confirmButton = {
        TextButton(onClick = {
            onDateRangeSelected(
                dateRangePickerState.selectedStartDateMillis to dateRangePickerState.selectedEndDateMillis
            )
        }) { Text("OK") }
    }
) {
    DateRangePicker(
        state = dateRangePickerState,
        title = { Text("Select date range") },
        showModeToggle = false,
        modifier = Modifier.fillMaxWidth().height(500.dp).padding(16.dp)
    )
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `state` | `DateRangePickerState` | — | Created via `rememberDateRangePickerState`; holds `selectedStartDateMillis` / `selectedEndDateMillis`. |
| `modifier` | `Modifier` | `Modifier` | Applied to this picker; typically needs an explicit height when hosted in a dialog. |
| `dateFormatter` | `DatePickerFormatter` | `remember { DatePickerDefaults.dateFormatter() }` | Formats dates shown in headline/title. |
| `colors` | `DatePickerColors` | `DatePickerDefaults.colors()` | Resolves colors for the picker. |
| `title` | `(@Composable () -> Unit)?` | `DateRangePickerDefaults.DateRangePickerTitle(state.displayMode, ...)` | Title shown above the headline. |
| `headline` | `(@Composable () -> Unit)?` | `DateRangePickerDefaults.DateRangePickerHeadline(state.selectedStartDateMillis, state.selectedEndDateMillis, ...)` | Displays the currently selected start/end dates. |
| `showModeToggle` | `Boolean` | `true` | Whether to show the toggle between calendar and text-input modes. |
| `focusRequester` | `FocusRequester?` | `remember { FocusRequester() }` | Used to request focus when switching to input mode. |

## Notes

- Experimental API (`@ExperimentalMaterial3Api`).
- Unlike `DatePicker`, `DateRangePicker` typically needs an explicit `Modifier.height(...)` when placed inside `DatePickerDialog`.
- Package: `androidx.compose.material3`.
- This is the Jetpack Compose (Kotlin) API — distinct from the same-named SwiftUI / Ark UI / Chakra UI / fandhe-frontend components.

## Related

- [rememberDateRangePickerState](./rememberdaterangepickerstate.md)
- [DatePicker](./datepicker.md)
- [DatePickerDialog](./datepickerdialog.md)
