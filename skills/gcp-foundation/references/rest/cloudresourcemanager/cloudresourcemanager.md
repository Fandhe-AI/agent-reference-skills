---
source: https://cloudresourcemanager.googleapis.com/$discovery/rest?version=v3
---

# Cloud Resource Manager API REST API (cloudresourcemanager)

## Signature / Usage

Base URL: `https://cloudresourcemanager.googleapis.com`. Methods are listed by `id`; the `Versions` line shows which API versions define the method (preferred: v3).

### `cloudresourcemanager.effectiveTags.list`

- Versions: v3
- `GET https://cloudresourcemanager.googleapis.com/v3/effectiveTags`
- Return a list of effective tags for the given Google Cloud resource, as specified in `parent`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: —; Response: `ListEffectiveTagsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of effective tags to return in the response. The server allows a maximum of 300 effective tags to return in a single page. If unspecified, the server will use 100 as the default. |
| `pageToken` | query | string | no | Optional. A pagination token returned from a previous call to `ListEffectiveTags` that indicates from where this listing should continue. |
| `parent` | query | string | no | Required. The full resource name of a resource for which you want to list the effective tags. E.g. "//cloudresourcemanager.googleapis.com/projects/123" |

### `cloudresourcemanager.folders.boundaries.create`

- Versions: v3
- `POST https://cloudresourcemanager.googleapis.com/v3/{+parent}/boundaries`
- Creates a Boundary under a parent Folder or Organization. Creating a Boundary triggers the creation of a Management Project if one is not supplied.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Boundary`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource under which the Boundary will be created. Format: `organizations/{organization_id}` or `folders/{folder_id}` |
| `boundaryId` | query | string | no | Required. The user-assigned ID for the Boundary, which will become the final component of the Boundary's resource name. Must be unique within the parent resource. It must be 6 to 30 lowercase ASCII letters, digits, or hyphens. It must start with a letter. Trailing hyphens are prohibited. Example: `… |

### `cloudresourcemanager.folders.boundaries.delete`

- Versions: v3
- `DELETE https://cloudresourcemanager.googleapis.com/v3/{+name}`
- Deletes the Boundary identified by the specified `name` (for example, `folders/123456789/boundaries/my-boundary`).
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the Boundary to delete. Format: `organizations/{organization_id}/boundaries/{boundary_id}` or `folders/{folder_id}/boundaries/{boundary_id}` |

### `cloudresourcemanager.folders.boundaries.get`

- Versions: v3
- `GET https://cloudresourcemanager.googleapis.com/v3/{+name}`
- Retrieves the Boundary identified by the specified `name` (for example, `folders/123456789/boundaries/my-boundary`).
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: —; Response: `Boundary`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the Boundary to retrieve. Format: `organizations/{organization_id}/boundaries/{boundary_id}` or `folders/{folder_id}/boundaries/{boundary_id}` Example: `folders/123456789/boundaries/my-boundary` |

### `cloudresourcemanager.folders.boundaries.list`

- Versions: v3
- `GET https://cloudresourcemanager.googleapis.com/v3/{+parent}/boundaries`
- Lists Boundaries that are direct children of the specified organization or folder resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: —; Response: `ListBoundariesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The name of the parent resource whose Boundaries are being listed. Format: `organizations/{organization_id}` or `folders/{folder_id}` |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of Boundaries to return in the response. The service may return fewer Boundaries than requested. If unspecified, at most 100 Boundaries will be returned. The maximum value is 100; values above 100 will be coerced to 100. |
| `pageToken` | query | string | no | Optional. A pagination token received from a previous call to `ListBoundaries` that indicates from where listing should continue. Provide this to retrieve the subsequent page. |

### `cloudresourcemanager.folders.boundaries.patch`

- Versions: v3
- `PATCH https://cloudresourcemanager.googleapis.com/v3/{+name}`
- Updates the `display_name` and `resource_filter.tag_filter.tag_value` of the Boundary identified by the specified `name` (for example, `folders/123456789/boundaries/my-boundary`).
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Boundary`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. The unique resource name of the Boundary. Format: - `organizations/{organization_id}/boundaries/{boundary_id}` - `folders/{folder_id}/boundaries/{boundary_id}` Example: `folders/123456789/boundaries/my-boundary` |
| `updateMask` | query | string (google-fieldmask) | no | Optional. The list of fields to update. |

### `cloudresourcemanager.folders.capabilities.get`

- Versions: v3
- `GET https://cloudresourcemanager.googleapis.com/v3/{+name}`
- Retrieves the Capability identified by the supplied resource name.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Capability`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the capability to get. For example, `folders/123/capabilities/app-management` |

### `cloudresourcemanager.folders.capabilities.patch`

- Versions: v3
- `PATCH https://cloudresourcemanager.googleapis.com/v3/{+name}`
- Updates the Capability.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Capability`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Immutable. Identifier. The resource name of the capability. Must be in the following form: \* `folders/{folder_id}/capabilities/{capability_name}` For example, `folders/123/capabilities/app-management` Following are the allowed {capability_name} values: \* `app-management` |
| `updateMask` | query | string (google-fieldmask) | no | Optional. The list of fields to update. Only [Capability.value] can be updated. |

### `cloudresourcemanager.folders.capabilityConfigs.create`

- Versions: v3
- `POST https://cloudresourcemanager.googleapis.com/v3/{+parent}/capabilityConfigs`
- Creates a CapabilityConfig under a parent Organization, Folder or Project. Creating a CapabilityConfig triggers the creation of a Management Project if one is not supplied.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `CapabilityConfig`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource under which the CapabilityConfig will be created. Format: `organizations/{organization_id}` or `folders/{folder_id}` or `projects/{project_number}` |
| `capabilityConfigId` | query | string | no | Required. The user-assigned ID for the CapabilityConfig, which will become the final component of the CapabilityConfig's resource name. Must be unique within the parent resource. It must be 6 to 30 lowercase ASCII letters, digits, or hyphens. It must start with a letter. Trailing hyphens are prohib… |

### `cloudresourcemanager.folders.capabilityConfigs.delete`

- Versions: v3
- `DELETE https://cloudresourcemanager.googleapis.com/v3/{+name}`
- Deletes the CapabilityConfig identified by the specified `name` (for example, `folders/123456789/capabilityConfigs/my-capability-config`).
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the CapabilityConfig to delete. Format: `organizations/{organization}/capabilityConfigs/{capabilityConfig}` or, `folders/{folder}/capabilityConfigs/{capabilityConfig}` or, `projects/{project}/capabilityConfigs/{capabilityConfig}` |

### `cloudresourcemanager.folders.capabilityConfigs.get`

- Versions: v3
- `GET https://cloudresourcemanager.googleapis.com/v3/{+name}`
- Retrieves the CapabilityConfig identified by the specified `name` (for example, `folders/123456789/capabilityConfigs/my-capability-config`).
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: —; Response: `CapabilityConfig`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the CapabilityConfig to retrieve. Format: `organizations/{organization}/capabilityConfigs/{capabilityConfig}` or, `folders/{folder}/capabilityConfigs/{capabilityConfig}` or, `projects/{project}/capabilityConfigs/{capabilityConfig}` Example: `folders/123456789/capabilityConfigs… |

### `cloudresourcemanager.folders.capabilityConfigs.list`

- Versions: v3
- `GET https://cloudresourcemanager.googleapis.com/v3/{+parent}/capabilityConfigs`
- Lists CapabilityConfigs that are direct children of the specified organization, folder or project resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: —; Response: `ListCapabilityConfigsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The name of the parent resource whose CapabilityConfigs are being listed. Format: `organizations/{organization_id}` or `folders/{folder_id}` |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of CapabilityConfigs to return in the response. The service may return fewer CapabilityConfigs than requested. If unspecified, at most 100 CapabilityConfigs will be returned. The maximum value is 100; values above 100 will be coerced to 100. |
| `pageToken` | query | string | no | Optional. A pagination token received from a previous call to `ListCapabilityConfigs` that indicates from where listing should continue. Provide this to retrieve the subsequent page. |

### `cloudresourcemanager.folders.capabilityConfigs.patch`

- Versions: v3
- `PATCH https://cloudresourcemanager.googleapis.com/v3/{+name}`
- Updates the `display_name`, `types` and `boundaries` of the CapabilityConfig identified by the specified `name` (for example, `folders/123456789/capabilityConfigs/my-capability-config`).
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `CapabilityConfig`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. The unique resource name of the CapabilityConfig. Format: `organizations/{organization}/capabilityConfigs/{capabilityConfig}` or, `folders/{folder}/capabilityConfigs/{capabilityConfig}` or, `projects/{project}/capabilityConfigs/{capabilityConfig}` |
| `updateMask` | query | string (google-fieldmask) | no | Optional. The list of fields to update. |

