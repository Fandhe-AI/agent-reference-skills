---
source: https://firestore.googleapis.com/$discovery/rest?version=v1
---

# Cloud Firestore API message schemas (firestore) (part 1/2)

## Signature / Usage

Message types referenced by the methods listed under `references/rest/firestore/`.

### `Aggregation`

- Defines an aggregation that produces a single result.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `alias` | string | Optional. Optional name of the field to store the result of the aggregation into. If not provided, Firestore will pick a default name following the format `field_`. For example: AGGREGATE COUNT_UP_TO(1) AS count_up_to_1, COUNT_UP_TO(2), COUNT_UP_TO(3) AS count_up_to_3, COUNT(\*) OVER ( ... ); becomes: AGGREGATE COUNT_UP_TO(1) AS count_up_to_1, COUNT_UP_TO(2) AS field_1, COUNT_UP_TO(3) AS count_up_to_3, COUNT(\*) AS field_2 OVER ( ... ); Requires: \* Must be unique across all aggregation aliases. \* Conform to document field name limitations. |
| `avg` | Avg | Average aggregator. |
| `count` | Count | Count aggregator. |
| `sum` | Sum | Sum aggregator. |

### `AggregationResult`

- The result of a single bucket from a Firestore aggregation query. The keys of `aggregate_fields` are the same for all results in an aggregation query, unlike document queries which can have different fields present for each result.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `aggregateFields` | object | The result of the aggregation functions, ex: `COUNT(*) AS total_docs`. The key is the alias assigned to the aggregation function on input and the size of this map equals the number of aggregation functions in the query. |

### `ArrayValue`

- An array value.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `values` | array<Value> | Values in the array. |

### `Avg`

- Average of the values of the requested field. \* Only numeric values will be aggregated. All non-numeric values including `NULL` are skipped. \* If the aggregated values contain `NaN`, returns `NaN`. Infinity math follows IEEE-754 standards. \* If the aggregated value set is empty, returns `NULL`. \* Always returns the result as a double.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `field` | FieldReference | The field to aggregate on. |

### `BatchGetDocumentsRequest`

- The request for Firestore.BatchGetDocuments.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `documents` | array<string> | The names of the documents to retrieve. In the format: `projects/{project_id}/databases/{database_id}/documents/{document_path}`. The request will fail if any of the document is not a child resource of the given `database`. Duplicate names will be elided. |
| `mask` | DocumentMask | The fields to return. If not set, returns all fields. If a document has a field that is not present in this mask, that field will not be returned in the response. |
| `newTransaction` | TransactionOptions | Starts a new transaction and reads the documents. Defaults to a read-only transaction. The new transaction ID will be returned as the first response in the stream. |
| `readTime` | string (google-datetime) | Reads documents as they were at the given time. This must be a microsecond precision timestamp within the past one hour, or if Point-in-Time Recovery is enabled, can additionally be a whole minute timestamp within the past 7 days. |
| `requestOptions` | RequestOptions | Optional. The request options for this request. |
| `transaction` | string (byte) | Reads documents in a transaction. |

### `BatchGetDocumentsResponse`

- The streamed response for Firestore.BatchGetDocuments.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `found` | Document | A document that was requested. |
| `missing` | string | A document name that was requested but does not exist. In the format: `projects/{project_id}/databases/{database_id}/documents/{document_path}`. |
| `readTime` | string (google-datetime) | The time at which the document was read. This may be monotically increasing, in this case the previous documents in the result stream are guaranteed not to have changed between their read_time and this one. |
| `transaction` | string (byte) | The transaction that was started as part of this request. Will only be set in the first response, and only if BatchGetDocumentsRequest.new_transaction was set in the request. |

### `BatchWriteRequest`

- The request for Firestore.BatchWrite.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `labels` | object | Labels associated with this batch write. |
| `requestOptions` | RequestOptions | Optional. The request options for this request. |
| `writes` | array<Write> | The writes to apply. Method does not apply writes atomically and does not guarantee ordering. Each write succeeds or fails independently. You cannot write to the same document more than once per request. |

### `BatchWriteResponse`

- The response from Firestore.BatchWrite.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `status` | array<Status> | The status of applying the writes. This i-th write status corresponds to the i-th write in the request. |
| `writeResults` | array<WriteResult> | The result of applying the writes. This i-th write result corresponds to the i-th write in the request. |

### `BeginTransactionRequest`

- The request for Firestore.BeginTransaction.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `options` | TransactionOptions | The options for the transaction. Defaults to a read-write transaction. |
| `requestOptions` | RequestOptions | Optional. The request options for this request. |

### `BeginTransactionResponse`

- The response for Firestore.BeginTransaction.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `transaction` | string (byte) | The transaction that was started. |

### `BitSequence`

- A sequence of bits, encoded in a byte array. Each byte in the `bitmap` byte array stores 8 bits of the sequence. The only exception is the last byte, which may store 8 \_or fewer\_ bits. The `padding` defines the number of bits of the last byte to be ignored as "padding". The values of these "padding" bits are unspecified and must be ignored. To retrieve the first bit, bit 0, calculate: `(bitmap[0] & 0x01) != 0`. To retrieve the second bit, bit 1, calculate: `(bitmap[0] & 0x02) != 0`. To retrieve the third bit, bit 2, calculate: `(bitmap[0] & 0x04) != 0`. To retrieve the fourth bit, bit 3, calculate: `(bitmap[0] & 0x08) != 0`. To retrieve bit n, calculate: `(bitmap[n / 8] & (0x01 << (n % 8))) != 0`. The "size" of a `BitSequence` (the number of bits it contains) is calculated by this formula: `(bitmap.length * 8) - padding`.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `bitmap` | string (byte) | The bytes that encode the bit sequence. May have a length of zero. |
| `padding` | integer (int32) | The number of bits of the last byte in `bitmap` to ignore as "padding". If the length of `bitmap` is zero, then this value must be `0`. Otherwise, this value must be between 0 and 7, inclusive. |

### `BloomFilter`

