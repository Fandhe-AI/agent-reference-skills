# Tensors

`MTLTensor` is a Metal resource representing a multi-dimensional array for machine learning workloads (iOS / iPadOS / Mac Catalyst / macOS / tvOS / visionOS 26.0+). Create it from an `MTLTensorDescriptor`, fill it with `replace(sliceOrigin:sliceDimensions:withBytes:strides:)`, read it back with `getBytes`, and bind it through `gpuResourceID` in an argument table.

## Signature / Usage

```swift
// Declarations (Swift)
protocol MTLTensor : MTLResource
class MTLTensorDescriptor
class MTLTensorExtents
enum MTLTensorDataType
struct MTLTensorUsage

// MTLDevice
func makeTensor(descriptor: MTLTensorDescriptor) throws -> any MTLTensor
// MTLBuffer (shares storage with the buffer; single-plane only)
func makeTensor(descriptor: MTLTensorDescriptor, offset: Int) throws -> any MTLTensor
// MTLDevice, multi-plane with per-plane buffer backing storage (27.0+)
func makeTensor(descriptor: MTLTensorDescriptor, attachments: MTLTensorBufferAttachments) throws -> any MTLTensor
```

```objective-c
// Create (from the "Running a machine learning model on the GPU timeline" sample)
MTLTensorDescriptor *tensorDescriptor = [MTLTensorDescriptor new];
tensorDescriptor.usage = MTLTensorUsageMachineLearning;
tensorDescriptor.dimensions = dimensions;   // MTLTensorExtents, innermost dimension first
tensorDescriptor.dataType = dataType;       // MTLTensorDataType

NSError *error = nil;
id<MTLTensor> tensor = [device newTensorWithDescriptor:tensorDescriptor
                                                 error:&error];

// Fill: copy CPU memory into a tensor slice
[tensor replaceSliceOrigin:zeroExtents
           sliceDimensions:dimensions
                 withBytes:self.data.bytes
                   strides:strides];

// Bind through gpuResourceID in an argument table
[argumentTable setResource:tensor.gpuResourceID
             atBufferIndex:binding.index];

// Read back
[tensor getBytes:matrixData.mutableBytes
         strides:strides
 fromSliceOrigin:zeroExtents
 sliceDimensions:dimensions];
```

Adapted (not in the official docs): multi-plane tensor (iOS / macOS 27.0+) assembled from the declared `MTLTensorAuxiliaryPlaneDescriptorMap`, `MTLTensorBufferAttachments`, and `makeTensor(descriptor:attachments:)` signatures; `device`, `descriptor` (data plane configured, `usage` set to `compute`), `dataBuffer`, and `scalesBuffer` are assumed to exist.

```swift
let planes = MTLTensorAuxiliaryPlaneDescriptorMap()
planes.setDescriptor(MTLTensorAuxiliaryPlaneDescriptor(), for: .scales)
descriptor.auxiliaryPlanes = planes

let attachments = MTLTensorBufferAttachments()
attachments.setBuffer(dataBuffer, offset: 0, for: .data)
attachments.setBuffer(scalesBuffer, offset: 0, for: .scales)

let tensor = try device.makeTensor(descriptor: descriptor, attachments: attachments)
```

## Options / Props

`MTLTensor` members:

| Name | Kind | Description |
|------|------|-------------|
| `auxiliaryPlanes` | property | Auxiliary planes of the tensor |
| `buffer` | property | Backing buffer |
| `bufferOffset` | property | Offset into the backing buffer |
| `dataType` | property | Element data type |
| `dimensions` | property | Per-dimension sizes (`MTLTensorExtents`) |
| `gpuResourceID` | property | Handle written into an argument table entry |
| `strides` | property | Per-dimension strides |
| `usage` | property | `MTLTensorUsage` the tensor was created for |
| `getBytes(_:strides:sliceOrigin:sliceDimensions:)` | method | Copy a tensor slice to CPU memory |
| `getBytes(_:strides:sliceOrigin:sliceDimensions:plane:)` | method | Same, for a specific plane |
| `replace(sliceOrigin:sliceDimensions:withBytes:strides:)` | method | Copy CPU memory into a tensor slice |
| `replace(sliceOrigin:sliceDimensions:plane:withBytes:strides:)` | method | Same, for a specific plane |

