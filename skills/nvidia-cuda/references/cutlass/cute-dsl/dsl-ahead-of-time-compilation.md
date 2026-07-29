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

- Custom types are **not** supported for AOT compilation.
- Object files depend on the CUDA runtime library version; embedded metadata is checked at load time to catch ABI incompatibility.

## Related

- [Compile with TVM FFI](./compile-with-tvm-ffi.md)
- [JIT Compilation Options](./dsl-jit-compilation-options.md)
