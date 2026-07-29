# MMA: Warpgroup MMA (WGMMA) Programming Guide

## Signature / Usage

```python
cute.nvgpu.warpgroup.fence()
cute.gemm(tiled_mma, acc, tCrA[tile_crd], tCrB[tile_crd], acc)
cute.nvgpu.warpgroup.commit_group()
cute.nvgpu.warpgroup.wait_group(k_pipe_mmas)
```

## Options / Props

| Trait | Description |
| --- | --- |
| Scope | One MMA issued collectively by a 128-thread warpgroup, not a single warp (Hopper SM90a) |
| Issue model | Asynchronous: `fence()`, `commit_group()`, `wait_group()` |
| Operand B | Sourced from staged shared memory |
| Operand A | From shared-memory descriptors or from registers |
| Accumulator | Lives in RMEM; serves as both input C and output D |
| Dense op classes | `MmaF16BF16Op`, `MmaF8Op` (E4M3/E5M2), `MmaI8Op` — instruction shapes M=64, N=64..256 |

| Naming convention | Meaning |
| --- | --- |
| `sX` | SMEM allocation |
| `tCsX` | MMA-partitioned SMEM view |
| `tCrX` | SMEM descriptor fragment |
| `acc` | RMEM accumulator |
| `MMA_M` / `MMA_N` / `MMA_K` | Repeat counts along each dimension |

## Notes

- Data flow: A and B both go GMEM → SMEM (via TMA) → SMEM descriptor → WGMMA; accumulator C/D lives in RMEM, moves to SMEM via `stmatrix` (R2S), then to GMEM via TMA store.
- Setup: create the WGMMA op, build a `TiledMMA` via spatial-tiling repeat counts, configure swizzled SMEM layouts; kernel: stage SMEM tensors, partition per tiled-MMA layout, build SMEM descriptors via `make_fragment_A()`/`make_fragment_B()`, allocate the RMEM accumulator via `make_rmem_tensor()`.
- Reference examples: `examples/cute/hopper/kernel/dense_gemm/dense_gemm.py` (dense GEMM), a persistent-GEMM variant, and an FMHA attention kernel (demonstrates the RMEM-A operand path).

## Related

- [MMA: WMMA Programming (Warp-Level)](./mma-wmma-programming.md)
- [MMA: tcgen05 Programming (Blackwell)](./mma-tcgen05-programming.md)
