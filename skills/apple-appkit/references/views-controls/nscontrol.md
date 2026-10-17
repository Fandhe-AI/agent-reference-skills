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

// Event-based target-action (macOS 27 SDK)
let slider = NSSlider()
slider.addTarget(self, action: #selector(sliderValueChanged), for: .valueChanged)

let button2 = NSButton()
button2.addTarget(self, action: #selector(buttonActivated), for: [.primaryActionTriggered, .menuActionTriggered])
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
| `controlSize` | `NSControl.ControlSize` | Size variant: `.regular`, `.small`, `.mini`; `.extraLarge` (macOS 26.0+) |
| `NSControl.BorderShape` | enum (macOS 26.0+) | Border shape: `.automatic`, `.capsule`, `.circle`, `.roundedRectangle` |
| `addTarget(_:action:for:)` | method | Registers a target-action pair for the given `NSControl.Events` |
| `removeTarget(_:action:for:)` | method | Stops delivery of events to the target (the action may be `nil`) |
| `NSControl.Events` | struct | Events a control can report to its target; see Notes |
| `font` | `NSFont?` | Font used to draw text in the control |
| `isContinuous` | `Bool` | Send action messages continuously during mouse tracking |
| `isHighlighted` | `Bool` | Whether the control is in a highlighted state |
| `tag` | `Int` | Integer identifier for the control |

## Notes

- Platform: macOS. Do not instantiate `NSControl` directly; use a concrete subclass.
- Common subclasses: `NSButton`, `NSTextField`, `NSSlider`, `NSSegmentedControl`, `NSDatePicker`, `NSSwitch`, `NSStepper`.
- Event-based target-action (`NSControl.Events`, `addTarget(_:action:for:)`, `removeTarget(_:action:for:)`) is new in the macOS 27 SDK (June 2026 AppKit updates). Its sub-members are listed as macOS 27.0; the struct and `addTarget` pages show an earlier version number, so the introduction version is not stated here.
- `NSControl.Events` members: tracking events `trackingBegan`, `trackingRepeated` (click count greater than one), `trackingEntered`, `trackingExited`, `trackingInside`, `trackingOutside`, `trackingEndedInside`, `trackingEndedOutside`, `trackingCancelled`; semantic events `valueChanged` (dragging or manipulating the control emits a series of values), `primaryActionTriggered` (buttons), `menuActionTriggered` (before the menu is presented); aggregates `allTrackingEvents`, `allEvents`; reserved ranges `applicationReserved` (for app use) and `systemReserved` (internal framework use). The control holds weak references to targets.
- macOS 27.0 adds typed `NotificationCenter.MainActorMessage` structs `NSControl.TextDidBeginEditingMessage`, `TextDidChangeMessage`, `TextDidEndEditingMessage`.
- `sendAction(_:to:)` manually dispatches an action; `performClick(_:)` simulates a mouse click.

## Related

- [NSView](./nsview.md)
- [NSButton](./nsbutton.md)
- [NSTextField](./nstextfield.md)
- [NSSlider](./nsslider.md)
