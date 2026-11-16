---
source: https://alloydb.googleapis.com/$discovery/rest?version=v1
---

# AlloyDB API REST API (alloydb)

## Signature / Usage

Base URL: `https://alloydb.googleapis.com`. Methods are listed by `id`; the `Versions` line shows which API versions define the method (preferred: v1).

### `alloydb.projects.locations.backups.create`

- Versions: v1, v1beta, v1alpha
- `POST https://alloydb.googleapis.com/v1/{+parent}/backups`
- Creates a new Backup in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Backup`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Value for parent. |
| `backupId` | query | string | yes | Required. ID of the requesting object. |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server ignores the request if it has already been completed. The server guarantees that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if the original operation with the same request ID was received, and if so, ignores the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `validateOnly` | query | boolean | no | Optional. If set, the backend validates the request, but doesn't actually execute it. |

### `alloydb.projects.locations.backups.delete`

- Versions: v1, v1beta, v1alpha
- `DELETE https://alloydb.googleapis.com/v1/{+name}`
- Deletes a single Backup.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the resource. For the required format, see the comment on the Backup.name field. |
| `etag` | query | string | no | Optional. The current etag of the Backup. If an etag is provided and does not match the current etag of the Backup, deletion will be blocked and an ABORTED error will be returned. |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server ignores the request if it has already been completed. The server guarantees that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if the original operation with the same request ID was received, and if so, ignores the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `validateOnly` | query | boolean | no | Optional. If set, the backend validates the request, but doesn't actually execute it. |

### `alloydb.projects.locations.backups.get`

- Versions: v1, v1beta, v1alpha
- `GET https://alloydb.googleapis.com/v1/{+name}`
- Gets details of a single Backup.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Backup`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the resource |
| `view` | query | string enum | no | Optional. The view of the backup to return. Values: `BACKUP_VIEW_UNSPECIFIED`, `BACKUP_VIEW_BASIC`, `BACKUP_VIEW_CLUSTER_DELETED`. |

### `alloydb.projects.locations.backups.list`

- Versions: v1, v1beta, v1alpha
- `GET https://alloydb.googleapis.com/v1/{+parent}/backups`
- Lists Backups in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListBackupsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Parent value for ListBackupsRequest |
| `filter` | query | string | no | Filtering results |
| `orderBy` | query | string | no | Hint for how to order the results |
| `pageSize` | query | integer (int32) | no | Requested page size. Server may return fewer items than requested. If unspecified, server will pick an appropriate default. |
| `pageToken` | query | string | no | A token identifying a page of results the server should return. |
| `view` | query | string enum | no | Optional. The view of the backup to return. Values: `BACKUP_VIEW_UNSPECIFIED`, `BACKUP_VIEW_BASIC`, `BACKUP_VIEW_CLUSTER_DELETED`. |

### `alloydb.projects.locations.backups.patch`

