---
source: https://datastore.googleapis.com/$discovery/rest?version=v1
---

# Cloud Datastore API message schemas (datastore)

## Signature / Usage

Message types referenced by the methods listed under `references/rest/datastore/`.

### `Aggregation`

- Defines an aggregation that produces a single result.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `alias` | string | Optional. Optional name of the property to store the result of the aggregation. If not provided, Datastore will pick a default name following the format `property_`. For example: AGGREGATE COUNT_UP_TO(1) AS count_up_to_1, COUNT_UP_TO(2), COUNT_UP_TO(3) AS count_up_to_3, COUNT(\*) OVER ( ... ); becomes: AGGREGATE COUNT_UP_TO(1) AS count_up_to_1, COUNT_UP_TO(2) AS property_1, COUNT_UP_TO(3) AS count_up_to_3, COUNT(\*) AS property_2 OVER ( ... ); Requires: \* Must be unique across all aggregation aliases. \* Conform to entity property name limitations. |
| `avg` | Avg | Average aggregator. |
| `count` | Count | Count aggregator. |
| `sum` | Sum | Sum aggregator. |

### `AggregationQuery`

- Datastore query for running an aggregation over a Query.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `aggregations` | array<Aggregation> | Optional. Series of aggregations to apply over the results of the `nested_query`. Requires: \* A minimum of one and maximum of five aggregations per query. |
| `nestedQuery` | Query | Nested query for aggregation |

### `AggregationResult`

- The result of a single bucket from a Datastore aggregation query. The keys of `aggregate_properties` are the same for all results in an aggregation query, unlike entity queries which can have different fields present for each result.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `aggregateProperties` | object | The result of the aggregation functions, ex: `COUNT(*) AS total_entities`. The key is the alias assigned to the aggregation function on input and the size of this map equals the number of aggregation functions in the query. |

### `AggregationResultBatch`

- A batch of aggregation results produced by an aggregation query.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `aggregationResults` | array<AggregationResult> | The aggregation results for this batch. |
| `moreResults` | string enum | The state of the query after the current batch. Only COUNT(\*) aggregations are supported in the initial launch. Therefore, expected result type is limited to `NO_MORE_RESULTS`. Values: `MORE_RESULTS_TYPE_UNSPECIFIED`, `NOT_FINISHED`, `MORE_RESULTS_AFTER_LIMIT`, `MORE_RESULTS_AFTER_CURSOR`, `NO_MORE_RESULTS`. |
| `readTime` | string (google-datetime) | Read timestamp this batch was returned from. In a single transaction, subsequent query result batches for the same query can have a greater timestamp. Each batch's read timestamp is valid for all preceding batches. |

### `AllocateIdsRequest`

- The request for Datastore.AllocateIds.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `databaseId` | string | The ID of the database against which to make the request. '(default)' is not allowed; please use empty string '' to refer the default database. |
| `keys` | array<Key> | Required. A list of keys with incomplete key paths for which to allocate IDs. No key may be reserved/read-only. |
| `requestOptions` | RequestOptions | Optional. The options for this request. |

### `AllocateIdsRequest` (v1beta3)

- The request for Datastore.AllocateIds.
- Version: v1beta3

| Field | Type | Description |
|---|---|---|
| `keys` | array<Key> | Required. A list of keys with incomplete key paths for which to allocate IDs. No key may be reserved/read-only. |

### `AllocateIdsResponse`

- The response for Datastore.AllocateIds.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `keys` | array<Key> | The keys specified in the request (in the same order), each with its key path completed with a newly allocated ID. |

### `ArrayValue`

- An array value.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `values` | array<Value> | Values in the array. The order of values in an array is preserved as long as all values have identical settings for 'exclude_from_indexes'. |

### `Avg`

- Average of the values of the requested property. \* Only numeric values will be aggregated. All non-numeric values including `NULL` are skipped. \* If the aggregated values contain `NaN`, returns `NaN`. Infinity math follows IEEE-754 standards. \* If the aggregated value set is empty, returns `NULL`. \* Always returns the result as a double.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `property` | PropertyReference | The property to aggregate on. |

### `BeginTransactionRequest`

- The request for Datastore.BeginTransaction.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `databaseId` | string | The ID of the database against which to make the request. '(default)' is not allowed; please use empty string '' to refer the default database. |
| `requestOptions` | RequestOptions | Optional. The options for this request. |
| `transactionOptions` | TransactionOptions | Options for a new transaction. |

### `BeginTransactionRequest` (v1beta3)

- The request for Datastore.BeginTransaction.
- Version: v1beta3

| Field | Type | Description |
|---|---|---|
| `transactionOptions` | TransactionOptions | Options for a new transaction. |

### `BeginTransactionResponse`

- The response for Datastore.BeginTransaction.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `transaction` | string (byte) | The transaction identifier (always present). |

### `CommitRequest`

- The request for Datastore.Commit.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `databaseId` | string | The ID of the database against which to make the request. '(default)' is not allowed; please use empty string '' to refer the default database. |
| `mode` | string enum | The type of commit to perform. Defaults to `TRANSACTIONAL`. Values: `MODE_UNSPECIFIED`, `TRANSACTIONAL`, `NON_TRANSACTIONAL`. |
| `mutations` | array<Mutation> | The mutations to perform. When mode is `TRANSACTIONAL`, mutations affecting a single entity are applied in order. The following sequences of mutations affecting a single entity are not permitted in a single `Commit` request: - `insert` followed by `insert` - `update` followed by `insert` - `upsert` followed by `insert` - `delete` followed by `update` When mode is `NON_TRANSACTIONAL`, no two mutations may affect a single entity. |
| `requestOptions` | RequestOptions | Optional. The options for this request. |
| `singleUseTransaction` | TransactionOptions | Options for beginning a new transaction for this request. The transaction is committed when the request completes. If specified, TransactionOptions.mode must be TransactionOptions.ReadWrite. |
| `transaction` | string (byte) | The identifier of the transaction associated with the commit. A transaction identifier is returned by a call to Datastore.BeginTransaction. |

### `CommitRequest` (v1beta3)

- The request for Datastore.Commit.
- Version: v1beta3

| Field | Type | Description |
|---|---|---|
| `mode` | string enum | The type of commit to perform. Defaults to `TRANSACTIONAL`. Values: `MODE_UNSPECIFIED`, `TRANSACTIONAL`, `NON_TRANSACTIONAL`. |
| `mutations` | array<Mutation> | The mutations to perform. When mode is `TRANSACTIONAL`, mutations affecting a single entity are applied in order. The following sequences of mutations affecting a single entity are not permitted in a single `Commit` request: - `insert` followed by `insert` - `update` followed by `insert` - `upsert` followed by `insert` - `delete` followed by `update` When mode is `NON_TRANSACTIONAL`, no two mutations may affect a single entity. |
| `transaction` | string (byte) | The identifier of the transaction associated with the commit. A transaction identifier is returned by a call to Datastore.BeginTransaction. |

### `CommitResponse`

- The response for Datastore.Commit.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `commitTime` | string (google-datetime) | The transaction commit timestamp. Not set for non-transactional commits. |
| `indexUpdates` | integer (int32) | The number of index entries updated during the commit, or zero if none were updated. |
| `mutationResults` | array<MutationResult> | The result of performing the mutations. The i-th mutation result corresponds to the i-th mutation in the request. |

### `CompositeFilter`

- A filter that merges multiple other filters using the given operator.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `filters` | array<Filter> | The list of filters to combine. Requires: \* At least one filter is present. |
| `op` | string enum | The operator for combining multiple filters. Values: `OPERATOR_UNSPECIFIED`, `AND`, `OR`. |

### `Count`

- Count of entities that match the query. The `COUNT(*)` aggregation function operates on the entire entity so it does not require a field reference.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `upTo` | string (int64) | Optional. Optional constraint on the maximum number of entities to count. This provides a way to set an upper bound on the number of entities to scan, limiting latency, and cost. Unspecified is interpreted as no bound. If a zero value is provided, a count result of zero should always be expected. High-Level Example: AGGREGATE COUNT_UP_TO(1000) OVER ( SELECT \* FROM k ); Requires: \* Must be non-negative when present. |

### `Empty`

- A generic empty message that you can re-use to avoid defining duplicated empty messages in your APIs. A typical example is to use it as the request or the response type of an API method. For instance: service Foo { rpc Bar(google.protobuf.Empty) returns (google.protobuf.Empty); }
- Version: v1

