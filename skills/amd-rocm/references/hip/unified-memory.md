# Unified Memory

Managed memory allows a single pointer to be shared and accessed from both host and device, with the runtime handling migration.

## Signature / Usage

```cpp
float* ptr;
hipMallocManaged(&ptr, size);
hipMemPrefetchAsync(ptr, size, deviceId, stream);
hipMemAdvise(ptr, size, hipMemAdviseSetReadMostly, deviceId);
```

## Options / Props

| Function | Description |
| --- | --- |
| `hipMallocManaged(void** ptr, size_t size, unsigned int flags)` | Allocates memory accessible to both CPU and GPU through one pointer; falls back to host-allocation behavior on hardware without Heterogeneous Memory Management (HMM) |
| `hipMemPrefetchAsync(const void* ptr, size_t size, int dstDevice, hipStream_t stream)` | Asynchronously migrates a managed memory range to the specified device |
| `hipMemPrefetchAsync_v2(...)` | Variant using a location struct instead of a raw device ID |
| `hipMemPrefetchBatchAsync(...)` | Prefetches multiple memory ranges in a single call |
| `hipMemDiscardBatchAsync(...)` | Asynchronously discards managed memory ranges, signaling the data can be reclaimed; reading a discarded range without a prior write/prefetch returns an indeterminate value |
| `hipMemAdvise(const void* ptr, size_t size, hipMemoryAdvise advice, int device)` | Hints usage patterns (e.g. read-mostly, preferred location) to the runtime |
| `hipMemAdvise_v2(...)` | Variant using a location struct |
| `hipMemRangeGetAttribute(...)` | Queries a current attribute of a managed memory range |

## Notes

- This is the AMD HIP API (`hip*` prefix), not the CUDA runtime API (`cuda*` prefix). HIP and CUDA are source-portable but not source-identical; see `porting-cuda-to-hip.md` and `hipify.md`. CUDA equivalents are covered by the separate `nvidia-cuda` skill.
- Most of this API is production-ready on Linux and still under development on Windows; some features require XNACK support enabled on the device.

## Related

- [device-memory.md](./device-memory.md)
- [virtual-memory.md](./virtual-memory.md)
