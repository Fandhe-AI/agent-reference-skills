---
source: https://docs.cloud.google.com/sql/docs/postgres/logging
---

# Cloud SQL for PostgreSQL logging

View and query logs of a Cloud SQL instance with Cloud Logging: database logs, the instance operations log, application and Auth Proxy logs, and Cloud Audit Logs.

## Signature / Usage

### View instance log entries

Replace `PROJECT-ID` (the source text calls it `PROJECT_ID`). `--limit` is optional and caps the number of entries.

```bash
gcloud logging read "resource.type=cloudsql_database" \
--project=PROJECT-ID \
--limit=10 \
--format=json
```

### Logs Explorer queries for applications

App Engine flexible environment:

```text
resource.type="gae_app"
resource.labels.module_id="default"
```

Cloud Run (only error messages from the Cloud SQL Auth Proxy are reported):

```text
resource.type="cloud_run_revision"
resource.labels.service_name="$SERVICE_NAME"
resource.labels.revision_name="$REVISION_NAME"
```

Cloud SQL Auth Proxy:

```text
log_id("appengine.googleapis.com/cloud-sql-proxy")
```

### Download logs

Replace `LOG_NAME` with a log such as `postgres.log`.

Adapted (not in the official docs): the filter is written on one line, because the source's line breaks inside the quoted filter would insert spaces into the `logName` path.

```bash
gcloud logging read \
"resource.type=cloudsql_database AND logName=projects/PROJECT_ID/logs/cloudsql.googleapis.com%2FLOG_NAME" \
--format json \
--project=PROJECT_ID \
--freshness="1d" \
> downloaded-log.json
```

Adapted (not in the official docs): the filter is on one line as above, and `--order=asc` is passed to `gcloud logging read` before the pipe; the source placed it after `jq`, where `gcloud` never receives it.

```bash
gcloud logging read \
"resource.type=cloudsql_database AND logName=projects/PROJECT_ID/logs/cloudsql.googleapis.com%2FLOG_NAME" \
--format json \
--project=PROJECT_ID \
--freshness="1d" \
--order=asc \
| jq -rnc --stream 'fromstream(1|truncate_stream(inputs)) | .textPayload' > downloaded-log.txt
```

### Log query statements with pgaudit

Order from https://docs.cloud.google.com/sql/docs/postgres/pg-audit: enable the flag, create the extension, then set `pgaudit.log`.

First enable `cloudsql.enable_pgaudit`. Snippet taken from https://docs.cloud.google.com/sql/docs/postgres/pg-audit. `--database-flags` replaces every flag already set on the instance, so add your existing flags to the list. Changing this flag restarts the instance; wait for the operation to finish.

```bash
gcloud sql instances patch INSTANCE_NAME --database-flags cloudsql.enable_pgaudit=on
```

Then connect and create the extension:

```bash
gcloud sql connect INSTANCE_NAME
```

```sql
CREATE EXTENSION pgaudit;
```

Finally exit the database and set `pgaudit.log` (again keep `cloudsql.enable_pgaudit=on` and your other existing flags in the list):

```bash
gcloud sql instances patch INSTANCE_NAME \
--database-flags=cloudsql.enable_pgaudit=on,pgaudit.log=all
```

For per-database or per-role audit settings, see the "Customizing database audit logging" section of the pg-audit page.

## Options / Props

| Role | Allows |
|------|--------|
| Logs Viewer (`roles/logging.viewer`) | View entries in `_Required` and the `_Default` view of `_Default`; select a log scope |
| Private Logs Viewer (`roles/logging.privateLogViewer`) | View all entries in `_Required` and `_Default` buckets |

| Audit log type | Notes |
|----------------|-------|
| Admin Activity | User-driven API calls that change configuration or metadata; can't be deactivated |
| Data Access | Reads of configuration or metadata and reads / writes of user data; must be enabled |
| System Event | Written by Google Cloud systems; can't be deactivated |

### Troubleshooting

| Issue | Fix |
|-------|-----|
| Logging uses a lot of CPU and memory | Set `log_statement` to none and `logging_collector` to off; tune other log flags by editing the instance |
| Audit logs not found | Data Access logs are written only for authenticated user-driven API calls that touch user data or configuration / metadata |
| Operation details missing (for example who deleted a user) | Enable audit logging |
| Query logs missing in PostgreSQL logs | Enable the pgaudit flags (commands above) |

## Notes

- The operations log in the console (Operations and logs pane) shows time, type, status and message; it doesn't include operations done with external tools such as psql. Only user management and password change operations made through the Console, `gcloud` or the Admin API appear.
- Example log name in the Console flow: `cloudsql.googleapis.com/postgres.log`.
- Source inconsistency: the first `gcloud logging read` example says to replace `PROJECT_ID` but the block contains `PROJECT-ID`.
- Adapted from the official docs: the download-as-JSON filter spanned lines inside the quotes.
- Adapted from the official docs: the download-as-text command ended with `... | .textPayload' \ --order=asc > downloaded-log.txt`, and its filter also spanned lines.
- Source inconsistency: this page's troubleshooting row runs `CREATE EXTENSION pgaudit` first and only then sets `cloudsql.enable_pgaudit=on,pgaudit.log=all`; https://docs.cloud.google.com/sql/docs/postgres/pg-audit enables `cloudsql.enable_pgaudit` first ("After enabling the database flag, run the `CREATE EXTENSION` command"), then sets `pgaudit.log`. The steps above follow the pg-audit page; the blocks are unchanged, only reordered, with the flag-only patch added from that page.
- `--database-flags` overwrites all previously set database flags (unlisted flags return to defaults) and may restart the instance; include every existing flag in the list. `pgaudit.log=all` logs every statement, which adds CPU, memory and log volume (see the troubleshooting row above). Source: https://docs.cloud.google.com/sql/docs/postgres/flags
- The Logs Explorer queries are filters, not shell commands (the source tags the Cloud Run one as `bash`); Logs Explorer does not expand `$SERVICE_NAME` / `$REVISION_NAME`, so replace them with literal values.
- The source also shows the Console Logs Explorer flow and the App Engine Services page flow (omitted).
- Distinct from Supabase Postgres (`supabase`) and Cloudflare D1 / Hyperdrive (`cloudflare-storage`); `mssql` / `drizzle` cover client code.
- Source: https://docs.cloud.google.com/sql/docs/postgres/logging (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/sql/docs/postgres/flags (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/sql/docs/postgres/pg-audit (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0; the flag-only `patch` snippet and step order)

## Related

- [monitor-instance.md](./monitor-instance.md)
- [troubleshooting.md](./troubleshooting.md)
- [manage-data-using-studio.md](./manage-data-using-studio.md)
