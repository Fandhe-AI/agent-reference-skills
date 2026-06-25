# NSDatePicker

A control that displays a calendar date with controls for editing the date value.

## Signature / Usage

```swift
class NSDatePicker : NSControl
```

```swift
let picker = NSDatePicker()
picker.datePickerStyle = .clockAndCalendar
picker.datePickerElements = [.yearMonthDay]
picker.datePickerMode = .single
picker.dateValue = Date()
picker.minDate = Calendar.current.date(byAdding: .year, value: -1, to: Date())
picker.maxDate = Calendar.current.date(byAdding: .year, value: 1, to: Date())
picker.delegate = self
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `dateValue` | `Date` | The date currently selected by the picker |
| `minDate` | `Date?` | The earliest selectable date |
| `maxDate` | `Date?` | The latest selectable date |
| `datePickerStyle` | `NSDatePicker.Style` | Visual style (`.textFieldAndStepper`, `.clockAndCalendar`, `.textField`) |
| `datePickerElements` | `NSDatePicker.ElementFlags` | Bitmask of visible components (year, month, day, hour, minute, second) |
| `datePickerMode` | `NSDatePicker.Mode` | `.single` (one date) or `.range` (date range) |
| `timeInterval` | `TimeInterval` | The time interval for a range selection |
| `calendar` | `Calendar?` | Calendar system used for display and calculation |
| `locale` | `Locale?` | Locale for date formatting |
| `timeZone` | `TimeZone?` | Time zone for display |
| `presentsCalendarOverlay` | `Bool` | Whether clicking a text-style picker shows a calendar popover |
| `delegate` | `NSDatePickerCellDelegate?` | Delegate for validation callbacks |

## Notes

- Platform: macOS.
- `NSDatePickerCellDelegate` provides `datePickerCell(_:validateProposedDateValue:timeInterval:)` for validating date changes before they are committed.

## Related

- [NSControl](./nscontrol.md)
