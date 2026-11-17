---
source: https://networksecurity.googleapis.com/$discovery/rest?version=v1
---

# Network Security API REST API (networksecurity) (part 1/2)

## Signature / Usage

Base URL: `https://networksecurity.googleapis.com`. Methods are listed by `id`; the `Versions` line shows which API versions define the method (preferred: v1).

### `networksecurity.organizations.locations.addressGroups.addItems`

- Versions: v1, v1beta1
- `POST https://networksecurity.googleapis.com/v1/{+addressGroup}:addItems`
- Adds items to an address group.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `AddAddressGroupItemsRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `addressGroup` | path | string | yes | Required. A name of the AddressGroup to add items to. Must be in the format `projects\|organization/*/locations/{location}/addressGroups/*`. |

### `networksecurity.organizations.locations.addressGroups.cloneItems`

- Versions: v1, v1beta1
- `POST https://networksecurity.googleapis.com/v1/{+addressGroup}:cloneItems`
- Clones items from one address group to another.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `CloneAddressGroupItemsRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `addressGroup` | path | string | yes | Required. A name of the AddressGroup to clone items to. Must be in the format `projects\|organization/*/locations/{location}/addressGroups/*`. |

### `networksecurity.organizations.locations.addressGroups.create`

- Versions: v1, v1beta1
- `POST https://networksecurity.googleapis.com/v1/{+parent}/addressGroups`
- Creates a new address group in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `AddressGroup`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource of the AddressGroup. Must be in the format `projects/*/locations/{location}`. |
| `addressGroupId` | query | string | yes | Required. Short name of the AddressGroup resource to be created. This value should be 1-63 characters long, containing only letters, numbers, hyphens, and underscores, and should not start with a number. E.g. "authz_policy". |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `networksecurity.organizations.locations.addressGroups.delete`

- Versions: v1, v1beta1
- `DELETE https://networksecurity.googleapis.com/v1/{+name}`
- Deletes an address group.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. A name of the AddressGroup to delete. Must be in the format `projects/*/locations/{location}/addressGroups/*`. |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `networksecurity.organizations.locations.addressGroups.get`

- Versions: v1, v1beta1
- `GET https://networksecurity.googleapis.com/v1/{+name}`
- Gets details of a single address group.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `AddressGroup`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. A name of the AddressGroup to get. Must be in the format `projects/*/locations/{location}/addressGroups/*`. |

### `networksecurity.organizations.locations.addressGroups.list`

- Versions: v1, v1beta1
- `GET https://networksecurity.googleapis.com/v1/{+parent}/addressGroups`
- Lists address groups in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListAddressGroupsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The project and location from which the AddressGroups should be listed, specified in the format `projects/*/locations/{location}`. |
| `pageSize` | query | integer (int32) | no | Maximum number of AddressGroups to return per call. |
| `pageToken` | query | string | no | The value returned by the last `ListAddressGroupsResponse` Indicates that this is a continuation of a prior `ListAddressGroups` call, and that the system should return the next page of data. |
| `returnPartialSuccess` | query | boolean | no | Optional. If true, allow partial responses for multi-regional Aggregated List requests. |

### `networksecurity.organizations.locations.addressGroups.listReferences`

- Versions: v1, v1beta1
- `GET https://networksecurity.googleapis.com/v1/{+addressGroup}:listReferences`
- Lists references of an address group.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListAddressGroupReferencesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `addressGroup` | path | string | yes | Required. A name of the AddressGroup to clone items to. Must be in the format `projects\|organization/*/locations/{location}/addressGroups/*`. |
| `pageSize` | query | integer (int32) | no | The maximum number of references to return. If unspecified, server will pick an appropriate default. Server may return fewer items than requested. A caller should only rely on response's next_page_token to determine if there are more AddressGroupUsers left to be queried. |
| `pageToken` | query | string | no | The next_page_token value returned from a previous List request, if any. |

### `networksecurity.organizations.locations.addressGroups.patch`

- Versions: v1, v1beta1
- `PATCH https://networksecurity.googleapis.com/v1/{+name}`
- Updates parameters of an address group.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `AddressGroup`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the AddressGroup resource. It matches pattern `projects/*/locations/{location}/addressGroups/`. |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `updateMask` | query | string (google-fieldmask) | no | Optional. Field mask is used to specify the fields to be overwritten in the AddressGroup resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it is in the mask. If the user does not provide a mask then all fields will be overwritten. |

### `networksecurity.organizations.locations.addressGroups.removeItems`

