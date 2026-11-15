---
source: https://file.googleapis.com/$discovery/rest?version=v1
---

# Cloud Filestore API REST API (file)

## Signature / Usage

Base URL: `https://file.googleapis.com`. Methods are listed by `id`; the `Versions` line shows which API versions define the method (preferred: v1).

### `file.projects.locations.backups.create`

- Versions: v1, v1beta1
- `POST https://file.googleapis.com/v1/{+parent}/backups`
- Creates a backup.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Backup`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The backup's project and location, in the format `projects/{project_number}/locations/{location}`. In Filestore, backup locations map to Google Cloud regions, for example \*\*us-west1\*\*. |
| `backupId` | query | string | yes | Required. The ID to use for the backup. The ID must be unique within the specified project and location. This value must start with a lowercase letter followed by up to 62 lowercase letters, numbers, or hyphens, and cannot end with a hyphen. Values that do not match this pattern will trigger an INVALID_ARGUMENT error. |

### `file.projects.locations.backups.delete`

- Versions: v1, v1beta1
- `DELETE https://file.googleapis.com/v1/{+name}`
- Deletes a backup.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The backup resource name, in the format `projects/{project_number}/locations/{location}/backups/{backup_id}` |

### `file.projects.locations.backups.get`

- Versions: v1, v1beta1
- `GET https://file.googleapis.com/v1/{+name}`
- Gets the details of a specific backup.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Backup`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The backup resource name, in the format `projects/{project_number}/locations/{location}/backups/{backup_id}`. |

### `file.projects.locations.backups.list`

- Versions: v1, v1beta1
- `GET https://file.googleapis.com/v1/{+parent}/backups`
- Lists all backups in a project for either a specified location or for all locations.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListBackupsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The project and location for which to retrieve backup information, in the format `projects/{project_number}/locations/{location}`. In Filestore, backup locations map to Google Cloud regions, for example \*\*us-west1\*\*. To retrieve backup information for all locations, use "-" for the `{location}` value. |
| `filter` | query | string | no | List filter. |
| `orderBy` | query | string | no | Sort results. Supported values are "name", "name desc" or "" (unsorted). |
| `pageSize` | query | integer (int32) | no | The maximum number of items to return. |
| `pageToken` | query | string | no | The next_page_token value to use if there are additional results to retrieve for this list request. |

### `file.projects.locations.backups.patch`

- Versions: v1, v1beta1
- `PATCH https://file.googleapis.com/v1/{+name}`
- Updates the settings of a specific backup.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Backup`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Output only. The resource name of the backup, in the format `projects/{project_number}/locations/{location_id}/backups/{backup_id}`. |
| `updateMask` | query | string (google-fieldmask) | yes | Required. Mask of fields to update. At least one path must be supplied in this field. |

### `file.projects.locations.get`

- Versions: v1, v1beta1
- `GET https://file.googleapis.com/v1/{+name}`
- Gets information about a location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Location`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Resource name for the location. |

### `file.projects.locations.instances.create`

- Versions: v1, v1beta1
- `POST https://file.googleapis.com/v1/{+parent}/instances`
- Creates an instance. When creating from a backup, the capacity of the new instance needs to be equal to or larger than the capacity of the backup (and also equal to or larger than the minimum capacity of the tier).
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Instance`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The instance's project and location, in the format `projects/{project_id}/locations/{location}`. In Filestore, locations map to Google Cloud zones, for example \*\*us-west1-b\*\*. |
| `instanceId` | query | string | yes | Required. The name of the instance to create. The name must be unique for the specified project and location. |

### `file.projects.locations.instances.delete`

- Versions: v1, v1beta1
- `DELETE https://file.googleapis.com/v1/{+name}`
- Deletes an instance.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The instance resource name, in the format `projects/{project_id}/locations/{location}/instances/{instance_id}` |
| `force` | query | boolean | no | If set to true, all snapshots of the instance will also be deleted. (Otherwise, the request will only work if the instance has no snapshots.) |

### `file.projects.locations.instances.get`

