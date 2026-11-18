---
source: https://workflowexecutions.googleapis.com/$discovery/rest?version=v1
---

# Workflow Executions API REST API (workflowexecutions)

## Signature / Usage

Base URL: `https://workflowexecutions.googleapis.com`. Methods are listed by `id`; the `Versions` line shows which API versions define the method (preferred: v1).

### `workflowexecutions.projects.locations.workflows.executions.callbacks.list`

- Versions: v1
- `GET https://workflowexecutions.googleapis.com/v1/{+parent}/callbacks`
- Returns a list of active callbacks that belong to the execution with the given name. The returned callbacks are ordered by callback ID.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListCallbacksResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Name of the execution for which the callbacks should be listed. Format: projects/{project}/locations/{location}/workflows/{workflow}/executions/{execution} |
| `pageSize` | query | integer (int32) | no | Maximum number of callbacks to return per call. The default value is 100 and is also the maximum value. |
| `pageToken` | query | string | no | A page token, received from a previous `ListCallbacks` call. Provide this to retrieve the subsequent page. Note that pagination is applied to dynamic data. The list of callbacks returned can change between page requests if callbacks are created or deleted. |

### `workflowexecutions.projects.locations.workflows.executions.cancel`

- Versions: v1, v1beta
- `POST https://workflowexecutions.googleapis.com/v1/{+name}:cancel`
- Cancels an execution of the given name.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `CancelExecutionRequest`; Response: `Execution`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the execution to be cancelled. Format: projects/{project}/locations/{location}/workflows/{workflow}/executions/{execution} |

### `workflowexecutions.projects.locations.workflows.executions.create`

- Versions: v1, v1beta
- `POST https://workflowexecutions.googleapis.com/v1/{+parent}/executions`
- Creates a new execution using the latest revision of the given workflow. For more information, see Execute a workflow.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Execution`; Response: `Execution`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Name of the workflow for which an execution should be created. Format: projects/{project}/locations/{location}/workflows/{workflow} The latest revision of the workflow will be used. |

### `workflowexecutions.projects.locations.workflows.executions.deleteExecutionHistory`

- Versions: v1
- `POST https://workflowexecutions.googleapis.com/v1/{+name}:deleteExecutionHistory`
- Deletes all step entries for an execution.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `DeleteExecutionHistoryRequest`; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the execution for which step entries should be deleted. Format: projects/{project}/locations/{location}/workflows/{workflow}/executions/{execution} |

### `workflowexecutions.projects.locations.workflows.executions.exportData`

- Versions: v1
- `GET https://workflowexecutions.googleapis.com/v1/{+name}:exportData`
- Returns all metadata stored about an execution, excluding most data that is already accessible using other API methods.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ExportDataResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the execution for which data is to be exported. Format: projects/{project}/locations/{location}/workflows/{workflow}/executions/{execution} |

### `workflowexecutions.projects.locations.workflows.executions.get`

- Versions: v1, v1beta
- `GET https://workflowexecutions.googleapis.com/v1/{+name}`
- Returns an execution of the given name.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Execution`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the execution to be retrieved. Format: projects/{project}/locations/{location}/workflows/{workflow}/executions/{execution} |
| `view` | query | string enum | no | Optional. A view defining which fields should be filled in the returned execution. The API will default to the FULL view. Values: `EXECUTION_VIEW_UNSPECIFIED`, `BASIC`, `FULL`. |

### `workflowexecutions.projects.locations.workflows.executions.list`

- Versions: v1, v1beta
- `GET https://workflowexecutions.googleapis.com/v1/{+parent}/executions`
- Returns a list of executions which belong to the workflow with the given name. The method returns executions of all workflow revisions. Returned executions are ordered by their start time (newest first).
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListExecutionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Name of the workflow for which the executions should be listed. Format: projects/{project}/locations/{location}/workflows/{workflow} |
| `filter` | query | string | no | Optional. Filters applied to the `[Executions.ListExecutions]` results. The following fields are supported for filtering: `executionId`, `state`, `createTime`, `startTime`, `endTime`, `duration`, `workflowRevisionId`, `stepName`, `label`, and `disableConcurrencyQuotaOverflowBuffering`. For details, see AIP-160. For more information, see Filter executions. For example, if you are using the Google APIs Explorer: `state="SUCCEEDED"` or `startTime>"2023-08-01" AND state="FAILED"` |
| `orderBy` | query | string | no | Optional. Comma-separated list of fields that specify the ordering applied to the `[Executions.ListExecutions]` results. By default the ordering is based on descending `createTime`. The following fields are supported for ordering: `executionId`, `state`, `createTime`, `startTime`, `endTime`, `duration`, and `workflowRevisionId`. For details, see AIP-132. |
| `pageSize` | query | integer (int32) | no | Maximum number of executions to return per call. Max supported value depends on the selected Execution view: it's 1000 for BASIC and 100 for FULL. The default value used if the field is not specified is 100, regardless of the selected view. Values greater than the max value will be coerced down to it. |
| `pageToken` | query | string | no | A page token, received from a previous `ListExecutions` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListExecutions` must match the call that provided the page token. Note that pagination is applied to dynamic data. The list of executions returned can change between page requests. |
| `view` | query | string enum | no | Optional. A view defining which fields should be filled in the returned executions. The API will default to the BASIC view. Values: `EXECUTION_VIEW_UNSPECIFIED`, `BASIC`, `FULL`. |

### `workflowexecutions.projects.locations.workflows.executions.stepEntries.get`

- Versions: v1
- `GET https://workflowexecutions.googleapis.com/v1/{+name}`
- Gets a step entry.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `StepEntry`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the step entry to retrieve. Format: projects/{project}/locations/{location}/workflows/{workflow}/executions/{execution}/stepEntries/{step_entry} |
| `view` | query | string enum | no | Deprecated field. Values: `EXECUTION_ENTRY_VIEW_UNSPECIFIED`, `EXECUTION_ENTRY_VIEW_BASIC`, `EXECUTION_ENTRY_VIEW_DETAILED`. |

