# JIT Compilation Options

## Signature / Usage

```python
# string-based options (argparse-compatible syntax)
jit_executor_opt2 = cute.compile(add, 1, 2, options="--opt-level 2")
jit_executor_dbg  = cute.compile(add, 1, 2, options="--enable-assertions")

# Python type-based options
from cutlass.cute import OptLevel, EnableAssertions, GenerateLineInfo, KeepCUBIN, KeepPTX

my_debugging_options = (OptLevel(1), EnableAssertions, GenerateLineInfo, KeepCUBIN, KeepPTX)
compiled_kernel = cute.compile[my_debugging_options](my_kernel, ...)
```

## Options / Props

| Option | Description | Default |
| --- | --- | --- |
| `opt-level` | Optimization intensity, 0–3 | 3 |
| `enable-assertions` | Activate assertions in host/device code | `False` |
| `keep-cubin` | Retain generated CUBIN file | `False` |
| `keep-ptx` | Retain generated PTX file | `False` |
| `ptxas-options` | Extra PTX Compiler parameters | `""` |
| `generate-line-info` | Produce debugging line information | `False` |
| `gpu-arch` | Target GPU architecture | `""` |
| `enable-tvm-ffi` | Enable Apache TVM FFI | `False` |

## Related

- [JIT Caching](./dsl-jit-caching.md)
- [Debugging](./debugging.md)
