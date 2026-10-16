# PoseProviding

An observation protocol that provides a collection of joints that make up a pose. Conforming types: `AnimalBodyPoseObservation`, `HumanBodyPoseObservation`, `HumanHandPoseObservation`.

## Signature / Usage

```swift
protocol PoseProviding

func joint(for: Self.PoseJointName) -> Joint?
func allJoints(in: Self.PoseJointsGroupName?) -> [Self.PoseJointName : Joint]
var availableJointNames: [Self.PoseJointName] { get }
var availableJointsGroupNames: [Self.PoseJointsGroupName] { get }
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `joint(for:)` | `(PoseJointName) -> Joint?` | Retrieves a joint for a given joint name |
| `allJoints(in:)` | `(PoseJointsGroupName?) -> [PoseJointName : Joint]` | Retrieves a dictionary of all joints in the observation or joint group |
| `availableJointNames` | `[PoseJointName]` | The names of the available joints in the observation |
| `availableJointsGroupNames` | `[PoseJointsGroupName]` | The names of the available joint groupings in the observation |
| `PoseJointName` | associatedtype (`Decodable`, `Encodable`, `Hashable`, `RawRepresentable`) | A type that represents a joint name |
| `PoseJointsGroupName` | associatedtype (`CaseIterable`, `RawRepresentable`) | A type that represents a joint group name |

## Notes

- iOS 18.0+ / iPadOS 18.0+ / Mac Catalyst 18.0+ / macOS 15.0+ / tvOS 18.0+ / visionOS 2.0+ / watchOS 27.0+
- All members above are protocol requirements.
- Source: https://developer.apple.com/documentation/vision/poseproviding

## Related

- [DetectAnimalBodyPoseRequest](./detectanimalbodyposerequest.md)
- [DetectHumanHandPoseRequest](./detecthumanhandposerequest.md)
- [DetectHumanBodyPoseRequest (modern)](./detecthumanbodyposerequest-modern.md)
- [VisionObservation](./visionobservation.md)
