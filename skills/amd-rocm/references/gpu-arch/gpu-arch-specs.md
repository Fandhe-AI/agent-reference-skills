# GPU Architecture Specs

Product-name → architecture → LLVM target (`gfx` code) → compute-unit-count mapping for AMD Instinct, Radeon PRO, Radeon, and Ryzen AI (APU) GPUs. Use this to pick `--offload-arch` for `hipcc` or to interpret `rocminfo` output.

## Signature / Usage

```bash
# Compile for a specific target derived from the tables below (e.g. MI300X = gfx942)
hipcc --offload-arch=gfx942 kernel.hip -o kernel
```

## Options / Props

### AMD Instinct GPUs

| Name | Architecture | LLVM target | VRAM (GiB) | Compute Units | Wavefront Size | L2 Cache (MiB) |
| --- | --- | --- | --- | --- | --- | --- |
| MI355X | CDNA4 | gfx950 | 288 | 256 (32 per XCD) | 64 | 32 (4 per XCD) |
| MI350X | CDNA4 | gfx950 | 288 | 256 (32 per XCD) | 64 | 32 (4 per XCD) |
| MI325X | CDNA3 | gfx942 | 256 | 304 (38 per XCD) | 64 | 32 (4 per XCD) |
| MI300X | CDNA3 | gfx942 | 192 | 304 (38 per XCD) | 64 | 32 (4 per XCD) |
| MI300A | CDNA3 | gfx942 | 128 | 228 (38 per XCD) | 64 | 24 (4 per XCD) |
| MI250X | CDNA2 | gfx90a | 128 | 220 (110 per GCD) | 64 | 16 (8 per GCD) |
| MI250 | CDNA2 | gfx90a | 128 | 208 (104 per GCD) | 64 | 16 (8 per GCD) |
| MI210 | CDNA2 | gfx90a | 64 | 104 | 64 | 8 |
| MI100 | CDNA | gfx908 | 32 | 120 | 64 | 8 |
| MI60 | GCN5.1 | gfx906 | 32 | 64 | 64 | 4 |
| MI50 (32GB) | GCN5.1 | gfx906 | 32 | 60 | 64 | 4 |
| MI50 (16GB) | GCN5.1 | gfx906 | 16 | 60 | 64 | 4 |
| MI25 | GCN5.0 | gfx900 | 16 | 64 | 64 | 4 |
| MI8 | GCN3.0 | gfx803 | 4 | 64 | 64 | 2 |
| MI6 | GCN4.0 | gfx803 | 16 | 36 | 64 | 2 |

### AMD Radeon PRO GPUs

| Name | Architecture | LLVM target | VRAM (GiB) | Compute Units | Wavefront Size | Infinity Cache (MiB) |
| --- | --- | --- | --- | --- | --- | --- |
| Radeon AI PRO R9700S | RDNA4 | gfx1201 | 32 | 64 | 32 or 64 | 64 |
| Radeon AI PRO R9700 | RDNA4 | gfx1201 | 32 | 64 | 32 or 64 | 64 |
| Radeon AI PRO R9600D | RDNA4 | gfx1201 | 32 | 48 | 32 or 64 | 48 |
| Radeon PRO V710 | RDNA3 | gfx1101 | 28 | 54 | 32 or 64 | 56 |
| Radeon PRO W7900 Dual Slot | RDNA3 | gfx1100 | 48 | 96 | 32 or 64 | 96 |
| Radeon PRO W7900 | RDNA3 | gfx1100 | 48 | 96 | 32 or 64 | 96 |
| Radeon PRO W7800 48GB | RDNA3 | gfx1100 | 48 | 70 | 32 or 64 | 96 |
| Radeon PRO W7800 | RDNA3 | gfx1100 | 32 | 70 | 32 or 64 | 64 |
| Radeon PRO W7700 | RDNA3 | gfx1101 | 16 | 48 | 32 or 64 | 64 |

### AMD Ryzen APUs

| Name | Graphics model | Architecture | LLVM target | Compute Units | Infinity Cache (MiB) |
| --- | --- | --- | --- | --- | --- |
| AMD Ryzen 7 7840U | Radeon 780M | RDNA3 | gfx1103 | 12 | N/A |
| AMD Ryzen 9 270 | Radeon 780M | RDNA3 | gfx1103 | 12 | N/A |
| AMD Ryzen AI 9 HX 375 | Radeon 890M | RDNA3.5 | gfx1150 | 16 | N/A |
| AMD Ryzen AI Max+ PRO 395 | Radeon 8060S | RDNA3.5 | gfx1151 | 40 | 32 |
| AMD Ryzen AI 7 350 | Radeon 860M | RDNA3.5 | gfx1152 | 8 | N/A |

VRAM for Ryzen APUs is dynamically allocated from system memory plus a carveout (not a fixed dedicated pool).

## Notes

- Source: `rocm.docs.amd.com/en/latest/reference/gpu-arch-specs.html` (ROCm 7.14.0 doc tree). Only compute-relevant columns are reproduced here (VGPR/SGPR file sizes and per-cache-level KiB breakdowns are omitted; consult the source page for the full column set).
- `gfx90a` (CDNA2) and `gfx942` (CDNA3) are also the values passed to `--offload-arch` / seen in `rocminfo` / `hipDeviceProp_t::gcnArchName`.
- MI300A is an APU (GPU + CPU CCDs on one package); MI300X is GPU-only — hence MI300A's lower CU/L2 count in the same `gfx942` family.
- These are AMD CDNA/RDNA hardware terms (compute unit, wavefront, gfx target) and are distinct from NVIDIA SM / warp / compute capability terminology.

## Related

- [gpu-architecture-overview.md](./gpu-architecture-overview.md)
- [mi300-microarchitecture.md](./mi300-microarchitecture.md)
- [mi250-microarchitecture.md](./mi250-microarchitecture.md)
- [mi100-microarchitecture.md](./mi100-microarchitecture.md)
- [precision-support.md](./precision-support.md)
