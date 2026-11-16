---
source: https://docs.cloud.google.com/alloydb/docs/backup/overview
---

# Data backup and recovery overview

AlloyDB for PostgreSQL protects data with continuous backup and recovery (enabled on all clusters by default) and with on-demand and automated backups. Two backup services manage them: Standard (managed by AlloyDB) and Enhanced (managed by the Backup and DR Service).

## Signature / Usage

### Change the continuous backup recovery window

The default recovery window is 14 days; the configurable range is 1 to 35 days.

```bash
gcloud alloydb clusters update CLUSTER_ID \
  --continuous-backup-recovery-window-days=WINDOW_LENGTH \
  --region=REGION_ID \
  --project=PROJECT_ID
```

### Restoration model

- Point-in-time restore: specify a source cluster and a timestamp when creating a new cluster. The new cluster must be in the same region as the source cluster, but can be in a different Google Cloud project.
- Backup restore: specify a backup when creating a new cluster. The new cluster must be in the same region as the backup, but can be in a different Google Cloud project.
- In both cases AlloyDB creates a new cluster and starts a long-running operation that loads the data into its storage. Afterwards, create a primary instance in that cluster to access the data.
- Cluster restores occur in the same region, but on-demand backups can be stored cross-region. Backups and restores are supported across different Google Cloud projects and organizations.

## Options / Props

### Backup types

| Backup type | Description |
|---|---|
| Continuous backup and recovery | Restore an existing cluster to any moment from its recent history, with microsecond granularity, using PITR. Enabled by default, retention window 1 to 35 days. AlloyDB creates daily incremental backups. |
| On-demand backup | Full backup that you initiate manually at any time. You can also take one before you delete a cluster. |
| Automated backup | Incremental backups that AlloyDB creates on a schedule you define. |
| System backups | Created automatically in specific situations, e.g. during cross-region failover (Preview) and before and after an in-place major version upgrade (rollback point). |

### Standard vs Enhanced backup tier

A cluster can't use both options at the same time, but you can switch between them.

| Feature | Standard (managed by AlloyDB) | Enhanced (managed by Backup and DR) |
|---|---|---|
| Protection against unauthorized deletion and changes | Immutable backups through backup vault | Immutable and indelible backups through backup vault |
| Automated backup frequency | Daily with continuous log archival for continuous backups and recovery; hourly, daily, or weekly for automated backups | Hourly, daily, weekly, monthly, or annually |
| Protected against source project deletion | No | Yes |
| Centralized backup management | No | Yes |
| Protected against source cluster deletion | Yes | Yes |
| PITR using logs | Yes | Yes |
| Cross-regional backup | Yes | No |
| On-demand backup retention | Up to one year | Up to one year; eligible for manual deletion or expiration after the retention period elapses |

### Retention and deletion

| Item | Value |
|---|---|
| Continuous backup files, default retention | 14 days (adjustable 1 to 35 days, or disable continuous backup) |
| On-demand and automated backups | Up to one year; automated default is 14 days |
| Expired backups | May still be listed, incur no storage costs, subject to automated deletion |

You can't delete a backup when:

- **Active continuous backup plan**: it is managed by an active continuous backup configuration on the source cluster and is still in the recovery window. Disable continuous backup or shorten the window first.
- **Dependency chain**: a later continuous or automated backup needs it for a restore. Delete the most recent incremental backup first.
- **Enforced retention**: an enhanced backup inside the enforced retention period of a Backup and DR backup vault.

## Notes

- Continuous backup gives an RPO of zero. Continuous and automated backups are incremental; on-demand backups are full. AlloyDB also takes full continuous backups periodically.
- Backups are immutable once created and encrypted with Google-managed encryption or customer-managed encryption keys (CMEK).
- Backup creation requires the cluster and its primary instance to be in the Ready state; AlloyDB then starts a long-running operation.
- Backup and restore have no impact on read and write performance (separate storage-layer resources), and a backup exists independently of its source cluster: you can restore even if the source cluster is deleted.
- On-demand backup locations: default is the cluster's location; you can choose a cross-region location (consider cost and proximity to your application server). If you change the backup location, existing backups remain in their original location. Enhanced backups handle on-demand backups differently.
- If you use an automated backup retention window longer than 35 days, AlloyDB might store multiple chains of incremental backups.
- Deleting backups is destructive. Try deletion and restore flows on a disposable cluster first.
- Snippet taken from https://docs.cloud.google.com/alloydb/docs/backup/configure (the source overview has no code block).
- Managed PostgreSQL-compatible database on Google Cloud, distinct from Supabase Postgres (`supabase`), Cloudflare D1 / Hyperdrive (`cloudflare-storage`), and the Node.js client `mssql` / ORM `drizzle` (those skills cover client code, not the managed service).
- Source: https://docs.cloud.google.com/alloydb/docs/backup/overview (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [configure.md](./configure.md)
- [restore.md](./restore.md)
- [restore-pitr.md](./restore-pitr.md)
- Create an on-demand backup: https://docs.cloud.google.com/alloydb/docs/backup/create-on-demand
- Manage enhanced backups: https://docs.cloud.google.com/alloydb/docs/backup/manage-enhanced-backups
