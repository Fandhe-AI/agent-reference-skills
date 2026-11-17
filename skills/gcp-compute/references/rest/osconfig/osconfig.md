---
source: https://osconfig.googleapis.com/$discovery/rest?version=v2
---

# OS Config API REST API (osconfig)

## Signature / Usage

Base URL: `https://osconfig.googleapis.com`. Methods are listed by `id`; the `Versions` line shows which API versions define the method (preferred: v2).

### `osconfig.folders.locations.global.policyOrchestrators.create`

- Versions: v2, v2beta
- `POST https://osconfig.googleapis.com/v2/{+parent}/policyOrchestrators`
- Creates a new policy orchestrator under the given folder resource. `name` field of the given orchestrator are ignored and instead replaced by a product of `parent` and `policy_orchestrator_id`. Orchestrator state field might be only set to `ACTIVE`, `STOPPED` or omitted (in which case, the created resource will be in `ACTIVE` state anyway).
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleCloudOsconfigV2__PolicyOrchestrator`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource name in the form of: \* `organizations/{organization_id}/locations/global` \* `folders/{folder_id}/locations/global` \* `projects/{project_id_or_number}/locations/global` |
| `policyOrchestratorId` | query | string | yes | Required. The logical identifier of the policy orchestrator, with the following restrictions: \* Must contain only lowercase letters, numbers, and hyphens. \* Must start with a letter. \* Must be between 1-63 characters. \* Must end with a number or a letter. \* Must be unique within the parent. |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `osconfig.folders.locations.global.policyOrchestrators.delete`

- Versions: v2, v2beta
- `DELETE https://osconfig.googleapis.com/v2/{+name}`
- Deletes an existing policy orchestrator resource, parented by a folder.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the resource to be deleted. |
| `etag` | query | string | no | Optional. The current etag of the policy orchestrator. If an etag is provided and does not match the current etag of the policy orchestrator, deletion will be blocked and an ABORTED error will be returned. |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `osconfig.folders.locations.global.policyOrchestrators.get`

- Versions: v2, v2beta
- `GET https://osconfig.googleapis.com/v2/{+name}`
- Retrieves an existing policy orchestrator, parented by a folder.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudOsconfigV2__PolicyOrchestrator`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name. |

### `osconfig.folders.locations.global.policyOrchestrators.list`

- Versions: v2, v2beta
- `GET https://osconfig.googleapis.com/v2/{+parent}/policyOrchestrators`
- Lists the policy orchestrators under the given parent folder resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudOsconfigV2__ListPolicyOrchestratorsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource name. |
| `filter` | query | string | no | Optional. Filtering results |
| `orderBy` | query | string | no | Optional. Hint for how to order the results |
| `pageSize` | query | integer (int32) | no | Optional. Requested page size. Server may return fewer items than requested. If unspecified, server will pick an appropriate default. |
| `pageToken` | query | string | no | Optional. A token identifying a page of results the server should return. |

### `osconfig.folders.locations.global.policyOrchestrators.patch`

- Versions: v2, v2beta
- `PATCH https://osconfig.googleapis.com/v2/{+name}`
- Updates an existing policy orchestrator, parented by a folder.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleCloudOsconfigV2__PolicyOrchestrator`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Immutable. Identifier. In the following format: \* `organizations/{organization_id}/locations/global/policyOrchestrators/{orchestrator_id}` \* `folders/{folder_id}/locations/global/policyOrchestrators/{orchestrator_id}` \* `projects/{project_id_or_number}/locations/global/policyOrchestrators/{orchestrator_id}` |
| `updateMask` | query | string (google-fieldmask) | no | Optional. The list of fields to merge into the existing policy orchestrator. A special \["\*"\] field mask can be used to simply replace the entire resource. Otherwise, for all paths referenced in the mask, following merge rules are used: \* output only fields are ignored, \* primitive fields are replaced, \* repeated fields are replaced, \* map fields are merged key by key, \* message fields are cleared if not set in the request, otherwise they are merged recursively (in particular - message fields set to an empty message has no side effects) If field mask (or its paths) is not specified, it is automatically inferred from the request using following rules: \* primitive fields are listed, if set to a non-default value (as there is no way to distinguish between default and unset value), \* map and repeated fields are listed, \* `google.protobuf.Any` fields are listed, \* other message fields are traversed recursively. Note: implicit mask does not allow clearing fields. |

### `osconfig.folders.locations.operations.cancel`

- Versions: v2, v2beta
- `POST https://osconfig.googleapis.com/v2/{+name}:cancel`
- Starts asynchronous cancellation on a long-running operation. The server makes a best effort to cancel the operation, but success is not guaranteed. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. Clients can use Operations.GetOperation or other methods to check whether the cancellation succeeded or whether the operation completed despite cancellation. On successful cancellation, the operation is not deleted; instead, it becomes an operation with an Operation.error value with a google.rpc.Status.code of `1`, corresponding to `Code.CANCELLED`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `CancelOperationRequest`; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource to be cancelled. |

### `osconfig.folders.locations.operations.delete`