- Versions: v1, v1beta1
- `POST https://networksecurity.googleapis.com/v1/{+addressGroup}:removeItems`
- Removes items from an address group.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `RemoveAddressGroupItemsRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `addressGroup` | path | string | yes | Required. A name of the AddressGroup to remove items from. Must be in the format `projects\|organization/*/locations/{location}/addressGroups/*`. |

### `networksecurity.organizations.locations.addressGroups.testIamPermissions`

- Versions: v1, v1beta1
- `POST https://networksecurity.googleapis.com/v1/{+resource}:testIamPermissions`
- Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleIamV1TestIamPermissionsRequest`; Response: `GoogleIamV1TestIamPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `networksecurity.organizations.locations.firewallEndpoints.create`

- Versions: v1, v1beta1
- `POST https://networksecurity.googleapis.com/v1/{+parent}/firewallEndpoints`
- Creates a new firewall endpoint in a given organization and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `FirewallEndpoint`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource where this firewall endpoint is created. Format: `organizations/{organization}/locations/{location}` or `projects/{project}/locations/{location}`. |
| `firewallEndpointId` | query | string | yes | Required. The ID to use for the firewall endpoint, which becomes the final component of the endpoint's resource name. This value must be 1-63 characters long, start with a lowercase letter, contain only lowercase letters, numbers, and hyphens, and cannot end with a hyphen. |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server knows to ignore the request if it has already been completed. The server guarantees that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if the original operation with the same request ID was received, and if so, ignores the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (`00000000-0000-0000-0000-000000000000`). |
| `validateOnly` | query | boolean | no | Optional. If set, validates the request and previews the endpoint, but does not actually create it. |

### `networksecurity.organizations.locations.firewallEndpoints.delete`

- Versions: v1, v1beta1
- `DELETE https://networksecurity.googleapis.com/v1/{+name}`
- Deletes a single organization endpoint.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the resource. |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server knows to ignore the request if it has already been completed. The server guarantees that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if the original operation with the same request ID was received, and if so, ignores the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (`00000000-0000-0000-0000-000000000000`). |

### `networksecurity.organizations.locations.firewallEndpoints.get`

- Versions: v1, v1beta1
- `GET https://networksecurity.googleapis.com/v1/{+name}`
- Gets details of a single organization endpoint.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `FirewallEndpoint`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the resource. |

### `networksecurity.organizations.locations.firewallEndpoints.list`

- Versions: v1, v1beta1
- `GET https://networksecurity.googleapis.com/v1/{+parent}/firewallEndpoints`
- Lists firewall endpoints in a given organization and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListFirewallEndpointsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource from which the firewall endpoints are listed. Format: `organizations/{organization}/locations/{location}` or `projects/{project}/locations/{location}`. |
| `filter` | query | string | no | Optional. Filtering results. |
| `orderBy` | query | string | no | Optional. Hint for how to order the results. |
| `pageSize` | query | integer (int32) | no | Optional. Requested page size. The server might return fewer items than requested. The maximum value is 1000; values above 1000 are coerced to 1000. If unspecified, the server picks an appropriate default. |
| `pageToken` | query | string | no | A page token, received from a previous `ListFirewallEndpoints` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListFirewallEndpoints` must match the call that provided the page token. |

### `networksecurity.organizations.locations.firewallEndpoints.patch`

- Versions: v1, v1beta1
- `PATCH https://networksecurity.googleapis.com/v1/{+name}`
- Updates a single organization endpoint.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `FirewallEndpoint`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Immutable. Identifier. The name of the resource. |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server knows to ignore the request if it has already been completed. The server guarantees that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if the original operation with the same request ID was received, and if so, ignores the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (`00000000-0000-0000-0000-000000000000`). |
| `updateMask` | query | string (google-fieldmask) | yes | Required. Field mask used to specify the fields to be overwritten in the `FirewallEndpoint` resource by the update. The fields specified in the `update_mask` are relative to the resource, not the full request. A field is overwritten if it is in the mask. If the user does not provide a mask, then all fields present in the request are overwritten. |

### `networksecurity.organizations.locations.firewallEndpoints.wildfireVerdictChangeRequests.create`

- Versions: v1, v1beta1
- `POST https://networksecurity.googleapis.com/v1/{+parent}/wildfireVerdictChangeRequests`
- Creates an Advanced malware sandbox verdict change request in a given firewall endpoint in an organization and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `WildfireVerdictChangeRequest`; Response: `WildfireVerdictChangeRequest`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Parent value for `CreateWildfireVerdictChangeRequestRequest`. The parent is a firewall endpoint resource. Format: `organizations/{organization}/locations/{location}/firewallEndpoints/{firewall_endpoint}` or `projects/{project}/locations/{location}/firewallEndpoints/{firewall_endpoint}`. |

### `networksecurity.organizations.locations.firewallEndpoints.wildfireVerdictChangeRequests.get`

- Versions: v1, v1beta1
- `GET https://networksecurity.googleapis.com/v1/{+name}`
- Gets an Advanced malware sandbox verdict change request in a given firewall endpoint in an organization and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `WildfireVerdictChangeRequest`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the `WildfireVerdictChangeRequest` to retrieve. Format: `organizations/{organization}/locations/{location}/firewallEndpoints/{firewall_endpoint}/wildfireVerdictChangeRequests/{wildfire_verdict_change_request_id}` or `projects/{project}/locations/{location}/firewallEndpoints/{firewall_endpoint}/wildfireVerdictChangeRequests/{wildfire_verdict_change_request_id}`. Where `{wildfire_verdict_change_request_id}` is an ID in the format `^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$`. |

### `networksecurity.organizations.locations.firewallEndpoints.wildfireVerdictChangeRequests.list`

- Versions: v1, v1beta1
- `GET https://networksecurity.googleapis.com/v1/{+parent}/wildfireVerdictChangeRequests`
- Lists the Advanced malware sandbox (WildFire) verdict change requests in a given firewall endpoint in an organization and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListWildfireVerdictChangeRequestsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Parent value for `ListWildfireVerdictChangeRequestsRequest`. The parent is a firewall endpoint resource. Format: `organizations/{organization}/locations/{location}/firewallEndpoints/{firewall_endpoint}` or `projects/{project}/locations/{location}/firewallEndpoints/{firewall_endpoint}`. |
| `filter` | query | string | no | Optional. Filter expression to filter the results. Supported fields are: - `sha256` (string, equality only, for example, `sha256 = "..."`) - `state` (enum, equality only, valid values are `OPEN`, `CLOSED`, or `PENDING`, for example, `state = "PENDING"`) - `create_time` (timestamp, comparisons, for example, `create_time >= "2026-01-01T00:00:00Z" AND create_time <= "2026-01-31T23:59:59Z"`). If filtering by `create_time`, you must specify both a start time and an end time. If `create_time` is not specified, the query defaults to the past 30 days. |
| `pageSize` | query | integer (int32) | no | Optional. Requested page size. The server might return fewer items than requested. If unspecified, the server picks an appropriate default. |
| `pageToken` | query | string | no | Optional. A page token, received from a previous `ListWildfireVerdictChangeRequests` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListWildfireVerdictChangeRequests` must match the call that provided the page token. |

### `networksecurity.organizations.locations.get`

- Versions: v1, v1beta1
- `GET https://networksecurity.googleapis.com/v1/{+name}`
- Gets information about a location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Location`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Resource name for the location. |

### `networksecurity.organizations.locations.list`

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

### `networksecurity.organizations.locations.operations.cancel`

- Versions: v1, v1beta1
- `POST https://networksecurity.googleapis.com/v1/{+name}:cancel`
- Starts asynchronous cancellation on a long-running operation. The server makes a best effort to cancel the operation, but success is not guaranteed. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. Clients can use Operations.GetOperation or other methods to check whether the cancellation succeeded or whether the operation completed despite cancellation. On successful cancellation, the operation is not deleted; instead, it becomes an operation with an Operation.error value with a google.rpc.Status.code of `1`, corresponding to `Code.CANCELLED`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `CancelOperationRequest`; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource to be cancelled. |

### `networksecurity.organizations.locations.operations.delete`

- Versions: v1, v1beta1
- `DELETE https://networksecurity.googleapis.com/v1/{+name}`
- Deletes a long-running operation. This method indicates that the client is no longer interested in the operation result. It does not cancel the operation. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource to be deleted. |

### `networksecurity.organizations.locations.operations.get`

- Versions: v1, v1beta1
- `GET https://networksecurity.googleapis.com/v1/{+name}`
- Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource. |

### `networksecurity.organizations.locations.operations.list`

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

### `networksecurity.organizations.locations.securityProfileGroups.create`

- Versions: v1, v1beta1
- `POST https://networksecurity.googleapis.com/v1/{+parent}/securityProfileGroups`
- Creates a new security profile group in a given organization and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `SecurityProfileGroup`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource of the `SecurityProfileGroup`. Format: `organizations/{organization}/locations/{location}` or `projects/{project}/locations/{location}`. |
| `securityProfileGroupId` | query | string | yes | Required. Short name of the `SecurityProfileGroup` resource to be created. This value must be 1 to 63 characters long, contain only lowercase letters, numbers, and hyphens, and must not start with a number. For example, `security-profile-group1`. |

### `networksecurity.organizations.locations.securityProfileGroups.delete`

- Versions: v1, v1beta1
- `DELETE https://networksecurity.googleapis.com/v1/{+name}`
- Deletes a single security profile group.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the `SecurityProfileGroup` to delete. Format: `organizations/{organization}/locations/{location}/securityProfileGroups/{security_profile_group}` or `projects/{project}/locations/{location}/securityProfileGroups/{security_profile_group}`. |
| `etag` | query | string | no | Optional. If the client-provided `etag` is out of date, the delete request returns an `ABORTED` error. |

### `networksecurity.organizations.locations.securityProfileGroups.get`

- Versions: v1, v1beta1
- `GET https://networksecurity.googleapis.com/v1/{+name}`
- Gets details of a single security profile group.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `SecurityProfileGroup`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the `SecurityProfileGroup` to get. Format: `organizations/{organization}/locations/{location}/securityProfileGroups/{security_profile_group}` or `projects/{project}/locations/{location}/securityProfileGroups/{security_profile_group}`. |

### `networksecurity.organizations.locations.securityProfileGroups.list`

- Versions: v1, v1beta1
- `GET https://networksecurity.googleapis.com/v1/{+parent}/securityProfileGroups`
- Lists security profile group resources in a given organization and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListSecurityProfileGroupsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The project or organization and location from which the `SecurityProfileGroup` resources are listed. Format: `organizations/{organization}/locations/{location}` or `projects/{project}/locations/{location}`. |
| `pageSize` | query | integer (int32) | no | Optional. Maximum number of `SecurityProfileGroup` resources to return per call. The maximum value is 1000; values above 1000 are coerced to 1000. If unspecified, the server picks an appropriate default. |
| `pageToken` | query | string | no | Optional. A page token, received from a previous `ListSecurityProfileGroups` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListSecurityProfileGroups` must match the call that provided the page token. |

### `networksecurity.organizations.locations.securityProfileGroups.patch`

- Versions: v1, v1beta1
- `PATCH https://networksecurity.googleapis.com/v1/{+name}`
- Updates the parameters of a single security profile group.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `SecurityProfileGroup`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Immutable. Identifier. Name of the `SecurityProfileGroup` resource. Format: `organizations/{organization}/locations/{location}/securityProfileGroups/{security_profile_group}` or `projects/{project}/locations/{location}/securityProfileGroups/{security_profile_group}`. |
| `updateMask` | query | string (google-fieldmask) | yes | Required. Field mask is used to specify the fields to be overwritten in the `SecurityProfileGroup` resource by the update. The fields specified in the `update_mask` are relative to the resource, not the full request. A field is overwritten if it is in the mask. |

### `networksecurity.organizations.locations.securityProfiles.create`

- Versions: v1, v1beta1
- `POST https://networksecurity.googleapis.com/v1/{+parent}/securityProfiles`
- Creates a new security profile in a given organization and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `SecurityProfile`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource of the `SecurityProfile`. Format: `organizations/{organization}/locations/{location}` or `projects/{project}/locations/{location}`. |
| `securityProfileId` | query | string | yes | Required. Short name of the `SecurityProfile` resource to be created. This value must be 1 to 63 characters long, contain only lowercase letters, numbers, and hyphens, and must not start with a number. For example, `security-profile1`. |

### `networksecurity.organizations.locations.securityProfiles.delete`

- Versions: v1, v1beta1
- `DELETE https://networksecurity.googleapis.com/v1/{+name}`
- Deletes a single security profile.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the `SecurityProfile` to delete. Format: `organizations/{organization}/locations/{location}/securityProfiles/{security_profile}` or `projects/{project}/locations/{location}/securityProfiles/{security_profile}`. |
| `etag` | query | string | no | Optional. If the client-provided `etag` is out of date, the delete request returns an `ABORTED` error. |

### `networksecurity.organizations.locations.securityProfiles.get`

- Versions: v1, v1beta1
- `GET https://networksecurity.googleapis.com/v1/{+name}`
- Gets details of a single security profile.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `SecurityProfile`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the `SecurityProfile` to get. Format: `organizations/{organization}/locations/{location}/securityProfiles/{security_profile}` or `projects/{project}/locations/{location}/securityProfiles/{security_profile}`. |

### `networksecurity.organizations.locations.securityProfiles.list`

- Versions: v1, v1beta1
- `GET https://networksecurity.googleapis.com/v1/{+parent}/securityProfiles`
- Lists security profile resources in a given organization and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListSecurityProfilesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The project or organization and location from which the `SecurityProfile` resources are listed. Format: `organizations/{organization}/locations/{location}` or `projects/{project}/locations/{location}`. |
| `pageSize` | query | integer (int32) | no | Optional. Maximum number of `SecurityProfile` resources to return per call. The maximum value is 1000; values above 1000 are coerced to 1000. If unspecified, the server picks an appropriate default. |
| `pageToken` | query | string | no | Optional. A page token, received from a previous `ListSecurityProfiles` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListSecurityProfiles` must match the call that provided the page token. |

### `networksecurity.organizations.locations.securityProfiles.patch`

- Versions: v1, v1beta1
- `PATCH https://networksecurity.googleapis.com/v1/{+name}`
- Updates the parameters of a single security profile.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `SecurityProfile`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Immutable. Identifier. Name of the `SecurityProfile` resource. Format: `organizations/{organization}/locations/{location}/securityProfiles/{security_profile}` or `projects/{project}/locations/{location}/securityProfiles/{security_profile}`. |
| `updateMask` | query | string (google-fieldmask) | yes | Required. Field mask is used to specify the fields to be overwritten in the `SecurityProfile` resource by the update. The fields specified in the `update_mask` are relative to the resource, not the full request. A field is overwritten if it is in the mask. |

### `networksecurity.projects.locations.addressGroups.addItems`

- Versions: v1, v1beta1
- `POST https://networksecurity.googleapis.com/v1/{+addressGroup}:addItems`
- Adds items to an address group.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `AddAddressGroupItemsRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `addressGroup` | path | string | yes | Required. A name of the AddressGroup to add items to. Must be in the format `projects\|organization/*/locations/{location}/addressGroups/*`. |

### `networksecurity.projects.locations.addressGroups.cloneItems`

- Versions: v1, v1beta1
- `POST https://networksecurity.googleapis.com/v1/{+addressGroup}:cloneItems`
- Clones items from one address group to another.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `CloneAddressGroupItemsRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `addressGroup` | path | string | yes | Required. A name of the AddressGroup to clone items to. Must be in the format `projects\|organization/*/locations/{location}/addressGroups/*`. |

### `networksecurity.projects.locations.addressGroups.create`

- Versions: v1, v1beta1
- `POST https://networksecurity.googleapis.com/v1/{+parent}/addressGroups`
- Creates a new address group in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `AddressGroup`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource of the AddressGroup. Must be in the format `projects/*/locations/{location}`. |
| `addressGroupId` | query | string | yes | Required. Short name of the AddressGroup resource to be created. This value should be 1-63 characters long, containing only letters, numbers, hyphens, and underscores, and should not start with a number. E.g. "authz_policy". |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `networksecurity.projects.locations.addressGroups.delete`

- Versions: v1, v1beta1
- `DELETE https://networksecurity.googleapis.com/v1/{+name}`
- Deletes a single address group.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. A name of the AddressGroup to delete. Must be in the format `projects/*/locations/{location}/addressGroups/*`. |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `networksecurity.projects.locations.addressGroups.get`

