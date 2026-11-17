---
source: https://networkconnectivity.googleapis.com/$discovery/rest?version=v1
---

# Network Connectivity API REST API (networkconnectivity)

## Signature / Usage

Base URL: `https://networkconnectivity.googleapis.com`. Methods are listed by `id`; the `Versions` line shows which API versions define the method (preferred: v1).

### `networkconnectivity.projects.locations.automatedDnsRecords.create`

- Versions: v1
- `POST https://networkconnectivity.googleapis.com/v1/{+parent}/automatedDnsRecords`
- Creates a new AutomatedDnsRecord in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `AutomatedDnsRecord`; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource's name of the AutomatedDnsRecord. ex. projects/123/locations/us-east1 |
| `automatedDnsRecordId` | query | string | no | Optional. Resource ID (i.e. 'foo' in '\[...\]/projects/p/locations/l/automatedDnsRecords/foo') See https://google.aip.dev/122#resource-id-segments Unique per location. If one is not provided, one will be generated. |
| `insertMode` | query | string enum | no | Optional. The insert mode when creating AutomatedDnsRecord. Values: `INSERT_MODE_UNSPECIFIED`, `FAIL_IF_EXISTS`, `OVERWRITE`. |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `networkconnectivity.projects.locations.automatedDnsRecords.delete`

- Versions: v1
- `DELETE https://networkconnectivity.googleapis.com/v1/{+name}`
- Deletes a single AutomatedDnsRecord.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the AutomatedDnsRecord to delete. |
| `deleteMode` | query | string enum | no | Optional. Delete mode when deleting AutomatedDnsRecord. If set to DEPROGRAM, the record will be deprogrammed in Cloud DNS. If set to SKIP_DEPROGRAMMING, the record will not be deprogrammed in Cloud DNS. Values: `DELETE_MODE_UNSPECIFIED`, `DEPROGRAM`, `SKIP_DEPROGRAMMING`. |
| `etag` | query | string | no | Optional. The etag is computed by the server, and may be sent on update and delete requests to ensure the client has an up-to-date value before proceeding. |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `networkconnectivity.projects.locations.automatedDnsRecords.get`

- Versions: v1
- `GET https://networkconnectivity.googleapis.com/v1/{+name}`
- Gets details of a single AutomatedDnsRecord.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `AutomatedDnsRecord`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the AutomatedDnsRecord to get. Format: projects/{project}/locations/{location}/automatedDnsRecords/{automated_dns_record} |

### `networkconnectivity.projects.locations.automatedDnsRecords.list`

- Versions: v1
- `GET https://networkconnectivity.googleapis.com/v1/{+parent}/automatedDnsRecords`
- Lists AutomatedDnsRecords in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListAutomatedDnsRecordsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource's name. ex. projects/123/locations/us-east1 |
| `filter` | query | string | no | A filter expression that filters the results listed in the response. |
| `orderBy` | query | string | no | Sort the results by a certain order. |
| `pageSize` | query | integer (int32) | no | The maximum number of results per page that should be returned. |
| `pageToken` | query | string | no | The page token. |

### `networkconnectivity.projects.locations.checkConsumerConfig`

- Versions: v1
- `POST https://networkconnectivity.googleapis.com/v1/{+location}:checkConsumerConfig`
- CheckConsumerConfig validates the consumer network and project for potential PSC connection creation. This method performs several checks, including: - Validating the existence and permissions of the service class. - Ensuring the consumer network exists and is accessible. - Verifying XPN relationships if applicable. - Checking for compatible IP versions between the consumer network and the requested version. This method performs a dynamic IAM check for the `networkconnectivity.serviceClasses.use` permission on the service class resource in the Prepare phase.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `CheckConsumerConfigRequest`; Response: `CheckConsumerConfigResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `location` | path | string | yes | Required. The location resource path. Example: - projects/{project}/locations/{location} |

### `networkconnectivity.projects.locations.get`

- Versions: v1, v1alpha1
- `GET https://networkconnectivity.googleapis.com/v1/{+name}`
- Gets information about a location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Location`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Resource name for the location. |

### `networkconnectivity.projects.locations.global.hubs.acceptSpoke`

- Versions: v1
- `POST https://networkconnectivity.googleapis.com/v1/{+name}:acceptSpoke`
- Accepts a proposal to attach a Network Connectivity Center spoke to a hub.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `AcceptHubSpokeRequest`; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the hub into which to accept the spoke. |

### `networkconnectivity.projects.locations.global.hubs.acceptSpokeUpdate`

- Versions: v1
- `POST https://networkconnectivity.googleapis.com/v1/{+name}:acceptSpokeUpdate`
- Accepts a proposal to update a Network Connectivity Center spoke in a hub.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `AcceptSpokeUpdateRequest`; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the hub to accept spoke update. |

### `networkconnectivity.projects.locations.global.hubs.create`

- Versions: v1, v1alpha1
- `POST https://networkconnectivity.googleapis.com/v1/{+parent}/hubs`
- Creates a new Network Connectivity Center hub in the specified project.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Hub`; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource. |
| `hubId` | query | string | yes | Required. A unique identifier for the hub. |
| `requestId` | query | string | no | Optional. A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server knows to ignore the request if it has already been completed. The server guarantees that a request doesn't result in creation of duplicate commitments for at least 60 minutes. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check to see whether the original operation was received. If it was, the server ignores the second request. This behavior prevents clients from mistakenly creating duplicate commitments. The request ID must be a valid UUID, with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `networkconnectivity.projects.locations.global.hubs.delete`

- Versions: v1, v1alpha1
- `DELETE https://networkconnectivity.googleapis.com/v1/{+name}`
- Deletes a Network Connectivity Center hub.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the hub to delete. |
| `requestId` | query | string | no | Optional. A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server knows to ignore the request if it has already been completed. The server guarantees that a request doesn't result in creation of duplicate commitments for at least 60 minutes. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check to see whether the original operation was received. If it was, the server ignores the second request. This behavior prevents clients from mistakenly creating duplicate commitments. The request ID must be a valid UUID, with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `networkconnectivity.projects.locations.global.hubs.get`

- Versions: v1, v1alpha1
- `GET https://networkconnectivity.googleapis.com/v1/{+name}`
- Gets details about a Network Connectivity Center hub.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Hub`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the hub resource to get. |

### `networkconnectivity.projects.locations.global.hubs.getIamPolicy`

- Versions: v1, v1alpha1
- `GET https://networkconnectivity.googleapis.com/v1/{+resource}:getIamPolicy`
- Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |
| `options.requestedPolicyVersion` | query | integer (int32) | no | Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |

### `networkconnectivity.projects.locations.global.hubs.groups.get`

- Versions: v1
- `GET https://networkconnectivity.googleapis.com/v1/{+name}`
- Gets details about a Network Connectivity Center group.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Group`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the route table resource. |

### `networkconnectivity.projects.locations.global.hubs.groups.getIamPolicy`

- Versions: v1
- `GET https://networkconnectivity.googleapis.com/v1/{+resource}:getIamPolicy`
- Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |
| `options.requestedPolicyVersion` | query | integer (int32) | no | Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |

### `networkconnectivity.projects.locations.global.hubs.groups.list`