- A bloom filter (https://en.wikipedia.org/wiki/Bloom_filter). The bloom filter hashes the entries with MD5 and treats the resulting 128-bit hash as 2 distinct 64-bit hash values, interpreted as unsigned integers using 2's complement encoding. These two hash values, named `h1` and `h2`, are then used to compute the `hash_count` hash values using the formula, starting at `i=0`: h(i) = h1 + (i \* h2) These resulting values are then taken modulo the number of bits in the bloom filter to get the bits of the bloom filter to test for the given entry.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `bits` | BitSequence | The bloom filter data. |
| `hashCount` | integer (int32) | The number of hashes used by the algorithm. |

### `CollectionSelector`

- A selection of a collection, such as `messages as m1`.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `allDescendants` | boolean | When false, selects only collections that are immediate children of the `parent` specified in the containing `RunQueryRequest`. When true, selects all descendant collections. |
| `collectionId` | string | The collection ID. When set, selects only collections with this ID. |

### `CommitRequest`

- The request for Firestore.Commit.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `requestOptions` | RequestOptions | Optional. The request options for this request. |
| `transaction` | string (byte) | If set, applies all writes in this transaction, and commits it. |
| `writes` | array<Write> | The writes to apply. Always executed atomically and in order. |

### `CommitResponse`

- The response for Firestore.Commit.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `commitTime` | string (google-datetime) | The time at which the commit occurred. Any read with an equal or greater `read_time` is guaranteed to see the effects of the commit. |
| `writeResults` | array<WriteResult> | The result of applying the writes. This i-th write result corresponds to the i-th write in the request. |

### `CompositeFilter`

- A filter that merges multiple other filters using the given operator.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `filters` | array<Filter> | The list of filters to combine. Requires: \* At least one filter is present. |
| `op` | string enum | The operator for combining multiple filters. Values: `OPERATOR_UNSPECIFIED`, `AND`, `OR`. |

### `Count`

- Count of documents that match the query. The `COUNT(*)` aggregation function operates on the entire document so it does not require a field reference.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `upTo` | string (int64) | Optional. Optional constraint on the maximum number of documents to count. This provides a way to set an upper bound on the number of documents to scan, limiting latency, and cost. Unspecified is interpreted as no bound. High-Level Example: AGGREGATE COUNT_UP_TO(1000) OVER ( SELECT \* FROM k ); Requires: \* Must be greater than zero when present. |

### `Cursor`

- A position in a query result set.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `before` | boolean | If the position is just before or just after the given values, relative to the sort order defined by the query. |
| `values` | array<Value> | The values that represent a position, in the order they appear in the order by clause of a query. Can contain fewer values than specified in the order by clause. |

### `Document`

- A Firestore document. Must not exceed 1 MiB - 4 bytes.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. The time at which the document was created. This value increases monotonically when a document is deleted then recreated. It can also be compared to values from other documents and the `read_time` of a query. |
| `fields` | object | The document's fields. The map keys represent field names. Field names matching the regular expression `__.*__` are reserved. Reserved field names are forbidden except in certain documented contexts. The field names, represented as UTF-8, must not exceed 1,500 bytes and cannot be empty. Field paths may be used in other contexts to refer to structured fields defined here. For `map_value`, the field path is represented by a dot-delimited (`.`) string of segments. Each segment is either a simple field name (defined below) or a quoted field name. For example, the structured field `"foo" : { map_value: { "x&y" : { string_value: "hello" }}}` would be represented by the field path `` foo.`x&y` ``. A simple field name contains only characters `a` to `z`, `A` to `Z`, `0` to `9`, or `_`, and must not start with `0` to `9`. For example, `foo_bar_17`. A quoted field name starts and ends with `` ` `` and may contain any character. Some characters, including `` ` ``, must be escaped using a `\`. For example, `` `x&y` `` represents `x&y` and `` `bak\`tik` `` represents `` bak`tik ``. |
| `name` | string | The resource name of the document, for example `projects/{project_id}/databases/{database_id}/documents/{document_path}`. |
| `updateTime` | string (google-datetime) | Output only. The time at which the document was last changed. This value is initially set to the `create_time` then increases monotonically with each change to the document. It can also be compared to values from other documents and the `read_time` of a query. |

### `DocumentChange`

- A Document has changed. May be the result of multiple writes, including deletes, that ultimately resulted in a new value for the Document. Multiple DocumentChange messages may be returned for the same logical change, if multiple targets are affected.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `document` | Document | The new state of the Document. If `mask` is set, contains only fields that were updated or added. |
| `removedTargetIds` | array<integer> | A set of target IDs for targets that no longer match this document. |
| `targetIds` | array<integer> | A set of target IDs of targets that match this document. |

### `DocumentDelete`

- A Document has been deleted. May be the result of multiple writes, including updates, the last of which deleted the Document. Multiple DocumentDelete messages may be returned for the same logical delete, if multiple targets are affected.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `document` | string | The resource name of the Document that was deleted. |
| `readTime` | string (google-datetime) | The read timestamp at which the delete was observed. Greater or equal to the `commit_time` of the delete. |
| `removedTargetIds` | array<integer> | A set of target IDs for targets that previously matched this entity. |

### `DocumentMask`

- A set of field paths on a document. Used to restrict a get or update operation on a document to a subset of its fields. This is different from standard field masks, as this is always scoped to a Document, and takes in account the dynamic nature of Value.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `fieldPaths` | array<string> | The list of field paths in the mask. See Document.fields for a field path syntax reference. |

### `DocumentRemove`

- A Document has been removed from the view of the targets. Sent if the document is no longer relevant to a target and is out of view. Can be sent instead of a DocumentDelete or a DocumentChange if the server can not send the new value of the document. Multiple DocumentRemove messages may be returned for the same logical write or delete, if multiple targets are affected.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `document` | string | The resource name of the Document that has gone out of view. |
| `readTime` | string (google-datetime) | The read timestamp at which the remove was observed. Greater or equal to the `commit_time` of the change/delete/remove. |
| `removedTargetIds` | array<integer> | A set of target IDs for targets that previously matched this document. |

### `DocumentTransform`

- A transformation of a document.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `document` | string | The name of the document to transform. |
| `fieldTransforms` | array<FieldTransform> | The list of transformations to apply to the fields of the document, in order. This must not be empty. |

### `DocumentsTarget`

- A target specified by a set of documents names.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `documents` | array<string> | The names of the documents to retrieve. In the format: `projects/{project_id}/databases/{database_id}/documents/{document_path}`. The request will fail if any of the document is not a child resource of the given `database`. Duplicate names will be elided. |

### `Empty`

- A generic empty message that you can re-use to avoid defining duplicated empty messages in your APIs. A typical example is to use it as the request or the response type of an API method. For instance: service Foo { rpc Bar(google.protobuf.Empty) returns (google.protobuf.Empty); }
- Version: v1

### `ExecutePipelineRequest`

- The request for Firestore.ExecutePipeline.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `autoCommitTransaction` | boolean | Optional. Automatically commits the transaction after the pipeline has been executed. Only permitted in combination with `transaction` or `new_transaction`. |
| `newTransaction` | TransactionOptions | Execute the pipeline in a new transaction. The identifier of the newly created transaction will be returned in the first response on the stream. This defaults to a read-only transaction. |
| `readTime` | string (google-datetime) | Execute the pipeline in a snapshot transaction at the given time. This must be a microsecond precision timestamp within the past one hour, or if Point-in-Time Recovery is enabled, can additionally be a whole minute timestamp within the past 7 days. |
| `requestOptions` | RequestOptions | Optional. The request options for this request. |
| `structuredPipeline` | StructuredPipeline | A pipelined operation. |
| `transaction` | string (byte) | Run the query within an already active transaction. The value here is the opaque transaction ID to execute the query in. |

### `ExecutePipelineResponse`

- The response for Firestore.ExecutePipeline.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `executionTime` | string (google-datetime) | The time at which the results are valid. This is a (not strictly) monotonically increasing value across multiple responses in the same stream. The API guarantees that all previously returned results are still valid at the latest `execution_time`. This allows the API consumer to treat the query if it ran at the latest `execution_time` returned. If the query returns no results, a response with `execution_time` and no `results` will be sent, and this represents the time at which the operation was run. |
| `explainStats` | ExplainStats | Query explain stats. This is present on the \*\*last\*\* response if the request configured explain to run in 'analyze' or 'explain' mode in the pipeline options. If the query does not return any results, a response with `explain_stats` and no `results` will still be sent. |
| `results` | array<Document> | An ordered batch of results returned executing a pipeline. The batch size is variable, and can even be zero for when only a partial progress message is returned. The fields present in the returned documents are only those that were explicitly requested in the pipeline, this includes those like `__name__` and `__update_time__`. This is explicitly a divergence from `Firestore.RunQuery` / `Firestore.GetDocument` RPCs which always return such fields even when they are not specified in the `mask`. |
| `transaction` | string (byte) | Newly created transaction identifier. This field is only specified as part of the first response from the server, alongside the `results` field when the original request specified ExecuteRequest.new_transaction. |

### `ExecutionStats`

- Execution statistics for the query.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `debugStats` | object | Debugging statistics from the execution of the query. Note that the debugging stats are subject to change as Firestore evolves. It could include: { "indexes_entries_scanned": "1000", "documents_scanned": "20", "billing_details" : { "documents_billable": "20", "index_entries_billable": "1000", "min_query_cost": "0" } } |
| `executionDuration` | string (google-duration) | Total time to execute the query in the backend. |
| `readOperations` | string (int64) | Total billable read operations. |
| `resultsReturned` | string (int64) | Total number of results returned, including documents, projections, aggregation results, keys. |

### `ExistenceFilter`

- A digest of all the documents that match a given target.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `count` | integer (int32) | The total count of documents that match target_id. If different from the count of documents in the client that match, the client must manually determine which documents no longer match the target. The client can use the `unchanged_names` bloom filter to assist with this determination by testing ALL the document names against the filter; if the document name is NOT in the filter, it means the document no longer matches the target. |
| `targetId` | integer (int32) | The target ID to which this filter applies. |
| `unchangedNames` | BloomFilter | A bloom filter that, despite its name, contains the UTF-8 byte encodings of the resource names of ALL the documents that match target_id, in the form `projects/{project_id}/databases/{database_id}/documents/{document_path}`. This bloom filter may be omitted at the server's discretion, such as if it is deemed that the client will not make use of it or if it is too computationally expensive to calculate or transmit. Clients must gracefully handle this field being absent by falling back to the logic used before this field existed; that is, re-add the target without a resume token to figure out which documents in the client's cache are out of sync. |

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

### `ExplainStats`

- Pipeline explain stats. Depending on the explain options in the original request, this can contain the optimized plan and / or execution stats.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `data` | object | The format depends on the `output_format` options in the request. Currently there are two supported options: `TEXT` and `JSON`. Both supply a `google.protobuf.StringValue`. |

### `FieldFilter`

- A filter on a specific field.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `field` | FieldReference | The field to filter by. |
| `op` | string enum | The operator to filter by. Values: `OPERATOR_UNSPECIFIED`, `LESS_THAN`, `LESS_THAN_OR_EQUAL`, `GREATER_THAN`, `GREATER_THAN_OR_EQUAL`, `EQUAL`, `NOT_EQUAL`, `ARRAY_CONTAINS`, `IN`, `ARRAY_CONTAINS_ANY`, `NOT_IN`. |
| `value` | Value | The value to compare to. |

### `FieldReference`

- A reference to a field in a document, ex: `stats.operations`.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `fieldPath` | string | A reference to a field in a document. Requires: \* MUST be a dot-delimited (`.`) string of segments, where each segment conforms to document field name limitations. |

### `FieldTransform`

- A transformation of a field of the document.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `appendMissingElements` | ArrayValue | Append the given elements in order if they are not already present in the current field value. If the field is not an array, or if the field does not yet exist, it is first set to the empty array. Equivalent numbers of different types (e.g. 3L and 3.0) are considered equal when checking if a value is missing. NaN is equal to NaN, and Null is equal to Null. If the input contains multiple equivalent values, only the first will be considered. The corresponding transform_result will be the null value. |
| `fieldPath` | string | The path of the field. See Document.fields for the field path syntax reference. |
| `increment` | Value | Adds the given value to the field's current value. This must be an integer or a double value. If the field is not an integer or double, or if the field does not yet exist, the transformation will set the field to the given value. If either of the given value or the current field value are doubles, both values will be interpreted as doubles. Double arithmetic and representation of double values follow IEEE 754 semantics. If there is positive/negative integer overflow, the field is resolved to the largest magnitude positive/negative integer. |
| `maximum` | Value | Sets the field to the maximum of its current value and the given value. This must be an integer or a double value. If the field is not an integer or double, or if the field does not yet exist, the transformation will set the field to the given value. If a maximum operation is applied where the field and the input value are of mixed types (that is - one is an integer and one is a double) the field takes on the type of the larger operand. If the operands are equivalent (e.g. 3 and 3.0), the field does not change. 0, 0.0, and -0.0 are all zero. The maximum of a zero stored value and zero input value is always the stored value. The maximum of any numeric value x and NaN is NaN. |
| `minimum` | Value | Sets the field to the minimum of its current value and the given value. This must be an integer or a double value. If the field is not an integer or double, or if the field does not yet exist, the transformation will set the field to the input value. If a minimum operation is applied where the field and the input value are of mixed types (that is - one is an integer and one is a double) the field takes on the type of the smaller operand. If the operands are equivalent (e.g. 3 and 3.0), the field does not change. 0, 0.0, and -0.0 are all zero. The minimum of a zero stored value and zero input value is always the stored value. The minimum of any numeric value x and NaN is NaN. |
| `removeAllFromArray` | ArrayValue | Remove all of the given elements from the array in the field. If the field is not an array, or if the field does not yet exist, it is set to the empty array. Equivalent numbers of the different types (e.g. 3L and 3.0) are considered equal when deciding whether an element should be removed. NaN is equal to NaN, and Null is equal to Null. This will remove all equivalent values if there are duplicates. The corresponding transform_result will be the null value. |
| `setToServerValue` | string enum | Sets the field to the given server value. Values: `SERVER_VALUE_UNSPECIFIED`, `REQUEST_TIME`. |

### `Filter`

- A filter.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `compositeFilter` | CompositeFilter | A composite filter. |
| `fieldFilter` | FieldFilter | A filter on a document field. |
| `unaryFilter` | UnaryFilter | A filter that takes exactly one argument. |

### `FindNearest`

- Nearest Neighbors search config. The ordering provided by FindNearest supersedes the order_by stage. If multiple documents have the same vector distance, the returned document order is not guaranteed to be stable between queries.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `distanceMeasure` | string enum | Required. The distance measure to use, required. Values: `DISTANCE_MEASURE_UNSPECIFIED`, `EUCLIDEAN`, `COSINE`, `DOT_PRODUCT`. |
| `distanceResultField` | string | Optional. Optional name of the field to output the result of the vector distance calculation. Must conform to document field name limitations. |
| `distanceThreshold` | number (double) | Optional. Option to specify a threshold for which no less similar documents will be returned. The behavior of the specified `distance_measure` will affect the meaning of the distance threshold. Since DOT_PRODUCT distances increase when the vectors are more similar, the comparison is inverted. \* For EUCLIDEAN, COSINE: `WHERE distance <= distance_threshold` \* For DOT_PRODUCT: `WHERE distance >= distance_threshold` |
| `limit` | integer (int32) | Required. The number of nearest neighbors to return. Must be a positive integer of no more than 1000. |
| `queryVector` | Value | Required. The query vector that we are searching on. Must be a vector of no more than 2048 dimensions. |
| `vectorField` | FieldReference | Required. An indexed vector field to search upon. Only documents which contain vectors whose dimensionality match the query_vector can be returned. |

### `Function`

- Represents an unevaluated scalar expression. For example, the expression `like(user_name, "%alice%")` is represented as: name: "like" args { field_reference: "user_name" } args { string_value: "%alice%" }
- Version: v1

| Field | Type | Description |
|---|---|---|
| `args` | array<Value> | Optional. Ordered list of arguments the given function expects. |
| `name` | string | Required. The name of the function to evaluate. \*\*Requires:\*\* \* must be in snake case (lower case with underscore separator). |
| `options` | object | Optional. Optional named arguments that certain functions may support. |

### `GoogleFirestoreAdminV1Backup`

- A Backup of a Cloud Firestore Database. The backup contains all documents and index configurations for the given database at a specific point in time.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `database` | string | Output only. Name of the Firestore database that the backup is from. Format is `projects/{project}/databases/{database}`. |
| `databaseUid` | string | Output only. The system-generated UUID4 for the Firestore database that the backup is from. |
| `expireTime` | string (google-datetime) | Output only. The timestamp at which this backup expires. |
| `name` | string | Output only. The unique resource name of the Backup. Format is `projects/{project}/locations/{location}/backups/{backup}`. The location in the name will be the Standard Managed Multi-Region (SMMR) location (e.g. `us`) if the backup was created with an SMMR location, or the Google Managed Multi-Region (GMMR) location (e.g. `nam5`) if the backup was created with a GMMR location. |
| `snapshotTime` | string (google-datetime) | Output only. The backup contains an externally consistent copy of the database at this time. |
| `state` | string enum | Output only. The current state of the backup. Values: `STATE_UNSPECIFIED`, `CREATING`, `READY`, `NOT_AVAILABLE`. |
| `stats` | GoogleFirestoreAdminV1Stats | Output only. Statistics about the backup. This data only becomes available after the backup is fully materialized to secondary storage. This field will be empty till then. |

### `GoogleFirestoreAdminV1BackupSchedule`

- A backup schedule for a Cloud Firestore Database. This resource is owned by the database it is backing up, and is deleted along with the database. The actual backups are not though.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. The timestamp at which this backup schedule was created and effective since. No backups will be created for this schedule before this time. |
| `dailyRecurrence` | GoogleFirestoreAdminV1DailyRecurrence | For a schedule that runs daily. |
| `name` | string | Output only. The unique backup schedule identifier across all locations and databases for the given project. This will be auto-assigned. Format is `projects/{project}/databases/{database}/backupSchedules/{backup_schedule}` |
| `retention` | string (google-duration) | At what relative time in the future, compared to its creation time, the backup should be deleted, e.g. keep backups for 7 days. The maximum supported retention period is 14 weeks. |
| `updateTime` | string (google-datetime) | Output only. The timestamp at which this backup schedule was most recently updated. When a backup schedule is first created, this is the same as create_time. |
| `weeklyRecurrence` | GoogleFirestoreAdminV1WeeklyRecurrence | For a schedule that runs weekly on a specific day. |

### `GoogleFirestoreAdminV1BackupSource`

- Information about a backup that was used to restore a database.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `backup` | string | The resource name of the backup that was used to restore this database. Format: `projects/{project}/locations/{location}/backups/{backup}`. |

### `GoogleFirestoreAdminV1BulkDeleteDocumentsMetadata`

- Metadata for google.longrunning.Operation results from FirestoreAdmin.BulkDeleteDocuments.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `collectionIds` | array<string> | The IDs of the collection groups that are being deleted. |
| `endTime` | string (google-datetime) | The time this operation completed. Will be unset if operation still in progress. |
| `namespaceIds` | array<string> | Which namespace IDs are being deleted. |
| `operationState` | string enum | The state of the operation. Values: `OPERATION_STATE_UNSPECIFIED`, `INITIALIZING`, `PROCESSING`, `CANCELLING`, `FINALIZING`, `SUCCESSFUL`, `FAILED`, `CANCELLED`. |
| `progressBytes` | GoogleFirestoreAdminV1Progress | The progress, in bytes, of this operation. |
| `progressDocuments` | GoogleFirestoreAdminV1Progress | The progress, in documents, of this operation. |
| `snapshotTime` | string (google-datetime) | The timestamp that corresponds to the version of the database that is being read to get the list of documents to delete. This time can also be used as the timestamp of PITR in case of disaster recovery (subject to PITR window limit). |
| `startTime` | string (google-datetime) | The time this operation started. |

### `GoogleFirestoreAdminV1BulkDeleteDocumentsRequest`

- The request for FirestoreAdmin.BulkDeleteDocuments. When both collection_ids and namespace_ids are set, only documents satisfying both conditions will be deleted. Requests with namespace_ids and collection_ids both empty will be rejected. Please use FirestoreAdmin.DeleteDatabase instead.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `collectionIds` | array<string> | Optional. IDs of the collection groups to delete. Unspecified means all collection groups. Each collection group in this list must be unique. |
| `namespaceIds` | array<string> | Optional. Namespaces to delete. An empty list means all namespaces. This is the recommended usage for databases that don't use namespaces. An empty string element represents the default namespace. This should be used if the database has data in non-default namespaces, but doesn't want to delete from them. Each namespace in this list must be unique. |

### `GoogleFirestoreAdminV1ChangeStream`

- A Change Stream is a resource that allows users to receive change notifications from a Firestore database.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `collectionGroupScope` | GoogleFirestoreAdminV1CollectionGroupScope | If set, the change stream is scoped to a collection group. |
| `createTime` | string (google-datetime) | Output only. The time the Change Stream was created. |
| `databaseScope` | GoogleFirestoreAdminV1DatabaseScope | If set, the change stream is scoped to the entire database. |
| `etag` | string | Optional. An etag used to determine which version of the configuration is being edited. |
| `name` | string | Identifier. The external resource name of the change stream. Format `projects/{project}/databases/{database}/changeStreams/{change_stream}` |
| `retentionPeriod` | string (google-duration) | Required. The retention period of the change stream. This is the amount of time a change event is available on the change stream. Must be from 1 to 7 days, inclusive. The retention_period must be in day granularity, i.e. it must be a multiple of 24 hours. |
| `startTime` | string (google-datetime) | Output only. The time the Change Stream started recording events. |
| `updateTime` | string (google-datetime) | Output only. The time the Change Stream was last updated. |

### `GoogleFirestoreAdminV1CloneDatabaseMetadata`

- Metadata for the long-running operation from the CloneDatabase request.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `database` | string | The name of the database being cloned to. |
| `endTime` | string (google-datetime) | The time the clone finished, unset for ongoing clones. |
| `operationState` | string enum | The operation state of the clone. Values: `OPERATION_STATE_UNSPECIFIED`, `INITIALIZING`, `PROCESSING`, `CANCELLING`, `FINALIZING`, `SUCCESSFUL`, `FAILED`, `CANCELLED`. |
| `pitrSnapshot` | GoogleFirestoreAdminV1PitrSnapshot | The snapshot from which this database was cloned. |
| `progressPercentage` | GoogleFirestoreAdminV1Progress | How far along the clone is as an estimated percentage of remaining time. |
| `startTime` | string (google-datetime) | The time the clone was started. |

### `GoogleFirestoreAdminV1CloneDatabaseRequest`

- The request message for FirestoreAdmin.CloneDatabase.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `databaseId` | string | Required. The ID to use for the database, which will become the final component of the database's resource name. This database ID must not be associated with an existing database. This value should be 4-63 characters. Valid characters are /a-z-/ with first character a letter and the last a letter or a number. Must not be UUID-like /\[0-9a-f\]{8}(-\[0-9a-f\]{4}){3}-\[0-9a-f\]{12}/. "(default)" database ID is also valid if the database is Standard edition. |
| `encryptionConfig` | GoogleFirestoreAdminV1EncryptionConfig | Optional. Encryption configuration for the cloned database. If this field is not specified, the cloned database will use the same encryption configuration as the source database, namely use_source_encryption. |
| `pitrSnapshot` | GoogleFirestoreAdminV1PitrSnapshot | Required. Specification of the PITR data to clone from. The source database must exist. The cloned database will be created in the same location as the source database. |
| `tags` | object | Optional. Immutable. Tags to be bound to the cloned database. The tags should be provided in the format of `tagKeys/{tag_key_id} -> tagValues/{tag_value_id}`. |

### `GoogleFirestoreAdminV1CmekConfig`

- The CMEK (Customer Managed Encryption Key) configuration for a Firestore database. If not present, the database is secured by the default Google encryption key.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `activeKeyVersion` | array<string> | Output only. Currently in-use KMS key versions (https://cloud.google.com/kms/docs/resource-hierarchy#key_versions). During key rotation (https://cloud.google.com/kms/docs/key-rotation), there can be multiple in-use key versions. The expected format is `projects/{project_id}/locations/{kms_location}/keyRings/{key_ring}/cryptoKeys/{crypto_key}/cryptoKeyVersions/{key_version}`. |
| `kmsKeyName` | string | Required. Only keys in the same location as this database are allowed to be used for encryption. For Firestore's nam5 multi-region, this corresponds to Cloud KMS multi-region us. For Firestore's eur3 multi-region, this corresponds to Cloud KMS multi-region europe. See https://cloud.google.com/kms/docs/locations. The expected format is `projects/{project_id}/locations/{kms_location}/keyRings/{key_ring}/cryptoKeys/{crypto_key}`. |

### `GoogleFirestoreAdminV1CollectionGroupScope`

- The change stream is scoped to a collection group. Only events associated with the given collection group are visible to the Change Stream. Only a single change stream can be enabled per collection group.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `collectionGroupId` | string | Required. The collection group name. |

### `GoogleFirestoreAdminV1CreateDatabaseMetadata`

- Metadata related to the create database operation.
- Version: v1

### `GoogleFirestoreAdminV1CustomerManagedEncryptionOptions`

- The configuration options for using CMEK (Customer Managed Encryption Key) encryption.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `kmsKeyName` | string | Required. Only keys in the same location as the database are allowed to be used for encryption. For Firestore's nam5 multi-region, this corresponds to Cloud KMS multi-region us. For Firestore's eur3 multi-region, this corresponds to Cloud KMS multi-region europe. See https://cloud.google.com/kms/docs/locations. The expected format is `projects/{project_id}/locations/{kms_location}/keyRings/{key_ring}/cryptoKeys/{crypto_key}`. |

### `GoogleFirestoreAdminV1DailyRecurrence`

- Represents a recurring schedule that runs every day. The time zone is UTC.
- Version: v1

### `GoogleFirestoreAdminV1Database`

- A Cloud Firestore Database.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `appEngineIntegrationMode` | string enum | The App Engine integration mode to use for this database. Values: `APP_ENGINE_INTEGRATION_MODE_UNSPECIFIED`, `ENABLED`, `DISABLED`. |
| `cmekConfig` | GoogleFirestoreAdminV1CmekConfig | Optional. Presence indicates CMEK is enabled for this database. |
| `concurrencyMode` | string enum | The default concurrency control mode to use for this database. If unspecified in a CreateDatabase request, this will default based on the database edition: Optimistic for Enterprise and Pessimistic for all other databases. While transactions can explicitly specify their own concurrency mode, this setting defines the default behavior when left unspecified. Important: This database-level setting is not respected for Firestore with MongoDB compatibility. All transactions through the MongoDB compatibility layer will use optimistic concurrency control, regardless of this setting. Values: `CONCURRENCY_MODE_UNSPECIFIED`, `OPTIMISTIC`, `PESSIMISTIC`, `OPTIMISTIC_WITH_ENTITY_GROUPS`. |
| `createTime` | string (google-datetime) | Output only. The timestamp at which this database was created. Databases created before 2016 do not populate create_time. |
| `databaseEdition` | string enum | Immutable. The edition of the database. Values: `DATABASE_EDITION_UNSPECIFIED`, `STANDARD`, `ENTERPRISE`. |
| `deleteProtectionState` | string enum | State of delete protection for the database. Values: `DELETE_PROTECTION_STATE_UNSPECIFIED`, `DELETE_PROTECTION_DISABLED`, `DELETE_PROTECTION_ENABLED`. |
| `deleteTime` | string (google-datetime) | Output only. The timestamp at which this database was deleted. Only set if the database has been deleted. |
| `earliestVersionTime` | string (google-datetime) | Output only. The earliest timestamp at which older versions of the data can be read from the database. See \[version_retention_period\] above; this field is populated with `now - version_retention_period`. This value is continuously updated, and becomes stale the moment it is queried. If you are using this value to recover data, make sure to account for the time from the moment when the value is queried to the moment when you initiate the recovery. |
| `etag` | string | This checksum is computed by the server based on the value of other fields, and may be sent on update and delete requests to ensure the client has an up-to-date value before proceeding. |
| `firestoreDataAccessMode` | string enum | Optional. The Firestore API data access mode to use for this database. If not set on write: - the default value is DATA_ACCESS_MODE_DISABLED for Enterprise edition. - the default value is DATA_ACCESS_MODE_ENABLED for Standard edition. Values: `DATA_ACCESS_MODE_UNSPECIFIED`, `DATA_ACCESS_MODE_ENABLED`, `DATA_ACCESS_MODE_DISABLED`. |
| `freeTier` | boolean | Output only. Background: Free tier is the ability of a Firestore database to use a small amount of resources every day without being charged. Once usage exceeds the free tier limit further usage is charged. Whether this database can make use of the free tier. Only one database per project can be eligible for the free tier. The first (or next) database that is created in a project without a free tier database will be marked as eligible for the free tier. Databases that are created while there is a free tier database will not be eligible for the free tier. |
| `keyPrefix` | string | Output only. The key_prefix for this database. This key_prefix is used, in combination with the project ID ("~") to construct the application ID that is returned from the Cloud Datastore APIs in Google App Engine first generation runtimes. This value may be empty in which case the appid to use for URL-encoded keys is the project_id (eg: foo instead of v~foo). |
| `locationId` | string | Required. The location of the database. Available locations are listed at https://cloud.google.com/firestore/docs/locations. |
| `mongodbCompatibleDataAccessMode` | string enum | Optional. The MongoDB compatible API data access mode to use for this database. If not set on write, the default value is DATA_ACCESS_MODE_ENABLED for Enterprise edition. The value is always DATA_ACCESS_MODE_DISABLED for Standard edition. Values: `DATA_ACCESS_MODE_UNSPECIFIED`, `DATA_ACCESS_MODE_ENABLED`, `DATA_ACCESS_MODE_DISABLED`. |
| `name` | string | The resource name of the Database. Format: `projects/{project}/databases/{database}` |
| `pointInTimeRecoveryEnablement` | string enum | Whether to enable the PITR feature on this database. Values: `POINT_IN_TIME_RECOVERY_ENABLEMENT_UNSPECIFIED`, `POINT_IN_TIME_RECOVERY_ENABLED`, `POINT_IN_TIME_RECOVERY_DISABLED`. |
| `previousId` | string | Output only. The database resource's prior database ID. This field is only populated for deleted databases. |
| `realtimeUpdatesMode` | string enum | Immutable. The default Realtime Updates mode to use for this database. Values: `REALTIME_UPDATES_MODE_UNSPECIFIED`, `REALTIME_UPDATES_MODE_ENABLED`, `REALTIME_UPDATES_MODE_DISABLED`. |
| `sourceInfo` | GoogleFirestoreAdminV1SourceInfo | Output only. Information about the provenance of this database. |
| `tags` | object | Optional. Input only. Immutable. Tag keys/values directly bound to this resource. For example: "123/environment": "production", "123/costCenter": "marketing" |
| `type` | string enum | Required. The type of the database. See https://cloud.google.com/datastore/docs/firestore-or-datastore for information about how to choose. Values: `DATABASE_TYPE_UNSPECIFIED`, `FIRESTORE_NATIVE`, `DATASTORE_MODE`. |
| `uid` | string | Output only. The system-generated UUID4 for this Database. |
| `updateTime` | string (google-datetime) | Output only. The timestamp at which this database was most recently updated. Note this only includes updates to the database resource and not data contained by the database. |
| `versionRetentionPeriod` | string (google-duration) | Output only. The period during which past versions of data are retained in the database. Any read or query can specify a `read_time` within this window, and will read the state of the database at that time. If the PITR feature is enabled, the retention period is 7 days. Otherwise, the retention period is 1 hour. |

### `GoogleFirestoreAdminV1DatabaseScope`

- The change stream is scoped to the entire database. All events in the database are visible to the Change Stream. One Database scope Change Stream is allowed per database.
- Version: v1

### `GoogleFirestoreAdminV1DeleteDatabaseMetadata`

- Metadata related to the delete database operation.
- Version: v1

### `GoogleFirestoreAdminV1DisableUserCredsRequest`

- The request for FirestoreAdmin.DisableUserCreds.
- Version: v1

### `GoogleFirestoreAdminV1EnableUserCredsRequest`

- The request for FirestoreAdmin.EnableUserCreds.
- Version: v1

### `GoogleFirestoreAdminV1EncryptionConfig`

- Encryption configuration for a new database being created from another source. The source could be a Backup or a PitrSnapshot.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `customerManagedEncryption` | GoogleFirestoreAdminV1CustomerManagedEncryptionOptions | Use Customer Managed Encryption Keys (CMEK) for encryption. |
| `googleDefaultEncryption` | GoogleFirestoreAdminV1GoogleDefaultEncryptionOptions | Use Google default encryption. |
| `useSourceEncryption` | GoogleFirestoreAdminV1SourceEncryptionOptions | The database will use the same encryption configuration as the source. |

### `GoogleFirestoreAdminV1ExportDocumentsMetadata`

- Metadata for google.longrunning.Operation results from FirestoreAdmin.ExportDocuments.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `collectionIds` | array<string> | Which collection IDs are being exported. |
| `endTime` | string (google-datetime) | The time this operation completed. Will be unset if operation still in progress. |
| `namespaceIds` | array<string> | Which namespace IDs are being exported. |
| `operationState` | string enum | The state of the export operation. Values: `OPERATION_STATE_UNSPECIFIED`, `INITIALIZING`, `PROCESSING`, `CANCELLING`, `FINALIZING`, `SUCCESSFUL`, `FAILED`, `CANCELLED`. |
| `outputUriPrefix` | string | Where the documents are being exported to. |
| `progressBytes` | GoogleFirestoreAdminV1Progress | The progress, in bytes, of this operation. |
| `progressDocuments` | GoogleFirestoreAdminV1Progress | The progress, in documents, of this operation. |
| `snapshotTime` | string (google-datetime) | The timestamp that corresponds to the version of the database that is being exported. If unspecified, there are no guarantees about the consistency of the documents being exported. |
| `startTime` | string (google-datetime) | The time this operation started. |

### `GoogleFirestoreAdminV1ExportDocumentsRequest`

- The request for FirestoreAdmin.ExportDocuments.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `collectionIds` | array<string> | IDs of the collection groups to export. Unspecified means all collection groups. Each collection group in this list must be unique. |
| `namespaceIds` | array<string> | An empty list represents all namespaces. This is the preferred usage for databases that don't use namespaces. An empty string element represents the default namespace. This should be used if the database has data in non-default namespaces, but doesn't want to include them. Each namespace in this list must be unique. |
| `outputUriPrefix` | string | The output URI. Currently only supports Google Cloud Storage URIs of the form: `gs://BUCKET_NAME[/NAMESPACE_PATH]`, where `BUCKET_NAME` is the name of the Google Cloud Storage bucket and `NAMESPACE_PATH` is an optional Google Cloud Storage namespace path. When choosing a name, be sure to consider Google Cloud Storage naming guidelines: https://cloud.google.com/storage/docs/naming. If the URI is a bucket (without a namespace path), a prefix will be generated based on the start time. |
| `snapshotTime` | string (google-datetime) | The timestamp that corresponds to the version of the database to be exported. The timestamp must be in the past, rounded to the minute and not older than earliestVersionTime. If specified, then the exported documents will represent a consistent view of the database at the provided time. Otherwise, there are no guarantees about the consistency of the exported documents. |

### `GoogleFirestoreAdminV1ExportDocumentsResponse`

- Returned in the google.longrunning.Operation response field.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `outputUriPrefix` | string | Location of the output files. This can be used to begin an import into Cloud Firestore (this project or another project) after the operation completes successfully. |

### `GoogleFirestoreAdminV1Field`

- Represents a single field in the database. Fields are grouped by their "Collection Group", which represent all collections in the database with the same ID.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `indexConfig` | GoogleFirestoreAdminV1IndexConfig | The index configuration for this field. If unset, field indexing will revert to the configuration defined by the `ancestor_field`. To explicitly remove all indexes for this field, specify an index config with an empty list of indexes. |
| `name` | string | Required. A field name of the form: `projects/{project_id}/databases/{database_id}/collectionGroups/{collection_id}/fields/{field_path}` A field path can be a simple field name, e.g. `address` or a path to fields within `map_value` , e.g. `address.city`, or a special field path. The only valid special field is `*`, which represents any field. Field paths can be quoted using `` ` `` (backtick). The only character that must be escaped within a quoted field path is the backtick character itself, escaped using a backslash. Special characters in field paths that must be quoted include: `\*`, `.`, `` ` `` (backtick), `[`, `]`, as well as any ascii symbolic characters. Examples: `` `address.city` `` represents a field named `address.city`, not the map key `city` in the field `address`. `` `*` `` represents a field named `*`, not any field. A special `Field` contains the default indexing settings for all fields. This field's resource name is: `projects/{project_id}/databases/{database_id}/collectionGroups/__default__/fields/*` Indexes defined on this `Field` will be applied to all fields which do not have their own `Field` index configuration. |
| `ttlConfig` | GoogleFirestoreAdminV1TtlConfig | The TTL configuration for this `Field`. Setting or unsetting this will enable or disable the TTL for documents that have this `Field`. |

### `GoogleFirestoreAdminV1FieldOperationMetadata`

- Metadata for google.longrunning.Operation results from FirestoreAdmin.UpdateField.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `endTime` | string (google-datetime) | The time this operation completed. Will be unset if operation still in progress. |
| `field` | string | The field resource that this operation is acting on. For example: `projects/{project_id}/databases/{database_id}/collectionGroups/{collection_id}/fields/{field_path}` |
| `indexConfigDeltas` | array<GoogleFirestoreAdminV1IndexConfigDelta> | A list of IndexConfigDelta, which describe the intent of this operation. |
| `progressBytes` | GoogleFirestoreAdminV1Progress | The progress, in bytes, of this operation. |
| `progressDocuments` | GoogleFirestoreAdminV1Progress | The progress, in documents, of this operation. |
| `startTime` | string (google-datetime) | The time this operation started. |
| `state` | string enum | The state of the operation. Values: `OPERATION_STATE_UNSPECIFIED`, `INITIALIZING`, `PROCESSING`, `CANCELLING`, `FINALIZING`, `SUCCESSFUL`, `FAILED`, `CANCELLED`. |
| `ttlConfigDelta` | GoogleFirestoreAdminV1TtlConfigDelta | Describes the deltas of TTL configuration. |

### `GoogleFirestoreAdminV1FlatIndex`

- An index that stores vectors in a flat data structure, and supports exhaustive search.
- Version: v1

### `GoogleFirestoreAdminV1GoogleDefaultEncryptionOptions`

- The configuration options for using Google default encryption.
- Version: v1

### `GoogleFirestoreAdminV1ImportDocumentsMetadata`

- Metadata for google.longrunning.Operation results from FirestoreAdmin.ImportDocuments.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `collectionIds` | array<string> | Which collection IDs are being imported. |
| `endTime` | string (google-datetime) | The time this operation completed. Will be unset if operation still in progress. |
| `inputUriPrefix` | string | The location of the documents being imported. |
| `namespaceIds` | array<string> | Which namespace IDs are being imported. |
| `operationState` | string enum | The state of the import operation. Values: `OPERATION_STATE_UNSPECIFIED`, `INITIALIZING`, `PROCESSING`, `CANCELLING`, `FINALIZING`, `SUCCESSFUL`, `FAILED`, `CANCELLED`. |
| `progressBytes` | GoogleFirestoreAdminV1Progress | The progress, in bytes, of this operation. |
| `progressDocuments` | GoogleFirestoreAdminV1Progress | The progress, in documents, of this operation. |
| `startTime` | string (google-datetime) | The time this operation started. |

### `GoogleFirestoreAdminV1ImportDocumentsRequest`

- The request for FirestoreAdmin.ImportDocuments.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `collectionIds` | array<string> | IDs of the collection groups to import. Unspecified means all collection groups that were included in the export. Each collection group in this list must be unique. |
| `inputUriPrefix` | string | Location of the exported files. This must match the output_uri_prefix of an ExportDocumentsResponse from an export that has completed successfully. See: google.firestore.admin.v1.ExportDocumentsResponse.output_uri_prefix. |
| `namespaceIds` | array<string> | An empty list represents all namespaces. This is the preferred usage for databases that don't use namespaces. An empty string element represents the default namespace. This should be used if the database has data in non-default namespaces, but doesn't want to include them. Each namespace in this list must be unique. |

### `GoogleFirestoreAdminV1Index`

- Cloud Firestore indexes enable simple and complex queries against documents in a database. In Standard edition databases, single-field indexes are managed using the google.firestore.admin.v1.Field resource, and composite indexes are managed using the google.firestore.admin.v1.Index resource. In Enterprise edition databases, both single-field and composite indexes are managed using the google.firestore.admin.v1.Index resource.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `apiScope` | string enum | The API scope supported by this index. Values: `ANY_API`, `DATASTORE_MODE_API`, `MONGODB_COMPATIBLE_API`. |
| `density` | string enum | Immutable. The density configuration of the index. Values: `DENSITY_UNSPECIFIED`, `SPARSE_ALL`, `SPARSE_ANY`, `DENSE`. |
| `fields` | array<GoogleFirestoreAdminV1IndexField> | The fields supported by this index. At most 100 fields may be specified. In Standard edition databases only: - At least 2 fields must be specified. - The last field entry is always for the field path `__name__`. If, on creation, `__name__` was not specified as the last field, it will be added automatically with the same direction as that of the last field defined. If the final field in the index is not directional, the `__name__` will be ordered ASCENDING (unless explicitly specified). |
| `multikey` | boolean | Optional. Whether the index is multikey. By default, the index is not multikey. For non-multikey indexes, none of the paths in the index definition reach or traverse an array, except via an explicit array index. For multikey indexes, at most one of the paths in the index definition reach or traverse an array, except via an explicit array index. Violations will result in errors. Note this field only applies to index with MONGODB_COMPATIBLE_API ApiScope. |
| `name` | string | A server-defined name for this index. Output only. When used in the google.firestore.admin.v1.Index resource, the value is of the form: `projects/{project_id}/databases/{database_id}/collectionGroups/{collection_id}/indexes/{index_id}` When used in the google.firestore.admin.v1.Field resource, the value is empty. |
| `queryScope` | string enum | Indexes with a collection query scope specified allow queries against a collection that is the child of a specific document, specified at query time, and that has the same collection ID. Indexes with a collection group query scope specified allow queries against all collections descended from a specific document, specified at query time, and that have the same collection ID as this index. Values: `QUERY_SCOPE_UNSPECIFIED`, `COLLECTION`, `COLLECTION_GROUP`, `COLLECTION_RECURSIVE`. |
| `searchIndexOptions` | GoogleFirestoreAdminV1SearchIndexOptions | Optional. Options for search indexes that are at the index definition level. This field is only currently supported for indexes with MONGODB_COMPATIBLE_API ApiScope. |
| `shardCount` | integer (int32) | Optional. The number of physical shards for the index. In Cloud Firestore, data and index entries are stored in contiguous, ordered key ranges called splits. While document keys within a collection are hashed to distribute write traffic across splits, secondary index entries are ordered lexicographically by their indexed field values. When an index contains fields with sequential or monotonically increasing or decreasing values (such as timestamps or auto-incrementing IDs), every incoming index write targets the boundary of the index keyspace on a single split. Because sequential writes continuously advance to the newest split at the edge of the range, automatic load-based splitting cannot divide the write traffic across storage servers. Under high write rates, this concentration creates an append hotspot on that single split, resulting in elevated write latency, contention errors, and transaction aborts. Sharded indexes solve this write bottleneck by hash partitioning the secondary index keyspace. When `shard_count` is configured to N, Firestore automatically prepends a virtual computed shard field (with values from 0 to N-1) as the leading field of the index. This splits a single sequential key range into N independent key ranges, uniformly scattering adjacent writes across distinct splits and storage servers to enable linear write scaling. Query trade-offs: Hash partitioning trades query performance for write throughput. Because matching index entries are scattered across all shards, queries executing against a sharded index cannot read from a single contiguous range. The query engine must fan out parallel seeks across all N shards and merge the ordered results. Even index point lookups and queries with `LIMIT 1` must seek across all N shards. Sizing and best practices: - Indexes cannot be updated in-place. `shard_count` is immutable once an index is created; to "reshard" an index, create a new index with the desired `shard_count` and delete the original index. - Use sharded indexes only for indexes experiencing write bottlenecks (typically exceeding 500-1,000 writes/sec) on sequential or timestamp fields. - Do not shard indexes on uniformly distributed fields (such as UUIDs or hash tokens), where writes naturally spread across splits without sharding. Sharding uniform indexes adds query overhead without improving write throughput. - Do not shard read-heavy or low-write collections. - Size `shard_count` based on expected peak write throughput. Because a single split sustains roughly 500-1,000 writes/sec on sequential keys, estimate `shard_count ≈ ceil(peak_write_qps / 500)`. - e.g., 4 for up to ~2,000-4,000 writes/sec, 16 for up to ~10,000+ writes/sec. - Setting an excessively high shard count produces diminishing write returns while needlessly increasing read latency and seek costs. If <= 1, the index is unsharded (1 physical shard). |
| `state` | string enum | Output only. The serving state of the index. Values: `STATE_UNSPECIFIED`, `CREATING`, `READY`, `NEEDS_REPAIR`. |
| `unique` | boolean | Optional. Whether it is an unique index. Unique index ensures all values for the indexed field(s) are unique across documents. |

### `GoogleFirestoreAdminV1IndexConfig`

- The index configuration for this field.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `ancestorField` | string | Output only. Specifies the resource name of the `Field` from which this field's index configuration is set (when `uses_ancestor_config` is true), or from which it \*would\* be set if this field had no index configuration (when `uses_ancestor_config` is false). |
| `indexes` | array<GoogleFirestoreAdminV1Index> | The indexes supported for this field. |
| `reverting` | boolean | Output only When true, the `Field`'s index configuration is in the process of being reverted. Once complete, the index config will transition to the same state as the field specified by `ancestor_field`, at which point `uses_ancestor_config` will be `true` and `reverting` will be `false`. |
| `usesAncestorConfig` | boolean | Output only. When true, the `Field`'s index configuration is set from the configuration specified by the `ancestor_field`. When false, the `Field`'s index configuration is defined explicitly. |

### `GoogleFirestoreAdminV1IndexConfigDelta`

- Information about an index configuration change.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `changeType` | string enum | Specifies how the index is changing. Values: `CHANGE_TYPE_UNSPECIFIED`, `ADD`, `REMOVE`. |
| `index` | GoogleFirestoreAdminV1Index | The index being changed. |

### `GoogleFirestoreAdminV1IndexField`

- A field in an index. The field_path describes which field is indexed, the value_mode describes how the field value is indexed.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `arrayConfig` | string enum | Indicates that this field supports operations on `array_value`s. Values: `ARRAY_CONFIG_UNSPECIFIED`, `CONTAINS`. |
| `fieldPath` | string | Can be \__name_\_. For single field indexes, this must match the name of the field or may be omitted. |
| `order` | string enum | Indicates that this field supports ordering by the specified order or comparing using =, !=, <, <=, >, >=. Values: `ORDER_UNSPECIFIED`, `ASCENDING`, `DESCENDING`. |
| `searchConfig` | GoogleFirestoreAdminV1SearchConfig | Indicates that this field supports search operations. |
| `vectorConfig` | GoogleFirestoreAdminV1VectorConfig | Indicates that this field supports nearest neighbor and distance operations on vector. |

### `GoogleFirestoreAdminV1IndexOperationMetadata`

- Metadata for google.longrunning.Operation results from FirestoreAdmin.CreateIndex.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `endTime` | string (google-datetime) | The time this operation completed. Will be unset if operation still in progress. |
| `index` | string | The index resource that this operation is acting on. For example: `projects/{project_id}/databases/{database_id}/collectionGroups/{collection_id}/indexes/{index_id}` |
| `progressBytes` | GoogleFirestoreAdminV1Progress | The progress, in bytes, of this operation. |
| `progressDocuments` | GoogleFirestoreAdminV1Progress | The progress, in documents, of this operation. |
| `startTime` | string (google-datetime) | The time this operation started. |
| `state` | string enum | The state of the operation. Values: `OPERATION_STATE_UNSPECIFIED`, `INITIALIZING`, `PROCESSING`, `CANCELLING`, `FINALIZING`, `SUCCESSFUL`, `FAILED`, `CANCELLED`. |

### `GoogleFirestoreAdminV1ListBackupSchedulesResponse`

- The response for FirestoreAdmin.ListBackupSchedules.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `backupSchedules` | array<GoogleFirestoreAdminV1BackupSchedule> | List of all backup schedules. |

### `GoogleFirestoreAdminV1ListBackupsResponse`

- The response for FirestoreAdmin.ListBackups.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `backups` | array<GoogleFirestoreAdminV1Backup> | List of all backups for the project. |
| `unreachable` | array<string> | List of locations that existing backups were not able to be fetched from. Instead of failing the entire requests when a single location is unreachable, this response returns a partial result set and list of locations unable to be reached here. The request can be retried against a single location to get a concrete error. |

### `GoogleFirestoreAdminV1ListChangeStreamsResponse`

- Response to FirestoreAdmin.ListChangeStreams.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `changeStreams` | array<GoogleFirestoreAdminV1ChangeStream> | The list of change streams. |

### `GoogleFirestoreAdminV1ListDatabasesResponse`

- The list of databases for a project.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `databases` | array<GoogleFirestoreAdminV1Database> | The databases in the project. |
| `unreachable` | array<string> | In the event that data about individual databases cannot be listed they will be recorded here. An example entry might be: projects/some_project/locations/some_location This can happen if the Cloud Region that the Database resides in is currently unavailable. In this case we can't fetch all the details about the database. You may be able to get a more detailed error message (or possibly fetch the resource) by sending a 'Get' request for the resource or a 'List' request for the specific location. |

### `GoogleFirestoreAdminV1ListFieldsResponse`

- The response for FirestoreAdmin.ListFields.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `fields` | array<GoogleFirestoreAdminV1Field> | The requested fields. |
| `nextPageToken` | string | A page token that may be used to request another page of results. If blank, this is the last page. |

### `GoogleFirestoreAdminV1ListIndexesResponse`

- The response for FirestoreAdmin.ListIndexes.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `indexes` | array<GoogleFirestoreAdminV1Index> | The requested indexes. |
| `nextPageToken` | string | A page token that may be used to request another page of results. If blank, this is the last page. |

### `GoogleFirestoreAdminV1ListUserCredsResponse`

- The response for FirestoreAdmin.ListUserCreds.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `userCreds` | array<GoogleFirestoreAdminV1UserCreds> | The user creds for the database. |

### `GoogleFirestoreAdminV1LocationMetadata`

- The metadata message for google.cloud.location.Location.metadata.
- Version: v1

### `GoogleFirestoreAdminV1PitrSnapshot`

- A consistent snapshot of a database at a specific point in time. A PITR (Point-in-time recovery) snapshot with previous versions of a database's data is available for every minute up to the associated database's data retention period. If the PITR feature is enabled, the retention period is 7 days; otherwise, it is one hour.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `database` | string | Required. The name of the database that this was a snapshot of. Format: `projects/{project}/databases/{database}`. |
| `databaseUid` | string (byte) | Output only. Public UUID of the database the snapshot was associated with. |
| `snapshotTime` | string (google-datetime) | Required. Snapshot time of the database. |

### `GoogleFirestoreAdminV1Progress`

- Describes the progress of the operation. Unit of work is generic and must be interpreted based on where Progress is used.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `completedWork` | string (int64) | The amount of work completed. |
| `estimatedWork` | string (int64) | The amount of work estimated. |

### `GoogleFirestoreAdminV1ResetUserPasswordRequest`

- The request for FirestoreAdmin.ResetUserPassword.
- Version: v1

### `GoogleFirestoreAdminV1ResourceIdentity`

- Describes a Resource Identity principal.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `principal` | string | Output only. Principal identifier string. See: https://cloud.google.com/iam/docs/principal-identifiers |

### `GoogleFirestoreAdminV1RestoreDatabaseMetadata`

- Metadata for the long-running operation from the RestoreDatabase request.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `backup` | string | The name of the backup restoring from. |
| `database` | string | The name of the database being restored to. |
| `endTime` | string (google-datetime) | The time the restore finished, unset for ongoing restores. |
| `operationState` | string enum | The operation state of the restore. Values: `OPERATION_STATE_UNSPECIFIED`, `INITIALIZING`, `PROCESSING`, `CANCELLING`, `FINALIZING`, `SUCCESSFUL`, `FAILED`, `CANCELLED`. |
| `progressPercentage` | GoogleFirestoreAdminV1Progress | How far along the restore is as an estimated percentage of remaining time. |
| `startTime` | string (google-datetime) | The time the restore was started. |

### `GoogleFirestoreAdminV1RestoreDatabaseRequest`

- The request message for FirestoreAdmin.RestoreDatabase.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `backup` | string | Required. Backup to restore from. Must be from the same project as the parent. The restored database will be created in the same location as the source backup. Format is: `projects/{project_id}/locations/{location}/backups/{backup}` |
| `databaseId` | string | Required. The ID to use for the database, which will become the final component of the database's resource name. This database ID must not be associated with an existing database. This value should be 4-63 characters. Valid characters are /a-z-/ with first character a letter and the last a letter or a number. Must not be UUID-like /\[0-9a-f\]{8}(-\[0-9a-f\]{4}){3}-\[0-9a-f\]{12}/. "(default)" database ID is also valid if the database is Standard edition. |
| `encryptionConfig` | GoogleFirestoreAdminV1EncryptionConfig | Optional. Encryption configuration for the restored database. If this field is not specified, the restored database will use the same encryption configuration as the backup, namely use_source_encryption. |
| `tags` | object | Optional. Immutable. Tags to be bound to the restored database. The tags should be provided in the format of `tagKeys/{tag_key_id} -> tagValues/{tag_value_id}`. |

### `GoogleFirestoreAdminV1SearchConfig`

- The configuration for how to index a field for search.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `geoSpec` | GoogleFirestoreAdminV1SearchGeoSpec | Optional. The specification for building a geo search index for a field. |
| `textSpec` | GoogleFirestoreAdminV1SearchTextSpec | Optional. The specification for building a text search index for a field. |

### `GoogleFirestoreAdminV1SearchGeoSpec`

- The specification for how to build a geo search index for a field.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `geoJsonIndexingDisabled` | boolean | Optional. Disables geoJSON indexing for the field. By default, geoJSON points are indexed. Firestore GeoPoints are indexed regardless of the value of this field. |

### `GoogleFirestoreAdminV1SearchIndexOptions`

- Options for search indexes at the definition level.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `textLanguage` | string | Optional. The language to use for text search indexes. Used as the default language if not overridden at the document level by specifying the `text_language_override_field`. The language is specified as a BCP 47 language code. For indexes with MONGODB_COMPATIBLE_API ApiScope: If unspecified, the default language is English. For indexes with `ANY_API` ApiScope: If unspecified, the default behavior is autodetect. |
| `textLanguageOverrideFieldPath` | string | Optional. The field in the document that specifies which language to use for that specific document. For indexes with MONGODB_COMPATIBLE_API ApiScope: if unspecified, the language is taken from the "language" field if it exists or from `text_language` if it does not. |

### `GoogleFirestoreAdminV1SearchTextIndexSpec`

- Specification of how the field should be indexed for search text indexes.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `indexType` | string enum | Required. How to index the text field value. Values: `TEXT_INDEX_TYPE_UNSPECIFIED`, `TOKENIZED`. |
| `matchType` | string enum | Required. How to match the text field value. Values: `TEXT_MATCH_TYPE_UNSPECIFIED`, `MATCH_GLOBALLY`. |

### `GoogleFirestoreAdminV1SearchTextSpec`

- The specification for how to build a text search index for a field.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `indexSpecs` | array<GoogleFirestoreAdminV1SearchTextIndexSpec> | Required. Specifications for how the field should be indexed. Repeated so that the field can be indexed in multiple ways. |

### `GoogleFirestoreAdminV1SourceEncryptionOptions`

- The configuration options for using the same encryption method as the source.
- Version: v1

### `GoogleFirestoreAdminV1SourceInfo`

- Information about the provenance of this database.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `backup` | GoogleFirestoreAdminV1BackupSource | If set, this database was restored from the specified backup (or a snapshot thereof). |
| `operation` | string | The associated long-running operation. This field may not be set after the operation has completed. Format: `projects/{project}/databases/{database}/operations/{operation}`. |

### `GoogleFirestoreAdminV1Stats`

- Backup specific statistics.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `documentCount` | string (int64) | Output only. The total number of documents contained in the backup. |
| `indexCount` | string (int64) | Output only. The total number of index entries contained in the backup. |
| `sizeBytes` | string (int64) | Output only. Summation of the size of all documents and index entries in the backup, measured in bytes. |

### `GoogleFirestoreAdminV1TtlConfig`

- The TTL (time-to-live) configuration for documents that have this `Field` set. A timestamp stored in a TTL-enabled field will be used to determine the expiration time of the document. The expiration time is the sum of the timestamp value and the `expiration_offset`. For Enterprise edition databases, the timestamp value may alternatively be stored in an array value in the TTL-enabled field. An expiration time in the past indicates that the document is eligible for immediate expiration. Using any other data type or leaving the field absent will disable expiration for the individual document.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `expirationOffset` | string (google-duration) | Optional. The offset, relative to the timestamp value from the TTL-enabled field, used to determine the document's expiration time. `expiration_offset.seconds` must be between 0 and 2,147,483,647 inclusive. Values more precise than seconds are rejected. If unset, defaults to 0, in which case the expiration time is the same as the timestamp value from the TTL-enabled field. |
| `state` | string enum | Output only. The state of the TTL configuration. Values: `STATE_UNSPECIFIED`, `CREATING`, `ACTIVE`, `NEEDS_REPAIR`. |

### `GoogleFirestoreAdminV1TtlConfigDelta`

- Information about a TTL configuration change.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `changeType` | string enum | Specifies how the TTL configuration is changing. Values: `CHANGE_TYPE_UNSPECIFIED`, `ADD`, `REMOVE`. |
| `expirationOffset` | string (google-duration) | The offset, relative to the timestamp value in the TTL-enabled field, used determine the document's expiration time. |

### `GoogleFirestoreAdminV1UpdateDatabaseMetadata`

- Metadata related to the update database operation.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `endTime` | string (google-datetime) | The time this operation completed. Will be unset if operation still in progress. |
| `startTime` | string (google-datetime) | The time this operation started. |
| `state` | string enum | The state of the operation. Values: `OPERATION_STATE_UNSPECIFIED`, `INITIALIZING`, `PROCESSING`, `CANCELLING`, `FINALIZING`, `SUCCESSFUL`, `FAILED`, `CANCELLED`. |

### `GoogleFirestoreAdminV1UserCreds`

- A Cloud Firestore User Creds.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. The time the user creds were created. |
| `name` | string | Identifier. The resource name of the UserCreds. Format: `projects/{project}/databases/{database}/userCreds/{user_creds}` |
| `resourceIdentity` | GoogleFirestoreAdminV1ResourceIdentity | Resource Identity descriptor. |
| `securePassword` | string | Output only. The plaintext server-generated password for the user creds. Only populated in responses for CreateUserCreds and ResetUserPassword. |
| `state` | string enum | Output only. Whether the user creds are enabled or disabled. Defaults to ENABLED on creation. Values: `STATE_UNSPECIFIED`, `ENABLED`, `DISABLED`. |
| `updateTime` | string (google-datetime) | Output only. The time the user creds were last updated. |

### `GoogleFirestoreAdminV1VectorConfig`

- The index configuration to support vector search operations
- Version: v1

| Field | Type | Description |
|---|---|---|
| `dimension` | integer (int32) | Required. The vector dimension this configuration applies to. The resulting index will only include vectors of this dimension, and can be used for vector search with the same dimension. |
| `flat` | GoogleFirestoreAdminV1FlatIndex | Indicates the vector index is a flat index. |

### `GoogleFirestoreAdminV1WeeklyRecurrence`

- Represents a recurring schedule that runs on a specified day of the week. The time zone is UTC.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `day` | string enum | The day of week to run. DAY_OF_WEEK_UNSPECIFIED is not allowed. Values: `DAY_OF_WEEK_UNSPECIFIED`, `MONDAY`, `TUESDAY`, `WEDNESDAY`, `THURSDAY`, `FRIDAY`, `SATURDAY`, `SUNDAY`. |

### `GoogleFirestoreAdminV1beta1ExportDocumentsMetadata`

- Metadata for ExportDocuments operations.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `collectionIds` | array<string> | Which collection ids are being exported. |
| `endTime` | string (google-datetime) | The time the operation ended, either successfully or otherwise. Unset if the operation is still active. |
| `operationState` | string enum | The state of the export operation. Values: `STATE_UNSPECIFIED`, `INITIALIZING`, `PROCESSING`, `CANCELLING`, `FINALIZING`, `SUCCESSFUL`, `FAILED`, `CANCELLED`. |
| `outputUriPrefix` | string | Where the entities are being exported to. |
| `progressBytes` | GoogleFirestoreAdminV1beta1Progress | An estimate of the number of bytes processed. |
| `progressDocuments` | GoogleFirestoreAdminV1beta1Progress | An estimate of the number of documents processed. |
| `startTime` | string (google-datetime) | The time that work began on the operation. |

### `GoogleFirestoreAdminV1beta1ExportDocumentsRequest`

- The request for FirestoreAdmin.ExportDocuments.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `collectionIds` | array<string> | Which collection ids to export. Unspecified means all collections. |
| `outputUriPrefix` | string | The output URI. Currently only supports Google Cloud Storage URIs of the form: `gs://BUCKET_NAME[/NAMESPACE_PATH]`, where `BUCKET_NAME` is the name of the Google Cloud Storage bucket and `NAMESPACE_PATH` is an optional Google Cloud Storage namespace path. When choosing a name, be sure to consider Google Cloud Storage naming guidelines: https://cloud.google.com/storage/docs/naming. If the URI is a bucket (without a namespace path), a prefix will be generated based on the start time. |

### `GoogleFirestoreAdminV1beta1ExportDocumentsResponse`

- Returned in the google.longrunning.Operation response field.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `outputUriPrefix` | string | Location of the output files. This can be used to begin an import into Cloud Firestore (this project or another project) after the operation completes successfully. |

### `GoogleFirestoreAdminV1beta1ImportDocumentsMetadata`

- Metadata for ImportDocuments operations.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `collectionIds` | array<string> | Which collection ids are being imported. |
| `endTime` | string (google-datetime) | The time the operation ended, either successfully or otherwise. Unset if the operation is still active. |
| `inputUriPrefix` | string | The location of the documents being imported. |
| `operationState` | string enum | The state of the import operation. Values: `STATE_UNSPECIFIED`, `INITIALIZING`, `PROCESSING`, `CANCELLING`, `FINALIZING`, `SUCCESSFUL`, `FAILED`, `CANCELLED`. |
| `progressBytes` | GoogleFirestoreAdminV1beta1Progress | An estimate of the number of bytes processed. |
| `progressDocuments` | GoogleFirestoreAdminV1beta1Progress | An estimate of the number of documents processed. |
| `startTime` | string (google-datetime) | The time that work began on the operation. |

### `GoogleFirestoreAdminV1beta1ImportDocumentsRequest`

- The request for FirestoreAdmin.ImportDocuments.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `collectionIds` | array<string> | Which collection ids to import. Unspecified means all collections included in the import. |
| `inputUriPrefix` | string | Location of the exported files. This must match the output_uri_prefix of an ExportDocumentsResponse from an export that has completed successfully. See: google.firestore.admin.v1beta1.ExportDocumentsResponse.output_uri_prefix. |

### `GoogleFirestoreAdminV1beta1Index`

- An index definition.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `collectionId` | string | The collection ID to which this index applies. Required. |
| `fields` | array<GoogleFirestoreAdminV1beta1IndexField> | The fields to index. |
| `name` | string | The resource name of the index. Output only. |
| `state` | string enum | The state of the index. Output only. Values: `STATE_UNSPECIFIED`, `CREATING`, `READY`, `ERROR`. |

### `GoogleFirestoreAdminV1beta1IndexField`

- A field of an index.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `fieldPath` | string | The path of the field. Must match the field path specification described by google.firestore.v1beta1.Document.fields. Special field path `__name__` may be used by itself or at the end of a path. `__type__` may be used only at the end of path. |
| `mode` | string enum | The field's mode. Values: `MODE_UNSPECIFIED`, `ASCENDING`, `DESCENDING`, `ARRAY_CONTAINS`. |

### `GoogleFirestoreAdminV1beta1IndexOperationMetadata`

- Metadata for index operations. This metadata populates the metadata field of google.longrunning.Operation.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `cancelled` | boolean | True if the \[google.longrunning.Operation\] was cancelled. If the cancellation is in progress, cancelled will be true but google.longrunning.Operation.done will be false. |
| `documentProgress` | GoogleFirestoreAdminV1beta1Progress | Progress of the existing operation, measured in number of documents. |
| `endTime` | string (google-datetime) | The time the operation ended, either successfully or otherwise. Unset if the operation is still active. |
| `index` | string | The index resource that this operation is acting on. For example: `projects/{project_id}/databases/{database_id}/indexes/{index_id}` |
| `operationType` | string enum | The type of index operation. Values: `OPERATION_TYPE_UNSPECIFIED`, `CREATING_INDEX`. |
| `startTime` | string (google-datetime) | The time that work began on the operation. |

### `GoogleFirestoreAdminV1beta1ListIndexesResponse`

- The response for FirestoreAdmin.ListIndexes.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `indexes` | array<GoogleFirestoreAdminV1beta1Index> | The indexes. |
| `nextPageToken` | string | The standard List next-page token. |

### `GoogleFirestoreAdminV1beta1LocationMetadata`

- The metadata message for google.cloud.location.Location.metadata.
- Version: v1beta1

### `GoogleFirestoreAdminV1beta1Progress`

- Measures the progress of a particular metric.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `workCompleted` | string (int64) | An estimate of how much work has been completed. Note that this may be greater than `work_estimated`. |
| `workEstimated` | string (int64) | An estimate of how much work needs to be performed. Zero if the work estimate is unavailable. May change as work progresses. |

### `GoogleFirestoreAdminV1beta2ExportDocumentsMetadata`

- Metadata for google.longrunning.Operation results from FirestoreAdmin.ExportDocuments.
- Version: v1beta2

| Field | Type | Description |
|---|---|---|
| `collectionIds` | array<string> | Which collection ids are being exported. |
| `endTime` | string (google-datetime) | The time this operation completed. Will be unset if operation still in progress. |
| `operationState` | string enum | The state of the export operation. Values: `OPERATION_STATE_UNSPECIFIED`, `INITIALIZING`, `PROCESSING`, `CANCELLING`, `FINALIZING`, `SUCCESSFUL`, `FAILED`, `CANCELLED`. |
| `outputUriPrefix` | string | Where the entities are being exported to. |
| `progressBytes` | GoogleFirestoreAdminV1beta2Progress | The progress, in bytes, of this operation. |
| `progressDocuments` | GoogleFirestoreAdminV1beta2Progress | The progress, in documents, of this operation. |
| `startTime` | string (google-datetime) | The time this operation started. |

### `GoogleFirestoreAdminV1beta2ExportDocumentsRequest`

- The request for FirestoreAdmin.ExportDocuments.
- Version: v1beta2

| Field | Type | Description |
|---|---|---|
| `collectionIds` | array<string> | Which collection ids to export. Unspecified means all collections. |
| `outputUriPrefix` | string | The output URI. Currently only supports Google Cloud Storage URIs of the form: `gs://BUCKET_NAME[/NAMESPACE_PATH]`, where `BUCKET_NAME` is the name of the Google Cloud Storage bucket and `NAMESPACE_PATH` is an optional Google Cloud Storage namespace path. When choosing a name, be sure to consider Google Cloud Storage naming guidelines: https://cloud.google.com/storage/docs/naming. If the URI is a bucket (without a namespace path), a prefix will be generated based on the start time. |

### `GoogleFirestoreAdminV1beta2ExportDocumentsResponse`

- Returned in the google.longrunning.Operation response field.
- Version: v1beta2

| Field | Type | Description |
|---|---|---|
| `outputUriPrefix` | string | Location of the output files. This can be used to begin an import into Cloud Firestore (this project or another project) after the operation completes successfully. |

### `GoogleFirestoreAdminV1beta2Field`

- Represents a single field in the database. Fields are grouped by their "Collection Group", which represent all collections in the database with the same id.
- Version: v1beta2

| Field | Type | Description |
|---|---|---|
| `indexConfig` | GoogleFirestoreAdminV1beta2IndexConfig | The index configuration for this field. If unset, field indexing will revert to the configuration defined by the `ancestor_field`. To explicitly remove all indexes for this field, specify an index config with an empty list of indexes. |
| `name` | string | A field name of the form `projects/{project_id}/databases/{database_id}/collectionGroups/{collection_id}/fields/{field_path}` A field path may be a simple field name, e.g. `address` or a path to fields within map_value , e.g. `address.city`, or a special field path. The only valid special field is `*`, which represents any field. Field paths may be quoted using \` (backtick). The only character that needs to be escaped within a quoted field path is the backtick character itself, escaped using a backslash. Special characters in field paths that must be quoted include: `*`, `.`, (backtick), `[`, `]`, as well as any ascii symbolic characters. Examples: (Note: Comments here are written in markdown syntax, so there is an additional layer of backticks to represent a code block) `\`address.city\`` represents a field named `address.city`, not the map key `city` in the field `address`. `\`\*\`` represents a field named `\*`, not any field. A special `Field` contains the default indexing settings for all fields. This field's resource name is: `projects/{project_id}/databases/{database_id}/collectionGroups/\__default_\_/fields/\*` Indexes defined on this `Field` will be applied to all fields which do not have their own `Field` index configuration. |

### `GoogleFirestoreAdminV1beta2FieldOperationMetadata`

- Metadata for google.longrunning.Operation results from FirestoreAdmin.UpdateField.
- Version: v1beta2

| Field | Type | Description |
|---|---|---|
| `bytesProgress` | GoogleFirestoreAdminV1beta2Progress | The progress, in bytes, of this operation. |
| `documentProgress` | GoogleFirestoreAdminV1beta2Progress | The progress, in documents, of this operation. |
| `endTime` | string (google-datetime) | The time this operation completed. Will be unset if operation still in progress. |
| `field` | string | The field resource that this operation is acting on. For example: `projects/{project_id}/databases/{database_id}/collectionGroups/{collection_id}/fields/{field_path}` |
| `indexConfigDeltas` | array<GoogleFirestoreAdminV1beta2IndexConfigDelta> | A list of IndexConfigDelta, which describe the intent of this operation. |
| `startTime` | string (google-datetime) | The time this operation started. |
| `state` | string enum | The state of the operation. Values: `OPERATION_STATE_UNSPECIFIED`, `INITIALIZING`, `PROCESSING`, `CANCELLING`, `FINALIZING`, `SUCCESSFUL`, `FAILED`, `CANCELLED`. |

### `GoogleFirestoreAdminV1beta2ImportDocumentsMetadata`

- Metadata for google.longrunning.Operation results from FirestoreAdmin.ImportDocuments.
- Version: v1beta2

| Field | Type | Description |
|---|---|---|
| `collectionIds` | array<string> | Which collection ids are being imported. |
| `endTime` | string (google-datetime) | The time this operation completed. Will be unset if operation still in progress. |
| `inputUriPrefix` | string | The location of the documents being imported. |
| `operationState` | string enum | The state of the import operation. Values: `OPERATION_STATE_UNSPECIFIED`, `INITIALIZING`, `PROCESSING`, `CANCELLING`, `FINALIZING`, `SUCCESSFUL`, `FAILED`, `CANCELLED`. |
| `progressBytes` | GoogleFirestoreAdminV1beta2Progress | The progress, in bytes, of this operation. |
| `progressDocuments` | GoogleFirestoreAdminV1beta2Progress | The progress, in documents, of this operation. |
| `startTime` | string (google-datetime) | The time this operation started. |

### `GoogleFirestoreAdminV1beta2ImportDocumentsRequest`

- The request for FirestoreAdmin.ImportDocuments.
- Version: v1beta2

| Field | Type | Description |
|---|---|---|
| `collectionIds` | array<string> | Which collection ids to import. Unspecified means all collections included in the import. |
| `inputUriPrefix` | string | Location of the exported files. This must match the output_uri_prefix of an ExportDocumentsResponse from an export that has completed successfully. See: google.firestore.admin.v1beta2.ExportDocumentsResponse.output_uri_prefix. |

### `GoogleFirestoreAdminV1beta2Index`

- Cloud Firestore indexes enable simple and complex queries against documents in a database.
- Version: v1beta2

| Field | Type | Description |
|---|---|---|
| `fields` | array<GoogleFirestoreAdminV1beta2IndexField> | The fields supported by this index. For composite indexes, this is always 2 or more fields. The last field entry is always for the field path `__name__`. If, on creation, `__name__` was not specified as the last field, it will be added automatically with the same direction as that of the last field defined. If the final field in a composite index is not directional, the `__name__` will be ordered ASCENDING (unless explicitly specified). For single field indexes, this will always be exactly one entry with a field path equal to the field path of the associated field. |
| `name` | string | Output only. A server defined name for this index. The form of this name for composite indexes will be: `projects/{project_id}/databases/{database_id}/collectionGroups/{collection_id}/indexes/{composite_index_id}` For single field indexes, this field will be empty. |
| `queryScope` | string enum | Indexes with a collection query scope specified allow queries against a collection that is the child of a specific document, specified at query time, and that has the same collection id. Indexes with a collection group query scope specified allow queries against all collections descended from a specific document, specified at query time, and that have the same collection id as this index. Values: `QUERY_SCOPE_UNSPECIFIED`, `COLLECTION`, `COLLECTION_GROUP`. |
| `state` | string enum | Output only. The serving state of the index. Values: `STATE_UNSPECIFIED`, `CREATING`, `READY`, `NEEDS_REPAIR`. |

### `GoogleFirestoreAdminV1beta2IndexConfig`

- The index configuration for this field.
- Version: v1beta2

| Field | Type | Description |
|---|---|---|
| `ancestorField` | string | Output only. Specifies the resource name of the `Field` from which this field's index configuration is set (when `uses_ancestor_config` is true), or from which it \*would\* be set if this field had no index configuration (when `uses_ancestor_config` is false). |
| `indexes` | array<GoogleFirestoreAdminV1beta2Index> | The indexes supported for this field. |
| `reverting` | boolean | Output only When true, the `Field`'s index configuration is in the process of being reverted. Once complete, the index config will transition to the same state as the field specified by `ancestor_field`, at which point `uses_ancestor_config` will be `true` and `reverting` will be `false`. |
| `usesAncestorConfig` | boolean | Output only. When true, the `Field`'s index configuration is set from the configuration specified by the `ancestor_field`. When false, the `Field`'s index configuration is defined explicitly. |

### `GoogleFirestoreAdminV1beta2IndexConfigDelta`

- Information about an index configuration change.
- Version: v1beta2

| Field | Type | Description |
|---|---|---|
| `changeType` | string enum | Specifies how the index is changing. Values: `CHANGE_TYPE_UNSPECIFIED`, `ADD`, `REMOVE`. |
| `index` | GoogleFirestoreAdminV1beta2Index | The index being changed. |

### `GoogleFirestoreAdminV1beta2IndexField`

- A field in an index. The field_path describes which field is indexed, the value_mode describes how the field value is indexed.
- Version: v1beta2

| Field | Type | Description |
|---|---|---|
| `arrayConfig` | string enum | Indicates that this field supports operations on `array_value`s. Values: `ARRAY_CONFIG_UNSPECIFIED`, `CONTAINS`. |
| `fieldPath` | string | Can be \__name_\_. For single field indexes, this must match the name of the field or may be omitted. |
| `order` | string enum | Indicates that this field supports ordering by the specified order or comparing using =, <, <=, >, >=. Values: `ORDER_UNSPECIFIED`, `ASCENDING`, `DESCENDING`. |

### `GoogleFirestoreAdminV1beta2IndexOperationMetadata`

- Metadata for google.longrunning.Operation results from FirestoreAdmin.CreateIndex.
- Version: v1beta2

| Field | Type | Description |
|---|---|---|
| `endTime` | string (google-datetime) | The time this operation completed. Will be unset if operation still in progress. |
| `index` | string | The index resource that this operation is acting on. For example: `projects/{project_id}/databases/{database_id}/collectionGroups/{collection_id}/indexes/{index_id}` |
| `progressBytes` | GoogleFirestoreAdminV1beta2Progress | The progress, in bytes, of this operation. |
| `progressDocuments` | GoogleFirestoreAdminV1beta2Progress | The progress, in documents, of this operation. |
| `startTime` | string (google-datetime) | The time this operation started. |
| `state` | string enum | The state of the operation. Values: `OPERATION_STATE_UNSPECIFIED`, `INITIALIZING`, `PROCESSING`, `CANCELLING`, `FINALIZING`, `SUCCESSFUL`, `FAILED`, `CANCELLED`. |

### `GoogleFirestoreAdminV1beta2ListFieldsResponse`

- The response for FirestoreAdmin.ListFields.
- Version: v1beta2

| Field | Type | Description |
|---|---|---|
| `fields` | array<GoogleFirestoreAdminV1beta2Field> | The requested fields. |
| `nextPageToken` | string | A page token that may be used to request another page of results. If blank, this is the last page. |

### `GoogleFirestoreAdminV1beta2ListIndexesResponse`

- The response for FirestoreAdmin.ListIndexes.
- Version: v1beta2

| Field | Type | Description |
|---|---|---|
| `indexes` | array<GoogleFirestoreAdminV1beta2Index> | The requested indexes. |
| `nextPageToken` | string | A page token that may be used to request another page of results. If blank, this is the last page. |

### `GoogleFirestoreAdminV1beta2Progress`

- Describes the progress of the operation. Unit of work is generic and must be interpreted based on where Progress is used.
- Version: v1beta2

| Field | Type | Description |
|---|---|---|
| `completedWork` | string (int64) | The amount of work completed. |
| `estimatedWork` | string (int64) | The amount of work estimated. |

### `GoogleLongrunningCancelOperationRequest`

- The request message for Operations.CancelOperation.
- Version: v1

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

### `LatLng`

- An object that represents a latitude/longitude pair. This is expressed as a pair of doubles to represent degrees latitude and degrees longitude. Unless specified otherwise, this object must conform to the WGS84 standard. Values must be within normalized ranges.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `latitude` | number (double) | The latitude in degrees. It must be in the range \[-90.0, +90.0\]. |
| `longitude` | number (double) | The longitude in degrees. It must be in the range \[-180.0, +180.0\]. |

### `ListCollectionIdsRequest`

- The request for Firestore.ListCollectionIds.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `pageSize` | integer (int32) | The maximum number of results to return. |
| `pageToken` | string | A page token. Must be a value from ListCollectionIdsResponse. |
| `readTime` | string (google-datetime) | Reads documents as they were at the given time. This must be a microsecond precision timestamp within the past one hour, or if Point-in-Time Recovery is enabled, can additionally be a whole minute timestamp within the past 7 days. |
| `requestOptions` | RequestOptions | Optional. The request options for this request. |

### `ListCollectionIdsResponse`

- The response from Firestore.ListCollectionIds.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `collectionIds` | array<string> | The collection ids. |
| `nextPageToken` | string | A page token that may be used to continue the list. |

### `ListDocumentsResponse`

- The response for Firestore.ListDocuments.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `documents` | array<Document> | The Documents found. |
| `nextPageToken` | string | A token to retrieve the next page of documents. If this field is omitted, there are no subsequent pages. |

### `ListLocationsResponse`

- The response message for Locations.ListLocations.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `locations` | array<Location> | A list of locations that matches the specified filter in the request. |
| `nextPageToken` | string | The standard List next-page token. |

### `ListenRequest`

- A request for Firestore.Listen
- Version: v1

| Field | Type | Description |
|---|---|---|
| `addTarget` | Target | A target to add to this stream. |
| `labels` | object | Labels associated with this target change. |
| `removeTarget` | integer (int32) | The ID of a target to remove from this stream. |
| `requestOptions` | RequestOptions | Optional. The request options for the request. |

### `ListenResponse`

- The response for Firestore.Listen.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `documentChange` | DocumentChange | A Document has changed. |
| `documentDelete` | DocumentDelete | A Document has been deleted. |
| `documentRemove` | DocumentRemove | A Document has been removed from a target (because it is no longer relevant to that target). |
| `filter` | ExistenceFilter | A filter to apply to the set of documents previously returned for the given target. Returned when documents may have been removed from the given target, but the exact documents are unknown. |
| `targetChange` | TargetChange | Targets have changed. |

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

### `MapValue`

- A map value.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `fields` | object | The map's fields. The map keys represent field names. Field names matching the regular expression `__.*__` are reserved. Reserved field names are forbidden except in certain documented contexts. The map keys, represented as UTF-8, must not exceed 1,500 bytes and cannot be empty. |

### `Order`

- An order on a field.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `direction` | string enum | The direction to order by. Defaults to `ASCENDING`. Values: `DIRECTION_UNSPECIFIED`, `ASCENDING`, `DESCENDING`. |
| `field` | FieldReference | The field to order by. |

### `PartitionQueryRequest`

- The request for Firestore.PartitionQuery.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `pageSize` | integer (int32) | The maximum number of partitions to return in this call, subject to `partition_count`. For example, if `partition_count` = 10 and `page_size` = 8, the first call to PartitionQuery will return up to 8 partitions and a `next_page_token` if more results exist. A second call to PartitionQuery will return up to 2 partitions, to complete the total of 10 specified in `partition_count`. |
| `pageToken` | string | The `next_page_token` value returned from a previous call to PartitionQuery that may be used to get an additional set of results. There are no ordering guarantees between sets of results. Thus, using multiple sets of results will require merging the different result sets. For example, two subsequent calls using a page_token may return: \* cursor B, cursor M, cursor Q \* cursor A, cursor U, cursor W To obtain a complete result set ordered with respect to the results of the query supplied to PartitionQuery, the results sets should be merged: cursor A, cursor B, cursor M, cursor Q, cursor U, cursor W |
| `partitionCount` | string (int64) | The desired maximum number of partition points. The partitions may be returned across multiple pages of results. The number must be positive. The actual number of partitions returned may be fewer. For example, this may be set to one fewer than the number of parallel queries to be run, or in running a data pipeline job, one fewer than the number of workers or compute instances available. |
| `readTime` | string (google-datetime) | Reads documents as they were at the given time. This must be a microsecond precision timestamp within the past one hour, or if Point-in-Time Recovery is enabled, can additionally be a whole minute timestamp within the past 7 days. |
| `requestOptions` | RequestOptions | Optional. The request options for the request. |
| `structuredQuery` | StructuredQuery | A structured query. Query must specify collection with all descendants and be ordered by name ascending. Other filters, order bys, limits, offsets, and start/end cursors are not supported. |

### `PartitionQueryResponse`

- The response for Firestore.PartitionQuery.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | A page token that may be used to request an additional set of results, up to the number specified by `partition_count` in the PartitionQuery request. If blank, there are no more results. |
| `partitions` | array<Cursor> | Partition results. Each partition is a split point that can be used by RunQuery as a starting or end point for the query results. The RunQuery requests must be made with the same query supplied to this PartitionQuery request. The partition cursors will be ordered according to same ordering as the results of the query supplied to PartitionQuery. For example, if a PartitionQuery request returns partition cursors A and B, running the following three queries will return the entire result set of the original query: \* query, end_at A \* query, start_at A, end_at B \* query, start_at B An empty result may indicate that the query has too few results to be partitioned, or that the query is not yet supported for partitioning. |

### `Pipeline`

- A Firestore query represented as an ordered list of operations / stages.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `stages` | array<Stage> | Required. Ordered list of stages to evaluate. |

### `PlanSummary`

- Planning phase information for the query.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `indexesUsed` | array<object> | The indexes selected for the query. For example: \[ {"query_scope": "Collection", "properties": "(foo ASC, \__name_\_ ASC)"}, {"query_scope": "Collection", "properties": "(bar ASC, \__name_\_ ASC)"} \] |

### `Precondition`

- A precondition on a document, used for conditional operations.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `exists` | boolean | When set to `true`, the target document must exist. When set to `false`, the target document must not exist. |
| `updateTime` | string (google-datetime) | When set, the target document must exist and have been last updated at that time. Timestamp must be microsecond aligned. |

### `Projection`

- The projection of document's fields to return.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `fields` | array<FieldReference> | The fields to return. If empty, all fields are returned. To only return the name of the document, use `['__name__']`. |

### `QueryTarget`

- A target specified by a query.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `parent` | string | The parent resource name. In the format: `projects/{project_id}/databases/{database_id}/documents` or `projects/{project_id}/databases/{database_id}/documents/{document_path}`. For example: `projects/my-project/databases/my-database/documents` or `projects/my-project/databases/my-database/documents/chatrooms/my-chatroom` |
| `structuredQuery` | StructuredQuery | A structured query. |

### `ReadOnly`

- Options for a transaction that can only be used to read documents.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `readTime` | string (google-datetime) | Reads documents at the given time. This must be a microsecond precision timestamp within the past one hour, or if Point-in-Time Recovery is enabled, can additionally be a whole minute timestamp within the past 7 days. |

### `ReadWrite`

- Options for a transaction that can be used to read and write documents.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `concurrencyMode` | string enum | Optional. The concurrency control mode to use for this transaction. A database is able to use different concurrency modes for different transactions simultaneously. 3rd party auth requests are only allowed to create optimistic read-write transactions and must specify that here even if the database-level setting is already configured to optimistic. Values: `CONCURRENCY_MODE_UNSPECIFIED`, `OPTIMISTIC`, `PESSIMISTIC`. |
| `retryTransaction` | string (byte) | An optional transaction to retry. |

### `RequestOptions`

- Options for a request.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `requestTags` | array<string> | Optional. The request tags for the request. Request tags are user-provided strings used for usage monitoring, cost management, and observability. Callers can associate custom application context (such as component, microservice, feature name, or operation type) with database requests. These tags are collected and aggregated in usage and monitoring reports, allowing billable operations and usage metrics to be sliced and analyzed by tag. These tags \*only\* show up in monitoring and are visible in administrative operations (such as usage reports). They do not affect data storage, query semantics, or request execution. Cardinality and Best Practices: - Request tags are most effective when using a bounded set of distinct values (e.g., fewer than 100 distinct tags across an entire database). Using a large number of distinct tags may result in tags being omitted from top usage dashboards. - Use structured identifiers (for example: `app=cart`, `env=prod`, `service=checkout`) and avoid high-cardinality values such as UUIDs, request IDs, timestamps, user IDs, or document keys. - Do not include sensitive data or personally identifiable information (PII) in request tags, as they show up in administrative monitoring. The tags are processed as follows: - Leading and trailing whitespace is trimmed. - Empty tags (after trimming) are filtered out. - Truncated to a maximum of 510 characters. - Deduplicated within the same request. - Limited to a maximum of 50 tags per request (excess tags are silently discarded). |

### `RollbackRequest`

- The request for Firestore.Rollback.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `requestOptions` | RequestOptions | Optional. The request options for this request. |
| `transaction` | string (byte) | Required. The transaction to roll back. |

### `RunAggregationQueryRequest`

- The request for Firestore.RunAggregationQuery.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `explainOptions` | ExplainOptions | Optional. Explain options for the query. If set, additional query statistics will be returned. If not, only query results will be returned. |
| `newTransaction` | TransactionOptions | Starts a new transaction as part of the query, defaulting to read-only. The new transaction ID will be returned as the first response in the stream. |
| `readTime` | string (google-datetime) | Executes the query at the given timestamp. This must be a microsecond precision timestamp within the past one hour, or if Point-in-Time Recovery is enabled, can additionally be a whole minute timestamp within the past 7 days. |
| `requestOptions` | RequestOptions | Optional. The request options for the request. |
| `structuredAggregationQuery` | StructuredAggregationQuery | An aggregation query. |
| `transaction` | string (byte) | Run the aggregation within an already active transaction. The value here is the opaque transaction ID to execute the query in. |

### `RunAggregationQueryResponse`

- The response for Firestore.RunAggregationQuery.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `explainMetrics` | ExplainMetrics | Query explain metrics. This is only present when the RunAggregationQueryRequest.explain_options is provided, and it is sent only once with the last response in the stream. |
| `readTime` | string (google-datetime) | The time at which the aggregate result was computed. This is always monotonically increasing; in this case, the previous AggregationResult in the result stream are guaranteed not to have changed between their `read_time` and this one. If the query returns no results, a response with `read_time` and no `result` will be sent, and this represents the time at which the query was run. |
| `result` | AggregationResult | A single aggregation result. Not present when reporting partial progress. |
| `transaction` | string (byte) | The transaction that was started as part of this request. Only present on the first response when the request requested to start a new transaction. |

### `RunQueryRequest`

- The request for Firestore.RunQuery.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `explainOptions` | ExplainOptions | Optional. Explain options for the query. If set, additional query statistics will be returned. If not, only query results will be returned. |
| `newTransaction` | TransactionOptions | Starts a new transaction and reads the documents. Defaults to a read-only transaction. The new transaction ID will be returned as the first response in the stream. |
| `readTime` | string (google-datetime) | Reads documents as they were at the given time. This must be a microsecond precision timestamp within the past one hour, or if Point-in-Time Recovery is enabled, can additionally be a whole minute timestamp within the past 7 days. |
| `requestOptions` | RequestOptions | Optional. The request options for this request. |
| `structuredQuery` | StructuredQuery | A structured query. |
| `transaction` | string (byte) | Run the query within an already active transaction. The value here is the opaque transaction ID to execute the query in. |

### `RunQueryResponse`

- The response for Firestore.RunQuery.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `document` | Document | A query result, not set when reporting partial progress. |
| `done` | boolean | If present, Firestore has completely finished the request and no more documents will be returned. |
| `explainMetrics` | ExplainMetrics | Query explain metrics. This is only present when the RunQueryRequest.explain_options is provided, and it is sent only once with the last response in the stream. |
| `readTime` | string (google-datetime) | The time at which the document was read. This may be monotonically increasing; in this case, the previous documents in the result stream are guaranteed not to have changed between their `read_time` and this one. If the query returns no results, a response with `read_time` and no `document` will be sent, and this represents the time at which the query was run. |
| `skippedResults` | integer (int32) | The number of results that have been skipped due to an offset between the last response and the current response. |
| `transaction` | string (byte) | The transaction that was started as part of this request. Can only be set in the first response, and only if RunQueryRequest.new_transaction was set in the request. If set, no other fields will be set in this response. |

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

- Generated from the Discovery document(s) v1, v1beta2, v1beta1 of `firestore` (retrieved 2026-11-14); a type with the same fields in several versions shows the preferred version; a type whose fields differ between versions is listed once per version (heading suffix `(version)`), and each type's `Version` line names the document it was taken from. A `$ref` resolves to the definition of the same version.
- Corrected from the official docs (the Discovery text above is verbatim): Discovery dropped the bracket expressions from the database ID character class; in google/firestore/admin/v1/firestore_admin.proto (googleapis commit 97f6460, https://github.com/googleapis/googleapis/blob/97f6460c3558c1435d7fd001a9251f8df058ae2f/google/firestore/admin/v1/firestore_admin.proto) it reads "Valid characters are `/[a-z][0-9]-/`" (shown above as `/a-z-/`), that is lower-case letters, digits and hyphens, as the newer descriptions of the same field say.
- Source: https://firestore.googleapis.com/$discovery/rest?version=v1, https://firestore.googleapis.com/$discovery/rest?version=v1beta2, https://firestore.googleapis.com/$discovery/rest?version=v1beta1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
