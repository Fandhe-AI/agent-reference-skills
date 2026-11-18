---
source: https://docs.cloud.google.com/logging/docs/view/troubleshoot
---

# Troubleshoot viewing logs

Common Logs Explorer problems and fixes: disabled menus, failed downloads, missing VM console logs, no visible entries, `Invalid query` errors and time-range mismatches.

## Signature / Usage

The source page has no code block. Snippet taken from https://docs.cloud.google.com/logging/docs/view/logging-query-language (a timestamp expression in the query disables the time-range selector):

```text
timestamp >= "2023-11-29T23:00:00Z"
timestamp <= "2023-11-29T23:30:00Z"
```

## Options / Props

| Symptom | Cause / fix |
|---|---|
| **All resources** and **All log names** menus are disabled | Expected when the Logs Explorer is searching a log view that contains a flexible filter (an extended query language such as disjunctive clauses). |
| **Download** fails or reports an error | Reduce **Maximum log entries** in the **Download logs** dialog; reduce the queried time period; click **Hide similar entries** before downloading; modify the query to use indexed fields. |
| Console logs of a Compute Engine VM missing | Open **VM instances**, select the instance, then **Serial port 1 (console)** in the **Logs** section. Serial port output can be sent to Cloud Logging by enabling it on the instance. |
| No log entries visible | Check the selected project; check the project uses resources that generate logs with activity (even a new project has audit logs); widen the time range; check current exclusion filters; check you have permission on the projects and log views in the **Refine scope** menu. |
| Correct query, still no entries | Entries older than the retention period aren't visible; heavy load can delay writing or display; entries with future timestamps are not shown until the current time catches up (probably clock skew); a query scope too large can fail with "deadline expired before operation could complete". Make the query more specific or shorten the time range. |
| `Error: Invalid query` | Querying a resource without specifying a bucket makes Logging use the sinks' history to find buckets; if more than 200 buckets might hold entries, the query fails. Refine the scope to a subset of storage. |
| Results time range doesn't match query | **Query results** and **Fields** follow the histogram time range, set by the histogram controls or the time-range selector; changing them doesn't alter the query. A query with a timestamp expression disables the selector and uses that expression. |

## Notes

- The download feature isn't intended for bulk download of logs; copy logs to a Cloud Storage bucket instead (see `https://docs.cloud.google.com/logging/docs/routing/copy-logs`).
- If logs seem missing, an exclusion filter may be dropping them: excluded logs are not stored in the bucket. Review exclusions at `https://docs.cloud.google.com/logging/docs/exclusions#viewing-exclusion-filters` before changing them, and try changes on a disposable project first.
- To find a project or organization ID, expand the project and organization selector in the console and read the **ID** column.
- Retention periods: see `https://docs.cloud.google.com/logging/quotas#logs_retention_periods`.
- Source: https://docs.cloud.google.com/logging/docs/view/troubleshoot (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from https://docs.cloud.google.com/logging/docs/view/logging-query-language (retrieved 2026-11-18).

## Related

- [logging-query-language.md](./logging-query-language.md)
- [building-queries.md](./building-queries.md)
