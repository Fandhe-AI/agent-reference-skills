# JSONEncoder

A class that encodes `Codable` Swift values into JSON `Data`.

## Signature / Usage

```swift
struct User: Codable {
    var name: String
    var age: Int
}

let encoder = JSONEncoder()
encoder.outputFormatting = [.prettyPrinted, .sortedKeys]
encoder.keyEncodingStrategy = .convertToSnakeCase
encoder.dateEncodingStrategy = .iso8601

let data = try encoder.encode(User(name: "Alice", age: 30))
print(String(data: data, encoding: .utf8)!)
// { "age": 30, "name": "Alice" }
```

## Options / Props

| Property | Type | Description |
|----------|------|-------------|
| `outputFormatting` | `JSONEncoder.OutputFormatting` | Formatting options (set literal) |
| `dateEncodingStrategy` | `JSONEncoder.DateEncodingStrategy` | How `Date` values are encoded |
| `keyEncodingStrategy` | `JSONEncoder.KeyEncodingStrategy` | How coding keys are transformed |
| `dataEncodingStrategy` | `JSONEncoder.DataEncodingStrategy` | How `Data` values are encoded |
| `userInfo` | `[CodingUserInfoKey: Any]` | Contextual info passed to `encode(to:)` |
| `encode(_:)` | `throws -> Data` | Encode a `Codable` value |

**`OutputFormatting` options:** `.prettyPrinted`, `.sortedKeys`, `.withoutEscapingSlashes`

**`DateEncodingStrategy` cases:** `.deferredToDate` (default), `.secondsSince1970`, `.millisecondsSince1970`, `.iso8601`, `.formatted(DateFormatter)`, `.custom`

**`KeyEncodingStrategy` cases:** `.useDefaultKeys` (default), `.convertToSnakeCase`, `.custom`

**`DataEncodingStrategy` cases:** `.base64` (default), `.deferredToData`, `.custom`

## Notes

- Available iOS 8.0+, macOS 10.12+.
- Reusable; create once and call `encode` multiple times.
- Conforms to `TopLevelEncoder`.
- Throws `EncodingError` on failure.

## Related

- [JSONDecoder](./jsondecoder.md)
- [PropertyListEncoder](./propertylistencoder.md)
- [Data](./data.md)