- Versions: v2, v2beta
- `DELETE https://osconfig.googleapis.com/v2/{+name}`
- Deletes a long-running operation. This method indicates that the client is no longer interested in the operation result. It does not cancel the operation. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource to be deleted. |

### `osconfig.folders.locations.operations.get`

- Versions: v2, v2beta
- `GET https://osconfig.googleapis.com/v2/{+name}`
- Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource. |

### `osconfig.folders.locations.operations.list`

- Versions: v2, v2beta
- `GET https://osconfig.googleapis.com/v2/{+name}/operations`
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

### `osconfig.organizations.locations.global.policyOrchestrators.create`

- Versions: v2, v2beta
- `POST https://osconfig.googleapis.com/v2/{+parent}/policyOrchestrators`
- Creates a new policy orchestrator under the given organizations resource. `name` field of the given orchestrator are ignored and instead replaced by a product of `parent` and `policy_orchestrator_id`. Orchestrator state field might be only set to `ACTIVE`, `STOPPED` or omitted (in which case, the created resource will be in `ACTIVE` state anyway).
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleCloudOsconfigV2__PolicyOrchestrator`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource name in the form of: \* `organizations/{organization_id}/locations/global` \* `folders/{folder_id}/locations/global` \* `projects/{project_id_or_number}/locations/global` |
| `policyOrchestratorId` | query | string | yes | Required. The logical identifier of the policy orchestrator, with the following restrictions: \* Must contain only lowercase letters, numbers, and hyphens. \* Must start with a letter. \* Must be between 1-63 characters. \* Must end with a number or a letter. \* Must be unique within the parent. |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `osconfig.organizations.locations.global.policyOrchestrators.delete`

- Versions: v2, v2beta
- `DELETE https://osconfig.googleapis.com/v2/{+name}`
- Deletes an existing policy orchestrator resource, parented by an organization.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the resource to be deleted. |
| `etag` | query | string | no | Optional. The current etag of the policy orchestrator. If an etag is provided and does not match the current etag of the policy orchestrator, deletion will be blocked and an ABORTED error will be returned. |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `osconfig.organizations.locations.global.policyOrchestrators.get`

- Versions: v2, v2beta
- `GET https://osconfig.googleapis.com/v2/{+name}`
- Retrieves an existing policy orchestrator, parented by an organization.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudOsconfigV2__PolicyOrchestrator`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name. |

### `osconfig.organizations.locations.global.policyOrchestrators.list`

- Versions: v2, v2beta
- `GET https://osconfig.googleapis.com/v2/{+parent}/policyOrchestrators`
- Lists the policy orchestrators under the given parent organization resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudOsconfigV2__ListPolicyOrchestratorsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource name. |
| `filter` | query | string | no | Optional. Filtering results |
| `orderBy` | query | string | no | Optional. Hint for how to order the results |
| `pageSize` | query | integer (int32) | no | Optional. Requested page size. Server may return fewer items than requested. If unspecified, server will pick an appropriate default. |
| `pageToken` | query | string | no | Optional. A token identifying a page of results the server should return. |

### `osconfig.organizations.locations.global.policyOrchestrators.patch`

- Versions: v2, v2beta
- `PATCH https://osconfig.googleapis.com/v2/{+name}`
- Updates an existing policy orchestrator, parented by an organization.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleCloudOsconfigV2__PolicyOrchestrator`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Immutable. Identifier. In the following format: \* `organizations/{organization_id}/locations/global/policyOrchestrators/{orchestrator_id}` \* `folders/{folder_id}/locations/global/policyOrchestrators/{orchestrator_id}` \* `projects/{project_id_or_number}/locations/global/policyOrchestrators/{orchestrator_id}` |
| `updateMask` | query | string (google-fieldmask) | no | Optional. The list of fields to merge into the existing policy orchestrator. A special \["\*"\] field mask can be used to simply replace the entire resource. Otherwise, for all paths referenced in the mask, following merge rules are used: \* output only fields are ignored, \* primitive fields are replaced, \* repeated fields are replaced, \* map fields are merged key by key, \* message fields are cleared if not set in the request, otherwise they are merged recursively (in particular - message fields set to an empty message has no side effects) If field mask (or its paths) is not specified, it is automatically inferred from the request using following rules: \* primitive fields are listed, if set to a non-default value (as there is no way to distinguish between default and unset value), \* map and repeated fields are listed, \* `google.protobuf.Any` fields are listed, \* other message fields are traversed recursively. Note: implicit mask does not allow clearing fields. |

### `osconfig.organizations.locations.operations.cancel`

- Versions: v2, v2beta
- `POST https://osconfig.googleapis.com/v2/{+name}:cancel`
- Starts asynchronous cancellation on a long-running operation. The server makes a best effort to cancel the operation, but success is not guaranteed. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. Clients can use Operations.GetOperation or other methods to check whether the cancellation succeeded or whether the operation completed despite cancellation. On successful cancellation, the operation is not deleted; instead, it becomes an operation with an Operation.error value with a google.rpc.Status.code of `1`, corresponding to `Code.CANCELLED`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `CancelOperationRequest`; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource to be cancelled. |