- Versions: v1, v1beta1
- `GET https://networksecurity.googleapis.com/v1/{+name}`
- Gets details of a single address group.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `AddressGroup`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. A name of the AddressGroup to get. Must be in the format `projects/*/locations/{location}/addressGroups/*`. |

### `networksecurity.projects.locations.addressGroups.getIamPolicy`

- Versions: v1, v1beta1
- `GET https://networksecurity.googleapis.com/v1/{+resource}:getIamPolicy`
- Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleIamV1Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |
| `options.requestedPolicyVersion` | query | integer (int32) | no | Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |

### `networksecurity.projects.locations.addressGroups.list`

- Versions: v1, v1beta1
- `GET https://networksecurity.googleapis.com/v1/{+parent}/addressGroups`
- Lists address groups in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListAddressGroupsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The project and location from which the AddressGroups should be listed, specified in the format `projects/*/locations/{location}`. |
| `pageSize` | query | integer (int32) | no | Maximum number of AddressGroups to return per call. |
| `pageToken` | query | string | no | The value returned by the last `ListAddressGroupsResponse` Indicates that this is a continuation of a prior `ListAddressGroups` call, and that the system should return the next page of data. |
| `returnPartialSuccess` | query | boolean | no | Optional. If true, allow partial responses for multi-regional Aggregated List requests. |

### `networksecurity.projects.locations.addressGroups.listReferences`

- Versions: v1, v1beta1
- `GET https://networksecurity.googleapis.com/v1/{+addressGroup}:listReferences`
- Lists references of an address group.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListAddressGroupReferencesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `addressGroup` | path | string | yes | Required. A name of the AddressGroup to clone items to. Must be in the format `projects\|organization/*/locations/{location}/addressGroups/*`. |
| `pageSize` | query | integer (int32) | no | The maximum number of references to return. If unspecified, server will pick an appropriate default. Server may return fewer items than requested. A caller should only rely on response's next_page_token to determine if there are more AddressGroupUsers left to be queried. |
| `pageToken` | query | string | no | The next_page_token value returned from a previous List request, if any. |

### `networksecurity.projects.locations.addressGroups.patch`

- Versions: v1, v1beta1
- `PATCH https://networksecurity.googleapis.com/v1/{+name}`
- Updates the parameters of a single address group.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `AddressGroup`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the AddressGroup resource. It matches pattern `projects/*/locations/{location}/addressGroups/`. |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `updateMask` | query | string (google-fieldmask) | no | Optional. Field mask is used to specify the fields to be overwritten in the AddressGroup resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it is in the mask. If the user does not provide a mask then all fields will be overwritten. |

### `networksecurity.projects.locations.addressGroups.removeItems`

