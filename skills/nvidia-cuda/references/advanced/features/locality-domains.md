# Locality Domains

A locality domain is a portion of a GPU containing SMs and device memory. Co-locating compute (green context SMs) and memory (pool / VMM allocations) in the same locality domain can improve performance on devices with more than one locality domain.

## Signature / Usage

```cpp
// Discover locality domains
int localityDomainCount = 0;
int smsPerLocalityDomain = 0;

cudaDeviceGetAttribute(&localityDomainCount, cudaDevAttrLocalityDomainCount, device);
cudaDeviceGetAttribute(&smsPerLocalityDomain, cudaDevAttrLocalityDomainMultiprocessorCount, device);

// Localize SMs: one green context + stream per locality domain
std::vector<cudaExecutionContext_t> contexts(localityDomainCount);
std::vector<cudaStream_t> streams(localityDomainCount);

{
    std::vector<cudaDevSmResourceGroupParams> params(localityDomainCount);
    std::vector<cudaDevResource> result(localityDomainCount);

    for (int i = 0; i < localityDomainCount; i++) {
        params[i] = {};
        params[i].flags = cudaDevSmResourceGroupLocalityDomainId;
        params[i].localityDomainId = i;
    }

    // A single split produces non-overlapping resources for all domains.
    cudaDevSmResourceSplit(result.data(), localityDomainCount, &smResource, nullptr, 0, params.data());

    for (int i = 0; i < localityDomainCount; i++) {
        cudaDevResourceDesc_t desc;
        cudaDevResourceGenerateDesc(&desc, &result[i], 1);
        cudaGreenCtxCreate(&contexts[i], desc, device, 0);
        cudaExecutionCtxStreamCreate(&streams[i], contexts[i], cudaStreamDefault, 0);
    }
}

// Localized memory pool
cudaMemPool_t pool {};
cudaMemPoolProps props {};

props.allocType = cudaMemAllocationTypePinned;
props.location.type = cudaMemLocationTypeDeviceLocalityDomain;
props.location.localized.deviceId = device;
props.location.localized.localityDomainId = localityDomainId;

cudaMemPoolCreate(&pool, &props);
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `cudaDevAttrLocalityDomainCount` | `cudaDeviceAttr` | Number of locality domains on the device. |
| `cudaDevAttrLocalityDomainMultiprocessorCount` | `cudaDeviceAttr` | Number of SMs in each locality domain. |
| `cudaDevSmResourceGroupLocalityDomainId` | flag in `cudaDevSmResourceGroupParams.flags` | Requests a localized SM group; the ID goes in `localityDomainId` (valid `0` to `cudaDevAttrLocalityDomainCount - 1`). |
| `cudaDevSmResourceGroupBackfill` | flag in `params.flags` | Fills the group from the requested domain first, then from SMs not attributed to a domain, then from other domains. Fails with `cudaErrorInvalidResourceConfiguration` if no SM is found in the requested domain. |
| `cudaMemLocationTypeDeviceLocalityDomain` | `cudaMemLocation.type` | Localized memory location; initialize both `location.localized.deviceId` and `location.localized.localityDomainId`. |
| `CU_MEM_LOCATION_TYPE_DEVICE_LOCALITY_DOMAIN` | `CUmemAllocationProp::location.type` | Driver API location type for localized VMM allocations created by `cuMemCreate`. |
| `cudaMemPoolAttrLocalityDomainId` | `cudaMemPoolGetAttribute` attribute | Locality domain ID of a pool; `-1` if the pool is not localized. |
| `cudaPointerAttributes.localityDomainOrdinal` | field | Locality domain ordinal of an allocation from `cudaPointerGetAttributes`; `-1` if not localized. |

## Notes

- A locality domain ID (zero-based) is meaningful only together with its device ID. The same ID is used for SM and memory localization.
- Query the attributes rather than assuming a topology; the number of locality domains depends on the system configuration. Devices with a single locality domain can still use the APIs, which then equal targeting the full device.
- In `cudaDevSmResourceGroupParams`, all fields must be zero-initialized. `smCount` may be `0` (discovery mode, returns the SM count of the domain in `params.smCount`) or positive (up to `cudaDevAttrLocalityDomainMultiprocessorCount`; larger requests fail). With `coscheduledSmCount == 0` the SMs are not restricted by coscheduled capability; cluster capability can be queried later with `cudaOccupancyMaxPotentialClusterSize`.
- Unused SMs are returned in the `remainder` parameter. `result.sm.flags` and `result.sm.localityDomainId` report the placement; SM resources combined in one descriptor must have matching constraints (`flags` and `localityDomainId`).
- Destroy streams with `cudaStreamDestroy`, then their contexts with `cudaExecutionCtxDestroy`.
- Allocate from a localized pool with `cudaMallocFromPoolAsync` and free with `cudaFreeAsync`. The location can also be passed to `cudaMemGetDefaultMemPool`, `cudaMemGetMemPool`, and `cudaMemSetMemPool`.
- Allocations from other mechanisms (`cudaMalloc`, unified memory) cannot be localized. MPS in MLOPart mode can transparently localize applications that rely on `cudaMalloc`.
- Managed memory cannot be localized: `cudaMemAllocationTypeManaged` with `cudaMemLocationTypeDeviceLocalityDomain` returns `CUDA_ERROR_NOT_SUPPORTED`; `cudaMemPrefetchAsync` and `cudaMemAdvise` also do not accept a locality domain location (`CUDA_ERROR_NOT_SUPPORTED`).
- `cuMemSetAccess` operates at full device granularity, not per locality domain.
- Guidance: launch kernels on compute resources from the same locality domain as their memory. Localizing only compute or only memory typically does not improve performance; if a kernel uses memory from several domains, measure whether compute localization helps.
- Fork/join pattern: record a fork event on the parent stream, make each localized stream wait on it, launch per-domain work, record a join event per localized stream, and make the parent wait on all join events. Create events with `cudaEventCreateWithFlags` (disable timing when used only for ordering).
- CUDA Graphs: a fork/join can be captured (`cudaStreamBeginCapture` ... `cudaStreamEndCapture`; every participating stream must be joined back before the end of capture). Captured kernel nodes retain their locality restriction, and replay uses the original localized SMs even when the graph is launched on a different stream. For manual construction, set `cudaKernelNodeParamsV2.ctx` to the localized execution context per kernel node.
- Compatibility: vGPU and MIG devices report only 1 locality domain; CUDA on Windows does not support localization (1 domain); CUDA Checkpoint does not guarantee localization is retained when restored on a different device; MPS MLOPart mode presents each MLOPart device with a single locality domain, and MPS static partitioning treats the full device as a single locality domain.
- Document version: CUDA Programming Guide v13.4.2 ([Locality Domains](https://docs.nvidia.com/cuda/cuda-programming-guide/04-special-topics/locality-domains.html); archived copy [13.4.2](https://docs.nvidia.com/cuda/archive/13.4.2/cuda-programming-guide/04-special-topics/locality-domains.html)).

## Related

- [Green Contexts](./green-contexts.md)
- [Stream-Ordered Memory Allocation](./stream-ordered-memory-allocation.md)
- [Virtual Memory Management](./virtual-memory-management.md)
- [Unified Memory](./unified-memory.md)
- [CUDA Graphs](./cuda-graphs.md)
