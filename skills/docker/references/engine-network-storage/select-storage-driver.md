---
source: https://docs.docker.com/engine/storage/drivers/select-storage-driver/
---

# Select a storage driver

Docker supports several storage drivers through a pluggable architecture. Use the driver with the best overall performance and stability in the most usual scenarios.

## Signature / Usage

```console
$ docker info

Containers: 0
Images: 0
Storage Driver: overlay2
 Backing Filesystem: xfs
<...>
```

## Options / Props

Storage backends on Linux:

| Backend | Description |
| --- | --- |
| `containerd` (snapshotters) | Default for Docker Engine 29.0 and later. Supports multi-platform images and attestations. |
| `overlay2` | Classic storage driver. Most widely compatible across supported Linux distributions, no extra configuration. |
| `fuse-overlayfs` | Preferred only for Rootless Docker on hosts without rootless `overlay2` support. Not needed since Linux kernel 5.11. |
| `btrfs`, `zfs` | Advanced options such as snapshots, but require more maintenance and setup; rely on the backing filesystem being configured correctly. |
| `vfs` | For testing and where no copy-on-write filesystem can be used. Poor performance, not recommended for production. |

Supported backing filesystems (the filesystem holding `/var/lib/docker/`):

| Storage driver | Supported backing filesystems |
| --- | --- |
| `overlay2` | `xfs` with ftype=1, `ext4`, `btrfs`, (and more) |
| `fuse-overlayfs` | any filesystem |
| `btrfs` | `btrfs` |
| `zfs` | `zfs` |
| `vfs` | any filesystem |

Classic driver per Linux distribution (default / alternatives):

| Distribution | Default classic driver | Alternatives |
| --- | --- | --- |
| Ubuntu | `overlay2` | `zfs`, `vfs` |
| Debian | `overlay2` | `vfs` |
| CentOS | `overlay2` | `zfs`, `vfs` |
| Fedora | `overlay2` | `zfs`, `vfs` |
| SLES 15 | `overlay2` | `vfs` |
| RHEL | `overlay2` | `vfs` |

## Notes

- If you upgraded from an earlier version, the daemon continues to use classic drivers; migrate via the containerd image store page.
- Docker has a prioritized list used when no driver is configured (see `daemon/graphdriver/driver_linux.go` in the Engine source at docker-v29.8.2).
- This page covers Linux. For a Windows host daemon the only supported storage driver is `windowsfilter`.
- Modifying the storage driver in the daemon configuration isn't supported on Docker Desktop (it uses the containerd image store by default, 4.34+ for clean installs); the distribution table doesn't apply to rootless mode.
- Recommended configurations are known to work for many users; others run at your own risk with lower issue priority.
- `overlay2` works at file level (memory efficient, but the writable layer can grow in write-heavy workloads); block-level `btrfs` / `zfs` do better for write-heavy workloads (though not as well as volumes), need lots of memory; `zfs` suits high-density workloads such as PaaS. `overlay2` generally provides the highest stability.
- With SAN, NAS, hardware RAID or other shared storage, Docker doesn't closely integrate; follow existing best practices for the underlying filesystem or volume manager.
- Changing the storage driver makes existing images and containers inaccessible (reverting makes the old ones accessible again, but those created with the new driver are then inaccessible).

## Related

- [Storage drivers](./storage-drivers.md)
- [OverlayFS storage driver](./overlayfs-driver.md)
- [containerd image store](./containerd-image-store.md)