- Versions: v1, v1beta1
- `GET https://file.googleapis.com/v1/{+name}`
- Gets the details of a specific instance.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Instance`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The instance resource name, in the format `projects/{project_id}/locations/{location}/instances/{instance_id}`. |

### `file.projects.locations.instances.list`

- Versions: v1, v1beta1
- `GET https://file.googleapis.com/v1/{+parent}/instances`
- Lists all instances in a project for either a specified location or for all locations.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListInstancesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The project and location for which to retrieve instance information, in the format `projects/{project_id}/locations/{location}`. In Cloud Filestore, locations map to Google Cloud zones, for example \*\*us-west1-b\*\*. To retrieve instance information for all locations, use "-" for the `{location}` value. |
| `filter` | query | string | no | List filter. |
| `orderBy` | query | string | no | Sort results. Supported values are "name", "name desc" or "" (unsorted). |
| `pageSize` | query | integer (int32) | no | The maximum number of items to return. |
| `pageToken` | query | string | no | The next_page_token value to use if there are additional results to retrieve for this list request. |

### `file.projects.locations.instances.patch`

- Versions: v1, v1beta1
- `PATCH https://file.googleapis.com/v1/{+name}`
- Updates the settings of a specific instance.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Instance`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Output only. The resource name of the instance, in the format `projects/{project}/locations/{location}/instances/{instance}`. |
| `updateMask` | query | string (google-fieldmask) | no | Mask of fields to update. At least one path must be supplied in this field. The elements of the repeated paths field may only include these fields: \* "description" \* "file_shares" \* "labels" \* "performance_config" \* "deletion_protection_enabled" \* "deletion_protection_reason" |

### `file.projects.locations.instances.pauseReplica`

- Versions: v1, v1beta1
- `POST https://file.googleapis.com/v1/{+name}:pauseReplica`
- Pause the standby instance (replica). WARNING: This operation makes the standby instance's NFS filesystem writable. Any data written to the standby instance while paused will be lost when the replica is resumed or promoted.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `PauseReplicaRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the instance, in the format `projects/{project_id}/locations/{location_id}/instances/{instance_id}`. |

### `file.projects.locations.instances.promoteReplica`

- Versions: v1, v1beta1
- `POST https://file.googleapis.com/v1/{+name}:promoteReplica`
- Promote the standby instance (replica).
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `PromoteReplicaRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the instance, in the format `projects/{project_id}/locations/{location_id}/instances/{instance_id}`. |

### `file.projects.locations.instances.restore`

- Versions: v1, v1beta1
- `POST https://file.googleapis.com/v1/{+name}:restore`
- Restores an existing instance's file share from a backup. The capacity of the instance needs to be equal to or larger than the capacity of the backup (and also equal to or larger than the minimum capacity of the tier).
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `RestoreInstanceRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the instance, in the format `projects/{project_number}/locations/{location_id}/instances/{instance_id}`. |

### `file.projects.locations.instances.resumeReplica`

- Versions: v1, v1beta1
- `POST https://file.googleapis.com/v1/{+name}:resumeReplica`
- Resume the standby instance (replica). WARNING: Any data written to the standby instance while paused will be lost when the replica is resumed.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `ResumeReplicaRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the instance, in the format `projects/{project_id}/locations/{location_id}/instances/{instance_id}`. |

### `file.projects.locations.instances.revert`

- Versions: v1, v1beta1
- `POST https://file.googleapis.com/v1/{+name}:revert`
- Revert an existing instance's file system to a specified snapshot.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `RevertInstanceRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the instance, in the format `projects/{project_id}/locations/{location_id}/instances/{instance_id}`. |

### `file.projects.locations.instances.shares.create`

- Versions: v1beta1
- `POST https://file.googleapis.com/v1beta1/{+parent}/shares`
- Creates a share.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Share`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The Filestore Instance to create the share for, in the format `projects/{project_id}/locations/{location}/instances/{instance_id}` |
| `shareId` | query | string | yes | Required. The ID to use for the share. The ID must be unique within the specified instance. This value must start with a lowercase letter followed by up to 62 lowercase letters, numbers, or hyphens, and cannot end with a hyphen. |

### `file.projects.locations.instances.shares.delete`

- Versions: v1beta1
- `DELETE https://file.googleapis.com/v1beta1/{+name}`
- Deletes a share.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The share resource name, in the format `projects/{project_id}/locations/{location}/instances/{instance_id}/share/{share_id}` |

### `file.projects.locations.instances.shares.get`

