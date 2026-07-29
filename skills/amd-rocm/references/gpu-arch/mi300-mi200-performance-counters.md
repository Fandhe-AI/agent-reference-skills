# MI300 / MI200 Performance Counters

Hardware performance-counter blocks exposed by AMD Instinct MI300 (CDNA3, gfx942) and MI200 (CDNA2, gfx90a) series accelerators, queried via ROCprofiler-SDK.

## Signature / Usage

```bash
# Query hardware counters on an MI300/MI200 GPU via rocprofv3
rocprofv3 --pmc SQ_WAVES -- ./my_hip_app
```

## Options / Props

| Block | Full name | Measures |
| --- | --- | --- |
| CPF | Command Processor-Fetcher | Cycles the command-processor fetcher is busy/idle/stalled |
| CPC | Command Processor-Compute | Cycles the command-processor compute unit is busy/idle/stalled |
| GRBM | Graphics Register Bus Manager | GPU-wide activity cycles across all subsystems |
| SPI | Shader Processor Input | Workgroup dispatch, wave allocation, resource stalls |
| SQ | Sequencer (per Compute Unit) | Instruction mix, wavefront cycles, LDS operations |
| SQC | Sequencer Cache | L1 instruction cache and scalar L1 data cache statistics |
| TA | Texture Addressing unit | Buffer/flat wavefront processing and stall cycles |
| TD | Texture Data unit | Data-path stalls and wavefront instruction counts |
| TCP | Texture Cache per Pipe (vector L1) | Vector cache accesses, hits, misses, tag conflicts |
| TCA | Texture Cache Arbiter | Arbiter cycles, pending request tracking |
| TCC | Texture Cache per Channel (L2) | L2 cache hits/misses, efficiency, arbiter interactions |

## Notes

- Counters are accessed through ROCprofiler-SDK (`rocprofv3`); see the ROCm profiling guide ("using-rocprofv3") for full CLI usage.
- Block naming (SQ/SPI/TA/TD/TCP/TCC/...) matches AMD's long-standing GCN-derived performance-counter taxonomy, reused across CDNA generations.
- MI350/MI355 (CDNA4) use a distinct, updated set of these same block names — see [mi350-performance-counters.md](./mi350-performance-counters.md).
- These are AMD hardware performance-counter block names and are distinct from NVIDIA Nsight Compute's metric/counter naming (e.g. `sm__`, `l1tex__`, `lts__` prefixes).

## Related

- [mi300-microarchitecture.md](./mi300-microarchitecture.md)
- [mi250-microarchitecture.md](./mi250-microarchitecture.md)
- [mi350-performance-counters.md](./mi350-performance-counters.md)
