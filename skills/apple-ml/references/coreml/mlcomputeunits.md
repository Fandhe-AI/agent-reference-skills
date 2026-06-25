# MLComputeUnits

An enumeration of the compute unit configurations a Core ML model may use. Set via `MLModelConfiguration.computeUnits` before loading a model.

## Signature / Usage

```swift
enum MLComputeUnits: Int

let config = MLModelConfiguration()
config.computeUnits = .all          // let Core ML decide (default)
config.computeUnits = .cpuOnly      // CPU only (background-safe)
config.computeUnits = .cpuAndGPU    // CPU + GPU, no Neural Engine
config.computeUnits = .cpuAndNeuralEngine  // CPU + ANE, no GPU
```

## Options / Props

| Case | Description |
|------|-------------|
| `.all` | Use all available compute units; OS picks the best at runtime |
| `.cpuOnly` | CPU only; recommended for background tasks or GPU-intensive apps |
| `.cpuAndGPU` | CPU and GPU; excludes the Apple Neural Engine |
| `.cpuAndNeuralEngine` | CPU and Apple Neural Engine; excludes GPU |

## Notes

iOS 12.0+, macOS 10.14+, tvOS 12.0+, watchOS 5.0+, visionOS 1.0+. The `.all` default is appropriate for most foreground inference tasks. Changing compute units requires reloading the model.

## Related

- [MLModelConfiguration](./mlmodelconfiguration.md)
- [MLPredictionOptions](./mlpredictionoptions.md)
