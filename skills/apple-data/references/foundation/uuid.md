# UUID

A struct representing a universally unique identifier conforming to RFC 4122. Generates version 4 (random) UUIDs by default.

## Signature / Usage

```swift
// Generate new UUID
let id = UUID()
print(id.uuidString)  // e.g., "E621E1F8-C36C-495A-93FC-0C247A3E6E5F"

// Parse from string
if let existing = UUID(uuidString: "E621E1F8-C36C-495A-93FC-0C247A3E6E5F") {
    print(existing)
}
```

## Options / Props

| Initializer / Property | Type | Description |
|------------------------|------|-------------|
| `init()` | `UUID` | Generate a new random (RFC 4122 v4) UUID |
| `init?(uuidString:)` | `UUID?` | Parse from hyphenated UUID string |
| `init(uuid:)` | `UUID` | Create from a C `uuid_t` tuple |
| `uuidString` | `String` | Uppercase hyphenated string (`"XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX"`) |
| `uuid` | `(UInt8, ..., UInt8)` | Raw 16-byte tuple |
| `random(using:)` (static) | `UUID` | Generate using a custom `RandomNumberGenerator` |

## Notes

- Available iOS 6.0+, macOS 10.8+.
- Conforms to `Equatable`, `Hashable`, `Codable`, `Sendable`.
- Bridges to `NSUUID`.
- `uuidString` is always uppercase; when parsing, the initializer is case-insensitive.

## Related

- [Data](./data.md)
