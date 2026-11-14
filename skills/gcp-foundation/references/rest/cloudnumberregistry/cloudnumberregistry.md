---
source: https://cloudnumberregistry.googleapis.com/$discovery/rest?version=v1alpha
---

# Cloud Number Registry API REST API (cloudnumberregistry)

## Signature / Usage

Base URL: `https://cloudnumberregistry.googleapis.com`. Methods are listed by `id`; the `Versions` line shows which API versions define the method (preferred: v1alpha).

### `cloudnumberregistry.organizations.locations.operations.cancel`

- Versions: v1alpha
- `POST https://cloudnumberregistry.googleapis.com/v1alpha/{+name}:cancel`
- Starts asynchronous cancellation on a long-running operation. The server makes a best effort to cancel the operation, but success is not guaranteed. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. Clients can use Operations.GetOperation or other methods to check whether the cancellation succeeded or whether the operation completed despite cancellation. On su…
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `CancelOperationRequest`; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource to be cancelled. |

### `cloudnumberregistry.organizations.locations.operations.delete`

- Versions: v1alpha
- `DELETE https://cloudnumberregistry.googleapis.com/v1alpha/{+name}`
- Deletes a long-running operation. This method indicates that the client is no longer interested in the operation result. It does not cancel the operation. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource to be deleted. |

### `cloudnumberregistry.organizations.locations.operations.get`

- Versions: v1alpha
- `GET https://cloudnumberregistry.googleapis.com/v1alpha/{+name}`
- Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource. |

### `cloudnumberregistry.organizations.locations.operations.list`

- Versions: v1alpha
- `GET https://cloudnumberregistry.googleapis.com/v1alpha/{+name}/operations`
- Lists operations that match the specified filter in the request. If the server doesn't support this method, it returns `UNIMPLEMENTED`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListOperationsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation's parent resource. |
| `filter` | query | string | no | The standard list filter. |
| `pageSize` | query | integer (int32) | no | The standard list page size. |
| `pageToken` | query | string | no | The standard list page token. |
| `returnPartialSuccess` | query | boolean | no | When set to `true`, operations that are reachable are returned as normal, and those that are unreachable are returned in the ListOperationsResponse.unreachable field. This can only be `true` when reading across collections. For example, when `parent` is set to `"projects/example/locations/-"`. This… |

### `cloudnumberregistry.organizations.locations.orgNumberRegistries.create`

- Versions: v1alpha
- `POST https://cloudnumberregistry.googleapis.com/v1alpha/{+parent}/orgNumberRegistries`
- Creates a new OrgNumberRegistry in a given organization and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `OrgNumberRegistry`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource name where the OrgNumberRegistry will be created. |
| `orgNumberRegistryId` | query | string | no | Required. The ID to use for the OrgNumberRegistry, which will become the final segment of the resource name. |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes after the first request. For example, consid… |

### `cloudnumberregistry.organizations.locations.orgNumberRegistries.delete`

- Versions: v1alpha
- `DELETE https://cloudnumberregistry.googleapis.com/v1alpha/{+name}`
- Deletes a single OrgNumberRegistry.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the OrgNumberRegistry to delete. |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes after the first request. For example, consid… |

### `cloudnumberregistry.organizations.locations.orgNumberRegistries.get`

- Versions: v1alpha
- `GET https://cloudnumberregistry.googleapis.com/v1alpha/{+name}`
- Gets details of a single OrgNumberRegistry.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `OrgNumberRegistry`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the OrgNumberRegistry to retrieve. |

### `cloudnumberregistry.organizations.locations.orgNumberRegistries.list`

- Versions: v1alpha
- `GET https://cloudnumberregistry.googleapis.com/v1alpha/{+parent}/orgNumberRegistries`
- Lists OrgNumberRegistries in a given organization and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListOrgNumberRegistriesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource name, for example `organizations/*/locations/*`. |
| `filter` | query | string | no | Optional. Filter expression to filter the results. |
| `orderBy` | query | string | no | Optional. Hint for how to order the results. |
| `pageSize` | query | integer (int32) | no | Optional. Requested page size. Server may return fewer items than requested. If unspecified, server will pick an appropriate default. |
| `pageToken` | query | string | no | Optional. A token identifying a page of results the server should return. |

### `cloudnumberregistry.projects.locations.customRanges.create`

