---
source: https://networksecurity.googleapis.com/$discovery/rest?version=v1
---

# Network Security API REST API (networksecurity) (part 2/2)

## Signature / Usage

Base URL: `https://networksecurity.googleapis.com`. Methods are listed by `id`; the `Versions` line shows which API versions define the method (preferred: v1).

### `networksecurity.projects.locations.interceptEndpointGroups.patch`

- Versions: v1, v1beta1
- `PATCH https://networksecurity.googleapis.com/v1/{+name}`
- Updates an endpoint group. See https://google.aip.dev/134.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `InterceptEndpointGroup`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Immutable. Identifier. The resource name of this endpoint group, for example: `projects/123456789/locations/global/interceptEndpointGroups/my-eg`. See https://google.aip.dev/122 for more details. |
| `requestId` | query | string | no | Optional. A unique identifier for this request. Must be a UUID4. This request is only idempotent if a `request_id` is provided. See https://google.aip.dev/155 for more details. |
| `updateMask` | query | string (google-fieldmask) | no | Optional. The list of fields to update. Fields are specified relative to the endpoint group (e.g. `description`; \*not\* `intercept_endpoint_group.description`). See https://google.aip.dev/161 for more details. |

### `networksecurity.projects.locations.list`

- Versions: v1, v1beta1
- `GET https://networksecurity.googleapis.com/v1/{+name}/locations`
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

### `networksecurity.projects.locations.mirroringDeploymentGroups.create`

- Versions: v1, v1beta1
- `POST https://networksecurity.googleapis.com/v1/{+parent}/mirroringDeploymentGroups`
- Creates a deployment group in a given project and location. See https://google.aip.dev/133.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `MirroringDeploymentGroup`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource where this deployment group will be created. Format: projects/{project}/locations/{location} |
| `mirroringDeploymentGroupId` | query | string | yes | Required. The ID to use for the new deployment group, which will become the final component of the deployment group's resource name. |
| `requestId` | query | string | no | Optional. A unique identifier for this request. Must be a UUID4. This request is only idempotent if a `request_id` is provided. See https://google.aip.dev/155 for more details. |

### `networksecurity.projects.locations.mirroringDeploymentGroups.delete`

- Versions: v1, v1beta1
- `DELETE https://networksecurity.googleapis.com/v1/{+name}`
- Deletes a deployment group. See https://google.aip.dev/135.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The deployment group to delete. |
| `requestId` | query | string | no | Optional. A unique identifier for this request. Must be a UUID4. This request is only idempotent if a `request_id` is provided. See https://google.aip.dev/155 for more details. |

### `networksecurity.projects.locations.mirroringDeploymentGroups.get`

- Versions: v1, v1beta1
- `GET https://networksecurity.googleapis.com/v1/{+name}`
- Gets a specific deployment group. See https://google.aip.dev/131.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `MirroringDeploymentGroup`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the deployment group to retrieve. Format: projects/{project}/locations/{location}/mirroringDeploymentGroups/{mirroring_deployment_group} |

### `networksecurity.projects.locations.mirroringDeploymentGroups.list`

- Versions: v1, v1beta1
- `GET https://networksecurity.googleapis.com/v1/{+parent}/mirroringDeploymentGroups`
- Lists deployment groups in a given project and location. See https://google.aip.dev/132.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListMirroringDeploymentGroupsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent, which owns this collection of deployment groups. Example: `projects/123456789/locations/global`. See https://google.aip.dev/132 for more details. |
| `filter` | query | string | no | Optional. Filter expression. See https://google.aip.dev/160#filtering for more details. |
| `orderBy` | query | string | no | Optional. Sort expression. See https://google.aip.dev/132#ordering for more details. |
| `pageSize` | query | integer (int32) | no | Optional. Requested page size. Server may return fewer items than requested. If unspecified, server will pick an appropriate default. See https://google.aip.dev/158 for more details. |
| `pageToken` | query | string | no | Optional. A page token, received from a previous `ListMirroringDeploymentGroups` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListMirroringDeploymentGroups` must match the call that provided the page token. See https://google.aip.dev/158 for more details. |

### `networksecurity.projects.locations.mirroringDeploymentGroups.patch`

- Versions: v1, v1beta1
- `PATCH https://networksecurity.googleapis.com/v1/{+name}`
- Updates a deployment group. See https://google.aip.dev/134.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `MirroringDeploymentGroup`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Immutable. Identifier. The resource name of this deployment group, for example: `projects/123456789/locations/global/mirroringDeploymentGroups/my-dg`. See https://google.aip.dev/122 for more details. |
| `requestId` | query | string | no | Optional. A unique identifier for this request. Must be a UUID4. This request is only idempotent if a `request_id` is provided. See https://google.aip.dev/155 for more details. |
| `updateMask` | query | string (google-fieldmask) | no | Optional. The list of fields to update. Fields are specified relative to the deployment group (e.g. `description`; \*not\* `mirroring_deployment_group.description`). See https://google.aip.dev/161 for more details. |

