# TrackObjectRequest

Tracks the movement of a previously identified object across multiple images or video frames, producing an updated `DetectedObjectObservation` bounding box each time it runs.

## Signature / Usage

```swift
let initialObservation = DetectedObjectObservation(boundingBox: initialBoundingBox)
let request = TrackObjectRequest(detectedObject: initialObservation)

let handler = ImageRequestHandler(nextFrameCGImage, orientation: nil)
let tracked = try await handler.perform(request)
print(tracked.boundingBox)
```

## Options / Props

| Property | Type | Description |
|----------|------|-------------|
| `inputObservation` | `any BoundingBoxProviding & VisionObservation` | The object to track |
| `revision` | `TrackObjectRequest.Revision` | The algorithm or implementation the request uses |
| `supportedRevisions` | `[TrackObjectRequest.Revision]` | The collection of revisions the request supports |

## Notes

- iOS 18.0+ / macOS 15.0+ / tvOS 18.0+ / visionOS 2.0+ / watchOS 27.0+ (beta)
- `final class` (reference type); conforms to `StatefulRequest`, so the same instance carries tracking state across successive `perform` calls.
- `init(detectedObject:_:frameAnalysisSpacing:)` accepts the object to track, an optional revision, and an optional `CMTime` frame spacing.

## Related

- [DetectHumanBodyPose3DRequest](./detecthumanbodypose3drequest.md)
- [ImageRequestHandler](./imagerequesthandler.md)
