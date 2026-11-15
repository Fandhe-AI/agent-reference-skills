---
source: https://workstations.googleapis.com/$discovery/rest?version=v1
---

# Cloud Workstations API REST API (workstations)

## Signature / Usage

Base URL: `https://workstations.googleapis.com`. Methods are listed by `id`; the `Versions` line shows which API versions define the method (preferred: v1).

### `workstations.projects.locations.get`

- Versions: v1
- `GET https://workstations.googleapis.com/v1/{+name}`
- Gets information about a location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Location`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Resource name for the location. |

### `workstations.projects.locations.list`

- Versions: v1
- `GET https://workstations.googleapis.com/v1/{+name}/locations`
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

### `workstations.projects.locations.operations.cancel`

- Versions: v1, v1beta
- `POST https://workstations.googleapis.com/v1/{+name}:cancel`
- Starts asynchronous cancellation on a long-running operation. The server makes a best effort to cancel the operation, but success is not guaranteed. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. Clients can use Operations.GetOperation or other methods to check whether the cancellation succeeded or whether the operation completed despite cancellation. On successful cancellation, the operation is not deleted; instead, it becomes an operation with an Operation.error value with a google.rpc.Status.code of `1`, corresponding to `Code.CANCELLED`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `CancelOperationRequest`; Response: `GoogleProtobufEmpty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource to be cancelled. |

### `workstations.projects.locations.operations.delete`

- Versions: v1, v1beta
- `DELETE https://workstations.googleapis.com/v1/{+name}`
- Deletes a long-running operation. This method indicates that the client is no longer interested in the operation result. It does not cancel the operation. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleProtobufEmpty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource to be deleted. |

### `workstations.projects.locations.operations.get`

- Versions: v1, v1beta
- `GET https://workstations.googleapis.com/v1/{+name}`
- Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource. |

### `workstations.projects.locations.operations.list`

- Versions: v1, v1beta
- `GET https://workstations.googleapis.com/v1/{+name}/operations`
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

### `workstations.projects.locations.workstationClusters.create`

- Versions: v1, v1beta
- `POST https://workstations.googleapis.com/v1/{+parent}/workstationClusters`
- Creates a new workstation cluster.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `WorkstationCluster`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Parent resource name. |
| `validateOnly` | query | boolean | no | Optional. If set, validate the request and preview the result, but do not actually apply it. |
| `workstationClusterId` | query | string | yes | Required. ID to use for the workstation cluster. |

### `workstations.projects.locations.workstationClusters.delete`

- Versions: v1, v1beta
- `DELETE https://workstations.googleapis.com/v1/{+name}`
- Deletes the specified workstation cluster.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the workstation cluster to delete. |
| `etag` | query | string | no | Optional. If set, the request will be rejected if the latest version of the workstation cluster on the server does not have this ETag. |
| `force` | query | boolean | no | Optional. If set, any workstation configurations and workstations in the workstation cluster are also deleted. Otherwise, the request only works if the workstation cluster has no configurations or workstations. |
| `validateOnly` | query | boolean | no | Optional. If set, validate the request and preview the result, but do not apply it. |

### `workstations.projects.locations.workstationClusters.get`

- Versions: v1, v1beta
- `GET https://workstations.googleapis.com/v1/{+name}`
- Returns the requested workstation cluster.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `WorkstationCluster`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the requested resource. |

### `workstations.projects.locations.workstationClusters.list`

- Versions: v1, v1beta
- `GET https://workstations.googleapis.com/v1/{+parent}/workstationClusters`
- Returns all workstation clusters in the specified location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListWorkstationClustersResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Parent resource name. |
| `filter` | query | string | no | Optional. Filter the WorkstationClusters to be listed. Possible filters are described in https://google.aip.dev/160. |
| `pageSize` | query | integer (int32) | no | Optional. Maximum number of items to return. |
| `pageToken` | query | string | no | Optional. next_page_token value returned from a previous List request, if any. |

### `workstations.projects.locations.workstationClusters.patch`

- Versions: v1, v1beta
- `PATCH https://workstations.googleapis.com/v1/{+name}`
- Updates an existing workstation cluster.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `WorkstationCluster`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. Full name of this workstation cluster. |
| `allowMissing` | query | boolean | no | Optional. If set, and the workstation cluster is not found, a new workstation cluster will be created. In this situation, update_mask is ignored. |
| `updateMask` | query | string (google-fieldmask) | yes | Required. Mask that specifies which fields in the workstation cluster should be updated. |
| `validateOnly` | query | boolean | no | Optional. If set, validate the request and preview the result, but do not actually apply it. |

### `workstations.projects.locations.workstationClusters.workstationConfigs.create`

- Versions: v1, v1beta
- `POST https://workstations.googleapis.com/v1/{+parent}/workstationConfigs`
- Creates a new workstation configuration.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `WorkstationConfig`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Parent resource name. |
| `validateOnly` | query | boolean | no | Optional. If set, validate the request and preview the result, but do not actually apply it. |
| `workstationConfigId` | query | string | yes | Required. ID to use for the workstation configuration. |

### `workstations.projects.locations.workstationClusters.workstationConfigs.delete`

