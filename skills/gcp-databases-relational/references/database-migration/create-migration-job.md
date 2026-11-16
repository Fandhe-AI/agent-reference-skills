---
source: https://docs.cloud.google.com/database-migration/docs/postgres/create-migration-job
---

# Create a migration job (new destination instance)

Create a Database Migration Service migration job for PostgreSQL that also creates a new Cloud SQL for PostgreSQL destination instance: job settings, source profile and parallelism, destination instance, connectivity, databases to migrate, test and start. The gcloud flow creates a destination connection profile for a Cloud SQL instance (`--cloudsql-instance`), then the job.

## Signature / Usage

### gcloud: destination connection profile

Replace `DEST_CONN_ID`, `REGION` (same region as the destination instance), `DEST_INSTANCE` (the source describes it as the ID of your pre-created destination Cloud SQL instance) and `DEST_USER` with your values. `--prompt-for-password` asks for the password interactively.

Adapted (not in the official docs): replaced --password=DEST_PASSWORD with --prompt-for-password so the password is not stored in shell history.

```bash
gcloud database-migration connection-profiles create postgresql DEST_CONN_ID \
  --region=REGION \
  --cloudsql-instance=DEST_INSTANCE \
  --username=DEST_USER \
  --prompt-for-password \
  --role=DESTINATION \
  --no-async
```

### gcloud: migration job

Replace `MIGRATION_JOB_ID`, `REGION`, `MIGRATION_JOB_NAME`, `SOURCE_CONNECTION_PROFILE_ID`, `DESTINATION_CONNECTION_PROFILE_ID`. For VPC peering or reverse-SSH connectivity add flags such as `--peer-vpc`, or `--vm`, `--vm-ip`, `--vm-port`, `--vpc`.

```bash
gcloud database-migration migration-jobs \
create MIGRATION_JOB_ID \
  --no-async \
  --region=REGION \
  --display-name=MIGRATION_JOB_NAME \
  --source=SOURCE_CONNECTION_PROFILE_ID \
  --destination=DESTINATION_CONNECTION_PROFILE_ID \
  --type=CONTINUOUS
```

### Console wizard (summary)

Get started (name, ID, source engine PostgreSQL, region, one-time or continuous) → Define a source (connection profile, parallelism) → Define a destination (new instance) → Connectivity method → Databases to migrate → Test job → Create and start job.

## Options / Props

| Item | Detail |
|---|---|
| `--no-async` | Performs operations synchronously; without it use `gcloud database-migration operations describe` to verify success |
| `--type` | `CONTINUOUS` in the example; the console offers One-time or Continuous |
| `--databases-filter` | Comma-separated database IDs, e.g. `--databases-filter=my-business-database,my-other-database`; default migrates all databases; editable later with `migration-jobs update` |
| Region | Database Migration Service is fully regional: source and destination profiles, jobs and destination databases must be in one region; can't be changed after choosing |
| Parallelism: Optimal (recommended) | Up to 2 subscriptions per database, from a target pool of 10 across all databases (at least 1 per migrated database) |
| Parallelism: Maximum | Up to 4 subscriptions per database, same pool of 10; highest dump speed, more load on the source |
| Parallelism: Minimum | 1 subscription per database; lowest source load, slower dump |
| Destination instance password | Alphanumeric password of the `postgres` administrator account; enter or click Generate |
| Editions | Cloud SQL for PostgreSQL Enterprise or Enterprise Plus (Enterprise Plus: region support needed; optional data cache) |
| Storage | SSD or HDD; capacity can be increased at any time but not decreased |
| Connections | Public and/or private IP; at least one required |

| Connectivity method | What to provide |
|---|---|
| IP allowlist | Outgoing IP of the destination instance (for HA, both primary and secondary outgoing IPs) |
| Reverse SSH tunnel | The Compute Engine VM that hosts the tunnel; Google provides a script to run in the Google Cloud CLI from a machine that reaches both source and Google Cloud |
| VPC peering | The VPC network where the source resides; the Cloud SQL instance is updated to connect to it |

Private IP requirements for a new destination: Service Networking API enabled, `servicenetworking.services.addPeering` permission, private services access configured for your project (needs `compute.networkAdmin`), at least one non-legacy VPC network in your project or a Shared VPC network. With a Shared VPC network, also enable the Service Networking API for the host project, add your user to the host project, and give your user `compute.networkAdmin` in the host project.

## Notes

- Warning (destructive): the destination can't contain databases named like those you migrate; on a name collision the offending database is dropped in the destination before the migration. Try it on a disposable instance first.
- Warning: the new instance is billed from creation. Use Cancel to clean it up if you exit the flow; if you close the tab, click Save and exit or navigate away, the instance is not cleaned up and must be deleted manually from the Cloud SQL Instances page.
- The destination isn't demoted or read-only: avoid `INSERT` / `UPDATE` / `DELETE` and DDL on migrating tables; automated backups and PITR are suspended and read replicas can't be created until promotion.
- Private IP with a Database Migration Service-created destination supports only private services access (VPC peering); for PSC create the instance in Cloud SQL and use the existing-instance flow.
- Corrected from the official docs: the original passed "--password=DEST_PASSWORD"; gcloud 593.0.0 supports --prompt-for-password for this command (https://docs.cloud.google.com/sdk/gcloud/reference/database-migration/connection-profiles/create/postgresql).
- Source inconsistency: the source says this step creates the destination instance, but its own placeholder list describes DEST_INSTANCE as a pre-created Cloud SQL instance, and --cloudsql-instance takes an existing instance ID; gcloud database-migration connection-profiles create cloudsql is the command that creates a Cloud SQL destination.
- Choosing IP allowlist: exposes the source on a public IP; prefer PSC interfaces, VPC peering or a reverse-SSH tunnel (see networking-methods.md). Optional authorized networks are only authorized with the addresses you provide.
- CMEK optional: key resource name format `projects/my-project-name/locations/my-location/keyRings/my-keyring/cryptoKeys/my-key`; the Database Migration Service service account needs permission to use the key (Grant button).
- Not from the source: the gcloud flow above ends at `migration-jobs create`; the job still has to be started; gcloud 593.0.0 has `gcloud database-migration migration-jobs verify MIGRATION_JOB_ID --region=REGION` ("Verify a Database Migration Service migration job", the gcloud counterpart of the console's **Test job** step) and `gcloud database-migration migration-jobs start MIGRATION_JOB_ID --region=REGION`. Complete the connectivity prerequisites first (allowlist rules on the source, VPC peering / private services access, or the reverse-SSH VM) and run `verify` before `start`; `start` has a `--skip-validation` flag ("Start the migration job without running prior configuration verification"), so don't pass it until `verify` succeeds.
- Terraform users may see configuration drift; don't re-apply Terraform before the migration completes.
- Quotas: up to 2,000 connection profiles and 1,000 migration jobs per project at a time (see known-limitations.md).
- The source also shows detailed Console steps, Windows PowerShell / cmd.exe tabs and example output, omitted here.
- Cloud SQL / AlloyDB context: managed PostgreSQL on Google Cloud — distinct from Supabase Postgres (`supabase`), Cloudflare D1 / Hyperdrive (`cloudflare-storage`), and the `drizzle` / `mssql` client skills. gcloud install and auth: `gcp-cli`.
- Source: https://docs.cloud.google.com/database-migration/docs/postgres/create-migration-job (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [configure-source-database.md](./configure-source-database.md)
- [networking-methods.md](./networking-methods.md)
- [promote-migration.md](./promote-migration.md)
- [known-limitations.md](./known-limitations.md)
- [guide-to-new-instance.md](./guide-to-new-instance.md)
