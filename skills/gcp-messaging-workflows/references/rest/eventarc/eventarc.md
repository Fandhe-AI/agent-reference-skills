---
source: https://eventarc.googleapis.com/$discovery/rest?version=v1
---

# Eventarc API REST API (eventarc)

## Signature / Usage

Base URL: `https://eventarc.googleapis.com`. Methods are listed by `id`; the `Versions` line shows which API versions define the method (preferred: v1).

### `eventarc.projects.locations.channelConnections.create`

- Versions: v1
- `POST https://eventarc.googleapis.com/v1/{+parent}/channelConnections`
- Create a new ChannelConnection in a particular project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `ChannelConnection`; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent collection in which to add this channel connection. |
| `channelConnectionId` | query | string | yes | Required. The user-provided ID to be assigned to the channel connection. |

### `eventarc.projects.locations.channelConnections.delete`

- Versions: v1
- `DELETE https://eventarc.googleapis.com/v1/{+name}`
- Delete a single ChannelConnection.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the channel connection to delete. |

### `eventarc.projects.locations.channelConnections.get`

- Versions: v1
- `GET https://eventarc.googleapis.com/v1/{+name}`
- Get a single ChannelConnection.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ChannelConnection`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the channel connection to get. |

### `eventarc.projects.locations.channelConnections.getIamPolicy`

- Versions: v1
- `GET https://eventarc.googleapis.com/v1/{+resource}:getIamPolicy`
- Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |
| `options.requestedPolicyVersion` | query | integer (int32) | no | Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |

### `eventarc.projects.locations.channelConnections.list`

- Versions: v1
- `GET https://eventarc.googleapis.com/v1/{+parent}/channelConnections`
- List channel connections.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListChannelConnectionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent collection from which to list channel connections. |
| `pageSize` | query | integer (int32) | no | The maximum number of channel connections to return on each page. Note: The service may send fewer responses. |
| `pageToken` | query | string | no | The page token; provide the value from the `next_page_token` field in a previous `ListChannelConnections` call to retrieve the subsequent page. When paginating, all other parameters provided to `ListChannelConnetions` match the call that provided the page token. |

### `eventarc.projects.locations.channelConnections.setIamPolicy`

- Versions: v1
- `POST https://eventarc.googleapis.com/v1/{+resource}:setIamPolicy`
- Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `SetIamPolicyRequest`; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `eventarc.projects.locations.channelConnections.testIamPermissions`

- Versions: v1
- `POST https://eventarc.googleapis.com/v1/{+resource}:testIamPermissions`
- Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `TestIamPermissionsRequest`; Response: `TestIamPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `eventarc.projects.locations.channels.create`

- Versions: v1
- `POST https://eventarc.googleapis.com/v1/{+parent}/channels`
- Create a new channel in a particular project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Channel`; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent collection in which to add this channel. |
| `channelId` | query | string | yes | Required. The user-provided ID to be assigned to the channel. |
| `validateOnly` | query | boolean | no | Optional. If set, validate the request and preview the review, but do not post it. |

### `eventarc.projects.locations.channels.delete`

- Versions: v1
- `DELETE https://eventarc.googleapis.com/v1/{+name}`
- Delete a single channel.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the channel to be deleted. |
| `validateOnly` | query | boolean | no | Optional. If set, validate the request and preview the review, but do not post it. |

### `eventarc.projects.locations.channels.get`

- Versions: v1
- `GET https://eventarc.googleapis.com/v1/{+name}`
- Get a single Channel.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Channel`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the channel to get. |

### `eventarc.projects.locations.channels.getIamPolicy`

- Versions: v1
- `GET https://eventarc.googleapis.com/v1/{+resource}:getIamPolicy`
- Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |
| `options.requestedPolicyVersion` | query | integer (int32) | no | Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |

### `eventarc.projects.locations.channels.list`

