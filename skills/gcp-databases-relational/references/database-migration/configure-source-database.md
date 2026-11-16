---
source: https://docs.cloud.google.com/database-migration/docs/postgres/configure-source-database
---

# Configure your source database

How to prepare a source PostgreSQL instance for standard homogeneous migrations with Database Migration Service: network client authentication, a dedicated migration user, the `pglogical` extension, primary keys, and WAL / replication parameters. Sections exist for self-managed PostgreSQL, Amazon RDS, Amazon Aurora, Azure Database for PostgreSQL Flexible Server and Cloud SQL for PostgreSQL. Quick-start migrations (`pgnative` replication, Private Service Connect interfaces) use a different flow.

## Signature / Usage

### Self-managed source: allow the destination in `pg_hba.conf`

Add entries for the destination Cloud SQL outbound IP address, VPC CIDR range, or reverse SSH bastion host:

```text
# Allow replication connections
host  replication  MIGRATION_USER_ACCOUNT_NAME  DESTINATION_IP_OR_CIDR  md5
# Allow database access
host  all          MIGRATION_USER_ACCOUNT_NAME  DESTINATION_IP_OR_CIDR  md5
```

```sql
SELECT pg_reload_conf();
```

### Create the migration user

Self-managed and Azure sources (replication role):

```sql
CREATE USER MIGRATION_USER_ACCOUNT_NAME WITH PASSWORD 'PASSWORD';
ALTER USER MIGRATION_USER_ACCOUNT_NAME WITH REPLICATION;
```

Amazon RDS and Aurora sources (AWS-managed role):

```sql
CREATE USER MIGRATION_USER_ACCOUNT_NAME WITH PASSWORD 'PASSWORD';
GRANT rds_replication TO "MIGRATION_USER_ACCOUNT_NAME";
```

For Cloud SQL sources, create the user as described on the Cloud SQL "Create a user" page.

### Self-managed: WAL and replication parameters

```sql
ALTER SYSTEM SET shared_preload_libraries = 'pglogical';
```

If other libraries are already loaded, append `'pglogical'` to the existing comma-separated list; check with `SHOW shared_preload_libraries;`.

```sql
ALTER SYSTEM SET wal_level = 'logical';
```

```sql
ALTER SYSTEM SET wal_sender_timeout = 0;
```

```sql
ALTER SYSTEM SET max_replication_slots = MAX_REPLICATION_SLOTS;
```

```sql
ALTER SYSTEM SET max_wal_senders = MAX_WAL_SENDERS;
```

```sql
ALTER SYSTEM SET max_worker_processes = MAX_WORKER_PROCESSES;
```

Persistent alternative in `postgresql.conf` (the same append rule applies to `shared_preload_libraries`):

```text
shared_preload_libraries = 'pglogical'
wal_level = 'logical'
wal_sender_timeout = 0
max_replication_slots = MAX_REPLICATION_SLOTS
max_wal_senders = MAX_WAL_SENDERS
max_worker_processes = MAX_WORKER_PROCESSES
```

Restart the PostgreSQL server afterwards.

### Install `pglogical`

Run this after `pglogical` is loaded and the server has restarted: for a self-managed source the parameters above; for RDS, Aurora and Azure, `shared_preload_libraries` in the parameter group or server parameters; for a Cloud SQL source the `cloudsql.logical_decoding` and `cloudsql.enable_pglogical` flags (see Options / Props). The Cloud SQL logical replication page lists `ERROR: pglogical is not in shared_preload_libraries` when the extension is installed before pglogical is enabled.

Install the `pglogical` extension on each database you want to migrate (excluding the databases in the "Excluded databases" column under Options / Props). PostgreSQL 9.5 and later (all source types):

```sql
CREATE EXTENSION IF NOT EXISTS pglogical;
```

PostgreSQL 9.4 (self-managed):

```sql
CREATE EXTENSION IF NOT EXISTS pglogical;
CREATE EXTENSION IF NOT EXISTS pglogical_origin;
```

### Grant privileges (every database to migrate, plus `postgres`)

Run after `pglogical` is installed (the `pglogical` schema used below is created by `CREATE EXTENSION pglogical`), on each database for each schema except the information schema and schemas starting with `pg_`:

```sql
GRANT USAGE ON SCHEMA SCHEMA_NAME TO "MIGRATION_USER_ACCOUNT_NAME";
GRANT USAGE ON SCHEMA pglogical TO PUBLIC;
GRANT SELECT ON ALL TABLES IN SCHEMA pglogical TO "MIGRATION_USER_ACCOUNT_NAME";
GRANT SELECT ON ALL TABLES IN SCHEMA SCHEMA_NAME TO "MIGRATION_USER_ACCOUNT_NAME";
GRANT SELECT ON ALL SEQUENCES IN SCHEMA SCHEMA_NAME TO "MIGRATION_USER_ACCOUNT_NAME";
```

## Options / Props

