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
| `cornerConfiguration` | `NSViewCornerConfiguration?` | Corner style (square, capsule, concentric, etc.). Get-only (macOS 27.0+) |
| `effectiveCornerRadii` | `NSViewCornerRadii?` | Effective radius of each corner, computed from `cornerConfiguration`; `nil` when `cornerConfiguration` is `nil` (macOS 27.0+) |
| `invalidateCornerConfiguration()` | method | Invalidates the corner configuration so it and its dependencies are recomputed (macOS 27.0+) |
| `viewDidChangeEffectiveCornerRadii()` | override point | Called when the effective corner radii changed; override to apply the radii to the view (macOS 27.0+) |
| `NSView.LayoutRegion` | `NSView.LayoutRegion` (`Equatable`, `Hashable`) | Layout region: `.safeArea(cornerAdaptation:)` or `.margins(cornerAdaptation:)` (macOS 26.0+) |
| `layoutGuide(for:)` | method | `NSLayoutGuide` for an `NSView.LayoutRegion` (macOS 26.0+) |
| `edgeInsets(for:)` | method | `NSEdgeInsets` for an `NSView.LayoutRegion` (macOS 26.0+) |
| `rect(for:)` | method | `NSRect` for an `NSView.LayoutRegion` (macOS 26.0+) |
| `prefersCompactControlSizeMetrics` | `Bool` | When `true`, descendant `NSControl`s are sized with compact metrics compatible with macOS 15.0 and earlier. Default `false` (macOS 26.0+) |
| `exclusiveGestureBehavior` | `NSView.ExclusiveGestureBehavior` | Whether gesture recognizers are exclusive in this view and its subviews. Cases `.exclusive`, `.inherit` (from superview), `.notExclusive` (macOS 27.0+) |
| `beginDraggingSession(items:gesture:source:)` | method | Starts a drag from an `NSGestureRecognizer`; returns `NSDraggingSession?` (macOS 27.0+) |
| `appEntityUIElementProvider` | `((NSView, AppEntityUIElementsContext) -> [AppEntityUIElement])?` | Provides app entity identifiers so custom view content is discoverable by Apple Intelligence and Siri when onscreen (macOS 15.4+) |
| `textSelectionManager` | `NSTextSelectionManager?` | Text selection manager for this view (macOS 27.0+) |
| `writingToolsCoordinator` | `NSWritingToolsCoordinator?` | Coordinator for Writing Tools support (macOS 15.2+) |

## Notes

- Platform: macOS. Subclass NSView to implement custom drawing or event handling.
- Override `draw(_:)` to render content; prefer `updateLayer()` when using Core Animation layers.
- For event-handling methods (e.g., `mouseDown(with:)`), do **not** call `super` unless you want to pass the event up the responder chain — except for `rightMouseDown(with:)`, which should call `super` to support contextual menus.
- macOS 27.0 adds typed `NotificationCenter.MainActorMessage` structs `NSView.FrameDidChangeMessage` and `NSView.BoundsDidChangeMessage`.
- The Apple "AppKit updates" page (https://developer.apple.com/documentation/updates/appkit) lists Info.plist keys for gesture handling: `NSViewGestureRecognizerIsExclusive`, `NSIsTouchNative`, `NSGestureRecognizerSuppressesMainMenuActions` (documented under BundleResources / Information Property List).

## Related

- [NSControl](./nscontrol.md)
- [NSScrollView](./nsscrollview.md)
- [NSStackView](./nsstackview.md)
- [Observation tracking](./observation-tracking.md)
