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

- ROCm 7.14.0
- `rocminfo` is the quickest way to confirm ROCm sees the GPU after install (see [install-linux.md](./install-linux.md)); `amd-smi` is the successor to the older `rocm-smi` command for day-to-day monitoring/control
- ROCm Data Center Tool targets fleet-scale administration rather than single-machine checks; see [gpu-systems-infra.md](./gpu-systems-infra.md) for cluster-level operations context

## Related

- [Profiling and Debugging Tools](./profiling-debugging-tools.md)
- [Install on Linux](./install-linux.md)
