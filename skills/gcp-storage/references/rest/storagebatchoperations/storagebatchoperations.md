---
source: https://storagebatchoperations.googleapis.com/$discovery/rest?version=v1
---

# Storage Batch Operations API REST API (storagebatchoperations)

## Signature / Usage

Base URL: `https://storagebatchoperations.googleapis.com`. Methods are listed by `id`; the `Versions` line shows which API versions define the method (preferred: v1).

### `storagebatchoperations.projects.locations.get`

- Versions: v1
- `GET https://storagebatchoperations.googleapis.com/v1/{+name}`
- Gets information about a location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Location`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Resource name for the location. |

### `storagebatchoperations.projects.locations.jobs.bucketOperations.get`

- Versions: v1
- `GET https://storagebatchoperations.googleapis.com/v1/{+name}`
- Gets a BucketOperation.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `BucketOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The `name` of the bucket operation to retrieve. Format: `projects/{project_id}/locations/global/jobs/{job_id}/bucketOperations/{bucket_operation_id}`. |

### `storagebatchoperations.projects.locations.jobs.bucketOperations.list`

- Versions: v1
- `GET https://storagebatchoperations.googleapis.com/v1/{+parent}/bucketOperations`
- Lists BucketOperations in a given project and job.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListBucketOperationsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Format: `projects/{project_id}/locations/global/jobs/{job_id}`. |
| `filter` | query | string | no | Optional. Filters results as defined by https://google.aip.dev/160. |
| `orderBy` | query | string | no | Optional. Field to sort by. Supported fields are `name` and `create_time`. |
| `pageSize` | query | integer (int32) | no | Optional. The list page size. Default page size is 100. |
| `pageToken` | query | string | no | Optional. The list page token. |

### `storagebatchoperations.projects.locations.jobs.cancel`

- Versions: v1
- `POST https://storagebatchoperations.googleapis.com/v1/{+name}:cancel`
- Cancels a batch job.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `CancelJobRequest`; Response: `CancelJobResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The `name` of the job to cancel. Format: `projects/{project_id}/locations/global/jobs/{job_id}`. |

### `storagebatchoperations.projects.locations.jobs.create`

- Versions: v1
- `POST https://storagebatchoperations.googleapis.com/v1/{+parent}/jobs`
- Creates a batch job.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Job`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The value for parent. |
| `jobId` | query | string | yes | Required. A unique identifier for the job. `job_id` must be up to 128 characters and must include only characters available in DNS names, as defined by RFC-1123. |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID in case you need to retry your request. Requests with same `request_id` are ignored for at least 60 minutes since the first request. The request ID must be a valid UUID with the exception that zero UUID isn't supported (00000000-0000-0000-0000-000000000000). |

### `storagebatchoperations.projects.locations.jobs.delete`

- Versions: v1
- `DELETE https://storagebatchoperations.googleapis.com/v1/{+name}`
- Deletes a batch job.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The `name` of the job to delete. Format: `projects/{project_id}/locations/global/jobs/{job_id}`. |
| `force` | query | boolean | no | Optional. If set to true, any child bucket operations of the job are deleted. We recommend setting this to `true`. You can't mutate bucket operations directly, so only the `jobs.delete` permission is required to delete a job (and its child bucket operations). |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID in case you need to retry your request. Requests with same `request_id` are ignored for at least 60 minutes since the first request. The request ID must be a valid UUID with the exception that zero UUID isn't supported (00000000-0000-0000-0000-000000000000). |

### `storagebatchoperations.projects.locations.jobs.get`

- Versions: v1
- `GET https://storagebatchoperations.googleapis.com/v1/{+name}`
- Gets a batch job.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Job`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The `name` of the job to retrieve. Format: `projects/{project_id}/locations/global/jobs/{job_id}`. |

### `storagebatchoperations.projects.locations.jobs.list`

- Versions: v1
- `GET https://storagebatchoperations.googleapis.com/v1/{+parent}/jobs`
- Lists Jobs in a given project.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListJobsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Format: projects/{project_id}/locations/global. |
| `filter` | query | string | no | Optional. Filters results as defined by https://google.aip.dev/160. |
| `orderBy` | query | string | no | Optional. Field to sort by. Supported fields are `name` and `create_time`. |
| `pageSize` | query | integer (int32) | no | Optional. The list page size. The default page size is 100. |
| `pageToken` | query | string | no | Optional. The list page token. |

### `storagebatchoperations.projects.locations.list`

- Versions: v1
- `GET https://storagebatchoperations.googleapis.com/v1/{+name}/locations`
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

### `storagebatchoperations.projects.locations.operations.cancel`

- Versions: v1
- `POST https://storagebatchoperations.googleapis.com/v1/{+name}:cancel`
- Starts asynchronous cancellation on a long-running operation. The server makes a best effort to cancel the operation, but success is not guaranteed. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. Clients can use Operations.GetOperation or other methods to check whether the cancellation succeeded or whether the operation completed despite cancellation. On successful cancellation, the operation is not deleted; instead, it becomes an operation with an Operation.error value with a google.rpc.Status.code of `1`, corresponding to `Code.CANCELLED`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `CancelOperationRequest`; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource to be cancelled. |

### `storagebatchoperations.projects.locations.operations.delete`

- Versions: v1
- `DELETE https://storagebatchoperations.googleapis.com/v1/{+name}`
- Deletes a long-running operation. This method indicates that the client is no longer interested in the operation result. It does not cancel the operation. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource to be deleted. |

### `storagebatchoperations.projects.locations.operations.get`

- Versions: v1
- `GET https://storagebatchoperations.googleapis.com/v1/{+name}`
- Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource. |

### `storagebatchoperations.projects.locations.operations.list`

- Versions: v1
- `GET https://storagebatchoperations.googleapis.com/v1/{+name}/operations`
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

### Example request skeleton

Generated from the Discovery entry of `storagebatchoperations.projects.locations.get` (not in the official docs); replace the `{...}` path variables (URL-encode query values):

```bash
curl -X GET \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  "https://storagebatchoperations.googleapis.com/v1/{+name}"
```

## Notes

- Generated from the Discovery document(s) v1 of `storagebatchoperations` (retrieved 2026-11-14). Resources on this page: projects.
- The Required column is `yes` for path variables and required parameters, and `conditional` when the description says "Required if ..." (mutually exclusive alternatives), when a `parent.child` parameter is required only inside an optional parent message or one branch of a oneof. Path variables are always `yes`.
- Message schemas (the request and response types named above) are listed under `references/rest-schemas/storagebatchoperations/`; they are the `schemas` section of the Discovery documents in Source.
- Source: https://storagebatchoperations.googleapis.com/$discovery/rest?version=v1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
