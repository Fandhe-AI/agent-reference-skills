# CUDA Interoperability with APIs

Shares buffers and synchronization primitives between CUDA and graphics/compute APIs — legacy graphics interop with OpenGL/Direct3D via `cudaGraphicsResource`, and a generic external-resource interop path (`cudaImportExternalMemory` / `cudaImportExternalSemaphore`) for Vulkan, Direct3D 12, and NVIDIA Software Communication Interface (NVSCI).

## Signature / Usage

```c
void createVBO(GLuint *vbo, struct cudaGraphicsResource **vbo_res,
               unsigned int vbo_res_flags) {
    glGenBuffers(1, vbo);
    glBindBuffer(GL_ARRAY_BUFFER, *vbo);
    unsigned int size = mesh_width * mesh_height * 4 * sizeof(float);
    glBufferData(GL_ARRAY_BUFFER, size, 0, GL_DYNAMIC_DRAW);
    glBindBuffer(GL_ARRAY_BUFFER, 0);
    cudaGraphicsGLRegisterBuffer(vbo_res, *vbo, vbo_res_flags);
}
```

## Options / Props

| Name | Description |
| --- | --- |
| `cudaGraphicsResource` | Opaque handle representing a graphics API resource registered with CUDA. |
| `cudaGraphicsGLRegisterBuffer` / `cudaGraphicsGLRegisterImage` | Register an OpenGL buffer/image for CUDA access. |
| `cudaGraphicsD3D11RegisterResource` | Register a Direct3D 11 resource for CUDA access. |
| `cudaGraphicsMapResources` / `cudaGraphicsUnmapResources` | Map/unmap registered resources for CUDA access during a span of CUDA operations; the graphics API must not touch the resource while mapped. |
| `cudaGraphicsResourceGetMappedPointer` / `cudaGraphicsSubResourceGetMappedArray` | Retrieve a CUDA device pointer or `cudaArray` for a mapped resource. |
| `cudaGraphicsResourceSetMapFlags` / `cudaGraphicsUnregisterResource` | Configure map behavior (read-only, write-discard) and unregister a resource. |
| `cudaImportExternalMemory` / `cudaExternalMemory_t` / `cudaExternalMemoryHandleDesc` | Generic import of an external API's (Vulkan, D3D12, NVSCI) memory object as a CUDA-usable handle. |
| `cudaExternalMemoryGetMappedBuffer` / `cudaExternalMemoryGetMappedMipmappedArray` | Map an imported external memory object as a linear buffer or mipmapped array. |
| `cudaImportExternalSemaphore` / `cudaExternalSemaphore_t` / `cudaExternalSemaphoreHandleDesc` | Import an external API's synchronization primitive as a CUDA-usable semaphore. |
| `cudaSignalExternalSemaphoresAsync` / `cudaWaitExternalSemaphoresAsync` | Signal/wait on imported external semaphores from a CUDA stream, for cross-API synchronization. |
| `cudaDeviceGetNvSciSyncAttributes` | Retrieves CUDA's NvSciSync attribute requirements, needed to create a compatible `NvSciSyncObj` for NVSCI interop. |
| `cudaD3D11GetDevices` / `cudaD3D12GetDevices` | Determine which CUDA device(s) correspond to a given Direct3D device, required before interop. |

## Notes

- Legacy graphics interop (`cudaGraphicsResource`-based, OpenGL/Direct3D 11) is the simpler path for buffers/textures shared with a rendering API; the external-memory/semaphore API is the generic path needed for Vulkan, Direct3D 12, and NVSCI, and for cross-API synchronization primitives.
- A resource must be mapped (`cudaGraphicsMapResources`) before CUDA accesses it and unmapped before the originating graphics API accesses it again — concurrent access from both sides is not supported.
- Vulkan and Direct3D 12 interop requires matching the CUDA device to the correct graphics device via UUID (Vulkan) or LUID (Direct3D), since a system may have multiple GPUs.

## Related

- [Interprocess Communication](./inter-process-communication.md)
- [A Tour of CUDA Features](../core/feature-survey.md)
