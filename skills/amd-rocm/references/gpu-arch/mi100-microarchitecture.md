# MI100 Microarchitecture

AMD Instinct MI100 is the CDNA (1) generation accelerator, `gfx908`, the first CDNA-branded Instinct GPU (successor to Vega/GCN-based MI25/MI50/MI60).

## Signature / Usage

```bash
hipcc --offload-arch=gfx908 kernel.hip -o kernel
```

## Options / Props

| Property | Value |
| --- | --- |
| Architecture / LLVM target | CDNA, gfx908 |
| Compute Units | 120 total, organized as 8 Shader Engines × 15 CU |
| SIMD per CU | 4 SIMD units, each processing 16 data elements/instruction (64-element wavefront) |
| Instruction cache | 32 KiB per CU |
| Register file (per CU) | 256 VGPR, 800 SGPR |
| Memory | 4 stacks of HBM2, 32 GiB total, 4096-bit interface |
| Peak memory bandwidth | 1.228 TB/s at 1.2 GHz |
| Core clock (peak) | 1.5 GHz |
| Peak FP64 (Vector) | 11.5 TFLOPS |
| Peak FP32 (Vector) | 23.1 TFLOPS |
| Peak FP32 (Matrix) | 46.1 TFLOPS |
| Peak FP16 (Matrix) | 184.6 TFLOPS |
| Peak BF16 (Matrix) | 92.3 TFLOPS |

## Notes

- MI100 has no dedicated hardware performance-counters guide in the current ROCm docs tree (only MI300/MI200 and MI350 have dedicated counters pages); see [mi300-mi200-performance-counters.md](./mi300-mi200-performance-counters.md) for the closest-generation counter block reference if profiling a CDNA GPU.
- These are AMD CDNA hardware terms (compute unit, shader engine, wavefront, matrix core) and are distinct from NVIDIA SM / warp / tensor core terminology.

## Related

- [cdna-architecture.md](./cdna-architecture.md)
- [gpu-arch-specs.md](./gpu-arch-specs.md)
- [precision-support.md](./precision-support.md)
