# GenerateForegroundInstanceMaskRequest

A request that generates an instance mask of noticeable objects to separate from the background, returning an `InstanceMaskObservation`.

## Signature / Usage

```swift
struct GenerateForegroundInstanceMaskRequest
```

Creating a request: `init(_ revision: GenerateForegroundInstanceMaskRequest.Revision?)`. Perform it with any of the `ImageProcessingRequest.perform(on:orientation:)` overloads (`URL`, `Data`, `CGImage`, `CVPixelBuffer`, `CMSampleBuffer`, `CIImage`), each `async throws`.

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `revision` | `GenerateForegroundInstanceMaskRequest.Revision` | The algorithm or implementation the request uses |
| `supportedRevisions` | `[GenerateForegroundInstanceMaskRequest.Revision]` | (static) The collection of revisions the request supports |

## Notes

- iOS 18.0+ / iPadOS 18.0+ / Mac Catalyst 18.0+ / macOS 15.0+ / tvOS 18.0+ / visionOS 2.0+ / watchOS 27.0+
- Selects salient foreground objects automatically. To isolate an arbitrary object from a tap, box, or scribble use `GenerateIterativeSegmentationRequest`.
- Source: https://developer.apple.com/documentation/vision/generateforegroundinstancemaskrequest

## Related

- [GenerateIterativeSegmentationRequest](./generateiterativesegmentationrequest.md)
- [GeneratePersonInstanceMaskRequest](./generatepersoninstancemaskrequest.md)
- [GeneratePersonSegmentationRequest](./generatepersonsegmentationrequest.md)
- [Isolating an object from a tap, box, or scribble](./isolating-an-object-from-a-tap-box-or-scribble.md)
