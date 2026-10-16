# NSSavePanel

A panel that prompts the user for information about where to save a file.

## Signature / Usage

```swift
@MainActor
class NSSavePanel : NSPanel

class func savePanel() -> NSSavePanel
func runModal() -> NSApplication.ModalResponse
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `url` | `URL?` | The fully specified location of the targeted file |
| `directoryURL` | `URL?` | The current directory shown in the panel |
| `nameFieldStringValue` | `String` | The user-editable filename shown in the name field |
| `nameFieldLabel` | `String!` | Label text in front of the filename field |
| `allowedContentTypes` | `[UTType]` | Content types to which you can save |
| `allowsOtherFileTypes` | `Bool` | Whether the user may save with an extension not in the allowed types |
| `currentContentType` | `UTType?` | Currently selected content type |
| `showsContentTypes` | `Bool` | Whether to show a popup list for selecting the saved file type |
| `canCreateDirectories` | `Bool` | Whether the panel displays UI for creating directories |
| `canSelectHiddenExtension` | `Bool` | Whether the panel shows UI for hiding or showing filename extensions |
| `isExtensionHidden` | `Bool` | Whether to display filename extensions |
| `showsHiddenFiles` | `Bool` | Whether the panel displays normally hidden files |
| `showsTagField` | `Bool` | Whether the panel displays the Tags field |
| `tagNames` | `[String]?` | Tag names to include on the saved file |
| `treatsFilePackagesAsDirectories` | `Bool` | Whether file packages are displayed as directories |
| `accessoryView` | `NSView?` | Custom accessory view |
| `title` / `prompt` / `message` | `String!` | Title, default-button text and message text |
| `isExpanded` | `Bool` | Whether the panel is expanded |
| `delegate` | `(any NSOpenSavePanelDelegate)?` | Validates selection and responds to interactions |
| `begin(completionHandler:)` | method | Presents the panel as a modeless window |
| `beginSheetModal(for:completionHandler:)` | method | Presents the panel as a sheet modal to the specified window |
| `runModal()` | method | Displays the panel and begins its event loop |
| `ok(_:)` / `cancel(_:)` | methods | Actions called when the user clicks OK / Cancel |
| `validateVisibleColumns()` | method | Validates and reloads the visible browser columns |

## Notes

- Inherits from `NSPanel`; `NSOpenPanel` inherits from `NSSavePanel`.
- In macOS 10.15 and later, the system always displays the Save dialog in a separate process regardless of sandboxing. On save, macOS adds the file to the app's sandbox if necessary.
- The panel reports interactions to its delegate, which must adopt `NSOpenSavePanelDelegate`.
- `NSApplication.ModalResponse` values (`.OK`, `.cancel`) are defined on `NSApplication`.

## Related

- [NSOpenPanel](./nsopenpanel.md)
- [NSPanel](./nspanel.md)
- [NSWindow](./nswindow.md)
