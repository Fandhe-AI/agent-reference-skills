---
source: https://memcache.googleapis.com/$discovery/rest?version=v1
---

# Cloud Memorystore for Memcached API REST API (memcache)

## Signature / Usage

Base URL: `https://memcache.googleapis.com`. Methods are listed by `id`; the `Versions` line shows which API versions define the method (preferred: v1).

### `memcache.projects.locations.get`

- Versions: v1, v1beta2
- `GET https://memcache.googleapis.com/v1/{+name}`
- Gets information about a location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Location`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Resource name for the location. |

### `memcache.projects.locations.instances.applyParameters`

- Versions: v1, v1beta2
- `POST https://memcache.googleapis.com/v1/{+name}:applyParameters`
- `ApplyParameters` restarts the set of specified nodes in order to update them to the current set of parameters for the Memcached Instance.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `ApplyParametersRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Resource name of the Memcached instance for which parameter group updates should be applied. |

### `memcache.projects.locations.instances.applySoftwareUpdate`

- Versions: v1beta2
- `POST https://memcache.googleapis.com/v1beta2/{+instance}:applySoftwareUpdate`
- Updates software on the selected nodes of the Instance.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `ApplySoftwareUpdateRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `instance` | path | string | yes | Required. Resource name of the Memcached instance for which software update should be applied. |

### `memcache.projects.locations.instances.create`

- Versions: v1, v1beta2
- `POST https://memcache.googleapis.com/v1/{+parent}/instances`
- Creates a new Instance in a given location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Instance`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The resource name of the instance location using the form: `projects/{project_id}/locations/{location_id}` where `location_id` refers to a GCP region |
| `instanceId` | query | string | yes | Required. The logical name of the Memcached instance in the user project with the following restrictions: \* Must contain only lowercase letters, numbers, and hyphens. \* Must start with a letter. \* Must be between 1-40 characters. \* Must end with a number or a letter. \* Must be unique within the user project / location. If any of the above are not met, the API raises an invalid argument error. |

### `memcache.projects.locations.instances.delete`

- Versions: v1, v1beta2
- `DELETE https://memcache.googleapis.com/v1/{+name}`
- Deletes a single Instance.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Memcached instance resource name in the format: `projects/{project_id}/locations/{location_id}/instances/{instance_id}` where `location_id` refers to a GCP region |

### `memcache.projects.locations.instances.get`

- Versions: v1, v1beta2
- `GET https://memcache.googleapis.com/v1/{+name}`
- Gets details of a single Instance.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Instance`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Memcached instance resource name in the format: `projects/{project_id}/locations/{location_id}/instances/{instance_id}` where `location_id` refers to a GCP region |

### `memcache.projects.locations.instances.getTags`

- Versions: v1
- `GET https://memcache.googleapis.com/v1/{+name}:getTags`
- Returns tags directly bound to a GCP resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GetTagsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The full resource name of the service resource. |

### `memcache.projects.locations.instances.list`

- Versions: v1, v1beta2
- `GET https://memcache.googleapis.com/v1/{+parent}/instances`
- Lists Instances in a given location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListInstancesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The resource name of the instance location using the form: `projects/{project_id}/locations/{location_id}` where `location_id` refers to a GCP region |
| `filter` | query | string | no | List filter. For example, exclude all Memcached instances with name as my-instance by specifying `"name != my-instance"`. |
| `orderBy` | query | string | no | Sort results. Supported values are "name", "name desc" or "" (unsorted). |
| `pageSize` | query | integer (int32) | no | The maximum number of items to return. If not specified, a default value of 1000 will be used by the service. Regardless of the `page_size` value, the response may include a partial list and a caller should only rely on response's `next_page_token` to determine if there are more instances left to be queried. |
| `pageToken` | query | string | no | The `next_page_token` value returned from a previous List request, if any. |

### `memcache.projects.locations.instances.patch`

