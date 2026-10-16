# TargetedRequest

A protocol for requests that analyze two images together. It inherits from `VisionRequest`.

## Signature / Usage

```swift
protocol TargetedRequest : VisionRequest
```

## Notes

- iOS 18.0+ / iPadOS 18.0+ / Mac Catalyst 18.0+ / macOS 15.0+ / tvOS 18.0+ / visionOS 2.0+ / watchOS 27.0+
- Inherits from `VisionRequest`, `Sendable`, `SendableMetatype`, `Equatable`, `Hashable`, `CustomStringConvertible`.
- The docs page lists no members of its own.
- Conforming types listed in the docs: `TrackHomographicImageRegistrationRequest`, `TrackOpticalFlowRequest`, `TrackTranslationalImageRegistrationRequest`. Used with `TargetedImageRequestHandler`.

## Related

- [StatefulRequest](./statefulrequest.md)
- [TargetedImageRequestHandler](./targetedimagerequesthandler.md)
- [TrackOpticalFlowRequest](./trackopticalflowrequest.md)
- [TrackHomographicImageRegistrationRequest](./trackhomographicimageregistrationrequest.md)
- [TrackTranslationalImageRegistrationRequest](./tracktranslationalimageregistrationrequest.md)
