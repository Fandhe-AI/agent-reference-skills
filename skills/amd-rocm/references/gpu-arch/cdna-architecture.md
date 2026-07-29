# CDNA Architecture

CDNA (Compute DNA) is AMD's data-center-only GPU architecture family (Instinct MI-series accelerators), optimized for HPC/AI throughput rather than graphics/raster. Across CDNA1→CDNA4, AMD scaled compute density mainly by moving from a single monolithic die to multi-die chiplet ("XCD") packages, and by adding/expanding a dedicated Matrix Core (tensor-style) pipeline per compute unit.

## Signature / Usage

```bash
# Confirm the local Instinct accelerator's gfx target maps to a CDNA generation
rocminfo | grep -i gfx      # e.g. gfx942 -> CDNA3 (MI300 series)
```

## Options / Props

| Generation | Products | Compute layout | CU/wavefront | Matrix Core |
| --- | --- | --- | --- | --- |
| CDNA (1) | MI100, gfx908 | Monolithic die, 8 Shader Engines × 15 CU = 120 CU | 64-wide wavefront, 4 SIMD units/CU | FP32 matrix 46.1 TFLOPS, FP16 matrix 184.6 TFLOPS, BF16 matrix 92.3 TFLOPS (peak) |
| CDNA2 | MI250X/MI250/MI210, gfx90a | 2 GCDs (Graphics Compute Dies) per OAM package, up to 110 CU/GCD | 64-wide wavefront, 4 SIMD units/CU | FP64 matrix 90.5 TFLOPS/OAM (vs 45.3 TFLOPS FP64 vector) |
| CDNA3 | MI300X/MI300A/MI325X, gfx942 | Chiplet: up to 8 XCDs (MI300X) or 6 XCDs + 3 CCDs (MI300A, CPU+GPU APU), 40 CU/XCD (38 active) | 64-wide wavefront | ~3x FP16/BF16 throughput and ~6.8x INT8 throughput vs MI250X |
| CDNA4 | MI350X/MI355X, gfx950 | 32 CU/XCD, 256 CU total | 64-wide wavefront | Adds native fp4/fp6/fp8 matrix types (see [precision-support.md](./precision-support.md)) |

Cache hierarchy per generation (L1 vector cache, L2, LDS, per-CU register files) is tabulated in [gpu-arch-specs.md](./gpu-arch-specs.md).

## Notes

- Source: `rocm.docs.amd.com/en/latest/reference/gpu-arch/{mi100,mi250,mi300}.html` (per-generation microarchitecture pages) plus `rocm.docs.amd.com/en/latest/reference/glossary/device-hardware.html` (XCD/GCD/Matrix Core definitions), synthesized into one cross-generation CDNA summary; no single rocm.docs.amd.com or gpuopen.com page presents CDNA1-4 as one consolidated summary.
- The generation-specific detail behind each row is already covered per-page in this category: see [mi100-microarchitecture.md](./mi100-microarchitecture.md), [mi250-microarchitecture.md](./mi250-microarchitecture.md), [mi300-microarchitecture.md](./mi300-microarchitecture.md).
- CDNA3's chiplet design connects XCDs (and, for MI300A, CCDs) via AMD Infinity Fabric; MI300 GPUs additionally form a fully-connected 8-GPU system via 7 Infinity Fabric links per GPU.
- MI300A is an APU package (GPU XCDs + CPU CCDs sharing unified memory); MI300X is GPU-only. Both use the same `gfx942` ISA.
- MI250 (CDNA2) inter-GCD bandwidth: 4 Infinity Fabric links at 25 GT/s ≈ 200 GB/s per direction (400 GB/s bidirectional) between the two GCDs in one OAM; external GPU-to-GPU links are 16-wide at 25 GT/s (~50 GB/s per link, 100 GB/s bidirectional).
- All CDNA generations use a fixed 64-thread wavefront (wave64), unlike RDNA's configurable wave32/wave64 — see [rdna-architecture.md](./rdna-architecture.md).
- These are AMD CDNA hardware terms (compute unit, XCD/GCD chiplet, matrix core, Infinity Fabric, wave64) and are distinct from NVIDIA SM / warp / tensor core / NVLink terminology.

## Related

- [mi100-microarchitecture.md](./mi100-microarchitecture.md)
- [mi250-microarchitecture.md](./mi250-microarchitecture.md)
- [mi300-microarchitecture.md](./mi300-microarchitecture.md)
- [gpu-arch-specs.md](./gpu-arch-specs.md)
- [precision-support.md](./precision-support.md)
