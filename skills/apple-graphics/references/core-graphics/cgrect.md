# CGRect

A structure representing a rectangle defined by an origin point and size. The coordinate system origin is the lower-left on macOS and upper-left on iOS/tvOS.

## Signature / Usage

```swift
let rect = CGRect(x: 10, y: 20, width: 200, height: 100)

// Derived geometry
rect.midX   // 110.0
rect.maxY   // 120.0

// Geometric operations
let inset = rect.insetBy(dx: 10, dy: 10)   // shrink
let moved = rect.offsetBy(dx: 5, dy: -5)   // translate
let united = rect.union(other)              // bounding union
```

## Options / Props

### Initializers

| Initializer | Description |
|-------------|-------------|
| `init()` | Zero rect (same as `CGRect.zero`) |
| `init(origin:size:)` | From `CGPoint` and `CGSize` |
| `init(x:y:width:height:)` | From individual `CGFloat`, `Int`, or `Double` values |
| `init?(dictionaryRepresentation:)` | From a `CFDictionary` |

### Core Properties

| Property | Type | Description |
|----------|------|-------------|
| `origin` | `CGPoint` | Top-left (iOS) or bottom-left (macOS) corner |
| `size` | `CGSize` | Width and height |
| `width` | `CGFloat` | Shorthand for `size.width` |
| `height` | `CGFloat` | Shorthand for `size.height` |

### Computed Boundary Properties

| Property | Type | Description |
|----------|------|-------------|
| `minX` | `CGFloat` | Smallest x coordinate |
| `midX` | `CGFloat` | Center x coordinate |
| `maxX` | `CGFloat` | Largest x coordinate |
| `minY` | `CGFloat` | Smallest y coordinate |
| `midY` | `CGFloat` | Center y coordinate |
| `maxY` | `CGFloat` | Largest y coordinate |

### State Properties

| Property | Type | Description |
|----------|------|-------------|
| `isEmpty` | `Bool` | `true` if width or height is zero |
| `isNull` | `Bool` | `true` if the rect is the null rect |
| `isInfinite` | `Bool` | `true` if the rect is infinite |
| `standardized` | `CGRect` | Equivalent rect with non-negative width/height |
| `integral` | `CGRect` | Rect expanded to contain integer coordinate boundaries |

### Type Properties

| Property | Description |
|----------|-------------|
| `CGRect.zero` | `{0, 0, 0, 0}` |
| `CGRect.null` | The null rectangle (empty intersection result) |
| `CGRect.infinite` | A rectangle with no bounds |

### Instance Methods

| Method | Returns | Description |
|--------|---------|-------------|
| `insetBy(dx:dy:)` | `CGRect` | Shrinks the rect by `dx` on each side and `dy` on top/bottom |
| `offsetBy(dx:dy:)` | `CGRect` | Moves the rect without changing size |
| `intersection(_:)` | `CGRect` | Intersection of two rects; `.null` if none |
| `union(_:)` | `CGRect` | Smallest rect containing both rects |
| `divided(atDistance:from:)` | `(slice: CGRect, remainder: CGRect)` | Splits the rect along an edge |
| `contains(_:)` | `Bool` | Whether a `CGPoint` or `CGRect` lies inside |
| `intersects(_:)` | `Bool` | Whether two rects overlap |
| `applying(_:)` | `CGRect` | Returns the rect after applying a `CGAffineTransform` |
| `equalTo(_:)` | `Bool` | Equality comparison |

## Notes

Available on iOS 2.0+, macOS 10.0+, tvOS 9.0+, watchOS 2.0+, visionOS 1.0+. Conforms to `Codable`, `Equatable`, `Hashable`, `Animatable`, and `Sendable`.

## Related

- [CGPoint](./cgpoint.md)
- [CGSize](./cgsize.md)
- [CGAffineTransform](./cgaffinetransform.md)
