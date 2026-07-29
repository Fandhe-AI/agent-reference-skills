# metal-compute

| Name | Description | Path |
| --- | --- | --- |
| Compute Pass Encoding | Encode a compute pass with `MTLComputeCommandEncoder` / Metal 4 `MTL4ComputeCommandEncoder` | [compute-pass-encoding.md](./compute-pass-encoding.md) |
| Threadgroup Sizing | Calculate thread/threadgroup/grid sizes from pipeline-state properties | [threadgroup-sizing.md](./threadgroup-sizing.md) |
| Compute Pipeline Configuration | Configure `MTLComputePipelineDescriptor` / `MTL4ComputePipelineDescriptor`, stage-in, function specialization | [compute-pipeline-configuration.md](./compute-pipeline-configuration.md) |
| Indirect Command Buffers | Reusable `MTLIndirectCommandBuffer`, CPU/GPU encoding, optimization | [indirect-command-buffers.md](./indirect-command-buffers.md) |
| Indirect Compute Commands | Encoding `MTLIndirectComputeCommand` entries, GPU-driven dispatch | [indirect-compute-commands.md](./indirect-compute-commands.md) |
| GPU Counters | Discovering supported `MTLCounterSet` / `MTLCounter` on a device | [gpu-counters.md](./gpu-counters.md) |
| Counter Sample Buffers | `MTLCounterSampleBuffer`, resolving counter data, GPU→CPU timestamp conversion | [counter-sample-buffers.md](./counter-sample-buffers.md) |
| Argument Buffers | Grouping resources with `MTLArgumentEncoder` / `MTLArgumentDescriptor` | [argument-buffers.md](./argument-buffers.md) |
| Unified Memory | Storage modes (`shared`/`private`/`memoryless`) and `MTLResidencySet` on Apple silicon | [unified-memory.md](./unified-memory.md) |
