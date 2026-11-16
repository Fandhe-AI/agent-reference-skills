---
source: https://spanner.googleapis.com/$discovery/rest?version=v1
---

# Cloud Spanner API message schemas (spanner) (part 1/2)

## Signature / Usage

Message types referenced by the methods listed under `references/rest/spanner/`.

### `Ack`

- Arguments to ack operations.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `ignoreNotFound` | boolean | By default, an attempt to ack a message that does not exist will fail with a `NOT_FOUND` error. With `ignore_not_found` set to true, the ack will succeed even if the message does not exist. This is useful for unconditionally acking a message, even if it is missing or has already been acked. |
| `key` | array<any> | Required. The primary key of the message to be acked. |
| `queue` | string | Required. The queue where the message to be acked is stored. |

### `AdaptMessageRequest`

- Message sent by the client to the adapter.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `attachments` | object | Optional. Opaque request state passed by the client to the server. |
| `payload` | string (byte) | Optional. Uninterpreted bytes from the underlying wire protocol. |
| `protocol` | string | Required. Identifier for the underlying wire protocol. |

### `AdaptMessageResponse`

- Message sent by the adapter to the client.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `last` | boolean | Optional. Indicates whether this is the last AdaptMessageResponse in the stream. This field may be optionally set by the server. Clients should not rely on this field being set in all cases. |
| `payload` | string (byte) | Optional. Uninterpreted bytes from the underlying wire protocol. |
| `stateUpdates` | object | Optional. Opaque state updates to be applied by the client. |

### `AdapterSession`

- A session in the Cloud Spanner Adapter API.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `name` | string | Identifier. The name of the session. This is always system-assigned. |

### `AddSplitPointsRequest`

- The request for AddSplitPoints.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `initiator` | string | Optional. A user-supplied tag associated with the split points. For example, "initial_data_load", "special_event_1". Defaults to "CloudAddSplitPointsAPI" if not specified. The length of the tag must not exceed 50 characters, or else it is trimmed. Only valid UTF8 characters are allowed. |
| `splitPoints` | array<SplitPoints> | Required. The split points to add. |

### `AddSplitPointsResponse`

- The response for AddSplitPoints.
- Version: v1

### `AsymmetricAutoscalingOption`

- AsymmetricAutoscalingOption specifies the scaling of replicas identified by the given selection.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `overrides` | AutoscalingConfigOverrides | Optional. Overrides applied to the top-level autoscaling configuration for the selected replicas. |
| `replicaSelection` | InstanceReplicaSelection | Required. Selects the replicas to which this AsymmetricAutoscalingOption applies. Only read-only replicas are supported. |

### `AutoscalingConfig`

- Autoscaling configuration for an instance.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `asymmetricAutoscalingOptions` | array<AsymmetricAutoscalingOption> | Optional. Optional asymmetric autoscaling options. Replicas matching the replica selection criteria will be autoscaled independently from other replicas. The autoscaler will scale the replicas based on the utilization of replicas identified by the replica selection. Replica selections should not overlap with each other. Other replicas (those do not match any replica selection) will be autoscaled together and will have the same compute capacity allocated to them. |
| `autoscalingLimits` | AutoscalingLimits | Required. Autoscaling limits for an instance. |
| `autoscalingTargets` | AutoscalingTargets | Required. The autoscaling targets for an instance. |

### `AutoscalingConfigOverrides`

- Overrides the top-level autoscaling configuration for the replicas identified by `replica_selection`. All fields in this message are optional. Any unspecified fields will use the corresponding values from the top-level autoscaling configuration.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `autoscalingLimits` | AutoscalingLimits | Optional. If specified, overrides the min/max limit in the top-level autoscaling configuration for the selected replicas. |
| `autoscalingTargetHighPriorityCpuUtilizationPercent` | integer (int32) | Optional. If specified, overrides the autoscaling target high_priority_cpu_utilization_percent in the top-level autoscaling configuration for the selected replicas. |
| `autoscalingTargetTotalCpuUtilizationPercent` | integer (int32) | Optional. If specified, overrides the autoscaling target `total_cpu_utilization_percent` in the top-level autoscaling configuration for the selected replicas. |
| `disableHighPriorityCpuAutoscaling` | boolean | Optional. If true, disables high priority CPU autoscaling for the selected replicas and ignores high_priority_cpu_utilization_percent in the top-level autoscaling configuration. When setting this field to true, setting autoscaling_target_high_priority_cpu_utilization_percent field to a non-zero value for the same replica is not supported. If false, the autoscaling_target_high_priority_cpu_utilization_percent field in the replica will be used if set to a non-zero value. Otherwise, the high_priority_cpu_utilization_percent field in the top-level autoscaling configuration will be used. Setting both disable_high_priority_cpu_autoscaling and disable_total_cpu_autoscaling to true for the same replica is not supported. |
| `disableTotalCpuAutoscaling` | boolean | Optional. If true, disables total CPU autoscaling for the selected replicas and ignores total_cpu_utilization_percent in the top-level autoscaling configuration. When setting this field to true, setting autoscaling_target_total_cpu_utilization_percent field to a non-zero value for the same replica is not supported. If false, the autoscaling_target_total_cpu_utilization_percent field in the replica will be used if set to a non-zero value. Otherwise, the total_cpu_utilization_percent field in the top-level autoscaling configuration will be used. Setting both disable_high_priority_cpu_autoscaling and disable_total_cpu_autoscaling to true for the same replica is not supported. |

### `AutoscalingLimits`

- The autoscaling limits for the instance. Users can define the minimum and maximum compute capacity allocated to the instance, and the autoscaler will only scale within that range. Users can either use nodes or processing units to specify the limits, but should use the same unit to set both the min_limit and max_limit.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `maxNodes` | integer (int32) | Maximum number of nodes allocated to the instance. If set, this number should be greater than or equal to min_nodes. |
| `maxProcessingUnits` | integer (int32) | Maximum number of processing units allocated to the instance. If set, this number should be multiples of 1000 and be greater than or equal to min_processing_units. |
| `minNodes` | integer (int32) | Minimum number of nodes allocated to the instance. If set, this number should be greater than or equal to 1. |
| `minProcessingUnits` | integer (int32) | Minimum number of processing units allocated to the instance. If set, this number should be multiples of 1000. |

### `AutoscalingTargets`

- The autoscaling targets for an instance.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `highPriorityCpuUtilizationPercent` | integer (int32) | Optional. The target high priority cpu utilization percentage that the autoscaler should be trying to achieve for the instance. This number is on a scale from 0 (no utilization) to 100 (full utilization). The valid range is \[10, 90\] inclusive. If not specified or set to 0, the autoscaler skips scaling based on high priority CPU utilization. |
| `storageUtilizationPercent` | integer (int32) | Required. The target storage utilization percentage that the autoscaler should be trying to achieve for the instance. This number is on a scale from 0 (no utilization) to 100 (full utilization). The valid range is \[10, 99\] inclusive. |
| `totalCpuUtilizationPercent` | integer (int32) | Optional. The target total CPU utilization percentage that the autoscaler should be trying to achieve for the instance. This number is on a scale from 0 (no utilization) to 100 (full utilization). The valid range is \[10, 90\] inclusive. If not specified or set to 0, the autoscaler skips scaling based on total CPU utilization. If both `high_priority_cpu_utilization_percent` and `total_cpu_utilization_percent` are specified, the autoscaler provisions the larger of the two required compute capacities to satisfy both targets. |

### `Backup`

- A backup of a Cloud Spanner database.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `backupSchedules` | array<string> | Output only. List of backup schedule URIs that are associated with creating this backup. This is only applicable for scheduled backups, and is empty for on-demand backups. To optimize for storage, whenever possible, multiple schedules are collapsed together to create one backup. In such cases, this field captures the list of all backup schedule URIs that are associated with creating this backup. If collapsing is not done, then this field captures the single backup schedule URI associated with creating this backup. |
| `createTime` | string (google-datetime) | Output only. The time the CreateBackup request is received. If the request does not specify `version_time`, the `version_time` of the backup will be equivalent to the `create_time`. |
| `database` | string | Required for the CreateBackup operation. Name of the database from which this backup was created. This needs to be in the same instance as the backup. Values are of the form `projects/{project}/instances/{instance}/databases/{database}`. |
| `databaseDialect` | string enum | Output only. The database dialect information for the backup. Values: `DATABASE_DIALECT_UNSPECIFIED`, `GOOGLE_STANDARD_SQL`, `POSTGRESQL`. |
| `encryptionInfo` | EncryptionInfo | Output only. The encryption information for the backup. |
| `encryptionInformation` | array<EncryptionInfo> | Output only. The encryption information for the backup, whether it is protected by one or more KMS keys. The information includes all Cloud KMS key versions used to encrypt the backup. The `encryption_status` field inside of each `EncryptionInfo` is not populated. At least one of the key versions must be available for the backup to be restored. If a key version is revoked in the middle of a restore, the restore behavior is undefined. |
| `exclusiveSizeBytes` | string (int64) | Output only. For a backup in an incremental backup chain, this is the storage space needed to keep the data that has changed since the previous backup. For all other backups, this is always the size of the backup. This value may change if backups on the same chain get deleted or expired. This field can be used to calculate the total storage space used by a set of backups. For example, the total space used by all backups of a database can be computed by summing up this field. |
| `expireTime` | string (google-datetime) | Required for the CreateBackup operation. The expiration time of the backup, with microseconds granularity that must be at least 6 hours and at most 366 days from the time the CreateBackup request is processed. Once the `expire_time` has passed, the backup is eligible to be automatically deleted by Cloud Spanner to free the resources used by the backup. |
| `freeableSizeBytes` | string (int64) | Output only. The number of bytes that will be freed by deleting this backup. This value will be zero if, for example, this backup is part of an incremental backup chain and younger backups in the chain require that we keep its data. For backups not in an incremental backup chain, this is always the size of the backup. This value may change if backups on the same chain get created, deleted or expired. |
| `incrementalBackupChainId` | string | Output only. Populated only for backups in an incremental backup chain. Backups share the same chain id if and only if they belong to the same incremental backup chain. Use this field to determine which backups are part of the same incremental backup chain. The ordering of backups in the chain can be determined by ordering the backup `version_time`. |
| `instancePartitions` | array<BackupInstancePartition> | Output only. The instance partition storing the backup. This is the same as the list of the instance partitions that the database recorded at the backup's `version_time`. |
| `maxExpireTime` | string (google-datetime) | Output only. The max allowed expiration time of the backup, with microseconds granularity. A backup's expiration time can be configured in multiple APIs: CreateBackup, UpdateBackup, CopyBackup. When updating or copying an existing backup, the expiration time specified must be less than `Backup.max_expire_time`. |
| `minimumRestorableEdition` | string enum | Output only. The minimum edition required to successfully restore the backup. Populated only if the edition is Enterprise or Enterprise Plus. Values: `EDITION_UNSPECIFIED`, `STANDARD`, `ENTERPRISE`, `ENTERPRISE_PLUS`. |
| `name` | string | Output only for the CreateBackup operation. Required for the UpdateBackup operation. A globally unique identifier for the backup which cannot be changed. Values are of the form `projects/{project}/instances/{instance}/backups/a-z*[a-z0-9]` The final segment of the name must be between 2 and 60 characters in length. The backup is stored in the location(s) specified in the instance configuration of the instance containing the backup, identified by the prefix of the backup name of the form `projects/{project}/instances/{instance}`. |
| `oldestVersionTime` | string (google-datetime) | Output only. Data deleted at a time older than this is guaranteed not to be retained in order to support this backup. For a backup in an incremental backup chain, this is the version time of the oldest backup that exists or ever existed in the chain. For all other backups, this is the version time of the backup. This field can be used to understand what data is being retained by the backup system. |
| `referencingBackups` | array<string> | Output only. The names of the destination backups being created by copying this source backup. The backup names are of the form `projects/{project}/instances/{instance}/backups/{backup}`. Referencing backups may exist in different instances. The existence of any referencing backup prevents the backup from being deleted. When the copy operation is done (either successfully completed or cancelled or the destination backup is deleted), the reference to the backup is removed. |
| `referencingDatabases` | array<string> | Output only. The names of the restored databases that reference the backup. The database names are of the form `projects/{project}/instances/{instance}/databases/{database}`. Referencing databases may exist in different instances. The existence of any referencing database prevents the backup from being deleted. When a restored database from the backup enters the `READY` state, the reference to the backup is removed. |
| `sizeBytes` | string (int64) | Output only. Size of the backup in bytes. For a backup in an incremental backup chain, this is the sum of the `exclusive_size_bytes` of itself and all older backups in the chain. |
| `state` | string enum | Output only. The current state of the backup. Values: `STATE_UNSPECIFIED`, `CREATING`, `READY`. |
| `versionTime` | string (google-datetime) | The backup will contain an externally consistent copy of the database at the timestamp specified by `version_time`. If `version_time` is not specified, the system will set `version_time` to the `create_time` of the backup. |

### `BackupInfo`

- Information about a backup.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `backup` | string | Name of the backup. |
| `createTime` | string (google-datetime) | The time the CreateBackup request was received. |
| `sourceDatabase` | string | Name of the database the backup was created from. |
| `versionTime` | string (google-datetime) | The backup contains an externally consistent copy of `source_database` at the timestamp specified by `version_time`. If the CreateBackup request did not specify `version_time`, the `version_time` of the backup is equivalent to the `create_time`. |

### `BackupInstancePartition`

- Instance partition information for the backup.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `instancePartition` | string | A unique identifier for the instance partition. Values are of the form `projects/{project}/instances/{instance}/instancePartitions/{instance_partition_id}` |

### `BackupSchedule`

- BackupSchedule expresses the automated backup creation specification for a Spanner database.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `encryptionConfig` | CreateBackupEncryptionConfig | Optional. The encryption configuration that is used to encrypt the backup. If this field is not specified, the backup uses the same encryption configuration as the database. |
| `fullBackupSpec` | FullBackupSpec | The schedule creates only full backups. |
| `incrementalBackupSpec` | IncrementalBackupSpec | The schedule creates incremental backup chains. |
| `name` | string | Identifier. Output only for the CreateBackupSchedule operation. Required for the UpdateBackupSchedule operation. A globally unique identifier for the backup schedule which cannot be changed. Values are of the form `projects//instances//databases//backupSchedules/a-z*[a-z0-9]` The final segment of the name must be between 2 and 60 characters in length. |
| `retentionDuration` | string (google-duration) | Optional. The retention duration of a backup that must be at least 6 hours and at most 366 days. The backup is eligible to be automatically deleted once the retention period has elapsed. |
| `spec` | BackupScheduleSpec | Optional. The schedule specification based on which the backup creations are triggered. |
| `updateTime` | string (google-datetime) | Output only. The timestamp at which the schedule was last updated. If the schedule has never been updated, this field contains the timestamp when the schedule was first created. |

### `BackupScheduleSpec`

- Defines specifications of the backup schedule.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `cronSpec` | CrontabSpec | Cron style schedule specification. |

### `BatchCreateSessionsRequest`

- The request for BatchCreateSessions.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `sessionCount` | integer (int32) | Required. The number of sessions to be created in this batch call. At least one session is created. The API can return fewer than the requested number of sessions. If a specific number of sessions are desired, the client can make additional calls to `BatchCreateSessions` (adjusting session_count as necessary). |
| `sessionTemplate` | Session | Parameters to apply to each created session. |

### `BatchCreateSessionsResponse`

- The response for BatchCreateSessions.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `session` | array<Session> | The freshly created sessions. |

### `BatchWriteRequest`

- The request for BatchWrite.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `excludeTxnFromChangeStreams` | boolean | Optional. If you don't set the `exclude_txn_from_change_streams` option or if it's set to `false`, then any change streams monitoring columns modified by transactions will capture the updates made within that transaction. |
| `mutationGroups` | array<MutationGroup> | Required. The groups of mutations to be applied. |
| `requestOptions` | RequestOptions | Common options for this request. |

### `BatchWriteResponse`