- Versions: v1
- `GET https://eventarc.googleapis.com/v1/{+parent}/channels`
- List channels.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListChannelsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent collection to list channels on. |
| `orderBy` | query | string | no | The sorting order of the resources returned. Value should be a comma-separated list of fields. The default sorting order is ascending. To specify descending order for a field, append a `desc` suffix; for example: `name desc, channel_id`. |
| `pageSize` | query | integer (int32) | no | The maximum number of channels to return on each page. Note: The service may send fewer. |
| `pageToken` | query | string | no | The page token; provide the value from the `next_page_token` field in a previous `ListChannels` call to retrieve the subsequent page. When paginating, all other parameters provided to `ListChannels` must match the call that provided the page token. |

### `eventarc.projects.locations.channels.patch`

- Versions: v1
- `PATCH https://eventarc.googleapis.com/v1/{+name}`
- Update a single channel.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Channel`; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the channel. Must be unique within the location on the project and must be in `projects/{project}/locations/{location}/channels/{channel_id}` format. |
| `updateMask` | query | string (google-fieldmask) | no | The fields to be updated; only fields explicitly provided are updated. If no field mask is provided, all provided fields in the request are updated. To update all fields, provide a field mask of "\*". |
| `validateOnly` | query | boolean | no | Optional. If set, validate the request and preview the review, but do not post it. |

### `eventarc.projects.locations.channels.setIamPolicy`

- Versions: v1
- `POST https://eventarc.googleapis.com/v1/{+resource}:setIamPolicy`
- Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `SetIamPolicyRequest`; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `eventarc.projects.locations.channels.testIamPermissions`

- Versions: v1
- `POST https://eventarc.googleapis.com/v1/{+resource}:testIamPermissions`
- Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `TestIamPermissionsRequest`; Response: `TestIamPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `eventarc.projects.locations.enrollments.create`

- Versions: v1
- `POST https://eventarc.googleapis.com/v1/{+parent}/enrollments`
- Create a new Enrollment in a particular project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Enrollment`; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent collection in which to add this enrollment. |
| `enrollmentId` | query | string | yes | Required. The user-provided ID to be assigned to the Enrollment. It should match the format `^[a-z]([a-z0-9-]{0,61}[a-z0-9])?$`. |
| `validateOnly` | query | boolean | no | Optional. If set, validate the request and preview the review, but do not post it. |

### `eventarc.projects.locations.enrollments.delete`

- Versions: v1
- `DELETE https://eventarc.googleapis.com/v1/{+name}`
- Delete a single Enrollment.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the Enrollment to be deleted. |
| `allowMissing` | query | boolean | no | Optional. If set to true, and the Enrollment is not found, the request will succeed but no action will be taken on the server. |
| `etag` | query | string | no | Optional. If provided, the Enrollment will only be deleted if the etag matches the current etag on the resource. |
| `validateOnly` | query | boolean | no | Optional. If set, validate the request and preview the review, but do not post it. |

### `eventarc.projects.locations.enrollments.get`

- Versions: v1
- `GET https://eventarc.googleapis.com/v1/{+name}`
- Get a single Enrollment.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Enrollment`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the Enrollment to get. |

### `eventarc.projects.locations.enrollments.getIamPolicy`

- Versions: v1
- `GET https://eventarc.googleapis.com/v1/{+resource}:getIamPolicy`
- Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |
| `options.requestedPolicyVersion` | query | integer (int32) | no | Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |

### `eventarc.projects.locations.enrollments.list`

- Versions: v1
- `GET https://eventarc.googleapis.com/v1/{+parent}/enrollments`
- List Enrollments.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListEnrollmentsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent collection to list triggers on. |
| `filter` | query | string | no | Optional. The filter field that the list request will filter on. Possible filtersare described in https://google.aip.dev/160. |
| `orderBy` | query | string | no | Optional. The sorting order of the resources returned. Value should be a comma-separated list of fields. The default sorting order is ascending. To specify descending order for a field, append a `desc` suffix; for example: `name desc, update_time`. |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of results to return on each page. Note: The service may send fewer. |
| `pageToken` | query | string | no | Optional. The page token; provide the value from the `next_page_token` field in a previous call to retrieve the subsequent page. When paginating, all other parameters provided must match the previous call that provided the page token. |

