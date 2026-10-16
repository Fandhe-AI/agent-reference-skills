# DetectTrajectoriesRequest

A request that detects the trajectories of shapes moving along a parabolic path. It produces `TrajectoryObservation` objects containing the shape's detected points and an equation describing the parabola.

## Signature / Usage

```swift
final class DetectTrajectoriesRequest

init(trajectoryLength: Int, _ revision: DetectTrajectoriesRequest.Revision?, frameAnalysisSpacing: CMTime?)
```

Perform it with any of the `ImageProcessingRequest.perform(on:orientation:)` overloads (`URL`, `Data`, `CGImage`, `CVPixelBuffer`, `CMSampleBuffer`, `CIImage`), each `async throws`.

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `trajectoryLength` | `Int` (`let`) | The number of points to detect before calculating a trajectory |
| `objectMinimumNormalizedRadius` | `Float` | The minimum radius of the bounding circle of the object to track |
| `objectMaximumNormalizedRadius` | `Float` | The maximum radius of the bounding circle of the object to track |
| `targetFrameTime` | `CMTime` | The requested target frame time for processing trajectory detection |
| `revision` | `DetectTrajectoriesRequest.Revision` | The algorithm or implementation the request uses |
| `supportedRevisions` | `[DetectTrajectoriesRequest.Revision]` | (static) The collection of revisions the request supports |

## Notes

- iOS 18.0+ / iPadOS 18.0+ / Mac Catalyst 18.0+ / macOS 15.0+ / tvOS 18.0+ / visionOS 2.0+ / watchOS 27.0+
- `final class` (reference type), conforming to `ImageProcessingRequest`, `StatefulRequest`, `VisionRequest`, `Sendable`, `Equatable`, `Hashable`, `CustomStringConvertible`.
- As a `StatefulRequest` it builds evidence of a condition over time across a sequence of frames.

## Related

- [StatefulRequest](./statefulrequest.md)
- [TrackObjectRequest](./trackobjectrequest.md)
- [TrackOpticalFlowRequest](./trackopticalflowrequest.md)
- [TrackRectangleRequest](./trackrectanglerequest.md)
