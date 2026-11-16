---
source: https://gkehub.googleapis.com/$discovery/rest?version=v2
---

# GKE Hub API REST API (gkehub)

## Signature / Usage

Base URL: `https://gkehub.googleapis.com`. Methods are listed by `id`; the `Versions` line shows which API versions define the method (preferred: v2).

### `gkehub.organizations.locations.fleets.list`

- Versions: v1, v1beta, v1alpha
- `GET https://gkehub.googleapis.com/v1/{+parent}/fleets`
- Returns all fleets within an organization or a project that the caller has access to.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListFleetsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The organization or project to list for Fleets under, in the format `organizations/*/locations/*` or `projects/*/locations/*`. |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of fleets to return. The service may return fewer than this value. If unspecified, at most 200 fleets will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. |
| `pageToken` | query | string | no | Optional. A page token, received from a previous `ListFleets` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListFleets` must match the call that provided the page token. |

### `gkehub.projects.locations.features.create`

- Versions: v1, v1beta, v1alpha
- `POST https://gkehub.googleapis.com/v1/{+parent}/features`
- Adds a new Feature.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Feature`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent (project and location) where the Feature will be created. Specified in the format `projects/*/locations/*`. |
| `featureId` | query | string | no | The ID of the feature to create. |
| `requestId` | query | string | no | A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `gkehub.projects.locations.features.delete`

- Versions: v1, v1beta, v1alpha
- `DELETE https://gkehub.googleapis.com/v1/{+name}`
- Removes a Feature.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The Feature resource name in the format `projects/*/locations/*/features/*`. |
| `force` | query | boolean | no | If set to true, the delete will ignore any outstanding resources for this Feature (that is, `FeatureState.has_resources` is set to true). These resources will NOT be cleaned up or modified in any way. |
| `requestId` | query | string | no | Optional. A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `gkehub.projects.locations.features.get`

- Versions: v1, v1beta, v1alpha
- `GET https://gkehub.googleapis.com/v1/{+name}`
- Gets details of a single Feature.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Feature`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The Feature resource name in the format `projects/*/locations/*/features/*` |
| `returnPartialSuccess` | query | boolean | no | Optional. If set to true, the response will return partial results when some regions are unreachable and the unreachable field in Feature proto will be populated. If set to false, the request will fail when some regions are unreachable. |

### `gkehub.projects.locations.features.getIamPolicy`

- Versions: v1, v1beta, v1alpha
- `GET https://gkehub.googleapis.com/v1/{+resource}:getIamPolicy`
- Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |
| `options.requestedPolicyVersion` | query | integer (int32) | no | Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |

### `gkehub.projects.locations.features.list`

- Versions: v1, v1beta, v1alpha
- `GET https://gkehub.googleapis.com/v1/{+parent}/features`
- Lists Features in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListFeaturesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent (project and location) where the Features will be listed. Specified in the format `projects/*/locations/*`. |
| `filter` | query | string | no | Lists Features that match the filter expression, following the syntax outlined in https://google.aip.dev/160. Examples: - Feature with the name "servicemesh" in project "foo-proj": name = "projects/foo-proj/locations/global/features/servicemesh" - Features that have a label called `foo`: labels.foo:\* - Features that have a label called `foo` whose value is `bar`: labels.foo = bar |
| `orderBy` | query | string | no | One or more fields to compare and use to sort the output. See https://google.aip.dev/132#ordering. |
| `pageSize` | query | integer (int32) | no | When requesting a 'page' of resources, `page_size` specifies number of resources to return. If unspecified or set to 0, all resources will be returned. |
| `pageToken` | query | string | no | Token returned by previous call to `ListFeatures` which specifies the position in the list from where to continue listing the resources. |
| `returnPartialSuccess` | query | boolean | no | Optional. If set to true, the response will return partial results when some regions are unreachable and the unreachable field in Feature proto will be populated. If set to false, the request will fail when some regions are unreachable. |

### `gkehub.projects.locations.features.patch`

- Versions: v1, v1beta, v1alpha
- `PATCH https://gkehub.googleapis.com/v1/{+name}`
- Updates an existing Feature.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Feature`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The Feature resource name in the format `projects/*/locations/*/features/*`. |
| `requestId` | query | string | no | A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `updateMask` | query | string (google-fieldmask) | no | Mask of fields to update. |

### `gkehub.projects.locations.features.setIamPolicy`

- Versions: v1, v1beta, v1alpha
- `POST https://gkehub.googleapis.com/v1/{+resource}:setIamPolicy`
- Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `SetIamPolicyRequest`; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `gkehub.projects.locations.features.testIamPermissions`

- Versions: v1, v1beta, v1alpha
- `POST https://gkehub.googleapis.com/v1/{+resource}:testIamPermissions`
- Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `TestIamPermissionsRequest`; Response: `TestIamPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `gkehub.projects.locations.fleets.create`

- Versions: v1, v1beta, v1alpha
- `POST https://gkehub.googleapis.com/v1/{+parent}/fleets`
- Creates a fleet.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Fleet`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent (project and location) where the Fleet will be created. Specified in the format `projects/*/locations/*`. |

### `gkehub.projects.locations.fleets.delete`

- Versions: v1, v1beta, v1alpha
- `DELETE https://gkehub.googleapis.com/v1/{+name}`
- Removes a Fleet. There must be no memberships remaining in the Fleet.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The Fleet resource name in the format `projects/*/locations/*/fleets/*`. |

### `gkehub.projects.locations.fleets.get`

- Versions: v1, v1beta, v1alpha
- `GET https://gkehub.googleapis.com/v1/{+name}`
- Returns the details of a fleet.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Fleet`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The Fleet resource name in the format `projects/*/locations/*/fleets/*`. |

### `gkehub.projects.locations.fleets.list`

- Versions: v1, v1beta, v1alpha
- `GET https://gkehub.googleapis.com/v1/{+parent}/fleets`
- Returns all fleets within an organization or a project that the caller has access to.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListFleetsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The organization or project to list for Fleets under, in the format `organizations/*/locations/*` or `projects/*/locations/*`. |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of fleets to return. The service may return fewer than this value. If unspecified, at most 200 fleets will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. |
| `pageToken` | query | string | no | Optional. A page token, received from a previous `ListFleets` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListFleets` must match the call that provided the page token. |

### `gkehub.projects.locations.fleets.patch`

- Versions: v1, v1beta, v1alpha
- `PATCH https://gkehub.googleapis.com/v1/{+name}`
- Updates a fleet.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Fleet`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Output only. The full, unique resource name of this fleet in the format of `projects/{project}/locations/{location}/fleets/{fleet}`. Each Google Cloud project can have at most one fleet resource, named "default". |
| `updateMask` | query | string (google-fieldmask) | yes | Required. The fields to be updated; |

### `gkehub.projects.locations.get`

- Versions: v2, v1, v2beta, v1beta1, v1beta, v2alpha, v1alpha
- `GET https://gkehub.googleapis.com/v2/{+name}`
- Gets information about a location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Location`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Resource name for the location. |

### `gkehub.projects.locations.list`

- Versions: v2, v1, v2beta, v1beta1, v1beta, v2alpha, v1alpha
- `GET https://gkehub.googleapis.com/v2/{+name}/locations`
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

### `gkehub.projects.locations.memberships.bindings.create`

- Versions: v1, v1beta, v1alpha
- `POST https://gkehub.googleapis.com/v1/{+parent}/bindings`
- Creates a MembershipBinding.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `MembershipBinding`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent (project and location) where the MembershipBinding will be created. Specified in the format `projects/*/locations/*/memberships/*`. |
| `membershipBindingId` | query | string | yes | Required. The ID to use for the MembershipBinding. |

### `gkehub.projects.locations.memberships.bindings.delete`

- Versions: v1, v1beta, v1alpha
- `DELETE https://gkehub.googleapis.com/v1/{+name}`
- Deletes a MembershipBinding.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The MembershipBinding resource name in the format `projects/*/locations/*/memberships/*/bindings/*`. |

### `gkehub.projects.locations.memberships.bindings.get`

- Versions: v1, v1beta, v1alpha
- `GET https://gkehub.googleapis.com/v1/{+name}`
- Returns the details of a MembershipBinding.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `MembershipBinding`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The MembershipBinding resource name in the format `projects/*/locations/*/memberships/*/bindings/*`. |

### `gkehub.projects.locations.memberships.bindings.list`

- Versions: v1, v1beta, v1alpha
- `GET https://gkehub.googleapis.com/v1/{+parent}/bindings`
- Lists MembershipBindings.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListMembershipBindingsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent Membership for which the MembershipBindings will be listed. Specified in the format `projects/*/locations/*/memberships/*`. |
| `filter` | query | string | no | Optional. Lists MembershipBindings that match the filter expression, following the syntax outlined in https://google.aip.dev/160. |
| `pageSize` | query | integer (int32) | no | Optional. When requesting a 'page' of resources, `page_size` specifies number of resources to return. If unspecified or set to 0, all resources will be returned. |
| `pageToken` | query | string | no | Optional. Token returned by previous call to `ListMembershipBindings` which specifies the position in the list from where to continue listing the resources. |

### `gkehub.projects.locations.memberships.bindings.patch`

- Versions: v1, v1beta, v1alpha
- `PATCH https://gkehub.googleapis.com/v1/{+name}`
- Updates a MembershipBinding.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `MembershipBinding`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The resource name for the membershipbinding itself `projects/{project}/locations/{location}/memberships/{membership}/bindings/{membershipbinding}` |
| `updateMask` | query | string (google-fieldmask) | yes | Required. The fields to be updated. |

### `gkehub.projects.locations.memberships.create`

- Versions: v1, v1beta1, v1beta, v1alpha
- `POST https://gkehub.googleapis.com/v1/{+parent}/memberships`
- Creates a new Membership. \*\*This is currently only supported for GKE clusters on Google Cloud\*\*. To register other clusters, follow the instructions at https://cloud.google.com/anthos/multicluster-management/connect/registering-a-cluster.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Membership`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent (project and location) where the Memberships will be created. Specified in the format `projects/*/locations/*`. |
| `membershipId` | query | string | yes | Required. Client chosen ID for the membership. `membership_id` must be a valid RFC 1123 compliant DNS label: 1. At most 63 characters in length 2. It must consist of lower case alphanumeric characters or `-` 3. It must start and end with an alphanumeric character Which can be expressed as the regex: `[a-z0-9]([-a-z0-9]*[a-z0-9])?`, with a maximum length of 63 characters. |
| `requestId` | query | string | no | Optional. A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `gkehub.projects.locations.memberships.delete`

- Versions: v1, v1beta1, v1beta, v1alpha
- `DELETE https://gkehub.googleapis.com/v1/{+name}`
- Removes a Membership. \*\*This is currently only supported for GKE clusters on Google Cloud\*\*. To unregister other clusters, follow the instructions at https://cloud.google.com/anthos/multicluster-management/connect/unregistering-a-cluster.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The Membership resource name in the format `projects/*/locations/*/memberships/*`. |
| `force` | query | boolean | no | Optional. If set to true, any subresource from this Membership will also be deleted. Otherwise, the request will only work if the Membership has no subresource. |
| `requestId` | query | string | no | Optional. A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `gkehub.projects.locations.memberships.features.create`

- Versions: v2, v2beta, v2alpha
- `POST https://gkehub.googleapis.com/v2/{+parent}/features`
- Creates membershipFeature under a given parent.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `MembershipFeature`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The name of parent where the MembershipFeature will be created. Specified in the format `projects/*/locations/*/memberships/*`. |
| `featureId` | query | string | yes | Required. The ID of the membership_feature to create. |
| `requestId` | query | string | no | Idempotent request UUID. |

### `gkehub.projects.locations.memberships.features.delete`

- Versions: v2, v2beta, v2alpha
- `DELETE https://gkehub.googleapis.com/v2/{+name}`
- Removes a membershipFeature.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the membershipFeature to be deleted. Specified in the format `projects/*/locations/*/memberships/*/features/*`. |
| `requestId` | query | string | no | Idempotent request UUID. |

### `gkehub.projects.locations.memberships.features.get`

- Versions: v2, v2beta, v2alpha
- `GET https://gkehub.googleapis.com/v2/{+name}`
- ========= MembershipFeature Services ========= Gets details of a membershipFeature.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `MembershipFeature`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The MembershipFeature resource name in the format `projects/*/locations/*/memberships/*/features/*`. |

### `gkehub.projects.locations.memberships.features.list`

- Versions: v2, v2beta, v2alpha
- `GET https://gkehub.googleapis.com/v2/{+parent}/features`
- Lists MembershipFeatures in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListMembershipFeaturesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent where the MembershipFeature will be listed. In the format: `projects/*/locations/*/memberships/*`. |
| `filter` | query | string | no | Lists MembershipFeatures that match the filter expression, following the syntax outlined in https://google.aip.dev/160. Examples: - Feature with the name "helloworld" in project "foo-proj" and membership "member-bar": name = "projects/foo-proj/locations/global/memberships/member-bar/features/helloworld" - Features that have a label called `foo`: labels.foo:\* - Features that have a label called `foo` whose value is `bar`: labels.foo = bar |
| `orderBy` | query | string | no | One or more fields to compare and use to sort the output. See https://google.aip.dev/132#ordering. |
| `pageSize` | query | integer (int32) | no | When requesting a 'page' of resources, `page_size` specifies number of resources to return. If unspecified or set to 0, all resources will be returned. |
| `pageToken` | query | string | no | Token returned by previous call to `ListFeatures` which specifies the position in the list from where to continue listing the resources. |

### `gkehub.projects.locations.memberships.features.patch`

- Versions: v2, v2beta, v2alpha
- `PATCH https://gkehub.googleapis.com/v2/{+name}`
- Updates an existing MembershipFeature.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `MembershipFeature`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Output only. The resource name of the membershipFeature, in the format: `projects/{project}/locations/{location}/memberships/{membership}/features/{feature}`. Note that `membershipFeatures` is shortened to `features` in the resource name. (see https://google.aip.dev/122#collection-identifiers) |
| `allowMissing` | query | boolean | no | Optional. If set to true, and the MembershipFeature is not found, a new MembershipFeature will be created. In this situation, `update_mask` is ignored. |
| `requestId` | query | string | no | Idempotent request UUID. |
| `updateMask` | query | string (google-fieldmask) | yes | Required. Mask of fields to update. |

### `gkehub.projects.locations.memberships.generateConnectManifest`

- Versions: v1, v1beta1, v1beta, v1alpha
- `GET https://gkehub.googleapis.com/v1/{+name}:generateConnectManifest`
- Generates the manifest for deployment of the GKE connect agent. \*\*This method is used internally by Google-provided libraries.\*\* Most clients should not need to call this method directly.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GenerateConnectManifestResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The Membership resource name the Agent will associate with, in the format `projects/*/locations/*/memberships/*`. |
| `imagePullSecretContent` | query | string (byte) | no | Optional. The image pull secret content for the registry, if not public. |
| `isUpgrade` | query | boolean | no | Optional. If true, generate the resources for upgrade only. Some resources generated only for installation (e.g. secrets) will be excluded. |
| `namespace` | query | string | no | Optional. Namespace for GKE Connect agent resources. Defaults to `gke-connect`. The Connect Agent is authorized automatically when run in the default namespace. Otherwise, explicit authorization must be granted with an additional IAM binding. |
| `proxy` | query | string (byte) | no | Optional. URI of a proxy if connectivity from the agent to gkeconnect.googleapis.com requires the use of a proxy. Format must be in the form `http(s)://{proxy_address}`, depending on the HTTP/HTTPS protocol supported by the proxy. This will direct the connect agent's outbound traffic through a HTTP(S) proxy. |
| `registry` | query | string | no | Optional. The registry to fetch the connect agent image from. Defaults to gcr.io/gkeconnect. |
| `version` | query | string | no | Optional. The Connect agent version to use. Defaults to the most current version. |

### `gkehub.projects.locations.memberships.generateExclusivityManifest`

- Versions: v1beta1, v1alpha
- `GET https://gkehub.googleapis.com/v1beta1/{+name}:generateExclusivityManifest`
- GenerateExclusivityManifest generates the manifests to update the exclusivity artifacts in the cluster if needed. Exclusivity artifacts include the Membership custom resource definition (CRD) and the singleton Membership custom resource (CR). Combined with ValidateExclusivity, exclusivity artifacts guarantee that a Kubernetes cluster is only registered to a single GKE Hub. The Membership CRD is versioned, and may require conversion when the GKE Hub API server begins serving a newer version of the CRD and corresponding CR. The response will be the converted CRD and CR if there are any differences between the versions.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GenerateExclusivityManifestResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The Membership resource name in the format `projects/*/locations/*/memberships/*`. |
| `crManifest` | query | string | no | Optional. The YAML manifest of the membership CR retrieved by `kubectl get memberships membership`. Leave empty if the resource does not exist. |
| `crdManifest` | query | string | no | Optional. The YAML manifest of the membership CRD retrieved by `kubectl get customresourcedefinitions membership`. Leave empty if the resource does not exist. |

### `gkehub.projects.locations.memberships.get`

- Versions: v1, v1beta1, v1beta, v1alpha
- `GET https://gkehub.googleapis.com/v1/{+name}`
- Gets the details of a Membership.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Membership`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The Membership resource name in the format `projects/*/locations/*/memberships/*`. |

### `gkehub.projects.locations.memberships.getIamPolicy`

- Versions: v1, v1beta1, v1beta, v1alpha
- `GET https://gkehub.googleapis.com/v1/{+resource}:getIamPolicy`
- Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |
| `options.requestedPolicyVersion` | query | integer (int32) | no | Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |

### `gkehub.projects.locations.memberships.list`

- Versions: v1, v1beta1, v1beta, v1alpha
- `GET https://gkehub.googleapis.com/v1/{+parent}/memberships`
- Lists Memberships in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListMembershipsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent (project and location) where the Memberships will be listed. Specified in the format `projects/*/locations/*`. `projects/*/locations/-` list memberships in all the regions. |
| `filter` | query | string | no | Optional. Lists Memberships that match the filter expression, following the syntax outlined in https://google.aip.dev/160. Examples: - Name is `bar` in project `foo-proj` and location `global`: name = "projects/foo-proj/locations/global/membership/bar" - Memberships that have a label called `foo`: labels.foo:\* - Memberships that have a label called `foo` whose value is `bar`: labels.foo = bar - Memberships in the CREATING state: state = CREATING |
| `orderBy` | query | string | no | Optional. One or more fields to compare and use to sort the output. See https://google.aip.dev/132#ordering. |
| `pageSize` | query | integer (int32) | no | Optional. When requesting a 'page' of resources, `page_size` specifies number of resources to return. If unspecified or set to 0, all resources will be returned. |
| `pageToken` | query | string | no | Optional. Token returned by previous call to `ListMemberships` which specifies the position in the list from where to continue listing the resources. |

### `gkehub.projects.locations.memberships.listAdmin`

- Versions: v1alpha
- `GET https://gkehub.googleapis.com/v1alpha/{+parent}/memberships:listAdmin`
- Lists Memberships of admin clusters in a given project and location. \*\*This method is only used internally\*\*.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListAdminClusterMembershipsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent (project and location) where the Memberships of admin cluster will be listed. Specified in the format `projects/*/locations/*`. |
| `filter` | query | string | no | Optional. Lists Memberships of admin clusters that match the filter expression. |
| `orderBy` | query | string | no | Optional. One or more fields to compare and use to sort the output. See https://google.aip.dev/132#ordering. |
| `pageSize` | query | integer (int32) | no | Optional. When requesting a 'page' of resources, `page_size` specifies number of resources to return. If unspecified or set to 0, all resources will be returned. |
| `pageToken` | query | string | no | Optional. Token returned by previous call to `ListAdminClusterMemberships` which specifies the position in the list from where to continue listing the resources. |

