---
source: https://docs.cloud.google.com/sql/docs/postgres/backup-recovery/pitr
---

# Use point-in-time recovery (PITR)

PITR restores a primary Cloud SQL instance, live or deleted, to a specific point in time. PITR always creates a new instance; you cannot perform a PITR onto an existing instance. Options: live instance, backup vault (enhanced backups), unavailable instance, deleted instance.

## Signature / Usage

### PITR on a live instance (clone)

Replace SOURCE_INSTANCE_NAME (instance to restore from), NEW_INSTANCE_NAME (name for the clone) and TIMESTAMP (UTC, RFC 3339, for example 2012-11-15T16:19:00.094Z).

```bash
gcloud sql instances clone SOURCE_INSTANCE_NAME \
NEW_INSTANCE_NAME \
--point-in-time 'TIMESTAMP'
```

REST v1 (`POST https://sqladmin.googleapis.com/v1/projects/project-id/instances/source-instance-id/clone`) request body:

```json
{
  "cloneContext":
  {
    "kind": "sql#cloneContext",
    "destinationInstanceName": "target-instance-id",
    "pointInTime": "restore-timestamp"
  }
}
```

```bash
curl -X POST \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d @request.json \
     "https://sqladmin.googleapis.com/v1/projects/project-id/instances/source-instance-id/clone"
```

### PITR using the backup vault (enhanced backups)

Find the `data-source` of the backup nearest to the target time, then run:

```bash
gcloud sql instances point-in-time-restore DATA_SOURCE \
    TARGET_INSTANCE_NAME \
    'PITR_TIMESTAMP' \
    --project=TARGET_PROJECT \
    --region=REGION
```

REST: `POST https://sqladmin.googleapis.com/v1/projects/PROJECT_ID:pointInTimeRestore` with body:

Adapted (not in the official docs): field renamed to `targetInstance` and path changed to `/v1/` to match the Admin API discovery document.

```json
{
  "datasource": "DATASOURCE",
  "pointInTime": "PITR_TIMESTAMP",
  "targetInstance": "TARGET_INSTANCE_NAME",
  "region": "REGION"
}
```

### PITR on an unavailable instance (different zone)

```bash
gcloud sql instances clone SOURCE_INSTANCE_NAME TARGET_INSTANCE_NAME \
--point-in-time DATE_AND_TIME_STAMP \
--preferred-zone ZONE_NAME \
--preferred-secondary-zone SECONDARY_ZONE_NAME
```

### PITR on a deleted instance

Standard backup:

```bash
gcloud sql instances clone SOURCE_INSTANCE_NAME \
NEW_INSTANCE_NAME \
--point-in-time='PITR_TIMESTAMP' \
--source-instance-deletion-time=SOURCE_INSTANCE_DELETION_TIMESTAMP
```

Enhanced backup: use `gcloud sql instances point-in-time-restore DATA_SOURCE ...` as above, with the `data-source` of the deleted instance's backup.

Adapted (not in the official docs): the source request body is missing the closing quote after `sourceInstanceDeletionTime`, which makes the JSON invalid.

```json
{
  "cloneContext":
  {
    "kind": "sql#cloneContext",
    "destinationInstanceName": "target-instance-id",
    "sourceInstanceDeletionTime": "source-instance-deletion-time",
    "pointInTime": "restore-timestamp"
  }
}
```

### Get the earliest and latest recovery time

```bash
gcloud sql instances get-latest-recovery-time INSTANCE_NAME
```

```bash
gcloud sql instances get-latest-recovery-time INSTANCE_NAME \
    --source-instance-deletion-time='SOURCE_INSTANCE_DELETION_TIMESTAMP'
```

REST (unavailable instance): `GET https://sqladmin.googleapis.com/v1/projects/PROJECT_ID/instances/INSTANCE_NAME/getLatestRecoveryTime` returns:

```json
{
  "kind": "sql#getLatestRecoveryTime",
  "earliestRecoveryTime": "2023-06-10T17:23:59.648821586Z",
  "latestRecoveryTime": "2023-06-20T17:23:59.648821586Z"
}
```

## Options / Props

