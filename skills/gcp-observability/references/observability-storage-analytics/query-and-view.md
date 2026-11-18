---
source: https://docs.cloud.google.com/logging/docs/analyze/query-and-view
---

# Query and analyze logs with Observability Analytics

Observability Analytics provides a SQL editor and a menu-based Query Builder for querying log views and analytics views; results show as a table or chart that can be saved to custom dashboards. Log views use the `LogEntry` schema; analytics views have a schema chosen by their creator.

## Signature / Usage

### FROM clause formats

```sql
FROM `PROJECT_ID.LOCATION.BUCKET_ID.LOG_VIEW_ID`
```

```sql
FROM `analytics_view.PROJECT_ID.LOCATION.ANALYTICS_VIEW_ID`
```

If the query pane reports an error referencing the `FROM` statement, the view can't be found (see the troubleshooting entry "`FROM` clause must contain exactly one log view").

### Query Builder example: group by hour, average response size

The Query Builder generates this equivalent SQL for grouping by `timestamp` (hourly) and `severity` and averaging `http_request.response_size`:

```sql
SELECT
  -- Truncate the timestamp by hour.
  TIMESTAMP_TRUNC( timestamp, HOUR ) AS hour_timestamp,
  severity,
  -- Compute average response_size.
  AVG( http_request.response_size ) AS average_http_request_response_size
FROM
  `PROJECT_ID.LOCATION.BUCKET_ID.LOG_VIEW_ID`
WHERE
  -- Matches log entries that have a response_size.
  http_request.response_size IS NOT NULL
GROUP BY
  -- Group log entries by timestamp and severity.
  TIMESTAMP_TRUNC( timestamp, HOUR ),
  severity
LIMIT
  1000
```

## Options / Props

### FROM placeholders

| Placeholder | Meaning |
|---|---|
| `PROJECT_ID` | Project identifier. |
| `LOCATION` | Location of the log view or analytics view. |
| `BUCKET_ID` | Name or ID of the log bucket. |
| `LOG_VIEW_ID` | Log view ID; at most 100 characters; letters, digits, underscores, hyphens only. |
| `ANALYTICS_VIEW_ID` | Analytics view ID; at most 100 characters; letters, digits, underscores, hyphens only. |

### Required roles (on the project)

| Goal | Role |
|---|---|
| Query `_Required` and `_Default` log buckets | Logs Viewer (`roles/logging.viewer`) |
| Query all log views in a project | Logs View Accessor (`roles/logging.viewAccessor`) |
| Query analytics views | Observability Analytics User (`roles/observability.analyticsUser`) |

### Query Builder menus and column options

| Menu | Maps to |
|---|---|
| Source | `FROM` |
| Search all fields | `WHERE` |
| Columns | `SELECT` (per column: None, Aggregate, Group By; cast with `CAST`; extract substring with `REGEXP_EXTRACT`) |
| Filters | `WHERE` |
| Sort By | `ORDER BY` |
| Limit | `LIMIT` |

## Notes

- Logs Explorer can query log buckets directly; Observability Analytics needs the log bucket upgraded (Logs Storage page, "Observability Analytics available" column shows Open; click Upgrade otherwise).
- Restrict a principal to one log view by adding an IAM condition to the Logs View Accessor grant at project level, or an IAM binding on the log view's policy. Roles for views on user-defined buckets or the `_AllLogs` view of `_Default` are in Cloud Logging roles. Logs can hold personal data or secrets; grant read roles narrowly.
- Use the time-range selector for time ranges; a `WHERE` clause on `timestamp` overrides it and disables the selector.
- If the toolbar shows "Run in BigQuery", switch the engine: Settings, then "Analytics (default)".
- Query Builder can always be converted to SQL, but not every SQL query (for example joins) can be shown in the builder. JSON column fields are inferred automatically; for others use the SQL editor. Log view schemas are fixed (`LogEntry`); analytics view schemas change with the view's SQL. Analytics views are in Public Preview.
- A linked BigQuery dataset is needed only to join with other BigQuery datasets, query from BigQuery Studio / Data Studio, run on BigQuery slots (on-demand or reserved), or create an alerting policy on a SQL query result. Creating one expands the security boundary of your log data to BigQuery services; review Data security with Observability Analytics first.
- Observability Analytics doesn't deduplicate log entries; trace data can also be queried (Query and analyze traces).
- The source also shows Console click-paths for loading a system-defined query and the Query Builder.
- Source: https://docs.cloud.google.com/logging/docs/analyze/query-and-view (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [log-analytics.md](./log-analytics.md)
- [examples.md](./examples.md)
- [about-analytics-views.md](./about-analytics-views.md)
