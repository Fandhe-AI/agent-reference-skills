# Interop (Graphics and External Resources)

Functions to register external/graphics API resources (e.g. OpenGL buffers/textures) with HIP, map them for device access, and retrieve device pointers or arrays.

## Signature / Usage

```cpp
hipGraphicsResource_t res;
hipGraphicsGLRegisterBuffer(&res, glBuffer, hipGraphicsRegisterFlagsNone);
hipGraphicsMapResources(1, &res, stream);
void* devPtr; size_t size;
hipGraphicsResourceGetMappedPointer(&devPtr, &size, res);
hipGraphicsUnmapResources(1, &res, stream);
```

## Options / Props

| Function | Description |
| --- | --- |
| `hipGraphicsMapResources(int count, hipGraphicsResource_t* resources, hipStream_t stream)` | Maps registered graphics resources for device access, synchronized on a stream |
| `hipGraphicsSubResourceGetMappedArray(...)` | Retrieves an array interface to a mapped resource subregion (`arrayIndex > 0` is currently unsupported) |
| `hipGraphicsResourceGetMappedPointer(void** devPtr, size_t* size, hipGraphicsResource_t resource)` | Retrieves the device pointer and size of a mapped resource |
| `hipGraphicsUnmapResources(int count, hipGraphicsResource_t* resources, hipStream_t stream)` | Releases resources after device access completes |
| `hipGraphicsUnregisterResource(hipGraphicsResource_t resource)` | Fully deregisters a graphics resource from the HIP runtime |
| External resource interop | Import external memory/semaphore handles (e.g. from Vulkan/DirectX) for cross-API sharing, analogous to the graphics resource lifecycle above |

## Notes

- This is the AMD HIP API (`hip*` prefix), not the CUDA runtime API (`cuda*` prefix). HIP and CUDA are source-portable but not source-identical; see `porting-cuda-to-hip.md` and `hipify.md`. CUDA equivalents are covered by the separate `nvidia-cuda` skill.
- Resources must be mapped before device access and unmapped before the owning graphics API uses them again.

## Related

- [texture-surface.md](./texture-surface.md)
- [multi-device-peer-to-peer.md](./multi-device-peer-to-peer.md)
