---
source: https://netapp.googleapis.com/$discovery/rest?version=v1
---

# NetApp API REST API (netapp)

## Signature / Usage

Base URL: `https://netapp.googleapis.com`. Methods are listed by `id`; the `Versions` line shows which API versions define the method (preferred: v1).

### `netapp.projects.locations.activeDirectories.create`

- Versions: v1, v1beta1
- `POST https://netapp.googleapis.com/v1/{+parent}/activeDirectories`
- CreateActiveDirectory Creates the active directory specified in the request.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `ActiveDirectory`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Value for parent. |
| `activeDirectoryId` | query | string | yes | Required. ID of the active directory to create. Must be unique within the parent resource. Must contain only letters, numbers and hyphen, with the first character a letter , the last a letter or a number, and a 63 character maximum. |

### `netapp.projects.locations.activeDirectories.delete`

- Versions: v1, v1beta1
- `DELETE https://netapp.googleapis.com/v1/{+name}`
- Delete the active directory specified in the request.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the active directory. |

### `netapp.projects.locations.activeDirectories.get`

- Versions: v1, v1beta1
- `GET https://netapp.googleapis.com/v1/{+name}`
- Describes a specified active directory.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ActiveDirectory`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the active directory. |

### `netapp.projects.locations.activeDirectories.list`

- Versions: v1, v1beta1
- `GET https://netapp.googleapis.com/v1/{+parent}/activeDirectories`
- Lists active directories.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListActiveDirectoriesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Parent value for ListActiveDirectoriesRequest |
| `filter` | query | string | no | Filtering results |
| `orderBy` | query | string | no | Hint for how to order the results |
| `pageSize` | query | integer (int32) | no | Requested page size. Server may return fewer items than requested. If unspecified, the server will pick an appropriate default. |
| `pageToken` | query | string | no | A token identifying a page of results the server should return. |

### `netapp.projects.locations.activeDirectories.patch`

- Versions: v1, v1beta1
- `PATCH https://netapp.googleapis.com/v1/{+name}`
- Update the parameters of an active directories.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `ActiveDirectory`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. The resource name of the active directory. Format: `projects/{project_number}/locations/{location_id}/activeDirectories/{active_directory_id}`. |
| `updateMask` | query | string (google-fieldmask) | yes | Required. Field mask is used to specify the fields to be overwritten in the Active Directory resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it is in the mask. If the user does not provide a mask then all fields will be overwritten. |

### `netapp.projects.locations.backupPolicies.create`

- Versions: v1, v1beta1
- `POST https://netapp.googleapis.com/v1/{+parent}/backupPolicies`
- Creates new backup policy
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `BackupPolicy`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The location to create the backup policies of, in the format `projects/{project_id}/locations/{location}` |
| `backupPolicyId` | query | string | yes | Required. The ID to use for the backup policy. The ID must be unique within the specified location. Must contain only letters, numbers and hyphen, with the first character a letter, the last a letter or a number, and a 63 character maximum. |

### `netapp.projects.locations.backupPolicies.delete`

- Versions: v1, v1beta1
- `DELETE https://netapp.googleapis.com/v1/{+name}`
- Warning! This operation will permanently delete the backup policy.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The backup policy resource name, in the format `projects/{project_id}/locations/{location}/backupPolicies/{backup_policy_id}` |

### `netapp.projects.locations.backupPolicies.get`

- Versions: v1, v1beta1
- `GET https://netapp.googleapis.com/v1/{+name}`
- Returns the description of the specified backup policy by backup_policy_id.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `BackupPolicy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The backupPolicy resource name, in the format `projects/{project_id}/locations/{location}/backupPolicies/{backup_policy_id}` |

### `netapp.projects.locations.backupPolicies.list`

- Versions: v1, v1beta1
- `GET https://netapp.googleapis.com/v1/{+parent}/backupPolicies`
- Returns list of all available backup policies.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListBackupPoliciesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Parent value for ListBackupPoliciesRequest |
| `filter` | query | string | no | Filtering results |
| `orderBy` | query | string | no | Hint for how to order the results |
| `pageSize` | query | integer (int32) | no | Requested page size. Server may return fewer items than requested. If unspecified, the server will pick an appropriate default. |
| `pageToken` | query | string | no | A token identifying a page of results the server should return. |

### `netapp.projects.locations.backupPolicies.patch`

- Versions: v1, v1beta1
- `PATCH https://netapp.googleapis.com/v1/{+name}`
- Updates settings of a specific backup policy.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `BackupPolicy`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. The resource name of the backup policy. Format: `projects/{project_id}/locations/{location}/backupPolicies/{backup_policy_id}`. |
| `updateMask` | query | string (google-fieldmask) | yes | Required. Field mask is used to specify the fields to be overwritten in the Backup Policy resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it is in the mask. If the user does not provide a mask then all fields will be overwritten. |

