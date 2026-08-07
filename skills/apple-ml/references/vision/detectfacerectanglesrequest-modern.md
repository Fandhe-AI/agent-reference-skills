# DetectFaceRectanglesRequest (modern)

Modern async/await replacement for `VNDetectFaceRectanglesRequest`, introduced in iOS 18. Finds faces within an image and returns `FaceObservation` bounding boxes.

## Signature / Usage

```swift
let request = DetectFaceRectanglesRequest()
let handler = ImageRequestHandler(cgImage, orientation: nil)
let observations = try await handler.perform(request)

for face in observations {
    print(face.boundingBox)
}
```

## Options / Props

| Property | Type | Description |
|----------|------|-------------|
| `revision` | `DetectFaceRectanglesRequest.Revision` | The algorithm or implementation the request uses |
| `supportedRevisions` | `[DetectFaceRectanglesRequest.Revision]` | The collection of revisions the request supports |

## Notes

- iOS 18.0+ / macOS 15.0+ / tvOS 18.0+ / visionOS 2.0+ / watchOS 11.0+ (beta)
- `struct` (value type), unlike class-based `VNDetectFaceRectanglesRequest`.
- Results are returned as `FaceObservation`, distinct from the legacy `VNFaceObservation`.
- File name carries the `-modern` suffix to avoid collision with `vndetectfacerectanglesrequest.md` (legacy VN-prefixed API).

## Related

- [VNDetectFaceRectanglesRequest](./vndetectfacerectanglesrequest.md)
- [VNDetectFaceLandmarksRequest](./vndetectfacelandmarksrequest.md)
- [ImageRequestHandler](./imagerequesthandler.md)
