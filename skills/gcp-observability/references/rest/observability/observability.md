---
source: https://observability.googleapis.com/$discovery/rest?version=v1
---

# Observability API REST API (observability)

## Signature / Usage

Base URL: `https://observability.googleapis.com`. Methods are listed by `id`; the `Versions` line shows which API versions define the method (preferred: v1).

### `observability.folders.locations.get`

- Versions: v1
- `GET https://observability.googleapis.com/v1/{+name}`
- Gets information about a location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Location`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Resource name for the location. |

### `observability.folders.locations.getSettings`

- Versions: v1
- `GET https://observability.googleapis.com/v1/{+name}`
- Get Settings
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Settings`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the settings to retrieve. Name format: "projects/\[PROJECT_ID\]/locations/\[LOCATION\]/settings" "folders/\[FOLDER_ID\]/locations/\[LOCATION\]/settings" "organizations/\[ORGANIZATION_ID\]/locations/\[LOCATION\]/settings" |

### `observability.folders.locations.list`

- Versions: v1
- `GET https://observability.googleapis.com/v1/{+name}/locations`
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

### `observability.folders.locations.operations.cancel`

- Versions: v1
- `POST https://observability.googleapis.com/v1/{+name}:cancel`
- Starts asynchronous cancellation on a long-running operation. The server makes a best effort to cancel the operation, but success is not guaranteed. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. Clients can use Operations.GetOperation or other methods to check whether the cancellation succeeded or whether the operation completed despite cancellation. On successful cancellation, the operation is not deleted; instead, it becomes an operation with an Operation.error value with a google.rpc.Status.code of `1`, corresponding to `Code.CANCELLED`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `CancelOperationRequest`; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource to be cancelled. |

### `observability.folders.locations.operations.delete`

- Versions: v1
- `DELETE https://observability.googleapis.com/v1/{+name}`
- Deletes a long-running operation. This method indicates that the client is no longer interested in the operation result. It does not cancel the operation. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource to be deleted. |

### `observability.folders.locations.operations.get`

- Versions: v1
- `GET https://observability.googleapis.com/v1/{+name}`
- Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource. |

### `observability.folders.locations.operations.list`

- Versions: v1
- `GET https://observability.googleapis.com/v1/{+name}/operations`
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

### `observability.folders.locations.updateSettings`

- Versions: v1
- `PATCH https://observability.googleapis.com/v1/{+name}`
- Update Settings
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Settings`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. The resource name of the settings. |
| `updateMask` | query | string (google-fieldmask) | no | Optional. The field mask specifying which fields of the settings are to be updated. |

### `observability.organizations.locations.get`

- Versions: v1
- `GET https://observability.googleapis.com/v1/{+name}`
- Gets information about a location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Location`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Resource name for the location. |

### `observability.organizations.locations.getSettings`

- Versions: v1
- `GET https://observability.googleapis.com/v1/{+name}`
- Get Settings
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Settings`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the settings to retrieve. Name format: "projects/\[PROJECT_ID\]/locations/\[LOCATION\]/settings" "folders/\[FOLDER_ID\]/locations/\[LOCATION\]/settings" "organizations/\[ORGANIZATION_ID\]/locations/\[LOCATION\]/settings" |

### `observability.organizations.locations.list`

- Versions: v1
- `GET https://observability.googleapis.com/v1/{+name}/locations`
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

### `observability.organizations.locations.operations.cancel`

- Versions: v1
- `POST https://observability.googleapis.com/v1/{+name}:cancel`
- Starts asynchronous cancellation on a long-running operation. The server makes a best effort to cancel the operation, but success is not guaranteed. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. Clients can use Operations.GetOperation or other methods to check whether the cancellation succeeded or whether the operation completed despite cancellation. On successful cancellation, the operation is not deleted; instead, it becomes an operation with an Operation.error value with a google.rpc.Status.code of `1`, corresponding to `Code.CANCELLED`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `CancelOperationRequest`; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource to be cancelled. |

