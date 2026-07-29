# Core SDK Overview

The ROCm Core SDK is the foundational layer of the stack: math and compute libraries, communication primitives, the HIP runtime, and profiling/debugging tools needed to build and run GPU applications on AMD hardware.

## Signature / Usage

```bash
# Core SDK install (Ubuntu, package-manager based)
sudo apt install rocm
```

## Options / Props

| Area | Covered by |
| --- | --- |
| Math and Compute Libraries | [math-compute-libraries.md](./math-compute-libraries.md) |
| Communication Libraries | [communication-libraries.md](./communication-libraries.md) |
| Runtime and Compilers | [runtime-and-compilers.md](./runtime-and-compilers.md) |
| Profiling and Debugging Tools | [profiling-debugging-tools.md](./profiling-debugging-tools.md) |
| Control and Monitoring Tools | [control-monitoring-tools.md](./control-monitoring-tools.md) |
| Media Libraries / Storage | [media-storage-libraries.md](./media-storage-libraries.md) |

## Notes

- Core SDK (ROCm 7.14.0) is distinguished from **ROCm Extras**, which are supplementary benchmarking/validation/deployment tools not required to build applications
- Installing the `rocm` meta-package via the platform package manager pulls in the full Core SDK; see [install-linux.md](./install-linux.md) for the complete repository-setup sequence

## Related

- [What is ROCm](./what-is-rocm.md)
- [Install on Linux](./install-linux.md)
