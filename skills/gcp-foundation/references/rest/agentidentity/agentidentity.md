---
source: https://agentidentity.googleapis.com/$discovery/rest?version=v1
---

# Agent Identity API REST API (agentidentity)

## Signature / Usage

Base URL: `https://agentidentity.googleapis.com`. Methods are listed by `id`; the `Versions` line shows which API versions define the method (preferred: v1).

### `agentidentity.projects.locations.accessSummaries.get`

- Versions: v1, v1beta, v1alpha
- `GET https://agentidentity.googleapis.com/v1/{+name}`
- Gets details of a single access summary.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `AccessSummary`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the access summary. |

### `agentidentity.projects.locations.accessSummaries.list`

- Versions: v1, v1beta, v1alpha
- `GET https://agentidentity.googleapis.com/v1/{+parent}/accessSummaries`
- Lists access summaries in a given project and location. Supported filters: - `workload_id`: Filter by the SPIFFE ID of the agent. Example: `workload_id="spiffe://example.com/ns/default/sa/my-agent"`
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListAccessSummariesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource where the search is performed. Format: projects/{project}/locations/{location} |
| `filter` | query | string | no | Optional. Filter string to restrict the results. Currently supports filtering by `workload_id` or `auth_provider_name`. If no filter is provided, returns all access summaries for the requested project and location. Format: `workload_id=""` or `auth_provider_name=""` |
| `orderBy` | query | string | no | Optional. This field is currently ignored. Defaults to ordering by (auth_provider_id, user_id) in ascending order. |
| `pageSize` | query | integer (int32) | no | Optional. Requested page size. Server may return fewer items than requested. If unspecified, server will pick an appropriate default. The maximum page size is 1000. |
| `pageToken` | query | string | no | Optional. A token identifying a page of results the server should return. |

### `agentidentity.projects.locations.authProviders.authorizations.delete`

- Versions: v1, v1beta, v1alpha
- `DELETE https://agentidentity.googleapis.com/v1/{+name}`
- Deletes a single authorization.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the authorization to delete. Format: projects/{project}/locations/{location}/authProviders/{auth_provider}/authorizations/{authorization} |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `agentidentity.projects.locations.authProviders.authorizations.get`

- Versions: v1, v1beta, v1alpha
- `GET https://agentidentity.googleapis.com/v1/{+name}`
- Gets details of a single authorization.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Authorization`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the authorization. |

### `agentidentity.projects.locations.authProviders.authorizations.getIamPolicy`

- Versions: v1, v1beta, v1alpha
- `GET https://agentidentity.googleapis.com/v1/{+resource}:getIamPolicy`
- Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |
| `options.requestedPolicyVersion` | query | integer (int32) | no | Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |

### `agentidentity.projects.locations.authProviders.authorizations.list`

- Versions: v1, v1beta, v1alpha
- `GET https://agentidentity.googleapis.com/v1/{+parent}/authorizations`
- Lists authorizations in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListAuthorizationsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource where the search is performed. Format: projects/{project}/locations/{location}/authProviders/{auth_provider} |
| `filter` | query | string | no | Optional. Filter string to restrict the results. Currently supports filtering by `client_user_id` only. Format: `client_user_id=""` |
| `orderBy` | query | string | no | Optional. This field is currently ignored. Defaults to ordering by authorization_id in ascending order. |
| `pageSize` | query | integer (int32) | no | Optional. Requested page size. Server may return fewer items than requested. If unspecified, server will pick an appropriate default. The maximum page size is 1000. |
| `pageToken` | query | string | no | Optional. A page token, received from a previous `ListAuthorizations` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListAuthorizations` must match the call that provided the page token. |

### `agentidentity.projects.locations.authProviders.authorizations.setIamPolicy`

- Versions: v1, v1beta, v1alpha
- `POST https://agentidentity.googleapis.com/v1/{+resource}:setIamPolicy`
- Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `SetIamPolicyRequest`; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `agentidentity.projects.locations.authProviders.authorizations.testIamPermissions`

