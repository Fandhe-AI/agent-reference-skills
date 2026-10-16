# DetectDocumentSegmentationRequest

A request that detects a document in an image and returns the four corner points of the document's quadrilateral plus saliency masks, as a `DetectedDocumentObservation`.

## Signature / Usage

```swift
struct DetectDocumentSegmentationRequest
```

Creating a request: `init(_ revision: DetectDocumentSegmentationRequest.Revision?)`. Perform it with any of the `ImageProcessingRequest.perform(on:orientation:)` overloads (`URL`, `Data`, `CGImage`, `CVPixelBuffer`, `CMSampleBuffer`, `CIImage`), each `async throws`.

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `revision` | `DetectDocumentSegmentationRequest.Revision` | The algorithm or implementation the request uses |
| `supportedRevisions` | `[DetectDocumentSegmentationRequest.Revision]` | (static) The collection of revisions the request supports |

## Notes

- iOS 18.0+ / iPadOS 18.0+ / Mac Catalyst 18.0+ / macOS 15.0+ / tvOS 18.0+ / visionOS 2.0+ / watchOS 27.0+
- `struct` (value type) conforming to `ImageProcessingRequest`, `VisionRequest`, `Sendable`, `Equatable`, `Hashable`, `CustomStringConvertible`.
- Result type: `DetectedDocumentObservation`.
- Modern (non-VN-prefixed) request; no configurable properties other than the revision.
- Source: https://developer.apple.com/documentation/vision/detectdocumentsegmentationrequest

## Related

- [DetectTextRectanglesRequest](./detecttextrectanglesrequest.md)
- [RecognizeDocumentsRequest](./recognizedocumentsrequest.md)
- [RecognizeTextRequest](./recognizetextrequest.md)
- [ImageProcessingRequest](./imageprocessingrequest.md)
