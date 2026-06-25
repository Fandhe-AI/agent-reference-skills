# UIPickerView

A view that uses a spinning-wheel metaphor to display one or more sets of selectable values.

## Signature / Usage

```swift
@MainActor
class UIPickerView : UIView

let picker = UIPickerView()
picker.dataSource = self
picker.delegate = self

// UIPickerViewDataSource
func numberOfComponents(in pickerView: UIPickerView) -> Int { return 1 }
func pickerView(_ pickerView: UIPickerView, numberOfRowsInComponent component: Int) -> Int { return items.count }

// UIPickerViewDelegate
func pickerView(_ pickerView: UIPickerView, titleForRow row: Int, forComponent component: Int) -> String? {
    return items[row]
}
func pickerView(_ pickerView: UIPickerView, didSelectRow row: Int, inComponent component: Int) {
    print("Selected:", items[row])
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `dataSource` | `UIPickerViewDataSource?` | Provides component and row counts |
| `delegate` | `UIPickerViewDelegate?` | Provides content and handles selection |
| `numberOfComponents` | `Int` | Read-only number of wheels/columns |

**Key methods:**

| Method | Description |
|--------|-------------|
| `numberOfRows(inComponent:)` | Returns row count for a component |
| `selectRow(_:inComponent:animated:)` | Programmatically select a row |
| `selectedRow(inComponent:)` | Returns the currently selected row index |
| `reloadAllComponents()` | Reloads all wheels from data source |
| `reloadComponent(_:)` | Reloads a single wheel |
| `view(forRow:forComponent:)` | Returns the view for a specific row if visible |

## Notes

- Available iOS 2.0+, iPadOS 2.0+, Mac Catalyst 13.1+, visionOS 1.0+.
- Not available when the user interface idiom is `.mac`.
- Both `dataSource` and `delegate` must be set before the picker is displayed.
- For date/time selection, prefer `UIDatePicker` which manages its own data.

## Related

- [UIDatePicker](./uidatepicker.md)
- [UIView](./uiview.md)
