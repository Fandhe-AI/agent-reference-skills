---
source: https://redis.googleapis.com/$discovery/rest?version=v1
---

# Google Cloud Memorystore for Redis API REST API (redis)

## Signature / Usage

Base URL: `https://redis.googleapis.com`. Methods are listed by `id`; the `Versions` line shows which API versions define the method (preferred: v1).

### `redis.projects.locations.aclPolicies.create`

- Versions: v1, v1beta1
- `POST https://redis.googleapis.com/v1/{+parent}/aclPolicies`
- Creates an ACL policy. The creation is executed synchronously and the policy is available for use immediately after the RPC returns.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/redis.read-write`
- Request: `AclPolicy`; Response: `AclPolicy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The resource name of the cluster location using the form: `projects/{project_id}/locations/{location_id}` where `location_id` refers to a Google Cloud region. |
| `aclPolicyId` | query | string | yes | Required. The logical name of the ACL policy in the customer project with the following restrictions: \* Must contain only lowercase letters, numbers, and hyphens. \* Must start with a letter. \* Must be between 1-63 characters. \* Must end with a number or a letter. \* Must be unique within the customer project / location |
| `requestId` | query | string | no | Optional. Idempotent request UUID. . |

### `redis.projects.locations.aclPolicies.delete`

- Versions: v1, v1beta1
- `DELETE https://redis.googleapis.com/v1/{+name}`
- Deletes a specific ACL policy. This action will delete the ACL policy and all the rules associated with it. An ACL policy cannot be deleted if it is attached to a cluster.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/redis.read-write`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Redis ACL policy resource name using the form: `projects/{project_id}/locations/{location_id}/aclPolicies/{acl_policy_id}` where `location_id` refers to a Google Cloud region. |
| `etag` | query | string | no | Optional. Etag of the ACL policy. If this is different from the server's etag, the request will fail with an ABORTED error. |
| `requestId` | query | string | no | Optional. Idempotent request UUID. |

### `redis.projects.locations.aclPolicies.get`

- Versions: v1, v1beta1
- `GET https://redis.googleapis.com/v1/{+name}`
- Gets the details of a specific Redis Cluster ACL policy.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/redis.read-write`
- Request: —; Response: `AclPolicy`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Redis ACL policy resource name using the form: `projects/{project_id}/locations/{location_id}/aclPolicies/{acl_policy_id}` where `location_id` refers to a Google Cloud region. |

### `redis.projects.locations.aclPolicies.list`

- Versions: v1, v1beta1
- `GET https://redis.googleapis.com/v1/{+parent}/aclPolicies`
- Lists all ACL policies owned by a project in either the specified location (region) or all locations. The location should have the following format: \* `projects/{project_id}/locations/{location_id}` If `location_id` is specified as `-` (wildcard), then all regions available to the project are queried, and the results are aggregated.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/redis.read-write`
- Request: —; Response: `ListAclPoliciesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The resource name of the ACL policy location using the form: `projects/{project_id}/locations/{location_id}` where `location_id` refers to a Google Cloud region. |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of items to return. If not specified, a default value of 1000 will be used by the service. Regardless of the page_size value, the response may include a partial list and a caller should only rely on response's `next_page_token` to determine if there are more ACL policies left to be queried. The maximum value is 1000; values above 1000 will be coerced to 1000. |
| `pageToken` | query | string | no | Optional. The `next_page_token` value returned from a previous `ListAclPolicies` request, if any. |

### `redis.projects.locations.aclPolicies.patch`

- Versions: v1, v1beta1
- `PATCH https://redis.googleapis.com/v1/{+name}`
- Updates the ACL policy. The operation applies the updated ACL policy to all of the linked clusters. If Memorystore can apply the policy to all clusters, then the operation returns a SUCCESS status. If Memorystore can't apply the policy to all clusters, then to ensure eventual consistency, Memorystore uses reconciliation to apply the policy to the failed clusters. Completed longrunning.Operation will contain the new ACL policy object in the response field.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/redis.read-write`
- Request: `AclPolicy`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. Full resource path of the ACL policy. |
| `requestId` | query | string | no | Optional. Idempotent request UUID. |
| `updateMask` | query | string (google-fieldmask) | no | Optional. Mask of fields to be updated. At least one path must be supplied in this field. The elements of the repeated paths field may only include these fields from `AclPolicy`: \* `rules` |