- Versions: v1alpha
- `POST https://cloudnumberregistry.googleapis.com/v1alpha/{+parent}/customRanges`
- Creates a new CustomRange in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `CustomRange`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource name where the CustomRange will be created. |
| `customRangeId` | query | string | no | Required. The ID to use for the CustomRange, which will become the final segment of the resource name. |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consid… |

### `cloudnumberregistry.projects.locations.customRanges.delete`

- Versions: v1alpha
- `DELETE https://cloudnumberregistry.googleapis.com/v1alpha/{+name}`
- Deletes a single CustomRange.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the CustomRange to delete. |
| `force` | query | boolean | no | Optional. If set to true, all associated resources will be deleted. |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes after the first request. For example, consid… |

### `cloudnumberregistry.projects.locations.customRanges.findFreeIpRanges`

- Versions: v1alpha
- `GET https://cloudnumberregistry.googleapis.com/v1alpha/{+name}:findFreeIpRanges`
- Finds free IP ranges in a single CustomRange.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `FindCustomRangeFreeIpRangesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the CustomRange to search within. |
| `cidrPrefixLength` | query | integer (int32) | no | Required. The prefix length of the free IP ranges to find. |
| `rangeCount` | query | integer (int32) | no | Optional. The number of free IP ranges to find. |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consid… |

### `cloudnumberregistry.projects.locations.customRanges.get`

- Versions: v1alpha
- `GET https://cloudnumberregistry.googleapis.com/v1alpha/{+name}`
- Gets details of a single CustomRange.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `CustomRange`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the CustomRange to retrieve. |

### `cloudnumberregistry.projects.locations.customRanges.list`

- Versions: v1alpha
- `GET https://cloudnumberregistry.googleapis.com/v1alpha/{+parent}/customRanges`
- Lists CustomRanges in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListCustomRangesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource name, for example `projects/*/locations/*`. |
| `filter` | query | string | no | Optional. Filter expression to filter the results. |
| `orderBy` | query | string | no | Optional. Hint for how to order the results. |
| `pageSize` | query | integer (int32) | no | Optional. Requested page size. Server may return fewer items than requested. If unspecified, server will pick an appropriate default. |
| `pageToken` | query | string | no | Optional. A token identifying a page of results the server should return. |

### `cloudnumberregistry.projects.locations.customRanges.patch`

- Versions: v1alpha
- `PATCH https://cloudnumberregistry.googleapis.com/v1alpha/{+name}`
- Updates the parameters of a single CustomRange.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `CustomRange`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Identifier. The resource name of the CustomRange, in the format `projects/{project}/locations/{location}/customRanges/{custom_range}`. |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consid… |
| `updateMask` | query | string (google-fieldmask) | no | Optional. Field mask is used to specify the fields to be overwritten in the CustomRange resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it is in the mask. If the user does not provide a mask then all … |

### `cloudnumberregistry.projects.locations.customRanges.showUtilization`

- Versions: v1alpha
- `GET https://cloudnumberregistry.googleapis.com/v1alpha/{+name}:showUtilization`
- Gets the details of a single CustomRange and its utilization.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ShowCustomRangeUtilizationResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the CustomRange. |

### `cloudnumberregistry.projects.locations.discoveredRanges.findFreeIpRanges`

- Versions: v1alpha
- `GET https://cloudnumberregistry.googleapis.com/v1alpha/{+name}:findFreeIpRanges`
- Finds free IP ranges in a single DiscoveredRange.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `FindDiscoveredRangeFreeIpRangesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the DiscoveredRange to search within. |
| `cidrPrefixLength` | query | integer (int32) | no | Required. The prefix length of the free IP ranges to find. |
| `rangeCount` | query | integer (int32) | no | Optional. The number of free IP ranges to find. |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consid… |

### `cloudnumberregistry.projects.locations.discoveredRanges.get`

- Versions: v1alpha
- `GET https://cloudnumberregistry.googleapis.com/v1alpha/{+name}`
- Gets details of a single DiscoveredRange.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `DiscoveredRange`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the DiscoveredRange to retrieve. |

### `cloudnumberregistry.projects.locations.discoveredRanges.list`

