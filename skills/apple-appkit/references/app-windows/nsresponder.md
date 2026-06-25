# NSResponder

An abstract class that forms the basis of event and command processing in AppKit.

## Signature / Usage

```swift
@MainActor
class NSResponder : NSObject

// Responder chain traversal
class MyView: NSView {
    override func keyDown(with event: NSEvent) {
        // handle or forward to next responder
        super.keyDown(with: event)
    }
}
```

## Options / Props

| Name / Method | Type | Description |
|---------------|------|-------------|
| `nextResponder` | `NSResponder?` | The next object in the responder chain |
| `acceptsFirstResponder` | `Bool` | Return `true` to allow this responder to become first responder |
| `becomeFirstResponder()` | `Bool` | Called when this object becomes first responder; return `true` to accept |
| `resignFirstResponder()` | `Bool` | Called when giving up first responder status |
| `validateProposedFirstResponder(_:for:)` | method | Let controls decide when they become first responder |
| `mouseDown(with:)` | override | Left mouse button pressed |
| `mouseUp(with:)` | override | Left mouse button released |
| `mouseDragged(with:)` | override | Mouse moved with left button held |
| `rightMouseDown(with:)` | override | Right mouse button pressed |
| `scrollWheel(with:)` | override | Scroll wheel event |
| `keyDown(with:)` | override | Key pressed |
| `keyUp(with:)` | override | Key released |
| `interpretKeyEvents(_:)` | method | Passes key events to the input manager for text interpretation |
| `performKeyEquivalent(with:)` | method | Handle a key equivalent (keyboard shortcut) |
| `magnify(with:)` | override | Pinch-to-zoom gesture |
| `rotate(with:)` | override | Rotation gesture |
| `swipe(with:)` | override | Three-finger swipe |
| `touchesBegan(with:)` | override | Touch began on a touch device |
| `tryToPerform(_:with:)` | method | Attempt to invoke an action; walks the chain if not handled |
| `noResponder(for:)` | method | Called when no responder in the chain handles a message |
| `presentError(_:)` | method | Display an error as an app-modal dialog |
| `undoManager` | `UndoManager?` | The undo manager for this responder |
| `menu` | `NSMenu?` | Context menu for this responder |
| `userActivity` | `NSUserActivity?` | Handoff user activity |
| `touchBar` | `NSTouchBar?` | The Touch Bar object |

## Notes

- macOS 10.0+. `NSApplication`, `NSWindow`, `NSView`, `NSViewController`, and `NSWindowController` all inherit from `NSResponder`.
- The responder chain flows: first responder → view hierarchy → window → window controller → application → app delegate.
- Always call `super` for unhandled events so they propagate correctly.

## Related

- [NSApplication](./nsapplication.md)
- [NSWindow](./nswindow.md)
- [NSViewController](./nsviewcontroller.md)