- Versions: v1, v1beta, v1alpha
- `POST https://agentidentity.googleapis.com/v1/{+resource}:testIamPermissions`
- Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `TestIamPermissionsRequest`; Response: `TestIamPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `agentidentity.projects.locations.authProviders.create`

- Versions: v1, v1beta, v1alpha
- `POST https://agentidentity.googleapis.com/v1/{+parent}/authProviders`
- Creates a new auth provider in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `AuthProvider`; Response: `AuthProvider`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource where the auth provider is created. Format: projects/{project}/locations/{location} |
| `authProviderId` | query | string | yes | Required. The ID to use for the auth provider, which will become the final segment of the auth provider's resource name. This value should be 1-63 characters, and valid characters are /a-z-/. The first character must be a lowercase letter, and the last character must be a lowercase letter or a number. |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `agentidentity.projects.locations.authProviders.delete`

- Versions: v1, v1beta, v1alpha
- `DELETE https://agentidentity.googleapis.com/v1/{+name}`
- Deletes a single auth provider.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the auth provider. |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `agentidentity.projects.locations.authProviders.disable`

- Versions: v1, v1beta, v1alpha
- `POST https://agentidentity.googleapis.com/v1/{+name}:disable`
- Disables a single auth provider.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `DisableAuthProviderRequest`; Response: `AuthProvider`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the auth provider. Format: projects/{project}/locations/{location}/authProviders/{auth_provider} |

### `agentidentity.projects.locations.authProviders.enable`

- Versions: v1, v1beta, v1alpha
- `POST https://agentidentity.googleapis.com/v1/{+name}:enable`
- Enables a single auth provider.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `EnableAuthProviderRequest`; Response: `AuthProvider`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the auth provider. Format: projects/{project}/locations/{location}/authProviders/{auth_provider} |

### `agentidentity.projects.locations.authProviders.get`

- Versions: v1, v1beta, v1alpha
- `GET https://agentidentity.googleapis.com/v1/{+name}`
- Gets details of a single auth provider.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `AuthProvider`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the auth provider. |

### `agentidentity.projects.locations.authProviders.getIamPolicy`

- Versions: v1, v1beta, v1alpha
- `GET https://agentidentity.googleapis.com/v1/{+resource}:getIamPolicy`
- Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |
| `options.requestedPolicyVersion` | query | integer (int32) | no | Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |

### `agentidentity.projects.locations.authProviders.list`

- Versions: v1, v1beta, v1alpha
- `GET https://agentidentity.googleapis.com/v1/{+parent}/authProviders`
- Lists auth providers in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListAuthProvidersResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource where the search is performed. Format: projects/{project}/locations/{location} |
| `filter` | query | string | no | Optional. Filter results. This field is currently ignored. |
| `orderBy` | query | string | no | Optional. Currently ignored. Defaults to ordering by auth_provider_id in ascending order. |
| `pageSize` | query | integer (int32) | no | Optional. Requested page size. Server may return fewer items than requested. If unspecified, server will pick an appropriate default. The maximum page size is 1000. |
| `pageToken` | query | string | no | Optional. A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, the first page is returned. |
| `showDeleted` | query | boolean | no | Optional. Deleted auth providers will be kept with a soft-delete for 30 days before being purged. If this field is set to `true`, deleted auth providers will also be returned. |

### `agentidentity.projects.locations.authProviders.patch`

- Versions: v1, v1beta, v1alpha
- `PATCH https://agentidentity.googleapis.com/v1/{+name}`
- Updates the parameters of a single auth provider.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `AuthProvider`; Response: `AuthProvider`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. The full resource name of the auth provider. Format: projects/{project}/locations/{location}/authProviders/{auth_provider} |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `updateMask` | query | string (google-fieldmask) | no | Optional. Field mask is used to specify the fields to be overwritten in the auth provider resource by the update. The fields specified in the `update_mask` are relative to the resource, not the full request. A field will be overwritten if it is in the mask. If the user does not provide a mask then all fields present in the request will be overwritten. |

### `agentidentity.projects.locations.authProviders.query`