### `Entity`

- A Datastore data object. Must not exceed 1 MiB - 4 bytes.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `key` | Key | The entity's key. An entity must have a key, unless otherwise documented (for example, an entity in `Value.entity_value` may have no key). An entity's kind is its key path's last element's kind, or null if it has no key. |
| `properties` | object | The entity's properties. The map's keys are property names. A property name matching regex `__.*__` is reserved. A reserved property name is forbidden in certain documented contexts. The map keys, represented as UTF-8, must not exceed 1,500 bytes and cannot be empty. |

### `EntityResult`

- The result of fetching an entity from Datastore.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | The time at which the entity was created. This field is set for `FULL` entity results. If this entity is missing, this field will not be set. |
| `cursor` | string (byte) | A cursor that points to the position after the result entity. Set only when the `EntityResult` is part of a `QueryResultBatch` message. |
| `entity` | Entity | The resulting entity. |
| `updateTime` | string (google-datetime) | The time at which the entity was last changed. This field is set for `FULL` entity results. If this entity is missing, this field will not be set. |
| `version` | string (int64) | The version of the entity, a strictly positive number that monotonically increases with changes to the entity. This field is set for `FULL` entity results. For missing entities in `LookupResponse`, this is the version of the snapshot that was used to look up the entity, and it is always set except for eventually consistent reads. |

### `ExecutionStats`

- Execution statistics for the query.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `debugStats` | object | Debugging statistics from the execution of the query. Note that the debugging stats are subject to change as Firestore evolves. It could include: { "indexes_entries_scanned": "1000", "documents_scanned": "20", "billing_details" : { "documents_billable": "20", "index_entries_billable": "1000", "min_query_cost": "0" } } |
| `executionDuration` | string (google-duration) | Total time to execute the query in the backend. |
| `readOperations` | string (int64) | Total billable read operations. |
| `resultsReturned` | string (int64) | Total number of results returned, including documents, projections, aggregation results, keys. |

### `ExplainMetrics`

- Explain metrics for the query.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `executionStats` | ExecutionStats | Aggregated stats from the execution of the query. Only present when ExplainOptions.analyze is set to true. |
| `planSummary` | PlanSummary | Planning phase information for the query. |

### `ExplainOptions`

- Explain options for the query.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `analyze` | boolean | Optional. Whether to execute this query. When false (the default), the query will be planned, returning only metrics from the planning stages. When true, the query will be planned and executed, returning the full query results along with both planning and execution stage metrics. |

### `Filter`

- A holder for any type of filter.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `compositeFilter` | CompositeFilter | A composite filter. |
| `propertyFilter` | PropertyFilter | A filter on a property. |

### `FindNearest`

- Nearest Neighbors search config. The ordering provided by FindNearest supersedes the order_by stage. If multiple documents have the same vector distance, the returned document order is not guaranteed to be stable between queries.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `distanceMeasure` | string enum | Required. The Distance Measure to use, required. Values: `DISTANCE_MEASURE_UNSPECIFIED`, `EUCLIDEAN`, `COSINE`, `DOT_PRODUCT`. |
| `distanceResultProperty` | string | Optional. Optional name of the field to output the result of the vector distance calculation. Must conform to entity property limitations. |
| `distanceThreshold` | number (double) | Optional. Option to specify a threshold for which no less similar documents will be returned. The behavior of the specified `distance_measure` will affect the meaning of the distance threshold. Since DOT_PRODUCT distances increase when the vectors are more similar, the comparison is inverted. \* For EUCLIDEAN, COSINE: WHERE distance <= distance_threshold \* For DOT_PRODUCT: WHERE distance >= distance_threshold |
| `limit` | integer (int32) | Required. The number of nearest neighbors to return. Must be a positive integer of no more than 100. |
| `queryVector` | Value | Required. The query vector that we are searching on. Must be a vector of no more than 2048 dimensions. |
| `vectorProperty` | PropertyReference | Required. An indexed vector property to search upon. Only documents which contain vectors whose dimensionality match the query_vector can be returned. |

### `GoogleDatastoreAdminV1CommonMetadata`

- Metadata common to all Datastore Admin operations.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `endTime` | string (google-datetime) | The time the operation ended, either successfully or otherwise. |
| `labels` | object | The client-assigned labels which were provided when the operation was created. May also include additional labels. |
| `operationType` | string enum | The type of the operation. Can be used as a filter in ListOperationsRequest. Values: `OPERATION_TYPE_UNSPECIFIED`, `EXPORT_ENTITIES`, `IMPORT_ENTITIES`, `CREATE_INDEX`, `DELETE_INDEX`. |
| `startTime` | string (google-datetime) | The time that work began on the operation. |
| `state` | string enum | The current state of the Operation. Values: `STATE_UNSPECIFIED`, `INITIALIZING`, `PROCESSING`, `CANCELLING`, `FINALIZING`, `SUCCESSFUL`, `FAILED`, `CANCELLED`. |

### `GoogleDatastoreAdminV1DatastoreFirestoreMigrationMetadata`

- Metadata for Datastore to Firestore migration operations. The DatastoreFirestoreMigration operation is not started by the end-user via an explicit "creation" method. This is an intentional deviation from the LRO design pattern. This singleton resource can be accessed at: "projects/{project_id}/operations/datastore-firestore-migration"
- Version: v1

| Field | Type | Description |
|---|---|---|
| `migrationState` | string enum | The current state of migration from Cloud Datastore to Cloud Firestore in Datastore mode. Values: `MIGRATION_STATE_UNSPECIFIED`, `RUNNING`, `PAUSED`, `COMPLETE`. |
| `migrationStep` | string enum | The current step of migration from Cloud Datastore to Cloud Firestore in Datastore mode. Values: `MIGRATION_STEP_UNSPECIFIED`, `PREPARE`, `START`, `APPLY_WRITES_SYNCHRONOUSLY`, `COPY_AND_VERIFY`, `REDIRECT_EVENTUALLY_CONSISTENT_READS`, `REDIRECT_STRONGLY_CONSISTENT_READS`, `REDIRECT_WRITES`. |

### `GoogleDatastoreAdminV1EntityFilter`

- Identifies a subset of entities in a project. This is specified as combinations of kinds and namespaces (either or both of which may be all, as described in the following examples). Example usage: Entire project: kinds=\[\], namespace_ids=\[\] Kinds Foo and Bar in all namespaces: kinds=\['Foo', 'Bar'\], namespace_ids=\[\] Kinds Foo and Bar only in the default namespace: kinds=\['Foo', 'Bar'\], namespace_ids=\[''\] Kinds Foo and Bar in both the default and Baz namespaces: kinds=\['Foo', 'Bar'\], namespace_ids=\['', 'Baz'\] The entire Baz namespace: kinds=\[\], namespace_ids=\['Baz'\]
- Version: v1

| Field | Type | Description |
|---|---|---|
| `kinds` | array<string> | If empty, then this represents all kinds. |
| `namespaceIds` | array<string> | An empty list represents all namespaces. This is the preferred usage for projects that don't use namespaces. An empty string element represents the default namespace. This should be used if the project has data in non-default namespaces, but doesn't want to include them. Each namespace in this list must be unique. |

### `GoogleDatastoreAdminV1ExportEntitiesMetadata`

- Metadata for ExportEntities operations.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `common` | GoogleDatastoreAdminV1CommonMetadata | Metadata common to all Datastore Admin operations. |
| `entityFilter` | GoogleDatastoreAdminV1EntityFilter | Description of which entities are being exported. |
| `outputUrlPrefix` | string | Location for the export metadata and data files. This will be the same value as the google.datastore.admin.v1.ExportEntitiesRequest.output_url_prefix field. The final output location is provided in google.datastore.admin.v1.ExportEntitiesResponse.output_url. |
| `progressBytes` | GoogleDatastoreAdminV1Progress | An estimate of the number of bytes processed. |
| `progressEntities` | GoogleDatastoreAdminV1Progress | An estimate of the number of entities processed. |

### `GoogleDatastoreAdminV1ExportEntitiesRequest`

