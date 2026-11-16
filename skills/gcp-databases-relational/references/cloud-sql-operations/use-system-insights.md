---
source: https://docs.cloud.google.com/sql/docs/postgres/use-system-insights
---

# Use System insights to improve system performance

The System insights dashboard shows an events timeline, summary cards and metric charts for the resources an instance uses, to detect and analyze performance problems. Gemini in Databases can help observe and troubleshoot instances.

## Signature / Usage

### Check what uses disk space (query suggested for the Disk storage by type chart)

Snippet taken from https://docs.cloud.google.com/sql/docs/postgres/troubleshooting (same task: investigating storage usage).

```sql
SELECT pg_database.datname, pg_size_pretty(pg_database_size(pg_database.datname)) AS size FROM pg_database;
```

### Dashboard options

- Open: Cloud SQL Instances page, click the instance, select **System insights**.
- **Customize view**: one or two charts per row; choose which metrics are shown.
- **Auto Refresh**: updates every minute; not compatible with customized time periods.
- Time selector defaults to `1 day`; data is available for the last 30 days; **Custom** sets start and end.
- **Copy Link**, **Notification** (alert on an event), **Annotations**; chart toolbar: zoom, full screen, PNG / CSV download, **View in Metrics Explorer**, **Customize dashboard**, **Explore data**.

## Options / Props

### Summary cards

| Card | Description |
|------|-------------|
| CPU utilization - P99 \| P50 | P99 and P50 CPU utilization over the period |
| Peak connections | Ratio of peak connections to maximum connections; the peak can exceed the maximum if the maximum recently changed (scaling or `max_connections`) |
| Transaction ID utilization | Latest value |
| Disk utilization | Latest value |
| Log errors | Number of errors that users log |

### Default metrics (after the prefix `cloudsql.googleapis.com/database/`)

| Metric | Type string / notes |
|--------|---------------------|
| New connections per second | `postgresql/new_connection_count` (PostgreSQL 14+) |
| Wait event types / wait events | `postgresql/backends_in_wait` |
| Transaction count | `postgresql/transaction_count` (commit and rollback) |
| Memory components | `memory/components` (percent of total database memory) |
| Max replica byte lag | `postgresql/external_sync/max_replica_byte_lag` |
| Query latency | `postgresql/insights/aggregate/latencies` (P99, P95, P50; needs query insights) |
| Database load per database/user/client | `postgresql/insights/aggregate/execution_time` (needs query insights) |
| CPU utilization | `cpu/utilization` |
| Disk storage by type | `disk/bytes_used_by_data_type` (`data`, `wal`, `archived_wal_log`, `tmp_data`) |
| Disk read/write ops | `disk/read_ops_count`, `disk/write_ops_count` |
| Connections by status | `postgresql/num_backends_by_state` (`idle`, `active`, `idle_in_transaction`, `idle_in_transaction_aborted`, `disabled`, `fastpath_function_call`) |
| Connections per database | `postgresql/num_backends` |
| Ingress/egress bytes | `network/received_bytes_count`, `network/sent_bytes_count` |
| I/O wait breakdown | `postgresql/insights/aggregate/io_time` (needs query insights) |
| Deadlock count | `postgresql/deadlock_count` |
| Block read count | `postgresql/blocks_read_count` |
| Rows processed by operation | `postgresql/tuples_processed_count` |
| Rows in database by state | `postgresql/tuple_size` (reported when fewer than 50 databases) |
| Oldest transaction by age | `postgresql/vacuum/oldest_transaction_age` |
| WAL archiving | `replication/log_archive_success_count`, `replication/log_archive_failure_count` |
| Transaction ID utilization | `postgresql/transaction_id_utilization` |
| Connections per application | `postgresql/num_backends_by_application` (no name = `Unknown`) |
| Rows fetched / returned / written | `postgresql/tuples_fetched_count`, `postgresql/tuples_returned_count`, `postgresql/tuples_processed_count` |
| Temp data size / temp files | `postgresql/temp_bytes_written_count`, `postgresql/temp_files_written_count` |

Log entries by severity (`logging.googleapis.com/log_entry_count`) counts error and warning entries extracted from `postgres.log` and `pgaudit.log`.

### Events timeline

| Event | Operation type |
|-------|----------------|
| Instance restart | `RESTART` |
| Instance failover (manual failover of an HA primary to standby) | `FAILOVER` |
| Instance maintenance (typically unavailable 1 to 3 minutes) | `MAINTENANCE` |
| Instance backup | `BACKUP_VOLUME` |
| Instance update | `UPDATE` |
| Promote replica / Start / Stop / Recreate / Create replica | `PROMOTE_REPLICA` / `START_REPLICA` / `STOP_REPLICA` / `RECREATE_REPLICA` / `CREATE_REPLICA` |
| Data import / Instance export | `IMPORT` / `EXPORT` |
| Restore backup (might restart the instance) | `RESTORE_VOLUME` |

## Notes

- Instances with more than 500 databases report a single aggregated value for database metrics.
- Same PITR WAL-in-Cloud-Storage details as the monitor page; the source here states `transactionLogRetentionDays` as 1 to 7 while the monitor page says 1 to 35 for Enterprise Plus. Source inconsistency: kept as in each page.
- Source inconsistency: this page's events timeline says an instance under maintenance is typically unavailable 1 to 3 minutes, while https://docs.cloud.google.com/sql/docs/postgres/maintenance says Enterprise edition instances lose connectivity for less than 30 seconds on average (Enterprise Plus near-zero downtime: typically less than 1 second).
- Disk storage by type: temp data is removed during maintenance and may exceed user-defined capacity to avoid a full disk, at no charge; a new database uses about 100 MB for system tables.
- Snippet taken from https://docs.cloud.google.com/sql/docs/postgres/troubleshooting (retrieved 2026-11-16); the dashboard itself is Console-only.
- Distinct from Supabase Postgres (`supabase`) and Cloudflare D1 / Hyperdrive (`cloudflare-storage`).
- Source: https://docs.cloud.google.com/sql/docs/postgres/use-system-insights (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [monitor-instance.md](./monitor-instance.md)
- [logging.md](./logging.md)
- [troubleshooting.md](./troubleshooting.md)
