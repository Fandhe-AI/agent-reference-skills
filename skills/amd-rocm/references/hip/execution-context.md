# Execution Contexts (hipGreenCtx)

An execution context is the scheduling domain for GPU work. It is either the device's implicitly managed primary context or a resource-partitioned context created with `hipGreenCtxCreate`, which confines streams on that context to a fixed slice of compute units (CUs). Analogous to CUDA green contexts.

## Signature / Usage

Initialize the primary context, read resources, split the CU resource, bundle into a descriptor, create the context; then create a stream on it.

```cpp
HIP_CHECK(hipSetDevice(0)); // initialize the primary context before hipGreenCtxCreate
hipDevResource cu_resources = {};
HIP_CHECK(hipDeviceGetDevResource(0, &cu_resources, hipDevResourceTypeSm));

hipDevResource result[2] = {};
hipDevSmResourceGroupParams group_params[2] = {
    {/*smCount=*/16, /*coscheduledSmCount=*/0, /*preferredCoscheduledSmCount=*/0, /*flags=*/0},
    {/*smCount=*/8,  /*coscheduledSmCount=*/0, /*preferredCoscheduledSmCount=*/0, /*flags=*/0}};
HIP_CHECK(hipDevSmResourceSplit(&result[0], 2, &cu_resources,
                                nullptr /* remainder */, 0 /* flags */, &group_params[0]));

hipDevResourceDesc_t desc = {};
HIP_CHECK(hipDevResourceGenerateDesc(&desc, &result[0], 1));

hipExecutionCtx_t exec_ctx = {};
HIP_CHECK(hipGreenCtxCreate(&exec_ctx, desc, 0, 0));

hipStream_t stream;
HIP_CHECK(hipExecutionCtxStreamCreate(&stream, exec_ctx, hipStreamDefault, 0));
my_kernel<<<grid_dim, block_dim, 0, stream>>>();
HIP_CHECK(hipGetLastError());
```

## Options / Props

| API | Signature | Description |
| --- | --- | --- |
| `hipDeviceGetDevResource` | `(hipDevice_t device, hipDevResource* resource, hipDevResourceType type)` | Read device resources (CU, work queue config, work queue) |
| `hipExecutionCtxGetDevResource` | `(hipExecutionCtx_t ctx, hipDevResource* resource, hipDevResourceType type)` | Read resources held by a context |
| `hipStreamGetDevResource` | `(hipStream_t hStream, hipDevResource* resource, hipDevResourceType type)` | Read the CU partition behind a stream; only `hipDevResourceTypeSm` is supported, others return `hipErrorInvalidResourceType` |
| `hipDevSmResourceSplitByCount` | `(hipDevResource* result, unsigned int* nbGroups, const hipDevResource* input, hipDevResource* remainder, unsigned int flags, unsigned int minCount)` | Equal-sized CU partitions; may return fewer groups than requested |
| `hipDevSmResourceSplit` | `(hipDevResource* result, unsigned int nbGroups, const hipDevResource* input, hipDevResource* remainder, unsigned int flags, hipDevSmResourceGroupParams* groupParams)` | Different-sized partitions in one call; `smCount = 0` is discovery mode |
| `hipDevResourceGenerateDesc` | `(hipDevResourceDesc_t* phDesc, hipDevResource* resources, unsigned int nbResources)` | Bundle adjacent resources into a descriptor |
| `hipGreenCtxCreate` | `(hipExecutionCtx_t* ctx, hipDevResourceDesc_t desc, int device, unsigned int flags)` | Create a context; pass `0` for flags |
| `hipExecutionCtxStreamCreate` | `(hipStream_t* stream, hipExecutionCtx_t ctx, unsigned int flags, int priority)` | Create a stream bound to the context; default flag behaves like `hipStreamNonBlocking` |
| `hipExecutionCtxRecordEvent` / `hipExecutionCtxWaitEvent` | | Event sync across all outstanding work of a context |
| `hipExecutionCtxSynchronize` | | Block host until the context finishes; on the primary context (from `hipDeviceGetExecutionCtx`) also waits on every execution context of that device |
| `hipExecutionCtxGetDevice` / `hipExecutionCtxGetId` | | Device behind a context / its unique id |
| `hipExecutionCtxDestroy` | | Release a context |

