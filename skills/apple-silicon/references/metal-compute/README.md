# metal-compute

| Name | Description | Path |
| --- | --- | --- |
| Argument Buffers | Grouping shader resources (buffers, textures, samplers, pipeline states, ICBs) into one argument buffer | [argument-buffers.md](./argument-buffers.md) |
| Compute Pass Encoding | `MTLComputeCommandEncoder` and `MTL4ComputeCommandEncoder` workflow: bind pipeline and resources, dispatch, end encoding | [compute-pass-encoding.md](./compute-pass-encoding.md) |
| Compute Pipeline Configuration | Compute pipeline state descriptors for traditional and Metal 4 pipelines, stage-in input, function specialization | [compute-pipeline-configuration.md](./compute-pipeline-configuration.md) |
| Counter Sample Buffers | `MTLCounterSampleBuffer` storage and GPU performance-counter sampling during a compute pass | [counter-sample-buffers.md](./counter-sample-buffers.md) |
| GPU Counters | Discovering the hardware performance counters a GPU device exposes | [gpu-counters.md](./gpu-counters.md) |
| Indirect Command Buffers | `MTLIndirectCommandBuffer` (ICB): reusable, GPU-executable buffers of encoded commands | [indirect-command-buffers.md](./indirect-command-buffers.md) |
| Indirect Compute Commands | `MTLIndirectComputeCommand` dispatches, including GPU-driven threadgroup counts | [indirect-compute-commands.md](./indirect-compute-commands.md) |
| Machine Learning Passes | `MTL4MachineLearningCommandEncoder` runs Core ML models in the GPU timeline (Metal 4) | [machine-learning-passes.md](./machine-learning-passes.md) |
| Tensors | `MTLTensor` multi-dimensional resource, `MTLTensorDescriptor`, `replace(sliceOrigin:sliceDimensions:withBytes:strides:)`, `getBytes`, `gpuResourceID` | [tensors.md](./tensors.md) |
| Threadgroup Sizing | Threads, threadgroups, SIMD groups; sizes derived from `MTLComputePipelineState` properties | [threadgroup-sizing.md](./threadgroup-sizing.md) |
| Unified Memory | `MTLResourceOptions` storage modes and `MTLResidencySet` for GPU-resident memory | [unified-memory.md](./unified-memory.md) |