### `networksecurity.projects.locations.mirroringDeployments.create`

- Versions: v1, v1beta1
- `POST https://networksecurity.googleapis.com/v1/{+parent}/mirroringDeployments`
- Creates a deployment in a given project and location. See https://google.aip.dev/133.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `MirroringDeployment`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource where this deployment will be created. Format: projects/{project}/locations/{location} |
| `mirroringDeploymentId` | query | string | yes | Required. The ID to use for the new deployment, which will become the final component of the deployment's resource name. |
| `requestId` | query | string | no | Optional. A unique identifier for this request. Must be a UUID4. This request is only idempotent if a `request_id` is provided. See https://google.aip.dev/155 for more details. |

### `networksecurity.projects.locations.mirroringDeployments.delete`

- Versions: v1, v1beta1
- `DELETE https://networksecurity.googleapis.com/v1/{+name}`
- Deletes a deployment. See https://google.aip.dev/135.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the resource |
| `requestId` | query | string | no | Optional. A unique identifier for this request. Must be a UUID4. This request is only idempotent if a `request_id` is provided. See https://google.aip.dev/155 for more details. |

### `networksecurity.projects.locations.mirroringDeployments.get`

- Versions: v1, v1beta1
- `GET https://networksecurity.googleapis.com/v1/{+name}`
- Gets a specific deployment. See https://google.aip.dev/131.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `MirroringDeployment`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the deployment to retrieve. Format: projects/{project}/locations/{location}/mirroringDeployments/{mirroring_deployment} |

### `networksecurity.projects.locations.mirroringDeployments.list`

- Versions: v1, v1beta1
- `GET https://networksecurity.googleapis.com/v1/{+parent}/mirroringDeployments`
- Lists deployments in a given project and location. See https://google.aip.dev/132.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListMirroringDeploymentsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent, which owns this collection of deployments. Example: `projects/123456789/locations/us-central1-a`. See https://google.aip.dev/132 for more details. |
| `filter` | query | string | no | Optional. Filter expression. See https://google.aip.dev/160#filtering for more details. |
| `orderBy` | query | string | no | Optional. Sort expression. See https://google.aip.dev/132#ordering for more details. |
| `pageSize` | query | integer (int32) | no | Optional. Requested page size. Server may return fewer items than requested. If unspecified, server will pick an appropriate default. See https://google.aip.dev/158 for more details. |
| `pageToken` | query | string | no | Optional. A page token, received from a previous `ListMirroringDeployments` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListMirroringDeployments` must match the call that provided the page token. See https://google.aip.dev/158 for more details. |

### `networksecurity.projects.locations.mirroringDeployments.patch`

- Versions: v1, v1beta1
- `PATCH https://networksecurity.googleapis.com/v1/{+name}`
- Updates a deployment. See https://google.aip.dev/134.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `MirroringDeployment`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Immutable. Identifier. The resource name of this deployment, for example: `projects/123456789/locations/us-central1-a/mirroringDeployments/my-dep`. See https://google.aip.dev/122 for more details. |
| `requestId` | query | string | no | Optional. A unique identifier for this request. Must be a UUID4. This request is only idempotent if a `request_id` is provided. See https://google.aip.dev/155 for more details. |
| `updateMask` | query | string (google-fieldmask) | no | Optional. The list of fields to update. Fields are specified relative to the deployment (e.g. `description`; \*not\* `mirroring_deployment.description`). See https://google.aip.dev/161 for more details. |

### `networksecurity.projects.locations.mirroringEndpointGroupAssociations.create`

- Versions: v1, v1beta1
- `POST https://networksecurity.googleapis.com/v1/{+parent}/mirroringEndpointGroupAssociations`
- Creates an association in a given project and location. See https://google.aip.dev/133.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `MirroringEndpointGroupAssociation`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource where this association will be created. Format: projects/{project}/locations/{location} |
| `mirroringEndpointGroupAssociationId` | query | string | no | Optional. The ID to use for the new association, which will become the final component of the endpoint group's resource name. If not provided, the server will generate a unique ID. |
| `requestId` | query | string | no | Optional. A unique identifier for this request. Must be a UUID4. This request is only idempotent if a `request_id` is provided. See https://google.aip.dev/155 for more details. |

### `networksecurity.projects.locations.mirroringEndpointGroupAssociations.delete`

- Versions: v1, v1beta1
- `DELETE https://networksecurity.googleapis.com/v1/{+name}`
- Deletes an association. See https://google.aip.dev/135.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The association to delete. |
| `requestId` | query | string | no | Optional. A unique identifier for this request. Must be a UUID4. This request is only idempotent if a `request_id` is provided. See https://google.aip.dev/155 for more details. |

### `networksecurity.projects.locations.mirroringEndpointGroupAssociations.get`

- Versions: v1, v1beta1
- `GET https://networksecurity.googleapis.com/v1/{+name}`
- Gets a specific association. See https://google.aip.dev/131.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `MirroringEndpointGroupAssociation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the association to retrieve. Format: projects/{project}/locations/{location}/mirroringEndpointGroupAssociations/{mirroring_endpoint_group_association} |