- Versions: v1
- `GET https://networkconnectivity.googleapis.com/v1/{+parent}/groups`
- Lists groups in a given hub.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListGroupsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource's name. |
| `filter` | query | string | no | An expression that filters the list of results. |
| `orderBy` | query | string | no | Sort the results by a certain order. |
| `pageSize` | query | integer (int32) | no | The maximum number of results to return per page. |
| `pageToken` | query | string | no | The page token. |

### `networkconnectivity.projects.locations.global.hubs.groups.patch`

- Versions: v1
- `PATCH https://networkconnectivity.googleapis.com/v1/{+name}`
- Updates the parameters of a Network Connectivity Center group.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Group`; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Immutable. The name of the group. Group names must be unique. They use the following form: `projects/{project_number}/locations/global/hubs/{hub}/groups/{group_id}` |
| `requestId` | query | string | no | Optional. A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server knows to ignore the request if it has already been completed. The server guarantees that a request doesn't result in creation of duplicate commitments for at least 60 minutes. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check to see whether the original operation was received. If it was, the server ignores the second request. This behavior prevents clients from mistakenly creating duplicate commitments. The request ID must be a valid UUID, with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `updateMask` | query | string (google-fieldmask) | no | Optional. In the case of an update to an existing group, field mask is used to specify the fields to be overwritten. The fields specified in the update_mask are relative to the resource, not the full request. A field is overwritten if it is in the mask. If the user does not provide a mask, then all fields are overwritten. |

### `networkconnectivity.projects.locations.global.hubs.groups.setIamPolicy`

- Versions: v1
- `POST https://networkconnectivity.googleapis.com/v1/{+resource}:setIamPolicy`
- Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `SetIamPolicyRequest`; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `networkconnectivity.projects.locations.global.hubs.groups.testIamPermissions`

- Versions: v1
- `POST https://networkconnectivity.googleapis.com/v1/{+resource}:testIamPermissions`
- Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `TestIamPermissionsRequest`; Response: `TestIamPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `networkconnectivity.projects.locations.global.hubs.list`

- Versions: v1, v1alpha1
- `GET https://networkconnectivity.googleapis.com/v1/{+parent}/hubs`
- Lists the Network Connectivity Center hubs associated with a given project.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListHubsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource's name. |
| `filter` | query | string | no | An expression that filters the list of results. |
| `orderBy` | query | string | no | Sort the results by a certain order. |
| `pageSize` | query | integer (int32) | no | The maximum number of results per page to return. |
| `pageToken` | query | string | no | The page token. |

### `networkconnectivity.projects.locations.global.hubs.listSpokes`

- Versions: v1
- `GET https://networkconnectivity.googleapis.com/v1/{+name}:listSpokes`
- Lists the Network Connectivity Center spokes associated with a specified hub and location. The list includes both spokes that are attached to the hub and spokes that have been proposed but not yet accepted.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListHubSpokesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the hub. |
| `filter` | query | string | no | An expression that filters the list of results. |
| `orderBy` | query | string | no | Sort the results by name or create_time. |
| `pageSize` | query | integer (int32) | no | The maximum number of results to return per page. |
| `pageToken` | query | string | no | The page token. |
| `spokeLocations` | query | repeated string | no | A list of locations. Specify one of the following: `[global]`, a single region (for example, `[us-central1]`), or a combination of values (for example, `[global, us-central1, us-west1]`). If the spoke_locations field is populated, the list of results includes only spokes in the specified location. If the spoke_locations field is not populated, the list of results includes spokes in all locations. |
| `view` | query | string enum | no | The view of the spoke to return. The view that you use determines which spoke fields are included in the response. Values: `SPOKE_VIEW_UNSPECIFIED`, `BASIC`, `DETAILED`. |

### `networkconnectivity.projects.locations.global.hubs.patch`

- Versions: v1, v1alpha1
- `PATCH https://networkconnectivity.googleapis.com/v1/{+name}`
- Updates the description and/or labels of a Network Connectivity Center hub.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Hub`; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Immutable. The name of the hub. Hub names must be unique. They use the following form: `projects/{project_number}/locations/global/hubs/{hub_id}` |
| `requestId` | query | string | no | Optional. A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server knows to ignore the request if it has already been completed. The server guarantees that a request doesn't result in creation of duplicate commitments for at least 60 minutes. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check to see whether the original operation was received. If it was, the server ignores the second request. This behavior prevents clients from mistakenly creating duplicate commitments. The request ID must be a valid UUID, with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `updateMask` | query | string (google-fieldmask) | no | Optional. In the case of an update to an existing hub, field mask is used to specify the fields to be overwritten. The fields specified in the update_mask are relative to the resource, not the full request. A field is overwritten if it is in the mask. If the user does not provide a mask, then all fields are overwritten. |

### `networkconnectivity.projects.locations.global.hubs.queryStatus`

- Versions: v1
- `GET https://networkconnectivity.googleapis.com/v1/{+name}:queryStatus`
- Query the Private Service Connect propagation status of a Network Connectivity Center hub.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `QueryHubStatusResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the hub. |
| `filter` | query | string | no | Optional. An expression that filters the list of results. The filter can be used to filter the results by the following fields: \* `psc_propagation_status.source_spoke` \* `psc_propagation_status.source_group` \* `psc_propagation_status.source_forwarding_rule` \* `psc_propagation_status.target_spoke` \* `psc_propagation_status.target_group` \* `psc_propagation_status.code` \* `psc_propagation_status.message` |
| `groupBy` | query | string | no | Optional. Aggregate the results by the specified fields. A comma-separated list of any of these fields: \* `psc_propagation_status.source_spoke` \* `psc_propagation_status.source_group` \* `psc_propagation_status.source_forwarding_rule` \* `psc_propagation_status.target_spoke` \* `psc_propagation_status.target_group` \* `psc_propagation_status.code` |
| `orderBy` | query | string | no | Optional. Sort the results in ascending order by the specified fields. A comma-separated list of any of these fields: \* `psc_propagation_status.source_spoke` \* `psc_propagation_status.source_group` \* `psc_propagation_status.source_forwarding_rule` \* `psc_propagation_status.target_spoke` \* `psc_propagation_status.target_group` \* `psc_propagation_status.code` If `group_by` is set, the value of the `order_by` field must be the same as or a subset of the `group_by` field. |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of results to return per page. |
| `pageToken` | query | string | no | Optional. The page token. |

### `networkconnectivity.projects.locations.global.hubs.rejectSpoke`

- Versions: v1
- `POST https://networkconnectivity.googleapis.com/v1/{+name}:rejectSpoke`
- Rejects a Network Connectivity Center spoke from being attached to a hub. If the spoke was previously in the `ACTIVE` state, it transitions to the `INACTIVE` state and is no longer able to connect to other spokes that are attached to the hub.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `RejectHubSpokeRequest`; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the hub from which to reject the spoke. |

### `networkconnectivity.projects.locations.global.hubs.rejectSpokeUpdate`

- Versions: v1
- `POST https://networkconnectivity.googleapis.com/v1/{+name}:rejectSpokeUpdate`
- Rejects a proposal to update a Network Connectivity Center spoke in a hub.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `RejectSpokeUpdateRequest`; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the hub to reject spoke update. |

