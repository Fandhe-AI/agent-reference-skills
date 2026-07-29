# What is ROCm

ROCm is AMD's open-source software stack for GPU computing, providing the drivers, development tools, and APIs that enable GPU programming from low-level kernel development to high-level end-user applications on AMD Instinct, Radeon, and Ryzen AI GPUs.

## Signature / Usage

```bash
# Verify the stack is installed and reachable
rocminfo
amd-smi list
```

## Options / Props

| Component group | Role |
| --- | --- |
| ROCm Core SDK | Foundational components: runtimes, compilers, math libraries, and system utilities required for GPU programming |
| ROCm Extras | Supplementary tools for benchmarking, validation, and deployment management — enhance but are not required for application development |
| TheRock | AMD's open build and release system; replaces the previous monolithic build with a modular workflow for easier component development, integration, and distribution |

## Notes

- Version referenced throughout this scope: **ROCm 7.14.0** (`en/latest` moves forward over time; re-verify with `/update-skill amd-rocm` when following up)
- AMD groups ROCm components into 7 categories: Math and Compute Libraries, Communication Libraries, Media Libraries, Storage, Runtime and Compilers, Profiling and Debugging Tools, Control and Monitoring Tools. Each category has its own page in this scope
- ROCm targets both Linux and Windows; Windows ships as a separate product, **HIP SDK for Windows**, bundling the AMD GPU driver, HIP runtime, and HIP libraries into one installer (see `install-windows.md`)

## Related

- [Core SDK Overview](./core-sdk-overview.md)
- [Install on Linux](./install-linux.md)
- [Install on Windows](./install-windows.md)