- Versions: v1, v1beta
- `DELETE https://workstations.googleapis.com/v1/{+name}`
- Deletes the specified workstation configuration.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the workstation configuration to delete. |
| `etag` | query | string | no | Optional. If set, the request is rejected if the latest version of the workstation configuration on the server does not have this ETag. |
| `force` | query | boolean | no | Optional. If set, any workstations in the workstation configuration are also deleted. Otherwise, the request works only if the workstation configuration has no workstations. |
| `validateOnly` | query | boolean | no | Optional. If set, validate the request and preview the result, but do not actually apply it. |

### `workstations.projects.locations.workstationClusters.workstationConfigs.get`

- Versions: v1, v1beta
- `GET https://workstations.googleapis.com/v1/{+name}`
- Returns the requested workstation configuration.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `WorkstationConfig`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the requested resource. |

### `workstations.projects.locations.workstationClusters.workstationConfigs.getIamPolicy`

- Versions: v1, v1beta
- `GET https://workstations.googleapis.com/v1/{+resource}:getIamPolicy`
- Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |
| `options.requestedPolicyVersion` | query | integer (int32) | no | Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |

### `workstations.projects.locations.workstationClusters.workstationConfigs.list`

- Versions: v1, v1beta
- `GET https://workstations.googleapis.com/v1/{+parent}/workstationConfigs`
- Returns all workstation configurations in the specified cluster.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListWorkstationConfigsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Parent resource name. |
| `filter` | query | string | no | Optional. Filter the WorkstationConfigs to be listed. Possible filters are described in https://google.aip.dev/160. |
| `pageSize` | query | integer (int32) | no | Optional. Maximum number of items to return. |
| `pageToken` | query | string | no | Optional. next_page_token value returned from a previous List request, if any. |

### `workstations.projects.locations.workstationClusters.workstationConfigs.listUsable`

- Versions: v1, v1beta
- `GET https://workstations.googleapis.com/v1/{+parent}/workstationConfigs:listUsable`
- Returns all workstation configurations in the specified cluster on which the caller has the "workstations.workstation.create" permission.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListUsableWorkstationConfigsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Parent resource name. |
| `pageSize` | query | integer (int32) | no | Optional. Maximum number of items to return. |
| `pageToken` | query | string | no | Optional. next_page_token value returned from a previous List request, if any. |

### `workstations.projects.locations.workstationClusters.workstationConfigs.patch`

- Versions: v1, v1beta
- `PATCH https://workstations.googleapis.com/v1/{+name}`
- Updates an existing workstation configuration.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `WorkstationConfig`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. Full name of this workstation configuration. |
| `allowMissing` | query | boolean | no | Optional. If set and the workstation configuration is not found, a new workstation configuration will be created. In this situation, update_mask is ignored. |
| `updateMask` | query | string (google-fieldmask) | yes | Required. Mask specifying which fields in the workstation configuration should be updated. |
| `validateOnly` | query | boolean | no | Optional. If set, validate the request and preview the result, but do not actually apply it. |

### `workstations.projects.locations.workstationClusters.workstationConfigs.setIamPolicy`

- Versions: v1, v1beta
- `POST https://workstations.googleapis.com/v1/{+resource}:setIamPolicy`
- Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `SetIamPolicyRequest`; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `workstations.projects.locations.workstationClusters.workstationConfigs.testIamPermissions`

- Versions: v1, v1beta
- `POST https://workstations.googleapis.com/v1/{+resource}:testIamPermissions`
- Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `TestIamPermissionsRequest`; Response: `TestIamPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `workstations.projects.locations.workstationClusters.workstationConfigs.workstations.create`

- Versions: v1, v1beta
- `POST https://workstations.googleapis.com/v1/{+parent}/workstations`
- Creates a new workstation.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Workstation`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Parent resource name. |
| `validateOnly` | query | boolean | no | Optional. If set, validate the request and preview the result, but do not actually apply it. |
| `workstationId` | query | string | yes | Required. ID to use for the workstation. |

### `workstations.projects.locations.workstationClusters.workstationConfigs.workstations.delete`

- Versions: v1, v1beta
- `DELETE https://workstations.googleapis.com/v1/{+name}`
- Deletes the specified workstation.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the workstation to delete. |
| `etag` | query | string | no | Optional. If set, the request will be rejected if the latest version of the workstation on the server does not have this ETag. |
| `validateOnly` | query | boolean | no | Optional. If set, validate the request and preview the result, but do not actually apply it. |

### `workstations.projects.locations.workstationClusters.workstationConfigs.workstations.generateAccessToken`

- Versions: v1, v1beta
- `POST https://workstations.googleapis.com/v1/{+workstation}:generateAccessToken`
- Returns a short-lived credential that can be used to send authenticated and authorized traffic to a workstation. Once generated this token cannot be revoked and is good for the lifetime of the token.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GenerateAccessTokenRequest`; Response: `GenerateAccessTokenResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `workstation` | path | string | yes | Required. Name of the workstation for which the access token should be generated. |

### `workstations.projects.locations.workstationClusters.workstationConfigs.workstations.get`

