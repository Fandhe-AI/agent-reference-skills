---
source: https://docs.cloud.google.com/sql/docs/postgres/known-issues
---

# Known issues for Cloud SQL for PostgreSQL

Known issues with Cloud SQL for PostgreSQL and how to avoid or recover from them: connections, administration, import and export, transaction logs, monitoring region names, and deleting databases.

## Signature / Usage

### Auth Proxy with IAM login over TCP hangs the PostgreSQL client

When the Auth Proxy is started with TCP sockets and the `-enable_iam_login` flag, a PostgreSQL client hangs during the TCP connection. One workaround is `sslmode=disable` in the connection string; the Auth Proxy still encrypts the connection.

```bash
psql "host=127.0.0.1 dbname=postgres user=me@google.com sslmode=disable"
```

The other workaround is to start the Auth Proxy with Unix sockets, which turns off PostgreSQL SSL and lets the Auth Proxy do the SSL encryption.

### Find the owner of a database

Replace `DATABASE_NAME` with the database you want owner information for.

```sql
SELECT d.datname as Name,
pg_catalog.pg_get_userbyid(d.datdba) as Owner
FROM pg_catalog.pg_database d
WHERE d.datname = 'DATABASE_NAME';
```

If the owner is `cloudsqlsuperuser`, delete the database from the Google Cloud console. If the owner is a `psql` user, connect as that owner and run `DROP DATABASE`.

## Options / Props

### Instance connection issues

| Issue | Guidance |
|-------|----------|
| Expired SSL/TLS certificates | In the console open the instance Connections page, Security tab, check the server certificate; add a new certificate and rotate if expired |
| Auth Proxy version | Use the most recent version |
| Not authorized to connect | Connecting to a nonexistent instance in the project only says you aren't authorized |
| `Failed to create subnetwork. Router status is temporarily unavailable...` | Retry creating the instance |
| `gcloud sql connect --user` | Only works with the default `postgres` user (otherwise `FATAL: database 'user' does not exist`); connect as `postgres` then use `\c` |

### Administrative and import / export issues

| Issue | Guidance |
|-------|----------|
| One long-running import or export at a time | Plan other operations first; the operation can be canceled. PostgreSQL imports in a single transaction, so canceling persists no data |
| Instance on PostgreSQL 17 but source databases on 16 or earlier | Can't use Cloud SQL import; use Database Migration Service |
| Database Migration Service import of a PostgreSQL 17 database | Imported as PostgreSQL 16 |
| PostgreSQL 15+ with a target created from `template0` | `permission denied for schema public`; run `GRANT ALL ON SCHEMA public TO cloudsqlsuperuser` |
| Exporting many large objects | Can consume enough memory to make the instance unresponsive, even if blobs are empty |
| Custom tablespaces | Unsupported; data migrates to the default tablespace `pg_default` |
| 500 GB or larger databases | Import and export take long and block other operations such as backups; consider restoring a previous backup with `gcloud` or the API |
| Cloud Storage 5 TiB object limit | Export fails only if the compressed file exceeds 5 TiB; use parallel export (one file per table) or `pg_dump` from a Compute Engine instance for a table that's too large |

### Transaction logs and disk growth

Logs are purged once daily. With log retention equal to the number of backups (for example seven days and seven backups), between six and seven days of logs are kept. Set the number of backups to at least one more than the days of log retention. Replica storage grows when replication is suspended and resumed.

### Cloud Monitoring and Logging region names

| Region | Displayed as |
|--------|--------------|
| `us-central1` | `us-central` |
| `europe-west1` | `europe` |
| `asia-east1` | `asia` |

This affects Cloud Monitoring alerting, Metrics Explorer and Cloud Logging. Mitigate in alerting and Metrics Explorer with the system metadata label `region` instead of the `cloudsql_database` resource label `region`.

### Deleting a database

`ERROR: must be owner of database [DATABASE_NAME]` appears because a database created with `psql` is owned by that user, which lacks `superuser` attributes (customers can't have superuser). Console-created databases are owned by `cloudsqlsuperuser` and can only be deleted from the console; `psql`-created ones only by connecting as the owner.

## Notes

- `sslmode=disable` is shown only because the Auth Proxy encrypts the connection; use it only with the proxy on `127.0.0.1`. Don't use it for direct connections to the instance.
- `-enable_iam_login` is an Auth Proxy v1 flag (legacy, `cloud_sql_proxy` binary); v2 (`cloud-sql-proxy`) uses `--auto-iam-authn` (see https://docs.cloud.google.com/sql/docs/postgres/iam-logins).
- `DROP DATABASE` and instance operations are destructive; try them on a disposable resource first.
- Distinct from Supabase Postgres (`supabase`), Cloudflare D1 / Hyperdrive (`cloudflare-storage`), and the `mssql` / `drizzle` client skills.
- The source also shows Console navigation for certificates (omitted).
- Source: https://docs.cloud.google.com/sql/docs/postgres/known-issues (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [troubleshooting.md](./troubleshooting.md)
- [import-export.md](./import-export.md)
- [import-export-sql.md](./import-export-sql.md)
- [maintenance.md](./maintenance.md)
