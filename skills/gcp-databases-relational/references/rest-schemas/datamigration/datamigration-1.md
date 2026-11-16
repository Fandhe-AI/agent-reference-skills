---
source: https://datamigration.googleapis.com/$discovery/rest?version=v1
---

# Database Migration API message schemas (datamigration) (part 1/2)

## Signature / Usage

Message types referenced by the methods listed under `references/rest/datamigration/`.

### `AlloyDbConnectionProfile`

- Specifies required connection parameters, and the parameters required to create an AlloyDB destination cluster.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `clusterId` | string | Required. The AlloyDB cluster ID that this connection profile is associated with. |
| `settings` | AlloyDbSettings | Immutable. Metadata used to create the destination AlloyDB cluster. |

### `AlloyDbSettings`

- Settings for creating an AlloyDB cluster.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `databaseVersion` | string enum | Optional. The database engine major version. This is an optional field. If a database version is not supplied at cluster creation time, then a default database version will be used. Values: `DATABASE_VERSION_UNSPECIFIED`, `POSTGRES_14`, `POSTGRES_15`, `POSTGRES_16`, `POSTGRES_17`, `POSTGRES_18`, `POSTGRES_19`. |
| `encryptionConfig` | EncryptionConfig | Optional. The encryption config can be specified to encrypt the data disks and other persistent data resources of a cluster with a customer-managed encryption key (CMEK). When this field is not specified, the cluster will then use default encryption scheme to protect the user data. |
| `initialUser` | UserPassword | Required. Input only. Initial user to setup during cluster creation. Required. |
| `labels` | object | Labels for the AlloyDB cluster created by DMS. An object containing a list of 'key', 'value' pairs. |
| `primaryInstanceSettings` | PrimaryInstanceSettings | Settings for the cluster's primary instance |
| `vpcNetwork` | string | Required. The resource link for the VPC network in which cluster resources are created and from which they are accessible via Private IP. The network must belong to the same project as the cluster. It is specified in the form: "projects/{project_number}/global/networks/{network_id}". This is required to create a cluster. |

### `ApplyConversionWorkspaceRequest`

- Request message for 'ApplyConversionWorkspace' request.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `autoCommit` | boolean | Optional. Specifies whether the conversion workspace is to be committed automatically after the apply. |
| `connectionProfile` | string | Optional. Fully qualified (Uri) name of the destination connection profile. |
| `dryRun` | boolean | Optional. Only validates the apply process, but doesn't change the destination database. Only works for PostgreSQL destination connection profile. |
| `filter` | string | Optional. Filter which entities to apply. Leaving this field empty will apply all of the entities. Supports Google AIP 160 based filtering. |

### `ApplyHash`

- Apply a hash function on the value.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `uuidFromBytes` | Empty | Optional. Generate UUID from the data's byte array |

### `ApplyJobDetails`

- Details regarding an Apply background job.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `connectionProfile` | string | Output only. The connection profile which was used for the apply job. |
| `filter` | string | Output only. AIP-160 based filter used to specify the entities to apply |

### `AssignSpecificValue`

- Set to a specific value (value is converted to fit the target data type)
- Version: v1

| Field | Type | Description |
|---|---|---|
| `value` | string | Required. Specific value to be assigned |

### `AuditConfig`

- Specifies the audit configuration for a service. The configuration determines which permission types are logged, and what identities, if any, are exempted from logging. An AuditConfig must have one or more AuditLogConfigs. If there are AuditConfigs for both `allServices` and a specific service, the union of the two AuditConfigs is used for that service: the log_types specified in each AuditConfig are enabled, and the exempted_members in each AuditLogConfig are exempted. Example Policy with multiple AuditConfigs: { "audit_configs": \[ { "service": "allServices", "audit_log_configs": \[ { "log_type": "DATA_READ", "exempted_members": \[ "user:jose@example.com" \] }, { "log_type": "DATA_WRITE" }, { "log_type": "ADMIN_READ" } \] }, { "service": "sampleservice.googleapis.com", "audit_log_configs": \[ { "log_type": "DATA_READ" }, { "log_type": "DATA_WRITE", "exempted_members": \[ "user:aliya@example.com" \] } \] } \] } For sampleservice, this policy enables DATA_READ, DATA_WRITE and ADMIN_READ logging. It also exempts `jose@example.com` from DATA_READ logging, and `aliya@example.com` from DATA_WRITE logging.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `auditLogConfigs` | array<AuditLogConfig> | The configuration for logging of each type of permission. |
| `service` | string | Specifies a service that will be enabled for audit logging. For example, `storage.googleapis.com`, `cloudsql.googleapis.com`. `allServices` is a special value that covers all services. |

### `AuditLogConfig`

- Provides the configuration for logging a type of permissions. Example: { "audit_log_configs": \[ { "log_type": "DATA_READ", "exempted_members": \[ "user:jose@example.com" \] }, { "log_type": "DATA_WRITE" } \] } This enables 'DATA_READ' and 'DATA_WRITE' logging, while exempting jose@example.com from DATA_READ logging.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `exemptedMembers` | array<string> | Specifies the identities that do not cause logging for this type of permission. Follows the same format of Binding.members. |
| `logType` | string enum | The log type that this config enables. Values: `LOG_TYPE_UNSPECIFIED`, `ADMIN_READ`, `DATA_WRITE`, `DATA_READ`. |

### `AuthorizedNetwork`

- AuthorizedNetwork contains metadata for an authorized network.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `cidrRange` | string | Optional. CIDR range for one authorzied network of the instance. |

### `BackgroundJobLogEntry`

- Execution log of a background job.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `applyJobDetails` | ApplyJobDetails | Output only. Apply job details. |
| `completionComment` | string | Output only. Job completion comment, such as how many entities were seeded, how many warnings were found during conversion, and similar information. |
| `completionState` | string enum | Output only. Job completion state, i.e. the final state after the job completed. Values: `JOB_COMPLETION_STATE_UNSPECIFIED`, `SUCCEEDED`, `FAILED`. |
| `convertJobDetails` | ConvertJobDetails | Output only. Convert job details. |
| `finishTime` | string (google-datetime) | The timestamp when the background job was finished. |
| `id` | string | The background job log entry ID. |
| `importRulesJobDetails` | ImportRulesJobDetails | Output only. Import rules job details. |
| `jobType` | string enum | The type of job that was executed. Values: `BACKGROUND_JOB_TYPE_UNSPECIFIED`, `BACKGROUND_JOB_TYPE_SOURCE_SEED`, `BACKGROUND_JOB_TYPE_CONVERT`, `BACKGROUND_JOB_TYPE_APPLY_DESTINATION`, `BACKGROUND_JOB_TYPE_IMPORT_RULES_FILE`. |
| `requestAutocommit` | boolean | Output only. Whether the client requested the conversion workspace to be committed after a successful completion of the job. |
| `seedJobDetails` | SeedJobDetails | Output only. Seed job details. |
| `startTime` | string (google-datetime) | The timestamp when the background job was started. |

### `BadRequest`

- Describes violations in a client request. This error type focuses on the syntactic aspects of the request.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `fieldViolations` | array<FieldViolation> | Describes all violations in a client request. |

### `BinaryLogParser`

- Configuration to use Binary Log Parser CDC technique.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `logFileDirectories` | LogFileDirectories | Use Oracle directories. |
| `oracleAsmLogFileAccess` | OracleAsmLogFileAccess | Use Oracle ASM. |

### `Binding`

