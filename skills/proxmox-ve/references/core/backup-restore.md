# Backup & Restore

Proxmox VE provides integrated backup via `vzdump`. All backups are full backups containing VM/CT configuration and complete disk data. Proxmox Backup Server (PBS) integration adds deduplication, live-restore, and single-file restore.

## Signature / Usage

```bash
# Backup a VM (snapshot mode)
vzdump <vmid> --mode snapshot --storage <storage-id>

# Backup with retention
vzdump <vmid> --mode snapshot --storage pbs-storage \
  --prune-backups keep-daily=7,keep-weekly=4,keep-monthly=3

# Restore a VM
qmrestore <backup-file> <new-vmid>

# Restore a container
pct restore <ctid> <backup-file>

# Limit bandwidth during restore (KiB/s)
qmrestore <backup-file> <vmid> --bwlimit 51200
```

## Options / Props

### vzdump modes

| Mode | VM behavior | Consistency |
|------|-------------|-------------|
| `snapshot` | Runs throughout; uses storage snapshot | Minimal inconsistency risk |
| `stop` | Shuts down for backup, restarts after | Highest consistency |
| `suspend` | Suspends VM/CT briefly for snapshot | Compatibility fallback |

### Container-specific change detection (with PBS)

| Mode | Description |
|------|-------------|
| `default` | Detects changes by metadata + data |
| `data` | Hash-based data comparison |
| `metadata` | Metadata-only comparison (faster, less thorough) |

### Retention (--prune-backups)

| Key | Description |
|-----|-------------|
| `keep-last=N` | Keep the N most recent backups |
| `keep-hourly=N` | Keep N hourly backups |
| `keep-daily=N` | Keep N daily backups |
| `keep-weekly=N` | Keep N weekly backups |
| `keep-monthly=N` | Keep N monthly backups |
| `keep-yearly=N` | Keep N yearly backups |

### Key options

| Option | Description |
|--------|-------------|
| `--storage` | Target storage ID |
| `--mode` | Backup mode: `snapshot`, `stop`, `suspend` |
| `--bwlimit` | Bandwidth limit in KiB/s |
| `--fleecing` | Cache backup data on designated storage before sending to target (reduces guest I/O impact) |
| `--notes-template` | Template for backup notes |

## Notes

- **Fleecing** (VMs only): caches backup data on a fast local storage before streaming to PBS, improving guest I/O at the cost of extra storage space
- **Live-restore** (PBS only): VM starts immediately while disk data is loaded in the background; ideal for large VMs requiring rapid recovery
- **Single-file restore** (PBS only): browse and download individual files from a backup without restoring the entire disk
- Backup jobs can be scheduled in the web UI under Datacenter → Backup; retention policies are set per job
- `--bwlimit` prevents backup/restore from saturating storage and impacting running guests

## Related

- [vm-qemu.md](./vm-qemu.md)
- [container-lxc.md](./container-lxc.md)
- [storage.md](./storage.md)
