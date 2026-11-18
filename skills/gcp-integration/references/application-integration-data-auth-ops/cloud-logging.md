---
source: https://docs.cloud.google.com/application-integration/docs/cloud-logging
---

# View logs in Cloud Logging

Integration execution logs in Cloud Logging contain status, performance, integration version, request and response parameters, and trigger and task configuration. Cloud Logging is disabled by default for integrations; you enable it by editing the unpublished (`DRAFT`) version of the integration.

## Signature / Usage

### Enable Cloud Logging

Open the integration, select the `DRAFT` version (settings of a published or non-draft unpublished version cannot be modified), click **Integration summary**, and in **Log settings** turn on **Enable Cloud Logging**, choose a **Severity**, and **Save**.

### View logs

Use **Logs > View Cloud Logs**, the **Cloud Logging** column **View** link, or **View Cloud Logs** in the **Test integration** pane. Logs Explorer opens showing the last three hours for the default query:

```text
resource.type=integrations.googleapis.com/IntegrationVersion
```

### Sample queries

All integration execution logs:

```text
resource.type="integrations.googleapis.com/IntegrationVersion"
```

A specific execution ID, searching only the parent executions with that ID:

```text
resource.type="integrations.googleapis.com/IntegrationVersion"
jsonPayload.executionId="EXECUTION_ID"
```

Both parent and child executions launched from the execution ID:

```text
resource.type="integrations.googleapis.com/IntegrationVersion"
"EXECUTION_ID"
```

A specific integration (either form):

```text
resource.type="integrations.googleapis.com/IntegrationVersion"
"INTEGRATION_NAME"
```

```text
resource.type="integrations.googleapis.com/IntegrationVersion"
jsonPayload.integration="INTEGRATION_NAME"
```

Failed executions of a specific integration:

```text
resource.type="integrations.googleapis.com/IntegrationVersion"
jsonPayload.integrationExecutionDetails.integrationExecutionState="FAILED"
jsonPayload.integration="INTEGRATION_NAME"
```

Logs with a specific request parameter name (here `requestUrl`):

```text
resource.type="integrations.googleapis.com/IntegrationVersion"
"requestUrl"
```

## Options / Props

### Severity and captured execution states

| Severity | Execution statuses captured |
|---|---|
| Info | `SUCCEEDED`, `FAILED`, `PROCESSING`, `PENDING`, `SUSPENDED`, `RETRY_ON_HOLD`, `CANCELLED` |
| Error | `FAILED`, `CANCELLED` |
| Warning | `FAILED`, `CANCELLED` (currently both Error and Warning capture the same states) |

### Limitations

| Limit | Detail |
|---|---|
| Log entry size | Cloud Logging supports entries up to 256 KiB. Above that, request and response parameters are not shown in the logging details; keep variable values under the limit or view the logs in Application Integration. |
| Local logging | If local logging is disabled, execution logs are not sent to Cloud Logging even if Cloud Logging is enabled. |

## Notes

- The log payload format is the `log_entries` proto: https://github.com/googleapis/googleapis/blob/master/google/cloud/integrations/v1alpha/log_entries.proto (the source links the `v1alpha` file).
- Cloud Logging pricing: https://docs.cloud.google.com/stackdriver/pricing#cloud-logging (prices are not copied). General Cloud Logging is covered by `gcp-observability`.
- Source: https://docs.cloud.google.com/application-integration/docs/cloud-logging (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [integration-execution-logs.md](./integration-execution-logs.md)
