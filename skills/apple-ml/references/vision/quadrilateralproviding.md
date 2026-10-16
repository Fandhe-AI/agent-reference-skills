# QuadrilateralProviding

A protocol for objects that have a bounding quadrilateral. It inherits from `BoundingBoxProviding`.

## Signature / Usage

```swift
protocol QuadrilateralProviding : BoundingBoxProviding

var topLeft: NormalizedPoint { get }
var topRight: NormalizedPoint { get }
var bottomLeft: NormalizedPoint { get }
var bottomRight: NormalizedPoint { get }
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `topLeft` | `NormalizedPoint` | The coordinates of the upper-left corner of the quadrilateral |
| `topRight` | `NormalizedPoint` | The coordinates of the upper-right corner of the quadrilateral |
| `bottomLeft` | `NormalizedPoint` | The coordinates of the lower-left corner of the quadrilateral |
| `bottomRight` | `NormalizedPoint` | The coordinates of the lower-right corner of the quadrilateral |

## Notes

- iOS 18.0+ / iPadOS 18.0+ / Mac Catalyst 18.0+ / macOS 15.0+ / tvOS 18.0+ / visionOS 2.0+ / watchOS 27.0+
- All four corner properties are protocol requirements.
- Conforming types listed in the docs: `BarcodeObservation`, `DetectedDocumentObservation`, `RecognizedTextObservation`, `RectangleObservation`, `TextObservation`.
- `TrackRectangleRequest` takes an observation that is both `QuadrilateralProviding` and `VisionObservation`.
- Source: https://developer.apple.com/documentation/vision/quadrilateralproviding

## Related

- [BoundingBoxProviding](./boundingboxproviding.md)
- [BoundingRegionProviding](./boundingregionproviding.md)
- [NormalizedPoint](./normalizedpoint.md)
- [TrackRectangleRequest](./trackrectanglerequest.md)