- Versions: v1, v1beta, v1alpha
- `GET https://agentidentity.googleapis.com/v1/{+parent}/authProviders:query`
- Queries which auth providers are used by a given workload ID.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `QueryAuthProvidersResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource where the search is performed. Format: projects/{project}/locations/{location} |
| `pageSize` | query | integer (int32) | no | Optional. Requested page size. Server may return fewer items than requested. If unspecified, server will pick an appropriate default. The maximum page size is 1000. |
| `pageToken` | query | string | no | Optional. A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, the first page is returned. A page token, received from a previous QueryAuthProviders call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to QueryAuthProviders must match the call that provided the page token. |
| `workloadId` | query | string | yes | Required. The workload identifier to filter by. |

### `agentidentity.projects.locations.authProviders.queryWorkloads`

- Versions: v1, v1beta, v1alpha
- `GET https://agentidentity.googleapis.com/v1/{+name}:queryWorkloads`
- Queries which workloads are using a given auth provider.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `QueryWorkloadsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the auth provider to query. Format: projects/{project}/locations/{location}/authProviders/{auth_provider} |
| `pageSize` | query | integer (int32) | no | Optional. Requested page size. Server may return fewer items than requested. If unspecified, server will pick an appropriate default. The maximum page size is 1000. |
| `pageToken` | query | string | no | Optional. A token, which can be sent as `page_token` to retrieve the next page. When paginating, all other parameters provided to `QueryWorkloads` must match the call that provided the page token. If this field is omitted, the first page is returned. |

### `agentidentity.projects.locations.authProviders.resolveAuthorization`

- Versions: v1, v1beta, v1alpha
- `POST https://agentidentity.googleapis.com/v1/{+name}:resolveAuthorization`
- Resolves an authorization for a user on an auth provider, creating one if it does not exist or returning an existing one.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `ResolveAuthorizationRequest`; Response: `ResolveAuthorizationResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the auth provider to resolve authorization for. Format: projects/{project}/locations/{location}/authProviders/{auth_provider} |

### `agentidentity.projects.locations.authProviders.revokeAuthorization`

- Versions: v1, v1beta, v1alpha
- `POST https://agentidentity.googleapis.com/v1/{+name}:revokeAuthorization`
- Revokes all authorizations for a specific user on an auth provider. This deletes all authorization records associated with the user and auth provider, effectively revoking access across all agents.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `RevokeAuthorizationRequest`; Response: `RevokeAuthorizationResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the auth provider. Format: projects/{project}/locations/{location}/authProviders/{auth_provider} |

### `agentidentity.projects.locations.authProviders.setIamPolicy`

- Versions: v1, v1beta, v1alpha
- `POST https://agentidentity.googleapis.com/v1/{+resource}:setIamPolicy`
- Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `SetIamPolicyRequest`; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `agentidentity.projects.locations.authProviders.testIamPermissions`

- Versions: v1, v1beta, v1alpha
- `POST https://agentidentity.googleapis.com/v1/{+resource}:testIamPermissions`
- Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `TestIamPermissionsRequest`; Response: `TestIamPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `agentidentity.projects.locations.authProviders.undelete`

- Versions: v1, v1beta, v1alpha
- `POST https://agentidentity.googleapis.com/v1/{+name}:undelete`
- Undeletes a single auth provider.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `UndeleteAuthProviderRequest`; Response: `AuthProvider`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the auth provider. Format: projects/{project}/locations/{location}/authProviders/{auth_provider} |

### `agentidentity.projects.locations.get`

- Versions: v1, v1beta, v1alpha
- `GET https://agentidentity.googleapis.com/v1/{+name}`
- Gets information about a location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Location`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Resource name for the location. |

### `agentidentity.projects.locations.list`

- Versions: v1, v1beta, v1alpha
- `GET https://agentidentity.googleapis.com/v1/{+name}/locations`
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

### Example request skeleton

Generated from the Discovery entry of `agentidentity.projects.locations.accessSummaries.get` (not in the official docs); replace the `{...}` path variables (URL-encode query values):

```bash
curl -X GET \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  "https://agentidentity.googleapis.com/v1/{+name}"
```

## Notes

- Generated from the Discovery document(s) v1, v1beta, v1alpha of `agentidentity` (retrieved 2026-11-14). Resources on this page: projects.
- The Required column is `yes` for path variables and required parameters, and `conditional` when the description says "Required if ..." (mutually exclusive alternatives) or when a `parent.child` parameter is required only inside an optional parent message or one branch of a oneof.
- Message schemas are listed under `references/rest-schemas/agentidentity/`.
- Source: https://agentidentity.googleapis.com/$discovery/rest?version=v1, https://agentidentity.googleapis.com/$discovery/rest?version=v1beta, https://agentidentity.googleapis.com/$discovery/rest?version=v1alpha (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
