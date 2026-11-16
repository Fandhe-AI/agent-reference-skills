---
source: https://datastore.googleapis.com/$discovery/rest?version=v1
---

# Cloud Datastore API REST API (datastore)

## Signature / Usage

Base URL: `https://datastore.googleapis.com`. Methods are listed by `id`; the `Versions` line shows which API versions define the method (preferred: v1).

### `datastore.projects.allocateIds`

- Versions: v1, v1beta3
- `POST https://datastore.googleapis.com/v1/projects/{projectId}:allocateIds`
- Allocates IDs for the given keys, which is useful for referencing an entity before it is inserted.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/datastore`
- Request: `AllocateIdsRequest`; Response: `AllocateIdsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `projectId` | path | string | yes | Required. The ID of the project against which to make the request. |

### `datastore.projects.beginTransaction`

- Versions: v1, v1beta3
- `POST https://datastore.googleapis.com/v1/projects/{projectId}:beginTransaction`
- Begins a new transaction.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/datastore`
- Request: `BeginTransactionRequest`; Response: `BeginTransactionResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `projectId` | path | string | yes | Required. The ID of the project against which to make the request. |

### `datastore.projects.commit`

- Versions: v1, v1beta3
- `POST https://datastore.googleapis.com/v1/projects/{projectId}:commit`
- Commits a transaction, optionally creating, deleting or modifying some entities.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/datastore`
- Request: `CommitRequest`; Response: `CommitResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `projectId` | path | string | yes | Required. The ID of the project against which to make the request. |

### `datastore.projects.export`

- Versions: v1, v1beta1
- `POST https://datastore.googleapis.com/v1/projects/{projectId}:export`
- Exports a copy of all or a subset of entities from Google Cloud Datastore to another storage system, such as Google Cloud Storage. Recent updates to entities may not be reflected in the export. The export occurs in the background and its progress can be monitored and managed via the Operation resource that is created. The output of an export may only be used once the associated operation is done. If an export operation is cancelled before completion it may leave partial data behind in Google Cloud Storage.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/datastore`
- Request: `GoogleDatastoreAdminV1ExportEntitiesRequest`; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `projectId` | path | string | yes | Required. Project ID against which to make the request. |

### `datastore.projects.import`

- Versions: v1, v1beta1
- `POST https://datastore.googleapis.com/v1/projects/{projectId}:import`
- Imports entities into Google Cloud Datastore. Existing entities with the same key are overwritten. The import occurs in the background and its progress can be monitored and managed via the Operation resource that is created. If an ImportEntities operation is cancelled, it is possible that a subset of the data has already been imported to Cloud Datastore.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/datastore`
- Request: `GoogleDatastoreAdminV1ImportEntitiesRequest`; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `projectId` | path | string | yes | Required. Project ID against which to make the request. |

### `datastore.projects.indexes.create`

- Versions: v1
- `POST https://datastore.googleapis.com/v1/projects/{projectId}/indexes`
- Creates the specified index. A newly created index's initial state is `CREATING`. On completion of the returned google.longrunning.Operation, the state will be `READY`. If the index already exists, the call will return an `ALREADY_EXISTS` status. During index creation, the process could result in an error, in which case the index will move to the `ERROR` state. The process can be recovered by fixing the data that caused the error, removing the index with delete, then re-creating the index with create. Indexes with a single property cannot be created.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/datastore`
- Request: `GoogleDatastoreAdminV1Index`; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `projectId` | path | string | yes | Project ID against which to make the request. |

### `datastore.projects.indexes.delete`

- Versions: v1
- `DELETE https://datastore.googleapis.com/v1/projects/{projectId}/indexes/{indexId}`
- Deletes an existing index. An index can only be deleted if it is in a `READY` or `ERROR` state. On successful execution of the request, the index will be in a `DELETING` state. And on completion of the returned google.longrunning.Operation, the index will be removed. During index deletion, the process could result in an error, in which case the index will move to the `ERROR` state. The process can be recovered by fixing the data that caused the error, followed by calling delete again.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/datastore`
- Request: —; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `projectId` | path | string | yes | Project ID against which to make the request. |
| `indexId` | path | string | yes | The resource ID of the index to delete. |

### `datastore.projects.indexes.get`

- Versions: v1
- `GET https://datastore.googleapis.com/v1/projects/{projectId}/indexes/{indexId}`
- Gets an index.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/datastore`
- Request: —; Response: `GoogleDatastoreAdminV1Index`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `projectId` | path | string | yes | Project ID against which to make the request. |
| `indexId` | path | string | yes | The resource ID of the index to get. |

### `datastore.projects.indexes.list`

- Versions: v1
- `GET https://datastore.googleapis.com/v1/projects/{projectId}/indexes`
- Lists the indexes that match the specified filters. Datastore uses an eventually consistent query to fetch the list of indexes and may occasionally return stale results.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/datastore`
- Request: —; Response: `GoogleDatastoreAdminV1ListIndexesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `projectId` | path | string | yes | Project ID against which to make the request. |
| `filter` | query | string | no | — |
| `pageSize` | query | integer (int32) | no | The maximum number of items to return. If zero, then all results will be returned. |
| `pageToken` | query | string | no | The next_page_token value returned from a previous List request, if any. |

