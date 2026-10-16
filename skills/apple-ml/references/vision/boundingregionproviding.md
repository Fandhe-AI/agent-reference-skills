# BoundingRegionProviding

A protocol for objects that have a defined boundary in an image.

## Signature / Usage

```swift
protocol BoundingRegionProviding

var boundingRegion: NormalizedRegion { get }
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `boundingRegion` | `NormalizedRegion` | A polygon that defines the boundary of an area in the image (protocol requirement) |

## Notes

- iOS 26.0+ / iPadOS 26.0+ / Mac Catalyst 26.0+ / macOS 26.0+ / tvOS 26.0+ / visionOS 26.0+ / watchOS 27.0+
- Conforming types listed in the docs: `DocumentObservation.Container`, `DocumentObservation.Container.DataDetectorMatch`, `DocumentObservation.Container.List`, `DocumentObservation.Container.Table`, `DocumentObservation.Container.Text`.
- Source: https://developer.apple.com/documentation/vision/boundingregionproviding

## Related

- [NormalizedRegion](./normalizedregion.md)
- [BoundingBoxProviding](./boundingboxproviding.md)
- [QuadrilateralProviding](./quadrilateralproviding.md)
- [RecognizeDocumentsRequest](./recognizedocumentsrequest.md)
