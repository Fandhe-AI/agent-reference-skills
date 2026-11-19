---
source: https://docs.cloud.google.com/bigquery/docs/sessions
---

# Work with Sessions

Create, run queries in, list, view the history of, and terminate BigQuery sessions in the Google Cloud console, with the `bq` command-line tool, or through the BigQuery API. All queries in a session run in the location where the session was created.

## Signature / Usage

### Create a session (bq)

```bash
bq query \
--nouse_legacy_sql \
--create_session
[--location 'SESSION_LOCATION'] \
'SQL_STATEMENT'
```

### Create a session (API)

Call `jobs.query` with `createSession` set to `true`. `location` is optional and binds the session to a physical location.

Adapted (not in the official docs): the source writes `["location": "SESSION_LOCATION"]` in brackets, which is not valid JSON; the optional `location` member is shown as a normal member.

```json
{
  "query": "SQL_STATEMENT",
  "createSession": true,
  "location": "SESSION_LOCATION"
}
```

The response carries the session ID (the source shows other fields too, with example values):

```json
{
  "jobReference": {
    "projectId": "myProject",
    "jobId": "job_123"
  },
  "statistics": {
    "sessionInfo": {
      "sessionId": "CgwKCmZhbGl1LXRlc3QQARokMDAzYjI0OWQtZ"
    }
  }
}
```

### Run a query in a session

```bash
bq query \
--nouse_legacy_sql \
--session_id=SESSION_ID \
'SQL_STATEMENT'
```

To avoid repeating the session ID, add it to `[query]` in `.bigqueryrc`:

```text
[query]
--session_id=CgwKCmZhbGl1LXRlc3QQARokMDAzYjI0OWQtZ
```

API request:

```json
{
  "query": "SQL_STATEMENT",
  "connectionProperties": [{
    "key": "session_id",
    "value": "SESSION_ID"
  }]
}
```

### Terminate a session

```sql
CALL BQ.ABORT_SESSION();
```

Terminate a session by ID (you don't need to be in the session):

Adapted (not in the official docs): the session ID is a string, so the placeholder is quoted.

```sql
CALL BQ.ABORT_SESSION('SESSION_ID');
```

### List sessions

Adapted (not in the official docs): the source has a stray `>` after `INFORMATION_SCHEMA.SESSIONS_BY_USER`, which is invalid syntax; it was removed.

```sql
SELECT
  session_id,
  MAX(creation_time) AS last_modified_time
FROM `region-REGION_NAME`.INFORMATION_SCHEMA.SESSIONS_BY_USER
WHERE
  session_id IS NOT NULL
  AND creation_time > TIMESTAMP_SUB(CURRENT_TIMESTAMP(), INTERVAL 20 DAY)
GROUP BY session_id
ORDER BY last_modified_time DESC;
```

### View the history of a session

Adapted (not in the official docs): `SESSIONS_BY_USER` has a `session_id` column and no `session_info` column, so the filter uses `session_id`.

```sql
SELECT
  *
FROM
  `region-REGION_NAME`.INFORMATION_SCHEMA.SESSIONS_BY_USER
WHERE
  session_id = 'SESSION_ID';
```

Statements run in a session (`JOBS_BY_USER`):

```sql
SELECT
  creation_time, query
FROM
  `region-REGION_NAME`.INFORMATION_SCHEMA.JOBS_BY_USER
WHERE
  session_info.session_id = 'CgwKCmZhbGl1LXRlc3QQARokMDAzYjI0'
  AND creation_time > TIMESTAMP_SUB(CURRENT_TIMESTAMP(), INTERVAL 20 DAY);
```

## Options / Props

| Item | Value |
|---|---|
| `bq query` flag | `--session_id=SESSION_ID` |
| `jobs.query` field | `createSession: true` (create); `connectionProperties` with key `session_id` (use) |
| `SESSION_LOCATION` | Optional physical location; restricts all queries in the session |
| Auto-termination | After 24 hours of inactivity or 7 days, whichever happens first |
| History availability | 20 days after termination |

## Notes

- In the console, each session is assigned to an editor tab: **Query settings** > **Session management** > **Use session mode**, then choose **Data location**; the session is created when the first query runs, and the location can't be changed afterward. Closing the tab terminates it. The session ID is under **Job information** in **Query results**, and **Job history** (Personal history / Project history) has a **Session ID** column and filter.
- `--session_id` and `--create_session` are listed in `bq help query` (bq bundled with gcloud 593.0.0); the bq CLI reference page documents `session_id` only as a `--connection_property` key. `bq` returns the session ID as `In session: <ID>` after the query results.
- The create-session `bq` block is verbatim from the source: `[--location ...]` marks an optional flag, and the source has no `\` after `--create_session`, so remove the brackets and add the `\` before running it with a location.
- Corrected from the official docs: the create-session request body wrote `["location": "SESSION_LOCATION"]` (not valid JSON) and the list query wrote `INFORMATION_SCHEMA.SESSIONS_BY_USER>` (stray `>`).
- Session IDs in the examples are placeholders from the source.
- Permissions required for these actions are in sessions-intro (for example `bigquery.jobs.create`, `bigquery.jobs.list`, `bigquery.jobs.listAll`, `bigquery.jobs.update`).
- Corrected from the official docs: the session-history query filters `SESSIONS_BY_USER` on `session_info.session_id`, but that view has a flat `session_id` column (`session_info` is a column of the `JOBS_BY_*` views); and `BQ.ABORT_SESSION(SESSION_ID)` is written with the session ID as a quoted string.
- Source: https://docs.cloud.google.com/bigquery/docs/sessions (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [sessions-intro.md](./sessions-intro.md)
- [transactions.md](./transactions.md)
- [multi-statement-queries.md](./multi-statement-queries.md)
