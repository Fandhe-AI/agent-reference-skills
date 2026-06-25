# CGSize

A structure containing width and height values. Can also represent a distance vector (values may be negative).

## Signature / Usage

```swift
let size = CGSize(width: 320, height: 480)
let scaled = size.applying(CGAffineTransform(scaleX: 2, y: 2))
// CGSize(width: 640.0, height: 960.0)
```

## Options / Props

### Initializers

| Initializer | Description |
|-------------|-------------|
| `init()` | Zero size |
| `init(width:height:)` | From `Double` (or `Int`) values |
| `init?(dictionaryRepresentation:)` | From a `CFDictionary` |

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `width` | `Double` | Horizontal extent |
| `height` | `Double` | Vertical extent |

### Type Properties

| Property | Description |
|----------|-------------|
| `CGSize.zero` | Size with zero width and height |

### Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `applying(_:)` | `CGSize` | Returns the size after applying a `CGAffineTransform` |
| `equalTo(_:)` | `Bool` | Equality comparison |

## Notes

Available on iOS 2.0+, macOS 10.0+, tvOS 9.0+, watchOS 2.0+, visionOS 1.0+. Conforms to `Codable`, `Equatable`, `Hashable`, `Animatable`, and `Sendable`. Normalize a `CGRect` with a negative size using `CGRect.standardized`.

## Related

- [CGRect](./cgrect.md)
- [CGPoint](./cgpoint.md)
- [CGAffineTransform](./cgaffinetransform.md)
