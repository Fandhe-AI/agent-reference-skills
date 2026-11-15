---
source: https://storagetransfer.googleapis.com/$discovery/rest?version=v1
---

# Storage Transfer API REST API (storagetransfer)

## Signature / Usage

Base URL: `https://storagetransfer.googleapis.com`. Methods are listed by `id`; the `Versions` line shows which API versions define the method (preferred: v1).

### `storagetransfer.googleServiceAccounts.get`

- Versions: v1
- `GET https://storagetransfer.googleapis.com/v1/googleServiceAccounts/{projectId}`
- Returns the Google service account that is used by Storage Transfer Service to access buckets in the project where transfers run or in other projects. Each Google service account is associated with one Google Cloud project. Users should add this service account to the Google Cloud Storage bucket ACLs to grant access to Storage Transfer Service. This service account is created and owned by Storage Transfer Service and can only be used by Storage Transfer Service.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleServiceAccount`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `projectId` | path | string | yes | Required. The ID of the Google Cloud project that the Google service account is associated with. |

### `storagetransfer.projects.agentPools.create`

- Versions: v1
- `POST https://storagetransfer.googleapis.com/v1/projects/{+projectId}/agentPools`
- Creates an agent pool resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `AgentPool`; Response: `AgentPool`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `projectId` | path | string | yes | Required. The ID of the Google Cloud project that owns the agent pool. |
| `agentPoolId` | query | string | yes | Required. The ID of the agent pool to create. The `agent_pool_id` must meet the following requirements: \* Length of 128 characters or less. \* Not start with the string `goog`. \* Start with a lowercase ASCII character, followed by: \* Zero or more: lowercase Latin alphabet characters, numerals, hyphens (`-`), periods (`.`), underscores (`_`), or tildes (`~`). \* One or more numerals or lowercase ASCII characters. As expressed by the regular expression: `^(?!goog)[a-z]([a-z0-9-._~]*[a-z0-9])?$`. |

### `storagetransfer.projects.agentPools.delete`

- Versions: v1
- `DELETE https://storagetransfer.googleapis.com/v1/{+name}`
- Deletes an agent pool.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the agent pool to delete. |

### `storagetransfer.projects.agentPools.get`

- Versions: v1
- `GET https://storagetransfer.googleapis.com/v1/{+name}`
- Gets an agent pool.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `AgentPool`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the agent pool to get. |

### `storagetransfer.projects.agentPools.list`

- Versions: v1
- `GET https://storagetransfer.googleapis.com/v1/projects/{+projectId}/agentPools`
- Lists agent pools.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListAgentPoolsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `projectId` | path | string | yes | Required. The ID of the Google Cloud project that owns the job. |
| `filter` | query | string | no | An optional list of query parameters specified as JSON text in the form of: `{"agentPoolNames":["agentpool1","agentpool2",...]}` Since `agentPoolNames` support multiple values, its values must be specified with array notation. When the filter is either empty or not provided, the list returns all agent pools for the project. |
| `pageSize` | query | integer (int32) | no | The list page size. The max allowed value is `256`. |
| `pageToken` | query | string | no | The list page token. |

### `storagetransfer.projects.agentPools.patch`

