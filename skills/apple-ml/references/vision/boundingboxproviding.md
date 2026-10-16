# BoundingBoxProviding

A protocol for objects that have a bounding box. `QuadrilateralProviding` inherits from it.

## Signature / Usage

```swift
protocol BoundingBoxProviding

var boundingBox: NormalizedRect { get }
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `boundingBox` | `NormalizedRect` | The bounding box of the object (protocol requirement with a default implementation) |

## Notes

- iOS 18.0+ / iPadOS 18.0+ / Mac Catalyst 18.0+ / macOS 15.0+ / tvOS 18.0+ / visionOS 2.0+ / watchOS 27.0+
- Inherited by `QuadrilateralProviding`.
- Conforming types listed in the docs: `BarcodeObservation`, `DetectedDocumentObservation`, `DetectedObjectObservation`, `FaceObservation`, `HumanObservation`, `RecognizedObjectObservation`, `RecognizedTextObservation`, `RectangleObservation`, `TextObservation`.

## Related

- [QuadrilateralProviding](./quadrilateralproviding.md)
- [BoundingRegionProviding](./boundingregionproviding.md)
- [NormalizedRect](./normalizedrect.md)
- [VisionObservation](./visionobservation.md)
