# Memory Management Overview

HIP exposes several memory models: explicit host/device allocations copied via `hipMemcpy`, host-pinned memory for faster transfer, unified (managed) memory shared between host and device, low-level virtual memory control, and a stream-ordered allocator backed by memory pools.

## Signature / Usage

```cpp
// explicit device memory (see device-memory.md)
float* d; hipMalloc(&d, size); hipMemcpy(d, h, size, hipMemcpyHostToDevice);

// unified memory (see unified-memory.md)
float* u; hipMallocManaged(&u, size);
```

## Options / Props

| Model | Covered by | Summary |
| --- | --- | --- |
| Host memory | `host-memory.md` | Pinned/page-locked allocations (`hipHostMalloc`, `hipHostRegister`) for faster host↔device transfer |
| Device memory | `device-memory.md` | Linear/pitched/3D allocation (`hipMalloc`, `hipMallocPitch`, `hipMalloc3D`) and explicit `hipMemcpy` |
| Unified memory | `unified-memory.md` | `hipMallocManaged` single-pointer allocation, migration hints (`hipMemAdvise`, `hipMemPrefetchAsync`) |
| Virtual memory | `virtual-memory.md` | Low-level address reservation and mapping (`hipMemAddressReserve`, `hipMemCreate`, `hipMemMap`) |
| Stream-ordered allocator | `stream-ordered-allocator.md` | `hipMallocAsync`/`hipFreeAsync` against explicit memory pools |
| Texture/surface | `texture-surface.md` | Cached read-only (texture) and read-write (surface) array access, including mipmaps |
| Graphics/external interop | `interop.md` | Registering and mapping OpenGL/external resources for device access |

## Notes

- This is the AMD HIP API (`hip*` prefix), not the CUDA runtime API (`cuda*` prefix). HIP and CUDA are source-portable but not source-identical; see `porting-cuda-to-hip.md` and `hipify.md`. CUDA equivalents are covered by the separate `nvidia-cuda` skill.
- Choose the narrowest model that fits the workload: explicit device memory gives the most predictable performance; unified memory trades some control for simpler code; the stream-ordered allocator is preferred over raw `hipMalloc`/`hipFree` in allocation-heavy async pipelines.

## Related

- [host-memory.md](./host-memory.md)
- [device-memory.md](./device-memory.md)
- [unified-memory.md](./unified-memory.md)
- [stream-ordered-allocator.md](./stream-ordered-allocator.md)
