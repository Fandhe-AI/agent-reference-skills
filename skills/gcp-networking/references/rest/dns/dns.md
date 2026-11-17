---
source: https://dns.googleapis.com/$discovery/rest?version=v1
---

# Cloud DNS API REST API (dns)

## Signature / Usage

Base URL: `https://dns.googleapis.com`. Methods are listed by `id`; the `Versions` line shows which API versions define the method (preferred: v1).

### `dns.changes.create`

- Versions: v1, v1beta2
- `POST https://dns.googleapis.com/dns/v1/projects/{project}/managedZones/{managedZone}/changes`
- Atomically updates the ResourceRecordSet collection. Note: While `dns.changes.create` is the baseline permission required to invoke this method, additional permissions are checked depending on the specific additions or deletions contained in the payload.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/ndev.clouddns.readwrite`
- Request: `Change`; Response: `Change`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Identifies the project addressed by this request. |
| `managedZone` | path | string | yes | Identifies the managed zone addressed by this request. Can be the managed zone name or ID. |
| `clientOperationId` | query | string | no | For mutating operation requests only. An optional identifier specified by the client. Must be unique for operation resources in the Operations collection. |

### `dns.changes.get`

- Versions: v1, v1beta2
- `GET https://dns.googleapis.com/dns/v1/projects/{project}/managedZones/{managedZone}/changes/{changeId}`
- Fetches the representation of an existing Change.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`, `https://www.googleapis.com/auth/ndev.clouddns.readonly`, `https://www.googleapis.com/auth/ndev.clouddns.readwrite`
- Request: —; Response: `Change`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Identifies the project addressed by this request. |
| `managedZone` | path | string | yes | Identifies the managed zone addressed by this request. Can be the managed zone name or ID. |
| `changeId` | path | string | yes | The identifier of the requested change, from a previous ResourceRecordSetsChangeResponse. |
| `clientOperationId` | query | string | no | For mutating operation requests only. An optional identifier specified by the client. Must be unique for operation resources in the Operations collection. |

### `dns.changes.list`

- Versions: v1, v1beta2
- `GET https://dns.googleapis.com/dns/v1/projects/{project}/managedZones/{managedZone}/changes`
- Enumerates Changes to a ResourceRecordSet collection.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`, `https://www.googleapis.com/auth/ndev.clouddns.readonly`, `https://www.googleapis.com/auth/ndev.clouddns.readwrite`
- Request: —; Response: `ChangesListResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Identifies the project addressed by this request. |
| `managedZone` | path | string | yes | Identifies the managed zone addressed by this request. Can be the managed zone name or ID. |
| `maxResults` | query | integer (int32) | no | Optional. Maximum number of results to be returned. If unspecified, the server decides how many results to return. |
| `pageToken` | query | string | no | Optional. A tag returned by a previous list request that was truncated. Use this parameter to continue a previous list request. |
| `sortBy` | query | string enum | no | Sorting criterion. The only supported value is change sequence. Values: `changeSequence`. |
| `sortOrder` | query | string | no | Sorting order direction: 'ascending' or 'descending'. |

### `dns.dnsKeys.get`

- Versions: v1, v1beta2
- `GET https://dns.googleapis.com/dns/v1/projects/{project}/managedZones/{managedZone}/dnsKeys/{dnsKeyId}`
- Fetches the representation of an existing DnsKey.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`, `https://www.googleapis.com/auth/ndev.clouddns.readonly`, `https://www.googleapis.com/auth/ndev.clouddns.readwrite`
- Request: —; Response: `DnsKey`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Identifies the project addressed by this request. |
| `managedZone` | path | string | yes | Identifies the managed zone addressed by this request. Can be the managed zone name or ID. |
| `dnsKeyId` | path | string | yes | The identifier of the requested DnsKey. |
| `clientOperationId` | query | string | no | For mutating operation requests only. An optional identifier specified by the client. Must be unique for operation resources in the Operations collection. |
| `digestType` | query | string | no | An optional comma-separated list of digest types to compute and display for key signing keys. If omitted, the recommended digest type is computed and displayed. |

### `dns.dnsKeys.list`

