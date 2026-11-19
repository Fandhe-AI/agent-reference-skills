---
source: https://docs.cloud.google.com/bigquery/docs/monitoring
---

# Introduction to BigQuery monitoring

BigQuery monitoring combines three sources: Cloud Monitoring metrics, Cloud Logging audit logs, and INFORMATION_SCHEMA views. Sources differ in sampling frequency and aggregation level (information schema views often have higher granularity than Cloud Monitoring metrics, so metric charts can temporarily diverge from them), so assess latency, precision and accuracy against your requirements. Unlike many Google Cloud services, BigQuery writes operational job telemetry to information schema views rather than to Cloud Logging; Logging is used mainly for Cloud Audit Logs.

## Signature / Usage

### Chart interactive queries in flight (PromQL)

```text
{"bigquery.googleapis.com/query/count", monitored_resource="global", priority="interactive"}
```

### Load jobs in flight, grouped into 10-minute intervals (PromQL)

```text
avg_over_time({"bigquery.googleapis.com/job/num_in_flight",
  monitored_resource="bigquery_project",
  job_type="load"
}[10m])
```

### Pending or running queries in the `us` region

```sql
SELECT
    creation_time,
    project_id,
    user_email,
    job_id,
    job_type,
    priority,
    state,
    TIMESTAMP_DIFF(CURRENT_TIMESTAMP(), start_time,second) as running_time_sec
 FROM
   `region-us`.INFORMATION_SCHEMA.JOBS_BY_PROJECT
 WHERE
    creation_time BETWEEN TIMESTAMP_SUB(CURRENT_TIMESTAMP(), INTERVAL 1 DAY) AND CURRENT_TIMESTAMP()
    AND state != "DONE"
ORDER BY
    running_time_sec DESC
```

### Abbreviated audit log entry for a failed operation

```text
{
  "protoPayload": {
    "@type": "type.googleapis.com/google.cloud.audit.AuditLog",
    "status": {
      "code": 5,
      "message": "Not found: Dataset my-project:my-dataset was not found in location US"
    },
    "authenticationInfo": { ... },
    "requestMetadata":  { ... },
    "serviceName": "bigquery.googleapis.com",
    "methodName": "google.cloud.bigquery.v2.JobService.InsertJob",
    "metadata": {
  },
  "resource": {
    "type": "bigquery_project",
    "labels": { .. },
  },
  "severity": "ERROR",
  "logName": "projects/my-project/logs/cloudaudit.googleapis.com%2Fdata_access",
  ...
}
```

## Options / Props

### Metrics, logs and audit formats

| Topic | Detail |
|---|---|
| Metric availability | Metrics for a query become available only after the query succeeds and can take up to seven minutes to be reported; metrics for failed queries are not reported |
| Metric resource types | `bigquery_dataset`, `bigquery_project` or `global`, each with labels for grouping and filtering |
| Audit log categories | Administrative activity, data access, and system events |
| Audit payload | `protoPayload` is an `AuditLog` (`@type` is `type.googleapis.com/google.cloud.audit.AuditLog`) |
| Older format (datasets, tables, jobs) | `resource.type` is `bigquery_resource`; details in `protoPayload.serviceData` (`AuditData`) |
| Newer format (recommended) | `resource.type` is `bigquery_project` (jobs) or `bigquery_dataset` (storage); details in `protoPayload.metadata` (`BigQueryAuditMetadata`) |
| BigQuery Reservations | `protoPayload` is an `AuditLog`; `protoPayload.request` / `protoPayload.response` hold details (BigQuery Reservation API) |
| Missing audit logs | Not emitted for every disruption: failed jobs don't generate `TableDataRead` or `TableDataChange` events, and `jobCompletedEvent` only records successful completions |

### Telemetry map

In view names, an asterisk (`*`) stands for scope variants such as `_BY_PROJECT`, `_BY_USER`, `_BY_FOLDER`, `_BY_ORGANIZATION`.

