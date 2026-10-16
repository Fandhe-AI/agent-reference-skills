# TrackOpticalFlowRequest

A request that determines the direction change of vectors for each pixel from a previous to a current image, generating an `OpticalFlowObservation`.

## Signature / Usage

```swift
final class TrackOpticalFlowRequest

init(_ revision: TrackOpticalFlowRequest.Revision?, frameAnalysisSpacing: CMTime?)
```

Perform it with any of the `ImageProcessingRequest.perform(on:orientation:)` overloads (`URL`, `Data`, `CGImage`, `CVPixelBuffer`, `CMSampleBuffer`, `CIImage`), each `async throws`.

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `computationAccuracy` | `TrackOpticalFlowRequest.ComputationAccuracy` | The level of accuracy to compute the optical flow |
| `outputPixelFormatType` | `OSType` | The desired pixel format type of the observation |
| `supportedOutputPixelFormatTypes` | `[OSType]` | The collection of supported pixel format types |
| `revision` | `TrackOpticalFlowRequest.Revision` | The algorithm or implementation the request uses |
| `supportedRevisions` | `[TrackOpticalFlowRequest.Revision]` | (static) The collection of revisions the request supports |

## Notes

- iOS 18.0+ / iPadOS 18.0+ / Mac Catalyst 18.0+ / macOS 15.0+ / tvOS 18.0+ / visionOS 2.0+ (not listed for watchOS).
- `final class` conforming to `ImageProcessingRequest`, `StatefulRequest`, `TargetedRequest`, `VisionRequest`, `Sendable`, `Equatable`, `Hashable`, `CustomStringConvertible`.
- The request works at the pixel level, so both images must have the same dimensions to perform it successfully.
- Important: optical flow requests are very resource intensive; perform only one request at a time and release memory immediately after generating an optical flow.

## Related

- [DetectTrajectoriesRequest](./detecttrajectoriesrequest.md)
- [TrackObjectRequest](./trackobjectrequest.md)
- [TrackRectangleRequest](./trackrectanglerequest.md)
- [StatefulRequest](./statefulrequest.md)
- [TargetedRequest](./targetedrequest.md)
