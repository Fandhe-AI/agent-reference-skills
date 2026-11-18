---
source: https://cloudtrace.googleapis.com/$discovery/rest?version=v2
---

# Cloud Trace API message schemas (cloudtrace)

## Signature / Usage

Message types referenced by the methods listed under `references/rest/cloudtrace/`.

### `Annotation`

- Text annotation with a set of attributes.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `attributes` | Attributes | Optional. A set of attributes on the annotation. You can have up to 4 attributes per Annotation. |
| `description` | TruncatableString | Optional. A user-supplied message describing the event. The maximum length for the description is 256 bytes. |

### `AttributeValue`

- The allowed types for `[VALUE]` in a `[KEY]:[VALUE]` attribute.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `boolValue` | boolean | Optional. A Boolean value represented by `true` or `false`. |
| `intValue` | string (int64) | Optional. A 64-bit signed integer. |
| `stringValue` | TruncatableString | Optional. A string up to 256 bytes long. |

### `Attributes`

- A set of attributes as key-value pairs.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `attributeMap` | object | Optional. A set of attributes. Each attribute's key can be up to 128 bytes long. The value can be a string up to 256 bytes, a signed 64-bit integer, or the boolean values `true` or `false`. For example: "/instance_id": { "string_value": { "value": "my-instance" } } "/http/request_bytes": { "int_value": 300 } "example.com/myattribute": { "bool_value": false } |
| `droppedAttributesCount` | integer (int32) | Optional. The number of attributes that were discarded. Attributes can be discarded because their keys are too long or because there are too many attributes. If this value is 0 then all attributes are valid. |

### `BatchWriteSpansRequest`

- The request message for the `BatchWriteSpans` method.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `spans` | array<Span> | Required. A list of new spans. The span names must not match existing spans, otherwise the results are undefined. |

### `Empty`

- A generic empty message that you can re-use to avoid defining duplicated empty messages in your APIs. A typical example is to use it as the request or the response type of an API method. For instance: service Foo { rpc Bar(google.protobuf.Empty) returns (google.protobuf.Empty); }
- Version: v2

### `Link`

- A pointer from the current span to another span in the same trace or in a different trace. For example, this can be used in batching operations, where a single batch handler processes multiple requests from different traces or when the handler receives a request from a different project.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `attributes` | Attributes | Optional. A set of attributes on the link. Up to 32 attributes can be specified per link. |
| `spanId` | string | Optional. The `[SPAN_ID]` for a span within a trace. |
| `traceId` | string | Optional. The `[TRACE_ID]` for a trace within a project. |
| `type` | string enum | Optional. The relationship of the current span relative to the linked span. Values: `TYPE_UNSPECIFIED`, `CHILD_LINKED_SPAN`, `PARENT_LINKED_SPAN`. |

### `Links`

- A collection of links, which are references from this span to a span in the same or different trace.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `droppedLinksCount` | integer (int32) | Optional. The number of dropped links after the maximum size was enforced. If this value is 0, then no links were dropped. |
| `link` | array<Link> | Optional. A collection of links. |

### `ListTraceSinksResponse`

- Result returned from `ListTraceSinks`.
- Version: v2beta1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | A paginated response where more pages might be available has `next_page_token` set. To get the next set of results, call the same method again using the value of `next_page_token` as `page_token`. |
| `sinks` | array<TraceSink> | A list of sinks. |

### `ListTracesResponse`

- The response message for the `ListTraces` method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | If defined, indicates that there are more traces that match the request and that this value should be passed to the next request to continue retrieving additional traces. |
| `traces` | array<Trace> | List of trace records as specified by the view parameter. |

### `MessageEvent`

- An event describing a message sent/received between Spans.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `compressedSizeBytes` | string (int64) | Optional. The number of compressed bytes sent or received. If missing, the compressed size is assumed to be the same size as the uncompressed size. |
| `id` | string (int64) | Optional. An identifier for the MessageEvent's message that can be used to match `SENT` and `RECEIVED` MessageEvents. |
| `type` | string enum | Optional. Type of MessageEvent. Indicates whether the message was sent or received. Values: `TYPE_UNSPECIFIED`, `SENT`, `RECEIVED`. |
| `uncompressedSizeBytes` | string (int64) | Optional. The number of uncompressed bytes sent or received. |

