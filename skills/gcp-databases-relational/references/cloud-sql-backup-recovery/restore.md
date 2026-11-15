---
source: https://docs.cloud.google.com/sql/docs/postgres/backup-recovery/restore
---

# About restoring Cloud SQL instances

Cloud SQL restores an instance from a backup or by point-in-time recovery (PITR). A backup restore targets a new or an existing instance (the target can be in another region or project, and can have different cores or memory). The restore copies the source instance's settings, databases and users to the target. PITR always creates a new instance.

## Signature / Usage

The source has no code block. Snippet taken from https://docs.cloud.google.com/sql/docs/postgres/backup-recovery/pitr: get the earliest and latest recovery time of an unavailable instance.

```bash
gcloud sql instances get-latest-recovery-time INSTANCE_NAME
```

## Options / Props

### Restore onto an existing instance (destructive)

- The restore operation overwrites all data on the target instance.
- Flags from the source instance are not restored; flags already on the target are retained.
- The target is unavailable for connections during the restore; existing connections are lost. The instance restarts.
- With read replicas on the target, you must delete all replicas and recreate them after the restore completes.
- Backup configurations on the target reset to defaults; update them afterwards if the source used custom configs or enhanced backups.
- Important (from the source): the target must have at least as much compute and memory (vCPU and RAM) as the source instance of the backup; otherwise the restore can fail with errors like `database failed to start after multiple retries`.
- Cloud SQL sets target storage to the maximum of the configured disk size and the backup disk size.

### Requirements for restoring to a new instance

| Requirement | Detail |
|-------------|--------|
| Database version | Same as the instance the backup came from |
| `storageAutoResize` | Enabled by default on new instances; later backups inherit the setting; legacy instances do not have it |
| State | Target must be `RUNNABLE` |

### CMEK-enabled instances with enhanced backups

| Option | Flag |
|--------|------|
| Same Cloud KMS key as original (default) | none |
| Different Cloud KMS key | `--disk-encryption-key` |
| Google-owned and Google-managed keys | `--clear-disk-encryption=CLEAR_DISK_ENCRYPTION` |

Restoring to a different region: the source key cannot be used; set `--disk-encryption-key` to a key in the target region.

### PITR defaults and log storage

| Item | Value |
|------|-------|
| Enterprise Plus | PITR enabled by default |
| Enterprise via console | Enabled by default |
| Enterprise via gcloud CLI, Terraform or Admin API | Disabled by default |
| Log retention `transactionLogRetentionDays` | 1 to 35 days (Enterprise Plus), 1 to 7 days (Enterprise) |
| Default log retention when unset | 14 days (Enterprise Plus), 7 days (Enterprise) |
| Typical RPO | Five minutes or less |
| Logs in Cloud Storage | Stored up to 35 days (Enterprise Plus) / 7 days (Enterprise), no additional cost |
| On-disk logs | `expire_logs_days` / `binlog_expire_logs_seconds` set to the equivalent of one day; do not set either to `0` |

### Restore rate limit

Maximum three restore operations every 30 minutes per instance per region per project; failed operations are not counted. Bucket of three tokens per backup, per target project and per target region; a new token every 10 minutes.

## Notes

- Restoring an existing instance from a backup deletes the archived PITR logs; only logs generated after the restore can be used for PITR.
- Caution (source): moving PITR transaction logs from disk to Cloud Storage causes several minutes of downtime and loses previous logs. Deactivating and re-enabling PITR deletes existing logs and restarts the database; you cannot PITR earlier than the re-enable time.
- With CMEK, restore needs the latest key version for all days in `retained-transaction-log-days`; logs are encrypted with the latest CMEK version.
- Deleted instances: PITR needs PITR and retained backups enabled before deletion; PITR logs then expire on a rolling basis per the retention before deletion (e.g. 14 days: latest log deleted 14 days after deletion). Identify them by `instance_deletion_time` and `log_retention_days`.
- In gcloud 593.0.0 `--clear-disk-encryption` takes a value (`--clear-disk-encryption=CLEAR_DISK_ENCRYPTION`, "Disables CMEK in the restored instance"; see `gcloud sql backups restore --help` and `gcloud sql instances point-in-time-restore --help`); the source text names the flag without one, and the bare form fails with "expected one argument". The help does not state the accepted value.
- Source inconsistency: this page stores PITR logs in Cloud Storage up to 35 days (Enterprise Plus) / 7 days (Enterprise) at no additional cost, while https://docs.cloud.google.com/sql/docs/postgres/monitor-instance says storage up to seven days (the maximum point-in-time recovery length) adds no per-instance cost.
- Instance restore operations are destructive; try restores on a disposable instance first.
- In an outage you can still retrieve the list of backups of a project to restore from.
- Cloud SQL pages describe managed PostgreSQL / MySQL / SQL Server on Google Cloud, distinct from Supabase Postgres (`supabase`), Cloudflare D1 / Hyperdrive (`cloudflare-storage`), and the Node.js client `mssql` / ORM `drizzle` (those skills cover client code, not the managed service).
- Source: https://docs.cloud.google.com/sql/docs/postgres/backup-recovery/restore (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [restoring.md](./restoring.md)
- [pitr.md](./pitr.md)
- [backups.md](./backups.md)
- [backup-options.md](./backup-options.md)
