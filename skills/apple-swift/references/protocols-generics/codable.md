# Codable

A type alias for `Encodable & Decodable`. A type that can convert itself into and out of an external representation.

## Signature

```swift
typealias Codable = Decodable & Encodable
```

## Usage

```swift
struct Person: Codable {
    var name: String
    var age: Int
}

// Encode to JSON
let encoder = JSONEncoder()
let data = try encoder.encode(Person(name: "Alice", age: 30))

// Decode from JSON
let decoder = JSONDecoder()
let person = try decoder.decode(Person.self, from: data)
```

## Notes

- Availability: iOS 8.0+, macOS 10.10+, tvOS 9.0+, watchOS 2.0+, visionOS 1.0+
- Automatic synthesis is provided when all stored properties also conform to `Codable`
- Use `CodingKeys` enum to customize property-to-key mapping
- Custom encoding/decoding: implement `encode(to:)` (from `Encodable`) and `init(from:)` (from `Decodable`)
- Works with `JSONEncoder`/`JSONDecoder` (Foundation) and `PropertyListEncoder`/`PropertyListDecoder`

## Related

- [Encodable](./encodable.md)
- [Decodable](./decodable.md)
