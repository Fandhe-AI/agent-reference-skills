---
source: https://backupdr.googleapis.com/$discovery/rest?version=v1
---

# Backup and DR Service API REST API (backupdr)

## Signature / Usage

Base URL: `https://backupdr.googleapis.com`. Methods are listed by `id`; the `Versions` line shows which API versions define the method (preferred: v1).

### `backupdr.folders.locations.resourceBackupConfigs.fetch`

- Versions: v1, v1beta
- `GET https://backupdr.googleapis.com/v1/{+parent}/resourceBackupConfigs:fetch`
- Fetches ResourceBackupConfigs.
- Scopes: `https://www.googleapis.com/auth/cloud-backupdr`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `FetchResourceBackupConfigsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The project, folder or organization and location for which to retrieve resource backup configs. Format: 'projects/{project_id}/locations/{location}', 'folders/{folder_id}/locations/{location}', or 'organizations/{organization_id}/locations/{location}'. |
| `filter` | query | string | no | Optional. Filtering results. |
| `orderBy` | query | string | no | Optional. Hint for how to order the results. |
| `pageSize` | query | integer (int32) | no | Optional. Requested page size. Server may return fewer items than requested. If unspecified, server will use 100 as default. Maximum value is 500 and values above 500 will be coerced to 500. |
| `pageToken` | query | string | no | Optional. A token identifying a page of results the server should return. |

### `backupdr.organizations.locations.resourceBackupConfigs.fetch`

- Versions: v1, v1beta
- `GET https://backupdr.googleapis.com/v1/{+parent}/resourceBackupConfigs:fetch`
- Fetches ResourceBackupConfigs.
- Scopes: `https://www.googleapis.com/auth/cloud-backupdr`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `FetchResourceBackupConfigsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The project, folder or organization and location for which to retrieve resource backup configs. Format: 'projects/{project_id}/locations/{location}', 'folders/{folder_id}/locations/{location}', or 'organizations/{organization_id}/locations/{location}'. |
| `filter` | query | string | no | Optional. Filtering results. |
| `orderBy` | query | string | no | Optional. Hint for how to order the results. |
| `pageSize` | query | integer (int32) | no | Optional. Requested page size. Server may return fewer items than requested. If unspecified, server will use 100 as default. Maximum value is 500 and values above 500 will be coerced to 500. |
| `pageToken` | query | string | no | Optional. A token identifying a page of results the server should return. |

### `backupdr.projects.locations.appliedAutoProtectionPolicies.list`

- Versions: v1, v1beta
- `GET https://backupdr.googleapis.com/v1/{+parent}/appliedAutoProtectionPolicies`
- Lists AppliedAutoProtectionPolicies in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-backupdr`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListAppliedAutoProtectionPoliciesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The project and location for which to retrieve the list of applied policies. Format: projects/{project}/locations/{location} |
| `filter` | query | string | no | Optional. A filter expression that filters resources listed in the response. |
| `orderBy` | query | string | no | Optional. An expression that sorts the results in the response. |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of applied policies to return in a single page. The maximum value is 1000; values above 1000 will be coerced to 1000. If unspecified or set to 0, a default page size of 500 will be used. |
| `pageToken` | query | string | no | Optional. A page token, received from a previous `ListAppliedAutoProtectionPolicies` call. |

### `backupdr.projects.locations.autoProtectionPolicies.bindings.create`

- Versions: v1, v1beta
- `POST https://backupdr.googleapis.com/v1/{+parent}/bindings`
- Creates a new AutoProtectionPolicyBinding in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-backupdr`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `AutoProtectionPolicyBinding`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource where this binding will be created. Format: projects/{project}/locations/{location}/autoProtectionPolicies/{auto_protection_policy} |
| `autoProtectionPolicyBindingId` | query | string | yes | Required. The ID to use for the binding. This will become the final component of the binding's resource name. This value must start with a lowercase letter followed by up to 62 lowercase letters, numbers, or hyphens, and cannot end with a hyphen. |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `backupdr.projects.locations.autoProtectionPolicies.bindings.get`

- Versions: v1, v1beta
- `GET https://backupdr.googleapis.com/v1/{+name}`
- Returns the auto protection policy binding read from the CCFE tables.
- Scopes: `https://www.googleapis.com/auth/cloud-backupdr`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `AutoProtectionPolicyBinding`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the binding to retrieve. Format: projects/{project}/locations/{location}/autoProtectionPolicies/{auto_protection_policy}/bindings/{binding} |

### `backupdr.projects.locations.autoProtectionPolicies.bindings.initiateDelete`

- Versions: v1, v1beta
- `POST https://backupdr.googleapis.com/v1/{+name}:initiateDelete`
- Initiates delete for AutoProtectionPolicy Binding
- Scopes: `https://www.googleapis.com/auth/cloud-backupdr`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `InitiateDeleteAutoProtectionPolicyBindingRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the binding to delete. Format: projects/{project}/locations/{location}/autoProtectionPolicies/{auto_protection_policy}/bindings/{binding} |

### `backupdr.projects.locations.autoProtectionPolicies.bindings.list`

- Versions: v1, v1beta
- `GET https://backupdr.googleapis.com/v1/{+parent}/bindings`
- Returns the auto protection policy bindings read from the CCFE tables.
- Scopes: `https://www.googleapis.com/auth/cloud-backupdr`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListAutoProtectionPolicyBindingsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The project and location for which to retrieve the list of policies. Format: projects/{project}/locations/{location} |
| `filter` | query | string | no | Optional. A filter expression that filters resources listed in the response. The following fields are filterable: |
| `orderBy` | query | string | no | Optional. An expression that sorts the results in the response. The following fields are sortable: |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of policies to return in a single page is 500. If unspecified, a server-default value will be used. |
| `pageToken` | query | string | no | Optional. A page token, received from a previous `ListAutoProtectionPolicies` call. Provide this to retrieve the subsequent page. |

### `backupdr.projects.locations.autoProtectionPolicies.bindings.matchingResources.get`

- Versions: v1, v1beta
- `GET https://backupdr.googleapis.com/v1/{+name}`
- Gets details of a single Binding Matching Resource.
- Scopes: `https://www.googleapis.com/auth/cloud-backupdr`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `BindingMatchingResource`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the matching resource to retrieve. Format: projects/{project}/locations/{location}/autoProtectionPolicies/{auto_protection_policy}/bindings/{binding}/matchingResources/{matching_resource} |

### `backupdr.projects.locations.autoProtectionPolicies.bindings.matchingResources.list`

- Versions: v1, v1beta
- `GET https://backupdr.googleapis.com/v1/{+parent}/matchingResources`
- Lists Binding Matching Resources for a given AutoProtectionPolicyBinding.
- Scopes: `https://www.googleapis.com/auth/cloud-backupdr`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListBindingMatchingResourcesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The project, location, auto protection policy and binding for which to retrieve `BindingMatchingResources` information. Format: `projects/{project}/locations/{location}/autoProtectionPolicies/{auto_protection_policy}/bindings/{binding}`. In Google Cloud Backup and DR, locations map to Google Cloud regions, for example \*\*us-central1\*\*. |
| `filter` | query | string | no | Optional. Field match expression used to filter the results. |
| `orderBy` | query | string | no | Optional. Field by which to sort the results. |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of `BindingMatchingResources` to return in a single response. The default page size is 100 and maximum page size is 200. Note that the response may include a partial list and a caller should only rely on the response's next_page_token to determine if there are more instances left to be queried. |
| `pageToken` | query | string | no | Optional. The value of next_page_token received from a previous `ListBindingMatchingResources` call. Provide this to retrieve the subsequent page in a multi-page list of results. When paginating, all other parameters provided to `ListBindingMatchingResources` must match the call that provided the page token. |

### `backupdr.projects.locations.autoProtectionPolicies.create`

