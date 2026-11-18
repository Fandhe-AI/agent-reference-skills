---
source: https://docs.cloud.google.com/logging/docs/view/query-library
---

# Sample Logging queries: usage and per-service queries

Suggested Logging query language queries for the Logs Explorer, the Logging API and `gcloud logging read`. This page holds the usage rules plus the App Engine, API enable / disable, BigQuery, Cloud Deployment Manager, Cloud Monitoring, Cloud Run functions, Cloud Run, Cloud Source Repositories, Cloud SQL, Cloud Storage, Google Cloud Armor, Cloud Tasks, Dataflow, Google Cloud Observability, Spanner, Managed Service for Apache Airflow and Managed Service for Apache Spark queries. Compute Engine, networking and third-party queries are in [query-library-compute-networking.md](./query-library-compute-networking.md), Kubernetes in [query-library-kubernetes.md](./query-library-kubernetes.md), IAM and security in [query-library-security-iam.md](./query-library-security-iam.md).

## Signature / Usage

### Run a sample query

Copy an expression into the Logs Explorer query-editor field (enable **Show query** if it is hidden), review it, and click **Run query**. The same expression works in the Logging API and the CLI. Replace upper-case placeholders (`PROJECT_ID`, `BUCKET_NAME`, ...) with real values.

```text
resource.type="gae_app" AND severity>=ERROR AND timestamp>="2018-12-31T00:00:00Z" AND timestamp<="2019-01-01T00:00:00Z"
```

## Options / Props

### Usage rules

| Rule | Detail |
|---|---|
| IAM | Needs the permissions or roles for building queries in the Logs Explorer (see Permissions for the Google Cloud console). |
| `logName` placeholders | The `PROJECT_ID` you supply must refer to the selected project, otherwise the query won't work. |
| Timestamps | A query with a timestamp disables the time-range selector and uses the expression as the restriction. |
| Length | A query can't exceed 20,000 characters. |
| Case | The language is case-insensitive except regular expressions. |
| `log_id` | `log_name="projects/PROJECT_ID/logs/cloudaudit.googleapis.com%2Fdata_access"` is the same as `log_id("cloudaudit.googleapis.com/data_access")`. |

### App Engine

| Query/filter name | Expression |
|---|---|
| App Engine logs from New Year's Eve (in UTC time) | `resource.type="gae_app" AND severity>=ERROR AND timestamp>="2018-12-31T00:00:00Z" AND timestamp<="2019-01-01T00:00:00Z"` |
| App Engine request logs with server errors | `resource.type="gae_app" AND log_id("appengine.googleapis.com/request_log") AND httpRequest.status>=500` |
| Sampled HTTP error logs | `resource.type="gae_app" AND protoPayload.status >= 400 AND sample(insertId, 0.1)` |
| Search for App Engine trace ID | `resource.type="gae_app" AND trace="projects/PROJECT_ID/traces/TRACE_ID"` |
| App Engine logs | `resource.type="gae_app" AND resource.labels.module_id="MODULE_ID" AND resource.labels.version_id="VERSION_ID"` |
| Recent App Engine deployments | `resource.type="gae_app" AND protoPayload.@type="type.googleapis.com/google.cloud.audit.AuditLog" AND protoPayload.serviceName="appengine.googleapis.com"` |

### API enable and disable

| Query/filter name | Expression |
|---|---|
| Audit API enable logs | `protoPayload.methodName="google.api.serviceusage.v1.ServiceUsage.EnableService"` |
| Audit API disable logs | `protoPayload.methodName="google.api.serviceusage.v1.ServiceUsage.DisableService"` |

### BigQuery

