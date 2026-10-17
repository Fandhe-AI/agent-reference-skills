# Ahead-of-Time (AOT) Compilation

## Signature / Usage

```python
compiled_fn: cute.JitCompiledFunction = cute.compile(my_kernel, ...)
compiled_fn.export_to_c(
    file_path="./out",
    file_name="my_kernel",
    function_prefix="my_kernel",   # defaults to file_name
)
# produces ./out/my_kernel.h and ./out/my_kernel.o

# Python-side loading of a pre-compiled module (no JIT needed)
mod = cute.runtime.load_module("./out/my_kernel.o")
```

```c
// C++ dynamic loading
#include "CuteDSLRuntime.h"
CuteDSLRT_Module_Load(...);
CuteDSLRT_Function_Run(...);

// C++ static linking: wrapper returns int32_t (cudaError_t)
int32_t ret = cute_dsl_print_tensor_wrapper(&module, &tensor_a, stream);
CUTE_DSL_CUDA_ERROR_CHECK(ret);   // macro defined in the generated header
```

## Options / Props

| Item | Description |
| --- | --- |
| Low-Level CuTe ABI | Uses CuTe DSL types/tensors, mirroring the original Python function signature |
| High-Level Apache TVM FFI ABI | Interoperates with PyTorch/JAX-style frameworks |
| `export_to_c(file_path, file_name, function_prefix=file_name)` | Generates `{file_name}.h` (C header) and `{file_name}.o` (compiled object) |
| Python loading | `cute.runtime.load_module()` — no JIT compilation needed |
| C++ static linking | Include the generated header, link the object file directly |
| C++ dynamic loading | `CuteDSLRuntime.h` APIs: `CuteDSLRT_Module_Load`, `CuteDSLRT_Function_Run` |
| Supported argument types | Tensors, shapes, coordinates, CUDA streams, integer/float types |

## Notes

- The wrapper function in the generated header returns an `int32_t` that is a CUDA runtime `cudaError_t` code (see the C++ example in Signature / Usage).
- `0` (`cudaSuccess`): every kernel launch in the exported function was submitted successfully. Any other value is the code returned by `cudaLaunchKernelExC` for the first launch that failed; the function returns there, so later kernels in the same `@cute.jit` function do not run.
- `cudaGetErrorName` / `cudaGetErrorString` translate the value; `CUTE_DSL_CUDA_ERROR_CHECK` is defined in terms of those helpers.
- The value only covers launch submission. Kernel execution is asynchronous, so faults such as `cudaErrorIllegalAddress` appear only via `cudaStreamSynchronize` / `cudaDeviceSynchronize`.
- Dynamic loading reports two independent statuses: `CuteDSLRT_Error_t` describes the runtime API call itself (module load, symbol lookup, invocation; decoded with `CuteDSLRT_GetErrorName` / `CuteDSLRT_GetErrorString`) and reports every kernel failure as the single value `CuteDSLRT_Error_CudaError`, not the underlying code, which is written to the trailing packed argument.
- Loading in Python raises instead of returning (`DSLCudaRuntimeError` carrying the `cudaError_t` name). The Apache TVM FFI ABI uses a different contract: `0` on success and `-1` on failure, with the message retrieved through the TVM FFI error object.

- Custom types are **not** supported for AOT compilation.
- Object files depend on the CUDA runtime library version; embedded metadata is checked at load time to catch ABI incompatibility.

## Related

- [Compile with TVM FFI](./compile-with-tvm-ffi.md)
- [JIT Compilation Options](./dsl-jit-compilation-options.md)
