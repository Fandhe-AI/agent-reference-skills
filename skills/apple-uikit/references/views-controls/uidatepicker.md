# UIDatePicker

A control for entering a date, time, date-and-time value, or countdown duration.

## Signature / Usage

```swift
@MainActor
class UIDatePicker : UIControl

let picker = UIDatePicker()
picker.datePickerMode = .dateAndTime
picker.preferredDatePickerStyle = .wheels
picker.minimumDate = Date()
picker.minuteInterval = 5
picker.addTarget(self, action: #selector(dateChanged(_:)), for: .valueChanged)

@objc func dateChanged(_ sender: UIDatePicker) {
    print("Selected date:", sender.date)
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `date` | `Date` | Currently selected date |
| `datePickerMode` | `UIDatePicker.Mode` | Input mode (`.time`, `.date`, `.dateAndTime`, `.countDownTimer`) |
| `preferredDatePickerStyle` | `UIDatePickerStyle` | Preferred visual style (`.automatic`, `.wheels`, `.compact`, `.inline`) |
| `datePickerStyle` | `UIDatePickerStyle` | Read-only actual style in use |
| `minimumDate` | `Date?` | Earliest selectable date |
| `maximumDate` | `Date?` | Latest selectable date |
| `minuteInterval` | `Int` | Minute granularity (must divide evenly into 60; default `1`) |
| `countDownDuration` | `TimeInterval` | Duration shown in `.countDownTimer` mode |
| `roundsToMinuteInterval` | `Bool` | Rounds initial date to nearest `minuteInterval` |
| `calendar` | `Calendar` | Calendar system to use |
| `locale` | `Locale?` | Locale for formatting |
| `timeZone` | `TimeZone?` | Time zone reflected in display |

**Key method:**

| Method | Description |
|--------|-------------|
| `setDate(_:animated:)` | Set date programmatically with optional animation |

## Notes

- Available iOS 2.0+, iPadOS 2.0+, Mac Catalyst 13.1+, visionOS 1.0+.
- `minimumDate` must be earlier than `maximumDate`; if violated, both constraints are ignored.
- `minuteInterval` must be a divisor of 60; invalid values default to `1`.
- Date range constraints are ignored in `.countDownTimer` mode.
- The picker handles selection only; implement timer logic separately using `Timer` or `DispatchSourceTimer`.

## Related

- [UIPickerView](./uipickerview.md)
- [UIControl](./uicontrol.md)
