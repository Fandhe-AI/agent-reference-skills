# MLModel

The core class encapsulating a machine learning model. Provides prediction methods, configuration, and model description. In most cases, use the Xcode auto-generated wrapper instead of accessing `MLModel` directly.

## Signature / Usage

```swift
class MLModel

// Load synchronously
let model = try MLModel(contentsOf: modelURL)
let model = try MLModel(contentsOf: modelURL, configuration: config)

// Load asynchronously
let model = try await MLModel.load(contentsOf: modelURL, configuration: config)

// Predict
let output = try model.prediction(from: inputFeatureProvider)
let output = try model.prediction(from: inputFeatureProvider, options: options)

// Batch predict
let outputs = try model.predictions(fromBatch: batchProvider)

// Compile a model file
let compiledURL = try MLModel.compileModel(at: sourceURL)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `modelDescription` | `MLModelDescription` | Input/output feature descriptions and metadata |
| `configuration` | `MLModelConfiguration` | The configuration used to load the model |
| `availableComputeDevices` | `[MLComputeDevice]` | Static list of compute devices available on the device |

## Notes

iOS 11.0+, macOS 10.13+, tvOS 11.0+, watchOS 4.0+, visionOS 1.0+. Not thread-safe — use one instance per thread or serialize access.

## Related

- [MLModelConfiguration](./mlmodelconfiguration.md)
- [MLModelDescription](./mlmodeldescription.md)
- [MLFeatureProvider](./mlfeatureprovider.md)
- [MLPredictionOptions](./mlpredictionoptions.md)
- [MLModelAsset](./mlmodelasset.md)
