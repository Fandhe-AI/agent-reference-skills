# Compatibility and Release History

The GPU, OS, and kernel compatibility matrix for ROCm, and where to check the current release history.

## Signature / Usage

```bash
# Check installed GPU/system info to compare against the compatibility matrix
rocminfo
```

## Options / Props

| Axis | Examples (ROCm Core SDK 10.1.0 matrix) |
| --- | --- |
| AMD Instinct accelerators | MI355X, MI350X, MI350P, MI325X, MI300X, MI300A, MI250X, MI250, MI210, MI100 (MI350P is in the 10.1.0 matrix) |
| AMD Radeon graphics | AI PRO R9700S / R9700 / R9600D / R9600 (R9600 new in 10.1.0), RX 9000/7000 series, PRO W-series |
| AMD Ryzen APUs | AI Max, AI Pro, and standard Ryzen processors with integrated graphics |
| Linux distributions | Ubuntu 26.04.1 (GA 7.0) / 24.04.5 (GA 6.8, HWE 7.0) / 22.04.5, RHEL 10.2 / 10.0 / 9.8 / 9.6 / 9.4 / 8.10, Debian 13 / 12, Oracle Linux 10 / 9 / 8, Rocky Linux 9, SLES 16.0 / 15.7 |
| Windows | Windows 11 25H2, for select GPU families only |
| WSL2 | Ubuntu 26.04.1 / 24.04.5 / 22.04.5 for specific hardware; Technical preview in TheRock artifacts |

| Release | Date |
| --- | --- |
| 10.1.0 | 2026-10-05 |
| 10.0.0 | 2026-08-26 |
| 7.14.1 | 2026-09-02 |
| 7.14.0 | 2026-07-15 |
| 7.2.4 | 2026-05-29 |

## Notes

- ROCm Core SDK 10.1.0 (dates above are as listed on the official release history page; the 7.14.1 date is later than 10.0.0 as published). Kernel version requirements vary by distribution (from 4.18.0-553 on RHEL 8.10 up to 7.0 on Ubuntu 26.04.1 / 24.04.5 HWE in the matrix observed for this release)
- 10.1.0 added support for Radeon AI PRO R9600, Ubuntu 26.04.1 (kernel 7.0 GA) and Ubuntu 24.04.5 (kernel 6.8 GA for Instinct, 7.0 HWE for Radeon and Ryzen), replacing Ubuntu 26.04 and 24.04.4 support
- GPU virtualization: supported SR-IOV configurations require the AMD GPU Virtualization Driver (GIM) 9.3.0.K. GPU partitioning support is unchanged in 10.1.0
- The matrix is organized as per-GPU-series tables listing supported Ubuntu/RHEL versions and driver requirements — always re-check the live compatibility matrix and release history on the official docs before pinning a deployment, since supported OS/kernel combinations change release to release
- Windows compatibility here refers to the driver/GPU support matrix for the Core SDK; HIP SDK for Windows itself is versioned separately (see [install-windows.md](./install-windows.md))

## Related

- [Install on Linux](./install-linux.md)
- [Install on Windows](./install-windows.md)
