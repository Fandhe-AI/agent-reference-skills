# GPU Architecture Overview

AMD ships two parallel GPU architecture families: **CDNA** (data-center compute, AMD Instinct accelerators) and **RDNA** (client/professional graphics + compute, Radeon). Both trace back to the older **GCN** (Graphics Core Next) lineage. This page indexes the generations and where their documentation lives.

## Signature / Usage

```bash
# Identify which architecture/gfx target the local GPU maps to
rocminfo | grep -i gfx
```

## Options / Props

| Generation | Family | Flagship products | ISA doc | Microarchitecture guide | Performance counters guide |
| --- | --- | --- | --- | --- | --- |
| CDNA4 | Instinct | MI350X, MI355X | AMD CDNA 4 (Instinct MI350 Series) ISA reference | — (no dedicated guide; see [gpu-arch-specs.md](./gpu-arch-specs.md)) | [mi350-performance-counters.md](./mi350-performance-counters.md) |
| CDNA3 | Instinct | MI300X, MI300A, MI325X | AMD CDNA 3 (Instinct MI300 Series) ISA reference | [mi300-microarchitecture.md](./mi300-microarchitecture.md) | [mi300-mi200-performance-counters.md](./mi300-mi200-performance-counters.md) |
| CDNA2 | Instinct | MI250X, MI250, MI210 | AMD CDNA 2 (Instinct MI200 Series) ISA reference | [mi250-microarchitecture.md](./mi250-microarchitecture.md) | [mi300-mi200-performance-counters.md](./mi300-mi200-performance-counters.md) |
| CDNA (1) | Instinct | MI100 | AMD CDNA (AMD Instinct MI100) ISA reference | [mi100-microarchitecture.md](./mi100-microarchitecture.md) | — |
| RDNA4 | Radeon / Radeon PRO / Ryzen AI | RX 9000 series, AI PRO R9700 | AMD RDNA 4 ISA reference | — | — |
| RDNA3.5 | Ryzen AI APU | Radeon 890M / 8060S / 860M | (covered under RDNA3 ISA family) | — | — |
| RDNA3 | Radeon / Radeon PRO / Ryzen | RX 7000 series, PRO W7900 | AMD RDNA 3 ISA reference | — | — |
| RDNA2 | Radeon | RX 6000 series | AMD RDNA 2 ISA reference | — | — |
| RDNA (1) | Radeon | RX 5000 series | AMD RDNA ISA reference | — | — |
| GCN5.1 (Vega 7nm) | Instinct | MI50, MI60 | AMD Vega 7nm (Instinct MI50) ISA reference | — | — |
| GCN5.0 (Vega) | Instinct | MI25 | AMD Vega (Instinct MI25) ISA reference | — | — |
| GCN3.0/4.0 | Instinct (legacy) | MI6, MI8 | AMD GCN 3 ISA reference | — | — |

Model-to-`gfx`-target-to-CU-count mapping lives in [gpu-arch-specs.md](./gpu-arch-specs.md). ISA document titles and their (non-fetchable) PDF locations are indexed in [isa-documentation.md](./isa-documentation.md); do not rely on this page for instruction-level ISA content.

## Notes

- Source: `rocm.docs.amd.com/en/latest/conceptual/gpu-arch.html` (ROCm doc tree "GPU architecture documentation" index page).
- CDNA is the data-center-only compute architecture (matrix cores, no display/raster hardware); RDNA is the client/graphics architecture also used for compute via HIP. Both are programmed through the same HIP/ROCm stack, but target different `gfx` LLVM codes and have different CU internals.
- CDNA4 (MI350 series) has no dedicated "Microarchitecture guide" page in the official docs (only ISA / whitepaper / performance-counters entries exist); its specs are covered by [gpu-arch-specs.md](./gpu-arch-specs.md) and [precision-support.md](./precision-support.md) instead.
- These are AMD CDNA/RDNA hardware terms (compute unit, wavefront, matrix core, LDS, gfx target) and are distinct from NVIDIA SM / warp / tensor core / shared memory / compute capability terminology.

## Related

- [gpu-arch-specs.md](./gpu-arch-specs.md)
- [cdna-architecture.md](./cdna-architecture.md)
- [rdna-architecture.md](./rdna-architecture.md)
- [isa-documentation.md](./isa-documentation.md)
