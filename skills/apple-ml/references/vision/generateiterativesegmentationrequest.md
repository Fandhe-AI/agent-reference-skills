# GenerateIterativeSegmentationRequest

A request that generates a segmentation mask from points, a rectangle, or a scribble, then refines it by adding included and excluded points.

## Signature / Usage

```swift
final class GenerateIterativeSegmentationRequest

init(seedPoint: NormalizedPoint, _ revision: GenerateIterativeSegmentationRequest.Revision?)
init(seedBox: NormalizedRect, _ revision: GenerateIterativeSegmentationRequest.Revision?)
init(seedScribbleBuffer: CVReadOnlyPixelBuffer, _ revision: GenerateIterativeSegmentationRequest.Revision?)

func addIncludedPoint(_: NormalizedPoint) throws
func addExcludedPoint(_: NormalizedPoint) throws
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `qualityLevel` | `GenerateIterativeSegmentationRequest.QualityLevel` | Controls the resolution of the produced mask (`fast`, `balanced` default, `accurate`) |
| `revision` | `GenerateIterativeSegmentationRequest.Revision` | The request's configured revision |
| `supportedRevisions` | `[GenerateIterativeSegmentationRequest.Revision]` | (static) The revisions supported by the request |
| `Result` | typealias | Gray mask image; can be nil if there is nothing to segment |

## Notes

- iOS 27.0+ / iPadOS 27.0+ / Mac Catalyst 27.0+ / macOS 27.0+ / tvOS 27.0+ / visionOS 27.0+ (not listed for watchOS).
- `final class` (reference type), conforming to `ImageProcessingRequest`, `VisionRequest`, `DownloadableAssetsRequest`, `Sendable`, `Equatable`, `Hashable`, `CustomStringConvertible`.
- Maximum of 13 added points when seeded with a point or scribble, or 11 points when seeded with a box. Adding points past the limit throws.
- Conforming to `DownloadableAssetsRequest` means the model may need downloading before the request is performed.
- Initialize with a seed point, seed rectangle, or seed scribble buffer for the initial mask, then add points to refine it.
- Source: https://developer.apple.com/documentation/vision/generateiterativesegmentationrequest

## Related

- [Isolating an object from a tap, box, or scribble](./isolating-an-object-from-a-tap-box-or-scribble.md)
- [DownloadableAssetsRequest](./downloadableassetsrequest.md)
- [GenerateForegroundInstanceMaskRequest](./generateforegroundinstancemaskrequest.md)
- [NormalizedPoint](./normalizedpoint.md)
- [NormalizedRect](./normalizedrect.md)