### `netapp.projects.locations.backupVaults.backups.create`

- Versions: v1, v1beta1
- `POST https://netapp.googleapis.com/v1/{+parent}/backups`
- Creates a backup from the volume specified in the request The backup can be created from the given snapshot if specified in the request. If no snapshot specified, there'll be a new snapshot taken to initiate the backup creation.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Backup`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The NetApp backupVault to create the backups of, in the format `projects/*/locations/*/backupVaults/{backup_vault_id}` |
| `backupId` | query | string | yes | Required. The ID to use for the backup. The ID must be unique within the specified backupVault. Must contain only letters, numbers and hyphen, with the first character a letter, the last a letter or a number, and a 63 character maximum. |

### `netapp.projects.locations.backupVaults.backups.delete`

- Versions: v1, v1beta1
- `DELETE https://netapp.googleapis.com/v1/{+name}`
- Warning! This operation will permanently delete the backup.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The backup resource name, in the format `projects/{project_id}/locations/{location}/backupVaults/{backup_vault_id}/backups/{backup_id}` |

### `netapp.projects.locations.backupVaults.backups.get`

- Versions: v1, v1beta1
- `GET https://netapp.googleapis.com/v1/{+name}`
- Returns the description of the specified backup
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Backup`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The backup resource name, in the format `projects/{project_id}/locations/{location}/backupVaults/{backup_vault_id}/backups/{backup_id}` |

### `netapp.projects.locations.backupVaults.backups.list`

- Versions: v1, v1beta1
- `GET https://netapp.googleapis.com/v1/{+parent}/backups`
- Returns descriptions of all backups for a backupVault.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListBackupsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The backupVault for which to retrieve backup information, in the format `projects/{project_id}/locations/{location}/backupVaults/{backup_vault_id}`. To retrieve backup information for all locations, use "-" for the `{location}` value. To retrieve backup information for all backupVaults, use "-" for the `{backup_vault_id}` value. To retrieve backup information for a volume, use "-" for the `{backup_vault_id}` value and specify volume full name with the filter. |
| `filter` | query | string | no | The standard list filter. If specified, backups will be returned based on the attribute name that matches the filter expression. If empty, then no backups are filtered out. See https://google.aip.dev/160 |
| `orderBy` | query | string | no | Sort results. Supported values are "name", "name desc" or "" (unsorted). |
| `pageSize` | query | integer (int32) | no | The maximum number of items to return. The service may return fewer than this value. The maximum value is 1000; values above 1000 will be coerced to 1000. |
| `pageToken` | query | string | no | The next_page_token value to use if there are additional results to retrieve for this list request. |

### `netapp.projects.locations.backupVaults.backups.patch`

- Versions: v1, v1beta1
- `PATCH https://netapp.googleapis.com/v1/{+name}`
- Update backup with full spec.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Backup`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. The resource name of the backup. Format: `projects/{project_id}/locations/{location}/backupVaults/{backup_vault_id}/backups/{backup_id}`. |
| `updateMask` | query | string (google-fieldmask) | yes | Required. Field mask is used to specify the fields to be overwritten in the Backup resource to be updated. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it is in the mask. If the user does not provide a mask then all fields will be overwritten. |

### `netapp.projects.locations.backupVaults.create`

- Versions: v1, v1beta1
- `POST https://netapp.googleapis.com/v1/{+parent}/backupVaults`
- Creates new backup vault
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `BackupVault`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The location to create the backup vaults, in the format `projects/{project_id}/locations/{location}` |
| `backupVaultId` | query | string | yes | Required. The ID to use for the backupVault. The ID must be unique within the specified location. Must contain only letters, numbers and hyphen, with the first character a letter, the last a letter or a number, and a 63 character maximum. |

### `netapp.projects.locations.backupVaults.delete`

- Versions: v1, v1beta1
- `DELETE https://netapp.googleapis.com/v1/{+name}`
- Warning! This operation will permanently delete the backup vault.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The backupVault resource name, in the format `projects/{project_id}/locations/{location}/backupVaults/{backup_vault_id}` |

### `netapp.projects.locations.backupVaults.get`

- Versions: v1, v1beta1
- `GET https://netapp.googleapis.com/v1/{+name}`
- Returns the description of the specified backup vault
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `BackupVault`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The backupVault resource name, in the format `projects/{project_id}/locations/{location}/backupVaults/{backup_vault_id}` |

### `netapp.projects.locations.backupVaults.list`

- Versions: v1, v1beta1
- `GET https://netapp.googleapis.com/v1/{+parent}/backupVaults`
- Returns list of all available backup vaults.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListBackupVaultsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The location for which to retrieve backupVault information, in the format `projects/{project_id}/locations/{location}`. |
| `filter` | query | string | no | List filter. |
| `orderBy` | query | string | no | Sort results. Supported values are "name", "name desc" or "" (unsorted). |
| `pageSize` | query | integer (int32) | no | The maximum number of items to return. |
| `pageToken` | query | string | no | The next_page_token value to use if there are additional results to retrieve for this list request. |