### `networksecurity.projects.locations.mirroringEndpointGroupAssociations.list`

- Versions: v1, v1beta1
- `GET https://networksecurity.googleapis.com/v1/{+parent}/mirroringEndpointGroupAssociations`
- Lists associations in a given project and location. See https://google.aip.dev/132.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListMirroringEndpointGroupAssociationsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent, which owns this collection of associations. Example: `projects/123456789/locations/global`. See https://google.aip.dev/132 for more details. |
| `filter` | query | string | no | Optional. Filter expression. See https://google.aip.dev/160#filtering for more details. |
| `orderBy` | query | string | no | Optional. Sort expression. See https://google.aip.dev/132#ordering for more details. |
| `pageSize` | query | integer (int32) | no | Optional. Requested page size. Server may return fewer items than requested. If unspecified, server will pick an appropriate default. See https://google.aip.dev/158 for more details. |
| `pageToken` | query | string | no | Optional. A page token, received from a previous `ListMirroringEndpointGroups` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListMirroringEndpointGroups` must match the call that provided the page token. See https://google.aip.dev/158 for more details. |

### `networksecurity.projects.locations.mirroringEndpointGroupAssociations.patch`

- Versions: v1, v1beta1
- `PATCH https://networksecurity.googleapis.com/v1/{+name}`
- Updates an association. See https://google.aip.dev/134.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `MirroringEndpointGroupAssociation`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Immutable. Identifier. The resource name of this endpoint group association, for example: `projects/123456789/locations/global/mirroringEndpointGroupAssociations/my-eg-association`. See https://google.aip.dev/122 for more details. |
| `requestId` | query | string | no | Optional. A unique identifier for this request. Must be a UUID4. This request is only idempotent if a `request_id` is provided. See https://google.aip.dev/155 for more details. |
| `updateMask` | query | string (google-fieldmask) | no | Optional. The list of fields to update. Fields are specified relative to the association (e.g. `description`; \*not\* `mirroring_endpoint_group_association.description`). See https://google.aip.dev/161 for more details. |

### `networksecurity.projects.locations.mirroringEndpointGroups.create`

- Versions: v1, v1beta1
- `POST https://networksecurity.googleapis.com/v1/{+parent}/mirroringEndpointGroups`
- Creates an endpoint group in a given project and location. See https://google.aip.dev/133.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `MirroringEndpointGroup`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource where this endpoint group will be created. Format: projects/{project}/locations/{location} |
| `mirroringEndpointGroupId` | query | string | yes | Required. The ID to use for the endpoint group, which will become the final component of the endpoint group's resource name. |
| `requestId` | query | string | no | Optional. A unique identifier for this request. Must be a UUID4. This request is only idempotent if a `request_id` is provided. See https://google.aip.dev/155 for more details. |

### `networksecurity.projects.locations.mirroringEndpointGroups.delete`

- Versions: v1, v1beta1
- `DELETE https://networksecurity.googleapis.com/v1/{+name}`
- Deletes an endpoint group. See https://google.aip.dev/135.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The endpoint group to delete. |
| `requestId` | query | string | no | Optional. A unique identifier for this request. Must be a UUID4. This request is only idempotent if a `request_id` is provided. See https://google.aip.dev/155 for more details. |

### `networksecurity.projects.locations.mirroringEndpointGroups.get`

- Versions: v1, v1beta1
- `GET https://networksecurity.googleapis.com/v1/{+name}`
- Gets a specific endpoint group. See https://google.aip.dev/131.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `MirroringEndpointGroup`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the endpoint group to retrieve. Format: projects/{project}/locations/{location}/mirroringEndpointGroups/{mirroring_endpoint_group} |

### `networksecurity.projects.locations.mirroringEndpointGroups.list`

- Versions: v1, v1beta1
- `GET https://networksecurity.googleapis.com/v1/{+parent}/mirroringEndpointGroups`
- Lists endpoint groups in a given project and location. See https://google.aip.dev/132.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListMirroringEndpointGroupsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent, which owns this collection of endpoint groups. Example: `projects/123456789/locations/global`. See https://google.aip.dev/132 for more details. |
| `filter` | query | string | no | Optional. Filter expression. See https://google.aip.dev/160#filtering for more details. |
| `orderBy` | query | string | no | Optional. Sort expression. See https://google.aip.dev/132#ordering for more details. |
| `pageSize` | query | integer (int32) | no | Optional. Requested page size. Server may return fewer items than requested. If unspecified, server will pick an appropriate default. See https://google.aip.dev/158 for more details. |
| `pageToken` | query | string | no | Optional. A page token, received from a previous `ListMirroringEndpointGroups` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListMirroringEndpointGroups` must match the call that provided the page token. See https://google.aip.dev/158 for more details. |

### `networksecurity.projects.locations.mirroringEndpointGroups.patch`

- Versions: v1, v1beta1
- `PATCH https://networksecurity.googleapis.com/v1/{+name}`
- Updates an endpoint group. See https://google.aip.dev/134.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `MirroringEndpointGroup`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Immutable. Identifier. The resource name of this endpoint group, for example: `projects/123456789/locations/global/mirroringEndpointGroups/my-eg`. See https://google.aip.dev/122 for more details. |
| `requestId` | query | string | no | Optional. A unique identifier for this request. Must be a UUID4. This request is only idempotent if a `request_id` is provided. See https://google.aip.dev/155 for more details. |
| `updateMask` | query | string (google-fieldmask) | no | Optional. The list of fields to update. Fields are specified relative to the endpoint group (e.g. `description`; \*not\* `mirroring_endpoint_group.description`). See https://google.aip.dev/161 for more details. |