### `networkconnectivity.projects.locations.global.hubs.routeTables.get`

- Versions: v1
- `GET https://networkconnectivity.googleapis.com/v1/{+name}`
- Gets details about a Network Connectivity Center route table.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `RouteTable`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the route table resource. |

### `networkconnectivity.projects.locations.global.hubs.routeTables.list`

- Versions: v1
- `GET https://networkconnectivity.googleapis.com/v1/{+parent}/routeTables`
- Lists route tables in a given hub.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListRouteTablesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource's name. |
| `filter` | query | string | no | An expression that filters the list of results. |
| `orderBy` | query | string | no | Sort the results by a certain order. |
| `pageSize` | query | integer (int32) | no | The maximum number of results to return per page. |
| `pageToken` | query | string | no | The page token. |

### `networkconnectivity.projects.locations.global.hubs.routeTables.routes.get`

- Versions: v1
- `GET https://networkconnectivity.googleapis.com/v1/{+name}`
- Gets details about the specified route.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Route`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the route resource. |

### `networkconnectivity.projects.locations.global.hubs.routeTables.routes.list`

- Versions: v1
- `GET https://networkconnectivity.googleapis.com/v1/{+parent}/routes`
- Lists routes in a given route table.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListRoutesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource's name. |
| `filter` | query | string | no | An expression that filters the list of results. |
| `orderBy` | query | string | no | Sort the results by a certain order. |
| `pageSize` | query | integer (int32) | no | The maximum number of results to return per page. |
| `pageToken` | query | string | no | The page token. |

### `networkconnectivity.projects.locations.global.hubs.setIamPolicy`

- Versions: v1, v1alpha1
- `POST https://networkconnectivity.googleapis.com/v1/{+resource}:setIamPolicy`
- Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `SetIamPolicyRequest`; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `networkconnectivity.projects.locations.global.hubs.testIamPermissions`

- Versions: v1, v1alpha1
- `POST https://networkconnectivity.googleapis.com/v1/{+resource}:testIamPermissions`
- Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `TestIamPermissionsRequest`; Response: `TestIamPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `networkconnectivity.projects.locations.global.policyBasedRoutes.create`

- Versions: v1
- `POST https://networkconnectivity.googleapis.com/v1/{+parent}/policyBasedRoutes`
- Creates a new policy-based route in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `PolicyBasedRoute`; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource's name of the PolicyBasedRoute. |
| `policyBasedRouteId` | query | string | yes | Required. Unique id for the policy-based route to create. Provided by the client when the resource is created. The name must comply with https://google.aip.dev/122#resource-id-segments. Specifically, the name must be 1-63 characters long and match the regular expression \[a-z\](\[a-z0-9-\]\*\[a-z0-9\])?. The first character must be a lowercase letter, and all following characters (except for the last character) must be a dash, lowercase letter, or digit. The last character must be a lowercase letter or digit. |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server knows to ignore the request if it has already been completed. The server guarantees that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, ignores the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `networkconnectivity.projects.locations.global.policyBasedRoutes.delete`

- Versions: v1
- `DELETE https://networkconnectivity.googleapis.com/v1/{+name}`
- Deletes a single policy-based route.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the policy-based route resource to delete. |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server knows to ignore the request if it has already been completed. The server guarantees that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, ignores the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `networkconnectivity.projects.locations.global.policyBasedRoutes.get`

- Versions: v1
- `GET https://networkconnectivity.googleapis.com/v1/{+name}`
- Gets details of a single policy-based route.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `PolicyBasedRoute`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the PolicyBasedRoute resource to get. |

### `networkconnectivity.projects.locations.global.policyBasedRoutes.getIamPolicy`

- Versions: v1
- `GET https://networkconnectivity.googleapis.com/v1/{+resource}:getIamPolicy`
- Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |
| `options.requestedPolicyVersion` | query | integer (int32) | no | Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |

### `networkconnectivity.projects.locations.global.policyBasedRoutes.list`

- Versions: v1
- `GET https://networkconnectivity.googleapis.com/v1/{+parent}/policyBasedRoutes`
- Lists policy-based routes in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListPolicyBasedRoutesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource's name. |
| `filter` | query | string | no | A filter expression that filters the results listed in the response. |
| `orderBy` | query | string | no | Sort the results by a certain order. |
| `pageSize` | query | integer (int32) | no | The maximum number of results per page that should be returned. |
| `pageToken` | query | string | no | The page token. |

### `networkconnectivity.projects.locations.global.policyBasedRoutes.setIamPolicy`

- Versions: v1
- `POST https://networkconnectivity.googleapis.com/v1/{+resource}:setIamPolicy`
- Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `SetIamPolicyRequest`; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `networkconnectivity.projects.locations.global.policyBasedRoutes.testIamPermissions`

- Versions: v1
- `POST https://networkconnectivity.googleapis.com/v1/{+resource}:testIamPermissions`
- Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `TestIamPermissionsRequest`; Response: `TestIamPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `networkconnectivity.projects.locations.internalRanges.create`

- Versions: v1, v1alpha1
- `POST https://networkconnectivity.googleapis.com/v1/{+parent}/internalRanges`
- Creates a new internal range in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `InternalRange`; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource's name of the internal range. |
| `internalRangeId` | query | string | no | Optional. Resource ID (i.e. 'foo' in '\[...\]/projects/p/locations/l/internalRanges/foo') See https://google.aip.dev/122#resource-id-segments Unique per location. |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `networkconnectivity.projects.locations.internalRanges.delete`

- Versions: v1, v1alpha1
- `DELETE https://networkconnectivity.googleapis.com/v1/{+name}`
- Deletes a single internal range.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the internal range to delete. |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `networkconnectivity.projects.locations.internalRanges.get`

- Versions: v1, v1alpha1
- `GET https://networkconnectivity.googleapis.com/v1/{+name}`
- Gets details of a single internal range.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `InternalRange`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the InternalRange to get. |

### `networkconnectivity.projects.locations.internalRanges.getIamPolicy`

- Versions: v1, v1alpha1
- `GET https://networkconnectivity.googleapis.com/v1/{+resource}:getIamPolicy`
- Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |
| `options.requestedPolicyVersion` | query | integer (int32) | no | Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |

### `networkconnectivity.projects.locations.internalRanges.list`

- Versions: v1, v1alpha1
- `GET https://networkconnectivity.googleapis.com/v1/{+parent}/internalRanges`
- Lists internal ranges in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListInternalRangesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource's name. |
| `filter` | query | string | no | A filter expression that filters the results listed in the response. |
| `orderBy` | query | string | no | Sort the results by a certain order. |
| `pageSize` | query | integer (int32) | no | The maximum number of results per page that should be returned. |
| `pageToken` | query | string | no | The page token. |

### `networkconnectivity.projects.locations.internalRanges.patch`

- Versions: v1, v1alpha1
- `PATCH https://networkconnectivity.googleapis.com/v1/{+name}`
- Updates the parameters of a single internal range.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `InternalRange`; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. The name of an internal range. Format: projects/{project}/locations/{location}/internalRanges/{internal_range} See: https://google.aip.dev/122#fields-representing-resource-names |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `updateMask` | query | string (google-fieldmask) | no | Optional. Field mask is used to specify the fields to be overwritten in the InternalRange resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it is in the mask. If the user does not provide a mask then all fields will be overwritten. |

