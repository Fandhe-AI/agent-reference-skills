# mpsgraph-executable

The compiled representation of a compute graph executable. `MPSGraphExecutable` is produced by `MPSGraph.compile(with:feeds:targetTensors:targetOperations:compilationDescriptor:)` (or loaded from a serialized package) and lets a graph be specialized once and run repeatedly without recompiling.

## Signature / Usage

```swift
let executable = graph.compile(with: graphDevice, feeds: feedTypes,
                                targetTensors: [z], targetOperations: nil,
                                compilationDescriptor: MPSGraphCompilationDescriptor())

let outputs = executable.run(with: commandQueue, inputs: [inputData], results: nil,
                              executionDescriptor: nil)
```

## Options / Props

| Name | Description |
| --- | --- |
| `specialize(with:inputTypes:compilationDescriptor:)` | Locks in concrete input shapes/dtypes for a compiled executable |
| `run(with:inputs:results:executionDescriptor:)` / `runAsync(with:inputs:results:executionDescriptor:)` | Synchronous / asynchronous execution against an `MTLCommandQueue` |
| `run(on:inputs:results:executionDescriptor:)` / `runAsync(on:...)` | Variants that execute on an explicit `MPSCommandBuffer` |
| `serialize(package:descriptor:)` | Writes the compiled executable to disk via `MPSGraphExecutableSerializationDescriptor` |
| `init(MPSGraphPackageAtURL:compilationDescriptor:)` | Loads a previously serialized `MPSGraph` package |
| `init(coreMLPackageAtURL:compilationDescriptor:)` | Loads a Core ML package directly as an `MPSGraphExecutable` |
| `MPSGraphCompilationDescriptor` | Configures optimization level (`MPSGraphOptimization`), deployment platform, and callback hooks used at compile time |

## Notes

- Available since macOS 12.0, iOS/iPadOS/tvOS 15.0, visionOS 1.0 — one release later than `MPSGraph` itself, since compiled-executable support shipped after the initial graph API.
- `init(coreMLPackageAtURL:compilationDescriptor:)` is the direct bridge from a Core ML `.mlpackage` into MPSGraph's own execution path — distinct from loading a model through Core ML's own `MLModel` API (apple-ml skill), which uses Core ML's own compute-unit scheduling instead.

## Related

- [mpsgraph](./mpsgraph.md)
- [mpsgraph-tensor](./mpsgraph-tensor.md)
