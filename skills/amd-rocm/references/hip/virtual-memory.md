# Virtual Memory Management

Low-level API to reserve virtual address ranges, create physical memory handles independently, and map/unmap/share them explicitly.

## Signature / Usage

```cpp
hipDeviceptr_t ptr;
hipMemAddressReserve(&ptr, size, 0, 0, 0);
hipMemGenericAllocationHandle_t handle;
hipMemCreate(&handle, size, &props, 0);
hipMemMap(ptr, size, 0, handle, 0);
```

## Options / Props

| Function | Description |
| --- | --- |
| `hipMemAddressReserve(...)` | Reserves a virtual address range with specified alignment and optional starting address |
| `hipMemAddressFree(...)` | Frees an address range reservation made via `hipMemAddressReserve` |
| `hipMemCreate(...)` | Creates a memory handle for an allocation described by given properties and size |
| `hipMemRelease(...)` | Releases a previously created memory handle |
| `hipMemMap(...)` | Maps an allocation handle onto a reserved virtual address range |
| `hipMemUnmap(...)` | Unmaps memory over a given address range |
| `hipMemSetAccess(...)` | Sets access flags for each location in a descriptor over a given virtual address range |
| `hipMemGetAccess(...)` | Gets the access flags set for a given location and pointer |
| `hipMemExportToShareableHandle(...)` | Exports an allocation to a requested shareable handle type (for IPC) |
| `hipMemImportFromShareableHandle(...)` | Imports an allocation from a shareable handle type |
| `hipMemGetAllocationPropertiesFromHandle(...)` | Retrieves the property structure of a given allocation handle |
| `hipMemRetainAllocationHandle(...)` | Returns the allocation handle of the backing memory given an address |
| `hipMemGetAllocationGranularity(...)` | Calculates the minimal or recommended allocation granularity |
| `hipMemMapArrayAsync(...)` | Maps or unmaps subregions of sparse HIP arrays/mipmapped arrays |

## Notes

- This is the AMD HIP API (`hip*` prefix), not the CUDA runtime API (`cuda*` prefix). HIP and CUDA are source-portable but not source-identical; see `porting-cuda-to-hip.md` and `hipify.md`. CUDA equivalents are covered by the separate `nvidia-cuda` skill.
- Implemented on Linux; Windows support is ongoing.
- Host-NUMA allocations (HIP 7.16.0, ROCm Core SDK 10.1.0): `hipMemCreate` and the rest of the VMM lifecycle (create, reserve, map, set access, teardown) accept `hipMemLocationTypeHostNuma` (= 3; `id` is the host NUMA node id) and `hipMemLocationTypeHostNumaCurrent` (= 4; the host NUMA node closest to the current thread's CPU, `id` ignored) in `hipMemLocation`. They allocate pinned memory backed by real host memory on the chosen NUMA node instead of a GPU-pool substitute, on Linux systems with NUMA-capable, VMM-capable GPUs; the stated use case includes collective-communication libraries such as RCCL

## Related

- [unified-memory.md](./unified-memory.md)
- [stream-ordered-allocator.md](./stream-ordered-allocator.md)
- [multi-device-peer-to-peer.md](./multi-device-peer-to-peer.md)
