# Install on Windows (HIP SDK for Windows)

ROCm's Windows distribution ships as a single product, **HIP SDK for Windows**, bundling the AMD GPU driver, HIP runtime, and HIP libraries into one installer — distinct from the Linux package-manager based install.

## Signature / Usage

```text
HIP SDK for Windows installer (bundles):
  - AMD GPU Driver
  - HIP runtime
  - HIP Libraries
```

## Options / Props

| Doc section | Covers |
| --- | --- |
| Installation | System requirements and setup procedure for the installer |
| Conceptual | ROCm component support in HIP SDK; deployment approaches for different use cases |
| How-to | Using the ROCm Debugger for Windows |
| About | Release notes and versioning |

## Notes

- **ROCm Core SDK 10.1.0 on Windows** — as of the 10.1.0 docs, Core SDK itself installs on Windows (Windows 11 25H2; also WSL2 as a Technical preview) in two forms: pip into a virtual environment (`py -3.12 -m venv .venv`, then `python -m pip install --index-url https://stable.repo.amd.com/rocm/whl-next/ "rocm[libraries,device-all]==10.1.0"`, or `device-gfx<N>` per architecture; verify with `rocm-sdk test` and `hipinfo`), or tarball extracted to `C:\TheRock\build` (`therock-dist-windows-multiarch-10.1.0.tar.gz` from `https://stable.repo.amd.com/rocm/core/tarball/`). For the tarball, set `HIP_DEVICE_LIB_PATH`, `HIP_PATH`, `HIP_PLATFORM`, `LLVM_PATH` and add `C:\TheRock\build\bin;C:\TheRock\build\lib\llvm\bin` to `PATH`
- 10.1.0 Windows prerequisites: remove any existing HIP SDK for Windows installation and other conflicting AMD graphics software first; turn off WDAG (Windows Defender Application Guard) and SAC (Smart App Control); install AMD Software: Adrenalin Edition. Do not replace or copy the ROCm compiler and runtime DLLs to System32, as this can cause conflicts
- HIP 7.16.0 Windows change: `hipExtHostRegisterCoarseGrained` passed to `hipHostRegister` is honored on Windows APUs with unified memory; fine-grain (uncached) is now the default, coarse-grain applies only when requested explicitly
- **HIP SDK for Windows 7.1.1** is the legacy product described below; it is superseded by the Core SDK Windows install as of the 10.1.0 docs. Its version differs from the Core SDK version referenced elsewhere in this scope (ROCm Core SDK 10.1.0); do not assume feature parity by version number alone, and re-check both current versions before relying on this snippet
- Unlike the Linux docs, there is no separate quick-start/uninstall page — installation, requirements, and component support are documented together under one Windows-specific doc set
- Source for the installer packaging is maintained at `ROCm/rocm-install-on-windows` on GitHub
- Component support on Windows is a subset of the full Core SDK; consult the "ROCm component support in HIP SDK" conceptual page for the current per-component list before assuming Linux-only tools are available on Windows

## Related

- [Install on Linux](./install-linux.md)
- [Compatibility and Release History](./compatibility-and-release-history.md)