- Versions: v1, v1beta
- `GET https://workstations.googleapis.com/v1/{+name}`
- Returns the requested workstation.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Workstation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the requested resource. |

### `workstations.projects.locations.workstationClusters.workstationConfigs.workstations.getIamPolicy`

- Versions: v1, v1beta
- `GET https://workstations.googleapis.com/v1/{+resource}:getIamPolicy`
- Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |
| `options.requestedPolicyVersion` | query | integer (int32) | no | Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |

### `workstations.projects.locations.workstationClusters.workstationConfigs.workstations.list`

- Versions: v1, v1beta
- `GET https://workstations.googleapis.com/v1/{+parent}/workstations`
- Returns all Workstations using the specified workstation configuration.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListWorkstationsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Parent resource name. |
| `filter` | query | string | no | Optional. Filter the Workstations to be listed. Possible filters are described in https://google.aip.dev/160. |
| `pageSize` | query | integer (int32) | no | Optional. Maximum number of items to return. |
| `pageToken` | query | string | no | Optional. next_page_token value returned from a previous List request, if any. |

### `workstations.projects.locations.workstationClusters.workstationConfigs.workstations.listUsable`

- Versions: v1, v1beta
- `GET https://workstations.googleapis.com/v1/{+parent}/workstations:listUsable`
- Returns all workstations using the specified workstation configuration on which the caller has the "workstations.workstations.use" permission.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListUsableWorkstationsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Parent resource name. |
| `pageSize` | query | integer (int32) | no | Optional. Maximum number of items to return. |
| `pageToken` | query | string | no | Optional. next_page_token value returned from a previous List request, if any. |

### `workstations.projects.locations.workstationClusters.workstationConfigs.workstations.patch`

- Versions: v1, v1beta
- `PATCH https://workstations.googleapis.com/v1/{+name}`
- Updates an existing workstation.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Workstation`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. Full name of this workstation. |
| `allowMissing` | query | boolean | no | Optional. If set and the workstation is not found, a new workstation is created. In this situation, update_mask is ignored. |
| `updateMask` | query | string (google-fieldmask) | yes | Required. Mask specifying which fields in the workstation should be updated. |
| `validateOnly` | query | boolean | no | Optional. If set, validate the request and preview the result, but do not actually apply it. |

### `workstations.projects.locations.workstationClusters.workstationConfigs.workstations.pushCredentials`

- Versions: v1beta
- `POST https://workstations.googleapis.com/v1beta/{+workstation}:pushCredentials`
- Pushes credentials to a running workstation on behalf of a user. Once complete, supported credential types (application_default_credentials) are made available to processes running in the user container.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `PushCredentialsRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `workstation` | path | string | yes | Required. Name of the workstation for which the credentials should be pushed. |

### `workstations.projects.locations.workstationClusters.workstationConfigs.workstations.setIamPolicy`

- Versions: v1, v1beta
- `POST https://workstations.googleapis.com/v1/{+resource}:setIamPolicy`
- Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `SetIamPolicyRequest`; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `workstations.projects.locations.workstationClusters.workstationConfigs.workstations.start`

- Versions: v1, v1beta
- `POST https://workstations.googleapis.com/v1/{+name}:start`
- Starts running a workstation so that users can connect to it.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `StartWorkstationRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the workstation to start. |

### `workstations.projects.locations.workstationClusters.workstationConfigs.workstations.stop`

- Versions: v1, v1beta
- `POST https://workstations.googleapis.com/v1/{+name}:stop`
- Stops running a workstation, reducing costs.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `StopWorkstationRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the workstation to stop. |

### `workstations.projects.locations.workstationClusters.workstationConfigs.workstations.suspend`

- Versions: v1, v1beta
- `POST https://workstations.googleapis.com/v1/{+name}:suspend`
- Suspends a workstation to reduce costs.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `SuspendWorkstationRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the workstation to suspend. |

### `workstations.projects.locations.workstationClusters.workstationConfigs.workstations.testIamPermissions`

- Versions: v1, v1beta
- `POST https://workstations.googleapis.com/v1/{+resource}:testIamPermissions`
- Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `TestIamPermissionsRequest`; Response: `TestIamPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### Example request skeleton

Generated from the Discovery entry of `workstations.projects.locations.get` (not in the official docs); replace the `{...}` path variables (URL-encode query values):

```bash
curl -X GET \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  "https://workstations.googleapis.com/v1/{+name}"
```

## Notes

- Generated from the Discovery document(s) v1, v1beta of `workstations` (retrieved 2026-11-14). Resources on this page: projects.
- The Required column is `yes` for path variables and required parameters, and `conditional` when the description says "Required if ..." (mutually exclusive alternatives), when a `parent.child` parameter is required only inside an optional parent message or one branch of a oneof, or when a path variable is described as optional (the method then also accepts the URL without that segment, as its description says).
- Message schemas (the request and response types named above) are listed under `references/rest-schemas/workstations/`; they are the `schemas` section of the Discovery documents in Source.
- Source: https://workstations.googleapis.com/$discovery/rest?version=v1, https://workstations.googleapis.com/$discovery/rest?version=v1beta (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