### `redis.projects.locations.aclPolicies.revisions.get`

- Versions: v1, v1beta1
- `GET https://redis.googleapis.com/v1/{+name}`
- Gets details of a specific ACL policy revision.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/redis.read-write`
- Request: —; Response: `AclPolicyRevision`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Redis ACL policy revision resource name using the form: `projects/{project_id}/locations/{location_id}/aclPolicies/{acl_policy_id}/revisions/{revision_id}` where `location_id` refers to a Google Cloud region. |

### `redis.projects.locations.aclPolicies.revisions.list`

- Versions: v1, v1beta1
- `GET https://redis.googleapis.com/v1/{+parent}/revisions`
- Lists all ACL policy revisions in a given ACL policy.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/redis.read-write`
- Request: —; Response: `ListAclPolicyRevisionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The name of the ACL policy to list revisions for. Format: "projects/{project_id}/locations/{location_id}/aclPolicies/{acl_policy_id}" |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of items to return. |
| `pageToken` | query | string | no | Optional. The `next_page_token` value returned from a previous `ListAclPolicyRevisions` request, if any. |

### `redis.projects.locations.backupCollections.backups.delete`

- Versions: v1, v1beta1
- `DELETE https://redis.googleapis.com/v1/{+name}`
- Deletes a specific backup.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/redis.read-write`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Redis backup resource name using the form: `projects/{project_id}/locations/{location_id}/backupCollections/{backup_collection_id}/backups/{backup_id}` |
| `requestId` | query | string | no | Optional. Idempotent request UUID. |

### `redis.projects.locations.backupCollections.backups.export`

- Versions: v1, v1beta1
- `POST https://redis.googleapis.com/v1/{+name}:export`
- Exports a specific backup to a customer target Cloud Storage URI.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/redis.read-write`
- Request: `ExportBackupRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Redis backup resource name using the form: `projects/{project_id}/locations/{location_id}/backupCollections/{backup_collection_id}/backups/{backup_id}` |

### `redis.projects.locations.backupCollections.backups.get`

- Versions: v1, v1beta1
- `GET https://redis.googleapis.com/v1/{+name}`
- Gets the details of a specific backup.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/redis.read-only`, `https://www.googleapis.com/auth/redis.read-write`
- Request: —; Response: `Backup`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Redis backup resource name using the form: `projects/{project_id}/locations/{location_id}/backupCollections/{backup_collection_id}/backups/{backup_id}` |

### `redis.projects.locations.backupCollections.backups.list`

- Versions: v1, v1beta1
- `GET https://redis.googleapis.com/v1/{+parent}/backups`
- Lists all backups owned by a backup collection.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/redis.read-only`, `https://www.googleapis.com/auth/redis.read-write`
- Request: —; Response: `ListBackupsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The resource name of the backupCollection using the form: `projects/{project_id}/locations/{location_id}/backupCollections/{backup_collection_id}` |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of items to return. If not specified, a default value of 1000 will be used by the service. Regardless of the page_size value, the response may include a partial list and a caller should only rely on response's `next_page_token` to determine if there are more clusters left to be queried. |
| `pageToken` | query | string | no | Optional. The `next_page_token` value returned from a previous \[ListBackupCollections\] request, if any. |

### `redis.projects.locations.backupCollections.get`

- Versions: v1, v1beta1
- `GET https://redis.googleapis.com/v1/{+name}`
- Get a backup collection.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/redis.read-only`, `https://www.googleapis.com/auth/redis.read-write`
- Request: —; Response: `BackupCollection`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Redis backupCollection resource name using the form: `projects/{project_id}/locations/{location_id}/backupCollections/{backup_collection_id}` where `location_id` refers to a Google Cloud region. |

### `redis.projects.locations.backupCollections.list`

