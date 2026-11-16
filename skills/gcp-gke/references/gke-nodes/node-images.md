---
source: https://docs.cloud.google.com/kubernetes-engine/docs/concepts/node-images
---

# Node images

Describes the node images available for GKE nodes. Autopilot nodes always use Container-Optimized OS with containerd (`cos_containerd`). In Standard you choose the image per cluster or node pool, and can upgrade an existing cluster to a different image.

## Signature / Usage

View logs on a Container-Optimized OS or Ubuntu node (both use `systemd-journald`):

```bash
sudo journalctl -u containerd
```

```bash
sudo journalctl -u kubelet
```

Install packages on Ubuntu nodes (APT; Container-Optimized OS has no package manager). The source tags this block `javascript`; it is shell:

```bash
sudo apt-get update
sudo apt-get install ceph
```

## Options / Props

### Available node images

| OS | Image type | Notes |
|----|------------|-------|
| Container-Optimized OS | `cos_containerd` | Recommended; always used by Autopilot |
| Ubuntu | `ubuntu_containerd` | Use if you need XFS, CephFS or Debian packages |
| Windows Server | `windows_ltsc_containerd` | Maps to Windows Server 2022 and 2019 LTSC; select 2022 with the gcloud flag `windows-os-version` |

### Storage driver support

| Volume type | Container-Optimized OS | Ubuntu |
|-------------|------------------------|--------|
| Compute Engine Persistent Disk (EXT4 or XFS) | Fully tested/supported (XFS in cos-85 and later only) | Fully tested/supported |
| NFSv3 / NFSv4 | Fully tested/supported | Fully tested/supported |
| CephFS | No | Limited testing (install the `ceph` client, preferably via DaemonSet) |
| Cinder, Fibre Channel, iSCSI, RBD | No | No |
| Flocker | Unsupported | Unsupported |

### Container-Optimized OS file system

| Path | Properties |
|------|------------|
| `/` | read-only, executable (integrity verified at boot) |
| `/home`, `/var` | writable, non-executable, stateful (from `/mnt/stateful_partition`) |
| `/var/lib/google`, `/var/lib/docker`, `/var/lib/toolbox` | writable, executable, stateful |
| `/var/lib/cloud` | writable, executable, stateless (tmpfs) |
| `/etc` | writable, executable, stateless (tmpfs); capture desired state in `cloud-init` |
| `/tmp` | writable, non-executable, stateless (tmpfs) |
| `/mnt/disks` | writable, executable, stateless (tmpfs); mount persistent disks here |

### Node image source projects

| Images | Project |
|--------|---------|
| Container-Optimized OS | `gke-node-images` |
| Ubuntu, GKE earlier than 1.36 | `ubuntu-os-gke-cloud` |
| Ubuntu, GKE 1.36 and later | `gke-ubuntu-node-images` |
| Windows Server | `gke-windows-node-images` |

`ubuntu-os-gke-cloud-private` and `ubuntu-os-gke-cloud-devel` are reserved for the GKE team. The list is subject to change.

## Notes

- Container-Optimized OS automatic update is disabled on GKE nodes; GKE node auto-upgrade is used instead.
- Boot disk modifications do not persist across node re-creation (upgrade, auto-repair, autoscaling, enabling GKE Sandbox / intranode visibility / shielded nodes). Use a DaemonSet to persist changes. Do not modify kernel or container runtime; Autopilot disallows node software modification.
- A single cluster can have multiple Windows Server node pools with different versions, but each pool uses one version.
- Time sync uses an internal NTP server (smeared like Google Public NTP) with the RTC as backup; `/dev/random` and `/dev/urandom` are fed by Virtio RNG.
- GKE publishes a weekly-ish JSON mapping of GKE patch versions to COS image versions: https://www.gstatic.com/gke-image-maps/gke-to-cos.json (see `creation_time`).
- Autopilot does not allow direct node access.
- Source: https://docs.cloud.google.com/kubernetes-engine/docs/concepts/node-images (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [node-pools.md](./node-pools.md)
- [node-pools-how-to.md](./node-pools-how-to.md)
- [windows-server-gke.md](./windows-server-gke.md)