### `eventarc.projects.locations.enrollments.patch`

- Versions: v1
- `PATCH https://eventarc.googleapis.com/v1/{+name}`
- Update a single Enrollment.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Enrollment`; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. Resource name of the form projects/{project}/locations/{location}/enrollments/{enrollment} |
| `allowMissing` | query | boolean | no | Optional. If set to true, and the Enrollment is not found, a new Enrollment will be created. In this situation, `update_mask` is ignored. |
| `updateMask` | query | string (google-fieldmask) | no | Optional. The fields to be updated; only fields explicitly provided are updated. If no field mask is provided, all provided fields in the request are updated. To update all fields, provide a field mask of "\*". |
| `validateOnly` | query | boolean | no | Optional. If set, validate the request and preview the review, but do not post it. |

### `eventarc.projects.locations.enrollments.setIamPolicy`

- Versions: v1
- `POST https://eventarc.googleapis.com/v1/{+resource}:setIamPolicy`
- Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `SetIamPolicyRequest`; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `eventarc.projects.locations.enrollments.testIamPermissions`

- Versions: v1
- `POST https://eventarc.googleapis.com/v1/{+resource}:testIamPermissions`
- Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `TestIamPermissionsRequest`; Response: `TestIamPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `eventarc.projects.locations.get`

- Versions: v1
- `GET https://eventarc.googleapis.com/v1/{+name}`
- Gets information about a location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Location`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Resource name for the location. |

### `eventarc.projects.locations.getGoogleChannelConfig`

- Versions: v1
- `GET https://eventarc.googleapis.com/v1/{+name}`
- Get a GoogleChannelConfig. The name of the GoogleChannelConfig in the response is ALWAYS coded with projectID.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleChannelConfig`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the config to get. |

### `eventarc.projects.locations.googleApiSources.create`

- Versions: v1
- `POST https://eventarc.googleapis.com/v1/{+parent}/googleApiSources`
- Create a new GoogleApiSource in a particular project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleApiSource`; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent collection in which to add this google api source. |
| `googleApiSourceId` | query | string | yes | Required. The user-provided ID to be assigned to the GoogleApiSource. It should match the format `^[a-z]([a-z0-9-]{0,61}[a-z0-9])?$`. |
| `validateOnly` | query | boolean | no | Optional. If set, validate the request and preview the review, but do not post it. |

### `eventarc.projects.locations.googleApiSources.delete`

- Versions: v1
- `DELETE https://eventarc.googleapis.com/v1/{+name}`
- Delete a single GoogleApiSource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the GoogleApiSource to be deleted. |
| `allowMissing` | query | boolean | no | Optional. If set to true, and the GoogleApiSource is not found, the request will succeed but no action will be taken on the server. |
| `etag` | query | string | no | Optional. If provided, the GoogleApiSource will only be deleted if the etag matches the current etag on the resource. |
| `validateOnly` | query | boolean | no | Optional. If set, validate the request and preview the review, but do not post it. |

### `eventarc.projects.locations.googleApiSources.get`

- Versions: v1
- `GET https://eventarc.googleapis.com/v1/{+name}`
- Get a single GoogleApiSource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleApiSource`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the google api source to get. |

### `eventarc.projects.locations.googleApiSources.getIamPolicy`

- Versions: v1
- `GET https://eventarc.googleapis.com/v1/{+resource}:getIamPolicy`
- Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |
| `options.requestedPolicyVersion` | query | integer (int32) | no | Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |

### `eventarc.projects.locations.googleApiSources.list`

