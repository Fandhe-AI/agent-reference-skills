---
source: https://cloudnumberregistry.googleapis.com/$discovery/rest?version=v1alpha
---

# Cloud Number Registry API message schemas (cloudnumberregistry)

## Signature / Usage

Message types referenced by the methods listed under `references/rest/cloudnumberregistry/`.

### `AggregatedData`

- Aggregated data for the RegistryBook.
- Version: v1alpha

| Field | Type | Description |
|---|---|---|
| `customRangesCount` | integer (int32) | Output only. Number of CustomRanges in the RegistryBook. |
| `customRealmsCount` | integer (int32) | Output only. Number of custom Realms in the RegistryBook. |
| `discoveredRangesCount` | integer (int32) | Output only. Number of DiscoveredRanges in the RegistryBook. |
| `discoveredRealmsCount` | integer (int32) | Output only. Number of discovered Realms in the RegistryBook. |
| `uniqueScopesCount` | integer (int32) | Output only. Number of scopes unique to the RegistryBook. |

### `Attribute`

- A key-value pair representing a custom attribute associated with a resource.
- Version: v1alpha

| Field | Type | Description |
|---|---|---|
| `key` | string | Required. The key of the attribute. |
| `value` | string | Required. The value of the attribute. |

### `CancelOperationRequest`

- The request message for Operations.CancelOperation.
- Version: v1alpha

### `CheckAvailabilityIpamAdminScopesResponse`

- Response message for the CloudNumberRegistry.CheckAvailabilityIpamAdminScopes method.
- Version: v1alpha

| Field | Type | Description |
|---|---|---|
| `scopeAvailabilities` | array<IpamAdminScopeAvailability> | The details of the requested scopes. |

### `CleanupIpamAdminScopeRequest`

- Request message for the CloudNumberRegistry.CleanupIpamAdminScope method.
- Version: v1alpha

| Field | Type | Description |
|---|---|---|
| `requestId` | string | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `CustomRange`

- A CustomRange represents a user-defined IP address range.
- Version: v1alpha

| Field | Type | Description |
|---|---|---|
| `attributes` | array<Attribute> | Optional. The attributes of the CustomRange. |
| `description` | string | Optional. The description of the CustomRange. |
| `ipv4CidrRange` | string | Optional. The IPv4 CIDR range of the CustomRange. |
| `ipv6CidrRange` | string | Optional. The IPv6 CIDR range of the CustomRange. |
| `labels` | object | Optional. User-defined labels. |
| `name` | string | Required. Identifier. The resource name of the CustomRange, in the format `projects/{project}/locations/{location}/customRanges/{custom_range}`. |
| `parentRange` | string | Optional. The resource name of the parent CustomRange, in the format `projects/{project}/locations/{location}/customRanges/{custom_range}`. If specified, the parent CustomRange must be in the same RegistryBook. This field is mutually exclusive with the `realm` field, as the Realm is inherited from the parent CustomRange. |
| `realm` | string | Optional. The resource name of the Realm associated with the CustomRange, in the format `projects/{project}/locations/{location}/realms/{realm}`. The Realm must be in the same project as the CustomRange. This field must not be set if the `parent_range` field is set, as the Realm will be inherited from the parent CustomRange. |
| `registryBook` | string | Output only. The RegistryBook of the CustomRange. This field is inherited from the Realm or parent CustomRange depending on which one is specified. |

### `DisableIpamAdminScopeRequest`

- Request message for the CloudNumberRegistry.DisableIpamAdminScope method.
- Version: v1alpha

| Field | Type | Description |
|---|---|---|
| `requestId` | string | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `DiscoveredRange`

- A DiscoveredRange represents an IP address range automatically detected by the discovery pipeline.
- Version: v1alpha

