# DatePicker

A control for selecting an absolute date.

## Signature / Usage

```swift
nonisolated struct DatePicker<Label> where Label : View
```

```swift
@State private var selectedDate = Date()

DatePicker(
    "Start Date",
    selection: $selectedDate,
    in: Date.now...,
    displayedComponents: [.date, .hourAndMinute]
)
.datePickerStyle(.graphical)
```

## Options / Props

| Initializer | Description |
|---|---|
| `init(_:selection:displayedComponents:)` | Title string key + binding + components |
| `init(selection:displayedComponents:label:)` | Custom label view builder |
| `init(_:selection:in:displayedComponents:)` | With a `ClosedRange<Date>` or partial range |
| `init(selection:in:displayedComponents:label:)` | Custom label + range |

### Parameters

| Parameter | Type | Description |
|---|---|---|
| `selection` | `Binding<Date>` | The selected date |
| `in` | `RangeExpression<Date>` | Allowed date range |
| `displayedComponents` | `DatePickerComponents` | `.date`, `.hourAndMinute` (combinable) |

### Key modifiers

| Modifier | Description |
|---|---|
| `datePickerStyle(_:)` | `.automatic`, `.compact`, `.graphical`, `.wheel` (iOS); `.stepperField`, `.field`, `.graphical` (macOS) |

## Notes

- Available on iOS 13.0+, macOS 10.15+, watchOS 10.0+, visionOS 1.0+. Not available on tvOS.
- Use a half-open range (`Date.now...`) to restrict to future dates only.
- `.graphical` renders an inline calendar; `.compact` shows a label that expands to a popover.

## Related

- [Picker](./picker.md)
- [Form](./form.md)
