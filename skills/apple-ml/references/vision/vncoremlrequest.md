# VNCoreMLRequest

Applies a Core ML model to an image. The result type is determined by the model's output:

- Classifier model → `[VNClassificationObservation]`
- Image-to-image model → `[VNPixelBufferObservation]`
- General predictor → `[VNCoreMLFeatureValueObservation]`

## Signature / Usage

```swift
guard let mlModel = try? MyModel(configuration: MLModelConfiguration()).model,
      let visionModel = try? VNCoreMLModel(for: mlModel) else { return }

let request = VNCoreMLRequest(model: visionModel) { request, error in
    guard let results = request.results as? [VNClassificationObservation] else { return }
    let top = results.first
    print(top?.identifier ?? "", top?.confidence ?? 0)
}

let handler = VNImageRequestHandler(cgImage: cgImage, options: [:])
try handler.perform([request])
```

## Options / Props

| Property | Type | Description |
|----------|------|-------------|
| `model` | `VNCoreMLModel` | The Core ML model container |
| `imageCropAndScaleOption` | `VNImageCropAndScaleOption` | How Vision crops/scales the image before passing to the model |

## Notes

- iOS 11.0+ / macOS 10.13+ / tvOS 11.0+ / visionOS 1.0+
- Vision does **not** normalize confidence values from Core ML models; they are forwarded as-is.
- `VNImageCropAndScaleOption` values: `.centerCrop`, `.scaleFit`, `.scaleFill`.

## Related

- [VNCoreMLModel](./vncoremlmodel.md)
- [VNClassifyImageRequest](./vnclassifyimagerequest.md)
- [VNImageRequestHandler](./vnimagerequesthandler.md)
