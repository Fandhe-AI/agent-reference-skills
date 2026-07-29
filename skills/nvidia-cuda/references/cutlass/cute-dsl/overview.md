# CuTe DSL Overview

## Signature / Usage

```python
import cutlass
import cutlass.cute as cute

@cute.jit
def host_entry(...): ...

@cute.kernel
def device_kernel(...): ...
```

## Options / Props

| Item | Description |
| --- | --- |
| Purpose | Python-based DSLs on top of the CUTLASS C++ template library, for faster iteration/prototyping |
| Core abstractions | Layouts (data organization in memory/threads), Tensors (data pointer + layout metadata), Atoms (fundamental hardware ops like MMA), Tiled Operations (atoms applied across thread blocks/warps) |
| Compilation | Python kernels compiled at runtime into CUDA device code via MLIR infrastructure and NVIDIA's `ptxas` toolchain |
| Status | Public beta; interfaces and features subject to change |

## Notes

- CuTe DSL complements, not replaces, CUTLASS C++ — it shares concepts with CUTLASS 3.x but currently lacks the full GEMM/Conv autotuning libraries the C++ version has.
- This is the Python `cutlass.cute.*` implementation; it is a separate language and implementation from the C++ `cute::*` templates documented under this skill's `cpp` category.

## Related

- [Functionality](./functionality.md)
- [Quick Start](./quick-start.md)
- [DSL Introduction](./dsl-introduction.md)
