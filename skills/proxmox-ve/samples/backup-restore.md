# Backup and Restore

Back up VMs and containers with `vzdump`, restore with `qmrestore`/`pct restore`, and schedule recurring jobs.

```bash
# --- On-demand backups ---

# Snapshot-mode backup of VM 123 to a storage (no guest downtime)
vzdump 123 --storage my_backup_storage --mode snapshot --compress zstd

# Backup a container (suspend mode for consistency)
vzdump 200 --storage my_backup_storage --mode suspend --compress zstd

# Backup all guests at once, send notification email
vzdump --all --mode snapshot --storage my_backup_storage --mailto admin@example.com

# Backup multiple specific guests
vzdump 101 102 103 --storage my_backup_storage --compress zstd

# Backup all guests except specific IDs
vzdump --all --mode suspend --storage my_backup_storage --exclude 101,102

# Limit backup bandwidth to 100 MiB/s
vzdump 123 --storage my_backup_storage --bwlimit 102400

# Backup with retention pruning (keep last 3, last 13 daily, last 9 yearly)
vzdump 123 --storage my_backup_storage --prune-backups keep-last=3,keep-daily=13,keep-yearly=9

# --- Restore ---

# Restore a VM backup to new VMID 601
qmrestore /mnt/backup/vzdump-qemu-123-2024_01_15.vma.zst 601

# Live-restore VM (starts immediately, data loads in background — PBS only)
qmrestore /mnt/backup/vzdump-qemu-123.vma 601 --live-restore

# Restore a container backup to new CTID 600
pct restore 600 /mnt/backup/vzdump-lxc-200-2024_01_15.tar.zst

# Clone a container to CTID 300 via pipe (no intermediate file)
vzdump 200 --stdout | pct restore --rootfs 4 300 -

# --- Default settings via config file ---
# /etc/vzdump.conf
# storage: my_backup_storage
# mode: snapshot
# compress: zstd
# bwlimit: 10000

# --- Schedule daily backups at 22:00 (legacy cron) ---
# Add to /etc/cron.d/vzdump or use the Datacenter > Backup GUI scheduler:
# 0 22 * * * root /usr/sbin/vzdump --all --mode snapshot --storage my_backup_storage
```

## Notes

- Backup modes: `snapshot` (no downtime, requires snapshot-capable storage), `suspend` (brief pause), `stop` (full downtime but always consistent).
- `zstd` compression offers the best speed/ratio trade-off; use `gzip` when compatibility with older tools matters.
- `--prune-backups` runs pruning immediately after backup; configure storage-level retention in Datacenter > Storage for continuous pruning.
- Live restore (`--live-restore`) is only available with Proxmox Backup Server (PBS) as the storage target.
