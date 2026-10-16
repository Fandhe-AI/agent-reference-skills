# TargetedImageRequestHandler

An object that performs image-analysis requests on two images (a source and a target). Used with `TargetedRequest` types such as the image-registration and optical-flow requests.

## Signature / Usage

```swift
final class TargetedImageRequestHandler

convenience init(sourceURL: URL, targetURL: URL, orientation: CGImagePropertyOrientation?)
convenience init(source: CGImage, target: CGImage, orientation: CGImagePropertyOrientation?)

func perform<T>(_: T) async throws -> T.Result
func perform<each T>(_: repeat each T) async throws -> (repeat (each T).Result)
func performAll(_: some Collection<any TargetedRequest>) -> some AsyncSequence<VisionResult, Never>
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `init(sourceURL:targetURL:orientation:)` | `(URL, URL, CGImagePropertyOrientation?)` | Creates a handler for performing requests on an image at the specified URL |
| `init(source:target:orientation:)` | `Data`, `CGImage`, `CVPixelBuffer`, `CMSampleBuffer`, or `CIImage` pairs | Convenience initializers for image data, Core Graphics images, Core Video pixel buffers, sample buffers, and Core Image images |
| `perform(_:)` | `async throws` | Performs a framework request (or one or more requests via the variadic overload) on the handler's image |
| `performAll(_:)` | `(some Collection<any TargetedRequest>) -> some AsyncSequence<VisionResult, Never>` | Schedules a collection of framework requests to perform on the handler's image |

## Notes

- iOS 18.0+ / iPadOS 18.0+ / Mac Catalyst 18.0+ / macOS 15.0+ / tvOS 18.0+ / visionOS 2.0+ / watchOS 27.0+
- `final class` conforming to `Sendable` and `SendableMetatype`.
- Sibling handlers: `ImageRequestHandler` (single image) and `VideoProcessor` (video).
- Source: https://developer.apple.com/documentation/vision/targetedimagerequesthandler

## Related

- [TargetedRequest](./targetedrequest.md)
- [ImageRequestHandler](./imagerequesthandler.md)
- [VideoProcessor](./videoprocessor.md)
- [TrackOpticalFlowRequest](./trackopticalflowrequest.md)