### `Module`

- Binary module.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `buildId` | TruncatableString | Optional. A unique identifier for the module, usually a hash of its contents (up to 128 bytes). |
| `module` | TruncatableString | Optional. For example: main binary, kernel modules, and dynamic libraries such as libc.so, sharedlib.so (up to 256 bytes). |

### `OutputConfig`

- OutputConfig contains a destination for writing trace data.
- Version: v2beta1

| Field | Type | Description |
|---|---|---|
| `destination` | string | Required. The destination for writing trace data. Supported formats include: "bigquery.googleapis.com/projects/\[PROJECT_ID\]/datasets/\[DATASET\]" |

### `Span`

- A span represents a single operation within a trace. Spans can be nested to form a trace tree. Often, a trace contains a root span that describes the end-to-end latency, and one or more subspans for its sub-operations. A trace can also contain multiple root spans, or none at all. Spans do not need to be contiguous. There might be gaps or overlaps between spans in a trace.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `attributes` | Attributes | Optional. A set of attributes on the span. You can have up to 32 attributes per span. |
| `childSpanCount` | integer (int32) | Optional. The number of child spans that were generated while this span was active. If set, allows implementation to detect missing child spans. |
| `displayName` | TruncatableString | Required. A description of the span's operation (up to 128 bytes). Cloud Trace displays the description in the Cloud console. For example, the display name can be a qualified method name or a file name and a line number where the operation is called. A best practice is to use the same display name within an application and at the same call point. This makes it easier to correlate spans in different traces. |
| `endTime` | string (google-datetime) | Required. The end time of the span. On the client side, this is the time kept by the local machine where the span execution ends. On the server side, this is the time when the server application handler stops running. |
| `links` | Links | Optional. Links associated with the span. You can have up to 128 links per Span. |
| `name` | string | Identifier. The resource name of the span in the following format: \* `projects/[PROJECT_ID]/traces/[TRACE_ID]/spans/[SPAN_ID]` `[TRACE_ID]` is a unique identifier for a trace within a project; it is a 32-character hexadecimal encoding of a 16-byte array. It should not be zero. `[SPAN_ID]` is a unique identifier for a span within a trace; it is a 16-character hexadecimal encoding of an 8-byte array. It should not be zero. . |
| `parentSpanId` | string | Optional. The `[SPAN_ID]` of this span's parent span. If this is a root span, then this field must be empty. |
| `sameProcessAsParentSpan` | boolean | Optional. Set this parameter to indicate whether this span is in the same process as its parent. If you do not set this parameter, Trace is unable to take advantage of this helpful information. |
| `spanId` | string | Required. The `[SPAN_ID]` portion of the span's resource name. |
| `spanKind` | string enum | Optional. Distinguishes between spans generated in a particular context. For example, two spans with the same name may be distinguished using `CLIENT` (caller) and `SERVER` (callee) to identify an RPC call. Values: `SPAN_KIND_UNSPECIFIED`, `INTERNAL`, `SERVER`, `CLIENT`, `PRODUCER`, `CONSUMER`. |
| `stackTrace` | StackTrace | Optional. Stack trace captured at the start of the span. |
| `startTime` | string (google-datetime) | Required. The start time of the span. On the client side, this is the time kept by the local machine where the span execution starts. On the server side, this is the time when the server's application handler starts running. |
| `status` | Status | Optional. The final status for this span. |
| `timeEvents` | TimeEvents | Optional. A set of time events. You can have up to 32 annotations and 128 message events per span. |

### `StackFrame`

