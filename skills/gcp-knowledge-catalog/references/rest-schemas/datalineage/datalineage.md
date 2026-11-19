---
source: https://datalineage.googleapis.com/$discovery/rest?version=v1
---

# Data Lineage API message schemas (datalineage)

## Signature / Usage

Message types referenced by the methods listed under `references/rest/datalineage/`.

### `GoogleCloudDatacatalogLineageConfigmanagementV1Config`

- Configuration for Data Lineage. Defines different configuration options for Lineage customers to control behaviour of lineage systems.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `etag` | string | Optional. `etag` is used for optimistic concurrency control as a way to help prevent simultaneous updates of a config from overwriting each other. It is required that systems make use of the `etag` in the read-modify-write cycle to perform config updates in order to avoid race conditions: An `etag` is returned in the response to `GetConfig`, and systems are expected to put that etag in the request to `UpdateConfig` to ensure that their change will be applied to the same version of the config. If an `etag` is not provided in the call to `UpdateConfig`, then the existing config, if any, will be overwritten. |
| `ingestion` | GoogleCloudDatacatalogLineageConfigmanagementV1ConfigIngestion | Optional. Ingestion rule for Data Lineage ingestion. |
| `name` | string | Identifier. The resource name of the config. Format: `organizations/{organization_id}/locations/global/config` `folders/{folder_id}/locations/global/config` `projects/{project_id}/locations/global/config` `projects/{project_number}/locations/global/config` |

### `GoogleCloudDatacatalogLineageConfigmanagementV1ConfigIngestion`

- Defines how Lineage should be ingested for a given resource.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `rules` | array<GoogleCloudDatacatalogLineageConfigmanagementV1ConfigIngestionIngestionRule> | Optional. List of rules for Data Lineage ingestion. |

### `GoogleCloudDatacatalogLineageConfigmanagementV1ConfigIngestionIngestionRule`

- Ingestion rule for Data Lineage ingestion.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `integrationSelector` | GoogleCloudDatacatalogLineageConfigmanagementV1ConfigIngestionIngestionRuleIntegrationSelector | Required. Integration selector of the rule. The rule is only applied to the Integration selected by the selector. |
| `lineageEnablement` | GoogleCloudDatacatalogLineageConfigmanagementV1ConfigIngestionIngestionRuleLineageEnablement | Required. Lineage enablement configuration. Defines configurations for the ingestion of lineage for the resource and its children. If unspecified, the ingestion will be enabled only if it was configured in the resource's parent. |

### `GoogleCloudDatacatalogLineageConfigmanagementV1ConfigIngestionIngestionRuleIntegrationSelector`

- Integration selector of the rule. The rule is only applied to the Integration selected by the selector.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `integration` | string enum | Required. Integration to which the rule applies. This field can be used to specify the integration against which the ingestion rule should be applied. Values: `INTEGRATION_UNSPECIFIED`, `BIGQUERY`, `DATAPROC`, `LOOKER_CORE`, `MANAGED_AIRFLOW`. |

### `GoogleCloudDatacatalogLineageConfigmanagementV1ConfigIngestionIngestionRuleLineageEnablement`

- Lineage enablement configuration. Defines configurations for the ingestion of lineage for the resource and its children.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `enabled` | boolean | Optional. If true, ingestion of lineage should be enabled. If false, it should be disabled. If unspecified, the system default value is used. |

### `GoogleCloudDatacatalogLineageV1BatchSearchLinkProcessesRequest`

- Request message for BatchSearchLinkProcesses.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `links` | array<string> | Required. An array of links to check for their associated LineageProcesses. The maximum number of items in this array is 100. If the request contains more than 100 links, it returns the `INVALID_ARGUMENT` error. Format: `projects/{project}/locations/{location}/links/{link}`. |
| `pageSize` | integer (int32) | Optional. The maximum number of processes to return in a single page of the response. A page may contain fewer results than this value. |
| `pageToken` | string | Optional. The page token received from a previous `BatchSearchLinkProcesses` call. Use it to get the next page. When requesting subsequent pages of a response, remember that all parameters must match the values you provided in the original request. |

### `GoogleCloudDatacatalogLineageV1BatchSearchLinkProcessesResponse`