- Versions: v1, v1beta
- `POST https://backupdr.googleapis.com/v1/{+parent}/autoProtectionPolicies`
- Creates a new AutoProtectionPolicy in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-backupdr`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `AutoProtectionPolicy`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource where this policy will be created. Format: projects/{project}/locations/{location} |
| `autoProtectionPolicyId` | query | string | yes | Required. The ID to use for the policy. This will become the final component of the policy's resource name. This value must start with a lowercase letter followed by up to 62 lowercase letters, numbers, or hyphens, and cannot end with a hyphen. |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `backupdr.projects.locations.autoProtectionPolicies.delete`

- Versions: v1, v1beta
- `DELETE https://backupdr.googleapis.com/v1/{+name}`
- Deletes a single AutoProtectionPolicy.
- Scopes: `https://www.googleapis.com/auth/cloud-backupdr`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the policy to delete. Format: projects/{project}/locations/{location}/autoProtectionPolicies/{auto_protection_policy} |
| `etag` | query | string | no | The current etag of the autoprotectionpolicy. If an etag is provided and does not match the current etag of the connection, deletion will be blocked. |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `backupdr.projects.locations.autoProtectionPolicies.get`

- Versions: v1, v1beta
- `GET https://backupdr.googleapis.com/v1/{+name}`
- Gets details of a single AutoProtectionPolicy.
- Scopes: `https://www.googleapis.com/auth/cloud-backupdr`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `AutoProtectionPolicy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the policy to retrieve. Format: projects/{project}/locations/{location}/autoProtectionPolicies/{auto_protection_policy} |

### `backupdr.projects.locations.autoProtectionPolicies.list`

- Versions: v1, v1beta
- `GET https://backupdr.googleapis.com/v1/{+parent}/autoProtectionPolicies`
- Lists AutoProtectionPolicies for a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-backupdr`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListAutoProtectionPoliciesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The project and location for which to retrieve the list of policies. Format: projects/{project}/locations/{location} |
| `filter` | query | string | no | Optional. A filter expression that filters resources listed in the response. The following fields are filterable: |
| `orderBy` | query | string | no | Optional. An expression that sorts the results in the response. The following fields are sortable: |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of policies to return in a single page. If unspecified, a server-default value will be used. |
| `pageToken` | query | string | no | Optional. A page token, received from a previous `ListAutoProtectionPolicies` call. Provide this to retrieve the subsequent page. |

### `backupdr.projects.locations.autoProtectionPolicies.patch`

- Versions: v1, v1beta
- `PATCH https://backupdr.googleapis.com/v1/{+name}`
- Updates the parameters of a single AutoProtectionPolicy.
- Scopes: `https://www.googleapis.com/auth/cloud-backupdr`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `AutoProtectionPolicy`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Output only. Identifier. The resource name of the AutoProtectionPolicy. Format: `projects/{project}/locations/{location}/autoProtectionPolicies/{auto_protection_policy}` |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `updateMask` | query | string (google-fieldmask) | no | Optional. Field mask is used to specify the fields to be overwritten in the AutoProtectionPolicy resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it is in the mask. If the user does not provide a mask then all fields will be overwritten. |

### `backupdr.projects.locations.backupPlanAssociations.create`

- Versions: v1, v1beta
- `POST https://backupdr.googleapis.com/v1/{+parent}/backupPlanAssociations`
- Create a BackupPlanAssociation
- Scopes: `https://www.googleapis.com/auth/cloud-backupdr`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `BackupPlanAssociation`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The backup plan association project and location in the format `projects/{project_id}/locations/{location}`. In Backup and DR locations map to Google Cloud regions, for example \*\*us-central1\*\*. |
| `backupPlanAssociationId` | query | string | yes | Required. The name of the backup plan association to create. The name must be unique for the specified project and location. |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and t he request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `backupdr.projects.locations.backupPlanAssociations.delete`

- Versions: v1, v1beta
- `DELETE https://backupdr.googleapis.com/v1/{+name}`
- Deletes a single BackupPlanAssociation.
- Scopes: `https://www.googleapis.com/auth/cloud-backupdr`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the backup plan association resource, in the format `projects/{project}/locations/{location}/backupPlanAssociations/{backupPlanAssociationId}` |
| `autoProtectionPolicyBinding` | query | string | no | Optional. This field is exclusively used by Backup and DR's auto-protection feature. The resource name of the `AutoProtectionPolicyBinding` that triggered the deletion of this association. Format: `projects/{project}/locations/{location}/autoProtectionPolicies/{policy}/bindings/{binding}`. |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `backupdr.projects.locations.backupPlanAssociations.fetchForResourceType`

- Versions: v1, v1beta
- `GET https://backupdr.googleapis.com/v1/{+parent}/backupPlanAssociations:fetchForResourceType`
- List BackupPlanAssociations for a given resource type.
- Scopes: `https://www.googleapis.com/auth/cloud-backupdr`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `FetchBackupPlanAssociationsForResourceTypeResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource name. Format: projects/{project}/locations/{location} |
| `filter` | query | string | no | Optional. A filter expression that filters the results fetched in the response. The expression must specify the field name, a comparison operator, and the value that you want to use for filtering. Supported fields: \* resource \* backup_plan \* state \* data_source \* cloud_sql_instance_backup_plan_association_properties.instance_create_time |
| `orderBy` | query | string | no | Optional. A comma-separated list of fields to order by, sorted in ascending order. Use "desc" after a field name for descending. Supported fields: \* name |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of BackupPlanAssociations to return. The service may return fewer than this value. If unspecified, at most 50 BackupPlanAssociations will be returned. The maximum value is 100; values above 100 will be coerced to 100. |
| `pageToken` | query | string | no | Optional. A page token, received from a previous call of `FetchBackupPlanAssociationsForResourceType`. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `FetchBackupPlanAssociationsForResourceType` must match the call that provided the page token. |
| `resourceType` | query | string | yes | Required. The type of the Google Cloud resource. Ex: sql.googleapis.com/Instance |

### `backupdr.projects.locations.backupPlanAssociations.get`

- Versions: v1, v1beta
- `GET https://backupdr.googleapis.com/v1/{+name}`
- Gets details of a single BackupPlanAssociation.
- Scopes: `https://www.googleapis.com/auth/cloud-backupdr`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `BackupPlanAssociation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the backup plan association resource, in the format `projects/{project}/locations/{location}/backupPlanAssociations/{backupPlanAssociationId}` |

### `backupdr.projects.locations.backupPlanAssociations.list`

- Versions: v1, v1beta
- `GET https://backupdr.googleapis.com/v1/{+parent}/backupPlanAssociations`
- Lists BackupPlanAssociations in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-backupdr`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListBackupPlanAssociationsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The project and location for which to retrieve backup Plan Associations information, in the format `projects/{project_id}/locations/{location}`. In Backup and DR, locations map to Google Cloud regions, for example \*\*us-central1\*\*. To retrieve backup plan associations for all locations, use "-" for the `{location}` value. |
| `filter` | query | string | no | Optional. Filtering results |
| `pageSize` | query | integer (int32) | no | Optional. Requested page size. Server may return fewer items than requested. If unspecified, server will pick an appropriate default. |
| `pageToken` | query | string | no | Optional. A token identifying a page of results the server should return. |

### `backupdr.projects.locations.backupPlanAssociations.patch`

- Versions: v1, v1beta
- `PATCH https://backupdr.googleapis.com/v1/{+name}`
- Update a BackupPlanAssociation.
- Scopes: `https://www.googleapis.com/auth/cloud-backupdr`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `BackupPlanAssociation`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Output only. Identifier. The resource name of BackupPlanAssociation in below format Format : projects/{project}/locations/{location}/backupPlanAssociations/{backupPlanAssociationId} |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and t he request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `updateMask` | query | string (google-fieldmask) | yes | Required. The list of fields to update. Field mask is used to specify the fields to be overwritten in the BackupPlanAssociation resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it is in the mask. If the user does not provide a mask then the request will fail. Currently backup_plan_association.backup_plan is the only supported field. |

### `backupdr.projects.locations.backupPlanAssociations.triggerBackup`

- Versions: v1, v1beta
- `POST https://backupdr.googleapis.com/v1/{+name}:triggerBackup`
- Triggers a new Backup.
- Scopes: `https://www.googleapis.com/auth/cloud-backupdr`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `TriggerBackupRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the backup plan association resource, in the format `projects/{project}/locations/{location}/backupPlanAssociations/{backupPlanAssociationId}` |

### `backupdr.projects.locations.backupPlans.create`

- Versions: v1, v1beta
- `POST https://backupdr.googleapis.com/v1/{+parent}/backupPlans`
- Create a BackupPlan
- Scopes: `https://www.googleapis.com/auth/cloud-backupdr`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `BackupPlan`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The `BackupPlan` project and location in the format `projects/{project}/locations/{location}`. In Google Cloud Backup and DR locations map to Google Cloud regions, for example \*\*us-central1\*\*. |
| `backupPlanId` | query | string | yes | Required. The name of the `BackupPlan` to create. The name must be unique for the specified project and location.The name must start with a lowercase letter followed by up to 62 lowercase letters, numbers, or hyphens. Pattern, /a-z{,62}/. |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and t he request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `backupdr.projects.locations.backupPlans.delete`

