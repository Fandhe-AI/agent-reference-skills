---
source: https://oracledatabase.googleapis.com/$discovery/rest?version=v1
---

# Oracle Database@Google Cloud API message schemas (oracledatabase) (part 1/2)

## Signature / Usage

Message types referenced by the methods listed under `references/rest/oracledatabase/`.

### `AllConnectionStrings`

- A list of all connection strings that can be used to connect to the Autonomous Database.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `high` | string | Output only. The database service provides the highest level of resources to each SQL statement. |
| `low` | string | Output only. The database service provides the least level of resources to each SQL statement. |
| `medium` | string | Output only. The database service provides a lower level of resources to each SQL statement. |

### `AmazonS3IcebergStorage`

- The Amazon S3 Iceberg storage.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `accessKeyId` | string | Required. The access key ID of Amazon S3. |
| `bucket` | string | Required. The bucket of Amazon S3. |
| `endpoint` | string | Optional. The endpoint of Amazon S3. |
| `region` | string | Required. The region of Amazon S3. |
| `schemeType` | string enum | Required. The scheme type of Amazon S3. Values: `SCHEME_TYPE_UNSPECIFIED`, `S3`, `S3A`. |
| `secretAccessKeySecret` | string | Optional. The secret access key of Amazon S3. |

### `AutonomousDatabase`

- Details of the Autonomous Database resource. https://docs.oracle.com/en-us/iaas/api/#/en/database/20160918/AutonomousDatabase/
- Version: v1

| Field | Type | Description |
|---|---|---|
| `adminPassword` | string | Optional. Input only. Immutable. The password for the default ADMIN user. Note: Only one of `admin_password_secret_version` or `admin_password` can be populated. |
| `adminPasswordSecretVersion` | string | Optional. Input only. Immutable. The resource name of a secret version in Secret Manager which contains the database admin user's password. Format: projects/{project}/secrets/{secret}/versions/{version}. Note: Only one of `admin_password_secret_version` or `admin_password` can be populated. |
| `cidr` | string | Optional. Immutable. The subnet CIDR range for the Autonomous Database. |
| `createTime` | string (google-datetime) | Output only. The date and time that the Autonomous Database was created. |
| `database` | string | Optional. Immutable. The name of the Autonomous Database. The database name must be unique in the project. The name must begin with a letter and can contain a maximum of 30 alphanumeric characters. |
| `disasterRecoverySupportedLocations` | array<string> | Output only. List of supported GCP region to clone the Autonomous Database for disaster recovery. Format: `project/{project}/locations/{location}`. |
| `displayName` | string | Optional. Immutable. The display name for the Autonomous Database. The name does not have to be unique within your project. |
| `entitlementId` | string | Output only. The ID of the subscription entitlement associated with the Autonomous Database. |
| `labels` | object | Optional. The labels or tags associated with the Autonomous Database. |
| `name` | string | Identifier. The name of the Autonomous Database resource in the following format: projects/{project}/locations/{region}/autonomousDatabases/{autonomous_database} |
| `network` | string | Optional. Immutable. The name of the VPC network used by the Autonomous Database in the following format: projects/{project}/global/networks/{network} |
| `odbNetwork` | string | Optional. Immutable. The name of the OdbNetwork associated with the Autonomous Database. Format: projects/{project}/locations/{location}/odbNetworks/{odb_network} It is optional but if specified, this should match the parent ODBNetwork of the OdbSubnet. |
| `odbSubnet` | string | Optional. Immutable. The name of the OdbSubnet associated with the Autonomous Database. Format: projects/{project}/locations/{location}/odbNetworks/{odb_network}/odbSubnets/{odb_subnet} |
| `peerAutonomousDatabases` | array<string> | Output only. The peer Autonomous Database names of the given Autonomous Database. |
| `properties` | AutonomousDatabaseProperties | Optional. The properties of the Autonomous Database. |
| `sourceConfig` | SourceConfig | Optional. Immutable. The source Autonomous Database configuration for the standby Autonomous Database. The source Autonomous Database is configured while creating the Peer Autonomous Database and can't be updated after creation. |

### `AutonomousDatabaseApex`

- Oracle APEX Application Development. https://docs.oracle.com/en-us/iaas/api/#/en/database/20160918/datatypes/AutonomousDatabaseApex
- Version: v1

| Field | Type | Description |
|---|---|---|
| `apexVersion` | string | Output only. The Oracle APEX Application Development version. |
| `ordsVersion` | string | Output only. The Oracle REST Data Services (ORDS) version. |

### `AutonomousDatabaseBackup`

- Details of the Autonomous Database Backup resource. https://docs.oracle.com/en-us/iaas/api/#/en/database/20160918/AutonomousDatabaseBackup/
- Version: v1

| Field | Type | Description |
|---|---|---|
| `autonomousDatabase` | string | Required. The name of the Autonomous Database resource for which the backup is being created. Format: projects/{project}/locations/{region}/autonomousDatabases/{autonomous_database} |
| `displayName` | string | Optional. User friendly name for the Backup. The name does not have to be unique. |
| `labels` | object | Optional. labels or tags associated with the resource. |
| `name` | string | Identifier. The name of the Autonomous Database Backup resource with the format: projects/{project}/locations/{region}/autonomousDatabaseBackups/{autonomous_database_backup} |
| `properties` | AutonomousDatabaseBackupProperties | Optional. Various properties of the backup. |

### `AutonomousDatabaseBackupProperties`

- Properties of the Autonomous Database Backup resource.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `availableTillTime` | string (google-datetime) | Output only. Timestamp until when the backup will be available. |
| `compartmentId` | string | Output only. The OCID of the compartment. |
| `databaseSizeTb` | number (float) | Output only. The quantity of data in the database, in terabytes. |
| `dbVersion` | string | Output only. A valid Oracle Database version for Autonomous Database. |
| `endTime` | string (google-datetime) | Output only. The date and time the backup completed. |
| `isAutomaticBackup` | boolean | Output only. Indicates if the backup is automatic or user initiated. |
| `isLongTermBackup` | boolean | Output only. Indicates if the backup is long term backup. |
| `isRestorable` | boolean | Output only. Indicates if the backup can be used to restore the Autonomous Database. |
| `keyStoreId` | string | Optional. The OCID of the key store of Oracle Vault. |
| `keyStoreWallet` | string | Optional. The wallet name for Oracle Key Vault. |
| `kmsKeyId` | string | Optional. The OCID of the key container that is used as the master encryption key in database transparent data encryption (TDE) operations. |
| `kmsKeyVersionId` | string | Optional. The OCID of the key container version that is used in database transparent data encryption (TDE) operations KMS Key can have multiple key versions. If none is specified, the current key version (latest) of the Key Id is used for the operation. Autonomous Database Serverless does not use key versions, hence is not applicable for Autonomous Database Serverless instances. |
| `lifecycleDetails` | string | Output only. Additional information about the current lifecycle state. |
| `lifecycleState` | string enum | Output only. The lifecycle state of the backup. Values: `STATE_UNSPECIFIED`, `CREATING`, `ACTIVE`, `DELETING`, `DELETED`, `FAILED`, `UPDATING`. |
| `ocid` | string | Output only. OCID of the Autonomous Database backup. https://docs.oracle.com/en-us/iaas/Content/General/Concepts/identifiers.htm#Oracle |
| `retentionPeriodDays` | integer (int32) | Optional. Retention period in days for the backup. |
| `sizeTb` | number (float) | Output only. The backup size in terabytes. |
| `startTime` | string (google-datetime) | Output only. The date and time the backup started. |
| `type` | string enum | Output only. The type of the backup. Values: `TYPE_UNSPECIFIED`, `INCREMENTAL`, `FULL`, `LONG_TERM`. |
| `vaultId` | string | Optional. The OCID of the vault. |

### `AutonomousDatabaseCharacterSet`

- Details of the Autonomous Database character set resource. https://docs.oracle.com/en-us/iaas/api/#/en/database/20160918/AutonomousDatabaseCharacterSets/
- Version: v1

| Field | Type | Description |
|---|---|---|
| `characterSet` | string | Output only. The character set name for the Autonomous Database which is the ID in the resource name. |
| `characterSetType` | string enum | Output only. The character set type for the Autonomous Database. Values: `CHARACTER_SET_TYPE_UNSPECIFIED`, `DATABASE`, `NATIONAL`. |
| `name` | string | Identifier. The name of the Autonomous Database Character Set resource in the following format: projects/{project}/locations/{region}/autonomousDatabaseCharacterSets/{autonomous_database_character_set} |

### `AutonomousDatabaseConnectionStrings`

- The connection string used to connect to the Autonomous Database. https://docs.oracle.com/en-us/iaas/api/#/en/database/20160918/datatypes/AutonomousDatabaseConnectionStrings
- Version: v1

| Field | Type | Description |
|---|---|---|
| `allConnectionStrings` | AllConnectionStrings | Output only. Returns all connection strings that can be used to connect to the Autonomous Database. |
| `dedicated` | string | Output only. The database service provides the least level of resources to each SQL statement, but supports the most number of concurrent SQL statements. |
| `high` | string | Output only. The database service provides the highest level of resources to each SQL statement. |
| `low` | string | Output only. The database service provides the least level of resources to each SQL statement. |
| `medium` | string | Output only. The database service provides a lower level of resources to each SQL statement. |
| `profiles` | array<DatabaseConnectionStringProfile> | Output only. A list of connection string profiles to allow clients to group, filter, and select values based on the structured metadata. |

### `AutonomousDatabaseConnectionUrls`

- The URLs for accessing Oracle Application Express (APEX) and SQL Developer Web with a browser from a Compute instance. https://docs.oracle.com/en-us/iaas/api/#/en/database/20160918/datatypes/AutonomousDatabaseConnectionUrls
- Version: v1

| Field | Type | Description |
|---|---|---|
| `apexUri` | string | Output only. Oracle Application Express (APEX) URL. |
| `databaseTransformsUri` | string | Output only. The URL of the Database Transforms for the Autonomous Database. |
| `graphStudioUri` | string | Output only. The URL of the Graph Studio for the Autonomous Database. |
| `machineLearningNotebookUri` | string | Output only. The URL of the Oracle Machine Learning (OML) Notebook for the Autonomous Database. |
| `machineLearningUserManagementUri` | string | Output only. The URL of Machine Learning user management the Autonomous Database. |
| `mongoDbUri` | string | Output only. The URL of the MongoDB API for the Autonomous Database. |
| `ordsUri` | string | Output only. The Oracle REST Data Services (ORDS) URL of the Web Access for the Autonomous Database. |
| `sqlDevWebUri` | string | Output only. The URL of the Oracle SQL Developer Web for the Autonomous Database. |

### `AutonomousDatabaseProperties`

