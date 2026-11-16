---
source: https://alloydb.googleapis.com/$discovery/rest?version=v1
---

# AlloyDB API message schemas (alloydb) (part 1/2)

## Signature / Usage

Message types referenced by the methods listed under `references/rest/alloydb/`.

### `AuthorizedNetwork`

- AuthorizedNetwork contains metadata for an authorized network.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `cidrRange` | string | CIDR range for one authorzied network of the instance. |

### `AutoScalingConfig`

- Configuration for autoscaling.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `policy` | Policy | Policy for the MIG autoscaler. |
| `schedules` | array<Schedule> | Optional list of schedules for the MIG autoscaler. If not set, no schedules are created. |

### `AutomatedBackupPolicy`

- Message describing the user-specified automated backup policy. All fields in the automated backup policy are optional. Defaults for each field are provided if they are not set.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `backupWindow` | string (google-duration) | The length of the time window during which a backup can be taken. If a backup does not succeed within this time window, it will be canceled and considered failed. The backup window must be at least 5 minutes long. There is no upper bound on the window. If not set, it defaults to 1 hour. |
| `enabled` | boolean | Whether automated automated backups are enabled. If not set, defaults to true. |
| `encryptionConfig` | EncryptionConfig | Optional. The encryption config can be specified to encrypt the backups with a customer-managed encryption key (CMEK). When this field is not specified, the backup will use the cluster's encryption config. |
| `labels` | object | Labels to apply to backups created using this configuration. |
| `location` | string | The location where the backup will be stored. Currently, the only supported option is to store the backup in the same region as the cluster. If empty, defaults to the region of the cluster. |
| `quantityBasedRetention` | QuantityBasedRetention | Quantity-based Backup retention policy to retain recent backups. |
| `timeBasedRetention` | TimeBasedRetention | Time-based Backup retention policy. |
| `weeklySchedule` | WeeklySchedule | Weekly schedule for the Backup. |

### `Backup`

- Message describing Backup object
- Version: v1

