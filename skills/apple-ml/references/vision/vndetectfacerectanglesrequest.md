# VNDetectFaceRectanglesRequest

Detects faces in an image and returns their bounding boxes as `VNFaceObservation` objects.

## Signature / Usage

```swift
let request = VNDetectFaceRectanglesRequest()
let handler = VNImageRequestHandler(cgImage: cgImage, options: [:])
try handler.perform([request])

if let faces = request.results {
    for face in faces {
        print(face.boundingBox) // normalized rect
    }
}
```

## Notes

- iOS 11.0+ / macOS 10.13+ / tvOS 11.0+ / visionOS 1.0+
- Results type: `[VNFaceObservation]?` — each observation includes `boundingBox`, `roll`, `yaw`, `pitch`.
- Current revision: `VNDetectFaceRectanglesRequestRevision3`.
- Does not detect facial landmarks; use `VNDetectFaceLandmarksRequest` for that.
- As of 2026-10-16 the official documentation classifies this API under "Legacy API" (Original Objective-C and Swift API) in the Vision framework. It carries no deprecation marker; it is not deprecated.

## Related

- [VNDetectFaceLandmarksRequest](./vndetectfacelandmarksrequest.md)
- [VNObservation](./vnobservation.md)
- [VNImageRequestHandler](./vnimagerequesthandler.md)
- [DetectFaceRectanglesRequest (modern)](./detectfacerectanglesrequest-modern.md)
