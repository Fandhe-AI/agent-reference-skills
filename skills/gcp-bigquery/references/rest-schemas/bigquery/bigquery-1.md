---
source: https://bigquery.googleapis.com/$discovery/rest?version=v2
---

# BigQuery API message schemas (bigquery) (part 1/2)

## Signature / Usage

Message types referenced by the methods listed under `references/rest/bigquery/`.

### `AggregateClassificationMetrics`

- Aggregate metrics for classification/classifier models. For multi-class models, the metrics are either macro-averaged or micro-averaged. When macro-averaged, the metrics are calculated for each label and then an unweighted average is taken of those values. When micro-averaged, the metric is calculated globally by counting the total number of correctly predicted rows.
- Version: v2

### `AggregationThresholdPolicy`

- Represents privacy policy associated with "aggregation threshold" method.
- Version: v2

### `Argument`

- Input/output argument of a function or a stored procedure.
- Version: v2

### `ArimaCoefficients`

- Arima coefficients.
- Version: v2

### `ArimaFittingMetrics`

- ARIMA model fitting metrics.
- Version: v2

### `ArimaForecastingMetrics`

- Model evaluation metrics for ARIMA forecasting models.
- Version: v2

### `ArimaModelInfo`

- Arima model information.
- Version: v2

### `ArimaOrder`

- Arima order, can be used for both non-seasonal and seasonal parts.
- Version: v2

### `ArimaResult`

- (Auto-)arima fitting result. Wrap everything in ArimaResult for easier refactoring if we want to use model-specific iteration results.
- Version: v2

### `ArimaSingleModelForecastingMetrics`

- Model evaluation metrics for a single ARIMA forecasting model.
- Version: v2

### `ArrowRecordBatch`

- Arrow RecordBatch. This feature is not yet available.
- Version: v2

### `ArrowSchema`

- Arrow schema as specified in https://arrow.apache.org/docs/python/api/datatypes.html and serialized to bytes using IPC: https://arrow.apache.org/docs/format/Columnar.html#serialization-and-interprocess-communication-ipc See code samples on how this message can be deserialized. This feature is not yet available.
- Version: v2

### `ArrowSerializationOptions`

- Contains options specific to Arrow Serialization. This feature is not yet available.
- Version: v2

### `AuditConfig`

- Specifies the audit configuration for a service. The configuration determines which permission types are logged, and what identities, if any, are exempted from logging. An AuditConfig must have one or more AuditLogConfigs. If there are AuditConfigs for both `allServices` and a specific service, the union of the two AuditConfigs is used for that service: the log_types specified in each AuditConfig are enabled, and the exempted_members in each AuditLogConfig are exempted. Example Policy with multiple AuditConfigs: { "audit_configs": \[ { "service": "allServices", "audit_log_configs": \[ { "log_type": "DATA_READ", "exempted_members": \[ "user:jose@example.com" \] }, { "log_type": "DATA_WRITE" }, { "log_type": "ADMIN_READ" } \] }, { "service": "sampleservice.googleapis.com", "audit_log_configs": \[ { "log_type": "DATA_READ" }, { "log_type": "DATA_WRITE", "exempted_members": \[ "user:aliya@example.com" \] } \] } \] } For sampleservice, this policy enables DATA_READ, DATA_WRITE and ADMIN_READ logging. It also exempts `jose@example.com` from DATA_READ logging, and `aliya@example.com` from DATA_WRITE logging.
- Version: v2

### `AuditLogConfig`

- Provides the configuration for logging a type of permissions. Example: { "audit_log_configs": \[ { "log_type": "DATA_READ", "exempted_members": \[ "user:jose@example.com" \] }, { "log_type": "DATA_WRITE" } \] } This enables 'DATA_READ' and 'DATA_WRITE' logging, while exempting jose@example.com from DATA_READ logging.
- Version: v2

### `AvroOptions`

- Options for external data sources.
- Version: v2

### `BatchDeleteRowAccessPoliciesRequest`

- Request message for the BatchDeleteRowAccessPoliciesRequest method.
- Version: v2

### `BiEngineReason`

- Reason why BI Engine didn't accelerate the query (or sub-query).
- Version: v2

### `BiEngineStatistics`

- Statistics for a BI Engine specific query. Populated as part of JobStatistics2
- Version: v2

### `BigLakeConfiguration`

- Configuration for BigQuery tables for Apache Iceberg (formerly BigLake managed tables.)
- Version: v2

### `BigQueryModelTraining`

-
- Version: v2

### `BigtableColumn`

- Information related to a Bigtable column.
- Version: v2

### `BigtableColumnFamily`

- Information related to a Bigtable column family.
- Version: v2

### `BigtableOptions`

- Options specific to Google Cloud Bigtable data sources.
- Version: v2

### `BigtableProtoConfig`

- Information related to a Bigtable protobuf column.
- Version: v2

### `BinaryClassificationMetrics`

- Evaluation metrics for binary classification/classifier models.
- Version: v2

### `BinaryConfusionMatrix`

- Confusion matrix for binary classification models.
- Version: v2

### `Binding`

- Associates `members`, or principals, with a `role`.
- Version: v2

### `BqmlIterationResult`

-
- Version: v2

### `BqmlTrainingRun`

-
- Version: v2

### `CategoricalValue`

- Representative value of a categorical feature.
- Version: v2

### `CategoryCount`

- Represents the count of a single category within the cluster.
- Version: v2

### `CloneDefinition`

- Information about base table and clone time of a table clone.
- Version: v2

### `Cluster`

- Message containing the information about one cluster.
- Version: v2

### `ClusterInfo`

- Information about a single cluster for clustering model.
- Version: v2

### `Clustering`

- Configures table clustering.
- Version: v2

### `ClusteringMetrics`

- Evaluation metrics for clustering models.
- Version: v2

### `ConfusionMatrix`

- Confusion matrix for multi-class classification models.
- Version: v2

### `ConnectionProperty`

- A connection-level property to customize query behavior. Under JDBC, these correspond directly to connection properties passed to the DriverManager. Under ODBC, these correspond to properties in the connection string. Currently supported connection properties: \* \*\*dataset_project_id\*\*: represents the default project for datasets that are used in the query. Setting the system variable `@@dataset_project_id` achieves the same behavior. For more information about system variables, see: https://cloud.google.com/bigquery/docs/reference/system-variables \* \*\*time_zone\*\*: represents the default timezone used to run the query. \* \*\*session_id\*\*: associates the query with a given session. \* \*\*query_label\*\*: associates the query with a given job label. If set, all subsequent queries in a script or session will have this label. For the format in which a you can specify a query label, see labels in the JobConfiguration resource type: https://cloud.google.com/bigquery/docs/reference/rest/v2/Job#jobconfiguration \* \*\*service_account\*\*: indicates the service account to use to run a continuous query. If set, the query job uses the service account to access Google Cloud resources. Service account access is bounded by the IAM permissions that you have granted to the service account. Additional properties are allowed, but ignored. Specifying multiple connection properties with the same key returns an error.
- Version: v2

### `CsvOptions`

- Information related to a CSV data source.
- Version: v2

### `DataFormatOptions`

- Options for data format adjustments.
- Version: v2

### `DataMaskingStatistics`

- Statistics for data-masking.
- Version: v2

### `DataPolicyList`

