# VNCoreMLModel

A container that wraps a Core ML `MLModel` for use with `VNCoreMLRequest`.

## Signature / Usage

```swift
let mlModel = try MyClassifier(configuration: MLModelConfiguration()).model
let visionModel = try VNCoreMLModel(for: mlModel)
let request = VNCoreMLRequest(model: visionModel) { request, error in
    // handle results
}
```

## Options / Props

| Property | Type | Description |
|----------|------|-------------|
| `featureProvider` | `(any MLFeatureProvider)?` | Supplies extra input features not provided by Vision |
| `inputImageFeatureName` | `String` | Name of the feature Vision uses to set the image input |

## Notes

- iOS 11.0+ / macOS 10.13+ / tvOS 11.0+ / visionOS 1.0+
- Initializer throws if the model's input/output types are incompatible with Vision.
- Use `featureProvider` when the model requires inputs beyond the image (e.g., text prompts or scalar features).
- As of 2026-10-16 the "Legacy API" (Original Objective-C and Swift API) page in the official Vision documentation lists `VNCoreMLRequest`, the request this container is used with; `VNCoreMLModel` itself is not listed on that page. No deprecation marker; not deprecated.

## Related

- [VNCoreMLRequest](./vncoremlrequest.md)
- [VNRequest](./vnrequest.md)
- [CoreMLRequest](./coremlrequest.md)