### `networksecurity.projects.locations.operations.cancel`

- Versions: v1, v1beta1
- `POST https://networksecurity.googleapis.com/v1/{+name}:cancel`
- Starts asynchronous cancellation on a long-running operation. The server makes a best effort to cancel the operation, but success is not guaranteed. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. Clients can use Operations.GetOperation or other methods to check whether the cancellation succeeded or whether the operation completed despite cancellation. On successful cancellation, the operation is not deleted; instead, it becomes an operation with an Operation.error value with a google.rpc.Status.code of `1`, corresponding to `Code.CANCELLED`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `CancelOperationRequest`; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource to be cancelled. |

### `networksecurity.projects.locations.operations.delete`

- Versions: v1, v1beta1
- `DELETE https://networksecurity.googleapis.com/v1/{+name}`
- Deletes a long-running operation. This method indicates that the client is no longer interested in the operation result. It does not cancel the operation. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource to be deleted. |

### `networksecurity.projects.locations.operations.get`

- Versions: v1, v1beta1
- `GET https://networksecurity.googleapis.com/v1/{+name}`
- Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource. |

### `networksecurity.projects.locations.operations.list`

- Versions: v1, v1beta1
- `GET https://networksecurity.googleapis.com/v1/{+name}/operations`
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

### `networksecurity.projects.locations.rateLimitPolicies.create`

- Versions: v1beta1
- `POST https://networksecurity.googleapis.com/v1beta1/{+parent}/rateLimitPolicies`
- Creates a new `RateLimitPolicy` in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `RateLimitPolicy`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Specifies the value for parent. |
| `rateLimitPolicyId` | query | string | yes | Required. Specifies the ID of the requesting object. If auto-generating Id server-side, remove this field and rate_limit_policy_id from the method_signature of Create RPC |
| `requestId` | query | string | no | Optional. Specifies an optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `networksecurity.projects.locations.rateLimitPolicies.delete`

- Versions: v1beta1
- `DELETE https://networksecurity.googleapis.com/v1beta1/{+name}`
- Deletes a single `RateLimitPolicy`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Specifies the name of the resource. |
| `requestId` | query | string | no | Optional. Specifies an optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `networksecurity.projects.locations.rateLimitPolicies.get`

- Versions: v1beta1
- `GET https://networksecurity.googleapis.com/v1beta1/{+name}`
- Gets details of a single `RateLimitPolicy`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `RateLimitPolicy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Specifies the name of the resource. |

### `networksecurity.projects.locations.rateLimitPolicies.list`

- Versions: v1beta1
- `GET https://networksecurity.googleapis.com/v1beta1/{+parent}/rateLimitPolicies`
- Lists `RateLimitPolicy` resources in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListRateLimitPoliciesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Specifies the parent value for `ListRateLimitPoliciesRequest`. |
| `filter` | query | string | no | Optional. Filters results. |
| `orderBy` | query | string | no | Optional. Provides a hint for how to order the results. |
| `pageSize` | query | integer (int32) | no | Optional. Specifies the requested page size. Server may return fewer items than requested. If unspecified, server will pick an appropriate default. |
| `pageToken` | query | string | no | Optional. Identifies a token for a page of results the server should return. |

### `networksecurity.projects.locations.rateLimitPolicies.patch`

- Versions: v1beta1
- `PATCH https://networksecurity.googleapis.com/v1beta1/{+name}`
- Updates the parameters of a single `RateLimitPolicy`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `RateLimitPolicy`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. Specifies the name of the `RateLimitPolicy` resource. |
| `requestId` | query | string | no | Optional. Specifies an optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `updateMask` | query | string (google-fieldmask) | no | Optional. Specifies the fields to be overwritten in the `RateLimitPolicy` resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it is in the mask. If the user does not provide a mask then all fields present in the request will be overwritten. |

### `networksecurity.projects.locations.sacAttachments.create`

- Versions: v1, v1beta1
- `POST https://networksecurity.googleapis.com/v1/{+parent}/sacAttachments`
- Creates a new SACAttachment in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `SACAttachment`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent, in the form `projects/{project}/locations/{location}`. |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `sacAttachmentId` | query | string | yes | Required. ID of the created attachment. The ID must be 1-63 characters long, and comply with RFC1035. Specifically, it must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash. |