### `netapp.projects.locations.backupVaults.patch`

- Versions: v1, v1beta1
- `PATCH https://netapp.googleapis.com/v1/{+name}`
- Updates the settings of a specific backup vault.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `BackupVault`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. The resource name of the backup vault. Format: `projects/{project_id}/locations/{location}/backupVaults/{backup_vault_id}`. |
| `updateMask` | query | string (google-fieldmask) | yes | Required. Field mask is used to specify the fields to be overwritten in the Backup resource to be updated. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it is in the mask. If the user does not provide a mask then all fields will be overwritten. |

### `netapp.projects.locations.get`

- Versions: v1, v1beta1
- `GET https://netapp.googleapis.com/v1/{+name}`
- Gets information about a location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Location`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Resource name for the location. |

### `netapp.projects.locations.hostGroups.create`

- Versions: v1, v1beta1
- `POST https://netapp.googleapis.com/v1/{+parent}/hostGroups`
- Creates a new host group.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `HostGroup`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Parent value for CreateHostGroupRequest |
| `hostGroupId` | query | string | yes | Required. ID of the host group to create. Must be unique within the parent resource. Must contain only letters, numbers, and hyphen, with the first character a letter or underscore, the last a letter or underscore or a number, and a 63 character maximum. |

### `netapp.projects.locations.hostGroups.delete`

- Versions: v1, v1beta1
- `DELETE https://netapp.googleapis.com/v1/{+name}`
- Deletes a host group.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the host group. Format: `projects/{project_number}/locations/{location_id}/hostGroups/{host_group_id}`. |

### `netapp.projects.locations.hostGroups.get`

- Versions: v1, v1beta1
- `GET https://netapp.googleapis.com/v1/{+name}`
- Returns details of the specified host group.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `HostGroup`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the host group. Format: `projects/{project_number}/locations/{location_id}/hostGroups/{host_group_id}`. |

### `netapp.projects.locations.hostGroups.list`

- Versions: v1, v1beta1
- `GET https://netapp.googleapis.com/v1/{+parent}/hostGroups`
- Returns a list of host groups in a `location`. Use `-` as location to list host groups across all locations.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListHostGroupsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Parent value for ListHostGroupsRequest |
| `filter` | query | string | no | Optional. Filter to apply to the request. |
| `orderBy` | query | string | no | Optional. Hint for how to order the results |
| `pageSize` | query | integer (int32) | no | Optional. Requested page size. Server may return fewer items than requested. If unspecified, the server will pick an appropriate default. |
| `pageToken` | query | string | no | Optional. A token identifying a page of results the server should return. |

### `netapp.projects.locations.hostGroups.patch`

- Versions: v1, v1beta1
- `PATCH https://netapp.googleapis.com/v1/{+name}`
- Updates an existing host group.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `HostGroup`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. The resource name of the host group. Format: `projects/{project_number}/locations/{location_id}/hostGroups/{host_group_id}`. |
| `updateMask` | query | string (google-fieldmask) | no | Optional. The list of fields to update. |

### `netapp.projects.locations.kmsConfigs.create`

- Versions: v1, v1beta1
- `POST https://netapp.googleapis.com/v1/{+parent}/kmsConfigs`
- Creates a new KMS config.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `KmsConfig`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Value for parent. |
| `kmsConfigId` | query | string | yes | Required. Id of the requesting KmsConfig. Must be unique within the parent resource. Must contain only letters, numbers and hyphen, with the first character a letter, the last a letter or a number, and a 63 character maximum. |

### `netapp.projects.locations.kmsConfigs.delete`

- Versions: v1, v1beta1
- `DELETE https://netapp.googleapis.com/v1/{+name}`
- Warning! This operation will permanently delete the Kms config.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the KmsConfig. |

### `netapp.projects.locations.kmsConfigs.encrypt`

- Versions: v1, v1beta1
- `POST https://netapp.googleapis.com/v1/{+name}:encrypt`
- Encrypt the existing volumes without CMEK encryption with the desired the KMS config for the whole region.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `EncryptVolumesRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the KmsConfig. |

### `netapp.projects.locations.kmsConfigs.get`

- Versions: v1, v1beta1
- `GET https://netapp.googleapis.com/v1/{+name}`
- Returns the description of the specified KMS config by kms_config_id.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `KmsConfig`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the KmsConfig |

### `netapp.projects.locations.kmsConfigs.list`

