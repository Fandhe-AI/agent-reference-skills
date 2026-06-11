# vzdump

Backup utility for Proxmox VE VMs and containers. Creates full backups containing VM/CT configuration and all disk data.

## Signature / Usage

```bash
vzdump {<vmid>} [OPTIONS]
vzdump help
```

`<vmid>` can be a single ID, a comma-separated list, or omitted with `--all`.

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `--all` | boolean | Backup all guests on this host |
| `--storage <id>` | string | Destination storage ID |
| `--dumpdir <path>` | string | Output directory (alternative to `--storage`) |
| `--mode` | enum | Backup mode: `snapshot` (default), `stop`, `suspend` |
| `--compress` | enum | Compression: `0` (none), `gzip`, `lzo`, `zstd` |
| `--exclude <vmid>` | string | Exclude guests (comma-separated, used with `--all`) |
| `--bwlimit <KiB/s>` | integer | I/O bandwidth limit |
| `--prune-backups` | string | Retention policy (e.g. `keep-last=3,keep-daily=7,keep-weekly=4`) |
| `--protected` | boolean | Mark backup as deletion-protected |
| `--fleecing` | string | Use fleecing (copy-on-write cache) for live backup |
| `--notes-template` | string | Template for backup notes |
| `--mailto` | list | Email addresses to notify on completion |
| `--mailnotification` | enum | When to send email: `always` or `failure` |
| `--node` | string | Run only on this cluster node |
| `--pool` | string | Backup only VMs/CTs in this pool |
| `--stdout` | boolean | Write backup to stdout |
| `--tmpdir <path>` | string | Temporary directory for backup files |

## Backup Modes

| Mode | Description |
|------|-------------|
| `snapshot` | Live backup with minimal downtime (default; uses storage snapshots or fleecing) |
| `stop` | Stop VM/CT before backup for maximum consistency |
| `suspend` | Suspend VM before backup (compatibility mode) |

## Notes

- Global defaults can be set in `/etc/vzdump.conf` using `key: value` format.
- `--prune-backups` supports: `keep-last`, `keep-hourly`, `keep-daily`, `keep-weekly`, `keep-monthly`, `keep-yearly`.
- `snapshot` mode requires storage snapshot support or fleecing; falls back gracefully.
- Use `--stdout` to pipe backup data directly to a custom destination.
- `vzdump` is also invoked internally by scheduled backup jobs configured in the web UI.

## Related

- [qm.md](./qm.md)
- [pct.md](./pct.md)
- [pvesm.md](./pvesm.md)
- [misc-cli.md](./misc-cli.md)