- Versions: v1, v1beta1
- `POST https://networksecurity.googleapis.com/v1/{+addressGroup}:removeItems`
- Removes items from an address group.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `RemoveAddressGroupItemsRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `addressGroup` | path | string | yes | Required. A name of the AddressGroup to remove items from. Must be in the format `projects\|organization/*/locations/{location}/addressGroups/*`. |

### `networksecurity.projects.locations.addressGroups.setIamPolicy`

- Versions: v1, v1beta1
- `POST https://networksecurity.googleapis.com/v1/{+resource}:setIamPolicy`
- Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleIamV1SetIamPolicyRequest`; Response: `GoogleIamV1Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `networksecurity.projects.locations.addressGroups.testIamPermissions`

- Versions: v1, v1beta1
- `POST https://networksecurity.googleapis.com/v1/{+resource}:testIamPermissions`
- Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleIamV1TestIamPermissionsRequest`; Response: `GoogleIamV1TestIamPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `networksecurity.projects.locations.authorizationPolicies.create`

- Versions: v1, v1beta1
- `POST https://networksecurity.googleapis.com/v1/{+parent}/authorizationPolicies`
- Creates a new AuthorizationPolicy in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `AuthorizationPolicy`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource of the AuthorizationPolicy. Must be in the format `projects/{project}/locations/{location}`. |
| `authorizationPolicyId` | query | string | yes | Required. Short name of the AuthorizationPolicy resource to be created. This value should be 1-63 characters long, containing only letters, numbers, hyphens, and underscores, and should not start with a number. E.g. "authz_policy". |

### `networksecurity.projects.locations.authorizationPolicies.delete`

- Versions: v1, v1beta1
- `DELETE https://networksecurity.googleapis.com/v1/{+name}`
- Deletes a single AuthorizationPolicy.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. A name of the AuthorizationPolicy to delete. Must be in the format `projects/{project}/locations/{location}/authorizationPolicies/*`. |

### `networksecurity.projects.locations.authorizationPolicies.get`

- Versions: v1, v1beta1
- `GET https://networksecurity.googleapis.com/v1/{+name}`
- Gets details of a single AuthorizationPolicy.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `AuthorizationPolicy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. A name of the AuthorizationPolicy to get. Must be in the format `projects/{project}/locations/{location}/authorizationPolicies/*`. |

### `networksecurity.projects.locations.authorizationPolicies.getIamPolicy`

- Versions: v1, v1beta1
- `GET https://networksecurity.googleapis.com/v1/{+resource}:getIamPolicy`
- Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleIamV1Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |
| `options.requestedPolicyVersion` | query | integer (int32) | no | Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |

### `networksecurity.projects.locations.authorizationPolicies.list`

- Versions: v1, v1beta1
- `GET https://networksecurity.googleapis.com/v1/{+parent}/authorizationPolicies`
- Lists AuthorizationPolicies in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListAuthorizationPoliciesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The project and location from which the AuthorizationPolicies should be listed, specified in the format `projects/{project}/locations/{location}`. |
| `pageSize` | query | integer (int32) | no | Maximum number of AuthorizationPolicies to return per call. |
| `pageToken` | query | string | no | The value returned by the last `ListAuthorizationPoliciesResponse` Indicates that this is a continuation of a prior `ListAuthorizationPolicies` call, and that the system should return the next page of data. |

### `networksecurity.projects.locations.authorizationPolicies.patch`

- Versions: v1, v1beta1
- `PATCH https://networksecurity.googleapis.com/v1/{+name}`
- Updates the parameters of a single AuthorizationPolicy.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `AuthorizationPolicy`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the AuthorizationPolicy resource. It matches pattern `projects/{project}/locations/{location}/authorizationPolicies/`. |
| `updateMask` | query | string (google-fieldmask) | no | Optional. Field mask is used to specify the fields to be overwritten in the AuthorizationPolicy resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it is in the mask. If the user does not provide a mask then all fields will be overwritten. |

### `networksecurity.projects.locations.authorizationPolicies.setIamPolicy`

- Versions: v1, v1beta1
- `POST https://networksecurity.googleapis.com/v1/{+resource}:setIamPolicy`
- Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleIamV1SetIamPolicyRequest`; Response: `GoogleIamV1Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `networksecurity.projects.locations.authorizationPolicies.testIamPermissions`

- Versions: v1, v1beta1
- `POST https://networksecurity.googleapis.com/v1/{+resource}:testIamPermissions`
- Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleIamV1TestIamPermissionsRequest`; Response: `GoogleIamV1TestIamPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `networksecurity.projects.locations.authzPolicies.create`

- Versions: v1, v1beta1
- `POST https://networksecurity.googleapis.com/v1/{+parent}/authzPolicies`
- Creates a new AuthzPolicy in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `AuthzPolicy`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource of the `AuthzPolicy` resource. Must be in the format `projects/{project}/locations/{location}`. |
| `authzPolicyId` | query | string | yes | Required. User-provided ID of the `AuthzPolicy` resource to be created. |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server can ignore the request if it has already been completed. The server guarantees that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, ignores the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `networksecurity.projects.locations.authzPolicies.delete`

- Versions: v1, v1beta1
- `DELETE https://networksecurity.googleapis.com/v1/{+name}`
- Deletes a single AuthzPolicy.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the `AuthzPolicy` resource to delete. Must be in the format `projects/{project}/locations/{location}/authzPolicies/{authz_policy}`. |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server can ignore the request if it has already been completed. The server guarantees that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, ignores the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `networksecurity.projects.locations.authzPolicies.get`

- Versions: v1, v1beta1
- `GET https://networksecurity.googleapis.com/v1/{+name}`
- Gets details of a single AuthzPolicy.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `AuthzPolicy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. A name of the `AuthzPolicy` resource to get. Must be in the format `projects/{project}/locations/{location}/authzPolicies/{authz_policy}`. |

### `networksecurity.projects.locations.authzPolicies.getIamPolicy`

- Versions: v1, v1beta1
- `GET https://networksecurity.googleapis.com/v1/{+resource}:getIamPolicy`
- Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleIamV1Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |
| `options.requestedPolicyVersion` | query | integer (int32) | no | Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |

### `networksecurity.projects.locations.authzPolicies.list`

- Versions: v1, v1beta1
- `GET https://networksecurity.googleapis.com/v1/{+parent}/authzPolicies`
- Lists AuthzPolicies in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListAuthzPoliciesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The project and location from which the `AuthzPolicy` resources are listed, specified in the following format: `projects/{project}/locations/{location}`. |
| `filter` | query | string | no | Optional. Filtering results. |
| `orderBy` | query | string | no | Optional. Hint for how to order the results. |
| `pageSize` | query | integer (int32) | no | Optional. Requested page size. The server might return fewer items than requested. If unspecified, the server picks an appropriate default. |
| `pageToken` | query | string | no | Optional. A token identifying a page of results that the server returns. |

### `networksecurity.projects.locations.authzPolicies.patch`

- Versions: v1, v1beta1
- `PATCH https://networksecurity.googleapis.com/v1/{+name}`
- Updates the parameters of a single AuthzPolicy.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `AuthzPolicy`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Identifier. Name of the `AuthzPolicy` resource in the following format: `projects/{project}/locations/{location}/authzPolicies/{authz_policy}`. |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server can ignore the request if it has already been completed. The server guarantees that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, ignores the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `updateMask` | query | string (google-fieldmask) | yes | Required. Used to specify the fields to be overwritten in the `AuthzPolicy` resource by the update. The fields specified in the `update_mask` are relative to the resource, not the full request. A field is overwritten if it is in the mask. If the user does not specify a mask, then all fields are overwritten. |

### `networksecurity.projects.locations.authzPolicies.setIamPolicy`

- Versions: v1, v1beta1
- `POST https://networksecurity.googleapis.com/v1/{+resource}:setIamPolicy`
- Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleIamV1SetIamPolicyRequest`; Response: `GoogleIamV1Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `networksecurity.projects.locations.authzPolicies.testIamPermissions`

- Versions: v1, v1beta1
- `POST https://networksecurity.googleapis.com/v1/{+resource}:testIamPermissions`
- Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleIamV1TestIamPermissionsRequest`; Response: `GoogleIamV1TestIamPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `networksecurity.projects.locations.backendAuthenticationConfigs.create`

- Versions: v1, v1beta1
- `POST https://networksecurity.googleapis.com/v1/{+parent}/backendAuthenticationConfigs`
- Creates a new BackendAuthenticationConfig in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `BackendAuthenticationConfig`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource of the BackendAuthenticationConfig. Must be in the format `projects/*/locations/{location}`. |
| `backendAuthenticationConfigId` | query | string | yes | Required. Short name of the BackendAuthenticationConfig resource to be created. This value should be 1-63 characters long, containing only letters, numbers, hyphens, and underscores, and should not start with a number. E.g. "backend-auth-config". |

### `networksecurity.projects.locations.backendAuthenticationConfigs.delete`

- Versions: v1, v1beta1
- `DELETE https://networksecurity.googleapis.com/v1/{+name}`
- Deletes a single BackendAuthenticationConfig to BackendAuthenticationConfig.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. A name of the BackendAuthenticationConfig to delete. Must be in the format `projects/*/locations/{location}/backendAuthenticationConfigs/*`. |
| `etag` | query | string | no | Optional. Etag of the resource. If this is provided, it must match the server's etag. |

### `networksecurity.projects.locations.backendAuthenticationConfigs.get`

- Versions: v1, v1beta1
- `GET https://networksecurity.googleapis.com/v1/{+name}`
- Gets details of a single BackendAuthenticationConfig to BackendAuthenticationConfig.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `BackendAuthenticationConfig`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. A name of the BackendAuthenticationConfig to get. Must be in the format `projects/*/locations/{location}/backendAuthenticationConfigs/*`. |

### `networksecurity.projects.locations.backendAuthenticationConfigs.list`

- Versions: v1, v1beta1
- `GET https://networksecurity.googleapis.com/v1/{+parent}/backendAuthenticationConfigs`
- Lists BackendAuthenticationConfigs in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListBackendAuthenticationConfigsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The project and location from which the BackendAuthenticationConfigs should be listed, specified in the format `projects/*/locations/{location}`. |
| `pageSize` | query | integer (int32) | no | Maximum number of BackendAuthenticationConfigs to return per call. |
| `pageToken` | query | string | no | The value returned by the last `ListBackendAuthenticationConfigsResponse` Indicates that this is a continuation of a prior `ListBackendAuthenticationConfigs` call, and that the system should return the next page of data. |

### `networksecurity.projects.locations.backendAuthenticationConfigs.patch`

- Versions: v1, v1beta1
- `PATCH https://networksecurity.googleapis.com/v1/{+name}`
- Updates the parameters of a single BackendAuthenticationConfig to BackendAuthenticationConfig.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `BackendAuthenticationConfig`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the BackendAuthenticationConfig resource. It matches the pattern `projects/*/locations/{location}/backendAuthenticationConfigs/{backend_authentication_config}` |
| `updateMask` | query | string (google-fieldmask) | no | Optional. Field mask is used to specify the fields to be overwritten in the BackendAuthenticationConfig resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it is in the mask. If the user does not provide a mask then all fields will be overwritten. |

### `networksecurity.projects.locations.clientTlsPolicies.create`

- Versions: v1, v1beta1
- `POST https://networksecurity.googleapis.com/v1/{+parent}/clientTlsPolicies`
- Creates a new ClientTlsPolicy in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `ClientTlsPolicy`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource of the ClientTlsPolicy. Must be in the format `projects/*/locations/{location}`. |
| `clientTlsPolicyId` | query | string | yes | Required. Short name of the ClientTlsPolicy resource to be created. This value should be 1-63 characters long, containing only letters, numbers, hyphens, and underscores, and should not start with a number. E.g. "client_mtls_policy". |