- Versions: v1, v1beta, v1alpha
- `PATCH https://alloydb.googleapis.com/v1/{+name}`
- Updates the parameters of a single Backup.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Backup`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Output only. The name of the backup resource with the format: \* projects/{project}/locations/{region}/backups/{backup_id} where the cluster and backup ID segments should satisfy the regex expression `[a-z]([a-z0-9-]{0,61}[a-z0-9])?`, e.g. 1-63 characters of lowercase letters, numbers, and dashes, starting with a letter, and ending with a letter or number. For more details see https://google.aip.dev/122. The prefix of the backup resource name is the name of the parent resource: \* projects/{project}/locations/{region} |
| `allowMissing` | query | boolean | no | Optional. If set to true, update succeeds even if instance is not found. In that case, a new backup is created and `update_mask` is ignored. |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server ignores the request if it has already been completed. The server guarantees that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if the original operation with the same request ID was received, and if so, ignores the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `updateMask` | query | string (google-fieldmask) | no | Optional. Field mask is used to specify the fields to be overwritten in the Backup resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it is in the mask. If the user does not provide a mask then all fields will be overwritten. |
| `validateOnly` | query | boolean | no | Optional. If set, the backend validates the request, but doesn't actually execute it. |

### `alloydb.projects.locations.clusters.create`

- Versions: v1, v1beta, v1alpha
- `POST https://alloydb.googleapis.com/v1/{+parent}/clusters`
- Creates a new Cluster in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Cluster`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The location of the new cluster. For the required format, see the comment on the Cluster.name field. |
| `clusterId` | query | string | yes | Required. ID of the requesting object. |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server ignores the request if it has already been completed. The server guarantees that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if the original operation with the same request ID was received, and if so, ignores the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `validateOnly` | query | boolean | no | Optional. If set, performs request validation, for example, permission checks and any other type of validation, but does not actually execute the create request. |

### `alloydb.projects.locations.clusters.createsecondary`

- Versions: v1, v1beta, v1alpha
- `POST https://alloydb.googleapis.com/v1/{+parent}/clusters:createsecondary`
- Creates a cluster of type SECONDARY in the given location using the primary cluster as the source.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Cluster`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The location of the new cluster. For the required format, see the comment on the Cluster.name field. |
| `clusterId` | query | string | yes | Required. ID of the requesting object (the secondary cluster). |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server ignores the request if it has already been completed. The server guarantees that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if the original operation with the same request ID was received, and if so, ignores the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `validateOnly` | query | boolean | no | Optional. If set, performs request validation, for example, permission checks and any other type of validation, but does not actually execute the create request. |

### `alloydb.projects.locations.clusters.delete`

- Versions: v1, v1beta, v1alpha
- `DELETE https://alloydb.googleapis.com/v1/{+name}`
- Deletes a single Cluster.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the resource. For the required format, see the comment on the Cluster.name field. |
| `etag` | query | string | no | Optional. The current etag of the Cluster. If an etag is provided and does not match the current etag of the Cluster, deletion will be blocked and an ABORTED error will be returned. |
| `force` | query | boolean | no | Optional. Whether to cascade delete child instances for given cluster. |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server ignores the request if it has already been completed. The server guarantees that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if the original operation with the same request ID was received, and if so, ignores the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `validateOnly` | query | boolean | no | Optional. If set, performs request validation, for example, permission checks and any other type of validation, but does not actually execute the create request. |

### `alloydb.projects.locations.clusters.export`

- Versions: v1, v1beta, v1alpha
- `POST https://alloydb.googleapis.com/v1/{+name}:export`
- Exports data from the cluster. Imperative only.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `ExportClusterRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the cluster. |

### `alloydb.projects.locations.clusters.get`

- Versions: v1, v1beta, v1alpha
- `GET https://alloydb.googleapis.com/v1/{+name}`
- Gets details of a single Cluster.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Cluster`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the resource. For the required format, see the comment on the Cluster.name field. |
| `view` | query | string enum | no | Optional. The view of the cluster to return. Returns all default fields if not set. Values: `CLUSTER_VIEW_UNSPECIFIED`, `CLUSTER_VIEW_BASIC`, `CLUSTER_VIEW_CONTINUOUS_BACKUP`. |

### `alloydb.projects.locations.clusters.import`

- Versions: v1, v1beta, v1alpha
- `POST https://alloydb.googleapis.com/v1/{+name}:import`
- Imports data to the cluster. Imperative only.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `ImportClusterRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the cluster. |

### `alloydb.projects.locations.clusters.instances.create`

- Versions: v1, v1beta, v1alpha
- `POST https://alloydb.googleapis.com/v1/{+parent}/instances`
- Creates a new Instance in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Instance`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The name of the parent resource. For the required format, see the comment on the Instance.name field. |
| `instanceId` | query | string | yes | Required. ID of the requesting object. |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server ignores the request if it has already been completed. The server guarantees that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if the original operation with the same request ID was received, and if so, ignores the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `validateOnly` | query | boolean | no | Optional. If set, performs request validation, for example, permission checks and any other type of validation, but does not actually execute the create request. |

### `alloydb.projects.locations.clusters.instances.createsecondary`

- Versions: v1, v1beta, v1alpha
- `POST https://alloydb.googleapis.com/v1/{+parent}/instances:createsecondary`
- Creates a new SECONDARY Instance in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Instance`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The name of the parent resource. For the required format, see the comment on the Instance.name field. |
| `instanceId` | query | string | yes | Required. ID of the requesting object. |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server ignores the request if it has already been completed. The server guarantees that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if the original operation with the same request ID was received, and if so, ignores the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `validateOnly` | query | boolean | no | Optional. If set, performs request validation, for example, permission checks and any other type of validation, but does not actually execute the create request. |

### `alloydb.projects.locations.clusters.instances.delete`

- Versions: v1, v1beta, v1alpha
- `DELETE https://alloydb.googleapis.com/v1/{+name}`
- Deletes a single Instance.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the resource. For the required format, see the comment on the Instance.name field. |
| `etag` | query | string | no | Optional. The current etag of the Instance. If an etag is provided and does not match the current etag of the Instance, deletion will be blocked and an ABORTED error will be returned. |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server ignores the request if it has already been completed. The server guarantees that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if the original operation with the same request ID was received, and if so, ignores the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `validateOnly` | query | boolean | no | Optional. If set, performs request validation, for example, permission checks and any other type of validation, but does not actually execute the create request. |