### `observability.organizations.locations.operations.delete`

- Versions: v1
- `DELETE https://observability.googleapis.com/v1/{+name}`
- Deletes a long-running operation. This method indicates that the client is no longer interested in the operation result. It does not cancel the operation. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource to be deleted. |

### `observability.organizations.locations.operations.get`

- Versions: v1
- `GET https://observability.googleapis.com/v1/{+name}`
- Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource. |

### `observability.organizations.locations.operations.list`

- Versions: v1
- `GET https://observability.googleapis.com/v1/{+name}/operations`
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

### `observability.organizations.locations.updateSettings`

- Versions: v1
- `PATCH https://observability.googleapis.com/v1/{+name}`
- Update Settings
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Settings`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. The resource name of the settings. |
| `updateMask` | query | string (google-fieldmask) | no | Optional. The field mask specifying which fields of the settings are to be updated. |

### `observability.projects.locations.buckets.create`

- Versions: v1
- `POST https://observability.googleapis.com/v1/{+parent}/buckets`
- Create a new bucket.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Bucket`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Name of the project and location for the bucket. The format is: projects/\[PROJECT_ID\]/locations/\[LOCATION\] |
| `bucketId` | query | string | yes | Required. Id of the bucket to create. |

### `observability.projects.locations.buckets.datasets.get`

- Versions: v1
- `GET https://observability.googleapis.com/v1/{+name}`
- Get a dataset.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Dataset`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the dataset to retrieve. The format is: projects/\[PROJECT_ID\]/locations/\[LOCATION\]/buckets/\[BUCKET_ID\]/datasets/\[DATASET_ID\] |

### `observability.projects.locations.buckets.datasets.links.create`

- Versions: v1
- `POST https://observability.googleapis.com/v1/{+parent}/links`
- Create a new link.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Link`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Name of the containing dataset for this link. The format is: projects/\[PROJECT_ID\]/locations/\[LOCATION\]/buckets/\[BUCKET_ID\]/datasets/\[DATASET_ID\] |
| `linkId` | query | string | yes | Required. Id of the link to create. |

### `observability.projects.locations.buckets.datasets.links.delete`

- Versions: v1
- `DELETE https://observability.googleapis.com/v1/{+name}`
- Delete a link.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the link to delete. The format is: projects/\[PROJECT_ID\]/locations/\[LOCATION\]/buckets/\[BUCKET_ID\]/datasets/\[DATASET_ID\]/links/\[LINK_ID\] |

### `observability.projects.locations.buckets.datasets.links.get`

- Versions: v1
- `GET https://observability.googleapis.com/v1/{+name}`
- Get a link.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Link`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the link to retrieve. The format is: projects/\[PROJECT_ID\]/locations/\[LOCATION\]/buckets/\[BUCKET_ID\]/datasets/\[DATASET_ID\]/links/\[LINK_ID\] |

### `observability.projects.locations.buckets.datasets.links.list`

- Versions: v1
- `GET https://observability.googleapis.com/v1/{+parent}/links`
- List links of a dataset.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListLinksResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent dataset that owns this collection of links. The format is: projects/\[PROJECT_ID\]/locations/\[LOCATION\]/buckets/\[BUCKET_ID\]/datasets/\[DATASET_ID\] |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of links to return. If unspecified, then at most 100 links are returned. The maximum value is 1000; values above 1000 are coerced to 1000. |
| `pageToken` | query | string | no | Optional. A page token, received from a previous `ListLinks` call. Provide this to retrieve the subsequent page. |

### `observability.projects.locations.buckets.datasets.links.patch`

