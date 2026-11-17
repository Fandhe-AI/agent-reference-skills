---
source: https://batch.googleapis.com/$discovery/rest?version=v1
---

# Batch API REST API (batch)

## Signature / Usage

Base URL: `https://batch.googleapis.com`. Methods are listed by `id`; the `Versions` line shows which API versions define the method (preferred: v1).

### `batch.projects.locations.get`

- Versions: v1
- `GET https://batch.googleapis.com/v1/{+name}`
- Gets information about a location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Location`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Resource name for the location. |

### `batch.projects.locations.jobs.cancel`

- Versions: v1
- `POST https://batch.googleapis.com/v1/{+name}:cancel`
- Cancel a Job.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `CancelJobRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Job name. |

### `batch.projects.locations.jobs.create`

- Versions: v1
- `POST https://batch.googleapis.com/v1/{+parent}/jobs`
- Create a Job.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Job`; Response: `Job`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource name where the Job will be created. Pattern: "projects/{project}/locations/{location}" |
| `jobId` | query | string | no | ID used to uniquely identify the Job within its parent scope. This field should contain at most 63 characters and must start with lowercase characters. Only lowercase characters, numbers and '-' are accepted. The '-' character cannot be the first or the last one. A system generated ID will be used if the field is not set. The job.name field in the request will be ignored and the created resource name of the Job will be "{parent}/jobs/{job_id}". |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `batch.projects.locations.jobs.delete`

- Versions: v1
- `DELETE https://batch.googleapis.com/v1/{+name}`
- Delete a Job.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Job name. |
| `reason` | query | string | no | Optional. Reason for this deletion. |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `batch.projects.locations.jobs.get`

- Versions: v1
- `GET https://batch.googleapis.com/v1/{+name}`
- Get a Job specified by its resource name.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Job`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Job name. |

### `batch.projects.locations.jobs.list`

- Versions: v1
- `GET https://batch.googleapis.com/v1/{+parent}/jobs`
- List all Jobs for a project within a region.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListJobsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Parent path. |
| `filter` | query | string | no | List filter. |
| `orderBy` | query | string | no | Optional. Sort results. Supported are "name", "name desc", "create_time", and "create_time desc". |
| `pageSize` | query | integer (int32) | no | Page size. |
| `pageToken` | query | string | no | Page token. |

### `batch.projects.locations.jobs.taskGroups.tasks.get`

- Versions: v1
- `GET https://batch.googleapis.com/v1/{+name}`
- Return a single Task.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Task`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Task name. |

### `batch.projects.locations.jobs.taskGroups.tasks.list`

- Versions: v1
- `GET https://batch.googleapis.com/v1/{+parent}/tasks`
- List Tasks associated with a job.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListTasksResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Name of a TaskGroup from which Tasks are being requested. Pattern: "projects/{project}/locations/{location}/jobs/{job}/taskGroups/{task_group}" |
| `filter` | query | string | no | Task filter, null filter matches all Tasks. Filter string should be of the format State=TaskStatus.State e.g. State=RUNNING |
| `pageSize` | query | integer (int32) | no | Page size. |
| `pageToken` | query | string | no | Page token. |

### `batch.projects.locations.list`

- Versions: v1
- `GET https://batch.googleapis.com/v1/{+name}/locations`
- Lists information about the supported locations for this service. This method lists locations based on the resource scope provided in the ListLocationsRequest.name field: \* \*\*Global locations\*\*: If `name` is empty, the method lists the public locations available to all projects. \* \*\*Project-specific locations\*\*: If `name` follows the format `projects/{project}`, the method lists locations visible to that specific project. This includes public, private, or other project-specific locations enabled for the project. For gRPC and client library implementations, the resource name is passed as the `name` field. For direct service calls, the resource name is incorporated into the request path based on the specific service implementation and version.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListLocationsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The resource that owns the locations collection, if applicable. |
| `extraLocationTypes` | query | repeated string | no | Optional. Do not use this field unless explicitly documented otherwise. This is primarily for internal usage. |
| `filter` | query | string | no | A filter to narrow down results to a preferred subset. The filtering language accepts strings like `"displayName=tokyo"`, and is documented in more detail in AIP-160 (https://google.aip.dev/160). |
| `pageSize` | query | integer (int32) | no | The maximum number of results to return. If not set, the service selects a default. |
| `pageToken` | query | string | no | A page token received from the `next_page_token` field in the response. Send that page token to receive the subsequent page. |

### `batch.projects.locations.operations.cancel`

- Versions: v1
- `POST https://batch.googleapis.com/v1/{+name}:cancel`
- Starts asynchronous cancellation on a long-running operation. The server makes a best effort to cancel the operation, but success is not guaranteed. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. Clients can use Operations.GetOperation or other methods to check whether the cancellation succeeded or whether the operation completed despite cancellation. On successful cancellation, the operation is not deleted; instead, it becomes an operation with an Operation.error value with a google.rpc.Status.code of `1`, corresponding to `Code.CANCELLED`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `CancelOperationRequest`; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource to be cancelled. |

### `batch.projects.locations.operations.delete`

- Versions: v1
- `DELETE https://batch.googleapis.com/v1/{+name}`
- Deletes a long-running operation. This method indicates that the client is no longer interested in the operation result. It does not cancel the operation. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource to be deleted. |

### `batch.projects.locations.operations.get`

- Versions: v1
- `GET https://batch.googleapis.com/v1/{+name}`
- Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource. |

### `batch.projects.locations.operations.list`

- Versions: v1
- `GET https://batch.googleapis.com/v1/{+name}/operations`
- Lists operations that match the specified filter in the request. If the server doesn't support this method, it returns `UNIMPLEMENTED`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListOperationsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation's parent resource. |
| `filter` | query | string | no | The standard list filter. |
| `pageSize` | query | integer (int32) | no | The standard list page size. |
| `pageToken` | query | string | no | The standard list page token. |
| `returnPartialSuccess` | query | boolean | no | When set to `true`, operations that are reachable are returned as normal, and those that are unreachable are returned in the ListOperationsResponse.unreachable field. This can only be `true` when reading across collections. For example, when `parent` is set to `"projects/example/locations/-"`. This field is not supported by default and will result in an `UNIMPLEMENTED` error if set unless explicitly documented otherwise in service or product specific documentation. |

### `batch.projects.locations.state.report`

- Versions: v1
- `POST https://batch.googleapis.com/v1/{+parent}/state:report`
- Report agent's state, e.g. agent status and tasks information
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `ReportAgentStateRequest`; Response: `ReportAgentStateResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Format: projects/{project}/locations/{location} {project} should be a project number. |

### Example request skeleton

Generated from the Discovery entry of `batch.projects.locations.get` (not in the official docs); replace the `{...}` path variables (URL-encode query values):

```bash
curl -X GET \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  "https://batch.googleapis.com/v1/{+name}"
```

## Notes

- Generated from the Discovery document(s) v1 of `batch` (retrieved 2026-11-14). Resources on this page: projects.
- The Required column is `yes` for path variables and required parameters, and `conditional` when the description says "Required if ..." (mutually exclusive alternatives), when a `parent.child` parameter is required only inside an optional parent message or one branch of a oneof. Path variables are `yes` unless a note below names an alternative route without them.
- Message schemas (the request and response types named above) are listed under `references/rest-schemas/batch/`; they are the `schemas` section of the Discovery documents in Source.
- Source: https://batch.googleapis.com/$discovery/rest?version=v1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