- Versions: v1beta1
- `GET https://file.googleapis.com/v1beta1/{+name}`
- Gets the details of a specific share.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Share`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The share resource name, in the format `projects/{project_id}/locations/{location}/instances/{instance_id}/shares/{share_id}` |

### `file.projects.locations.instances.shares.list`

- Versions: v1beta1
- `GET https://file.googleapis.com/v1beta1/{+parent}/shares`
- Lists all shares for a specified instance.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListSharesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The instance for which to retrieve share information, in the format `projects/{project_id}/locations/{location}/instances/{instance_id}`. |
| `filter` | query | string | no | List filter. |
| `orderBy` | query | string | no | Sort results. Supported values are "name", "name desc" or "" (unsorted). |
| `pageSize` | query | integer (int32) | no | The maximum number of items to return. |
| `pageToken` | query | string | no | The next_page_token value to use if there are additional results to retrieve for this list request. |

### `file.projects.locations.instances.shares.patch`

- Versions: v1beta1
- `PATCH https://file.googleapis.com/v1beta1/{+name}`
- Updates the settings of a specific share.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Share`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Output only. The resource name of the share, in the format `projects/{project_id}/locations/{location_id}/instances/{instance_id}/shares/{share_id}`. |
| `updateMask` | query | string (google-fieldmask) | yes | Required. Mask of fields to update. At least one path must be supplied in this field. The elements of the repeated paths field may only include these fields: \* "description" \* "capacity_gb" \* "labels" \* "nfs_export_options" |

### `file.projects.locations.instances.snapshots.create`

- Versions: v1, v1beta1
- `POST https://file.googleapis.com/v1/{+parent}/snapshots`
- Creates a snapshot.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Snapshot`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The Filestore Instance to create the snapshots of, in the format `projects/{project_id}/locations/{location}/instances/{instance_id}` |
| `snapshotId` | query | string | yes | Required. The ID to use for the snapshot. The ID must be unique within the specified instance. This value must start with a lowercase letter followed by up to 62 lowercase letters, numbers, or hyphens, and cannot end with a hyphen. |

### `file.projects.locations.instances.snapshots.delete`

- Versions: v1, v1beta1
- `DELETE https://file.googleapis.com/v1/{+name}`
- Deletes a snapshot.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The snapshot resource name, in the format `projects/{project_id}/locations/{location}/instances/{instance_id}/snapshots/{snapshot_id}` |

### `file.projects.locations.instances.snapshots.get`

- Versions: v1, v1beta1
- `GET https://file.googleapis.com/v1/{+name}`
- Gets the details of a specific snapshot.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Snapshot`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The snapshot resource name, in the format `projects/{project_id}/locations/{location}/instances/{instance_id}/snapshots/{snapshot_id}` |

### `file.projects.locations.instances.snapshots.list`

- Versions: v1, v1beta1
- `GET https://file.googleapis.com/v1/{+parent}/snapshots`
- Lists all snapshots in a project for either a specified location or for all locations.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListSnapshotsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The instance for which to retrieve snapshot information, in the format `projects/{project_id}/locations/{location}/instances/{instance_id}`. |
| `filter` | query | string | no | List filter. |
| `orderBy` | query | string | no | Sort results. Supported values are "name", "name desc" or "" (unsorted). |
| `pageSize` | query | integer (int32) | no | The maximum number of items to return. |
| `pageToken` | query | string | no | The next_page_token value to use if there are additional results to retrieve for this list request. |
| `returnPartialSuccess` | query | boolean | no | Optional. If true, allow partial responses for multi-regional Aggregated List requests. |

### `file.projects.locations.instances.snapshots.patch`

- Versions: v1, v1beta1
- `PATCH https://file.googleapis.com/v1/{+name}`
- Updates the settings of a specific snapshot.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Snapshot`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Output only. The resource name of the snapshot, in the format `projects/{project_id}/locations/{location_id}/instances/{instance_id}/snapshots/{snapshot_id}`. |
| `updateMask` | query | string (google-fieldmask) | yes | Required. Mask of fields to update. At least one path must be supplied in this field. |

### `file.projects.locations.list`

- Versions: v1, v1beta1
- `GET https://file.googleapis.com/v1/{+name}/locations`
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

### `file.projects.locations.operations.cancel`