- Versions: v1
- `GET https://eventarc.googleapis.com/v1/{+parent}/googleApiSources`
- List GoogleApiSources.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListGoogleApiSourcesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent collection to list GoogleApiSources on. |
| `filter` | query | string | no | Optional. The filter field that the list request will filter on. Possible filtersare described in https://google.aip.dev/160. |
| `orderBy` | query | string | no | Optional. The sorting order of the resources returned. Value should be a comma-separated list of fields. The default sorting order is ascending. To specify descending order for a field, append a `desc` suffix; for example: `name desc, update_time`. |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of results to return on each page. Note: The service may send fewer. |
| `pageToken` | query | string | no | Optional. The page token; provide the value from the `next_page_token` field in a previous call to retrieve the subsequent page. When paginating, all other parameters provided must match the previous call that provided the page token. |

### `eventarc.projects.locations.googleApiSources.patch`

- Versions: v1
- `PATCH https://eventarc.googleapis.com/v1/{+name}`
- Update a single GoogleApiSource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleApiSource`; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. Resource name of the form projects/{project}/locations/{location}/googleApiSources/{google_api_source} |
| `allowMissing` | query | boolean | no | Optional. If set to true, and the GoogleApiSource is not found, a new GoogleApiSource will be created. In this situation, `update_mask` is ignored. |
| `updateMask` | query | string (google-fieldmask) | no | Optional. The fields to be updated; only fields explicitly provided are updated. If no field mask is provided, all provided fields in the request are updated. To update all fields, provide a field mask of "\*". |
| `validateOnly` | query | boolean | no | Optional. If set, validate the request and preview the review, but do not post it. |

### `eventarc.projects.locations.googleApiSources.setIamPolicy`

- Versions: v1
- `POST https://eventarc.googleapis.com/v1/{+resource}:setIamPolicy`
- Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `SetIamPolicyRequest`; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `eventarc.projects.locations.googleApiSources.testIamPermissions`

- Versions: v1
- `POST https://eventarc.googleapis.com/v1/{+resource}:testIamPermissions`
- Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `TestIamPermissionsRequest`; Response: `TestIamPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `eventarc.projects.locations.list`

- Versions: v1
- `GET https://eventarc.googleapis.com/v1/{+name}/locations`
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

### `eventarc.projects.locations.messageBuses.create`

- Versions: v1
- `POST https://eventarc.googleapis.com/v1/{+parent}/messageBuses`
- Create a new MessageBus in a particular project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `MessageBus`; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent collection in which to add this message bus. |
| `messageBusId` | query | string | yes | Required. The user-provided ID to be assigned to the MessageBus. It should match the format `^[a-z]([a-z0-9-]{0,61}[a-z0-9])?$`. |
| `validateOnly` | query | boolean | no | Optional. If set, validate the request and preview the review, but do not post it. |

### `eventarc.projects.locations.messageBuses.delete`

- Versions: v1
- `DELETE https://eventarc.googleapis.com/v1/{+name}`
- Delete a single message bus.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the MessageBus to be deleted. |
| `allowMissing` | query | boolean | no | Optional. If set to true, and the MessageBus is not found, the request will succeed but no action will be taken on the server. |
| `etag` | query | string | no | Optional. If provided, the MessageBus will only be deleted if the etag matches the current etag on the resource. |
| `validateOnly` | query | boolean | no | Optional. If set, validate the request and preview the review, but do not post it. |

### `eventarc.projects.locations.messageBuses.get`

- Versions: v1
- `GET https://eventarc.googleapis.com/v1/{+name}`
- Get a single MessageBus.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `MessageBus`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the message bus to get. |

### `eventarc.projects.locations.messageBuses.getIamPolicy`

- Versions: v1
- `GET https://eventarc.googleapis.com/v1/{+resource}:getIamPolicy`
- Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |
| `options.requestedPolicyVersion` | query | integer (int32) | no | Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |

### `eventarc.projects.locations.messageBuses.list`

