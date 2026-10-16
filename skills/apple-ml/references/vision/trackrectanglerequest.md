# TrackRectangleRequest

An image-analysis request that tracks movement of a previously identified rectangular object across multiple images or video frames. It returns `RectangleObservation` results with locations for rectangles in all orientations and sizes.

## Signature / Usage

```swift
final class TrackRectangleRequest

init(detectedRectangle: any QuadrilateralProviding & VisionObservation,
     _ revision: TrackRectangleRequest.Revision?,
     frameAnalysisSpacing: CMTime?)
```

Perform it with any of the `ImageProcessingRequest.perform(on:orientation:)` overloads (`URL`, `Data`, `CGImage`, `CVPixelBuffer`, `CMSampleBuffer`, `CIImage`), each `async throws`.

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `inputObservation` | `any QuadrilateralProviding & VisionObservation` (`let`) | The object to track |
| `trackingLevel` | `TrackRectangleRequest.TrackingLevel` | The tracking quality preference |
| `revision` | `TrackRectangleRequest.Revision` | The algorithm or implementation the request uses |
| `supportedRevisions` | `[TrackRectangleRequest.Revision]` | (static) The collection of revisions the request supports |

## Notes

- iOS 18.0+ / iPadOS 18.0+ / Mac Catalyst 18.0+ / macOS 15.0+ / tvOS 18.0+ / visionOS 2.0+ / watchOS 27.0+
- `final class` conforming to `ImageProcessingRequest`, `StatefulRequest`, `VisionRequest`, `Sendable`, `Equatable`, `Hashable`, `CustomStringConvertible`.
- Seed it with a rectangle from `DetectRectanglesRequest` (a `QuadrilateralProviding` observation).
- Source: https://developer.apple.com/documentation/vision/trackrectanglerequest

## Related

- [DetectRectanglesRequest](./detectrectanglesrequest.md)
- [TrackObjectRequest](./trackobjectrequest.md)
- [QuadrilateralProviding](./quadrilateralproviding.md)
- [StatefulRequest](./statefulrequest.md)
