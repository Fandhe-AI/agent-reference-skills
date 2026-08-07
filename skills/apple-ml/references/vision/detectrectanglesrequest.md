# DetectRectanglesRequest

Finds projected rectangular regions in an image, such as credit cards, business cards, documents, and signs, returning `RectangleObservation` results with normalized bounding-box coordinates.

## Signature / Usage

```swift
var request = DetectRectanglesRequest()
request.minimumConfidence = 0.8
request.maximumObservations = 5

let handler = ImageRequestHandler(cgImage, orientation: nil)
let observations = try await handler.perform(request)
```

## Options / Props

| Property | Type | Description |
|----------|------|-------------|
| `minimumConfidence` | `Float` | The minimum acceptable confidence level for detected rectangles |
| `minimumAspectRatio` | `Float` | The smallest aspect ratio the request detects |
| `maximumAspectRatio` | `Float` | The largest aspect ratio the request detects |
| `minimumSize` | `Float` | The minimum size of the rectangle as a proportion of the smallest dimension |
| `maximumObservations` | `Int` | The maximum number of rectangles the request returns |
| `quadratureToleranceDegrees` | `Float` | The maximum deviation of a corner angle from 90° |

## Notes

- iOS 18.0+ / macOS 15.0+ / tvOS 18.0+ / visionOS 2.0+ / watchOS 27.0+ (beta)
- `struct` (value type).
- No legacy VN-prefixed equivalent; this API has no pre-Swift-concurrency counterpart.

## Related

- [DetectContoursRequest](./detectcontoursrequest.md)
- [ImageRequestHandler](./imagerequesthandler.md)