- Versions: v1, v1beta2
- `GET https://dns.googleapis.com/dns/v1/projects/{project}/managedZones/{managedZone}/dnsKeys`
- Enumerates DnsKeys to a ResourceRecordSet collection.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`, `https://www.googleapis.com/auth/ndev.clouddns.readonly`, `https://www.googleapis.com/auth/ndev.clouddns.readwrite`
- Request: —; Response: `DnsKeysListResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Identifies the project addressed by this request. |
| `managedZone` | path | string | yes | Identifies the managed zone addressed by this request. Can be the managed zone name or ID. |
| `digestType` | query | string | no | An optional comma-separated list of digest types to compute and display for key signing keys. If omitted, the recommended digest type is computed and displayed. |
| `maxResults` | query | integer (int32) | no | Optional. Maximum number of results to be returned. If unspecified, the server decides how many results to return. |
| `pageToken` | query | string | no | Optional. A tag returned by a previous list request that was truncated. Use this parameter to continue a previous list request. |

### `dns.locations.get`

- Versions: v1, v1beta2
- `GET https://dns.googleapis.com/dns/v1/{+name}`
- Gets information about a location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`, `https://www.googleapis.com/auth/ndev.clouddns.readonly`, `https://www.googleapis.com/auth/ndev.clouddns.readwrite`
- Request: —; Response: `Location`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Resource name for the location. |

### `dns.locations.list`

- Versions: v1, v1beta2
- `GET https://dns.googleapis.com/dns/v1/{+name}/locations`
- Lists information about the supported locations for this service. This method lists locations based on the resource scope provided in the ListLocationsRequest.name field: \* \*\*Global locations\*\*: If `name` is empty, the method lists the public locations available to all projects. \* \*\*Project-specific locations\*\*: If `name` follows the format `projects/{project}`, the method lists locations visible to that specific project. This includes public, private, or other project-specific locations enabled for the project. For gRPC and client library implementations, the resource name is passed as the `name` field. For direct service calls, the resource name is incorporated into the request path based on the specific service implementation and version.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`, `https://www.googleapis.com/auth/ndev.clouddns.readonly`, `https://www.googleapis.com/auth/ndev.clouddns.readwrite`
- Request: —; Response: `ListLocationsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The resource that owns the locations collection, if applicable. |
| `extraLocationTypes` | query | repeated string | no | Optional. Do not use this field unless explicitly documented otherwise. This is primarily for internal usage. |
| `filter` | query | string | no | A filter to narrow down results to a preferred subset. The filtering language accepts strings like `"displayName=tokyo"`, and is documented in more detail in AIP-160 (https://google.aip.dev/160). |
| `pageSize` | query | integer (int32) | no | The maximum number of results to return. If not set, the service selects a default. |
| `pageToken` | query | string | no | A page token received from the `next_page_token` field in the response. Send that page token to receive the subsequent page. |

### `dns.managedZoneOperations.get`

- Versions: v1, v1beta2
- `GET https://dns.googleapis.com/dns/v1/projects/{project}/managedZones/{managedZone}/operations/{operation}`
- Fetches the representation of an existing Operation.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`, `https://www.googleapis.com/auth/ndev.clouddns.readonly`, `https://www.googleapis.com/auth/ndev.clouddns.readwrite`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Identifies the project addressed by this request. |
| `managedZone` | path | string | yes | Identifies the managed zone addressed by this request. |
| `operation` | path | string | yes | Identifies the operation addressed by this request (ID of the operation). |
| `clientOperationId` | query | string | no | For mutating operation requests only. An optional identifier specified by the client. Must be unique for operation resources in the Operations collection. |

### `dns.managedZoneOperations.list`

- Versions: v1, v1beta2
- `GET https://dns.googleapis.com/dns/v1/projects/{project}/managedZones/{managedZone}/operations`
- Enumerates Operations for the given ManagedZone.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`, `https://www.googleapis.com/auth/ndev.clouddns.readonly`, `https://www.googleapis.com/auth/ndev.clouddns.readwrite`
- Request: —; Response: `ManagedZoneOperationsListResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Identifies the project addressed by this request. |
| `managedZone` | path | string | yes | Identifies the managed zone addressed by this request. |
| `maxResults` | query | integer (int32) | no | Optional. Maximum number of results to be returned. If unspecified, the server decides how many results to return. |
| `pageToken` | query | string | no | Optional. A tag returned by a previous list request that was truncated. Use this parameter to continue a previous list request. |
| `sortBy` | query | string enum | no | Sorting criterion. The only supported values are START_TIME and ID. Values: `startTime`, `id`. |

### `dns.managedZones.create`

- Versions: v1, v1beta2
- `POST https://dns.googleapis.com/dns/v1/projects/{project}/managedZones`
- Creates a new ManagedZone. Note: While `dns.managedZones.create` is the baseline permission required to invoke this method, additional permissions are required if the managed zone configuration references other resources.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/ndev.clouddns.readwrite`
- Request: `ManagedZone`; Response: `ManagedZone`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Identifies the project addressed by this request. |
| `clientOperationId` | query | string | no | For mutating operation requests only. An optional identifier specified by the client. Must be unique for operation resources in the Operations collection. |

### `dns.managedZones.delete`

- Versions: v1, v1beta2
- `DELETE https://dns.googleapis.com/dns/v1/projects/{project}/managedZones/{managedZone}`
- Deletes a previously created ManagedZone.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/ndev.clouddns.readwrite`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Identifies the project addressed by this request. |
| `managedZone` | path | string | yes | Identifies the managed zone addressed by this request. Can be the managed zone name or ID. |
| `clientOperationId` | query | string | no | For mutating operation requests only. An optional identifier specified by the client. Must be unique for operation resources in the Operations collection. |

### `dns.managedZones.get`

- Versions: v1, v1beta2
- `GET https://dns.googleapis.com/dns/v1/projects/{project}/managedZones/{managedZone}`
- Fetches the representation of an existing ManagedZone.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`, `https://www.googleapis.com/auth/ndev.clouddns.readonly`, `https://www.googleapis.com/auth/ndev.clouddns.readwrite`
- Request: —; Response: `ManagedZone`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Identifies the project addressed by this request. |
| `managedZone` | path | string | yes | Identifies the managed zone addressed by this request. Can be the managed zone name or ID. |
| `clientOperationId` | query | string | no | For mutating operation requests only. An optional identifier specified by the client. Must be unique for operation resources in the Operations collection. |

