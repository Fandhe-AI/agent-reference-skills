# GenerateAttentionBasedSaliencyImageRequest

A request that produces a heat map identifying the parts of an image most likely to draw attention. The heat map and object data are returned in a `SaliencyImageObservation`.

## Signature / Usage

```swift
struct GenerateAttentionBasedSaliencyImageRequest
```

Creating a request: `init(_ revision: GenerateAttentionBasedSaliencyImageRequest.Revision?)`. Perform it with any of the `ImageProcessingRequest.perform(on:orientation:)` overloads (`URL`, `Data`, `CGImage`, `CVPixelBuffer`, `CMSampleBuffer`, `CIImage`), each `async throws`.

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `revision` | `GenerateAttentionBasedSaliencyImageRequest.Revision` | The algorithm or implementation the request uses |
| `supportedRevisions` | `[GenerateAttentionBasedSaliencyImageRequest.Revision]` | (static) The collection of revisions the request supports |

## Notes

- iOS 18.0+ / iPadOS 18.0+ / Mac Catalyst 18.0+ / macOS 15.0+ / tvOS 18.0+ / visionOS 2.0+ / watchOS 27.0+
- Attention-based saliency; the objectness-based variant is `GenerateObjectnessBasedSaliencyImageRequest`.
- `SaliencyImageObservation` is a grayscale heat map of important areas across an image.
- Apple samples: "Implementing saliency-based image cropping in iOS and watchOS", "Generating high-quality thumbnails from videos".
- Source: https://developer.apple.com/documentation/vision/generateattentionbasedsaliencyimagerequest

## Related

- [GenerateObjectnessBasedSaliencyImageRequest](./generateobjectnessbasedsaliencyimagerequest.md)
- [CalculateImageAestheticsScoresRequest](./calculateimageaestheticsscoresrequest.md)
- [DetectLensSmudgeRequest](./detectlenssmudgerequest.md)
