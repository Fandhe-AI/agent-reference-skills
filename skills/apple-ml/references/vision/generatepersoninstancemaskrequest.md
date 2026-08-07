# GeneratePersonInstanceMaskRequest

Produces a mask of individual people found in the input image, returning an `InstanceMaskObservation`.

## Signature / Usage

```swift
let request = GeneratePersonInstanceMaskRequest()
let handler = ImageRequestHandler(cgImage, orientation: nil)
let observation = try await handler.perform(request)
```

## Options / Props

| Property | Type | Description |
|----------|------|-------------|
| `revision` | `GeneratePersonInstanceMaskRequest.Revision` | The algorithm or implementation the request uses |
| `supportedRevisions` | `[GeneratePersonInstanceMaskRequest.Revision]` | The collection of revisions the request supports |

## Notes

- iOS 18.0+ / macOS 15.0+ / tvOS 18.0+ / visionOS 2.0+ / watchOS 27.0+ (beta)
- `struct` (value type).
- Unlike `GeneratePersonSegmentationRequest`, produces per-instance masks that distinguish multiple people in the same image.

## Related

- [GeneratePersonSegmentationRequest](./generatepersonsegmentationrequest.md)
- [ImageRequestHandler](./imagerequesthandler.md)