| Query/filter name | Expression |
|---|---|
| BigQuery audit logs | `resource.type= ("bigquery_dataset" OR "bigquery_project") AND logName:"cloudaudit.googleapis.com"` |
| BigQuery audit logs for a project | `resource.type="bigquery_project" AND logName:"cloudaudit.googleapis.com"` |
| BigQuery audit logs for a dataset | `resource.type="bigquery_dataset" AND logName:"cloudaudit.googleapis.com"` |
| BigQuery audit logs for BI Engine Model | `resource.type="bigquery_biengine_model" AND logName:"cloudaudit.googleapis.com"` |
| BigQuery audit logs for a Data Transfer Service Run. | `resource.type="bigquery_dts_run" AND logName:"cloudaudit.googleapis.com"` |
| BigQuery audit logs for a Data Transfer Service configuration. | `resource.type="bigquery_dts_config" AND logName:"cloudaudit.googleapis.com"` |
| BigQuery data transfer service jobs | `resource.type="bigquery_project" AND protoPayload.requestMetadata.callerSuppliedUserAgent= "BigQuery Data Transfer Service" AND protoPayload.methodName= ("google.cloud.bigquery.v2.JobService.InsertJob" OR "google.cloud.bigquery.v2.JobService.Query")` |
| BigQuery transfer run logs | `resource.type="bigquery_dts_config" AND labels.run_id="RUN_ID" AND resource.labels.config_id="CONFIG_ID"` |
| BigQuery dataset updates | `resource.type="bigquery_dataset" AND log_id("cloudaudit.googleapis.com/activity") AND protoPayload.methodName= "google.cloud.bigquery.v2.DatasetService.UpdateDataset"` |
| BigQuery jobs completed | `resource.type="bigquery_project" AND log_id("cloudaudit.googleapis.com/data_access") AND protoPayload.methodName= ("google.cloud.bigquery.v2.JobService.InsertJob" OR "google.cloud.bigquery.v2.JobService.Query")` |
| BigQuery large queries | `resource.type="bigquery_project" AND protoPayload.metadata.jobChange.job.jobStats.queryStats.totalBilledBytes > 1073741824` |
| BigQuery quota exceeded | `resource.type= ("bigquery_dataset" OR "bigquery_project") AND protoPayload.status.code=8 AND severity>=WARNING` |
| BigQuery query started | `resource.type="bigquery_project" AND protoPayload.metadata.jobInsertion.reason:*` |
| BigQuery concurrent load/extract jobs | `resource.type="bigquery_resource" AND protoPayload.methodName="jobservice.insert" AND protoPayload.serviceData.jobInsertRequest.resource.jobConfiguration.query.query: "extract"` |
| BigQuery audit logs for Row Access Policy | `protoPayload.methodName="jobservice.insert" AND protoPayload.serviceData.jobInsertRequest.resource.jobConfiguration.query.query: "ROW ACCESS POLICY"` |

### Cloud Deployment Manager

| Query/filter name | Expression |
|---|---|
| Deployment Manager errors | `resource.type="deployment" AND severity>=ERROR` |

### Cloud Monitoring

| Query/filter name | Expression |
|---|---|
| Show all notification channel errors | `resource.type="stackdriver_notification_channel" AND severity>=ERROR` |
| Show notification channel errors due to throttling | `resource.type="stackdriver_notification_channel" AND severity>=ERROR AND jsonPayload.summary="Notification delivery throttled."` |
| Show logs written by the uptime resource | `resource.type="uptime_url"` |
| Show requests received from the uptime-check service | `"GoogleStackdriverMonitoring-UptimeChecks"` |
| Alerting policy activity logs | `(log_id("cloudaudit.googleapis.com/activity") OR log_id("cloudaudit.googleapis.com/data_access")) AND protoPayload.methodName=~"google.monitoring.v3.AlertPolicyService" AND (protoPayload.resourceName="projects/PROJECT_ID/alertPolicies/POLICY_ID" OR protoPayload.response.name="projects/PROJECT_ID/alertPolicies/POLICY_ID")` |
| Dashboard update errors | `log_id("cloudaudit.googleapis.com/activity") AND protoPayload.methodName= "google.monitoring.dashboard.v1.DashboardsService.UpdateDashboard" AND severity=ERROR` |
| Alerting policy incident violations | `log_id("monitoring.googleapis.com/Violation") AND labels.policy_id="POLICY_ID"` |
| Log-based metric configuration logs | `resource.type="metric" AND protoPayload.@type="type.googleapis.com/google.cloud.audit.AuditLog" AND protoPayload.methodName=~"google.logging.v2.MetricsServiceV2" AND protoPayload.resourceName="projects/PROJECT_ID/metrics/METRIC_NAME"` |

