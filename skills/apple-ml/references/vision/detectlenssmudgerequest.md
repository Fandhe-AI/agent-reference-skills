# DetectLensSmudgeRequest

A request that detects a smudge on a lens from an image or video frame capture, returning a `SmudgeObservation` whose `confidence` ranges from `0.0` to `1.0`.

## Signature / Usage

```swift
func isGoodCapture(imageURL:URL) async throws -> Bool {

   // Set an optional threshold from 0.0 to 1.0 to flag a maximum level of smudge in your capture.
    let smudgeThreshold: Float = 0.9;
    let request = DetectLensSmudgeRequest(.revision1)
    let smudgeObservation = try await request.perform(on: imageURL)

    return (smudgeObservation.confidence < smudgeThreshold)
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `cropAndScaleAction` | `ImageCropAndScaleAction` | An optional setting that tells the algorithm how to scale an input image before generating the result |
| `revision` | `DetectLensSmudgeRequest.Revision` | The algorithm or implementation the request uses |
| `supportedRevisions` | `[DetectLensSmudgeRequest.Revision]` | (static) The collection of revisions the request supports |

## Notes

- iOS 26.0+ / iPadOS 26.0+ / Mac Catalyst 26.0+ / macOS 26.0+ / tvOS 26.0+ / visionOS 26.0+ / watchOS 27.0+
- A smudge is anything that obscures a lens, such as a fingerprint or raindrops, resulting in a hazy or blurry capture. Useful for finding the best frame from a video or set of images.
- `SmudgeObservation.confidence` is a probability: `1.0` represents a high probability that the lens is smudged at capture time.
- Requires a device with A14 Bionic or later, or M1 or later.
- Naturally blurred objects, long exposure, and motion blur may be categorized as a smudge; use the request on a fixed capture where the device is stable.
- Creating a request: `init(_ revision: DetectLensSmudgeRequest.Revision?)`.

## Related

- [CalculateImageAestheticsScoresRequest](./calculateimageaestheticsscoresrequest.md)
- [GenerateAttentionBasedSaliencyImageRequest](./generateattentionbasedsaliencyimagerequest.md)
- [GenerateObjectnessBasedSaliencyImageRequest](./generateobjectnessbasedsaliencyimagerequest.md)
