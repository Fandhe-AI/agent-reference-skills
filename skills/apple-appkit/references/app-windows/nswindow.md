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

## Notes

- macOS 10.0+. `NSWindow` inherits from `NSResponder` but does **not** support `NSCoding`; archiving a window raises an exception.
- In Swift, always set `isReleasedWhenClosed = false` when holding a strong reference to the window, to avoid double-free.
- Use `makeKeyAndOrderFront(_:)` to show and focus a window; use `orderOut(_:)` to hide it without releasing it.

## Related

- [NSWindowController](./nswindowcontroller.md)
- [NSViewController](./nsviewcontroller.md)
- [NSPanel](./nspanel.md)
- [NSToolbar](./nstoolbar.md)
- [NSResponder](./nsresponder.md)
