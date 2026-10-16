# Machine Learning Passes

Metal 4 runs Core ML models in the GPU timeline through `MTL4MachineLearningCommandEncoder`, alongside render and compute passes in the same command buffer. All APIs below are iOS / iPadOS / Mac Catalyst / macOS / tvOS / visionOS 26.0+.

## Signature / Usage

```shell
# Convert a Core ML model into a Metal package (Xcode 26+)
% xcrun metal-package-builder -ml ./path/to/model.mlpackage -o ./output/path/to/ml-model.mtlpackage
```

```objective-c
// Pipeline descriptor with reflection (from the Apple sample)
MTL4LibraryFunctionDescriptor *functionDescriptor = [MTL4LibraryFunctionDescriptor new];
functionDescriptor.name = @"main";
functionDescriptor.library = library;

MTL4MachineLearningPipelineDescriptor *pipelineDescriptor = [MTL4MachineLearningPipelineDescriptor new];
pipelineDescriptor.machineLearningFunctionDescriptor = functionDescriptor;

MTL4PipelineOptions *options = [MTL4PipelineOptions new];
options.shaderReflection = MTL4ShaderReflectionBindingInfo;
pipelineDescriptor.options = options;

[pipelineDescriptor setInputDimensions:extents atBufferIndex:tensorBinding.index];

id<MTL4MachineLearningPipelineState> state =
    [compiler newMachineLearningPipelineStateWithDescriptor:pipelineDescriptor error:&error];

// Intermediates heap (must support the placement option)
MTLHeapDescriptor *heapDescriptor = [MTLHeapDescriptor new];
heapDescriptor.type = MTLHeapTypePlacement;
heapDescriptor.size = state.intermediatesHeapSize;
intermediatesHeap = [device newHeapWithDescriptor:heapDescriptor];

// Encode and run
[commandBuffer beginCommandBufferWithAllocator:commandAllocator];
id<MTL4MachineLearningCommandEncoder> encoder = [commandBuffer machineLearningCommandEncoder];
[encoder setArgumentTable:argumentTable];
[encoder setPipelineState:state];
[encoder dispatchNetworkWithIntermediatesHeap:intermediatesHeap];
[encoder endEncoding];
[commandBuffer endCommandBuffer];
[commandQueue commit:&commandBuffer count:1];
```

```swift
// Declarations (Swift)
protocol MTL4MachineLearningCommandEncoder : MTL4CommandEncoder
func dispatchNetwork(intermediatesHeap heap: any MTLHeap)
protocol MTL4MachineLearningPipelineState : MTLAllocation, Sendable
// MTL4Compiler
func makeMachineLearningPipelineState(descriptor: MTL4MachineLearningPipelineDescriptor) async throws -> any MTL4MachineLearningPipelineState
func makeMachineLearningPipelineState(descriptor: MTL4MachineLearningPipelineDescriptor) throws -> any MTL4MachineLearningPipelineState
// MTL4MachineLearningPipelineDescriptor
var machineLearningFunctionDescriptor: MTL4FunctionDescriptor? { get set }
```

## Options / Props

| Type | Members |
|------|---------|
| `MTL4MachineLearningCommandEncoder` | `setPipelineState(_:)`, `setArgumentTable(_:)`, `dispatchNetwork(intermediatesHeap:)` |
| `MTL4MachineLearningPipelineState` | `device`, `intermediatesHeapSize`, `label`, `reflection` |
| `MTL4MachineLearningPipelineDescriptor` | `label`, `machineLearningFunctionDescriptor`, `inputDimensions(bufferIndex:)`, `reset()`, `setInputDimensions(_:bufferIndex:)` (two overloads) |
| `MTL4MachineLearningPipelineReflection` | `bindings` |

## Notes

- Create the encoder from an `MTL4CommandBuffer` factory method, `makeMachineLearningCommandEncoder()` in Swift; this method is listed in the apple-graphics `mtl4commandbuffer` page. `dispatchNetwork(intermediatesHeap:)` applies to the `machineLearning` stage; synchronize with other passes using barriers between stages (see `MTLStages` and resource synchronization).
- Workflow in the sample: create `MTL4Compiler`, compile the pipeline state from the `main` function of the library (Metal packages for ML models designate `main` as the entry point), extract tensor bindings from `pipelineState.reflection.bindings` (match by name; order is arbitrary; skip bindings whose type is not `MTLBindingTypeTensor`), create tensors matching the bindings, bind each via `gpuResourceID` to the argument table, create the intermediates heap, encode, commit, then signal and wait on an `MTLSharedEvent`.
- `intermediatesHeapSize` is the minimum size Metal requires for the heap passed to `dispatchNetwork(intermediatesHeap:)`. Each ML encoder needs a heap supporting the placement option.
- Models with dynamic-shape inputs need specific dimensions at pipeline creation; create one pipeline state per unique combination of input dimensions.
- Machine learning encoders run Core ML models but cannot build new networks or modify layers and inputs of existing ones (see Core ML and MetalPerformanceShadersGraph).
- The system automatically chooses an inference engine (GPU or Apple Neural Engine) per model. When the ANE is chosen, the GPU can run other independent render or compute work.
- The Core ML to Metal package conversion tooling (`metal-package-builder`) belongs to apple-ml; beyond the command shown in Apple's page, details such as supported model formats or operator coverage are unverified here.
- MSL 4 adds tensor types, tensor operators (convolution, matrix multiplication, reduction), cooperative tensors, and operation descriptors, usable in all GPU stages.
- Compiled via `MTL4Compiler`; the `async throws` overload creates the pipeline state asynchronously.
- Source (retrieved 2026-10-16): https://developer.apple.com/documentation/metal/machine-learning-passes, https://developer.apple.com/documentation/metal/mtl4machinelearningcommandencoder, https://developer.apple.com/documentation/metal/mtl4machinelearningpipelinestate, https://developer.apple.com/documentation/metal/mtl4machinelearningpipelinedescriptor, https://developer.apple.com/documentation/metal/mtl4machinelearningpipelinereflection, https://developer.apple.com/documentation/metal/running-a-machine-learning-model-on-the-gpu-timeline, https://developer.apple.com/documentation/metal/running-inline-ml-operations-in-a-shader-with-metal-4

## Related

- [Tensors](./tensors.md)
- [Compute Pipeline Configuration](./compute-pipeline-configuration.md)
- [Compute Pass Encoding](./compute-pass-encoding.md)