### `networkconnectivity.projects.locations.internalRanges.setIamPolicy`

- Versions: v1, v1alpha1
- `POST https://networkconnectivity.googleapis.com/v1/{+resource}:setIamPolicy`
- Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `SetIamPolicyRequest`; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `networkconnectivity.projects.locations.internalRanges.testIamPermissions`

- Versions: v1, v1alpha1
- `POST https://networkconnectivity.googleapis.com/v1/{+resource}:testIamPermissions`
- Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `TestIamPermissionsRequest`; Response: `TestIamPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `networkconnectivity.projects.locations.list`

- Versions: v1, v1alpha1
- `GET https://networkconnectivity.googleapis.com/v1/{+name}/locations`
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

### `networkconnectivity.projects.locations.multicloudDataTransferConfigs.create`

- Versions: v1
- `POST https://networkconnectivity.googleapis.com/v1/{+parent}/multicloudDataTransferConfigs`
- Creates a `MulticloudDataTransferConfig` resource in a specified project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `MulticloudDataTransferConfig`; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The name of the parent resource. |
| `multicloudDataTransferConfigId` | query | string | yes | Required. The ID to use for the `MulticloudDataTransferConfig` resource, which becomes the final component of the `MulticloudDataTransferConfig` resource name. |
| `requestId` | query | string | no | Optional. A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server can ignore the request if it has already been completed. The server waits for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, can ignore the second request. This prevents clients from accidentally creating duplicate `MulticloudDataTransferConfig` resources. The request ID must be a valid UUID with the exception that zero UUID (00000000-0000-0000-0000-000000000000) isn't supported. |

### `networkconnectivity.projects.locations.multicloudDataTransferConfigs.delete`

- Versions: v1
- `DELETE https://networkconnectivity.googleapis.com/v1/{+name}`
- Deletes a `MulticloudDataTransferConfig` resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the `MulticloudDataTransferConfig` resource to delete. |
| `etag` | query | string | no | Optional. The etag is computed by the server, and might be sent with update and delete requests so that the client has an up-to-date value before proceeding. |
| `requestId` | query | string | no | Optional. A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server can ignore the request if it has already been completed. The server waits for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, can ignore the second request. This prevents clients from accidentally creating duplicate `MulticloudDataTransferConfig` resources. The request ID must be a valid UUID with the exception that zero UUID (00000000-0000-0000-0000-000000000000) isn't supported. |

### `networkconnectivity.projects.locations.multicloudDataTransferConfigs.destinations.create`

- Versions: v1
- `POST https://networkconnectivity.googleapis.com/v1/{+parent}/destinations`
- Creates a `Destination` resource in a specified project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Destination`; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The name of the parent resource. |
| `destinationId` | query | string | yes | Required. The ID to use for the `Destination` resource, which becomes the final component of the `Destination` resource name. |
| `requestId` | query | string | no | Optional. A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server can ignore the request if it has already been completed. The server waits for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, can ignore the second request. This prevents clients from accidentally creating duplicate `Destination` resources. The request ID must be a valid UUID with the exception that zero UUID (00000000-0000-0000-0000-000000000000) isn't supported. |

### `networkconnectivity.projects.locations.multicloudDataTransferConfigs.destinations.delete`

- Versions: v1
- `DELETE https://networkconnectivity.googleapis.com/v1/{+name}`
- Deletes a `Destination` resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the `Destination` resource to delete. |
| `etag` | query | string | no | Optional. The etag is computed by the server, and might be sent with update and delete requests so that the client has an up-to-date value before proceeding. |
| `requestId` | query | string | no | Optional. A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server can ignore the request if it has already been completed. The server waits for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, can ignore the second request. The request ID must be a valid UUID with the exception that zero UUID (00000000-0000-0000-0000-000000000000) isn't supported. |

### `networkconnectivity.projects.locations.multicloudDataTransferConfigs.destinations.get`

- Versions: v1
- `GET https://networkconnectivity.googleapis.com/v1/{+name}`
- Gets the details of a `Destination` resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Destination`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the `Destination` resource to get. |

### `networkconnectivity.projects.locations.multicloudDataTransferConfigs.destinations.list`

- Versions: v1
- `GET https://networkconnectivity.googleapis.com/v1/{+parent}/destinations`
- Lists the `Destination` resources in a specified project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListDestinationsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The name of the parent resource. |
| `filter` | query | string | no | Optional. An expression that filters the results listed in the response. |
| `orderBy` | query | string | no | Optional. The sort order of the results. |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of results listed per page. |
| `pageToken` | query | string | no | Optional. The page token. |
| `returnPartialSuccess` | query | boolean | no | Optional. If `true`, allow partial responses for multi-regional aggregated list requests. |

### `networkconnectivity.projects.locations.multicloudDataTransferConfigs.destinations.patch`

- Versions: v1
- `PATCH https://networkconnectivity.googleapis.com/v1/{+name}`
- Updates a `Destination` resource in a specified project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Destination`; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. The name of the `Destination` resource. Format: `projects/{project}/locations/{location}/multicloudDataTransferConfigs/{multicloud_data_transfer_config}/destinations/{destination}`. |
| `requestId` | query | string | no | Optional. A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server can ignore the request if it has already been completed. The server waits for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, can ignore the second request. The request ID must be a valid UUID with the exception that zero UUID (00000000-0000-0000-0000-000000000000) isn't supported. |
| `updateMask` | query | string (google-fieldmask) | no | Optional. `FieldMask is used to specify the fields to be overwritten in the `Destination` resource by the update. The fields specified in `update_mask\` are relative to the resource, not the full request. A field is overwritten if it is in the mask. If you don't specify a mask, all fields are overwritten. |

### `networkconnectivity.projects.locations.multicloudDataTransferConfigs.get`

- Versions: v1
- `GET https://networkconnectivity.googleapis.com/v1/{+name}`
- Gets the details of a `MulticloudDataTransferConfig` resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `MulticloudDataTransferConfig`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the `MulticloudDataTransferConfig` resource to get. |

### `networkconnectivity.projects.locations.multicloudDataTransferConfigs.list`

- Versions: v1
- `GET https://networkconnectivity.googleapis.com/v1/{+parent}/multicloudDataTransferConfigs`
- Lists the `MulticloudDataTransferConfig` resources in a specified project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListMulticloudDataTransferConfigsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The name of the parent resource. |
| `filter` | query | string | no | Optional. An expression that filters the results listed in the response. |
| `orderBy` | query | string | no | Optional. The sort order of the results. |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of results listed per page. |
| `pageToken` | query | string | no | Optional. The page token. |
| `returnPartialSuccess` | query | boolean | no | Optional. If `true`, allows partial responses for multi-regional aggregated list requests. |

### `networkconnectivity.projects.locations.multicloudDataTransferConfigs.patch`