### `alloydb.projects.locations.clusters.instances.failover`

- Versions: v1, v1beta, v1alpha
- `POST https://alloydb.googleapis.com/v1/{+name}:failover`
- Forces a Failover for a highly available instance. Failover promotes the HA standby instance as the new primary. Imperative only.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `FailoverInstanceRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the resource. For the required format, see the comment on the Instance.name field. |

### `alloydb.projects.locations.clusters.instances.get`

- Versions: v1, v1beta, v1alpha
- `GET https://alloydb.googleapis.com/v1/{+name}`
- Gets details of a single Instance.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Instance`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the resource. For the required format, see the comment on the Instance.name field. |
| `view` | query | string enum | no | The view of the instance to return. Values: `INSTANCE_VIEW_UNSPECIFIED`, `INSTANCE_VIEW_BASIC`, `INSTANCE_VIEW_FULL`. |

### `alloydb.projects.locations.clusters.instances.getConnectionInfo`

- Versions: v1, v1beta, v1alpha
- `GET https://alloydb.googleapis.com/v1/{+parent}/connectionInfo`
- Get instance metadata used for a connection.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ConnectionInfo`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The name of the parent resource. The required format is: projects/{project}/locations/{location}/clusters/{cluster}/instances/{instance} |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server ignores the request if it has already been completed. The server guarantees that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if the original operation with the same request ID was received, and if so, ignores the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `alloydb.projects.locations.clusters.instances.injectFault`

- Versions: v1, v1beta, v1alpha
- `POST https://alloydb.googleapis.com/v1/{+name}:injectFault`
- Injects fault in an instance. Imperative only.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `InjectFaultRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the resource. For the required format, see the comment on the Instance.name field. |

### `alloydb.projects.locations.clusters.instances.list`

- Versions: v1, v1beta, v1alpha
- `GET https://alloydb.googleapis.com/v1/{+parent}/instances`
- Lists Instances in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListInstancesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The name of the parent resource. For the required format, see the comment on the Instance.name field. Additionally, you can perform an aggregated list operation by specifying a value with one of the following formats: \* projects/{project}/locations/-/clusters/- \* projects/{project}/locations/{region}/clusters/- |
| `filter` | query | string | no | Optional. Filtering results |
| `orderBy` | query | string | no | Optional. Hint for how to order the results |
| `pageSize` | query | integer (int32) | no | Optional. Requested page size. Server may return fewer items than requested. If unspecified, server will pick an appropriate default. |
| `pageToken` | query | string | no | A token identifying a page of results the server should return. |

### `alloydb.projects.locations.clusters.instances.patch`

