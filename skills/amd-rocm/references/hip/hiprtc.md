# HIPRTC (Runtime Compilation)

HIPRTC compiles HIP kernel source strings at runtime, enabling portability across GPU targets unknown at build time (at the cost of some launch overhead).

## Signature / Usage

```c
hiprtcProgram prog;
hiprtcCreateProgram(&prog, kernelSource, "kernel.cu", 0, nullptr, nullptr);
const char* opts[] = {"--gpu-architecture=gfx942"};
hiprtcCompileProgram(prog, 1, opts);
size_t codeSize;
hiprtcGetCodeSize(prog, &codeSize);
```

## Options / Props

| Function | Description |
| --- | --- |
| `hiprtcCreateProgram(hiprtcProgram* prog, const char* src, const char* name, int numHeaders, const char** headers, const char** headerNames)` | Creates a program from kernel source text, with optional header inclusion |
| `hiprtcCompileProgram(hiprtcProgram prog, int numOptions, const char** options)` | Compiles the program; returns `HIPRTC_SUCCESS` on success |
| `hiprtcGetCode(hiprtcProgram prog, char* code)` / `hiprtcGetCodeSize(...)` | Retrieves compiled binary (ISA) and its size |
| `hiprtcGetBitcode(hiprtcProgram prog, char* bitcode)` / `hiprtcGetBitcodeSize(...)` | Retrieves LLVM bitcode when compiled with `-fgpu-rdc` |
| `hiprtcAddNameExpression(hiprtcProgram prog, const char* nameExpr)` | Registers a function/variable name for mangling resolution before compilation |
| `hiprtcGetLoweredName(hiprtcProgram prog, const char* nameExpr, const char** loweredName)` | Retrieves the mangled name after compilation, used to look up `__global__` functions or `__device__`/`__constant__` variables |
| `hiprtcLinkCreate(unsigned int numOptions, hiprtcJIT_option* options, void** optionValues, hiprtcLinkState* linkState)` | Initializes a runtime linker instance |
| `hiprtcLinkAddData(hiprtcLinkState linkState, hiprtcJITInputType inputType, void* data, size_t dataSize, const char* name, ...)` | Adds compiled bitcode/data to the linker |
| `hiprtcLinkComplete(hiprtcLinkState linkState, void** binary, size_t* binarySize)` | Finalizes linking, producing a loadable binary |
| `hiprtcGetErrorString(hiprtcResult result)` | Converts an `hiprtcResult` code to a human-readable message |
| `--gpu-architecture=<arch>` | Compile option targeting a GPU (e.g. `gfx906:sramecc+:xnack-`) |
| `-fgpu-rdc` | Compile option producing bitcode instead of final ISA |
| `-mcumode` | Compile option enabling CU mode on RDNA GPUs (WGP mode is the default) |

## Notes

- Error codes include `HIPRTC_SUCCESS`, `HIPRTC_ERROR_COMPILATION`, among others; always check return codes from HIPRTC calls.

## Related

- [compilers-clr.md](./compilers-clr.md)
- [module-context-management.md](./module-context-management.md)
