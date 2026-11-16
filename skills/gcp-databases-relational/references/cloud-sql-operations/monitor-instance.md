---
source: https://docs.cloud.google.com/sql/docs/postgres/monitor-instance
---

# Monitor instances

Monitor Cloud SQL for PostgreSQL instances with the System Insights dashboard, the default Cloud Monitoring dashboard (with alerts), the Overview page metrics chart, and multi-instance comparison.

## Signature / Usage

### Check where point-in-time recovery WAL logs are stored

After connecting with a PostgreSQL client such as `psql` or `pgAdmin`, run:

Adapted (not in the official docs): added the statement terminator `;` (the source shows the statement inline).

```sql
show archive_command;
```

If any WALs are archived in Cloud Storage you see `-async_archive -remote_storage`. Also check the `bytes_used_by_data_type` metric: if `archived_wal_log` is `0`, logs are in Cloud Storage.

### Monitoring tasks

- Cloud Monitoring: use the predefined Cloud SQL dashboard or custom dashboards, and set alerts for a project or instance (for example, an email alert when **Memory usage** exceeds 80%).
- Overview page: open the instance, pick a metric from the **Chart** drop-down.
- Compare: select up to five instances in the Instances list, then use the **Monitoring** tab of the Info Panel.

## Options / Props

| Metric | Description |
|--------|-------------|
| Storage usage (GB) | Storage cost driver; includes data, and undo data (a copy of data made before a transaction modifies it) |
| CPU usage | If too high, increase the machine type |
| Memory usage | Memory used by the instance |
| Read/write operations | Reads are disk reads that missed cache; writes happen even when the app is idle (system table written about every second, except replicas) |
| Ingress/Egress bytes (bytes/sec) | Network traffic in and out |

### PITR log storage facts (from the Storage usage row)

- With PITR enabled on new instances (or existing ones that enable it after the feature became available), WAL logs live in Cloud Storage in the instance's region, not on disk; storage up to seven days adds no per-instance cost.
- `transactionLogRetentionDays`: 1 to 35 for Enterprise Plus, 1 to 7 for Enterprise.
- Restoring a backup before enabling PITR loses the WAL logs PITR needs.
- Disabling and re-enabling PITR deletes existing WAL logs (no restore earlier than the re-enable time) but the disk size stays the same; enable automatic storage increases when logs are on disk.

## Notes

- Database-specific metrics report a single aggregated value for instances with more than 500 databases.
- Adapted from the official docs: the source shows `show archive_command` inline without `;`; the terminator was added so psql runs it.
- Source inconsistency: this page says PITR log storage up to seven days (the maximum length for point-in-time recovery) adds no per-instance cost, while it and https://docs.cloud.google.com/sql/docs/postgres/backup-recovery/restore give 1 to 35 days of log retention for Enterprise Plus (the restore page: stored up to 35 days / 7 days at no additional cost).
- The source also shows Console click paths for the Overview page and comparison.
- Distinct from Supabase Postgres (`supabase`) and Cloudflare D1 / Hyperdrive (`cloudflare-storage`).
- Source: https://docs.cloud.google.com/sql/docs/postgres/monitor-instance (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [use-system-insights.md](./use-system-insights.md)
- [logging.md](./logging.md)
- [troubleshooting.md](./troubleshooting.md)
