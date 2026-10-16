# DetectAnimalBodyPoseRequest

A request that detects an animal body pose, generating `AnimalBodyPoseObservation` objects that describe the position of each animal the request detects.

## Signature / Usage

```swift
struct DetectAnimalBodyPoseRequest
```

Creating a request: `init(_ revision: DetectAnimalBodyPoseRequest.Revision?)`. Perform it with any of the `ImageProcessingRequest.perform(on:orientation:)` overloads (`URL`, `Data`, `CGImage`, `CVPixelBuffer`, `CMSampleBuffer`, `CIImage`), each `async throws`.

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `supportedJointNames` | `[AnimalBodyPoseObservation.JointName]` | The joint names the request supports |
| `supportedJointsGroupNames` | `[AnimalBodyPoseObservation.JointsGroupName]` | The joint group names the request supports |
| `revision` | `DetectAnimalBodyPoseRequest.Revision` | The algorithm or implementation the request uses |
| `supportedRevisions` | `[DetectAnimalBodyPoseRequest.Revision]` | (static) The collection of revisions the request supports |

## Notes

- iOS 18.0+ / iPadOS 18.0+ / Mac Catalyst 18.0+ / macOS 15.0+ / tvOS 18.0+ / visionOS 2.0+
- `struct` (value type) conforming to `ImageProcessingRequest`, `VisionRequest`, `Sendable`, `Equatable`, `Hashable`, `CustomStringConvertible`.
- Sibling pose requests: `DetectHumanBodyPoseRequest`, `DetectHumanBodyPose3DRequest`, `DetectHumanHandPoseRequest`.

## Related

- [DetectHumanHandPoseRequest](./detecthumanhandposerequest.md)
- [DetectHumanBodyPoseRequest (modern)](./detecthumanbodyposerequest-modern.md)
- [DetectHumanBodyPose3DRequest](./detecthumanbodypose3drequest.md)
- [PoseProviding](./poseproviding.md)
