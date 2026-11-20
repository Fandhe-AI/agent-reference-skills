---
source: https://bigquery.googleapis.com/$discovery/rest?version=v2
---

# BigQuery API message schemas (bigquery) (part 2/3)

## Signature / Usage

Message types referenced by the methods listed under `references/rest/bigquery/`.

### `JobStatistics2`

- Statistics for a query job.
- Version: v2

### `JobStatistics3`

- Statistics for a load job.
- Version: v2

### `JobStatistics4`

- Statistics for an extract job.
- Version: v2

### `JobStatistics5`

- Statistics for a copy job.
- Version: v2

### `JobStatus`

- Version: v2

### `JoinRestrictionPolicy`

- Represents privacy policy associated with "join restrictions". Join restriction gives data providers the ability to enforce joins on the 'join_allowed_columns' when data is queried from a privacy protected view.
- Version: v2

### `JsonObject`

- Represents a single JSON object.
- Version: v2
- Map values: JsonValue

### `JsonOptions`

- Json Options for load and make external tables.
- Version: v2

### `JsonValue`

- Version: v2
- Type: any

### `LinkedDatasetMetadata`

- Metadata about the Linked Dataset.
- Version: v2

### `LinkedDatasetSource`

- A dataset source type which refers to another BigQuery dataset.
- Version: v2

### `ListModelsResponse`

- Response format for a single page when listing BigQuery ML models.
- Version: v2

### `ListRoutinesResponse`

- Describes the format of a single result page when listing routines.
- Version: v2

### `ListRowAccessPoliciesResponse`

- Response message for the ListRowAccessPolicies method.
- Version: v2

### `LoadQueryStatistics`

- Statistics for a LOAD query.
- Version: v2

### `LocationMetadata`

- BigQuery-specific metadata about a location. This will be set on google.cloud.location.Location.metadata in Cloud Location API responses.
- Version: v2

### `MaterializedView`

- A materialized view considered for a query job.
- Version: v2

### `MaterializedViewDefinition`

- Definition and configuration of a materialized view.
- Version: v2

### `MaterializedViewStatistics`

- Statistics of materialized views considered in a query job.
- Version: v2

### `MaterializedViewStatus`

- Status of a materialized view. The last refresh timestamp status is omitted here, but is present in the MaterializedViewDefinition message.
- Version: v2

### `MetadataCacheStalenessInsight`

- Column Metadata Index staleness detailed infnormation.
- Version: v2

### `MetadataCacheStatistics`

- Statistics for metadata caching in queried tables.
- Version: v2

### `MlStatistics`

- Job statistics specific to a BigQuery ML training job.
- Version: v2

### `Model`

- Version: v2

### `ModelDefinition`

- Version: v2

### `ModelExtractOptions`

- Options related to model extraction.
- Version: v2

### `ModelReference`

- Id path of a model.
- Version: v2

### `MultiClassClassificationMetrics`

- Evaluation metrics for multi-class classification/classifier models.
- Version: v2

### `ObjectStorageStats`

- Storage and caching statistics for object storage.
- Version: v2

### `ParquetOptions`

- Parquet Options for load and make external tables.
- Version: v2

### `PartitionSkew`

- Partition skew detailed information.
- Version: v2

### `PartitionedColumn`

- The partitioning column information.
- Version: v2

### `PartitioningDefinition`

- The partitioning information, which includes managed table, external table and metastore partitioned table partition information.
- Version: v2

### `PerformanceInsights`

- Performance insights for the job.
- Version: v2

### `Policy`

