# pvesm

Proxmox VE Storage Manager. Manages storage pools and volumes across the cluster.

## Signature / Usage

```bash
pvesm <COMMAND> [OPTIONS]
pvesm help [<COMMAND>]
```

## Subcommands

| Subcommand | Description |
|------------|-------------|
| `add <type> <storageid>` | Add a new storage pool |
| `set <storageid>` | Update storage configuration |
| `remove <storageid>` | Remove storage config (does not delete data) |
| `list <storageid>` | List storage contents |
| `status` | Show status of all datastores |
| `path <volume>` | Print filesystem path for a volume |
| `alloc <storageid> <vmid> <filename> <size>` | Allocate a disk image |
| `free <volume>` | Delete a volume |
| `scan <type>` | Discover available storage resources |
| `prune-backups <storageid>` | Prune backups based on retention rules |
| `export <volume> <format> <filename>` | Export a volume |
| `import <storageid> <format> <filename>` | Import a volume |

## Options / Props

Key options for `pvesm add`:

| Name | Type | Description |
|------|------|-------------|
| `--content` | list | Allowed content types: `images`, `rootdir`, `vztmpl`, `iso`, `backup`, `snippets` |
| `--path` | string | Filesystem mount point (for `dir` type) |
| `--shared` | boolean | Mark storage as accessible from all cluster nodes |
| `--disable` | boolean | Disable this storage |
| `--format` | enum | Default image format: `raw`, `qcow2`, `vmdk`, `subvol` |
| `--nodes` | list | Restrict storage to specific cluster nodes |
| `--prune-backups` | string | Backup retention rules (e.g. `keep-last=3,keep-daily=7`) |
| `--maxfiles` | integer | Maximum number of backups to keep (deprecated, use `--prune-backups`) |

For `pvesm scan`:

| Name | Type | Description |
|------|------|-------------|
| `<type>` | enum | Type to scan: `nfs`, `cifs`, `iscsi`, `lvm`, `zfs`, `pbs` |

## Notes

- `pvesm remove` only removes the storage configuration entry; it does not delete the underlying data or pool.
- Content type `rootdir` is for container root volumes; `images` is for VM disk images.
- `--shared` must be set correctly in cluster environments to avoid storage conflicts.
- Use `pvesm prune-backups` with `--dry-run` to preview what would be deleted.

## Related

- [pveceph.md](./pveceph.md)
- [vzdump.md](./vzdump.md)
- [pvesr.md](./pvesr.md)
