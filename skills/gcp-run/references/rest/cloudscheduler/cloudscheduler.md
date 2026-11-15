---
source: https://cloudscheduler.googleapis.com/$discovery/rest?version=v1
---

# Cloud Scheduler API REST API (cloudscheduler)

## Signature / Usage

Base URL: `https://cloudscheduler.googleapis.com`. Methods are listed by `id`; the `Versions` line shows which API versions define the method (preferred: v1).

### `cloudscheduler.projects.locations.get`

- Versions: v1, v1beta1
- `GET https://cloudscheduler.googleapis.com/v1/{+name}`
- Gets information about a location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Location`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Resource name for the location. |

### `cloudscheduler.projects.locations.getCmekConfig`

- Versions: v1
- `GET https://cloudscheduler.googleapis.com/v1/{+name}`
- Gets the Scheduler config in the project/region.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `CmekConfig`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The config name. For example: projects/PROJECT_ID/locations/LOCATION_ID/cmekConfig |

### `cloudscheduler.projects.locations.jobs.create`

- Versions: v1, v1beta1
- `POST https://cloudscheduler.googleapis.com/v1/{+parent}/jobs`
- Creates a job.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Job`; Response: `Job`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The location name. For example: `projects/PROJECT_ID/locations/LOCATION_ID`. |

### `cloudscheduler.projects.locations.jobs.delete`

- Versions: v1, v1beta1
- `DELETE https://cloudscheduler.googleapis.com/v1/{+name}`
- Deletes a job.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The job name. For example: `projects/PROJECT_ID/locations/LOCATION_ID/jobs/JOB_ID`. |

### `cloudscheduler.projects.locations.jobs.get`

- Versions: v1, v1beta1
- `GET https://cloudscheduler.googleapis.com/v1/{+name}`
- Gets a job.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Job`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The job name. For example: `projects/PROJECT_ID/locations/LOCATION_ID/jobs/JOB_ID`. |

### `cloudscheduler.projects.locations.jobs.list`

- Versions: v1, v1beta1
- `GET https://cloudscheduler.googleapis.com/v1/{+parent}/jobs`
- Lists jobs.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListJobsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The location name. For example: `projects/PROJECT_ID/locations/LOCATION_ID`. |
| `pageSize` | query | integer (int32) | no | Requested page size. The maximum page size is 500. If unspecified, the page size will be the maximum. Fewer jobs than requested might be returned, even if more jobs exist; use next_page_token to determine if more jobs exist. |
| `pageToken` | query | string | no | A token identifying a page of results the server will return. To request the first page results, page_token must be empty. To request the next page of results, page_token must be the value of next_page_token returned from the previous call to ListJobs. |

### `cloudscheduler.projects.locations.jobs.patch`

- Versions: v1, v1beta1
- `PATCH https://cloudscheduler.googleapis.com/v1/{+name}`
- Updates a job. If successful, the updated Job is returned. If the job does not exist, `NOT_FOUND` is returned. If UpdateJob does not successfully return, it is possible for the job to be in an Job.State.UPDATE_FAILED state. A job in this state may not be executed. If this happens, retry the UpdateJob request until a successful response is received.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Job`; Response: `Job`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Optionally caller-specified in CreateJob, after which it becomes output only. The job name. For example: `projects/PROJECT_ID/locations/LOCATION_ID/jobs/JOB_ID`. \* `PROJECT_ID` can contain letters (\[A-Za-z\]), numbers (\[0-9\]), hyphens (-), colons (:), or periods (.). For more information, see Identifying projects \* `LOCATION_ID` is the canonical ID for the job's location. The list of available locations can be obtained by calling locations.list. For more information, see Cloud Scheduler locations. \* `JOB_ID` can contain only letters (\[A-Za-z\]), numbers (\[0-9\]), hyphens (-), or underscores (\_). The maximum length is 500 characters. |
| `updateMask` | query | string (google-fieldmask) | no | A mask used to specify which fields of the job are being updated. |

### `cloudscheduler.projects.locations.jobs.pause`

- Versions: v1, v1beta1
- `POST https://cloudscheduler.googleapis.com/v1/{+name}:pause`
- Pauses a job. If a job is paused then the system will stop executing the job until it is re-enabled via ResumeJob. The state of the job is stored in state; if paused it will be set to Job.State.PAUSED. A job must be in Job.State.ENABLED to be paused.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `PauseJobRequest`; Response: `Job`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The job name. For example: `projects/PROJECT_ID/locations/LOCATION_ID/jobs/JOB_ID`. |