| Field | Type | Description |
|---|---|---|
| `annotations` | object | Annotations to allow client tools to store small amount of arbitrary data. This is distinct from labels. https://google.aip.dev/128 |
| `clusterName` | string | Required. The full resource name of the backup source cluster (e.g., projects/{project}/locations/{region}/clusters/{cluster_id}). |
| `clusterUid` | string | Output only. The system-generated UID of the cluster which was used to create this resource. |
| `createCompletionTime` | string (google-datetime) | Output only. Timestamp when the resource finished being created. |
| `createTime` | string (google-datetime) | Output only. Create time stamp |
| `databaseVersion` | string enum | Output only. The database engine major version of the cluster this backup was created from. Any restored cluster created from this backup will have the same database version. Values: `DATABASE_VERSION_UNSPECIFIED`, `POSTGRES_13`, `POSTGRES_14`, `POSTGRES_15`, `POSTGRES_16`, `POSTGRES_17`, `POSTGRES_18`. |
| `deleteTime` | string (google-datetime) | Output only. Delete time stamp |
| `description` | string | User-provided description of the backup. |
| `displayName` | string | User-settable and human-readable display name for the Backup. |
| `encryptionConfig` | EncryptionConfig | Optional. The encryption config can be specified to encrypt the backup with a customer-managed encryption key (CMEK). When this field is not specified, the backup will then use default encryption scheme to protect the user data. |
| `encryptionInfo` | EncryptionInfo | Output only. The encryption information for the backup. |
| `etag` | string | For Resource freshness validation (https://google.aip.dev/154) |
| `expiryQuantity` | QuantityBasedExpiry | Output only. The QuantityBasedExpiry of the backup, specified by the backup's retention policy. Once the expiry quantity is over retention, the backup is eligible to be garbage collected. |
| `expiryTime` | string (google-datetime) | Output only. The time at which after the backup is eligible to be garbage collected. It is the duration specified by the backup's retention policy, added to the backup's create_time. |
| `labels` | object | Labels as key value pairs |
| `name` | string | Output only. The name of the backup resource with the format: \* projects/{project}/locations/{region}/backups/{backup_id} where the cluster and backup ID segments should satisfy the regex expression `[a-z]([a-z0-9-]{0,61}[a-z0-9])?`, e.g. 1-63 characters of lowercase letters, numbers, and dashes, starting with a letter, and ending with a letter or number. For more details see https://google.aip.dev/122. The prefix of the backup resource name is the name of the parent resource: \* projects/{project}/locations/{region} |
| `reconciling` | boolean | Output only. Reconciling (https://google.aip.dev/128#reconciliation), if true, indicates that the service is actively updating the resource. This can happen due to user-triggered updates or system actions like failover or maintenance. |
| `satisfiesPzs` | boolean | Output only. Reserved for future use. |
| `sizeBytes` | string (int64) | Output only. The size of the backup in bytes. |
| `state` | string enum | Output only. The current state of the backup. Values: `STATE_UNSPECIFIED`, `READY`, `CREATING`, `FAILED`, `DELETING`. |
| `tags` | object | Optional. Input only. Immutable. Tag keys/values directly bound to this resource. For example: "123/environment": "production", "123/costCenter": "marketing" |
| `type` | string enum | The backup type, which suggests the trigger for the backup. Values: `TYPE_UNSPECIFIED`, `ON_DEMAND`, `AUTOMATED`, `CONTINUOUS`. |
| `uid` | string | Output only. The system-generated UID of the resource. The UID is assigned when the resource is created, and it is retained until it is deleted. |
| `updateTime` | string (google-datetime) | Output only. Update time stamp Users should not infer any meaning from this field. Its value is generally unrelated to the timing of the backup creation operation. |

### `Backup` (v1alpha)

- Message describing Backup object
- Version: v1alpha

| Field | Type | Description |
|---|---|---|
| `annotations` | object | Annotations to allow client tools to store small amount of arbitrary data. This is distinct from labels. https://google.aip.dev/128 |
| `clusterDeleted` | boolean | Output only. Set to true if the cluster corresponding to this backup is deleted. This field is only populated for when using the BACKUP_VIEW_CLUSTER_DELETED view. |
| `clusterName` | string | Required. The full resource name of the backup source cluster (e.g., projects/{project}/locations/{region}/clusters/{cluster_id}). |
| `clusterUid` | string | Output only. The system-generated UID of the cluster which was used to create this resource. |
| `createCompletionTime` | string (google-datetime) | Output only. Timestamp when the resource finished being created. |
| `createTime` | string (google-datetime) | Output only. Create time stamp |
| `databaseVersion` | string enum | Output only. The database engine major version of the cluster this backup was created from. Any restored cluster created from this backup will have the same database version. Values: `DATABASE_VERSION_UNSPECIFIED`, `POSTGRES_13`, `POSTGRES_14`, `POSTGRES_15`, `POSTGRES_16`, `POSTGRES_17`, `POSTGRES_18`, `POSTGRES_19`. |
| `deleteTime` | string (google-datetime) | Output only. Delete time stamp |
| `description` | string | User-provided description of the backup. |
| `displayName` | string | User-settable and human-readable display name for the Backup. |
| `edition` | string enum | Output only. Deprecated: Use `express_config` instead. Output only. The edition of the cluster this backup was created from. Any restored cluster created from this backup will have the same edition. Values: `EDITION_UNSPECIFIED`, `EDITION_ALLOYDB`, `EDITION_ALLOYDB_DEVELOPER`. |
| `encryptionConfig` | EncryptionConfig | Optional. The encryption config can be specified to encrypt the backup with a customer-managed encryption key (CMEK). When this field is not specified, the backup will then use default encryption scheme to protect the user data. |
| `encryptionInfo` | EncryptionInfo | Output only. The encryption information for the backup. |
| `etag` | string | For Resource freshness validation (https://google.aip.dev/154) |
| `expiryQuantity` | QuantityBasedExpiry | Output only. The QuantityBasedExpiry of the backup, specified by the backup's retention policy. Once the expiry quantity is over retention, the backup is eligible to be garbage collected. |
| `expiryTime` | string (google-datetime) | Output only. The time at which after the backup is eligible to be garbage collected. It is the duration specified by the backup's retention policy, added to the backup's create_time. |
| `expressConfig` | ExpressConfig | Output only. The Express configuration of the cluster this backup was created from. Any restored cluster created from this backup will have the same Express configuration. |
| `labels` | object | Labels as key value pairs |
| `name` | string | Output only. The name of the backup resource with the format: \* projects/{project}/locations/{region}/backups/{backup_id} where the cluster and backup ID segments should satisfy the regex expression `[a-z]([a-z0-9-]{0,61}[a-z0-9])?`, e.g. 1-63 characters of lowercase letters, numbers, and dashes, starting with a letter, and ending with a letter or number. For more details see https://google.aip.dev/122. The prefix of the backup resource name is the name of the parent resource: \* projects/{project}/locations/{region} |
| `reconciling` | boolean | Output only. Reconciling (https://google.aip.dev/128#reconciliation), if true, indicates that the service is actively updating the resource. This can happen due to user-triggered updates or system actions like failover or maintenance. |
| `satisfiesPzi` | boolean | Output only. Reserved for future use. |
| `satisfiesPzs` | boolean | Output only. Reserved for future use. |
| `sizeBytes` | string (int64) | Output only. The size of the backup in bytes. |
| `state` | string enum | Output only. The current state of the backup. Values: `STATE_UNSPECIFIED`, `READY`, `CREATING`, `FAILED`, `DELETING`. |
| `tags` | object | Optional. Input only. Immutable. Tag keys/values directly bound to this resource. For example: "123/environment": "production", "123/costCenter": "marketing" |
| `type` | string enum | The backup type, which suggests the trigger for the backup. Values: `TYPE_UNSPECIFIED`, `ON_DEMAND`, `AUTOMATED`, `CONTINUOUS`. |
| `uid` | string | Output only. The system-generated UID of the resource. The UID is assigned when the resource is created, and it is retained until it is deleted. |
| `updateTime` | string (google-datetime) | Output only. Update time stamp Users should not infer any meaning from this field. Its value is generally unrelated to the timing of the backup creation operation. |

### `Backup` (v1beta)

- Message describing Backup object
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `annotations` | object | Annotations to allow client tools to store small amount of arbitrary data. This is distinct from labels. https://google.aip.dev/128 |
| `clusterDeleted` | boolean | Output only. Set to true if the cluster corresponding to this backup is deleted. This field is only populated for when using the BACKUP_VIEW_CLUSTER_DELETED view. |
| `clusterName` | string | Required. The full resource name of the backup source cluster (e.g., projects/{project}/locations/{region}/clusters/{cluster_id}). |
| `clusterUid` | string | Output only. The system-generated UID of the cluster which was used to create this resource. |
| `createCompletionTime` | string (google-datetime) | Output only. Timestamp when the resource finished being created. |
| `createTime` | string (google-datetime) | Output only. Create time stamp |
| `databaseVersion` | string enum | Output only. The database engine major version of the cluster this backup was created from. Any restored cluster created from this backup will have the same database version. Values: `DATABASE_VERSION_UNSPECIFIED`, `POSTGRES_13`, `POSTGRES_14`, `POSTGRES_15`, `POSTGRES_16`, `POSTGRES_17`, `POSTGRES_18`, `POSTGRES_19`. |
| `deleteTime` | string (google-datetime) | Output only. Delete time stamp |
| `description` | string | User-provided description of the backup. |
| `displayName` | string | User-settable and human-readable display name for the Backup. |
| `edition` | string enum | Output only. Deprecated: Use `express_config` instead. Output only. The edition of the cluster this backup was created from. Any restored cluster created from this backup will have the same edition. Values: `EDITION_UNSPECIFIED`, `EDITION_ALLOYDB`, `EDITION_ALLOYDB_DEVELOPER`. |
| `encryptionConfig` | EncryptionConfig | Optional. The encryption config can be specified to encrypt the backup with a customer-managed encryption key (CMEK). When this field is not specified, the backup will then use default encryption scheme to protect the user data. |
| `encryptionInfo` | EncryptionInfo | Output only. The encryption information for the backup. |
| `etag` | string | For Resource freshness validation (https://google.aip.dev/154) |
| `expiryQuantity` | QuantityBasedExpiry | Output only. The QuantityBasedExpiry of the backup, specified by the backup's retention policy. Once the expiry quantity is over retention, the backup is eligible to be garbage collected. |
| `expiryTime` | string (google-datetime) | Output only. The time at which after the backup is eligible to be garbage collected. It is the duration specified by the backup's retention policy, added to the backup's create_time. |
| `expressConfig` | ExpressConfig | Output only. The Express configuration of the cluster this backup was created from. Any restored cluster created from this backup will have the same Express configuration. |
| `labels` | object | Labels as key value pairs |
| `name` | string | Output only. The name of the backup resource with the format: \* projects/{project}/locations/{region}/backups/{backup_id} where the cluster and backup ID segments should satisfy the regex expression `[a-z]([a-z0-9-]{0,61}[a-z0-9])?`, e.g. 1-63 characters of lowercase letters, numbers, and dashes, starting with a letter, and ending with a letter or number. For more details see https://google.aip.dev/122. The prefix of the backup resource name is the name of the parent resource: \* projects/{project}/locations/{region} |
| `reconciling` | boolean | Output only. Reconciling (https://google.aip.dev/128#reconciliation), if true, indicates that the service is actively updating the resource. This can happen due to user-triggered updates or system actions like failover or maintenance. |
| `satisfiesPzs` | boolean | Output only. Reserved for future use. |
| `sizeBytes` | string (int64) | Output only. The size of the backup in bytes. |
| `state` | string enum | Output only. The current state of the backup. Values: `STATE_UNSPECIFIED`, `READY`, `CREATING`, `FAILED`, `DELETING`. |
| `tags` | object | Optional. Input only. Immutable. Tag keys/values directly bound to this resource. For example: "123/environment": "production", "123/costCenter": "marketing" |
| `type` | string enum | The backup type, which suggests the trigger for the backup. Values: `TYPE_UNSPECIFIED`, `ON_DEMAND`, `AUTOMATED`, `CONTINUOUS`. |
| `uid` | string | Output only. The system-generated UID of the resource. The UID is assigned when the resource is created, and it is retained until it is deleted. |
| `updateTime` | string (google-datetime) | Output only. Update time stamp Users should not infer any meaning from this field. Its value is generally unrelated to the timing of the backup creation operation. |

### `BackupDrBackupSource`

- Message describing a BackupDrBackupSource.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `backup` | string | Required. The name of the backup resource with the format: \* projects/{project}/locations/{location}/backupVaults/{backupvault_id}/dataSources/{datasource_id}/backups/{backup_id} |

### `BackupDrEnabledWindow`

- Information about a single window when BackupDR was enabled for this cluster.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `automatedBackupPreviouslyEnabled` | boolean | Whether automated backup was previously enabled prior to enabling BackupDR protection for this cluster. |
| `backupPlanAssociation` | string | The BackupPlanAssociation resource that was used to enable BackupDR protection for this cluster. |
| `continuousBackupPreviousRecoveryWindowDays` | integer (int32) | The retention set for the continuous backup that was previously enabled prior to enabling BackupDR protection for this cluster. |
| `continuousBackupPreviouslyEnabled` | boolean | Whether continuous backup was previously enabled prior to enabling BackupDR protection for this cluster. |
| `continuousBackupPreviouslyEnabledTime` | string (google-datetime) | The time when continuous backup was previously enabled prior to enabling BackupDR protection for this cluster. |
| `dataSource` | string | The DataSource resource that represents the cluster in BackupDR. |
| `disabledTime` | string (google-datetime) | Time when the BackupDR protection for this cluster was disabled. This field will be empty if this BackupDR window is the `current_window`. |
| `enabledTime` | string (google-datetime) | Time when the BackupDR protection for this cluster was enabled. |
| `logRetentionPeriod` | string (google-duration) | The retention period for logs generated by BackupDR for this cluster. |

### `BackupDrInfo`

- Information about BackupDR protection for this cluster.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `currentWindow` | BackupDrEnabledWindow | The current BackupDR configuration for this cluster. If BackupDR protection is not enabled for this cluster, this field will be empty. |
| `previousWindows` | array<BackupDrEnabledWindow> | Windows during which BackupDR was enabled for this cluster, along with associated configuration for that window. These are used to determine points-in-time for which restores can be performed. The windows are ordered with the most recent window last. Windows are mutally exclusive. Windows which closed more than 1 year ago will be removed from this list. |

### `BackupDrPitrSource`

- Message describing a BackupDrPitrSource.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `dataSource` | string | Required. The name of the backup resource with the format: \* projects/{project}/locations/{location}/backupVaults/{backupvault_id}/dataSources/{datasource_id} |
| `pointInTime` | string (google-datetime) | Required. The point in time to restore to. |

### `BackupSource`

- Message describing a BackupSource.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `backupName` | string | Required. The name of the backup resource with the format: \* projects/{project}/locations/{region}/backups/{backup_id} |
| `backupUid` | string | Output only. The system-generated UID of the backup which was used to create this resource. The UID is generated when the backup is created, and it is retained until the backup is deleted. |

### `CancelOperationRequest`

- The request message for Operations.CancelOperation.
- Version: v1

### `CertificateAuthorityInfo`

- Certificate Authority (CA) information for the cluster.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `rootCaCert` | string | Output only. The PEM-encoded root CA certificate of the cluster. Save this to a file (conventionally `root.crt`) and point the PostgreSQL client at it to authenticate by connecting with `sslmode=verify-full` or `sslmode=verify-ca`. |

### `ClientConnectionConfig`

- Client connection configuration
- Version: v1

| Field | Type | Description |
|---|---|---|
| `requireConnectors` | boolean | Optional. Configuration to enforce connectors only (ex: AuthProxy) connections to the database. |
| `sslConfig` | SslConfig | Optional. SSL configuration option for this instance. |

### `CloudControl2SharedOperationsReconciliationOperationMetadata`

- Operation metadata returned by the CLH during resource state reconciliation.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `deleteResource` | boolean | DEPRECATED. Use exclusive_action instead. |
| `exclusiveAction` | string enum | Excluisive action returned by the CLH. Values: `UNKNOWN_REPAIR_ACTION`, `DELETE`, `RETRY`. |

### `CloudSQLBackupRunSource`

- The source CloudSQL backup resource.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `backupRunId` | string (int64) | Required. The CloudSQL backup run ID. |
| `instanceId` | string | Required. The CloudSQL instance ID. |
| `project` | string | The project ID of the source CloudSQL instance. This should be the same as the AlloyDB cluster's project. |

### `Cluster`

- A cluster is a collection of regional AlloyDB resources. It can include a primary instance and one or more read pool instances. All cluster resources share a storage layer, which scales as needed.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `annotations` | object | Annotations to allow client tools to store small amount of arbitrary data. This is distinct from labels. https://google.aip.dev/128 |
| `automatedBackupPolicy` | AutomatedBackupPolicy | The automated backup policy for this cluster. If no policy is provided then the default policy will be used. If backups are supported for the cluster, the default policy takes one backup a day, has a backup window of 1 hour, and retains backups for 14 days. For more information on the defaults, consult the documentation for the message type. |
| `backupSource` | BackupSource | Output only. Cluster created from backup. |
| `backupdrBackupSource` | BackupDrBackupSource | Output only. Cluster created from a BackupDR backup. |
| `backupdrInfo` | BackupDrInfo | Output only. Output only information about BackupDR protection for this cluster. |
| `cloudsqlBackupRunSource` | CloudSQLBackupRunSource | Output only. Cluster created from CloudSQL snapshot. |
| `clusterType` | string enum | Output only. The type of the cluster. This is an output-only field and it's populated at the Cluster creation time or the Cluster promotion time. The cluster type is determined by which RPC was used to create the cluster (i.e. `CreateCluster` vs. `CreateSecondaryCluster` Values: `CLUSTER_TYPE_UNSPECIFIED`, `PRIMARY`, `SECONDARY`. |
| `continuousBackupConfig` | ContinuousBackupConfig | Optional. Continuous backup configuration for this cluster. |
| `continuousBackupInfo` | ContinuousBackupInfo | Output only. Continuous backup properties for this cluster. |
| `createTime` | string (google-datetime) | Output only. Create time stamp |
| `databaseVersion` | string enum | Optional. The database engine major version. This is an optional field and it is populated at the Cluster creation time. If a database version is not supplied at cluster creation time, then a default database version will be used. Values: `DATABASE_VERSION_UNSPECIFIED`, `POSTGRES_13`, `POSTGRES_14`, `POSTGRES_15`, `POSTGRES_16`, `POSTGRES_17`, `POSTGRES_18`. |
| `dataplexConfig` | DataplexConfig | Optional. Configuration for Dataplex integration. |
| `deleteTime` | string (google-datetime) | Output only. Delete time stamp |
| `displayName` | string | User-settable and human-readable display name for the Cluster. |
| `encryptionConfig` | EncryptionConfig | Optional. The encryption config can be specified to encrypt the data disks and other persistent data resources of a cluster with a customer-managed encryption key (CMEK). When this field is not specified, the cluster will then use default encryption scheme to protect the user data. |
| `encryptionInfo` | EncryptionInfo | Output only. The encryption information for the cluster. |
| `etag` | string | For Resource freshness validation (https://google.aip.dev/154) |
| `initialUser` | UserPassword | Input only. Initial user to setup during cluster creation. Required. If used in `RestoreCluster` this is ignored. |
| `labels` | object | Labels as key value pairs |
| `maintenanceSchedule` | MaintenanceSchedule | Output only. The maintenance schedule for the cluster, generated for a specific rollout if a maintenance window is set. |
| `maintenanceUpdatePolicy` | MaintenanceUpdatePolicy | Optional. The maintenance update policy determines when to allow or deny updates. |
| `maintenanceVersionSelectionPolicy` | string enum | Input only. Policy to use to automatically select the maintenance version to which to update the cluster's instances. Values: `MAINTENANCE_VERSION_SELECTION_POLICY_UNSPECIFIED`, `MAINTENANCE_VERSION_SELECTION_POLICY_LATEST`, `MAINTENANCE_VERSION_SELECTION_POLICY_DEFAULT`. |
| `migrationSource` | MigrationSource | Output only. Cluster created via DMS migration. |
| `name` | string | Output only. The name of the cluster resource with the format: \* projects/{project}/locations/{region}/clusters/{cluster_id} where the cluster ID segment should satisfy the regex expression `[a-z0-9-]+`. For more details see https://google.aip.dev/122. The prefix of the cluster resource name is the name of the parent resource: \* projects/{project}/locations/{region} |
| `network` | string | Required. The resource link for the VPC network in which cluster resources are created and from which they are accessible via Private IP. The network must belong to the same project as the cluster. It is specified in the form: `projects/{project}/global/networks/{network_id}`. This is required to create a cluster. Deprecated, use network_config.network instead. |
| `networkConfig` | NetworkConfig | Optional. |
| `primaryConfig` | PrimaryConfig | Output only. Cross Region replication config specific to PRIMARY cluster. |
| `pscConfig` | PscConfig | Optional. The configuration for Private Service Connect (PSC) for the cluster. |
| `reconciling` | boolean | Output only. Reconciling (https://google.aip.dev/128#reconciliation). Set to true if the current state of Cluster does not match the user's intended state, and the service is actively updating the resource to reconcile them. This can happen due to user-triggered updates or system actions like failover or maintenance. |
| `satisfiesPzs` | boolean | Output only. Reserved for future use. |
| `secondaryConfig` | SecondaryConfig | Cross Region replication config specific to SECONDARY cluster. |
| `sslConfig` | SslConfig | SSL configuration for this AlloyDB cluster. |
| `state` | string enum | Output only. The current serving state of the cluster. Values: `STATE_UNSPECIFIED`, `READY`, `STOPPED`, `EMPTY`, `CREATING`, `DELETING`, `FAILED`, `BOOTSTRAPPING`, `MAINTENANCE`, `PROMOTING`, `SWITCHOVER`. |
| `subscriptionType` | string enum | Optional. Subscription type of the cluster. Values: `SUBSCRIPTION_TYPE_UNSPECIFIED`, `STANDARD`, `TRIAL`. |
| `tags` | object | Optional. Input only. Immutable. Tag keys/values directly bound to this resource. For example: "123/environment": "production", "123/costCenter": "marketing" |
| `trialMetadata` | TrialMetadata | Output only. Metadata for free trial clusters |
| `uid` | string | Output only. The system-generated UID of the resource. The UID is assigned when the resource is created, and it is retained until it is deleted. |
| `updateTime` | string (google-datetime) | Output only. Update time stamp |

### `Cluster` (v1alpha)

- A cluster is a collection of regional AlloyDB resources. It can include a primary instance and one or more read pool instances. All cluster resources share a storage layer, which scales as needed.
- Version: v1alpha

| Field | Type | Description |
|---|---|---|
| `annotations` | object | Annotations to allow client tools to store small amount of arbitrary data. This is distinct from labels. https://google.aip.dev/128 |
| `automatedBackupPolicy` | AutomatedBackupPolicy | The automated backup policy for this cluster. If no policy is provided then the default policy will be used. If backups are supported for the cluster, the default policy takes one backup a day, has a backup window of 1 hour, and retains backups for 14 days. For more information on the defaults, consult the documentation for the message type. |
| `backupSource` | BackupSource | Output only. Cluster created from backup. |
| `backupdrBackupSource` | BackupDrBackupSource | Output only. Cluster created from a BackupDR backup. |
| `backupdrInfo` | BackupDrInfo | Output only. Output only information about BackupDR protection for this cluster. |
| `certificateAuthorityInfo` | CertificateAuthorityInfo | Output only. Certificate Authority (CA) information for the cluster. |
| `cloudsqlBackupRunSource` | CloudSQLBackupRunSource | Output only. Cluster created from CloudSQL snapshot. |
| `clusterType` | string enum | Output only. The type of the cluster. This is an output-only field and it's populated at the Cluster creation time or the Cluster promotion time. The cluster type is determined by which RPC was used to create the cluster (i.e. `CreateCluster` vs. `CreateSecondaryCluster` Values: `CLUSTER_TYPE_UNSPECIFIED`, `PRIMARY`, `SECONDARY`. |
| `continuousBackupConfig` | ContinuousBackupConfig | Optional. Continuous backup configuration for this cluster. |
| `continuousBackupInfo` | ContinuousBackupInfo | Output only. Continuous backup properties for this cluster. |
| `createTime` | string (google-datetime) | Output only. Create time stamp |
| `databaseVersion` | string enum | Optional. The database engine major version. This is an optional field and it is populated at the Cluster creation time. If a database version is not supplied at cluster creation time, then a default database version will be used. Values: `DATABASE_VERSION_UNSPECIFIED`, `POSTGRES_13`, `POSTGRES_14`, `POSTGRES_15`, `POSTGRES_16`, `POSTGRES_17`, `POSTGRES_18`, `POSTGRES_19`. |
| `dataplexConfig` | DataplexConfig | Optional. Configuration for Dataplex integration. |
| `deleteTime` | string (google-datetime) | Output only. Delete time stamp |
| `displayName` | string | User-settable and human-readable display name for the Cluster. |
| `edition` | string enum | Optional. Deprecated: Use `express_config` instead. Edition of the cluster. If left unspecified, the cluster behaves as `EDITION_ALLOYDB`. Values: `EDITION_UNSPECIFIED`, `EDITION_ALLOYDB`, `EDITION_ALLOYDB_DEVELOPER`. |
| `encryptionConfig` | EncryptionConfig | Optional. The encryption config can be specified to encrypt the data disks and other persistent data resources of a cluster with a customer-managed encryption key (CMEK). When this field is not specified, the cluster will then use default encryption scheme to protect the user data. |
| `encryptionInfo` | EncryptionInfo | Output only. The encryption information for the cluster. |
| `etag` | string | For Resource freshness validation (https://google.aip.dev/154) |
| `expressConfig` | ExpressConfig | Optional. Configuration that allows the customer to create an AlloyDB Express cluster. |
| `geminiConfig` | GeminiClusterConfig | Optional. Deprecated and unused. This field will be removed in the near future. |
| `initialUser` | UserPassword | Input only. Initial user to setup during cluster creation. Required. If used in `RestoreCluster` this is ignored. |
| `labels` | object | Labels as key value pairs |
| `maintenanceSchedule` | MaintenanceSchedule | Output only. The maintenance schedule for the cluster, generated for a specific rollout if a maintenance window is set. |
| `maintenanceUpdatePolicy` | MaintenanceUpdatePolicy | Optional. The maintenance update policy determines when to allow or deny updates. |
| `maintenanceVersionSelectionPolicy` | string enum | Input only. Policy to use to automatically select the maintenance version to which to update the cluster's instances. Values: `MAINTENANCE_VERSION_SELECTION_POLICY_UNSPECIFIED`, `MAINTENANCE_VERSION_SELECTION_POLICY_LATEST`, `MAINTENANCE_VERSION_SELECTION_POLICY_DEFAULT`. |
| `migrationSource` | MigrationSource | Output only. Cluster created via DMS migration. |
| `name` | string | Output only. The name of the cluster resource with the format: \* projects/{project}/locations/{region}/clusters/{cluster_id} where the cluster ID segment should satisfy the regex expression `[a-z0-9-]+`. For more details see https://google.aip.dev/122. The prefix of the cluster resource name is the name of the parent resource: \* projects/{project}/locations/{region} |
| `network` | string | Required. The resource link for the VPC network in which cluster resources are created and from which they are accessible via Private IP. The network must belong to the same project as the cluster. It is specified in the form: `projects/{project}/global/networks/{network_id}`. This is required to create a cluster. Deprecated, use network_config.network instead. |
| `networkConfig` | NetworkConfig | Optional. |
| `primaryConfig` | PrimaryConfig | Output only. Cross Region replication config specific to PRIMARY cluster. |
| `pscConfig` | PscConfig | Optional. The configuration for Private Service Connect (PSC) for the cluster. |
| `reconciling` | boolean | Output only. Reconciling (https://google.aip.dev/128#reconciliation). Set to true if the current state of Cluster does not match the user's intended state, and the service is actively updating the resource to reconcile them. This can happen due to user-triggered updates or system actions like failover or maintenance. |
| `satisfiesPzi` | boolean | Output only. Reserved for future use. |
| `satisfiesPzs` | boolean | Output only. Reserved for future use. |
| `secondaryConfig` | SecondaryConfig | Cross Region replication config specific to SECONDARY cluster. |
| `serviceAccountEmail` | string | Output only. AlloyDB per-cluster service account. This service account is created per-cluster per-project, and is different from the per-project service account. The per-cluster service account naming format is subject to change. |
| `sslConfig` | SslConfig | SSL configuration for this AlloyDB cluster. |
| `state` | string enum | Output only. The current serving state of the cluster. Values: `STATE_UNSPECIFIED`, `READY`, `STOPPED`, `EMPTY`, `CREATING`, `DELETING`, `FAILED`, `BOOTSTRAPPING`, `MAINTENANCE`, `PROMOTING`, `SWITCHOVER`, `RECREATING`. |
| `subscriptionType` | string enum | Optional. Subscription type of the cluster. Values: `SUBSCRIPTION_TYPE_UNSPECIFIED`, `STANDARD`, `TRIAL`. |
| `tags` | object | Optional. Input only. Immutable. Tag keys/values directly bound to this resource. For example: "123/environment": "production", "123/costCenter": "marketing" |
| `trialMetadata` | TrialMetadata | Output only. Metadata for free trial clusters |
| `uid` | string | Output only. The system-generated UID of the resource. The UID is assigned when the resource is created, and it is retained until it is deleted. |
| `updateTime` | string (google-datetime) | Output only. Update time stamp |

### `Cluster` (v1beta)

- A cluster is a collection of regional AlloyDB resources. It can include a primary instance and one or more read pool instances. All cluster resources share a storage layer, which scales as needed.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `annotations` | object | Annotations to allow client tools to store small amount of arbitrary data. This is distinct from labels. https://google.aip.dev/128 |
| `automatedBackupPolicy` | AutomatedBackupPolicy | The automated backup policy for this cluster. If no policy is provided then the default policy will be used. If backups are supported for the cluster, the default policy takes one backup a day, has a backup window of 1 hour, and retains backups for 14 days. For more information on the defaults, consult the documentation for the message type. |
| `backupSource` | BackupSource | Output only. Cluster created from backup. |
| `backupdrBackupSource` | BackupDrBackupSource | Output only. Cluster created from a BackupDR backup. |
| `backupdrInfo` | BackupDrInfo | Output only. Output only information about BackupDR protection for this cluster. |
| `certificateAuthorityInfo` | CertificateAuthorityInfo | Output only. Certificate Authority (CA) information for the cluster. |
| `cloudsqlBackupRunSource` | CloudSQLBackupRunSource | Output only. Cluster created from CloudSQL snapshot. |
| `clusterType` | string enum | Output only. The type of the cluster. This is an output-only field and it's populated at the Cluster creation time or the Cluster promotion time. The cluster type is determined by which RPC was used to create the cluster (i.e. `CreateCluster` vs. `CreateSecondaryCluster` Values: `CLUSTER_TYPE_UNSPECIFIED`, `PRIMARY`, `SECONDARY`. |
| `continuousBackupConfig` | ContinuousBackupConfig | Optional. Continuous backup configuration for this cluster. |
| `continuousBackupInfo` | ContinuousBackupInfo | Output only. Continuous backup properties for this cluster. |
| `createTime` | string (google-datetime) | Output only. Create time stamp |
| `databaseVersion` | string enum | Optional. The database engine major version. This is an optional field and it is populated at the Cluster creation time. If a database version is not supplied at cluster creation time, then a default database version will be used. Values: `DATABASE_VERSION_UNSPECIFIED`, `POSTGRES_13`, `POSTGRES_14`, `POSTGRES_15`, `POSTGRES_16`, `POSTGRES_17`, `POSTGRES_18`, `POSTGRES_19`. |
| `dataplexConfig` | DataplexConfig | Optional. Configuration for Dataplex integration. |
| `deleteTime` | string (google-datetime) | Output only. Delete time stamp |
| `displayName` | string | User-settable and human-readable display name for the Cluster. |
| `edition` | string enum | Optional. Deprecated: Use `express_config` instead. Edition of the cluster. If left unspecified, the cluster behaves as `EDITION_ALLOYDB`. Values: `EDITION_UNSPECIFIED`, `EDITION_ALLOYDB`, `EDITION_ALLOYDB_DEVELOPER`. |
| `encryptionConfig` | EncryptionConfig | Optional. The encryption config can be specified to encrypt the data disks and other persistent data resources of a cluster with a customer-managed encryption key (CMEK). When this field is not specified, the cluster will then use default encryption scheme to protect the user data. |
| `encryptionInfo` | EncryptionInfo | Output only. The encryption information for the cluster. |
| `etag` | string | For Resource freshness validation (https://google.aip.dev/154) |
| `expressConfig` | ExpressConfig | Optional. Configuration that allows the customer to create an AlloyDB Express cluster. |
| `geminiConfig` | GeminiClusterConfig | Optional. Deprecated and unused. This field will be removed in the near future. |
| `initialUser` | UserPassword | Input only. Initial user to setup during cluster creation. Required. If used in `RestoreCluster` this is ignored. |
| `labels` | object | Labels as key value pairs |
| `maintenanceSchedule` | MaintenanceSchedule | Output only. The maintenance schedule for the cluster, generated for a specific rollout if a maintenance window is set. |
| `maintenanceUpdatePolicy` | MaintenanceUpdatePolicy | Optional. The maintenance update policy determines when to allow or deny updates. |
| `maintenanceVersionSelectionPolicy` | string enum | Input only. Policy to use to automatically select the maintenance version to which to update the cluster's instances. Values: `MAINTENANCE_VERSION_SELECTION_POLICY_UNSPECIFIED`, `MAINTENANCE_VERSION_SELECTION_POLICY_LATEST`, `MAINTENANCE_VERSION_SELECTION_POLICY_DEFAULT`. |
| `migrationSource` | MigrationSource | Output only. Cluster created via DMS migration. |
| `name` | string | Output only. The name of the cluster resource with the format: \* projects/{project}/locations/{region}/clusters/{cluster_id} where the cluster ID segment should satisfy the regex expression `[a-z0-9-]+`. For more details see https://google.aip.dev/122. The prefix of the cluster resource name is the name of the parent resource: \* projects/{project}/locations/{region} |
| `network` | string | Required. The resource link for the VPC network in which cluster resources are created and from which they are accessible via Private IP. The network must belong to the same project as the cluster. It is specified in the form: `projects/{project}/global/networks/{network_id}`. This is required to create a cluster. Deprecated, use network_config.network instead. |
| `networkConfig` | NetworkConfig | Optional. |
| `primaryConfig` | PrimaryConfig | Output only. Cross Region replication config specific to PRIMARY cluster. |
| `pscConfig` | PscConfig | Optional. The configuration for Private Service Connect (PSC) for the cluster. |
| `reconciling` | boolean | Output only. Reconciling (https://google.aip.dev/128#reconciliation). Set to true if the current state of Cluster does not match the user's intended state, and the service is actively updating the resource to reconcile them. This can happen due to user-triggered updates or system actions like failover or maintenance. |
| `satisfiesPzs` | boolean | Output only. Reserved for future use. |
| `secondaryConfig` | SecondaryConfig | Cross Region replication config specific to SECONDARY cluster. |
| `serviceAccountEmail` | string | Output only. AlloyDB per-cluster service account. This service account is created per-cluster per-project, and is different from the per-project service account. The per-cluster service account naming format is subject to change. |
| `sslConfig` | SslConfig | SSL configuration for this AlloyDB cluster. |
| `state` | string enum | Output only. The current serving state of the cluster. Values: `STATE_UNSPECIFIED`, `READY`, `STOPPED`, `EMPTY`, `CREATING`, `DELETING`, `FAILED`, `BOOTSTRAPPING`, `MAINTENANCE`, `PROMOTING`, `SWITCHOVER`, `RECREATING`. |
| `subscriptionType` | string enum | Optional. Subscription type of the cluster. Values: `SUBSCRIPTION_TYPE_UNSPECIFIED`, `STANDARD`, `TRIAL`. |
| `tags` | object | Optional. Input only. Immutable. Tag keys/values directly bound to this resource. For example: "123/environment": "production", "123/costCenter": "marketing" |
| `trialMetadata` | TrialMetadata | Output only. Metadata for free trial clusters |
| `uid` | string | Output only. The system-generated UID of the resource. The UID is assigned when the resource is created, and it is retained until it is deleted. |
| `updateTime` | string (google-datetime) | Output only. Update time stamp |

### `ClusterUpgradeDetails`

- Upgrade details of a cluster. This cluster can be primary or secondary.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `clusterType` | string enum | Cluster type which can either be primary or secondary. Values: `CLUSTER_TYPE_UNSPECIFIED`, `PRIMARY`, `SECONDARY`. |
| `databaseVersion` | string enum | Database version of the cluster after the upgrade operation. This will be the target version if the upgrade was successful otherwise it remains the same as that before the upgrade operation. Values: `DATABASE_VERSION_UNSPECIFIED`, `POSTGRES_13`, `POSTGRES_14`, `POSTGRES_15`, `POSTGRES_16`, `POSTGRES_17`, `POSTGRES_18`. |
| `instanceUpgradeDetails` | array<InstanceUpgradeDetails> | Upgrade details of the instances directly associated with this cluster. |
| `name` | string | Normalized name of the cluster |
| `stageInfo` | array<StageInfo> | Array containing stage info associated with this cluster. |
| `upgradeStatus` | string enum | Upgrade status of the cluster. Values: `STATUS_UNSPECIFIED`, `NOT_STARTED`, `IN_PROGRESS`, `SUCCESS`, `FAILED`, `PARTIAL_SUCCESS`, `CANCEL_IN_PROGRESS`, `CANCELLED`. |

### `ConnectionInfo`

- ConnectionInfo singleton resource. https://google.aip.dev/156
- Version: v1

| Field | Type | Description |
|---|---|---|
| `instanceUid` | string | Output only. The unique ID of the Instance. |
| `ipAddress` | string | Output only. The private network IP address for the Instance. This is the default IP for the instance and is always created (even if enable_public_ip is set). This is the connection endpoint for an end-user application. |
| `name` | string | The name of the ConnectionInfo singleton resource, e.g.: projects/{project}/locations/{location}/clusters/\*/instances/\*/connectionInfo This field currently has no semantic meaning. |
| `publicIpAddress` | string | Output only. The public IP addresses for the Instance. This is available ONLY when enable_public_ip is set. This is the connection endpoint for an end-user application. |

### `ConnectionInfo` (v1beta)

- ConnectionInfo singleton resource. https://google.aip.dev/156
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `instanceUid` | string | Output only. The unique ID of the Instance. |
| `ipAddress` | string | Output only. The private network IP address for the Instance. This is the default IP for the instance and is always created (even if enable_public_ip is set). This is the connection endpoint for an end-user application. |
| `name` | string | The name of the ConnectionInfo singleton resource, e.g.: projects/{project}/locations/{location}/clusters/\*/instances/\*/connectionInfo This field currently has no semantic meaning. |
| `pemCertificateChain` | array<string> | Output only. The pem-encoded chain that may be used to verify the X.509 certificate. Expected to be in issuer-to-root order according to RFC 5246. |
| `pscAutoDnsName` | string | Output only. Specifies the DNS name to use with PSC service automation for the Instance. |
| `pscDnsName` | string | Output only. The DNS name to use with PSC for the Instance. |
| `publicIpAddress` | string | Output only. The public IP addresses for the Instance. This is available ONLY when enable_public_ip is set. This is the connection endpoint for an end-user application. |

### `ConnectionPoolConfig`

- Configuration for Managed Connection Pool (MCP).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `authproxyPoolerCount` | integer (int32) | Output only. The number of running AuthProxy poolers per instance. |
| `authproxyPoolerScalingType` | string enum | Optional. The scaling type of the AuthProxy pooler. Values: `POOLER_SCALING_TYPE_UNSPECIFIED`, `POOLER_NONE`, `POOLER_MACHINE_SIZED`, `POOLER_MANUAL_OVERRIDE`. |
| `enabled` | boolean | Optional. Whether to enable Managed Connection Pool (MCP). |
| `flags` | object | Optional. Connection Pool flags, as a list of "key": "value" pairs. |
| `poolerCount` | integer (int32) | Output only. The number of running poolers per instance. |
| `poolerScalingType` | string enum | Optional. The scaling type of the regular pooler. Values: `POOLER_SCALING_TYPE_UNSPECIFIED`, `POOLER_NONE`, `POOLER_MACHINE_SIZED`, `POOLER_MANUAL_OVERRIDE`. |

### `ConnectionsCount`

- Connections count policy for the autoscaler.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `targetCount` | string (int64) | Optional. The target number of connections for the autoscaler to scale the instance to. |

### `ContinuousBackupConfig`

- ContinuousBackupConfig describes the continuous backups recovery configurations of a cluster.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `enabled` | boolean | Whether ContinuousBackup is enabled. |
| `encryptionConfig` | EncryptionConfig | The encryption config can be specified to encrypt the backups with a customer-managed encryption key (CMEK). When this field is not specified, the backup will use the cluster's encryption config. |
| `recoveryWindowDays` | integer (int32) | The number of days that are eligible to restore from using PITR. To support the entire recovery window, backups and logs are retained for one day more than the recovery window. If not set, defaults to 14 days. |

### `ContinuousBackupInfo`

- ContinuousBackupInfo describes the continuous backup properties of a cluster.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `earliestRestorableTime` | string (google-datetime) | Output only. The earliest restorable time that can be restored to. If continuous backups and recovery was recently enabled, the earliest restorable time is the creation time of the earliest eligible backup within this cluster's continuous backup recovery window. After a cluster has had continuous backups enabled for the duration of its recovery window, the earliest restorable time becomes "now minus the recovery window". For example, assuming a point in time recovery is attempted at 04/16/2025 3:23:00PM with a 14d recovery window, the earliest restorable time would be 04/02/2025 3:23:00PM. This field is only visible if the CLUSTER_VIEW_CONTINUOUS_BACKUP cluster view is provided. |
| `enabledTime` | string (google-datetime) | Output only. When ContinuousBackup was most recently enabled. Set to null if ContinuousBackup is not enabled. |
| `encryptionInfo` | EncryptionInfo | Output only. The encryption information for the WALs and backups required for ContinuousBackup. |
| `schedule` | array<string> | Output only. Days of the week on which a continuous backup is taken. Values: `DAY_OF_WEEK_UNSPECIFIED`, `MONDAY`, `TUESDAY`, `WEDNESDAY`, `THURSDAY`, `FRIDAY`, `SATURDAY`, `SUNDAY`. |

### `ContinuousBackupSource`

- Message describing a ContinuousBackupSource.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `cluster` | string | Required. The source cluster from which to restore. This cluster must have continuous backup enabled for this operation to succeed. For the required format, see the comment on the Cluster.name field. |
| `pointInTime` | string (google-datetime) | Required. The point in time to restore to. |

### `CpuUtilization`

- CPU utilization policy for the autoscaler.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `utilizationTarget` | number (float) | Target CPU utilization as a float between 0 and 1. |

### `CsvExportOptions`

- Options for exporting data in CSV format.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `escapeCharacter` | string | Optional. Specifies the character that should appear before a data character that needs to be escaped. The default is the same as quote character. The value of this argument has to be a character in Hex ASCII Code. |
| `fieldDelimiter` | string | Optional. Specifies the character that separates columns within each row (line) of the file. The default is comma. The value of this argument has to be a character in Hex ASCII Code. |
| `quoteCharacter` | string | Optional. Specifies the quoting character to be used when a data value is quoted. The default is double-quote. The value of this argument has to be a character in Hex ASCII Code. |
| `selectQuery` | string | Required. The SELECT query used to extract the data. |

### `CsvImportOptions`

- Options for importing data in CSV format.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `columns` | array<string> | Optional. The columns to which CSV data is imported. If not specified, all columns of the database table are loaded with CSV data. |
| `escapeCharacter` | string | Optional. Specifies the character that should appear before a data character that needs to be escaped. The default is same as quote character. The value of this argument has to be a character in Hex ASCII Code. |
| `fieldDelimiter` | string | Optional. Specifies the character that separates columns within each row (line) of the file. The default is comma. The value of this argument has to be a character in Hex ASCII Code. |
| `quoteCharacter` | string | Optional. Specifies the quoting character to be used when a data value is quoted. The default is double-quote. The value of this argument has to be a character in Hex ASCII Code. |
| `table` | string | Required. The database table to import CSV file into. |

### `DNSConfig`

- The DNS config for the endpoint, containing the DNS record name, type and targets.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `dnsName` | string | The fully qualified domain name (FQDN) of the DNS record, e.g., ".location.alloydb-psa.goog". |
| `dnsRecordType` | string | The type of the DNS record, e.g., "A", "AAAA", "CNAME". |

### `DataplexConfig`

- Configuration for Dataplex integration.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `enabled` | boolean | Dataplex is enabled by default for resources such as clusters and instances. This flag controls the integration of AlloyDB PG resources (like databases, schemas, and tables) with Dataplex." |

### `DenyMaintenancePeriod`

- DenyMaintenancePeriod definition. Excepting emergencies, maintenance will not be scheduled to start within this deny period. The start_date must be less than the end_date.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `endDate` | GoogleTypeDate | Deny period end date. This can be: \* A full date, with non-zero year, month and day values OR \* A month and day value, with a zero year for recurring |
| `startDate` | GoogleTypeDate | Deny period start date. This can be: \* A full date, with non-zero year, month and day values OR \* A month and day value, with a zero year for recurring |
| `time` | GoogleTypeTimeOfDay | Time in UTC when the deny period starts on start_date and ends on end_date. This can be: \* Full time OR \* All zeros for 00:00:00 UTC |

### `DnsAutomationInfo`

- DnsAutomationInfo contains information about the DNS automation for the instance.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `fullyQualifiedDomainName` | string | Output only. The fully qualified domain name of the instance for DNS automation. Example: "...alloydb.goog.". Note: The AUDIT directive is intentionally omitted because this field contains sensitive network topology information. |
| `state` | string enum | Output only. The state of the DNS automation. Values: `STATE_UNSPECIFIED`, `PENDING_CREATE`, `ACTIVE`, `PENDING_DELETE`, `CREATE_FAILED`, `DELETE_FAILED`. |

### `Empty`

- A generic empty message that you can re-use to avoid defining duplicated empty messages in your APIs. A typical example is to use it as the request or the response type of an API method. For instance: service Foo { rpc Bar(google.protobuf.Empty) returns (google.protobuf.Empty); }
- Version: v1

### `EncryptionConfig`

- EncryptionConfig describes the encryption config of a cluster or a backup that is encrypted with a CMEK (customer-managed encryption key).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `kmsKeyName` | string | The fully-qualified resource name of the KMS key. Each Cloud KMS key is regionalized and has the following format: projects/\[PROJECT\]/locations/\[REGION\]/keyRings/\[RING\]/cryptoKeys/\[KEY_NAME\] |

### `EncryptionInfo`

- EncryptionInfo describes the encryption information of a cluster or a backup.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `encryptionType` | string enum | Output only. Type of encryption. Values: `TYPE_UNSPECIFIED`, `GOOGLE_DEFAULT_ENCRYPTION`, `CUSTOMER_MANAGED_ENCRYPTION`. |
| `kmsKeyVersions` | array<string> | Output only. Cloud KMS key versions that are being used to protect the database or the backup. |

### `Endpoint`

- Endpoint resource.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `annotations` | object | Annotations to allow client tools to store small amount of arbitrary data. This is distinct from labels. https://google.aip.dev/128 |
| `createTime` | string (google-datetime) | Output only. Create time stamp |
| `deleteTime` | string (google-datetime) | Output only. Delete time stamp |
| `displayName` | string | User-settable and human-readable display name for the Endpoint. |
| `dnsConfig` | DNSConfig | Output only. The DNS config for the endpoint. Each endpoint is associated with a specific DNS name and the DNS type. The DNS targets are the IP addresses of the target instances. The dns_type is the type of the DNS record, eg. Type "A" or Type "CNAME". This field is not configurable by the user, and it is updated when user specifies the target instances. |
| `effectiveTargetInstances` | array<string> | Output only. The effective target instances that the endpoint is associated with. This is a list of target instance names, e.g. projects/{project_number}/locations/{location}/clusters/{cluster_id}/instances/{instance_id} For write endpoint, there is only one effective target instance which has to be a primary instance. Effective target instances are only different from target instances after a switchover or cross-region failover operation. Otherwise, effective_target_instances are the same as target_instances. Note that after a cross-region failover operation, the effective_target_instances can be stale until the operation to update the endpoint is complete. |
| `endpointType` | string enum | The type of the endpoint, either write or read. Values: `ENDPOINT_TYPE_UNSPECIFIED`, `WRITE_ENDPOINT`, `READ_ENDPOINT`. |
| `etag` | string | For Resource freshness validation (https://google.aip.dev/154) |
| `name` | string | Output only. Identifier. The name of the endpoint resource with the format: \* projects/{project}/locations/{region}/endpoints/{endpoint_id} where the endpoint ID segment should satisfy the regex expression `[a-z0-9-]+`. For more details see https://google.aip.dev/122. The prefix of the endpoint resource name is the name of the parent resource: \* projects/{project}/locations/{region} |
| `reconciling` | boolean | Output only. Reconciling (https://google.aip.dev/128#reconciliation). Set to true if the current state of Endpoint does not match the user's intended state, and the service is actively updating the Endpoint to reconcile them. This can happen due to user-triggered updates or system actions like failover or maintenance. |
| `state` | string enum | Output only. The state of the endpoint. Values: `STATE_UNSPECIFIED`, `READY`, `CREATING`, `UPDATING`, `DELETING`. |
| `targetInstances` | array<string> | The names of the target instances for the endpoint, should be of format projects/{project}/locations/{region}/clusters/{cluster}/instances/{instance}. For write endpoint, there is only one target instance which has to be a primary instance. For read endpoint, there can be multiple target instances which can be read or secondary instances. After a cross-region failover or switchover operation, the endpoint will be associated with a different target instance. This change will be reflected in the effective_target_instances field. |
| `uid` | string | Output only. The system-generated UID of the resource. The UID is assigned when the resource is created, and it is retained until it is deleted. |
| `updateTime` | string (google-datetime) | Output only. Update time stamp |

### `ExportClusterRequest`

- Export cluster request.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `csvExportOptions` | CsvExportOptions | Options for exporting data in CSV format. Required field to be set for CSV file type. |
| `database` | string | Required. Name of the database where the export command will be executed. Note - Value provided should be the same as expected from `SELECT current_database();` and NOT as a resource reference. |
| `gcsDestination` | GcsDestination | Required. Option to export data to cloud storage. |
| `sqlExportOptions` | SqlExportOptions | Options for exporting data in SQL format. Required field to be set for SQL file type. |

### `ExportClusterResponse`

- Response of export cluster rpc.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `gcsDestination` | GcsDestination | Required. Option to export data to cloud storage. |

### `ExpressConfig`

- Configuration that allows the user to create an AlloyDB Express cluster.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `enabled` | boolean | Optional. Whether Express configuration is enabled for the cluster. |

### `FailoverInstanceRequest`

- Message for triggering failover on an Instance
- Version: v1

| Field | Type | Description |
|---|---|---|
| `requestId` | string | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server ignores the request if it has already been completed. The server guarantees that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if the original operation with the same request ID was received, and if so, ignores the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `validateOnly` | boolean | Optional. If set, performs request validation, for example, permission checks and any other type of validation, but does not actually execute the create request. |

### `GCAInstanceConfig`

- Instance level configuration parameters related to the Gemini Cloud Assist product.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `gcaEntitlement` | string enum | Output only. Represents the GCA entitlement state of the instance. Values: `GCA_ENTITLEMENT_TYPE_UNSPECIFIED`, `GCA_STANDARD`. |

### `GcsDestination`

- Destination for Export. Export will be done to cloud storage.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `uri` | string | Required. The path to the file in Google Cloud Storage where the export will be stored. The URI is in the form `gs://bucketName/fileName`. |

### `GeminiClusterConfig`

- Deprecated and unused. This message will be removed in the near future.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `entitled` | boolean | Output only. Deprecated and unused. This field will be removed in the near future. |

### `GeminiInstanceConfig`

- Deprecated and unused. This message will be removed in the near future.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `entitled` | boolean | Output only. Deprecated and unused. This field will be removed in the near future. |

### `GoogleCloudLocationListLocationsResponse`

- The response message for Locations.ListLocations.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `locations` | array<GoogleCloudLocationLocation> | A list of locations that matches the specified filter in the request. |
| `nextPageToken` | string | The standard List next-page token. |

### `GoogleCloudLocationLocation`

- A resource that represents a Google Cloud location.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `displayName` | string | The friendly name for this location, typically a nearby city name. For example, "Tokyo". |
| `labels` | object | Cross-service attributes for the location. For example {"cloud.googleapis.com/region": "us-east1"} |
| `locationId` | string | The canonical id for this location. For example: `"us-east1"`. |
| `metadata` | object | Service-specific metadata. For example the available capacity at the given location. |
| `name` | string | Resource name for the location, which may vary between implementations. For example: `"projects/example-project/locations/us-east1"` |

### `GoogleTypeDate`

- Represents a whole or partial calendar date, such as a birthday. The time of day and time zone are either specified elsewhere or are insignificant. The date is relative to the Gregorian Calendar. This can represent one of the following: \* A full date, with non-zero year, month, and day values. \* A month and day, with a zero year (for example, an anniversary). \* A year on its own, with a zero month and a zero day. \* A year and month, with a zero day (for example, a credit card expiration date). Related types: \* google.type.TimeOfDay \* google.type.DateTime \* google.protobuf.Timestamp
- Version: v1

| Field | Type | Description |
|---|---|---|
| `day` | integer (int32) | Day of a month. Must be from 1 to 31 and valid for the year and month, or 0 to specify a year by itself or a year and month where the day isn't significant. |
| `month` | integer (int32) | Month of a year. Must be from 1 to 12, or 0 to specify a year without a month and day. |
| `year` | integer (int32) | Year of the date. Must be from 1 to 9999, or 0 to specify a date without a year. |

### `GoogleTypeTimeOfDay`

- Represents a time of day. The date and time zone are either not significant or are specified elsewhere. An API may choose to allow leap seconds. Related types are google.type.Date and `google.protobuf.Timestamp`.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `hours` | integer (int32) | Hours of a day in 24 hour format. Must be greater than or equal to 0 and typically must be less than or equal to 23. An API may choose to allow the value "24:00:00" for scenarios like business closing time. |
| `minutes` | integer (int32) | Minutes of an hour. Must be greater than or equal to 0 and less than or equal to 59. |
| `nanos` | integer (int32) | Fractions of seconds, in nanoseconds. Must be greater than or equal to 0 and less than or equal to 999,999,999. |
| `seconds` | integer (int32) | Seconds of a minute. Must be greater than or equal to 0 and typically must be less than or equal to 59. An API may allow the value 60 if it allows leap-seconds. |

### `ImportClusterRequest`

- Import cluster request.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `csvImportOptions` | CsvImportOptions | Options for importing data in CSV format. |
| `database` | string | Optional. Name of the database to which the import will be done. For import from SQL file, this is required only if the file does not specify a database. Note - Value provided should be the same as expected from `SELECT current_database();` and NOT as a resource reference. |
| `gcsUri` | string | Required. The path to the file in Google Cloud Storage where the source file for import will be stored. The URI is in the form `gs://bucketName/fileName`. |
| `sqlImportOptions` | SqlImportOptions | Options for importing data in SQL format. |
| `user` | string | Optional. Database user to be used for importing the data. Note - Value provided should be the same as expected from `SELECT current_user;` and NOT as a resource reference. |

### `ImportClusterResponse`

- Response of import rpc.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `bytesDownloaded` | string (int64) | Required. Size of the object downloaded from Google Cloud Storage in bytes. |

### `InjectFaultRequest`

- Message for triggering fault injection on an instance
- Version: v1

| Field | Type | Description |
|---|---|---|
| `faultType` | string enum | Required. The type of fault to be injected in an instance. Values: `FAULT_TYPE_UNSPECIFIED`, `STOP_VM`. |
| `requestId` | string | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server ignores the request if it has already been completed. The server guarantees that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if the original operation with the same request ID was received, and if so, ignores the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `validateOnly` | boolean | Optional. If set, performs request validation, for example, permission checks and any other type of validation, but does not actually execute the create request. |

### `Instance`

- An Instance is a computing unit that an end customer can connect to. It's the main unit of computing resources in AlloyDB.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `activationPolicy` | string enum | Optional. Specifies whether an instance needs to spin up. Once the instance is active, the activation policy can be updated to the `NEVER` to stop the instance. Likewise, the activation policy can be updated to `ALWAYS` to start the instance. There are restrictions around when an instance can/cannot be activated (for example, a read pool instance should be stopped before stopping primary etc.). Please refer to the API documentation for more details. Values: `ACTIVATION_POLICY_UNSPECIFIED`, `ALWAYS`, `NEVER`. |
| `annotations` | object | Annotations to allow client tools to store small amount of arbitrary data. This is distinct from labels. https://google.aip.dev/128 |
| `availabilityType` | string enum | Availability type of an Instance. If empty, defaults to REGIONAL for primary instances. For read pools, availability_type is always UNSPECIFIED. Instances in the read pools are evenly distributed across available zones within the region (i.e. read pools with more than one node will have a node in at least two zones). Values: `AVAILABILITY_TYPE_UNSPECIFIED`, `ZONAL`, `REGIONAL`. |
| `clientConnectionConfig` | ClientConnectionConfig | Optional. Client connection specific configurations |
| `connectionPoolConfig` | ConnectionPoolConfig | Optional. The configuration for Managed Connection Pool (MCP). |
| `createTime` | string (google-datetime) | Output only. Create time stamp |
| `dataApiAccess` | string enum | Optional. Controls whether the Data API is enabled for this instance. When enabled, this allows authorized users to connect to the instance from the public internet using the `executeSql` API, even for private IP instances. If this is not specified, the data API is enabled by default for Google internal services like AlloyDB Studio. Disable it explicitly to disallow Google internal services as well. Values: `DEFAULT_DATA_API_ENABLED_FOR_GOOGLE_CLOUD_SERVICES`, `DISABLED`, `ENABLED`. |
| `databaseFlags` | object | Database flags. Set at the instance level. They are copied from the primary instance on secondary instance creation. Flags that have restrictions default to the value at primary instance on read instances during creation. Read instances can set new flags or override existing flags that are relevant for reads, for example, for enabling columnar cache on a read instance. Flags set on read instance might or might not be present on the primary instance. This is a list of "key": "value" pairs. "key": The name of the flag. These flags are passed at instance setup time, so include both server options and system variables for Postgres. Flags are specified with underscores, not hyphens. "value": The value of the flag. Booleans are set to \*\*on\*\* for true and \*\*off\*\* for false. This field must be omitted if the flag doesn't take a value. |
| `deleteTime` | string (google-datetime) | Output only. Delete time stamp |
| `displayName` | string | User-settable and human-readable display name for the Instance. |
| `etag` | string | For Resource freshness validation (https://google.aip.dev/154) |
| `gceZone` | string | The Compute Engine zone that the instance should serve from, per https://cloud.google.com/compute/docs/regions-zones This can ONLY be specified for ZONAL instances. If present for a REGIONAL instance, an error will be thrown. If this is absent for a ZONAL instance, instance is created in a random zone with available capacity. |
| `instanceType` | string enum | Required. The type of the instance. Specified at creation time. Values: `INSTANCE_TYPE_UNSPECIFIED`, `PRIMARY`, `READ_POOL`, `SECONDARY`. |
| `ipAddress` | string | Output only. The IP address for the Instance. This is the connection endpoint for an end-user application. |
| `labels` | object | Labels as key value pairs |
| `machineConfig` | MachineConfig | Configurations for the machines that host the underlying database engine. |
| `maintenanceVersionName` | string | Output only. Maintenance version of the instance, for example: POSTGRES_15.2025_07_15.04_00. Output only. Update this field via the parent cluster's maintenance_version field(s). |
| `name` | string | Output only. The name of the instance resource with the format: \* projects/{project}/locations/{region}/clusters/{cluster_id}/instances/{instance_id} where the cluster and instance ID segments should satisfy the regex expression `[a-z]([a-z0-9-]{0,61}[a-z0-9])?`, e.g. 1-63 characters of lowercase letters, numbers, and dashes, starting with a letter, and ending with a letter or number. For more details see https://google.aip.dev/122. The prefix of the instance resource name is the name of the parent resource: \* projects/{project}/locations/{region}/clusters/{cluster_id} |
| `networkConfig` | InstanceNetworkConfig | Optional. Instance-level network configuration. |
| `nodes` | array<Node> | Output only. List of available read-only VMs in this instance, including the standby for a PRIMARY instance. |
| `observabilityConfig` | ObservabilityInstanceConfig | Configuration for observability. |
| `observabilityInstanceInfo` | ObservabilityInstanceInfo | Output only. Instance level observability information, contains the effective values of observability settings for this instance, by merging customer's provided `ObservabilityInstanceConfig` with the Observability defaults. |
| `outboundPublicIpAddresses` | array<string> | Output only. All outbound public IP addresses configured for the instance. |
| `pscInstanceConfig` | PscInstanceConfig | Optional. The configuration for Private Service Connect (PSC) for the instance. |
| `pscInstanceInfo` | PscInstanceInfo | Output only. Information about the Private Service Connect (PSC) for the instance. |
| `publicIpAddress` | string | Output only. The public IP address for the Instance. This is available ONLY when `enable_public_ip` is set or when you have upgraded from an Express Instance that has public DNS enabled. This field is not available for Express Instances. This is the connection endpoint for an end-user application. |
| `queryInsightsConfig` | QueryInsightsInstanceConfig | Configuration for query insights. |
| `queryInsightsInfo` | QueryInsightsInstanceInfo | Output only. Instance level Query Insights information, which is read-only and available in the output only. Contains the effective query insights settings for this instance, by merging customer's provided `QueryInsightsInstanceConfig` with the Query Insights defaults. |
| `readPoolConfig` | ReadPoolConfig | Read pool instance configuration. This is required if the value of instanceType is READ_POOL. |
| `reconciling` | boolean | Output only. Reconciling (https://google.aip.dev/128#reconciliation). Set to true if the current state of Instance does not match the user's intended state, and the service is actively updating the resource to reconcile them. This can happen due to user-triggered updates or system actions like failover or maintenance. |
| `satisfiesPzs` | boolean | Output only. Reserved for future use. |
| `state` | string enum | Output only. The current serving state of the instance. Values: `STATE_UNSPECIFIED`, `READY`, `STOPPED`, `CREATING`, `DELETING`, `MAINTENANCE`, `FAILED`, `BOOTSTRAPPING`, `PROMOTING`, `SWITCHOVER`, `STOPPING`, `STARTING`. |
| `uid` | string | Output only. The system-generated UID of the resource. The UID is assigned when the resource is created, and it is retained until it is deleted. |
| `updateTime` | string (google-datetime) | Output only. Update time stamp |
| `writableNode` | Node | Output only. This is set for the read-write VM of the PRIMARY instance only. |

### `Instance` (v1alpha)

- An Instance is a computing unit that an end customer can connect to. It's the main unit of computing resources in AlloyDB.
- Version: v1alpha

| Field | Type | Description |
|---|---|---|
| `activationPolicy` | string enum | Optional. Specifies whether an instance needs to spin up. Once the instance is active, the activation policy can be updated to the `NEVER` to stop the instance. Likewise, the activation policy can be updated to `ALWAYS` to start the instance. There are restrictions around when an instance can/cannot be activated (for example, a read pool instance should be stopped before stopping primary etc.). Please refer to the API documentation for more details. Values: `ACTIVATION_POLICY_UNSPECIFIED`, `ALWAYS`, `NEVER`. |
| `annotations` | object | Annotations to allow client tools to store small amount of arbitrary data. This is distinct from labels. https://google.aip.dev/128 |
| `availabilityType` | string enum | Availability type of an Instance. If empty, defaults to REGIONAL for primary instances. For read pools, availability_type is always UNSPECIFIED. Instances in the read pools are evenly distributed across available zones within the region (i.e. read pools with more than one node will have a node in at least two zones). Values: `AVAILABILITY_TYPE_UNSPECIFIED`, `ZONAL`, `REGIONAL`. |
| `clientConnectionConfig` | ClientConnectionConfig | Optional. Client connection specific configurations |
| `connectionPoolConfig` | ConnectionPoolConfig | Optional. The configuration for Managed Connection Pool (MCP). |
| `createTime` | string (google-datetime) | Output only. Create time stamp |
| `dataApiAccess` | string enum | Optional. Controls whether the Data API is enabled for this instance. When enabled, this allows authorized users to connect to the instance from the public internet using the `executeSql` API, even for private IP instances. If this is not specified, the data API is enabled by default for Google internal services like AlloyDB Studio. Disable it explicitly to disallow Google internal services as well. Values: `DEFAULT_DATA_API_ENABLED_FOR_GOOGLE_CLOUD_SERVICES`, `DISABLED`, `ENABLED`. |
| `databaseFlags` | object | Database flags. Set at the instance level. They are copied from the primary instance on secondary instance creation. Flags that have restrictions default to the value at primary instance on read instances during creation. Read instances can set new flags or override existing flags that are relevant for reads, for example, for enabling columnar cache on a read instance. Flags set on read instance might or might not be present on the primary instance. This is a list of "key": "value" pairs. "key": The name of the flag. These flags are passed at instance setup time, so include both server options and system variables for Postgres. Flags are specified with underscores, not hyphens. "value": The value of the flag. Booleans are set to \*\*on\*\* for true and \*\*off\*\* for false. This field must be omitted if the flag doesn't take a value. |
| `deleteTime` | string (google-datetime) | Output only. Delete time stamp |
| `displayName` | string | User-settable and human-readable display name for the Instance. |
| `etag` | string | For Resource freshness validation (https://google.aip.dev/154) |
| `gcaConfig` | GCAInstanceConfig | Output only. Configuration parameters related to Gemini Cloud Assist. |
| `gceZone` | string | The Compute Engine zone that the instance should serve from, per https://cloud.google.com/compute/docs/regions-zones This can ONLY be specified for ZONAL instances. If present for a REGIONAL instance, an error will be thrown. If this is absent for a ZONAL instance, instance is created in a random zone with available capacity. |
| `geminiConfig` | GeminiInstanceConfig | Optional. Deprecated and unused. This field will be removed in the near future. |
| `instanceType` | string enum | Required. The type of the instance. Specified at creation time. Values: `INSTANCE_TYPE_UNSPECIFIED`, `PRIMARY`, `READ_POOL`, `SECONDARY`. |
| `ipAddress` | string | Output only. The IP address for the Instance. This is the connection endpoint for an end-user application. |
| `labels` | object | Labels as key value pairs |
| `machineConfig` | MachineConfig | Configurations for the machines that host the underlying database engine. |
| `maintenanceVersionName` | string | Output only. Maintenance version of the instance, for example: POSTGRES_15.2025_07_15.04_00. Output only. Update this field via the parent cluster's maintenance_version field(s). |
| `name` | string | Output only. The name of the instance resource with the format: \* projects/{project}/locations/{region}/clusters/{cluster_id}/instances/{instance_id} where the cluster and instance ID segments should satisfy the regex expression `[a-z]([a-z0-9-]{0,61}[a-z0-9])?`, e.g. 1-63 characters of lowercase letters, numbers, and dashes, starting with a letter, and ending with a letter or number. For more details see https://google.aip.dev/122. The prefix of the instance resource name is the name of the parent resource: \* projects/{project}/locations/{region}/clusters/{cluster_id} |
| `networkConfig` | InstanceNetworkConfig | Optional. Instance-level network configuration. |
| `networkInfo` | InstanceNetworkInfo | Output only. Instance-level network information. |
| `nodes` | array<Node> | Output only. List of available read-only VMs in this instance, including the standby for a PRIMARY instance. |
| `observabilityConfig` | ObservabilityInstanceConfig | Configuration for observability. |
| `observabilityInstanceInfo` | ObservabilityInstanceInfo | Output only. Instance level observability information, contains the effective values of observability settings for this instance, by merging customer's provided `ObservabilityInstanceConfig` with the Observability defaults. |
| `outboundPublicIpAddresses` | array<string> | Output only. All outbound public IP addresses configured for the instance. |
| `pscInstanceConfig` | PscInstanceConfig | Optional. The configuration for Private Service Connect (PSC) for the instance. |
| `pscInstanceInfo` | PscInstanceInfo | Output only. Information about the Private Service Connect (PSC) for the instance. |
| `publicIpAddress` | string | Output only. The public IP address for the Instance. This is available ONLY when `enable_public_ip` is set or when you have upgraded from an Express Instance that has public DNS enabled. This field is not available for Express Instances. This is the connection endpoint for an end-user application. |
| `queryInsightsConfig` | QueryInsightsInstanceConfig | Configuration for query insights. |
| `queryInsightsInfo` | QueryInsightsInstanceInfo | Output only. Instance level Query Insights information, which is read-only and available in the output only. Contains the effective query insights settings for this instance, by merging customer's provided `QueryInsightsInstanceConfig` with the Query Insights defaults. |
| `readPoolConfig` | ReadPoolConfig | Read pool instance configuration. This is required if the value of instanceType is READ_POOL. |
| `reconciling` | boolean | Output only. Reconciling (https://google.aip.dev/128#reconciliation). Set to true if the current state of Instance does not match the user's intended state, and the service is actively updating the resource to reconcile them. This can happen due to user-triggered updates or system actions like failover or maintenance. |
| `satisfiesPzi` | boolean | Output only. Reserved for future use. |
| `satisfiesPzs` | boolean | Output only. Reserved for future use. |
| `state` | string enum | Output only. The current serving state of the instance. Values: `STATE_UNSPECIFIED`, `READY`, `STOPPED`, `CREATING`, `DELETING`, `MAINTENANCE`, `FAILED`, `BOOTSTRAPPING`, `PROMOTING`, `SWITCHOVER`, `STOPPING`, `STARTING`. |
| `uid` | string | Output only. The system-generated UID of the resource. The UID is assigned when the resource is created, and it is retained until it is deleted. |
| `updatePolicy` | UpdatePolicy | Update policy that will be applied during instance update. This field is not persisted when you update the instance. To use a non-default update policy, you must specify explicitly specify the value in each update request. |
| `updateTime` | string (google-datetime) | Output only. Update time stamp |
| `writableNode` | Node | Output only. This is set for the read-write VM of the PRIMARY instance only. |

### `Instance` (v1beta)

- An Instance is a computing unit that an end customer can connect to. It's the main unit of computing resources in AlloyDB.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `activationPolicy` | string enum | Optional. Specifies whether an instance needs to spin up. Once the instance is active, the activation policy can be updated to the `NEVER` to stop the instance. Likewise, the activation policy can be updated to `ALWAYS` to start the instance. There are restrictions around when an instance can/cannot be activated (for example, a read pool instance should be stopped before stopping primary etc.). Please refer to the API documentation for more details. Values: `ACTIVATION_POLICY_UNSPECIFIED`, `ALWAYS`, `NEVER`. |
| `annotations` | object | Annotations to allow client tools to store small amount of arbitrary data. This is distinct from labels. https://google.aip.dev/128 |
| `availabilityType` | string enum | Availability type of an Instance. If empty, defaults to REGIONAL for primary instances. For read pools, availability_type is always UNSPECIFIED. Instances in the read pools are evenly distributed across available zones within the region (i.e. read pools with more than one node will have a node in at least two zones). Values: `AVAILABILITY_TYPE_UNSPECIFIED`, `ZONAL`, `REGIONAL`. |
| `clientConnectionConfig` | ClientConnectionConfig | Optional. Client connection specific configurations |
| `connectionPoolConfig` | ConnectionPoolConfig | Optional. The configuration for Managed Connection Pool (MCP). |
| `createTime` | string (google-datetime) | Output only. Create time stamp |
| `dataApiAccess` | string enum | Optional. Controls whether the Data API is enabled for this instance. When enabled, this allows authorized users to connect to the instance from the public internet using the `executeSql` API, even for private IP instances. If this is not specified, the data API is enabled by default for Google internal services like AlloyDB Studio. Disable it explicitly to disallow Google internal services as well. Values: `DEFAULT_DATA_API_ENABLED_FOR_GOOGLE_CLOUD_SERVICES`, `DISABLED`, `ENABLED`. |
| `databaseFlags` | object | Database flags. Set at the instance level. They are copied from the primary instance on secondary instance creation. Flags that have restrictions default to the value at primary instance on read instances during creation. Read instances can set new flags or override existing flags that are relevant for reads, for example, for enabling columnar cache on a read instance. Flags set on read instance might or might not be present on the primary instance. This is a list of "key": "value" pairs. "key": The name of the flag. These flags are passed at instance setup time, so include both server options and system variables for Postgres. Flags are specified with underscores, not hyphens. "value": The value of the flag. Booleans are set to \*\*on\*\* for true and \*\*off\*\* for false. This field must be omitted if the flag doesn't take a value. |
| `deleteTime` | string (google-datetime) | Output only. Delete time stamp |
| `displayName` | string | User-settable and human-readable display name for the Instance. |
| `etag` | string | For Resource freshness validation (https://google.aip.dev/154) |
| `gcaConfig` | GCAInstanceConfig | Output only. Configuration parameters related to Gemini Cloud Assist. |
| `gceZone` | string | The Compute Engine zone that the instance should serve from, per https://cloud.google.com/compute/docs/regions-zones This can ONLY be specified for ZONAL instances. If present for a REGIONAL instance, an error will be thrown. If this is absent for a ZONAL instance, instance is created in a random zone with available capacity. |
| `geminiConfig` | GeminiInstanceConfig | Optional. Deprecated and unused. This field will be removed in the near future. |
| `instanceType` | string enum | Required. The type of the instance. Specified at creation time. Values: `INSTANCE_TYPE_UNSPECIFIED`, `PRIMARY`, `READ_POOL`, `SECONDARY`. |
| `ipAddress` | string | Output only. The IP address for the Instance. This is the connection endpoint for an end-user application. |
| `labels` | object | Labels as key value pairs |
| `machineConfig` | MachineConfig | Configurations for the machines that host the underlying database engine. |
| `maintenanceVersionName` | string | Output only. Maintenance version of the instance, for example: POSTGRES_15.2025_07_15.04_00. Output only. Update this field via the parent cluster's maintenance_version field(s). |
| `name` | string | Output only. The name of the instance resource with the format: \* projects/{project}/locations/{region}/clusters/{cluster_id}/instances/{instance_id} where the cluster and instance ID segments should satisfy the regex expression `[a-z]([a-z0-9-]{0,61}[a-z0-9])?`, e.g. 1-63 characters of lowercase letters, numbers, and dashes, starting with a letter, and ending with a letter or number. For more details see https://google.aip.dev/122. The prefix of the instance resource name is the name of the parent resource: \* projects/{project}/locations/{region}/clusters/{cluster_id} |
| `networkConfig` | InstanceNetworkConfig | Optional. Instance-level network configuration. |
| `networkInfo` | InstanceNetworkInfo | Output only. Instance-level network information. |
| `nodes` | array<Node> | Output only. List of available read-only VMs in this instance, including the standby for a PRIMARY instance. |
| `observabilityConfig` | ObservabilityInstanceConfig | Configuration for observability. |
| `observabilityInstanceInfo` | ObservabilityInstanceInfo | Output only. Instance level observability information, contains the effective values of observability settings for this instance, by merging customer's provided `ObservabilityInstanceConfig` with the Observability defaults. |
| `outboundPublicIpAddresses` | array<string> | Output only. All outbound public IP addresses configured for the instance. |
| `pscInstanceConfig` | PscInstanceConfig | Optional. The configuration for Private Service Connect (PSC) for the instance. |
| `pscInstanceInfo` | PscInstanceInfo | Output only. Information about the Private Service Connect (PSC) for the instance. |
| `publicIpAddress` | string | Output only. The public IP address for the Instance. This is available ONLY when `enable_public_ip` is set or when you have upgraded from an Express Instance that has public DNS enabled. This field is not available for Express Instances. This is the connection endpoint for an end-user application. |
| `queryInsightsConfig` | QueryInsightsInstanceConfig | Configuration for query insights. |
| `queryInsightsInfo` | QueryInsightsInstanceInfo | Output only. Instance level Query Insights information, which is read-only and available in the output only. Contains the effective query insights settings for this instance, by merging customer's provided `QueryInsightsInstanceConfig` with the Query Insights defaults. |
| `readPoolConfig` | ReadPoolConfig | Read pool instance configuration. This is required if the value of instanceType is READ_POOL. |
| `reconciling` | boolean | Output only. Reconciling (https://google.aip.dev/128#reconciliation). Set to true if the current state of Instance does not match the user's intended state, and the service is actively updating the resource to reconcile them. This can happen due to user-triggered updates or system actions like failover or maintenance. |
| `satisfiesPzs` | boolean | Output only. Reserved for future use. |
| `state` | string enum | Output only. The current serving state of the instance. Values: `STATE_UNSPECIFIED`, `READY`, `STOPPED`, `CREATING`, `DELETING`, `MAINTENANCE`, `FAILED`, `BOOTSTRAPPING`, `PROMOTING`, `SWITCHOVER`, `STOPPING`, `STARTING`. |
| `uid` | string | Output only. The system-generated UID of the resource. The UID is assigned when the resource is created, and it is retained until it is deleted. |
| `updatePolicy` | UpdatePolicy | Update policy that will be applied during instance update. This field is not persisted when you update the instance. To use a non-default update policy, you must specify explicitly specify the value in each update request. |
| `updateTime` | string (google-datetime) | Output only. Update time stamp |
| `writableNode` | Node | Output only. This is set for the read-write VM of the PRIMARY instance only. |

### `InstanceNetworkConfig`

- Metadata related to instance-level network configuration.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `allocatedIpRangeOverride` | string | Optional. Name of the allocated IP range for the private IP AlloyDB instance, for example: "google-managed-services-default". If set, the instance IPs will be created from this allocated range and will override the IP range used by the parent cluster. The range name must comply with RFC 1035 (https://datatracker.ietf.org/doc/html/rfc1035). Specifically, the name must be 1-63 characters long and match the regular expression \[a-z\](\[-a-z0-9\]\*\[a-z0-9\])?. |
| `authorizedExternalNetworks` | array<AuthorizedNetwork> | Optional. A list of external network authorized to access this instance. |
| `enableOutboundPublicIp` | boolean | Optional. Enabling an outbound public IP address to support a database server sending requests out into the internet. |
| `enablePublicIp` | boolean | Optional. Enabling public ip for the instance. |
| `network` | string | Output only. The resource link for the VPC network in which instance resources are created and from which they are accessible via Private IP. This will be the same value as the parent cluster's network. It is specified in the form: // `projects/{project_number}/global/networks/{network_id}`. |

### `InstanceNetworkConfig` (v1beta)

- Metadata related to instance-level network configuration.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `allocatedIpRangeOverride` | string | Optional. Name of the allocated IP range for the private IP AlloyDB instance, for example: "google-managed-services-default". If set, the instance IPs will be created from this allocated range and will override the IP range used by the parent cluster. The range name must comply with RFC 1035 (https://datatracker.ietf.org/doc/html/rfc1035). Specifically, the name must be 1-63 characters long and match the regular expression \[a-z\](\[-a-z0-9\]\*\[a-z0-9\])?. |
| `authorizedExternalNetworks` | array<AuthorizedNetwork> | Optional. A list of external network authorized to access this instance. |
| `enableOutboundPublicIp` | boolean | Optional. Enabling an outbound public IP address to support a database server sending requests out into the internet. |
| `enablePublicIp` | boolean | Optional. Enabling public ip for the instance. |
| `network` | string | Output only. The resource link for the VPC network in which instance resources are created and from which they are accessible via Private IP. This will be the same value as the parent cluster's network. It is specified in the form: // `projects/{project_number}/global/networks/{network_id}`. |
| `publicDnsEnabled` | boolean | Optional. Whether Public DNS is enabled for the instance. |

### `InstanceNetworkInfo`

- Output-only metadata related to instance-level network information.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `publicDnsName` | string | Output only. The DNS name of the instance for public connectivity. |

### `InstanceUpgradeDetails`

- Details regarding the upgrade of instances associated with a cluster.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `instanceType` | string enum | Instance type. Values: `INSTANCE_TYPE_UNSPECIFIED`, `PRIMARY`, `READ_POOL`, `SECONDARY`. |
| `name` | string | Normalized name of the instance. |
| `upgradeStatus` | string enum | Upgrade status of the instance. Values: `STATUS_UNSPECIFIED`, `NOT_STARTED`, `IN_PROGRESS`, `SUCCESS`, `FAILED`, `PARTIAL_SUCCESS`, `CANCEL_IN_PROGRESS`, `CANCELLED`. |

### `IntegerRestrictions`

- Restrictions on INTEGER type values.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `maxValue` | string (int64) | The maximum value that can be specified, if applicable. |
| `minValue` | string (int64) | The minimum value that can be specified, if applicable. |

### `ListBackupsResponse`

- Message for response to listing Backups
- Version: v1

| Field | Type | Description |
|---|---|---|
| `backups` | array<Backup> | The list of Backup |
| `nextPageToken` | string | A token identifying a page of results the server should return. |
| `unreachable` | array<string> | Locations that could not be reached. |

### `ListClustersResponse`

- Message for response to listing Clusters
- Version: v1

| Field | Type | Description |
|---|---|---|
| `clusters` | array<Cluster> | The list of Cluster |
| `nextPageToken` | string | A token identifying a page of results the server should return. |
| `unreachable` | array<string> | Locations that could not be reached. |

### `ListEndpointsResponse`

- Message for response to listing Endpoints
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `endpoints` | array<Endpoint> | The list of Endpoints |
| `nextPageToken` | string | A token identifying a page of results the server should return. |
| `unreachable` | array<string> | Locations that could not be reached. |

### `ListInstancesResponse`

- Message for response to listing Instances
- Version: v1

| Field | Type | Description |
|---|---|---|
| `instances` | array<Instance> | The list of Instance |
| `nextPageToken` | string | A token identifying a page of results the server should return. |
| `unreachable` | array<string> | Locations that could not be reached. |

### `ListOperationsResponse`

- The response message for Operations.ListOperations.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | The standard List next-page token. |
| `operations` | array<Operation> | A list of operations that matches the specified filter in the request. |
| `unreachable` | array<string> | Unordered list. Unreachable resources. Populated when the request sets `ListOperationsRequest.return_partial_success` and reads across collections. For example, when attempting to list all resources across all supported locations. |

### `ListSupportedDatabaseFlagsResponse`

- Message for response to listing SupportedDatabaseFlags.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | A token identifying a page of results the server should return. |
| `supportedDatabaseFlags` | array<SupportedDatabaseFlag> | The list of SupportedDatabaseFlags. |

### `ListUsersResponse`

- Message for response to listing Users
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | A token identifying a page of results the server should return. |
| `unreachable` | array<string> | Locations that could not be reached. |
| `users` | array<User> | The list of User |

### `MachineConfig`

- MachineConfig describes the configuration of a machine.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `cpuCount` | integer (int32) | The number of CPU's in the VM instance. |
| `machineType` | string | Machine type of the VM instance. E.g. "n2-highmem-4", "n2-highmem-8", "c4a-highmem-4-lssd". cpu_count must match the number of vCPUs in the machine type. |

### `MaintenanceSchedule`

- MaintenanceSchedule stores the maintenance schedule generated from the MaintenanceUpdatePolicy, once a maintenance rollout is triggered, if MaintenanceWindow is set, and if there is no conflicting DenyPeriod. The schedule is cleared once the update takes place. This field cannot be manually changed; modify the MaintenanceUpdatePolicy instead.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `startTime` | string (google-datetime) | Output only. The scheduled start time for the maintenance. |

### `MaintenanceUpdatePolicy`

- MaintenanceUpdatePolicy defines the policy for system updates.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `denyMaintenancePeriods` | array<DenyMaintenancePeriod> | Periods to deny maintenance. Currently limited to 1. |
| `maintenanceWindows` | array<MaintenanceWindow> | Preferred windows to perform maintenance. Currently limited to 1. |

### `MaintenanceWindow`

- MaintenanceWindow specifies a preferred day and time for maintenance.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `day` | string enum | Preferred day of the week for maintenance, e.g. MONDAY, TUESDAY, etc. Values: `DAY_OF_WEEK_UNSPECIFIED`, `MONDAY`, `TUESDAY`, `WEDNESDAY`, `THURSDAY`, `FRIDAY`, `SATURDAY`, `SUNDAY`. |
| `startTime` | GoogleTypeTimeOfDay | Preferred time to start the maintenance operation on the specified day. Maintenance will start within 1 hour of this time. |

### `MigrationSource`

- Subset of the source instance configuration that is available when reading the cluster resource.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `hostPort` | string | Output only. The host and port of the on-premises instance in host:port format |
| `referenceId` | string | Output only. Place holder for the external source identifier(e.g DMS job name) that created the cluster. |
| `sourceType` | string enum | Output only. Type of migration source. Values: `MIGRATION_SOURCE_TYPE_UNSPECIFIED`, `DMS`. |

### `NetworkConfig`

- Metadata related to network configuration.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `allocatedIpRange` | string | Optional. Name of the allocated IP range for the private IP AlloyDB cluster, for example: "google-managed-services-default". If set, the instance IPs for this cluster will be created in the allocated range. The range name must comply with RFC 1035. Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?`. Field name is intended to be consistent with Cloud SQL. |
| `network` | string | Optional. The resource link for the VPC network in which cluster resources are created and from which they are accessible via Private IP. The network must belong to the same project as the cluster. It is specified in the form: `projects/{project_number}/global/networks/{network_id}`. This is required to create a cluster. |

### `Node`

- Details of a single node in the instance. Nodes in an AlloyDB instance are ephemeral, they can change during update, failover, autohealing and resize operations.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `id` | string | Output only. The identifier of the VM e.g. "test-read-0601-407e52be-ms3l". |
| `ip` | string | Output only. The private IP address of the VM e.g. "10.57.0.34". |
| `isHotStandby` | boolean | Output only. Indicates whether the node set up to be configured as a hot standby. |
| `state` | string | Output only. Determined by state of the compute VM and postgres-service health. Compute VM state can have values listed in https://cloud.google.com/compute/docs/instances/instance-life-cycle and postgres-service health can have values: HEALTHY and UNHEALTHY. |
| `zoneId` | string | Output only. The Compute Engine zone of the VM e.g. "us-central1-b". |

### `ObservabilityInstanceConfig`

- Observability Instance specific configuration.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `enabled` | boolean | Observability feature status for an instance. This flag is turned "off" by default. |
| `maxQueryStringLength` | integer (int32) | Query string length. The default value is 10k. |
| `preserveComments` | boolean | Preserve comments in query string for an instance. This flag is turned "off" by default. |
| `queryPlansPerMinute` | integer (int32) | Number of query execution plans captured by Insights per minute for all queries combined. The default value is 200. Any integer between 0 to 200 is considered valid. |
| `recordApplicationTags` | boolean | Record application tags for an instance. This flag is turned "off" by default. |
| `trackActiveQueries` | boolean | Track actively running queries on the instance. If not set, this flag is "off" by default. |
| `trackWaitEventTypes` | boolean | Output only. Track wait event types during query execution for an instance. This flag is turned "on" by default but tracking is enabled only after observability enabled flag is also turned on. This is read-only flag and only modifiable by internal API. |
| `trackWaitEvents` | boolean | Track wait events during query execution for an instance. This flag is turned "on" by default but tracking is enabled only after observability enabled flag is also turned on. |

### `ObservabilityInstanceConfig` (v1beta)

- Observability Instance specific configuration.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `assistiveExperiencesEnabled` | boolean | Whether assistive experiences are enabled for this AlloyDB instance. |
| `enabled` | boolean | Observability feature status for an instance. This flag is turned "off" by default. |
| `maxQueryStringLength` | integer (int32) | Query string length. The default value is 10k. |
| `preserveComments` | boolean | Preserve comments in query string for an instance. This flag is turned "off" by default. |
| `queryPlansPerMinute` | integer (int32) | Number of query execution plans captured by Insights per minute for all queries combined. The default value is 200. Any integer between 0 to 200 is considered valid. |
| `recordApplicationTags` | boolean | Record application tags for an instance. This flag is turned "off" by default. |
| `trackActiveQueries` | boolean | Track actively running queries on the instance. If not set, this flag is "off" by default. |
| `trackActiveQueryPlan` | boolean | Indicates whether to track active query plans for an instance. If not set, the default value is "off". Can only be enabled if track_active_queries is enabled. Deprecated: Use track_active_queries instead. |
| `trackClientAddress` | boolean | Track client address for an instance. If not set, default value is "off". |
| `trackWaitEventTypes` | boolean | Output only. Track wait event types during query execution for an instance. This flag is turned "on" by default but tracking is enabled only after observability enabled flag is also turned on. This is read-only flag and only modifiable by internal API. |
| `trackWaitEvents` | boolean | Track wait events during query execution for an instance. This flag is turned "on" by default but tracking is enabled only after observability enabled flag is also turned on. |

### `ObservabilityInstanceInfo`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `enabled` | boolean | Output only. Observability feature status for an instance. |
| `maxQueryStringLength` | integer (int32) | Output only. Query string length. The default value is 10k. |
| `preserveComments` | boolean | Output only. Preserve comments in query string for an instance. |
| `queryPlansPerMinute` | integer (int32) | Output only. Number of query execution plans captured by Insights per minute for all queries combined. |
| `recordApplicationTags` | boolean | Output only. Record application tags for an instance. |
| `trackActiveQueries` | boolean | Output only. Track actively running queries on the instance. |
| `trackWaitEventTypes` | boolean | Output only. Track wait event types during query execution for an instance. |
| `trackWaitEvents` | boolean | Output only. Track wait events during query execution for an instance. |

### `ObservabilityInstanceInfo` (v1beta)

-
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `assistiveExperiencesEnabled` | boolean | Output only. Whether assistive experiences are enabled for this AlloyDB instance. |
| `enabled` | boolean | Output only. Observability feature status for an instance. |
| `maxQueryStringLength` | integer (int32) | Output only. Query string length. The default value is 10k. |
| `preserveComments` | boolean | Output only. Preserve comments in query string for an instance. |
| `queryPlansPerMinute` | integer (int32) | Output only. Number of query execution plans captured by Insights per minute for all queries combined. |
| `recordApplicationTags` | boolean | Output only. Record application tags for an instance. |
| `trackActiveQueries` | boolean | Output only. Track actively running queries on the instance. |
| `trackActiveQueryPlan` | boolean | Output only. Indicates whether to track active query plans for an instance. Deprecated: Use track_active_queries instead. |
| `trackClientAddress` | boolean | Output only. Track client address for an instance. |
| `trackWaitEventTypes` | boolean | Output only. Track wait event types during query execution for an instance. |
| `trackWaitEvents` | boolean | Output only. Track wait events during query execution for an instance. |

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

### `OperationMetadata`

- Represents the metadata of the long-running operation.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `apiVersion` | string | Output only. API version used to start the operation. |
| `createTime` | string (google-datetime) | Output only. The time the operation was created. |
| `endTime` | string (google-datetime) | Output only. The time the operation finished running. |
| `requestedCancellation` | boolean | Output only. Identifies whether the user has requested cancellation of the operation. Operations that have successfully been cancelled have google.longrunning.Operation.error value with a google.rpc.Status.code of 1, corresponding to `Code.CANCELLED`. |
| `statusMessage` | string | Output only. Human-readable status of the operation, if any. |
| `target` | string | Output only. Server-defined resource path for the target of the operation. |
| `upgradeClusterStatus` | UpgradeClusterStatus | Output only. UpgradeClusterStatus related metadata. |
| `verb` | string | Output only. Name of the verb executed by the operation. |

### `Policy`

- Policy for the autoscaler.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `connectionsCount` | ConnectionsCount | Optional. Connections count policy for the autoscaler. If not set, the autoscaler will not use connection count for scaling. |
| `coolDownPeriodSec` | string (int64) | The period of time in seconds after a new node is created before the autoscaler will incorporate its resource usage (e.g. CPU utilization) into the autoscaling recommendation algorithm. |
| `cpuUtilization` | CpuUtilization | CPU utilization policy for the autoscaler. |
| `enabled` | boolean | If true, autoscaling is enabled for the instance. If not set, the default value is false. |
| `maxNodeCount` | string (int64) | Maximum number of nodes for the autoscaler. |

### `PrimaryConfig`

- Configuration for the primary cluster. It has the list of clusters that are replicating from this cluster. This should be set if and only if the cluster is of type PRIMARY.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `secondaryClusterNames` | array<string> | Output only. Names of the clusters that are replicating from this cluster. |

### `PromoteClusterRequest`

- Message for promoting a Cluster
- Version: v1

| Field | Type | Description |
|---|---|---|
| `etag` | string | Optional. The current etag of the Cluster. If an etag is provided and does not match the current etag of the Cluster, deletion will be blocked and an ABORTED error will be returned. |
| `requestId` | string | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server ignores the request if it has already been completed. The server guarantees that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `validateOnly` | boolean | Optional. If set, performs request validation, for example, permission checks and any other type of validation, but does not actually execute the create request. |

### `PromoteClusterRequest` (v1beta)

- Message for promoting a Cluster
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `etag` | string | Optional. The current etag of the Cluster. If an etag is provided and does not match the current etag of the Cluster, deletion will be blocked and an ABORTED error will be returned. |
| `failover` | boolean | Optional. If set, the promote operation will attempt to recreate the original primary cluster as a secondary cluster when it comes back online. Otherwise, the promoted cluster will be a standalone cluster. Currently only supported when there is a single secondary cluster. |
| `requestId` | string | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server ignores the request if it has already been completed. The server guarantees that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `validateOnly` | boolean | Optional. If set, performs request validation, for example, permission checks and any other type of validation, but does not actually execute the create request. |

### `PscAutoConnectionConfig`

- Configuration for setting up PSC service automation. Consumer projects in the configs will be allowlisted automatically for the instance.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `consumerNetwork` | string | The consumer network for the PSC service automation, example: "projects/vpc-host-project/global/networks/default". The consumer network might be hosted a different project than the consumer project. |
| `consumerNetworkStatus` | string | Output only. The status of the service connection policy. Possible values: "STATE_UNSPECIFIED" - Default state, when Connection Map is created initially. "VALID" - Set when policy and map configuration is valid, and their matching can lead to allowing creation of PSC Connections subject to other constraints like connections limit. "CONNECTION_POLICY_MISSING" - No Service Connection Policy found for this network and Service Class "POLICY_LIMIT_REACHED" - Service Connection Policy limit reached for this network and Service Class "CONSUMER_INSTANCE_PROJECT_NOT_ALLOWLISTED" - The consumer instance project is not in AllowedGoogleProducersResourceHierarchyLevels of the matching ServiceConnectionPolicy. |
| `consumerProject` | string | The consumer project to which the PSC service automation endpoint will be created. |
| `dnsAutomationInfos` | array<DnsAutomationInfo> | Output only. List of DNS automation info for the PSC auto connection. |
| `ipAddress` | string | Output only. The IP address of the PSC service automation endpoint. |
| `serviceConnectionPolicy` | string | Output only. The PSC service connection policy name. The format is "projects//regions//serviceConnectionPolicies/" |
| `serviceConnectionPolicyCreationState` | string | Output only. The creation state or result of the connection policy. Possible values include: - `ACTIVE`: The policy was created successfully. - `PERMISSION_DENIED`: Sufficient permissions were not provided. Note that this field is an unstructured output and customers should not rely on the specific string value or error message directly. |
| `status` | string | Output only. The status of the PSC service automation connection. Possible values: "STATE_UNSPECIFIED" - An invalid state as the default case. "ACTIVE" - The connection has been created successfully. "FAILED" - The connection is not functional since some resources on the connection fail to be created. "CREATING" - The connection is being created. "DELETING" - The connection is being deleted. "CREATE_REPAIRING" - The connection is being repaired to complete creation. "DELETE_REPAIRING" - The connection is being repaired to complete deletion. |

### `PscConfig`

- PscConfig contains PSC related configuration at a cluster level.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `pscEnabled` | boolean | Optional. Create an instance that allows connections from Private Service Connect endpoints to the instance. |
| `serviceOwnedProjectNumber` | string (int64) | Output only. The project number that needs to be allowlisted on the network attachment to enable outbound connectivity. |

### `PscInstanceConfig`

- PscInstanceConfig contains PSC related configuration at an instance level.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `allowedConsumerProjects` | array<string> | Optional. List of consumer projects that are allowed to create PSC endpoints to service-attachments to this instance. |
| `pscAutoConnectionPolicyState` | string enum | Optional. Configuration for setting up PSC auto connection for the instance. Values: `PSC_AUTO_CONNECTION_POLICY_STATE_UNSPECIFIED`, `ENABLED`, `DISABLED`. |
| `pscAutoConnections` | array<PscAutoConnectionConfig> | Optional. Configurations for setting up PSC service automation. |
| `pscAutoDnsState` | string enum | Optional. Configuration for setting up PSC auto DNS for the instance. Values: `PSC_AUTO_DNS_STATE_UNSPECIFIED`, `PSC_AUTO_DNS_STATE_ENABLED`, `PSC_AUTO_DNS_STATE_DISABLED`. |
| `pscDnsName` | string | Output only. The DNS name of the instance for PSC connectivity. Name convention: ...alloydb-psc.goog |
| `pscInterfaceConfigs` | array<PscInterfaceConfig> | Optional. Configurations for setting up PSC interfaces attached to the instance which are used for outbound connectivity. Only primary instances can have PSC interface attached. Currently we only support 0 or 1 PSC interface. |
| `serviceAttachmentLink` | string | Output only. The service attachment created when Private Service Connect (PSC) is enabled for the instance. The name of the resource will be in the format of `projects//regions//serviceAttachments/` |

### `PscInstanceInfo`

- Information about the Private Service Connect (PSC) for the instance.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `effectivePscAutoConnectionPolicy` | boolean | Output only. Indicates if the PSC auto connection policy is enabled for the instance. For older instances, this will be off by default, but for newer instances, this will be auto-enabled. |
| `effectivePscAutoDnsEnabled` | boolean | Output only. The effective state of the PSC auto DNS for the instance. |
| `pscAutoDnsNames` | array<string> | Output only. Specifies the auto DNS names for the instance. |
| `serviceConnectionPolicy` | string | Output only. The PSC service connection policy name. The format is "projects//regions//serviceConnectionPolicies/" |

### `PscInterfaceConfig`

- Configuration for setting up a PSC interface to enable outbound connectivity.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `networkAttachmentResource` | string | The network attachment resource created in the consumer network to which the PSC interface will be linked. This is of the format: "projects/${CONSUMER_PROJECT}/regions/${REGION}/networkAttachments/${NETWORK_ATTACHMENT_NAME}". The network attachment must be in the same region as the instance. |

### `QuantityBasedExpiry`

- A backup's position in a quantity-based retention queue, of backups with the same source cluster and type, with length, retention, specified by the backup's retention policy. Once the position is greater than the retention, the backup is eligible to be garbage collected. Example: 5 backups from the same source cluster and type with a quantity-based retention of 3 and denoted by backup_id (position, retention). Safe: backup_5 (1, 3), backup_4, (2, 3), backup_3 (3, 3). Awaiting garbage collection: backup_2 (4, 3), backup_1 (5, 3)
- Version: v1

| Field | Type | Description |
|---|---|---|
| `retentionCount` | integer (int32) | Output only. The backup's position among its backups with the same source cluster and type, by descending chronological order create time(i.e. newest first). |
| `totalRetentionCount` | integer (int32) | Output only. The length of the quantity-based queue, specified by the backup's retention policy. |

### `QuantityBasedRetention`

- A quantity based policy specifies that a certain number of the most recent successful backups should be retained.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `count` | integer (int32) | The number of backups to retain. |

### `QueryInsightsInstanceConfig`

- QueryInsights Instance specific configuration.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `queryPlansPerMinute` | integer (uint32) | Number of query execution plans captured by Insights per minute for all queries combined. The default value is 5. Any integer between 0 and 20 is considered valid. |
| `queryStringLength` | integer (uint32) | Query string length. The default value is 1024. Any integer between 256 and 4500 is considered valid. |
| `recordApplicationTags` | boolean | Record application tags for an instance. This flag is turned "on" by default. |
| `recordClientAddress` | boolean | Record client address for an instance. Client address is PII information. This flag is turned "on" by default. |

### `QueryInsightsInstanceInfo`

- Instance level Query Insights information, which is read-only and available in the output only.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `enabled` | boolean | Output only. Whether Query Insights is enabled. |
| `queryPlansPerMinute` | integer (uint32) | Output only. Number of query execution plans captured per minute. |
| `queryStringLength` | integer (uint32) | Output only. Maximum query string length. |
| `recordApplicationTags` | boolean | Output only. Whether to record application tags. |
| `recordClientAddress` | boolean | Output only. Whether to record client address. |

### `ReadPoolConfig`

- Configuration for a read pool instance.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `autoScalingConfig` | AutoScalingConfig | Optional. Autoscaling configuration for the read pool instance. If not set, the read pool instance will not be autoscaled. |
| `nodeCount` | integer (int32) | Read capacity, i.e. number of nodes in a read pool instance. |

### `ReadPoolInstancesUpgradeStageStatus`

- Read pool instances upgrade specific status.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `upgradeStats` | Stats | Read pool instances upgrade statistics. |

### `RestartInstanceRequest`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nodeIds` | array<string> | Optional. Full name of the nodes as obtained from INSTANCE_VIEW_FULL to restart upon. Applicable only to read instances. |
| `requestId` | string | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server ignores the request if it has already been completed. The server guarantees that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if the original operation with the same request ID was received, and if so, ignores the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `validateOnly` | boolean | Optional. If set, performs request validation, for example, permission checks and any other type of validation, but does not actually execute the create request. |

### `RestoreClusterRequest`

- Message for restoring a Cluster from a backup or another cluster at a given point in time. NEXT_ID: 11
- Version: v1

| Field | Type | Description |
|---|---|---|
| `backupSource` | BackupSource | Backup source. |
| `backupdrBackupSource` | BackupDrBackupSource | BackupDR backup source. |
| `backupdrPitrSource` | BackupDrPitrSource | BackupDR source used for point in time recovery. |
| `cluster` | Cluster | Required. The resource being created |
| `clusterId` | string | Required. ID of the requesting object. |
| `continuousBackupSource` | ContinuousBackupSource | ContinuousBackup source. Continuous backup needs to be enabled in the source cluster for this operation to succeed. |
| `requestId` | string | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server ignores the request if it has already been completed. The server guarantees that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if the original operation with the same request ID was received, and if so, ignores the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `validateOnly` | boolean | Optional. If set, performs request validation, for example, permission checks and any other type of validation, but does not actually execute the create request. |

### `RestoreFromCloudSQLRequest`

- Message for registering Restoring from CloudSQL resource.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `cloudsqlBackupRunSource` | CloudSQLBackupRunSource | Cluster created from CloudSQL backup run. |
| `cluster` | Cluster | Required. The resource being created |
| `clusterId` | string | Required. ID of the requesting object. |

### `Schedule`

- A schedule for the autoscaler.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `cronExpression` | string | Cron expression for the triggering the schedule. See https://cloud.google.com/compute/docs/autoscaler/scaling-schedules#cron_expressions for the syntax. |
| `description` | string | Description of the schedule. |
| `disabled` | boolean | If true, the schedule is disabled. |
| `durationSec` | string (int64) | Duration of the schedule. |
| `minNodeCount` | string (int64) | Minimum number of nodes in while the schedule is active. |
| `name` | string | Name of the schedule. |
| `timeZone` | string | The location-based IANA time zone for interpreting the schedule's start time. If no time zone is provided, UTC is used by default. |

### `SecondaryConfig`

- Configuration information for the secondary cluster. This should be set if and only if the cluster is of type SECONDARY.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `primaryClusterName` | string | The name of the primary cluster name with the format: \* projects/{project}/locations/{region}/clusters/{cluster_id} |

### `SqlExportOptions`

- Options for exporting data in SQL format.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `cleanTargetObjects` | boolean | Optional. If true, output commands to DROP all the dumped database objects prior to outputting the commands for creating them. |
| `ifExistTargetObjects` | boolean | Optional. If true, use DROP ... IF EXISTS commands to check for the object's existence before dropping it in clean_target_objects mode. |
| `schemaOnly` | boolean | Optional. If true, only export the schema. |
| `tables` | array<string> | Optional. Tables to export from. |

### `SqlImportOptions`

- Options for importing data in SQL format.
- Version: v1

### `SslConfig`

- SSL configuration.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `caSource` | string enum | Optional. Certificate Authority (CA) source. Only CA_SOURCE_MANAGED is supported currently, and is the default value. Values: `CA_SOURCE_UNSPECIFIED`, `CA_SOURCE_MANAGED`. |
| `sslMode` | string enum | Optional. SSL mode. Specifies client-server SSL/TLS connection behavior. Values: `SSL_MODE_UNSPECIFIED`, `SSL_MODE_ALLOW`, `SSL_MODE_REQUIRE`, `SSL_MODE_VERIFY_CA`, `ALLOW_UNENCRYPTED_AND_ENCRYPTED`, `ENCRYPTED_ONLY`. |

### `StageInfo`

- Stage information for different stages in the upgrade process.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `logsUrl` | string | logs_url is the URL for the logs associated with a stage if that stage has logs. Right now, only three stages have logs: ALLOYDB_PRECHECK, PG_UPGRADE_CHECK, PRIMARY_INSTANCE_UPGRADE. |
| `stage` | string enum | The stage. Values: `STAGE_UNSPECIFIED`, `ALLOYDB_PRECHECK`, `PG_UPGRADE_CHECK`, `PREPARE_FOR_UPGRADE`, `PRIMARY_INSTANCE_UPGRADE`, `READ_POOL_INSTANCES_UPGRADE`, `ROLLBACK`, `CLEANUP`. |
| `status` | string enum | Status of the stage. Values: `STATUS_UNSPECIFIED`, `NOT_STARTED`, `IN_PROGRESS`, `SUCCESS`, `FAILED`, `PARTIAL_SUCCESS`, `CANCEL_IN_PROGRESS`, `CANCELLED`. |

### `StageStatus`

- Status of an upgrade stage.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `readPoolInstancesUpgrade` | ReadPoolInstancesUpgradeStageStatus | Read pool instances upgrade metadata. |
| `stage` | string enum | Upgrade stage. Values: `STAGE_UNSPECIFIED`, `ALLOYDB_PRECHECK`, `PG_UPGRADE_CHECK`, `PREPARE_FOR_UPGRADE`, `PRIMARY_INSTANCE_UPGRADE`, `READ_POOL_INSTANCES_UPGRADE`, `ROLLBACK`, `CLEANUP`. |
| `state` | string enum | State of this stage. Values: `STATUS_UNSPECIFIED`, `NOT_STARTED`, `IN_PROGRESS`, `SUCCESS`, `FAILED`, `PARTIAL_SUCCESS`, `CANCEL_IN_PROGRESS`, `CANCELLED`. |

### `Stats`

- Upgrade stats for read pool instances.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `failed` | integer (int32) | Number of read pool instances which failed to upgrade. |
| `notStarted` | integer (int32) | Number of read pool instances for which upgrade has not started. |
| `ongoing` | integer (int32) | Number of read pool instances undergoing upgrade. |
| `success` | integer (int32) | Number of read pool instances successfully upgraded. |

### `Status`

- The `Status` type defines a logical error model that is suitable for different programming environments, including REST APIs and RPC APIs. It is used by gRPC (https://github.com/grpc). Each `Status` message contains three pieces of data: error code, error message, and error details. You can find out more about this error model and how to work with it in the API Design Guide (https://cloud.google.com/apis/design/errors).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `code` | integer (int32) | The status code, which should be an enum value of google.rpc.Code. |
| `details` | array<object> | A list of messages that carry the error details. There is a common set of message types for APIs to use. |
| `message` | string | A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client. |

### `StorageDatabasecenterPartnerapiV1mainAvailabilityConfiguration`

- Disable validation warnings
- Version: v1

| Field | Type | Description |
|---|---|---|
| `automaticFailoverRoutingConfigured` | boolean | Disable validation warnings |
| `availabilityType` | string enum | Disable validation warnings Values: `AVAILABILITY_TYPE_UNSPECIFIED`, `ZONAL`, `REGIONAL`, `MULTI_REGIONAL`, `AVAILABILITY_TYPE_OTHER`. |
| `crossRegionReplicaConfigured` | boolean | Disable validation warnings |
| `externalReplicaConfigured` | boolean | Disable validation warnings |
| `promotableReplicaConfigured` | boolean | Disable validation warnings |

### `StorageDatabasecenterPartnerapiV1mainBackupConfiguration`

- Disable validation warnings
- Version: v1

| Field | Type | Description |
|---|---|---|
| `automatedBackupEnabled` | boolean | Disable validation warnings |
| `backupRetentionSettings` | StorageDatabasecenterPartnerapiV1mainRetentionSettings | Disable validation warnings |
| `pointInTimeRecoveryEnabled` | boolean | Disable validation warnings |

### `StorageDatabasecenterPartnerapiV1mainBackupDRConfiguration`

- Disable validation warnings
- Version: v1

| Field | Type | Description |
|---|---|---|
| `backupdrManaged` | boolean | Disable validation warnings |

### `StorageDatabasecenterPartnerapiV1mainBackupDRMetadata`

- Disable validation warnings
- Version: v1

| Field | Type | Description |
|---|---|---|
| `backupConfiguration` | StorageDatabasecenterPartnerapiV1mainBackupConfiguration | Disable validation warnings |
| `backupRun` | StorageDatabasecenterPartnerapiV1mainBackupRun | Disable validation warnings |
| `backupdrConfiguration` | StorageDatabasecenterPartnerapiV1mainBackupDRConfiguration | Disable validation warnings |
| `fullResourceName` | string | Required. Disable validation warnings |
| `lastRefreshTime` | string (google-datetime) | Required. Disable validation warnings |
| `resourceId` | StorageDatabasecenterPartnerapiV1mainDatabaseResourceId | Required. Disable validation warnings |

### `StorageDatabasecenterPartnerapiV1mainBackupRun`

- Disable validation warnings
- Version: v1

| Field | Type | Description |
|---|---|---|
| `endTime` | string (google-datetime) | Disable validation warnings |
| `error` | StorageDatabasecenterPartnerapiV1mainOperationError | Disable validation warnings |
| `startTime` | string (google-datetime) | Disable validation warnings |
| `status` | string enum | Disable validation warnings Values: `STATUS_UNSPECIFIED`, `SUCCESSFUL`, `FAILED`. |

### `StorageDatabasecenterPartnerapiV1mainCompliance`

- Disable validation warnings
- Version: v1

| Field | Type | Description |
|---|---|---|
| `standard` | string | Disable validation warnings |
| `version` | string | Disable validation warnings |

### `StorageDatabasecenterPartnerapiV1mainConfigBasedSignalData`

- Disable validation warnings
- Version: v1

| Field | Type | Description |
|---|---|---|
| `fullResourceName` | string | Required. Disable validation warnings |
| `lastRefreshTime` | string (google-datetime) | Required. Disable validation warnings |
| `resourceId` | StorageDatabasecenterPartnerapiV1mainDatabaseResourceId | Disable validation warnings |
| `signalBoolValue` | boolean | Disable validation warnings |
| `signalType` | string enum | Required. Disable validation warnings Values: `SIGNAL_TYPE_UNSPECIFIED`, `SIGNAL_TYPE_OUTDATED_MINOR_VERSION`, `SIGNAL_TYPE_DATABASE_AUDITING_DISABLED`, `SIGNAL_TYPE_NO_ROOT_PASSWORD`, `SIGNAL_TYPE_EXPOSED_TO_PUBLIC_ACCESS`, `SIGNAL_TYPE_UNENCRYPTED_CONNECTIONS`, `SIGNAL_TYPE_EXTENDED_SUPPORT`, `SIGNAL_TYPE_NO_AUTOMATED_BACKUP_POLICY`, `SIGNAL_TYPE_VERSION_NEARING_END_OF_LIFE`, `SIGNAL_TYPE_LAST_BACKUP_OLD`, `SIGNAL_TYPE_NOT_PROTECTED_BY_AUTOMATIC_FAILOVER`. |

### `StorageDatabasecenterPartnerapiV1mainCustomMetadataData`

- Disable validation warnings
- Version: v1

| Field | Type | Description |
|---|---|---|
| `internalResourceMetadata` | array<StorageDatabasecenterPartnerapiV1mainInternalResourceMetadata> | Disable validation warnings |

### `StorageDatabasecenterPartnerapiV1mainDatabaseResourceFeed`

- Disable validation warnings
- Version: v1

| Field | Type | Description |
|---|---|---|
| `backupdrMetadata` | StorageDatabasecenterPartnerapiV1mainBackupDRMetadata | Disable validation warnings |
| `configBasedSignalData` | StorageDatabasecenterPartnerapiV1mainConfigBasedSignalData | Disable validation warnings |
| `databaseResourceSignalData` | StorageDatabasecenterPartnerapiV1mainDatabaseResourceSignalData | Disable validation warnings |
| `feedTimestamp` | string (google-datetime) | Required. Disable validation warnings |
| `feedType` | string enum | Required. Disable validation warnings Values: `FEEDTYPE_UNSPECIFIED`, `RESOURCE_METADATA`, `OBSERVABILITY_DATA`, `SECURITY_FINDING_DATA`, `RECOMMENDATION_SIGNAL_DATA`, `CONFIG_BASED_SIGNAL_DATA`, `BACKUPDR_METADATA`, `DATABASE_RESOURCE_SIGNAL_DATA`. |
| `observabilityMetricData` | StorageDatabasecenterPartnerapiV1mainObservabilityMetricData | Disable validation warnings |
| `recommendationSignalData` | StorageDatabasecenterPartnerapiV1mainDatabaseResourceRecommendationSignalData | Disable validation warnings |
| `resourceHealthSignalData` | StorageDatabasecenterPartnerapiV1mainDatabaseResourceHealthSignalData | Disable validation warnings |
| `resourceId` | StorageDatabasecenterPartnerapiV1mainDatabaseResourceId | Disable validation warnings |
| `resourceMetadata` | StorageDatabasecenterPartnerapiV1mainDatabaseResourceMetadata | Disable validation warnings |
| `skipIngestion` | boolean | Optional. Disable validation warnings |

### Shape of `AuthorizedNetwork`

Generated from the Discovery schema (not in the official docs); values show each field type:

```json
{
  "cidrRange": "string"
}
```

## Notes

- Generated from the Discovery document(s) v1, v1beta, v1alpha of `alloydb` (retrieved 2026-11-14); a type with the same fields in several versions shows the preferred version; a type whose fields differ between versions is listed once per version (heading suffix `(version)`), and each type's `Version` line names the document it was taken from. A `$ref` resolves to the definition of the same version.
- Descriptions are verbatim from Discovery, which drops angle-bracket placeholders of the source comments: a format such as `projects//locations/global` stands for `projects/{project}/locations/global` (likewise `"@.iam.gserviceaccount.com"` lost the account ID before `@`, and a name format ending in a collection such as `projects/*/locations/*/registrations/` lost its last ID), and an expression such as `... && in labels` lost its left operand (for example `'label_value' in labels`). Check the method or field in the product's REST reference before relying on such a format.
- Source: https://alloydb.googleapis.com/$discovery/rest?version=v1, https://alloydb.googleapis.com/$discovery/rest?version=v1beta, https://alloydb.googleapis.com/$discovery/rest?version=v1alpha (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