### `networksecurity.projects.locations.clientTlsPolicies.delete`

- Versions: v1, v1beta1
- `DELETE https://networksecurity.googleapis.com/v1/{+name}`
- Deletes a single ClientTlsPolicy.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. A name of the ClientTlsPolicy to delete. Must be in the format `projects/*/locations/{location}/clientTlsPolicies/*`. |

### `networksecurity.projects.locations.clientTlsPolicies.get`

- Versions: v1, v1beta1
- `GET https://networksecurity.googleapis.com/v1/{+name}`
- Gets details of a single ClientTlsPolicy.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ClientTlsPolicy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. A name of the ClientTlsPolicy to get. Must be in the format `projects/*/locations/{location}/clientTlsPolicies/*`. |

### `networksecurity.projects.locations.clientTlsPolicies.getIamPolicy`

- Versions: v1, v1beta1
- `GET https://networksecurity.googleapis.com/v1/{+resource}:getIamPolicy`
- Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleIamV1Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |
| `options.requestedPolicyVersion` | query | integer (int32) | no | Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |

### `networksecurity.projects.locations.clientTlsPolicies.list`

- Versions: v1, v1beta1
- `GET https://networksecurity.googleapis.com/v1/{+parent}/clientTlsPolicies`
- Lists ClientTlsPolicies in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListClientTlsPoliciesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The project and location from which the ClientTlsPolicies should be listed, specified in the format `projects/*/locations/{location}`. |
| `pageSize` | query | integer (int32) | no | Maximum number of ClientTlsPolicies to return per call. |
| `pageToken` | query | string | no | The value returned by the last `ListClientTlsPoliciesResponse` Indicates that this is a continuation of a prior `ListClientTlsPolicies` call, and that the system should return the next page of data. |

### `networksecurity.projects.locations.clientTlsPolicies.patch`

- Versions: v1, v1beta1
- `PATCH https://networksecurity.googleapis.com/v1/{+name}`
- Updates the parameters of a single ClientTlsPolicy.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `ClientTlsPolicy`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the ClientTlsPolicy resource. It matches the pattern `projects/{project}/locations/{location}/clientTlsPolicies/{client_tls_policy}` |
| `updateMask` | query | string (google-fieldmask) | no | Optional. Field mask is used to specify the fields to be overwritten in the ClientTlsPolicy resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it is in the mask. If the user does not provide a mask then all fields will be overwritten. |

### `networksecurity.projects.locations.clientTlsPolicies.setIamPolicy`

- Versions: v1, v1beta1
- `POST https://networksecurity.googleapis.com/v1/{+resource}:setIamPolicy`
- Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleIamV1SetIamPolicyRequest`; Response: `GoogleIamV1Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `networksecurity.projects.locations.clientTlsPolicies.testIamPermissions`

- Versions: v1, v1beta1
- `POST https://networksecurity.googleapis.com/v1/{+resource}:testIamPermissions`
- Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleIamV1TestIamPermissionsRequest`; Response: `GoogleIamV1TestIamPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `networksecurity.projects.locations.dnsThreatDetectors.create`

- Versions: v1, v1beta1
- `POST https://networksecurity.googleapis.com/v1/{+parent}/dnsThreatDetectors`
- Creates a new DnsThreatDetector in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `DnsThreatDetector`; Response: `DnsThreatDetector`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The value for the parent of the DnsThreatDetector resource. |
| `dnsThreatDetectorId` | query | string | no | Optional. The ID of the requesting DnsThreatDetector object. If this field is not supplied, the service generates an identifier. |

### `networksecurity.projects.locations.dnsThreatDetectors.delete`

- Versions: v1, v1beta1
- `DELETE https://networksecurity.googleapis.com/v1/{+name}`
- Deletes a single DnsThreatDetector.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the DnsThreatDetector resource. |

### `networksecurity.projects.locations.dnsThreatDetectors.get`

- Versions: v1, v1beta1
- `GET https://networksecurity.googleapis.com/v1/{+name}`
- Gets the details of a single DnsThreatDetector.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `DnsThreatDetector`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the DnsThreatDetector resource. |

### `networksecurity.projects.locations.dnsThreatDetectors.list`

- Versions: v1, v1beta1
- `GET https://networksecurity.googleapis.com/v1/{+parent}/dnsThreatDetectors`
- Lists DnsThreatDetectors in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListDnsThreatDetectorsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent value for `ListDnsThreatDetectorsRequest`. |
| `pageSize` | query | integer (int32) | no | Optional. The requested page size. The server may return fewer items than requested. If unspecified, the server picks an appropriate default. |
| `pageToken` | query | string | no | Optional. A page token received from a previous `ListDnsThreatDetectorsRequest` call. Provide this to retrieve the subsequent page. |

### `networksecurity.projects.locations.dnsThreatDetectors.patch`

- Versions: v1, v1beta1
- `PATCH https://networksecurity.googleapis.com/v1/{+name}`
- Updates a single DnsThreatDetector.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `DnsThreatDetector`; Response: `DnsThreatDetector`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Immutable. Identifier. Name of the DnsThreatDetector resource. |
| `updateMask` | query | string (google-fieldmask) | no | Optional. The field mask is used to specify the fields to be overwritten in the DnsThreatDetector resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it is in the mask. If the mask is not provided then all fields present in the request will be overwritten. |

### `networksecurity.projects.locations.firewallEndpointAssociations.create`

- Versions: v1, v1beta1
- `POST https://networksecurity.googleapis.com/v1/{+parent}/firewallEndpointAssociations`
- Creates a new firewall endpoint association in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `FirewallEndpointAssociation`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource where this firewall endpoint association is created. Format: `projects/{project}/locations/{location}`. |
| `firewallEndpointAssociationId` | query | string | no | Optional. The ID to use for the firewall endpoint association, which becomes the final component of the association's resource name. This value must be 1-63 characters long, start with a lowercase letter, contain only lowercase letters, numbers, and hyphens, and cannot end with a hyphen. |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server knows to ignore the request if it has already been completed. The server guarantees that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if the original operation with the same request ID was received, and if so, ignores the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (`00000000-0000-0000-0000-000000000000`). |

### `networksecurity.projects.locations.firewallEndpointAssociations.delete`

- Versions: v1, v1beta1
- `DELETE https://networksecurity.googleapis.com/v1/{+name}`
- Deletes a single firewall endpoint association.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the resource. |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server knows to ignore the request if it has already been completed. The server guarantees that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if the original operation with the same request ID was received, and if so, ignores the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (`00000000-0000-0000-0000-000000000000`). |

### `networksecurity.projects.locations.firewallEndpointAssociations.get`

- Versions: v1, v1beta1
- `GET https://networksecurity.googleapis.com/v1/{+name}`
- Gets details of a single firewall endpoint association.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `FirewallEndpointAssociation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the resource. |

### `networksecurity.projects.locations.firewallEndpointAssociations.list`

- Versions: v1, v1beta1
- `GET https://networksecurity.googleapis.com/v1/{+parent}/firewallEndpointAssociations`
- Lists associations in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListFirewallEndpointAssociationsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource from which the firewall endpoint associations are listed. Format: `projects/{project}/locations/{location}`. |
| `filter` | query | string | no | Optional. Filtering results. |
| `orderBy` | query | string | no | Hint for how to order the results. |
| `pageSize` | query | integer (int32) | no | Optional. Requested page size. The server might return fewer items than requested. The maximum value is 1000; values above 1000 are coerced to 1000. If unspecified, the server picks an appropriate default. |
| `pageToken` | query | string | no | A page token, received from a previous `ListFirewallEndpointAssociations` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListFirewallEndpointAssociations` must match the call that provided the page token. |

### `networksecurity.projects.locations.firewallEndpointAssociations.patch`

- Versions: v1, v1beta1
- `PATCH https://networksecurity.googleapis.com/v1/{+name}`
- Updates a single firewall endpoint association.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `FirewallEndpointAssociation`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Immutable. Identifier. The name of the resource. |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server knows to ignore the request if it has already been completed. The server guarantees that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if the original operation with the same request ID was received, and if so, ignores the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (`00000000-0000-0000-0000-000000000000`). |
| `updateMask` | query | string (google-fieldmask) | yes | Required. Field mask used to specify the fields to be overwritten in the `FirewallEndpointAssociation` resource by the update. The fields specified in the `update_mask` are relative to the resource, not the full request. A field is overwritten if it is in the mask. If the user does not provide a mask, then all fields present in the request are overwritten. |

### `networksecurity.projects.locations.firewallEndpoints.create`