### `workflowexecutions.projects.locations.workflows.executions.stepEntries.list`

- Versions: v1
- `GET https://workflowexecutions.googleapis.com/v1/{+parent}/stepEntries`
- Lists step entries for the corresponding workflow execution. Returned entries are ordered by their create_time.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListStepEntriesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Name of the workflow execution to list entries for. Format: projects/{project}/locations/{location}/workflows/{workflow}/executions/{execution} |
| `filter` | query | string | no | Optional. Filters applied to the `[StepEntries.ListStepEntries]` results. The following fields are supported for filtering: `entryId`, `createTime`, `updateTime`, `routine`, `step`, `stepType`, `parent`, `state`. For details, see AIP-160. For example, if you are using the Google APIs Explorer: `state="SUCCEEDED"` or `createTime>"2023-08-01" AND state="FAILED"` |
| `orderBy` | query | string | no | Optional. Comma-separated list of fields that specify the ordering applied to the `[StepEntries.ListStepEntries]` results. By default the ordering is based on ascending `entryId`. The following fields are supported for ordering: `entryId`, `createTime`, `updateTime`, `routine`, `step`, `stepType`, `state`. For details, see AIP-132. |
| `pageSize` | query | integer (int32) | no | Optional. Number of step entries to return per call. The default max is 1000. |
| `pageToken` | query | string | no | Optional. A page token, received from a previous `ListStepEntries` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListStepEntries` must match the call that provided the page token. |
| `skip` | query | integer (int32) | no | Optional. The number of step entries to skip. It can be used with or without a pageToken. If used with a pageToken, then it indicates the number of step entries to skip starting from the requested page. |
| `view` | query | string enum | no | Deprecated field. Values: `EXECUTION_ENTRY_VIEW_UNSPECIFIED`, `EXECUTION_ENTRY_VIEW_BASIC`, `EXECUTION_ENTRY_VIEW_DETAILED`. |

### `workflowexecutions.projects.locations.workflows.triggerPubsubExecution`

- Versions: v1
- `POST https://workflowexecutions.googleapis.com/v1/{+workflow}:triggerPubsubExecution`
- Triggers a new execution using the latest revision of the given workflow by a Pub/Sub push notification.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `TriggerPubsubExecutionRequest`; Response: `Execution`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `workflow` | path | string | yes | Required. Name of the workflow for which an execution should be created. Format: projects/{project}/locations/{location}/workflows/{workflow} |

### Example request skeleton

Generated from the Discovery entry of `workflowexecutions.projects.locations.workflows.executions.callbacks.list` (not in the official docs); replace the `{...}` path variables (URL-encode query values):

```bash
curl -X GET \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  "https://workflowexecutions.googleapis.com/v1/{+parent}/callbacks"
```

## Notes

- Generated from the Discovery document(s) v1, v1beta of `workflowexecutions` (retrieved 2026-11-14). Resources on this page: projects.
- The Required column is `yes` for path variables and required parameters, and `conditional` when the description says "Required if ..." (mutually exclusive alternatives), when a `parent.child` parameter is required only inside an optional parent message or one branch of a oneof. Path variables are `yes` unless a note below names an alternative route without them.
- Message schemas (the request and response types named above) are listed under `references/rest-schemas/workflowexecutions/`; they are the `schemas` section of the Discovery documents in Source.
- Regional endpoints: the Discovery document (`workflowexecutions` v1, revision 20261020) also lists 40 endpoints of the form `https://workflowexecutions.LOCATION.rep.googleapis.com/` (Regional Endpoint), for LOCATION in `africa-south1`, `asia-east1`, `asia-east2`, `asia-northeast1`, `asia-northeast3`, `asia-south1`, `asia-south2`, `asia-southeast1`, `asia-southeast2`, `australia-southeast1`, `australia-southeast2`, `europe-central2`, `europe-north1`, `europe-southwest1`, `europe-west1`, `europe-west10`, `europe-west12`, `europe-west2`, `europe-west3`, `europe-west4`, `europe-west6`, `europe-west8`, `europe-west9`, `me-central1`, `me-central2`, `me-west1`, `northamerica-northeast1`, `northamerica-northeast2`, `southamerica-east1`, `southamerica-west1`, `us-central1`, `us-east1`, `us-east4`, `us-east5`, `us-south1`, `us-west1`, `us-west2`, `us-west3`, `us-west4`, `us-west8`. The method URLs above use the global host `https://workflowexecutions.googleapis.com/`; to send a request through one of these endpoints, replace the host with the endpoint for the resource's location (for example `https://workflowexecutions.asia-east1.rep.googleapis.com/`) and keep the path.
- Source: https://workflowexecutions.googleapis.com/$discovery/rest?version=v1, https://workflowexecutions.googleapis.com/$discovery/rest?version=v1beta (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
