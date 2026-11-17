---
source: https://tpu.googleapis.com/$discovery/rest?version=v2
---

# Cloud TPU API REST API (tpu)

## Signature / Usage

Base URL: `https://tpu.googleapis.com`. Methods are listed by `id`; the `Versions` line shows which API versions define the method (preferred: v2).

### `tpu.projects.locations.acceleratorTypes.get`

- Versions: v2, v1, v2alpha1, v1alpha1
- `GET https://tpu.googleapis.com/v2/{+name}`
- Gets AcceleratorType.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `AcceleratorType`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name. |

### `tpu.projects.locations.acceleratorTypes.list`

- Versions: v2, v1, v2alpha1, v1alpha1
- `GET https://tpu.googleapis.com/v2/{+parent}/acceleratorTypes`
- Lists accelerator types supported by this API.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListAcceleratorTypesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource name. |
| `filter` | query | string | no | List filter. |
| `orderBy` | query | string | no | Sort results. |
| `pageSize` | query | integer (int32) | no | The maximum number of items to return. |
| `pageToken` | query | string | no | The next_page_token value returned from a previous List request, if any. |

### `tpu.projects.locations.generateServiceIdentity`

- Versions: v2, v2alpha1
- `POST https://tpu.googleapis.com/v2/{+parent}:generateServiceIdentity`
- Generates the Cloud TPU service identity for the project.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GenerateServiceIdentityRequest`; Response: `GenerateServiceIdentityResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource name. |

### `tpu.projects.locations.get`

- Versions: v2, v1, v2alpha1, v1alpha1
- `GET https://tpu.googleapis.com/v2/{+name}`
- Gets information about a location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Location`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Resource name for the location. |

### `tpu.projects.locations.list`

- Versions: v2, v1, v2alpha1, v1alpha1
- `GET https://tpu.googleapis.com/v2/{+name}/locations`
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

### `tpu.projects.locations.nodes.create`

- Versions: v2, v1, v2alpha1, v1alpha1
- `POST https://tpu.googleapis.com/v2/{+parent}/nodes`
- Creates a node.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Node`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource name. |
| `nodeId` | query | string | no | The unqualified resource name. |

### `tpu.projects.locations.nodes.delete`

- Versions: v2, v1, v2alpha1, v1alpha1
- `DELETE https://tpu.googleapis.com/v2/{+name}`
- Deletes a node.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name. |

### `tpu.projects.locations.nodes.get`

- Versions: v2, v1, v2alpha1, v1alpha1
- `GET https://tpu.googleapis.com/v2/{+name}`
- Gets the details of a node.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Node`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name. |

### `tpu.projects.locations.nodes.getGuestAttributes`

- Versions: v2, v2alpha1
- `POST https://tpu.googleapis.com/v2/{+name}:getGuestAttributes`
- Retrieves the guest attributes for the node.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GetGuestAttributesRequest`; Response: `GetGuestAttributesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name. |

### `tpu.projects.locations.nodes.list`

- Versions: v2, v1, v2alpha1, v1alpha1
- `GET https://tpu.googleapis.com/v2/{+parent}/nodes`
- Lists nodes.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListNodesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource name. |
| `pageSize` | query | integer (int32) | no | The maximum number of items to return. |
| `pageToken` | query | string | no | The next_page_token value returned from a previous List request, if any. |

### `tpu.projects.locations.nodes.patch`

