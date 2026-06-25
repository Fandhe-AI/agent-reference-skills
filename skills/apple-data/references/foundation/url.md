# URL

A value type (struct) that identifies the location of a resource — remote or local. The preferred way to refer to file-system paths on Apple platforms.

## Signature / Usage

```swift
// Remote URL
let url = URL(string: "https://example.com/api/users")!

// File URL
let fileURL = URL(filePath: "/Users/me/Documents/file.txt")

// Common directories (Swift 5.9+)
let docs = URL.documentsDirectory

// Path manipulation
let child = url.appending(path: "detail").appending(queryItems: [URLQueryItem(name: "id", value: "42")])
```

## Options / Props

| Initializer / Property | Type | Description |
|------------------------|------|-------------|
| `init?(string:)` | `URL?` | Parse from a string |
| `init(filePath:directoryHint:)` | `URL` | Create a file URL |
| `init(fileURLWithPath:)` | `URL` | Create a file URL (legacy) |
| `scheme` | `String?` | URL scheme (e.g., `"https"`) |
| `host(percentEncoded:)` | `String?` | Host component |
| `port` | `Int?` | Port number |
| `path(percentEncoded:)` | `String?` | Path component |
| `query(percentEncoded:)` | `String?` | Query string |
| `fragment(percentEncoded:)` | `String?` | Fragment |
| `lastPathComponent` | `String` | Last path segment |
| `pathExtension` | `String` | File extension |
| `isFileURL` | `Bool` | Whether this is a file URL |
| `absoluteString` | `String` | Full URL string |
| `standardized` | `URL` | Resolved `.` and `..` components |
| `appending(path:)` | `URL` | New URL with path appended |
| `appending(component:)` | `URL` | Append a single path component |
| `appending(queryItems:)` | `URL` | New URL with query items appended |
| `deletingLastPathComponent()` | `URL` | Parent URL |
| `deletingPathExtension()` | `URL` | URL without extension |
| `appendingPathExtension(_:)` | `URL` | URL with extension added |
| `checkResourceIsReachable()` | `Bool` | Whether resource is accessible (throws) |
| `resourceValues(forKeys:)` | `URLResourceValues` | File system metadata |
| `startAccessingSecurityScopedResource()` | `Bool` | Begin access to security-scoped URL |
| `resourceBytes` | `URL.AsyncBytes` | Async byte sequence |
| `lines` | `AsyncLineSequence` | Async line sequence |

**Common directory statics (iOS 16+, macOS 13+):**
`URL.documentsDirectory`, `.cachesDirectory`, `.temporaryDirectory`, `.applicationSupportDirectory`, `.libraryDirectory`, `.homeDirectory`

## Notes

- Available iOS 8.0+, macOS 10.10+.
- Conforms to `Codable`, `Hashable`, `Transferable`, `Sendable`.
- Bridges to `NSURL`.
- Prefer URL-based APIs over string paths for file-system access.

## Related

- [URLComponents](./urlcomponents.md)
- [URLRequest](./urlrequest.md)
- [URLSession](./urlsession.md)
- [FileManager](./filemanager.md)
