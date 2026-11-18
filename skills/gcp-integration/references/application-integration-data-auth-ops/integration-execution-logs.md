---
source: https://docs.cloud.google.com/application-integration/docs/integration-execution-logs
---

# View integration execution logs

Application Integration generates detailed execution logs for every run of an integration, useful to troubleshoot failed runs, see each step's status and monitor main and sub-integrations. View them in the Google Cloud console (**Logs**) or with the API. Application Integration retains the execution logs of an integration for a maximum of 32 days.

## Signature / Usage

### List executions with the API (large logs)

If the execution logs are larger than 300 MB, the **Execution Logs** page fails to load (the source names the error `Response size too large`, and elsewhere `Response too large error`); use `projects.locations.integrations.executions.list`. First get execution IDs with `snapshotMetadataWithoutParams` set to true (replace `PROJECT_ID`, `LOCATION` = integration region, `INTEGRATION_NAME`):

Adapted (not in the official docs): removed `-v` from the first call so verbose output does not print the request headers, including the bearer token.

```bash
curl -X GET \
    -G \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $(gcloud auth print-access-token)" \
    'https://integrations.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/integrations/INTEGRATION_NAME/executions' \
    -d "snapshotMetadataWithoutParams=true"
```

Then filter on the execution ID; read the log details in the `ExecutionDetails` field of the response:

```bash
curl -X GET \
    -G \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $(gcloud auth print-access-token)" \
    'https://integrations.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/integrations/-/executions' \
    --data-urlencode 'filter=execution_id="EXECUTION_ID"'
```

List logs for all integrations except one:

```bash
curl -X GET \
    -G \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $(gcloud auth print-access-token)" \
    'https://integrations.googleapis.com/v1/projects/PROJECT_ID/locations/LOCATION/integrations/-/executions' \
    --data-urlencode 'filter=workflow_name!="INTEGRATION_NAME"'
```

### Trace a failed connectors task in Logs Explorer

Log data of a failed Connectors task is stored in Cloud Logging, available only if Cloud Logging is enabled for the connection in Integration Connectors. In **Execution Logs**, expand the failed execution to the failed Connectors task row and click **Failed** to open Logs Explorer with the query, or run it manually:

```text
resource.type="connectors.googleapis.com/Connection"
jsonPayload.integration_connectors_trace_id="EXECUTION_ID_EXECUTION_TASK_ID_EXECUTION_ATTEMPT_NUMBER"
```

```text
resource.type="connectors.googleapis.com/Connection"
jsonPayload.integration_connectors_trace_id="9db51e4b-7d57-473d-931f-cc27b282dfad_1_2"
```

## Options / Props

### Execution log attributes (Console)

| Attribute | Meaning |
|---|---|
| Integration name | Name of the integration. |
| Execution ID | Unique identifier generated for each run. |
| Status | In process, Succeeded, Failed, Canceled, On hold (paused, waiting for an event or action), Retry on hold (failed, waiting for a retry), Suspended (paused, requires manual intervention to resume). |
| Start time / Duration | Start timestamp and time taken. Do not use **Duration** for end-to-end latency: it excludes time before or after execution such as quota enforcement or authentication. |
| Integration Version | Version of the integration executed. |
| Trigger ID | ID of the trigger. |
| Cloud Logging | Link to Cloud Logging if enabled, otherwise **Disabled**. |
| Replayed from | Execution ID that was replayed (replay re-runs a published integration execution with the same parameters). |

### API `filter` fields

| Field | Value format |
|---|---|
| `execution_id`, `workflow_name`, `trigger_id` | String values in double quotes. |
| `state` | An ExecutionDetails state such as `FAILED` or `SUCCEEDED`; no quotes (`state=FAILED`). |
| `create_timestamp`, `update_time` | RFC 3339 timestamp in UTC ending in `Z`; no quotes (for example `create_timestamp>=2026-10-01T00:00:00Z`). |

### Limits and retention

| Item | Value |
|---|---|
| Execution log retention | Maximum 32 days per integration. |
| Console load limit | Logs over 300 MB do not load; use the API. |
| Event parameter size | Execution log message event parameters (string or JSON) are truncated at 2000 characters. |

## Notes

- The **Task Execution Details** pane shows the complete, untruncated values of task variables.
- Filter logs by integration name, execution ID, date or time range, execution status, variable type, and variable name or value; for test case executions use `Integration name:INTEGRATION_NAME:TEST_CASE_NAME` (for example `Integration name:example-integration-name:example-test-case`). Multiple filters are combined with AND.
- Limitation: if local logging is disabled for an integration, execution logs are not generated for it.
- Sub-integration logs are available for Call Integration, For Each Parallel, For Each Loop and While Loop tasks. Logs can be downloaded as a JSON file per execution (Actions menu > **Download**).
- `snapshotMetadataWithoutParams` is an optional boolean query parameter of `projects.locations.integrations.executions.list` ("If true, the service will provide execution info with snapshot metadata only i.e. without event parameters"). The second and third calls use `-` as the integration ID; the source uses the third one to list logs for all integrations except one. REST reference: https://docs.cloud.google.com/application-integration/docs/reference/rest/v1/projects.locations.integrations.executions
- Source inconsistency: the `filter` parameter description in the `integrations` v1 Discovery document names `workflow_name`, `CreateTimestamp`, `event_execution_state`, `execution_id`, `trigger_id` and `parameter_type`, while the source page lists `execution_id`, `workflow_name`, `trigger_id`, `state`, `create_timestamp` and `update_time` (the table above follows the source page).
- Adapted from the official docs: the first `curl` call was shown as `curl -v -X GET -G ...`; `-v` was dropped because it would echo the `Authorization` header.
- To send execution logs to Cloud Logging, see the cloud-logging page in this category.
- Omitted: Console click-paths for filtering and the Troubleshoot-with-AI page (https://docs.cloud.google.com/application-integration/docs/troubleshoot-failed-execution-logs).
- Source: https://docs.cloud.google.com/application-integration/docs/integration-execution-logs (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [cloud-logging.md](./cloud-logging.md)
- [access-control.md](./access-control.md)
