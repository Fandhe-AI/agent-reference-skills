# MI300 Microarchitecture

AMD Instinct MI300 series (MI300X, MI300A, MI325X) are CDNA3 generation accelerators, `gfx942`, built as multi-die chiplet packages combining XCDs (compute dies), I/O dies, and (for MI300A) CPU CCDs.

## Signature / Usage

```bash
hipcc --offload-arch=gfx942 kernel.hip -o kernel
```

## Options / Props

| Property | Value |
| --- | --- |
| Architecture / LLVM target | CDNA3, gfx942 |
| XCDs | 8 (MI300X, MI325X) or 6 (MI300A) |
| CCDs (CPU chiplets) | 3 (MI300A only; MI300X/MI325X have none — GPU-only) |
| CUs per XCD | 40 total, 38 active (2 disabled for yield management) |
| Max CU count | up to 304 (MI300X/MI325X); 228 (MI300A, fewer active XCDs) |
| L1 cache | 32 KiB per Compute Unit |
| L2 cache | 4 MiB shared per XCD |
| HBM stacks | 8 stacks of HBM3 |
| I/O dies | 4 |
| Inter-GPU links | 7 Infinity Fabric links per GPU, forming a fully-connected 8-GPU system |
| Matrix Core throughput vs MI250X | ~3x for FP16/BF16, ~6.8x for INT8 |

## Notes

- MI300A is an APU: 6 XCDs (GPU) + 3 CCDs (CPU cores) sharing a unified memory space, versus MI300X/MI325X which are GPU-only with 8 XCDs and no CCDs.
- Chiplets (XCDs, CCDs, I/O dies) are connected via AMD Infinity Fabric; the CU/L2 figures in [gpu-arch-specs.md](./gpu-arch-specs.md) already account for the "38 active CUs per XCD" yield-management detail (e.g. MI300X = 8 × 38 = 304 CU).
- These are AMD CDNA3 hardware terms (compute unit, XCD/CCD chiplet, Infinity Fabric, matrix core) and are distinct from NVIDIA SM / warp / tensor core / NVLink terminology.

## Related

- [cdna-architecture.md](./cdna-architecture.md)
- [gpu-arch-specs.md](./gpu-arch-specs.md)
- [mi300-mi200-performance-counters.md](./mi300-mi200-performance-counters.md)
- [precision-support.md](./precision-support.md)