| Field | Type | Description |
|---|---|---|
| `attributes` | array<Attribute> | Optional. The attributes of the DiscoveredRange. |
| `childCidrOverlapAllowed` | boolean | Output only. If true, allows child DiscoveredRanges of this DiscoveredRange to overlap with each other. |
| `createTime` | string (google-datetime) | Output only. The time at which the DiscoveredRange was created. |
| `description` | string | Optional. Description of the DiscoveredRange. |
| `discoveryMetadata` | DiscoveryMetadata | Output only. Owner metadata for this DiscoveredRange. A unique set of metadata is associated with each DiscoveredRange. If an IP range is shared by multiple resources (e.g., an Address resource and an Instance resource, or multiple ForwardingRules),separate DiscoveredRanges are created, each with a distinct owner. This ensures each DiscoveredRange has its own unique set of attributes, labels, create time and update time. |
| `ipv4CidrRange` | string | Optional. The IPv4 CIDR range of the DiscoveredRange. |
| `ipv6CidrRange` | string | Optional. The IPv6 CIDR range of the DiscoveredRange. |
| `labels` | object | Optional. User-defined labels. |
| `name` | string | Required. Identifier. The resource name of the DiscoveredRange, in the format `projects/{project}/locations/{location}/discoveredRanges/{discovered_range}`. |
| `parentRange` | string | Optional. The resource name of the parent DiscoveredRange, in the format `projects/{project}/locations/{location}/discoveredRanges/{discovered_range}`. |
| `realm` | string | Optional. The Realm of the DiscoveredRange. |
| `registryBook` | string | Output only. The RegistryBook of the DiscoveredRange. |
| `updateTime` | string (google-datetime) | Output only. The time at which the DiscoveredRange was last updated. |

### `DiscoveryMetadata`

- Metadata about a discovered resource, tracking event times, state, and source information.
- Version: v1alpha

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. The time when the resource was created. |
| `eventTime` | string (google-datetime) | Output only. The time when the event happened. |
| `resource` | string | Output only. The resource name of the discovered resource, should be API-agnostic. Example: "projects/{project_number}/networks/{network_id}". |
| `resourceUri` | string | Output only. The resource uri of the discovered resource. |
| `sourceId` | string | Output only. The canonical google.aip.dev/122 name of the source resource. |
| `sourceSubId` | string | Output only. A single source resource can be the source of multiple CNR resources. This sub_id is used to distinguish between the different CNR resources derived from the same upstream resource. For example, a single subnetwork can be the source of multiple Ranges, one for each protocol. In this case, the sub_id could be "private-ipv4" or "private-ipv6". |
| `state` | string enum | Output only. The state of the resource. |
| `updateTime` | string (google-datetime) | Output only. The time when the resource was last modified. |

### `Empty`

- A generic empty message that you can re-use to avoid defining duplicated empty messages in your APIs. A typical example is to use it as the request or the response type of an API method. For instance: service Foo { rpc Bar(google.protobuf.Empty) returns (google.protobuf.Empty); }
- Version: v1alpha

### `FindCustomRangeFreeIpRangesResponse`

- Response message for the CloudNumberRegistry.FindCustomRangeFreeIpRanges method.
- Version: v1alpha

| Field | Type | Description |
|---|---|---|
| `freeIpCidrRanges` | array<string> | Output only. The free IP CIDR ranges found. |

### `FindDiscoveredRangeFreeIpRangesResponse`

- Response message for the CloudNumberRegistry.FindDiscoveredRangeFreeIpRanges method.
- Version: v1alpha

| Field | Type | Description |
|---|---|---|
| `freeIpCidrRanges` | array<string> | Output only. The free IP CIDR ranges found. |

### `IpamAdminScope`

- An IpamAdminScope defines the administrative boundary for IP address discovery and management. It configures which platforms and organizational scopes are enabled for IP tracking.
- Version: v1alpha

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. The time at which the IpamAdminScope was created. |
| `enabledAddonPlatforms` | array<string> | Required. Add-on platforms that are enabled for this IpamAdminScope. Cloud Number Registry only discovers the IP addresses from the enabled platforms. |
| `labels` | object | Optional. User-defined labels. |
| `name` | string | Required. Identifier. The resource name of the IpamAdminScope. |
| `scopes` | array<string> | Required. Administrative scopes enabled for IP address discovery and management. For example, "organizations/1234567890". Minimum of 1 scope is required. In preview, only one organization scope is allowed. |
| `state` | string enum | Output only. State of resource discovery pipeline. |
| `updateTime` | string (google-datetime) | Output only. The time at which the IpamAdminScope was last updated. |

