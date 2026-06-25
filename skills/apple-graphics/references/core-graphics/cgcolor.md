# CGColor

A color value defined by a set of components and a color space that specifies how to interpret them. Used throughout Core Graphics for fill, stroke, and shadow colors.

## Signature / Usage

```swift
// sRGB red, fully opaque
let red = CGColor(srgbRed: 1, green: 0, blue: 0, alpha: 1)

// Reuse an existing color at half opacity
let faded = red.copy(alpha: 0.5)

// Apply to a context
context.setFillColor(red)
context.fill(CGRect(x: 0, y: 0, width: 100, height: 100))
```

## Options / Props

### Initializers

| Initializer | Description |
|-------------|-------------|
| `init(red:green:blue:alpha:)` | Generic RGB color space |
| `init(srgbRed:green:blue:alpha:)` | sRGB color space |
| `init(gray:alpha:)` | Generic gray color space |
| `init(genericGrayGamma2_2Gray:alpha:)` | Generic gray with 2.2 gamma |
| `init(genericCMYKCyan:magenta:yellow:black:alpha:)` | Generic CMYK color space |
| `init(colorSpace:components:)` | Arbitrary color space with component array |
| `init(patternSpace:pattern:components:)` | Pattern-based color |
| `copy(alpha:)` | Returns a copy with a substituted alpha value |

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `alpha` | `CGFloat` | Alpha (opacity) component |
| `colorSpace` | `CGColorSpace?` | The associated color space |
| `components` | `[CGFloat]?` | All color components including alpha |
| `numberOfComponents` | `Int` | Component count including alpha |
| `pattern` | `CGPattern?` | Pattern (for pattern color spaces only) |

### Type Properties (System Colors)

| Property | Description |
|----------|-------------|
| `CGColor.black` | Opaque black in generic gray space |
| `CGColor.white` | Opaque white in generic gray space |
| `CGColor.clear` | Fully transparent in generic gray space |

### Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `copy()` | `CGColor?` | Creates an exact copy |
| `copy(alpha:)` | `CGColor?` | Copy with a different alpha |
| `converted(to:intent:options:)` | `CGColor?` | Color converted to a different color space |

## Notes

Available on iOS 2.0+, macOS 10.3+, tvOS 9.0+, watchOS 2.0+, visionOS 1.0+. Conforms to `Equatable`, `Hashable`, `Codable`, and `Sendable`.

## Related

- [CGColorSpace](./cgcolorspace.md)
- [CGContext](./cgcontext.md)
- [CGGradient](./cggradient.md)
