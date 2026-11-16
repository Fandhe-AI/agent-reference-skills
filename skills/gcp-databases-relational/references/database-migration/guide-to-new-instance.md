---
source: https://docs.cloud.google.com/database-migration/docs/postgres/guide-to-new-instance
---

# Guide: Migrate to a new Cloud SQL instance (PostgreSQL)

End-to-end flow for migrating PostgreSQL databases to a new Cloud SQL for PostgreSQL instance that Database Migration Service creates when you configure the migration job. For other requirements, use the "Migrate to an existing Cloud SQL instance" guide instead.

## Signature / Usage

### Flow

1. Configure the source database so Database Migration Service can move data.
2. Create the source connection profile and the migration job.
3. Adjust firewall settings depending on connectivity.
4. Start and monitor the migration job.
5. Promote the migration job and move the application.

### Prepare the source (per database)

Snippet taken from https://docs.cloud.google.com/database-migration/docs/postgres/configure-source-database. At a high level you install `pglogical` (2.2.1 or later), set `wal_level = logical` with adequate `max_replication_slots`, `max_wal_senders`, `max_worker_processes`, and grant replication privileges. Create the extension only after `pglogical` is loaded (`shared_preload_libraries`, or `cloudsql.enable_pglogical` for a Cloud SQL source) and the server has restarted; see [configure-source-database.md](./configure-source-database.md).

```sql
CREATE EXTENSION IF NOT EXISTS pglogical;
```

### Finalize

Optional: set up cascading read replicas once the job enters the CDC phase. Stop writes on the source (read-only mode is allowed), promote, optionally verify the data. The promote command and its output are on [promote-migration.md](./promote-migration.md).

## Options / Props

| Item | Detail |
|---|---|
| Required roles (on the project) | `roles/datamigration.admin` (Database Migration Admin), `roles/cloudsql.editor` (Cloud SQL Editor), `roles/cloudsql.studioUser` (Cloud SQL Studio User) |
| APIs to enable | `datamigration.googleapis.com`, `sqladmin.googleapis.com` |
| Billable components | Cloud SQL; Cloud Storage if used for storing CMEK |
| Required permissions | `datamigration.*`, `cloudsql.instances.create` / `get` / `list` / `update` / `delete`, `cloudsql.operations.get`, `cloudsql.users.list` / `get` / `create` / `update` / `delete` |

## Notes

- Regional product: all entities (source and destination connection profiles, migration jobs, destination databases, conversion workspaces) must be saved in a single region, so choose the region first.
- Migrating to a new destination instance doesn't support Private Service Connect interfaces connectivity; pre-create the destination in Cloud SQL and use the existing-instance guide for that.
- Public IP allowlist path: after the destination instance is created you might need to add the Cloud SQL public IP address to the source firewall allowlist. This exposes the source on a public IP; prefer PSC interfaces, VPC peering or a reverse-SSH tunnel (networking-methods.md).
- The destination isn't demoted or read-only, but avoid writes to tables or databases included in the migration to prevent replication conflicts. Automated backups, PITR and read replicas are suspended until promotion.
- Promotion cuts over production; try the whole flow on a disposable source and destination first.
- Optional: prepare customer-managed encryption keys (CMEK) before creating the job.
- Source inconsistency: per the IAM roles reference (`iam/cloudsql.md`), `roles/cloudsql.editor` lacks the listed `cloudsql.instances.create` / `delete` and `cloudsql.users.create` / `update` / `delete`; `roles/cloudsql.admin` has them. `cloudsql.operations.get` isn't in the Cloud SQL IAM permissions list at all.
- Source inconsistency: the source says read replica creation is suspended until promotion, but also lists cascading read replicas as an option once the job is in CDC (see https://docs.cloud.google.com/database-migration/docs/postgres/set-up-cascading-replica).
- Source: https://docs.cloud.google.com/database-migration/docs/postgres/guide-to-new-instance (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Source inconsistency: the source's high-level list installs `pglogical` before setting `wal_level` and the related parameters, and configure-source-database installs it before adding it to `shared_preload_libraries`; https://docs.cloud.google.com/sql/docs/postgres/replication/configure-logical-replication requires pglogical to be enabled (and the server restarted) first. The text above follows that order.
- Source: https://docs.cloud.google.com/database-migration/docs/postgres/configure-source-database (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0; the `CREATE EXTENSION` snippet)
- Source: https://docs.cloud.google.com/sql/docs/postgres/replication/configure-logical-replication (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0; the pglogical enablement order)
- Source: https://docs.cloud.google.com/iam/docs/roles-permissions/cloudsql (retrieved 2026-11-14; CC BY 4.0; the role contents in the source inconsistency note)
- Cloud SQL / AlloyDB context: managed PostgreSQL on Google Cloud — distinct from Supabase Postgres (`supabase`), Cloudflare D1 / Hyperdrive (`cloudflare-storage`), and the `drizzle` / `mssql` client skills. IAM role basics: `gcp-foundation`.

## Related

- [configure-source-database.md](./configure-source-database.md)
- [networking-methods.md](./networking-methods.md)
- [create-migration-job.md](./create-migration-job.md)
- [promote-migration.md](./promote-migration.md)
- [known-limitations.md](./known-limitations.md)