### `datastore.projects.lookup`

- Versions: v1, v1beta3
- `POST https://datastore.googleapis.com/v1/projects/{projectId}:lookup`
- Looks up entities by key.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/datastore`
- Request: `LookupRequest`; Response: `LookupResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `projectId` | path | string | yes | Required. The ID of the project against which to make the request. |

### `datastore.projects.operations.cancel`

- Versions: v1
- `POST https://datastore.googleapis.com/v1/{+name}:cancel`
- Starts asynchronous cancellation on a long-running operation. The server makes a best effort to cancel the operation, but success is not guaranteed. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. Clients can use Operations.GetOperation or other methods to check whether the cancellation succeeded or whether the operation completed despite cancellation. On successful cancellation, the operation is not deleted; instead, it becomes an operation with an Operation.error value with a google.rpc.Status.code of `1`, corresponding to `Code.CANCELLED`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/datastore`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource to be cancelled. |

### `datastore.projects.operations.delete`

- Versions: v1
- `DELETE https://datastore.googleapis.com/v1/{+name}`
- Deletes a long-running operation. This method indicates that the client is no longer interested in the operation result. It does not cancel the operation. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/datastore`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource to be deleted. |

### `datastore.projects.operations.get`

- Versions: v1
- `GET https://datastore.googleapis.com/v1/{+name}`
- Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/datastore`
- Request: —; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource. |

### `datastore.projects.operations.list`

- Versions: v1
- `GET https://datastore.googleapis.com/v1/{+name}/operations`
- Lists operations that match the specified filter in the request. If the server doesn't support this method, it returns `UNIMPLEMENTED`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/datastore`
- Request: —; Response: `GoogleLongrunningListOperationsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation's parent resource. |
| `filter` | query | string | no | The standard list filter. |
| `pageSize` | query | integer (int32) | no | The standard list page size. |
| `pageToken` | query | string | no | The standard list page token. |
| `returnPartialSuccess` | query | boolean | no | When set to `true`, operations that are reachable are returned as normal, and those that are unreachable are returned in the ListOperationsResponse.unreachable field. This can only be `true` when reading across collections. For example, when `parent` is set to `"projects/example/locations/-"`. This field is not supported by default and will result in an `UNIMPLEMENTED` error if set unless explicitly documented otherwise in service or product specific documentation. |

### `datastore.projects.reserveIds`

- Versions: v1, v1beta3
- `POST https://datastore.googleapis.com/v1/projects/{projectId}:reserveIds`
- Prevents the supplied keys' IDs from being auto-allocated by Cloud Datastore.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/datastore`
- Request: `ReserveIdsRequest`; Response: `ReserveIdsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `projectId` | path | string | yes | Required. The ID of the project against which to make the request. |

### `datastore.projects.rollback`

- Versions: v1, v1beta3
- `POST https://datastore.googleapis.com/v1/projects/{projectId}:rollback`
- Rolls back a transaction.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/datastore`
- Request: `RollbackRequest`; Response: `RollbackResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `projectId` | path | string | yes | Required. The ID of the project against which to make the request. |

### `datastore.projects.runAggregationQuery`

- Versions: v1, v1beta3
- `POST https://datastore.googleapis.com/v1/projects/{projectId}:runAggregationQuery`
- Runs an aggregation query.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/datastore`
- Request: `RunAggregationQueryRequest`; Response: `RunAggregationQueryResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `projectId` | path | string | yes | Required. The ID of the project against which to make the request. |

### `datastore.projects.runQuery`

- Versions: v1, v1beta3
- `POST https://datastore.googleapis.com/v1/projects/{projectId}:runQuery`
- Queries for entities.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/datastore`
- Request: `RunQueryRequest`; Response: `RunQueryResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `projectId` | path | string | yes | Required. The ID of the project against which to make the request. |

### Example request skeleton

Generated from the Discovery entry of `datastore.projects.indexes.get` (not in the official docs); replace the `{...}` path variables (URL-encode query values):

```bash
curl -X GET \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  "https://datastore.googleapis.com/v1/projects/{projectId}/indexes/{indexId}"
```

## Notes

- Generated from the Discovery document(s) v1, v1beta3, v1beta1 of `datastore` (retrieved 2026-11-14). Resources on this page: projects.
- The Required column is `yes` for path variables and required parameters, and `conditional` when the description says "Required if ..." (mutually exclusive alternatives), when a `parent.child` parameter is required only inside an optional parent message or one branch of a oneof. Path variables are `yes` unless a note below names an alternative route without them.
- Message schemas (the request and response types named above) are defined in the `schemas` section of the Discovery documents in Source.
- Source: https://datastore.googleapis.com/$discovery/rest?version=v1, https://datastore.googleapis.com/$discovery/rest?version=v1beta3, https://datastore.googleapis.com/$discovery/rest?version=v1beta1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
