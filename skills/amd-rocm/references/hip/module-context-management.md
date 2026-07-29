# Module and Context Management

Functions to load compiled code objects (modules/libraries) at runtime, extract kernels/globals from them, and link binaries dynamically.

## Signature / Usage

```cpp
hipModule_t module;
hipModuleLoad(&module, "kernel.hsaco");
hipFunction_t fn;
hipModuleGetFunction(&fn, module, "myKernel");
```

## Options / Props

| Function | Description |
| --- | --- |
| `hipModuleLoad(hipModule_t* module, const char* fname)` | Loads a code object from file into a module in the current context |
| `hipModuleLoadData(hipModule_t* module, const void* image)` | Builds a module from in-memory code object data or a fatbin |
| `hipModuleLoadFatBinary(...)` | Loads a fatbin object specifically |
| `hipModuleUnload(hipModule_t module)` | Frees a module and destroys its associated code object |
| `hipModuleGetFunction(hipFunction_t* function, hipModule_t module, const char* kname)` | Extracts a named function from a module |
| `hipModuleGetGlobal(void** dptr, size_t* bytes, hipModule_t module, const char* name)` | Returns the device pointer and size of a global variable |
| `hipModuleGetFunctionCount(...)` | Reports the number of functions contained in a module |
| `hipModuleGetTexRef(...)` | Returns a texture reference handle from a module |
| `hipLibraryLoadFromFile` / `hipLibraryLoadData` | Loads a library object with JIT options (newer API superseding raw modules) |
| `hipLibraryUnload(hipLibrary_t library)` | Unloads a library |
| `hipLibraryGetKernel(...)` | Retrieves a kernel object by name from a library |
| `hipLibraryGetGlobal(...)` / `hipLibraryGetManaged(...)` | Accesses device globals / host-accessible managed variables in a library |
| `hipLibraryEnumerateKernels(...)` | Lists all kernels contained in a library |
| `hipKernelGetAttribute(...)` | Returns kernel attributes (thread limits, memory usage, register counts) |
| `hipKernelGetName(...)` | Retrieves a kernel's name |
| `hipKernelGetParamInfo(...)` | Returns parameter offsets and sizes for a kernel |
| `hipLinkCreate` / `hipLinkAddFile` / `hipLinkAddData` / `hipLinkComplete` / `hipLinkDestroy` | Runtime linker workflow for combining bitcode/binaries into a loadable module |

## Notes

- The Library API (`hipLibrary*`) is the newer alternative to the raw Module API (`hipModule*`) and is preferred for new code.

## Related

- [hiprtc.md](./hiprtc.md)
- [execution-control-launch.md](./execution-control-launch.md)