- Versions: v1, v1beta1
- `POST https://networksecurity.googleapis.com/v1/{+parent}/firewallEndpoints`
- Creates a new firewall endpoint in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `FirewallEndpoint`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource where this firewall endpoint is created. Format: `organizations/{organization}/locations/{location}` or `projects/{project}/locations/{location}`. |
| `firewallEndpointId` | query | string | yes | Required. The ID to use for the firewall endpoint, which becomes the final component of the endpoint's resource name. This value must be 1-63 characters long, start with a lowercase letter, contain only lowercase letters, numbers, and hyphens, and cannot end with a hyphen. |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server knows to ignore the request if it has already been completed. The server guarantees that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if the original operation with the same request ID was received, and if so, ignores the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (`00000000-0000-0000-0000-000000000000`). |
| `validateOnly` | query | boolean | no | Optional. If set, validates the request and previews the endpoint, but does not actually create it. |

### `networksecurity.projects.locations.firewallEndpoints.delete`

- Versions: v1, v1beta1
- `DELETE https://networksecurity.googleapis.com/v1/{+name}`
- Deletes a single project endpoint.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the resource. |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server knows to ignore the request if it has already been completed. The server guarantees that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if the original operation with the same request ID was received, and if so, ignores the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (`00000000-0000-0000-0000-000000000000`). |

### `networksecurity.projects.locations.firewallEndpoints.get`

- Versions: v1, v1beta1
- `GET https://networksecurity.googleapis.com/v1/{+name}`
- Gets details of a single project endpoint.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `FirewallEndpoint`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the resource. |

### `networksecurity.projects.locations.firewallEndpoints.list`

- Versions: v1, v1beta1
- `GET https://networksecurity.googleapis.com/v1/{+parent}/firewallEndpoints`
- Lists firewall endpoints in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListFirewallEndpointsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource from which the firewall endpoints are listed. Format: `organizations/{organization}/locations/{location}` or `projects/{project}/locations/{location}`. |
| `filter` | query | string | no | Optional. Filtering results. |
| `orderBy` | query | string | no | Optional. Hint for how to order the results. |
| `pageSize` | query | integer (int32) | no | Optional. Requested page size. The server might return fewer items than requested. The maximum value is 1000; values above 1000 are coerced to 1000. If unspecified, the server picks an appropriate default. |
| `pageToken` | query | string | no | A page token, received from a previous `ListFirewallEndpoints` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListFirewallEndpoints` must match the call that provided the page token. |

### `networksecurity.projects.locations.firewallEndpoints.patch`

- Versions: v1, v1beta1
- `PATCH https://networksecurity.googleapis.com/v1/{+name}`
- Updates a single project endpoint.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `FirewallEndpoint`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Immutable. Identifier. The name of the resource. |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server knows to ignore the request if it has already been completed. The server guarantees that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if the original operation with the same request ID was received, and if so, ignores the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (`00000000-0000-0000-0000-000000000000`). |
| `updateMask` | query | string (google-fieldmask) | yes | Required. Field mask used to specify the fields to be overwritten in the `FirewallEndpoint` resource by the update. The fields specified in the `update_mask` are relative to the resource, not the full request. A field is overwritten if it is in the mask. If the user does not provide a mask, then all fields present in the request are overwritten. |

### `networksecurity.projects.locations.firewallEndpoints.wildfireVerdictChangeRequests.create`

- Versions: v1, v1beta1
- `POST https://networksecurity.googleapis.com/v1/{+parent}/wildfireVerdictChangeRequests`
- Creates an Advanced malware sandbox verdict change request in a given firewall endpoint in a project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `WildfireVerdictChangeRequest`; Response: `WildfireVerdictChangeRequest`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Parent value for `CreateWildfireVerdictChangeRequestRequest`. The parent is a firewall endpoint resource. Format: `organizations/{organization}/locations/{location}/firewallEndpoints/{firewall_endpoint}` or `projects/{project}/locations/{location}/firewallEndpoints/{firewall_endpoint}`. |

### `networksecurity.projects.locations.firewallEndpoints.wildfireVerdictChangeRequests.get`

- Versions: v1, v1beta1
- `GET https://networksecurity.googleapis.com/v1/{+name}`
- Gets an Advanced malware sandbox verdict change request in a given firewall endpoint in a project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `WildfireVerdictChangeRequest`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the `WildfireVerdictChangeRequest` to retrieve. Format: `organizations/{organization}/locations/{location}/firewallEndpoints/{firewall_endpoint}/wildfireVerdictChangeRequests/{wildfire_verdict_change_request_id}` or `projects/{project}/locations/{location}/firewallEndpoints/{firewall_endpoint}/wildfireVerdictChangeRequests/{wildfire_verdict_change_request_id}`. Where `{wildfire_verdict_change_request_id}` is an ID in the format `^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$`. |

### `networksecurity.projects.locations.firewallEndpoints.wildfireVerdictChangeRequests.list`

- Versions: v1, v1beta1
- `GET https://networksecurity.googleapis.com/v1/{+parent}/wildfireVerdictChangeRequests`
- Lists the Advanced malware sandbox verdict change requests in a given firewall endpoint in a project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListWildfireVerdictChangeRequestsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Parent value for `ListWildfireVerdictChangeRequestsRequest`. The parent is a firewall endpoint resource. Format: `organizations/{organization}/locations/{location}/firewallEndpoints/{firewall_endpoint}` or `projects/{project}/locations/{location}/firewallEndpoints/{firewall_endpoint}`. |
| `filter` | query | string | no | Optional. Filter expression to filter the results. Supported fields are: - `sha256` (string, equality only, for example, `sha256 = "..."`) - `state` (enum, equality only, valid values are `OPEN`, `CLOSED`, or `PENDING`, for example, `state = "PENDING"`) - `create_time` (timestamp, comparisons, for example, `create_time >= "2026-01-01T00:00:00Z" AND create_time <= "2026-01-31T23:59:59Z"`). If filtering by `create_time`, you must specify both a start time and an end time. If `create_time` is not specified, the query defaults to the past 30 days. |
| `pageSize` | query | integer (int32) | no | Optional. Requested page size. The server might return fewer items than requested. If unspecified, the server picks an appropriate default. |
| `pageToken` | query | string | no | Optional. A page token, received from a previous `ListWildfireVerdictChangeRequests` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListWildfireVerdictChangeRequests` must match the call that provided the page token. |

### `networksecurity.projects.locations.gatewaySecurityPolicies.create`

- Versions: v1, v1beta1
- `POST https://networksecurity.googleapis.com/v1/{+parent}/gatewaySecurityPolicies`
- Creates a new GatewaySecurityPolicy in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GatewaySecurityPolicy`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource of the GatewaySecurityPolicy. Must be in the format `projects/{project}/locations/{location}`. |
| `gatewaySecurityPolicyId` | query | string | yes | Required. Short name of the GatewaySecurityPolicy resource to be created. This value should be 1-63 characters long, containing only letters, numbers, hyphens, and underscores, and should not start with a number. E.g. "gateway_security_policy1". |

### `networksecurity.projects.locations.gatewaySecurityPolicies.delete`

- Versions: v1, v1beta1
- `DELETE https://networksecurity.googleapis.com/v1/{+name}`
- Deletes a single GatewaySecurityPolicy.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. A name of the GatewaySecurityPolicy to delete. Must be in the format `projects/{project}/locations/{location}/gatewaySecurityPolicies/*`. |

### `networksecurity.projects.locations.gatewaySecurityPolicies.get`

- Versions: v1, v1beta1
- `GET https://networksecurity.googleapis.com/v1/{+name}`
- Gets details of a single GatewaySecurityPolicy.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GatewaySecurityPolicy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. A name of the GatewaySecurityPolicy to get. Must be in the format `projects/{project}/locations/{location}/gatewaySecurityPolicies/*`. |

### `networksecurity.projects.locations.gatewaySecurityPolicies.list`

- Versions: v1, v1beta1
- `GET https://networksecurity.googleapis.com/v1/{+parent}/gatewaySecurityPolicies`
- Lists GatewaySecurityPolicies in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListGatewaySecurityPoliciesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The project and location from which the GatewaySecurityPolicies should be listed, specified in the format `projects/{project}/locations/{location}`. |
| `pageSize` | query | integer (int32) | no | Maximum number of GatewaySecurityPolicies to return per call. |
| `pageToken` | query | string | no | The value returned by the last 'ListGatewaySecurityPoliciesResponse' Indicates that this is a continuation of a prior 'ListGatewaySecurityPolicies' call, and that the system should return the next page of data. |

### `networksecurity.projects.locations.gatewaySecurityPolicies.patch`