- The request for google.datastore.admin.v1.DatastoreAdmin.ExportEntities.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `entityFilter` | GoogleDatastoreAdminV1EntityFilter | Description of what data from the project is included in the export. |
| `labels` | object | Client-assigned labels. |
| `outputUrlPrefix` | string | Required. Location for the export metadata and data files. The full resource URL of the external storage location. Currently, only Google Cloud Storage is supported. So output_url_prefix should be of the form: `gs://BUCKET_NAME[/NAMESPACE_PATH]`, where `BUCKET_NAME` is the name of the Cloud Storage bucket and `NAMESPACE_PATH` is an optional Cloud Storage namespace path (this is not a Cloud Datastore namespace). For more information about Cloud Storage namespace paths, see Object name considerations (https://cloud.google.com/storage/docs/naming#object-considerations). The resulting files will be nested deeper than the specified URL prefix. The final output URL will be provided in the google.datastore.admin.v1.ExportEntitiesResponse.output_url field. That value should be used for subsequent ImportEntities operations. By nesting the data files deeper, the same Cloud Storage bucket can be used in multiple ExportEntities operations without conflict. |

### `GoogleDatastoreAdminV1ExportEntitiesResponse`

- The response for google.datastore.admin.v1.DatastoreAdmin.ExportEntities.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `outputUrl` | string | Location of the output metadata file. This can be used to begin an import into Cloud Datastore (this project or another project). See google.datastore.admin.v1.ImportEntitiesRequest.input_url. Only present if the operation completed successfully. |

### `GoogleDatastoreAdminV1ImportEntitiesMetadata`

- Metadata for ImportEntities operations.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `common` | GoogleDatastoreAdminV1CommonMetadata | Metadata common to all Datastore Admin operations. |
| `entityFilter` | GoogleDatastoreAdminV1EntityFilter | Description of which entities are being imported. |
| `inputUrl` | string | The location of the import metadata file. This will be the same value as the google.datastore.admin.v1.ExportEntitiesResponse.output_url field. |
| `progressBytes` | GoogleDatastoreAdminV1Progress | An estimate of the number of bytes processed. |
| `progressEntities` | GoogleDatastoreAdminV1Progress | An estimate of the number of entities processed. |

### `GoogleDatastoreAdminV1ImportEntitiesRequest`

- The request for google.datastore.admin.v1.DatastoreAdmin.ImportEntities.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `entityFilter` | GoogleDatastoreAdminV1EntityFilter | Optionally specify which kinds/namespaces are to be imported. If provided, the list must be a subset of the EntityFilter used in creating the export, otherwise a FAILED_PRECONDITION error will be returned. If no filter is specified then all entities from the export are imported. |
| `inputUrl` | string | Required. The full resource URL of the external storage location. Currently, only Google Cloud Storage is supported. So input_url should be of the form: `gs://BUCKET_NAME[/NAMESPACE_PATH]/OVERALL_EXPORT_METADATA_FILE`, where `BUCKET_NAME` is the name of the Cloud Storage bucket, `NAMESPACE_PATH` is an optional Cloud Storage namespace path (this is not a Cloud Datastore namespace), and `OVERALL_EXPORT_METADATA_FILE` is the metadata file written by the ExportEntities operation. For more information about Cloud Storage namespace paths, see Object name considerations (https://cloud.google.com/storage/docs/naming#object-considerations). For more information, see google.datastore.admin.v1.ExportEntitiesResponse.output_url. |
| `labels` | object | Client-assigned labels. |

### `GoogleDatastoreAdminV1Index`

- Datastore composite index definition.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `ancestor` | string enum | Required. The index's ancestor mode. Must not be ANCESTOR_MODE_UNSPECIFIED. Values: `ANCESTOR_MODE_UNSPECIFIED`, `NONE`, `ALL_ANCESTORS`. |
| `indexId` | string | Output only. The resource ID of the index. |
| `kind` | string | Required. The entity kind to which this index applies. |
| `projectId` | string | Output only. Project ID. |
| `properties` | array<GoogleDatastoreAdminV1IndexedProperty> | Required. An ordered sequence of property names and their index attributes. Requires: \* A maximum of 100 properties. |
| `state` | string enum | Output only. The state of the index. Values: `STATE_UNSPECIFIED`, `CREATING`, `READY`, `DELETING`, `ERROR`. |

### `GoogleDatastoreAdminV1IndexOperationMetadata`

- Metadata for Index operations.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `common` | GoogleDatastoreAdminV1CommonMetadata | Metadata common to all Datastore Admin operations. |
| `indexId` | string | The index resource ID that this operation is acting on. |
| `progressEntities` | GoogleDatastoreAdminV1Progress | An estimate of the number of entities processed. |

### `GoogleDatastoreAdminV1IndexedProperty`

- A property of an index.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `direction` | string enum | Required. The indexed property's direction. Must not be DIRECTION_UNSPECIFIED. Values: `DIRECTION_UNSPECIFIED`, `ASCENDING`, `DESCENDING`. |
| `name` | string | Required. The property name to index. |

### `GoogleDatastoreAdminV1ListIndexesResponse`

- The response for google.datastore.admin.v1.DatastoreAdmin.ListIndexes.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `indexes` | array<GoogleDatastoreAdminV1Index> | The indexes. |
| `nextPageToken` | string | The standard List next-page token. |

### `GoogleDatastoreAdminV1MigrationProgressEvent`

- An event signifying the start of a new step in a migration from Cloud Datastore to Cloud Firestore in Datastore mode (https://cloud.google.com/datastore/docs/upgrade-to-firestore).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `prepareStepDetails` | GoogleDatastoreAdminV1PrepareStepDetails | Details for the `PREPARE` step. |
| `redirectWritesStepDetails` | GoogleDatastoreAdminV1RedirectWritesStepDetails | Details for the `REDIRECT_WRITES` step. |
| `step` | string enum | The step that is starting. An event with step set to `START` indicates that the migration has been reverted back to the initial pre-migration state. Values: `MIGRATION_STEP_UNSPECIFIED`, `PREPARE`, `START`, `APPLY_WRITES_SYNCHRONOUSLY`, `COPY_AND_VERIFY`, `REDIRECT_EVENTUALLY_CONSISTENT_READS`, `REDIRECT_STRONGLY_CONSISTENT_READS`, `REDIRECT_WRITES`. |

### `GoogleDatastoreAdminV1MigrationStateEvent`

- An event signifying a change in state of a migration from Cloud Datastore to Cloud Firestore in Datastore mode (https://cloud.google.com/datastore/docs/upgrade-to-firestore).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `state` | string enum | The new state of the migration. Values: `MIGRATION_STATE_UNSPECIFIED`, `RUNNING`, `PAUSED`, `COMPLETE`. |

### `GoogleDatastoreAdminV1PrepareStepDetails`

- Details for the `PREPARE` step.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `concurrencyMode` | string enum | The concurrency mode this database will use when it reaches the `REDIRECT_WRITES` step. Values: `CONCURRENCY_MODE_UNSPECIFIED`, `PESSIMISTIC`, `OPTIMISTIC`, `OPTIMISTIC_WITH_ENTITY_GROUPS`. |

### `GoogleDatastoreAdminV1Progress`

- Measures the progress of a particular metric.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `workCompleted` | string (int64) | The amount of work that has been completed. Note that this may be greater than work_estimated. |
| `workEstimated` | string (int64) | An estimate of how much work needs to be performed. May be zero if the work estimate is unavailable. |

### `GoogleDatastoreAdminV1RedirectWritesStepDetails`

- Details for the `REDIRECT_WRITES` step.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `concurrencyMode` | string enum | The concurrency mode for this database. Values: `CONCURRENCY_MODE_UNSPECIFIED`, `PESSIMISTIC`, `OPTIMISTIC`, `OPTIMISTIC_WITH_ENTITY_GROUPS`. |

### `GoogleDatastoreAdminV1beta1CommonMetadata`

- Metadata common to all Datastore Admin operations.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `endTime` | string (google-datetime) | The time the operation ended, either successfully or otherwise. |
| `labels` | object | The client-assigned labels which were provided when the operation was created. May also include additional labels. |
| `operationType` | string enum | The type of the operation. Can be used as a filter in ListOperationsRequest. Values: `OPERATION_TYPE_UNSPECIFIED`, `EXPORT_ENTITIES`, `IMPORT_ENTITIES`. |
| `startTime` | string (google-datetime) | The time that work began on the operation. |
| `state` | string enum | The current state of the Operation. Values: `STATE_UNSPECIFIED`, `INITIALIZING`, `PROCESSING`, `CANCELLING`, `FINALIZING`, `SUCCESSFUL`, `FAILED`, `CANCELLED`. |

### `GoogleDatastoreAdminV1beta1EntityFilter`

- Identifies a subset of entities in a project. This is specified as combinations of kinds and namespaces (either or both of which may be all, as described in the following examples). Example usage: Entire project: kinds=\[\], namespace_ids=\[\] Kinds Foo and Bar in all namespaces: kinds=\['Foo', 'Bar'\], namespace_ids=\[\] Kinds Foo and Bar only in the default namespace: kinds=\['Foo', 'Bar'\], namespace_ids=\[''\] Kinds Foo and Bar in both the default and Baz namespaces: kinds=\['Foo', 'Bar'\], namespace_ids=\['', 'Baz'\] The entire Baz namespace: kinds=\[\], namespace_ids=\['Baz'\]
- Version: v1

| Field | Type | Description |
|---|---|---|
| `kinds` | array<string> | If empty, then this represents all kinds. |
| `namespaceIds` | array<string> | An empty list represents all namespaces. This is the preferred usage for projects that don't use namespaces. An empty string element represents the default namespace. This should be used if the project has data in non-default namespaces, but doesn't want to include them. Each namespace in this list must be unique. |

### `GoogleDatastoreAdminV1beta1ExportEntitiesMetadata`

- Metadata for ExportEntities operations.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `common` | GoogleDatastoreAdminV1beta1CommonMetadata | Metadata common to all Datastore Admin operations. |
| `entityFilter` | GoogleDatastoreAdminV1beta1EntityFilter | Description of which entities are being exported. |
| `outputUrlPrefix` | string | Location for the export metadata and data files. This will be the same value as the google.datastore.admin.v1beta1.ExportEntitiesRequest.output_url_prefix field. The final output location is provided in google.datastore.admin.v1beta1.ExportEntitiesResponse.output_url. |
| `progressBytes` | GoogleDatastoreAdminV1beta1Progress | An estimate of the number of bytes processed. |
| `progressEntities` | GoogleDatastoreAdminV1beta1Progress | An estimate of the number of entities processed. |

### `GoogleDatastoreAdminV1beta1ExportEntitiesRequest`

- The request for google.datastore.admin.v1beta1.DatastoreAdmin.ExportEntities.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `entityFilter` | GoogleDatastoreAdminV1beta1EntityFilter | Description of what data from the project is included in the export. |
| `labels` | object | Client-assigned labels. |
| `outputUrlPrefix` | string | Location for the export metadata and data files. The full resource URL of the external storage location. Currently, only Google Cloud Storage is supported. So output_url_prefix should be of the form: `gs://BUCKET_NAME[/NAMESPACE_PATH]`, where `BUCKET_NAME` is the name of the Cloud Storage bucket and `NAMESPACE_PATH` is an optional Cloud Storage namespace path (this is not a Cloud Datastore namespace). For more information about Cloud Storage namespace paths, see Object name considerations (https://cloud.google.com/storage/docs/naming#object-considerations). The resulting files will be nested deeper than the specified URL prefix. The final output URL will be provided in the google.datastore.admin.v1beta1.ExportEntitiesResponse.output_url field. That value should be used for subsequent ImportEntities operations. By nesting the data files deeper, the same Cloud Storage bucket can be used in multiple ExportEntities operations without conflict. |

### `GoogleDatastoreAdminV1beta1ExportEntitiesResponse`

- The response for google.datastore.admin.v1beta1.DatastoreAdmin.ExportEntities.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `outputUrl` | string | Location of the output metadata file. This can be used to begin an import into Cloud Datastore (this project or another project). See google.datastore.admin.v1beta1.ImportEntitiesRequest.input_url. Only present if the operation completed successfully. |

### `GoogleDatastoreAdminV1beta1ImportEntitiesMetadata`

- Metadata for ImportEntities operations.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `common` | GoogleDatastoreAdminV1beta1CommonMetadata | Metadata common to all Datastore Admin operations. |
| `entityFilter` | GoogleDatastoreAdminV1beta1EntityFilter | Description of which entities are being imported. |
| `inputUrl` | string | The location of the import metadata file. This will be the same value as the google.datastore.admin.v1beta1.ExportEntitiesResponse.output_url field. |
| `progressBytes` | GoogleDatastoreAdminV1beta1Progress | An estimate of the number of bytes processed. |
| `progressEntities` | GoogleDatastoreAdminV1beta1Progress | An estimate of the number of entities processed. |

### `GoogleDatastoreAdminV1beta1ImportEntitiesRequest`

- The request for google.datastore.admin.v1beta1.DatastoreAdmin.ImportEntities.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `entityFilter` | GoogleDatastoreAdminV1beta1EntityFilter | Optionally specify which kinds/namespaces are to be imported. If provided, the list must be a subset of the EntityFilter used in creating the export, otherwise a FAILED_PRECONDITION error will be returned. If no filter is specified then all entities from the export are imported. |
| `inputUrl` | string | The full resource URL of the external storage location. Currently, only Google Cloud Storage is supported. So input_url should be of the form: `gs://BUCKET_NAME[/NAMESPACE_PATH]/OVERALL_EXPORT_METADATA_FILE`, where `BUCKET_NAME` is the name of the Cloud Storage bucket, `NAMESPACE_PATH` is an optional Cloud Storage namespace path (this is not a Cloud Datastore namespace), and `OVERALL_EXPORT_METADATA_FILE` is the metadata file written by the ExportEntities operation. For more information about Cloud Storage namespace paths, see Object name considerations (https://cloud.google.com/storage/docs/naming#object-considerations). For more information, see google.datastore.admin.v1beta1.ExportEntitiesResponse.output_url. |
| `labels` | object | Client-assigned labels. |

### `GoogleDatastoreAdminV1beta1Progress`

- Measures the progress of a particular metric.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `workCompleted` | string (int64) | The amount of work that has been completed. Note that this may be greater than work_estimated. |
| `workEstimated` | string (int64) | An estimate of how much work needs to be performed. May be zero if the work estimate is unavailable. |

### `GoogleLongrunningListOperationsResponse`

- The response message for Operations.ListOperations.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | The standard List next-page token. |
| `operations` | array<GoogleLongrunningOperation> | A list of operations that matches the specified filter in the request. |
| `unreachable` | array<string> | Unordered list. Unreachable resources. Populated when the request sets `ListOperationsRequest.return_partial_success` and reads across collections. For example, when attempting to list all resources across all supported locations. |

### `GoogleLongrunningOperation`

- This resource represents a long-running operation that is the result of a network API call.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `done` | boolean | If the value is `false`, it means the operation is still in progress. If `true`, the operation is completed, and either `error` or `response` is available. |
| `error` | Status | The error result of the operation in case of failure or cancellation. |
| `metadata` | object | Service-specific metadata associated with the operation. It typically contains progress information and common metadata such as create time. Some services might not provide such metadata. Any method that returns a long-running operation should document the metadata type, if any. |
| `name` | string | The server-assigned name, which is only unique within the same service that originally returns it. If you use the default HTTP mapping, the `name` should be a resource name ending with `operations/{unique_id}`. |
| `response` | object | The normal, successful response of the operation. If the original method returns no data on success, such as `Delete`, the response is `google.protobuf.Empty`. If the original method is standard `Get`/`Create`/`Update`, the response should be the resource. For other methods, the response should have the type `XxxResponse`, where `Xxx` is the original method name. For example, if the original method name is `TakeSnapshot()`, the inferred response type is `TakeSnapshotResponse`. |

### `GqlQuery`

- A GQL query (https://cloud.google.com/datastore/docs/apis/gql/gql_reference).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `allowLiterals` | boolean | When false, the query string must not contain any literals and instead must bind all values. For example, `SELECT * FROM Kind WHERE a = 'string literal'` is not allowed, while `SELECT * FROM Kind WHERE a = @value` is. |
| `namedBindings` | object | For each non-reserved named binding site in the query string, there must be a named parameter with that name, but not necessarily the inverse. Key must match regex `A-Za-z_$*`, must not match regex `__.*__`, and must not be `""`. |
| `positionalBindings` | array<GqlQueryParameter> | Numbered binding site @1 references the first numbered parameter, effectively using 1-based indexing, rather than the usual 0. For each binding site numbered i in `query_string`, there must be an i-th numbered parameter. The inverse must also be true. |
| `queryString` | string | A string of the format described here (https://cloud.google.com/datastore/docs/apis/gql/gql_reference). |

### `GqlQueryParameter`

- A binding parameter for a GQL query.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `cursor` | string (byte) | A query cursor. Query cursors are returned in query result batches. |
| `value` | Value | A value parameter. |

### `Key`

- A unique identifier for an entity. If a key's partition ID or any of its path kinds or names are reserved/read-only, the key is reserved/read-only. A reserved/read-only key is forbidden in certain documented contexts.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `partitionId` | PartitionId | Entities are partitioned into subsets, currently identified by a project ID and namespace ID. Queries are scoped to a single partition. |
| `path` | array<PathElement> | The entity path. An entity path consists of one or more elements composed of a kind and a string or numerical identifier, which identify entities. The first element identifies a \_root entity\_, the second element identifies a \_child\_ of the root entity, the third element identifies a child of the second entity, and so forth. The entities identified by all prefixes of the path are called the element's \_ancestors\_. An entity path is always fully complete: \*all\* of the entity's ancestors are required to be in the path along with the entity identifier itself. The only exception is that in some documented cases, the identifier in the last path element (for the entity) itself may be omitted. For example, the last path element of the key of `Mutation.insert` may have no identifier. A path can never be empty, and a path can have at most 100 elements. |

### `KindExpression`

- A representation of a kind.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `name` | string | The name of the kind. |

### `LatLng`

- An object that represents a latitude/longitude pair. This is expressed as a pair of doubles to represent degrees latitude and degrees longitude. Unless specified otherwise, this object must conform to the WGS84 standard. Values must be within normalized ranges.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `latitude` | number (double) | The latitude in degrees. It must be in the range \[-90.0, +90.0\]. |
| `longitude` | number (double) | The longitude in degrees. It must be in the range \[-180.0, +180.0\]. |

### `LookupRequest`

- The request for Datastore.Lookup.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `databaseId` | string | The ID of the database against which to make the request. '(default)' is not allowed; please use empty string '' to refer the default database. |
| `keys` | array<Key> | Required. Keys of entities to look up. |
| `propertyMask` | PropertyMask | The properties to return. Defaults to returning all properties. If this field is set and an entity has a property not referenced in the mask, it will be absent from LookupResponse.found.entity.properties. The entity's key is always returned. |
| `readOptions` | ReadOptions | The options for this lookup request. |
| `requestOptions` | RequestOptions | Optional. The options for this request. |

### `LookupRequest` (v1beta3)

- The request for Datastore.Lookup.
- Version: v1beta3

| Field | Type | Description |
|---|---|---|
| `keys` | array<Key> | Required. Keys of entities to look up. |
| `propertyMask` | PropertyMask | The properties to return. Defaults to returning all properties. If this field is set and an entity has a property not referenced in the mask, it will be absent from LookupResponse.found.entity.properties. The entity's key is always returned. |
| `readOptions` | ReadOptions | The options for this lookup request. |

### `LookupResponse`

- The response for Datastore.Lookup.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `deferred` | array<Key> | A list of keys that were not looked up due to resource constraints. The order of results in this field is undefined and has no relation to the order of the keys in the input. |
| `found` | array<EntityResult> | Entities found as `ResultType.FULL` entities. The order of results in this field is undefined and has no relation to the order of the keys in the input. |
| `missing` | array<EntityResult> | Entities not found as `ResultType.KEY_ONLY` entities. The order of results in this field is undefined and has no relation to the order of the keys in the input. |
| `readTime` | string (google-datetime) | The time at which these entities were read or found missing. |
| `transaction` | string (byte) | The identifier of the transaction that was started as part of this Lookup request. Set only when ReadOptions.new_transaction was set in LookupRequest.read_options. |

### `LookupResponse` (v1beta3)

- The response for Datastore.Lookup.
- Version: v1beta3

| Field | Type | Description |
|---|---|---|
| `deferred` | array<Key> | A list of keys that were not looked up due to resource constraints. The order of results in this field is undefined and has no relation to the order of the keys in the input. |
| `found` | array<EntityResult> | Entities found as `ResultType.FULL` entities. The order of results in this field is undefined and has no relation to the order of the keys in the input. |
| `missing` | array<EntityResult> | Entities not found as `ResultType.KEY_ONLY` entities. The order of results in this field is undefined and has no relation to the order of the keys in the input. |
| `readTime` | string (google-datetime) | The time at which these entities were read or found missing. |

### `Mutation`

- A mutation to apply to an entity.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `baseVersion` | string (int64) | The version of the entity that this mutation is being applied to. If this does not match the current version on the server, the mutation conflicts. |
| `conflictResolutionStrategy` | string enum | The strategy to use when a conflict is detected. Defaults to `SERVER_VALUE`. If this is set, then `conflict_detection_strategy` must also be set. Values: `STRATEGY_UNSPECIFIED`, `SERVER_VALUE`, `FAIL`. |
| `delete` | Key | The key of the entity to delete. The entity may or may not already exist. Must have a complete key path and must not be reserved/read-only. |
| `insert` | Entity | The entity to insert. The entity must not already exist. The entity key's final path element may be incomplete. |
| `propertyMask` | PropertyMask | The properties to write in this mutation. None of the properties in the mask may have a reserved name, except for `__key__`. This field is ignored for `delete`. If the entity already exists, only properties referenced in the mask are updated, others are left untouched. Properties referenced in the mask but not in the entity are deleted. |
| `propertyTransforms` | array<PropertyTransform> | Optional. The transforms to perform on the entity. This field can be set only when the operation is `insert`, `update`, or `upsert`. If present, the transforms are be applied to the entity regardless of the property mask, in order, after the operation. |
| `update` | Entity | The entity to update. The entity must already exist. Must have a complete key path. |
| `updateTime` | string (google-datetime) | The update time of the entity that this mutation is being applied to. If this does not match the current update time on the server, the mutation conflicts. |
| `upsert` | Entity | The entity to upsert. The entity may or may not already exist. The entity key's final path element may be incomplete. |

### `MutationResult`

- The result of applying a mutation.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `conflictDetected` | boolean | Whether a conflict was detected for this mutation. Always false when a conflict detection strategy field is not set in the mutation. |
| `createTime` | string (google-datetime) | The create time of the entity. This field will not be set after a 'delete'. |
| `key` | Key | The automatically allocated key. Set only when the mutation allocated a key. |
| `transformResults` | array<Value> | The results of applying each PropertyTransform, in the same order of the request. |
| `updateTime` | string (google-datetime) | The update time of the entity on the server after processing the mutation. If the mutation doesn't change anything on the server, then the timestamp will be the update timestamp of the current entity. This field will not be set after a 'delete'. |
| `version` | string (int64) | The version of the entity on the server after processing the mutation. If the mutation doesn't change anything on the server, then the version will be the version of the current entity or, if no entity is present, a version that is strictly greater than the version of any previous entity and less than the version of any possible future entity. |

### `PartitionId`

- A partition ID identifies a grouping of entities. The grouping is always by project and namespace, however the namespace ID may be empty. A partition ID contains several dimensions: project ID and namespace ID. Partition dimensions: - May be `""`. - Must be valid UTF-8 bytes. - Must have values that match regex `[A-Za-z\d\.\-_]{1,100}` If the value of any dimension matches regex `__.*__`, the partition is reserved/read-only. A reserved/read-only partition ID is forbidden in certain documented contexts. Foreign partition IDs (in which the project ID does not match the context project ID ) are discouraged. Reads and writes of foreign partition IDs may fail if the project is not in an active state.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `databaseId` | string | If not empty, the ID of the database to which the entities belong. |
| `namespaceId` | string | If not empty, the ID of the namespace to which the entities belong. |
| `projectId` | string | The ID of the project to which the entities belong. |

### `PartitionId` (v1beta3)

- A partition ID identifies a grouping of entities. The grouping is always by project and namespace, however the namespace ID may be empty. A partition ID contains several dimensions: project ID and namespace ID. Partition dimensions: - May be `""`. - Must be valid UTF-8 bytes. - Must have values that match regex `[A-Za-z\d\.\-_]{1,100}` If the value of any dimension matches regex `__.*__`, the partition is reserved/read-only. A reserved/read-only partition ID is forbidden in certain documented contexts. Foreign partition IDs (in which the project ID does not match the context project ID ) are discouraged. Reads and writes of foreign partition IDs may fail if the project is not in an active state.
- Version: v1beta3

| Field | Type | Description |
|---|---|---|
| `namespaceId` | string | If not empty, the ID of the namespace to which the entities belong. |
| `projectId` | string | The ID of the project to which the entities belong. |

### `PathElement`

- A (kind, ID/name) pair used to construct a key path. If either name or ID is set, the element is complete. If neither is set, the element is incomplete.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `id` | string (int64) | The auto-allocated ID of the entity. Never equal to zero. Values less than zero are discouraged and may not be supported in the future. |
| `kind` | string | The kind of the entity. A kind matching regex `__.*__` is reserved/read-only. A kind must not contain more than 1500 bytes when UTF-8 encoded. Cannot be `""`. Must be valid UTF-8 bytes. Legacy values that are not valid UTF-8 are encoded as `__bytes__` where \`\` is the base-64 encoding of the bytes. |
| `name` | string | The name of the entity. A name matching regex `__.*__` is reserved/read-only. A name must not be more than 1500 bytes when UTF-8 encoded. Cannot be `""`. Must be valid UTF-8 bytes. Legacy values that are not valid UTF-8 are encoded as `__bytes__` where \`\` is the base-64 encoding of the bytes. |

### `PlanSummary`

- Planning phase information for the query.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `indexesUsed` | array<object> | The indexes selected for the query. For example: \[ {"query_scope": "Collection", "properties": "(foo ASC, \__name_\_ ASC)"}, {"query_scope": "Collection", "properties": "(bar ASC, \__name_\_ ASC)"} \] |

### `Projection`

- A representation of a property in a projection.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `property` | PropertyReference | The property to project. |

### `PropertyFilter`

- A filter on a specific property.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `op` | string enum | The operator to filter by. Values: `OPERATOR_UNSPECIFIED`, `LESS_THAN`, `LESS_THAN_OR_EQUAL`, `GREATER_THAN`, `GREATER_THAN_OR_EQUAL`, `EQUAL`, `IN`, `NOT_EQUAL`, `HAS_ANCESTOR`, `NOT_IN`. |
| `property` | PropertyReference | The property to filter by. |
| `value` | Value | The value to compare the property to. |

### `PropertyMask`

- The set of arbitrarily nested property paths used to restrict an operation to only a subset of properties in an entity.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `paths` | array<string> | The paths to the properties covered by this mask. A path is a list of property names separated by dots (`.`), for example `foo.bar` means the property `bar` inside the entity property `foo` inside the entity associated with this path. If a property name contains a dot `.` or a backslash `\`, then that name must be escaped. A path must not be empty, and may not reference a value inside an array value. |

### `PropertyOrder`

- The desired order for a specific property.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `direction` | string enum | The direction to order by. Defaults to `ASCENDING`. Values: `DIRECTION_UNSPECIFIED`, `ASCENDING`, `DESCENDING`. |
| `property` | PropertyReference | The property to order by. |

### `PropertyReference`

- A reference to a property relative to the kind expressions.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `name` | string | A reference to a property. Requires: \* MUST be a dot-delimited (`.`) string of segments, where each segment conforms to entity property name limitations. |

### `PropertyTransform`

- A transformation of an entity property.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `appendMissingElements` | ArrayValue | Appends the given elements in order if they are not already present in the current property value. If the property is not an array, or if the property does not yet exist, it is first set to the empty array. Equivalent numbers of different types (e.g. 3L and 3.0) are considered equal when checking if a value is missing. NaN is equal to NaN, and the null value is equal to the null value. If the input contains multiple equivalent values, only the first will be considered. The corresponding transform result will be the null value. |
| `increment` | Value | Adds the given value to the property's current value. This must be an integer or a double value. If the property is not an integer or double, or if the property does not yet exist, the transformation will set the property to the given value. If either of the given value or the current property value are doubles, both values will be interpreted as doubles. Double arithmetic and representation of double values follows IEEE 754 semantics. If there is positive/negative integer overflow, the property is resolved to the largest magnitude positive/negative integer. |
| `maximum` | Value | Sets the property to the maximum of its current value and the given value. This must be an integer or a double value. If the property is not an integer or double, or if the property does not yet exist, the transformation will set the property to the given value. If a maximum operation is applied where the property and the input value are of mixed types (that is - one is an integer and one is a double) the property takes on the type of the larger operand. If the operands are equivalent (e.g. 3 and 3.0), the property does not change. 0, 0.0, and -0.0 are all zero. The maximum of a zero stored value and zero input value is always the stored value. The maximum of any numeric value x and NaN is NaN. |
| `minimum` | Value | Sets the property to the minimum of its current value and the given value. This must be an integer or a double value. If the property is not an integer or double, or if the property does not yet exist, the transformation will set the property to the input value. If a minimum operation is applied where the property and the input value are of mixed types (that is - one is an integer and one is a double) the property takes on the type of the smaller operand. If the operands are equivalent (e.g. 3 and 3.0), the property does not change. 0, 0.0, and -0.0 are all zero. The minimum of a zero stored value and zero input value is always the stored value. The minimum of any numeric value x and NaN is NaN. |
| `property` | string | Optional. The name of the property. Property paths (a list of property names separated by dots (`.`)) may be used to refer to properties inside entity values. For example `foo.bar` means the property `bar` inside the entity property `foo`. If a property name contains a dot `.` or a backlslash `\`, then that name must be escaped. |
| `removeAllFromArray` | ArrayValue | Removes all of the given elements from the array in the property. If the property is not an array, or if the property does not yet exist, it is set to the empty array. Equivalent numbers of different types (e.g. 3L and 3.0) are considered equal when deciding whether an element should be removed. NaN is equal to NaN, and the null value is equal to the null value. This will remove all equivalent values if there are duplicates. The corresponding transform result will be the null value. |
| `setToServerValue` | string enum | Sets the property to the given server value. Values: `SERVER_VALUE_UNSPECIFIED`, `REQUEST_TIME`. |

### `Query`

- A query for entities. The query stages are executed in the following order: 1. kind 2. filter 3. projection 4. order + start_cursor + end_cursor 5. offset 6. limit 7. find_nearest
- Version: v1

| Field | Type | Description |
|---|---|---|
| `distinctOn` | array<PropertyReference> | The properties to make distinct. The query results will contain the first result for each distinct combination of values for the given properties (if empty, all results are returned). Requires: \* If `order` is specified, the set of distinct on properties must appear before the non-distinct on properties in `order`. |
| `endCursor` | string (byte) | An ending point for the query results. Query cursors are returned in query result batches and can only be used to limit the same query (https://cloud.google.com/datastore/docs/concepts/queries#cursors_limits_and_offsets). |
| `filter` | Filter | The filter to apply. |
| `findNearest` | FindNearest | Optional. A potential Nearest Neighbors Search. Applies after all other filters and ordering. Finds the closest vector embeddings to the given query vector. |
| `kind` | array<KindExpression> | The kinds to query (if empty, returns entities of all kinds). Currently at most 1 kind may be specified. |
| `limit` | integer (int32) | The maximum number of results to return. Applies after all other constraints. Optional. Unspecified is interpreted as no limit. Must be >= 0 if specified. |
| `offset` | integer (int32) | The number of results to skip. Applies before limit, but after all other constraints. Optional. Must be >= 0 if specified. |
| `order` | array<PropertyOrder> | The order to apply to the query results (if empty, order is unspecified). |
| `projection` | array<Projection> | The projection to return. Defaults to returning all properties. |
| `startCursor` | string (byte) | A starting point for the query results. Query cursors are returned in query result batches and can only be used to continue the same query (https://cloud.google.com/datastore/docs/concepts/queries#cursors_limits_and_offsets). |

### `QueryResultBatch`

- A batch of results produced by a query.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `endCursor` | string (byte) | A cursor that points to the position after the last result in the batch. |
| `entityResultType` | string enum | The result type for every entity in `entity_results`. Values: `RESULT_TYPE_UNSPECIFIED`, `FULL`, `PROJECTION`, `KEY_ONLY`. |
| `entityResults` | array<EntityResult> | The results for this batch. |
| `moreResults` | string enum | The state of the query after the current batch. Values: `MORE_RESULTS_TYPE_UNSPECIFIED`, `NOT_FINISHED`, `MORE_RESULTS_AFTER_LIMIT`, `MORE_RESULTS_AFTER_CURSOR`, `NO_MORE_RESULTS`. |
| `readTime` | string (google-datetime) | Read timestamp this batch was returned from. This applies to the range of results from the query's `start_cursor` (or the beginning of the query if no cursor was given) to this batch's `end_cursor` (not the query's `end_cursor`). In a single transaction, subsequent query result batches for the same query can have a greater timestamp. Each batch's read timestamp is valid for all preceding batches. This value will not be set for eventually consistent queries in Cloud Datastore. |
| `skippedCursor` | string (byte) | A cursor that points to the position after the last skipped result. Will be set when `skipped_results` != 0. |
| `skippedResults` | integer (int32) | The number of results skipped, typically because of an offset. |
| `snapshotVersion` | string (int64) | The version number of the snapshot this batch was returned from. This applies to the range of results from the query's `start_cursor` (or the beginning of the query if no cursor was given) to this batch's `end_cursor` (not the query's `end_cursor`). In a single transaction, subsequent query result batches for the same query can have a greater snapshot version number. Each batch's snapshot version is valid for all preceding batches. The value will be zero for eventually consistent queries. |

### `ReadOnly`

- Options specific to read-only transactions.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `readTime` | string (google-datetime) | Reads entities at the given time. This must be a microsecond precision timestamp within the past one hour, or if Point-in-Time Recovery is enabled, can additionally be a whole minute timestamp within the past 7 days. |

### `ReadOptions`

- The options shared by read requests.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `newTransaction` | TransactionOptions | Options for beginning a new transaction for this request. The new transaction identifier will be returned in the corresponding response as either LookupResponse.transaction or RunQueryResponse.transaction. |
| `readConsistency` | string enum | The non-transactional read consistency to use. Values: `READ_CONSISTENCY_UNSPECIFIED`, `STRONG`, `EVENTUAL`. |
| `readTime` | string (google-datetime) | Reads entities as they were at the given time. This value is only supported for Cloud Firestore in Datastore mode. This must be a microsecond precision timestamp within the past one hour, or if Point-in-Time Recovery is enabled, can additionally be a whole minute timestamp within the past 7 days. |
| `transaction` | string (byte) | The identifier of the transaction in which to read. A transaction identifier is returned by a call to Datastore.BeginTransaction. |

### `ReadOptions` (v1beta3)

- The options shared by read requests.
- Version: v1beta3

| Field | Type | Description |
|---|---|---|
| `readConsistency` | string enum | The non-transactional read consistency to use. Values: `READ_CONSISTENCY_UNSPECIFIED`, `STRONG`, `EVENTUAL`. |
| `readTime` | string (google-datetime) | Reads entities as they were at the given time. This value is only supported for Cloud Firestore in Datastore mode. This must be a microsecond precision timestamp within the past one hour, or if Point-in-Time Recovery is enabled, can additionally be a whole minute timestamp within the past 7 days. |
| `transaction` | string (byte) | The identifier of the transaction in which to read. A transaction identifier is returned by a call to Datastore.BeginTransaction. |

### `ReadWrite`

- Options specific to read / write transactions.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `previousTransaction` | string (byte) | The transaction identifier of the transaction being retried. |

### `RequestOptions`

- Options for a request.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `requestTags` | array<string> | Optional. The request tags for the request. Request tags are user-provided strings used for usage monitoring, cost management, and observability. Callers can associate custom application context (such as component, microservice, feature name, or operation type) with database requests. These tags are collected and aggregated in usage and monitoring reports, allowing billable operations and usage metrics to be sliced and analyzed by tag. These tags \*only\* show up in monitoring and are visible in administrative operations (such as usage reports). They do not affect data storage, query semantics, or request execution. Cardinality and Best Practices: - Request tags are most effective when using a bounded set of distinct values (e.g., fewer than 100 distinct tags across an entire database). Using a large number of distinct tags may result in tags being omitted from top usage dashboards. - Use structured identifiers (for example: `app=cart`, `env=prod`, `service=checkout`) and avoid high-cardinality values such as UUIDs, request IDs, timestamps, user IDs, or document keys. - Do not include sensitive data or personally identifiable information (PII) in request tags, as they show up in administrative monitoring. The tags are processed as follows: - Leading and trailing whitespace is trimmed. - Empty tags (after trimming) are filtered out. - Truncated to a maximum of 510 characters. - Deduplicated within the same request. - Limited to a maximum of 50 tags per request (excess tags are silently discarded). |

### `ReserveIdsRequest`

- The request for Datastore.ReserveIds.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `databaseId` | string | The ID of the database against which to make the request. '(default)' is not allowed; please use empty string '' to refer the default database. |
| `keys` | array<Key> | Required. A list of keys with complete key paths whose numeric IDs should not be auto-allocated. |
| `requestOptions` | RequestOptions | Optional. The options for this request. |

### `ReserveIdsRequest` (v1beta3)

- The request for Datastore.ReserveIds.
- Version: v1beta3

| Field | Type | Description |
|---|---|---|
| `databaseId` | string | The ID of the database against which to make the request. '(default)' is not allowed; please use empty string '' to refer the default database. |
| `keys` | array<Key> | Required. A list of keys with complete key paths whose numeric IDs should not be auto-allocated. |

### `ReserveIdsResponse`

- The response for Datastore.ReserveIds.
- Version: v1

### `RollbackRequest`

- The request for Datastore.Rollback.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `databaseId` | string | The ID of the database against which to make the request. '(default)' is not allowed; please use empty string '' to refer the default database. |
| `requestOptions` | RequestOptions | Optional. The options for this request. |
| `transaction` | string (byte) | Required. The transaction identifier, returned by a call to Datastore.BeginTransaction. |

### `RollbackRequest` (v1beta3)

- The request for Datastore.Rollback.
- Version: v1beta3

| Field | Type | Description |
|---|---|---|
| `transaction` | string (byte) | Required. The transaction identifier, returned by a call to Datastore.BeginTransaction. |

### `RollbackResponse`

- The response for Datastore.Rollback. (an empty message).
- Version: v1

### `RunAggregationQueryRequest`

- The request for Datastore.RunAggregationQuery.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `aggregationQuery` | AggregationQuery | The query to run. |
| `databaseId` | string | The ID of the database against which to make the request. '(default)' is not allowed; please use empty string '' to refer the default database. |
| `explainOptions` | ExplainOptions | Optional. Explain options for the query. If set, additional query statistics will be returned. If not, only query results will be returned. |
| `gqlQuery` | GqlQuery | The GQL query to run. This query must be an aggregation query. |
| `partitionId` | PartitionId | Entities are partitioned into subsets, identified by a partition ID. Queries are scoped to a single partition. This partition ID is normalized with the standard default context partition ID. |
| `readOptions` | ReadOptions | The options for this query. |
| `requestOptions` | RequestOptions | Optional. The options for this request. |

### `RunAggregationQueryRequest` (v1beta3)

- The request for Datastore.RunAggregationQuery.
- Version: v1beta3

| Field | Type | Description |
|---|---|---|
| `aggregationQuery` | AggregationQuery | The query to run. |
| `explainOptions` | ExplainOptions | Optional. Explain options for the query. If set, additional query statistics will be returned. If not, only query results will be returned. |
| `gqlQuery` | GqlQuery | The GQL query to run. This query must be an aggregation query. |
| `partitionId` | PartitionId | Entities are partitioned into subsets, identified by a partition ID. Queries are scoped to a single partition. This partition ID is normalized with the standard default context partition ID. |
| `readOptions` | ReadOptions | The options for this query. |

### `RunAggregationQueryResponse`

- The response for Datastore.RunAggregationQuery.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `batch` | AggregationResultBatch | A batch of aggregation results. Always present. |
| `explainMetrics` | ExplainMetrics | Query explain metrics. This is only present when the RunAggregationQueryRequest.explain_options is provided, and it is sent only once with the last response in the stream. |
| `query` | AggregationQuery | The parsed form of the `GqlQuery` from the request, if it was set. |
| `transaction` | string (byte) | The identifier of the transaction that was started as part of this RunAggregationQuery request. Set only when ReadOptions.new_transaction was set in RunAggregationQueryRequest.read_options. |

### `RunAggregationQueryResponse` (v1beta3)

- The response for Datastore.RunAggregationQuery.
- Version: v1beta3

| Field | Type | Description |
|---|---|---|
| `batch` | AggregationResultBatch | A batch of aggregation results. Always present. |
| `explainMetrics` | ExplainMetrics | Query explain metrics. This is only present when the RunAggregationQueryRequest.explain_options is provided, and it is sent only once with the last response in the stream. |
| `query` | AggregationQuery | The parsed form of the `GqlQuery` from the request, if it was set. |

### `RunQueryRequest`

- The request for Datastore.RunQuery.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `databaseId` | string | The ID of the database against which to make the request. '(default)' is not allowed; please use empty string '' to refer the default database. |
| `explainOptions` | ExplainOptions | Optional. Explain options for the query. If set, additional query statistics will be returned. If not, only query results will be returned. |
| `gqlQuery` | GqlQuery | The GQL query to run. This query must be a non-aggregation query. |
| `partitionId` | PartitionId | Entities are partitioned into subsets, identified by a partition ID. Queries are scoped to a single partition. This partition ID is normalized with the standard default context partition ID. |
| `propertyMask` | PropertyMask | The properties to return. This field must not be set for a projection query. See LookupRequest.property_mask. |
| `query` | Query | The query to run. |
| `readOptions` | ReadOptions | The options for this query. |
| `requestOptions` | RequestOptions | Optional. The options for this request. |

### `RunQueryRequest` (v1beta3)

- The request for Datastore.RunQuery.
- Version: v1beta3

| Field | Type | Description |
|---|---|---|
| `explainOptions` | ExplainOptions | Optional. Explain options for the query. If set, additional query statistics will be returned. If not, only query results will be returned. |
| `gqlQuery` | GqlQuery | The GQL query to run. This query must be a non-aggregation query. |
| `partitionId` | PartitionId | Entities are partitioned into subsets, identified by a partition ID. Queries are scoped to a single partition. This partition ID is normalized with the standard default context partition ID. |
| `propertyMask` | PropertyMask | The properties to return. This field must not be set for a projection query. See LookupRequest.property_mask. |
| `query` | Query | The query to run. |
| `readOptions` | ReadOptions | The options for this query. |

### `RunQueryResponse`

- The response for Datastore.RunQuery.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `batch` | QueryResultBatch | A batch of query results. This is always present unless running a query under explain-only mode: RunQueryRequest.explain_options was provided and ExplainOptions.analyze was set to false. |
| `explainMetrics` | ExplainMetrics | Query explain metrics. This is only present when the RunQueryRequest.explain_options is provided, and it is sent only once with the last response in the stream. |
| `query` | Query | The parsed form of the `GqlQuery` from the request, if it was set. |
| `transaction` | string (byte) | The identifier of the transaction that was started as part of this RunQuery request. Set only when ReadOptions.new_transaction was set in RunQueryRequest.read_options. |

### `RunQueryResponse` (v1beta3)

- The response for Datastore.RunQuery.
- Version: v1beta3

| Field | Type | Description |
|---|---|---|
| `batch` | QueryResultBatch | A batch of query results. This is always present unless running a query under explain-only mode: RunQueryRequest.explain_options was provided and ExplainOptions.analyze was set to false. |
| `explainMetrics` | ExplainMetrics | Query explain metrics. This is only present when the RunQueryRequest.explain_options is provided, and it is sent only once with the last response in the stream. |
| `query` | Query | The parsed form of the `GqlQuery` from the request, if it was set. |

### `Status`

- The `Status` type defines a logical error model that is suitable for different programming environments, including REST APIs and RPC APIs. It is used by gRPC (https://github.com/grpc). Each `Status` message contains three pieces of data: error code, error message, and error details. You can find out more about this error model and how to work with it in the API Design Guide (https://cloud.google.com/apis/design/errors).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `code` | integer (int32) | The status code, which should be an enum value of google.rpc.Code. |
| `details` | array<object> | A list of messages that carry the error details. There is a common set of message types for APIs to use. |
| `message` | string | A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client. |

### `Sum`

- Sum of the values of the requested property. \* Only numeric values will be aggregated. All non-numeric values including `NULL` are skipped. \* If the aggregated values contain `NaN`, returns `NaN`. Infinity math follows IEEE-754 standards. \* If the aggregated value set is empty, returns 0. \* Returns a 64-bit integer if all aggregated numbers are integers and the sum result does not overflow. Otherwise, the result is returned as a double. Note that even if all the aggregated values are integers, the result is returned as a double if it cannot fit within a 64-bit signed integer. When this occurs, the returned value will lose precision. \* When underflow occurs, floating-point aggregation is non-deterministic. This means that running the same query repeatedly without any changes to the underlying values could produce slightly different results each time. In those cases, values should be stored as integers over floating-point numbers.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `property` | PropertyReference | The property to aggregate on. |

### `TransactionOptions`

- Options for beginning a new transaction. Transactions can be created explicitly with calls to Datastore.BeginTransaction or implicitly by setting ReadOptions.new_transaction in read requests.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `readOnly` | ReadOnly | The transaction should only allow reads. |
| `readWrite` | ReadWrite | The transaction should allow both reads and writes. |

### `Value`

- A message that can hold any of the supported value types and associated metadata.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `arrayValue` | ArrayValue | An array value. Cannot contain another array value. A `Value` instance that sets field `array_value` must not set fields `meaning` or `exclude_from_indexes`. |
| `blobValue` | string (byte) | A blob value. May have at most 1,000,000 bytes. When `exclude_from_indexes` is false, may have at most 1500 bytes. In JSON requests, must be base64-encoded. |
| `booleanValue` | boolean | A boolean value. |
| `doubleValue` | number (double) | A double value. |
| `entityValue` | Entity | An entity value. - May have no key. - May have a key with an incomplete key path. - May have a reserved/read-only key. |
| `excludeFromIndexes` | boolean | If the value should be excluded from all indexes including those defined explicitly. |
| `geoPointValue` | LatLng | A geo point value representing a point on the surface of Earth. |
| `integerValue` | string (int64) | An integer value. |
| `keyValue` | Key | A key value. |
| `meaning` | integer (int32) | The `meaning` field should only be populated for backwards compatibility. |
| `nullValue` | string enum | A null value. Values: `NULL_VALUE`. |
| `stringValue` | string | A UTF-8 encoded string value. When `exclude_from_indexes` is false (it is indexed) , may have at most 1500 bytes. Otherwise, may be set to at most 1,000,000 bytes. |
| `timestampValue` | string (google-datetime) | A timestamp value. When stored in the Datastore, precise only to microseconds; any additional precision is rounded down. |

### Shape of `Aggregation`

Generated from the Discovery schema (not in the official docs); values show each field type:

```json
{
  "alias": "string",
  "avg": "Avg",
  "count": "Count",
  "sum": "Sum"
}
```

## Notes

- Generated from the Discovery document(s) v1, v1beta3, v1beta1 of `datastore` (retrieved 2026-11-14); a type with the same fields in several versions shows the preferred version; a type whose fields differ between versions is listed once per version (heading suffix `(version)`), and each type's `Version` line names the document it was taken from. A `$ref` resolves to the definition of the same version.
- Corrected from the official docs (the Discovery text above is verbatim): Discovery dropped the bracket expressions from the `namedBindings` key regular expression of `GqlQuery`; in google/datastore/v1/query.proto (googleapis commit 97f6460, https://github.com/googleapis/googleapis/blob/97f6460c3558c1435d7fd001a9251f8df058ae2f/google/datastore/v1/query.proto) it is `[A-Za-z_$][A-Za-z_$0-9]*` (shown above as `A-Za-z_$*`).
- Descriptions are verbatim from Discovery, which drops angle-bracket placeholders of the source comments: a format such as `projects//locations/global` stands for `projects/{project}/locations/global` (likewise `"@.iam.gserviceaccount.com"` lost the account ID before `@`, and a name format ending in a collection such as `projects/*/locations/*/registrations/` lost its last ID), and an expression such as `... && in labels` lost its left operand (for example `'label_value' in labels`). Check the method or field in the product's REST reference before relying on such a format.
- Source: https://datastore.googleapis.com/$discovery/rest?version=v1, https://datastore.googleapis.com/$discovery/rest?version=v1beta3, https://datastore.googleapis.com/$discovery/rest?version=v1beta1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
