# StatefulRequest

The protocol for a type that builds evidence of a condition over time, such as across a sequence of video frames. It inherits from `VisionRequest`.

## Signature / Usage

```swift
protocol StatefulRequest : VisionRequest

var frameAnalysisSpacing: CMTime { get }
var minimumLatencyFrameCount: Int { get }
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `frameAnalysisSpacing` | `CMTime` | The reciprocal of the maximum rate to process buffers |
| `minimumLatencyFrameCount` | `Int` | The minimum number of frames the request has to process before reporting any observations (has a default implementation) |

## Notes

- iOS 18.0+ / iPadOS 18.0+ / Mac Catalyst 18.0+ / macOS 15.0+ / tvOS 18.0+ / visionOS 2.0+ / watchOS 27.0+
- Inherits from `VisionRequest`, `Sendable`, `SendableMetatype`, `Equatable`, `Hashable`, `CustomStringConvertible`; provides default `==` and `hash(into:)` implementations.
- Conforming types listed in the docs: `DetectHumanBodyPose3DRequest`, `DetectTrajectoriesRequest`, `GeneratePersonSegmentationRequest`, `TrackHomographicImageRegistrationRequest`, `TrackObjectRequest`, `TrackOpticalFlowRequest`, `TrackRectangleRequest`, `TrackTranslationalImageRegistrationRequest`.
- Source: https://developer.apple.com/documentation/vision/statefulrequest

## Related

- [TargetedRequest](./targetedrequest.md)
- [ImageProcessingRequest](./imageprocessingrequest.md)
- [VisionRequest](./visionrequest.md)
- [DetectTrajectoriesRequest](./detecttrajectoriesrequest.md)
- [TrackObjectRequest](./trackobjectrequest.md)
