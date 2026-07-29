# Stream-Ordered Memory Allocator

Sequences GPU memory allocation and freeing into a CUDA stream (`cudaMallocAsync` / `cudaFreeAsync`), so allocation and deallocation participate in stream ordering like any other asynchronous operation, and memory can be reused across streams via explicit or default memory pools.

## Signature / Usage

```cuda
void *ptr;
size_t size = 512;
cudaMallocAsync(&ptr, size, cudaStreamPerThread);
kernel<<<..., cudaStreamPerThread>>>(ptr, ...);
cudaFreeAsync(ptr, cudaStreamPerThread);
```

## Options / Props

| Name | Description |
| --- | --- |
| `cudaMallocAsync` / `cudaFreeAsync` | Stream-ordered allocate/free; the operation is enqueued on the given stream like a kernel launch, and memory becomes reusable only once prior work on the stream completes. |
| `cudaMallocFromPoolAsync` | Allocates from an explicit `cudaMemPool_t` rather than a device's default pool. |
| `cudaMemPoolCreate` / `cudaDeviceSetMempool` / `cudaDeviceGetMempool` / `cudaDeviceGetDefaultMempool` | Create and select explicit memory pools, or retrieve a device's default/implicit pool. |
| `cudaMemPoolSetAttribute` / `cudaMemPoolGetAttribute` | Configure pool behavior, e.g. release threshold and reuse policies. |
| `cudaMemPoolSetAccess` / `cudaMemPoolGetAccess` | Grant or query multi-GPU device accessibility for a pool. |
| `cudaMemPoolExportToShareableHandle` / `cudaMemPoolImportFromShareableHandle` / `cudaMemPoolExportPointer` / `cudaMemPoolImportPointer` | Enable a memory pool for IPC across processes. |
| `cudaMemPoolTrimTo` | Releases cached physical pages back to the OS/driver down to a target size. |

## Notes

- Every device has an implicit default pool that `cudaMallocAsync` uses unless `cudaMallocFromPoolAsync` targets an explicit pool.
- Reuse of freed memory follows pool policies (see `cudaMemPoolSetAttribute`) and physical page caching behavior — memory is not necessarily returned to the OS immediately after `cudaFreeAsync`.
- Multi-GPU accessibility of a pool is opt-in via `cudaMemPoolSetAccess`, mirroring peer-access semantics for `cudaMalloc`-based memory.
- For IPC of pool-backed memory, the pool itself must have been created with IPC enabled at `cudaMemPoolCreate` time.

## Related

- [CUDA Graphs](./cuda-graphs.md)
- [Unified Memory](./unified-memory.md)
- [Interprocess Communication](./inter-process-communication.md)