- Versions: v1, v1beta1
- `GET https://netapp.googleapis.com/v1/{+parent}/kmsConfigs`
- Returns descriptions of all KMS configs owned by the caller.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListKmsConfigsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Parent value |
| `filter` | query | string | no | List filter. |
| `orderBy` | query | string | no | Sort results. Supported values are "name", "name desc" or "" (unsorted). |
| `pageSize` | query | integer (int32) | no | The maximum number of items to return. |
| `pageToken` | query | string | no | The next_page_token value to use if there are additional results to retrieve for this list request. |

### `netapp.projects.locations.kmsConfigs.patch`

- Versions: v1, v1beta1
- `PATCH https://netapp.googleapis.com/v1/{+name}`
- Updates the Kms config properties with the full spec
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `KmsConfig`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. Name of the `KmsConfig`. Format: `projects/{project}/locations/{location}/kmsConfigs/{kms_config}` |
| `updateMask` | query | string (google-fieldmask) | yes | Required. Field mask is used to specify the fields to be overwritten in the KmsConfig resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it is in the mask. If the user does not provide a mask then all fields will be overwritten. |

### `netapp.projects.locations.kmsConfigs.verify`

- Versions: v1, v1beta1
- `POST https://netapp.googleapis.com/v1/{+name}:verify`
- Verifies KMS config reachability.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `VerifyKmsConfigRequest`; Response: `VerifyKmsConfigResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the KMS Config to be verified. |

### `netapp.projects.locations.list`

- Versions: v1, v1beta1
- `GET https://netapp.googleapis.com/v1/{+name}/locations`
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

### `netapp.projects.locations.operations.cancel`

- Versions: v1, v1beta1
- `POST https://netapp.googleapis.com/v1/{+name}:cancel`
- Starts asynchronous cancellation on a long-running operation. The server makes a best effort to cancel the operation, but success is not guaranteed. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. Clients can use Operations.GetOperation or other methods to check whether the cancellation succeeded or whether the operation completed despite cancellation. On successful cancellation, the operation is not deleted; instead, it becomes an operation with an Operation.error value with a google.rpc.Status.code of `1`, corresponding to `Code.CANCELLED`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `CancelOperationRequest`; Response: `GoogleProtobufEmpty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource to be cancelled. |

### `netapp.projects.locations.operations.delete`

- Versions: v1, v1beta1
- `DELETE https://netapp.googleapis.com/v1/{+name}`
- Deletes a long-running operation. This method indicates that the client is no longer interested in the operation result. It does not cancel the operation. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleProtobufEmpty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource to be deleted. |

### `netapp.projects.locations.operations.get`

- Versions: v1, v1beta1
- `GET https://netapp.googleapis.com/v1/{+name}`
- Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource. |

### `netapp.projects.locations.operations.list`

- Versions: v1, v1beta1
- `GET https://netapp.googleapis.com/v1/{+name}/operations`
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

### `netapp.projects.locations.storagePools.backupConfigs.list`

- Versions: v1, v1beta1
- `GET https://netapp.googleapis.com/v1/{+parent}/backupConfigs`
- Lists backup configurations for all volumes in an ONTAP-mode Storage Pool.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListBackupConfigsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The ONTAP StoragePool for which to retrieve backup configuration information, in the format `projects/{project}/locations/{location}/storagePools/{storage_pool}`. |
| `filter` | query | string | no | Optional. The standard list filter. |
| `orderBy` | query | string | no | Optional. Sort results. Supported values are "volume_id" or "" |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of items to return. The service may return fewer than this value. The maximum value is 1000; values above 1000 will be coerced to 1000. If unspecified or set to 0, a default of 50 will be used. |
| `pageToken` | query | string | no | Optional. The next_page_token value to use if there are additional results to retrieve for this list request. |

### `netapp.projects.locations.storagePools.create`

- Versions: v1, v1beta1
- `POST https://netapp.googleapis.com/v1/{+parent}/storagePools`
- Creates a new storage pool.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `StoragePool`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Value for parent. |
| `storagePoolId` | query | string | yes | Required. Id of the requesting storage pool. Must be unique within the parent resource. Must contain only letters, numbers and hyphen, with the first character a letter, the last a letter or a number, and a 63 character maximum. |

### `netapp.projects.locations.storagePools.delete`

- Versions: v1, v1beta1
- `DELETE https://netapp.googleapis.com/v1/{+name}`
- Warning! This operation will permanently delete the storage pool.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the storage pool |

### `netapp.projects.locations.storagePools.get`

- Versions: v1, v1beta1
- `GET https://netapp.googleapis.com/v1/{+name}`
- Returns the description of the specified storage pool by poolId.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `StoragePool`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the storage pool |

### `netapp.projects.locations.storagePools.list`

