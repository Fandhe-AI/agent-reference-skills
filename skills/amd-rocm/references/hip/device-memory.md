# Device Memory

Core functions to allocate linear/pitched/3D device memory and copy data between host and device.

## Signature / Usage

```cpp
float* d_ptr;
hipMalloc(&d_ptr, size);
hipMemcpy(d_ptr, h_ptr, size, hipMemcpyHostToDevice);
hipMemset(d_ptr, 0, size);
hipFree(d_ptr);
```

## Options / Props

| Function | Description |
| --- | --- |
| `hipMalloc(void** ptr, size_t size)` | Allocates linear global (device) memory |
| `hipFree(void* ptr)` | Deallocates device memory allocated via `hipMalloc`; cannot free memory allocated from within a kernel |
| `hipMemcpy(void* dst, const void* src, size_t sizeBytes, hipMemcpyKind kind)` | Blocking copy between host/device using a direction kind (`hipMemcpyHostToDevice`, `hipMemcpyDeviceToHost`, `hipMemcpyDeviceToDevice`, `hipMemcpyDefault`) |
| `hipMemcpyToSymbol(...)` / `hipMemcpyFromSymbol(...)` | Copies data to/from a `__constant__`/`__device__` global symbol |
| `hipMemset(void* dst, int value, size_t sizeBytes)` | Fills device memory with a byte value |
| `hipMallocPitch(void** ptr, size_t* pitch, size_t width, size_t height)` | Allocates 2D memory with row padding for coalesced access, returning the row pitch |
| `hipMalloc3D(hipPitchedPtr* pitchedDevPtr, hipExtent extent)` | Allocates 3D memory with pitch, described by a `hipExtent` |
| `hipMallocArray(...)` | Allocates 1D/2D/3D CUDA-array-style memory used for texture operations |
| `hipCreateTextureObject(...)` | Creates a texture object for cached, read-only memory access with addressing/filtering modes |
| `hipCreateSurfaceObject(...)` | Creates a surface object, a read-write counterpart to texture objects |

## Notes

- This is the AMD HIP API (`hip*` prefix), not the CUDA runtime API (`cuda*` prefix). HIP and CUDA are source-portable but not source-identical; see `porting-cuda-to-hip.md` and `hipify.md`. CUDA equivalents are covered by the separate `nvidia-cuda` skill.
- Unlike unified memory, device memory must be explicitly copied to/from the host; see `unified-memory.md` for the managed-memory alternative.

## Related

- [host-memory.md](./host-memory.md)
- [memory-management.md](./memory-management.md)
- [texture-surface.md](./texture-surface.md)
