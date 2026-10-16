# VisionError

An enumeration of the errors that the Vision framework produces. Each case carries a descriptive `String` (except `pixelBufferCreationFailed`, which carries a `CVReturn`).

## Signature / Usage

```swift
enum VisionError
```

## Options / Props

| Case | Description |
|------|-------------|
| `internalError(_:)` | The framework produces an internal error |
| `ioError(_:)` | An I/O problem for an image, image sequence, or Core ML model |
| `operationFailed(_:)` | The operation you request fails |
| `outOfBoundsError(_:)` | An app attempts to access data that's out-of-bounds |
| `outOfMemory(_:)` | There's not enough memory to perform the operation |
| `pixelBufferCreationFailed(_:)` | A problem occurs when creating a pixel buffer (`CVReturn` payload) |
| `requestCancelled(_:)` | An app cancels the request |
| `timeStampNotFound(_:)` | The system can't find a timestamp |
| `timeout(_:)` | An operation times out |
| `invalidArgument(_:)` | A request has an invalid value |
| `invalidFormat(_:)` | A request has data that's formatted incorrectly |
| `invalidImage(_:)` | The input image is invalid |
| `invalidModel(_:)` | The Core ML model isn't compatible with the request |
| `invalidOperation(_:)` | An app requests an unsupported operation |
| `dataUnavailable(_:)` | The required data is missing |
| `unsupportedComputeDevice(_:)` | An app requests a compute device the framework doesn't support |
| `unsupportedComputeStage(_:)` | An app requests a compute stage the framework doesn't support |
| `unsupportedRequest(_:)` | An app attempts a request the framework doesn't support |
| `unsupportedRevision(_:)` | An app specifies a request revision the framework doesn't support |
| `description` | `String` textual description of the error |

## Notes

- iOS 18.0+ / iPadOS 18.0+ / Mac Catalyst 18.0+ / macOS 15.0+ / tvOS 18.0+ / visionOS 2.0+ / watchOS 27.0+
- Conforms to `Error`, `LocalizedError`, `Copyable`, `Escapable`, `Sendable`, `SendableMetatype`.
- The docs page gives only one-line descriptions per case; no further detail is published there.
- Source: https://developer.apple.com/documentation/vision/visionerror

## Related

- [VisionRequest](./visionrequest.md)
- [ImageRequestHandler](./imagerequesthandler.md)
- [DownloadableAssetsRequestStatus](./downloadableassetsrequeststatus.md)