### `cloudresourcemanager.folders.clearOrgPolicy`

- Versions: v1
- `POST https://cloudresourcemanager.googleapis.com/v1/{+resource}:clearOrgPolicy`
- Clears a `Policy` from a resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `ClearOrgPolicyRequest`; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | Name of the resource for the `Policy` to clear. |

### `cloudresourcemanager.folders.create`

- Versions: v3, v2, v2beta1
- `POST https://cloudresourcemanager.googleapis.com/v3/folders`
- Creates a folder in the resource hierarchy. Returns an `Operation` which can be used to track the progress of the folder creation workflow. Upon success, the `Operation.response` field will be populated with the created Folder. In order to succeed, the addition of this new folder must not violate the folder naming, height, or fanout constraints. + The folder's `display_name` must be distinct from…
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Folder`; Response: `Operation`

### `cloudresourcemanager.folders.delete`

- Versions: v3, v2, v2beta1
- `DELETE https://cloudresourcemanager.googleapis.com/v3/{+name}`
- Requests deletion of a folder. The folder is moved into the DELETE_REQUESTED state immediately, and is deleted approximately 30 days later. This method may only be called on an empty folder, where a folder is empty if it doesn't contain any folders or projects in the ACTIVE state. If called on a folder in DELETE_REQUESTED state the operation will result in a no-op success. The caller must have `r…
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the folder to be deleted. Must be of the form `folders/{folder_id}`. |

### `cloudresourcemanager.folders.get`

- Versions: v3, v2, v2beta1
- `GET https://cloudresourcemanager.googleapis.com/v3/{+name}`
- Retrieves a folder identified by the supplied resource name. Valid folder resource names have the format `folders/{folder_id}` (for example, `folders/1234`). The caller must have `resourcemanager.folders.get` permission on the identified folder.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: —; Response: `Folder`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the folder to retrieve. Must be of the form `folders/{folder_id}`. |

### `cloudresourcemanager.folders.getBoundaryConfig`

- Versions: v3
- `GET https://cloudresourcemanager.googleapis.com/v3/{+name}`
- Retrieves the BoundaryConfig identified by the specified `name` (for example, `folders/123456789/boundaryConfig`).
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: —; Response: `BoundaryConfig`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the BoundaryConfig to retrieve. Format: `organizations/{organization}/boundaryConfig` or `folders/{folder}/boundaryConfig` Example: `folders/123456789/boundaryConfig` |

### `cloudresourcemanager.folders.getEffectiveOrgPolicy`

- Versions: v1
- `POST https://cloudresourcemanager.googleapis.com/v1/{+resource}:getEffectiveOrgPolicy`
- Gets the effective `Policy` on a resource. This is the result of merging `Policies` in the resource hierarchy. The returned `Policy` will not have an `etag`set because it is a computed `Policy` across multiple resources. Subtrees of Resource Manager resource hierarchy with 'under:' prefix will not be expanded.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: `GetEffectiveOrgPolicyRequest`; Response: `OrgPolicy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | The name of the resource to start computing the effective `Policy`. |

### `cloudresourcemanager.folders.getIamPolicy`

- Versions: v3, v2, v2beta1
- `POST https://cloudresourcemanager.googleapis.com/v3/{+resource}:getIamPolicy`
- Gets the access control policy for a folder. The returned policy may be empty if no such policy or resource exists. The `resource` field should be the folder's resource name, for example: "folders/1234". The caller must have `resourcemanager.folders.getIamPolicy` permission on the identified folder.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: `GetIamPolicyRequest`; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `cloudresourcemanager.folders.getOrgPolicy`

- Versions: v1
- `POST https://cloudresourcemanager.googleapis.com/v1/{+resource}:getOrgPolicy`
- Gets a `Policy` on a resource. If no `Policy` is set on the resource, a `Policy` is returned with default values including `POLICY_TYPE_NOT_SET` for the `policy_type oneof`. The `etag` value can be used with `SetOrgPolicy()` to create or update a `Policy` during read-modify-write.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: `GetOrgPolicyRequest`; Response: `OrgPolicy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | Name of the resource the `Policy` is set on. |

### `cloudresourcemanager.folders.list`

- Versions: v3, v2, v2beta1
- `GET https://cloudresourcemanager.googleapis.com/v3/folders`
- Lists the folders that are direct descendants of supplied parent resource. `list()` provides a strongly consistent view of the folders underneath the specified parent resource. `list()` returns folders sorted based upon the (ascending) lexical ordering of their display_name. The caller must have `resourcemanager.folders.list` permission on the identified parent.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: —; Response: `ListFoldersResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of folders to return in the response. The server can return fewer folders than requested. If unspecified, server picks an appropriate default. |
| `pageToken` | query | string | no | Optional. A pagination token returned from a previous call to `ListFolders` that indicates where this listing should continue from. |
| `parent` | query | string | no | Required. The name of the parent resource whose folders are being listed. Only children of this parent resource are listed; descendants are not listed. If the parent is a folder, use the value `folders/{folder_id}`. If the parent is an organization, use the value `organizations/{org_id}`. Access to… |
| `showDeleted` | query | boolean | no | Optional. Controls whether folders in the DELETE_REQUESTED state should be returned. Defaults to false. |

### `cloudresourcemanager.folders.listAvailableOrgPolicyConstraints`

- Versions: v1
- `POST https://cloudresourcemanager.googleapis.com/v1/{+resource}:listAvailableOrgPolicyConstraints`
- Lists `Constraints` that could be applied on the specified resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: `ListAvailableOrgPolicyConstraintsRequest`; Response: `ListAvailableOrgPolicyConstraintsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | Name of the resource to list `Constraints` for. |

### `cloudresourcemanager.folders.listOrgPolicies`

- Versions: v1
- `POST https://cloudresourcemanager.googleapis.com/v1/{+resource}:listOrgPolicies`
- Lists all the `Policies` set for a particular resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: `ListOrgPoliciesRequest`; Response: `ListOrgPoliciesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | Name of the resource to list Policies for. |

### `cloudresourcemanager.folders.move`

- Versions: v3, v2, v2beta1
- `POST https://cloudresourcemanager.googleapis.com/v3/{+name}:move`
- Moves a folder under a new resource parent. Returns an `Operation` which can be used to track the progress of the folder move workflow. Upon success, the `Operation.response` field will be populated with the moved folder. Upon failure, a `FolderOperationError` categorizing the failure cause will be returned - if the failure occurs synchronously then the `FolderOperationError` will be returned in …
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `MoveFolderRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the Folder to move. Must be of the form folders/{folder_id} |

### `cloudresourcemanager.folders.patch`

- Versions: v3, v2, v2beta1
- `PATCH https://cloudresourcemanager.googleapis.com/v3/{+name}`
- Updates a folder, changing its `display_name`. Changes to the folder `display_name` will be rejected if they violate either the `display_name` formatting rules or the naming constraints described in the CreateFolder documentation. The folder's `display_name` must start and end with a letter or digit, may contain letters, digits, spaces, hyphens and underscores and can be between 3 and 30 characte…
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Folder`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. The resource name of the folder. Its format is `folders/{folder_id}`, for example: "folders/1234". |
| `updateMask` | query | string (google-fieldmask) | no | Required. Fields to be updated. Only the `display_name` can be updated. |

### `cloudresourcemanager.folders.search`

- Versions: v3, v2, v2beta1
- `GET https://cloudresourcemanager.googleapis.com/v3/folders:search`
- Searches for folders that match specific filter criteria. `search()` provides an eventually consistent view of the folders a user has access to which meet the specified filter criteria. This will only return folders on which the caller has the permission `resourcemanager.folders.get`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: —; Response: `SearchFoldersResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of folders to return in the response. The server can return fewer folders than requested. If unspecified, server picks an appropriate default. |
| `pageToken` | query | string | no | Optional. A pagination token returned from a previous call to `SearchFolders` that indicates from where search should continue. |
| `query` | query | string | no | Optional. Search criteria used to select the folders to return. If no search criteria is specified then all accessible folders will be returned. Query expressions can be used to restrict results based upon displayName, state and parent, where the operators `=` (`:`) `NOT`, `AND` and `OR` can be use… |

### `cloudresourcemanager.folders.setIamPolicy`

- Versions: v3, v2, v2beta1
- `POST https://cloudresourcemanager.googleapis.com/v3/{+resource}:setIamPolicy`
- Sets the access control policy on a folder, replacing any existing policy. The `resource` field should be the folder's resource name, for example: "folders/1234". The caller must have `resourcemanager.folders.setIamPolicy` permission on the identified folder.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `SetIamPolicyRequest`; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `cloudresourcemanager.folders.setOrgPolicy`

