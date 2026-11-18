---
source: https://hypercomputecluster.googleapis.com/$discovery/rest?version=v1
---

# Cluster Director API REST API (hypercomputecluster)

## Signature / Usage

Base URL: `https://hypercomputecluster.googleapis.com`. Methods are listed by `id`; the `Versions` line shows which API versions define the method (preferred: v1).

### `hypercomputecluster.projects.locations.clusters.create`

- Versions: v1
- `POST https://hypercomputecluster.googleapis.com/v1/{+parent}/clusters`
- Creates a new Cluster in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Cluster`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Parent location in which the cluster should be created, in the format `projects/{project}/locations/{location}`. |
| `clusterId` | query | string | yes | Required. The ID of the cluster to create. The cluster ID must start with a lowercase letter (`a`-`z`), use only lowercase letters or numbers, and contain up to 10 characters. For example, specify `cluster001`. |
| `requestId` | query | string | no | Optional. A unique identifier for this request. A random UUID is recommended. This request is idempotent if and only if `request_id` is provided. |

### `hypercomputecluster.projects.locations.clusters.delete`

- Versions: v1
- `DELETE https://hypercomputecluster.googleapis.com/v1/{+name}`
- Deletes a single Cluster.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the cluster to delete, in the format `projects/{project}/locations/{location}/clusters/{cluster}`. |
| `requestId` | query | string | no | Optional. A unique identifier for this request. A random UUID is recommended. This request is idempotent if and only if `request_id` is provided. |

### `hypercomputecluster.projects.locations.clusters.get`

- Versions: v1
- `GET https://hypercomputecluster.googleapis.com/v1/{+name}`
- Gets details of a single Cluster.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Cluster`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the cluster to retrieve, in the format `projects/{project}/locations/{location}/clusters/{cluster}`. |

### `hypercomputecluster.projects.locations.clusters.list`

- Versions: v1
- `GET https://hypercomputecluster.googleapis.com/v1/{+parent}/clusters`
- Lists Clusters in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListClustersResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Parent location of the clusters to list, in the format `projects/{project}/locations/{location}`. |
| `filter` | query | string | no | Optional. Filter (https://google.aip.dev/160) to apply to the returned results. |
| `orderBy` | query | string | no | Optional. How to order the resulting clusters. Must be one of the following strings: \* `name` \* `name desc` \* `create_time` \* `create_time desc` If not specified, clusters will be returned in an arbitrary order. |
| `pageSize` | query | integer (int32) | no | Optional. Maximum number of clusters to return. The service may return fewer than this value. |
| `pageToken` | query | string | no | Optional. A page token received from a previous `ListClusters` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListClusters` must match the call that provided the page token. |

### `hypercomputecluster.projects.locations.clusters.patch`

- Versions: v1
- `PATCH https://hypercomputecluster.googleapis.com/v1/{+name}`
- Updates the parameters of a single Cluster.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Cluster`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. Relative resource name (https://google.aip.dev/122) of the cluster, in the format `projects/{project}/locations/{location}/clusters/{cluster}`. |
| `requestId` | query | string | no | Optional. A unique identifier for this request. A random UUID is recommended. This request is idempotent if and only if `request_id` is provided. |
| `updateMask` | query | string (google-fieldmask) | no | Optional. Mask specifying which fields in the cluster to update. All paths must be specified explicitly - wildcards are not supported. At least one path must be provided. |

### `hypercomputecluster.projects.locations.get`

- Versions: v1
- `GET https://hypercomputecluster.googleapis.com/v1/{+name}`
- Gets information about a location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Location`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Resource name for the location. |

### `hypercomputecluster.projects.locations.list`

- Versions: v1
- `GET https://hypercomputecluster.googleapis.com/v1/{+name}/locations`
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

### `hypercomputecluster.projects.locations.operations.cancel`

- Versions: v1
- `POST https://hypercomputecluster.googleapis.com/v1/{+name}:cancel`
- Starts asynchronous cancellation on a long-running operation. The server makes a best effort to cancel the operation, but success is not guaranteed. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. Clients can use Operations.GetOperation or other methods to check whether the cancellation succeeded or whether the operation completed despite cancellation. On successful cancellation, the operation is not deleted; instead, it becomes an operation with an Operation.error value with a google.rpc.Status.code of `1`, corresponding to `Code.CANCELLED`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `CancelOperationRequest`; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource to be cancelled. |

### `hypercomputecluster.projects.locations.operations.delete`

- Versions: v1
- `DELETE https://hypercomputecluster.googleapis.com/v1/{+name}`
- Deletes a long-running operation. This method indicates that the client is no longer interested in the operation result. It does not cancel the operation. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource to be deleted. |

### `hypercomputecluster.projects.locations.operations.get`

- Versions: v1
- `GET https://hypercomputecluster.googleapis.com/v1/{+name}`
- Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource. |

### `hypercomputecluster.projects.locations.operations.list`

- Versions: v1
- `GET https://hypercomputecluster.googleapis.com/v1/{+name}/operations`
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

Generated from the Discovery entry of `hypercomputecluster.projects.locations.clusters.get` (not in the official docs); replace the `{...}` path variables (URL-encode query values):

```bash
curl -X GET \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  "https://hypercomputecluster.googleapis.com/v1/{+name}"
```

## Notes

- Generated from the Discovery document(s) v1 of `hypercomputecluster` (retrieved 2026-11-14). Resources on this page: projects.
- The Required column is `yes` for path variables and required parameters, and `conditional` when the description says "Required if ..." (mutually exclusive alternatives), when a `parent.child` parameter is required only inside an optional parent message or one branch of a oneof. Path variables are `yes` unless a note below names an alternative route without them.
- Message schemas (the request and response types named above) are listed under `references/rest-schemas/hypercomputecluster/`; they are the `schemas` section of the Discovery documents in Source.
- Regional endpoints: the Discovery document (`hypercomputecluster` v1, revision 20261021) also lists 9 endpoints of the form `https://hypercomputecluster.LOCATION.rep.googleapis.com/` (Regional Endpoint), for LOCATION in `us-central1`, `us-east1`, `us-east4`, `us-east5`, `us-south1`, `us-west1`, `us-west2`, `us-west3`, `us-west4`. The method URLs above use the global host `https://hypercomputecluster.googleapis.com/`; to send a request through one of these endpoints, replace the host with the endpoint for the resource's location (for example `https://hypercomputecluster.us-east1.rep.googleapis.com/`) and keep the path.
- Source: https://hypercomputecluster.googleapis.com/$discovery/rest?version=v1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