- Versions: v1
- `GET https://eventarc.googleapis.com/v1/{+parent}/messageBuses`
- List message buses.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListMessageBusesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent collection to list message buses on. |
| `filter` | query | string | no | Optional. The filter field that the list request will filter on. Possible filtersare described in https://google.aip.dev/160. |
| `orderBy` | query | string | no | Optional. The sorting order of the resources returned. Value should be a comma-separated list of fields. The default sorting order is ascending. To specify descending order for a field, append a `desc` suffix; for example: `name desc, update_time`. |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of results to return on each page. Note: The service may send fewer. |
| `pageToken` | query | string | no | Optional. The page token; provide the value from the `next_page_token` field in a previous call to retrieve the subsequent page. When paginating, all other parameters provided must match the previous call that provided the page token. |

### `eventarc.projects.locations.messageBuses.listEnrollments`

- Versions: v1
- `GET https://eventarc.googleapis.com/v1/{+parent}:listEnrollments`
- List message bus enrollments.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListMessageBusEnrollmentsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent message bus to list enrollments on. |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of results to return on each page. Note: The service may send fewer. |
| `pageToken` | query | string | no | Optional. The page token; provide the value from the `next_page_token` field in a previous call to retrieve the subsequent page. When paginating, all other parameters provided must match the previous call that provided the page token. |

### `eventarc.projects.locations.messageBuses.patch`

- Versions: v1
- `PATCH https://eventarc.googleapis.com/v1/{+name}`
- Update a single message bus.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `MessageBus`; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. Resource name of the form projects/{project}/locations/{location}/messageBuses/{message_bus} |
| `allowMissing` | query | boolean | no | Optional. If set to true, and the MessageBus is not found, a new MessageBus will be created. In this situation, `update_mask` is ignored. |
| `updateMask` | query | string (google-fieldmask) | no | Optional. The fields to be updated; only fields explicitly provided are updated. If no field mask is provided, all provided fields in the request are updated. To update all fields, provide a field mask of "\*". |
| `validateOnly` | query | boolean | no | Optional. If set, validate the request and preview the review, but do not post it. |

### `eventarc.projects.locations.messageBuses.setIamPolicy`

- Versions: v1
- `POST https://eventarc.googleapis.com/v1/{+resource}:setIamPolicy`
- Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `SetIamPolicyRequest`; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `eventarc.projects.locations.messageBuses.testIamPermissions`

- Versions: v1
- `POST https://eventarc.googleapis.com/v1/{+resource}:testIamPermissions`
- Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `TestIamPermissionsRequest`; Response: `TestIamPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `eventarc.projects.locations.operations.cancel`

- Versions: v1
- `POST https://eventarc.googleapis.com/v1/{+name}:cancel`
- Starts asynchronous cancellation on a long-running operation. The server makes a best effort to cancel the operation, but success is not guaranteed. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. Clients can use Operations.GetOperation or other methods to check whether the cancellation succeeded or whether the operation completed despite cancellation. On successful cancellation, the operation is not deleted; instead, it becomes an operation with an Operation.error value with a google.rpc.Status.code of `1`, corresponding to `Code.CANCELLED`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleLongrunningCancelOperationRequest`; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource to be cancelled. |

### `eventarc.projects.locations.operations.delete`

- Versions: v1
- `DELETE https://eventarc.googleapis.com/v1/{+name}`
- Deletes a long-running operation. This method indicates that the client is no longer interested in the operation result. It does not cancel the operation. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource to be deleted. |

### `eventarc.projects.locations.operations.get`

- Versions: v1
- `GET https://eventarc.googleapis.com/v1/{+name}`
- Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource. |

### `eventarc.projects.locations.operations.list`

- Versions: v1
- `GET https://eventarc.googleapis.com/v1/{+name}/operations`
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

### `eventarc.projects.locations.pipelines.create`