| Parameter | Minimum / value | Default |
|---|---|---|
| `shared_preload_libraries` | include `pglogical` (append to the existing comma-separated list; check with `SHOW shared_preload_libraries;`) | — |
| `wal_level` | `logical` (RDS / Aurora: `rds.logical_replication` = `1`; Cloud SQL: `cloudsql.logical_decoding` = `on` and `cloudsql.enable_pglogical` = `on`) | — |
| `wal_sender_timeout` | `0` (disables the timeout that terminates inactive replication connections) | — |
| `max_replication_slots` | databases to migrate x number of migration jobs, plus reserves for table synchronization, plus slots already in use (example: 5 databases x 2 jobs = 10 + existing) | 10 |
| `max_wal_senders` | `max_replication_slots` + senders already in use (example: 10 + 2 = 12) | 10 |
| `max_worker_processes` | databases to migrate + existing workers; with adjusted data dump parallelism add 2 workers per connection (maximum 20 workers) | 8 |

| Source | Excluded databases | Extra setup |
|---|---|---|
| Self-managed | `template0`, `template1` | `postgres` database must exist; `pg_hba.conf` entries; install `pglogical` package on the host (pglogical GitHub repository) |
| Amazon RDS | `template0`, `template1`, `rdsadmin` | VPC security group inbound TCP `5432` from the destination outbound IP, VPC CIDR range or reverse SSH bastion VM; custom DB parameter group attached to the instance; restart the instance |
| Amazon Aurora | `template0`, `template1`, `rdsadmin` | Same security group rule; custom DB cluster parameter group attached to the cluster; restart the cluster |
| Azure Flexible Server | `azure_maintenance`, `azure_sys`, `template0`, `template1` | Firewall rule inbound TCP `5432`; also set `azure.extensions` to include `pglogical`; `require_secure_transport` `on` → choose Basic, TLS or mTLS in the source connection profile, `off` → choose None |
| Cloud SQL | `template0`, `template1` | Database flags (see above); restart the instance; private-IP source with a non-RFC 1918 destination range → add that range to the source's authorized networks |

## Notes

- PostgreSQL 9.5 and earlier sources: the replication delay metric is unavailable for versions earlier than 9.6; see the "Enable replication delay" page.
- Tables without primary keys: only the initial snapshot and subsequent `INSERT` statements replicate in the CDC phase; `UPDATE` / `DELETE` must be migrated manually. Adding primary keys is recommended. Quick-start migrations can use `REPLICA IDENTITY` instead.
- Database Migration Service does not migrate extensions unsupported by Cloud SQL; `pg_cron` is not migrated automatically but is supported on Cloud SQL destinations (reinstall it after promotion).
- On RDS and Aurora, the `pglogical` extension can log credentials in plain text in the source database logs (known extension behavior, unrelated to Database Migration Service or Cloud SQL).
- Credentials: `PASSWORD` is a placeholder; use a strong secret and avoid putting it in shell history. The `md5` method in the `pg_hba.conf` example is verbatim from the source; not from the source: PostgreSQL's `md5` method also accepts SCRAM-hashed passwords, and `scram-sha-256` is the stronger method (https://www.postgresql.org/docs/current/auth-password.html).
- Allowing the destination's outbound public IP in `pg_hba.conf`, a security group or an Azure firewall rule exposes the source on a public IP path; prefer PSC interfaces, VPC peering or a reverse-SSH tunnel (see networking-methods.md), and allow only the destination's IP or CIDR.
- Source inconsistency: for every source type the source page installs `pglogical` (`CREATE EXTENSION`) in step 6 and only later adds `pglogical` to `shared_preload_libraries` / sets `cloudsql.enable_pglogical` and restarts. https://docs.cloud.google.com/sql/docs/postgres/replication/configure-logical-replication says pglogical must be enabled that way first and lists `ERROR: pglogical is not in shared_preload_libraries` when it is not, so this page moves the install step after the parameters and restart (blocks unchanged, only reordered). The source also runs the privilege grants (step 5), including `GRANT USAGE ON SCHEMA pglogical` and `GRANT SELECT ON ALL TABLES IN SCHEMA pglogical`, before `CREATE EXTENSION` (step 6); the `pglogical` schema exists only after the extension is created, so the grant section is also moved after the install step (block unchanged). The source grants on the default `postgres` database as well as every database to migrate, but installs `pglogical` only "on each database you want to migrate"; the `pglogical` schema grants succeed only in databases where the extension is installed.
- Source inconsistency: several "running the migration job test" links in the source use a duplicated `database-migration/docs/postgres/database-migration/docs/postgres/...` path; the intended page is the migration job actions page.
- The source also shows per-source step lists with extra prose, omitted here beyond the parameter and privilege tables.
- Cloud SQL / AlloyDB context: managed PostgreSQL on Google Cloud — distinct from Supabase Postgres (`supabase`), Cloudflare D1 / Hyperdrive (`cloudflare-storage`), and the `drizzle` / `mssql` client skills.
- Source: https://docs.cloud.google.com/database-migration/docs/postgres/configure-source-database (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/sql/docs/postgres/replication/configure-logical-replication (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0; the pglogical enablement order)

## Related

- [networking-methods.md](./networking-methods.md)
- [create-migration-job.md](./create-migration-job.md)
- [known-limitations.md](./known-limitations.md)
- [guide-to-new-instance.md](./guide-to-new-instance.md)
