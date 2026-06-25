# NSButton

A control that defines an area the user clicks to trigger an action.

## Signature / Usage

```swift
class NSButton : NSControl
```

```swift
// Push button
let button = NSButton(title: "Save", target: self, action: #selector(save))
button.bezelStyle = .rounded

// Checkbox
let checkbox = NSButton(checkboxWithTitle: "Enable feature", target: self, action: #selector(toggle))

// Radio button
let radio = NSButton(radioButtonWithTitle: "Option A", target: self, action: #selector(select))

// Image + title button
let iconButton = NSButton(title: "Open", image: NSImage(systemSymbolName: "folder", accessibilityDescription: nil)!, target: self, action: #selector(openFile))
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `title` | `String` | Label shown in the off state |
| `alternateTitle` | `String` | Label shown in the on state |
| `image` | `NSImage?` | Image shown in the off state |
| `alternateImage` | `NSImage?` | Image shown in the on state |
| `state` | `NSControl.StateValue` | Current state: `.on`, `.off`, or `.mixed` |
| `bezelStyle` | `NSButton.BezelStyle` | Visual border style (e.g., `.rounded`, `.recessed`) |
| `allowsMixedState` | `Bool` | Allow `.mixed` state (checkboxes / tri-state controls) |
| `isBordered` | `Bool` | Whether the button draws a border |
| `isTransparent` | `Bool` | Whether the button is transparent |

## Notes

- Platform: macOS.
- Convenience initializers: `init(title:target:action:)`, `init(image:target:action:)`, `init(title:image:target:action:)`, `init(checkboxWithTitle:target:action:)`, `init(radioButtonWithTitle:target:action:)`.
- Setting `image` on an `NSPopUpButton` (subclass) has no effect; the displayed image comes from the selected menu item.

## Related

- [NSControl](./nscontrol.md)
- [NSSegmentedControl](./nssegmentedcontrol.md)
- [NSSwitch](./nsswitch.md)
- [NSPopUpButton](./nspopupbutton.md)