### `dns.managedZones.getIamPolicy`

- Versions: v1, v1beta2
- `POST https://dns.googleapis.com/dns/v1/{+resource}:getIamPolicy`
- Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`, `https://www.googleapis.com/auth/ndev.clouddns.readonly`, `https://www.googleapis.com/auth/ndev.clouddns.readwrite`
- Request: `GoogleIamV1GetIamPolicyRequest`; Response: `GoogleIamV1Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `dns.managedZones.list`

- Versions: v1, v1beta2
- `GET https://dns.googleapis.com/dns/v1/projects/{project}/managedZones`
- Enumerates ManagedZones that have been created but not yet deleted.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`, `https://www.googleapis.com/auth/ndev.clouddns.readonly`, `https://www.googleapis.com/auth/ndev.clouddns.readwrite`
- Request: —; Response: `ManagedZonesListResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Identifies the project addressed by this request. |
| `dnsName` | query | string | no | Restricts the list to return only zones with this domain name. |
| `maxResults` | query | integer (int32) | no | Optional. Maximum number of results to be returned. If unspecified, the server decides how many results to return. |
| `pageToken` | query | string | no | Optional. A tag returned by a previous list request that was truncated. Use this parameter to continue a previous list request. |

### `dns.managedZones.patch`

- Versions: v1, v1beta2
- `PATCH https://dns.googleapis.com/dns/v1/projects/{project}/managedZones/{managedZone}`
- Applies a partial update to an existing ManagedZone.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/ndev.clouddns.readwrite`
- Request: `ManagedZone`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Identifies the project addressed by this request. |
| `managedZone` | path | string | yes | Identifies the managed zone addressed by this request. Can be the managed zone name or ID. |
| `clientOperationId` | query | string | no | For mutating operation requests only. An optional identifier specified by the client. Must be unique for operation resources in the Operations collection. |

### `dns.managedZones.setIamPolicy`

- Versions: v1, v1beta2
- `POST https://dns.googleapis.com/dns/v1/{+resource}:setIamPolicy`
- Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/ndev.clouddns.readwrite`
- Request: `GoogleIamV1SetIamPolicyRequest`; Response: `GoogleIamV1Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `dns.managedZones.testIamPermissions`