- Versions: v1, v1beta1
- `GET https://redis.googleapis.com/v1/{+parent}/backupCollections`
- Lists all backup collections owned by a consumer project in either the specified location (region) or all locations. If `location_id` is specified as `-` (wildcard), then all regions available to the project are queried, and the results are aggregated.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/redis.read-only`, `https://www.googleapis.com/auth/redis.read-write`
- Request: —; Response: `ListBackupCollectionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The resource name of the backupCollection location using the form: `projects/{project_id}/locations/{location_id}` where `location_id` refers to a Google Cloud region. |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of items to return. If not specified, a default value of 1000 will be used by the service. Regardless of the page_size value, the response may include a partial list and a caller should only rely on response's `next_page_token` to determine if there are more clusters left to be queried. |
| `pageToken` | query | string | no | Optional. The `next_page_token` value returned from a previous \[ListBackupCollections\] request, if any. |

### `redis.projects.locations.clusters.addTokenAuthUser`

- Versions: v1, v1beta1
- `POST https://redis.googleapis.com/v1/{+cluster}:addTokenAuthUser`
- Adds a token auth user for a token based auth enabled cluster.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/redis.read-write`
- Request: `AddTokenAuthUserRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `cluster` | path | string | yes | Required. The cluster resource that this token auth user will be added for. Format: projects/{project}/locations/{location}/clusters/{cluster} |

### `redis.projects.locations.clusters.backup`

- Versions: v1, v1beta1
- `POST https://redis.googleapis.com/v1/{+name}:backup`
- Backup Redis Cluster. If this is the first time a backup is being created, a backup collection will be created at the backend, and this backup belongs to this collection. Both collection and backup will have a resource name. Backup will be executed for each shard. A replica (primary if nonHA) will be selected to perform the execution. Backup call will be rejected if there is an ongoing backup or update operation. Be aware that during preview, if the cluster's internal software version is too old, critical update will be performed before actual backup. Once the internal software version is updated to the minimum version required by the backup feature, subsequent backups will not require critical update. After preview, there will be no critical update needed for backup.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/redis.read-write`
- Request: `BackupClusterRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Redis cluster resource name using the form: `projects/{project_id}/locations/{location_id}/clusters/{cluster_id}` where `location_id` refers to a Google Cloud region. |

### `redis.projects.locations.clusters.create`

- Versions: v1, v1beta1
- `POST https://redis.googleapis.com/v1/{+parent}/clusters`
- Creates a Redis cluster based on the specified properties. The creation is executed asynchronously and callers may check the returned operation to track its progress. Once the operation is completed the Redis cluster will be fully functional. The completed longrunning.Operation will contain the new cluster object in the response field. The returned operation is automatically deleted after a few hours, so there is no need to call DeleteOperation.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/redis.read-write`
- Request: `Cluster`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The resource name of the cluster location using the form: `projects/{project_id}/locations/{location_id}` where `location_id` refers to a Google Cloud region. |
| `clusterId` | query | string | yes | Required. The logical name of the Redis cluster in the customer project with the following restrictions: \* Must contain only lowercase letters, numbers, and hyphens. \* Must start with a letter. \* Must be between 1-63 characters. \* Must end with a number or a letter. \* Must be unique within the customer project / location |
| `requestId` | query | string | no | Optional. Idempotent request UUID. |

### `redis.projects.locations.clusters.delete`

- Versions: v1, v1beta1
- `DELETE https://redis.googleapis.com/v1/{+name}`
- Deletes a specific Redis cluster. Cluster stops serving and data is deleted.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/redis.read-write`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Redis cluster resource name using the form: `projects/{project_id}/locations/{location_id}/clusters/{cluster_id}` where `location_id` refers to a Google Cloud region. |
| `requestId` | query | string | no | Optional. Idempotent request UUID. |

### `redis.projects.locations.clusters.get`

- Versions: v1, v1beta1
- `GET https://redis.googleapis.com/v1/{+name}`
- Gets the details of a specific Redis cluster.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/redis.read-write`
- Request: —; Response: `Cluster`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Redis cluster resource name using the form: `projects/{project_id}/locations/{location_id}/clusters/{cluster_id}` where `location_id` refers to a Google Cloud region. |

### `redis.projects.locations.clusters.getCertificateAuthority`

- Versions: v1, v1beta1
- `GET https://redis.googleapis.com/v1/{+name}`
- Gets the details of certificate authority information for Redis cluster.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/redis.read-write`
- Request: —; Response: `CertificateAuthority`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Redis cluster certificate authority resource name using the form: `projects/{project_id}/locations/{location_id}/clusters/{cluster_id}/certificateAuthority` where `location_id` refers to a Google Cloud region. |

### `redis.projects.locations.clusters.list`

- Versions: v1, v1beta1
- `GET https://redis.googleapis.com/v1/{+parent}/clusters`
- Lists all Redis clusters owned by a project in either the specified location (region) or all locations. The location should have the following format: \* `projects/{project_id}/locations/{location_id}` If `location_id` is specified as `-` (wildcard), then all regions available to the project are queried, and the results are aggregated.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/redis.read-write`
- Request: —; Response: `ListClustersResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The resource name of the cluster location using the form: `projects/{project_id}/locations/{location_id}` where `location_id` refers to a Google Cloud region. |
| `pageSize` | query | integer (int32) | no | The maximum number of items to return. If not specified, a default value of 1000 will be used by the service. Regardless of the page_size value, the response may include a partial list and a caller should only rely on response's `next_page_token` to determine if there are more clusters left to be queried. |
| `pageToken` | query | string | no | The `next_page_token` value returned from a previous `ListClusters` request, if any. |

