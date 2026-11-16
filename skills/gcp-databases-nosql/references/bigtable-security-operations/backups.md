---
source: https://docs.cloud.google.com/bigtable/docs/backups
---

# Bigtable backups overview

Backups save a copy of a table's schema and data on one cluster, to be restored later to a new table. Standard backups are optimized for long-term retention; hot backups restore to production-level performance fastest. The source notes that the page "includes features that are available only in Enterprise Plus edition": selecting the cluster locations where automated backup is enabled, and on-demand or updated retention up to 365 days (Enterprise edition: up to 90 days). Hot backups are listed for both Enterprise and Enterprise Plus in the editions overview.

## Signature / Usage

The backups overview has no code block. Step-by-step backup, copy and restore procedures are in "Manage backups", which is not part of this page; the commands below come from the gcloud reference and the access control page.

### Create a standard or hot backup

Standard backup that expires in 2 weeks (example from the gcloud reference):

```bash
gcloud bigtable backups create BACKUP_NAME \
    --instance=INSTANCE_NAME --cluster=CLUSTER_NAME \
    --table=TABLE_NAME --retention-period=2w
```

Hot backup that expires in 2 weeks (example from the gcloud reference):

```bash
gcloud bigtable backups create BACKUP_NAME \
    --instance=INSTANCE_NAME --cluster=CLUSTER_NAME \
    --table=TABLE_NAME --retention-period=2w --backup-type=HOT
```

### Restore to a new table

Restore table `table2` from backup `backup1` (example from the gcloud reference):

```bash
gcloud bigtable instances tables restore \
    --source-instance=instance1 --source-cluster=cluster1 \
    --source=backup1 --destination-instance=instance1 \
    --destination=table2
```

### List backups in an instance

Adapted (not in the official docs): `--instances` is changed to `--instance`; `gcloud bigtable backups list` has no `--instances` flag (gcloud 593.0.0 reports it as unrecognized).

```bash
gcloud bigtable backups list --instance=INSTANCE_ID
```

## Options / Props

### Backup actions and destinations

The destination project, instance and cluster must already exist.

| Action | Destination options |
|---|---|
| Create a standard backup | Any cluster in the same instance as the source table |
| Create a hot backup | Any cluster in the same instance as the source table; the instance must use SSD storage |
| Restore from a standard or hot backup to a new table | Any instance, any Bigtable region, any project |
| Copy a backup | Any instance, any Bigtable region, any project |

### Limits and retention

| Item | Value |
|---|---|
| Backups per table per cluster | Up to 150 |
| Default retention (automated backup) | 7 days |
| Automated backup policy retention | Up to 90 days (Enterprise and Enterprise Plus) |
| On-demand backup retention (create or update) | Up to 90 days (Enterprise), up to 365 days (Enterprise Plus) |
| Backup copy retention | Maximum 30 days from the time the copy is created |
| Hot-to-standard transition time (on-demand hot backup) | Optional; if set, at least 24 hours after the backup creation start time |
| Keep-hot duration (hot automated backup, SSD) | Required; 24 hours to 10 days, not exceeding the policy's retention period |
| Backup frequency per table | Not more than once every five minutes |
| Backup creation time | Usually under a minute, up to one hour |

### Required IAM permissions

| Action | Permission |
|---|---|
| Create a backup | `bigtable.tables.readRows`, `bigtable.backups.create` |
| Get a backup | `bigtable.backups.get` |
| List backups | `bigtable.backups.list` |
| Delete a backup | `bigtable.backups.delete` |
| Update a backup | `bigtable.backups.update` |
| Copy a backup | `bigtable.backups.read`, `bigtable.backups.create` |
| Restore from a backup to a new table | `bigtable.tables.create`, `bigtable.backups.restore` |
| Get / list operations | `bigtable.instances.get` |

### Limitations

- Hot backups: a hot backup can become standard but not the reverse; SSD instances only; not supported for tables with tiered storage; a copy of a hot backup is always standard.
- General: cannot read directly from a backup; backups are not a consistent state across clusters; one table per operation; cannot export, copy or move a backup to another service such as Cloud Storage; cannot back up a view.
- Restoring: cannot restore to an existing table; the destination instance must already exist; deleting a table just restored to an SSD cluster can take a while (optimization must finish).
- Copying: cannot copy a backup within 24 hours of expiring; cannot copy a backup copy.
- CMEK: a CMEK-protected backup must be restored to a new table in a CMEK-protected instance, and a copy's destination cluster must also be CMEK-protected. A backup is pinned to the primary key version at creation and its key cannot change afterward; that key version must be enabled to restore.

## Notes

- Deleting a cluster that holds backups, a cluster listed in a table's automated backup policy, or an instance with backups in any cluster is blocked. Deleting backups is destructive; try deletions on a disposable resource first.
- Backups are incremental (share physical storage with the table and other backups), not charged for create/copy/restore operations; standard network costs apply. Hot backups are charged the hot backup storage rate for the whole logical table copy; copying across regions incurs network charges.
- Writes shortly before or during a backup, or not yet replicated to the backup's cluster, might not be included; use a consistency token on writes if that is unacceptable.
- Restore: a new table does not inherit garbage collection policies; configure them before writing new data. Wait at least an hour after creation before restoring from a standard backup (use a hot backup for faster restore). Wait for one restore to complete before starting another for the same source table in the same zone. SSD tables may show higher read latency while being optimized.
- Backup storage does not count toward the project node storage limit. Backup data is encrypted.
- Wide-column NoSQL database; not a relational database.
- The source also shows disaster recovery scenario tables and cost discussion beyond what is summarized here.
- Source: https://docs.cloud.google.com/bigtable/docs/backups (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/bigtable/backups/create (standard and hot backup examples).
- Snippet taken from https://docs.cloud.google.com/sdk/gcloud/reference/bigtable/instances/tables/restore
- Corrected from the official docs: the access control page lists backups with `gcloud bigtable backups list --instances=INSTANCE_ID`; the flag is `--instance` (https://docs.cloud.google.com/sdk/gcloud/reference/bigtable/backups/list).
- Snippet taken from https://docs.cloud.google.com/bigtable/docs/access-control (`backups list`, backup-level IAM section).
- Source: https://docs.cloud.google.com/bigtable/docs/access-control (snippet only; retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [access-control.md](./access-control.md)
- [authentication-and-cmek.md](./authentication-and-cmek.md)