- An Identity and Access Management (IAM) policy, which specifies access controls for Google Cloud resources. A `Policy` is a collection of `bindings`. A `binding` binds one or more `members`, or principals, to a single `role`. Principals can be user accounts, service accounts, Google groups, and domains (such as G Suite). A `role` is a named list of permissions; each `role` can be an IAM predefined role or a user-created custom role. For some types of Google Cloud resources, a `binding` can also specify a `condition`, which is a logical expression that allows access to a resource only if the expression evaluates to `true`. A condition can add constraints based on attributes of the request, the resource, or both. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). The JSON and YAML examples of this description are shown below. For a description of IAM and its features, see the IAM documentation (https://cloud.google.com/iam/docs/).
- Version: v2

Adapted (not in the official docs): the JSON example of the Discovery `Policy` description, quoted as a JSON block; only the trailing comma after the `condition.expression` value is removed, so that the block is valid JSON (see Notes).

```json
{
  "bindings": [
    {
      "role": "roles/resourcemanager.organizationAdmin",
      "members": [
        "user:mike@example.com",
        "group:admins@example.com",
        "domain:google.com",
        "serviceAccount:my-project-id@appspot.gserviceaccount.com"
      ]
    },
    {
      "role": "roles/resourcemanager.organizationViewer",
      "members": [
        "user:eve@example.com"
      ],
      "condition": {
        "title": "expirable access",
        "description": "Does not grant access after Sep 2020",
        "expression": "request.time < timestamp('2020-10-01T00:00:00.000Z')"
      }
    }
  ],
  "etag": "BwWWja0YfJA=",
  "version": 3
}
```

YAML example from the description (line breaks and indentation restored from the source proto; see Notes):

```yaml
bindings:
- members:
  - user:mike@example.com
  - group:admins@example.com
  - domain:google.com
  - serviceAccount:my-project-id@appspot.gserviceaccount.com
  role: roles/resourcemanager.organizationAdmin
- members:
  - user:eve@example.com
  role: roles/resourcemanager.organizationViewer
  condition:
    title: expirable access
    description: Does not grant access after Sep 2020
    expression: request.time < timestamp('2020-10-01T00:00:00.000Z')
etag: BwWWja0YfJA=
version: 3
```

### `PrincipalComponentInfo`

- Principal component infos, used only for eigen decomposition based models, e.g., PCA. Ordered by explained_variance in the descending order.
- Version: v2

### `PrivacyPolicy`

- Represents privacy policy that contains the privacy requirements specified by the data owner. Currently, this is only supported on views.
- Version: v2

### `ProjectList`

- Response object of ListProjects
- Version: v2

### `ProjectReference`

- A unique reference to a project.
- Version: v2

### `PropertyGraphReference`

- Id path of a property graph.
- Version: v2

### `PruningStats`

- The column metadata index pruning statistics.
- Version: v2

### `PythonOptions`

- Options for a user-defined Python function.
- Version: v2

### `QueryInfo`

- Query optimization information for a QUERY job.
- Version: v2

### `QueryParameter`

- A parameter given to a query.
- Version: v2

### `QueryParameterType`

- The type of a query parameter.
- Version: v2

### `QueryParameterValue`

- The value of a query parameter.
- Version: v2

### `QueryRequest`

- Describes the format of the jobs.query request.
- Version: v2

### `QueryResponse`

- Version: v2

### `QueryTimelineSample`

- Summary of the state of query execution at a given time.
- Version: v2

### `RangePartitioning`

- Version: v2

### `RangeValue`

- Represents the value of a range.
- Version: v2

### `RankingMetrics`

- Evaluation metrics used by weighted-ALS models specified by feedback_type=implicit.
- Version: v2

### `RegressionMetrics`

- Evaluation metrics for regression and explicit feedback type matrix factorization models.
- Version: v2

### `RemoteFunctionOptions`

- Options for a remote user-defined function.
- Version: v2

### `RemoteModelInfo`

- Remote Model Info
- Version: v2

### `RestrictionConfig`

- Version: v2

### `Routine`

- A user-defined function or a stored procedure.
- Version: v2

### `RoutineBuildStatus`

- The status of a routine build.
- Version: v2

### `RoutineReference`

- Id path of a routine.
- Version: v2

### `Row`

- A single row in the confusion matrix.
- Version: v2

### `RowAccessPolicy`

- Represents access on a subset of rows on the specified table, defined by its filter predicate. Access to the subset of rows is controlled by its IAM policy.
- Version: v2

### `RowAccessPolicyReference`

- Id path of a row access policy.
- Version: v2

### `RowLevelSecurityStatistics`

- Statistics for row-level security.
- Version: v2

### `ScriptOptions`

- Options related to script execution.
- Version: v2

### `ScriptStackFrame`

- Represents the location of the statement/expression being evaluated. Line and column numbers are defined as follows: - Line and column numbers start with one. That is, line 1 column 1 denotes the start of the script. - When inside a stored procedure, all line/column numbers are relative to the procedure body, not the script in which the procedure was defined. - Start/end positions exclude leading/trailing comments and whitespace. The end position always ends with a ";", when present. - Multi-byte Unicode characters are treated as just one column. - If the original script (or procedure definition) contains TAB characters, a tab "snaps" the indentation forward to the nearest multiple of 8 characters, plus 1. For example, a TAB on column 1, 2, 3, 4, 5, 6 , or 8 will advance the next character to column 9. A TAB on column 9, 10, 11, 12, 13, 14, 15, or 16 will advance the next character to column 17.
- Version: v2

### `ScriptStatistics`

- Job statistics specific to the child job of a script.
- Version: v2

### `SearchStatistics`

- Statistics for a search query. Populated as part of JobStatistics2.
- Version: v2

### `SecureContext`

- A set of key-value pairs representing the secure context.
- Version: v2

### `SerDeInfo`

- Serializer and deserializer information.
- Version: v2

### `SessionInfo`

- \[Preview\] Information related to sessions.
- Version: v2

### `SetIamPolicyRequest`

- Request message for `SetIamPolicy` method.
- Version: v2

### `SkewSource`

- Details about source stages which produce skewed data.
- Version: v2

### `SnapshotDefinition`

- Information about base table and snapshot time of the snapshot.
- Version: v2

### `SparkLoggingInfo`

- Spark job logs can be filtered by these fields in Cloud Logging.
- Version: v2

### `SparkOptions`

- Options for a user-defined Spark routine.
- Version: v2

### `SparkStatistics`

- Statistics for a BigSpark query. Populated as part of JobStatistics2
- Version: v2

### `StagePerformanceChangeInsight`

- Performance insights compared to the previous executions for a specific stage.
- Version: v2

### `StagePerformanceStandaloneInsight`

- Standalone performance insights for a specific stage.
- Version: v2

### `StandardSqlDataType`

- The data type of a variable such as a function argument. Examples include (type names restored from the source proto; see Notes): \* INT64: `{"typeKind": "INT64"}` \* `ARRAY<STRING>`: { "typeKind": "ARRAY", "arrayElementType": {"typeKind": "STRING"} } \* `STRUCT<x STRING, y ARRAY<DATE>>`: { "typeKind": "STRUCT", "structType": { "fields": \[ { "name": "x", "type": {"typeKind": "STRING"} }, { "name": "y", "type": { "typeKind": "ARRAY", "arrayElementType": {"typeKind": "DATE"} } } \] } } \* `RANGE<DATE>`: { "typeKind": "RANGE", "rangeElementType": {"typeKind": "DATE"} }
- Version: v2

### `StandardSqlField`

- A field or a column.
- Version: v2

### `StandardSqlStructType`

- The representation of a SQL STRUCT type.
- Version: v2

### `StandardSqlTableType`

- A table type
- Version: v2

### `StorageDescriptor`

- Contains information about how a table's data is stored and accessed by open source query engines.
- Version: v2

### `StoredColumnsUnusedReason`

- If the stored column was not used, explain why.
- Version: v2

### `StoredColumnsUsage`

- Indicates the stored columns usage in the query.
- Version: v2

### `Streamingbuffer`

- Version: v2

### `StringHparamSearchSpace`

- Search space for string and enum.
- Version: v2

### `SystemVariables`

- System variables given to a query.
- Version: v2

### `Table`

- Version: v2

### `TableCell`

- Version: v2

### `TableChangeInsight`

- Table-level performance insights compared to previous runs. These insights don't apply to specific query stages, rather they apply to the whole table.
- Version: v2

### `TableConstraints`

- The TableConstraints defines the primary key and foreign key.
- Version: v2

### `TableDataInsertAllRequest`

- Request for sending a single streaming insert.
- Version: v2

### `TableDataInsertAllResponse`

- Describes the format of a streaming insert response.
- Version: v2

### `TableDataList`

- Version: v2

### `TableFieldSchema`

- A field in TableSchema
- Version: v2

### `TableList`

- Partial projection of the metadata for a given table in a list response.
- Version: v2

### `TableMetadataCacheUsage`

- Table level detail on the usage of metadata caching. Only set for Metadata caching eligible tables referenced in the query.
- Version: v2

### `TableReference`

- Version: v2

### `TableReplicationInfo`

- Replication info of a table created using `AS REPLICA` DDL like: `CREATE MATERIALIZED VIEW mv1 AS REPLICA OF src_mv`
- Version: v2

### `TableRow`

- Version: v2

### `TableSchema`

- Schema of a table
- Version: v2

### `TestIamPermissionsRequest`

- Request message for `TestIamPermissions` method.
- Version: v2

### `TestIamPermissionsResponse`

- Response message for `TestIamPermissions` method.
- Version: v2

### `TimePartitioning`

- Version: v2

### `TrainingOptions`

- Options used in model training.
- Version: v2

### `TrainingRun`

- Information about a single training query run for the model.
- Version: v2

### `TransactionInfo`

- \[Alpha\] Information of a multi-statement transaction.
- Version: v2

### `TransformColumn`

- Information about a single transform column.
- Version: v2

### `UndeleteDatasetRequest`

- Request format for undeleting a dataset.
- Version: v2

### `UserDefinedFunctionResource`

- This is used for defining User Defined Function (UDF) resources only when using legacy SQL. Users of GoogleSQL should leverage either DDL (e.g. CREATE \[TEMPORARY\] FUNCTION ... ) or the Routines API to define UDF resources. For additional information on migrating, see: https://cloud.google.com/bigquery/docs/reference/standard-sql/migrating-from-legacy-sql#differences_in_user-defined_javascript_functions
- Version: v2

### `VectorSearchStatistics`

- Statistics for a vector search query. Populated as part of JobStatistics2.
- Version: v2

### Shape of `JobStatistics2`

Generated from the Discovery schema (not in the official docs); values show each field type:

```json
{
  "biEngineStatistics": "BiEngineStatistics",
  "billingTier": "integer (int32)",
  "cacheHit": "boolean",
  "dclTargetDataset": "DatasetReference",
  "dclTargetTable": "TableReference",
  "dclTargetView": "TableReference",
  "ddlAffectedRowAccessPolicyCount": "string (int64)",
  "ddlDestinationTable": "TableReference",
  "ddlOperationPerformed": "string",
  "ddlTargetDataset": "DatasetReference",
  "ddlTargetRoutine": "RoutineReference",
  "ddlTargetRowAccessPolicy": "RowAccessPolicyReference",
  "ddlTargetTable": "TableReference",
  "dmlStats": "DmlStatistics",
  "estimatedBytesProcessed": "string (int64)",
  "exportDataStatistics": "ExportDataStatistics",
  "externalServiceCosts": "array<ExternalServiceCost>",
  "genAiStats": "GenAiStats",
  "incrementalResultStats": "IncrementalResultStats",
  "loadQueryStatistics": "LoadQueryStatistics",
  "materializedViewStatistics": "MaterializedViewStatistics",
  "metadataCacheStatistics": "MetadataCacheStatistics",
  "mlStatistics": "MlStatistics",
  "modelTraining": "BigQueryModelTraining",
  "modelTrainingCurrentIteration": "integer (int32)",
  "modelTrainingExpectedTotalIteration": "string (int64)",
  "numDmlAffectedRows": "string (int64)",
  "objectStorageStats": "array<ObjectStorageStats>",
  "performanceInsights": "PerformanceInsights",
  "queryInfo": "QueryInfo",
  "queryPlan": "array<ExplainQueryStage>",
  "referencedLogicalViews": "array<TableReference>",
  "referencedPropertyGraphs": "array<PropertyGraphReference>",
  "referencedRoutines": "array<RoutineReference>",
  "referencedTables": "array<TableReference>",
  "reservationUsage": "array<object>",
  "schema": "TableSchema",
  "searchStatistics": "SearchStatistics",
  "sparkStatistics": "SparkStatistics",
  "statementType": "string",
  "timeline": "array<QueryTimelineSample>",
  "totalBytesBilled": "string (int64)",
  "totalBytesProcessed": "string (int64)",
  "totalBytesProcessedAccuracy": "string",
  "totalPartitionsProcessed": "string (int64)",
  "totalServicesSkuSlotMs": "string (int64)",
  "totalSlotMs": "string (int64)",
  "transferredBytes": "string (int64)",
  "undeclaredQueryParameters": "array<QueryParameter>",
  "vectorSearchStatistics": "VectorSearchStatistics"
}
```

### Example `JobStatistics2` value

Generated from the field types (not in the official docs): a JSON value that matches the table, with empty strings, `0`, `false`, empty arrays and objects, and for an enum its first value other than `*_UNSPECIFIED`. int64 values are JSON strings, as in the Discovery `format`. It shows the JSON shape only; it is not a request to send as is (fill in the values the method needs, and omit output-only fields in requests). Deprecated fields are left out (`modelTraining`, `modelTrainingCurrentIteration`, `modelTrainingExpectedTotalIteration`, `reservationUsage`; see the table and Notes).

```json
{
  "biEngineStatistics": {},
  "billingTier": 0,
  "cacheHit": false,
  "dclTargetDataset": {},
  "dclTargetTable": {},
  "dclTargetView": {},
  "ddlAffectedRowAccessPolicyCount": "0",
  "ddlDestinationTable": {},
  "ddlOperationPerformed": "",
  "ddlTargetDataset": {},
  "ddlTargetRoutine": {},
  "ddlTargetRowAccessPolicy": {},
  "ddlTargetTable": {},
  "dmlStats": {},
  "estimatedBytesProcessed": "0",
  "exportDataStatistics": {},
  "externalServiceCosts": [],
  "genAiStats": {},
  "incrementalResultStats": {},
  "loadQueryStatistics": {},
  "materializedViewStatistics": {},
  "metadataCacheStatistics": {},
  "mlStatistics": {},
  "numDmlAffectedRows": "0",
  "objectStorageStats": [],
  "performanceInsights": {},
  "queryInfo": {},
  "queryPlan": [],
  "referencedLogicalViews": [],
  "referencedPropertyGraphs": [],
  "referencedRoutines": [],
  "referencedTables": [],
  "schema": {},
  "searchStatistics": {},
  "sparkStatistics": {},
  "statementType": "",
  "timeline": [],
  "totalBytesBilled": "0",
  "totalBytesProcessed": "0",
  "totalBytesProcessedAccuracy": "",
  "totalPartitionsProcessed": "0",
  "totalServicesSkuSlotMs": "0",
  "totalSlotMs": "0",
  "transferredBytes": "0",
  "undeclaredQueryParameters": [],
  "vectorSearchStatistics": {}
}
```

## Options / Props

### `JobStatistics2` fields

| Field | Type | Description |
|---|---|---|
| `biEngineStatistics` | BiEngineStatistics | Output only. BI Engine specific Statistics. |
| `billingTier` | integer (int32) | Output only. Billing tier for the job. This is a BigQuery-specific concept which is not related to the Google Cloud notion of "free tier". The value here is a measure of the query's resource consumption relative to the amount of data scanned. For on-demand queries, the limit is 100, and all queries within this limit are billed at the standard on-demand rates. On-demand queries that exceed this limit will fail with a billingTierLimitExceeded error. |
| `cacheHit` | boolean | Output only. Whether the query result was fetched from the query cache. |
| `dclTargetDataset` | DatasetReference | Output only. Referenced dataset for DCL statement. |
| `dclTargetTable` | TableReference | Output only. Referenced table for DCL statement. |
| `dclTargetView` | TableReference | Output only. Referenced view for DCL statement. |
| `ddlAffectedRowAccessPolicyCount` | string (int64) | Output only. The number of row access policies affected by a DDL statement. Present only for DROP ALL ROW ACCESS POLICIES queries. |
| `ddlDestinationTable` | TableReference | Output only. The table after rename. Present only for ALTER TABLE RENAME TO query. |
| `ddlOperationPerformed` | string | Output only. The DDL operation performed, possibly dependent on the pre-existence of the DDL target. |
| `ddlTargetDataset` | DatasetReference | Output only. The DDL target dataset. Present only for CREATE/ALTER/DROP SCHEMA(dataset) queries. |
| `ddlTargetRoutine` | RoutineReference | Output only. \[Beta\] The DDL target routine. Present only for CREATE/DROP FUNCTION/PROCEDURE queries. |
| `ddlTargetRowAccessPolicy` | RowAccessPolicyReference | Output only. The DDL target row access policy. Present only for CREATE/DROP ROW ACCESS POLICY queries. |
| `ddlTargetTable` | TableReference | Output only. The DDL target table. Present only for CREATE/DROP TABLE/VIEW and DROP ALL ROW ACCESS POLICIES queries. |
| `dmlStats` | DmlStatistics | Output only. Detailed statistics for DML statements INSERT, UPDATE, DELETE, MERGE or TRUNCATE. |
| `estimatedBytesProcessed` | string (int64) | Output only. The original estimate of bytes processed for the job. |
| `exportDataStatistics` | ExportDataStatistics | Output only. Stats for EXPORT DATA statement. |
| `externalServiceCosts` | `array<ExternalServiceCost>` | Output only. Job cost breakdown as bigquery internal cost and external service costs. |
| `genAiStats` | GenAiStats | Output only. Statistics related to GenAI usage in the query. |
| `incrementalResultStats` | IncrementalResultStats | Output only. Statistics related to incremental query results, if enabled for the query. This feature is not yet available. |
| `loadQueryStatistics` | LoadQueryStatistics | Output only. Statistics for a LOAD query. |
| `materializedViewStatistics` | MaterializedViewStatistics | Output only. Statistics of materialized views of a query job. |
| `metadataCacheStatistics` | MetadataCacheStatistics | Output only. Statistics of metadata cache usage in a query for BigLake tables. |
| `mlStatistics` | MlStatistics | Output only. Statistics of a BigQuery ML training job. |
| `modelTraining` | BigQueryModelTraining | Deprecated. |
| `modelTrainingCurrentIteration` | integer (int32) | Deprecated. |
| `modelTrainingExpectedTotalIteration` | string (int64) | Deprecated. |
| `numDmlAffectedRows` | string (int64) | Output only. The number of rows affected by a DML statement. Present only for DML statements INSERT, UPDATE or DELETE. |
| `objectStorageStats` | `array<ObjectStorageStats>` | Output only. Storage and caching statistics per cloud provider for queries over object storage. |
| `performanceInsights` | PerformanceInsights | Output only. Performance insights. |
| `queryInfo` | QueryInfo | Output only. Query optimization information for a QUERY job. |
| `queryPlan` | `array<ExplainQueryStage>` | Output only. Describes execution plan for the query. |
| `referencedLogicalViews` | `array<TableReference>` | Output only. Referenced logical views for the job. |
| `referencedPropertyGraphs` | `array<PropertyGraphReference>` | Output only. Referenced property graphs for the job. Queries that reference more than 50 property graphs will not have a complete list. |
| `referencedRoutines` | `array<RoutineReference>` | Output only. Referenced routines for the job. |
| `referencedTables` | `array<TableReference>` | Output only. Referenced tables for the job. |
| `reservationUsage` | `array<object>` | Output only. Job resource usage breakdown by reservation. This field reported misleading information and will no longer be populated. Deprecated (`deprecated: true` in the Discovery document; see Notes). |
| `reservationUsage[].name` | string | Reservation name or "unreserved" for on-demand resource usage and multi-statement queries. |
| `reservationUsage[].slotMs` | string (int64) | Total slot milliseconds used by the reservation for a particular job. |
| `schema` | TableSchema | Output only. The schema of the results. Present only for successful dry run of non-legacy SQL queries. |
| `searchStatistics` | SearchStatistics | Output only. Search query specific statistics. |
| `sparkStatistics` | SparkStatistics | Output only. Statistics of a Spark procedure job. |
| `statementType` | string | Output only. The type of query statement, if valid. Possible values: \* `SELECT`: `SELECT` (https://cloud.google.com/bigquery/docs/reference/standard-sql/query-syntax#select_list) statement. \* `ASSERT`: `ASSERT` (https://cloud.google.com/bigquery/docs/reference/standard-sql/debugging-statements#assert) statement. \* `INSERT`: `INSERT` (https://cloud.google.com/bigquery/docs/reference/standard-sql/dml-syntax#insert_statement) statement. \* `UPDATE`: `UPDATE` (https://cloud.google.com/bigquery/docs/reference/standard-sql/dml-syntax#update_statement) statement. \* `DELETE`: `DELETE` (https://cloud.google.com/bigquery/docs/reference/standard-sql/data-manipulation-language) statement. \* `MERGE`: `MERGE` (https://cloud.google.com/bigquery/docs/reference/standard-sql/data-manipulation-language) statement. \* `TRUNCATE_TABLE`: `TRUNCATE TABLE` (https://cloud.google.com/bigquery/docs/reference/standard-sql/dml-syntax#truncate_table_statement) statement. \* `CREATE_TABLE`: `CREATE TABLE` (https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#create_table_statement) statement, without `AS SELECT`. \* `CREATE_TABLE_AS_SELECT`: `CREATE TABLE AS SELECT` (https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#create_table_statement) statement. \* `CREATE_VIEW`: `CREATE VIEW` (https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#create_view_statement) statement. \* `CREATE_MODEL`: `CREATE MODEL` (https://cloud.google.com/bigquery-ml/docs/reference/standard-sql/bigqueryml-syntax-create#create_model_statement) statement. \* `CREATE_MATERIALIZED_VIEW`: `CREATE MATERIALIZED VIEW` (https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#create_materialized_view_statement) statement. \* `CREATE_FUNCTION`: `CREATE FUNCTION` (https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#create_function_statement) statement. \* `CREATE_TABLE_FUNCTION`: `CREATE TABLE FUNCTION` (https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#create_table_function_statement) statement. \* `CREATE_PROCEDURE`: `CREATE PROCEDURE` (https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#create_procedure) statement. \* `CREATE_ROW_ACCESS_POLICY`: `CREATE ROW ACCESS POLICY` (https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#create_row_access_policy_statement) statement. \* `CREATE_SCHEMA`: `CREATE SCHEMA` (https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#create_schema_statement) statement. \* `CREATE_EXTERNAL_SCHEMA`: `CREATE EXTERNAL SCHEMA` (https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#create_external_schema_statement) statement. \* `CREATE_EXTERNAL_TABLE`: `CREATE EXTERNAL TABLE` (https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#create_external_table_statement) statement. \* `CREATE_SNAPSHOT_TABLE`: `CREATE SNAPSHOT TABLE` (https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#create_snapshot_table_statement) statement. \* `CREATE_SEARCH_INDEX`: `CREATE SEARCH INDEX` (https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#create_search_index_statement) statement. \* `CREATE_VECTOR_INDEX`: `CREATE VECTOR INDEX` (https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#create_vector_index_statement) statement. \* `CREATE_CONNECTION`: `CREATE CONNECTION` (https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#create_connection_statement) statement. \* `CREATE_DATA_POLICY`: `CREATE DATA_POLICY` (https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#create_data_policy_statement) statement. \* `CREATE_PROPERTY_GRAPH`: `CREATE PROPERTY GRAPH` (https://cloud.google.com/bigquery/docs/reference/standard-sql/graph-schema-statements#gql_create_graph) statement. \* `CREATE_CAPACITY`: `CREATE CAPACITY` (https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#create_capacity_statement) statement. \* `CREATE_RESERVATION`: `CREATE RESERVATION` (https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#create_reservation_statement) statement. \* `CREATE_ASSIGNMENT`: `CREATE ASSIGNMENT` (https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#create_assignment_statement) statement. \* `DROP_TABLE`: `DROP TABLE` (https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#drop_table_statement) statement. \* `DROP_EXTERNAL_TABLE`: `DROP EXTERNAL TABLE` (https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#drop_external_table_statement) statement. \* `DROP_VIEW`: `DROP VIEW` (https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#drop_view_statement) statement. \* `DROP_MODEL`: `DROP MODEL` (https://cloud.google.com/bigquery-ml/docs/reference/standard-sql/bigqueryml-syntax-drop-model) statement. \* `DROP_MATERIALIZED_VIEW`: `DROP MATERIALIZED VIEW` (https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#drop_materialized_view_statement) statement. \* `DROP_FUNCTION`: `DROP FUNCTION` (https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#drop_function_statement) statement. \* `DROP_TABLE_FUNCTION`: `DROP TABLE FUNCTION` (https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#drop_table_function) statement. \* `DROP_PROCEDURE`: `DROP PROCEDURE` (https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#drop_procedure_statement) statement. \* `DROP_SEARCH_INDEX`: `DROP SEARCH INDEX` (https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#drop_search_index) statement. \* `DROP_VECTOR_INDEX`: `DROP VECTOR INDEX` (https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#drop_vector_index) statement. \* `DROP_SCHEMA`: `DROP SCHEMA` (https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#drop_schema_statement) statement. \* `UNDROP_SCHEMA`: `UNDROP SCHEMA` (https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#undrop_schema_statement) statement. \* `DROP_SNAPSHOT_TABLE`: `DROP SNAPSHOT TABLE` (https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#drop_snapshot_table_statement) statement. \* `DROP_ROW_ACCESS_POLICY`: \[`DROP [ALL] ROW ACCESS POLICY\|POLICIES`\](https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#drop_row_access_policy_statement) statement. \* `DROP_CONNECTION`: `DROP CONNECTION` (https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#drop_connection_statement) statement. \* `DROP_DATA_POLICY`: `DROP DATA_POLICY` (https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#drop_data_policy) statement. \* `DROP_PROPERTY_GRAPH`: `DROP PROPERTY GRAPH` (https://cloud.google.com/bigquery/docs/reference/standard-sql/graph-schema-statements#gql_drop_graph) statement. \* `DROP_CAPACITY`: `DROP CAPACITY` (https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#drop_capacity_statement) statement. \* `DROP_RESERVATION`: `DROP RESERVATION` (https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#drop_reservation_statement) statement. \* `DROP_ASSIGNMENT`: `DROP ASSIGNMENT` (https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#drop_assignment_statement) statement. \* `ALTER_TABLE`: `ALTER TABLE` (https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#alter_table_set_options_statement) statement. \* `ALTER_VIEW`: `ALTER VIEW` (https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#alter_view_set_options_statement) statement. \* `ALTER_MATERIALIZED_VIEW`: `ALTER MATERIALIZED VIEW` (https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#alter_materialized_view_set_options_statement) statement. \* `ALTER_SCHEMA`: `ALTER SCHEMA` (https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#alter_schema_set_options_statement) statement. \* `ALTER_MODEL`: `ALTER MODEL` (https://cloud.google.com/bigquery-ml/docs/reference/standard-sql/bigqueryml-syntax-alter-model) statement. \* `ALTER_SEARCH_INDEX`: `ALTER SEARCH INDEX` (https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#alter_search_index_statement) statement. \* `ALTER_VECTOR_INDEX`: `ALTER VECTOR INDEX` (https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#alter_vector_index_rebuild_statement) statement. \* `ALTER_CONNECTION`: `ALTER CONNECTION` (https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#alter_connection_set_options_statement) statement. \* `ALTER_DATA_POLICY`: `ALTER DATA_POLICY` (https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#alter_data_policy_statement) statement. \* `ALTER_PROJECT`: `ALTER PROJECT` (https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#alter_project_set_options_statement) statement. \* `ALTER_ORGANIZATION`: `ALTER ORGANIZATION` (https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#alter_organization_set_options_statement) statement. \* `ALTER_BI_CAPACITY`: `ALTER BI_CAPACITY` (https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#alter_bi_capacity_set_options_statement) statement. \* `ALTER_CAPACITY`: `ALTER CAPACITY` (https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#alter_capacity_set_options_statement) statement. \* `ALTER_RESERVATION`: `ALTER RESERVATION` (https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#alter_reservation_set_options_statement) statement. \* `SCRIPT`: `SCRIPT` (https://cloud.google.com/bigquery/docs/reference/standard-sql/procedural-language) statement. \* `CALL`: `CALL` (https://cloud.google.com/bigquery/docs/reference/standard-sql/procedural-language#call) statement. \* `BEGIN_TRANSACTION`: `BEGIN TRANSACTION` (https://cloud.google.com/bigquery/docs/reference/standard-sql/procedural-language#begin_transaction) statement. \* `COMMIT_TRANSACTION`: `COMMIT TRANSACTION` (https://cloud.google.com/bigquery/docs/reference/standard-sql/procedural-language#commit_transaction) statement. \* `ROLLBACK_TRANSACTION`: `ROLLBACK TRANSACTION` (https://cloud.google.com/bigquery/docs/reference/standard-sql/procedural-language#rollback_transaction) statement. \* `EXPORT_DATA`: `EXPORT DATA` (https://cloud.google.com/bigquery/docs/reference/standard-sql/export-statements#export_data_statement) statement. \* `EXPORT_MODEL`: `EXPORT MODEL` (https://cloud.google.com/bigquery-ml/docs/reference/standard-sql/bigqueryml-syntax-export-model) statement. \* `EXPORT_METADATA`: `EXPORT TABLE METADATA` (https://cloud.google.com/bigquery/docs/biglake-iceberg-tables-in-bigquery) statement, for BigLake Iceberg tables. \* `LOAD_DATA`: `LOAD DATA` (https://cloud.google.com/bigquery/docs/reference/standard-sql/load-statements#load_data_statement) statement. \* `GRANT_ON_SCHEMA`: `GRANT ... ON SCHEMA` (https://cloud.google.com/bigquery/docs/reference/standard-sql/data-control-language#grant_statement) statement. \* `GRANT_ON_TABLE`: `GRANT ... ON TABLE` (https://cloud.google.com/bigquery/docs/reference/standard-sql/data-control-language#grant_statement) statement. Also used for `GRANT ... ON EXTERNAL TABLE`. \* `GRANT_ON_VIEW`: `GRANT ... ON VIEW` (https://cloud.google.com/bigquery/docs/reference/standard-sql/data-control-language#grant_statement) statement. \* `GRANT_ON_PROJECT`: `GRANT ... ON PROJECT` (https://cloud.google.com/bigquery/docs/reference/standard-sql/data-control-language#grant_statement) statement. \* `REVOKE_ON_SCHEMA`: `REVOKE ... ON SCHEMA` (https://cloud.google.com/bigquery/docs/reference/standard-sql/data-control-language#revoke_statement) statement. \* `REVOKE_ON_TABLE`: `REVOKE ... ON TABLE` (https://cloud.google.com/bigquery/docs/reference/standard-sql/data-control-language#revoke_statement) statement. Also used for `REVOKE ... ON EXTERNAL TABLE`. \* `REVOKE_ON_VIEW`: `REVOKE ... ON VIEW` (https://cloud.google.com/bigquery/docs/reference/standard-sql/data-control-language#revoke_statement) statement. \* `REVOKE_ON_PROJECT`: `REVOKE ... ON PROJECT` (https://cloud.google.com/bigquery/docs/reference/standard-sql/data-control-language#revoke_statement) statement. |
| `timeline` | `array<QueryTimelineSample>` | Output only. Describes a timeline of job execution. |
| `totalBytesBilled` | string (int64) | Output only. If the project is configured to use on-demand pricing, then this field contains the total bytes billed for the job. If the project is configured to use flat-rate pricing, then you are not billed for bytes and this field is informational only. |
| `totalBytesProcessed` | string (int64) | Output only. Total bytes processed for the job. |
| `totalBytesProcessedAccuracy` | string | Output only. For dry-run jobs, totalBytesProcessed is an estimate and this field specifies the accuracy of the estimate. Possible values can be: UNKNOWN: accuracy of the estimate is unknown. PRECISE: estimate is precise. LOWER_BOUND: estimate is lower bound of what the query would cost. UPPER_BOUND: estimate is upper bound of what the query would cost. |
| `totalPartitionsProcessed` | string (int64) | Output only. Total number of partitions processed from all partitioned tables referenced in the job. |
| `totalServicesSkuSlotMs` | string (int64) | Output only. Total slot milliseconds for the job that ran on external services and billed on the services SKU. This field is only populated for jobs that have external service costs, and is the total of the usage for costs whose billing method is `"SERVICES_SKU"`. |
| `totalSlotMs` | string (int64) | Output only. Slot-milliseconds for the job. |
| `transferredBytes` | string (int64) | Output only. Total bytes transferred for BigQuery Omni queries from the remote cloud back to Google Cloud. This tracks data movement over Google-managed connections (like query results). It doesn't include input data read from the external data lake (for example, S3) because that data stays within the remote cloud. |
| `undeclaredQueryParameters` | `array<QueryParameter>` | Output only. GoogleSQL only: list of undeclared query parameters detected during a dry run validation. |
| `vectorSearchStatistics` | VectorSearchStatistics | Output only. Vector Search query specific statistics. |

### `JobStatistics3` fields

| Field | Type | Description |
|---|---|---|
| `badRecords` | string (int64) | Output only. The number of bad records encountered. Note that if the job has failed because of more bad records encountered than the maximum allowed in the load job configuration, then this number can be less than the total number of bad records present in the input data. |
| `inputFileBytes` | string (int64) | Output only. Number of bytes of source data in a load job. |
| `inputFiles` | string (int64) | Output only. Number of source files in a load job. |
| `outputBytes` | string (int64) | Output only. Size of the loaded data in bytes. Note that while a load job is in the running state, this value may change. |
| `outputRows` | string (int64) | Output only. Number of rows imported in a load job. Note that while an import job is in the running state, this value may change. |
| `timeline` | `array<QueryTimelineSample>` | Output only. Describes a timeline of job execution. |

### `JobStatistics4` fields

| Field | Type | Description |
|---|---|---|
| `destinationUriFileCounts` | `array<string (int64)>` | Output only. Number of files per destination URI or URI pattern specified in the extract configuration. These values will be in the same order as the URIs specified in the 'destinationUris' field. |
| `inputBytes` | string (int64) | Output only. Number of user bytes extracted into the result. This is the byte count as computed by BigQuery for billing purposes and doesn't have any relationship with the number of actual result bytes extracted in the desired format. |
| `timeline` | `array<QueryTimelineSample>` | Output only. Describes a timeline of job execution. |

### `JobStatistics5` fields

| Field | Type | Description |
|---|---|---|
| `copiedLogicalBytes` | string (int64) | Output only. Number of logical bytes copied to the destination table. |
| `copiedRows` | string (int64) | Output only. Number of rows copied to the destination table. |
| `remoteDestinationRegion` | string | Output only. Destination region for a cross-region copy job. Not set for in-region copy jobs. |

### `JobStatus` fields

| Field | Type | Description |
|---|---|---|
| `errorResult` | ErrorProto | Output only. Final error result of the job. If present, indicates that the job has completed and was unsuccessful. |
| `errors` | `array<ErrorProto>` | Output only. The first errors encountered during the running of the job. The final message includes the number of errors that caused the process to stop. Errors here do not necessarily mean that the job has not completed or was unsuccessful. |
| `state` | string | Output only. Running state of the job. Valid states include 'PENDING', 'RUNNING', and 'DONE'. |

### `JoinRestrictionPolicy` fields

| Field | Type | Description |
|---|---|---|
| `joinAllowedColumns` | `array<string>` | Optional. The only columns that joins are allowed on. This field is must be specified for join_conditions JOIN_ANY and JOIN_ALL and it cannot be set for JOIN_BLOCKED. |
| `joinCondition` | string enum | Optional. Specifies if a join is required or not on queries for the view. Default is JOIN_CONDITION_UNSPECIFIED. Values: `JOIN_CONDITION_UNSPECIFIED`, `JOIN_ANY`, `JOIN_ALL`, `JOIN_NOT_REQUIRED`, `JOIN_BLOCKED`. |

### `JsonOptions` fields

| Field | Type | Description |
|---|---|---|
| `encoding` | string | Optional. The character encoding of the data. The supported values are UTF-8, UTF-16BE, UTF-16LE, UTF-32BE, and UTF-32LE. The default value is UTF-8. |

### `LinkedDatasetMetadata` fields

| Field | Type | Description |
|---|---|---|
| `linkState` | string enum | Output only. Specifies whether Linked Dataset is currently in a linked state or not. Values: `LINK_STATE_UNSPECIFIED`, `LINKED`, `UNLINKED`. |

### `LinkedDatasetSource` fields

| Field | Type | Description |
|---|---|---|
| `sourceDataset` | DatasetReference | The source dataset reference contains project numbers and not project ids. |

### `ListModelsResponse` fields

| Field | Type | Description |
|---|---|---|
| `models` | `array<Model>` | Models in the requested dataset. Only the following fields are populated: model_reference, model_type, creation_time, last_modified_time and labels. |
| `nextPageToken` | string | A token to request the next page of results. |

### `ListRoutinesResponse` fields

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | A token to request the next page of results. |
| `routines` | `array<Routine>` | Routines in the requested dataset. Unless read_mask is set in the request, only the following fields are populated: etag, project_id, dataset_id, routine_id, routine_type, creation_time, last_modified_time, language, and remote_function_options. |

### `ListRowAccessPoliciesResponse` fields

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | A token to request the next page of results. |
| `rowAccessPolicies` | `array<RowAccessPolicy>` | Row access policies on the requested table. |

### `LoadQueryStatistics` fields

| Field | Type | Description |
|---|---|---|
| `badRecords` | string (int64) | Output only. The number of bad records encountered while processing a LOAD query. Note that if the job has failed because of more bad records encountered than the maximum allowed in the load job configuration, then this number can be less than the total number of bad records present in the input data. |
| `bytesTransferred` | string (int64) | Output only. This field is deprecated. The number of bytes of source data copied over the network for a `LOAD` query. `transferred_bytes` has the canonical value for physical transferred bytes, which is used for BigQuery Omni billing. REST JSON field name: `transferredBytes` of [`JobStatistics2`](#jobstatistics2) (`transferred_bytes` in the description; it is not a field of this message; see Notes). |
| `inputFileBytes` | string (int64) | Output only. Number of bytes of source data in a LOAD query. |
| `inputFiles` | string (int64) | Output only. Number of source files in a LOAD query. |
| `outputBytes` | string (int64) | Output only. Size of the loaded data in bytes. Note that while a LOAD query is in the running state, this value may change. |
| `outputRows` | string (int64) | Output only. Number of rows imported in a LOAD query. Note that while a LOAD query is in the running state, this value may change. |

### `LocationMetadata` fields

| Field | Type | Description |
|---|---|---|
| `legacyLocationId` | string | The legacy BigQuery location ID, e.g. “EU” for the “europe” location. This is for any API consumers that need the legacy “US” and “EU” locations. |

### `MaterializedView` fields

| Field | Type | Description |
|---|---|---|
| `chosen` | boolean | Whether the materialized view is chosen for the query. A materialized view can be chosen to rewrite multiple parts of the same query. If a materialized view is chosen to rewrite any part of the query, then this field is true, even if the materialized view was not chosen to rewrite others parts. |
| `estimatedBytesSaved` | string (int64) | If present, specifies a best-effort estimation of the bytes saved by using the materialized view rather than its base tables. |
| `rejectedReason` | string enum | If present, specifies the reason why the materialized view was not chosen for the query. Values: `REJECTED_REASON_UNSPECIFIED`, `NO_DATA`, `COST`, `BASE_TABLE_TRUNCATED`, `BASE_TABLE_DATA_CHANGE`, `BASE_TABLE_PARTITION_EXPIRATION_CHANGE`, `BASE_TABLE_EXPIRED_PARTITION`, `BASE_TABLE_INCOMPATIBLE_METADATA_CHANGE`, `TIME_ZONE`, `OUT_OF_TIME_TRAVEL_WINDOW`, `BASE_TABLE_FINE_GRAINED_SECURITY_POLICY`, `BASE_TABLE_TOO_STALE`. |
| `tableReference` | TableReference | The candidate materialized view. |

### `MaterializedViewDefinition` fields

| Field | Type | Description |
|---|---|---|
| `allowNonIncrementalDefinition` | boolean | Optional. This option declares the intention to construct a materialized view that isn't refreshed incrementally. Non-incremental materialized views support an expanded range of SQL queries. The `allow_non_incremental_definition` option can't be changed after the materialized view is created. |
| `enableRefresh` | boolean | Optional. Enable automatic refresh of the materialized view when the base table is updated. The default value is "true". |
| `lastRefreshTime` | string (int64) | Output only. The time when this materialized view was last refreshed, in milliseconds since the epoch. |
| `maxStaleness` | string (byte) | \[Optional\] Max staleness of data that could be returned when materizlized view is queried (formatted as Google SQL Interval type). |
| `query` | string | Required. A query whose results are persisted. |
| `refreshIntervalMs` | string (int64) | Optional. The maximum frequency at which this materialized view will be refreshed. The default value is "1800000" (30 minutes). |

### `MaterializedViewStatistics` fields

| Field | Type | Description |
|---|---|---|
| `materializedView` | `array<MaterializedView>` | Materialized views considered for the query job. Only certain materialized views are used. For a detailed list, see the child message. If many materialized views are considered, then the list might be incomplete. |

### `MaterializedViewStatus` fields

| Field | Type | Description |
|---|---|---|
| `lastRefreshStatus` | ErrorProto | Output only. Error result of the last automatic refresh. If present, indicates that the last automatic refresh was unsuccessful. |
| `refreshWatermark` | string (google-datetime) | Output only. Refresh watermark of materialized view. The base tables' data were collected into the materialized view cache until this time. |

### `MetadataCacheStalenessInsight` fields

| Field | Type | Description |
|---|---|---|
| `avgPreviousStalenessMs` | string (google-duration) | Output only. Average column metadata index staleness of previous runs with the same query hash. |
| `stalenessPercentageIncrease` | number (double) | Output only. The percent increase in staleness between the current job and the average staleness of previous jobs with the same query hash. |

### `MetadataCacheStatistics` fields

| Field | Type | Description |
|---|---|---|
| `tableMetadataCacheUsage` | `array<TableMetadataCacheUsage>` | Set for the Metadata caching eligible tables referenced in the query. |

### `MlStatistics` fields

| Field | Type | Description |
|---|---|---|
| `hparamTrials` | `array<HparamTuningTrial>` | Output only. Trials of a hyperparameter tuning job (https://cloud.google.com/bigquery-ml/docs/reference/standard-sql/bigqueryml-syntax-hp-tuning-overview) sorted by trial_id. |
| `iterationResults` | `array<IterationResult>` | Results for all completed iterations. Empty for hyperparameter tuning jobs (https://cloud.google.com/bigquery-ml/docs/reference/standard-sql/bigqueryml-syntax-hp-tuning-overview). |
| `maxIterations` | string (int64) | Output only. Maximum number of iterations specified as max_iterations in the 'CREATE MODEL' query. The actual number of iterations may be less than this number due to early stop. |
| `modelType` | string enum | Output only. The type of the model that is being trained. Values: `MODEL_TYPE_UNSPECIFIED`, `LINEAR_REGRESSION`, `LOGISTIC_REGRESSION`, `KMEANS`, `MATRIX_FACTORIZATION`, `DNN_CLASSIFIER`, `TENSORFLOW`, `DNN_REGRESSOR`, `XGBOOST`, `BOOSTED_TREE_REGRESSOR`, `BOOSTED_TREE_CLASSIFIER`, `ARIMA`, `AUTOML_REGRESSOR`, `AUTOML_CLASSIFIER`, `PCA`, `DNN_LINEAR_COMBINED_CLASSIFIER`, `DNN_LINEAR_COMBINED_REGRESSOR`, `AUTOENCODER`, `ARIMA_PLUS`, `ARIMA_PLUS_XREG`, `RANDOM_FOREST_REGRESSOR`, `RANDOM_FOREST_CLASSIFIER`, `TENSORFLOW_LITE`, `ONNX`, `TRANSFORM_ONLY`, `CONTRIBUTION_ANALYSIS`. |
| `trainingType` | string enum | Output only. Training type of the job. Values: `TRAINING_TYPE_UNSPECIFIED`, `SINGLE_TRAINING`, `HPARAM_TUNING`. |

### `Model` fields

| Field | Type | Description |
|---|---|---|
| `bestTrialId` | string (int64) | The best trial_id across all training runs. Deprecated (`deprecated: true` in the Discovery document; see Notes). |
| `creationTime` | string (int64) | Output only. The time when this model was created, in millisecs since the epoch. |
| `defaultTrialId` | string (int64) | Output only. The default trial_id to use in TVFs when the trial_id is not passed in. For single-objective hyperparameter tuning (https://cloud.google.com/bigquery-ml/docs/reference/standard-sql/bigqueryml-syntax-hp-tuning-overview) models, this is the best trial ID. For multi-objective hyperparameter tuning (https://cloud.google.com/bigquery-ml/docs/reference/standard-sql/bigqueryml-syntax-hp-tuning-overview) models, this is the smallest trial ID among all Pareto optimal trials. |
| `description` | string | Optional. A user-friendly description of this model. |
| `encryptionConfiguration` | EncryptionConfiguration | Custom encryption configuration (e.g., Cloud KMS keys). This shows the encryption configuration of the model data while stored in BigQuery storage. This field can be used with PatchModel to update encryption key for an already encrypted model. |
| `etag` | string | Output only. A hash of this resource. |
| `expirationTime` | string (int64) | Optional. The time when this model expires, in milliseconds since the epoch. If not present, the model will persist indefinitely. Expired models will be deleted and their storage reclaimed. The defaultTableExpirationMs property of the encapsulating dataset can be used to set a default expirationTime on newly created models. |
| `featureColumns` | `array<StandardSqlField>` | Output only. Input feature columns for the model inference. If the model is trained with TRANSFORM clause, these are the input of the TRANSFORM clause. |
| `friendlyName` | string | Optional. A descriptive name for this model. |
| `hparamSearchSpaces` | HparamSearchSpaces | Output only. All hyperparameter search spaces in this model. |
| `hparamTrials` | `array<HparamTuningTrial>` | Output only. Trials of a hyperparameter tuning (https://cloud.google.com/bigquery-ml/docs/reference/standard-sql/bigqueryml-syntax-hp-tuning-overview) model sorted by trial_id. |
| `labelColumns` | `array<StandardSqlField>` | Output only. Label columns that were used to train this model. The output of the model will have a "predicted\_" prefix to these columns. |
| `labels` | `map<string, string>` | The labels associated with this model. You can use these to organize and group your models. Label keys and values can be no longer than 63 characters, can only contain lowercase letters, numeric characters, underscores and dashes. International characters are allowed. Label values are optional. Label keys must start with a letter and each label in the list must have a different key. |
| `lastModifiedTime` | string (int64) | Output only. The time when this model was last modified, in millisecs since the epoch. |
| `location` | string | Output only. The geographic location where the model resides. This value is inherited from the dataset. |
| `modelReference` | ModelReference | Required. Unique identifier for this model. |
| `modelType` | string enum | Output only. Type of the model resource. Values: `MODEL_TYPE_UNSPECIFIED`, `LINEAR_REGRESSION`, `LOGISTIC_REGRESSION`, `KMEANS`, `MATRIX_FACTORIZATION`, `DNN_CLASSIFIER`, `TENSORFLOW`, `DNN_REGRESSOR`, `XGBOOST`, `BOOSTED_TREE_REGRESSOR`, `BOOSTED_TREE_CLASSIFIER`, `ARIMA`, `AUTOML_REGRESSOR`, `AUTOML_CLASSIFIER`, `PCA`, `DNN_LINEAR_COMBINED_CLASSIFIER`, `DNN_LINEAR_COMBINED_REGRESSOR`, `AUTOENCODER`, `ARIMA_PLUS`, `ARIMA_PLUS_XREG`, `RANDOM_FOREST_REGRESSOR`, `RANDOM_FOREST_CLASSIFIER`, `TENSORFLOW_LITE`, `ONNX`, `TRANSFORM_ONLY`, `CONTRIBUTION_ANALYSIS`. |
| `optimalTrialIds` | `array<string (int64)>` | Output only. For single-objective hyperparameter tuning (https://cloud.google.com/bigquery-ml/docs/reference/standard-sql/bigqueryml-syntax-hp-tuning-overview) models, it only contains the best trial. For multi-objective hyperparameter tuning (https://cloud.google.com/bigquery-ml/docs/reference/standard-sql/bigqueryml-syntax-hp-tuning-overview) models, it contains all Pareto optimal trials sorted by trial_id. |
| `remoteModelInfo` | RemoteModelInfo | Output only. Remote model info |
| `trainingRuns` | `array<TrainingRun>` | Information for all training runs in increasing order of start_time. |
| `transformColumns` | `array<TransformColumn>` | Output only. This field will be populated if a TRANSFORM clause was used to train a model. TRANSFORM clause (if used) takes feature_columns as input and outputs transform_columns. transform_columns then are used to train the model. |

### `ModelDefinition` fields

| Field | Type | Description |
|---|---|---|
| `modelOptions` | object | Deprecated. |
| `modelOptions.labels` | `array<string>` | — |
| `modelOptions.lossType` | string | — |
| `modelOptions.modelType` | string | — |
| `trainingRuns` | `array<BqmlTrainingRun>` | Deprecated. |

### `ModelExtractOptions` fields

| Field | Type | Description |
|---|---|---|
| `trialId` | string (int64) | The 1-based ID of the trial to be exported from a hyperparameter tuning model. If not specified, the trial with id = Model (https://cloud.google.com/bigquery/docs/reference/rest/v2/models#resource:-model).defaultTrialId is exported. This field is ignored for models not trained with hyperparameter tuning. |

### `ModelReference` fields

| Field | Type | Description |
|---|---|---|
| `datasetId` | string | Required. The ID of the dataset containing this model. |
| `modelId` | string | Required. The ID of the model. The ID must contain only letters (a-z, A-Z), numbers (0-9), or underscores (\_). The maximum length is 1,024 characters. |
| `projectId` | string | Required. The ID of the project containing this model. |

### `MultiClassClassificationMetrics` fields

| Field | Type | Description |
|---|---|---|
| `aggregateClassificationMetrics` | AggregateClassificationMetrics | Aggregate classification metrics. |
| `confusionMatrixList` | `array<ConfusionMatrix>` | Confusion matrix at different thresholds. |

### `ObjectStorageStats` fields

| Field | Type | Description |
|---|---|---|
| `cacheBytesRead` | string (int64) | Total bytes read from the GCP Lakehouse-internal cache, avoiding an object storage read. |
| `cloudProvider` | string enum | The cloud provider for this block of statistics. Values: `CLOUD_PROVIDER_UNSPECIFIED`, `GCP`, `AWS`, `AZURE`. |
| `objectStorageBytesRead` | string (int64) | Total bytes read directly from the cloud provider's storage. |

### `ParquetOptions` fields

| Field | Type | Description |
|---|---|---|
| `enableListInference` | boolean | Optional. Indicates whether to use schema inference specifically for Parquet LIST logical type. |
| `enumAsString` | boolean | Optional. Indicates whether to infer Parquet ENUM logical type as STRING instead of BYTES by default. |
| `mapTargetType` | string enum | Optional. Indicates how to represent a Parquet map if present. Values: `MAP_TARGET_TYPE_UNSPECIFIED`, `ARRAY_OF_STRUCT`. |

### `PartitionSkew` fields

| Field | Type | Description |
|---|---|---|
| `skewSources` | `array<SkewSource>` | Output only. Source stages which produce skewed data. |

### `PartitionedColumn` fields

| Field | Type | Description |
|---|---|---|
| `field` | string | Required. The name of the partition column. |

### `PartitioningDefinition` fields

| Field | Type | Description |
|---|---|---|
| `partitionedColumn` | `array<PartitionedColumn>` | Optional. Details about each partitioning column. This field is output only for all partitioning types other than metastore partitioned tables. BigQuery native tables only support 1 partitioning column. Other table types may support 0, 1 or more partitioning columns. For metastore partitioned tables, the order must match the definition order in the Hive Metastore, where it must match the physical layout of the table. For example, CREATE TABLE a_table(id BIGINT, name STRING) PARTITIONED BY (city STRING, state STRING). In this case the values must be \['city', 'state'\] in that order. |

### `PerformanceInsights` fields

| Field | Type | Description |
|---|---|---|
| `avgPreviousExecutionMs` | string (int64) | Output only. Average execution ms of previous runs. Indicates the job ran slow compared to previous executions. To find previous executions, use INFORMATION_SCHEMA tables and filter jobs with same query hash. |
| `stagePerformanceChangeInsights` | `array<StagePerformanceChangeInsight>` | Output only. Query stage performance insights compared to previous runs, for diagnosing performance regression. |
| `stagePerformanceStandaloneInsights` | `array<StagePerformanceStandaloneInsight>` | Output only. Standalone query stage performance insights, for exploring potential improvements. |
| `tableChangeInsights` | `array<TableChangeInsight>` | Output only. Performance insights for table-level attributes that changed compared to previous runs. |

### `Policy` fields

| Field | Type | Description |
|---|---|---|
| `auditConfigs` | `array<AuditConfig>` | Specifies cloud audit logging configuration for this policy. |
| `bindings` | `array<Binding>` | Associates a list of `members`, or principals, with a `role`. Optionally, may specify a `condition` that determines how and when the `bindings` are applied. Each of the `bindings` must contain at least one principal. The `bindings` in a `Policy` can refer to up to 1,500 principals; up to 250 of these principals can be Google groups. Each occurrence of a principal counts towards these limits. For example, if the `bindings` grant 50 different roles to `user:alice@example.com`, and not to any other principal, then you can add another 1,450 principals to the `bindings` in the `Policy`. |
| `etag` | string (byte) | `etag` is used for optimistic concurrency control as a way to help prevent simultaneous updates of a policy from overwriting each other. It is strongly suggested that systems make use of the `etag` in the read-modify-write cycle to perform policy updates in order to avoid race conditions: An `etag` is returned in the response to `getIamPolicy`, and systems are expected to put that etag in the request to `setIamPolicy` to ensure that their change will be applied to the same version of the policy. \*\*Important:\*\* If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. |
| `version` | integer (int32) | Specifies the format of the policy. Valid values are `0`, `1`, and `3`. Requests that specify an invalid value are rejected. Any operation that affects conditional role bindings must specify version `3`. This requirement applies to the following operations: \* Getting a policy that includes a conditional role binding \* Adding a conditional role binding to a policy \* Changing a conditional role binding in a policy \* Removing any role binding, with or without a condition, from a policy that includes conditions \*\*Important:\*\* If you use IAM Conditions, you must include the `etag` field whenever you call `setIamPolicy`. If you omit this field, then IAM allows you to overwrite a version `3` policy with a version `1` policy, and all of the conditions in the version `3` policy are lost. If a policy does not include any conditions, operations on that policy may specify any valid version or leave the field unset. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |

### `PrincipalComponentInfo` fields

| Field | Type | Description |
|---|---|---|
| `cumulativeExplainedVarianceRatio` | number (double) | The explained_variance is pre-ordered in the descending order to compute the cumulative explained variance ratio. |
| `explainedVariance` | number (double) | Explained variance by this principal component, which is simply the eigenvalue. |
| `explainedVarianceRatio` | number (double) | Explained_variance over the total explained variance. |
| `principalComponentId` | string (int64) | Id of the principal component. |

### `PrivacyPolicy` fields

| Field | Type | Description |
|---|---|---|
| `aggregationThresholdPolicy` | AggregationThresholdPolicy | Optional. Policy used for aggregation thresholds. Mutually exclusive with `differentialPrivacyPolicy` (proto `oneof privacy_policy`; set at most one; see Notes). |
| `differentialPrivacyPolicy` | DifferentialPrivacyPolicy | Optional. Policy used for differential privacy. Mutually exclusive with `aggregationThresholdPolicy` (proto `oneof privacy_policy`; set at most one; see Notes). |
| `joinRestrictionPolicy` | JoinRestrictionPolicy | Optional. Join restriction policy is outside of the one of policies, since this policy can be set along with other policies. This policy gives data providers the ability to enforce joins on the 'join_allowed_columns' when data is queried from a privacy protected view. |

### `ProjectList` fields

| Field | Type | Description |
|---|---|---|
| `etag` | string | A hash of the page of results. |
| `kind` | string | The resource type of the response. |
| `nextPageToken` | string | Use this token to request the next page of results. |
| `projects` | `array<object>` | Projects to which the user has at least READ access. This field can be omitted if `totalItems` is 0. |
| `projects[].friendlyName` | string | A descriptive name for this project. A wrapper is used here because friendlyName can be set to the empty string. |
| `projects[].id` | string | An opaque ID of this project. |
| `projects[].kind` | string | The resource type. |
| `projects[].numericId` | string (uint64) | The numeric ID of this project. |
| `projects[].projectReference` | ProjectReference | A unique reference to this project. |
| `totalItems` | integer (int32) | The total number of projects in the page. A wrapper is used here because the field should still be in the response when the value is 0. |

### `ProjectReference` fields

| Field | Type | Description |
|---|---|---|
| `projectId` | string | Required. ID of the project. Can be either the numeric ID or the assigned ID of the project. |

### `PropertyGraphReference` fields

| Field | Type | Description |
|---|---|---|
| `datasetId` | string | Required. The ID of the dataset containing this property graph. |
| `projectId` | string | Required. The ID of the project containing this property graph. |
| `propertyGraphId` | string | Required. The ID of the property graph. The ID must contain only letters (a-z, A-Z), numbers (0-9), or underscores (\_). The maximum length is 256 characters. |

### `PruningStats` fields

| Field | Type | Description |
|---|---|---|
| `postCmetaPruningParallelInputCount` | string (int64) | The number of parallel inputs matched. |
| `postCmetaPruningPartitionCount` | string (int64) | The number of partitions matched. |
| `preCmetaPruningParallelInputCount` | string (int64) | The number of parallel inputs scanned. |

### `PythonOptions` fields

| Field | Type | Description |
|---|---|---|
| `entryPoint` | string | Required. The name of the function defined in Python code as the entry point when the Python UDF is invoked. |
| `packages` | `array<string>` | Optional. A list of Python package names along with versions to be installed. Example: \["pandas>=2.1", "google-cloud-translate==3.11"\]. For more information, see Use third-party packages (https://cloud.google.com/bigquery/docs/user-defined-functions-python#third-party-packages). |

### `QueryInfo` fields

| Field | Type | Description |
|---|---|---|
| `optimizationDetails` | `map<string, any>` | Output only. Information about query optimizations. |

### `QueryParameter` fields

| Field | Type | Description |
|---|---|---|
| `name` | string | Optional. If unset, this is a positional parameter. Otherwise, should be unique within a query. |
| `parameterType` | QueryParameterType | Required. The type of this parameter. |
| `parameterValue` | QueryParameterValue | Required. The value of this parameter. |

### `QueryParameterType` fields

| Field | Type | Description |
|---|---|---|
| `arrayType` | QueryParameterType | Optional. The type of the array's elements, if this is an array. |
| `rangeElementType` | QueryParameterType | Optional. The element type of the range, if this is a range. |
| `structTypes` | `array<object>` | Optional. The types of the fields of this struct, in order, if this is a struct. |
| `structTypes[].description` | string | Optional. Human-oriented description of the field. |
| `structTypes[].name` | string | Optional. The name of this field. |
| `structTypes[].type` | QueryParameterType | Required. The type of this field. |
| `timestampPrecision` | string (int64) | Optional. Precision (maximum number of total digits in base 10) for seconds of TIMESTAMP type. Possible values include: \* 6 (Default, for TIMESTAMP type with microsecond precision) \* 12 (For TIMESTAMP type with picosecond precision) |
| `type` | string | Required. The top level type of this field. |

### `QueryParameterValue` fields

| Field | Type | Description |
|---|---|---|
| `arrayValues` | `array<QueryParameterValue>` | Optional. The array values, if this is an array type. |
| `rangeValue` | RangeValue | Optional. The range value, if this is a range type. |
| `structValues` | `map<string, QueryParameterValue>` | The struct field values. |
| `value` | string | Optional. The value of this value, if a simple scalar type. |

### `QueryRequest` fields

| Field | Type | Description |
|---|---|---|
| `arrowSerializationOptions` | ArrowSerializationOptions | Optional. Options specific to the Apache Arrow output format. |
| `connectionProperties` | `array<ConnectionProperty>` | Optional. Connection properties which can modify the query behavior. |
| `continuous` | boolean | \[Optional\] Specifies whether the query should be executed as a continuous query. The default value is false. |
| `createSession` | boolean | Optional. If true, creates a new session using a randomly generated session_id. If false, runs query with an existing session_id passed in ConnectionProperty, otherwise runs query in non-session mode. The session location will be set to QueryRequest.location if it is present, otherwise it's set to the default location based on existing routing logic. |
| `defaultDataset` | DatasetReference | Optional. Specifies the default datasetId and projectId to assume for any unqualified table names in the query. If not set, all table names in the query string must be qualified in the format 'datasetId.tableId'. |
| `destinationEncryptionConfiguration` | EncryptionConfiguration | Optional. Custom encryption configuration (e.g., Cloud KMS keys) |
| `dryRun` | boolean | Optional. If set to true, BigQuery doesn't run the job. Instead, if the query is valid, BigQuery returns statistics about the job such as how many bytes would be processed. If the query is invalid, an error returns. The default value is false. |
| `formatOptions` | DataFormatOptions | Optional. Output format adjustments. |
| `jobCreationMode` | string enum | Optional. If not set, jobs are always required. If set, the query request will follow the behavior described JobCreationMode. Values: `JOB_CREATION_MODE_UNSPECIFIED`, `JOB_CREATION_REQUIRED`, `JOB_CREATION_OPTIONAL`. |
| `jobTimeoutMs` | string (int64) | Optional. Job timeout in milliseconds. If this time limit is exceeded, BigQuery will attempt to stop a longer job, but may not always succeed in canceling it before the job completes. For example, a job that takes more than 60 seconds to complete has a better chance of being stopped than a job that takes 10 seconds to complete. This timeout applies to the query even if a job does not need to be created. |
| `kind` | string | The resource type of the request. |
| `labels` | `map<string, string>` | Optional. The labels associated with this query. Labels can be used to organize and group query jobs. Label keys and values can be no longer than 63 characters, can only contain lowercase letters, numeric characters, underscores and dashes. International characters are allowed. Label keys must start with a letter and each label in the list must have a different key. |
| `location` | string | The geographic location where the job should run. For more information, see how to specify locations (https://cloud.google.com/bigquery/docs/locations#specify_locations). |
| `maxResults` | integer (uint32) | Optional. The maximum number of rows of data to return per page of results. Setting this flag to a small value such as 1000 and then paging through results might improve reliability when the query result set is large. In addition to this limit, responses are also limited to 10 MB. By default, there is no maximum row count, and only the byte limit applies. |
| `maxSlots` | integer (int32) | Optional. A target limit on the rate of slot consumption by this query. If set to a value > 0, BigQuery will attempt to limit the rate of slot consumption by this query to keep it below the configured limit, even if the query is eligible for more slots based on fair scheduling. The unused slots will be available for other jobs and queries to use. Note: This feature is not yet generally available. |
| `maximumBytesBilled` | string (int64) | Optional. Limits the bytes billed for this query. Queries with bytes billed above this limit will fail (without incurring a charge). If unspecified, the project default is used. |
| `parameterMode` | string | GoogleSQL only. Set to POSITIONAL to use positional (?) query parameters or to NAMED to use named (@myparam) query parameters in this query. |
| `preserveNulls` | boolean | This property is deprecated. |
| `query` | string | Required. A query string to execute, using Google Standard SQL or legacy SQL syntax. Example: "SELECT COUNT(f1) FROM myProjectId.myDatasetId.myTableId". |
| `queryParameters` | `array<QueryParameter>` | Query parameters for GoogleSQL queries. |
| `queryResultsFormat` | string enum | Optional. The query results format. If the value is anything other than `STRUCT_ENCODING` or unspecified: \* The schema of the results will be provided in `QueryResponse.arrowSchema` field (the Discovery text names the proto `oneof` group `results_schema`; field name corrected, see Notes). \* The results of the first page will be provided in `QueryResponse.arrowRecordBatch` field (the Discovery text names the proto `oneof` group `results`; field name corrected, see Notes). \* The `QueryResponse.rows` will not be populated. \* The `QueryResponse.schema` for `QueryResponse.rows` will also not be populated since it is the schema of the `QueryResponse.rows`. This feature is not yet available. Values: `QUERY_RESULTS_FORMAT_UNSPECIFIED`, `STRUCT_ENCODING`, `ARROW`. |
| `requestId` | string | Optional. A unique user provided identifier to ensure idempotent behavior for queries. Note that this is different from the job_id. It has the following properties: 1. It is case-sensitive, limited to up to 36 ASCII characters. A UUID is recommended. 2. Read only queries can ignore this token since they are nullipotent by definition. 3. For the purposes of idempotency ensured by the request_id, a request is considered duplicate of another only if they have the same request_id and are actually duplicates. When determining whether a request is a duplicate of another request, all parameters in the request that may affect the result are considered. For example, query, connection_properties, query_parameters, use_legacy_sql are parameters that affect the result and are considered when determining whether a request is a duplicate, but properties like timeout_ms don't affect the result and are thus not considered. Dry run query requests are never considered duplicate of another request. 4. When a duplicate mutating query request is detected, it returns: a. the results of the mutation if it completes successfully within the timeout. b. the running operation if it is still in progress at the end of the timeout. 5. Its lifetime is limited to 15 minutes. In other words, if two requests are sent with the same request_id, but more than 15 minutes apart, idempotency is not guaranteed. |
| `reservation` | string | Optional. The reservation that jobs.query request would use. User can specify a reservation to execute the job.query. The expected format is `projects/{project}/locations/{location}/reservations/{reservation}`. Forces the query to use on-demand billing when set to `none`. This requires the project or organization to have `reservation_override_mode` set to `ALLOW_ANY_OVERRIDE`. |
| `secureContext` | SecureContext | Optional. A set of key-value pairs representing the secure context. This can be used to pass sensitive or context-specific information. They can be retrieved via the SECURE_CONTEXT() function and used to modify the run-time behavior of a query. |
| `timeoutMs` | integer (uint32) | Optional. Optional: Specifies the maximum amount of time, in milliseconds, that the client is willing to wait for the query to complete. By default, this limit is 10 seconds (10,000 milliseconds). If the query is complete, the jobComplete field in the response is true. If the query has not yet completed, jobComplete is false. You can request a longer timeout period in the timeoutMs field. However, the call is not guaranteed to wait for the specified timeout; it typically returns after around 200 seconds (200,000 milliseconds), even if the query is not complete. If jobComplete is false, you can continue to wait for the query to complete by calling the getQueryResults method until the jobComplete field in the getQueryResults response is true. |
| `useLegacySql` | boolean | Specifies whether to use BigQuery's legacy SQL dialect for this query. The default value is true. If set to false, the query uses BigQuery's GoogleSQL (https://docs.cloud.google.com/bigquery/docs/introduction-sql). (A sentence about `flattenResults`, which is not a field of `QueryRequest`, is left out; see Notes.) |
| `useQueryCache` | boolean | Optional. Whether to look for the result in the query cache. The query cache is a best-effort cache that will be flushed whenever tables in the query are modified. The default value is true. |
| `writeIncrementalResults` | boolean | Optional. This is only supported for SELECT query. If set, the query is allowed to write results incrementally to the temporary result table. This may incur a performance penalty. This option cannot be used with Legacy SQL. This feature is not yet available. |

### `QueryResponse` fields

| Field | Type | Description |
|---|---|---|
| `arrowRecordBatch` | ArrowRecordBatch | Output only. Serialized row data in Arrow RecordBatch format. |
| `arrowSchema` | ArrowSchema | Output only. Arrow schema |
| `cacheHit` | boolean | Whether the query result was fetched from the query cache. |
| `creationTime` | string (int64) | Output only. Creation time of this query, in milliseconds since the epoch. This field will be present on all queries. |
| `dmlStats` | DmlStatistics | Output only. Detailed statistics for DML statements INSERT, UPDATE, DELETE, MERGE or TRUNCATE. |
| `endTime` | string (int64) | Output only. End time of this query, in milliseconds since the epoch. This field will be present whenever a query job is in the DONE state. |
| `errors` | `array<ErrorProto>` | Output only. The first errors or warnings encountered during the running of the job. The final message includes the number of errors that caused the process to stop. Errors here do not necessarily mean that the job has completed or was unsuccessful. For more information about error messages, see Error messages (https://cloud.google.com/bigquery/docs/error-messages). |
| `jobComplete` | boolean | Whether the query has completed or not. If rows or totalRows are present, this will always be true. If this is false, totalRows will not be available. |
| `jobCreationReason` | JobCreationReason | Optional. The reason why a Job was created. Only relevant when a job_reference is present in the response. If job_reference is not present it will always be unset. |
| `jobReference` | JobReference | Reference to the Job that was created to run the query. This field will be present even if the original request timed out, in which case GetQueryResults can be used to read the results once the query has completed. Since this API only returns the first page of results, subsequent pages can be fetched via the same mechanism (GetQueryResults). If job_creation_mode was set to `JOB_CREATION_OPTIONAL` and the query completes without creating a job, this field will be empty. |
| `kind` | string | The resource type. |
| `location` | string | Output only. The geographic location of the query. For more information about BigQuery locations, see: https://cloud.google.com/bigquery/docs/locations |
| `numDmlAffectedRows` | string (int64) | Output only. The number of rows affected by a DML statement. Present only for DML statements INSERT, UPDATE or DELETE. |
| `pageRowCount` | string (int64) | Output only. The number of rows out of `total_rows` returned in this response. This feature is not yet available. |
| `pageToken` | string | A token used for paging results. A non-empty token indicates that additional results are available. To see additional results, query the `jobs.getQueryResults` (https://cloud.google.com/bigquery/docs/reference/rest/v2/jobs/getQueryResults) method. For more information, see Paging through table data (https://cloud.google.com/bigquery/docs/paging-results). |
| `queryId` | string | Auto-generated ID for the query. |
| `rows` | `array<TableRow>` | An object with as many results as can be contained within the maximum permitted reply size. To get any additional rows, you can call GetQueryResults and specify the jobReference returned above. |
| `schema` | TableSchema | The schema of the results. Present only when the query completes successfully. |
| `sessionInfo` | SessionInfo | Output only. Information of the session if this job is part of one. |
| `startTime` | string (int64) | Output only. Start time of this query, in milliseconds since the epoch. This field will be present when the query job transitions from the PENDING state to either RUNNING or DONE. |
| `statementType` | string | Output only. The type of query statement, if valid. Possible values: \* `SELECT`: `SELECT` (https://cloud.google.com/bigquery/docs/reference/standard-sql/query-syntax#select_list) statement. \* `ASSERT`: `ASSERT` (https://cloud.google.com/bigquery/docs/reference/standard-sql/debugging-statements#assert) statement. \* `INSERT`: `INSERT` (https://cloud.google.com/bigquery/docs/reference/standard-sql/dml-syntax#insert_statement) statement. \* `UPDATE`: `UPDATE` (https://cloud.google.com/bigquery/docs/reference/standard-sql/dml-syntax#update_statement) statement. \* `DELETE`: `DELETE` (https://cloud.google.com/bigquery/docs/reference/standard-sql/data-manipulation-language) statement. \* `MERGE`: `MERGE` (https://cloud.google.com/bigquery/docs/reference/standard-sql/data-manipulation-language) statement. \* `TRUNCATE_TABLE`: `TRUNCATE TABLE` (https://cloud.google.com/bigquery/docs/reference/standard-sql/dml-syntax#truncate_table_statement) statement. \* `CREATE_TABLE`: `CREATE TABLE` (https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#create_table_statement) statement, without `AS SELECT`. \* `CREATE_TABLE_AS_SELECT`: `CREATE TABLE AS SELECT` (https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#create_table_statement) statement. \* `CREATE_VIEW`: `CREATE VIEW` (https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#create_view_statement) statement. \* `CREATE_MODEL`: `CREATE MODEL` (https://cloud.google.com/bigquery-ml/docs/reference/standard-sql/bigqueryml-syntax-create#create_model_statement) statement. \* `CREATE_MATERIALIZED_VIEW`: `CREATE MATERIALIZED VIEW` (https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#create_materialized_view_statement) statement. \* `CREATE_FUNCTION`: `CREATE FUNCTION` (https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#create_function_statement) statement. \* `CREATE_TABLE_FUNCTION`: `CREATE TABLE FUNCTION` (https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#create_table_function_statement) statement. \* `CREATE_PROCEDURE`: `CREATE PROCEDURE` (https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#create_procedure) statement. \* `CREATE_ROW_ACCESS_POLICY`: `CREATE ROW ACCESS POLICY` (https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#create_row_access_policy_statement) statement. \* `CREATE_SCHEMA`: `CREATE SCHEMA` (https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#create_schema_statement) statement. \* `CREATE_EXTERNAL_SCHEMA`: `CREATE EXTERNAL SCHEMA` (https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#create_external_schema_statement) statement. \* `CREATE_EXTERNAL_TABLE`: `CREATE EXTERNAL TABLE` (https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#create_external_table_statement) statement. \* `CREATE_SNAPSHOT_TABLE`: `CREATE SNAPSHOT TABLE` (https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#create_snapshot_table_statement) statement. \* `CREATE_SEARCH_INDEX`: `CREATE SEARCH INDEX` (https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#create_search_index_statement) statement. \* `CREATE_VECTOR_INDEX`: `CREATE VECTOR INDEX` (https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#create_vector_index_statement) statement. \* `CREATE_CONNECTION`: `CREATE CONNECTION` (https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#create_connection_statement) statement. \* `CREATE_DATA_POLICY`: `CREATE DATA_POLICY` (https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#create_data_policy_statement) statement. \* `CREATE_PROPERTY_GRAPH`: `CREATE PROPERTY GRAPH` (https://cloud.google.com/bigquery/docs/reference/standard-sql/graph-schema-statements#gql_create_graph) statement. \* `CREATE_CAPACITY`: `CREATE CAPACITY` (https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#create_capacity_statement) statement. \* `CREATE_RESERVATION`: `CREATE RESERVATION` (https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#create_reservation_statement) statement. \* `CREATE_ASSIGNMENT`: `CREATE ASSIGNMENT` (https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#create_assignment_statement) statement. \* `DROP_TABLE`: `DROP TABLE` (https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#drop_table_statement) statement. \* `DROP_EXTERNAL_TABLE`: `DROP EXTERNAL TABLE` (https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#drop_external_table_statement) statement. \* `DROP_VIEW`: `DROP VIEW` (https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#drop_view_statement) statement. \* `DROP_MODEL`: `DROP MODEL` (https://cloud.google.com/bigquery-ml/docs/reference/standard-sql/bigqueryml-syntax-drop-model) statement. \* `DROP_MATERIALIZED_VIEW`: `DROP MATERIALIZED VIEW` (https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#drop_materialized_view_statement) statement. \* `DROP_FUNCTION`: `DROP FUNCTION` (https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#drop_function_statement) statement. \* `DROP_TABLE_FUNCTION`: `DROP TABLE FUNCTION` (https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#drop_table_function) statement. \* `DROP_PROCEDURE`: `DROP PROCEDURE` (https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#drop_procedure_statement) statement. \* `DROP_SEARCH_INDEX`: `DROP SEARCH INDEX` (https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#drop_search_index) statement. \* `DROP_VECTOR_INDEX`: `DROP VECTOR INDEX` (https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#drop_vector_index) statement. \* `DROP_SCHEMA`: `DROP SCHEMA` (https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#drop_schema_statement) statement. \* `UNDROP_SCHEMA`: `UNDROP SCHEMA` (https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#undrop_schema_statement) statement. \* `DROP_SNAPSHOT_TABLE`: `DROP SNAPSHOT TABLE` (https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#drop_snapshot_table_statement) statement. \* `DROP_ROW_ACCESS_POLICY`: \[`DROP [ALL] ROW ACCESS POLICY\|POLICIES`\](https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#drop_row_access_policy_statement) statement. \* `DROP_CONNECTION`: `DROP CONNECTION` (https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#drop_connection_statement) statement. \* `DROP_DATA_POLICY`: `DROP DATA_POLICY` (https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#drop_data_policy) statement. \* `DROP_PROPERTY_GRAPH`: `DROP PROPERTY GRAPH` (https://cloud.google.com/bigquery/docs/reference/standard-sql/graph-schema-statements#gql_drop_graph) statement. \* `DROP_CAPACITY`: `DROP CAPACITY` (https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#drop_capacity_statement) statement. \* `DROP_RESERVATION`: `DROP RESERVATION` (https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#drop_reservation_statement) statement. \* `DROP_ASSIGNMENT`: `DROP ASSIGNMENT` (https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#drop_assignment_statement) statement. \* `ALTER_TABLE`: `ALTER TABLE` (https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#alter_table_set_options_statement) statement. \* `ALTER_VIEW`: `ALTER VIEW` (https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#alter_view_set_options_statement) statement. \* `ALTER_MATERIALIZED_VIEW`: `ALTER MATERIALIZED VIEW` (https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#alter_materialized_view_set_options_statement) statement. \* `ALTER_SCHEMA`: `ALTER SCHEMA` (https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#alter_schema_set_options_statement) statement. \* `ALTER_MODEL`: `ALTER MODEL` (https://cloud.google.com/bigquery-ml/docs/reference/standard-sql/bigqueryml-syntax-alter-model) statement. \* `ALTER_SEARCH_INDEX`: `ALTER SEARCH INDEX` (https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#alter_search_index_statement) statement. \* `ALTER_VECTOR_INDEX`: `ALTER VECTOR INDEX` (https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#alter_vector_index_rebuild_statement) statement. \* `ALTER_CONNECTION`: `ALTER CONNECTION` (https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#alter_connection_set_options_statement) statement. \* `ALTER_DATA_POLICY`: `ALTER DATA_POLICY` (https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#alter_data_policy_statement) statement. \* `ALTER_PROJECT`: `ALTER PROJECT` (https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#alter_project_set_options_statement) statement. \* `ALTER_ORGANIZATION`: `ALTER ORGANIZATION` (https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#alter_organization_set_options_statement) statement. \* `ALTER_BI_CAPACITY`: `ALTER BI_CAPACITY` (https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#alter_bi_capacity_set_options_statement) statement. \* `ALTER_CAPACITY`: `ALTER CAPACITY` (https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#alter_capacity_set_options_statement) statement. \* `ALTER_RESERVATION`: `ALTER RESERVATION` (https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#alter_reservation_set_options_statement) statement. \* `SCRIPT`: `SCRIPT` (https://cloud.google.com/bigquery/docs/reference/standard-sql/procedural-language) statement. \* `CALL`: `CALL` (https://cloud.google.com/bigquery/docs/reference/standard-sql/procedural-language#call) statement. \* `BEGIN_TRANSACTION`: `BEGIN TRANSACTION` (https://cloud.google.com/bigquery/docs/reference/standard-sql/procedural-language#begin_transaction) statement. \* `COMMIT_TRANSACTION`: `COMMIT TRANSACTION` (https://cloud.google.com/bigquery/docs/reference/standard-sql/procedural-language#commit_transaction) statement. \* `ROLLBACK_TRANSACTION`: `ROLLBACK TRANSACTION` (https://cloud.google.com/bigquery/docs/reference/standard-sql/procedural-language#rollback_transaction) statement. \* `EXPORT_DATA`: `EXPORT DATA` (https://cloud.google.com/bigquery/docs/reference/standard-sql/export-statements#export_data_statement) statement. \* `EXPORT_MODEL`: `EXPORT MODEL` (https://cloud.google.com/bigquery-ml/docs/reference/standard-sql/bigqueryml-syntax-export-model) statement. \* `EXPORT_METADATA`: `EXPORT TABLE METADATA` (https://cloud.google.com/bigquery/docs/biglake-iceberg-tables-in-bigquery) statement, for BigLake Iceberg tables. \* `LOAD_DATA`: `LOAD DATA` (https://cloud.google.com/bigquery/docs/reference/standard-sql/load-statements#load_data_statement) statement. \* `GRANT_ON_SCHEMA`: `GRANT ... ON SCHEMA` (https://cloud.google.com/bigquery/docs/reference/standard-sql/data-control-language#grant_statement) statement. \* `GRANT_ON_TABLE`: `GRANT ... ON TABLE` (https://cloud.google.com/bigquery/docs/reference/standard-sql/data-control-language#grant_statement) statement. Also used for `GRANT ... ON EXTERNAL TABLE`. \* `GRANT_ON_VIEW`: `GRANT ... ON VIEW` (https://cloud.google.com/bigquery/docs/reference/standard-sql/data-control-language#grant_statement) statement. \* `GRANT_ON_PROJECT`: `GRANT ... ON PROJECT` (https://cloud.google.com/bigquery/docs/reference/standard-sql/data-control-language#grant_statement) statement. \* `REVOKE_ON_SCHEMA`: `REVOKE ... ON SCHEMA` (https://cloud.google.com/bigquery/docs/reference/standard-sql/data-control-language#revoke_statement) statement. \* `REVOKE_ON_TABLE`: `REVOKE ... ON TABLE` (https://cloud.google.com/bigquery/docs/reference/standard-sql/data-control-language#revoke_statement) statement. Also used for `REVOKE ... ON EXTERNAL TABLE`. \* `REVOKE_ON_VIEW`: `REVOKE ... ON VIEW` (https://cloud.google.com/bigquery/docs/reference/standard-sql/data-control-language#revoke_statement) statement. \* `REVOKE_ON_PROJECT`: `REVOKE ... ON PROJECT` (https://cloud.google.com/bigquery/docs/reference/standard-sql/data-control-language#revoke_statement) statement. |
| `totalBytesBilled` | string (int64) | Output only. If the project is configured to use on-demand pricing, then this field contains the total bytes billed for the job. If the project is configured to use flat-rate pricing, then you are not billed for bytes and this field is informational only. |
| `totalBytesProcessed` | string (int64) | The total number of bytes processed for this query. If this query was a dry run, this is the number of bytes that would be processed if the query were run. |
| `totalRows` | string (uint64) | The total number of rows in the complete query result set, which can be more than the number of rows in this single page of results. |
| `totalSlotMs` | string (int64) | Output only. Number of slot ms the user is actually billed for. |

### `QueryTimelineSample` fields

| Field | Type | Description |
|---|---|---|
| `activeUnits` | string (int64) | Total number of active workers. This does not correspond directly to slot usage. This is the largest value observed since the last sample. |
| `completedUnits` | string (int64) | Total parallel units of work completed by this query. |
| `elapsedMs` | string (int64) | Milliseconds elapsed since the start of query execution. |
| `estimatedRunnableUnits` | string (int64) | Units of work that can be scheduled immediately. Providing additional slots for these units of work will accelerate the query, if no other query in the reservation needs additional slots. |
| `pendingUnits` | string (int64) | Total units of work remaining for the query. This number can be revised (increased or decreased) while the query is running. |
| `shuffleRamUsageRatio` | number (double) | Total shuffle usage ratio in shuffle RAM per reservation of this query. This will be provided for reservation customers only. |
| `totalSlotMs` | string (int64) | Cumulative slot-ms consumed by the query. |

### `RangePartitioning` fields

| Field | Type | Description |
|---|---|---|
| `field` | string | Required. The name of the column to partition the table on. It must be a top-level, INT64 column whose mode is NULLABLE or REQUIRED. |
| `range` | object | \[Experimental\] Defines the ranges for range partitioning. |
| `range.end` | string (int64) | \[Experimental\] The end of range partitioning, exclusive. |
| `range.interval` | string (int64) | \[Experimental\] The width of each interval. |
| `range.start` | string (int64) | \[Experimental\] The start of range partitioning, inclusive. |

### `RangeValue` fields

| Field | Type | Description |
|---|---|---|
| `end` | QueryParameterValue | Optional. The end value of the range. A missing value represents an unbounded end. |
| `start` | QueryParameterValue | Optional. The start value of the range. A missing value represents an unbounded start. |

### `RankingMetrics` fields

| Field | Type | Description |
|---|---|---|
| `averageRank` | number (double) | Determines the goodness of a ranking by computing the percentile rank from the predicted confidence and dividing it by the original rank. |
| `meanAveragePrecision` | number (double) | Calculates a precision per user for all the items by ranking them and then averages all the precisions across all the users. |
| `meanSquaredError` | number (double) | Similar to the mean squared error computed in regression and explicit recommendation models except instead of computing the rating directly, the output from evaluate is computed against a preference which is 1 or 0 depending on if the rating exists or not. |
| `normalizedDiscountedCumulativeGain` | number (double) | A metric to determine the goodness of a ranking calculated from the predicted confidence by comparing it to an ideal rank measured by the original ratings. |

### `RegressionMetrics` fields

| Field | Type | Description |
|---|---|---|
| `meanAbsoluteError` | number (double) | Mean absolute error. |
| `meanSquaredError` | number (double) | Mean squared error. |
| `meanSquaredLogError` | number (double) | Mean squared log error. |
| `medianAbsoluteError` | number (double) | Median absolute error. |
| `rSquared` | number (double) | R^2 score. This corresponds to r2_score in ML.EVALUATE. |

### `RemoteFunctionOptions` fields

| Field | Type | Description |
|---|---|---|
| `connection` | string | Fully qualified name of the user-provided connection object which holds the authentication information to send requests to the remote service. Format: "projects/{projectId}/locations/{locationId}/connections/{connectionId}" |
| `endpoint` | string | Endpoint of the user-provided remote service, e.g. https://us-east1-my-gcf-project.cloudfunctions.net/remote_add (project ID in the example corrected; see Notes) |
| `maxBatchingRows` | string (int64) | Max number of rows in each batch sent to the remote service. If absent or if 0, BigQuery dynamically decides the number of rows in a batch. |
| `userDefinedContext` | `map<string, string>` | User-defined context as a set of key/value pairs, which will be sent as function invocation context together with batched arguments in the requests to the remote service. The total number of bytes of keys and values must be less than 8KB. |

### `RemoteModelInfo` fields

| Field | Type | Description |
|---|---|---|
| `connection` | string | Output only. Fully qualified name of the user-provided connection object of the remote model. Format: "projects/{project_id}/locations/{location_id}/connections/{connection_id}" |
| `endpoint` | string | Output only. The endpoint for remote model. Mutually exclusive with `remoteServiceType` (proto `oneof remote_service`; set at most one; see Notes). |
| `maxBatchingRows` | string (int64) | Output only. Max number of rows in each batch sent to the remote service. If unset, the number of rows in each batch is set dynamically. |
| `remoteModelVersion` | string | Output only. The model version for LLM. |
| `remoteServiceType` | string enum | Output only. The remote service type for remote model. Mutually exclusive with `endpoint` (proto `oneof remote_service`; set at most one; see Notes). Values: `REMOTE_SERVICE_TYPE_UNSPECIFIED`, `CLOUD_AI_TRANSLATE_V3`, `CLOUD_AI_VISION_V1`, `CLOUD_AI_NATURAL_LANGUAGE_V1`, `CLOUD_AI_SPEECH_TO_TEXT_V2`. |
| `speechRecognizer` | string | Output only. The name of the speech recognizer to use for speech recognition. The expected format is `projects/{project}/locations/{location}/recognizers/{recognizer}`. Customers can specify this field at model creation. If not specified, a default recognizer `projects/{model project}/locations/global/recognizers/_` will be used. See more details at recognizers (https://cloud.google.com/speech-to-text/v2/docs/reference/rest/v2/projects.locations.recognizers) |

### `RestrictionConfig` fields

| Field | Type | Description |
|---|---|---|
| `type` | string enum | Output only. Specifies the type of dataset/table restriction. Values: `RESTRICTION_TYPE_UNSPECIFIED`, `RESTRICTED_DATA_EGRESS`. |

### `Routine` fields

| Field | Type | Description |
|---|---|---|
| `arguments` | `array<Argument>` | Optional. |
| `buildStatus` | RoutineBuildStatus | Output only. The build status of the routine. This field is only applicable to Python UDFs. Preview (https://cloud.google.com/products/#product-launch-stages) |
| `creationTime` | string (int64) | Output only. The time when this routine was created, in milliseconds since the epoch. |
| `dataGovernanceType` | string enum | Optional. If set to `DATA_MASKING`, the function is validated and made available as a masking function. For more information, see Create custom masking routines (https://cloud.google.com/bigquery/docs/user-defined-functions#custom-mask). Values: `DATA_GOVERNANCE_TYPE_UNSPECIFIED`, `DATA_MASKING`. |
| `definitionBody` | string | Required. The body of the routine. For functions, this is the expression in the AS clause. If `language = "SQL"`, it is the substring inside (but excluding) the parentheses. For example, for the function created with the following statement: `CREATE FUNCTION JoinLines(x string, y string) as (concat(x, "\n", y))` The definition_body is `concat(x, "\n", y)` (\n is not replaced with linebreak). If `language="JAVASCRIPT"`, it is the evaluated string in the AS clause. For example, for the function created with the following statement: `CREATE FUNCTION f() RETURNS STRING LANGUAGE js AS 'return "\n";\n'` The definition_body is `return "\n";\n` Note that both \n are replaced with linebreaks. If `definition_body` references another routine, then that routine must be fully qualified with its project ID. |
| `description` | string | Optional. The description of the routine, if defined. |
| `determinismLevel` | string enum | Optional. The determinism level of the JavaScript UDF, if defined. Values: `DETERMINISM_LEVEL_UNSPECIFIED`, `DETERMINISTIC`, `NOT_DETERMINISTIC`. |
| `etag` | string | Output only. A hash of this resource. |
| `externalRuntimeOptions` | ExternalRuntimeOptions | Optional. Options for the runtime of the external system executing the routine. This field is only applicable for Python UDFs. Preview (https://cloud.google.com/products/#product-launch-stages) |
| `importedLibraries` | `array<string>` | Optional. If language = "JAVASCRIPT", this field stores the path of the imported JAVASCRIPT libraries. |
| `language` | string enum | Optional. Defaults to "SQL" if remote_function_options field is absent, not set otherwise. Values: `LANGUAGE_UNSPECIFIED`, `SQL`, `JAVASCRIPT`, `PYTHON`, `JAVA`, `SCALA`. |
| `lastModifiedTime` | string (int64) | Output only. The time when this routine was last modified, in milliseconds since the epoch. |
| `pythonOptions` | PythonOptions | Optional. Options for the Python UDF. Preview (https://cloud.google.com/products/#product-launch-stages) |
| `remoteFunctionOptions` | RemoteFunctionOptions | Optional. Remote function specific options. |
| `returnTableType` | StandardSqlTableType | Optional. Can be set only if routine_type = "TABLE_VALUED_FUNCTION". If absent, the return table type is inferred from definition_body at query time in each query that references this routine. If present, then the columns in the evaluated table result will be cast to match the column types specified in return table type, at query time. |
| `returnType` | StandardSqlDataType | Optional if language = "SQL"; required otherwise. Cannot be set if routine_type = "TABLE_VALUED_FUNCTION". If absent, the return type is inferred from definition_body at query time in each query that references this routine. If present, then the evaluated result will be cast to the specified returned type at query time. For example, for the functions created with the following statements: \* `CREATE FUNCTION Add(x FLOAT64, y FLOAT64) RETURNS FLOAT64 AS (x + y);` \* `CREATE FUNCTION Increment(x FLOAT64) AS (Add(x, 1));` \* `CREATE FUNCTION Decrement(x FLOAT64) RETURNS FLOAT64 AS (Add(x, -1));` The return_type is `{type_kind: "FLOAT64"}` for `Add` and `Decrement`, and is absent for `Increment` (inferred as FLOAT64 at query time). Suppose the function `Add` is replaced by `CREATE OR REPLACE FUNCTION Add(x INT64, y INT64) AS (x + y);` Then the inferred return type of `Increment` is automatically changed to INT64 at query time, while the return type of `Decrement` remains FLOAT64. |
| `routineReference` | RoutineReference | Required. Reference describing the ID of this routine. |
| `routineType` | string enum | Required. The type of routine. Values: `ROUTINE_TYPE_UNSPECIFIED`, `SCALAR_FUNCTION`, `PROCEDURE`, `TABLE_VALUED_FUNCTION`, `AGGREGATE_FUNCTION`. |
| `securityMode` | string enum | Optional. The security mode of the routine, if defined. If not defined, the security mode is automatically determined from the routine's configuration. Values: `SECURITY_MODE_UNSPECIFIED`, `DEFINER`, `INVOKER`. |
| `sparkOptions` | SparkOptions | Optional. Spark specific options. |
| `strictMode` | boolean | Optional. Use this option to catch many common errors. Error checking is not exhaustive, and successfully creating a procedure doesn't guarantee that the procedure will successfully execute at runtime. If `strictMode` is set to `TRUE`, the procedure body is further checked for errors such as non-existent tables or columns. The `CREATE PROCEDURE` statement fails if the body fails any of these checks. If `strictMode` is set to `FALSE`, the procedure body is checked only for syntax. For procedures that invoke themselves recursively, specify `strictMode=FALSE` to avoid non-existent procedure errors during validation. Default value is `TRUE`. |

### `RoutineBuildStatus` fields

| Field | Type | Description |
|---|---|---|
| `buildDuration` | string (google-duration) | Output only. The time taken for the image build. Populated only after the build succeeds or fails. |
| `buildState` | string enum | Output only. The current build state of the routine. Values: `BUILD_STATE_UNSPECIFIED`, `IN_PROGRESS`, `SUCCEEDED`, `FAILED`. |
| `buildStateUpdateTime` | string (google-datetime) | Output only. The time when the build state was updated last. |
| `errorResult` | ErrorProto | Output only. A result object that will be present only if the build has failed. |
| `imageSizeBytes` | string (int64) | Output only. The size of the image in bytes. Populated only after the build succeeds. |

### `RoutineReference` fields

| Field | Type | Description |
|---|---|---|
| `datasetId` | string | Required. The ID of the dataset containing this routine. |
| `projectId` | string | Required. The ID of the project containing this routine. |
| `routineId` | string | Required. The ID of the routine. The ID must contain only letters (a-z, A-Z), numbers (0-9), or underscores (\_). The maximum length is 256 characters. |

### `Row` fields

| Field | Type | Description |
|---|---|---|
| `actualLabel` | string | The original label of this row. |
| `entries` | `array<Entry>` | Info describing predicted label distribution. |

### `RowAccessPolicy` fields

| Field | Type | Description |
|---|---|---|
| `creationTime` | string (google-datetime) | Output only. The time when this row access policy was created, as an RFC 3339 timestamp string (the `google-datetime` format; corrected, see Notes). |
| `etag` | string | Output only. A hash of this resource. |
| `filterPredicate` | string | Required. A SQL boolean expression that represents the rows defined by this row access policy, similar to the boolean expression in a WHERE clause of a SELECT query on a table. References to other tables, routines, and temporary functions are not supported (the documented restriction of the REST resource; to create a policy whose filter uses a subquery on a lookup table, use the GoogleSQL `CREATE ROW ACCESS POLICY` statement instead; see Notes). Examples: region="EU" date_field = CAST('2019-9-27' as DATE) nullable_field is not NULL numeric_field BETWEEN 1.0 AND 5.0 |
| `grantees` | `array<string>` | Optional. Input only. The optional list of iam_member users or groups that specifies the initial members that the row-level access policy should be created with. grantees types: - "user:alice@example.com": An email address that represents a specific Google account. - "serviceAccount:my-other-app@appspot.gserviceaccount.com": An email address that represents a service account. - "group:admins@example.com": An email address that represents a Google group. - "domain:example.com":The Google Workspace domain (primary) that represents all the users of that domain. - "allAuthenticatedUsers": A special identifier that represents all service accounts and all users on the internet who have authenticated with a Google Account. This identifier includes accounts that aren't connected to a Google Workspace or Cloud Identity domain, such as personal Gmail accounts. Users who aren't authenticated, such as anonymous visitors, aren't included. - "allUsers":A special identifier that represents anyone who is on the internet, including authenticated and unauthenticated users. Because BigQuery requires authentication before a user can access the service, allUsers includes only authenticated users. |
| `lastModifiedTime` | string (google-datetime) | Output only. The time when this row access policy was last modified, as an RFC 3339 timestamp string (the `google-datetime` format; corrected, see Notes). |
| `rowAccessPolicyReference` | RowAccessPolicyReference | Required. Reference describing the ID of this row access policy. |

### `RowAccessPolicyReference` fields

| Field | Type | Description |
|---|---|---|
| `datasetId` | string | Required. The ID of the dataset containing this row access policy. |
| `policyId` | string | Required. The ID of the row access policy. The ID must contain only letters (a-z, A-Z), numbers (0-9), or underscores (\_). The maximum length is 256 characters. |
| `projectId` | string | Required. The ID of the project containing this row access policy. |
| `tableId` | string | Required. The ID of the table containing this row access policy. |

### `RowLevelSecurityStatistics` fields

| Field | Type | Description |
|---|---|---|
| `rowLevelSecurityApplied` | boolean | Whether any accessed data was protected by row access policies. |

### `ScriptOptions` fields

| Field | Type | Description |
|---|---|---|
| `keyResultStatement` | string enum | Determines which statement in the script represents the "key result", used to populate the schema and query results of the script job. Default is LAST. Values: `KEY_RESULT_STATEMENT_KIND_UNSPECIFIED`, `LAST`, `FIRST_SELECT`. |
| `statementByteBudget` | string (int64) | Limit on the number of bytes billed per statement. Exceeding this budget results in an error. |
| `statementTimeoutMs` | string (int64) | Timeout period for each statement in a script. |

### `ScriptStackFrame` fields

| Field | Type | Description |
|---|---|---|
| `endColumn` | integer (int32) | Output only. One-based end column. |
| `endLine` | integer (int32) | Output only. One-based end line. |
| `procedureId` | string | Output only. Name of the active procedure, empty if in a top-level script. |
| `startColumn` | integer (int32) | Output only. One-based start column. |
| `startLine` | integer (int32) | Output only. One-based start line. |
| `text` | string | Output only. Text of the current statement/expression. |

### `ScriptStatistics` fields

| Field | Type | Description |
|---|---|---|
| `evaluationKind` | string enum | Whether this child job was a statement or expression. Values: `EVALUATION_KIND_UNSPECIFIED`, `STATEMENT`, `EXPRESSION`. |
| `stackFrames` | `array<ScriptStackFrame>` | Stack trace showing the line/column/procedure name of each frame on the stack at the point where the current evaluation happened. The leaf frame is first, the primary script is last. Never empty. |

### `SearchStatistics` fields

| Field | Type | Description |
|---|---|---|
| `indexPruningStats` | `array<IndexPruningStats>` | Search index pruning statistics, one for each base table that has a search index. If a base table does not have a search index or the index does not help with pruning on the base table, then there is no pruning statistics for that table. |
| `indexUnusedReasons` | `array<IndexUnusedReason>` | When `indexUsageMode` is `UNUSED` or `PARTIALLY_USED`, this field explains why indexes were not used in all or part of the search query. If `indexUsageMode` is `FULLY_USED`, this field is not populated. |
| `indexUsageMode` | string enum | Specifies the index usage mode for the query. Values: `INDEX_USAGE_MODE_UNSPECIFIED`, `UNUSED`, `PARTIALLY_USED`, `FULLY_USED`. |

### `SecureContext` fields

| Field | Type | Description |
|---|---|---|
| `secureParameterEntries` | `map<string, any>` | Optional. A set of key-value pairs representing the secure parameter values. They can be retrieved via the SECURE_CONTEXT() function and used to modify the run-time behavior of a query. |

### `SerDeInfo` fields

| Field | Type | Description |
|---|---|---|
| `name` | string | Optional. Name of the SerDe. The maximum length is 256 characters. |
| `parameters` | `map<string, string>` | Optional. Key-value pairs that define the initialization parameters for the serialization library. Maximum size 10 Kib. |
| `serializationLibrary` | string | Required. Specifies a fully-qualified class name of the serialization library that is responsible for the translation of data between table representation and the underlying low-level input and output format structures. The maximum length is 256 characters. |

### `SessionInfo` fields

| Field | Type | Description |
|---|---|---|
| `sessionId` | string | Output only. The id of the session. |

### `SetIamPolicyRequest` fields

| Field | Type | Description |
|---|---|---|
| `policy` | Policy | REQUIRED: The complete policy to be applied to the `resource`. The size of the policy is limited to a few 10s of KB. An empty policy is a valid policy but certain Google Cloud services (such as Projects) might reject them. |
| `updateMask` | string (google-fieldmask) | OPTIONAL: A FieldMask specifying which fields of the policy to modify. Only the fields in the mask will be modified. If no mask is provided, the following default mask is used: `paths: "bindings, etag"` |

### `SkewSource` fields

| Field | Type | Description |
|---|---|---|
| `outputBytesMax` | string (int64) | Output only. Max partition output size (in bytes) for this stage. |
| `outputBytesMedian` | string (int64) | Output only. Median partition output size (in bytes) for this stage. |
| `outputBytesP95` | string (int64) | Output only. 95-th percentile of partition output size (in bytes) for this stage. |
| `stageId` | string (int64) | Output only. Stage id of the skew source stage. |

### `SnapshotDefinition` fields

| Field | Type | Description |
|---|---|---|
| `baseTableReference` | TableReference | Required. Reference describing the ID of the table that was snapshot. |
| `snapshotTime` | string (date-time) | Required. The time at which the base table was snapshot. This value is reported in the JSON response using RFC3339 format. |

### `SparkLoggingInfo` fields

| Field | Type | Description |
|---|---|---|
| `projectId` | string | Output only. Project ID where the Spark logs were written. |
| `resourceType` | string | Output only. Resource type used for logging. |

### `SparkOptions` fields

| Field | Type | Description |
|---|---|---|
| `archiveUris` | `array<string>` | Archive files to be extracted into the working directory of each executor. For more information about Apache Spark, see Apache Spark (https://spark.apache.org/docs/latest/index.html). |
| `connection` | string | Fully qualified name of the user-provided Spark connection object. Format: "projects/{project_id}/locations/{location_id}/connections/{connection_id}" |
| `containerImage` | string | Custom container image for the runtime environment. |
| `fileUris` | `array<string>` | Files to be placed in the working directory of each executor. For more information about Apache Spark, see Apache Spark (https://spark.apache.org/docs/latest/index.html). |
| `jarUris` | `array<string>` | JARs to include on the driver and executor CLASSPATH. For more information about Apache Spark, see Apache Spark (https://spark.apache.org/docs/latest/index.html). |
| `mainClass` | string | The fully qualified name of a class in jar_uris, for example, com.example.wordcount. Exactly one of `mainClass` and `mainFileUri` should be set for Java/Scala language type (REST JSON field names; corrected, see Notes). |
| `mainFileUri` | string | The main file/jar URI of the Spark application. Exactly one of `definitionBody` (a field of the `Routine`, not of `SparkOptions`) and `mainFileUri` must be set for Python. Exactly one of `mainClass` and `mainFileUri` should be set for Java/Scala language type (REST JSON field names; see Notes). |
| `properties` | `map<string, string>` | Configuration properties as a set of key/value pairs, which will be passed on to the Spark application. For more information, see Apache Spark (https://spark.apache.org/docs/latest/index.html) and the procedure option list (https://cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#procedure_option_list). |
| `pyFileUris` | `array<string>` | Python files to be placed on the PYTHONPATH for PySpark application. Supported file types: `.py`, `.egg`, and `.zip`. For more information about Apache Spark, see Apache Spark (https://spark.apache.org/docs/latest/index.html). |
| `runtimeVersion` | string | Runtime version. If not specified, the default runtime version is used. |

### `SparkStatistics` fields

| Field | Type | Description |
|---|---|---|
| `endpoints` | `map<string, string>` | Output only. Endpoints returned from Dataproc. Key list: - history_server_endpoint: A link to Spark job UI. |
| `gcsStagingBucket` | string | Output only. The Google Cloud Storage bucket that is used as the default file system by the Spark application. This field is only filled when the Spark procedure uses the invoker security mode. The `gcsStagingBucket` bucket is inferred from the `@@spark_proc_properties.staging_bucket` system variable (if it is provided). Otherwise, BigQuery creates a default staging bucket for the job and returns the bucket name in this field. Example: \* `gs://[bucket_name]` |
| `kmsKeyName` | string | Output only. The Cloud KMS encryption key that is used to protect the resources created by the Spark job. If the Spark procedure uses the invoker security mode, the Cloud KMS encryption key is either inferred from the provided system variable, `@@spark_proc_properties.kms_key_name`, or the default key of the BigQuery job's project (if the CMEK organization policy is enforced). Otherwise, the Cloud KMS key is either inferred from the Spark connection associated with the procedure (if it is provided), or from the default key of the Spark connection's project if the CMEK organization policy is enforced. Example: \* `projects/[kms_project_id]/locations/[region]/keyRings/[key_region]/cryptoKeys/[key]` |
| `loggingInfo` | SparkLoggingInfo | Output only. Logging info is used to generate a link to Cloud Logging. |
| `sparkJobId` | string | Output only. Spark job ID if a Spark job is created successfully. |
| `sparkJobLocation` | string | Output only. Location where the Spark job is executed. A location is selected by BigQueury for jobs configured to run in a multi-region. |

### `StagePerformanceChangeInsight` fields

| Field | Type | Description |
|---|---|---|
| `inputDataChange` | InputDataChange | Output only. Input data change insight of the query stage. |
| `stageId` | string (int64) | Output only. The stage id that the insight mapped to. |

### `StagePerformanceStandaloneInsight` fields

| Field | Type | Description |
|---|---|---|
| `biEngineReasons` | `array<BiEngineReason>` | Output only. If present, the stage had the following reasons for being disqualified from BI Engine execution. |
| `highCardinalityJoins` | `array<HighCardinalityJoin>` | Output only. High cardinality joins in the stage. |
| `insufficientShuffleQuota` | boolean | Output only. True if the stage has insufficient shuffle quota. |
| `partitionSkew` | PartitionSkew | Output only. Partition skew in the stage. |
| `slotContention` | boolean | Output only. True if the stage has a slot contention issue. |
| `stageId` | string (int64) | Output only. The stage id that the insight mapped to. |

### `StandardSqlDataType` fields

| Field | Type | Description |
|---|---|---|
| `arrayElementType` | StandardSqlDataType | The type of the array's elements, if type_kind = "ARRAY". Mutually exclusive with `structType`, `rangeElementType` (proto `oneof sub_type`; set at most one; see Notes). |
| `rangeElementType` | StandardSqlDataType | The type of the range's elements, if type_kind = "RANGE". Mutually exclusive with `arrayElementType`, `structType` (proto `oneof sub_type`; set at most one; see Notes). |
| `structType` | StandardSqlStructType | The fields of this struct, in order, if type_kind = "STRUCT". Mutually exclusive with `arrayElementType`, `rangeElementType` (proto `oneof sub_type`; set at most one; see Notes). |
| `typeKind` | string enum | Required. The top level type of this field. Can be any GoogleSQL data type (e.g., "INT64", "DATE", "ARRAY"). Values: `TYPE_KIND_UNSPECIFIED`, `INT64`, `BOOL`, `FLOAT64`, `STRING`, `BYTES`, `TIMESTAMP`, `DATE`, `TIME`, `DATETIME`, `INTERVAL`, `GEOGRAPHY`, `NUMERIC`, `BIGNUMERIC`, `JSON`, `ARRAY`, `STRUCT`, `RANGE`, `UUID`. |

### `StandardSqlField` fields

| Field | Type | Description |
|---|---|---|
| `name` | string | Optional. The name of this field. Can be absent for struct fields. |
| `type` | StandardSqlDataType | Optional. The type of this parameter. Absent if not explicitly specified (e.g., CREATE FUNCTION statement can omit the return type; in this case the output parameter does not have this "type" field). |

### `StandardSqlStructType` fields

| Field | Type | Description |
|---|---|---|
| `fields` | `array<StandardSqlField>` | Fields within the struct. |

### `StandardSqlTableType` fields

| Field | Type | Description |
|---|---|---|
| `columns` | `array<StandardSqlField>` | The columns in this table type |

### `StorageDescriptor` fields

| Field | Type | Description |
|---|---|---|
| `inputFormat` | string | Optional. Specifies the fully qualified class name of the InputFormat (e.g. "org.apache.hadoop.hive.ql.io.orc.OrcInputFormat"). The maximum length is 128 characters. |
| `locationUri` | string | Optional. The physical location of the table (e.g. `gs://spark-dataproc-data/pangea-data/case_sensitive/` or `gs://spark-dataproc-data/pangea-data/*`). The maximum length is 2056 bytes. |
| `outputFormat` | string | Optional. Specifies the fully qualified class name of the OutputFormat (e.g. "org.apache.hadoop.hive.ql.io.orc.OrcOutputFormat"). The maximum length is 128 characters. |
| `serdeInfo` | SerDeInfo | Optional. Serializer and deserializer information. |

### `StoredColumnsUnusedReason` fields

| Field | Type | Description |
|---|---|---|
| `code` | string enum | Specifies the high-level reason for the unused scenario, each reason must have a code associated. Values: `CODE_UNSPECIFIED`, `STORED_COLUMNS_COVER_INSUFFICIENT`, `BASE_TABLE_HAS_RLS`, `BASE_TABLE_HAS_CLS`, `UNSUPPORTED_PREFILTER`, `INTERNAL_ERROR`, `OTHER_REASON`. |
| `message` | string | Specifies the detailed description for the scenario. |
| `uncoveredColumns` | `array<string>` | Specifies which columns were not covered by the stored columns for the specified code up to 20 columns. This is populated when the code is STORED_COLUMNS_COVER_INSUFFICIENT and BASE_TABLE_HAS_CLS. |

### `StoredColumnsUsage` fields

| Field | Type | Description |
|---|---|---|
| `baseTable` | TableReference | Specifies the base table. |
| `isQueryAccelerated` | boolean | Specifies whether the query was accelerated with stored columns. |
| `storedColumnsUnusedReasons` | `array<StoredColumnsUnusedReason>` | If stored columns were not used, explain why. |

### `Streamingbuffer` fields

| Field | Type | Description |
|---|---|---|
| `estimatedBytes` | string (uint64) | Output only. A lower-bound estimate of the number of bytes currently in the streaming buffer. |
| `estimatedRows` | string (uint64) | Output only. A lower-bound estimate of the number of rows currently in the streaming buffer. |
| `oldestEntryTime` | string (uint64) | Output only. Contains the timestamp of the oldest entry in the streaming buffer, in milliseconds since the epoch, if the streaming buffer is available. |

### `StringHparamSearchSpace` fields

| Field | Type | Description |
|---|---|---|
| `candidates` | `array<string>` | Canididates for the string or enum parameter in lower case. |

### `SystemVariables` fields

| Field | Type | Description |
|---|---|---|
| `types` | `map<string, StandardSqlDataType>` | Output only. Data type for each system variable. |
| `values` | `map<string, any>` | Output only. Value for each system variable. |

### `Table` fields

| Field | Type | Description |
|---|---|---|
| `biglakeConfiguration` | BigLakeConfiguration | Optional. Specifies the configuration of a BigQuery table for Apache Iceberg. |
| `cloneDefinition` | CloneDefinition | Output only. Contains information about the clone. This value is set via the clone operation. |
| `clustering` | Clustering | Clustering specification for the table. Must be specified with time-based partitioning, data in the table will be first partitioned and subsequently clustered. |
| `creationTime` | string (int64) | Output only. The time when this table was created, in milliseconds since the epoch. |
| `defaultCollation` | string | Optional. Defines the default collation specification of new STRING fields in the table. During table creation or update, if a STRING field is added to this table without explicit collation specified, then the table inherits the table default collation. A change to this field affects only fields added afterwards, and does not alter the existing fields. The following values are supported: \* 'und:ci': undetermined locale, case insensitive. \* '': empty string. Default to case-sensitive behavior. |
| `defaultRoundingMode` | string enum | Optional. Defines the default rounding mode specification of new decimal fields (NUMERIC OR BIGNUMERIC) in the table. During table creation or update, if a decimal field is added to this table without an explicit rounding mode specified, then the field inherits the table default rounding mode. Changing this field doesn't affect existing fields. Values: `ROUNDING_MODE_UNSPECIFIED`, `ROUND_HALF_AWAY_FROM_ZERO`, `ROUND_HALF_EVEN`. |
| `description` | string | Optional. A user-friendly description of this table. |
| `encryptionConfiguration` | EncryptionConfiguration | Custom encryption configuration (e.g., Cloud KMS keys). |
| `etag` | string | Output only. A hash of this resource. |
| `expirationTime` | string (int64) | Optional. The time when this table expires, in milliseconds since the epoch. If not present, the table will persist indefinitely. Expired tables will be deleted and their storage reclaimed. The defaultTableExpirationMs property of the encapsulating dataset can be used to set a default expirationTime on newly created tables. |
| `externalCatalogTableOptions` | ExternalCatalogTableOptions | Optional. Options defining open source compatible table. |
| `externalDataConfiguration` | ExternalDataConfiguration | Optional. Describes the data format, location, and other properties of a table stored outside of BigQuery. By defining these properties, the data source can then be queried as if it were a standard BigQuery table. |
| `friendlyName` | string | Optional. A descriptive name for this table. |
| `id` | string | Output only. An opaque ID uniquely identifying the table. |
| `kind` | string | The type of resource ID. |
| `labels` | `map<string, string>` | The labels associated with this table. You can use these to organize and group your tables. Label keys and values can be no longer than 63 characters, can only contain lowercase letters, numeric characters, underscores and dashes. International characters are allowed. Label values are optional. Label keys must start with a letter and each label in the list must have a different key. |
| `lastModifiedTime` | string (uint64) | Output only. The time when this table was last modified, in milliseconds since the epoch. |
| `location` | string | Output only. The geographic location where the table resides. This value is inherited from the dataset. |
| `managedTableType` | string enum | Optional. If set, overrides the default managed table type configured in the dataset. Values: `MANAGED_TABLE_TYPE_UNSPECIFIED`, `NATIVE`, `BIGLAKE`. |
| `materializedView` | MaterializedViewDefinition | Optional. The materialized view definition. |
| `materializedViewStatus` | MaterializedViewStatus | Output only. The materialized view status. |
| `maxStaleness` | string | Optional. The maximum staleness of data that could be returned when the table (or stale MV) is queried. Staleness encoded as a string encoding of sql IntervalValue type. |
| `model` | ModelDefinition | Deprecated. |
| `numActiveLogicalBytes` | string (int64) | Output only. Number of logical bytes that are less than 90 days old. |
| `numActivePhysicalBytes` | string (int64) | Output only. Number of physical bytes less than 90 days old. This data is not kept in real time, and might be delayed by a few seconds to a few minutes. |
| `numBytes` | string (int64) | Output only. The size of this table in logical bytes, excluding any data in the streaming buffer. |
| `numCurrentPhysicalBytes` | string (int64) | Output only. Number of physical bytes used by current live data storage. This data is not kept in real time, and might be delayed by a few seconds to a few minutes. |
| `numLongTermBytes` | string (int64) | Output only. The number of logical bytes in the table that are considered "long-term storage". |
| `numLongTermLogicalBytes` | string (int64) | Output only. Number of logical bytes that are more than 90 days old. |
| `numLongTermPhysicalBytes` | string (int64) | Output only. Number of physical bytes more than 90 days old. This data is not kept in real time, and might be delayed by a few seconds to a few minutes. |
| `numPartitions` | string (int64) | Output only. The number of partitions present in the table or materialized view. This data is not kept in real time, and might be delayed by a few seconds to a few minutes. |
| `numPhysicalBytes` | string (int64) | Output only. The physical size of this table in bytes. This includes storage used for time travel. |
| `numRows` | string (uint64) | Output only. The number of rows of data in this table, excluding any data in the streaming buffer. |
| `numTimeTravelPhysicalBytes` | string (int64) | Output only. Number of physical bytes used by time travel storage (deleted or changed data). This data is not kept in real time, and might be delayed by a few seconds to a few minutes. |
| `numTotalLogicalBytes` | string (int64) | Output only. Total number of logical bytes in the table or materialized view. |
| `numTotalPhysicalBytes` | string (int64) | Output only. The physical size of this table in bytes. This also includes storage used for time travel. This data is not kept in real time, and might be delayed by a few seconds to a few minutes. |
| `partitionDefinition` | PartitioningDefinition | Optional. The partition information for all table formats, including managed partitioned tables, hive partitioned tables, iceberg partitioned, and metastore partitioned tables. This field is only populated for metastore partitioned tables. For other table formats, this is an output only field. |
| `rangePartitioning` | RangePartitioning | If specified, configures range partitioning for this table. |
| `replicas` | `array<TableReference>` | Optional. Output only. Table references of all replicas currently active on the table. |
| `requirePartitionFilter` | boolean | Optional. If set to true, queries over this table require a partition filter that can be used for partition elimination to be specified. |
| `resourceTags` | `map<string, string>` | \[Optional\] The tags associated with this table. Tag keys are globally unique. See additional information on tags (https://cloud.google.com/iam/docs/tags-access-control#definitions). An object containing a list of "key": value pairs. The key is the namespaced friendly name of the tag key, e.g. "12345/environment" where 12345 is parent id. The value is the friendly short name of the tag value, e.g. "production". |
| `restrictions` | RestrictionConfig | Optional. Output only. Restriction config for table. If set, restrict certain accesses on the table based on the config. See Data egress (https://cloud.google.com/bigquery/docs/analytics-hub-introduction#data_egress) for more details. |
| `schema` | TableSchema | Optional. Describes the schema of this table. |
| `selfLink` | string | Output only. A URL that can be used to access this resource again. |
| `snapshotDefinition` | SnapshotDefinition | Output only. Contains information about the snapshot. This value is set via snapshot creation. |
| `streamingBuffer` | Streamingbuffer | Output only. Contains information regarding this table's streaming buffer, if one is present. This field will be absent if the table is not being streamed to or if there is no data in the streaming buffer. |
| `tableConstraints` | TableConstraints | Optional. Tables Primary Key and Foreign Key information |
| `tableReference` | TableReference | Required. Reference describing the ID of this table. |
| `tableReplicationInfo` | TableReplicationInfo | Optional. Table replication info for table created `AS REPLICA` DDL like: `CREATE MATERIALIZED VIEW mv1 AS REPLICA OF src_mv` |
| `timePartitioning` | TimePartitioning | If specified, configures time-based partitioning for this table. |
| `type` | string | Output only. Describes the table type. The following values are supported: \* `TABLE`: A normal BigQuery table. \* `VIEW`: A virtual table defined by a SQL query. \* `EXTERNAL`: A table that references data stored in an external storage system, such as Google Cloud Storage. \* `MATERIALIZED_VIEW`: A precomputed view defined by a SQL query. \* `SNAPSHOT`: An immutable BigQuery table that preserves the contents of a base table at a particular time. See additional information on table snapshots (https://cloud.google.com/bigquery/docs/table-snapshots-intro). The default value is `TABLE`. |
| `view` | ViewDefinition | Optional. The view definition. |

### `TableCell` fields

| Field | Type | Description |
|---|---|---|
| `v` | any | — |

### `TableChangeInsight` fields

| Field | Type | Description |
|---|---|---|
| `metadataCacheNotUsedButUsedPreviously` | boolean | Output only. True if the table's column metadata index was not used in the current job, but was used in a previous job with the same query hash. |
| `metadataCacheStalenessInsight` | MetadataCacheStalenessInsight | Output only. If present, indicates that the table's metadata column index staleness has increased significantly compared to previous jobs with the same query hash. |
| `tableReference` | TableReference | Output only. The table that was queried. |

### `TableConstraints` fields

| Field | Type | Description |
|---|---|---|
| `foreignKeys` | `array<object>` | Optional. Present only if the table has a foreign key. The foreign key is not enforced. |
| `foreignKeys[].columnReferences` | `array<object>` | Required. The columns that compose the foreign key. |
| `foreignKeys[].columnReferences[].referencedColumn` | string | Required. The column in the primary key that are referenced by the referencing_column. |
| `foreignKeys[].columnReferences[].referencingColumn` | string | Required. The column that composes the foreign key. |
| `foreignKeys[].name` | string | Optional. Set only if the foreign key constraint is named. |
| `foreignKeys[].referencedTable` | object | — |
| `foreignKeys[].referencedTable.datasetId` | string | — |
| `foreignKeys[].referencedTable.projectId` | string | — |
| `foreignKeys[].referencedTable.tableId` | string | — |
| `primaryKey` | object | Represents the primary key constraint on a table's columns. |
| `primaryKey.columns` | `array<string>` | Required. The columns that are composed of the primary key constraint. |

### `TableDataInsertAllRequest` fields

| Field | Type | Description |
|---|---|---|
| `ignoreUnknownValues` | boolean | Optional. Accept rows that contain values that do not match the schema. The unknown values are ignored. Default is false, which treats unknown values as errors. |
| `kind` | string | Optional. The resource type of the response. The value is not checked at the backend. Historically, it has been set to "bigquery#tableDataInsertAllRequest" but you are not required to set it. |
| `rows` | `array<object>` | — |
| `rows[].insertId` | string | Insertion ID for best-effort deduplication. This feature is not recommended, and users seeking stronger insertion semantics are encouraged to use other mechanisms such as the BigQuery Write API. |
| `rows[].json` | JsonObject | Data for a single row. |
| `skipInvalidRows` | boolean | Optional. Insert all valid rows of a request, even if invalid rows exist. The default value is false, which causes the entire request to fail if any invalid rows exist. |
| `templateSuffix` | string | Optional. If specified, treats the destination table as a base template, and inserts the rows into an instance table named "{destination}{templateSuffix}". BigQuery will manage creation of the instance table, using the schema of the base template table. See https://cloud.google.com/bigquery/streaming-data-into-bigquery#template-tables for considerations when working with templates tables. |
| `traceId` | string | Optional. Unique request trace id. Used for debugging purposes only. It is case-sensitive, limited to up to 36 ASCII characters. A UUID is recommended. |

### `TableDataInsertAllResponse` fields

| Field | Type | Description |
|---|---|---|
| `insertErrors` | `array<object>` | Describes specific errors encountered while processing the request. |
| `insertErrors[].errors` | `array<ErrorProto>` | Error information for the row indicated by the index property. |
| `insertErrors[].index` | integer (uint32) | The index of the row that error applies to. |
| `kind` | string | Returns "bigquery#tableDataInsertAllResponse". |

### `TableDataList` fields

| Field | Type | Description |
|---|---|---|
| `etag` | string | A hash of this page of results. |
| `kind` | string | The resource type of the response. |
| `pageToken` | string | A token used for paging results. Providing this token instead of the startIndex parameter can help you retrieve stable results when an underlying table is changing. |
| `rows` | `array<TableRow>` | Rows of results. |
| `totalRows` | string (int64) | Total rows of the entire table. In order to show default value 0 we have to present it as string. |

### `TableFieldSchema` fields

| Field | Type | Description |
|---|---|---|
| `categories` | object | Deprecated. |
| `categories.names` | `array<string>` | Deprecated. |
| `collation` | string | Optional. Field collation can be set only when the type of field is STRING. The following values are supported: \* 'und:ci': undetermined locale, case insensitive. \* '': empty string. Default to case-sensitive behavior. |
| `dataGovernanceTagsInfo` | object | Optional. Specifies the data governance tags on this field. This field works with other column-level security fields as follows: \* \*\*Precedence\*\*: If a data governance tag is attached to a column, it takes precedence over the policy tag attached to the column. However, if a data policy is attached to a column, it takes precedence over the data governance tag. \* \*\*Patching behavior\*\*: Describes how this field behaves during a `Table.patch` schema update: \* \*\*Unset\*\*: If the `data_governance_tags_info` field is omitted from the update request, the existing tags on the column are preserved. \* \*\*Empty Field\*\*: To clear data governance tags from a column, send the `data_governance_tags_info` field as an empty object. This removes all tags from the column. \* \*\*Updating tags\*\*: To replace an existing tag, send the field with the new tag. |
| `dataGovernanceTagsInfo.dataGovernanceTags` | `map<string, string>` | Optional. The data governance tags added to this field are used for field-level access control. Only one data governance tag is currently supported on a field. Tag keys are globally unique. Tag key is expected to be in the namespaced format, for example "parent-id/pii" where parent-id is the ID of the parent organization or project resource for this tag key. Tag value is expected to be the short name, for example "sensitive". See Tag definitions (https://cloud.google.com/iam/docs/tags-access-control#definitions) for more details. For example: "parent-id/pii": "sensitive", "myProject/cost_center": "sales" |
| `dataPolicies` | `array<DataPolicyOption>` | Optional. Data policies attached to this field, used for field-level access control. |
| `dataPolicyList` | DataPolicyList | Optional. Specifies data policies attached to this field, used for field-level access control. When set, this will be the source of truth for data policy information. |
| `defaultValueExpression` | string | Optional. A SQL expression to specify the default value (https://cloud.google.com/bigquery/docs/default-values) for this field. |
| `description` | string | Optional. The field description. The maximum length is 1,024 characters. |
| `fields` | `array<TableFieldSchema>` | Optional. Describes the nested schema fields if the type property is set to RECORD. |
| `foreignTypeDefinition` | string | Optional. Definition of the foreign data type. Only valid for top-level schema fields (not nested fields). If the type is FOREIGN, this field is required. |
| `generatedColumn` | GeneratedColumn | Optional. Definition of how values are generated for the field. Only valid for top-level schema fields (not nested fields). |
| `maxLength` | string (int64) | Optional. Maximum length of values of this field for STRINGS or BYTES. If max_length is not specified, no maximum length constraint is imposed on this field. If type = "STRING", then max_length represents the maximum UTF-8 length of strings in this field. If type = "BYTES", then max_length represents the maximum number of bytes in this field. It is invalid to set this field if type ≠ "STRING" and ≠ "BYTES". |
| `mode` | string | Optional. The field mode. Possible values include NULLABLE, REQUIRED and REPEATED. The default value is NULLABLE. |
| `name` | string | Required. The field name. The name must contain only letters (a-z, A-Z), numbers (0-9), or underscores (\_), and must start with a letter or underscore. The maximum length is 300 characters. |
| `policyTags` | object | Optional. The policy tags attached to this field, used for field-level access control. If not set, defaults to empty policy_tags. |
| `policyTags.names` | `array<string>` | A list of policy tag resource names. For example, "projects/1/locations/eu/taxonomies/2/policyTags/3". At most 1 policy tag is currently allowed. |
| `precision` | string (int64) | Optional. Precision (maximum number of total digits in base 10) and scale (maximum number of digits in the fractional part in base 10) constraints for values of this field for NUMERIC or BIGNUMERIC. It is invalid to set precision or scale if type ≠ "NUMERIC" and ≠ "BIGNUMERIC". If precision and scale are not specified, no value range constraint is imposed on this field insofar as values are permitted by the type. Values of this NUMERIC or BIGNUMERIC field must be in this range when: \* Precision (P) and scale (S) are specified: \[-10P-S + 10-S, 10P-S - 10-S\] \* Precision (P) is specified but not scale (and thus scale is interpreted to be equal to zero): \[-10P + 1, 10P - 1\]. Acceptable values for precision and scale if both are specified: \* If type = "NUMERIC": 1 ≤ precision - scale ≤ 29 and 0 ≤ scale ≤ 9. \* If type = "BIGNUMERIC": 1 ≤ precision - scale ≤ 38 and 0 ≤ scale ≤ 38. Acceptable values for precision if only precision is specified but not scale (and thus scale is interpreted to be equal to zero): \* If type = "NUMERIC": 1 ≤ precision ≤ 29. \* If type = "BIGNUMERIC": 1 ≤ precision ≤ 38. If scale is specified but not precision, then it is invalid. |
| `rangeElementType` | object | Represents the type of a field element. |
| `rangeElementType.type` | string | Required. The type of a field element. For more information, see TableFieldSchema.type. |
| `roundingMode` | string enum | Optional. Specifies the rounding mode to be used when storing values of NUMERIC and BIGNUMERIC type. Values: `ROUNDING_MODE_UNSPECIFIED`, `ROUND_HALF_AWAY_FROM_ZERO`, `ROUND_HALF_EVEN`. |
| `scale` | string (int64) | Optional. See documentation for precision. |
| `timestampPrecision` | string (int64) | Optional. Precision (maximum number of total digits in base 10) for seconds of TIMESTAMP type. Possible values include: \* 6 (Default, for TIMESTAMP type with microsecond precision) \* 12 (For TIMESTAMP type with picosecond precision) |
| `type` | string | Required. The field data type. Possible values include: \* STRING \* BYTES \* INTEGER (or INT64) \* FLOAT (or FLOAT64) \* BOOLEAN (or BOOL) \* TIMESTAMP \* DATE \* TIME \* DATETIME \* GEOGRAPHY \* NUMERIC \* BIGNUMERIC \* JSON \* RECORD (or STRUCT) \* RANGE Use of RECORD/STRUCT indicates that the field contains a nested schema. |

### `TableList` fields

| Field | Type | Description |
|---|---|---|
| `etag` | string | A hash of this page of results. |
| `kind` | string | The type of list. |
| `nextPageToken` | string | A token to request the next page of results. |
| `tables` | `array<object>` | Tables in the requested dataset. |
| `tables[].clustering` | Clustering | Clustering specification for this table, if configured. |
| `tables[].creationTime` | string (int64) | Output only. The time when this table was created, in milliseconds since the epoch. |
| `tables[].expirationTime` | string (int64) | The time when this table expires, in milliseconds since the epoch. If not present, the table will persist indefinitely. Expired tables will be deleted and their storage reclaimed. |
| `tables[].friendlyName` | string | The user-friendly name for this table. |
| `tables[].id` | string | An opaque ID of the table. |
| `tables[].kind` | string | The resource type. |
| `tables[].labels` | `map<string, string>` | The labels associated with this table. You can use these to organize and group your tables. |
| `tables[].rangePartitioning` | RangePartitioning | The range partitioning for this table. |
| `tables[].requirePartitionFilter` | boolean | Optional. If set to true, queries including this table must specify a partition filter. This filter is used for partition elimination. |
| `tables[].tableReference` | TableReference | A reference uniquely identifying table. |
| `tables[].timePartitioning` | TimePartitioning | The time-based partitioning for this table. |
| `tables[].type` | string | The type of table. |
| `tables[].view` | object | Information about a logical view. |
| `tables[].view.privacyPolicy` | PrivacyPolicy | Specifies the privacy policy for the view. |
| `tables[].view.useLegacySql` | boolean | True if view is defined in legacy SQL dialect, false if in GoogleSQL. |
| `totalItems` | integer (int32) | The total number of tables in the dataset. |

### `TableMetadataCacheUsage` fields

| Field | Type | Description |
|---|---|---|
| `explanation` | string | Free form human-readable reason metadata caching was unused for the job. |
| `pruningStats` | PruningStats | The column metadata index pruning statistics. |
| `staleness` | string (google-duration) | Duration since last refresh as of this job for managed tables (indicates metadata cache staleness as seen by this job). |
| `tableReference` | TableReference | Metadata caching eligible table referenced in the query. |
| `tableType` | string | Table type (https://cloud.google.com/bigquery/docs/reference/rest/v2/tables#Table.FIELDS.type). |
| `unusedReason` | string enum | Reason for not using metadata caching for the table. Values: `UNUSED_REASON_UNSPECIFIED`, `EXCEEDED_MAX_STALENESS`, `METADATA_CACHING_NOT_ENABLED`, `OTHER_REASON`. |

### `TableReference` fields

| Field | Type | Description |
|---|---|---|
| `datasetId` | string | Required. The ID of the dataset containing this table. |
| `projectId` | string | Required. The ID of the project containing this table. |
| `tableId` | string | Required. The ID of the table. The ID can contain Unicode characters in category L (letter), M (mark), N (number), Pc (connector, including underscore), Pd (dash), and Zs (space). For more information, see General Category (https://wikipedia.org/wiki/Unicode_character_property#General_Category). The maximum length is 1,024 characters. Certain operations allow suffixing of the table ID with a partition decorator, such as `sample_table$20190123`. |

### `TableReplicationInfo` fields

| Field | Type | Description |
|---|---|---|
| `replicatedSourceLastRefreshTime` | string (int64) | Optional. Output only. If source is a materialized view, this field signifies the last refresh time of the source. |
| `replicationError` | ErrorProto | Optional. Output only. Replication error that will permanently stopped table replication. |
| `replicationIntervalMs` | string (int64) | Optional. Specifies the interval at which the source table is polled for updates. It's Optional. If not specified, default replication interval would be applied. |
| `replicationStatus` | string enum | Optional. Output only. Replication status of configured replication. Values: `REPLICATION_STATUS_UNSPECIFIED`, `ACTIVE`, `SOURCE_DELETED`, `PERMISSION_DENIED`, `UNSUPPORTED_CONFIGURATION`. |
| `sourceTable` | TableReference | Required. Source table reference that is replicated. |

### `TableRow` fields

| Field | Type | Description |
|---|---|---|
| `f` | `array<TableCell>` | Represents a single row in the result set, consisting of one or more fields. |

### `TableSchema` fields

| Field | Type | Description |
|---|---|---|
| `fields` | `array<TableFieldSchema>` | Describes the fields in a table. |
| `foreignTypeInfo` | ForeignTypeInfo | Optional. Specifies metadata of the foreign data type definition in field schema (TableFieldSchema.foreign_type_definition). |

### `TestIamPermissionsRequest` fields

| Field | Type | Description |
|---|---|---|
| `permissions` | `array<string>` | The set of permissions to check for the `resource`. Permissions with wildcards (such as `*` or `storage.*`) are not allowed. For more information see IAM Overview (https://cloud.google.com/iam/docs/overview#permissions). |

### `TestIamPermissionsResponse` fields

| Field | Type | Description |
|---|---|---|
| `permissions` | `array<string>` | A subset of `TestIamPermissionsRequest.permissions` that the caller is allowed (request type name corrected; see Notes). |

### `TimePartitioning` fields

| Field | Type | Description |
|---|---|---|
| `expirationMs` | string (int64) | Optional. Number of milliseconds for which to keep the storage for a partition. A wrapper is used here because 0 is an invalid value. |
| `field` | string | Optional. If not set, the table is partitioned by pseudo column '\_PARTITIONTIME'; if set, the table is partitioned by this field. The field must be a top-level TIMESTAMP or DATE field. Its mode must be NULLABLE or REQUIRED. A wrapper is used here because an empty string is an invalid value. |
| `requirePartitionFilter` | boolean | If set to true, queries over this table require a partition filter that can be used for partition elimination to be specified. This field is deprecated; please set the field with the same name on the table itself instead. This field needs a wrapper because we want to output the default value, false, if the user explicitly set it. |
| `type` | string | Required. The supported types are DAY, HOUR, MONTH, and YEAR, which will generate one partition per day, hour, month, and year, respectively. |

### `TrainingOptions` fields

| Field | Type | Description |
|---|---|---|
| `activationFn` | string | Activation function of the neural nets. |
| `adjustStepChanges` | boolean | If true, detect step changes and make data adjustment in the input time series. |
| `approxGlobalFeatureContrib` | boolean | Whether to use approximate feature contribution method in XGBoost model explanation for global explain. |
| `autoArima` | boolean | Whether to enable auto ARIMA or not. |
| `autoArimaMaxOrder` | string (int64) | The max value of the sum of non-seasonal p and q. |
| `autoArimaMinOrder` | string (int64) | The min value of the sum of non-seasonal p and q. |
| `autoClassWeights` | boolean | Whether to calculate class weights automatically based on the popularity of each label. |
| `batchSize` | string (int64) | Batch size for dnn models. |
| `boosterType` | string enum | Booster type for boosted tree models. Values: `BOOSTER_TYPE_UNSPECIFIED`, `GBTREE`, `DART`. |
| `budgetHours` | number (double) | Budget in hours for AutoML training. |
| `calculatePValues` | boolean | Whether or not p-value test should be computed for this model. Only available for linear and logistic regression models. |
| `categoryEncodingMethod` | string enum | Categorical feature encoding method. Values: `ENCODING_METHOD_UNSPECIFIED`, `ONE_HOT_ENCODING`, `LABEL_ENCODING`, `DUMMY_ENCODING`. |
| `cleanSpikesAndDips` | boolean | If true, clean spikes and dips in the input time series. |
| `colorSpace` | string enum | Enums for color space, used for processing images in Object Table. See more details at https://www.tensorflow.org/io/tutorials/colorspace. Values: `COLOR_SPACE_UNSPECIFIED`, `RGB`, `HSV`, `YIQ`, `YUV`, `GRAYSCALE`. |
| `colsampleBylevel` | number (double) | Subsample ratio of columns for each level for boosted tree models. |
| `colsampleBynode` | number (double) | Subsample ratio of columns for each node(split) for boosted tree models. |
| `colsampleBytree` | number (double) | Subsample ratio of columns when constructing each tree for boosted tree models. |
| `contributionMetric` | string | The contribution metric. Applies to contribution analysis models. Allowed formats supported are for summable and summable ratio contribution metrics. These include expressions such as `SUM(x)` or `SUM(x)/SUM(y)`, where x and y are column names from the base table. |
| `dartNormalizeType` | string enum | Type of normalization algorithm for boosted tree models using dart booster. Values: `DART_NORMALIZE_TYPE_UNSPECIFIED`, `TREE`, `FOREST`. |
| `dataFrequency` | string enum | The data frequency of a time series. Values: `DATA_FREQUENCY_UNSPECIFIED`, `AUTO_FREQUENCY`, `YEARLY`, `QUARTERLY`, `MONTHLY`, `WEEKLY`, `DAILY`, `HOURLY`, `PER_MINUTE`. |
| `dataSplitColumn` | string | The column to split data with. This column won't be used as a feature. 1. When data_split_method is CUSTOM, the corresponding column should be boolean. The rows with true value tag are eval data, and the false are training data. 2. When data_split_method is SEQ, the first DATA_SPLIT_EVAL_FRACTION rows (from smallest to largest) in the corresponding column are used as training data, and the rest are eval data. It respects the order in Orderable data types: https://cloud.google.com/bigquery/docs/reference/standard-sql/data-types#data_type_properties |
| `dataSplitEvalFraction` | number (double) | The fraction of evaluation data over the whole input data. The rest of data will be used as training data. The format should be double. Accurate to two decimal places. Default value is 0.2. |
| `dataSplitMethod` | string enum | The data split type for training and evaluation, e.g. RANDOM. Values: `DATA_SPLIT_METHOD_UNSPECIFIED`, `RANDOM`, `CUSTOM`, `SEQUENTIAL`, `NO_SPLIT`, `AUTO_SPLIT`. |
| `decomposeTimeSeries` | boolean | If true, perform decompose time series and save the results. |
| `dimensionIdColumns` | `array<string>` | Optional. Names of the columns to slice on. Applies to contribution analysis models. |
| `distanceType` | string enum | Distance type for clustering models. Values: `DISTANCE_TYPE_UNSPECIFIED`, `EUCLIDEAN`, `COSINE`. |
| `dropout` | number (double) | Dropout probability for dnn models. |
| `earlyStop` | boolean | Whether to stop early when the loss doesn't improve significantly any more (compared to min_relative_progress). Used only for iterative training algorithms. |
| `enableGlobalExplain` | boolean | If true, enable global explanation during training. |
| `endpointIdleTtl` | string (google-duration) | The idle TTL of the endpoint before the resources get destroyed. The default value is 6.5 hours. |
| `feedbackType` | string enum | Feedback type that specifies which algorithm to run for matrix factorization. Values: `FEEDBACK_TYPE_UNSPECIFIED`, `IMPLICIT`, `EXPLICIT`. |
| `fitIntercept` | boolean | Whether the model should include intercept during model training. |
| `forecastLimitLowerBound` | number (double) | The forecast limit lower bound that was used during ARIMA model training with limits. To see more details of the algorithm: https://otexts.com/fpp2/limits.html |
| `forecastLimitUpperBound` | number (double) | The forecast limit upper bound that was used during ARIMA model training with limits. |
| `hiddenUnits` | `array<string (int64)>` | Hidden units for dnn models. |
| `holidayRegion` | string enum | The geographical region based on which the holidays are considered in time series modeling. If a valid value is specified, then holiday effects modeling is enabled. Values: `HOLIDAY_REGION_UNSPECIFIED`, `GLOBAL`, `NA`, `JAPAC`, `EMEA`, `LAC`, `AE`, `AR`, `AT`, `AU`, `BE`, `BR`, `CA`, `CH`, `CL`, `CN`, `CO`, `CS`, `CZ`, `DE`, `DK`, `DZ`, `EC`, `EE`, `EG`, `ES`, `FI`, `FR`, `GB`, `GR`, `HK`, `HU`, `ID`, `IE`, `IL`, `IN`, `IR`, `IT`, `JP`, `KR`, `LV`, `MA`, `MX`, `MY`, `NG`, `NL`, `NO`, `NZ`, `PE`, `PH`, `PK`, `PL`, `PT`, `RO`, `RS`, `RU`, `SA`, `SE`, `SG`, `SI`, `SK`, `TH`, `TR`, `TW`, `UA`, `US`, `VE`, `VN`, `ZA`. |
| `holidayRegions` | `array<string enum>` | A list of geographical regions that are used for time series modeling. Values: `HOLIDAY_REGION_UNSPECIFIED`, `GLOBAL`, `NA`, `JAPAC`, `EMEA`, `LAC`, `AE`, `AR`, `AT`, `AU`, `BE`, `BR`, `CA`, `CH`, `CL`, `CN`, `CO`, `CS`, `CZ`, `DE`, `DK`, `DZ`, `EC`, `EE`, `EG`, `ES`, `FI`, `FR`, `GB`, `GR`, `HK`, `HU`, `ID`, `IE`, `IL`, `IN`, `IR`, `IT`, `JP`, `KR`, `LV`, `MA`, `MX`, `MY`, `NG`, `NL`, `NO`, `NZ`, `PE`, `PH`, `PK`, `PL`, `PT`, `RO`, `RS`, `RU`, `SA`, `SE`, `SG`, `SI`, `SK`, `TH`, `TR`, `TW`, `UA`, `US`, `VE`, `VN`, `ZA`. |
| `horizon` | string (int64) | The number of periods ahead that need to be forecasted. |
| `hparamTuningObjectives` | `array<string enum>` | The target evaluation metrics to optimize the hyperparameters for. Values: `HPARAM_TUNING_OBJECTIVE_UNSPECIFIED`, `MEAN_ABSOLUTE_ERROR`, `MEAN_SQUARED_ERROR`, `MEAN_SQUARED_LOG_ERROR`, `MEDIAN_ABSOLUTE_ERROR`, `R_SQUARED`, `EXPLAINED_VARIANCE`, `PRECISION`, `RECALL`, `ACCURACY`, `F1_SCORE`, `LOG_LOSS`, `ROC_AUC`, `DAVIES_BOULDIN_INDEX`, `MEAN_AVERAGE_PRECISION`, `NORMALIZED_DISCOUNTED_CUMULATIVE_GAIN`, `AVERAGE_RANK`. |
| `huggingFaceModelId` | string | The id of a Hugging Face model. For example, `google/gemma-2-2b-it`. Mutually exclusive with `modelGardenModelName` (proto `oneof external_model_id`; set at most one; see Notes). |
| `includeDrift` | boolean | Include drift when fitting an ARIMA model. |
| `initialLearnRate` | number (double) | Specifies the initial learning rate for the line search learn rate strategy. |
| `inputLabelColumns` | `array<string>` | Name of input label columns in training data. |
| `instanceWeightColumn` | string | Name of the instance weight column for training data. This column isn't be used as a feature. |
| `integratedGradientsNumSteps` | string (int64) | Number of integral steps for the integrated gradients explain method. |
| `isTestColumn` | string | Name of the column used to determine the rows corresponding to control and test. Applies to contribution analysis models. |
| `itemColumn` | string | Item column specified for matrix factorization models. |
| `kmeansInitializationColumn` | string | The column used to provide the initial centroids for kmeans algorithm when kmeans_initialization_method is CUSTOM. |
| `kmeansInitializationMethod` | string enum | The method used to initialize the centroids for kmeans algorithm. Values: `KMEANS_INITIALIZATION_METHOD_UNSPECIFIED`, `RANDOM`, `CUSTOM`, `KMEANS_PLUS_PLUS`. |
| `l1RegActivation` | number (double) | L1 regularization coefficient to activations. |
| `l1Regularization` | number (double) | L1 regularization coefficient. |
| `l2Regularization` | number (double) | L2 regularization coefficient. |
| `labelClassWeights` | `map<string, number (double)>` | Weights associated with each label class, for rebalancing the training data. Only applicable for classification models. |
| `learnRate` | number (double) | Learning rate in training. Used only for iterative training algorithms. |
| `learnRateStrategy` | string enum | The strategy to determine learn rate for the current iteration. Values: `LEARN_RATE_STRATEGY_UNSPECIFIED`, `LINE_SEARCH`, `CONSTANT`. |
| `lossType` | string enum | Type of loss function used during training run. Values: `LOSS_TYPE_UNSPECIFIED`, `MEAN_SQUARED_LOSS`, `MEAN_LOG_LOSS`. |
| `machineType` | string | The type of the machine used to deploy and serve the model. |
| `maxIterations` | string (int64) | The maximum number of iterations in training. Used only for iterative training algorithms. |
| `maxParallelTrials` | string (int64) | Maximum number of trials to run in parallel. |
| `maxReplicaCount` | string (int64) | The maximum number of machine replicas that will be deployed on an endpoint. The default value is equal to min_replica_count. |
| `maxTimeSeriesLength` | string (int64) | The maximum number of time points in a time series that can be used in modeling the trend component of the time series. Don't use this option with the `timeSeriesLengthFraction` or `minTimeSeriesLength` options. |
| `maxTreeDepth` | string (int64) | Maximum depth of a tree for boosted tree models. |
| `minAprioriSupport` | number (double) | The apriori support minimum. Applies to contribution analysis models. |
| `minRelativeProgress` | number (double) | When early_stop is true, stops training when accuracy improvement is less than 'min_relative_progress'. Used only for iterative training algorithms. |
| `minReplicaCount` | string (int64) | The minimum number of machine replicas that will be always deployed on an endpoint. This value must be greater than or equal to 1. The default value is 1. |
| `minSplitLoss` | number (double) | Minimum split loss for boosted tree models. |
| `minTimeSeriesLength` | string (int64) | The minimum number of time points in a time series that are used in modeling the trend component of the time series. If you use this option you must also set the `timeSeriesLengthFraction` option. This training option ensures that enough time points are available when you use `timeSeriesLengthFraction` in trend modeling. This is particularly important when forecasting multiple time series in a single query using `timeSeriesIdColumn`. If the total number of time points is less than the `minTimeSeriesLength` value, then the query uses all available time points. |
| `minTreeChildWeight` | string (int64) | Minimum sum of instance weight needed in a child for boosted tree models. |
| `modelGardenModelName` | string | The name of a Vertex model garden publisher model. Format is `publishers/{publisher}/models/{model}@{optional_version_id}`. Mutually exclusive with `huggingFaceModelId` (proto `oneof external_model_id`; set at most one; see Notes). |
| `modelRegistry` | string enum | The model registry. Values: `MODEL_REGISTRY_UNSPECIFIED`, `VERTEX_AI`. |
| `modelUri` | string | Google Cloud Storage URI from which the model was imported. Only applicable for imported models. |
| `nonSeasonalOrder` | ArimaOrder | A specification of the non-seasonal part of the ARIMA model: the three components (p, d, q) are the AR order, the degree of differencing, and the MA order. |
| `numClusters` | string (int64) | Number of clusters for clustering models. |
| `numFactors` | string (int64) | Num factors specified for matrix factorization models. |
| `numParallelTree` | string (int64) | Number of parallel trees constructed during each iteration for boosted tree models. |
| `numPrincipalComponents` | string (int64) | Number of principal components to keep in the PCA model. Must be <= the number of features. |
| `numTrials` | string (int64) | Number of trials to run this hyperparameter tuning job. |
| `optimizationStrategy` | string enum | Optimization strategy for training linear regression models. Values: `OPTIMIZATION_STRATEGY_UNSPECIFIED`, `BATCH_GRADIENT_DESCENT`, `NORMAL_EQUATION`. |
| `optimizer` | string | Optimizer used for training the neural nets. |
| `pcaExplainedVarianceRatio` | number (double) | The minimum ratio of cumulative explained variance that needs to be given by the PCA model. |
| `pcaSolver` | string enum | The solver for PCA. Values: `UNSPECIFIED`, `FULL`, `RANDOMIZED`, `AUTO`. |
| `reservationAffinityKey` | string | Corresponds to the label key of a reservation resource used by Vertex AI. To target a SPECIFIC_RESERVATION by name, use `compute.googleapis.com/reservation-name` as the key and specify the name of your reservation as its value. |
| `reservationAffinityType` | string enum | Specifies the reservation affinity type used to configure a Vertex AI resource. The default value is `NO_RESERVATION`. Values: `RESERVATION_AFFINITY_TYPE_UNSPECIFIED`, `NO_RESERVATION`, `ANY_RESERVATION`, `SPECIFIC_RESERVATION`. |
| `reservationAffinityValues` | `array<string>` | Corresponds to the label values of a reservation resource used by Vertex AI. This must be the full resource name of the reservation or reservation block. |
| `sampledShapleyNumPaths` | string (int64) | Number of paths for the sampled Shapley explain method. |
| `scaleFeatures` | boolean | If true, scale the feature values by dividing the feature standard deviation. Currently only apply to PCA. |
| `standardizeFeatures` | boolean | Whether to standardize numerical features. Default to true. |
| `subsample` | number (double) | Subsample fraction of the training data to grow tree to prevent overfitting for boosted tree models. |
| `tfVersion` | string | Based on the selected TF version, the corresponding docker image is used to train external models. |
| `timeSeriesDataColumn` | string | Column to be designated as time series data for ARIMA model. |
| `timeSeriesIdColumn` | string | The time series id column that was used during ARIMA model training. |
| `timeSeriesIdColumns` | `array<string>` | The time series id columns that were used during ARIMA model training. |
| `timeSeriesLengthFraction` | number (double) | The fraction of the interpolated length of the time series that's used to model the time series trend component. All of the time points of the time series are used to model the non-trend component. This training option accelerates modeling training without sacrificing much forecasting accuracy. You can use this option with `minTimeSeriesLength` but not with `maxTimeSeriesLength`. |
| `timeSeriesTimestampColumn` | string | Column to be designated as time series timestamp for ARIMA model. |
| `treeMethod` | string enum | Tree construction algorithm for boosted tree models. Values: `TREE_METHOD_UNSPECIFIED`, `AUTO`, `EXACT`, `APPROX`, `HIST`. |
| `trendSmoothingWindowSize` | string (int64) | Smoothing window size for the trend component. When a positive value is specified, a center moving average smoothing is applied on the history trend. When the smoothing window is out of the boundary at the beginning or the end of the trend, the first element or the last element is padded to fill the smoothing window before the average is applied. |
| `userColumn` | string | User column specified for matrix factorization models. |
| `vertexAiModelVersionAliases` | `array<string>` | The version aliases to apply in Vertex AI model registry. Always overwrite if the version aliases exists in a existing model. |
| `walsAlpha` | number (double) | Hyperparameter for matrix factoration when implicit feedback type is specified. |
| `warmStart` | boolean | Whether to train a model from the last checkpoint. |
| `xgboostVersion` | string | User-selected XGBoost versions for training of XGBoost models. |

### `TrainingRun` fields

| Field | Type | Description |
|---|---|---|
| `classLevelGlobalExplanations` | `array<GlobalExplanation>` | Output only. Global explanation contains the explanation of top features on the class level. Applies to classification models only. |
| `dataSplitResult` | DataSplitResult | Output only. Data split result of the training run. Only set when the input data is actually split. |
| `evaluationMetrics` | EvaluationMetrics | Output only. The evaluation metrics over training/eval data that were computed at the end of training. |
| `modelLevelGlobalExplanation` | GlobalExplanation | Output only. Global explanation contains the explanation of top features on the model level. Applies to both regression and classification models. |
| `results` | `array<IterationResult>` | Output only. Output of each iteration run, results.size() <= max_iterations. |
| `startTime` | string (google-datetime) | Output only. The start time of this training run. |
| `trainingOptions` | TrainingOptions | Output only. Options that were used for this training run, includes user specified and default options that were used. |
| `trainingStartTime` | string (int64) | Output only. The start time of this training run, in milliseconds since epoch. Deprecated (`deprecated: true` in the Discovery document; see Notes). |
| `vertexAiModelId` | string | The model id in the Vertex AI Model Registry (https://cloud.google.com/vertex-ai/docs/model-registry/introduction) for this training run. |
| `vertexAiModelVersion` | string | Output only. The model version in the Vertex AI Model Registry (https://cloud.google.com/vertex-ai/docs/model-registry/introduction) for this training run. |

### `TransactionInfo` fields

| Field | Type | Description |
|---|---|---|
| `transactionId` | string | Output only. \[Alpha\] Id of the transaction. |

### `TransformColumn` fields

| Field | Type | Description |
|---|---|---|
| `name` | string | Output only. Name of the column. |
| `transformSql` | string | Output only. The SQL expression used in the column transform. |
| `type` | StandardSqlDataType | Output only. Data type of the column after the transform. |

### `UndeleteDatasetRequest` fields

| Field | Type | Description |
|---|---|---|
| `deletionTime` | string (google-datetime) | Optional. The exact time when the dataset was deleted. If not specified, the most recently deleted version is undeleted. Undeleting a dataset using deletion time is not supported. |

### `UserDefinedFunctionResource` fields

| Field | Type | Description |
|---|---|---|
| `inlineCode` | string | \[Pick one\] An inline resource that contains code for a user-defined function (UDF). Providing a inline code resource is equivalent to providing a URI for a file containing the same code. |
| `resourceUri` | string | \[Pick one\] A code resource to load from a Google Cloud Storage URI (gs://bucket/path). |

### `VectorSearchStatistics` fields

| Field | Type | Description |
|---|---|---|
| `indexUnusedReasons` | `array<IndexUnusedReason>` | When `indexUsageMode` is `UNUSED` or `PARTIALLY_USED`, this field explains why indexes were not used in all or part of the vector search query. If `indexUsageMode` is `FULLY_USED`, this field is not populated. |
| `indexUsageMode` | string enum | Specifies the index usage mode for the query. Values: `INDEX_USAGE_MODE_UNSPECIFIED`, `UNUSED`, `PARTIALLY_USED`, `FULLY_USED`. |
| `storedColumnsUsages` | `array<StoredColumnsUsage>` | Specifies the usage of stored columns in the query when stored columns are used in the query. |

## Notes

- Generated from the Discovery document(s) v2 of `bigquery` (retrieved 2026-11-14); a type with the same fields in several versions shows the preferred version; a type whose fields differ between versions is listed once per version (heading suffix `(version)`), and each type's `Version` line names the document it was taken from. A `$ref` resolves to the definition of the same version.
- Fields of an inline object (a field whose Discovery definition has its own `properties`) are listed as `parent.child` rows below the parent row; `[]` marks the elements of an array, for example `access[].role`.
- Shortened from the Discovery document: the `useLegacySql` description of `QueryRequest` (`jobs.query`) ends with "When useLegacySql is set to false, the value of flattenResults is ignored; query will be run as if flattenResults is false.", the text of `JobConfigurationQuery.useLegacySql`. `QueryRequest` has no `flattenResults` field in the Discovery document or the proto; `flattenResults` is a field of `JobConfigurationQuery`, the query configuration of `jobs.insert` ("If true and query uses legacy SQL dialect, flattens all nested and repeated fields in the query results. ... For GoogleSQL queries, this flag is ignored and results are never flattened."). With `jobs.query`, `useLegacySql` selects the SQL dialect only: legacy SQL when true (the default), GoogleSQL when false.
- Scope of the `filterPredicate` restriction (`RowAccessPolicy`): the description, also in the REST reference (https://docs.cloud.google.com/bigquery/docs/reference/rest/v2/rowAccessPolicies, retrieved 2026-11-21), says that references to other tables, routines and temporary functions are not supported. The row-level security guide (https://docs.cloud.google.com/bigquery/docs/managing-row-level-security, retrieved 2026-11-21; see `references/row-column-security-masking/managing-row-level-security.md`) creates policies whose `FILTER USING` expression has a subquery on a lookup table with the GoogleSQL DDL statement `CREATE ROW ACCESS POLICY`, and lists `bigquery.tables.getData` "on the target table and any referenced tables in granted subquery row-level access policies" as a required permission. With the REST methods (`bigquery.rowAccessPolicies.insert` and `update`), follow the documented restriction and send a predicate that references no other table; to create a policy that filters with a subquery on a lookup table, run the DDL statement as a GoogleSQL query job (`bigquery.jobs.query` or `jobs.insert`; set `useLegacySql` to `false`, because it defaults to `true` for these methods). Adapted from that guide, with the lookup table qualified by project and dataset because the request sets no `defaultDataset` (the guide writes `FROM lookup_table`): `CREATE OR REPLACE ROW ACCESS POLICY apac_filter ON project.dataset.my_table GRANT TO ('domain:example.com') FILTER USING (region IN (SELECT region FROM project.dataset.lookup_table WHERE email = SESSION_USER()));`.
- Replacement of `LoadQueryStatistics.bytesTransferred`: the description names `transferred_bytes`, which is not a field of `LoadQueryStatistics`. In the proto, `transferred_bytes` ("Total bytes transferred for BigQuery Omni queries from the remote cloud back to Google Cloud") is a field of `JobStatistics2`, the message that also holds `load_query_statistics` (`google/cloud/bigquery/v2/job_stats.proto`, https://github.com/googleapis/googleapis/blob/5ce024537af135bb2a0d3228072dd660047956aa/google/cloud/bigquery/v2/job_stats.proto, commit `5ce0245`, retrieved 2026-11-21), so in REST JSON it is `statistics.query.transferredBytes` next to `statistics.query.loadQueryStatistics`; the proto has no `bytes_transferred` field in `LoadQueryStatistics`.
- Corrected from the Discovery document: the JSON example in the `Policy` description (the `google.iam.v1` text shared by the IAM methods) has a trailing comma after the `condition.expression` value (`"expression": "request.time < timestamp('2020-10-01T00:00:00.000Z')", } }`), which is not valid JSON; the same comma is in the proto comment. This page shows the example as a JSON block without that comma. The Discovery text of the YAML example has lost its line breaks and indentation, so the YAML block is taken from the proto comment (`google/iam/v1/policy.proto`, https://github.com/googleapis/googleapis/blob/5ce024537af135bb2a0d3228072dd660047956aa/google/iam/v1/policy.proto, commit `5ce0245`, retrieved 2026-11-21).
- Corrected from the source proto: the type names of the examples in the `StandardSqlDataType` description lost their angle-bracket parameters in the Discovery document (shown as `ARRAY:`, `STRUCT>:` and `RANGE:`); the proto comment heads the examples with `ARRAY<STRING>:`, `STRUCT<x STRING, y ARRAY<DATE>>:` and `RANGE<DATE>:` (bullet markers omitted, backticks added) (`google/cloud/bigquery/v2/standard_sql.proto`, https://github.com/googleapis/googleapis/blob/5ce024537af135bb2a0d3228072dd660047956aa/google/cloud/bigquery/v2/standard_sql.proto, commit `5ce0245`, retrieved 2026-11-19).
- Corrected from the Discovery document: the `endpoint` example of `RemoteFunctionOptions` is `https://us-east1-my_gcf_project.cloudfunctions.net/remote_add`; a Google Cloud project ID contains only lowercase letters, digits and hyphens, so the example uses `my-gcf-project` (the remote-function examples of the GoogleSQL reference in this skill use `your-project` and `myproject`).
- Corrected from the Discovery document: the `mainClass` description of `SparkOptions` says "Exactly one of main_class and main_jar_uri field should be set for Java/Scala language type."; there is no `main_jar_uri` field in the Discovery document or the proto, and the `mainFileUri` description of the same message says "Exactly one of main_class and main_file_uri field should be set for Java/Scala language type." (`google/cloud/bigquery/v2/routine.proto`, https://github.com/googleapis/googleapis/blob/5ce024537af135bb2a0d3228072dd660047956aa/google/cloud/bigquery/v2/routine.proto, commit `5ce0245`, retrieved 2026-11-21). Both rows use the REST JSON field names `mainClass` and `mainFileUri`; `definition_body` in the `mainFileUri` description is `Routine.definitionBody`.
- Corrected from the Discovery document: the `queryResultsFormat` description of `QueryRequest` says the schema "will be provided in `QueryResponse.results_schema` field" and the first page "in `QueryResponse.results` field"; the same text is in the proto. In the proto, `results_schema` and `results` are the names of two `oneof` groups of `QueryResponse`, not fields: `oneof results_schema` has the single member `arrow_schema` ("Output only. Arrow schema") and `oneof results` has the single member `arrow_record_batch` ("Output only. Serialized row data in Arrow RecordBatch format."), which are `arrowSchema` and `arrowRecordBatch` in the `QueryResponse` table; both groups are marked "This feature is not yet available." (`google/cloud/bigquery/v2/job.proto`, https://github.com/googleapis/googleapis/blob/5ce024537af135bb2a0d3228072dd660047956aa/google/cloud/bigquery/v2/job.proto, commit `5ce0245`, retrieved 2026-11-21).
- Corrected from the Discovery document: the `creationTime` and `lastModifiedTime` descriptions of `RowAccessPolicy` read "The time when this row access policy was created, in milliseconds since the epoch." (likewise "was last modified"); the same text is in the REST reference (https://docs.cloud.google.com/bigquery/docs/reference/rest/v2/rowAccessPolicies, retrieved 2026-11-21) and the proto. The fields are `google.protobuf.Timestamp` in the proto (`google/cloud/bigquery/v2/row_access_policy.proto`, https://github.com/googleapis/googleapis/blob/5ce024537af135bb2a0d3228072dd660047956aa/google/cloud/bigquery/v2/row_access_policy.proto, commit `5ce0245`), `format: google-datetime` in the Discovery document, and the REST reference types them as a string in the `google.protobuf.Timestamp` format, so the JSON value is an RFC 3339 timestamp string (for example `2026-01-01T00:00:00Z`), not a number of milliseconds.
- Corrected from the Discovery document: the `TestIamPermissionsResponse.permissions` description reads "A subset of `TestPermissionsRequest.permissions` that the caller is allowed."; the same text is in the `google.iam.v1` proto, where the request message of `TestIamPermissions` is `TestIamPermissionsRequest` (`google/iam/v1/iam_policy.proto`, https://github.com/googleapis/googleapis/blob/5ce024537af135bb2a0d3228072dd660047956aa/google/iam/v1/iam_policy.proto, commit `5ce0245`, retrieved 2026-11-21).
- Deprecated: `JobStatistics2.modelTraining` (its Discovery description). The Discovery document states no replacement.
- Deprecated: `JobStatistics2.modelTrainingCurrentIteration` (its Discovery description). The Discovery document states no replacement.
- Deprecated: `JobStatistics2.modelTrainingExpectedTotalIteration` (its Discovery description). The Discovery document states no replacement.
- Deprecated: `JobStatistics2.reservationUsage` (`deprecated: true` in the Discovery document). Replacement or status stated in the description: "This field reported misleading information and will no longer be populated."
- Deprecated: `LoadQueryStatistics.bytesTransferred` (`deprecated: true` in the Discovery document and its description). Replacement or status stated in the description: "`transferred_bytes` has the canonical value for physical transferred bytes, which is used for BigQuery Omni billing." REST JSON field name: `transferredBytes` of [`JobStatistics2`](#jobstatistics2) (`transferred_bytes` in the description; it is not a field of this message; see Notes).
- Deprecated: `Model.bestTrialId` (`deprecated: true` in the Discovery document). The Discovery document states no replacement.
- Deprecated: `ModelDefinition.modelOptions` (its Discovery description). The Discovery document states no replacement.
- Deprecated: `ModelDefinition.trainingRuns` (its Discovery description). The Discovery document states no replacement.
- Deprecated: `QueryRequest.preserveNulls` (`deprecated: true` in the Discovery document and its description). The Discovery document states no replacement.
- Deprecated: `Table.model` (its Discovery description). The Discovery document states no replacement.
- Deprecated: `TableFieldSchema.categories` (its Discovery description). The Discovery document states no replacement.
- Deprecated: `TableFieldSchema.categories.names` (its Discovery description). The Discovery document states no replacement.
- Deprecated: `TimePartitioning.requirePartitionFilter` (`deprecated: true` in the Discovery document and its description). Replacement or status stated in the description: "This field is deprecated; please set the field with the same name on the table itself instead."
- Deprecated: `TrainingRun.trainingStartTime` (`deprecated: true` in the Discovery document). The Discovery document states no replacement.
- Mutually exclusive fields of `PrivacyPolicy`: `aggregationThresholdPolicy`, `differentialPrivacyPolicy` are the members of `oneof privacy_policy` in the proto (`google/cloud/bigquery/v2/privacy_policy.proto`, https://github.com/googleapis/googleapis/blob/5ce024537af135bb2a0d3228072dd660047956aa/google/cloud/bigquery/v2/privacy_policy.proto, commit `5ce0245`), so a message sets at most one of them. The Discovery document has no notation for `oneof` and lists them as independent fields.
- Mutually exclusive fields of `RemoteModelInfo`: `endpoint`, `remoteServiceType` are the members of `oneof remote_service` in the proto (`google/cloud/bigquery/v2/model.proto`, https://github.com/googleapis/googleapis/blob/5ce024537af135bb2a0d3228072dd660047956aa/google/cloud/bigquery/v2/model.proto, commit `5ce0245`), so a message sets at most one of them. The Discovery document has no notation for `oneof` and lists them as independent fields.
- Mutually exclusive fields of `StandardSqlDataType`: `arrayElementType`, `structType`, `rangeElementType` are the members of `oneof sub_type` in the proto (`google/cloud/bigquery/v2/standard_sql.proto`, https://github.com/googleapis/googleapis/blob/5ce024537af135bb2a0d3228072dd660047956aa/google/cloud/bigquery/v2/standard_sql.proto, commit `5ce0245`), so a message sets at most one of them. The Discovery document has no notation for `oneof` and lists them as independent fields.
- Mutually exclusive fields of `TrainingOptions`: `huggingFaceModelId`, `modelGardenModelName` are the members of `oneof external_model_id` in the proto (`google/cloud/bigquery/v2/model.proto`, https://github.com/googleapis/googleapis/blob/5ce024537af135bb2a0d3228072dd660047956aa/google/cloud/bigquery/v2/model.proto, commit `5ce0245`), so a message sets at most one of them. The Discovery document has no notation for `oneof` and lists them as independent fields.
- Source: https://bigquery.googleapis.com/$discovery/rest?version=v2 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
