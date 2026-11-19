---
source: https://dataplex.googleapis.com/$discovery/rest?version=v1
---

# Cloud Dataplex API REST API (dataplex) (part 1/2)

## Signature / Usage

Base URL: `https://dataplex.googleapis.com`. Methods are listed by `id`; the `Versions` line shows which API versions define the method (preferred: v1).

### `dataplex.organizations.locations.encryptionConfigs.create`

- Versions: v1
- `POST https://dataplex.googleapis.com/v1/{+parent}/encryptionConfigs`
- Create an EncryptionConfig.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/dataplex.read-write`
- Request: `GoogleCloudDataplexV1EncryptionConfig`; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The location at which the EncryptionConfig is to be created. |
| `encryptionConfigId` | query | string | yes | Required. The ID of the EncryptionConfig to create. Currently, only a value of "default" is supported. |

### `dataplex.organizations.locations.encryptionConfigs.delete`

- Versions: v1
- `DELETE https://dataplex.googleapis.com/v1/{+name}`
- Delete an EncryptionConfig.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/dataplex.read-write`
- Request: —; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the EncryptionConfig to delete. |
| `etag` | query | string | no | Optional. Etag of the EncryptionConfig. This is a strong etag. |

### `dataplex.organizations.locations.encryptionConfigs.get`

- Versions: v1
- `GET https://dataplex.googleapis.com/v1/{+name}`
- Get an EncryptionConfig.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/dataplex.read-write`
- Request: —; Response: `GoogleCloudDataplexV1EncryptionConfig`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the EncryptionConfig to fetch. |

### `dataplex.organizations.locations.encryptionConfigs.getIamPolicy`

- Versions: v1
- `GET https://dataplex.googleapis.com/v1/{+resource}:getIamPolicy`
- Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/dataplex.read-write`
- Request: —; Response: `GoogleIamV1Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |
| `options.requestedPolicyVersion` | query | integer (int32) | no | Optional. The maximum policy version that will be used to format the policy.Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected.Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset.The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1.To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |

### `dataplex.organizations.locations.encryptionConfigs.list`

