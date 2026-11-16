---
source: https://docs.cloud.google.com/memorystore/docs/valkey/manage-backups
---

# Manage backups

Create on-demand backups, configure automated backup schedules, list, describe, delete and export backups, and restore by seeding a new instance from a managed backup or from RDB files in a Cloud Storage bucket.

## Signature / Usage

### Create an on-demand backup

```bash
gcloud memorystore instances backup INSTANCE_ID \
--backup-id=BACKUP_ID \
--ttl=TTL_PERIOD \
--project=PROJECT_ID \
--location=REGION_ID
```

The command returns an operation name (`projects/PROJECT_ID/locations/REGION_ID/operations/operation-UID`); check it with `gcloud memorystore operations describe`. List all operations in a project and region:

Adapted (not in the official docs): the source passes `--projects=PROJECT_ID`, which gcloud rejects as an unrecognized argument; the flag is `--project`.

```bash
gcloud memorystore operations list --project=PROJECT_ID \
--location=REGION_ID
```

### Automated backup schedule (enable on an existing instance, or deactivate)

At creation, pass the same three `--automated-backup-config-mode` / `--fixed-frequency-schedule-start-time-hours` / `--automated-backup-config-retention` flags, together with `--location=REGION_ID`, to `gcloud memorystore instances create`.

Adapted (not in the official docs): added `--location=REGION_ID`; without it gcloud fails with "Error parsing [instance]".

```bash
gcloud memorystore instances update INSTANCE_ID \
--location=REGION_ID \
--automated-backup-config-mode=enabled \
--fixed-frequency-schedule-start-time-hours=START_TIME \
--automated-backup-config-retention=RETENTION_POLICY
```

Adapted (not in the official docs): added `--location=REGION_ID`; without it gcloud fails with "Error parsing [instance]".

```bash
gcloud memorystore instances update INSTANCE_ID \
--location=REGION_ID \
--automated-backup-config-mode=disabled
```

### List and describe

List the backup collections with `gcloud memorystore backup-collections list --project=PROJECT_ID --location=REGION_ID`, then the backups of one collection:

Adapted (not in the official docs): added the missing line-continuation backslash after `--backup-collection=BACKUP_COLLECTION`; without it the remaining flags run as a separate command.

```bash
gcloud memorystore backup-collections backups list \
--backup-collection=BACKUP_COLLECTION \
--project=PROJECT_ID \
--location=REGION_ID
```

Describe one backup with `gcloud memorystore backup-collections backups describe BACKUP_NAME` and the same three flags.

### Delete a backup (destructive)

```bash
gcloud memorystore backup-collections backups delete BACKUP_NAME \
--backup-collection=BACKUP_COLLECTION \
--project=PROJECT_ID \
--location=REGION_ID
```

### Export a backup to Cloud Storage

Grant the Memorystore for Valkey service agent (`service-PROJECT_NUMBER@gcp-sa-memorystore.iam.gserviceaccount.com`, where PROJECT_NUMBER is the project number, not the project ID) access to the bucket. The role needs `storage.buckets.get`, `storage.objects.create`, `storage.objects.delete` and `storage.folders.create`. The source's command below grants `roles/storage.admin`, which is broader than these permissions; for least privilege, grant a custom role with only the listed permissions instead.

```bash
gcloud storage buckets add-iam-policy-binding gs://BUCKET_NAME \
--member=serviceAccount:service-PROJECT_NUMBER@gcp-sa-memorystore.iam.gserviceaccount.com \
--role=roles/storage.admin
```

```bash
gcloud memorystore backup-collections backups export BACKUP_NAME \
--backup-collection=BACKUP_COLLECTION \
--location=REGION_ID \
--gcs-bucket=BUCKET_NAME
```

### Seed a new instance from a managed backup

Adapted (not in the official docs): the source passes `--psc-auto-connections=NETWORK` with NETWORK in `projects/NETWORK_PROJECT_ID/global/networks/NETWORK_ID` form, which gcloud rejects ("valid keys are [network, port, projectId]"); the value now uses the `network=...,projectId=...` keys.

```bash
gcloud memorystore instances create INSTANCE_ID \
--managed-backup-source=BACKUP_NAME \
--location=REGION_ID \
--shard-count=SHARD_COUNT \
--engine-version=ENGINE_VERSION \
--psc-auto-connections=network=NETWORK,projectId=PROJECT_ID
```

### Seed a new instance from RDB files in Cloud Storage

Grant the service agent a role with `storage.buckets.get` and `storage.objects.get` on the bucket (the source uses the same `gcloud storage buckets add-iam-policy-binding ... --role=roles/storage.admin` command as in the export section), then:

