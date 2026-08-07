# DetectHumanBodyPose3DRequest

Detects points on human bodies in 3D space, relative to the camera, returning `HumanBodyPose3DObservation` results.

## Signature / Usage

```swift
let request = DetectHumanBodyPose3DRequest()
let handler = ImageRequestHandler(cgImage, orientation: nil)
let observations = try await handler.perform(request)

for observation in observations {
    let rightWrist = try? observation.pointInCameraSpace(.rightWrist)
    print(rightWrist?.position ?? .zero)
}
```

## Options / Props

| Property | Type | Description |
|----------|------|-------------|
| `supportedJointNames` | `[HumanBodyPose3DObservation.JointName]` | The joint names the request supports |
| `supportedJointsGroupNames` | `[HumanBodyPose3DObservation.JointsGroupName]` | The joint group names the request supports |
| `revision` | `DetectHumanBodyPose3DRequest.Revision` | The algorithm or implementation the request uses |
| `supportedRevisions` | `[DetectHumanBodyPose3DRequest.Revision]` | The collection of revisions the request supports |

## Notes

- iOS 18.0+ / macOS 15.0+ / tvOS 18.0+ / visionOS 2.0+
- `final class` (reference type), unlike most other modern Vision requests which are `struct`.
- `init(_:frameAnalysisSpacing:)` accepts an optional `CMTime` to control how often frames are analyzed in a sequence.
- If the system allows it, the request uses `AVDepthData` to improve accuracy, distinct from the 2D `DetectHumanBodyPoseRequest`.

## Related

- [DetectHumanBodyPoseRequest (modern)](./detecthumanbodyposerequest-modern.md)
- [TrackObjectRequest](./trackobjectrequest.md)
- [ImageRequestHandler](./imagerequesthandler.md)
