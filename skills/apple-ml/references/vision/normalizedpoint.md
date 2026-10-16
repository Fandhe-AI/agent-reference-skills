# NormalizedPoint

A point in a 2D coordinate system, expressed in Vision's normalized coordinates (0 to 1; the default origin is the lower-left corner of the image).

## Signature / Usage

```swift
let seed = NormalizedPoint(x: 0.5, y: 0.5)
```

```swift
struct NormalizedPoint

init(x: CGFloat, y: CGFloat)
init(normalizedPoint: CGPoint)
init(imagePoint: CGPoint, in: CGSize)
init(imagePoint: CGPoint, in: CGSize, normalizedTo: NormalizedRect)

func toImageCoordinates(_: CGSize, origin: CoordinateOrigin) -> CGPoint
func toImageCoordinates(from: NormalizedRect, imageSize: CGSize, origin: CoordinateOrigin) -> CGPoint
func verticallyFlipped() -> NormalizedPoint
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `x` | `CGFloat` | The x-coordinate |
| `y` | `CGFloat` | The y-coordinate |
| `cgPoint` | `CGPoint` (`let`) | The Core Graphics point for this point |
| `zero` | `NormalizedPoint` (static) | A point object that represents the origin |
| `init(imagePoint:in:)` | `(CGPoint, CGSize)` | Creates a normalized point from a point in an image coordinate space |
| `init(imagePoint:in:normalizedTo:)` | `(CGPoint, CGSize, NormalizedRect)` | Creates a point normalized to a region of interest within an image |
| `toImageCoordinates(_:origin:)` | `(CGSize, CoordinateOrigin) -> CGPoint` | Converts a point in normalized coordinates into image coordinates |
| `toImageCoordinates(from:imageSize:origin:)` | `(NormalizedRect, CGSize, CoordinateOrigin) -> CGPoint` | Converts a point normalized to a region within an image into full image coordinates |
| `verticallyFlipped()` | `() -> NormalizedPoint` | Returns a normalized point with the origin flipped between the top and bottom of the image |

## Notes

- iOS 18.0+ / iPadOS 18.0+ / Mac Catalyst 18.0+ / macOS 15.0+ / tvOS 18.0+ / visionOS 2.0+ / watchOS 27.0+
- `struct` conforming to `CustomStringConvertible`, `Decodable`, `Encodable`, `Equatable`, `Hashable`, `Sendable`, `SendableMetatype`.
- UIKit and SwiftUI use a top-left origin; convert view coordinates and flip the y-axis (for example with `verticallyFlipped()`) before passing points to Vision requests such as `GenerateIterativeSegmentationRequest`.
- Source: https://developer.apple.com/documentation/vision/normalizedpoint

## Related

- [NormalizedRect](./normalizedrect.md)
- [NormalizedRegion](./normalizedregion.md)
- [NormalizedCircle](./normalizedcircle.md)
- [CoordinateOrigin](./coordinateorigin.md)
- [Isolating an object from a tap, box, or scribble](./isolating-an-object-from-a-tap-box-or-scribble.md)