- Versions: v1alpha
- `GET https://cloudnumberregistry.googleapis.com/v1alpha/{+parent}/discoveredRanges`
- Lists DiscoveredRanges in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListDiscoveredRangesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource name, for example `projects/*/locations/*`. |
| `filter` | query | string | no | Optional. Filter expression to filter the results. |
| `orderBy` | query | string | no | Optional. Hint for how to order the results. |
| `pageSize` | query | integer (int32) | no | Optional. Requested page size. Server may return fewer items than requested. If unspecified, server will pick an appropriate default. |
| `pageToken` | query | string | no | Optional. A token identifying a page of results the server should return. |

### `cloudnumberregistry.projects.locations.discoveredRanges.showUtilization`

- Versions: v1alpha
- `GET https://cloudnumberregistry.googleapis.com/v1alpha/{+name}:showUtilization`
- Gets the details of a single DiscoveredRange and its utilization.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ShowDiscoveredRangeUtilizationResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the DiscoveredRange. |

### `cloudnumberregistry.projects.locations.get`

- Versions: v1alpha
- `GET https://cloudnumberregistry.googleapis.com/v1alpha/{+name}`
- Gets information about a location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Location`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Resource name for the location. |

### `cloudnumberregistry.projects.locations.ipamAdminScopes.checkAvailability`

- Versions: v1alpha
- `GET https://cloudnumberregistry.googleapis.com/v1alpha/{+parent}/ipamAdminScopes:checkAvailability`
- Checks the availability of IpamAdminScopes in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `CheckAvailabilityIpamAdminScopesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource name, for example `projects/*/locations/*`. |
| `scopes` | query | string | no | Required. The administrative scopes to check for availability. |

### `cloudnumberregistry.projects.locations.ipamAdminScopes.cleanup`

- Versions: v1alpha
- `POST https://cloudnumberregistry.googleapis.com/v1alpha/{+name}:cleanup`
- Cleans up a single IpamAdminScope.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `CleanupIpamAdminScopeRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the IpamAdminScope to clean up. |

### `cloudnumberregistry.projects.locations.ipamAdminScopes.create`

- Versions: v1alpha
- `POST https://cloudnumberregistry.googleapis.com/v1alpha/{+parent}/ipamAdminScopes`
- Creates a new IpamAdminScope in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `IpamAdminScope`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource name where the IpamAdminScope will be created. |
| `ipamAdminScopeId` | query | string | no | Required. The ID to use for the IpamAdminScope, which will become the final segment of the resource name. |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consid… |

### `cloudnumberregistry.projects.locations.ipamAdminScopes.delete`

- Versions: v1alpha
- `DELETE https://cloudnumberregistry.googleapis.com/v1alpha/{+name}`
- Deletes a single IpamAdminScope.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the IpamAdminScope to delete. |
| `force` | query | boolean | no | Optional. If set to true, all associated resources will be deleted. |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes after the first request. For example, consid… |

### `cloudnumberregistry.projects.locations.ipamAdminScopes.disable`

- Versions: v1alpha
- `POST https://cloudnumberregistry.googleapis.com/v1alpha/{+name}:disable`
- Disables a single IpamAdminScope.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `DisableIpamAdminScopeRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the IpamAdminScope to disable. |

### `cloudnumberregistry.projects.locations.ipamAdminScopes.get`

- Versions: v1alpha
- `GET https://cloudnumberregistry.googleapis.com/v1alpha/{+name}`
- Gets details of a single IpamAdminScope.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `IpamAdminScope`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the IpamAdminScope to retrieve. |

### `cloudnumberregistry.projects.locations.ipamAdminScopes.list`

- Versions: v1alpha
- `GET https://cloudnumberregistry.googleapis.com/v1alpha/{+parent}/ipamAdminScopes`
- Lists IpamAdminScopes in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListIpamAdminScopesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource name, for example `projects/*/locations/*`. |
| `filter` | query | string | no | Optional. Filter expression to filter the results. |
| `orderBy` | query | string | no | Optional. Hint for how to order the results. |
| `pageSize` | query | integer (int32) | no | Optional. Requested page size. Server may return fewer items than requested. If unspecified, server will pick an appropriate default. |
| `pageToken` | query | string | no | Optional. A token identifying a page of results the server should return. |

### `cloudnumberregistry.projects.locations.ipamAdminScopes.patch`

- Versions: v1alpha
- `PATCH https://cloudnumberregistry.googleapis.com/v1alpha/{+name}`
- Updates the parameters of a single IpamAdminScope.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `IpamAdminScope`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Identifier. The resource name of the IpamAdminScope. |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consid… |
| `updateMask` | query | string (google-fieldmask) | no | Optional. Field mask is used to specify the fields to be overwritten in the IpamAdminScope resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it is in the mask. If the user does not provide a mask then a… |

### `cloudnumberregistry.projects.locations.list`

- Versions: v1alpha
- `GET https://cloudnumberregistry.googleapis.com/v1alpha/{+name}/locations`
- Lists information about the supported locations for this service. This method lists locations based on the resource scope provided in the ListLocationsRequest.name field: \* \*\*Global locations\*\*: If `name` is empty, the method lists the public locations available to all projects. \* \*\*Project-specific locations\*\*: If `name` follows the format `projects/{project}`, the method lists locations visible…
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListLocationsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The resource that owns the locations collection, if applicable. |
| `extraLocationTypes` | query | string | no | Optional. Do not use this field unless explicitly documented otherwise. This is primarily for internal usage. |
| `filter` | query | string | no | A filter to narrow down results to a preferred subset. The filtering language accepts strings like `"displayName=tokyo"`, and is documented in more detail in [AIP-160](https://google.aip.dev/160). |
| `pageSize` | query | integer (int32) | no | The maximum number of results to return. If not set, the service selects a default. |
| `pageToken` | query | string | no | A page token received from the `next_page_token` field in the response. Send that page token to receive the subsequent page. |

### `cloudnumberregistry.projects.locations.operations.cancel`

- Versions: v1alpha
- `POST https://cloudnumberregistry.googleapis.com/v1alpha/{+name}:cancel`
- Starts asynchronous cancellation on a long-running operation. The server makes a best effort to cancel the operation, but success is not guaranteed. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. Clients can use Operations.GetOperation or other methods to check whether the cancellation succeeded or whether the operation completed despite cancellation. On su…
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `CancelOperationRequest`; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource to be cancelled. |

### `cloudnumberregistry.projects.locations.operations.delete`

- Versions: v1alpha
- `DELETE https://cloudnumberregistry.googleapis.com/v1alpha/{+name}`
- Deletes a long-running operation. This method indicates that the client is no longer interested in the operation result. It does not cancel the operation. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource to be deleted. |

### `cloudnumberregistry.projects.locations.operations.get`

- Versions: v1alpha
- `GET https://cloudnumberregistry.googleapis.com/v1alpha/{+name}`
- Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource. |

### `cloudnumberregistry.projects.locations.operations.list`

- Versions: v1alpha
- `GET https://cloudnumberregistry.googleapis.com/v1alpha/{+name}/operations`
- Lists operations that match the specified filter in the request. If the server doesn't support this method, it returns `UNIMPLEMENTED`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListOperationsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation's parent resource. |
| `filter` | query | string | no | The standard list filter. |
| `pageSize` | query | integer (int32) | no | The standard list page size. |
| `pageToken` | query | string | no | The standard list page token. |
| `returnPartialSuccess` | query | boolean | no | When set to `true`, operations that are reachable are returned as normal, and those that are unreachable are returned in the ListOperationsResponse.unreachable field. This can only be `true` when reading across collections. For example, when `parent` is set to `"projects/example/locations/-"`. This… |

### `cloudnumberregistry.projects.locations.realms.create`

- Versions: v1alpha
- `POST https://cloudnumberregistry.googleapis.com/v1alpha/{+parent}/realms`
- Creates a new Realm in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Realm`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource name where the Realm will be created. |
| `realmId` | query | string | no | Required. The ID to use for the Realm, which will become the final segment of the resource name. |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. |

### `cloudnumberregistry.projects.locations.realms.delete`

- Versions: v1alpha
- `DELETE https://cloudnumberregistry.googleapis.com/v1alpha/{+name}`
- Deletes a single Realm.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the Realm to delete. |
| `force` | query | boolean | no | Optional. If set to true, all associated resources will be deleted. |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes after the first request. |

### `cloudnumberregistry.projects.locations.realms.get`

- Versions: v1alpha
- `GET https://cloudnumberregistry.googleapis.com/v1alpha/{+name}`
- Gets details of a single Realm.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Realm`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the Realm to retrieve. |
| `view` | query | string enum | no | Optional. The view of the Realm to retrieve. |

### `cloudnumberregistry.projects.locations.realms.list`

- Versions: v1alpha
- `GET https://cloudnumberregistry.googleapis.com/v1alpha/{+parent}/realms`
- Lists Realms in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListRealmsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource name, for example `projects/*/locations/*`. |
| `filter` | query | string | no | Optional. Filter expression to filter the results. |
| `orderBy` | query | string | no | Optional. Hint for how to order the results. |
| `pageSize` | query | integer (int32) | no | Optional. Requested page size. Server may return fewer items than requested. If unspecified, server will pick an appropriate default. |
| `pageToken` | query | string | no | Optional. A token identifying a page of results the server should return. |
| `view` | query | string enum | no | Optional. The view of the Realm to retrieve. |

### `cloudnumberregistry.projects.locations.realms.patch`

- Versions: v1alpha
- `PATCH https://cloudnumberregistry.googleapis.com/v1alpha/{+name}`
- Updates the parameters of a single Realm.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Realm`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Identifier. The resource name of the Realm. |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. |
| `updateMask` | query | string (google-fieldmask) | no | Optional. Field mask is used to specify the fields to be overwritten in the Realm resource by the update. |

### `cloudnumberregistry.projects.locations.registryBooks.create`

- Versions: v1alpha
- `POST https://cloudnumberregistry.googleapis.com/v1alpha/{+parent}/registryBooks`
- Creates a new RegistryBook in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `RegistryBook`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource name where the RegistryBook will be created. |
| `registryBookId` | query | string | no | Required. The ID to use for the RegistryBook, which will become the final segment of the resource name. |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consid… |

### `cloudnumberregistry.projects.locations.registryBooks.delete`

- Versions: v1alpha
- `DELETE https://cloudnumberregistry.googleapis.com/v1alpha/{+name}`
- Deletes a single RegistryBook.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the RegistryBook to delete. |
| `force` | query | boolean | no | Optional. If set to true, all associated resources will be deleted. |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes after the first request. For example, consid… |

### `cloudnumberregistry.projects.locations.registryBooks.get`

- Versions: v1alpha
- `GET https://cloudnumberregistry.googleapis.com/v1alpha/{+name}`
- Gets details of a single RegistryBook.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `RegistryBook`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the RegistryBook to retrieve. |
| `view` | query | string enum | no | Optional. The view of the RegistryBook to retrieve. |

### `cloudnumberregistry.projects.locations.registryBooks.list`

- Versions: v1alpha
- `GET https://cloudnumberregistry.googleapis.com/v1alpha/{+parent}/registryBooks`
- Lists RegistryBooks in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListRegistryBooksResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource name, for example `projects/*/locations/*`. |
| `filter` | query | string | no | Optional. Filter expression to filter the results. |
| `orderBy` | query | string | no | Optional. Hint for how to order the results. |
| `pageSize` | query | integer (int32) | no | Optional. Requested page size. Server may return fewer items than requested. If unspecified, server will pick an appropriate default. |
| `pageToken` | query | string | no | Optional. A token identifying a page of results the server should return. |
| `view` | query | string enum | no | Optional. The view of the RegistryBook to retrieve. |

### `cloudnumberregistry.projects.locations.registryBooks.patch`

- Versions: v1alpha
- `PATCH https://cloudnumberregistry.googleapis.com/v1alpha/{+name}`
- Updates the parameters of a single RegistryBook.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `RegistryBook`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Identifier. The resource name of the RegistryBook. |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consid… |
| `updateMask` | query | string (google-fieldmask) | no | Optional. Field mask is used to specify the fields to be overwritten in the RegistryBook resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it is in the mask. If the user does not provide a mask then all… |

### `cloudnumberregistry.projects.locations.registryBooks.searchIpResources`

- Versions: v1alpha
- `POST https://cloudnumberregistry.googleapis.com/v1alpha/{+name}:searchIpResources`
- Searches IP resources in a given RegistryBook.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `SearchIpResourcesRequest`; Response: `SearchIpResourcesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the RegistryBook to search in. |

## Notes

- Generated from the Discovery document(s) v1alpha of `cloudnumberregistry` (retrieved 2026-11-14). Resources on this page: organizations, projects.
- Message schemas are listed under `references/rest-schemas/cloudnumberregistry/`.
- Source: https://cloudnumberregistry.googleapis.com/$discovery/rest?version=v1alpha (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
