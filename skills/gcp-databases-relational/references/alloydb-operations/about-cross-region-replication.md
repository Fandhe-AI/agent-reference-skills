---
source: https://docs.cloud.google.com/alloydb/docs/cross-region-replication/about-cross-region-replication
---

# About cross-region replication

AlloyDB for PostgreSQL cross-region replication creates secondary clusters and instances in other regions from a primary cluster. They are continuously updated, asynchronously replicated read-only copies that protect against regional outages and reduce read latency for distributed users.

## Signature / Usage

### Configure backups on a secondary cluster

By default AlloyDB copies automated and continuous backup configurations from the primary cluster to a newly created secondary cluster. You can use different backup settings when you create the secondary cluster, and modify automated and continuous backup settings after creation. Example for changing the continuous backup window on a cluster:

```bash
gcloud alloydb clusters update CLUSTER_ID \
  --continuous-backup-recovery-window-days=WINDOW_LENGTH \
  --region=REGION_ID \
  --project=PROJECT_ID
```

If the primary cluster uses CMEK for backups, either provide CMEK encryption settings for the secondary cluster's backups or disable backups for it when you create it.

## Options / Props

### Key concepts and limits

| Concept | Description |
|---|---|
| Primary cluster | Read-write cluster in a single region. |
| Secondary cluster | Read-only cluster in a different region, replicating asynchronously from the primary. Up to five secondary clusters per primary, all replicating from the single primary. A promoted secondary becomes an independent primary cluster. |
| Secondary instance | Read-only leader of a secondary cluster; receives the replication stream that updates the secondary region's storage volume. Becomes the primary instance on promotion. Can be basic (zonal) or high-availability (regional). |
| Read scaling | Each secondary cluster supports up to 20 read nodes (read pool instances). |

### Tasks

| Task | Notes |
|---|---|
| Create a secondary cluster | Advanced query insights features can't be enabled on secondary clusters. |
| Add read pool instances | Up to 20 read nodes on a secondary cluster. |
| Promote a secondary cluster | Readable, not writable, until promoted to a standalone primary; the secondary instance is promoted to primary with read/write. Main use case is disaster recovery. |
| Cross-region failover (Preview) | Promotes a secondary to primary and automatically recreates the original primary as a new secondary, keeping the replication topology without manual deletion or recreation. |
| Switchover | Reverses primary and secondary roles with zero data loss (RPO 0). The replication direction is reversed. With several secondaries, the one receiving the command becomes primary; the old primary becomes a secondary of it; all other secondaries replicate from the new primary. |

Switchover scenarios: disaster recovery drills (simulate a regional outage) and planned regional migration.

## Notes

- Benefits listed: disaster recovery, reduced downtime (HA on secondary clusters), geographically distributed data, increased read scaling, switchover with zero data loss.
- Promotion, cross-region failover and switchover are destructive to the current topology; try them on a disposable cluster pair first.
- The source has no code on this page and no commands for replication tasks; they are on https://docs.cloud.google.com/alloydb/docs/cross-region-replication/work-with-cross-region-replication.
- Snippet taken from https://docs.cloud.google.com/alloydb/docs/backup/configure (backup configuration task linked from this page).
- Managed PostgreSQL-compatible database on Google Cloud, distinct from Supabase Postgres (`supabase`), Cloudflare D1 / Hyperdrive (`cloudflare-storage`), and the Node.js client `mssql` / ORM `drizzle` (those skills cover client code, not the managed service).
- Source: https://docs.cloud.google.com/alloydb/docs/cross-region-replication/about-cross-region-replication (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [configure.md](./configure.md)
- [instance-primary-secondary-failover.md](./instance-primary-secondary-failover.md)
- Work with cross-region replication: https://docs.cloud.google.com/alloydb/docs/cross-region-replication/work-with-cross-region-replication
