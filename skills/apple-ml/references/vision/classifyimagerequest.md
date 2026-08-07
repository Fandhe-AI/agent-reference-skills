# ClassifyImageRequest

Modern async/await replacement for `VNClassifyImageRequest`, introduced in iOS 18. Classifies image content using Vision's built-in model and returns `ClassificationObservation` objects.

## Signature / Usage

```swift
if let imageURL = Bundle.main.url(forResource: "ClassificationImage", withExtension: "jpg") {
    let request = ClassifyImageRequest()
    let results = try await request.perform(on: imageURL)
    for classification in results {
        print("Classified \(classification.identifier)")
    }
}
```

## Options / Props

| Property | Type | Description |
|----------|------|-------------|
| `cropAndScaleAction` | `ImageCropAndScaleAction` | How to scale an input image before generating results |
| `supportedIdentifiers` | `[String]` | The classification identifiers the request supports |
| `revision` | `ClassifyImageRequest.Revision` | The algorithm or implementation the request uses |
| `supportedRevisions` | `[ClassifyImageRequest.Revision]` | The collection of revisions the request supports |

## Notes

- iOS 18.0+ / macOS 15.0+ / tvOS 18.0+ / visionOS 2.0+ / watchOS 27.0+ (beta)
- `struct` (value type), unlike its class-based predecessor.
- `perform(on:orientation:)` overloads accept `URL`, `Data`, `CGImage`, `CIImage`, `CVPixelBuffer`, `CMSampleBuffer`.
- Does not require a user-supplied model; uses Apple's on-device classifier, same as `VNClassifyImageRequest`.

## Related

- [VNClassifyImageRequest](./vnclassifyimagerequest.md)
- [CoreMLRequest](./coremlrequest.md)
- [ImageRequestHandler](./imagerequesthandler.md)