`MTLTensorDescriptor` properties: `auxiliaryPlanes`, `cpuCacheMode`, `dataType`, `dimensions`, `hazardTrackingMode`, `resourceOptions`, `storageMode`, `strides`, `usage`.

`MTLTensorExtents`: integer array holding per-dimension values such as tensor sizes, strides, or block factors. Supports a rank between `0` and `MTL_TENSOR_MAX_RANK`. Members: `init(_:)`, `extents`, `rank` (the Objective-C sample uses `initWithRank:values:` and `extentAtDimensionIndex:`).

`MTLTensorDataType` cases: `none`, `bfloat16`, `float16`, `float32`, `int2`, `int4`, `int8`, `int16`, `int32`, `uint2`, `uint4`, `uint8`, `uint16`, `uint32`, `metalFloat4e2m1`, `metalFloat8e4m3`, `metalFloat8e5m2`, `metalFloat8ue8m0`. Initializer: `init(rawValue:)`.

`MTLTensorUsage` type properties: `compute`, `machineLearning`, `render`.

### Auxiliary planes (27.0+)

| Type | Kind | Description |
|------|------|-------------|
| `MTLTensorPlaneType` | enum | Plane types: `data` (the main data plane every tensor has) and `scales` (auxiliary plane storing scale factors for elements in the data plane) |
| `MTLTensorAuxiliaryPlaneDescriptor` | class | Configuration of one auxiliary plane: `dataType` (default `metalFloat8ue8m0`) and `blockFactors` (data-plane elements per plane element; first element must be `32`, all others `1`; default is a 1D block of width `32`) |
| `MTLTensorAuxiliaryPlaneDescriptorMap` | class | Descriptors keyed by plane type: `setDescriptor(_:for:)`, `descriptor(for:)`, `reset()`. Assign to `MTLTensorDescriptor.auxiliaryPlanes` (default `nil`, data plane only) to create a multi-plane tensor |
| `MTLTensorAuxiliaryPlane` | protocol | Read-only view of a created tensor's auxiliary plane: `blockFactors`, `buffer`, `bufferOffset`, `dataType`, `planeType` (`MTLTensor.auxiliaryPlanes` is empty for single-plane tensors) |
| `MTLTensorAuxiliaryPlaneType` | class | An auxiliary plane that a shader's tensor argument requires: `blockFactors`, `dataType`, `planeType` (exposed through `MTLTensorBinding` / `MTLTensorReferenceType` `auxiliaryPlanes`) |
| `MTLTensorBufferAttachments` | class | Per-plane buffer and byte offset for buffer-backed creation: `setBuffer(_:offset:for:)`, `buffer(for:)`, `offset(for:)`, `reset()` |

`MTLTensorBinding` (protocol, `MTLBinding`): a tensor bound to a graphics or compute function or a machine learning function. Properties: `auxiliaryPlanes`, `dimensions`, `indexType`, `tensorDataType`. `MTLTensorReferenceType` (class): a tensor in the shading language in a struct or array. Properties: `access`, `auxiliaryPlanes`, `dimensions`, `indexType`, `tensorDataType`.

## Notes