### `networksecurity.projects.locations.sacAttachments.delete`

- Versions: v1, v1beta1
- `DELETE https://networksecurity.googleapis.com/v1/{+name}`
- Deletes the specified attachment.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the resource, in the form `projects/{project}/locations/{location}/sacAttachments/{sac_attachment}`. |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `networksecurity.projects.locations.sacAttachments.get`

- Versions: v1, v1beta1
- `GET https://networksecurity.googleapis.com/v1/{+name}`
- Returns the specified attachment.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `SACAttachment`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the resource, in the form `projects/{project}/locations/{location}/sacAttachments/{sac_attachment}`. |

### `networksecurity.projects.locations.sacAttachments.list`

- Versions: v1, v1beta1
- `GET https://networksecurity.googleapis.com/v1/{+parent}/sacAttachments`
- Lists SACAttachments in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListSACAttachmentsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent, in the form `projects/{project}/locations/{location}`. |
| `filter` | query | string | no | Optional. An expression that filters the list of results. |
| `orderBy` | query | string | no | Optional. Sort the results by a certain order. |
| `pageSize` | query | integer (int32) | no | Optional. Requested page size. Server may return fewer items than requested. If unspecified, server will pick an appropriate default. |
| `pageToken` | query | string | no | Optional. A token identifying a page of results the server should return. |

### `networksecurity.projects.locations.sacRealms.create`

- Versions: v1, v1beta1
- `POST https://networksecurity.googleapis.com/v1/{+parent}/sacRealms`
- Creates a new SACRealm in a given project.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `SACRealm`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent, in the form `projects/{project}/locations/global`. |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `sacRealmId` | query | string | yes | Required. ID of the created realm. The ID must be 1-63 characters long, and comply with RFC1035. Specifically, it must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?` which means the first character must be a lowercase letter, and all following characters must be a dash, lowercase letter, or digit, except the last character, which cannot be a dash. |

### `networksecurity.projects.locations.sacRealms.delete`

- Versions: v1, v1beta1
- `DELETE https://networksecurity.googleapis.com/v1/{+name}`
- Deletes the specified realm.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the resource, in the form `projects/{project}/locations/global/sacRealms/{sacRealm}`. |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `networksecurity.projects.locations.sacRealms.get`

- Versions: v1, v1beta1
- `GET https://networksecurity.googleapis.com/v1/{+name}`
- Returns the specified realm.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `SACRealm`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the resource, in the form `projects/{project}/locations/global/sacRealms/{sacRealm}`. |

### `networksecurity.projects.locations.sacRealms.list`

- Versions: v1, v1beta1
- `GET https://networksecurity.googleapis.com/v1/{+parent}/sacRealms`
- Lists SACRealms in a given project.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListSACRealmsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent, in the form `projects/{project}/locations/global`. |
| `filter` | query | string | no | Optional. An expression that filters the list of results. |
| `orderBy` | query | string | no | Optional. Sort the results by a certain order. |
| `pageSize` | query | integer (int32) | no | Optional. Requested page size. Server may return fewer items than requested. If unspecified, server will pick an appropriate default. |
| `pageToken` | query | string | no | Optional. A token identifying a page of results the server should return. |

### `networksecurity.projects.locations.securityProfileGroups.create`

- Versions: v1, v1beta1
- `POST https://networksecurity.googleapis.com/v1/{+parent}/securityProfileGroups`
- Creates a new security profile group in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `SecurityProfileGroup`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource of the `SecurityProfileGroup`. Format: `organizations/{organization}/locations/{location}` or `projects/{project}/locations/{location}`. |
| `securityProfileGroupId` | query | string | yes | Required. Short name of the `SecurityProfileGroup` resource to be created. This value must be 1 to 63 characters long, contain only lowercase letters, numbers, and hyphens, and must not start with a number. For example, `security-profile-group1`. |

### `networksecurity.projects.locations.securityProfileGroups.delete`

- Versions: v1, v1beta1
- `DELETE https://networksecurity.googleapis.com/v1/{+name}`
- Deletes a single security profile group.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the `SecurityProfileGroup` to delete. Format: `organizations/{organization}/locations/{location}/securityProfileGroups/{security_profile_group}` or `projects/{project}/locations/{location}/securityProfileGroups/{security_profile_group}`. |
| `etag` | query | string | no | Optional. If the client-provided `etag` is out of date, the delete request returns an `ABORTED` error. |

### `networksecurity.projects.locations.securityProfileGroups.get`

- Versions: v1, v1beta1
- `GET https://networksecurity.googleapis.com/v1/{+name}`
- Gets details of a single security profile group.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `SecurityProfileGroup`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the `SecurityProfileGroup` to get. Format: `organizations/{organization}/locations/{location}/securityProfileGroups/{security_profile_group}` or `projects/{project}/locations/{location}/securityProfileGroups/{security_profile_group}`. |

### `networksecurity.projects.locations.securityProfileGroups.list`

