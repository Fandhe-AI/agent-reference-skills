---
source: https://docs.cloud.google.com/sql/docs/mysql/features
---

# Cloud SQL for MySQL features

Major features of Cloud SQL for MySQL, the differences from a standard MySQL server (unsupported features, plugins, statements, client options, preset flags), the authentication plugin defaults per MySQL version, and the First Generation shutdown timetable (merged from the deprecation notice).

## Signature / Usage

### Change an existing user to caching_sha2_password (MySQL 8.4)

In MySQL 8.4 `caching_sha2_password` is the default plugin; creating a user with `mysql_native_password` is an error. To move an existing account:

```sql
ALTER USER 'username'@'%'
IDENTIFIED WITH caching_sha2_password BY 'user_password';
```

Replace `username` and `user_password` with the values for the account you are updating.

## Options / Props

### Unsupported in Cloud SQL for MySQL

| Area | Unsupported |
|------|-------------|
| Engines / features (all) | Federated Engine, Memory Storage Engine; InnoDB is the only supported storage engine |
| 5.6 and 5.7 | The `SUPER` privilege |
| 8.0 | FIPS mode |
| 8.4 | Tagged GTIDs; privileges `TRANSACTION_GTID_TAG`, `TELEMETRY_LOG_ADMIN` are not granted |
| 9.7 | MySQL Telemetry, Profile-Guided Optimization (PGO), Replication Applier Metrics Component |
| Plugins | InnoDB memcached plugin, X plugin, Clone plugin, InnoDB data-at-rest encryption, `validate_password` component |
| Functions | `LOAD_FILE()` |
| 8.0 and later | Legacy HA configuration with failover replicas (only the regional HA configuration is supported) |

### Statements that fail with `Error 1290`

`Error 1290: The MySQL server is running with the Google option so it cannot execute this statement` is returned for:

| Statement | Note |
|-----------|------|
| `LOAD DATA INFILE` | `LOAD DATA LOCAL INFILE` is supported |
| `SELECT ... INTO OUTFILE` | |
| `SELECT ... INTO DUMPFILE` | |
| `INSTALL PLUGIN ...` | |
| `UNINSTALL PLUGIN` | |
| `CREATE FUNCTION ... SONAME ...` | |

Because instances use GTID replication, `CREATE TABLE ... SELECT` and transactions or statements that update both transactional and nontransactional tables are not supported. `CREATE TEMPORARY TABLE` inside transactions is unsupported on 5.6 and 5.7 but supported on 8.0.

### Client programs

| Item | Restriction |
|------|-------------|
| `mysqldump --tab` (and options used with it) | Not supported; the `FILE` privilege is not granted. All other options are supported |
| `mysqlimport` | Only with `--local` (because of the `LOAD DATA INFILE` restriction) |
| Binary data | `mysqldump --hex-blob` is required to import databases with binary data |
| Flags | Not all MySQL options are editable as Cloud SQL flags |

### Preset options

| Option | Effect |
|--------|--------|
| `skip-name-resolve` | Affects how hostnames are resolved for client connections |
| `log_bin` | Reports whether binary logging is enabled (`ON` / `OFF`) |

### Authentication plugin default

| Version | Behavior |
|---------|----------|
| 5.6 / 5.7 | `mysql_native_password` |
| 8.0 | `mysql_native_password` for new users; set the `default_authentication_plugin` flag to `caching_sha2_password` to change; existing users via `ALTER USER`. `caching_sha2_password` users might need the `get-server-public-key` flag when connecting |
| 8.4 | `caching_sha2_password` for internal users and new accounts; `mysql_native_password` is deprecated, creating such a user errors, and `authentication_policy` can't be set to it; existing `mysql_native_password` accounts keep working after upgrade |
| 9.7 | `mysql_native_password` removed; all built-in-authentication users must use `caching_sha2_password` |

### First Generation shutdown timetable (merged deprecation notice)

Second Generation instances have been offered since 2016. First Generation was fully decommissioned on March 25, 2020.

| Date | Event |
|------|-------|
| October 30, 2018 | General release of Second Generation upgrade tool |
| January 22, 2019 | Announcement of deprecation for First Generation customers |
| January 29, 2019 | Official deprecation for First Generation customers |
| February 5, 2020 | No new First Generation instances can be created |
| March 4, 2020 | Auto-upgrade of remaining First Generation instances |
| March 25, 2020 | Decommission of Cloud SQL First Generation |

## Notes

- MySQL variant of the Cloud SQL features page; the PostgreSQL counterpart is https://docs.cloud.google.com/sql/docs/postgres/features (SQL Server: https://docs.cloud.google.com/sql/docs/sqlserver/features).
- Distinct from Supabase Postgres (`supabase`), Cloudflare D1 / Hyperdrive (`cloudflare-storage`), and the Node.js clients `mssql` / ORM `drizzle` (those cover client code, not the managed service).
- On MySQL 8.0 and later, `CREATE` / `DELETE` on the user table and `INSERT` / `UPDATE` / `DELETE` on privileges are not usable; use `CREATE USER`, `DROP USER`, `GRANT`, `REVOKE`. Ignore the `mysql_upgrade` guidance in the MySQL notes and upgrade with the procedure in "Upgrading MySQL on an instance" (https://docs.cloud.google.com/sql/docs/mysql/upgrade-major-db-version-migrate).
- Private Google Access connections are not supported; private services access is. Cloud SQL system flag overrides are listed at https://docs.cloud.google.com/sql/docs/mysql/flags#mysql-flag-changes.
- BigQuery federated queries don't support `caching_sha2_password`; don't switch an 8.4 user back to `mysql_native_password` if you query it from BigQuery.
- Other features listed at a high level: Database Migration Service, Auth Proxy / SSL/TLS, private IP, HA with automatic failover, `mysqldump` and CSV import/export, backups and PITR, cloning, read pools and autoscaling, storage shrink, resource groups, vector embedding storage.
- Replace the placeholder password in `ALTER USER` with a value from a secret store; avoid typing real passwords where they land in shell history.
- Source: https://docs.cloud.google.com/sql/docs/mysql/features (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/sql/docs/mysql/deprecation-notice (retrieved 2026-11-16; CC BY 4.0). Merged here; the notice has no code, so the snippet above is from the features page.

## Related

- [users.md](./users.md)
- [import-export.md](./import-export.md)
- [known-issues.md](./known-issues.md)
