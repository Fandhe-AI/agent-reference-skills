---
source: https://networkservices.googleapis.com/$discovery/rest?version=v1
---

# Network Services API REST API (networkservices) (part 1/2)

## Signature / Usage

Base URL: `https://networkservices.googleapis.com`. Methods are listed by `id`; the `Versions` line shows which API versions define the method (preferred: v1).

### `networkservices.projects.locations.agentConnectivityTemplates.create`

- Versions: v1, v1beta1
- `POST https://networkservices.googleapis.com/v1/{+parent}/agentConnectivityTemplates`
- Creates a new AgentConnectivityTemplate in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `AgentConnectivityTemplate`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource of the AgentConnectivityTemplate. Must be in the format `projects/*/locations/*`. |
| `agentConnectivityTemplateId` | query | string | yes | Required. Short name of the AgentConnectivityTemplate resource to be created. |

### `networkservices.projects.locations.agentConnectivityTemplates.delete`

- Versions: v1, v1beta1
- `DELETE https://networkservices.googleapis.com/v1/{+name}`
- Deletes a single AgentConnectivityTemplate.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. A name of the AgentConnectivityTemplate to delete. Must be in the format `projects/*/locations/*/agentConnectivityTemplates/*`. |
| `etag` | query | string | no | Optional. The etag of the AgentConnectivityTemplate to delete. |

### `networkservices.projects.locations.agentConnectivityTemplates.get`

- Versions: v1, v1beta1
- `GET https://networkservices.googleapis.com/v1/{+name}`
- Gets details of a single AgentConnectivityTemplate.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `AgentConnectivityTemplate`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. A name of the AgentConnectivityTemplate to get. Must be in the format `projects/*/locations/*/agentConnectivityTemplates/*`. |

### `networkservices.projects.locations.agentConnectivityTemplates.list`

- Versions: v1, v1beta1
- `GET https://networkservices.googleapis.com/v1/{+parent}/agentConnectivityTemplates`
- Lists AgentConnectivityTemplates in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListAgentConnectivityTemplatesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The project and location from which the AgentConnectivityTemplates should be listed, specified in the format `projects/*/locations/*`. |
| `pageSize` | query | integer (int32) | no | Optional. Maximum number of AgentConnectivityTemplates to return per call. |
| `pageToken` | query | string | no | Optional. The value returned by the last `ListAgentConnectivityTemplatesResponse` Indicates that this is a continuation of a prior `ListAgentConnectivityTemplates` call, and that the system should return the next page of data. |
| `returnPartialSuccess` | query | boolean | no | Optional. If true, allow partial responses for multi-regional Aggregated List requests. Otherwise if one of the locations is down or unreachable, the Aggregated List request will fail. |

### `networkservices.projects.locations.agentConnectivityTemplates.patch`

- Versions: v1, v1beta1
- `PATCH https://networkservices.googleapis.com/v1/{+name}`
- Updates the parameters of a single AgentConnectivityTemplate.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `AgentConnectivityTemplate`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. Name of the AgentConnectivityTemplate resource. It matches pattern `projects/*/locations/*/agentConnectivityTemplates/`. |
| `updateMask` | query | string (google-fieldmask) | no | Optional. Field mask is used to specify the fields to be overwritten in the AgentConnectivityTemplate resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it is in the mask. If the user does not provide a mask then all fields will be overwritten. |

### `networkservices.projects.locations.agentGateways.create`

- Versions: v1, v1beta1
- `POST https://networkservices.googleapis.com/v1/{+parent}/agentGateways`
- Creates a new AgentGateway in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `AgentGateway`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource of the AgentGateway. Must be in the format `projects/*/locations/*`. |
| `agentGatewayId` | query | string | yes | Required. Short name of the AgentGateway resource to be created. |

### `networkservices.projects.locations.agentGateways.delete`

- Versions: v1, v1beta1
- `DELETE https://networkservices.googleapis.com/v1/{+name}`
- Deletes a single AgentGateway.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. A name of the AgentGateway to delete. Must be in the format `projects/*/locations/*/agentGateways/*`. |
| `etag` | query | string | no | Optional. The etag of the AgentGateway to delete. |

### `networkservices.projects.locations.agentGateways.get`

- Versions: v1, v1beta1
- `GET https://networkservices.googleapis.com/v1/{+name}`
- Gets details of a single AgentGateway.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `AgentGateway`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. A name of the AgentGateway to get. Must be in the format `projects/*/locations/*/agentGateways/*`. |

### `networkservices.projects.locations.agentGateways.list`