- Versions: v1
- `GET https://dataplex.googleapis.com/v1/{+parent}/encryptionConfigs`
- List EncryptionConfigs.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/dataplex.read-write`
- Request: —; Response: `GoogleCloudDataplexV1ListEncryptionConfigsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The location for which the EncryptionConfig is to be listed. |
| `filter` | query | string | no | Optional. Filter the EncryptionConfigs to be returned. Using bare literals: (These values will be matched anywhere it may appear in the object's field values) \* filter=some_value Using fields: (These values will be matched only in the specified field) \* filter=some_field=some_value Supported fields: \* name, key, create_time, update_time, encryption_state Example: \* filter=name=organizations/123/locations/us-central1/encryptionConfigs/test-config conjunctions: (AND, OR, NOT) \* filter=name=organizations/123/locations/us-central1/encryptionConfigs/test-config AND mode=CMEK logical operators: (>, <, >=, <=, !=, =, :), \* filter=create_time>2024-05-01T00:00:00.000Z |
| `orderBy` | query | string | no | Optional. Order by fields for the result. |
| `pageSize` | query | integer (int32) | no | Optional. Maximum number of EncryptionConfigs to return. The service may return fewer than this value. If unspecified, at most 10 EncryptionConfigs will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. |
| `pageToken` | query | string | no | Optional. Page token received from a previous ListEncryptionConfigs call. Provide this to retrieve the subsequent page. When paginating, the parameters - filter and order_by provided to ListEncryptionConfigs must match the call that provided the page token. |

### `dataplex.organizations.locations.encryptionConfigs.patch`

- Versions: v1
- `PATCH https://dataplex.googleapis.com/v1/{+name}`
- Update an EncryptionConfig.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/dataplex.read-write`
- Request: `GoogleCloudDataplexV1EncryptionConfig`; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. The resource name of the EncryptionConfig. Format: organizations/{organization}/locations/{location}/encryptionConfigs/{encryption_config} Global location is not supported. |
| `updateMask` | query | string (google-fieldmask) | no | Optional. Mask of fields to update. The service treats an omitted field mask as an implied field mask equivalent to all fields that are populated (have a non-empty value). |

### `dataplex.organizations.locations.encryptionConfigs.setIamPolicy`

- Versions: v1
- `POST https://dataplex.googleapis.com/v1/{+resource}:setIamPolicy`
- Sets the access control policy on the specified resource. Replaces any existing policy.Can return NOT_FOUND, INVALID_ARGUMENT, and PERMISSION_DENIED errors.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/dataplex.read-write`
- Request: `GoogleIamV1SetIamPolicyRequest`; Response: `GoogleIamV1Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `dataplex.organizations.locations.encryptionConfigs.testIamPermissions`

- Versions: v1
- `POST https://dataplex.googleapis.com/v1/{+resource}:testIamPermissions`
- Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a NOT_FOUND error.Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/dataplex.read-write`
- Request: `GoogleIamV1TestIamPermissionsRequest`; Response: `GoogleIamV1TestIamPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `dataplex.organizations.locations.operations.cancel`

- Versions: v1
- `POST https://dataplex.googleapis.com/v1/{+name}:cancel`
- Starts asynchronous cancellation on a long-running operation. The server makes a best effort to cancel the operation, but success is not guaranteed. If the server doesn't support this method, it returns google.rpc.Code.UNIMPLEMENTED. Clients can use Operations.GetOperation or other methods to check whether the cancellation succeeded or whether the operation completed despite cancellation. On successful cancellation, the operation is not deleted; instead, it becomes an operation with an Operation.error value with a google.rpc.Status.code of 1, corresponding to Code.CANCELLED.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/dataplex.read-write`
- Request: `GoogleLongrunningCancelOperationRequest`; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource to be cancelled. |

### `dataplex.organizations.locations.operations.delete`

- Versions: v1
- `DELETE https://dataplex.googleapis.com/v1/{+name}`
- Deletes a long-running operation. This method indicates that the client is no longer interested in the operation result. It does not cancel the operation. If the server doesn't support this method, it returns google.rpc.Code.UNIMPLEMENTED.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/dataplex.read-write`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource to be deleted. |

### `dataplex.organizations.locations.operations.get`

- Versions: v1
- `GET https://dataplex.googleapis.com/v1/{+name}`
- Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/dataplex.read-write`
- Request: —; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource. |

### `dataplex.organizations.locations.operations.list`

- Versions: v1
- `GET https://dataplex.googleapis.com/v1/{+name}/operations`
- Lists operations that match the specified filter in the request. If the server doesn't support this method, it returns UNIMPLEMENTED.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/dataplex.read-write`
- Request: —; Response: `GoogleLongrunningListOperationsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation's parent resource. |
| `filter` | query | string | no | The standard list filter. |
| `pageSize` | query | integer (int32) | no | The standard list page size. |
| `pageToken` | query | string | no | The standard list page token. |
| `returnPartialSuccess` | query | boolean | no | When set to true, operations that are reachable are returned as normal, and those that are unreachable are returned in the ListOperationsResponse.unreachable field.This can only be true when reading across collections. For example, when parent is set to "projects/example/locations/-".This field is not supported by default and will result in an UNIMPLEMENTED error if set unless explicitly documented otherwise in service or product specific documentation. |

### `dataplex.projects.locations.agentTasks.getIamPolicy`

- Versions: v1
- `GET https://dataplex.googleapis.com/v1/{+resource}:getIamPolicy`
- Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/dataplex.read-write`
- Request: —; Response: `GoogleIamV1Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |
| `options.requestedPolicyVersion` | query | integer (int32) | no | Optional. The maximum policy version that will be used to format the policy.Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected.Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset.The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1.To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |

### `dataplex.projects.locations.agentTasks.setIamPolicy`

- Versions: v1
- `POST https://dataplex.googleapis.com/v1/{+resource}:setIamPolicy`
- Sets the access control policy on the specified resource. Replaces any existing policy.Can return NOT_FOUND, INVALID_ARGUMENT, and PERMISSION_DENIED errors.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/dataplex.read-write`
- Request: `GoogleIamV1SetIamPolicyRequest`; Response: `GoogleIamV1Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `dataplex.projects.locations.agentTasks.testIamPermissions`

- Versions: v1
- `POST https://dataplex.googleapis.com/v1/{+resource}:testIamPermissions`
- Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a NOT_FOUND error.Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/dataplex.read-write`
- Request: `GoogleIamV1TestIamPermissionsRequest`; Response: `GoogleIamV1TestIamPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `dataplex.projects.locations.aspectTypes.create`

- Versions: v1
- `POST https://dataplex.googleapis.com/v1/{+parent}/aspectTypes`
- Creates an AspectType.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/dataplex.read-write`
- Request: `GoogleCloudDataplexV1AspectType`; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The resource name of the AspectType, of the form: projects/{project_number}/locations/{location_id} where location_id refers to a Google Cloud region. |
| `aspectTypeId` | query | string | yes | Required. AspectType identifier. |
| `validateOnly` | query | boolean | no | Optional. The service validates the request without performing any mutations. The default is false. |

### `dataplex.projects.locations.aspectTypes.delete`

- Versions: v1
- `DELETE https://dataplex.googleapis.com/v1/{+name}`
- Deletes an AspectType.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/dataplex.read-write`
- Request: —; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the AspectType: projects/{project_number}/locations/{location_id}/aspectTypes/{aspect_type_id}. |
| `etag` | query | string | no | Optional. If the client provided etag value does not match the current etag value, the DeleteAspectTypeRequest method returns an ABORTED error response. |

### `dataplex.projects.locations.aspectTypes.get`

- Versions: v1
- `GET https://dataplex.googleapis.com/v1/{+name}`
- Gets an AspectType.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`, `https://www.googleapis.com/auth/dataplex.read-write`, `https://www.googleapis.com/auth/dataplex.readonly`
- Request: —; Response: `GoogleCloudDataplexV1AspectType`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the AspectType: projects/{project_number}/locations/{location_id}/aspectTypes/{aspect_type_id}. |

### `dataplex.projects.locations.aspectTypes.getIamPolicy`

- Versions: v1
- `GET https://dataplex.googleapis.com/v1/{+resource}:getIamPolicy`
- Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/dataplex.read-write`
- Request: —; Response: `GoogleIamV1Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |
| `options.requestedPolicyVersion` | query | integer (int32) | no | Optional. The maximum policy version that will be used to format the policy.Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected.Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset.The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1.To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |

### `dataplex.projects.locations.aspectTypes.list`

- Versions: v1
- `GET https://dataplex.googleapis.com/v1/{+parent}/aspectTypes`
- Lists AspectType resources in a project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`, `https://www.googleapis.com/auth/dataplex.read-write`, `https://www.googleapis.com/auth/dataplex.readonly`
- Request: —; Response: `GoogleCloudDataplexV1ListAspectTypesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The resource name of the AspectType location, of the form: projects/{project_number}/locations/{location_id} where location_id refers to a Google Cloud region. |
| `filter` | query | string | no | Optional. Filter request. Filters are case-sensitive. The service supports the following formats: labels.key1 = "value1" labels:key1 name = "value"These restrictions can be conjoined with AND, OR, and NOT conjunctions. |
| `orderBy` | query | string | no | Optional. Orders the result by name or create_time fields. If not specified, the ordering is undefined. |
| `pageSize` | query | integer (int32) | no | Optional. Maximum number of AspectTypes to return. The service may return fewer than this value. If unspecified, the service returns at most 10 AspectTypes. The maximum value is 1000; values above 1000 will be coerced to 1000. |
| `pageToken` | query | string | no | Optional. Page token received from a previous ListAspectTypes call. Provide this to retrieve the subsequent page. When paginating, all other parameters you provide to ListAspectTypes must match the call that provided the page token. |

### `dataplex.projects.locations.aspectTypes.patch`

- Versions: v1
- `PATCH https://dataplex.googleapis.com/v1/{+name}`
- Updates an AspectType.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/dataplex.read-write`
- Request: `GoogleCloudDataplexV1AspectType`; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Output only. The relative resource name of the AspectType, of the form: projects/{project_number}/locations/{location_id}/aspectTypes/{aspect_type_id}. |
| `updateMask` | query | string (google-fieldmask) | yes | Required. Mask of fields to update. |
| `validateOnly` | query | boolean | no | Optional. Only validate the request, but do not perform mutations. The default is false. |

### `dataplex.projects.locations.aspectTypes.setIamPolicy`

- Versions: v1
- `POST https://dataplex.googleapis.com/v1/{+resource}:setIamPolicy`
- Sets the access control policy on the specified resource. Replaces any existing policy.Can return NOT_FOUND, INVALID_ARGUMENT, and PERMISSION_DENIED errors.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/dataplex.read-write`
- Request: `GoogleIamV1SetIamPolicyRequest`; Response: `GoogleIamV1Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `dataplex.projects.locations.aspectTypes.testIamPermissions`

- Versions: v1
- `POST https://dataplex.googleapis.com/v1/{+resource}:testIamPermissions`
- Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a NOT_FOUND error.Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/dataplex.read-write`
- Request: `GoogleIamV1TestIamPermissionsRequest`; Response: `GoogleIamV1TestIamPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `dataplex.projects.locations.changeRequests.approve`

- Versions: v1
- `POST https://dataplex.googleapis.com/v1/{+name}:approve`
- Approves a ChangeRequest.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/dataplex.read-write`
- Request: `GoogleCloudDataplexV1ApproveChangeRequestRequest`; Response: `GoogleCloudDataplexV1ChangeRequest`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the ChangeRequest to approve. |

### `dataplex.projects.locations.changeRequests.delete`

- Versions: v1
- `DELETE https://dataplex.googleapis.com/v1/{+name}`
- Deletes a ChangeRequest.Behavior depends on the caller's permissions and the resource's state: 1. Callers with dataplex.changeRequests.delete can only delete ChangeRequests in the NEW state. 2. Callers with the dataplex.changeRequests.adminDelete permission can delete ChangeRequests regardless of their state.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/dataplex.read-write`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the ChangeRequest to delete. Format: projects/{project_number}/locations/{location_id}/changeRequests/{change_request_id} |
| `etag` | query | string | no | Optional. The etag of the ChangeRequest. |

### `dataplex.projects.locations.changeRequests.get`

- Versions: v1
- `GET https://dataplex.googleapis.com/v1/{+name}`
- Gets a ChangeRequest.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/dataplex.read-write`
- Request: —; Response: `GoogleCloudDataplexV1ChangeRequest`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the ChangeRequest to retrieve. Format: projects/{project_number}/locations/{location_id}/changeRequests/{change_request_id} |

### `dataplex.projects.locations.changeRequests.getIamPolicy`

- Versions: v1
- `GET https://dataplex.googleapis.com/v1/{+resource}:getIamPolicy`
- Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/dataplex.read-write`
- Request: —; Response: `GoogleIamV1Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |
| `options.requestedPolicyVersion` | query | integer (int32) | no | Optional. The maximum policy version that will be used to format the policy.Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected.Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset.The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1.To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |

### `dataplex.projects.locations.changeRequests.list`

- Versions: v1
- `GET https://dataplex.googleapis.com/v1/{+parent}/changeRequests`
- Lists ChangeRequests.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/dataplex.read-write`
- Request: —; Response: `GoogleCloudDataplexV1ListChangeRequestsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent, which owns this collection of ChangeRequests. Format: projects/{project_number}/locations/{location_id} |
| `filter` | query | string | no | Optional. Filter request. Supports filtering by: state, author, resource, create_time, update_time. |
| `orderBy` | query | string | no | Optional. Order by fields for the result. |
| `pageSize` | query | integer (int32) | no | Optional. Maximum number of ChangeRequests to return. The service may return fewer. |
| `pageToken` | query | string | no | Optional. Page token received from a previous ListChangeRequests call. |

### `dataplex.projects.locations.changeRequests.patch`

- Versions: v1
- `PATCH https://dataplex.googleapis.com/v1/{+name}`
- Updates a ChangeRequest. Only allowed when the state is NEW.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/dataplex.read-write`
- Request: `GoogleCloudDataplexV1ChangeRequest`; Response: `GoogleCloudDataplexV1ChangeRequest`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. The relative resource name of the ChangeRequest, of the form: projects/{project_number}/locations/{location_id}/changeRequests/{change_request_id} |
| `updateMask` | query | string (google-fieldmask) | no | Optional. The list of fields to update. |

### `dataplex.projects.locations.changeRequests.reject`

- Versions: v1
- `POST https://dataplex.googleapis.com/v1/{+name}:reject`
- Rejects a ChangeRequest.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/dataplex.read-write`
- Request: `GoogleCloudDataplexV1RejectChangeRequestRequest`; Response: `GoogleCloudDataplexV1ChangeRequest`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the ChangeRequest to reject. |

### `dataplex.projects.locations.changeRequests.setIamPolicy`

- Versions: v1
- `POST https://dataplex.googleapis.com/v1/{+resource}:setIamPolicy`
- Sets the access control policy on the specified resource. Replaces any existing policy.Can return NOT_FOUND, INVALID_ARGUMENT, and PERMISSION_DENIED errors.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/dataplex.read-write`
- Request: `GoogleIamV1SetIamPolicyRequest`; Response: `GoogleIamV1Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `dataplex.projects.locations.changeRequests.testIamPermissions`

- Versions: v1
- `POST https://dataplex.googleapis.com/v1/{+resource}:testIamPermissions`
- Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a NOT_FOUND error.Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/dataplex.read-write`
- Request: `GoogleIamV1TestIamPermissionsRequest`; Response: `GoogleIamV1TestIamPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `dataplex.projects.locations.dataAttributeBindings.getIamPolicy`

- Versions: v1
- `GET https://dataplex.googleapis.com/v1/{+resource}:getIamPolicy`
- Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/dataplex.read-write`
- Request: —; Response: `GoogleIamV1Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |
| `options.requestedPolicyVersion` | query | integer (int32) | no | Optional. The maximum policy version that will be used to format the policy.Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected.Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset.The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1.To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |

### `dataplex.projects.locations.dataAttributeBindings.setIamPolicy`

- Versions: v1
- `POST https://dataplex.googleapis.com/v1/{+resource}:setIamPolicy`
- Sets the access control policy on the specified resource. Replaces any existing policy.Can return NOT_FOUND, INVALID_ARGUMENT, and PERMISSION_DENIED errors.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/dataplex.read-write`
- Request: `GoogleIamV1SetIamPolicyRequest`; Response: `GoogleIamV1Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `dataplex.projects.locations.dataAttributeBindings.testIamPermissions`

- Versions: v1
- `POST https://dataplex.googleapis.com/v1/{+resource}:testIamPermissions`
- Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a NOT_FOUND error.Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/dataplex.read-write`
- Request: `GoogleIamV1TestIamPermissionsRequest`; Response: `GoogleIamV1TestIamPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `dataplex.projects.locations.dataDomains.bindings.create`

- Versions: v1
- `POST https://dataplex.googleapis.com/v1/{+parent}/bindings`
- Creates a DataDomainBinding resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/dataplex.read-write`
- Request: `GoogleCloudDataplexV1DataDomainBinding`; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The resource name of the parent DataDomain: projects/{project_id_or_number}/locations/{location_id}/dataDomains/{data_domain_id} |
| `dataDomainBindingId` | query | string | no | Optional. DataDomainBinding identifier. \* Must contain only lowercase letters, numbers and hyphens. \* Must start with a letter. \* Must be between 1-63 characters. \* Must end with a number or a letter. \* Must be unique within the parent DataDomain. If not provided, a system-generated UUID will be used. |
| `validateOnly` | query | boolean | no | Optional. Only validate the request, but do not perform mutations. |

### `dataplex.projects.locations.dataDomains.bindings.delete`

- Versions: v1
- `DELETE https://dataplex.googleapis.com/v1/{+name}`
- Deletes a DataDomainBinding resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/dataplex.read-write`
- Request: —; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the DataDomainBinding: projects/{project_id_or_number}/locations/{location_id}/dataDomains/{data_domain_id}/bindings/{binding_id} |

### `dataplex.projects.locations.dataDomains.bindings.get`

- Versions: v1
- `GET https://dataplex.googleapis.com/v1/{+name}`
- Retrieves a DataDomainBinding resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/dataplex.read-write`
- Request: —; Response: `GoogleCloudDataplexV1DataDomainBinding`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the DataDomainBinding: projects/{project_id_or_number}/locations/{location_id}/dataDomains/{data_domain_id}/bindings/{binding_id} |

### `dataplex.projects.locations.dataDomains.bindings.list`

- Versions: v1
- `GET https://dataplex.googleapis.com/v1/{+parent}/bindings`
- Lists DataDomainBinding resources under a DataDomain.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/dataplex.read-write`
- Request: —; Response: `GoogleCloudDataplexV1ListDataDomainBindingsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The resource name of the parent DataDomain: projects/{project_id_or_number}/locations/{location_id}/dataDomains/{data_domain_id} |
| `filter` | query | string | no | Optional. Filter request. |
| `orderBy` | query | string | no | Optional. Order by fields for the result. |
| `pageSize` | query | integer (int32) | no | Optional. Maximum number of DataDomainBindings to return. The service may return fewer. If unspecified, at most 50 bindings will be returned. The maximum value is 100; values above 100 will be coerced to 100. |
| `pageToken` | query | string | no | Optional. Page token received from a previous ListDataDomainBindings call. |

### `dataplex.projects.locations.dataDomains.create`

- Versions: v1
- `POST https://dataplex.googleapis.com/v1/{+parent}/dataDomains`
- Creates a DataDomain resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/dataplex.read-write`
- Request: `GoogleCloudDataplexV1DataDomain`; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The resource name of the parent location: projects/{project_id_or_number}/locations/{location_id} |
| `dataDomainId` | query | string | yes | Required. DataDomain identifier. \* Must contain only lowercase letters, numbers and hyphens. \* Must start with a letter. \* Must be between 1-63 characters. \* Must end with a number or a letter. \* Must be unique within the project and location. |
| `validateOnly` | query | boolean | no | Optional. Only validate the request, but do not perform mutations. |

### `dataplex.projects.locations.dataDomains.delete`

- Versions: v1
- `DELETE https://dataplex.googleapis.com/v1/{+name}`
- Deletes a DataDomain resource (allowed only when there are no bindings).
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/dataplex.read-write`
- Request: —; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the DataDomain: projects/{project_id_or_number}/locations/{location_id}/dataDomains/{data_domain_id} |

### `dataplex.projects.locations.dataDomains.get`

- Versions: v1
- `GET https://dataplex.googleapis.com/v1/{+name}`
- Retrieves a DataDomain resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/dataplex.read-write`
- Request: —; Response: `GoogleCloudDataplexV1DataDomain`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the DataDomain: projects/{project_id_or_number}/locations/{location_id}/dataDomains/{data_domain_id} |

### `dataplex.projects.locations.dataDomains.getIamPolicy`

- Versions: v1
- `GET https://dataplex.googleapis.com/v1/{+resource}:getIamPolicy`
- Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/dataplex.read-write`
- Request: —; Response: `GoogleIamV1Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |
| `options.requestedPolicyVersion` | query | integer (int32) | no | Optional. The maximum policy version that will be used to format the policy.Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected.Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset.The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1.To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |

### `dataplex.projects.locations.dataDomains.list`

- Versions: v1
- `GET https://dataplex.googleapis.com/v1/{+parent}/dataDomains`
- Lists DataDomain resources in a project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/dataplex.read-write`
- Request: —; Response: `GoogleCloudDataplexV1ListDataDomainsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The resource name of the parent location: projects/{project_id_or_number}/locations/{location_id} |
| `filter` | query | string | no | Optional. Filter request. Supports filter by parent_data_domain. |
| `orderBy` | query | string | no | Optional. Order by fields for the result. |
| `pageSize` | query | integer (int32) | no | Optional. Maximum number of DataDomains to return. The service may return fewer. If unspecified, at most 50 domains will be returned. The maximum value is 100; values above 100 will be coerced to 100. |
| `pageToken` | query | string | no | Optional. Page token received from a previous ListDataDomains call. |

### `dataplex.projects.locations.dataDomains.patch`

- Versions: v1
- `PATCH https://dataplex.googleapis.com/v1/{+name}`
- Updates a DataDomain resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/dataplex.read-write`
- Request: `GoogleCloudDataplexV1DataDomain`; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. The relative resource name of the DataDomain, of the form: projects/{project_id_or_number}/locations/{location_id}/dataDomains/{data_domain_id} |
| `updateMask` | query | string (google-fieldmask) | no | Optional. Mask of fields to update. |
| `validateOnly` | query | boolean | no | Optional. Only validate the request, but do not perform mutations. |

### `dataplex.projects.locations.dataDomains.setIamPolicy`

- Versions: v1
- `POST https://dataplex.googleapis.com/v1/{+resource}:setIamPolicy`
- Sets the access control policy on the specified resource. Replaces any existing policy.Can return NOT_FOUND, INVALID_ARGUMENT, and PERMISSION_DENIED errors.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/dataplex.read-write`
- Request: `GoogleIamV1SetIamPolicyRequest`; Response: `GoogleIamV1Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `dataplex.projects.locations.dataDomains.testIamPermissions`

- Versions: v1
- `POST https://dataplex.googleapis.com/v1/{+resource}:testIamPermissions`
- Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a NOT_FOUND error.Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/dataplex.read-write`
- Request: `GoogleIamV1TestIamPermissionsRequest`; Response: `GoogleIamV1TestIamPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `dataplex.projects.locations.dataProducts.create`

- Versions: v1
- `POST https://dataplex.googleapis.com/v1/{+parent}/dataProducts`
- Creates a data product.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/dataplex.read-write`
- Request: `GoogleCloudDataplexV1DataProduct`; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource where this data product will be created. Format: projects/{project_id_or_number}/locations/{location_id} |
| `dataProductId` | query | string | no | Optional. The ID of the data product to create.The ID must conform to RFC-1034 and contain only lower-case letters (a-z), numbers (0-9), or hyphens, with the first character a letter, the last a letter or a number, and a 63 character maximum. Characters outside of ASCII are not permitted. Valid format regex: ^\[a-z\](\[a-z0-9-\]{0,61}\[a-z0-9\])?$ If not provided, a system generated ID will be used. |
| `validateOnly` | query | boolean | no | Optional. Validates the request without actually creating the data product. Default: false. |

### `dataplex.projects.locations.dataProducts.dataAssets.create`

- Versions: v1
- `POST https://dataplex.googleapis.com/v1/{+parent}/dataAssets`
- Creates a data asset.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/dataplex.read-write`
- Request: `GoogleCloudDataplexV1DataAsset`; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource where this data asset will be created. Format: projects/{project_id_or_number}/locations/{location_id}/dataProducts/{data_product_id} |
| `dataAssetId` | query | string | no | Optional. The ID of the data asset to create.The ID must conform to RFC-1034 and contain only lower-case letters (a-z), numbers (0-9), or hyphens, with the first character a letter, the last a letter or a number, and a 63 character maximum. Characters outside of ASCII are not permitted. Valid format regex: ^\[a-z\](\[a-z0-9-\]{0,61}\[a-z0-9\])?$ If not provided, a system generated ID will be used. |
| `validateOnly` | query | boolean | no | Optional. Validates the request without actually creating the data asset. Defaults to false. |

### `dataplex.projects.locations.dataProducts.dataAssets.delete`

- Versions: v1
- `DELETE https://dataplex.googleapis.com/v1/{+name}`
- Deletes a data asset.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/dataplex.read-write`
- Request: —; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the data asset to delete. Format: projects/{project_id_or_number}/locations/{location_id}/dataProducts/{data_product_id}/dataAssets/{data_asset_id} |
| `etag` | query | string | no | Optional. The etag of the data asset. If this is provided, it must match the server's etag. If the etag is provided and does not match the server-computed etag, the request must fail with a ABORTED error code. |
| `validateOnly` | query | boolean | no | Optional. Validates the request without actually deleting the data asset. Defaults to false. |

### `dataplex.projects.locations.dataProducts.dataAssets.get`

- Versions: v1
- `GET https://dataplex.googleapis.com/v1/{+name}`
- Gets a data asset.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`, `https://www.googleapis.com/auth/dataplex.read-write`, `https://www.googleapis.com/auth/dataplex.readonly`
- Request: —; Response: `GoogleCloudDataplexV1DataAsset`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the data asset to retrieve. Format: projects/{project_id_or_number}/locations/{location_id}/dataProducts/{data_product_id}/dataAssets/{data_asset_id} |

### `dataplex.projects.locations.dataProducts.dataAssets.list`

- Versions: v1
- `GET https://dataplex.googleapis.com/v1/{+parent}/dataAssets`
- Lists data assets for a given data product.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`, `https://www.googleapis.com/auth/dataplex.read-write`, `https://www.googleapis.com/auth/dataplex.readonly`
- Request: —; Response: `GoogleCloudDataplexV1ListDataAssetsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent, which has this collection of data assets. Format: projects/{project_id_or_number}/locations/{location_id}/dataProducts/{data_product_id} |
| `filter` | query | string | no | Optional. Filter expression that filters data assets listed in the response. |
| `orderBy` | query | string | no | Optional. Order by expression that orders data assets listed in the response.Supported order_by fields are: name or create_time.If not specified, the ordering is undefined. |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of data assets to return. The service may return fewer than this value. If unspecified, at most 50 data assets will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. |
| `pageToken` | query | string | no | Optional. A page token, received from a previous ListDataAssets call. Provide this to retrieve the subsequent page.When paginating, all other parameters provided to ListDataAssets must match the call that provided the page token. |

### `dataplex.projects.locations.dataProducts.dataAssets.patch`

- Versions: v1
- `PATCH https://dataplex.googleapis.com/v1/{+name}`
- Updates a data asset.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/dataplex.read-write`
- Request: `GoogleCloudDataplexV1DataAsset`; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. Resource name of the data asset. Format: projects/{project_id_or_number}/locations/{location_id}/dataProducts/{data_product_id}/dataAssets/{data_asset_id} |
| `updateMask` | query | string (google-fieldmask) | no | Optional. The list of fields to update. If this is empty or not set, then all the fields will be updated. |
| `validateOnly` | query | boolean | no | Optional. Validates the request without actually updating the data asset. Defaults to false. |

### `dataplex.projects.locations.dataProducts.delete`

- Versions: v1
- `DELETE https://dataplex.googleapis.com/v1/{+name}`
- Deletes a data product. The deletion will fail if the data product is not empty (i.e. contains at least one data asset).
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/dataplex.read-write`
- Request: —; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the data product to delete. Format: projects/{project_id_or_number}/locations/{location_id}/dataProducts/{data_product_id} |
| `etag` | query | string | no | Optional. The etag of the data product.If an etag is provided and does not match the current etag of the data product, then the deletion will be blocked and an ABORTED error will be returned. |
| `validateOnly` | query | boolean | no | Optional. Validates the request without actually deleting the data product. Default: false. |

### `dataplex.projects.locations.dataProducts.get`

- Versions: v1
- `GET https://dataplex.googleapis.com/v1/{+name}`
- Gets a data product.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`, `https://www.googleapis.com/auth/dataplex.read-write`, `https://www.googleapis.com/auth/dataplex.readonly`
- Request: —; Response: `GoogleCloudDataplexV1DataProduct`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the data product to retrieve. Format: projects/{project_id_or_number}/locations/{location_id}/dataProducts/{data_product_id} |

### `dataplex.projects.locations.dataProducts.getIamPolicy`

- Versions: v1
- `GET https://dataplex.googleapis.com/v1/{+resource}:getIamPolicy`
- Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/dataplex.read-write`
- Request: —; Response: `GoogleIamV1Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |
| `options.requestedPolicyVersion` | query | integer (int32) | no | Optional. The maximum policy version that will be used to format the policy.Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected.Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset.The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1.To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |

### `dataplex.projects.locations.dataProducts.list`

- Versions: v1
- `GET https://dataplex.googleapis.com/v1/{+parent}/dataProducts`
- Lists data products for a given project.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`, `https://www.googleapis.com/auth/dataplex.read-write`, `https://www.googleapis.com/auth/dataplex.readonly`
- Request: —; Response: `GoogleCloudDataplexV1ListDataProductsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent, which has this collection of data products.Format: projects/{project_id_or_number}/locations/{location_id}.Supports listing across all locations with the wildcard - (hyphen) character. Example: projects/{project_id_or_number}/locations/- |
| `filter` | query | string | no | Optional. Filter expression that filters data products listed in the response.Example of using this filter is: display_name="my-data-product" |
| `orderBy` | query | string | no | Optional. Order by expression that orders data products listed in the response.Supported Order by fields are: name or create_time.If not specified, the ordering is undefined.Ordering by create_time is not supported when listing resources across locations (i.e. when request contains /locations/-). |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of data products to return. The service may return fewer than this value. If unspecified, at most 50 data products will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. |
| `pageToken` | query | string | no | Optional. A page token, received from a previous ListDataProducts call. Provide this to retrieve the subsequent page.When paginating, all other parameters provided to ListDataProducts must match the call that provided the page token. |

### `dataplex.projects.locations.dataProducts.patch`

- Versions: v1
- `PATCH https://dataplex.googleapis.com/v1/{+name}`
- Updates a data product.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/dataplex.read-write`
- Request: `GoogleCloudDataplexV1DataProduct`; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. Resource name of the data product. Format: projects/{project_id_or_number}/locations/{location_id}/dataProducts/{data_product_id}. |
| `updateMask` | query | string (google-fieldmask) | no | Optional. The list of fields to update. If this is empty or not set, then all the fields will be updated. |
| `validateOnly` | query | boolean | no | Optional. Validates the request without actually updating the data product. Default: false. |

### `dataplex.projects.locations.dataProducts.requestAccess`

- Versions: v1
- `POST https://dataplex.googleapis.com/v1/{+parent}:requestAccess`
- Requests access to a data product. This will trigger an access approval workflow, and the requester will need to wait for the approval to be granted before they will be able to access the data product assets.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/dataplex.read-write`
- Request: `GoogleCloudDataplexV1RequestDataProductAccessRequest`; Response: `GoogleCloudDataplexV1RequestDataProductAccessResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The resource name of the data product. Format: projects/{project_number}/locations/{location_id}/dataProducts/{data_product_id} |

### `dataplex.projects.locations.dataProducts.setIamPolicy`

- Versions: v1
- `POST https://dataplex.googleapis.com/v1/{+resource}:setIamPolicy`
- Sets the access control policy on the specified resource. Replaces any existing policy.Can return NOT_FOUND, INVALID_ARGUMENT, and PERMISSION_DENIED errors.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/dataplex.read-write`
- Request: `GoogleIamV1SetIamPolicyRequest`; Response: `GoogleIamV1Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `dataplex.projects.locations.dataProducts.testIamPermissions`

- Versions: v1
- `POST https://dataplex.googleapis.com/v1/{+resource}:testIamPermissions`
- Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a NOT_FOUND error.Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/dataplex.read-write`
- Request: `GoogleIamV1TestIamPermissionsRequest`; Response: `GoogleIamV1TestIamPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `dataplex.projects.locations.dataScans.create`

- Versions: v1
- `POST https://dataplex.googleapis.com/v1/{+parent}/dataScans`
- Creates a DataScan resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/dataplex.read-write`
- Request: `GoogleCloudDataplexV1DataScan`; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The resource name of the parent location: projects/{project}/locations/{location_id} where project refers to a project_id or project_number and location_id refers to a Google Cloud region. |
| `dataScanId` | query | string | no | Optional. DataScan identifier. If not provided, a unique ID will be generated with the prefix "data-scan-". Must contain only lowercase letters, numbers and hyphens. Must start with a letter. Must end with a number or a letter. Must be between 1-63 characters. Must be unique within the customer project / location. |
| `validateOnly` | query | boolean | no | Optional. Only validate the request, but do not perform mutations. The default is false. |

### `dataplex.projects.locations.dataScans.delete`

- Versions: v1
- `DELETE https://dataplex.googleapis.com/v1/{+name}`
- Deletes a DataScan resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/dataplex.read-write`
- Request: —; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the dataScan: projects/{project}/locations/{location_id}/dataScans/{data_scan_id} where project refers to a project_id or project_number and location_id refers to a Google Cloud region. |
| `force` | query | boolean | no | Optional. If set to true, any child resources of this data scan will also be deleted. (Otherwise, the request will only work if the data scan has no child resources.) |

### `dataplex.projects.locations.dataScans.generateDataQualityRules`

- Versions: v1
- `POST https://dataplex.googleapis.com/v1/{+name}:generateDataQualityRules`
- Generates recommended data quality rules based on the results of a data profiling scan.Use the recommendations to build rules for a data quality scan.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/dataplex.read-write`
- Request: `GoogleCloudDataplexV1GenerateDataQualityRulesRequest`; Response: `GoogleCloudDataplexV1GenerateDataQualityRulesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name must be one of the following: The name of a data scan with at least one successful, completed data profiling job The name of a successful, completed data profiling job (a data scan job where the job type is data profiling) |

### `dataplex.projects.locations.dataScans.get`

- Versions: v1
- `GET https://dataplex.googleapis.com/v1/{+name}`
- Gets a DataScan resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`, `https://www.googleapis.com/auth/dataplex.read-write`, `https://www.googleapis.com/auth/dataplex.readonly`
- Request: —; Response: `GoogleCloudDataplexV1DataScan`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the dataScan: projects/{project}/locations/{location_id}/dataScans/{data_scan_id} where project refers to a project_id or project_number and location_id refers to a Google Cloud region. |
| `view` | query | string enum | no | Optional. Select the DataScan view to return. Defaults to BASIC. Values: `DATA_SCAN_VIEW_UNSPECIFIED`, `BASIC`, `FULL`. |

### `dataplex.projects.locations.dataScans.getIamPolicy`

- Versions: v1
- `GET https://dataplex.googleapis.com/v1/{+resource}:getIamPolicy`
- Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/dataplex.read-write`
- Request: —; Response: `GoogleIamV1Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |
| `options.requestedPolicyVersion` | query | integer (int32) | no | Optional. The maximum policy version that will be used to format the policy.Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected.Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset.The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1.To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |

### `dataplex.projects.locations.dataScans.jobs.cancel`

- Versions: v1
- `POST https://dataplex.googleapis.com/v1/{+name}:cancel`
- Cancels a running/pending DataScan job.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/dataplex.read-write`
- Request: `GoogleCloudDataplexV1CancelDataScanJobRequest`; Response: `GoogleCloudDataplexV1CancelDataScanJobResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the DataScanJob: projects/{project_id_or_number}/locations/{location_id}/dataScans/{data_scan_id}/jobs/{data_scan_job_id} where project_id_or_number refers to a project_id or project_number and location_id refers to a Google Cloud region. |

### `dataplex.projects.locations.dataScans.jobs.generateDataQualityRules`

- Versions: v1
- `POST https://dataplex.googleapis.com/v1/{+name}:generateDataQualityRules`
- Generates recommended data quality rules based on the results of a data profiling scan.Use the recommendations to build rules for a data quality scan.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/dataplex.read-write`
- Request: `GoogleCloudDataplexV1GenerateDataQualityRulesRequest`; Response: `GoogleCloudDataplexV1GenerateDataQualityRulesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name must be one of the following: The name of a data scan with at least one successful, completed data profiling job The name of a successful, completed data profiling job (a data scan job where the job type is data profiling) |

### `dataplex.projects.locations.dataScans.jobs.get`

- Versions: v1
- `GET https://dataplex.googleapis.com/v1/{+name}`
- Gets a DataScanJob resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`, `https://www.googleapis.com/auth/dataplex.read-write`, `https://www.googleapis.com/auth/dataplex.readonly`
- Request: —; Response: `GoogleCloudDataplexV1DataScanJob`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the DataScanJob: projects/{project}/locations/{location_id}/dataScans/{data_scan_id}/jobs/{data_scan_job_id} where project refers to a project_id or project_number and location_id refers to a Google Cloud region. |
| `view` | query | string enum | no | Optional. Select the DataScanJob view to return. Defaults to BASIC. Values: `DATA_SCAN_JOB_VIEW_UNSPECIFIED`, `BASIC`, `FULL`. |

### `dataplex.projects.locations.dataScans.jobs.list`

- Versions: v1
- `GET https://dataplex.googleapis.com/v1/{+parent}/jobs`
- Lists DataScanJobs under the given DataScan.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`, `https://www.googleapis.com/auth/dataplex.read-write`, `https://www.googleapis.com/auth/dataplex.readonly`
- Request: —; Response: `GoogleCloudDataplexV1ListDataScanJobsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The resource name of the parent environment: projects/{project}/locations/{location_id}/dataScans/{data_scan_id} where project refers to a project_id or project_number and location_id refers to a Google Cloud region. |
| `filter` | query | string | no | Optional. An expression for filtering the results of the ListDataScanJobs request.If unspecified, all datascan jobs will be returned. Multiple filters can be applied (with AND, OR logical operators). Filters are case-sensitive.Allowed fields are: start_time end_timestart_time and end_time expect RFC-3339 formatted strings (e.g. 2018-10-08T18:30:00-07:00).For instance, 'start_time > 2018-10-08T00:00:00.123456789Z AND end_time < 2018-10-09T00:00:00.123456789Z' limits results to DataScanJobs between specified start and end times. |
| `pageSize` | query | integer (int32) | no | Optional. Maximum number of DataScanJobs to return. The service may return fewer than this value. If unspecified, at most 10 DataScanJobs will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. |
| `pageToken` | query | string | no | Optional. Page token received from a previous ListDataScanJobs call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to ListDataScanJobs must match the call that provided the page token. |

### `dataplex.projects.locations.dataScans.list`

- Versions: v1
- `GET https://dataplex.googleapis.com/v1/{+parent}/dataScans`
- Lists DataScans.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`, `https://www.googleapis.com/auth/dataplex.read-write`, `https://www.googleapis.com/auth/dataplex.readonly`
- Request: —; Response: `GoogleCloudDataplexV1ListDataScansResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The resource name of the parent location: projects/{project}/locations/{location_id} where project refers to a project_id or project_number and location_id refers to a Google Cloud region. |
| `filter` | query | string | no | Optional. Filter request. |
| `orderBy` | query | string | no | Optional. Order by fields (name or create_time) for the result. If not specified, the ordering is undefined. |
| `pageSize` | query | integer (int32) | no | Optional. Maximum number of dataScans to return. The service may return fewer than this value. If unspecified, at most 500 scans will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. |
| `pageToken` | query | string | no | Optional. Page token received from a previous ListDataScans call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to ListDataScans must match the call that provided the page token. |

### `dataplex.projects.locations.dataScans.patch`

- Versions: v1
- `PATCH https://dataplex.googleapis.com/v1/{+name}`
- Updates a DataScan resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/dataplex.read-write`
- Request: `GoogleCloudDataplexV1DataScan`; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Output only. Identifier. The relative resource name of the scan, of the form: projects/{project}/locations/{location_id}/dataScans/{datascan_id}, where project refers to a project_id or project_number and location_id refers to a Google Cloud region. |
| `updateMask` | query | string (google-fieldmask) | no | Optional. Mask of fields to update. |
| `validateOnly` | query | boolean | no | Optional. Only validate the request, but do not perform mutations. The default is false. |

### `dataplex.projects.locations.dataScans.run`

- Versions: v1
- `POST https://dataplex.googleapis.com/v1/{+name}:run`
- Runs an on-demand execution of a DataScan
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/dataplex.read-write`
- Request: `GoogleCloudDataplexV1RunDataScanRequest`; Response: `GoogleCloudDataplexV1RunDataScanResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the DataScan: projects/{project}/locations/{location_id}/dataScans/{data_scan_id}. where project refers to a project_id or project_number and location_id refers to a Google Cloud region.Only OnDemand data scans are allowed. |

### `dataplex.projects.locations.dataScans.setIamPolicy`

- Versions: v1
- `POST https://dataplex.googleapis.com/v1/{+resource}:setIamPolicy`
- Sets the access control policy on the specified resource. Replaces any existing policy.Can return NOT_FOUND, INVALID_ARGUMENT, and PERMISSION_DENIED errors.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/dataplex.read-write`
- Request: `GoogleIamV1SetIamPolicyRequest`; Response: `GoogleIamV1Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `dataplex.projects.locations.dataScans.testIamPermissions`

- Versions: v1
- `POST https://dataplex.googleapis.com/v1/{+resource}:testIamPermissions`
- Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a NOT_FOUND error.Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/dataplex.read-write`
- Request: `GoogleIamV1TestIamPermissionsRequest`; Response: `GoogleIamV1TestIamPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `dataplex.projects.locations.dataTaxonomies.attributes.getIamPolicy`

- Versions: v1
- `GET https://dataplex.googleapis.com/v1/{+resource}:getIamPolicy`
- Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/dataplex.read-write`
- Request: —; Response: `GoogleIamV1Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |
| `options.requestedPolicyVersion` | query | integer (int32) | no | Optional. The maximum policy version that will be used to format the policy.Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected.Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset.The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1.To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |

### `dataplex.projects.locations.dataTaxonomies.attributes.setIamPolicy`

- Versions: v1
- `POST https://dataplex.googleapis.com/v1/{+resource}:setIamPolicy`
- Sets the access control policy on the specified resource. Replaces any existing policy.Can return NOT_FOUND, INVALID_ARGUMENT, and PERMISSION_DENIED errors.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/dataplex.read-write`
- Request: `GoogleIamV1SetIamPolicyRequest`; Response: `GoogleIamV1Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `dataplex.projects.locations.dataTaxonomies.attributes.testIamPermissions`

- Versions: v1
- `POST https://dataplex.googleapis.com/v1/{+resource}:testIamPermissions`
- Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a NOT_FOUND error.Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/dataplex.read-write`
- Request: `GoogleIamV1TestIamPermissionsRequest`; Response: `GoogleIamV1TestIamPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `dataplex.projects.locations.dataTaxonomies.getIamPolicy`

- Versions: v1
- `GET https://dataplex.googleapis.com/v1/{+resource}:getIamPolicy`
- Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/dataplex.read-write`
- Request: —; Response: `GoogleIamV1Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |
| `options.requestedPolicyVersion` | query | integer (int32) | no | Optional. The maximum policy version that will be used to format the policy.Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected.Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset.The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1.To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |

### `dataplex.projects.locations.dataTaxonomies.setIamPolicy`

- Versions: v1
- `POST https://dataplex.googleapis.com/v1/{+resource}:setIamPolicy`
- Sets the access control policy on the specified resource. Replaces any existing policy.Can return NOT_FOUND, INVALID_ARGUMENT, and PERMISSION_DENIED errors.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/dataplex.read-write`
- Request: `GoogleIamV1SetIamPolicyRequest`; Response: `GoogleIamV1Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `dataplex.projects.locations.dataTaxonomies.testIamPermissions`

- Versions: v1
- `POST https://dataplex.googleapis.com/v1/{+resource}:testIamPermissions`
- Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a NOT_FOUND error.Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/dataplex.read-write`
- Request: `GoogleIamV1TestIamPermissionsRequest`; Response: `GoogleIamV1TestIamPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `dataplex.projects.locations.entryGroups.batchChangeMetadata`

- Versions: v1
- `POST https://dataplex.googleapis.com/v1/{+name}:batchChangeMetadata`
- Batch changes metadata within an EntryGroup.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/dataplex.read-write`
- Request: `GoogleCloudDataplexV1BatchChangeMetadataRequest`; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the EntryGroup on which the batch change applies. Format: projects/{project_number_or_id}/locations/{location_id}/entryGroups/{entry_group_id} |

### `dataplex.projects.locations.entryGroups.create`

- Versions: v1
- `POST https://dataplex.googleapis.com/v1/{+parent}/entryGroups`
- Creates an EntryGroup.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/dataplex.read-write`
- Request: `GoogleCloudDataplexV1EntryGroup`; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The resource name of the entryGroup, of the form: projects/{project_number}/locations/{location_id} where location_id refers to a Google Cloud region. |
| `entryGroupId` | query | string | yes | Required. EntryGroup identifier. |
| `validateOnly` | query | boolean | no | Optional. The service validates the request without performing any mutations. The default is false. |

### `dataplex.projects.locations.entryGroups.delete`

- Versions: v1
- `DELETE https://dataplex.googleapis.com/v1/{+name}`
- Deletes an EntryGroup.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/dataplex.read-write`
- Request: —; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the EntryGroup: projects/{project_number}/locations/{location_id}/entryGroups/{entry_group_id}. |
| `etag` | query | string | no | Optional. If the client provided etag value does not match the current etag value, the DeleteEntryGroupRequest method returns an ABORTED error response. |

### `dataplex.projects.locations.entryGroups.entries.create`

- Versions: v1
- `POST https://dataplex.googleapis.com/v1/{+parent}/entries`
- Creates an Entry.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/dataplex.read-write`
- Request: `GoogleCloudDataplexV1Entry`; Response: `GoogleCloudDataplexV1Entry`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The resource name of the parent Entry Group: projects/{project}/locations/{location}/entryGroups/{entry_group}. |
| `entryId` | query | string | yes | Required. Entry identifier. It has to be unique within an Entry Group.Entries corresponding to Google Cloud resources use an Entry ID format based on full resource names (https://cloud.google.com/apis/design/resource_names#full_resource_name). The format is a full resource name of the resource without the prefix double slashes in the API service name part of the full resource name. This allows retrieval of entries using their associated resource name.For example, if the full resource name of a resource is //library.googleapis.com/shelves/shelf1/books/book2, then the suggested entry_id is library.googleapis.com/shelves/shelf1/books/book2.It is also suggested to follow the same convention for entries corresponding to resources from providers or systems other than Google Cloud.The maximum size of the field is 4000 characters. |

### `dataplex.projects.locations.entryGroups.entries.delete`

- Versions: v1
- `DELETE https://dataplex.googleapis.com/v1/{+name}`
- Deletes an Entry.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/dataplex.read-write`
- Request: —; Response: `GoogleCloudDataplexV1Entry`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the Entry: projects/{project}/locations/{location}/entryGroups/{entry_group}/entries/{entry}. |

### `dataplex.projects.locations.entryGroups.entries.get`

- Versions: v1
- `GET https://dataplex.googleapis.com/v1/{+name}`
- Gets an Entry.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`, `https://www.googleapis.com/auth/dataplex.read-write`, `https://www.googleapis.com/auth/dataplex.readonly`
- Request: —; Response: `GoogleCloudDataplexV1Entry`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the Entry: projects/{project}/locations/{location}/entryGroups/{entry_group}/entries/{entry}. |
| `aspectTypes` | query | repeated string | no | Optional. Limits the aspects returned to the provided aspect types. It only works for CUSTOM view. |
| `paths` | query | repeated string | no | Optional. Limits the aspects returned to those associated with the provided paths within the Entry. It only works for CUSTOM view. |
| `view` | query | string enum | no | Optional. View to control which parts of an entry the service should return. Please check the limitations on returned aspects in the Entry view documentation. Amount of returned aspects depends on the selected Entry View. Values: `ENTRY_VIEW_UNSPECIFIED`, `BASIC`, `FULL`, `CUSTOM`, `ALL`. |

### `dataplex.projects.locations.entryGroups.entries.list`

- Versions: v1
- `GET https://dataplex.googleapis.com/v1/{+parent}/entries`
- Lists Entries within an EntryGroup.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`, `https://www.googleapis.com/auth/dataplex.read-write`, `https://www.googleapis.com/auth/dataplex.readonly`
- Request: —; Response: `GoogleCloudDataplexV1ListEntriesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The resource name of the parent Entry Group: projects/{project}/locations/{location}/entryGroups/{entry_group}. |
| `filter` | query | string | no | Optional. A filter on the entries to return. Filters are case-sensitive. You can filter the request by the following fields: entry_type entry_source.display_name parent_entryThe comparison operators are =, !=, <, >, <=, >=. The service compares strings according to lexical order.You can use the logical operators AND, OR, NOT in the filter.You can use Wildcard "\*", but for entry_type and parent_entry you need to provide the full project id or number.You cannot use parent_entry in conjunction with other fields.Example filter expressions: "entry_source.display_name=AnExampleDisplayName" "entry_type=projects/example-project/locations/global/entryTypes/example-entry_type" "entry_type=projects/example-project/locations/us/entryTypes/a\* OR entry_type=projects/another-project/locations/\*" "NOT entry_source.display_name=AnotherExampleDisplayName" "parent_entry=projects/example-project/locations/us/entryGroups/example-entry-group/entries/example-entry" |
| `pageSize` | query | integer (int32) | no | Optional. Number of items to return per page. If there are remaining results, the service returns a next_page_token. If unspecified, the service returns at most 10 Entries. The maximum value is 100; values above 100 will be coerced to 100. |
| `pageToken` | query | string | no | Optional. Page token received from a previous ListEntries call. Provide this to retrieve the subsequent page. |

### `dataplex.projects.locations.entryGroups.entries.patch`

- Versions: v1
- `PATCH https://dataplex.googleapis.com/v1/{+name}`
- Updates an Entry.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/dataplex.read-write`
- Request: `GoogleCloudDataplexV1Entry`; Response: `GoogleCloudDataplexV1Entry`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. The relative resource name of the entry, in the format projects/{project_id_or_number}/locations/{location_id}/entryGroups/{entry_group_id}/entries/{entry_id}. |
| `allowMissing` | query | boolean | no | Optional. If set to true and the entry doesn't exist, the service will create it. |
| `aspectKeys` | query | repeated string | no | Optional. The map keys of the Aspects which the service should modify. It supports the following syntaxes: - matches an aspect of the given type and empty path. @path - matches an aspect of the given type and specified path. For example, to attach an aspect to a field that is specified by the schema aspect, the path should have the format Schema.. @\* - matches aspects of the given type for all paths. \*@path - matches aspects of all types on the given path.The service will not remove existing aspects matching the syntax unless delete_missing_aspects is set to true.If this field is left empty, the service treats it as specifying exactly those Aspects present in the request. |
| `deleteMissingAspects` | query | boolean | no | Optional. If set to true and the aspect_keys specify aspect ranges, the service deletes any existing aspects from that range that weren't provided in the request. |
| `updateMask` | query | string (google-fieldmask) | no | Optional. Mask of fields to update. To update Aspects, the update_mask must contain the value "aspects".If the update_mask is empty, the service will update all modifiable fields present in the request. |

### `dataplex.projects.locations.entryGroups.entryLinks.create`

- Versions: v1
- `POST https://dataplex.googleapis.com/v1/{+parent}/entryLinks`
- Creates an Entry Link.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/dataplex.read-write`
- Request: `GoogleCloudDataplexV1EntryLink`; Response: `GoogleCloudDataplexV1EntryLink`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The resource name of the parent Entry Group: projects/{project_id_or_number}/locations/{location_id}/entryGroups/{entry_group_id}. |
| `entryLinkId` | query | string | yes | Required. Entry Link identifier \* Must contain only lowercase letters, numbers and hyphens. \* Must start with a letter. \* Must be between 1-63 characters. \* Must end with a number or a letter. \* Must be unique within the EntryGroup. |

### `dataplex.projects.locations.entryGroups.entryLinks.delete`

- Versions: v1
- `DELETE https://dataplex.googleapis.com/v1/{+name}`
- Deletes an Entry Link.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/dataplex.read-write`
- Request: —; Response: `GoogleCloudDataplexV1EntryLink`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the Entry Link: projects/{project_id_or_number}/locations/{location_id}/entryGroups/{entry_group_id}/entryLinks/{entry_link_id}. |

### `dataplex.projects.locations.entryGroups.entryLinks.get`

- Versions: v1
- `GET https://dataplex.googleapis.com/v1/{+name}`
- Gets an Entry Link.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`, `https://www.googleapis.com/auth/dataplex.read-write`, `https://www.googleapis.com/auth/dataplex.readonly`
- Request: —; Response: `GoogleCloudDataplexV1EntryLink`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the Entry Link: projects/{project_id_or_number}/locations/{location_id}/entryGroups/{entry_group_id}/entryLinks/{entry_link_id}. |

### `dataplex.projects.locations.entryGroups.entryLinks.patch`

- Versions: v1
- `PATCH https://dataplex.googleapis.com/v1/{+name}`
- Updates an Entry Link.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/dataplex.read-write`
- Request: `GoogleCloudDataplexV1EntryLink`; Response: `GoogleCloudDataplexV1EntryLink`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Output only. Immutable. Identifier. The relative resource name of the Entry Link, of the form: projects/{project_id_or_number}/locations/{location_id}/entryGroups/{entry_group_id}/entryLinks/{entry_link_id} |
| `allowMissing` | query | boolean | no | Optional. If set to true and the entry link doesn't exist, the service will create it. |
| `aspectKeys` | query | repeated string | no | Optional. The map keys of the Aspects which the service should modify. It should be the aspect type reference in the format {project_id_or_number}.{location_id}.{aspect_type_id}.If this field is left empty, the service treats it as specifying exactly those Aspects present in the request. |

### `dataplex.projects.locations.entryGroups.get`

- Versions: v1
- `GET https://dataplex.googleapis.com/v1/{+name}`
- Gets an EntryGroup.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`, `https://www.googleapis.com/auth/dataplex.read-write`, `https://www.googleapis.com/auth/dataplex.readonly`
- Request: —; Response: `GoogleCloudDataplexV1EntryGroup`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the EntryGroup: projects/{project_number}/locations/{location_id}/entryGroups/{entry_group_id}. |

### `dataplex.projects.locations.entryGroups.getIamPolicy`

- Versions: v1
- `GET https://dataplex.googleapis.com/v1/{+resource}:getIamPolicy`
- Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/dataplex.read-write`
- Request: —; Response: `GoogleIamV1Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |
| `options.requestedPolicyVersion` | query | integer (int32) | no | Optional. The maximum policy version that will be used to format the policy.Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected.Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset.The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1.To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |

### `dataplex.projects.locations.entryGroups.list`

- Versions: v1
- `GET https://dataplex.googleapis.com/v1/{+parent}/entryGroups`
- Lists EntryGroup resources in a project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`, `https://www.googleapis.com/auth/dataplex.read-write`, `https://www.googleapis.com/auth/dataplex.readonly`
- Request: —; Response: `GoogleCloudDataplexV1ListEntryGroupsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The resource name of the entryGroup location, of the form: projects/{project_number}/locations/{location_id} where location_id refers to a Google Cloud region. |
| `filter` | query | string | no | Optional. Filter request. |
| `orderBy` | query | string | no | Optional. Order by fields for the result. |
| `pageSize` | query | integer (int32) | no | Optional. Maximum number of EntryGroups to return. The service may return fewer than this value. If unspecified, the service returns at most 10 EntryGroups. The maximum value is 1000; values above 1000 will be coerced to 1000. |
| `pageToken` | query | string | no | Optional. Page token received from a previous ListEntryGroups call. Provide this to retrieve the subsequent page. When paginating, all other parameters you provide to ListEntryGroups must match the call that provided the page token. |

### `dataplex.projects.locations.entryGroups.patch`

- Versions: v1
- `PATCH https://dataplex.googleapis.com/v1/{+name}`
- Updates an EntryGroup.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/dataplex.read-write`
- Request: `GoogleCloudDataplexV1EntryGroup`; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Output only. The relative resource name of the EntryGroup, in the format projects/{project_id_or_number}/locations/{location_id}/entryGroups/{entry_group_id}. |
| `updateMask` | query | string (google-fieldmask) | yes | Required. Mask of fields to update. |
| `validateOnly` | query | boolean | no | Optional. The service validates the request, without performing any mutations. The default is false. |

### `dataplex.projects.locations.entryGroups.requestBatchMetadataChange`

- Versions: v1
- `POST https://dataplex.googleapis.com/v1/{+name}:requestBatchMetadataChange`
- Submits a catalog change request for multiple resources within an EntryGroup. This method creates a ChangeRequest resource that must be reviewed and approved before the proposed changes are applied.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/dataplex.read-write`
- Request: `GoogleCloudDataplexV1RequestBatchMetadataChangeRequest`; Response: `GoogleCloudDataplexV1RequestBatchMetadataChangeResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the Entry Group on which the change applies. Format: projects/{project}/locations/{location}/entryGroups/{entry_group} |

### `dataplex.projects.locations.entryGroups.setIamPolicy`

- Versions: v1
- `POST https://dataplex.googleapis.com/v1/{+resource}:setIamPolicy`
- Sets the access control policy on the specified resource. Replaces any existing policy.Can return NOT_FOUND, INVALID_ARGUMENT, and PERMISSION_DENIED errors.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/dataplex.read-write`
- Request: `GoogleIamV1SetIamPolicyRequest`; Response: `GoogleIamV1Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `dataplex.projects.locations.entryGroups.testIamPermissions`

- Versions: v1
- `POST https://dataplex.googleapis.com/v1/{+resource}:testIamPermissions`
- Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a NOT_FOUND error.Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/dataplex.read-write`
- Request: `GoogleIamV1TestIamPermissionsRequest`; Response: `GoogleIamV1TestIamPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `dataplex.projects.locations.entryLinkTypes.getIamPolicy`

- Versions: v1
- `GET https://dataplex.googleapis.com/v1/{+resource}:getIamPolicy`
- Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/dataplex.read-write`
- Request: —; Response: `GoogleIamV1Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |
| `options.requestedPolicyVersion` | query | integer (int32) | no | Optional. The maximum policy version that will be used to format the policy.Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected.Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset.The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1.To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |

### `dataplex.projects.locations.entryLinkTypes.setIamPolicy`

- Versions: v1
- `POST https://dataplex.googleapis.com/v1/{+resource}:setIamPolicy`
- Sets the access control policy on the specified resource. Replaces any existing policy.Can return NOT_FOUND, INVALID_ARGUMENT, and PERMISSION_DENIED errors.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/dataplex.read-write`
- Request: `GoogleIamV1SetIamPolicyRequest`; Response: `GoogleIamV1Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `dataplex.projects.locations.entryLinkTypes.testIamPermissions`

- Versions: v1
- `POST https://dataplex.googleapis.com/v1/{+resource}:testIamPermissions`
- Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a NOT_FOUND error.Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/dataplex.read-write`
- Request: `GoogleIamV1TestIamPermissionsRequest`; Response: `GoogleIamV1TestIamPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `dataplex.projects.locations.entryTypes.create`

- Versions: v1
- `POST https://dataplex.googleapis.com/v1/{+parent}/entryTypes`
- Creates an EntryType.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/dataplex.read-write`
- Request: `GoogleCloudDataplexV1EntryType`; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The resource name of the EntryType, of the form: projects/{project_number}/locations/{location_id} where location_id refers to a Google Cloud region. |
| `entryTypeId` | query | string | yes | Required. EntryType identifier. |
| `validateOnly` | query | boolean | no | Optional. The service validates the request without performing any mutations. The default is false. |

### `dataplex.projects.locations.entryTypes.delete`

- Versions: v1
- `DELETE https://dataplex.googleapis.com/v1/{+name}`
- Deletes an EntryType.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/dataplex.read-write`
- Request: —; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the EntryType: projects/{project_number}/locations/{location_id}/entryTypes/{entry_type_id}. |
| `etag` | query | string | no | Optional. If the client provided etag value does not match the current etag value, the DeleteEntryTypeRequest method returns an ABORTED error response. |

### `dataplex.projects.locations.entryTypes.get`

- Versions: v1
- `GET https://dataplex.googleapis.com/v1/{+name}`
- Gets an EntryType.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`, `https://www.googleapis.com/auth/dataplex.read-write`, `https://www.googleapis.com/auth/dataplex.readonly`
- Request: —; Response: `GoogleCloudDataplexV1EntryType`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the EntryType: projects/{project_number}/locations/{location_id}/entryTypes/{entry_type_id}. |

### `dataplex.projects.locations.entryTypes.getIamPolicy`

- Versions: v1
- `GET https://dataplex.googleapis.com/v1/{+resource}:getIamPolicy`
- Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/dataplex.read-write`
- Request: —; Response: `GoogleIamV1Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |
| `options.requestedPolicyVersion` | query | integer (int32) | no | Optional. The maximum policy version that will be used to format the policy.Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected.Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset.The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1.To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |

### `dataplex.projects.locations.entryTypes.list`

- Versions: v1
- `GET https://dataplex.googleapis.com/v1/{+parent}/entryTypes`
- Lists EntryType resources in a project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`, `https://www.googleapis.com/auth/dataplex.read-write`, `https://www.googleapis.com/auth/dataplex.readonly`
- Request: —; Response: `GoogleCloudDataplexV1ListEntryTypesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The resource name of the EntryType location, of the form: projects/{project_number}/locations/{location_id} where location_id refers to a Google Cloud region. |
| `filter` | query | string | no | Optional. Filter request. Filters are case-sensitive. The service supports the following formats: labels.key1 = "value1" labels:key1 name = "value"These restrictions can be conjoined with AND, OR, and NOT conjunctions. |
| `orderBy` | query | string | no | Optional. Orders the result by name or create_time fields. If not specified, the ordering is undefined. |
| `pageSize` | query | integer (int32) | no | Optional. Maximum number of EntryTypes to return. The service may return fewer than this value. If unspecified, the service returns at most 10 EntryTypes. The maximum value is 1000; values above 1000 will be coerced to 1000. |
| `pageToken` | query | string | no | Optional. Page token received from a previous ListEntryTypes call. Provide this to retrieve the subsequent page. When paginating, all other parameters you provided to ListEntryTypes must match the call that provided the page token. |

### `dataplex.projects.locations.entryTypes.patch`

- Versions: v1
- `PATCH https://dataplex.googleapis.com/v1/{+name}`
- Updates an EntryType.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/dataplex.read-write`
- Request: `GoogleCloudDataplexV1EntryType`; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Output only. The relative resource name of the EntryType, of the form: projects/{project_number}/locations/{location_id}/entryTypes/{entry_type_id}. |
| `updateMask` | query | string (google-fieldmask) | yes | Required. Mask of fields to update. |
| `validateOnly` | query | boolean | no | Optional. The service validates the request without performing any mutations. The default is false. |

### `dataplex.projects.locations.entryTypes.setIamPolicy`

- Versions: v1
- `POST https://dataplex.googleapis.com/v1/{+resource}:setIamPolicy`
- Sets the access control policy on the specified resource. Replaces any existing policy.Can return NOT_FOUND, INVALID_ARGUMENT, and PERMISSION_DENIED errors.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/dataplex.read-write`
- Request: `GoogleIamV1SetIamPolicyRequest`; Response: `GoogleIamV1Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `dataplex.projects.locations.entryTypes.testIamPermissions`

- Versions: v1
- `POST https://dataplex.googleapis.com/v1/{+resource}:testIamPermissions`
- Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a NOT_FOUND error.Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/dataplex.read-write`
- Request: `GoogleIamV1TestIamPermissionsRequest`; Response: `GoogleIamV1TestIamPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `dataplex.projects.locations.get`

- Versions: v1
- `GET https://dataplex.googleapis.com/v1/{+name}`
- Gets information about a location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/dataplex.read-write`
- Request: —; Response: `GoogleCloudLocationLocation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Resource name for the location. |

### `dataplex.projects.locations.glossaries.categories.create`

- Versions: v1
- `POST https://dataplex.googleapis.com/v1/{+parent}/categories`
- Creates a new GlossaryCategory resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/dataplex.read-write`
- Request: `GoogleCloudDataplexV1GlossaryCategory`; Response: `GoogleCloudDataplexV1GlossaryCategory`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource where this GlossaryCategory will be created. Format: projects/{project_id_or_number}/locations/{location_id}/glossaries/{glossary_id} where locationId refers to a Google Cloud region. |
| `categoryId` | query | string | yes | Required. GlossaryCategory identifier. |

### `dataplex.projects.locations.glossaries.categories.delete`

- Versions: v1
- `DELETE https://dataplex.googleapis.com/v1/{+name}`
- Deletes a GlossaryCategory resource. All the GlossaryCategories and GlossaryTerms nested directly under the specified GlossaryCategory will be moved one level up to the parent in the hierarchy.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/dataplex.read-write`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the GlossaryCategory to delete. Format: projects/{project_id_or_number}/locations/{location_id}/glossaries/{glossary_id}/categories/{category_id} |

### `dataplex.projects.locations.glossaries.categories.get`

- Versions: v1
- `GET https://dataplex.googleapis.com/v1/{+name}`
- Gets a GlossaryCategory resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`, `https://www.googleapis.com/auth/dataplex.read-write`, `https://www.googleapis.com/auth/dataplex.readonly`
- Request: —; Response: `GoogleCloudDataplexV1GlossaryCategory`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the GlossaryCategory to retrieve. Format: projects/{project_id_or_number}/locations/{location_id}/glossaries/{glossary_id}/categories/{category_id} |

### `dataplex.projects.locations.glossaries.categories.getIamPolicy`

- Versions: v1
- `GET https://dataplex.googleapis.com/v1/{+resource}:getIamPolicy`
- Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/dataplex.read-write`
- Request: —; Response: `GoogleIamV1Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |
| `options.requestedPolicyVersion` | query | integer (int32) | no | Optional. The maximum policy version that will be used to format the policy.Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected.Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset.The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1.To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |

### `dataplex.projects.locations.glossaries.categories.list`

- Versions: v1
- `GET https://dataplex.googleapis.com/v1/{+parent}/categories`
- Lists GlossaryCategory resources in a Glossary.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`, `https://www.googleapis.com/auth/dataplex.read-write`, `https://www.googleapis.com/auth/dataplex.readonly`
- Request: —; Response: `GoogleCloudDataplexV1ListGlossaryCategoriesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent, which has this collection of GlossaryCategories. Format: projects/{project_id_or_number}/locations/{location_id}/glossaries/{glossary_id} Location is the Google Cloud region. |
| `filter` | query | string | no | Optional. Filter expression that filters GlossaryCategories listed in the response. Filters are supported on the following fields: - immediate_parentExamples of using a filter are: - immediate_parent="projects/{project_id_or_number}/locations/{location_id}/glossaries/{glossary_id}" - immediate_parent="projects/{project_id_or_number}/locations/{location_id}/glossaries/{glossary_id}/categories/{category_id}"This will only return the GlossaryCategories that are directly nested under the specified parent. |
| `orderBy` | query | string | no | Optional. Order by expression that orders GlossaryCategories listed in the response. Order by fields are: name or create_time for the result. If not specified, the ordering is undefined. |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of GlossaryCategories to return. The service may return fewer than this value. If unspecified, at most 50 GlossaryCategories will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. |
| `pageToken` | query | string | no | Optional. A page token, received from a previous ListGlossaryCategories call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to ListGlossaryCategories must match the call that provided the page token. |

### `dataplex.projects.locations.glossaries.categories.patch`

- Versions: v1
- `PATCH https://dataplex.googleapis.com/v1/{+name}`
- Updates a GlossaryCategory resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/dataplex.read-write`
- Request: `GoogleCloudDataplexV1GlossaryCategory`; Response: `GoogleCloudDataplexV1GlossaryCategory`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Output only. Identifier. The resource name of the GlossaryCategory. Format: projects/{project_id_or_number}/locations/{location_id}/glossaries/{glossary_id}/categories/{category_id} |
| `updateMask` | query | string (google-fieldmask) | yes | Required. The list of fields to update. |

### `dataplex.projects.locations.glossaries.categories.setIamPolicy`

- Versions: v1
- `POST https://dataplex.googleapis.com/v1/{+resource}:setIamPolicy`
- Sets the access control policy on the specified resource. Replaces any existing policy.Can return NOT_FOUND, INVALID_ARGUMENT, and PERMISSION_DENIED errors.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/dataplex.read-write`
- Request: `GoogleIamV1SetIamPolicyRequest`; Response: `GoogleIamV1Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `dataplex.projects.locations.glossaries.categories.testIamPermissions`

- Versions: v1
- `POST https://dataplex.googleapis.com/v1/{+resource}:testIamPermissions`
- Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a NOT_FOUND error.Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/dataplex.read-write`
- Request: `GoogleIamV1TestIamPermissionsRequest`; Response: `GoogleIamV1TestIamPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `dataplex.projects.locations.glossaries.create`

- Versions: v1
- `POST https://dataplex.googleapis.com/v1/{+parent}/glossaries`
- Creates a new Glossary resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/dataplex.read-write`
- Request: `GoogleCloudDataplexV1Glossary`; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource where this Glossary will be created. Format: projects/{project_id_or_number}/locations/{location_id} where location_id refers to a Google Cloud region. |
| `glossaryId` | query | string | yes | Required. Glossary ID: Glossary identifier. |
| `validateOnly` | query | boolean | no | Optional. Validates the request without actually creating the Glossary. Default: false. |

### `dataplex.projects.locations.glossaries.delete`

- Versions: v1
- `DELETE https://dataplex.googleapis.com/v1/{+name}`
- Deletes a Glossary resource. All the categories and terms within the Glossary must be deleted before the Glossary can be deleted.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/dataplex.read-write`
- Request: —; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the Glossary to delete. Format: projects/{project_id_or_number}/locations/{location_id}/glossaries/{glossary_id} |
| `etag` | query | string | no | Optional. The etag of the Glossary. If this is provided, it must match the server's etag. If the etag is provided and does not match the server-computed etag, the request must fail with a ABORTED error code. |

### `dataplex.projects.locations.glossaries.get`

- Versions: v1
- `GET https://dataplex.googleapis.com/v1/{+name}`
- Gets a Glossary resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`, `https://www.googleapis.com/auth/dataplex.read-write`, `https://www.googleapis.com/auth/dataplex.readonly`
- Request: —; Response: `GoogleCloudDataplexV1Glossary`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the Glossary to retrieve. Format: projects/{project_id_or_number}/locations/{location_id}/glossaries/{glossary_id} |

### `dataplex.projects.locations.glossaries.getIamPolicy`

- Versions: v1
- `GET https://dataplex.googleapis.com/v1/{+resource}:getIamPolicy`
- Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/dataplex.read-write`
- Request: —; Response: `GoogleIamV1Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |
| `options.requestedPolicyVersion` | query | integer (int32) | no | Optional. The maximum policy version that will be used to format the policy.Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected.Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset.The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1.To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |

### Example request skeleton

Generated from the Discovery entry of `dataplex.organizations.locations.encryptionConfigs.get` (not in the official docs); replace the `{...}` path variables (URL-encode query values):

```bash
curl -X GET \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  "https://dataplex.googleapis.com/v1/{+name}"
```

## Notes

- Generated from the Discovery document(s) v1 of `dataplex` (retrieved 2026-11-14). Resources on this page: organizations, projects.
- The Required column is `yes` for path variables and required parameters, and `conditional` when the description says "Required if ..." (mutually exclusive alternatives), when a `parent.child` parameter is required only inside an optional parent message or one branch of a oneof. Path variables are `yes` unless a note below names an alternative route without them.
- Message schemas (the request and response types named above) are defined in the `schemas` section of the Discovery documents in Source.
- Regional endpoints: the Discovery document (`dataplex` v1, revision 20261106) also lists 50 endpoints of the form `https://dataplex.LOCATION.rep.googleapis.com/` (Regional Endpoint), for LOCATION in `africa-south1`, `asia-east1`, `asia-east2`, `asia-northeast1`, `asia-northeast2`, `asia-northeast3`, `asia-south1`, `asia-south2`, `asia-southeast1`, `asia-southeast2`, `asia-southeast3`, `asia-southeast4`, `australia-southeast1`, `australia-southeast2`, `eu`, `europe-central2`, `europe-north1`, `europe-north2`, `europe-southwest1`, `europe-west1`, `europe-west10`, `europe-west12`, `europe-west15`, `europe-west2`, `europe-west3`, `europe-west4`, `europe-west6`, `europe-west8`, `europe-west9`, `me-central1`, `me-central2`, `me-west1`, `northamerica-northeast1`, `northamerica-northeast2`, `northamerica-south1`, `southamerica-east1`, `southamerica-west1`, `us`, `us-central1`, `us-central2`, `us-east1`, `us-east4`, `us-east5`, `us-east7`, `us-south1`, `us-west1`, `us-west2`, `us-west3`, `us-west4`, `us-west8`. The method URLs above use the global host `https://dataplex.googleapis.com/`; to send a request through one of these endpoints, replace the host with the endpoint for the resource's location (for example `https://dataplex.africa-south1.rep.googleapis.com/`) and keep the path.
- Corrected from the source proto: the `aspectKeys` syntaxes (the `entries.patch` parameter and the `GoogleCloudDataplexV1UpdateEntryRequest` / `GoogleCloudDataplexV1ModifyEntryRequest` fields) lost the aspect type placeholder in the Discovery document, so the first syntax is empty and the next ones are shown as `@path` and `@*`, and the path format is shown as `Schema.`; the proto comments read "`<aspect_type_reference>` - matches an aspect of the given type and empty path.", "`<aspect_type_reference>@path` - matches an aspect of the given type and specified path. For example, to attach an aspect to a field that is specified by the `schema` aspect, the path should have the format `Schema.<field_name>`." and "`<aspect_type_reference>@*` - matches aspects of the given type for all paths." (`google/cloud/dataplex/v1/catalog.proto`, https://github.com/googleapis/googleapis/blob/5ce024537af135bb2a0d3228072dd660047956aa/google/cloud/dataplex/v1/catalog.proto, commit `5ce0245`, retrieved 2026-11-19).
- Source: https://dataplex.googleapis.com/$discovery/rest?version=v1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