- The result of applying a batch of mutations.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `commitTimestamp` | string (google-datetime) | The commit timestamp of the transaction that applied this batch. Present if status is OK and the mutation groups were applied, absent otherwise. For mutation groups with conditions, a status=OK and missing commit_timestamp means that the mutation groups were not applied due to the condition not being satisfied after evaluation. |
| `indexes` | array<integer> | The mutation groups applied in this batch. The values index into the `mutation_groups` field in the corresponding `BatchWriteRequest`. |
| `status` | Status | An `OK` status indicates success. Any other status indicates a failure. |

### `BeginTransactionRequest`

- The request for BeginTransaction.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `mutationKey` | Mutation | Optional. Required for read-write transactions on a multiplexed session that commit mutations but don't perform any reads or queries. You must randomly select one of the mutations from the mutation set and send it as a part of this request. |
| `options` | TransactionOptions | Required. Options for the new transaction. |
| `requestOptions` | RequestOptions | Common options for this request. Priority is ignored for this request. Setting the priority in this `request_options` struct doesn't do anything. To set the priority for a transaction, set it on the reads and writes that are part of this transaction instead. |

### `Binding`

- Associates `members`, or principals, with a `role`.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `condition` | Expr | The condition that is associated with this binding. If the condition evaluates to `true`, then this binding applies to the current request. If the condition evaluates to `false`, then this binding does not apply to the current request. However, a different role binding might grant the same role to one or more of the principals in this binding. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |
| `members` | array<string> | Specifies the principals requesting access for a Google Cloud resource. `members` can have the following values: \* `allUsers`: A special identifier that represents anyone who is on the internet; with or without a Google account. \* `allAuthenticatedUsers`: A special identifier that represents anyone who is authenticated with a Google account or a service account. Does not include identities that come from external identity providers (IdPs) through identity federation. \* `user:{emailid}`: An email address that represents a specific Google account. For example, `alice@example.com` . \* `serviceAccount:{emailid}`: An email address that represents a Google service account. For example, `my-other-app@appspot.gserviceaccount.com`. \* `serviceAccount:{projectid}.svc.id.goog[{namespace}/{kubernetes-sa}]`: An identifier for a Kubernetes service account (https://cloud.google.com/kubernetes-engine/docs/how-to/kubernetes-service-accounts). For example, `my-project.svc.id.goog[my-namespace/my-kubernetes-sa]`. \* `group:{emailid}`: An email address that represents a Google group. For example, `admins@example.com`. \* `domain:{domain}`: The G Suite domain (primary) that represents all the users of that domain. For example, `google.com` or `example.com`. \* `principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workforce identity pool. \* `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/group/{group_id}`: All workforce identities in a group. \* `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All workforce identities with a specific attribute value. \* `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/*`: All identities in a workforce identity pool. \* `principal://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workload identity pool. \* `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/group/{group_id}`: A workload identity pool group. \* `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All identities in a workload identity pool with a certain attribute. \* `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/*`: All identities in a workload identity pool. \* `deleted:user:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a user that has been recently deleted. For example, `alice@example.com?uid=123456789012345678901`. If the user is recovered, this value reverts to `user:{emailid}` and the recovered user retains the role in the binding. \* `deleted:serviceAccount:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a service account that has been recently deleted. For example, `my-other-app@appspot.gserviceaccount.com?uid=123456789012345678901`. If the service account is undeleted, this value reverts to `serviceAccount:{emailid}` and the undeleted service account retains the role in the binding. \* `deleted:group:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a Google group that has been recently deleted. For example, `admins@example.com?uid=123456789012345678901`. If the group is recovered, this value reverts to `group:{emailid}` and the recovered group retains the role in the binding. \* `deleted:principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: Deleted single identity in a workforce identity pool. For example, `deleted:principal://iam.googleapis.com/locations/global/workforcePools/my-pool-id/subject/my-subject-attribute-value`. |
| `role` | string | Role that is assigned to the list of `members`, or principals. For example, `roles/viewer`, `roles/editor`, or `roles/owner`. For an overview of the IAM roles and permissions, see the IAM documentation (https://cloud.google.com/iam/docs/roles-overview). For a list of the available pre-defined roles, see here (https://cloud.google.com/iam/docs/understanding-roles). |

### `ChangeQuorumMetadata`

- Metadata type for the long-running operation returned by ChangeQuorum.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `endTime` | string (google-datetime) | If set, the time at which this operation failed or was completed successfully. |
| `request` | ChangeQuorumRequest | The request for ChangeQuorum. |
| `startTime` | string (google-datetime) | Time the request was received. |

### `ChangeQuorumRequest`

- The request for ChangeQuorum.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `etag` | string | Optional. The etag is the hash of the `QuorumInfo`. The `ChangeQuorum` operation is only performed if the etag matches that of the `QuorumInfo` in the current database resource. Otherwise the API returns an `ABORTED` error. The etag is used for optimistic concurrency control as a way to help prevent simultaneous change quorum requests that could create a race condition. |
| `name` | string | Required. Name of the database in which to apply `ChangeQuorum`. Values are of the form `projects//instances//databases/`. |
| `quorumType` | QuorumType | Required. The type of this quorum. |

### `ChangeStreamRecord`

- Spanner Change Streams enable customers to capture and stream out changes to their Spanner databases in real-time. A change stream can be created with option partition_mode='IMMUTABLE_KEY_RANGE' or partition_mode='MUTABLE_KEY_RANGE'. This message is only used in Change Streams created with the option partition_mode='MUTABLE_KEY_RANGE'. Spanner automatically creates a special Table-Valued Function (TVF) along with each Change Streams. The function provides access to the change stream's records. The function is named READ\_ (where is the name of the change stream), and it returns a table with only one column called ChangeRecord.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `dataChangeRecord` | DataChangeRecord | Data change record describing a data change for a change stream partition. |
| `heartbeatRecord` | HeartbeatRecord | Heartbeat record describing a heartbeat for a change stream partition. |
| `partitionEndRecord` | PartitionEndRecord | Partition end record describing a terminated change stream partition. |
| `partitionEventRecord` | PartitionEventRecord | Partition event record describing key range changes for a change stream partition. |
| `partitionStartRecord` | PartitionStartRecord | Partition start record describing a new change stream partition. |

### `ChildLink`

- Metadata associated with a parent-child relationship appearing in a PlanNode.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `childIndex` | integer (int32) | The node to which the link points. |
| `type` | string | The type of the link. For example, in Hash Joins this could be used to distinguish between the build child and the probe child, or in the case of the child being an output variable, to represent the tag associated with the output variable. |
| `variable` | string | Only present if the child node is SCALAR and corresponds to an output variable of the parent node. The field carries the name of the output variable. For example, a `TableScan` operator that reads rows from a table will have child links to the `SCALAR` nodes representing the output variables created for each column that is read by the operator. The corresponding `variable` fields will be set to the variable names assigned to the columns. |

### `ClientContext`

- Container for various pieces of client-owned context attached to a request.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `secureContext` | object | Optional. Map of parameter name to value for this request. These values will be returned by any SECURE_CONTEXT() calls invoked by this request (e.g., by queries against Parameterized Secure Views). |

### `ColumnMetadata`

- Metadata for a column.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `isPrimaryKey` | boolean | Indicates whether the column is a primary key column. |
| `name` | string | Name of the column. |
| `ordinalPosition` | string (int64) | Ordinal position of the column based on the original table definition in the schema starting with a value of 1. |
| `type` | Type | Type of the column. |

### `CommitRequest`

- The request for Commit.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `maxCommitDelay` | string (google-duration) | Optional. The amount of latency this request is configured to incur in order to improve throughput. If this field isn't set, Spanner assumes requests are relatively latency sensitive and automatically determines an appropriate delay time. You can specify a commit delay value between 0 and 500 ms. |
| `mutations` | array<Mutation> | The mutations to be executed when this transaction commits. All mutations are applied atomically, in the order they appear in this list. |
| `precommitToken` | MultiplexedSessionPrecommitToken | Optional. If the read-write transaction was executed on a multiplexed session, then you must include the precommit token with the highest sequence number received in this transaction attempt. Failing to do so results in a `FailedPrecondition` error. |
| `requestOptions` | RequestOptions | Common options for this request. |
| `returnCommitStats` | boolean | If `true`, then statistics related to the transaction is included in the CommitResponse. Default value is `false`. |
| `singleUseTransaction` | TransactionOptions | Execute mutations in a temporary transaction. Note that unlike commit of a previously-started transaction, commit with a temporary transaction is non-idempotent. That is, if the `CommitRequest` is sent to Cloud Spanner more than once (for instance, due to retries in the application, or in the transport library), it's possible that the mutations are executed more than once. If this is undesirable, use BeginTransaction and Commit instead. |
| `transactionId` | string (byte) | Commit a previously-started transaction. |

### `CommitResponse`

- The response for Commit.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `commitStats` | CommitStats | The statistics about this `Commit`. Not returned by default. For more information, see CommitRequest.return_commit_stats. |
| `commitTimestamp` | string (google-datetime) | The Cloud Spanner timestamp at which the transaction committed. |
| `isolationLevel` | string enum | The isolation level used for the read-write transaction. Values: `ISOLATION_LEVEL_UNSPECIFIED`, `SERIALIZABLE`, `REPEATABLE_READ`. |
| `precommitToken` | MultiplexedSessionPrecommitToken | If specified, transaction has not committed yet. You must retry the commit with the new precommit token. |
| `readLockMode` | string enum | The read lock mode used for the read-write transaction. Values: `READ_LOCK_MODE_UNSPECIFIED`, `PESSIMISTIC`, `OPTIMISTIC`. |
| `snapshotTimestamp` | string (google-datetime) | If `TransactionOptions.isolation_level` is set to `IsolationLevel.REPEATABLE_READ`, then the snapshot timestamp is the timestamp at which all reads in the transaction ran. This timestamp is never returned. |

### `CommitStats`

- Additional statistics about a commit.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `mutationCount` | string (int64) | The total number of mutations for the transaction. Knowing the `mutation_count` value can help you maximize the number of mutations in a transaction and minimize the number of API round trips. You can also monitor this value to prevent transactions from exceeding the system limit (https://cloud.google.com/spanner/quotas#limits_for_creating_reading_updating_and_deleting_data). If the number of mutations exceeds the limit, the server returns INVALID_ARGUMENT (https://cloud.google.com/spanner/docs/reference/rest/v1/Code#ENUM_VALUES.INVALID_ARGUMENT). |

### `CompactDatabaseMetadata`

- Metadata type for the long-running operation returned by `CALL compact_all()`, which can be executed using ExecuteSql or ExecuteStreamingSql APIs.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `cancelTime` | string (google-datetime) | Output only. The time at which cancellation of this operation was received. Operations.CancelOperation starts asynchronous cancellation on a long-running operation. The server makes a best effort to cancel the operation, but success is not guaranteed. Clients can use Operations.GetOperation or other methods to check whether the cancellation succeeded or whether the operation completed despite cancellation. On successful cancellation, the operation is not deleted; instead, it becomes an operation with an Operation.error value with a google.rpc.Status.code of 1, corresponding to `Code.CANCELLED`. |
| `database` | string | Output only. The database being compacted. |
| `progress` | OperationProgress | Output only. The progress of the compaction operation. |

### `ContextValue`

- A message representing context for a KeyRangeInfo, including a label, value, unit, and severity.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `label` | LocalizedString | The label for the context value. e.g. "latency". |
| `severity` | string enum | The severity of this context. Values: `SEVERITY_UNSPECIFIED`, `INFO`, `WARNING`, `ERROR`, `FATAL`. |
| `unit` | string | The unit of the context value. |
| `value` | number (float) | The value for the context. |

### `CopyBackupEncryptionConfig`

- Encryption configuration for the copied backup.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `encryptionType` | string enum | Required. The encryption type of the backup. Values: `ENCRYPTION_TYPE_UNSPECIFIED`, `USE_CONFIG_DEFAULT_OR_BACKUP_ENCRYPTION`, `GOOGLE_DEFAULT_ENCRYPTION`, `CUSTOMER_MANAGED_ENCRYPTION`. |
| `kmsKeyName` | string | Optional. This field is maintained for backwards compatibility. For new callers, we recommend using `kms_key_names` to specify the KMS key. Only use `kms_key_name` if the location of the KMS key matches the database instance's configuration (location) exactly. For example, if the KMS location is in `us-central1` or `nam3`, then the database instance must also be in `us-central1` or `nam3`. The Cloud KMS key that is used to encrypt and decrypt the restored database. Set this field only when encryption_type is `CUSTOMER_MANAGED_ENCRYPTION`. Values are of the form `projects/{project}/locations/{location}/keyRings/{key_ring}/cryptoKeys/{kms_key_name}`. |
| `kmsKeyNames` | array<string> | Optional. Specifies the KMS configuration for the one or more keys used to protect the backup. Values are of the form `projects/{project}/locations/{location}/keyRings/{key_ring}/cryptoKeys/{kms_key_name}`. KMS keys specified can be in any order. The keys referenced by `kms_key_names` must fully cover all regions of the backup's instance configuration. Some examples: \* For regional (single-region) instance configurations, specify a regional location KMS key. \* For multi-region instance configurations of type `GOOGLE_MANAGED`, either specify a multi-region location KMS key or multiple regional location KMS keys that cover all regions in the instance configuration. \* For an instance configuration of type `USER_MANAGED`, specify only regional location KMS keys to cover each region in the instance configuration. Multi-region location KMS keys aren't supported for `USER_MANAGED` type instance configurations. |

### `CopyBackupMetadata`

- Metadata type for the operation returned by CopyBackup.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `cancelTime` | string (google-datetime) | The time at which cancellation of CopyBackup operation was received. Operations.CancelOperation starts asynchronous cancellation on a long-running operation. The server makes a best effort to cancel the operation, but success is not guaranteed. Clients can use Operations.GetOperation or other methods to check whether the cancellation succeeded or whether the operation completed despite cancellation. On successful cancellation, the operation is not deleted; instead, it becomes an operation with an Operation.error value with a google.rpc.Status.code of 1, corresponding to `Code.CANCELLED`. |
| `name` | string | The name of the backup being created through the copy operation. Values are of the form `projects/{project}/instances/{instance}/backups/{backup}`. |
| `progress` | OperationProgress | The progress of the CopyBackup operation. |
| `sourceBackup` | string | The name of the source backup that is being copied. Values are of the form `projects/{project}/instances/{instance}/backups/{backup}`. |

### `CopyBackupRequest`

- The request for CopyBackup.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `backupId` | string | Required. The id of the backup copy. The `backup_id` appended to `parent` forms the full backup_uri of the form `projects/{project}/instances/{instance}/backups/{backup}`. |
| `encryptionConfig` | CopyBackupEncryptionConfig | Optional. The encryption configuration used to encrypt the backup. If this field is not specified, the backup will use the same encryption configuration as the source backup by default, namely encryption_type = `USE_CONFIG_DEFAULT_OR_BACKUP_ENCRYPTION`. |
| `expireTime` | string (google-datetime) | Required. The expiration time of the backup in microsecond granularity. The expiration time must be at least 6 hours and at most 366 days from the `create_time` of the source backup. Once the `expire_time` has passed, the backup is eligible to be automatically deleted by Cloud Spanner to free the resources used by the backup. |
| `sourceBackup` | string | Required. The source backup to be copied. The source backup needs to be in READY state for it to be copied. Once CopyBackup is in progress, the source backup cannot be deleted or cleaned up on expiration until CopyBackup is finished. Values are of the form: `projects/{project}/instances/{instance}/backups/{backup}`. |

### `CreateBackupEncryptionConfig`

- Encryption configuration for the backup to create.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `encryptionType` | string enum | Required. The encryption type of the backup. Values: `ENCRYPTION_TYPE_UNSPECIFIED`, `USE_DATABASE_ENCRYPTION`, `GOOGLE_DEFAULT_ENCRYPTION`, `CUSTOMER_MANAGED_ENCRYPTION`. |
| `kmsKeyName` | string | Optional. This field is maintained for backwards compatibility. For new callers, we recommend using `kms_key_names` to specify the KMS key. Only use `kms_key_name` if the location of the KMS key matches the database instance's configuration (location) exactly. For example, if the KMS location is in `us-central1` or `nam3`, then the database instance must also be in `us-central1` or `nam3`. The Cloud KMS key that is used to encrypt and decrypt the restored database. Set this field only when encryption_type is `CUSTOMER_MANAGED_ENCRYPTION`. Values are of the form `projects/{project}/locations/{location}/keyRings/{key_ring}/cryptoKeys/{kms_key_name}`. |
| `kmsKeyNames` | array<string> | Optional. Specifies the KMS configuration for the one or more keys used to protect the backup. Values are of the form `projects/{project}/locations/{location}/keyRings/{key_ring}/cryptoKeys/{kms_key_name}`. The keys referenced by `kms_key_names` must fully cover all regions of the backup's instance configuration. Some examples: \* For regional (single-region) instance configurations, specify a regional location KMS key. \* For multi-region instance configurations of type `GOOGLE_MANAGED`, either specify a multi-region location KMS key or multiple regional location KMS keys that cover all regions in the instance configuration. \* For an instance configuration of type `USER_MANAGED`, specify only regional location KMS keys to cover each region in the instance configuration. Multi-region location KMS keys aren't supported for `USER_MANAGED` type instance configurations. |

### `CreateBackupMetadata`

- Metadata type for the operation returned by CreateBackup.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `cancelTime` | string (google-datetime) | The time at which cancellation of this operation was received. Operations.CancelOperation starts asynchronous cancellation on a long-running operation. The server makes a best effort to cancel the operation, but success is not guaranteed. Clients can use Operations.GetOperation or other methods to check whether the cancellation succeeded or whether the operation completed despite cancellation. On successful cancellation, the operation is not deleted; instead, it becomes an operation with an Operation.error value with a google.rpc.Status.code of 1, corresponding to `Code.CANCELLED`. |
| `database` | string | The name of the database the backup is created from. |
| `name` | string | The name of the backup being created. |
| `progress` | OperationProgress | The progress of the CreateBackup operation. |

### `CreateDatabaseMetadata`

- Metadata type for the operation returned by CreateDatabase.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `database` | string | The database being created. |

### `CreateDatabaseRequest`

- The request for CreateDatabase.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `createStatement` | string | Required. A `CREATE DATABASE` statement, which specifies the ID of the new database. The database ID must conform to the regular expression `a-z*[a-z0-9]` and be between 2 and 30 characters in length. If the database ID is a reserved word or if it contains a hyphen, the database ID must be enclosed in backticks (`` ` `\`). |
| `databaseDialect` | string enum | Optional. The dialect of the Cloud Spanner Database. Values: `DATABASE_DIALECT_UNSPECIFIED`, `GOOGLE_STANDARD_SQL`, `POSTGRESQL`. |
| `encryptionConfig` | EncryptionConfig | Optional. The encryption configuration for the database. If this field is not specified, Cloud Spanner will encrypt/decrypt all data at rest using Google default encryption. |
| `extraStatements` | array<string> | Optional. A list of DDL statements to run inside the newly created database. Statements can create tables, indexes, etc. These statements execute atomically with the creation of the database: if there is an error in any statement, the database is not created. |
| `protoDescriptors` | string (byte) | Optional. Proto descriptors used by `CREATE/ALTER PROTO BUNDLE` statements in 'extra_statements'. Contains a protobuf-serialized `google.protobuf.FileDescriptorSet` (https://github.com/protocolbuffers/protobuf/blob/main/src/google/protobuf/descriptor.proto) descriptor set. To generate it, install (https://grpc.io/docs/protoc-installation/) and run `protoc` with --include_imports and --descriptor_set_out. For example, to generate for moon/shot/app.proto, run $protoc --proto_path=/app_path --proto_path=/lib_path \ --include_imports \ --descriptor_set_out=descriptors.data \ moon/shot/app.proto For more details, see protobuffer self description (https://developers.google.com/protocol-buffers/docs/techniques#self-description). |

### `CreateInstanceConfigMetadata`

- Metadata type for the operation returned by CreateInstanceConfig.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `cancelTime` | string (google-datetime) | The time at which this operation was cancelled. |
| `instanceConfig` | InstanceConfig | The target instance configuration end state. |
| `progress` | InstanceOperationProgress | The progress of the CreateInstanceConfig operation. |

### `CreateInstanceConfigRequest`

- The request for CreateInstanceConfig.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `instanceConfig` | InstanceConfig | Required. The `InstanceConfig` proto of the configuration to create. `instance_config.name` must be `/instanceConfigs/`. `instance_config.base_config` must be a Google-managed configuration name, e.g. /instanceConfigs/us-east1, /instanceConfigs/nam3. |
| `instanceConfigId` | string | Required. The ID of the instance configuration to create. Valid identifiers are of the form `custom-[-a-z0-9]*[a-z0-9]` and must be between 2 and 64 characters in length. The `custom-` prefix is required to avoid name conflicts with Google-managed configurations. |
| `validateOnly` | boolean | An option to validate, but not actually execute, a request, and provide the same response. |

### `CreateInstanceMetadata`

- Metadata type for the operation returned by CreateInstance.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `cancelTime` | string (google-datetime) | The time at which this operation was cancelled. If set, this operation is in the process of undoing itself (which is guaranteed to succeed) and cannot be cancelled again. |
| `endTime` | string (google-datetime) | The time at which this operation failed or was completed successfully. |
| `expectedFulfillmentPeriod` | string enum | The expected fulfillment period of this create operation. Values: `FULFILLMENT_PERIOD_UNSPECIFIED`, `FULFILLMENT_PERIOD_NORMAL`, `FULFILLMENT_PERIOD_EXTENDED`. |
| `instance` | Instance | The instance being created. |
| `startTime` | string (google-datetime) | The time at which the CreateInstance request was received. |

### `CreateInstancePartitionMetadata`

- Metadata type for the operation returned by CreateInstancePartition.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `cancelTime` | string (google-datetime) | The time at which this operation was cancelled. If set, this operation is in the process of undoing itself (which is guaranteed to succeed) and cannot be cancelled again. |
| `endTime` | string (google-datetime) | The time at which this operation failed or was completed successfully. |
| `instancePartition` | InstancePartition | The instance partition being created. |
| `startTime` | string (google-datetime) | The time at which the CreateInstancePartition request was received. |

### `CreateInstancePartitionRequest`

- The request for CreateInstancePartition.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `instancePartition` | InstancePartition | Required. The instance partition to create. The instance_partition.name may be omitted, but if specified must be `/instancePartitions/`. |
| `instancePartitionId` | string | Required. The ID of the instance partition to create. Valid identifiers are of the form `a-z*[a-z0-9]` and must be between 2 and 64 characters in length. |

### `CreateInstanceRequest`

- The request for CreateInstance.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `instance` | Instance | Required. The instance to create. The name may be omitted, but if specified must be `/instances/`. |
| `instanceId` | string | Required. The ID of the instance to create. Valid identifiers are of the form `a-z*[a-z0-9]` and must be between 2 and 64 characters in length. |

### `CreateSessionRequest`

- The request for CreateSession.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `session` | Session | Required. The session to create. |

### `CrontabSpec`

- CrontabSpec can be used to specify the version time and frequency at which the backup is created.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `creationWindow` | string (google-duration) | Output only. Scheduled backups contain an externally consistent copy of the database at the version time specified in `schedule_spec.cron_spec`. However, Spanner might not initiate the creation of the scheduled backups at that version time. Spanner initiates the creation of scheduled backups within the time window bounded by the version_time specified in `schedule_spec.cron_spec` and version_time + `creation_window`. |
| `text` | string | Required. Textual representation of the crontab. User can customize the backup frequency and the backup version time using the cron expression. The version time must be in UTC timezone. The backup will contain an externally consistent copy of the database at the version time. Full backups must be scheduled a minimum of 12 hours apart and incremental backups must be scheduled a minimum of 4 hours apart. Examples of valid cron specifications: \* `0 2/12 * * *` : every 12 hours at (2, 14) hours past midnight in UTC. \* `0 2,14 * * *` : every 12 hours at (2, 14) hours past midnight in UTC. \* `0 */4 * * *` : (incremental backups only) every 4 hours at (0, 4, 8, 12, 16, 20) hours past midnight in UTC. \* `0 2 * * *` : once a day at 2 past midnight in UTC. \* `0 2 * * 0` : once a week every Sunday at 2 past midnight in UTC. \* `0 2 8 * *` : once a month on 8th day at 2 past midnight in UTC. |
| `timeZone` | string | Output only. The time zone of the times in `CrontabSpec.text`. Currently, only UTC is supported. |

### `DataChangeRecord`

- A data change record contains a set of changes to a table with the same modification type (insert, update, or delete) committed at the same commit timestamp in one change stream partition for the same transaction. Multiple data change records can be returned for the same transaction across multiple change stream partitions.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `columnMetadata` | array<ColumnMetadata> | Provides metadata describing the columns associated with the mods listed below. |
| `commitTimestamp` | string (google-datetime) | Indicates the timestamp in which the change was committed. DataChangeRecord.commit_timestamps, PartitionStartRecord.start_timestamps, PartitionEventRecord.commit_timestamps, and PartitionEndRecord.end_timestamps can have the same value in the same partition. |
| `isLastRecordInTransactionInPartition` | boolean | Indicates whether this is the last record for a transaction in the current partition. Clients can use this field to determine when all records for a transaction in the current partition have been received. |
| `isSystemTransaction` | boolean | Indicates whether the transaction is a system transaction. System transactions include those issued by time-to-live (TTL), column backfill, etc. |
| `modType` | string enum | Describes the type of change. Values: `MOD_TYPE_UNSPECIFIED`, `INSERT`, `UPDATE`, `DELETE`. |
| `mods` | array<Mod> | Describes the changes that were made. |
| `numberOfPartitionsInTransaction` | integer (int32) | Indicates the number of partitions that return data change records for this transaction. This value can be helpful in assembling all records associated with a particular transaction. |
| `numberOfRecordsInTransaction` | integer (int32) | Indicates the number of data change records that are part of this transaction across all change stream partitions. This value can be used to assemble all the records associated with a particular transaction. |
| `recordSequence` | string | Record sequence numbers are unique and monotonically increasing (but not necessarily contiguous) for a specific timestamp across record types in the same partition. To guarantee ordered processing, the reader should process records (of potentially different types) in record_sequence order for a specific timestamp in the same partition. The record sequence number ordering across partitions is only meaningful in the context of a specific transaction. Record sequence numbers are unique across partitions for a specific transaction. Sort the DataChangeRecords for the same server_transaction_id by record_sequence to reconstruct the ordering of the changes within the transaction. |
| `serverTransactionId` | string | Provides a globally unique string that represents the transaction in which the change was committed. Multiple transactions can have the same commit timestamp, but each transaction has a unique server_transaction_id. |
| `table` | string | Name of the table affected by the change. |
| `transactionTag` | string | Indicates the transaction tag associated with this transaction. |
| `valueCaptureType` | string enum | Describes the value capture type that was specified in the change stream configuration when this change was captured. Values: `VALUE_CAPTURE_TYPE_UNSPECIFIED`, `OLD_AND_NEW_VALUES`, `NEW_VALUES`, `NEW_ROW`, `NEW_ROW_AND_OLD_VALUES`. |

### `Database`

- A Cloud Spanner database.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. If exists, the time at which the database creation started. |
| `databaseDialect` | string enum | Output only. The dialect of the Cloud Spanner Database. Values: `DATABASE_DIALECT_UNSPECIFIED`, `GOOGLE_STANDARD_SQL`, `POSTGRESQL`. |
| `defaultLeader` | string | Output only. The read-write region which contains the database's leader replicas. This is the same as the value of default_leader database option set using DatabaseAdmin.CreateDatabase or DatabaseAdmin.UpdateDatabaseDdl. If not explicitly set, this is empty. |
| `earliestVersionTime` | string (google-datetime) | Output only. Earliest timestamp at which older versions of the data can be read. This value is continuously updated by Cloud Spanner and becomes stale the moment it is queried. If you are using this value to recover data, make sure to account for the time from the moment when the value is queried to the moment when you initiate the recovery. |
| `enableDropProtection` | boolean | Optional. Whether drop protection is enabled for this database. Defaults to false, if not set. For more details, please see how to prevent accidental database deletion (https://cloud.google.com/spanner/docs/prevent-database-deletion). |
| `encryptionConfig` | EncryptionConfig | Output only. For databases that are using customer managed encryption, this field contains the encryption configuration for the database. For databases that are using Google default or other types of encryption, this field is empty. |
| `encryptionInfo` | array<EncryptionInfo> | Output only. For databases that are using customer managed encryption, this field contains the encryption information for the database, such as all Cloud KMS key versions that are in use. The `encryption_status` field inside of each `EncryptionInfo` is not populated. For databases that are using Google default or other types of encryption, this field is empty. This field is propagated lazily from the backend. There might be a delay from when a key version is being used and when it appears in this field. |
| `name` | string | Required. The name of the database. Values are of the form `projects//instances//databases/`, where `` is as specified in the `CREATE DATABASE` statement. This name can be passed to other API methods to identify the database. |
| `quorumInfo` | QuorumInfo | Output only. Applicable only for databases that use dual-region instance configurations. Contains information about the quorum. |
| `reconciling` | boolean | Output only. If true, the database is being updated. If false, there are no ongoing update operations for the database. |
| `restoreInfo` | RestoreInfo | Output only. Applicable only for restored databases. Contains information about the restore source. |
| `state` | string enum | Output only. The current database state. Values: `STATE_UNSPECIFIED`, `CREATING`, `READY`, `READY_OPTIMIZING`. |
| `versionRetentionPeriod` | string | Output only. The period in which Cloud Spanner retains all versions of data for the database. This is the same as the value of version_retention_period database option set using UpdateDatabaseDdl. Defaults to 1 hour, if not set. |

### `DatabaseMoveConfig`

- The configuration for each database in the target instance configuration.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `databaseId` | string | Required. The unique identifier of the database resource in the Instance. For example, if the database uri is `projects/foo/instances/bar/databases/baz`, then the id to supply here is baz. |
| `encryptionConfig` | InstanceEncryptionConfig | Optional. Encryption configuration to be used for the database in the target configuration. The encryption configuration must be specified for every database which currently uses CMEK encryption. If a database currently uses Google-managed encryption and a target encryption configuration is not specified, then the database defaults to Google-managed encryption. If a database currently uses Google-managed encryption and a target CMEK encryption is specified, the request is rejected. If a database currently uses CMEK encryption, then a target encryption configuration must be specified. You can't move a CMEK database to a Google-managed encryption database using the MoveInstance API. |

### `DatabaseRole`

- A Cloud Spanner database role.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `name` | string | Required. The name of the database role. Values are of the form `projects//instances//databases//databaseRoles/` where `` is as specified in the `CREATE ROLE` DDL statement. |

### `DdlStatementActionInfo`

- Action information extracted from a DDL statement. This proto is used to display the brief info of the DDL statement for the operation UpdateDatabaseDdl.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `action` | string | The action for the DDL statement, for example, CREATE, ALTER, DROP, GRANT, etc. This field is a non-empty string. |
| `entityNames` | array<string> | The entity names being operated on the DDL statement. For example, 1. For statement "CREATE TABLE t1(...)", `entity_names` = \["t1"\]. 2. For statement "GRANT ROLE r1, r2 ...", `entity_names` = \["r1", "r2"\]. 3. For statement "ANALYZE", `entity_names` = \[\]. |
| `entityType` | string | The entity type for the DDL statement, for example, TABLE, INDEX, VIEW, etc. This field can be empty string for some DDL statement, for example, for statement "ANALYZE", `entity_type` = "". |

### `Delete`

- Arguments to delete operations.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `keySet` | KeySet | Required. The primary keys of the rows within table to delete. The primary keys must be specified in the order in which they appear in the `PRIMARY KEY()` clause of the table's equivalent DDL statement (the DDL statement used to create the table). Delete is idempotent. The transaction will succeed even if some or all rows do not exist. |
| `table` | string | Required. The table whose rows will be deleted. |

### `DerivedMetric`

- A message representing a derived metric.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `denominator` | LocalizedString | The name of the denominator metric. e.g. "rows". |
| `numerator` | LocalizedString | The name of the numerator metric. e.g. "latency". |

### `DiagnosticMessage`

- A message representing the key visualizer diagnostic messages.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `info` | LocalizedString | Information about this diagnostic information. |
| `metric` | LocalizedString | The metric. |
| `metricSpecific` | boolean | Whether this message is specific only for the current metric. By default Diagnostics are shown for all metrics, regardless which metric is the currently selected metric in the UI. However occasionally a metric will generate so many messages that the resulting visual clutter becomes overwhelming. In this case setting this to true, will show the diagnostic messages for that metric only if it is the currently selected metric. |
| `severity` | string enum | The severity of the diagnostic message. Values: `SEVERITY_UNSPECIFIED`, `INFO`, `WARNING`, `ERROR`, `FATAL`. |
| `shortMessage` | LocalizedString | The short message. |

### `DirectedReadOptions`

- The `DirectedReadOptions` can be used to indicate which replicas or regions should be used for non-transactional reads or queries. `DirectedReadOptions` can only be specified for a read-only transaction, otherwise the API returns an `INVALID_ARGUMENT` error.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `excludeReplicas` | ExcludeReplicas | `Exclude_replicas` indicates that specified replicas should be excluded from serving requests. Spanner doesn't route requests to the replicas in this list. |
| `includeReplicas` | IncludeReplicas | `Include_replicas` indicates the order of replicas (as they appear in this list) to process the request. If `auto_failover_disabled` is set to `true` and all replicas are exhausted without finding a healthy replica, Spanner waits for a replica in the list to become available, requests might fail due to `DEADLINE_EXCEEDED` errors. |

### `DualRegionQuorum`

- Message type for a dual-region quorum. Currently this type has no options.
- Version: v1

### `Empty`

- A generic empty message that you can re-use to avoid defining duplicated empty messages in your APIs. A typical example is to use it as the request or the response type of an API method. For instance: service Foo { rpc Bar(google.protobuf.Empty) returns (google.protobuf.Empty); }
- Version: v1

### `EncryptionConfig`

- Encryption configuration for a Cloud Spanner database.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `kmsKeyName` | string | The Cloud KMS key to be used for encrypting and decrypting the database. Values are of the form `projects//locations//keyRings//cryptoKeys/`. |
| `kmsKeyNames` | array<string> | Specifies the KMS configuration for one or more keys used to encrypt the database. Values are of the form `projects//locations//keyRings//cryptoKeys/`. The keys referenced by `kms_key_names` must fully cover all regions of the database's instance configuration. Some examples: \* For regional (single-region) instance configurations, specify a regional location KMS key. \* For multi-region instance configurations of type `GOOGLE_MANAGED`, either specify a multi-region location KMS key or multiple regional location KMS keys that cover all regions in the instance configuration. \* For an instance configuration of type `USER_MANAGED`, specify only regional location KMS keys to cover each region in the instance configuration. Multi-region location KMS keys aren't supported for `USER_MANAGED` type instance configurations. |

### `EncryptionInfo`

- Encryption information for a Cloud Spanner database or backup.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `encryptionStatus` | Status | Output only. If present, the status of a recent encrypt/decrypt call on underlying data for this database or backup. Regardless of status, data is always encrypted at rest. |
| `encryptionType` | string enum | Output only. The type of encryption. Values: `TYPE_UNSPECIFIED`, `GOOGLE_DEFAULT_ENCRYPTION`, `CUSTOMER_MANAGED_ENCRYPTION`. |
| `kmsKeyVersion` | string | Output only. A Cloud KMS key version that is being used to protect the database or backup. |

### `ExcludeReplicas`

- An ExcludeReplicas contains a repeated set of ReplicaSelection that should be excluded from serving requests.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `replicaSelections` | array<ReplicaSelection> | The directed read replica selector. |

### `ExecuteBatchDmlRequest`

- The request for ExecuteBatchDml.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `lastStatements` | boolean | Optional. If set to `true`, this request marks the end of the transaction. After these statements execute, you must commit or abort the transaction. Attempts to execute any other requests against this transaction (including reads and queries) are rejected. Setting this option might cause some error reporting to be deferred until commit time (for example, validation of unique constraints). Given this, successful execution of statements shouldn't be assumed until a subsequent `Commit` call completes successfully. |
| `requestOptions` | RequestOptions | Common options for this request. |
| `seqno` | string (int64) | Required. A per-transaction sequence number used to identify this request. This field makes each request idempotent such that if the request is received multiple times, at most one succeeds. The sequence number must be monotonically increasing within the transaction. If a request arrives for the first time with an out-of-order sequence number, the transaction might be aborted. Replays of previously handled requests yield the same response as the first execution. |
| `statements` | array<Statement> | Required. The list of statements to execute in this batch. Statements are executed serially, such that the effects of statement `i` are visible to statement `i+1`. Each statement must be a DML statement. Execution stops at the first failed statement; the remaining statements are not executed. Callers must provide at least one statement. |
| `transaction` | TransactionSelector | Required. The transaction to use. Must be a read-write transaction. To protect against replays, single-use transactions are not supported. The caller must either supply an existing transaction ID or begin a new transaction. |

### `ExecuteBatchDmlResponse`

- The response for ExecuteBatchDml. Contains a list of ResultSet messages, one for each DML statement that has successfully executed, in the same order as the statements in the request. If a statement fails, the status in the response body identifies the cause of the failure. To check for DML statements that failed, use the following approach: 1. Check the status in the response message. The google.rpc.Code enum value `OK` indicates that all statements were executed successfully. 2. If the status was not `OK`, check the number of result sets in the response. If the response contains `N` ResultSet messages, then statement `N+1` in the request failed. Example 1: \* Request: 5 DML statements, all executed successfully. \* Response: 5 ResultSet messages, with the status `OK`. Example 2: \* Request: 5 DML statements. The third statement has a syntax error. \* Response: 2 ResultSet messages, and a syntax error (`INVALID_ARGUMENT`) status. The number of ResultSet messages indicates that the third statement failed, and the fourth and fifth statements were not executed.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `precommitToken` | MultiplexedSessionPrecommitToken | Optional. A precommit token is included if the read-write transaction is on a multiplexed session. Pass the precommit token with the highest sequence number from this transaction attempt should be passed to the Commit request for this transaction. |
| `resultSets` | array<ResultSet> | One ResultSet for each statement in the request that ran successfully, in the same order as the statements in the request. Each ResultSet does not contain any rows. The ResultSetStats in each ResultSet contain the number of rows modified by the statement. Only the first ResultSet in the response contains valid ResultSetMetadata. |
| `status` | Status | If all DML statements are executed successfully, the status is `OK`. Otherwise, the error status of the first failed statement. |

### `ExecuteSqlRequest`

- The request for ExecuteSql and ExecuteStreamingSql.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `dataBoostEnabled` | boolean | If this is for a partitioned query and this field is set to `true`, the request is executed with Spanner Data Boost independent compute resources. If the field is set to `true` but the request doesn't set `partition_token`, the API returns an `INVALID_ARGUMENT` error. |
| `directedReadOptions` | DirectedReadOptions | Directed read options for this request. |
| `lastStatement` | boolean | Optional. If set to `true`, this statement marks the end of the transaction. After this statement executes, you must commit or abort the transaction. Attempts to execute any other requests against this transaction (including reads and queries) are rejected. For DML statements, setting this option might cause some error reporting to be deferred until commit time (for example, validation of unique constraints). Given this, successful execution of a DML statement shouldn't be assumed until a subsequent `Commit` call completes successfully. |
| `paramTypes` | object | It isn't always possible for Cloud Spanner to infer the right SQL type from a JSON value. For example, values of type `BYTES` and values of type `STRING` both appear in params as JSON strings. In these cases, you can use `param_types` to specify the exact SQL type for some or all of the SQL statement parameters. See the definition of Type for more information about SQL types. |
| `params` | object | Parameter names and values that bind to placeholders in the SQL string. A parameter placeholder consists of the `@` character followed by the parameter name (for example, `@firstName`). Parameter names must conform to the naming requirements of identifiers as specified at https://cloud.google.com/spanner/docs/lexical#identifiers. Parameters can appear anywhere that a literal value is expected. The same parameter name can be used more than once, for example: `"WHERE id > @msg_id AND id < @msg_id + 100"` It's an error to execute a SQL statement with unbound parameters. |
| `partitionToken` | string (byte) | If present, results are restricted to the specified partition previously created using `PartitionQuery`. There must be an exact match for the values of fields common to this message and the `PartitionQueryRequest` message used to create this `partition_token`. |
| `queryMode` | string enum | Used to control the amount of debugging information returned in ResultSetStats. If partition_token is set, query_mode can only be set to QueryMode.NORMAL. Values: `NORMAL`, `PLAN`, `PROFILE`, `WITH_STATS`, `WITH_PLAN_AND_STATS`. |
| `queryOptions` | QueryOptions | Query optimizer configuration to use for the given query. |
| `requestOptions` | RequestOptions | Common options for this request. |
| `resumeToken` | string (byte) | If this request is resuming a previously interrupted SQL statement execution, `resume_token` should be copied from the last PartialResultSet yielded before the interruption. Doing this enables the new SQL statement execution to resume where the last one left off. The rest of the request parameters must exactly match the request that yielded this token. |
| `seqno` | string (int64) | A per-transaction sequence number used to identify this request. This field makes each request idempotent such that if the request is received multiple times, at most one succeeds. The sequence number must be monotonically increasing within the transaction. If a request arrives for the first time with an out-of-order sequence number, the transaction can be aborted. Replays of previously handled requests yield the same response as the first execution. Required for DML statements. Ignored for queries. |
| `sql` | string | Required. The SQL string. |
| `transaction` | TransactionSelector | The transaction to use. For queries, if none is provided, the default is a temporary read-only transaction with strong concurrency. Standard DML statements require a read-write transaction. To protect against replays, single-use transactions are not supported. The caller must either supply an existing transaction ID or begin a new transaction. Partitioned DML requires an existing Partitioned DML transaction ID. |

### `Expr`

- Represents a textual expression in the Common Expression Language (CEL) syntax. CEL is a C-like expression language. The syntax and semantics of CEL are documented at https://github.com/google/cel-spec. Example (Comparison): title: "Summary size limit" description: "Determines if a summary is less than 100 chars" expression: "document.summary.size() < 100" Example (Equality): title: "Requestor is owner" description: "Determines if requestor is the document owner" expression: "document.owner == request.auth.claims.email" Example (Logic): title: "Public documents" description: "Determine whether the document should be publicly visible" expression: "document.type != 'private' && document.type != 'internal'" Example (Data Manipulation): title: "Notification string" description: "Create a notification string with a timestamp." expression: "'New message received at ' + string(document.create_time)" The exact variables and functions that may be referenced within an expression are determined by the service that evaluates it. See the service documentation for additional information.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `description` | string | Optional. Description of the expression. This is a longer text which describes the expression, e.g. when hovered over it in a UI. |
| `expression` | string | Textual representation of an expression in Common Expression Language syntax. |
| `location` | string | Optional. String indicating the location of the expression for error reporting, e.g. a file name and a position in the file. |
| `title` | string | Optional. Title for the expression, i.e. a short string describing its purpose. This can be used e.g. in UIs which allow to enter the expression. |

### `Field`

- Message representing a single field of a struct.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `name` | string | The name of the field. For reads, this is the column name. For SQL queries, it is the column alias (e.g., `"Word"` in the query `"SELECT 'hello' AS Word"`), or the column name (e.g., `"ColName"` in the query `"SELECT ColName FROM Table"`). Some columns might have an empty name (e.g., `"SELECT UPPER(ColName)"`). Note that a query result can contain multiple fields with the same name. |
| `type` | Type | The type of the field. |

### `FreeInstanceMetadata`

- Free instance specific metadata that is kept even after an instance has been upgraded for tracking purposes.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `expireBehavior` | string enum | Specifies the expiration behavior of a free instance. The default of ExpireBehavior is `REMOVE_AFTER_GRACE_PERIOD`. This can be modified during or after creation, and before expiration. Values: `EXPIRE_BEHAVIOR_UNSPECIFIED`, `FREE_TO_PROVISIONED`, `REMOVE_AFTER_GRACE_PERIOD`. |
| `expireTime` | string (google-datetime) | Output only. Timestamp after which the instance will either be upgraded or scheduled for deletion after a grace period. ExpireBehavior is used to choose between upgrading or scheduling the free instance for deletion. This timestamp is set during the creation of a free instance. |
| `upgradeTime` | string (google-datetime) | Output only. If present, the timestamp at which the free instance was upgraded to a provisioned instance. |

### `FullBackupSpec`

- The specification for full backups. A full backup stores the entire contents of the database at a given version time.
- Version: v1

### `GetDatabaseDdlResponse`

- The response for GetDatabaseDdl.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `protoDescriptors` | string (byte) | Proto descriptors stored in the database. Contains a protobuf-serialized google.protobuf.FileDescriptorSet (https://github.com/protocolbuffers/protobuf/blob/main/src/google/protobuf/descriptor.proto). For more details, see protobuffer self description (https://developers.google.com/protocol-buffers/docs/techniques#self-description). |
| `statements` | array<string> | A list of formatted DDL statements defining the schema of the database specified in the request. |

### `GetIamPolicyRequest`

- Request message for `GetIamPolicy` method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `options` | GetPolicyOptions | OPTIONAL: A `GetPolicyOptions` object for specifying options to `GetIamPolicy`. |

### `GetPolicyOptions`

- Encapsulates settings provided to GetIamPolicy.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `requestedPolicyVersion` | integer (int32) | Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |

### `HeartbeatRecord`

- A heartbeat record is returned as a progress indicator, when there are no data changes or any other partition record types in the change stream partition.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `timestamp` | string (google-datetime) | Indicates the timestamp at which the query has returned all the records in the change stream partition with timestamp <= heartbeat timestamp. The heartbeat timestamp will not be the same as the timestamps of other record types in the same partition. |

### `IncludeReplicas`

- An `IncludeReplicas` contains a repeated set of `ReplicaSelection` which indicates the order in which replicas should be considered.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `autoFailoverDisabled` | boolean | If `true`, Spanner doesn't route requests to a replica outside the <`include_replicas` list when all of the specified replicas are unavailable or unhealthy. Default value is `false`. |
| `replicaSelections` | array<ReplicaSelection> | The directed read replica selector. |

### `IncrementalBackupSpec`

- The specification for incremental backup chains. An incremental backup stores the delta of changes between a previous backup and the database contents at a given version time. An incremental backup chain consists of a full backup and zero or more successive incremental backups. The first backup created for an incremental backup chain is always a full backup.
- Version: v1

### `IndexAdvice`

- Recommendation to add new indexes to run queries more efficiently.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `ddl` | array<string> | Optional. DDL statements to add new indexes that will improve the query. |
| `improvementFactor` | number (double) | Optional. Estimated latency improvement factor. For example if the query currently takes 500 ms to run and the estimated latency with new indexes is 100 ms this field will be 5. |

### `IndexedHotKey`

- A message representing a (sparse) collection of hot keys for specific key buckets.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `sparseHotKeys` | object | A (sparse) mapping from key bucket index to the index of the specific hot row key for that key bucket. The index of the hot row key can be translated to the actual row key via the ScanData.VisualizationData.indexed_keys repeated field. |

### `IndexedKeyRangeInfos`

- A message representing a (sparse) collection of KeyRangeInfos for specific key buckets.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `keyRangeInfos` | object | A (sparse) mapping from key bucket index to the KeyRangeInfos for that key bucket. |

### `Instance`

- An isolated set of Cloud Spanner resources on which databases can be hosted.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `autoscalingConfig` | AutoscalingConfig | Optional. The autoscaling configuration. Autoscaling is enabled if this field is set. When autoscaling is enabled, node_count and processing_units are treated as OUTPUT_ONLY fields and reflect the current compute capacity allocated to the instance. |
| `config` | string | Required. The name of the instance's configuration. Values are of the form `projects//instanceConfigs/`. See also InstanceConfig and ListInstanceConfigs. |
| `createTime` | string (google-datetime) | Output only. The time at which the instance was created. |
| `defaultBackupScheduleType` | string enum | Optional. Controls the default backup schedule behavior for new databases within the instance. By default, a backup schedule is created automatically when a new database is created in a new instance. Note that the `AUTOMATIC` value isn't permitted for free instances, as backups and backup schedules aren't supported for free instances. In the `GetInstance` or `ListInstances` response, if the value of `default_backup_schedule_type` isn't set, or set to `NONE`, Spanner doesn't create a default backup schedule for new databases in the instance. Values: `DEFAULT_BACKUP_SCHEDULE_TYPE_UNSPECIFIED`, `NONE`, `AUTOMATIC`. |
| `displayName` | string | Required. The descriptive name for this instance as it appears in UIs. Must be unique per project and between 4 and 30 characters in length. |
| `edition` | string enum | Optional. The `Edition` of the current instance. Values: `EDITION_UNSPECIFIED`, `STANDARD`, `ENTERPRISE`, `ENTERPRISE_PLUS`. |
| `endpointUris` | array<string> | Deprecated. This field is not populated. |
| `freeInstanceMetadata` | FreeInstanceMetadata | Free instance metadata. Only populated for free instances. |
| `instanceType` | string enum | The `InstanceType` of the current instance. Values: `INSTANCE_TYPE_UNSPECIFIED`, `PROVISIONED`, `FREE_INSTANCE`. |
| `labels` | object | Cloud Labels are a flexible and lightweight mechanism for organizing cloud resources into groups that reflect a customer's organizational needs and deployment strategies. Cloud Labels can be used to filter collections of resources. They can be used to control how resource metrics are aggregated. And they can be used as arguments to policy management rules (e.g. route, firewall, load balancing, etc.). \* Label keys must be between 1 and 63 characters long and must conform to the following regular expression: `a-z{0,62}`. \* Label values must be between 0 and 63 characters long and must conform to the regular expression `[a-z0-9_-]{0,63}`. \* No more than 64 labels can be associated with a given resource. See https://goo.gl/xmQnxf for more information on and examples of labels. If you plan to use labels in your own code, please note that additional characters may be allowed in the future. And so you are advised to use an internal label representation, such as JSON, which doesn't rely upon specific characters being disallowed. For example, representing labels as the string: name + "\_" + value would prove problematic if we were to allow "\_" in a future release. |
| `name` | string | Required. A unique identifier for the instance, which cannot be changed after the instance is created. Values are of the form `projects//instances/a-z*[a-z0-9]`. The final segment of the name must be between 2 and 64 characters in length. |
| `nodeCount` | integer (int32) | The number of nodes allocated to this instance. At most, one of either `node_count` or `processing_units` should be present in the message. Users can set the `node_count` field to specify the target number of nodes allocated to the instance. If autoscaling is enabled, `node_count` is treated as an `OUTPUT_ONLY` field and reflects the current number of nodes allocated to the instance. This might be zero in API responses for instances that are not yet in the `READY` state. If the instance has varying node count across replicas (achieved by setting `asymmetric_autoscaling_options` in the autoscaling configuration), the `node_count` set here is the maximum node count across all replicas. For more information, see Compute capacity, nodes, and processing units (https://cloud.google.com/spanner/docs/compute-capacity). |
| `processingUnits` | integer (int32) | The number of processing units allocated to this instance. At most, one of either `processing_units` or `node_count` should be present in the message. Users can set the `processing_units` field to specify the target number of processing units allocated to the instance. If autoscaling is enabled, `processing_units` is treated as an `OUTPUT_ONLY` field and reflects the current number of processing units allocated to the instance. This might be zero in API responses for instances that are not yet in the `READY` state. If the instance has varying processing units per replica (achieved by setting `asymmetric_autoscaling_options` in the autoscaling configuration), the `processing_units` set here is the maximum processing units across all replicas. For more information, see Compute capacity, nodes and processing units (https://cloud.google.com/spanner/docs/compute-capacity). |
| `replicaComputeCapacity` | array<ReplicaComputeCapacity> | Output only. Lists the compute capacity per ReplicaSelection. A replica selection identifies a set of replicas with common properties. Replicas identified by a ReplicaSelection are scaled with the same compute capacity. |
| `state` | string enum | Output only. The current instance state. For CreateInstance, the state must be either omitted or set to `CREATING`. For UpdateInstance, the state must be either omitted or set to `READY`. Values: `STATE_UNSPECIFIED`, `CREATING`, `READY`. |
| `tags` | object | Optional. Tag keys/values directly bound to this resource. For example: "123/environment": "prod", "123/costCenter": "marketing" |
| `updateTime` | string (google-datetime) | Output only. The time at which the instance was most recently updated. |

### `InstanceConfig`

- A possible configuration for a Cloud Spanner instance. Configurations define the geographic placement of nodes and their replication.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `baseConfig` | string | Base configuration name, e.g. projects//instanceConfigs/nam3, based on which this configuration is created. Only set for user-managed configurations. `base_config` must refer to a configuration of type `GOOGLE_MANAGED` in the same project as this configuration. |
| `configType` | string enum | Output only. Whether this instance configuration is a Google-managed or user-managed configuration. Values: `TYPE_UNSPECIFIED`, `GOOGLE_MANAGED`, `USER_MANAGED`. |
| `displayName` | string | The name of this instance configuration as it appears in UIs. |
| `etag` | string | etag is used for optimistic concurrency control as a way to help prevent simultaneous updates of a instance configuration from overwriting each other. It is strongly suggested that systems make use of the etag in the read-modify-write cycle to perform instance configuration updates in order to avoid race conditions: An etag is returned in the response which contains instance configurations, and systems are expected to put that etag in the request to update instance configuration to ensure that their change is applied to the same version of the instance configuration. If no etag is provided in the call to update the instance configuration, then the existing instance configuration is overwritten blindly. |
| `freeInstanceAvailability` | string enum | Output only. Describes whether free instances are available to be created in this instance configuration. Values: `FREE_INSTANCE_AVAILABILITY_UNSPECIFIED`, `AVAILABLE`, `UNSUPPORTED`, `DISABLED`, `QUOTA_EXCEEDED`. |
| `labels` | object | Cloud Labels are a flexible and lightweight mechanism for organizing cloud resources into groups that reflect a customer's organizational needs and deployment strategies. Cloud Labels can be used to filter collections of resources. They can be used to control how resource metrics are aggregated. And they can be used as arguments to policy management rules (e.g. route, firewall, load balancing, etc.). \* Label keys must be between 1 and 63 characters long and must conform to the following regular expression: `a-z{0,62}`. \* Label values must be between 0 and 63 characters long and must conform to the regular expression `[a-z0-9_-]{0,63}`. \* No more than 64 labels can be associated with a given resource. See https://goo.gl/xmQnxf for more information on and examples of labels. If you plan to use labels in your own code, please note that additional characters may be allowed in the future. Therefore, you are advised to use an internal label representation, such as JSON, which doesn't rely upon specific characters being disallowed. For example, representing labels as the string: name + "\_" + value would prove problematic if we were to allow "\_" in a future release. |
| `leaderOptions` | array<string> | Allowed values of the "default_leader" schema option for databases in instances that use this instance configuration. |
| `name` | string | A unique identifier for the instance configuration. Values are of the form `projects//instanceConfigs/a-z*`. User instance configuration must start with `custom-`. |
| `optionalReplicas` | array<ReplicaInfo> | Output only. The available optional replicas to choose from for user-managed configurations. Populated for Google-managed configurations. |
| `quorumType` | string enum | Output only. The `QuorumType` of the instance configuration. Values: `QUORUM_TYPE_UNSPECIFIED`, `REGION`, `DUAL_REGION`, `MULTI_REGION`. |
| `reconciling` | boolean | Output only. If true, the instance configuration is being created or updated. If false, there are no ongoing operations for the instance configuration. |
| `replicas` | array<ReplicaInfo> | The geographic placement of nodes in this instance configuration and their replication properties. To create user-managed configurations, input `replicas` must include all replicas in `replicas` of the `base_config` and include one or more replicas in the `optional_replicas` of the `base_config`. |
| `state` | string enum | Output only. The current instance configuration state. Applicable only for `USER_MANAGED` configurations. Values: `STATE_UNSPECIFIED`, `CREATING`, `READY`. |
| `storageLimitPerProcessingUnit` | string (int64) | Output only. The storage limit in bytes per processing unit. |

### `InstanceEncryptionConfig`

- Encryption configuration for a Cloud Spanner database.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `kmsKeyName` | string | Optional. This field is maintained for backwards compatibility. For new callers, we recommend using `kms_key_names` to specify the KMS key. Only use `kms_key_name` if the location of the KMS key matches the database instance's configuration (location) exactly. For example, if the KMS location is in `us-central1` or `nam3`, then the database instance must also be in `us-central1` or `nam3`. The Cloud KMS key that is used to encrypt and decrypt the restored database. Values are of the form `projects//locations//keyRings//cryptoKeys/`. |
| `kmsKeyNames` | array<string> | Optional. Specifies the KMS configuration for one or more keys used to encrypt the database. Values are of the form `projects//locations//keyRings//cryptoKeys/`. The keys referenced by `kms_key_names` must fully cover all regions of the database's instance configuration. Some examples: \* For regional (single-region) instance configurations, specify a regional location KMS key. \* For multi-region instance configurations of type `GOOGLE_MANAGED`, either specify a multi-region location KMS key or multiple regional location KMS keys that cover all regions in the instance configuration. \* For an instance configuration of type `USER_MANAGED`, specify only regional location KMS keys to cover each region in the instance configuration. Multi-region location KMS keys aren't supported for `USER_MANAGED` type instance configurations. |

### `InstanceOperationProgress`

- Encapsulates progress related information for a Cloud Spanner long running instance operations.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `endTime` | string (google-datetime) | If set, the time at which this operation failed or was completed successfully. |
| `progressPercent` | integer (int32) | Percent completion of the operation. Values are between 0 and 100 inclusive. |
| `startTime` | string (google-datetime) | Time the request was received. |

### `InstancePartition`

- An isolated set of Cloud Spanner resources that databases can define placements on.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `autoscalingConfig` | AutoscalingConfig | Optional. The autoscaling configuration. Autoscaling is enabled if this field is set. When autoscaling is enabled, fields in compute_capacity are treated as OUTPUT_ONLY fields and reflect the current compute capacity allocated to the instance partition. |
| `config` | string | Required. The name of the instance partition's configuration. Values are of the form `projects//instanceConfigs/`. See also InstanceConfig and ListInstanceConfigs. |
| `createTime` | string (google-datetime) | Output only. The time at which the instance partition was created. |
| `displayName` | string | Required. The descriptive name for this instance partition as it appears in UIs. Must be unique per project and between 4 and 30 characters in length. |
| `etag` | string | Used for optimistic concurrency control as a way to help prevent simultaneous updates of a instance partition from overwriting each other. It is strongly suggested that systems make use of the etag in the read-modify-write cycle to perform instance partition updates in order to avoid race conditions: An etag is returned in the response which contains instance partitions, and systems are expected to put that etag in the request to update instance partitions to ensure that their change will be applied to the same version of the instance partition. If no etag is provided in the call to update instance partition, then the existing instance partition is overwritten blindly. |
| `name` | string | Required. A unique identifier for the instance partition. Values are of the form `projects//instances//instancePartitions/a-z*[a-z0-9]`. The final segment of the name must be between 2 and 64 characters in length. An instance partition's name cannot be changed after the instance partition is created. |
| `nodeCount` | integer (int32) | The number of nodes allocated to this instance partition. Users can set the `node_count` field to specify the target number of nodes allocated to the instance partition. If autoscaling is enabled, node_count is treated as an OUTPUT_ONLY field and reflects the current number of nodes allocated to the instance partition. This may be zero in API responses for instance partitions that are not yet in state `READY`. |
| `processingUnits` | integer (int32) | The number of processing units allocated to this instance partition. Users can set the `processing_units` field to specify the target number of processing units allocated to the instance partition. If autoscaling is enabled, processing_units is treated as an OUTPUT_ONLY field and reflects the current number of processing units allocated to the instance partition. This might be zero in API responses for instance partitions that are not yet in the `READY` state. |
| `referencingBackups` | array<string> | Output only. Deprecated: This field is not populated. Output only. The names of the backups that reference this instance partition. Referencing backups should share the parent instance. The existence of any referencing backup prevents the instance partition from being deleted. |
| `referencingDatabases` | array<string> | Output only. The names of the databases that reference this instance partition. Referencing databases should share the parent instance. The existence of any referencing database prevents the instance partition from being deleted. |
| `state` | string enum | Output only. The current instance partition state. Values: `STATE_UNSPECIFIED`, `CREATING`, `READY`. |
| `updateTime` | string (google-datetime) | Output only. The time at which the instance partition was most recently updated. |

### `InstanceReplicaSelection`

- ReplicaSelection identifies replicas with common properties.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `location` | string | Required. Name of the location of the replicas (for example, "us-central1"). |

### `Key`

- A split key.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `keyParts` | array<any> | Required. The column values making up the split key. |

### `KeyRange`

- KeyRange represents a range of rows in a table or index. A range has a start key and an end key. These keys can be open or closed, indicating if the range includes rows with that key. Keys are represented by lists, where the ith value in the list corresponds to the ith component of the table or index primary key. Individual values are encoded as described here. For example, consider the following table definition: CREATE TABLE UserEvents ( UserName STRING(MAX), EventDate STRING(10) ) PRIMARY KEY(UserName, EventDate); The following keys name rows in this table: "Bob", "2014-09-23" Since the `UserEvents` table's `PRIMARY KEY` clause names two columns, each `UserEvents` key has two elements; the first is the `UserName`, and the second is the `EventDate`. Key ranges with multiple components are interpreted lexicographically by component using the table or index key's declared sort order. For example, the following range returns all events for user `"Bob"` that occurred in the year 2015: "start_closed": \["Bob", "2015-01-01"\] "end_closed": \["Bob", "2015-12-31"\] Start and end keys can omit trailing key components. This affects the inclusion and exclusion of rows that exactly match the provided key components: if the key is closed, then rows that exactly match the provided components are included; if the key is open, then rows that exactly match are not included. For example, the following range includes all events for `"Bob"` that occurred during and after the year 2000: "start_closed": \["Bob", "2000-01-01"\] "end_closed": \["Bob"\] The next example retrieves all events for `"Bob"`: "start_closed": \["Bob"\] "end_closed": \["Bob"\] To retrieve events before the year 2000: "start_closed": \["Bob"\] "end_open": \["Bob", "2000-01-01"\] The following range includes all rows in the table: "start_closed": \[\] "end_closed": \[\] This range returns all users whose `UserName` begins with any character from A to C: "start_closed": \["A"\] "end_open": \["D"\] This range returns all users whose `UserName` begins with B: "start_closed": \["B"\] "end_open": \["C"\] Key ranges honor column sort order. For example, suppose a table is defined as follows: CREATE TABLE DescendingSortedTable { Key INT64, ... ) PRIMARY KEY(Key DESC); The following range retrieves all rows with key values between 1 and 100 inclusive: "start_closed": \["100"\] "end_closed": \["1"\] Note that 100 is passed as the start, and 1 is passed as the end, because `Key` is a descending column in the schema.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `endClosed` | array<any> | If the end is closed, then the range includes all rows whose first `len(end_closed)` key columns exactly match `end_closed`. |
| `endOpen` | array<any> | If the end is open, then the range excludes rows whose first `len(end_open)` key columns exactly match `end_open`. |
| `startClosed` | array<any> | If the start is closed, then the range includes all rows whose first `len(start_closed)` key columns exactly match `start_closed`. |
| `startOpen` | array<any> | If the start is open, then the range excludes rows whose first `len(start_open)` key columns exactly match `start_open`. |

### `KeyRangeInfo`

- A message representing information for a key range (possibly one key).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `contextValues` | array<ContextValue> | The list of context values for this key range. |
| `endKeyIndex` | integer (int32) | The index of the end key in indexed_keys. |
| `info` | LocalizedString | Information about this key range, for all metrics. |
| `keysCount` | string (int64) | The number of keys this range covers. |
| `metric` | LocalizedString | The name of the metric. e.g. "latency". |
| `startKeyIndex` | integer (int32) | The index of the start key in indexed_keys. |
| `timeOffset` | string (google-duration) | The time offset. This is the time since the start of the time interval. |
| `unit` | LocalizedString | The unit of the metric. This is an unstructured field and will be mapped as is to the user. |
| `value` | number (float) | The value of the metric. |

### `KeyRangeInfos`

- A message representing a list of specific information for multiple key ranges.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `infos` | array<KeyRangeInfo> | The list individual KeyRangeInfos. |
| `totalSize` | integer (int32) | The total size of the list of all KeyRangeInfos. This may be larger than the number of repeated messages above. If that is the case, this number may be used to determine how many are not being shown. |

### `KeySet`

- `KeySet` defines a collection of Cloud Spanner keys and/or key ranges. All the keys are expected to be in the same table or index. The keys need not be sorted in any particular way. If the same key is specified multiple times in the set (for example if two ranges, two keys, or a key and a range overlap), Cloud Spanner behaves as if the key were only specified once.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `all` | boolean | For convenience `all` can be set to `true` to indicate that this `KeySet` matches all keys in the table or index. Note that any keys specified in `keys` or `ranges` are only yielded once. |
| `keys` | array<array> | A list of specific keys. Entries in `keys` should have exactly as many elements as there are columns in the primary or index key with which this `KeySet` is used. Individual key values are encoded as described here. |
| `ranges` | array<KeyRange> | A list of key ranges. See KeyRange for more information about key range specifications. |

### `ListBackupOperationsResponse`

- The response for ListBackupOperations.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | `next_page_token` can be sent in a subsequent ListBackupOperations call to fetch more of the matching metadata. |
| `operations` | array<Operation> | The list of matching backup long-running operations. Each operation's name will be prefixed by the backup's name. The operation's metadata field type `metadata.type_url` describes the type of the metadata. Operations returned include those that are pending or have completed/failed/canceled within the last 7 days. Operations returned are ordered by `operation.metadata.value.progress.start_time` in descending order starting from the most recently started operation. |

### `ListBackupSchedulesResponse`

- The response for ListBackupSchedules.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `backupSchedules` | array<BackupSchedule> | The list of backup schedules for a database. |
| `nextPageToken` | string | `next_page_token` can be sent in a subsequent ListBackupSchedules call to fetch more of the schedules. |

### `ListBackupsResponse`

- The response for ListBackups.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `backups` | array<Backup> | The list of matching backups. Backups returned are ordered by `create_time` in descending order, starting from the most recent `create_time`. |
| `nextPageToken` | string | `next_page_token` can be sent in a subsequent ListBackups call to fetch more of the matching backups. |

### `ListDatabaseOperationsResponse`

- The response for ListDatabaseOperations.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | `next_page_token` can be sent in a subsequent ListDatabaseOperations call to fetch more of the matching metadata. |
| `operations` | array<Operation> | The list of matching database long-running operations. Each operation's name will be prefixed by the database's name. The operation's metadata field type `metadata.type_url` describes the type of the metadata. |

### `ListDatabaseRolesResponse`

- The response for ListDatabaseRoles.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `databaseRoles` | array<DatabaseRole> | Database roles that matched the request. |
| `nextPageToken` | string | `next_page_token` can be sent in a subsequent ListDatabaseRoles call to fetch more of the matching roles. |

### `ListDatabasesResponse`

- The response for ListDatabases.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `databases` | array<Database> | Databases that matched the request. |
| `nextPageToken` | string | `next_page_token` can be sent in a subsequent ListDatabases call to fetch more of the matching databases. |

### `ListInstanceConfigOperationsResponse`

- The response for ListInstanceConfigOperations.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | `next_page_token` can be sent in a subsequent ListInstanceConfigOperations call to fetch more of the matching metadata. |
| `operations` | array<Operation> | The list of matching instance configuration long-running operations. Each operation's name will be prefixed by the name of the instance configuration. The operation's metadata field type `metadata.type_url` describes the type of the metadata. |

### `ListInstanceConfigsResponse`

- The response for ListInstanceConfigs.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `instanceConfigs` | array<InstanceConfig> | The list of requested instance configurations. |
| `nextPageToken` | string | `next_page_token` can be sent in a subsequent ListInstanceConfigs call to fetch more of the matching instance configurations. |

### `ListInstancePartitionOperationsResponse`

- The response for ListInstancePartitionOperations.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | `next_page_token` can be sent in a subsequent ListInstancePartitionOperations call to fetch more of the matching metadata. |
| `operations` | array<Operation> | The list of matching instance partition long-running operations. Each operation's name will be prefixed by the instance partition's name. The operation's metadata field type `metadata.type_url` describes the type of the metadata. |
| `unreachableInstancePartitions` | array<string> | The list of unreachable instance partitions. It includes the names of instance partitions whose operation metadata could not be retrieved within instance_partition_deadline. |

### `ListInstancePartitionsResponse`

- The response for ListInstancePartitions.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `instancePartitions` | array<InstancePartition> | The list of requested instancePartitions. |
| `nextPageToken` | string | `next_page_token` can be sent in a subsequent ListInstancePartitions call to fetch more of the matching instance partitions. |
| `unreachable` | array<string> | The list of unreachable instances or instance partitions. It includes the names of instances or instance partitions whose metadata could not be retrieved within instance_partition_deadline. |

### `ListInstancesResponse`

- The response for ListInstances.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `instances` | array<Instance> | The list of requested instances. |
| `nextPageToken` | string | `next_page_token` can be sent in a subsequent ListInstances call to fetch more of the matching instances. |
| `unreachable` | array<string> | The list of unreachable instances. It includes the names of instances whose metadata could not be retrieved within instance_deadline. |

### `ListOperationsResponse`

- The response message for Operations.ListOperations.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | The standard List next-page token. |
| `operations` | array<Operation> | A list of operations that matches the specified filter in the request. |
| `unreachable` | array<string> | Unordered list. Unreachable resources. Populated when the request sets `ListOperationsRequest.return_partial_success` and reads across collections. For example, when attempting to list all resources across all supported locations. |

### `ListScansResponse`

- Response method from the ListScans method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | Token to retrieve the next page of results, or empty if there are no more results in the list. |
| `scans` | array<Scan> | Available scans based on the list query parameters. |

### `ListSessionsResponse`

- The response for ListSessions.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | `next_page_token` can be sent in a subsequent ListSessions call to fetch more of the matching sessions. |
| `sessions` | array<Session> | The list of requested sessions. |

### `LocalizedString`

- A message representing a user-facing string whose value may need to be translated before being displayed.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `args` | object | A map of arguments used when creating the localized message. Keys represent parameter names which may be used by the localized version when substituting dynamic values. |
| `message` | string | The canonical English version of this message. If no token is provided or the front-end has no message associated with the token, this text will be displayed as-is. |
| `token` | string | The token identifying the message, e.g. 'METRIC_READ_CPU'. This should be unique within the service. |

### `Metric`

- A message representing the actual monitoring data, values for each key bucket over time, of a metric.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `aggregation` | string enum | The aggregation function used to aggregate each key bucket Values: `AGGREGATION_UNSPECIFIED`, `MAX`, `SUM`. |
| `category` | LocalizedString | The category of the metric, e.g. "Activity", "Alerts", "Reads", etc. |
| `derived` | DerivedMetric | The references to numerator and denominator metrics for a derived metric. |
| `displayLabel` | LocalizedString | The displayed label of the metric. |
| `hasNonzeroData` | boolean | Whether the metric has any non-zero data. |
| `hotValue` | number (float) | The value that is considered hot for the metric. On a per metric basis hotness signals high utilization and something that might potentially be a cause for concern by the end user. hot_value is used to calibrate and scale visual color scales. |
| `indexedHotKeys` | object | The (sparse) mapping from time index to an IndexedHotKey message, representing those time intervals for which there are hot keys. |
| `indexedKeyRangeInfos` | object | The (sparse) mapping from time interval index to an IndexedKeyRangeInfos message, representing those time intervals for which there are informational messages concerning key ranges. |
| `info` | LocalizedString | Information about the metric. |
| `matrix` | MetricMatrix | The data for the metric as a matrix. |
| `unit` | LocalizedString | The unit of the metric. |
| `visible` | boolean | Whether the metric is visible to the end user. |

### `MetricMatrix`

- A message representing a matrix of floats.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `rows` | array<MetricMatrixRow> | The rows of the matrix. |

### `MetricMatrixRow`

- A message representing a row of a matrix of floats.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `cols` | array<number> | The columns of the row. |

### `Mod`

- A mod describes all data changes in a watched table row.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `keys` | array<ModValue> | Returns the value of the primary key of the modified row. |
| `newValues` | array<ModValue> | Returns the new values after the change for the modified columns. Always empty for DELETE. |
| `oldValues` | array<ModValue> | Returns the old values before the change for the modified columns. Always empty for INSERT, or if old values are not being captured specified by value_capture_type. |

### `ModValue`

- Returns the value and associated metadata for a particular field of the Mod.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `columnMetadataIndex` | integer (int32) | Index within the repeated column_metadata field, to obtain the column metadata for the column that was modified. |
| `value` | any | The value of the column. |

### `MoveInEvent`

- Describes move-in of the key ranges into the change stream partition identified by partition_token. To maintain processing the changes for a particular key in timestamp order, the query processing the change stream partition identified by partition_token should not advance beyond the partition event record commit timestamp until the queries processing the source change stream partitions have processed all change stream records with timestamps <= the partition event record commit timestamp.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `sourcePartitionToken` | string | An unique partition identifier describing the source change stream partition that recorded changes for the key range that is moving into this partition. |

### `MoveInstanceRequest`

- The request for MoveInstance.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `targetConfig` | string | Required. The target instance configuration where to move the instance. Values are of the form `projects//instanceConfigs/`. |
| `targetDatabaseMoveConfigs` | array<DatabaseMoveConfig> | Optional. The configuration for each database in the target instance configuration. |

### `MoveOutEvent`

- Describes move-out of the key ranges out of the change stream partition identified by partition_token. To maintain processing the changes for a particular key in timestamp order, the query processing the MoveOutEvent in the partition identified by partition_token should inform the queries processing the destination partitions that they can unblock and proceed processing records past the commit_timestamp.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `destinationPartitionToken` | string | An unique partition identifier describing the destination change stream partition that will record changes for the key range that is moving out of this partition. |

### `MultiplexedSessionPrecommitToken`

- When a read-write transaction is executed on a multiplexed session, this precommit token is sent back to the client as a part of the Transaction message in the BeginTransaction response and also as a part of the ResultSet and PartialResultSet responses.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `precommitToken` | string (byte) | Opaque precommit token. |
| `seqNum` | integer (int32) | An incrementing seq number is generated on every precommit token that is returned. Clients should remember the precommit token with the highest sequence number from the current transaction attempt. |

### `Mutation`

- A modification to one or more Cloud Spanner rows. Mutations can be applied to a Cloud Spanner database by sending them in a Commit call.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `ack` | Ack | Ack a message from a queue. |
| `delete` | Delete | Delete rows from a table. Succeeds whether or not the named rows were present. |
| `insert` | Write | Insert new rows in a table. If any of the rows already exist, the write or transaction fails with error `ALREADY_EXISTS`. |
| `insertOrUpdate` | Write | Like insert, except that if the row already exists, then its column values are overwritten with the ones provided. Any column values not explicitly written are preserved. When using insert_or_update, just as when using insert, all `NOT NULL` columns in the table must be given a value. This holds true even when the row already exists and will therefore actually be updated. |
| `replace` | Write | Like insert, except that if the row already exists, it is deleted, and the column values provided are inserted instead. Unlike insert_or_update, this means any values not explicitly written become `NULL`. In an interleaved table, if you create the child table with the `ON DELETE CASCADE` annotation, then replacing a parent row also deletes the child rows. Otherwise, you must delete the child rows before you replace the parent row. |
| `send` | Send | Send a message to a queue. |
| `update` | Write | Update existing rows in a table. If any of the rows does not already exist, the transaction fails with error `NOT_FOUND`. |

### `MutationGroup`

- A group of mutations to be committed together. Related mutations should be placed in a group. For example, two mutations inserting rows with the same primary key prefix in both parent and child tables are related.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `mutations` | array<Mutation> | Required. The mutations in this group. |

### `Operation`

- This resource represents a long-running operation that is the result of a network API call.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `done` | boolean | If the value is `false`, it means the operation is still in progress. If `true`, the operation is completed, and either `error` or `response` is available. |
| `error` | Status | The error result of the operation in case of failure or cancellation. |
| `metadata` | object | Service-specific metadata associated with the operation. It typically contains progress information and common metadata such as create time. Some services might not provide such metadata. Any method that returns a long-running operation should document the metadata type, if any. |
| `name` | string | The server-assigned name, which is only unique within the same service that originally returns it. If you use the default HTTP mapping, the `name` should be a resource name ending with `operations/{unique_id}`. |
| `response` | object | The normal, successful response of the operation. If the original method returns no data on success, such as `Delete`, the response is `google.protobuf.Empty`. If the original method is standard `Get`/`Create`/`Update`, the response should be the resource. For other methods, the response should have the type `XxxResponse`, where `Xxx` is the original method name. For example, if the original method name is `TakeSnapshot()`, the inferred response type is `TakeSnapshotResponse`. |

### `OperationProgress`

- Encapsulates progress related information for a Cloud Spanner long running operation.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `endTime` | string (google-datetime) | If set, the time at which this operation failed or was completed successfully. |
| `progressPercent` | integer (int32) | Percent completion of the operation. Values are between 0 and 100 inclusive. |
| `startTime` | string (google-datetime) | Time the request was received. |

### `OptimizeRestoredDatabaseMetadata`

- Metadata type for the long-running operation used to track the progress of optimizations performed on a newly restored database. This long-running operation is automatically created by the system after the successful completion of a database restore, and cannot be cancelled.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `name` | string | Name of the restored database being optimized. |
| `progress` | OperationProgress | The progress of the post-restore optimizations. |

### `PartialResultSet`

- Partial results from a streaming read or SQL query. Streaming reads and SQL queries better tolerate large result sets, large rows, and large values, but are a little trickier to consume.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `chunkedValue` | boolean | If true, then the final value in values is chunked, and must be combined with more values from subsequent `PartialResultSet`s to obtain a complete field value. |
| `last` | boolean | Optional. Indicates whether this is the last `PartialResultSet` in the stream. The server might optionally set this field. Clients shouldn't rely on this field being set in all cases. |
| `metadata` | ResultSetMetadata | Metadata about the result set, such as row type information. Only present in the first response. |
| `precommitToken` | MultiplexedSessionPrecommitToken | Optional. A precommit token is included if the read-write transaction has multiplexed sessions enabled. Pass the precommit token with the highest sequence number from this transaction attempt to the Commit request for this transaction. |
| `resumeToken` | string (byte) | Streaming calls might be interrupted for a variety of reasons, such as TCP connection loss. If this occurs, the stream of results can be resumed by re-sending the original request and including `resume_token`. Note that executing any other transaction in the same session invalidates the token. |
| `stats` | ResultSetStats | Query plan and execution statistics for the statement that produced this streaming result set. These can be requested by setting ExecuteSqlRequest.query_mode and are sent only once with the last response in the stream. This field is also present in the last response for DML statements. |
| `values` | array<any> | A streamed result set consists of a stream of values, which might be split into many `PartialResultSet` messages to accommodate large rows and/or large values. Every N complete values defines a row, where N is equal to the number of entries in metadata.row_type.fields. Most values are encoded based on type as described here. It's possible that the last value in values is "chunked", meaning that the rest of the value is sent in subsequent `PartialResultSet`(s). This is denoted by the chunked_value field. Two or more chunked values can be merged to form a complete value as follows: \* `bool/number/null`: can't be chunked \* `string`: concatenate the strings \* `list`: concatenate the lists. If the last element in a list is a `string`, `list`, or `object`, merge it with the first element in the next list by applying these rules recursively. \* `object`: concatenate the (field name, field value) pairs. If a field name is duplicated, then apply these rules recursively to merge the field values. Some examples of merging: Strings are concatenated. "foo", "bar" => "foobar" Lists of non-strings are concatenated. \[2, 3\], \[4\] => \[2, 3, 4\] Lists are concatenated, but the last and first elements are merged because they are strings. \["a", "b"\], \["c", "d"\] => \["a", "bc", "d"\] Lists are concatenated, but the last and first elements are merged because they are lists. Recursively, the last and first elements of the inner lists are merged because they are strings. \["a", \["b", "c"\]\], \[\["d"\], "e"\] => \["a", \["b", "cd"\], "e"\] Non-overlapping object fields are combined. {"a": "1"}, {"b": "2"} => {"a": "1", "b": 2"} Overlapping object fields are merged. {"a": "1"}, {"a": "2"} => {"a": "12"} Examples of merging objects containing lists of strings. {"a": \["1"\]}, {"a": \["2"\]} => {"a": \["12"\]} For a more complete example, suppose a streaming SQL query is yielding a result set whose rows contain a single string field. The following `PartialResultSet`s might be yielded: { "metadata": { ... } "values": \["Hello", "W"\] "chunked_value": true "resume_token": "Af65..." } { "values": \["orl"\] "chunked_value": true } { "values": \["d"\] "resume_token": "Zx1B..." } This sequence of `PartialResultSet`s encodes two rows, one containing the field value `"Hello"`, and a second containing the field value `"World" = "W" + "orl" + "d"`. Not all `PartialResultSet`s contain a `resume_token`. Execution can only be resumed from a previously yielded `resume_token`. For the above sequence of `PartialResultSet`s, resuming the query with `"resume_token": "Af65..."` yields results from the `PartialResultSet` with value "orl". |

### `Partition`

- Information returned for each partition returned in a PartitionResponse.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `partitionToken` | string (byte) | This token can be passed to `Read`, `StreamingRead`, `ExecuteSql`, or `ExecuteStreamingSql` requests to restrict the results to those identified by this partition token. |

### `PartitionEndRecord`

- A partition end record serves as a notification that the client should stop reading the partition. No further records are expected to be retrieved on it.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `endTimestamp` | string (google-datetime) | End timestamp at which the change stream partition is terminated. All changes generated by this partition will have timestamps <= end_timestamp. DataChangeRecord.commit_timestamps, PartitionStartRecord.start_timestamps, PartitionEventRecord.commit_timestamps, and PartitionEndRecord.end_timestamps can have the same value in the same partition. PartitionEndRecord is the last record returned for a partition. |
| `partitionToken` | string | Unique partition identifier describing the terminated change stream partition. partition_token is equal to the partition token of the change stream partition currently queried to return this PartitionEndRecord. |
| `recordSequence` | string | Record sequence numbers are unique and monotonically increasing (but not necessarily contiguous) for a specific timestamp across record types in the same partition. To guarantee ordered processing, the reader should process records (of potentially different types) in record_sequence order for a specific timestamp in the same partition. |

### `PartitionEventRecord`

- A partition event record describes key range changes for a change stream partition. The changes to a row defined by its primary key can be captured in one change stream partition for a specific time range, and then be captured in a different change stream partition for a different time range. This movement of key ranges across change stream partitions is a reflection of activities, such as Spanner's dynamic splitting and load balancing, etc. Processing this event is needed if users want to guarantee processing of the changes for any key in timestamp order. If time ordered processing of changes for a primary key is not needed, this event can be ignored. To guarantee time ordered processing for each primary key, if the event describes move-ins, the reader of this partition needs to wait until the readers of the source partitions have processed all records with timestamps <= this PartitionEventRecord.commit_timestamp, before advancing beyond this PartitionEventRecord. If the event describes move-outs, the reader can notify the readers of the destination partitions that they can continue processing.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `commitTimestamp` | string (google-datetime) | Indicates the commit timestamp at which the key range change occurred. DataChangeRecord.commit_timestamps, PartitionStartRecord.start_timestamps, PartitionEventRecord.commit_timestamps, and PartitionEndRecord.end_timestamps can have the same value in the same partition. |
| `moveInEvents` | array<MoveInEvent> | Set when one or more key ranges are moved into the change stream partition identified by partition_token. Example: Two key ranges are moved into partition (P1) from partition (P2) and partition (P3) in a single transaction at timestamp T. The PartitionEventRecord returned in P1 will reflect the move as: PartitionEventRecord { commit_timestamp: T partition_token: "P1" move_in_events { source_partition_token: "P2" } move_in_events { source_partition_token: "P3" } } The PartitionEventRecord returned in P2 will reflect the move as: PartitionEventRecord { commit_timestamp: T partition_token: "P2" move_out_events { destination_partition_token: "P1" } } The PartitionEventRecord returned in P3 will reflect the move as: PartitionEventRecord { commit_timestamp: T partition_token: "P3" move_out_events { destination_partition_token: "P1" } } |
| `moveOutEvents` | array<MoveOutEvent> | Set when one or more key ranges are moved out of the change stream partition identified by partition_token. Example: Two key ranges are moved out of partition (P1) to partition (P2) and partition (P3) in a single transaction at timestamp T. The PartitionEventRecord returned in P1 will reflect the move as: PartitionEventRecord { commit_timestamp: T partition_token: "P1" move_out_events { destination_partition_token: "P2" } move_out_events { destination_partition_token: "P3" } } The PartitionEventRecord returned in P2 will reflect the move as: PartitionEventRecord { commit_timestamp: T partition_token: "P2" move_in_events { source_partition_token: "P1" } } The PartitionEventRecord returned in P3 will reflect the move as: PartitionEventRecord { commit_timestamp: T partition_token: "P3" move_in_events { source_partition_token: "P1" } } |
| `partitionToken` | string | Unique partition identifier describing the partition this event occurred on. partition_token is equal to the partition token of the change stream partition currently queried to return this PartitionEventRecord. |
| `recordSequence` | string | Record sequence numbers are unique and monotonically increasing (but not necessarily contiguous) for a specific timestamp across record types in the same partition. To guarantee ordered processing, the reader should process records (of potentially different types) in record_sequence order for a specific timestamp in the same partition. |

### `PartitionOptions`

- Options for a `PartitionQueryRequest` and `PartitionReadRequest`.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `maxPartitions` | string (int64) | \*\*Note:\*\* This hint is currently ignored by `PartitionQuery` and `PartitionRead` requests. The desired maximum number of partitions to return. For example, this might be set to the number of workers available. The default for this option is currently 10,000. The maximum value is currently 200,000. This is only a hint. The actual number of partitions returned can be smaller or larger than this maximum count request. |
| `partitionSizeBytes` | string (int64) | \*\*Note:\*\* This hint is currently ignored by `PartitionQuery` and `PartitionRead` requests. The desired data size for each partition generated. The default for this option is currently 1 GiB. This is only a hint. The actual size of each partition can be smaller or larger than this size request. |

### `PartitionQueryRequest`

- The request for PartitionQuery
- Version: v1

| Field | Type | Description |
|---|---|---|
| `paramTypes` | object | Optional. It isn't always possible for Cloud Spanner to infer the right SQL type from a JSON value. For example, values of type `BYTES` and values of type `STRING` both appear in params as JSON strings. In these cases, `param_types` can be used to specify the exact SQL type for some or all of the SQL query parameters. See the definition of Type for more information about SQL types. |
| `params` | object | Optional. Parameter names and values that bind to placeholders in the SQL string. A parameter placeholder consists of the `@` character followed by the parameter name (for example, `@firstName`). Parameter names can contain letters, numbers, and underscores. Parameters can appear anywhere that a literal value is expected. The same parameter name can be used more than once, for example: `"WHERE id > @msg_id AND id < @msg_id + 100"` It's an error to execute a SQL statement with unbound parameters. |
| `partitionOptions` | PartitionOptions | Additional options that affect how many partitions are created. |
| `sql` | string | Required. The query request to generate partitions for. The request fails if the query isn't root partitionable. For a query to be root partitionable, it needs to satisfy a few conditions. For example, if the query execution plan contains a distributed union operator, then it must be the first operator in the plan. For more information about other conditions, see Read data in parallel (https://cloud.google.com/spanner/docs/reads#read_data_in_parallel). The query request must not contain DML commands, such as `INSERT`, `UPDATE`, or `DELETE`. Use `ExecuteStreamingSql` with a `PartitionedDml` transaction for large, partition-friendly DML operations. |
| `transaction` | TransactionSelector | Read-only snapshot transactions are supported, read and write and single-use transactions are not. |

### `PartitionReadRequest`

- The request for PartitionRead
- Version: v1

| Field | Type | Description |
|---|---|---|
| `columns` | array<string> | The columns of table to be returned for each row matching this request. |
| `index` | string | If non-empty, the name of an index on table. This index is used instead of the table primary key when interpreting key_set and sorting result rows. See key_set for further information. |
| `keySet` | KeySet | Required. `key_set` identifies the rows to be yielded. `key_set` names the primary keys of the rows in table to be yielded, unless index is present. If index is present, then key_set instead names index keys in index. It isn't an error for the `key_set` to name rows that don't exist in the database. Read yields nothing for nonexistent rows. |
| `partitionOptions` | PartitionOptions | Additional options that affect how many partitions are created. |
| `table` | string | Required. The name of the table in the database to be read. |
| `transaction` | TransactionSelector | Read only snapshot transactions are supported, read/write and single use transactions are not. |

### `PartitionResponse`

- The response for PartitionQuery or PartitionRead
- Version: v1

| Field | Type | Description |
|---|---|---|
| `partitions` | array<Partition> | Partitions created by this request. |
| `transaction` | Transaction | Transaction created by this request. |

### `PartitionStartRecord`

- A partition start record serves as a notification that the client should schedule the partitions to be queried. PartitionStartRecord returns information about one or more partitions.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `partitionTokens` | array<string> | Unique partition identifiers to be used in queries. |
| `recordSequence` | string | Record sequence numbers are unique and monotonically increasing (but not necessarily contiguous) for a specific timestamp across record types in the same partition. To guarantee ordered processing, the reader should process records (of potentially different types) in record_sequence order for a specific timestamp in the same partition. |
| `startTimestamp` | string (google-datetime) | Start timestamp at which the partitions should be queried to return change stream records with timestamps >= start_timestamp. DataChangeRecord.commit_timestamps, PartitionStartRecord.start_timestamps, PartitionEventRecord.commit_timestamps, and PartitionEndRecord.end_timestamps can have the same value in the same partition. |

### `PartitionedDml`

- Message type to initiate a Partitioned DML transaction.
- Version: v1

### `PlanNode`

- Node information for nodes appearing in a QueryPlan.plan_nodes.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `childLinks` | array<ChildLink> | List of child node `index`es and their relationship to this parent. |
| `displayName` | string | The display name for the node. |
| `executionStats` | object | The execution statistics associated with the node, contained in a group of key-value pairs. Only present if the plan was returned as a result of a profile query. For example, number of executions, number of rows/time per execution etc. |
| `index` | integer (int32) | The `PlanNode`'s index in node list. |
| `kind` | string enum | Used to determine the type of node. May be needed for visualizing different kinds of nodes differently. For example, If the node is a SCALAR node, it will have a condensed representation which can be used to directly embed a description of the node in its parent. Values: `KIND_UNSPECIFIED`, `RELATIONAL`, `SCALAR`. |
| `metadata` | object | Attributes relevant to the node contained in a group of key-value pairs. For example, a Parameter Reference node could have the following information in its metadata: { "parameter_reference": "param1", "parameter_type": "array" } |
| `shortRepresentation` | ShortRepresentation | Condensed representation for SCALAR nodes. |

### `Policy`

- An Identity and Access Management (IAM) policy, which specifies access controls for Google Cloud resources. A `Policy` is a collection of `bindings`. A `binding` binds one or more `members`, or principals, to a single `role`. Principals can be user accounts, service accounts, Google groups, and domains (such as G Suite). A `role` is a named list of permissions; each `role` can be an IAM predefined role or a user-created custom role. For some types of Google Cloud resources, a `binding` can also specify a `condition`, which is a logical expression that allows access to a resource only if the expression evaluates to `true`. A condition can add constraints based on attributes of the request, the resource, or both. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). \*\*JSON example:\*\* { "bindings": \[ { "role": "roles/resourcemanager.organizationAdmin", "members": \[ "user:mike@example.com", "group:admins@example.com", "domain:google.com", "serviceAccount:my-project-id@appspot.gserviceaccount.com" \] }, { "role": "roles/resourcemanager.organizationViewer", "members": \[ "user:eve@example.com" \], "condition": { "title": "expirable access", "description": "Does not grant access after Sep 2020", "expression": "request.time < timestamp('2020-10-01T00:00:00.000Z')", } } \], "etag": "BwWWja0YfJA=", "version": 3 } \*\*YAML example:\*\* bindings: - members: - user:mike@example.com - group:admins@example.com - domain:google.com - serviceAccount:my-project-id@appspot.gserviceaccount.com role: roles/resourcemanager.organizationAdmin - members: - user:eve@example.com role: roles/resourcemanager.organizationViewer condition: title: expirable access description: Does not grant access after Sep 2020 expression: request.time < timestamp('2020-10-01T00:00:00.000Z') etag: BwWWja0YfJA= version: 3 For a description of IAM and its features, see the IAM documentation (https://cloud.google.com/iam/docs/).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `bindings` | array<Binding> | Associates a list of `members`, or principals, with a `role`. Optionally, may specify a `condition` that determines how and when the `bindings` are applied. Each of the `bindings` must contain at least one principal. The `bindings` in a `Policy` can refer to up to 1,500 principals; up to 250 of these principals can be Google groups. Each occurrence of a principal counts towards these limits. For example, if the `bindings` grant 50 different roles to `user:alice@example.com`, and not to any other principal, then you can add another 1,450 principals to the `bindings` in the `Policy`. |
| `etag` | string (byte) | `etag` is used for optimistic concurrency control as a way to help prevent simultaneous updates of a policy from overwriting each other. It is strongly suggested that systems make use of the `etag` in the read-modify-write cycle to perform policy updates in order to avoid race conditions: An `etag` is returned in the response to `getIamPolicy`, and systems are expected to put that etag in the request to `setIamPolicy` to ensure that their change will be applied to the same version of the policy. \*\*Important:\*\* If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. |
| `version` | integer (int32) | Specifies the format of the policy. Valid values are `0`, `1`, and `3`. Requests that specify an invalid value are rejected. Any operation that affects conditional role bindings must specify version `3`. This requirement applies to the following operations: \* Getting a policy that includes a conditional role binding \* Adding a conditional role binding to a policy \* Changing a conditional role binding in a policy \* Removing any role binding, with or without a condition, from a policy that includes conditions \*\*Important:\*\* If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. If a policy does not include any conditions, operations on that policy may specify any valid version or leave the field unset. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |

### `PrefixNode`

- A message representing a key prefix node in the key prefix hierarchy. for eg. Bigtable keyspaces are lexicographically ordered mappings of keys to values. Keys often have a shared prefix structure where users use the keys to organize data. Eg ///employee In this case Keysight will possibly use one node for a company and reuse it for all employees that fall under the company. Doing so improves legibility in the UI.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `dataSourceNode` | boolean | Whether this corresponds to a data_source name. |
| `depth` | integer (int32) | The depth in the prefix hierarchy. |
| `endIndex` | integer (int32) | The index of the end key bucket of the range that this node spans. |
| `startIndex` | integer (int32) | The index of the start key bucket of the range that this node spans. |
| `word` | string | The string represented by the prefix node. |

### `QueryAdvisorResult`

- Output of query advisor analysis.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `indexAdvice` | array<IndexAdvice> | Optional. Index Recommendation for a query. This is an optional field and the recommendation will only be available when the recommendation guarantees significant improvement in query performance. |

### `QueryOptions`

- Query optimizer configuration.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `optimizerStatisticsPackage` | string | An option to control the selection of optimizer statistics package. This parameter allows individual queries to use a different query optimizer statistics package. Specifying `latest` as a value instructs Cloud Spanner to use the latest generated statistics package. If not specified, Cloud Spanner uses the statistics package set at the database level options, or the latest package if the database option isn't set. The statistics package requested by the query has to be exempt from garbage collection. This can be achieved with the following DDL statement: ALTER STATISTICS SET OPTIONS (allow_gc=false) The list of available statistics packages can be queried from `INFORMATION_SCHEMA.SPANNER_STATISTICS`. Executing a SQL statement with an invalid optimizer statistics package or with a statistics package that allows garbage collection fails with an `INVALID_ARGUMENT` error. |
| `optimizerVersion` | string | An option to control the selection of optimizer version. This parameter allows individual queries to pick different query optimizer versions. Specifying `latest` as a value instructs Cloud Spanner to use the latest supported query optimizer version. If not specified, Cloud Spanner uses the optimizer version set at the database level options. Any other positive integer (from the list of supported optimizer versions) overrides the default optimizer version for query execution. The list of supported optimizer versions can be queried from `SPANNER_SYS.SUPPORTED_OPTIMIZER_VERSIONS`. Executing a SQL statement with an invalid optimizer version fails with an `INVALID_ARGUMENT` error. See https://cloud.google.com/spanner/docs/query-optimizer/manage-query-optimizer for more information on managing the query optimizer. The `optimizer_version` statement hint has precedence over this setting. |

### `QueryPlan`

- Contains an ordered list of nodes appearing in the query plan.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `planNodes` | array<PlanNode> | The nodes in the query plan. Plan nodes are returned in pre-order starting with the plan root. Each PlanNode's `id` corresponds to its index in `plan_nodes`. |
| `queryAdvice` | QueryAdvisorResult | Optional. The advise/recommendations for a query. Currently this field will be serving index recommendations for a query. |

### `QuorumInfo`

- Information about the dual-region quorum.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `etag` | string | Output only. The etag is used for optimistic concurrency control as a way to help prevent simultaneous `ChangeQuorum` requests that might create a race condition. |
| `initiator` | string enum | Output only. Whether this `ChangeQuorum` is Google or User initiated. Values: `INITIATOR_UNSPECIFIED`, `GOOGLE`, `USER`. |
| `quorumType` | QuorumType | Output only. The type of this quorum. See QuorumType for more information about quorum type specifications. |
| `startTime` | string (google-datetime) | Output only. The timestamp when the request was triggered. |

### `QuorumType`

- Information about the database quorum type. This only applies to dual-region instance configs.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `dualRegion` | DualRegionQuorum | Dual-region quorum type. |
| `singleRegion` | SingleRegionQuorum | Single-region quorum type. |

### `ReadOnly`

- Message type to initiate a read-only transaction.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `exactStaleness` | string (google-duration) | Executes all reads at a timestamp that is `exact_staleness` old. The timestamp is chosen soon after the read is started. Guarantees that all writes that have committed more than the specified number of seconds ago are visible. Because Cloud Spanner chooses the exact timestamp, this mode works even if the client's local clock is substantially skewed from Cloud Spanner commit timestamps. Useful for reading at nearby replicas without the distributed timestamp negotiation overhead of `max_staleness`. |
| `maxStaleness` | string (google-duration) | Read data at a timestamp >= `NOW - max_staleness` seconds. Guarantees that all writes that have committed more than the specified number of seconds ago are visible. Because Cloud Spanner chooses the exact timestamp, this mode works even if the client's local clock is substantially skewed from Cloud Spanner commit timestamps. Useful for reading the freshest data available at a nearby replica, while bounding the possible staleness if the local replica has fallen behind. Note that this option can only be used in single-use transactions. |
| `minReadTimestamp` | string (google-datetime) | Executes all reads at a timestamp >= `min_read_timestamp`. This is useful for requesting fresher data than some previous read, or data that is fresh enough to observe the effects of some previously committed transaction whose timestamp is known. Note that this option can only be used in single-use transactions. A timestamp in RFC3339 UTC \"Zulu\" format, accurate to nanoseconds. Example: `"2014-10-02T15:01:23.045123456Z"`. |
| `readTimestamp` | string (google-datetime) | Executes all reads at the given timestamp. Unlike other modes, reads at a specific timestamp are repeatable; the same read at the same timestamp always returns the same data. If the timestamp is in the future, the read is blocked until the specified timestamp, modulo the read's deadline. Useful for large scale consistent reads such as mapreduces, or for coordinating many reads against a consistent snapshot of the data. A timestamp in RFC3339 UTC \"Zulu\" format, accurate to nanoseconds. Example: `"2014-10-02T15:01:23.045123456Z"`. |
| `returnReadTimestamp` | boolean | If true, the Cloud Spanner-selected read timestamp is included in the Transaction message that describes the transaction. |
| `strong` | boolean | Read at a timestamp where all previously committed transactions are visible. |

### `ReadRequest`

- The request for Read and StreamingRead.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `columns` | array<string> | Required. The columns of table to be returned for each row matching this request. |
| `dataBoostEnabled` | boolean | If this is for a partitioned read and this field is set to `true`, the request is executed with Spanner Data Boost independent compute resources. If the field is set to `true` but the request doesn't set `partition_token`, the API returns an `INVALID_ARGUMENT` error. |
| `directedReadOptions` | DirectedReadOptions | Directed read options for this request. |
| `index` | string | If non-empty, the name of an index on table. This index is used instead of the table primary key when interpreting key_set and sorting result rows. See key_set for further information. |
| `keySet` | KeySet | Required. `key_set` identifies the rows to be yielded. `key_set` names the primary keys of the rows in table to be yielded, unless index is present. If index is present, then key_set instead names index keys in index. If the partition_token field is empty, rows are yielded in table primary key order (if index is empty) or index key order (if index is non-empty). If the partition_token field isn't empty, rows are yielded in an unspecified order. It isn't an error for the `key_set` to name rows that don't exist in the database. Read yields nothing for nonexistent rows. |
| `limit` | string (int64) | If greater than zero, only the first `limit` rows are yielded. If `limit` is zero, the default is no limit. A limit can't be specified if `partition_token` is set. |
| `lockHint` | string enum | Optional. Lock Hint for the request, it can only be used with read-write transactions. Values: `LOCK_HINT_UNSPECIFIED`, `LOCK_HINT_SHARED`, `LOCK_HINT_EXCLUSIVE`. |
| `orderBy` | string enum | Optional. Order for the returned rows. By default, Spanner returns result rows in primary key order except for PartitionRead requests. For applications that don't require rows to be returned in primary key (`ORDER_BY_PRIMARY_KEY`) order, setting `ORDER_BY_NO_ORDER` option allows Spanner to optimize row retrieval, resulting in lower latencies in certain cases (for example, bulk point lookups). Values: `ORDER_BY_UNSPECIFIED`, `ORDER_BY_PRIMARY_KEY`, `ORDER_BY_NO_ORDER`. |
| `partitionToken` | string (byte) | If present, results are restricted to the specified partition previously created using `PartitionRead`. There must be an exact match for the values of fields common to this message and the PartitionReadRequest message used to create this partition_token. |
| `requestOptions` | RequestOptions | Common options for this request. |
| `resumeToken` | string (byte) | If this request is resuming a previously interrupted read, `resume_token` should be copied from the last PartialResultSet yielded before the interruption. Doing this enables the new read to resume where the last read left off. The rest of the request parameters must exactly match the request that yielded this token. |
| `table` | string | Required. The name of the table in the database to be read. |
| `transaction` | TransactionSelector | The transaction to use. If none is provided, the default is a temporary read-only transaction with strong concurrency. |

### `ReadWrite`

- Message type to initiate a read-write transaction. Currently this transaction type has no options.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `multiplexedSessionPreviousTransactionId` | string (byte) | Optional. Clients should pass the transaction ID of the previous transaction attempt that was aborted if this transaction is being executed on a multiplexed session. |
| `readLockMode` | string enum | The read lock mode for the transaction. Values: `READ_LOCK_MODE_UNSPECIFIED`, `PESSIMISTIC`, `OPTIMISTIC`. |

### `ReplicaComputeCapacity`

- ReplicaComputeCapacity describes the amount of server resources that are allocated to each replica identified by the replica selection.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nodeCount` | integer (int32) | The number of nodes allocated to each replica. This may be zero in API responses for instances that are not yet in state `READY`. |
| `processingUnits` | integer (int32) | The number of processing units allocated to each replica. This may be zero in API responses for instances that are not yet in state `READY`. |
| `replicaSelection` | InstanceReplicaSelection | Required. Identifies replicas by specified properties. All replicas in the selection have the same amount of compute capacity. |

### `ReplicaInfo`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `defaultLeaderLocation` | boolean | If true, this location is designated as the default leader location where leader replicas are placed. See the region types documentation (https://cloud.google.com/spanner/docs/instances#region_types) for more details. |
| `location` | string | The location of the serving resources, e.g., "us-central1". |
| `type` | string enum | The type of replica. Values: `TYPE_UNSPECIFIED`, `READ_WRITE`, `READ_ONLY`, `WITNESS`. |

### `ReplicaSelection`

- The directed read replica selector. Callers must provide one or more of the following fields for replica selection: \* `location` - The location must be one of the regions within the multi-region configuration of your database. \* `type` - The type of the replica. Some examples of using replica_selectors are: \* `location:us-east1` --> The "us-east1" replica(s) of any available type is used to process the request. \* `type:READ_ONLY` --> The "READ_ONLY" type replica(s) in the nearest available location are used to process the request. \* `location:us-east1 type:READ_ONLY` --> The "READ_ONLY" type replica(s) in location "us-east1" is used to process the request.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `location` | string | The location or region of the serving requests, for example, "us-east1". |
| `type` | string enum | The type of replica. Values: `TYPE_UNSPECIFIED`, `READ_WRITE`, `READ_ONLY`. |

### `RequestOptions`

- Common request options for various APIs.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `clientContext` | ClientContext | Optional. Optional context that may be needed for some requests. |
| `priority` | string enum | Priority for the request. Values: `PRIORITY_UNSPECIFIED`, `PRIORITY_LOW`, `PRIORITY_MEDIUM`, `PRIORITY_HIGH`. |
| `requestTag` | string | A per-request tag which can be applied to queries or reads, used for statistics collection. Both `request_tag` and `transaction_tag` can be specified for a read or query that belongs to a transaction. This field is ignored for requests where it's not applicable (for example, `CommitRequest`). Legal characters for `request_tag` values are all printable characters (ASCII 32 - 126) and the length of a request_tag is limited to 50 characters. Values that exceed this limit are truncated. Any leading underscore (\_) characters are removed from the string. |
| `transactionTag` | string | A tag used for statistics collection about this transaction. Both `request_tag` and `transaction_tag` can be specified for a read or query that belongs to a transaction. To enable tagging on a transaction, `transaction_tag` must be set to the same value for all requests belonging to the same transaction, including BeginTransaction. If this request doesn't belong to any transaction, `transaction_tag` is ignored. Legal characters for `transaction_tag` values are all printable characters (ASCII 32 - 126) and the length of a `transaction_tag` is limited to 50 characters. Values that exceed this limit are truncated. Any leading underscore (\_) characters are removed from the string. |

### `RestoreDatabaseEncryptionConfig`

- Encryption configuration for the restored database.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `encryptionType` | string enum | Required. The encryption type of the restored database. Values: `ENCRYPTION_TYPE_UNSPECIFIED`, `USE_CONFIG_DEFAULT_OR_BACKUP_ENCRYPTION`, `GOOGLE_DEFAULT_ENCRYPTION`, `CUSTOMER_MANAGED_ENCRYPTION`. |
| `kmsKeyName` | string | Optional. This field is maintained for backwards compatibility. For new callers, we recommend using `kms_key_names` to specify the KMS key. Only use `kms_key_name` if the location of the KMS key matches the database instance's configuration (location) exactly. For example, if the KMS location is in `us-central1` or `nam3`, then the database instance must also be in `us-central1` or `nam3`. The Cloud KMS key that is used to encrypt and decrypt the restored database. Set this field only when encryption_type is `CUSTOMER_MANAGED_ENCRYPTION`. Values are of the form `projects//locations//keyRings//cryptoKeys/`. |
| `kmsKeyNames` | array<string> | Optional. Specifies the KMS configuration for one or more keys used to encrypt the database. Values have the form `projects//locations//keyRings//cryptoKeys/`. The keys referenced by `kms_key_names` must fully cover all regions of the database's instance configuration. Some examples: \* For regional (single-region) instance configurations, specify a regional location KMS key. \* For multi-region instance configurations of type `GOOGLE_MANAGED`, either specify a multi-region location KMS key or multiple regional location KMS keys that cover all regions in the instance configuration. \* For an instance configuration of type `USER_MANAGED`, specify only regional location KMS keys to cover each region in the instance configuration. Multi-region location KMS keys aren't supported for `USER_MANAGED` type instance configurations. |

### `RestoreDatabaseMetadata`

- Metadata type for the long-running operation returned by RestoreDatabase.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `backupInfo` | BackupInfo | Information about the backup used to restore the database. |
| `cancelTime` | string (google-datetime) | The time at which cancellation of this operation was received. Operations.CancelOperation starts asynchronous cancellation on a long-running operation. The server makes a best effort to cancel the operation, but success is not guaranteed. Clients can use Operations.GetOperation or other methods to check whether the cancellation succeeded or whether the operation completed despite cancellation. On successful cancellation, the operation is not deleted; instead, it becomes an operation with an Operation.error value with a google.rpc.Status.code of 1, corresponding to `Code.CANCELLED`. |
| `name` | string | Name of the database being created and restored to. |
| `optimizeDatabaseOperationName` | string | If exists, the name of the long-running operation that will be used to track the post-restore optimization process to optimize the performance of the restored database, and remove the dependency on the restore source. The name is of the form `projects//instances//databases//operations/` where the is the name of database being created and restored to. The metadata type of the long-running operation is OptimizeRestoredDatabaseMetadata. This long-running operation will be automatically created by the system after the RestoreDatabase long-running operation completes successfully. This operation will not be created if the restore was not successful. |
| `progress` | OperationProgress | The progress of the RestoreDatabase operation. |
| `sourceType` | string enum | The type of the restore source. Values: `TYPE_UNSPECIFIED`, `BACKUP`. |

### Shape of `Ack`

Generated from the Discovery schema (not in the official docs); values show each field type:

```json
{
  "ignoreNotFound": "boolean",
  "key": "array<any>",
  "queue": "string"
}
```

## Notes

- Generated from the Discovery document(s) v1 of `spanner` (retrieved 2026-11-14); a type with the same fields in several versions shows the preferred version; a type whose fields differ between versions is listed once per version (heading suffix `(version)`), and each type's `Version` line names the document it was taken from. A `$ref` resolves to the definition of the same version.
- Descriptions are verbatim from Discovery, which drops angle-bracket placeholders of the source comments: a format such as `projects//locations/global` stands for `projects/{project}/locations/global` (likewise `"@.iam.gserviceaccount.com"` lost the account ID before `@`, and a name format ending in a collection such as `projects/*/locations/*/registrations/` lost its last ID), and an expression such as `... && in labels` lost its left operand (for example `'label_value' in labels`). Check the method or field in the product's REST reference before relying on such a format.
- Source: https://spanner.googleapis.com/$discovery/rest?version=v1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
