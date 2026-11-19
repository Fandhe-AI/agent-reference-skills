---
source: https://docs.cloud.google.com/bigquery/docs/audit-logging
---

# BigQuery Data Transfer Service audit logging

Cloud Audit Logs for BigQuery Data Transfer Service track administrative and data-access operations on transfer resources. Query them in the Logs Explorer using the service name, and use the permission type of each method to know whether it writes Admin Activity or Data Access logs. This page covers the Data Transfer Service API only; the other BigQuery audit logs are listed in the telemetry map of the monitoring page.

## Signature / Usage

### View the service's audit logs in the Logs Explorer

Paste this query into the Query field of the Logs Explorer and click Run query.

```text
protoPayload.serviceName="bigquerydatatransfer.googleapis.com"
```

### Filter for one method

Every method has a filter of this form (shown for `CheckValidCreds`): `protoPayload.methodName="google.cloud.bigquery.datatransfer.v1.DataTransferService.CheckValidCreds"`.

## Options / Props

### Methods by permission type

Methods needing a permission with `type` `DATA_READ`, `DATA_WRITE` or `ADMIN_READ` generate Data Access audit logs; `ADMIN_WRITE` generates Admin Activity audit logs. None of the methods below is a long-running or streaming operation.

| Method | Audit log type | Permission |
|---|---|---|
| `google.cloud.bigquery.datatransfer.v1.DataTransferService.CheckValidCreds` | Data access | `bigquery.transfers.get` (`ADMIN_READ`) |
| `google.cloud.bigquery.datatransfer.v1.DataTransferService.GetDataSource` | Data access | `bigquery.transfers.get` (`ADMIN_READ`) |
| `google.cloud.bigquery.datatransfer.v1.DataTransferService.GetTransferConfig` | Data access | `bigquery.transfers.get` (`ADMIN_READ`) |
| `google.cloud.bigquery.datatransfer.v1.DataTransferService.GetTransferResource` | Data access | `bigquery.transfers.get` (`ADMIN_READ`) |
| `google.cloud.bigquery.datatransfer.v1.DataTransferService.GetTransferRun` | Data access | `bigquery.transfers.get` (`ADMIN_READ`) |
| `google.cloud.bigquery.datatransfer.v1.DataTransferService.ListDataSources` | Data access | `bigquery.transfers.get` (`ADMIN_READ`) |
| `google.cloud.bigquery.datatransfer.v1.DataTransferService.ListTransferConfigs` | Data access | `bigquery.transfers.get` (`ADMIN_READ`) |
| `google.cloud.bigquery.datatransfer.v1.DataTransferService.ListTransferLogs` | Data access | `bigquery.transfers.get` (`ADMIN_READ`) |
| `google.cloud.bigquery.datatransfer.v1.DataTransferService.ListTransferResources` | Data access | `bigquery.transfers.get` (`ADMIN_READ`) |
| `google.cloud.bigquery.datatransfer.v1.DataTransferService.ListTransferRuns` | Data access | `bigquery.transfers.get` (`ADMIN_READ`) |
| `google.cloud.location.Locations.GetLocation` | Data access | `bigquery.transfers.get` (`ADMIN_READ`) |
| `google.cloud.location.Locations.ListLocations` | Data access | `bigquery.transfers.get` (`ADMIN_READ`) |
| `google.cloud.bigquery.datatransfer.v1.DataTransferService.CreateTransferConfig` | Admin activity | `bigquery.transfers.update` (`ADMIN_WRITE`) |
| `google.cloud.bigquery.datatransfer.v1.DataTransferService.DeleteTransferConfig` | Admin activity | `bigquery.transfers.update` (`ADMIN_WRITE`) |
| `google.cloud.bigquery.datatransfer.v1.DataTransferService.DeleteTransferRun` | Admin activity | `bigquery.transfers.update` (`ADMIN_WRITE`) |
| `google.cloud.bigquery.datatransfer.v1.DataTransferService.ScheduleTransferRuns` | Admin activity | `bigquery.transfers.update` (`ADMIN_WRITE`) |
| `google.cloud.bigquery.datatransfer.v1.DataTransferService.StartManualTransferRuns` | Admin activity | `bigquery.transfers.update` (`ADMIN_WRITE`) |
| `google.cloud.bigquery.datatransfer.v1.DataTransferService.UpdateTransferConfig` | Admin activity | `bigquery.transfers.update` (`ADMIN_WRITE`) |
| `google.cloud.bigquery.datatransfer.v1.DataTransferService.EnrollDataSources` | Admin activity | `resourcemanager.projects.update` (`ADMIN_WRITE`) |
| `google.cloud.bigquery.datatransfer.v1.DataTransferService.UnenrollDataSources` | Admin activity | `resourcemanager.projects.update` (`ADMIN_WRITE`) |

## Notes

- Methods marked as long-running operations (LROs) usually generate two audit log entries, one at start and one at end; the source states that none of the Data Transfer Service methods listed is an LRO or streaming operation.
- Data Access audit logs must be enabled to be written; see Enable Data Access audit logs (https://docs.cloud.google.com/logging/docs/audit/configure-data-access). Log storage and routing: https://docs.cloud.google.com/logging/docs/audit#storing_and_routing_audit_logs; Cloud Logging pricing: https://docs.cloud.google.com/stackdriver/pricing#logs-pricing-summary.
- Cloud Audit Logs and Cloud Logging in general are covered by the `gcp-observability` skill; Data Transfer Service configuration itself is a separate BigQuery topic.
- The per-method sections of the source (method, audit log type, permissions, filter) are condensed into the table; the filter pattern is the same for every method.
- Source: https://docs.cloud.google.com/bigquery/docs/audit-logging (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [monitoring.md](./monitoring.md)
- Types of audit logs: https://docs.cloud.google.com/logging/docs/audit#types
- Audit log entry structure: https://docs.cloud.google.com/logging/docs/audit#audit_log_entry_structure