Resource types: `hipDevResourceTypeSm` (set of CUs), `hipDevResourceTypeWorkqueueConfig`, `hipDevResourceTypeWorkqueue`; `hipDevResourceTypeInvalid` marks an unset resource.

CU resource (`hipDevSmResource`):

| Field | Description |
| --- | --- |
| `smCount` | Number of CUs in this resource |
| `minSmPartitionSize` | Smallest CU count this resource can be split into |
| `smCoscheduledAlignment` | CUs guaranteed to be co-scheduled together |
| `flags` | `0` (default) or `hipDevSmResourceGroupBackfill` |

Work queue configuration (`hipDevWorkqueueConfigResource`): `device`, `wqConcurrencyLimit` (expected concurrent stream-ordered workloads), `sharingScope` (`hipDevWorkqueueConfigScopeDeviceCtx` default, or `hipDevWorkqueueConfigScopeGreenCtxBalanced`).

Group params (`hipDevSmResourceGroupParams`): `smCount`, `coscheduledSmCount`, `preferredCoscheduledSmCount` (hint), `flags`. Entries are processed in order, index 0 first.

## Notes

- `sm` identifiers (`smCount`, `hipDevResourceTypeSm`) are kept so CUDA code compiles unchanged; on AMD GPUs the physical resource is the compute unit.
- Do not hard-code `minSmPartitionSize` / `smCoscheduledAlignment`; read them at runtime. `smCoscheduledAlignment` is 2 CUs in WGP mode (typical on RDNA and recent CDNA) and 1 CU in CU mode. Request CU counts in multiples of it.
- The resource from `hipDeviceGetDevResource` is intersected with the `ROC_GLOBAL_CU_MASK` environment variable. The device-wide work queue upper bound is `GPU_MAX_HW_QUEUES`.
- Work queue configuration is optional and is a hint; reading it from a device is not supported on every ROCm runtime, so check the returned status.
- `hipDevSmResourceSplitIgnoreSmCoscheduling` is defined but not yet supported (returns `hipErrorNotSupported`). With `result = nullptr`, split calls act as a dry run and can report success for a configuration that would fail with a real output.
- Creating a context does not stop other streams outside a context from using the same CUs; split into disjoint partitions and launch each workload only on its own context's streams. Partitions do not force concurrency.
- Initialize the primary context first (`hipSetDevice` or `hipInitDevice`) before `hipGreenCtxCreate`.
- Destroy a context's streams before the context; operations on an orphaned stream other than `hipStreamDestroy` return `hipErrorContextIsDestroyed`.
- Graphs: each node's execution context is fixed at node creation; under stream capture a node inherits the captured stream's context.
- Execution contexts are within-process and finer-grained than hardware compute partitioning (SPX / CPX), which is configured at system level; they are not a multi-process service equivalent.
- CUDA mapping: `CUgreenCtx` -> `hipExecutionCtx_t`, `cuGreenCtxCreate` -> `hipGreenCtxCreate`, `cuGreenCtxDestroy` -> `hipExecutionCtxDestroy`, `cuGreenCtxStreamCreate` -> `hipExecutionCtxStreamCreate`, `cuStreamGetGreenCtx` -> `hipStreamGetDevResource` (not a drop-in equivalent: `hipStreamGetDevResource(hStream, hipDevResource* resource, hipDevResourceType type)` returns the stream's CU partition (the execution context's partition for a context stream, the explicit mask for a `hipExtStreamCreateWithCUMask` stream, the full available resource otherwise; only `hipDevResourceTypeSm` is supported), not a `hipExecutionCtx_t` handle). CUDA aligns to SM granularity; HIP aligns to `smCoscheduledAlignment`, so do not port fixed SM counts directly.
- Snippets show the calling sequence only; build and run on a ROCm system before reuse. Full example: HIP-Basic `execution_context` in ROCm/rocm-examples.
- Source: `rocm.docs.amd.com/projects/HIP/en/latest/how-to/hip_runtime_api/execution_context.html` (rocm-systems `projects/hip/docs`, commit `d2fcac49fed8c335ba363c1a560fd29feb71039a`).

## Related

- [stream-management.md](./stream-management.md)
- [module-context-management.md](./module-context-management.md)
- [occupancy.md](./occupancy.md)
- [graph-management.md](./graph-management.md)