- Versions: v1, v1beta
- `DELETE https://backupdr.googleapis.com/v1/{+name}`
- Deletes a single BackupPlan.
- Scopes: `https://www.googleapis.com/auth/cloud-backupdr`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the `BackupPlan` to delete. Format: `projects/{project}/locations/{location}/backupPlans/{backup_plan}` |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `backupdr.projects.locations.backupPlans.get`

- Versions: v1, v1beta
- `GET https://backupdr.googleapis.com/v1/{+name}`
- Gets details of a single BackupPlan.
- Scopes: `https://www.googleapis.com/auth/cloud-backupdr`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `BackupPlan`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the `BackupPlan` to retrieve. Format: `projects/{project}/locations/{location}/backupPlans/{backup_plan}` |

### `backupdr.projects.locations.backupPlans.list`

- Versions: v1, v1beta
- `GET https://backupdr.googleapis.com/v1/{+parent}/backupPlans`
- Lists BackupPlans in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-backupdr`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListBackupPlansResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The project and location for which to retrieve `BackupPlans` information. Format: `projects/{project}/locations/{location}`. In Google Cloud Backup and DR, locations map to Google Cloud regions, for example \*\*us-central1\*\*. To retrieve backup plans for all locations, use "-" for the `{location}` value. |
| `filter` | query | string | no | Optional. Field match expression used to filter the results. |
| `orderBy` | query | string | no | Optional. Field by which to sort the results. |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of `BackupPlans` to return in a single response. If not specified, a default value will be chosen by the service. Note that the response may include a partial list and a caller should only rely on the response's next_page_token to determine if there are more instances left to be queried. |
| `pageToken` | query | string | no | Optional. The value of next_page_token received from a previous `ListBackupPlans` call. Provide this to retrieve the subsequent page in a multi-page list of results. When paginating, all other parameters provided to `ListBackupPlans` must match the call that provided the page token. |

### `backupdr.projects.locations.backupPlans.patch`

- Versions: v1, v1beta
- `PATCH https://backupdr.googleapis.com/v1/{+name}`
- Update a BackupPlan.
- Scopes: `https://www.googleapis.com/auth/cloud-backupdr`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `BackupPlan`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Output only. Identifier. The resource name of the `BackupPlan`. Format: `projects/{project}/locations/{location}/backupPlans/{backup_plan}` |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and t he request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `updateMask` | query | string (google-fieldmask) | yes | Required. The list of fields to update. Field mask is used to specify the fields to be overwritten in the BackupPlan resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it is in the mask. If the user does not provide a mask then the request will fail. Currently, these fields are supported in update: description, schedules, retention period, adding and removing Backup Rules. |

### `backupdr.projects.locations.backupPlans.revisions.get`

- Versions: v1, v1beta
- `GET https://backupdr.googleapis.com/v1/{+name}`
- Gets details of a single BackupPlanRevision.
- Scopes: `https://www.googleapis.com/auth/cloud-backupdr`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `BackupPlanRevision`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the `BackupPlanRevision` to retrieve. Format: `projects/{project}/locations/{location}/backupPlans/{backup_plan}/revisions/{revision}` |

### `backupdr.projects.locations.backupPlans.revisions.list`

- Versions: v1, v1beta
- `GET https://backupdr.googleapis.com/v1/{+parent}/revisions`
- Lists BackupPlanRevisions in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-backupdr`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListBackupPlanRevisionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The project and location for which to retrieve `BackupPlanRevisions` information. Format: `projects/{project}/locations/{location}/backupPlans/{backup_plan}`. In Google Cloud Backup and DR, locations map to Google Cloud regions, for example \*\*us-central1\*\*. |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of `BackupPlans` to return in a single response. If not specified, a default value will be chosen by the service. Note that the response may include a partial list and a caller should only rely on the response's next_page_token to determine if there are more instances left to be queried. |
| `pageToken` | query | string | no | Optional. The value of next_page_token received from a previous `ListBackupPlans` call. Provide this to retrieve the subsequent page in a multi-page list of results. When paginating, all other parameters provided to `ListBackupPlans` must match the call that provided the page token. |

### `backupdr.projects.locations.backupVaults.create`

- Versions: v1, v1beta
- `POST https://backupdr.googleapis.com/v1/{+parent}/backupVaults`
- Creates a new BackupVault in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-backupdr`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `BackupVault`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Value for parent. |
| `backupVaultId` | query | string | yes | Required. ID of the requesting object If auto-generating ID server-side, remove this field and backup_vault_id from the method_signature of Create RPC |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `validateOnly` | query | boolean | no | Optional. Only validate the request, but do not perform mutations. The default is 'false'. |

### `backupdr.projects.locations.backupVaults.dataSources.abandonBackup`

- Versions: v1, v1beta
- `POST https://backupdr.googleapis.com/v1/{+dataSource}:abandonBackup`
- Internal only. Abandons a backup.
- Scopes: `https://www.googleapis.com/auth/cloud-backupdr`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `AbandonBackupRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `dataSource` | path | string | yes | Required. The resource name of the instance, in the format 'projects/\*/locations/\*/backupVaults/\*/dataSources/'. |

### `backupdr.projects.locations.backupVaults.dataSources.backups.delete`

- Versions: v1, v1beta
- `DELETE https://backupdr.googleapis.com/v1/{+name}`
- Deletes a Backup.
- Scopes: `https://www.googleapis.com/auth/cloud-backupdr`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the resource. |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `backupdr.projects.locations.backupVaults.dataSources.backups.fetchForResourceType`

- Versions: v1, v1beta
- `GET https://backupdr.googleapis.com/v1/{+parent}/backups:fetchForResourceType`
- Fetch Backups for a given resource type.
- Scopes: `https://www.googleapis.com/auth/cloud-backupdr`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `FetchBackupsForResourceTypeResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Datasources are the parent resource for the backups. Format: projects/{project}/locations/{location}/backupVaults/{backupVaultId}/dataSources/{datasourceId} |
| `filter` | query | string | no | Optional. A filter expression that filters the results fetched in the response. The expression must specify the field name, a comparison operator, and the value that you want to use for filtering. Supported fields: \* name \* state \* backup_type \* create_time \* expire_time \* enforced_retention_end_time \* gcp_backup_plan_info.backup_plan \* cloud_sql_instance_backup_properties.instance_tier \* cloud_sql_instance_backup_properties.database_installed_version |
| `orderBy` | query | string | no | Optional. A comma-separated list of fields to order by, sorted in ascending order. Use "desc" after a field name for descending. Supported fields: \* name |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of Backups to return. The service may return fewer than this value. If unspecified, at most 50 Backups will be returned. The maximum value is 100; values above 100 will be coerced to 100. |
| `pageToken` | query | string | no | Optional. A page token, received from a previous call of `FetchBackupsForResourceType`. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `FetchBackupsForResourceType` must match the call that provided the page token. |
| `resourceType` | query | string | yes | Required. The type of the Google Cloud resource. Ex: sqladmin.googleapis.com/Instance |
| `view` | query | string enum | no | Optional. This parameter is used to specify the view of the backup. If not specified, the default view is BASIC. Values: `BACKUP_VIEW_UNSPECIFIED`, `BACKUP_VIEW_BASIC`, `BACKUP_VIEW_FULL`. |

### `backupdr.projects.locations.backupVaults.dataSources.backups.get`

- Versions: v1, v1beta
- `GET https://backupdr.googleapis.com/v1/{+name}`
- Gets details of a Backup.
- Scopes: `https://www.googleapis.com/auth/cloud-backupdr`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Backup`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the data source resource name, in the format 'projects/{project_id}/locations/{location}/backupVaults/{backupVault}/dataSources/{datasource}/backups/{backup}' |
| `view` | query | string enum | no | Optional. Reserved for future use to provide a BASIC & FULL view of Backup resource. Values: `BACKUP_VIEW_UNSPECIFIED`, `BACKUP_VIEW_BASIC`, `BACKUP_VIEW_FULL`. |

### `backupdr.projects.locations.backupVaults.dataSources.backups.list`

- Versions: v1, v1beta
- `GET https://backupdr.googleapis.com/v1/{+parent}/backups`
- Lists Backups in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-backupdr`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListBackupsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The project and location for which to retrieve backup information, in the format 'projects/{project_id}/locations/{location}'. In Cloud Backup and DR, locations map to Google Cloud regions, for example \*\*us-central1\*\*. To retrieve data sources for all locations, use "-" for the '{location}' value. |
| `filter` | query | string | no | Optional. Filtering results. |
| `orderBy` | query | string | no | Optional. Hint for how to order the results. |
| `pageSize` | query | integer (int32) | no | Optional. Requested page size. Server may return fewer items than requested. If unspecified, server will pick an appropriate default. |
| `pageToken` | query | string | no | Optional. A token identifying a page of results the server should return. |
| `view` | query | string enum | no | Optional. Reserved for future use to provide a BASIC & FULL view of Backup resource. Values: `BACKUP_VIEW_UNSPECIFIED`, `BACKUP_VIEW_BASIC`, `BACKUP_VIEW_FULL`. |

### `backupdr.projects.locations.backupVaults.dataSources.backups.patch`

- Versions: v1, v1beta
- `PATCH https://backupdr.googleapis.com/v1/{+name}`
- Updates the settings of a Backup.
- Scopes: `https://www.googleapis.com/auth/cloud-backupdr`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `Backup`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Output only. Identifier. Name of the backup to create. It must have the format`"projects//locations//backupVaults//dataSources/{datasource}/backups/{backup}"`. `{backup}` cannot be changed after creation. It must be between 3-63 characters long and must be unique within the datasource. |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `updateMask` | query | string (google-fieldmask) | yes | Required. Field mask is used to specify the fields to be overwritten in the Backup resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it is in the mask. If the user does not provide a mask then the request will fail. |