- Versions: v1
- `PATCH https://networkconnectivity.googleapis.com/v1/{+name}`
- Updates a `MulticloudDataTransferConfig` resource in a specified project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `MulticloudDataTransferConfig`; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. The name of the `MulticloudDataTransferConfig` resource. Format: `projects/{project}/locations/{location}/multicloudDataTransferConfigs/{multicloud_data_transfer_config}`. |
| `requestId` | query | string | no | Optional. A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server can ignore the request if it has already been completed. The server waits for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, can ignore the second request. This prevents clients from accidentally creating duplicate `MulticloudDataTransferConfig` resources. The request ID must be a valid UUID with the exception that zero UUID (00000000-0000-0000-0000-000000000000) isn't supported. |
| `updateMask` | query | string (google-fieldmask) | no | Optional. `FieldMask` is used to specify the fields in the `MulticloudDataTransferConfig` resource to be overwritten by the update. The fields specified in `update_mask` are relative to the resource, not the full request. A field is overwritten if it is in the mask. If you don't specify a mask, all fields are overwritten. |

### `networkconnectivity.projects.locations.multicloudDataTransferSupportedServices.get`

- Versions: v1
- `GET https://networkconnectivity.googleapis.com/v1/{+name}`
- Gets the details of a service that is supported for Data Transfer Essentials.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `MulticloudDataTransferSupportedService`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the service. |

### `networkconnectivity.projects.locations.multicloudDataTransferSupportedServices.list`

- Versions: v1
- `GET https://networkconnectivity.googleapis.com/v1/{+parent}/multicloudDataTransferSupportedServices`
- Lists the services in the project for a region that are supported for Data Transfer Essentials.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListMulticloudDataTransferSupportedServicesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The name of the parent resource. |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of results listed per page. |
| `pageToken` | query | string | no | Optional. The page token. |

### `networkconnectivity.projects.locations.operations.cancel`

- Versions: v1, v1alpha1
- `POST https://networkconnectivity.googleapis.com/v1/{+name}:cancel`
- Starts asynchronous cancellation on a long-running operation. The server makes a best effort to cancel the operation, but success is not guaranteed. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. Clients can use Operations.GetOperation or other methods to check whether the cancellation succeeded or whether the operation completed despite cancellation. On successful cancellation, the operation is not deleted; instead, it becomes an operation with an Operation.error value with a google.rpc.Status.code of `1`, corresponding to `Code.CANCELLED`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleLongrunningCancelOperationRequest`; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource to be cancelled. |

### `networkconnectivity.projects.locations.operations.delete`

- Versions: v1, v1alpha1
- `DELETE https://networkconnectivity.googleapis.com/v1/{+name}`
- Deletes a long-running operation. This method indicates that the client is no longer interested in the operation result. It does not cancel the operation. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource to be deleted. |

### `networkconnectivity.projects.locations.operations.get`

- Versions: v1, v1alpha1
- `GET https://networkconnectivity.googleapis.com/v1/{+name}`
- Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource. |

### `networkconnectivity.projects.locations.operations.list`

- Versions: v1, v1alpha1
- `GET https://networkconnectivity.googleapis.com/v1/{+name}/operations`
- Lists operations that match the specified filter in the request. If the server doesn't support this method, it returns `UNIMPLEMENTED`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleLongrunningListOperationsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation's parent resource. |
| `filter` | query | string | no | The standard list filter. |
| `pageSize` | query | integer (int32) | no | The standard list page size. |
| `pageToken` | query | string | no | The standard list page token. |
| `returnPartialSuccess` | query | boolean | no | When set to `true`, operations that are reachable are returned as normal, and those that are unreachable are returned in the ListOperationsResponse.unreachable field. This can only be `true` when reading across collections. For example, when `parent` is set to `"projects/example/locations/-"`. This field is not supported by default and will result in an `UNIMPLEMENTED` error if set unless explicitly documented otherwise in service or product specific documentation. |

### `networkconnectivity.projects.locations.pscAuthorizationPolicies.create`

- Versions: v1
- `POST https://networkconnectivity.googleapis.com/v1/{+parent}/pscAuthorizationPolicies`
- Creates a new PscAuthorizationPolicy in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `PscAuthorizationPolicy`; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource's name of the PscAuthorizationPolicy. |
| `pscAuthorizationPolicyId` | query | string | yes | Required. Resource ID of the PscAuthorizationPolicy. |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. |

### `networkconnectivity.projects.locations.pscAuthorizationPolicies.delete`

- Versions: v1
- `DELETE https://networkconnectivity.googleapis.com/v1/{+name}`
- Deletes a single PscAuthorizationPolicy.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the PscAuthorizationPolicy to delete. |
| `etag` | query | string | no | Optional. The etag of the PscAuthorizationPolicy to delete. |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. |

### `networkconnectivity.projects.locations.pscAuthorizationPolicies.get`

- Versions: v1
- `GET https://networkconnectivity.googleapis.com/v1/{+name}`
- Gets details of a single PscAuthorizationPolicy.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `PscAuthorizationPolicy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the PscAuthorizationPolicy to get. |

### `networkconnectivity.projects.locations.pscAuthorizationPolicies.list`

- Versions: v1
- `GET https://networkconnectivity.googleapis.com/v1/{+parent}/pscAuthorizationPolicies`
- Lists PscAuthorizationPolicies in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListPscAuthorizationPoliciesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource's name. |
| `filter` | query | string | no | Optional. Filter expression to restrict the results. |
| `orderBy` | query | string | no | Optional. Sort order of the results. |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of PscAuthorizationPolicies to return in a single page. The service may return fewer than this value. If unspecified, at most 50 PscAuthorizationPolicies will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. |
| `pageToken` | query | string | no | Optional. A page token, received from a previous `ListPscAuthorizationPolicies` call. |

### `networkconnectivity.projects.locations.regionalEndpoints.create`

- Versions: v1
- `POST https://networkconnectivity.googleapis.com/v1/{+parent}/regionalEndpoints`
- Creates a new RegionalEndpoint in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `RegionalEndpoint`; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource's name of the RegionalEndpoint. |
| `regionalEndpointId` | query | string | yes | Required. Unique id of the Regional Endpoint to be created. @pattern: ^\[-a-z0-9\](?:\[-a-z0-9\]{0,44})\[a-z0-9\]$ |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server knows to ignore the request if it has already been completed. The server guarantees that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if the original operation with the same request ID was received, and if so, ignores the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `networkconnectivity.projects.locations.regionalEndpoints.delete`

- Versions: v1
- `DELETE https://networkconnectivity.googleapis.com/v1/{+name}`
- Deletes a single RegionalEndpoint.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the RegionalEndpoint to delete. |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server knows to ignore the request if it has already been completed. The server guarantees that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if the original operation with the same request ID was received, and if so, ignores the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `networkconnectivity.projects.locations.regionalEndpoints.get`

- Versions: v1
- `GET https://networkconnectivity.googleapis.com/v1/{+name}`
- Gets details of a single RegionalEndpoint.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `RegionalEndpoint`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the RegionalEndpoint resource to get. Format: `projects/{project}/locations/{location}/regionalEndpoints/{regional_endpoint}` |

### `networkconnectivity.projects.locations.regionalEndpoints.list`

- Versions: v1
- `GET https://networkconnectivity.googleapis.com/v1/{+parent}/regionalEndpoints`
- Lists RegionalEndpoints in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListRegionalEndpointsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource's name of the RegionalEndpoint. |
| `filter` | query | string | no | A filter expression that filters the results listed in the response. |
| `orderBy` | query | string | no | Sort the results by a certain order. |
| `pageSize` | query | integer (int32) | no | Requested page size. Server may return fewer items than requested. If unspecified, server will pick an appropriate default. |
| `pageToken` | query | string | no | A page token. |

