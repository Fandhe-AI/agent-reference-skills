# MMA: tcgen05 Programming Guide (Blackwell, SM100)

## Signature / Usage

```python
mma_op = cute.nvgpu.MmaTF32Op(...)   # or MmaF16BF16Op, MmaI8Op, MmaF8F6F4Op,
                                       # MmaMXF8F6F4Op / MmaMXF4Op / MmaMXF4NVF4Op (block-scaled)

# tensor partitioning: local-tile then MMA-partition
# A: (MMA, MMA_M, MMA_K)  B: (MMA, MMA_N, MMA_K)  C: (MMA, MMA_M, MMA_N)

tcgen05.Field.ACCUMULATE   # accumulation-mode field set before cute.gemm()
```

## Options / Props

| Trait | Description |
| --- | --- |
| Generation | Blackwell 5th-gen Tensor Core MMA; 2x-4x throughput vs. Hopper WGMMA depending on data type |
| Tensor Memory (TMEM) | Dedicated on-chip memory for accumulators and, optionally, operand A |
| Launch model | Single-thread issues the MMA instruction |
| CTA-pair cooperation | Two adjacent CTAs can jointly execute one MMA |
| `MmaTF32Op` / `MmaF16BF16Op` / `MmaI8Op` / `MmaF8F6F4Op` | Dense op classes |
| `MmaMXF8F6F4Op` / `MmaMXF4Op` / `MmaMXF4NVF4Op` | Block-scaled op classes |

| Naming convention | Meaning |
| --- | --- |
| `mX` | Global tensor |
| `gX` | MMA-tiled GMEM slice |
| `sX` | SMEM allocation |
| `tCrX` | SMEM-descriptor MMA fragment |
| `tCtX` | TMEM tensor |
| `tTR_*` | TMEM->RMEM partitioned tensors (epilogue) |

## Notes

- Data flow: A/B go GMEM → SMEM (via TMA) → MMA; C/D accumulate in TMEM through the GEMM loop, then load via `LDTM` and store to GMEM.
- Fragment creation: A/B fragments are SMEM descriptors, or TMEM addresses when `a_src=TMEM`; the C fragment lives in TMEM, created via `partition_shape_C()`, staged with `append()`.
- Main loop: wait for TMA loads, set `tcgen05.Field.ACCUMULATE`, issue `cute.gemm()` with SMEM descriptors for A/B and the TMEM accumulator, release SMEM buffers for the next load.
- Block-scaled variant adds separate scale-factor tensors (SFA/SFB), an SMEM→TMEM copy (S2T) before each GEMM, and a modified main loop passing `[value, scale]` operand pairs.

## Related

- [MMA: WGMMA Programming (Hopper)](./mma-wgmma-programming.md)
- [Blackwell SM100 GEMM](../cpp/blackwell-sm100-gemm.md)
- [CuTe DSL API: cute_nvgpu_tcgen05](./api-cute-nvgpu-tcgen05.md)