- Versions: v1, v1beta1
- `GET https://networksecurity.googleapis.com/v1/{+parent}/securityProfileGroups`
- Lists security profile group resources in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListSecurityProfileGroupsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The project or organization and location from which the `SecurityProfileGroup` resources are listed. Format: `organizations/{organization}/locations/{location}` or `projects/{project}/locations/{location}`. |
| `pageSize` | query | integer (int32) | no | Optional. Maximum number of `SecurityProfileGroup` resources to return per call. The maximum value is 1000; values above 1000 are coerced to 1000. If unspecified, the server picks an appropriate default. |
| `pageToken` | query | string | no | Optional. A page token, received from a previous `ListSecurityProfileGroups` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListSecurityProfileGroups` must match the call that provided the page token. |

### `networksecurity.projects.locations.securityProfileGroups.patch`

- Versions: v1, v1beta1
- `PATCH https://networksecurity.googleapis.com/v1/{+name}`
- Updates the parameters of a single security profile group.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `SecurityProfileGroup`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Immutable. Identifier. Name of the `SecurityProfileGroup` resource. Format: `organizations/{organization}/locations/{location}/securityProfileGroups/{security_profile_group}` or `projects/{project}/locations/{location}/securityProfileGroups/{security_profile_group}`. |
| `updateMask` | query | string (google-fieldmask) | yes | Required. Field mask is used to specify the fields to be overwritten in the `SecurityProfileGroup` resource by the update. The fields specified in the `update_mask` are relative to the resource, not the full request. A field is overwritten if it is in the mask. |

### `networksecurity.projects.locations.securityProfiles.create`

- Versions: v1, v1beta1
- `POST https://networksecurity.googleapis.com/v1/{+parent}/securityProfiles`
- Creates a new security profile in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `SecurityProfile`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource of the `SecurityProfile`. Format: `organizations/{organization}/locations/{location}` or `projects/{project}/locations/{location}`. |
| `securityProfileId` | query | string | yes | Required. Short name of the `SecurityProfile` resource to be created. This value must be 1 to 63 characters long, contain only lowercase letters, numbers, and hyphens, and must not start with a number. For example, `security-profile1`. |

### `networksecurity.projects.locations.securityProfiles.delete`

- Versions: v1, v1beta1
- `DELETE https://networksecurity.googleapis.com/v1/{+name}`
- Deletes a single security profile.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the `SecurityProfile` to delete. Format: `organizations/{organization}/locations/{location}/securityProfiles/{security_profile}` or `projects/{project}/locations/{location}/securityProfiles/{security_profile}`. |
| `etag` | query | string | no | Optional. If the client-provided `etag` is out of date, the delete request returns an `ABORTED` error. |

### `networksecurity.projects.locations.securityProfiles.get`

- Versions: v1, v1beta1
- `GET https://networksecurity.googleapis.com/v1/{+name}`
- Gets details of a single security profile.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `SecurityProfile`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the `SecurityProfile` to get. Format: `organizations/{organization}/locations/{location}/securityProfiles/{security_profile}` or `projects/{project}/locations/{location}/securityProfiles/{security_profile}`. |

### `networksecurity.projects.locations.securityProfiles.list`

- Versions: v1, v1beta1
- `GET https://networksecurity.googleapis.com/v1/{+parent}/securityProfiles`
- Lists security profiles in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListSecurityProfilesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The project or organization and location from which the `SecurityProfile` resources are listed. Format: `organizations/{organization}/locations/{location}` or `projects/{project}/locations/{location}`. |
| `pageSize` | query | integer (int32) | no | Optional. Maximum number of `SecurityProfile` resources to return per call. The maximum value is 1000; values above 1000 are coerced to 1000. If unspecified, the server picks an appropriate default. |
| `pageToken` | query | string | no | Optional. A page token, received from a previous `ListSecurityProfiles` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListSecurityProfiles` must match the call that provided the page token. |

### `networksecurity.projects.locations.securityProfiles.patch`

- Versions: v1, v1beta1
- `PATCH https://networksecurity.googleapis.com/v1/{+name}`
- Updates the parameters of a single security profile.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `SecurityProfile`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Immutable. Identifier. Name of the `SecurityProfile` resource. Format: `organizations/{organization}/locations/{location}/securityProfiles/{security_profile}` or `projects/{project}/locations/{location}/securityProfiles/{security_profile}`. |
| `updateMask` | query | string (google-fieldmask) | yes | Required. Field mask is used to specify the fields to be overwritten in the `SecurityProfile` resource by the update. The fields specified in the `update_mask` are relative to the resource, not the full request. A field is overwritten if it is in the mask. |

### `networksecurity.projects.locations.serverTlsPolicies.create`

- Versions: v1, v1beta1
- `POST https://networksecurity.googleapis.com/v1/{+parent}/serverTlsPolicies`
- Creates a new ServerTlsPolicy in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `ServerTlsPolicy`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource of the ServerTlsPolicy. Must be in the format `projects/*/locations/{location}`. |
| `serverTlsPolicyId` | query | string | yes | Required. Short name of the ServerTlsPolicy resource to be created. This value should be 1-63 characters long, containing only letters, numbers, hyphens, and underscores, and should not start with a number. E.g. "server_mtls_policy". |

