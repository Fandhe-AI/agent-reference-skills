# MPSGraph

The optimized representation of a compute graph of operations and tensors — the modern, tensor-based successor to `MPSNNGraph`/`cnn-kernels`, part of the separate `MetalPerformanceShadersGraph` framework. A graph is built by calling operation methods on an `MPSGraph` instance (each returning an `MPSGraphTensor`), then run against feed/target dictionaries.

## Signature / Usage

```swift
let graph = MPSGraph()
let x = graph.placeholder(shape: [2, 2], dataType: .float32, name: "x")
let y = graph.constant(2.0, shape: [2, 2], dataType: .float32)
let z = graph.multiplication(x, y, name: "z")

let feeds: [MPSGraphTensor: MPSGraphTensorData] = [x: MPSGraphTensorData(device: graphDevice, data: inputData, shape: [2, 2], dataType: .float32)]
let results = graph.run(with: commandQueue, feeds: feeds, targetTensors: [z], targetOperations: nil)
```

## Options / Props

| Name | Signature | Description |
| --- | --- | --- |
| `placeholder(shape:dataType:name:)` | `([NSNumber]?, MPSDataType, String?) -> MPSGraphTensor` | Declares a graph input fed at run time |
| `constant(_:shape:dataType:)` | `(Double, [NSNumber], MPSDataType) -> MPSGraphTensor` | Declares a constant tensor |
| `run(with:feeds:targetTensors:targetOperations:)` | `(MTLCommandQueue, [MPSGraphTensor: MPSGraphTensorData], [MPSGraphTensor], [MPSGraphOperation]?) -> [MPSGraphTensor: MPSGraphTensorData]` | Synchronously executes the graph and returns results |
| `runAsync(with:feeds:targetTensors:targetOperations:executionDescriptor:)` | — | Non-blocking variant with a completion-capable `MPSGraphExecutionDescriptor` |
| `encode(to:feeds:targetTensors:targetOperations:executionDescriptor:)` | `(MPSCommandBuffer, ...) -> [MPSGraphTensor: MPSGraphTensorData]` | Encodes the graph onto an existing `MPSCommandBuffer` alongside other MPS kernels |
| `placeholderTensors` | `[MPSGraphTensor]` | All placeholder tensors declared on this graph |

## Notes

- `MPSGraphDevice` wraps an `MTLDevice` for graph placement; `MPSGraphExecutionDescriptor` configures completion handlers, waiting semantics, and compilation-descriptor overrides for a single run.
- Available since macOS 11.0, iOS/iPadOS/tvOS 14.0, visionOS 1.0 — noticeably newer than `MPSNNGraph` (11.0/10.13).
- Framework path is `MetalPerformanceShadersGraph`, distinct from the `MetalPerformanceShaders` framework the rest of this category covers — `import MetalPerformanceShadersGraph` is required separately.
- Distinct from Core ML's graph/model API (apple-ml skill): `MPSGraph` builds and executes an ad-hoc tensor graph directly against `MTLCommandQueue`/`MTLDevice`, with no `.mlmodel` involved.

## Related

- [mpsgraph-tensor](./mpsgraph-tensor.md)
- [mpsgraph-executable](./mpsgraph-executable.md)
- [mpsgraph-operations](./mpsgraph-operations.md)
- [mpsnngraph](./mpsnngraph.md)
