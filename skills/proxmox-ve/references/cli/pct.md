# pct

Proxmox Container Toolkit. Manages LXC containers on a Proxmox VE node, abstracting complex LXC configuration into a unified CLI.

## Signature / Usage

```bash
pct <COMMAND> [OPTIONS]
pct help [<COMMAND>]
```

## Subcommands

| Subcommand | Description |
|------------|-------------|
| `create <vmid> <ostemplate>` | Create a new container from a template |
| `clone <vmid> <newid>` | Clone an existing container |
| `destroy <vmid>` | Remove a container permanently |
| `start <vmid>` | Start a container |
| `stop <vmid>` | Force stop a container |
| `shutdown <vmid>` | Gracefully shut down a container |
| `reboot <vmid>` | Reboot a container |
| `suspend <vmid>` | Suspend a container |
| `resume <vmid>` | Resume a suspended container |
| `status <vmid>` | Show container state |
| `config <vmid>` | Show container configuration |
| `set <vmid>` | Modify container settings |
| `pending <vmid>` | Show current and pending config values |
| `list` | List all containers on this node |
| `console <vmid>` | Open interactive terminal |
| `enter <vmid>` | Start a shell inside the container |
| `exec <vmid> -- <command>` | Run a command inside the container |
| `push <vmid> <file> <dest>` | Copy file into container |
| `pull <vmid> <file> <dest>` | Copy file out of container |
| `snapshot <vmid> <snapname>` | Create a snapshot |
| `delsnapshot <vmid> <snapname>` | Delete a snapshot |
| `listsnapshot <vmid>` | List snapshots |
| `rollback <vmid> <snapname>` | Restore to a snapshot |
| `migrate <vmid> <target>` | Migrate container to another node |
| `resize <vmid> <disk> <size>` | Resize a mount point |
| `move-volume <vmid> <volume>` | Move volume to different storage |
| `mount <vmid>` | Mount container filesystem |
| `unmount <vmid>` | Unmount container filesystem |
| `df <vmid>` | Show disk usage |
| `fsck <vmid>` | Run filesystem check |
| `fstrim <vmid>` | Run fstrim inside container |
| `template <vmid>` | Convert container to a template |
| `cpusets` | Show CPU assignments |

## Options / Props

Key options for `pct create`:

| Name | Type | Description |
|------|------|-------------|
| `--ostemplate` | string | OS template volume (e.g. `local:vztmpl/ubuntu-22.04-standard_22.04-1_amd64.tar.zst`) |
| `--hostname` | string | Container hostname |
| `--storage` | string | Default storage for root volume |
| `--rootfs` | string | Root filesystem volume and size (e.g. `local-lvm:8`) |
| `--memory` | integer | RAM in MB (default: 512) |
| `--swap` | integer | Swap in MB (default: 512) |
| `--cores` | integer | Number of CPU cores |
| `--cpulimit` | number | CPU usage limit (0 = unlimited) |
| `--net[n]` | string | Network interface config (name, bridge, IP, GW) |
| `--nameserver` | string | DNS nameserver |
| `--searchdomain` | string | DNS search domain |
| `--mp[n]` | string | Additional mount points (up to 256) |
| `--unprivileged` | boolean | Run as unprivileged container (recommended) |
| `--password` | string | Root password |
| `--ssh-public-keys` | string | SSH public keys for root |
| `--ostype` | enum | OS type (e.g. `ubuntu`, `debian`, `alpine`) |
| `--onboot` | boolean | Start on host boot |
| `--start` | boolean | Start after creation |
| `--pool` | string | Resource pool assignment |
| `--force` | boolean | Overwrite existing container |

## Notes

- `--unprivileged` is recommended for new containers; it maps container root to an unprivileged host user.
- `pct enter` requires the container to be running; use `pct mount` + chroot for offline access.
- Snapshots require storage that supports them (e.g. ZFS, Ceph, or qcow2-backed storage).
- `pct restore` is an alias for `pct create` when restoring from a vzdump backup archive.

## Related

- [qm.md](./qm.md)
- [pveam.md](./pveam.md)
- [vzdump.md](./vzdump.md)
- [pvesm.md](./pvesm.md)