- Versions: v1
- `POST https://eventarc.googleapis.com/v1/{+parent}/pipelines`
- Create a new Pipeline in a particular project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Pipeline`; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent collection in which to add this pipeline. |
| `pipelineId` | query | string | yes | Required. The user-provided ID to be assigned to the Pipeline. It should match the format `^[a-z]([a-z0-9-]{0,61}[a-z0-9])?$`. |
| `validateOnly` | query | boolean | no | Optional. If set, validate the request and preview the review, but do not post it. |

### `eventarc.projects.locations.pipelines.delete`

- Versions: v1
- `DELETE https://eventarc.googleapis.com/v1/{+name}`
- Delete a single pipeline.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the Pipeline to be deleted. |
| `allowMissing` | query | boolean | no | Optional. If set to true, and the Pipeline is not found, the request will succeed but no action will be taken on the server. |
| `etag` | query | string | no | Optional. If provided, the Pipeline will only be deleted if the etag matches the current etag on the resource. |
| `validateOnly` | query | boolean | no | Optional. If set, validate the request and preview the review, but do not post it. |

### `eventarc.projects.locations.pipelines.get`

- Versions: v1
- `GET https://eventarc.googleapis.com/v1/{+name}`
- Get a single Pipeline.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Pipeline`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the pipeline to get. |

### `eventarc.projects.locations.pipelines.getIamPolicy`

- Versions: v1
- `GET https://eventarc.googleapis.com/v1/{+resource}:getIamPolicy`
- Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |
| `options.requestedPolicyVersion` | query | integer (int32) | no | Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |

### `eventarc.projects.locations.pipelines.list`

- Versions: v1
- `GET https://eventarc.googleapis.com/v1/{+parent}/pipelines`
- List pipelines.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListPipelinesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent collection to list pipelines on. |
| `filter` | query | string | no | Optional. The filter field that the list request will filter on. Possible filters are described in https://google.aip.dev/160. |
| `orderBy` | query | string | no | Optional. The sorting order of the resources returned. Value should be a comma-separated list of fields. The default sorting order is ascending. To specify descending order for a field, append a `desc` suffix; for example: `name desc, update_time`. |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of results to return on each page. Note: The service may send fewer. |
| `pageToken` | query | string | no | Optional. The page token; provide the value from the `next_page_token` field in a previous call to retrieve the subsequent page. When paginating, all other parameters provided must match the previous call that provided the page token. |

### `eventarc.projects.locations.pipelines.patch`

- Versions: v1
- `PATCH https://eventarc.googleapis.com/v1/{+name}`
- Update a single pipeline.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Pipeline`; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. The resource name of the Pipeline. Must be unique within the location of the project and must be in `projects/{project}/locations/{location}/pipelines/{pipeline}` format. |
| `allowMissing` | query | boolean | no | Optional. If set to true, and the Pipeline is not found, a new Pipeline will be created. In this situation, `update_mask` is ignored. |
| `updateMask` | query | string (google-fieldmask) | no | Optional. The fields to be updated; only fields explicitly provided are updated. If no field mask is provided, all provided fields in the request are updated. To update all fields, provide a field mask of "\*". |
| `validateOnly` | query | boolean | no | Optional. If set, validate the request and preview the review, but do not post it. |

### `eventarc.projects.locations.pipelines.setIamPolicy`

- Versions: v1
- `POST https://eventarc.googleapis.com/v1/{+resource}:setIamPolicy`
- Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `SetIamPolicyRequest`; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `eventarc.projects.locations.pipelines.testIamPermissions`

