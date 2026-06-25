# CGGradient

Defines a smooth color transition used to paint linear (axial) and radial gradients via `CGContext`. Requires a color space, two or more colors, and a normalized location for each color.

## Signature / Usage

```swift
let colorSpace = CGColorSpaceCreateDeviceRGB()
let colors: CFArray = [CGColor(srgbRed: 1, green: 0, blue: 0, alpha: 1),
                       CGColor(srgbRed: 0, green: 0, blue: 1, alpha: 1)] as CFArray
let locations: [CGFloat] = [0.0, 1.0]

let gradient = CGGradient(colorsSpace: colorSpace,
                           colors: colors,
                           locations: locations)!

// Draw a linear gradient
context.drawLinearGradient(gradient,
    start: CGPoint(x: 0, y: 0),
    end: CGPoint(x: 0, y: 300),
    options: [.drawsBeforeStartLocation, .drawsAfterEndLocation])

// Draw a radial gradient
context.drawRadialGradient(gradient,
    startCenter: CGPoint(x: 150, y: 150), startRadius: 0,
    endCenter: CGPoint(x: 150, y: 150), endRadius: 150,
    options: [])
```

## Options / Props

### Initializers

| Initializer | Description |
|-------------|-------------|
| `init(colorSpace:colorComponents:locations:count:)` | From raw component values (flat array: `[r, g, b, a, r, g, b, a, ...]`) |
| `init(colorsSpace:colors:locations:)` | From a `CFArray` of `CGColor` objects and a location array |
| `init(headroom:colorSpace:colorComponents:locations:count:)` | With HDR content headroom |

Locations are `CGFloat` values in `0.0...1.0`; Core Graphics maps them to the gradient's coordinate extent.

### Properties

| Property | Type | Description |
|----------|------|-------------|
| `contentHeadroom` | `Float` | HDR headroom value |

### Drawing via CGContext

| Method | Description |
|--------|-------------|
| `CGContext.drawLinearGradient(_:start:end:options:)` | Axial gradient between two points |
| `CGContext.drawRadialGradient(_:startCenter:startRadius:endCenter:endRadius:options:)` | Radial gradient between two circles |

`options` is a `CGGradientDrawingOptions` option set:

| Option | Description |
|--------|-------------|
| `.drawsBeforeStartLocation` | Extends fill color before the start location |
| `.drawsAfterEndLocation` | Extends fill color past the end location |

## Notes

Available on iOS 2.0+, macOS 10.5+, tvOS 9.0+, watchOS 2.0+, visionOS 1.0+. The color space must not be a pattern or indexed color space. For function-based color transitions, use `CGShading` instead. Conforms to `Equatable` and `Hashable`.

## Related

- [CGContext](./cgcontext.md)
- [CGColor](./cgcolor.md)
- [CGColorSpace](./cgcolorspace.md)
