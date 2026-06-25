# VNRequest

Abstract superclass for all Vision framework analysis requests. Cannot be instantiated directly — use one of its concrete subclasses.

## Signature / Usage

```swift
// Use a concrete subclass, e.g.:
let request = VNDetectFaceRectanglesRequest { request, error in
    guard let results = request.results as? [VNFaceObservation] else { return }
    // handle results
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `results` | `[VNObservation]?` | Observations produced after processing |
| `completionHandler` | `VNRequestCompletionHandler?` | Closure invoked when request finishes |
| `revision` | `Int` | Algorithm revision to use |
| `preferBackgroundProcessing` | `Bool` | Hint to reduce resource usage |
| `usesCPUOnly` | `Bool` | **Deprecated.** Force CPU-only execution |

## Notes

- iOS 11.0+ / macOS 10.13+ / tvOS 11.0+ / visionOS 1.0+
- Alpha channel is discarded from input images.
- Use `setComputeDevice(_:for:)` to target a specific compute device per `VNComputeStage`.
- `cancel()` aborts the request before completion.

## Related

- [VNImageRequestHandler](./vnimagerequesthandler.md)
- [VNSequenceRequestHandler](./vnsequencerequesthandler.md)
- [VNObservation](./vnobservation.md)