- Versions: v1, v1beta2
- `PATCH https://memcache.googleapis.com/v1/{+name}`
- Updates an existing Instance in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Instance`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Unique name of the resource in this scope including project and location using the form: `projects/{project_id}/locations/{location_id}/instances/{instance_id}` Note: Memcached instances are managed and addressed at the regional level so `location_id` here refers to a Google Cloud region; however, users may choose which zones Memcached nodes should be provisioned in within an instance. Refer to zones field for more details. |
| `updateMask` | query | string (google-fieldmask) | yes | Required. Mask of fields to update. \* `displayName` |

### `memcache.projects.locations.instances.rescheduleMaintenance`

- Versions: v1, v1beta2
- `POST https://memcache.googleapis.com/v1/{+instance}:rescheduleMaintenance`
- Reschedules upcoming maintenance event.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `RescheduleMaintenanceRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `instance` | path | string | yes | Required. Memcache instance resource name using the form: `projects/{project_id}/locations/{location_id}/instances/{instance_id}` where `location_id` refers to a GCP region. |

### `memcache.projects.locations.instances.setTags`

- Versions: v1
- `POST https://memcache.googleapis.com/v1/{+name}:setTags`
- Updates tags directly bound to a GCP resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `SetTagsRequest`; Response: `SetTagsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The full resource name of the service resource. |

### `memcache.projects.locations.instances.updateParameters`

- Versions: v1, v1beta2
- `PATCH https://memcache.googleapis.com/v1/{+name}:updateParameters`
- Updates the defined Memcached parameters for an existing instance. This method only stages the parameters, it must be followed by `ApplyParameters` to apply the parameters to nodes of the Memcached instance.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `UpdateParametersRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Resource name of the Memcached instance for which the parameters should be updated. |

### `memcache.projects.locations.instances.upgrade`

- Versions: v1, v1beta2
- `POST https://memcache.googleapis.com/v1/{+name}:upgrade`
- Upgrades the Memcache instance to a newer memcached engine version specified in the request.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleCloudMemcacheV1UpgradeInstanceRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Memcache instance resource name using the form: `projects/{project}/locations/{location}/instances/{instance}` where `location_id` refers to a GCP region. |

### `memcache.projects.locations.list`

- Versions: v1, v1beta2
- `GET https://memcache.googleapis.com/v1/{+name}/locations`
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

### `memcache.projects.locations.operations.cancel`

- Versions: v1, v1beta2
- `POST https://memcache.googleapis.com/v1/{+name}:cancel`
- Starts asynchronous cancellation on a long-running operation. The server makes a best effort to cancel the operation, but success is not guaranteed. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. Clients can use Operations.GetOperation or other methods to check whether the cancellation succeeded or whether the operation completed despite cancellation. On successful cancellation, the operation is not deleted; instead, it becomes an operation with an Operation.error value with a google.rpc.Status.code of `1`, corresponding to `Code.CANCELLED`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `CancelOperationRequest`; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource to be cancelled. |

### `memcache.projects.locations.operations.delete`

- Versions: v1, v1beta2
- `DELETE https://memcache.googleapis.com/v1/{+name}`
- Deletes a long-running operation. This method indicates that the client is no longer interested in the operation result. It does not cancel the operation. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource to be deleted. |

### `memcache.projects.locations.operations.get`

- Versions: v1, v1beta2
- `GET https://memcache.googleapis.com/v1/{+name}`
- Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource. |

### `memcache.projects.locations.operations.list`

- Versions: v1, v1beta2
- `GET https://memcache.googleapis.com/v1/{+name}/operations`
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

Generated from the Discovery entry of `memcache.projects.locations.get` (not in the official docs); replace the `{...}` path variables (URL-encode query values):

```bash
curl -X GET \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  "https://memcache.googleapis.com/v1/{+name}"
```

## Notes

- Generated from the Discovery document(s) v1, v1beta2 of `memcache` (retrieved 2026-11-14). Resources on this page: projects.
- The Required column is `yes` for path variables and required parameters, and `conditional` when the description says "Required if ..." (mutually exclusive alternatives), when a `parent.child` parameter is required only inside an optional parent message or one branch of a oneof. Path variables are `yes` unless a note below names an alternative route without them.
- Message schemas (the request and response types named above) are listed under `references/rest-schemas/memcache/`; they are the `schemas` section of the Discovery documents in Source.
- Source: https://memcache.googleapis.com/$discovery/rest?version=v1, https://memcache.googleapis.com/$discovery/rest?version=v1beta2 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
