# DetectHumanBodyPoseRequest (modern)

Modern async/await replacement for `VNDetectHumanBodyPoseRequest`, introduced in iOS 18. Detects the 2D pose of a human body in an image, returning `HumanBodyPoseObservation` results.

## Signature / Usage

```swift
var request = DetectHumanBodyPoseRequest()
request.detectsHands = true

let handler = ImageRequestHandler(cgImage, orientation: nil)
let observations = try await handler.perform(request)

for observation in observations {
    let rightWrist = try? observation.recognizedPoint(.rightWrist)
    print(rightWrist?.location ?? .zero, rightWrist?.confidence ?? 0)
}
```

## Options / Props

| Property | Type | Description |
|----------|------|-------------|
| `detectsHands` | `Bool` | Also detect hand joints of the body, if visible |
| `supportedJointNames` | `[HumanBodyPoseObservation.JointName]` | The joint names the request supports |
| `supportedJointsGroupNames` | `[HumanBodyPoseObservation.JointsGroupName]` | The joint group names the request supports |
| `revision` | `DetectHumanBodyPoseRequest.Revision` | The algorithm or implementation the request uses |
| `supportedRevisions` | `[DetectHumanBodyPoseRequest.Revision]` | The collection of revisions the request supports |

## Notes

- iOS 18.0+ / macOS 15.0+ / tvOS 18.0+ / visionOS 2.0+
- `struct` (value type), unlike class-based `VNDetectHumanBodyPoseRequest`.
- Adds `detectsHands` for combined body+hand joint detection, not available on the legacy request.
- File name carries the `-modern` suffix to avoid collision with `vndetecthumanbodyposerequest.md` (legacy VN-prefixed API).

## Related

- [VNDetectHumanBodyPoseRequest](./vndetecthumanbodyposerequest.md)
- [DetectHumanBodyPose3DRequest](./detecthumanbodypose3drequest.md)
- [ImageRequestHandler](./imagerequesthandler.md)
