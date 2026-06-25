# NSPopUpButton

A control for selecting an item from a list. Displays either a pop-up menu (single selection) or a pull-down menu.

## Signature / Usage

```swift
class NSPopUpButton : NSButton
```

```swift
// Pop-up menu
let popUp = NSPopUpButton(frame: .zero, pullsDown: false)
popUp.addItems(withTitles: ["Apple", "Banana", "Cherry"])
popUp.target = self
popUp.action = #selector(selectionChanged(_:))

// Pull-down menu
let pullDown = NSPopUpButton(frame: .zero, pullsDown: true)
pullDown.addItem(withTitle: "Actions")

@objc func selectionChanged(_ sender: NSPopUpButton) {
    print("Selected:", sender.titleOfSelectedItem ?? "")
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `menu` | `NSMenu?` | The menu associated with the button |
| `pullsDown` | `Bool` | `true` = pull-down menu; `false` = pop-up menu |
| `autoenablesItems` | `Bool` | Whether items are auto-enabled/disabled on user events |
| `selectedItem` | `NSMenuItem?` | The last item selected by the user |
| `titleOfSelectedItem` | `String?` | Title of the selected item |
| `indexOfSelectedItem` | `Int` | Zero-based index of the selected item |
| `numberOfItems` | `Int` | Total number of items in the menu |
| `itemArray` | `[NSMenuItem]` | All menu item objects |

## Notes

- Platform: macOS.
- Item management: `addItem(withTitle:)`, `addItems(withTitles:)`, `insertItem(withTitle:at:)`, `removeItem(at:)`, `removeAllItems()`.
- Selection: `select(_:)`, `selectItem(at:)`, `selectItem(withTitle:)`, `selectItem(withTag:)`.
- Setting the `image` property (inherited from `NSButton`) has no effect; the displayed image comes from the selected menu item (pop-up) or the first menu item (pull-down).
- Programmatic menu changes during user interaction are not reflected until the menu closes.

## Related

- [NSButton](./nsbutton.md)
- [NSSegmentedControl](./nssegmentedcontrol.md)
- [NSComboBox](./nscombobox.md)