### `gkehub.projects.locations.memberships.patch`

- Versions: v1, v1beta1, v1beta, v1alpha
- `PATCH https://gkehub.googleapis.com/v1/{+name}`
- Updates an existing Membership.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Membership`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The Membership resource name in the format `projects/*/locations/*/memberships/*`. |
| `requestId` | query | string | no | Optional. A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `updateMask` | query | string (google-fieldmask) | yes | Required. Mask of fields to update. |

### `gkehub.projects.locations.memberships.rbacrolebindings.create`

- Versions: v1, v1beta, v1alpha
- `POST https://gkehub.googleapis.com/v1/{+parent}/rbacrolebindings`
- Creates a Membership RBACRoleBinding.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `RBACRoleBinding`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent (project and location) where the RBACRoleBinding will be created. Specified in the format `projects/*/locations/*/memberships/*`. |
| `rbacrolebindingId` | query | string | yes | Required. Client chosen ID for the RBACRoleBinding. `rbacrolebinding_id` must be a valid RFC 1123 compliant DNS label: 1. At most 63 characters in length 2. It must consist of lower case alphanumeric characters or `-` 3. It must start and end with an alphanumeric character Which can be expressed as the regex: `[a-z0-9]([-a-z0-9]*[a-z0-9])?`, with a maximum length of 63 characters. |

### `gkehub.projects.locations.memberships.rbacrolebindings.delete`

- Versions: v1, v1beta, v1alpha
- `DELETE https://gkehub.googleapis.com/v1/{+name}`
- Deletes a Membership RBACRoleBinding.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The RBACRoleBinding resource name in the format `projects/*/locations/*/memberships/*/rbacrolebindings/*`. |

### `gkehub.projects.locations.memberships.rbacrolebindings.generateMembershipRBACRoleBindingYAML`

- Versions: v1, v1beta, v1alpha
- `POST https://gkehub.googleapis.com/v1/{+parent}/rbacrolebindings:generateMembershipRBACRoleBindingYAML`
- Generates a YAML of the RBAC policies for the specified RoleBinding and its associated impersonation resources.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `RBACRoleBinding`; Response: `GenerateMembershipRBACRoleBindingYAMLResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent (project and location) where the RBACRoleBinding will be created. Specified in the format `projects/*/locations/*/memberships/*`. |
| `rbacrolebindingId` | query | string | yes | Required. Client chosen ID for the RBACRoleBinding. `rbacrolebinding_id` must be a valid RFC 1123 compliant DNS label: 1. At most 63 characters in length 2. It must consist of lower case alphanumeric characters or `-` 3. It must start and end with an alphanumeric character Which can be expressed as the regex: `[a-z0-9]([-a-z0-9]*[a-z0-9])?`, with a maximum length of 63 characters. |

### `gkehub.projects.locations.memberships.rbacrolebindings.get`

- Versions: v1, v1beta, v1alpha
- `GET https://gkehub.googleapis.com/v1/{+name}`
- Returns the details of a Membership RBACRoleBinding.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `RBACRoleBinding`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The RBACRoleBinding resource name in the format `projects/*/locations/*/memberships/*/rbacrolebindings/*`. |

### `gkehub.projects.locations.memberships.rbacrolebindings.list`

- Versions: v1, v1beta, v1alpha
- `GET https://gkehub.googleapis.com/v1/{+parent}/rbacrolebindings`
- Lists all Membership RBACRoleBindings.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListMembershipRBACRoleBindingsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent (project and location) where the Features will be listed. Specified in the format `projects/*/locations/*/memberships/*`. |
| `pageSize` | query | integer (int32) | no | Optional. When requesting a 'page' of resources, `page_size` specifies number of resources to return. If unspecified or set to 0, all resources will be returned. |
| `pageToken` | query | string | no | Optional. Token returned by previous call to `ListMembershipRBACRoleBindings` which specifies the position in the list from where to continue listing the resources. |

### `gkehub.projects.locations.memberships.rbacrolebindings.patch`

- Versions: v1, v1beta, v1alpha
- `PATCH https://gkehub.googleapis.com/v1/{+name}`
- Updates a Membership RBACRoleBinding.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `RBACRoleBinding`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The resource name for the rbacrolebinding `projects/{project}/locations/{location}/scopes/{scope}/rbacrolebindings/{rbacrolebinding}` or `projects/{project}/locations/{location}/memberships/{membership}/rbacrolebindings/{rbacrolebinding}` |
| `updateMask` | query | string (google-fieldmask) | yes | Required. The fields to be updated. |

### `gkehub.projects.locations.memberships.setIamPolicy`

- Versions: v1, v1beta1, v1beta, v1alpha
- `POST https://gkehub.googleapis.com/v1/{+resource}:setIamPolicy`
- Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `SetIamPolicyRequest`; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `gkehub.projects.locations.memberships.testIamPermissions`

- Versions: v1, v1beta1, v1beta, v1alpha
- `POST https://gkehub.googleapis.com/v1/{+resource}:testIamPermissions`
- Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `TestIamPermissionsRequest`; Response: `TestIamPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `gkehub.projects.locations.memberships.validateCreate`

- Versions: v1alpha
- `POST https://gkehub.googleapis.com/v1alpha/{+parent}/memberships:validateCreate`
- ValidateCreateMembership is a preflight check for CreateMembership. It checks the following: 1. Caller has the required `gkehub.memberships.create` permission. 2. The membership_id is still available.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `ValidateCreateMembershipRequest`; Response: `ValidateCreateMembershipResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent (project and location) where the Memberships will be created. Specified in the format `projects/*/locations/*`. |

### `gkehub.projects.locations.memberships.validateExclusivity`

- Versions: v1beta1, v1alpha
- `GET https://gkehub.googleapis.com/v1beta1/{+parent}/memberships:validateExclusivity`
- ValidateExclusivity validates the state of exclusivity in the cluster. The validation does not depend on an existing Hub membership resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ValidateExclusivityResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent (project and location) where the Memberships will be created. Specified in the format `projects/*/locations/*`. |
| `crManifest` | query | string | no | Optional. The YAML of the membership CR in the cluster. Empty if the membership CR does not exist. |
| `intendedMembership` | query | string | yes | Required. The intended membership name under the `parent`. This method only does validation in anticipation of a CreateMembership call with the same name. |

### `gkehub.projects.locations.operations.cancel`

- Versions: v2, v1, v2beta, v1beta1, v1beta, v2alpha, v1alpha
- `POST https://gkehub.googleapis.com/v2/{+name}:cancel`
- Starts asynchronous cancellation on a long-running operation. The server makes a best effort to cancel the operation, but success is not guaranteed. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. Clients can use Operations.GetOperation or other methods to check whether the cancellation succeeded or whether the operation completed despite cancellation. On successful cancellation, the operation is not deleted; instead, it becomes an operation with an Operation.error value with a google.rpc.Status.code of `1`, corresponding to `Code.CANCELLED`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `CancelOperationRequest`; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource to be cancelled. |

### `gkehub.projects.locations.operations.delete`

- Versions: v1, v1beta1, v1beta, v1alpha
- `DELETE https://gkehub.googleapis.com/v1/{+name}`
- Deletes a long-running operation. This method indicates that the client is no longer interested in the operation result. It does not cancel the operation. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource to be deleted. |

### `gkehub.projects.locations.operations.get`

- Versions: v2, v1, v2beta, v1beta1, v1beta, v2alpha, v1alpha
- `GET https://gkehub.googleapis.com/v2/{+name}`
- Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource. |

### `gkehub.projects.locations.operations.list`

- Versions: v2, v1, v2beta, v1beta1, v1beta, v2alpha, v1alpha
- `GET https://gkehub.googleapis.com/v2/{+name}/operations`
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

### `gkehub.projects.locations.rolloutSequences.create`

- Versions: v1, v1beta, v1alpha
- `POST https://gkehub.googleapis.com/v1/{+parent}/rolloutSequences`
- Creates a new rollout sequence resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `RolloutSequence`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource where this rollout sequence will be created. projects/{project}/locations/{location} |
| `rolloutSequenceId` | query | string | yes | Required. User provided identifier that is used as part of the resource name; must conform to RFC-1034 and additionally restrict to lower-cased letters. This comes out roughly to: /^a-z+\[a-z0-9\]$/ |

### `gkehub.projects.locations.rolloutSequences.delete`

- Versions: v1, v1beta, v1alpha
- `DELETE https://gkehub.googleapis.com/v1/{+name}`
- Removes a RolloutSequence.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the rollout sequence to delete. projects/{project}/locations/{location}/rolloutSequences/{rollout_sequence} |

### `gkehub.projects.locations.rolloutSequences.get`

- Versions: v1, v1beta, v1alpha
- `GET https://gkehub.googleapis.com/v1/{+name}`
- Retrieve a single rollout sequence.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `RolloutSequence`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the rollout sequence to retrieve. projects/{project}/locations/{location}/rolloutSequences/{rollout_sequence} |

### `gkehub.projects.locations.rolloutSequences.list`

- Versions: v1, v1beta, v1alpha
- `GET https://gkehub.googleapis.com/v1/{+parent}/rolloutSequences`
- Retrieves the list of all rollout sequences.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListRolloutSequencesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent, which owns this collection of rollout sequences. Format: projects/{project}/locations/{location} |
| `filter` | query | string | no | Optional. Lists Rollout Sequences that match the filter expression, following the syntax outlined in https://google.aip.dev/160. |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of rollout sequences to return. The service may return fewer than this value. If unspecified, at most 50 rollout sequences will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. |
| `pageToken` | query | string | no | Optional. A page token, received from a previous `ListRolloutSequences` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListRolloutSequences` must match the call that provided the page token. |

### `gkehub.projects.locations.rolloutSequences.patch`

- Versions: v1, v1beta, v1alpha
- `PATCH https://gkehub.googleapis.com/v1/{+name}`
- Updates a rollout sequence.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `RolloutSequence`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. Name of the rollout sequence in the format of: projects/{PROJECT_ID}/locations/global/rolloutSequences/{NAME} |
| `updateMask` | query | string (google-fieldmask) | no | Optional. The list of fields to update. |

### `gkehub.projects.locations.rolloutSequences.upgrade`

- Versions: v1, v1beta, v1alpha
- `POST https://gkehub.googleapis.com/v1/{+name}:upgrade`
- Upgrades a rollout sequence.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `UpgradeRolloutSequenceRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the rollout sequence. Format: projects/{project}/locations/{location}/rolloutSequences/{rollout_sequence} |

### `gkehub.projects.locations.rollouts.cancel`

- Versions: v1, v1beta, v1alpha
- `POST https://gkehub.googleapis.com/v1/{+name}:cancel`
- Cancels a Rollout. The rollout will not be started on new clusters, however the rollout running on the cluster will be allowed to finish.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `CancelRolloutRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the rollout to cancel. projects/{project}/locations/{location}/rollouts/{rollout} |

### `gkehub.projects.locations.rollouts.delete`

- Versions: v1, v1beta, v1alpha
- `DELETE https://gkehub.googleapis.com/v1/{+name}`
- Removes a Rollout.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the rollout to delete. projects/{project}/locations/{location}/rollouts/{rollout} |
| `requestId` | query | string | no | Optional. A request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `gkehub.projects.locations.rollouts.forceCompleteStage`

- Versions: v1, v1beta, v1alpha
- `POST https://gkehub.googleapis.com/v1/{+name}:forceCompleteStage`
- Force-completes a rollout stage. Only the active stage of an active rollout can be force-completed.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `ForceCompleteRolloutStageRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the rollout. Format: projects/{project}/locations/{location}/rollouts/{rollout} |

### `gkehub.projects.locations.rollouts.get`

- Versions: v1, v1beta, v1alpha
- `GET https://gkehub.googleapis.com/v1/{+name}`
- Retrieves a single rollout.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Rollout`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the rollout to retrieve. projects/{project}/locations/{location}/rollouts/{rollout} |

### `gkehub.projects.locations.rollouts.list`

- Versions: v1, v1beta, v1alpha
- `GET https://gkehub.googleapis.com/v1/{+parent}/rollouts`
- Retrieves the list of all rollouts.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListRolloutsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent, which owns this collection of rollout. Format: projects/{project}/locations/{location} |
| `filter` | query | string | no | Optional. Lists Rollouts that match the filter expression, following the syntax outlined in https://google.aip.dev/160. |
| `pageSize` | query | integer (int32) | no | The maximum number of rollout to return. The service may return fewer than this value. If unspecified, at most 50 rollouts will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. |
| `pageToken` | query | string | no | A page token, received from a previous `ListRollouts` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListRollouts` must match the call that provided the page token. |

### `gkehub.projects.locations.rollouts.pause`

- Versions: v1, v1beta, v1alpha
- `POST https://gkehub.googleapis.com/v1/{+name}:pause`
- Pauses a running Rollout. The rollout will not be started on new clusters, however the rollout running on the cluster will be allowed to finish.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `PauseRolloutRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the rollout to pause. projects/{project}/locations/{location}/rollouts/{rollout} |

### `gkehub.projects.locations.rollouts.resume`

- Versions: v1, v1beta, v1alpha
- `POST https://gkehub.googleapis.com/v1/{+name}:resume`
- Resume a paused Rollout. The rollout will be resumed and allowed to be started on clusters.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `ResumeRolloutRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the rollout to resume. projects/{project}/locations/{location}/rollouts/{rollout} |

### `gkehub.projects.locations.scopes.create`

- Versions: v1, v1beta, v1alpha
- `POST https://gkehub.googleapis.com/v1/{+parent}/scopes`
- Creates a Scope.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Scope`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent (project and location) where the Scope will be created. Specified in the format `projects/*/locations/*`. |
| `scopeId` | query | string | yes | Required. Client chosen ID for the Scope. `scope_id` must be a ???? |

### `gkehub.projects.locations.scopes.delete`

- Versions: v1, v1beta, v1alpha
- `DELETE https://gkehub.googleapis.com/v1/{+name}`
- Deletes a Scope.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The Scope resource name in the format `projects/*/locations/*/scopes/*`. |

### `gkehub.projects.locations.scopes.get`

- Versions: v1, v1beta, v1alpha
- `GET https://gkehub.googleapis.com/v1/{+name}`
- Returns the details of a Scope.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Scope`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The Scope resource name in the format `projects/*/locations/*/scopes/*`. |

### `gkehub.projects.locations.scopes.getIamPolicy`

- Versions: v1, v1beta, v1alpha
- `GET https://gkehub.googleapis.com/v1/{+resource}:getIamPolicy`
- Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |
| `options.requestedPolicyVersion` | query | integer (int32) | no | Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |

### `gkehub.projects.locations.scopes.list`

- Versions: v1, v1beta, v1alpha
- `GET https://gkehub.googleapis.com/v1/{+parent}/scopes`
- Lists Scopes.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListScopesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent (project and location) where the Scope will be listed. Specified in the format `projects/*/locations/*`. |
| `pageSize` | query | integer (int32) | no | Optional. When requesting a 'page' of resources, `page_size` specifies number of resources to return. If unspecified or set to 0, all resources will be returned. |
| `pageToken` | query | string | no | Optional. Token returned by previous call to `ListScopes` which specifies the position in the list from where to continue listing the resources. |

### `gkehub.projects.locations.scopes.listMemberships`

- Versions: v1, v1beta, v1alpha
- `GET https://gkehub.googleapis.com/v1/{+scopeName}:listMemberships`
- Lists Memberships bound to a Scope. The response includes relevant Memberships from all regions.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListBoundMembershipsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `scopeName` | path | string | yes | Required. Name of the Scope, in the format `projects/*/locations/global/scopes/*`, to which the Memberships are bound. |
| `filter` | query | string | no | Optional. Lists Memberships that match the filter expression, following the syntax outlined in https://google.aip.dev/160. Currently, filtering can be done only based on Memberships's `name`, `labels`, `create_time`, `update_time`, and `unique_id`. |
| `pageSize` | query | integer (int32) | no | Optional. When requesting a 'page' of resources, `page_size` specifies number of resources to return. If unspecified or set to 0, all resources will be returned. Pagination is currently not supported; therefore, setting this field does not have any impact for now. |
| `pageToken` | query | string | no | Optional. Token returned by previous call to `ListBoundMemberships` which specifies the position in the list from where to continue listing the resources. |

### `gkehub.projects.locations.scopes.listPermitted`

- Versions: v1, v1beta, v1alpha
- `GET https://gkehub.googleapis.com/v1/{+parent}/scopes:listPermitted`
- Lists permitted Scopes.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListPermittedScopesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent (project and location) where the Scope will be listed. Specified in the format `projects/*/locations/*`. |
| `pageSize` | query | integer (int32) | no | Optional. When requesting a 'page' of resources, `page_size` specifies number of resources to return. If unspecified or set to 0, all resources will be returned. |
| `pageToken` | query | string | no | Optional. Token returned by previous call to `ListPermittedScopes` which specifies the position in the list from where to continue listing the resources. |

### `gkehub.projects.locations.scopes.namespaces.create`

- Versions: v1, v1beta, v1alpha
- `POST https://gkehub.googleapis.com/v1/{+parent}/namespaces`
- Creates a fleet namespace.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Namespace`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent (project and location) where the Namespace will be created. Specified in the format `projects/*/locations/*/scopes/*`. |
| `scopeNamespaceId` | query | string | yes | Required. Client chosen ID for the Namespace. `namespace_id` must be a valid RFC 1123 compliant DNS label: 1. At most 63 characters in length 2. It must consist of lower case alphanumeric characters or `-` 3. It must start and end with an alphanumeric character Which can be expressed as the regex: `[a-z0-9]([-a-z0-9]*[a-z0-9])?`, with a maximum length of 63 characters. |

### `gkehub.projects.locations.scopes.namespaces.delete`

- Versions: v1, v1beta, v1alpha
- `DELETE https://gkehub.googleapis.com/v1/{+name}`
- Deletes a fleet namespace.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The Namespace resource name in the format `projects/*/locations/*/scopes/*/namespaces/*`. |

### `gkehub.projects.locations.scopes.namespaces.get`

- Versions: v1, v1beta, v1alpha
- `GET https://gkehub.googleapis.com/v1/{+name}`
- Returns the details of a fleet namespace.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Namespace`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The Namespace resource name in the format `projects/*/locations/*/scopes/*/namespaces/*`. |

### `gkehub.projects.locations.scopes.namespaces.list`

- Versions: v1, v1beta, v1alpha
- `GET https://gkehub.googleapis.com/v1/{+parent}/namespaces`
- Lists fleet namespaces.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListScopeNamespacesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent (project and location) where the Features will be listed. Specified in the format `projects/*/locations/*/scopes/*`. |
| `pageSize` | query | integer (int32) | no | Optional. When requesting a 'page' of resources, `page_size` specifies number of resources to return. If unspecified or set to 0, all resources will be returned. |
| `pageToken` | query | string | no | Optional. Token returned by previous call to `ListFeatures` which specifies the position in the list from where to continue listing the resources. |

### `gkehub.projects.locations.scopes.namespaces.patch`

- Versions: v1, v1beta, v1alpha
- `PATCH https://gkehub.googleapis.com/v1/{+name}`
- Updates a fleet namespace.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Namespace`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The resource name for the namespace `projects/{project}/locations/{location}/namespaces/{namespace}` |
| `updateMask` | query | string (google-fieldmask) | yes | Required. The fields to be updated. |

### `gkehub.projects.locations.scopes.patch`

- Versions: v1, v1beta, v1alpha
- `PATCH https://gkehub.googleapis.com/v1/{+name}`
- Updates a scopes.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Scope`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The resource name for the scope `projects/{project}/locations/{location}/scopes/{scope}` |
| `updateMask` | query | string (google-fieldmask) | yes | Required. The fields to be updated. |

### `gkehub.projects.locations.scopes.rbacrolebindings.create`

- Versions: v1, v1beta, v1alpha
- `POST https://gkehub.googleapis.com/v1/{+parent}/rbacrolebindings`
- Creates a Scope RBACRoleBinding.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `RBACRoleBinding`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent (project and location) where the RBACRoleBinding will be created. Specified in the format `projects/*/locations/*/scopes/*`. |
| `rbacrolebindingId` | query | string | yes | Required. Client chosen ID for the RBACRoleBinding. `rbacrolebinding_id` must be a valid RFC 1123 compliant DNS label: 1. At most 63 characters in length 2. It must consist of lower case alphanumeric characters or `-` 3. It must start and end with an alphanumeric character Which can be expressed as the regex: `[a-z0-9]([-a-z0-9]*[a-z0-9])?`, with a maximum length of 63 characters. |

### `gkehub.projects.locations.scopes.rbacrolebindings.delete`

- Versions: v1, v1beta, v1alpha
- `DELETE https://gkehub.googleapis.com/v1/{+name}`
- Deletes a Scope RBACRoleBinding.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The RBACRoleBinding resource name in the format `projects/*/locations/*/scopes/*/rbacrolebindings/*`. |

### `gkehub.projects.locations.scopes.rbacrolebindings.get`

- Versions: v1, v1beta, v1alpha
- `GET https://gkehub.googleapis.com/v1/{+name}`
- Returns the details of a Scope RBACRoleBinding.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `RBACRoleBinding`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The RBACRoleBinding resource name in the format `projects/*/locations/*/scopes/*/rbacrolebindings/*`. |

### `gkehub.projects.locations.scopes.rbacrolebindings.list`

- Versions: v1, v1beta, v1alpha
- `GET https://gkehub.googleapis.com/v1/{+parent}/rbacrolebindings`
- Lists all Scope RBACRoleBindings.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListScopeRBACRoleBindingsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent (project and location) where the Features will be listed. Specified in the format `projects/*/locations/*/scopes/*`. |
| `pageSize` | query | integer (int32) | no | Optional. When requesting a 'page' of resources, `page_size` specifies number of resources to return. If unspecified or set to 0, all resources will be returned. |
| `pageToken` | query | string | no | Optional. Token returned by previous call to `ListScopeRBACRoleBindings` which specifies the position in the list from where to continue listing the resources. |

### `gkehub.projects.locations.scopes.rbacrolebindings.patch`

- Versions: v1, v1beta, v1alpha
- `PATCH https://gkehub.googleapis.com/v1/{+name}`
- Updates a Scope RBACRoleBinding.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `RBACRoleBinding`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The resource name for the rbacrolebinding `projects/{project}/locations/{location}/scopes/{scope}/rbacrolebindings/{rbacrolebinding}` or `projects/{project}/locations/{location}/memberships/{membership}/rbacrolebindings/{rbacrolebinding}` |
| `updateMask` | query | string (google-fieldmask) | yes | Required. The fields to be updated. |

### `gkehub.projects.locations.scopes.setIamPolicy`

- Versions: v1, v1beta, v1alpha
- `POST https://gkehub.googleapis.com/v1/{+resource}:setIamPolicy`
- Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `SetIamPolicyRequest`; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `gkehub.projects.locations.scopes.testIamPermissions`

- Versions: v1, v1beta, v1alpha
- `POST https://gkehub.googleapis.com/v1/{+resource}:testIamPermissions`
- Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `TestIamPermissionsRequest`; Response: `TestIamPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### Example request skeleton

Generated from the Discovery entry of `gkehub.organizations.locations.fleets.list` (not in the official docs); replace the `{...}` path variables (URL-encode query values):

```bash
curl -X GET \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  "https://gkehub.googleapis.com/v1/{+parent}/fleets"
```

## Notes

- Generated from the Discovery document(s) v2, v1, v2beta, v1beta1, v1beta, v2alpha, v1alpha of `gkehub` (retrieved 2026-11-14). Resources on this page: organizations, projects.
- The Required column is `yes` for path variables and required parameters, and `conditional` when the description says "Required if ..." (mutually exclusive alternatives), when a `parent.child` parameter is required only inside an optional parent message or one branch of a oneof. Path variables are `yes` unless a note below names an alternative route without them.
- Message schemas (the request and response types named above) are defined in the `schemas` section of the Discovery documents in Source.
- Corrected from the official docs (the Discovery text above is verbatim): the fleet namespace resource name (the `name` field of the `Namespace` type and the `name` parameter of `gkehub.projects.locations.scopes.namespaces.patch`) is described as `projects/{project}/locations/{location}/namespaces/{namespace}`, but the Discovery path pattern of the `scopes.namespaces` methods is `projects/[^/]+/locations/[^/]+/scopes/[^/]+/namespaces/[^/]+`; use `projects/{project}/locations/{location}/scopes/{scope}/namespaces/{namespace}`.
- Adapted from the official docs: Google-internal `go/aip/N` links in the Discovery descriptions are replaced with the public AIP pages `https://google.aip.dev/N`.
- Source: https://gkehub.googleapis.com/$discovery/rest?version=v2, https://gkehub.googleapis.com/$discovery/rest?version=v1, https://gkehub.googleapis.com/$discovery/rest?version=v2beta, https://gkehub.googleapis.com/$discovery/rest?version=v1beta1, https://gkehub.googleapis.com/$discovery/rest?version=v1beta, https://gkehub.googleapis.com/$discovery/rest?version=v2alpha, https://gkehub.googleapis.com/$discovery/rest?version=v1alpha (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