- The properties of an Autonomous Database.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `actualUsedDataStorageSizeTb` | number (double) | Output only. The amount of storage currently being used for user and system data, in terabytes. |
| `allocatedStorageSizeTb` | number (double) | Output only. The amount of storage currently allocated for the database tables and billed for, rounded up in terabytes. |
| `allowlistedIps` | array<string> | Optional. Immutable. The list of allowlisted IP addresses for the Autonomous Database. |
| `apexDetails` | AutonomousDatabaseApex | Output only. The details for the Oracle APEX Application Development. |
| `arePrimaryAllowlistedIpsUsed` | boolean | Output only. This field indicates the status of Data Guard and Access control for the Autonomous Database. The field's value is null if Data Guard is disabled or Access Control is disabled. The field's value is TRUE if both Data Guard and Access Control are enabled, and the Autonomous Database is using primary IP access control list (ACL) for standby. The field's value is FALSE if both Data Guard and Access Control are enabled, and the Autonomous Database is using a different IP access control list (ACL) for standby compared to primary. |
| `autonomousContainerDatabaseId` | string | Output only. The Autonomous Container Database OCID. |
| `availableUpgradeVersions` | array<string> | Output only. The list of available Oracle Database upgrade versions for an Autonomous Database. |
| `backupRetentionPeriodDays` | integer (int32) | Optional. Immutable. The retention period for the Autonomous Database. This field is specified in days, can range from 1 day to 60 days, and has a default value of 60 days. |
| `characterSet` | string | Optional. Immutable. The character set for the Autonomous Database. The default is AL32UTF8. |
| `computeCount` | number (float) | Optional. Immutable. The number of compute servers for the Autonomous Database. |
| `connectionStrings` | AutonomousDatabaseConnectionStrings | Output only. The connection strings used to connect to an Autonomous Database. |
| `connectionUrls` | AutonomousDatabaseConnectionUrls | Output only. The Oracle Connection URLs for an Autonomous Database. |
| `cpuCoreCount` | integer (int32) | Optional. Immutable. The number of CPU cores to be made available to the database. |
| `customerContacts` | array<CustomerContact> | Optional. Immutable. The list of customer contacts. |
| `dataGuardRoleChangedTime` | string (google-datetime) | Output only. The date and time the Autonomous Data Guard role was changed for the standby Autonomous Database. |
| `dataSafeState` | string enum | Output only. The current state of the Data Safe registration for the Autonomous Database. Values: `DATA_SAFE_STATE_UNSPECIFIED`, `REGISTERING`, `REGISTERED`, `DEREGISTERING`, `NOT_REGISTERED`, `FAILED`. |
| `dataStorageSizeGb` | integer (int32) | Optional. Immutable. The size of the data stored in the database, in gigabytes. |
| `dataStorageSizeTb` | integer (int32) | Optional. Immutable. The size of the data stored in the database, in terabytes. |
| `databaseManagementState` | string enum | Output only. The current state of database management for the Autonomous Database. Values: `DATABASE_MANAGEMENT_STATE_UNSPECIFIED`, `ENABLING`, `ENABLED`, `DISABLING`, `NOT_ENABLED`, `FAILED_ENABLING`, `FAILED_DISABLING`. |
| `dbEdition` | string enum | Optional. Immutable. The edition of the Autonomous Databases. Values: `DATABASE_EDITION_UNSPECIFIED`, `STANDARD_EDITION`, `ENTERPRISE_EDITION`. |
| `dbVersion` | string | Optional. Immutable. The Oracle Database version for the Autonomous Database. |
| `dbWorkload` | string enum | Required. Immutable. The workload type of the Autonomous Database. Values: `DB_WORKLOAD_UNSPECIFIED`, `OLTP`, `DW`, `AJD`, `APEX`, `LH`. |
| `disasterRecoveryRoleChangedTime` | string (google-datetime) | Output only. The date and time the Disaster Recovery role was changed for the standby Autonomous Database. |
| `encryptionKey` | EncryptionKey | Optional. The encryption key used to encrypt the Autonomous Database. Updating this field will add a new entry in the `encryption_key_history_entries` field with the former version. |
| `encryptionKeyHistoryEntries` | array<EncryptionKeyHistoryEntry> | Output only. The history of the encryption keys used to encrypt the Autonomous Database. |
| `failedDataRecoveryDuration` | string (google-duration) | Output only. This field indicates the number of seconds of data loss during a Data Guard failover. |
| `isAutoScalingEnabled` | boolean | Optional. Immutable. This field indicates if auto scaling is enabled for the Autonomous Database CPU core count. |
| `isLocalDataGuardEnabled` | boolean | Output only. Deprecated: Please use `local_data_guard_enabled` instead. This field indicates whether the Autonomous Database has local (in-region) Data Guard enabled. |
| `isStorageAutoScalingEnabled` | boolean | Optional. Immutable. This field indicates if auto scaling is enabled for the Autonomous Database storage. |
| `licenseType` | string enum | Required. Immutable. The license type used for the Autonomous Database. Values: `LICENSE_TYPE_UNSPECIFIED`, `LICENSE_INCLUDED`, `BRING_YOUR_OWN_LICENSE`. |
| `lifecycleDetails` | string | Output only. The details of the current lifestyle state of the Autonomous Database. |
| `localAdgAutoFailoverMaxDataLossLimit` | integer (int32) | Output only. Deprecated: Please use `local_adg_auto_failover_max_data_loss_limit_duration` instead. This field indicates the maximum data loss limit for an Autonomous Database, in seconds. |
| `localAdgAutoFailoverMaxDataLossLimitDuration` | integer (int32) | Optional. This field indicates the maximum data loss limit for an Autonomous Database, in seconds. |
| `localDataGuardEnabled` | boolean | Optional. Indicates whether the Autonomous Database has a local (in-region) standby database. Not applicable to cross-region Data Guard or dedicated Exadata infrastructure. |
| `localDisasterRecoveryType` | string enum | Output only. This field indicates the local disaster recovery (DR) type of an Autonomous Database. Values: `LOCAL_DISASTER_RECOVERY_TYPE_UNSPECIFIED`, `ADG`, `BACKUP_BASED`, `NOT_AVAILABLE`. |
| `localStandbyDb` | AutonomousDatabaseStandbySummary | Output only. The details of the Autonomous Data Guard standby database. |
| `maintenanceBeginTime` | string (google-datetime) | Output only. The date and time when maintenance will begin. |
| `maintenanceEndTime` | string (google-datetime) | Output only. The date and time when maintenance will end. |
| `maintenanceScheduleType` | string enum | Optional. Immutable. The maintenance schedule of the Autonomous Database. Values: `MAINTENANCE_SCHEDULE_TYPE_UNSPECIFIED`, `EARLY`, `REGULAR`. |
| `memoryPerOracleComputeUnitGbs` | integer (int32) | Output only. The amount of memory enabled per ECPU, in gigabytes. |
| `memoryTableGbs` | integer (int32) | Output only. The memory assigned to in-memory tables in an Autonomous Database. |
| `mtlsConnectionRequired` | boolean | Optional. Immutable. This field specifies if the Autonomous Database requires mTLS connections. |
| `nCharacterSet` | string | Optional. Immutable. The national character set for the Autonomous Database. The default is AL16UTF16. |
| `nextLongTermBackupTime` | string (google-datetime) | Output only. The long term backup schedule of the Autonomous Database. |
| `ociUrl` | string | Output only. The Oracle Cloud Infrastructure link for the Autonomous Database. |
| `ocid` | string | Output only. OCID of the Autonomous Database. https://docs.oracle.com/en-us/iaas/Content/General/Concepts/identifiers.htm#Oracle |
| `openMode` | string enum | Output only. This field indicates the current mode of the Autonomous Database. Values: `OPEN_MODE_UNSPECIFIED`, `READ_ONLY`, `READ_WRITE`. |
| `operationsInsightsState` | string enum | Output only. This field indicates the state of Operations Insights for the Autonomous Database. Values: `OPERATIONS_INSIGHTS_STATE_UNSPECIFIED`, `ENABLING`, `ENABLED`, `DISABLING`, `NOT_ENABLED`, `FAILED_ENABLING`, `FAILED_DISABLING`. |
| `peerDbIds` | array<string> | Output only. The list of OCIDs of standby databases located in Autonomous Data Guard remote regions that are associated with the source database. |
| `permissionLevel` | string enum | Output only. The permission level of the Autonomous Database. Values: `PERMISSION_LEVEL_UNSPECIFIED`, `RESTRICTED`, `UNRESTRICTED`. |
| `privateEndpoint` | string | Output only. The private endpoint for the Autonomous Database. |
| `privateEndpointIp` | string | Optional. Immutable. The private endpoint IP address for the Autonomous Database. |
| `privateEndpointLabel` | string | Optional. Immutable. The private endpoint label for the Autonomous Database. |
| `refreshableClone` | boolean | Optional. Indicates if the Autonomous Database is a refreshable clone. This field is used in update flow to connect / disconnect a refreshable clone from its source database. |
| `refreshableMode` | string enum | Output only. The refresh mode of the cloned Autonomous Database. Values: `REFRESHABLE_MODE_UNSPECIFIED`, `AUTOMATIC`, `MANUAL`. |
| `refreshableState` | string enum | Output only. The refresh State of the clone. Values: `REFRESHABLE_STATE_UNSPECIFIED`, `REFRESHING`, `NOT_REFRESHING`. |
| `role` | string enum | Output only. The Data Guard role of the Autonomous Database. Values: `ROLE_UNSPECIFIED`, `PRIMARY`, `STANDBY`, `DISABLED_STANDBY`, `BACKUP_COPY`, `SNAPSHOT_STANDBY`. |
| `scheduledOperationDetails` | array<ScheduledOperationDetails> | Output only. The list and details of the scheduled operations of the Autonomous Database. |
| `secretId` | string | Optional. Immutable. The ID of the Oracle Cloud Infrastructure vault secret. |
| `serviceAgentEmail` | string | Output only. An Oracle-managed Google Cloud service account on which customers can grant roles to access resources in the customer project. |
| `sqlWebDeveloperUrl` | string | Output only. The SQL Web Developer URL for the Autonomous Database. |
| `state` | string enum | Output only. The current lifecycle state of the Autonomous Database. Values: `STATE_UNSPECIFIED`, `PROVISIONING`, `AVAILABLE`, `STOPPING`, `STOPPED`, `STARTING`, `TERMINATING`, `TERMINATED`, `UNAVAILABLE`, `RESTORE_IN_PROGRESS`, `RESTORE_FAILED`, `BACKUP_IN_PROGRESS`, `SCALE_IN_PROGRESS`, `AVAILABLE_NEEDS_ATTENTION`, `UPDATING`, `MAINTENANCE_IN_PROGRESS`, `RESTARTING`, `RECREATING`, `ROLE_CHANGE_IN_PROGRESS`, `UPGRADING`, `INACCESSIBLE`, `STANDBY`. |
| `supportedCloneRegions` | array<string> | Output only. The list of available regions that can be used to create a clone for the Autonomous Database. |
| `totalAutoBackupStorageSizeGbs` | number (float) | Output only. The storage space used by automatic backups of Autonomous Database, in gigabytes. |
| `usedDataStorageSizeTbs` | integer (int32) | Output only. The storage space used by Autonomous Database, in gigabytes. |
| `vaultId` | string | Optional. Immutable. The ID of the Oracle Cloud Infrastructure vault. |

### `AutonomousDatabaseRefreshableClone`

- An Autonomous Database refreshable clone
- Version: v1

| Field | Type | Description |
|---|---|---|
| `name` | string | Output only. The GCP resource name of the Autonomous Database. |
| `region` | string | Output only. The Google Cloud region where the refreshable clone exists. |

### `AutonomousDatabaseRefreshableClones`

- Response message for getting the Autonomous Database refreshable clones.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `autonomousDatabaseRefreshableClones` | array<AutonomousDatabaseRefreshableClone> | The list of Autonomous Database refreshable clones. |

### `AutonomousDatabaseStandbySummary`

- Autonomous Data Guard standby database details. https://docs.oracle.com/en-us/iaas/api/#/en/database/20160918/datatypes/AutonomousDatabaseStandbySummary
- Version: v1

| Field | Type | Description |
|---|---|---|
| `dataGuardRoleChangedTime` | string (google-datetime) | Output only. The date and time the Autonomous Data Guard role was switched for the standby Autonomous Database. |
| `disasterRecoveryRoleChangedTime` | string (google-datetime) | Output only. The date and time the Disaster Recovery role was switched for the standby Autonomous Database. |
| `lagTimeDuration` | string (google-duration) | Output only. The amount of time, in seconds, that the data of the standby database lags in comparison to the data of the primary database. |
| `lifecycleDetails` | string | Output only. The additional details about the current lifecycle state of the Autonomous Database. |
| `state` | string enum | Output only. The current lifecycle state of the Autonomous Database. Values: `STATE_UNSPECIFIED`, `PROVISIONING`, `AVAILABLE`, `STOPPING`, `STOPPED`, `STARTING`, `TERMINATING`, `TERMINATED`, `UNAVAILABLE`, `RESTORE_IN_PROGRESS`, `RESTORE_FAILED`, `BACKUP_IN_PROGRESS`, `SCALE_IN_PROGRESS`, `AVAILABLE_NEEDS_ATTENTION`, `UPDATING`, `MAINTENANCE_IN_PROGRESS`, `RESTARTING`, `RECREATING`, `ROLE_CHANGE_IN_PROGRESS`, `UPGRADING`, `INACCESSIBLE`, `STANDBY`. |

### `AutonomousDbVersion`

- Details of the Autonomous Database version. https://docs.oracle.com/en-us/iaas/api/#/en/database/20160918/AutonomousDbVersionSummary/
- Version: v1

| Field | Type | Description |
|---|---|---|
| `dbWorkload` | string enum | Output only. The Autonomous Database workload type. Values: `DB_WORKLOAD_UNSPECIFIED`, `OLTP`, `DW`, `AJD`, `APEX`, `LH`. |
| `name` | string | Identifier. The name of the Autonomous Database Version resource with the format: projects/{project}/locations/{region}/autonomousDbVersions/{autonomous_db_version} |
| `version` | string | Output only. An Oracle Database version for Autonomous Database. |
| `workloadUri` | string | Output only. A URL that points to a detailed description of the Autonomous Database version. |

### `AzureDataLakeStorageIcebergStorage`

- The Azure Data Lake Storage Iceberg storage.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `accountKeySecret` | string | Optional. The account key of Azure Data Lake Storage. |
| `azureAccount` | string | Required. The account of Azure Data Lake Storage. |
| `container` | string | Required. The container of Azure Data Lake Storage. |
| `endpoint` | string | Optional. The endpoint of Azure Data Lake Storage. |

### `BackupDestinationDetails`

- The details of the database backup destination.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `type` | string enum | Optional. The type of the database backup destination. Values: `BACKUP_DESTINATION_TYPE_UNSPECIFIED`, `NFS`, `RECOVERY_APPLIANCE`, `OBJECT_STORE`, `LOCAL`, `DBRS`. |

### `CancelOperationRequest`

- The request message for Operations.CancelOperation.
- Version: v1

### `CloudAccountDetails`

- Details of the OCI Cloud Account.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `accountCreationUri` | string | Output only. URL to create a new account and link. |
| `cloudAccount` | string | Output only. OCI account name. |
| `cloudAccountHomeRegion` | string | Output only. OCI account home region. |
| `linkExistingAccountUri` | string | Output only. URL to link an existing account. |

### `CloudExadataInfrastructure`

- Represents CloudExadataInfrastructure resource. https://docs.oracle.com/en-us/iaas/api/#/en/database/20160918/CloudExadataInfrastructure/
- Version: v1

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. The date and time that the Exadata Infrastructure was created. |
| `displayName` | string | Optional. Immutable. User friendly name for this resource. |
| `entitlementId` | string | Output only. Entitlement ID of the private offer against which this infrastructure resource is provisioned. |
| `gcpOracleZone` | string | Optional. Immutable. The GCP Oracle zone where Oracle Exadata Infrastructure is hosted. Example: us-east4-b-r2. If not specified, the system will pick a zone based on availability. |
| `labels` | object | Optional. Labels or tags associated with the resource. |
| `name` | string | Identifier. The name of the Exadata Infrastructure resource with the format: projects/{project}/locations/{region}/cloudExadataInfrastructures/{cloud_exadata_infrastructure} |
| `properties` | CloudExadataInfrastructureProperties | Optional. Immutable. Various properties of the infra. |

### `CloudExadataInfrastructureProperties`

- Various properties of Exadata Infrastructure.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `activatedStorageCount` | integer (int32) | Output only. The requested number of additional storage servers activated for the Exadata Infrastructure. |
| `additionalStorageCount` | integer (int32) | Output only. The requested number of additional storage servers for the Exadata Infrastructure. |
| `availableStorageSizeGb` | integer (int32) | Output only. The available storage can be allocated to the Exadata Infrastructure resource, in gigabytes (GB). |
| `computeCount` | integer (int32) | Optional. The number of compute servers for the Exadata Infrastructure. |
| `computeModel` | string enum | Output only. The compute model of the Exadata Infrastructure. Values: `COMPUTE_MODEL_UNSPECIFIED`, `COMPUTE_MODEL_ECPU`, `COMPUTE_MODEL_OCPU`. |
| `cpuCount` | integer (int32) | Output only. The number of enabled CPU cores. |
| `customerContacts` | array<CustomerContact> | Optional. The list of customer contacts. |
| `dataStorageSizeTb` | number (double) | Output only. Size, in terabytes, of the DATA disk group. |
| `databaseServerType` | string | Optional. The database server type of the Exadata Infrastructure. |
| `dbNodeStorageSizeGb` | integer (int32) | Output only. The local node storage allocated in GBs. |
| `dbServerVersion` | string | Output only. The software version of the database servers (dom0) in the Exadata Infrastructure. |
| `exascaleConfig` | ExascaleConfig | Output only. The Exascale configuration for the Exadata Infrastructure. |
| `maintenanceWindow` | MaintenanceWindow | Optional. Maintenance window for repair. |
| `maxCpuCount` | integer (int32) | Output only. The total number of CPU cores available. |
| `maxDataStorageTb` | number (double) | Output only. The total available DATA disk group size. |
| `maxDbNodeStorageSizeGb` | integer (int32) | Output only. The total local node storage available in GBs. |
| `maxMemoryGb` | integer (int32) | Output only. The total memory available in GBs. |
| `memorySizeGb` | integer (int32) | Output only. The memory allocated in GBs. |
| `monthlyDbServerVersion` | string | Output only. The monthly software version of the database servers (dom0) in the Exadata Infrastructure. Example: 20.1.15 |
| `monthlyStorageServerVersion` | string | Output only. The monthly software version of the storage servers (cells) in the Exadata Infrastructure. Example: 20.1.15 |
| `nextMaintenanceRunId` | string | Output only. The OCID of the next maintenance run. |
| `nextMaintenanceRunTime` | string (google-datetime) | Output only. The time when the next maintenance run will occur. |
| `nextSecurityMaintenanceRunTime` | string (google-datetime) | Output only. The time when the next security maintenance run will occur. |
| `ociUrl` | string | Output only. Deep link to the OCI console to view this resource. |
| `ocid` | string | Output only. OCID of created infra. https://docs.oracle.com/en-us/iaas/Content/General/Concepts/identifiers.htm#Oracle |
| `shape` | string | Required. The shape of the Exadata Infrastructure. The shape determines the amount of CPU, storage, and memory resources allocated to the instance. |
| `state` | string enum | Output only. The current lifecycle state of the Exadata Infrastructure. Values: `STATE_UNSPECIFIED`, `PROVISIONING`, `AVAILABLE`, `UPDATING`, `TERMINATING`, `TERMINATED`, `FAILED`, `MAINTENANCE_IN_PROGRESS`. |
| `storageCount` | integer (int32) | Optional. The number of Cloud Exadata storage servers for the Exadata Infrastructure. |
| `storageServerType` | string | Optional. The storage server type of the Exadata Infrastructure. |
| `storageServerVersion` | string | Output only. The software version of the storage servers (cells) in the Exadata Infrastructure. |
| `totalStorageSizeGb` | integer (int32) | Optional. The total storage allocated to the Exadata Infrastructure resource, in gigabytes (GB). |