- Versions: v1, v1beta1
- `POST https://file.googleapis.com/v1/{+name}:cancel`
- Starts asynchronous cancellation on a long-running operation. The server makes a best effort to cancel the operation, but success is not guaranteed. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. Clients can use Operations.GetOperation or other methods to check whether the cancellation succeeded or whether the operation completed despite cancellation. On successful cancellation, the operation is not deleted; instead, it becomes an operation with an Operation.error value with a google.rpc.Status.code of `1`, corresponding to `Code.CANCELLED`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `CancelOperationRequest`; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource to be cancelled. |

### `file.projects.locations.operations.delete`

- Versions: v1, v1beta1
- `DELETE https://file.googleapis.com/v1/{+name}`
- Deletes a long-running operation. This method indicates that the client is no longer interested in the operation result. It does not cancel the operation. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource to be deleted. |

### `file.projects.locations.operations.get`

- Versions: v1, v1beta1
- `GET https://file.googleapis.com/v1/{+name}`
- Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource. |

### `file.projects.locations.operations.list`

- Versions: v1, v1beta1
- `GET https://file.googleapis.com/v1/{+name}/operations`
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

### `file.projects.locations.sharePools.acquireShare`

- Versions: v1beta1
- `POST https://file.googleapis.com/v1beta1/{+parent}:acquireShare`
- Acquires a share synchronously from the pre-provisioned share pool.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `AcquireShareRequest`; Response: `AcquireShareResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent share pool path, in the format `projects/{project}/locations/{location}/sharePools/{share_pool}`. |

### `file.projects.locations.sharePools.releaseShare`

- Versions: v1beta1
- `POST https://file.googleapis.com/v1beta1/{+parent}:releaseShare`
- Releases a share synchronously, marking it for background scrubbing.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `ReleaseShareRequest`; Response: `ReleaseShareResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent share pool path, in the format `projects/{project}/locations/{location}/sharePools/{share_pool}`. |

### `file.projects.locations.volumePools.create`

- Versions: v1beta1
- `POST https://file.googleapis.com/v1beta1/{+parent}/volumePools`
- Creates a volume pool.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `VolumePool`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The project and location for which to create the volume pool, in the format `projects/{project}/locations/{location}`. |
| `volumePoolId` | query | string | yes | Required. The ID to use for the volume pool, which will become the final component of the volume pool's resource name. |

### `file.projects.locations.volumePools.delete`

- Versions: v1beta1
- `DELETE https://file.googleapis.com/v1beta1/{+name}`
- Deletes a volume pool.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The volume pool resource name, in the format `projects/{project}/locations/{location}/volumePools/{volume_pool}`. |
| `force` | query | boolean | no | Optional. If set to `true`, the volume pool is deleted even if it has volumes, and its volumes are deleted with it. Otherwise, the request fails if the volume pool has any volumes. |

### `file.projects.locations.volumePools.get`

- Versions: v1beta1
- `GET https://file.googleapis.com/v1beta1/{+name}`
- Gets the details of a specific volume pool.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `VolumePool`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The volume pool resource name, in the format `projects/{project}/locations/{location}/volumePools/{volume_pool}`. |

### `file.projects.locations.volumePools.list`

- Versions: v1beta1
- `GET https://file.googleapis.com/v1beta1/{+parent}/volumePools`
- Lists all volume pools in a project for either a specified location or for all locations.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListVolumePoolsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The project and location for which to retrieve volume pool information, in the format `projects/{project}/locations/{location}`. To retrieve volume pool information for all locations, use "-" as the value of `{location}`. |
| `filter` | query | string | no | Optional. List filter. |
| `orderBy` | query | string | no | Optional. Sort results. Supported values are "name", "name desc" or "" (unsorted). |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of items to return. |
| `pageToken` | query | string | no | Optional. The next_page_token value to use if there are additional results to retrieve for this list request. |

### `file.projects.locations.volumePools.patch`

- Versions: v1beta1
- `PATCH https://file.googleapis.com/v1beta1/{+name}`
- Updates the settings of a specific volume pool.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `VolumePool`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. The resource name of the volume pool, in the format `projects/{project}/locations/{location}/volumePools/{volume_pool}`. |
| `updateMask` | query | string (google-fieldmask) | no | Optional. Mask of fields to update. At least one path must be supplied in this field. |