- Versions: v1, v1beta2
- `POST https://dns.googleapis.com/dns/v1/{+resource}:testIamPermissions`
- Returns permissions that a caller has on the specified resource. If the resource does not exist, this returns an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`, `https://www.googleapis.com/auth/ndev.clouddns.readonly`, `https://www.googleapis.com/auth/ndev.clouddns.readwrite`
- Request: `GoogleIamV1TestIamPermissionsRequest`; Response: `GoogleIamV1TestIamPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `dns.managedZones.update`

- Versions: v1, v1beta2
- `PUT https://dns.googleapis.com/dns/v1/projects/{project}/managedZones/{managedZone}`
- Updates an existing ManagedZone.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/ndev.clouddns.readwrite`
- Request: `ManagedZone`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Identifies the project addressed by this request. |
| `managedZone` | path | string | yes | Identifies the managed zone addressed by this request. Can be the managed zone name or ID. |
| `clientOperationId` | query | string | no | For mutating operation requests only. An optional identifier specified by the client. Must be unique for operation resources in the Operations collection. |

### `dns.operations.cancel`

- Versions: v1, v1beta2
- `POST https://dns.googleapis.com/dns/v1/{+name}:cancel`
- Starts asynchronous cancellation on a long-running operation. The server makes a best effort to cancel the operation, but success is not guaranteed. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. Clients can use Operations.GetOperation or other methods to check whether the cancellation succeeded or whether the operation completed despite cancellation. On successful cancellation, the operation is not deleted; instead, it becomes an operation with an Operation.error value with a google.rpc.Status.code of `1`, corresponding to `Code.CANCELLED`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/ndev.clouddns.readwrite`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource to be cancelled. |

### `dns.operations.delete`

- Versions: v1, v1beta2
- `DELETE https://dns.googleapis.com/dns/v1/{+name}`
- Deletes a long-running operation. This method indicates that the client is no longer interested in the operation result. It does not cancel the operation. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/ndev.clouddns.readwrite`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource to be deleted. |

### `dns.operations.get`

- Versions: v1, v1beta2
- `GET https://dns.googleapis.com/dns/v1/{+name}`
- Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/ndev.clouddns.readwrite`
- Request: —; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource. |

### `dns.operations.list`

- Versions: v1, v1beta2
- `GET https://dns.googleapis.com/dns/v1/{+name}/operations`
- Lists operations that match the specified filter in the request. If the server doesn't support this method, it returns `UNIMPLEMENTED`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/ndev.clouddns.readwrite`
- Request: —; Response: `GoogleLongrunningListOperationsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation's parent resource. |
| `filter` | query | string | no | The standard list filter. |
| `pageSize` | query | integer (int32) | no | The standard list page size. |
| `pageToken` | query | string | no | The standard list page token. |
| `returnPartialSuccess` | query | boolean | no | When set to `true`, operations that are reachable are returned as normal, and those that are unreachable are returned in the ListOperationsResponse.unreachable field. This can only be `true` when reading across collections. For example, when `parent` is set to `"projects/example/locations/-"`. This field is not supported by default and will result in an `UNIMPLEMENTED` error if set unless explicitly documented otherwise in service or product specific documentation. |

### `dns.outboundEndpoints.create`

- Versions: v1, v1beta2
- `POST https://dns.googleapis.com/dns/v1/{+parent}/outboundEndpoints`
- Creates a new Outbound Endpoint.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/ndev.clouddns.readwrite`
- Request: `OutboundEndpoint`; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent project and location where this OutboundEndpoint will be created. Format: projects/{project}/locations/{location} |
| `clientOperationId` | query | string | no | For mutating operation requests only. An optional identifier specified by the client. Must be unique for operation resources in the Operations collection. |
| `outboundEndpointId` | query | string | yes | Required. The ID to use for the OutboundEndpoint, which will become the final component of the OutboundEndpoint's resource name. |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. |

### `dns.outboundEndpoints.delete`

- Versions: v1, v1beta2
- `DELETE https://dns.googleapis.com/dns/v1/{+name}`
- Deletes a previously created Outbound Endpoint.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/ndev.clouddns.readwrite`
- Request: —; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the OutboundEndpoint to delete. Format: projects/{project}/locations/{location}/outboundEndpoints/{outboundEndpoint} |
| `clientOperationId` | query | string | no | For mutating operation requests only. An optional identifier specified by the client. Must be unique for operation resources in the Operations collection. |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. |

### `dns.outboundEndpoints.get`

- Versions: v1, v1beta2
- `GET https://dns.googleapis.com/dns/v1/{+name}`
- Fetches the representation of an existing Outbound Endpoint.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`, `https://www.googleapis.com/auth/ndev.clouddns.readonly`, `https://www.googleapis.com/auth/ndev.clouddns.readwrite`
- Request: —; Response: `OutboundEndpoint`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the OutboundEndpoint to retrieve. Format: projects/{project}/locations/{location}/outboundEndpoints/{outboundEndpoint} |
| `clientOperationId` | query | string | no | For mutating operation requests only. An optional identifier specified by the client. Must be unique for operation resources in the Operations collection. |

### `dns.outboundEndpoints.list`

