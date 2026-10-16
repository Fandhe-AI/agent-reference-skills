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

- ROCm Core SDK 10.1.0. SR-IOV virtualization requires the AMD GPU Virtualization Driver (GIM) 9.3.0.K. Linux driver install docs are pinned at amdgpu-docs 31.60.0 (AMD Instinct Data Center GPU Documentation). GPU partitioning support is unchanged in 10.1.0
- This page summarizes the landing-section scope (driver, cluster management, partitioning, monitoring, virtualization, cloud, containers); detailed per-topic steps live on the linked pages within this scope or in the official docs' GPU Systems section
- The `amdgpu` kernel driver is the same component (`amdgpu-dkms`) for infrastructure-scale deployment; in the 10.1.0 package-manager install flow the driver is installed from the AMD GPU Driver docs rather than from the ROCm install page itself

## Related

- [Install on Linux](./install-linux.md)
- [Control and Monitoring Tools](./control-monitoring-tools.md)
