# NormalizedRect

The location and dimensions of a rectangle in Vision's normalized coordinates. `origin` is the lower-left corner of the rectangle.

## Signature / Usage

```swift
let seedBox = NormalizedRect(x: 0.2, y: 0.3, width: 0.4, height: 0.5)
```

```swift
struct NormalizedRect

init(x: CGFloat, y: CGFloat, width: CGFloat, height: CGFloat)
init(imageRect: CGRect, in: CGSize)
init(imageRect: CGRect, in: CGSize, normalizedTo: NormalizedRect)
init(normalizedRect: CGRect)

func toImageCoordinates(_: CGSize, origin: CoordinateOrigin) -> CGRect
func toImageCoordinates(from: NormalizedRect, imageSize: CGSize, origin: CoordinateOrigin) -> CGRect
func verticallyFlipped() -> NormalizedRect
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `origin` | `CGPoint` | The lower left-hand corner of the rectangle |
| `width` | `CGFloat` | The width of the rectangle |
| `height` | `CGFloat` | The height of the rectangle |
| `cgRect` | `CGRect` (`let`) | The normalized rectangle as a Core Graphics rectangle |
| `fullImage` | `NormalizedRect` (static) | A normalized rectangle with an origin at zero and a width and height of one |
| `init(imageRect:in:)` | `(CGRect, CGSize)` | Creates a normalized rectangle from a rectangle in an image coordinate space |
| `init(imageRect:in:normalizedTo:)` | `(CGRect, CGSize, NormalizedRect)` | Creates a rectangle normalized to a region of interest in an image |
| `toImageCoordinates(_:origin:)` | `(CGSize, CoordinateOrigin) -> CGRect` | Converts a rectangle in normalized coordinates into image coordinates |
| `toImageCoordinates(from:imageSize:origin:)` | `(NormalizedRect, CGSize, CoordinateOrigin) -> CGRect` | Converts a rectangle normalized to a region within an image into full image coordinates |
| `verticallyFlipped()` | `() -> NormalizedRect` | Returns a normalized rectangle with the origin flipped between the top and bottom of the image |

## Notes

- iOS 18.0+ / iPadOS 18.0+ / Mac Catalyst 18.0+ / macOS 15.0+ / tvOS 18.0+ / visionOS 2.0+ / watchOS 27.0+
- `struct` conforming to `CustomStringConvertible`, `Decodable`, `Encodable`, `Equatable`, `Hashable`, `Sendable`, `SendableMetatype`.
- Used for `ImageProcessingRequest.regionOfInterest` and as the seed box of `GenerateIterativeSegmentationRequest`.
- Source: https://developer.apple.com/documentation/vision/normalizedrect

## Related

- [NormalizedPoint](./normalizedpoint.md)
- [NormalizedRegion](./normalizedregion.md)
- [BoundingBoxProviding](./boundingboxproviding.md)
- [CoordinateOrigin](./coordinateorigin.md)
- [ImageProcessingRequest](./imageprocessingrequest.md)
