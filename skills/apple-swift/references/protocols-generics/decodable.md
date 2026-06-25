# Decodable

A type that can decode itself from an external representation.

## Signature

```swift
protocol Decodable
```

## Usage

```swift
struct Product: Decodable {
    var id: Int
    var name: String
    var price: Double

    enum CodingKeys: String, CodingKey {
        case id, name
        case price = "unit_price"
    }

    init(from decoder: any Decoder) throws {
        let container = try decoder.container(keyedBy: CodingKeys.self)
        id    = try container.decode(Int.self,    forKey: .id)
        name  = try container.decode(String.self, forKey: .name)
        price = try container.decode(Double.self, forKey: .price)
    }
}

let product = try JSONDecoder().decode(Product.self, from: jsonData)
```

## Notes

- Availability: iOS 8.0+, macOS 10.10+, tvOS 9.0+, watchOS 2.0+, visionOS 1.0+
- Required initializer: `init(from decoder: any Decoder) throws`
- Automatic synthesis when all stored properties conform to `Decodable`
- `DecodingError` is thrown for missing keys, type mismatches, and data corruption
- Use `decodeIfPresent(_:forKey:)` for optional properties

## Related

- [Codable](./codable.md)
- [Encodable](./encodable.md)