### `file.projects.locations.volumePools.volumes.create`

- Versions: v1beta1
- `POST https://file.googleapis.com/v1beta1/{+parent}/volumes`
- Creates a volume.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Volume`; Response: `Volume`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent volume pool path, in the format `projects/{project}/locations/{location}/volumePools/{volume_pool}`. |
| `volumeId` | query | string | yes | Required. The ID to use for the volume. The ID must be unique within the specified volume pool. |

### `file.projects.locations.volumePools.volumes.createFromSource`

- Versions: v1beta1
- `POST https://file.googleapis.com/v1beta1/{+parent}/volumes:createFromSource`
- Creates a volume in a volume pool from an existing data source (such as a Filestore backup).
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `CreateFromSourceRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource where this volume will be created. Format: projects/{project}/locations/{location}/volumePools/{volume_pool} |

### `file.projects.locations.volumePools.volumes.delete`

- Versions: v1beta1
- `DELETE https://file.googleapis.com/v1beta1/{+name}`
- Deletes a volume.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The volume resource name, in the format `projects/{project}/locations/{location}/volumePools/{volume_pool}/volumes/{volume}`. |

### `file.projects.locations.volumePools.volumes.get`

- Versions: v1beta1
- `GET https://file.googleapis.com/v1beta1/{+name}`
- Gets the details of a specific volume.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Volume`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The volume resource name, in the format `projects/{project}/locations/{location}/volumePools/{volume_pool}/volumes/{volume}`. |

### `file.projects.locations.volumePools.volumes.list`

- Versions: v1beta1
- `GET https://file.googleapis.com/v1beta1/{+parent}/volumes`
- Lists all volumes for a specified volume pool.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListVolumesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The volume pool for which to retrieve volume information, in the format `projects/{project}/locations/{location}/volumePools/{volume_pool}`. |
| `filter` | query | string | no | Optional. List filter. |
| `orderBy` | query | string | no | Optional. Sort results. Supported values are "name", "name desc" or "" (unsorted). |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of items to return. |
| `pageToken` | query | string | no | Optional. The next_page_token value to use if there are additional results to retrieve for this list request. |

### `file.projects.locations.volumePools.volumes.patch`

- Versions: v1beta1
- `PATCH https://file.googleapis.com/v1beta1/{+name}`
- Updates the settings of a specific volume.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Volume`; Response: `Volume`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. The resource name of the volume, in the format `projects/{project}/locations/{location}/volumePools/{volume_pool}/volumes/{volume}`. |
| `updateMask` | query | string (google-fieldmask) | yes | Required. Mask of fields to update. At least one path must be supplied in this field. |

### `file.projects.locations.volumePools.volumes.unfreeze`

- Versions: v1beta1
- `POST https://file.googleapis.com/v1beta1/{+name}:unfreeze`
- Unfreezes a volume.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `UnfreezeVolumeRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the volume to unfreeze. Format: `projects/{project}/locations/{location}/volumePools/{volume_pool}/volumes/{volume}`. |

### Example request skeleton

Generated from the Discovery entry of `file.projects.locations.backups.get` (not in the official docs); replace the `{...}` path variables (URL-encode query values):

```bash
curl -X GET \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  "https://file.googleapis.com/v1/{+name}"
```

## Notes

- Generated from the Discovery document(s) v1, v1beta1 of `file` (retrieved 2026-11-14). Resources on this page: projects.
- The Required column is `yes` for path variables and required parameters, and `conditional` when the description says "Required if ..." (mutually exclusive alternatives), when a `parent.child` parameter is required only inside an optional parent message or one branch of a oneof. Path variables are always `yes`.
- Message schemas (the request and response types named above) are listed under `references/rest-schemas/file/`; they are the `schemas` section of the Discovery documents in Source.
- Corrected from the official docs (the Discovery text above is verbatim): the share `name` format is written `.../instances/{instance_id}/share/{share_id}`; the collection is `shares` (Discovery path pattern `projects/{project_id}/locations/{location}/instances/{instance_id}/shares/{share_id}`).
- Source: https://file.googleapis.com/$discovery/rest?version=v1, https://file.googleapis.com/$discovery/rest?version=v1beta1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