### `backupdr.projects.locations.backupVaults.dataSources.backups.restore`

- Versions: v1, v1beta
- `POST https://backupdr.googleapis.com/v1/{+name}:restore`
- Restore from a Backup
- Scopes: `https://www.googleapis.com/auth/cloud-backupdr`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `RestoreBackupRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the Backup instance, in the format 'projects/\*/locations/\*/backupVaults/\*/dataSources/\*/backups/'. |

### `backupdr.projects.locations.backupVaults.dataSources.fetchAccessToken`

- Versions: v1, v1beta
- `POST https://backupdr.googleapis.com/v1/{+name}:fetchAccessToken`
- Internal only. Fetch access token for a given data source.
- Scopes: `https://www.googleapis.com/auth/cloud-backupdr`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `FetchAccessTokenRequest`; Response: `FetchAccessTokenResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name for the location for which static IPs should be returned. Must be in the format 'projects/\*/locations/\*/backupVaults/\*/dataSources'. |

### `backupdr.projects.locations.backupVaults.dataSources.finalizeBackup`

- Versions: v1, v1beta
- `POST https://backupdr.googleapis.com/v1/{+dataSource}:finalizeBackup`
- Internal only. Finalize a backup that was started by a call to InitiateBackup.
- Scopes: `https://www.googleapis.com/auth/cloud-backupdr`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `FinalizeBackupRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `dataSource` | path | string | yes | Required. The resource name of the instance, in the format 'projects/\*/locations/\*/backupVaults/\*/dataSources/'. |

### `backupdr.projects.locations.backupVaults.dataSources.get`

- Versions: v1, v1beta
- `GET https://backupdr.googleapis.com/v1/{+name}`
- Gets details of a DataSource.
- Scopes: `https://www.googleapis.com/auth/cloud-backupdr`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `DataSource`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the data source resource name, in the format 'projects/{project_id}/locations/{location}/backupVaults/{resource_name}/dataSource/{resource_name}' |

### `backupdr.projects.locations.backupVaults.dataSources.initiateBackup`

- Versions: v1, v1beta
- `POST https://backupdr.googleapis.com/v1/{+dataSource}:initiateBackup`
- Internal only. Initiates a backup.
- Scopes: `https://www.googleapis.com/auth/cloud-backupdr`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `InitiateBackupRequest`; Response: `InitiateBackupResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `dataSource` | path | string | yes | Required. The resource name of the instance, in the format 'projects/\*/locations/\*/backupVaults/\*/dataSources/'. |

### `backupdr.projects.locations.backupVaults.dataSources.list`

- Versions: v1, v1beta
- `GET https://backupdr.googleapis.com/v1/{+parent}/dataSources`
- Lists DataSources in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-backupdr`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListDataSourcesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The project and location for which to retrieve data sources information, in the format 'projects/{project_id}/locations/{location}'. In Cloud Backup and DR, locations map to Google Cloud regions, for example \*\*us-central1\*\*. To retrieve data sources for all locations, use "-" for the '{location}' value. |
| `filter` | query | string | no | Optional. Filtering results. |
| `orderBy` | query | string | no | Optional. Hint for how to order the results. |
| `pageSize` | query | integer (int32) | no | Optional. Requested page size. Server may return fewer items than requested. If unspecified, server will pick an appropriate default. |
| `pageToken` | query | string | no | Optional. A token identifying a page of results the server should return. |

### `backupdr.projects.locations.backupVaults.dataSources.patch`

- Versions: v1, v1beta
- `PATCH https://backupdr.googleapis.com/v1/{+name}`
- Updates the settings of a DataSource.
- Scopes: `https://www.googleapis.com/auth/cloud-backupdr`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `DataSource`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Output only. Identifier. Name of the datasource to create. It must have the format`"projects/{project}/locations/{location}/backupVaults/{backupvault}/dataSources/{datasource}"`. `{datasource}` cannot be changed after creation. It must be between 3-63 characters long and must be unique within the backup vault. |
| `allowMissing` | query | boolean | no | Optional. Enable upsert. |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `updateMask` | query | string (google-fieldmask) | yes | Required. Field mask is used to specify the fields to be overwritten in the DataSource resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it is in the mask. If the user does not provide a mask then the request will fail. |

### `backupdr.projects.locations.backupVaults.dataSources.remove`

- Versions: v1, v1beta
- `POST https://backupdr.googleapis.com/v1/{+name}:remove`
- Deletes a DataSource. This is a custom method instead of a standard delete method because external clients will not delete DataSources except for BackupDR backup appliances.
- Scopes: `https://www.googleapis.com/auth/cloud-backupdr`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `RemoveDataSourceRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the resource. |

### `backupdr.projects.locations.backupVaults.dataSources.setInternalStatus`

- Versions: v1, v1beta
- `POST https://backupdr.googleapis.com/v1/{+dataSource}:setInternalStatus`
- Sets the internal status of a DataSource.
- Scopes: `https://www.googleapis.com/auth/cloud-backupdr`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `SetInternalStatusRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `dataSource` | path | string | yes | Required. The resource name of the instance, in the format 'projects/\*/locations/\*/backupVaults/\*/dataSources/'. |

### `backupdr.projects.locations.backupVaults.delete`

- Versions: v1, v1beta
- `DELETE https://backupdr.googleapis.com/v1/{+name}`
- Deletes a BackupVault.
- Scopes: `https://www.googleapis.com/auth/cloud-backupdr`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the resource. |
| `allowMissing` | query | boolean | no | Optional. If true and the BackupVault is not found, the request will succeed but no action will be taken. |
| `etag` | query | string | no | The current etag of the backup vault. If an etag is provided and does not match the current etag of the connection, deletion will be blocked. |
| `force` | query | boolean | no | Optional. If set to true, any data source from this backup vault will also be deleted. |
| `ignoreBackupPlanReferences` | query | boolean | no | Optional. If set to true, backupvault deletion will proceed even if there are backup plans referencing the backupvault. The default is 'false'. |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `validateOnly` | query | boolean | no | Optional. Only validate the request, but do not perform mutations. The default is 'false'. |

### `backupdr.projects.locations.backupVaults.fetchUsable`

