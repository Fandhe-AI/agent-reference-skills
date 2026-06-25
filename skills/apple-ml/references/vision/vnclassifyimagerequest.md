# VNClassifyImageRequest

Classifies the content of an image using Vision's built-in model. Returns `VNClassificationObservation` objects with identifier strings and confidence values.

## Signature / Usage

```swift
let request = VNClassifyImageRequest()
let handler = VNImageRequestHandler(cgImage: cgImage, options: [:])
try handler.perform([request])

if let classifications = request.results {
    let confident = classifications.filter { $0.confidence > 0.5 }
    confident.forEach { print($0.identifier, $0.confidence) }
}
```

## Notes

- iOS 13.0+ / macOS 10.15+ / tvOS 13.0+ / visionOS 1.0+
- Results type: `[VNClassificationObservation]?`.
- Call `try request.supportedIdentifiers()` to get all classification labels available in the current configuration.
- Does not require a user-supplied model; uses Apple's on-device classifier.

## Related

- [VNCoreMLRequest](./vncoremlrequest.md)
- [VNObservation](./vnobservation.md)
- [VNImageRequestHandler](./vnimagerequesthandler.md)
