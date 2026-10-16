# GenerateObjectnessBasedSaliencyImageRequest

A request that generates a heat map identifying the parts of an image most likely to represent objects. The heat map and object data are returned in a `SaliencyImageObservation`.

## Signature / Usage

```swift
struct GenerateObjectnessBasedSaliencyImageRequest
```

Creating a request: `init(_ revision: GenerateObjectnessBasedSaliencyImageRequest.Revision?)`. Perform it with any of the `ImageProcessingRequest.perform(on:orientation:)` overloads (`URL`, `Data`, `CGImage`, `CVPixelBuffer`, `CMSampleBuffer`, `CIImage`), each `async throws`.

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `revision` | `GenerateObjectnessBasedSaliencyImageRequest.Revision` | The algorithm or implementation the request uses |
| `supportedRevisions` | `[GenerateObjectnessBasedSaliencyImageRequest.Revision]` | (static) The collection of revisions the request supports |

## Notes

- iOS 18.0+ / iPadOS 18.0+ / Mac Catalyst 18.0+ / macOS 15.0+ / tvOS 18.0+ / visionOS 2.0+ / watchOS 27.0+
- Objectness-based saliency; the attention-based variant is `GenerateAttentionBasedSaliencyImageRequest`.
- `SaliencyImageObservation` is a grayscale heat map of important areas across an image.
- Source: https://developer.apple.com/documentation/vision/generateobjectnessbasedsaliencyimagerequest

## Related

- [GenerateAttentionBasedSaliencyImageRequest](./generateattentionbasedsaliencyimagerequest.md)
- [CalculateImageAestheticsScoresRequest](./calculateimageaestheticsscoresrequest.md)
- [DetectLensSmudgeRequest](./detectlenssmudgerequest.md)
