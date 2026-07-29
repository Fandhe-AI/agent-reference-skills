# Machine-Readable ISA

AMD publishes its GPU ISA specifications as machine-readable **XML** files (instructions, encodings, operands, data formats, and human-readable description strings) as an alternative to the PDF ISA references in [isa-documentation.md](./isa-documentation.md). Covers CDNA1-4 (MI100/MI200/MI300/MI350) and RDNA1/2/3/3.5/4.

## Signature / Usage

```bash
# Clone the tooling that parses the XML specification files
git clone https://github.com/GPUOpen-Tools/isa_spec_manager
```

## Options / Props

| Resource | Location |
| --- | --- |
| XML specification files (.zip) | https://gpuopen.com/download/machine-readable-isa/latest/ |
| IsaDecoder / isa_spec_manager tooling | https://github.com/GPUOpen-Tools/isa_spec_manager |
| Spec schema documentation | https://github.com/GPUOpen-Tools/isa_spec_manager/blob/main/documentation/spec_documentation.md |

## Notes

- The **IsaDecoder** API (C++) parses the specification XML files and can decode individual instructions or whole shaders; an experimental `explorer::Spec` API allows iterating over specification-file elements programmatically.
- The **Radeon GPU Analyzer (RGA)** is the disassembly/analysis tool that consumes these same specs in practice, for developers who need to inspect compiled shader/kernel ISA.
- This page is a pointer to the official download/tooling location only; it does not reproduce instruction encodings — treat it as a source, not a substitute for reading the XML/PDF yourself.

## Related

- [isa-documentation.md](./isa-documentation.md)
- [gpu-architecture-overview.md](./gpu-architecture-overview.md)
