# MLComputeDeviceProtocol

An interface that represents a compute device type.

## Signature / Usage

```swift
protocol MLComputeDeviceProtocol : NSObjectProtocol
```

## Notes

- iOS 17.0+, iPadOS 17.0+, Mac Catalyst 17.0+, macOS 14.0+, tvOS 17.0+, visionOS 1.0+, watchOS 10.0+
- Conforming types: `MLCPUComputeDevice`, `MLGPUComputeDevice`, `MLNeuralEngineComputeDevice`
- `MLAllComputeDevices` (Objective-C) returns an array that contains all of the compute devices that are accessible
- Source: https://developer.apple.com/documentation/coreml/mlcomputedeviceprotocol

## Related

- [MLComputeDevice](./mlcomputedevice.md)
- [MLCPUComputeDevice](./mlcpucomputedevice.md)
- [MLGPUComputeDevice](./mlgpucomputedevice.md)
- [MLNeuralEngineComputeDevice](./mlneuralenginecomputedevice.md)
