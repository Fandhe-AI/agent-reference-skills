# NSPanel

A special kind of window that typically performs a function auxiliary to the main window.

## Signature / Usage

```swift
@MainActor
class NSPanel : NSWindow

// Create a utility panel
let panel = NSPanel(
    contentRect: NSRect(x: 0, y: 0, width: 300, height: 400),
    styleMask: [.titled, .closable, .utilityWindow],
    backing: .buffered,
    defer: false
)
panel.isFloatingPanel = true
panel.becomesKeyOnlyIfNeeded = true
panel.orderFront(nil)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `isFloatingPanel` | `Bool` | When `true`, the panel floats above normal windows at a higher window level |
| `becomesKeyOnlyIfNeeded` | `Bool` | Panel becomes key only when it contains a control that needs key input; otherwise it doesn't steal key status |
| `worksWhenModal` | `Bool` | When `true`, the panel receives keyboard and mouse events even while a modal window is running |

## Notes

- macOS 10.0+. `NSPanel` inherits all of `NSWindow`'s API; the three properties above are the only additions.
- System subclasses include `NSColorPanel`, `NSFontPanel`, `NSSavePanel`, and `NSOpenPanel`.
- Use the `.utilityWindow` style mask bit for the smaller utility-window title bar appearance.
- Modal return values (`NSApplication.ModalResponse.OK`, `.cancel`) are defined on `NSApplication.ModalResponse`, not on `NSPanel`.

## Related

- [NSWindow](./nswindow.md)
- [NSAlert](./nsalert.md)
