# Functionality

## Signature / Usage

```cpp
// CUTLASS 3.x device GEMM (SM90a, CUDA 12.0+), example data-type/layout combination
// f16 * f16 + {f16, f32}, layouts {N,T} x {N,T} => {N,T}
```

## Options / Props

| Kernel family | Min arch | Notes |
| --- | --- | --- |
| CUTLASS 3.x TensorOp GEMM | SM90a (CUDA 11.4+ baseline, SM90a needs CUDA 12.0+) | Data types: `f16*f16+{f16,f32}`, `bf16*bf16+{f16,f32}`, `{f32,tf32}*{f32,tf32}+f32`, `s8*s8+s32`; layouts `{N,T} x {N,T} => {N,T}` |
| CUTLASS 2.x Simt | SM50+ | f32, f64, f16 operands, no Tensor Core |
| CUTLASS 2.x WmmaTensorOp | SM70+ | Uses the WMMA API abstraction; canonical RowMajor/ColumnMajor layouts, 128-bit alignment |
| CUTLASS 2.x TensorOp | SM70–SM90+ | Diverse data types via Tensor Core MMA instructions |
| CUTLASS 2.x SpTensorOp (sparse) | SM80+ | Structured-sparse matrix operations |
| Implicit GEMM convolution | SM50–SM80+ | NHWC / NCxHWx tensor layouts, Simt and TensorOp classes |

## Notes

- CUTLASS 3.x kernels require CUDA 11.4+ and SM70 or newer as a baseline; SM90a TensorOp specifically needs CUDA 12.0+.
- Warp-level MMA instruction shapes map to compatible warp shapes (e.g. the 8x8x4 TensorOp instruction supports warp shapes 32x32x4, 32x64x4, 64x32x4, 64x64x4); shared-memory layouts vary by operand and instruction class (`ColumnMajorTensorOpCongruous`, `RowMajorTensorOpCrosswise`, etc.).

## Related

- [Getting Started](./getting-started.md)
- [Fundamental Types](./fundamental-types.md)
- [GEMM API (2.x)](./gemm-api-2x.md)
- [GEMM API (3.x)](./gemm-api-3x.md)