### `CloudVmCluster`

- Details of the Cloud VM Cluster resource. https://docs.oracle.com/en-us/iaas/api/#/en/database/20160918/CloudVmCluster/
- Version: v1

| Field | Type | Description |
|---|---|---|
| `backupOdbSubnet` | string | Optional. Immutable. The name of the backup OdbSubnet associated with the VM Cluster. Format: projects/{project}/locations/{location}/odbNetworks/{odb_network}/odbSubnets/{odb_subnet} |
| `backupSubnetCidr` | string | Optional. Immutable. CIDR range of the backup subnet. |
| `cidr` | string | Optional. Immutable. Network settings. CIDR to use for cluster IP allocation. |
| `createTime` | string (google-datetime) | Output only. The date and time that the VM cluster was created. |
| `displayName` | string | Optional. Immutable. User friendly name for this resource. |
| `exadataInfrastructure` | string | Required. Immutable. The name of the Exadata Infrastructure resource on which VM cluster resource is created, in the following format: projects/{project}/locations/{region}/cloudExadataInfrastuctures/{cloud_extradata_infrastructure} |
| `exascaleDbStorageVault` | string | Optional. Immutable. The name of ExascaleDbStorageVault associated with the VM Cluster. Format: projects/{project}/locations/{location}/exascaleDbStorageVaults/{exascale_db_storage_vault} |
| `gcpOracleZone` | string | Output only. The GCP Oracle zone where Oracle CloudVmCluster is hosted. This will be the same as the gcp_oracle_zone of the CloudExadataInfrastructure. Example: us-east4-b-r2. |
| `identityConnector` | IdentityConnector | Output only. The identity connector details which will allow OCI to securely access the resources in the customer project. |
| `identityConnectorDisabled` | boolean | Optional. Input only. Immutable. If set to true, disables the automatic provisioning of the Workload Identity Connector during creation. If set to false or omitted, the Workload Identity Connector will be automatically provisioned by default. Note: Provisioning the Workload Identity Connector is a prerequisite for enabling Google Cloud CMEK. |
| `labels` | object | Optional. Labels or tags associated with the VM Cluster. |
| `name` | string | Identifier. The name of the VM Cluster resource with the format: projects/{project}/locations/{region}/cloudVmClusters/{cloud_vm_cluster} |
| `network` | string | Optional. Immutable. The name of the VPC network. Format: projects/{project}/global/networks/{network} |
| `odbDnsZone` | string | Optional. Immutable. The name of the OdbDnsZone for using custom domain name for the VM Cluster. Format: projects/{project}/locations/{location}/odbNetworks/{odb_network}/odbDnsZones/{odb_dns_zone} |
| `odbNetwork` | string | Optional. Immutable. The name of the OdbNetwork associated with the VM Cluster. Format: projects/{project}/locations/{location}/odbNetworks/{odb_network} It is optional but if specified, this should match the parent ODBNetwork of the odb_subnet and backup_odb_subnet. |
| `odbSubnet` | string | Optional. Immutable. The name of the OdbSubnet associated with the VM Cluster for IP allocation. Format: projects/{project}/locations/{location}/odbNetworks/{odb_network}/odbSubnets/{odb_subnet} |
| `properties` | CloudVmClusterProperties | Optional. Immutable. Various properties of the VM Cluster. |

### `CloudVmClusterProperties`

- Various properties and settings associated with Exadata VM cluster.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `clusterName` | string | Optional. OCI Cluster name. |
| `compartmentId` | string | Output only. Compartment ID of cluster. |
| `computeModel` | string enum | Output only. The compute model of the VM Cluster. Values: `COMPUTE_MODEL_UNSPECIFIED`, `COMPUTE_MODEL_ECPU`, `COMPUTE_MODEL_OCPU`. |
| `cpuCoreCount` | integer (int32) | Required. Number of enabled CPU cores. |
| `dataStorageSizeTb` | number (double) | Optional. The data disk group size to be allocated in TBs. |
| `dbNodeStorageSizeGb` | integer (int32) | Optional. Local storage per VM. |
| `dbServerOcids` | array<string> | Optional. OCID of database servers. |
| `diagnosticsDataCollectionOptions` | DataCollectionOptions | Optional. Data collection options for diagnostics. |
| `diskRedundancy` | string enum | Optional. The type of redundancy. Values: `DISK_REDUNDANCY_UNSPECIFIED`, `HIGH`, `NORMAL`. |
| `dnsListenerIp` | string | Output only. DNS listener IP. |
| `domain` | string | Output only. Parent DNS domain where SCAN DNS and hosts names are qualified. ex: ocispdelegated.ocisp10jvnet.oraclevcn.com |
| `giVersion` | string | Optional. Grid Infrastructure Version. |
| `hostname` | string | Output only. host name without domain. format: "-" with some suffix. ex: sp2-yi0xq where "sp2" is the hostname_prefix. |
| `hostnamePrefix` | string | Optional. Prefix for VM cluster host names. |
| `licenseType` | string enum | Required. License type of VM Cluster. Values: `LICENSE_TYPE_UNSPECIFIED`, `LICENSE_INCLUDED`, `BRING_YOUR_OWN_LICENSE`. |
| `localBackupEnabled` | boolean | Optional. Use local backup. |
| `memorySizeGb` | integer (int32) | Optional. Memory allocated in GBs. |
| `nodeCount` | integer (int32) | Optional. Number of database servers. |
| `ociUrl` | string | Output only. Deep link to the OCI console to view this resource. |
| `ocid` | string | Output only. Oracle Cloud Infrastructure ID of VM Cluster. |
| `ocpuCount` | number (float) | Optional. OCPU count per VM. Minimum is 0.1. |
| `scanDns` | string | Output only. SCAN DNS name. ex: sp2-yi0xq-scan.ocispdelegated.ocisp10jvnet.oraclevcn.com |
| `scanDnsRecordId` | string | Output only. OCID of scan DNS record. |
| `scanIpIds` | array<string> | Output only. OCIDs of scan IPs. |
| `scanListenerPortTcp` | integer (int32) | Optional. SCAN listener port - TCP |
| `scanListenerPortTcpSsl` | integer (int32) | Optional. SCAN listener port - TLS |
| `shape` | string | Output only. Shape of VM Cluster. |
| `sparseDiskgroupEnabled` | boolean | Optional. Use exadata sparse snapshots. |
| `sshPublicKeys` | array<string> | Optional. SSH public keys to be stored with cluster. |
| `state` | string enum | Output only. State of the cluster. Values: `STATE_UNSPECIFIED`, `PROVISIONING`, `AVAILABLE`, `UPDATING`, `TERMINATING`, `TERMINATED`, `FAILED`, `MAINTENANCE_IN_PROGRESS`. |
| `storageManagementType` | string enum | Output only. The storage management type of the VM Cluster. Values: `STORAGE_MANAGEMENT_TYPE_UNSPECIFIED`, `ASM`, `EXASCALE`. |
| `storageSizeGb` | integer (int32) | Output only. The storage allocation for the disk group, in gigabytes (GB). |
| `systemVersion` | string | Optional. Operating system version of the image. |
| `timeZone` | TimeZone | Optional. Time zone of VM Cluster to set. Defaults to UTC if not specified. |
| `vmBackupStorageType` | string enum | Optional. Specifies whether VM backups are stored on local DB server storage or Exascale storage. Values: `VM_BACKUP_STORAGE_TYPE_UNSPECIFIED`, `VM_BACKUP_STORAGE_TYPE_LOCAL`, `VM_BACKUP_STORAGE_TYPE_EXASCALE`. |
| `vmFileSystemStorageType` | string enum | Optional. Specifies whether VM file system storage / VM images are stored on local DB server storage or Exascale storage. Values: `VM_FILE_SYSTEM_STORAGE_TYPE_UNSPECIFIED`, `VM_FILE_SYSTEM_STORAGE_TYPE_LOCAL`, `VM_FILE_SYSTEM_STORAGE_TYPE_EXASCALE`. |

### `Column`

- Contains the name and datatype of a column in a SQL Result.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `name` | string | Required. Name of the column. |
| `type` | string | Required. Database-specific type name (e.g., "VARCHAR2(255)", "NUMBER", "DATE", "CLOB") |

### `ComputePerformance`

- Parameters detailing the compute performance for a specified DB system shape.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `computeCount` | integer (int32) | Output only. The number of compute servers for the DB system. |
| `computeModel` | string enum | Output only. The compute model for Base Database Service. Values: `COMPUTE_MODEL_UNSPECIFIED`, `COMPUTE_MODEL_ECPU`, `COMPUTE_MODEL_OCPU`. |
| `cpuCoreCount` | integer (int32) | Output only. The number of CPU cores available. |
| `memoryInGbs` | number (double) | Output only. The amount of memory allocated for the VMDB System in GBs. |

### `ConfigureExascaleCloudExadataInfrastructureRequest`

- The request for `CloudExadataInfrastructure.ConfigureExascale`.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `requestId` | string | Optional. An optional ID to identify the request. |
| `totalStorageSizeGb` | integer (int32) | Required. The total storage to be allocated to Exascale in GBs. |
| `totalVmStorageSizeGb` | integer (int32) | Optional. Storage size needed for VM storage on Exascale in GBs. |

### `CustomerContact`

- The CustomerContact reference as defined by Oracle. https://docs.oracle.com/en-us/iaas/api/#/en/database/20160918/datatypes/CustomerContact
- Version: v1

| Field | Type | Description |
|---|---|---|
| `email` | string | Required. The email address used by Oracle to send notifications regarding databases and infrastructure. |

### `DataCollectionOptions`

- Data collection options for diagnostics.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `diagnosticsEventsEnabled` | boolean | Optional. Indicates whether diagnostic collection is enabled for the VM cluster |
| `healthMonitoringEnabled` | boolean | Optional. Indicates whether health monitoring is enabled for the VM cluster |
| `incidentLogsEnabled` | boolean | Optional. Indicates whether incident logs and trace collection are enabled for the VM cluster |

### `DataCollectionOptionsCommon`

- Data collection options for diagnostics. https://docs.oracle.com/en-us/iaas/api/#/en/database/20160918/datatypes/DataCollectionOptions
- Version: v1

| Field | Type | Description |
|---|---|---|
| `isDiagnosticsEventsEnabled` | boolean | Optional. Indicates whether to enable data collection for diagnostics. |
| `isHealthMonitoringEnabled` | boolean | Optional. Indicates whether to enable health monitoring. |
| `isIncidentLogsEnabled` | boolean | Optional. Indicates whether to enable incident logs and trace collection. |

### `DataCollectionOptionsDbSystem`

- Data collection options for DbSystem.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `isDiagnosticsEventsEnabled` | boolean | Optional. Indicates whether to enable data collection for diagnostics. |
| `isIncidentLogsEnabled` | boolean | Optional. Indicates whether to enable incident logs and trace collection. |

### `Database`

- Details of the Database resource. https://docs.oracle.com/en-us/iaas/api/#/en/database/20160918/Database/
- Version: v1

| Field | Type | Description |
|---|---|---|
| `adminPassword` | string | Optional. Input only. The password for the default ADMIN user. Note: Only one of `admin_password_secret_version` or `admin_password` can be populated. |
| `adminPasswordSecretVersion` | string | Optional. Input only. The resource name of a secret version in Secret Manager which contains the database admin user's password. Format: projects/{project}/secrets/{secret}/versions/{version}. Note: Only one of `admin_password_secret_version` or `admin_password` can be populated. |
| `characterSet` | string | Optional. The character set for the database. The default is AL32UTF8. |
| `createTime` | string (google-datetime) | Output only. The date and time that the Database was created. |
| `databaseId` | string | Optional. The database ID of the Database. |
| `dbHomeName` | string | Optional. The name of the DbHome resource associated with the Database. |
| `dbName` | string | Optional. The database name. The name must begin with an alphabetic character and can contain a maximum of eight alphanumeric characters. Special characters are not permitted. |
| `dbUniqueName` | string | Optional. The DB_UNIQUE_NAME of the Oracle Database being backed up. |
| `gcpOracleZone` | string | Output only. The GCP Oracle zone where the Database is created. |
| `name` | string | Identifier. The name of the Database resource in the following format: projects/{project}/locations/{region}/databases/{database} |
| `ncharacterSet` | string | Optional. The national character set for the database. The default is AL16UTF16. |
| `ociUrl` | string | Output only. HTTPS link to OCI resources exposed to Customer via UI Interface. |
| `opsInsightsStatus` | string enum | Output only. The Status of Operations Insights for this Database. Values: `OPERATIONS_INSIGHTS_STATUS_UNSPECIFIED`, `ENABLING`, `ENABLED`, `DISABLING`, `NOT_ENABLED`, `FAILED_ENABLING`, `FAILED_DISABLING`. |
| `pluggableDatabaseId` | string | Optional. The ID of the pluggable database associated with the Database. The ID must be unique within the project and location. |
| `pluggableDatabaseName` | string | Optional. The pluggable database associated with the Database. The name must begin with an alphabetic character and can contain a maximum of thirty alphanumeric characters. |
| `properties` | DatabaseProperties | Optional. The properties of the Database. |
| `tdeWalletPassword` | string | Optional. Input only. The TDE wallet password for the database. Note: Only one of `tde_wallet_password_secret_version` or `tde_wallet_password` can be populated. |
| `tdeWalletPasswordSecretVersion` | string | Optional. Input only. The resource name of a secret version in Secret Manager which contains the TDE wallet password for the database. Format: projects/{project}/secrets/{secret}/versions/{version}. Note: Only one of `tde_wallet_password_secret_version` or `tde_wallet_password` can be populated. |

