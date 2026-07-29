# GPU Systems and Infrastructure

Deployment and operations guidance for AMD Instinct GPUs at scale: driver installation, cluster management, GPU partitioning, monitoring, virtualization, cloud deployments, and containers.

## Signature / Usage

```bash
# Check the amdgpu kernel driver is loaded on a host
lsmod | grep amdgpu
```

## Options / Props

| Area | Covered by |
| --- | --- |
| AMD GPU Driver (amdgpu) | Kernel driver install; see [install-linux.md](./install-linux.md) |
| Network Operator (Kubernetes) | Cluster-level networking for multi-GPU/multi-node ROCm workloads |
| Monitoring / fleet administration | [control-monitoring-tools.md](./control-monitoring-tools.md) (AMD SMI, ROCm Data Center Tool) |
| Containers | [install-docker-spack.md](./install-docker-spack.md) |

## Notes

- ROCm 7.14.0. This page summarizes the landing-section scope (driver, cluster management, partitioning, monitoring, virtualization, cloud, containers); detailed per-topic steps live on the linked pages within this scope or in the official docs' GPU Systems section
- The `amdgpu` kernel driver is the same component installed via `amdgpu-dkms` in the Linux quick-start flow — infrastructure-scale deployment builds on top of the same driver, not a different one

## Related

- [Install on Linux](./install-linux.md)
- [Control and Monitoring Tools](./control-monitoring-tools.md)
