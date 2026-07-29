# MMA: Warp-Level MMA Programming Guide

## Signature / Usage

```python
mma_op = cute.nvgpu.MmaF16BF16Op(...)          # SM80+
# or MmaFP8Op (SM89+), MmaMXF4Op / MmaMXF4NVF4Op (block-scaled, SM120a+)

tiled_mma = cute.make_tiled_mma(mma_op, ...)
# data flow: GMEM -> SMEM via cp.async -> RMEM via ldmatrix -> warp-synchronous MMA
```

## Options / Props

| Trait | Description |
| --- | --- |
| Scope | Warp-level: 32 threads cooperate on one synchronous instruction |
| Issue model | Synchronous — instructions complete in program order, no fences |
| Operand residency | All operands live in the register file (RMEM) |
| Operand layout | Fixed: A row-major (K-major), B column-major (K-major); transpose is not supported |
| `MmaF16BF16Op` | F16/BF16, SM80+ |
| `MmaFP8Op` | FP8 E4M3/E5M2, SM89+ |
| `MmaMXF4Op` / `MmaMXF4NVF4Op` | Block-scaled MX FP4, SM120a+ |

## Notes

- Workflow: create MMA op + `TiledMMA` → SMEM layout with swizzling (bank-conflict-free) → per-thread tensor partitioning → register fragments → main loop with synchronized loads + MMA calls → epilogue.
- Block-scaled MMA multiplies narrow-type (FP4) matrices while applying per-block scale factors along the GEMM-K dimension.

## Related

- [MMA Intro](./mma-intro.md)
- [MMA: WGMMA Programming (Hopper)](./mma-wgmma-programming.md)
- [CuTe DSL API: cute_nvgpu_warp](./api-cute-nvgpu-warp.md)