### `DatabaseCharacterSet`

- Details of the Database character set resource.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `characterSet` | string | Output only. The character set name for the Database which is the ID in the resource name. |
| `characterSetType` | string enum | Output only. The character set type for the Database. Values: `CHARACTER_SET_TYPE_UNSPECIFIED`, `DATABASE`, `NATIONAL`. |
| `name` | string | Identifier. The name of the Database Character Set resource in the following format: projects/{project}/locations/{region}/databaseCharacterSets/{database_character_set} |

### `DatabaseConnection`

- Represents DatabaseConnection resource.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `connectionString` | string | Required. Immutable. Oracle Easy Connect or TNS connection string. Example: "your-db-host.example.com:1521/YOUR_SERVICE_NAME" |
| `createTime` | string (google-datetime) | Output only. The create time of the resource. |
| `displayName` | string | Optional. Immutable. User-friendly display name for the connection. |
| `labels` | object | Optional. Optional: Labels as key-value pairs to organize the resource. |
| `lifecycleDetails` | string | Output only. Additional information about the current state of the connection. |
| `name` | string | Identifier. The resource name of the DatabaseConnection. Format: projects/{project}/locations/{location}/databaseConnections/{database_connection} |
| `odbNetwork` | string | Optional. Immutable. For Oracle Database@Google cloud resources. Format: projects/{project}/locations/{location}/odbNetworks/{odbNetwork} |
| `passwordSecretVersion` | string | Optional. The resource name of the GCP Secret Manager secret version containing the password for the specified username. Format: projects/{project}/secrets/{secret_id}/versions/{version_id} The service's Per-Product Per-Project Service Account (P4SA) must have the 'secretmanager.secretAccessor' permission on this secret. |
| `state` | string enum | Output only. The current state of the connection. Values: `STATE_UNSPECIFIED`, `CREATING`, `ACTIVE`, `FAILED`, `DELETING`. |
| `updateTime` | string (google-datetime) | Output only. The update time of the resource. |
| `username` | string | Optional. Immutable. The default database username to use for connections. |
| `walletSecretVersion` | string | Optional. Optional: The resource name of the GCP Secret Manager secret version containing base64 encoded content of the Oracle Wallet ZIP file required for mTLS/TLS connections. Format: projects/{project}/secrets/{secret_id}/versions/{version_id} The service's Per-Product Per-Project Service Account (P4SA) must have the 'secretmanager.secretAccessor' permission on this secret. |

### `DatabaseConnectionStringProfile`

- The connection string profile to allow clients to group. https://docs.oracle.com/en-us/iaas/api/#/en/database/20160918/datatypes/DatabaseConnectionStringProfile
- Version: v1

| Field | Type | Description |
|---|---|---|
| `consumerGroup` | string enum | Output only. The current consumer group being used by the connection. Values: `CONSUMER_GROUP_UNSPECIFIED`, `HIGH`, `MEDIUM`, `LOW`, `TP`, `TPURGENT`. |
| `displayName` | string | Output only. The display name for the database connection. |
| `hostFormat` | string enum | Output only. The host name format being currently used in connection string. Values: `HOST_FORMAT_UNSPECIFIED`, `FQDN`, `IP`. |
| `isRegional` | boolean | Output only. This field indicates if the connection string is regional and is only applicable for cross-region Data Guard. |
| `protocol` | string enum | Output only. The protocol being used by the connection. Values: `PROTOCOL_UNSPECIFIED`, `TCP`, `TCPS`. |
| `sessionMode` | string enum | Output only. The current session mode of the connection. Values: `SESSION_MODE_UNSPECIFIED`, `DIRECT`, `INDIRECT`. |
| `syntaxFormat` | string enum | Output only. The syntax of the connection string. Values: `SYNTAX_FORMAT_UNSPECIFIED`, `LONG`, `EZCONNECT`, `EZCONNECTPLUS`. |
| `tlsAuthentication` | string enum | Output only. This field indicates the TLS authentication type of the connection. Values: `TLS_AUTHENTICATION_UNSPECIFIED`, `SERVER`, `MUTUAL`. |
| `value` | string | Output only. The value of the connection string. |

### `DatabaseManagementConfig`

- The configuration of the Database Management service.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `managementState` | string enum | Output only. The status of the Database Management service. Values: `MANAGEMENT_STATE_UNSPECIFIED`, `ENABLING`, `ENABLED`, `DISABLING`, `DISABLED`, `UPDATING`, `FAILED_ENABLING`, `FAILED_DISABLING`, `FAILED_UPDATING`. |
| `managementType` | string enum | Output only. The Database Management type. Values: `MANAGEMENT_TYPE_UNSPECIFIED`, `BASIC`, `ADVANCED`. |

### `DatabaseProperties`

- The properties of a Database.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `databaseManagementConfig` | DatabaseManagementConfig | Output only. The Database Management config. |
| `dbBackupConfig` | DbBackupConfig | Optional. Backup options for the Database. |
| `dbVersion` | string | Required. The Oracle Database version. |
| `state` | string enum | Output only. State of the Database. Values: `DATABASE_LIFECYCLE_STATE_UNSPECIFIED`, `PROVISIONING`, `AVAILABLE`, `UPDATING`, `BACKUP_IN_PROGRESS`, `UPGRADING`, `CONVERTING`, `TERMINATING`, `TERMINATED`, `RESTORE_FAILED`, `FAILED`. |

### `DbBackupConfig`

- Backup Options for the Database.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `autoBackupEnabled` | boolean | Optional. If set to true, enables automatic backups on the database. |
| `autoFullBackupDay` | string enum | Optional. The day of the week on which the full backup should be performed on the database. If no value is provided, it will default to Sunday. Values: `DAY_OF_WEEK_UNSPECIFIED`, `MONDAY`, `TUESDAY`, `WEDNESDAY`, `THURSDAY`, `FRIDAY`, `SATURDAY`, `SUNDAY`. |
| `autoFullBackupWindow` | string enum | Optional. The window in which the full backup should be performed on the database. If no value is provided, the default is anytime. Values: `BACKUP_WINDOW_UNSPECIFIED`, `SLOT_ONE`, `SLOT_TWO`, `SLOT_THREE`, `SLOT_FOUR`, `SLOT_FIVE`, `SLOT_SIX`, `SLOT_SEVEN`, `SLOT_EIGHT`, `SLOT_NINE`, `SLOT_TEN`, `SLOT_ELEVEN`, `SLOT_TWELVE`. |
| `autoIncrementalBackupWindow` | string enum | Optional. The window in which the incremental backup should be performed on the database. If no value is provided, the default is anytime except the auto full backup day. Values: `BACKUP_WINDOW_UNSPECIFIED`, `SLOT_ONE`, `SLOT_TWO`, `SLOT_THREE`, `SLOT_FOUR`, `SLOT_FIVE`, `SLOT_SIX`, `SLOT_SEVEN`, `SLOT_EIGHT`, `SLOT_NINE`, `SLOT_TEN`, `SLOT_ELEVEN`, `SLOT_TWELVE`. |
| `backupDeletionPolicy` | string enum | Optional. This defines when the backups will be deleted after Database termination. Values: `BACKUP_DELETION_POLICY_UNSPECIFIED`, `DELETE_IMMEDIATELY`, `DELETE_AFTER_RETENTION_PERIOD`. |
| `backupDestinationDetails` | array<BackupDestinationDetails> | Optional. Details of the database backup destinations. |
| `retentionPeriodDays` | integer (int32) | Optional. The number of days an automatic backup is retained before being automatically deleted. This value determines the earliest point in time to which a database can be restored. Min: 1, Max: 60. |

### `DbHome`

- Details of the Database Home resource.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `database` | Database | Required. The Database resource. |
| `dbVersion` | string | Required. A valid Oracle Database version. For a list of supported versions, use the ListDbVersions operation. |
| `displayName` | string | Optional. The display name for the Database Home. The name does not have to be unique within your project. |
| `isUnifiedAuditingEnabled` | boolean | Optional. Whether unified auditing is enabled for the Database Home. |

### `DbNode`

- Details of the database node resource. https://docs.oracle.com/en-us/iaas/api/#/en/database/20160918/DbNode/
- Version: v1

| Field | Type | Description |
|---|---|---|
| `name` | string | Identifier. The name of the database node resource in the following format: projects/{project}/locations/{location}/cloudVmClusters/{cloud_vm_cluster}/dbNodes/{db_node} |
| `properties` | DbNodeProperties | Optional. Various properties of the database node. |

### `DbNodeProperties`

- Various properties and settings associated with Db node.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. The date and time that the database node was created. |
| `dbNodeStorageSizeGb` | integer (int32) | Optional. Local storage per database node. |
| `dbServerOcid` | string | Optional. Database server OCID. |
| `hostname` | string | Optional. DNS |
| `memorySizeGb` | integer (int32) | Memory allocated in GBs. |
| `ocid` | string | Output only. OCID of database node. |
| `ocpuCount` | integer (int32) | Optional. OCPU count per database node. |
| `state` | string enum | Output only. State of the database node. Values: `STATE_UNSPECIFIED`, `PROVISIONING`, `AVAILABLE`, `UPDATING`, `STOPPING`, `STOPPED`, `STARTING`, `TERMINATING`, `TERMINATED`, `FAILED`. |
| `totalCpuCoreCount` | integer (int32) | Total CPU core count of the database node. |

### `DbServer`

- Details of the database server resource. https://docs.oracle.com/en-us/iaas/api/#/en/database/20160918/DbServer/
- Version: v1

| Field | Type | Description |
|---|---|---|
| `displayName` | string | Optional. User friendly name for this resource. |
| `name` | string | Identifier. The name of the database server resource with the format: projects/{project}/locations/{location}/cloudExadataInfrastructures/{cloud_exadata_infrastructure}/dbServers/{db_server} |
| `properties` | DbServerProperties | Optional. Various properties of the database server. |

### `DbServerProperties`

- Various properties and settings associated with Exadata database server.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `dbNodeIds` | array<string> | Output only. OCID of database nodes associated with the database server. |
| `dbNodeStorageSizeGb` | integer (int32) | Optional. Local storage per VM. |
| `maxDbNodeStorageSizeGb` | integer (int32) | Optional. Maximum local storage per VM. |
| `maxMemorySizeGb` | integer (int32) | Optional. Maximum memory allocated in GBs. |
| `maxOcpuCount` | integer (int32) | Optional. Maximum OCPU count per database. |
| `memorySizeGb` | integer (int32) | Optional. Memory allocated in GBs. |
| `ocid` | string | Output only. OCID of database server. |
| `ocpuCount` | integer (int32) | Optional. OCPU count per database. |
| `state` | string enum | Output only. State of the database server. Values: `STATE_UNSPECIFIED`, `CREATING`, `AVAILABLE`, `UNAVAILABLE`, `DELETING`, `DELETED`. |
| `vmCount` | integer (int32) | Optional. Vm count per database. |

### `DbSystem`

- Details of the DbSystem (BaseDB) resource. https://docs.oracle.com/en-us/iaas/api/#/en/database/20160918/DbSystem/
- Version: v1

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. The date and time that the DbSystem was created. |
| `displayName` | string | Required. Immutable. The display name for the System db. The name does not have to be unique within your project. |
| `entitlementId` | string | Output only. The ID of the subscription entitlement associated with the DbSystem |
| `gcpOracleZone` | string | Optional. Immutable. The GCP Oracle zone where Oracle DbSystem is hosted. Example: us-east4-b-r2. If not specified, the system will pick a zone based on availability. |
| `labels` | object | Optional. The labels or tags associated with the DbSystem. |
| `name` | string | Identifier. The name of the DbSystem resource in the following format: projects/{project}/locations/{region}/dbSystems/{db_system} |
| `ociUrl` | string | Output only. HTTPS link to OCI resources exposed to Customer via UI Interface. |
| `odbNetwork` | string | Optional. Immutable. The name of the OdbNetwork associated with the DbSystem. Format: projects/{project}/locations/{location}/odbNetworks/{odb_network} It is optional but if specified, this should match the parent ODBNetwork of the OdbSubnet. |
| `odbSubnet` | string | Required. Immutable. The name of the OdbSubnet associated with the DbSystem for IP allocation. Format: projects/{project}/locations/{location}/odbNetworks/{odb_network}/odbSubnets/{odb_subnet} |
| `properties` | DbSystemProperties | Optional. Immutable. The properties of the DbSystem. |

### `DbSystemComputePerformance`

- Details of the DbSystem compute performance resource.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `computePerformances` | array<ComputePerformance> | Output only. List of Compute performance details for the specified DB system shape. |
| `name` | string | Identifier. The name of the DbSystemComputePerformance resource with the format: projects/{project}/locations/{location}/dbSystemComputePerformances/{db_system_compute_performance} |
| `shape` | string | Output only. The shape of the DB system. |

### `DbSystemInitialStorageSize`

- Summary of the DbSystem initial storage size.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `name` | string | Output only. The name of the resource. |
| `properties` | DbSystemInitialStorageSizeProperties | Output only. The properties of the DbSystem initial storage size summary. |

### `DbSystemInitialStorageSizeProperties`

- The properties of a DbSystem initial storage size summary.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `launchFromBackupStorageSizeDetails` | array<StorageSizeDetails> | Output only. List of storage disk details available for launches from backup. |
| `shapeType` | string enum | Output only. VM shape platform type Values: `SHAPE_TYPE_UNSPECIFIED`, `STANDARD_X86`. |
| `storageManagement` | string enum | Output only. The storage option used in DB system. Values: `STORAGE_MANAGEMENT_UNSPECIFIED`, `ASM`, `LVM`. |
| `storageSizeDetails` | array<StorageSizeDetails> | Output only. List of storage disk details. |

### `DbSystemOptions`

- Details of the DbSystem Options.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `storageManagement` | string enum | Optional. The storage option used in DB system. Values: `STORAGE_MANAGEMENT_UNSPECIFIED`, `ASM`, `LVM`. |

### `DbSystemProperties`

