# DetectHumanRectanglesRequest

A request that finds rectangular regions that contain people in an image, producing `HumanObservation` objects.

## Signature / Usage

```swift
struct DetectHumanRectanglesRequest
```

Creating a request: `init(_ revision: DetectHumanRectanglesRequest.Revision?)`. Perform it with any of the `ImageProcessingRequest.perform(on:orientation:)` overloads (`URL`, `Data`, `CGImage`, `CVPixelBuffer`, `CMSampleBuffer`, `CIImage`), each `async throws`.

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `upperBodyOnly` | `Bool` | Whether the request requires only detecting a human upper body to produce a result |
| `revision` | `DetectHumanRectanglesRequest.Revision` | The algorithm or implementation the request uses |
| `supportedRevisions` | `[DetectHumanRectanglesRequest.Revision]` | (static) The collection of revisions the request supports |

## Notes

- iOS 18.0+ / iPadOS 18.0+ / Mac Catalyst 18.0+ / macOS 15.0+ / tvOS 18.0+ / visionOS 2.0+ / watchOS 27.0+
- `HumanObservation` represents a person that the request detects.
- Listed under "Image classification and recognition" together with `ClassifyImageRequest` and `RecognizeAnimalsRequest`.

## Related

- [RecognizeAnimalsRequest](./recognizeanimalsrequest.md)
- [ClassifyImageRequest](./classifyimagerequest.md)
- [ImageProcessingRequest](./imageprocessingrequest.md)
