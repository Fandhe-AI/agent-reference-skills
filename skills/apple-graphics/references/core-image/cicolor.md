# CIColor

Defines a color for use with Core Image filters. Uses unpremultiplied color components and an associated `CGColorSpace`. Supports SDR (0.0–1.0) and HDR (values outside that range) representations.

## Signature / Usage

```swift
// sRGB color with explicit alpha
let red = CIColor(red: 1.0, green: 0.0, blue: 0.0, alpha: 1.0)

// From CGColor
let color = CIColor(cgColor: uiColor.cgColor)

// With custom color space
let p3Color = CIColor(red: 1.0, green: 0.0, blue: 0.0,
                      colorSpace: CGColorSpace(name: CGColorSpace.displayP3)!)!

// Predefined constants
let clear = CIColor.clear
```

## Options / Props

### Initializers

| Initializer | Description |
|-------------|-------------|
| `init(red:green:blue:alpha:)` | sRGB color with explicit alpha |
| `init(red:green:blue:)` | sRGB color, alpha defaults to 1.0 |
| `init(cgColor:)` | Wrap a CGColor |
| `init(string:)` | Parse from string representation |
| `init?(red:green:blue:colorSpace:)` | Color in custom color space |
| `init?(red:green:blue:alpha:colorSpace:)` | Color with alpha in custom color space |

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `red` | `CGFloat` | Unpremultiplied red component |
| `green` | `CGFloat` | Unpremultiplied green component |
| `blue` | `CGFloat` | Unpremultiplied blue component |
| `alpha` | `CGFloat` | Alpha (opacity) value |
| `colorSpace` | `CGColorSpace` | Associated color space |
| `numberOfComponents` | `Int` | Number of components including alpha |
| `components` | `UnsafePointer<CGFloat>` | Pointer to the component array |
| `stringRepresentation` | `String` | Formatted string of all components |

### Preset Constants

`CIColor.black`, `.white`, `.red`, `.green`, `.blue`, `.cyan`, `.magenta`, `.yellow`, `.gray`, `.clear`

## Notes

- iOS 5.0+, iPadOS 5.0+, macOS 10.4+, Mac Catalyst 13.1+, tvOS, visionOS 1.0+
- CIColor uses **unpremultiplied** components; CIKernel samplers use premultiplied values.
- HDR values (outside 0.0–1.0) are valid and represent extended dynamic range colors.

## Related

- [CIImage](./ciimage.md)
- [CIFilter](./cifilter.md)
- [CIVector](./civector.md)