### `redis.projects.locations.clusters.patch`

- Versions: v1, v1beta1
- `PATCH https://redis.googleapis.com/v1/{+name}`
- Updates the metadata and configuration of a specific Redis cluster. Completed longrunning.Operation will contain the new cluster object in the response field. The returned operation is automatically deleted after a few hours, so there is no need to call DeleteOperation.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/redis.read-write`
- Request: `Cluster`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Identifier. Unique name of the resource in this scope including project and location using the form: `projects/{project_id}/locations/{location_id}/clusters/{cluster_id}` |
| `requestId` | query | string | no | Optional. Idempotent request UUID. |
| `updateMask` | query | string (google-fieldmask) | yes | Required. Mask of fields to update. At least one path must be supplied in this field. The elements of the repeated paths field may only include these fields from Cluster: \* `size_gb` \* `replica_count` \* `cluster_endpoints` |

### `redis.projects.locations.clusters.rescheduleClusterMaintenance`

- Versions: v1, v1beta1
- `POST https://redis.googleapis.com/v1/{+name}:rescheduleClusterMaintenance`
- Reschedules upcoming maintenance event.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/redis.read-write`
- Request: `RescheduleClusterMaintenanceRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Redis Cluster instance resource name using the form: `projects/{project_id}/locations/{location_id}/clusters/{cluster_id}` where `location_id` refers to a Google Cloud region. |

### `redis.projects.locations.clusters.tokenAuthUsers.addAuthToken`

- Versions: v1, v1beta1
- `POST https://redis.googleapis.com/v1/{+tokenAuthUser}:addAuthToken`
- Adds a auth token for a user of a token based auth enabled cluster.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/redis.read-write`
- Request: `AddAuthTokenRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `tokenAuthUser` | path | string | yes | Required. The name of the token auth user resource that this auth token will be added for. Format: projects/{project}/locations/{location}/clusters/{cluster}/tokenAuthUsers/{token_auth_user} |

### `redis.projects.locations.clusters.tokenAuthUsers.authTokens.delete`

