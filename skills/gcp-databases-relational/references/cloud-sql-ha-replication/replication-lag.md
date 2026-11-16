---
source: https://docs.cloud.google.com/sql/docs/postgres/replication/replication-lag
---

# Replication lag (Cloud SQL for PostgreSQL)

Cloud SQL read replicas use PostgreSQL streaming replication: WAL is sent by the primary's WAL sender and applied by the replica's WAL receiver. Lag arises when the primary cannot send fast enough, the replica cannot receive fast enough, or the replica cannot apply fast enough.

## Signature / Usage

### Verify replication (run on the replica)

```sql
select status, last_msg_receipt_time from pg_stat_wal_receiver;
```

When replication is happening you see status `streaming` and a recent `last_msg_receipt_time`; if not, the result is empty (0 rows).

## Options / Props

### Metrics

| Metric | Description |
|---|---|
| `cloudsql.googleapis.com/database/replication/replica_lag` | Seconds the replica lags the primary; approximated as `now() - pg_last_xact_replay_timestamp()` on the replica. If replication is broken it does not indicate total lag. |
| `cloudsql.googleapis.com/database/postgres/replication/replica_byte_lag` | Bytes lagging; 4 series by `replica_lag_type`: `sent_location` (generated, not yet sent), `write_location` (sent, not yet written), `flush_location` (written, not yet flushed), `replay_location` (total lag; replay minus flush is replay delay). |
| `cloudsql.googleapis.com/database/replication/network_lag` | Seconds from commit on the primary to the replica's WAL receiver; maximum limit of 25 seconds, rounded up to the nearest second. Low `network_lag` with high `replica_lag` means the replica cannot apply changes fast enough. |

### Causes and remedies

| Cause | Remedy |
|---|---|
| Undersized replica or CPU over 90% | Make the replica at least as large as the primary; compare config with `SHOW ALL`. |
| Long-running replica queries blocking apply (for example after `VACUUM`) | Separate OLTP and OLAP replicas; set `max_standby_archive_delay` and `max_standby_streaming_delay` (often 30 to 60 seconds); check `pg_stat_database_conflicts`; `hot_standby_feedback=on` delays vacuum on the primary but can bloat tables. |
| High network lag | Cross-region distance, primary or replica CPU over 90%, bandwidth or disk I/O limits; consider the `wal_compression` flag on the primary. |
| DDL exclusive locks (`ALTER TABLE`, `CREATE INDEX`) | Schedule DDL when replica query load is low. |
| Overloaded replica | Split reads across replicas, throttle reads, spread out primary updates. |
| Monolithic primary | Shard vertically or horizontally. |

## Notes

- A reported `network_lag` of 1 second can represent anything from about a millisecond up to a full second.
- Promoting a lagging replica loses transactions not yet replayed; see cross-region-replicas.md. Try it on a disposable instance first.
- Managed PostgreSQL on Google Cloud; distinct from Supabase Postgres (`supabase`) and the Node.js client `mssql` / ORM `drizzle` (those cover client code, not the managed service).
- Source: https://docs.cloud.google.com/sql/docs/postgres/replication/replication-lag (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [create-replica.md](./create-replica.md)
- [cross-region-replicas.md](./cross-region-replicas.md)
- [replication.md](./replication.md)
- PostgreSQL hot standby conflicts: https://www.postgresql.org/docs/current/hot-standby.html#HOT-STANDBY-CONFLICT
