# NSSwitch

A control that offers a binary choice, providing a simple interface for displaying and toggling a Boolean state.

## Signature / Usage

```swift
class NSSwitch : NSControl
```

```swift
let toggle = NSSwitch()
toggle.state = .on
toggle.target = self
toggle.action = #selector(switchChanged(_:))

@objc func switchChanged(_ sender: NSSwitch) {
    let isOn = sender.state == .on
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `state` | `NSControl.StateValue` | Current position: `.on` or `.off` |
| `isContinuous` | `Bool` | Send action for each position change during drag (inherited from `NSControl`) |

## Notes

- Platform: macOS 10.15+.
- Unlike most AppKit controls, `NSSwitch` does **not** use an `NSCell`; `cell` and `cellClass` return `nil`.
- Setting a non-`nil` cell is silently ignored.
- Sends its action when clicked, activated via keyboard, or tapped in the Touch Bar.
- See Human Interface Guidelines > Toggles for design guidance.

## Related

- [NSControl](./nscontrol.md)
- [NSButton](./nsbutton.md)
