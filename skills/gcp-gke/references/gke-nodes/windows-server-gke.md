---
source: https://docs.cloud.google.com/kubernetes-engine/docs/concepts/windows-server-gke
---

# Windows Server containers in GKE

Overview of Windows Server containers in GKE Standard mode. Windows Server node images and containers are not available in Autopilot. Linux and Windows containers run side by side in one cluster; Microsoft Hyper-V containers are not supported.

## Signature / Usage

The source has no code. Snippet taken from https://docs.cloud.google.com/kubernetes-engine/docs/how-to/node-pools: list the node pools of a cluster (Windows and Linux pools appear together).

```bash
gcloud container node-pools list --cluster CLUSTER_NAME \
    --location=CONTROL_PLANE_LOCATION
```

## Options / Props

### Storage requirements

| Topic | Requirement |
|-------|-------------|
| StorageClass | Create a `StorageClass` and reference it in `storageClassName` of the `PersistentVolumeClaim`; `ext4` is not supported on Windows |
| Compute Engine persistent disk | Use NTFS as the file storage type |
| CSI | The Compute Engine persistent disk CSI driver is available for Windows Server containers |

### Unsupported features on Windows Server node pools

| Area | Unsupported |
|------|-------------|
| Compute and node | Autopilot, node auto-provisioning, machine series above the third generation, Z3 / Z4D / Z4M, image streaming, alpha clusters, GPUs and TPUs |
| Networking | Max Pods per node above 110, intranode visibility, Node Local DNS cache, network policy logging, IP masquerade agent (nodes still masquerade external traffic), IPv4/IPv6 dual-stack, private use of Class E or public IPs, full GKE Dataplane V2 (network policy enforcement only) |
| Security | Confidential GKE Nodes, Linux-specific features (Seccomp, AppArmor, SELinux) |
| Kubernetes | Host namespaces (`hostNetwork`, `hostPID`, `hostIPC`), `service.spec.sessionAffinity`, features in the Kubernetes "Windows containers" compatibility and limitations list |
| Storage | Default fstype ext4 (balanced persistent disk), Filestore CSI driver, Local SSD with NVMe for ephemeral storage |
| Observability | Pod labels missing from workload logs when the kubelet read-only port is disabled |
| Microsoft | Hyper-V isolation |
| Misc | Docker-based Cloud SQL Auth proxy; a cluster cannot have only Windows node pools (at least one Linux pool required) |

## Notes

- Node images use Windows Server LTSC; one Windows Server version per node pool, multiple versions per cluster.
- Security: Microsoft does not intend to service Windows container escape vulnerabilities, so Windows nodes are not recommended for hostile multi-tenancy or differing risk levels; use separate clusters and projects per application or team.
- The source also lists blogs, partner solutions and Active Directory integration guides (auto-join, ASP.NET Windows Authentication).
- Source: https://docs.cloud.google.com/kubernetes-engine/docs/concepts/windows-server-gke (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [node-images.md](./node-images.md)
- [node-pools.md](./node-pools.md)
- [arm-on-gke.md](./arm-on-gke.md)
