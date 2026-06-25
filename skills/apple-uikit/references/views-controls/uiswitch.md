# UISwitch

A control that offers a binary on/off choice.

## Signature / Usage

```swift
@MainActor
class UISwitch : UIControl

let toggle = UISwitch()
toggle.isOn = true
toggle.addTarget(self, action: #selector(switchChanged(_:)), for: .valueChanged)

@objc func switchChanged(_ sender: UISwitch) {
    print("Switch is now:", sender.isOn)
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `isOn` | `Bool` | Current on/off state |
| `onTintColor` | `UIColor?` | Track color in the on position |
| `thumbTintColor` | `UIColor?` | Thumb (knob) color |
| `title` | `String?` | Label shown next to a Mac-style checkbox |
| `style` | `UISwitch.Style` | Current display style (`.automatic`, `.checkbox`, `.sliding`) |
| `preferredStyle` | `UISwitch.Style` | Preferred style; actual style may differ by platform |

**Key method:**

| Method | Description |
|--------|-------------|
| `setOn(_:animated:)` | Programmatically set state with optional animation |

## Notes

- Available iOS 2.0+, iPadOS 2.0+, Mac Catalyst 13.1+, visionOS 1.0+.
- Fires `UIControl.Event.valueChanged` on state change.
- On Mac Catalyst, the switch renders as a checkbox by default (`style == .checkbox`).
- `onImage` and `offImage` properties are deprecated.

## Related

- [UIControl](./uicontrol.md)
- [UISlider](./uislider.md)
