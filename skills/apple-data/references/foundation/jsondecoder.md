# JSONDecoder

A class that decodes `Codable` Swift values from JSON `Data`.

## Signature / Usage

```swift
struct User: Codable {
    var name: String
    var age: Int
}

let json = """
{"name":"Alice","age":30}
""".data(using: .utf8)!

let decoder = JSONDecoder()
decoder.keyDecodingStrategy = .convertFromSnakeCase
decoder.dateDecodingStrategy = .iso8601

let user = try decoder.decode(User.self, from: json)
print(user.name)  // "Alice"
```

## Options / Props

| Property | Type | Description |
|----------|------|-------------|
| `dateDecodingStrategy` | `JSONDecoder.DateDecodingStrategy` | How JSON date values are decoded |
| `keyDecodingStrategy` | `JSONDecoder.KeyDecodingStrategy` | How JSON keys map to coding keys |
| `dataDecodingStrategy` | `JSONDecoder.DataDecodingStrategy` | How JSON strings decode to `Data` |
| `nonConformingFloatDecodingStrategy` | `JSONDecoder.NonConformingFloatDecodingStrategy` | Handle NaN / Infinity |
| `allowsJSON5` | `Bool` | Accept JSON5 syntax (comments, trailing commas) |
| `assumesTopLevelDictionary` | `Bool` | Treat top-level value as dictionary |
| `userInfo` | `[CodingUserInfoKey: Any]` | Contextual info passed to `init(from:)` |
| `decode(_:from:)` | `throws -> T` | Decode `Data` into a `Codable` type |

**`DateDecodingStrategy` cases:** `.deferredToDate` (default), `.secondsSince1970`, `.millisecondsSince1970`, `.iso8601`, `.formatted(DateFormatter)`, `.custom`

**`KeyDecodingStrategy` cases:** `.useDefaultKeys` (default), `.convertFromSnakeCase`, `.custom`

**`DataDecodingStrategy` cases:** `.base64` (default), `.deferredToData`, `.custom`

## Notes

- Available iOS 8.0+, macOS 10.12+.
- Reusable across multiple `decode` calls.
- Conforms to `TopLevelDecoder`.
- Throws `DecodingError` on failure (`.keyNotFound`, `.typeMismatch`, `.valueNotFound`, `.dataCorrupted`).

## Related

- [JSONEncoder](./jsonencoder.md)
- [PropertyListEncoder](./propertylistencoder.md)
- [Data](./data.md)