- Versions: v1, v1beta1
- `DELETE https://redis.googleapis.com/v1/{+name}`
- Removes a auth token for a user of a token based auth enabled instance.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/redis.read-write`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the token auth user resource that this auth token will be deleted from. Format: projects/{project}/locations/{location}/clusters/{cluster}/tokenAuthUsers/{token_auth_user}/authTokens/{auth_token} |

### `redis.projects.locations.clusters.tokenAuthUsers.authTokens.get`

- Versions: v1, v1beta1
- `GET https://redis.googleapis.com/v1/{+name}`
- Gets a specific auth token for a specific token auth user.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/redis.read-write`
- Request: —; Response: `AuthToken`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of auth token for a token based auth enabled cluster. Format: projects/{project}/locations/{location}/clusters/{cluster}/tokenAuthUsers/{token_auth_user}/authTokens/{auth_token} |

### `redis.projects.locations.clusters.tokenAuthUsers.authTokens.list`

- Versions: v1, v1beta1
- `GET https://redis.googleapis.com/v1/{+parent}/authTokens`
- Lists all the auth tokens for a specific token auth user.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/redis.read-write`
- Request: —; Response: `ListAuthTokensResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource that this auth token will be listed for. Format: projects/{project}/locations/{location}/clusters/{cluster}/tokenAuthUsers/{token_auth_user} |
| `filter` | query | string | no | Optional. Expression for filtering results. |
| `orderBy` | query | string | no | Optional. Sort results by a defined order. |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of items to return. The maximum value is 1000; values above 1000 will be coerced to 1000. If not specified, a default value of 1000 will be used by the service. Regardless of the page_size value, the response may include a partial list and a caller should only rely on response's `next_page_token` to determine if there are more clusters left to be queried. |
| `pageToken` | query | string | no | Optional. The `next_page_token` value returned from a previous \[ListTokenAuthUsers\] request, if any. |

### `redis.projects.locations.clusters.tokenAuthUsers.delete`

- Versions: v1, v1beta1
- `DELETE https://redis.googleapis.com/v1/{+name}`
- Deletes a token auth user for a token based auth enabled cluster.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/redis.read-write`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the token auth user to delete. Format: projects/{project}/locations/{location}/clusters/{cluster}/tokenAuthUsers/{token_auth_user} |
| `force` | query | boolean | no | Optional. If set to true, any child auth tokens of this user will also be deleted. Otherwise, the request will only work if the user has no auth tokens. |
| `requestId` | query | string | no | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes after the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |

### `redis.projects.locations.clusters.tokenAuthUsers.get`

- Versions: v1, v1beta1
- `GET https://redis.googleapis.com/v1/{+name}`
- Gets a specific token auth user for a basic auth enabled cluster.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/redis.read-write`
- Request: —; Response: `TokenAuthUser`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of token auth user for a token based auth enabled cluster. Format: projects/{project}/locations/{location}/clusters/{cluster}/tokenAuthUsers/{token_auth_user} |

### `redis.projects.locations.clusters.tokenAuthUsers.list`

- Versions: v1, v1beta1
- `GET https://redis.googleapis.com/v1/{+parent}/tokenAuthUsers`
- Lists all the token auth users for a token based auth enabled cluster.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/redis.read-write`
- Request: —; Response: `ListTokenAuthUsersResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource that this token based auth user will be listed for. Format: projects/{project}/locations/{location}/clusters/{cluster} |
| `filter` | query | string | no | Optional. Expression for filtering results. |
| `orderBy` | query | string | no | Optional. Sort results by a defined order. |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of items to return. If not specified, a default value of 1000 will be used by the service. Regardless of the page_size value, the response may include a partial list and a caller should only rely on response's The maximum value is 1000; values above 1000 will be coerced to 1000. `next_page_token` to determine if there are more clusters left to be queried. |
| `pageToken` | query | string | no | Optional. The `next_page_token` value returned from a previous \[ListTokenAuthUsers\] request, if any. |

### `redis.projects.locations.get`

- Versions: v1, v1beta1
- `GET https://redis.googleapis.com/v1/{+name}`
- Gets information about a location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/redis.read-write`
- Request: —; Response: `Location`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Resource name for the location. |

### `redis.projects.locations.getSharedRegionalCertificateAuthority`

- Versions: v1, v1beta1
- `GET https://redis.googleapis.com/v1/{+name}`
- Gets the details of regional certificate authority information for Redis cluster.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/redis.read-write`
- Request: —; Response: `SharedRegionalCertificateAuthority`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Regional certificate authority resource name using the form: `projects/{project_id}/locations/{location_id}/sharedRegionalCertificateAuthority` where `location_id` refers to a Google Cloud region. |

### `redis.projects.locations.instances.create`

- Versions: v1, v1beta1
- `POST https://redis.googleapis.com/v1/{+parent}/instances`
- Creates a Redis instance based on the specified tier and memory size. By default, the instance is accessible from the project's default network (https://cloud.google.com/vpc/docs/vpc). The creation is executed asynchronously and callers may check the returned operation to track its progress. Once the operation is completed the Redis instance will be fully functional. Completed longrunning.Operation will contain the new instance object in the response field. The returned operation is automatically deleted after a few hours, so there is no need to call DeleteOperation.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/redis.read-write`
- Request: `Instance`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The resource name of the instance location using the form: `projects/{project_id}/locations/{location_id}` where `location_id` refers to a GCP region. |
| `instanceId` | query | string | yes | Required. The logical name of the Redis instance in the customer project with the following restrictions: \* Must contain only lowercase letters, numbers, and hyphens. \* Must start with a letter. \* Must be between 1-40 characters. \* Must end with a number or a letter. \* Must be unique within the customer project / location |