- Response message for BatchSearchLinkProcesses.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | The token to specify as `page_token` in the subsequent call to get the next page. Omitted if there are no more pages in the response. |
| `processLinks` | array<GoogleCloudDatacatalogLineageV1ProcessLinks> | An array of processes associated with the specified links. |

### `GoogleCloudDatacatalogLineageV1DependencyInfo`

- Dependency info describes how one entity depends on another.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `dependencyType` | string enum | Required. Type of dependency. Values: `DEPENDENCY_TYPE_UNSPECIFIED`, `EXACT_COPY`, `OTHER`. |

### `GoogleCloudDatacatalogLineageV1EntityReference`

- The soft reference to everything you can attach a lineage event to.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `field` | array<string> | Optional. Field path within the entity. Each nesting level should be a separate value in the repeated field. The order matters. Must be empty for asset level lineage For example to address "salary.net" subfield where "salary" is a column and "net" is a proto field two values in the `field` should be reported, the first is "salary" and the second is "net". Each field length is limited to 500 characters. Maximum supported nesting level is 20. |
| `fullyQualifiedName` | string | Required. Fully Qualified Name (FQN) (https://cloud.google.com/dataplex/docs/fully-qualified-names) of the entity. |

### `GoogleCloudDatacatalogLineageV1EventLink`

- A lineage between source and target entities.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `dependencyInfo` | GoogleCloudDatacatalogLineageV1DependencyInfo | Optional. Describes how the target depends on the source. |
| `source` | GoogleCloudDatacatalogLineageV1EntityReference | Required. Reference to the source entity |
| `target` | GoogleCloudDatacatalogLineageV1EntityReference | Required. Reference to the target entity |

### `GoogleCloudDatacatalogLineageV1LineageEvent`

- A lineage event represents an operation on assets. Within the operation, the data flows from the source to the target defined in the links field.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `endTime` | string (google-datetime) | Optional. The end of the transformation which resulted in this lineage event. For streaming scenarios, it should be the end of the period from which the lineage is being reported. |
| `links` | array<GoogleCloudDatacatalogLineageV1EventLink> | Optional. List of source-target pairs. Can't contain more than 100 tuples. |
| `name` | string | Immutable. The resource name of the lineage event. Format: `projects/{project}/locations/{location}/processes/{process}/runs/{run}/lineageEvents/{lineage_event}`. Can be specified or auto-assigned. {lineage_event} must be not longer than 200 characters and only contain characters in a set: `a-zA-Z0-9_-:.` |
| `startTime` | string (google-datetime) | Required. The beginning of the transformation which resulted in this lineage event. For streaming scenarios, it should be the beginning of the period from which the lineage is being reported. |

### `GoogleCloudDatacatalogLineageV1LineageLink`

- Lineage link between two entities.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `dependencyInfo` | array<GoogleCloudDatacatalogLineageV1LineageLinkDependencyInfo> | Describes how the target entity is dependent on the source entity. |
| `depth` | integer (int32) | Depth of the current link in the graph starting from 1. |
| `location` | string | The location where the LineageEvent that created the link is stored. |
| `processes` | array<GoogleCloudDatacatalogLineageV1LineageLinkLineageProcess> | Processes metadata associated with the link. |
| `source` | GoogleCloudDatacatalogLineageV1EntityReference | The entity that is the \*\*source\*\* of this link. |
| `target` | GoogleCloudDatacatalogLineageV1EntityReference | The entity that is the \*\*target\*\* of this link. |

### `GoogleCloudDatacatalogLineageV1LineageLinkDependencyInfo`

- Dependency info describes how one entity is dependent on another.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `dependencyType` | string enum | The type of dependency. Values: `DEPENDENCY_TYPE_UNSPECIFIED`, `EXACT_COPY`, `OTHER`. |

### `GoogleCloudDatacatalogLineageV1LineageLinkLineageProcess`

- Process metadata for the link.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `process` | GoogleCloudDatacatalogLineageV1Process | Process that created the link. |

### `GoogleCloudDatacatalogLineageV1Link`

- Links represent the data flow between \*\*source\*\* (upstream) and \*\*target\*\* (downstream) assets in transformation pipelines. Links are created when LineageEvents record data transformation between related assets.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `dependencyInfo` | array<GoogleCloudDatacatalogLineageV1LinkDependencyInfo> | Optional. The dependency info of the link (applies only to column level links). |
| `endTime` | string (google-datetime) | The end of the last event establishing this link. |
| `name` | string | Output only. Immutable. The name of the link. Format: `projects/{project}/locations/{location}/links/{link}`. |
| `source` | GoogleCloudDatacatalogLineageV1EntityReference | The pointer to the entity that is the \*\*source\*\* of this link. |
| `startTime` | string (google-datetime) | The start of the first event establishing this link. |
| `target` | GoogleCloudDatacatalogLineageV1EntityReference | The pointer to the entity that is the \*\*target\*\* of this link. |

### `GoogleCloudDatacatalogLineageV1LinkDependencyInfo`

- Dependency info describes how one entity depends on another.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `dependencyType` | string enum | The type of dependency. Values: `DEPENDENCY_TYPE_UNSPECIFIED`, `EXACT_COPY`, `OTHER`. |

### `GoogleCloudDatacatalogLineageV1ListLineageEventsResponse`

- Response message for ListLineageEvents.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `lineageEvents` | array<GoogleCloudDatacatalogLineageV1LineageEvent> | Lineage events from the specified project and location. |
| `nextPageToken` | string | The token to specify as `page_token` in the next call to get the next page. If this field is omitted, there are no subsequent pages. |

### `GoogleCloudDatacatalogLineageV1ListProcessesResponse`

- Response message for ListProcesses.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | The token to specify as `page_token` in the next call to get the next page. If this field is omitted, there are no subsequent pages. |
| `processes` | array<GoogleCloudDatacatalogLineageV1Process> | The processes from the specified project and location. |

### `GoogleCloudDatacatalogLineageV1ListRunsResponse`

- Response message for ListRuns.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | The token to specify as `page_token` in the next call to get the next page. If this field is omitted, there are no subsequent pages. |
| `runs` | array<GoogleCloudDatacatalogLineageV1Run> | The runs from the specified project and location. |

### `GoogleCloudDatacatalogLineageV1MultipleEntityReference`

- Multiple entity reference for SearchLinksRequest.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `entities` | array<GoogleCloudDatacatalogLineageV1EntityReference> | Optional. The list of entities to search for links. The maximum number of entities is 20. |

### `GoogleCloudDatacatalogLineageV1OperationMetadata`

- Metadata describing the operation.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. The timestamp of the operation submission to the server. |
| `endTime` | string (google-datetime) | Output only. The timestamp of the operation termination, regardless of its success. This field is unset if the operation is still ongoing. |
| `operationType` | string enum | Output only. The type of the operation being performed. Values: `TYPE_UNSPECIFIED`, `DELETE`, `CREATE`. |
| `resource` | string | Output only. The \[relative name\] (https://cloud.google.com//apis/design/resource_names#relative_resource_name) of the resource being operated on. |
| `resourceUuid` | string | Output only. The UUID of the resource being operated on. |
| `state` | string enum | Output only. The current operation state. Values: `STATE_UNSPECIFIED`, `PENDING`, `RUNNING`, `SUCCEEDED`, `FAILED`. |

### `GoogleCloudDatacatalogLineageV1Origin`

- Origin of a process.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `name` | string | If the source_type isn't CUSTOM, the value of this field should be a Google Cloud resource name of the system, which reports lineage. The project and location parts of the resource name must match the project and location of the lineage resource being created. Examples: - `{source_type: COMPOSER, name: "projects/foo/locations/us/environments/bar"}` - `{source_type: BIGQUERY, name: "projects/foo/locations/eu"}` - `{source_type: CUSTOM, name: "myCustomIntegration"}` |
| `sourceType` | string enum | Type of the source. Use of a source_type other than `CUSTOM` for process creation or updating is highly discouraged. It might be restricted in the future without notice. There will be increase in cost if you use any of the source types other than `CUSTOM`. Values: `SOURCE_TYPE_UNSPECIFIED`, `CUSTOM`, `BIGQUERY`, `DATA_FUSION`, `COMPOSER`, `LOOKER_STUDIO`, `DATAPROC`, `VERTEX_AI`, `DATAFLOW`, `LOOKER_CORE`. |

### `GoogleCloudDatacatalogLineageV1Process`

- A process is the definition of a data transformation operation.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `attributes` | object | Optional. The attributes of the process. Should only be used for the purpose of non-semantic management (classifying, describing or labeling the process). Up to 100 attributes are allowed. |
| `displayName` | string | Optional. A human-readable name you can set to display in a user interface. Must be not longer than 200 characters and only contain UTF-8 letters or numbers, spaces or characters like `_-:&.` |
| `name` | string | Immutable. The resource name of the lineage process. Format: `projects/{project}/locations/{location}/processes/{process}`. Can be specified or auto-assigned. {process} must be not longer than 200 characters and only contain characters in a set: `a-zA-Z0-9_-:.` |
| `origin` | GoogleCloudDatacatalogLineageV1Origin | Optional. The origin of this process and its runs and lineage events. |

### `GoogleCloudDatacatalogLineageV1ProcessLinkInfo`

- Link details.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `endTime` | string (google-datetime) | The end of the last event establishing this link-process tuple. |
| `link` | string | The name of the link in the format of `projects/{project}/locations/{location}/links/{link}`. |
| `startTime` | string (google-datetime) | The start of the first event establishing this link-process tuple. |

### `GoogleCloudDatacatalogLineageV1ProcessLinks`

- Links associated with a specific process.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `links` | array<GoogleCloudDatacatalogLineageV1ProcessLinkInfo> | An array containing link details objects of the links provided in the original request. A single process can result in creating multiple links. If any of the links you provide in the request are created by the same process, they all are included in this array. |
| `process` | string | The process name in the format of `projects/{project}/locations/{location}/processes/{process}`. |

### `GoogleCloudDatacatalogLineageV1ProcessOpenLineageRunEventResponse`

- Response message for ProcessOpenLineageRunEvent.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `lineageEvents` | array<string> | Created lineage event names. Format: `projects/{project}/locations/{location}/processes/{process}/runs/{run}/lineageEvents/{lineage_event}`. |
| `process` | string | Created process name. Format: `projects/{project}/locations/{location}/processes/{process}`. |
| `run` | string | Created run name. Format: `projects/{project}/locations/{location}/processes/{process}/runs/{run}`. |

### `GoogleCloudDatacatalogLineageV1Run`

- A lineage run represents an execution of a process that creates lineage events.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `attributes` | object | Optional. The attributes of the run. Should only be used for the purpose of non-semantic management (classifying, describing or labeling the run). Up to 100 attributes are allowed. |
| `displayName` | string | Optional. A human-readable name you can set to display in a user interface. Must be not longer than 200 characters and only contain UTF-8 letters or numbers, spaces or characters like `_-:&.` |
| `endTime` | string (google-datetime) | Optional. The timestamp of the end of the run. |
| `name` | string | Immutable. The resource name of the run. Format: `projects/{project}/locations/{location}/processes/{process}/runs/{run}`. Can be specified or auto-assigned. {run} must be not longer than 200 characters and only contain characters in a set: `a-zA-Z0-9_-:.` |
| `startTime` | string (google-datetime) | Required. The timestamp of the start of the run. |
| `state` | string enum | Required. The state of the run. Values: `UNKNOWN`, `STARTED`, `COMPLETED`, `FAILED`, `ABORTED`. |

### `GoogleCloudDatacatalogLineageV1SearchLineageStreamingRequest`

- Request message for SearchLineageStreaming.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `direction` | string enum | Required. Direction of the search. Values: `SEARCH_DIRECTION_UNSPECIFIED`, `DOWNSTREAM`, `UPSTREAM`. |
| `filters` | GoogleCloudDatacatalogLineageV1SearchLineageStreamingRequestSearchFilters | Optional. Filters for the search. |
| `limits` | GoogleCloudDatacatalogLineageV1SearchLineageStreamingRequestSearchLimits | Optional. Limits for the search. |
| `locations` | array<string> | Required. The locations to search in. This list should contain the location from the `parent` field. |
| `rootCriteria` | GoogleCloudDatacatalogLineageV1SearchLineageStreamingRequestRootCriteria | Required. Criteria for the root of the search. |

### `GoogleCloudDatacatalogLineageV1SearchLineageStreamingRequestRootCriteria`

- Criteria for the root of the search.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `entities` | GoogleCloudDatacatalogLineageV1MultipleEntityReference | Optional. The entities to initiate the search from. Entities can be specified by FQN only, or by FQN and field. To search by FQN and all available fields for that FQN, use the wildcard `*` as the field value. |

### `GoogleCloudDatacatalogLineageV1SearchLineageStreamingRequestSearchFilters`

- Filters for the search.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `dependencyTypes` | array<string> | Optional. Types of dependencies between entities to retrieve. If unspecified, all dependency types are returned. Values: `DEPENDENCY_TYPE_UNSPECIFIED`, `EXACT_COPY`, `OTHER`. |
| `entitySet` | string enum | Optional. Entity set restriction. If unspecified, the method returns all entities. Values: `ENTITY_SET_UNSPECIFIED`, `ENTITIES`. |
| `projects` | array<string> | Optional. Projects to restrict lineage links to. Callers can provide project IDs (for example, `projects/my-project`) or project numbers (for example, `projects/123456789`). If unspecified, lineage is returned from all projects. |
| `timeRange` | GoogleTypeInterval | Optional. Time interval to search for lineage. If unspecified, all lineage is returned. Currently, at most one of `start_time` and `end_time` can be set. |

### `GoogleCloudDatacatalogLineageV1SearchLineageStreamingRequestSearchLimits`

- Limits for the search results.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `maxDepth` | integer (int32) | Optional. The maximum depth of the search. The default value is 5 and maximum value is 100. |
| `maxProcessPerLink` | integer (int32) | Optional. The maximum number of processes to return per link. The default value is 0 and the maximum value is 100. If this value is non-zero, the response will contain process names for the links. To retrieve full process details in the response, include `links.processes.process` in the FieldMask (https://developers.google.com/workspace/docs/api/how-tos/field-masks#read_with_a_field_mask). |
| `maxResults` | integer (int32) | Optional. The maximum number of links to return in the response. The default value is 1_000 and the maximum value is 10_000. |

### `GoogleCloudDatacatalogLineageV1SearchLineageStreamingResponse`

- Response message for SearchLineageStreaming.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `links` | array<GoogleCloudDatacatalogLineageV1LineageLink> | Output only. The lineage links that match the search criteria. Can be empty if no links match. |
| `unreachable` | array<string> | Unordered list. Unreachable resources. If non-empty, the result set might be incomplete. Currently, only locations are supported. Format: `projects/[PROJECT_NUMBER]/locations/[LOCATION]` Example: projects/123456789/locations/us-east1 |

### `GoogleCloudDatacatalogLineageV1SearchLinksRequest`

- Request message for SearchLinks.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `pageSize` | integer (int32) | Optional. The maximum number of links to return in a single page of the response. A page may contain fewer links than this value. If unspecified, at most 10 links are returned. Maximum value is 100; values greater than 100 are reduced to 100. |
| `pageToken` | string | Optional. The page token received from a previous `SearchLinksRequest` call. Use it to get the next page. When requesting subsequent pages of a response, remember that all parameters must match the values you provided in the original request. |
| `source` | GoogleCloudDatacatalogLineageV1EntityReference | Optional. Send asset information in the \*\*source\*\* field to retrieve all links that lead from the specified asset to downstream assets. |
| `sources` | GoogleCloudDatacatalogLineageV1MultipleEntityReference | Optional. Send a list of asset information in the \*\*sources\*\* field to retrieve all links that lead from the specified assets to downstream assets. This field is similar to the `source` source field but allows providing multiple entities. All entities within the `MultipleEntityReference` must have the same `fully_qualified_name`. |
| `target` | GoogleCloudDatacatalogLineageV1EntityReference | Optional. Send asset information in the \*\*target\*\* field to retrieve all links that lead from upstream assets to the specified asset. |
| `targets` | GoogleCloudDatacatalogLineageV1MultipleEntityReference | Optional. Send a list of asset information in the \*\*targets\*\* field to retrieve all links that lead from upstream assets to the specified assets. This field is similar to the `target` target field but allows providing multiple entities. All entities within the `MultipleEntityReference` must have the same `fully_qualified_name`. |

### `GoogleCloudDatacatalogLineageV1SearchLinksResponse`

- Response message for SearchLinks.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `links` | array<GoogleCloudDatacatalogLineageV1Link> | The list of links for a given asset. Can be empty if the asset has no relations of requested type (source or target). |
| `nextPageToken` | string | The token to specify as `page_token` in the subsequent call to get the next page. Omitted if there are no more pages in the response. |

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
| `error` | GoogleRpcStatus | The error result of the operation in case of failure or cancellation. |
| `metadata` | object | Service-specific metadata associated with the operation. It typically contains progress information and common metadata such as create time. Some services might not provide such metadata. Any method that returns a long-running operation should document the metadata type, if any. |
| `name` | string | The server-assigned name, which is only unique within the same service that originally returns it. If you use the default HTTP mapping, the `name` should be a resource name ending with `operations/{unique_id}`. |
| `response` | object | The normal, successful response of the operation. If the original method returns no data on success, such as `Delete`, the response is `google.protobuf.Empty`. If the original method is standard `Get`/`Create`/`Update`, the response should be the resource. For other methods, the response should have the type `XxxResponse`, where `Xxx` is the original method name. For example, if the original method name is `TakeSnapshot()`, the inferred response type is `TakeSnapshotResponse`. |

### `GoogleProtobufEmpty`

- A generic empty message that you can re-use to avoid defining duplicated empty messages in your APIs. A typical example is to use it as the request or the response type of an API method. For instance: service Foo { rpc Bar(google.protobuf.Empty) returns (google.protobuf.Empty); }
- Version: v1

### `GoogleRpcStatus`

- The `Status` type defines a logical error model that is suitable for different programming environments, including REST APIs and RPC APIs. It is used by gRPC (https://github.com/grpc). Each `Status` message contains three pieces of data: error code, error message, and error details. You can find out more about this error model and how to work with it in the API Design Guide (https://cloud.google.com/apis/design/errors).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `code` | integer (int32) | The status code, which should be an enum value of google.rpc.Code. |
| `details` | array<object> | A list of messages that carry the error details. There is a common set of message types for APIs to use. |
| `message` | string | A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client. |

### `GoogleTypeInterval`

- Represents a time interval, encoded as a Timestamp start (inclusive) and a Timestamp end (exclusive). The start must be less than or equal to the end. When the start equals the end, the interval is empty (matches no time). When both start and end are unspecified, the interval matches any time.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `endTime` | string (google-datetime) | Optional. Exclusive end of the interval. If specified, a Timestamp matching this interval will have to be before the end. |
| `startTime` | string (google-datetime) | Optional. Inclusive start of the interval. If specified, a Timestamp matching this interval will have to be the same or after the start. |

### Shape of `GoogleCloudDatacatalogLineageConfigmanagementV1Config`

Generated from the Discovery schema (not in the official docs); values show each field type:

```json
{
  "etag": "string",
  "ingestion": "GoogleCloudDatacatalogLineageConfigmanagementV1ConfigIngestion",
  "name": "string"
}
```

## Notes

- Generated from the Discovery document(s) v1 of `datalineage` (retrieved 2026-11-14); a type with the same fields in several versions shows the preferred version; a type whose fields differ between versions is listed once per version (heading suffix `(version)`), and each type's `Version` line names the document it was taken from. A `$ref` resolves to the definition of the same version.
- Descriptions are verbatim from Discovery, which drops angle-bracket placeholders of the source comments: a format such as `projects//locations/global` stands for `projects/{project}/locations/global` (likewise `"@.iam.gserviceaccount.com"` lost the account ID before `@`, and a name format ending in a collection such as `projects/*/locations/*/registrations/` lost its last ID), and an expression such as `... && in labels` lost its left operand (for example `'label_value' in labels`). Check the method or field in the product's REST reference before relying on such a format.
- Source: https://datalineage.googleapis.com/$discovery/rest?version=v1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
