# NSAlert

A modal dialog or sheet attached to a document window.

## Signature / Usage

```swift
@MainActor
class NSAlert : NSObject

// App-modal dialog
let alert = NSAlert()
alert.messageText = "Delete file?"
alert.informativeText = "This action cannot be undone."
alert.alertStyle = .warning
alert.addButton(withTitle: "Delete")
alert.addButton(withTitle: "Cancel")
let response = alert.runModal()  // returns NSApplication.ModalResponse

// Document-modal sheet
alert.beginSheetModal(for: window) { response in
    if response == .alertFirstButtonReturn { /* delete */ }
}
```

## Options / Props

| Name / Method | Type | Description |
|---------------|------|-------------|
| `messageText` | `String` | Bold title text of the alert |
| `informativeText` | `String` | Secondary explanatory text |
| `alertStyle` | `NSAlert.Style` | `.warning`, `.informational`, or `.critical` |
| `icon` | `NSImage?` | Custom icon replacing the default app icon |
| `accessoryView` | `NSView?` | Extra view inserted below the message text |
| `showsHelp` | `Bool` | Whether a Help button is shown |
| `helpAnchor` | `NSHelpManager.AnchorName?` | Help book anchor opened when Help is clicked |
| `delegate` | `NSAlertDelegate?` | Object queried when Help is clicked |
| `buttons` | `[NSButton]` | The response buttons in order of addition |
| `showsSuppressionButton` | `Bool` | Whether a "Don't show again" checkbox appears |
| `suppressionButton` | `NSButton?` | The suppression checkbox control |
| `window` | `NSWindow` | The underlying panel window |
| `addButton(withTitle:)` | method | Add a response button; first button is default (Return key), last is cancel (Escape key) |
| `runModal()` | method | Display as app-modal; returns `.alertFirstButtonReturn`, `.alertSecondButtonReturn`, etc. |
| `beginSheetModal(for:completionHandler:)` | method | Display as a document-modal sheet; non-blocking |
| `layout()` | method | Force immediate layout before display |
| `init(error:)` | initializer | Create a pre-filled alert from an `NSError` object |

## Notes

- macOS 10.3+. `beginSheetModal(for:completionHandler:)` is preferred over `runModal()` for document-centric apps.
- The first button added becomes the default (triggered by Return); the last button added becomes the cancel button (triggered by Escape) when there are two or more buttons.
- Response values: `.alertFirstButtonReturn` = 1000, `.alertSecondButtonReturn` = 1001, `.alertThirdButtonReturn` = 1002.

## Related

- [NSPanel](./nspanel.md)
- [NSWindow](./nswindow.md)