- Versions: v1, v1beta2
- `GET https://dns.googleapis.com/dns/v1/{+parent}/outboundEndpoints`
- Enumerates all Outbound Endpoints associated with a project.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`, `https://www.googleapis.com/auth/ndev.clouddns.readonly`, `https://www.googleapis.com/auth/ndev.clouddns.readwrite`
- Request: —; Response: `ListOutboundEndpointsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent project and location from which to list resources. Format: projects/{project}/locations/{location} |
| `clientOperationId` | query | string | no | — |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of results to return. |
| `pageToken` | query | string | no | Optional. A page token received from a previous List call. |

### `dns.outboundEndpoints.patch`

- Versions: v1, v1beta2
- `PATCH https://dns.googleapis.com/dns/v1/{+name}`
- Updates an existing Outbound Endpoint.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/ndev.clouddns.readwrite`
- Request: `OutboundEndpoint`; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. The resource name of the OutboundEndpoint. Format: `projects/{project}/locations/{location}/outboundEndpoints/{outboundEndpoint}` |
| `clientOperationId` | query | string | no | For mutating operation requests only. An optional identifier specified by the client. Must be unique for operation resources in the Operations collection. |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. |
| `updateMask` | query | string (google-fieldmask) | yes | Required. The list of fields to be updated. |

### `dns.policies.create`

- Versions: v1, v1beta2
- `POST https://dns.googleapis.com/dns/v1/projects/{project}/policies`
- Creates a new policy.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/ndev.clouddns.readwrite`
- Request: `Policy`; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Identifies the project addressed by this request. |
| `clientOperationId` | query | string | no | For mutating operation requests only. An optional identifier specified by the client. Must be unique for operation resources in the Operations collection. |

### `dns.policies.delete`

- Versions: v1, v1beta2
- `DELETE https://dns.googleapis.com/dns/v1/projects/{project}/policies/{policy}`
- Deletes a previously created policy. Fails if the policy is still being referenced by a network.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/ndev.clouddns.readwrite`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Identifies the project addressed by this request. |
| `policy` | path | string | yes | User given friendly name of the policy addressed by this request. |
| `clientOperationId` | query | string | no | For mutating operation requests only. An optional identifier specified by the client. Must be unique for operation resources in the Operations collection. |

### `dns.policies.get`

- Versions: v1, v1beta2
- `GET https://dns.googleapis.com/dns/v1/projects/{project}/policies/{policy}`
- Fetches the representation of an existing policy.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`, `https://www.googleapis.com/auth/ndev.clouddns.readonly`, `https://www.googleapis.com/auth/ndev.clouddns.readwrite`
- Request: —; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Identifies the project addressed by this request. |
| `policy` | path | string | yes | User given friendly name of the policy addressed by this request. |
| `clientOperationId` | query | string | no | For mutating operation requests only. An optional identifier specified by the client. Must be unique for operation resources in the Operations collection. |

### `dns.policies.list`

- Versions: v1, v1beta2
- `GET https://dns.googleapis.com/dns/v1/projects/{project}/policies`
- Enumerates all policies associated with a project.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`, `https://www.googleapis.com/auth/ndev.clouddns.readonly`, `https://www.googleapis.com/auth/ndev.clouddns.readwrite`
- Request: —; Response: `PoliciesListResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Identifies the project addressed by this request. |
| `maxResults` | query | integer (int32) | no | Optional. Maximum number of results to be returned. If unspecified, the server decides how many results to return. |
| `pageToken` | query | string | no | Optional. A tag returned by a previous list request that was truncated. Use this parameter to continue a previous list request. |

### `dns.policies.patch`

- Versions: v1, v1beta2
- `PATCH https://dns.googleapis.com/dns/v1/projects/{project}/policies/{policy}`
- Applies a partial update to an existing policy.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/ndev.clouddns.readwrite`
- Request: `Policy`; Response: `PoliciesPatchResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Identifies the project addressed by this request. |
| `policy` | path | string | yes | User given friendly name of the policy addressed by this request. |
| `clientOperationId` | query | string | no | For mutating operation requests only. An optional identifier specified by the client. Must be unique for operation resources in the Operations collection. |

### `dns.policies.update`

- Versions: v1, v1beta2
- `PUT https://dns.googleapis.com/dns/v1/projects/{project}/policies/{policy}`
- Updates an existing policy.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/ndev.clouddns.readwrite`
- Request: `Policy`; Response: `PoliciesUpdateResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Identifies the project addressed by this request. |
| `policy` | path | string | yes | User given friendly name of the policy addressed by this request. |
| `clientOperationId` | query | string | no | For mutating operation requests only. An optional identifier specified by the client. Must be unique for operation resources in the Operations collection. |

### `dns.projects.get`

- Versions: v1, v1beta2
- `GET https://dns.googleapis.com/dns/v1/projects/{project}`
- Fetches the representation of an existing Project.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`, `https://www.googleapis.com/auth/ndev.clouddns.readonly`, `https://www.googleapis.com/auth/ndev.clouddns.readwrite`
- Request: —; Response: `Project`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Identifies the project addressed by this request. |

### `dns.resourceRecordSets.create`