- Versions: v1
- `POST https://cloudresourcemanager.googleapis.com/v1/{+resource}:setOrgPolicy`
- Updates the specified `Policy` on the resource. Creates a new `Policy` for that `Constraint` on the resource if one does not exist. Not supplying an `etag` on the request `Policy` results in an unconditional write of the `Policy`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `SetOrgPolicyRequest`; Response: `OrgPolicy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | Resource name of the resource to attach the `Policy`. |

### `cloudresourcemanager.folders.testIamPermissions`

- Versions: v3, v2, v2beta1
- `POST https://cloudresourcemanager.googleapis.com/v3/{+resource}:testIamPermissions`
- Returns permissions that a caller has on the specified folder. The `resource` field should be the folder's resource name, for example: "folders/1234". There are no permissions required for making this API call.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `TestIamPermissionsRequest`; Response: `TestIamPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `cloudresourcemanager.folders.undelete`

- Versions: v3, v2, v2beta1
- `POST https://cloudresourcemanager.googleapis.com/v3/{+name}:undelete`
- Cancels the deletion request for a folder. This method may be called on a folder in any state. If the folder is in the ACTIVE state the result will be a no-op success. In order to succeed, the folder's parent must be in the ACTIVE state. In addition, reintroducing the folder into the tree must not violate folder naming, height, and fanout constraints described in the CreateFolder documentation. T…
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `UndeleteFolderRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the folder to undelete. Must be of the form `folders/{folder_id}`. |

### `cloudresourcemanager.folders.updateBoundaryConfig`

- Versions: v3
- `PATCH https://cloudresourcemanager.googleapis.com/v3/{+name}`
- Updates the BoundaryConfig identified by the specified `name` (for example, `folders/123456789/boundaryConfig`).
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `BoundaryConfig`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. The unique resource name of the BoundaryConfig. Format: - `organizations/{organization}/boundaryConfig` - `folders/{folder}/boundaryConfig` Example: `folders/123456789/boundaryConfig` |
| `updateMask` | query | string (google-fieldmask) | no | Optional. The list of fields to update. |

### `cloudresourcemanager.liens.create`

- Versions: v3, v1
- `POST https://cloudresourcemanager.googleapis.com/v3/liens`
- Creates a Lien which applies to the resource denoted by the `parent` field. Callers of this method will require permission on the `parent` resource. For example, applying to `projects/1234` requires permission `resourcemanager.projects.updateLiens`. NOTE: Some resources may limit the number of Liens which may be applied.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: `Lien`; Response: `Lien`

### `cloudresourcemanager.liens.delete`

- Versions: v3, v1
- `DELETE https://cloudresourcemanager.googleapis.com/v3/{+name}`
- Deletes a Lien by `name`. Callers of this method will require permission on the `parent` resource. For example, a Lien with a `parent` of `projects/1234` requires permission `resourcemanager.projects.updateLiens`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name/identifier of the Lien to delete. |

### `cloudresourcemanager.liens.get`

- Versions: v3, v1
- `GET https://cloudresourcemanager.googleapis.com/v3/{+name}`
- Retrieves a Lien by `name`. Callers of this method will require permission on the `parent` resource. For example, a Lien with a `parent` of `projects/1234` requires permission `resourcemanager.projects.get`
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: —; Response: `Lien`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name/identifier of the Lien. |

### `cloudresourcemanager.liens.list`

- Versions: v3, v1
- `GET https://cloudresourcemanager.googleapis.com/v3/liens`
- Lists all Liens applied to the `parent` resource. Callers of this method will require permission on the `parent` resource. For example, a Lien with a `parent` of `projects/1234` requires permission `resourcemanager.projects.get`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: —; Response: `ListLiensResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `pageSize` | query | integer (int32) | no | The maximum number of items to return. This is a suggestion for the server. The server can return fewer liens than requested. If unspecified, server picks an appropriate default. |
| `pageToken` | query | string | no | The `next_page_token` value returned from a previous List request, if any. |
| `parent` | query | string | no | Required. The name of the resource to list all attached Liens. For example, `projects/1234`. (google.api.field_policy).resource_type annotation is not set since the parent depends on the meta api implementation. This field could be a project or other sub project resources. |

### `cloudresourcemanager.locations.effectiveTagBindingCollections.get`

- Versions: v3
- `GET https://cloudresourcemanager.googleapis.com/v3/{+name}`
- Returns effective tag bindings on a GCP resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: —; Response: `EffectiveTagBindingCollection`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The full name of the EffectiveTagBindingCollection in format: `locations/{location}/effectiveTagBindingCollections/{encoded-full-resource-name}` where the encoded-full-resource-name is the UTF-8 encoded name of the resource the TagBindings are bound to. E.g. "locations/global/effectiveTag… |

### `cloudresourcemanager.locations.tagBindingCollections.get`

- Versions: v3
- `GET https://cloudresourcemanager.googleapis.com/v3/{+name}`
- Returns tag bindings directly attached to a GCP resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: —; Response: `TagBindingCollection`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The full name of the TagBindingCollection in format: `locations/{location}/tagBindingCollections/{encoded-full-resource-name}` where the enoded-full-resource-name is the UTF-8 encoded name of the resource the TagBindings are bound to. E.g. "locations/global/tagBindingCollections/%2f%2fclo… |

### `cloudresourcemanager.locations.tagBindingCollections.patch`

- Versions: v3
- `PATCH https://cloudresourcemanager.googleapis.com/v3/{+name}`
- Updates tag bindings directly attached to a GCP resource. Update_mask can be kept empty or "\*".
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `TagBindingCollection`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. The name of the TagBindingCollection, following the convention: `locations/{location}/tagBindingCollections/{encoded-full-resource-name}` where the encoded-full-resource-name is the UTF-8 encoded name of the GCP resource the TagBindings are bound to. "locations/global/tagBindingCollecti… |
| `updateMask` | query | string (google-fieldmask) | no | Optional. An update mask to selectively update fields. |

### `cloudresourcemanager.operations.get`

- Versions: v3, v2, v1, v2beta1
- `GET https://cloudresourcemanager.googleapis.com/v3/{+name}`
- Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource. |

### `cloudresourcemanager.organizations.boundaries.create`

- Versions: v3
- `POST https://cloudresourcemanager.googleapis.com/v3/{+parent}/boundaries`
- Creates a Boundary under a parent Folder or Organization. Creating a Boundary triggers the creation of a Management Project if one is not supplied.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Boundary`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource under which the Boundary will be created. Format: `organizations/{organization_id}` or `folders/{folder_id}` |
| `boundaryId` | query | string | no | Required. The user-assigned ID for the Boundary, which will become the final component of the Boundary's resource name. Must be unique within the parent resource. It must be 6 to 30 lowercase ASCII letters, digits, or hyphens. It must start with a letter. Trailing hyphens are prohibited. Example: `… |

### `cloudresourcemanager.organizations.boundaries.delete`

- Versions: v3
- `DELETE https://cloudresourcemanager.googleapis.com/v3/{+name}`
- Deletes the Boundary identified by the specified `name` (for example, `folders/123456789/boundaries/my-boundary`).
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the Boundary to delete. Format: `organizations/{organization_id}/boundaries/{boundary_id}` or `folders/{folder_id}/boundaries/{boundary_id}` |