- Versions: v2, v2alpha1
- `PATCH https://tpu.googleapis.com/v2/{+name}`
- Updates the configurations of a node.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Node`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Output only. Immutable. The name of the TPU. |
| `updateMask` | query | string (google-fieldmask) | yes | Required. Mask of fields from Node to update. Supported fields: \[description, tags, labels, metadata, network_config.enable_external_ips\]. |

### `tpu.projects.locations.nodes.performMaintenance`

- Versions: v2alpha1
- `POST https://tpu.googleapis.com/v2alpha1/{+name}:performMaintenance`
- Perform manual maintenance on a node.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `PerformMaintenanceRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name. |

### `tpu.projects.locations.nodes.reimage`

- Versions: v1, v1alpha1
- `POST https://tpu.googleapis.com/v1/{+name}:reimage`
- Reimages a node's OS.
- Deprecated: `deprecated: true` in the Discovery document
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `ReimageNodeRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The resource name. |

### `tpu.projects.locations.nodes.simulateMaintenanceEvent`

- Versions: v2alpha1
- `POST https://tpu.googleapis.com/v2alpha1/{+name}:simulateMaintenanceEvent`
- Simulates a maintenance event.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `SimulateMaintenanceEventRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name. |

### `tpu.projects.locations.nodes.start`

- Versions: v2, v1, v2alpha1, v1alpha1
- `POST https://tpu.googleapis.com/v2/{+name}:start`
- Starts a node.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `StartNodeRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name. |

### `tpu.projects.locations.nodes.stop`

- Versions: v2, v1, v2alpha1, v1alpha1
- `POST https://tpu.googleapis.com/v2/{+name}:stop`
- Stops a node. This operation is only available with single TPU nodes.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `StopNodeRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name. |

### `tpu.projects.locations.operations.cancel`

- Versions: v2, v1, v2alpha1, v1alpha1
- `POST https://tpu.googleapis.com/v2/{+name}:cancel`
- Starts asynchronous cancellation on a long-running operation. The server makes a best effort to cancel the operation, but success is not guaranteed. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. Clients can use Operations.GetOperation or other methods to check whether the cancellation succeeded or whether the operation completed despite cancellation. On successful cancellation, the operation is not deleted; instead, it becomes an operation with an Operation.error value with a google.rpc.Status.code of `1`, corresponding to `Code.CANCELLED`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource to be cancelled. |

### `tpu.projects.locations.operations.delete`

- Versions: v2, v1, v2alpha1, v1alpha1
- `DELETE https://tpu.googleapis.com/v2/{+name}`
- Deletes a long-running operation. This method indicates that the client is no longer interested in the operation result. It does not cancel the operation. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource to be deleted. |

### `tpu.projects.locations.operations.get`

- Versions: v2, v1, v2alpha1, v1alpha1
- `GET https://tpu.googleapis.com/v2/{+name}`
- Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource. |

### `tpu.projects.locations.operations.list`

- Versions: v2, v1, v2alpha1, v1alpha1
- `GET https://tpu.googleapis.com/v2/{+name}/operations`
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

### `tpu.projects.locations.queuedResources.create`

- Versions: v2, v2alpha1
- `POST https://tpu.googleapis.com/v2/{+parent}/queuedResources`
- Creates a QueuedResource TPU instance.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `QueuedResource`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource name. |
| `queuedResourceId` | query | string | no | Optional. The unqualified resource name. Should follow the `^[A-Za-z0-9_.~+%-]+$` regex format. |
| `requestId` | query | string | no | Optional. Idempotent request UUID. |

### `tpu.projects.locations.queuedResources.delete`

- Versions: v2, v2alpha1
- `DELETE https://tpu.googleapis.com/v2/{+name}`
- Deletes a QueuedResource TPU instance.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name. |
| `force` | query | boolean | no | Optional. If set to true, all running nodes belonging to this queued resource will be deleted first and then the queued resource will be deleted. Otherwise (i.e. force=false), the queued resource will only be deleted if its nodes have already been deleted or the queued resource is in the ACCEPTED, FAILED, or SUSPENDED state. |
| `requestId` | query | string | no | Optional. Idempotent request UUID. |

### `tpu.projects.locations.queuedResources.get`

- Versions: v2, v2alpha1
- `GET https://tpu.googleapis.com/v2/{+name}`
- Gets details of a queued resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `QueuedResource`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name. |

### `tpu.projects.locations.queuedResources.getMaintenanceInfo`

- Versions: v2alpha1
- `GET https://tpu.googleapis.com/v2alpha1/{+name}:getMaintenanceInfo`
- Gets the maintenance info for a queued resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GetMaintenanceInfoResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The QueuedResource name. |

### `tpu.projects.locations.queuedResources.list`

- Versions: v2, v2alpha1
- `GET https://tpu.googleapis.com/v2/{+parent}/queuedResources`
- Lists queued resources.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListQueuedResourcesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource name. |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of items to return. |
| `pageToken` | query | string | no | Optional. The next_page_token value returned from a previous List request, if any. |

