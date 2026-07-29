# Extended GPU Memory

Extended GPU Memory (EGM) lets a GPU efficiently access all memory within an NVLink-C2C-connected system — including host-NUMA memory attached to other nodes — as if it were local, via VMM allocations or CUDA memory pools tagged with a host-NUMA location.

## Signature / Usage

```c
CUmemAllocationProp prop{};
prop.type = CU_MEM_ALLOCATION_TYPE_PINNED;
prop.location.type = CU_MEM_LOCATION_TYPE_HOST_NUMA;
prop.location.id = numaId;
size_t granularity = 0;
cuMemGetAllocationGranularity(&granularity, &prop, MEM_ALLOC_GRANULARITY_MINIMUM);
```

## Options / Props

| Name | Description |
| --- | --- |
| `cuDeviceGetAttribute` with `CU_DEVICE_ATTRIBUTE_HOST_NUMA_ID` | Retrieves the host NUMA node ID associated with a GPU in an EGM topology. |
| `CU_MEM_LOCATION_TYPE_HOST_NUMA` / `cudaMemLocationTypeHostNuma` | Location type for VMM (`CUmemAllocationProp`) and memory pool (`cudaMemPoolProps`) allocations targeting host NUMA memory. |
| `cuMemCreate` + `cuMemAddressReserve` + `cuMemMap` + `cuMemSetAccess` | Standard VMM flow, used here with a `CU_MEM_LOCATION_TYPE_HOST_NUMA` location to allocate EGM-accessible memory. |
| `cuMemExportToShareableHandle` / `cuMemImportFromShareableHandle` with `CU_MEM_HANDLE_TYPE_FABRIC` | Shares EGM allocations across nodes in a multi-node EGM topology. |
| `cudaMemPoolCreate` / `cudaMemPoolSetAccess` / `cudaDeviceSetMemPool` / `cudaMallocAsync` | Higher-level stream-ordered-allocator path to EGM memory, as an alternative to raw VMM calls. |

## Notes

- EGM topology is single-node-single-GPU, single-node-multi-GPU, or multi-node-multi-GPU; the API surface used differs (VMM APIs vs. CUDA memory pools) depending on which topology and CUDA version is targeted — check the official page's per-topology guidance before choosing an approach.
- EGM support and behavior are tied to specific NVLink-C2C-based hardware platforms; consult the dgx-spark skill's hardware category for platform-level topology and NVLink-C2C details rather than duplicating hardware specifics here.
- Allocation granularity for EGM memory should be queried via `cuMemGetAllocationGranularity` with the `CU_MEM_LOCATION_TYPE_HOST_NUMA` location filled in, since NUMA-backed granularity can differ from device-local granularity.

## Related

- [Virtual Memory Management](./virtual-memory-management.md)
- [Unified Memory](./unified-memory.md)
- [Programming Systems with Multiple GPUs](../core/multi-gpu-systems.md)