- Versions: v1, v1beta1
- `GET https://netapp.googleapis.com/v1/{+parent}/storagePools`
- Returns descriptions of all storage pools owned by the caller.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListStoragePoolsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Parent value |
| `filter` | query | string | no | Optional. List filter. |
| `orderBy` | query | string | no | Optional. Sort results. Supported values are "name", "name desc" or "" (unsorted). |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of items to return. |
| `pageToken` | query | string | no | Optional. The next_page_token value to use if there are additional results to retrieve for this list request. |

### `netapp.projects.locations.storagePools.ontap.executeOntapDelete`

- Versions: v1, v1beta1
- `DELETE https://netapp.googleapis.com/v1/{+ontapPath}`
- `ExecuteOntapDelete` sends the ONTAP `DELETE` request to the `StoragePool` cluster.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ExecuteOntapDeleteResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `ontapPath` | path | string | yes | Required. The resource path of the ONTAP resource. Format: `projects/{project_number}/locations/{location_id}/storagePools/{storage_pool_id}/ontap/{ontap_resource_path}`. For example: `projects/123456789/locations/us-central1/storagePools/my-storage-pool/ontap/api/storage/volumes`. |

### `netapp.projects.locations.storagePools.ontap.executeOntapGet`

- Versions: v1, v1beta1
- `GET https://netapp.googleapis.com/v1/{+ontapPath}`
- `ExecuteOntapGet` sends the ONTAP `GET` request to the `StoragePool` cluster.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ExecuteOntapGetResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `ontapPath` | path | string | yes | Required. The resource path of the ONTAP resource. Format: `projects/{project_number}/locations/{location_id}/storagePools/{storage_pool_id}/ontap/{ontap_resource_path}`. For example: `projects/123456789/locations/us-central1/storagePools/my-storage-pool/ontap/api/storage/volumes`. |

### `netapp.projects.locations.storagePools.ontap.executeOntapPatch`

- Versions: v1, v1beta1
- `PATCH https://netapp.googleapis.com/v1/{+ontapPath}`
- `ExecuteOntapPatch` sends the ONTAP `PATCH` request to the `StoragePool` cluster.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `ExecuteOntapPatchRequest`; Response: `ExecuteOntapPatchResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `ontapPath` | path | string | yes | Required. The resource path of the ONTAP resource. Format: `projects/{project_number}/locations/{location_id}/storagePools/{storage_pool_id}/ontap/{ontap_resource_path}`. For example: `projects/123456789/locations/us-central1/storagePools/my-storage-pool/ontap/api/storage/volumes`. |

### `netapp.projects.locations.storagePools.ontap.executeOntapPost`

- Versions: v1, v1beta1
- `POST https://netapp.googleapis.com/v1/{+ontapPath}`
- `ExecuteOntapPost` sends the ONTAP `POST` request to the `StoragePool` cluster.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `ExecuteOntapPostRequest`; Response: `ExecuteOntapPostResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `ontapPath` | path | string | yes | Required. The path of the ONTAP resource. Format: `projects/{project_number}/locations/{location_id}/storagePools/{storage_pool_id}/ontap/{ontap_resource_path}`. For example: `projects/123456789/locations/us-central1/storagePools/my-storage-pool/ontap/api/storage/volumes`. |

### `netapp.projects.locations.storagePools.patch`

- Versions: v1, v1beta1
- `PATCH https://netapp.googleapis.com/v1/{+name}`
- Updates the storage pool properties with the full spec
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `StoragePool`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. Name of the storage pool |
| `updateMask` | query | string (google-fieldmask) | yes | Required. Field mask is used to specify the fields to be overwritten in the StoragePool resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it is in the mask. If the user does not provide a mask then all fields will be overwritten. |

### `netapp.projects.locations.storagePools.restoreVolume`

- Versions: v1, v1beta1
- `POST https://netapp.googleapis.com/v1/{+name}:restoreVolume`
- Restores a backup to an ONTAP-mode volume.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `RestoreVolumeRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the ONTAP mode storage pool, in the format of `projects/{project}/locations/{location}/storagePools/{storage_pool}` |

### `netapp.projects.locations.storagePools.switch`

- Versions: v1, v1beta1
- `POST https://netapp.googleapis.com/v1/{+name}:switch`
- This operation will switch the active/replica zone for a regional storagePool.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `SwitchActiveReplicaZoneRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the storage pool |

### `netapp.projects.locations.storagePools.updateBackupConfig`

- Versions: v1, v1beta1
- `POST https://netapp.googleapis.com/v1/{+name}:updateBackupConfig`
- Updates the backup configuration for an ONTAP-mode volume.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `UpdateBackupConfigRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the StoragePool, in the format: projects/{projectNumber}/locations/{locationId}/storagePools/{poolId} |

### `netapp.projects.locations.storagePools.validateDirectoryService`

- Versions: v1, v1beta1
- `POST https://netapp.googleapis.com/v1/{+name}:validateDirectoryService`
- ValidateDirectoryService does a connectivity check for a directory service policy attached to the storage pool.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `ValidateDirectoryServiceRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the storage pool |

### `netapp.projects.locations.volumes.create`

- Versions: v1, v1beta1
- `POST https://netapp.googleapis.com/v1/{+parent}/volumes`
- Creates a new Volume in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Volume`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Value for parent. |
| `volumeId` | query | string | yes | Required. Id of the requesting volume. Must be unique within the parent resource. Must contain only letters, numbers and hyphen, with the first character a letter, the last a letter or a number, and a 63 character maximum. |

### `netapp.projects.locations.volumes.delete`

- Versions: v1, v1beta1
- `DELETE https://netapp.googleapis.com/v1/{+name}`
- Deletes a single Volume.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the volume |
| `force` | query | boolean | no | If this field is set as true, CCFE will not block the volume resource deletion even if it has any snapshots resource. (Otherwise, the request will only work if the volume has no snapshots.) |

