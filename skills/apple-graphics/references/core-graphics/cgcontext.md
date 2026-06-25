# CGContext

A Quartz 2D drawing destination that represents a graphics context. Contains drawing parameters and device-specific information needed to render paint to a window, bitmap image, PDF document, or printer.

## Signature / Usage

```swift
// Save and restore state
context.saveGState()
context.setFillColor(CGColor(red: 1, green: 0, blue: 0, alpha: 1))
context.fill(CGRect(x: 0, y: 0, width: 100, height: 100))
context.restoreGState()

// Build and draw a path
context.beginPath()
context.move(to: CGPoint(x: 10, y: 10))
context.addLine(to: CGPoint(x: 90, y: 90))
context.strokePath()

// Draw with gradient
context.drawLinearGradient(gradient,
    start: CGPoint(x: 0, y: 0),
    end: CGPoint(x: 0, y: 200),
    options: [])
```

## Options / Props

### Path Construction

| Method | Description |
|--------|-------------|
| `beginPath()` | Begins a new subpath, discarding the current path |
| `move(to:)` | Moves the current point without adding a line segment |
| `addLine(to:)` | Appends a straight line segment from current point |
| `addRect(_:)` | Adds a rectangular subpath |
| `addEllipse(in:)` | Adds an ellipse fitting inside a rectangle |
| `addArc(center:radius:startAngle:endAngle:clockwise:)` | Adds an arc by center, radius, and angles |
| `addCurve(to:control1:control2:)` | Adds a cubic Bézier curve |
| `addQuadCurve(to:control:)` | Adds a quadratic Bézier curve |
| `addPath(_:)` | Appends a `CGPath` to the current path |
| `closePath()` | Closes and completes the current subpath |

### Drawing

| Method | Description |
|--------|-------------|
| `fillPath()` | Fills the current path using the nonzero winding rule |
| `strokePath()` | Strokes the current path |
| `drawPath(using:)` | Draws the current path using a specified `CGPathDrawingMode` |
| `fill(_:)` | Fills a rectangle with the current fill color |
| `stroke(_:)` | Strokes a rectangle |
| `fillEllipse(in:)` | Fills an ellipse |
| `strokeEllipse(in:)` | Strokes an ellipse |
| `clear(_:)` | Paints a transparent rectangle (clears pixels) |
| `draw(_:in:)` | Draws a `CGImage` into a rectangle |
| `drawLinearGradient(_:start:end:options:)` | Fills with a linear gradient |
| `drawRadialGradient(_:startCenter:startRadius:endCenter:endRadius:options:)` | Fills with a radial gradient |

### Color & Style

| Method | Description |
|--------|-------------|
| `setFillColor(_:)` | Sets the fill color from a `CGColor` |
| `setStrokeColor(_:)` | Sets the stroke color from a `CGColor` |
| `setFillColor(red:green:blue:alpha:)` | Sets RGB fill color directly |
| `setLineWidth(_:)` | Sets the stroke line width |
| `setLineCap(_:)` | Sets the line cap style (`CGLineCap`) |
| `setLineJoin(_:)` | Sets the line join style (`CGLineJoin`) |
| `setLineDash(phase:lengths:)` | Sets a dashed line pattern |
| `setAlpha(_:)` | Sets the global alpha (opacity) |
| `setBlendMode(_:)` | Sets the compositing blend mode (`CGBlendMode`) |

### Transformations

| Method | Description |
|--------|-------------|
| `translateBy(x:y:)` | Translates the coordinate system |
| `rotate(by:)` | Rotates the coordinate system (radians) |
| `scaleBy(x:y:)` | Scales the coordinate system |
| `concatenate(_:)` | Concatenates a `CGAffineTransform` to the CTM |
| `ctm` | The current transformation matrix |

### State Management

| Method | Description |
|--------|-------------|
| `saveGState()` | Pushes the current graphics state onto the stack |
| `restoreGState()` | Pops and restores the previous graphics state |

### Clipping

| Method | Description |
|--------|-------------|
| `clip(to:)` | Sets a rectangular clipping region |
| `clip(using:)` | Sets the clipping path using a fill rule |
| `clipToMask(_:mask:)` | Sets the clipping region using an image mask |
| `boundingBoxOfClipPath` | The smallest rectangle enclosing the clipping region |

### Path Query

| Property | Description |
|----------|-------------|
| `isPathEmpty` | `true` if no subpaths are present |
| `currentPointOfPath` | The last point of the last subpath |
| `boundingBoxOfPath` | Smallest enclosing rectangle of the current path |
| `pathContains(_:mode:)` | Tests whether the current path contains a point |

## Notes

Available on iOS 2.0+, macOS 10.0+, tvOS 9.0+, watchOS 2.0+, visionOS 1.0+.

## Related

- [CGPath](./cgpath.md)
- [CGMutablePath](./cgmutablepath.md)
- [CGColor](./cgcolor.md)
- [CGGradient](./cggradient.md)
- [CGImage](./cgimage.md)
- [CGBlendMode](./cgblendmode.md)
- [CGAffineTransform](./cgaffinetransform.md)
- [CGLayer](./cglayer.md)
