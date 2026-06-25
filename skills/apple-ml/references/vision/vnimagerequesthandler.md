# VNImageRequestHandler

Processes one or more Vision requests against a single image. The image source is bound at initialization; call `perform(_:)` to execute.

## Signature / Usage

```swift
let handler = VNImageRequestHandler(cgImage: cgImage, options: [:])
try handler.perform([request])
```

## Options / Props

| Initializer parameter | Type | Description |
|----------------------|------|-------------|
| `cgImage` / `ciImage` / `cvPixelBuffer` / `cmSampleBuffer` / `data` / `url` | (varies) | Image source |
| `orientation` | `CGImagePropertyOrientation` | Optional EXIF orientation |
| `depthData` | `AVDepthData` | Optional depth data (pixel buffer / sample buffer variants) |
| `options` | `[VNImageOption : Any]` | Additional processing options |

## Notes

- iOS 11.0+ / macOS 10.13+ / tvOS 11.0+ / visionOS 1.0+
- **New Swift API (iOS 18+):** Use `ImageRequestHandler` with async/await instead — `try await handler.perform(request)`.
- Pass multiple requests to a single `perform(_:)` call for efficiency; Vision shares image processing work.

## Related

- [VNSequenceRequestHandler](./vnsequencerequesthandler.md)
- [VNRequest](./vnrequest.md)
- [ImageRequestHandler (Swift API)](./imagerequesthandler.md)