### `netapp.projects.locations.volumes.establishPeering`

- Versions: v1, v1beta1
- `POST https://netapp.googleapis.com/v1/{+name}:establishPeering`
- Establish volume peering. This is used to establish cluster and svm peerings between the GCNV and OnPrem clusters.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `EstablishVolumePeeringRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The volume resource name, in the format `projects/{project_id}/locations/{location}/volumes/{volume_id}` |

### `netapp.projects.locations.volumes.get`

- Versions: v1, v1beta1
- `GET https://netapp.googleapis.com/v1/{+name}`
- Gets details of a single Volume.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Volume`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the volume |

### `netapp.projects.locations.volumes.getSplitStatus`

- Versions: v1, v1beta1
- `GET https://netapp.googleapis.com/v1/{+name}:getSplitStatus`
- Retrieves the current state, progress, and details of a split operation for a volume. This method is relevant when the volume is a clone. For volumes that are not clones, this method will return an error.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `SplitStatus`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The full name of the volume. Format: projects/{project_number}/locations/{location}/volumes/{volume_id} |

### `netapp.projects.locations.volumes.list`

- Versions: v1, v1beta1
- `GET https://netapp.googleapis.com/v1/{+parent}/volumes`
- Lists Volumes in a given project.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListVolumesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Parent value for ListVolumesRequest |
| `filter` | query | string | no | Filtering results |
| `orderBy` | query | string | no | Hint for how to order the results |
| `pageSize` | query | integer (int32) | no | Requested page size. Server may return fewer items than requested. If unspecified, the server will pick an appropriate default. |
| `pageToken` | query | string | no | A token identifying a page of results the server should return. |

### `netapp.projects.locations.volumes.patch`

- Versions: v1, v1beta1
- `PATCH https://netapp.googleapis.com/v1/{+name}`
- Updates the parameters of a single Volume.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Volume`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. Name of the volume |
| `updateMask` | query | string (google-fieldmask) | yes | Required. Field mask is used to specify the fields to be overwritten in the Volume resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it is in the mask. If the user does not provide a mask then all fields will be overwritten. |

### `netapp.projects.locations.volumes.quotaRules.create`

- Versions: v1, v1beta1
- `POST https://netapp.googleapis.com/v1/{+parent}/quotaRules`
- Creates a new quota rule.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `QuotaRule`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Parent value for CreateQuotaRuleRequest |
| `quotaRuleId` | query | string | yes | Required. ID of the quota rule to create. Must be unique within the parent resource. Must contain only letters, numbers, underscore and hyphen, with the first character a letter or underscore, the last a letter or underscore or a number, and a 63 character maximum. |

### `netapp.projects.locations.volumes.quotaRules.delete`

- Versions: v1, v1beta1
- `DELETE https://netapp.googleapis.com/v1/{+name}`
- Deletes a quota rule.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the quota rule. |

### `netapp.projects.locations.volumes.quotaRules.get`

- Versions: v1, v1beta1
- `GET https://netapp.googleapis.com/v1/{+name}`
- Returns details of the specified quota rule.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `QuotaRule`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the quota rule |

### `netapp.projects.locations.volumes.quotaRules.list`

- Versions: v1, v1beta1
- `GET https://netapp.googleapis.com/v1/{+parent}/quotaRules`
- Returns list of all quota rules in a location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListQuotaRulesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Parent value for ListQuotaRulesRequest |
| `filter` | query | string | no | Optional. Filtering results |
| `orderBy` | query | string | no | Optional. Hint for how to order the results |
| `pageSize` | query | integer (int32) | no | Optional. Requested page size. Server may return fewer items than requested. If unspecified, the server will pick an appropriate default. |
| `pageToken` | query | string | no | Optional. A token identifying a page of results the server should return. |

### `netapp.projects.locations.volumes.quotaRules.patch`

