# MLPredictionOptions

Options for a single prediction call. Pass to `MLModel.prediction(from:options:)` or `predictions(from:options:)` to control output buffer allocation.

## Signature / Usage

```swift
class MLPredictionOptions

let options = MLPredictionOptions()
// Provide a pre-allocated CVPixelBuffer for the output feature "segmentationMap"
options.outputBackings = ["segmentationMap": myPixelBuffer]

let output = try model.prediction(from: input, options: options)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `outputBackings` | `[String : Any]` | Client-allocated buffers for output features (e.g. `CVPixelBuffer`) |
| `usesCPUOnly` | `Bool` | **Deprecated.** Restrict execution to CPU only; prefer `MLModelConfiguration.computeUnits` |

## Notes

iOS 11.0+, macOS 10.13+, tvOS 11.0+, watchOS 4.0+, visionOS 1.0+. `usesCPUOnly` is deprecated; set `MLModelConfiguration.computeUnits = .cpuOnly` at model load time instead.

## Related

- [MLModel](./mlmodel.md)
- [MLModelConfiguration](./mlmodelconfiguration.md)
- [MLComputeUnits](./mlcomputeunits.md)