### `redis.projects.locations.instances.delete`

- Versions: v1, v1beta1
- `DELETE https://redis.googleapis.com/v1/{+name}`
- Deletes a specific Redis instance. Instance stops serving and data is deleted.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/redis.read-write`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Redis instance resource name using the form: `projects/{project_id}/locations/{location_id}/instances/{instance_id}` where `location_id` refers to a GCP region. |

### `redis.projects.locations.instances.export`

- Versions: v1, v1beta1
- `POST https://redis.googleapis.com/v1/{+name}:export`
- Export Redis instance data into a Redis RDB format file in Cloud Storage. Redis will continue serving during this operation. The returned operation is automatically deleted after a few hours, so there is no need to call DeleteOperation.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/redis.read-write`
- Request: `ExportInstanceRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Redis instance resource name using the form: `projects/{project_id}/locations/{location_id}/instances/{instance_id}` where `location_id` refers to a GCP region. |

### `redis.projects.locations.instances.failover`

- Versions: v1, v1beta1
- `POST https://redis.googleapis.com/v1/{+name}:failover`
- Initiates a failover of the primary node to current replica node for a specific STANDARD tier Cloud Memorystore for Redis instance.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/redis.read-write`
- Request: `FailoverInstanceRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Redis instance resource name using the form: `projects/{project_id}/locations/{location_id}/instances/{instance_id}` where `location_id` refers to a GCP region. |

### `redis.projects.locations.instances.get`

- Versions: v1, v1beta1
- `GET https://redis.googleapis.com/v1/{+name}`
- Gets the details of a specific Redis instance.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/redis.read-only`, `https://www.googleapis.com/auth/redis.read-write`
- Request: —; Response: `Instance`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Redis instance resource name using the form: `projects/{project_id}/locations/{location_id}/instances/{instance_id}` where `location_id` refers to a GCP region. |

### `redis.projects.locations.instances.getAuthString`

- Versions: v1, v1beta1
- `GET https://redis.googleapis.com/v1/{+name}/authString`
- Gets the AUTH string for a Redis instance. If AUTH is not enabled for the instance the response will be empty. This information is not included in the details returned to GetInstance.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/redis.read-only`, `https://www.googleapis.com/auth/redis.read-write`
- Request: —; Response: `InstanceAuthString`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Redis instance resource name using the form: `projects/{project_id}/locations/{location_id}/instances/{instance_id}` where `location_id` refers to a GCP region. |

### `redis.projects.locations.instances.import`

- Versions: v1, v1beta1
- `POST https://redis.googleapis.com/v1/{+name}:import`
- Import a Redis RDB snapshot file from Cloud Storage into a Redis instance. Redis may stop serving during this operation. Instance state will be IMPORTING for entire operation. When complete, the instance will contain only data from the imported file. The returned operation is automatically deleted after a few hours, so there is no need to call DeleteOperation.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/redis.read-write`
- Request: `ImportInstanceRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Redis instance resource name using the form: `projects/{project_id}/locations/{location_id}/instances/{instance_id}` where `location_id` refers to a GCP region. |

### `redis.projects.locations.instances.list`

