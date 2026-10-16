# TrackTranslationalImageRegistrationRequest

An image-analysis request that you track over time to determine the affine transform necessary to align the content of two images. It generates an `ImageTranslationAlignmentObservation`.

## Signature / Usage

```swift
final class TrackTranslationalImageRegistrationRequest

init(_ revision: TrackTranslationalImageRegistrationRequest.Revision?, frameAnalysisSpacing: CMTime?)
```

Perform it with any of the `ImageProcessingRequest.perform(on:orientation:)` overloads (`URL`, `Data`, `CGImage`, `CVPixelBuffer`, `CMSampleBuffer`, `CIImage`), each `async throws`.

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `revision` | `TrackTranslationalImageRegistrationRequest.Revision` | The algorithm or implementation the request uses |
| `supportedRevisions` | `[TrackTranslationalImageRegistrationRequest.Revision]` | (static) The collection of revisions the request supports |

## Notes

- iOS 18.0+ / iPadOS 18.0+ / Mac Catalyst 18.0+ / macOS 15.0+ / tvOS 18.0+ / visionOS 2.0+ / watchOS 27.0+
- `final class` conforming to `ImageProcessingRequest`, `StatefulRequest`, `TargetedRequest`, `VisionRequest`, `Sendable`, `Equatable`, `Hashable`, `CustomStringConvertible`.
- `ImageTranslationAlignmentObservation` carries affine transform information. For a perspective warp matrix use `TrackHomographicImageRegistrationRequest`.
- The page lists a `ComputeStage` type under "Configuring a request" (enum of compute-stage types; no further detail in the source).
- Source: https://developer.apple.com/documentation/vision/tracktranslationalimageregistrationrequest

## Related

- [TrackHomographicImageRegistrationRequest](./trackhomographicimageregistrationrequest.md)
- [GenerateImageFeaturePrintRequest](./generateimagefeatureprintrequest.md)
- [TargetedRequest](./targetedrequest.md)
- [StatefulRequest](./statefulrequest.md)