- Versions: v1, v1beta, v1alpha
- `PATCH https://alloydb.googleapis.com/v1/{+name}`
- Updates the parameters of a single Instance.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Instance`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Output only. The name of the instance resource with the format: \* projects/{project}/locations/{region}/clusters/{cluster_id}/instances/{instance_id} where the cluster and instance ID segments should satisfy the regex expression `[a-z]([a-z0-9-]{0,61}[a-z0-9])?`, e.g. 1-63 characters of lowercase letters, numbers, and dashes, starting with a letter, and ending with a letter or number. For more details see https://google.aip.dev/122. The prefix of the instance resource name is the name of the parent resource: \* projects/{project}/locations/{region}/clusters/{cluster_id} |
| `allowMissing` | query | boolean | no | Optional. If set to true, update succeeds even if instance is not found. In that case, a new instance is created and `update_mask` is ignored. |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server ignores the request if it has already been completed. The server guarantees that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if the original operation with the same request ID was received, and if so, ignores the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `updateMask` | query | string (google-fieldmask) | no | Optional. Field mask is used to specify the fields to be overwritten in the Instance resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it is in the mask. If the user does not provide a mask then all fields will be overwritten. |
| `validateOnly` | query | boolean | no | Optional. If set, performs request validation, for example, permission checks and any other type of validation, but does not actually execute the create request. |

### `alloydb.projects.locations.clusters.instances.restart`

- Versions: v1, v1beta, v1alpha
- `POST https://alloydb.googleapis.com/v1/{+name}:restart`
- Restart an Instance in a cluster. Imperative only.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `RestartInstanceRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the resource. For the required format, see the comment on the Instance.name field. |

### `alloydb.projects.locations.clusters.list`

- Versions: v1, v1beta, v1alpha
- `GET https://alloydb.googleapis.com/v1/{+parent}/clusters`
- Lists Clusters in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListClustersResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The name of the parent resource. For the required format, see the comment on the Cluster.name field. Additionally, you can perform an aggregated list operation by specifying a value with the following format: \* projects/{project}/locations/- |
| `filter` | query | string | no | Optional. Filtering results |
| `orderBy` | query | string | no | Optional. Hint for how to order the results |
| `pageSize` | query | integer (int32) | no | Optional. Requested page size. Server may return fewer items than requested. If unspecified, server will pick an appropriate default. |
| `pageToken` | query | string | no | A token identifying a page of results the server should return. |

### `alloydb.projects.locations.clusters.patch`

- Versions: v1, v1beta, v1alpha
- `PATCH https://alloydb.googleapis.com/v1/{+name}`
- Updates the parameters of a single Cluster.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Cluster`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Output only. The name of the cluster resource with the format: \* projects/{project}/locations/{region}/clusters/{cluster_id} where the cluster ID segment should satisfy the regex expression `[a-z0-9-]+`. For more details see https://google.aip.dev/122. The prefix of the cluster resource name is the name of the parent resource: \* projects/{project}/locations/{region} |
| `allowMissing` | query | boolean | no | Optional. If set to true, update succeeds even if cluster is not found. In that case, a new cluster is created and `update_mask` is ignored. |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server ignores the request if it has already been completed. The server guarantees that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if the original operation with the same request ID was received, and if so, ignores the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `updateMask` | query | string (google-fieldmask) | no | Optional. Field mask is used to specify the fields to be overwritten in the Cluster resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it is in the mask. If the user does not provide a mask then all fields will be overwritten. |
| `validateOnly` | query | boolean | no | Optional. If set, performs request validation, for example, permission checks and any other type of validation, but does not actually execute the create request. |

### `alloydb.projects.locations.clusters.promote`

- Versions: v1, v1beta, v1alpha
- `POST https://alloydb.googleapis.com/v1/{+name}:promote`
- Promotes a SECONDARY cluster. This turns down replication from the PRIMARY cluster and promotes a secondary cluster into its own standalone cluster. Imperative only.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `PromoteClusterRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the resource. For the required format, see the comment on the Cluster.name field |

### `alloydb.projects.locations.clusters.restore`

- Versions: v1, v1beta, v1alpha
- `POST https://alloydb.googleapis.com/v1/{+parent}/clusters:restore`
- Creates a new Cluster in a given project and location, with a volume restored from the provided source, either a backup ID or a point-in-time and a source cluster.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `RestoreClusterRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The name of the parent resource. For the required format, see the comment on the Cluster.name field. |

### `alloydb.projects.locations.clusters.restoreFromCloudSQL`

- Versions: v1, v1beta, v1alpha
- `POST https://alloydb.googleapis.com/v1/{+parent}/clusters:restoreFromCloudSQL`
- Restores an AlloyDB cluster from a CloudSQL resource.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `RestoreFromCloudSQLRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The location of the new cluster. For the required format, see the comment on Cluster.name field. |

### `alloydb.projects.locations.clusters.switchover`

- Versions: v1, v1beta, v1alpha
- `POST https://alloydb.googleapis.com/v1/{+name}:switchover`
- Switches the roles of PRIMARY and SECONDARY clusters without any data loss. This promotes the SECONDARY cluster to PRIMARY and sets up the original PRIMARY cluster to replicate from this newly promoted cluster.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `SwitchoverClusterRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the resource. For the required format, see the comment on the Cluster.name field |

### `alloydb.projects.locations.clusters.upgrade`

- Versions: v1, v1beta, v1alpha
- `PATCH https://alloydb.googleapis.com/v1/{+name}:upgrade`
- Upgrades a single Cluster. Imperative only.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `UpgradeClusterRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the cluster. |

### `alloydb.projects.locations.clusters.users.create`

- Versions: v1, v1beta, v1alpha
- `POST https://alloydb.googleapis.com/v1/{+parent}/users`
- Creates a new User in a given project, location, and cluster.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `User`; Response: `User`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Value for parent. |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server ignores the request if it has already been completed. The server guarantees that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if the original operation with the same request ID was received, and if so, ignores the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `userId` | query | string | yes | Required. ID of the requesting object. |
| `validateOnly` | query | boolean | no | Optional. If set, the backend validates the request, but doesn't actually execute it. |