- Versions: v1, v1beta2
- `POST https://dns.googleapis.com/dns/v1/projects/{project}/managedZones/{managedZone}/rrsets`
- Creates a new ResourceRecordSet.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/ndev.clouddns.readwrite`
- Request: `ResourceRecordSet`; Response: `ResourceRecordSet`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Identifies the project addressed by this request. |
| `managedZone` | path | string | yes | Identifies the managed zone addressed by this request. Can be the managed zone name or ID. |
| `clientOperationId` | query | string | no | For mutating operation requests only. An optional identifier specified by the client. Must be unique for operation resources in the Operations collection. |

### `dns.resourceRecordSets.delete`

- Versions: v1, v1beta2
- `DELETE https://dns.googleapis.com/dns/v1/projects/{project}/managedZones/{managedZone}/rrsets/{name}/{type}`
- Deletes a previously created ResourceRecordSet.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/ndev.clouddns.readwrite`
- Request: —; Response: `ResourceRecordSetsDeleteResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Identifies the project addressed by this request. |
| `managedZone` | path | string | yes | Identifies the managed zone addressed by this request. Can be the managed zone name or ID. |
| `name` | path | string | yes | Fully qualified domain name. |
| `type` | path | string | yes | RRSet type. |
| `clientOperationId` | query | string | no | For mutating operation requests only. An optional identifier specified by the client. Must be unique for operation resources in the Operations collection. |

### `dns.resourceRecordSets.get`

- Versions: v1, v1beta2
- `GET https://dns.googleapis.com/dns/v1/projects/{project}/managedZones/{managedZone}/rrsets/{name}/{type}`
- Fetches the representation of an existing ResourceRecordSet.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`, `https://www.googleapis.com/auth/ndev.clouddns.readonly`, `https://www.googleapis.com/auth/ndev.clouddns.readwrite`
- Request: —; Response: `ResourceRecordSet`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Identifies the project addressed by this request. |
| `managedZone` | path | string | yes | Identifies the managed zone addressed by this request. Can be the managed zone name or ID. |
| `name` | path | string | yes | Fully qualified domain name. |
| `type` | path | string | yes | RRSet type. |
| `clientOperationId` | query | string | no | For mutating operation requests only. An optional identifier specified by the client. Must be unique for operation resources in the Operations collection. |

### `dns.resourceRecordSets.list`

- Versions: v1, v1beta2
- `GET https://dns.googleapis.com/dns/v1/projects/{project}/managedZones/{managedZone}/rrsets`
- Enumerates ResourceRecordSets that you have created but not yet deleted.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`, `https://www.googleapis.com/auth/ndev.clouddns.readonly`, `https://www.googleapis.com/auth/ndev.clouddns.readwrite`
- Request: —; Response: `ResourceRecordSetsListResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Identifies the project addressed by this request. |
| `managedZone` | path | string | yes | Identifies the managed zone addressed by this request. Can be the managed zone name or ID. |
| `filter` | query | string | no | Specify a filter expression to view records that exactly match the specified domain. Both the `name` and `type` parameters are not supported and must be omitted when you use `filter`. Your `filter` expression must conform to AIP-160 and you must specify a domain in the `name` field. Optionally, you can include the `type` field to filter records by type. You can also include the `has_suffix` function to view records that match by domain suffix. Examples: \* `name`="example.com." \* `name`="example.com." AND type="A" \* `name`=`has_suffix`("example.com.") \* `name`=`has_suffix`("example.com.") AND type="A" |
| `maxResults` | query | integer (int32) | no | Optional. Maximum number of results to be returned. If unspecified, the server decides how many results to return. |
| `name` | query | string | no | Specify a fully qualified domain name to view only those records. The `name` parameter is not supported and must be omitted when you use `filter`. |
| `pageToken` | query | string | no | Optional. A tag returned by a previous list request that was truncated. Use this parameter to continue a previous list request. |
| `type` | query | string | no | Specify a record type to view only those records. You must also specify the `name` parameter. The `type` parameter is not supported and must be omitted when you use `filter`. |

### `dns.resourceRecordSets.patch`

- Versions: v1, v1beta2
- `PATCH https://dns.googleapis.com/dns/v1/projects/{project}/managedZones/{managedZone}/rrsets/{name}/{type}`
- Applies a partial update to an existing ResourceRecordSet.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/ndev.clouddns.readwrite`
- Request: `ResourceRecordSet`; Response: `ResourceRecordSet`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Identifies the project addressed by this request. |
| `managedZone` | path | string | yes | Identifies the managed zone addressed by this request. Can be the managed zone name or ID. |
| `name` | path | string | yes | Fully qualified domain name. |
| `type` | path | string | yes | RRSet type. |
| `clientOperationId` | query | string | no | For mutating operation requests only. An optional identifier specified by the client. Must be unique for operation resources in the Operations collection. |

### `dns.responsePolicies.create`

- Versions: v1, v1beta2
- `POST https://dns.googleapis.com/dns/v1/projects/{project}/responsePolicies`
- Creates a new Response Policy
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/ndev.clouddns.readwrite`
- Request: `ResponsePolicy`; Response: `ResponsePolicy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Identifies the project addressed by this request. |
| `clientOperationId` | query | string | no | For mutating operation requests only. An optional identifier specified by the client. Must be unique for operation resources in the Operations collection. |

