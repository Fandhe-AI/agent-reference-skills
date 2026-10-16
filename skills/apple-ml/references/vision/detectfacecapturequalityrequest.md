# DetectFaceCaptureQualityRequest

A request that produces a floating-point number representing the capture quality of a face in a photo. It returns `FaceObservation` objects with `captureQuality` set to a value from `0` to `1`.

## Signature / Usage

```swift
struct DetectFaceCaptureQualityRequest
```

Creating a request: `init(_ revision: DetectFaceCaptureQualityRequest.Revision?)`. Perform it with any of the `ImageProcessingRequest.perform(on:orientation:)` overloads (`URL`, `Data`, `CGImage`, `CVPixelBuffer`, `CMSampleBuffer`, `CIImage`), each `async throws`.

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `inputFaceObservations` | `[FaceObservation]?` | An array of face-observation objects to process as part of the request |
| `revision` | `DetectFaceCaptureQualityRequest.Revision` | The algorithm or implementation the request uses |
| `supportedRevisions` | `[DetectFaceCaptureQualityRequest.Revision]` | (static) The collection of revisions the request supports |

## Notes

- iOS 18.0+ / iPadOS 18.0+ / Mac Catalyst 18.0+ / macOS 15.0+ / tvOS 18.0+ / visionOS 2.0+ / watchOS 27.0+
- Faces with quality closer to `1` are better lit, sharper, and more centrally positioned than faces with quality closer to `0`.
- If you don't execute the request, or the request fails, `FaceObservation.captureQuality` is `nil`.
- Apple sample: "Analyzing a selfie and visualizing its content".

## Related

- [DetectFaceLandmarksRequest (modern)](./detectfacelandmarksrequest-modern.md)
- [DetectFaceRectanglesRequest (modern)](./detectfacerectanglesrequest-modern.md)
- [ImageProcessingRequest](./imageprocessingrequest.md)
