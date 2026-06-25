# VNDetectFaceLandmarksRequest

Detects facial features (eyes, nose, mouth, contours) in an image. Returns `VNFaceObservation` objects with a populated `landmarks` property.

## Signature / Usage

```swift
let request = VNDetectFaceLandmarksRequest()
let handler = VNImageRequestHandler(cgImage: cgImage, options: [:])
try handler.perform([request])

if let faces = request.results {
    for face in faces {
        let leftEye = face.landmarks?.leftEye
        // leftEye.normalizedPoints — array of CGPoint in face bounding box space
    }
}
```

## Options / Props

| Property | Type | Description |
|----------|------|-------------|
| `constellation` | `VNRequestFaceLandmarksConstellation` | How landmark points are ordered/enumerated |
| `inputFaceObservations` | `[VNFaceObservation]?` | Pre-detected faces to restrict analysis to |

## Notes

- iOS 11.0+ / macOS 10.13+ / tvOS 11.0+ / visionOS 1.0+
- Results type: `[VNFaceObservation]?` — `face.landmarks` is a `VNFaceLandmarks2D` with regions like `leftEye`, `rightEye`, `nose`, `outerLips`, `faceContour`, etc.
- If `inputFaceObservations` is `nil`, the request first runs face detection internally.
- Current revision: `VNDetectFaceLandmarksRequestRevision3`.

## Related

- [VNDetectFaceRectanglesRequest](./vndetectfacerectanglesrequest.md)
- [VNObservation](./vnobservation.md)