- The properties of a DbSystem.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `computeCount` | integer (int32) | Required. The number of CPU cores to enable for the DbSystem. |
| `computeModel` | string enum | Optional. The compute model of the DbSystem. Values: `COMPUTE_MODEL_UNSPECIFIED`, `ECPU`, `OCPU`. |
| `dataCollectionOptions` | DataCollectionOptionsDbSystem | Optional. Data collection options for diagnostics. |
| `dataStorageSizeGb` | integer (int32) | Optional. The data storage size in GB that is currently available to DbSystems. The value is same as initial_data_storage_size_gb. This can be modified from OCI console. |
| `databaseEdition` | string enum | Required. The database edition of the DbSystem. Values: `DB_SYSTEM_DATABASE_EDITION_UNSPECIFIED`, `STANDARD_EDITION`, `ENTERPRISE_EDITION`, `ENTERPRISE_EDITION_HIGH_PERFORMANCE`. |
| `dbHome` | DbHome | Optional. Details for creating a Database Home. |
| `dbSystemOptions` | DbSystemOptions | Optional. The options for the DbSystem. |
| `domain` | string | Optional. The host domain name of the DbSystem. |
| `hostname` | string | Output only. The hostname of the DbSystem. |
| `hostnamePrefix` | string | Optional. Prefix for DB System host names. |
| `initialDataStorageSizeGb` | integer (int32) | Required. The initial data storage size in GB. |
| `licenseModel` | string enum | Required. The license model of the DbSystem. Values: `LICENSE_MODEL_UNSPECIFIED`, `LICENSE_INCLUDED`, `BRING_YOUR_OWN_LICENSE`. |
| `lifecycleState` | string enum | Output only. State of the DbSystem. Values: `DB_SYSTEM_LIFECYCLE_STATE_UNSPECIFIED`, `PROVISIONING`, `AVAILABLE`, `UPDATING`, `TERMINATING`, `TERMINATED`, `FAILED`, `MIGRATED`, `MAINTENANCE_IN_PROGRESS`, `NEEDS_ATTENTION`, `UPGRADING`. |
| `memorySizeGb` | integer (int32) | Optional. The memory size in GB. This value can not be set and is automatically calculated based on the number of ECPUs allocated to the DbSystem. |
| `nodeCount` | integer (int32) | Optional. The number of nodes to launch for a virtual machine DbSystem. By default this will be set to 1. |
| `ocid` | string | Output only. OCID of the DbSystem. |
| `privateIp` | string | Optional. The private IP address of the DbSystem. |
| `recoStorageSizeGb` | integer (int32) | Optional. The reco/redo storage size in GB. The value for recovery storage size is based on the available data storage size. |
| `shape` | string | Required. Shape of DB System. |
| `sshPublicKeys` | array<string> | Required. SSH public keys to be stored with the DbSystem. |
| `timeZone` | TimeZone | Optional. Time zone of the DbSystem. |

### `DbSystemShape`

- Details of the Database System Shapes resource. https://docs.oracle.com/en-us/iaas/api/#/en/database/20160918/DbSystemShapeSummary/
- Version: v1

| Field | Type | Description |
|---|---|---|
| `availableCoreCount` | integer (int32) | Optional. Available core count. |
| `availableCoreCountPerNode` | integer (int32) | Optional. Number of cores per node. |
| `availableDataStorageTb` | integer (int32) | Optional. Storage per storage server in terabytes. |
| `availableMemoryPerNodeGb` | integer (int32) | Optional. Memory per database server node in gigabytes. |
| `coreCountIncrement` | integer (int32) | Optional. Core count increment. |
| `maxNodeCount` | integer (int32) | Optional. Maximum number of database servers. |
| `maxStorageCount` | integer (int32) | Optional. Maximum number of storage servers. |
| `minCoreCountPerNode` | integer (int32) | Optional. Minimum core count per node. |
| `minDbNodeStoragePerNodeGb` | integer (int32) | Optional. Minimum node storage per database server in gigabytes. |
| `minMemoryPerNodeGb` | integer (int32) | Optional. Minimum memory per node in gigabytes. |
| `minNodeCount` | integer (int32) | Optional. Minimum number of database servers. |
| `minStorageCount` | integer (int32) | Optional. Minimum number of storage servers. |
| `minimumCoreCount` | integer (int32) | Optional. Minimum core count per node. |
| `name` | string | Identifier. The name of the Database System Shape resource with the format: projects/{project}/locations/{region}/dbSystemShapes/{db_system_shape} |
| `shape` | string | Optional. shape |

### `DbVersion`

- A valid Oracle Database version.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `name` | string | Output only. The name of the DbVersion resource in the following format: projects/{project}/locations/{region}/dbVersions/{db_version} |
| `properties` | DbVersionProperties | Output only. The properties of the DbVersion. |

### `DbVersionProperties`

- The properties of a DbVersion.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `isLatestForMajorVersion` | boolean | Output only. True if this version of the Oracle Database software is the latest version for a release. |
| `isPreviewDbVersion` | boolean | Output only. True if this version of the Oracle Database software is the preview version. |
| `isUpgradeSupported` | boolean | Output only. True if this version of the Oracle Database software is supported for Upgrade. |
| `supportsPdb` | boolean | Output only. True if this version of the Oracle Database software supports pluggable databases. |
| `version` | string | Output only. A valid Oracle Database version. |

### `DefinedTagValue`

- Wrapper message for the value of a defined tag.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `tags` | object | The tags within the namespace. |

### `DeploymentDiagnosticData`

- The deployment diagnostic data.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `bucket` | string | Output only. The bucket name. |
| `diagnosticEndTime` | string (google-datetime) | Output only. The time diagnostic end. |
| `diagnosticStartTime` | string (google-datetime) | Output only. The time diagnostic start. |
| `diagnosticState` | string enum | Output only. The diagnostic state. Values: `DIAGNOSTIC_STATE_UNSPECIFIED`, `IN_PROGRESS`, `SUCCEEDED`, `FAILED`. |
| `namespace` | string | Output only. The namespace name. |
| `object` | string | Output only. The object name. |

### `DisableCloudVmClusterIdentityConnectorRequest`

- The request for `CloudVmCluster.DisableCloudVmClusterIdentityConnector`.
- Version: v1

### `DisableExadbVmClusterIdentityConnectorRequest`

- The request for `ExadbVmCluster.DisableExadbVmClusterIdentityConnector`.
- Version: v1

### `Empty`

- A generic empty message that you can re-use to avoid defining duplicated empty messages in your APIs. A typical example is to use it as the request or the response type of an API method. For instance: service Foo { rpc Bar(google.protobuf.Empty) returns (google.protobuf.Empty); }
- Version: v1

### `EnableCloudVmClusterIdentityConnectorRequest`

- The request for `CloudVmCluster.EnableCloudVmClusterIdentityConnector`.
- Version: v1

### `EnableExadbVmClusterIdentityConnectorRequest`

- The request for `ExadbVmCluster.EnableExadbVmClusterIdentityConnector`.
- Version: v1

### `EncryptionKey`

- The encryption key used to encrypt the Autonomous Database.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `kmsKey` | string | Optional. The KMS key used to encrypt the Autonomous Database. This field is required if the provider is GOOGLE_MANAGED. The name of the KMS key resource in the following format: `projects/{project}/locations/{location}/keyRings/{key_ring}/cryptoKeys/{crypto_key}`. |
| `provider` | string enum | Optional. The provider of the encryption key. Values: `PROVIDER_UNSPECIFIED`, `GOOGLE_MANAGED`, `ORACLE_MANAGED`. |

### `EncryptionKeyHistoryEntry`

- The history of the encryption keys used to encrypt the Autonomous Database.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `activationTime` | string (google-datetime) | Output only. The date and time when the encryption key was activated on the Autonomous Database.. |
| `encryptionKey` | EncryptionKey | Output only. The encryption key used to encrypt the Autonomous Database. |

### `Entitlement`

- Details of the Entitlement resource.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `cloudAccountDetails` | CloudAccountDetails | Details of the OCI Cloud Account. |
| `entitlementId` | string | Output only. Google Cloud Marketplace order ID (aka entitlement ID) |
| `name` | string | Identifier. The name of the Entitlement resource with the format: projects/{project}/locations/{region}/entitlements/{entitlement} |
| `state` | string enum | Output only. Entitlement State. Values: `STATE_UNSPECIFIED`, `ACCOUNT_NOT_LINKED`, `ACCOUNT_NOT_ACTIVE`, `ACTIVE`, `ACCOUNT_SUSPENDED`, `NOT_APPROVED_IN_PRIVATE_MARKETPLACE`. |

### `ExadbVmCluster`

- ExadbVmCluster represents a cluster of VMs that are used to run Exadata workloads. https://docs.oracle.com/en-us/iaas/api/#/en/database/20160918/ExadbVmCluster/
- Version: v1

| Field | Type | Description |
|---|---|---|
| `backupOdbSubnet` | string | Required. Immutable. The name of the backup OdbSubnet associated with the ExadbVmCluster. Format: projects/{project}/locations/{location}/odbNetworks/{odb_network}/odbSubnets/{odb_subnet} |
| `createTime` | string (google-datetime) | Output only. The date and time that the ExadbVmCluster was created. |
| `displayName` | string | Required. Immutable. The display name for the ExadbVmCluster. The name does not have to be unique within your project. The name must be 1-255 characters long and can only contain alphanumeric characters. |
| `entitlementId` | string | Output only. The ID of the subscription entitlement associated with the ExadbVmCluster. |
| `gcpOracleZone` | string | Output only. Immutable. The GCP Oracle zone where Oracle ExadbVmCluster is hosted. Example: us-east4-b-r2. During creation, the system will pick the zone assigned to the ExascaleDbStorageVault. |
| `identityConnector` | IdentityConnector | Output only. The identity connector details which will allow OCI to securely access the resources in the customer project. |
| `identityConnectorDisabled` | boolean | Optional. Input only. Immutable. If set to true, disables the automatic provisioning of the Workload Identity Connector during creation. If set to false or omitted, the Workload Identity Connector will be automatically provisioned by default. Note: Provisioning the Workload Identity Connector is a prerequisite for enabling Google Cloud CMEK. |
| `labels` | object | Optional. The labels or tags associated with the ExadbVmCluster. |
| `name` | string | Identifier. The name of the ExadbVmCluster resource in the following format: projects/{project}/locations/{region}/exadbVmClusters/{exadb_vm_cluster} |
| `odbNetwork` | string | Optional. Immutable. The name of the OdbNetwork associated with the ExadbVmCluster. Format: projects/{project}/locations/{location}/odbNetworks/{odb_network} It is optional but if specified, this should match the parent ODBNetwork of the OdbSubnet. |
| `odbSubnet` | string | Required. Immutable. The name of the OdbSubnet associated with the ExadbVmCluster for IP allocation. Format: projects/{project}/locations/{location}/odbNetworks/{odb_network}/odbSubnets/{odb_subnet} |
| `properties` | ExadbVmClusterProperties | Required. The properties of the ExadbVmCluster. |

### `ExadbVmClusterProperties`

- The properties of an ExadbVmCluster.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `additionalEcpuCountPerNode` | integer (int32) | Optional. Immutable. The number of additional ECPUs per node for an Exadata VM cluster on exascale infrastructure. |
| `clusterName` | string | Optional. Immutable. The cluster name for Exascale vm cluster. The cluster name must begin with an alphabetic character and may contain hyphens(-) but can not contain underscores(\_). It should be not more than 11 characters and is not case sensitive. OCI Cluster name. |
| `dataCollectionOptions` | DataCollectionOptionsCommon | Optional. Immutable. Indicates user preference for data collection options. |
| `enabledEcpuCountPerNode` | integer (int32) | Required. Immutable. The number of ECPUs enabled per node for an exadata vm cluster on exascale infrastructure. |
| `exascaleDbStorageVault` | string | Required. Immutable. The name of ExascaleDbStorageVault associated with the ExadbVmCluster. It can refer to an existing ExascaleDbStorageVault. Or a new one can be created during the ExadbVmCluster creation (requires storage_vault_properties to be set). Format: projects/{project}/locations/{location}/exascaleDbStorageVaults/{exascale_db_storage_vault} |
| `giVersion` | string | Output only. The Oracle Grid Infrastructure (GI) software version. |
| `gridImageId` | string | Required. Immutable. Grid Infrastructure Version. |
| `hostname` | string | Output only. The hostname of the ExadbVmCluster. |
| `hostnamePrefix` | string | Required. Immutable. Prefix for VM cluster host names. |
| `licenseModel` | string enum | Optional. Immutable. The license type of the ExadbVmCluster. Values: `LICENSE_MODEL_UNSPECIFIED`, `LICENSE_INCLUDED`, `BRING_YOUR_OWN_LICENSE`. |
| `lifecycleState` | string enum | Output only. State of the cluster. Values: `EXADB_VM_CLUSTER_LIFECYCLE_STATE_UNSPECIFIED`, `PROVISIONING`, `AVAILABLE`, `UPDATING`, `TERMINATING`, `TERMINATED`, `FAILED`, `MAINTENANCE_IN_PROGRESS`. |
| `memorySizeGb` | integer (int32) | Output only. Memory per VM (GB) (Read-only): Shows the amount of memory allocated to each VM. Memory is calculated based on 2.75 GB per Total ECPUs. |
| `nodeCount` | integer (int32) | Required. The number of nodes/VMs in the ExadbVmCluster. |
| `ociUri` | string | Output only. Deep link to the OCI console to view this resource. |
| `scanListenerPortTcp` | integer (int32) | Optional. Immutable. SCAN listener port - TCP |
| `shapeAttribute` | string enum | Required. Immutable. The shape attribute of the VM cluster. The type of Exascale storage used for Exadata VM cluster. The default is SMART_STORAGE which supports Oracle Database 23ai and later Values: `SHAPE_ATTRIBUTE_UNSPECIFIED`, `SMART_STORAGE`, `BLOCK_STORAGE`. |
| `sshPublicKeys` | array<string> | Required. Immutable. The SSH public keys for the ExadbVmCluster. |
| `timeZone` | TimeZone | Optional. Immutable. The time zone of the ExadbVmCluster. |
| `vmFileSystemStorage` | ExadbVmClusterStorageDetails | Required. Immutable. Total storage details for the ExadbVmCluster. |

### `ExadbVmClusterStorageDetails`

- The storage allocation for the exadbvmcluster, in gigabytes (GB).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `sizeInGbsPerNode` | integer (int32) | Required. The storage allocation for the exadbvmcluster per node, in gigabytes (GB). This field is used to calculate the total storage allocation for the exadbvmcluster. |

### `ExascaleConfig`

- Details of the Exascale configuration for the Exadata Infrastructure.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `availableStorageSizeGb` | integer (int32) | Output only. Available storage size for Exascale in GBs. |
| `availableVmStorageSizeGb` | integer (int32) | Output only. Available storage size for VM storage on Exascale in GBs. |
| `totalStorageSizeGb` | integer (int32) | Output only. Total storage size needed for Exascale in GBs. |
| `totalVmStorageSizeGb` | integer (int32) | Output only. Storage size needed for VM storage on Exascale in GBs. |

### `ExascaleDbStorageDetails`

- The storage details of the ExascaleDbStorageVault.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `availableSizeGbs` | integer (int32) | Output only. The available storage capacity for the ExascaleDbStorageVault, in gigabytes (GB). |
| `totalSizeGbs` | integer (int32) | Required. The total storage allocation for the ExascaleDbStorageVault, in gigabytes (GB). |

### `ExascaleDbStorageVault`

