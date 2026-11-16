---
source: https://sqladmin.googleapis.com/$discovery/rest?version=v1
---

# Cloud SQL Admin API message schemas (sqladmin) (part 1/2)

## Signature / Usage

Message types referenced by the methods listed under `references/rest/sqladmin/`.

### `AclEntry`

- An entry for an Access Control list.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `expirationTime` | string (google-datetime) | The time when this access control entry expires in RFC 3339 (https://tools.ietf.org/html/rfc3339) format, for example `2012-11-15T16:19:00.094Z`. |
| `kind` | string | This is always `sql#aclEntry`. |
| `name` | string | Optional. A label to identify this entry. |
| `value` | string | The allowlisted value for the access control list. |

### `AcquireSsrsLeaseContext`

- Acquire SSRS lease context.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `duration` | string (google-duration) | Lease duration needed for SSRS setup. |
| `reportDatabase` | string | The report database to be used for SSRS setup. |
| `serviceLogin` | string | The username to be used as the service login to connect to the report database for SSRS setup. |
| `setupLogin` | string | The username to be used as the setup login to connect to the database server for SSRS setup. |

### `AdvancedMachineFeatures`

- Specifies options for controlling advanced machine features.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `threadsPerCore` | integer (int32) | The number of threads per physical core. |

### `ApiWarning`

- An Admin API warning message.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `code` | string enum | Code to uniquely identify the warning type. Values: `SQL_API_WARNING_CODE_UNSPECIFIED`, `REGION_UNREACHABLE`, `MAX_RESULTS_EXCEEDS_LIMIT`, `COMPROMISED_CREDENTIALS`, `INTERNAL_STATE_FAILURE`. |
| `message` | string | The warning message. |
| `region` | string | The region name for REGION_UNREACHABLE warning. |

### `AvailableDatabaseVersion`

- An available database version. It can be a major or a minor version.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `displayName` | string | The database version's display name. |
| `majorVersion` | string | The version's major version name. |
| `name` | string | The database version name. For MySQL 8.0, this string provides the database major and minor version. |

### `Backup`

- A backup resource.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `backupInterval` | Interval | Output only. This output contains the following values: start_time: All database writes up to this time are available. end_time: Any database writes after this time aren't available. |
| `backupKind` | string enum | Output only. Specifies the kind of backup, PHYSICAL or DEFAULT_SNAPSHOT. Values: `SQL_BACKUP_KIND_UNSPECIFIED`, `SNAPSHOT`, `PHYSICAL`. |
| `backupRun` | string | Output only. The mapping to backup run resource used for IAM validations. |
| `databaseVersion` | string enum | Output only. The database version of the instance of at the time this backup was made. Values: `SQL_DATABASE_VERSION_UNSPECIFIED`, `MYSQL_5_1`, `MYSQL_5_5`, `MYSQL_5_6`, `MYSQL_5_7`, `MYSQL_8_0`, `MYSQL_8_0_18`, `MYSQL_8_0_26`, `MYSQL_8_0_27`, `MYSQL_8_0_28`, `MYSQL_8_0_29`, `MYSQL_8_0_30`, `MYSQL_8_0_31`, `MYSQL_8_0_32`, `MYSQL_8_0_33`, `MYSQL_8_0_34`, `MYSQL_8_0_35`, `MYSQL_8_0_36`, `MYSQL_8_0_37`, `MYSQL_8_0_39`, `MYSQL_8_0_40`, `MYSQL_8_0_41`, `MYSQL_8_0_42`, `MYSQL_8_0_43`, `MYSQL_8_0_44`, `MYSQL_8_0_45`, `MYSQL_8_0_46`, `MYSQL_8_4`, `MYSQL_9_7`, `SQLSERVER_2017_STANDARD`, `SQLSERVER_2017_ENTERPRISE`, `SQLSERVER_2017_EXPRESS`, `SQLSERVER_2017_WEB`, `POSTGRES_9_6`, `POSTGRES_10`, `POSTGRES_11`, `POSTGRES_12`, `POSTGRES_13`, `POSTGRES_14`, `POSTGRES_15`, `POSTGRES_16`, `POSTGRES_17`, `POSTGRES_18`, `POSTGRES_19`, `POSTGRES_20`, `SQLSERVER_2019_STANDARD`, `SQLSERVER_2019_ENTERPRISE`, `SQLSERVER_2019_EXPRESS`, `SQLSERVER_2019_WEB`, `SQLSERVER_2022_STANDARD`, `SQLSERVER_2022_ENTERPRISE`, `SQLSERVER_2022_EXPRESS`, `SQLSERVER_2022_WEB`, `SQLSERVER_2025_STANDARD`, `SQLSERVER_2025_ENTERPRISE`, `SQLSERVER_2025_EXPRESS`. |
| `description` | string | The description of this backup. |
| `error` | OperationError | Output only. Information about why the backup operation fails (for example, when the backup state fails). |
| `expiryTime` | string (google-datetime) | Backup expiration time. A UTC timestamp of when this backup expired. |
| `instance` | string | The name of the source database instance. |
| `instanceDeletionTime` | string (google-datetime) | Optional. Output only. Timestamp in UTC of when the instance associated with this backup is deleted. |
| `instanceSettings` | DatabaseInstance | Optional. Output only. The instance setting of the source instance that's associated with this backup. |
| `kind` | string | Output only. This is always `sql#backup`. |
| `kmsKey` | string | Output only. This output contains the encryption configuration for a backup and the resource name of the KMS key for disk encryption. |
| `kmsKeyVersion` | string | Output only. This output contains the encryption status for a backup and the version of the KMS key that's used to encrypt the Cloud SQL instance. |
| `location` | string | The storage location of the backups. The location can be multi-regional. |
| `maxChargeableBytes` | string (int64) | Output only. The maximum chargeable bytes for the backup. |
| `name` | string | Output only. The resource name of the backup. Format: projects/{project}/backups/{backup}. |
| `satisfiesPzi` | boolean | Output only. This status indicates whether the backup satisfies PZI. The status is reserved for future use. |
| `satisfiesPzs` | boolean | Output only. This status indicates whether the backup satisfies PZS. The status is reserved for future use. |
| `selfLink` | string | Output only. The URI of this resource. |
| `state` | string enum | Output only. The status of this backup. Values: `SQL_BACKUP_STATE_UNSPECIFIED`, `ENQUEUED`, `RUNNING`, `FAILED`, `SUCCESSFUL`, `DELETING`, `DELETION_FAILED`. |
| `timeZone` | string | Output only. This output contains a backup time zone. If a Cloud SQL for SQL Server instance has a different time zone from the backup's time zone, then the restore to the instance doesn't happen. |
| `ttlDays` | string (int64) | Input only. The time-to-live (TTL) interval for this resource (in days). For example: ttlDays:7, means 7 days from the current time. The expiration time can't exceed 365 days from the time that the backup is created. |
| `type` | string enum | Output only. The type of this backup. The type can be "AUTOMATED", "ON_DEMAND" or “FINAL”. Values: `SQL_BACKUP_TYPE_UNSPECIFIED`, `AUTOMATED`, `ON_DEMAND`, `FINAL`. |

### `BackupConfiguration`

- Database instance backup configuration.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `backupRetentionSettings` | BackupRetentionSettings | Backup retention settings. |
| `backupTier` | string enum | Output only. Backup tier that manages the backups for the instance. Values: `BACKUP_TIER_UNSPECIFIED`, `STANDARD`, `ADVANCED`, `ENHANCED`. |
| `binaryLogEnabled` | boolean | (MySQL only) Whether binary log is enabled. If backup configuration is disabled, binarylog must be disabled as well. |
| `enabled` | boolean | Whether this configuration is enabled. |
| `kind` | string | This is always `sql#backupConfiguration`. |
| `location` | string | Location of the backup |
| `pointInTimeRecoveryEnabled` | boolean | Whether point in time recovery is enabled. |
| `replicationLogArchivingEnabled` | boolean | Optional. Deprecated: replication_log_archiving_enabled is deprecated and will be removed from a future version of the API. Use point_in_time_recovery_enabled instead. |
| `startTime` | string | Start time for the daily backup configuration in UTC timezone in the 24 hour format - `HH:MM`. |
| `transactionLogRetentionDays` | integer (int32) | The number of days of transaction logs we retain for point in time restore, from 1-7. |
| `transactionalLogStorageState` | string enum | Output only. This value contains the storage location of transactional logs used to perform point-in-time recovery (PITR) for the database. Values: `TRANSACTIONAL_LOG_STORAGE_STATE_UNSPECIFIED`, `DISK`, `SWITCHING_TO_CLOUD_STORAGE`, `SWITCHED_TO_CLOUD_STORAGE`, `CLOUD_STORAGE`. |

### `BackupContext`

- Backup context.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `backupId` | string (int64) | The identifier of the backup. |
| `kind` | string | This is always `sql#backupContext`. |
| `name` | string | The name of the backup. Format: projects/{project}/backups/{backup} |

### `BackupReencryptionConfig`

- Backup Reencryption Config
- Version: v1

| Field | Type | Description |
|---|---|---|
| `backupLimit` | integer (int32) | Backup re-encryption limit |
| `backupType` | string enum | Type of backups users want to re-encrypt. Values: `BACKUP_TYPE_UNSPECIFIED`, `AUTOMATED`, `ON_DEMAND`. |

### `BackupRetentionSettings`

- We currently only support backup retention by specifying the number of backups we will retain.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `retainedBackups` | integer (int32) | Depending on the value of retention_unit, this is used to determine if a backup needs to be deleted. If retention_unit is 'COUNT', we will retain this many backups. |
| `retentionUnit` | string enum | The unit that 'retained_backups' represents. Values: `RETENTION_UNIT_UNSPECIFIED`, `COUNT`. |

### `BackupRun`

- A BackupRun resource.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `backupKind` | string enum | Specifies the kind of backup, PHYSICAL or DEFAULT_SNAPSHOT. Values: `SQL_BACKUP_KIND_UNSPECIFIED`, `SNAPSHOT`, `PHYSICAL`. |
| `databaseVersion` | string enum | Output only. The instance database version at the time this backup was made. Values: `SQL_DATABASE_VERSION_UNSPECIFIED`, `MYSQL_5_1`, `MYSQL_5_5`, `MYSQL_5_6`, `MYSQL_5_7`, `MYSQL_8_0`, `MYSQL_8_0_18`, `MYSQL_8_0_26`, `MYSQL_8_0_27`, `MYSQL_8_0_28`, `MYSQL_8_0_29`, `MYSQL_8_0_30`, `MYSQL_8_0_31`, `MYSQL_8_0_32`, `MYSQL_8_0_33`, `MYSQL_8_0_34`, `MYSQL_8_0_35`, `MYSQL_8_0_36`, `MYSQL_8_0_37`, `MYSQL_8_0_39`, `MYSQL_8_0_40`, `MYSQL_8_0_41`, `MYSQL_8_0_42`, `MYSQL_8_0_43`, `MYSQL_8_0_44`, `MYSQL_8_0_45`, `MYSQL_8_0_46`, `MYSQL_8_4`, `MYSQL_9_7`, `SQLSERVER_2017_STANDARD`, `SQLSERVER_2017_ENTERPRISE`, `SQLSERVER_2017_EXPRESS`, `SQLSERVER_2017_WEB`, `POSTGRES_9_6`, `POSTGRES_10`, `POSTGRES_11`, `POSTGRES_12`, `POSTGRES_13`, `POSTGRES_14`, `POSTGRES_15`, `POSTGRES_16`, `POSTGRES_17`, `POSTGRES_18`, `POSTGRES_19`, `POSTGRES_20`, `SQLSERVER_2019_STANDARD`, `SQLSERVER_2019_ENTERPRISE`, `SQLSERVER_2019_EXPRESS`, `SQLSERVER_2019_WEB`, `SQLSERVER_2022_STANDARD`, `SQLSERVER_2022_ENTERPRISE`, `SQLSERVER_2022_EXPRESS`, `SQLSERVER_2022_WEB`, `SQLSERVER_2025_STANDARD`, `SQLSERVER_2025_ENTERPRISE`, `SQLSERVER_2025_EXPRESS`. |
| `description` | string | The description of this run, only applicable to on-demand backups. |
| `diskEncryptionConfiguration` | DiskEncryptionConfiguration | Encryption configuration specific to a backup. |
| `diskEncryptionStatus` | DiskEncryptionStatus | Encryption status specific to a backup. |
| `endTime` | string (google-datetime) | The time the backup operation completed in UTC timezone in RFC 3339 (https://tools.ietf.org/html/rfc3339) format, for example `2012-11-15T16:19:00.094Z`. |
| `enqueuedTime` | string (google-datetime) | The time the run was enqueued in UTC timezone in RFC 3339 (https://tools.ietf.org/html/rfc3339) format, for example `2012-11-15T16:19:00.094Z`. |
| `error` | OperationError | Information about why the backup operation failed. This is only present if the run has the FAILED status. |
| `id` | string (int64) | The identifier for this backup run. Unique only for a specific Cloud SQL instance. |
| `instance` | string | Name of the database instance. |
| `kind` | string | This is always `sql#backupRun`. |
| `location` | string | Location of the backups. |
| `maxChargeableBytes` | string (int64) | Output only. The maximum chargeable bytes for the backup. |
| `selfLink` | string | The URI of this resource. |
| `startTime` | string (google-datetime) | The time the backup operation actually started in UTC timezone in RFC 3339 (https://tools.ietf.org/html/rfc3339) format, for example `2012-11-15T16:19:00.094Z`. |
| `status` | string enum | The status of this run. Values: `SQL_BACKUP_RUN_STATUS_UNSPECIFIED`, `ENQUEUED`, `OVERDUE`, `RUNNING`, `FAILED`, `SUCCESSFUL`, `SKIPPED`, `DELETION_PENDING`, `DELETION_FAILED`, `DELETED`. |
| `timeZone` | string | Backup time zone to prevent restores to an instance with a different time zone. Now relevant only for SQL Server. |
| `type` | string enum | The type of this run; can be either "AUTOMATED" or "ON_DEMAND" or "FINAL". This field defaults to "ON_DEMAND" and is ignored, when specified for insert requests. Values: `SQL_BACKUP_RUN_TYPE_UNSPECIFIED`, `AUTOMATED`, `ON_DEMAND`. |
| `windowStartTime` | string (google-datetime) | The start time of the backup window during which this the backup was attempted in RFC 3339 (https://tools.ietf.org/html/rfc3339) format, for example `2012-11-15T16:19:00.094Z`. |

### `BackupRunsListResponse`

- Backup run list results.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `items` | array<BackupRun> | A list of backup runs in reverse chronological order of the enqueued time. |
| `kind` | string | This is always `sql#backupRunsList`. |
| `nextPageToken` | string | The continuation token, used to page through large result sets. Provide this value in a subsequent request to return the next page of results. |

### `BinLogCoordinates`

- Binary log coordinates.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `binLogFileName` | string | Name of the binary log file for a Cloud SQL instance. |
| `binLogPosition` | string (int64) | Position (offset) within the binary log file. |
| `kind` | string | This is always `sql#binLogCoordinates`. |

### `BlueGreenDeployment`

- A `BlueGreenDeployment` resource represents a Cloud SQL blue-green deployment setup.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. The time when the deployment was created. Example: `2024-01-01T00:00:00Z` |
| `deploymentMappings` | array<SourceTargetPairedNode> | Output only. A list representing the pairs of source and target instances in the deployment. |
| `deploymentTasks` | DeploymentTasks | Output only. Combined list of tasks for all paired nodes. |
| `description` | string | Optional. User-provided description for the deployment. The description can be up to 255 characters long. |
| `errorDetail` | string | Output only. Provides details on why switchover is not possible. This field is empty unless a switchover attempt failed or the state is `SWITCHOVER_NOT_READY`. Example: "The target database version does not match the source instance database version." |
| `name` | string | Output only. Identifier. The full resource name of the deployment. Format: projects/{project}/locations/{location}/blueGreenDeployments/{deployment_id} |
| `requestedConfig` | RequestedConfig | Optional. Immutable. Optional on create, and immutable. The configuration intended for the target instance(s) when the deployment was created. |
| `sourceInstance` | string | Required. Immutable. Required on create, and immutable. The full resource name of the source instance (the "blue" instance). Format: projects/{project}/instances/{instance} |
| `state` | string enum | Output only. The current state of the blue-green deployment. Values: `STATE_UNSPECIFIED`, `PROVISIONING`, `SWITCHOVER_READY`, `SWITCHOVER_NOT_READY`, `SWITCHOVER_IN_PROGRESS`, `SWITCHOVER_COMPLETED`, `DELETING`. |
| `switchoverTargetInstance` | string | Output only. The full resource name of the primary target instance (the "green" instance) that will be promoted during switchover. This field is always populated once the deployment is created. Format: projects/{project}/instances/{instance} |

### `BlueGreenDeployment` (v1beta4)

- A `BlueGreenDeployment` resource represents a Cloud SQL blue-green deployment setup. It orchestrates the lifecycle of creating a synchronized "green" environment from a "blue" production environment, performing updates, and managing the switchover process to minimize downtime.
- Version: v1beta4

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. The time when the deployment was created. |
| `deploymentMappings` | array<SourceTargetPairedNode> | Output only. A list representing the pairs of source and target instances in the deployment. |
| `deploymentTasks` | DeploymentTasks | Output only. Combined list of tasks for all paired nodes. |
| `description` | string | Optional. User-provided description for the deployment. |
| `errorDetail` | string | Output only. Provides an error message with details on why switchover is not possible. |
| `name` | string | Output only. Identifier. The full resource name of the deployment. Format: projects/{project}/locations/{location}/blueGreenDeployments/{deployment_id} |
| `pairedNodes` | array<SourceTargetPairedNode> | Output only. Deprecated: Use deployment_mappings instead. Output only. A list representing the pairs of source and target instances in the deployment. |
| `requestedConfig` | RequestedConfig | Optional. Immutable. Optional on create, and immutable. The configuration intended for the target instance(s) when the deployment was created. |
| `sourceInstance` | string | Required. Immutable. The instance ID of the source instance (the "blue" instance). The value for this field does not include the project ID, for example, `my-instance-id`. This field is immutable. |
| `state` | string enum | Output only. The current state of the blue-green deployment. Values: `STATE_UNSPECIFIED`, `PROVISIONING`, `SWITCHOVER_READY`, `SWITCHOVER_NOT_READY`, `SWITCHOVER_IN_PROGRESS`, `SWITCHOVER_COMPLETED`, `DELETING`. |
| `switchoverTargetInstance` | string | Output only. Details about the primary target instance (the "Green" instance) that will be promoted during switchover. |
| `targetConfig` | TargetConfig | Optional. Immutable. Deprecated: Use requested_config instead. The configuration intended for the target instance(s) when the deployment was created. This field is immutable. |

### `BlueGreenDeploymentInfo`

- Blue-green deployment metadata for a database instance. In a blue-green deployment, we maintain two environments, one of which is live. This message contains details about the blue-green deployment.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `deploymentId` | string | Output only. The resource ID of the blue-green deployment. |
| `source` | SourceRole | Output only. The source instance for the Blue-Green deployment. |
| `state` | string enum | Output only. The current state of blue-green-deployment for UI tags Values: `STATE_UNSPECIFIED`, `PRE_SWITCHOVER`, `POST_SWITCHOVER`. |
| `target` | TargetRole | Output only. The target instance for the Blue-Green deployment. |

### `CloneContext`

- Database instance clone context.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `allocatedIpRange` | string | The name of the allocated ip range for the private ip Cloud SQL instance. For example: "google-managed-services-default". If set, the cloned instance ip will be created in the allocated range. The range name must comply with RFC 1035 (https://tools.ietf.org/html/rfc1035). Specifically, the name must be 1-63 characters long and match the regular expression \[a-z\](\[-a-z0-9\]\*\[a-z0-9\])?. Reserved for future use. |
| `binLogCoordinates` | BinLogCoordinates | Binary log coordinates, if specified, identify the position up to which the source instance is cloned. If not specified, the source instance is cloned up to the most recent binary log coordinates. |
| `databaseNames` | array<string> | (SQL Server only) Clone only the specified databases from the source instance. Clone all databases if empty. |
| `destinationInstanceName` | string | Required. Name of the Cloud SQL instance to be created as a clone. |
| `destinationNetwork` | string | Optional. The fully qualified URI of the VPC network to which the cloned instance will be connected via private services access for private IP. For example:`projects/my-network-project/global/networks/my-network`. This field is only required for cross-project cloning. |
| `destinationProject` | string | Optional. The project ID of the destination project where the cloned instance will be created. To perform a cross-project clone, this field is required. If not specified, the clone is created in the same project as the source instance. |
| `kind` | string | This is always `sql#cloneContext`. |
| `pitrTimestampMs` | string (int64) | Reserved for future use. |
| `pointInTime` | string (google-datetime) | Timestamp, if specified, identifies the time to which the source instance is cloned. |
| `preferredSecondaryZone` | string | Optional. Copy clone and point-in-time recovery clone of a regional instance in the specified zones. If not specified, clone to the same secondary zone as the source instance. This value cannot be the same as the preferred_zone field. This field applies to all DB types. |
| `preferredZone` | string | Optional. Copy clone and point-in-time recovery clone of an instance to the specified zone. If no zone is specified, clone to the same primary zone as the source instance. This field applies to all DB types. |
| `sourceInstanceDeletionTime` | string (google-datetime) | The timestamp used to identify the time when the source instance is deleted. If this instance is deleted, then you must set the timestamp. |

### `Column`

- Contains the name and datatype of a column.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `name` | string | Name of the column. |
| `type` | string | Datatype of the column. |

### `ConfigDiff`

- Represents a specific configuration difference between blue and green instances.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `field` | string | Output only. The name of the field that differs in the blue and green instances, fully-qualified. Example: `settings.tier` |
| `sourceValue` | string | Output only. The value on the source instance. |
| `targetValue` | string | Output only. The value on the target instance. |

### `ConnectPoolNodeConfig`

- Details of a single read pool node of a read pool.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `dnsName` | string | Output only. The DNS name of the read pool node. |
| `dnsNames` | array<DnsNameMapping> | Output only. The list of DNS names used by this read pool node. |
| `ipAddresses` | array<IpMapping> | Output only. Mappings containing IP addresses that can be used to connect to the read pool node. |
| `name` | string | Output only. The name of the read pool node. Doesn't include the project ID. |

### `ConnectSettings`

- Connect settings retrieval response.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `backendType` | string enum | `SECOND_GEN`: Cloud SQL database instance. `EXTERNAL`: A database server that is not managed by Google. This property is read-only; use the `tier` property in the `settings` object to determine the database type. Values: `SQL_BACKEND_TYPE_UNSPECIFIED`, `FIRST_GEN`, `SECOND_GEN`, `EXTERNAL`. |
| `connectionName` | string | Optional. Output only. Connection name of the Cloud SQL instance used in connection strings, in the format project:region:instance. |
| `customSubjectAlternativeNames` | array<string> | Custom subject alternative names for the server certificate. |
| `databaseVersion` | string enum | The database engine type and version. The `databaseVersion` field cannot be changed after instance creation. MySQL instances: `MYSQL_8_0`, `MYSQL_5_7` (default), or `MYSQL_5_6`. PostgreSQL instances: `POSTGRES_9_6`, `POSTGRES_10`, `POSTGRES_11`, `POSTGRES_12` (default), `POSTGRES_13`, or `POSTGRES_14`. SQL Server instances: `SQLSERVER_2017_STANDARD` (default), `SQLSERVER_2017_ENTERPRISE`, `SQLSERVER_2017_EXPRESS`, `SQLSERVER_2017_WEB`, `SQLSERVER_2019_STANDARD`, `SQLSERVER_2019_ENTERPRISE`, `SQLSERVER_2019_EXPRESS`, or `SQLSERVER_2019_WEB`. Values: `SQL_DATABASE_VERSION_UNSPECIFIED`, `MYSQL_5_1`, `MYSQL_5_5`, `MYSQL_5_6`, `MYSQL_5_7`, `MYSQL_8_0`, `MYSQL_8_0_18`, `MYSQL_8_0_26`, `MYSQL_8_0_27`, `MYSQL_8_0_28`, `MYSQL_8_0_29`, `MYSQL_8_0_30`, `MYSQL_8_0_31`, `MYSQL_8_0_32`, `MYSQL_8_0_33`, `MYSQL_8_0_34`, `MYSQL_8_0_35`, `MYSQL_8_0_36`, `MYSQL_8_0_37`, `MYSQL_8_0_39`, `MYSQL_8_0_40`, `MYSQL_8_0_41`, `MYSQL_8_0_42`, `MYSQL_8_0_43`, `MYSQL_8_0_44`, `MYSQL_8_0_45`, `MYSQL_8_0_46`, `MYSQL_8_4`, `MYSQL_9_7`, `SQLSERVER_2017_STANDARD`, `SQLSERVER_2017_ENTERPRISE`, `SQLSERVER_2017_EXPRESS`, `SQLSERVER_2017_WEB`, `POSTGRES_9_6`, `POSTGRES_10`, `POSTGRES_11`, `POSTGRES_12`, `POSTGRES_13`, `POSTGRES_14`, `POSTGRES_15`, `POSTGRES_16`, `POSTGRES_17`, `POSTGRES_18`, `POSTGRES_19`, `POSTGRES_20`, `SQLSERVER_2019_STANDARD`, `SQLSERVER_2019_ENTERPRISE`, `SQLSERVER_2019_EXPRESS`, `SQLSERVER_2019_WEB`, `SQLSERVER_2022_STANDARD`, `SQLSERVER_2022_ENTERPRISE`, `SQLSERVER_2022_EXPRESS`, `SQLSERVER_2022_WEB`, `SQLSERVER_2025_STANDARD`, `SQLSERVER_2025_ENTERPRISE`, `SQLSERVER_2025_EXPRESS`. |
| `dnsName` | string | The dns name of the instance. |
| `dnsNames` | array<DnsNameMapping> | Output only. The list of DNS names used by this instance. |
| `ipAddresses` | array<IpMapping> | The assigned IP addresses for the instance. |
| `kind` | string | This is always `sql#connectSettings`. |
| `mdxProtocolSupport` | array<string> | Optional. Output only. mdx_protocol_support controls how the client uses metadata exchange when connecting to the instance. The values in the list representing parts of the MDX protocol that are supported by this instance. When the list is empty, the instance does not support MDX, so the client must not send an MDX request. The default is empty. Values: `MDX_PROTOCOL_SUPPORT_UNSPECIFIED`, `CLIENT_PROTOCOL_TYPE`. |
| `nodeCount` | integer (int32) | The number of read pool nodes in a read pool. |
| `nodes` | array<ConnectPoolNodeConfig> | Output only. Entries containing information about each read pool node of the read pool. |
| `pscEnabled` | boolean | Whether PSC connectivity is enabled for this instance. |
| `region` | string | The cloud region for the instance. For example, `us-central1`, `europe-west1`. The region cannot be changed after instance creation. |
| `serverCaCert` | SslCert | SSL configuration. |
| `serverCaMode` | string enum | Specify what type of CA is used for the server certificate. Values: `CA_MODE_UNSPECIFIED`, `GOOGLE_MANAGED_INTERNAL_CA`, `GOOGLE_MANAGED_CAS_CA`, `CUSTOMER_MANAGED_CAS_CA`. |

### `ConnectionPoolConfig`

- The managed connection pooling configuration.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `connectionPoolingEnabled` | boolean | Whether managed connection pooling is enabled. |
| `flags` | array<ConnectionPoolFlags> | Optional. List of connection pool configuration flags. |
| `poolerCount` | integer (int32) | Output only. Number of connection poolers. |

### `ConnectionPoolFlags`

- Connection pool flags for Cloud SQL instances managed connection pool configuration.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `name` | string | Required. The name of the flag. |
| `value` | string | Required. The value of the flag. Boolean flags are set to `on` for true and `off` for false. This field must be omitted if the flag doesn't take a value. |

### `DataCacheConfig`

- Data cache configurations.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `dataCacheEnabled` | boolean | Whether data cache is enabled for the instance. |

### `Database`

- Represents a SQL database on the Cloud SQL instance.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `charset` | string | The Cloud SQL charset value. |
| `collation` | string | The Cloud SQL collation value. |
| `etag` | string | This field is deprecated and will be removed from a future version of the API. |
| `instance` | string | The name of the Cloud SQL instance. This does not include the project ID. |
| `kind` | string | This is always `sql#database`. |
| `name` | string | The name of the database in the Cloud SQL instance. This does not include the project ID or instance name. |
| `project` | string | The project ID of the project containing the Cloud SQL database. The Google apps domain is prefixed if applicable. |
| `selfLink` | string | The URI of this resource. |
| `sqlserverDatabaseDetails` | SqlServerDatabaseDetails | — |

### `DatabaseFlags`

- Database flags for Cloud SQL instances.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `name` | string | The name of the flag. These flags are passed at instance startup, so include both server options and system variables. Flags are specified with underscores, not hyphens. For more information, see Configuring Database Flags (https://cloud.google.com/sql/docs/mysql/flags) in the Cloud SQL documentation. |
| `value` | string | The value of the flag. Boolean flags are set to `on` for true and `off` for false. This field must be omitted if the flag doesn't take a value. |

### `DatabaseInstance`

- A Cloud SQL instance resource.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `availableMaintenanceVersions` | array<string> | Output only. List all maintenance versions applicable on the instance |
| `backendType` | string enum | The backend type. `SECOND_GEN`: Cloud SQL database instance. `EXTERNAL`: A database server that is not managed by Google. This property is read-only; use the `tier` property in the `settings` object to determine the database type. Values: `SQL_BACKEND_TYPE_UNSPECIFIED`, `FIRST_GEN`, `SECOND_GEN`, `EXTERNAL`. |
| `connectionName` | string | Connection name of the Cloud SQL instance used in connection strings. |
| `createTime` | string (google-datetime) | Output only. The time when the instance was created in RFC 3339 (https://tools.ietf.org/html/rfc3339) format, for example `2012-11-15T16:19:00.094Z`. |
| `currentDiskSize` | string (int64) | The current disk usage of the instance in bytes. This property has been deprecated. Use the "cloudsql.googleapis.com/database/disk/bytes_used" metric in Cloud Monitoring API instead. Please see this announcement (https://groups.google.com/d/msg/google-cloud-sql-announce/I_7-F9EBhT0/BtvFtdFeAgAJ) for details. |
| `databaseCenterIntegration` | string enum | Optional. State of the Database Center integration for this instance. When unspecified, Database Center integration is enabled by default. Values: `DATABASE_CENTER_INTEGRATION_UNSPECIFIED`, `ENABLED`, `DISABLED`. |
| `databaseCenterIntegrationEnabled` | boolean | Optional. If true, instance metadata is sent to the Database Center. If false, instance metadata is not sent to the Database Center. |
| `databaseInstalledVersion` | string | Output only. Stores the current database version running on the instance including minor version such as `MYSQL_8_0_18`. |
| `databaseVersion` | string enum | The database engine type and version. The `databaseVersion` field cannot be changed after instance creation. Values: `SQL_DATABASE_VERSION_UNSPECIFIED`, `MYSQL_5_1`, `MYSQL_5_5`, `MYSQL_5_6`, `MYSQL_5_7`, `MYSQL_8_0`, `MYSQL_8_0_18`, `MYSQL_8_0_26`, `MYSQL_8_0_27`, `MYSQL_8_0_28`, `MYSQL_8_0_29`, `MYSQL_8_0_30`, `MYSQL_8_0_31`, `MYSQL_8_0_32`, `MYSQL_8_0_33`, `MYSQL_8_0_34`, `MYSQL_8_0_35`, `MYSQL_8_0_36`, `MYSQL_8_0_37`, `MYSQL_8_0_39`, `MYSQL_8_0_40`, `MYSQL_8_0_41`, `MYSQL_8_0_42`, `MYSQL_8_0_43`, `MYSQL_8_0_44`, `MYSQL_8_0_45`, `MYSQL_8_0_46`, `MYSQL_8_4`, `MYSQL_9_7`, `SQLSERVER_2017_STANDARD`, `SQLSERVER_2017_ENTERPRISE`, `SQLSERVER_2017_EXPRESS`, `SQLSERVER_2017_WEB`, `POSTGRES_9_6`, `POSTGRES_10`, `POSTGRES_11`, `POSTGRES_12`, `POSTGRES_13`, `POSTGRES_14`, `POSTGRES_15`, `POSTGRES_16`, `POSTGRES_17`, `POSTGRES_18`, `POSTGRES_19`, `POSTGRES_20`, `SQLSERVER_2019_STANDARD`, `SQLSERVER_2019_ENTERPRISE`, `SQLSERVER_2019_EXPRESS`, `SQLSERVER_2019_WEB`, `SQLSERVER_2022_STANDARD`, `SQLSERVER_2022_ENTERPRISE`, `SQLSERVER_2022_EXPRESS`, `SQLSERVER_2022_WEB`, `SQLSERVER_2025_STANDARD`, `SQLSERVER_2025_ENTERPRISE`, `SQLSERVER_2025_EXPRESS`. |
| `deploymentInfo` | BlueGreenDeploymentInfo | Output only. Deployment info for the instance. This is set if the instance is currently part of any blue-green setup. |
| `diskEncryptionConfiguration` | DiskEncryptionConfiguration | Disk encryption configuration specific to an instance. |
| `diskEncryptionStatus` | DiskEncryptionStatus | Disk encryption status specific to an instance. |
| `dnsName` | string | Output only. The dns name of the instance. |
| `dnsNames` | array<DnsNameMapping> | Output only. The list of DNS names used by this instance. |
| `etag` | string | This field is deprecated and will be removed from a future version of the API. Use the `settings.settingsVersion` field instead. |
| `failoverReplica` | object | The name and status of the failover replica. |
| `gceZone` | string | The Compute Engine zone that the instance is currently serving from. This value could be different from the zone that was specified when the instance was created if the instance has failed over to its secondary zone. WARNING: Changing this might restart the instance. |
| `geminiConfig` | GeminiInstanceConfig | Gemini instance configuration. |
| `includeReplicasForMajorVersionUpgrade` | boolean | Input only. Determines whether an in-place major version upgrade of replicas happens when an in-place major version upgrade of a primary instance is initiated. |
| `instanceType` | string enum | The instance type. Values: `SQL_INSTANCE_TYPE_UNSPECIFIED`, `CLOUD_SQL_INSTANCE`, `ON_PREMISES_INSTANCE`, `READ_REPLICA_INSTANCE`, `READ_POOL_INSTANCE`, `GREEN_INSTANCE`. |
| `ipAddresses` | array<IpMapping> | The assigned IP addresses for the instance. |
| `ipv6Address` | string | The IPv6 address assigned to the instance. (Deprecated) This property was applicable only to First Generation instances. |
| `kind` | string | This is always `sql#instance`. |
| `maintenanceVersion` | string | The current software version on the instance. |
| `masterInstanceName` | string | The name of the instance which will act as primary in the replication setup. |
| `maxDiskSize` | string (int64) | The maximum disk size of the instance in bytes. |
| `name` | string | Name of the Cloud SQL instance. This does not include the project ID. |
| `nodeCount` | integer (int32) | The number of read pool nodes in a read pool. |
| `nodes` | array<PoolNodeConfig> | Output only. Entries containing information about each read pool node of the read pool. |
| `onPremisesConfiguration` | OnPremisesConfiguration | Configuration specific to on-premises instances. |
| `outOfDiskReport` | SqlOutOfDiskReport | This field represents the report generated by the proactive database wellness job for OutOfDisk issues. \* Writers: \* the proactive database wellness job for OOD. \* Readers: \* the proactive database wellness job |
| `primaryDnsName` | string | Output only. DEPRECATED: please use write_endpoint instead. |
| `project` | string | The project ID of the project containing the Cloud SQL instance. The Google apps domain is prefixed if applicable. |
| `pscServiceAttachmentLink` | string | Output only. The link to service attachment of PSC instance. |
| `region` | string | The geographical region of the Cloud SQL instance. It can be one of the regions (https://cloud.google.com/sql/docs/mysql/locations#location-r) where Cloud SQL operates: For example, `asia-east1`, `europe-west1`, and `us-central1`. The default value is `us-central1`. |
| `replicaConfiguration` | ReplicaConfiguration | Configuration specific to failover replicas and read replicas. |
| `replicaNames` | array<string> | The replicas of the instance. |
| `replicationCluster` | ReplicationCluster | Optional. A primary instance and disaster recovery (DR) replica pair. A DR replica is a cross-region replica that you designate for failover in the event that the primary instance experiences regional failure. Applicable to MySQL and PostgreSQL. |
| `rootPassword` | string | Initial root password. Use only on creation. You must set root passwords before you can connect to PostgreSQL instances. |
| `satisfiesPzi` | boolean | Output only. This status indicates whether the instance satisfies PZI. The status is reserved for future use. |
| `satisfiesPzs` | boolean | This status indicates whether the instance satisfies PZS. The status is reserved for future use. |
| `scheduledMaintenance` | SqlScheduledMaintenance | The start time of any upcoming scheduled maintenance for this instance. |
| `secondaryGceZone` | string | The Compute Engine zone that the failover instance is currently serving from for a regional instance. This value could be different from the zone that was specified when the instance was created if the instance has failed over to its secondary/failover zone. |
| `selfLink` | string | The URI of this resource. |
| `serverCaCert` | SslCert | SSL configuration. |
| `serviceAccountEmailAddress` | string | The service account email address assigned to the instance.\This property is read-only. |
| `settings` | Settings | The user settings. |
| `skipPrecheck` | boolean | Optional. Input only. Determines whether the precheck step is skipped during a major version upgrade. |
| `sqlNetworkArchitecture` | string enum | — Values: `SQL_NETWORK_ARCHITECTURE_UNSPECIFIED`, `NEW_NETWORK_ARCHITECTURE`, `OLD_NETWORK_ARCHITECTURE`. |
| `state` | string enum | The current serving state of the Cloud SQL instance. Values: `SQL_INSTANCE_STATE_UNSPECIFIED`, `RUNNABLE`, `SUSPENDED`, `PENDING_DELETE`, `PENDING_CREATE`, `MAINTENANCE`, `FAILED`, `ONLINE_MAINTENANCE`, `REPAIRING`. |
| `suspensionReason` | array<string> | If the instance state is SUSPENDED, the reason for the suspension. Values: `SQL_SUSPENSION_REASON_UNSPECIFIED`, `BILLING_ISSUE`, `LEGAL_ISSUE`, `OPERATIONAL_ISSUE`, `KMS_KEY_ISSUE`, `PROJECT_ABUSE`. |
| `switchTransactionLogsToCloudStorageEnabled` | boolean | Input only. Whether Cloud SQL is enabled to switch storing point-in-time recovery log files from a data disk to Cloud Storage. |
| `tags` | object | Optional. Input only. Immutable. Tag keys and tag values that are bound to this instance. You must represent each item in the map as: `"" : ""`. For example, a single resource can have the following tags: "123/environment": "production", "123/costCenter": "marketing", For more information on tag creation and management, see https://cloud.google.com/resource-manager/docs/tags/tags-overview. |
| `upgradableDatabaseVersions` | array<AvailableDatabaseVersion> | Output only. All database versions that are available for upgrade. |
| `writeEndpoint` | string | Output only. The dns name of the primary instance in a replication group. |

### `DatabasesListResponse`

- Database list response.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `items` | array<Database> | List of database resources in the instance. |
| `kind` | string | This is always `sql#databasesList`. |

### `DemoteContext`

- This context is used to demote an existing standalone instance to be a Cloud SQL read replica for an external database server.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `kind` | string | This is always `sql#demoteContext`. |
| `sourceRepresentativeInstanceName` | string | Required. The name of the instance which acts as the on-premises primary instance in the replication setup. |

### `DemoteMasterConfiguration`

- Read-replica configuration for connecting to the on-premises primary instance.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `kind` | string | This is always `sql#demoteMasterConfiguration`. |
| `mysqlReplicaConfiguration` | DemoteMasterMySqlReplicaConfiguration | MySQL specific configuration when replicating from a MySQL on-premises primary instance. Replication configuration information such as the username, password, certificates, and keys are not stored in the instance metadata. The configuration information is used only to set up the replication connection and is stored by MySQL in a file named `master.info` in the data directory. |

### `DemoteMasterContext`

- Database instance demote primary instance context.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `kind` | string | This is always `sql#demoteMasterContext`. |
| `masterInstanceName` | string | The name of the instance which will act as on-premises primary instance in the replication setup. |
| `replicaConfiguration` | DemoteMasterConfiguration | Configuration specific to read-replicas replicating from the on-premises primary instance. |
| `skipReplicationSetup` | boolean | Flag to skip replication setup on the instance. |
| `verifyGtidConsistency` | boolean | Verify the GTID consistency for demote operation. Default value: `True`. Setting this flag to `false` enables you to bypass the GTID consistency check between on-premises primary instance and Cloud SQL instance during the demotion operation but also exposes you to the risk of future replication failures. Change the value only if you know the reason for the GTID divergence and are confident that doing so will not cause any replication issues. |

### `DemoteMasterMySqlReplicaConfiguration`

- Read-replica configuration specific to MySQL databases.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `caCertificate` | string | PEM representation of the trusted CA's x509 certificate. |
| `clientCertificate` | string | PEM representation of the replica's x509 certificate. |
| `clientKey` | string | PEM representation of the replica's private key. The corresponding public key is encoded in the client's certificate. The format of the replica's private key can be either PKCS #1 or PKCS #8. |
| `kind` | string | This is always `sql#demoteMasterMysqlReplicaConfiguration`. |
| `password` | string | The password for the replication connection. |
| `username` | string | The username for the replication connection. |

### `DenyMaintenancePeriod`

- Deny maintenance Periods. This specifies a date range during when all CSA rollout will be denied.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `endDate` | string | "deny maintenance period" end date. If the year of the end date is empty, the year of the start date also must be empty. In this case, it means the no maintenance interval recurs every year. The date is in format yyyy-mm-dd i.e., 2020-11-01, or mm-dd, i.e., 11-01 |
| `startDate` | string | "deny maintenance period" start date. If the year of the start date is empty, the year of the end date also must be empty. In this case, it means the deny maintenance period recurs every year. The date is in format yyyy-mm-dd i.e., 2020-11-01, or mm-dd, i.e., 11-01 |
| `time` | string | Time in UTC when the "deny maintenance period" starts on start_date and ends on end_date. The time is in format: HH:mm:SS, i.e., 00:00:00 |

### `DeploymentTask`

- Represents a task executed as part of the deployment on a target instance.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `endTime` | string (google-datetime) | Output only. Task end time (if completed). |
| `errorMessage` | string | Output only. Optional error details if the task state is `FAILED`. |
| `startTime` | string (google-datetime) | Output only. Task start time. |
| `state` | string enum | Output only. The current state of the task. Values: `STATE_UNSPECIFIED`, `PENDING`, `RUNNING`, `SUCCEEDED`, `FAILED`. |
| `type` | string enum | Output only. The type of the task. Values: `TYPE_UNSPECIFIED`, `PROVISION`, `UPGRADE`, `SWITCHOVER`, `DELETE`, `POST_SWITCHOVER_OPERATIONS`. |

### `DeploymentTasks`

- Combined list of tasks for all paired nodes in the deployment.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `task` | array<DeploymentTask> | Output only. Tasks performed or being performed on the paired nodes of the deployment at a consolidated level. |

### `DiskEncryptionConfiguration`

- Disk encryption configuration for an instance.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `cmekSourceLogEncryptionEnforced` | boolean | Optional. Whether to enforce CMEK log encryption at source. When enforced, transaction logs are encrypted prior to being uploaded to Cloud Storage. If not enforced, then CMEK logs are encrypted by the Cloud Storage service. |
| `confidentialMode` | boolean | Optional. If true, enables Confidential Mode for the instance's Hyperdisk Balanced volumes. Only supported for zonal C4A instances currently. |
| `kind` | string | This is always `sql#diskEncryptionConfiguration`. |
| `kmsKeyName` | string | Resource name of KMS key for disk encryption. |

### `DiskEncryptionStatus`

- Disk encryption status for an instance.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `kind` | string | This is always `sql#diskEncryptionStatus`. |
| `kmsKeyVersionName` | string | KMS key version used to encrypt the Cloud SQL instance resource |

### `DnsNameMapping`

- DNS metadata.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `connectionType` | string enum | Output only. The connection type of the DNS name. Values: `CONNECTION_TYPE_UNSPECIFIED`, `PUBLIC`, `PRIVATE_SERVICES_ACCESS`, `PRIVATE_SERVICE_CONNECT`. |
| `dnsScope` | string enum | Output only. The scope that the DNS name applies to. Values: `DNS_SCOPE_UNSPECIFIED`, `INSTANCE`, `CLUSTER`. |
| `name` | string | Output only. The DNS name. |
| `recordManager` | string enum | Output only. The manager for this DNS record. Values: `RECORD_MANAGER_UNSPECIFIED`, `CUSTOMER`, `CLOUD_SQL_AUTOMATION`. |

### `Empty`

- A generic empty message that you can re-use to avoid defining duplicated empty messages in your APIs. A typical example is to use it as the request or the response type of an API method. For instance: service Foo { rpc Bar(google.protobuf.Empty) returns (google.protobuf.Empty); }
- Version: v1

### `ExecuteSqlPayload`

- The request payload used to execute SQL statements.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `application` | string | Optional. Specifies the name of the application that is making the request. This field is used for telemetry. Only alphanumeric characters, dashes, and underscores are allowed. The maximum length is 32 characters. |
| `autoIamAuthn` | boolean | Optional. When set to `true`, the API caller identity associated with the request is used for database authentication. The API caller must be an IAM user in the database. |
| `database` | string | Optional. Name of the database on which the statement will be executed. For Postgres and SQL Server it's required, for MySQL it's optional. |
| `partialResultMode` | string enum | Optional. Controls how the API should respond when the SQL execution result is incomplete due to the size limit or another error. The default mode is to throw an error. Values: `PARTIAL_RESULT_MODE_UNSPECIFIED`, `FAIL_PARTIAL_RESULT`, `ALLOW_PARTIAL_RESULT`. |
| `passwordSecretVersion` | string | Optional. The resource name of the Secret Manager secret holding the password for the user to log into the database. The secret should be created using the regional endpoint (for API) or from the Regional Secrets page (for UI), and stored in the same region as the Cloud SQL instance. The expected resource name format is `projects/{project}/locations/{location}/secrets/{secret}/versions/{secret_version}`. Used together with the `user` field. The secret resource name will not be stored. |
| `rowLimit` | string (int64) | Optional. The maximum number of rows returned per SQL statement. |
| `sqlStatement` | string | Required. SQL statements to run on the database. It can be a single statement or a sequence of statements separated by semicolons. |
| `user` | string | Optional. The name of an existing database user to connect to the database. When `auto_iam_authn` is set to true, this field is ignored and the API caller's IAM user is used. |

### `ExportContext`

- Database instance export context.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `bakExportOptions` | object | Options for exporting BAK files (SQL Server-only) |
| `csvExportOptions` | object | Options for exporting data as CSV. `MySQL` and `PostgreSQL` instances only. |
| `databases` | array<string> | Databases to be exported. `MySQL instances:` If `fileType` is `SQL` and no database is specified, all databases are exported, except for the `mysql` system database. If `fileType` is `CSV`, you can specify one database, either by using this property or by using the `csvExportOptions.selectQuery` property, which takes precedence over this property. `PostgreSQL instances:` If you don't specify a database by name, all user databases in the instance are exported. This excludes system databases and Cloud SQL databases used to manage internal operations. Exporting all user databases is only available for directory-formatted parallel export. If `fileType` is `CSV`, this database must match the one specified in the `csvExportOptions.selectQuery` property. `SQL Server instances:` You must specify one database to be exported, and the `fileType` must be `BAK`. |
| `fileType` | string enum | The file type for the specified uri. Values: `SQL_FILE_TYPE_UNSPECIFIED`, `SQL`, `CSV`, `BAK`, `TDE`. |
| `kind` | string | This is always `sql#exportContext`. |
| `offload` | boolean | Whether to perform a serverless export. |
| `sqlExportOptions` | object | Options for exporting data as SQL statements. |
| `tdeExportOptions` | object | Optional. Export parameters specific to SQL Server TDE certificates |
| `uri` | string | The path to the file in Google Cloud Storage where the export will be stored. The URI is in the form `gs://bucketName/fileName`. If the file already exists, the request succeeds, but the operation fails. If `fileType` is `SQL` and the filename ends with .gz, the contents are compressed. |

### `ExternalSyncSelectedObject`

- The selected object that Cloud SQL migrates.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `database` | string | The name of the database that Cloud SQL migrates. |

### `FailoverContext`

- Database instance failover context.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `kind` | string | This is always `sql#failoverContext`. |
| `settingsVersion` | string (int64) | The current settings version of this instance. Request will be rejected if this version doesn't match the current settings version. |

### `FinalBackupConfig`

- Config used to determine the final backup settings for the instance.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `enabled` | boolean | Whether the final backup is enabled for the instance. |
| `retentionDays` | integer (int32) | The number of days to retain the final backup after the instance deletion. The final backup will be purged at (time_of_instance_deletion + retention_days). |

### `Flag`

- A flag resource.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `allowedIntValues` | array<string> | Use this field if only certain integers are accepted. Can be combined with min_value and max_value to add additional values. |
| `allowedStringValues` | array<string> | For `STRING` flags, a list of strings that the value can be set to. |
| `appliesTo` | array<string> | The database version this flag applies to. Can be MySQL instances: `MYSQL_8_0`, `MYSQL_8_0_18`, `MYSQL_8_0_26`, `MYSQL_5_7`, or `MYSQL_5_6`. PostgreSQL instances: `POSTGRES_9_6`, `POSTGRES_10`, `POSTGRES_11` or `POSTGRES_12`. SQL Server instances: `SQLSERVER_2017_STANDARD`, `SQLSERVER_2017_ENTERPRISE`, `SQLSERVER_2017_EXPRESS`, `SQLSERVER_2017_WEB`, `SQLSERVER_2019_STANDARD`, `SQLSERVER_2019_ENTERPRISE`, `SQLSERVER_2019_EXPRESS`, or `SQLSERVER_2019_WEB`. See the complete list. Values: `SQL_DATABASE_VERSION_UNSPECIFIED`, `MYSQL_5_1`, `MYSQL_5_5`, `MYSQL_5_6`, `MYSQL_5_7`, `MYSQL_8_0`, `MYSQL_8_0_18`, `MYSQL_8_0_26`, `MYSQL_8_0_27`, `MYSQL_8_0_28`, `MYSQL_8_0_29`, `MYSQL_8_0_30`, `MYSQL_8_0_31`, `MYSQL_8_0_32`, `MYSQL_8_0_33`, `MYSQL_8_0_34`, `MYSQL_8_0_35`, `MYSQL_8_0_36`, `MYSQL_8_0_37`, `MYSQL_8_0_39`, `MYSQL_8_0_40`, `MYSQL_8_0_41`, `MYSQL_8_0_42`, `MYSQL_8_0_43`, `MYSQL_8_0_44`, `MYSQL_8_0_45`, `MYSQL_8_0_46`, `MYSQL_8_4`, `MYSQL_9_7`, `SQLSERVER_2017_STANDARD`, `SQLSERVER_2017_ENTERPRISE`, `SQLSERVER_2017_EXPRESS`, `SQLSERVER_2017_WEB`, `POSTGRES_9_6`, `POSTGRES_10`, `POSTGRES_11`, `POSTGRES_12`, `POSTGRES_13`, `POSTGRES_14`, `POSTGRES_15`, `POSTGRES_16`, `POSTGRES_17`, `POSTGRES_18`, `POSTGRES_19`, `POSTGRES_20`, `SQLSERVER_2019_STANDARD`, `SQLSERVER_2019_ENTERPRISE`, `SQLSERVER_2019_EXPRESS`, `SQLSERVER_2019_WEB`, `SQLSERVER_2022_STANDARD`, `SQLSERVER_2022_ENTERPRISE`, `SQLSERVER_2022_EXPRESS`, `SQLSERVER_2022_WEB`, `SQLSERVER_2025_STANDARD`, `SQLSERVER_2025_ENTERPRISE`, `SQLSERVER_2025_EXPRESS`. |
| `flagScope` | string enum | Scope of flag. Values: `SQL_FLAG_SCOPE_UNSPECIFIED`, `SQL_FLAG_SCOPE_DATABASE`, `SQL_FLAG_SCOPE_CONNECTION_POOL`. |
| `inBeta` | boolean | Whether or not the flag is considered in beta. |
| `kind` | string | This is always `sql#flag`. |
| `maxValue` | string (int64) | For `INTEGER` flags, the maximum allowed value. |
| `minValue` | string (int64) | For `INTEGER` flags, the minimum allowed value. |
| `name` | string | This is the name of the flag. Flag names always use underscores, not hyphens, for example: `max_allowed_packet` |
| `recommendedIntValue` | string (int64) | Recommended int value in integer format for UI display. |
| `recommendedStringValue` | string | Recommended string value in string format for UI display. |
| `requiresRestart` | boolean | Indicates whether changing this flag will trigger a database restart. Only applicable to Second Generation instances. |
| `type` | string enum | The type of the flag. Flags are typed to being `BOOLEAN`, `STRING`, `INTEGER` or `NONE`. `NONE` is used for flags that do not take a value, such as `skip_grant_tables`. Values: `SQL_FLAG_TYPE_UNSPECIFIED`, `BOOLEAN`, `STRING`, `INTEGER`, `NONE`, `MYSQL_TIMEZONE_OFFSET`, `FLOAT`, `REPEATED_STRING`. |

### `FlagsListResponse`

- Flags list response.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `items` | array<Flag> | List of flags. |
| `kind` | string | This is always `sql#flagsList`. |

### `GeminiInstanceConfig`

- Gemini instance configuration.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `activeQueryEnabled` | boolean | Output only. Whether the active query is enabled. |
| `entitled` | boolean | Output only. Whether Gemini is enabled. |
| `flagRecommenderEnabled` | boolean | Output only. Whether the flag recommender is enabled. |
| `googleVacuumMgmtEnabled` | boolean | Output only. Whether the vacuum management is enabled. |
| `indexAdvisorEnabled` | boolean | Output only. Whether the index advisor is enabled. |
| `oomSessionCancelEnabled` | boolean | Output only. Whether canceling the out-of-memory (OOM) session is enabled. |

### `GenerateEphemeralCertRequest`

- Ephemeral certificate creation request.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `access_token` | string | Optional. Access token to include in the signed certificate. |
| `public_key` | string | PEM encoded public key to include in the signed certificate. |
| `readTime` | string (google-datetime) | Optional. Optional snapshot read timestamp to trade freshness for performance. |
| `validDuration` | string (google-duration) | Optional. If set, it will contain the cert valid duration. |

### `GenerateEphemeralCertResponse`

- Ephemeral certificate creation request.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `ephemeralCert` | SslCert | Generated cert |

### `ImportContext`

- Database instance import context.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `bakImportOptions` | object | Import parameters specific to SQL Server .BAK files |
| `csvImportOptions` | object | Options for importing data as CSV. |
| `database` | string | The target database for the import. If `fileType` is `SQL`, this field is required only if the import file does not specify a database, and is overridden by any database specification in the import file. For entire instance parallel import operations, the database is overridden by the database name stored in subdirectory name. If `fileType` is `CSV`, one database must be specified. |
| `fileType` | string enum | The file type for the specified uri.\`SQL`: The file contains SQL statements. \`CSV`: The file contains CSV data. Values: `SQL_FILE_TYPE_UNSPECIFIED`, `SQL`, `CSV`, `BAK`, `TDE`. |
| `importUser` | string | The PostgreSQL user for this import operation. PostgreSQL instances only. |
| `kind` | string | This is always `sql#importContext`. |
| `sqlImportOptions` | object | Optional. Options for importing data from SQL statements. |
| `tdeImportOptions` | object | Optional. Import parameters specific to SQL Server TDE certificates |
| `uri` | string | Path to the import file in Cloud Storage, in the form `gs://bucketName/fileName`. Compressed gzip files (.gz) are supported when `fileType` is `SQL`. The instance must have write permissions to the bucket and read access to the file. |

### `InsightsConfig`

- Insights configuration. This specifies when Cloud SQL Insights feature is enabled and optional configuration.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `enhancedQueryInsightsEnabled` | boolean | Optional. Whether enhanced query insights feature is enabled. |
| `queryInsightsEnabled` | boolean | Whether Query Insights feature is enabled. |
| `queryPlansPerMinute` | integer (int32) | Number of query execution plans captured by Insights per minute for all queries combined. Default is 5. |
| `queryStringLength` | integer (int32) | Maximum query length stored in bytes. Default value: 1024 bytes. Range: 256-4500 bytes. Query lengths greater than this field value will be truncated to this value. When unset, query length will be the default value. Changing query length will restart the database. |
| `recordApplicationTags` | boolean | Whether Query Insights will record application tags from query when enabled. |
| `recordClientAddress` | boolean | Whether Query Insights will record client address when enabled. |

### `InstanceReference`

- Reference to another Cloud SQL instance.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `name` | string | The name of the Cloud SQL instance being referenced. This does not include the project ID. |
| `project` | string | The project ID of the Cloud SQL instance being referenced. The default is the same project ID as the instance references it. |
| `region` | string | The region of the Cloud SQL instance being referenced. |

### `InstancesAcquireSsrsLeaseRequest`

- Request to acquire a lease for SSRS.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `acquireSsrsLeaseContext` | AcquireSsrsLeaseContext | Contains details about the acquire SSRS lease operation. |

### `InstancesCloneRequest`

- Database instance clone request.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `cloneContext` | CloneContext | Required. Contains details about the clone operation. |

### `InstancesDemoteMasterRequest`

- Database demote primary instance request.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `demoteMasterContext` | DemoteMasterContext | Contains details about the demoteMaster operation. |

### `InstancesDemoteRequest`

- This request is used to demote an existing standalone instance to be a Cloud SQL read replica for an external database server.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `demoteContext` | DemoteContext | Required. Contains details about the demote operation. |

### `InstancesExportRequest`

- Database instance export request.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `exportContext` | ExportContext | Contains details about the export operation. |

### `InstancesFailoverRequest`

- Instance failover request.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `failoverContext` | FailoverContext | Failover Context. |

### `InstancesImportRequest`

- Database instance import request.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `importContext` | ImportContext | Contains details about the import operation. |

### `InstancesListEntraIdCertificatesResponse`

- Instances ListEntraIdCertificates response.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `activeVersion` | string | The `sha1_fingerprint` of the active certificate from `certs`. |
| `certs` | array<SslCert> | List of Entra ID certificates for the instance. |
| `kind` | string | This is always `sql#instancesListEntraIdCertificates`. |

### `InstancesListResponse`

- Database instances list response.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `items` | array<DatabaseInstance> | List of database instance resources. |
| `kind` | string | This is always `sql#instancesList`. |
| `nextPageToken` | string | The continuation token, used to page through large result sets. Provide this value in a subsequent request to return the next page of results. |
| `warnings` | array<ApiWarning> | List of warnings that occurred while handling the request. |

### `InstancesListServerCasResponse`

- Instances ListServerCas response.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `activeVersion` | string | — |
| `certs` | array<SslCert> | List of server CA certificates for the instance. |
| `kind` | string | This is always `sql#instancesListServerCas`. |

### `InstancesListServerCertificatesResponse`

- Instances ListServerCertificates response.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `activeVersion` | string | The `sha1_fingerprint` of the active certificate from `server_certs`. |
| `caCerts` | array<SslCert> | List of server CA certificates for the instance. |
| `kind` | string | This is always `sql#instancesListServerCertificates`. |
| `serverCerts` | array<SslCert> | List of server certificates for the instance, signed by the corresponding CA from the `ca_certs` list. |

### `InstancesPreCheckMajorVersionUpgradeRequest`

- Request for Pre-checks for MVU
- Version: v1

| Field | Type | Description |
|---|---|---|
| `preCheckMajorVersionUpgradeContext` | PreCheckMajorVersionUpgradeContext | Required. Contains details about the pre-check major version upgrade operation. |

### `InstancesReencryptRequest`

- Database Instance reencrypt request.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `backupReencryptionConfig` | BackupReencryptionConfig | Configuration specific to backup re-encryption |

### `InstancesRestoreBackupRequest`

- Database instance restore backup request.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `backup` | string | The name of the backup that's used to restore a Cloud SQL instance: Format: projects/{project-id}/backups/{backup-uid}. Only one of restore_backup_context, backup, backupdr_backup can be passed to the input. |
| `backupdrBackup` | string | The name of the backup that's used to restore a Cloud SQL instance: Format: "projects/{project-id}/locations/{location}/backupVaults/{backupvault}/dataSources/{datasource}/backups/{backup-uid}". Only one of restore_backup_context, backup, backupdr_backup can be passed to the input. |
| `ignoreMaintenanceVersion` | boolean | Optional. If true, the restore operation proceeds even if the target instance's maintenance version is older than the source instance's maintenance version. |
| `restoreBackupContext` | RestoreBackupContext | Parameters required to perform the restore backup operation. |
| `restoreInstanceClearOverridesFieldNames` | array<string> | Optional. This field has the same purpose as restore_instance_settings, changes any instance settings stored in the backup you are restoring from. With the difference that these fields are cleared in the settings. |
| `restoreInstanceSettings` | DatabaseInstance | Optional. By using this parameter, Cloud SQL overrides any instance settings stored in the backup you are restoring from. You can't change the instance's major database version and you can only increase the disk size. You can use this field to restore new instances only. This field is not applicable for restore to existing instances. |

### `InstancesRotateEntraIdCertificateRequest`

- Rotate Entra ID certificate request.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `rotateEntraIdCertificateContext` | RotateEntraIdCertificateContext | Optional. Contains details about the rotate server certificate operation. |

### `InstancesRotateServerCaRequest`

- Rotate server CA request.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `rotateServerCaContext` | RotateServerCaContext | Contains details about the rotate server CA operation. |

### `InstancesRotateServerCertificateRequest`

- Rotate server certificate request.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `rotateServerCertificateContext` | RotateServerCertificateContext | Optional. Contains details about the rotate server certificate operation. |

### `InstancesTruncateLogRequest`

- Instance truncate log request.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `truncateLogContext` | TruncateLogContext | Contains details about the truncate log operation. |

### `Interval`

- Represents a time interval, encoded as a Timestamp start (inclusive) and a Timestamp end (exclusive). The start must be less than or equal to the end. When the start equals the end, the interval is empty (matches no time). When both start and end are unspecified, the interval matches any time.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `endTime` | string (google-datetime) | Optional. Exclusive end of the interval. If specified, a Timestamp matching this interval will have to be before the end. |
| `startTime` | string (google-datetime) | Optional. Inclusive start of the interval. If specified, a Timestamp matching this interval will have to be the same or after the start. |

### `IpConfiguration`

- IP Management configuration.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `allocatedIpRange` | string | The name of the allocated ip range for the private ip Cloud SQL instance. For example: "google-managed-services-default". If set, the instance ip will be created in the allocated range. The range name must comply with RFC 1035 (https://tools.ietf.org/html/rfc1035). Specifically, the name must be 1-63 characters long and match the regular expression `[a-z]([-a-z0-9]*[a-z0-9])?.` |
| `authorizedNetworks` | array<AclEntry> | The list of external networks that are allowed to connect to the instance using the IP. In 'CIDR' notation, also known as 'slash' notation (for example: `157.197.200.0/24`). |
| `customSubjectAlternativeNames` | array<string> | Optional. Custom Subject Alternative Name(SAN)s for a Cloud SQL instance. |
| `enablePrivatePathForGoogleCloudServices` | boolean | Controls connectivity to private IP instances from Google services, such as BigQuery. |
| `ipv4Enabled` | boolean | Whether the instance is assigned a public IP address or not. |
| `privateNetwork` | string | The resource link for the VPC network from which the Cloud SQL instance is accessible for private IP. For example, `/projects/myProject/global/networks/default`. This setting can be updated, but it cannot be removed after it is set. |
| `pscConfig` | PscConfig | PSC settings for this instance. |
| `requireSsl` | boolean | Use `ssl_mode` instead. Whether SSL/TLS connections over IP are enforced. If set to false, then allow both non-SSL/non-TLS and SSL/TLS connections. For SSL/TLS connections, the client certificate won't be verified. If set to true, then only allow connections encrypted with SSL/TLS and with valid client certificates. If you want to enforce SSL/TLS without enforcing the requirement for valid client certificates, then use the `ssl_mode` flag instead of the `require_ssl` flag. |
| `serverCaMode` | string enum | Specify what type of CA is used for the server certificate. Values: `CA_MODE_UNSPECIFIED`, `GOOGLE_MANAGED_INTERNAL_CA`, `GOOGLE_MANAGED_CAS_CA`, `CUSTOMER_MANAGED_CAS_CA`. |
| `serverCaPool` | string | Optional. The resource name of the server CA pool for an instance with `CUSTOMER_MANAGED_CAS_CA` as the `server_ca_mode`. Format: projects/{PROJECT}/locations/{REGION}/caPools/{CA_POOL_ID} |
| `serverCertificateRotationMode` | string enum | Optional. Controls the automatic server certificate rotation feature. This feature is disabled by default. When enabled, the server certificate will be automatically rotated during Cloud SQL scheduled maintenance or self-service maintenance updates up to six months before it expires. This setting can only be set if server_ca_mode is either GOOGLE_MANAGED_CAS_CA or CUSTOMER_MANAGED_CAS_CA. Values: `SERVER_CERTIFICATE_ROTATION_MODE_UNSPECIFIED`, `NO_AUTOMATIC_ROTATION`, `AUTOMATIC_ROTATION_DURING_MAINTENANCE`. |
| `sslMode` | string enum | Specify how SSL/TLS is enforced in database connections. If you must use the `require_ssl` flag for backward compatibility, then only the following value pairs are valid: For PostgreSQL and MySQL: \* `ssl_mode=ALLOW_UNENCRYPTED_AND_ENCRYPTED` and `require_ssl=false` \* `ssl_mode=ENCRYPTED_ONLY` and `require_ssl=false` \* `ssl_mode=TRUSTED_CLIENT_CERTIFICATE_REQUIRED` and `require_ssl=true` For SQL Server: \* `ssl_mode=ALLOW_UNENCRYPTED_AND_ENCRYPTED` and `require_ssl=false` \* `ssl_mode=ENCRYPTED_ONLY` and `require_ssl=true` The value of `ssl_mode` has priority over the value of `require_ssl`. For example, for the pair `ssl_mode=ENCRYPTED_ONLY` and `require_ssl=false`, `ssl_mode=ENCRYPTED_ONLY` means accept only SSL connections, while `require_ssl=false` means accept both non-SSL and SSL connections. In this case, MySQL and PostgreSQL databases respect `ssl_mode` and accepts only SSL connections. Values: `SSL_MODE_UNSPECIFIED`, `ALLOW_UNENCRYPTED_AND_ENCRYPTED`, `ENCRYPTED_ONLY`, `TRUSTED_CLIENT_CERTIFICATE_REQUIRED`. |

### `IpMapping`

- Database instance IP mapping
- Version: v1

| Field | Type | Description |
|---|---|---|
| `ipAddress` | string | The IP address assigned. |
| `timeToRetire` | string (google-datetime) | The due time for this IP to be retired in RFC 3339 (https://tools.ietf.org/html/rfc3339) format, for example `2012-11-15T16:19:00.094Z`. This field is only available when the IP is scheduled to be retired. |
| `type` | string enum | The type of this IP address. A `PRIMARY` address is a public address that can accept incoming connections. A `PRIVATE` address is a private address that can accept incoming connections. An `OUTGOING` address is the source address of connections originating from the instance, if supported. Values: `SQL_IP_ADDRESS_TYPE_UNSPECIFIED`, `PRIMARY`, `OUTGOING`, `PRIVATE`, `MIGRATED_1ST_GEN`. |

### `ListBackupsResponse`

- The response payload containing a list of the backups.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `backups` | array<Backup> | A list of backups. |
| `nextPageToken` | string | A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, then there aren't subsequent pages. |
| `warnings` | array<ApiWarning> | If a region isn't unavailable or if an unknown error occurs, then a warning message is returned. |

### `ListBlueGreenDeploymentsResponse`

- The response message for listing blue-green deployment resources.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `blueGreenDeployments` | array<BlueGreenDeployment> | The list of blue-green deployment resources. |
| `nextPageToken` | string | A token to retrieve the next page of results, or empty if there are no more results. |

### `LocationPreference`

- Preferred location. This specifies where a Cloud SQL instance is located. Note that if the preferred location is not available, the instance will be located as close as possible within the region. Only one location may be specified.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `followGaeApplication` | string | The App Engine application to follow, it must be in the same region as the Cloud SQL instance. WARNING: Changing this might restart the instance. |
| `kind` | string | This is always `sql#locationPreference`. |
| `secondaryZone` | string | The preferred Compute Engine zone for the secondary/failover (for example: us-central1-a, us-central1-b, etc.). To disable this field, set it to 'no_secondary_zone'. |
| `zone` | string | The preferred Compute Engine zone (for example: us-central1-a, us-central1-b, etc.). WARNING: Changing this might restart the instance. |

### `MaintenanceWindow`

- Maintenance window. This specifies when a Cloud SQL instance is restarted for system maintenance purposes.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `day` | integer (int32) | Day of week - `MONDAY`, `TUESDAY`, `WEDNESDAY`, `THURSDAY`, `FRIDAY`, `SATURDAY`, or `SUNDAY`. Specify in the UTC time zone. Returned in output as an integer, 1 to 7, where `1` equals Monday. |
| `hour` | integer (int32) | Hour of day - 0 to 23. Specify in the UTC time zone. |
| `kind` | string | This is always `sql#maintenanceWindow`. |
| `updateTrack` | string enum | Maintenance timing settings: `canary`, `stable`, or `week5`. For more information, see About maintenance on Cloud SQL instances (https://cloud.google.com/sql/docs/mysql/maintenance). Values: `SQL_UPDATE_TRACK_UNSPECIFIED`, `canary`, `stable`, `week5`. |

### `Message`

- Represents a notice or warning message from the database.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `message` | string | The full message string. For PostgreSQL, this is a formatted string that may include severity, code, and the notice/warning message. For MySQL, this contains the warning message. |
| `severity` | string | The severity of the message (e.g., "NOTICE" for PostgreSQL, "WARNING" for MySQL). |

### `Metadata`

- The additional metadata information regarding the execution of the SQL statements.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `sqlStatementExecutionTime` | string (google-duration) | The time taken to execute the SQL statements. |

### `MySqlReplicaConfiguration`

- Read-replica configuration specific to MySQL databases.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `caCertificate` | string | PEM representation of the trusted CA's x509 certificate. |
| `clientCertificate` | string | PEM representation of the replica's x509 certificate. |
| `clientKey` | string | PEM representation of the replica's private key. The corresponding public key is encoded in the client's certificate. |
| `connectRetryInterval` | integer (int32) | Seconds to wait between connect retries. MySQL's default is 60 seconds. |
| `dumpFilePath` | string | Path to a SQL dump file in Google Cloud Storage from which the replica instance is to be created. The URI is in the form gs://bucketName/fileName. Compressed gzip files (.gz) are also supported. Dumps have the binlog co-ordinates from which replication begins. This can be accomplished by setting --master-data to 1 when using mysqldump. |
| `kind` | string | This is always `sql#mysqlReplicaConfiguration`. |
| `masterHeartbeatPeriod` | string (int64) | Interval in milliseconds between replication heartbeats. |
| `password` | string | The password for the replication connection. |
| `sslCipher` | string | A list of permissible ciphers to use for SSL encryption. |
| `username` | string | The username for the replication connection. |
| `verifyServerCertificate` | boolean | Whether or not to check the primary instance's Common Name value in the certificate that it sends during the SSL handshake. |

### `MySqlSyncConfig`

- MySQL-specific external server sync settings.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `initialSyncFlags` | array<SyncFlags> | Flags to use for the initial dump. |

### `NodeInfo`

- Details about an instance within the deployment.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `connection` | string | Output only. The instance connection name. |
| `dns` | string | Output only. The unique DNS name for this instance. |
| `instance` | string | Output only. The full resource name of the instance. Format: projects/{project}/instances/{instance} |
| `ipMappings` | array<IpMapping> | Output only. The list of IP addresses for this instance. |

### `OnPremisesConfiguration`

- On-premises instance configuration.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `caCertificate` | string | PEM representation of the trusted CA's x509 certificate. |
| `clientCertificate` | string | PEM representation of the replica's x509 certificate. |
| `clientKey` | string | PEM representation of the replica's private key. The corresponding public key is encoded in the client's certificate. |
| `dmsManaged` | boolean | Output only. Indicates whether the resource is managed by Database Migration Service. |
| `dumpFilePath` | string | The dump file to create the Cloud SQL replica. |
| `hostPort` | string | The host and port of the on-premises instance in host:port format |
| `kind` | string | This is always `sql#onPremisesConfiguration`. |
| `password` | string | The password for connecting to on-premises instance. |
| `selectedObjects` | array<SelectedObjects> | Optional. A list of objects that the user selects for replication from an external source instance. |
| `sourceInstance` | InstanceReference | The reference to Cloud SQL instance if the source is Cloud SQL. |
| `sslOption` | string enum | Optional. SSL option for replica connection to the on-premises source. Values: `SSL_OPTION_UNSPECIFIED`, `DISABLE`, `REQUIRE`, `VERIFY_CA`. |
| `username` | string | The username for connecting to on-premises instance. |

### `Operation`

- An Operation resource. For successful operations that return an Operation resource, only the fields relevant to the operation are populated in the resource.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `acquireSsrsLeaseContext` | AcquireSsrsLeaseContext | The context for acquire SSRS lease operation, if applicable. |
| `apiWarning` | ApiWarning | An Admin API warning message. |
| `backupContext` | BackupContext | The context for backup operation, if applicable. |
| `endTime` | string (google-datetime) | The time this operation finished in UTC timezone in RFC 3339 (https://tools.ietf.org/html/rfc3339) format, for example `2012-11-15T16:19:00.094Z`. |
| `error` | OperationErrors | If errors occurred during processing of this operation, this field will be populated. |
| `exportContext` | ExportContext | The context for export operation, if applicable. |
| `importContext` | ImportContext | The context for import operation, if applicable. |
| `insertTime` | string (google-datetime) | The time this operation was enqueued in UTC timezone in RFC 3339 (https://tools.ietf.org/html/rfc3339) format, for example `2012-11-15T16:19:00.094Z`. |
| `kind` | string | This is always `sql#operation`. |
| `name` | string | An identifier that uniquely identifies the operation. You can use this identifier to retrieve the Operations resource that has information about the operation. |
| `operationType` | string enum | The type of the operation. Valid values are: \* `CREATE` \* `DELETE` \* `UPDATE` \* `RESTART` \* `IMPORT` \* `EXPORT` \* `BACKUP_VOLUME` \* `RESTORE_VOLUME` \* `CREATE_USER` \* `DELETE_USER` \* `CREATE_DATABASE` \* `DELETE_DATABASE` Values: `SQL_OPERATION_TYPE_UNSPECIFIED`, `IMPORT`, `EXPORT`, `CREATE`, `UPDATE`, `DELETE`, `RESTART`, `BACKUP`, `SNAPSHOT`, `BACKUP_VOLUME`, `DELETE_VOLUME`, `RESTORE_VOLUME`, `INJECT_USER`, `CLONE`, `STOP_REPLICA`, `START_REPLICA`, `PROMOTE_REPLICA`, `CREATE_REPLICA`, `CREATE_USER`, `DELETE_USER`, `UPDATE_USER`, `CREATE_DATABASE`, `DELETE_DATABASE`, `UPDATE_DATABASE`, `FAILOVER`, `DELETE_BACKUP`, `RECREATE_REPLICA`, `TRUNCATE_LOG`, `DEMOTE_MASTER`, `MAINTENANCE`, `ENABLE_PRIVATE_IP`, `DEFER_MAINTENANCE`, `CREATE_CLONE`, `RESCHEDULE_MAINTENANCE`, `START_EXTERNAL_SYNC`, `LOG_CLEANUP`, `AUTO_RESTART`, `REENCRYPT`, `SWITCHOVER`, `UPDATE_BACKUP`, `ACQUIRE_SSRS_LEASE`, `RELEASE_SSRS_LEASE`, `RECONFIGURE_OLD_PRIMARY`, `CLUSTER_MAINTENANCE`, `SELF_SERVICE_MAINTENANCE`, `SWITCHOVER_TO_REPLICA`, `MAJOR_VERSION_UPGRADE`, `ADVANCED_BACKUP`, `MANAGE_BACKUP`, `ENHANCED_BACKUP`, `REPAIR_READ_POOL`, `CREATE_READ_POOL`, `PRE_CHECK_MAJOR_VERSION_UPGRADE`, `SETUP_MIGRATION`, `CREATE_BLUE_GREEN_DEPLOYMENT`, `SWITCHOVER_BLUE_GREEN_DEPLOYMENT`, `DELETE_BLUE_GREEN_DEPLOYMENT`. |
| `preCheckMajorVersionUpgradeContext` | PreCheckMajorVersionUpgradeContext | This field is only populated when the operation_type is PRE_CHECK_MAJOR_VERSION_UPGRADE. The PreCheckMajorVersionUpgradeContext message itself contains the details for that pre-check, such as the target database version for the upgrade and the results of the check (including any warnings or errors found). |
| `selfLink` | string | The URI of this resource. |
| `startTime` | string (google-datetime) | The time this operation actually started in UTC timezone in RFC 3339 (https://tools.ietf.org/html/rfc3339) format, for example `2012-11-15T16:19:00.094Z`. |
| `startWorkloadCaptureContext` | StartWorkloadCaptureContext | The context for the `StartWorkloadCapture` operation, which contains details to start recording the workload (SQL queries) on a Cloud SQL instance. |
| `startWorkloadReplayContext` | StartWorkloadReplayContext | The context for the `StartWorkloadReplay` operation, which contains details about starting the execution of a captured workload (recorded read and write SQL queries) on a replay instance (the Cloud SQL instance where the recorded SQL queries are executed). |
| `status` | string enum | The status of an operation. Values: `SQL_OPERATION_STATUS_UNSPECIFIED`, `PENDING`, `RUNNING`, `DONE`. |
| `stopWorkloadCaptureContext` | StopWorkloadCaptureContext | The context for the `StopWorkloadCapture` operation, which contains details to stop recording the workload (SQL queries) on a Cloud SQL instance. |
| `stopWorkloadReplayContext` | StopWorkloadReplayContext | The context for the `StopWorkloadReplay` operation, which contains details about stopping the execution of a captured workload (recorded read and write SQL queries) on a replay instance. |
| `subOperationType` | SqlSubOperationType | Optional. The sub operation based on the operation type. |
| `targetId` | string | Name of the resource on which this operation runs. |
| `targetLink` | string | — |
| `targetProject` | string | The project ID of the target instance related to this operation. |
| `user` | string | The email address of the user who initiated this operation. |

### `OperationError`

- Database instance operation error.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `code` | string | Identifies the specific error that occurred. |
| `kind` | string | This is always `sql#operationError`. |
| `message` | string | Additional information about the error encountered. |

### `OperationErrors`

- Database instance operation errors list wrapper.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `errors` | array<OperationError> | The list of errors encountered while processing this operation. |
| `kind` | string | This is always `sql#operationErrors`. |

### `OperationMetadata`

- Represents the metadata of the long-running operation.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `apiVersion` | string | Output only. API version used to start the operation. |
| `cancelRequested` | boolean | Output only. Identifies whether the user has requested cancellation of the operation. Operations that have been cancelled successfully have google.longrunning.Operation.error value with a google.rpc.Status.code of `1`, corresponding to `Code.CANCELLED`. |
| `createTime` | string (google-datetime) | Output only. The time the operation was created. |
| `endTime` | string (google-datetime) | Output only. The time the operation finished running. |
| `statusDetail` | string | Output only. Human-readable status of the operation, if any. |
| `target` | string | Output only. Server-defined resource path for the target of the operation. |
| `verb` | string | Output only. Name of the verb executed by the operation. |

### `OperationsListResponse`

- Operations list response.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `items` | array<Operation> | List of operation resources. |
| `kind` | string | This is always `sql#operationsList`. |
| `nextPageToken` | string | The continuation token, used to page through large result sets. Provide this value in a subsequent request to return the next page of results. |

### `PasswordStatus`

- Read-only password status.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `locked` | boolean | If true, user does not have login privileges. |
| `passwordExpirationTime` | string (google-datetime) | The expiration time of the current password. |

### `PasswordValidationPolicy`

- Database instance local user password validation policy. This message defines the password policy for local database users. When enabled, it enforces constraints on password complexity, length, and reuse. Keep this policy enabled to help prevent unauthorized access.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `complexity` | string enum | The complexity of the password. Values: `COMPLEXITY_UNSPECIFIED`, `COMPLEXITY_DEFAULT`. |
| `disallowCompromisedCredentials` | boolean | This field is deprecated and will be removed in a future version of the API. |
| `disallowUsernameSubstring` | boolean | Disallow username as a part of the password. |
| `enablePasswordPolicy` | boolean | Whether to enable the password policy or not. When enabled, passwords must meet complexity requirements. Keep this policy enabled to help prevent unauthorized access. Disabling this policy allows weak passwords. |
| `minLength` | integer (int32) | Minimum number of characters allowed. |
| `passwordChangeInterval` | string (google-duration) | Minimum interval after which the password can be changed. This flag is only supported for PostgreSQL. |
| `reuseInterval` | integer (int32) | Number of previous passwords that cannot be reused. |

### `PerformDiskShrinkContext`

- Perform disk shrink context.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `targetSizeGb` | string (int64) | The target disk shrink size in GigaBytes. |

### `PerformanceCaptureConfig`

- Performance capture configuration.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `cpuUtilizationThresholdPercent` | integer (int32) | Optional. Specifies the minimum percentage of CPU utilization to trigger the performance capture. Valid integers range from `10` to `99`. Enter `0` to disable the check. |
| `enabled` | boolean | Optional. Enables or disables the performance capture feature. |
| `historyListLengthThresholdCount` | integer (int32) | Optional. Specifies the minimum number of undo log entries in the history list length to trigger the performance capture. Valid integers range from `10000` to `10000000`. Enter `0` to disable the check. |
| `memoryUsageThresholdPercent` | integer (int32) | Optional. Specifies the minimum percentage of memory usage to trigger the performance capture. Valid integers range from `10` to `99`. Enter `0` to disable the check. |
| `probeThreshold` | integer (int32) | Optional. Specifies the minimum number of consecutive probe threshold that triggers performance capture. |
| `probingIntervalSeconds` | integer (int32) | Optional. Specifies the interval in seconds between consecutive probes that check if any trigger condition thresholds have been reached. |
| `runningThreadsThreshold` | integer (int32) | Optional. Specifies the minimum number of MySQL `Threads_running` to trigger the performance capture on the primary instance. |
| `secondsBehindSourceThreshold` | integer (int32) | Optional. Specifies the minimum number of seconds replica must be lagging behind primary instance to trigger the performance capture on replica. |
| `semaphoreWaitThresholdCount` | integer (int32) | Optional. Specifies the minimum allowed number of semaphore waits to trigger the performance capture. Valid integers range from `10` to `10000`. Enter `0` to disable the check. |
| `transactionDurationThreshold` | integer (int32) | Optional. Specifies the amount of time in seconds that a transaction needs to have been open before the watcher starts recording it. |
| `transactionKillExcludedUserHosts` | array<string> | Optional. Specifies a customer-defined list of users to exclude from transaction termination. Entries can be in the format 'user@host' or just 'user'. A standalone 'user' implies 'user@%', excluding the user from any host. Wildcard '%' is allowed in the host part of the 'user@host' format. Example: `["app_user", "db_admin@10.1.2.3", "report_user@%"]` |
| `transactionKillThresholdSeconds` | integer (int32) | Optional. Specifies the amount of time in seconds that a transaction needs to have been open before the watcher starts terminating it. Valid integers range from `60` to `604800` (7 days). Enter `0` to disable. If enabled (i.e., > 0), this value must be greater than or equal to `transaction_duration_threshold`. Configurations where `0 < transaction_kill_threshold_seconds < transaction_duration_threshold` will be rejected. |
| `transactionKillType` | string enum | Optional. Determines which transactions are allowed to be terminated when they exceed `transaction_kill_threshold_seconds`. This allows protecting write-heavy transactions from auto-termination if desired. Defaults to `READ_ONLY_TRANSACTIONS` if unspecified. Values: `TRANSACTION_KILL_TYPE_UNSPECIFIED`, `READ_ONLY_TRANSACTIONS`, `ALL_TRANSACTIONS`. |
| `transactionLockWaitThresholdCount` | integer (int32) | Optional. Specifies the minimum allowed number of transactions in lock wait state to trigger the performance capture. Valid integers range from `10` to `10000`. Enter `0` to disable the check. |

### `PointInTimeRestoreContext`

- The context to perform a point-in-time recovery of an instance managed by Backup and Disaster Recovery (DR) Service.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `allocatedIpRange` | string | Optional. The name of the allocated IP range for the internal IP Cloud SQL instance. For example: "google-managed-services-default". If you set this, then Cloud SQL creates the IP address for the cloned instance in the allocated range. This range must comply with RFC 1035 (https://tools.ietf.org/html/rfc1035) standards. Specifically, the name must be 1-63 characters long and match the regular expression \[a-z\](\[-a-z0-9\]\*\[a-z0-9\])?. Reserved for future use. |
| `datasource` | string | The Backup and Disaster Recovery (DR) Service Datasource URI. Format: projects/{project}/locations/{region}/backupVaults/{backupvault}/dataSources/{datasource}. |
| `pointInTime` | string (google-datetime) | Required. The date and time to which you want to restore the instance. |
| `preferredSecondaryZone` | string | Optional. Point-in-time recovery of a regional instance in the specified zones. If not specified, clone to the same secondary zone as the source instance. This value cannot be the same as the preferred_zone field. |
| `preferredZone` | string | Optional. Point-in-time recovery of an instance to the specified zone. If no zone is specified, then clone to the same primary zone as the source instance. |
| `privateNetwork` | string | Optional. The resource link for the VPC network from which the Cloud SQL instance is accessible for private IP. For example, `/projects/myProject/global/networks/default`. |
| `region` | string | Optional. The region of the target instance where the datasource will be restored. For example: "us-central1". |
| `targetInstance` | string | Target instance name. |
| `targetInstanceClearSettingsFieldNames` | array<string> | Optional. Specifies the instance settings that will be cleared from the source instance. This field is only applicable for cross project PITRs. |
| `targetInstanceSettings` | DatabaseInstance | Optional. Specifies the instance settings that will be overridden from the source instance. This field is only applicable for cross project PITRs. |

### `PoolNodeConfig`

- Details of a single read pool node of a read pool.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `dnsName` | string | Output only. The DNS name of the read pool node. |
| `dnsNames` | array<DnsNameMapping> | Output only. The list of DNS names used by this read pool node. |
| `gceZone` | string | Output only. The zone of the read pool node. |
| `ipAddresses` | array<IpMapping> | Output only. Mappings containing IP addresses that can be used to connect to the read pool node. |
| `name` | string | Output only. The name of the read pool node, to be used for retrieving metrics and logs. |
| `pscAutoConnections` | array<PscAutoConnectionConfig> | Output only. The list of settings for requested automatically-setup Private Service Connect (PSC) consumer endpoints that can be used to connect to this read pool node. |
| `pscServiceAttachmentLink` | string | Output only. The Private Service Connect (PSC) service attachment of the read pool node. |
| `state` | string enum | Output only. The current state of the read pool node. Values: `SQL_INSTANCE_STATE_UNSPECIFIED`, `RUNNABLE`, `SUSPENDED`, `PENDING_DELETE`, `PENDING_CREATE`, `MAINTENANCE`, `FAILED`, `ONLINE_MAINTENANCE`, `REPAIRING`. |

### `PreCheckMajorVersionUpgradeContext`

- Pre-check major version upgrade context.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `kind` | string | Optional. This is always `sql#preCheckMajorVersionUpgradeContext`. |
| `maxRuntime` | string (google-duration) | Optional. The maximum allowed runtime for the precheck operation. |
| `preCheckResponse` | array<PreCheckResponse> | Output only. The responses from the precheck operation. |
| `targetDatabaseVersion` | string enum | Required. The target database version to upgrade to. Values: `SQL_DATABASE_VERSION_UNSPECIFIED`, `MYSQL_5_1`, `MYSQL_5_5`, `MYSQL_5_6`, `MYSQL_5_7`, `MYSQL_8_0`, `MYSQL_8_0_18`, `MYSQL_8_0_26`, `MYSQL_8_0_27`, `MYSQL_8_0_28`, `MYSQL_8_0_29`, `MYSQL_8_0_30`, `MYSQL_8_0_31`, `MYSQL_8_0_32`, `MYSQL_8_0_33`, `MYSQL_8_0_34`, `MYSQL_8_0_35`, `MYSQL_8_0_36`, `MYSQL_8_0_37`, `MYSQL_8_0_39`, `MYSQL_8_0_40`, `MYSQL_8_0_41`, `MYSQL_8_0_42`, `MYSQL_8_0_43`, `MYSQL_8_0_44`, `MYSQL_8_0_45`, `MYSQL_8_0_46`, `MYSQL_8_4`, `MYSQL_9_7`, `SQLSERVER_2017_STANDARD`, `SQLSERVER_2017_ENTERPRISE`, `SQLSERVER_2017_EXPRESS`, `SQLSERVER_2017_WEB`, `POSTGRES_9_6`, `POSTGRES_10`, `POSTGRES_11`, `POSTGRES_12`, `POSTGRES_13`, `POSTGRES_14`, `POSTGRES_15`, `POSTGRES_16`, `POSTGRES_17`, `POSTGRES_18`, `POSTGRES_19`, `POSTGRES_20`, `SQLSERVER_2019_STANDARD`, `SQLSERVER_2019_ENTERPRISE`, `SQLSERVER_2019_EXPRESS`, `SQLSERVER_2019_WEB`, `SQLSERVER_2022_STANDARD`, `SQLSERVER_2022_ENTERPRISE`, `SQLSERVER_2022_EXPRESS`, `SQLSERVER_2022_WEB`, `SQLSERVER_2025_STANDARD`, `SQLSERVER_2025_ENTERPRISE`, `SQLSERVER_2025_EXPRESS`. |

### `PreCheckResponse`

- Structured PreCheckResponse containing message, type, and required actions.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `actionsRequired` | array<string> | The actions that the user needs to take. Use repeated for multiple actions. |
| `message` | string | The message to be displayed to the user. |
| `messageType` | string enum | The type of message whether it is an info, warning, or error. Values: `MESSAGE_TYPE_UNSPECIFIED`, `INFO`, `WARNING`, `ERROR`. |

### `PscAutoConnectionConfig`

- Settings for an automatically-setup Private Service Connect consumer endpoint that is used to connect to a Cloud SQL instance.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `consumerNetwork` | string | Optional. The consumer network of this consumer endpoint. This must be a resource path that includes both the host project and the network name. For example, `projects/project1/global/networks/network1`. The consumer host project of this network might be different from the consumer service project. |
| `consumerNetworkStatus` | string | The connection policy status of the consumer network. |
| `consumerProject` | string | Optional. This is the project ID of consumer service project of this consumer endpoint. This is only applicable if `consumer_network` is a shared VPC network. |
| `instanceAutoDnsStatus` | string enum | Output only. The status of automated DNS provisioning. Values: `AUTO_DNS_STATUS_UNSPECIFIED`, `AUTO_DNS_OK`, `AUTO_DNS_FAILED`, `AUTO_DNS_UNKNOWN`. |
| `ipAddress` | string | The IP address of the consumer endpoint. |
| `serviceConnectionPolicy` | string | Output only. The service connection policy created automatically for the consumer network when `psc_auto_connection_policy_enabled` is true. It is in the format of: `projects/{project}/regions/{region}/serviceConnectionPolicies/{policy_id}` The `policy_id` is in format of `$NETWORK-$RANDOM`. |
| `serviceConnectionPolicyCreationResult` | string | Output only. The status of service connection policy creation. |
| `status` | string | The connection status of the consumer endpoint. |
| `writeEndpointAutoDnsStatus` | string enum | Output only. The status of automated DNS provisioning for the write endpoint. Values: `AUTO_DNS_STATUS_UNSPECIFIED`, `AUTO_DNS_OK`, `AUTO_DNS_FAILED`, `AUTO_DNS_UNKNOWN`. |

### `PscConfig`

- PSC settings for a Cloud SQL instance.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `allowedConsumerProjects` | array<string> | Optional. The list of consumer projects that are allow-listed for PSC connections to this instance. This instance can be connected to with PSC from any network in these projects. Each consumer project in this list may be represented by a project number (numeric) or by a project id (alphanumeric). |
| `networkAttachmentUri` | string | Optional. The network attachment of the consumer network that the Private Service Connect enabled Cloud SQL instance is authorized to connect using the PSC interface. format: projects/PROJECT/regions/REGION/networkAttachments/ID |
| `pscAutoConnectionPolicyEnabled` | boolean | Optional. Whether to set up the PSC service connection policy automatically. |
| `pscAutoConnections` | array<PscAutoConnectionConfig> | Optional. The list of settings for requested Private Service Connect consumer endpoints that can be used to connect to this Cloud SQL instance. |
| `pscAutoDnsEnabled` | boolean | Optional. Indicates whether Private Service Connect DNS automation is enabled for this instance. When enabled, Cloud SQL provisions a universal DNS record across all networks configured with Private Service Connect auto-connections. This will default to true for new instances when Private Service Connect is enabled. |
| `pscEnabled` | boolean | Whether PSC connectivity is enabled for this instance. |
| `pscWriteEndpointDnsEnabled` | boolean | Optional. Indicates whether Private Service Connect write endpoint DNS automation is enabled for this instance. When enabled, Cloud SQL provisions a universal global DNS record across all networks configured with Private Service Connect auto-connections that points to the cluster primary instance. This feature is only supported for Enterprise Plus edition. This will default to true for new Enterprise Plus instances when `psc_auto_dns_enabled` is enabled. |

### `QueryResult`

- QueryResult contains the result of executing a single SQL statement.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `columns` | array<Column> | List of columns included in the result. This also includes the data type of the column. |
| `message` | string | Message related to the SQL execution result. |
| `partialResult` | boolean | Set to true if the SQL execution's result is truncated due to size limits or an error retrieving results. |
| `rows` | array<Row> | Rows returned by the SQL statement. |
| `status` | Status | If results were truncated due to an error, details of that error. |

### `ReadPoolAutoScaleConfig`

- The read pool auto-scale configuration.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `disableScaleIn` | boolean | Indicates whether read pool auto scaling supports scale in operations (removing nodes). |
| `enabled` | boolean | Indicates whether read pool auto scaling is enabled. |
| `maxNodeCount` | integer (int32) | Maximum number of read pool nodes to be maintained. |
| `minNodeCount` | integer (int32) | Minimum number of read pool nodes to be maintained. |
| `scaleInCooldownSeconds` | integer (int32) | The cooldown period for scale-in operations. |
| `scaleOutCooldownSeconds` | integer (int32) | The cooldown period for scale-out operations. |
| `targetMetrics` | array<TargetMetric> | Optional. Target metrics for read pool auto scaling. |

### `ReplicaConfiguration`

- Read-replica configuration for connecting to the primary instance.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `cascadableReplica` | boolean | Optional. Specifies if a SQL Server replica is a cascadable replica. A cascadable replica is a SQL Server cross region replica that supports replica(s) under it. |
| `failoverTarget` | boolean | Specifies if the replica is the failover target. If the field is set to `true`, the replica will be designated as a failover replica. In case the primary instance fails, the replica instance will be promoted as the new primary instance. Only one replica can be specified as failover target, and the replica has to be in different zone with the primary instance. |
| `kind` | string | This is always `sql#replicaConfiguration`. |
| `mysqlReplicaConfiguration` | MySqlReplicaConfiguration | MySQL specific configuration when replicating from a MySQL on-premises primary instance. Replication configuration information such as the username, password, certificates, and keys are not stored in the instance metadata. The configuration information is used only to set up the replication connection and is stored by MySQL in a file named `master.info` in the data directory. |

### `ReplicationCluster`

- A primary instance and disaster recovery (DR) replica pair. A DR replica is a cross-region replica that you designate for failover in the event that the primary instance experiences regional failure. Applicable to MySQL and PostgreSQL.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `drReplica` | boolean | Output only. Read-only field that indicates whether the replica is a DR replica. This field is not set if the instance is a primary instance. |
| `failoverDrReplicaName` | string | Optional. If the instance is a primary instance, then this field identifies the disaster recovery (DR) replica. A DR replica is an optional configuration for Enterprise Plus edition instances. If the instance is a read replica, then the field is not set. Set this field to a replica name to designate a DR replica for a primary instance. Remove the replica name to remove the DR replica designation. |
| `psaWriteEndpoint` | string | Output only. If set, this field indicates this instance has a private service access (PSA) DNS endpoint that is pointing to the primary instance of the cluster. If this instance is the primary, then the DNS endpoint points to this instance. After a switchover or replica failover operation, this DNS endpoint points to the promoted instance. This is a read-only field, returned to the user as information. This field can exist even if a standalone instance doesn't have a DR replica yet or the DR replica is deleted. |

### `RequestedConfig`

- Configuration specified by the user at creation time for the target (green) instance.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `databaseVersion` | string | Optional. The target database major version for the upgrade. For example, `MYSQL_8_0` or `POSTGRES_15`. |

### `Reschedule`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `rescheduleType` | string enum | Required. The type of the reschedule. Values: `RESCHEDULE_TYPE_UNSPECIFIED`, `IMMEDIATE`, `NEXT_AVAILABLE_WINDOW`, `SPECIFIC_TIME`. |
| `scheduleTime` | string (google-datetime) | Optional. Timestamp when the maintenance shall be rescheduled to if reschedule_type=SPECIFIC_TIME, in RFC 3339 (https://tools.ietf.org/html/rfc3339) format, for example `2012-11-15T16:19:00.094Z`. |

### `RestoreBackupContext`

- Database instance restore from backup context. Backup context contains source instance id and project id.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `backupRunId` | string (int64) | The ID of the backup run to restore from. |
| `instanceId` | string | The ID of the instance that the backup was taken from. |
| `kind` | string | This is always `sql#restoreBackupContext`. |
| `project` | string | The full project ID of the source instance. |

### `RotateEntraIdCertificateContext`

- Instance rotate Entra ID certificate context.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `kind` | string | Optional. This is always `sql#rotateEntraIdCertificateContext`. |
| `nextVersion` | string | Optional. The fingerprint of the next version to be rotated to. If left unspecified, will be rotated to the most recently added server certificate version. |

### `RotateServerCaContext`

- Instance rotate server CA context.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `kind` | string | This is always `sql#rotateServerCaContext`. |
| `nextVersion` | string | The fingerprint of the next version to be rotated to. If left unspecified, will be rotated to the most recently added server CA version. |

### `RotateServerCertificateContext`

- Instance rotate server certificate context.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `kind` | string | Optional. This is always `sql#rotateServerCertificateContext`. |
| `nextVersion` | string | The fingerprint of the next version to be rotated to. If left unspecified, will be rotated to the most recently added server certificate version. |

### `Row`

- Contains the values for a row.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `values` | array<Value> | The values for the row. |

### `SelectedObjects`

- A list of objects that the user selects for replication from an external source instance.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `database` | string | Required. The name of the database to migrate. |

### `Settings`

- Database instance settings.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `acceleratedReplicaMode` | boolean | Optional. Whether the replica is in accelerated mode. This feature is in private preview and requires allowlisting to take effect. |
| `activationPolicy` | string enum | The activation policy specifies when the instance is activated; it is applicable only when the instance state is RUNNABLE. Valid values: \* `ALWAYS`: The instance is on, and remains so even in the absence of connection requests. \* `NEVER`: The instance is off; it is not activated, even if a connection request arrives. Values: `SQL_ACTIVATION_POLICY_UNSPECIFIED`, `ALWAYS`, `NEVER`, `ON_DEMAND`. |
| `activeDirectoryConfig` | SqlActiveDirectoryConfig | Active Directory configuration, relevant only for Cloud SQL for SQL Server. |
| `advancedMachineFeatures` | AdvancedMachineFeatures | Specifies advanced machine configuration for the instances relevant only for SQL Server. |
| `authorizedGaeApplications` | array<string> | The App Engine app IDs that can access this instance. (Deprecated) Applied to First Generation instances only. |
| `autoUpgradeEnabled` | boolean | Optional. Cloud SQL for MySQL auto-upgrade configuration. When this parameter is set to true, auto-upgrade is enabled for MySQL 8.0 minor versions. The MySQL version must be 8.0.35 or higher. |
| `availabilityType` | string enum | Availability type. Potential values: \* `ZONAL`: The instance serves data from only one zone. Outages in that zone affect data accessibility. \* `REGIONAL`: The instance can serve data from more than one zone in a region (it is highly available)./ For more information, see Overview of the High Availability Configuration (https://cloud.google.com/sql/docs/mysql/high-availability). Values: `SQL_AVAILABILITY_TYPE_UNSPECIFIED`, `ZONAL`, `REGIONAL`. |
| `backupConfiguration` | BackupConfiguration | The daily backup configuration for the instance. |
| `collation` | string | The name of server Instance collation. |
| `connectionPoolConfig` | ConnectionPoolConfig | Optional. The managed connection pooling configuration for the instance. |
| `connectorEnforcement` | string enum | Specifies if connections must use Cloud SQL connectors. Option values include the following: `NOT_REQUIRED` (Cloud SQL instances can be connected without Cloud SQL Connectors) and `REQUIRED` (Only allow connections that use Cloud SQL Connectors). Note that using REQUIRED disables all existing authorized networks. If this field is not specified when creating a new instance, NOT_REQUIRED is used. If this field is not specified when patching or updating an existing instance, it is left unchanged in the instance. Values: `CONNECTOR_ENFORCEMENT_UNSPECIFIED`, `NOT_REQUIRED`, `REQUIRED`. |
| `crashSafeReplicationEnabled` | boolean | Configuration specific to read replica instances. Indicates whether database flags for crash-safe replication are enabled. This property was only applicable to First Generation instances. |
| `dataApiAccess` | string enum | This parameter controls whether to allow using ExecuteSql API to connect to the instance. Not allowed by default. Values: `DATA_API_ACCESS_UNSPECIFIED`, `DISALLOW_DATA_API`, `ALLOW_DATA_API`. |
| `dataCacheConfig` | DataCacheConfig | Configuration for data cache. |
| `dataDiskProvisionedIops` | string (int64) | Optional. Provisioned number of I/O operations per second for the data disk. This field is only used for hyperdisk-balanced disk types. |
| `dataDiskProvisionedThroughput` | string (int64) | Optional. Provisioned throughput measured in MiB per second for the data disk. This field is only used for hyperdisk-balanced disk types. |
| `dataDiskSizeGb` | string (int64) | The size of data disk, in GB. The data disk size minimum is 10GB. |
| `dataDiskType` | string enum | The type of data disk: `PD_SSD` (default) or `PD_HDD`. Not used for First Generation instances. Values: `SQL_DATA_DISK_TYPE_UNSPECIFIED`, `PD_SSD`, `PD_HDD`, `OBSOLETE_LOCAL_SSD`, `HYPERDISK_BALANCED`. |
| `databaseFlags` | array<DatabaseFlags> | The database flags passed to the instance at startup. |
| `databaseReplicationEnabled` | boolean | Configuration specific to read replica instances. Indicates whether replication is enabled or not. WARNING: Changing this restarts the instance. |
| `deletionProtectionEnabled` | boolean | Configuration to protect against accidental instance deletion. |
| `denyMaintenancePeriods` | array<DenyMaintenancePeriod> | Deny maintenance periods |
| `edition` | string enum | Optional. The edition type of the Cloud SQL instance. Values: `EDITION_UNSPECIFIED`, `ENTERPRISE`, `ENTERPRISE_PLUS`, `DEVELOPER`. |
| `enableDataplexIntegration` | boolean | Optional. By default, Cloud SQL instances have schema extraction disabled for Dataplex. When this parameter is set to true, schema extraction for Dataplex on Cloud SQL instances is activated. |
| `enableGoogleMlIntegration` | boolean | Optional. When this parameter is set to true, Cloud SQL instances can connect to Vertex AI to pass requests for real-time predictions and insights to the AI. The default value is false. This applies only to Cloud SQL for MySQL and Cloud SQL for PostgreSQL instances. |
| `entraidConfig` | SqlServerEntraIdConfig | Optional. The Microsoft Entra ID configuration for the SQL Server instance. |
| `finalBackupConfig` | FinalBackupConfig | Optional. The final backup configuration for the instance. |
| `insightsConfig` | InsightsConfig | Insights configuration, for now relevant only for Postgres. |
| `ipConfiguration` | IpConfiguration | The settings for IP Management. This allows to enable or disable the instance IP and manage which external networks can connect to the instance. The IPv4 address cannot be disabled for Second Generation instances. |
| `kind` | string | This is always `sql#settings`. |
| `locationPreference` | LocationPreference | The location preference settings. This allows the instance to be located as near as possible to either an App Engine app or Compute Engine zone for better performance. App Engine co-location was only applicable to First Generation instances. |
| `maintenanceWindow` | MaintenanceWindow | The maintenance window for this instance. This specifies when the instance can be restarted for maintenance purposes. |
| `passwordValidationPolicy` | PasswordValidationPolicy | The local user password validation policy of the instance for PostgreSQL and MySQL. |
| `performanceCaptureConfig` | PerformanceCaptureConfig | Optional. Configuration for Performance Capture, provides diagnostic metrics during high load situations. |
| `pricingPlan` | string enum | The pricing plan for this instance. This can be either `PER_USE` or `PACKAGE`. Only `PER_USE` is supported for Second Generation instances. Values: `SQL_PRICING_PLAN_UNSPECIFIED`, `PACKAGE`, `PER_USE`. |
| `readPoolAutoScaleConfig` | ReadPoolAutoScaleConfig | Optional. The read pool auto-scale configuration for the instance. |
| `replicationLagMaxSeconds` | integer (int32) | Optional. Configuration value for recreation of replica after certain replication lag |
| `replicationType` | string enum | The type of replication this instance uses. This can be either `ASYNCHRONOUS` or `SYNCHRONOUS`. (Deprecated) This property was only applicable to First Generation instances. Values: `SQL_REPLICATION_TYPE_UNSPECIFIED`, `SYNCHRONOUS`, `ASYNCHRONOUS`. |
| `retainBackupsOnDelete` | boolean | Optional. When this parameter is set to true, Cloud SQL retains backups of the instance even after the instance is deleted. The ON_DEMAND backup will be retained until customer deletes the backup or the project. The AUTOMATED backup will be retained based on the backups retention setting. |
| `settingsVersion` | string (int64) | The version of instance settings. This is a required field for update method to make sure concurrent updates are handled properly. During update, use the most recent settingsVersion value for this instance and do not try to update this value. |
| `sqlServerAuditConfig` | SqlServerAuditConfig | SQL Server specific audit configuration. |
| `storageAutoResize` | boolean | Configuration to increase storage size automatically. The default value is true. |
| `storageAutoResizeLimit` | string (int64) | The maximum size to which storage capacity can be automatically increased. The default value is 0, which specifies that there is no limit. |
| `tier` | string | The tier (or machine type) for this instance, for example `db-custom-1-3840`. WARNING: Changing this restarts the instance. |
| `timeZone` | string | Server timezone, relevant only for Cloud SQL for SQL Server. |
| `userLabels` | object | User-provided labels, represented as a dictionary where each label is a single key value pair. |

### `SourceRole`

- The source instance for the Blue-Green deployment.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `targetId` | InstanceReference | Output only. The target instance paired with this source instance in a blue-green deployment. |

### `SourceTargetPairedNode`

- Represents a pairing of a source instance node and a target instance node.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `diffs` | array<ConfigDiff> | Output only. Describes the list of differences for the `SourceTargetPairedNode`. |
| `source` | NodeInfo | Output only. Specifies the resource name of the source instance in this pair. |
| `state` | string enum | Output only. Specifies the current state of this specific source-target pair. Values: `STATE_UNSPECIFIED`, `PROVISIONING`, `PROVISIONED`, `UPGRADING`, `UPGRADED`, `UPGRADE_FAILED`, `SWITCHOVER_IN_PROGRESS`, `SWITCHOVER_FAILED`, `SWITCHOVER_SUCCEEDED`, `DELETING`. |
| `target` | NodeInfo | Output only. Specifies details of the corresponding target instance in this pair. |

### `SourceTargetPairedNode` (v1beta4)

- Represents a pairing of a source instance node and a target instance node.
- Version: v1beta4

| Field | Type | Description |
|---|---|---|
| `currentlyServingTraffic` | string enum | Output only. Deprecated: Indicates which instance (SOURCE or TARGET) in the pair is currently live. Used for internal implementation and deprecated for external use. Values: `CURRENTLY_SERVING_TRAFFIC_UNSPECIFIED`, `SOURCE`, `TARGET`. |
| `diffs` | array<ConfigDiff> | Output only. Describes the list of differences for this pair. |
| `source` | NodeInfo | Output only. Resource name of the source instance in this pair. |
| `state` | string enum | Output only. The current state of this specific source-target pair. Values: `STATE_UNSPECIFIED`, `PROVISIONING`, `PROVISIONED`, `UPGRADING`, `UPGRADED`, `UPGRADE_FAILED`, `SWITCHOVER_IN_PROGRESS`, `SWITCHOVER_FAILED`, `SWITCHOVER_SUCCEEDED`, `DELETING`. |
| `target` | NodeInfo | Output only. Details of the corresponding target instance in this pair. |
| `tasks` | array<DeploymentTask> | Output only. Tasks performed or being performed on the target instance of this pair. |

### `SqlActiveDirectoryConfig`

- Active Directory configuration, relevant only for Cloud SQL for SQL Server.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `adminCredentialSecretName` | string | Optional. The secret manager key storing the administrator credential. (e.g., projects/{project}/secrets/{secret}). |
| `dnsServers` | array<string> | Optional. Domain controller IPv4 addresses used to bootstrap Active Directory. |
| `domain` | string | The name of the domain (e.g., mydomain.com). |
| `kind` | string | This is always sql#activeDirectoryConfig. |
| `mode` | string enum | Optional. The mode of the Active Directory configuration. Values: `ACTIVE_DIRECTORY_MODE_UNSPECIFIED`, `MANAGED_ACTIVE_DIRECTORY`, `SELF_MANAGED_ACTIVE_DIRECTORY`, `CUSTOMER_MANAGED_ACTIVE_DIRECTORY`. |
| `organizationalUnit` | string | Optional. The organizational unit distinguished name. This is the full hierarchical path to the organizational unit. |

### `SqlExternalSyncSettingError`

- External primary instance migration setting error/warning.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `detail` | string | Additional information about the error encountered. |
| `kind` | string | Can be `sql#externalSyncSettingError` or `sql#externalSyncSettingWarning`. |
| `type` | string enum | Identifies the specific error that occurred. Values: `SQL_EXTERNAL_SYNC_SETTING_ERROR_TYPE_UNSPECIFIED`, `CONNECTION_FAILURE`, `BINLOG_NOT_ENABLED`, `INCOMPATIBLE_DATABASE_VERSION`, `REPLICA_ALREADY_SETUP`, `INSUFFICIENT_PRIVILEGE`, `UNSUPPORTED_MIGRATION_TYPE`, `NO_PGLOGICAL_INSTALLED`, `PGLOGICAL_NODE_ALREADY_EXISTS`, `INVALID_WAL_LEVEL`, `INVALID_SHARED_PRELOAD_LIBRARY`, `INSUFFICIENT_MAX_REPLICATION_SLOTS`, `INSUFFICIENT_MAX_WAL_SENDERS`, `INSUFFICIENT_MAX_WORKER_PROCESSES`, `UNSUPPORTED_EXTENSIONS`, `INVALID_RDS_LOGICAL_REPLICATION`, `INVALID_LOGGING_SETUP`, `INVALID_DB_PARAM`, `UNSUPPORTED_GTID_MODE`, `SQLSERVER_AGENT_NOT_RUNNING`, `UNSUPPORTED_TABLE_DEFINITION`, `UNSUPPORTED_DEFINER`, `SQLSERVER_SERVERNAME_MISMATCH`, `PRIMARY_ALREADY_SETUP`, `UNSUPPORTED_BINLOG_FORMAT`, `BINLOG_RETENTION_SETTING`, `UNSUPPORTED_STORAGE_ENGINE`, `LIMITED_SUPPORT_TABLES`, `EXISTING_DATA_IN_REPLICA`, `MISSING_OPTIONAL_PRIVILEGES`, `RISKY_BACKUP_ADMIN_PRIVILEGE`, `INSUFFICIENT_GCS_PERMISSIONS`, `INVALID_FILE_INFO`, `UNSUPPORTED_DATABASE_SETTINGS`, `MYSQL_PARALLEL_IMPORT_INSUFFICIENT_PRIVILEGE`, `LOCAL_INFILE_OFF`, `TURN_ON_PITR_AFTER_PROMOTE`, `INCOMPATIBLE_DATABASE_MINOR_VERSION`, `SOURCE_MAX_SUBSCRIPTIONS`, `UNABLE_TO_VERIFY_DEFINERS`, `SUBSCRIPTION_CALCULATION_STATUS`, `PG_SUBSCRIPTION_COUNT`, `PG_SYNC_PARALLEL_LEVEL`, `INSUFFICIENT_DISK_SIZE`, `INSUFFICIENT_MACHINE_TIER`, `UNSUPPORTED_EXTENSIONS_NOT_MIGRATED`, `EXTENSIONS_NOT_MIGRATED`, `PG_CRON_FLAG_ENABLED_IN_REPLICA`, `EXTENSIONS_NOT_ENABLED_IN_REPLICA`, `UNSUPPORTED_COLUMNS`, `USERS_NOT_CREATED_IN_REPLICA`, `UNSUPPORTED_SYSTEM_OBJECTS`, `UNSUPPORTED_TABLES_WITH_REPLICA_IDENTITY`, `SELECTED_OBJECTS_NOT_EXIST_ON_SOURCE`, `PSC_ONLY_INSTANCE_WITH_NO_NETWORK_ATTACHMENT_URI`, `SELECTED_OBJECTS_REFERENCE_UNSELECTED_OBJECTS`, `PROMPT_DELETE_EXISTING`, `WILL_DELETE_EXISTING`, `PG_DDL_REPLICATION_INSUFFICIENT_PRIVILEGE`, `WRITABLE_DESTINATION_REPLICA_RECREATION_DOWNTIME`, `WRITABLE_DESTINATION_STORAGE_AUTO_INCREASE_DISABLED`. |

### `SqlInstancesAcquireSsrsLeaseResponse`

- Response for the acquire SSRS lease request.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `operationId` | string | The unique identifier for this operation. |

### `SqlInstancesExecuteSqlResponse`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `messages` | array<Message> | A list of notices and warnings generated during query execution. For PostgreSQL, this includes all notices and warnings. For MySQL, this includes warnings generated by the last executed statement. To retrieve all warnings for a multi-statement query, `SHOW WARNINGS` must be executed after each statement. |
| `metadata` | Metadata | The additional metadata information regarding the execution of the SQL statements. |
| `results` | array<QueryResult> | The list of results after executing all the SQL statements. |
| `status` | Status | Contains the error from the database if the SQL execution failed. |

### `SqlInstancesGetDiskShrinkConfigResponse`

- Instance get disk shrink config response.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `kind` | string | This is always `sql#getDiskShrinkConfig`. |
| `message` | string | Additional message to customers. |
| `minimalTargetSizeGb` | string (int64) | The minimum size to which a disk can be shrunk in GigaBytes. |

### `SqlInstancesGetLatestRecoveryTimeResponse`

- Instance get latest recovery time response.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `earliestRecoveryTime` | string (google-datetime) | Timestamp, identifies the earliest recovery time of the source instance. |
| `kind` | string | This is always `sql#getLatestRecoveryTime`. |
| `latestRecoveryTime` | string (google-datetime) | Timestamp, identifies the latest recovery time of the source instance. |

### `SqlInstancesReleaseSsrsLeaseResponse`

- Response for the release SSRS lease request.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `operationId` | string | The unique identifier for this operation. |

### `SqlInstancesRescheduleMaintenanceRequestBody`

- Reschedule options for maintenance windows.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `reschedule` | Reschedule | Required. The type of the reschedule the user wants. |

### `SqlInstancesResetReplicaSizeRequest`

- Instance reset replica size request.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `location` | string | Optional. Region of the Cloud SQL instance. |

### Shape of `AclEntry`

Generated from the Discovery schema (not in the official docs); values show each field type:

```json
{
  "expirationTime": "string (google-datetime)",
  "kind": "string",
  "name": "string",
  "value": "string"
}
```

## Notes

- Generated from the Discovery document(s) v1, v1beta4 of `sqladmin` (retrieved 2026-11-14); a type with the same fields in several versions shows the preferred version; a type whose fields differ between versions is listed once per version (heading suffix `(version)`), and each type's `Version` line names the document it was taken from. A `$ref` resolves to the definition of the same version.
- Source: https://sqladmin.googleapis.com/$discovery/rest?version=v1, https://sqladmin.googleapis.com/$discovery/rest?version=v1beta4 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
