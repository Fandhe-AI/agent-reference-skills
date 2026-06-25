# FileManager

A class providing a convenient interface to the file system. The primary means of examining, creating, copying, moving, and deleting files and directories.

## Signature / Usage

```swift
let fm = FileManager.default

// Locate documents directory
let docsURL = fm.urls(for: .documentDirectory, in: .userDomainMask).first!

// Create directory
try fm.createDirectory(at: docsURL.appending(path: "AppData"), withIntermediateDirectories: true)

// Check existence
fm.fileExists(atPath: docsURL.path)

// List contents
let items = try fm.contentsOfDirectory(at: docsURL, includingPropertiesForKeys: nil)

// Remove
try fm.removeItem(at: fileURL)
```

## Options / Props

| Method / Property | Description |
|-------------------|-------------|
| `FileManager.default` (static) | Shared instance for most operations |
| `fileExists(atPath:)` | `Bool` — check if path exists |
| `fileExists(atPath:isDirectory:)` | `Bool` + directory flag |
| `createDirectory(at:withIntermediateDirectories:attributes:)` | Create directory (throws) |
| `removeItem(at:)` | Delete file or directory (throws) |
| `removeItem(atPath:)` | Delete by path string (throws) |
| `copyItem(at:to:)` | Copy file/directory (throws) |
| `moveItem(at:to:)` | Move or rename (throws) |
| `contentsOfDirectory(at:includingPropertiesForKeys:options:)` | Shallow listing as `[URL]` (throws) |
| `enumerator(at:includingPropertiesForKeys:options:)` | Deep recursive enumerator |
| `urls(for:in:)` | `[URL]` — locate system directories |
| `url(for:in:appropriateFor:create:)` | Single system directory URL (throws) |
| `attributesOfItem(atPath:)` | `[FileAttributeKey: Any]` — file metadata |
| `setAttributes(_:ofItemAtPath:)` | Set file metadata |
| `createFile(atPath:contents:attributes:)` | Create file with content |
| `contents(atPath:)` | Read file as `Data?` |
| `currentDirectoryPath` | Current working directory path |
| `homeDirectoryForCurrentUser` | Home directory `URL` |
| `temporaryDirectory` | System temp directory `URL` |
| `delegate` | `FileManagerDelegate?` for operation monitoring |

**`FileManager.SearchPathDirectory` common cases:** `.documentDirectory`, `.cachesDirectory`, `.applicationSupportDirectory`, `.libraryDirectory`, `.downloadsDirectory`, `.desktopDirectory`, `.moviesDirectory`

**`FileManager.SearchPathDomainMask`:** `.userDomainMask` (most common), `.localDomainMask`, `.networkDomainMask`

## Notes

- Available iOS 2.0+, macOS 10.0+.
- `FileManager.default` is thread-safe for most operations.
- For delegate-based operations (copy, move, remove, link), create a separate instance and assign your delegate — shared instance delegate notifications may be unreliable.
- Prefer URL-based APIs over path-string APIs.

## Related

- [URL](./url.md)
- [Bundle](./bundle.md)
- [Data](./data.md)