### `osconfig.organizations.locations.operations.delete`

- Versions: v2, v2beta
- `DELETE https://osconfig.googleapis.com/v2/{+name}`
- Deletes a long-running operation. This method indicates that the client is no longer interested in the operation result. It does not cancel the operation. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource to be deleted. |

### `osconfig.organizations.locations.operations.get`

- Versions: v2, v2beta
- `GET https://osconfig.googleapis.com/v2/{+name}`
- Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource. |

### `osconfig.organizations.locations.operations.list`

- Versions: v2, v2beta
- `GET https://osconfig.googleapis.com/v2/{+name}/operations`
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

### `osconfig.projects.guestPolicies.create`

- Versions: v1beta
- `POST https://osconfig.googleapis.com/v1beta/{+parent}/guestPolicies`
- Create an OS Config guest policy.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GuestPolicy`; Response: `GuestPolicy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The resource name of the parent using one of the following forms: `projects/{project_number}`. |
| `guestPolicyId` | query | string | yes | Required. The logical name of the guest policy in the project with the following restrictions: \* Must contain only lowercase letters, numbers, and hyphens. \* Must start with a letter. \* Must be between 1-63 characters. \* Must end with a number or a letter. \* Must be unique within the project. |

### `osconfig.projects.guestPolicies.delete`

- Versions: v1beta
- `DELETE https://osconfig.googleapis.com/v1beta/{+name}`
- Delete an OS Config guest policy.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the guest policy using one of the following forms: `projects/{project_number}/guestPolicies/{guest_policy_id}`. |

### `osconfig.projects.guestPolicies.get`

- Versions: v1beta
- `GET https://osconfig.googleapis.com/v1beta/{+name}`
- Get an OS Config guest policy.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GuestPolicy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the guest policy using one of the following forms: `projects/{project_number}/guestPolicies/{guest_policy_id}`. |

### `osconfig.projects.guestPolicies.list`

- Versions: v1beta
- `GET https://osconfig.googleapis.com/v1beta/{+parent}/guestPolicies`
- Get a page of OS Config guest policies.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListGuestPoliciesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The resource name of the parent using one of the following forms: `projects/{project_number}`. |
| `pageSize` | query | integer (int32) | no | The maximum number of guest policies to return. |
| `pageToken` | query | string | no | A pagination token returned from a previous call to `ListGuestPolicies` that indicates where this listing should continue from. |

### `osconfig.projects.guestPolicies.patch`

- Versions: v1beta
- `PATCH https://osconfig.googleapis.com/v1beta/{+name}`
- Update an OS Config guest policy.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GuestPolicy`; Response: `GuestPolicy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Unique name of the resource in this project using one of the following forms: `projects/{project_number}/guestPolicies/{guest_policy_id}`. |
| `updateMask` | query | string (google-fieldmask) | no | Field mask that controls which fields of the guest policy should be updated. |

### `osconfig.projects.locations.global.getProjectFeatureSettings`

- Versions: v1
- `GET https://osconfig.googleapis.com/v1/{+name}`
- GetProjectFeatureSettings returns the VM Manager feature settings for a project.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ProjectFeatureSettings`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name specifies the URL for the ProjectFeatureSettings resource: projects/project_id/locations/global/projectFeatureSettings. |

### `osconfig.projects.locations.global.policyOrchestrators.create`

- Versions: v2, v2beta
- `POST https://osconfig.googleapis.com/v2/{+parent}/policyOrchestrators`
- Creates a new policy orchestrator under the given project resource. `name` field of the given orchestrator are ignored and instead replaced by a product of `parent` and `policy_orchestrator_id`. Orchestrator state field might be only set to `ACTIVE`, `STOPPED` or omitted (in which case, the created resource will be in `ACTIVE` state anyway).
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleCloudOsconfigV2__PolicyOrchestrator`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource name in the form of: \* `organizations/{organization_id}/locations/global` \* `folders/{folder_id}/locations/global` \* `projects/{project_id_or_number}/locations/global` |
| `policyOrchestratorId` | query | string | yes | Required. The logical identifier of the policy orchestrator, with the following restrictions: \* Must contain only lowercase letters, numbers, and hyphens. \* Must start with a letter. \* Must be between 1-63 characters. \* Must end with a number or a letter. \* Must be unique within the parent. |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `osconfig.projects.locations.global.policyOrchestrators.delete`

- Versions: v2, v2beta
- `DELETE https://osconfig.googleapis.com/v2/{+name}`
- Deletes an existing policy orchestrator resource, parented by a project.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the resource to be deleted. |
| `etag` | query | string | no | Optional. The current etag of the policy orchestrator. If an etag is provided and does not match the current etag of the policy orchestrator, deletion will be blocked and an ABORTED error will be returned. |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `osconfig.projects.locations.global.policyOrchestrators.get`

