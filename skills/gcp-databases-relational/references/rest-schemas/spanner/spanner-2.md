---
source: https://spanner.googleapis.com/$discovery/rest?version=v1
---

# Cloud Spanner API message schemas (spanner) (part 2/2)

## Signature / Usage

Message types referenced by the methods listed under `references/rest/spanner/`.

### `RestoreDatabaseRequest`

- The request for RestoreDatabase.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `backup` | string | Name of the backup from which to restore. Values are of the form `projects//instances//backups/`. |
| `databaseId` | string | Required. The id of the database to create and restore to. This database must not already exist. The `database_id` appended to `parent` forms the full database name of the form `projects//instances//databases/`. |
| `encryptionConfig` | RestoreDatabaseEncryptionConfig | Optional. An encryption configuration describing the encryption type and key resources in Cloud KMS used to encrypt/decrypt the database to restore to. If this field is not specified, the restored database will use the same encryption configuration as the backup by default, namely encryption_type = `USE_CONFIG_DEFAULT_OR_BACKUP_ENCRYPTION`. |

### `RestoreInfo`

- Information about the database restore.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `backupInfo` | BackupInfo | Information about the backup used to restore the database. The backup may no longer exist. |
| `sourceType` | string enum | The type of the restore source. Values: `TYPE_UNSPECIFIED`, `BACKUP`. |

### `ResultSet`

- Results from Read or ExecuteSql.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `metadata` | ResultSetMetadata | Metadata about the result set, such as row type information. |
| `precommitToken` | MultiplexedSessionPrecommitToken | Optional. A precommit token is included if the read-write transaction is on a multiplexed session. Pass the precommit token with the highest sequence number from this transaction attempt to the Commit request for this transaction. |
| `rows` | array<array> | Each element in `rows` is a row whose format is defined by metadata.row_type. The ith element in each row matches the ith field in metadata.row_type. Elements are encoded based on type as described here. |
| `stats` | ResultSetStats | Query plan and execution statistics for the SQL statement that produced this result set. These can be requested by setting ExecuteSqlRequest.query_mode. DML statements always produce stats containing the number of rows modified, unless executed using the ExecuteSqlRequest.QueryMode.PLAN ExecuteSqlRequest.query_mode. Other fields might or might not be populated, based on the ExecuteSqlRequest.query_mode. |

### `ResultSetMetadata`

- Metadata about a ResultSet or PartialResultSet.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `rowType` | StructType | Indicates the field names and types for the rows in the result set. For example, a SQL query like `"SELECT UserId, UserName FROM Users"` could return a `row_type` value like: "fields": \[ { "name": "UserId", "type": { "code": "INT64" } }, { "name": "UserName", "type": { "code": "STRING" } }, \] |
| `transaction` | Transaction | If the read or SQL query began a transaction as a side-effect, the information about the new transaction is yielded here. |
| `undeclaredParameters` | StructType | A SQL query can be parameterized. In PLAN mode, these parameters can be undeclared. This indicates the field names and types for those undeclared parameters in the SQL query. For example, a SQL query like `"SELECT * FROM Users where UserId = @userId and UserName = @userName "` could return a `undeclared_parameters` value like: "fields": \[ { "name": "UserId", "type": { "code": "INT64" } }, { "name": "UserName", "type": { "code": "STRING" } }, \] |

### `ResultSetStats`

- Additional statistics about a ResultSet or PartialResultSet.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `queryPlan` | QueryPlan | QueryPlan for the query associated with this result. |
| `queryStats` | object | Aggregated statistics from the execution of the query. Only present when the query is profiled. For example, a query could return the statistics as follows: { "rows_returned": "3", "elapsed_time": "1.22 secs", "cpu_time": "1.19 secs" } |
| `rowCountExact` | string (int64) | Standard DML returns an exact count of rows that were modified. |
| `rowCountLowerBound` | string (int64) | Partitioned DML doesn't offer exactly-once semantics, so it returns a lower bound of the rows modified. |

### `RollbackRequest`

- The request for Rollback.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `transactionId` | string (byte) | Required. The transaction to roll back. |

### `Scan`

