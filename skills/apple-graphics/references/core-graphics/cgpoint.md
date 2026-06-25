# CGPoint

A structure representing a point in a two-dimensional coordinate system.

## Signature / Usage

```swift
let point = CGPoint(x: 50, y: 100)
let transformed = point.applying(CGAffineTransform(translationX: 10, y: -5))
// CGPoint(x: 60.0, y: 95.0)
```

## Options / Props

### Initializers

| Initializer | Description |
|-------------|-------------|
| `init()` | Point at `(0, 0)` |
| `init(x:y:)` | From `Double` (or `Int`) values |
| `init?(dictionaryRepresentation:)` | From a `CFDictionary` |

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `x` | `Double` | Horizontal coordinate |
| `y` | `Double` | Vertical coordinate |

### Type Properties

| Property | Description |
|----------|-------------|
| `CGPoint.zero` | Point at `(0, 0)` |

### Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `applying(_:)` | `CGPoint` | Returns the point after applying a `CGAffineTransform` |
| `equalTo(_:)` | `Bool` | Equality comparison |

## Notes

Available on iOS 2.0+, macOS 10.0+, tvOS 9.0+, watchOS 2.0+, visionOS 1.0+. Conforms to `Codable`, `Equatable`, `Hashable`, `Animatable`, and `Sendable`.

## Related

- [CGRect](./cgrect.md)
- [CGSize](./cgsize.md)
- [CGAffineTransform](./cgaffinetransform.md)
