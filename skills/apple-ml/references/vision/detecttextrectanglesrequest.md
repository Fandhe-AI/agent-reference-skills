# DetectTextRectanglesRequest

An image-analysis request that finds regions of visible text in an image, producing a collection of `TextObservation` objects that describe each detected region.

## Signature / Usage

```swift
struct DetectTextRectanglesRequest
```

Creating a request: `init(_ revision: DetectTextRectanglesRequest.Revision?)`. Perform it with any of the `ImageProcessingRequest.perform(on:orientation:)` overloads (`URL`, `Data`, `CGImage`, `CVPixelBuffer`, `CMSampleBuffer`, `CIImage`), each `async throws`.

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `reportCharacterBoxes` | `Bool` | Whether the request detects character-bounding boxes |
| `revision` | `DetectTextRectanglesRequest.Revision` | The algorithm or implementation the request uses |
| `supportedRevisions` | `[DetectTextRectanglesRequest.Revision]` | (static) The collection of revisions the request supports |

## Notes

- iOS 18.0+ / iPadOS 18.0+ / Mac Catalyst 18.0+ / macOS 15.0+ / tvOS 18.0+ / visionOS 2.0+
- `struct` (value type) conforming to `ImageProcessingRequest`, `VisionRequest`, `Sendable`, `Equatable`, `Hashable`, `CustomStringConvertible`.
- Locates text regions only; to read the text itself use `RecognizeTextRequest`.
- Source: https://developer.apple.com/documentation/vision/detecttextrectanglesrequest

## Related

- [RecognizeTextRequest](./recognizetextrequest.md)
- [DetectDocumentSegmentationRequest](./detectdocumentsegmentationrequest.md)
- [RecognizeDocumentsRequest](./recognizedocumentsrequest.md)
- [ImageProcessingRequest](./imageprocessingrequest.md)
