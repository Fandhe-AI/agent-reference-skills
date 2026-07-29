# mpsgraph-tensor

The symbolic and data types that flow through an `MPSGraph`: `MPSGraphTensor` is the symbolic node (shape + dtype, no data), `MPSGraphTensorData` is the concrete backing (an `MTLBuffer`/`MPSMatrix`/`MPSNDArray`/`MPSVector` plus shape/dtype) bound at run time, `MPSGraphOperation` is the executed node in the graph, and `MPSGraphShapedType` describes an expected shape/dtype for type-checking.

## Signature / Usage

```swift
let tensor: MPSGraphTensor = graph.placeholder(shape: [1, 224, 224, 3], dataType: .float32, name: "input")

let data = MPSGraphTensorData(device: graphDevice, data: rawData, shape: [1, 224, 224, 3], dataType: .float32)
// or bind an existing MPSNDArray without copying:
let dataFromArray = MPSGraphTensorData(ndArray)
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `MPSGraphTensor.shape` | `[NSNumber]?` | Declared shape (nil components are inferred at run time) |
| `MPSGraphTensor.dataType` | `MPSDataType` | Element type of the tensor |
| `MPSGraphTensorData(device:data:shape:dataType:)` | initializer | Wraps raw `Data` for feeding a placeholder |
| `MPSGraphTensorData(_:)` (`MPSNDArray`/`MPSMatrix`/`MPSVector`/`MTLBuffer`) | initializer | Zero-copy wrap of an existing MPS storage object |
| `MPSGraphOperation` | class | Represents one executed op in the graph; passed to `targetOperations` when only side effects (not tensor values) are needed |
| `MPSGraphShapedType` | class | Declares an expected `(shape, dataType)` pair, used e.g. for `MPSGraphCompilationDescriptor` input types |

## Notes

- `MPSGraphTensorData` initializers accepting `MPSNDArray`, `MPSMatrix`, `MPSVector`, or `MTLBuffer` avoid a copy — prefer them over the `Data`-based initializer when the source is already GPU-resident.
- Available since macOS 11.0, iOS/iPadOS/tvOS 14.0, visionOS 1.0 (same platform floor as `MPSGraph` itself).

## Related

- [mpsgraph](./mpsgraph.md)
- [mpsndarray](./mpsndarray.md)
- [MPSMatrix](./mpsmatrix.md)