### `IpamAdminScopeAvailability`

- Availability details for a specific IpamAdminScope.
- Version: v1alpha

| Field | Type | Description |
|---|---|---|
| `adminProject` | string (int64) | The admin project of the IpamAdminScope if it exists. |
| `availability` | string enum | The availability of the scope. |
| `scope` | string | The scope of the IpamAdminScope. |

### `ListCustomRangesResponse`

- Response message for the CloudNumberRegistry.ListCustomRanges method.
- Version: v1alpha

| Field | Type | Description |
|---|---|---|
| `customRanges` | array<CustomRange> | The list of CustomRanges. |
| `nextPageToken` | string | A token to retrieve the next page of results, or empty if there are no more results in the list. |
| `unreachable` | array<string> | Locations that could not be reached. |

### `ListDiscoveredRangesResponse`

- Response message for the CloudNumberRegistry.ListDiscoveredRanges method.
- Version: v1alpha

| Field | Type | Description |
|---|---|---|
| `discoveredRanges` | array<DiscoveredRange> | The list of DiscoveredRanges. |
| `nextPageToken` | string | A token to retrieve the next page of results, or empty if there are no more results in the list. |
| `unreachable` | array<string> | Locations that could not be reached. |

### `ListIpamAdminScopesResponse`

- Response message for the CloudNumberRegistry.ListIpamAdminScopes method.
- Version: v1alpha

| Field | Type | Description |
|---|---|---|
| `ipamAdminScopes` | array<IpamAdminScope> | The list of IpamAdminScopes. |
| `nextPageToken` | string | A token to retrieve the next page of results, or empty if there are no more results in the list. |
| `unreachable` | array<string> | Locations that could not be reached. |

### `ListLocationsResponse`

- The response message for Locations.ListLocations.
- Version: v1alpha

| Field | Type | Description |
|---|---|---|
| `locations` | array<Location> | A list of locations that matches the specified filter in the request. |
| `nextPageToken` | string | The standard List next-page token. |

### `ListOperationsResponse`

- The response message for Operations.ListOperations.
- Version: v1alpha

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | The standard List next-page token. |
| `operations` | array<Operation> | A list of operations that matches the specified filter in the request. |
| `unreachable` | array<string> | Unordered list. Unreachable resources. Populated when the request sets `ListOperationsRequest.return_partial_success` and reads across collections. For example, when attempting to list all resources across all supported locations. |

### `ListOrgNumberRegistriesResponse`

- Response message for the CloudNumberRegistry.ListOrgNumberRegistries method.
- Version: v1alpha

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | A token to retrieve the next page of results, or empty if there are no more results in the list. |
| `orgNumberRegistries` | array<OrgNumberRegistry> | The list of OrgNumberRegistries. |
| `unreachable` | array<string> | Locations that could not be reached. |

### `ListRealmsResponse`

- Response message for the CloudNumberRegistry.ListRealms method.
- Version: v1alpha

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | A token identifying a page of results the server should return. |
| `realms` | array<Realm> | The list of Realms. |
| `unreachable` | array<string> | Locations that could not be reached. |

### `ListRegistryBooksResponse`

- Response message for the CloudNumberRegistry.ListRegistryBooks method.
- Version: v1alpha

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | A token identifying a page of results the server should return. |
| `registryBooks` | array<RegistryBook> | The list of RegistryBook |
| `unreachable` | array<string> | Locations that could not be reached. |

### `Location`

- A resource that represents a Google Cloud location.
- Version: v1alpha