### `networkconnectivity.projects.locations.remoteTransportProfiles.get`

- Versions: v1
- `GET https://networkconnectivity.googleapis.com/v1/{+name}`
- Gets details of a single RemoteTransportProfile.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `RemoteTransportProfile`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the resource. |

### `networkconnectivity.projects.locations.remoteTransportProfiles.list`

- Versions: v1
- `GET https://networkconnectivity.googleapis.com/v1/{+parent}/remoteTransportProfiles`
- Lists RemoteTransportProfiles in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListRemoteTransportProfilesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Parent value for ListRemoteTransportProfilesRequest. |
| `filter` | query | string | no | Optional. Filtering results. |
| `orderBy` | query | string | no | Optional. Hint for how to order the results. |
| `pageSize` | query | integer (int32) | no | Optional. Requested page size. Server may return fewer items than requested. If unspecified, server will pick an appropriate default. |
| `pageToken` | query | string | no | Optional. A token identifying a page of results the server should return. |

### `networkconnectivity.projects.locations.serviceClasses.delete`

- Versions: v1
- `DELETE https://networkconnectivity.googleapis.com/v1/{+name}`
- Deletes a single ServiceClass.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the ServiceClass to delete. |
| `etag` | query | string | no | Optional. The etag is computed by the server, and may be sent on update and delete requests to ensure the client has an up-to-date value before proceeding. |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `networkconnectivity.projects.locations.serviceClasses.get`

- Versions: v1
- `GET https://networkconnectivity.googleapis.com/v1/{+name}`
- Gets details of a single ServiceClass.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ServiceClass`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the ServiceClass to get. |

### `networkconnectivity.projects.locations.serviceClasses.list`

- Versions: v1
- `GET https://networkconnectivity.googleapis.com/v1/{+parent}/serviceClasses`
- Lists ServiceClasses in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListServiceClassesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource's name. ex. projects/123/locations/us-east1 |
| `filter` | query | string | no | A filter expression that filters the results listed in the response. |
| `orderBy` | query | string | no | Sort the results by a certain order. |
| `pageSize` | query | integer (int32) | no | The maximum number of results per page that should be returned. |
| `pageToken` | query | string | no | The page token. |

### `networkconnectivity.projects.locations.serviceClasses.patch`

- Versions: v1
- `PATCH https://networkconnectivity.googleapis.com/v1/{+name}`
- Updates the parameters of a single ServiceClass.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `ServiceClass`; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Immutable. The name of a ServiceClass resource. Format: projects/{project}/locations/{location}/serviceClasses/{service_class} See: https://google.aip.dev/122#fields-representing-resource-names |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `updateMask` | query | string (google-fieldmask) | no | Optional. Field mask is used to specify the fields to be overwritten in the ServiceClass resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it is in the mask. If the user does not provide a mask then all fields will be overwritten. |

### `networkconnectivity.projects.locations.serviceConnectionMaps.create`

- Versions: v1
- `POST https://networkconnectivity.googleapis.com/v1/{+parent}/serviceConnectionMaps`
- Creates a new ServiceConnectionMap in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `ServiceConnectionMap`; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource's name of the ServiceConnectionMap. ex. projects/123/locations/us-east1 |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `serviceConnectionMapId` | query | string | no | Optional. Resource ID (i.e. 'foo' in '\[...\]/projects/p/locations/l/serviceConnectionMaps/foo') See https://google.aip.dev/122#resource-id-segments Unique per location. If one is not provided, one will be generated. |

### `networkconnectivity.projects.locations.serviceConnectionMaps.delete`

- Versions: v1
- `DELETE https://networkconnectivity.googleapis.com/v1/{+name}`
- Deletes a single ServiceConnectionMap.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the ServiceConnectionMap to delete. |
| `etag` | query | string | no | Optional. The etag is computed by the server, and may be sent on update and delete requests to ensure the client has an up-to-date value before proceeding. |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `networkconnectivity.projects.locations.serviceConnectionMaps.get`

- Versions: v1
- `GET https://networkconnectivity.googleapis.com/v1/{+name}`
- Gets details of a single ServiceConnectionMap.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ServiceConnectionMap`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the ServiceConnectionMap to get. |

### `networkconnectivity.projects.locations.serviceConnectionMaps.list`

- Versions: v1
- `GET https://networkconnectivity.googleapis.com/v1/{+parent}/serviceConnectionMaps`
- Lists ServiceConnectionMaps in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListServiceConnectionMapsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource's name. ex. projects/123/locations/us-east1 |
| `filter` | query | string | no | A filter expression that filters the results listed in the response. |
| `orderBy` | query | string | no | Sort the results by a certain order. |
| `pageSize` | query | integer (int32) | no | The maximum number of results per page that should be returned. |
| `pageToken` | query | string | no | The page token. |

### `networkconnectivity.projects.locations.serviceConnectionMaps.patch`

- Versions: v1
- `PATCH https://networkconnectivity.googleapis.com/v1/{+name}`
- Updates the parameters of a single ServiceConnectionMap.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `ServiceConnectionMap`; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Immutable. The name of a ServiceConnectionMap. Format: projects/{project}/locations/{location}/serviceConnectionMaps/{service_connection_map} See: https://google.aip.dev/122#fields-representing-resource-names |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `updateMask` | query | string (google-fieldmask) | no | Optional. Field mask is used to specify the fields to be overwritten in the ServiceConnectionMap resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it is in the mask. If the user does not provide a mask then all fields will be overwritten. |

### `networkconnectivity.projects.locations.serviceConnectionPolicies.create`

- Versions: v1
- `POST https://networkconnectivity.googleapis.com/v1/{+parent}/serviceConnectionPolicies`
- Creates a new ServiceConnectionPolicy in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `ServiceConnectionPolicy`; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource's name of the ServiceConnectionPolicy. ex. projects/123/locations/us-east1 |
| `autoSubnetworkConfig.allocRangeSpace` | query | repeated string | no | Optional. The space where we search for a free range to create a subnetwork. It can be narrow down or pick a different space. This is in standard CIDR format. If not specified, “10.0.0.0/8” is used. Only eligible for IPV4_ONLY and IPV4_IPV6 subnetwork. |
| `autoSubnetworkConfig.ipStack` | query | string enum | no | Optional. The requested IP stack for the subnetwork. If not specified, IPv4 is used. Values: `SUBNET_IP_STACK_UNSPECIFIED`, `IPV4_ONLY`, `IPV6_ONLY`, `IPV4_IPV6`. |
| `autoSubnetworkConfig.prefixLength` | query | integer (int32) | no | Optional. The desired prefix length for the subnet's IP address range. E.g., 24 for a /24. The actual range is allocated from available space. If not specified, 24 is used. Only eligible for IPV4_ONLY and IPV4_IPV6 subnetwork. |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `serviceConnectionPolicyId` | query | string | no | Optional. Resource ID (i.e. 'foo' in '\[...\]/projects/p/locations/l/serviceConnectionPolicies/foo') See https://google.aip.dev/122#resource-id-segments Unique per location. |
| `subnetworkMode` | query | string enum | no | Optional. If this field is not set, USER_PROVIDED is the inferred value to use. Values: `SUBNETWORK_MODE_UNSPECIFIED`, `USER_PROVIDED`, `AUTO_CREATED`. |

