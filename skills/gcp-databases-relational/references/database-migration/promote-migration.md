---
source: https://docs.cloud.google.com/database-migration/docs/postgres/promote-migration
---

# Promote a migration

Cut over a continuous PostgreSQL migration: promoting the job disconnects the destination from the source and turns it into an independent standalone primary instance, so automated backups, point-in-time recovery (PITR) and read replicas resume. You can promote the whole job or selected databases.

## Signature / Usage

### Procedure

1. Stop all writes, running scripts and client connections to the source database (downtime begins here).
2. Wait until the replication delay metric is at or close to zero.
3. Promote (console: Migration jobs → job → **Promote**, or select databases on the **Databases** tab; or gcloud).

### gcloud

Replace `MIGRATION_JOB_ID` (find it with `gcloud database-migration migration-jobs list`) and `REGION`.

```bash
gcloud database-migration migration-jobs \
promote MIGRATION_JOB_ID \
  --region=REGION
```

The command returns a long-running operation:

```yaml
done: false
metadata:
  '@type': type.googleapis.com/google.cloud.clouddms.v1.OperationMetadata
  apiVersion: v1
  createTime: '2024-02-20T12:20:24.493106418Z'
  requestedCancellation: false
  target: MIGRATION_JOB_ID
  verb: promote
name: OPERATION_ID
```

Check success with `gcloud database-migration migration-jobs describe` (job status) or `gcloud database-migration operations describe` with `OPERATION_ID`.

## Notes

- Promotion disconnects the destination from the source and is the production cutover. It is a failover-style operation: try the flow on a disposable migration first.
- You can promote even if the replication delay isn't zero, which can reduce downtime but may affect the accuracy of the destination data. Not from the source: changes that the source committed but that weren't replicated yet are missing from the destination after promotion, so wait for a zero delay unless you can accept that loss.
- Not from the source: promotion ends replication for the job, and writes made on the source afterward aren't copied to the destination. Before promoting, verify the destination data (for example row counts or checksums of key tables) and keep the source database intact and read-only until the application runs correctly on the destination, so the source remains your fallback; don't delete the source or its replication setup until then.
- After promotion the destination is ready for full application traffic and the job status changes to `Completed`; you can then connect your application and delete the migration job.
- `pg_cron` isn't migrated by Database Migration Service but is supported on Cloud SQL for PostgreSQL; reinstall it on the destination.
- After promotion, enable PITR and restore customized backup settings (Cloud SQL resets backup settings to defaults); see known-limitations.md.
- The source also shows Console steps and Windows PowerShell / cmd.exe variants of the command.
- Cloud SQL / AlloyDB context: managed PostgreSQL on Google Cloud — distinct from Supabase Postgres (`supabase`), Cloudflare D1 / Hyperdrive (`cloudflare-storage`), and the `drizzle` / `mssql` client skills.
- Source: https://docs.cloud.google.com/database-migration/docs/postgres/promote-migration (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [create-migration-job.md](./create-migration-job.md)
- [known-limitations.md](./known-limitations.md)
- [guide-to-new-instance.md](./guide-to-new-instance.md)
