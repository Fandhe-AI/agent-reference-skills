---
source: https://docs.cloud.google.com/alloydb/docs/backup/restore-pitr
---

# Restore a cluster to a point in time

Use point-in-time recovery (PITR) to restore an AlloyDB for PostgreSQL cluster to a specific state from the recent past, for example after accidental data modification or large-scale data loss. The restore creates a new cluster.

## Signature / Usage

### Perform a point-in-time restore

```bash
gcloud alloydb clusters restore NEW_CLUSTER \
  --source-cluster=SOURCE_CLUSTER \
  --point-in-time=TIMESTAMP \
  --region=REGION
```

The command returns an operation. Query its status:

```bash
gcloud alloydb operations describe OPERATION_ID \
  --region=REGION
```

After AlloyDB finishes creating the cluster, create a primary instance for it (https://docs.cloud.google.com/alloydb/docs/instance-primary-create); its configuration need not match the original. Optionally create read-pool instances. You can use the cluster after the restore operation completes.

To restore to a cluster with Private Service Connect enabled, add `--enable-private-service-connect`. For CMEK add `--kms-key`, `--kms-keyring`, `--kms-location`, `--kms-project`.

## Options / Props

| Argument | Description |
|---|---|
| `NEW_CLUSTER` | ID for the new cluster. |
| `SOURCE_CLUSTER` | ID of the cluster to recover from. For another project: `projects/SOURCE_PROJECT/locations/SOURCE_REGION/clusters/SOURCE_CLUSTER`. |
| `TIMESTAMP` | Point in time, RFC 3339, e.g. `2012-11-15T16:19:00.094Z`; fractional seconds down to a microsecond. Must exist within the retention period specified when you created the cluster. |
| `REGION` | Region containing the source cluster, where the new cluster is created, e.g. `us-central1`. |
| `PROJECT_ID` | Project of the new cluster (described in the source; not used in its command). |
| `--kms-key=KEY_ID` | CMEK key ID. |
| `--kms-keyring=KEYRING_ID` | Key's key ring ID. |
| `--kms-location=LOCATION_ID` | Key ring's region; must match the cluster's region. |
| `--kms-project=PROJECT_ID` | Key ring's project ID. |

### Available PITR window

You can restore from any point after the more recent of:

- The limit of your recovery window (e.g. 14 days in the past for a 14-day window).
- The creation time of the oldest backup taken since you last enabled continuous backup.

### Prerequisites

- Project enabled to access AlloyDB.
- One of `roles/alloydb.admin`, `roles/owner`, `roles/editor`.
- All of: `compute.networks.list`, `compute.addresses.create`, `compute.addresses.list`, `compute.globalAddresses.create`, `compute.globalAddresses.list`, `servicenetworking.services.addPeering`. The AlloyDB Admin role includes these and `alloydb.clusters.restore`.

## Notes

- If you disable and re-enable continuous backup, PITR is unavailable until you or AlloyDB create the cluster's first new backup (an on-demand backup, or the first daily backup after enabling).
- PITR works only if the original cluster exists; it can't be used on a deleted cluster. A ready cluster whose primary instance was deleted can be restored, but only to a point before the instance was deleted.
- PITR is paused for the original primary cluster during a cross-region failover; coverage resumes after it becomes the secondary cluster and a new baseline backup is established.
- Source inconsistency: the Replace list describes `PROJECT_ID`, but the command has no `--project` flag, and the Console flow selects a VPC network while the gcloud example has no `--network`. The block is kept verbatim.
- The restore creates a new cluster and a long-running operation; try it on a disposable cluster first and delete test clusters afterwards.
- The source also shows the Console flow (Data protection > Restore from a point in time).
- Managed PostgreSQL-compatible database on Google Cloud, distinct from Supabase Postgres (`supabase`), Cloudflare D1 / Hyperdrive (`cloudflare-storage`), and the Node.js client `mssql` / ORM `drizzle` (those skills cover client code, not the managed service).
- Source: https://docs.cloud.google.com/alloydb/docs/backup/restore-pitr (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [restore.md](./restore.md)
- [overview.md](./overview.md)
- [configure.md](./configure.md)
- gcloud alloydb clusters restore: https://docs.cloud.google.com/sdk/gcloud/reference/alloydb/clusters/restore