- Versions: v1, v1beta1
- `GET https://redis.googleapis.com/v1/{+parent}/instances`
- Lists all Redis instances owned by a project in either the specified location (region) or all locations. The location should have the following format: \* `projects/{project_id}/locations/{location_id}` If `location_id` is specified as `-` (wildcard), then all regions available to the project are queried, and the results are aggregated.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/redis.read-only`, `https://www.googleapis.com/auth/redis.read-write`
- Request: —; Response: `ListInstancesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The resource name of the instance location using the form: `projects/{project_id}/locations/{location_id}` where `location_id` refers to a GCP region. |
| `pageSize` | query | integer (int32) | no | The maximum number of items to return. If not specified, a default value of 1000 will be used by the service. Regardless of the page_size value, the response may include a partial list and a caller should only rely on response's `next_page_token` to determine if there are more instances left to be queried. |
| `pageToken` | query | string | no | The `next_page_token` value returned from a previous ListInstances request, if any. |

### `redis.projects.locations.instances.patch`

- Versions: v1, v1beta1
- `PATCH https://redis.googleapis.com/v1/{+name}`
- Updates the metadata and configuration of a specific Redis instance. Completed longrunning.Operation will contain the new instance object in the response field. The returned operation is automatically deleted after a few hours, so there is no need to call DeleteOperation.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/redis.read-write`
- Request: `Instance`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Unique name of the resource in this scope including project and location using the form: `projects/{project_id}/locations/{location_id}/instances/{instance_id}` Note: Redis instances are managed and addressed at regional level so location_id here refers to a GCP region; however, users may choose which specific zone (or collection of zones for cross-zone instances) an instance should be provisioned in. Refer to location_id and alternative_location_id fields for more details. |
| `updateMask` | query | string (google-fieldmask) | yes | Required. Mask of fields to update. At least one path must be supplied in this field. The elements of the repeated paths field may only include these fields from Instance: \* `displayName` \* `labels` \* `memorySizeGb` \* `redisConfig` \* `replica_count` |

### `redis.projects.locations.instances.rescheduleMaintenance`

- Versions: v1, v1beta1
- `POST https://redis.googleapis.com/v1/{+name}:rescheduleMaintenance`
- Reschedule maintenance for a given instance in a given project and location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/redis.read-write`
- Request: `RescheduleMaintenanceRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Redis instance resource name using the form: `projects/{project_id}/locations/{location_id}/instances/{instance_id}` where `location_id` refers to a GCP region. |

### `redis.projects.locations.instances.upgrade`

- Versions: v1, v1beta1
- `POST https://redis.googleapis.com/v1/{+name}:upgrade`
- Upgrades Redis instance to the newer Redis version specified in the request.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/redis.read-write`
- Request: `UpgradeInstanceRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Redis instance resource name using the form: `projects/{project_id}/locations/{location_id}/instances/{instance_id}` where `location_id` refers to a GCP region. |

### `redis.projects.locations.list`

