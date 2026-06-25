# UIGestureRecognizer

The abstract base class for gesture recognizers. Decouples the logic for recognizing a touch sequence from the action that recognition triggers.

## Signature / Usage

```swift
@MainActor
class UIGestureRecognizer : NSObject

// Use a concrete subclass
let tap = UITapGestureRecognizer(target: self, action: #selector(handleTap(_:)))
tap.numberOfTapsRequired = 1
view.addGestureRecognizer(tap)

@objc func handleTap(_ recognizer: UITapGestureRecognizer) {
    let location = recognizer.location(in: view)
    print("Tapped at:", location)
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `state` | `UIGestureRecognizer.State` | Current recognition state (read-only for clients) |
| `isEnabled` | `Bool` | Disables recognition when `false` |
| `view` | `UIView?` | The view the recognizer is attached to |
| `delegate` | `UIGestureRecognizerDelegate?` | Fine-grained control over recognition and simultaneous recognition |
| `cancelsTouchesInView` | `Bool` | Cancels touches delivered to the view when gesture is recognized (default `true`) |
| `delaysTouchesBegan` | `Bool` | Delays delivery of touch-began events to the view |
| `delaysTouchesEnded` | `Bool` | Delays delivery of touch-ended events |
| `requiresExclusiveTouchType` | `Bool` | Restricts recognition to one touch type |

**Key methods:**

| Method | Description |
|--------|-------------|
| `addTarget(_:action:)` | Register additional target/selector pairs |
| `removeTarget(_:action:)` | Unregister a target/selector |
| `location(in:)` | Centroid location of recognized touch(es) in a view |
| `location(ofTouch:in:)` | Location of a specific touch |
| `require(toFail:)` | Delay recognition until another recognizer fails |

**`UIGestureRecognizer.State` values:**

| State | Description |
|-------|-------------|
| `.possible` | Default; evaluating but not yet recognized |
| `.began` | Continuous gesture started |
| `.changed` | Continuous gesture parameters updated |
| `.ended` / `.recognized` | Gesture successfully completed |
| `.cancelled` | System cancelled the gesture |
| `.failed` | Sequence cannot be recognized |

## Concrete Subclasses

| Class | Type | Description |
|-------|------|-------------|
| `UITapGestureRecognizer` | Discrete | Single or multiple taps |
| `UIPanGestureRecognizer` | Continuous | Drag / pan |
| `UISwipeGestureRecognizer` | Discrete | Directional swipe |
| `UILongPressGestureRecognizer` | Continuous | Press and hold |
| `UIPinchGestureRecognizer` | Continuous | Two-finger pinch (scale) |
| `UIRotationGestureRecognizer` | Continuous | Two-finger rotation |
| `UIScreenEdgePanGestureRecognizer` | Continuous | Pan from screen edge |
| `UIHoverGestureRecognizer` | Continuous | Pointer hover (Catalyst/iPadOS pointer) |

## Notes

- Available iOS 3.2+, iPadOS 3.2+, Mac Catalyst 13.1+, tvOS, visionOS 1.0+.
- Attach via `UIView.addGestureRecognizer(_:)`; the recognizer does not participate in the responder chain.
- For discrete gestures: state transitions `possible` → `recognized` | `failed`.
- For continuous gestures: `possible` → `began` → `changed`* → `ended` | `cancelled`.
- To build a custom recognizer, import `UIKit.UIGestureRecognizerSubclass` and override the touch-phase methods.

## Related

- [UIView](./uiview.md)
- [UIControl](./uicontrol.md)
