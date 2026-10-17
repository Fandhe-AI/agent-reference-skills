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

- Version referenced throughout this scope: **ROCm Core SDK 10.1.0** (released 2026-10-05; `en/latest` moves forward over time; re-verify with `/update-skill amd-rocm` when following up)
- The version number jumps: 7.14.0 (2026-07-15, first TheRock-based production release) -> 7.14.1 (2026-09-02) -> 10.0.0 (2026-08-26) -> 10.1.0 (2026-10-05); dates are as listed on the official release history page
- The TheRock-based Core SDK installs to `/opt/rocm/core-10.1` (legacy stream: `/opt/rocm-7.2/`); its packages are prefixed `amdrocm-*`, and ROCm Extras install to `/opt/rocm/extras-10/`. The `amdrocm` meta package configures `update-alternatives` and provides backward-compatible symlinks for `/opt/rocm/bin`, `/opt/rocm/lib`, and other `/opt/rocm/` directories
- AMD groups ROCm components into 8 categories: Math and Compute Libraries, Communication Libraries, Runtime and Compilers, Profiling and Debugging Tools, Control and Monitoring Tools, Media and Vision Libraries (renamed from "Media Libraries"), Storage Libraries, Threading Libraries (new, hipThreads). Each category has its own page in this scope
- ROCm targets both Linux and Windows; the legacy Windows product is **HIP SDK for Windows**, bundling the AMD GPU driver, HIP runtime, and HIP libraries into one installer. As of the 10.1.0 docs, ROCm Core SDK itself also installs on Windows (see `install-windows.md`)

## Related

- [Core SDK Overview](./core-sdk-overview.md)
- [Threading Libraries](./threading-libraries.md)
- [Install on Linux](./install-linux.md)
- [Install on Windows](./install-windows.md)