- Scan is a structure which describes Cloud Key Visualizer scan information.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `details` | object | Additional information provided by the implementer. |
| `endTime` | string (google-datetime) | The upper bound for when the scan is defined. |
| `name` | string | The unique name of the scan, specific to the Database service implementing this interface. |
| `scanData` | ScanData | Output only. Cloud Key Visualizer scan data. Note, this field is not available to the ListScans method. |
| `startTime` | string (google-datetime) | A range of time (inclusive) for when the scan is defined. The lower bound for when the scan is defined. |

### `ScanData`

- ScanData contains Cloud Key Visualizer scan data used by the caller to construct a visualization.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `data` | VisualizationData | Cloud Key Visualizer scan data. The range of time this information covers is captured via the above time range fields. Note, this field is not available to the ListScans method. |
| `endTime` | string (google-datetime) | The upper bound for when the contained data is defined. |
| `startTime` | string (google-datetime) | A range of time (inclusive) for when the contained data is defined. The lower bound for when the contained data is defined. |

### `Send`

- Arguments to send operations.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `deliverTime` | string (google-datetime) | The time at which Spanner will begin attempting to deliver the message. If `deliver_time` is not set, Spanner will deliver the message immediately. If `deliver_time` is in the past, Spanner will replace it with a value closer to the current time. |
| `key` | array<any> | Required. The primary key of the message to be sent. |
| `payload` | any | The payload of the message. |
| `queue` | string | Required. The queue to which the message will be sent. |

### `Session`

- A session in the Cloud Spanner API.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `approximateLastUseTime` | string (google-datetime) | Output only. The approximate timestamp when the session is last used. It's typically earlier than the actual last use time. |
| `createTime` | string (google-datetime) | Output only. The timestamp when the session is created. |
| `creatorRole` | string | The database role which created this session. |
| `labels` | object | The labels for the session. \* Label keys must be between 1 and 63 characters long and must conform to the following regular expression: `[a-z]([-a-z0-9]*[a-z0-9])?`. \* Label values must be between 0 and 63 characters long and must conform to the regular expression `([a-z]([-a-z0-9]*[a-z0-9])?)?`. \* No more than 64 labels can be associated with a given session. See https://goo.gl/xmQnxf for more information on and examples of labels. |
| `multiplexed` | boolean | Optional. If `true`, specifies a multiplexed session. Use a multiplexed session for multiple, concurrent operations including any combination of read-only and read-write transactions. Use `sessions.create` to create multiplexed sessions. Don't use BatchCreateSessions to create a multiplexed session. You can't delete or list multiplexed sessions. |
| `name` | string | Output only. The name of the session. This is always system-assigned. |

### `SetIamPolicyRequest`

- Request message for `SetIamPolicy` method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `policy` | Policy | REQUIRED: The complete policy to be applied to the `resource`. The size of the policy is limited to a few 10s of KB. An empty policy is a valid policy but certain Google Cloud services (such as Projects) might reject them. |

### `ShortRepresentation`

- Condensed representation of a node and its subtree. Only present for `SCALAR` PlanNode(s).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `description` | string | A string representation of the expression subtree rooted at this node. |
| `subqueries` | object | A mapping of (subquery variable name) -> (subquery node id) for cases where the `description` string of this node references a `SCALAR` subquery contained in the expression subtree rooted at this node. The referenced `SCALAR` subquery may not necessarily be a direct child of this node. |

### `SingleRegionQuorum`

- Message type for a single-region quorum.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `servingLocation` | string | Required. The location of the serving region, for example, "us-central1". The location must be one of the regions within the dual-region instance configuration of your database. The list of valid locations is available using the GetInstanceConfig API. This should only be used if you plan to change quorum to the single-region quorum type. |

### `SplitPoints`

- The split points of a table or an index.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `expireTime` | string (google-datetime) | Optional. The expiration timestamp of the split points. A timestamp in the past means immediate expiration. The maximum value can be 30 days in the future. Defaults to 10 days in the future if not specified. |
| `index` | string | The index to split. If specified, the `table` field must refer to the index's base table. |
| `keys` | array<Key> | Required. The list of split keys. In essence, the split boundaries. |
| `table` | string | The table to split. |

### `Statement`

