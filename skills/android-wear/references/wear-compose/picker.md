# Picker / PickerGroup / DatePicker / TimePicker

Scrollable column(s) of items for selecting a value from a finite set. `Picker` is the single-column primitive; `PickerGroup` combines multiple `Picker`s with coordinated focus (e.g. day/month/year). `DatePicker` / `TimePicker` are full-screen prebuilt pickers built on top of `PickerGroup`.

## Signature / Usage

```kotlin
@Composable
public fun Picker(
    state: PickerState,
    contentDescription: (() -> String)?,
    modifier: Modifier = Modifier,
    readOnly: Boolean = false,
    readOnlyLabel: @Composable (BoxScope.() -> Unit)? = null,
    onSelected: () -> Unit = {},
    verticalSpacing: Dp = 0.dp,
    @FloatRange(from = 0.0, to = 0.5) gradientRatio: Float = PickerDefaults.GradientRatio,
    gradientColor: Color = MaterialTheme.colorScheme.background,
    userScrollEnabled: Boolean = true,
    rotaryScrollableBehavior: RotaryScrollableBehavior? = PickerDefaults.rotarySnapBehavior(state),
    option: @Composable PickerScope.(index: Int) -> Unit,
)
```

```kotlin
@Composable
public fun PickerGroup(
    modifier: Modifier = Modifier,
    selectedPickerState: PickerState? = null,
    autoCenter: Boolean = true,
    propagateMinConstraints: Boolean = false,
    content: @Composable PickerGroupScope.() -> Unit,
)
```

```kotlin
@Composable
public fun DatePicker(
    initialDate: LocalDate,
    onDatePicked: (LocalDate) -> Unit,
    modifier: Modifier = Modifier,
    minValidDate: LocalDate? = null,
    maxValidDate: LocalDate? = null,
    datePickerType: DatePickerType = DatePickerDefaults.datePickerType,
    colors: DatePickerColors = DatePickerDefaults.datePickerColors(),
)
```

```kotlin
public fun TimePicker(
    initialTime: LocalTime,
    onTimePicked: (LocalTime) -> Unit,
    modifier: Modifier = Modifier,
    timePickerType: TimePickerType = TimePickerDefaults.timePickerType,
    colors: TimePickerColors = TimePickerDefaults.timePickerColors(),
    initialSelection: TimePickerSelection = TimePickerDefaults.timePickerSelection(timePickerType),
)
```

```kotlin
DatePicker(initialDate = LocalDate.now(), onDatePicked = { date -> /* use date */ })
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `state` (Picker) | `PickerState` | — | Selected index / scroll state, created via `rememberPickerState`. |
| `readOnly` (Picker) | `Boolean` | `false` | Disables editing; pairs with `readOnlyLabel`. |
| `rotaryScrollableBehavior` (Picker) | `RotaryScrollableBehavior?` | `PickerDefaults.rotarySnapBehavior(state)` | Crown/bezel snap behavior between options. |
| `option` (Picker) | `@Composable PickerScope.(index: Int) -> Unit` | — | Renders each option row. |
| `selectedPickerState` (PickerGroup) | `PickerState?` | `null` | Which sub-picker currently has focus. |
| `autoCenter` (PickerGroup) | `Boolean` | `true` | Centers the group of pickers. |
| `initialDate` / `onDatePicked` (DatePicker) | `LocalDate` / `(LocalDate) -> Unit` | — | Initial value and result callback. |
| `minValidDate` / `maxValidDate` (DatePicker) | `LocalDate?` | `null` | Valid range bounds. |
| `datePickerType` / `timePickerType` | `DatePickerType` / `TimePickerType` | `DatePickerDefaults.datePickerType` / `TimePickerDefaults.timePickerType` | Column order/format (e.g. day-month-year vs month-day-year, 12h vs 24h). |
| `initialTime` / `onTimePicked` (TimePicker) | `LocalTime` / `(LocalTime) -> Unit` | — | Initial value and result callback. |

## Notes

- `Picker` items loop infinitely by default in both directions; disable via a non-looping `PickerState` if order matters.
- `DatePicker` / `TimePicker` are full-screen, opinionated compositions of `PickerGroup`; for custom prebuilt pickers beyond these, Google recommends the Horologist library (`google/horologist`).
- Responsive breakpoint at 225 dp screen width changes column font size and gap between columns.
- Package: `androidx.wear.compose.material3` (artifact `androidx.wear.compose:compose-material3`).

## Related

- [AlertDialog / ConfirmationDialog / OpenOnPhoneDialog](./dialogs.md)
- [Rotary input](./rotary-input.md)
