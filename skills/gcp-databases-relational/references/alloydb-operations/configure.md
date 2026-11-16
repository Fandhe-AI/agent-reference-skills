---
source: https://docs.cloud.google.com/alloydb/docs/backup/configure
---

# Configure backup plans

Adjust the default 14-day continuous backup configuration, or set up an independent automated backup schedule, on an AlloyDB for PostgreSQL cluster. Console steps exist for each task; this page keeps the gcloud forms.

## Signature / Usage

### Configure continuous backup and recovery

If you decrease the recovery window, AlloyDB immediately shortens how far back you can perform PITR (14 to 7 days: points older than 7 days become unavailable). If you increase it, the available span grows in real time until it reaches the new limit (7 to 14 days takes 7 more days). After configuring the plan it can take up to 24 hours for the first backup and for continuous recovery to be enabled; take an on-demand backup afterwards to accelerate this and avoid data loss.

```bash
gcloud alloydb clusters update CLUSTER_ID \
  --continuous-backup-recovery-window-days=WINDOW_LENGTH \
  --region=REGION_ID \
  --project=PROJECT_ID
```

To encrypt continuous backups and data-change logs with a specific CMEK instead of the cluster's encryption configuration, add `--continuous-backup-encryption-key`, `--continuous-backup-encryption-key-keyring`, `--continuous-backup-encryption-key-location` and `--continuous-backup-encryption-key-project` (see Options).

### Disable continuous backup and recovery

PITR becomes unavailable for the cluster until continuous backup is re-enabled.

```bash
  gcloud alloydb clusters update CLUSTER_ID \
      --no-enable-continuous-backup \
      --region=REGION_ID \
      --project=PROJECT_ID
```

### Re-enable continuous backup

The recovery window begins with the first subsequent backup AlloyDB creates. Create an on-demand backup right after re-enabling to make PITR available sooner; otherwise the window starts with the next daily backup.

```bash
gcloud alloydb clusters update CLUSTER_ID \
    --enable-continuous-backup \
    --continuous-backup-recovery-window-days=WINDOW_LENGTH \
    --region=REGION_ID \
    --project=PROJECT_ID
```

### Enable and configure automated backups

With gcloud you must specify a backup schedule; everything else is optional and takes the defaults. Each run of this command completely replaces the cluster's current automated backup configuration.

> Warning: When you run the `gcloud alloydb clusters update` command to configure automated backups, you replace the cluster's entire existing automated backup policy with the new settings you provide.

```bash
gcloud alloydb clusters update CLUSTER_ID \
    --automated-backup-days-of-week=DAYS_LIST \
    --automated-backup-start-times=UTC_TIMES_LIST \
    --region=REGION_ID \
    --project=PROJECT_ID
```

Example: automated backup at midnight UTC every Monday and Thursday.

```bash
gcloud alloydb clusters update my-cluster \
    --automated-backup-days-of-week=MONDAY,THURSDAY \
    --automated-backup-start-times=00:00 \
    --region=us-central1 \
    --project=my-project
```

Retention policy: add either `--automated-backup-retention-period=DURATION` (a duration string per `gcloud topic datetimes`, up to one year) or `--automated-backup-retention-count=COUNT` (integer >= 1, retained for up to one year). CMEK for scheduled backups: `--automated-backup-encryption-key=KEY_ID`, `--automated-backup-encryption-key-keyring=KEYRING_ID`, `--automated-backup-encryption-key-location=LOCATION_ID` (must match the cluster's region), `--automated-backup-encryption-key-project=PROJECT_ID`.

### Disable automated backups

```bash
gcloud alloydb clusters update CLUSTER_ID \
    --disable-automated-backup \
    --region=REGION_ID \
    --project=PROJECT_ID
```

### View backup plans

Run `gcloud alloydb clusters describe` (https://docs.cloud.google.com/alloydb/docs/cluster-view#gcloud). `continuousBackupConfig` and `continuousBackupInfo` summarize continuous backup (enabled, window size, encryption; schedule is always one backup per day). `automatedBackupPolicy` summarizes the automated schedule and encryption.

## Options / Props

### Prerequisites

- The project must be enabled to access AlloyDB.
- One of these IAM roles: `roles/alloydb.admin` (AlloyDB Admin), `roles/owner`, `roles/editor`.

### gcloud arguments

| Argument | Description |
|---|---|
| `CLUSTER_ID` | ID of the cluster. |
| `WINDOW_LENGTH` | Continuous backup and recovery window in days, `1` to `35` inclusive; optional, default 14. Defines the maximum PITR distance into the past and how long continuous backups and data-change logs are retained. AlloyDB retains them one day longer than the specified value. |
| `REGION_ID` | Region of the cluster. |
| `PROJECT_ID` | Project of the cluster. |
| `DAYS_LIST` | Comma-separated: `MONDAY`, `TUESDAY`, `WEDNESDAY`, `THURSDAY`, `FRIDAY`, `SATURDAY`, `SUNDAY`. |
| `UTC_TIMES_LIST` | Comma-separated start times, format `HH:00` on a 24-hour cycle in UTC. |
| `--continuous-backup-encryption-key` | ID of the CMEK key. |
| `--continuous-backup-encryption-key-keyring` | ID of the key's keyring. |
| `--continuous-backup-encryption-key-location` | Keyring's region; must match the cluster's region. |
| `--continuous-backup-encryption-key-project` | Keyring's project ID. |

### Automated backup configuration attributes

Each cluster has one customizable automated backup configuration:

| Attribute | Detail |
|---|---|
| Schedule | Specific days of the week and times on those days. |
| Retention policy | Amount of time or number of backups to keep; default 14 days. Older backups are subject to automated deletion. |
| Timeout | Time before an incomplete attempt to take a new automated backup is canceled; default one hour. |
| Encryption | The cluster's encryption configuration (Google-managed or cluster CMEK), or a specific CMEK. |

Enabling automated backups from the console applies a default schedule of one automated backup per day with a 14-day retention window; the console can't set a schedule or other configuration.

## Notes

- Destructive/impactful: shrinking the recovery window immediately removes older recovery points, disabling continuous backup makes PITR unavailable, and an automated backup update replaces the whole existing policy. Try these on a disposable cluster first.
- The source also shows a sample `gcloud alloydb clusters describe` YAML output (`automatedBackupPolicy`, `continuousBackupConfig`, `continuousBackupInfo`), omitted here.
- The source also shows Console steps for every task and links to Using CMEK with AlloyDB (https://docs.cloud.google.com/alloydb/docs/use-cmek) for the extra setup CMEK needs.
- By default, AlloyDB copies automated and continuous backup configurations to a newly created secondary cluster (see about-cross-region-replication.md).
- Managed PostgreSQL-compatible database on Google Cloud, distinct from Supabase Postgres (`supabase`), Cloudflare D1 / Hyperdrive (`cloudflare-storage`), and the Node.js client `mssql` / ORM `drizzle` (those skills cover client code, not the managed service).
- Source: https://docs.cloud.google.com/alloydb/docs/backup/configure (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [overview.md](./overview.md)
- [restore.md](./restore.md)
- [restore-pitr.md](./restore-pitr.md)
- gcloud alloydb clusters update: https://docs.cloud.google.com/sdk/gcloud/reference/alloydb/clusters/update
- Create an on-demand backup: https://docs.cloud.google.com/alloydb/docs/backup/create-on-demand