- A single DML statement.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `paramTypes` | object | It isn't always possible for Cloud Spanner to infer the right SQL type from a JSON value. For example, values of type `BYTES` and values of type `STRING` both appear in params as JSON strings. In these cases, `param_types` can be used to specify the exact SQL type for some or all of the SQL statement parameters. See the definition of Type for more information about SQL types. |
| `params` | object | Parameter names and values that bind to placeholders in the DML string. A parameter placeholder consists of the `@` character followed by the parameter name (for example, `@firstName`). Parameter names can contain letters, numbers, and underscores. Parameters can appear anywhere that a literal value is expected. The same parameter name can be used more than once, for example: `"WHERE id > @msg_id AND id < @msg_id + 100"` It's an error to execute a SQL statement with unbound parameters. |
| `sql` | string | Required. The DML string. |

### `Status`

- The `Status` type defines a logical error model that is suitable for different programming environments, including REST APIs and RPC APIs. It is used by gRPC (https://github.com/grpc). Each `Status` message contains three pieces of data: error code, error message, and error details. You can find out more about this error model and how to work with it in the API Design Guide (https://cloud.google.com/apis/design/errors).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `code` | integer (int32) | The status code, which should be an enum value of google.rpc.Code. |
| `details` | array<object> | A list of messages that carry the error details. There is a common set of message types for APIs to use. |
| `message` | string | A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client. |

### `StructType`

- `StructType` defines the fields of a STRUCT type.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `fields` | array<Field> | The list of fields that make up this struct. Order is significant, because values of this struct type are represented as lists, where the order of field values matches the order of fields in the StructType. In turn, the order of fields matches the order of columns in a read request, or the order of fields in the `SELECT` clause of a query. |

### `TestIamPermissionsRequest`

- Request message for `TestIamPermissions` method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `permissions` | array<string> | REQUIRED: The set of permissions to check for 'resource'. Permissions with wildcards (such as '\*', 'spanner.\*', 'spanner.instances.\*') are not allowed. |

### `TestIamPermissionsResponse`

- Response message for `TestIamPermissions` method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `permissions` | array<string> | A subset of `TestPermissionsRequest.permissions` that the caller is allowed. |

### `Transaction`

- A transaction.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `id` | string (byte) | `id` may be used to identify the transaction in subsequent Read, ExecuteSql, Commit, or Rollback calls. Single-use read-only transactions do not have IDs, because single-use transactions do not support multiple requests. |
| `precommitToken` | MultiplexedSessionPrecommitToken | A precommit token is included in the response of a BeginTransaction request if the read-write transaction is on a multiplexed session and a mutation_key was specified in the BeginTransaction. The precommit token with the highest sequence number from this transaction attempt should be passed to the Commit request for this transaction. |
| `readTimestamp` | string (google-datetime) | For snapshot read-only transactions, the read timestamp chosen for the transaction. Not returned by default: see TransactionOptions.ReadOnly.return_read_timestamp. A timestamp in RFC3339 UTC \"Zulu\" format, accurate to nanoseconds. Example: `"2014-10-02T15:01:23.045123456Z"`. |

### `TransactionOptions`

- Options to use for transactions.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `excludeTxnFromChangeStreams` | boolean | When `exclude_txn_from_change_streams` is set to `true`, it prevents read or write transactions from being tracked in change streams. \* If the DDL option `allow_txn_exclusion` is set to `true`, then the updates made within this transaction aren't recorded in the change stream. \* If you don't set the DDL option `allow_txn_exclusion` or if it's set to `false`, then the updates made within this transaction are recorded in the change stream. When `exclude_txn_from_change_streams` is set to `false` or not set, modifications from this transaction are recorded in all change streams that are tracking columns modified by these transactions. The `exclude_txn_from_change_streams` option can only be specified for read-write or partitioned DML transactions, otherwise the API returns an `INVALID_ARGUMENT` error. |
| `isolationLevel` | string enum | Isolation level for the transaction. Values: `ISOLATION_LEVEL_UNSPECIFIED`, `SERIALIZABLE`, `REPEATABLE_READ`. |
| `partitionedDml` | PartitionedDml | Partitioned DML transaction. Authorization to begin a Partitioned DML transaction requires `spanner.databases.beginPartitionedDmlTransaction` permission on the `session` resource. |
| `readOnly` | ReadOnly | Transaction does not write. Authorization to begin a read-only transaction requires `spanner.databases.beginReadOnlyTransaction` permission on the `session` resource. |
| `readWrite` | ReadWrite | Transaction may write. Authorization to begin a read-write transaction requires `spanner.databases.beginOrRollbackReadWriteTransaction` permission on the `session` resource. |

### `TransactionSelector`

- This message is used to select the transaction in which a Read or ExecuteSql call runs. See TransactionOptions for more information about transactions.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `begin` | TransactionOptions | Begin a new transaction and execute this read or SQL query in it. The transaction ID of the new transaction is returned in ResultSetMetadata.transaction, which is a Transaction. |
| `id` | string (byte) | Execute the read or SQL query in a previously-started transaction. |
| `singleUse` | TransactionOptions | Execute the read or SQL query in a temporary transaction. This is the most efficient way to execute a transaction that consists of a single SQL query. |

### `Type`

- `Type` indicates the type of a Cloud Spanner value, as might be stored in a table cell or returned from an SQL query.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `arrayElementType` | Type | If code == ARRAY, then `array_element_type` is the type of the array elements. |
| `code` | string enum | Required. The TypeCode for this type. Values: `TYPE_CODE_UNSPECIFIED`, `BOOL`, `INT64`, `FLOAT64`, `FLOAT32`, `TIMESTAMP`, `DATE`, `STRING`, `BYTES`, `ARRAY`, `STRUCT`, `NUMERIC`, `JSON`, `PROTO`, `ENUM`, `INTERVAL`, `UUID`. |
| `protoTypeFqn` | string | If code == PROTO or code == ENUM, then `proto_type_fqn` is the fully qualified name of the proto type representing the proto/enum definition. |
| `structType` | StructType | If code == STRUCT, then `struct_type` provides type information for the struct's fields. |
| `typeAnnotation` | string enum | The TypeAnnotationCode that disambiguates SQL type that Spanner will use to represent values of this type during query processing. This is necessary for some type codes because a single TypeCode can be mapped to different SQL types depending on the SQL dialect. type_annotation typically is not needed to process the content of a value (it doesn't affect serialization) and clients can ignore it on the read path. Values: `TYPE_ANNOTATION_CODE_UNSPECIFIED`, `PG_NUMERIC`, `PG_JSONB`, `PG_OID`. |

### `UpdateDatabaseDdlMetadata`

- Metadata type for the operation returned by UpdateDatabaseDdl.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `actions` | array<DdlStatementActionInfo> | The brief action info for the DDL statements. `actions[i]` is the brief info for `statements[i]`. |
| `commitTimestamps` | array<string> | Reports the commit timestamps of all statements that have succeeded so far, where `commit_timestamps[i]` is the commit timestamp for the statement `statements[i]`. |
| `database` | string | The database being modified. |
| `progress` | array<OperationProgress> | The progress of the UpdateDatabaseDdl operations. All DDL statements will have continuously updating progress, and `progress[i]` is the operation progress for `statements[i]`. Also, `progress[i]` will have start time and end time populated with commit timestamp of operation, as well as a progress of 100% once the operation has completed. |
| `statements` | array<string> | For an update this list contains all the statements. For an individual statement, this list contains only that statement. |
| `throttled` | boolean | Output only. When true, indicates that the operation is throttled, for example, due to resource constraints. When resources become available the operation will resume and this field will be false again. |

### `UpdateDatabaseDdlRequest`

- Enqueues the given DDL statements to be applied, in order but not necessarily all at once, to the database schema at some point (or points) in the future. The server checks that the statements are executable (syntactically valid, name tables that exist, etc.) before enqueueing them, but they may still fail upon later execution (for example, if a statement from another batch of statements is applied first and it conflicts in some way, or if there is some data-related problem like a `NULL` value in a column to which `NOT NULL` would be added). If a statement fails, all subsequent statements in the batch are automatically cancelled. Each batch of statements is assigned a name which can be used with the Operations API to monitor progress. See the operation_id field for more details.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `operationId` | string | If empty, the new update request is assigned an automatically-generated operation ID. Otherwise, `operation_id` is used to construct the name of the resulting Operation. Specifying an explicit operation ID simplifies determining whether the statements were executed in the event that the UpdateDatabaseDdl call is replayed, or the return value is otherwise lost: the database and `operation_id` fields can be combined to form the `name` of the resulting longrunning.Operation: `/operations/`. `operation_id` should be unique within the database, and must be a valid identifier: `a-z*`. Note that automatically-generated operation IDs always begin with an underscore. If the named operation already exists, UpdateDatabaseDdl returns `ALREADY_EXISTS`. |
| `protoDescriptors` | string (byte) | Optional. Proto descriptors used by CREATE/ALTER PROTO BUNDLE statements. Contains a protobuf-serialized google.protobuf.FileDescriptorSet (https://github.com/protocolbuffers/protobuf/blob/main/src/google/protobuf/descriptor.proto). To generate it, install (https://grpc.io/docs/protoc-installation/) and run `protoc` with --include_imports and --descriptor_set_out. For example, to generate for moon/shot/app.proto, run $protoc --proto_path=/app_path --proto_path=/lib_path \ --include_imports \ --descriptor_set_out=descriptors.data \ moon/shot/app.proto For more details, see protobuffer self description (https://developers.google.com/protocol-buffers/docs/techniques#self-description). |
| `statements` | array<string> | Required. DDL statements to be applied to the database. |

### `UpdateDatabaseMetadata`

- Metadata type for the operation returned by UpdateDatabase.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `cancelTime` | string (google-datetime) | The time at which this operation was cancelled. If set, this operation is in the process of undoing itself (which is best-effort). |
| `progress` | OperationProgress | The progress of the UpdateDatabase operation. |
| `request` | UpdateDatabaseRequest | The request for UpdateDatabase. |

### `UpdateDatabaseRequest`

- The request for UpdateDatabase.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `database` | Database | Required. The database to update. The `name` field of the database is of the form `projects//instances//databases/`. |
| `updateMask` | string (google-fieldmask) | Required. The list of fields to update. Currently, only `enable_drop_protection` field can be updated. |

### `UpdateInstanceConfigMetadata`

- Metadata type for the operation returned by UpdateInstanceConfig.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `cancelTime` | string (google-datetime) | The time at which this operation was cancelled. |
| `instanceConfig` | InstanceConfig | The desired instance configuration after updating. |
| `progress` | InstanceOperationProgress | The progress of the UpdateInstanceConfig operation. |

### `UpdateInstanceConfigRequest`

- The request for UpdateInstanceConfig.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `instanceConfig` | InstanceConfig | Required. The user instance configuration to update, which must always include the instance configuration name. Otherwise, only fields mentioned in update_mask need be included. To prevent conflicts of concurrent updates, etag can be used. |
| `updateMask` | string (google-fieldmask) | Required. A mask specifying which fields in InstanceConfig should be updated. The field mask must always be specified; this prevents any future fields in InstanceConfig from being erased accidentally by clients that do not know about them. Only display_name and labels can be updated. |
| `validateOnly` | boolean | An option to validate, but not actually execute, a request, and provide the same response. |

### `UpdateInstanceMetadata`

- Metadata type for the operation returned by UpdateInstance.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `cancelTime` | string (google-datetime) | The time at which this operation was cancelled. If set, this operation is in the process of undoing itself (which is guaranteed to succeed) and cannot be cancelled again. |
| `endTime` | string (google-datetime) | The time at which this operation failed or was completed successfully. |
| `expectedFulfillmentPeriod` | string enum | The expected fulfillment period of this update operation. Values: `FULFILLMENT_PERIOD_UNSPECIFIED`, `FULFILLMENT_PERIOD_NORMAL`, `FULFILLMENT_PERIOD_EXTENDED`. |
| `instance` | Instance | The desired end state of the update. |
| `startTime` | string (google-datetime) | The time at which UpdateInstance request was received. |

### `UpdateInstancePartitionMetadata`

- Metadata type for the operation returned by UpdateInstancePartition.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `cancelTime` | string (google-datetime) | The time at which this operation was cancelled. If set, this operation is in the process of undoing itself (which is guaranteed to succeed) and cannot be cancelled again. |
| `endTime` | string (google-datetime) | The time at which this operation failed or was completed successfully. |
| `instancePartition` | InstancePartition | The desired end state of the update. |
| `startTime` | string (google-datetime) | The time at which UpdateInstancePartition request was received. |

### `UpdateInstancePartitionRequest`

- The request for UpdateInstancePartition.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `fieldMask` | string (google-fieldmask) | Required. A mask specifying which fields in InstancePartition should be updated. The field mask must always be specified; this prevents any future fields in InstancePartition from being erased accidentally by clients that do not know about them. |
| `instancePartition` | InstancePartition | Required. The instance partition to update, which must always include the instance partition name. Otherwise, only fields mentioned in field_mask need be included. |

### `UpdateInstanceRequest`

- The request for UpdateInstance.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `fieldMask` | string (google-fieldmask) | Required. A mask specifying which fields in Instance should be updated. The field mask must always be specified; this prevents any future fields in Instance from being erased accidentally by clients that do not know about them. |
| `instance` | Instance | Required. The instance to update, which must always include the instance name. Otherwise, only fields mentioned in field_mask need be included. |

### `VisualizationData`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `dataSourceEndToken` | string | The token signifying the end of a data_source. |
| `dataSourceSeparatorToken` | string | The token delimiting a datasource name from the rest of a key in a data_source. |
| `diagnosticMessages` | array<DiagnosticMessage> | The list of messages (info, alerts, ...) |
| `endKeyStrings` | array<string> | We discretize the entire keyspace into buckets. Assuming each bucket has an inclusive keyrange and covers keys from k(i) ... k(n). In this case k(n) would be an end key for a given range. end_key_string is the collection of all such end keys |
| `hasPii` | boolean | Whether this scan contains PII. |
| `indexedKeys` | array<string> | Keys of key ranges that contribute significantly to a given metric Can be thought of as heavy hitters. |
| `keySeparator` | string | The token delimiting the key prefixes. |
| `keyUnit` | string enum | The unit for the key: e.g. 'key' or 'chunk'. Values: `KEY_UNIT_UNSPECIFIED`, `KEY`, `CHUNK`. |
| `metrics` | array<Metric> | The list of data objects for each metric. |
| `prefixNodes` | array<PrefixNode> | The list of extracted key prefix nodes used in the key prefix hierarchy. |

### `Write`

- Arguments to insert, update, insert_or_update, and replace operations.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `columns` | array<string> | The names of the columns in table to be written. The list of columns must contain enough columns to allow Cloud Spanner to derive values for all primary key columns in the row(s) to be modified. |
| `table` | string | Required. The table whose rows will be written. |
| `values` | array<array> | The values to be written. `values` can contain more than one list of values. If it does, then multiple rows are written, one for each entry in `values`. Each list in `values` must have exactly as many entries as there are entries in columns above. Sending multiple lists is equivalent to sending multiple `Mutation`s, each containing one `values` entry and repeating table and columns. Individual values in each list are encoded as described here. |

### Shape of `RestoreDatabaseRequest`

Generated from the Discovery schema (not in the official docs); values show each field type:

```json
{
  "backup": "string",
  "databaseId": "string",
  "encryptionConfig": "RestoreDatabaseEncryptionConfig"
}
```

## Notes

- Generated from the Discovery document(s) v1 of `spanner` (retrieved 2026-11-14); a type with the same fields in several versions shows the preferred version; a type whose fields differ between versions is listed once per version (heading suffix `(version)`), and each type's `Version` line names the document it was taken from. A `$ref` resolves to the definition of the same version.
- Descriptions are verbatim from Discovery, which drops angle-bracket placeholders of the source comments: a format such as `projects//locations/global` stands for `projects/{project}/locations/global` (likewise `"@.iam.gserviceaccount.com"` lost the account ID before `@`, and a name format ending in a collection such as `projects/*/locations/*/registrations/` lost its last ID), and an expression such as `... && in labels` lost its left operand (for example `'label_value' in labels`). Check the method or field in the product's REST reference before relying on such a format.
- Source: https://spanner.googleapis.com/$discovery/rest?version=v1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
