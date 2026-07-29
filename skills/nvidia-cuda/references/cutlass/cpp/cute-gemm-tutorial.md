# CuTe: GEMM Tutorial

## Signature / Usage

```cpp
// CuTe convention: A is (M,K), B is (N,K), C is (M,N)
Tensor mA = make_tensor(ptrA, make_shape(M, K), make_stride(strideM, strideK));
Tensor mB = make_tensor(ptrB, make_shape(N, K), make_stride(strideN, strideK));
Tensor mC = make_tensor(ptrC, make_shape(M, N), make_stride(strideM_C, strideN_C));
```

## Options / Props

| Example file | Description |
| --- | --- |
| `sgemm_1.cu` | Fundamental approach: three-level partitioning — CTA-level (work across thread blocks), Copy-level (shared-memory copy partitioned by thread layout), Math-level (matrix-multiply partitioned across threads) |
| `sgemm_2.cu` | Introduces `TiledCopy` (checked dispatch to specific copy instructions with distinct source/destination partitioning) and `TiledMMA` (checked dispatch to specific MMA instructions with complex partitioning patterns) |
| `sgemm_sm70.cu` | Volta: pipelines shared and register memory |
| `sgemm_sm80.cu` | Ampere: explicitly pipelines shared memory using asynchronous global-memory reads |

## Notes

- Matrix "majorness" in CuTe is expressed by which mode has stride-1: M-major, N-major, or K-major — not by row-major/column-major terminology.
- GETT (generalized tensor contraction) can reuse an existing GEMM kernel unmodified by folding a tensor into a matrix — grouping modes according to their M/N/K category via nested layouts.

## Related

- [CuTe: MMA Atom](./cute-mma-atom.md)
- [CuTe: Predication](./cute-predication.md)
- [GEMM API (3.x)](./gemm-api-3x.md)