- Versions: v2, v2beta
- `GET https://osconfig.googleapis.com/v2/{+name}`
- Retrieves an existing policy orchestrator, parented by a project.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudOsconfigV2__PolicyOrchestrator`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name. |

### `osconfig.projects.locations.global.policyOrchestrators.list`

- Versions: v2, v2beta
- `GET https://osconfig.googleapis.com/v2/{+parent}/policyOrchestrators`
- Lists the policy orchestrators under the given parent project resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudOsconfigV2__ListPolicyOrchestratorsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource name. |
| `filter` | query | string | no | Optional. Filtering results |
| `orderBy` | query | string | no | Optional. Hint for how to order the results |
| `pageSize` | query | integer (int32) | no | Optional. Requested page size. Server may return fewer items than requested. If unspecified, server will pick an appropriate default. |
| `pageToken` | query | string | no | Optional. A token identifying a page of results the server should return. |

### `osconfig.projects.locations.global.policyOrchestrators.patch`

- Versions: v2, v2beta
- `PATCH https://osconfig.googleapis.com/v2/{+name}`
- Updates an existing policy orchestrator, parented by a project.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleCloudOsconfigV2__PolicyOrchestrator`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Immutable. Identifier. In the following format: \* `organizations/{organization_id}/locations/global/policyOrchestrators/{orchestrator_id}` \* `folders/{folder_id}/locations/global/policyOrchestrators/{orchestrator_id}` \* `projects/{project_id_or_number}/locations/global/policyOrchestrators/{orchestrator_id}` |
| `updateMask` | query | string (google-fieldmask) | no | Optional. The list of fields to merge into the existing policy orchestrator. A special \["\*"\] field mask can be used to simply replace the entire resource. Otherwise, for all paths referenced in the mask, following merge rules are used: \* output only fields are ignored, \* primitive fields are replaced, \* repeated fields are replaced, \* map fields are merged key by key, \* message fields are cleared if not set in the request, otherwise they are merged recursively (in particular - message fields set to an empty message has no side effects) If field mask (or its paths) is not specified, it is automatically inferred from the request using following rules: \* primitive fields are listed, if set to a non-default value (as there is no way to distinguish between default and unset value), \* map and repeated fields are listed, \* `google.protobuf.Any` fields are listed, \* other message fields are traversed recursively. Note: implicit mask does not allow clearing fields. |

### `osconfig.projects.locations.global.updateProjectFeatureSettings`

- Versions: v1
- `PATCH https://osconfig.googleapis.com/v1/{+name}`
- UpdateProjectFeatureSettings sets the VM Manager features for a project.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `ProjectFeatureSettings`; Response: `ProjectFeatureSettings`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Immutable. Name specifies the URL for the ProjectFeatureSettings resource: projects/project_id/locations/global/projectFeatureSettings. |
| `updateMask` | query | string (google-fieldmask) | no | Optional. Field mask that controls which fields of the ProjectFeatureSettings should be updated. |

### `osconfig.projects.locations.instanceOSPoliciesCompliances.get`

- Versions: v1alpha
- `GET https://osconfig.googleapis.com/v1alpha/{+name}`
- Deprecated: Use GetOSPolicyAssignmentReport instead. Get OS policies compliance data for the specified Compute Engine VM instance.
- Deprecated: `deprecated: true` in the Discovery document
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `InstanceOSPoliciesCompliance`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. API resource name for instance OS policies compliance resource. Format: `projects/{project}/locations/{location}/instanceOSPoliciesCompliances/{instance}` For `{project}`, either Compute Engine project-number or project-id can be provided. For `{instance}`, either Compute Engine VM instance-id or instance-name can be provided. |

### `osconfig.projects.locations.instanceOSPoliciesCompliances.list`

- Versions: v1alpha
- `GET https://osconfig.googleapis.com/v1alpha/{+parent}/instanceOSPoliciesCompliances`
- Deprecated: Use ListOSPolicyAssignmentReports instead. List OS policies compliance data for all Compute Engine VM instances in the specified zone.
- Deprecated: `deprecated: true` in the Discovery document
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListInstanceOSPoliciesCompliancesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource name. Format: `projects/{project}/locations/{location}` For `{project}`, either Compute Engine project-number or project-id can be provided. |
| `filter` | query | string | no | If provided, this field specifies the criteria that must be met by a `InstanceOSPoliciesCompliance` API resource to be included in the response. |
| `pageSize` | query | integer (int32) | no | The maximum number of results to return. |
| `pageToken` | query | string | no | A pagination token returned from a previous call to `ListInstanceOSPoliciesCompliances` that indicates where this listing should continue from. |

### `osconfig.projects.locations.instances.inventories.get`

