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
| `addSceneRepresentation(_:)` | method (macOS 26.0+) | Adds a SwiftUI `NSHostingSceneRepresentation<C>` (`C: Scene`) to the application |
| `applicationShouldSuppressHighDynamicRangeContent` | `Bool` (macOS 26.0+) | Whether the app should suppress HDR content per established policy. Built-in components such as `NSImageView` behave correctly automatically; use together with the messages below |
| `NSApplication.ShouldBeginSuppressingHighDynamicRangeContent` | struct (macOS 26.0+) | Message signaling the app should begin suppressing HDR content |
| `NSApplication.ShouldEndSuppressingHighDynamicRangeContent` | struct (macOS 26.0+) | Message signaling the app should end suppressing HDR content |

## Notes

- macOS 10.0+. There is exactly one `NSApplication` instance per process; calling `NSApplication.shared` initializes the display environment.
- Avoid subclassing; prefer `NSApplicationDelegate` for lifecycle hooks.
- `NSApp` is a global variable equivalent to `NSApplication.shared`.
- macOS 27.0 adds typed `NotificationCenter.MainActorMessage` structs (17 in total), e.g. `DidBecomeActiveMessage`, `WillTerminateMessage`, `WillFinishLaunchingMessage`, `DidHideMessage`, `ProtectedDataDidBecomeAvailableMessage`.
- Call `activate()` to bring the app to the front programmatically.

## Related

- [NSApplicationDelegate](./nsapplicationdelegate.md)
- [NSWindow](./nswindow.md)
- [NSMenu](./nsmenu.md)