### Cloud Run functions

| Query/filter name | Expression |
|---|---|
| Cloud Run functions errors | `resource.type="cloud_function" AND log_id("cloudfunctions.googleapis.com/cloud-functions") AND severity>=ERROR` |
| Cloud Run functions execution logs | `resource.type="cloud_function" AND resource.labels.function_name="FUNCTION_NAME" AND resource.labels.region="REGION"` |
| Cloud Run functions pending queue abort errors | `resource.type="cloud_function" AND resource.labels.function_name="FUNCTION_NAME" AND textPayload="The request was aborted because there was no available instance." AND severity>=WARNING` |
| Cloud Run functions org policy violation on upload URL generation | `resource.type="cloud_function" AND protoPayload.methodName= "google.cloud.functions.v1.CloudFunctionsService.GenerateUploadUrl" AND protoPayload.status.message:"The request has violated one or more Org Policies" AND severity>=ERROR` |
| Cloud Run functions build logs | `resource.type="build" AND resource.labels.build_id="BUILD_ID" AND log_id("cloudbuild")` |
| Cloud Run functions VPC Service Controls denials | `resource.type="audited_resource" AND protoPayload.serviceName="cloudfunctions.googleapis.com" AND protoPayload.metadata.@type= "type.googleapis.com/google.cloud.audit.VpcServiceControlAuditMetadata"` |

### Cloud Run

| Query/filter name | Expression |
|---|---|
| Cloud Run logs for a specific job | `resource.type="cloud_run_job" AND resource.labels.job_name="JOB_NAME"` |
| Cloud Run logs for a specific revision and service | `resource.type="cloud_run_revision" AND resource.labels.service_name="SERVICE_NAME"` |

### Cloud Source Repositories

| Query/filter name | Expression |
|---|---|
| Cloud Source Repository logs | `resource.type="csr_repository" AND resource.labels.name="REPOSITORY_NAME"` |

### Cloud SQL

| Query/filter name | Expression |
|---|---|
| Cloud SQL audit logs | `resource.type="cloudsql_database" AND resource.labels.database_id="DATABASE_ID" AND log_id("cloudaudit.googleapis.com/activity")` |
| Cloud SQL instance deletion logs | `resource.type="cloudsql_database" AND resource.labels.database_id="PROJECT_ID:INSTANCE_ID" AND protoPayload.methodName="cloudsql.instances.delete"` |
| Cloud SQL MySQL error logs | `resource.type="cloudsql_database" AND log_id("cloudsql.googleapis.com/mysql.err")` |
| Cloud SQL MySQL-based databases | `resource.type="cloudsql_database" AND resource.labels.database_id="DATABASE_ID" AND log_id("cloudsql.googleapis.com/mysql")` |
| Cloud SQL Postgres-based databases | `resource.type="cloudsql_database" AND resource.labels.database_id="DATABASE_ID" AND log_id("cloudsql.googleapis.com/postgres.log")` |
| Cloud SQL SQL Server error logs | `resource.type="cloudsql_database" AND log_id("cloudsql.googleapis.com/sqlserver.err")` |
| Cloud SQL SQL Server-based databases | `resource.type="cloudsql_database" AND resource.labels.database_id="DATABASE_ID" AND log_id("cloudsql.googleapis.com/sqlagent.out")` |

### Cloud Storage

