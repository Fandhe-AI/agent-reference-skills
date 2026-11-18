---
source: https://docs.cloud.google.com/workflows/docs/executing-workflow
---

# Execute a Workflow

Starting an execution runs the current workflow definition. You can execute from the console, the gcloud CLI, the Workflows Executions REST API, or the Cloud Client Libraries. Runtime arguments passed in the request are available as workflow variables. After an execution completes, its history and results are retained for a limited time (see Workflows quotas and limits).

## Signature / Usage

### Execute with gcloud

`run` executes and waits for completion; `execute` returns without waiting. `--data` takes a JSON string.

Adapted (not in the official docs): added `--location=LOCATION`, which is required unless the `workflows/location` property is set.

```bash
gcloud workflows run WORKFLOW_NAME \
    --location=LOCATION \
    --call-log-level=CALL_LOGGING_LEVEL \
    --execution-history-level="EXECUTION_HISTORY_LEVEL" \
    --data=DATA
```

Adapted (not in the official docs): added `--location=LOCATION`, which is required unless the `workflows/location` property is set.

```bash
gcloud workflows execute WORKFLOW_NAME \
    --location=LOCATION \
    --call-log-level=CALL_LOGGING_LEVEL \
    --execution-history-level="EXECUTION_HISTORY_LEVEL" \
    --data=DATA
```

`execute` prints the execution ID and a command to view the status:

```text
 To view the workflow status, you can use following command:
 gcloud workflows executions describe b113b589-8eff-4968-b830-8d35696f0b33 --workflow workflow-2 --location us-central1
```

Successful execution output (`state: SUCCEEDED`; `status` shows the final step).

Adapted (not in the official docs): aligned `step: returnOutput` with `routine: main` under `currentSteps` so the output is valid YAML.

```yaml
argument: '{"searchTerm":"Friday"}'
endTime: '2022-06-22T12:17:53.086073678Z'
name: projects/1051295516635/locations/us-central1/workflows/myFirstWorkflow/executions/c4dffd1f-13db-46a0-8a4a-ee39c144cb96
result: '["Friday","Friday the 13th (franchise)","Friday Night Lights (TV series)","Friday
    the 13th (1980 film)","Friday the 13th","Friday the 13th (2009 film)","Friday the
    13th Part III","Friday the 13th Part 2","Friday (Rebecca Black song)","Friday Night
    Lights (film)"]'
startTime: '2022-06-22T12:17:52.799387653Z'
state: SUCCEEDED
status:
    currentSteps:
    - routine: main
      step: returnOutput
workflowRevisionId: 000001-ac2
```

### Execute with REST

`projects.locations.workflows.executions.create` runs the latest revision. The endpoint uses `PROJECT_NUMBER`.

Adapted (not in the official docs): replaced the quoted placeholder `"BACKLOG_EXECUTION"` with the boolean `false`, because `disableConcurrencyQuotaOverflowBuffering` is a boolean (`false` keeps backlogging enabled).

```json
{
  "argument": "{\"PARAMETER\":\"VALUE\"}",
  "callLogLevel": "CALL_LOGGING_LEVEL",
  "disableConcurrencyQuotaOverflowBuffering": false,
  "executionHistoryLevel": "EXECUTION_HISTORY_LEVEL"
}
```

```bash
curl -X POST \
     -H "Authorization: Bearer $(gcloud auth print-access-token)" \
     -H "Content-Type: application/json; charset=utf-8" \
     -d @request.json \
     "https://workflowexecutions.googleapis.com/v1/projects/PROJECT_NUMBER/locations/LOCATION/workflows/WORKFLOW_NAME/executions"
```

A successful response is an `Execution` with `"state": "ACTIVE"`.

### Check execution status

```bash
gcloud workflows executions list WORKFLOW_NAME
```

Adapted (not in the official docs): added `--workflow=WORKFLOW_NAME`, which `executions wait` needs unless the execution is given as a fully qualified name, and `--location=LOCATION` (not needed when the `workflows/location` property is set).

```bash
gcloud workflows executions wait EXECUTION_ID --workflow=WORKFLOW_NAME --location=LOCATION
```

```bash
gcloud workflows executions wait-last
```

```bash
gcloud workflows executions describe-last
```

Without a previous execution in the same gcloud session, `wait-last` and `describe-last` return:

```text
ERROR: (gcloud.workflows.executions.wait-last) [NOT FOUND] There are no cached executions available.
```

### Filter executions

Filter `workflows.executions.list` results; the example filters on a label with `view=full`.

Adapted (not in the official docs): removed the stray backslash before `&` and the unmatched trailing quotation mark.

```text
GET https://workflowexecutions.googleapis.com/v1/projects/MY_PROJECT/locations/MY_LOCATION/workflows/MY_WORKFLOW/executions?view=full&filter=labels.%22fruit%22%3A%22apple%22
```

### Disable execution backlogging

