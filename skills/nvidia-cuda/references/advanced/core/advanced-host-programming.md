# Advanced CUDA APIs and Features

Host-side APIs for advanced kernel launch configuration, stream/event control, programmatic dependent launch, and batched memory transfers.

## Signature / Usage

```cpp
cudaLaunchConfig_t config = {0};
config.gridDim = grid;
config.blockDim = block;
cudaLaunchAttribute attribute[1];
attribute[0].id = cudaLaunchAttributeClusterDimension;
attribute[0].val.clusterDim.x = 2;
config.attrs = attribute;
config.numAttrs = 1;
cudaLaunchKernelEx(&config, cluster_kernel, input, output);
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `cudaLaunchKernelEx` | function | Extended kernel launch taking a `cudaLaunchConfig_t` instead of the `<<<>>>` triple-angle-bracket syntax; required to pass launch attributes such as cluster dimensions. |
| `cudaLaunchConfig_t` | struct | Holds `gridDim`, `blockDim`, `dynamicSmemBytes`, `stream`, `attrs`, `numAttrs`. |
| `cudaLaunchAttribute` | struct | Tagged union of launch attributes (`id` + `val`). |
| `cudaLaunchAttributeClusterDimension` | enum value | Requests thread block cluster dimensions for the launch. |
| `cudaLaunchAttributePreferredClusterDimension` | enum value | Requests a preferred (non-mandatory) cluster shape. |
| `cudaLaunchAttributePreferredSharedMemoryCarveout` | enum value | Hints the L1/shared memory carveout for the launch. |
| `cudaLaunchAttributeProgrammaticStreamSerialization` | enum value | Enables programmatic dependent launch (PDL) between a primary and secondary kernel. |
| `cudaStreamCreateWithFlags` / `cudaStreamNonBlocking` | function/flag | Creates a stream that does not implicitly synchronize with the default stream. |
| `cudaStreamCreateWithPriority` / `cudaDeviceGetStreamPriorityRange` | function | Creates a stream with an explicit priority within the device's supported priority range. |
| `cudaStreamSynchronize`, `cudaEventSynchronize`, `cudaDeviceSynchronize` | function | Blocking waits scoped to a stream, an event, or the whole device respectively. |
| `cudaStreamQuery`, `cudaEventQuery` | function | Non-blocking status checks; return `cudaSuccess` or `cudaErrorNotReady`. |
| `cudaStreamWaitEvent` | function | Makes all future work submitted to a stream wait on an event recorded elsewhere, without blocking the host. |
| `cudaMemcpyBatchAsync` / `cudaMemcpyBatch3DAsync` | function | Issues many memcpy operations as a single batched API call via `cudaMemcpyAttributes` / `cudaMemLocation`, reducing per-call launch overhead. |

## Notes

- `cudaLaunchKernelEx` is the only way to attach launch attributes (cluster dimensions, shared memory carveout, PDL) — the `<<<>>>` syntax cannot express them.
- Stream/event synchronization has three tiers: wait-for-stream (`cudaStreamSynchronize`), wait-for-event (`cudaEventSynchronize`), wait-for-device (`cudaDeviceSynchronize`). Prefer the narrowest scope to avoid unnecessary serialization.
- `CUDA_DEVICE_MAX_CONNECTIONS` and `CUDA_MODULE_LOADING=EAGER` are environment variables that affect concurrency and module loading behavior at process startup.
- Batched memory transfers (`cudaMemcpyBatchAsync`) reduce API call overhead for workloads issuing many small transfers.

## Related

- [Advanced Kernel Programming](./advanced-kernel-programming.md)
- [CUDA Graphs](../features/cuda-graphs.md)
- [Programmatic Dependent Launch and Synchronization](../features/programmatic-dependent-launch.md)