- Represents a single stack frame in a stack trace.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `columnNumber` | string (int64) | Optional. The column number where the function call appears, if available. This is important in JavaScript because of its anonymous functions. |
| `fileName` | TruncatableString | Optional. The name of the source file where the function call appears (up to 256 bytes). |
| `functionName` | TruncatableString | Optional. The fully-qualified name that uniquely identifies the function or method that is active in this frame (up to 1024 bytes). |
| `lineNumber` | string (int64) | Optional. The line number in `file_name` where the function call appears. |
| `loadModule` | Module | Optional. The binary module from where the code was loaded. |
| `originalFunctionName` | TruncatableString | Optional. An un-mangled function name, if `function_name` is mangled. To get information about name mangling, run this search (https://www.google.com/search?q=cxx+name+mangling). The name can be fully-qualified (up to 1024 bytes). |
| `sourceVersion` | TruncatableString | Optional. The version of the deployed source code (up to 128 bytes). |

### `StackFrames`

- A collection of stack frames, which can be truncated.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `droppedFramesCount` | integer (int32) | Optional. The number of stack frames that were dropped because there were too many stack frames. If this value is 0, then no stack frames were dropped. |
| `frame` | array<StackFrame> | Optional. Stack frames in this call stack. |

### `StackTrace`

- A call stack appearing in a trace.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `stackFrames` | StackFrames | Optional. Stack frames in this stack trace. A maximum of 128 frames are allowed. |
| `stackTraceHashId` | string (int64) | Optional. The hash ID is used to conserve network bandwidth for duplicate stack traces within a single trace. Often multiple spans will have identical stack traces. The first occurrence of a stack trace should contain both the `stackFrame` content and a value in `stackTraceHashId`. Subsequent spans within the same request can refer to that stack trace by only setting `stackTraceHashId`. |

### `Status`

- The `Status` type defines a logical error model that is suitable for different programming environments, including REST APIs and RPC APIs. It is used by gRPC (https://github.com/grpc). Each `Status` message contains three pieces of data: error code, error message, and error details. You can find out more about this error model and how to work with it in the API Design Guide (https://cloud.google.com/apis/design/errors).
- Version: v2

| Field | Type | Description |
|---|---|---|
| `code` | integer (int32) | The status code, which should be an enum value of google.rpc.Code. |
| `details` | array<object> | A list of messages that carry the error details. There is a common set of message types for APIs to use. |
| `message` | string | A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client. |

### `TimeEvent`

- A time-stamped annotation or message event in the Span.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `annotation` | Annotation | Text annotation with a set of attributes. |
| `messageEvent` | MessageEvent | An event describing a message sent/received between Spans. |
| `time` | string (google-datetime) | Optional. The timestamp indicating the time the event occurred. |

### `TimeEvents`

- A collection of `TimeEvent`s. A `TimeEvent` is a time-stamped annotation on the span, consisting of either user-supplied key:value pairs, or details of a message sent/received between Spans.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `droppedAnnotationsCount` | integer (int32) | Optional. The number of dropped annotations in all the included time events. If the value is 0, then no annotations were dropped. |
| `droppedMessageEventsCount` | integer (int32) | Optional. The number of dropped message events in all the included time events. If the value is 0, then no message events were dropped. |
| `timeEvent` | array<TimeEvent> | Optional. A collection of `TimeEvent`s. |

### `Trace`

- A trace describes how long it takes for an application to perform an operation. It consists of a set of spans, each of which represent a single timed event within the operation.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `projectId` | string | Required. Project ID of the Cloud project where the trace data is stored. |
| `spans` | array<TraceSpan> | Collection of spans in the trace. |
| `traceId` | string | Required. Globally unique identifier for the trace. This identifier is a 128-bit numeric value formatted as a 32-byte hex string. For example, `382d4f4c6b7bb2f4a972559d9085001d`. The numeric value should not be zero. |

### `TraceSink`

- Describes a sink used to export traces to a BigQuery dataset. The sink must be created within a project.
- Version: v2beta1

| Field | Type | Description |
|---|---|---|
| `name` | string | Identifier. The canonical sink resource name, unique within the project. Must be of the form: projects/\[PROJECT_NUMBER\]/traceSinks/\[SINK_ID\]. E.g.: `"projects/12345/traceSinks/my-project-trace-sink"`. Sink identifiers are limited to 256 characters and can include only the following characters: upper and lower-case alphanumeric characters, underscores, hyphens, and periods. |
| `outputConfig` | OutputConfig | Required. The export destination. |
| `writerIdentity` | string | Output only. A service account name for exporting the data. This field is set by sinks.create and sinks.update. The service account will need to be granted write access to the destination specified in the output configuration, see Granting access for a resource. To create tables and to write data, this account needs the `dataEditor` role. Read more about roles in the BigQuery documentation (https://cloud.google.com/bigquery/docs/access-control). E.g.: "service-00000001@00000002.iam.gserviceaccount.com" |

### `TraceSpan`

- A span represents a single timed event within a trace. Spans can be nested and form a trace tree. Often, a trace contains a root span that describes the end-to-end latency of an operation and, optionally, one or more subspans for its suboperations. Spans do not need to be contiguous. There may be gaps between spans in a trace.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `endTime` | string (google-datetime) | Required. End time of the span in seconds and nanoseconds from the UNIX epoch. |
| `kind` | string enum | Optional. Distinguishes between spans generated in a particular context. For example, two spans with the same name may be distinguished using `RPC_CLIENT` and `RPC_SERVER` to identify queueing latency associated with the span. Values: `SPAN_KIND_UNSPECIFIED`, `RPC_SERVER`, `RPC_CLIENT`. |
| `labels` | object | Optional. Collection of labels associated with the span. Label keys must be less than 128 bytes. Label values must be less than 16 KiB. Some keys might have predefined meaning, and you can also create your own. For more information, see Cloud Trace labels (https://cloud.google.com/trace/docs/trace-labels). |
| `name` | string | Required. Name of the span. Must be less than 128 bytes. The span name is sanitized and displayed in the Trace tool in the Google Cloud Platform Console. The name may be a method name or some other per-call site name. For the same executable and the same call point, a best practice is to use a consistent name, which makes it easier to correlate cross-trace spans. |
| `parentSpanId` | string (uint64) | Optional. ID of the parent span, if any. |
| `spanId` | string (uint64) | Required. Identifier for the span. Must be a 64-bit integer other than 0 and unique within a trace. For example, `2205310701640571284`. |
| `startTime` | string (google-datetime) | Required. Start time of the span in seconds and nanoseconds from the UNIX epoch. |

### `Traces`

- List of new or updated traces.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `traces` | array<Trace> | List of traces. |

### `TruncatableString`

- Represents a string that might be shortened to a specified length.
- Version: v2

| Field | Type | Description |
|---|---|---|
| `truncatedByteCount` | integer (int32) | Optional. The number of bytes removed from the original string. If this value is 0, then the string was not shortened. |
| `value` | string | Optional. The shortened string. For example, if the original string is 500 bytes long and the limit of the string is 128 bytes, then `value` contains the first 128 bytes of the 500-byte string. Truncation always happens on a UTF8 character boundary. If there are multi-byte characters in the string, then the length of the shortened string might be less than the size limit. |

### Shape of `Annotation`

Generated from the Discovery schema (not in the official docs); values show each field type:

```json
{
  "attributes": "Attributes",
  "description": "TruncatableString"
}
```

## Notes

- Generated from the Discovery document(s) v2, v1, v2beta1 of `cloudtrace` (retrieved 2026-11-14); a type with the same fields in several versions shows the preferred version; a type whose fields differ between versions is listed once per version (heading suffix `(version)`), and each type's `Version` line names the document it was taken from. A `$ref` resolves to the definition of the same version.
- Descriptions are verbatim from Discovery, which drops angle-bracket placeholders of the source comments: a format such as `projects//locations/global` stands for `projects/{project}/locations/global` (likewise `"@.iam.gserviceaccount.com"` lost the account ID before `@`, and a name format ending in a collection such as `projects/*/locations/*/registrations/` lost its last ID), and an expression such as `... && in labels` lost its left operand (for example `'label_value' in labels`). Check the method or field in the product's REST reference before relying on such a format.
- Source: https://cloudtrace.googleapis.com/$discovery/rest?version=v2, https://cloudtrace.googleapis.com/$discovery/rest?version=v1, https://cloudtrace.googleapis.com/$discovery/rest?version=v2beta1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
