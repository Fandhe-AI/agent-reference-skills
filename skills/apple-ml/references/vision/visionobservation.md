# VisionObservation

A protocol for objects produced by image-analysis requests.

## Signature / Usage

```swift
protocol VisionObservation : CustomStringConvertible, Decodable, Encodable, Hashable, Sendable

var uuid: UUID { get }
var confidence: Float { get }
var description: String { get }
var originatingRequestDescriptor: RequestDescriptor? { get }
var timeRange: CMTimeRange? { get }
func hash(into: inout Hasher)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `uuid` | `UUID` | A unique alphanumeric value that the framework assigns the observation |
| `confidence` | `Float` | The level of confidence in the observation's accuracy |
| `description` | `String` | A textual representation of this instance |
| `originatingRequestDescriptor` | `RequestDescriptor?` | The descriptor of the request that produces the observation |
| `timeRange` | `CMTimeRange?` | The time range of the reported observation |
| `hash(into:)` | `(inout Hasher)` | Hashes the essential components of this value (has a default implementation) |

## Notes

- iOS 18.0+ / iPadOS 18.0+ / Mac Catalyst 18.0+ / macOS 15.0+ / tvOS 18.0+ / visionOS 2.0+ / watchOS 27.0+
- `RequestDescriptor` is an enum that describes the request and revision combination.
- Conforming types listed in the docs: `AnimalBodyPoseObservation`, `BarcodeObservation`, `ClassificationObservation`, `ContoursObservation`, `CoreMLFeatureValueObservation`, `DetectedDocumentObservation`, `DetectedObjectObservation`, `DocumentObservation`, `FaceObservation`, `FeaturePrintObservation`, `HorizonObservation`, `HumanBodyPose3DObservation`, `HumanBodyPoseObservation`, `HumanHandPoseObservation`, `HumanObservation`, `ImageAestheticsScoresObservation`, `ImageHomographicAlignmentObservation`, `ImageTranslationAlignmentObservation`, `InstanceMaskObservation`, `OpticalFlowObservation`, `PixelBufferObservation`, `RecognizedObjectObservation`, `RecognizedTextObservation`, `RectangleObservation`, `SaliencyImageObservation`, `SmudgeObservation`, `TextObservation`, `TrajectoryObservation`.
- Modern counterpart of the legacy `VNObservation` class.

## Related

- [VNObservation](./vnobservation.md)
- [PoseProviding](./poseproviding.md)
- [VisionRequest](./visionrequest.md)
- [BoundingBoxProviding](./boundingboxproviding.md)
