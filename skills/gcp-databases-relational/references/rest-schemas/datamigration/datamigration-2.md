---
source: https://datamigration.googleapis.com/$discovery/rest?version=v1
---

# Database Migration API message schemas (datamigration) (part 2/2)

## Signature / Usage

Message types referenced by the methods listed under `references/rest/datamigration/`.

### `RestartMigrationJobRequest` (v1beta1)

- Request message for 'RestartMigrationJob' request.
- Version: v1beta1

### `ResumeMigrationJobRequest`

- Request message for 'ResumeMigrationJob' request.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `skipValidation` | boolean | Optional. Resume the migration job without running prior configuration verification. Defaults to `false`. |

### `ResumeMigrationJobRequest` (v1beta1)

- Request message for 'ResumeMigrationJob' request.
- Version: v1beta1

### `RetryInfo`

- Describes when the clients can retry a failed request. Clients could ignore the recommendation here or retry when this information is missing from error responses. It's always recommended that clients should use exponential backoff when retrying. Clients should wait until `retry_delay` amount of time has passed since receiving the error response before retrying. If retrying requests also fail, clients should use an exponential backoff scheme to gradually increase the delay between retries based on `retry_delay`, until either a maximum number of retries have been reached or a maximum retry delay cap has been reached.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `retryDelay` | string (google-duration) | Clients should wait at least this long between retrying the same request. |

### `ReverseSshConnectivity`