| Field | Type | Description |
|---|---|---|
| `displayName` | string | The friendly name for this location, typically a nearby city name. For example, "Tokyo". |
| `labels` | object | Cross-service attributes for the location. For example {"cloud.googleapis.com/region": "us-east1"} |
| `locationId` | string | The canonical id for this location. For example: `"us-east1"`. |
| `metadata` | object | Service-specific metadata. For example the available capacity at the given location. |
| `name` | string | Resource name for the location, which may vary between implementations. For example: `"projects/example-project/locations/us-east1"` |

### `Operation`

- This resource represents a long-running operation that is the result of a network API call.
- Version: v1alpha

| Field | Type | Description |
|---|---|---|
| `done` | boolean | If the value is `false`, it means the operation is still in progress. If `true`, the operation is completed, and either `error` or `response` is available. |
| `error` | Status | The error result of the operation in case of failure or cancellation. |
| `metadata` | object | Service-specific metadata associated with the operation. It typically contains progress information and common metadata such as create time. Some services might not provide such metadata. Any method that returns a long-running operation should document the metadata type, if any. |
| `name` | string | The server-assigned name, which is only unique within the same service that originally returns it. If you use the default HTTP mapping, the `name` should be a resource name ending with `operations/{unique_id}`. |
| `response` | object | The normal, successful response of the operation. If the original method returns no data on success, such as `Delete`, the response is `google.protobuf.Empty`. If the original method is standard `Get`/`Create`/`Update`, the response should be the resource. For other methods, the response should have the type `XxxResponse`, where `Xxx` is the original method name. For example, if the original method name is `TakeSnapshot()`, the inferred response type is `TakeSnapshotResponse`. |

### `OperationMetadata`

- Represents the metadata of the long-running operation.
- Version: v1alpha

| Field | Type | Description |
|---|---|---|
| `apiVersion` | string | Output only. API version used to start the operation. |
| `createTime` | string (google-datetime) | Output only. The time the operation was created. |
| `endTime` | string (google-datetime) | Output only. The time the operation finished running. |
| `requestedCancellation` | boolean | Output only. Identifies whether the user has requested cancellation of the operation. Operations that have been cancelled successfully have Operation.error value with a google.rpc.Status.code of 1, corresponding to `Code.CANCELLED`. |
| `statusMessage` | string | Output only. Human-readable status of the operation, if any. |
| `target` | string | Output only. Server-defined resource path for the target of the operation. |
| `verb` | string | Output only. Name of the verb executed by the operation. |

### `OrgNumberRegistry`

- An OrgNumberRegistry defines a delegation of authority from an organization to a project, allowing the project to manage IP address data within specified scopes of the organization.
- Version: v1alpha

| Field | Type | Description |
|---|---|---|
| `adminProject` | string | Required. The project that will act as the admin project for CNR resources Format: projects/{project_number} or projects/{project_id} |
| `createTime` | string (google-datetime) | Output only. The time at which the OrgNumberRegistry was created. |
| `labels` | object | Optional. User-defined labels. |
| `name` | string | Identifier. The resource name of the OrgNumberRegistry. |
| `targetScopes` | array<string> | Required. The scopes within the organization that the project is able to manage. Currently only organization scope is supported. For example, "organizations/1234567890". |
| `updateTime` | string (google-datetime) | Output only. The time at which the OrgNumberRegistry was last updated. |

### `Range`

- Represents either a CustomRange or a DiscoveredRange.
- Version: v1alpha

| Field | Type | Description |
|---|---|---|
| `customRange` | CustomRange | A CustomRange. |
| `discoveredRange` | DiscoveredRange | A DiscoveredRange. |
| `utilization` | RangeUtilization | The utilization of the Range. |

### `RangeUtilization`

- Utilization metrics for an IP Range, including consumed and produced address counts.
- Version: v1alpha

| Field | Type | Description |
|---|---|---|
| `totalConsumed` | string | Output only. The total number of IP addresses consumed in the Range. |
| `totalProduced` | string | Output only. The total number of IP addresses produced in the Range. |
| `usage` | number (double) | Output only. The usage of the Range as a percentage. This is marked as optional so that we have presence tracking and API responses show 0.0 instead of NULL. |

### `Realm`