### `networksecurity.projects.locations.serverTlsPolicies.delete`

- Versions: v1, v1beta1
- `DELETE https://networksecurity.googleapis.com/v1/{+name}`
- Deletes a single ServerTlsPolicy.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. A name of the ServerTlsPolicy to delete. Must be in the format `projects/*/locations/{location}/serverTlsPolicies/*`. |

### `networksecurity.projects.locations.serverTlsPolicies.get`

- Versions: v1, v1beta1
- `GET https://networksecurity.googleapis.com/v1/{+name}`
- Gets details of a single ServerTlsPolicy.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ServerTlsPolicy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. A name of the ServerTlsPolicy to get. Must be in the format `projects/*/locations/{location}/serverTlsPolicies/*`. |

### `networksecurity.projects.locations.serverTlsPolicies.getIamPolicy`

- Versions: v1, v1beta1
- `GET https://networksecurity.googleapis.com/v1/{+resource}:getIamPolicy`
- Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleIamV1Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |
| `options.requestedPolicyVersion` | query | integer (int32) | no | Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |

### `networksecurity.projects.locations.serverTlsPolicies.list`

- Versions: v1, v1beta1
- `GET https://networksecurity.googleapis.com/v1/{+parent}/serverTlsPolicies`
- Lists ServerTlsPolicies in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListServerTlsPoliciesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The project and location from which the ServerTlsPolicies should be listed, specified in the format `projects/*/locations/{location}`. |
| `pageSize` | query | integer (int32) | no | Maximum number of ServerTlsPolicies to return per call. |
| `pageToken` | query | string | no | The value returned by the last `ListServerTlsPoliciesResponse` Indicates that this is a continuation of a prior `ListServerTlsPolicies` call, and that the system should return the next page of data. |
| `returnPartialSuccess` | query | boolean | no | Optional. Setting this field to `true` will opt the request into returning the resources that are reachable, and into including the names of those that were unreachable in the \[ListServerTlsPoliciesResponse.unreachable\] field. This can only be `true` when reading across collections e.g. when `parent` is set to `"projects/example/locations/-"`. |

### `networksecurity.projects.locations.serverTlsPolicies.patch`

- Versions: v1, v1beta1
- `PATCH https://networksecurity.googleapis.com/v1/{+name}`
- Updates the parameters of a single ServerTlsPolicy.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `ServerTlsPolicy`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the ServerTlsPolicy resource. It matches the pattern `projects/*/locations/{location}/serverTlsPolicies/{server_tls_policy}` |
| `updateMask` | query | string (google-fieldmask) | no | Optional. Field mask is used to specify the fields to be overwritten in the ServerTlsPolicy resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it is in the mask. If the user does not provide a mask then all fields will be overwritten. |

### `networksecurity.projects.locations.serverTlsPolicies.setIamPolicy`

- Versions: v1, v1beta1
- `POST https://networksecurity.googleapis.com/v1/{+resource}:setIamPolicy`
- Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleIamV1SetIamPolicyRequest`; Response: `GoogleIamV1Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `networksecurity.projects.locations.serverTlsPolicies.testIamPermissions`

- Versions: v1, v1beta1
- `POST https://networksecurity.googleapis.com/v1/{+resource}:testIamPermissions`
- Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleIamV1TestIamPermissionsRequest`; Response: `GoogleIamV1TestIamPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `networksecurity.projects.locations.tlsInspectionPolicies.create`

- Versions: v1, v1beta1
- `POST https://networksecurity.googleapis.com/v1/{+parent}/tlsInspectionPolicies`
- Creates a new TlsInspectionPolicy in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `TlsInspectionPolicy`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource of the TlsInspectionPolicy. Must be in the format `projects/{project}/locations/{location}`. |
| `tlsInspectionPolicyId` | query | string | yes | Required. Short name of the TlsInspectionPolicy resource to be created. This value should be 1-63 characters long, containing only letters, numbers, hyphens, and underscores, and should not start with a number. E.g. "tls_inspection_policy1". |

### `networksecurity.projects.locations.tlsInspectionPolicies.delete`

- Versions: v1, v1beta1
- `DELETE https://networksecurity.googleapis.com/v1/{+name}`
- Deletes a single TlsInspectionPolicy.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. A name of the TlsInspectionPolicy to delete. Must be in the format `projects/{project}/locations/{location}/tlsInspectionPolicies/{tls_inspection_policy}`. |
| `force` | query | boolean | no | If set to true, any rules for this TlsInspectionPolicy will also be deleted. (Otherwise, the request will only work if the TlsInspectionPolicy has no rules.) |

### `networksecurity.projects.locations.tlsInspectionPolicies.get`

