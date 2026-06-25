# Data

A value type (struct) representing a byte buffer in memory. Bridges to `NSData`/`NSMutableData` for Objective-C interoperability.

## Signature / Usage

```swift
// Create
var data = Data()
data.append(contentsOf: [1, 2, 3, 4, 5])

// From file
let fileData = try Data(contentsOf: fileURL)

// Base64
let encoded = data.base64EncodedString()

// Write to file
try data.write(to: fileURL, options: .atomic)
```

## Options / Props

| Initializer / Property | Type | Description |
|------------------------|------|-------------|
| `init()` | `Data` | Empty buffer |
| `init(count:)` | `Data` | Zero-filled buffer of given size |
| `init(contentsOf:options:)` | `Data` | Read from file URL (throws) |
| `init(base64Encoded:options:)` | `Data?` | Decode base64 string or data |
| `count` | `Int` | Number of bytes |
| `base64EncodedString(options:)` | `String` | Base64 string representation |
| `write(to:options:)` | `throws` | Write bytes to a URL |
| `subdata(in:)` | `Data` | Extract a subrange |
| `range(of:options:in:)` | `Range?` | Search for byte pattern |
| `withUnsafeBytes(_:)` | `ResultType` | Low-level byte access |

## Notes

- Available iOS 8.0+, macOS 10.10+.
- Conforms to `Collection`, `Hashable`, `Codable`, `Sendable`.
- Use `append(_:)` / `replaceSubrange(_:with:)` for mutation.

## Related

- [URLSession](./urlsession.md)
- [JSONEncoder](./jsonencoder.md)
- [JSONDecoder](./jsondecoder.md)
