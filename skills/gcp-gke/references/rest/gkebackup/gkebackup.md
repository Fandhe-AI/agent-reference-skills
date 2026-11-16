---
source: https://gkebackup.googleapis.com/$discovery/rest?version=v1
---

# Backup for GKE API REST API (gkebackup)

## Signature / Usage

Base URL: `https://gkebackup.googleapis.com`. Methods are listed by `id`; the `Versions` line shows which API versions define the method (preferred: v1).

### `gkebackup.projects.locations.backupChannels.backupPlanBindings.get`

- Versions: v1
- `GET https://gkebackup.googleapis.com/v1/{+name}`
- Retrieve the details of a single BackupPlanBinding.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `BackupPlanBinding`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Fully qualified BackupPlanBinding name. Format: `projects/*/locations/*/backupChannels/*/backupPlanBindings/*` |

### `gkebackup.projects.locations.backupChannels.backupPlanBindings.list`

- Versions: v1
- `GET https://gkebackup.googleapis.com/v1/{+parent}/backupPlanBindings`
- Lists BackupPlanBindings in a given location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListBackupPlanBindingsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The BackupChannel that contains the BackupPlanBindings to list. Format: `projects/*/locations/*/backupChannels/*` |
| `filter` | query | string | no | Optional. Field match expression used to filter the results. |
| `orderBy` | query | string | no | Optional. Field by which to sort the results. |
| `pageSize` | query | integer (int32) | no | Optional. The target number of results to return in a single response. If not specified, a default value will be chosen by the service. Note that the response may include a partial list and a caller should only rely on the response's next_page_token to determine if there are more instances left to be queried. |
| `pageToken` | query | string | no | Optional. The value of next_page_token received from a previous `ListBackupPlanBindings` call. Provide this to retrieve the subsequent page in a multi-page list of results. When paginating, all other parameters provided to `ListBackupPlanBindings` must match the call that provided the page token. |

### `gkebackup.projects.locations.backupChannels.create`

- Versions: v1
- `POST https://gkebackup.googleapis.com/v1/{+parent}/backupChannels`
- Creates a new BackupChannel in a given location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `BackupChannel`; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The location within which to create the BackupChannel. Format: `projects/*/locations/*` |
| `backupChannelId` | query | string | no | Optional. The client-provided short name for the BackupChannel resource. This name must: - be between 1 and 63 characters long (inclusive) - consist of only lower-case ASCII letters, numbers, and dashes - start with a lower-case letter - end with a lower-case letter or number - be unique within the set of BackupChannels in this location If the user does not provide a name, a uuid will be used as the name. |

### `gkebackup.projects.locations.backupChannels.delete`

- Versions: v1
- `DELETE https://gkebackup.googleapis.com/v1/{+name}`
- Deletes an existing BackupChannel.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Fully qualified BackupChannel name. Format: `projects/*/locations/*/backupChannels/*` |
| `etag` | query | string | no | Optional. If provided, this value must match the current value of the target BackupChannel's etag field or the request is rejected. |
| `force` | query | boolean | no | Optional. If set to true, any BackupPlanAssociations below this BackupChannel will also be deleted. Otherwise, the request will only succeed if the BackupChannel has no BackupPlanAssociations. |

### `gkebackup.projects.locations.backupChannels.get`

- Versions: v1
- `GET https://gkebackup.googleapis.com/v1/{+name}`
- Retrieve the details of a single BackupChannel.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `BackupChannel`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Fully qualified BackupChannel name. Format: `projects/*/locations/*/backupChannels/*` |

### `gkebackup.projects.locations.backupChannels.list`

- Versions: v1
- `GET https://gkebackup.googleapis.com/v1/{+parent}/backupChannels`
- Lists BackupChannels in a given location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListBackupChannelsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The location that contains the BackupChannels to list. Format: `projects/*/locations/*` |
| `filter` | query | string | no | Optional. Field match expression used to filter the results. |
| `orderBy` | query | string | no | Optional. Field by which to sort the results. |
| `pageSize` | query | integer (int32) | no | Optional. The target number of results to return in a single response. If not specified, a default value will be chosen by the service. Note that the response may include a partial list and a caller should only rely on the response's next_page_token to determine if there are more instances left to be queried. |
| `pageToken` | query | string | no | Optional. The value of next_page_token received from a previous `ListBackupChannels` call. Provide this to retrieve the subsequent page in a multi-page list of results. When paginating, all other parameters provided to `ListBackupChannels` must match the call that provided the page token. |