### `cloudscheduler.projects.locations.jobs.resume`

- Versions: v1, v1beta1
- `POST https://cloudscheduler.googleapis.com/v1/{+name}:resume`
- Resume a job. This method reenables a job after it has been Job.State.PAUSED. The state of a job is stored in Job.state; after calling this method it will be set to Job.State.ENABLED. A job must be in Job.State.PAUSED to be resumed.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `ResumeJobRequest`; Response: `Job`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The job name. For example: `projects/PROJECT_ID/locations/LOCATION_ID/jobs/JOB_ID`. |

### `cloudscheduler.projects.locations.jobs.run`

- Versions: v1, v1beta1
- `POST https://cloudscheduler.googleapis.com/v1/{+name}:run`
- Forces a job to run now. When this method is called, Cloud Scheduler will dispatch the job, even if the job is already running.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `RunJobRequest`; Response: `Job`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The job name. For example: `projects/PROJECT_ID/locations/LOCATION_ID/jobs/JOB_ID`. |

### `cloudscheduler.projects.locations.list`

- Versions: v1, v1beta1
- `GET https://cloudscheduler.googleapis.com/v1/{+name}/locations`
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

### `cloudscheduler.projects.locations.operations.cancel`

- Versions: v1, v1beta1
- `POST https://cloudscheduler.googleapis.com/v1/{+name}:cancel`
- Starts asynchronous cancellation on a long-running operation. The server makes a best effort to cancel the operation, but success is not guaranteed. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. Clients can use Operations.GetOperation or other methods to check whether the cancellation succeeded or whether the operation completed despite cancellation. On successful cancellation, the operation is not deleted; instead, it becomes an operation with an Operation.error value with a google.rpc.Status.code of `1`, corresponding to `Code.CANCELLED`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `CancelOperationRequest`; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource to be cancelled. |

### `cloudscheduler.projects.locations.operations.delete`

- Versions: v1, v1beta1
- `DELETE https://cloudscheduler.googleapis.com/v1/{+name}`
- Deletes a long-running operation. This method indicates that the client is no longer interested in the operation result. It does not cancel the operation. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource to be deleted. |

### `cloudscheduler.projects.locations.operations.get`

- Versions: v1, v1beta1
- `GET https://cloudscheduler.googleapis.com/v1/{+name}`
- Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource. |

### `cloudscheduler.projects.locations.operations.list`

- Versions: v1, v1beta1
- `GET https://cloudscheduler.googleapis.com/v1/{+name}/operations`
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

### `cloudscheduler.projects.locations.updateCmekConfig`

- Versions: v1
- `PATCH https://cloudscheduler.googleapis.com/v1/{+name}`
- Initializes or Updates the a scheduler config.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `CmekConfig`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. The config resource name which includes the project and location and must end in 'cmekConfig', in the format projects/PROJECT_ID/locations/LOCATION_ID/cmekConfig\` |
| `updateMask` | query | string (google-fieldmask) | no | Optional. List of fields to be updated in this request. |

### Example request skeleton

Generated from the Discovery entry of `cloudscheduler.projects.locations.get` (not in the official docs); replace the `{...}` path variables (URL-encode query values):

```bash
curl -X GET \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  "https://cloudscheduler.googleapis.com/v1/{+name}"
```

## Notes

- Generated from the Discovery document(s) v1, v1beta1 of `cloudscheduler` (retrieved 2026-11-14). Resources on this page: projects.
- The Required column is `yes` for path variables and required parameters, and `conditional` when the description says "Required if ..." (mutually exclusive alternatives), when a `parent.child` parameter is required only inside an optional parent message or one branch of a oneof. Path variables are `yes` unless a note below names an alternative route without them.
- Message schemas (the request and response types named above) are listed under `references/rest-schemas/cloudscheduler/`; they are the `schemas` section of the Discovery documents in Source.
- Source: https://cloudscheduler.googleapis.com/$discovery/rest?version=v1, https://cloudscheduler.googleapis.com/$discovery/rest?version=v1beta1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
