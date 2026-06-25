# VNSequenceRequestHandler

Processes Vision requests across a sequence of image frames. Create once, then supply each frame individually via `perform(_:on:)`.

## Signature / Usage

```swift
let sequenceHandler = VNSequenceRequestHandler()

// Called per frame (e.g., in AVCaptureVideoDataOutputSampleBufferDelegate)
try sequenceHandler.perform([trackingRequest], on: pixelBuffer)
```

## Options / Props

| Method | Image source |
|--------|-------------|
| `perform(_:on:)` | `CGImage` |
| `perform(_:on:)` | `CIImage` |
| `perform(_:on:)` | `CVPixelBuffer` |
| `perform(_:on:)` | `CMSampleBuffer` |
| `perform(_:onImageData:)` | `Data` |
| `perform(_:onImageURL:)` | `URL` |

All variants accept an optional `orientation: CGImagePropertyOrientation` parameter.

## Notes

- iOS 11.0+ / macOS 10.13+ / tvOS 11.0+ / visionOS 1.0+
- Designed for stateful tracking requests (`VNStatefulRequest` subclasses) that accumulate evidence across frames.
- Unlike `VNImageRequestHandler`, the image is not bound at init — reuse the same handler object for every frame.

## Related

- [VNImageRequestHandler](./vnimagerequesthandler.md)
- [VNRequest](./vnrequest.md)