### `dns.responsePolicies.delete`

- Versions: v1, v1beta2
- `DELETE https://dns.googleapis.com/dns/v1/projects/{project}/responsePolicies/{responsePolicy}`
- Deletes a previously created Response Policy. Fails if the response policy is non-empty or still being referenced by a network.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/ndev.clouddns.readwrite`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Identifies the project addressed by this request. |
| `responsePolicy` | path | string | yes | User assigned name of the Response Policy addressed by this request. |
| `clientOperationId` | query | string | no | For mutating operation requests only. An optional identifier specified by the client. Must be unique for operation resources in the Operations collection. |

### `dns.responsePolicies.get`

- Versions: v1, v1beta2
- `GET https://dns.googleapis.com/dns/v1/projects/{project}/responsePolicies/{responsePolicy}`
- Fetches the representation of an existing Response Policy.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`, `https://www.googleapis.com/auth/ndev.clouddns.readonly`, `https://www.googleapis.com/auth/ndev.clouddns.readwrite`
- Request: —; Response: `ResponsePolicy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Identifies the project addressed by this request. |
| `responsePolicy` | path | string | yes | User assigned name of the Response Policy addressed by this request. |
| `clientOperationId` | query | string | no | For mutating operation requests only. An optional identifier specified by the client. Must be unique for operation resources in the Operations collection. |

### `dns.responsePolicies.list`

- Versions: v1, v1beta2
- `GET https://dns.googleapis.com/dns/v1/projects/{project}/responsePolicies`
- Enumerates all Response Policies associated with a project.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`, `https://www.googleapis.com/auth/ndev.clouddns.readonly`, `https://www.googleapis.com/auth/ndev.clouddns.readwrite`
- Request: —; Response: `ResponsePoliciesListResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Identifies the project addressed by this request. |
| `maxResults` | query | integer (int32) | no | Optional. Maximum number of results to be returned. If unspecified, the server decides how many results to return. |
| `pageToken` | query | string | no | Optional. A tag returned by a previous list request that was truncated. Use this parameter to continue a previous list request. |

### `dns.responsePolicies.patch`

- Versions: v1, v1beta2
- `PATCH https://dns.googleapis.com/dns/v1/projects/{project}/responsePolicies/{responsePolicy}`
- Applies a partial update to an existing Response Policy.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/ndev.clouddns.readwrite`
- Request: `ResponsePolicy`; Response: `ResponsePoliciesPatchResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Identifies the project addressed by this request. |
| `responsePolicy` | path | string | yes | User assigned name of the response policy addressed by this request. |
| `clientOperationId` | query | string | no | For mutating operation requests only. An optional identifier specified by the client. Must be unique for operation resources in the Operations collection. |

### `dns.responsePolicies.update`

- Versions: v1, v1beta2
- `PUT https://dns.googleapis.com/dns/v1/projects/{project}/responsePolicies/{responsePolicy}`
- Updates an existing Response Policy.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/ndev.clouddns.readwrite`
- Request: `ResponsePolicy`; Response: `ResponsePoliciesUpdateResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Identifies the project addressed by this request. |
| `responsePolicy` | path | string | yes | User assigned name of the Response Policy addressed by this request. |
| `clientOperationId` | query | string | no | For mutating operation requests only. An optional identifier specified by the client. Must be unique for operation resources in the Operations collection. |

### `dns.responsePolicyRules.create`

- Versions: v1, v1beta2
- `POST https://dns.googleapis.com/dns/v1/projects/{project}/responsePolicies/{responsePolicy}/rules`
- Creates a new Response Policy Rule.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/ndev.clouddns.readwrite`
- Request: `ResponsePolicyRule`; Response: `ResponsePolicyRule`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Identifies the project addressed by this request. |
| `responsePolicy` | path | string | yes | User assigned name of the Response Policy containing the Response Policy Rule. |
| `clientOperationId` | query | string | no | For mutating operation requests only. An optional identifier specified by the client. Must be unique for operation resources in the Operations collection. |

### `dns.responsePolicyRules.delete`

- Versions: v1, v1beta2
- `DELETE https://dns.googleapis.com/dns/v1/projects/{project}/responsePolicies/{responsePolicy}/rules/{responsePolicyRule}`
- Deletes a previously created Response Policy Rule.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/ndev.clouddns.readwrite`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Identifies the project addressed by this request. |
| `responsePolicy` | path | string | yes | User assigned name of the Response Policy containing the Response Policy Rule. |
| `responsePolicyRule` | path | string | yes | User assigned name of the Response Policy Rule addressed by this request. |
| `clientOperationId` | query | string | no | For mutating operation requests only. An optional identifier specified by the client. Must be unique for operation resources in the Operations collection. |

### `dns.responsePolicyRules.get`

- Versions: v1, v1beta2
- `GET https://dns.googleapis.com/dns/v1/projects/{project}/responsePolicies/{responsePolicy}/rules/{responsePolicyRule}`
- Fetches the representation of an existing Response Policy Rule.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`, `https://www.googleapis.com/auth/ndev.clouddns.readonly`, `https://www.googleapis.com/auth/ndev.clouddns.readwrite`
- Request: —; Response: `ResponsePolicyRule`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Identifies the project addressed by this request. |
| `responsePolicy` | path | string | yes | User assigned name of the Response Policy containing the Response Policy Rule. |
| `responsePolicyRule` | path | string | yes | User assigned name of the Response Policy Rule addressed by this request. |
| `clientOperationId` | query | string | no | For mutating operation requests only. An optional identifier specified by the client. Must be unique for operation resources in the Operations collection. |

