# LXC Containers

Proxmox VE manages Linux Containers (LXC) via the `pct` CLI and the web UI. Containers share the host kernel and are lighter than VMs. Unprivileged containers are the recommended default.

## Signature / Usage

```bash
# Download a container template
pveam download local debian-12-standard_12.7-1_amd64.tar.zst

# Create a container from a template
pct create <ctid> local:vztmpl/debian-12-standard_12.7-1_amd64.tar.zst \
  --hostname myct --memory 512 --rootfs local-lvm:8

# Start / stop / enter shell
pct start <ctid>
pct stop <ctid>
pct enter <ctid>

# Resize root disk
pct resize <ctid> rootfs +5G

# Restore from backup
pct restore <ctid> /path/to/backup.tar.zst
```

## Options / Props

### pct create key options

| Option | Description |
|--------|-------------|
| `--hostname` | Container hostname |
| `--memory` | RAM in MiB |
| `--swap` | Swap in MiB |
| `--rootfs` | Root disk: `<storage>:<size>` |
| `--net0` | Network: `name=eth0,bridge=vmbr0,ip=dhcp` |
| `--cores` | Visible CPU cores |
| `--cpulimit` | Max CPU time (fractional, e.g. `0.5`) |
| `--unprivileged` | Run as unprivileged (default: 1) |
| `--features` | Enable extra kernel features: `nesting=1`, `keyctl=1` |

### Mount points

| Type | Description |
|------|-------------|
| Storage-backed | Managed by PVE; supports snapshots and resize |
| Bind mount | Direct host path access; avoid system directories |
| Device mount | Raw block device; rarely recommended |

## Notes

- **Unprivileged containers** (default) map container root UID to an unprivileged host UID — container escapes affect only unprivileged users
- **Privileged containers** rely on AppArmor and seccomp; use only in trusted environments
- Bind mounts bypass Proxmox storage management and do not support snapshots or backups via `vzdump`
- Enable `nesting=1` feature to run Docker or systemd inside a container
- Templates are tar archives managed by `pveam`; available from official Proxmox template repositories
- Resource limits use Linux cgroupv2 in modern Proxmox versions

## Related

- [storage.md](./storage.md)
- [backup-restore.md](./backup-restore.md)