- Versions: v1, v1alpha
- `GET https://osconfig.googleapis.com/v1/{+name}`
- Get inventory data for the specified VM instance. If the VM has no associated inventory, the message `NOT_FOUND` is returned.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Inventory`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. API resource name for inventory resource. Format: `projects/{project}/locations/{location}/instances/{instance}/inventory` For `{project}`, either `project-number` or `project-id` can be provided. For `{instance}`, either Compute Engine `instance-id` or `instance-name` can be provided. |
| `view` | query | string enum | no | Optional. Inventory view indicating what information should be included in the inventory resource. If unspecified, the default view is BASIC. Values: `INVENTORY_VIEW_UNSPECIFIED`, `BASIC`, `FULL`. |

### `osconfig.projects.locations.instances.inventories.list`

- Versions: v1, v1alpha
- `GET https://osconfig.googleapis.com/v1/{+parent}/inventories`
- List inventory data for all VM instances in the specified zone.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListInventoriesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource name. Format: `projects/{project}/locations/{location}/instances/-` For `{project}`, either `project-number` or `project-id` can be provided. |
| `filter` | query | string | no | Optional. If provided, this field specifies the criteria that must be met by a `Inventory` API resource to be included in the response. |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of results to return. |
| `pageToken` | query | string | no | Optional. A pagination token returned from a previous call to `ListInventories` that indicates where this listing should continue from. |
| `view` | query | string enum | no | Optional. Inventory view indicating what information should be included in the inventory resource. If unspecified, the default view is BASIC. Values: `INVENTORY_VIEW_UNSPECIFIED`, `BASIC`, `FULL`. |

### `osconfig.projects.locations.instances.osPolicyAssignments.reports.get`

- Versions: v1, v1alpha
- `GET https://osconfig.googleapis.com/v1/{+name}`
- Get the OS policy assignment report for the specified Compute Engine VM instance.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `OSPolicyAssignmentReport`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. API resource name for OS policy assignment report. Format: `/projects/{project}/locations/{location}/instances/{instance}/osPolicyAssignments/{assignment}/report` For `{project}`, either `project-number` or `project-id` can be provided. For `{instance_id}`, either Compute Engine `instance-id` or `instance-name` can be provided. For `{assignment_id}`, the OSPolicyAssignment id must be provided. |

### `osconfig.projects.locations.instances.osPolicyAssignments.reports.list`

- Versions: v1, v1alpha
- `GET https://osconfig.googleapis.com/v1/{+parent}/reports`
- List OS policy assignment reports for all Compute Engine VM instances in the specified zone.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListOSPolicyAssignmentReportsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource name. Format: `projects/{project}/locations/{location}/instances/{instance}/osPolicyAssignments/{assignment}/reports` For `{project}`, either `project-number` or `project-id` can be provided. For `{instance}`, either `instance-name`, `instance-id`, or `-` can be provided. If '-' is provided, the response will include OSPolicyAssignmentReports for all instances in the project/location. For `{assignment}`, either `assignment-id` or `-` can be provided. If '-' is provided, the response will include OSPolicyAssignmentReports for all OSPolicyAssignments in the project/location. Either {instance} or {assignment} must be `-`. For example: `projects/{project}/locations/{location}/instances/{instance}/osPolicyAssignments/-/reports` returns all reports for the instance `projects/{project}/locations/{location}/instances/-/osPolicyAssignments/{assignment-id}/reports` returns all the reports for the given assignment across all instances. `projects/{project}/locations/{location}/instances/-/osPolicyAssignments/-/reports` returns all the reports for all assignments across all instances. |
| `filter` | query | string | no | If provided, this field specifies the criteria that must be met by the `OSPolicyAssignmentReport` API resource that is included in the response. |
| `pageSize` | query | integer (int32) | no | The maximum number of results to return. |
| `pageToken` | query | string | no | A pagination token returned from a previous call to the `ListOSPolicyAssignmentReports` method that indicates where this listing should continue from. |

### `osconfig.projects.locations.instances.vulnerabilityReports.get`

- Versions: v1, v1alpha
- `GET https://osconfig.googleapis.com/v1/{+name}`
- Gets the vulnerability report for the specified VM instance. Only VMs with inventory data have vulnerability reports associated with them.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `VulnerabilityReport`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. API resource name for vulnerability resource. Format: `projects/{project}/locations/{location}/instances/{instance}/vulnerabilityReport` For `{project}`, either `project-number` or `project-id` can be provided. For `{instance}`, either Compute Engine `instance-id` or `instance-name` can be provided. |

### `osconfig.projects.locations.instances.vulnerabilityReports.list`