### `cloudresourcemanager.organizations.boundaries.get`

- Versions: v3
- `GET https://cloudresourcemanager.googleapis.com/v3/{+name}`
- Retrieves the Boundary identified by the specified `name` (for example, `folders/123456789/boundaries/my-boundary`).
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: —; Response: `Boundary`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the Boundary to retrieve. Format: `organizations/{organization_id}/boundaries/{boundary_id}` or `folders/{folder_id}/boundaries/{boundary_id}` Example: `folders/123456789/boundaries/my-boundary` |

### `cloudresourcemanager.organizations.boundaries.list`

- Versions: v3
- `GET https://cloudresourcemanager.googleapis.com/v3/{+parent}/boundaries`
- Lists Boundaries that are direct children of the specified organization or folder resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: —; Response: `ListBoundariesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The name of the parent resource whose Boundaries are being listed. Format: `organizations/{organization_id}` or `folders/{folder_id}` |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of Boundaries to return in the response. The service may return fewer Boundaries than requested. If unspecified, at most 100 Boundaries will be returned. The maximum value is 100; values above 100 will be coerced to 100. |
| `pageToken` | query | string | no | Optional. A pagination token received from a previous call to `ListBoundaries` that indicates from where listing should continue. Provide this to retrieve the subsequent page. |

### `cloudresourcemanager.organizations.boundaries.patch`

- Versions: v3
- `PATCH https://cloudresourcemanager.googleapis.com/v3/{+name}`
- Updates the `display_name` and `resource_filter.tag_filter.tag_value` of the Boundary identified by the specified `name` (for example, `folders/123456789/boundaries/my-boundary`).
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Boundary`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. The unique resource name of the Boundary. Format: - `organizations/{organization_id}/boundaries/{boundary_id}` - `folders/{folder_id}/boundaries/{boundary_id}` Example: `folders/123456789/boundaries/my-boundary` |
| `updateMask` | query | string (google-fieldmask) | no | Optional. The list of fields to update. |

### `cloudresourcemanager.organizations.capabilityConfigs.create`

- Versions: v3
- `POST https://cloudresourcemanager.googleapis.com/v3/{+parent}/capabilityConfigs`
- Creates a CapabilityConfig under a parent Organization, Folder or Project. Creating a CapabilityConfig triggers the creation of a Management Project if one is not supplied.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `CapabilityConfig`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource under which the CapabilityConfig will be created. Format: `organizations/{organization_id}` or `folders/{folder_id}` or `projects/{project_number}` |
| `capabilityConfigId` | query | string | no | Required. The user-assigned ID for the CapabilityConfig, which will become the final component of the CapabilityConfig's resource name. Must be unique within the parent resource. It must be 6 to 30 lowercase ASCII letters, digits, or hyphens. It must start with a letter. Trailing hyphens are prohib… |

### `cloudresourcemanager.organizations.capabilityConfigs.delete`

- Versions: v3
- `DELETE https://cloudresourcemanager.googleapis.com/v3/{+name}`
- Deletes the CapabilityConfig identified by the specified `name` (for example, `folders/123456789/capabilityConfigs/my-capability-config`).
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the CapabilityConfig to delete. Format: `organizations/{organization}/capabilityConfigs/{capabilityConfig}` or, `folders/{folder}/capabilityConfigs/{capabilityConfig}` or, `projects/{project}/capabilityConfigs/{capabilityConfig}` |

### `cloudresourcemanager.organizations.capabilityConfigs.get`

- Versions: v3
- `GET https://cloudresourcemanager.googleapis.com/v3/{+name}`
- Retrieves the CapabilityConfig identified by the specified `name` (for example, `folders/123456789/capabilityConfigs/my-capability-config`).
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: —; Response: `CapabilityConfig`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the CapabilityConfig to retrieve. Format: `organizations/{organization}/capabilityConfigs/{capabilityConfig}` or, `folders/{folder}/capabilityConfigs/{capabilityConfig}` or, `projects/{project}/capabilityConfigs/{capabilityConfig}` Example: `folders/123456789/capabilityConfigs… |

### `cloudresourcemanager.organizations.capabilityConfigs.list`

- Versions: v3
- `GET https://cloudresourcemanager.googleapis.com/v3/{+parent}/capabilityConfigs`
- Lists CapabilityConfigs that are direct children of the specified organization, folder or project resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: —; Response: `ListCapabilityConfigsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The name of the parent resource whose CapabilityConfigs are being listed. Format: `organizations/{organization_id}` or `folders/{folder_id}` |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of CapabilityConfigs to return in the response. The service may return fewer CapabilityConfigs than requested. If unspecified, at most 100 CapabilityConfigs will be returned. The maximum value is 100; values above 100 will be coerced to 100. |
| `pageToken` | query | string | no | Optional. A pagination token received from a previous call to `ListCapabilityConfigs` that indicates from where listing should continue. Provide this to retrieve the subsequent page. |

### `cloudresourcemanager.organizations.capabilityConfigs.patch`

- Versions: v3
- `PATCH https://cloudresourcemanager.googleapis.com/v3/{+name}`
- Updates the `display_name`, `types` and `boundaries` of the CapabilityConfig identified by the specified `name` (for example, `folders/123456789/capabilityConfigs/my-capability-config`).
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `CapabilityConfig`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. The unique resource name of the CapabilityConfig. Format: `organizations/{organization}/capabilityConfigs/{capabilityConfig}` or, `folders/{folder}/capabilityConfigs/{capabilityConfig}` or, `projects/{project}/capabilityConfigs/{capabilityConfig}` |
| `updateMask` | query | string (google-fieldmask) | no | Optional. The list of fields to update. |

### `cloudresourcemanager.organizations.clearOrgPolicy`

- Versions: v1
- `POST https://cloudresourcemanager.googleapis.com/v1/{+resource}:clearOrgPolicy`
- Clears a `Policy` from a resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `ClearOrgPolicyRequest`; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | Name of the resource for the `Policy` to clear. |

### `cloudresourcemanager.organizations.get`

- Versions: v3, v1, v1beta1
- `GET https://cloudresourcemanager.googleapis.com/v3/{+name}`
- Fetches an organization resource identified by the specified resource name.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: —; Response: `Organization`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the Organization to fetch. This is the organization's relative path in the API, formatted as "organizations/[organizationId]". For example, "organizations/1234". |

### `cloudresourcemanager.organizations.getBoundaryConfig`

- Versions: v3
- `GET https://cloudresourcemanager.googleapis.com/v3/{+name}`
- Retrieves the BoundaryConfig identified by the specified `name` (for example, `folders/123456789/boundaryConfig`).
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: —; Response: `BoundaryConfig`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the BoundaryConfig to retrieve. Format: `organizations/{organization}/boundaryConfig` or `folders/{folder}/boundaryConfig` Example: `folders/123456789/boundaryConfig` |

### `cloudresourcemanager.organizations.getEffectiveOrgPolicy`

- Versions: v1
- `POST https://cloudresourcemanager.googleapis.com/v1/{+resource}:getEffectiveOrgPolicy`
- Gets the effective `Policy` on a resource. This is the result of merging `Policies` in the resource hierarchy. The returned `Policy` will not have an `etag`set because it is a computed `Policy` across multiple resources. Subtrees of Resource Manager resource hierarchy with 'under:' prefix will not be expanded.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: `GetEffectiveOrgPolicyRequest`; Response: `OrgPolicy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | The name of the resource to start computing the effective `Policy`. |

### `cloudresourcemanager.organizations.getIamPolicy`

- Versions: v3, v1, v1beta1
- `POST https://cloudresourcemanager.googleapis.com/v3/{+resource}:getIamPolicy`
- Gets the access control policy for an organization resource. The policy may be empty if no such policy or resource exists. The `resource` field should be the organization's resource name, for example: "organizations/123". Authorization requires the IAM permission `resourcemanager.organizations.getIamPolicy` on the specified organization.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: `GetIamPolicyRequest`; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `cloudresourcemanager.organizations.getOrgPolicy`

