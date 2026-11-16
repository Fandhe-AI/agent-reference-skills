---
source: https://docs.cloud.google.com/sql/docs/postgres/intro-to-cloud-sql-disaster-recovery
---

# About disaster recovery in Cloud SQL (PostgreSQL)

Cloud SQL is a regional service, so a regional outage makes the database unavailable. Disaster recovery (DR) uses a cross-region read replica in a secondary region that you promote. Failover via export/import or backup/restore also works but is slower. Enterprise Plus edition adds advanced DR with a designated DR replica, replica failover and switchover.

## Signature / Usage

### Designate a DR replica (advanced DR, Enterprise Plus)

The source page has no code; this block is from the advanced-DR page. Replace `PRIMARY_INSTANCE_NAME` with the primary instance and `REPLICA_NAME` with the cross-region read replica to designate as the DR replica.

```bash
gcloud sql instances patch PRIMARY_INSTANCE_NAME \
   --failover-dr-replica-name=REPLICA_NAME
```

## Options / Props

### DR process (primary region R1, secondary R2, third R3)

| Step | Action |
|---|---|
| 1 | R1 becomes unavailable. |
| 2 | Operations team acknowledges the disaster and decides on failover. |
| 3 | Promote the cross-region read replica in R2 to primary. |
| 4 | Reconfigure client connections to R2. |
| 5 | Create a standby in R2 (different zone) to make the new primary HA. |
| 6 | Create a new cross-region replica in R3 (or in R1 if it is back, which simplifies fallback). |

Fallback to R1: promote the new replica in R1; enable HA if needed; reconfigure applications; create a cross-region replica in R2; optionally clean up the primary in R2. Fallback needs a second failover and can be scheduled.

### Advanced DR (Cloud SQL Enterprise Plus)

| Concept | Detail |
|---|---|
| DR replica | A directly connected cross-region read replica; designation can be changed any time except during a switchover or replica failover. |
| Replica failover | Promotes the DR replica immediately; write endpoint repoints; the old primary later rejoins as a replica of the new primary. Can lose data if the DR replica lags. |
| Switchover | Primary becomes read-only, logs are copied to Cloud Storage, DR replica catches up to zero lag, then is promoted; old primary becomes the DR replica. Zero data loss. Requires primary and DR replica both online. |
| IP addresses | Instances keep their IP addresses through both operations. |
| Write endpoint | Global DNS name resolving to the current primary. Requires the Cloud DNS API enabled on the project; generated automatically for Enterprise Plus instances with private IP and authorized networks, or when the DR replica is created. Without it, point apps at the new primary's IP. |
| PITR | Enabled automatically on the new primary after a switchover; possible only after the first automated backup. |
| RTO tips | Size the DR replica like the primary; enable HA on it as well. |

## Notes

- Replication is asynchronous, so cross-region failover RPO is likely non-zero. To cut RTO, make the R2 replica an HA replica and the R3 replica a cascading replica of it.
- Avoid split-brain: after R1 returns, make the original primary inaccessible before clients use the new primary, then delete it. Back up the new primary immediately after failover, before clients connect.
- Failover, replica failover, switchover and promotion are destructive-class operations. Try them on a disposable instance first; use switchover for routine DR drills.
- Managed PostgreSQL on Google Cloud; distinct from Supabase Postgres (`supabase`) and the Node.js client `mssql` / ORM `drizzle` (those cover client code, not the managed service).
- Snippet taken from https://docs.cloud.google.com/sql/docs/postgres/use-advanced-disaster-recovery (the designate-DR-replica step). Create the cross-region replica first; see [cross-region-replicas.md](./cross-region-replicas.md).
- Source: https://docs.cloud.google.com/sql/docs/postgres/intro-to-cloud-sql-disaster-recovery (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/sql/docs/postgres/use-advanced-disaster-recovery (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [cross-region-replicas.md](./cross-region-replicas.md)
- [high-availability.md](./high-availability.md)
- [replication.md](./replication.md)
- Use advanced DR: https://docs.cloud.google.com/sql/docs/postgres/use-advanced-disaster-recovery
- Write endpoint: https://docs.cloud.google.com/sql/docs/postgres/connect-to-instance-using-write-endpoint
