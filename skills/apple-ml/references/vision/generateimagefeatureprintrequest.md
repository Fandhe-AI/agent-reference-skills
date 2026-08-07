# GenerateImageFeaturePrintRequest

Generates a feature print (a compact numerical representation of image content) from an image, returning a `FeaturePrintObservation`.

## Signature / Usage

```swift
let request = GenerateImageFeaturePrintRequest()
let handler = ImageRequestHandler(cgImage, orientation: nil)
let observation = try await handler.perform(request)
```

## Options / Props

| Property | Type | Description |
|----------|------|-------------|
| `cropAndScaleAction` | `ImageCropAndScaleAction` | How to scale an input image before generating the result |
| `revision` | `GenerateImageFeaturePrintRequest.Revision` | The algorithm or implementation the request uses |
| `supportedRevisions` | `[GenerateImageFeaturePrintRequest.Revision]` | The collection of revisions the request supports |

## Notes

- iOS 18.0+ / macOS 15.0+ / tvOS 18.0+ / visionOS 2.0+ / watchOS 27.0+ (beta)
- `struct` (value type).
- `FeaturePrintObservation` results can be compared with `computeDistance(_:to:)` to measure image similarity.

## Related

- [ClassifyImageRequest](./classifyimagerequest.md)
- [ImageRequestHandler](./imagerequesthandler.md)
