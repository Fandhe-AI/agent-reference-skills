# VNDetectHumanBodyPoseRequest

Detects the 2D pose of a human body in an image, returning joint positions as `VNHumanBodyPoseObservation` objects.

## Signature / Usage

```swift
let request = VNDetectHumanBodyPoseRequest()
let handler = VNImageRequestHandler(cgImage: cgImage, options: [:])
try handler.perform([request])

if let poses = request.results {
    for pose in poses {
        let rightWrist = try? pose.recognizedPoint(.rightWrist)
        print(rightWrist?.location ?? .zero, rightWrist?.confidence ?? 0)
    }
}
```

## Notes

- iOS 14.0+ / macOS 11.0+ / tvOS 14.0+ / visionOS 1.0+
- Results type: `[VNHumanBodyPoseObservation]?`.
- Each observation exposes `recognizedPoint(_:)` for individual joints and `recognizedPoints(_:)` for joint groups.
- Joint names: `.nose`, `.leftEye`, `.rightEye`, `.leftEar`, `.rightEar`, `.leftShoulder`, `.rightShoulder`, `.leftElbow`, `.rightElbow`, `.leftWrist`, `.rightWrist`, `.leftHip`, `.rightHip`, `.leftKnee`, `.rightKnee`, `.leftAnkle`, `.rightAnkle`, `.root`, `.neck`.
- Call `VNDetectHumanBodyPoseRequest.supportedJointNames(forRevision:)` to enumerate available joint names at runtime.
- As of 2026-10-16 the official documentation classifies this API under "Legacy API" (Original Objective-C and Swift API) in the Vision framework. It carries no deprecation marker; it is not deprecated.

## Related

- [VNObservation](./vnobservation.md)
- [VNImageRequestHandler](./vnimagerequesthandler.md)
- [VNRequest](./vnrequest.md)
- [DetectHumanBodyPoseRequest (modern)](./detecthumanbodyposerequest-modern.md)