- The details needed to configure a reverse SSH tunnel between the source and destination databases. These details will be used when calling the generateSshScript method (see https://cloud.google.com/database-migration/docs/reference/rest/v1/projects.locations.migrationJobs/generateSshScript) to produce the script that will help set up the reverse SSH tunnel, and to set up the VPC peering between the Cloud SQL private network and the VPC.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `vm` | string | The name of the virtual machine (Compute Engine) used as the bastion server for the SSH tunnel. |
| `vmIp` | string | Required. The IP of the virtual machine (Compute Engine) used as the bastion server for the SSH tunnel. |
| `vmPort` | integer (int32) | Required. The forwarding port of the virtual machine (Compute Engine) used as the bastion server for the SSH tunnel. |
| `vpc` | string | The name of the VPC to peer with the Cloud SQL private network. |

### `RollbackConversionWorkspaceRequest`

- Request message for 'RollbackConversionWorkspace' request.
- Version: v1

### `RoundToScale`

- This allows the data to change scale, for example if the source is 2 digits after the decimal point, specify round to scale value = 2. If for example the value needs to be converted to an integer, use round to scale value = 0.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `scale` | integer (int32) | Required. Scale value to be used |

### `RulesFile`

- Details of a single rules file.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `rulesContent` | string | Required. The text content of the rules that needs to be converted. |
| `rulesSourceFilename` | string | Required. The filename of the rules that needs to be converted. The filename is used mainly so that future logs of the import rules job contain it, and can therefore be searched by it. |

### `SchemaEntity`

- Schema typically has no parent entity, but can have a parent entity DatabaseInstance (for database engines which support it). For some database engines, the terms schema and user can be used interchangeably when they refer to a namespace or a collection of other database entities. Can store additional information which is schema specific.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `customFeatures` | object | Custom engine specific features. |

### `SearchBackgroundJobsResponse`

- Response message for 'SearchBackgroundJobs' request.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `jobs` | array<BackgroundJobLogEntry> | The list of conversion workspace mapping rules. |

### `SeedConversionWorkspaceRequest`

- Request message for 'SeedConversionWorkspace' request.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `autoCommit` | boolean | Should the conversion workspace be committed automatically after the seed operation. |
| `destinationConnectionProfile` | string | Optional. Fully qualified (Uri) name of the destination connection profile. |
| `gcsSource` | GcsSource | Optional. Cloud Storage source details for seeding. |
| `sourceConnectionProfile` | string | Optional. Fully qualified (Uri) name of the source connection profile. |

### `SeedJobDetails`

- Details regarding a Seed background job.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `connectionProfile` | string | Output only. The connection profile which was used for the seed job. |

### `SequenceEntity`

- Sequence's parent is a schema.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `cache` | string (int64) | Indicates number of entries to cache / precreate. |
| `customFeatures` | object | Custom engine specific features. |
| `cycle` | boolean | Indicates whether the sequence value should cycle through. |
| `increment` | string (int64) | Increment value for the sequence. |
| `maxValue` | string (byte) | Maximum number for the sequence represented as bytes to accommodate large. numbers |
| `minValue` | string (byte) | Minimum number for the sequence represented as bytes to accommodate large. numbers |
| `startValue` | string (byte) | Start number for the sequence represented as bytes to accommodate large. numbers |

### `SetDraftEntityDdlRequest`

- Request message for DataMigrationService.SetDraftEntityDdl.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `basedOnDdlKind` | string enum | Optional. Which DDL (Deterministic/AI) the updated DDL is based on. Defaults to DETERMINISTIC if not specified. Values: `DDL_KIND_UNSPECIFIED`, `SOURCE`, `DETERMINISTIC`, `AI`, `USER_EDIT`. |
| `ddl` | string | Required. The DDL to set. |
| `ddlKind` | string enum | Optional. The updated DDL Kind. Can be either USER_EDIT (default) or AI. Values: `DDL_KIND_UNSPECIFIED`, `SOURCE`, `DETERMINISTIC`, `AI`, `USER_EDIT`. |
| `entityName` | string | Required. The draft entity full name from the tree. . |
| `entityType` | string enum | Required. The type of the database entity (table, view, index, ...). Values: `DATABASE_ENTITY_TYPE_UNSPECIFIED`, `DATABASE_ENTITY_TYPE_SCHEMA`, `DATABASE_ENTITY_TYPE_TABLE`, `DATABASE_ENTITY_TYPE_COLUMN`, `DATABASE_ENTITY_TYPE_CONSTRAINT`, `DATABASE_ENTITY_TYPE_INDEX`, `DATABASE_ENTITY_TYPE_TRIGGER`, `DATABASE_ENTITY_TYPE_VIEW`, `DATABASE_ENTITY_TYPE_SEQUENCE`, `DATABASE_ENTITY_TYPE_STORED_PROCEDURE`, `DATABASE_ENTITY_TYPE_FUNCTION`, `DATABASE_ENTITY_TYPE_SYNONYM`, `DATABASE_ENTITY_TYPE_DATABASE_PACKAGE`, `DATABASE_ENTITY_TYPE_UDT`, `DATABASE_ENTITY_TYPE_MATERIALIZED_VIEW`, `DATABASE_ENTITY_TYPE_DATABASE`. |
| `explanation` | string | Optional. An optional explanation of the generated DDL if ddl_kind is AI. |

### `SetDraftEntityDdlResponse`

- Response message for DataMigrationService.SetDraftEntityDdl.
- Version: v1

### `SetIamPolicyRequest`

- Request message for `SetIamPolicy` method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `policy` | Policy | REQUIRED: The complete policy to be applied to the `resource`. The size of the policy is limited to a few 10s of KB. An empty policy is a valid policy but certain Google Cloud services (such as Projects) might reject them. |
| `updateMask` | string (google-fieldmask) | OPTIONAL: A FieldMask specifying which fields of the policy to modify. Only the fields in the mask will be modified. If no mask is provided, the following default mask is used: `paths: "bindings, etag"` |

### `SetTablePrimaryKey`

- Deprecated: Options to configure rule type SetTablePrimaryKey. The rule is used to specify the columns and name to configure/alter the primary key of a table. The rule filter field can refer to one entity. The rule scope can be one of: Table.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `primaryKey` | string | Optional. Name for the primary key |
| `primaryKeyColumns` | array<string> | Required. List of column names for the primary key |

### `SingleColumnChange`

- Options to configure rule type SingleColumnChange. The rule is used to change the properties of a column. The rule filter field can refer to one entity. The rule scope can be one of: Column. When using this rule, if a field is not specified than the destination column's configuration will be the same as the one in the source column..
- Version: v1

| Field | Type | Description |
|---|---|---|
| `array` | boolean | Optional. Is the column of array type. |
| `arrayLength` | integer (int32) | Optional. The length of the array, only relevant if the column type is an array. |
| `autoGenerated` | boolean | Optional. Is the column auto-generated/identity. |
| `charset` | string | Optional. Charset override - instead of table level charset. |
| `collation` | string | Optional. Collation override - instead of table level collation. |
| `comment` | string | Optional. Comment associated with the column. |
| `customFeatures` | object | Optional. Custom engine specific features. |
| `dataType` | string | Optional. Column data type name. |
| `fractionalSecondsPrecision` | integer (int32) | Optional. Column fractional seconds precision - e.g. 2 as in timestamp (2) - when relevant. |
| `length` | string (int64) | Optional. Column length - e.g. 50 as in varchar (50) - when relevant. |
| `nullable` | boolean | Optional. Is the column nullable. |
| `precision` | integer (int32) | Optional. Column precision - e.g. 8 as in double (8,2) - when relevant. |
| `scale` | integer (int32) | Optional. Column scale - e.g. 2 as in double (8,2) - when relevant. |
| `setValues` | array<string> | Optional. Specifies the list of values allowed in the column. |
| `udt` | boolean | Optional. Is the column a UDT (User-defined Type). |

### `SingleEntityRename`

- Options to configure rule type SingleEntityRename. The rule is used to rename an entity. The rule filter field can refer to only one entity. The rule scope can be one of: Database, Schema, Table, Column, Constraint, Index, View, Function, Stored Procedure, Materialized View, Sequence, UDT, Synonym
- Version: v1

| Field | Type | Description |
|---|---|---|
| `newName` | string | Required. The new name of the destination entity |

### `SinglePackageChange`

- Options to configure rule type SinglePackageChange. The rule is used to alter the sql code for a package entities. The rule filter field can refer to one entity. The rule scope can be: Package
- Version: v1

| Field | Type | Description |
|---|---|---|
| `packageBody` | string | Optional. Sql code for package body |
| `packageDescription` | string | Optional. Sql code for package description |

### `SourceNumericFilter`

- Filter for fixed point number data types such as NUMERIC/NUMBER
- Version: v1

| Field | Type | Description |
|---|---|---|
| `numericFilterOption` | string enum | Required. Enum to set the option defining the datatypes numeric filter has to be applied to Values: `NUMERIC_FILTER_OPTION_UNSPECIFIED`, `NUMERIC_FILTER_OPTION_ALL`, `NUMERIC_FILTER_OPTION_LIMIT`, `NUMERIC_FILTER_OPTION_LIMITLESS`. |
| `sourceMaxPrecisionFilter` | integer (int32) | Optional. The filter will match columns with precision smaller than or equal to this number. |
| `sourceMaxScaleFilter` | integer (int32) | Optional. The filter will match columns with scale smaller than or equal to this number. |
| `sourceMinPrecisionFilter` | integer (int32) | Optional. The filter will match columns with precision greater than or equal to this number. |
| `sourceMinScaleFilter` | integer (int32) | Optional. The filter will match columns with scale greater than or equal to this number. |

### `SourceObjectConfig`

- Config for a single migration job object.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `objectIdentifier` | SourceObjectIdentifier | Optional. The object identifier. |

### `SourceObjectIdentifier`

- An identifier for the Migration Job Object.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `database` | string | Optional. The database name. This will be required only if the object uses a database name as part of its unique identifier. |
| `schema` | string | Optional. The schema name. This will be required only if the object uses a schema name as part of its unique identifier. |
| `table` | string | Optional. The table name. This will be required only if the object is a level below database or schema. |
| `type` | string enum | Required. The type of the migration job object. Values: `MIGRATION_JOB_OBJECT_TYPE_UNSPECIFIED`, `DATABASE`, `SCHEMA`, `TABLE`. |

### `SourceObjectsConfig`

- List of configurations for the source objects to be migrated.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `excludedObjectConfigs` | array<SourceObjectConfig> | Optional. The list of the objects to be excluded from the migration. Exclusion takes precedence over inclusion in `object_configs`. |
| `objectConfigs` | array<SourceObjectConfig> | Optional. The list of the objects to be included in the migration. |
| `objectsSelectionType` | string enum | Optional. The objects selection type of the migration job. Values: `OBJECTS_SELECTION_TYPE_UNSPECIFIED`, `ALL_OBJECTS`, `SPECIFIED_OBJECTS`. |

### `SourceSqlChange`

- Options to configure rule type SourceSqlChange. The rule is used to alter the sql code for database entities. The rule filter field can refer to one entity. The rule scope can be: StoredProcedure, Function, Trigger, View
- Version: v1

| Field | Type | Description |
|---|---|---|
| `sqlCode` | string | Required. Sql code for source (stored procedure, function, trigger or view) |

### `SourceTextFilter`

- Filter for text-based data types like varchar.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `sourceMaxLengthFilter` | string (int64) | Optional. The filter will match columns with length smaller than or equal to this number. |
| `sourceMinLengthFilter` | string (int64) | Optional. The filter will match columns with length greater than or equal to this number. |

### `SqlAclEntry`

- An entry for an Access Control list.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `expireTime` | string (google-datetime) | The time when this access control entry expires in RFC 3339 (https://tools.ietf.org/html/rfc3339) format, for example: `2012-11-15T16:19:00.094Z`. |
| `label` | string | A label to identify this entry. |
| `ttl` | string (google-duration) | Input only. The time-to-leave of this access control entry. |
| `value` | string | The allowlisted value for the access control list. |

### `SqlIpConfig`

- IP Management configuration.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `allocatedIpRange` | string | Optional. The name of the allocated IP address range for the private IP Cloud SQL instance. This name refers to an already allocated IP range address. If set, the instance IP address will be created in the allocated range. Note that this IP address range can't be modified after the instance is created. If you change the VPC when configuring connectivity settings for the migration job, this field is not relevant. |
| `authorizedNetworks` | array<SqlAclEntry> | The list of external networks that are allowed to connect to the instance using the IP. See https://en.wikipedia.org/wiki/CIDR_notation#CIDR_notation, also known as 'slash' notation (e.g. `192.168.100.0/24`). |
| `enableIpv4` | boolean | Whether the instance should be assigned an IPv4 address or not. |
| `privateNetwork` | string | The resource link for the VPC network from which the Cloud SQL instance is accessible for private IP. For example, `projects/myProject/global/networks/default`. This setting can be updated, but it cannot be removed after it is set. |
| `requireSsl` | boolean | Whether SSL connections over IP should be enforced or not. |

### `SqlIpConfig` (v1beta1)

- IP Management configuration.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `authorizedNetworks` | array<SqlAclEntry> | The list of external networks that are allowed to connect to the instance using the IP. See https://en.wikipedia.org/wiki/CIDR_notation#CIDR_notation, also known as 'slash' notation (e.g. `192.168.100.0/24`). |
| `enableIpv4` | boolean | Whether the instance is assigned a public IP address or not. |
| `privateNetwork` | string | The resource link for the VPC network from which the Cloud SQL instance is accessible for private IP. For example, `/projects/myProject/global/networks/default`. This setting can be updated, but it cannot be removed after it is set. |
| `requireSsl` | boolean | Whether SSL connections over IP should be enforced or not. |

### `SqlServerBackups`

- Specifies the backup details in Cloud Storage for homogeneous migration to Cloud SQL for SQL Server.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `gcsBucket` | string | Required. The Cloud Storage bucket that stores backups for all replicated databases. |
| `gcsPrefix` | string | Optional. Cloud Storage path inside the bucket that stores backups. |

### `SqlServerConnectionProfile`

- Specifies connection parameters required specifically for SQL Server databases.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `backups` | SqlServerBackups | The backup details in Cloud Storage for homogeneous migration to Cloud SQL for SQL Server. |
| `cloudSqlId` | string | If the source is a Cloud SQL database, use this field to provide the Cloud SQL instance ID of the source. |
| `cloudSqlProjectId` | string | Optional. The project id of the Cloud SQL instance. If not provided, the project id of the connection profile will be used. |
| `database` | string | Required. The name of the specific database within the host. |
| `dbmPort` | integer (int32) | Optional. The Database Mirroring (DBM) port of the source SQL Server instance. |
| `forwardSshConnectivity` | ForwardSshTunnelConnectivity | Forward SSH tunnel connectivity. |
| `host` | string | Required. The IP or hostname of the source SQL Server database. |
| `password` | string | Required. Input only. The password for the user that Database Migration Service will be using to connect to the database. This field is not returned on request, and the value is encrypted when stored in Database Migration Service. |
| `passwordSet` | boolean | Output only. Indicates whether a new password is included in the request. |
| `port` | integer (int32) | Required. The network port of the source SQL Server database. |
| `privateConnectivity` | PrivateConnectivity | Private connectivity. |
| `privateServiceConnectConnectivity` | PrivateServiceConnectConnectivity | Private Service Connect connectivity. |
| `ssl` | SslConfig | SSL configuration for the destination to connect to the source database. |
| `staticIpConnectivity` | StaticIpConnectivity | Static IP connectivity data (default, no additional details needed). |
| `username` | string | Required. The username that Database Migration Service will use to connect to the database. The value is encrypted when stored in Database Migration Service. |

### `SqlServerDagConfig`

- Configuration for distributed availability group (DAG) for the SQL Server homogeneous migration.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `linkedServer` | string | Required. The name of the linked server that points to the source SQL Server instance. Only used by DAG migrations. |
| `sourceAg` | string | Required. The name of the source availability group. Only used by DAG migrations. |

### `SqlServerDatabaseBackup`

- Specifies the backup details for a single database in Cloud Storage for homogeneous migration to Cloud SQL for SQL Server.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `database` | string | Required. Name of a SQL Server database for which to define backup configuration. |
| `encryptionOptions` | SqlServerEncryptionOptions | Optional. Encryption settings for the database. Required if provided database backups are encrypted. Encryption settings include path to certificate, path to certificate private key, and key password. |

### `SqlServerDestinationConfig`

- Configuration for SQL Server as a destination in a migration.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `maxConcurrentConnections` | integer (int32) | Optional. Maximum number of connections Database Migration Service will open to the destination for data migration. |
| `transactionTimeout` | string (google-duration) | Optional. Timeout for data migration transactions. |

### `SqlServerEncryptionOptions`

- Encryption settings for the SQL Server database.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `certPath` | string | Required. Path to the Certificate (.cer) in Cloud Storage, in the form `gs://bucketName/fileName`. The instance must have write permissions to the bucket and read access to the file. |
| `pvkPassword` | string | Required. Input only. Password that encrypts the private key. |
| `pvkPath` | string | Required. Path to the Certificate Private Key (.pvk) in Cloud Storage, in the form `gs://bucketName/fileName`. The instance must have write permissions to the bucket and read access to the file. |

### `SqlServerHomogeneousMigrationJobConfig`

- Configuration for homogeneous migration to Cloud SQL for SQL Server.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `backupFilePattern` | string | Required. Pattern that describes the default backup naming strategy. The specified pattern should ensure lexicographical order of backups. The pattern must define one of the following capture group sets: Capture group set #1 yy/yyyy - year, 2 or 4 digits mm - month number, 1-12 dd - day of month, 1-31 hh - hour of day, 00-23 mi - minutes, 00-59 ss - seconds, 00-59 Example: For backup file TestDB_20230802_155400.trn, use pattern: (?.\*)\_backup\_(?\d{4})(?\d{2})(?\d{2})\_(?\d{2})(?\d{2})(?\d{2}).trn Capture group set #2 timestamp - unix timestamp Example: For backup file TestDB.1691448254.trn, use pattern: (?.\*)\.(?\d\*).trn or (?.\*)\.(?\d\*).trn |
| `dagConfig` | SqlServerDagConfig | Optional. Configuration for distributed availability group (DAG) for the SQL Server homogeneous migration. |
| `databaseBackups` | array<SqlServerDatabaseBackup> | Required. Backup details per database in Cloud Storage. |
| `promoteWhenReady` | boolean | Optional. Promote databases when ready. |
| `useDiffBackup` | boolean | Optional. Enable differential backups. |

### `SqlServerSourceConfig`

- Configuration for SQL Server as a source in a migration.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `cdcStartPosition` | string | Optional. The log sequence number (LSN) to start CDC data migration from. |
| `maxConcurrentCdcConnections` | integer (int32) | Optional. Maximum number of connections Database Migration Service will open to the source for CDC phase. |
| `maxConcurrentFullDumpConnections` | integer (int32) | Optional. Maximum number of connections Database Migration Service will open to the source for full dump phase. |
| `skipFullDump` | boolean | Optional. Whether to skip full dump or not. |

### `SqlServerToPostgresConfig`

- Configuration for heterogeneous \*\*SQL Server to Cloud SQL for PostgreSQL\*\* migrations.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `postgresDestinationConfig` | PostgresDestinationConfig | Optional. Configuration for Postgres destination. |
| `sqlserverSourceConfig` | SqlServerSourceConfig | Optional. Configuration for SQL Server source. |

### `SshScript`

- Response message for 'GenerateSshScript' request.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `script` | string | The ssh configuration script. |

### `SslConfig`

- SSL configuration information.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `caCertificate` | string | Required. Input only. The x509 PEM-encoded certificate of the CA that signed the source database server's certificate. The replica will use this certificate to verify it's connecting to the right host. |
| `clientCertificate` | string | Input only. The x509 PEM-encoded certificate that will be used by the replica to authenticate against the source database server.If this field is used then the 'client_key' field is mandatory. |
| `clientKey` | string | Input only. The unencrypted PKCS#1 or PKCS#8 PEM-encoded private key associated with the Client Certificate. If this field is used then the 'client_certificate' field is mandatory. |
| `sslFlags` | object | Optional. SSL flags used for establishing SSL connection to the source database. Only source specific flags are supported. An object containing a list of "key": "value" pairs. Examples: { "server_certificate_dn": "CN=server.com,OU=RDS,O=Amazon.com,C=US"} or { "server_certificate_hostname": "server.com"}. |
| `type` | string enum | Optional. The ssl config type according to 'client_key', 'client_certificate' and 'ca_certificate'. Values: `SSL_TYPE_UNSPECIFIED`, `SERVER_ONLY`, `SERVER_CLIENT`, `REQUIRED`, `NONE`. |

### `SslConfig` (v1beta1)

- SSL configuration information.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `caCertificate` | string | Required. Input only. The x509 PEM-encoded certificate of the CA that signed the source database server's certificate. The replica will use this certificate to verify it's connecting to the right host. |
| `clientCertificate` | string | Input only. The x509 PEM-encoded certificate that will be used by the replica to authenticate against the source database server.If this field is used then the 'client_key' field is mandatory. |
| `clientKey` | string | Input only. The unencrypted PKCS#1 or PKCS#8 PEM-encoded private key associated with the Client Certificate. If this field is used then the 'client_certificate' field is mandatory. |
| `type` | string enum | Output only. The ssl config type according to 'client_key', 'client_certificate' and 'ca_certificate'. Values: `SSL_TYPE_UNSPECIFIED`, `SERVER_ONLY`, `SERVER_CLIENT`. |

### `StartMigrationJobRequest`

- Request message for 'StartMigrationJob' request.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `skipValidation` | boolean | Optional. Start the migration job without running prior configuration verification. Defaults to `false`. |

### `StartMigrationJobRequest` (v1beta1)

- Request message for 'StartMigrationJob' request.
- Version: v1beta1

### `StaticIpConnectivity`

- The source database will allow incoming connections from the public IP of the destination database. You can retrieve the public IP of the Cloud SQL instance from the Cloud SQL console or using Cloud SQL APIs. No additional configuration is required.
- Version: v1

### `StaticServiceIpConnectivity`

- Static IP address connectivity configured on service project.
- Version: v1

### `Status`

- The `Status` type defines a logical error model that is suitable for different programming environments, including REST APIs and RPC APIs. It is used by gRPC (https://github.com/grpc). Each `Status` message contains three pieces of data: error code, error message, and error details. You can find out more about this error model and how to work with it in the API Design Guide (https://cloud.google.com/apis/design/errors).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `code` | integer (int32) | The status code, which should be an enum value of google.rpc.Code. |
| `details` | array<object> | A list of messages that carry the error details. There is a common set of message types for APIs to use. |
| `message` | string | A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client. |

### `StopMigrationJobRequest`

- Request message for 'StopMigrationJob' request.
- Version: v1

### `StoredProcedureEntity`

- Stored procedure's parent is a schema.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `customFeatures` | object | Custom engine specific features. |
| `sqlCode` | string | The SQL code which creates the stored procedure. |

### `SynonymEntity`

- Synonym's parent is a schema.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `customFeatures` | object | Custom engine specific features. |
| `sourceEntity` | string | The name of the entity for which the synonym is being created (the source). |
| `sourceType` | string enum | The type of the entity for which the synonym is being created (usually a table or a sequence). Values: `DATABASE_ENTITY_TYPE_UNSPECIFIED`, `DATABASE_ENTITY_TYPE_SCHEMA`, `DATABASE_ENTITY_TYPE_TABLE`, `DATABASE_ENTITY_TYPE_COLUMN`, `DATABASE_ENTITY_TYPE_CONSTRAINT`, `DATABASE_ENTITY_TYPE_INDEX`, `DATABASE_ENTITY_TYPE_TRIGGER`, `DATABASE_ENTITY_TYPE_VIEW`, `DATABASE_ENTITY_TYPE_SEQUENCE`, `DATABASE_ENTITY_TYPE_STORED_PROCEDURE`, `DATABASE_ENTITY_TYPE_FUNCTION`, `DATABASE_ENTITY_TYPE_SYNONYM`, `DATABASE_ENTITY_TYPE_DATABASE_PACKAGE`, `DATABASE_ENTITY_TYPE_UDT`, `DATABASE_ENTITY_TYPE_MATERIALIZED_VIEW`, `DATABASE_ENTITY_TYPE_DATABASE`. |

### `TableEntity`

- Table's parent is a schema.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `columns` | array<ColumnEntity> | Table columns. |
| `comment` | string | Comment associated with the table. |
| `constraints` | array<ConstraintEntity> | Table constraints. |
| `customFeatures` | object | Custom engine specific features. |
| `indices` | array<IndexEntity> | Table indices. |
| `triggers` | array<TriggerEntity> | Table triggers. |

### `TcpProxyScript`

- Response message for 'GenerateTcpProxyScript' request.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `script` | string | The TCP Proxy configuration script. |

### `TestIamPermissionsRequest`

- Request message for `TestIamPermissions` method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `permissions` | array<string> | The set of permissions to check for the `resource`. Permissions with wildcards (such as `*` or `storage.*`) are not allowed. For more information see IAM Overview (https://cloud.google.com/iam/docs/overview#permissions). |

### `TestIamPermissionsResponse`

- Response message for `TestIamPermissions` method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `permissions` | array<string> | A subset of `TestPermissionsRequest.permissions` that the caller is allowed. |

### `TriggerEntity`

- Trigger is not used as an independent entity, it is retrieved as part of a Table entity.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `customFeatures` | object | Custom engine specific features. |
| `name` | string | The name of the trigger. |
| `sqlCode` | string | The SQL code which creates the trigger. |
| `triggerType` | string | Indicates when the trigger fires, for example BEFORE STATEMENT, AFTER EACH ROW. |
| `triggeringEvents` | array<string> | The DML, DDL, or database events that fire the trigger, for example INSERT, UPDATE. |

### `UDTEntity`

- UDT's parent is a schema.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `customFeatures` | object | Custom engine specific features. |
| `udtBody` | string | The SQL code which creates the udt body. |
| `udtSqlCode` | string | The SQL code which creates the udt. |

### `UserPassword`

- The username/password for a database user. Used for specifying initial users at cluster creation time.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `password` | string | The initial password for the user. |
| `passwordSet` | boolean | Output only. Indicates if the initial_user.password field has been set. |
| `user` | string | The database username. |

### `ValueListFilter`

- A list of values to filter by in ConditionalColumnSetValue
- Version: v1

| Field | Type | Description |
|---|---|---|
| `ignoreCase` | boolean | Required. Whether to ignore case when filtering by values. Defaults to false |
| `valuePresentList` | string enum | Required. Indicates whether the filter matches rows with values that are present in the list or those with values not present in it. Values: `VALUE_PRESENT_IN_LIST_UNSPECIFIED`, `VALUE_PRESENT_IN_LIST_IF_VALUE_LIST`, `VALUE_PRESENT_IN_LIST_IF_VALUE_NOT_LIST`. |
| `values` | array<string> | Required. The list to be used to filter by |

### `ValueTransformation`

- Description of data transformation during migration as part of the ConditionalColumnSetValue.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `applyHash` | ApplyHash | Optional. Applies a hash function on the data |
| `assignMaxValue` | Empty | Optional. Set to max_value - if integer or numeric, will use int.maxvalue, etc |
| `assignMinValue` | Empty | Optional. Set to min_value - if integer or numeric, will use int.minvalue, etc |
| `assignNull` | Empty | Optional. Set to null |
| `assignSpecificValue` | AssignSpecificValue | Optional. Set to a specific value (value is converted to fit the target data type) |
| `doubleComparison` | DoubleComparisonFilter | Optional. Filter on relation between source value and compare value of type double. |
| `intComparison` | IntComparisonFilter | Optional. Filter on relation between source value and compare value of type integer. |
| `isNull` | Empty | Optional. Value is null |
| `roundScale` | RoundToScale | Optional. Allows the data to change scale |
| `valueList` | ValueListFilter | Optional. Value is found in the specified list. |

### `VerifyMigrationJobRequest`

- Request message for 'VerifyMigrationJob' request.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `migrationJob` | MigrationJob | Optional. The changed migration job parameters to verify. It will not update the migration job. |
| `updateMask` | string (google-fieldmask) | Optional. Field mask is used to specify the changed fields to be verified. It will not update the migration job. |

### `VerifyMigrationJobRequest` (v1beta1)

- Request message for 'VerifyMigrationJob' request.
- Version: v1beta1

### `ViewEntity`

- View's parent is a schema.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `constraints` | array<ConstraintEntity> | View constraints. |
| `customFeatures` | object | Custom engine specific features. |
| `sqlCode` | string | The SQL code which creates the view. |

### `VmCreationConfig`

- VM creation configuration message
- Version: v1

| Field | Type | Description |
|---|---|---|
| `subnet` | string | The subnet name the vm needs to be created in. |
| `vmMachineType` | string | Required. VM instance machine type to create. |
| `vmZone` | string | The Google Cloud Platform zone to create the VM in. |

### `VmSelectionConfig`

- VM selection configuration message
- Version: v1

| Field | Type | Description |
|---|---|---|
| `vmZone` | string | Required. The Google Cloud Platform zone the VM is located. |

### `VpcPeeringConfig`

- The VPC peering configuration is used to create VPC peering with the consumer's VPC.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `subnet` | string | Required. A free subnet for peering. (CIDR of /29) |
| `vpcName` | string | Required. Fully qualified name of the VPC that Database Migration Service will peer to. |

### `VpcPeeringConnectivity`

- The details of the VPC where the source database is located in Google Cloud. We will use this information to set up the VPC peering connection between Cloud SQL and this VPC.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `vpc` | string | The name of the VPC network to peer with the Cloud SQL private network. |

### Shape of `ResumeMigrationJobRequest`

Generated from the Discovery schema (not in the official docs); values show each field type:

```json
{
  "skipValidation": "boolean"
}
```

## Notes

- Generated from the Discovery document(s) v1, v1beta1 of `datamigration` (retrieved 2026-11-14); a type with the same fields in several versions shows the preferred version; a type whose fields differ between versions is listed once per version (heading suffix `(version)`), and each type's `Version` line names the document it was taken from. A `$ref` resolves to the definition of the same version.
- Source: https://datamigration.googleapis.com/$discovery/rest?version=v1, https://datamigration.googleapis.com/$discovery/rest?version=v1beta1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
