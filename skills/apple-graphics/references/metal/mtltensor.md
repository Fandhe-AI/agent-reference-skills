# MTLTensor

A resource representing a multi-dimensional array that you can use with machine learning workloads.

## Signature / Usage

```swift
protocol MTLTensor : MTLResource

func getBytes(_: UnsafeMutableRawPointer, strides: MTLTensorExtents, sliceOrigin: MTLTensorExtents, sliceDimensions: MTLTensorExtents)
func replace(sliceOrigin: MTLTensorExtents, sliceDimensions: MTLTensorExtents, withBytes: UnsafeRawPointer, strides: MTLTensorExtents)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `buffer` | `(any MTLBuffer)?` | A buffer this tensor shares its storage with, or `nil` if the tensor does not wrap an underlying buffer |
| `bufferOffset` | `Int` | An offset, in bytes, into the shared buffer, or zero if the tensor does not wrap a buffer |
| `dataType` | `MTLTensorDataType` | The underlying data format of the data plane |
| `dimensions` | `MTLTensorExtents` | Sizes, in elements, one for each dimension of this tensor |
| `strides` | `MTLTensorExtents?` | Strides, in elements, one for each dimension, if applicable |
| `usage` | `MTLTensorUsage` | The set of contexts in which you can use this tensor |
| `gpuResourceID` | `MTLResourceID` | A handle that represents the GPU resource, which you can store in an argument buffer |
| `getBytes(_:strides:sliceOrigin:sliceDimensions:)` | `Void` | Copies data from a slice of the data plane into a pointer you provide |
| `replace(sliceOrigin:sliceDimensions:withBytes:strides:)` | `Void` | Replaces a slice of the data plane with data from a pointer you provide |
| `auxiliaryPlanes` (iOS 27.0+) | `[any MTLTensorAuxiliaryPlane]` | The auxiliary planes of this tensor |
| `getBytes(_:strides:sliceOrigin:sliceDimensions:plane:)` (iOS 27.0+) | `Void` | Copies data from a slice of a plane (`MTLTensorPlaneType`) into a pointer you provide |
| `replace(sliceOrigin:sliceDimensions:plane:withBytes:strides:)` (iOS 27.0+) | `Void` | Replaces a slice of a plane with data from a pointer you provide |

Multi-plane types (all iOS 27.0+, iPadOS / Mac Catalyst / macOS / tvOS / visionOS 27.0+):

| Name | Kind | Description |
|------|------|-------------|
| `MTLTensorAuxiliaryPlane` | protocol : NSObjectProtocol | Configuration and storage of an auxiliary plane in a multi-plane tensor. Properties: `planeType`, `dataType`, `blockFactors` (number of data plane elements per one element in this plane), `buffer`, `bufferOffset` |
| `MTLTensorAuxiliaryPlaneType` | class | An auxiliary plane that a shader's tensor argument requires. Properties: `planeType`, `dataType`, `blockFactors` |
| `MTLTensorPlaneType` | enum | `data` (the main data plane, which every tensor has), `scales` (auxiliary plane that stores scale factors for elements in the data plane) |
| `MTLTensorBufferAttachments` | class | Associates each plane of a tensor with a buffer and byte offset for buffer-backed tensor creation. Methods: `setBuffer(_:offset:for:)`, `buffer(for:)`, `offset(for:)`, `reset()` |
| `MTLDevice.makeTensor(descriptor:attachments:)` | `throws -> any MTLTensor` | Creates a tensor from a descriptor and per-plane buffer backing storage; `attachments` must not be `nil`. Validates the constraints documented on `MTLTensorDescriptor` and `MTLTensorBufferAttachments`, and requires every plane configured in the descriptor (data plane and all auxiliary planes) to have an entry in `attachments` |

## Notes

- `MTLTensor`: iOS 26.0+, iPadOS 26.0+, Mac Catalyst 26.0+, macOS 26.0+, tvOS 26.0+, visionOS 26.0+. Inherits from `MTLResource` (and so `MTLAllocation` / `NSObjectProtocol`). Items marked iOS 27.0+ carry the same 27.0 availability on the other platforms.
- Create tensors with a `MTLTensorDescriptor`. Related types listed by the official page: `MTLTensorExtents`, `MTLTensorReferenceType`, `MTLTensorUsage`, `MTLTensorBinding`, `MTLTensorDataType`, `MTLTensorError`, `MTL_TENSOR_MAX_RANK`.
- Multi-plane tensors are created by setting `MTLTensorDescriptor.auxiliaryPlanes`; see the constraints on that page.
- Distinct from the apple-silicon skill's `MPSNDArray` / `MPSGraphTensor` (MPS / MPSGraph) and the apple-ml skill's `MLMultiArray` (Core ML); `MTLTensor` is a Metal resource (`MTLResource`) bound to shaders and machine learning encoders.
- Source: https://developer.apple.com/documentation/metal/mtltensor

## Related

- [MTLTensorDescriptor](./mtltensordescriptor.md)
- [MTLBuffer](./mtlbuffer.md)
- [MTLDevice](./mtldevice.md)
