# TrackHomographicImageRegistrationRequest

An image-analysis request that you track over time to determine the perspective warp matrix necessary to align the content of two images. It generates an `ImageHomographicAlignmentObservation`.

## Signature / Usage

```swift
final class TrackHomographicImageRegistrationRequest

init(_ revision: TrackHomographicImageRegistrationRequest.Revision?, frameAnalysisSpacing: CMTime?)
```

Perform it with any of the `ImageProcessingRequest.perform(on:orientation:)` overloads (`URL`, `Data`, `CGImage`, `CVPixelBuffer`, `CMSampleBuffer`, `CIImage`), each `async throws`.

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `revision` | `TrackHomographicImageRegistrationRequest.Revision` | The algorithm or implementation the request uses |
| `supportedRevisions` | `[TrackHomographicImageRegistrationRequest.Revision]` | (static) The collection of revisions the request supports |

## Notes

- iOS 18.0+ / iPadOS 18.0+ / Mac Catalyst 18.0+ / macOS 15.0+ / tvOS 18.0+ / visionOS 2.0+ / watchOS 27.0+
- `final class` conforming to `ImageProcessingRequest`, `StatefulRequest`, `TargetedRequest`, `VisionRequest`, `Sendable`, `Equatable`, `Hashable`, `CustomStringConvertible`.
- `ImageHomographicAlignmentObservation` represents a perspective warp transformation. For an affine (translation) alignment use `TrackTranslationalImageRegistrationRequest`.

## Related

- [TrackTranslationalImageRegistrationRequest](./tracktranslationalimageregistrationrequest.md)
- [GenerateImageFeaturePrintRequest](./generateimagefeatureprintrequest.md)
- [TargetedRequest](./targetedrequest.md)
- [StatefulRequest](./statefulrequest.md)
