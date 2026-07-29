# Compatibility and Release History

The GPU, OS, and kernel compatibility matrix for ROCm, and where to check the current release history.

## Signature / Usage

```bash
# Check installed GPU/system info to compare against the compatibility matrix
rocminfo
```

## Options / Props

| Axis | Examples (ROCm 7.14.0 matrix) |
| --- | --- |
| AMD Instinct accelerators | MI355X, MI350X, MI325X, MI300X, MI250X, MI210, MI100 |
| AMD Radeon graphics | AI PRO R9000/R9600D series, RX 9000/7000 series, PRO W-series |
| AMD Ryzen APUs | AI Max, AI Pro, and standard Ryzen processors with integrated graphics |
| Linux distributions | Ubuntu 26.04/24.04/22.04, RHEL 10.2/9.8/9.6/8.10, Debian 13/12, Oracle Linux, Rocky Linux, SLES |
| Windows | Windows 11 25H2, for select GPU families only |
| WSL2 | Supported for specific hardware |

## Notes

- ROCm 7.14.0. Kernel version requirements vary by distribution (from 4.18.0 on RHEL 8.10 up to 7.0 on Ubuntu 26.04 in the matrix observed for this release)
- The matrix is organized as per-GPU-series tables listing supported Ubuntu/RHEL versions and driver requirements — always re-check the live compatibility matrix and release history on the official docs before pinning a deployment, since supported OS/kernel combinations change release to release
- Windows compatibility here refers to the driver/GPU support matrix for the Core SDK; HIP SDK for Windows itself is versioned separately (see [install-windows.md](./install-windows.md))

## Related

- [Install on Linux](./install-linux.md)
- [Install on Windows](./install-windows.md)
