# NSOpenPanel

A panel that prompts the user to select a file to open.

## Signature / Usage

```swift
class NSOpenPanel : NSSavePanel

class func openPanel() -> NSOpenPanel
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `canChooseFiles` | `Bool` | Whether the user can choose files in the panel |
| `canChooseDirectories` | `Bool` | Whether the user can choose directories in the panel |
| `allowsMultipleSelection` | `Bool` | Whether the user may select multiple files and directories |
| `resolvesAliases` | `Bool` | Whether the panel resolves aliases |
| `urls` | `[URL]` | Fully specified locations of the selected files or directories |
| `isAccessoryViewDisclosed` | `Bool` | Whether the panel's accessory view is visible |
| `canDownloadUbiquitousContents` | `Bool` | How the panel responds to iCloud documents not fully downloaded locally |
| `canResolveUbiquitousConflicts` | `Bool` | How the panel responds to iCloud documents with conflicting versions |

## Notes

- Inherits from `NSSavePanel`; presenting and modal APIs (`begin`, `beginSheetModal(for:completionHandler:)`, `runModal()`, `allowedContentTypes`, `directoryURL`, `delegate`) are on `NSSavePanel`.
- In macOS 10.15 and later, the system always draws Open panels in a separate process regardless of sandboxing. When the user chooses a file, macOS adds it to the app's sandbox.

## Related

- [NSSavePanel](./nssavepanel.md)
- [NSPanel](./nspanel.md)
