# MLModelConfiguration

Settings for creating or updating a Core ML model. Controls compute unit selection, GPU precision, Metal device preference, and custom model parameters.

## Signature / Usage

```swift
class MLModelConfiguration

let config = MLModelConfiguration()
config.computeUnits = .all
config.preferredMetalDevice = myMTLDevice
config.parameters = [paramKey: paramValue]

let model = try MLModel(contentsOf: modelURL, configuration: config)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `computeUnits` | `MLComputeUnits` | Processing units (CPU, GPU, Neural Engine) the model may use |
| `allowLowPrecisionAccumulationOnGPU` | `Bool` | Enables low-precision accumulation on GPU for performance |
| `modelDisplayName` | `String?` | Human-readable display name for the model |
| `preferredMetalDevice` | `(any MTLDevice)?` | Preferred Metal GPU device for inference and updating |
| `functionName` | `String?` | Specific function the model will use |
| `parameters` | `[MLParameterKey : Any]?` | Override model parameters at load time |
| `optimizationHints` | `MLOptimizationHints` | Hints for Core ML runtime optimization |

## Notes

iOS 12.0+, macOS 10.14+, tvOS 12.0+, watchOS 5.0+, visionOS 1.0+. Conforms to `NSCoding`, `NSCopying`, and `NSSecureCoding`.

## Related

- [MLComputeUnits](./mlcomputeunits.md)
- [MLModel](./mlmodel.md)
