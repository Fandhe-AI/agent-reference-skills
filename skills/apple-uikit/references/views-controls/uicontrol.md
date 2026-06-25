# UIControl

The base class for controls—visual elements that convey a specific action in response to user interactions via the target-action mechanism.

## Signature / Usage

```swift
@MainActor
class UIControl : UIView

// Do not instantiate directly; use concrete subclasses.
// Example with UIButton (a UIControl subclass):
let button = UIButton(type: .system)
button.addTarget(self, action: #selector(handleTap), for: .touchUpInside)

// Modern UIAction API (iOS 14+)
button.addAction(UIAction { _ in print("tapped") }, for: .primaryActionTriggered)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `state` | `UIControl.State` | Read-only combination of current state flags |
| `isEnabled` | `Bool` | Disables user interaction and dims appearance when `false` |
| `isSelected` | `Bool` | Selected state flag |
| `isHighlighted` | `Bool` | Highlighted state flag (active during touch) |
| `isTracking` | `Bool` | Read-only; `true` while tracking a touch |
| `isTouchInside` | `Bool` | Read-only; `true` when tracked touch is inside bounds |
| `contentHorizontalAlignment` | `UIControl.ContentHorizontalAlignment` | Horizontal content alignment |
| `contentVerticalAlignment` | `UIControl.ContentVerticalAlignment` | Vertical content alignment |

**Target-action methods (traditional):**

| Method | Description |
|--------|-------------|
| `addTarget(_:action:for:)` | Register a target/selector for events |
| `removeTarget(_:action:for:)` | Unregister a target/selector |
| `sendActions(for:)` | Programmatically fire events |

**UIAction methods (iOS 14+):**

| Method | Description |
|--------|-------------|
| `addAction(_:for:)` | Attach a `UIAction` closure |
| `removeAction(_:for:)` | Remove a `UIAction` |
| `sendAction(_:)` | Fire a `UIAction` programmatically |

**Common `UIControl.Event` values:**

| Event | Description |
|-------|-------------|
| `.touchDown` | Touch begins inside the control |
| `.touchUpInside` | Touch ends inside (most common for buttons) |
| `.touchUpOutside` | Touch ends outside |
| `.valueChanged` | Control value changed (sliders, switches, pickers) |
| `.primaryActionTriggered` | Primary action (iOS 9+) |
| `.editingChanged` | Text field content changed |
| `.editingDidBegin` / `.editingDidEnd` | Text editing started/ended |

## Notes

- Available iOS 2.0+, iPadOS 2.0+, Mac Catalyst 13.1+, tvOS, visionOS 1.0+.
- Do not instantiate `UIControl` directly; use subclasses (`UIButton`, `UISwitch`, `UISlider`, etc.).
- Passing `nil` as the target in `addTarget(_:action:for:)` walks the responder chain to find a handler.
- Override `beginTracking(_:with:)`, `continueTracking(_:with:)`, `endTracking(_:with:)`, and `cancelTracking(with:)` when building custom controls.

## Related

- [UIView](./uiview.md)
- [UIButton](./uibutton.md)
- [UISlider](./uislider.md)
- [UISwitch](./uiswitch.md)
- [UISegmentedControl](./uisegmentedcontrol.md)