- Versions: v1
- `PATCH https://observability.googleapis.com/v1/{+name}`
- Update a link.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Link`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. Name of the link. The format is: projects/\[PROJECT_ID\]/locations/\[LOCATION\]/buckets/\[BUCKET_ID\]/datasets/\[DATASET_ID\]/links/\[LINK_ID\] |
| `updateMask` | query | string (google-fieldmask) | no | Optional. The list of fields to update. |

### `observability.projects.locations.buckets.datasets.list`

- Versions: v1
- `GET https://observability.googleapis.com/v1/{+parent}/datasets`
- List datasets of a bucket.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListDatasetsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent bucket that owns this collection of datasets. The format is: projects/\[PROJECT_ID\]/locations/\[LOCATION\]/buckets/\[BUCKET_ID\] |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of datasets to return. If unspecified, then at most 100 datasets are returned. The maximum value is 1000; values above 1000 are coerced to 1000. |
| `pageToken` | query | string | no | Optional. A page token, received from a previous `ListDatasets` call. Provide this to retrieve the subsequent page. |
| `showDeleted` | query | boolean | no | Optional. If true, then the response will include deleted datasets. |

### `observability.projects.locations.buckets.datasets.views.get`

- Versions: v1
- `GET https://observability.googleapis.com/v1/{+name}`
- Get a view.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `View`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the view to retrieve. The format is: projects/\[PROJECT_ID\]/locations/\[LOCATION\]/buckets/\[BUCKET_ID\]/datasets/\[DATASET_ID\]/views/\[VIEW_ID\] |

### `observability.projects.locations.buckets.datasets.views.list`

- Versions: v1
- `GET https://observability.googleapis.com/v1/{+parent}/views`
- List views of a dataset.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListViewsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Dataset whose views are to be listed. The format is: projects/\[PROJECT_ID\]/locations/\[LOCATION\]/buckets/\[BUCKET_ID\]/datasets/\[DATASET_ID\] |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of views to return. If unspecified, then at most 100 views are returned. The maximum value is 1000; values above 1000 are coerced to 1000. |
| `pageToken` | query | string | no | Optional. A page token, received from a previous `ListViews` call. Provide this to retrieve the subsequent page. |

### `observability.projects.locations.buckets.get`

- Versions: v1
- `GET https://observability.googleapis.com/v1/{+name}`
- Get bucket resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Bucket`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the bucket to retrieve. The format is: projects/\[PROJECT_ID\]/locations/\[LOCATION\]/buckets/\[BUCKET_ID\] |

### `observability.projects.locations.buckets.list`

- Versions: v1
- `GET https://observability.googleapis.com/v1/{+parent}/buckets`
- List buckets of a project in a particular location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListBucketsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent, which owns this collection of buckets. The format is: projects/\[PROJECT_ID\]/locations/\[LOCATION\] |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of buckets to return. If unspecified, then at most 100 buckets are returned. The maximum value is 1000; values above 1000 are coerced to 1000. |
| `pageToken` | query | string | no | Optional. A page token, received from a previous `ListBuckets` call. Provide this to retrieve the subsequent page. |
| `showDeleted` | query | boolean | no | Optional. If true, then the response will include deleted buckets. |

### `observability.projects.locations.buckets.patch`

- Versions: v1
- `PATCH https://observability.googleapis.com/v1/{+name}`
- Update a bucket.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Bucket`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. Name of the bucket. The format is: projects/\[PROJECT_ID\]/locations/\[LOCATION\]/buckets/\[BUCKET_ID\] |
| `updateMask` | query | string (google-fieldmask) | no | Optional. The list of fields to update. |

### `observability.projects.locations.buckets.reprovision`

- Versions: v1
- `POST https://observability.googleapis.com/v1/{+name}:reprovision`
- Initiates reprovisioning of a bucket. This is allowed only a single time for a bucket and results in data loss. Subsequent calls to this method for the same bucket will result in a FAILED_PRECONDITION (400 Bad Request) error.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `ReprovisionBucketRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the bucket to reprovision. The format is: projects/\[PROJECT_ID\]/locations/\[LOCATION\]/buckets/\[BUCKET_ID\] |

### `observability.projects.locations.get`

- Versions: v1
- `GET https://observability.googleapis.com/v1/{+name}`
- Gets information about a location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Location`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Resource name for the location. |

### `observability.projects.locations.getSettings`

- Versions: v1
- `GET https://observability.googleapis.com/v1/{+name}`
- Get Settings
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Settings`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the settings to retrieve. Name format: "projects/\[PROJECT_ID\]/locations/\[LOCATION\]/settings" "folders/\[FOLDER_ID\]/locations/\[LOCATION\]/settings" "organizations/\[ORGANIZATION_ID\]/locations/\[LOCATION\]/settings" |

### `observability.projects.locations.list`

- Versions: v1
- `GET https://observability.googleapis.com/v1/{+name}/locations`
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