- ExascaleDbStorageVault represents a storage vault exadb vm cluster resource. https://docs.oracle.com/en-us/iaas/api/#/en/database/20160918/ExascaleDbStorageVault/
- Version: v1

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. The date and time when the ExascaleDbStorageVault was created. |
| `displayName` | string | Required. Immutable. The display name for the ExascaleDbStorageVault. The name does not have to be unique within your project. The name must be 1-255 characters long and can only contain alphanumeric characters. |
| `entitlementId` | string | Output only. The ID of the subscription entitlement associated with the ExascaleDbStorageVault. |
| `exadataInfrastructure` | string | Optional. Immutable. The Exadata Infrastructure resource on which ExascaleDbStorageVault resource is created, in the following format: projects/{project}/locations/{region}/cloudExadataInfrastuctures/{cloud_extradata_infrastructure} |
| `gcpOracleZone` | string | Optional. Immutable. The GCP Oracle zone where Oracle ExascaleDbStorageVault is hosted. Example: us-east4-b-r2. If not specified, the system will pick a zone based on availability. |
| `labels` | object | Optional. The labels or tags associated with the ExascaleDbStorageVault. |
| `name` | string | Identifier. The resource name of the ExascaleDbStorageVault. Format: projects/{project}/locations/{location}/exascaleDbStorageVaults/{exascale_db_storage_vault} |
| `properties` | ExascaleDbStorageVaultProperties | Required. Immutable. The properties of the ExascaleDbStorageVault. |

### `ExascaleDbStorageVaultProperties`

- The properties of the ExascaleDbStorageVault. next ID: 12
- Version: v1

| Field | Type | Description |
|---|---|---|
| `additionalFlashCachePercent` | integer (int32) | Optional. The size of additional flash cache in percentage of high capacity database storage. |
| `attachedShapeAttributes` | array<string> | Output only. The shape attributes of the VM clusters attached to the ExascaleDbStorageVault. Values: `SHAPE_ATTRIBUTE_UNSPECIFIED`, `SMART_STORAGE`, `BLOCK_STORAGE`. |
| `availableShapeAttributes` | array<string> | Output only. The shape attributes available for the VM clusters to be attached to the ExascaleDbStorageVault. Values: `SHAPE_ATTRIBUTE_UNSPECIFIED`, `SMART_STORAGE`, `BLOCK_STORAGE`. |
| `description` | string | Optional. The description of the ExascaleDbStorageVault. |
| `exascaleDbStorageDetails` | ExascaleDbStorageDetails | Required. The storage details of the ExascaleDbStorageVault. |
| `ociUri` | string | Output only. Deep link to the OCI console to view this resource. |
| `ocid` | string | Output only. The OCID for the ExascaleDbStorageVault. |
| `state` | string enum | Output only. The state of the ExascaleDbStorageVault. Values: `STATE_UNSPECIFIED`, `PROVISIONING`, `AVAILABLE`, `UPDATING`, `TERMINATING`, `TERMINATED`, `FAILED`. |
| `timeZone` | TimeZone | Output only. The time zone of the ExascaleDbStorageVault. |
| `vmClusterCount` | integer (int32) | Output only. The number of VM clusters associated with the ExascaleDbStorageVault. |
| `vmClusterIds` | array<string> | Output only. The list of VM cluster OCIDs associated with the ExascaleDbStorageVault. |

### `ExecuteSqlMetadata`

- Any additional metadata information regarding the execution of the SQL
- Version: v1

| Field | Type | Description |
|---|---|---|
| `executionDuration` | string (google-duration) | The time duration taken to execute the sql statement. |
| `message` | string | Message related to SQL execution. This field can be used to convey size limit related message. |
| `partialResult` | boolean | Set to true if SQL returned a result set larger than the acceptable response size limits and the result was truncated. |
| `status` | string enum | Output only. Status of SQL execution. Values: `STATUS_UNSPECIFIED`, `OK`, `PARTIAL`, `ERROR`. |

### `ExecuteSqlRequest`

- The request for `DatabaseConnection.ExecuteSql`.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `params` | array<SqlParameter> | Optional. Optional: Bind variables (parameters) to be used with the SQL statement. Supports named bind variables (e.g., :dept_id, :status in Oracle SQL) or positional parameters (:1, :2). |
| `sqlStatement` | string | Required. The SQL statement to execute. |

### `ExecuteSqlResponse`

- Execute a SQL statement response.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `metadata` | ExecuteSqlMetadata | Any additional metadata information regarding the execution of the sql statement. |
| `sqlResults` | array<SqlResult> | SqlResult represents the results for the execution of sql statements. |

### `FailoverAutonomousDatabaseRequest`

- The request for `OracleDatabase.FailoverAutonomousDatabase`.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `peerAutonomousDatabase` | string | Optional. The peer database name to fail over to. Required for cross-region standby, and must be omitted for in-region Data Guard. |

### `FlexComponent`

- Details of the Flex Component resource.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `name` | string | Identifier. Specifies the name of the Flex Component resource with the format: projects/{project}/locations/{region}/flexComponents/{flex_component} |
| `properties` | FlexComponentProperties | Output only. The properties of the Flex Component. |

### `FlexComponentProperties`

- The properties of the Flex Component.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `availableCoreCount` | integer (int32) | Output only. The maximum number of CPU cores that can be enabled on the DB system for this shape. |
| `availableDbNodeStoragePerNodeGb` | integer (int32) | Output only. The maximum storage that can be enabled on the Storage Server for this Flex Component. |
| `availableLocalStorageGb` | integer (int32) | Output only. The maximum local storage that can be enabled on the DB Server for this Flex Component. |
| `availableMemoryGb` | integer (int32) | Output only. The maximum memory size that can be enabled on the DB Server for this Flex Component. |
| `computeModel` | string enum | Output only. The compute model of the DB Server for this Flex Component. Values: `COMPUTE_MODEL_UNSPECIFIED`, `COMPUTE_MODEL_ECPU`, `COMPUTE_MODEL_OCPU`. |
| `descriptionSummary` | string | Output only. The description summary for this Flex Component. |
| `hardwareType` | string enum | Output only. The hardware type of the DB (Compute) or Storage (Cell) Server for this Flex Component. Values: `HARDWARE_TYPE_UNSPECIFIED`, `COMPUTE`, `CELL`. |
| `minimumCoreCount` | integer (int32) | Output only. The minimum number of CPU cores that can be enabled on the DB Server for this Flex Component. |
| `name` | string | Output only. The name of the Flex Component used for the DB system. |
| `runtimeMinimumCoreCount` | integer (int32) | Output only. The runtime minimum number of CPU cores that can be enabled for this Flex Component. |
| `shape` | string | Output only. The name of the DB system shape for this Flex Component. |

### `GenerateAutonomousDatabaseWalletRequest`

- The request for `AutonomousDatabase.GenerateWallet`.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `isRegional` | boolean | Optional. True when requesting regional connection strings in PDB connect info, applicable to cross-region Data Guard only. |
| `password` | string | Required. The password used to encrypt the keys inside the wallet. The password must be a minimum of 8 characters. |
| `type` | string enum | Optional. The type of wallet generation for the Autonomous Database. The default value is SINGLE. Values: `GENERATE_TYPE_UNSPECIFIED`, `ALL`, `SINGLE`. |

### `GenerateAutonomousDatabaseWalletResponse`

- The response for `AutonomousDatabase.GenerateWallet`.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `archiveContent` | string (byte) | Output only. The base64 encoded wallet files. |

### `GiVersion`

- Details of the Oracle Grid Infrastructure (GI) version resource. https://docs.oracle.com/en-us/iaas/api/#/en/database/20160918/GiVersionSummary/
- Version: v1

| Field | Type | Description |
|---|---|---|
| `name` | string | Identifier. The name of the Oracle Grid Infrastructure (GI) version resource with the format: projects/{project}/locations/{region}/giVersions/{gi_versions} |
| `version` | string | Optional. version |

### `GlueIcebergCatalog`

- The Glue Iceberg catalog.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `glueId` | string | Required. The catalog ID of Glue. |

### `GoldengateAmazonKinesisConnectionProperties`

- The properties of GoldengateAmazonKinesisConnection.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `accessKeyId` | string | Optional. Access key ID to access the Amazon Kinesis. |
| `awsRegion` | string | Optional. The name of the AWS region. If not provided, Goldengate will default to 'us-west-1'. |
| `endpoint` | string | Optional. The endpoint URL of the Amazon Kinesis service. e.g.: 'https://kinesis.us-east-1.amazonaws.com' If not provided, Goldengate will default to 'https://kinesis..amazonaws.com'. |
| `secretAccessKeySecret` | string | Optional. Secret access key to access the Amazon Kinesis. |
| `technologyType` | string | Optional. The technology type of AmazonKinesisConnection. |

### `GoldengateAmazonRedshiftConnectionProperties`

- The properties of GoldengateAmazonRedshiftConnection.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `connectionUrl` | string | Optional. Connection URL. e.g.: 'jdbc:redshift://aws-redshift-instance.aaaaaaaaaaaa.us-east-2.redshift.amazonaws.com:5439/mydb' |
| `password` | string | Optional. Input only. The password Oracle Goldengate uses for Amazon Redshift connection in plain text. |
| `passwordSecretVersion` | string | Optional. Input only. The resource name of a secret version in Secret Manager which contains the password Oracle Goldengate uses for Amazon Redshift connection. Format: projects/{project}/secrets/{secret}/versions/{version}. |
| `technologyType` | string | Optional. The technology type of AmazonRedshiftConnection. |
| `username` | string | Optional. The username Oracle Goldengate uses to connect the associated system of the given technology. |

### `GoldengateAmazonS3ConnectionProperties`

- The properties of GoldengateAmazonS3Connection.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `accessKeyId` | string | Optional. Access key ID to access the Amazon S3 bucket. |
| `endpoint` | string | Optional. The Amazon Endpoint for S3. |
| `region` | string | Optional. The name of the AWS region where the bucket is created. |
| `secretAccessKeySecret` | string | Optional. Secret access key to access the Amazon S3 bucket. |
| `technologyType` | string | Optional. The technology type of AmazonS3Connection. |

### `GoldengateAzureDataLakeStorageConnectionProperties`

- The properties of GoldengateAzureDataLakeStorageConnection.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `account` | string | Optional. Sets the Azure storage account name. |
| `accountKeySecret` | string | Optional. Azure storage account key. This property is required when 'authentication_type' is set to 'SHARED_KEY'. |
| `authenticationType` | string enum | Optional. Authentication mechanism to access Azure Data Lake Storage. Values: `AUTHENTICATION_TYPE_UNSPECIFIED`, `SHARED_KEY`, `SHARED_ACCESS_SIGNATURE`, `AZURE_ACTIVE_DIRECTORY`. |
| `azureAuthorityHost` | string | Optional. The endpoint used for authentication with Microsoft Entra ID (formerly Azure Active Directory). Default value: https://login.microsoftonline.com |
| `azureTenantId` | string | Optional. Azure tenant ID of the application. This property is required when 'authentication_type' is set to 'AZURE_ACTIVE_DIRECTORY'. |
| `clientId` | string | Optional. Azure client ID of the application. This property is required when 'authentication_type' is set to 'AZURE_ACTIVE_DIRECTORY'. |
| `clientSecret` | string | Optional. Azure client secret (aka application password) for authentication. |
| `endpoint` | string | Optional. Azure Storage service endpoint. e.g: https://test.blob.core.windows.net |
| `sasTokenSecret` | string | Optional. Credential that uses a shared access signature (SAS) to authenticate to an Azure Service. |
| `technologyType` | string | Optional. The technology type of AzureDataLakeStorageConnection. |

### `GoldengateAzureSynapseAnalyticsConnectionProperties`

- The properties of GoldengateAzureSynapseAnalyticsConnection.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `connectionString` | string | Optional. JDBC connection string. e.g.: 'jdbc:sqlserver://.sql.azuresynapse.net:1433;database=;encrypt=true;trustServerCertificate=false;hostNameInCertificate=\*.sql.azuresynapse.net;loginTimeout=300;' |
| `password` | string | Optional. Input only. The password Oracle Goldengate uses for Azure Synapse Analytics connection in plain text. |
| `passwordSecretVersion` | string | Optional. Input only. The resource name of a secret version in Secret Manager which contains the password Oracle Goldengate uses for Azure Synapse Analytics connection. Format: projects/{project}/secrets/{secret}/versions/{version}. |
| `technologyType` | string | Optional. The technology type of AzureSynapseAnalyticsConnection. |
| `username` | string | Optional. The username Oracle Goldengate uses to connect the associated system of the given technology. |

### `GoldengateBackupSchedule`

- The backup schedule of the GoldengateDeployment.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `backupScheduledTime` | string (google-datetime) | Output only. The timestamp of when the backup was scheduled. |
| `bucket` | string | Output only. The bucket name. |
| `compartmentId` | string | Output only. The compartment id. |
| `frequencyBackupScheduled` | string enum | Output only. The frequency backup scheduled. Values: `FREQUENCY_BACKUP_SCHEDULED_UNSPECIFIED`, `DAILY`, `WEEKLY`, `MONTHLY`. |
| `metadataOnly` | boolean | Output only. If metadata only. |
| `namespace` | string | Output only. The namespace name. |

### `GoldengateConnection`

- Details of the GoldengateConnection resource.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. The date and time that the GoldengateConnection was created. |
| `entitlementId` | string | Output only. The ID of the subscription entitlement associated with the GoldengateConnection. |
| `gcpOracleZone` | string | Optional. Immutable. The GCP Oracle zone where Oracle GoldengateConnection is hosted. Example: us-east4-b-r2. If not specified, the system will pick a zone based on availability. |
| `labels` | object | Optional. The labels or tags associated with the GoldengateConnection. |
| `name` | string | Identifier. The name of the GoldengateConnection resource in the following format: projects/{project}/locations/{region}/goldengateConnections/{goldengate_connection} |
| `ociUrl` | string | Output only. HTTPS link to OCI resources exposed to Customer via UI Interface. |
| `odbNetwork` | string | Optional. Immutable. The name of the OdbNetwork associated with the GoldengateConnection. The format is projects/{project}/locations/{location}/odbNetworks/{odb_network}. It is optional but if specified, this should match the parent ODBNetwork of the OdbSubnet. |
| `odbSubnet` | string | Optional. Immutable. The name of the OdbSubnet associated with the GoldengateConnection for IP allocation. Format: projects/{project}/locations/{location}/odbNetworks/{odb_network}/odbSubnets/{odb_subnet} |
| `properties` | GoldengateConnectionProperties | Required. Immutable. The properties of the GoldengateConnection. |

### `GoldengateConnectionAssignment`