- Versions: v1, v1alpha
- `GET https://osconfig.googleapis.com/v1/{+parent}/vulnerabilityReports`
- List vulnerability reports for all VM instances in the specified zone.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListVulnerabilityReportsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource name. Format: `projects/{project}/locations/{location}/instances/-` For `{project}`, either `project-number` or `project-id` can be provided. |
| `filter` | query | string | no | This field supports filtering by the severity level for the vulnerability. For a list of severity levels, see Severity levels for vulnerabilities (https://cloud.google.com/container-analysis/docs/container-scanning-overview#severity_levels_for_vulnerabilities). The filter field follows the rules described in the AIP-160 (https://google.aip.dev/160) guidelines as follows: + \*\*Filter for a specific severity type\*\*: you can list reports that contain vulnerabilities that are classified as medium by specifying `vulnerabilities.details.severity:MEDIUM`. + \*\*Filter for a range of severities\*\* : you can list reports that have vulnerabilities that are classified as critical or high by specifying `vulnerabilities.details.severity:HIGH OR vulnerabilities.details.severity:CRITICAL` |
| `pageSize` | query | integer (int32) | no | The maximum number of results to return. |
| `pageToken` | query | string | no | A pagination token returned from a previous call to `ListVulnerabilityReports` that indicates where this listing should continue from. |

### `osconfig.projects.locations.operations.cancel`

- Versions: v2, v2beta
- `POST https://osconfig.googleapis.com/v2/{+name}:cancel`
- Starts asynchronous cancellation on a long-running operation. The server makes a best effort to cancel the operation, but success is not guaranteed. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. Clients can use Operations.GetOperation or other methods to check whether the cancellation succeeded or whether the operation completed despite cancellation. On successful cancellation, the operation is not deleted; instead, it becomes an operation with an Operation.error value with a google.rpc.Status.code of `1`, corresponding to `Code.CANCELLED`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `CancelOperationRequest`; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource to be cancelled. |

### `osconfig.projects.locations.operations.delete`

- Versions: v2, v2beta
- `DELETE https://osconfig.googleapis.com/v2/{+name}`
- Deletes a long-running operation. This method indicates that the client is no longer interested in the operation result. It does not cancel the operation. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource to be deleted. |

### `osconfig.projects.locations.operations.get`

- Versions: v2, v2beta
- `GET https://osconfig.googleapis.com/v2/{+name}`
- Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource. |

### `osconfig.projects.locations.operations.list`

- Versions: v2, v2beta
- `GET https://osconfig.googleapis.com/v2/{+name}/operations`
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

### `osconfig.projects.locations.osPolicyAssignments.create`

- Versions: v1, v1alpha
- `POST https://osconfig.googleapis.com/v1/{+parent}/osPolicyAssignments`
- Create an OS policy assignment. This method also creates the first revision of the OS policy assignment. This method returns a long running operation (LRO) that contains the rollout details. The rollout can be cancelled by cancelling the LRO. For more information, see Method: projects.locations.osPolicyAssignments.operations.cancel (https://cloud.google.com/compute/docs/osconfig/rest/v1/projects.locations.osPolicyAssignments.operations/cancel).
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `OSPolicyAssignment`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource name in the form: projects/{project}/locations/{location}. Note: Specify the zone of your VMs as the location. |
| `osPolicyAssignmentId` | query | string | yes | Required. The logical name of the OS policy assignment in the project with the following restrictions: \* Must contain only lowercase letters, numbers, and hyphens. \* Must start with a letter. \* Must be between 1-63 characters. \* Must end with a number or a letter. \* Must be unique within the project. |
| `requestId` | query | string | no | Optional. A unique identifier for this request. Restricted to 36 ASCII characters. A random UUID is recommended. This request is only idempotent if a `request_id` is provided. |

### `osconfig.projects.locations.osPolicyAssignments.delete`

- Versions: v1, v1alpha
- `DELETE https://osconfig.googleapis.com/v1/{+name}`
- Delete the OS policy assignment. This method creates a new revision of the OS policy assignment. This method returns a long running operation (LRO) that contains the rollout details. The rollout can be cancelled by cancelling the LRO. If the LRO completes and is not cancelled, all revisions associated with the OS policy assignment are deleted. For more information, see Method: projects.locations.osPolicyAssignments.operations.cancel (https://cloud.google.com/compute/docs/osconfig/rest/v1/projects.locations.osPolicyAssignments.operations/cancel).
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the OS policy assignment to be deleted |
| `requestId` | query | string | no | Optional. A unique identifier for this request. Restricted to 36 ASCII characters. A random UUID is recommended. This request is only idempotent if a `request_id` is provided. |

### `osconfig.projects.locations.osPolicyAssignments.get`

- Versions: v1, v1alpha
- `GET https://osconfig.googleapis.com/v1/{+name}`
- Retrieve an existing OS policy assignment. This method always returns the latest revision. In order to retrieve a previous revision of the assignment, also provide the revision ID in the `name` parameter.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `OSPolicyAssignment`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of OS policy assignment. Format: `projects/{project}/locations/{location}/osPolicyAssignments/{os_policy_assignment}@{revisionId}` |

### `osconfig.projects.locations.osPolicyAssignments.list`

- Versions: v1, v1alpha
- `GET https://osconfig.googleapis.com/v1/{+parent}/osPolicyAssignments`
- List the OS policy assignments under the parent resource. For each OS policy assignment, the latest revision is returned.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListOSPolicyAssignmentsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource name. |
| `pageSize` | query | integer (int32) | no | The maximum number of assignments to return. |
| `pageToken` | query | string | no | A pagination token returned from a previous call to `ListOSPolicyAssignments` that indicates where this listing should continue from. |

### `osconfig.projects.locations.osPolicyAssignments.listRevisions`

- Versions: v1, v1alpha
- `GET https://osconfig.googleapis.com/v1/{+name}:listRevisions`
- List the OS policy assignment revisions for a given OS policy assignment.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListOSPolicyAssignmentRevisionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the OS policy assignment to list revisions for. |
| `pageSize` | query | integer (int32) | no | The maximum number of revisions to return. |
| `pageToken` | query | string | no | A pagination token returned from a previous call to `ListOSPolicyAssignmentRevisions` that indicates where this listing should continue from. |

### `osconfig.projects.locations.osPolicyAssignments.operations.cancel`

- Versions: v1, v1alpha
- `POST https://osconfig.googleapis.com/v1/{+name}:cancel`
- Starts asynchronous cancellation on a long-running operation. The server makes a best effort to cancel the operation, but success is not guaranteed. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. Clients can use Operations.GetOperation or other methods to check whether the cancellation succeeded or whether the operation completed despite cancellation. On successful cancellation, the operation is not deleted; instead, it becomes an operation with an Operation.error value with a google.rpc.Status.code of `1`, corresponding to `Code.CANCELLED`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `CancelOperationRequest`; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource to be cancelled. |

### `osconfig.projects.locations.osPolicyAssignments.operations.get`

- Versions: v1, v1alpha
- `GET https://osconfig.googleapis.com/v1/{+name}`
- Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource. |

### `osconfig.projects.locations.osPolicyAssignments.patch`

- Versions: v1, v1alpha
- `PATCH https://osconfig.googleapis.com/v1/{+name}`
- Update an existing OS policy assignment. This method creates a new revision of the OS policy assignment. This method returns a long running operation (LRO) that contains the rollout details. The rollout can be cancelled by cancelling the LRO. For more information, see Method: projects.locations.osPolicyAssignments.operations.cancel (https://cloud.google.com/compute/docs/osconfig/rest/v1/projects.locations.osPolicyAssignments.operations/cancel).
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `OSPolicyAssignment`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Resource name. Format: `projects/{project_number}/locations/{location}/osPolicyAssignments/{os_policy_assignment_id}` This field is ignored when you create an OS policy assignment. |
| `allowMissing` | query | boolean | no | Optional. If set to true, and the OS policy assignment is not found, a new OS policy assignment will be created. In this situation, `update_mask` is ignored. |
| `requestId` | query | string | no | Optional. A unique identifier for this request. Restricted to 36 ASCII characters. A random UUID is recommended. This request is only idempotent if a `request_id` is provided. |
| `updateMask` | query | string (google-fieldmask) | no | Optional. Field mask that controls which fields of the assignment should be updated. |

### `osconfig.projects.patchDeployments.create`

- Versions: v1, v1beta
- `POST https://osconfig.googleapis.com/v1/{+parent}/patchDeployments`
- Create an OS Config patch deployment.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `PatchDeployment`; Response: `PatchDeployment`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The project to apply this patch deployment to in the form `projects/*`. |
| `patchDeploymentId` | query | string | yes | Required. A name for the patch deployment in the project. When creating a name the following rules apply: \* Must contain only lowercase letters, numbers, and hyphens. \* Must start with a letter. \* Must be between 1-63 characters. \* Must end with a number or a letter. \* Must be unique within the project. |

### `osconfig.projects.patchDeployments.delete`

- Versions: v1, v1beta
- `DELETE https://osconfig.googleapis.com/v1/{+name}`
- Delete an OS Config patch deployment.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the patch deployment in the form `projects/*/patchDeployments/*`. |

### `osconfig.projects.patchDeployments.get`

- Versions: v1, v1beta
- `GET https://osconfig.googleapis.com/v1/{+name}`
- Get an OS Config patch deployment.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `PatchDeployment`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the patch deployment in the form `projects/*/patchDeployments/*`. |

### `osconfig.projects.patchDeployments.list`

- Versions: v1, v1beta
- `GET https://osconfig.googleapis.com/v1/{+parent}/patchDeployments`
- Get a page of OS Config patch deployments.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListPatchDeploymentsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The resource name of the parent in the form `projects/*`. |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of patch deployments to return. Default is 100. |
| `pageToken` | query | string | no | Optional. A pagination token returned from a previous call to ListPatchDeployments that indicates where this listing should continue from. |

### `osconfig.projects.patchDeployments.patch`

- Versions: v1, v1beta
- `PATCH https://osconfig.googleapis.com/v1/{+name}`
- Update an OS Config patch deployment.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `PatchDeployment`; Response: `PatchDeployment`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Unique name for the patch deployment resource in a project. The patch deployment name is in the form: `projects/{project_id}/patchDeployments/{patch_deployment_id}`. This field is ignored when you create a new patch deployment. |
| `updateMask` | query | string (google-fieldmask) | no | Optional. Field mask that controls which fields of the patch deployment should be updated. |

### `osconfig.projects.patchDeployments.pause`

- Versions: v1, v1beta
- `POST https://osconfig.googleapis.com/v1/{+name}:pause`
- Change state of patch deployment to "PAUSED". Patch deployment in paused state doesn't generate patch jobs.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `PausePatchDeploymentRequest`; Response: `PatchDeployment`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the patch deployment in the form `projects/*/patchDeployments/*`. |

### `osconfig.projects.patchDeployments.resume`

- Versions: v1, v1beta
- `POST https://osconfig.googleapis.com/v1/{+name}:resume`
- Change state of patch deployment back to "ACTIVE". Patch deployment in active state continues to generate patch jobs.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `ResumePatchDeploymentRequest`; Response: `PatchDeployment`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the patch deployment in the form `projects/*/patchDeployments/*`. |

### `osconfig.projects.patchJobs.cancel`

- Versions: v1, v1beta
- `POST https://osconfig.googleapis.com/v1/{+name}:cancel`
- Cancel a patch job. The patch job must be active. Canceled patch jobs cannot be restarted.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `CancelPatchJobRequest`; Response: `PatchJob`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the patch in the form `projects/*/patchJobs/*` |

### `osconfig.projects.patchJobs.execute`

- Versions: v1, v1beta
- `POST https://osconfig.googleapis.com/v1/{+parent}/patchJobs:execute`
- Patch VM instances by creating and running a patch job.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `ExecutePatchJobRequest`; Response: `PatchJob`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The project in which to run this patch in the form `projects/*` |

### `osconfig.projects.patchJobs.get`

- Versions: v1, v1beta
- `GET https://osconfig.googleapis.com/v1/{+name}`
- Get the patch job. This can be used to track the progress of an ongoing patch job or review the details of completed jobs.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `PatchJob`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the patch in the form `projects/*/patchJobs/*` |

### `osconfig.projects.patchJobs.instanceDetails.list`

- Versions: v1, v1beta
- `GET https://osconfig.googleapis.com/v1/{+parent}/instanceDetails`
- Get a list of instance details for a given patch job.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListPatchJobInstanceDetailsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent for the instances are in the form of `projects/*/patchJobs/*`. |
| `filter` | query | string | no | A filter expression that filters results listed in the response. This field supports filtering results by instance zone, name, state, or `failure_reason`. |
| `pageSize` | query | integer (int32) | no | The maximum number of instance details records to return. Default is 100. |
| `pageToken` | query | string | no | A pagination token returned from a previous call that indicates where this listing should continue from. |

### `osconfig.projects.patchJobs.list`

- Versions: v1, v1beta
- `GET https://osconfig.googleapis.com/v1/{+parent}/patchJobs`
- Get a list of patch jobs.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListPatchJobsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. In the form of `projects/*` |
| `filter` | query | string | no | If provided, this field specifies the criteria that must be met by patch jobs to be included in the response. Currently, filtering is only available on the patch_deployment field. |
| `pageSize` | query | integer (int32) | no | The maximum number of instance status to return. |
| `pageToken` | query | string | no | A pagination token returned from a previous call that indicates where this listing should continue from. |

### `osconfig.projects.zones.instances.lookupEffectiveGuestPolicy`

- Versions: v1beta
- `POST https://osconfig.googleapis.com/v1beta/{+instance}:lookupEffectiveGuestPolicy`
- Lookup the effective guest policy that applies to a VM instance. This lookup merges all policies that are assigned to the instance ancestry.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `LookupEffectiveGuestPolicyRequest`; Response: `EffectiveGuestPolicy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `instance` | path | string | yes | Required. The VM instance whose policies are being looked up. |

### Example request skeleton

Generated from the Discovery entry of `osconfig.folders.locations.global.policyOrchestrators.get` (not in the official docs); replace the `{...}` path variables (URL-encode query values):

```bash
curl -X GET \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  "https://osconfig.googleapis.com/v2/{+name}"
```

## Notes

- Generated from the Discovery document(s) v2, v1, v2beta, v1beta, v1alpha of `osconfig` (retrieved 2026-11-14). Resources on this page: folders, organizations, projects.
- The Required column is `yes` for path variables and required parameters, and `conditional` when the description says "Required if ..." (mutually exclusive alternatives), when a `parent.child` parameter is required only inside an optional parent message or one branch of a oneof. Path variables are `yes` unless a note below names an alternative route without them.
- Message schemas (the request and response types named above) are defined in the `schemas` section of the Discovery documents in Source.
- Deprecated methods (`deprecated: true` in Discovery): `osconfig.projects.locations.instanceOSPoliciesCompliances.get`, `osconfig.projects.locations.instanceOSPoliciesCompliances.list`. Avoid them in new code.
- Corrected from the official docs (the Discovery text above is verbatim): the `parent` of `osconfig.projects.locations.instances.osPolicyAssignments.reports.list` is described with a trailing `/reports`, but its Discovery path pattern is `projects/[^/]+/locations/[^/]+/instances/[^/]+/osPolicyAssignments/[^/]+` and the method path `v1/{+parent}/reports` adds `/reports` itself; pass `projects/{project}/locations/{location}/instances/{instance}/osPolicyAssignments/{assignment}` (`-` is accepted for `{instance}` and `{assignment}` as described).
- Source: https://osconfig.googleapis.com/$discovery/rest?version=v2, https://osconfig.googleapis.com/$discovery/rest?version=v1, https://osconfig.googleapis.com/$discovery/rest?version=v2beta, https://osconfig.googleapis.com/$discovery/rest?version=v1beta, https://osconfig.googleapis.com/$discovery/rest?version=v1alpha (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