- Versions: v1
- `POST https://cloudresourcemanager.googleapis.com/v1/{+resource}:getOrgPolicy`
- Gets a `Policy` on a resource. If no `Policy` is set on the resource, a `Policy` is returned with default values including `POLICY_TYPE_NOT_SET` for the `policy_type oneof`. The `etag` value can be used with `SetOrgPolicy()` to create or update a `Policy` during read-modify-write.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: `GetOrgPolicyRequest`; Response: `OrgPolicy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | Name of the resource the `Policy` is set on. |

### `cloudresourcemanager.organizations.list`

- Versions: v1beta1
- `GET https://cloudresourcemanager.googleapis.com/v1beta1/organizations`
- Lists Organization resources that are visible to the user and satisfy the specified filter. This method returns Organizations in an unspecified order. New Organizations do not necessarily appear at the end of the list.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: —; Response: `ListOrganizationsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `filter` | query | string | no | An optional query string used to filter the Organizations to return in the response. Filter rules are case-insensitive. Organizations may be filtered by `owner.directoryCustomerId` or by `domain`, where the domain is a verified G Suite domain, for example: \* Filter `owner.directorycustomerid:123456… |
| `pageSize` | query | integer (int32) | no | The maximum number of Organizations to return in the response. This field is optional. |
| `pageToken` | query | string | no | A pagination token returned from a previous call to `ListOrganizations` that indicates from where listing should continue. This field is optional. |

### `cloudresourcemanager.organizations.listAvailableOrgPolicyConstraints`

- Versions: v1
- `POST https://cloudresourcemanager.googleapis.com/v1/{+resource}:listAvailableOrgPolicyConstraints`
- Lists `Constraints` that could be applied on the specified resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: `ListAvailableOrgPolicyConstraintsRequest`; Response: `ListAvailableOrgPolicyConstraintsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | Name of the resource to list `Constraints` for. |

### `cloudresourcemanager.organizations.listOrgPolicies`

- Versions: v1
- `POST https://cloudresourcemanager.googleapis.com/v1/{+resource}:listOrgPolicies`
- Lists all the `Policies` set for a particular resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: `ListOrgPoliciesRequest`; Response: `ListOrgPoliciesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | Name of the resource to list Policies for. |

### `cloudresourcemanager.organizations.search`

- Versions: v3, v1
- `GET https://cloudresourcemanager.googleapis.com/v3/organizations:search`
- Searches organization resources that are visible to the user and satisfy the specified filter. This method returns organizations in an unspecified order. New organizations do not necessarily appear at the end of the results, and may take a small amount of time to appear. Search will only return organizations on which the user has the permission `resourcemanager.organizations.get` or has super adm…
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: —; Response: `SearchOrganizationsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of organizations to return in the response. The server can return fewer organizations than requested. If unspecified, server picks an appropriate default. |
| `pageToken` | query | string | no | Optional. A pagination token returned from a previous call to `SearchOrganizations` that indicates from where listing should continue. |
| `query` | query | string | no | Optional. An optional query string used to filter the Organizations to return in the response. Query rules are case-insensitive. ``` \| Field \| Description \| \|------------------\|--------------------------------------------\| \| directoryCustomerId, owner.directoryCustomerId \| Filters by directory cust… |

### `cloudresourcemanager.organizations.setIamPolicy`

- Versions: v3, v1, v1beta1
- `POST https://cloudresourcemanager.googleapis.com/v3/{+resource}:setIamPolicy`
- Sets the access control policy on an organization resource. Replaces any existing policy. The `resource` field should be the organization's resource name, for example: "organizations/123". Authorization requires the IAM permission `resourcemanager.organizations.setIamPolicy` on the specified organization.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `SetIamPolicyRequest`; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `cloudresourcemanager.organizations.setOrgPolicy`

- Versions: v1
- `POST https://cloudresourcemanager.googleapis.com/v1/{+resource}:setOrgPolicy`
- Updates the specified `Policy` on the resource. Creates a new `Policy` for that `Constraint` on the resource if one does not exist. Not supplying an `etag` on the request `Policy` results in an unconditional write of the `Policy`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `SetOrgPolicyRequest`; Response: `OrgPolicy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | Resource name of the resource to attach the `Policy`. |

### `cloudresourcemanager.organizations.testIamPermissions`

- Versions: v3, v1, v1beta1
- `POST https://cloudresourcemanager.googleapis.com/v3/{+resource}:testIamPermissions`
- Returns the permissions that a caller has on the specified organization. The `resource` field should be the organization's resource name, for example: "organizations/123". There are no permissions required for making this API call.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: `TestIamPermissionsRequest`; Response: `TestIamPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `cloudresourcemanager.organizations.update`

- Versions: v1beta1
- `PUT https://cloudresourcemanager.googleapis.com/v1beta1/{+name}`
- Updates an Organization resource identified by the specified resource name.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Organization`; Response: `Organization`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Output only. The resource name of the organization. This is the organization's relative path in the API. Its format is "organizations/[organization_id]". For example, "organizations/1234". |

### `cloudresourcemanager.organizations.updateBoundaryConfig`

- Versions: v3
- `PATCH https://cloudresourcemanager.googleapis.com/v3/{+name}`
- Updates the BoundaryConfig identified by the specified `name` (for example, `folders/123456789/boundaryConfig`).
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `BoundaryConfig`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. The unique resource name of the BoundaryConfig. Format: - `organizations/{organization}/boundaryConfig` - `folders/{folder}/boundaryConfig` Example: `folders/123456789/boundaryConfig` |
| `updateMask` | query | string (google-fieldmask) | no | Optional. The list of fields to update. |

### `cloudresourcemanager.projects.capabilityConfigs.create`

- Versions: v3
- `POST https://cloudresourcemanager.googleapis.com/v3/{+parent}/capabilityConfigs`
- Creates a CapabilityConfig under a parent Organization, Folder or Project. Creating a CapabilityConfig triggers the creation of a Management Project if one is not supplied.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `CapabilityConfig`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource under which the CapabilityConfig will be created. Format: `organizations/{organization_id}` or `folders/{folder_id}` or `projects/{project_number}` |
| `capabilityConfigId` | query | string | no | Required. The user-assigned ID for the CapabilityConfig, which will become the final component of the CapabilityConfig's resource name. Must be unique within the parent resource. It must be 6 to 30 lowercase ASCII letters, digits, or hyphens. It must start with a letter. Trailing hyphens are prohib… |

### `cloudresourcemanager.projects.capabilityConfigs.delete`

- Versions: v3
- `DELETE https://cloudresourcemanager.googleapis.com/v3/{+name}`
- Deletes the CapabilityConfig identified by the specified `name` (for example, `folders/123456789/capabilityConfigs/my-capability-config`).
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the CapabilityConfig to delete. Format: `organizations/{organization}/capabilityConfigs/{capabilityConfig}` or, `folders/{folder}/capabilityConfigs/{capabilityConfig}` or, `projects/{project}/capabilityConfigs/{capabilityConfig}` |

### `cloudresourcemanager.projects.capabilityConfigs.get`

- Versions: v3
- `GET https://cloudresourcemanager.googleapis.com/v3/{+name}`
- Retrieves the CapabilityConfig identified by the specified `name` (for example, `folders/123456789/capabilityConfigs/my-capability-config`).
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: —; Response: `CapabilityConfig`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the CapabilityConfig to retrieve. Format: `organizations/{organization}/capabilityConfigs/{capabilityConfig}` or, `folders/{folder}/capabilityConfigs/{capabilityConfig}` or, `projects/{project}/capabilityConfigs/{capabilityConfig}` Example: `folders/123456789/capabilityConfigs… |

### `cloudresourcemanager.projects.capabilityConfigs.list`

- Versions: v3
- `GET https://cloudresourcemanager.googleapis.com/v3/{+parent}/capabilityConfigs`
- Lists CapabilityConfigs that are direct children of the specified organization, folder or project resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: —; Response: `ListCapabilityConfigsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The name of the parent resource whose CapabilityConfigs are being listed. Format: `organizations/{organization_id}` or `folders/{folder_id}` |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of CapabilityConfigs to return in the response. The service may return fewer CapabilityConfigs than requested. If unspecified, at most 100 CapabilityConfigs will be returned. The maximum value is 100; values above 100 will be coerced to 100. |
| `pageToken` | query | string | no | Optional. A pagination token received from a previous call to `ListCapabilityConfigs` that indicates from where listing should continue. Provide this to retrieve the subsequent page. |

### `cloudresourcemanager.projects.capabilityConfigs.patch`

- Versions: v3
- `PATCH https://cloudresourcemanager.googleapis.com/v3/{+name}`
- Updates the `display_name`, `types` and `boundaries` of the CapabilityConfig identified by the specified `name` (for example, `folders/123456789/capabilityConfigs/my-capability-config`).
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `CapabilityConfig`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. The unique resource name of the CapabilityConfig. Format: `organizations/{organization}/capabilityConfigs/{capabilityConfig}` or, `folders/{folder}/capabilityConfigs/{capabilityConfig}` or, `projects/{project}/capabilityConfigs/{capabilityConfig}` |
| `updateMask` | query | string (google-fieldmask) | no | Optional. The list of fields to update. |

