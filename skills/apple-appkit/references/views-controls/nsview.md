# NSView

The infrastructure for drawing, printing, and handling events in an app. The foundational class for all visual content in AppKit.

## Signature / Usage

```swift
@MainActor class NSView : NSResponder
```

```swift
// Initialize with a frame
let view = NSView(frame: NSRect(x: 0, y: 0, width: 200, height: 100))

// Subclass to draw custom content
class MyView: NSView {
    override func draw(_ dirtyRect: NSRect) {
        NSColor.blue.setFill()
        dirtyRect.fill()
    }
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `frame` | `NSRect` | Position and size in the superview's coordinate system |
| `bounds` | `NSRect` | Internal origin and size in the view's own coordinate system |
| `window` | `NSWindow?` | The window containing this view |
| `needsDisplay` | `Bool` | Set to `true` to schedule a redraw |
| `cornerConfiguration` | `NSView.CornerConfiguration` | Corner style (square, capsule, concentric, etc.) |
| `effectiveCornerRadii` | `NSDirectionalRectEdge` | Effective radius of each corner |
| `textSelectionManager` | `NSTextSelectionManager?` | Text selection manager for this view |
| `writingToolsCoordinator` | `NSWritingToolsCoordinator?` | Coordinator for Writing Tools support |

## Notes

- Platform: macOS. Subclass NSView to implement custom drawing or event handling.
- Override `draw(_:)` to render content; prefer `updateLayer()` when using Core Animation layers.
- For event-handling methods (e.g., `mouseDown(with:)`), do **not** call `super` unless you want to pass the event up the responder chain — except for `rightMouseDown(with:)`, which should call `super` to support contextual menus.

## Related

- [NSControl](./nscontrol.md)
- [NSScrollView](./nsscrollview.md)
- [NSStackView](./nsstackview.md)
