# Control and Monitoring Tools

System management and health-verification tools for AMD GPUs — checking installation, reading GPU state, and administering fleets of GPUs.

## Signature / Usage

```bash
# Report installed GPU/system information
rocminfo

# Query and control GPU settings
amd-smi list
amd-smi metric
```

## Options / Props

| Tool | Role |
| --- | --- |
| AMD SMI | System management interface to control AMD GPU settings and monitor performance |
| ROCm Data Center Tool | Simplifies administration and addresses key infrastructure challenges in AMD GPUs |
| rocminfo | Reports system information |

## Notes

- ROCm Core SDK 10.1.0 (AMD SMI 27.1.0, ROCm Data Center Tool 1.3.1, rocminfo 1.0.0)
- Breaking change in 10.1.0: ROCm SMI (`rocm-smi-lib`) is deprecated and no longer built or installed as part of the standard ROCm/TheRock build; use the AMD SMI library and its `amd-smi` CLI. The package `amdrocm-amdsmi` replaces the legacy `amd-smi-lib` and `rocm-smi-lib` packages
- AMD SMI 27.1.0 adds a WSL2 backend (Technical preview): discovery and monitoring only, no management/configuration actions; CPU/ESMI, NIC, switch, fabric, ECC, partition queries and per-process GPU usage are reported as unsupported
- Known issue (10.1.0): `amd-smi event` might stop responding indefinitely on WSL (the event subcommand is not supported there); terminate with `Ctrl+C` (twice) or `kill -9 <pid>`
- 10.0.0 had AMD SMI API/ABI breaking changes: library major version 27 (SONAME `libamd_smi.so.27`, consumers linked against `libamd_smi.so.26` must relink) and `amdsmi_gpu_metrics_t` field widening from `uint32_t` to `uint64_t`
- `rocminfo` is the quickest way to confirm ROCm sees the GPU after install (see [install-linux.md](./install-linux.md)); `amd-smi` is the successor to the older `rocm-smi` command for day-to-day monitoring/control
- ROCm Data Center Tool targets fleet-scale administration rather than single-machine checks; see [gpu-systems-infra.md](./gpu-systems-infra.md) for cluster-level operations context

## Related

- [Profiling and Debugging Tools](./profiling-debugging-tools.md)
- [Install on Linux](./install-linux.md)
