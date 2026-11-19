---
source: https://docs.cloud.google.com/bigquery/docs/sessions-intro
---

# Introduction to Sessions

A BigQuery session captures your SQL activity and maintains state (temporary tables, temporary functions, variables) across multiple queries, so you can define them once and reuse them while building queries interactively or running multi-statement transactions. Multiple sessions can be active at the same time. BigQuery saves the history of each session for up to 20 days after the session ends.

## Signature / Usage

Typical uses:

- Maintain transient session data: define variables and temporary tables once and use them throughout the session.
- Look up query history by session.
- Create multi-statement transactions over multiple queries: begin a transaction, make changes, view the temporary result, then commit or roll back across several queries. Without a session, a multi-statement transaction must complete in a single query.

Terminate the current session from SQL:

```sql
CALL BQ.ABORT_SESSION();
```

## Options / Props

### Limitations

| Limit | Value |
|---|---|
| Query location | Every query runs in the location where the session was created; if not specified or not inferable from the creating query, the session is created in the default location. |
| Inactivity | A session is terminated automatically after 24 hours of inactivity. |
| Lifetime | A session is terminated automatically 7 days after creation. |
| Variable size | Maximum 1 MB per session variable; 10 MB for all variables used in a session. |
| Concurrency | Concurrent queries aren't allowed within a session. |
| History retention | Up to 20 days after the session ends. |

### Roles and permissions

| Actions | Required permissions | Default roles |
|---|---|---|
| Create a new session; work with an existing session you created | `bigquery.jobs.create` | `bigquery.user`, `bigquery.jobUser`, `bigquery.admin` |
| Terminate a session you created | `bigquery.jobs.create` | `bigquery.user`, `bigquery.jobUser`, `bigquery.admin` |
| Terminate a session another user created | `bigquery.jobs.create`, `bigquery.jobs.update` | `bigquery.admin` |
| List your sessions in a project (IDs of sessions you created, via `INFORMATION_SCHEMA.JOBS_BY_USER`) | `bigquery.jobs.list` | `bigquery.user`, `bigquery.jobUser`, `bigquery.admin` |
| View all sessions for all users in a project (via `INFORMATION_SCHEMA.JOBS`) | `bigquery.jobs.listAll` | `bigquery.admin` |
| View metadata for sessions created by the current user in the current project (`INFORMATION_SCHEMA.SESSIONS_BY_USER`) | `bigquery.jobs.list` | `bigquery.user`, `bigquery.jobUser`, `bigquery.admin` |
| View metadata for all sessions in the current project (`INFORMATION_SCHEMA.SESSIONS_BY_PROJECT`) | `bigquery.jobs.listAll` | `bigquery.admin` |

## Notes

- Snippet taken from https://docs.cloud.google.com/bigquery/docs/sessions (the twin for this page has no code).
- Pricing: no additional cost for sessions. On-demand projects are charged for `INFORMATION_SCHEMA` queries. Temporary tables created in sessions are charged for storage (see https://cloud.google.com/bigquery/pricing#storage).
- Corrected from the official docs: the source writes the Job User role as `bigquery.Jobuser`; the role ID is `roles/bigquery.jobUser` (the other role names are written as in the source, without the `roles/` prefix).
- Source: https://docs.cloud.google.com/bigquery/docs/sessions-intro (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [sessions.md](./sessions.md)
- [transactions.md](./transactions.md)
- [multi-statement-queries.md](./multi-statement-queries.md)