- Versions: v1, v1beta1
- `GET https://networkservices.googleapis.com/v1/{+parent}/agentGateways`
- Lists AgentGateways in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListAgentGatewaysResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The project and location from which the AgentGateways should be listed, specified in the format `projects/*/locations/*`. |
| `filter` | query | string | no | Optional. A filter expression to filter the results listed in the response. The expression must follow the syntax described in AIP-160 (https://google.aip.dev/160). |
| `pageSize` | query | integer (int32) | no | Optional. Maximum number of AgentGateways to return per call. |
| `pageToken` | query | string | no | Optional. The value returned by the last `ListAgentGatewaysResponse` Indicates that this is a continuation of a prior `ListAgentGateways` call, and that the system should return the next page of data. |
| `returnPartialSuccess` | query | boolean | no | Optional. If true, allow partial responses for multi-regional Aggregated List requests. Otherwise if one of the locations is down or unreachable, the Aggregated List request will fail. |

### `networkservices.projects.locations.agentGateways.patch`

- Versions: v1, v1beta1
- `PATCH https://networkservices.googleapis.com/v1/{+name}`
- Updates the parameters of a single AgentGateway.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `AgentGateway`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. Name of the AgentGateway resource. It matches pattern `projects/*/locations/*/agentGateways/`. |
| `updateMask` | query | string (google-fieldmask) | no | Optional. Field mask is used to specify the fields to be overwritten in the AgentGateway resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it is in the mask. If the user does not provide a mask then all fields will be overwritten. |

### `networkservices.projects.locations.authzExtensions.create`

- Versions: v1, v1beta1
- `POST https://networkservices.googleapis.com/v1/{+parent}/authzExtensions`
- Creates a new `AuthzExtension` resource in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `AuthzExtension`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource of the `AuthzExtension` resource. Must be in the format `projects/{project}/locations/{location}`. |
| `authzExtensionId` | query | string | yes | Required. User-provided ID of the `AuthzExtension` resource to be created. |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server can ignore the request if it has already been completed. The server guarantees that for 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server ignores the second request This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `networkservices.projects.locations.authzExtensions.delete`

- Versions: v1, v1beta1
- `DELETE https://networkservices.googleapis.com/v1/{+name}`
- Deletes the specified `AuthzExtension` resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the `AuthzExtension` resource to delete. Must be in the format `projects/{project}/locations/{location}/authzExtensions/{authz_extension}`. |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server can ignore the request if it has already been completed. The server guarantees that for 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server ignores the second request This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `networkservices.projects.locations.authzExtensions.get`

- Versions: v1, v1beta1
- `GET https://networkservices.googleapis.com/v1/{+name}`
- Gets details of the specified `AuthzExtension` resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `AuthzExtension`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. A name of the `AuthzExtension` resource to get. Must be in the format `projects/{project}/locations/{location}/authzExtensions/{authz_extension}`. |

### `networkservices.projects.locations.authzExtensions.list`

- Versions: v1, v1beta1
- `GET https://networkservices.googleapis.com/v1/{+parent}/authzExtensions`
- Lists `AuthzExtension` resources in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListAuthzExtensionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The project and location from which the `AuthzExtension` resources are listed. These values are specified in the following format: `projects/{project}/locations/{location}`. |
| `filter` | query | string | no | Optional. Filtering results. |
| `orderBy` | query | string | no | Optional. Hint about how to order the results. |
| `pageSize` | query | integer (int32) | no | Optional. Requested page size. The server might return fewer items than requested. If unspecified, the server picks an appropriate default. |
| `pageToken` | query | string | no | Optional. A token identifying a page of results that the server returns. |

### `networkservices.projects.locations.authzExtensions.patch`

- Versions: v1, v1beta1
- `PATCH https://networkservices.googleapis.com/v1/{+name}`
- Updates the parameters of the specified `AuthzExtension` resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `AuthzExtension`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Identifier. Name of the `AuthzExtension` resource in the following format: `projects/{project}/locations/{location}/authzExtensions/{authz_extension}`. |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server can ignore the request if it has already been completed. The server guarantees that for 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server ignores the second request This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `updateMask` | query | string (google-fieldmask) | no | Optional. Used to specify the fields to be overwritten in the `AuthzExtension` resource by the update. The fields specified in the `update_mask` are relative to the resource, not the full request. A field is overwritten if it is in the mask. If the user does not specify a mask, then all fields are overwritten. |

### `networkservices.projects.locations.cdnEdgeExtensions.create`

- Versions: v1beta1
- `POST https://networkservices.googleapis.com/v1beta1/{+parent}/cdnEdgeExtensions`
- Creates a new `CdnEdgeExtension` resource in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `CdnEdgeExtension`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource of the `CdnEdgeExtension` resource. Must be in the format `projects/{project}/locations/{location}`. |
| `cdnEdgeExtensionId` | query | string | yes | Required. User-provided ID of the `CdnEdgeExtension` resource to be created. |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server can ignore the request if it has already been completed. The server guarantees that for 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server ignores the second request This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `networkservices.projects.locations.cdnEdgeExtensions.delete`

- Versions: v1beta1
- `DELETE https://networkservices.googleapis.com/v1beta1/{+name}`
- Deletes the specified `CdnEdgeExtension` resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the `CdnEdgeExtension` resource to delete. Must be in the format `projects/{project}/locations/{location}/cdnEdgeExtensions/{cdn_edge_extension}`. |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server can ignore the request if it has already been completed. The server guarantees that for 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server ignores the second request This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `networkservices.projects.locations.cdnEdgeExtensions.get`

- Versions: v1beta1
- `GET https://networkservices.googleapis.com/v1beta1/{+name}`
- Gets details of the specified `CdnEdgeExtension` resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `CdnEdgeExtension`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. A name of the `CdnEdgeExtension` resource to get. Must be in the format `projects/{project}/locations/{location}/cdnEdgeExtensions/{cdn_edge_extension}`. |

### `networkservices.projects.locations.cdnEdgeExtensions.list`

- Versions: v1beta1
- `GET https://networkservices.googleapis.com/v1beta1/{+parent}/cdnEdgeExtensions`
- Lists `CdnEdgeExtensions` resources in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListCdnEdgeExtensionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The project and location from which the `CdnEdgeExtension` resources are listed. These values are specified in the following format: `projects/{project}/locations/{location}`. |
| `filter` | query | string | no | Optional. Filtering results. |
| `orderBy` | query | string | no | Optional. Hint about how to order the results. |
| `pageSize` | query | integer (int32) | no | Optional. Requested page size. The server might return fewer items than requested. If unspecified, the server picks an appropriate default. |
| `pageToken` | query | string | no | Optional. A token identifying a page of results that the server returns. |

### `networkservices.projects.locations.cdnEdgeExtensions.patch`

- Versions: v1beta1
- `PATCH https://networkservices.googleapis.com/v1beta1/{+name}`
- Updates the parameters of the specified `CdnEdgeExtension` resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `CdnEdgeExtension`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Identifier. Name of the `CdnEdgeExtension` resource in the following format: `projects/{project}/locations/{location}/cdnEdgeExtensions/{cdn_edge_extension}`. |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server can ignore the request if it has already been completed. The server guarantees that for 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server ignores the second request This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `updateMask` | query | string (google-fieldmask) | no | Optional. Used to specify the fields to be overwritten in the `CdnEdgeExtension` resource by the update. The fields specified in the `update_mask` are relative to the resource, not the full request. A field is overwritten if it is in the mask. If the user does not specify a mask, then all fields are overwritten. |

### `networkservices.projects.locations.edgeCacheKeysets.getIamPolicy`

- Versions: v1
- `GET https://networkservices.googleapis.com/v1/{+resource}:getIamPolicy`
- Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |
| `options.requestedPolicyVersion` | query | integer (int32) | no | Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |

### `networkservices.projects.locations.edgeCacheKeysets.setIamPolicy`

- Versions: v1
- `POST https://networkservices.googleapis.com/v1/{+resource}:setIamPolicy`
- Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `SetIamPolicyRequest`; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `networkservices.projects.locations.edgeCacheKeysets.testIamPermissions`

- Versions: v1
- `POST https://networkservices.googleapis.com/v1/{+resource}:testIamPermissions`
- Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `TestIamPermissionsRequest`; Response: `TestIamPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `networkservices.projects.locations.edgeCacheOrigins.getIamPolicy`

- Versions: v1
- `GET https://networkservices.googleapis.com/v1/{+resource}:getIamPolicy`
- Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |
| `options.requestedPolicyVersion` | query | integer (int32) | no | Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |

### `networkservices.projects.locations.edgeCacheOrigins.setIamPolicy`

- Versions: v1
- `POST https://networkservices.googleapis.com/v1/{+resource}:setIamPolicy`
- Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `SetIamPolicyRequest`; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `networkservices.projects.locations.edgeCacheOrigins.testIamPermissions`

- Versions: v1
- `POST https://networkservices.googleapis.com/v1/{+resource}:testIamPermissions`
- Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `TestIamPermissionsRequest`; Response: `TestIamPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `networkservices.projects.locations.edgeCacheServices.getIamPolicy`

- Versions: v1
- `GET https://networkservices.googleapis.com/v1/{+resource}:getIamPolicy`
- Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |
| `options.requestedPolicyVersion` | query | integer (int32) | no | Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |

### `networkservices.projects.locations.edgeCacheServices.setIamPolicy`

- Versions: v1
- `POST https://networkservices.googleapis.com/v1/{+resource}:setIamPolicy`
- Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `SetIamPolicyRequest`; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `networkservices.projects.locations.edgeCacheServices.testIamPermissions`

- Versions: v1
- `POST https://networkservices.googleapis.com/v1/{+resource}:testIamPermissions`
- Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `TestIamPermissionsRequest`; Response: `TestIamPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `networkservices.projects.locations.endpointPolicies.create`

- Versions: v1, v1beta1
- `POST https://networkservices.googleapis.com/v1/{+parent}/endpointPolicies`
- Creates a new EndpointPolicy in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `EndpointPolicy`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource of the EndpointPolicy. Must be in the format `projects/*/locations/*`. |
| `endpointPolicyId` | query | string | yes | Required. Short name of the EndpointPolicy resource to be created. E.g. "CustomECS". |

### `networkservices.projects.locations.endpointPolicies.delete`

- Versions: v1, v1beta1
- `DELETE https://networkservices.googleapis.com/v1/{+name}`
- Deletes a single EndpointPolicy.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. A name of the EndpointPolicy to delete. Must be in the format `projects/*/locations/*/endpointPolicies/*`. |

### `networkservices.projects.locations.endpointPolicies.get`

- Versions: v1, v1beta1
- `GET https://networkservices.googleapis.com/v1/{+name}`
- Gets details of a single EndpointPolicy.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `EndpointPolicy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. A name of the EndpointPolicy to get. Must be in the format `projects/*/locations/*/endpointPolicies/*`. |

### `networkservices.projects.locations.endpointPolicies.list`

- Versions: v1, v1beta1
- `GET https://networkservices.googleapis.com/v1/{+parent}/endpointPolicies`
- Lists EndpointPolicies in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListEndpointPoliciesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The project and location from which the EndpointPolicies should be listed, specified in the format `projects/*/locations/*`. |
| `pageSize` | query | integer (int32) | no | Maximum number of EndpointPolicies to return per call. |
| `pageToken` | query | string | no | The value returned by the last `ListEndpointPoliciesResponse` Indicates that this is a continuation of a prior `ListEndpointPolicies` call, and that the system should return the next page of data. |
| `returnPartialSuccess` | query | boolean | no | Optional. If true, allow partial responses for multi-regional Aggregated List requests. Otherwise if one of the locations is down or unreachable, the Aggregated List request will fail. |

### `networkservices.projects.locations.endpointPolicies.patch`

- Versions: v1, v1beta1
- `PATCH https://networkservices.googleapis.com/v1/{+name}`
- Updates the parameters of a single EndpointPolicy.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `EndpointPolicy`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. Name of the EndpointPolicy resource. It matches pattern `projects/{project}/locations/*/endpointPolicies/{endpoint_policy}`. |
| `updateMask` | query | string (google-fieldmask) | no | Optional. Field mask is used to specify the fields to be overwritten in the EndpointPolicy resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it is in the mask. If the user does not provide a mask then all fields will be overwritten. |

### `networkservices.projects.locations.expressLinks.create`

- Versions: v1beta1
- `POST https://networkservices.googleapis.com/v1beta1/{+parent}/expressLinks`
- Creates a new ExpressLink in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `ExpressLink`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource of the ExpressLink. Must be in the format `projects/*/locations/*`. |
| `expressLinkId` | query | string | yes | Required. Short name of the ExpressLink resource to be created. |

### `networkservices.projects.locations.expressLinks.delete`

- Versions: v1beta1
- `DELETE https://networkservices.googleapis.com/v1beta1/{+name}`
- Deletes a single ExpressLink.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. A name of the ExpressLink to delete. Must be in the format `projects/*/locations/*/expressLinks/*`. |
| `etag` | query | string | no | Optional. The etag of the ExpressLink to delete. |

### `networkservices.projects.locations.expressLinks.get`

- Versions: v1beta1
- `GET https://networkservices.googleapis.com/v1beta1/{+name}`
- Gets details of a single ExpressLink.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ExpressLink`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. A name of the ExpressLink to get. Must be in the format `projects/*/locations/*/expressLinks/*`. |
| `view` | query | string enum | no | Optional. Determines the information level of the ExpressLink resource returned in the API response. Values: `EXPRESS_LINK_VIEW_UNSPECIFIED`, `EXPRESS_LINK_VIEW_BASIC`, `EXPRESS_LINK_VIEW_FULL`. |

### `networkservices.projects.locations.expressLinks.list`

- Versions: v1beta1
- `GET https://networkservices.googleapis.com/v1beta1/{+parent}/expressLinks`
- Lists ExpressLinks in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListExpressLinksResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The project and location from which the ExpressLinks should be listed, specified in the format `projects/*/locations/*`. |
| `pageSize` | query | integer (int32) | no | Maximum number of ExpressLinks to return per call. |
| `pageToken` | query | string | no | The value returned by the last `ListExpressLinksResponse` Indicates that this is a continuation of a prior `ListExpressLinks` call, and that the system should return the next page of data. |
| `view` | query | string enum | no | Optional. Determines the information level of the ExpressLink resources returned in the API response. Values: `EXPRESS_LINK_VIEW_UNSPECIFIED`, `EXPRESS_LINK_VIEW_BASIC`, `EXPRESS_LINK_VIEW_FULL`. |

### `networkservices.projects.locations.expressLinks.patch`

- Versions: v1beta1
- `PATCH https://networkservices.googleapis.com/v1beta1/{+name}`
- Updates the parameters of a single ExpressLink.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `ExpressLink`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. Name of the ExpressLink resource. It matches pattern `projects/*/locations/*/expressLinks/`. |
| `updateMask` | query | string (google-fieldmask) | no | Optional. Field mask is used to specify the fields to be overwritten in the ExpressLink resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it is in the mask. If the user does not provide a mask then all fields will be overwritten. |

### `networkservices.projects.locations.extensionBindings.create`

- Versions: v1, v1beta1
- `POST https://networkservices.googleapis.com/v1/{+parent}/extensionBindings`
- Creates a new `ExtensionBinding` resource in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `ExtensionBinding`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource of the `ExtensionBinding` resource. Must be in the format `projects/{project}/locations/{location}`. |
| `extensionBindingId` | query | string | yes | Required. Short name of the `ExtensionBinding` resource to be created. |

### `networkservices.projects.locations.extensionBindings.delete`

- Versions: v1, v1beta1
- `DELETE https://networkservices.googleapis.com/v1/{+name}`
- Deletes the specified `ExtensionBinding` resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. A name of the `ExtensionBinding` resource to delete. Must be in the format `projects/{project}/locations/{location}/extensionBindings/{extension_binding}`. |
| `etag` | query | string | no | Optional. The etag of the ExtensionBinding to delete. |

### `networkservices.projects.locations.extensionBindings.get`

- Versions: v1, v1beta1
- `GET https://networkservices.googleapis.com/v1/{+name}`
- Gets details of the specified `ExtensionBinding` resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ExtensionBinding`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. A name of the `ExtensionBinding` resource to get. Must be in the format `projects/{project}/locations/{location}/extensionBindings/{extension_binding}`. |

### `networkservices.projects.locations.extensionBindings.list`

- Versions: v1, v1beta1
- `GET https://networkservices.googleapis.com/v1/{+parent}/extensionBindings`
- Lists `ExtensionBinding` resources in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListExtensionBindingsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The project and location from which the `ExtensionBinding` resources should be listed, specified in the format `projects/{project}/locations/{location}`. |
| `pageSize` | query | integer (int32) | no | Optional. Maximum number of `ExtensionBinding` resources to return per call. |
| `pageToken` | query | string | no | Optional. The value returned by the last `ListExtensionBindingsResponse` Indicates that this is a continuation of a prior `ListExtensionBindings` call, and that the system should return the next page of data. |

### `networkservices.projects.locations.extensionBindings.patch`

- Versions: v1, v1beta1
- `PATCH https://networkservices.googleapis.com/v1/{+name}`
- Updates the parameters of the specified `ExtensionBinding` resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `ExtensionBinding`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. Name of the `ExtensionBinding` resource in the following format: `projects/{project}/locations/{location}/extensionBindings/{extension_binding}`. |
| `updateMask` | query | string (google-fieldmask) | no | Optional. Field mask is used to specify the fields to be overwritten in the `ExtensionBinding` resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it is in the mask. If the user does not provide a mask then all fields will be overwritten. |

### `networkservices.projects.locations.gateways.create`

- Versions: v1, v1beta1
- `POST https://networkservices.googleapis.com/v1/{+parent}/gateways`
- Creates a new Gateway in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Gateway`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource of the Gateway. Must be in the format `projects/*/locations/*`. |
| `gatewayId` | query | string | yes | Required. Short name of the Gateway resource to be created. |

### `networkservices.projects.locations.gateways.delete`

- Versions: v1, v1beta1
- `DELETE https://networkservices.googleapis.com/v1/{+name}`
- Deletes a single Gateway.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. A name of the Gateway to delete. Must be in the format `projects/*/locations/*/gateways/*`. |

### `networkservices.projects.locations.gateways.get`

- Versions: v1, v1beta1
- `GET https://networkservices.googleapis.com/v1/{+name}`
- Gets details of a single Gateway.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Gateway`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. A name of the Gateway to get. Must be in the format `projects/*/locations/*/gateways/*`. |

### `networkservices.projects.locations.gateways.list`

- Versions: v1, v1beta1
- `GET https://networkservices.googleapis.com/v1/{+parent}/gateways`
- Lists Gateways in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListGatewaysResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The project and location from which the Gateways should be listed, specified in the format `projects/*/locations/*`. |
| `pageSize` | query | integer (int32) | no | Maximum number of Gateways to return per call. |
| `pageToken` | query | string | no | The value returned by the last `ListGatewaysResponse` Indicates that this is a continuation of a prior `ListGateways` call, and that the system should return the next page of data. |

### `networkservices.projects.locations.gateways.patch`

- Versions: v1, v1beta1
- `PATCH https://networkservices.googleapis.com/v1/{+name}`
- Updates the parameters of a single Gateway.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Gateway`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. Name of the Gateway resource. It matches pattern `projects/*/locations/*/gateways/`. |
| `updateMask` | query | string (google-fieldmask) | no | Optional. Field mask is used to specify the fields to be overwritten in the Gateway resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it is in the mask. If the user does not provide a mask then all fields will be overwritten. |

### `networkservices.projects.locations.gateways.routeViews.get`

- Versions: v1, v1beta1
- `GET https://networkservices.googleapis.com/v1/{+name}`
- Get a single RouteView of a Gateway.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GatewayRouteView`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the GatewayRouteView resource. Formats: projects/{project_number}/locations/{location}/gateways/{gateway}/routeViews/{route_view} |

### `networkservices.projects.locations.gateways.routeViews.list`

- Versions: v1, v1beta1
- `GET https://networkservices.googleapis.com/v1/{+parent}/routeViews`
- Lists RouteViews
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListGatewayRouteViewsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The Gateway to which a Route is associated. Formats: projects/{project_number}/locations/{location}/gateways/{gateway} |
| `pageSize` | query | integer (int32) | no | Maximum number of GatewayRouteViews to return per call. |
| `pageToken` | query | string | no | The value returned by the last `ListGatewayRouteViewsResponse` Indicates that this is a continuation of a prior `ListGatewayRouteViews` call, and that the system should return the next page of data. |

### `networkservices.projects.locations.get`

- Versions: v1, v1beta1
- `GET https://networkservices.googleapis.com/v1/{+name}`
- Gets information about a location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Location`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Resource name for the location. |

### `networkservices.projects.locations.grpcRoutes.create`

- Versions: v1, v1beta1
- `POST https://networkservices.googleapis.com/v1/{+parent}/grpcRoutes`
- Creates a new GrpcRoute in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GrpcRoute`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource of the GrpcRoute. Must be in the format `projects/*/locations/*`. |
| `grpcRouteId` | query | string | yes | Required. Short name of the GrpcRoute resource to be created. |

### `networkservices.projects.locations.grpcRoutes.delete`

- Versions: v1, v1beta1
- `DELETE https://networkservices.googleapis.com/v1/{+name}`
- Deletes a single GrpcRoute.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. A name of the GrpcRoute to delete. Must be in the format `projects/*/locations/*/grpcRoutes/*`. |

### `networkservices.projects.locations.grpcRoutes.get`

- Versions: v1, v1beta1
- `GET https://networkservices.googleapis.com/v1/{+name}`
- Gets details of a single GrpcRoute.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GrpcRoute`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. A name of the GrpcRoute to get. Must be in the format `projects/*/locations/*/grpcRoutes/*`. |

### `networkservices.projects.locations.grpcRoutes.list`

- Versions: v1, v1beta1
- `GET https://networkservices.googleapis.com/v1/{+parent}/grpcRoutes`
- Lists GrpcRoutes in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListGrpcRoutesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The project and location from which the GrpcRoutes should be listed, specified in the format `projects/*/locations/*`. |
| `pageSize` | query | integer (int32) | no | Maximum number of GrpcRoutes to return per call. |
| `pageToken` | query | string | no | The value returned by the last `ListGrpcRoutesResponse` Indicates that this is a continuation of a prior `ListGrpcRoutes` call, and that the system should return the next page of data. |
| `returnPartialSuccess` | query | boolean | no | Optional. If true, allow partial responses for multi-regional Aggregated List requests. Otherwise if one of the locations is down or unreachable, the Aggregated List request will fail. |

### `networkservices.projects.locations.grpcRoutes.patch`

- Versions: v1, v1beta1
- `PATCH https://networkservices.googleapis.com/v1/{+name}`
- Updates the parameters of a single GrpcRoute.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GrpcRoute`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. Name of the GrpcRoute resource. It matches pattern `projects/*/locations/*/grpcRoutes/` |
| `updateMask` | query | string (google-fieldmask) | no | Optional. Field mask is used to specify the fields to be overwritten in the GrpcRoute resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it is in the mask. If the user does not provide a mask then all fields will be overwritten. |

### `networkservices.projects.locations.httpRoutes.create`

- Versions: v1, v1beta1
- `POST https://networkservices.googleapis.com/v1/{+parent}/httpRoutes`
- Creates a new HttpRoute in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `HttpRoute`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource of the HttpRoute. Must be in the format `projects/*/locations/*`. |
| `httpRouteId` | query | string | yes | Required. Short name of the HttpRoute resource to be created. |
| `requestId` | query | string | no | Optional. Idempotent request UUID. |

### `networkservices.projects.locations.httpRoutes.delete`

- Versions: v1, v1beta1
- `DELETE https://networkservices.googleapis.com/v1/{+name}`
- Deletes a single HttpRoute.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. A name of the HttpRoute to delete. Must be in the format `projects/*/locations/*/httpRoutes/*`. |

### `networkservices.projects.locations.httpRoutes.get`

- Versions: v1, v1beta1
- `GET https://networkservices.googleapis.com/v1/{+name}`
- Gets details of a single HttpRoute.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `HttpRoute`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. A name of the HttpRoute to get. Must be in the format `projects/*/locations/*/httpRoutes/*`. |

### `networkservices.projects.locations.httpRoutes.list`

- Versions: v1, v1beta1
- `GET https://networkservices.googleapis.com/v1/{+parent}/httpRoutes`
- Lists HttpRoute in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListHttpRoutesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The project and location from which the HttpRoutes should be listed, specified in the format `projects/*/locations/*`. |
| `filter` | query | string | no | Optional. Filter expression to restrict the list. |
| `pageSize` | query | integer (int32) | no | Maximum number of HttpRoutes to return per call. |
| `pageToken` | query | string | no | The value returned by the last `ListHttpRoutesResponse` Indicates that this is a continuation of a prior `ListHttpRoutes` call, and that the system should return the next page of data. |
| `returnPartialSuccess` | query | boolean | no | Optional. If true, allow partial responses for multi-regional Aggregated List requests. Otherwise if one of the locations is down or unreachable, the Aggregated List request will fail. |

### `networkservices.projects.locations.httpRoutes.patch`

- Versions: v1, v1beta1
- `PATCH https://networkservices.googleapis.com/v1/{+name}`
- Updates the parameters of a single HttpRoute.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `HttpRoute`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. Name of the HttpRoute resource. It matches pattern `projects/*/locations/*/httpRoutes/http_route_name>`. |
| `updateMask` | query | string (google-fieldmask) | no | Optional. Field mask is used to specify the fields to be overwritten in the HttpRoute resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it is in the mask. If the user does not provide a mask then all fields will be overwritten. |

### `networkservices.projects.locations.lbEdgeExtensions.create`

- Versions: v1, v1beta1
- `POST https://networkservices.googleapis.com/v1/{+parent}/lbEdgeExtensions`
- Creates a new `LbEdgeExtension` resource in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `LbEdgeExtension`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource of the `LbEdgeExtension` resource. Must be in the format `projects/{project}/locations/{location}`. |
| `lbEdgeExtensionId` | query | string | yes | Required. User-provided ID of the `LbEdgeExtension` resource to be created. |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server can ignore the request if it has already been completed. The server guarantees that for 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server ignores the second request This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `networkservices.projects.locations.lbEdgeExtensions.delete`

- Versions: v1, v1beta1
- `DELETE https://networkservices.googleapis.com/v1/{+name}`
- Deletes the specified `LbEdgeExtension` resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the `LbEdgeExtension` resource to delete. Must be in the format `projects/{project}/locations/{location}/lbEdgeExtensions/{lb_edge_extension}`. |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server can ignore the request if it has already been completed. The server guarantees that for 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server ignores the second request This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `networkservices.projects.locations.lbEdgeExtensions.get`

- Versions: v1, v1beta1
- `GET https://networkservices.googleapis.com/v1/{+name}`
- Gets details of the specified `LbEdgeExtension` resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `LbEdgeExtension`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. A name of the `LbEdgeExtension` resource to get. Must be in the format `projects/{project}/locations/{location}/lbEdgeExtensions/{lb_edge_extension}`. |

### `networkservices.projects.locations.lbEdgeExtensions.list`

- Versions: v1, v1beta1
- `GET https://networkservices.googleapis.com/v1/{+parent}/lbEdgeExtensions`
- Lists `LbEdgeExtension` resources in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListLbEdgeExtensionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The project and location from which the `LbEdgeExtension` resources are listed. These values are specified in the following format: `projects/{project}/locations/{location}`. |
| `filter` | query | string | no | Optional. Filtering results. |
| `orderBy` | query | string | no | Optional. Hint about how to order the results. |
| `pageSize` | query | integer (int32) | no | Optional. Requested page size. The server might return fewer items than requested. If unspecified, the server picks an appropriate default. |
| `pageToken` | query | string | no | Optional. A token identifying a page of results that the server returns. |

### `networkservices.projects.locations.lbEdgeExtensions.patch`

- Versions: v1, v1beta1
- `PATCH https://networkservices.googleapis.com/v1/{+name}`
- Updates the parameters of the specified `LbEdgeExtension` resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `LbEdgeExtension`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Identifier. Name of the `LbEdgeExtension` resource in the following format: `projects/{project}/locations/{location}/lbEdgeExtensions/{lb_edge_extension}`. |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server can ignore the request if it has already been completed. The server guarantees that for 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server ignores the second request This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `updateMask` | query | string (google-fieldmask) | no | Optional. Used to specify the fields to be overwritten in the `LbEdgeExtension` resource by the update. The fields specified in the `update_mask` are relative to the resource, not the full request. A field is overwritten if it is in the mask. If the user does not specify a mask, then all fields are overwritten. |

### `networkservices.projects.locations.lbRouteExtensions.create`

- Versions: v1, v1beta1
- `POST https://networkservices.googleapis.com/v1/{+parent}/lbRouteExtensions`
- Creates a new `LbRouteExtension` resource in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `LbRouteExtension`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource of the `LbRouteExtension` resource. Must be in the format `projects/{project}/locations/{location}`. |
| `lbRouteExtensionId` | query | string | yes | Required. User-provided ID of the `LbRouteExtension` resource to be created. |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server can ignore the request if it has already been completed. The server guarantees that for 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server ignores the second request This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `networkservices.projects.locations.lbRouteExtensions.delete`

- Versions: v1, v1beta1
- `DELETE https://networkservices.googleapis.com/v1/{+name}`
- Deletes the specified `LbRouteExtension` resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the `LbRouteExtension` resource to delete. Must be in the format `projects/{project}/locations/{location}/lbRouteExtensions/{lb_route_extension}`. |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server can ignore the request if it has already been completed. The server guarantees that for 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server ignores the second request This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `networkservices.projects.locations.lbRouteExtensions.get`

- Versions: v1, v1beta1
- `GET https://networkservices.googleapis.com/v1/{+name}`
- Gets details of the specified `LbRouteExtension` resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `LbRouteExtension`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. A name of the `LbRouteExtension` resource to get. Must be in the format `projects/{project}/locations/{location}/lbRouteExtensions/{lb_route_extension}`. |

### `networkservices.projects.locations.lbRouteExtensions.list`

- Versions: v1, v1beta1
- `GET https://networkservices.googleapis.com/v1/{+parent}/lbRouteExtensions`
- Lists `LbRouteExtension` resources in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListLbRouteExtensionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The project and location from which the `LbRouteExtension` resources are listed. These values are specified in the following format: `projects/{project}/locations/{location}`. |
| `filter` | query | string | no | Optional. Filtering results. |
| `orderBy` | query | string | no | Optional. Hint about how to order the results. |
| `pageSize` | query | integer (int32) | no | Optional. Requested page size. The server might return fewer items than requested. If unspecified, the server picks an appropriate default. |
| `pageToken` | query | string | no | Optional. A token identifying a page of results that the server returns. |

### `networkservices.projects.locations.lbRouteExtensions.patch`

- Versions: v1, v1beta1
- `PATCH https://networkservices.googleapis.com/v1/{+name}`
- Updates the parameters of the specified `LbRouteExtension` resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `LbRouteExtension`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Identifier. Name of the `LbRouteExtension` resource in the following format: `projects/{project}/locations/{location}/lbRouteExtensions/{lb_route_extension}`. |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server can ignore the request if it has already been completed. The server guarantees that for 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server ignores the second request This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `updateMask` | query | string (google-fieldmask) | no | Optional. Used to specify the fields to be overwritten in the `LbRouteExtension` resource by the update. The fields specified in the `update_mask` are relative to the resource, not the full request. A field is overwritten if it is in the mask. If the user does not specify a mask, then all fields are overwritten. |

### `networkservices.projects.locations.lbTcpExtensions.create`

- Versions: v1beta1
- `POST https://networkservices.googleapis.com/v1beta1/{+parent}/lbTcpExtensions`
- Creates a new `LbTcpExtension` resource in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `LbTcpExtension`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource of the `LbTcpExtension` resource. Must be in the format `projects/{project}/locations/{location}`. |
| `lbTcpExtensionId` | query | string | yes | Required. User-provided ID of the `LbTcpExtension` resource to be created. |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server can ignore the request if it has already been completed. The server guarantees that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, ignores the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `networkservices.projects.locations.lbTcpExtensions.delete`

- Versions: v1beta1
- `DELETE https://networkservices.googleapis.com/v1beta1/{+name}`
- Deletes the specified `LbTcpExtension` resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the `LbTcpExtension` resource to delete. Must be in the format `projects/{project}/locations/{location}/LbTcpExtensions/{lb_tcp_extension}`. |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server can ignore the request if it has already been completed. The server guarantees that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, ignores the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `networkservices.projects.locations.lbTcpExtensions.get`

- Versions: v1beta1
- `GET https://networkservices.googleapis.com/v1beta1/{+name}`
- Gets details of the specified `LbTcpExtension` resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `LbTcpExtension`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. A name of the `LbTcpExtension` resource to get. Must be in the format `projects/{project}/locations/{location}/LbTcpExtensions/{lb_tcp_extension}`. |

### `networkservices.projects.locations.lbTcpExtensions.list`

- Versions: v1beta1
- `GET https://networkservices.googleapis.com/v1beta1/{+parent}/lbTcpExtensions`
- Lists `LbTcpExtension` resources in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListLbTcpExtensionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The project and location from which the `LbTcpExtension` resources are listed, specified in the following format: `projects/{project}/locations/{location}`. |
| `filter` | query | string | no | Optional. Filtering results. |
| `orderBy` | query | string | no | Optional. Hint for how to order the results. |
| `pageSize` | query | integer (int32) | no | Optional. Requested page size. The server might return fewer items than requested. If unspecified, the server picks an appropriate default. |
| `pageToken` | query | string | no | Optional. A token identifying a page of results that the server returns. |

### `networkservices.projects.locations.lbTcpExtensions.patch`

- Versions: v1beta1
- `PATCH https://networkservices.googleapis.com/v1beta1/{+name}`
- Updates the parameters of the specified `LbTcpExtension` resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `LbTcpExtension`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Identifier. Name of the `LbTcpExtension` resource in the following format: `projects/{project}/locations/{location}/LbTcpExtension/{lb_tcp_extension}` |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server can ignore the request if it has already been completed. The server guarantees that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, ignores the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `updateMask` | query | string (google-fieldmask) | no | Optional. Used to specify the fields to be overwritten in the `LbTcpExtension` resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. A field is overwritten if it is in the mask. If the user does not specify a mask, then all fields are overwritten. |

### `networkservices.projects.locations.lbTrafficExtensions.create`

- Versions: v1, v1beta1
- `POST https://networkservices.googleapis.com/v1/{+parent}/lbTrafficExtensions`
- Creates a new `LbTrafficExtension` resource in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `LbTrafficExtension`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource of the `LbTrafficExtension` resource. Must be in the format `projects/{project}/locations/{location}`. |
| `lbTrafficExtensionId` | query | string | yes | Required. User-provided ID of the `LbTrafficExtension` resource to be created. |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server can ignore the request if it has already been completed. The server guarantees that for 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server ignores the second request This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `networkservices.projects.locations.lbTrafficExtensions.delete`

- Versions: v1, v1beta1
- `DELETE https://networkservices.googleapis.com/v1/{+name}`
- Deletes the specified `LbTrafficExtension` resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the `LbTrafficExtension` resource to delete. Must be in the format `projects/{project}/locations/{location}/lbTrafficExtensions/{lb_traffic_extension}`. |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server can ignore the request if it has already been completed. The server guarantees that for 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server ignores the second request This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `networkservices.projects.locations.lbTrafficExtensions.get`

- Versions: v1, v1beta1
- `GET https://networkservices.googleapis.com/v1/{+name}`
- Gets details of the specified `LbTrafficExtension` resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `LbTrafficExtension`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. A name of the `LbTrafficExtension` resource to get. Must be in the format `projects/{project}/locations/{location}/lbTrafficExtensions/{lb_traffic_extension}`. |

### `networkservices.projects.locations.lbTrafficExtensions.list`

- Versions: v1, v1beta1
- `GET https://networkservices.googleapis.com/v1/{+parent}/lbTrafficExtensions`
- Lists `LbTrafficExtension` resources in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListLbTrafficExtensionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The project and location from which the `LbTrafficExtension` resources are listed. These values are specified in the following format: `projects/{project}/locations/{location}`. |
| `filter` | query | string | no | Optional. Filtering results. |
| `orderBy` | query | string | no | Optional. Hint about how to order the results. |
| `pageSize` | query | integer (int32) | no | Optional. Requested page size. The server might return fewer items than requested. If unspecified, the server picks an appropriate default. |
| `pageToken` | query | string | no | Optional. A token identifying a page of results that the server returns. |

### `networkservices.projects.locations.lbTrafficExtensions.patch`

- Versions: v1, v1beta1
- `PATCH https://networkservices.googleapis.com/v1/{+name}`
- Updates the parameters of the specified `LbTrafficExtension` resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `LbTrafficExtension`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Identifier. Name of the `LbTrafficExtension` resource in the following format: `projects/{project}/locations/{location}/lbTrafficExtensions/{lb_traffic_extension}`. |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server can ignore the request if it has already been completed. The server guarantees that for 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server ignores the second request This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `updateMask` | query | string (google-fieldmask) | no | Optional. Used to specify the fields to be overwritten in the `LbTrafficExtension` resource by the update. The fields specified in the `update_mask` are relative to the resource, not the full request. A field is overwritten if it is in the mask. If the user does not specify a mask, then all fields are overwritten. |

### `networkservices.projects.locations.list`

- Versions: v1, v1beta1
- `GET https://networkservices.googleapis.com/v1/{+name}/locations`
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

### `networkservices.projects.locations.meshes.create`

- Versions: v1, v1beta1
- `POST https://networkservices.googleapis.com/v1/{+parent}/meshes`
- Creates a new Mesh in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Mesh`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource of the Mesh. Must be in the format `projects/*/locations/*`. |
| `meshId` | query | string | yes | Required. Short name of the Mesh resource to be created. |

### `networkservices.projects.locations.meshes.delete`

- Versions: v1, v1beta1
- `DELETE https://networkservices.googleapis.com/v1/{+name}`
- Deletes a single Mesh.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. A name of the Mesh to delete. Must be in the format `projects/*/locations/*/meshes/*`. |

### `networkservices.projects.locations.meshes.get`

- Versions: v1, v1beta1
- `GET https://networkservices.googleapis.com/v1/{+name}`
- Gets details of a single Mesh.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Mesh`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. A name of the Mesh to get. Must be in the format `projects/*/locations/*/meshes/*`. |

### `networkservices.projects.locations.meshes.list`

- Versions: v1, v1beta1
- `GET https://networkservices.googleapis.com/v1/{+parent}/meshes`
- Lists Meshes in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListMeshesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The project and location from which the Meshes should be listed, specified in the format `projects/*/locations/*`. |
| `pageSize` | query | integer (int32) | no | Maximum number of Meshes to return per call. |
| `pageToken` | query | string | no | The value returned by the last `ListMeshesResponse` Indicates that this is a continuation of a prior `ListMeshes` call, and that the system should return the next page of data. |
| `returnPartialSuccess` | query | boolean | no | Optional. If true, allow partial responses for multi-regional Aggregated List requests. Otherwise if one of the locations is down or unreachable, the Aggregated List request will fail. |

### `networkservices.projects.locations.meshes.patch`

- Versions: v1, v1beta1
- `PATCH https://networkservices.googleapis.com/v1/{+name}`
- Updates the parameters of a single Mesh.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Mesh`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. Name of the Mesh resource. It matches pattern `projects/*/locations/*/meshes/`. |
| `updateMask` | query | string (google-fieldmask) | no | Optional. Field mask is used to specify the fields to be overwritten in the Mesh resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it is in the mask. If the user does not provide a mask then all fields will be overwritten. |

### `networkservices.projects.locations.meshes.routeViews.get`

- Versions: v1, v1beta1
- `GET https://networkservices.googleapis.com/v1/{+name}`
- Get a single RouteView of a Mesh.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `MeshRouteView`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the MeshRouteView resource. Format: projects/{project_number}/locations/{location}/meshes/{mesh}/routeViews/{route_view} |

### `networkservices.projects.locations.meshes.routeViews.list`

- Versions: v1, v1beta1
- `GET https://networkservices.googleapis.com/v1/{+parent}/routeViews`
- Lists RouteViews
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListMeshRouteViewsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The Mesh to which a Route is associated. Format: projects/{project_number}/locations/{location}/meshes/{mesh} |
| `pageSize` | query | integer (int32) | no | Maximum number of MeshRouteViews to return per call. |
| `pageToken` | query | string | no | The value returned by the last `ListMeshRouteViewsResponse` Indicates that this is a continuation of a prior `ListMeshRouteViews` call, and that the system should return the next page of data. |

### `networkservices.projects.locations.multicastConsumerAssociations.create`

- Versions: v1
- `POST https://networkservices.googleapis.com/v1/{+parent}/multicastConsumerAssociations`
- Creates a new multicast consumer association in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `MulticastConsumerAssociation`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource of the multicast consumer association. Use the following format: `projects/*/locations/*`. |
| `multicastConsumerAssociationId` | query | string | yes | Required. A unique name for the multicast consumer association. The name is restricted to lower-case letters, numbers, and hyphen, with the first character a lower-case letter, and the last a letter or a number. The name must not exceed 48 characters. |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `networkservices.projects.locations.multicastConsumerAssociations.delete`

- Versions: v1
- `DELETE https://networkservices.googleapis.com/v1/{+name}`
- Deletes a single multicast consumer association.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the multicast consumer association to delete. Use the following format: `projects/*/locations/*/multicastConsumerAssociations/*`. |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `networkservices.projects.locations.multicastConsumerAssociations.get`

- Versions: v1
- `GET https://networkservices.googleapis.com/v1/{+name}`
- Gets details of a single multicast consumer association.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `MulticastConsumerAssociation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the multicast consumer association to get. Use the following format: `projects/*/locations/*/multicastConsumerAssociations/*`. |

### `networkservices.projects.locations.multicastConsumerAssociations.list`

- Versions: v1
- `GET https://networkservices.googleapis.com/v1/{+parent}/multicastConsumerAssociations`
- Lists multicast consumer associations in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListMulticastConsumerAssociationsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource for which to list multicast consumer associations. Use the following format: `projects/*/locations/*`. |
| `filter` | query | string | no | Optional. A filter expression that filters the resources listed in the response. The expression must be of the form ` ` where operators: `<`, `>`, `<=`, `>=`, `!=`, `=`, `:` are supported (colon `:` represents a HAS operator which is roughly synonymous with equality). can refer to a proto or JSON field, or a synthetic field. Field names can be camelCase or snake_case. Examples: \* Filter by name: name = "RESOURCE_NAME" \* Filter by labels: \* Resources that have a key named `foo` labels.foo:\* \* Resources that have a key named `foo` whose value is `bar` labels.foo = bar |
| `orderBy` | query | string | no | Optional. A field used to sort the results by a certain order. |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of multicast consumer associations to return per call. |
| `pageToken` | query | string | no | Optional. A page token from an earlier query, as returned in `next_page_token`. |

### `networkservices.projects.locations.multicastConsumerAssociations.patch`

- Versions: v1
- `PATCH https://networkservices.googleapis.com/v1/{+name}`
- Updates the parameters of a single multicast consumer association.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `MulticastConsumerAssociation`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. The resource name of the multicast consumer association. Use the following format: `projects/*/locations/*/multicastConsumerAssociations/*`. |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `updateMask` | query | string (google-fieldmask) | no | Optional. Field mask is used to specify the fields to be overwritten in the MulticastConsumerAssociation resource by the update. The fields specified in the `update_mask` are relative to the resource, not the full request. A field will be overwritten if it is in the mask. If the user does not provide a mask then all mutable fields present in the request will be overwritten. |

### `networkservices.projects.locations.multicastGroupConsumerActivations.create`

- Versions: v1
- `POST https://networkservices.googleapis.com/v1/{+parent}/multicastGroupConsumerActivations`
- Creates a new multicast group consumer activation in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `MulticastGroupConsumerActivation`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource of the multicast group consumer activation. Use the following format: `projects/*/locations/*`. |
| `multicastGroupConsumerActivationId` | query | string | yes | Required. A unique name for the multicast group consumer activation. The name is restricted to lower-case letters, numbers, and hyphen, with the first character a lower-case letter, and the last a letter or a number. The name must not exceed 48 characters. |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `networkservices.projects.locations.multicastGroupConsumerActivations.delete`

- Versions: v1
- `DELETE https://networkservices.googleapis.com/v1/{+name}`
- Deletes a single multicast group consumer activation.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the multicast group consumer activation to delete. Use the following format: `projects/*/locations/*/multicastGroupConsumerActivations/*`. |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `networkservices.projects.locations.multicastGroupConsumerActivations.get`

- Versions: v1
- `GET https://networkservices.googleapis.com/v1/{+name}`
- Gets details of a single multicast group consumer activation.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `MulticastGroupConsumerActivation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the multicast group consumer activation to get. Use the following format: `projects/*/locations/*/multicastGroupConsumerActivations/*`. |

### `networkservices.projects.locations.multicastGroupConsumerActivations.list`

- Versions: v1
- `GET https://networkservices.googleapis.com/v1/{+parent}/multicastGroupConsumerActivations`
- Lists multicast group consumer activations in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListMulticastGroupConsumerActivationsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource for which to list multicast group consumer activations. Use the following format: `projects/*/locations/*`. |
| `filter` | query | string | no | Optional. A filter expression that filters the resources listed in the response. The expression must be of the form ` ` where operators: `<`, `>`, `<=`, `>=`, `!=`, `=`, `:` are supported (colon `:` represents a HAS operator which is roughly synonymous with equality). can refer to a proto or JSON field, or a synthetic field. Field names can be camelCase or snake_case. Examples: \* Filter by name: name = "RESOURCE_NAME" \* Filter by labels: \* Resources that have a key named `foo` labels.foo:\* \* Resources that have a key named `foo` whose value is `bar` labels.foo = bar |
| `orderBy` | query | string | no | Optional. A field used to sort the results by a certain order. |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of multicast group consumer activations to return per call. |
| `pageToken` | query | string | no | Optional. A page token from an earlier query, as returned in `next_page_token`. |

### `networkservices.projects.locations.multicastGroupConsumerActivations.patch`

- Versions: v1
- `PATCH https://networkservices.googleapis.com/v1/{+name}`
- Updates the parameters of a single multicast group consumer activation.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `MulticastGroupConsumerActivation`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. The resource name of the multicast group consumer activation. Use the following format: `projects/*/locations/*/multicastGroupConsumerActivations/*`. |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `updateMask` | query | string (google-fieldmask) | no | Optional. Field mask is used to specify the fields to be overwritten in the MulticastGroupConsumerActivation resource by the update. The fields specified in the `update_mask` are relative to the resource, not the full request. A field will be overwritten if it is in the mask. If the user does not provide a mask then all mutable fields present in the request will be overwritten. |

### `networkservices.projects.locations.operations.cancel`

- Versions: v1, v1beta1
- `POST https://networkservices.googleapis.com/v1/{+name}:cancel`
- Starts asynchronous cancellation on a long-running operation. The server makes a best effort to cancel the operation, but success is not guaranteed. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. Clients can use Operations.GetOperation or other methods to check whether the cancellation succeeded or whether the operation completed despite cancellation. On successful cancellation, the operation is not deleted; instead, it becomes an operation with an Operation.error value with a google.rpc.Status.code of `1`, corresponding to `Code.CANCELLED`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `CancelOperationRequest`; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource to be cancelled. |

### `networkservices.projects.locations.operations.delete`

- Versions: v1, v1beta1
- `DELETE https://networkservices.googleapis.com/v1/{+name}`
- Deletes a long-running operation. This method indicates that the client is no longer interested in the operation result. It does not cancel the operation. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource to be deleted. |

### `networkservices.projects.locations.operations.get`

- Versions: v1, v1beta1
- `GET https://networkservices.googleapis.com/v1/{+name}`
- Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource. |

### `networkservices.projects.locations.operations.list`

- Versions: v1, v1beta1
- `GET https://networkservices.googleapis.com/v1/{+name}/operations`
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

### `networkservices.projects.locations.producerExtensions.create`

- Versions: v1, v1beta1
- `POST https://networkservices.googleapis.com/v1/{+parent}/producerExtensions`
- Creates a new `ProducerExtension` resource in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `ProducerExtension`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource of the `ProducerExtension` resource. Must be in the format `projects/{project}/locations/{location}`. |
| `producerExtensionId` | query | string | yes | Required. Short name of the `ProducerExtension` resource to be created. |

### `networkservices.projects.locations.producerExtensions.delete`

- Versions: v1, v1beta1
- `DELETE https://networkservices.googleapis.com/v1/{+name}`
- Deletes the specified `ProducerExtension` resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. A name of the `ProducerExtension` resource to delete. Must be in the format `projects/{project}/locations/{location}/producerExtensions/{producer_extension}`. |
| `etag` | query | string | no | Optional. The etag of the ProducerExtension to delete. |

### `networkservices.projects.locations.producerExtensions.get`

- Versions: v1, v1beta1
- `GET https://networkservices.googleapis.com/v1/{+name}`
- Gets details of the specified `ProducerExtension` resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ProducerExtension`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. A name of the `ProducerExtension` resource to get. Must be in the format `projects/{project}/locations/{location}/producerExtensions/{producer_extension}`. |

### `networkservices.projects.locations.producerExtensions.list`

- Versions: v1, v1beta1
- `GET https://networkservices.googleapis.com/v1/{+parent}/producerExtensions`
- Lists `ProducerExtension` resources in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListProducerExtensionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The project and location from which the `ProducerExtension` resources should be listed, specified in the format `projects/{project}/locations/{location}`. |
| `pageSize` | query | integer (int32) | no | Optional. Maximum number of `ProducerExtension` resources to return per call. |
| `pageToken` | query | string | no | Optional. The value returned by the last `ListProducerExtensionsResponse` Indicates that this is a continuation of a prior `ListProducerExtensions` call, and that the system should return the next page of data. |

### `networkservices.projects.locations.serviceBindings.create`

- Versions: v1, v1beta1
- `POST https://networkservices.googleapis.com/v1/{+parent}/serviceBindings`
- Creates a new ServiceBinding in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `ServiceBinding`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource of the ServiceBinding. Must be in the format `projects/*/locations/*`. |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server can ignore the request if it has already been completed. The server guarantees this for 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server ignores the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID version 4 with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `serviceBindingId` | query | string | yes | Required. Short name of the ServiceBinding resource to be created. |

### `networkservices.projects.locations.serviceBindings.delete`

- Versions: v1, v1beta1
- `DELETE https://networkservices.googleapis.com/v1/{+name}`
- Deletes a single ServiceBinding.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. A name of the ServiceBinding to delete. Must be in the format `projects/*/locations/*/serviceBindings/*`. |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server can ignore the request if it has already been completed. The server guarantees this for 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server ignores the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID version 4 with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `networkservices.projects.locations.serviceBindings.get`

- Versions: v1, v1beta1
- `GET https://networkservices.googleapis.com/v1/{+name}`
- Gets details of a single ServiceBinding.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ServiceBinding`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. A name of the ServiceBinding to get. Must be in the format `projects/*/locations/*/serviceBindings/*`. |

### `networkservices.projects.locations.serviceBindings.list`

- Versions: v1, v1beta1
- `GET https://networkservices.googleapis.com/v1/{+parent}/serviceBindings`
- Lists ServiceBinding in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListServiceBindingsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The project and location from which the ServiceBindings should be listed, specified in the format `projects/*/locations/*`. |
| `pageSize` | query | integer (int32) | no | Maximum number of ServiceBindings to return per call. |
| `pageToken` | query | string | no | The value returned by the last `ListServiceBindingsResponse` Indicates that this is a continuation of a prior `ListRouters` call, and that the system should return the next page of data. |

### `networkservices.projects.locations.serviceBindings.patch`

- Versions: v1, v1beta1
- `PATCH https://networkservices.googleapis.com/v1/{+name}`
- Updates the parameters of a single ServiceBinding.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `ServiceBinding`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. Name of the ServiceBinding resource. It matches pattern `projects/*/locations/*/serviceBindings/`. |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server can ignore the request if it has already been completed. The server guarantees this for 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server ignores the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID version 4 with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `updateMask` | query | string (google-fieldmask) | no | Optional. Field mask is used to specify the fields to be overwritten in the ServiceBinding resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it is in the mask. If the user does not provide a mask then all fields will be overwritten. |

### `networkservices.projects.locations.serviceLbPolicies.create`

- Versions: v1, v1beta1
- `POST https://networkservices.googleapis.com/v1/{+parent}/serviceLbPolicies`
- Creates a new ServiceLbPolicy in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `ServiceLbPolicy`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource of the ServiceLbPolicy. Must be in the format `projects/{project}/locations/{location}`. |
| `serviceLbPolicyId` | query | string | yes | Required. Short name of the ServiceLbPolicy resource to be created. E.g. for resource name `projects/{project}/locations/{location}/serviceLbPolicies/{service_lb_policy_name}`. the id is value of {service_lb_policy_name} |

### `networkservices.projects.locations.serviceLbPolicies.delete`

- Versions: v1, v1beta1
- `DELETE https://networkservices.googleapis.com/v1/{+name}`
- Deletes a single ServiceLbPolicy.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. A name of the ServiceLbPolicy to delete. Must be in the format `projects/{project}/locations/{location}/serviceLbPolicies/*`. |

### `networkservices.projects.locations.serviceLbPolicies.get`

- Versions: v1, v1beta1
- `GET https://networkservices.googleapis.com/v1/{+name}`
- Gets details of a single ServiceLbPolicy.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ServiceLbPolicy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. A name of the ServiceLbPolicy to get. Must be in the format `projects/{project}/locations/{location}/serviceLbPolicies/*`. |

### `networkservices.projects.locations.serviceLbPolicies.list`

- Versions: v1, v1beta1
- `GET https://networkservices.googleapis.com/v1/{+parent}/serviceLbPolicies`
- Lists ServiceLbPolicies in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListServiceLbPoliciesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The project and location from which the ServiceLbPolicies should be listed, specified in the format `projects/{project}/locations/{location}`. |
| `pageSize` | query | integer (int32) | no | Maximum number of ServiceLbPolicies to return per call. |
| `pageToken` | query | string | no | The value returned by the last `ListServiceLbPoliciesResponse` Indicates that this is a continuation of a prior `ListRouters` call, and that the system should return the next page of data. |

### `networkservices.projects.locations.serviceLbPolicies.patch`

- Versions: v1, v1beta1
- `PATCH https://networkservices.googleapis.com/v1/{+name}`
- Updates the parameters of a single ServiceLbPolicy.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `ServiceLbPolicy`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. Name of the ServiceLbPolicy resource. It matches pattern `projects/{project}/locations/{location}/serviceLbPolicies/{service_lb_policy_name}`. |
| `updateMask` | query | string (google-fieldmask) | no | Optional. Field mask is used to specify the fields to be overwritten in the ServiceLbPolicy resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it is in the mask. If the user does not provide a mask then all fields will be overwritten. |

### `networkservices.projects.locations.tcpRoutes.create`

- Versions: v1, v1beta1
- `POST https://networkservices.googleapis.com/v1/{+parent}/tcpRoutes`
- Creates a new TcpRoute in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `TcpRoute`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource of the TcpRoute. Must be in the format `projects/*/locations/*`. |
| `tcpRouteId` | query | string | yes | Required. Short name of the TcpRoute resource to be created. |

### `networkservices.projects.locations.tcpRoutes.delete`

- Versions: v1, v1beta1
- `DELETE https://networkservices.googleapis.com/v1/{+name}`
- Deletes a single TcpRoute.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. A name of the TcpRoute to delete. Must be in the format `projects/*/locations/*/tcpRoutes/*`. |

### `networkservices.projects.locations.tcpRoutes.get`

- Versions: v1, v1beta1
- `GET https://networkservices.googleapis.com/v1/{+name}`
- Gets details of a single TcpRoute.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `TcpRoute`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. A name of the TcpRoute to get. Must be in the format `projects/*/locations/*/tcpRoutes/*`. |

### `networkservices.projects.locations.tcpRoutes.list`

- Versions: v1, v1beta1
- `GET https://networkservices.googleapis.com/v1/{+parent}/tcpRoutes`
- Lists TcpRoute in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListTcpRoutesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The project and location from which the TcpRoutes should be listed, specified in the format `projects/*/locations/*`. |
| `pageSize` | query | integer (int32) | no | Maximum number of TcpRoutes to return per call. |
| `pageToken` | query | string | no | The value returned by the last `ListTcpRoutesResponse` Indicates that this is a continuation of a prior `ListTcpRoutes` call, and that the system should return the next page of data. |
| `returnPartialSuccess` | query | boolean | no | Optional. If true, allow partial responses for multi-regional Aggregated List requests. Otherwise if one of the locations is down or unreachable, the Aggregated List request will fail. |

### Example request skeleton

Generated from the Discovery entry of `networkservices.projects.locations.agentConnectivityTemplates.get` (not in the official docs); replace the `{...}` path variables (URL-encode query values):

```bash
curl -X GET \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  "https://networkservices.googleapis.com/v1/{+name}"
```

## Notes

- Generated from the Discovery document(s) v1, v1beta1 of `networkservices` (retrieved 2026-11-14). Resources on this page: projects.
- The Required column is `yes` for path variables and required parameters, and `conditional` when the description says "Required if ..." (mutually exclusive alternatives), when a `parent.child` parameter is required only inside an optional parent message or one branch of a oneof. Path variables are `yes` unless a note below names an alternative route without them.
- Message schemas (the request and response types named above) are listed under `references/rest-schemas/networkservices/`; they are the `schemas` section of the Discovery documents in Source.
- Corrected from the Discovery document: the description of `name` in `networkservices.projects.locations.lbTcpExtensions.delete` gives the resource name format `projects/{project}/locations/{location}/LbTcpExtensions/{lb_tcp_extension}`, but the path pattern of `name` is `^projects/[^/]+/locations/[^/]+/lbTcpExtensions/[^/]+$`; a value must match the pattern to reach the route.
- Corrected from the Discovery document: the description of `name` in `networkservices.projects.locations.lbTcpExtensions.get` gives the resource name format `projects/{project}/locations/{location}/LbTcpExtensions/{lb_tcp_extension}`, but the path pattern of `name` is `^projects/[^/]+/locations/[^/]+/lbTcpExtensions/[^/]+$`; a value must match the pattern to reach the route.
- Corrected from the Discovery document: the description of `name` in `networkservices.projects.locations.lbTcpExtensions.patch` gives the resource name format `projects/{project}/locations/{location}/LbTcpExtension/{lb_tcp_extension}`, but the path pattern of `name` is `^projects/[^/]+/locations/[^/]+/lbTcpExtensions/[^/]+$`; a value must match the pattern to reach the route.
- Regional endpoints: the Discovery document (`networkservices` v1, revision 20261027) also lists 12 endpoints of the form `https://networkservices.LOCATION.rep.googleapis.com/` (Regional Endpoint), for LOCATION in `us-central1`, `us-central2`, `us-east1`, `us-east4`, `us-east5`, `us-east7`, `us-south1`, `us-west1`, `us-west2`, `us-west3`, `us-west4`, `us-west8`. The method URLs above use the global host `https://networkservices.googleapis.com/`; to send a request through one of these endpoints, replace the host with the endpoint for the resource's location (for example `https://networkservices.us-central1.rep.googleapis.com/`) and keep the path.
- Corrected from the official docs (the Discovery text above is verbatim): `name` descriptions that read "It matches pattern `projects/*/locations/*/<collection>/`" (for `gateways`, `meshes`, `grpcRoutes`, `serviceBindings`, `agentGateways`, `agentConnectivityTemplates` and `expressLinks`) lack the resource ID; the Discovery path patterns of the corresponding `patch` methods end with `/<collection>/[^/]+` (for example `projects/[^/]+/locations/[^/]+/gateways/[^/]+`), so the name is `projects/{project}/locations/{location}/<collection>/{id}`.
- Descriptions are verbatim from Discovery, which drops angle-bracket placeholders of the source comments: a format such as `projects//locations/global` stands for `projects/{project}/locations/global` (likewise `"@.iam.gserviceaccount.com"` lost the account ID before `@`, and a name format ending in a collection such as `projects/*/locations/*/registrations/` lost its last ID), and an expression such as `... && in labels` lost its left operand (for example `'label_value' in labels`). Check the method or field in the product's REST reference before relying on such a format.
- Source: https://networkservices.googleapis.com/$discovery/rest?version=v1, https://networkservices.googleapis.com/$discovery/rest?version=v1beta1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
