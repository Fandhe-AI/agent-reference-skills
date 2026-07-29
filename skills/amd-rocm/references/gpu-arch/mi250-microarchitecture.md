# MI250 Microarchitecture

AMD Instinct MI250/MI250X/MI210 are the CDNA2 generation accelerators, `gfx90a`. MI250/MI250X package two Graphics Compute Dies (GCDs) on one OAM module; MI210 is a single-GCD SKU.

## Signature / Usage

```bash
hipcc --offload-arch=gfx90a kernel.hip -o kernel
```

## Options / Props

| Property | Value |
| --- | --- |
| Architecture / LLVM target | CDNA2, gfx90a |
| GCDs per OAM package | 2 (MI250/MI250X); MI210 is single-GCD |
| Compute Units per GCD | 110 (MI250X) / 104 (MI250) / 104 (MI210, single GCD) |
| SIMD per CU | 4 SIMD units per CU |
| Wavefront | 64 threads; FP64 processed as 16 elements/instruction |
| Peak clock | 1.7 GHz |
| Memory per GCD | HBM2e, 1.6 TB/s peak bandwidth per GCD (3.2 TB/s aggregate, dual-GCD package) |
| Intra-package GCD-to-GCD links | 4 Infinity Fabric links, 25 GT/s, 200 GB/s peak per direction (400 GB/s bidirectional) |
| Inter-package (GPU-to-GPU) links | 16-wide Infinity Fabric links, 25 GT/s, ~50 GB/s per link (100 GB/s bidirectional peak) |
| Peak FP64 (Vector) | 45.3 TFLOPS per OAM package |
| Peak FP64 (Matrix) | 90.5 TFLOPS per OAM package |

## Notes

- MI250X/MI250 are dual-GCD packages: each GCD is enumerated by ROCm as a separate GPU device (`rocm-smi`/`rocminfo` will show 2 devices per OAM module).
- Cache hierarchy (L1/L2 sizes) is not detailed on the MI250 microarchitecture page itself; see [gpu-arch-specs.md](./gpu-arch-specs.md) for the L2-cache-per-GCD figures (16 MiB total / 8 MiB per GCD for MI250X/MI250).
- These are AMD CDNA2 hardware terms (compute unit, GCD, Infinity Fabric, wave64) and are distinct from NVIDIA SM / warp / NVLink terminology.

## Related

- [cdna-architecture.md](./cdna-architecture.md)
- [gpu-arch-specs.md](./gpu-arch-specs.md)
- [mi300-mi200-performance-counters.md](./mi300-mi200-performance-counters.md)
