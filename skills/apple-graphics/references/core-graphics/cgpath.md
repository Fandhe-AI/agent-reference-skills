# CGPath

An immutable graphics path: a mathematical description of shapes or lines to be drawn in a graphics context. Not directly drawable — add to a `CGContext` via `addPath(_:)` then call a drawing method.

## Signature / Usage

```swift
// Create a path with a rounded rect
let path = CGPath(roundedRect: CGRect(x: 0, y: 0, width: 200, height: 100),
                  cornerWidth: 12, cornerHeight: 12,
                  transform: nil)

context.addPath(path)
context.fillPath()
```

## Options / Props

### Creating Paths

| Initializer | Description |
|-------------|-------------|
| `init(rect:transform:)` | Creates a rectangular path |
| `init(ellipseIn:transform:)` | Creates an ellipse path fitting inside a rectangle |
| `init(roundedRect:cornerWidth:cornerHeight:transform:)` | Creates a rounded rectangle path |

### Copying

| Method | Returns | Description |
|--------|---------|-------------|
| `copy()` | `CGPath?` | Immutable copy |
| `copy(using:)` | `CGPath?` | Copy with a `CGAffineTransform` applied |
| `copy(dashingWithPhase:lengths:transform:)` | `CGPath` | Copy representing the dashed stroke of the path |
| `copy(strokingWithWidth:lineCap:lineJoin:miterLimit:transform:)` | `CGPath` | Copy representing the stroked outline |
| `mutableCopy()` | `CGMutablePath?` | Mutable copy |
| `mutableCopy(using:)` | `CGMutablePath?` | Mutable copy with a transform |

### Examining a Path

| Property / Method | Description |
|-------------------|-------------|
| `isEmpty` | `true` if the path contains no elements |
| `currentPoint` | The last point added to the path |
| `boundingBox` | Bounding box of all control points |
| `boundingBoxOfPath` | Tight bounding box (uses actual curve bounds) |
| `contains(_:using:transform:)` | Tests whether a point lies inside the path |
| `isRect(_:)` | Returns `true` if the path represents a rectangle |

### Boolean / Set Operations (macOS 13+, iOS 16+)

| Method | Description |
|--------|-------------|
| `union(_:using:)` | Union of two paths |
| `intersection(_:using:)` | Intersection of two paths |
| `subtracting(_:using:)` | Subtracts a path from this path |
| `symmetricDifference(_:using:)` | Symmetric difference |
| `componentsSeparated(using:)` | Splits into separate component paths |
| `flattened(threshold:)` | Approximates curves with line segments |
| `normalized(using:)` | Returns a normalized path |
| `intersects(_:using:)` | Tests whether two paths intersect |

### Iterating Elements

```swift
path.apply(info: nil) { info, elementPtr in
    let element = elementPtr.pointee
    switch element.type {
    case .moveToPoint:      break
    case .addLineToPoint:   break
    case .addCurveToPoint:  break
    case .closeSubpath:     break
    default:                break
    }
}
```

## Notes

Available on iOS 2.0+, macOS 10.2+, tvOS 9.0+, watchOS 2.0+, visionOS 1.0+. Conforms to `Equatable` and `Hashable`.

## Related

- [CGMutablePath](./cgmutablepath.md)
- [CGContext](./cgcontext.md)
- [CGAffineTransform](./cgaffinetransform.md)