### `dns.responsePolicyRules.list`

- Versions: v1, v1beta2
- `GET https://dns.googleapis.com/dns/v1/projects/{project}/responsePolicies/{responsePolicy}/rules`
- Enumerates all Response Policy Rules associated with a project.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`, `https://www.googleapis.com/auth/ndev.clouddns.readonly`, `https://www.googleapis.com/auth/ndev.clouddns.readwrite`
- Request: —; Response: `ResponsePolicyRulesListResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Identifies the project addressed by this request. |
| `responsePolicy` | path | string | yes | User assigned name of the Response Policy to list. |
| `maxResults` | query | integer (int32) | no | Optional. Maximum number of results to be returned. If unspecified, the server decides how many results to return. |
| `pageToken` | query | string | no | Optional. A tag returned by a previous list request that was truncated. Use this parameter to continue a previous list request. |

### `dns.responsePolicyRules.patch`

- Versions: v1, v1beta2
- `PATCH https://dns.googleapis.com/dns/v1/projects/{project}/responsePolicies/{responsePolicy}/rules/{responsePolicyRule}`
- Applies a partial update to an existing Response Policy Rule.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/ndev.clouddns.readwrite`
- Request: `ResponsePolicyRule`; Response: `ResponsePolicyRulesPatchResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Identifies the project addressed by this request. |
| `responsePolicy` | path | string | yes | User assigned name of the Response Policy containing the Response Policy Rule. |
| `responsePolicyRule` | path | string | yes | User assigned name of the Response Policy Rule addressed by this request. |
| `clientOperationId` | query | string | no | For mutating operation requests only. An optional identifier specified by the client. Must be unique for operation resources in the Operations collection. |

### `dns.responsePolicyRules.update`

- Versions: v1, v1beta2
- `PUT https://dns.googleapis.com/dns/v1/projects/{project}/responsePolicies/{responsePolicy}/rules/{responsePolicyRule}`
- Updates an existing Response Policy Rule.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/ndev.clouddns.readwrite`
- Request: `ResponsePolicyRule`; Response: `ResponsePolicyRulesUpdateResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `project` | path | string | yes | Identifies the project addressed by this request. |
| `responsePolicy` | path | string | yes | User assigned name of the Response Policy containing the Response Policy Rule. |
| `responsePolicyRule` | path | string | yes | User assigned name of the Response Policy Rule addressed by this request. |
| `clientOperationId` | query | string | no | For mutating operation requests only. An optional identifier specified by the client. Must be unique for operation resources in the Operations collection. |

### Example request skeleton

Generated from the Discovery entry of `dns.changes.get` (not in the official docs); replace the `{...}` path variables (URL-encode query values):

```bash
curl -X GET \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  "https://dns.googleapis.com/dns/v1/projects/{project}/managedZones/{managedZone}/changes/{changeId}"
```

## Notes

- Generated from the Discovery document(s) v1, v1beta2 of `dns` (retrieved 2026-11-14). Resources on this page: changes, dnsKeys, locations, managedZoneOperations, managedZones, operations, outboundEndpoints, policies, projects, resourceRecordSets, responsePolicies, responsePolicyRules.
- The Required column is `yes` for path variables and required parameters, and `conditional` when the description says "Required if ..." (mutually exclusive alternatives), when a `parent.child` parameter is required only inside an optional parent message or one branch of a oneof. Path variables are `yes` unless a note below names an alternative route without them.
- Message schemas (the request and response types named above) are listed under `references/rest-schemas/dns/`; they are the `schemas` section of the Discovery documents in Source.
- Source: https://dns.googleapis.com/$discovery/rest?version=v1, https://dns.googleapis.com/$discovery/rest?version=v1beta2 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
