# The CUDA Driver API

Low-level, handle-based C API (`cuXxx`, prefixed `CU`) offering finer control than the CUDA Runtime API over contexts, module loading, and kernel launch — at the cost of more verbose application code.

## Signature / Usage

```c
cuInit(0);
CUdevice dev;
cuDeviceGet(&dev, 0);
CUcontext ctx;
cuCtxCreate(&ctx, 0, dev);

CUmodule cuModule;
cuModuleLoad(&cuModule, "myModule.ptx");
CUfunction myKernel;
cuModuleGetFunction(&myKernel, cuModule, "MyKernel");
```

## Options / Props

| Object | Handle | Description |
| --- | --- | --- |
| Device | `CUdevice` | CUDA-enabled device. |
| Context | `CUcontext` | Roughly equivalent to a CPU process. |
| Module | `CUmodule` | Roughly equivalent to a dynamic library. |
| Function | `CUfunction` | Kernel. |
| Heap memory | `CUdeviceptr` | Pointer to device memory. |
| CUDA array | `CUarray` | Opaque container for 1D/2D data, readable via texture or surface references. |
| Texture object | `CUtexref` | Describes how to interpret texture memory data. |
| Surface reference | `CUsurfref` | Describes how to read or write CUDA arrays. |
| Stream | `CUstream` | Describes a CUDA stream. |
| Event | `CUevent` | Describes a CUDA event. |

| Name | Description |
| --- | --- |
| `cuInit` | Initializes the driver API; must be called before any other driver API function. |
| `cuDeviceGetCount` / `cuDeviceGet` | Enumerate and retrieve device handles. |
| `cuCtxCreate` / `cuCtxDestroy` | Create/destroy a context, the driver-API analogue of a CPU process. |
| `cuCtxPushCurrent` / `cuCtxPopCurrent` / `cuCtxAttach` / `cuCtxDetach` | Manage the context stack for a host thread. |
| `cuDevicePrimaryCtxRetain` | Retrieves the runtime API's implicit primary context for a device. |
| `cuModuleLoad` / `cuModuleLoadData` / `cuModuleLoadDataEx` | Load a module (PTX or cubin) from a file or in-memory image. |
| `cuModuleGetFunction` | Retrieves a `CUfunction` handle for a named kernel in a loaded module. |
| `cuLinkCreate` / `cuLinkAddData` / `cuLinkComplete` / `cuLinkDestroy` | Runtime linking of multiple PTX/cubin objects prior to module load. |
| `cuLaunchKernel` | Launches a kernel given grid/block dimensions, shared memory size, stream, and a parameter buffer (`CU_LAUNCH_PARAM_BUFFER_POINTER` / `_BUFFER_SIZE` / `_END`). |
| `cuCtxGetCurrent` | Retrieves the context current to the calling thread; used to interoperate with the Runtime API (which manages the same context implicitly via `cudaMalloc`, etc.). |

## Notes

- The Driver API and Runtime API share the same underlying context/module concepts; `cuCtxGetCurrent` lets driver-API code and `cudaMalloc`-style runtime-API code interoperate within the same process.
- Kernels launched via `cuLaunchKernel` must first be loaded as PTX/cubin through `cuModuleLoad`, unlike the Runtime API's `<<<>>>` syntax which compiles against a statically linked kernel.

## Related

- [Advanced CUDA APIs and Features](./advanced-host-programming.md)
