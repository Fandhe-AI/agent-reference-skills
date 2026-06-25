# NSApplicationDelegate

A protocol that manages your app's life cycle and its interaction with common system services.

## Signature / Usage

```swift
@MainActor
protocol NSApplicationDelegate : NSObjectProtocol

class AppDelegate: NSObject, NSApplicationDelegate {
    func applicationDidFinishLaunching(_ notification: Notification) {
        // app is ready
    }
    func applicationShouldTerminateAfterLastWindowClosed(_ sender: NSApplication) -> Bool {
        return true
    }
}
```

## Options / Props

| Method | Description |
|--------|-------------|
| `applicationWillFinishLaunching(_:)` | App initialization is about to complete |
| `applicationDidFinishLaunching(_:)` | Initialization complete; safe to set up UI |
| `applicationShouldTerminate(_:)` | Return `.terminateNow`, `.terminateCancel`, or `.terminateLater` |
| `applicationWillTerminate(_:)` | Called just before the process exits |
| `applicationShouldTerminateAfterLastWindowClosed(_:)` | Return `true` to quit when all windows are closed |
| `applicationWillBecomeActive(_:)` | Called before the app gains focus |
| `applicationDidBecomeActive(_:)` | Called when the app is now active |
| `applicationWillResignActive(_:)` | Called before the app loses focus |
| `applicationDidResignActive(_:)` | Called when the app is no longer active |
| `applicationShouldHandleReopen(_:hasVisibleWindows:)` | Responds to dock-icon clicks when already running |
| `applicationWillUpdate(_:)` | Called before the app updates its windows |
| `applicationDidUpdate(_:)` | Called after windows have updated |

## Notes

- macOS 10.0+. Assign a conforming object to `NSApplication.shared.delegate` (or via `@NSApplicationMain` / `@main`).
- All methods are optional.

## Related

- [NSApplication](./nsapplication.md)
- [NSWindow](./nswindow.md)