- Versions: v1, v1beta
- `GET https://backupdr.googleapis.com/v1/{+parent}/backupVaults:fetchUsable`
- FetchUsableBackupVaults lists usable BackupVaults in a given project and location. Usable BackupVault are the ones that user has backupdr.backupVaults.get permission.
- Scopes: `https://www.googleapis.com/auth/cloud-backupdr`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `FetchUsableBackupVaultsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The project and location for which to retrieve backupvault stores information, in the format 'projects/{project_id}/locations/{location}'. In Cloud Backup and DR, locations map to Google Cloud regions, for example \*\*us-central1\*\*. To retrieve backupvault stores for all locations, use "-" for the '{location}' value. |
| `filter` | query | string | no | Optional. Filtering results. |
| `orderBy` | query | string | no | Optional. Hint for how to order the results. |
| `pageSize` | query | integer (int32) | no | Optional. Requested page size. Server may return fewer items than requested. If unspecified, server will pick an appropriate default. |
| `pageToken` | query | string | no | Optional. A token identifying a page of results the server should return. |

### `backupdr.projects.locations.backupVaults.get`

- Versions: v1, v1beta
- `GET https://backupdr.googleapis.com/v1/{+name}`
- Gets details of a BackupVault.
- Scopes: `https://www.googleapis.com/auth/cloud-backupdr`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `BackupVault`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the backupvault store resource name, in the format 'projects/{project_id}/locations/{location}/backupVaults/{resource_name}' |
| `view` | query | string enum | no | Optional. Reserved for future use to provide a BASIC & FULL view of Backup Vault Values: `BACKUP_VAULT_VIEW_UNSPECIFIED`, `BACKUP_VAULT_VIEW_BASIC`, `BACKUP_VAULT_VIEW_FULL`. |

### `backupdr.projects.locations.backupVaults.list`

- Versions: v1, v1beta
- `GET https://backupdr.googleapis.com/v1/{+parent}/backupVaults`
- Lists BackupVaults in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-backupdr`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListBackupVaultsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The project and location for which to retrieve backupvault stores information, in the format 'projects/{project_id}/locations/{location}'. In Cloud Backup and DR, locations map to Google Cloud regions, for example \*\*us-central1\*\*. To retrieve backupvault stores for all locations, use "-" for the '{location}' value. |
| `filter` | query | string | no | Optional. Filtering results. |
| `orderBy` | query | string | no | Optional. Hint for how to order the results. |
| `pageSize` | query | integer (int32) | no | Optional. Requested page size. Server may return fewer items than requested. If unspecified, server will pick an appropriate default. |
| `pageToken` | query | string | no | Optional. A token identifying a page of results the server should return. |
| `view` | query | string enum | no | Optional. Reserved for future use to provide a BASIC & FULL view of Backup Vault. Values: `BACKUP_VAULT_VIEW_UNSPECIFIED`, `BACKUP_VAULT_VIEW_BASIC`, `BACKUP_VAULT_VIEW_FULL`. |

### `backupdr.projects.locations.backupVaults.patch`

- Versions: v1, v1beta
- `PATCH https://backupdr.googleapis.com/v1/{+name}`
- Updates the settings of a BackupVault.
- Scopes: `https://www.googleapis.com/auth/cloud-backupdr`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `BackupVault`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Output only. Identifier. Name of the backup vault to create. It must have the format`"projects/{project}/locations/{location}/backupVaults/{backupvault}"`. `{backupvault}` cannot be changed after creation. It must be between 3-63 characters long and must be unique within the project and location. |
| `force` | query | boolean | no | Optional. If set to true, will not check plan duration against backup vault enforcement duration. |
| `forceUpdateAccessRestriction` | query | boolean | no | Optional. If set to true, we will force update access restriction even if some non compliant data sources are present. The default is 'false'. |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `updateMask` | query | string (google-fieldmask) | yes | Required. Field mask is used to specify the fields to be overwritten in the BackupVault resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it is in the mask. If the user does not provide a mask then the request will fail. |
| `validateOnly` | query | boolean | no | Optional. Only validate the request, but do not perform mutations. The default is 'false'. |

### `backupdr.projects.locations.backupVaults.testIamPermissions`

- Versions: v1, v1beta
- `POST https://backupdr.googleapis.com/v1/{+resource}:testIamPermissions`
- Returns the caller's permissions on a BackupVault resource. A caller is not required to have Google IAM permission to make this request.
- Scopes: `https://www.googleapis.com/auth/cloud-backupdr`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `TestIamPermissionsRequest`; Response: `TestIamPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `backupdr.projects.locations.dataSourceReferences.fetchForResourceType`

- Versions: v1, v1beta
- `GET https://backupdr.googleapis.com/v1/{+parent}/dataSourceReferences:fetchForResourceType`
- Fetch DataSourceReferences for a given project, location and resource type.
- Scopes: `https://www.googleapis.com/auth/cloud-backupdr`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `FetchDataSourceReferencesForResourceTypeResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource name. Format: projects/{project}/locations/{location} |
| `filter` | query | string | no | Optional. A filter expression that filters the results fetched in the response. The expression must specify the field name, a comparison operator, and the value that you want to use for filtering. Supported fields: \* data_source \* data_source_gcp_resource_info.gcp_resourcename \* data_source_backup_config_state \* data_source_backup_count \* data_source_backup_config_info.last_backup_state \* data_source_gcp_resource_info.gcp_resourcename \* data_source_gcp_resource_info.type \* data_source_gcp_resource_info.location \* data_source_gcp_resource_info.cloud_sql_instance_properties.instance_create_time |
| `orderBy` | query | string | no | Optional. A comma-separated list of fields to order by, sorted in ascending order. Use "desc" after a field name for descending. Supported fields: \* name |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of DataSourceReferences to return. The service may return fewer than this value. If unspecified, at most 50 DataSourceReferences will be returned. The maximum value is 100; values above 100 will be coerced to 100. |
| `pageToken` | query | string | no | Optional. A page token, received from a previous call of `FetchDataSourceReferencesForResourceType`. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `FetchDataSourceReferencesForResourceType` must match the call that provided the page token. |
| `resourceType` | query | string | yes | Required. The type of the Google Cloud resource. Ex: sql.googleapis.com/Instance |

### `backupdr.projects.locations.dataSourceReferences.get`

- Versions: v1, v1beta
- `GET https://backupdr.googleapis.com/v1/{+name}`
- Gets details of a single DataSourceReference.
- Scopes: `https://www.googleapis.com/auth/cloud-backupdr`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `DataSourceReference`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the DataSourceReference to retrieve. Format: projects/{project}/locations/{location}/dataSourceReferences/{data_source_reference} |

### `backupdr.projects.locations.dataSourceReferences.list`

- Versions: v1, v1beta
- `GET https://backupdr.googleapis.com/v1/{+parent}/dataSourceReferences`
- Lists DataSourceReferences for a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-backupdr`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListDataSourceReferencesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource name. Format: projects/{project}/locations/{location} |
| `filter` | query | string | no | Optional. A filter expression that filters the results listed in the response. The expression must specify the field name, a comparison operator, and the value that you want to use for filtering. The following field and operator combinations are supported: \* data_source_gcp_resource_info.gcp_resourcename with `=`, `!=` \* data_source_gcp_resource_info.type with `=`, `!=` |
| `orderBy` | query | string | no | Optional. A comma-separated list of fields to order by, sorted in ascending order. Use "desc" after a field name for descending. Supported fields: \* data_source \* data_source_gcp_resource_info.gcp_resourcename |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of DataSourceReferences to return. The service may return fewer than this value. If unspecified, at most 50 DataSourceReferences will be returned. The maximum value is 100; values above 100 will be coerced to 100. |
| `pageToken` | query | string | no | Optional. A page token, received from a previous `ListDataSourceReferences` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListDataSourceReferences` must match the call that provided the page token. |

### `backupdr.projects.locations.get`

