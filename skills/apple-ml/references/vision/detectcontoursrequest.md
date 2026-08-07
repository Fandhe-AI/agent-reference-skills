# DetectContoursRequest

Detects the contours of the edges in an image, returning a `ContoursObservation`.

## Signature / Usage

```swift
var request = DetectContoursRequest()
request.detectsDarkOnLight = true

let handler = ImageRequestHandler(cgImage, orientation: nil)
let observation = try await handler.perform(request)
```

## Options / Props

| Property | Type | Description |
|----------|------|-------------|
| `contrastAdjustment` | `Float` | The amount by which to adjust the image contrast |
| `contrastPivot` | `Float?` | The pixel value to use as a pivot for the contrast |
| `detectsDarkOnLight` | `Bool` | Detect a dark object on a light background to aid detection |
| `maximumImageDimension` | `Int` | The maximum image dimension to use for contour detection |
| `revision` | `DetectContoursRequest.Revision` | The algorithm or implementation the request uses |

## Notes

- iOS 18.0+ / macOS 15.0+ / tvOS 18.0+ / visionOS 2.0+ / watchOS 27.0+ (beta)
- `struct` (value type).
- No legacy VN-prefixed equivalent; this API has no pre-Swift-concurrency counterpart.

## Related

- [DetectRectanglesRequest](./detectrectanglesrequest.md)
- [ImageRequestHandler](./imagerequesthandler.md)
