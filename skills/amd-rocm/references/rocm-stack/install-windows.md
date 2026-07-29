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

- **HIP SDK for Windows 7.1.1** — at time of writing this differs from the Linux Core SDK version referenced elsewhere in this scope (ROCm 7.14.0); do not assume feature parity by version number alone, and re-check both current versions before relying on this snippet
- Unlike the Linux docs, there is no separate quick-start/uninstall page — installation, requirements, and component support are documented together under one Windows-specific doc set
- Source for the installer packaging is maintained at `ROCm/rocm-install-on-windows` on GitHub
- Component support on Windows is a subset of the full Core SDK; consult the "ROCm component support in HIP SDK" conceptual page for the current per-component list before assuming Linux-only tools are available on Windows

## Related

- [Install on Linux](./install-linux.md)
- [Compatibility and Release History](./compatibility-and-release-history.md)
