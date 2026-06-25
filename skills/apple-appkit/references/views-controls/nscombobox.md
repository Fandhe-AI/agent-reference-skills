# NSComboBox

A view that combines an `NSTextField` with a pop-up list, allowing the user to select a value from the list or type a custom value.

## Signature / Usage

```swift
class NSComboBox : NSTextField
```

```swift
// Using internal item list
let combo = NSComboBox()
combo.addItems(withObjectValues: ["Red", "Green", "Blue"])
combo.numberOfVisibleItems = 5
combo.completes = true
combo.delegate = self

// Using a data source
combo.usesDataSource = true
combo.dataSource = myDataSource
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `usesDataSource` | `Bool` | Whether items come from a `dataSource` rather than internal list |
| `dataSource` | `NSComboBoxDataSource?` | Object that provides item data |
| `delegate` | `NSComboBoxDelegate?` | Delegate for combo box events |
| `numberOfItems` | `Int` | Total number of items in the pop-up list |
| `objectValues` | `[Any]` | Items in the internal list |
| `numberOfVisibleItems` | `Int` | Maximum number of items visible in the pop-up |
| `itemHeight` | `CGFloat` | Height of each item row |
| `hasVerticalScroller` | `Bool` | Whether the pop-up list shows a vertical scroller |
| `intercellSpacing` | `NSSize` | Spacing between item cells |
| `isButtonBordered` | `Bool` | Whether the combo box displays a border |
| `completes` | `Bool` | Whether typed text is auto-completed from the list |
| `indexOfSelectedItem` | `Int` | Index of the last selected item |
| `objectValueOfSelectedItem` | `Any?` | Object of the last selected item |

## Notes

- Platform: macOS (and Mac Catalyst).
- Item management: `addItem(withObjectValue:)`, `addItems(withObjectValues:)`, `insertItem(withObjectValue:at:)`, `removeItem(at:)`, `removeItem(withObjectValue:)`, `removeAllItems()`.
- Selection: `selectItem(at:)`, `selectItem(withObjectValue:)`, `deselectItem(at:)`.
- Key notifications: `selectionDidChangeNotification`, `willPopUpNotification`, `willDismissNotification`.

## Related

- [NSTextField](./nstextfield.md)
- [NSPopUpButton](./nspopupbutton.md)