### `alloydb.projects.locations.clusters.users.delete`

- Versions: v1, v1beta, v1alpha
- `DELETE https://alloydb.googleapis.com/v1/{+name}`
- Deletes a single User.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the resource. For the required format, see the comment on the User.name field. |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server ignores the request if it has already been completed. The server guarantees that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if the original operation with the same request ID was received, and if so, ignores the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `validateOnly` | query | boolean | no | Optional. If set, the backend validates the request, but doesn't actually execute it. |

### `alloydb.projects.locations.clusters.users.get`

- Versions: v1, v1beta, v1alpha
- `GET https://alloydb.googleapis.com/v1/{+name}`
- Gets details of a single User.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `User`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the resource. For the required format, see the comment on the User.name field. |

### `alloydb.projects.locations.clusters.users.list`

- Versions: v1, v1beta, v1alpha
- `GET https://alloydb.googleapis.com/v1/{+parent}/users`
- Lists Users in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListUsersResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Parent value for ListUsersRequest |
| `filter` | query | string | no | Optional. Filtering results |
| `orderBy` | query | string | no | Optional. Hint for how to order the results |
| `pageSize` | query | integer (int32) | no | Optional. Requested page size. Server may return fewer items than requested. If unspecified, server will pick an appropriate default. |
| `pageToken` | query | string | no | Optional. A token identifying a page of results the server should return. |

### `alloydb.projects.locations.clusters.users.patch`

- Versions: v1, v1beta, v1alpha
- `PATCH https://alloydb.googleapis.com/v1/{+name}`
- Updates the parameters of a single User.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `User`; Response: `User`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Output only. Name of the resource in the form of projects/{project}/locations/{location}/cluster/{cluster}/users/{user}. |
| `allowMissing` | query | boolean | no | Optional. Allow missing fields in the update mask. |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server ignores the request if it has already been completed. The server guarantees that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if the original operation with the same request ID was received, and if so, ignores the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `updateMask` | query | string (google-fieldmask) | no | Optional. Field mask is used to specify the fields to be overwritten in the User resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it is in the mask. If the user does not provide a mask then all fields will be overwritten. |
| `validateOnly` | query | boolean | no | Optional. If set, the backend validates the request, but doesn't actually execute it. |

### `alloydb.projects.locations.endpoints.create`