- Versions: v1
- `POST https://eventarc.googleapis.com/v1/{+resource}:testIamPermissions`
- Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `TestIamPermissionsRequest`; Response: `TestIamPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `eventarc.projects.locations.providers.get`

- Versions: v1
- `GET https://eventarc.googleapis.com/v1/{+name}`
- Get a single Provider.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Provider`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the provider to get. |

### `eventarc.projects.locations.providers.list`

- Versions: v1
- `GET https://eventarc.googleapis.com/v1/{+parent}/providers`
- List providers.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListProvidersResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent of the provider to get. |
| `filter` | query | string | no | The filter field that the list request will filter on. |
| `orderBy` | query | string | no | The sorting order of the resources returned. Value should be a comma-separated list of fields. The default sorting oder is ascending. To specify descending order for a field, append a `desc` suffix; for example: `name desc, _id`. |
| `pageSize` | query | integer (int32) | no | The maximum number of providers to return on each page. |
| `pageToken` | query | string | no | The page token; provide the value from the `next_page_token` field in a previous `ListProviders` call to retrieve the subsequent page. When paginating, all other parameters provided to `ListProviders` must match the call that provided the page token. |

### `eventarc.projects.locations.triggers.create`

- Versions: v1
- `POST https://eventarc.googleapis.com/v1/{+parent}/triggers`
- Create a new trigger in a particular project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Trigger`; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent collection in which to add this trigger. |
| `triggerId` | query | string | yes | Required. The user-provided ID to be assigned to the trigger. |
| `validateOnly` | query | boolean | no | Optional. If set, validate the request and preview the review, but do not post it. |

### `eventarc.projects.locations.triggers.delete`

- Versions: v1
- `DELETE https://eventarc.googleapis.com/v1/{+name}`
- Delete a single trigger.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the trigger to be deleted. |
| `allowMissing` | query | boolean | no | If set to true, and the trigger is not found, the request will succeed but no action will be taken on the server. |
| `etag` | query | string | no | If provided, the trigger will only be deleted if the etag matches the current etag on the resource. |
| `validateOnly` | query | boolean | no | Optional. If set, validate the request and preview the review, but do not post it. |

### `eventarc.projects.locations.triggers.get`

- Versions: v1
- `GET https://eventarc.googleapis.com/v1/{+name}`
- Get a single trigger.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Trigger`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the trigger to get. |

### `eventarc.projects.locations.triggers.getIamPolicy`

- Versions: v1
- `GET https://eventarc.googleapis.com/v1/{+resource}:getIamPolicy`
- Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |
| `options.requestedPolicyVersion` | query | integer (int32) | no | Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |

### `eventarc.projects.locations.triggers.list`

- Versions: v1
- `GET https://eventarc.googleapis.com/v1/{+parent}/triggers`
- List triggers.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListTriggersResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent collection to list triggers on. |
| `filter` | query | string | no | Filter field. Used to filter the Triggers to be listed. Possible filters are described in https://google.aip.dev/160. For example, using "?filter=destination:gke" would list only Triggers with a gke destination. |
| `orderBy` | query | string | no | The sorting order of the resources returned. Value should be a comma-separated list of fields. The default sorting order is ascending. To specify descending order for a field, append a `desc` suffix; for example: `name desc, trigger_id`. |
| `pageSize` | query | integer (int32) | no | The maximum number of triggers to return on each page. Note: The service may send fewer. |
| `pageToken` | query | string | no | The page token; provide the value from the `next_page_token` field in a previous `ListTriggers` call to retrieve the subsequent page. When paginating, all other parameters provided to `ListTriggers` must match the call that provided the page token. |

### `eventarc.projects.locations.triggers.patch`

- Versions: v1
- `PATCH https://eventarc.googleapis.com/v1/{+name}`
- Update a single trigger.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Trigger`; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the trigger. Must be unique within the location of the project and must be in `projects/{project}/locations/{location}/triggers/{trigger}` format. |
| `allowMissing` | query | boolean | no | If set to true, and the trigger is not found, a new trigger will be created. In this situation, `update_mask` is ignored. |
| `updateMask` | query | string (google-fieldmask) | no | The fields to be updated; only fields explicitly provided are updated. If no field mask is provided, all provided fields in the request are updated. To update all fields, provide a field mask of "\*". |
| `validateOnly` | query | boolean | no | Optional. If set, validate the request and preview the review, but do not post it. |

### `eventarc.projects.locations.triggers.setIamPolicy`

- Versions: v1
- `POST https://eventarc.googleapis.com/v1/{+resource}:setIamPolicy`
- Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `SetIamPolicyRequest`; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `eventarc.projects.locations.triggers.testIamPermissions`