### `observability.projects.locations.operations.cancel`

- Versions: v1
- `POST https://observability.googleapis.com/v1/{+name}:cancel`
- Starts asynchronous cancellation on a long-running operation. The server makes a best effort to cancel the operation, but success is not guaranteed. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. Clients can use Operations.GetOperation or other methods to check whether the cancellation succeeded or whether the operation completed despite cancellation. On successful cancellation, the operation is not deleted; instead, it becomes an operation with an Operation.error value with a google.rpc.Status.code of `1`, corresponding to `Code.CANCELLED`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `CancelOperationRequest`; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource to be cancelled. |

### `observability.projects.locations.operations.delete`

- Versions: v1
- `DELETE https://observability.googleapis.com/v1/{+name}`
- Deletes a long-running operation. This method indicates that the client is no longer interested in the operation result. It does not cancel the operation. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource to be deleted. |

### `observability.projects.locations.operations.get`

- Versions: v1
- `GET https://observability.googleapis.com/v1/{+name}`
- Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource. |

### `observability.projects.locations.operations.list`

- Versions: v1
- `GET https://observability.googleapis.com/v1/{+name}/operations`
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

### `observability.projects.locations.scopes.get`

- Versions: v1
- `GET https://observability.googleapis.com/v1/{+name}`
- Gets details of a single Scope.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Scope`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the resource. The format is: projects/{project}/locations/{location}/scopes/{scope} The `{location}` field must be set to `global`. The `{scope}` field must be set to `_Default`. |

### `observability.projects.locations.scopes.patch`

- Versions: v1
- `PATCH https://observability.googleapis.com/v1/{+name}`
- Updates the parameters of a single Scope.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Scope`; Response: `Scope`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. Name of the resource. The format is: projects/{project}/locations/{location}/scopes/{scope} The `{location}` field must be set to `global`. The `{scope}` field must be set to `_Default`. |
| `updateMask` | query | string (google-fieldmask) | no | Optional. Field mask is used to specify the fields to be overwritten in the Scope resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. A field is overwritten when it is in the mask. If the user does not provide a mask, then all fields present in the request are overwritten. |

### `observability.projects.locations.traceScopes.create`

- Versions: v1
- `POST https://observability.googleapis.com/v1/{+parent}/traceScopes`
- Create a new TraceScope.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `TraceScope`; Response: `TraceScope`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The full resource name of the location where the trace scope should be created projects/\[PROJECT_ID\]/locations/\[LOCATION_ID\] For example: projects/my-project/locations/global |
| `traceScopeId` | query | string | yes | Required. A client-assigned identifier for the trace scope. |

### `observability.projects.locations.traceScopes.delete`

- Versions: v1
- `DELETE https://observability.googleapis.com/v1/{+name}`
- Delete a TraceScope.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The full resource name of the trace scope to delete: projects/\[PROJECT_ID\]/locations/\[LOCATION_ID\]/traceScopes/\[TRACE_SCOPE_ID\] For example: projects/my-project/locations/global/traceScopes/my-trace-scope |

### `observability.projects.locations.traceScopes.get`

