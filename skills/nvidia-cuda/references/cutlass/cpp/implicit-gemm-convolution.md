# Implicit GEMM Convolution

## Signature / Usage

```cpp
// forward convolution y = conv(x, w) mapped onto GEMM dimensions:
// GEMM-M = NPQ (output spatial dims x batch)
// GEMM-N = K   (filter count)
// GEMM-K = CRS (channels x filter spatial dims)

// example: int4b_t Turing forward conv (see 09_turing_tensorop_conv2dfprop)
using Conv2dFprop = cutlass::conv::device::ImplicitGemmConvolution</* ...int4b_t operands, int32 accum, float epilogue... */>;
```

## Options / Props

| Item | Description |
| --- | --- |
| Algorithm | Implicit GEMM: convolution tiles are formed on the fly while loading global memory into shared memory, without materializing an explicit `im2col` matrix |
| GEMM-M / GEMM-N / GEMM-K mapping | NPQ / K / CRS |
| Alignment recommendation | 128-bit aligned NHWC tensors; channel count C and filter count K each a multiple of 32, to enable 128-bit vectorized memory access |
| Tile iterators | Analytic (dynamic pointer-delta computation) vs. Optimized (kernel-invariant deltas precomputed on host) |
| Tensor Core path | Turing supports 8x8x32 operations on 4-bit integers; `ldmatrix` for warp-cooperative loads; `mma.sync` PTX instruction for the MMA itself |
| Shared-memory layout | Permuted (XOR-based address transform) layouts eliminate bank conflicts across warps |
| Epilogue | Rearranges accumulator elements through shared memory, applies elementwise ops, writes to global memory with bounds checking |

## Notes

- Example `09_turing_tensorop_conv2dfprop` demonstrates forward conv with `int4b_t` inputs, int32 accumulation, and a float epilogue targeting Turing (SM75) Tensor Cores.

## Related

- [Functionality](./functionality.md)
- [GEMM API (2.x)](./gemm-api-2x.md)
