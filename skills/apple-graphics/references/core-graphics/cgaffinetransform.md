# CGAffineTransform

An affine transformation matrix for mapping points in a 2D coordinate system. Preserves parallel lines but not necessarily lengths or angles. Represented as a 3×3 matrix using six components.

## Signature / Usage

```swift
// Build a compound transform: scale then rotate then translate
let transform = CGAffineTransform(scaleX: 2, y: 2)
    .rotated(by: .pi / 4)
    .translatedBy(x: 50, y: 0)

// Apply to a context
context.concatenate(transform)

// Apply to geometry directly
let newPoint = point.applying(transform)
let newRect  = rect.applying(transform)
```

## Options / Props

### Initializers / Factory Methods

| Method | Description |
|--------|-------------|
| `CGAffineTransform.identity` | The identity transform (no-op) |
| `init(a:b:c:d:tx:ty:)` | From the six matrix components |
| `init(rotationAngle:)` | Rotation by angle in radians |
| `init(scaleX:y:)` | Uniform or non-uniform scale |
| `init(translationX:y:)` | Translation offset |

### Matrix Components

```
| a   b   0 |
| c   d   0 |
| tx  ty  1 |
```

| Property | Description |
|----------|-------------|
| `a` | x-axis scale / cos(angle) for rotation |
| `b` | x-axis shear / sin(angle) for rotation |
| `c` | y-axis shear / -sin(angle) for rotation |
| `d` | y-axis scale / cos(angle) for rotation |
| `tx` | x translation |
| `ty` | y translation |

### Modifying Transforms (returns a new transform)

| Method | Description |
|--------|-------------|
| `translatedBy(x:y:)` | Appends a translation |
| `scaledBy(x:y:)` | Appends a scale |
| `rotated(by:)` | Appends a rotation (radians) |
| `inverted()` | Returns the inverse transform |
| `concatenating(_:)` | Concatenates two transforms |

### Applying to Geometry

| Function | Description |
|----------|-------------|
| `CGPointApplyAffineTransform(_:_:)` | Transforms a `CGPoint` |
| `CGSizeApplyAffineTransform(_:_:)` | Transforms a `CGSize` |
| `CGRectApplyAffineTransform(_:_:)` | Transforms a `CGRect` |
| `point.applying(_:)` | Instance method on `CGPoint` |
| `rect.applying(_:)` | Instance method on `CGRect` |

### Evaluation

| Method | Description |
|--------|-------------|
| `isIdentity` | `true` if the transform is the identity |
| `equalTo(_:)` | Compares two transforms |

## Notes

Available on iOS 2.0+, macOS 10.0+, tvOS 9.0+, watchOS 2.0+, visionOS 1.0+. Prefer using `CGContext` methods (`translateBy`, `rotate(by:)`, `scaleBy`) for one-off context transforms; build a `CGAffineTransform` when you need to reuse or compose transforms.

## Related

- [CGContext](./cgcontext.md)
- [CGPoint](./cgpoint.md)
- [CGRect](./cgrect.md)
- [CGSize](./cgsize.md)
- [CGPath](./cgpath.md)
