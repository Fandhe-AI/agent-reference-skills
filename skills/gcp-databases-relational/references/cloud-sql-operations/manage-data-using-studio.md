---
source: https://docs.cloud.google.com/sql/docs/postgres/manage-data-using-studio
---

# Manage your data using Cloud SQL Studio

Cloud SQL Studio runs DDL, DML and DQL statements against a Cloud SQL for PostgreSQL database from the Google Cloud console, with an Explorer pane, a query editor and a results table.

## Signature / Usage

### Run a statement in the SQL editor

Open **Cloud SQL Studio** from the instance navigation menu, sign in with a database name and either IAM database authentication or built-in database authentication, open a new tab, write a query (or start from an Explorer **View actions** template) and click **Run** (all statements) or **Run selected**.

The source has no code block. Example DQL taken from https://docs.cloud.google.com/sql/docs/postgres/troubleshooting (a query you can run in the editor):

```sql
SELECT datname, usename, application_name as appname, client_addr, state, now() - backend_start as conn_age, now() - state_change as last_activity_age FROM pg_stat_activity WHERE backend_type = 'client backend' ORDER BY 6 DESC LIMIT 20
```

## Options / Props

### Required role and permissions

| Item | Value |
|------|-------|
| Role | Cloud SQL Studio User (`roles/cloudsql.studioUser`) on the project |
| Permissions | `cloudsql.databases.list`, `cloudsql.instances.executeSql`, `cloudsql.instances.get`, `cloudsql.instances.login` (only with IAM database authentication), `cloudsql.users.list` |
| Also | Database-level permissions and the password of the privileged database user |

### Limitations

| Limit | Value |
|-------|-------|
| Response size | Over 10MB is truncated (Studio indicates partial results) |
| Request time | Requests over five minutes are canceled; `SET STATEMENT_TIMEOUT` can't raise it |
| Concurrent `executeSql` requests | 10 queries per instance; errors `At most 'x' concurrent queries may be run on this instance. Try again later.` or `Maximum concurrent reads 'x' reached.` |
| Sessions | No connection kept open after a script; each tab execution starts a new session |
| Mixed statements | Only DQL results are displayed |
| Errors | If one of several statements errors, all execution aborts and the first error is displayed |
| Instances | Must be running; external servers unsupported |
| Browser | Closing the tab doesn't stop the query |
| System views | `INFORMATION_SCHEMA` and `PG_CATALOG` are read-only |

## Notes

- Studio uses the `executeSql` API; the script and response might transit intermediate locations between your client and the instance.
- Invalid syntax produces `cloudsqladmin` entries in `postgres.log`; exclude the `cloudsqladmin` database or user with log filters to hide them.
- Statements you run in Studio are executed for real, including DROP / DELETE; try them on a disposable database first.
- Snippet taken from https://docs.cloud.google.com/sql/docs/postgres/troubleshooting (retrieved 2026-11-16).
- Distinct from Supabase Studio and Postgres (`supabase`); `mssql` / `drizzle` cover client code.
- The source also shows Console navigation steps and the Explorer pane details.
- Source: https://docs.cloud.google.com/sql/docs/postgres/manage-data-using-studio (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [logging.md](./logging.md)
- [troubleshooting.md](./troubleshooting.md)
