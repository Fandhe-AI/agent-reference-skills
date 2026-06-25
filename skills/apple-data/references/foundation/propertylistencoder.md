# PropertyListEncoder

A class that encodes `Codable` Swift values into property list (`plist`) format.

## Signature / Usage

```swift
struct Config: Codable {
    var theme: String
    var fontSize: Int
}

let encoder = PropertyListEncoder()
encoder.outputFormat = .xml

let data = try encoder.encode(Config(theme: "dark", fontSize: 14))
// data contains XML property list bytes
```

## Options / Props

| Property / Method | Type | Description |
|-------------------|------|-------------|
| `init()` | `PropertyListEncoder` | Create encoder with default settings |
| `outputFormat` | `PropertyListSerialization.PropertyListFormat` | Output format |
| `userInfo` | `[CodingUserInfoKey: any Sendable]` | Contextual info |
| `encode(_:)` | `throws -> Data` | Encode a `Codable` value to plist `Data` |

**`PropertyListSerialization.PropertyListFormat` cases:**

| Case | Description |
|------|-------------|
| `.xml` | Human-readable XML format |
| `.binary` | Compact binary format |
| `.openStep` | Legacy NeXTSTEP ASCII format |

## Notes

- Available iOS 8.0+, macOS 10.10+.
- Conforms to `TopLevelEncoder`.
- Property lists support only: `String`, `Data`, `Date`, `Int`, `Double`, `Bool`, `Array`, `Dictionary` (keys must be `String`). Custom types must map to these.
- Use `PropertyListDecoder` to reverse the operation.

## Related

- [JSONEncoder](./jsonencoder.md)
- [JSONDecoder](./jsondecoder.md)
- [Data](./data.md)
