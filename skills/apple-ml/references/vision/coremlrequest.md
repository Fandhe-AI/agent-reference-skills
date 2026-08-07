# CoreMLRequest

Modern async/await replacement for `VNCoreMLRequest`, introduced in iOS 18. Applies a Core ML model to an image via Vision's Swift concurrency pipeline.

## Signature / Usage

```swift
let mlModel = try MyModel(configuration: MLModelConfiguration()).model
let container = try CoreMLModelContainer(model: mlModel)

let request = CoreMLRequest(model: container)
let handler = ImageRequestHandler(cgImage, orientation: nil)
let observations = try await handler.perform(request)
```

## Options / Props

| Property | Type | Description |
|----------|------|-------------|
| `modelContainer` | `CoreMLModelContainer` | The model to base the image analysis request on |
| `cropAndScaleAction` | `ImageCropAndScaleAction` | How to scale an input image before generating results |
| `supportedIdentifiers` | `[String]?` | Classification identifiers supported by the request, if applicable |
| `revision` | `CoreMLRequest.Revision` | The algorithm or implementation the request uses |
| `supportedRevisions` | `[CoreMLRequest.Revision]` | The collection of revisions the request supports |

## Notes

- Result type depends on the model output: classifier models → `ClassificationObservation`, image-to-image models → `PixelBufferObservation`, general predictors → `CoreMLFeatureValueObservation`.
- Vision forwards confidence values from Core ML models as-is; it does not normalize them to `[0, 1]`.
- Uses `CoreMLModelContainer` instead of `VNCoreMLModel` to wrap the `MLModel`.

## Related

- [VNCoreMLRequest](./vncoremlrequest.md)
- [VNCoreMLModel](./vncoremlmodel.md)
- [ClassifyImageRequest](./classifyimagerequest.md)
- [ImageRequestHandler](./imagerequesthandler.md)
