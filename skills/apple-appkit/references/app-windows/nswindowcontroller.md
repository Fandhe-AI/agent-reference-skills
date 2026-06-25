# NSWindowController

A controller that manages a window, usually a window stored in a nib file.

## Signature / Usage

```swift
@MainActor
class NSWindowController : NSResponder

// Load from a nib
let wc = NSWindowController(windowNibName: "MyWindow")
wc.showWindow(nil)

// Or wrap an existing window
let wc = NSWindowController(window: myWindow)
```

## Options / Props

| Name / Method | Type | Description |
|---------------|------|-------------|
| `window` | `NSWindow?` | The managed window |
| `isWindowLoaded` | `Bool` | Whether the nib has been loaded |
| `document` | `AnyObject?` | The associated `NSDocument` |
| `contentViewController` | `NSViewController?` | The window's content view controller |
| `storyboard` | `NSStoryboard?` | The storyboard the controller came from |
| `windowNibName` | `NSNib.Name?` | Name of the nib file |
| `shouldCascadeWindows` | `Bool` | Whether to offset this window from previous windows of the same type |
| `windowFrameAutosaveName` | `NSWindow.FrameAutosaveName` | Key under which the frame is saved to user defaults |
| `shouldCloseDocument` | `Bool` | Whether closing this window also closes the document |
| `showWindow(_:)` | method | Load (if needed) and bring the window to front |
| `loadWindow()` | method | Explicitly load the window from its nib |
| `close()` | method | Close the window if loaded |
| `windowWillLoad()` | override | Called before nib loading; override for pre-load setup |
| `windowDidLoad()` | override | Called after nib loading; most common override point |
| `windowTitle(forDocumentDisplayName:)` | override | Customize the window title |
| `synchronizeWindowTitleWithDocumentName()` | method | Refresh the title to match the document name |
| `dismissController(_:)` | method | Dismiss the controller (used in storyboard presentations) |

## Notes

- macOS 10.0+. In document-based apps, `NSDocument` creates and retains window controllers; you rarely create them manually.
- Override `windowDidLoad()` for post-load UI setup instead of doing it in `init`.
- Use `windowFrameAutosaveName` to persist the window size/position across launches automatically.

## Related

- [NSWindow](./nswindow.md)
- [NSViewController](./nsviewcontroller.md)