- Versions: v1
- `GET https://observability.googleapis.com/v1/{+name}`
- Get TraceScope resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `TraceScope`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the trace scope: projects/\[PROJECT_ID\]/locations/\[LOCATION_ID\]/traceScopes/\[TRACE_SCOPE_ID\] For example: projects/my-project/locations/global/traceScopes/my-trace-scope |

### `observability.projects.locations.traceScopes.list`

- Versions: v1
- `GET https://observability.googleapis.com/v1/{+parent}/traceScopes`
- List TraceScopes of a project in a particular location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListTraceScopesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The full resource name of the location to look for trace scopes: projects/\[PROJECT_ID\]/locations/\[LOCATION_ID\] For example: projects/my-project/locations/global |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of results to return from this request. Non-positive values are ignored. The presence of `next_page_token` in the response indicates that more results might be available. |
| `pageToken` | query | string | no | Optional. If present, then retrieve the next batch of results from the preceding call to this method. `page_token` must be the value of `next_page_token` from the previous response. The values of other method parameters should be identical to those in the previous call. |

### `observability.projects.locations.traceScopes.patch`

- Versions: v1
- `PATCH https://observability.googleapis.com/v1/{+name}`
- Update a TraceScope.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `TraceScope`; Response: `TraceScope`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. The resource name of the trace scope. For example: projects/my-project/locations/global/traceScopes/my-trace-scope |
| `updateMask` | query | string (google-fieldmask) | no | Optional. The list of fields to update. |

### `observability.projects.locations.updateSettings`

- Versions: v1
- `PATCH https://observability.googleapis.com/v1/{+name}`
- Update Settings
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Settings`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. The resource name of the settings. |
| `updateMask` | query | string (google-fieldmask) | no | Optional. The field mask specifying which fields of the settings are to be updated. |

### Example request skeleton

Generated from the Discovery entry of `observability.folders.locations.get` (not in the official docs); replace the `{...}` path variables (URL-encode query values):

```bash
curl -X GET \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  "https://observability.googleapis.com/v1/{+name}"
```

## Notes

- Generated from the Discovery document(s) v1 of `observability` (retrieved 2026-11-14). Resources on this page: folders, organizations, projects.
- The Required column is `yes` for path variables and required parameters, and `conditional` when the description says "Required if ..." (mutually exclusive alternatives), when a `parent.child` parameter is required only inside an optional parent message or one branch of a oneof. Path variables are `yes` unless a note below names an alternative route without them.
- Message schemas (the request and response types named above) are listed under `references/rest-schemas/observability/`; they are the `schemas` section of the Discovery documents in Source.
- Regional endpoints: the Discovery document (`observability` v1, revision 20261029) also lists 45 endpoints of the form `https://observability.LOCATION.rep.googleapis.com/` (Regional Endpoint), for LOCATION in `africa-south1`, `asia-east1`, `asia-east2`, `asia-northeast1`, `asia-northeast2`, `asia-northeast3`, `asia-south1`, `asia-south2`, `asia-southeast1`, `asia-southeast2`, `asia-southeast3`, `australia-southeast1`, `australia-southeast2`, `eu`, `europe-central2`, `europe-north1`, `europe-north2`, `europe-southwest1`, `europe-west1`, `europe-west10`, `europe-west12`, `europe-west2`, `europe-west3`, `europe-west4`, `europe-west6`, `europe-west8`, `europe-west9`, `me-central1`, `me-central2`, `me-west1`, `northamerica-northeast1`, `northamerica-northeast2`, `northamerica-south1`, `southamerica-east1`, `southamerica-west1`, `us`, `us-central1`, `us-east1`, `us-east4`, `us-east5`, `us-south1`, `us-west1`, `us-west2`, `us-west3`, `us-west4`. The method URLs above use the global host `https://observability.googleapis.com/`; to send a request through one of these endpoints, replace the host with the endpoint for the resource's location (for example `https://observability.africa-south1.rep.googleapis.com/`) and keep the path.
- Source: https://observability.googleapis.com/$discovery/rest?version=v1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