- Versions: v1
- `POST https://eventarc.googleapis.com/v1/{+resource}:testIamPermissions`
- Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `TestIamPermissionsRequest`; Response: `TestIamPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `eventarc.projects.locations.updateGoogleChannelConfig`

- Versions: v1
- `PATCH https://eventarc.googleapis.com/v1/{+name}`
- Update a single GoogleChannelConfig
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleChannelConfig`; Response: `GoogleChannelConfig`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the config. Must be in the format of, `projects/{project}/locations/{location}/googleChannelConfig`. In API responses, the config name always includes the projectID, regardless of whether the projectID or projectNumber was provided. |
| `updateMask` | query | string (google-fieldmask) | no | The fields to be updated; only fields explicitly provided are updated. If no field mask is provided, all provided fields in the request are updated. To update all fields, provide a field mask of "\*". |

### Example request skeleton

Generated from the Discovery entry of `eventarc.projects.locations.channelConnections.get` (not in the official docs); replace the `{...}` path variables (URL-encode query values):

```bash
curl -X GET \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  "https://eventarc.googleapis.com/v1/{+name}"
```

## Notes

- Generated from the Discovery document(s) v1 of `eventarc` (retrieved 2026-11-14). Resources on this page: projects.
- The Required column is `yes` for path variables and required parameters, and `conditional` when the description says "Required if ..." (mutually exclusive alternatives), when a `parent.child` parameter is required only inside an optional parent message or one branch of a oneof. Path variables are `yes` unless a note below names an alternative route without them.
- Message schemas (the request and response types named above) are listed under `references/rest-schemas/eventarc/`; they are the `schemas` section of the Discovery documents in Source.
- Regional endpoints: the Discovery document (`eventarc` v1, revision 20261002) also lists 29 endpoints of the form `https://eventarc.LOCATION.rep.googleapis.com/` (Regional Endpoint), for LOCATION in `asia-south1`, `asia-south2`, `eu`, `europe-central2`, `europe-north1`, `europe-north2`, `europe-southwest1`, `europe-west1`, `europe-west10`, `europe-west12`, `europe-west3`, `europe-west4`, `europe-west6`, `europe-west8`, `europe-west9`, `me-central2`, `northamerica-northeast1`, `northamerica-northeast2`, `us`, `us-central1`, `us-east1`, `us-east4`, `us-east5`, `us-south1`, `us-west1`, `us-west2`, `us-west3`, `us-west4`, `us-west8`. The method URLs above use the global host `https://eventarc.googleapis.com/`; to send a request through one of these endpoints, replace the host with the endpoint for the resource's location (for example `https://eventarc.asia-south1.rep.googleapis.com/`) and keep the path.
- Corrected from the official docs (the Discovery text above is verbatim): the `validateOnly` descriptions say "Optional. If set, validate the request and preview the review, but do not post it." (the same comment is in google/cloud/eventarc/v1/eventarc.proto at googleapis commit dfce92d); this is the wording of the `ReviewBookRequest` example in AIP-163 (https://google.aip.dev/163, aip-dev/google.aip.dev commit 8b98ffe), and these methods do not post or save reviews. AIP-163 describes the option as a way to "validate, but not actually execute, a request" and return the response the request would have returned; the API must still perform the permission checks and other validation of a live request, and the request must fail if the actual request would fail. With `validateOnly` set, the method validates the request without creating, updating or deleting the resource.
- Source: https://eventarc.googleapis.com/$discovery/rest?version=v1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
