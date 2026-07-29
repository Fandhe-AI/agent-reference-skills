# Green Contexts

Creates CUDA execution contexts that run work only on a reserved subset of a GPU's SMs, by partitioning device SM resources (`cudaDeviceGetDevResource` + `cudaDevSmResourceSplit`) into a descriptor and instantiating a context from it (`cudaGreenCtxCreate`) — useful for isolating latency-sensitive work from co-located throughput workloads on the same GPU.

## Signature / Usage

```c
int gpu_device_index = 0;
cudaSetDevice(gpu_device_index);

cudaDevResource initial_GPU_SM_resources {};
cudaDeviceGetDevResource(gpu_device_index, &initial_GPU_SM_resources, cudaDevResourceTypeSm);

cudaDevSmResource result[2] {{}, {}};
cudaDevSmResourceGroupParams group_params[2] = {
    {.smCount=16, .coscheduledSmCount=0, .preferredCoscheduledSmCount=0, .flags=0},
    {.smCount=8,  .coscheduledSmCount=0, .preferredCoscheduledSmCount=0, .flags=0}};
cudaDevSmResourceSplit(&result[0], 2, &initial_GPU_SM_resources, nullptr, 0, &group_params[0]);

cudaDevResourceDesc_t resource_desc1 {};
cudaDevResourceGenerateDesc(&resource_desc1, &result[0], 1);

cudaExecutionContext_t my_green_ctx1 {};
cudaGreenCtxCreate(&my_green_ctx1, resource_desc1, gpu_device_index, 0);

cudaStream_t strm1;
cudaExecutionCtxStreamCreate(&strm1, my_green_ctx1, cudaStreamDefault, 0);
```

## Options / Props

| Name | Description |
| --- | --- |
| `cudaDeviceGetDevResource` | Retrieves a device's available resources (e.g. `cudaDevResourceTypeSm` for SMs) as a `cudaDevResource`. |
| `cudaDevSmResourceSplit` | Splits an SM resource into `nbGroups` groups per-group `smCount`/`coscheduledSmCount` requests; a `nullptr` result performs a dry-run to discover the achievable split. |
| `cudaDevSmResourceSplitByCount` | Simplified split by SM count only. |
| `cudaDevResourceGenerateDesc` | Packages one or more split resource groups into a `cudaDevResourceDesc_t` for context creation. |
| `cudaGreenCtxCreate` | Creates a `cudaExecutionContext_t` (green context) restricted to the SMs described by a resource descriptor. |
| `cudaExecutionCtxStreamCreate` | Creates a stream bound to a specific execution context (green or primary). |
| `cudaExecutionCtxRecordEvent` / `cudaExecutionCtxWaitEvent` / `cudaExecutionCtxSynchronize` | Event/synchronization operations scoped to an execution context. |
| `cudaExecutionCtxGetDevice` / `cudaExecutionCtxGetId` / `cudaExecutionCtxDestroy` | Query and teardown for an execution context. |

## Notes

- SM splits are constrained by hardware co-scheduling granularity: requested counts are rounded to platform-specific multiples (e.g. multiples of 8, or of 2 with `cudaDevSmResourceGroupBackfill`/ignore-coscheduling flags), and the actual assigned SM count can differ from the request — see `cudaDevSmResourceSplit`'s output.
- Work is launched onto a green context the same way as any other context: create a stream bound to it via `cudaExecutionCtxStreamCreate`, then launch kernels on that stream.
- Green contexts are a spatial-partitioning tool for latency isolation; they do not change a kernel's own parallelism, only which SMs it is allowed to run on.

## Related

- [A Tour of CUDA Features](../core/feature-survey.md)
- [The CUDA Driver API](../core/driver-api.md)
