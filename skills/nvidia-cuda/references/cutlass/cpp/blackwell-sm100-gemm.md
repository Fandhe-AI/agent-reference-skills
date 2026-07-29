# Blackwell SM100 (and SM120) GEMMs

## Signature / Usage

```cpp
// Kernel dispatch policy selection (SM100 dense, 1SM)
using KernelSchedule = cutlass::gemm::KernelTmaWarpSpecialized1SmSm100;
// 2SM dense variant
using KernelSchedule2Sm = cutlass::gemm::KernelTmaWarpSpecialized2SmSm100;
// Narrow-precision, block-scaled
using KernelScheduleNvf4 = cutlass::gemm::KernelTmaWarpSpecialized1SmNvf4Sm100;
```

## Options / Props

| `tcgen05.mma` variant | Throughput vs. Hopper WGMMA | Notes |
| --- | --- | --- |
| `tf32` | 2x | Legacy TF32 |
| `f16` | 2x | FP16 / BF16 |
| `i8` | 2x | INT8 / UINT8 |
| `f8f6f4` | 2x | Mixed 4/6/8-bit precision |
| `mxf8f6f4.block_scale` | 2x | Block-scaled mixed precision |
| `mxf4.block_scale` | 4x | Block-scaled 4-bit |
| `mxf4nvf4.block_scale` | 4x | Block-scaled 4-bit variants |

| Item | Value |
| --- | --- |
| Block scaling formula | `D_ij = C_ij + Σ_k (A_i,k · SFA_i,k/SV) · (B_j,k · SFB_j,k/SV)`, SV (scale-factor vector size) = 16 or 32 |
| Scale-factor tensor layout | 512B basic block: 128 M/N × 4 K scale factors |
| Legacy type alignment | TF32: 4 elements, F16/BF16: 8 elements, I8/U8: 16 elements (matches Hopper) |
| Narrow-precision alignment | 16–128 elements depending on type combination; block-scaled A/B require type-pair-specific 16–128-element alignment |
| Dense 1SM tile shapes | 64x64 through 128x256, 4x MMA-K depth |
| Dense 2SM tile shapes | 128x64 through 256x256 |
| Sparse tile shapes | 128x64 through 256x256, 2x/4x MMA-K depth |
| SM120 cluster size | Fixed 1x1x1 (no multicast); TN layout only (A row-major, B column-major); requires `EpilogueScheduleAuto`; `float_6_t` output needs 128-element leading dimension |

## Notes

- SM120 (RTX 5000 series) supports both pingpong and cooperative kernel schedules (cooperative is the `Auto` default), unlike SM100's broader schedule set.
- This describes CUTLASS kernel-construction constraints for Blackwell GEMM (dispatch policies, tile shapes, alignment) — it does not cover general Blackwell architecture tuning guidance, which belongs to this skill's `advanced` (Blackwell tuning) category.
- Epilogue dispatch policies: `TmaWarpSpecialized1Sm` / `TmaWarpSpecialized2Sm` (plus `NoSmemWarpSpecialized` variants); `PerSmTileShape_MNK` derives from the MMA tile shape divided by SM count; `EpilogueTileAuto` picks a subtile automatically; `LinCombBlockScaleFactor` fuses block-scaled output generation.

## Related

- [Blackwell](./blackwell.md)
- [Blackwell Cluster Launch Control](./blackwell-cluster-launch-control.md)
- [GEMM API (3.x)](./gemm-api-3x.md)
