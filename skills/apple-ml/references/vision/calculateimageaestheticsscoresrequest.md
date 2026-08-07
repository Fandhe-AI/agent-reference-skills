# CalculateImageAestheticsScoresRequest

Analyzes an image for aesthetically pleasing attributes, producing an `ImageAestheticsScoresObservation` with an overall aesthetics score.

## Signature / Usage

```swift
let request = CalculateImageAestheticsScoresRequest()
let handler = ImageRequestHandler(cgImage, orientation: nil)
let observation = try await handler.perform(request)
print(observation.overallScore)
```

## Options / Props

| Property | Type | Description |
|----------|------|-------------|
| `cropAndScaleAction` | `ImageCropAndScaleAction` | How to scale an input image before generating the result |
| `revision` | `CalculateImageAestheticsScoresRequest.Revision` | The algorithm or implementation the request uses |
| `supportedRevisions` | `[CalculateImageAestheticsScoresRequest.Revision]` | The collection of revisions the request supports |

## Notes

- iOS 18.0+ / macOS 15.0+ / tvOS 18.0+ / visionOS 2.0+ / watchOS 27.0+ (beta)
- `struct` (value type).
- No legacy VN-prefixed equivalent; this API has no pre-Swift-concurrency counterpart.

## Related

- [ClassifyImageRequest](./classifyimagerequest.md)
- [ImageRequestHandler](./imagerequesthandler.md)