- Versions: v1, v1beta1
- `PATCH https://netapp.googleapis.com/v1/{+name}`
- Updates a quota rule.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `QuotaRule`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. The resource name of the quota rule. Format: `projects/{project_number}/locations/{location_id}/volumes/volumes/{volume_id}/quotaRules/{quota_rule_id}`. |
| `updateMask` | query | string (google-fieldmask) | no | Optional. Field mask is used to specify the fields to be overwritten in the Quota Rule resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it is in the mask. If the user does not provide a mask then all fields will be overwritten. |

### `netapp.projects.locations.volumes.replications.create`

- Versions: v1, v1beta1
- `POST https://netapp.googleapis.com/v1/{+parent}/replications`
- Create a new replication for a volume.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Replication`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The NetApp volume to create the replications of, in the format `projects/{project_id}/locations/{location}/volumes/{volume_id}` |
| `replicationId` | query | string | yes | Required. ID of the replication to create. Must be unique within the parent resource. Must contain only letters, numbers and hyphen, with the first character a letter, the last a letter or a number, and a 63 character maximum. |

### `netapp.projects.locations.volumes.replications.delete`

- Versions: v1, v1beta1
- `DELETE https://netapp.googleapis.com/v1/{+name}`
- Deletes a replication.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The replication resource name, in the format `projects/*/locations/*/volumes/*/replications/{replication_id}` |

### `netapp.projects.locations.volumes.replications.establishPeering`

- Versions: v1, v1beta1
- `POST https://netapp.googleapis.com/v1/{+name}:establishPeering`
- Establish replication peering.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `EstablishPeeringRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the replication, in the format of projects/{project_id}/locations/{location}/volumes/{volume_id}/replications/{replication_id}. |

### `netapp.projects.locations.volumes.replications.get`

- Versions: v1, v1beta1
- `GET https://netapp.googleapis.com/v1/{+name}`
- Describe a replication for a volume.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Replication`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The replication resource name, in the format `projects/{project_id}/locations/{location}/volumes/{volume_id}/replications/{replication_id}` |

### `netapp.projects.locations.volumes.replications.list`

- Versions: v1, v1beta1
- `GET https://netapp.googleapis.com/v1/{+parent}/replications`
- Returns descriptions of all replications for a volume.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListReplicationsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The volume for which to retrieve replication information, in the format `projects/{project_id}/locations/{location}/volumes/{volume_id}`. |
| `filter` | query | string | no | List filter. |
| `orderBy` | query | string | no | Sort results. Supported values are "name", "name desc" or "" (unsorted). |
| `pageSize` | query | integer (int32) | no | The maximum number of items to return. |
| `pageToken` | query | string | no | The next_page_token value to use if there are additional results to retrieve for this list request. |

### `netapp.projects.locations.volumes.replications.patch`

- Versions: v1, v1beta1
- `PATCH https://netapp.googleapis.com/v1/{+name}`
- Updates the settings of a specific replication.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Replication`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. The resource name of the Replication. Format: `projects/{project_id}/locations/{location}/volumes/{volume_id}/replications/{replication_id}`. |
| `updateMask` | query | string (google-fieldmask) | yes | Required. Mask of fields to update. At least one path must be supplied in this field. |

### `netapp.projects.locations.volumes.replications.resume`

- Versions: v1, v1beta1
- `POST https://netapp.googleapis.com/v1/{+name}:resume`
- Resume Cross Region Replication.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `ResumeReplicationRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the replication, in the format of projects/{project_id}/locations/{location}/volumes/{volume_id}/replications/{replication_id}. |

### `netapp.projects.locations.volumes.replications.reverseDirection`

- Versions: v1, v1beta1
- `POST https://netapp.googleapis.com/v1/{+name}:reverseDirection`
- Reverses direction of replication. Source becomes destination and destination becomes source.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `ReverseReplicationDirectionRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the replication, in the format of projects/{project_id}/locations/{location}/volumes/{volume_id}/replications/{replication_id}. |

### `netapp.projects.locations.volumes.replications.stop`

- Versions: v1, v1beta1
- `POST https://netapp.googleapis.com/v1/{+name}:stop`
- Stop Cross Region Replication.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `StopReplicationRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the replication, in the format of projects/{project_id}/locations/{location}/volumes/{volume_id}/replications/{replication_id}. |

### `netapp.projects.locations.volumes.replications.sync`

- Versions: v1, v1beta1
- `POST https://netapp.googleapis.com/v1/{+name}:sync`
- Syncs the replication. This will invoke one time volume data transfer from source to destination.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `SyncReplicationRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the replication, in the format of projects/{project_id}/locations/{location}/volumes/{volume_id}/replications/{replication_id}. |

### `netapp.projects.locations.volumes.restore`

- Versions: v1, v1beta1
- `POST https://netapp.googleapis.com/v1/{+name}:restore`
- Restore files from a backup to a volume.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `RestoreBackupFilesRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The volume resource name, in the format `projects/{project_id}/locations/{location}/volumes/{volume_id}` |

### `netapp.projects.locations.volumes.revert`

- Versions: v1, v1beta1
- `POST https://netapp.googleapis.com/v1/{+name}:revert`
- Revert an existing volume to a specified snapshot. Warning! This operation will permanently revert all changes made after the snapshot was created.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `RevertVolumeRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the volume, in the format of projects/{project_id}/locations/{location}/volumes/{volume_id}. |

### `netapp.projects.locations.volumes.snapshots.create`

- Versions: v1, v1beta1
- `POST https://netapp.googleapis.com/v1/{+parent}/snapshots`
- Create a new snapshot for a volume.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Snapshot`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The NetApp volume to create the snapshots of, in the format `projects/{project_id}/locations/{location}/volumes/{volume_id}` |
| `snapshotId` | query | string | yes | Required. ID of the snapshot to create. Must be unique within the parent resource. Must contain only letters, numbers and hyphen, with the first character a letter, the last a letter or a number, and a 63 character maximum. |

### `netapp.projects.locations.volumes.snapshots.delete`

- Versions: v1, v1beta1
- `DELETE https://netapp.googleapis.com/v1/{+name}`
- Deletes a snapshot.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The snapshot resource name, in the format `projects/*/locations/*/volumes/*/snapshots/{snapshot_id}` |

