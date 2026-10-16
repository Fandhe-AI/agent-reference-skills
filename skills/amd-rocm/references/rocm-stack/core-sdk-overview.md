# Core SDK Overview

The ROCm Core SDK is the foundational layer of the stack: math and compute libraries, communication primitives, the HIP runtime, and profiling/debugging tools needed to build and run GPU applications on AMD hardware.

## Signature / Usage

```bash
# ROCm Base (runtime only; official quick install), all supported GPUs
sudo apt install amdrocm10.1

# or per GPU architecture, e.g. CDNA3
sudo apt install amdrocm10.1-gfx942

# full Core SDK (runtimes, compilers, dev tools): ROCm Full Suite
sudo apt install amdrocm-core-sdk10.1

# compilers / headers only: ROCm Developer Essentials
sudo apt install amdrocm-core-dev10.1
```

## Options / Props

| Area | Covered by |
| --- | --- |
| Math and Compute Libraries | [math-compute-libraries.md](./math-compute-libraries.md) |
| Communication Libraries | [communication-libraries.md](./communication-libraries.md) |
| Runtime and Compilers | [runtime-and-compilers.md](./runtime-and-compilers.md) |
| Profiling and Debugging Tools | [profiling-debugging-tools.md](./profiling-debugging-tools.md) |
| Control and Monitoring Tools | [control-monitoring-tools.md](./control-monitoring-tools.md) |
| Media and vision libraries / Storage | [media-storage-libraries.md](./media-storage-libraries.md) |
| Threading libraries | [threading-libraries.md](./threading-libraries.md) |

## Notes

- Core SDK (ROCm Core SDK 10.1.0) is distinguished from **ROCm Extras**, which are supplementary benchmarking/validation/deployment tools not required to build applications. ROCm Extras currently list ROCm Validation Suite (RVS, with TransferBench bundled and installed with it) and ROCm Optiq (a visualization/analysis tool for ROCm Systems Profiler and ROCm Compute Profiler data); "More coming soon"
- The `rocm` meta-package of the legacy stream is replaced by `amdrocm10.1` (all supported GPUs) or `amdrocm10.1-<gfx>` (one architecture); `amdrocm-core-sdk10.1` is the "ROCm Full Suite" meta package. See [install-linux.md](./install-linux.md) for the complete repository-setup sequence
- Packages are consolidated compared with the legacy stream, for example `amdrocm-blas` = rocBLAS + hipBLAS + hipBLASLt + hipSPARSELt. The transition guide (`about/transition-guide-TheRock`) tabulates every `amdrocm-*` package against its legacy packages

## Related

- [What is ROCm](./what-is-rocm.md)
- [Install on Linux](./install-linux.md)