### `cloudresourcemanager.projects.clearOrgPolicy`

- Versions: v1
- `POST https://cloudresourcemanager.googleapis.com/v1/{+resource}:clearOrgPolicy`
- Clears a `Policy` from a resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `ClearOrgPolicyRequest`; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | Name of the resource for the `Policy` to clear. |

### `cloudresourcemanager.projects.create`

- Versions: v3, v1, v1beta1
- `POST https://cloudresourcemanager.googleapis.com/v3/projects`
- Requests that a new project be created. The result is an `Operation` which can be used to track the creation process. This process usually takes a few seconds, but can sometimes take much longer. The tracking `Operation` is automatically deleted after a few hours, so there is no need to call `DeleteOperation`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Project`; Response: `Operation`

### `cloudresourcemanager.projects.delete`

- Versions: v3, v1, v1beta1
- `DELETE https://cloudresourcemanager.googleapis.com/v3/{+name}`
- Marks the project identified by the specified `name` (for example, `projects/415104041262`) for deletion. This method will only affect the project if it has a lifecycle state of ACTIVE. This method changes the Project's lifecycle state from ACTIVE to DELETE_REQUESTED. The deletion starts at an unspecified time, at which point the Project is no longer accessible. Until the deletion completes, you …
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the Project (for example, `projects/415104041262`). |

### `cloudresourcemanager.projects.get`

- Versions: v3, v1, v1beta1
- `GET https://cloudresourcemanager.googleapis.com/v3/{+name}`
- Retrieves the project identified by the specified `name` (for example, `projects/415104041262`). The caller must have `resourcemanager.projects.get` permission for this project.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: —; Response: `Project`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the project (for example, `projects/415104041262`). |

### `cloudresourcemanager.projects.getAncestry`

- Versions: v1, v1beta1
- `POST https://cloudresourcemanager.googleapis.com/v1/projects/{projectId}:getAncestry`
- Gets a list of ancestors in the resource hierarchy for the Project identified by the specified `project_id` (for example, `my-project-123`). The caller must have read permissions for this Project.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: `GetAncestryRequest`; Response: `GetAncestryResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `projectId` | path | string | yes | Required. The Project ID (for example, `my-project-123`). |

### `cloudresourcemanager.projects.getEffectiveOrgPolicy`

- Versions: v1
- `POST https://cloudresourcemanager.googleapis.com/v1/{+resource}:getEffectiveOrgPolicy`
- Gets the effective `Policy` on a resource. This is the result of merging `Policies` in the resource hierarchy. The returned `Policy` will not have an `etag`set because it is a computed `Policy` across multiple resources. Subtrees of Resource Manager resource hierarchy with 'under:' prefix will not be expanded.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: `GetEffectiveOrgPolicyRequest`; Response: `OrgPolicy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | The name of the resource to start computing the effective `Policy`. |

### `cloudresourcemanager.projects.getIamPolicy`

- Versions: v3, v1, v1beta1
- `POST https://cloudresourcemanager.googleapis.com/v3/{+resource}:getIamPolicy`
- Returns the IAM access control policy for the specified project, in the format `projects/{ProjectIdOrNumber}`, for example, `projects/123`. Permission is denied if the policy or the resource do not exist.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: `GetIamPolicyRequest`; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `cloudresourcemanager.projects.getOrgPolicy`

- Versions: v1
- `POST https://cloudresourcemanager.googleapis.com/v1/{+resource}:getOrgPolicy`
- Gets a `Policy` on a resource. If no `Policy` is set on the resource, a `Policy` is returned with default values including `POLICY_TYPE_NOT_SET` for the `policy_type oneof`. The `etag` value can be used with `SetOrgPolicy()` to create or update a `Policy` during read-modify-write.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: `GetOrgPolicyRequest`; Response: `OrgPolicy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | Name of the resource the `Policy` is set on. |

### `cloudresourcemanager.projects.list`

- Versions: v3, v1, v1beta1
- `GET https://cloudresourcemanager.googleapis.com/v3/projects`
- Lists projects that are direct children of the specified folder or organization resource. `list()` provides a strongly consistent view of the projects underneath the specified parent resource. `list()` returns projects sorted based upon the (ascending) lexical ordering of their `display_name`. The caller must have `resourcemanager.projects.list` permission on the identified parent.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: —; Response: `ListProjectsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of projects to return in the response. The server can return fewer projects than requested. If unspecified, server picks an appropriate default. |
| `pageToken` | query | string | no | Optional. A pagination token returned from a previous call to ListProjects that indicates from where listing should continue. |
| `parent` | query | string | no | Required. The name of the parent resource whose projects are being listed. Only children of this parent resource are listed; descendants are not listed. If the parent is a folder, use the value `folders/{folder_id}`. If the parent is an organization, use the value `organizations/{org_id}`. |
| `showDeleted` | query | boolean | no | Optional. Indicate that projects in the `DELETE_REQUESTED` state should also be returned. Normally only `ACTIVE` projects are returned. |

### `cloudresourcemanager.projects.listAvailableOrgPolicyConstraints`

- Versions: v1
- `POST https://cloudresourcemanager.googleapis.com/v1/{+resource}:listAvailableOrgPolicyConstraints`
- Lists `Constraints` that could be applied on the specified resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: `ListAvailableOrgPolicyConstraintsRequest`; Response: `ListAvailableOrgPolicyConstraintsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | Name of the resource to list `Constraints` for. |

### `cloudresourcemanager.projects.listOrgPolicies`

- Versions: v1
- `POST https://cloudresourcemanager.googleapis.com/v1/{+resource}:listOrgPolicies`
- Lists all the `Policies` set for a particular resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: `ListOrgPoliciesRequest`; Response: `ListOrgPoliciesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | Name of the resource to list Policies for. |

### `cloudresourcemanager.projects.move`

- Versions: v3
- `POST https://cloudresourcemanager.googleapis.com/v3/{+name}:move`
- Moves a project to another place in your resource hierarchy, under a new resource parent. Returns an operation which can be used to track the process of the project move workflow. Upon success, the `Operation.response` field will be populated with the moved project. The caller must have `resourcemanager.projects.move` permission on the project, on the project's current and proposed new parent. If…
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `MoveProjectRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the project to move. |

### `cloudresourcemanager.projects.patch`

- Versions: v3
- `PATCH https://cloudresourcemanager.googleapis.com/v3/{+name}`
- Updates the `display_name` and labels of the project identified by the specified `name` (for example, `projects/415104041262`). Deleting all labels requires an update mask for labels field. The caller must have `resourcemanager.projects.update` permission for this project.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Project`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Output only. The unique resource name of the project. It is an int64 generated number prefixed by "projects/". Example: `projects/415104041262` |
| `updateMask` | query | string (google-fieldmask) | no | Optional. An update mask to selectively update fields. |

### `cloudresourcemanager.projects.search`

- Versions: v3
- `GET https://cloudresourcemanager.googleapis.com/v3/projects:search`
- Searches for projects on which the caller has the `resourcemanager.projects.get` permission and that match the specified query. This method returns projects in an unspecified order. This method is eventually consistent with project mutations; this means that a newly created project may not appear in the results or recent updates to an existing project may not be reflected in the results. To retri…
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: —; Response: `SearchProjectsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of projects to return in the response. The server can return fewer projects than requested. If unspecified, server picks an appropriate default. |
| `pageToken` | query | string | no | Optional. A pagination token returned from a previous call to ListProjects that indicates from where listing should continue. |
| `query` | query | string | no | Optional. A query string for searching for projects that the caller has `resourcemanager.projects.get` permission to. If multiple fields are included in the query, then it will return results that match any of the fields. Some eligible fields are: ``` \| Field \| Description \| \|----------------------… |