### `networkconnectivity.projects.locations.serviceConnectionPolicies.delete`

- Versions: v1
- `DELETE https://networkconnectivity.googleapis.com/v1/{+name}`
- Deletes a single ServiceConnectionPolicy.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the ServiceConnectionPolicy to delete. |
| `etag` | query | string | no | Optional. The etag is computed by the server, and may be sent on update and delete requests to ensure the client has an up-to-date value before proceeding. |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `networkconnectivity.projects.locations.serviceConnectionPolicies.get`

- Versions: v1
- `GET https://networkconnectivity.googleapis.com/v1/{+name}`
- Gets details of a single ServiceConnectionPolicy.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ServiceConnectionPolicy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the ServiceConnectionPolicy to get. |

### `networkconnectivity.projects.locations.serviceConnectionPolicies.list`

- Versions: v1
- `GET https://networkconnectivity.googleapis.com/v1/{+parent}/serviceConnectionPolicies`
- Lists ServiceConnectionPolicies in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListServiceConnectionPoliciesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource's name. ex. projects/123/locations/us-east1 |
| `filter` | query | string | no | A filter expression that filters the results listed in the response. |
| `orderBy` | query | string | no | Sort the results by a certain order. |
| `pageSize` | query | integer (int32) | no | The maximum number of results per page that should be returned. |
| `pageToken` | query | string | no | The page token. |

### `networkconnectivity.projects.locations.serviceConnectionPolicies.patch`

- Versions: v1
- `PATCH https://networkconnectivity.googleapis.com/v1/{+name}`
- Updates the parameters of a single ServiceConnectionPolicy.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `ServiceConnectionPolicy`; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Immutable. The name of a ServiceConnectionPolicy. Format: projects/{project}/locations/{location}/serviceConnectionPolicies/{service_connection_policy} See: https://google.aip.dev/122#fields-representing-resource-names |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `updateMask` | query | string (google-fieldmask) | no | Optional. Field mask is used to specify the fields to be overwritten in the ServiceConnectionPolicy resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it is in the mask. If the user does not provide a mask then all fields will be overwritten. |

### `networkconnectivity.projects.locations.serviceConnectionTokens.create`

- Versions: v1
- `POST https://networkconnectivity.googleapis.com/v1/{+parent}/serviceConnectionTokens`
- Creates a new ServiceConnectionToken in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `ServiceConnectionToken`; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource's name of the ServiceConnectionToken. ex. projects/123/locations/us-east1 |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `serviceConnectionTokenId` | query | string | no | Optional. Resource ID (i.e. 'foo' in '\[...\]/projects/p/locations/l/ServiceConnectionTokens/foo') See https://google.aip.dev/122#resource-id-segments Unique per location. If one is not provided, one will be generated. |

### `networkconnectivity.projects.locations.serviceConnectionTokens.delete`

- Versions: v1
- `DELETE https://networkconnectivity.googleapis.com/v1/{+name}`
- Deletes a single ServiceConnectionToken.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the ServiceConnectionToken to delete. |
| `etag` | query | string | no | Optional. The etag is computed by the server, and may be sent on update and delete requests to ensure the client has an up-to-date value before proceeding. |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `networkconnectivity.projects.locations.serviceConnectionTokens.get`

- Versions: v1
- `GET https://networkconnectivity.googleapis.com/v1/{+name}`
- Gets details of a single ServiceConnectionToken.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ServiceConnectionToken`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the ServiceConnectionToken to get. |

### `networkconnectivity.projects.locations.serviceConnectionTokens.list`

- Versions: v1
- `GET https://networkconnectivity.googleapis.com/v1/{+parent}/serviceConnectionTokens`
- Lists ServiceConnectionTokens in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListServiceConnectionTokensResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource's name. ex. projects/123/locations/us-east1 |
| `filter` | query | string | no | A filter expression that filters the results listed in the response. |
| `orderBy` | query | string | no | Sort the results by a certain order. |
| `pageSize` | query | integer (int32) | no | The maximum number of results per page that should be returned. |
| `pageToken` | query | string | no | The page token. |

### `networkconnectivity.projects.locations.spokes.create`

- Versions: v1, v1alpha1
- `POST https://networkconnectivity.googleapis.com/v1/{+parent}/spokes`
- Creates a Network Connectivity Center spoke.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Spoke`; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource. |
| `requestId` | query | string | no | Optional. A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server knows to ignore the request if it has already been completed. The server guarantees that a request doesn't result in creation of duplicate commitments for at least 60 minutes. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check to see whether the original operation was received. If it was, the server ignores the second request. This behavior prevents clients from mistakenly creating duplicate commitments. The request ID must be a valid UUID, with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `spokeId` | query | string | yes | Required. Unique id for the spoke to create. |

### `networkconnectivity.projects.locations.spokes.delete`

- Versions: v1, v1alpha1
- `DELETE https://networkconnectivity.googleapis.com/v1/{+name}`
- Deletes a Network Connectivity Center spoke.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the spoke to delete. |
| `requestId` | query | string | no | Optional. A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server knows to ignore the request if it has already been completed. The server guarantees that a request doesn't result in creation of duplicate commitments for at least 60 minutes. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check to see whether the original operation was received. If it was, the server ignores the second request. This behavior prevents clients from mistakenly creating duplicate commitments. The request ID must be a valid UUID, with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `networkconnectivity.projects.locations.spokes.gatewayAdvertisedRoutes.create`

- Versions: v1
- `POST https://networkconnectivity.googleapis.com/v1/{+parent}/gatewayAdvertisedRoutes`
- Create a GatewayAdvertisedRoute
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GatewayAdvertisedRoute`; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource. |
| `gatewayAdvertisedRouteId` | query | string | yes | Required. Unique id for the route to create. |
| `requestId` | query | string | no | Optional. A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server knows to ignore the request if it has already been completed. The server guarantees that a request doesn't result in creation of duplicate commitments for at least 60 minutes. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check to see whether the original operation was received. If it was, the server ignores the second request. This behavior prevents clients from mistakenly creating duplicate commitments. The request ID must be a valid UUID, with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `networkconnectivity.projects.locations.spokes.gatewayAdvertisedRoutes.delete`

- Versions: v1
- `DELETE https://networkconnectivity.googleapis.com/v1/{+name}`
- Delete a GatewayAdvertisedRoute
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the gateway advertised route to delete. |
| `requestId` | query | string | no | Optional. A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server knows to ignore the request if it has already been completed. The server guarantees that a request doesn't result in creation of duplicate commitments for at least 60 minutes. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check to see whether the original operation was received. If it was, the server ignores the second request. This behavior prevents clients from mistakenly creating duplicate commitments. The request ID must be a valid UUID, with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `networkconnectivity.projects.locations.spokes.gatewayAdvertisedRoutes.get`