| Query/filter name | Expression |
|---|---|
| Cloud Storage bucket logs | `resource.type="gcs_bucket" AND resource.labels.bucket_name="BUCKET_NAME"` |
| Cloud Storage bucket audit logs | `resource.type="gcs_bucket" AND logName:"cloudaudit.googleapis.com"` |
| Cloud Storage bucket creation logs | `resource.type="gcs_bucket" AND log_id("cloudaudit.googleapis.com/activity") AND protoPayload.methodName="storage.buckets.create"` |
| Cloud Storage bucket deletion logs | `resource.type="gcs_bucket" AND log_id("cloudaudit.googleapis.com/activity") AND protoPayload.methodName="storage.buckets.delete"` |
| Cloud Storage bucket IAM policy changes | `resource.type="gcs_bucket" AND resource.labels.bucket_name="BUCKET_NAME" AND protoPayload.serviceName="storage.googleapis.com" AND protoPayload.methodName="storage.setIamPermissions"` |

### Google Cloud Armor

| Query/filter name | Expression |
|---|---|
| Google Cloud Armor security policy logs | `resource.type="http_load_balancer" AND jsonPayload.enforcedSecurityPolicy.name="POLICY_NAME"` |
| Google Cloud Armor backend security policy deny logs | `jsonPayload.enforcedSecurityPolicy.outcome="DENY" AND jsonPayload.enforcedSecurityPolicy.name="BACKEND_POLICY_NAME"` |
| Google Cloud Armor backend security policy allow logs | `jsonPayload.enforcedSecurityPolicy.outcome="ALLOW" AND jsonPayload.enforcedSecurityPolicy.name="BACKEND_POLICY_NAME"` |
| Google Cloud Armor edge security policy deny logs | `jsonPayload.enforcedEdgeSecurityPolicy.outcome="DENY" AND jsonPayload.enforcedEdgeSecurityPolicy.name="EDGE_POLICY_NAME"` |
| Google Cloud Armor edge security policy allow logs | `jsonPayload.enforcedEdgeSecurityPolicy.outcome="ALLOW" AND jsonPayload.enforcedEdgeSecurityPolicy.name="EDGE_POLICY_NAME"` |

### Cloud Tasks

| Query/filter name | Expression |
|---|---|
| Cloud Tasks queue logs | `resource.type="cloud_tasks_queue" AND resource.labels.queue_id="QUEUE_ID"` |

### Dataflow

| Query/filter name | Expression |
|---|---|
| Errors and warnings in Dataflow workers | `resource.type="dataflow_step" AND log_id("dataflow.googleapis.com/worker") AND severity>=WARNING` |
| Dataflow job activity logs | `resource.type="dataflow_step" AND log_id("cloudaudit.googleapis.com/activity")` |
| Dataflow job message and launcher logs | `resource.type="dataflow_step" AND (log_id("dataflow.googleapis.com/job-message") OR log_id("dataflow.googleapis.com/launcher")) AND resource.labels.job_id="JOB_ID"` |
| Dataflow worker logs for a specific job | `resource.type="dataflow_step" AND log_id("dataflow.googleapis.com/worker") AND resource.labels.job_id="JOB_ID"` |

### Google Cloud Observability

| Query/filter name | Expression |
|---|---|
| Log sink activities | `resource.type="logging_sink" AND log_id("cloudaudit.googleapis.com/activity")` |
| Log-based metric create or update activities | `resource.type="metric" AND log_id("cloudaudit.googleapis.com/activity") AND protoPayload.methodName:(UpdateLogMetric OR CreateLogMetric)` |
| Uptime URL checks for a host | `resource.type="uptime_url" AND resource.labels.host="URL"` |

### Spanner

| Query/filter name | Expression |
|---|---|
| Cloud Spanner logs for a specific spanner instance | `resource.type="spanner_instance" AND resource.labels.instance_id="SPANNER_INSTANCE"` |

### Managed Service for Apache Airflow