- Associates `members`, or principals, with a `role`.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `condition` | Expr | The condition that is associated with this binding. If the condition evaluates to `true`, then this binding applies to the current request. If the condition evaluates to `false`, then this binding does not apply to the current request. However, a different role binding might grant the same role to one or more of the principals in this binding. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |
| `members` | array<string> | Specifies the principals requesting access for a Google Cloud resource. `members` can have the following values: \* `allUsers`: A special identifier that represents anyone who is on the internet; with or without a Google account. \* `allAuthenticatedUsers`: A special identifier that represents anyone who is authenticated with a Google account or a service account. Does not include identities that come from external identity providers (IdPs) through identity federation. \* `user:{emailid}`: An email address that represents a specific Google account. For example, `alice@example.com` . \* `serviceAccount:{emailid}`: An email address that represents a Google service account. For example, `my-other-app@appspot.gserviceaccount.com`. \* `serviceAccount:{projectid}.svc.id.goog[{namespace}/{kubernetes-sa}]`: An identifier for a Kubernetes service account (https://cloud.google.com/kubernetes-engine/docs/how-to/kubernetes-service-accounts). For example, `my-project.svc.id.goog[my-namespace/my-kubernetes-sa]`. \* `group:{emailid}`: An email address that represents a Google group. For example, `admins@example.com`. \* `domain:{domain}`: The G Suite domain (primary) that represents all the users of that domain. For example, `google.com` or `example.com`. \* `principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workforce identity pool. \* `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/group/{group_id}`: All workforce identities in a group. \* `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All workforce identities with a specific attribute value. \* `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/*`: All identities in a workforce identity pool. \* `principal://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workload identity pool. \* `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/group/{group_id}`: A workload identity pool group. \* `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All identities in a workload identity pool with a certain attribute. \* `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/*`: All identities in a workload identity pool. \* `deleted:user:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a user that has been recently deleted. For example, `alice@example.com?uid=123456789012345678901`. If the user is recovered, this value reverts to `user:{emailid}` and the recovered user retains the role in the binding. \* `deleted:serviceAccount:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a service account that has been recently deleted. For example, `my-other-app@appspot.gserviceaccount.com?uid=123456789012345678901`. If the service account is undeleted, this value reverts to `serviceAccount:{emailid}` and the undeleted service account retains the role in the binding. \* `deleted:group:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a Google group that has been recently deleted. For example, `admins@example.com?uid=123456789012345678901`. If the group is recovered, this value reverts to `group:{emailid}` and the recovered group retains the role in the binding. \* `deleted:principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: Deleted single identity in a workforce identity pool. For example, `deleted:principal://iam.googleapis.com/locations/global/workforcePools/my-pool-id/subject/my-subject-attribute-value`. |
| `role` | string | Role that is assigned to the list of `members`, or principals. For example, `roles/viewer`, `roles/editor`, or `roles/owner`. For an overview of the IAM roles and permissions, see the IAM documentation (https://cloud.google.com/iam/docs/roles-overview). For a list of the available pre-defined roles, see here (https://cloud.google.com/iam/docs/understanding-roles). |

### `CancelOperationRequest`

- The request message for Operations.CancelOperation.
- Version: v1

### `CloudSqlConnectionProfile`

- Specifies required connection parameters, and, optionally, the parameters required to create a Cloud SQL destination database instance.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `additionalPublicIp` | string | Output only. The Cloud SQL database instance's additional (outgoing) public IP. Used when the Cloud SQL database availability type is REGIONAL (i.e. multiple zones / highly available). |
| `cloudSqlId` | string | Output only. The Cloud SQL instance ID that this connection profile is associated with. |
| `privateIp` | string | Output only. The Cloud SQL database instance's private IP. |
| `publicIp` | string | Output only. The Cloud SQL database instance's public IP. |
| `settings` | CloudSqlSettings | Immutable. Metadata used to create the destination Cloud SQL database. |

### `CloudSqlConnectionProfile` (v1beta1)

- Specifies required connection parameters, and, optionally, the parameters required to create a Cloud SQL destination database instance.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `cloudSqlId` | string | Output only. The Cloud SQL instance ID that this connection profile is associated with. |
| `privateIp` | string | Output only. The Cloud SQL database instance's private IP. |
| `publicIp` | string | Output only. The Cloud SQL database instance's public IP. |
| `settings` | CloudSqlSettings | Immutable. Metadata used to create the destination Cloud SQL database. |

### `CloudSqlSettings`

- Settings for creating a Cloud SQL database instance.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `activationPolicy` | string enum | The activation policy specifies when the instance is activated; it is applicable only when the instance state is 'RUNNABLE'. Valid values: 'ALWAYS': The instance is on, and remains so even in the absence of connection requests. `NEVER`: The instance is off; it is not activated, even if a connection request arrives. Values: `SQL_ACTIVATION_POLICY_UNSPECIFIED`, `ALWAYS`, `NEVER`. |
| `autoStorageIncrease` | boolean | \[default: ON\] If you enable this setting, Cloud SQL checks your available storage every 30 seconds. If the available storage falls below a threshold size, Cloud SQL automatically adds additional storage capacity. If the available storage repeatedly falls below the threshold size, Cloud SQL continues to add storage until it reaches the maximum of 30 TB. |
| `availabilityType` | string enum | Optional. Availability type. Potential values: \* `ZONAL`: The instance serves data from only one zone. Outages in that zone affect data availability. \* `REGIONAL`: The instance can serve data from more than one zone in a region (it is highly available). Values: `SQL_AVAILABILITY_TYPE_UNSPECIFIED`, `ZONAL`, `REGIONAL`. |
| `cmekKeyName` | string | The KMS key name used for the csql instance. |
| `collation` | string | The Cloud SQL default instance level collation. |
| `dataCacheConfig` | DataCacheConfig | Optional. Data cache is an optional feature available for Cloud SQL for MySQL Enterprise Plus edition only. For more information on data cache, see Data cache overview (https://cloud.google.com/sql/help/mysql-data-cache) in Cloud SQL documentation. |
| `dataDiskProvisionedIops` | string (int64) | Optional. Provisioned number of I/O operations per second for the data disk. This field is only used for hyperdisk-balanced disk types. |
| `dataDiskProvisionedThroughput` | string (int64) | Optional. Provisioned throughput measured in MiB per second for the data disk. This field is only used for hyperdisk-balanced disk types. |
| `dataDiskSizeGb` | string (int64) | The storage capacity available to the database, in GB. The minimum (and default) size is 10GB. |
| `dataDiskType` | string enum | The type of storage: `PD_SSD` (default) or `PD_HDD` or `HYPERDISK_BALANCED`. Values: `SQL_DATA_DISK_TYPE_UNSPECIFIED`, `PD_SSD`, `PD_HDD`, `HYPERDISK_BALANCED`. |
| `databaseFlags` | object | The database flags passed to the Cloud SQL instance at startup. An object containing a list of "key": value pairs. Example: { "name": "wrench", "mass": "1.3kg", "count": "3" }. |
| `databaseVersion` | string enum | The database engine type and version. Deprecated. Use database_version_name instead. Values: `SQL_DATABASE_VERSION_UNSPECIFIED`, `MYSQL_5_6`, `MYSQL_5_7`, `MYSQL_8_0`, `MYSQL_8_0_18`, `MYSQL_8_0_26`, `MYSQL_8_0_27`, `MYSQL_8_0_28`, `MYSQL_8_0_30`, `MYSQL_8_0_31`, `MYSQL_8_0_32`, `MYSQL_8_0_33`, `MYSQL_8_0_34`, `MYSQL_8_0_35`, `MYSQL_8_0_36`, `MYSQL_8_0_37`, `MYSQL_8_4`, `POSTGRES_9_6`, `POSTGRES_11`, `POSTGRES_10`, `POSTGRES_12`, `POSTGRES_13`, `POSTGRES_14`, `POSTGRES_15`, `POSTGRES_16`. |
| `databaseVersionName` | string | Optional. The database engine type and version name. |
| `edition` | string enum | Optional. The edition of the given Cloud SQL instance. Values: `EDITION_UNSPECIFIED`, `ENTERPRISE`, `ENTERPRISE_PLUS`. |
| `ipConfig` | SqlIpConfig | The settings for IP Management. This allows to enable or disable the instance IP and manage which external networks can connect to the instance. The IPv4 address cannot be disabled. |
| `rootPassword` | string | Input only. Initial root password. |
| `rootPasswordSet` | boolean | Output only. Indicates If this connection profile root password is stored. |
| `secondaryZone` | string | Optional. The Google Cloud Platform zone where the failover Cloud SQL database instance is located. Used when the Cloud SQL database availability type is REGIONAL (i.e. multiple zones / highly available). |
| `sourceId` | string | The Database Migration Service source connection profile ID, in the format: `projects/my_project_name/locations/us-central1/connectionProfiles/connection_profile_ID` |
| `storageAutoResizeLimit` | string (int64) | The maximum size to which storage capacity can be automatically increased. The default value is 0, which specifies that there is no limit. |
| `tier` | string | The tier (or machine type) for this instance, for example: `db-n1-standard-1` (MySQL instances) or `db-custom-1-3840` (PostgreSQL instances). For more information, see Cloud SQL Instance Settings (https://cloud.google.com/sql/docs/mysql/instance-settings). |
| `userLabels` | object | The resource labels for a Cloud SQL instance to use to annotate any related underlying resources such as Compute Engine VMs. An object containing a list of "key": "value" pairs. Example: `{ "name": "wrench", "mass": "18kg", "count": "3" }`. |
| `zone` | string | The Google Cloud Platform zone where your Cloud SQL database instance is located. |

### `CloudSqlSettings` (v1beta1)

- Settings for creating a Cloud SQL database instance.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `activationPolicy` | string enum | The activation policy specifies when the instance is activated; it is applicable only when the instance state is 'RUNNABLE'. Valid values: 'ALWAYS': The instance is on, and remains so even in the absence of connection requests. `NEVER`: The instance is off; it is not activated, even if a connection request arrives. Values: `SQL_ACTIVATION_POLICY_UNSPECIFIED`, `ALWAYS`, `NEVER`. |
| `autoStorageIncrease` | boolean | \[default: ON\] If you enable this setting, Cloud SQL checks your available storage every 30 seconds. If the available storage falls below a threshold size, Cloud SQL automatically adds additional storage capacity. If the available storage repeatedly falls below the threshold size, Cloud SQL continues to add storage until it reaches the maximum of 30 TB. |
| `dataDiskSizeGb` | string (int64) | The storage capacity available to the database, in GB. The minimum (and default) size is 10GB. |
| `dataDiskType` | string enum | The type of storage: `PD_SSD` (default) or `PD_HDD`. Values: `SQL_DATA_DISK_TYPE_UNSPECIFIED`, `PD_SSD`, `PD_HDD`. |
| `databaseFlags` | object | The database flags passed to the Cloud SQL instance at startup. An object containing a list of "key": value pairs. Example: { "name": "wrench", "mass": "1.3kg", "count": "3" }. |
| `databaseVersion` | string enum | The database engine type and version. Values: `SQL_DATABASE_VERSION_UNSPECIFIED`, `MYSQL_5_6`, `MYSQL_5_7`, `MYSQL_8_0`. |
| `ipConfig` | SqlIpConfig | The settings for IP Management. This allows to enable or disable the instance IP and manage which external networks can connect to the instance. The IPv4 address cannot be disabled. |
| `rootPassword` | string | Input only. Initial root password. |
| `rootPasswordSet` | boolean | Output only. Indicates If this connection profile root password is stored. |
| `sourceId` | string | The Database Migration Service source connection profile ID, in the format: `projects/my_project_name/locations/us-central1/connectionProfiles/connection_profile_ID` |
| `storageAutoResizeLimit` | string (int64) | The maximum size to which storage capacity can be automatically increased. The default value is 0, which specifies that there is no limit. |
| `tier` | string | The tier (or machine type) for this instance, for example: `db-n1-standard-1` (MySQL instances). For more information, see Cloud SQL Instance Settings (https://cloud.google.com/sql/docs/mysql/instance-settings). |
| `userLabels` | object | The resource labels for a Cloud SQL instance to use to annotate any related underlying resources such as Compute Engine VMs. An object containing a list of "key": "value" pairs. Example: `{ "name": "wrench", "mass": "18kg", "count": "3" }`. |
| `zone` | string | The Google Cloud Platform zone where your Cloud SQL database instance is located. |

### `ColumnEntity`

- Column is not used as an independent entity, it is retrieved as part of a Table entity.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `array` | boolean | Is the column of array type. |
| `arrayLength` | integer (int32) | If the column is array, of which length. |
| `autoGenerated` | boolean | Is the column auto-generated/identity. |
| `charset` | string | Charset override - instead of table level charset. |
| `collation` | string | Collation override - instead of table level collation. |
| `comment` | string | Comment associated with the column. |
| `computed` | boolean | Is the column a computed column. |
| `customFeatures` | object | Custom engine specific features. |
| `dataType` | string | Column data type. |
| `defaultValue` | string | Default value of the column. |
| `fractionalSecondsPrecision` | integer (int32) | Column fractional second precision - used for timestamp based datatypes. |
| `length` | string (int64) | Column length - e.g. varchar (50). |
| `name` | string | Column name. |
| `nullable` | boolean | Is the column nullable. |
| `ordinalPosition` | integer (int32) | Column order in the table. |
| `precision` | integer (int32) | Column precision - when relevant. |
| `scale` | integer (int32) | Column scale - when relevant. |
| `setValues` | array<string> | Specifies the list of values allowed in the column. Only used for set data type. |
| `udt` | boolean | Is the column a UDT. |

### `CommitConversionWorkspaceRequest`

- Request message for 'CommitConversionWorkspace' request.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `commitName` | string | Optional. Optional name of the commit. |

### `ConditionalColumnSetValue`

- Options to configure rule type ConditionalColumnSetValue. The rule is used to transform the data which is being replicated/migrated. The rule filter field can refer to one or more entities. The rule scope can be one of: Column.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `customFeatures` | object | Optional. Custom engine specific features. |
| `sourceNumericFilter` | SourceNumericFilter | Optional. Optional filter on source column precision and scale. Used for fixed point numbers such as NUMERIC/NUMBER data types. |
| `sourceTextFilter` | SourceTextFilter | Optional. Optional filter on source column length. Used for text based data types like varchar. |
| `valueTransformation` | ValueTransformation | Required. Description of data transformation during migration. |

### `ConnectionProfile`

- A connection profile definition.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `alloydb` | AlloyDbConnectionProfile | An AlloyDB cluster connection profile. |
| `cloudsql` | CloudSqlConnectionProfile | A CloudSQL database connection profile. |
| `createTime` | string (google-datetime) | Output only. The timestamp when the resource was created. A timestamp in RFC3339 UTC "Zulu" format, accurate to nanoseconds. Example: "2014-10-02T15:01:23.045123456Z". |
| `displayName` | string | The connection profile display name. |
| `error` | Status | Output only. The error details in case of state FAILED. |
| `labels` | object | The resource labels for connection profile to use to annotate any related underlying resources such as Compute Engine VMs. An object containing a list of "key": "value" pairs. Example: `{ "name": "wrench", "mass": "1.3kg", "count": "3" }`. |
| `mysql` | MySqlConnectionProfile | A MySQL database connection profile. |
| `name` | string | The name of this connection profile resource in the form of projects/{project}/locations/{location}/connectionProfiles/{connectionProfile}. |
| `oracle` | OracleConnectionProfile | An Oracle database connection profile. |
| `postgresql` | PostgreSqlConnectionProfile | A PostgreSQL database connection profile. |
| `provider` | string enum | The database provider. Values: `DATABASE_PROVIDER_UNSPECIFIED`, `CLOUDSQL`, `RDS`, `AURORA`, `ALLOYDB`, `AZURE_DATABASE`. |
| `role` | string enum | Optional. The connection profile role. Values: `ROLE_UNSPECIFIED`, `SOURCE`, `DESTINATION`. |
| `satisfiesPzi` | boolean | Output only. Reserved for future use. |
| `satisfiesPzs` | boolean | Output only. Reserved for future use. |
| `sqlserver` | SqlServerConnectionProfile | Connection profile for a SQL Server data source. |
| `state` | string enum | The current connection profile state (e.g. DRAFT, READY, or FAILED). Values: `STATE_UNSPECIFIED`, `DRAFT`, `CREATING`, `READY`, `UPDATING`, `DELETING`, `DELETED`, `FAILED`. |
| `updateTime` | string (google-datetime) | Output only. The timestamp when the resource was last updated. A timestamp in RFC3339 UTC "Zulu" format, accurate to nanoseconds. Example: "2014-10-02T15:01:23.045123456Z". |

### `ConnectionProfile` (v1beta1)

- A connection profile definition.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `cloudsql` | CloudSqlConnectionProfile | A CloudSQL database connection profile. |
| `createTime` | string (google-datetime) | Output only. The timestamp when the resource was created. A timestamp in RFC3339 UTC "Zulu" format, accurate to nanoseconds. Example: "2014-10-02T15:01:23.045123456Z". |
| `displayName` | string | The connection profile display name. |
| `error` | Status | Output only. The error details in case of state FAILED. |
| `labels` | object | The resource labels for connection profile to use to annotate any related underlying resources such as Compute Engine VMs. An object containing a list of "key": "value" pairs. Example: `{ "name": "wrench", "mass": "1.3kg", "count": "3" }`. |
| `mysql` | MySqlConnectionProfile | A MySQL database connection profile. |
| `name` | string | The name of this connection profile resource in the form of projects/{project}/locations/{location}/connectionProfiles/{connectionProfile}. |
| `provider` | string enum | The database provider. Values: `DATABASE_PROVIDER_UNSPECIFIED`, `CLOUDSQL`, `RDS`. |
| `state` | string enum | The current connection profile state (e.g. DRAFT, READY, or FAILED). Values: `STATE_UNSPECIFIED`, `DRAFT`, `CREATING`, `READY`, `UPDATING`, `DELETING`, `DELETED`, `FAILED`. |
| `updateTime` | string (google-datetime) | Output only. The timestamp when the resource was last updated. A timestamp in RFC3339 UTC "Zulu" format, accurate to nanoseconds. Example: "2014-10-02T15:01:23.045123456Z". |

### `ConstraintEntity`

- Constraint is not used as an independent entity, it is retrieved as part of another entity such as Table or View.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `customFeatures` | object | Custom engine specific features. |
| `name` | string | The name of the table constraint. |
| `referenceColumns` | array<string> | Reference columns which may be associated with the constraint. For example, if the constraint is a FOREIGN_KEY, this represents the list of full names of referenced columns by the foreign key. |
| `referenceTable` | string | Reference table which may be associated with the constraint. For example, if the constraint is a FOREIGN_KEY, this represents the list of full name of the referenced table by the foreign key. |
| `tableColumns` | array<string> | Table columns used as part of the Constraint, for example primary key constraint should list the columns which constitutes the key. |
| `tableName` | string | Table which is associated with the constraint. In case the constraint is defined on a table, this field is left empty as this information is stored in parent_name. However, if constraint is defined on a view, this field stores the table name on which the view is defined. |
| `type` | string | Type of constraint, for example unique, primary key, foreign key (currently only primary key is supported). |

### `ConversionWorkspace`

- The main conversion workspace resource entity.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. The timestamp when the workspace resource was created. |
| `destination` | DatabaseEngineInfo | Required. The destination engine details. |
| `destinationProvider` | string enum | Optional. The provider for the destination database. Values: `DATABASE_PROVIDER_UNSPECIFIED`, `CLOUDSQL`, `RDS`, `AURORA`, `ALLOYDB`, `AZURE_DATABASE`. |
| `displayName` | string | Optional. The display name for the workspace. |
| `globalSettings` | object | Optional. A generic list of settings for the workspace. The settings are database pair dependant and can indicate default behavior for the mapping rules engine or turn on or off specific features. Such examples can be: convert_foreign_key_to_interleave=true, skip_triggers=false, ignore_non_table_synonyms=true |
| `hasUncommittedChanges` | boolean | Output only. Whether the workspace has uncommitted changes (changes which were made after the workspace was committed). |
| `latestApplyTime` | string (google-datetime) | Optional. Output only. The timestamp when the workspace was last applied. |
| `latestCommitId` | string | Output only. The latest commit ID. |
| `latestCommitTime` | string (google-datetime) | Output only. The timestamp when the workspace was committed. |
| `latestConvertTime` | string (google-datetime) | Optional. Output only. The timestamp when the workspace was last converted. |
| `name` | string | Full name of the workspace resource, in the form of: projects/{project}/locations/{location}/conversionWorkspaces/{conversion_workspace}. |
| `source` | DatabaseEngineInfo | Required. The source engine details. |
| `sourceProvider` | string enum | Optional. The provider for the source database. Values: `DATABASE_PROVIDER_UNSPECIFIED`, `CLOUDSQL`, `RDS`, `AURORA`, `ALLOYDB`, `AZURE_DATABASE`. |
| `updateTime` | string (google-datetime) | Output only. The timestamp when the workspace resource was last updated. |

### `ConversionWorkspaceInfo`

- A conversion workspace's version.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `commitId` | string | The commit ID of the conversion workspace. |
| `name` | string | The resource name (URI) of the conversion workspace. |

### `ConvertConversionWorkspaceRequest`

- Request message for 'ConvertConversionWorkspace' request.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `autoCommit` | boolean | Optional. Specifies whether the conversion workspace is to be committed automatically after the conversion. |
| `convertFullPath` | boolean | Optional. Automatically convert the full entity path for each entity specified by the filter. For example, if the filter specifies a table, that table schema (and database if there is one) will also be converted. |
| `filter` | string | Optional. Filter the entities to convert. Leaving this field empty will convert all of the entities. Supports Google AIP-160 style filtering. |

### `ConvertJobDetails`

- Details regarding a Convert background job.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `filter` | string | Output only. AIP-160 based filter used to specify the entities to convert |

### `ConvertRowIdToColumn`

- Options to configure rule type ConvertROWIDToColumn. The rule is used to add column rowid to destination tables based on an Oracle rowid function/property. The rule filter field can refer to one or more entities. The rule scope can be one of: Table. This rule requires additional filter to be specified beyond the basic rule filter field, which is whether or not to work on tables which already have a primary key defined.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `onlyIfNoPrimaryKey` | boolean | Required. Only work on tables without primary key defined |

### `DataCacheConfig`

- Data cache is an optional feature available for Cloud SQL for MySQL Enterprise Plus edition only. For more information on data cache, see Data cache overview (https://cloud.google.com/sql/help/mysql-data-cache) in Cloud SQL documentation.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `dataCacheEnabled` | boolean | Optional. Whether data cache is enabled for the instance. |

### `DatabaseEngineInfo`

- The type and version of a source or destination database.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `engine` | string enum | Required. Engine type. Values: `DATABASE_ENGINE_UNSPECIFIED`, `MYSQL`, `POSTGRESQL`, `SQLSERVER`, `ORACLE`. |
| `version` | string | Required. Engine version, for example "12.c.1". |

### `DatabaseEntity`

- The base entity type for all the database related entities. The message contains the entity name, the name of its parent, the entity type, and the specific details per entity type.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `database` | DatabaseInstanceEntity | Database. |
| `databaseFunction` | FunctionEntity | Function. |
| `databasePackage` | PackageEntity | Package. |
| `entityDdl` | array<EntityDdl> | Details about the entity DDL script. Multiple DDL scripts are provided for child entities such as a table entity will have one DDL for the table with additional DDLs for each index, constraint and such. |
| `entityType` | string enum | The type of the database entity (table, view, index, ...). Values: `DATABASE_ENTITY_TYPE_UNSPECIFIED`, `DATABASE_ENTITY_TYPE_SCHEMA`, `DATABASE_ENTITY_TYPE_TABLE`, `DATABASE_ENTITY_TYPE_COLUMN`, `DATABASE_ENTITY_TYPE_CONSTRAINT`, `DATABASE_ENTITY_TYPE_INDEX`, `DATABASE_ENTITY_TYPE_TRIGGER`, `DATABASE_ENTITY_TYPE_VIEW`, `DATABASE_ENTITY_TYPE_SEQUENCE`, `DATABASE_ENTITY_TYPE_STORED_PROCEDURE`, `DATABASE_ENTITY_TYPE_FUNCTION`, `DATABASE_ENTITY_TYPE_SYNONYM`, `DATABASE_ENTITY_TYPE_DATABASE_PACKAGE`, `DATABASE_ENTITY_TYPE_UDT`, `DATABASE_ENTITY_TYPE_MATERIALIZED_VIEW`, `DATABASE_ENTITY_TYPE_DATABASE`. |
| `issues` | array<EntityIssue> | Details about the various issues found for the entity. |
| `mappings` | array<EntityMapping> | Details about entity mappings. For source tree entities, this holds the draft entities which were generated by the mapping rules. For draft tree entities, this holds the source entities which were converted to form the draft entity. Destination entities will have no mapping details. |
| `materializedView` | MaterializedViewEntity | Materialized view. |
| `parentEntity` | string | The full name of the parent entity (e.g. schema name). |
| `schema` | SchemaEntity | Schema. |
| `sequence` | SequenceEntity | Sequence. |
| `shortName` | string | The short name (e.g. table name) of the entity. |
| `storedProcedure` | StoredProcedureEntity | Stored procedure. |
| `synonym` | SynonymEntity | Synonym. |
| `table` | TableEntity | Table. |
| `tree` | string enum | The type of tree the entity belongs to. Values: `TREE_TYPE_UNSPECIFIED`, `SOURCE`, `DRAFT`, `DESTINATION`. |
| `udt` | UDTEntity | UDT. |
| `view` | ViewEntity | View. |

### `DatabaseInstanceEntity`

- DatabaseInstance acts as a parent entity to other database entities.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `customFeatures` | object | Custom engine specific features. |

### `DatabaseType`

- A message defining the database engine and provider.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `engine` | string enum | The database engine. Values: `DATABASE_ENGINE_UNSPECIFIED`, `MYSQL`, `POSTGRESQL`, `SQLSERVER`, `ORACLE`. |
| `provider` | string enum | The database provider. Values: `DATABASE_PROVIDER_UNSPECIFIED`, `CLOUDSQL`, `RDS`, `AURORA`, `ALLOYDB`, `AZURE_DATABASE`. |

### `DebugInfo`

- Describes additional debugging info.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `detail` | string | Additional debugging information provided by the server. |
| `stackEntries` | array<string> | The stack trace entries indicating where the error occurred. |

### `DemoteDestinationRequest`

- Request message for 'DemoteDestination' request.
- Version: v1

### `DescribeConversionWorkspaceRevisionsResponse`

- Response message for 'DescribeConversionWorkspaceRevisions' request.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `revisions` | array<ConversionWorkspace> | The list of conversion workspace revisions. |

### `DescribeDatabaseEntitiesResponse`

- Response message for 'DescribeDatabaseEntities' request.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `databaseEntities` | array<DatabaseEntity> | The list of database entities for the conversion workspace. |
| `nextPageToken` | string | A token which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. |

### `DoubleComparisonFilter`

- Filter based on relation between source value and compare value of type double in ConditionalColumnSetValue
- Version: v1

| Field | Type | Description |
|---|---|---|
| `value` | number (double) | Required. Double compare value to be used |
| `valueComparison` | string enum | Required. Relation between source value and compare value Values: `VALUE_COMPARISON_UNSPECIFIED`, `VALUE_COMPARISON_IF_VALUE_SMALLER_THAN`, `VALUE_COMPARISON_IF_VALUE_SMALLER_EQUAL_THAN`, `VALUE_COMPARISON_IF_VALUE_LARGER_THAN`, `VALUE_COMPARISON_IF_VALUE_LARGER_EQUAL_THAN`. |

### `DumpFlag`

- Dump flag definition.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `name` | string | The name of the flag |
| `value` | string | The value of the flag. |

### `DumpFlags`

- Dump flags definition.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `dumpFlags` | array<DumpFlag> | The flags for the initial dump. |

### `Empty`

- A generic empty message that you can re-use to avoid defining duplicated empty messages in your APIs. A typical example is to use it as the request or the response type of an API method. For instance: service Foo { rpc Bar(google.protobuf.Empty) returns (google.protobuf.Empty); }
- Version: v1

### `EncryptionConfig`

- EncryptionConfig describes the encryption config of a cluster that is encrypted with a CMEK (customer-managed encryption key).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `kmsKeyName` | string | The fully-qualified resource name of the KMS key. Each Cloud KMS key is regionalized and has the following format: projects/\[PROJECT\]/locations/\[REGION\]/keyRings/\[RING\]/cryptoKeys/\[KEY_NAME\] |

### `EntityDdl`

- A single DDL statement for a specific entity
- Version: v1

| Field | Type | Description |
|---|---|---|
| `ddl` | string | The actual ddl code. |
| `ddlKind` | string enum | The DDL Kind selected for apply, or UNSPECIFIED if the entity wasn't converted yet. Values: `DDL_KIND_UNSPECIFIED`, `SOURCE`, `DETERMINISTIC`, `AI`, `USER_EDIT`. |
| `ddlType` | string | Type of DDL (Create, Alter). |
| `editedDdlKind` | string enum | If ddl_kind is USER_EDIT, this holds the DDL kind of the original content - DETERMINISTIC or AI. Otherwise, this is DDL_KIND_UNSPECIFIED. Values: `DDL_KIND_UNSPECIFIED`, `SOURCE`, `DETERMINISTIC`, `AI`, `USER_EDIT`. |
| `entity` | string | The name of the database entity the ddl refers to. |
| `entityType` | string enum | The entity type (if the DDL is for a sub entity). Values: `DATABASE_ENTITY_TYPE_UNSPECIFIED`, `DATABASE_ENTITY_TYPE_SCHEMA`, `DATABASE_ENTITY_TYPE_TABLE`, `DATABASE_ENTITY_TYPE_COLUMN`, `DATABASE_ENTITY_TYPE_CONSTRAINT`, `DATABASE_ENTITY_TYPE_INDEX`, `DATABASE_ENTITY_TYPE_TRIGGER`, `DATABASE_ENTITY_TYPE_VIEW`, `DATABASE_ENTITY_TYPE_SEQUENCE`, `DATABASE_ENTITY_TYPE_STORED_PROCEDURE`, `DATABASE_ENTITY_TYPE_FUNCTION`, `DATABASE_ENTITY_TYPE_SYNONYM`, `DATABASE_ENTITY_TYPE_DATABASE_PACKAGE`, `DATABASE_ENTITY_TYPE_UDT`, `DATABASE_ENTITY_TYPE_MATERIALIZED_VIEW`, `DATABASE_ENTITY_TYPE_DATABASE`. |
| `issueId` | array<string> | EntityIssues found for this ddl. |

### `EntityId`

- An entity identifier.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `parentName` | string | The parent entity full name. |
| `parentType` | string enum | The type of the database entity (schema, table, view, ...). Values: `DATABASE_ENTITY_TYPE_UNSPECIFIED`, `DATABASE_ENTITY_TYPE_SCHEMA`, `DATABASE_ENTITY_TYPE_TABLE`, `DATABASE_ENTITY_TYPE_COLUMN`, `DATABASE_ENTITY_TYPE_CONSTRAINT`, `DATABASE_ENTITY_TYPE_INDEX`, `DATABASE_ENTITY_TYPE_TRIGGER`, `DATABASE_ENTITY_TYPE_VIEW`, `DATABASE_ENTITY_TYPE_SEQUENCE`, `DATABASE_ENTITY_TYPE_STORED_PROCEDURE`, `DATABASE_ENTITY_TYPE_FUNCTION`, `DATABASE_ENTITY_TYPE_SYNONYM`, `DATABASE_ENTITY_TYPE_DATABASE_PACKAGE`, `DATABASE_ENTITY_TYPE_UDT`, `DATABASE_ENTITY_TYPE_MATERIALIZED_VIEW`, `DATABASE_ENTITY_TYPE_DATABASE`. |
| `shortName` | string | The short name (e.g. table name) of the entity. |
| `type` | string enum | The type of the database entity (schema, table, view, index, ...). Values: `DATABASE_ENTITY_TYPE_UNSPECIFIED`, `DATABASE_ENTITY_TYPE_SCHEMA`, `DATABASE_ENTITY_TYPE_TABLE`, `DATABASE_ENTITY_TYPE_COLUMN`, `DATABASE_ENTITY_TYPE_CONSTRAINT`, `DATABASE_ENTITY_TYPE_INDEX`, `DATABASE_ENTITY_TYPE_TRIGGER`, `DATABASE_ENTITY_TYPE_VIEW`, `DATABASE_ENTITY_TYPE_SEQUENCE`, `DATABASE_ENTITY_TYPE_STORED_PROCEDURE`, `DATABASE_ENTITY_TYPE_FUNCTION`, `DATABASE_ENTITY_TYPE_SYNONYM`, `DATABASE_ENTITY_TYPE_DATABASE_PACKAGE`, `DATABASE_ENTITY_TYPE_UDT`, `DATABASE_ENTITY_TYPE_MATERIALIZED_VIEW`, `DATABASE_ENTITY_TYPE_DATABASE`. |

### `EntityIssue`

- Issue related to the entity.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `code` | string | Error/Warning code |
| `ddl` | string | The ddl which caused the issue, if relevant. |
| `entityType` | string enum | The entity type (if the DDL is for a sub entity). Values: `DATABASE_ENTITY_TYPE_UNSPECIFIED`, `DATABASE_ENTITY_TYPE_SCHEMA`, `DATABASE_ENTITY_TYPE_TABLE`, `DATABASE_ENTITY_TYPE_COLUMN`, `DATABASE_ENTITY_TYPE_CONSTRAINT`, `DATABASE_ENTITY_TYPE_INDEX`, `DATABASE_ENTITY_TYPE_TRIGGER`, `DATABASE_ENTITY_TYPE_VIEW`, `DATABASE_ENTITY_TYPE_SEQUENCE`, `DATABASE_ENTITY_TYPE_STORED_PROCEDURE`, `DATABASE_ENTITY_TYPE_FUNCTION`, `DATABASE_ENTITY_TYPE_SYNONYM`, `DATABASE_ENTITY_TYPE_DATABASE_PACKAGE`, `DATABASE_ENTITY_TYPE_UDT`, `DATABASE_ENTITY_TYPE_MATERIALIZED_VIEW`, `DATABASE_ENTITY_TYPE_DATABASE`. |
| `id` | string | Unique Issue ID. |
| `message` | string | Issue detailed message |
| `position` | Position | The position of the issue found, if relevant. |
| `severity` | string enum | Severity of the issue Values: `ISSUE_SEVERITY_UNSPECIFIED`, `ISSUE_SEVERITY_INFO`, `ISSUE_SEVERITY_WARNING`, `ISSUE_SEVERITY_ERROR`. |
| `type` | string enum | The type of the issue. Values: `ISSUE_TYPE_UNSPECIFIED`, `ISSUE_TYPE_DDL`, `ISSUE_TYPE_APPLY`, `ISSUE_TYPE_CONVERT`, `ISSUE_TYPE_PULL_SCHEMA`. |

### `EntityMapping`

- Details of the mappings of a database entity.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `draftEntity` | string | Target entity full name. The draft entity can also include a column, index or constraint using the same naming notation schema.table.column. |
| `draftType` | string enum | Type of draft entity. Values: `DATABASE_ENTITY_TYPE_UNSPECIFIED`, `DATABASE_ENTITY_TYPE_SCHEMA`, `DATABASE_ENTITY_TYPE_TABLE`, `DATABASE_ENTITY_TYPE_COLUMN`, `DATABASE_ENTITY_TYPE_CONSTRAINT`, `DATABASE_ENTITY_TYPE_INDEX`, `DATABASE_ENTITY_TYPE_TRIGGER`, `DATABASE_ENTITY_TYPE_VIEW`, `DATABASE_ENTITY_TYPE_SEQUENCE`, `DATABASE_ENTITY_TYPE_STORED_PROCEDURE`, `DATABASE_ENTITY_TYPE_FUNCTION`, `DATABASE_ENTITY_TYPE_SYNONYM`, `DATABASE_ENTITY_TYPE_DATABASE_PACKAGE`, `DATABASE_ENTITY_TYPE_UDT`, `DATABASE_ENTITY_TYPE_MATERIALIZED_VIEW`, `DATABASE_ENTITY_TYPE_DATABASE`. |
| `mappingLog` | array<EntityMappingLogEntry> | Entity mapping log entries. Multiple rules can be effective and contribute changes to a converted entity, such as a rule can handle the entity name, another rule can handle an entity type. In addition, rules which did not change the entity are also logged along with the reason preventing them to do so. |
| `sourceEntity` | string | Source entity full name. The source entity can also be a column, index or constraint using the same naming notation schema.table.column. |
| `sourceType` | string enum | Type of source entity. Values: `DATABASE_ENTITY_TYPE_UNSPECIFIED`, `DATABASE_ENTITY_TYPE_SCHEMA`, `DATABASE_ENTITY_TYPE_TABLE`, `DATABASE_ENTITY_TYPE_COLUMN`, `DATABASE_ENTITY_TYPE_CONSTRAINT`, `DATABASE_ENTITY_TYPE_INDEX`, `DATABASE_ENTITY_TYPE_TRIGGER`, `DATABASE_ENTITY_TYPE_VIEW`, `DATABASE_ENTITY_TYPE_SEQUENCE`, `DATABASE_ENTITY_TYPE_STORED_PROCEDURE`, `DATABASE_ENTITY_TYPE_FUNCTION`, `DATABASE_ENTITY_TYPE_SYNONYM`, `DATABASE_ENTITY_TYPE_DATABASE_PACKAGE`, `DATABASE_ENTITY_TYPE_UDT`, `DATABASE_ENTITY_TYPE_MATERIALIZED_VIEW`, `DATABASE_ENTITY_TYPE_DATABASE`. |

### `EntityMappingLogEntry`

- A single record of a rule which was used for a mapping.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `mappingComment` | string | Comment. |
| `ruleId` | string | Which rule caused this log entry. |
| `ruleRevisionId` | string | Rule revision ID. |

### `EntityMove`

- Options to configure rule type EntityMove. The rule is used to move an entity to a new schema. The rule filter field can refer to one or more entities. The rule scope can be one of: Table, Column, Constraint, Index, View, Function, Stored Procedure, Materialized View, Sequence, UDT
- Version: v1

| Field | Type | Description |
|---|---|---|
| `newSchema` | string | Required. The new schema |

### `EntityStatusView`

- A single entity for the UI view.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `dependencies` | array<EntityId> | Optional. The set of entities that this entity directly depends on, i.e., it does not include transitive dependencies. Provided only for FULL_WITH_DEPENDENCIES view. Dependencies are provided according to the request tree type. |
| `draftDdlKind` | string enum | The DDL Kind selected for apply. If UNSPECIFIED, the entity wasn't converted yet. For SUMMARY view, this rolls up from descendants with the logic of UNSPECIFIED < DETERMINISTIC < AI. USER_EDIT is not propagated. Values: `DDL_KIND_UNSPECIFIED`, `SOURCE`, `DETERMINISTIC`, `AI`, `USER_EDIT`. |
| `draftEntity` | EntityId | The entity short name and type from the DRAFT tree. |
| `editedDdlKind` | string enum | If ddl_kind is USER_EDIT, this holds the DDL kind of the original content - DETERMINISTIC or AI. Otherwise, this is DDL_KIND_UNSPECIFIED. Relevant only for FULL view. Values: `DDL_KIND_UNSPECIFIED`, `SOURCE`, `DETERMINISTIC`, `AI`, `USER_EDIT`. |
| `issues` | IssueAggregateData | Unresolved issues information according to the current Draft DdlKind. |
| `resolvedIssues` | IssueAggregateData | Resolved issues information according to the current Draft DdlKind. |
| `sourceEntity` | EntityId | The entity short name and type from the SOURCE tree. |
| `testedEntity` | boolean | Optional. Whether the entity has successfully generated and executed validation tests. |
| `wasApplied` | boolean | Was the entity applied on the destination. Relevant only for FULL view. |

### `ErrorInfo`

- Describes the cause of the error with structured details. Example of an error when contacting the "pubsub.googleapis.com" API when it is not enabled: { "reason": "API_DISABLED" "domain": "googleapis.com" "metadata": { "resource": "projects/123", "service": "pubsub.googleapis.com" } } This response indicates that the pubsub.googleapis.com API is not enabled. Example of an error that is returned when attempting to create a Spanner instance in a region that is out of stock: { "reason": "STOCKOUT" "domain": "spanner.googleapis.com", "metadata": { "availableRegions": "us-central1,us-east2" } }
- Version: v1

| Field | Type | Description |
|---|---|---|
| `domain` | string | The logical grouping to which the "reason" belongs. The error domain is typically the registered service name of the tool or product that generates the error. Example: "pubsub.googleapis.com". If the error is generated by some common infrastructure, the error domain must be a globally unique value that identifies the infrastructure. For Google API infrastructure, the error domain is "googleapis.com". |
| `metadata` | object | Additional structured details about this error. Keys must match a regular expression of `a-z+` but should ideally be lowerCamelCase. Also, they must be limited to 64 characters in length. When identifying the current value of an exceeded limit, the units should be contained in the key, not the value. For example, rather than `{"instanceLimit": "100/request"}`, should be returned as, `{"instanceLimitPerRequest": "100"}`, if the client exceeds the number of instances that can be created in a single (batch) request. |
| `reason` | string | The reason for the error. This is a constant value that identifies the proximate cause of the error. Error reasons are unique within a particular domain of errors. This should be at most 63 characters and match a regular expression of `A-Z+[A-Z0-9]`, which represents UPPER_SNAKE_CASE. |

### `Expr`

- Represents a textual expression in the Common Expression Language (CEL) syntax. CEL is a C-like expression language. The syntax and semantics of CEL are documented at https://github.com/google/cel-spec. Example (Comparison): title: "Summary size limit" description: "Determines if a summary is less than 100 chars" expression: "document.summary.size() < 100" Example (Equality): title: "Requestor is owner" description: "Determines if requestor is the document owner" expression: "document.owner == request.auth.claims.email" Example (Logic): title: "Public documents" description: "Determine whether the document should be publicly visible" expression: "document.type != 'private' && document.type != 'internal'" Example (Data Manipulation): title: "Notification string" description: "Create a notification string with a timestamp." expression: "'New message received at ' + string(document.create_time)" The exact variables and functions that may be referenced within an expression are determined by the service that evaluates it. See the service documentation for additional information.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `description` | string | Optional. Description of the expression. This is a longer text which describes the expression, e.g. when hovered over it in a UI. |
| `expression` | string | Textual representation of an expression in Common Expression Language syntax. |
| `location` | string | Optional. String indicating the location of the expression for error reporting, e.g. a file name and a position in the file. |
| `title` | string | Optional. Title for the expression, i.e. a short string describing its purpose. This can be used e.g. in UIs which allow to enter the expression. |

### `FetchEntitiesStatusViewResponse`

- Response message for DataMigrationService.FetchEntitiesStatusView.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `entities` | array<EntityStatusView> | A list of the entities matching the request, sorted by their full name (source name if requested the SOURCE tree, draft name if requested the DRAFT tree). Sub-entities (such as indexes) always appear immediately after their parent element. |
| `nextPageToken` | string | A token which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. |

### `FetchIssuesResponse`

- Response for fetching issues of a conversion workspace.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `issues` | array<Issue> | The list of issues for the conversion workspace. |
| `nextPageToken` | string | A token which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. |

### `FetchIssuesResponseIssuePosition`

- Issue position.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `column` | integer (int32) | Issue column number. |
| `length` | integer (int32) | Issue length. |
| `line` | integer (int32) | Issue line number. |
| `offset` | integer (int32) | Issue offset. |

### `FetchStaticIpsResponse`

- Response message for a 'FetchStaticIps' request.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | A token that can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. |
| `staticIps` | array<string> | List of static IPs. |

### `FieldViolation`

- A message type used to describe a single bad request field.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `description` | string | A description of why the request element is bad. |
| `field` | string | A path that leads to a field in the request body. The value will be a sequence of dot-separated identifiers that identify a protocol buffer field. Consider the following: message CreateContactRequest { message EmailAddress { enum Type { TYPE_UNSPECIFIED = 0; HOME = 1; WORK = 2; } optional string email = 1; repeated EmailType type = 2; } string full_name = 1; repeated EmailAddress email_addresses = 2; } In this example, in proto `field` could take one of the following values: \* `full_name` for a violation in the `full_name` value \* `email_addresses[0].email` for a violation in the `email` field of the first `email_addresses` message \* `email_addresses[2].type[1]` for a violation in the second `type` value in the third `email_addresses` message. In JSON, the same values are represented as: \* `fullName` for a violation in the `fullName` value \* `emailAddresses[0].email` for a violation in the `email` field of the first `emailAddresses` message \* `emailAddresses[2].type[1]` for a violation in the second `type` value in the third `emailAddresses` message. |
| `localizedMessage` | LocalizedMessage | Provides a localized error message for field-level errors that is safe to return to the API consumer. |
| `reason` | string | The reason for the field-level error. This is a constant value that identifies the proximate cause of the field-level error. It should uniquely identify the type of the FieldViolation within the scope of the google.rpc.ErrorInfo.domain. This should be at most 63 characters and match a regular expression of `A-Z+[A-Z0-9]`, which represents UPPER_SNAKE_CASE. |

### `FilterTableColumns`

- Options to configure rule type FilterTableColumns. The rule is used to filter the list of columns to include or exclude from a table. The rule filter field can refer to one entity. The rule scope can be: Table Only one of the two lists can be specified for the rule.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `excludeColumns` | array<string> | Optional. List of columns to be excluded for a particular table. |
| `includeColumns` | array<string> | Optional. List of columns to be included for a particular table. |

### `ForwardSshTunnelConnectivity`

- Forward SSH Tunnel connectivity.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `hostname` | string | Required. Hostname for the SSH tunnel. |
| `password` | string | Input only. SSH password. |
| `port` | integer (int32) | Port for the SSH tunnel, default value is 22. |
| `privateKey` | string | Input only. SSH private key. |
| `username` | string | Required. Username for the SSH tunnel. |

### `FunctionEntity`

- Function's parent is a schema.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `customFeatures` | object | Custom engine specific features. |
| `sqlCode` | string | The SQL code which creates the function. |

### `GcsSource`

- Cloud Storage source details for seeding.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `bucket` | string | Required. The Cloud Storage bucket containing the schema report files. |
| `prefix` | string | Required. The prefix for the report paths in the bucket. Different seed versions (report versions) might reside in the same bucket, the prefix allows to identify the correct seed version. |

### `GenerateSshScriptRequest`

- Request message for 'GenerateSshScript' request.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `vm` | string | Required. Bastion VM Instance name to use or to create. |
| `vmCreationConfig` | VmCreationConfig | The VM creation configuration |
| `vmPort` | integer (int32) | The port that will be open on the bastion host. |
| `vmSelectionConfig` | VmSelectionConfig | The VM selection configuration |

### `GenerateTcpProxyScriptRequest`

- Request message for 'GenerateTcpProxyScript' request.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `vmMachineType` | string | Required. The type of the Compute instance that will host the proxy. |
| `vmName` | string | Required. The name of the Compute instance that will host the proxy. |
| `vmSubnet` | string | Required. The name of the subnet the Compute instance will use for private connectivity. Must be supplied in the form of projects/{project}/regions/{region}/subnetworks/{subnetwork}. Note: the region for the subnet must match the Compute instance region. |
| `vmZone` | string | Optional. The Google Cloud Platform zone to create the VM in. The fully qualified name of the zone must be specified, including the region name, for example "us-central1-b". If not specified, uses the "-b" zone of the destination Connection Profile's region. |

### `GoogleCloudClouddmsV1OperationMetadata`

- Represents the metadata of the long-running operation.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `apiVersion` | string | Output only. API version used to start the operation. |
| `createTime` | string (google-datetime) | Output only. The time the operation was created. |
| `endTime` | string (google-datetime) | Output only. The time the operation finished running. |
| `metadata` | object | Output only. Additional metadata that is returned by the backend for the operation. |
| `requestedCancellation` | boolean | Output only. Identifies whether the user has requested cancellation of the operation. Operations that have successfully been cancelled have google.longrunning.Operation.error value with a google.rpc.Status.code of 1, corresponding to `Code.CANCELLED`. |
| `statusMessage` | string | Output only. Human-readable status of the operation, if any. |
| `target` | string | Output only. Server-defined resource path for the target of the operation. |
| `verb` | string | Output only. Name of the verb executed by the operation. |

### `GoogleCloudClouddmsV1beta1OperationMetadata`

- Represents the metadata of the long-running operation.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `apiVersion` | string | Output only. API version used to start the operation. |
| `createTime` | string (google-datetime) | Output only. The time the operation was created. |
| `endTime` | string (google-datetime) | Output only. The time the operation finished running. |
| `requestedCancellation` | boolean | Output only. Identifies whether the user has requested cancellation of the operation. Operations that have successfully been cancelled have Operation.error value with a google.rpc.Status.code of 1, corresponding to `Code.CANCELLED`. |
| `statusMessage` | string | Output only. Human-readable status of the operation, if any. |
| `target` | string | Output only. Server-defined resource path for the target of the operation. |
| `verb` | string | Output only. Name of the verb executed by the operation. |

### `Help`

- Provides links to documentation or for performing an out of band action. For example, if a quota check failed with an error indicating the calling project hasn't enabled the accessed service, this can contain a URL pointing directly to the right place in the developer console to flip the bit.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `links` | array<Link> | URL(s) pointing to additional information on handling the current error. |

### `HeterogeneousMetadata`

- Metadata for heterogeneous migration jobs objects.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `unsupportedEventsCount` | string (int64) | The number of unsupported events. |

### `ImportMappingRulesRequest`

- Request message for 'ImportMappingRules' request.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `autoCommit` | boolean | Required. Should the conversion workspace be committed automatically after the import operation. |
| `rulesFiles` | array<RulesFile> | Required. One or more rules files. |
| `rulesFormat` | string enum | Required. The format of the rules content file. Values: `IMPORT_RULES_FILE_FORMAT_UNSPECIFIED`, `IMPORT_RULES_FILE_FORMAT_HARBOUR_BRIDGE_SESSION_FILE`, `IMPORT_RULES_FILE_FORMAT_ORATOPG_CONFIG_FILE`. |

### `ImportRulesJobDetails`

- Details regarding an Import Rules background job.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `fileFormat` | string enum | Output only. The requested file format. Values: `IMPORT_RULES_FILE_FORMAT_UNSPECIFIED`, `IMPORT_RULES_FILE_FORMAT_HARBOUR_BRIDGE_SESSION_FILE`, `IMPORT_RULES_FILE_FORMAT_ORATOPG_CONFIG_FILE`. |
| `files` | array<string> | Output only. File names used for the import rules job. |

### `IndexEntity`

- Index is not used as an independent entity, it is retrieved as part of a Table entity.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `customFeatures` | object | Custom engine specific features. |
| `name` | string | The name of the index. |
| `tableColumns` | array<string> | Table columns used as part of the Index, for example B-TREE index should list the columns which constitutes the index. |
| `tableColumnsDescending` | array<boolean> | For each table_column, mark whether it's sorting order is ascending (false) or descending (true). If no value is defined, assume all columns are sorted in ascending order. Otherwise, the number of items must match that of table_columns with each value specifying the direction of the matched column by its index. |
| `type` | string | Type of index, for example B-TREE. |
| `unique` | boolean | Boolean value indicating whether the index is unique. |

### `InstanceNetworkConfig`

- Metadata related to instance level network configuration.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `authorizedExternalNetworks` | array<AuthorizedNetwork> | Optional. A list of external network authorized to access this instance. |
| `enableOutboundPublicIp` | boolean | Optional. Enabling an outbound public IP address to support a database server sending requests out into the internet. |
| `enablePublicIp` | boolean | Optional. Enabling public ip for the instance. |

### `IntComparisonFilter`

- Filter based on relation between source value and compare value of type integer in ConditionalColumnSetValue
- Version: v1

| Field | Type | Description |
|---|---|---|
| `value` | string (int64) | Required. Integer compare value to be used |
| `valueComparison` | string enum | Required. Relation between source value and compare value Values: `VALUE_COMPARISON_UNSPECIFIED`, `VALUE_COMPARISON_IF_VALUE_SMALLER_THAN`, `VALUE_COMPARISON_IF_VALUE_SMALLER_EQUAL_THAN`, `VALUE_COMPARISON_IF_VALUE_LARGER_THAN`, `VALUE_COMPARISON_IF_VALUE_LARGER_EQUAL_THAN`. |

### `Issue`

- Issue related to the entity.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `categoryId` | string enum | The category ID. Values: `ISSUE_CATEGORY_ID_UNSPECIFIED`, `ISSUE_CATEGORY_ID_CW00`, `ISSUE_CATEGORY_ID_CW01`, `ISSUE_CATEGORY_ID_CW02`, `ISSUE_CATEGORY_ID_CW03`, `ISSUE_CATEGORY_ID_CW04`, `ISSUE_CATEGORY_ID_CW05`, `ISSUE_CATEGORY_ID_CW06`, `ISSUE_CATEGORY_ID_CW07`, `ISSUE_CATEGORY_ID_CW08`, `ISSUE_CATEGORY_ID_CW99`, `ISSUE_CATEGORY_ID_QA00`, `ISSUE_CATEGORY_ID_AP00`. |
| `entityFullName` | string | Entity full name. |
| `entityType` | string enum | The entity type (if the DDL is for a sub entity). Values: `DATABASE_ENTITY_TYPE_UNSPECIFIED`, `DATABASE_ENTITY_TYPE_SCHEMA`, `DATABASE_ENTITY_TYPE_TABLE`, `DATABASE_ENTITY_TYPE_COLUMN`, `DATABASE_ENTITY_TYPE_CONSTRAINT`, `DATABASE_ENTITY_TYPE_INDEX`, `DATABASE_ENTITY_TYPE_TRIGGER`, `DATABASE_ENTITY_TYPE_VIEW`, `DATABASE_ENTITY_TYPE_SEQUENCE`, `DATABASE_ENTITY_TYPE_STORED_PROCEDURE`, `DATABASE_ENTITY_TYPE_FUNCTION`, `DATABASE_ENTITY_TYPE_SYNONYM`, `DATABASE_ENTITY_TYPE_DATABASE_PACKAGE`, `DATABASE_ENTITY_TYPE_UDT`, `DATABASE_ENTITY_TYPE_MATERIALIZED_VIEW`, `DATABASE_ENTITY_TYPE_DATABASE`. |
| `groupId` | string enum | The group ID. Values: `ISSUE_GROUP_ID_UNSPECIFIED`, `ISSUE_GROUP_ID_CW_OP0000`, `ISSUE_GROUP_ID_CW_OP0001`, `ISSUE_GROUP_ID_CW_OP0002`, `ISSUE_GROUP_ID_CW_OP0101`, `ISSUE_GROUP_ID_CW_OP0102`, `ISSUE_GROUP_ID_CW_OP0103`, `ISSUE_GROUP_ID_CW_OP0200`, `ISSUE_GROUP_ID_CW_OP0201`, `ISSUE_GROUP_ID_CW_OP0202`, `ISSUE_GROUP_ID_CW_OP0203`, `ISSUE_GROUP_ID_CW_OP0204`, `ISSUE_GROUP_ID_CW_OP0205`, `ISSUE_GROUP_ID_CW_OP0206`, `ISSUE_GROUP_ID_CW_OP0300`, `ISSUE_GROUP_ID_CW_OP0301`, `ISSUE_GROUP_ID_CW_OP0315`, `ISSUE_GROUP_ID_CW_OP0303`, `ISSUE_GROUP_ID_CW_OP0304`, `ISSUE_GROUP_ID_CW_OP0305`, `ISSUE_GROUP_ID_CW_OP0306`, `ISSUE_GROUP_ID_CW_OP0307`, `ISSUE_GROUP_ID_CW_OP0308`, `ISSUE_GROUP_ID_CW_OP0309`, `ISSUE_GROUP_ID_CW_OP0310`, `ISSUE_GROUP_ID_CW_OP0311`, `ISSUE_GROUP_ID_CW_OP0312`, `ISSUE_GROUP_ID_CW_OP0313`, `ISSUE_GROUP_ID_CW_OP0314`, `ISSUE_GROUP_ID_CW_OP0302`, `ISSUE_GROUP_ID_CW_OP0400`, `ISSUE_GROUP_ID_CW_OP0401`, `ISSUE_GROUP_ID_CW_OP0402`, `ISSUE_GROUP_ID_CW_OP0403`, `ISSUE_GROUP_ID_CW_OP0404`, `ISSUE_GROUP_ID_CW_OP0500`, `ISSUE_GROUP_ID_CW_OP0501`, `ISSUE_GROUP_ID_CW_OP0502`, `ISSUE_GROUP_ID_CW_OP0503`, `ISSUE_GROUP_ID_CW_OP0504`, `ISSUE_GROUP_ID_CW_OP0601`, `ISSUE_GROUP_ID_CW_OP0602`, `ISSUE_GROUP_ID_CW_OP0603`, `ISSUE_GROUP_ID_CW_OP0604`, `ISSUE_GROUP_ID_CW_OP0605`, `ISSUE_GROUP_ID_CW_OP0606`, `ISSUE_GROUP_ID_CW_OP0701`, `ISSUE_GROUP_ID_CW_OP0702`, `ISSUE_GROUP_ID_CW_OP0801`, `ISSUE_GROUP_ID_CW_OP0802`, `ISSUE_GROUP_ID_CW_OP0803`, `ISSUE_GROUP_ID_CW_OP0804`, `ISSUE_GROUP_ID_CW_OP0805`, `ISSUE_GROUP_ID_CW_OP0806`, `ISSUE_GROUP_ID_CW_OP0807`, `ISSUE_GROUP_ID_CW_OP0808`, `ISSUE_GROUP_ID_QA_OP0000`, `ISSUE_GROUP_ID_CW_SP0000`, `ISSUE_GROUP_ID_CW_SP0001`, `ISSUE_GROUP_ID_CW_SP0002`, `ISSUE_GROUP_ID_CW_SP0101`, `ISSUE_GROUP_ID_CW_SP0102`, `ISSUE_GROUP_ID_CW_SP0103`, `ISSUE_GROUP_ID_CW_SP0200`, `ISSUE_GROUP_ID_CW_SP0201`, `ISSUE_GROUP_ID_CW_SP0202`, `ISSUE_GROUP_ID_CW_SP0203`, `ISSUE_GROUP_ID_CW_SP0204`, `ISSUE_GROUP_ID_CW_SP0205`, `ISSUE_GROUP_ID_CW_SP0300`, `ISSUE_GROUP_ID_CW_SP0302`, `ISSUE_GROUP_ID_CW_SP0306`, `ISSUE_GROUP_ID_CW_SP0308`, `ISSUE_GROUP_ID_CW_SP0309`, `ISSUE_GROUP_ID_CW_SP0310`, `ISSUE_GROUP_ID_CW_SP0311`, `ISSUE_GROUP_ID_CW_SP0312`, `ISSUE_GROUP_ID_CW_SP0313`, `ISSUE_GROUP_ID_CW_SP0314`, `ISSUE_GROUP_ID_CW_SP0400`, `ISSUE_GROUP_ID_CW_SP0401`, `ISSUE_GROUP_ID_CW_SP0402`, `ISSUE_GROUP_ID_CW_SP0403`, `ISSUE_GROUP_ID_CW_SP0404`, `ISSUE_GROUP_ID_CW_SP0500`, `ISSUE_GROUP_ID_CW_SP0501`, `ISSUE_GROUP_ID_CW_SP0502`, `ISSUE_GROUP_ID_CW_SP0503`, `ISSUE_GROUP_ID_CW_SP0504`, `ISSUE_GROUP_ID_CW_SP0601`, `ISSUE_GROUP_ID_CW_SP0602`, `ISSUE_GROUP_ID_CW_SP0604`, `ISSUE_GROUP_ID_CW_SP0701`, `ISSUE_GROUP_ID_CW_SP0802`, `ISSUE_GROUP_ID_CW_SP0807`, `ISSUE_GROUP_ID_QA_SP0000`, `ISSUE_GROUP_ID_CW_AI9900`, `ISSUE_GROUP_ID_CW_AI9901`, `ISSUE_GROUP_ID_CW_AI9902`, `ISSUE_GROUP_ID_CW_AP0000`. |
| `id` | string | Unique Issue ID. Use this ID when referencing a specific issue in other API calls, such as DataMigrationService.SetIssuesState. |
| `issueOrigin` | string enum | The source of the issue (deterministic, gemini, etc). Values: `ISSUE_ORIGIN_UNSPECIFIED`, `ISSUE_ORIGIN_DETERMINISTIC`, `ISSUE_ORIGIN_AI`, `ISSUE_ORIGIN_AI_FROM_DETERMINISTIC`. |
| `issueState` | string enum | Output only. The state of the issue (open, resolved, etc). Values: `ISSUE_STATE_UNSPECIFIED`, `ISSUE_STATE_OPEN`, `ISSUE_STATE_RESOLVED`. |
| `message` | string | Issue detailed message. |
| `position` | FetchIssuesResponseIssuePosition | The position of the issue found, if relevant. |
| `severity` | string enum | Severity of the issue. Values: `ISSUE_SEVERITY_UNSPECIFIED`, `ISSUE_SEVERITY_INFO`, `ISSUE_SEVERITY_WARNING`, `ISSUE_SEVERITY_ERROR`. |
| `type` | string enum | The type of the issue. Values: `ISSUE_TYPE_UNSPECIFIED`, `ISSUE_TYPE_CONVERSION`, `ISSUE_TYPE_PULL_SCHEMA`, `ISSUE_TYPE_APPLY`. |

### `IssueAggregateData`

- Aggregate issue information.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `errorCount` | integer (int32) | Number of error issues. |
| `infoCount` | integer (int32) | Number of info issues. |
| `warningCount` | integer (int32) | Number of warning issues. |

### `Link`

- Describes a URL link.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `description` | string | Describes what the link offers. |
| `url` | string | The URL of the link. |

### `ListConnectionProfilesResponse`

- Response message for 'ListConnectionProfiles' request.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `connectionProfiles` | array<ConnectionProfile> | The response list of connection profiles. |
| `nextPageToken` | string | A token which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. |
| `unreachable` | array<string> | Locations that could not be reached. |

### `ListConversionWorkspacesResponse`

- Response message for 'ListConversionWorkspaces' request.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `conversionWorkspaces` | array<ConversionWorkspace> | The list of conversion workspace objects. |
| `nextPageToken` | string | A token which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. |
| `unreachable` | array<string> | Locations that could not be reached. |

### `ListLocationsResponse`

- The response message for Locations.ListLocations.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `locations` | array<Location> | A list of locations that matches the specified filter in the request. |
| `nextPageToken` | string | The standard List next-page token. |

### `ListMappingRulesResponse`

- Response message for 'ListMappingRulesRequest' request.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `mappingRules` | array<MappingRule> | The list of conversion workspace mapping rules. |
| `nextPageToken` | string | A token which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. |

### `ListMigrationJobObjectsResponse`

- Response containing the objects for a migration job.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `migrationJobObjects` | array<MigrationJobObject> | List of migration job objects. |
| `nextPageToken` | string | A token, which can be sent as `page_token` to retrieve the next page. |

### `ListMigrationJobsResponse`

- Response message for 'ListMigrationJobs' request.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `migrationJobs` | array<MigrationJob> | The list of migration jobs objects. |
| `nextPageToken` | string | A token which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. |
| `unreachable` | array<string> | Locations that could not be reached. |

### `ListOperationsResponse`

- The response message for Operations.ListOperations.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | The standard List next-page token. |
| `operations` | array<Operation> | A list of operations that matches the specified filter in the request. |
| `unreachable` | array<string> | Unordered list. Unreachable resources. Populated when the request sets `ListOperationsRequest.return_partial_success` and reads across collections. For example, when attempting to list all resources across all supported locations. |

### `ListPrivateConnectionsResponse`

- Response message for 'ListPrivateConnections' request.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | A token which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. |
| `privateConnections` | array<PrivateConnection> | List of private connections. |
| `unreachable` | array<string> | Locations that could not be reached. |

### `LocalizedMessage`

- Provides a localized error message that is safe to return to the user which can be attached to an RPC error.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `locale` | string | The locale used following the specification defined at https://www.rfc-editor.org/rfc/bcp/bcp47.txt. Examples are: "en-US", "fr-CH", "es-MX" |
| `message` | string | The localized error message in the above locale. |

### `Location`

- A resource that represents a Google Cloud location.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `displayName` | string | The friendly name for this location, typically a nearby city name. For example, "Tokyo". |
| `labels` | object | Cross-service attributes for the location. For example {"cloud.googleapis.com/region": "us-east1"} |
| `locationId` | string | The canonical id for this location. For example: `"us-east1"`. |
| `metadata` | object | Service-specific metadata. For example the available capacity at the given location. |
| `name` | string | Resource name for the location, which may vary between implementations. For example: `"projects/example-project/locations/us-east1"` |

### `LogFileDirectories`

- Configuration to specify the Oracle directories to access the log files.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `archivedLogDirectory` | string | Required. Oracle directory for archived logs. |
| `onlineLogDirectory` | string | Required. Oracle directory for online logs. |

### `LogMiner`

- Configuration to use LogMiner CDC method.
- Version: v1

### `LookupMigrationJobObjectRequest`

- Request for looking up a specific migration job object by its source object identifier.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `sourceObjectIdentifier` | SourceObjectIdentifier | Required. The source object identifier which maps to the migration job object. |

### `MachineConfig`

- MachineConfig describes the configuration of a machine.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `cpuCount` | integer (int32) | The number of CPU's in the VM instance. |
| `machineType` | string | Optional. Machine type of the VM instance. E.g. "n2-highmem-4", "n2-highmem-8", "c4a-highmem-4-lssd". cpu_count must match the number of vCPUs in the machine type. |

### `MappingRule`

- Definition of a transformation that is to be applied to a group of entities in the source schema. Several such transformations can be applied to an entity sequentially to define the corresponding entity in the target schema.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `conditionalColumnSetValue` | ConditionalColumnSetValue | Optional. Rule to specify how the data contained in a column should be transformed (such as trimmed, rounded, etc) provided that the data meets certain criteria. |
| `convertRowidColumn` | ConvertRowIdToColumn | Optional. Rule to specify how multiple tables should be converted with an additional rowid column. |
| `displayName` | string | Optional. A human readable name |
| `entityMove` | EntityMove | Optional. Rule to specify how multiple entities should be relocated into a different schema. |
| `filter` | MappingRuleFilter | Required. The rule filter |
| `filterTableColumns` | FilterTableColumns | Optional. Rule to specify the list of columns to include or exclude from a table. |
| `multiColumnDataTypeChange` | MultiColumnDatatypeChange | Optional. Rule to specify how multiple columns should be converted to a different data type. |
| `multiEntityRename` | MultiEntityRename | Optional. Rule to specify how multiple entities should be renamed. |
| `name` | string | Full name of the mapping rule resource, in the form of: projects/{project}/locations/{location}/conversionWorkspaces/{set}/mappingRule/{rule}. |
| `revisionCreateTime` | string (google-datetime) | Output only. The timestamp that the revision was created. |
| `revisionId` | string | Output only. The revision ID of the mapping rule. A new revision is committed whenever the mapping rule is changed in any way. The format is an 8-character hexadecimal string. |
| `ruleOrder` | string (int64) | Required. The order in which the rule is applied. Lower order rules are applied before higher value rules so they may end up being overridden. |
| `ruleScope` | string enum | Required. The rule scope Values: `DATABASE_ENTITY_TYPE_UNSPECIFIED`, `DATABASE_ENTITY_TYPE_SCHEMA`, `DATABASE_ENTITY_TYPE_TABLE`, `DATABASE_ENTITY_TYPE_COLUMN`, `DATABASE_ENTITY_TYPE_CONSTRAINT`, `DATABASE_ENTITY_TYPE_INDEX`, `DATABASE_ENTITY_TYPE_TRIGGER`, `DATABASE_ENTITY_TYPE_VIEW`, `DATABASE_ENTITY_TYPE_SEQUENCE`, `DATABASE_ENTITY_TYPE_STORED_PROCEDURE`, `DATABASE_ENTITY_TYPE_FUNCTION`, `DATABASE_ENTITY_TYPE_SYNONYM`, `DATABASE_ENTITY_TYPE_DATABASE_PACKAGE`, `DATABASE_ENTITY_TYPE_UDT`, `DATABASE_ENTITY_TYPE_MATERIALIZED_VIEW`, `DATABASE_ENTITY_TYPE_DATABASE`. |
| `setTablePrimaryKey` | SetTablePrimaryKey | Optional. Deprecated: This rule is no longer supported. |
| `singleColumnChange` | SingleColumnChange | Optional. Rule to specify how a single column is converted. |
| `singleEntityRename` | SingleEntityRename | Optional. Rule to specify how a single entity should be renamed. |
| `singlePackageChange` | SinglePackageChange | Optional. Rule to specify how a single package is converted. |
| `sourceSqlChange` | SourceSqlChange | Optional. Rule to change the sql code for an entity, for example, function, procedure. |
| `state` | string enum | Optional. The mapping rule state Values: `STATE_UNSPECIFIED`, `ENABLED`, `DISABLED`, `DELETED`. |

### `MappingRuleFilter`

- A filter defining the entities that a mapping rule should be applied to. When more than one field is specified, the rule is applied only to entities which match all the fields.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `entities` | array<string> | Optional. The rule should be applied to specific entities defined by their fully qualified names. |
| `entityNameContains` | string | Optional. The rule should be applied to entities whose non-qualified name contains the given string. |
| `entityNamePrefix` | string | Optional. The rule should be applied to entities whose non-qualified name starts with the given prefix. |
| `entityNameSuffix` | string | Optional. The rule should be applied to entities whose non-qualified name ends with the given suffix. |
| `parentEntity` | string | Optional. The rule should be applied to entities whose parent entity (fully qualified name) matches the given value. For example, if the rule applies to a table entity, the expected value should be a schema (schema). If the rule applies to a column or index entity, the expected value can be either a schema (schema) or a table (schema.table) |

### `MaterializedViewEntity`

- MaterializedView's parent is a schema.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `customFeatures` | object | Custom engine specific features. |
| `indices` | array<IndexEntity> | View indices. |
| `sqlCode` | string | The SQL code which creates the view. |

### `MigrationJob`

- Represents a Database Migration Service migration job object.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `cmekKeyName` | string | The CMEK (customer-managed encryption key) fully qualified key name used for the migration job. This field supports all migration jobs types except for: \* Mysql to Mysql (use the cmek field in the cloudsql connection profile instead). \* PostrgeSQL to PostgreSQL (use the cmek field in the cloudsql connection profile instead). \* PostgreSQL to AlloyDB (use the kms_key_name field in the alloydb connection profile instead). Each Cloud CMEK key has the following format: projects/\[PROJECT\]/locations/\[REGION\]/keyRings/\[RING\]/cryptoKeys/\[KEY_NAME\] |
| `conversionWorkspace` | ConversionWorkspaceInfo | The conversion workspace used by the migration. |
| `createTime` | string (google-datetime) | Output only. The timestamp when the migration job resource was created. A timestamp in RFC3339 UTC "Zulu" format, accurate to nanoseconds. Example: "2014-10-02T15:01:23.045123456Z". |
| `destination` | string | Required. The resource name (URI) of the destination connection profile. |
| `destinationDatabase` | DatabaseType | The database engine type and provider of the destination. |
| `displayName` | string | The migration job display name. |
| `dumpFlags` | DumpFlags | The initial dump flags. This field and the "dump_path" field are mutually exclusive. |
| `dumpPath` | string | The path to the dump file in Google Cloud Storage, in the format: (gs://\[BUCKET_NAME\]/\[OBJECT_NAME\]). This field and the "dump_flags" field are mutually exclusive. |
| `dumpType` | string enum | Optional. The type of the data dump. Supported for MySQL to CloudSQL for MySQL migrations only. Values: `DUMP_TYPE_UNSPECIFIED`, `LOGICAL`, `PHYSICAL`. |
| `duration` | string (google-duration) | Output only. The duration of the migration job (in seconds). A duration in seconds with up to nine fractional digits, terminated by 's'. Example: "3.5s". |
| `endTime` | string (google-datetime) | Output only. If the migration job is completed, the time when it was completed. |
| `error` | Status | Output only. The error details in case of state FAILED. |
| `filter` | string | This field can be used to select the entities to migrate as part of the migration job. It uses AIP-160 notation to select a subset of the entities configured on the associated conversion-workspace. This field should not be set on migration-jobs that are not associated with a conversion workspace. |
| `labels` | object | The resource labels for migration job to use to annotate any related underlying resources such as Compute Engine VMs. An object containing a list of "key": "value" pairs. Example: `{ "name": "wrench", "mass": "1.3kg", "count": "3" }`. |
| `mysqlHomogeneousConfig` | MySqlHomogeneousConfig | Optional. Configuration for MySQL homogeneous migration. |
| `name` | string | The name (URI) of this migration job resource, in the form of: projects/{project}/locations/{location}/migrationJobs/{migrationJob}. |
| `objectsConfig` | MigrationJobObjectsConfig | Optional. The objects that need to be migrated. |
| `oracleToPostgresConfig` | OracleToPostgresConfig | Configuration for heterogeneous \*\*Oracle to Cloud SQL for PostgreSQL\*\* and \*\*Oracle to AlloyDB for PostgreSQL\*\* migrations. |
| `originalMigrationName` | string | Optional. A failback replication pointer to the resource name (URI) of the original migration job. |
| `performanceConfig` | PerformanceConfig | Optional. Data dump and load parallelism settings used by the migration. |
| `phase` | string enum | Output only. The current migration job phase. Values: `PHASE_UNSPECIFIED`, `FULL_DUMP`, `CDC`, `PROMOTE_IN_PROGRESS`, `WAITING_FOR_SOURCE_WRITES_TO_STOP`, `PREPARING_THE_DUMP`, `READY_FOR_PROMOTE`, `PHASE_FAILBACK`. |
| `postgresHomogeneousConfig` | PostgresHomogeneousConfig | Optional. Configuration for PostgreSQL homogeneous migration. |
| `postgresToSqlserverConfig` | PostgresToSqlServerConfig | Configuration for heterogeneous failback migrations from \*\*PostgreSQL to SQL Server\*\*. |
| `purpose` | string enum | Output only. Migration job mode. Migration jobs can be standard forward jobs or failback migration jobs. Values: `PURPOSE_UNSPECIFIED`, `MIGRATE`, `FAILBACK`. |
| `reverseSshConnectivity` | ReverseSshConnectivity | The details needed to communicate to the source over Reverse SSH tunnel connectivity. |
| `satisfiesPzi` | boolean | Output only. Reserved for future use. |
| `satisfiesPzs` | boolean | Output only. Reserved for future use. |
| `source` | string | Required. The resource name (URI) of the source connection profile. |
| `sourceDatabase` | DatabaseType | The database engine type and provider of the source. |
| `sqlserverHomogeneousMigrationJobConfig` | SqlServerHomogeneousMigrationJobConfig | Optional. Configuration for SQL Server homogeneous migration. |
| `sqlserverToPostgresConfig` | SqlServerToPostgresConfig | Configuration for heterogeneous \*\*SQL Server to Cloud SQL for PostgreSQL\*\* migrations. |
| `state` | string enum | The current migration job state. Values: `STATE_UNSPECIFIED`, `MAINTENANCE`, `DRAFT`, `CREATING`, `NOT_STARTED`, `RUNNING`, `FAILED`, `COMPLETED`, `DELETING`, `STOPPING`, `STOPPED`, `DELETED`, `UPDATING`, `STARTING`, `RESTARTING`, `RESUMING`. |
| `staticIpConnectivity` | StaticIpConnectivity | static ip connectivity data (default, no additional details needed). |
| `type` | string enum | Required. The migration job type. Values: `TYPE_UNSPECIFIED`, `ONE_TIME`, `CONTINUOUS`. |
| `updateTime` | string (google-datetime) | Output only. The timestamp when the migration job resource was last updated. A timestamp in RFC3339 UTC "Zulu" format, accurate to nanoseconds. Example: "2014-10-02T15:01:23.045123456Z". |
| `vpcPeeringConnectivity` | VpcPeeringConnectivity | The details of the VPC network that the source database is located in. |

### `MigrationJob` (v1beta1)

- Represents a Database Migration Service migration job object.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. The timestamp when the migration job resource was created. A timestamp in RFC3339 UTC "Zulu" format, accurate to nanoseconds. Example: "2014-10-02T15:01:23.045123456Z". |
| `destination` | string | Required. The resource name (URI) of the destination connection profile. |
| `destinationDatabase` | DatabaseType | The database engine type and provider of the destination. |
| `displayName` | string | The migration job display name. |
| `dumpPath` | string | The path to the dump file in Google Cloud Storage, in the format: (gs://\[BUCKET_NAME\]/\[OBJECT_NAME\]). |
| `duration` | string (google-duration) | Output only. The duration of the migration job (in seconds). A duration in seconds with up to nine fractional digits, terminated by 's'. Example: "3.5s". |
| `endTime` | string (google-datetime) | Output only. If the migration job is completed, the time when it was completed. |
| `error` | Status | Output only. The error details in case of state FAILED. |
| `labels` | object | The resource labels for migration job to use to annotate any related underlying resources such as Compute Engine VMs. An object containing a list of "key": "value" pairs. Example: `{ "name": "wrench", "mass": "1.3kg", "count": "3" }`. |
| `name` | string | The name (URI) of this migration job resource, in the form of: projects/{project}/locations/{location}/migrationJobs/{migrationJob}. |
| `phase` | string enum | Output only. The current migration job phase. Values: `PHASE_UNSPECIFIED`, `FULL_DUMP`, `CDC`, `PROMOTE_IN_PROGRESS`, `WAITING_FOR_SOURCE_WRITES_TO_STOP`, `PREPARING_THE_DUMP`. |
| `reverseSshConnectivity` | ReverseSshConnectivity | The details needed to communicate to the source over Reverse SSH tunnel connectivity. |
| `source` | string | Required. The resource name (URI) of the source connection profile. |
| `sourceDatabase` | DatabaseType | The database engine type and provider of the source. |
| `state` | string enum | The current migration job state. Values: `STATE_UNSPECIFIED`, `MAINTENANCE`, `DRAFT`, `CREATING`, `NOT_STARTED`, `RUNNING`, `FAILED`, `COMPLETED`, `DELETING`, `STOPPING`, `STOPPED`, `DELETED`, `UPDATING`, `STARTING`, `RESTARTING`, `RESUMING`. |
| `staticIpConnectivity` | StaticIpConnectivity | static ip connectivity data (default, no additional details needed). |
| `type` | string enum | Required. The migration job type. Values: `TYPE_UNSPECIFIED`, `ONE_TIME`, `CONTINUOUS`. |
| `updateTime` | string (google-datetime) | Output only. The timestamp when the migration job resource was last updated. A timestamp in RFC3339 UTC "Zulu" format, accurate to nanoseconds. Example: "2014-10-02T15:01:23.045123456Z". |
| `vpcPeeringConnectivity` | VpcPeeringConnectivity | The details of the VPC network that the source database is located in. |

### `MigrationJobObject`

- A specific Migration Job Object (e.g. a specifc DB Table)
- Version: v1

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. The creation time of the migration job object. |
| `error` | Status | Output only. The error details in case of failure. |
| `heterogeneousMetadata` | HeterogeneousMetadata | Output only. Metadata for heterogeneous migration jobs objects. |
| `name` | string | The object's name. |
| `phase` | string enum | Output only. The phase of the migration job object. Values: `PHASE_UNSPECIFIED`, `FULL_DUMP`, `CDC`, `READY_FOR_PROMOTE`, `PROMOTE_IN_PROGRESS`, `PROMOTED`, `DIFF_BACKUP`, `CREATING_BACKUP`, `RESTORING_BACKUP`. |
| `sourceObject` | SourceObjectIdentifier | The object identifier in the data source. |
| `state` | string enum | The state of the migration job object. Values: `STATE_UNSPECIFIED`, `NOT_STARTED`, `RUNNING`, `STOPPING`, `STOPPED`, `RESTARTING`, `FAILED`, `REMOVING`, `NOT_SELECTED`, `COMPLETED`. |
| `updateTime` | string (google-datetime) | Output only. The last update time of the migration job object. |

### `MigrationJobObjectsConfig`

- Configuration for the objects to be migrated.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `sourceObjectsConfig` | SourceObjectsConfig | The list of the migration job objects. |

### `MigrationJobVerificationError`

- Error message of a verification Migration job.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `errorCode` | string enum | Output only. An instance of ErrorCode specifying the error that occurred. Values: `ERROR_CODE_UNSPECIFIED`, `CONNECTION_FAILURE`, `AUTHENTICATION_FAILURE`, `INVALID_CONNECTION_PROFILE_CONFIG`, `VERSION_INCOMPATIBILITY`, `CONNECTION_PROFILE_TYPES_INCOMPATIBILITY`, `NO_PGLOGICAL_INSTALLED`, `PGLOGICAL_NODE_ALREADY_EXISTS`, `INVALID_WAL_LEVEL`, `INVALID_SHARED_PRELOAD_LIBRARY`, `INSUFFICIENT_MAX_REPLICATION_SLOTS`, `INSUFFICIENT_MAX_WAL_SENDERS`, `INSUFFICIENT_MAX_WORKER_PROCESSES`, `UNSUPPORTED_EXTENSIONS`, `UNSUPPORTED_MIGRATION_TYPE`, `INVALID_RDS_LOGICAL_REPLICATION`, `UNSUPPORTED_GTID_MODE`, `UNSUPPORTED_TABLE_DEFINITION`, `UNSUPPORTED_DEFINER`, `CANT_RESTART_RUNNING_MIGRATION`, `SOURCE_ALREADY_SETUP`, `TABLES_WITH_LIMITED_SUPPORT`, `UNSUPPORTED_DATABASE_LOCALE`, `UNSUPPORTED_DATABASE_FDW_CONFIG`, `ERROR_RDBMS`, `SOURCE_SIZE_EXCEEDS_THRESHOLD`, `EXISTING_CONFLICTING_DATABASES`, `PARALLEL_IMPORT_INSUFFICIENT_PRIVILEGE`, `EXISTING_DATA`, `SOURCE_MAX_SUBSCRIPTIONS`. |
| `errorDetailMessage` | string | Output only. A specific detailed error message, if supplied by the engine. |
| `errorMessage` | string | Output only. A formatted message with further details about the error and a CTA. |

### `MultiColumnDatatypeChange`

- Options to configure rule type MultiColumnDatatypeChange. The rule is used to change the data type and associated properties of multiple columns at once. The rule filter field can refer to one or more entities. The rule scope can be one of:Column. This rule requires additional filters to be specified beyond the basic rule filter field, which is the source data type, but the rule supports additional filtering capabilities such as the minimum and maximum field length. All additional filters which are specified are required to be met in order for the rule to be applied (logical AND between the fields).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `customFeatures` | object | Optional. Custom engine specific features. |
| `newDataType` | string | Required. New data type. |
| `overrideFractionalSecondsPrecision` | integer (int32) | Optional. Column fractional seconds precision - used only for timestamp based datatypes - if not specified and relevant uses the source column fractional seconds precision. |
| `overrideLength` | string (int64) | Optional. Column length - e.g. varchar (50) - if not specified and relevant uses the source column length. |
| `overridePrecision` | integer (int32) | Optional. Column precision - when relevant - if not specified and relevant uses the source column precision. |
| `overrideScale` | integer (int32) | Optional. Column scale - when relevant - if not specified and relevant uses the source column scale. |
| `sourceDataTypeFilter` | string | Required. Filter on source data type. |
| `sourceNumericFilter` | SourceNumericFilter | Optional. Filter for fixed point number data types such as NUMERIC/NUMBER. |
| `sourceTextFilter` | SourceTextFilter | Optional. Filter for text-based data types like varchar. |

### `MultiEntityRename`

- Options to configure rule type MultiEntityRename. The rule is used to rename multiple entities. The rule filter field can refer to one or more entities. The rule scope can be one of: Database, Schema, Table, Column, Constraint, Index, View, Function, Stored Procedure, Materialized View, Sequence, UDT
- Version: v1

| Field | Type | Description |
|---|---|---|
| `newNamePattern` | string | Optional. The pattern used to generate the new entity's name. This pattern must include the characters '{name}', which will be replaced with the name of the original entity. For example, the pattern 't\_{name}' for an entity name jobs would be converted to 't_jobs'. If unspecified, the default value for this field is '{name}' |
| `sourceNameTransformation` | string enum | Optional. Additional transformation that can be done on the source entity name before it is being used by the new_name_pattern, for example lower case. If no transformation is desired, use NO_TRANSFORMATION Values: `ENTITY_NAME_TRANSFORMATION_UNSPECIFIED`, `ENTITY_NAME_TRANSFORMATION_NO_TRANSFORMATION`, `ENTITY_NAME_TRANSFORMATION_LOWER_CASE`, `ENTITY_NAME_TRANSFORMATION_UPPER_CASE`, `ENTITY_NAME_TRANSFORMATION_CAPITALIZED_CASE`. |

### `MySqlConnectionProfile`

- Specifies connection parameters required specifically for MySQL databases.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `cloudSqlId` | string | If the source is a Cloud SQL database, use this field to provide the Cloud SQL instance ID of the source. |
| `host` | string | Required. The IP or hostname of the source MySQL database. |
| `password` | string | Required. Input only. The password for the user that Database Migration Service will be using to connect to the database. This field is not returned on request, and the value is encrypted when stored in Database Migration Service. |
| `passwordSet` | boolean | Output only. Indicates If this connection profile password is stored. |
| `port` | integer (int32) | Required. The network port of the source MySQL database. |
| `privateConnectivity` | PrivateConnectivity | Private connectivity. |
| `privateServiceConnectConnectivity` | PrivateServiceConnectConnectivity | Private Service Connect connectivity. |
| `ssl` | SslConfig | SSL configuration for the destination to connect to the source database. |
| `staticServiceIpConnectivity` | StaticServiceIpConnectivity | Static Service IP connectivity. |
| `username` | string | Required. The username that Database Migration Service will use to connect to the database. The value is encrypted when stored in Database Migration Service. |

### `MySqlConnectionProfile` (v1beta1)

- Specifies connection parameters required specifically for MySQL databases.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `cloudSqlId` | string | If the source is a Cloud SQL database, use this field to provide the Cloud SQL instance ID of the source. |
| `host` | string | Required. The IP or hostname of the source MySQL database. |
| `password` | string | Required. Input only. The password for the user that Database Migration Service will be using to connect to the database. This field is not returned on request, and the value is encrypted when stored in Database Migration Service. |
| `passwordSet` | boolean | Output only. Indicates If this connection profile password is stored. |
| `port` | integer (int32) | Required. The network port of the source MySQL database. |
| `ssl` | SslConfig | SSL configuration for the destination to connect to the source database. |
| `username` | string | Required. The username that Database Migration Service will use to connect to the database. The value is encrypted when stored in Database Migration Service. |

### `MySqlHomogeneousConfig`

- Configuration for MySQL to MySQL migrations.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `isPrimaryDestination` | boolean | Optional. Whether the destination for the migration job is a primary instance. |

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

### `OracleAsmConfig`

- Configuration for Oracle Automatic Storage Management (ASM) connection.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `asmService` | string | Required. ASM service name for the Oracle ASM connection. |
| `hostname` | string | Required. Hostname for the Oracle ASM connection. |
| `password` | string | Required. Input only. Password for the Oracle ASM connection. |
| `passwordSet` | boolean | Output only. Indicates whether a new password is included in the request. |
| `port` | integer (int32) | Required. Port for the Oracle ASM connection. |
| `ssl` | SslConfig | Optional. SSL configuration for the Oracle connection. |
| `username` | string | Required. Username for the Oracle ASM connection. |

### `OracleAsmLogFileAccess`

- Configuration to use Oracle ASM to access the log files.
- Version: v1

### `OracleConnectionProfile`

- Specifies connection parameters required specifically for Oracle databases.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `databaseService` | string | Required. Database service for the Oracle connection. |
| `forwardSshConnectivity` | ForwardSshTunnelConnectivity | Forward SSH tunnel connectivity. |
| `host` | string | Required. The IP or hostname of the source Oracle database. |
| `oracleAsmConfig` | OracleAsmConfig | Optional. Configuration for Oracle ASM connection. |
| `password` | string | Required. Input only. The password for the user that Database Migration Service will be using to connect to the database. This field is not returned on request, and the value is encrypted when stored in Database Migration Service. |
| `passwordSet` | boolean | Output only. Indicates whether a new password is included in the request. |
| `port` | integer (int32) | Required. The network port of the source Oracle database. |
| `privateConnectivity` | PrivateConnectivity | Private connectivity. |
| `ssl` | SslConfig | SSL configuration for the connection to the source Oracle database. \* Only `SERVER_ONLY` configuration is supported for Oracle SSL. \* SSL is supported for Oracle versions 12 and above. |
| `staticServiceIpConnectivity` | StaticServiceIpConnectivity | Static Service IP connectivity. |
| `username` | string | Required. The username that Database Migration Service will use to connect to the database. The value is encrypted when stored in Database Migration Service. |

### `OracleSourceConfig`

- Configuration for Oracle as a source in a migration.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `binaryLogParser` | BinaryLogParser | Use Binary Log Parser. |
| `cdcStartPosition` | string (int64) | Optional. The schema change number (SCN) to start CDC data migration from. |
| `logMiner` | LogMiner | Use LogMiner. |
| `maxConcurrentCdcConnections` | integer (int32) | Optional. Maximum number of connections Database Migration Service will open to the source for CDC phase. |
| `maxConcurrentFullDumpConnections` | integer (int32) | Optional. Maximum number of connections Database Migration Service will open to the source for full dump phase. |
| `skipFullDump` | boolean | Optional. Whether to skip full dump or not. |

### `OracleToPostgresConfig`

- Configuration for heterogeneous \*\*Oracle to Cloud SQL for PostgreSQL\*\* and \*\*Oracle to AlloyDB for PostgreSQL\*\* migrations.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `oracleSourceConfig` | OracleSourceConfig | Optional. Configuration for Oracle source. |
| `postgresDestinationConfig` | PostgresDestinationConfig | Optional. Configuration for Postgres destination. |

### `PackageEntity`

- Package's parent is a schema.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `customFeatures` | object | Custom engine specific features. |
| `packageBody` | string | The SQL code which creates the package body. If the package specification has cursors or subprograms, then the package body is mandatory. |
| `packageSqlCode` | string | The SQL code which creates the package. |

### `PerformanceConfig`

- Performance configuration definition.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `dumpParallelLevel` | string enum | Initial dump parallelism level. Values: `DUMP_PARALLEL_LEVEL_UNSPECIFIED`, `MIN`, `OPTIMAL`, `MAX`. |
| `loadParallelLevel` | string enum | Optional. Initial load parallelism level. Values: `LOAD_PARALLEL_LEVEL_UNSPECIFIED`, `LOAD_MIN`, `LOAD_OPTIMAL`, `LOAD_MAX`. |

### `Policy`

- An Identity and Access Management (IAM) policy, which specifies access controls for Google Cloud resources. A `Policy` is a collection of `bindings`. A `binding` binds one or more `members`, or principals, to a single `role`. Principals can be user accounts, service accounts, Google groups, and domains (such as G Suite). A `role` is a named list of permissions; each `role` can be an IAM predefined role or a user-created custom role. For some types of Google Cloud resources, a `binding` can also specify a `condition`, which is a logical expression that allows access to a resource only if the expression evaluates to `true`. A condition can add constraints based on attributes of the request, the resource, or both. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). \*\*JSON example:\*\* { "bindings": \[ { "role": "roles/resourcemanager.organizationAdmin", "members": \[ "user:mike@example.com", "group:admins@example.com", "domain:google.com", "serviceAccount:my-project-id@appspot.gserviceaccount.com" \] }, { "role": "roles/resourcemanager.organizationViewer", "members": \[ "user:eve@example.com" \], "condition": { "title": "expirable access", "description": "Does not grant access after Sep 2020", "expression": "request.time < timestamp('2020-10-01T00:00:00.000Z')", } } \], "etag": "BwWWja0YfJA=", "version": 3 } \*\*YAML example:\*\* bindings: - members: - user:mike@example.com - group:admins@example.com - domain:google.com - serviceAccount:my-project-id@appspot.gserviceaccount.com role: roles/resourcemanager.organizationAdmin - members: - user:eve@example.com role: roles/resourcemanager.organizationViewer condition: title: expirable access description: Does not grant access after Sep 2020 expression: request.time < timestamp('2020-10-01T00:00:00.000Z') etag: BwWWja0YfJA= version: 3 For a description of IAM and its features, see the IAM documentation (https://cloud.google.com/iam/docs/).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `auditConfigs` | array<AuditConfig> | Specifies cloud audit logging configuration for this policy. |
| `bindings` | array<Binding> | Associates a list of `members`, or principals, with a `role`. Optionally, may specify a `condition` that determines how and when the `bindings` are applied. Each of the `bindings` must contain at least one principal. The `bindings` in a `Policy` can refer to up to 1,500 principals; up to 250 of these principals can be Google groups. Each occurrence of a principal counts towards these limits. For example, if the `bindings` grant 50 different roles to `user:alice@example.com`, and not to any other principal, then you can add another 1,450 principals to the `bindings` in the `Policy`. |
| `etag` | string (byte) | `etag` is used for optimistic concurrency control as a way to help prevent simultaneous updates of a policy from overwriting each other. It is strongly suggested that systems make use of the `etag` in the read-modify-write cycle to perform policy updates in order to avoid race conditions: An `etag` is returned in the response to `getIamPolicy`, and systems are expected to put that etag in the request to `setIamPolicy` to ensure that their change will be applied to the same version of the policy. \*\*Important:\*\* If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. |
| `version` | integer (int32) | Specifies the format of the policy. Valid values are `0`, `1`, and `3`. Requests that specify an invalid value are rejected. Any operation that affects conditional role bindings must specify version `3`. This requirement applies to the following operations: \* Getting a policy that includes a conditional role binding \* Adding a conditional role binding to a policy \* Changing a conditional role binding in a policy \* Removing any role binding, with or without a condition, from a policy that includes conditions \*\*Important:\*\* If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. If a policy does not include any conditions, operations on that policy may specify any valid version or leave the field unset. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |

### `Position`

- Issue position.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `column` | integer (int32) | Issue column number |
| `length` | integer (int32) | Issue length |
| `line` | integer (int32) | Issue line number |
| `offset` | integer (int32) | Issue offset |

### `PostgreSqlConnectionProfile`

- Specifies connection parameters required specifically for PostgreSQL databases.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `alloydbClusterId` | string | Optional. If the destination is an AlloyDB database, use this field to provide the AlloyDB cluster ID. |
| `cloudSqlId` | string | If the source is a Cloud SQL database, use this field to provide the Cloud SQL instance ID of the source. |
| `database` | string | Optional. The name of the specific database within the host. |
| `enableIamAuthentication` | boolean | Optional. If true, Database Migration Service will use IAM database authentication to connect to the database. |
| `forwardSshConnectivity` | ForwardSshTunnelConnectivity | Forward SSH tunnel connectivity. |
| `host` | string | Required. The IP or hostname of the source PostgreSQL database. |
| `networkArchitecture` | string enum | Output only. If the source is a Cloud SQL database, this field indicates the network architecture it's associated with. Values: `NETWORK_ARCHITECTURE_UNSPECIFIED`, `NETWORK_ARCHITECTURE_OLD_CSQL_PRODUCER`, `NETWORK_ARCHITECTURE_NEW_CSQL_PRODUCER`. |
| `password` | string | Required. Input only. The password for the user that Database Migration Service will be using to connect to the database. This field is not returned on request, and the value is encrypted when stored in Database Migration Service. |
| `passwordSet` | boolean | Output only. Indicates If this connection profile password is stored. |
| `port` | integer (int32) | Required. The network port of the source PostgreSQL database. |
| `privateConnectivity` | PrivateConnectivity | Private connectivity. |
| `privateServiceConnectConnectivity` | PrivateServiceConnectConnectivity | Private Service Connect connectivity. |
| `ssl` | SslConfig | SSL configuration for the destination to connect to the source database. |
| `staticIpConnectivity` | StaticIpConnectivity | Static ip connectivity data (default, no additional details needed). |
| `username` | string | Required. The username that Database Migration Service will use to connect to the database. The value is encrypted when stored in Database Migration Service. |

### `PostgresDestinationConfig`

- Configuration for Postgres as a destination in a migration.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `maxConcurrentConnections` | integer (int32) | Optional. Maximum number of connections Database Migration Service will open to the destination for data migration. |
| `transactionTimeout` | string (google-duration) | Optional. Timeout for data migration transactions. |

### `PostgresHomogeneousConfig`

- Configuration for PostgreSQL to PostgreSQL migrations.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `isNativeLogical` | boolean | Required. Whether the migration is native logical. |
| `maxAdditionalSubscriptions` | integer (int32) | Optional. Maximum number of additional subscriptions to use for the migration job. |

### `PostgresSourceConfig`

- Configuration for Postgres as a source in a migration.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `skipFullDump` | boolean | Optional. Whether to skip full dump or not. |

### `PostgresToSqlServerConfig`

- Configuration for heterogeneous failback migrations from \*\*PostgreSQL to SQL Server\*\*.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `postgresSourceConfig` | PostgresSourceConfig | Optional. Configuration for PostgreSQL source. |
| `sqlserverDestinationConfig` | SqlServerDestinationConfig | Optional. Configuration for SQL Server destination. |

### `PreconditionFailure`

- Describes what preconditions have failed. For example, if an RPC failed because it required the Terms of Service to be acknowledged, it could list the terms of service violation in the PreconditionFailure message.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `violations` | array<PreconditionFailureViolation> | Describes all precondition violations. |

### `PreconditionFailureViolation`

- A message type used to describe a single precondition failure.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `description` | string | A description of how the precondition failed. Developers can use this description to understand how to fix the failure. For example: "Terms of service not accepted". |
| `subject` | string | The subject, relative to the type, that failed. For example, "google.com/cloud" relative to the "TOS" type would indicate which terms of service is being referenced. |
| `type` | string | The type of PreconditionFailure. We recommend using a service-specific enum type to define the supported precondition violation subjects. For example, "TOS" for "Terms of Service violation". |

### `PrimaryInstanceSettings`

- Settings for the cluster's primary instance
- Version: v1

| Field | Type | Description |
|---|---|---|
| `databaseFlags` | object | Database flags to pass to AlloyDB when DMS is creating the AlloyDB cluster and instances. See the AlloyDB documentation for how these can be used. |
| `id` | string | Required. The ID of the AlloyDB primary instance. The ID must satisfy the regex expression "\[a-z0-9-\]+". |
| `instanceNetworkConfig` | InstanceNetworkConfig | Optional. Metadata related to instance level network configuration. |
| `labels` | object | Labels for the AlloyDB primary instance created by DMS. An object containing a list of 'key', 'value' pairs. |
| `machineConfig` | MachineConfig | Configuration for the machines that host the underlying database engine. |
| `outboundPublicIpAddresses` | array<string> | Output only. All outbound public IP addresses configured for the instance. |
| `privateIp` | string | Output only. The private IP address for the Instance. This is the connection endpoint for an end-user application. |

### `PrivateConnection`

- The PrivateConnection resource is used to establish private connectivity with the customer's network.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. The create time of the resource. |
| `displayName` | string | The private connection display name. |
| `error` | Status | Output only. The error details in case of state FAILED. |
| `labels` | object | The resource labels for private connections to use to annotate any related underlying resources such as Compute Engine VMs. An object containing a list of "key": "value" pairs. Example: `{ "name": "wrench", "mass": "1.3kg", "count": "3" }`. |
| `name` | string | The name of the resource. |
| `pscInterfaceConfig` | PscInterfaceConfig | PSC Interface configuration. |
| `reservedPublicIpConfig` | ReservedPublicIpConfig | Reserved Public IP configuration. |
| `satisfiesPzi` | boolean | Output only. Reserved for future use. |
| `satisfiesPzs` | boolean | Output only. Reserved for future use. |
| `state` | string enum | Output only. The state of the private connection. Values: `STATE_UNSPECIFIED`, `CREATING`, `CREATED`, `FAILED`, `DELETING`, `FAILED_TO_DELETE`, `DELETED`. |
| `updateTime` | string (google-datetime) | Output only. The last update time of the resource. |
| `vpcPeeringConfig` | VpcPeeringConfig | VPC peering configuration. |

### `PrivateConnectivity`

- Private Connectivity.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `privateConnection` | string | Required. The resource name (URI) of the private connection. |

### `PrivateServiceConnectConnectivity`

- Private Service Connect connectivity (https://cloud.google.com/vpc/docs/private-service-connect#service-attachments)
- Version: v1

| Field | Type | Description |
|---|---|---|
| `serviceAttachment` | string | Required. A service attachment that exposes a database, and has the following format: projects/{project}/regions/{region}/serviceAttachments/{service_attachment_name} |

### `PromoteMigrationJobRequest`

- Request message for 'PromoteMigrationJob' request.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `failback` | boolean | Optional. If true, the promote operation will perform a failback promote from destination back to source (only supported when the migration job is in FAILBACK phase). |
| `objectsFilter` | MigrationJobObjectsConfig | Optional. The object filter to apply to the migration job. |

### `PromoteMigrationJobRequest` (v1beta1)

- Request message for 'PromoteMigrationJob' request.
- Version: v1beta1

### `PscInterfaceConfig`

- The PSC Interface configuration is used to create PSC Interface between DMS's internal VPC and the consumer's PSC.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `networkAttachment` | string | Required. Fully qualified name of the Network Attachment that DMS will connect to. Format: `projects/{{project}}/regions/{{region}}/networkAttachments/{{name}}` |

### `QuotaFailure`

- Describes how a quota check failed. For example if a daily limit was exceeded for the calling project, a service could respond with a QuotaFailure detail containing the project id and the description of the quota limit that was exceeded. If the calling project hasn't enabled the service in the developer console, then a service could respond with the project id and set `service_disabled` to true. Also see RetryInfo and Help types for other details about handling a quota failure.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `violations` | array<QuotaFailureViolation> | Describes all quota violations. |

### `QuotaFailureViolation`

- A message type used to describe a single quota violation. For example, a daily quota or a custom quota that was exceeded.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `apiService` | string | The API Service from which the `QuotaFailure.Violation` originates. In some cases, Quota issues originate from an API Service other than the one that was called. In other words, a dependency of the called API Service could be the cause of the `QuotaFailure`, and this field would have the dependency API service name. For example, if the called API is Kubernetes Engine API (container.googleapis.com), and a quota violation occurs in the Kubernetes Engine API itself, this field would be "container.googleapis.com". On the other hand, if the quota violation occurs when the Kubernetes Engine API creates VMs in the Compute Engine API (compute.googleapis.com), this field would be "compute.googleapis.com". |
| `description` | string | A description of how the quota check failed. Clients can use this description to find more about the quota configuration in the service's public documentation, or find the relevant quota limit to adjust through developer console. For example: "Service disabled" or "Daily Limit for read operations exceeded". |
| `futureQuotaValue` | string (int64) | The new quota value being rolled out at the time of the violation. At the completion of the rollout, this value will be enforced in place of quota_value. If no rollout is in progress at the time of the violation, this field is not set. For example, if at the time of the violation a rollout is in progress changing the number of CPUs quota from 10 to 20, 20 would be the value of this field. |
| `quotaDimensions` | object | The dimensions of the violated quota. Every non-global quota is enforced on a set of dimensions. While quota metric defines what to count, the dimensions specify for what aspects the counter should be increased. For example, the quota "CPUs per region per VM family" enforces a limit on the metric "compute.googleapis.com/cpus_per_vm_family" on dimensions "region" and "vm_family". And if the violation occurred in region "us-central1" and for VM family "n1", the quota_dimensions would be, { "region": "us-central1", "vm_family": "n1", } When a quota is enforced globally, the quota_dimensions would always be empty. |
| `quotaId` | string | The id of the violated quota. Also know as "limit name", this is the unique identifier of a quota in the context of an API service. For example, "CPUS-PER-VM-FAMILY-per-project-region". |
| `quotaMetric` | string | The metric of the violated quota. A quota metric is a named counter to measure usage, such as API requests or CPUs. When an activity occurs in a service, such as Virtual Machine allocation, one or more quota metrics may be affected. For example, "compute.googleapis.com/cpus_per_vm_family", "storage.googleapis.com/internet_egress_bandwidth". |
| `quotaValue` | string (int64) | The enforced quota value at the time of the `QuotaFailure`. For example, if the enforced quota value at the time of the `QuotaFailure` on the number of CPUs is "10", then the value of this field would reflect this quantity. |
| `subject` | string | The subject on which the quota check failed. For example, "clientip:" or "project:". |

### `RequestInfo`

- Contains metadata about the request that clients can attach when filing a bug or providing other forms of feedback.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `requestId` | string | An opaque string that should only be interpreted by the service generating it. For example, it can be used to identify requests in the service's logs. |
| `servingData` | string | Any data that was used to serve this request. For example, an encrypted stack trace that can be sent back to the service provider for debugging. |

### `ReservedPublicIpConfig`

- Reserved Public IP configuration.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `egressPublicIps` | array<string> | Output only. The reserved public IPs. |
| `natIpsCount` | integer (int32) | Optional. Number of static public IP addresses to reserve. |

### `ResourceInfo`

- Describes the resource that is being accessed.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `description` | string | Describes what error is encountered when accessing this resource. For example, updating a cloud project may require the `writer` permission on the developer console project. |
| `owner` | string | The owner of the resource (optional). For example, "user:" or "project:". |
| `resourceName` | string | The name of the resource being accessed. For example, a shared calendar name: "example.com_4fghdhgsrgh@group.calendar.google.com", if the current error is google.rpc.Code.PERMISSION_DENIED. |
| `resourceType` | string | A name for the type of resource being accessed, e.g. "sql table", "cloud storage bucket", "file", "Google calendar"; or the type URL of the resource: e.g. "type.googleapis.com/google.pubsub.v1.Topic". |

### `RestartMigrationJobRequest`

- Request message for 'RestartMigrationJob' request.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `objectsFilter` | MigrationJobObjectsConfig | Optional. The object filter to apply to the migration job. |
| `restartFailedObjects` | boolean | Optional. If true, only failed objects will be restarted. |
| `skipValidation` | boolean | Optional. Restart the migration job without running prior configuration verification. Defaults to `false`. |

### Shape of `AlloyDbConnectionProfile`

Generated from the Discovery schema (not in the official docs); values show each field type:

```json
{
  "clusterId": "string",
  "settings": "AlloyDbSettings"
}
```

## Notes

- Generated from the Discovery document(s) v1, v1beta1 of `datamigration` (retrieved 2026-11-14); a type with the same fields in several versions shows the preferred version; a type whose fields differ between versions is listed once per version (heading suffix `(version)`), and each type's `Version` line names the document it was taken from. A `$ref` resolves to the definition of the same version.
- Corrected from the official docs (the Discovery text above is verbatim): Discovery dropped the bracket expressions from the `ErrorInfo` `metadata` key regular expression; in google/rpc/error_details.proto (googleapis commit 97f6460, https://github.com/googleapis/googleapis/blob/97f6460c3558c1435d7fd001a9251f8df058ae2f/google/rpc/error_details.proto) it is `[a-z][a-zA-Z0-9-_]+` (shown above as `a-z+`).
- Corrected from the official docs (the Discovery text above is verbatim): Discovery dropped the bracket expressions from the `ErrorInfo` / `FieldViolation` `reason` regular expression; in google/rpc/error_details.proto (googleapis commit 97f6460, https://github.com/googleapis/googleapis/blob/97f6460c3558c1435d7fd001a9251f8df058ae2f/google/rpc/error_details.proto) it is `[A-Z][A-Z0-9_]+[A-Z0-9]` (UPPER_SNAKE_CASE; shown above as `A-Z+[A-Z0-9]`).
- Source: https://datamigration.googleapis.com/$discovery/rest?version=v1, https://datamigration.googleapis.com/$discovery/rest?version=v1beta1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
