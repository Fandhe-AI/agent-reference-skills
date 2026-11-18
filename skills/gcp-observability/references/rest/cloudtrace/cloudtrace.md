---
source: https://cloudtrace.googleapis.com/$discovery/rest?version=v2
---

# Cloud Trace API REST API (cloudtrace)

## Signature / Usage

Base URL: `https://cloudtrace.googleapis.com`. Methods are listed by `id`; the `Versions` line shows which API versions define the method (preferred: v2).

### `cloudtrace.projects.patchTraces`

- Versions: v1
- `PATCH https://cloudtrace.googleapis.com/v1/projects/{projectId}/traces`
- Sends trace spans to Cloud Trace. Spans cannot be updated. If the trace ID and span ID already exist, an additional copy of the span will be stored.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/trace.append`
- Request: `Traces`; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `projectId` | path | string | yes | Required. ID of the Cloud project where the trace data is stored. |

### `cloudtrace.projects.traceSinks.create`

- Versions: v2beta1
- `POST https://cloudtrace.googleapis.com/v2beta1/{+parent}/traceSinks`
- Creates a sink that exports trace spans to a destination. The export of newly-ingested traces begins immediately, unless the sink's `writer_identity` is not permitted to write to the destination. A sink can export traces only from the resource owning the sink (the 'parent').
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/trace.append`
- Request: `TraceSink`; Response: `TraceSink`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The resource in which to create the sink (currently only project sinks are supported): "projects/\[PROJECT_ID\]" Examples: `"projects/my-trace-project"`, `"projects/123456789"`. |

### `cloudtrace.projects.traceSinks.delete`

- Versions: v2beta1
- `DELETE https://cloudtrace.googleapis.com/v2beta1/{+name}`
- Deletes a sink.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/trace.append`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The full resource name of the sink to delete, including the parent resource and the sink identifier: "projects/\[PROJECT_NUMBER\]/traceSinks/\[SINK_ID\]" Example: `"projects/12345/traceSinks/my-sink-id"`. |

### `cloudtrace.projects.traceSinks.get`

- Versions: v2beta1
- `GET https://cloudtrace.googleapis.com/v2beta1/{+name}`
- Get a trace sink by name under the parent resource (GCP project).
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/trace.readonly`
- Request: —; Response: `TraceSink`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the sink: "projects/\[PROJECT_NUMBER\]/traceSinks/\[SINK_ID\]" Example: `"projects/12345/traceSinks/my-sink-id"`. |

### `cloudtrace.projects.traceSinks.list`

- Versions: v2beta1
- `GET https://cloudtrace.googleapis.com/v2beta1/{+parent}/traceSinks`
- List all sinks for the parent resource (GCP project).
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/trace.readonly`
- Request: —; Response: `ListTraceSinksResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource whose sinks are to be listed (currently only project parent resources are supported): "projects/\[PROJECT_ID\]" |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of results to return from this request. Non-positive values are ignored. The presence of `next_page_token` in the response indicates that more results might be available. |
| `pageToken` | query | string | no | Optional. If present, then retrieve the next batch of results from the preceding call to this method. `page_token` must be the value of `next_page_token` from the previous response. The values of other method parameters should be identical to those in the previous call. |

### `cloudtrace.projects.traceSinks.patch`

