# CGMutablePath

A mutable graphics path used to incrementally construct shapes from line segments, arcs, and Bézier curves. Inherits from `CGPath`.

## Signature / Usage

```swift
let path = CGMutablePath()
path.move(to: CGPoint(x: 10, y: 10))
path.addLine(to: CGPoint(x: 100, y: 10))
path.addLine(to: CGPoint(x: 55, y: 80))
path.closeSubpath()

context.addPath(path)
context.fillPath()
```

## Options / Props

### Construction Methods

| Method | Description |
|--------|-------------|
| `move(to:transform:)` | Begins a new subpath at the specified point |
| `addLine(to:transform:)` | Appends a straight line from the current point |
| `addLines(between:transform:)` | Appends multiple connected line segments |
| `addRect(_:transform:)` | Adds a rectangular subpath |
| `addRects(_:transform:)` | Adds multiple rectangular subpaths |
| `addEllipse(in:transform:)` | Adds an ellipse fitting inside a rectangle |
| `addRoundedRect(in:cornerWidth:cornerHeight:transform:)` | Adds a rounded rectangle |
| `addArc(center:radius:startAngle:endAngle:clockwise:transform:)` | Adds an arc by center, radius, and angles |
| `addArc(tangent1End:tangent2End:radius:transform:)` | Adds an arc using two tangent lines |
| `addRelativeArc(center:radius:startAngle:delta:transform:)` | Adds an arc using a start angle and delta |
| `addCurve(to:control1:control2:transform:)` | Adds a cubic Bézier curve |
| `addQuadCurve(to:control:transform:)` | Adds a quadratic Bézier curve |
| `addPath(_:transform:)` | Appends another `CGPath` or `CGMutablePath` |
| `closeSubpath()` | Closes the current subpath by connecting the last point to the first |

All `transform` parameters are `UnsafePointer<CGAffineTransform>?` (pass `nil` for no transform).

## Notes

Available on iOS 2.0+, macOS 10.2+, tvOS 9.0+, watchOS 2.0+, visionOS 1.0+. Conforms to `Equatable` and `Hashable`. The path itself does not render — call `context.addPath(_:)` then a context drawing method.

## Related

- [CGPath](./cgpath.md)
- [CGContext](./cgcontext.md)
- [CGAffineTransform](./cgaffinetransform.md)
