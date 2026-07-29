# Interprocess Communication

Shares GPU buffers between processes on the same host (Linux only for the legacy API) via exported/imported memory handles, either through the legacy CUDA IPC API (`cudaIpcGetMemHandle` / `cudaIpcOpenMemHandle`) or the Virtual Memory Management API.

## Signature / Usage

```c
// Producer process
cudaIpcMemHandle_t handle;
cudaIpcGetMemHandle(&handle, devPtr);
// ... send handle to consumer process via any IPC channel (e.g. a pipe or socket) ...

// Consumer process
void* devPtr;
cudaIpcOpenMemHandle(&devPtr, handle, cudaIpcMemLazyEnablePeerAccess);
```

## Options / Props

| Name | Description |
| --- | --- |
| `cudaIpcGetMemHandle` | Legacy IPC API: exports a `cudaIpcMemHandle_t` for a device pointer, to be transferred to another process out-of-band. |
| `cudaIpcOpenMemHandle` | Legacy IPC API: imports a handle received from another process, returning a device pointer valid in the importing process. |
| Virtual Memory Management API (`cuMemExportToShareableHandle` / `cuMemImportFromShareableHandle`) | Alternative IPC path built on VMM primitives, supported on more platforms than the legacy API. |

## Notes

- The legacy CUDA IPC API (`cudaIpcGetMemHandle`/`cudaIpcOpenMemHandle`) is Linux-only; the Virtual Memory Management API supports multiple operating systems.
- The legacy IPC API is not supported for `cudaMallocManaged` allocations.
- Allocations made by `cudaMalloc()` may be sub-allocated from a larger block for performance reasons; using 2 MiB-aligned allocation sizes is recommended to avoid unintentionally sharing memory beyond what was allocated.
- On embedded Tegra (L4T, compute capability 7.x+), only event-handle IPC sharing is supported, not memory-handle sharing.
- The official page provides no verbatim code example; the snippet above reflects the standard `cudaIpcGetMemHandle`/`cudaIpcOpenMemHandle` handshake pattern described in its text.

## Related

- [Virtual Memory Management](./virtual-memory-management.md)
- [Stream-Ordered Memory Allocator](./stream-ordered-memory-allocation.md)
- [Programming Systems with Multiple GPUs](../core/multi-gpu-systems.md)
