---
source: https://docs.cloud.google.com/logging/docs/audit/best-practices
---

# Cloud Audit Logs best practices

A recommended sequence of tasks for planning audit logging: understand the audit log types, control access to the logs, configure Data Access audit logs, control storage (location, retention, CMEK), manage cost, query and monitor the logs, and route them to supported destinations.

## Signature / Usage

Query that selects all audit logs in the Logs Explorer (select the organization first to view audit logs for the whole organization; use the **Log name** selector for `activity`, `data_access`, `system_event`, or `policy`):

```text
logName:"cloudaudit.googleapis.com"
```

## Options / Props

### Audit log types

| Audit log type | Configurable | Chargeable |
|----------------|--------------|------------|
| Admin Activity | No; always written | No |
| Data Access | Yes | Yes |
| Policy Denied | Yes; you can exclude these logs from being written to log buckets | Yes |
| System Event | No; always written | No |

### Practices by task

| Task | Practice |
|------|----------|
| IAM permissions | Apply least privilege: remove all nonessential users and grant essential users the correct and minimal permissions. Use IAM to grant granular access to specific buckets |
| Log views | Log buckets can contain logs from multiple projects; create custom log views for more granular access control than bucket-level access |
| Field-level access | Hides individual `LogEntry` fields (for example PII in the payload), whereas log views hide the whole `LogEntry`. Don't configure field-level access on a log bucket you plan to analyze with Observability Analytics; Observability Analytics can't be used on buckets with field-level access controls |
| Data Access audit logs | When enabling new services, evaluate whether to enable Data Access audit logs. After defining the organization-level policy, validate the configuration in a test project before creating developer and production projects |
| Storage location | Log buckets are regional resources. Configure a default resource location to apply a storage region automatically to the new `_Default` and `_Required` buckets created in your organization |
| Retention | Configure Cloud Logging to retain logs between 1 day and 3650 days; custom retention rules apply to all logs in a bucket regardless of log type or whether the log was copied from another location |
| Encryption | Use customer-managed encryption keys (CMEK) instead of Google-managed key encryption keys if you need to control your own encryption |
| Cost | Estimate bills by viewing usage data and configuring alerting policies; Data Access audit logs can be large; manage costs by excluding audit logs that aren't useful (for example Data Access audit logs in development projects) |
| Monitoring | Create log-based alerting policies to be notified when a specific event appears in an audit log; distinguish events needing immediate investigation from low-priority events |
| Routing | Use sinks to route some or all logs to Cloud Storage, Pub/Sub (including third parties such as Splunk), BigQuery, or another Cloud Logging bucket |
| Aggregated sinks | Organization-level sink to route all audit logs (for example to a SIEM); folder-level sink to route only a department's logs (for example a "Finance" folder) |
| Sink destinations | Apply the same access policies to the destination that you applied to the Logs Explorer |
| Copying entries | Manually copy log entries already stored in log buckets to Cloud Storage to share with auditors; the entries also remain in the log bucket. Copy operations don't replace sinks, which automatically send all incoming entries |

## Notes

- Audit log types: Data Access audit logs, except for BigQuery, are disabled by default and must be explicitly enabled.
- Excluding audit logs (exclusion filters or sink filter changes) means the excluded entries are not stored in the bucket; shortening retention deletes entries older than the new period. Try these on a disposable project first.
- Audit logs can contain personal data and sensitive request details; keep `roles/logging.privateLogViewer` narrow, use log views and field-level access, and don't route audit logs to destinations with broader access than the Logs Explorer.
- For longer-term retention, configure sinks before your organization receives logs data.
- When routing to BigQuery, Cloud Logging applies rules to shorten BigQuery schema field names for audit logs and certain structured payload fields; see View logs in sink destinations.
- Snippet taken from https://docs.cloud.google.com/logging/docs/audit (the twin for this page has no code block).
- The source also shows Logs Explorer console steps.
- Source: https://docs.cloud.google.com/logging/docs/audit/best-practices (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [audit-logs-overview.md](./audit-logs-overview.md)
- [configure-data-access.md](./configure-data-access.md)
- [analyze-audit-logs.md](./analyze-audit-logs.md)