- `makeTensor(descriptor:)` validates the constraints documented on `MTLTensorDescriptor` and throws if validation fails.
- `MTLBuffer.makeTensor(descriptor:offset:)` creates a single-plane tensor sharing storage with the buffer. Additional requirements: `offset` is 0 when `usage` contains `machineLearning`; `offset` is aligned to 128 bytes if the data plane uses a format `MTLTensorDataType`, otherwise aligned to the data type size in bytes. It does not create tensors with auxiliary planes; use `makeTensor(descriptor:attachments:)` for multi-plane tensors with per-plane buffer backing storage.
- Metal tensors define dimensions with the innermost dimension first (for a matrix, index 0 is columns and index 1 is rows).
- In the sample, a dimension equal to `-1` (as `NSUInteger`) in a binding marks a dynamic shape; the sample returns early rather than creating a tensor for it.
- Use `machineLearning` usage for tensors that participate in machine learning passes.
- Multi-plane tensors (27.0+): `auxiliaryPlanes` on `MTLTensorDescriptor` does not support `machineLearning` usage (use `compute` or `render`), data plane types larger than one byte, or rank zero. `setDescriptor(_:for:)` does not accept `data` (the data plane is configured on `MTLTensorDescriptor` itself), and `scales` planes only support `metalFloat8ue8m0`.
- `makeTensor(descriptor:attachments:)` additionally requires an `attachments` entry for every plane in the descriptor (data plane and all auxiliary planes). `setBuffer(_:offset:for:)` needs a 128-byte aligned offset for planes of `int2`, `uint2`, `int4`, `uint4`, `metalFloat4e2m1`, `metalFloat8e4m3`, `metalFloat8e5m2`, or `metalFloat8ue8m0`; otherwise the offset aligns to the plane's data type size.
- The `plane:` variants of `getBytes` / `replace` take auxiliary-plane slice coordinates after applying the plane's block factors, require strides that are monotonically non-decreasing (`strides[i] >= strides[i-1] * dimensions[i-1]` for `i > 0`), a byte-aligned first slice dimension, and a tensor created with `storageModeShared` for CPU access.
- The MSL side of multi-plane tensors (`tensor_blockwise`, Metal 4.1) is covered in `msl/tensor-types.md`.
- Distinct from MPSNDArray (MetalPerformanceShaders, see this skill's `mps` references), from the `MTLBuffer` and `MTL4CommandBuffer` classes documented in apple-graphics, and from Core AI `NDArray` (apple-ml). Tensor equivalence or conversion between these types is not covered by the sources used here.
- Source (retrieved 2026-10-16): https://developer.apple.com/documentation/metal/mtltensor, https://developer.apple.com/documentation/metal/mtltensordescriptor, https://developer.apple.com/documentation/metal/mtltensorextents, https://developer.apple.com/documentation/metal/mtltensordatatype, https://developer.apple.com/documentation/metal/mtltensorusage, https://developer.apple.com/documentation/metal/mtltensorbinding, https://developer.apple.com/documentation/metal/mtltensorreferencetype, https://developer.apple.com/documentation/metal/running-inline-ml-operations-in-a-shader-with-metal-4
- Source (retrieved 2026-11-14, auxiliary planes and `plane:` variants; DocC JSON, `introducedAt` 27.0, no beta flag): https://developer.apple.com/documentation/metal/mtltensorplanetype, https://developer.apple.com/documentation/metal/mtltensorauxiliaryplanedescriptor, https://developer.apple.com/documentation/metal/mtltensorauxiliaryplanedescriptormap, https://developer.apple.com/documentation/metal/mtltensorauxiliaryplane, https://developer.apple.com/documentation/metal/mtltensorauxiliaryplanetype, https://developer.apple.com/documentation/metal/mtltensorbufferattachments, https://developer.apple.com/documentation/metal/mtltensordescriptor/auxiliaryplanes, https://developer.apple.com/documentation/metal/mtldevice/maketensor(descriptor:attachments:), https://developer.apple.com/documentation/metal/mtltensor/getbytes(_:strides:sliceorigin:slicedimensions:plane:), https://developer.apple.com/documentation/metal/mtltensor/replace(sliceorigin:slicedimensions:plane:withbytes:strides:)

## Related

- [Machine Learning Passes](./machine-learning-passes.md)
- [Argument Buffers](./argument-buffers.md)
- [Unified Memory](./unified-memory.md)
- [Tensor Types (MSL)](../msl/tensor-types.md)