```bash
gcloud memorystore instances create INSTANCE_ID \
--gcs-source-uris=URI \
--location=REGION_ID \
--node-type=NODE_TYPE \
--shard-count=SHARD_COUNT
```

## Options / Props

| Name | Description |
|------|-------------|
| `TTL_PERIOD` | Number of days, e.g. `14d`; minimum 1 day; default 100 years if unset. |
| `START_TIME` | Hour in `HH` on a 24-hour cycle in UTC, e.g. `23`; designates a one-hour window. |
| `RETENTION_POLICY` | Days to retain each backup, e.g. `7d`; maximum 365 days, default 35 days. |
| `BACKUP_NAME` (managed source) | `projects/PROJECT_ID/locations/REGION_ID/backupCollections/BACKUP_COLLECTION_ID/backups/BACKUP_ID`. |
| `SHARD_COUNT` | 1 to 250. |
| `ENGINE_VERSION` | `VALKEY_7_2`, `VALKEY_8_0`, `VALKEY_9_0`, `VALKEY_9_1` (default `VALKEY_9_1`); cannot be downgraded later. |
| `NETWORK` | `projects/NETWORK_PROJECT_ID/global/networks/NETWORK_ID`; must match the network of the service connection policy. |
| `PROJECT_ID` (`projectId=`) | Consumer project of the PSC connections; per the gcloud help, the project the instance is created in. |
| `URI` | Comma-separated Cloud Storage URIs, e.g. `gs://my-bucket/folder/file1.rdb,gs://my-bucket/folder/file2.rdb`. |
| `NODE_TYPE` | Optional; default `highmem-medium`. |
| Roles | Memorystore Admin can perform all backup operations; Memorystore Viewer can view (`memorystore.backups.get`, `.list`) backups; exporting needs `memorystore.backups.export` (Memorystore Admin, or the basic Editor / Owner role). |
| Restore permission | Principal creating the instance needs `memorystore.backups.get` on the backup. |

## Notes

- Export bucket: a regional bucket in the same region as the backup; exporting does not delete the backup. RDB import bucket: regional in the backup's region, or dual-region with one region matching.
- Restore seeds only a new instance in the same project/region as the backup; do not decrease node type, shard count or replicas from the backup values, or the import may fail. A Cluster Mode Enabled instance supports only one database, so a multi-database backup cannot be imported into it.
- Scheduled backups can be enabled on an existing instance only if no daily schedule was set at creation. Updates and maintenance can cancel or skip backups; backups are rejected while an instance update is running.
- After instance deletion, backups are kept for the retention period (max 365 days); delete manually to remove earlier. Deleting a backup does not affect instances already seeded from it. Delete is destructive; try it on a disposable resource first.
- `roles/storage.admin` is the source's example and is broader than needed; any role containing the permissions listed above suffices, so prefer a custom role with exactly those permissions (export: `storage.buckets.get`, `storage.objects.create`, `storage.objects.delete`, `storage.folders.create`; RDB import: `storage.buckets.get`, `storage.objects.get`). The example output of `describe` (backupFiles, expireTime, nodeType, shardCount, state) is omitted.
- `--psc-auto-connections` is marked "Deprecated: Use the endpoints.connections.psc_auto_connection value instead." in the gcloud help (SDK 593.0.0); the create-instances page (https://docs.cloud.google.com/memorystore/docs/valkey/create-instances) uses `--endpoints`.
- The source also shows Console steps, the automated-backup `create`, `operations describe`, `backup-collections list` and `backups describe` command blocks (summarized in prose above) and a second, identical `gcloud storage buckets add-iam-policy-binding` block for the RDB import bucket. Monitor with Cloud Monitoring backup metrics.
- Memorystore for Valkey is managed Valkey on Google Cloud, distinct from Upstash Redis (`upstash`) and Cloudflare Workers KV (`cloudflare-storage`).
- Corrected from the official docs: the source says "Memorystore Admin and Editor" can perform all backup operations and Memorystore Viewer can export backups. the IAM roles reference (`references/iam/memorystore.md`) has no `roles/memorystore.editor`, and `memorystore.backups.export` is not in `roles/memorystore.viewer`; the Roles row follows the IAM reference.
- Source: https://docs.cloud.google.com/memorystore/docs/valkey/manage-backups (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Corrected from the official docs: `gcloud memorystore operations list --projects=PROJECT_ID`; the automated backup `update` examples (and the omitted `create` example) without `--location`; `--psc-auto-connections=NETWORK`; and the "list backups" example without a trailing `\` after `--backup-collection=BACKUP_COLLECTION`. The source's RDB import bucket binding (omitted here) also lacks `\` after `gs://BUCKET_NAME` and the `--member` line.

## Related

- [backups.md](./backups.md)
- [manage-persistence.md](./manage-persistence.md)
