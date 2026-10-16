# DetectHumanHandPoseRequest

A request that detects a human hand pose, producing `HumanHandPoseObservation` objects that describe the hand pose.

## Signature / Usage

```swift
struct DetectHumanHandPoseRequest
```

Creating a request: `init(_ revision: DetectHumanHandPoseRequest.Revision?)`. Perform it with any of the `ImageProcessingRequest.perform(on:orientation:)` overloads (`URL`, `Data`, `CGImage`, `CVPixelBuffer`, `CMSampleBuffer`, `CIImage`), each `async throws`.

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `maximumHandCount` | `Int` | The maximum number of hands to detect in an image |
| `supportedJointNames` | `[HumanHandPoseObservation.JointName]` | The joint names the request supports |
| `supportedJointsGroupNames` | `[HumanHandPoseObservation.JointsGroupName]` | The joint group names the request supports |
| `revision` | `DetectHumanHandPoseRequest.Revision` | The algorithm or implementation the request uses |
| `supportedRevisions` | `[DetectHumanHandPoseRequest.Revision]` | (static) The collection of revisions the request supports |

## Notes

- iOS 18.0+ / iPadOS 18.0+ / Mac Catalyst 18.0+ / macOS 15.0+ / tvOS 18.0+ / visionOS 2.0+
- `struct` (value type) conforming to `ImageProcessingRequest`, `VisionRequest`, `Sendable`, `Equatable`, `Hashable`, `CustomStringConvertible`.
- Hand joints of a body can alternatively be obtained with `DetectHumanBodyPoseRequest.detectsHands`.

## Related

- [DetectHumanBodyPoseRequest (modern)](./detecthumanbodyposerequest-modern.md)
- [DetectAnimalBodyPoseRequest](./detectanimalbodyposerequest.md)
- [DetectHumanBodyPose3DRequest](./detecthumanbodypose3drequest.md)
- [PoseProviding](./poseproviding.md)