- A list of data policy options. For more information, see Mask data by applying data policies to a column (https://docs.cloud.google.com/bigquery/docs/column-data-masking#data-policies-on-column).
- Version: v2

### `DataPolicyOption`

- Data policy option. For more information, see Mask data by applying data policies to a column (https://docs.cloud.google.com/bigquery/docs/column-data-masking#data-policies-on-column).
- Version: v2

### `DataSplitResult`

- Data split result. This contains references to the training and evaluation data tables that were used to train the model.
- Version: v2

### `Dataset`

- Represents a BigQuery dataset.
- Version: v2

### `DatasetAccessEntry`

- Grants all resources of particular types in a particular dataset read access to the current dataset. Similar to how individually authorized views work, updates to any resource granted through its dataset (including creation of new resources) requires read permission to referenced resources, plus write permission to the authorizing dataset.
- Version: v2

### `DatasetList`

- Response format for a page of results when listing datasets.
- Version: v2

### `DatasetReference`

- Identifier for a dataset.
- Version: v2

### `DestinationTableProperties`

- Properties for the destination table.
- Version: v2

### `DifferentialPrivacyPolicy`

- Represents privacy policy associated with "differential privacy" method.
- Version: v2

### `DimensionalityReductionMetrics`

- Model evaluation metrics for dimensionality reduction models.
- Version: v2

### `DmlStatistics`

- Detailed statistics for DML statements
- Version: v2

### `DoubleCandidates`

- Discrete candidates of a double hyperparameter.
- Version: v2

### `DoubleHparamSearchSpace`

- Search space for a double hyperparameter.
- Version: v2

### `DoubleRange`

- Range of a double hyperparameter.
- Version: v2

### `EncryptionConfiguration`

- Configuration for Cloud KMS encryption settings.
- Version: v2

### `Entry`

- A single entry in the confusion matrix.
- Version: v2

### `ErrorProto`

- Error details.
- Version: v2

### `EvaluationMetrics`

- Evaluation metrics of a model. These are either computed on all training data or just the eval data based on whether eval data was used during training. These are not present for imported models.
- Version: v2

### `ExplainQueryStage`

- A single stage of query execution.
- Version: v2

### `ExplainQueryStep`

- An operation within a stage.
- Version: v2

### `Explanation`

- Explanation for a single feature.
- Version: v2

### `ExportDataStatistics`

- Statistics for the EXPORT DATA statement as part of Query Job. EXTRACT JOB statistics are populated in JobStatistics4.
- Version: v2

### `Expr`

- Represents a textual expression in the Common Expression Language (CEL) syntax. CEL is a C-like expression language. The syntax and semantics of CEL are documented at https://github.com/google/cel-spec. Example (Comparison): title: "Summary size limit" description: "Determines if a summary is less than 100 chars" expression: "document.summary.size() < 100" Example (Equality): title: "Requestor is owner" description: "Determines if requestor is the document owner" expression: "document.owner == request.auth.claims.email" Example (Logic): title: "Public documents" description: "Determine whether the document should be publicly visible" expression: "document.type != 'private' && document.type != 'internal'" Example (Data Manipulation): title: "Notification string" description: "Create a notification string with a timestamp." expression: "'New message received at ' + string(document.create_time)" The exact variables and functions that may be referenced within an expression are determined by the service that evaluates it. See the service documentation for additional information.
- Version: v2

### `ExternalCatalogDatasetOptions`

- Options defining open source compatible datasets living in the BigQuery catalog. Contains metadata of open source database, schema, or namespace represented by the current dataset.
- Version: v2

### `ExternalCatalogTableOptions`

- Metadata about open source compatible table. The fields contained in these options correspond to Hive metastore's table-level properties.
- Version: v2

### `ExternalDataConfiguration`

-
- Version: v2

### `ExternalDatasetReference`

- Configures the access a dataset defined in an external metadata storage.
- Version: v2

### `ExternalRuntimeOptions`

- Options for the runtime of the external system.
- Version: v2

### `ExternalServiceCost`

- The external service cost is a portion of the total cost, these costs are not additive with total_bytes_billed. Moreover, this field only track external service costs that will show up as BigQuery costs (e.g. training BigQuery ML job with google cloud CAIP or Automl Tables services), not other costs which may be accrued by running the query (e.g. reading from Bigtable or Cloud Storage). The external service costs with different billing sku (e.g. CAIP job is charged based on VM usage) are converted to BigQuery billed_bytes and slot_ms with equivalent amount of US dollars. Services may not directly correlate to these metrics, but these are the equivalents for billing purposes. Output only.
- Version: v2

### `ExternalVolumeMount`

- Configuration of a volume mount for the Python UDF container that executes the managed function.
- Version: v2

### `FeatureValue`

- Representative value of a single feature within the cluster.
- Version: v2

### `ForeignTypeInfo`

- Metadata about the foreign data type definition such as the system in which the type is defined.
- Version: v2

### `ForeignViewDefinition`

- A view can be represented in multiple ways. Each representation has its own dialect. This message stores the metadata required for these representations.
- Version: v2

### `GenAiErrorStats`

- Provides error statistics for the query job across all AI function calls.
- Version: v2

### `GenAiFunctionCacheStats`

- Provides cache statistics for a GenAi function call.
- Version: v2

### `GenAiFunctionCostOptimizationStats`

- Provides cost optimization statistics for a GenAi function call.
- Version: v2

### `GenAiFunctionErrorStats`

- Provides error statistics for a GenAi function call.
- Version: v2

### `GenAiFunctionStats`

- Provides statistics for each Ai function call within a query.
- Version: v2

### `GenAiStats`

- GenAi stats for the query job.
- Version: v2

### `GeneratedColumn`

- Optional. Definition of how values are generated for the field. Only valid for top-level schema fields (not nested fields).
- Version: v2

### `GeneratedExpressionInfo`

- Definition of the expression used to generate the field.
- Version: v2

### `GetIamPolicyRequest`

- Request message for `GetIamPolicy` method.
- Version: v2

### `GetPolicyOptions`

- Encapsulates settings provided to GetIamPolicy.
- Version: v2

### `GetQueryResultsResponse`

- Response object of GetQueryResults.
- Version: v2

### `GetServiceAccountResponse`

- Response object of GetServiceAccount
- Version: v2

### `GlobalExplanation`

- Global explanations containing the top most important features after training.
- Version: v2

### `GoogleSheetsOptions`

- Options specific to Google Sheets data sources.
- Version: v2

### `HighCardinalityJoin`

- High cardinality join detailed information.
- Version: v2

### `HivePartitioningOptions`

- Options for configuring hive partitioning detect.
- Version: v2

### `HparamSearchSpaces`

- Hyperparameter search spaces. These should be a subset of training_options.
- Version: v2

### `HparamTuningTrial`

- Training info of a trial in hyperparameter tuning (https://cloud.google.com/bigquery-ml/docs/reference/standard-sql/bigqueryml-syntax-hp-tuning-overview) models.
- Version: v2

### `IncrementalResultStats`

- Statistics related to Incremental Query Results. Populated as part of JobStatistics2. This feature is not yet available.
- Version: v2

### `IndexPruningStats`

- Statistics for index pruning.
- Version: v2

### `IndexUnusedReason`

- Reason about why no search index was used in the search query (or sub-query).
- Version: v2

### `InputDataChange`

- Details about the input data change insight.
- Version: v2

### `IntArray`

- An array of int.
- Version: v2

### `IntArrayHparamSearchSpace`

- Search space for int array.
- Version: v2

### `IntCandidates`

- Discrete candidates of an int hyperparameter.
- Version: v2

### `IntHparamSearchSpace`

- Search space for an int hyperparameter.
- Version: v2

### `IntRange`

- Range of an int hyperparameter.
- Version: v2

### `IterationResult`

- Information about a single iteration of the training run.
- Version: v2

### `Job`

-
- Version: v2

### `JobCancelResponse`

- Describes format of a jobs cancellation response.
- Version: v2

### `JobConfiguration`

-
- Version: v2

### `JobConfigurationExtract`

- JobConfigurationExtract configures a job that exports data from a BigQuery table into Google Cloud Storage.
- Version: v2

### `JobConfigurationLoad`

- JobConfigurationLoad contains the configuration properties for loading data into a destination table.
- Version: v2

### `JobConfigurationQuery`

- JobConfigurationQuery configures a BigQuery query job.
- Version: v2

### `JobConfigurationTableCopy`

- JobConfigurationTableCopy configures a job that copies data from one table to another. For more information on copying tables, see Copy a table (https://cloud.google.com/bigquery/docs/managing-tables#copy-table).
- Version: v2

### `JobCreationReason`

- Reason about why a Job was created from a `jobs.query` (https://cloud.google.com/bigquery/docs/reference/rest/v2/jobs/query) method when used with `JOB_CREATION_OPTIONAL` Job creation mode. For `jobs.insert` (https://cloud.google.com/bigquery/docs/reference/rest/v2/jobs/insert) method calls it will always be `REQUESTED`.
- Version: v2

### `JobList`

- JobList is the response format for a jobs.list call.
- Version: v2

### `JobReference`

- A job reference is a fully qualified identifier for referring to a job.
- Version: v2

### `JobStatistics`

- Statistics for a single job execution.
- Version: v2

### `JobStatistics2`

- Statistics for a query job.
- Version: v2

### `JobStatistics3`

- Statistics for a load job.
- Version: v2

### Shape of `AggregateClassificationMetrics`

Generated from the Discovery schema (not in the official docs); values show each field type:

```json
{
  "accuracy": "number (double)",
  "f1Score": "number (double)",
  "logLoss": "number (double)",
  "precision": "number (double)",
  "recall": "number (double)",
  "rocAuc": "number (double)",
  "threshold": "number (double)"
}
```

### Example `AggregateClassificationMetrics` value

Generated from the field types (not in the official docs): a JSON value that matches the table, with empty strings, `0`, `false`, empty arrays and objects, and for an enum its first value other than `*_UNSPECIFIED`. int64 values are JSON strings, as in the Discovery `format`. It shows the JSON shape only; it is not a request to send as is (fill in the values the method needs, and omit output-only fields in requests).

```json
{
  "accuracy": 0,
  "f1Score": 0,
  "logLoss": 0,
  "precision": 0,
  "recall": 0,
  "rocAuc": 0,
  "threshold": 0
}
```

## Options / Props

### `AggregateClassificationMetrics` fields

| Field | Type | Description |
|---|---|---|
| `accuracy` | number (double) | Accuracy is the fraction of predictions given the correct label. For multiclass this is a micro-averaged metric. |
| `f1Score` | number (double) | The F1 score is an average of recall and precision. For multiclass this is a macro-averaged metric. |
| `logLoss` | number (double) | Logarithmic Loss. For multiclass this is a macro-averaged metric. |
| `precision` | number (double) | Precision is the fraction of actual positive predictions that had positive actual labels. For multiclass this is a macro-averaged metric treating each class as a binary classifier. |
| `recall` | number (double) | Recall is the fraction of actual positive labels that were given a positive prediction. For multiclass this is a macro-averaged metric. |
| `rocAuc` | number (double) | Area Under a ROC Curve. For multiclass this is a macro-averaged metric. |
| `threshold` | number (double) | Threshold at which the metrics are computed. For binary classification models this is the positive class threshold. For multi-class classification models this is the confidence threshold. |

### `AggregationThresholdPolicy` fields

| Field | Type | Description |
|---|---|---|
| `privacyUnitColumns` | `array<string>` | Optional. The privacy unit column(s) associated with this policy. For now, only one column per data source object (table, view) is allowed as a privacy unit column. Representing as a repeated field in metadata for extensibility to multiple columns in future. Duplicates and Repeated struct fields are not allowed. For nested fields, use dot notation ("outer.inner") |
| `threshold` | string (int64) | Optional. The threshold for the "aggregation threshold" policy. |

### `Argument` fields

| Field | Type | Description |
|---|---|---|
| `argumentKind` | string enum | Optional. Defaults to FIXED_TYPE. Values: `ARGUMENT_KIND_UNSPECIFIED`, `FIXED_TYPE`, `ANY_TYPE`, `FIXED_TABLE`, `ANY_TABLE`. |
| `dataType` | StandardSqlDataType | Set if argument_kind == FIXED_TYPE. |
| `isAggregate` | boolean | Optional. Whether the argument is an aggregate function parameter. Must be Unset for routine types other than AGGREGATE_FUNCTION. For AGGREGATE_FUNCTION, if set to false, it is equivalent to adding "NOT AGGREGATE" clause in DDL; Otherwise, it is equivalent to omitting "NOT AGGREGATE" clause in DDL. |
| `mode` | string enum | Optional. Specifies whether the argument is input or output. Can be set for procedures only. Values: `MODE_UNSPECIFIED`, `IN`, `OUT`, `INOUT`. |
| `name` | string | Optional. The name of this argument. Can be absent for function return argument. |
| `tableType` | StandardSqlTableType | Optional. Set if argument_kind == FIXED_TABLE. |

### `ArimaCoefficients` fields

| Field | Type | Description |
|---|---|---|
| `autoRegressiveCoefficients` | `array<number>` | Auto-regressive coefficients, an array of double. |
| `interceptCoefficient` | number (double) | Intercept coefficient, just a double not an array. |
| `movingAverageCoefficients` | `array<number>` | Moving-average coefficients, an array of double. |

### `ArimaFittingMetrics` fields

| Field | Type | Description |
|---|---|---|
| `aic` | number (double) | AIC. |
| `logLikelihood` | number (double) | Log-likelihood. |
| `variance` | number (double) | Variance. |

### `ArimaForecastingMetrics` fields

| Field | Type | Description |
|---|---|---|
| `arimaFittingMetrics` | `array<ArimaFittingMetrics>` | Arima model fitting metrics. Deprecated (`deprecated: true` in the Discovery document; see Notes). |
| `arimaSingleModelForecastingMetrics` | `array<ArimaSingleModelForecastingMetrics>` | Repeated as there can be many metric sets (one for each model) in auto-arima and the large-scale case. |
| `hasDrift` | `array<boolean>` | Whether Arima model fitted with drift or not. It is always false when d is not 1. Deprecated (`deprecated: true` in the Discovery document; see Notes). |
| `nonSeasonalOrder` | `array<ArimaOrder>` | Non-seasonal order. Deprecated (`deprecated: true` in the Discovery document; see Notes). |
| `seasonalPeriods` | `array<string>` | Seasonal periods. Repeated because multiple periods are supported for one time series. Deprecated (`deprecated: true` in the Discovery document; see Notes). Values: `SEASONAL_PERIOD_TYPE_UNSPECIFIED`, `NO_SEASONALITY`, `DAILY`, `WEEKLY`, `MONTHLY`, `QUARTERLY`, `YEARLY`, `HOURLY`. |
| `timeSeriesId` | `array<string>` | Id to differentiate different time series for the large-scale case. Deprecated (`deprecated: true` in the Discovery document; see Notes). |

### `ArimaModelInfo` fields

| Field | Type | Description |
|---|---|---|
| `arimaCoefficients` | ArimaCoefficients | Arima coefficients. |
| `arimaFittingMetrics` | ArimaFittingMetrics | Arima fitting metrics. |
| `hasDrift` | boolean | Whether Arima model fitted with drift or not. It is always false when d is not 1. |
| `hasHolidayEffect` | boolean | If true, holiday_effect is a part of time series decomposition result. |
| `hasSpikesAndDips` | boolean | If true, spikes_and_dips is a part of time series decomposition result. |
| `hasStepChanges` | boolean | If true, step_changes is a part of time series decomposition result. |
| `nonSeasonalOrder` | ArimaOrder | Non-seasonal order. |
| `seasonalPeriods` | `array<string>` | Seasonal periods. Repeated because multiple periods are supported for one time series. Values: `SEASONAL_PERIOD_TYPE_UNSPECIFIED`, `NO_SEASONALITY`, `DAILY`, `WEEKLY`, `MONTHLY`, `QUARTERLY`, `YEARLY`, `HOURLY`. |
| `timeSeriesId` | string | The time_series_id value for this time series. It will be one of the unique values from the time_series_id_column specified during ARIMA model training. Only present when time_series_id_column training option was used. |
| `timeSeriesIds` | `array<string>` | The tuple of time_series_ids identifying this time series. It will be one of the unique tuples of values present in the time_series_id_columns specified during ARIMA model training. Only present when time_series_id_columns training option was used and the order of values here are same as the order of time_series_id_columns. |

### `ArimaOrder` fields

| Field | Type | Description |
|---|---|---|
| `d` | string (int64) | Order of the differencing part. |
| `p` | string (int64) | Order of the autoregressive part. |
| `q` | string (int64) | Order of the moving-average part. |

### `ArimaResult` fields

| Field | Type | Description |
|---|---|---|
| `arimaModelInfo` | `array<ArimaModelInfo>` | This message is repeated because there are multiple arima models fitted in auto-arima. For non-auto-arima model, its size is one. |
| `seasonalPeriods` | `array<string>` | Seasonal periods. Repeated because multiple periods are supported for one time series. Values: `SEASONAL_PERIOD_TYPE_UNSPECIFIED`, `NO_SEASONALITY`, `DAILY`, `WEEKLY`, `MONTHLY`, `QUARTERLY`, `YEARLY`, `HOURLY`. |

### `ArimaSingleModelForecastingMetrics` fields

| Field | Type | Description |
|---|---|---|
| `arimaFittingMetrics` | ArimaFittingMetrics | Arima fitting metrics. |
| `hasDrift` | boolean | Is arima model fitted with drift or not. It is always false when d is not 1. |
| `hasHolidayEffect` | boolean | If true, holiday_effect is a part of time series decomposition result. |
| `hasSpikesAndDips` | boolean | If true, spikes_and_dips is a part of time series decomposition result. |
| `hasStepChanges` | boolean | If true, step_changes is a part of time series decomposition result. |
| `nonSeasonalOrder` | ArimaOrder | Non-seasonal order. |
| `seasonalPeriods` | `array<string>` | Seasonal periods. Repeated because multiple periods are supported for one time series. Values: `SEASONAL_PERIOD_TYPE_UNSPECIFIED`, `NO_SEASONALITY`, `DAILY`, `WEEKLY`, `MONTHLY`, `QUARTERLY`, `YEARLY`, `HOURLY`. |
| `timeSeriesId` | string | The time_series_id value for this time series. It will be one of the unique values from the time_series_id_column specified during ARIMA model training. Only present when time_series_id_column training option was used. |
| `timeSeriesIds` | `array<string>` | The tuple of time_series_ids identifying this time series. It will be one of the unique tuples of values present in the time_series_id_columns specified during ARIMA model training. Only present when time_series_id_columns training option was used and the order of values here are same as the order of time_series_id_columns. |

### `ArrowRecordBatch` fields

| Field | Type | Description |
|---|---|---|
| `serializedRecordBatch` | string (byte) | IPC-serialized Arrow RecordBatch. |

### `ArrowSchema` fields

| Field | Type | Description |
|---|---|---|
| `serializedSchema` | string (byte) | IPC serialized Arrow schema. |

### `ArrowSerializationOptions` fields

| Field | Type | Description |
|---|---|---|
| `bufferCompression` | string enum | The compression codec to use for Arrow buffers in serialized record batches. Values: `COMPRESSION_UNSPECIFIED`, `LZ4_FRAME`, `ZSTD`. |
| `picosTimestampPrecision` | string enum | Optional. Set timestamp precision option. If not set, the default precision is microseconds. Values: `PICOS_TIMESTAMP_PRECISION_UNSPECIFIED`, `TIMESTAMP_PRECISION_MICROS`, `TIMESTAMP_PRECISION_NANOS`, `TIMESTAMP_PRECISION_PICOS`. |

### `AuditConfig` fields

| Field | Type | Description |
|---|---|---|
| `auditLogConfigs` | `array<AuditLogConfig>` | The configuration for logging of each type of permission. |
| `service` | string | Specifies a service that will be enabled for audit logging. For example, `storage.googleapis.com`, `cloudsql.googleapis.com`. `allServices` is a special value that covers all services. |

### `AuditLogConfig` fields

| Field | Type | Description |
|---|---|---|
| `exemptedMembers` | `array<string>` | Specifies the identities that do not cause logging for this type of permission. Follows the same format of Binding.members. |
| `logType` | string enum | The log type that this config enables. Values: `LOG_TYPE_UNSPECIFIED`, `ADMIN_READ`, `DATA_WRITE`, `DATA_READ`. |

### `AvroOptions` fields

| Field | Type | Description |
|---|---|---|
| `useAvroLogicalTypes` | boolean | Optional. If sourceFormat is set to "AVRO", indicates whether to interpret logical types as the corresponding BigQuery data type (for example, TIMESTAMP), instead of using the raw type (for example, INTEGER). |

### `BatchDeleteRowAccessPoliciesRequest` fields

| Field | Type | Description |
|---|---|---|
| `force` | boolean | If set to true, it deletes the row access policy even if it's the last row access policy on the table and the deletion will widen the access rather narrowing it. |
| `policyIds` | `array<string>` | Required. Policy IDs of the row access policies. |

### `BiEngineReason` fields

| Field | Type | Description |
|---|---|---|
| `code` | string enum | Output only. High-level BI Engine reason for partial or disabled acceleration Values: `CODE_UNSPECIFIED`, `NO_RESERVATION`, `INSUFFICIENT_RESERVATION`, `UNSUPPORTED_SQL_TEXT`, `INPUT_TOO_LARGE`, `OTHER_REASON`, `TABLE_EXCLUDED`. |
| `message` | string | Output only. Free form human-readable reason for partial or disabled acceleration. |

### `BiEngineStatistics` fields

| Field | Type | Description |
|---|---|---|
| `accelerationMode` | string enum | Output only. Specifies which mode of BI Engine acceleration was performed (if any). Values: `BI_ENGINE_ACCELERATION_MODE_UNSPECIFIED`, `BI_ENGINE_DISABLED`, `PARTIAL_INPUT`, `FULL_INPUT`, `FULL_QUERY`. |
| `biEngineMode` | string enum | Output only. Specifies which mode of BI Engine acceleration was performed (if any). Values: `ACCELERATION_MODE_UNSPECIFIED`, `DISABLED`, `PARTIAL`, `FULL`. |
| `biEngineReasons` | `array<BiEngineReason>` | In case of DISABLED or PARTIAL bi_engine_mode, these contain the explanatory reasons as to why BI Engine could not accelerate. In case the full query was accelerated, this field is not populated. |

### `BigLakeConfiguration` fields

| Field | Type | Description |
|---|---|---|
| `connectionId` | string | Optional. The connection specifying the credentials to be used to read and write to external storage, such as Cloud Storage. The connection_id can have the form `{project}.{location}.{connection_id}` or \`projects/{project}/locations/{location}/connections/{connection_id}". |
| `fileFormat` | string enum | Optional. The file format the table data is stored in. Values: `FILE_FORMAT_UNSPECIFIED`, `PARQUET`. |
| `storageUri` | string | Optional. The fully qualified location prefix of the external folder where table data is stored. The '\*' wildcard character is not allowed. The URI should be in the format `gs://bucket/path_to_table/` |
| `tableFormat` | string enum | Optional. The table format the metadata only snapshots are stored in. Values: `TABLE_FORMAT_UNSPECIFIED`, `ICEBERG`. |

### `BigQueryModelTraining` fields

| Field | Type | Description |
|---|---|---|
| `currentIteration` | integer (int32) | Deprecated. |
| `expectedTotalIterations` | string (int64) | Deprecated. |

### `BigtableColumn` fields

| Field | Type | Description |
|---|---|---|
| `encoding` | string | Optional. The encoding of the values when the type is not STRING. Acceptable encoding values are: TEXT - indicates values are alphanumeric text strings. BINARY - indicates values are encoded using HBase Bytes.toBytes family of functions. PROTO_BINARY - indicates values are encoded using serialized proto messages. This can only be used in combination with JSON type. 'encoding' can also be set at the column family level. However, the setting at this level takes precedence if 'encoding' is set at both levels. |
| `fieldName` | string | Optional. If the qualifier is not a valid BigQuery field identifier i.e. does not match `[a-zA-Z][a-zA-Z0-9_]*` (restored from the source proto; see Notes), a valid identifier must be provided as the column field name and is used as field name in queries. |
| `onlyReadLatest` | boolean | Optional. If this is set, only the latest version of value in this column are exposed. 'onlyReadLatest' can also be set at the column family level. However, the setting at this level takes precedence if 'onlyReadLatest' is set at both levels. |
| `protoConfig` | BigtableProtoConfig | Optional. Protobuf-specific configurations, only takes effect when the encoding is PROTO_BINARY. |
| `qualifierEncoded` | string (byte) | \[Required\] Qualifier of the column. Columns in the parent column family that has this exact qualifier are exposed as `<family field name>.<column field name>` field (placeholders restored from the source proto; see Notes). If the qualifier is valid UTF-8 string, it can be specified in the qualifier_string field. Otherwise, a base-64 encoded value must be set to qualifier_encoded. The column field name is the same as the column qualifier. However, if the qualifier is not a valid BigQuery field identifier i.e. does not match `[a-zA-Z][a-zA-Z0-9_]*` (restored from the source proto; see Notes), a valid identifier must be provided as field_name. |
| `qualifierString` | string | Qualifier string. |
| `type` | string | Optional. The type to convert the value in cells of this column. The values are expected to be encoded using HBase Bytes.toBytes function when using the BINARY encoding value. Following BigQuery types are allowed (case-sensitive): \* BYTES \* STRING \* INTEGER \* FLOAT \* BOOLEAN \* JSON Default type is BYTES. 'type' can also be set at the column family level. However, the setting at this level takes precedence if 'type' is set at both levels. |

### `BigtableColumnFamily` fields

| Field | Type | Description |
|---|---|---|
| `columns` | `array<BigtableColumn>` | Optional. Lists of columns that should be exposed as individual fields as opposed to a list of (column name, value) pairs. All columns whose qualifier matches a qualifier in this list can be accessed as `<family field name>.<column field name>`. Other columns can be accessed as a list through the `<family field name>.Column` field (placeholders restored from the source proto; see Notes). |
| `encoding` | string | Optional. The encoding of the values when the type is not STRING. Acceptable encoding values are: TEXT - indicates values are alphanumeric text strings. BINARY - indicates values are encoded using HBase Bytes.toBytes family of functions. PROTO_BINARY - indicates values are encoded using serialized proto messages. This can only be used in combination with JSON type. This can be overridden for a specific column by listing that column in 'columns' and specifying an encoding for it. |
| `familyId` | string | Identifier of the column family. |
| `onlyReadLatest` | boolean | Optional. If this is set only the latest version of value are exposed for all columns in this column family. This can be overridden for a specific column by listing that column in 'columns' and specifying a different setting for that column. |
| `protoConfig` | BigtableProtoConfig | Optional. Protobuf-specific configurations, only takes effect when the encoding is PROTO_BINARY. |
| `type` | string | Optional. The type to convert the value in cells of this column family. The values are expected to be encoded using HBase Bytes.toBytes function when using the BINARY encoding value. Following BigQuery types are allowed (case-sensitive): \* BYTES \* STRING \* INTEGER \* FLOAT \* BOOLEAN \* JSON Default type is BYTES. This can be overridden for a specific column by listing that column in 'columns' and specifying a type for it. |

### `BigtableOptions` fields

| Field | Type | Description |
|---|---|---|
| `columnFamilies` | `array<BigtableColumnFamily>` | Optional. List of column families to expose in the table schema along with their types. This list restricts the column families that can be referenced in queries and specifies their value types. You can use this list to do type conversions - see the 'type' field for more details. If you leave this list empty, all column families are present in the table schema and their values are read as BYTES. During a query only the column families referenced in that query are read from Bigtable. |
| `ignoreUnspecifiedColumnFamilies` | boolean | Optional. If field is true, then the column families that are not specified in columnFamilies list are not exposed in the table schema. Otherwise, they are read with BYTES type values. The default value is false. |
| `outputColumnFamiliesAsJson` | boolean | Optional. If field is true, then each column family will be read as a single JSON column. Otherwise they are read as a repeated cell structure containing timestamp/value tuples. The default value is false. |
| `readRowkeyAsString` | boolean | Optional. If field is true, then the rowkey column families will be read and converted to string. Otherwise they are read with BYTES type values and users need to manually cast them with CAST if necessary. The default value is false. |

### `BigtableProtoConfig` fields

| Field | Type | Description |
|---|---|---|
| `protoMessageName` | string | Optional. The fully qualified proto message name of the protobuf. In the format of "foo.bar.Message". |
| `schemaBundleId` | string | Optional. The ID of the Bigtable SchemaBundle resource associated with this protobuf. The ID should be referred to within the parent table, e.g., `foo` rather than `projects/{project}/instances/{instance}/tables/{table}/schemaBundles/foo`. See more details on Bigtable SchemaBundles (https://docs.cloud.google.com/bigtable/docs/create-manage-protobuf-schemas). |

### `BinaryClassificationMetrics` fields

| Field | Type | Description |
|---|---|---|
| `aggregateClassificationMetrics` | AggregateClassificationMetrics | Aggregate classification metrics. |
| `binaryConfusionMatrixList` | `array<BinaryConfusionMatrix>` | Binary confusion matrix at multiple thresholds. |
| `negativeLabel` | string | Label representing the negative class. |
| `positiveLabel` | string | Label representing the positive class. |

### `BinaryConfusionMatrix` fields

| Field | Type | Description |
|---|---|---|
| `accuracy` | number (double) | The fraction of predictions given the correct label. |
| `f1Score` | number (double) | The equally weighted average of recall and precision. |
| `falseNegatives` | string (int64) | Number of false samples predicted as false. |
| `falsePositives` | string (int64) | Number of false samples predicted as true. |
| `positiveClassThreshold` | number (double) | Threshold value used when computing each of the following metric. |
| `precision` | number (double) | The fraction of actual positive predictions that had positive actual labels. |
| `recall` | number (double) | The fraction of actual positive labels that were given a positive prediction. |
| `trueNegatives` | string (int64) | Number of true samples predicted as false. |
| `truePositives` | string (int64) | Number of true samples predicted as true. |

### `Binding` fields

| Field | Type | Description |
|---|---|---|
| `condition` | Expr | The condition that is associated with this binding. If the condition evaluates to `true`, then this binding applies to the current request. If the condition evaluates to `false`, then this binding does not apply to the current request. However, a different role binding might grant the same role to one or more of the principals in this binding. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |
| `members` | `array<string>` | Specifies the principals requesting access for a Google Cloud resource. `members` can have the following values: \* `allUsers`: A special identifier that represents anyone who is on the internet; with or without a Google account. \* `allAuthenticatedUsers`: A special identifier that represents anyone who is authenticated with a Google account or a service account. Does not include identities that come from external identity providers (IdPs) through identity federation. \* `user:{emailid}`: An email address that represents a specific Google account. For example, `alice@example.com` . \* `serviceAccount:{emailid}`: An email address that represents a Google service account. For example, `my-other-app@appspot.gserviceaccount.com`. \* `serviceAccount:{projectid}.svc.id.goog[{namespace}/{kubernetes-sa}]`: An identifier for a Kubernetes service account (https://cloud.google.com/kubernetes-engine/docs/how-to/kubernetes-service-accounts). For example, `my-project.svc.id.goog[my-namespace/my-kubernetes-sa]`. \* `group:{emailid}`: An email address that represents a Google group. For example, `admins@example.com`. \* `domain:{domain}`: The G Suite domain (primary) that represents all the users of that domain. For example, `google.com` or `example.com`. \* `principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workforce identity pool. \* `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/group/{group_id}`: All workforce identities in a group. \* `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All workforce identities with a specific attribute value. \* `principalSet://iam.googleapis.com/locations/global/workforcePools/{pool_id}/*`: All identities in a workforce identity pool. \* `principal://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/subject/{subject_attribute_value}`: A single identity in a workload identity pool. \* `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/group/{group_id}`: A workload identity pool group. \* `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/attribute.{attribute_name}/{attribute_value}`: All identities in a workload identity pool with a certain attribute. \* `principalSet://iam.googleapis.com/projects/{project_number}/locations/global/workloadIdentityPools/{pool_id}/*`: All identities in a workload identity pool. \* `deleted:user:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a user that has been recently deleted. For example, `alice@example.com?uid=123456789012345678901`. If the user is recovered, this value reverts to `user:{emailid}` and the recovered user retains the role in the binding. \* `deleted:serviceAccount:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a service account that has been recently deleted. For example, `my-other-app@appspot.gserviceaccount.com?uid=123456789012345678901`. If the service account is undeleted, this value reverts to `serviceAccount:{emailid}` and the undeleted service account retains the role in the binding. \* `deleted:group:{emailid}?uid={uniqueid}`: An email address (plus unique identifier) representing a Google group that has been recently deleted. For example, `admins@example.com?uid=123456789012345678901`. If the group is recovered, this value reverts to `group:{emailid}` and the recovered group retains the role in the binding. \* `deleted:principal://iam.googleapis.com/locations/global/workforcePools/{pool_id}/subject/{subject_attribute_value}`: Deleted single identity in a workforce identity pool. For example, `deleted:principal://iam.googleapis.com/locations/global/workforcePools/my-pool-id/subject/my-subject-attribute-value`. |
| `role` | string | Role that is assigned to the list of `members`, or principals. For example, `roles/viewer`, `roles/editor`, or `roles/owner`. For an overview of the IAM roles and permissions, see the IAM documentation (https://cloud.google.com/iam/docs/roles-overview). For a list of the available pre-defined roles, see here (https://cloud.google.com/iam/docs/understanding-roles). |

### `BqmlIterationResult` fields

| Field | Type | Description |
|---|---|---|
| `durationMs` | string (int64) | Deprecated. |
| `evalLoss` | number (double) | Deprecated. |
| `index` | integer (int32) | Deprecated. |
| `learnRate` | number (double) | Deprecated. |
| `trainingLoss` | number (double) | Deprecated. |

### `BqmlTrainingRun` fields

| Field | Type | Description |
|---|---|---|
| `iterationResults` | `array<BqmlIterationResult>` | Deprecated. |
| `startTime` | string (date-time) | Deprecated. |
| `state` | string | Deprecated. |
| `trainingOptions` | object | Deprecated. |
| `trainingOptions.earlyStop` | boolean | — |
| `trainingOptions.l1Reg` | number (double) | — |
| `trainingOptions.l2Reg` | number (double) | — |
| `trainingOptions.learnRate` | number (double) | — |
| `trainingOptions.learnRateStrategy` | string | — |
| `trainingOptions.lineSearchInitLearnRate` | number (double) | — |
| `trainingOptions.maxIteration` | string (int64) | — |
| `trainingOptions.minRelProgress` | number (double) | — |
| `trainingOptions.warmStart` | boolean | — |

### `CategoricalValue` fields

| Field | Type | Description |
|---|---|---|
| `categoryCounts` | `array<CategoryCount>` | Counts of all categories for the categorical feature. If there are more than ten categories, we return top ten (by count) and return one more CategoryCount with category "\_OTHER\_" and count as aggregate counts of remaining categories. |

### `CategoryCount` fields

| Field | Type | Description |
|---|---|---|
| `category` | string | The name of category. |
| `count` | string (int64) | The count of training samples matching the category within the cluster. |

### `CloneDefinition` fields

| Field | Type | Description |
|---|---|---|
| `baseTableReference` | TableReference | Required. Reference describing the ID of the table that was cloned. |
| `cloneTime` | string (date-time) | Required. The time at which the base table was cloned. This value is reported in the JSON response using RFC3339 format. |

### `Cluster` fields

| Field | Type | Description |
|---|---|---|
| `centroidId` | string (int64) | Centroid id. |
| `count` | string (int64) | Count of training data rows that were assigned to this cluster. |
| `featureValues` | `array<FeatureValue>` | Values of highly variant features for this cluster. |

### `ClusterInfo` fields

| Field | Type | Description |
|---|---|---|
| `centroidId` | string (int64) | Centroid id. |
| `clusterRadius` | number (double) | Cluster radius, the average distance from centroid to each point assigned to the cluster. |
| `clusterSize` | string (int64) | Cluster size, the total number of points assigned to the cluster. |

### `Clustering` fields

| Field | Type | Description |
|---|---|---|
| `fields` | `array<string>` | One or more fields on which data should be clustered. Only top-level, non-repeated, simple-type fields are supported. The ordering of the clustering fields should be prioritized from most to least important for filtering purposes. For additional information, see Introduction to clustered tables (https://cloud.google.com/bigquery/docs/clustered-tables#limitations). |

### `ClusteringMetrics` fields

| Field | Type | Description |
|---|---|---|
| `clusters` | `array<Cluster>` | Information for all clusters. |
| `daviesBouldinIndex` | number (double) | Davies-Bouldin index. |
| `meanSquaredDistance` | number (double) | Mean of squared distances between each sample to its cluster centroid. |

### `ConfusionMatrix` fields

| Field | Type | Description |
|---|---|---|
| `confidenceThreshold` | number (double) | Confidence threshold used when computing the entries of the confusion matrix. |
| `rows` | `array<Row>` | One row per actual label. |

### `ConnectionProperty` fields

| Field | Type | Description |
|---|---|---|
| `key` | string | The key of the property to set. |
| `value` | string | The value of the property to set. |

### `CsvOptions` fields

| Field | Type | Description |
|---|---|---|
| `allowJaggedRows` | boolean | Optional. Indicates if BigQuery should accept rows that are missing trailing optional columns. If true, BigQuery treats missing trailing columns as null values. If false, records with missing trailing columns are treated as bad records, and if there are too many bad records, an invalid error is returned in the job result. The default value is false. |
| `allowQuotedNewlines` | boolean | Optional. Indicates if BigQuery should allow quoted data sections that contain newline characters in a CSV file. The default value is false. |
| `encoding` | string | Optional. The character encoding of the data. The supported values are UTF-8, ISO-8859-1, UTF-16BE, UTF-16LE, UTF-32BE, and UTF-32LE. The default value is UTF-8. BigQuery decodes the data after the raw, binary data has been split using the values of the quote and fieldDelimiter properties. |
| `fieldDelimiter` | string | Optional. The separator character for fields in a CSV file. The separator is interpreted as a single byte. For files encoded in ISO-8859-1, any single character can be used as a separator. For files encoded in UTF-8, characters represented in decimal range 1-127 (U+0001-U+007F) can be used without any modification. UTF-8 characters encoded with multiple bytes (i.e. U+0080 and above) will have only the first byte used for separating fields. The remaining bytes will be treated as a part of the field. BigQuery also supports the escape sequence "\t" (U+0009) to specify a tab separator. The default value is comma (",", U+002C). |
| `nullMarker` | string | Optional. Specifies a string that represents a null value in a CSV file. For example, if you specify "\N", BigQuery interprets "\N" as a null value when querying a CSV file. The default value is the empty string. If you set this property to a custom value, BigQuery throws an error if an empty string is present for all data types except for STRING and BYTE. For STRING and BYTE columns, BigQuery interprets the empty string as an empty value. |
| `nullMarkers` | `array<string>` | Optional. A list of strings represented as SQL NULL value in a CSV file. null_marker and null_markers can't be set at the same time. If null_marker is set, null_markers has to be not set. If null_markers is set, null_marker has to be not set. If both null_marker and null_markers are set at the same time, a user error would be thrown. Any strings listed in null_markers, including empty string would be interpreted as SQL NULL. This applies to all column types. |
| `preserveAsciiControlCharacters` | boolean | Optional. Indicates if the embedded ASCII control characters (the first 32 characters in the ASCII-table, from '\x00' to '\x1F') are preserved. |
| `quote` | string | Optional. The value that is used to quote data sections in a CSV file. BigQuery converts the string to ISO-8859-1 encoding, and then uses the first byte of the encoded string to split the data in its raw, binary state. The default value is a double-quote ("). If your data does not contain quoted sections, set the property value to an empty string. If your data contains quoted newline characters, you must also set the allowQuotedNewlines property to true. To include the specific quote character within a quoted value, precede it with an additional matching quote character. For example, if you want to escape the default character ' " ', use ' "" '. |
| `skipLeadingRows` | string (int64) | Optional. The number of rows at the top of a CSV file that BigQuery will skip when reading the data. The default value is 0. This property is useful if you have header rows in the file that should be skipped. When autodetect is on, the behavior is the following: \* skipLeadingRows unspecified - Autodetect tries to detect headers in the first row. If they are not detected, the row is read as data. Otherwise data is read starting from the second row. \* skipLeadingRows is 0 - Instructs autodetect that there are no headers and data should be read starting from the first row. \* skipLeadingRows = N > 0 - Autodetect skips N-1 rows and tries to detect headers in row N. If headers are not detected, row N is just skipped. Otherwise row N is used to extract column names for the detected schema. |
| `sourceColumnMatch` | string | Optional. Controls the strategy used to match loaded columns to the schema. If not set, a sensible default is chosen based on how the schema is provided. If autodetect is used, then columns are matched by name. Otherwise, columns are matched by position. This is done to keep the behavior backward-compatible. Acceptable values are: POSITION - matches by position. This assumes that the columns are ordered the same way as the schema. NAME - matches by name. This reads the header row as column names and reorders columns to match the field names in the schema. |

### `DataFormatOptions` fields

| Field | Type | Description |
|---|---|---|
| `timestampOutputFormat` | string enum | Optional. The API output format for a timestamp. This offers more explicit control over the timestamp output format as compared to the existing `use_int64_timestamp` option. Values: `TIMESTAMP_OUTPUT_FORMAT_UNSPECIFIED`, `FLOAT64`, `INT64`, `ISO8601_STRING`. |
| `useInt64Timestamp` | boolean | Optional. Output timestamp as usec int64. Default is false. |

### `DataMaskingStatistics` fields

| Field | Type | Description |
|---|---|---|
| `dataMaskingApplied` | boolean | Whether any accessed data was protected by the data masking. |

### `DataPolicyList` fields

| Field | Type | Description |
|---|---|---|
| `dataPolicies` | `array<DataPolicyOption>` | Contains a list of data policy options. At most 9 data policies are allowed per field. |

### `DataPolicyOption` fields

| Field | Type | Description |
|---|---|---|
| `name` | string | Data policy resource name in the form of projects/project_id/locations/location_id/dataPolicies/data_policy_id. |

### `DataSplitResult` fields

| Field | Type | Description |
|---|---|---|
| `evaluationTable` | TableReference | Table reference of the evaluation data after split. |
| `testTable` | TableReference | Table reference of the test data after split. |
| `trainingTable` | TableReference | Table reference of the training data after split. |

### `Dataset` fields

| Field | Type | Description |
|---|---|---|
| `access` | `array<object>` | Optional. An array of objects that define dataset access for one or more entities. You can set this property when inserting or updating a dataset in order to control who is allowed to access the data. If unspecified at dataset creation time, BigQuery adds default dataset access for the following entities: access.specialGroup: projectReaders; access.role: READER; access.specialGroup: projectWriters; access.role: WRITER; access.specialGroup: projectOwners; access.role: OWNER; access.userByEmail: \[dataset creator email\]; access.role: OWNER; If you patch a dataset, then this field is overwritten by the patched dataset's access field. To add entities, you must supply the entire existing access array in addition to any new entities that you want to add. |
| `access[].condition` | Expr | Optional. condition for the binding. If CEL expression in this field is true, this access binding will be considered |
| `access[].dataset` | DatasetAccessEntry | \[Pick one\] A grant authorizing all resources of a particular type in a particular dataset access to this dataset. Only views are supported for now. The role field is not required when this field is set. If that dataset is deleted and re-created, its access needs to be granted again via an update operation. |
| `access[].domain` | string | \[Pick one\] A domain to grant access to. Any users signed in with the domain specified will be granted the specified access. Example: "example.com". Maps to IAM policy member "domain:DOMAIN". |
| `access[].groupByEmail` | string | \[Pick one\] An email address of a Google Group to grant access to. Maps to IAM policy member "group:GROUP". |
| `access[].iamMember` | string | \[Pick one\] Some other type of member that appears in the IAM Policy but isn't a user, group, domain, or special group. |
| `access[].role` | string | An IAM role ID that should be granted to the user, group, or domain specified in this access entry. The following legacy mappings will be applied: \* `OWNER`: `roles/bigquery.dataOwner` \* `WRITER`: `roles/bigquery.dataEditor` \* `READER`: `roles/bigquery.dataViewer` This field will accept any of the above formats, but will return only the legacy format. For example, if you set this field to "roles/bigquery.dataOwner", it will be returned back as "OWNER". |
| `access[].routine` | RoutineReference | \[Pick one\] A routine from a different dataset to grant access to. Queries executed against that routine will have read access to views/tables/routines in this dataset. Only UDF is supported for now. The role field is not required when this field is set. If that routine is updated by any user, access to the routine needs to be granted again via an update operation. |
| `access[].specialGroup` | string | \[Pick one\] A special group to grant access to. Possible values include: \* projectOwners: Owners of the enclosing project. \* projectReaders: Readers of the enclosing project. \* projectWriters: Writers of the enclosing project. \* allAuthenticatedUsers: All authenticated BigQuery users. Maps to similarly-named IAM members. |
| `access[].userByEmail` | string | \[Pick one\] An email address of a user to grant access to. For example: fred@example.com. Maps to IAM policy member "user:EMAIL" or "serviceAccount:EMAIL". |
| `access[].view` | TableReference | \[Pick one\] A view from a different dataset to grant access to. Queries executed against that view will have read access to views/tables/routines in this dataset. The role field is not required when this field is set. If that view is updated by any user, access to the view needs to be granted again via an update operation. |
| `catalogSource` | string | Output only. The origin of the dataset, one of: \* (Unset) - Native BigQuery Dataset \* BIGLAKE - Dataset is backed by a namespace stored natively in Biglake |
| `creationTime` | string (int64) | Output only. The time when this dataset was created, in milliseconds since the epoch. |
| `datasetReference` | DatasetReference | Required. A reference that identifies the dataset. |
| `defaultCollation` | string | Optional. Defines the default collation specification of future tables created in the dataset. If a table is created in this dataset without table-level default collation, then the table inherits the dataset default collation, which is applied to the string fields that do not have explicit collation specified. A change to this field affects only tables created afterwards, and does not alter the existing tables. The following values are supported: \* 'und:ci': undetermined locale, case insensitive. \* '': empty string. Default to case-sensitive behavior. |
| `defaultEncryptionConfiguration` | EncryptionConfiguration | The default encryption key for all tables in the dataset. After this property is set, the encryption key of all newly-created tables in the dataset is set to this value unless the table creation request or query explicitly overrides the key. |
| `defaultPartitionExpirationMs` | string (int64) | This default partition expiration, expressed in milliseconds. When new time-partitioned tables are created in a dataset where this property is set, the table will inherit this value, propagated as the `TimePartitioning.expirationMs` property on the new table. If you set `TimePartitioning.expirationMs` explicitly when creating a table, the `defaultPartitionExpirationMs` of the containing dataset is ignored. When creating a partitioned table, if `defaultPartitionExpirationMs` is set, the `defaultTableExpirationMs` value is ignored and the table will not be inherit a table expiration deadline. |
| `defaultRoundingMode` | string enum | Optional. Defines the default rounding mode specification of new tables created within this dataset. During table creation, if this field is specified, the table within this dataset will inherit the default rounding mode of the dataset. Setting the default rounding mode on a table overrides this option. Existing tables in the dataset are unaffected. If columns are defined during that table creation, they will immediately inherit the table's default rounding mode, unless otherwise specified. Values: `ROUNDING_MODE_UNSPECIFIED`, `ROUND_HALF_AWAY_FROM_ZERO`, `ROUND_HALF_EVEN`. |
| `defaultTableExpirationMs` | string (int64) | Optional. The default lifetime of all tables in the dataset, in milliseconds. The minimum lifetime value is 3600000 milliseconds (one hour). To clear an existing default expiration with a PATCH request, set to 0. Once this property is set, all newly-created tables in the dataset will have an expirationTime property set to the creation time plus the value in this property, and changing the value will only affect new tables, not existing ones. When the expirationTime for a given table is reached, that table will be deleted automatically. If a table's expirationTime is modified or removed before the table expires, or if you provide an explicit expirationTime when creating a table, that value takes precedence over the default expiration time indicated by this property. |
| `description` | string | Optional. A user-friendly description of the dataset. |
| `etag` | string | Output only. A hash of the resource. |
| `externalCatalogDatasetOptions` | ExternalCatalogDatasetOptions | Optional. Options defining open source compatible datasets living in the BigQuery catalog. Contains metadata of open source database, schema or namespace represented by the current dataset. |
| `externalDatasetReference` | ExternalDatasetReference | Optional. Reference to a read-only external dataset defined in data catalogs outside of BigQuery. Filled out when the dataset type is EXTERNAL. |
| `friendlyName` | string | Optional. A descriptive name for the dataset. |
| `id` | string | Output only. The fully-qualified unique name of the dataset in the format projectId:datasetId. The dataset name without the project name is given in the datasetId field. When creating a new dataset, leave this field blank, and instead specify the datasetId field. |
| `isCaseInsensitive` | boolean | Optional. TRUE if the dataset and its table names are case-insensitive, otherwise FALSE. By default, this is FALSE, which means the dataset and its table names are case-sensitive. This field does not affect routine references. |
| `kind` | string | Output only. The resource type. |
| `labels` | `map<string, string>` | The labels associated with this dataset. You can use these to organize and group your datasets. You can set this property when inserting or updating a dataset. See Creating and Updating Dataset Labels (https://cloud.google.com/bigquery/docs/creating-managing-labels#creating_and_updating_dataset_labels) for more information. |
| `lastModifiedTime` | string (int64) | Output only. The date when this dataset was last modified, in milliseconds since the epoch. |
| `linkedDatasetMetadata` | LinkedDatasetMetadata | Output only. Metadata about the LinkedDataset. Filled out when the dataset type is LINKED. |
| `linkedDatasetSource` | LinkedDatasetSource | Optional. The source dataset reference when the dataset is of type LINKED. For all other dataset types it is not set. This field cannot be updated once it is set. Any attempt to update this field using Update and Patch API Operations will be ignored. |
| `location` | string | The geographic location where the dataset should reside. See https://cloud.google.com/bigquery/docs/locations for supported locations. |
| `maxTimeTravelHours` | string (int64) | Optional. Defines the time travel window in hours. The value can be from 48 to 168 hours (2 to 7 days). The default value is 168 hours if this is not set. |
| `resourceTags` | `map<string, string>` | Optional. The tags (https://cloud.google.com/bigquery/docs/tags) attached to this dataset. Tag keys are globally unique. Tag key is expected to be in the namespaced format, for example "123456789012/environment" where 123456789012 is the ID of the parent organization or project resource for this tag key. Tag value is expected to be the short name, for example "Production". See Tag definitions (https://cloud.google.com/iam/docs/tags-access-control#definitions) for more details. |
| `restrictions` | RestrictionConfig | Optional. Output only. Restriction config for all tables and dataset. If set, restrict certain accesses on the dataset and all its tables based on the config. See Data egress (https://cloud.google.com/bigquery/docs/analytics-hub-introduction#data_egress) for more details. |
| `satisfiesPzi` | boolean | Output only. Reserved for future use. |
| `satisfiesPzs` | boolean | Output only. Reserved for future use. |
| `selfLink` | string | Output only. A URL that can be used to access the resource again. You can use this URL in Get or Update requests to the resource. |
| `storageBillingModel` | string enum | Optional. Updates storage_billing_model for the dataset. Values: `STORAGE_BILLING_MODEL_UNSPECIFIED`, `LOGICAL`, `PHYSICAL`. |
| `tags` | `array<object>` | Output only. Tags for the dataset. To provide tags as inputs, use the `resourceTags` field. Deprecated (`deprecated: true` in the Discovery document; see Notes). |
| `tags[].tagKey` | string | Required. The namespaced friendly name of the tag key, e.g. "12345/environment" where 12345 is org id. |
| `tags[].tagValue` | string | Required. The friendly short name of the tag value, e.g. "production". |
| `type` | string | Output only. Same as `type` in `ListFormatDataset`. The type of the dataset, one of: \* DEFAULT - only accessible by owner and authorized accounts, \* PUBLIC - accessible by everyone, \* LINKED - linked dataset, \* EXTERNAL - dataset with definition in external metadata catalog, \* BIGLAKE_ICEBERG - a Biglake dataset accessible through the Iceberg API, \* BIGLAKE_HIVE - a Biglake dataset accessible through the Hive API. |

### `DatasetAccessEntry` fields

| Field | Type | Description |
|---|---|---|
| `dataset` | DatasetReference | The dataset this entry applies to |
| `targetTypes` | `array<string>` | Which resources in the dataset this entry applies to. Currently, only views are supported, but additional target types may be added in the future. Values: `TARGET_TYPE_UNSPECIFIED`, `VIEWS`, `ROUTINES`. |

### `DatasetList` fields

| Field | Type | Description |
|---|---|---|
| `datasets` | `array<object>` | An array of the dataset resources in the project. Each resource contains basic information. For full information about a particular dataset resource, use the Datasets: get method. This property is omitted when there are no datasets in the project. |
| `datasets[].catalogSource` | string | Output only. The origin of the dataset, one of: \* (Unset) - Native BigQuery Dataset. \* BIGLAKE - Dataset is backed by a namespace stored natively in Biglake. |
| `datasets[].datasetReference` | DatasetReference | The dataset reference. Use this property to access specific parts of the dataset's ID, such as project ID or dataset ID. |
| `datasets[].externalDatasetReference` | ExternalDatasetReference | Output only. Reference to a read-only external dataset defined in data catalogs outside of BigQuery. Filled out when the dataset type is EXTERNAL. |
| `datasets[].friendlyName` | string | An alternate name for the dataset. The friendly name is purely decorative in nature. |
| `datasets[].id` | string | The fully-qualified, unique, opaque ID of the dataset. |
| `datasets[].kind` | string | The resource type. This property always returns the value "bigquery#dataset" |
| `datasets[].labels` | `map<string, string>` | The labels associated with this dataset. You can use these to organize and group your datasets. |
| `datasets[].location` | string | The geographic location where the dataset resides. |
| `datasets[].type` | string | Output only. Same as `type` in `Dataset`. The type of the dataset, one of: \* DEFAULT - only accessible by owner and authorized accounts, \* PUBLIC - accessible by everyone, \* LINKED - linked dataset, \* EXTERNAL - dataset with definition in external metadata catalog, \* BIGLAKE_ICEBERG - a Biglake dataset accessible through the Iceberg API, \* BIGLAKE_HIVE - a Biglake dataset accessible through the Hive API. |
| `etag` | string | Output only. A hash value of the results page. You can use this property to determine if the page has changed since the last request. |
| `kind` | string | Output only. The resource type. This property always returns the value "bigquery#datasetList" |
| `nextPageToken` | string | A token that can be used to request the next results page. This property is omitted on the final results page. |
| `unreachable` | `array<string>` | A list of skipped locations that were unreachable. For more information about BigQuery locations, see: https://cloud.google.com/bigquery/docs/locations. Example: "europe-west5" |

### `DatasetReference` fields

| Field | Type | Description |
|---|---|---|
| `datasetId` | string | Required. A unique ID for this dataset, without the project name. The ID must contain only letters (a-z, A-Z), numbers (0-9), or underscores (\_). The maximum length is 1,024 characters. |
| `projectId` | string | Optional. The ID of the project containing this dataset. |

### `DestinationTableProperties` fields

| Field | Type | Description |
|---|---|---|
| `description` | string | Optional. The description for the destination table. This will only be used if the destination table is newly created. If the table already exists and a value different than the current description is provided, the job will fail. |
| `expirationTime` | string (date-time) | Internal use only. |
| `friendlyName` | string | Optional. Friendly name for the destination table. If the table already exists, it should be same as the existing friendly name. |
| `labels` | `map<string, string>` | Optional. The labels associated with this table. You can use these to organize and group your tables. This will only be used if the destination table is newly created. If the table already exists and labels are different than the current labels are provided, the job will fail. |

### `DifferentialPrivacyPolicy` fields

| Field | Type | Description |
|---|---|---|
| `deltaBudget` | number (double) | Optional. The total delta budget for all queries against the privacy-protected view. Each subscriber query against this view charges the amount of delta that is pre-defined by the contributor through the privacy policy delta_per_query field. If there is sufficient budget, then the subscriber query attempts to complete. It might still fail due to other reasons, in which case the charge is refunded. If there is insufficient budget the query is rejected. There might be multiple charge attempts if a single query references multiple views. In this case there must be sufficient budget for all charges or the query is rejected and charges are refunded in best effort. The budget does not have a refresh policy and can only be updated via ALTER VIEW or circumvented by creating a new view that can be queried with a fresh budget. |
| `deltaBudgetRemaining` | number (double) | Output only. The delta budget remaining. If budget is exhausted, no more queries are allowed. Note that the budget for queries that are in progress is deducted before the query executes. If the query fails or is cancelled then the budget is refunded. In this case the amount of budget remaining can increase. |
| `deltaPerQuery` | number (double) | Optional. The delta value that is used per query. Delta represents the probability that any row will fail to be epsilon differentially private. Indicates the risk associated with exposing aggregate rows in the result of a query. |
| `epsilonBudget` | number (double) | Optional. The total epsilon budget for all queries against the privacy-protected view. Each subscriber query against this view charges the amount of epsilon they request in their query. If there is sufficient budget, then the subscriber query attempts to complete. It might still fail due to other reasons, in which case the charge is refunded. If there is insufficient budget the query is rejected. There might be multiple charge attempts if a single query references multiple views. In this case there must be sufficient budget for all charges or the query is rejected and charges are refunded in best effort. The budget does not have a refresh policy and can only be updated via ALTER VIEW or circumvented by creating a new view that can be queried with a fresh budget. |
| `epsilonBudgetRemaining` | number (double) | Output only. The epsilon budget remaining. If budget is exhausted, no more queries are allowed. Note that the budget for queries that are in progress is deducted before the query executes. If the query fails or is cancelled then the budget is refunded. In this case the amount of budget remaining can increase. |
| `maxEpsilonPerQuery` | number (double) | Optional. The maximum epsilon value that a query can consume. If the subscriber specifies epsilon as a parameter in a SELECT query, it must be less than or equal to this value. The epsilon parameter controls the amount of noise that is added to the groups — a higher epsilon means less noise. |
| `maxGroupsContributed` | string (int64) | Optional. The maximum groups contributed value that is used per query. Represents the maximum number of groups to which each protected entity can contribute. Changing this value does not improve or worsen privacy. The best value for accuracy and utility depends on the query and data. |
| `privacyUnitColumn` | string | Optional. The privacy unit column associated with this policy. Differential privacy policies can only have one privacy unit column per data source object (table, view). |

### `DimensionalityReductionMetrics` fields

| Field | Type | Description |
|---|---|---|
| `totalExplainedVarianceRatio` | number (double) | Total percentage of variance explained by the selected principal components. |

### `DmlStatistics` fields

| Field | Type | Description |
|---|---|---|
| `deletedRowCount` | string (int64) | Output only. Number of deleted Rows. populated by DML DELETE, MERGE and TRUNCATE statements. |
| `dmlMode` | string enum | Output only. DML mode used. Values: `DML_MODE_UNSPECIFIED`, `COARSE_GRAINED_DML`, `FINE_GRAINED_DML`. |
| `fineGrainedDmlUnusedReason` | string enum | Output only. Reason for disabling fine-grained DML if applicable. Values: `FINE_GRAINED_DML_UNUSED_REASON_UNSPECIFIED`, `MAX_PARTITION_SIZE_EXCEEDED`, `TABLE_NOT_ENROLLED`, `DML_IN_MULTI_STATEMENT_TRANSACTION`. |
| `insertedRowCount` | string (int64) | Output only. Number of inserted Rows. Populated by DML INSERT and MERGE statements |
| `updatedRowCount` | string (int64) | Output only. Number of updated Rows. Populated by DML UPDATE and MERGE statements. |

### `DoubleCandidates` fields

| Field | Type | Description |
|---|---|---|
| `candidates` | `array<number>` | Candidates for the double parameter in increasing order. |

### `DoubleHparamSearchSpace` fields

| Field | Type | Description |
|---|---|---|
| `candidates` | DoubleCandidates | Candidates of the double hyperparameter. |
| `range` | DoubleRange | Range of the double hyperparameter. |

### `DoubleRange` fields

| Field | Type | Description |
|---|---|---|
| `max` | number (double) | Max value of the double parameter. |
| `min` | number (double) | Min value of the double parameter. |

### `EncryptionConfiguration` fields

| Field | Type | Description |
|---|---|---|
| `kmsKeyName` | string | Optional. Describes the Cloud KMS encryption key that will be used to protect destination BigQuery table. The BigQuery Service Account associated with your project requires access to this encryption key. |

### `Entry` fields

| Field | Type | Description |
|---|---|---|
| `itemCount` | string (int64) | Number of items being predicted as this label. |
| `predictedLabel` | string | The predicted label. For confidence_threshold > 0, we will also add an entry indicating the number of items under the confidence threshold. |

### `ErrorProto` fields

| Field | Type | Description |
|---|---|---|
| `debugInfo` | string | Debugging information. This property is internal to Google and should not be used. |
| `location` | string | Specifies where the error occurred, if present. |
| `message` | string | A human-readable description of the error. |
| `reason` | string | A short error code that summarizes the error. |

### `EvaluationMetrics` fields

| Field | Type | Description |
|---|---|---|
| `arimaForecastingMetrics` | ArimaForecastingMetrics | Populated for ARIMA models. |
| `binaryClassificationMetrics` | BinaryClassificationMetrics | Populated for binary classification/classifier models. |
| `clusteringMetrics` | ClusteringMetrics | Populated for clustering models. |
| `dimensionalityReductionMetrics` | DimensionalityReductionMetrics | Evaluation metrics when the model is a dimensionality reduction model, which currently includes PCA. |
| `multiClassClassificationMetrics` | MultiClassClassificationMetrics | Populated for multi-class classification/classifier models. |
| `rankingMetrics` | RankingMetrics | Populated for implicit feedback type matrix factorization models. |
| `regressionMetrics` | RegressionMetrics | Populated for regression models and explicit feedback type matrix factorization models. |

### `ExplainQueryStage` fields

| Field | Type | Description |
|---|---|---|
| `completedParallelInputs` | string (int64) | Number of parallel input segments completed. |
| `computeMode` | string enum | Output only. Compute mode for this stage. Values: `COMPUTE_MODE_UNSPECIFIED`, `BIGQUERY`, `BI_ENGINE`. |
| `computeMsAvg` | string (int64) | Milliseconds the average shard spent on CPU-bound tasks. |
| `computeMsMax` | string (int64) | Milliseconds the slowest shard spent on CPU-bound tasks. |
| `computeRatioAvg` | number (double) | Relative amount of time the average shard spent on CPU-bound tasks. |
| `computeRatioMax` | number (double) | Relative amount of time the slowest shard spent on CPU-bound tasks. |
| `endMs` | string (int64) | Stage end time represented as milliseconds since the epoch. |
| `id` | string (int64) | Unique ID for the stage within the plan. |
| `inputStages` | `array<string>` | IDs for stages that are inputs to this stage. |
| `name` | string | Human-readable name for the stage. |
| `parallelInputs` | string (int64) | Number of parallel input segments to be processed |
| `readMsAvg` | string (int64) | Milliseconds the average shard spent reading input. |
| `readMsMax` | string (int64) | Milliseconds the slowest shard spent reading input. |
| `readRatioAvg` | number (double) | Relative amount of time the average shard spent reading input. |
| `readRatioMax` | number (double) | Relative amount of time the slowest shard spent reading input. |
| `recordsRead` | string (int64) | Number of records read into the stage. |
| `recordsWritten` | string (int64) | Number of records written by the stage. |
| `shuffleOutputBytes` | string (int64) | Total number of bytes written to shuffle. |
| `shuffleOutputBytesSpilled` | string (int64) | Total number of bytes written to shuffle and spilled to disk. |
| `slotMs` | string (int64) | Slot-milliseconds used by the stage. |
| `startMs` | string (int64) | Stage start time represented as milliseconds since the epoch. |
| `status` | string | Current status for this stage. |
| `steps` | `array<ExplainQueryStep>` | List of operations within the stage in dependency order (approximately chronological). |
| `waitMsAvg` | string (int64) | Milliseconds the average shard spent waiting to be scheduled. |
| `waitMsMax` | string (int64) | Milliseconds the slowest shard spent waiting to be scheduled. |
| `waitRatioAvg` | number (double) | Relative amount of time the average shard spent waiting to be scheduled. |
| `waitRatioMax` | number (double) | Relative amount of time the slowest shard spent waiting to be scheduled. |
| `writeMsAvg` | string (int64) | Milliseconds the average shard spent on writing output. |
| `writeMsMax` | string (int64) | Milliseconds the slowest shard spent on writing output. |
| `writeRatioAvg` | number (double) | Relative amount of time the average shard spent on writing output. |
| `writeRatioMax` | number (double) | Relative amount of time the slowest shard spent on writing output. |

### `ExplainQueryStep` fields

| Field | Type | Description |
|---|---|---|
| `kind` | string | Machine-readable operation type. |
| `substeps` | `array<string>` | Human-readable description of the step(s). |

### `Explanation` fields

| Field | Type | Description |
|---|---|---|
| `attribution` | number (double) | Attribution of feature. |
| `featureName` | string | The full feature name. For non-numerical features, will be formatted like `<column_name>.<encoded_feature_name>` (placeholders restored from the source proto; see Notes). Overall size of feature name will always be truncated to first 120 characters. |

### `ExportDataStatistics` fields

| Field | Type | Description |
|---|---|---|
| `fileCount` | string (int64) | Number of destination files generated in case of EXPORT DATA statement only. |
| `rowCount` | string (int64) | \[Alpha\] Number of destination rows generated in case of EXPORT DATA statement only. |

### `Expr` fields

| Field | Type | Description |
|---|---|---|
| `description` | string | Optional. Description of the expression. This is a longer text which describes the expression, e.g. when hovered over it in a UI. |
| `expression` | string | Textual representation of an expression in Common Expression Language syntax. |
| `location` | string | Optional. String indicating the location of the expression for error reporting, e.g. a file name and a position in the file. |
| `title` | string | Optional. Title for the expression, i.e. a short string describing its purpose. This can be used e.g. in UIs which allow to enter the expression. |

### `ExternalCatalogDatasetOptions` fields

| Field | Type | Description |
|---|---|---|
| `defaultStorageLocationUri` | string | Optional. The storage location URI for all tables in the dataset. Equivalent to hive metastore's database locationUri. Maximum length of 1024 characters. |
| `parameters` | `map<string, string>` | Optional. A map of key value pairs defining the parameters and properties of the open source schema. Maximum size of 2MiB. |

### `ExternalCatalogTableOptions` fields

| Field | Type | Description |
|---|---|---|
| `connectionId` | string | Optional. A connection ID that specifies the credentials to be used to read external storage, such as Azure Blob, Cloud Storage, or Amazon S3. This connection is needed to read the open source table from BigQuery. The connection_id format must be either `<project_id>.<location_id>.<connection_id>` or `projects/<project_id>/locations/<location_id>/connections/<connection_id>` (placeholders restored from the source proto; see Notes). |
| `parameters` | `map<string, string>` | Optional. A map of the key-value pairs defining the parameters and properties of the open source table. Corresponds with Hive metastore table parameters. Maximum size of 4MiB. |
| `storageDescriptor` | StorageDescriptor | Optional. A storage descriptor containing information about the physical storage of this table. |

### `ExternalDataConfiguration` fields

| Field | Type | Description |
|---|---|---|
| `autodetect` | boolean | Try to detect schema and format options automatically. Any option specified explicitly will be honored. |
| `avroOptions` | AvroOptions | Optional. Additional properties to set if sourceFormat is set to AVRO. |
| `bigtableOptions` | BigtableOptions | Optional. Additional options if sourceFormat is set to BIGTABLE. |
| `compression` | string | Optional. The compression type of the data source. Possible values include GZIP and NONE. The default value is NONE. This setting is ignored for Google Cloud Bigtable, Google Cloud Datastore backups, Avro, ORC and Parquet formats. An empty string is an invalid value. |
| `connectionId` | string | Optional. The connection specifying the credentials to be used to read external storage, such as Azure Blob, Cloud Storage, or S3. The connection_id can have the form `{project_id}.{location_id};{connection_id}` or `projects/{project_id}/locations/{location_id}/connections/{connection_id}`. |
| `csvOptions` | CsvOptions | Optional. Additional properties to set if sourceFormat is set to CSV. |
| `dateFormat` | string | Optional. Format used to parse DATE values. Supports C-style and SQL-style values. |
| `datetimeFormat` | string | Optional. Format used to parse DATETIME values. Supports C-style and SQL-style values. |
| `decimalTargetTypes` | `array<string>` | Defines the list of possible SQL data types to which the source decimal values are converted. This list and the precision and the scale parameters of the decimal field determine the target type. In the order of NUMERIC, BIGNUMERIC, and STRING, a type is picked if it is in the specified list and if it supports the precision and the scale. STRING supports all precision and scale values. If none of the listed types supports the precision and the scale, the type supporting the widest range in the specified list is picked, and if a value exceeds the supported range when reading the data, an error will be thrown. Example: Suppose the value of this field is \["NUMERIC", "BIGNUMERIC"\]. If (precision,scale) is: \* (38,9) -> NUMERIC; \* (39,9) -> BIGNUMERIC (NUMERIC cannot hold 30 integer digits); \* (38,10) -> BIGNUMERIC (NUMERIC cannot hold 10 fractional digits); \* (76,38) -> BIGNUMERIC; \* (77,38) -> BIGNUMERIC (error if value exceeds supported range). This field cannot contain duplicate types. The order of the types in this field is ignored. For example, \["BIGNUMERIC", "NUMERIC"\] is the same as \["NUMERIC", "BIGNUMERIC"\] and NUMERIC always takes precedence over BIGNUMERIC. Defaults to \["NUMERIC", "STRING"\] for ORC and \["NUMERIC"\] for the other file formats. Values: `DECIMAL_TARGET_TYPE_UNSPECIFIED`, `NUMERIC`, `BIGNUMERIC`, `STRING`. |
| `fileSetSpecType` | string enum | Optional. Specifies how source URIs are interpreted for constructing the file set to load. By default source URIs are expanded against the underlying storage. Other options include specifying manifest files. Only applicable to object storage systems. Values: `FILE_SET_SPEC_TYPE_FILE_SYSTEM_MATCH`, `FILE_SET_SPEC_TYPE_NEW_LINE_DELIMITED_MANIFEST`. |
| `googleSheetsOptions` | GoogleSheetsOptions | Optional. Additional options if sourceFormat is set to GOOGLE_SHEETS. |
| `hivePartitioningOptions` | HivePartitioningOptions | Optional. When set, configures hive partitioning support. Not all storage formats support hive partitioning -- requesting hive partitioning on an unsupported format will lead to an error, as will providing an invalid specification. |
| `ignoreUnknownValues` | boolean | Optional. Indicates if BigQuery should allow extra values that are not represented in the table schema. If true, the extra values are ignored. If false, records with extra columns are treated as bad records, and if there are too many bad records, an invalid error is returned in the job result. The default value is false. The sourceFormat property determines what BigQuery treats as an extra value: CSV: Trailing columns JSON: Named values that don't match any column names Google Cloud Bigtable: This setting is ignored. Google Cloud Datastore backups: This setting is ignored. Avro: This setting is ignored. ORC: This setting is ignored. Parquet: This setting is ignored. |
| `jsonExtension` | string enum | Optional. Load option to be used together with source_format newline-delimited JSON to indicate that a variant of JSON is being loaded. To load newline-delimited GeoJSON, specify GEOJSON (and source_format must be set to NEWLINE_DELIMITED_JSON). Values: `JSON_EXTENSION_UNSPECIFIED`, `GEOJSON`. |
| `jsonOptions` | JsonOptions | Optional. Additional properties to set if sourceFormat is set to JSON. |
| `maxBadRecords` | integer (int32) | Optional. The maximum number of bad records that BigQuery can ignore when reading data. If the number of bad records exceeds this value, an invalid error is returned in the job result. The default value is 0, which requires that all records are valid. This setting is ignored for Google Cloud Bigtable, Google Cloud Datastore backups, Avro, ORC and Parquet formats. |
| `metadataCacheMode` | string enum | Optional. Metadata Cache Mode for the table. Set this to enable caching of metadata from external data source. Values: `METADATA_CACHE_MODE_UNSPECIFIED`, `AUTOMATIC`, `MANUAL`. |
| `objectMetadata` | string enum | Optional. ObjectMetadata is used to create Object Tables. Object Tables contain a listing of objects (with their metadata) found at the source_uris. If ObjectMetadata is set, source_format should be omitted. Currently SIMPLE is the only supported Object Metadata type. Values: `OBJECT_METADATA_UNSPECIFIED`, `DIRECTORY`, `SIMPLE`. |
| `parquetOptions` | ParquetOptions | Optional. Additional properties to set if sourceFormat is set to PARQUET. |
| `referenceFileSchemaUri` | string | Optional. When creating an external table, the user can provide a reference file with the table schema. This is enabled for the following formats: AVRO, PARQUET, ORC. |
| `schema` | TableSchema | Optional. The schema for the data. Schema is required for CSV and JSON formats if autodetect is not on. Schema is disallowed for Google Cloud Bigtable, Cloud Datastore backups, Avro, ORC and Parquet formats. |
| `sourceFormat` | string | \[Required\] The data format. For CSV files, specify "CSV". For Google sheets, specify "GOOGLE_SHEETS". For newline-delimited JSON, specify "NEWLINE_DELIMITED_JSON". For Avro files, specify "AVRO". For Google Cloud Datastore backups, specify "DATASTORE_BACKUP". For Apache Iceberg tables, specify "ICEBERG". For ORC files, specify "ORC". For Parquet files, specify "PARQUET". \[Beta\] For Google Cloud Bigtable, specify "BIGTABLE". |
| `sourceUris` | `array<string>` | \[Required\] The fully-qualified URIs that point to your data in Google Cloud. For Google Cloud Storage URIs: Each URI can contain one '\*' wildcard character and it must come after the 'bucket' name. Size limits related to load jobs apply to external data sources. For Google Cloud Bigtable URIs: Exactly one URI can be specified and it has be a fully specified and valid HTTPS URL for a Google Cloud Bigtable table. For Google Cloud Datastore backups, exactly one URI can be specified. Also, the '\*' wildcard character is not allowed. |
| `timeFormat` | string | Optional. Format used to parse TIME values. Supports C-style and SQL-style values. |
| `timeZone` | string | Optional. Time zone used when parsing timestamp values that do not have specific time zone information (e.g. 2024-04-20 12:34:56). The expected format is a IANA timezone string (e.g. America/Los_Angeles). |
| `timestampFormat` | string | Optional. Format used to parse TIMESTAMP values. Supports C-style and SQL-style values. |
| `timestampTargetPrecision` | `array<integer>` | Precisions (maximum number of total digits in base 10) for seconds of TIMESTAMP types that are allowed to the destination table for autodetection mode. Available for the formats: CSV, PARQUET, AVRO, and Iceberg External Table. Possible values include: Not Specified, \[\], or \[6\]: timestamp(6) for all auto detected TIMESTAMP columns \[6, 12\]: timestamp(6) for all auto detected TIMESTAMP columns that have less than 6 digits of subseconds. timestamp(12) for all auto detected TIMESTAMP columns that have more than 6 digits of subseconds. \[12\]: timestamp(12) for all auto detected TIMESTAMP columns. The order of the elements in this array is ignored. Inputs that have higher precision than the highest target precision in this array will be truncated. |

### `ExternalDatasetReference` fields

| Field | Type | Description |
|---|---|---|
| `connection` | string | Required. The connection id that is used to access the external_source. Format: projects/{project_id}/locations/{location_id}/connections/{connection_id} |
| `externalSource` | string | Required. External source that backs this dataset. |

### `ExternalRuntimeOptions` fields

| Field | Type | Description |
|---|---|---|
| `containerCpu` | number (double) | Optional. Amount of CPU provisioned for a Python UDF container instance. For more information, see Configure container limits for Python UDFs (https://cloud.google.com/bigquery/docs/user-defined-functions-python#configure-container-limits) |
| `containerMemory` | string | Optional. Amount of memory provisioned for a Python UDF container instance. Format: {number}{unit} where unit is one of "M", "G", "Mi" and "Gi" (e.g. 1G, 512Mi). If not specified, the default value is 512Mi. For more information, see Configure container limits for Python UDFs (https://cloud.google.com/bigquery/docs/user-defined-functions-python#configure-container-limits) |
| `containerRequestConcurrency` | string (int64) | Optional. Maximum number of requests that a Python UDF instance can handle concurrently. If absent or if `0`, the default concurrency value is used. For more information, see Configure container limits for Python UDFs (https://cloud.google.com/bigquery/docs/user-defined-functions-python#configure-container-limits). |
| `maxBatchingRows` | string (int64) | Optional. Maximum number of rows in each batch sent to the external runtime. If absent or if 0, BigQuery dynamically decides the number of rows in a batch. |
| `runtimeConnection` | string | Optional. Fully qualified name of the connection whose service account will be used to execute the code in the container. Format: "projects/{project_id}/locations/{location_id}/connections/{connection_id}" |
| `runtimeVersion` | string | Optional. Language runtime version. Example: `python-3.11`. |
| `volumeMounts` | `array<ExternalVolumeMount>` | Optional. List of volume mounts for the Python UDF container that executes the managed function. |

### `ExternalServiceCost` fields

| Field | Type | Description |
|---|---|---|
| `billingMethod` | string | The billing method used for the external job. This field, set to `SERVICES_SKU`, is only used when billing under the services SKU. Otherwise, it is unspecified for backward compatibility. |
| `bytesBilled` | string (int64) | External service cost in terms of bigquery bytes billed. |
| `bytesProcessed` | string (int64) | External service cost in terms of bigquery bytes processed. |
| `externalService` | string | External service name. |
| `reservedSlotCount` | string (int64) | Non-preemptable reserved slots used for external job. For example, reserved slots for Cloua AI Platform job are the VM usages converted to BigQuery slot with equivalent mount of price. |
| `slotMs` | string (int64) | External service cost in terms of bigquery slot milliseconds. |

### `ExternalVolumeMount` fields

| Field | Type | Description |
|---|---|---|
| `mountPath` | string | Optional. The absolute path within the container where the volume should be mounted. |
| `sourcePath` | string | Optional. The absolute path of the source to be mounted, only support Google Cloud Storage bucket or folder now. Eg: gs://bucket-xxx for Google Cloud Storage bucket, gs://bucket-xxx/folder1/folder2 for Google Cloud Storage folder. |

### `FeatureValue` fields

| Field | Type | Description |
|---|---|---|
| `categoricalValue` | CategoricalValue | The categorical feature value. |
| `featureColumn` | string | The feature column name. |
| `numericalValue` | number (double) | The numerical feature value. This is the centroid value for this feature. |

### `ForeignTypeInfo` fields

| Field | Type | Description |
|---|---|---|
| `typeSystem` | string enum | Required. Specifies the system which defines the foreign data type. Values: `TYPE_SYSTEM_UNSPECIFIED`, `HIVE`. |

### `ForeignViewDefinition` fields

| Field | Type | Description |
|---|---|---|
| `dialect` | string | Optional. Represents the dialect of the query. |
| `query` | string | Required. The query that defines the view. |

### `GenAiErrorStats` fields

| Field | Type | Description |
|---|---|---|
| `errors` | `array<string>` | A list of unique errors at query level (up to 5, truncated to 100 chars) |

### `GenAiFunctionCacheStats` fields

| Field | Type | Description |
|---|---|---|
| `numCacheHitRows` | string (int64) | Number of rows served from cache. |

### `GenAiFunctionCostOptimizationStats` fields

| Field | Type | Description |
|---|---|---|
| `message` | string | System generated message to provide insights into cost optimization state. |
| `numCostOptimizedRows` | string (int64) | Number of rows inferred via cost optimized workflow. |

### `GenAiFunctionErrorStats` fields

| Field | Type | Description |
|---|---|---|
| `errors` | `array<string>` | A list of unique errors at function level (up to 5, truncated to 100 chars). |
| `numFailedRows` | string (int64) | Number of failed rows processed by the function |

### `GenAiFunctionStats` fields

| Field | Type | Description |
|---|---|---|
| `cacheStats` | GenAiFunctionCacheStats | Cache stats for the function. |
| `costOptimizationStats` | GenAiFunctionCostOptimizationStats | Cost optimization stats if applied on the rows processed by the function. |
| `errorStats` | GenAiFunctionErrorStats | Error stats for the function. |
| `functionName` | string | Name of the function. |
| `numProcessedRows` | string (int64) | Number of rows processed by this GenAi function. This includes all cost_optimized, llm_inferred and failed_rows. |
| `prompt` | string | User input prompt of the function (truncated to 20 chars). |

### `GenAiStats` fields

| Field | Type | Description |
|---|---|---|
| `errorStats` | GenAiErrorStats | Job level error stats across all GenAi functions |
| `functionStats` | `array<GenAiFunctionStats>` | Function level stats for GenAI Functions. For more information, see Generative AI overview (https://docs.cloud.google.com/bigquery/docs/generative-ai-overview). |

### `GeneratedColumn` fields

| Field | Type | Description |
|---|---|---|
| `generatedExpressionInfo` | GeneratedExpressionInfo | Definition of the expression used to generate the field. |
| `generatedMode` | string enum | Optional. Dictates when system generated values are used to populate the field. Values: `GENERATED_MODE_UNSPECIFIED`, `GENERATED_ALWAYS`, `GENERATED_BY_DEFAULT`. |

### `GeneratedExpressionInfo` fields

| Field | Type | Description |
|---|---|---|
| `asynchronous` | boolean | Optional. Whether the column generation is done asynchronously. |
| `generationExpression` | string | Optional. The generation expression (e.g. AI.EMBED(...)) used to generate the field. |
| `stored` | boolean | Optional. Whether the generated column is stored in the table. |

### `GetIamPolicyRequest` fields

| Field | Type | Description |
|---|---|---|
| `options` | GetPolicyOptions | OPTIONAL: A `GetPolicyOptions` object for specifying options to `GetIamPolicy`. |

### `GetPolicyOptions` fields

| Field | Type | Description |
|---|---|---|
| `requestedPolicyVersion` | integer (int32) | Optional. The maximum policy version that will be used to format the policy. Valid values are 0, 1, and 3. Requests specifying an invalid value will be rejected. Requests for policies with any conditional role bindings must specify version 3. Policies with no conditional role bindings may specify any valid value or leave the field unset. The policy in the response might use the policy version that you specified, or it might use a lower policy version. For example, if you specify version 3, but the policy has no conditional role bindings, the response uses version 1. To learn which resources support conditions in their IAM policies, see the IAM documentation (https://cloud.google.com/iam/help/conditions/resource-policies). |

### `GetQueryResultsResponse` fields

| Field | Type | Description |
|---|---|---|
| `cacheHit` | boolean | Whether the query result was fetched from the query cache. |
| `errors` | `array<ErrorProto>` | Output only. The first errors or warnings encountered during the running of the job. The final message includes the number of errors that caused the process to stop. Errors here do not necessarily mean that the job has completed or was unsuccessful. For more information about error messages, see Error messages (https://cloud.google.com/bigquery/docs/error-messages). |
| `etag` | string | A hash of this response. |
| `jobComplete` | boolean | Whether the query has completed or not. If rows or totalRows are present, this will always be true. If this is false, totalRows will not be available. |
| `jobReference` | JobReference | Reference to the BigQuery Job that was created to run the query. This field will be present even if the original request timed out, in which case GetQueryResults can be used to read the results once the query has completed. Since this API only returns the first page of results, subsequent pages can be fetched via the same mechanism (GetQueryResults). |
| `kind` | string | The resource type of the response. |
| `numDmlAffectedRows` | string (int64) | Output only. The number of rows affected by a DML statement. Present only for DML statements INSERT, UPDATE or DELETE. |
| `pageToken` | string | A token used for paging results. When this token is non-empty, it indicates additional results are available. |
| `rows` | `array<TableRow>` | An object with as many results as can be contained within the maximum permitted reply size. To get any additional rows, you can call GetQueryResults and specify the jobReference returned above. Present only when the query completes successfully. The REST-based representation of this data leverages a series of JSON f,v objects for indicating fields and values. |
| `schema` | TableSchema | The schema of the results. Present only when the query completes successfully. |
| `totalBytesProcessed` | string (int64) | The total number of bytes processed for this query. |
| `totalRows` | string (uint64) | The total number of rows in the complete query result set, which can be more than the number of rows in this single page of results. Present only when the query completes successfully. |

### `GetServiceAccountResponse` fields

| Field | Type | Description |
|---|---|---|
| `email` | string | The service account email address. |
| `kind` | string | The resource type of the response. |

### `GlobalExplanation` fields

| Field | Type | Description |
|---|---|---|
| `classLabel` | string | Class label for this set of global explanations. Will be empty/null for binary logistic and linear regression models. Sorted alphabetically in descending order. |
| `explanations` | `array<Explanation>` | A list of the top global explanations. Sorted by absolute value of attribution in descending order. |

### `GoogleSheetsOptions` fields

| Field | Type | Description |
|---|---|---|
| `range` | string | Optional. Range of a sheet to query from. Only used when non-empty. Typical format: sheet_name!top_left_cell_id:bottom_right_cell_id For example: sheet1!A1:B20 |
| `skipLeadingRows` | string (int64) | Optional. The number of rows at the top of a sheet that BigQuery will skip when reading the data. The default value is 0. This property is useful if you have header rows that should be skipped. When autodetect is on, the behavior is the following: \* skipLeadingRows unspecified - Autodetect tries to detect headers in the first row. If they are not detected, the row is read as data. Otherwise data is read starting from the second row. \* skipLeadingRows is 0 - Instructs autodetect that there are no headers and data should be read starting from the first row. \* skipLeadingRows = N > 0 - Autodetect skips N-1 rows and tries to detect headers in row N. If headers are not detected, row N is just skipped. Otherwise row N is used to extract column names for the detected schema. |

### `HighCardinalityJoin` fields

| Field | Type | Description |
|---|---|---|
| `leftRows` | string (int64) | Output only. Count of left input rows. |
| `outputRows` | string (int64) | Output only. Count of the output rows. |
| `rightRows` | string (int64) | Output only. Count of right input rows. |
| `stepIndex` | integer (int32) | Output only. The index of the join operator in the ExplainQueryStep lists. |

### `HivePartitioningOptions` fields

| Field | Type | Description |
|---|---|---|
| `fields` | `array<string>` | Output only. For permanent external tables, this field is populated with the hive partition keys in the order they were inferred. The types of the partition keys can be deduced by checking the table schema (which will include the partition keys). Not every API will populate this field in the output. For example, Tables.Get will populate it, but Tables.List will not contain this field. |
| `mode` | string | Optional. When set, what mode of hive partitioning to use when reading data. The following modes are supported: \* AUTO: automatically infer partition key name(s) and type(s). \* STRINGS: automatically infer partition key name(s). All types are strings. \* CUSTOM: partition key schema is encoded in the source URI prefix. Not all storage formats support hive partitioning. Requesting hive partitioning on an unsupported format will lead to an error. Currently supported formats are: JSON, CSV, ORC, Avro and Parquet. |
| `requirePartitionFilter` | boolean | Optional. If set to true, queries over this table require a partition filter that can be used for partition elimination to be specified. Note that this field should only be true when creating a permanent external table or querying a temporary external table. Hive-partitioned loads with require_partition_filter explicitly set to true will fail. |
| `sourceUriPrefix` | string | Optional. When hive partition detection is requested, a common prefix for all source uris must be required. The prefix must end immediately before the partition key encoding begins. For example, consider files following this data layout: gs://bucket/path_to_table/dt=2019-06-01/country=USA/id=7/file.avro gs://bucket/path_to_table/dt=2019-05-31/country=CA/id=3/file.avro When hive partitioning is requested with either AUTO or STRINGS detection, the common prefix can be either of gs://bucket/path_to_table or gs://bucket/path_to_table/. CUSTOM detection requires encoding the partitioning schema immediately after the common prefix. For CUSTOM, any of \* gs://bucket/path_to_table/{dt:DATE}/{country:STRING}/{id:INTEGER} \* gs://bucket/path_to_table/{dt:STRING}/{country:STRING}/{id:INTEGER} \* gs://bucket/path_to_table/{dt:DATE}/{country:STRING}/{id:STRING} would all be valid source URI prefixes. |

### `HparamSearchSpaces` fields

| Field | Type | Description |
|---|---|---|
| `activationFn` | StringHparamSearchSpace | Activation functions of neural network models. |
| `batchSize` | IntHparamSearchSpace | Mini batch sample size. |
| `boosterType` | StringHparamSearchSpace | Booster type for boosted tree models. |
| `colsampleBylevel` | DoubleHparamSearchSpace | Subsample ratio of columns for each level for boosted tree models. |
| `colsampleBynode` | DoubleHparamSearchSpace | Subsample ratio of columns for each node(split) for boosted tree models. |
| `colsampleBytree` | DoubleHparamSearchSpace | Subsample ratio of columns when constructing each tree for boosted tree models. |
| `dartNormalizeType` | StringHparamSearchSpace | Dart normalization type for boosted tree models. |
| `dropout` | DoubleHparamSearchSpace | Dropout probability for dnn model training and boosted tree models using dart booster. |
| `hiddenUnits` | IntArrayHparamSearchSpace | Hidden units for neural network models. |
| `l1Reg` | DoubleHparamSearchSpace | L1 regularization coefficient. |
| `l2Reg` | DoubleHparamSearchSpace | L2 regularization coefficient. |
| `learnRate` | DoubleHparamSearchSpace | Learning rate of training jobs. |
| `maxTreeDepth` | IntHparamSearchSpace | Maximum depth of a tree for boosted tree models. |
| `minSplitLoss` | DoubleHparamSearchSpace | Minimum split loss for boosted tree models. |
| `minTreeChildWeight` | IntHparamSearchSpace | Minimum sum of instance weight needed in a child for boosted tree models. |
| `numClusters` | IntHparamSearchSpace | Number of clusters for k-means. |
| `numFactors` | IntHparamSearchSpace | Number of latent factors to train on. |
| `numParallelTree` | IntHparamSearchSpace | Number of parallel trees for boosted tree models. |
| `optimizer` | StringHparamSearchSpace | Optimizer of TF models. |
| `subsample` | DoubleHparamSearchSpace | Subsample the training data to grow tree to prevent overfitting for boosted tree models. |
| `treeMethod` | StringHparamSearchSpace | Tree construction algorithm for boosted tree models. |
| `walsAlpha` | DoubleHparamSearchSpace | Hyperparameter for matrix factoration when implicit feedback type is specified. |

### `HparamTuningTrial` fields

| Field | Type | Description |
|---|---|---|
| `endTimeMs` | string (int64) | Ending time of the trial. |
| `errorMessage` | string | Error message for FAILED and INFEASIBLE trial. |
| `evalLoss` | number (double) | Loss computed on the eval data at the end of trial. |
| `evaluationMetrics` | EvaluationMetrics | Evaluation metrics of this trial calculated on the test data. Empty in Job API. |
| `hparamTuningEvaluationMetrics` | EvaluationMetrics | Hyperparameter tuning evaluation metrics of this trial calculated on the eval data. Unlike evaluation_metrics, only the fields corresponding to the hparam_tuning_objectives are set. |
| `hparams` | TrainingOptions | The hyperprameters selected for this trial. |
| `startTimeMs` | string (int64) | Starting time of the trial. |
| `status` | string enum | The status of the trial. Values: `TRIAL_STATUS_UNSPECIFIED`, `NOT_STARTED`, `RUNNING`, `SUCCEEDED`, `FAILED`, `INFEASIBLE`, `STOPPED_EARLY`. |
| `trainingLoss` | number (double) | Loss computed on the training data at the end of trial. |
| `trialId` | string (int64) | 1-based index of the trial. |

### `IncrementalResultStats` fields

| Field | Type | Description |
|---|---|---|
| `disabledReason` | string enum | Output only. Reason why incremental query results are/were not written by the query. Values: `DISABLED_REASON_UNSPECIFIED`, `OTHER`, `UNSUPPORTED_OPERATOR`. |
| `disabledReasonDetails` | string | Output only. Additional human-readable clarification, if available, for DisabledReason. |
| `firstIncrementalRowTime` | string (google-datetime) | Output only. The time at which the first incremental result was written. If the query needed to restart internally, this only describes the final attempt. |
| `incrementalRowCount` | string (int64) | Output only. Number of rows that were in the latest result set before query completion. |
| `lastIncrementalRowTime` | string (google-datetime) | Output only. The time at which the last incremental result was written. Does not include the final result written after query completion. |
| `resultSetLastModifyTime` | string (google-datetime) | Output only. The time at which the result table's contents were modified. May be absent if no results have been written or the query has completed. |
| `resultSetLastReplaceTime` | string (google-datetime) | Output only. The time at which the result table's contents were completely replaced. May be absent if no results have been written or the query has completed. |

### `IndexPruningStats` fields

| Field | Type | Description |
|---|---|---|
| `baseTable` | TableReference | The base table reference. |
| `indexId` | string | The index id. |
| `postIndexPruningParallelInputCount` | string (int64) | The number of parallel inputs after index pruning. |
| `preIndexPruningParallelInputCount` | string (int64) | The number of parallel inputs before index pruning. |

### `IndexUnusedReason` fields

| Field | Type | Description |
|---|---|---|
| `baseTable` | TableReference | Specifies the base table involved in the reason that no search index was used. |
| `code` | string enum | Specifies the high-level reason for the scenario when no search index was used. Values: `CODE_UNSPECIFIED`, `INDEX_CONFIG_NOT_AVAILABLE`, `PENDING_INDEX_CREATION`, `BASE_TABLE_TRUNCATED`, `INDEX_CONFIG_MODIFIED`, `TIME_TRAVEL_QUERY`, `NO_PRUNING_POWER`, `UNINDEXED_SEARCH_FIELDS`, `UNSUPPORTED_SEARCH_PATTERN`, `OPTIMIZED_WITH_MATERIALIZED_VIEW`, `SECURED_BY_DATA_MASKING`, `MISMATCHED_TEXT_ANALYZER`, `BASE_TABLE_TOO_SMALL`, `BASE_TABLE_TOO_LARGE`, `ESTIMATED_PERFORMANCE_GAIN_TOO_LOW`, `COLUMN_METADATA_INDEX_NOT_USED`, `NOT_SUPPORTED_IN_STANDARD_EDITION`, `INDEX_SUPPRESSED_BY_FUNCTION_OPTION`, `QUERY_CACHE_HIT`, `STALE_INDEX`, `INTERNAL_ERROR`, `OTHER_REASON`. |
| `indexName` | string | Specifies the name of the unused search index, if available. |
| `message` | string | Free form human-readable reason for the scenario when no search index was used. |

### `InputDataChange` fields

| Field | Type | Description |
|---|---|---|
| `recordsReadDiffPercentage` | number (float) | Output only. Records read difference percentage compared to a previous run. |

### `IntArray` fields

| Field | Type | Description |
|---|---|---|
| `elements` | `array<string>` | Elements in the int array. |

### `IntArrayHparamSearchSpace` fields

| Field | Type | Description |
|---|---|---|
| `candidates` | `array<IntArray>` | Candidates for the int array parameter. |

### `IntCandidates` fields

| Field | Type | Description |
|---|---|---|
| `candidates` | `array<string>` | Candidates for the int parameter in increasing order. |

### `IntHparamSearchSpace` fields

| Field | Type | Description |
|---|---|---|
| `candidates` | IntCandidates | Candidates of the int hyperparameter. |
| `range` | IntRange | Range of the int hyperparameter. |

### `IntRange` fields

| Field | Type | Description |
|---|---|---|
| `max` | string (int64) | Max value of the int parameter. |
| `min` | string (int64) | Min value of the int parameter. |

### `IterationResult` fields

| Field | Type | Description |
|---|---|---|
| `arimaResult` | ArimaResult | Arima result. |
| `clusterInfos` | `array<ClusterInfo>` | Information about top clusters for clustering models. |
| `durationMs` | string (int64) | Time taken to run the iteration in milliseconds. |
| `evalLoss` | number (double) | Loss computed on the eval data at the end of iteration. |
| `index` | integer (int32) | Index of the iteration, 0 based. |
| `learnRate` | number (double) | Learn rate used for this iteration. |
| `principalComponentInfos` | `array<PrincipalComponentInfo>` | The information of the principal components. |
| `trainingLoss` | number (double) | Loss computed on the training data at the end of iteration. |

### `Job` fields

| Field | Type | Description |
|---|---|---|
| `configuration` | JobConfiguration | Required. Describes the job configuration. |
| `etag` | string | Output only. A hash of this resource. |
| `id` | string | Output only. Opaque ID field of the job. |
| `jobCreationReason` | JobCreationReason | Output only. The reason why a Job was created. |
| `jobReference` | JobReference | Optional. Reference describing the unique-per-user name of the job. |
| `kind` | string | Output only. The type of the resource. |
| `principal_subject` | string | Output only. \[Full-projection-only\] String representation of identity of requesting party. Populated for both first- and third-party identities. Only present for APIs that support third-party identities. |
| `selfLink` | string | Output only. A URL that can be used to access the resource again. |
| `statistics` | JobStatistics | Output only. Information about the job, including starting time and ending time of the job. |
| `status` | JobStatus | Output only. The status of this job. Examine this value when polling an asynchronous job to see if the job is complete. |
| `user_email` | string | Output only. Email address of the user who ran the job. |

### `JobCancelResponse` fields

| Field | Type | Description |
|---|---|---|
| `job` | Job | The final state of the job. |
| `kind` | string | The resource type of the response. |

### `JobConfiguration` fields

| Field | Type | Description |
|---|---|---|
| `copy` | JobConfigurationTableCopy | \[Pick one\] Copies a table. |
| `dryRun` | boolean | Optional. If set, don't actually run this job. A valid query will return a mostly empty response with some processing statistics, while an invalid query will return the same error it would if it wasn't a dry run. Behavior of non-query jobs is undefined. |
| `extract` | JobConfigurationExtract | \[Pick one\] Configures an extract job. |
| `jobTimeoutMs` | string (int64) | Optional. Job timeout in milliseconds relative to the job creation time. If this time limit is exceeded, BigQuery attempts to stop the job, but might not always succeed in canceling it before the job completes. For example, a job that takes more than 60 seconds to complete has a better chance of being stopped than a job that takes 10 seconds to complete. |
| `jobType` | string | Output only. The type of the job. Can be QUERY, LOAD, EXTRACT, COPY or UNKNOWN. |
| `labels` | `map<string, string>` | The labels associated with this job. You can use these to organize and group your jobs. Label keys and values can be no longer than 63 characters, can only contain lowercase letters, numeric characters, underscores and dashes. International characters are allowed. Label values are optional. Label keys must start with a letter and each label in the list must have a different key. |
| `load` | JobConfigurationLoad | \[Pick one\] Configures a load job. |
| `maxSlots` | integer (int32) | Optional. A target limit on the rate of slot consumption by this job. If set to a value > 0, BigQuery will attempt to limit the rate of slot consumption by this job to keep it below the configured limit, even if the job is eligible for more slots based on fair scheduling. The unused slots will be available for other jobs and queries to use. Note: This feature is not yet generally available. |
| `query` | JobConfigurationQuery | \[Pick one\] Configures a query job. |
| `reservation` | string | Optional. The reservation that job would use. User can specify a reservation to execute the job. If reservation is not set, reservation is determined based on the rules defined by the reservation assignments. The expected format is `projects/{project}/locations/{location}/reservations/{reservation}`. Forces the query to use on-demand billing when set to `none`, which requires the project or organization to have `reservation_override_mode` set to `ALLOW_ANY_OVERRIDE`. |

### `JobConfigurationExtract` fields

| Field | Type | Description |
|---|---|---|
| `compression` | string | Optional. The compression type to use for exported files. Possible values include DEFLATE, GZIP, NONE, SNAPPY, and ZSTD. The default value is NONE. Not all compression formats are support for all file formats. DEFLATE is only supported for Avro. ZSTD is only supported for Parquet. Not applicable when extracting models. |
| `destinationFormat` | string | Optional. The exported file format. Possible values include CSV, NEWLINE_DELIMITED_JSON, PARQUET, or AVRO for tables and ML_TF_SAVED_MODEL or ML_XGBOOST_BOOSTER for models. The default value for tables is CSV. Tables with nested or repeated fields cannot be exported as CSV. The default value for models is ML_TF_SAVED_MODEL. |
| `destinationUri` | string | \[Pick one\] DEPRECATED: Use destinationUris instead, passing only one URI as necessary. The fully-qualified Google Cloud Storage URI where the extracted table should be written. |
| `destinationUris` | `array<string>` | \[Pick one\] A list of fully-qualified Google Cloud Storage URIs where the extracted table should be written. |
| `fieldDelimiter` | string | Optional. When extracting data in CSV format, this defines the delimiter to use between fields in the exported data. Default is ','. Not applicable when extracting models. |
| `modelExtractOptions` | ModelExtractOptions | Optional. Model extract options only applicable when extracting models. |
| `nativeGeographyExportEnabled` | boolean | Optional. Applicable to formats: PARQUET. If enabled, BigQuery to Parquet export will write the native Parquet Geography type instead of the default GeoParquet type. |
| `printHeader` | boolean | Optional. Whether to print out a header row in the results. Default is true. Not applicable when extracting models. |
| `secureContext` | SecureContext | Optional. A set of key-value pairs representing the secure context. This can be used to pass sensitive or context-specific information. They can be retrieved via the SECURE_CONTEXT() function and used to modify the run-time behavior of an extract job on tables with row access policies. |
| `sourceModel` | ModelReference | A reference to the model being exported. |
| `sourceTable` | TableReference | A reference to the table being exported. |
| `useAvroLogicalTypes` | boolean | Whether to use logical types when extracting to AVRO format. Not applicable when extracting models. |

### `JobConfigurationLoad` fields

| Field | Type | Description |
|---|---|---|
| `allowJaggedRows` | boolean | Optional. Accept rows that are missing trailing optional columns. The missing values are treated as nulls. If false, records with missing trailing columns are treated as bad records, and if there are too many bad records, an invalid error is returned in the job result. The default value is false. Only applicable to CSV, ignored for other formats. |
| `allowQuotedNewlines` | boolean | Indicates if BigQuery should allow quoted data sections that contain newline characters in a CSV file. The default value is false. |
| `autodetect` | boolean | Optional. Indicates if we should automatically infer the options and schema for CSV and JSON sources. |
| `clustering` | Clustering | Clustering specification for the destination table. |
| `columnNameCharacterMap` | string enum | Optional. Character map supported for column names in CSV/Parquet loads. Defaults to STRICT and can be overridden by Project Config Service. Using this option with unsupporting load formats will result in an error. Values: `COLUMN_NAME_CHARACTER_MAP_UNSPECIFIED`, `STRICT`, `V1`, `V2`. |
| `connectionProperties` | `array<ConnectionProperty>` | Optional. Connection properties which can modify the load job behavior. Currently, only the 'session_id' connection property is supported, and is used to resolve \_SESSION appearing as the dataset id. |
| `copyFilesOnly` | boolean | Optional. \[Experimental\] Configures the load job to copy files directly to the destination BigLake managed table, bypassing file content reading and rewriting. Copying files only is supported when all the following are true: \* `source_uris` are located in the same Cloud Storage location as the destination table's `storage_uri` location. \* `source_format` is `PARQUET`. \* `destination_table` is an existing BigLake managed table. The table's schema does not have flexible column names. The table's columns do not have type parameters other than precision and scale. \* No options other than the above are specified. |
| `createDisposition` | string | Optional. Specifies whether the job is allowed to create new tables. The following values are supported: \* CREATE_IF_NEEDED: If the table does not exist, BigQuery creates the table. \* CREATE_NEVER: The table must already exist. If it does not, a 'notFound' error is returned in the job result. The default value is CREATE_IF_NEEDED. Creation, truncation and append actions occur as one atomic update upon job completion. |
| `createSession` | boolean | Optional. If this property is true, the job creates a new session using a randomly generated session_id. To continue using a created session with subsequent queries, pass the existing session identifier as a `ConnectionProperty` value. The session identifier is returned as part of the `SessionInfo` message within the query statistics. The new session's location will be set to `Job.JobReference.location` if it is present, otherwise it's set to the default location based on existing routing logic. |
| `dateFormat` | string | Optional. Date format used for parsing DATE values. |
| `datetimeFormat` | string | Optional. Date format used for parsing DATETIME values. |
| `decimalTargetTypes` | `array<string>` | Defines the list of possible SQL data types to which the source decimal values are converted. This list and the precision and the scale parameters of the decimal field determine the target type. In the order of NUMERIC, BIGNUMERIC, and STRING, a type is picked if it is in the specified list and if it supports the precision and the scale. STRING supports all precision and scale values. If none of the listed types supports the precision and the scale, the type supporting the widest range in the specified list is picked, and if a value exceeds the supported range when reading the data, an error will be thrown. Example: Suppose the value of this field is \["NUMERIC", "BIGNUMERIC"\]. If (precision,scale) is: \* (38,9) -> NUMERIC; \* (39,9) -> BIGNUMERIC (NUMERIC cannot hold 30 integer digits); \* (38,10) -> BIGNUMERIC (NUMERIC cannot hold 10 fractional digits); \* (76,38) -> BIGNUMERIC; \* (77,38) -> BIGNUMERIC (error if value exceeds supported range). This field cannot contain duplicate types. The order of the types in this field is ignored. For example, \["BIGNUMERIC", "NUMERIC"\] is the same as \["NUMERIC", "BIGNUMERIC"\] and NUMERIC always takes precedence over BIGNUMERIC. Defaults to \["NUMERIC", "STRING"\] for ORC and \["NUMERIC"\] for the other file formats. Values: `DECIMAL_TARGET_TYPE_UNSPECIFIED`, `NUMERIC`, `BIGNUMERIC`, `STRING`. |
| `destinationEncryptionConfiguration` | EncryptionConfiguration | Custom encryption configuration (e.g., Cloud KMS keys) |
| `destinationTable` | TableReference | \[Required\] The destination table to load the data into. |
| `destinationTableProperties` | DestinationTableProperties | Optional. \[Experimental\] Properties with which to create the destination table if it is new. |
| `encoding` | string | Optional. The character encoding of the data. The supported values are UTF-8, ISO-8859-1, UTF-16BE, UTF-16LE, UTF-32BE, and UTF-32LE. The default value is UTF-8. BigQuery decodes the data after the raw, binary data has been split using the values of the `quote` and `fieldDelimiter` properties. If you don't specify an encoding, or if you specify a UTF-8 encoding when the CSV file is not UTF-8 encoded, BigQuery attempts to convert the data to UTF-8. Generally, your data loads successfully, but it may not match byte-for-byte what you expect. To avoid this, specify the correct encoding by using the `--encoding` flag. If BigQuery can't convert a character other than the ASCII `0` character, BigQuery converts the character to the standard Unicode replacement character: �. |
| `fieldDelimiter` | string | Optional. The separator character for fields in a CSV file. The separator is interpreted as a single byte. For files encoded in ISO-8859-1, any single character can be used as a separator. For files encoded in UTF-8, characters represented in decimal range 1-127 (U+0001-U+007F) can be used without any modification. UTF-8 characters encoded with multiple bytes (i.e. U+0080 and above) will have only the first byte used for separating fields. The remaining bytes will be treated as a part of the field. BigQuery also supports the escape sequence "\t" (U+0009) to specify a tab separator. The default value is comma (",", U+002C). |
| `fileSetSpecType` | string enum | Optional. Specifies how source URIs are interpreted for constructing the file set to load. By default, source URIs are expanded against the underlying storage. You can also specify manifest files to control how the file set is constructed. This option is only applicable to object storage systems. Values: `FILE_SET_SPEC_TYPE_FILE_SYSTEM_MATCH`, `FILE_SET_SPEC_TYPE_NEW_LINE_DELIMITED_MANIFEST`. |
| `hivePartitioningOptions` | HivePartitioningOptions | Optional. When set, configures hive partitioning support. Not all storage formats support hive partitioning -- requesting hive partitioning on an unsupported format will lead to an error, as will providing an invalid specification. |
| `ignoreUnknownValues` | boolean | Optional. Indicates if BigQuery should allow extra values that are not represented in the table schema. If true, the extra values are ignored. If false, records with extra columns are treated as bad records, and if there are too many bad records, an invalid error is returned in the job result. The default value is false. The sourceFormat property determines what BigQuery treats as an extra value: CSV: Trailing columns JSON: Named values that don't match any column names in the table schema Avro, Parquet, ORC: Fields in the file schema that don't exist in the table schema. |
| `jsonExtension` | string enum | Optional. Load option to be used together with source_format newline-delimited JSON to indicate that a variant of JSON is being loaded. To load newline-delimited GeoJSON, specify GEOJSON (and source_format must be set to NEWLINE_DELIMITED_JSON). Values: `JSON_EXTENSION_UNSPECIFIED`, `GEOJSON`. |
| `maxBadRecords` | integer (int32) | Optional. The maximum number of bad records that BigQuery can ignore when running the job. If the number of bad records exceeds this value, an invalid error is returned in the job result. The default value is 0, which requires that all records are valid. This is only supported for CSV and NEWLINE_DELIMITED_JSON file formats. |
| `nullMarker` | string | Optional. Specifies a string that represents a null value in a CSV file. For example, if you specify "\N", BigQuery interprets "\N" as a null value when loading a CSV file. The default value is the empty string. If you set this property to a custom value, BigQuery throws an error if an empty string is present for all data types except for STRING and BYTE. For STRING and BYTE columns, BigQuery interprets the empty string as an empty value. |
| `nullMarkers` | `array<string>` | Optional. A list of strings represented as SQL NULL value in a CSV file. null_marker and null_markers can't be set at the same time. If null_marker is set, null_markers has to be not set. If null_markers is set, null_marker has to be not set. If both null_marker and null_markers are set at the same time, a user error would be thrown. Any strings listed in null_markers, including empty string would be interpreted as SQL NULL. This applies to all column types. |
| `parquetOptions` | ParquetOptions | Optional. Additional properties to set if sourceFormat is set to PARQUET. |
| `preserveAsciiControlCharacters` | boolean | Optional. When sourceFormat is set to "CSV", this indicates whether the embedded ASCII control characters (the first 32 characters in the ASCII-table, from '\x00' to '\x1F') are preserved. |
| `projectionFields` | `array<string>` | If sourceFormat is set to "DATASTORE_BACKUP", indicates which entity properties to load into BigQuery from a Cloud Datastore backup. Property names are case sensitive and must be top-level properties. If no properties are specified, BigQuery loads all properties. If any named property isn't found in the Cloud Datastore backup, an invalid error is returned in the job result. |
| `quote` | string | Optional. The value that is used to quote data sections in a CSV file. BigQuery converts the string to ISO-8859-1 encoding, and then uses the first byte of the encoded string to split the data in its raw, binary state. The default value is a double-quote ('"'). If your data does not contain quoted sections, set the property value to an empty string. If your data contains quoted newline characters, you must also set the allowQuotedNewlines property to true. To include the specific quote character within a quoted value, precede it with an additional matching quote character. For example, if you want to escape the default character ' " ', use ' "" '. @default " |
| `rangePartitioning` | RangePartitioning | Range partitioning specification for the destination table. Only one of timePartitioning and rangePartitioning should be specified. |
| `referenceFileSchemaUri` | string | Optional. The user can provide a reference file with the reader schema. This file is only loaded if it is part of source URIs, but is not loaded otherwise. It is enabled for the following formats: AVRO, PARQUET, ORC. |
| `schema` | TableSchema | Optional. The schema for the destination table. The schema can be omitted if the destination table already exists, or if you're loading data from Google Cloud Datastore. |
| `schemaInline` | string | \[Deprecated\] The inline schema. For CSV schemas, specify as "Field1:Type1\[,Field2:Type2\]\*". For example, "foo:STRING, bar:INTEGER, baz:FLOAT". |
| `schemaInlineFormat` | string | \[Deprecated\] The format of the schemaInline property. |
| `schemaUpdateOptions` | `array<string>` | Allows the schema of the destination table to be updated as a side effect of the load job if a schema is autodetected or supplied in the job configuration. Schema update options are supported in three cases: when writeDisposition is WRITE_APPEND; when writeDisposition is WRITE_TRUNCATE_DATA; when writeDisposition is WRITE_TRUNCATE and the destination table is a partition of a table, specified by partition decorators. For normal tables, WRITE_TRUNCATE will always overwrite the schema. One or more of the following values are specified: \* ALLOW_FIELD_ADDITION: allow adding a nullable field to the schema. \* ALLOW_FIELD_RELAXATION: allow relaxing a required field in the original schema to nullable. |
| `skipLeadingRows` | integer (int32) | Optional. The number of rows at the top of a CSV file that BigQuery will skip when loading the data. The default value is 0. This property is useful if you have header rows in the file that should be skipped. When autodetect is on, the behavior is the following: \* skipLeadingRows unspecified - Autodetect tries to detect headers in the first row. If they are not detected, the row is read as data. Otherwise data is read starting from the second row. \* skipLeadingRows is 0 - Instructs autodetect that there are no headers and data should be read starting from the first row. \* skipLeadingRows = N > 0 - Autodetect skips N-1 rows and tries to detect headers in row N. If headers are not detected, row N is just skipped. Otherwise row N is used to extract column names for the detected schema. |
| `sourceColumnMatch` | string enum | Optional. Controls the strategy used to match loaded columns to the schema. If not set, a sensible default is chosen based on how the schema is provided. If autodetect is used, then columns are matched by name. Otherwise, columns are matched by position. This is done to keep the behavior backward-compatible. Values: `SOURCE_COLUMN_MATCH_UNSPECIFIED`, `POSITION`, `NAME`. |
| `sourceFormat` | string | Optional. The format of the data files. For CSV files, specify "CSV". For datastore backups, specify "DATASTORE_BACKUP". For newline-delimited JSON, specify "NEWLINE_DELIMITED_JSON". For Avro, specify "AVRO". For parquet, specify "PARQUET". For orc, specify "ORC". The default value is CSV. |
| `sourceUris` | `array<string>` | \[Required\] The fully-qualified URIs that point to your data in Google Cloud. For Google Cloud Storage URIs: Each URI can contain one '\*' wildcard character and it must come after the 'bucket' name. Size limits related to load jobs apply to external data sources. For Google Cloud Bigtable URIs: Exactly one URI can be specified and it has be a fully specified and valid HTTPS URL for a Google Cloud Bigtable table. For Google Cloud Datastore backups: Exactly one URI can be specified. Also, the '\*' wildcard character is not allowed. |
| `timeFormat` | string | Optional. Date format used for parsing TIME values. |
| `timePartitioning` | TimePartitioning | Time-based partitioning specification for the destination table. Only one of timePartitioning and rangePartitioning should be specified. |
| `timeZone` | string | Optional. Default time zone that will apply when parsing timestamp values that have no specific time zone. |
| `timestampFormat` | string | Optional. Date format used for parsing TIMESTAMP values. |
| `timestampTargetPrecision` | `array<integer>` | Precisions (maximum number of total digits in base 10) for seconds of TIMESTAMP types that are allowed to the destination table for autodetection mode. Available for the formats: CSV, PARQUET, AVRO, and Iceberg External Table. Possible values include: Not Specified, \[\], or \[6\]: timestamp(6) for all auto detected TIMESTAMP columns \[6, 12\]: timestamp(6) for all auto detected TIMESTAMP columns that have less than 6 digits of subseconds. timestamp(12) for all auto detected TIMESTAMP columns that have more than 6 digits of subseconds. \[12\]: timestamp(12) for all auto detected TIMESTAMP columns. The order of the elements in this array is ignored. Inputs that have higher precision than the highest target precision in this array will be truncated. |
| `useAvroLogicalTypes` | boolean | Optional. If sourceFormat is set to "AVRO", indicates whether to interpret logical types as the corresponding BigQuery data type (for example, TIMESTAMP), instead of using the raw type (for example, INTEGER). |
| `writeDisposition` | string | Optional. Specifies the action that occurs if the destination table already exists. The following values are supported: \* WRITE_TRUNCATE: If the table already exists, BigQuery overwrites the data, removes the constraints and uses the schema from the load job. \* WRITE_TRUNCATE_DATA: If the table already exists, BigQuery overwrites the data, but keeps the constraints and schema of the existing table. \* WRITE_APPEND: If the table already exists, BigQuery appends the data to the table. \* WRITE_EMPTY: If the table already exists and contains data, a 'duplicate' error is returned in the job result. The default value is WRITE_APPEND. Each action is atomic and only occurs if BigQuery is able to complete the job successfully. Creation, truncation and append actions occur as one atomic update upon job completion. |

### `JobConfigurationQuery` fields

| Field | Type | Description |
|---|---|---|
| `allowLargeResults` | boolean | Optional. If true and query uses legacy SQL dialect, allows the query to produce arbitrarily large result tables at a slight cost in performance. Requires destinationTable to be set. For GoogleSQL queries, this flag is ignored and large results are always allowed. However, you must still set destinationTable when result size exceeds the allowed maximum response size. |
| `clustering` | Clustering | Clustering specification for the destination table. |
| `connectionProperties` | `array<ConnectionProperty>` | Connection properties which can modify the query behavior. |
| `continuous` | boolean | \[Optional\] Specifies whether the query should be executed as a continuous query. The default value is false. |
| `createDisposition` | string | Optional. Specifies whether the job is allowed to create new tables. The following values are supported: \* CREATE_IF_NEEDED: If the table does not exist, BigQuery creates the table. \* CREATE_NEVER: The table must already exist. If it does not, a 'notFound' error is returned in the job result. The default value is CREATE_IF_NEEDED. Creation, truncation and append actions occur as one atomic update upon job completion. |
| `createSession` | boolean | If this property is true, the job creates a new session using a randomly generated session_id. To continue using a created session with subsequent queries, pass the existing session identifier as a `ConnectionProperty` value. The session identifier is returned as part of the `SessionInfo` message within the query statistics. The new session's location will be set to `Job.JobReference.location` if it is present, otherwise it's set to the default location based on existing routing logic. |
| `defaultDataset` | DatasetReference | Optional. Specifies the default dataset to use for unqualified table names in the query. This setting does not alter behavior of unqualified dataset names. Setting the system variable `@@dataset_id` achieves the same behavior. See https://cloud.google.com/bigquery/docs/reference/system-variables for more information on system variables. |
| `destinationEncryptionConfiguration` | EncryptionConfiguration | Custom encryption configuration (e.g., Cloud KMS keys) |
| `destinationTable` | TableReference | Optional. Describes the table where the query results should be stored. This property must be set for large results that exceed the maximum response size. For queries that produce anonymous (cached) results, this field will be populated by BigQuery. |
| `flattenResults` | boolean | Optional. If true and query uses legacy SQL dialect, flattens all nested and repeated fields in the query results. allowLargeResults must be true if this is set to false. For GoogleSQL queries, this flag is ignored and results are never flattened. |
| `maximumBillingTier` | integer (int32) | Optional. \[Deprecated\] Maximum billing tier allowed for this query. The billing tier controls the amount of compute resources allotted to the query, and multiplies the on-demand cost of the query accordingly. A query that runs within its allotted resources will succeed and indicate its billing tier in statistics.query.billingTier, but if the query exceeds its allotted resources, it will fail with billingTierLimitExceeded. WARNING: The billed byte amount can be multiplied by an amount up to this number! Most users should not need to alter this setting, and we recommend that you avoid introducing new uses of it. |
| `maximumBytesBilled` | string (int64) | Limits the bytes billed for this job. Queries that will have bytes billed beyond this limit will fail (without incurring a charge). If unspecified, this will be set to your project default. |
| `parameterMode` | string | GoogleSQL only. Set to POSITIONAL to use positional (?) query parameters or to NAMED to use named (@myparam) query parameters in this query. |
| `preserveNulls` | boolean | \[Deprecated\] This property is deprecated. |
| `priority` | string | Optional. Specifies a priority for the query. Possible values include INTERACTIVE and BATCH. The default value is INTERACTIVE. |
| `query` | string | \[Required\] SQL query text to execute. The useLegacySql field can be used to indicate whether the query uses legacy SQL or GoogleSQL. |
| `queryParameters` | `array<QueryParameter>` | Query parameters for GoogleSQL queries. |
| `rangePartitioning` | RangePartitioning | Range partitioning specification for the destination table. Only one of timePartitioning and rangePartitioning should be specified. |
| `schemaUpdateOptions` | `array<string>` | Allows the schema of the destination table to be updated as a side effect of the query job. Schema update options are supported in three cases: when writeDisposition is WRITE_APPEND; when writeDisposition is WRITE_TRUNCATE_DATA; when writeDisposition is WRITE_TRUNCATE and the destination table is a partition of a table, specified by partition decorators. For normal tables, WRITE_TRUNCATE will always overwrite the schema. One or more of the following values are specified: \* ALLOW_FIELD_ADDITION: allow adding a nullable field to the schema. \* ALLOW_FIELD_RELAXATION: allow relaxing a required field in the original schema to nullable. |
| `scriptOptions` | ScriptOptions | Options controlling the execution of scripts. |
| `secureContext` | SecureContext | Optional. A set of key-value pairs representing the secure context. This can be used to pass sensitive or context-specific information. They can be retrieved via the SECURE_CONTEXT() function and used to modify the run-time behavior of a query. |
| `systemVariables` | SystemVariables | Output only. System variables for GoogleSQL queries. A system variable is output if the variable is settable and its value differs from the system default. "@@" prefix is not included in the name of the System variables. |
| `tableDefinitions` | `map<string, ExternalDataConfiguration>` | Optional. You can specify external table definitions, which operate as ephemeral tables that can be queried. These definitions are configured using a JSON map, where the string key represents the table identifier, and the value is the corresponding external data configuration object. |
| `timePartitioning` | TimePartitioning | Time-based partitioning specification for the destination table. Only one of timePartitioning and rangePartitioning should be specified. |
| `useLegacySql` | boolean | Optional. Specifies whether to use BigQuery's legacy SQL dialect for this query. The default value is true. If set to false, the query uses BigQuery's GoogleSQL (https://docs.cloud.google.com/bigquery/docs/introduction-sql). When useLegacySql is set to false, the value of flattenResults is ignored; query will be run as if flattenResults is false. |
| `useQueryCache` | boolean | Optional. Whether to look for the result in the query cache. The query cache is a best-effort cache that will be flushed whenever tables in the query are modified. Moreover, the query cache is only available when a query does not have a destination table specified. The default value is true. |
| `userDefinedFunctionResources` | `array<UserDefinedFunctionResource>` | Describes user-defined function resources used in the query. |
| `writeDisposition` | string | Optional. Specifies the action that occurs if the destination table already exists. The following values are supported: \* WRITE_TRUNCATE: If the table already exists, BigQuery overwrites the data, removes the constraints, and uses the schema from the query result. \* WRITE_TRUNCATE_DATA: If the table already exists, BigQuery overwrites the data, but keeps the constraints and schema of the existing table. \* WRITE_APPEND: If the table already exists, BigQuery appends the data to the table. \* WRITE_EMPTY: If the table already exists and contains data, a 'duplicate' error is returned in the job result. The default value is WRITE_EMPTY. Each action is atomic and only occurs if BigQuery is able to complete the job successfully. Creation, truncation and append actions occur as one atomic update upon job completion. |
| `writeIncrementalResults` | boolean | Optional. This is only supported for a SELECT query using a temporary table. If set, the query is allowed to write results incrementally to the temporary result table. This may incur a performance penalty. This option cannot be used with Legacy SQL. This feature is not yet available. |

### `JobConfigurationTableCopy` fields

| Field | Type | Description |
|---|---|---|
| `createDisposition` | string | Optional. Specifies whether the job is allowed to create new tables. The following values are supported: \* CREATE_IF_NEEDED: If the table does not exist, BigQuery creates the table. \* CREATE_NEVER: The table must already exist. If it does not, a 'notFound' error is returned in the job result. The default value is CREATE_IF_NEEDED. Creation, truncation and append actions occur as one atomic update upon job completion. |
| `destinationEncryptionConfiguration` | EncryptionConfiguration | Custom encryption configuration (e.g., Cloud KMS keys). |
| `destinationExpirationTime` | string (google-datetime) | Optional. The time when the destination table expires. Expired tables will be deleted and their storage reclaimed. |
| `destinationTable` | TableReference | \[Required\] The destination table. |
| `operationType` | string enum | Optional. Supported operation types in table copy job. Values: `OPERATION_TYPE_UNSPECIFIED`, `COPY`, `SNAPSHOT`, `RESTORE`, `CLONE`. |
| `sourceTable` | TableReference | \[Pick one\] Source table to copy. |
| `sourceTables` | `array<TableReference>` | \[Pick one\] Source tables to copy. |
| `writeDisposition` | string | Optional. Specifies the action that occurs if the destination table already exists. The following values are supported: \* WRITE_TRUNCATE: If the table already exists, BigQuery overwrites the table data and uses the schema and table constraints from the source table. \* WRITE_APPEND: If the table already exists, BigQuery appends the data to the table. \* WRITE_EMPTY: If the table already exists and contains data, a 'duplicate' error is returned in the job result. The default value is WRITE_EMPTY. Each action is atomic and only occurs if BigQuery is able to complete the job successfully. Creation, truncation and append actions occur as one atomic update upon job completion. |

### `JobCreationReason` fields

| Field | Type | Description |
|---|---|---|
| `code` | string enum | Output only. Specifies the high level reason why a Job was created. Values: `CODE_UNSPECIFIED`, `REQUESTED`, `LONG_RUNNING`, `LARGE_RESULTS`, `OTHER`. |

### `JobList` fields

| Field | Type | Description |
|---|---|---|
| `etag` | string | A hash of this page of results. |
| `jobs` | `array<object>` | List of jobs that were requested. |
| `jobs[].configuration` | JobConfiguration | Required. Describes the job configuration. |
| `jobs[].errorResult` | ErrorProto | A result object that will be present only if the job has failed. |
| `jobs[].id` | string | Unique opaque ID of the job. |
| `jobs[].jobReference` | JobReference | Unique opaque ID of the job. |
| `jobs[].kind` | string | The resource type. |
| `jobs[].principal_subject` | string | \[Full-projection-only\] String representation of identity of requesting party. Populated for both first- and third-party identities. Only present for APIs that support third-party identities. |
| `jobs[].state` | string | Running state of the job. When the state is DONE, errorResult can be checked to determine whether the job succeeded or failed. |
| `jobs[].statistics` | JobStatistics | Output only. Information about the job, including starting time and ending time of the job. |
| `jobs[].status` | JobStatus | \[Full-projection-only\] Describes the status of this job. |
| `jobs[].user_email` | string | \[Full-projection-only\] Email address of the user who ran the job. |
| `kind` | string | The resource type of the response. |
| `nextPageToken` | string | A token to request the next page of results. |
| `unreachable` | `array<string>` | A list of skipped locations that were unreachable. For more information about BigQuery locations, see: https://cloud.google.com/bigquery/docs/locations. Example: "europe-west5" |

### `JobReference` fields

| Field | Type | Description |
|---|---|---|
| `jobId` | string | Required. The ID of the job. The ID must contain only letters (a-z, A-Z), numbers (0-9), underscores (\_), or dashes (-). The maximum length is 1,024 characters. |
| `location` | string | Optional. The geographic location of the job. The default value is US. For more information about BigQuery locations, see: https://cloud.google.com/bigquery/docs/locations |
| `projectId` | string | Required. The ID of the project containing this job. |

### `JobStatistics` fields

| Field | Type | Description |
|---|---|---|
| `completionRatio` | number (double) | Output only. \[TrustedTester\] Job progress (0.0 -> 1.0) for LOAD and EXTRACT jobs. |
| `copy` | JobStatistics5 | Output only. Statistics for a copy job. |
| `creationTime` | string (int64) | Output only. Creation time of this job, in milliseconds since the epoch. This field will be present on all jobs. |
| `dataMaskingStatistics` | DataMaskingStatistics | Output only. Statistics for data-masking. Present only for query and extract jobs. |
| `edition` | string enum | Output only. Name of edition corresponding to the reservation for this job at the time of this update. Values: `RESERVATION_EDITION_UNSPECIFIED`, `STANDARD`, `ENTERPRISE`, `ENTERPRISE_PLUS`. |
| `endTime` | string (int64) | Output only. End time of this job, in milliseconds since the epoch. This field will be present whenever a job is in the DONE state. |
| `extract` | JobStatistics4 | Output only. Statistics for an extract job. |
| `finalExecutionDurationMs` | string (int64) | Output only. The duration in milliseconds of the execution of the final attempt of this job, as BigQuery may internally re-attempt to execute the job. |
| `globalQueryRemoteRegions` | `array<string>` | Output only. The list of remote regions from which a global query accesses data. This field is populated only for parent global query jobs in the primary execution region. It is empty for child global query jobs and single-region queries. For more information, see Global queries (https://cloud.google.com/bigquery/docs/global-queries). |
| `load` | JobStatistics3 | Output only. Statistics for a load job. |
| `numChildJobs` | string (int64) | Output only. Number of child jobs executed. |
| `parentGlobalQueryJob` | JobReference | Output only. Reference to the parent global query job, if this is a child global query job. This field is populated only for child global query jobs (remote subqueries or cross-region table copy jobs) executed in remote regions on behalf of a global query. It contains the project ID, job ID, and location of the parent global query job. It is unset for parent global query jobs and single-region queries. For more information, see Global queries (https://cloud.google.com/bigquery/docs/global-queries). |
| `parentJobId` | string | Output only. If this is a child job, specifies the job ID of the parent. |
| `query` | JobStatistics2 | Output only. Statistics for a query job. |
| `quotaDeferments` | `array<string>` | Output only. Quotas which delayed this job's start time. |
| `reservationGroupPath` | `array<string>` | Output only. The reservation group path of the reservation assigned to this job. This field has a limit of 10 nested reservation groups. This is to maintain consistency between reservations info schema and jobs info schema. The first reservation group is the root reservation group and the last is the leaf or lowest level reservation group. |
| `reservationUsage` | `array<object>` | Output only. Job resource usage breakdown by reservation. This field reported misleading information and will no longer be populated. Deprecated (`deprecated: true` in the Discovery document; see Notes). |
| `reservationUsage[].name` | string | Reservation name or "unreserved" for on-demand resource usage and multi-statement queries. |
| `reservationUsage[].slotMs` | string (int64) | Total slot milliseconds used by the reservation for a particular job. |
| `reservation_id` | string | Output only. Name of the primary reservation assigned to this job. Note that this could be different than reservations reported in the reservation usage field if parent reservations were used to execute this job. |
| `rowLevelSecurityStatistics` | RowLevelSecurityStatistics | Output only. Statistics for row-level security. Present only for query and extract jobs. |
| `scriptStatistics` | ScriptStatistics | Output only. If this a child job of a script, specifies information about the context of this job within the script. |
| `sessionInfo` | SessionInfo | Output only. Information of the session if this job is part of one. |
| `startTime` | string (int64) | Output only. Start time of this job, in milliseconds since the epoch. This field will be present when the job transitions from the PENDING state to either RUNNING or DONE. |
| `totalBytesProcessed` | string (int64) | Output only. Total bytes processed for the job. |
| `totalSlotMs` | string (int64) | Output only. Slot-milliseconds for the job. |
| `transactionInfo` | TransactionInfo | Output only. \[Alpha\] Information of the multi-statement transaction if this job is part of one. This property is only expected on a child job or a job that is in a session. A script parent job is not part of the transaction started in the script. |

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

## Notes

- Generated from the Discovery document(s) v2 of `bigquery` (retrieved 2026-11-14); a type with the same fields in several versions shows the preferred version; a type whose fields differ between versions is listed once per version (heading suffix `(version)`), and each type's `Version` line names the document it was taken from. A `$ref` resolves to the definition of the same version.
- Fields of an inline object (a field whose Discovery definition has its own `properties`) are listed as `parent.child` rows below the parent row; `[]` marks the elements of an array, for example `access[].role`.
- Corrected from the source proto: the two `connectionId` formats of `ExternalCatalogTableOptions` (`..` and `projects//locations//connections/`) lost their placeholders in the Discovery document; the proto comment reads "The connection_id format must be either `<project_id>.<location_id>.<connection_id>` or `projects/<project_id>/locations/<location_id>/connections/<connection_id>`." (`google/cloud/bigquery/v2/external_catalog_table_options.proto`, https://github.com/googleapis/googleapis/blob/5ce024537af135bb2a0d3228072dd660047956aa/google/cloud/bigquery/v2/external_catalog_table_options.proto, commit `5ce0245`, retrieved 2026-11-19).
- Corrected from the source proto: in the `BigtableColumn` and `BigtableColumnFamily` descriptions the Discovery document lost the family field name placeholders (shown as `.` and `.Column`) and the bracket expressions of the identifier pattern (shown as `a-zA-Z*`); the proto comments read "exposed as `<family field name>.<column field name>` field" (`BigtableColumn.qualifier_encoded`), "can be accessed as `<family field name>.<column field name>`" and "the `<family field name>.Column` field" (`BigtableColumnFamily.columns`, where Discovery shows `.Column`) and "does not match `[a-zA-Z][a-zA-Z0-9_]*`" (`qualifier_encoded` and `field_name`; backticks added) (`google/cloud/bigquery/v2/external_data_config.proto`, https://github.com/googleapis/googleapis/blob/5ce024537af135bb2a0d3228072dd660047956aa/google/cloud/bigquery/v2/external_data_config.proto, commit `5ce0245`, retrieved 2026-11-19).
- Corrected from the source proto: the feature name format `.` in the `featureName` description of `Explanation` lost its placeholders in the Discovery document; the proto comment reads "For non-numerical features, will be formatted like `<column_name>.<encoded_feature_name>`." (`google/cloud/bigquery/v2/model.proto`, https://github.com/googleapis/googleapis/blob/5ce024537af135bb2a0d3228072dd660047956aa/google/cloud/bigquery/v2/model.proto, commit `5ce0245`, retrieved 2026-11-19).
- Deprecated: `ArimaForecastingMetrics.arimaFittingMetrics` (`deprecated: true` in the Discovery document). The Discovery document states no replacement.
- Deprecated: `ArimaForecastingMetrics.hasDrift` (`deprecated: true` in the Discovery document). The Discovery document states no replacement.
- Deprecated: `ArimaForecastingMetrics.nonSeasonalOrder` (`deprecated: true` in the Discovery document). The Discovery document states no replacement.
- Deprecated: `ArimaForecastingMetrics.seasonalPeriods` (`deprecated: true` in the Discovery document). The Discovery document states no replacement.
- Deprecated: `ArimaForecastingMetrics.timeSeriesId` (`deprecated: true` in the Discovery document). The Discovery document states no replacement.
- Deprecated: `BigQueryModelTraining.currentIteration` (its Discovery description). The Discovery document states no replacement.
- Deprecated: `BigQueryModelTraining.expectedTotalIterations` (its Discovery description). The Discovery document states no replacement.
- Deprecated: `BqmlIterationResult.durationMs` (its Discovery description). The Discovery document states no replacement.
- Deprecated: `BqmlIterationResult.evalLoss` (its Discovery description). The Discovery document states no replacement.
- Deprecated: `BqmlIterationResult.index` (its Discovery description). The Discovery document states no replacement.
- Deprecated: `BqmlIterationResult.learnRate` (its Discovery description). The Discovery document states no replacement.
- Deprecated: `BqmlIterationResult.trainingLoss` (its Discovery description). The Discovery document states no replacement.
- Deprecated: `BqmlTrainingRun.iterationResults` (its Discovery description). The Discovery document states no replacement.
- Deprecated: `BqmlTrainingRun.startTime` (its Discovery description). The Discovery document states no replacement.
- Deprecated: `BqmlTrainingRun.state` (its Discovery description). The Discovery document states no replacement.
- Deprecated: `BqmlTrainingRun.trainingOptions` (its Discovery description). The Discovery document states no replacement.
- Deprecated: `Dataset.tags` (`deprecated: true` in the Discovery document). Replacement or status stated in the description: "To provide tags as inputs, use the `resourceTags` field."
- Deprecated: `JobConfigurationExtract.destinationUri` (its Discovery description). Replacement or status stated in the description: "\[Pick one\] DEPRECATED: Use destinationUris instead, passing only one URI as necessary."
- Deprecated: `JobConfigurationLoad.schemaInline` (its Discovery description). The Discovery document states no replacement.
- Deprecated: `JobConfigurationLoad.schemaInlineFormat` (its Discovery description). The Discovery document states no replacement.
- Deprecated: `JobConfigurationQuery.maximumBillingTier` (its Discovery description). Replacement or status stated in the description: "Most users should not need to alter this setting, and we recommend that you avoid introducing new uses of it."
- Deprecated: `JobConfigurationQuery.preserveNulls` (its Discovery description). The Discovery document states no replacement.
- Deprecated: `JobStatistics.reservationUsage` (`deprecated: true` in the Discovery document). Replacement or status stated in the description: "This field reported misleading information and will no longer be populated."
- Deprecated: `JobStatistics2.modelTraining` (its Discovery description). The Discovery document states no replacement.
- Deprecated: `JobStatistics2.modelTrainingCurrentIteration` (its Discovery description). The Discovery document states no replacement.
- Deprecated: `JobStatistics2.modelTrainingExpectedTotalIteration` (its Discovery description). The Discovery document states no replacement.
- Deprecated: `JobStatistics2.reservationUsage` (`deprecated: true` in the Discovery document). Replacement or status stated in the description: "This field reported misleading information and will no longer be populated."
- Source: https://bigquery.googleapis.com/$discovery/rest?version=v2 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