- A Realm represents a distinct network domain or security zone. It groups Ranges that share the same traffic and management characteristics. All the ranges in a Realm are routable to each other, meaning that they cannot overlap.
- Version: v1alpha

| Field | Type | Description |
|---|---|---|
| `aggregatedData` | RealmAggregatedData | Output only. Aggregated data for the Realm. Populated only when the view is AGGREGATE. |
| `createTime` | string (google-datetime) | Output only. The time at which the Realm was created. |
| `discoveryMetadata` | DiscoveryMetadata | Output only. Discovery metadata of the Realm. |
| `ipVersion` | string enum | Optional. IP version of the Realm. |
| `labels` | object | Optional. User-defined labels. |
| `managementType` | string enum | Optional. Management type of the Realm. |
| `name` | string | Required. Identifier. The resource name of the Realm. |
| `registryBook` | string | Required. Name of the RegistryBook that claims the Realm. |
| `trafficType` | string enum | Required. Traffic type of the Realm. |
| `updateTime` | string (google-datetime) | Output only. The time at which the Realm was last updated. |

### `RealmAggregatedData`

- Aggregated data for the Realm.
- Version: v1alpha

| Field | Type | Description |
|---|---|---|
| `customRangesCount` | integer (int32) | Output only. Number of CustomRanges in the Realm. |
| `discoveredRangesCount` | integer (int32) | Output only. Number of DiscoveredRanges in the Realm. |

### `RegistryBook`

- A RegistryBook organizes and manages IP address space. It claims specific scopes (such as projects) and groups related Realms and Ranges.
- Version: v1alpha

| Field | Type | Description |
|---|---|---|
| `aggregatedData` | AggregatedData | Output only. Aggregated data for the RegistryBook. Populated only when the view is AGGREGATE. |
| `claimedScopes` | array<string> | Optional. List of scopes claimed by the RegistryBook. In Preview, Only project scope is supported. Each scope is in the format of projects/{project}. Each scope can only be claimed once. |
| `claimedScopesInfo` | array<ScopeInfo> | Output only. Detailed scope information corresponding to each entry in `claimed_scopes`. |
| `createTime` | string (google-datetime) | Output only. The time at which the RegistryBook was created. |
| `isDefault` | boolean | Output only. Whether the RegistryBook is the default one. |
| `labels` | object | Optional. User-defined labels. |
| `name` | string | Required. Identifier. The resource name of the RegistryBook. |
| `updateTime` | string (google-datetime) | Output only. The time at which the RegistryBook was last updated. |

### `ScopeInfo`

- Details of a scope (e.g. project or folder).
- Version: v1alpha

| Field | Type | Description |
|---|---|---|
| `displayName` | string | Output only. Human-readable display title of the scope shown in Console (e.g. "My Cloud Project"). Used for UI display. |
| `id` | string | Output only. Programmatic string identifier of the scope (e.g. GCP Project ID "my-project-id"). Used for API and code logic. |
| `name` | string | Output only. Resource name of the scope, e.g. "projects/1234567890". |

### `SearchIpResourcesRequest`

- Request message for the CloudNumberRegistry.SearchIpResources method.
- Version: v1alpha

