# ImageProcessingRequest

A protocol for image-analysis requests that focus on a specific part of an image. It inherits from `VisionRequest` and provides the `perform(on:orientation:)` overloads for each image input type.

## Signature / Usage

```swift
protocol ImageProcessingRequest : VisionRequest

var regionOfInterest: NormalizedRect { get set }

func perform(on: URL, orientation: CGImagePropertyOrientation?) async throws -> Self.Result
func perform(on: Data, orientation: CGImagePropertyOrientation?) async throws -> Self.Result
func perform(on: CGImage, orientation: CGImagePropertyOrientation?) async throws -> Self.Result
func perform(on: CVPixelBuffer, orientation: CGImagePropertyOrientation?) async throws -> Self.Result
func perform(on: CMSampleBuffer, orientation: CGImagePropertyOrientation?) async throws -> Self.Result
func perform(on: CIImage, orientation: CGImagePropertyOrientation?) async throws -> Self.Result
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `regionOfInterest` | `NormalizedRect` | The region of the image where the framework performs the request (protocol requirement) |

## Notes

- iOS 18.0+ / iPadOS 18.0+ / Mac Catalyst 18.0+ / macOS 15.0+ / tvOS 18.0+ / visionOS 2.0+ / watchOS 27.0+
- Inherits from `VisionRequest`, `Sendable`, `SendableMetatype`, `Equatable`, `Hashable`, `CustomStringConvertible`.
- Each `perform(on:orientation:)` overload has a default implementation and is a protocol requirement; `Result` is the associated result type of the request.
- Conforming types listed in the docs: `CalculateImageAestheticsScoresRequest`, `ClassifyImageRequest`, `CoreMLRequest`, `DetectAnimalBodyPoseRequest`, `DetectBarcodesRequest`, `DetectContoursRequest`, `DetectDocumentSegmentationRequest`, `DetectFaceCaptureQualityRequest`, `DetectFaceLandmarksRequest`, `DetectFaceRectanglesRequest`, `DetectHorizonRequest`, `DetectHumanBodyPose3DRequest`, `DetectHumanBodyPoseRequest`, `DetectHumanHandPoseRequest`, `DetectHumanRectanglesRequest`, `DetectLensSmudgeRequest`, `DetectRectanglesRequest`, `DetectTextRectanglesRequest`, `DetectTrajectoriesRequest`, `GenerateAttentionBasedSaliencyImageRequest`, `GenerateForegroundInstanceMaskRequest`, `GenerateImageFeaturePrintRequest`, `GenerateIterativeSegmentationRequest`, `GenerateObjectnessBasedSaliencyImageRequest`, `GeneratePersonInstanceMaskRequest`, `GeneratePersonSegmentationRequest`, `RecognizeAnimalsRequest`, `RecognizeDocumentsRequest`, `RecognizeTextRequest`, `TrackHomographicImageRegistrationRequest`, `TrackObjectRequest`, `TrackOpticalFlowRequest`, `TrackRectangleRequest`, `TrackTranslationalImageRegistrationRequest`.
- Sibling protocols: `PoseProviding`, `StatefulRequest`, `TargetedRequest`, `VisionObservation`, `VisionRequest`, `DownloadableAssetsRequest`.

## Related

- [VisionRequest](./visionrequest.md)
- [StatefulRequest](./statefulrequest.md)
- [TargetedRequest](./targetedrequest.md)
- [VisionObservation](./visionobservation.md)
- [NormalizedRect](./normalizedrect.md)
