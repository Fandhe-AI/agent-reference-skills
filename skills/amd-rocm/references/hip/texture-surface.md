# Texture and Surface Objects

Texture objects provide cached, read-only memory access with hardware filtering/addressing; surface objects are the read-write counterpart. Both operate over HIP arrays, including mipmapped arrays.

## Signature / Usage

```cpp
hipTextureObject_t tex;
hipResourceDesc resDesc = {};
hipTextureDesc texDesc = {};
hipCreateTextureObject(&tex, &resDesc, &texDesc, nullptr);
```

## Options / Props

| Function | Description |
| --- | --- |
| `hipCreateTextureObject(...)` / `hipTexObjectCreate(...)` | Creates a texture object from resource/texture/resource-view descriptors; 3D linear filtering is unsupported on GFX90A (returns `hipErrorNotSupported`) |
| `hipDestroyTextureObject(...)` / `hipTexObjectDestroy(...)` | Destroys a texture object |
| `hipGetTextureObjectResourceDesc(...)` / `hipTexObjectGetResourceDesc(...)` | Retrieves the resource descriptor of a texture object |
| `hipGetTextureObjectTextureDesc(...)` / `hipTexObjectGetTextureDesc(...)` | Retrieves the texture descriptor |
| `hipGetTextureObjectResourceViewDesc(...)` / `hipTexObjectGetResourceViewDesc(...)` | Retrieves the resource view descriptor |
| `hipGetChannelDesc(...)` | Retrieves the channel descriptor of an array in device memory |
| `hipMallocMipmappedArray(...)` / `hipMipmappedArrayCreate(...)` | Allocates a mipmapped array |
| `hipFreeMipmappedArray(...)` / `hipMipmappedArrayDestroy(...)` | Frees a mipmapped array |
| `hipGetMipmappedArrayLevel(...)` / `hipMipmappedArrayGetLevel(...)` | Accesses a specific mipmap level as an array |
| `hipCreateSurfaceObject(...)` | Creates a surface object for read-write array access |

## Notes

- This is the AMD HIP API (`hip*` prefix), not the CUDA runtime API (`cuda*` prefix). HIP and CUDA are source-portable but not source-identical; see `porting-cuda-to-hip.md` and `hipify.md`. CUDA equivalents are covered by the separate `nvidia-cuda` skill.
- Mipmapped array support is implemented on Linux; Windows support is under development.

## Related

- [device-memory.md](./device-memory.md)
- [interop.md](./interop.md)
