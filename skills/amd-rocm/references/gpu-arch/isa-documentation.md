# ISA Documentation

Index of AMD's official per-generation Instruction Set Architecture (ISA) reference documents. These are AMD-hosted PDFs and are **not fetchable via automated tooling** (repeated attempts time out); this page records document titles, the generation each covers, and the canonical URL only — it intentionally contains no instruction-level content (opcodes, encodings, operand formats). For instruction-level detail, download the PDF directly or use the [machine-readable ISA](./machine-readable-isa.md) XML specifications instead.

## Signature / Usage

```bash
# Identify the gfx target first (see gpu-arch-specs.md), then look up its ISA doc below
rocminfo | grep -i gfx
```

## Options / Props

| Generation | Document title | URL |
| --- | --- | --- |
| RDNA4 | AMD RDNA 4 ISA | https://www.amd.com/content/dam/amd/en/documents/radeon-tech-docs/instruction-set-architectures/rdna4-instruction-set-architecture.pdf |
| RDNA3.5 | AMD RDNA 3.5 ISA | https://www.amd.com/content/dam/amd/en/documents/radeon-tech-docs/instruction-set-architectures/rdna35_instruction_set_architecture.pdf |
| RDNA3 | AMD RDNA 3 ISA | https://www.amd.com/system/files/TechDocs/rdna3-shader-instruction-set-architecture-feb-2023_0.pdf |
| RDNA2 | AMD RDNA 2 ISA | https://www.amd.com/system/files/TechDocs/rdna2-shader-instruction-set-architecture.pdf |
| RDNA (1) | AMD RDNA ISA | https://www.amd.com/system/files/TechDocs/rdna-shader-instruction-set-architecture.pdf |
| CDNA4 | AMD CDNA 4 (Instinct MI350 Series) ISA reference | https://www.amd.com/content/dam/amd/en/documents/instinct-tech-docs/instruction-set-architectures/amd-instinct-cdna4-instruction-set-architecture.pdf |
| CDNA3 | AMD CDNA 3 (Instinct MI300 Series) ISA reference | https://www.amd.com/content/dam/amd/en/documents/instinct-tech-docs/instruction-set-architectures/amd-instinct-mi300-cdna3-instruction-set-architecture.pdf |
| CDNA2 | AMD CDNA 2 (Instinct MI200 Series) ISA reference | https://www.amd.com/system/files/TechDocs/instinct-mi200-cdna2-instruction-set-architecture.pdf |
| CDNA (1) | AMD CDNA (AMD Instinct MI100) ISA reference | https://www.amd.com/system/files/TechDocs/instinct-mi100-cdna1-shader-instruction-set-architecture%C2%A0.pdf |
| Vega 7nm | AMD Vega 7nm (Instinct MI50) ISA reference | https://www.amd.com/system/files/TechDocs/vega-7nm-shader-instruction-set-architecture.pdf |
| GCN3 | AMD GCN 3 ISA | https://www.amd.com/system/files/TechDocs/gcn3-instruction-set-architecture.pdf |

## Notes

- Source index: `gpuopen.com/amd-gpu-architecture-programming-documentation/` and `rocm.docs.amd.com/en/latest/conceptual/gpu-arch.html`. Whitepapers (higher-level architecture overviews, distinct from the instruction-level ISA PDFs) are listed on the same source pages but are likewise PDF-only and not reproduced here.
- These PDFs could not be fetched by automated tooling during authoring (connection timeouts on `www.amd.com`); treat the URLs above as the canonical location to open manually, not as content already summarized in this skill.
- Do not substitute model knowledge of instruction encodings for this page's content — if instruction-level detail is needed, open the PDF or use [machine-readable-isa.md](./machine-readable-isa.md).

## Related

- [machine-readable-isa.md](./machine-readable-isa.md)
- [gpu-architecture-overview.md](./gpu-architecture-overview.md)
- [gpu-arch-specs.md](./gpu-arch-specs.md)
