# CUTLASS Overview

## Signature / Usage

CUTLASS (CUDA Templates for Linear Algebra Subroutines and Solvers) is a collection of abstractions for implementing high-performance matrix-matrix multiplication (GEMM) and related computations at all levels and scales within CUDA. This documentation covers CUTLASS 4.7.0 (released August 2026). The project has provided C++ template abstractions since 2017.

```cpp
// Two primary interfaces exposed by the project:
// 1. CuTe DSL   — Python-native programming model for CUDA kernels (public beta)
// 2. CUTLASS C++ — established C++ template library for GPU computation
```

## Options / Props

| Item | Value | Description |
| --- | --- | --- |
| Data types | FP64, FP32, TF32, FP16, BF16, FP8 (e5m2, e4m3), block-scaled (NVFP4, MXFP4, MXFP6, MXFP8), narrow integers (4/8-bit signed/unsigned, 1-bit binary where supported) | Supported numeric types for GEMM operands/accumulators |
| Architectures | Volta (SM70) through Blackwell | Minimum compute capability for the library |
| Compiler | C++17-compatible host compiler | Minimum language standard |
| CUDA Toolkit | 11.4 minimum, 12.8 recommended | Toolkit version requirements |
| New in 4.7 | Primitives API for lower-level Tensor Core programming, Task Scheduling framework (static analysis of warp-specialized kernels), improved compiler diagnostics for register spills/memory issues with source line numbers | Notable additions in this release |

## Notes

- Codebase layout: header-only template library (`include/cutlass/`), CuTe core (`include/cute/`), `examples/`, profiling tools, and unit tests.
- This page corresponds to `latest/overview.html` (outside the `media/docs/cpp/` URL prefix that the rest of this category follows).

## Related

- [Getting Started](./getting-started.md)
- [Quickstart](./quickstart.md)