| Name | Description |
|------|-------------|
| `TIMESTAMP` / `PITR_TIMESTAMP` / `DATE_AND_TIME_STAMP` | UTC timestamp in RFC 3339 format |
| `DATA_SOURCE` | Path of the `data-source` closest to the PITR timestamp |
| `TARGET_PROJECT` | Project ID for the new instance (set `--project` / `PROJECT_ID` for cross-project PITR; gcloud CLI and REST only) |
| `REGION` | Target region; must match the source instance's region. Required if the data source is in a multi-region (gcloud text also: or a different region than the source) |
| `--preferred-zone` / `preferredZone` | Primary zone of the target; for regional instances replaces the primary zone, secondary stays the same |
| `--preferred-secondary-zone` / `preferredSecondaryZone` | Secondary zone of the target for a regional instance |
| `--source-instance-deletion-time` / `sourceInstanceDeletionTime` | Deletion time of the source instance (RFC 3339) |

Required permissions for clone: `cloudsql.instances.clone` and `cloudsql.instances.create`.

### Troubleshooting

| Error | Cause |
|-------|-------|
| `Failed to parse date/time` / `Invalid time format` | The timestamp is invalid |
| `Successful backup required for carrying out the operation was not found.` | No backup or binlog coordinates exist for that time |

## Notes

- Enabling PITR: `--enable-point-in-time-recovery` (create; `--[no-]enable-point-in-time-recovery` on `patch`; needs automated backups) and `--retained-transaction-log-days` (1–35; Enterprise default / max 7 / 7, Enterprise Plus 14 / 35) per the gcloud help and https://docs.cloud.google.com/sql/docs/postgres/create-instance; PITR is on by default for Enterprise Plus instances, and for Enterprise instances only when created in the console (gcloud, Terraform and the Admin API leave it off) per the create-instance page; enabling or disabling PITR restarts the instance (https://docs.cloud.google.com/sql/docs/postgres/instance-settings). See `create-instance.md` in `cloud-sql-instances`.
- PITR creates a new instance, so it does not overwrite an existing instance. A time after the latest recovery time fails with "The timestamp for point-in-time recovery is after the latest recovery time ...".
- With enhanced backups via Terraform or the Cloud SQL API, Cloud SQL uses the PITR settings from the associated backup plan. With a backup vault in a different region, PITR is only to a new instance in the source instance's region.
- For an unavailable instance (state `FAILED` or `MAINTENANCE`) or a deleted instance with PITR retention enabled, you can read the recovery window and restore within it. PITR on a deleted instance works only through the gcloud CLI or API; you need the PITR timestamp, target instance name and source instance deletion time (`source-instance-deletion-time` and `log-retention-days` are stored with retained backups).
- Source inconsistency: the v1beta4 "deleted instance" `getLatestRecoveryTime` example shows a `/v1/` URL and omits the deletion-time parameter even though `SOURCE_INSTANCE_DELETION_TIME` is listed; gcloud uses `--source-instance-deletion-time`.
- Forms omitted: Console steps, PowerShell, REST v1beta4 (same bodies under `/sql/v1beta4/`), and sample JSON responses.
- Not destructive itself (creates a new instance), but cloning and restoring bill a new instance; try on a disposable resource first.
- Cloud SQL pages describe managed PostgreSQL / MySQL / SQL Server on Google Cloud, distinct from Supabase Postgres (`supabase`), Cloudflare D1 / Hyperdrive (`cloudflare-storage`), and the Node.js client `mssql` / ORM `drizzle` (those skills cover client code, not the managed service).
- Corrected from the official docs: the deleted-instance REST body had `"sourceInstanceDeletionTime: "source-instance-deletion-time"` (missing closing quote).
- Corrected from the official docs: the backup-vault PITR request used `"targetInstanceName": "TARGET_INSTANCE_NAME"` and `POST https://sqladmin.googleapis.com/sql/v1/projects/PROJECT_ID:pointInTimeRestore`; the `PointInTimeRestoreContext` field is `targetInstance` and the v1 method path is `v1/{+parent}:pointInTimeRestore` (Cloud SQL Admin API v1 discovery document).
- Source: https://docs.cloud.google.com/sql/docs/postgres/backup-recovery/pitr (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/sql/docs/postgres/create-instance (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/sql/docs/postgres/instance-settings (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [restore.md](./restore.md)
- [restoring.md](./restoring.md)
- [backups.md](./backups.md)
- [backup-options.md](./backup-options.md)