| Feature or resource | Operational monitoring | Audited API service and resources; audit logs |
|---|---|---|
| Queries and jobs | `INFORMATION_SCHEMA.JOBS*` (job execution, slot milliseconds, bytes billed, stages, all submitted jobs regardless of status), `JOBS_TIMELINE*`; Jobs explorer and administrative resource charts; metrics such as `query/count`, `query/execution_times`, `job/num_in_flight` | `bigquery.googleapis.com`; jobs in `JobService` (`bigquery_project`); Data Access logs with `BigQueryAuditMetadata` (`JobInsertion`, `JobChange`) |
| Tables and views | `TABLES`, `VIEWS`, `TABLE_STORAGE*`, `PARTITIONS`, `STREAMING_TIMELINE*`, `WRITE_API_TIMELINE*`; metrics such as `storage/stored_bytes`, `storage/table_count` | `bigquery.googleapis.com` and `bigquerystorage.googleapis.com` (Data Access logs for the Storage API use `bigquery.googleapis.com`, Policy Denied logs use `bigquerystorage.googleapis.com`); `TableService`, `TableDataService`, `BigQueryRead`, `BigQueryWrite` (`bigquery_dataset`, `bigquery_table`); `TableDataRead` / `TableDataChange` Data Access events plus `TableCreation` / `TableChange` / `TableDeletion` in Admin Activity, Data Access and System Event logs |
| Datasets | `SCHEMATA`, `SCHEMATA_OPTIONS`, `SCHEMATA_REPLICAS` (cross-region replication status) | `bigquery.googleapis.com`; `DatasetService`, `IAMPolicy` (`bigquery_dataset`); `DatasetCreation`, `DatasetChange`, `DatasetDeletion` events, with IAM changes in `bindingDeltas` and ACL changes in `accessChanges` |
| Slots and reservations | `RESERVATIONS*`, `RESERVATIONS_TIMELINE*`, `ASSIGNMENTS*`, `CAPACITY_COMMITMENTS*`; administrative resource charts, slot estimator; metrics such as `slots/allocated`, `slots/total_available` | `bigqueryreservation.googleapis.com`; `ReservationService` (`bigquery_project`); Admin Activity and Data Access logs (Reservation API audit logging) |
| Column-level security and data masking | `COLUMN_FIELD_PATHS` (policy tags, data policy assignments), `COLUMNS` | `datacatalog.googleapis.com` (policy tags), `bigquerydatapolicy.googleapis.com` (Data Policy API), `bigquery.googleapis.com`; `PolicyTagManager`, `DataPolicyService` (`audited_resource`, `bigquery_dataset`); `TableDataRead.fields` logs for reads on protected columns |
| Routines (UDFs, table functions, stored procedures) | `ROUTINES`, `ROUTINE_OPTIONS`, `PARAMETERS`, `JOBS*` | `bigquery.googleapis.com`; `RoutineService` (`bigquery_dataset`, `bigquery_project`); `RoutineCreation`, `RoutineChange`, `RoutineDeletion` events, plus child job events for stored procedure runs |
| External connections | `OBJECT_PRIVILEGES`, `JOBS*` (federated queries and remote function jobs using connections) | `bigqueryconnection.googleapis.com`; `ConnectionService` (`audited_resource`); Admin Activity and Data Access logs (Connection API audit logging) |
| BigQuery sharing (formerly Analytics Hub) | `SHARED_DATASET_USAGE`, `SCHEMATA_LINKS`; sharing usage metrics dashboard | `analyticshub.googleapis.com`; `AnalyticsHubService` (`audited_resource`); Admin Activity and Data Access logs |
| BigQuery Data Transfer Service | Transfer metrics; transfer run logs in Logging under `resource.type="bigquery_dts_config"` | `bigquerydatatransfer.googleapis.com`; `DataTransferService` (`audited_resource`); Admin Activity and Data Access logs |
| BigLake catalogs and tables (BigLake is now called Lakehouse) | `TABLES`, `JOBS*` (`metadata_cache_statistics`, `object_storage_stats`) | `biglake.googleapis.com` and `bigquery.googleapis.com`; `MetastoreService`, `HiveMetastoreService`, `IcebergCatalogService` (`audited_resource`, `bigquery_dataset`); Admin Activity and Data Access logs |
| BigQuery Migration Service | Batch SQL translation job status in the console; workflow and subtask status in the Migration API; translation reports in Cloud Storage | `bigquerymigration.googleapis.com`; `MigrationService`, `SqlTranslationService` (`audited_resource`); Data Access logs |

## Notes

- Example information schema queries for slot and reservation utilization, job execution and job errors are on GitHub: https://github.com/GoogleCloudPlatform/bigquery-utils/tree/master/dashboards/system_tables.
- INFORMATION_SCHEMA example questions the source lists: average slot utilization of all queries over the past 7 days for a project; users who submitted a batch load job; streaming errors in the past 30 minutes grouped by error code. See jobs, streaming and reservations metadata views.
- The abbreviated log entry is shown as `text` because the source JSON is not valid (it uses `...` and `{ .. }` elisions).
- Console monitoring tools: Monitor health, resource utilization, and jobs (https://docs.cloud.google.com/bigquery/docs/admin-resource-charts) and Monitor jobs (https://docs.cloud.google.com/bigquery/docs/admin-jobs-explorer).
- Cloud Monitoring, Cloud Logging and Cloud Audit Logs themselves are covered by the `gcp-observability` skill; this page only maps BigQuery telemetry.
- Source: https://docs.cloud.google.com/bigquery/docs/monitoring (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [audit-logging.md](./audit-logging.md)
- [customer-managed-encryption.md](./customer-managed-encryption.md)
- Creating charts and alerts for BigQuery: https://docs.cloud.google.com/bigquery/docs/monitoring-dashboard
- Monitoring BigQuery Reservations: https://docs.cloud.google.com/bigquery/docs/reservations-monitoring
- INFORMATION_SCHEMA introduction: https://docs.cloud.google.com/bigquery/docs/information-schema-intro
- Audit logs migration guide: https://docs.cloud.google.com/bigquery/docs/reference/auditlogs/migration
