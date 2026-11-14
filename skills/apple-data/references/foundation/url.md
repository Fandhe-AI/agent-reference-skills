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

### Deprecated in 27.3

DocC `deprecatedAt` 27.3 (iOS & iPadOS 27.3 beta SDK) with the official replacement message:

| Deprecated | Use instead |
|------------|-------------|
| `init(fileURLWithPath:)`, `init(fileURLWithPath:isDirectory:)`, `init(fileURLWithPath:relativeTo:)`, `init(fileURLWithPath:isDirectory:relativeTo:)` | `init(filePath:directoryHint:relativeTo:)` |
| `host`, `path`, `user`, `password`, `query`, `fragment` (properties) | `host(percentEncoded:)`, `path(percentEncoded:)`, `user(percentEncoded:)`, `password(percentEncoded:)`, `query(percentEncoded:)`, `fragment(percentEncoded:)` |
| `appendPathComponent(_:)`, `appendPathComponent(_:isDirectory:)` | `append(path:directoryHint:)` |
| `appendingPathComponent(_:)`, `appendingPathComponent(_:isDirectory:)` | `appending(path:directoryHint:)` |

Adapted (not in the official docs): the snippet below is composed from the replacement signatures in the table, not copied from an official example.

```swift
let fileURL = URL(filePath: "/Users/me/Documents/file.txt")
let child = fileURL.appending(path: "notes.txt", directoryHint: .notDirectory)
```

- Related deprecations at 27.3: `URLComponents.percentEncodedHost` (use `encodedHost`) and `URLSession.streamTask(with:)` (use `nw_connection_t` in Network framework instead)
- Adapted: the example above combines the replacement APIs listed in the table; it is not an official sample
- Source: https://developer.apple.com/documentation/foundation/url/init(fileurlwithpath:) , https://developer.apple.com/documentation/foundation/url/appendingpathcomponent(_:) , https://developer.apple.com/documentation/foundation/url/path , https://developer.apple.com/documentation/foundation/urlcomponents/percentencodedhost , https://developer.apple.com/documentation/foundation/urlsession/streamtask(with:) (fetched 2026-11-14, DocC JSON of the iOS & iPadOS 27.3 beta SDK)

## Related

- [URLComponents](./urlcomponents.md)
- [URLRequest](./urlrequest.md)
- [URLSession](./urlsession.md)
- [FileManager](./filemanager.md)