### `cloudresourcemanager.projects.setIamPolicy`

- Versions: v3, v1, v1beta1
- `POST https://cloudresourcemanager.googleapis.com/v3/{+resource}:setIamPolicy`
- Sets the IAM access control policy for the specified project, in the format `projects/{ProjectIdOrNumber}`, for example, `projects/123`. CAUTION: This method will replace the existing policy, and cannot be used to append additional IAM settings. Note: Removing service accounts from policies or changing their roles can render services completely inoperable. It is important to understand how the se…
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `SetIamPolicyRequest`; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `cloudresourcemanager.projects.setOrgPolicy`

- Versions: v1
- `POST https://cloudresourcemanager.googleapis.com/v1/{+resource}:setOrgPolicy`
- Updates the specified `Policy` on the resource. Creates a new `Policy` for that `Constraint` on the resource if one does not exist. Not supplying an `etag` on the request `Policy` results in an unconditional write of the `Policy`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `SetOrgPolicyRequest`; Response: `OrgPolicy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | Resource name of the resource to attach the `Policy`. |

### `cloudresourcemanager.projects.testIamPermissions`

- Versions: v3, v1, v1beta1
- `POST https://cloudresourcemanager.googleapis.com/v3/{+resource}:testIamPermissions`
- Returns permissions that a caller has on the specified project, in the format `projects/{ProjectIdOrNumber}`, for example, `projects/123`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: `TestIamPermissionsRequest`; Response: `TestIamPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `cloudresourcemanager.projects.undelete`

- Versions: v3, v1, v1beta1
- `POST https://cloudresourcemanager.googleapis.com/v3/{+name}:undelete`
- Restores the project identified by the specified `name` (for example, `projects/415104041262`). You can only use this method for a project that has a lifecycle state of DELETE_REQUESTED. After deletion starts, the project cannot be restored. The caller must have `resourcemanager.projects.undelete` permission for this project.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `UndeleteProjectRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the project (for example, `projects/415104041262`). Required. |

### `cloudresourcemanager.projects.update`

- Versions: v1, v1beta1
- `PUT https://cloudresourcemanager.googleapis.com/v1/projects/{projectId}`
- Updates the attributes of the Project identified by the specified `project_id` (for example, `my-project-123`). The caller must have modify permissions for this Project.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Project`; Response: `Project`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `projectId` | path | string | yes | The project ID (for example, `my-project-123`). Required. |

### `cloudresourcemanager.tagBindings.create`

- Versions: v3
- `POST https://cloudresourcemanager.googleapis.com/v3/tagBindings`
- Creates a TagBinding between a TagValue and a Google Cloud resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `TagBinding`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `validateOnly` | query | boolean | no | Optional. Set to true to perform the validations necessary for creating the resource, but not actually perform the action. |

### `cloudresourcemanager.tagBindings.delete`

- Versions: v3
- `DELETE https://cloudresourcemanager.googleapis.com/v3/{+name}`
- Deletes a TagBinding.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the TagBinding. This is a String of the form: `tagBindings/{id}` (e.g. `tagBindings/%2F%2Fcloudresourcemanager.googleapis.com%2Fprojects%2F123/tagValues/456`). |

### `cloudresourcemanager.tagBindings.list`

- Versions: v3
- `GET https://cloudresourcemanager.googleapis.com/v3/tagBindings`
- Lists the TagBindings for the given Google Cloud resource, as specified with `parent`. NOTE: The `parent` field is expected to be a full resource name: https://cloud.google.com/apis/design/resource_names#full_resource_name
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: —; Response: `ListTagBindingsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of TagBindings to return in the response. The server allows a maximum of 300 TagBindings to return. If unspecified, the server will use 100 as the default. |
| `pageToken` | query | string | no | Optional. A pagination token returned from a previous call to `ListTagBindings` that indicates where this listing should continue from. |
| `parent` | query | string | no | Required. The full resource name of a resource for which you want to list existing TagBindings. E.g. "//cloudresourcemanager.googleapis.com/projects/123" |

### `cloudresourcemanager.tagKeys.create`

- Versions: v3
- `POST https://cloudresourcemanager.googleapis.com/v3/tagKeys`
- Creates a new TagKey. If another request with the same parameters is sent while the original request is in process, the second request will receive an error. A maximum of 1000 TagKeys can exist under a parent at any given time.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `TagKey`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `validateOnly` | query | boolean | no | Optional. Set to true to perform validations necessary for creating the resource, but not actually perform the action. |

### `cloudresourcemanager.tagKeys.delete`

- Versions: v3
- `DELETE https://cloudresourcemanager.googleapis.com/v3/{+name}`
- Deletes a TagKey. The TagKey cannot be deleted if it has any child TagValues.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of a TagKey to be deleted in the format `tagKeys/123`. The TagKey cannot be a parent of any existing TagValues or it will not be deleted successfully. |
| `etag` | query | string | no | Optional. The etag known to the client for the expected state of the TagKey. This is to be used for optimistic concurrency. |
| `validateOnly` | query | boolean | no | Optional. Set as true to perform validations necessary for deletion, but not actually perform the action. |

### `cloudresourcemanager.tagKeys.get`

- Versions: v3
- `GET https://cloudresourcemanager.googleapis.com/v3/{+name}`
- Retrieves a TagKey. This method will return `PERMISSION_DENIED` if the key does not exist or the user does not have permission to view it.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: —; Response: `TagKey`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. A resource name in the format `tagKeys/{id}`, such as `tagKeys/123`. |

### `cloudresourcemanager.tagKeys.getIamPolicy`

- Versions: v3
- `POST https://cloudresourcemanager.googleapis.com/v3/{+resource}:getIamPolicy`
- Gets the access control policy for a TagKey. The returned policy may be empty if no such policy or resource exists. The `resource` field should be the TagKey's resource name. For example, "tagKeys/1234". The caller must have `cloudresourcemanager.googleapis.com/tagKeys.getIamPolicy` permission on the specified TagKey.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: `GetIamPolicyRequest`; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `cloudresourcemanager.tagKeys.getNamespaced`

- Versions: v3
- `GET https://cloudresourcemanager.googleapis.com/v3/tagKeys/namespaced`
- Retrieves a TagKey by its namespaced name. This method will return `PERMISSION_DENIED` if the key does not exist or the user does not have permission to view it.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: —; Response: `TagKey`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | query | string | no | Required. A namespaced tag key name in the format `{parentId}/{tagKeyShort}`, such as `42/foo` for a key with short name "foo" under the organization with ID 42 or `r2-d2/bar` for a key with short name "bar" under the project `r2-d2`. |

### `cloudresourcemanager.tagKeys.list`

- Versions: v3
- `GET https://cloudresourcemanager.googleapis.com/v3/tagKeys`
- Lists all TagKeys for a parent resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: —; Response: `ListTagKeysResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of TagKeys to return in the response. The server allows a maximum of 300 TagKeys to return. If unspecified, the server will use 100 as the default. |
| `pageToken` | query | string | no | Optional. A pagination token returned from a previous call to `ListTagKey` that indicates where this listing should continue from. |
| `parent` | query | string | no | Required. The resource name of the TagKey's parent. Must be of the form `organizations/{org_id}` or `projects/{project_id}` or `projects/{project_number}` |

### `cloudresourcemanager.tagKeys.patch`

- Versions: v3
- `PATCH https://cloudresourcemanager.googleapis.com/v3/{+name}`
- Updates the attributes of the TagKey resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `TagKey`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Immutable. The resource name for a TagKey. Must be in the format `tagKeys/{tag_key_id}`, where `tag_key_id` is the generated numeric id for the TagKey. |
| `updateMask` | query | string (google-fieldmask) | no | Fields to be updated. The mask may only contain `description` or `etag`. If omitted entirely, both `description` and `etag` are assumed to be significant. |
| `validateOnly` | query | boolean | no | Set as true to perform validations necessary for updating the resource, but not actually perform the action. |

### `cloudresourcemanager.tagKeys.setIamPolicy`