- Versions: v1
- `PATCH https://storagetransfer.googleapis.com/v1/{+name}`
- Updates an existing agent pool resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `AgentPool`; Response: `AgentPool`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Specifies a unique string that identifies the agent pool. Format: `projects/{project_id}/agentPools/{agent_pool_id}` |
| `updateMask` | query | string (google-fieldmask) | no | The \[field mask\] (https://developers.google.com/protocol-buffers/docs/reference/google.protobuf) of the fields in `agentPool` to update in this request. The following `agentPool` fields can be updated: \* display_name \* bandwidth_limit |

### `storagetransfer.transferJobs.create`

- Versions: v1
- `POST https://storagetransfer.googleapis.com/v1/transferJobs`
- Creates a transfer job that runs periodically.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `TransferJob`; Response: `TransferJob`

### `storagetransfer.transferJobs.delete`

- Versions: v1
- `DELETE https://storagetransfer.googleapis.com/v1/{+jobName}`
- Deletes a transfer job. Deleting a transfer job sets its status to DELETED.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `jobName` | path | string | yes | Required. The job to delete. |
| `projectId` | query | string | yes | Required. The ID of the Google Cloud project that owns the job. |

### `storagetransfer.transferJobs.get`

- Versions: v1
- `GET https://storagetransfer.googleapis.com/v1/{+jobName}`
- Gets a transfer job.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `TransferJob`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `jobName` | path | string | yes | Required. The job to get. |
| `projectId` | query | string | yes | Required. The ID of the Google Cloud project that owns the job. |

### `storagetransfer.transferJobs.list`

- Versions: v1
- `GET https://storagetransfer.googleapis.com/v1/transferJobs`
- Lists transfer jobs.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListTransferJobsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `filter` | query | string | yes | Required. A list of query parameters specified as JSON text in the form of: { "projectId":"my_project_id", "jobNames":\["jobid1","jobid2",...\], "jobStatuses":\["status1","status2",...\], "dataBackend":"QUERY_REPLICATION_CONFIGS", "sourceBucket":"source-bucket-name", "sinkBucket":"sink-bucket-name", } The JSON formatting in the example is for display only; provide the query parameters without spaces or line breaks. \* `projectId` is required. \* Since `jobNames` and `jobStatuses` support multiple values, their values must be specified with array notation. `jobNames` and `jobStatuses` are optional. Valid values are case-insensitive: \* ENABLED \* DISABLED \* DELETED \* Specify `"dataBackend":"QUERY_REPLICATION_CONFIGS"` to return a list of cross-bucket replication jobs. \* Limit the results to jobs from a particular bucket with `sourceBucket` and/or to a particular bucket with `sinkBucket`. |
| `pageSize` | query | integer (int32) | no | The list page size. The max allowed value is 256. |
| `pageToken` | query | string | no | The list page token. |

### `storagetransfer.transferJobs.patch`

- Versions: v1
- `PATCH https://storagetransfer.googleapis.com/v1/{+jobName}`
- Updates a transfer job. Updating a job's transfer spec does not affect transfer operations that are running already. \*\*Note:\*\* The job's status field can be modified using this RPC (for example, to set a job's status to DELETED, DISABLED, or ENABLED).
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `UpdateTransferJobRequest`; Response: `TransferJob`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `jobName` | path | string | yes | Required. The name of job to update. |

### `storagetransfer.transferJobs.run`

- Versions: v1
- `POST https://storagetransfer.googleapis.com/v1/{+jobName}:run`
- Starts a new operation for the specified transfer job. A `TransferJob` has a maximum of one active `TransferOperation`. If this method is called while a `TransferOperation` is active, an error is returned.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `RunTransferJobRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `jobName` | path | string | yes | Required. The name of the transfer job. |

### `storagetransfer.transferOperations.cancel`

- Versions: v1
- `POST https://storagetransfer.googleapis.com/v1/{+name}:cancel`
- Cancels a transfer. Use the transferOperations.get method to check if the cancellation succeeded or if the operation completed despite the `cancel` request. When you cancel an operation, the currently running transfer is interrupted. For recurring transfer jobs, the next instance of the transfer job will still run. For example, if your job is configured to run every day at 1pm and you cancel Monday's operation at 1:05pm, Monday's transfer will stop. However, a transfer job will still be attempted on Tuesday. This applies only to currently running operations. If an operation is not currently running, `cancel` does nothing. \*Caution:\* Canceling a transfer job can leave your data in an unknown state. We recommend that you restore the state at both the destination and the source after the `cancel` request completes so that your data is in a consistent state. When you cancel a job, the next job computes a delta of files and may repair any inconsistent state. For instance, if you run a job every day, and today's job found 10 new files and transferred five files before you canceled the job, tomorrow's transfer operation will compute a new delta with the five files that were not copied today plus any new files discovered tomorrow.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `CancelOperationRequest`; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource to be cancelled. |

### `storagetransfer.transferOperations.get`

- Versions: v1
- `GET https://storagetransfer.googleapis.com/v1/{+name}`
- Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource. |

### `storagetransfer.transferOperations.list`

- Versions: v1
- `GET https://storagetransfer.googleapis.com/v1/{+name}`
- Lists transfer operations. Operations are ordered by their creation time in reverse chronological order.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListOperationsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the type being listed; must be `transferOperations`. |
| `filter` | query | string | yes | Required. A list of query parameters specified as JSON text in the form of: `{"projectId":"my_project_id", "jobNames":["jobid1","jobid2",...], "jobNamePattern": "job_name_pattern", "operationNames":["opid1","opid2",...], "operationNamePattern": "operation_name_pattern", "minCreationTime": "min_creation_time", "maxCreationTime": "max_creation_time", "transferStatuses":["status1","status2",...]}` Since `jobNames`, `operationNames`, and `transferStatuses` support multiple values, they must be specified with array notation. `projectId` is the only argument that is required. If specified, `jobNamePattern` and `operationNamePattern` must match the full job or operation name respectively. '\*' is a wildcard matching 0 or more characters. `minCreationTime` and `maxCreationTime` should be timestamps encoded as a string in the RFC 3339 (https://www.ietf.org/rfc/rfc3339.txt) format. The valid values for `transferStatuses` are case-insensitive: IN_PROGRESS, PAUSED, SUCCESS, FAILED, and ABORTED. |
| `pageSize` | query | integer (int32) | no | The list page size. The max allowed value is 256. |
| `pageToken` | query | string | no | The list page token. |
| `returnPartialSuccess` | query | boolean | no | When set to `true`, operations that are reachable are returned as normal, and those that are unreachable are returned in the ListOperationsResponse.unreachable field. This can only be `true` when reading across collections. For example, when `parent` is set to `"projects/example/locations/-"`. This field is not supported by default and will result in an `UNIMPLEMENTED` error if set unless explicitly documented otherwise in service or product specific documentation. |

### `storagetransfer.transferOperations.pause`

- Versions: v1
- `POST https://storagetransfer.googleapis.com/v1/{+name}:pause`
- Pauses a transfer operation.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `PauseTransferOperationRequest`; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the transfer operation. |

### `storagetransfer.transferOperations.resume`

- Versions: v1
- `POST https://storagetransfer.googleapis.com/v1/{+name}:resume`
- Resumes a transfer operation that is paused.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `ResumeTransferOperationRequest`; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the transfer operation. |

### Example request skeleton

Generated from the Discovery entry of `storagetransfer.googleServiceAccounts.get` (not in the official docs); replace the `{...}` path variables (URL-encode query values):

```bash
curl -X GET \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  "https://storagetransfer.googleapis.com/v1/googleServiceAccounts/{projectId}"
```

## Notes

- Generated from the Discovery document(s) v1 of `storagetransfer` (retrieved 2026-11-14). Resources on this page: googleServiceAccounts, projects, transferJobs, transferOperations.
- The Required column is `yes` for path variables and required parameters, and `conditional` when the description says "Required if ..." (mutually exclusive alternatives) or when a `parent.child` parameter is required only inside an optional parent message or one branch of a oneof.
- Message schemas are listed under `references/rest-schemas/storagetransfer/`.
- Source: https://storagetransfer.googleapis.com/$discovery/rest?version=v1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
