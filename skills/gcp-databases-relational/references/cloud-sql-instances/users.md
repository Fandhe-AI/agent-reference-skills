---
source: https://docs.cloud.google.com/sql/docs/postgres/users
---

# About PostgreSQL users and roles

How Cloud SQL for PostgreSQL treats users and roles: the `cloudsqlsuperuser` role, default and system users, IAM users, `pg_shadow` access flags and password storage format.

## Signature / Usage

### Set the default postgres user password

A new instance has the `postgres` user without a password. Set one in the console or with gcloud; gcloud prompts for the password so it is not stored in shell history. Snippet taken from https://docs.cloud.google.com/sql/docs/postgres/create-manage-users:

```bash
gcloud sql users set-password postgres \
--instance=INSTANCE_NAME \
--prompt-for-password
```

### Secure the search path for privileged users

Set permanently for a user (replace `USER_NAME`). The two statements below are inline code in the source, not source code blocks:

```sql
ALTER ROLE USER_NAME SET search_path = pg_catalog;
```

For the current session only:

```sql
SET search_path TO pg_catalog;
```

### Grant read access to pg_shadow / pg_authid

Set the flag to an existing PostgreSQL role name: `cloudsql.pg_shadow_select_role` gives that role `SELECT` on the `pg_shadow` view; `cloudsql.pg_authid_select_role` gives `SELECT` on the `pg_authid` table. Flag changes need no restart. Use `pg_has_role` to verify membership.

## Options / Props

| Item | Detail |
|---|---|
| `postgres` user | Created without a password; member of `cloudsqlsuperuser`; attributes `CREATEROLE`, `CREATEDB`, `LOGIN`; no `SUPERUSER` or `REPLICATION` |
| `cloudsqlsuperuser` | Limited superuser: create extensions needing superuser, event triggers, replication users, publications and subscriptions, `CREATE CAST` / `DROP CAST` (needs `USAGE` on both types; `WITHOUT FUNCTION` unsupported), full access to `pg_largeobject` |
| Superuser | Customers cannot create or access users with superuser attributes |
| Built-in users | Created through Cloud SQL (not IAM) join `cloudsqlsuperuser` with `CREATEROLE`, `CREATEDB`, `LOGIN`; change with `ALTER ROLE` |
| IAM users | Granted no database roles automatically; assign `cloudsqlsuperuser` or custom roles when adding the account |
| Password requirement | Every built-in (password) user must have a password; such a user without one cannot log in. The source says "All PostgreSQL users"; IAM database users log in with an OAuth 2.0 token instead (`cloud-sql-connectors-iam/iam-authentication.md`) |
| `password_encryption` flag | `md5` (broadest compatibility) or `scram-sha-256` (more secure, may break older clients) |

### System roles

| Role | Purpose |
|---|---|
| `cloudsqliamgroup` | Non-login IAM group authentication account |
| `cloudsqlinactiveuser` | Marks an IAM group authentication account inactive |
| `cloudsqliamgroupserviceaccount` | IAM service account using IAM group authentication |
| `cloudsqliamgroupuser` | IAM user using IAM group authentication |
| `cloudsqliamserviceaccount` | IAM service account using IAM database authentication |
| `cloudsqliamuser` | IAM user using IAM database authentication |
| `cloudsqlsuperuser` | Limited superuser privileges; granted automatically to new built-in-auth users |

### System users

| User | Purpose |
|---|---|
| `cloudsqladmin` | Superuser privileges on the database |
| `cloudsqlagent` | Monitoring |
| `cloudsqlconnpooladmin` | Managed Connection Pooling |
| `cloudsqlimportexport` | Data import and export (default for CSV import/export; cannot be used directly) |
| `cloudsqllogical` | Building logical replication |
| `cloudsqlobservability` | Observability such as the index advisor and active queries |
| `cloudsqlreplica` | Replication |

## Notes

- System roles and users cannot be deleted or modified; no system role except `cloudsqlsuperuser` can be assigned to database users, and database roles cannot be assigned to system users.
- If a configured `pg_shadow` / `pg_authid` role does not exist the setting has no effect and no error is raised, but an error is logged in `cloudsql.googleapis.com/postgres.log` when a user tries to access the view or table. Hashed passwords are sensitive: when exposing them, use the most secure algorithm your clients support.
- Roles created with `psql` do not necessarily have the `LOGIN` attribute. A built-in user created without assigned roles gets `cloudsqlsuperuser` automatically.
- Search-path hijacking guidance (CVE-2018-1058): privileged users should have `search_path` set to `pg_catalog`.
- The page's own source shows `gcloud sql users set-password postgres --instance=INSTANCE_NAME --password=PASSWORD`; the `--prompt-for-password` form (character echo disabled) shown above is the official block from https://docs.cloud.google.com/sql/docs/postgres/create-manage-users.
- Source: https://docs.cloud.google.com/sql/docs/postgres/create-manage-users (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- A password passed with `--password` ends up in shell history; use `--prompt-for-password`, never inline a real password, and prefer IAM database authentication (source: removing the IAM account removes access automatically).
- The `ALTER ROLE ... SET search_path` and `SET search_path TO pg_catalog` statements are inline code in the source (not source code blocks), copied without the source's `<var>` markup.
- Managed PostgreSQL on Google Cloud; distinct from Supabase Postgres roles (`supabase`) and from client / ORM code in `drizzle`. IAM concepts are in `gcp-foundation`.
- The source also shows no Console, Terraform or REST samples.
- Source: https://docs.cloud.google.com/sql/docs/postgres/users (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [built-in-authentication.md](./built-in-authentication.md)
- [create-instance.md](./create-instance.md)
- Create and manage users: https://docs.cloud.google.com/sql/docs/postgres/create-manage-users
- IAM database authentication: https://docs.cloud.google.com/sql/docs/postgres/authentication
