# MTLTensorDescriptor

A configuration type for creating new tensor instances.

## Signature / Usage

```swift
class MTLTensorDescriptor

// iOS 27.0+: multi-plane tensors
var auxiliaryPlanes: MTLTensorAuxiliaryPlaneDescriptorMap? { get set }
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `dataType` | `MTLTensorDataType` | The data format of all elements in the data plane |
| `dimensions` | `MTLTensorExtents` | Sizes, in elements, one for each dimension of the tensors you create |
| `strides` | `MTLTensorExtents?` | Strides, in elements, one for each dimension, if applicable |
| `usage` | `MTLTensorUsage` | The set of contexts in which you can use tensors you create |
| `storageMode` | `MTLStorageMode` | Memory location and access permissions of the tensors |
| `cpuCacheMode` | `MTLCPUCacheMode` | Cache mode of CPU mapping of the tensors |
| `hazardTrackingMode` | `MTLHazardTrackingMode` | Hazard tracking of the tensors |
| `resourceOptions` | `MTLResourceOptions` | A packed set of `storageMode`, `cpuCacheMode`, and `hazardTrackingMode` |
| `auxiliaryPlanes` (iOS 27.0+) | `MTLTensorAuxiliaryPlaneDescriptorMap?` | The auxiliary plane configurations for this tensor; default `nil` |

Multi-plane configuration types (iOS 27.0+):

| Name | Kind | Description |
|------|------|-------------|
| `MTLTensorAuxiliaryPlaneDescriptorMap` | class | A map of auxiliary plane descriptors keyed by plane type. Methods: `setDescriptor(_:for:)`, `descriptor(for:)`, `reset()` |
| `MTLTensorAuxiliaryPlaneDescriptor` | class | A configuration for an auxiliary plane in a multi-plane tensor; configures the plane's data type and block factors before attaching to a `MTLTensorDescriptor` |

## Notes

- `MTLTensorDescriptor`: iOS 26.0+, iPadOS 26.0+, Mac Catalyst 26.0+, macOS 26.0+, tvOS 26.0+, visionOS 26.0+. Inherits from `NSObject`; conforms to `NSCopying`. `auxiliaryPlanes` and the two multi-plane configuration types are 27.0+ on all platforms.
- Set `auxiliaryPlanes` to a populated `MTLTensorAuxiliaryPlaneDescriptorMap` to create a multi-plane tensor. When `nil`, the tensor has only a data plane.
- Official constraints for multi-plane tensors:
  - `MTLTensorUsage.machineLearning` is not supported; use `MTLTensorUsage.compute` or `MTLTensorUsage.render`.
  - Data types larger than one byte are not supported as the data plane type.
  - Rank zero is not supported.
  - The default value of `auxiliaryPlanes` is `nil`.
- Pass the descriptor to `MTLDevice.makeTensor(descriptor:attachments:)` (iOS 27.0+, buffer-backed per-plane storage) to create the tensor.
- Source: https://developer.apple.com/documentation/metal/mtltensordescriptor

## Related

- [MTLTensor](./mtltensor.md)
- [MTLDevice](./mtldevice.md)
- [MTLTextureDescriptor](./mtltexturedescriptor.md)
