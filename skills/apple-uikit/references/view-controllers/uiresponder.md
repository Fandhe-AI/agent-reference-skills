# UIResponder

An abstract interface for responding to and handling events.

## Signature / Usage

```swift
@MainActor
class UIResponder
```

`UIResponder` is the base class for `UIApplication`, `UIViewController`, and all `UIView` subclasses. Unhandled events travel up the responder chain via the `next` property.

```swift
class MyView: UIView {
    override func touchesBegan(_ touches: Set<UITouch>, with event: UIEvent?) {
        // Handle touch or call super to pass up the chain
        super.touchesBegan(touches, with: event)
    }
}
```

## Options / Props

| Property | Type | Description |
|----------|------|-------------|
| `next` | `UIResponder?` | The next responder in the responder chain |
| `isFirstResponder` | `Bool` | Whether this object is currently the first responder |
| `canBecomeFirstResponder` | `Bool` | Override to return `true` to allow first responder status |
| `canResignFirstResponder` | `Bool` | Override to return `false` to prevent resigning |

## Key Methods

```swift
// First responder
func becomeFirstResponder() -> Bool
func resignFirstResponder() -> Bool

// Touch events
func touchesBegan(_ touches: Set<UITouch>, with event: UIEvent?)
func touchesMoved(_ touches: Set<UITouch>, with event: UIEvent?)
func touchesEnded(_ touches: Set<UITouch>, with event: UIEvent?)
func touchesCancelled(_ touches: Set<UITouch>, with event: UIEvent?)

// Press events (tvOS / hardware keyboard)
func pressesBegan(_ presses: Set<UIPress>, with event: UIPressesEvent?)
func pressesChanged(_ presses: Set<UIPress>, with event: UIPressesEvent?)
func pressesEnded(_ presses: Set<UIPress>, with event: UIPressesEvent?)
func pressesCancelled(_ presses: Set<UIPress>, with event: UIPressesEvent?)

// Motion events (device shake)
func motionBegan(_ motion: UIEvent.EventSubtype, with event: UIEvent?)
func motionEnded(_ motion: UIEvent.EventSubtype, with event: UIEvent?)
func motionCancelled(_ motion: UIEvent.EventSubtype, with event: UIEvent?)

// Remote control events (media keys)
func remoteControlReceived(with event: UIEvent?)
```

## Responder Chain Order

For a typical view hierarchy, the chain flows:

`UIView` → parent `UIView`(s) → `UIViewController` → `UIWindow` → `UIApplication` → `UIApplicationDelegate`

## Notes

- iOS 2.0+, iPadOS 2.0+, Mac Catalyst 13.1+, tvOS, visionOS 1.0+
- `UIViewController` is a `UIResponder`; it sits in the chain between its root view and the root view's superview.
- Only one object can be the first responder at a time per `UIWindow`; it typically receives keyboard input.
- Call `super` in event-handling methods to propagate events up the chain when not handled.

## Related

- [UIViewController](./uiviewcontroller.md)
- [UIWindow](./uiwindow.md)
