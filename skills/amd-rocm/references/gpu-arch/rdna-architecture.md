# RDNA Architecture

RDNA is AMD's client/professional graphics-and-compute GPU architecture family (Radeon, Radeon PRO, and Ryzen AI integrated graphics), as distinct from the data-center-only CDNA family. RDNA GPUs are also valid HIP compute targets; ROCm treats them as regular `gfx1xxx` offload targets.

## Signature / Usage

```bash
# Confirm the local Radeon/Ryzen-AI GPU's gfx target maps to an RDNA generation
rocminfo | grep -i gfx      # e.g. gfx1100 -> RDNA3 (Radeon PRO W7900 family)
```

## Options / Props

| Generation | LLVM targets | Example products | Wavefront | Infinity Cache |
| --- | --- | --- | --- | --- |
| RDNA4 | gfx1201 | Radeon AI PRO R9700/R9700S/R9600D | 32 or 64 | 48-64 MiB |
| RDNA3.5 | gfx1150, gfx1151, gfx1152 | Ryzen AI (Radeon 890M/8060S/860M) | 32 or 64 | up to 32 MiB (integrated) |
| RDNA3 | gfx1100, gfx1101, gfx1103 | Radeon PRO W7900/W7800/W7700, Ryzen 780M | 32 or 64 | 56-96 MiB (discrete) |
| RDNA2 | (see ISA doc; not in current specs table) | Radeon RX 6000 series | 32 or 64 | — |
| RDNA (1) | (see ISA doc; not in current specs table) | Radeon RX 5000 series | 32 or 64 | — |

Full CU-count / VGPR-SGPR / per-level cache-size tables for RDNA3-4 products are in [gpu-arch-specs.md](./gpu-arch-specs.md).

## Notes

- RDNA's headline difference from CDNA/GCN is configurable wavefront width: RDNA can execute in **wave32** (default for most shader/compute work) as well as wave64, whereas CDNA and GCN always use wave64. Per AMD's public RDNA performance guide ("RDNA performance guide", gpuopen.com, DirectX 12/Vulkan-focused — not a HIP compute guide): "RDNA runs shader threads in groups of 32 known as wave32," compared to "GCN runs shader threads in groups of 64 known as wave64."
- The same guide refers to the RDNA **WGP** (Workgroup Processor) as the unit that local/shared memory (LDS) and thread groups map onto, but does not define its internal dual-CU structure in fetchable form; detailed WGP/CU microarchitecture is documented only in the RDNA ISA references and whitepapers (PDF, `www.amd.com`), which are outside the scope of this reference (see [isa-documentation.md](./isa-documentation.md)).
- RDNA product tables expose an `L0` naming for the per-CU vector/scalar/instruction caches (see [gpu-arch-specs.md](./gpu-arch-specs.md)), rather than CDNA's `L1` naming — reflects RDNA's extra cache level (`L0` → `L1`/Graphics-L1 → `L2` → Infinity Cache) versus CDNA's `L1` → `L2` hierarchy.
- These are AMD RDNA hardware terms (compute unit, WGP, wave32, Infinity Cache, gfx target) and are distinct from NVIDIA SM / warp / shared memory / compute capability terminology.

## Related

- [gpu-architecture-overview.md](./gpu-architecture-overview.md)
- [gpu-arch-specs.md](./gpu-arch-specs.md)
- [cdna-architecture.md](./cdna-architecture.md)
- [isa-documentation.md](./isa-documentation.md)
