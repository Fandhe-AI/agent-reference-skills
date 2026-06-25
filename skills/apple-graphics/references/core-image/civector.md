# CIVector

A container for one or more `CGFloat` values used as filter parameters. Used to pass coordinate points, rectangles, affine transforms, convolution weight arrays, or arbitrary parameter lists to `CIFilter` and `CIKernel`.

## Signature / Usage

```swift
// Point (2 values)
let point = CIVector(cgPoint: CGPoint(x: 100, y: 200))

// Rectangle (4 values)
let rect = CIVector(cgRect: CGRect(x: 0, y: 0, width: 100, height: 100))

// Affine transform (6 values)
let transform = CIVector(cgAffineTransform: CGAffineTransform(scaleX: 2, y: 2))

// Arbitrary values
let weights = CIVector(values: [0.0, 0.2, 0.0, 0.2, 0.2, 0.2, 0.0, 0.2, 0.0], count: 9)
```

## Options / Props

### Initializers

| Initializer | Description |
|-------------|-------------|
| `init(x:)` | Single value |
| `init(x:y:)` | Two values (point) |
| `init(x:y:z:)` | Three values |
| `init(x:y:z:w:)` | Four values |
| `init(values:count:)` | Arbitrary number of values |
| `init(cgPoint:)` | From CGPoint |
| `init(cgRect:)` | From CGRect |
| `init(cgAffineTransform:)` | From CGAffineTransform |
| `init(string:)` | Parse from string representation |

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `x` | `CGFloat` | First value |
| `y` | `CGFloat` | Second value |
| `z` | `CGFloat` | Third value |
| `w` | `CGFloat` | Fourth value |
| `count` | `Int` | Number of values |
| `cgPointValue` | `CGPoint` | Conversion to CGPoint |
| `cgRectValue` | `CGRect` | Conversion to CGRect |
| `cgAffineTransformValue` | `CGAffineTransform` | Conversion to CGAffineTransform |
| `stringRepresentation` | `String` | Formatted string of all values |

### Methods

| Method | Description |
|--------|-------------|
| `value(at index: Int) -> CGFloat` | Value at a specific index |

## Notes

- iOS 5.0+, iPadOS 5.0+, macOS 10.4+, Mac Catalyst 13.1+, tvOS, visionOS 1.0+
- Immutable; conforms to `NSCoding`, `NSCopying`, `NSSecureCoding`, `Sendable`.

## Related

- [CIFilter](./cifilter.md)
- [CIColor](./cicolor.md)
- [CIKernel](./cikernel.md)