- Versions: v1
- `GET https://networkconnectivity.googleapis.com/v1/{+name}`
- Get a GatewayAdvertisedRoute
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GatewayAdvertisedRoute`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the gateway advertised route to get. |

### `networkconnectivity.projects.locations.spokes.gatewayAdvertisedRoutes.list`

- Versions: v1
- `GET https://networkconnectivity.googleapis.com/v1/{+parent}/gatewayAdvertisedRoutes`
- List GatewayAdvertisedRoutes
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListGatewayAdvertisedRoutesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource's name. |
| `filter` | query | string | no | An expression that filters the list of results. |
| `orderBy` | query | string | no | Sort the results by a certain order. |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of results per page that should be returned. |
| `pageToken` | query | string | no | Optional. A page token, received from a previous `ListGatewayAdvertisedRoutes` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListGatewayAdvertisedRoutes` must match the call that provided the page token. |

### `networkconnectivity.projects.locations.spokes.gatewayAdvertisedRoutes.patch`

- Versions: v1
- `PATCH https://networkconnectivity.googleapis.com/v1/{+name}`
- Update a GatewayAdvertisedRoute
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GatewayAdvertisedRoute`; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. The name of the gateway advertised route. Route names must be unique and use the following form: `projects/{project_number}/locations/{region}/spokes/{spoke}/gatewayAdvertisedRoutes/{gateway_advertised_route_id}` |
| `requestId` | query | string | no | Optional. A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server knows to ignore the request if it has already been completed. The server guarantees that a request doesn't result in creation of duplicate commitments for at least 60 minutes. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check to see whether the original operation was received. If it was, the server ignores the second request. This behavior prevents clients from mistakenly creating duplicate commitments. The request ID must be a valid UUID, with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `updateMask` | query | string (google-fieldmask) | no | Optional. In the case of an update to an existing group, field mask is used to specify the fields to be overwritten. The fields specified in the update_mask are relative to the resource, not the full request. A field is overwritten if it is in the mask. If the user does not provide a mask, then all fields are overwritten. |

### `networkconnectivity.projects.locations.spokes.get`

- Versions: v1, v1alpha1
- `GET https://networkconnectivity.googleapis.com/v1/{+name}`
- Gets details about a Network Connectivity Center spoke.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Spoke`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the spoke resource. |

### `networkconnectivity.projects.locations.spokes.getIamPolicy`

- Versions: v1, v1alpha1
- `GET https://networkconnectivity.googleapis.com/v1/{+resource}:getIamPolicy`
- Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |
| `options.requestedPolicyVersion` | query | integer (int32) | no | Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |

### `networkconnectivity.projects.locations.spokes.list`

- Versions: v1, v1alpha1
- `GET https://networkconnectivity.googleapis.com/v1/{+parent}/spokes`
- Lists the Network Connectivity Center spokes in a specified project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListSpokesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource. |
| `filter` | query | string | no | An expression that filters the list of results. |
| `orderBy` | query | string | no | Sort the results by a certain order. |
| `pageSize` | query | integer (int32) | no | The maximum number of results to return per page. |
| `pageToken` | query | string | no | The page token. |

### `networkconnectivity.projects.locations.spokes.patch`

- Versions: v1, v1alpha1
- `PATCH https://networkconnectivity.googleapis.com/v1/{+name}`
- Updates the parameters of a Network Connectivity Center spoke.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Spoke`; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Immutable. The name of the spoke. Spoke names must be unique. They use the following form: `projects/{project_number}/locations/{region}/spokes/{spoke_id}` |
| `requestId` | query | string | no | Optional. A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server knows to ignore the request if it has already been completed. The server guarantees that a request doesn't result in creation of duplicate commitments for at least 60 minutes. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check to see whether the original operation was received. If it was, the server ignores the second request. This behavior prevents clients from mistakenly creating duplicate commitments. The request ID must be a valid UUID, with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `updateMask` | query | string (google-fieldmask) | no | Optional. In the case of an update to an existing spoke, field mask is used to specify the fields to be overwritten. The fields specified in the update_mask are relative to the resource, not the full request. A field is overwritten if it is in the mask. If the user does not provide a mask, then all fields are overwritten. |

### `networkconnectivity.projects.locations.spokes.setIamPolicy`

- Versions: v1, v1alpha1
- `POST https://networkconnectivity.googleapis.com/v1/{+resource}:setIamPolicy`
- Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `SetIamPolicyRequest`; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `networkconnectivity.projects.locations.spokes.testIamPermissions`

- Versions: v1, v1alpha1
- `POST https://networkconnectivity.googleapis.com/v1/{+resource}:testIamPermissions`
- Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `TestIamPermissionsRequest`; Response: `TestIamPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `networkconnectivity.projects.locations.transports.create`

- Versions: v1
- `POST https://networkconnectivity.googleapis.com/v1/{+parent}/transports`
- Creates a new Transport in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Transport`; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Value for parent. |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `transportId` | query | string | yes | Required. Id of the requesting object |

### `networkconnectivity.projects.locations.transports.delete`

- Versions: v1
- `DELETE https://networkconnectivity.googleapis.com/v1/{+name}`
- Deletes a single Transport.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the resource. |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `networkconnectivity.projects.locations.transports.get`

- Versions: v1
- `GET https://networkconnectivity.googleapis.com/v1/{+name}`
- Gets details of a single Transport.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Transport`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the resource. |

### `networkconnectivity.projects.locations.transports.list`

- Versions: v1
- `GET https://networkconnectivity.googleapis.com/v1/{+parent}/transports`
- Lists Transports in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListTransportsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Parent value for ListTransportsRequest. |
| `filter` | query | string | no | Optional. Filtering results. |
| `orderBy` | query | string | no | Optional. Hint for how to order the results. |
| `pageSize` | query | integer (int32) | no | Optional. Requested page size. Server may return fewer items than requested. If unspecified, server will pick an appropriate default. |
| `pageToken` | query | string | no | Optional. A token identifying a page of results the server should return. |

### `networkconnectivity.projects.locations.transports.patch`

- Versions: v1
- `PATCH https://networkconnectivity.googleapis.com/v1/{+name}`
- Updates the parameters of a single Transport.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Transport`; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. Name of the resource. |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `updateMask` | query | string (google-fieldmask) | no | Optional. Field mask is used to specify the fields to be overwritten in the Transport resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it is in the mask. If the user does not provide a mask then all fields present in the request will be overwritten. |

### Example request skeleton

Generated from the Discovery entry of `networkconnectivity.projects.locations.automatedDnsRecords.get` (not in the official docs); replace the `{...}` path variables (URL-encode query values):

```bash
curl -X GET \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  "https://networkconnectivity.googleapis.com/v1/{+name}"
```

## Notes

- Generated from the Discovery document(s) v1, v1alpha1 of `networkconnectivity` (retrieved 2026-11-14). Resources on this page: projects.
- The Required column is `yes` for path variables and required parameters, and `conditional` when the description says "Required if ..." (mutually exclusive alternatives), when a `parent.child` parameter is required only inside an optional parent message or one branch of a oneof. Path variables are `yes` unless a note below names an alternative route without them.
- Message schemas (the request and response types named above) are defined in the `schemas` section of the Discovery documents in Source.
- Source: https://networkconnectivity.googleapis.com/$discovery/rest?version=v1, https://networkconnectivity.googleapis.com/$discovery/rest?version=v1alpha1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
