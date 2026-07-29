# MI350 / MI355 Performance Counters

Hardware performance-counter blocks exposed by AMD Instinct MI350/MI355 series accelerators (CDNA4, gfx950), queried via ROCprofiler-SDK or ROCm Compute Profiler.

## Signature / Usage

```bash
# Query hardware counters on an MI350/MI355 GPU via rocprofv3
rocprofv3 --pmc SQ_INSTS_VALU -- ./my_hip_app
```

## Options / Props

| Block | Full name | Measures |
| --- | --- | --- |
| CPC | Command Processor-Packet Processor | Dispatch allocation, SYNC FIFO status, ADC operations |
| SPI | Shader Pipe Interpolators | Wave launches, thread-group activity, queue occupancy across 4 pipes |
| SQ | Compute-unit sequencer | Instruction execution (VALU, LDS, FLOPS), memory FIFO saturation |
| TA | Texture Addressing unit | Buffer/flat read wavefronts processed for LDS returns |
| TD | Texture Data unit | Write acknowledgments and data traffic to shader processors |
| TCP | Texture Cache per Pipe | Cache stalls, translation misses, latency measurements |
| TCC | Texture Cache per Channel | Read/write sector counts, EA requests, DRAM/GMI traffic |

## Notes

- Counters are queried via ROCprofiler-SDK (`rocprofv3`) or ROCm Compute Profiler during workload profiling.
- Block names overlap with the MI300/MI200 set (see [mi300-mi200-performance-counters.md](./mi300-mi200-performance-counters.md)) but the per-block measured events differ for CDNA4 (e.g. CPC gains SYNC FIFO/ADC tracking, SQ gains explicit FLOPS counting).
- These are AMD hardware performance-counter block names and are distinct from NVIDIA Nsight Compute's metric/counter naming.

## Related

- [mi300-mi200-performance-counters.md](./mi300-mi200-performance-counters.md)
- [gpu-arch-specs.md](./gpu-arch-specs.md)
