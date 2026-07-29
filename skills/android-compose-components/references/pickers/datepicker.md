# DatePicker

Lets people select a single date via a calendar UI, or switch to manual keyboard entry. Should be embedded in a `DatePickerDialog` (or a docked popup).

## Signature / Usage

```kotlin
@Composable
public fun DatePicker(
    state: DatePickerState,
    modifier: Modifier = Modifier,
    dateFormatter: DatePickerFormatter = remember { DatePickerDefaults.dateFormatter() },
    colors: DatePickerColors = DatePickerDefaults.colors(),
    title: (@Composable () -> Unit)? = {
        DatePickerDefaults.DatePickerTitle(
            displayMode = state.displayMode,
            modifier = Modifier.padding(DatePickerTitlePadding),
            contentColor = colors.titleContentColor,
        )
    },
    headline: (@Composable () -> Unit)? = {
        DatePickerDefaults.DatePickerHeadline(
            selectedDateMillis = state.selectedDateMillis,
            displayMode = state.displayMode,
            dateFormatter = dateFormatter,
            modifier = Modifier.padding(DatePickerHeadlinePadding),
            contentColor = colors.headlineContentColor,
        )
    },
    showModeToggle: Boolean = true,
    focusRequester: FocusRequester? = remember { FocusRequester() },
)
```

```kotlin
val datePickerState = rememberDatePickerState()

DatePickerDialog(
    onDismissRequest = onDismiss,
    confirmButton = {
        TextButton(onClick = { onDateSelected(datePickerState.selectedDateMillis) }) {
            Text("OK")
        }
    }
) {
    DatePicker(state = datePickerState)
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `state` | `DatePickerState` | — | Created via `rememberDatePickerState`; holds the selected date and display mode. |
| `modifier` | `Modifier` | `Modifier` | Applied to this date picker. |
| `dateFormatter` | `DatePickerFormatter` | `remember { DatePickerDefaults.dateFormatter() }` | Formats dates shown in headline/title. |
| `colors` | `DatePickerColors` | `DatePickerDefaults.colors()` | Resolves colors for the picker. |
| `title` | `(@Composable () -> Unit)?` | `DatePickerDefaults.DatePickerTitle(state.displayMode, ...)` | Title shown above the headline. |
| `headline` | `(@Composable () -> Unit)?` | `DatePickerDefaults.DatePickerHeadline(state.selectedDateMillis, ...)` | Displays the currently selected date. |
| `showModeToggle` | `Boolean` | `true` | Whether to show the toggle between calendar and text-input modes. |
| `focusRequester` | `FocusRequester?` | `remember { FocusRequester() }` | Used to request focus, e.g. when switching to input mode. |

## Notes

- Experimental API (`@ExperimentalMaterial3Api`).
- Set `initialDisplayMode = DisplayMode.Input` (via `rememberDatePickerState`) to start in keyboard-entry mode.
- Can also be shown "docked" inline (e.g. inside a `Popup`) instead of a modal dialog.
- Package: `androidx.compose.material3`.
- This is the Jetpack Compose (Kotlin) API — distinct from the same-named SwiftUI / Ark UI / Chakra UI / fandhe-frontend components.

## Related

- [rememberDatePickerState](./rememberdatepickerstate.md)
- [DatePickerDialog](./datepickerdialog.md)
- [DateRangePicker](./daterangepicker.md)