- Versions: v1, v1beta1
- `PATCH https://networksecurity.googleapis.com/v1/{+name}`
- Updates the parameters of a single GatewaySecurityPolicy.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GatewaySecurityPolicy`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the resource. Name is of the form projects/{project}/locations/{location}/gatewaySecurityPolicies/{gateway_security_policy} gateway_security_policy should match the pattern:(^\[a-z\](\[a-z0-9-\]{0,61}\[a-z0-9\])?$). |
| `updateMask` | query | string (google-fieldmask) | no | Optional. Field mask is used to specify the fields to be overwritten in the GatewaySecurityPolicy resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it is in the mask. If the user does not provide a mask then all fields will be overwritten. |

### `networksecurity.projects.locations.gatewaySecurityPolicies.rules.create`

- Versions: v1, v1beta1
- `POST https://networksecurity.googleapis.com/v1/{+parent}/rules`
- Creates a new GatewaySecurityPolicy in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GatewaySecurityPolicyRule`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent where this rule will be created. Format : projects/{project}/location/{location}/gatewaySecurityPolicies/\* |
| `gatewaySecurityPolicyRuleId` | query | string | no | The ID to use for the rule, which will become the final component of the rule's resource name. This value should be 4-63 characters, and valid characters are /a-z-/. |

### `networksecurity.projects.locations.gatewaySecurityPolicies.rules.delete`

- Versions: v1, v1beta1
- `DELETE https://networksecurity.googleapis.com/v1/{+name}`
- Deletes a single GatewaySecurityPolicyRule.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. A name of the GatewaySecurityPolicyRule to delete. Must be in the format `projects/{project}/locations/{location}/gatewaySecurityPolicies/{gatewaySecurityPolicy}/rules/*`. |

### `networksecurity.projects.locations.gatewaySecurityPolicies.rules.get`

- Versions: v1, v1beta1
- `GET https://networksecurity.googleapis.com/v1/{+name}`
- Gets details of a single GatewaySecurityPolicyRule.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GatewaySecurityPolicyRule`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the GatewaySecurityPolicyRule to retrieve. Format: projects/{project}/location/{location}/gatewaySecurityPolicies/\*/rules/\* |

### `networksecurity.projects.locations.gatewaySecurityPolicies.rules.list`

- Versions: v1, v1beta1
- `GET https://networksecurity.googleapis.com/v1/{+parent}/rules`
- Lists GatewaySecurityPolicyRules in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListGatewaySecurityPolicyRulesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The project, location and GatewaySecurityPolicy from which the GatewaySecurityPolicyRules should be listed, specified in the format `projects/{project}/locations/{location}/gatewaySecurityPolicies/{gatewaySecurityPolicy}`. |
| `pageSize` | query | integer (int32) | no | Maximum number of GatewaySecurityPolicyRules to return per call. |
| `pageToken` | query | string | no | The value returned by the last 'ListGatewaySecurityPolicyRulesResponse' Indicates that this is a continuation of a prior 'ListGatewaySecurityPolicyRules' call, and that the system should return the next page of data. |

### `networksecurity.projects.locations.gatewaySecurityPolicies.rules.patch`

- Versions: v1, v1beta1
- `PATCH https://networksecurity.googleapis.com/v1/{+name}`
- Updates the parameters of a single GatewaySecurityPolicyRule.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GatewaySecurityPolicyRule`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Immutable. Name of the resource. ame is the full resource name so projects/{project}/locations/{location}/gatewaySecurityPolicies/{gateway_security_policy}/rules/{rule} rule should match the pattern: (^\[a-z\](\[a-z0-9-\]{0,61}\[a-z0-9\])?$). |
| `updateMask` | query | string (google-fieldmask) | no | Optional. Field mask is used to specify the fields to be overwritten in the GatewaySecurityPolicy resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it is in the mask. If the user does not provide a mask then all fields will be overwritten. |

### `networksecurity.projects.locations.get`

- Versions: v1, v1beta1
- `GET https://networksecurity.googleapis.com/v1/{+name}`
- Gets information about a location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Location`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Resource name for the location. |

### `networksecurity.projects.locations.interceptDeploymentGroups.create`

- Versions: v1, v1beta1
- `POST https://networksecurity.googleapis.com/v1/{+parent}/interceptDeploymentGroups`
- Creates a deployment group in a given project and location. See https://google.aip.dev/133.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `InterceptDeploymentGroup`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource where this deployment group will be created. Format: projects/{project}/locations/{location} |
| `interceptDeploymentGroupId` | query | string | yes | Required. The ID to use for the new deployment group, which will become the final component of the deployment group's resource name. |
| `requestId` | query | string | no | Optional. A unique identifier for this request. Must be a UUID4. This request is only idempotent if a `request_id` is provided. See https://google.aip.dev/155 for more details. |

### `networksecurity.projects.locations.interceptDeploymentGroups.delete`

- Versions: v1, v1beta1
- `DELETE https://networksecurity.googleapis.com/v1/{+name}`
- Deletes a deployment group. See https://google.aip.dev/135.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The deployment group to delete. |
| `requestId` | query | string | no | Optional. A unique identifier for this request. Must be a UUID4. This request is only idempotent if a `request_id` is provided. See https://google.aip.dev/155 for more details. |

### `networksecurity.projects.locations.interceptDeploymentGroups.get`

- Versions: v1, v1beta1
- `GET https://networksecurity.googleapis.com/v1/{+name}`
- Gets a specific deployment group. See https://google.aip.dev/131.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `InterceptDeploymentGroup`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the deployment group to retrieve. Format: projects/{project}/locations/{location}/interceptDeploymentGroups/{intercept_deployment_group} |

### `networksecurity.projects.locations.interceptDeploymentGroups.list`

- Versions: v1, v1beta1
- `GET https://networksecurity.googleapis.com/v1/{+parent}/interceptDeploymentGroups`
- Lists deployment groups in a given project and location. See https://google.aip.dev/132.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListInterceptDeploymentGroupsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent, which owns this collection of deployment groups. Example: `projects/123456789/locations/global`. See https://google.aip.dev/132 for more details. |
| `filter` | query | string | no | Optional. Filter expression. See https://google.aip.dev/160#filtering for more details. |
| `orderBy` | query | string | no | Optional. Sort expression. See https://google.aip.dev/132#ordering for more details. |
| `pageSize` | query | integer (int32) | no | Optional. Requested page size. Server may return fewer items than requested. If unspecified, server will pick an appropriate default. See https://google.aip.dev/158 for more details. |
| `pageToken` | query | string | no | Optional. A page token, received from a previous `ListInterceptDeploymentGroups` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListInterceptDeploymentGroups` must match the call that provided the page token. See https://google.aip.dev/158 for more details. |

### `networksecurity.projects.locations.interceptDeploymentGroups.patch`

- Versions: v1, v1beta1
- `PATCH https://networksecurity.googleapis.com/v1/{+name}`
- Updates a deployment group. See https://google.aip.dev/134.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `InterceptDeploymentGroup`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Immutable. Identifier. The resource name of this deployment group, for example: `projects/123456789/locations/global/interceptDeploymentGroups/my-dg`. See https://google.aip.dev/122 for more details. |
| `requestId` | query | string | no | Optional. A unique identifier for this request. Must be a UUID4. This request is only idempotent if a `request_id` is provided. See https://google.aip.dev/155 for more details. |
| `updateMask` | query | string (google-fieldmask) | no | Optional. The list of fields to update. Fields are specified relative to the deployment group (e.g. `description`; \*not\* `intercept_deployment_group.description`). See https://google.aip.dev/161 for more details. |

### `networksecurity.projects.locations.interceptDeployments.create`

- Versions: v1, v1beta1
- `POST https://networksecurity.googleapis.com/v1/{+parent}/interceptDeployments`
- Creates a deployment in a given project and location. See https://google.aip.dev/133.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `InterceptDeployment`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource where this deployment will be created. Format: projects/{project}/locations/{location} |
| `interceptDeploymentId` | query | string | yes | Required. The ID to use for the new deployment, which will become the final component of the deployment's resource name. |
| `requestId` | query | string | no | Optional. A unique identifier for this request. Must be a UUID4. This request is only idempotent if a `request_id` is provided. See https://google.aip.dev/155 for more details. |

### `networksecurity.projects.locations.interceptDeployments.delete`

- Versions: v1, v1beta1
- `DELETE https://networksecurity.googleapis.com/v1/{+name}`
- Deletes a deployment. See https://google.aip.dev/135.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the resource |
| `requestId` | query | string | no | Optional. A unique identifier for this request. Must be a UUID4. This request is only idempotent if a `request_id` is provided. See https://google.aip.dev/155 for more details. |

### `networksecurity.projects.locations.interceptDeployments.get`

- Versions: v1, v1beta1
- `GET https://networksecurity.googleapis.com/v1/{+name}`
- Gets a specific deployment. See https://google.aip.dev/131.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `InterceptDeployment`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the deployment to retrieve. Format: projects/{project}/locations/{location}/interceptDeployments/{intercept_deployment} |

### `networksecurity.projects.locations.interceptDeployments.list`

