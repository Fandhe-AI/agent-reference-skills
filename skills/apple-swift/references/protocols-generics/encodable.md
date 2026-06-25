# Encodable

A type that can encode itself to an external representation.

## Signature

```swift
protocol Encodable
```

## Usage

```swift
struct Coordinate: Encodable {
    var latitude: Double
    var longitude: Double

    enum CodingKeys: String, CodingKey {
        case latitude = "lat"
        case longitude = "lon"
    }

    func encode(to encoder: any Encoder) throws {
        var container = encoder.container(keyedBy: CodingKeys.self)
        try container.encode(latitude, forKey: .latitude)
        try container.encode(longitude, forKey: .longitude)
    }
}
```

## Notes

- Availability: iOS 8.0+, macOS 10.10+, tvOS 9.0+, watchOS 2.0+, visionOS 1.0+
- Required method: `func encode(to encoder: any Encoder) throws`
- Automatic synthesis when all stored properties conform to `Encodable`
- Use `CodingKeys` to rename or exclude properties during encoding
- Combine with `Decodable` via the `Codable` typealias

## Related

- [Codable](./codable.md)
- [Decodable](./decodable.md)