- Represents the metadata of a Goldengate Connection Assignment.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. The time when the connection assignment was created. |
| `displayName` | string | Optional. Immutable. The display name for the GoldengateConnectionAssignment. |
| `entitlementId` | string | Output only. The OCID of the entitlement linked to this resource. |
| `labels` | object | Optional. The labels or tags associated with the GoldengateConnectionAssignment. |
| `name` | string | Identifier. The name of the GoldengateConnectionAssignment resource in the following format: projects/{project}/locations/{region}/goldengateConnectionAssignments/{goldengate_connection_assignment} |
| `properties` | GoldengateConnectionAssignmentProperties | Required. Immutable. The properties of the GoldengateConnectionAssignment. |

### `GoldengateConnectionAssignmentProperties`

- The properties of a GoldengateConnectionAssignment.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `alias` | string | Output only. Credential store alias. |
| `goldengateConnection` | string | Required. The GoldengateConnection resource to be assigned. Format: projects/{project}/locations/{location}/goldengateConnections/{goldengate_connection} |
| `goldengateDeployment` | string | Required. The GoldenGateDeployment to assign the connection to. Format: projects/{project}/locations/{location}/goldengateDeployments/{goldengate_deployment} |
| `ocid` | string | Output only. The OCID (https://docs.cloud.oracle.com/Content/General/Concepts/identifiers.htm) of the connection assignment being referenced. |
| `state` | string enum | Output only. The lifecycle state of the connection assignment. Values: `STATE_UNSPECIFIED`, `CREATING`, `ACTIVE`, `FAILED`, `UPDATING`, `DELETING`. |

### `GoldengateConnectionProperties`

- The properties of a GoldengateConnection.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `amazonKinesisConnectionProperties` | GoldengateAmazonKinesisConnectionProperties | Properties for an Amazon Kinesis connection. |
| `amazonRedshiftConnectionProperties` | GoldengateAmazonRedshiftConnectionProperties | Properties for an Amazon Redshift connection. |
| `amazonS3ConnectionProperties` | GoldengateAmazonS3ConnectionProperties | Properties for an Amazon S3 connection. |
| `azureDataLakeStorageConnectionProperties` | GoldengateAzureDataLakeStorageConnectionProperties | Properties for an Azure Data Lake Storage Connection. |
| `azureSynapseAnalyticsConnectionProperties` | GoldengateAzureSynapseAnalyticsConnectionProperties | Properties for an Azure Synapse Analytics connection. |
| `connectionType` | string enum | Required. The connection type. Values: `GOLDENGATE_CONNECTION_TYPE_UNSPECIFIED`, `GOLDENGATE`, `KAFKA`, `KAFKA_SCHEMA_REGISTRY`, `MYSQL`, `JAVA_MESSAGE_SERVICE`, `MICROSOFT_SQLSERVER`, `OCI_OBJECT_STORAGE`, `ORACLE`, `AZURE_DATA_LAKE_STORAGE`, `POSTGRESQL`, `AZURE_SYNAPSE_ANALYTICS`, `SNOWFLAKE`, `AMAZON_S3`, `HDFS`, `ORACLE_AI_DATA_PLATFORM`, `ORACLE_NOSQL`, `MONGODB`, `AMAZON_KINESIS`, `AMAZON_REDSHIFT`, `DB2`, `REDIS`, `ELASTICSEARCH`, `GENERIC`, `GOOGLE_CLOUD_STORAGE`, `GOOGLE_BIGQUERY`, `DATABRICKS`, `GOOGLE_PUBSUB`, `MICROSOFT_FABRIC`, `ICEBERG`. |
| `databricksConnectionProperties` | GoldengateDatabricksConnectionProperties | Properties for a Databricks connection. |
| `db2ConnectionProperties` | GoldengateDb2ConnectionProperties | Properties for a DB2 connection. |
| `description` | string | Optional. Metadata about this specific object. |
| `displayName` | string | Required. An object's Display Name. |
| `elasticsearchConnectionProperties` | GoldengateElasticsearchConnectionProperties | Properties for an Elasticsearch connection. |
| `genericConnectionProperties` | GoldengateGenericConnectionProperties | Properties for a Generic Connection. |
| `goldengateConnectionProperties` | GoldengateGoldengateConnectionProperties | Properties for a Goldengate Connection. |
| `googleBigQueryConnectionProperties` | GoldengateGoogleBigQueryConnectionProperties | Properties for a Google BigQuery Connection. |
| `googleCloudStorageConnectionProperties` | GoldengateGoogleCloudStorageConnectionProperties | Properties for a Google Cloud Storage Connection. |
| `googlePubsubConnectionProperties` | GoldengateGooglePubsubConnectionProperties | Properties for a Google Pub/Sub connection. |
| `hdfsConnectionProperties` | GoldengateHdfsConnectionProperties | Properties for an HDFS connection. |
| `icebergConnectionProperties` | GoldengateIcebergConnectionProperties | Properties for an Iceberg connection. |
| `ingressIpAddresses` | array<string> | Output only. The Ingress IPs of the GoldengateConnection. |
| `javaMessageServiceConnectionProperties` | GoldengateJavaMessageServiceConnectionProperties | Properties for a Java Message Service connection. |
| `kafkaConnectionProperties` | GoldengateKafkaConnectionProperties | Properties for a Kafka Connection. |
| `kafkaSchemaRegistryConnectionProperties` | GoldengateKafkaSchemaRegistryConnectionProperties | Properties for a Kafka Schema Registry Connection. |
| `lifecycleDetails` | string | Output only. Describes the object's current state in detail. For example, it can be used to provide actionable information for a resource in a Failed state. |
| `lifecycleState` | string enum | Output only. The lifecycle state of the connection. Values: `GOLDENGATE_CONNECTION_LIFECYCLE_STATE_UNSPECIFIED`, `CREATING`, `ACTIVE`, `UPDATING`, `DELETING`, `DELETED`, `FAILED`. |
| `microsoftFabricConnectionProperties` | GoldengateMicrosoftFabricConnectionProperties | Properties for a Microsoft Fabric connection. |
| `microsoftSqlserverConnectionProperties` | GoldengateMicrosoftSqlserverConnectionProperties | Properties for a Microsoft SQL Server connection. |
| `mongodbConnectionProperties` | GoldengateMongodbConnectionProperties | Properties for a MongoDB connection. |
| `mysqlConnectionProperties` | GoldengateMysqlConnectionProperties | Properties for a Mysql Connection. |
| `ociObjectStorageConnectionProperties` | GoldengateOciObjectStorageConnectionProperties | Properties for an OCI Object Storage Connection. |
| `ocid` | string | Output only. The \[OCID\] of the connection being referenced. |
| `oracleAiDataPlatformConnectionProperties` | GoldengateOracleAIDataPlatformConnectionProperties | Properties for an Oracle AI Data Platform connection. |
| `oracleConnectionProperties` | GoldengateOracleConnectionProperties | Properties for an Oracle Database Connection. |
| `oracleNosqlConnectionProperties` | GoldengateOracleNosqlConnectionProperties | Properties for an Oracle NoSQL connection. |
| `postgresqlConnectionProperties` | GoldengatePostgresqlConnectionProperties | Properties for a PostgreSQL connection. |
| `redisConnectionProperties` | GoldengateRedisConnectionProperties | Properties for a Redis connection. |
| `routingMethod` | string enum | Optional. The routing method for the GoldengateConnection. Values: `GOLDENGATE_CONNECTION_ROUTING_METHOD_UNSPECIFIED`, `SHARED_DEPLOYMENT_ENDPOINT`, `DEDICATED_ENDPOINT`. |
| `snowflakeConnectionProperties` | GoldengateSnowflakeConnectionProperties | Properties for a Snowflake connection. |
| `updateTime` | string (google-datetime) | Output only. The time the resource was last updated. |

### `GoldengateConnectionType`

- Details of the Goldengate Connection Type resource.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `connectionType` | string enum | Output only. The connection type of the Goldengate Connection Type resource. Values: `CONNECTION_TYPE_UNSPECIFIED`, `GOLDENGATE`, `KAFKA`, `KAFKA_SCHEMA_REGISTRY`, `MYSQL`, `JAVA_MESSAGE_SERVICE`, `MICROSOFT_SQLSERVER`, `OCI_OBJECT_STORAGE`, `ORACLE`, `AZURE_DATA_LAKE_STORAGE`, `POSTGRESQL`, `AZURE_SYNAPSE_ANALYTICS`, `SNOWFLAKE`, `AMAZON_S3`, `HDFS`, `ORACLE_AI_DATA_PLATFORM`, `ORACLE_NOSQL`, `MONGODB`, `AMAZON_KINESIS`, `AMAZON_REDSHIFT`, `DB2`, `REDIS`, `ELASTICSEARCH`, `GENERIC`, `GOOGLE_CLOUD_STORAGE`, `GOOGLE_BIGQUERY`, `DATABRICKS`, `GOOGLE_PUBSUB`, `MICROSOFT_FABRIC`, `ICEBERG`. |
| `name` | string | Identifier. The name of the Goldengate Connection Type resource with the format: projects/{project}/locations/{region}/goldengateConnectionTypes/{goldengate_connection_type} |
| `technologyTypes` | array<string> | Output only. The technology type of the Goldengate Connection Type resource. |

### `GoldengateDatabricksConnectionProperties`

- The properties of GoldengateDatabricksConnection.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `authenticationType` | string enum | Optional. Authentication type for Databricks. Values: `DATABRICKS_AUTHENTICATION_TYPE_UNSPECIFIED`, `PERSONAL_ACCESS_TOKEN`, `OAUTH_M2M`. |
| `clientId` | string | Optional. OAuth client id, only applicable for authentication_type == OAUTH_M2M |
| `clientSecret` | string | Optional. OAuth client secret, only applicable for authentication_type == OAUTH_M2M |
| `connectionUrl` | string | Optional. Connection URL. e.g.: 'jdbc:databricks://adb-33934.4.azuredatabricks.net:443/default;transportMode=http;ssl=1;httpPath=sql/protocolv1/o/3393########44/0##3-7-hlrb' |
| `password` | string | Optional. Input only. The password used to connect to Databricks in plain text. |
| `passwordSecretVersion` | string | Optional. Input only. The resource name of a secret version in Secret Manager which contains the password used to connect to Databricks. Format: projects/{project}/secrets/{secret}/versions/{version}. |
| `storageCredential` | string | Optional. External storage credential name to access files on object storage such as ADLS Gen2, S3 or Cloud Storage. |
| `technologyType` | string | Optional. The technology type of DatabricksConnection. |

### `GoldengateDb2ConnectionProperties`

- The properties of GoldengateDb2Connection.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `additionalAttributes` | array<NameValuePair> | Optional. An array of name-value pair attribute entries. Used as additional parameters in connection string. |
| `database` | string | Optional. The name of the database. |
| `host` | string | Optional. The name or address of a host. |
| `password` | string | Optional. Input only. The password Oracle Goldengate uses for Db2 connection in plain text. |
| `passwordSecretVersion` | string | Optional. Input only. The resource name of a secret version in Secret Manager which contains the password Oracle Goldengate uses for Db2 connection. Format: projects/{project}/secrets/{secret}/versions/{version}. |
| `port` | integer (int32) | Optional. The port of an endpoint usually specified for a connection. |
| `securityProtocol` | string enum | Optional. Security protocol for the DB2 database. Values: `DB2_SECURITY_PROTOCOL_UNSPECIFIED`, `PLAIN`, `TLS`. |
| `sslClientKeystashFile` | string | Optional. The keystash file which contains the encrypted password to the key database file. Not supported for IBM Db2 for i. |
| `sslClientKeystoredbFile` | string | Optional. The keystore file created at the client containing the server certificate / CA root certificate. Not supported for IBM Db2 for i. |
| `sslServerCertificateFile` | string | Optional. The file which contains the self-signed server certificate / Certificate Authority (CA) certificate. |
| `technologyType` | string | Optional. The technology type of Db2Connection. |
| `username` | string | Optional. The username Oracle Goldengate uses to connect to the DB2 database. |

### `GoldengateDeployment`

- GoldengateDeployment Goldengate Deployment resource model.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. The date and time that the GoldengateDeployment was created. |
| `displayName` | string | Required. Immutable. The display name for the GoldengateDeployment. |
| `entitlementId` | string | Output only. The ID of the subscription entitlement associated with the GoldengateDeployment |
| `gcpOracleZone` | string | Optional. Immutable. The GCP Oracle zone where Oracle GoldengateDeployment is hosted. Example: us-east4-b-r2. If not specified, the system will pick a zone based on availability. |
| `labels` | object | Optional. The labels or tags associated with the GoldengateDeployment. |
| `name` | string | Identifier. The name of the GoldengateDeployment resource in the following format: projects/{project}/locations/{region}/goldengateDeployments/{goldengate_deployment} |
| `ociUrl` | string | Output only. HTTPS link to OCI resources exposed to Customer via UI Interface. |
| `odbNetwork` | string | Optional. Immutable. The name of the OdbNetwork associated with the GoldengateDeployment. |
| `odbSubnet` | string | Required. Immutable. The name of the OdbSubnet associated with the GoldengateDeployment for IP allocation. |
| `properties` | GoldengateDeploymentProperties | Required. Immutable. The properties of the GoldengateDeployment. |

### `GoldengateDeploymentEnvironment`

- Details of the Goldengate Deployment Environment resource.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `autoScalingEnabled` | boolean | Output only. Whether auto scaling is enabled by default for the Goldengate Deployment Environment resource. |
| `category` | string enum | Output only. The category of the Goldengate Deployment Environment resource. Values: `DEPLOYMENT_CATEGORY_UNSPECIFIED`, `DATA_REPLICATION_CATEGORY`, `DATA_TRANSFORMS_CATEGORY`. |
| `defaultCpuCoreCount` | integer (int32) | Output only. The default CPU core count of the Goldengate Deployment Environment resource. |
| `displayName` | string | The display name of the Goldengate Deployment Environment resource. |
| `environmentType` | string enum | Output only. The environment type of the Goldengate Deployment Environment resource. Values: `DEPLOYMENT_ENVIRONMENT_TYPE_UNSPECIFIED`, `PRODUCTION`, `DEVELOPMENT_OR_TESTING`. |
| `maxCpuCoreCount` | integer (int32) | Output only. The max CPU core count of the Goldengate Deployment Environment resource. |
| `memoryGbPerCpuCore` | integer (int32) | Output only. The memory per CPU core in GBs of the Goldengate Deployment Environment resource. |
| `minCpuCoreCount` | integer (int32) | Output only. The min CPU core count of the Goldengate Deployment Environment resource. |
| `name` | string | Identifier. The name of the Goldengate Deployment Environment resource with the format: projects/{project}/locations/{location}/goldengateDeploymentEnvironments/{goldengate_deployment_environment} |
| `networkBandwidthGbpsPerCpuCore` | integer (int32) | Output only. The network bandwidth per CPU core in Gbps of the Goldengate Deployment Environment resource. |
| `storageUsageLimitGbPerCpuCore` | integer (int32) | Output only. The storage usage limit per CPU core in GBs of the Goldengate Deployment Environment resource. |

### `GoldengateDeploymentLock`

- The lock of the GoldengateDeployment.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `compartmentId` | string | Output only. The compartment id. |
| `createTime` | string (google-datetime) | Output only. The time created. |
| `message` | string | Output only. The message. |
| `relatedResourceId` | string | Output only. The related resource id. |
| `type` | string enum | Output only. The type of lock. Values: `LOCK_TYPE_UNSPECIFIED`, `FULL`, `DELETE`. |

### `GoldengateDeploymentProperties`

- Properties of GoldengateDeployment.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `backupSchedule` | GoldengateBackupSchedule | Output only. The backup schedule of the GoldengateDeployment. |
| `category` | string enum | Output only. The category of the GoldengateDeployment. Values: `GOLDENGATE_DEPLOYMENT_CATEGORY_UNSPECIFIED`, `DATA_REPLICATION`, `DATA_TRANSFORMS`. |
| `cpuCoreCount` | integer (int32) | Optional. The Minimum number of OCPUs to be made available for this Deployment. |
| `deploymentBackupId` | string | Output only. The deployment backup id of the GoldengateDeployment. |
| `deploymentDiagnosticData` | DeploymentDiagnosticData | Output only. The deployment diagnostic data of the GoldengateDeployment. |
| `deploymentRole` | string enum | Output only. The deployment role of the GoldengateDeployment. Values: `GOLDENGATE_DEPLOYMENT_ROLE_TYPE_UNSPECIFIED`, `PRIMARY`, `STANDBY`. |
| `deploymentType` | string | Required. A valid Goldengate Deployment type. For a list of supported types, use the `ListGoldengateDeploymentTypes` operation. |
| `deploymentUrl` | string | Output only. The deployment url of the GoldengateDeployment. |
| `description` | string | Optional. The description of the GoldengateDeployment. |
| `environmentType` | string | Optional. The environment type of the GoldengateDeployment. |
| `fqdn` | string | Output only. The Fully Qualified Domain Name of the GoldengateDeployment. |
| `healthy` | boolean | Output only. Whether the GoldengateDeployment is healthy. |
| `ingressIps` | array<IngressIp> | Output only. The ingress ips of the GoldengateDeployment. |
| `isAutoScalingEnabled` | boolean | Optional. Indicates if auto scaling is enabled for the Deployment's CPU core count. |
| `isLatestVersion` | boolean | Output only. Whether the GoldengateDeployment is of the latest version. |
| `isPublic` | boolean | Output only. Whether the GoldengateDeployment is public. |
| `isStorageUtilizationLimitExceeded` | boolean | Output only. Whether storage utilization limit is exceeded of the GoldengateDeployment. |
| `lastBackupScheduleTime` | string (google-datetime) | Output only. The time last backup scheduled of the GoldengateDeployment. |
| `licenseModel` | string enum | Optional. The Oracle license model that applies to a Deployment. Values: `LICENSE_MODEL_UNSPECIFIED`, `LICENSE_INCLUDED`, `BRING_YOUR_OWN_LICENSE`. |
| `lifecycleDetails` | string | Output only. The lifecycle details of the GoldengateDeployment. |
| `lifecycleState` | string enum | Output only. State of the GoldengateDeployment. Values: `GOLDENGATE_DEPLOYMENT_LIFECYCLE_STATE_UNSPECIFIED`, `CREATING`, `UPDATING`, `ACTIVE`, `INACTIVE`, `DELETING`, `DELETED`, `FAILED`, `NEEDS_ATTENTION`, `IN_PROGRESS`, `CANCELLING`, `CANCELLED`, `SUCCEEDED`, `WAITING`. |
| `lifecycleSubState` | string enum | Output only. The lifecycle sub-state of the GoldengateDeployment. Values: `GOLDENGATE_DEPLOYMENT_LIFECYCLE_SUB_STATE_UNSPECIFIED`, `RECOVERING`, `STARTING`, `STOPPING`, `MOVING`, `UPGRADING`, `RESTORING`, `BACKING_UP`, `ROLLING_BACK`. |
| `loadBalancerId` | string | Output only. The load balancer id of the GoldengateDeployment. |
| `loadBalancerSubnetId` | string | Output only. The load balancer subnet id of the GoldengateDeployment. |
| `locks` | array<GoldengateDeploymentLock> | Output only. The locks of the GoldengateDeployment. |
| `maintenanceConfig` | GoldengateMaintenanceConfig | Optional. The maintenance configuration of the GoldengateDeployment. |
| `maintenanceWindow` | GoldengateMaintenanceWindow | Optional. The maintenance window of the GoldengateDeployment. |
| `nextBackupScheduleTime` | string (google-datetime) | Output only. The time next backup scheduled of the GoldengateDeployment. |
| `nextMaintenanceActionType` | string enum | Output only. The next maintenance action type of the GoldengateDeployment. Values: `NEXT_MAINTENANCE_ACTION_TYPE_UNSPECIFIED`, `UPGRADE`. |
| `nextMaintenanceDescription` | string | Output only. The next maintenance description of the GoldengateDeployment. |
| `nextMaintenanceTime` | string (google-datetime) | Output only. The time of next maintenance of the GoldengateDeployment. |
| `nsgIds` | array<string> | Output only. The nsg ids of the GoldengateDeployment. |
| `ocid` | string | Output only. OCID of the GoldengateDeployment. |
| `oggData` | GoldengateOggDeployment | Required. The ogg data of the GoldengateDeployment. |
| `oggVersionSupportEndTime` | string (google-datetime) | Output only. The time ogg version supported until of the GoldengateDeployment. |
| `placements` | array<GoldengatePlacement> | Output only. The placements of the GoldengateDeployment. |
| `privateIpAddress` | string | Output only. The private ip address of the GoldengateDeployment. |
| `publicIpAddress` | string | Output only. The public ip address of the GoldengateDeployment. |
| `roleChangeTime` | string (google-datetime) | Output only. The time when the role of the GoldengateDeployment was changed. |
| `storageUtilizationBytes` | string (int64) | Output only. The storage utilization in bytes of the GoldengateDeployment. |
| `updateTime` | string (google-datetime) | Output only. The time the GoldengateDeployment was updated. |
| `upgradeRequiredTime` | string (google-datetime) | Output only. The time upgrade required of the GoldengateDeployment. |

### `GoldengateDeploymentType`

- Details of the Goldengate Deployment Type resource.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `category` | string enum | Output only. The category of the Goldengate Deployment Type resource. Values: `DEPLOYMENT_CATEGORY_UNSPECIFIED`, `DATA_REPLICATION_CATEGORY`, `DATA_TRANSFORMS_CATEGORY`. |
| `connectionTypes` | array<string> | Output only. The connection types of the Goldengate Deployment Type resource. |
| `defaultUsername` | string | Output only. The default username of the Goldengate Deployment Type resource. |
| `deploymentType` | string enum | Output only. The deployment type of the Goldengate Deployment Type resource. Values: `DEPLOYMENT_TYPE_UNSPECIFIED`, `OGG`, `DATABASE_ORACLE`, `BIGDATA`, `DATABASE_MICROSOFT_SQLSERVER`, `DATABASE_MYSQL`, `DATABASE_POSTGRESQL`, `DATABASE_DB2ZOS`, `DATABASE_DB2I`, `GGSA`, `DATA_TRANSFORMS`. |
| `displayName` | string | Output only. The display name of the Goldengate Deployment Type resource. |
| `name` | string | Identifier. The name of the Goldengate Deployment Type resource with the format: projects/{project}/locations/{region}/goldengateDeploymentTypes/{goldengate_deployment_type} |
| `oggVersion` | string | Output only. The Ogg version of the Goldengate Deployment Type resource. |
| `sourceTechnologies` | array<string> | Output only. The source technologies of the Goldengate Deployment Type resource. |
| `supportedCapabilities` | array<string> | Output only. The supported capabilities of the Goldengate Deployment Type resource. |
| `supportedTechnologiesUrl` | string | Output only. The supported technologies URL of the Goldengate Deployment Type resource. |
| `targetTechnologies` | array<string> | Output only. The target technologies of the Goldengate Deployment Type resource. |

### `GoldengateDeploymentVersion`

- Details of the Goldengate Deployment Version resource.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `name` | string | Identifier. The name of the Goldengate Deployment Version resource with the format: projects/{project}/locations/{location}/goldengateDeploymentVersions/{goldengate_deployment_version} |
| `ocid` | string | Output only. The deployment version ocid of the Goldengate Deployment Version resource. |
| `properties` | GoldengateDeploymentVersionProperties | Output only. The technology type of the Goldengate Deployment Version resource. |

### `GoldengateDeploymentVersionProperties`

- Properties of GoldengateDeploymentVersion.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `deploymentType` | string enum | Output only. The deployment type of the Goldengate Deployment Version resource. Values: `DEPLOYMENT_TYPE_UNSPECIFIED`, `OGG`, `DATABASE_ORACLE`, `BIGDATA`, `DATABASE_MICROSOFT_SQLSERVER`, `DATABASE_MYSQL`, `DATABASE_POSTGRESQL`, `DATABASE_DB2ZOS`, `DATABASE_DB2I`, `GGSA`, `DATA_TRANSFORMS`. |
| `oggVersion` | string | Output only. The OGG version of the Goldengate Deployment Version resource. |
| `releaseTime` | string (google-datetime) | Output only. The release time of the Goldengate Deployment Version resource. |
| `releaseType` | string enum | Output only. The release type of the Goldengate Deployment Version resource. Values: `DEPLOYMENT_RELEASE_TYPE_UNSPECIFIED`, `MAJOR`, `BUNDLE`, `MINOR`. |
| `securityFix` | boolean | Optional. Whether the Goldengate Deployment Version resource is a security fix. |
| `supportEndTime` | string (google-datetime) | Output only. The support end time of the Goldengate Deployment Version resource. |

### `GoldengateElasticsearchConnectionProperties`

- The properties of GoldengateElasticsearchConnection.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `authenticationType` | string enum | Optional. Authentication type for Elasticsearch. Values: `ELASTICSEARCH_AUTHENTICATION_TYPE_UNSPECIFIED`, `NONE`, `BASIC`. |
| `fingerprint` | string | Optional. Fingerprint required by TLS security protocol. Eg.: '6152b2dfbff200f973c5074a5b91d06ab3b472c07c09a1ea57bb7fd406cdce9c' |
| `password` | string | Optional. Input only. The password Oracle Goldengate uses for Elastic Search connection in plain text. |
| `passwordSecretVersion` | string | Optional. Input only. The resource name of a secret version in Secret Manager which contains the password Oracle Goldengate uses for Elastic Search connection. Format: projects/{project}/secrets/{secret}/versions/{version}. |
| `securityProtocol` | string enum | Optional. Security protocol for Elasticsearch. Values: `ELASTICSEARCH_SECURITY_PROTOCOL_UNSPECIFIED`, `PLAIN`, `TLS`. |
| `servers` | string | Optional. Comma separated list of Elasticsearch server addresses, specified as host:port entries, where :port is optional. If port is not specified, it defaults to 9200. Example: "server1.example.com:4000,server2.example.com:4000" |
| `technologyType` | string | Optional. The technology type of ElasticsearchConnection. |
| `username` | string | Optional. The username Oracle Goldengate uses to connect the associated system of the given technology. |

### `GoldengateGenericConnectionProperties`

- The properties of GoldengateGenericConnectionProperties.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `host` | string | Optional. The host of the GenericConnection. |
| `technologyType` | string | Optional. The technology type. |

### `GoldengateGoldengateConnectionProperties`

- The properties of GoldengateGoldengateConnectionProperties.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `goldengateDeploymentId` | string | Optional. The name of the GoldengateDeployment associated with the GoldengateConnection. Format: projects/{project}/locations/{location}/goldengateDeployments/{goldengate_deployment} |
| `host` | string | Optional. The host of the GoldengateConnection. |
| `password` | string | Optional. Input only. The password used to connect to the Oracle Goldengate in plain text. |
| `passwordSecretVersion` | string | Optional. Input only. The resource name of a secret version in Secret Manager which contains the password used to connect to the Oracle Goldengate. Format: projects/{project}/secrets/{secret}/versions/{version}. |
| `port` | integer (int32) | Optional. The port of the GoldengateConnection. |
| `technologyType` | string | Optional. The technology type. |
| `username` | string | Optional. The username credential. |

### `GoldengateGoogleBigQueryConnectionProperties`

- The properties of GoldengateGoogleBigQueryConnectionProperties.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `serviceAccountKeyFile` | string | Optional. The base64 encoded content of the service account key file containing the credentials required to use Google BigQuery. |
| `technologyType` | string | Optional. The technology type. |

### `GoldengateGoogleCloudStorageConnectionProperties`

- The properties of GoldengateGoogleCloudStorageConnectionProperties.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `serviceAccountKeyFile` | string | Optional. The base64 encoded content of the service account key file containing the credentials required to use Google Cloud Storage. |
| `technologyType` | string | Optional. The technology type. |

### `GoldengateGooglePubsubConnectionProperties`

- The properties of GoldengateGooglePubsubConnection.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `serviceAccountKeyFile` | string | Optional. The base64 encoded content of the service account key file containing the credentials required to use Google Pub/Sub. |
| `technologyType` | string | Optional. The technology type of GooglePubsubConnection. |

### `GoldengateGroupToRolesMapping`

- The group to roles mapping of the GoldengateDeployment.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `administratorGroupId` | string | Output only. The administrator group id. |
| `operatorGroupId` | string | Output only. The operator group id. |
| `securityGroupId` | string | Output only. The security group id. |
| `userGroupId` | string | Output only. The user group id. |

### `GoldengateHdfsConnectionProperties`

- The properties of GoldengateHdfsConnection.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `coreSiteXml` | string | Optional. The content of the Hadoop Distributed File System configuration file (core-site.xml). |
| `technologyType` | string | Optional. The technology type of HdfsConnection. |

### `GoldengateIcebergConnectionProperties`

- The properties of GoldengateIcebergConnection.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `catalog` | IcebergCatalog | Required. The Iceberg catalog. |
| `storage` | IcebergStorage | Required. The Iceberg storage. |
| `technologyType` | string | Required. The technology type of Iceberg connection. |

### Shape of `AllConnectionStrings`

Generated from the Discovery schema (not in the official docs); values show each field type:

```json
{
  "high": "string",
  "low": "string",
  "medium": "string"
}
```

## Notes

- Generated from the Discovery document(s) v1 of `oracledatabase` (retrieved 2026-11-14); a type with the same fields in several versions shows the preferred version; a type whose fields differ between versions is listed once per version (heading suffix `(version)`), and each type's `Version` line names the document it was taken from. A `$ref` resolves to the definition of the same version.
- Source: https://oracledatabase.googleapis.com/$discovery/rest?version=v1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