- Versions: v1, v1beta1
- `GET https://networksecurity.googleapis.com/v1/{+parent}/interceptDeployments`
- Lists deployments in a given project and location. See https://google.aip.dev/132.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListInterceptDeploymentsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent, which owns this collection of deployments. Example: `projects/123456789/locations/us-central1-a`. See https://google.aip.dev/132 for more details. |
| `filter` | query | string | no | Optional. Filter expression. See https://google.aip.dev/160#filtering for more details. |
| `orderBy` | query | string | no | Optional. Sort expression. See https://google.aip.dev/132#ordering for more details. |
| `pageSize` | query | integer (int32) | no | Optional. Requested page size. Server may return fewer items than requested. If unspecified, server will pick an appropriate default. See https://google.aip.dev/158 for more details. |
| `pageToken` | query | string | no | Optional. A page token, received from a previous `ListInterceptDeployments` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListInterceptDeployments` must match the call that provided the page token. See https://google.aip.dev/158 for more details. |

### `networksecurity.projects.locations.interceptDeployments.patch`

- Versions: v1, v1beta1
- `PATCH https://networksecurity.googleapis.com/v1/{+name}`
- Updates a deployment. See https://google.aip.dev/134.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `InterceptDeployment`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Immutable. Identifier. The resource name of this deployment, for example: `projects/123456789/locations/us-central1-a/interceptDeployments/my-dep`. See https://google.aip.dev/122 for more details. |
| `requestId` | query | string | no | Optional. A unique identifier for this request. Must be a UUID4. This request is only idempotent if a `request_id` is provided. See https://google.aip.dev/155 for more details. |
| `updateMask` | query | string (google-fieldmask) | no | Optional. The list of fields to update. Fields are specified relative to the deployment (e.g. `description`; \*not\* `intercept_deployment.description`). See https://google.aip.dev/161 for more details. |

### `networksecurity.projects.locations.interceptEndpointGroupAssociations.create`

- Versions: v1, v1beta1
- `POST https://networksecurity.googleapis.com/v1/{+parent}/interceptEndpointGroupAssociations`
- Creates an association in a given project and location. See https://google.aip.dev/133.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `InterceptEndpointGroupAssociation`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource where this association will be created. Format: projects/{project}/locations/{location} |
| `interceptEndpointGroupAssociationId` | query | string | no | Optional. The ID to use for the new association, which will become the final component of the endpoint group's resource name. If not provided, the server will generate a unique ID. |
| `requestId` | query | string | no | Optional. A unique identifier for this request. Must be a UUID4. This request is only idempotent if a `request_id` is provided. See https://google.aip.dev/155 for more details. |

### `networksecurity.projects.locations.interceptEndpointGroupAssociations.delete`

- Versions: v1, v1beta1
- `DELETE https://networksecurity.googleapis.com/v1/{+name}`
- Deletes an association. See https://google.aip.dev/135.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The association to delete. |
| `requestId` | query | string | no | Optional. A unique identifier for this request. Must be a UUID4. This request is only idempotent if a `request_id` is provided. See https://google.aip.dev/155 for more details. |

### `networksecurity.projects.locations.interceptEndpointGroupAssociations.get`

- Versions: v1, v1beta1
- `GET https://networksecurity.googleapis.com/v1/{+name}`
- Gets a specific association. See https://google.aip.dev/131.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `InterceptEndpointGroupAssociation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the association to retrieve. Format: projects/{project}/locations/{location}/interceptEndpointGroupAssociations/{intercept_endpoint_group_association} |

### `networksecurity.projects.locations.interceptEndpointGroupAssociations.list`

- Versions: v1, v1beta1
- `GET https://networksecurity.googleapis.com/v1/{+parent}/interceptEndpointGroupAssociations`
- Lists associations in a given project and location. See https://google.aip.dev/132.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListInterceptEndpointGroupAssociationsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent, which owns this collection of associations. Example: `projects/123456789/locations/global`. See https://google.aip.dev/132 for more details. |
| `filter` | query | string | no | Optional. Filter expression. See https://google.aip.dev/160#filtering for more details. |
| `orderBy` | query | string | no | Optional. Sort expression. See https://google.aip.dev/132#ordering for more details. |
| `pageSize` | query | integer (int32) | no | Optional. Requested page size. Server may return fewer items than requested. If unspecified, server will pick an appropriate default. See https://google.aip.dev/158 for more details. |
| `pageToken` | query | string | no | Optional. A page token, received from a previous `ListInterceptEndpointGroups` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListInterceptEndpointGroups` must match the call that provided the page token. See https://google.aip.dev/158 for more details. |

### `networksecurity.projects.locations.interceptEndpointGroupAssociations.patch`

- Versions: v1, v1beta1
- `PATCH https://networksecurity.googleapis.com/v1/{+name}`
- Updates an association. See https://google.aip.dev/134.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `InterceptEndpointGroupAssociation`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Immutable. Identifier. The resource name of this endpoint group association, for example: `projects/123456789/locations/global/interceptEndpointGroupAssociations/my-eg-association`. See https://google.aip.dev/122 for more details. |
| `requestId` | query | string | no | Optional. A unique identifier for this request. Must be a UUID4. This request is only idempotent if a `request_id` is provided. See https://google.aip.dev/155 for more details. |
| `updateMask` | query | string (google-fieldmask) | no | Optional. The list of fields to update. Fields are specified relative to the association (e.g. `description`; \*not\* `intercept_endpoint_group_association.description`). See https://google.aip.dev/161 for more details. |

### `networksecurity.projects.locations.interceptEndpointGroups.create`

- Versions: v1, v1beta1
- `POST https://networksecurity.googleapis.com/v1/{+parent}/interceptEndpointGroups`
- Creates an endpoint group in a given project and location. See https://google.aip.dev/133.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `InterceptEndpointGroup`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource where this endpoint group will be created. Format: projects/{project}/locations/{location} |
| `interceptEndpointGroupId` | query | string | yes | Required. The ID to use for the endpoint group, which will become the final component of the endpoint group's resource name. |
| `requestId` | query | string | no | Optional. A unique identifier for this request. Must be a UUID4. This request is only idempotent if a `request_id` is provided. See https://google.aip.dev/155 for more details. |

### `networksecurity.projects.locations.interceptEndpointGroups.delete`

- Versions: v1, v1beta1
- `DELETE https://networksecurity.googleapis.com/v1/{+name}`
- Deletes an endpoint group. See https://google.aip.dev/135.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The endpoint group to delete. |
| `requestId` | query | string | no | Optional. A unique identifier for this request. Must be a UUID4. This request is only idempotent if a `request_id` is provided. See https://google.aip.dev/155 for more details. |

### `networksecurity.projects.locations.interceptEndpointGroups.get`

- Versions: v1, v1beta1
- `GET https://networksecurity.googleapis.com/v1/{+name}`
- Gets a specific endpoint group. See https://google.aip.dev/131.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `InterceptEndpointGroup`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the endpoint group to retrieve. Format: projects/{project}/locations/{location}/interceptEndpointGroups/{intercept_endpoint_group} |

### `networksecurity.projects.locations.interceptEndpointGroups.list`

- Versions: v1, v1beta1
- `GET https://networksecurity.googleapis.com/v1/{+parent}/interceptEndpointGroups`
- Lists endpoint groups in a given project and location. See https://google.aip.dev/132.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListInterceptEndpointGroupsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent, which owns this collection of endpoint groups. Example: `projects/123456789/locations/global`. See https://google.aip.dev/132 for more details. |
| `filter` | query | string | no | Optional. Filter expression. See https://google.aip.dev/160#filtering for more details. |
| `orderBy` | query | string | no | Optional. Sort expression. See https://google.aip.dev/132#ordering for more details. |
| `pageSize` | query | integer (int32) | no | Optional. Requested page size. Server may return fewer items than requested. If unspecified, server will pick an appropriate default. See https://google.aip.dev/158 for more details. |
| `pageToken` | query | string | no | Optional. A page token, received from a previous `ListInterceptEndpointGroups` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListInterceptEndpointGroups` must match the call that provided the page token. See https://google.aip.dev/158 for more details. |

### Example request skeleton

Generated from the Discovery entry of `networksecurity.organizations.locations.addressGroups.get` (not in the official docs); replace the `{...}` path variables (URL-encode query values):

```bash
curl -X GET \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  "https://networksecurity.googleapis.com/v1/{+name}"
```

## Notes

- Generated from the Discovery document(s) v1, v1beta1 of `networksecurity` (retrieved 2026-11-14). Resources on this page: organizations, projects.
- The Required column is `yes` for path variables and required parameters, and `conditional` when the description says "Required if ..." (mutually exclusive alternatives), when a `parent.child` parameter is required only inside an optional parent message or one branch of a oneof. Path variables are `yes` unless a note below names an alternative route without them.
- Message schemas (the request and response types named above) are defined in the `schemas` section of the Discovery documents in Source.
- Source: https://networksecurity.googleapis.com/$discovery/rest?version=v1, https://networksecurity.googleapis.com/$discovery/rest?version=v1beta1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
