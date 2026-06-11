# Storage

Proxmox VE storage configuration lives in `/etc/pve/storage.cfg` and is distributed automatically to all cluster nodes. Backends are divided into file-level (flexible content types) and block-level (raw images only).

## Signature / Usage

```bash
# Add a storage backend via CLI
pvesm add <type> <storage-id> [options]

# Example: add a local directory storage
pvesm add dir local-data --path /mnt/data --content images,backup

# List configured storages
pvesm status
```

## Options / Props

### Storage backend comparison

| Backend | Type | Shared | Snapshots | Typical use |
|---------|------|--------|-----------|-------------|
| `dir` | File | No | qcow2 only | Local directory |
| `nfs` | File | Yes | qcow2 only | Network file share |
| `cifs` | File | Yes | qcow2 only | Windows/SMB share |
| `zfspool` | File+Block | No | Native | Local ZFS pool |
| `lvm` | Block | Possible (iSCSI) | Volume chains | iSCSI / local block |
| `lvmthin` | Block | No | Native | Thin-provisioned local |
| `rbd` | Block | Yes | Native | Ceph distributed storage |
| `iscsi` | Block | Yes | No | iSCSI target |
| `cephfs` | File | Yes | No | Ceph filesystem |

### Common storage.cfg properties

| Property | Description |
|----------|-------------|
| `path` | Filesystem path (dir backend) |
| `content` | Allowed content types: `images`, `rootdir`, `backup`, `iso`, `vztmpl`, `snippets` |
| `nodes` | Restrict storage to specific cluster nodes |
| `format` | Default disk image format: `raw`, `qcow2`, `vmdk` |
| `shared` | Mark storage as shared (skips data copy on migration) |

## Notes

- Thin provisioning allows volumes larger than available space; monitor utilization carefully to prevent data corruption
- Shared storage (NFS, Ceph RBD, etc.) enables live VM migration without copying disk data
- Snapshot support depends on backend: native on ZFS/LVM-thin/RBD; qcow2-based on file backends
- Never reuse storage configuration (especially locking storage) across multiple independent clusters

## Related

- [vm-qemu.md](./vm-qemu.md)
- [container-lxc.md](./container-lxc.md)
- [ceph.md](./ceph.md)
- [backup-restore.md](./backup-restore.md)
