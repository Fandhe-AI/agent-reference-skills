# MLComputeDevice

An enumeration of compute devices (CPU, GPU, Neural Engine) available for framework operations, used to inspect the hardware behind an `MLComputePlan`'s device usage.

## Signature / Usage

```swift
enum MLComputeDevice

for device in MLComputeDevice.allComputeDevices {
    switch device {
    case .cpu(let cpuDevice):
        print("CPU: \(cpuDevice)")
    case .gpu(let gpuDevice):
        print("GPU: \(gpuDevice)")
    case .neuralEngine(let aneDevice):
        print("Neural Engine: \(aneDevice)")
    @unknown default:
        break
    }
}
```

## Options / Props

| Case | Description |
|------|-------------|
| `.cpu(_:)` | Represents a CPU compute device; associated value `MLCPUComputeDevice` |
| `.gpu(_:)` | Represents a GPU compute device; associated value `MLGPUComputeDevice` |
| `.neuralEngine(_:)` | Represents a Neural Engine compute device; associated value `MLNeuralEngineComputeDevice` |
| `allComputeDevices` (static) | Returns an array of all accessible compute devices |

## Notes

- iOS 17.0+, iPadOS 17.0+, Mac Catalyst 17.0+, macOS 14.0+, tvOS 17.0+, visionOS 1.0+, watchOS 10.0+
- Related device types: `MLCPUComputeDevice`, `MLGPUComputeDevice`, `MLNeuralEngineComputeDevice`, `MLComputeDeviceProtocol`
- Used by `MLComputePlan.deviceUsage(for:)` to report which devices a model layer/operation is anticipated to run on

## Related

- [MLComputePlan](./mlcomputeplan.md)
- [MLComputeUnits](./mlcomputeunits.md)
