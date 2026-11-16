---
source: https://docs.cloud.google.com/database-migration/docs/postgres/known-limitations
---

# Known limitations (PostgreSQL to Cloud SQL) and quotas

Limitations of homogeneous PostgreSQL migrations to Cloud SQL for PostgreSQL, including replication, extensions, destination behavior during migration, existing-instance specifics and data dump parallelism, plus the project quotas for Database Migration Service.

## Signature / Usage

### Parallelism and source parameters

When using adjusted data dump parallelism, raise these on the source (Snippet taken from https://docs.cloud.google.com/database-migration/docs/postgres/configure-source-database; for managed sources set the same names as parameter-group parameters or database flags):

```sql
ALTER SYSTEM SET max_replication_slots = MAX_REPLICATION_SLOTS;
```

```sql
ALTER SYSTEM SET max_wal_senders = MAX_WAL_SENDERS;
```

```sql
ALTER SYSTEM SET max_worker_processes = MAX_WORKER_PROCESSES;
```

## Options / Props

### Quotas

| Limit | Value |
|---|---|
| Connection profiles at any time | 2,000 |
| Migration jobs at any time (including completed ones) | 1,000 |

Quotas apply per project; delete unused jobs and profiles to create space.

### Replication and data

| Topic | Behavior |
|---|---|
| Generated columns | Not replicated by `pglogical` for PostgreSQL 12+ |
| DDL | Not replicated through standard DDL; use `pglogical.replicate_ddl_command`, and `pglogical.replication_set_add_table` for new tables (includes `enum` changes) |
| Tables without primary keys | Initial snapshot and `INSERT` in CDC only. Standard: `UPDATE` / `DELETE` not migrated. Quick-start: set replica identity `INDEX` or `FULL` (`REPLICA IDENTITY FULL` increases WAL volume; a primary key is recommended) |
| Materialized views | Only schema; run `REFRESH MATERIALIZED VIEW view_name` on the destination |
| Sequences | `last_value` can differ during CDC; synchronized at promotion |
| `UNLOGGED` and `TEMPORARY` tables | Aren't and can't be replicated |
| Large Object (`oid` referencing `pg_largeobject`) | Not supported by logical decoding |
| Extensions | Only extensions Cloud SQL supports; unsupported ones aren't migrated and unsupported versions make test/start fail; `pg_cron` isn't migrated (reinstall) |
| C user-defined functions | Not migrated, except those installed by Cloud SQL-supported extensions |
| Excluded from migration | `information_schema`, schemas beginning with `pg_`, user login credentials and roles |
| Databases added after job start | Not migrated |
| Custom tablespaces | Unsupported; objects land in `pg_default` |
| Triggers | Don't fire on the replica unless configured with `ALTER EVENT TRIGGER` or `ALTER TABLE ... ENABLE ALWAYS TRIGGER` |
| `SECURITY DEFINER` functions | Created by `cloudsqlexternalsync` with elevated privileges; revoke public execution and grant selectively |
| Unsupported sources | Read replicas in recovery mode; Amazon RDS with the AWS SCT extension pack |
| Encrypted databases | CMEK-encrypted sources can't be migrated if Database Migration Service lacks the keys; `pgcrypto` data is fine; encrypted Aurora / RDS are fine |
| IAM database authentication on destination | Not supported; Database Migration Service uses database user authentication |

### Existing destination instances

| Topic | Behavior |
|---|---|
| Demotion (standard migrations) | The instance is demoted to an external replica: not read-only, but avoid writes; backups and PITR suspended; no read replicas until promotion. Confirm in console by entering the instance ID, or via `gcloud database-migration migration-jobs demote-destination` |
| Quick-start migrations | Use `pgnative` logical replication; no demotion |
| Contents | Only default system databases; user data in the destination isn't supported. The source's fix is to clear the extra databases and retry (see Diagnose issues), which permanently removes them; export anything you need first, or use a different, empty destination instance |
| Jobs per destination | One migration job per destination instance |
| Destination type | Standalone Cloud SQL instances only (not external server replicas) |
| After promotion | Turn on PITR again; restore customized backup settings (reset to defaults); Terraform may drift |
| PSC interfaces | Supported only for existing destinations; for private IP to a new destination use VPC peering |

### Data dump parallelism

| Setting | Subscriptions |
|---|---|
| Minimum | 1 per database |
| Optimal | up to 2 per database |
| Maximum | up to 4 per database |

Target pool of 10 subscriptions across all databases, at least 1 per migrated database; skewed table sizes yield fewer subscriptions (a 1 TB table is isolated in one subscription). A single non-partitioned table or a single leaf partition is copied by one thread; tables without primary keys go into insert-only replication sets, one per parallel subscription, each table still a single stream. Ensure CPU, memory and I/O headroom on the source before using Maximum.

## Notes

- Major version upgrades: `pg_restore` installs the default extension version of the target major version and you can't choose one; upgrade source extensions to a compatible version beforehand to avoid schema-mismatch failures.
- Google Cloud Migration Center can discover feature-support gaps.
- Destination behavior during migration: writable, not read-only, avoid writes to migrating data, users can be managed at any time with `psql` or the console.
- Destructive caution: demotion / promotion and clearing extra destination data change instance state; try them on a disposable instance first.
- Not from the source: clearing the destination's extra databases deletes their data; the export-first and empty-instance alternatives in the Existing destination instances table are editorial guidance (the source only says to clear the databases and retry; steps: https://docs.cloud.google.com/database-migration/docs/postgres/diagnose-issues#clear-ext-instance-data-steps).
- Quotas page (https://docs.cloud.google.com/database-migration/docs/quotas) is merged here: up to 2,000 connection profiles and 1,000 migration jobs; quotas are per project, limits per instance or project.
- Cloud SQL / AlloyDB context: managed PostgreSQL on Google Cloud — distinct from Supabase Postgres (`supabase`), Cloudflare D1 / Hyperdrive (`cloudflare-storage`), and the `drizzle` / `mssql` client skills.
- Source: https://docs.cloud.google.com/database-migration/docs/postgres/known-limitations (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/database-migration/docs/quotas (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from: https://docs.cloud.google.com/database-migration/docs/postgres/configure-source-database (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [configure-source-database.md](./configure-source-database.md)
- [create-migration-job.md](./create-migration-job.md)
- [promote-migration.md](./promote-migration.md)