| Query/filter name | Expression |
|---|---|
| Environment build logs | `resource.type="cloud_composer_environment" AND resource.labels.location="LOCATION" AND resource.labels.environment_name="ENVIRONMENT_NAME" AND log_id("build-log")` |
| composer-agent logs | `resource.type="cloud_composer_environment" AND resource.labels.location="LOCATION" AND resource.labels.environment_name="ENVIRONMENT_NAME" AND log_id("composer-agent")` |
| DAG processor manager logs | `resource.type="cloud_composer_environment" AND resource.labels.location="LOCATION" AND resource.labels.environment_name="ENVIRONMENT_NAME" AND log_id("dag-processor-manager")` |
| Cloud Storage syncd logs | `resource.type="cloud_composer_environment" AND resource.labels.location="LOCATION" AND resource.labels.environment_name="ENVIRONMENT_NAME" AND log_id("gcs-syncd")` |
| Airflow monitoring logs | `resource.type="cloud_composer_environment" AND resource.labels.location="LOCATION" AND resource.labels.environment_name="ENVIRONMENT_NAME" AND log_id("airflow-monitoring")` |
| Airflow scheduler logs | `resource.type="cloud_composer_environment" AND resource.labels.location="LOCATION" AND resource.labels.environment_name="ENVIRONMENT_NAME" AND log_id("airflow-scheduler")` |
| Airflow webserver logs | `resource.type="cloud_composer_environment" AND resource.labels.location="LOCATION" AND resource.labels.environment_name="ENVIRONMENT_NAME" AND log_id("airflow-webserver")` |
| Airflow worker logs | `resource.type="cloud_composer_environment" AND resource.labels.location="LOCATION" AND resource.labels.environment_name="ENVIRONMENT_NAME" AND log_id=~"airflow-(k8s-)?worker"` |

### Managed Service for Apache Spark

| Query/filter name | Expression |
|---|---|
| Hadoop logs | `resource.type="cloud_dataproc_cluster" AND jsonPayload.class:"org.apache.hadoop.mapreduce"` |
| Cluster creation logs | `resource.type="cloud_dataproc_cluster" AND log_id("cloudaudit.googleapis.com/activity") AND protoPayload.methodName:"ClusterController.CreateCluster" AND resource.labels.cluster_name="DP_CLUSTER_NAME"` |
| Cluster deletion logs | `resource.type="cloud_dataproc_cluster" AND log_id("cloudaudit.googleapis.com/activity") AND protoPayload.methodName:"ClusterController.DeleteCluster" AND resource.labels.cluster_name="DP_CLUSTER_NAME"` |

## Notes

- In the Airflow and Spark tables the query names drop the "Managed Service for Apache Airflow / Spark" prefix the source uses; the expressions are verbatim.
- Audit-log queries return Admin Activity and Data Access entries that can contain principal emails, request and response payloads and other personal data; keep access to them restricted and do not copy results into places that expose credentials.
- Sink, bucket and deletion queries (for example Cloud Storage bucket deletion, Cloud SQL instance deletion, log sink activities) only read audit entries; they don't change anything.
- Corrected from the official docs: the "Log-based metric configuration logs" query read `protoPayload.resourceName="projects/PROJECT_ID/metric/METRIC_NAME"`; a log-based metric's resource name is `projects/[PROJECT_ID]/metrics/[METRIC_ID]` (Logging v2 Discovery document, `projects.metrics.get` `metricName`, pattern `^projects/[^/]+/metrics/[^/]+$`).
- The source also shows Console copy-and-paste steps and a screenshot of the query pane.
- Source: https://docs.cloud.google.com/logging/docs/view/query-library (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [query-library-compute-networking.md](./query-library-compute-networking.md)
- [query-library-kubernetes.md](./query-library-kubernetes.md)
- [query-library-security-iam.md](./query-library-security-iam.md)
- [building-queries.md](./building-queries.md)
- [logging-query-language.md](./logging-query-language.md)