| Field | Type | Description |
|---|---|---|
| `orderBy` | string | Optional. Hint for how to order the results. Supported sort fields are: - `name`: Sort alphabetically by the resource name. - `create_time`: Sort by the creation timestamp of the resource. - `update_time`: Sort by the last update timestamp of the resource. Supported directions are `asc` (ascending) and `desc` (descending). If unspecified, direction defaults to `asc`. Only sorting by a single field is supported. |
| `pageSize` | integer (int32) | Optional. Requested page size. Server may return fewer items than requested. If unspecified, server will pick an appropriate default. |
| `pageToken` | string | Optional. A token identifying a page of results the server should return. |
| `query` | string | Optional. Search query. This string filters resources in an AIP-160-like format. It has some limitations. You can only specify top level conjunctions or attribute level negations. Each restriction can only be used once except the attribute restriction. The available restrictions for Ranges are: - `resource_id`: The resource ID to search for within Ranges (only substring matching using the format `resource_id="*value*"` is supported). - `realm`: The Realm name to search in. - `ip_address`: The IP address to search for within Ranges. - `ip_version`: The IP version to filter by (e.g., "IPV4", "IPV6"). - `parent_range`: The parent Range of the Range to search for. - `attribute_text`: The attribute text to search for within Ranges. - `attribute`: The attribute key and value to filter by. The available restrictions for Realms are: - `ip_version`: The IP version to search for. - `management_type`: The management type of the Realm (e.g., "CNR", "USER"). Only one of attribute_text or multiple attribute filters can be specified. Examples: - `realm=test-realm` - `realm=test-realm AND ip_address=10.0.0.0` - `realm=test-realm AND ip_version=IPV6` - `realm=test-realm AND resource_id="*my-range*"` - `realm=test-realm AND attribute_text=test` - `ip_address=10.0.0.0 AND attribute:(key1=value1) AND attribute:(key2=value2)` - `attribute_text=test AND parent_range=projects/123/locations/global/discoveredRanges/test-parent-range` - `management_type=CNR` |
| `searchResourceTypes` | array<string> | Optional. The type of resources to search for. If not specified, the server will return Ranges. |
| `showUtilization` | boolean | Optional. Whether to show the utilization of the Ranges in the response. |

### `SearchIpResourcesResponse`

- Response message for the CloudNumberRegistry.SearchIpResources method.
- Version: v1alpha

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | A token identifying a page of results the server should return. |
| `ranges` | array<Range> | Deprecated: Use results field instead. The list of Ranges matching the search query. |
| `results` | array<SearchIpResourcesResult> | The list of results matching the search query. |
| `unreachable` | array<string> | Locations that could not be reached. |

### `SearchIpResourcesResult`

- A result matching the search query, which can be either a Range or a Realm.
- Version: v1alpha

| Field | Type | Description |
|---|---|---|
| `range` | Range | A Range matching the search query. |
| `realm` | Realm | A Realm matching the search query. |

### `ShowCustomRangeUtilizationResponse`

- Response message for the CloudNumberRegistry.ShowCustomRangeUtilization method.
- Version: v1alpha

| Field | Type | Description |
|---|---|---|
| `customRange` | CustomRange | The CustomRange resource. |
| `rangeUtilization` | RangeUtilization | The utilization details of the CustomRange. |

### `ShowDiscoveredRangeUtilizationResponse`

- Response message for the CloudNumberRegistry.ShowDiscoveredRangeUtilization method.
- Version: v1alpha

| Field | Type | Description |
|---|---|---|
| `discoveredRange` | DiscoveredRange | The DiscoveredRange resource. |
| `rangeUtilization` | RangeUtilization | The utilization details of the DiscoveredRange. |

### `Status`

- The `Status` type defines a logical error model that is suitable for different programming environments, including REST APIs and RPC APIs. It is used by gRPC (https://github.com/grpc). Each `Status` message contains three pieces of data: error code, error message, and error details. You can find out more about this error model and how to work with it in the API Design Guide (https://cloud.google.com/apis/design/errors).
- Version: v1alpha

| Field | Type | Description |
|---|---|---|
| `code` | integer (int32) | The status code, which should be an enum value of google.rpc.Code. |
| `details` | array<object> | A list of messages that carry the error details. There is a common set of message types for APIs to use. |
| `message` | string | A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client. |

### Shape of `AggregatedData`

Generated from the Discovery schema (not in the official docs); values show each field type:

```json
{
  "customRangesCount": "integer (int32)",
  "customRealmsCount": "integer (int32)",
  "discoveredRangesCount": "integer (int32)",
  "discoveredRealmsCount": "integer (int32)",
  "uniqueScopesCount": "integer (int32)"
}
```

## Notes

- Generated from the Discovery document(s) of `cloudnumberregistry` (retrieved 2026-11-14); a type shared by several versions shows the preferred version.
- Source: https://cloudnumberregistry.googleapis.com/$discovery/rest?version=v1alpha (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
