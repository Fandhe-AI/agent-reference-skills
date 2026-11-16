---
source: https://bigtableadmin.googleapis.com/$discovery/rest?version=v2
---

# Cloud Bigtable Admin API message schemas (bigtableadmin)

## Signature / Usage

Message types referenced by the methods listed under `references/rest/bigtableadmin/`.

### `AppProfile`

- A configuration object describing how Cloud Bigtable should treat traffic from a particular end user application.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `dataBoostIsolationReadOnly` | DataBoostIsolationReadOnly | Specifies that this app profile is intended for read-only usage via the Data Boost feature. |
| `description` | string | Long form description of the use case for this AppProfile. |
| `etag` | string | Strongly validated etag for optimistic concurrency control. Preserve the value returned from `GetAppProfile` when calling `UpdateAppProfile` to fail the request if there has been a modification in the meantime. The `update_mask` of the request need not include `etag` for this protection to apply. See Wikipedia (https://en.wikipedia.org/wiki/HTTP_ETag) and RFC 7232 (https://tools.ietf.org/html/rfc7232#section-2.3) for more details. |
| `multiClusterRoutingUseAny` | MultiClusterRoutingUseAny | Use a multi-cluster routing policy. |
| `name` | string | The unique name of the app profile, up to 50 characters long. Values are of the form `projects/{project}/instances/{instance}/appProfiles/_a-zA-Z0-9*`. |
| `priority` | string enum | This field has been deprecated in favor of `standard_isolation.priority`. If you set this field, `standard_isolation.priority` will be set instead. The priority of requests sent using this app profile. Values: `PRIORITY_UNSPECIFIED`, `PRIORITY_LOW`, `PRIORITY_MEDIUM`, `PRIORITY_HIGH`. |
| `singleClusterRouting` | SingleClusterRouting | Use a single-cluster routing policy. |
| `standardIsolation` | StandardIsolation | The standard options used for isolating this app profile's traffic from other use cases. |

### `AuditConfig`

- Specifies the audit configuration for a service. The configuration determines which permission types are logged, and what identities, if any, are exempted from logging. An AuditConfig must have one or more AuditLogConfigs. If there are AuditConfigs for both `allServices` and a specific service, the union of the two AuditConfigs is used for that service: the log_types specified in each AuditConfig are enabled, and the exempted_members in each AuditLogConfig are exempted. Example Policy with multiple AuditConfigs: { "audit_configs": \[ { "service": "allServices", "audit_log_configs": \[ { "log_type": "DATA_READ", "exempted_members": \[ "user:jose@example.com" \] }, { "log_type": "DATA_WRITE" }, { "log_type": "ADMIN_READ" } \] }, { "service": "sampleservice.googleapis.com", "audit_log_configs": \[ { "log_type": "DATA_READ" }, { "log_type": "DATA_WRITE", "exempted_members": \[ "user:aliya@example.com" \] } \] } \] } For sampleservice, this policy enables DATA_READ, DATA_WRITE and ADMIN_READ logging. It also exempts `jose@example.com` from DATA_READ logging, and `aliya@example.com` from DATA_WRITE logging.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `auditLogConfigs` | array<AuditLogConfig> | The configuration for logging of each type of permission. |
| `service` | string | Specifies a service that will be enabled for audit logging. For example, `storage.googleapis.com`, `cloudsql.googleapis.com`. `allServices` is a special value that covers all services. |

### `AuditLogConfig`

- Provides the configuration for logging a type of permissions. Example: { "audit_log_configs": \[ { "log_type": "DATA_READ", "exempted_members": \[ "user:jose@example.com" \] }, { "log_type": "DATA_WRITE" } \] } This enables 'DATA_READ' and 'DATA_WRITE' logging, while exempting jose@example.com from DATA_READ logging.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `exemptedMembers` | array<string> | Specifies the identities that do not cause logging for this type of permission. Follows the same format of Binding.members. |
| `logType` | string enum | The log type that this config enables. Values: `LOG_TYPE_UNSPECIFIED`, `ADMIN_READ`, `DATA_WRITE`, `DATA_READ`. |

### `AuthorizedView`

- An Authorized View of a Cloud Bigtable Table.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `deletionProtection` | boolean | Set to true to make the AuthorizedView protected against deletion. The parent Table and containing Instance cannot be deleted if an AuthorizedView has this bit set. |
| `etag` | string | The etag for this AuthorizedView. If this is provided on update, it must match the server's etag. The server returns ABORTED error on a mismatched etag. |
| `name` | string | Identifier. The name of this AuthorizedView. Values are of the form `projects/{project}/instances/{instance}/tables/{table}/authorizedViews/{authorized_view}` |
| `subsetView` | GoogleBigtableAdminV2AuthorizedViewSubsetView | An AuthorizedView permitting access to an explicit subset of a Table. |

### `AutomatedBackupPolicy`

- Defines an automated backup policy for a table
- Version: v2

| Field | Type | Description |
|---|---|---|
| `disabled` | boolean | Optional. If `true`, automated backups are explicitly disabled on this table. This allows users to opt out of default enablement. |
| `frequency` | string (google-duration) | How frequently automated backups should occur. The only supported value at this time is 24 hours. An undefined frequency is treated as 24 hours. |
| `keepHotDuration` | string (google-duration) | Optional. The amount of time that the automated backups remain hot. If specified, the backups created by this policy are `HOT` backups. If not specified, the backups are `STANDARD` backups. The value must be at least 24 hours and at most 10 days, and can't exceed the policy's `retention_period`. Only SSD instances support `HOT` automated backups. |
| `locations` | array<string> | Optional. A list of Cloud Bigtable zones where automated backups are allowed to be created. If empty, automated backups will be created in all zones of the instance. Locations are in the format `projects/{project}/locations/{zone}`. You can set this field only for tables in Enterprise Plus instances. |
| `retentionPeriod` | string (google-duration) | Required. How long the automated backups should be retained. Values must be at least 3 days and at most 90 days. |

### `AutoscalingLimits`

- Limits for the number of nodes a Cluster can autoscale up/down to.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `maxServeNodes` | integer (int32) | Required. Maximum number of nodes to scale up to. |
| `minServeNodes` | integer (int32) | Required. Minimum number of nodes to scale down to. |

### `AutoscalingTargets`

- The Autoscaling targets for a Cluster. These determine the recommended nodes.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `cpuUtilizationPercent` | integer (int32) | The cpu utilization that the Autoscaler should be trying to achieve. This number is on a scale from 0 (no utilization) to 100 (total utilization), and is limited between 10 and 80, otherwise it will return INVALID_ARGUMENT error. |
| `storageUtilizationGibPerNode` | integer (int32) | The storage utilization that the Autoscaler should be trying to achieve. This number is limited between 2560 (2.5TiB) and 5120 (5TiB) for a SSD cluster and between 8192 (8TiB) and 16384 (16TiB) for an HDD cluster, otherwise it will return INVALID_ARGUMENT error. If this value is set to 0, it will be treated as if it were set to the default value: 2560 for SSD, 8192 for HDD. |

### `AvroSchema`

- Represents a collection of Avro schemas.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `jsonSchemas` | array<string> | Required. The Avro schemas in JSON format. Each element must be the content of a valid, self-contained Avro schema file (.avsc), as described in https://avro.apache.org/docs/1.8.1/spec.html. Use repeated elements to include multiple Avro schema files in a single bundle. |

### `Backup`

- A backup of a Cloud Bigtable table.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `backupType` | string enum | Indicates the backup type of the backup. Values: `BACKUP_TYPE_UNSPECIFIED`, `STANDARD`, `HOT`. |
| `encryptionInfo` | EncryptionInfo | Output only. The encryption information for the backup. |
| `endTime` | string (google-datetime) | Output only. `end_time` is the time that the backup was finished. The row data in the backup will be no newer than this timestamp. |
| `expireTime` | string (google-datetime) | Required. The expiration time of the backup. When creating a backup or updating its `expire_time`, the value must be greater than the backup creation time by: - At least 6 hours - At most 90 days Once the `expire_time` has passed, Cloud Bigtable will delete the backup. |
| `hotToStandardTime` | string (google-datetime) | The time at which the hot backup will be converted to a standard backup. Once the `hot_to_standard_time` has passed, Cloud Bigtable will convert the hot backup to a standard backup. This value must be greater than the backup creation time by: - At least 24 hours This field only applies for hot backups. When creating or updating a standard backup, attempting to set this field will fail the request. |
| `name` | string | A globally unique identifier for the backup which cannot be changed. Values are of the form `projects/{project}/instances/{instance}/clusters/{cluster}/ backups/_a-zA-Z0-9*` The final segment of the name must be between 1 and 50 characters in length. The backup is stored in the cluster identified by the prefix of the backup name of the form `projects/{project}/instances/{instance}/clusters/{cluster}`. |
| `sizeBytes` | string (int64) | Output only. Size of the backup in bytes. |
| `sourceBackup` | string | Output only. Name of the backup from which this backup was copied. If a backup is not created by copying a backup, this field will be empty. Values are of the form: projects//instances//clusters//backups/ |
| `sourceTable` | string | Required. Immutable. Name of the table from which this backup was created. This needs to be in the same instance as the backup. Values are of the form `projects/{project}/instances/{instance}/tables/{source_table}`. |
| `startTime` | string (google-datetime) | Output only. `start_time` is the time that the backup was started (i.e. approximately the time the CreateBackup request is received). The row data in this backup will be no older than this timestamp. |
| `state` | string enum | Output only. The current state of the backup. Values: `STATE_UNSPECIFIED`, `CREATING`, `READY`. |

### `BackupInfo`

- Information about a backup.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `backup` | string | Output only. Name of the backup. |
| `endTime` | string (google-datetime) | Output only. This time that the backup was finished. Row data in the backup will be no newer than this timestamp. |
| `sourceBackup` | string | Output only. Name of the backup from which this backup was copied. If a backup is not created by copying a backup, this field will be empty. Values are of the form: projects//instances//clusters//backups/ |
| `sourceTable` | string | Output only. Name of the table the backup was created from. |
| `startTime` | string (google-datetime) | Output only. The time that the backup was started. Row data in the backup will be no older than this timestamp. |

### `Binding`

- Associates `members`, or principals, with a `role`.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `condition` | Expr | The condition that is associated with this binding. If the condition evaluates to `true`, then this binding applies to the current request. If the condition evaluates to `false`, then this binding does not apply to the current request. However, a different role binding might grant the same role to one or more of the principals in this binding. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |
| `members` | array<string> | Specifies the principals requesting access for a Google Cloud resource. `members` can have the following values: \* `allUsers`: A special identifier that represents anyone who is on the internet; with or without a Google account. \* `allAuthenticatedUsers`: A special identifier that represents anyone who is authenticated with a Google account or a service account. Does not include identities that come from external identity providers (IdPs) through identity federation. \* `user:{emailid}`: An email address that represents a specific Google account. For example, `alice@example.com` . \* `serviceAccount:{emailid}`: An email address that represents a Google service account. For example, `my-other-app@appspot.gserviceaccount.com`. \* `serviceAccount:{projectid}.svc.id.goog[{namespace}/{kubernetes-sa}]`: An identifier for a Kubernetes service account (https://cloud.google.com/kubernetes-engine/docs/how-to/kubernetes-service-accounts). For example, `my-project.svc.id.goog[my-namespace/my-kubernetes-sa]`. \* `group:{emailid}`: An email address that represents a Google group. For example, `admins@example.com`. \* `domain:{domain}`: The G Suite domain (primary) that represents all the users of that domain. For example, `google.com` or `example.com`. \* `principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workforce identity pool. \* `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/group/{group_id}`: All workforce identities in a group. \* `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All workforce identities with a specific attribute value. \* `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/*`: All identities in a workforce identity pool. \* `principal://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workload identity pool. \* `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/group/{group_id}`: A workload identity pool group. \* `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All identities in a workload identity pool with a certain attribute. \* `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/*`: All identities in a workload identity pool. \* `deleted:user:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a user that has been recently deleted. For example, `alice@example.com?uid=123456789012345678901`. If the user is recovered, this value reverts to `user:{emailid}` and the recovered user retains the role in the binding. \* `deleted:serviceAccount:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a service account that has been recently deleted. For example, `my-other-app@appspot.gserviceaccount.com?uid=123456789012345678901`. If the service account is undeleted, this value reverts to `serviceAccount:{emailid}` and the undeleted service account retains the role in the binding. \* `deleted:group:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a Google group that has been recently deleted. For example, `admins@example.com?uid=123456789012345678901`. If the group is recovered, this value reverts to `group:{emailid}` and the recovered group retains the role in the binding. \* `deleted:principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: Deleted single identity in a workforce identity pool. For example, `deleted:principal://iam.googleapis.com/locations/global/workforcePools/my-pool-id/subject/my-subject-attribute-value`. |
| `role` | string | Role that is assigned to the list of `members`, or principals. For example, `roles/viewer`, `roles/editor`, or `roles/owner`. For an overview of the IAM roles and permissions, see the IAM documentation (https://cloud.google.com/iam/docs/roles-overview). For a list of the available pre-defined roles, see here (https://cloud.google.com/iam/docs/understanding-roles). |

### `ChangeStreamConfig`

- Change stream configuration.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `retentionPeriod` | string (google-duration) | How long the change stream should be retained. Change stream data older than the retention period will not be returned when reading the change stream from the table. Values must be at least 1 day and at most 7 days, and will be truncated to microsecond granularity. |

### `CheckConsistencyRequest`

- Request message for google.bigtable.admin.v2.BigtableTableAdmin.CheckConsistency
- Version: v2

| Field | Type | Description |
|---|---|---|
| `consistencyToken` | string | Required. The token created using GenerateConsistencyToken for the Table. |
| `dataBoostReadLocalWrites` | DataBoostReadLocalWrites | Checks that reads using an app profile with `DataBoostIsolationReadOnly` can see all writes committed before the token was created, but only if the read and write target the same cluster. |
| `standardReadRemoteWrites` | StandardReadRemoteWrites | Checks that reads using an app profile with `StandardIsolation` can see all writes committed before the token was created, even if the read and write target different clusters. |

### `CheckConsistencyResponse`

- Response message for google.bigtable.admin.v2.BigtableTableAdmin.CheckConsistency
- Version: v2

| Field | Type | Description |
|---|---|---|
| `consistent` | boolean | True only if the token is consistent. A token is consistent if replication has caught up with the restrictions specified in the request. |

### `Cluster`

- A resizable group of nodes in a particular cloud location, capable of serving all Tables in the parent Instance.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `clusterConfig` | ClusterConfig | Configuration for this cluster. |
| `defaultStorageType` | string enum | Immutable. The type of storage used by this cluster to serve its parent instance's tables, unless explicitly overridden. Values: `STORAGE_TYPE_UNSPECIFIED`, `SSD`, `HDD`. |
| `encryptionConfig` | EncryptionConfig | Immutable. The encryption configuration for CMEK-protected clusters. |
| `location` | string | Immutable. The location where this cluster's nodes and storage reside. For best performance, clients should be located as close as possible to this cluster. Currently only zones are supported, so values should be of the form `projects/{project}/locations/{zone}`. |
| `name` | string | The unique name of the cluster. Values are of the form `projects/{project}/instances/{instance}/clusters/a-z*`. |
| `nodeScalingFactor` | string enum | Immutable. The node scaling factor of this cluster. Values: `NODE_SCALING_FACTOR_UNSPECIFIED`, `NODE_SCALING_FACTOR_1X`, `NODE_SCALING_FACTOR_2X`. |
| `serveNodes` | integer (int32) | The number of nodes in the cluster. If no value is set, Cloud Bigtable automatically allocates nodes based on your data footprint and optimized for 50% storage utilization. |
| `state` | string enum | Output only. The current state of the cluster. Values: `STATE_NOT_KNOWN`, `READY`, `CREATING`, `RESIZING`, `DISABLED`. |

### `ClusterAutoscalingConfig`

- Autoscaling config for a cluster.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `autoscalingLimits` | AutoscalingLimits | Required. Autoscaling limits for this cluster. |
| `autoscalingTargets` | AutoscalingTargets | Required. Autoscaling targets for this cluster. |

### `ClusterConfig`

- Configuration for a cluster.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `clusterAutoscalingConfig` | ClusterAutoscalingConfig | Autoscaling configuration for this cluster. |

### `ClusterState`

- The state of a table's data in a particular cluster.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `encryptionInfo` | array<EncryptionInfo> | Output only. The encryption information for the table in this cluster. If the encryption key protecting this resource is customer managed, then its version can be rotated in Cloud Key Management Service (Cloud KMS). The primary version of the key and its status will be reflected here when changes propagate from Cloud KMS. |
| `replicationState` | string enum | Output only. The state of replication for the table in this cluster. Values: `STATE_NOT_KNOWN`, `INITIALIZING`, `PLANNED_MAINTENANCE`, `UNPLANNED_MAINTENANCE`, `READY`, `READY_OPTIMIZING`. |

### `ColumnFamily`

- A set of columns within a table which share a common configuration.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `gcRule` | GcRule | Garbage collection rule specified as a protobuf. Must serialize to at most 500 bytes. NOTE: Garbage collection executes opportunistically in the background, and so it's possible for reads to return a cell even if it matches the active GC expression for its family. |
| `stats` | ColumnFamilyStats | Output only. Only available with STATS_VIEW, this includes summary statistics about column family contents. For statistics over an entire table, see TableStats above. |
| `valueType` | Type | The type of data stored in each of this family's cell values, including its full encoding. If omitted, the family only serves raw untyped bytes. For now, only the `Aggregate` type is supported. `Aggregate` can only be set at family creation and is immutable afterwards. This field is mutually exclusive with `sql_type`. If `value_type` is `Aggregate`, written data must be compatible with: \* `value_type.input_type` for `AddInput` mutations |

### `ColumnFamilyStats`

- Approximate statistics related to a single column family within a table. This information may change rapidly, interpreting these values at a point in time may already preset out-of-date information. Everything below is approximate, unless otherwise specified.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `averageCellsPerColumn` | number (double) | How many cells are present per column qualifier in this column family, averaged over all rows containing any column in the column family. e.g. For column family "family" in a table with 3 rows: \* A row with 3 cells in "family:col" and 1 cell in "other:col" (3 cells / 1 column in "family") \* A row with 1 cell in "family:col", 7 cells in "family:other_col", and 7 cells in "other:data" (8 cells / 2 columns in "family") \* A row with 3 cells in "other:col" (0 columns in "family", "family" not present) would report (3 + 8 + 0)/(1 + 2 + 0) = 3.66 in this field. |
| `averageColumnsPerRow` | number (double) | How many column qualifiers are present in this column family, averaged over all rows in the table. e.g. For column family "family" in a table with 3 rows: \* A row with cells in "family:col" and "other:col" (1 column in "family") \* A row with cells in "family:col", "family:other_col", and "other:data" (2 columns in "family") \* A row with cells in "other:col" (0 columns in "family", "family" not present) would report (1 + 2 + 0)/3 = 1.5 in this field. |
| `logicalDataBytes` | string (int64) | How much space the data in the column family occupies. This is roughly how many bytes would be needed to read the contents of the entire column family (e.g. by streaming all contents out). |
| `logicalDataHddBytes` | string (int64) | Output only. The logical data bytes of the column family stored on HDD. |
| `logicalDataSsdBytes` | string (int64) | Output only. The logical data bytes of the column family stored on SSD. |

### `CopyBackupMetadata`

- Metadata type for the google.longrunning.Operation returned by CopyBackup.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `name` | string | The name of the backup being created through the copy operation. Values are of the form `projects//instances//clusters//backups/`. |
| `progress` | OperationProgress | The progress of the CopyBackup operation. |
| `sourceBackupInfo` | BackupInfo | Information about the source backup that is being copied from. |

### `CopyBackupRequest`

- The request for CopyBackup.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `backupId` | string | Required. The id of the new backup. The `backup_id` along with `parent` are combined as {parent}/backups/{backup_id} to create the full backup name, of the form: `projects/{project}/instances/{instance}/clusters/{cluster}/backups/{backup_id}`. This string must be between 1 and 50 characters in length and match the regex \_a-zA-Z0-9\*. |
| `expireTime` | string (google-datetime) | Required. Required. The expiration time of the copied backup with microsecond granularity that must be at least 6 hours and at most 30 days from the time the request is received. Once the `expire_time` has passed, Cloud Bigtable will delete the backup and free the resources used by the backup. |
| `sourceBackup` | string | Required. The source backup to be copied from. The source backup needs to be in READY state for it to be copied. Copying a copied backup is not allowed. Once CopyBackup is in progress, the source backup cannot be deleted or cleaned up on expiration until CopyBackup is finished. Values are of the form: `projects//instances//clusters//backups/`. |

### `CreateAuthorizedViewMetadata`

- The metadata for the Operation returned by CreateAuthorizedView.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `finishTime` | string (google-datetime) | The time at which the operation failed or was completed successfully. |
| `originalRequest` | CreateAuthorizedViewRequest | The request that prompted the initiation of this CreateAuthorizedView operation. |
| `requestTime` | string (google-datetime) | The time at which the original request was received. |

### `CreateAuthorizedViewRequest`

- The request for CreateAuthorizedView
- Version: v2

| Field | Type | Description |
|---|---|---|
| `authorizedView` | AuthorizedView | Required. The AuthorizedView to create. |
| `authorizedViewId` | string | Required. The id of the AuthorizedView to create. This AuthorizedView must not already exist. The `authorized_view_id` appended to `parent` forms the full AuthorizedView name of the form `projects/{project}/instances/{instance}/tables/{table}/authorizedView/{authorized_view}`. |
| `parent` | string | Required. This is the name of the table the AuthorizedView belongs to. Values are of the form `projects/{project}/instances/{instance}/tables/{table}`. |

### `CreateBackupMetadata`

- Metadata type for the operation returned by CreateBackup.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `endTime` | string (google-datetime) | If set, the time at which this operation finished or was cancelled. DEPRECATED: Use finish_time instead. |
| `finishTime` | string (google-datetime) | The time at which the operation failed or was completed successfully. |
| `name` | string | The name of the backup being created. |
| `requestTime` | string (google-datetime) | The time at which the original request was received. |
| `sourceTable` | string | The name of the table the backup is created from. |
| `startTime` | string (google-datetime) | The time at which this operation started. DEPRECATED: Use request_time instead. |

### `CreateClusterMetadata`

- The metadata for the Operation returned by CreateCluster.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `finishTime` | string (google-datetime) | The time at which the operation failed or was completed successfully. |
| `originalRequest` | CreateClusterRequest | The request that prompted the initiation of this CreateCluster operation. |
| `requestTime` | string (google-datetime) | The time at which the original request was received. |
| `tables` | object | Keys: the full `name` of each table that existed in the instance when CreateCluster was first called, i.e. `projects//instances//tables/`. Any table added to the instance by a later API call will be created in the new cluster by that API call, not this one. Values: information on how much of a table's data has been copied to the newly-created cluster so far. |

### `CreateClusterRequest`

- Request message for BigtableInstanceAdmin.CreateCluster.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `cluster` | Cluster | Required. The cluster to be created. Fields marked `OutputOnly` must be left blank. |
| `clusterId` | string | Required. The ID to be used when referring to the new cluster within its instance, e.g., just `mycluster` rather than `projects/myproject/instances/myinstance/clusters/mycluster`. |
| `parent` | string | Required. The unique name of the instance in which to create the new cluster. Values are of the form `projects/{project}/instances/{instance}`. |

### `CreateInstanceMetadata`

- The metadata for the Operation returned by CreateInstance.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `finishTime` | string (google-datetime) | The time at which the operation failed or was completed successfully. |
| `originalRequest` | CreateInstanceRequest | The request that prompted the initiation of this CreateInstance operation. |
| `requestTime` | string (google-datetime) | The time at which the original request was received. |

### `CreateInstanceRequest`

- Request message for BigtableInstanceAdmin.CreateInstance.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `clusters` | object | Required. The clusters to be created within the instance, mapped by desired cluster ID, e.g., just `mycluster` rather than `projects/myproject/instances/myinstance/clusters/mycluster`. Fields marked `OutputOnly` must be left blank. |
| `instance` | Instance | Required. The instance to create. Fields marked `OutputOnly` must be left blank. |
| `instanceId` | string | Required. The ID to be used when referring to the new instance within its project, e.g., just `myinstance` rather than `projects/myproject/instances/myinstance`. |
| `parent` | string | Required. The unique name of the project in which to create the new instance. Values are of the form `projects/{project}`. |

### `CreateLogicalViewMetadata`

- The metadata for the Operation returned by CreateLogicalView.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `endTime` | string (google-datetime) | DEPRECATED: Use finish_time instead. |
| `finishTime` | string (google-datetime) | The time at which the operation failed or was completed successfully. |
| `originalRequest` | CreateLogicalViewRequest | The request that prompted the initiation of this CreateLogicalView operation. |
| `requestTime` | string (google-datetime) | The time at which the original request was received. |
| `startTime` | string (google-datetime) | DEPRECATED: Use request_time instead. |

### `CreateLogicalViewRequest`

- Request message for BigtableInstanceAdmin.CreateLogicalView.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `logicalView` | LogicalView | Required. The logical view to create. |
| `logicalViewId` | string | Required. The ID to use for the logical view, which will become the final component of the logical view's resource name. |
| `parent` | string | Required. The parent instance where this logical view will be created. Format: `projects/{project}/instances/{instance}`. |

### `CreateMaterializedViewMetadata`

- The metadata for the Operation returned by CreateMaterializedView.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `endTime` | string (google-datetime) | If set, the time at which this operation finished or was canceled. DEPRECATED: Use finish_time instead. |
| `finishTime` | string (google-datetime) | The time at which the operation failed or was completed successfully. |
| `originalRequest` | CreateMaterializedViewRequest | The request that prompted the initiation of this CreateMaterializedView operation. |
| `requestTime` | string (google-datetime) | The time at which the original request was received. |
| `startTime` | string (google-datetime) | The time at which this operation started. DEPRECATED: Use request_time instead. |

### `CreateMaterializedViewRequest`

- Request message for BigtableInstanceAdmin.CreateMaterializedView.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `ignoreWarnings` | boolean | Optional. If true, ignore optional safety checks when creating the materialized view. |
| `materializedView` | MaterializedView | Required. The materialized view to create. |
| `materializedViewId` | string | Required. The ID to use for the materialized view, which will become the final component of the materialized view's resource name. |
| `parent` | string | Required. The parent instance where this materialized view will be created. Format: `projects/{project}/instances/{instance}`. |

### `CreateSchemaBundleMetadata`

- The metadata for the Operation returned by CreateSchemaBundle.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `finishTime` | string (google-datetime) | The time at which the operation failed or was completed successfully. |
| `name` | string | The unique name identifying this schema bundle. Values are of the form `projects/{project}/instances/{instance}/tables/{table}/schemaBundles/{schema_bundle}` |
| `requestTime` | string (google-datetime) | The time at which the original request was received. |

### `CreateTableRequest`

- Request message for google.bigtable.admin.v2.BigtableTableAdmin.CreateTable
- Version: v2

| Field | Type | Description |
|---|---|---|
| `initialSplits` | array<Split> | The optional list of row keys that will be used to initially split the table into several tablets (tablets are similar to HBase regions). Given two split keys, `s1` and `s2`, three tablets will be created, spanning the key ranges: `[, s1), [s1, s2), [s2, )`. Example: \* Row keys := `["a", "apple", "custom", "customer_1", "customer_2",` `"other", "zz"]` \* initial_split_keys := `["apple", "customer_1", "customer_2", "other"]` \* Key assignment: - Tablet 1 `[, apple) => {"a"}.` - Tablet 2 `[apple, customer_1) => {"apple", "custom"}.` - Tablet 3 `[customer_1, customer_2) => {"customer_1"}.` - Tablet 4 `[customer_2, other) => {"customer_2"}.` - Tablet 5 `[other, ) => {"other", "zz"}.` |
| `table` | Table | Required. The Table to create. |
| `tableId` | string | Required. The name by which the new table should be referred to within the parent instance, e.g., `foobar` rather than `{parent}/tables/foobar`. Maximum 50 characters. |

### `DataBoostIsolationReadOnly`

- Data Boost is a serverless compute capability that lets you run high-throughput read jobs and queries on your Bigtable data, without impacting the performance of the clusters that handle your application traffic. Data Boost supports read-only use cases with single-cluster routing.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `computeBillingOwner` | string enum | The Compute Billing Owner for this Data Boost App Profile. Values: `COMPUTE_BILLING_OWNER_UNSPECIFIED`, `HOST_PAYS`. |

### `DataBoostReadLocalWrites`

- Checks that all writes before the consistency token was generated in the same cluster are readable by Databoost.
- Version: v2

### `DropRowRangeRequest`

- Request message for google.bigtable.admin.v2.BigtableTableAdmin.DropRowRange
- Version: v2

| Field | Type | Description |
|---|---|---|
| `deleteAllDataFromTable` | boolean | Delete all rows in the table. Setting this to false is a no-op. |
| `rowKeyPrefix` | string (byte) | Delete all rows that start with this row key prefix. Prefix cannot be zero length. |

### `Empty`

- A generic empty message that you can re-use to avoid defining duplicated empty messages in your APIs. A typical example is to use it as the request or the response type of an API method. For instance: service Foo { rpc Bar(google.protobuf.Empty) returns (google.protobuf.Empty); }
- Version: v2

### `EncryptionConfig`

- Cloud Key Management Service (Cloud KMS) settings for a CMEK-protected cluster.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `kmsKeyName` | string | Describes the Cloud KMS encryption key that will be used to protect the destination Bigtable cluster. The requirements for this key are: 1) The Cloud Bigtable service account associated with the project that contains this cluster must be granted the `cloudkms.cryptoKeyEncrypterDecrypter` role on the CMEK key. 2) Only regional keys can be used and the region of the CMEK key must match the region of the cluster. Values are of the form `projects/{project}/locations/{location}/keyRings/{keyring}/cryptoKeys/{key}` |

### `EncryptionInfo`

- Encryption information for a given resource. If this resource is protected with customer managed encryption, the in-use Cloud Key Management Service (Cloud KMS) key version is specified along with its status.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `encryptionStatus` | Status | Output only. The status of encrypt/decrypt calls on underlying data for this resource. Regardless of status, the existing data is always encrypted at rest. |
| `encryptionType` | string enum | Output only. The type of encryption used to protect this resource. Values: `ENCRYPTION_TYPE_UNSPECIFIED`, `GOOGLE_DEFAULT_ENCRYPTION`, `CUSTOMER_MANAGED_ENCRYPTION`. |
| `kmsKeyVersion` | string | Output only. The version of the Cloud KMS key specified in the parent cluster that is in use for the data underlying this table. |

### `Expr`

- Represents a textual expression in the Common Expression Language (CEL) syntax. CEL is a C-like expression language. The syntax and semantics of CEL are documented at https://github.com/google/cel-spec. Example (Comparison): title: "Summary size limit" description: "Determines if a summary is less than 100 chars" expression: "document.summary.size() < 100" Example (Equality): title: "Requestor is owner" description: "Determines if requestor is the document owner" expression: "document.owner == request.auth.claims.email" Example (Logic): title: "Public documents" description: "Determine whether the document should be publicly visible" expression: "document.type != 'private' && document.type != 'internal'" Example (Data Manipulation): title: "Notification string" description: "Create a notification string with a timestamp." expression: "'New message received at ' + string(document.create_time)" The exact variables and functions that may be referenced within an expression are determined by the service that evaluates it. See the service documentation for additional information.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `description` | string | Optional. Description of the expression. This is a longer text which describes the expression, e.g. when hovered over it in a UI. |
| `expression` | string | Textual representation of an expression in Common Expression Language syntax. |
| `location` | string | Optional. String indicating the location of the expression for error reporting, e.g. a file name and a position in the file. |
| `title` | string | Optional. Title for the expression, i.e. a short string describing its purpose. This can be used e.g. in UIs which allow to enter the expression. |

### `GcRule`

- Rule for determining which cells to delete during garbage collection.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `intersection` | Intersection | Delete cells that would be deleted by every nested rule. |
| `maxAge` | string (google-duration) | Delete cells in a column older than the given age. Values must be at least one millisecond, and will be truncated to microsecond granularity. |
| `maxNumVersions` | integer (int32) | Delete all cells in a column except the most recent N. |
| `union` | Union | Delete cells that would be deleted by any nested rule. |

### `GenerateConsistencyTokenRequest`

- Request message for google.bigtable.admin.v2.BigtableTableAdmin.GenerateConsistencyToken
- Version: v2

### `GenerateConsistencyTokenResponse`

- Response message for google.bigtable.admin.v2.BigtableTableAdmin.GenerateConsistencyToken
- Version: v2

| Field | Type | Description |
|---|---|---|
| `consistencyToken` | string | The generated consistency token. |

### `GetIamPolicyRequest`

- Request message for `GetIamPolicy` method.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `options` | GetPolicyOptions | OPTIONAL: A `GetPolicyOptions` object for specifying options to `GetIamPolicy`. |

### `GetPolicyOptions`

- Encapsulates settings provided to GetIamPolicy.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `requestedPolicyVersion` | integer (int32) | Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |

### `GoogleBigtableAdminV2AuthorizedViewFamilySubsets`

- Subsets of a column family that are included in this AuthorizedView.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `qualifierPrefixes` | array<string> | Prefixes for qualifiers to be included in the AuthorizedView. Every qualifier starting with one of these prefixes is included in the AuthorizedView. To provide access to all qualifiers, include the empty string as a prefix (""). |
| `qualifiers` | array<string> | Individual exact column qualifiers to be included in the AuthorizedView. |

### `GoogleBigtableAdminV2AuthorizedViewSubsetView`

- Defines a simple AuthorizedView that is a subset of the underlying Table.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `familySubsets` | object | Map from column family name to the columns in this family to be included in the AuthorizedView. |
| `rowPrefixes` | array<string> | Row prefixes to be included in the AuthorizedView. To provide access to all rows, include the empty string as a prefix (""). |

### `GoogleBigtableAdminV2MaterializedViewClusterState`

- The state of a materialized view's data in a particular cluster.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `replicationState` | string enum | Output only. The state of the materialized view in this cluster. Values: `STATE_NOT_KNOWN`, `INITIALIZING`, `READY`. |

### `GoogleBigtableAdminV2MemoryLayerMemoryConfig`

- Configuration of a memory layer.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `storageSizeGib` | integer (int32) | Output only. Reporting the current size of the memory layer in GiB. |

### `GoogleBigtableAdminV2TypeAggregate`

- A value that combines incremental updates into a summarized value. Data is never directly written or read using type `Aggregate`. Writes provide either the `input_type` or `state_type`, and reads always return the `state_type` .
- Version: v2

| Field | Type | Description |
|---|---|---|
| `hllppUniqueCount` | GoogleBigtableAdminV2TypeAggregateHyperLogLogPlusPlusUniqueCount | HyperLogLogPlusPlusUniqueCount aggregator. |
| `inputType` | Type | Type of the inputs that are accumulated by this `Aggregate`. Use `AddInput` mutations to accumulate new inputs. |
| `max` | GoogleBigtableAdminV2TypeAggregateMax | Max aggregator. |
| `min` | GoogleBigtableAdminV2TypeAggregateMin | Min aggregator. |
| `stateType` | Type | Output only. Type that holds the internal accumulator state for the `Aggregate`. This is a function of the `input_type` and `aggregator` chosen. |
| `sum` | GoogleBigtableAdminV2TypeAggregateSum | Sum aggregator. |

### `GoogleBigtableAdminV2TypeAggregateHyperLogLogPlusPlusUniqueCount`

- Computes an approximate unique count over the input values. When using raw data as input, be careful to use a consistent encoding. Otherwise the same value encoded differently could count more than once, or two distinct values could count as identical. Input: Any, or omit for Raw State: TBD Special state conversions: `Int64` (the unique count estimate)
- Version: v2

### `GoogleBigtableAdminV2TypeAggregateMax`

- Computes the max of the input values. Allowed input: `Int64` State: same as input
- Version: v2

### `GoogleBigtableAdminV2TypeAggregateMin`

- Computes the min of the input values. Allowed input: `Int64` State: same as input
- Version: v2

### `GoogleBigtableAdminV2TypeAggregateSum`

- Computes the sum of the input values. Allowed input: `Int64` State: same as input
- Version: v2

### `GoogleBigtableAdminV2TypeArray`

- An ordered list of elements of a given type. Values of type `Array` are stored in `Value.array_value`.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `elementType` | Type | The type of the elements in the array. This must not be `Array`. |

### `GoogleBigtableAdminV2TypeBool`

- bool Values of type `Bool` are stored in `Value.bool_value`.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `encoding` | GoogleBigtableAdminV2TypeBoolEncoding | Specifies the encoding to use when converting to or from lower level types. |

### `GoogleBigtableAdminV2TypeBoolEncoding`

- Defines rules used to convert to or from lower level types.
- Version: v2

### `GoogleBigtableAdminV2TypeBytes`

- Bytes Values of type `Bytes` are stored in `Value.bytes_value`.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `encoding` | GoogleBigtableAdminV2TypeBytesEncoding | The encoding to use when converting to or from lower level types. |

### `GoogleBigtableAdminV2TypeBytesEncoding`

- Rules used to convert to or from lower level types.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `raw` | GoogleBigtableAdminV2TypeBytesEncodingRaw | Use `Raw` encoding. |

### `GoogleBigtableAdminV2TypeBytesEncodingRaw`

- Leaves the value as-is. Sorted mode: all values are supported. Distinct mode: all values are supported.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `escapeNulls` | boolean | If set, allows NULL values to be encoded as the empty string "". The actual empty string, or any value which only contains the null byte `0x00`, has one more null byte appended. |

### `GoogleBigtableAdminV2TypeDate`

- Date Values of type `Date` are stored in `Value.date_value`.
- Version: v2

### `GoogleBigtableAdminV2TypeEnum`

- A protobuf enum type. Values of type `Enum` are stored in `Value.int_value`.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `enumName` | string | The fully qualified name of the protobuf enum message, including package. In the format of "foo.bar.EnumMessage". |
| `schemaBundleId` | string | The ID of the schema bundle that this enum is defined in. |

### `GoogleBigtableAdminV2TypeFloat32`

- Float32 Values of type `Float32` are stored in `Value.float_value`.
- Version: v2

### `GoogleBigtableAdminV2TypeFloat64`

- Float64 Values of type `Float64` are stored in `Value.float_value`.
- Version: v2

### `GoogleBigtableAdminV2TypeGeography`

- A geography type, representing a point or region on Earth. The value is stored in `Value.bytes_value` as Well-Known Binary (WKB) bytes.
- Version: v2

### `GoogleBigtableAdminV2TypeInt32`

- Int32 Values of type `Int32` are stored in `Value.int_value`.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `encoding` | GoogleBigtableAdminV2TypeInt32Encoding | The encoding to use when converting to or from lower level types. |

### `GoogleBigtableAdminV2TypeInt32Encoding`

- Rules used to convert to or from lower level types.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `bigEndianBytes` | GoogleBigtableAdminV2TypeInt32EncodingBigEndianBytes | Use `BigEndianBytes` encoding. |
| `orderedCodeBytes` | GoogleBigtableAdminV2TypeInt32EncodingOrderedCodeBytes | Use `OrderedCodeBytes` encoding. |

### `GoogleBigtableAdminV2TypeInt32EncodingBigEndianBytes`

- Encodes the value as a 4-byte big-endian two's complement value. Sorted mode: non-negative values are supported. Distinct mode: all values are supported. Compatible with: - BigQuery `BINARY` encoding - HBase `Bytes.toBytes` - Java `ByteBuffer.putInt()` with `ByteOrder.BIG_ENDIAN`
- Version: v2

### `GoogleBigtableAdminV2TypeInt32EncodingOrderedCodeBytes`

- Encodes the value in a variable length binary format of up to 5 bytes. Values that are closer to zero use fewer bytes. Sorted mode: all values are supported. Distinct mode: all values are supported.
- Version: v2

### `GoogleBigtableAdminV2TypeInt64`

- Int64 Values of type `Int64` are stored in `Value.int_value`.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `encoding` | GoogleBigtableAdminV2TypeInt64Encoding | The encoding to use when converting to or from lower level types. |

### `GoogleBigtableAdminV2TypeInt64Encoding`

- Rules used to convert to or from lower level types.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `bigEndianBytes` | GoogleBigtableAdminV2TypeInt64EncodingBigEndianBytes | Use `BigEndianBytes` encoding. |
| `orderedCodeBytes` | GoogleBigtableAdminV2TypeInt64EncodingOrderedCodeBytes | Use `OrderedCodeBytes` encoding. |

### `GoogleBigtableAdminV2TypeInt64EncodingBigEndianBytes`

- Encodes the value as an 8-byte big-endian two's complement value. Sorted mode: non-negative values are supported. Distinct mode: all values are supported. Compatible with: - BigQuery `BINARY` encoding - HBase `Bytes.toBytes` - Java `ByteBuffer.putLong()` with `ByteOrder.BIG_ENDIAN`
- Version: v2

| Field | Type | Description |
|---|---|---|
| `bytesType` | GoogleBigtableAdminV2TypeBytes | Deprecated: ignored if set. |

### `GoogleBigtableAdminV2TypeInt64EncodingOrderedCodeBytes`

- Encodes the value in a variable length binary format of up to 10 bytes. Values that are closer to zero use fewer bytes. Sorted mode: all values are supported. Distinct mode: all values are supported.
- Version: v2

### `GoogleBigtableAdminV2TypeMap`

- A mapping of keys to values of a given type. Values of type `Map` are stored in a `Value.array_value` where each entry is another `Value.array_value` with two elements (the key and the value, in that order). Normally encoded Map values won't have repeated keys, however, clients are expected to handle the case in which they do. If the same key appears multiple times, the \_last\_ value takes precedence.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `keyType` | Type | The type of a map key. Only `Bytes`, `String`, and `Int64` are allowed as key types. |
| `valueType` | Type | The type of the values in a map. |

### `GoogleBigtableAdminV2TypeProto`

- A protobuf message type. Values of type `Proto` are stored in `Value.bytes_value`.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `messageName` | string | The fully qualified name of the protobuf message, including package. In the format of "foo.bar.Message". |
| `schemaBundleId` | string | The ID of the schema bundle that this proto is defined in. |

### `GoogleBigtableAdminV2TypeString`

- String Values of type `String` are stored in `Value.string_value`.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `encoding` | GoogleBigtableAdminV2TypeStringEncoding | The encoding to use when converting to or from lower level types. |

### `GoogleBigtableAdminV2TypeStringEncoding`

- Rules used to convert to or from lower level types.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `utf8Bytes` | GoogleBigtableAdminV2TypeStringEncodingUtf8Bytes | Use `Utf8Bytes` encoding. |
| `utf8Raw` | GoogleBigtableAdminV2TypeStringEncodingUtf8Raw | Deprecated: if set, converts to an empty `utf8_bytes`. |

### `GoogleBigtableAdminV2TypeStringEncodingUtf8Bytes`

- UTF-8 encoding. Sorted mode: - All values are supported. - Code point order is preserved. Distinct mode: all values are supported. Compatible with: - BigQuery `TEXT` encoding - HBase `Bytes.toBytes` - Java `String#getBytes(StandardCharsets.UTF_8)`
- Version: v2

| Field | Type | Description |
|---|---|---|
| `nullEscapeChar` | string | Single-character escape sequence used to support NULL values. If set, allows NULL values to be encoded as the empty string "". The actual empty string, or any value where every character equals `null_escape_char`, has one more `null_escape_char` appended. If `null_escape_char` is set and does not equal the ASCII null character `0x00`, then the encoding will not support sorted mode. . |

### `GoogleBigtableAdminV2TypeStringEncodingUtf8Raw`

- Deprecated: prefer the equivalent `Utf8Bytes`.
- Version: v2

### `GoogleBigtableAdminV2TypeStruct`

- A structured data value, consisting of fields which map to dynamically typed values. Values of type `Struct` are stored in `Value.array_value` where entries are in the same order and number as `field_types`.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `encoding` | GoogleBigtableAdminV2TypeStructEncoding | The encoding to use when converting to or from lower level types. |
| `fields` | array<GoogleBigtableAdminV2TypeStructField> | The names and types of the fields in this struct. |

### `GoogleBigtableAdminV2TypeStructEncoding`

- Rules used to convert to or from lower level types.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `delimitedBytes` | GoogleBigtableAdminV2TypeStructEncodingDelimitedBytes | Use `DelimitedBytes` encoding. |
| `orderedCodeBytes` | GoogleBigtableAdminV2TypeStructEncodingOrderedCodeBytes | User `OrderedCodeBytes` encoding. |
| `singleton` | GoogleBigtableAdminV2TypeStructEncodingSingleton | Use `Singleton` encoding. |

### `GoogleBigtableAdminV2TypeStructEncodingDelimitedBytes`

- Fields are encoded independently and concatenated with a configurable `delimiter` in between. A struct with no fields defined is encoded as a single `delimiter`. Sorted mode: - Fields are encoded in sorted mode. - Encoded field values must not contain any bytes <= `delimiter[0]` - Element-wise order is preserved: `A < B` if `A[0] < B[0]`, or if `A[0] == B[0] && A[1] < B[1]`, etc. Strict prefixes sort first. - This encoding does not support `DESC` field ordering. Distinct mode: - Fields are encoded in distinct mode. - Encoded field values must not contain `delimiter[0]`.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `delimiter` | string (byte) | Byte sequence used to delimit concatenated fields. The delimiter must contain at least 1 character and at most 50 characters. |

### `GoogleBigtableAdminV2TypeStructEncodingOrderedCodeBytes`

- Fields are encoded independently, then escaped and delimited by appling the following rules in order: - While the last remaining field is `ASC` or `UNSPECIFIED`, and encodes to the empty string "", remove it. - In each remaining field, replace all null bytes `0x00` with the fixed byte pair `{0x00, 0xFF}`. - If any remaining field encodes to the empty string "", replace it with the fixed byte pair `{0x00, 0x00}`. - Append the fixed byte pair `{0x00, 0x01}` to each remaining field, except for the last remaining field if it is `ASC`. - Bitwise negate all `DESC` fields. - Concatenate the results, or emit the fixed byte pair `{0x00, 0x00}` if there are no remaining fields to concatenate. Examples: - STRUCT() -> "\00\00" - STRUCT("") -> "\00\00" - STRUCT("", "") -> "\00\00" - STRUCT("", "B") -> "\00\00" + "\00\01" + "B" - STRUCT("A", "") -> "A" - STRUCT("", "B", "") -> "\00\00" + "\00\01" + "B" - STRUCT("A", "", "C") -> "A" + "\00\01" + "\00\00" + "\00\01" + "C" Examples for struct with `DESC` fields: - STRUCT("" DESC) -> "\xFF\xFF" + "\xFF\xFE" - STRUCT("" DESC, "") -> "\xFF\xFF" + "\xFF\xFE" - STRUCT("" DESC, "", "") -> "\xFF\xFF" + "\xFF\xFE" - STRUCT("" DESC, "A") -> "\xFF\xFF" + "\xFF\xFE" + "A" - STRUCT("A", "" DESC, "") -> "A" + "\00\01" + "\xFF\xFF" + "\xFF\xFE" - STRUCT("", "A" DESC) -> "\x00\x00" + "\x00\x01" + "\xBE" + "\xFF\xFE" Since null bytes are always escaped, this encoding can cause size blowup for encodings like `Int64.BigEndianBytes` that are likely to produce many such bytes. Sorted mode: - Fields are encoded in sorted mode. - All values supported by the field encodings are allowed. - Fields with unset or `UNSPECIFIED` order are treated as `ASC`. - Element-wise order is preserved: `A < B` if `A[0] < B[0]`, or if `A[0] == B[0] && A[1] < B[1]`, etc. Strict prefixes sort first. Distinct mode: - Fields are encoded in distinct mode. - All values supported by the field encodings are allowed.
- Version: v2

### `GoogleBigtableAdminV2TypeStructEncodingSingleton`

- Uses the encoding of `fields[0].type` as-is. Only valid if `fields.size == 1`. This encoding does not support `DESC` field ordering.
- Version: v2

### `GoogleBigtableAdminV2TypeStructField`

- A struct field and its type.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `fieldName` | string | The field name (optional). Fields without a `field_name` are considered anonymous and cannot be referenced by name. |
| `type` | Type | The type of values in this field. |

### `GoogleBigtableAdminV2TypeTimestamp`

- Timestamp Values of type `Timestamp` are stored in `Value.timestamp_value`.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `encoding` | GoogleBigtableAdminV2TypeTimestampEncoding | The encoding to use when converting to or from lower level types. |

### `GoogleBigtableAdminV2TypeTimestampEncoding`

- Rules used to convert to or from lower level types.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `unixMicrosInt64` | GoogleBigtableAdminV2TypeInt64Encoding | Encodes the number of microseconds since the Unix epoch using the given `Int64` encoding. Values must be microsecond-aligned. Compatible with: - Java `Instant.truncatedTo()` with `ChronoUnit.MICROS` |

### `HotTablet`

- A tablet is a defined by a start and end key and is explained in https://cloud.google.com/bigtable/docs/overview#architecture and https://cloud.google.com/bigtable/docs/performance#optimization. A Hot tablet is a tablet that exhibits high average cpu usage during the time interval from start time to end time.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `endKey` | string | Tablet End Key (inclusive). |
| `endTime` | string (google-datetime) | Output only. The end time of the hot tablet. |
| `name` | string | The unique name of the hot tablet. Values are of the form `projects/{project}/instances/{instance}/clusters/{cluster}/hotTablets/[a-zA-Z0-9_-]*`. |
| `nodeCpuUsagePercent` | number (float) | Output only. The average CPU usage spent by a node on this tablet over the start_time to end_time time range. The percentage is the amount of CPU used by the node to serve the tablet, from 0% (tablet was not interacted with) to 100% (the node spent all cycles serving the hot tablet). |
| `startKey` | string | Tablet Start Key (inclusive). |
| `startTime` | string (google-datetime) | Output only. The start time of the hot tablet. |
| `tableName` | string | Name of the table that contains the tablet. Values are of the form `projects/{project}/instances/{instance}/tables/_a-zA-Z0-9*`. |

### `Instance`

- A collection of Bigtable Tables and the resources that serve them. All tables in an instance are served from all Clusters in the instance.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. A commit timestamp representing when this Instance was created. For instances created before this field was added (August 2021), this value is `seconds: 0, nanos: 1`. |
| `displayName` | string | Required. The descriptive name for this instance as it appears in UIs. Can be changed at any time, but should be kept globally unique to avoid confusion. |
| `edition` | string enum | Optional. The edition of the instance. See Edition for details. Values: `EDITION_UNSPECIFIED`, `ENTERPRISE`, `ENTERPRISE_PLUS`. |
| `knowledgeCatalogRegion` | string | Output only. The region where Knowledge Catalog data is synced to and stored, including user-created aspects. |
| `labels` | object | Labels are a flexible and lightweight mechanism for organizing cloud resources into groups that reflect a customer's organizational needs and deployment strategies. They can be used to filter resources and aggregate metrics. \* Label keys must be between 1 and 63 characters long and must conform to the regular expression: `\p{Ll}\p{Lo}{0,62}`. \* Label values must be between 0 and 63 characters long and must conform to the regular expression: `[\p{Ll}\p{Lo}\p{N}_-]{0,63}`. \* No more than 64 labels can be associated with a given resource. \* Keys and values must both be under 128 bytes. Labels and Tags (below) are both used to bind metadata to resources, with different use-cases. See https://cloud.google.com/resource-manager/docs/tags/tags-overview for an in-depth overview on the difference between tags and labels. |
| `name` | string | The unique name of the instance. Values are of the form `projects/{project}/instances/a-z+[a-z0-9]`. |
| `satisfiesPzi` | boolean | Output only. Reserved for future use. |
| `satisfiesPzs` | boolean | Output only. Reserved for future use. |
| `state` | string enum | Output only. The current state of the instance. Values: `STATE_NOT_KNOWN`, `READY`, `CREATING`. |
| `tags` | object | Optional. Input only. Immutable. Tag keys/values directly bound to this resource. For example: - "123/environment": "production", - "123/costCenter": "marketing" Tags and Labels (above) are both used to bind metadata to resources, with different use-cases. See https://cloud.google.com/resource-manager/docs/tags/tags-overview for an in-depth overview on the difference between tags and labels. |
| `type` | string enum | The type of the instance. Defaults to `PRODUCTION`. Values: `TYPE_UNSPECIFIED`, `PRODUCTION`, `DEVELOPMENT`. |

### `Intersection`

- A GcRule which deletes cells matching all of the given rules.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `rules` | array<GcRule> | Only delete cells which would be deleted by every element of `rules`. |

### `ListAppProfilesResponse`

- Response message for BigtableInstanceAdmin.ListAppProfiles.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `appProfiles` | array<AppProfile> | The list of requested app profiles. |
| `failedLocations` | array<string> | Locations from which AppProfile information could not be retrieved, due to an outage or some other transient condition. AppProfiles from these locations may be missing from `app_profiles`. Values are of the form `projects//locations/` |
| `nextPageToken` | string | Set if not all app profiles could be returned in a single response. Pass this value to `page_token` in another request to get the next page of results. |

### `ListAuthorizedViewsResponse`

- Response message for google.bigtable.admin.v2.BigtableTableAdmin.ListAuthorizedViews
- Version: v2

| Field | Type | Description |
|---|---|---|
| `authorizedViews` | array<AuthorizedView> | The AuthorizedViews present in the requested table. |
| `nextPageToken` | string | Set if not all tables could be returned in a single response. Pass this value to `page_token` in another request to get the next page of results. |

### `ListBackupsResponse`

- The response for ListBackups.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `backups` | array<Backup> | The list of matching backups. |
| `nextPageToken` | string | `next_page_token` can be sent in a subsequent ListBackups call to fetch more of the matching backups. |

### `ListClustersResponse`

- Response message for BigtableInstanceAdmin.ListClusters.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `clusters` | array<Cluster> | The list of requested clusters. |
| `failedLocations` | array<string> | Locations from which Cluster information could not be retrieved, due to an outage or some other transient condition. Clusters from these locations may be missing from `clusters`, or may only have partial information returned. Values are of the form `projects//locations/` |
| `nextPageToken` | string | DEPRECATED: This field is unused and ignored. |

### `ListHotTabletsResponse`

- Response message for BigtableInstanceAdmin.ListHotTablets.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `hotTablets` | array<HotTablet> | List of hot tablets in the tables of the requested cluster that fall within the requested time range. Hot tablets are ordered by node cpu usage percent. If there are multiple hot tablets that correspond to the same tablet within a 15-minute interval, only the hot tablet with the highest node cpu usage will be included in the response. |
| `nextPageToken` | string | Set if not all hot tablets could be returned in a single response. Pass this value to `page_token` in another request to get the next page of results. |

### `ListInstancesResponse`

- Response message for BigtableInstanceAdmin.ListInstances.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `failedLocations` | array<string> | Locations from which Instance information could not be retrieved, due to an outage or some other transient condition. Instances whose Clusters are all in one of the failed locations may be missing from `instances`, and Instances with at least one Cluster in a failed location may only have partial information returned. Values are of the form `projects//locations/` |
| `instances` | array<Instance> | The list of requested instances. |
| `nextPageToken` | string | DEPRECATED: This field is unused and ignored. |

### `ListLocationsResponse`

- The response message for Locations.ListLocations.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `locations` | array<Location> | A list of locations that matches the specified filter in the request. |
| `nextPageToken` | string | The standard List next-page token. |

### `ListLogicalViewsResponse`

- Response message for BigtableInstanceAdmin.ListLogicalViews.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `logicalViews` | array<LogicalView> | The list of requested logical views. |
| `nextPageToken` | string | A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. |

### `ListMaterializedViewsResponse`

- Response message for BigtableInstanceAdmin.ListMaterializedViews.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `materializedViews` | array<MaterializedView> | The list of requested materialized views. |
| `nextPageToken` | string | A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. |

### `ListMemoryLayersResponse`

- Response message for BigtableInstanceAdmin.ListMemoryLayers.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `failedLocations` | array<string> | Locations from which MemoryLayer information could not be retrieved, due to an outage or some other transient condition. MemoryLayers from these locations may be missing from `memory_layers`, or may only have partial information returned. Values are of the form `projects//locations/` |
| `memoryLayers` | array<MemoryLayer> | The list of requested memory layers. |
| `nextPageToken` | string | A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. |

### `ListOperationsResponse`

- The response message for Operations.ListOperations.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | The standard List next-page token. |
| `operations` | array<Operation> | A list of operations that matches the specified filter in the request. |
| `unreachable` | array<string> | Unordered list. Unreachable resources. Populated when the request sets `ListOperationsRequest.return_partial_success` and reads across collections. For example, when attempting to list all resources across all supported locations. |

### `ListSchemaBundlesResponse`

- The response for ListSchemaBundles.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. |
| `schemaBundles` | array<SchemaBundle> | The schema bundles from the specified table. |

### `ListTablesResponse`

- Response message for google.bigtable.admin.v2.BigtableTableAdmin.ListTables
- Version: v2

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | Set if not all tables could be returned in a single response. Pass this value to `page_token` in another request to get the next page of results. |
| `tables` | array<Table> | The tables present in the requested instance. |

### `Location`

- A resource that represents a Google Cloud location.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `displayName` | string | The friendly name for this location, typically a nearby city name. For example, "Tokyo". |
| `labels` | object | Cross-service attributes for the location. For example {"cloud.googleapis.com/region": "us-east1"} |
| `locationId` | string | The canonical id for this location. For example: `"us-east1"`. |
| `metadata` | object | Service-specific metadata. For example the available capacity at the given location. |
| `name` | string | Resource name for the location, which may vary between implementations. For example: `"projects/example-project/locations/us-east1"` |

### `LogicalView`

- A SQL logical view object that can be referenced in SQL queries.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `deletionProtection` | boolean | Optional. Set to true to make the LogicalView protected against deletion. |
| `etag` | string | Optional. The etag for this logical view. This may be sent on update requests to ensure that the client has an up-to-date value before proceeding. The server returns an ABORTED error on a mismatched etag. |
| `name` | string | Identifier. The unique name of the logical view. Format: `projects/{project}/instances/{instance}/logicalViews/{logical_view}` |
| `query` | string | Required. The logical view's select query. |

### `MaterializedView`

- A materialized view object that can be referenced in SQL queries.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `clusterStates` | object | Output only. Map from cluster ID to per-cluster materialized view state. If it could not be determined whether or not the materialized view has data in a particular cluster (for example, if its zone is unavailable), then there will be an entry for the cluster with `STATE_NOT_KNOWN` state. Views: `REPLICATION_VIEW`, `FULL`. |
| `deletionProtection` | boolean | Set to true to make the MaterializedView protected against deletion. Views: `SCHEMA_VIEW`, `REPLICATION_VIEW`, `FULL`. |
| `etag` | string | Optional. The etag for this materialized view. This may be sent on update requests to ensure that the client has an up-to-date value before proceeding. The server returns an ABORTED error on a mismatched etag. Views: `SCHEMA_VIEW`, `REPLICATION_VIEW`, `FULL`. |
| `name` | string | Identifier. The unique name of the materialized view. Format: `projects/{project}/instances/{instance}/materializedViews/{materialized_view}` Views: `SCHEMA_VIEW`, `REPLICATION_VIEW`, `FULL`. |
| `query` | string | Required. Immutable. The materialized view's select query. Views: `SCHEMA_VIEW`, `FULL`. |

### `MemoryConfig`

- If set, eligible single-row requests (currently limited to ReadRows) using this app profile will be routed to the memory layer. All eligible writes populate the memory layer. MemoryConfig can only be set if the AppProfile uses single cluster routing and the configured cluster has a memory layer enabled.
- Version: v2

### `MemoryLayer`

- The memory layer of a cluster. A memory layer serves reads from memory without hitting the backing persistent data store.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `etag` | string | Optional. The etag for this memory layer. This may be sent on update requests to ensure that the client has an up-to-date value before proceeding. The server returns an ABORTED error on a mismatched etag. |
| `memoryConfig` | GoogleBigtableAdminV2MemoryLayerMemoryConfig | The configuration of this memory layer. Set an empty `memory_config` to enable the memory layer. Unset this to disable the memory layer. |
| `name` | string | Identifier. Name of the memory layer. This is always: "projects/{project}/instances/{instance}/clusters/{cluster}/memoryLayer". |
| `state` | string enum | Output only. The current state of the memory layer. Values: `STATE_NOT_KNOWN`, `READY`, `ENABLING`, `RESIZING`, `DISABLED`. |

### `Modification`

- A create, update, or delete of a particular column family.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `create` | ColumnFamily | Create a new column family with the specified schema, or fail if one already exists with the given ID. |
| `drop` | boolean | Drop (delete) the column family with the given ID, or fail if no such family exists. |
| `id` | string | The ID of the column family to be modified. |
| `update` | ColumnFamily | Update an existing column family to the specified schema, or fail if no column family exists with the given ID. |
| `updateMask` | string (google-fieldmask) | Optional. A mask specifying which fields (e.g. `gc_rule`) in the `update` mod should be updated, ignored for other modification types. If unset or empty, we treat it as updating `gc_rule` to be backward compatible. |

### `ModifyColumnFamiliesRequest`

- Request message for google.bigtable.admin.v2.BigtableTableAdmin.ModifyColumnFamilies
- Version: v2

| Field | Type | Description |
|---|---|---|
| `ignoreWarnings` | boolean | Optional. If true, ignore safety checks when modifying the column families. |
| `modifications` | array<Modification> | Required. Modifications to be atomically applied to the specified table's families. Entries are applied in order, meaning that earlier modifications can be masked by later ones (in the case of repeated updates to the same family, for example). |

### `MultiClusterRoutingUseAny`

- Read/write requests are routed to the nearest cluster in the instance, and will fail over to the nearest cluster that is available in the event of transient errors or delays. Clusters in a region are considered equidistant. Choosing this option sacrifices read-your-writes consistency to improve availability.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `clusterIds` | array<string> | The set of clusters to route to. The order is ignored; clusters will be tried in order of distance. If left empty, all clusters are eligible. |
| `rowAffinity` | RowAffinity | Row affinity sticky routing based on the row key of the request. Requests that span multiple rows are routed non-deterministically. |

### `Operation`

- This resource represents a long-running operation that is the result of a network API call.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `done` | boolean | If the value is `false`, it means the operation is still in progress. If `true`, the operation is completed, and either `error` or `response` is available. |
| `error` | Status | The error result of the operation in case of failure or cancellation. |
| `metadata` | object | Service-specific metadata associated with the operation. It typically contains progress information and common metadata such as create time. Some services might not provide such metadata. Any method that returns a long-running operation should document the metadata type, if any. |
| `name` | string | The server-assigned name, which is only unique within the same service that originally returns it. If you use the default HTTP mapping, the `name` should be a resource name ending with `operations/{unique_id}`. |
| `response` | object | The normal, successful response of the operation. If the original method returns no data on success, such as `Delete`, the response is `google.protobuf.Empty`. If the original method is standard `Get`/`Create`/`Update`, the response should be the resource. For other methods, the response should have the type `XxxResponse`, where `Xxx` is the original method name. For example, if the original method name is `TakeSnapshot()`, the inferred response type is `TakeSnapshotResponse`. |

### `OperationProgress`

- Encapsulates progress related information for a Cloud Bigtable long running operation.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `endTime` | string (google-datetime) | If set, the time at which this operation failed or was completed successfully. |
| `progressPercent` | integer (int32) | Percent completion of the operation. Values are between 0 and 100 inclusive. |
| `startTime` | string (google-datetime) | Time the request was received. |

### `OptimizeRestoredTableMetadata`

- Metadata type for the long-running operation used to track the progress of optimizations performed on a newly restored table. This long-running operation is automatically created by the system after the successful completion of a table restore, and cannot be cancelled.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `name` | string | Name of the restored table being optimized. |
| `progress` | OperationProgress | The progress of the post-restore optimizations. |

### `PartialUpdateClusterMetadata`

- The metadata for the Operation returned by PartialUpdateCluster.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `finishTime` | string (google-datetime) | The time at which the operation failed or was completed successfully. |
| `originalRequest` | PartialUpdateClusterRequest | The original request for PartialUpdateCluster. |
| `requestTime` | string (google-datetime) | The time at which the original request was received. |

### `PartialUpdateClusterRequest`

- Request message for BigtableInstanceAdmin.PartialUpdateCluster.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `cluster` | Cluster | Required. The Cluster which contains the partial updates to be applied, subject to the update_mask. |
| `updateMask` | string (google-fieldmask) | Required. The subset of Cluster fields which should be replaced. |

### `PartialUpdateInstanceRequest`

- Request message for BigtableInstanceAdmin.PartialUpdateInstance.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `instance` | Instance | Required. The Instance which will (partially) replace the current value. |
| `updateMask` | string (google-fieldmask) | Required. The subset of Instance fields which should be replaced. Must be explicitly set. |

### `Policy`

- An Identity and Access Management (IAM) policy, which specifies access controls for Google Cloud resources. A `Policy` is a collection of `bindings`. A `binding` binds one or more `members`, or principals, to a single `role`. Principals can be user accounts, service accounts, Google groups, and domains (such as G Suite). A `role` is a named list of permissions; each `role` can be an IAM predefined role or a user-created custom role. For some types of Google Cloud resources, a `binding` can also specify a `condition`, which is a logical expression that allows access to a resource only if the expression evaluates to `true`. A condition can add constraints based on attributes of the request, the resource, or both. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). \*\*JSON example:\*\* { "bindings": \[ { "role": "roles/resourcemanager.organizationAdmin", "members": \[ "user:mike@example.com", "group:admins@example.com", "domain:google.com", "serviceAccount:my-project-id@appspot.gserviceaccount.com" \] }, { "role": "roles/resourcemanager.organizationViewer", "members": \[ "user:eve@example.com" \], "condition": { "title": "expirable access", "description": "Does not grant access after Sep 2020", "expression": "request.time < timestamp('2020-10-01T00:00:00.000Z')", } } \], "etag": "BwWWja0YfJA=", "version": 3 } \*\*YAML example:\*\* bindings: - members: - user:mike@example.com - group:admins@example.com - domain:google.com - serviceAccount:my-project-id@appspot.gserviceaccount.com role: roles/resourcemanager.organizationAdmin - members: - user:eve@example.com role: roles/resourcemanager.organizationViewer condition: title: expirable access description: Does not grant access after Sep 2020 expression: request.time < timestamp('2020-10-01T00:00:00.000Z') etag: BwWWja0YfJA= version: 3 For a description of IAM and its features, see the IAM documentation (https://cloud.google.com/iam/docs/).
- Version: v2

| Field | Type | Description |
|---|---|---|
| `auditConfigs` | array<AuditConfig> | Specifies cloud audit logging configuration for this policy. |
| `bindings` | array<Binding> | Associates a list of `members`, or principals, with a `role`. Optionally, may specify a `condition` that determines how and when the `bindings` are applied. Each of the `bindings` must contain at least one principal. The `bindings` in a `Policy` can refer to up to 1,500 principals; up to 250 of these principals can be Google groups. Each occurrence of a principal counts towards these limits. For example, if the `bindings` grant 50 different roles to `user:alice@example.com`, and not to any other principal, then you can add another 1,450 principals to the `bindings` in the `Policy`. |
| `etag` | string (byte) | `etag` is used for optimistic concurrency control as a way to help prevent simultaneous updates of a policy from overwriting each other. It is strongly suggested that systems make use of the `etag` in the read-modify-write cycle to perform policy updates in order to avoid race conditions: An `etag` is returned in the response to `getIamPolicy`, and systems are expected to put that etag in the request to `setIamPolicy` to ensure that their change will be applied to the same version of the policy. \*\*Important:\*\* If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. |
| `version` | integer (int32) | Specifies the format of the policy. Valid values are `0`, `1`, and `3`. Requests that specify an invalid value are rejected. Any operation that affects conditional role bindings must specify version `3`. This requirement applies to the following operations: \* Getting a policy that includes a conditional role binding \* Adding a conditional role binding to a policy \* Changing a conditional role binding in a policy \* Removing any role binding, with or without a condition, from a policy that includes conditions \*\*Important:\*\* If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. If a policy does not include any conditions, operations on that policy may specify any valid version or leave the field unset. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |

### `ProtoSchema`

- Represents a collection of protobuf schemas.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `protoDescriptors` | string (byte) | Required. Contains a protobuf-serialized google.protobuf.FileDescriptorSet (https://github.com/protocolbuffers/protobuf/blob/main/src/google/protobuf/descriptor.proto), which could include multiple proto files. To generate it, install (https://grpc.io/docs/protoc-installation/) and run `protoc` with `--include_imports` and `--descriptor_set_out`. For example, to generate for moon/shot/app.proto, run $protoc --proto_path=/app_path --proto_path=/lib_path \ --include_imports \ --descriptor_set_out=descriptors.pb \ moon/shot/app.proto For more details, see protobuffer self description (https://developers.google.com/protocol-buffers/docs/techniques#self-description). |

### `RestoreInfo`

- Information about a table restore.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `backupInfo` | BackupInfo | Information about the backup used to restore the table. The backup may no longer exist. |
| `sourceType` | string enum | The type of the restore source. Values: `RESTORE_SOURCE_TYPE_UNSPECIFIED`, `BACKUP`. |

### `RestoreTableMetadata`

- Metadata type for the long-running operation returned by RestoreTable.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `backupInfo` | BackupInfo | — |
| `name` | string | Name of the table being created and restored to. |
| `optimizeTableOperationName` | string | If exists, the name of the long-running operation that will be used to track the post-restore optimization process to optimize the performance of the restored table. The metadata type of the long-running operation is OptimizeRestoredTableMetadata. The response type is Empty. This long-running operation may be automatically created by the system if applicable after the RestoreTable long-running operation completes successfully. This operation may not be created if the table is already optimized or the restore was not successful. |
| `progress` | OperationProgress | The progress of the RestoreTable operation. |
| `sourceType` | string enum | The type of the restore source. Values: `RESTORE_SOURCE_TYPE_UNSPECIFIED`, `BACKUP`. |

### `RestoreTableRequest`

- The request for RestoreTable.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `backup` | string | Name of the backup from which to restore. Values are of the form `projects//instances//clusters//backups/`. |
| `tableId` | string | Required. The id of the table to create and restore to. This table must not already exist. The `table_id` appended to `parent` forms the full table name of the form `projects//instances//tables/`. |

### `RowAffinity`

- If enabled, Bigtable will route the request based on the row key of the request, rather than randomly. Instead, each row key will be assigned to a cluster, and will stick to that cluster. If clusters are added or removed, then this may affect which row keys stick to which clusters. To avoid this, users can use a cluster group to specify which clusters are to be used. In this case, new clusters that are not a part of the cluster group will not be routed to, and routing will be unaffected by the new cluster. Moreover, clusters specified in the cluster group cannot be deleted unless removed from the cluster group.
- Version: v2

### `SchemaBundle`

- A named collection of related schemas.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `avroSchema` | AvroSchema | Optional. Schema for Avros. |
| `etag` | string | Optional. The etag for this schema bundle. This may be sent on update and delete requests to ensure the client has an up-to-date value before proceeding. The server returns an ABORTED error on a mismatched etag. |
| `name` | string | Identifier. The unique name identifying this schema bundle. Values are of the form `projects/{project}/instances/{instance}/tables/{table}/schemaBundles/{schema_bundle}` |
| `protoSchema` | ProtoSchema | Schema for Protobufs. |

### `SetIamPolicyRequest`

- Request message for `SetIamPolicy` method.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `policy` | Policy | REQUIRED: The complete policy to be applied to the `resource`. The size of the policy is limited to a few 10s of KB. An empty policy is a valid policy but certain Google Cloud services (such as Projects) might reject them. |
| `updateMask` | string (google-fieldmask) | OPTIONAL: A FieldMask specifying which fields of the policy to modify. Only the fields in the mask will be modified. If no mask is provided, the following default mask is used: `paths: "bindings, etag"` |

### `SingleClusterRouting`

- Unconditionally routes all read/write requests to a specific cluster. This option preserves read-your-writes consistency but does not improve availability.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `allowTransactionalWrites` | boolean | Whether or not `CheckAndMutateRow` and `ReadModifyWriteRow` requests are allowed by this app profile. It is unsafe to send these requests to the same table/row/column in multiple clusters. |
| `clusterId` | string | The cluster to which read/write requests should be routed. |

### `Split`

- An initial split point for a newly created table.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `key` | string (byte) | Row key to use as an initial tablet boundary. |

### `StandardIsolation`

- Standard options for isolating this app profile's traffic from other use cases.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `memoryConfig` | MemoryConfig | Optional. The memory config to use for requests sent using this app profile. |
| `priority` | string enum | The priority of requests sent using this app profile. Values: `PRIORITY_UNSPECIFIED`, `PRIORITY_LOW`, `PRIORITY_MEDIUM`, `PRIORITY_HIGH`. |

### `StandardReadRemoteWrites`

- Checks that all writes before the consistency token was generated are replicated in every cluster and readable.
- Version: v2

### `Status`

- The `Status` type defines a logical error model that is suitable for different programming environments, including REST APIs and RPC APIs. It is used by gRPC (https://github.com/grpc). Each `Status` message contains three pieces of data: error code, error message, and error details. You can find out more about this error model and how to work with it in the API Design Guide (https://cloud.google.com/apis/design/errors).
- Version: v2

| Field | Type | Description |
|---|---|---|
| `code` | integer (int32) | The status code, which should be an enum value of google.rpc.Code. |
| `details` | array<object> | A list of messages that carry the error details. There is a common set of message types for APIs to use. |
| `message` | string | A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client. |

### `Table`

- A collection of user data indexed by row, column, and timestamp. Each table is served using the resources of its parent cluster.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `automatedBackupPolicy` | AutomatedBackupPolicy | If specified, automated backups are enabled for this table. Otherwise, automated backups are disabled. |
| `changeStreamConfig` | ChangeStreamConfig | If specified, enable the change stream on this table. Otherwise, the change stream is disabled and the change stream is not retained. |
| `clusterStates` | object | Output only. Map from cluster ID to per-cluster table state. If it could not be determined whether or not the table has data in a particular cluster (for example, if its zone is unavailable), then there will be an entry for the cluster with UNKNOWN `replication_status`. Views: `REPLICATION_VIEW`, `ENCRYPTION_VIEW`, `FULL` |
| `columnFamilies` | object | The column families configured for this table, mapped by column family ID. Views: `SCHEMA_VIEW`, `STATS_VIEW`, `FULL` |
| `deletionProtection` | boolean | Set to true to make the table protected against data loss. i.e. deleting the following resources through Admin APIs are prohibited: \* The table. \* The column families in the table. \* The instance containing the table. Note one can still delete the data stored in the table through Data APIs. |
| `effectiveAutomatedBackupPolicy` | AutomatedBackupPolicy | Output only. The effective automated backup policy applied to the table. This represents the policy actually in effect, which may be a system-default policy if the user has not explicitly configured one. Views: `SCHEMA_VIEW`, `FULL`. |
| `granularity` | string enum | Immutable. The granularity at which timestamps are stored in this table. Timestamps not matching the granularity will be rejected. If unspecified at creation time, the value will be set to `MILLIS`. Views: `SCHEMA_VIEW`, `FULL`. Values: `TIMESTAMP_GRANULARITY_UNSPECIFIED`, `MILLIS`, `MICROS`. |
| `name` | string | The unique name of the table. Values are of the form `projects/{project}/instances/{instance}/tables/_a-zA-Z0-9*`. Views: `NAME_ONLY`, `SCHEMA_VIEW`, `REPLICATION_VIEW`, `STATS_VIEW`, `FULL` |
| `restoreInfo` | RestoreInfo | Output only. If this table was restored from another data source (e.g. a backup), this field will be populated with information about the restore. |
| `rowKeySchema` | GoogleBigtableAdminV2TypeStruct | The row key schema for this table. The schema is used to decode the raw row key bytes into a structured format. The order of field declarations in this schema is important, as it reflects how the raw row key bytes are structured. Currently, this only affects how the key is read via a GoogleSQL query from the ExecuteQuery API. For a SQL query, the \_key column is still read as raw bytes. But queries can reference the key fields by name, which will be decoded from \_key using provided type and encoding. Queries that reference key fields will fail if they encounter an invalid row key. For example, if \_key = "some_id#2024-04-30#\x00\x13\x00\xf3" with the following schema: { fields { field_name: "id" type { string { encoding: utf8_bytes {} } } } fields { field_name: "date" type { string { encoding: utf8_bytes {} } } } fields { field_name: "product_code" type { int64 { encoding: big_endian_bytes {} } } } encoding { delimited_bytes { delimiter: "#" } } } The decoded key parts would be: id = "some_id", date = "2024-04-30", product_code = 1245427 The query "SELECT \_key, product_code FROM table" will return two columns: /------------------------------------------------------\ \| \_key \| product_code \| \| --------------------------------------\|--------------\| \| "some_id#2024-04-30#\x00\x13\x00\xf3" \| 1245427 \| \------------------------------------------------------/ The schema has the following invariants: (1) The decoded field values are order-preserved. For read, the field values will be decoded in sorted mode from the raw bytes. (2) Every field in the schema must specify a non-empty name. (3) Every field must specify a type with an associated encoding. The type is limited to scalar types only: Array, Map, Aggregate, and Struct are not allowed. (4) The field names must not collide with existing column family names and reserved keywords "\_key" and "\_timestamp". The following update operations are allowed for row_key_schema: - Update from an empty schema to a new schema. - Remove the existing schema. This operation requires setting the `ignore_warnings` flag to `true`, since it might be a backward incompatible change. Without the flag, the update request will fail with an INVALID_ARGUMENT error. Any other row key schema update operation (e.g. update existing schema columns names or types) is currently unsupported. |
| `stats` | TableStats | Output only. Only available with STATS_VIEW, this includes summary statistics about the entire table contents. For statistics about a specific column family, see ColumnFamilyStats in the mapped ColumnFamily collection above. |
| `tieredStorageConfig` | TieredStorageConfig | Rules to specify what data is stored in each storage tier. Different tiers store data differently, providing different trade-offs between cost and performance. Different parts of a table can be stored separately on different tiers. If a config is specified, tiered storage is enabled for this table. Otherwise, tiered storage is disabled. Only SSD instances can configure tiered storage. |

### `TableProgress`

- Progress info for copying a table's data to the new cluster.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `estimatedCopiedBytes` | string (int64) | Estimate of the number of bytes copied so far for this table. This will eventually reach 'estimated_size_bytes' unless the table copy is CANCELLED. |
| `estimatedSizeBytes` | string (int64) | Estimate of the size of the table to be copied. |
| `state` | string enum | — Values: `STATE_UNSPECIFIED`, `PENDING`, `COPYING`, `COMPLETED`, `CANCELLED`. |

### `TableStats`

- Approximate statistics related to a table. These statistics are calculated infrequently, while simultaneously, data in the table can change rapidly. Thus the values reported here (e.g. row count) are very likely out-of date, even the instant they are received in this API. Thus, only treat these values as approximate. IMPORTANT: Everything below is approximate, unless otherwise specified.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `averageCellsPerColumn` | number (double) | How many cells are present per column (column family, column qualifier) combinations, averaged over all columns in all rows in the table. e.g. A table with 2 rows: \* A row with 3 cells in "family:col" and 1 cell in "other:col" (4 cells / 2 columns) \* A row with 1 cell in "family:col", 7 cells in "family:other_col", and 7 cells in "other:data" (15 cells / 3 columns) would report (4 + 15)/(2 + 3) = 3.8 in this field. |
| `averageColumnsPerRow` | number (double) | How many (column family, column qualifier) combinations are present per row in the table, averaged over all rows in the table. e.g. A table with 2 rows: \* A row with cells in "family:col" and "other:col" (2 distinct columns) \* A row with cells in "family:col", "family:other_col", and "other:data" (3 distinct columns) would report (2 + 3)/2 = 2.5 in this field. |
| `logicalDataBytes` | string (int64) | This is roughly how many bytes would be needed to read the entire table (e.g. by streaming all contents out). |
| `rowCount` | string (int64) | How many rows are in the table. |

### `TestIamPermissionsRequest`

- Request message for `TestIamPermissions` method.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `permissions` | array<string> | The set of permissions to check for the `resource`. Permissions with wildcards (such as `*` or `storage.*`) are not allowed. For more information see IAM Overview (https://cloud.google.com/iam/docs/overview#permissions). |

### `TestIamPermissionsResponse`

- Response message for `TestIamPermissions` method.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `permissions` | array<string> | A subset of `TestPermissionsRequest.permissions` that the caller is allowed. |

### `TieredStorageConfig`

- Config for tiered storage. A valid config must have a valid TieredStorageRule. Otherwise the whole TieredStorageConfig must be unset. By default all data is stored in the SSD tier (only SSD instances can configure tiered storage).
- Version: v2

| Field | Type | Description |
|---|---|---|
| `infrequentAccess` | TieredStorageRule | Rule to specify what data is stored in the infrequent access(IA) tier. The IA tier allows storing more data per node with reduced performance. |

### `TieredStorageRule`

- Rule to specify what data is stored in a storage tier.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `includeIfOlderThan` | string (google-duration) | Include cells older than the given age. For the infrequent access tier, this value must be at least 30 days. |

### `Type`

- `Type` represents the type of data that is written to, read from, or stored in Bigtable. It is heavily based on the GoogleSQL standard to help maintain familiarity and consistency across products and features. For compatibility with Bigtable's existing untyped APIs, each `Type` includes an `Encoding` which describes how to convert to or from the underlying data. Each encoding can operate in one of two modes: - Sorted: In this mode, Bigtable guarantees that `Encode(X) <= Encode(Y)` if and only if `X <= Y`. This is useful anywhere sort order is important, for example when encoding keys. - Distinct: In this mode, Bigtable guarantees that if `X != Y` then `Encode(X) != Encode(Y)`. However, the converse is not guaranteed. For example, both `{'foo': '1', 'bar': '2'}` and `{'bar': '2', 'foo': '1'}` are valid encodings of the same JSON value. The API clearly documents which mode is used wherever an encoding can be configured. Each encoding also documents which values are supported in which modes. For example, when encoding INT64 as a numeric STRING, negative numbers cannot be encoded in sorted mode. This is because `INT64(1) > INT64(-1)`, but `STRING("-00001") > STRING("00001")`.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `aggregateType` | GoogleBigtableAdminV2TypeAggregate | Aggregate |
| `arrayType` | GoogleBigtableAdminV2TypeArray | Array |
| `boolType` | GoogleBigtableAdminV2TypeBool | Bool |
| `bytesType` | GoogleBigtableAdminV2TypeBytes | Bytes |
| `dateType` | GoogleBigtableAdminV2TypeDate | Date |
| `enumType` | GoogleBigtableAdminV2TypeEnum | Enum |
| `float32Type` | GoogleBigtableAdminV2TypeFloat32 | Float32 |
| `float64Type` | GoogleBigtableAdminV2TypeFloat64 | Float64 |
| `geographyType` | GoogleBigtableAdminV2TypeGeography | Geography |
| `int32Type` | GoogleBigtableAdminV2TypeInt32 | Int32 |
| `int64Type` | GoogleBigtableAdminV2TypeInt64 | Int64 |
| `mapType` | GoogleBigtableAdminV2TypeMap | Map |
| `protoType` | GoogleBigtableAdminV2TypeProto | Proto |
| `stringType` | GoogleBigtableAdminV2TypeString | String |
| `structType` | GoogleBigtableAdminV2TypeStruct | Struct |
| `timestampType` | GoogleBigtableAdminV2TypeTimestamp | Timestamp |

### `UndeleteTableMetadata`

- Metadata type for the operation returned by google.bigtable.admin.v2.BigtableTableAdmin.UndeleteTable.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `endTime` | string (google-datetime) | If set, the time at which this operation finished or was cancelled. DEPRECATED: Use finish_time instead. |
| `finishTime` | string (google-datetime) | The time at which the operation failed or was completed successfully. |
| `name` | string | The name of the table being restored. |
| `requestTime` | string (google-datetime) | The time at which the original request was received. |
| `startTime` | string (google-datetime) | The time at which this operation started. DEPRECATED: Use request_time instead. |

### `UndeleteTableRequest`

- Request message for google.bigtable.admin.v2.BigtableTableAdmin.UndeleteTable
- Version: v2

### `Union`

- A GcRule which deletes cells matching any of the given rules.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `rules` | array<GcRule> | Delete cells which would be deleted by any element of `rules`. |

### `UpdateAppProfileMetadata`

- The metadata for the Operation returned by UpdateAppProfile.
- Version: v2

### `UpdateAuthorizedViewMetadata`

- Metadata for the google.longrunning.Operation returned by UpdateAuthorizedView.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `finishTime` | string (google-datetime) | The time at which the operation failed or was completed successfully. |
| `originalRequest` | UpdateAuthorizedViewRequest | The request that prompted the initiation of this UpdateAuthorizedView operation. |
| `requestTime` | string (google-datetime) | The time at which the original request was received. |

### `UpdateAuthorizedViewRequest`

- The request for UpdateAuthorizedView.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `authorizedView` | AuthorizedView | Required. The AuthorizedView to update. The `name` in `authorized_view` is used to identify the AuthorizedView. AuthorizedView name must in this format: `projects/{project}/instances/{instance}/tables/{table}/authorizedViews/{authorized_view}`. |
| `ignoreWarnings` | boolean | Optional. If true, ignore the safety checks when updating the AuthorizedView. |
| `updateMask` | string (google-fieldmask) | Optional. The list of fields to update. A mask specifying which fields in the AuthorizedView resource should be updated. This mask is relative to the AuthorizedView resource, not to the request message. A field will be overwritten if it is in the mask. If empty, all fields set in the request will be overwritten. A special value `*` means to overwrite all fields (including fields not set in the request). |

### `UpdateClusterMetadata`

- The metadata for the Operation returned by UpdateCluster.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `finishTime` | string (google-datetime) | The time at which the operation failed or was completed successfully. |
| `originalRequest` | Cluster | The request that prompted the initiation of this UpdateCluster operation. |
| `requestTime` | string (google-datetime) | The time at which the original request was received. |

### `UpdateInstanceMetadata`

- The metadata for the Operation returned by UpdateInstance.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `finishTime` | string (google-datetime) | The time at which the operation failed or was completed successfully. |
| `originalRequest` | PartialUpdateInstanceRequest | The request that prompted the initiation of this UpdateInstance operation. |
| `requestTime` | string (google-datetime) | The time at which the original request was received. |

### `UpdateLogicalViewMetadata`

- The metadata for the Operation returned by UpdateLogicalView.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `endTime` | string (google-datetime) | DEPRECATED: Use finish_time instead. |
| `finishTime` | string (google-datetime) | The time at which the operation failed or was completed successfully. |
| `originalRequest` | UpdateLogicalViewRequest | The request that prompted the initiation of this UpdateLogicalView operation. |
| `requestTime` | string (google-datetime) | The time at which the original request was received. |
| `startTime` | string (google-datetime) | DEPRECATED: Use request_time instead. |

### `UpdateLogicalViewRequest`

- Request message for BigtableInstanceAdmin.UpdateLogicalView.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `logicalView` | LogicalView | Required. The logical view to update. The logical view's `name` field is used to identify the view to update. Format: `projects/{project}/instances/{instance}/logicalViews/{logical_view}`. |
| `updateMask` | string (google-fieldmask) | Optional. The list of fields to update. |

### `UpdateMemoryLayerMetadata`

- The metadata for the Operation returned by UpdateMemoryLayer.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `finishTime` | string (google-datetime) | The time at which the operation failed or was completed successfully. |
| `originalRequest` | UpdateMemoryLayerRequest | The request that prompted the initiation of this UpdateMemoryLayer operation. |
| `requestTime` | string (google-datetime) | The time at which the original request was received. |

### `UpdateMemoryLayerRequest`

- Request message for BigtableInstanceAdmin.UpdateMemoryLayer.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `memoryLayer` | MemoryLayer | Required. The memory layer to update. The memory layer's `name` format is as follows: `projects/{project}/instances/{instance}/clusters/{cluster}/memoryLayer`. |
| `updateMask` | string (google-fieldmask) | Optional. The list of fields to update. |

### `UpdateSchemaBundleMetadata`

- The metadata for the Operation returned by UpdateSchemaBundle.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `finishTime` | string (google-datetime) | The time at which the operation failed or was completed successfully. |
| `name` | string | The unique name identifying this schema bundle. Values are of the form `projects/{project}/instances/{instance}/tables/{table}/schemaBundles/{schema_bundle}` |
| `requestTime` | string (google-datetime) | The time at which the original request was received. |

### `UpdateTableMetadata`

- Metadata type for the operation returned by UpdateTable.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `endTime` | string (google-datetime) | If set, the time at which this operation finished or was canceled. DEPRECATED: Use finish_time instead. |
| `finishTime` | string (google-datetime) | The time at which the operation failed or was completed successfully. |
| `name` | string | The name of the table being updated. |
| `requestTime` | string (google-datetime) | The time at which the original request was received. |
| `startTime` | string (google-datetime) | The time at which this operation started. DEPRECATED: Use request_time instead. |

### Shape of `AppProfile`

Generated from the Discovery schema (not in the official docs); values show each field type:

```json
{
  "dataBoostIsolationReadOnly": "DataBoostIsolationReadOnly",
  "description": "string",
  "etag": "string",
  "multiClusterRoutingUseAny": "MultiClusterRoutingUseAny",
  "name": "string",
  "priority": "string enum",
  "singleClusterRouting": "SingleClusterRouting",
  "standardIsolation": "StandardIsolation"
}
```

## Notes

- Generated from the Discovery document(s) v2 of `bigtableadmin` (retrieved 2026-11-14); a type with the same fields in several versions shows the preferred version; a type whose fields differ between versions is listed once per version (heading suffix `(version)`), and each type's `Version` line names the document it was taken from. A `$ref` resolves to the definition of the same version.
- Corrected from the official docs (the Discovery text above is verbatim): Discovery dropped bracket expressions from the instance name format; in google/bigtable/admin/v2/instance.proto (googleapis commit 97f6460, https://github.com/googleapis/googleapis/blob/97f6460c3558c1435d7fd001a9251f8df058ae2f/google/bigtable/admin/v2/instance.proto) it is `projects/{project}/instances/[a-z][a-z0-9\\-]+[a-z0-9]` (shown above as `instances/a-z+[a-z0-9]`).
- Corrected from the official docs (the Discovery text above is verbatim): Discovery dropped the bracket expressions from the cluster name format; in google/bigtable/admin/v2/instance.proto (googleapis commit 97f6460, https://github.com/googleapis/googleapis/blob/97f6460c3558c1435d7fd001a9251f8df058ae2f/google/bigtable/admin/v2/instance.proto) it is `projects/{project}/instances/{instance}/clusters/[a-z][-a-z0-9]*` (shown above as `clusters/a-z*`).
- Corrected from the official docs (the Discovery text above is verbatim): Discovery dropped the bracket expressions from the label key regular expression; in google/bigtable/admin/v2/instance.proto (googleapis commit 97f6460, https://github.com/googleapis/googleapis/blob/97f6460c3558c1435d7fd001a9251f8df058ae2f/google/bigtable/admin/v2/instance.proto) it is `[\p{Ll}\p{Lo}][\p{Ll}\p{Lo}\p{N}_-]{0,62}` (shown above as `\p{Ll}\p{Lo}{0,62}`); the label value expression is shown intact.
- Corrected from the official docs (the Discovery text above is verbatim): Discovery dropped the bracket expressions from the backup ID regular expression; in google/bigtable/admin/v2/bigtable_table_admin.proto (googleapis commit 97f6460, https://github.com/googleapis/googleapis/blob/97f6460c3558c1435d7fd001a9251f8df058ae2f/google/bigtable/admin/v2/bigtable_table_admin.proto) it is `[_a-zA-Z0-9][-_.a-zA-Z0-9]*` (shown above as `_a-zA-Z0-9*`).
- Descriptions are verbatim from Discovery, which drops angle-bracket placeholders of the source comments: a format such as `projects//locations/global` stands for `projects/{project}/locations/global` (likewise `"@.iam.gserviceaccount.com"` lost the account ID before `@`, and a name format ending in a collection such as `projects/*/locations/*/registrations/` lost its last ID), and an expression such as `... && in labels` lost its left operand (for example `'label_value' in labels`). Check the method or field in the product's REST reference before relying on such a format.
- Source: https://bigtableadmin.googleapis.com/$discovery/rest?version=v2 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