- Versions: v1, v1beta1
- `GET https://networksecurity.googleapis.com/v1/{+name}`
- Gets details of a single TlsInspectionPolicy.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `TlsInspectionPolicy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. A name of the TlsInspectionPolicy to get. Must be in the format `projects/{project}/locations/{location}/tlsInspectionPolicies/{tls_inspection_policy}`. |

### `networksecurity.projects.locations.tlsInspectionPolicies.list`

- Versions: v1, v1beta1
- `GET https://networksecurity.googleapis.com/v1/{+parent}/tlsInspectionPolicies`
- Lists TlsInspectionPolicies in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListTlsInspectionPoliciesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The project and location from which the TlsInspectionPolicies should be listed, specified in the format `projects/{project}/locations/{location}`. |
| `pageSize` | query | integer (int32) | no | Maximum number of TlsInspectionPolicies to return per call. |
| `pageToken` | query | string | no | The value returned by the last 'ListTlsInspectionPoliciesResponse' Indicates that this is a continuation of a prior 'ListTlsInspectionPolicies' call, and that the system should return the next page of data. |

### `networksecurity.projects.locations.tlsInspectionPolicies.patch`

- Versions: v1, v1beta1
- `PATCH https://networksecurity.googleapis.com/v1/{+name}`
- Updates the parameters of a single TlsInspectionPolicy.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `TlsInspectionPolicy`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the resource. Name is of the form projects/{project}/locations/{location}/tlsInspectionPolicies/{tls_inspection_policy} tls_inspection_policy should match the pattern:(^\[a-z\](\[a-z0-9-\]{0,61}\[a-z0-9\])?$). |
| `updateMask` | query | string (google-fieldmask) | no | Optional. Field mask is used to specify the fields to be overwritten in the TlsInspectionPolicy resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it is in the mask. If the user does not provide a mask then all fields will be overwritten. |

### `networksecurity.projects.locations.urlLists.create`

- Versions: v1, v1beta1
- `POST https://networksecurity.googleapis.com/v1/{+parent}/urlLists`
- Creates a new UrlList in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `UrlList`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource of the UrlList. Must be in the format `projects/*/locations/{location}`. |
| `urlListId` | query | string | yes | Required. Short name of the UrlList resource to be created. This value should be 1-63 characters long, containing only letters, numbers, hyphens, and underscores, and should not start with a number. E.g. "url_list". |

### `networksecurity.projects.locations.urlLists.delete`

- Versions: v1, v1beta1
- `DELETE https://networksecurity.googleapis.com/v1/{+name}`
- Deletes a single UrlList.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. A name of the UrlList to delete. Must be in the format `projects/*/locations/{location}/urlLists/*`. |

### `networksecurity.projects.locations.urlLists.get`

- Versions: v1, v1beta1
- `GET https://networksecurity.googleapis.com/v1/{+name}`
- Gets details of a single UrlList.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `UrlList`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. A name of the UrlList to get. Must be in the format `projects/*/locations/{location}/urlLists/*`. |

### `networksecurity.projects.locations.urlLists.list`

- Versions: v1, v1beta1
- `GET https://networksecurity.googleapis.com/v1/{+parent}/urlLists`
- Lists UrlLists in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListUrlListsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The project and location from which the UrlLists should be listed, specified in the format `projects/{project}/locations/{location}`. |
| `pageSize` | query | integer (int32) | no | Maximum number of UrlLists to return per call. |
| `pageToken` | query | string | no | The value returned by the last `ListUrlListsResponse` Indicates that this is a continuation of a prior `ListUrlLists` call, and that the system should return the next page of data. |

### `networksecurity.projects.locations.urlLists.patch`

- Versions: v1, v1beta1
- `PATCH https://networksecurity.googleapis.com/v1/{+name}`
- Updates the parameters of a single UrlList.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `UrlList`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the resource provided by the user. Name is of the form projects/{project}/locations/{location}/urlLists/{url_list} url_list should match the pattern:(^\[a-z\](\[a-z0-9-\]{0,61}\[a-z0-9\])?$). |
| `updateMask` | query | string (google-fieldmask) | no | Optional. Field mask is used to specify the fields to be overwritten in the UrlList resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it is in the mask. If the user does not provide a mask then all fields will be overwritten. |

### Example request skeleton

Generated from the Discovery entry of `networksecurity.projects.locations.list` (not in the official docs); replace the `{...}` path variables (URL-encode query values):

```bash
curl -X GET \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  "https://networksecurity.googleapis.com/v1/{+name}/locations"
```

## Notes

- Generated from the Discovery document(s) v1, v1beta1 of `networksecurity` (retrieved 2026-11-14). Resources on this page: projects.
- The Required column is `yes` for path variables and required parameters, and `conditional` when the description says "Required if ..." (mutually exclusive alternatives), when a `parent.child` parameter is required only inside an optional parent message or one branch of a oneof. Path variables are `yes` unless a note below names an alternative route without them.
- Message schemas (the request and response types named above) are listed under `references/rest-schemas/networksecurity/`; they are the `schemas` section of the Discovery documents in Source.
- Source: https://networksecurity.googleapis.com/$discovery/rest?version=v1, https://networksecurity.googleapis.com/$discovery/rest?version=v1beta1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