- Versions: v1, v1beta1
- `GET https://redis.googleapis.com/v1/{+name}/locations`
- Lists information about the supported locations for this service. This method lists locations based on the resource scope provided in the ListLocationsRequest.name field: \* \*\*Global locations\*\*: If `name` is empty, the method lists the public locations available to all projects. \* \*\*Project-specific locations\*\*: If `name` follows the format `projects/{project}`, the method lists locations visible to that specific project. This includes public, private, or other project-specific locations enabled for the project. For gRPC and client library implementations, the resource name is passed as the `name` field. For direct service calls, the resource name is incorporated into the request path based on the specific service implementation and version.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/redis.read-write`
- Request: —; Response: `ListLocationsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The resource that owns the locations collection, if applicable. |
| `extraLocationTypes` | query | repeated string | no | Optional. Do not use this field unless explicitly documented otherwise. This is primarily for internal usage. |
| `filter` | query | string | no | A filter to narrow down results to a preferred subset. The filtering language accepts strings like `"displayName=tokyo"`, and is documented in more detail in AIP-160 (https://google.aip.dev/160). |
| `pageSize` | query | integer (int32) | no | The maximum number of results to return. If not set, the service selects a default. |
| `pageToken` | query | string | no | A page token received from the `next_page_token` field in the response. Send that page token to receive the subsequent page. |

### `redis.projects.locations.operations.cancel`

- Versions: v1, v1beta1
- `POST https://redis.googleapis.com/v1/{+name}:cancel`
- Starts asynchronous cancellation on a long-running operation. The server makes a best effort to cancel the operation, but success is not guaranteed. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. Clients can use Operations.GetOperation or other methods to check whether the cancellation succeeded or whether the operation completed despite cancellation. On successful cancellation, the operation is not deleted; instead, it becomes an operation with an Operation.error value with a google.rpc.Status.code of `1`, corresponding to `Code.CANCELLED`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/redis.read-write`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource to be cancelled. |

### `redis.projects.locations.operations.delete`

- Versions: v1, v1beta1
- `DELETE https://redis.googleapis.com/v1/{+name}`
- Deletes a long-running operation. This method indicates that the client is no longer interested in the operation result. It does not cancel the operation. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/redis.read-write`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource to be deleted. |

### `redis.projects.locations.operations.get`

- Versions: v1, v1beta1
- `GET https://redis.googleapis.com/v1/{+name}`
- Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/redis.read-write`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource. |

### `redis.projects.locations.operations.list`

- Versions: v1, v1beta1
- `GET https://redis.googleapis.com/v1/{+name}/operations`
- Lists operations that match the specified filter in the request. If the server doesn't support this method, it returns `UNIMPLEMENTED`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/redis.read-write`
- Request: —; Response: `ListOperationsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation's parent resource. |
| `filter` | query | string | no | The standard list filter. |
| `pageSize` | query | integer (int32) | no | The standard list page size. |
| `pageToken` | query | string | no | The standard list page token. |
| `returnPartialSuccess` | query | boolean | no | When set to `true`, operations that are reachable are returned as normal, and those that are unreachable are returned in the ListOperationsResponse.unreachable field. This can only be `true` when reading across collections. For example, when `parent` is set to `"projects/example/locations/-"`. This field is not supported by default and will result in an `UNIMPLEMENTED` error if set unless explicitly documented otherwise in service or product specific documentation. |

### Example request skeleton

Generated from the Discovery entry of `redis.projects.locations.aclPolicies.get` (not in the official docs); replace the `{...}` path variables (URL-encode query values):

```bash
curl -X GET \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  "https://redis.googleapis.com/v1/{+name}"
```

## Notes

- Generated from the Discovery document(s) v1, v1beta1 of `redis` (retrieved 2026-11-14). Resources on this page: projects.
- The Required column is `yes` for path variables and required parameters, and `conditional` when the description says "Required if ..." (mutually exclusive alternatives), when a `parent.child` parameter is required only inside an optional parent message or one branch of a oneof. Path variables are `yes` unless a note below names an alternative route without them.
- Message schemas (the request and response types named above) are listed under `references/rest-schemas/redis/`; they are the `schemas` section of the Discovery documents in Source.
- Regional endpoints: the Discovery document (`redis` v1, revision 20261016) also lists 47 endpoints of the form `https://redis.LOCATION.rep.googleapis.com/` (Regional Endpoint), for LOCATION in `africa-south1`, `asia-east1`, `asia-east2`, `asia-northeast1`, `asia-northeast2`, `asia-northeast3`, `asia-south1`, `asia-south2`, `asia-southeast1`, `asia-southeast2`, `asia-southeast3`, `australia-southeast1`, `australia-southeast2`, `europe-central2`, `europe-north1`, `europe-north2`, `europe-southwest1`, `europe-west1`, `europe-west10`, `europe-west12`, `europe-west15`, `europe-west2`, `europe-west3`, `europe-west4`, `europe-west6`, `europe-west8`, `europe-west9`, `me-central1`, `me-central2`, `me-west1`, `northamerica-northeast1`, `northamerica-northeast2`, `northamerica-south1`, `southamerica-east1`, `southamerica-west1`, `us-central1`, `us-central2`, `us-east1`, `us-east4`, `us-east5`, `us-east7`, `us-south1`, `us-west1`, `us-west2`, `us-west3`, `us-west4`, `us-west8`. The method URLs above use the global host `https://redis.googleapis.com/`; to send a request through one of these endpoints, replace the host with the endpoint for the resource's location (for example `https://redis.africa-south1.rep.googleapis.com/`) and keep the path.
- Source: https://redis.googleapis.com/$discovery/rest?version=v1, https://redis.googleapis.com/$discovery/rest?version=v1beta1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