- Versions: v3
- `POST https://cloudresourcemanager.googleapis.com/v3/{+resource}:setIamPolicy`
- Sets the access control policy on a TagKey, replacing any existing policy. The `resource` field should be the TagKey's resource name. For example, "tagKeys/1234". The caller must have `resourcemanager.tagKeys.setIamPolicy` permission on the identified tagValue.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `SetIamPolicyRequest`; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `cloudresourcemanager.tagKeys.testIamPermissions`

- Versions: v3
- `POST https://cloudresourcemanager.googleapis.com/v3/{+resource}:testIamPermissions`
- Returns permissions that a caller has on the specified TagKey. The `resource` field should be the TagKey's resource name. For example, "tagKeys/1234". There are no permissions required for making this API call.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `TestIamPermissionsRequest`; Response: `TestIamPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `cloudresourcemanager.tagValues.create`

- Versions: v3
- `POST https://cloudresourcemanager.googleapis.com/v3/tagValues`
- Creates a TagValue as a child of the specified TagKey. If a another request with the same parameters is sent while the original request is in process the second request will receive an error. A maximum of 1000 TagValues can exist under a TagKey at any given time.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `TagValue`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `validateOnly` | query | boolean | no | Optional. Set as true to perform the validations necessary for creating the resource, but not actually perform the action. |

### `cloudresourcemanager.tagValues.delete`

- Versions: v3
- `DELETE https://cloudresourcemanager.googleapis.com/v3/{+name}`
- Deletes a TagValue. The TagValue cannot have any bindings when it is deleted.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Resource name for TagValue to be deleted in the format tagValues/456. |
| `etag` | query | string | no | Optional. The etag known to the client for the expected state of the TagValue. This is to be used for optimistic concurrency. |
| `validateOnly` | query | boolean | no | Optional. Set as true to perform the validations necessary for deletion, but not actually perform the action. |

### `cloudresourcemanager.tagValues.get`

- Versions: v3
- `GET https://cloudresourcemanager.googleapis.com/v3/{+name}`
- Retrieves a TagValue. This method will return `PERMISSION_DENIED` if the value does not exist or the user does not have permission to view it.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: —; Response: `TagValue`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Resource name for TagValue to be fetched in the format `tagValues/456`. |

### `cloudresourcemanager.tagValues.getIamPolicy`

- Versions: v3
- `POST https://cloudresourcemanager.googleapis.com/v3/{+resource}:getIamPolicy`
- Gets the access control policy for a TagValue. The returned policy may be empty if no such policy or resource exists. The `resource` field should be the TagValue's resource name. For example: `tagValues/1234`. The caller must have the `cloudresourcemanager.googleapis.com/tagValues.getIamPolicy` permission on the identified TagValue to get the access control policy.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: `GetIamPolicyRequest`; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `cloudresourcemanager.tagValues.getNamespaced`

- Versions: v3
- `GET https://cloudresourcemanager.googleapis.com/v3/tagValues/namespaced`
- Retrieves a TagValue by its namespaced name. This method will return `PERMISSION_DENIED` if the value does not exist or the user does not have permission to view it.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: —; Response: `TagValue`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | query | string | no | Required. A namespaced tag value name in the following format: `{parentId}/{tagKeyShort}/{tagValueShort}` Examples: - `42/foo/abc` for a value with short name "abc" under the key with short name "foo" under the organization with ID 42 - `r2-d2/bar/xyz` for a value with short name "xyz" under the ke… |

### `cloudresourcemanager.tagValues.list`

- Versions: v3
- `GET https://cloudresourcemanager.googleapis.com/v3/tagValues`
- Lists all TagValues for a specific TagKey.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: —; Response: `ListTagValuesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of TagValues to return in the response. The server allows a maximum of 300 TagValues to return. If unspecified, the server will use 100 as the default. |
| `pageToken` | query | string | no | Optional. A pagination token returned from a previous call to `ListTagValues` that indicates where this listing should continue from. |
| `parent` | query | string | no | Required. Resource name for the parent of the TagValues to be listed, in the format `tagKeys/123` or `tagValues/123`. |

### `cloudresourcemanager.tagValues.patch`

- Versions: v3
- `PATCH https://cloudresourcemanager.googleapis.com/v3/{+name}`
- Updates the attributes of the TagValue resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `TagValue`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Immutable. Resource name for TagValue in the format `tagValues/456`. |
| `updateMask` | query | string (google-fieldmask) | no | Optional. Fields to be updated. |
| `validateOnly` | query | boolean | no | Optional. True to perform validations necessary for updating the resource, but not actually perform the action. |

### `cloudresourcemanager.tagValues.setIamPolicy`

- Versions: v3
- `POST https://cloudresourcemanager.googleapis.com/v3/{+resource}:setIamPolicy`
- Sets the access control policy on a TagValue, replacing any existing policy. The `resource` field should be the TagValue's resource name. For example: `tagValues/1234`. The caller must have `resourcemanager.tagValues.setIamPolicy` permission on the identified tagValue.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `SetIamPolicyRequest`; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being specified. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `cloudresourcemanager.tagValues.tagHolds.create`

- Versions: v3
- `POST https://cloudresourcemanager.googleapis.com/v3/{+parent}/tagHolds`
- Creates a TagHold. Returns ALREADY_EXISTS if a TagHold with the same resource and origin exists under the same TagValue.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `TagHold`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The resource name of the TagHold's parent TagValue. Must be of the form: `tagValues/{tag-value-id}`. |
| `validateOnly` | query | boolean | no | Optional. Set to true to perform the validations necessary for creating the resource, but not actually perform the action. |

### `cloudresourcemanager.tagValues.tagHolds.delete`

- Versions: v3
- `DELETE https://cloudresourcemanager.googleapis.com/v3/{+name}`
- Deletes a TagHold.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the TagHold to delete. Must be of the form: `tagValues/{tag-value-id}/tagHolds/{tag-hold-id}`. |
| `validateOnly` | query | boolean | no | Optional. Set to true to perform the validations necessary for deleting the resource, but not actually perform the action. |

### `cloudresourcemanager.tagValues.tagHolds.list`

- Versions: v3
- `GET https://cloudresourcemanager.googleapis.com/v3/{+parent}/tagHolds`
- Lists TagHolds under a TagValue.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: —; Response: `ListTagHoldsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The resource name of the parent TagValue. Must be of the form: `tagValues/{tag-value-id}`. |
| `filter` | query | string | no | Optional. Criteria used to select a subset of TagHolds parented by the TagValue to return. This field follows the syntax defined by aip.dev/160; the `holder` and `origin` fields are supported for filtering. Currently only `AND` syntax is supported. Some example queries are: \* `holder = //compute.go… |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of TagHolds to return in the response. The server allows a maximum of 300 TagHolds to return. If unspecified, the server will use 100 as the default. |
| `pageToken` | query | string | no | Optional. A pagination token returned from a previous call to `ListTagHolds` that indicates where this listing should continue from. |

### `cloudresourcemanager.tagValues.testIamPermissions`

- Versions: v3
- `POST https://cloudresourcemanager.googleapis.com/v3/{+resource}:testIamPermissions`
- Returns permissions that a caller has on the specified TagValue. The `resource` field should be the TagValue's resource name. For example: `tagValues/1234`. There are no permissions required for making this API call.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `TestIamPermissionsRequest`; Response: `TestIamPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy detail is being requested. See [Resource names](https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `cloudresourcemanager.fetchResourceSemantics`

- Versions: v3
- `GET https://cloudresourcemanager.googleapis.com/v3:fetchResourceSemantics`
- Returns the semantics associated with the specified resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: —; Response: `FetchResourceSemanticsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `fullResourceName` | query | string | no | Required. The full resource name of the GCP resource to retrieve semantics for. Examples: "//compute.googleapis.com/projects/123/zones/us-central1-a/instances/my-instance" "//storage.googleapis.com/projects/\_/buckets/my_bucket" |

## Notes

- Generated from the Discovery document(s) v3, v2, v1, v2beta1, v1beta1 of `cloudresourcemanager` (retrieved 2026-11-14). Resources on this page: effectiveTags, folders, liens, locations, operations, organizations, projects, tagBindings, tagKeys, tagValues, v3.
- Message schemas are listed under `references/rest-schemas/cloudresourcemanager/`.
- Source: https://cloudresourcemanager.googleapis.com/$discovery/rest?version=v3 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
