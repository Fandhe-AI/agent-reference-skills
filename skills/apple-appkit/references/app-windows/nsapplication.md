# NSApplication

An object that manages an app's main event loop and resources used by all of that app's objects.

## Signature / Usage

```swift
@MainActor
class NSApplication : NSResponder

// Access the shared instance
let app = NSApplication.shared  // also available as NSApp global
NSApp.run()  // start the main event loop
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `shared` | `NSApplication` | The singleton app instance |
| `delegate` | `NSApplicationDelegate?` | Object receiving app lifecycle callbacks |
| `isActive` | `Bool` | Whether the app is currently active |
| `currentEvent` | `NSEvent?` | The last event object the app dequeued from the event queue |
| `windows` | `[NSWindow]` | All windows owned by the app |
| `mainWindow` | `NSWindow?` | The window receiving keyboard events |
| `keyWindow` | `NSWindow?` | The window currently accepting key input |
| `mainMenu` | `NSMenu?` | The menu bar menu |
| `appearance` | `NSAppearance?` | The appearance installed on the app |
| `effectiveAppearance` | `NSAppearance` | The resolved appearance the app uses |
| `presentationOptions` | `NSApplication.PresentationOptions` | Current presentation options |

## Notes

- macOS 10.0+. There is exactly one `NSApplication` instance per process; calling `NSApplication.shared` initializes the display environment.
- Avoid subclassing; prefer `NSApplicationDelegate` for lifecycle hooks.
- `NSApp` is a global variable equivalent to `NSApplication.shared`.
- Call `activate()` to bring the app to the front programmatically.

## Related

- [NSApplicationDelegate](./nsapplicationdelegate.md)
- [NSWindow](./nswindow.md)
- [NSMenu](./nsmenu.md)
