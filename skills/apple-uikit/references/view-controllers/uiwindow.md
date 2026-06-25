# UIWindow

The backdrop for your app's user interface and the object that dispatches events to your views.

## Signature / Usage

```swift
@MainActor
class UIWindow : UIView
```

```swift
// Scene-based setup (iOS 13+)
let window = UIWindow(windowScene: windowScene)
window.rootViewController = MyViewController()
window.makeKeyAndVisible()
```

## Options / Props

| Property | Type | Description |
|----------|------|-------------|
| `rootViewController` | `UIViewController?` | The root view controller providing the window's content |
| `windowScene` | `UIWindowScene?` | The scene that contains this window |
| `windowLevel` | `UIWindow.Level` | Z-axis position; `.normal`, `.statusBar`, `.alert` |
| `isKeyWindow` | `Bool` | Whether this window is currently the key window |
| `canBecomeKey` | `Bool` | Whether this window can become the key window |

## Key Methods

```swift
// Show the window and make it the key window
func makeKeyAndVisible()

// Make key without showing
func makeKey()

// Lifecycle callbacks (override in subclass if needed)
func becomeKey()
func resignKey()

// Event dispatch
func sendEvent(_ event: UIEvent)
```

## Window Levels

```swift
UIWindow.Level.normal      // Standard application window
UIWindow.Level.statusBar   // Above normal windows
UIWindow.Level.alert       // Above status bar (for alerts)
```

## Notifications

```swift
UIWindow.didBecomeKeyNotification    // Posted when window becomes key
UIWindow.didResignKeyNotification    // Posted when window resigns key status
UIWindow.didBecomeVisibleNotification
UIWindow.didBecomeHiddenNotification
```

## Notes

- iOS 2.0+, iPadOS 2.0+, Mac Catalyst 13.1+, tvOS, visionOS 1.0+
- Only one window at a time is the key window; it receives events without a coordinate value (e.g., keyboard events).
- In scene-based apps (iOS 13+), use `UIWindow(windowScene:)` instead of the frame-based initializer.
- The `screen` property is deprecated in iOS 16+; use `windowScene` instead.

## Related

- [UIWindowScene](./uiwindowscene.md)
- [UIViewController](./uiviewcontroller.md)
- [UIResponder](./uiresponder.md)
