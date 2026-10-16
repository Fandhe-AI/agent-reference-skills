# DetectHorizonRequest

An image-analysis request that determines the horizon angle in an image, generating a `HorizonObservation`.

## Signature / Usage

```swift
struct DetectHorizonRequest
```

Creating a request: `init(_ revision: DetectHorizonRequest.Revision?)`. Perform it with any of the `ImageProcessingRequest.perform(on:orientation:)` overloads (`URL`, `Data`, `CGImage`, `CVPixelBuffer`, `CMSampleBuffer`, `CIImage`), each `async throws`.

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `revision` | `DetectHorizonRequest.Revision` | The algorithm or implementation the request uses |
| `supportedRevisions` | `[DetectHorizonRequest.Revision]` | (static) The collection of revisions the request supports |

## Notes

- iOS 18.0+ / iPadOS 18.0+ / Mac Catalyst 18.0+ / macOS 15.0+ / tvOS 18.0+ / visionOS 2.0+ / watchOS 27.0+
- `HorizonObservation` carries the horizon angle information.

## Related

- [DetectContoursRequest](./detectcontoursrequest.md)
- [DetectRectanglesRequest](./detectrectanglesrequest.md)
- [ImageProcessingRequest](./imageprocessingrequest.md)
