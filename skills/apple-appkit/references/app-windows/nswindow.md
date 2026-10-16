# NSWindow

A window that an app displays on the screen.

## Signature / Usage

```swift
@MainActor
class NSWindow : NSResponder

// Create a window programmatically
let window = NSWindow(
    contentRect: NSRect(x: 100, y: 100, width: 800, height: 600),
    styleMask: [.titled, .closable, .miniaturizable, .resizable],
    backing: .buffered,
    defer: false
)
window.contentViewController = MyViewController()
window.makeKeyAndOrderFront(nil)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `delegate` | `NSWindowDelegate?` | Object receiving window lifecycle callbacks |
| `contentViewController` | `NSViewController?` | Primary view controller whose view fills the content area |
| `contentView` | `NSView?` | The root view of the window |
| `styleMask` | `NSWindow.StyleMask` | Combination of `.titled`, `.closable`, `.resizable`, `.fullSizeContentView`, etc. |
| `frame` | `NSRect` | Current window frame in screen coordinates |
| `minSize` / `maxSize` | `NSSize` | Size constraints |
| `isVisible` | `Bool` | Whether the window is on screen |
| `isKeyWindow` | `Bool` | Whether the window currently accepts key input |
| `isMainWindow` | `Bool` | Whether the window is the main window |
| `isZoomed` | `Bool` | Whether the window occupies the full screen in its current `zoom(_:)` state |
| `level` | `NSWindow.Level` | Window stacking level (e.g., `.normal`, `.floating`) |
| `toolbar` | `NSToolbar?` | The toolbar shown below/integrated with the title bar |
| `isReleasedWhenClosed` | `Bool` | Whether the window releases itself when closed (default `true` in Obj-C; set to `false` in Swift) |
| `isRestorable` | `Bool` | Whether the window participates in state restoration |
| `alphaValue` | `CGFloat` | Window opacity (0.0–1.0) |
| `backgroundColor` | `NSColor` | Window background color |
| `hasShadow` | `Bool` | Whether the window casts a shadow |
| `tabbedWindows` | `[NSWindow]?` | Windows in the same tab group |
| `beginSheet(content:completionHandler:)` | method (macOS 26.0+) | Presents a SwiftUI view as a sheet on the window. `@discardableResult`; returns `NSWindow.HostingSheetRepresentation<V>` (`V: View`) |
| `endSheet(_:)` | method (macOS 26.0+) | Ends a SwiftUI hosted sheet; takes the `NSWindow.HostingSheetRepresentation<V>` returned by `beginSheet(content:completionHandler:)` |
| `NSWindow.HostingSheetRepresentation` | class (macOS 26.0+) | A SwiftUI view hosted in an AppKit sheet |
| `cascadingReferenceFrame` | `NSRect` | Read-only reference frame for cascading (macOS 15.0+) |
| `requestSharingOfWindow(_:completionHandler:)` | method (macOS 15.0+) | Requests sharing of a window; completion receives an optional `Error` |
| `requestSharingOfWindow(usingPreview:title:completionHandler:)` | method (macOS 15.0+) | Requests sharing using a preview `NSImage` and title |
| `beginDraggingSession(items:event:source:)` | method (macOS 15.0+) | Starts a drag with `[NSDraggingItem]`, an `NSEvent` and an `NSDraggingSource`; returns `NSDraggingSession` |

## Notes

- macOS 10.0+. `NSWindow` inherits from `NSResponder` but does **not** support `NSCoding`; archiving a window raises an exception.
- In Swift, always set `isReleasedWhenClosed = false` when holding a strong reference to the window, to avoid double-free.
- Deprecated in macOS 27.0: `showsToolbarButton` and `drag(_:at:offset:event:pasteboard:source:slideBack:)` (use `beginDraggingSession(items:event:source:)`). `disableScreenUpdatesUntilFlush()` is deprecated in macOS 15.0.
- macOS 27.0 adds typed `NotificationCenter.MainActorMessage` structs for window notifications (29 in total), e.g. `NSWindow.DidResizeMessage`, `WillCloseMessage`, `DidBecomeKeyMessage`, `DidEnterFullScreenMessage`, `DidMoveMessage`, `WillBeginSheetMessage`.
- Use `makeKeyAndOrderFront(_:)` to show and focus a window; use `orderOut(_:)` to hide it without releasing it.

## Related

- [NSWindowController](./nswindowcontroller.md)
- [NSViewController](./nsviewcontroller.md)
- [NSPanel](./nspanel.md)
- [NSToolbar](./nstoolbar.md)
- [NSResponder](./nsresponder.md)
