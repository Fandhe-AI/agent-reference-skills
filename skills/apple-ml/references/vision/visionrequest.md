# VisionRequest

A protocol for image-analysis requests. It is the base of `ImageProcessingRequest`, `StatefulRequest`, and `TargetedRequest`.

## Signature / Usage

```swift
protocol VisionRequest : CustomStringConvertible, Hashable, Sendable

associatedtype Result
var descriptor: RequestDescriptor { get }
var supportedComputeStageDevices: [ComputeStage : [MLComputeDevice]] { get }
func computeDevice(for: ComputeStage) -> MLComputeDevice?
func setComputeDevice(_: MLComputeDevice?, for: ComputeStage)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `Result` | associatedtype | An associated type that represents the result |
| `descriptor` | `RequestDescriptor` | An enum that identifies the request and request revision |
| `supportedComputeStageDevices` | `[ComputeStage : [MLComputeDevice]]` | The collection of compute devices per stage that a request supports |
| `computeDevice(for:)` | `(ComputeStage) -> MLComputeDevice?` | Returns the compute device for a compute stage (has a default implementation) |
| `setComputeDevice(_:for:)` | `(MLComputeDevice?, ComputeStage)` | Assigns a compute device for a compute stage |

## Notes

- iOS 18.0+ / iPadOS 18.0+ / Mac Catalyst 18.0+ / macOS 15.0+ / tvOS 18.0+ / visionOS 2.0+ / watchOS 27.0+
- Inherited by `ImageProcessingRequest`, `StatefulRequest`, `TargetedRequest`.
- `VisionResult` is "the result the framework produces by performing a request" (enum).
- `MLComputeDevice` comes from Core ML; `ComputeStage` is an enum of types that represent the compute stage.
- Conforming request types include `ClassifyImageRequest`, `CoreMLRequest`, `DetectBarcodesRequest`, `DetectContoursRequest`, `DetectDocumentSegmentationRequest`, `DetectRectanglesRequest`, `GenerateImageFeaturePrintRequest`, `RecognizeTextRequest`, `TrackObjectRequest`, and the others listed on `ImageProcessingRequest`.
- Source: https://developer.apple.com/documentation/vision/visionrequest

## Related

- [ImageProcessingRequest](./imageprocessingrequest.md)
- [StatefulRequest](./statefulrequest.md)
- [TargetedRequest](./targetedrequest.md)
- [VisionObservation](./visionobservation.md)
- [VNRequest](./vnrequest.md)
