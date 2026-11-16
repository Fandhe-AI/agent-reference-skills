---
source: https://firestore.googleapis.com/$discovery/rest?version=v1
---

# Cloud Firestore API message schemas (firestore) (part 2/2)

## Signature / Usage

Message types referenced by the methods listed under `references/rest/firestore/`.

### `Stage`

- A single operation within a pipeline. A stage is made up of a unique name, and a list of arguments. The exact number of arguments & types is dependent on the stage type. To give an example, the stage `filter(state = "MD")` would be encoded as: name: "filter" args { function_value { name: "eq" args { field_reference_value: "state" } args { string_value: "MD" } } } See public documentation for the full list.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `args` | array<Value> | Optional. Ordered list of arguments the given stage expects. |
| `name` | string | Required. The name of the stage to evaluate. \*\*Requires:\*\* \* must be in snake case (lower case with underscore separator). |
| `options` | object | Optional. Optional named arguments that certain functions may support. |

### `Status`

- The `Status` type defines a logical error model that is suitable for different programming environments, including REST APIs and RPC APIs. It is used by gRPC (https://github.com/grpc). Each `Status` message contains three pieces of data: error code, error message, and error details. You can find out more about this error model and how to work with it in the API Design Guide (https://cloud.google.com/apis/design/errors).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `code` | integer (int32) | The status code, which should be an enum value of google.rpc.Code. |
| `details` | array<object> | A list of messages that carry the error details. There is a common set of message types for APIs to use. |
| `message` | string | A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client. |

### `StructuredAggregationQuery`

- Firestore query for running an aggregation over a StructuredQuery.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `aggregations` | array<Aggregation> | Optional. Series of aggregations to apply over the results of the `structured_query`. Requires: \* A minimum of one and maximum of five aggregations per query. |
| `structuredQuery` | StructuredQuery | Nested structured query. |

### `StructuredPipeline`

- A Firestore query represented as an ordered list of operations / stages. This is considered the top-level function which plans and executes a query. It is logically equivalent to `query(stages, options)`, but prevents the client from having to build a function wrapper.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `options` | object | Optional. Optional query-level arguments. |
| `pipeline` | Pipeline | Required. The pipeline query to execute. |

### `StructuredQuery`

- A Firestore query. The query stages are executed in the following order: 1. from 2. where 3. select 4. order_by + start_at + end_at 5. offset 6. limit 7. find_nearest
- Version: v1

| Field | Type | Description |
|---|---|---|
| `endAt` | Cursor | A potential prefix of a position in the result set to end the query at. This is similar to `START_AT` but with it controlling the end position rather than the start position. Requires: \* The number of values cannot be greater than the number of fields specified in the `ORDER BY` clause. |
| `findNearest` | FindNearest | Optional. A potential nearest neighbors search. Applies after all other filters and ordering. Finds the closest vector embeddings to the given query vector. |
| `from` | array<CollectionSelector> | The collections to query. |
| `limit` | integer (int32) | The maximum number of results to return. Applies after all other constraints. Requires: \* The value must be greater than or equal to zero if specified. |
| `offset` | integer (int32) | The number of documents to skip before returning the first result. This applies after the constraints specified by the `WHERE`, `START AT`, & `END AT` but before the `LIMIT` clause. Requires: \* The value must be greater than or equal to zero if specified. |
| `orderBy` | array<Order> | The order to apply to the query results. Callers can provide a full ordering, a partial ordering, or no ordering at all. While Firestore will always respect the provided order, the behavior for queries without a full ordering is different per database edition: In Standard edition, Firestore guarantees a stable ordering through the following rules: \* The `order_by` is required to reference all fields used with an inequality filter. \* All fields that are required to be in the `order_by` but are not already present are appended in lexicographical ordering of the field name. \* If an order on `__name__` is not specified, it is appended by default. Fields are appended with the same sort direction as the last order specified, or 'ASCENDING' if no order was specified. For example: \* `ORDER BY a` becomes `ORDER BY a ASC, __name__ ASC` \* `ORDER BY a DESC` becomes `ORDER BY a DESC, __name__ DESC` \* `WHERE a > 1` becomes `WHERE a > 1 ORDER BY a ASC, __name__ ASC` \* `WHERE __name__ > ... AND a > 1` becomes `WHERE __name__ > ... AND a > 1 ORDER BY a ASC, __name__ ASC` In Enterprise edition, Firestore does not guarantee a stable ordering. Instead it will pick the most efficient ordering based on the indexes available at the time of query execution. This will result in a different ordering for queries that are otherwise identical. To ensure a stable ordering, always include a unique field in the `order_by` clause, such as `__name__`. |
| `select` | Projection | Optional sub-set of the fields to return. This acts as a DocumentMask over the documents returned from a query. When not set, assumes that the caller wants all fields returned. |
| `startAt` | Cursor | A potential prefix of a position in the result set to start the query at. The ordering of the result set is based on the `ORDER BY` clause of the original query. SELECT \* FROM k WHERE a = 1 AND b > 2 ORDER BY b ASC, \__name_\_ ASC; This query's results are ordered by `(b ASC, __name__ ASC)`. Cursors can reference either the full ordering or a prefix of the location, though it cannot reference more fields than what are in the provided `ORDER BY`. Continuing off the example above, attaching the following start cursors will have varying impact: - `START BEFORE (2, /k/123)`: start the query right before `a = 1 AND b > 2 AND __name__ > /k/123`. - `START AFTER (10)`: start the query right after `a = 1 AND b > 10`. Unlike `OFFSET` which requires scanning over the first N results to skip, a start cursor allows the query to begin at a logical position. This position is not required to match an actual result, it will scan forward from this position to find the next document. Requires: \* The number of values cannot be greater than the number of fields specified in the `ORDER BY` clause. |
| `where` | Filter | The filter to apply. |

### `Sum`

- Sum of the values of the requested field. \* Only numeric values will be aggregated. All non-numeric values including `NULL` are skipped. \* If the aggregated values contain `NaN`, returns `NaN`. Infinity math follows IEEE-754 standards. \* If the aggregated value set is empty, returns 0. \* Returns a 64-bit integer if all aggregated numbers are integers and the sum result does not overflow. Otherwise, the result is returned as a double. Note that even if all the aggregated values are integers, the result is returned as a double if it cannot fit within a 64-bit signed integer. When this occurs, the returned value will lose precision. \* When underflow occurs, floating-point aggregation is non-deterministic. This means that running the same query repeatedly without any changes to the underlying values could produce slightly different results each time. In those cases, values should be stored as integers over floating-point numbers.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `field` | FieldReference | The field to aggregate on. |

### `Target`

- A specification of a set of documents to listen to.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `documents` | DocumentsTarget | A target specified by a set of document names. |
| `expectedCount` | integer (int32) | The number of documents that last matched the query at the resume token or read time. This value is only relevant when a `resume_type` is provided. This value being present and greater than zero signals that the client wants `ExistenceFilter.unchanged_names` to be included in the response. |
| `once` | boolean | If the target should be removed once it is current and consistent. |
| `query` | QueryTarget | A target specified by a query. |
| `readTime` | string (google-datetime) | Start listening after a specific `read_time`. The client must know the state of matching documents at this time. |
| `resumeToken` | string (byte) | A resume token from a prior TargetChange for an identical target. Using a resume token with a different target is unsupported and may fail. |
| `targetId` | integer (int32) | The target ID that identifies the target on the stream. Must be a positive number and non-zero. If `target_id` is 0 (or unspecified), the server will assign an ID for this target and return that in a `TargetChange::ADD` event. Once a target with `target_id=0` is added, all subsequent targets must also have `target_id=0`. If an `AddTarget` request with `target_id != 0` is sent to the server after a target with `target_id=0` is added, the server will immediately send a response with a `TargetChange::Remove` event. Note that if the client sends multiple `AddTarget` requests without an ID, the order of IDs returned in `TargetChange.target_ids` are undefined. Therefore, clients should provide a target ID instead of relying on the server to assign one. If `target_id` is non-zero, there must not be an existing active target on this stream with the same ID. |

### `TargetChange`

- Targets being watched have changed.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `cause` | Status | The error that resulted in this change, if applicable. |
| `readTime` | string (google-datetime) | The consistent `read_time` for the given `target_ids` (omitted when the target_ids are not at a consistent snapshot). The stream is guaranteed to send a `read_time` with `target_ids` empty whenever the entire stream reaches a new consistent snapshot. ADD, CURRENT, and RESET messages are guaranteed to (eventually) result in a new consistent snapshot (while NO_CHANGE and REMOVE messages are not). For a given stream, `read_time` is guaranteed to be monotonically increasing. |
| `resumeToken` | string (byte) | A token that can be used to resume the stream for the given `target_ids`, or all targets if `target_ids` is empty. Not set on every target change. |
| `targetChangeType` | string enum | The type of change that occurred. Values: `NO_CHANGE`, `ADD`, `REMOVE`, `CURRENT`, `RESET`. |
| `targetIds` | array<integer> | The target IDs of targets that have changed. If empty, the change applies to all targets. The order of the target IDs is not defined. |

### `TransactionOptions`

- Options for creating a new transaction.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `readOnly` | ReadOnly | The transaction can only be used for read operations. |
| `readWrite` | ReadWrite | The transaction can be used for both read and write operations. |

### `UnaryFilter`

- A filter with a single operand.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `field` | FieldReference | The field to which to apply the operator. |
| `op` | string enum | The unary operator to apply. Values: `OPERATOR_UNSPECIFIED`, `IS_NAN`, `IS_NULL`, `IS_NOT_NAN`, `IS_NOT_NULL`. |

### `Value`

- A message that can hold any of the supported value types.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `arrayValue` | ArrayValue | An array value. In Standard edition databases, an array value cannot directly contain another array value, though it can contain a map which contains another array. In Enterprise edition databases, an array value can contain another array value. |
| `booleanValue` | boolean | A boolean value. |
| `bytesValue` | string (byte) | A bytes value. In Standard edition databases: \* The value must not exceed 1 MiB - 89 bytes. \* Only the first 1,500 bytes are considered by queries. In Enterprise edition databases, there is no limit on the size of the value. However, it is still subject to document and index entry size limits. |
| `doubleValue` | number (double) | A double value. |
| `fieldReferenceValue` | string | Value which references a field. This is considered relative (vs absolute) since it only refers to a field and not a field within a particular document. \*\*Requires:\*\* \* Must follow field reference limitations. \* Not allowed to be used when writing documents. |
| `functionValue` | Function | A value that represents an unevaluated expression. \*\*Requires:\*\* \* Not allowed to be used when writing documents. |
| `geoPointValue` | LatLng | A geo point value representing a point on the surface of Earth. |
| `integerValue` | string (int64) | An integer value. |
| `mapValue` | MapValue | A map value. |
| `nullValue` | string enum | A null value. Values: `NULL_VALUE`. |
| `pipelineValue` | Pipeline | A value that represents an unevaluated pipeline. \*\*Requires:\*\* \* Not allowed to be used when writing documents. |
| `referenceValue` | string | A reference to a document. For example: `projects/{project_id}/databases/{database_id}/documents/{document_path}`. |
| `stringValue` | string | A string value. In Standard edition databases: \* The string, represented as UTF-8, must not exceed 1 MiB - 89 bytes. \* Only the first 1,500 bytes of the UTF-8 representation are considered by queries. In Enterprise edition databases, there is no limit on the size of the value. However, it is still subject to document and index entry size limits. |
| `timestampValue` | string (google-datetime) | A timestamp value. Precise only to microseconds. When stored, any additional precision is rounded down. |
| `variableReferenceValue` | string | Pointer to a variable defined elsewhere in a pipeline. Unlike `field_reference_value` which references a field within a document, this refers to a variable, defined in a separate namespace than the fields of a document. |

### `Write`

- A write on a document.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `currentDocument` | Precondition | An optional precondition on the document. The write will fail if this is set and not met by the target document. |
| `delete` | string | A document name to delete. In the format: `projects/{project_id}/databases/{database_id}/documents/{document_path}`. |
| `transform` | DocumentTransform | Applies a transformation to a document. |
| `update` | Document | A document to write. |
| `updateMask` | DocumentMask | The fields to update in this write. This field can be set only when the operation is `update`. If the mask is not set for an `update` and the document exists, any existing data will be overwritten. If the mask is set and the document on the server has fields not covered by the mask, they are left unchanged. Fields referenced in the mask, but not present in the input document, are deleted from the document on the server. The field paths in this mask must not contain a reserved field name. |
| `updateTransforms` | array<FieldTransform> | The transforms to perform after update. This field can be set only when the operation is `update`. If present, this write is equivalent to performing `update` and `transform` to the same document atomically and in order. |

### `WriteRequest`

- The request for Firestore.Write. The first request creates a stream, or resumes an existing one from a token. When creating a new stream, the server replies with a response containing only an ID and a token, to use in the next request. When resuming a stream, the server first streams any responses later than the given token, then a response containing only an up-to-date token, to use in the next request.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `labels` | object | Labels associated with this write request. |
| `requestOptions` | RequestOptions | Optional. The request options for the request. |
| `streamId` | string | The ID of the write stream to resume. This may only be set in the first message. When left empty, a new write stream will be created. |
| `streamToken` | string (byte) | A stream token that was previously sent by the server. The client should set this field to the token from the most recent WriteResponse it has received. This acknowledges that the client has received responses up to this token. After sending this token, earlier tokens may not be used anymore. The server may close the stream if there are too many unacknowledged responses. Leave this field unset when creating a new stream. To resume a stream at a specific point, set this field and the `stream_id` field. Leave this field unset when creating a new stream. |
| `writes` | array<Write> | The writes to apply. Always executed atomically and in order. This must be empty on the first request. This may be empty on the last request. This must not be empty on all other requests. |

### `WriteResponse`

- The response for Firestore.Write.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `commitTime` | string (google-datetime) | The time at which the commit occurred. Any read with an equal or greater `read_time` is guaranteed to see the effects of the write. |
| `streamId` | string | The ID of the stream. Only set on the first message, when a new stream was created. |
| `streamToken` | string (byte) | A token that represents the position of this response in the stream. This can be used by a client to resume the stream at this point. This field is always set. |
| `writeResults` | array<WriteResult> | The result of applying the writes. This i-th write result corresponds to the i-th write in the request. |

### `WriteResult`

- The result of applying a write.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `transformResults` | array<Value> | The results of applying each DocumentTransform.FieldTransform, in the same order. |
| `updateTime` | string (google-datetime) | The last update time of the document after applying the write. Not set after a `delete`. If the write did not actually change the document, this will be the previous update_time. |

### Shape of `Stage`

Generated from the Discovery schema (not in the official docs); values show each field type:

```json
{
  "args": "array<Value>",
  "name": "string",
  "options": "object"
}
```

## Notes

- Generated from the Discovery document(s) v1 of `firestore` (retrieved 2026-11-14); a type with the same fields in several versions shows the preferred version; a type whose fields differ between versions is listed once per version (heading suffix `(version)`), and each type's `Version` line names the document it was taken from. A `$ref` resolves to the definition of the same version.
- Source: https://firestore.googleapis.com/$discovery/rest?version=v1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
