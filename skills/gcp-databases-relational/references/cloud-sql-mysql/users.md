---
source: https://docs.cloud.google.com/sql/docs/mysql/users
---

# About MySQL users in Cloud SQL

How Cloud SQL works with MySQL user accounts: superuser restrictions, the `'user'@'host'` account format, the default `root` user, system users, per-version `cloudsqlsuperuser` privileges, MySQL roles, and IAM users.

## Signature / Usage

### Account format

A MySQL account is a username plus a hostname; `'user'@'%'` and `'user'@'localhost'` are different accounts.

```sql
'<user_name>'@'<host_name>'
```

### List the privileges of the cloudsqlsuperuser role (MySQL 8.0+)

```sql
SHOW GRANTS FOR 'cloudsqlsuperuser'
```

## Options / Props

### Default and system users

| User | Purpose |
|------|---------|
| `'root'@'%'` | Default account at creation; all privileges except `SUPER` and `FILE`; can't be renamed; default is no password |
| `root@localhost`, `root@127.0.0.1`, `root@::1` | Provide the managed database service |
| `cloudsqlreplica@%` | Replication user for replicas |
| `cloudsqlimport@localhost`, `cloudsqlimport@127.0.0.1` | Data imports |
| `cloudsqlexport@localhost`, `cloudsqlexport@127.0.0.1` | Data exports |
| `cloudsqloneshot` | Other database operations |
| `cloudsqlapplier@localhost` | Replication operations for external server replica or cross major version replication |
| `cloudsqlobservabilityadmin` | Database observability |
| `cloudiamgroup@'%'` | IAM group authentication |
| `cloudsqlreadonly` | Read-only operations on system tables |
| `cloudsqlreplicaindex` | Manage secondary indexes on replicas |

You can't delete, modify, or assign database roles to system users.

### `cloudsqlsuperuser` dynamic privileges on MySQL 8.0 (cumulative by minor version)

The role gets all static privileges except `SUPER` and `FILE`, and no DDL on the `mysql` system database. Derived from the per-version lists in the source (each row lists the privileges added since the previous minor version).

| Minor version | Dynamic privileges |
|---------------|--------------------|
| 8.0.18 | `APPLICATION_PASSWORD_ADMIN`, `CONNECTION_ADMIN`, `ROLE_ADMIN`, `SET_USER_ID`, `XA_RECOVER_ADMIN`, `CLOUDSQL_SPECIAL_VARIABLES_ADMIN` |
| 8.0.26 adds | `FLUSH_OPTIMIZER_COSTS`, `FLUSH_STATUS`, `FLUSH_TABLES`, `FLUSH_USER_RESOURCES`, `INNODB_REDO_LOG_ENABLE`, `SHOW_ROUTINE` |
| 8.0.27 adds | `AUTHENTICATION_POLICY_ADMIN`, `GROUP_REPLICATION_STREAM`, `PASSWORDLESS_USER_ADMIN` |
| 8.0.28 adds | `AUDIT_ABORT_EXEMPT` |
| 8.0.29 (deprecated) adds | `SENSITIVE_VARIABLES_OBSERVER` |
| 8.0.30 and later adds | `FIREWALL_EXEMPT`, `RESOURCE_GROUP_ADMIN`, `RESOURCE_GROUP_USER` |

### `cloudsqlsuperuser` on newer versions

| Version | Differences |
|---------|-------------|
| 8.4 | Same as 8.0.x except: `SET_USER_ID` removed (replaced by `ALLOW_NONEXISTENT_DEFINER`, `SET_ANY_DEFINER`); `FLUSH_PRIVILEGES` granted as a subset of `RELOAD` (`RELOAD` still granted); new `OPTIMIZE_LOCAL_TABLE`; `TRANSACTION_GTID_TAG` and `TELEMETRY_LOG_ADMIN` not granted |
| 9.7 | Same as 8.4, plus `CREATE_SPATIAL_REFERENCE_SYSTEM` |

### Account tables needing write permissions (mysql schema)

- 5.6: `audit_log_rules_expanded`, `audit_log_supported_ops`, `audit_log_rules`, `cloudsql_replica_index`, `db`, `event`, `func`, `heartbeat`, `plugin`, `proc`, `user`, `tables_priv`
- 5.7: the same list plus `gtid_executed`

## Notes

- MySQL variant; the PostgreSQL counterpart is https://docs.cloud.google.com/sql/docs/postgres/users.
- Distinct from Supabase Postgres (`supabase`), Cloudflare D1 / Hyperdrive (`cloudflare-storage`), and the Node.js clients `mssql` / ORM `drizzle` (those cover client code, not the managed service).
- Customers can't create or access users with superuser attributes; DML and DDL are restricted on some schema tables.
- A new built-in-authentication user on 8.0 / 8.4 / 9.7 is granted `cloudsqlsuperuser` automatically unless you assign other roles; custom roles (8.0+) allow finer privileges. IAM users get no database roles automatically; assign `cloudsqlsuperuser` or custom roles when adding the IAM account.
- On 5.6 / 5.7, users created through Cloud SQL have the same privileges as the default user; users created with the `mysql` client must be granted privileges explicitly with `GRANT`.
- Public IP connections need your client IP as an Authorized Address even if the user host is `%`. Exposes the instance on a public IP; prefer private IP, PSC or the Auth Proxy / connectors with IAM authentication when the source offers them.
- Private Service Connect endpoints NAT client IPs to dynamic addresses, so you can't restrict an account by host; use `'USER_NAME'@'%'`.
- The default `root'@'%` has no password and is a common attack target: set a strong password or delete the user (https://docs.cloud.google.com/sql/docs/mysql/create-manage-users#user-root).
- Mandatory roles: activate with the `activate_all_roles_on_login` or `activate_mandatory_roles` flag. In 9.7, `activate_mandatory_roles` defaults to `on`, so roles in `mandatory_roles` are activated automatically.
- Source: https://docs.cloud.google.com/sql/docs/mysql/users (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [iam-authentication.md](./iam-authentication.md)
- [features.md](./features.md)
- [replication.md](./replication.md)
