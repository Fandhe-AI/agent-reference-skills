# NSControl

A specialized view that notifies your app of relevant events using the target-action design pattern. The base class for interactive controls such as buttons, text fields, and sliders.

## Signature / Usage

```swift
class NSControl : NSView
```

```swift
// Common subclass usage pattern
let button = NSButton(title: "Click Me", target: self, action: #selector(handleClick))
button.controlSize = .regular
button.isEnabled = true
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `target` | `AnyObject?` | Object that receives the action message |
| `action` | `Selector?` | Action-message selector sent on activation |
| `isEnabled` | `Bool` | Whether the control responds to mouse events |
| `doubleValue` | `Double` | Current value as a `Double` |
| `stringValue` | `String` | Current value as a `String` |
| `intValue` | `Int32` | Current value as an `Int32` |
| `integerValue` | `Int` | Current value as an `Int` |
| `floatValue` | `Float` | Current value as a `Float` |
| `objectValue` | `Any?` | Current value as an Objective-C object |
| `controlSize` | `NSControl.ControlSize` | Size variant: `.regular`, `.small`, `.mini` |
| `font` | `NSFont?` | Font used to draw text in the control |
| `isContinuous` | `Bool` | Send action messages continuously during mouse tracking |
| `isHighlighted` | `Bool` | Whether the control is in a highlighted state |
| `tag` | `Int` | Integer identifier for the control |

## Notes

- Platform: macOS. Do not instantiate `NSControl` directly; use a concrete subclass.
- Common subclasses: `NSButton`, `NSTextField`, `NSSlider`, `NSSegmentedControl`, `NSDatePicker`, `NSSwitch`, `NSStepper`.
- `sendAction(_:to:)` manually dispatches an action; `performClick(_:)` simulates a mouse click.

## Related

- [NSView](./nsview.md)
- [NSButton](./nsbutton.md)
- [NSTextField](./nstextfield.md)
- [NSSlider](./nsslider.md)
