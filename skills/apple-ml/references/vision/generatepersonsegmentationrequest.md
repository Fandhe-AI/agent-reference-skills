# GeneratePersonSegmentationRequest

Produces a matte image (person/background mask) for a person found in the input image, returning a `PixelBufferObservation`.

## Signature / Usage

```swift
var request = GeneratePersonSegmentationRequest()
request.qualityLevel = .accurate

let handler = ImageRequestHandler(cgImage, orientation: nil)
let observation = try await handler.perform(request)
```

## Options / Props

| Property | Type | Description |
|----------|------|-------------|
| `qualityLevel` | `QualityLevel` | Balances accuracy and performance |
| `outputPixelFormatType` | `OSType` | The desired pixel format of the observation |
| `supportedOutputPixelFormats` | `[OSType]` | The collection of supported pixel format types |
| `revision` | `GeneratePersonSegmentationRequest.Revision` | The algorithm or implementation the request uses |
| `supportedRevisions` | `[GeneratePersonSegmentationRequest.Revision]` | The collection of revisions the request supports |

## Notes

- iOS 18.0+ / macOS 15.0+ / tvOS 18.0+ / visionOS 2.0+ / watchOS 27.0+ (beta)
- `final class` (reference type).
- `init(_:frameAnalysisSpacing:)` accepts an optional `CMTime` for sequence-based analysis.
- Produces a single overall matte; use `GeneratePersonInstanceMaskRequest` to separate individual people.

## Related

- [GeneratePersonInstanceMaskRequest](./generatepersoninstancemaskrequest.md)
- [ImageRequestHandler](./imagerequesthandler.md)
