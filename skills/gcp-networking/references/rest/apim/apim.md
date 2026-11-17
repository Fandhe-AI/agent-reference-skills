---
source: https://apim.googleapis.com/$discovery/rest?version=v1alpha
---

# API Management API REST API (apim)

## Signature / Usage

Base URL: `https://apim.googleapis.com`. Methods are listed by `id`; the `Versions` line shows which API versions define the method (preferred: v1alpha).

### `apim.projects.locations.get`

- Versions: v1alpha
- `GET https://apim.googleapis.com/v1alpha/{+name}`
- Gets information about a location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Location`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Resource name for the location. |

### `apim.projects.locations.getEntitlement`

- Versions: v1alpha
- `GET https://apim.googleapis.com/v1alpha/{+name}`
- GetEntitlement returns the entitlement for the provided project.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Entitlement`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The entitlement resource name Format: projects/{project}/locations/{location}/entitlement |

### `apim.projects.locations.list`

- Versions: v1alpha
- `GET https://apim.googleapis.com/v1alpha/{+name}/locations`
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

### `apim.projects.locations.listApiObservationTags`

- Versions: v1alpha
- `GET https://apim.googleapis.com/v1alpha/{+parent}:listApiObservationTags`
- ListApiObservationTags lists all extant tags on any observation in the given project.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListApiObservationTagsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent, which owns this collection of tags. Format: projects/{project}/locations/{location} |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of tags to return. The service may return fewer than this value. If unspecified, at most 10 tags will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. |
| `pageToken` | query | string | no | Optional. A page token, received from a previous `ListApiObservationTags` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListApiObservationTags` must match the call that provided the page token. |

### `apim.projects.locations.observationJobs.apiObservations.apiOperations.get`

- Versions: v1alpha
- `GET https://apim.googleapis.com/v1alpha/{+name}`
- GetApiOperation retrieves a single ApiOperation by name.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ApiOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the ApiOperation to retrieve. Format: projects/{project}/locations/{location}/observationJobs/{observation_job}/apiObservations/{api_observation}/apiOperation/{api_operation} |

### `apim.projects.locations.observationJobs.apiObservations.apiOperations.list`

- Versions: v1alpha
- `GET https://apim.googleapis.com/v1alpha/{+parent}/apiOperations`
- ListApiOperations gets all ApiOperations for a given project and location and ObservationJob and ApiObservation.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListApiOperationsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent, which owns this collection of ApiOperations. Format: projects/{project}/locations/{location}/observationJobs/{observation_job}/apiObservations/{api_observation} |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of ApiOperations to return. The service may return fewer than this value. If unspecified, at most 10 ApiOperations will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. |
| `pageToken` | query | string | no | Optional. A page token, received from a previous `ListApiApiOperations` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListApiApiOperations` must match the call that provided the page token. |

### `apim.projects.locations.observationJobs.apiObservations.batchEditTags`

- Versions: v1alpha
- `POST https://apim.googleapis.com/v1alpha/{+parent}/apiObservations:batchEditTags`
- BatchEditTagsApiObservations adds or removes Tags for ApiObservations.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `BatchEditTagsApiObservationsRequest`; Response: `BatchEditTagsApiObservationsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource shared by all ApiObservations being edited. Format: projects/{project}/locations/{location}/observationJobs/{observation_job} |

### `apim.projects.locations.observationJobs.apiObservations.get`

- Versions: v1alpha
- `GET https://apim.googleapis.com/v1alpha/{+name}`
- GetApiObservation retrieves a single ApiObservation by name.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ApiObservation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the ApiObservation to retrieve. Format: projects/{project}/locations/{location}/observationJobs/{observation_job}/apiObservations/{api_observation} |

### `apim.projects.locations.observationJobs.apiObservations.list`

- Versions: v1alpha
- `GET https://apim.googleapis.com/v1alpha/{+parent}/apiObservations`
- ListApiObservations gets all ApiObservations for a given project and location and ObservationJob.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListApiObservationsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent, which owns this collection of ApiObservations. Format: projects/{project}/locations/{location}/observationJobs/{observation_job} |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of ApiObservations to return. The service may return fewer than this value. If unspecified, at most 10 ApiObservations will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. |
| `pageToken` | query | string | no | Optional. A page token, received from a previous `ListApiObservations` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListApiObservations` must match the call that provided the page token. |

### `apim.projects.locations.observationJobs.create`

- Versions: v1alpha
- `POST https://apim.googleapis.com/v1alpha/{+parent}/observationJobs`
- CreateObservationJob creates a new ObservationJob but does not have any effecton its own. It is a configuration that can be used in an Observation Job to collect data about existing APIs.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `ObservationJob`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource where this ObservationJob will be created. Format: projects/{project}/locations/{location} |
| `observationJobId` | query | string | yes | Required. The ID to use for the Observation Job. This value should be 4-63 characters, and valid characters are /a-z-/. |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `apim.projects.locations.observationJobs.delete`

- Versions: v1alpha
- `DELETE https://apim.googleapis.com/v1alpha/{+name}`
- DeleteObservationJob deletes an ObservationJob. This method will fail if the observation job is currently being used by any ObservationSource, even if not enabled.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the resource Format: projects/{project}/locations/{location}/observationJobs/{observation_job} |

### `apim.projects.locations.observationJobs.disable`

