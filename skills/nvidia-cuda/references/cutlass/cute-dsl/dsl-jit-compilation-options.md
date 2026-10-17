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

# v4.8.0 option types for SASS dumping and ptxas flags
from cutlass.cute import KeepSASS, NvdisasmOptions, PtxasOptions
cute.compile[KeepSASS, NvdisasmOptions("-c")](add, 1, 2)
cute.compile[PtxasOptions("--opt-level=2")](add, 1, 2)
```

## Options / Props

| Option | Description | Default |
| --- | --- | --- |
| `opt-level` | Optimization intensity, 0–3 | 3 |
| `enable-assertions` | Activate assertions in host/device code | `False` |
| `keep-cubin` | Retain generated CUBIN file | `False` |
| `keep-ptx` | Retain generated PTX file | `False` |
| `keep-sass` | Keep the generated SASS disassembly file | `False` |
| `nvdisasm-options` | Flags passed to `nvdisasm` when disassembling the CUBIN to SASS | `"-g -c"` |
| `ptxas-options` | Extra PTX Compiler parameters (Python type: `PtxasOptions`) | `""` |
| `generate-line-info` | Produce debugging line information | `False` |
| `gpu-arch` | Target GPU architecture | `""` |
| `host-target` | Target spec for AOT host cross-compilation; empty targets the build host; non-empty cross-compiles the exported AOT host object (AArch64 only); accepts a preset tag (`linux-aarch64`) or `llvm -mtriple=<triple> [-mcpu=<cpu>] [-mattr=<features>]` | `""` |
| `enable-tvm-ffi` | Enable Apache TVM FFI | `False` |

## Notes

- String options are parsed with `argparse`, which accepts only the documented driver options and raises an error for any invalid option. The Python type form (`cute.compile[...]`) raises on invalid options immediately and converts boolean option types to `True` instances. Compile option classes: `OptLevel`, `EnableAssertions`, `GenerateLineInfo`, `KeepCUBIN`, `KeepPTX`, `KeepSASS`, `NvdisasmOptions`, `PtxasOptions`.
- CHANGELOG 4.8.0: `nvidia-cuda-nvdisasm` is now an optional dependency of `nvidia-cutlass-dsl` via the optional `[sass]` extra. SASS dumping (`CUTE_DSL_KEEP=sass` / `KeepSASS`) resolves `nvdisasm` from the bundled wheel (recommended, since its version matches the DSL toolchain) or from a local CUDA Toolkit (`CUDA_HOME` / `CUDA_PATH`); a locally provided `nvdisasm` must come from a CUDA Toolkit at least as new as the toolchain that produced the CUBIN. Installations that never dump SASS are unaffected.

## Related

- [JIT Caching](./dsl-jit-caching.md)
- [Debugging](./debugging.md)
