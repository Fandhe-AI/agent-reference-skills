# MLGPUComputeDevice

An object that represents a GPU compute device.

## Signature / Usage

```swift
class MLGPUComputeDevice
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `metalDevice` | `(any MTLDevice)!` | The device that represents the underlying metal device |

## Notes

- iOS 17.0+, iPadOS 17.0+, Mac Catalyst 17.0+, macOS 14.0+, tvOS 17.0+, visionOS 1.0+, watchOS 10.0+
- Inherits from `NSObject`; conforms to `MLComputeDeviceProtocol`, `NSObjectProtocol`, `Sendable`, `SendableMetatype`, `Equatable`, `Hashable`
- Obtained as the associated value of `MLComputeDevice.gpu(_:)`

## Related

- [MLComputeDevice](./mlcomputedevice.md)
- [MLComputeDeviceProtocol](./mlcomputedeviceprotocol.md)
- [MLCPUComputeDevice](./mlcpucomputedevice.md)
- [MLNeuralEngineComputeDevice](./mlneuralenginecomputedevice.md)