- Versions: v1alpha
- `POST https://apim.googleapis.com/v1alpha/{+name}:disable`
- Disables the given ObservationJob.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `DisableObservationJobRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the ObservationJob to disable. Format: projects/{project}/locations/{location}/observationJobs/{job} |

### `apim.projects.locations.observationJobs.enable`

- Versions: v1alpha
- `POST https://apim.googleapis.com/v1alpha/{+name}:enable`
- Enables the given ObservationJob.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `EnableObservationJobRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the ObservationJob to enable. Format: projects/{project}/locations/{location}/observationJobs/{job} |

### `apim.projects.locations.observationJobs.get`

- Versions: v1alpha
- `GET https://apim.googleapis.com/v1alpha/{+name}`
- GetObservationJob retrieves a single ObservationJob by name.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ObservationJob`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the ObservationJob to retrieve. Format: projects/{project}/locations/{location}/observationJobs/{job} |

### `apim.projects.locations.observationJobs.list`

- Versions: v1alpha
- `GET https://apim.googleapis.com/v1alpha/{+parent}/observationJobs`
- ListObservationJobs gets all ObservationJobs for a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListObservationJobsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent, which owns this collection of ObservationJobs. Format: projects/{project}/locations/{location} |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of ObservationJobs to return. The service may return fewer than this value. If unspecified, at most 10 ObservationJobs will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. |
| `pageToken` | query | string | no | Optional. A page token, received from a previous `ListObservationJobs` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListObservationJobs` must match the call that provided the page token. |

### `apim.projects.locations.observationSources.create`

- Versions: v1alpha
- `POST https://apim.googleapis.com/v1alpha/{+parent}/observationSources`
- CreateObservationSource creates a new ObservationSource but does not affect any deployed infrastructure. It is a configuration that can be used in an Observation Job to collect data about APIs running in user's dataplane.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `ObservationSource`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Value for parent. |
| `observationSourceId` | query | string | yes | Required. The ID to use for the Observation Source. This value should be 4-63 characters, and valid characters are /a-z-/. |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `apim.projects.locations.observationSources.delete`

- Versions: v1alpha
- `DELETE https://apim.googleapis.com/v1alpha/{+name}`
- DeleteObservationSource deletes an observation source. This method will fail if the observation source is currently being used by any ObservationJob, even if not enabled.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the resource Format: projects/{project}/locations/{location}/observationSources/{source} |

### `apim.projects.locations.observationSources.get`

- Versions: v1alpha
- `GET https://apim.googleapis.com/v1alpha/{+name}`
- GetObservationSource retrieves a single ObservationSource by name.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ObservationSource`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the ObservationSource to retrieve. Format: projects/{project}/locations/{location}/observationSources/{source} |

### `apim.projects.locations.observationSources.list`

- Versions: v1alpha
- `GET https://apim.googleapis.com/v1alpha/{+parent}/observationSources`
- ListObservationSources gets all ObservationSources for a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListObservationSourcesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent, which owns this collection of ObservationSources. Format: projects/{project}/locations/{location} |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of ObservationSources to return. The service may return fewer than this value. If unspecified, at most 10 ObservationSources will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. |
| `pageToken` | query | string | no | Optional. A page token, received from a previous `ListObservationSources` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListObservationSources` must match the call that provided the page token. |

### `apim.projects.locations.operations.cancel`

- Versions: v1alpha
- `POST https://apim.googleapis.com/v1alpha/{+name}:cancel`
- Starts asynchronous cancellation on a long-running operation. The server makes a best effort to cancel the operation, but success is not guaranteed. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. Clients can use Operations.GetOperation or other methods to check whether the cancellation succeeded or whether the operation completed despite cancellation. On successful cancellation, the operation is not deleted; instead, it becomes an operation with an Operation.error value with a google.rpc.Status.code of `1`, corresponding to `Code.CANCELLED`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `CancelOperationRequest`; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource to be cancelled. |

### `apim.projects.locations.operations.delete`

- Versions: v1alpha
- `DELETE https://apim.googleapis.com/v1alpha/{+name}`
- Deletes a long-running operation. This method indicates that the client is no longer interested in the operation result. It does not cancel the operation. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource to be deleted. |

### `apim.projects.locations.operations.get`

- Versions: v1alpha
- `GET https://apim.googleapis.com/v1alpha/{+name}`
- Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource. |

### `apim.projects.locations.operations.list`

- Versions: v1alpha
- `GET https://apim.googleapis.com/v1alpha/{+name}/operations`
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

Generated from the Discovery entry of `apim.projects.locations.get` (not in the official docs); replace the `{...}` path variables (URL-encode query values):

```bash
curl -X GET \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  "https://apim.googleapis.com/v1alpha/{+name}"
```

## Notes

- Generated from the Discovery document(s) v1alpha of `apim` (retrieved 2026-11-14). Resources on this page: projects.
- The Required column is `yes` for path variables and required parameters, and `conditional` when the description says "Required if ..." (mutually exclusive alternatives), when a `parent.child` parameter is required only inside an optional parent message or one branch of a oneof. Path variables are `yes` unless a note below names an alternative route without them.
- Message schemas (the request and response types named above) are listed under `references/rest-schemas/apim/`; they are the `schemas` section of the Discovery documents in Source.
- Source: https://apim.googleapis.com/$discovery/rest?version=v1alpha (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