- Versions: v1beta, v1alpha
- `POST https://alloydb.googleapis.com/v1beta/{+parent}/endpoints`
- Creates a new Endpoint in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Endpoint`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The location of the new endpoint. For the required format, see the comment on the Endpoint.name field. |
| `endpointId` | query | string | yes | Required. ID of the requesting object. |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server ignores the request if it has already been completed. The server guarantees that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if the original operation with the same request ID was received, and if so, ignores the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `validateOnly` | query | boolean | no | Optional. If set, the backend validates the request, but doesn't actually execute it. |

### `alloydb.projects.locations.endpoints.delete`

- Versions: v1beta, v1alpha
- `DELETE https://alloydb.googleapis.com/v1beta/{+name}`
- Deletes a single Endpoint.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the resource. For the required format, see the comment on the Endpoint.name field. |
| `etag` | query | string | no | Optional. The current etag of the Endpoint. If an etag is provided and does not match the current etag of the Endpoint, deletion will be blocked and an ABORTED error will be returned. |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server ignores the request if it has already been completed. The server guarantees that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if the original operation with the same request ID was received, and if so, ignores the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `validateOnly` | query | boolean | no | Optional. If set, the backend validates the request, but doesn't actually execute it. |

### `alloydb.projects.locations.endpoints.get`

- Versions: v1beta, v1alpha
- `GET https://alloydb.googleapis.com/v1beta/{+name}`
- Gets details of a single Endpoint.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Endpoint`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the resource. For the required format, see the comment on the Endpoint.name field. |

### `alloydb.projects.locations.endpoints.list`

- Versions: v1beta, v1alpha
- `GET https://alloydb.googleapis.com/v1beta/{+parent}/endpoints`
- Lists Endpoints in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListEndpointsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The name of the parent resource. For the required format, see the comment on the Endpoint.name field. Additionally, you can perform an aggregated list operation by specifying a value with the following format: \* projects/{project}/locations/- |
| `filter` | query | string | no | Optional. Filtering results. This field is currently not supported, its value will be ignored if passed. |
| `orderBy` | query | string | no | Optional. Hint for how to order the results |
| `pageSize` | query | integer (int32) | no | Optional. Requested page size. Server may return fewer items than requested. If unspecified, server will pick an appropriate default. |
| `pageToken` | query | string | no | Optional. A page token, received from a previous `ListEndpoints` call. This should be provided to retrieve the subsequent page. This field is currently not supported, its value will be ignored if passed. |

### `alloydb.projects.locations.endpoints.patch`

- Versions: v1beta, v1alpha
- `PATCH https://alloydb.googleapis.com/v1beta/{+name}`
- Updates the parameters of a single Endpoint.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Endpoint`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Output only. Identifier. The name of the endpoint resource with the format: \* projects/{project}/locations/{region}/endpoints/{endpoint_id} where the endpoint ID segment should satisfy the regex expression `[a-z0-9-]+`. For more details see https://google.aip.dev/122. The prefix of the endpoint resource name is the name of the parent resource: \* projects/{project}/locations/{region} |
| `allowMissing` | query | boolean | no | Optional. If set to true, update succeeds even if endpoint is not found. In that case, a new endpoint is created and `update_mask` is ignored. |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server ignores the request if it has already been completed. The server guarantees that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if the original operation with the same request ID was received, and if so, ignores the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `updateMask` | query | string (google-fieldmask) | no | Optional. Field mask is used to specify the fields to be overwritten in the Endpoint resource by the update. The fields specified in the update_mask are relative to the resource, not the full request. A field will be overwritten if it is in the mask. If the user does not provide a mask then all fields will be overwritten. |
| `validateOnly` | query | boolean | no | Optional. If set, the backend validates the request, but doesn't actually execute it. |

### `alloydb.projects.locations.get`

- Versions: v1, v1beta, v1alpha
- `GET https://alloydb.googleapis.com/v1/{+name}`
- Gets information about a location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudLocationLocation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Resource name for the location. |

### `alloydb.projects.locations.list`