Adapted (not in the official docs): added the missing line-continuation backslash and `--location=LOCATION` (not needed when the `workflows/location` property is set).

```bash
gcloud workflows execute WORKFLOW_NAME \
    --location=LOCATION \
    --disable-concurrency-quota-overflow-buffering
```

REST body field `disableConcurrencyQuotaOverflowBuffering`:

Adapted (not in the official docs): `argument` is a JSON string in the Executions API, so the object is passed as an escaped string.

```json
{
  "argument": "{\"arg1\":\"value1\"}",
  "callLogLevel": "LOG_NONE",
  "disableConcurrencyQuotaOverflowBuffering": true
}
```

## Options / Props

### `run` / `execute` flags

| Flag | Description |
|------|-------------|
| `WORKFLOW_NAME` | Workflow to execute |
| `--location` | Required unless the `workflows/location` property is set |
| `--data` | Runtime arguments as a JSON string |
| `--call-log-level` | `none` (default), `log-errors-only`, `log-all-calls`, `log-none`; an execution level takes precedence over the workflow level unless unspecified |
| `--execution-history-level` | `none` (default; the workflow's level applies, an execution level overrides it), `execution-history-basic`, `execution-history-detailed` |
| `--labels` | `KEY=VALUE` execution labels |
| `--disable-concurrency-quota-overflow-buffering` | Do not backlog when the concurrency quota is exhausted |

### REST `executions.create` fields

| Field | Values |
|-------|--------|
| `argument` | Escaped JSON string (Discovery: size limit 32KB) |
| `callLogLevel` | `CALL_LOG_LEVEL_UNSPECIFIED`, `LOG_ERRORS_ONLY`, `LOG_ALL_CALLS`, `LOG_NONE` |
| `executionHistoryLevel` | `EXECUTION_HISTORY_LEVEL_UNSPECIFIED`, `EXECUTION_HISTORY_BASIC`, `EXECUTION_HISTORY_DETAILED` |
| `disableConcurrencyQuotaOverflowBuffering` | Boolean |

### Filterable fields (`executions.list`)

| Fields |
|--------|
| `createTime`, `disableConcurrencyQuotaOverflowBuffering`, `duration`, `endTime`, `executionId`, `label`, `startTime`, `state`, `stepName`, `workflowRevisionId` |

## Notes

- The workflow's service account needs the right permissions for the resources it calls. To send logs to Cloud Logging it needs a role with `logging.logEntries.create` (for example Logs Writer). To execute through REST, the caller needs a service account with sufficient privileges, for example Workflows Invoker (`roles/workflows.invoker`).
- To open the console Execution details page you need `workflows.workflows.get`, `workflows.executions.get` and `workflows.stepEntries.list`.
- Backlogging is enabled by default for all requests (including those triggered by Cloud Tasks), except: executions created by the `executions.run` or `executions.create` connector are not backlogged unless you set `disableConcurrencyQuotaOverflowBuffering` to `false`; executions triggered by Pub/Sub are never backlogged and this can't be configured.
- When the active-execution concurrency quota is exhausted and backlogging is disabled (or the backlog quota is reached), new executions fail with HTTP `429 Too many requests`. With backlogging, they are created `QUEUED` and become `ACTIVE` when quota frees up. Queued executions start FIFO on a best-effort basis. `createTime` is when the execution is created; `startTime` is when it leaves the backlog. The backlog limit is observable with the `workflowexecutions.googleapis.com/executionbacklogentries` quota metric.
- Best practice from the source: if your executions are time-constrained or sensitive, backlogging is not recommended; consider disabling it.
- Corrected from the official docs: the source REST example wrote `"argument": {"arg1":"value1"}` (an object); the Executions API defines `argument` as a string.
- Corrected from the official docs: the source's `executions wait` and `execute --disable-concurrency-quota-overflow-buffering` examples omitted `--location`, and the latter lacked a line-continuation backslash. Other `executions` commands without `--location` rely on the `workflows/location` property.
- Corrected from the official docs: the sample output wrote `step: returnOutput` indented deeper than `routine: main`, which is not valid YAML.
- Corrected from the official docs: the source lists `EXECUTION_HISTORY_ADVANCED`; the Discovery document defines `EXECUTION_HISTORY_DETAILED`.
- Corrected from the official docs: the source lists the filter field `disableOverflowBuffering`; the Workflow Executions API Discovery description of the `filter` parameter names `disableConcurrencyQuotaOverflowBuffering`.
- The source also shows Console, PowerShell and APIs Explorer forms, and links to the Cloud Client Libraries page (https://docs.cloud.google.com/workflows/docs/execute-workflow-client-libraries).
- Source: https://docs.cloud.google.com/workflows/docs/executing-workflow (retrieved 2026-11-18; CC BY 4.0, code samples Apache 2.0)

## Related

- [overview.md](./overview.md)
- [creating-updating-workflow.md](./creating-updating-workflow.md)
- [best-practice.md](./best-practice.md)
