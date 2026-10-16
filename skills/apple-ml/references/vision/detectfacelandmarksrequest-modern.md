# DetectFaceLandmarksRequest (modern)

Modern struct-based image analysis request that finds facial features such as eyes and mouth in an image, returning `FaceObservation` results. The legacy class-based counterpart is `VNDetectFaceLandmarksRequest`.

## Signature / Usage

```swift
struct DetectFaceLandmarksRequest
```

Creating a request: `init(_ revision: DetectFaceLandmarksRequest.Revision?)`. Perform it with any of the `ImageProcessingRequest.perform(on:orientation:)` overloads (`URL`, `Data`, `CGImage`, `CVPixelBuffer`, `CMSampleBuffer`, `CIImage`), each `async throws`.

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `inputFaceObservations` | `[FaceObservation]?` | An array of face-observation objects to process as part of the request |
| `revision` | `DetectFaceLandmarksRequest.Revision` | The algorithm or implementation the request uses |
| `supportedRevisions` | `[DetectFaceLandmarksRequest.Revision]` | (static) The collection of revisions the request supports |

## Notes

- iOS 18.0+ / iPadOS 18.0+ / Mac Catalyst 18.0+ / macOS 15.0+ / tvOS 18.0+ / visionOS 2.0+ / watchOS 27.0+
- By default the request first locates all faces in the input image, then analyzes each for facial features.
- To analyze only some faces, or faces you already located, set `inputFaceObservations` to `FaceObservation` objects, either from a `DetectFaceRectanglesRequest` or manually created with the bounding boxes of the faces.
- File name carries the `-modern` suffix to avoid collision with `vndetectfacelandmarksrequest.md` (legacy VN-prefixed API).

## Related

- [VNDetectFaceLandmarksRequest](./vndetectfacelandmarksrequest.md)
- [DetectFaceRectanglesRequest (modern)](./detectfacerectanglesrequest-modern.md)
- [DetectFaceCaptureQualityRequest](./detectfacecapturequalityrequest.md)