### `netapp.projects.locations.volumes.snapshots.get`

- Versions: v1, v1beta1
- `GET https://netapp.googleapis.com/v1/{+name}`
- Describe a snapshot for a volume.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Snapshot`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The snapshot resource name, in the format `projects/{project_id}/locations/{location}/volumes/{volume_id}/snapshots/{snapshot_id}` |

### `netapp.projects.locations.volumes.snapshots.list`

- Versions: v1, v1beta1
- `GET https://netapp.googleapis.com/v1/{+parent}/snapshots`
- Returns descriptions of all snapshots for a volume.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListSnapshotsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The volume for which to retrieve snapshot information, in the format `projects/{project_id}/locations/{location}/volumes/{volume_id}`. |
| `filter` | query | string | no | List filter. |
| `orderBy` | query | string | no | Sort results. Supported values are "name", "name desc" or "" (unsorted). |
| `pageSize` | query | integer (int32) | no | The maximum number of items to return. |
| `pageToken` | query | string | no | The next_page_token value to use if there are additional results to retrieve for this list request. |

### `netapp.projects.locations.volumes.snapshots.patch`

- Versions: v1, v1beta1
- `PATCH https://netapp.googleapis.com/v1/{+name}`
- Updates the settings of a specific snapshot.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Snapshot`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. The resource name of the snapshot. Format: `projects/{project_id}/locations/{location}/volumes/{volume_id}/snapshots/{snapshot_id}`. |
| `updateMask` | query | string (google-fieldmask) | yes | Required. Mask of fields to update. At least one path must be supplied in this field. |

### `netapp.projects.locations.volumes.startSplit`

- Versions: v1, v1beta1
- `POST https://netapp.googleapis.com/v1/{+name}:startSplit`
- Splits a clone volume from its source volume. This operation will only work for volumes which have clone_details set(clones). For volumes that are not clones, this operation will return an error.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `StartSplitRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The full name of the clone volume to be split from its source. Format: projects/{project_number}/locations/{location}/volumes/{volume_id} |

### Example request skeleton

Generated from the Discovery entry of `netapp.projects.locations.activeDirectories.get` (not in the official docs); replace the `{...}` path variables (URL-encode query values):

```bash
curl -X GET \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  "https://netapp.googleapis.com/v1/{+name}"
```

## Notes

- Generated from the Discovery document(s) v1, v1beta1 of `netapp` (retrieved 2026-11-14). Resources on this page: projects.
- The Required column is `yes` for path variables and required parameters, and `conditional` when the description says "Required if ..." (mutually exclusive alternatives), when a `parent.child` parameter is required only inside an optional parent message or one branch of a oneof. Path variables are always `yes`.
- Message schemas (the request and response types named above) are listed under `references/rest-schemas/netapp/`; they are the `schemas` section of the Discovery documents in Source.
- Corrected from the official docs (the Discovery text above is verbatim): the `name` format of the quota rule methods repeats `volumes` (`.../volumes/volumes/{volume_id}/quotaRules/{quota_rule_id}`); the path pattern in Discovery is `projects/{project_number}/locations/{location_id}/volumes/{volume_id}/quotaRules/{quota_rule_id}`.
- Source: https://netapp.googleapis.com/$discovery/rest?version=v1, https://netapp.googleapis.com/$discovery/rest?version=v1beta1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