### `tpu.projects.locations.queuedResources.performMaintenanceQueuedResource`

- Versions: v2alpha1
- `POST https://tpu.googleapis.com/v2alpha1/{+name}:performMaintenanceQueuedResource`
- Perform manual maintenance on specific nodes of a QueuedResource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `PerformMaintenanceQueuedResourceRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the QueuedResource which holds the nodes to perform maintenance on. |

### `tpu.projects.locations.queuedResources.reset`

- Versions: v2, v2alpha1
- `POST https://tpu.googleapis.com/v2/{+name}:reset`
- Resets a QueuedResource TPU instance
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `ResetQueuedResourceRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the queued resource. |

### `tpu.projects.locations.reservations.list`

- Versions: v2alpha1
- `GET https://tpu.googleapis.com/v2alpha1/{+parent}/reservations`
- Retrieves the reservations for the given project in the given location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListReservationsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent for reservations. |
| `pageSize` | query | integer (int32) | no | The maximum number of items to return. Defaults to 0 if not specified, which means no limit. |
| `pageToken` | query | string | no | The next_page_token value returned from a previous List request, if any. |

### `tpu.projects.locations.runtimeVersions.get`

- Versions: v2, v2alpha1
- `GET https://tpu.googleapis.com/v2/{+name}`
- Gets a runtime version.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `RuntimeVersion`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name. |

### `tpu.projects.locations.runtimeVersions.list`

- Versions: v2, v2alpha1
- `GET https://tpu.googleapis.com/v2/{+parent}/runtimeVersions`
- Lists runtime versions supported by this API.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListRuntimeVersionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource name. |
| `filter` | query | string | no | List filter. |
| `orderBy` | query | string | no | Sort results. |
| `pageSize` | query | integer (int32) | no | The maximum number of items to return. |
| `pageToken` | query | string | no | The next_page_token value returned from a previous List request, if any. |

### `tpu.projects.locations.tensorflowVersions.get`

- Versions: v1, v1alpha1
- `GET https://tpu.googleapis.com/v1/{+name}`
- Gets TensorFlow Version.
- Deprecated: `deprecated: true` in the Discovery document
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `TensorFlowVersion`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name. |

### `tpu.projects.locations.tensorflowVersions.list`

- Versions: v1, v1alpha1
- `GET https://tpu.googleapis.com/v1/{+parent}/tensorflowVersions`
- List TensorFlow versions supported by this API.
- Deprecated: `deprecated: true` in the Discovery document
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListTensorFlowVersionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource name. |
| `filter` | query | string | no | List filter. |
| `orderBy` | query | string | no | Sort results. |
| `pageSize` | query | integer (int32) | no | The maximum number of items to return. |
| `pageToken` | query | string | no | The next_page_token value returned from a previous List request, if any. |

### Example request skeleton

Generated from the Discovery entry of `tpu.projects.locations.acceleratorTypes.get` (not in the official docs); replace the `{...}` path variables (URL-encode query values):

```bash
curl -X GET \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  "https://tpu.googleapis.com/v2/{+name}"
```

## Notes

- Generated from the Discovery document(s) v2, v1, v2alpha1, v1alpha1 of `tpu` (retrieved 2026-11-14). Resources on this page: projects.
- The Required column is `yes` for path variables and required parameters, and `conditional` when the description says "Required if ..." (mutually exclusive alternatives), when a `parent.child` parameter is required only inside an optional parent message or one branch of a oneof. Path variables are `yes` unless a note below names an alternative route without them.
- Message schemas (the request and response types named above) are listed under `references/rest-schemas/tpu/`; they are the `schemas` section of the Discovery documents in Source.
- Deprecated methods (`deprecated: true` in Discovery): `tpu.projects.locations.nodes.reimage`, `tpu.projects.locations.tensorflowVersions.get`, `tpu.projects.locations.tensorflowVersions.list`. Avoid them in new code.
- Source: https://tpu.googleapis.com/$discovery/rest?version=v2, https://tpu.googleapis.com/$discovery/rest?version=v1, https://tpu.googleapis.com/$discovery/rest?version=v2alpha1, https://tpu.googleapis.com/$discovery/rest?version=v1alpha1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