- Versions: v2beta1
- `PATCH https://cloudtrace.googleapis.com/v2beta1/{+name}`
- Updates a sink. This method updates fields in the existing sink according to the provided update mask. The sink's name cannot be changed nor any output-only fields (e.g. the writer_identity).
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/trace.append`
- Request: `TraceSink`; Response: `TraceSink`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The full resource name of the sink to update, including the parent resource and the sink identifier: "projects/\[PROJECT_NUMBER\]/traceSinks/\[SINK_ID\]" Example: `"projects/12345/traceSinks/my-sink-id"`. |
| `updateMask` | query | string (google-fieldmask) | yes | Required. Field mask that specifies the fields in `trace_sink` that are to be updated. A sink field is overwritten if, and only if, it is in the update mask. `name` and `writer_identity` fields cannot be updated. An empty `update_mask` is considered an error. For a detailed `FieldMask` definition, see https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#fieldmask Example: `updateMask=output_config`. |

### `cloudtrace.projects.traces.batchWrite`

- Versions: v2
- `POST https://cloudtrace.googleapis.com/v2/{+name}/traces:batchWrite`
- Batch writes new spans to new or existing traces. You cannot update existing spans. If a span ID already exists, an additional copy of the span will be stored.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/trace.append`
- Request: `BatchWriteSpansRequest`; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the project where the spans belong. The format is `projects/[PROJECT_ID]`. |

### `cloudtrace.projects.traces.get`

- Versions: v1
- `GET https://cloudtrace.googleapis.com/v1/projects/{projectId}/traces/{traceId}`
- Gets a single trace by its ID.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/trace.readonly`
- Request: —; Response: `Trace`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `projectId` | path | string | yes | Required. ID of the Cloud project where the trace data is stored. |
| `traceId` | path | string | yes | Required. ID of the trace to return. |

### `cloudtrace.projects.traces.list`

- Versions: v1
- `GET https://cloudtrace.googleapis.com/v1/projects/{projectId}/traces`
- Returns a list of traces that match the specified filter conditions.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/trace.readonly`
- Request: —; Response: `ListTracesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `projectId` | path | string | yes | Required. ID of the Cloud project where the trace data is stored. |
| `endTime` | query | string (google-datetime) | yes | Required. End of the time interval (inclusive) during which the trace data was collected from the application. |
| `filter` | query | string | no | Optional. A filter against properties of the trace. See filter syntax documentation (https://cloud.google.com/trace/docs/trace-filters) for details. |
| `orderBy` | query | string | no | Optional. Field used to sort the returned traces. Can be one of the following: \* `trace_id` \* `name` (`name` field of root span in the trace) \* `duration` (difference between `end_time` and `start_time` fields of the root span) \* `start` (`start_time` field of the root span) Descending order can be specified by appending `desc` to the sort field (for example, `name desc`). Only one sort field is permitted. |
| `pageSize` | query | integer (int32) | no | Optional. Maximum number of traces to return. If not specified or <= 0, the implementation selects a reasonable value. The implementation may return fewer traces than the requested page size. |
| `pageToken` | query | string | no | Optional. Token identifying the page of results to return. If provided, use the value of the `next_page_token` field from a previous request. |
| `startTime` | query | string (google-datetime) | yes | Required. Start of the time interval (inclusive) during which the trace data was collected from the application. |
| `view` | query | string enum | no | Optional. Type of data returned for traces in the list. Default is `MINIMAL`. Values: `VIEW_TYPE_UNSPECIFIED`, `MINIMAL`, `ROOTSPAN`, `COMPLETE`. |

### `cloudtrace.projects.traces.spans.createSpan`

- Versions: v2
- `POST https://cloudtrace.googleapis.com/v2/{+name}`
- Creates a new span. If a span ID already exists, an additional copy of the span will be stored.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/trace.append`
- Request: `Span`; Response: `Span`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. The resource name of the span in the following format: \* `projects/[PROJECT_ID]/traces/[TRACE_ID]/spans/[SPAN_ID]` `[TRACE_ID]` is a unique identifier for a trace within a project; it is a 32-character hexadecimal encoding of a 16-byte array. It should not be zero. `[SPAN_ID]` is a unique identifier for a span within a trace; it is a 16-character hexadecimal encoding of an 8-byte array. It should not be zero. . |

### Example request skeleton

Generated from the Discovery entry of `cloudtrace.projects.traceSinks.get` (not in the official docs); replace the `{...}` path variables (URL-encode query values):

```bash
curl -X GET \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  "https://cloudtrace.googleapis.com/v2beta1/{+name}"
```

## Notes

- Generated from the Discovery document(s) v2, v1, v2beta1 of `cloudtrace` (retrieved 2026-11-14). Resources on this page: projects.
- The Required column is `yes` for path variables and required parameters, and `conditional` when the description says "Required if ..." (mutually exclusive alternatives), when a `parent.child` parameter is required only inside an optional parent message or one branch of a oneof. Path variables are `yes` unless a note below names an alternative route without them.
- Message schemas (the request and response types named above) are defined in the `schemas` section of the Discovery documents in Source.
- Regional endpoints: the Discovery document (`cloudtrace` v2, revision 20260724) also lists 44 endpoints of the form `https://cloudtrace.LOCATION.rep.googleapis.com/` (Regional Endpoint), for LOCATION in `africa-south1`, `asia-east1`, `asia-east2`, `asia-northeast1`, `asia-northeast2`, `asia-northeast3`, `asia-south1`, `asia-south2`, `asia-southeast1`, `asia-southeast2`, `australia-southeast1`, `australia-southeast2`, `eu`, `europe-central2`, `europe-north1`, `europe-north2`, `europe-southwest1`, `europe-west1`, `europe-west10`, `europe-west12`, `europe-west2`, `europe-west3`, `europe-west4`, `europe-west6`, `europe-west8`, `europe-west9`, `me-central1`, `me-central2`, `me-west1`, `northamerica-northeast1`, `northamerica-northeast2`, `northamerica-south1`, `southamerica-east1`, `southamerica-west1`, `us`, `us-central1`, `us-east1`, `us-east4`, `us-east5`, `us-south1`, `us-west1`, `us-west2`, `us-west3`, `us-west4`. The method URLs above use the global host `https://cloudtrace.googleapis.com/`; to send a request through one of these endpoints, replace the host with the endpoint for the resource's location (for example `https://cloudtrace.africa-south1.rep.googleapis.com/`) and keep the path.
- Deprecated: the Cloud Trace guide says that as of February 18, 2026 export of span data to BigQuery by using Cloud Trace sinks is deprecated, that you cannot create or modify trace sinks, and that sinks used to export spans to BigQuery will be removed on or after February 18, 2027 (https://docs.cloud.google.com/trace/docs/trace-export-overview, retrieved 2026-11-18). The `traceSinks` methods are still in the v2beta1 Discovery document; use Observability Analytics instead (https://docs.cloud.google.com/trace/docs/analytics-migrate).
- Source: https://cloudtrace.googleapis.com/$discovery/rest?version=v2, https://cloudtrace.googleapis.com/$discovery/rest?version=v1, https://cloudtrace.googleapis.com/$discovery/rest?version=v2beta1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