### `gkebackup.projects.locations.backupChannels.patch`

- Versions: v1
- `PATCH https://gkebackup.googleapis.com/v1/{+name}`
- Update a BackupChannel.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `BackupChannel`; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. The fully qualified name of the BackupChannel. `projects/*/locations/*/backupChannels/*` |
| `updateMask` | query | string (google-fieldmask) | no | Optional. This is used to specify the fields to be overwritten in the BackupChannel targeted for update. The values for each of these updated fields will be taken from the `backup_channel` provided with this request. Field names are relative to the root of the resource (e.g., `description`, `labels`, etc.) If no `update_mask` is provided, all fields in `backup_channel` will be written to the target BackupChannel resource. Note that OUTPUT_ONLY and IMMUTABLE fields in `backup_channel` are ignored and are not used to update the target BackupChannel. |

### `gkebackup.projects.locations.backupPlans.backups.create`

- Versions: v1
- `POST https://gkebackup.googleapis.com/v1/{+parent}/backups`
- Creates a Backup for the given BackupPlan.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Backup`; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The BackupPlan within which to create the Backup. Format: `projects/*/locations/*/backupPlans/*` |
| `backupId` | query | string | no | Optional. The client-provided short name for the Backup resource. This name must: - be between 1 and 63 characters long (inclusive) - consist of only lower-case ASCII letters, numbers, and dashes - start with a lower-case letter - end with a lower-case letter or number - be unique within the set of Backups in this BackupPlan |

### `gkebackup.projects.locations.backupPlans.backups.delete`

- Versions: v1
- `DELETE https://gkebackup.googleapis.com/v1/{+name}`
- Deletes an existing Backup.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the Backup resource. Format: `projects/*/locations/*/backupPlans/*/backups/*` |
| `etag` | query | string | no | Optional. If provided, this value must match the current value of the target Backup's etag field or the request is rejected. |
| `force` | query | boolean | no | Optional. If set to true, any VolumeBackups below this Backup will also be deleted. Otherwise, the request will only succeed if the Backup has no VolumeBackups. |

### `gkebackup.projects.locations.backupPlans.backups.get`

- Versions: v1
- `GET https://gkebackup.googleapis.com/v1/{+name}`
- Retrieve the details of a single Backup.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Backup`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Full name of the Backup resource. Format: `projects/*/locations/*/backupPlans/*/backups/*` |

### `gkebackup.projects.locations.backupPlans.backups.getBackupIndexDownloadUrl`

- Versions: v1
- `GET https://gkebackup.googleapis.com/v1/{+backup}:getBackupIndexDownloadUrl`
- Retrieve the link to the backupIndex.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GetBackupIndexDownloadUrlResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `backup` | path | string | yes | Required. Full name of Backup resource. Format: projects/{project}/locations/{location}/backupPlans/{backup_plan}/backups/{backup} |

### `gkebackup.projects.locations.backupPlans.backups.getIamPolicy`

- Versions: v1
- `GET https://gkebackup.googleapis.com/v1/{+resource}:getIamPolicy`
- Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |
| `options.requestedPolicyVersion` | query | integer (int32) | no | Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |

### `gkebackup.projects.locations.backupPlans.backups.list`

- Versions: v1
- `GET https://gkebackup.googleapis.com/v1/{+parent}/backups`
- Lists the Backups for a given BackupPlan.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListBackupsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The BackupPlan that contains the Backups to list. Format: `projects/*/locations/*/backupPlans/*` |
| `filter` | query | string | no | Optional. Field match expression used to filter the results. |
| `orderBy` | query | string | no | Optional. Field by which to sort the results. |
| `pageSize` | query | integer (int32) | no | Optional. The target number of results to return in a single response. If not specified, a default value will be chosen by the service. Note that the response may include a partial list and a caller should only rely on the response's next_page_token to determine if there are more instances left to be queried. |
| `pageToken` | query | string | no | Optional. The value of next_page_token received from a previous `ListBackups` call. Provide this to retrieve the subsequent page in a multi-page list of results. When paginating, all other parameters provided to `ListBackups` must match the call that provided the page token. |
| `returnPartialSuccess` | query | boolean | no | Optional. If set to true, the response will return partial results when some regions are unreachable and the unreachable field will be populated. |

### `gkebackup.projects.locations.backupPlans.backups.patch`

- Versions: v1
- `PATCH https://gkebackup.googleapis.com/v1/{+name}`
- Update a Backup.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Backup`; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Output only. Identifier. The fully qualified name of the Backup. `projects/*/locations/*/backupPlans/*/backups/*` |
| `updateMask` | query | string (google-fieldmask) | no | Optional. This is used to specify the fields to be overwritten in the Backup targeted for update. The values for each of these updated fields will be taken from the `backup_plan` provided with this request. Field names are relative to the root of the resource. If no `update_mask` is provided, all fields in `backup` will be written to the target Backup resource. Note that OUTPUT_ONLY and IMMUTABLE fields in `backup` are ignored and are not used to update the target Backup. |

### `gkebackup.projects.locations.backupPlans.backups.setIamPolicy`

- Versions: v1
- `POST https://gkebackup.googleapis.com/v1/{+resource}:setIamPolicy`
- Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `SetIamPolicyRequest`; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `gkebackup.projects.locations.backupPlans.backups.testIamPermissions`

- Versions: v1
- `POST https://gkebackup.googleapis.com/v1/{+resource}:testIamPermissions`
- Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `TestIamPermissionsRequest`; Response: `TestIamPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `gkebackup.projects.locations.backupPlans.backups.volumeBackups.get`

- Versions: v1
- `GET https://gkebackup.googleapis.com/v1/{+name}`
- Retrieve the details of a single VolumeBackup.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `VolumeBackup`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Full name of the VolumeBackup resource. Format: `projects/*/locations/*/backupPlans/*/backups/*/volumeBackups/*` |

### `gkebackup.projects.locations.backupPlans.backups.volumeBackups.getIamPolicy`

- Versions: v1
- `GET https://gkebackup.googleapis.com/v1/{+resource}:getIamPolicy`
- Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |
| `options.requestedPolicyVersion` | query | integer (int32) | no | Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |

### `gkebackup.projects.locations.backupPlans.backups.volumeBackups.list`

- Versions: v1
- `GET https://gkebackup.googleapis.com/v1/{+parent}/volumeBackups`
- Lists the VolumeBackups for a given Backup.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListVolumeBackupsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The Backup that contains the VolumeBackups to list. Format: `projects/*/locations/*/backupPlans/*/backups/*` |
| `filter` | query | string | no | Optional. Field match expression used to filter the results. |
| `orderBy` | query | string | no | Optional. Field by which to sort the results. |
| `pageSize` | query | integer (int32) | no | Optional. The target number of results to return in a single response. If not specified, a default value will be chosen by the service. Note that the response may include a partial list and a caller should only rely on the response's next_page_token to determine if there are more instances left to be queried. |
| `pageToken` | query | string | no | Optional. The value of next_page_token received from a previous `ListVolumeBackups` call. Provide this to retrieve the subsequent page in a multi-page list of results. When paginating, all other parameters provided to `ListVolumeBackups` must match the call that provided the page token. |

### `gkebackup.projects.locations.backupPlans.backups.volumeBackups.setIamPolicy`

- Versions: v1
- `POST https://gkebackup.googleapis.com/v1/{+resource}:setIamPolicy`
- Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `SetIamPolicyRequest`; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `gkebackup.projects.locations.backupPlans.backups.volumeBackups.testIamPermissions`

- Versions: v1
- `POST https://gkebackup.googleapis.com/v1/{+resource}:testIamPermissions`
- Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `TestIamPermissionsRequest`; Response: `TestIamPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `gkebackup.projects.locations.backupPlans.create`

- Versions: v1
- `POST https://gkebackup.googleapis.com/v1/{+parent}/backupPlans`
- Creates a new BackupPlan in a given location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `BackupPlan`; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The location within which to create the BackupPlan. Format: `projects/*/locations/*` |
| `backupPlanId` | query | string | yes | Required. The client-provided short name for the BackupPlan resource. This name must: - be between 1 and 63 characters long (inclusive) - consist of only lower-case ASCII letters, numbers, and dashes - start with a lower-case letter - end with a lower-case letter or number - be unique within the set of BackupPlans in this location |

### `gkebackup.projects.locations.backupPlans.delete`

- Versions: v1
- `DELETE https://gkebackup.googleapis.com/v1/{+name}`
- Deletes an existing BackupPlan.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Fully qualified BackupPlan name. Format: `projects/*/locations/*/backupPlans/*` |
| `etag` | query | string | no | Optional. If provided, this value must match the current value of the target BackupPlan's etag field or the request is rejected. |

### `gkebackup.projects.locations.backupPlans.get`

- Versions: v1
- `GET https://gkebackup.googleapis.com/v1/{+name}`
- Retrieve the details of a single BackupPlan.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `BackupPlan`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Fully qualified BackupPlan name. Format: `projects/*/locations/*/backupPlans/*` |

### `gkebackup.projects.locations.backupPlans.getIamPolicy`

- Versions: v1
- `GET https://gkebackup.googleapis.com/v1/{+resource}:getIamPolicy`
- Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |
| `options.requestedPolicyVersion` | query | integer (int32) | no | Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |

### `gkebackup.projects.locations.backupPlans.getTags`

- Versions: v1
- `GET https://gkebackup.googleapis.com/v1/{+name}:getTags`
- Returns tags directly bound to a GCP resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GetTagsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The full resource name of the service resource. |

### `gkebackup.projects.locations.backupPlans.list`

- Versions: v1
- `GET https://gkebackup.googleapis.com/v1/{+parent}/backupPlans`
- Lists BackupPlans in a given location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListBackupPlansResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The location that contains the BackupPlans to list. Format: `projects/*/locations/*` |
| `filter` | query | string | no | Optional. Field match expression used to filter the results. |
| `orderBy` | query | string | no | Optional. Field by which to sort the results. |
| `pageSize` | query | integer (int32) | no | Optional. The target number of results to return in a single response. If not specified, a default value will be chosen by the service. Note that the response may include a partial list and a caller should only rely on the response's next_page_token to determine if there are more instances left to be queried. |
| `pageToken` | query | string | no | Optional. The value of next_page_token received from a previous `ListBackupPlans` call. Provide this to retrieve the subsequent page in a multi-page list of results. When paginating, all other parameters provided to `ListBackupPlans` must match the call that provided the page token. |

### `gkebackup.projects.locations.backupPlans.patch`

- Versions: v1
- `PATCH https://gkebackup.googleapis.com/v1/{+name}`
- Update a BackupPlan.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `BackupPlan`; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Output only. Identifier. The full name of the BackupPlan resource. Format: `projects/*/locations/*/backupPlans/*` |
| `updateMask` | query | string (google-fieldmask) | no | Optional. This is used to specify the fields to be overwritten in the BackupPlan targeted for update. The values for each of these updated fields will be taken from the `backup_plan` provided with this request. Field names are relative to the root of the resource (e.g., `description`, `backup_config.include_volume_data`, etc.) If no `update_mask` is provided, all fields in `backup_plan` will be written to the target BackupPlan resource. Note that OUTPUT_ONLY and IMMUTABLE fields in `backup_plan` are ignored and are not used to update the target BackupPlan. |

### `gkebackup.projects.locations.backupPlans.setIamPolicy`

- Versions: v1
- `POST https://gkebackup.googleapis.com/v1/{+resource}:setIamPolicy`
- Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `SetIamPolicyRequest`; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `gkebackup.projects.locations.backupPlans.setTags`

- Versions: v1
- `POST https://gkebackup.googleapis.com/v1/{+name}:setTags`
- Updates tags directly bound to a GCP resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `SetTagsRequest`; Response: `SetTagsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The full resource name of the service resource. |

### `gkebackup.projects.locations.backupPlans.testIamPermissions`

- Versions: v1
- `POST https://gkebackup.googleapis.com/v1/{+resource}:testIamPermissions`
- Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `TestIamPermissionsRequest`; Response: `TestIamPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `gkebackup.projects.locations.get`

- Versions: v1
- `GET https://gkebackup.googleapis.com/v1/{+name}`
- Gets information about a location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Location`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Resource name for the location. |

### `gkebackup.projects.locations.list`

- Versions: v1
- `GET https://gkebackup.googleapis.com/v1/{+name}/locations`
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

### `gkebackup.projects.locations.operations.cancel`

- Versions: v1
- `POST https://gkebackup.googleapis.com/v1/{+name}:cancel`
- Starts asynchronous cancellation on a long-running operation. The server makes a best effort to cancel the operation, but success is not guaranteed. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. Clients can use Operations.GetOperation or other methods to check whether the cancellation succeeded or whether the operation completed despite cancellation. On successful cancellation, the operation is not deleted; instead, it becomes an operation with an Operation.error value with a google.rpc.Status.code of `1`, corresponding to `Code.CANCELLED`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleLongrunningCancelOperationRequest`; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource to be cancelled. |

### `gkebackup.projects.locations.operations.delete`

- Versions: v1
- `DELETE https://gkebackup.googleapis.com/v1/{+name}`
- Deletes a long-running operation. This method indicates that the client is no longer interested in the operation result. It does not cancel the operation. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource to be deleted. |

### `gkebackup.projects.locations.operations.get`

- Versions: v1
- `GET https://gkebackup.googleapis.com/v1/{+name}`
- Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource. |

### `gkebackup.projects.locations.operations.list`

- Versions: v1
- `GET https://gkebackup.googleapis.com/v1/{+name}/operations`
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

### `gkebackup.projects.locations.restoreChannels.create`

- Versions: v1
- `POST https://gkebackup.googleapis.com/v1/{+parent}/restoreChannels`
- Creates a new RestoreChannel in a given location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `RestoreChannel`; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The location within which to create the RestoreChannel. Format: `projects/*/locations/*` |
| `restoreChannelId` | query | string | no | Optional. The client-provided short name for the RestoreChannel resource. This name must: - be between 1 and 63 characters long (inclusive) - consist of only lower-case ASCII letters, numbers, and dashes - start with a lower-case letter - end with a lower-case letter or number - be unique within the set of RestoreChannels in this location If the user does not provide a name, a uuid will be used as the name. |

### `gkebackup.projects.locations.restoreChannels.delete`

- Versions: v1
- `DELETE https://gkebackup.googleapis.com/v1/{+name}`
- Deletes an existing RestoreChannel.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Fully qualified RestoreChannel name. Format: `projects/*/locations/*/restoreChannels/*` |
| `etag` | query | string | no | Optional. If provided, this value must match the current value of the target RestoreChannel's etag field or the request is rejected. |

### `gkebackup.projects.locations.restoreChannels.get`

- Versions: v1
- `GET https://gkebackup.googleapis.com/v1/{+name}`
- Retrieve the details of a single RestoreChannel.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `RestoreChannel`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Fully qualified RestoreChannel name. Format: `projects/*/locations/*/restoreChannels/*` |

### `gkebackup.projects.locations.restoreChannels.list`

- Versions: v1
- `GET https://gkebackup.googleapis.com/v1/{+parent}/restoreChannels`
- Lists RestoreChannels in a given location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListRestoreChannelsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The location that contains the RestoreChannels to list. Format: `projects/*/locations/*` |
| `filter` | query | string | no | Optional. Field match expression used to filter the results. |
| `orderBy` | query | string | no | Optional. Field by which to sort the results. |
| `pageSize` | query | integer (int32) | no | Optional. The target number of results to return in a single response. If not specified, a default value will be chosen by the service. Note that the response may include a partial list and a caller should only rely on the response's next_page_token to determine if there are more instances left to be queried. |
| `pageToken` | query | string | no | Optional. The value of next_page_token received from a previous `ListRestoreChannels` call. Provide this to retrieve the subsequent page in a multi-page list of results. When paginating, all other parameters provided to `ListRestoreChannels` must match the call that provided the page token. |

### `gkebackup.projects.locations.restoreChannels.patch`

- Versions: v1
- `PATCH https://gkebackup.googleapis.com/v1/{+name}`
- Update a RestoreChannel.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `RestoreChannel`; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. The fully qualified name of the RestoreChannel. `projects/*/locations/*/restoreChannels/*` |
| `updateMask` | query | string (google-fieldmask) | no | Optional. This is used to specify the fields to be overwritten in the RestoreChannel targeted for update. The values for each of these updated fields will be taken from the `restore_channel` provided with this request. Field names are relative to the root of the resource (e.g., `description`, `destination_project_id`, etc.) If no `update_mask` is provided, all fields in `restore_channel` will be written to the target RestoreChannel resource. Note that OUTPUT_ONLY and IMMUTABLE fields in `restore_channel` are ignored and are not used to update the target RestoreChannel. |

### `gkebackup.projects.locations.restoreChannels.restorePlanBindings.get`

- Versions: v1
- `GET https://gkebackup.googleapis.com/v1/{+name}`
- Retrieve the details of a single RestorePlanBinding.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `RestorePlanBinding`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Fully qualified RestorePlanBinding name. Format: `projects/*/locations/*/restoreChannels/*/restorePlanBindings/*` |

### `gkebackup.projects.locations.restoreChannels.restorePlanBindings.list`

- Versions: v1
- `GET https://gkebackup.googleapis.com/v1/{+parent}/restorePlanBindings`
- Lists RestorePlanBindings in a given location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListRestorePlanBindingsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The RestoreChannel that contains the ListRestorePlanBindings to list. Format: `projects/*/locations/*/restoreChannels/*` |
| `filter` | query | string | no | Optional. Field match expression used to filter the results. |
| `orderBy` | query | string | no | Optional. Field by which to sort the results. |
| `pageSize` | query | integer (int32) | no | Optional. The target number of results to return in a single response. If not specified, a default value will be chosen by the service. Note that the response may include a partial list and a caller should only rely on the response's next_page_token to determine if there are more instances left to be queried. |
| `pageToken` | query | string | no | Optional. The value of next_page_token received from a previous `ListRestorePlanBindings` call. Provide this to retrieve the subsequent page in a multi-page list of results. When paginating, all other parameters provided to `ListRestorePlanBindings` must match the call that provided the page token. |

### `gkebackup.projects.locations.restorePlans.create`

- Versions: v1
- `POST https://gkebackup.googleapis.com/v1/{+parent}/restorePlans`
- Creates a new RestorePlan in a given location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `RestorePlan`; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The location within which to create the RestorePlan. Format: `projects/*/locations/*` |
| `restorePlanId` | query | string | yes | Required. The client-provided short name for the RestorePlan resource. This name must: - be between 1 and 63 characters long (inclusive) - consist of only lower-case ASCII letters, numbers, and dashes - start with a lower-case letter - end with a lower-case letter or number - be unique within the set of RestorePlans in this location |

### `gkebackup.projects.locations.restorePlans.delete`

- Versions: v1
- `DELETE https://gkebackup.googleapis.com/v1/{+name}`
- Deletes an existing RestorePlan.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Fully qualified RestorePlan name. Format: `projects/*/locations/*/restorePlans/*` |
| `etag` | query | string | no | Optional. If provided, this value must match the current value of the target RestorePlan's etag field or the request is rejected. |
| `force` | query | boolean | no | Optional. If set to true, any Restores below this RestorePlan will also be deleted. Otherwise, the request will only succeed if the RestorePlan has no Restores. |

### `gkebackup.projects.locations.restorePlans.get`

- Versions: v1
- `GET https://gkebackup.googleapis.com/v1/{+name}`
- Retrieve the details of a single RestorePlan.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `RestorePlan`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Fully qualified RestorePlan name. Format: `projects/*/locations/*/restorePlans/*` |

### `gkebackup.projects.locations.restorePlans.getIamPolicy`

- Versions: v1
- `GET https://gkebackup.googleapis.com/v1/{+resource}:getIamPolicy`
- Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |
| `options.requestedPolicyVersion` | query | integer (int32) | no | Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |

### `gkebackup.projects.locations.restorePlans.getTags`

- Versions: v1
- `GET https://gkebackup.googleapis.com/v1/{+name}:getTags`
- Returns tags directly bound to a GCP resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GetTagsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The full resource name of the service resource. |

### `gkebackup.projects.locations.restorePlans.list`

- Versions: v1
- `GET https://gkebackup.googleapis.com/v1/{+parent}/restorePlans`
- Lists RestorePlans in a given location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListRestorePlansResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The location that contains the RestorePlans to list. Format: `projects/*/locations/*` |
| `filter` | query | string | no | Optional. Field match expression used to filter the results. |
| `orderBy` | query | string | no | Optional. Field by which to sort the results. |
| `pageSize` | query | integer (int32) | no | Optional. The target number of results to return in a single response. If not specified, a default value will be chosen by the service. Note that the response may include a partial list and a caller should only rely on the response's next_page_token to determine if there are more instances left to be queried. |
| `pageToken` | query | string | no | Optional. The value of next_page_token received from a previous `ListRestorePlans` call. Provide this to retrieve the subsequent page in a multi-page list of results. When paginating, all other parameters provided to `ListRestorePlans` must match the call that provided the page token. |

### `gkebackup.projects.locations.restorePlans.patch`

- Versions: v1
- `PATCH https://gkebackup.googleapis.com/v1/{+name}`
- Update a RestorePlan.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `RestorePlan`; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Output only. Identifier. The full name of the RestorePlan resource. Format: `projects/*/locations/*/restorePlans/*`. |
| `updateMask` | query | string (google-fieldmask) | no | Optional. This is used to specify the fields to be overwritten in the RestorePlan targeted for update. The values for each of these updated fields will be taken from the `restore_plan` provided with this request. Field names are relative to the root of the resource. If no `update_mask` is provided, all fields in `restore_plan` will be written to the target RestorePlan resource. Note that OUTPUT_ONLY and IMMUTABLE fields in `restore_plan` are ignored and are not used to update the target RestorePlan. |

### `gkebackup.projects.locations.restorePlans.restores.create`

- Versions: v1
- `POST https://gkebackup.googleapis.com/v1/{+parent}/restores`
- Creates a new Restore for the given RestorePlan.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Restore`; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The RestorePlan within which to create the Restore. Format: `projects/*/locations/*/restorePlans/*` |
| `restoreId` | query | string | yes | Required. The client-provided short name for the Restore resource. This name must: - be between 1 and 63 characters long (inclusive) - consist of only lower-case ASCII letters, numbers, and dashes - start with a lower-case letter - end with a lower-case letter or number - be unique within the set of Restores in this RestorePlan. |

### `gkebackup.projects.locations.restorePlans.restores.delete`

- Versions: v1
- `DELETE https://gkebackup.googleapis.com/v1/{+name}`
- Deletes an existing Restore.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Full name of the Restore Format: `projects/*/locations/*/restorePlans/*/restores/*` |
| `etag` | query | string | no | Optional. If provided, this value must match the current value of the target Restore's etag field or the request is rejected. |
| `force` | query | boolean | no | Optional. If set to true, any VolumeRestores below this restore will also be deleted. Otherwise, the request will only succeed if the restore has no VolumeRestores. |

### `gkebackup.projects.locations.restorePlans.restores.get`

- Versions: v1
- `GET https://gkebackup.googleapis.com/v1/{+name}`
- Retrieves the details of a single Restore.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Restore`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the restore resource. Format: `projects/*/locations/*/restorePlans/*/restores/*` |

### `gkebackup.projects.locations.restorePlans.restores.getIamPolicy`

- Versions: v1
- `GET https://gkebackup.googleapis.com/v1/{+resource}:getIamPolicy`
- Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |
| `options.requestedPolicyVersion` | query | integer (int32) | no | Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |

### `gkebackup.projects.locations.restorePlans.restores.list`

- Versions: v1
- `GET https://gkebackup.googleapis.com/v1/{+parent}/restores`
- Lists the Restores for a given RestorePlan.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListRestoresResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The RestorePlan that contains the Restores to list. Format: `projects/*/locations/*/restorePlans/*` |
| `filter` | query | string | no | Optional. Field match expression used to filter the results. |
| `orderBy` | query | string | no | Optional. Field by which to sort the results. |
| `pageSize` | query | integer (int32) | no | Optional. The target number of results to return in a single response. If not specified, a default value will be chosen by the service. Note that the response may include a partial list and a caller should only rely on the response's next_page_token to determine if there are more instances left to be queried. |
| `pageToken` | query | string | no | Optional. The value of next_page_token received from a previous `ListRestores` call. Provide this to retrieve the subsequent page in a multi-page list of results. When paginating, all other parameters provided to `ListRestores` must match the call that provided the page token. |

### `gkebackup.projects.locations.restorePlans.restores.patch`

- Versions: v1
- `PATCH https://gkebackup.googleapis.com/v1/{+name}`
- Update a Restore.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Restore`; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Output only. Identifier. The full name of the Restore resource. Format: `projects/*/locations/*/restorePlans/*/restores/*` |
| `updateMask` | query | string (google-fieldmask) | no | Optional. This is used to specify the fields to be overwritten in the Restore targeted for update. The values for each of these updated fields will be taken from the `restore` provided with this request. Field names are relative to the root of the resource. If no `update_mask` is provided, all fields in `restore` will be written to the target Restore resource. Note that OUTPUT_ONLY and IMMUTABLE fields in `restore` are ignored and are not used to update the target Restore. |

### `gkebackup.projects.locations.restorePlans.restores.setIamPolicy`

- Versions: v1
- `POST https://gkebackup.googleapis.com/v1/{+resource}:setIamPolicy`
- Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `SetIamPolicyRequest`; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `gkebackup.projects.locations.restorePlans.restores.testIamPermissions`

- Versions: v1
- `POST https://gkebackup.googleapis.com/v1/{+resource}:testIamPermissions`
- Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `TestIamPermissionsRequest`; Response: `TestIamPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `gkebackup.projects.locations.restorePlans.restores.volumeRestores.get`

- Versions: v1
- `GET https://gkebackup.googleapis.com/v1/{+name}`
- Retrieve the details of a single VolumeRestore.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `VolumeRestore`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Full name of the VolumeRestore resource. Format: `projects/*/locations/*/restorePlans/*/restores/*/volumeRestores/*` |

### `gkebackup.projects.locations.restorePlans.restores.volumeRestores.getIamPolicy`

- Versions: v1
- `GET https://gkebackup.googleapis.com/v1/{+resource}:getIamPolicy`
- Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |
| `options.requestedPolicyVersion` | query | integer (int32) | no | Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |

### `gkebackup.projects.locations.restorePlans.restores.volumeRestores.list`

- Versions: v1
- `GET https://gkebackup.googleapis.com/v1/{+parent}/volumeRestores`
- Lists the VolumeRestores for a given Restore.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListVolumeRestoresResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The Restore that contains the VolumeRestores to list. Format: `projects/*/locations/*/restorePlans/*/restores/*` |
| `filter` | query | string | no | Optional. Field match expression used to filter the results. |
| `orderBy` | query | string | no | Optional. Field by which to sort the results. |
| `pageSize` | query | integer (int32) | no | Optional. The target number of results to return in a single response. If not specified, a default value will be chosen by the service. Note that the response may include a partial list and a caller should only rely on the response's next_page_token to determine if there are more instances left to be queried. |
| `pageToken` | query | string | no | Optional. The value of next_page_token received from a previous `ListVolumeRestores` call. Provide this to retrieve the subsequent page in a multi-page list of results. When paginating, all other parameters provided to `ListVolumeRestores` must match the call that provided the page token. |

### `gkebackup.projects.locations.restorePlans.restores.volumeRestores.setIamPolicy`

- Versions: v1
- `POST https://gkebackup.googleapis.com/v1/{+resource}:setIamPolicy`
- Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `SetIamPolicyRequest`; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `gkebackup.projects.locations.restorePlans.restores.volumeRestores.testIamPermissions`

- Versions: v1
- `POST https://gkebackup.googleapis.com/v1/{+resource}:testIamPermissions`
- Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `TestIamPermissionsRequest`; Response: `TestIamPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `gkebackup.projects.locations.restorePlans.setIamPolicy`

- Versions: v1
- `POST https://gkebackup.googleapis.com/v1/{+resource}:setIamPolicy`
- Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `SetIamPolicyRequest`; Response: `Policy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### `gkebackup.projects.locations.restorePlans.setTags`

- Versions: v1
- `POST https://gkebackup.googleapis.com/v1/{+name}:setTags`
- Updates tags directly bound to a GCP resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `SetTagsRequest`; Response: `SetTagsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The full resource name of the service resource. |

### `gkebackup.projects.locations.restorePlans.testIamPermissions`

- Versions: v1
- `POST https://gkebackup.googleapis.com/v1/{+resource}:testIamPermissions`
- Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `TestIamPermissionsRequest`; Response: `TestIamPermissionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. |

### Example request skeleton

Generated from the Discovery entry of `gkebackup.projects.locations.backupChannels.backupPlanBindings.get` (not in the official docs); replace the `{...}` path variables (URL-encode query values):

```bash
curl -X GET \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  "https://gkebackup.googleapis.com/v1/{+name}"
```

## Notes

- Generated from the Discovery document(s) v1 of `gkebackup` (retrieved 2026-11-14). Resources on this page: projects.
- The Required column is `yes` for path variables and required parameters, and `conditional` when the description says "Required if ..." (mutually exclusive alternatives), when a `parent.child` parameter is required only inside an optional parent message or one branch of a oneof. Path variables are `yes` unless a note below names an alternative route without them.
- Message schemas (the request and response types named above) are listed under `references/rest-schemas/gkebackup/`; they are the `schemas` section of the Discovery documents in Source.
- Source: https://gkebackup.googleapis.com/$discovery/rest?version=v1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
