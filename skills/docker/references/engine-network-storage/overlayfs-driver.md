---
source: https://docs.docker.com/engine/storage/drivers/overlayfs-driver/
---

# OverlayFS storage driver

OverlayFS is a union filesystem. The Linux kernel driver is called `OverlayFS`; the Docker storage driver is `overlay2`. This page covers the classic `overlay2` driver, not the `overlayfs` snapshotter of the containerd image store (and `fuse-overlayfs` is covered by rootless mode docs).

## Signature / Usage

`/etc/docker/daemon.json` (invalid JSON prevents Docker from starting):

```json
{
  "storage-driver": "overlay2"
}
```

Procedure: stop the Docker daemon, back up (`cp -au /var/lib/docker /var/lib/docker.bk`), optionally mount a separate backing filesystem at `/var/lib/docker` (add to `/etc/fstab`), edit `daemon.json`, start the Docker daemon, verify with `docker info`:

```console
$ docker info

Containers: 0
Images: 0
Storage Driver: overlay2
 Backing Filesystem: xfs
 Supports d_type: true
 Native Overlay Diff: true
<...>
```

## Notes

- Prerequisites: Linux kernel 4.0+ (or RHEL/CentOS kernel 3.10.0-514+); `xfs` backing filesystem only with `d_type=true` (check `xfs_info` for `ftype=1`; format with `-n ftype=1`). Changing the driver makes existing containers and images inaccessible: `docker save` or push images first.
- OverlayFS layers two directories (`lowerdir`, `upperdir`) and exposes the union through `merged`; `workdir` is internal. Image layers are `lowerdir` (read-only), the container layer is `upperdir`; the container layer obscures same-named files in the image. `overlay2` natively supports up to 128 lower layers (faster `docker build` / `docker commit`, fewer inodes).
- On disk under `/var/lib/docker/overlay2`: per-layer directories with `diff` (contents), `link` (short ID), `lower` (parent), `merged`, `work`; the `l` directory holds shortened-identifier symlinks (to avoid the `mount` argument page-size limit). Don't directly manipulate files in `/var/lib/docker/`.
- Reading: a file not in `upperdir` is read from `lowerdir` (little overhead); a file in both is read from `upperdir`.
- First write to an existing file triggers `copy_up` of the entire file (file level, not block level), then writes go to the upper copy. Only the first write incurs it; many layers can slow file lookups.
- Deleting a file creates a whiteout file in `upperdir`; deleting a directory creates an opaque directory. Renaming a directory is allowed only when source and destination are both on the top layer, otherwise `EXDEV` (applications must fall back to copy and unlink).
- Performance: supports page cache sharing (efficient memory use, good for high-density PaaS). Use fast storage (SSD) and volumes for write-heavy workloads (volumes bypass the driver's CoW overhead).
- Compatibility limits: only a subset of POSIX. `open(2)` after copy-up can give two descriptors referring to different files (workaround: `touch` the files; `yum` is affected unless `yum-plugin-ovl` is installed, otherwise `touch /var/lib/rpm/*` before `yum install` on RHEL/CentOS prior to 6.8 / 7.2). `rename(2)` isn't fully supported: detect failure and fall back to copy and unlink.
- The page also documents the legacy `overlay` driver on-disk layout (`/var/lib/docker/overlay/`, `lower-id`, `upper`, `work`).

- Adapted: sudo commands rephrased as prerequisites (stopping/starting the daemon requires root).

## Related

- [Select a storage driver](./select-storage-driver.md)
- [Storage drivers](./storage-drivers.md)
- [containerd image store](./containerd-image-store.md)