- Versions: v1, v1beta
- `GET https://backupdr.googleapis.com/v1/{+name}`
- Gets information about a location.
- Scopes: `https://www.googleapis.com/auth/cloud-backupdr`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Location`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Resource name for the location. |

### `backupdr.projects.locations.getTrial`

- Versions: v1, v1beta
- `GET https://backupdr.googleapis.com/v1/{+name}`
- Gets the Trial state for a given project
- Scopes: `https://www.googleapis.com/auth/cloud-backupdr`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Trial`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The project for which trial details need to be retrieved. Format: projects/{project}/locations/{location} Supported Locations are - us, eu and asia. |

### `backupdr.projects.locations.list`

- Versions: v1, v1beta
- `GET https://backupdr.googleapis.com/v1/{+name}/locations`
- Lists information about the supported locations for this service. This method lists locations based on the resource scope provided in the ListLocationsRequest.name field: \* \*\*Global locations\*\*: If `name` is empty, the method lists the public locations available to all projects. \* \*\*Project-specific locations\*\*: If `name` follows the format `projects/{project}`, the method lists locations visible to that specific project. This includes public, private, or other project-specific locations enabled for the project. For gRPC and client library implementations, the resource name is passed as the `name` field. For direct service calls, the resource name is incorporated into the request path based on the specific service implementation and version.
- Scopes: `https://www.googleapis.com/auth/cloud-backupdr`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListLocationsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The resource that owns the locations collection, if applicable. |
| `extraLocationTypes` | query | repeated string | no | Optional. Do not use this field unless explicitly documented otherwise. This is primarily for internal usage. |
| `filter` | query | string | no | A filter to narrow down results to a preferred subset. The filtering language accepts strings like `"displayName=tokyo"`, and is documented in more detail in AIP-160 (https://google.aip.dev/160). |
| `pageSize` | query | integer (int32) | no | The maximum number of results to return. If not set, the service selects a default. |
| `pageToken` | query | string | no | A page token received from the `next_page_token` field in the response. Send that page token to receive the subsequent page. |

### `backupdr.projects.locations.managementServers.create`

- Versions: v1, v1beta
- `POST https://backupdr.googleapis.com/v1/{+parent}/managementServers`
- Creates a new ManagementServer in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-backupdr`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `ManagementServer`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The management server project and location in the format 'projects/{project_id}/locations/{location}'. In Cloud Backup and DR locations map to Google Cloud regions, for example \*\*us-central1\*\*. |
| `managementServerId` | query | string | yes | Required. The name of the management server to create. The name must be unique for the specified project and location. |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `backupdr.projects.locations.managementServers.delete`

- Versions: v1, v1beta
- `DELETE https://backupdr.googleapis.com/v1/{+name}`
- Deletes a single ManagementServer.
- Scopes: `https://www.googleapis.com/auth/cloud-backupdr`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the resource |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `backupdr.projects.locations.managementServers.get`

- Versions: v1, v1beta
- `GET https://backupdr.googleapis.com/v1/{+name}`
- Gets details of a single ManagementServer.
- Scopes: `https://www.googleapis.com/auth/cloud-backupdr`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ManagementServer`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the management server resource name, in the format 'projects/{project_id}/locations/{location}/managementServers/{resource_name}' |

### `backupdr.projects.locations.managementServers.getIamPolicy`

- Versions: v1, v1beta
- `GET https://backupdr.googleapis.com/v1/{+resource}:getIamPolicy`
- Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set.
- Scopes: `https://www.googleapis.com/auth/cloud-backupdr`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |
| `options.requestedPolicyVersion` | query | integer (int32) | no | Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |

### `backupdr.projects.locations.managementServers.list`

- Versions: v1, v1beta
- `GET https://backupdr.googleapis.com/v1/{+parent}/managementServers`
- Lists ManagementServers in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-backupdr`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListManagementServersResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The project and location for which to retrieve management servers information, in the format 'projects/{project_id}/locations/{location}'. In Google Cloud Backup and DR, locations map to Google Cloud regions, for example \*\*us-central1\*\*. To retrieve management servers for all locations, use "-" for the '{location}' value. |
| `filter` | query | string | no | Optional. Filtering results. |
| `orderBy` | query | string | no | Optional. Hint for how to order the results. |
| `pageSize` | query | integer (int32) | no | Optional. Requested page size. Server may return fewer items than requested. If unspecified, server will pick an appropriate default. |
| `pageToken` | query | string | no | Optional. A token identifying a page of results the server should return. |

### `backupdr.projects.locations.managementServers.msComplianceMetadata`

- Versions: v1, v1beta
- `POST https://backupdr.googleapis.com/v1/{+parent}:msComplianceMetadata`
- Returns the Assured Workloads compliance metadata for a given project.
- Scopes: `https://www.googleapis.com/auth/cloud-backupdr`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `FetchMsComplianceMetadataRequest`; Response: `FetchMsComplianceMetadataResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The project and location to be used to check CSS metadata for target project information, in the format 'projects/{project_id}/locations/{location}'. In Google Cloud Backup and DR, locations map to Google Cloud regions, for example \*\*us-central1\*\*. |

### `backupdr.projects.locations.managementServers.setIamPolicy`

- Versions: v1, v1beta
- `POST https://backupdr.googleapis.com/v1/{+resource}:setIamPolicy`
- Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors.
- Scopes: `https://www.googleapis.com/auth/cloud-backupdr`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `SetIamPolicyRequest`; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `backupdr.projects.locations.managementServers.testIamPermissions`

- Versions: v1, v1beta
- `POST https://backupdr.googleapis.com/v1/{+resource}:testIamPermissions`
- Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning.
- Scopes: `https://www.googleapis.com/auth/cloud-backupdr`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `TestIamPermissionsRequest`; Response: `TestIamPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `backupdr.projects.locations.operations.cancel`

- Versions: v1, v1beta
- `POST https://backupdr.googleapis.com/v1/{+name}:cancel`
- Starts asynchronous cancellation on a long-running operation. The server makes a best effort to cancel the operation, but success is not guaranteed. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. Clients can use Operations.GetOperation or other methods to check whether the cancellation succeeded or whether the operation completed despite cancellation. On successful cancellation, the operation is not deleted; instead, it becomes an operation with an Operation.error value with a google.rpc.Status.code of `1`, corresponding to `Code.CANCELLED`.
- Scopes: `https://www.googleapis.com/auth/cloud-backupdr`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `CancelOperationRequest`; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource to be cancelled. |

### `backupdr.projects.locations.operations.delete`

- Versions: v1, v1beta
- `DELETE https://backupdr.googleapis.com/v1/{+name}`
- Deletes a long-running operation. This method indicates that the client is no longer interested in the operation result. It does not cancel the operation. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`.
- Scopes: `https://www.googleapis.com/auth/cloud-backupdr`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource to be deleted. |

### `backupdr.projects.locations.operations.get`

- Versions: v1, v1beta
- `GET https://backupdr.googleapis.com/v1/{+name}`
- Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service.
- Scopes: `https://www.googleapis.com/auth/cloud-backupdr`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource. |

### `backupdr.projects.locations.operations.list`

- Versions: v1, v1beta
- `GET https://backupdr.googleapis.com/v1/{+name}/operations`
- Lists operations that match the specified filter in the request. If the server doesn't support this method, it returns `UNIMPLEMENTED`.
- Scopes: `https://www.googleapis.com/auth/cloud-backupdr`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListOperationsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation's parent resource. |
| `filter` | query | string | no | The standard list filter. |
| `pageSize` | query | integer (int32) | no | The standard list page size. |
| `pageToken` | query | string | no | The standard list page token. |
| `returnPartialSuccess` | query | boolean | no | When set to `true`, operations that are reachable are returned as normal, and those that are unreachable are returned in the ListOperationsResponse.unreachable field. This can only be `true` when reading across collections. For example, when `parent` is set to `"projects/example/locations/-"`. This field is not supported by default and will result in an `UNIMPLEMENTED` error if set unless explicitly documented otherwise in service or product specific documentation. |

### `backupdr.projects.locations.resourceBackupConfigs.fetch`

- Versions: v1, v1beta
- `GET https://backupdr.googleapis.com/v1/{+parent}/resourceBackupConfigs:fetch`
- Fetches ResourceBackupConfigs.
- Scopes: `https://www.googleapis.com/auth/cloud-backupdr`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `FetchResourceBackupConfigsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The project, folder or organization and location for which to retrieve resource backup configs. Format: 'projects/{project_id}/locations/{location}', 'folders/{folder_id}/locations/{location}', or 'organizations/{organization_id}/locations/{location}'. |
| `filter` | query | string | no | Optional. Filtering results. |
| `orderBy` | query | string | no | Optional. Hint for how to order the results. |
| `pageSize` | query | integer (int32) | no | Optional. Requested page size. Server may return fewer items than requested. If unspecified, server will use 100 as default. Maximum value is 500 and values above 500 will be coerced to 500. |
| `pageToken` | query | string | no | Optional. A token identifying a page of results the server should return. |

### `backupdr.projects.locations.resourceBackupConfigs.list`

- Versions: v1, v1beta
- `GET https://backupdr.googleapis.com/v1/{+parent}/resourceBackupConfigs`
- Lists ResourceBackupConfigs.
- Scopes: `https://www.googleapis.com/auth/cloud-backupdr`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListResourceBackupConfigsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The project and location for which to retrieve resource backup configs. Format: 'projects/{project_id}/locations/{location}'. In Google Cloud Backup and DR, locations map to Google Cloud regions, for example \*\*us-central1\*\*. |
| `filter` | query | string | no | Optional. Filtering results. |
| `orderBy` | query | string | no | Optional. Hint for how to order the results. |
| `pageSize` | query | integer (int32) | no | Optional. Requested page size. Server may return fewer items than requested. If unspecified, server will use 100 as default. Maximum value is 500 and values above 500 will be coerced to 500. |
| `pageToken` | query | string | no | Optional. A token identifying a page of results the server should return. |

### `backupdr.projects.locations.restoreTemplates.create`

- Versions: v1, v1beta
- `POST https://backupdr.googleapis.com/v1/{+parent}/restoreTemplates`
- Creates a new RestoreTemplate in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-backupdr`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `RestoreTemplate`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The restore template project and location in the format 'projects/{project_id}/locations/{location}'. |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `restoreTemplateId` | query | string | yes | Required. The ID of the restore template to create. The ID must be unique for the specified project and location. |

### `backupdr.projects.locations.restoreTemplates.delete`

- Versions: v1, v1beta
- `DELETE https://backupdr.googleapis.com/v1/{+name}`
- Deletes a RestoreTemplate.
- Scopes: `https://www.googleapis.com/auth/cloud-backupdr`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the restore template to delete. Format: 'projects/{project_id}/locations/{location}/restoreTemplates/{restore_template_id}' |
| `force` | query | boolean | no | Optional. If set to true, any child RestoreTemplateExecutions will also be deleted. If false and the RestoreTemplate has any child executions, the request will fail. |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `backupdr.projects.locations.restoreTemplates.executions.get`

- Versions: v1, v1beta
- `GET https://backupdr.googleapis.com/v1/{+name}`
- Gets details of a RestoreTemplateExecution.
- Scopes: `https://www.googleapis.com/auth/cloud-backupdr`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `RestoreTemplateExecution`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the restore template execution to retrieve. Format: 'projects/{project_id}/locations/{location}/restoreTemplates/{restore_template_id}/executions/{execution_id}' |

### `backupdr.projects.locations.restoreTemplates.executions.list`

- Versions: v1, v1beta
- `GET https://backupdr.googleapis.com/v1/{+parent}/executions`
- Lists RestoreTemplateExecutions in a given project, location and restore template.
- Scopes: `https://www.googleapis.com/auth/cloud-backupdr`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListRestoreTemplateExecutionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The project, location, and restore template for which to retrieve executions information. Format: `projects/{project}/locations/{location}/restoreTemplates/{restore_template}`. |
| `filter` | query | string | no | Optional. Filtering results. |
| `orderBy` | query | string | no | Optional. Hint for how to order the results. |
| `pageSize` | query | integer (int32) | no | Optional. Requested page size. |
| `pageToken` | query | string | no | Optional. A token identifying a page of results. |

### `backupdr.projects.locations.restoreTemplates.executions.triggerRestoreCleanup`

- Versions: v1, v1beta
- `POST https://backupdr.googleapis.com/v1/{+name}:triggerRestoreCleanup`
- Triggers cleanup of restored resources created during execution.
- Scopes: `https://www.googleapis.com/auth/cloud-backupdr`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `TriggerRestoreCleanupRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the restore template execution. Format: 'projects/{project_id}/locations/{location}/restoreTemplates/{restore_template_id}/executions/{execution_id}' |

### `backupdr.projects.locations.restoreTemplates.get`

- Versions: v1, v1beta
- `GET https://backupdr.googleapis.com/v1/{+name}`
- Gets details of a RestoreTemplate.
- Scopes: `https://www.googleapis.com/auth/cloud-backupdr`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `RestoreTemplate`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the restore template to retrieve. Format: 'projects/{project_id}/locations/{location}/restoreTemplates/{restore_template_id}' |

### `backupdr.projects.locations.restoreTemplates.list`

- Versions: v1, v1beta
- `GET https://backupdr.googleapis.com/v1/{+parent}/restoreTemplates`
- Lists RestoreTemplates in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-backupdr`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListRestoreTemplatesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The project and location from which to list the restore templates. Format: `projects/{project}/locations/{location}`. |
| `filter` | query | string | no | Optional. Field match expression used to filter the results. |
| `orderBy` | query | string | no | Optional. Field by which to sort the results. |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of items to return. |
| `pageToken` | query | string | no | Optional. A page token, received from a previous `ListRestoreTemplates` call. |

### `backupdr.projects.locations.restoreTemplates.patch`

- Versions: v1, v1beta
- `PATCH https://backupdr.googleapis.com/v1/{+name}`
- Updates the settings of a RestoreTemplate.
- Scopes: `https://www.googleapis.com/auth/cloud-backupdr`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `RestoreTemplate`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. The resource name of the RestoreTemplate. |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `updateMask` | query | string (google-fieldmask) | no | Optional. The list of fields to update. Field mask is used to specify the fields to be overwritten in the RestoreTemplate resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it is in the mask. |
| `validateOnly` | query | boolean | no | Optional. Only validate the request, but do not perform mutations. The default is 'false'. |

### `backupdr.projects.locations.restoreTemplates.run`

- Versions: v1, v1beta
- `POST https://backupdr.googleapis.com/v1/{+name}:run`
- Runs a RestoreTemplate.
- Scopes: `https://www.googleapis.com/auth/cloud-backupdr`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `RunRestoreTemplateRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the restore template to run. Format: 'projects/{project_id}/locations/{location}/restoreTemplates/{restore_template_id}' |

### `backupdr.projects.locations.restoreVerificationPlans.associations.create`

- Versions: v1, v1beta
- `POST https://backupdr.googleapis.com/v1/{+parent}/associations`
- Creates a new RestoreVerificationPlanAssociation in a given RestoreVerificationPlan.
- Scopes: `https://www.googleapis.com/auth/cloud-backupdr`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `RestoreVerificationPlanAssociation`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource where this association will be created. Format: `projects/{project}/locations/{location}/restoreVerificationPlans/{restore_verification_plan}` |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know that the server has already received the duplicate request and can avoid responding with an error. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `restoreVerificationPlanAssociationId` | query | string | yes | Required. The ID to use for the association, which will become the final component of the association's resource name. This value should be 1-63 characters, and valid characters are /\[a-z0-9\_-\]/. |

### `backupdr.projects.locations.restoreVerificationPlans.associations.delete`

- Versions: v1, v1beta
- `DELETE https://backupdr.googleapis.com/v1/{+name}`
- Deletes a single RestoreVerificationPlanAssociation in a given RestoreVerificationPlan.
- Scopes: `https://www.googleapis.com/auth/cloud-backupdr`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the RestoreVerificationPlanAssociation to delete. Format: `projects/{project}/locations/{location}/restoreVerificationPlans/{restore_verification_plan}/associations/{association}` |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know that the server has already received the duplicate request and can avoid responding with an error. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `backupdr.projects.locations.restoreVerificationPlans.associations.get`

- Versions: v1, v1beta
- `GET https://backupdr.googleapis.com/v1/{+name}`
- Gets details of a single RestoreVerificationPlanAssociation in a given RestoreVerificationPlan.
- Scopes: `https://www.googleapis.com/auth/cloud-backupdr`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `RestoreVerificationPlanAssociation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the RestoreVerificationPlanAssociation to retrieve. Format: `projects/{project}/locations/{location}/restoreVerificationPlans/{restore_verification_plan}/associations/{association}` |

### `backupdr.projects.locations.restoreVerificationPlans.associations.list`

- Versions: v1, v1beta
- `GET https://backupdr.googleapis.com/v1/{+parent}/associations`
- Lists RestoreVerificationPlanAssociations in a given RestoreVerificationPlan.
- Scopes: `https://www.googleapis.com/auth/cloud-backupdr`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListRestoreVerificationPlanAssociationsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent RestoreVerificationPlan name. Format: `projects/{project}/locations/{location}/restoreVerificationPlans/{restore_verification_plan}` |
| `filter` | query | string | no | Optional. Filtering results. |
| `orderBy` | query | string | no | Optional. Hint for how to order the results. |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of associations to return. The service may return fewer than this value. If unspecified, at most 500 associations will be returned. The maximum value is 1000; values above 1000 will be coerced to 1000. |
| `pageToken` | query | string | no | Optional. A page token, received from a previous `ListRestoreVerificationPlanAssociations` call. Provide this to retrieve the subsequent page. When paginating, all other parameters provided to `ListRestoreVerificationPlanAssociations` must match the call that provided the page token. |

### `backupdr.projects.locations.restoreVerificationPlans.associations.triggerRestoreVerification`

- Versions: v1, v1beta
- `POST https://backupdr.googleapis.com/v1/{+name}:triggerRestoreVerification`
- Triggers a new Restore Verification for the association in a given RestoreVerificationPlan.
- Scopes: `https://www.googleapis.com/auth/cloud-backupdr`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `TriggerRestoreVerificationRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the RestoreVerificationPlanAssociation to trigger. Format: `projects/{project}/locations/{location}/restoreVerificationPlans/{restore_verification_plan}/associations/{association}` |

### `backupdr.projects.locations.restoreVerificationPlans.create`

- Versions: v1, v1beta
- `POST https://backupdr.googleapis.com/v1/{+parent}/restoreVerificationPlans`
- Creates a new RestoreVerificationPlan in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-backupdr`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `RestoreVerificationPlan`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The `RestoreVerificationPlan` project and location in the format `projects/{project}/locations/{location}`. In Google Cloud Backup and DR locations map to Google Cloud regions, for example \*\*us-central1\*\*. |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `restoreVerificationPlanId` | query | string | yes | Required. The name of the `RestoreVerificationPlan` to create. The name must be unique for the specified project and location. The name must start with a lowercase letter followed by up to 62 lowercase letters, numbers, or hyphens. Pattern, `^[a-z]([-a-z0-9]*[a-z0-9])?$`. |

### `backupdr.projects.locations.restoreVerificationPlans.delete`

- Versions: v1, v1beta
- `DELETE https://backupdr.googleapis.com/v1/{+name}`
- Deletes a single RestoreVerificationPlan. If the `force` flag is set to `true`, any RestoreVerificationPlanAssociations linked to this RestoreVerificationPlan will also be deleted.
- Scopes: `https://www.googleapis.com/auth/cloud-backupdr`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the `RestoreVerificationPlan` to delete. Format: `projects/{project}/locations/{location}/restoreVerificationPlans/{restoreVerificationPlan}` |
| `force` | query | boolean | no | Optional. If set to true, any RestoreVerificationPlanAssociations linked to this RestoreVerificationPlan will also be deleted. |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `backupdr.projects.locations.restoreVerificationPlans.get`

- Versions: v1, v1beta
- `GET https://backupdr.googleapis.com/v1/{+name}`
- Gets details of a single RestoreVerificationPlan. Returns the requested RestoreVerificationPlan.
- Scopes: `https://www.googleapis.com/auth/cloud-backupdr`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `RestoreVerificationPlan`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the `RestoreVerificationPlan` to retrieve. Format: `projects/{project}/locations/{location}/restoreVerificationPlans/{restoreVerificationPlan}` |

### `backupdr.projects.locations.restoreVerificationPlans.list`

- Versions: v1, v1beta
- `GET https://backupdr.googleapis.com/v1/{+parent}/restoreVerificationPlans`
- Lists RestoreVerificationPlans in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-backupdr`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListRestoreVerificationPlansResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The project and location for which to retrieve `RestoreVerificationPlans` information. Format: `projects/{project}/locations/{location}`. In Google Cloud Backup and DR, locations map to Google Cloud regions, for example \*\*us-central1\*\*. To retrieve restore verification plans for all locations, use "-" for the `{location}` value. |
| `filter` | query | string | no | Optional. Field match expression used to filter the results. |
| `orderBy` | query | string | no | Optional. Field by which to sort the results. |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of `RestoreVerificationPlans` to return in a single response. If not specified, a default value will be chosen by the service. Note that the response may include a partial list and a caller should only rely on the response's next_page_token to determine if there are more instances left to be queried. |
| `pageToken` | query | string | no | Optional. The value of next_page_token received from a previous `ListRestoreVerificationPlans` call. Provide this to retrieve the subsequent page in a multi-page list of results. When paginating, all other parameters provided to `ListRestoreVerificationPlans` must match the call that provided the page token. |

### `backupdr.projects.locations.serviceConfig.initialize`

- Versions: v1, v1beta
- `POST https://backupdr.googleapis.com/v1/{+name}:initialize`
- Initializes the service related config for a project.
- Scopes: `https://www.googleapis.com/auth/cloud-backupdr`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `InitializeServiceRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the serviceConfig used to initialize the service. The location must be the location of the BackupVault. Format: `projects/{project_id}/locations/{location}/serviceConfig`. |

### `backupdr.projects.locations.trial.end`

- Versions: v1, v1beta
- `POST https://backupdr.googleapis.com/v1/{+parent}/trial:end`
- Ends the trial for a project
- Scopes: `https://www.googleapis.com/auth/cloud-backupdr`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `EndTrialRequest`; Response: `Trial`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource where the trial has been created. Format: projects/{project}/locations/{location} |

### `backupdr.projects.locations.trial.subscribe`

- Versions: v1, v1beta
- `POST https://backupdr.googleapis.com/v1/{+parent}/trial:subscribe`
- Subscribes to a trial for a project
- Scopes: `https://www.googleapis.com/auth/cloud-backupdr`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `SubscribeTrialRequest`; Response: `Trial`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The project where this trial will be created. Format: projects/{project}/locations/{location} Supported Locations are - us, eu and asia. |

### Example request skeleton

Generated from the Discovery entry of `backupdr.folders.locations.resourceBackupConfigs.fetch` (not in the official docs); replace the `{...}` path variables (URL-encode query values):

```bash
curl -X GET \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  "https://backupdr.googleapis.com/v1/{+parent}/resourceBackupConfigs:fetch"
```

## Notes

- Generated from the Discovery document(s) v1, v1beta of `backupdr` (retrieved 2026-11-14). Resources on this page: folders, organizations, projects.
- The Required column is `yes` for path variables and required parameters, and `conditional` when the description says "Required if ..." (mutually exclusive alternatives), when a `parent.child` parameter is required only inside an optional parent message or one branch of a oneof. Path variables are `yes` unless a note below names an alternative route without them.
- Message schemas (the request and response types named above) are listed under `references/rest-schemas/backupdr/`; they are the `schemas` section of the Discovery documents in Source.
- Corrected from the official docs (the Discovery text above is verbatim): the data source `name` format is written `.../backupVaults/{resource_name}/dataSource/{resource_name}`; the collection is `dataSources` (Discovery path pattern `projects/{project_id}/locations/{location}/backupVaults/{backup_vault}/dataSources/{data_source}`).
- Corrected from the official docs (the Discovery text above is verbatim): the `parent` descriptions of `backupVaults.dataSources.list` and `backupVaults.dataSources.backups.list` give the format `projects/{project_id}/locations/{location}`, but the Discovery path patterns require the backup vault (`projects/{project_id}/locations/{location}/backupVaults/{backup_vault}`) and, for `backups.list`, the data source (`.../backupVaults/{backup_vault}/dataSources/{data_source}`); the `-` wildcard that the descriptions mention stands for `{location}` in those longer paths.
- Descriptions are verbatim from Discovery, which drops angle-bracket placeholders of the source comments: a format such as `projects//locations/global` stands for `projects/{project}/locations/global` (likewise `"@.iam.gserviceaccount.com"` lost the account ID before `@`, and a name format ending in a collection such as `projects/*/locations/*/registrations/` lost its last ID), and an expression such as `... && in labels` lost its left operand (for example `'label_value' in labels`). Check the method or field in the product's REST reference before relying on such a format.
- Source: https://backupdr.googleapis.com/$discovery/rest?version=v1, https://backupdr.googleapis.com/$discovery/rest?version=v1beta (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
