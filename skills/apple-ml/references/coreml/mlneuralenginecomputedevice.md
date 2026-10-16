# MLNeuralEngineComputeDevice

An object that represents a Neural Engine compute device.

## Signature / Usage

```swift
class MLNeuralEngineComputeDevice
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `totalCoreCount` | `Int` | The total number of cores in the Neural Engine |

## Notes

- iOS 17.0+, iPadOS 17.0+, Mac Catalyst 17.0+, macOS 14.0+, tvOS 17.0+, visionOS 1.0+, watchOS 10.0+
- Inherits from `NSObject`; conforms to `MLComputeDeviceProtocol`, `NSObjectProtocol`, `Sendable`, `SendableMetatype`, `Equatable`, `Hashable`
- Obtained as the associated value of `MLComputeDevice.neuralEngine(_:)`

## Related

- [MLComputeDevice](./mlcomputedevice.md)
- [MLComputeDeviceProtocol](./mlcomputedeviceprotocol.md)
- [MLCPUComputeDevice](./mlcpucomputedevice.md)
- [MLGPUComputeDevice](./mlgpucomputedevice.md)
