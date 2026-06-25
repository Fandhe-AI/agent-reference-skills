# ImageRequestHandler

Modern async/await replacement for `VNImageRequestHandler`, introduced in iOS 18. Processes one or more Vision requests against a single image using Swift concurrency.

## Signature / Usage

```swift
let handler = ImageRequestHandler(cgImage, orientation: nil)

// Single request — result type inferred from request
let observations = try await handler.perform(RecognizeTextRequest())

// Multiple typed requests at once
let (texts, faces) = try await handler.perform(RecognizeTextRequest(), DetectFaceRectanglesRequest())

// Heterogeneous collection
let results = handler.performAll([request1, request2]) // AsyncSequence<VisionResult, Never>
```

## Options / Props

| Initializer parameter | Type | Description |
|----------------------|------|-------------|
| First arg | `URL` / `Data` / `CGImage` / `CIImage` / `CVPixelBuffer` / `CMSampleBuffer` | Image source |
| `depthData` | `AVDepthData?` | Optional depth data (pixel buffer / sample buffer) |
| `orientation` | `CGImagePropertyOrientation?` | EXIF orientation override |

## Notes

- iOS 18.0+ / macOS 15.0+ / tvOS 18.0+ / visionOS 2.0+ / watchOS 11.0+
- `perform<T>(_ request: T)` returns `T.Result` directly — no casting needed.
- Variadic `perform<each T>(repeat each T)` returns a tuple matching the request types.
- Prefer this over `VNImageRequestHandler` for new code targeting iOS 18+.

## Related

- [VNImageRequestHandler](./vnimagerequesthandler.md)
- [RecognizeTextRequest (Swift API)](./recognizetextrequest.md)
