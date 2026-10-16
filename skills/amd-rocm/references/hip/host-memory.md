# Host Memory

Functions to allocate pinned (page-locked) host memory and register existing host allocations for faster host↔device transfer.

## Signature / Usage

```cpp
void* hostPtr;
hipHostMalloc(&hostPtr, size, hipHostMallocMapped);
void* devPtr;
hipHostGetDevicePointer(&devPtr, hostPtr, 0);
hipFreeHost(hostPtr);
```

## Options / Props

| Function / Flag | Description |
| --- | --- |
| `hipHostMalloc(void** ptr, size_t size, unsigned int flags)` | Allocates pinned (page-locked) host memory; improves host↔device transfer bandwidth versus pageable memory |
| `hipFreeHost(void* ptr)` | Deallocates memory allocated with `hipHostMalloc` |
| `hipHostRegister(void* hostPtr, size_t size, unsigned int flags)` | Page-locks an existing host allocation in place |
| `hipHostUnregister(void* hostPtr)` | Unregisters host memory previously pinned with `hipHostRegister` |
| `hipHostGetDevicePointer(void** devPtr, void* hostPtr, unsigned int flags)` | Retrieves the device-accessible pointer for host memory allocated with `hipHostMallocMapped` |
| `hipHostMallocPortable` | Flag: memory is accessible/pinned across all contexts |
| `hipHostMallocMapped` | Flag: enables device kernel access to the host allocation |
| `hipHostMallocNumaUser` | Flag: follows the user-specified NUMA policy instead of the runtime default |
| `hipHostMallocWriteCombined` | Flag: optimizes the allocation for host-to-device transfer |
| `hipHostMallocCoherent` / `hipHostMallocNonCoherent` | Flags controlling host/device memory coherence behavior |

## Notes

- This is the AMD HIP API (`hip*` prefix), not the CUDA runtime API (`cuda*` prefix). HIP and CUDA are source-portable but not source-identical; see `porting-cuda-to-hip.md` and `hipify.md`. CUDA equivalents are covered by the separate `nvidia-cuda` skill.
- Pinned memory is a limited system resource; over-allocating it can degrade overall system performance.
- HIP 7.16.0 (ROCm Core SDK 10.1.0): the `hipExtHostRegisterCoarseGrained` flag (0x8, "Coarse Grained host memory lock") passed to `hipHostRegister` is now honored on Windows for APUs with unified memory. Fine-grain (uncached) is the default on Windows, and coarse-grain applies only when the flag is set explicitly; previously Windows always treated registered memory as coarse-grain. This gives device kernels correct results for atomic operations on host-pinned memory

## Related

- [device-memory.md](./device-memory.md)
- [asynchronous-execution.md](./asynchronous-execution.md)
- [unified-memory.md](./unified-memory.md)
