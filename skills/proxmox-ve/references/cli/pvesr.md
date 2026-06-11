# pvesr

Proxmox VE Storage Replication. Manages replication jobs that continuously replicate guest volumes to other cluster nodes using ZFS snapshots to minimize network traffic.

## Signature / Usage

```bash
pvesr <COMMAND> [OPTIONS]
pvesr help [<COMMAND>]
```

## Subcommands

| Subcommand | Description |
|------------|-------------|
| `create-local-job <id>` | Create a new local replication job |
| `list` | List all configured replication jobs |
| `read <id>` | Show configuration of a specific job |
| `update <id>` | Modify an existing job |
| `delete <id>` | Mark a job for removal |
| `enable <id>` | Activate a previously disabled job |
| `disable <id>` | Deactivate a replication job |
| `status` | Show current state of all jobs on this node |
| `schedule-now <id>` | Trigger immediate replication for a job |
| `run` | Run sync jobs (called by systemd timer) |
| `prepare-local-job <id>` | Prepare target node before replication (internal) |
| `finalize-local-job <id>` | Remove snapshots after replication (internal) |

## Options / Props

Key options for `pvesr create-local-job`:

| Name | Type | Description |
|------|------|-------------|
| `<id>` | string | Job ID in `<vmid>-<jobnum>` format (e.g. `100-0`) |
| `--target` | string | Target node name |
| `--schedule` | string | Replication schedule (default: `*/15` — every 15 minutes) |
| `--rate` | number | Bandwidth limit in MB/s |
| `--comment` | string | Descriptive comment |
| `--disable` | boolean | Create job in disabled state |

Key options for `pvesr delete`:

| Name | Type | Description |
|------|------|-------------|
| `--force` | boolean | Skip cleanup of target data |
| `--keep` | boolean | Keep replicated data at destination |

## Notes

- Storage replication requires ZFS-based storage; it uses ZFS send/receive with incremental snapshots.
- The default schedule (`*/15`) replicates every 15 minutes; use standard systemd `OnCalendar` syntax for custom schedules.
- Replicated data can serve as a warm standby for HA failover, but `pvesr` itself is not an HA mechanism.
- Job IDs are in the format `<vmid>-<jobnum>`; multiple jobs per VM are allowed with different targets.

## Related

- [pvesm.md](./pvesm.md)
- [pvecm.md](./pvecm.md)
- [ha-manager.md](./ha-manager.md)