- Versions: v1, v1beta, v1alpha
- `GET https://alloydb.googleapis.com/v1/{+name}/locations`
- Lists information about the supported locations for this service. This method lists locations based on the resource scope provided in the ListLocationsRequest.name field: \* \*\*Global locations\*\*: If `name` is empty, the method lists the public locations available to all projects. \* \*\*Project-specific locations\*\*: If `name` follows the format `projects/{project}`, the method lists locations visible to that specific project. This includes public, private, or other project-specific locations enabled for the project. For gRPC and client library implementations, the resource name is passed as the `name` field. For direct service calls, the resource name is incorporated into the request path based on the specific service implementation and version.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudLocationListLocationsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The resource that owns the locations collection, if applicable. |
| `extraLocationTypes` | query | repeated string | no | Optional. Do not use this field unless explicitly documented otherwise. This is primarily for internal usage. |
| `filter` | query | string | no | A filter to narrow down results to a preferred subset. The filtering language accepts strings like `"displayName=tokyo"`, and is documented in more detail in AIP-160 (https://google.aip.dev/160). |
| `pageSize` | query | integer (int32) | no | The maximum number of results to return. If not set, the service selects a default. |
| `pageToken` | query | string | no | A page token received from the `next_page_token` field in the response. Send that page token to receive the subsequent page. |

### `alloydb.projects.locations.operations.cancel`

- Versions: v1, v1beta, v1alpha
- `POST https://alloydb.googleapis.com/v1/{+name}:cancel`
- Starts asynchronous cancellation on a long-running operation. The server makes a best effort to cancel the operation, but success is not guaranteed. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. Clients can use Operations.GetOperation or other methods to check whether the cancellation succeeded or whether the operation completed despite cancellation. On successful cancellation, the operation is not deleted; instead, it becomes an operation with an Operation.error value with a google.rpc.Status.code of `1`, corresponding to `Code.CANCELLED`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `CancelOperationRequest`; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource to be cancelled. |

### `alloydb.projects.locations.operations.delete`

- Versions: v1, v1beta, v1alpha
- `DELETE https://alloydb.googleapis.com/v1/{+name}`
- Deletes a long-running operation. This method indicates that the client is no longer interested in the operation result. It does not cancel the operation. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource to be deleted. |

### `alloydb.projects.locations.operations.get`

- Versions: v1, v1beta, v1alpha
- `GET https://alloydb.googleapis.com/v1/{+name}`
- Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource. |

### `alloydb.projects.locations.operations.list`

- Versions: v1, v1beta, v1alpha
- `GET https://alloydb.googleapis.com/v1/{+name}/operations`
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

### `alloydb.projects.locations.supportedDatabaseFlags.list`

- Versions: v1, v1beta, v1alpha
- `GET https://alloydb.googleapis.com/v1/{+parent}/supportedDatabaseFlags`
- Lists SupportedDatabaseFlags for a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListSupportedDatabaseFlagsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The name of the parent resource. The required format is: \* projects/{project}/locations/{location} Regardless of the parent specified here, as long it is contains a valid project and location, the service will return a static list of supported flags resources. Note that we do not yet support region-specific flags. |
| `pageSize` | query | integer (int32) | no | Requested page size. Server may return fewer items than requested. If unspecified, server will pick an appropriate default. |
| `pageToken` | query | string | no | A token identifying a page of results the server should return. |
| `scope` | query | string enum | no | Optional. The scope for which supported flags are requested. If not specified, default is DATABASE. Values: `SCOPE_UNSPECIFIED`, `DATABASE`, `CONNECTION_POOL`. |

### Example request skeleton

Generated from the Discovery entry of `alloydb.projects.locations.backups.get` (not in the official docs); replace the `{...}` path variables (URL-encode query values):

```bash
curl -X GET \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  "https://alloydb.googleapis.com/v1/{+name}"
```

## Notes

- Generated from the Discovery document(s) v1, v1beta, v1alpha of `alloydb` (retrieved 2026-11-14). Resources on this page: projects.
- The Required column is `yes` for path variables and required parameters, and `conditional` when the description says "Required if ..." (mutually exclusive alternatives), when a `parent.child` parameter is required only inside an optional parent message or one branch of a oneof. Path variables are `yes` unless a note below names an alternative route without them.
- Message schemas (the request and response types named above) are listed under `references/rest-schemas/alloydb/`; they are the `schemas` section of the Discovery documents in Source.
- Source: https://alloydb.googleapis.com/$discovery/rest?version=v1, https://alloydb.googleapis.com/$discovery/rest?version=v1beta, https://alloydb.googleapis.com/$discovery/rest?version=v1alpha (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
