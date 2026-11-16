---
source: https://docs.cloud.google.com/sql/docs/postgres/replication/cross-region-replicas
---

# Promote replicas for regional migration or disaster recovery

Cross-region read replicas (replicas in a different region from the primary) support planned regional migration and unplanned disaster-recovery failover. Promoting a replica is manual and intentional, unlike HA where a standby (not a replica) becomes primary automatically.

## Signature / Usage

### Verify replication on the replica before promoting

The source page has no code; this check comes from the replication-lag page and is run against the replica.

```sql
select status, last_msg_receipt_time from pg_stat_wal_receiver;
```

Status `streaming` with a recent `last_msg_receipt_time` means replication is working; an empty result means it is not.

## Options / Props

### Replication state metric (`cloudsql.googleapis.com/database/replication/state`)

| Situation | Reported value | Meaning |
|---|---|---|
| Primary outage | `Error` or `Stopped` | Replication halted; transactions committed on the primary after it stopped are lost on promotion. |
| Planned failover or migration | Must be `Running` | If `Error` or `Stopped`, the replica is not receiving updates; promoting causes data loss. |

### Steps

| Step | Detail |
|---|---|
| Verify failover criteria | Check the Replication state metric and `Lag Bytes` in the monitoring dashboard; connect to the replica and compare `pg_catalog.pg_last_wal_receive_lsn()` and `pg_catalog.pg_last_wal_replay_lsn()` so all received transactions are replayed. |
| Promote | Follow Promoting a replica; promoted replicas are automatically configured with backups. |
| Machine type | If the promoted instance is smaller than the former primary, resize it. |
| High availability | Configure HA on the replica you plan to promote, or on the promoted instance afterwards. |
| Recreate replicas | After promotion, delete the old primary and other old replicas and create new replicas from the new primary with different names (the promoted replica keeps its name). |

## Notes

- Promotion stops replication and converts the replica to a standalone primary (manage-replicas page); the source describes no way to turn it back into a replica, so plan to create new replicas from it (Recreate replicas row). Replication is asynchronous, so unless writes to the primary are stopped and lag reaches 0, recent transactions can be lost. With advanced DR, a switchover (below) restores roles without promotion. Try it on a disposable instance first.
- Advanced DR (Cloud SQL Enterprise Plus): designate a cross-region replica as the DR replica. A replica failover replaces the primary with the DR replica and the old primary becomes its replica; a switchover later restores the original roles with zero data loss. Only the designated DR replica can be used for replica failover; other replicas can still be promoted without failover.
- Example topology: db-a-0 (us-central1, HA primary), db-b-1 (us-west1 replica), db-c-1 (us-east1 replica). After promoting db-b-1, new replicas become db-a-1 (us-central1) and db-c-2 (us-east1).
- Managed PostgreSQL on Google Cloud; distinct from Supabase Postgres (`supabase`) and the Node.js client `mssql` / ORM `drizzle` (those cover client code, not the managed service).
- Snippet taken from https://docs.cloud.google.com/sql/docs/postgres/replication/replication-lag (the source page has no code).
- Source: https://docs.cloud.google.com/sql/docs/postgres/replication/cross-region-replicas (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [intro-to-cloud-sql-disaster-recovery.md](./intro-to-cloud-sql-disaster-recovery.md)
- [replication-lag.md](./replication-lag.md)
- [create-replica.md](./create-replica.md)
- [high-availability.md](./high-availability.md)
- Promoting a replica: https://docs.cloud.google.com/sql/docs/postgres/replication/manage-replicas#promote-replica
