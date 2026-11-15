---
source: https://docs.cloud.google.com/alloydb/docs/backup/restore
---

# Restore a cluster from a backup

Recover an AlloyDB for PostgreSQL cluster to the state it was in when a backup was taken, even if the original cluster was deleted, by restoring a new cluster from a stored backup.

## Signature / Usage

### Restore a backup to a new cluster

Create the new cluster in the same region as the backup. It can be in a different project (use the gcloud form and set `--project` to the destination project; cross-project restores aren't supported in the console). AlloyDB creates the cluster and restores the data; then you create an instance in it.

```bash
gcloud alloydb clusters restore CLUSTER_ID \
    --backup=BACKUP_ID \
    --network=NETWORK \
    --region=REGION_ID \
    --project=PROJECT_ID \
    --async
```

The command returns an operation. Query its status:

```bash
gcloud alloydb operations describe OPERATION_ID \
    --region=REGION_ID \
    --project=PROJECT_ID
```

For a Private Service Connect cluster add `--enable-private-service-connect`. For CMEK add `--kms-key`, `--kms-keyring`, `--kms-location`, `--kms-project` (see Options).

### Restore a cross-regional backup

1. Create an on-demand backup in the target region.
2. Restore that on-demand backup to a new cluster in the target region.

### After the restore

1. When AlloyDB finishes creating the cluster, create a primary instance (https://docs.cloud.google.com/alloydb/docs/instance-primary-create). AlloyDB does not store instance configuration (size, flags) in the backup, so specify it again; it need not match the original.
2. Optionally set up read-pool instances (https://docs.cloud.google.com/alloydb/docs/instance-read-pool-create).

## Options / Props

| Argument | Description |
|---|---|
| `CLUSTER_ID` | ID of the cluster to create. |
| `BACKUP_ID` | ID of the backup to restore. For a backup in another project use `projects/SOURCE_PROJECT/locations/SOURCE_REGION/backups/SOURCE_BACKUP`. |
| `NETWORK` | VPC network the new cluster is accessible from. |
| `REGION_ID` | Region where the source backup is stored and the new cluster is created. |
| `PROJECT_ID` | Project of the new cluster. |
| `--kms-key=KEY_ID` | CMEK key ID (instead of Google-managed encryption). |
| `--kms-keyring=KEYRING_ID` | Key ring ID. |
| `--kms-location=LOCATION_ID` | Key ring's region; must match the cluster's region. |
| `--kms-project=PROJECT_ID` | Key ring's project ID. |

### Prerequisites

- Project enabled to access AlloyDB.
- One of `roles/alloydb.admin`, `roles/owner`, `roles/editor`.
- All of these permissions: `compute.networks.list`, `compute.addresses.create`, `compute.addresses.list`, `compute.globalAddresses.create`, `compute.globalAddresses.list`, `servicenetworking.services.addPeering`. The AlloyDB Admin role includes these and `alloydb.clusters.restore`.

## Notes

- The restore creates a new cluster and starts a long-running operation; it does not overwrite the source. Costs accrue for the new cluster. Try it on a disposable cluster first and delete test clusters afterwards.
- The source also shows the Console flow (Backups page, Restore, Cluster ID, Network, CMEK under Advanced encryption options).
- The source's gcloud fences have no language tag; `bash` was added.
- Managed PostgreSQL-compatible database on Google Cloud, distinct from Supabase Postgres (`supabase`), Cloudflare D1 / Hyperdrive (`cloudflare-storage`), and the Node.js client `mssql` / ORM `drizzle` (those skills cover client code, not the managed service).
- Source: https://docs.cloud.google.com/alloydb/docs/backup/restore (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [overview.md](./overview.md)
- [restore-pitr.md](./restore-pitr.md)
- [configure.md](./configure.md)
- gcloud alloydb clusters restore: https://docs.cloud.google.com/sdk/gcloud/reference/alloydb/clusters/restore
