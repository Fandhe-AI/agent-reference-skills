# Stream-Ordered Memory Allocator

Asynchronous memory allocation/free operations that are ordered relative to other work in a stream, backed by explicit memory pools.

## Signature / Usage

```cpp
void* ptr;
hipMallocAsync(&ptr, size, stream);
kernel<<<grid, block, 0, stream>>>(ptr);
hipFreeAsync(ptr, stream);
```

## Options / Props

| Function | Description |
| --- | --- |
| `hipMallocAsync(void** ptr, size_t size, hipStream_t stream)` | Inserts an allocation into the stream; the returned pointer must not be accessed until the operation completes in-order |
| `hipMallocFromPoolAsync(void** ptr, size_t size, hipMemPool_t pool, hipStream_t stream)` | Allocates from an explicit memory pool, ordered on the given stream |
| `hipFreeAsync(void* ptr, hipStream_t stream)` | Inserts a free into the stream; accessing the memory from work launched after this call is undefined behavior |
| `hipMemPoolCreate(hipMemPool_t* pool, const hipMemPoolProps* poolProps)` | Creates a custom memory pool, controlling backing device and IPC capability; accessible by default only from the device it is allocated on |
| `hipMemPoolDestroy(hipMemPool_t pool)` | Destroys a memory pool |
| `hipMemPoolSetAttribute(...)` / `hipMemPoolGetAttribute(...)` | Sets/queries pool attributes such as release threshold and reuse policy |
| `hipMemPoolExportToShareableHandle(...)` / `hipMemPoolImportFromShareableHandle(...)` | Shares a memory pool across processes (IPC) |
| `hipMemPoolExportPointer(...)` / `hipMemPoolImportPointer(...)` | Shares a single pool allocation across processes |

## Notes

- This is the AMD HIP API (`hip*` prefix), not the CUDA runtime API (`cuda*` prefix). HIP and CUDA are source-portable but not source-identical; see `porting-cuda-to-hip.md` and `hipify.md`. CUDA equivalents are covered by the separate `nvidia-cuda` skill.
- This API is implemented on Linux and under development on Windows; all functions carry Beta status.

## Related

- [device-memory.md](./device-memory.md)
- [device-management.md](./device-management.md)
- [asynchronous-execution.md](./asynchronous-execution.md)
