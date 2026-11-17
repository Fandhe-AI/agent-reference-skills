---
source: https://apim.googleapis.com/$discovery/rest?version=v1alpha
---

# API Management API message schemas (apim)

## Signature / Usage

Message types referenced by the methods listed under `references/rest/apim/`.

### `ApiObservation`

- Message describing ApiObservation object
- Version: v1alpha

| Field | Type | Description |
|---|---|---|
| `apiOperationCount` | string (int64) | The number of observed API Operations. |
| `createTime` | string (google-datetime) | Create time stamp |
| `hostname` | string | The hostname of requests processed for this Observation. |
| `lastEventDetectedTime` | string (google-datetime) | Last event detected time stamp |
| `name` | string | Identifier. Name of resource |
| `serverIps` | array<string> | The IP address (IPv4 or IPv6) of the origin server that the request was sent to. This field can include port information. Examples: `"192.168.1.1"`, `"10.0.0.1:80"`, `"FE80::0202:B3FF:FE1E:8329"`. |
| `sourceLocations` | array<string> | Location of the Observation Source, for example "us-central1" or "europe-west1." |
| `style` | string enum | Style of ApiObservation Values: `STYLE_UNSPECIFIED`, `REST`, `GRPC`, `GRAPHQL`. |
| `tags` | array<string> | User-defined tags to organize and sort |
| `updateTime` | string (google-datetime) | Update time stamp |

### `ApiOperation`

- Message describing ApiOperation object
- Version: v1alpha

| Field | Type | Description |
|---|---|---|
| `count` | string (int64) | The number of occurrences of this API Operation. |
| `firstSeenTime` | string (google-datetime) | First seen time stamp |
| `httpOperation` | HttpOperation | An HTTP Operation. |
| `lastSeenTime` | string (google-datetime) | Last seen time stamp |
| `name` | string | Identifier. Name of resource |

### `BatchEditTagsApiObservationsRequest`

- Message for requesting batch edit tags for ApiObservations
- Version: v1alpha

| Field | Type | Description |
|---|---|---|
| `requests` | array<EditTagsApiObservationsRequest> | Required. The request message specifying the resources to update. A maximum of 1000 apiObservations can be modified in a batch. |

### `BatchEditTagsApiObservationsResponse`

- Message for response to edit Tags for ApiObservations
- Version: v1alpha

| Field | Type | Description |
|---|---|---|
| `apiObservations` | array<ApiObservation> | ApiObservations that were changed |

### `CancelOperationRequest`

- The request message for Operations.CancelOperation.
- Version: v1alpha

### `DisableObservationJobRequest`

- Message for disabling an ObservationJob
- Version: v1alpha

### `EditTagsApiObservationsRequest`

- Message for requesting edit tags for ApiObservation
- Version: v1alpha

| Field | Type | Description |
|---|---|---|
| `apiObservationId` | string | Required. Identifier of ApiObservation need to be edit tags Format example: "apigee.googleapis.com\|us-west1\|443" |
| `tagActions` | array<TagAction> | Required. Tag actions to be applied |

### `Empty`

- A generic empty message that you can re-use to avoid defining duplicated empty messages in your APIs. A typical example is to use it as the request or the response type of an API method. For instance: service Foo { rpc Bar(google.protobuf.Empty) returns (google.protobuf.Empty); }
- Version: v1alpha

### `EnableObservationJobRequest`

- Message for enabling an ObservationJob
- Version: v1alpha

### `Entitlement`

- Entitlement stores data related to API Observation entitlement for a given project
- Version: v1alpha

| Field | Type | Description |
|---|---|---|
| `apiObservationEntitled` | boolean | Whether API Observation is entitled. |
| `billingProjectNumber` | string (int64) | Project number of associated billing project that has Apigee and Advanced API Security entitled. |
| `createTime` | string (google-datetime) | Output only. The time of the entitlement creation. |
| `name` | string | Identifier. The entitlement resource name `projects/{project}/locations/{location}/entitlement` |
| `updateTime` | string (google-datetime) | Output only. The time of the entitlement update. |

### `GclbObservationSource`

- The GCLB observation source.
- Version: v1alpha

| Field | Type | Description |
|---|---|---|
| `pscNetworkConfigs` | array<GclbObservationSourcePscNetworkConfig> | Required. The VPC networks where traffic will be observed. All load balancers within this network will be observed. Currently, this is limited to only one network. |

### `GclbObservationSourcePscNetworkConfig`

- Network information for setting up a PSC connection.
- Version: v1alpha

| Field | Type | Description |
|---|---|---|
| `network` | string | Required. The VPC network. Format: `projects/{project_id}/global/networks/{network}` |
| `subnetwork` | string | Required. The subnetwork in the source region that will be used to connect to the Cloud Load Balancers via PSC NEGs. Must belong to `network`. Format: projects/{project_id}/regions/{region}/subnetworks/{subnet} |

### `HttpOperation`

- An HTTP-based API Operation, sometimes called a "REST" Operation.
- Version: v1alpha

| Field | Type | Description |
|---|---|---|
| `method` | string enum | HTTP Method. Values: `HTTP_METHOD_UNSPECIFIED`, `GET`, `HEAD`, `POST`, `PUT`, `PATCH`, `DELETE`, `TRACE`, `OPTIONS`, `CONNECT`. |
| `path` | string | Path of the HTTP request. |
| `pathParams` | array<HttpOperationPathParam> | Path params of HttpOperation |
| `queryParams` | object | Query params of HttpOperation |
| `request` | HttpOperationHttpRequest | Request metadata. |
| `response` | HttpOperationHttpResponse | Response metadata. |

### `HttpOperationHeader`

- An aggregation of HTTP header occurrences.
- Version: v1alpha

| Field | Type | Description |
|---|---|---|
| `count` | string (int64) | The number of occurrences of this Header across transactions. |
| `dataType` | string enum | Data type of header Values: `DATA_TYPE_UNSPECIFIED`, `BOOL`, `INTEGER`, `FLOAT`, `STRING`, `UUID`. |
| `name` | string | Header name. |

### `HttpOperationHttpRequest`

- An aggregation of HTTP requests.
- Version: v1alpha

| Field | Type | Description |
|---|---|---|
| `headers` | object | Unordered map from header name to header metadata |

### `HttpOperationHttpResponse`

- An aggregation of HTTP responses.
- Version: v1alpha

| Field | Type | Description |
|---|---|---|
| `headers` | object | Unordered map from header name to header metadata |
| `responseCodes` | object | Map of status code to observed count |

### `HttpOperationPathParam`

- HTTP Path parameter.
- Version: v1alpha

| Field | Type | Description |
|---|---|---|
| `dataType` | string enum | Data type of path param Values: `DATA_TYPE_UNSPECIFIED`, `BOOL`, `INTEGER`, `FLOAT`, `STRING`, `UUID`. |
| `position` | integer (int32) | Segment location in the path, 1-indexed |

### `HttpOperationQueryParam`

- An aggregation of HTTP query parameter occurrences.
- Version: v1alpha

| Field | Type | Description |
|---|---|---|
| `count` | string (int64) | The number of occurrences of this query parameter across transactions. |
| `dataType` | string enum | Data type of path param Values: `DATA_TYPE_UNSPECIFIED`, `BOOL`, `INTEGER`, `FLOAT`, `STRING`, `UUID`. |
| `name` | string | Name of query param |

### `ListApiObservationTagsResponse`

- Message for response to listing tags
- Version: v1alpha

| Field | Type | Description |
|---|---|---|
| `apiObservationTags` | array<string> | The tags from the specified project |
| `nextPageToken` | string | A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. |

### `ListApiObservationsResponse`

- Message for response to listing ApiObservations
- Version: v1alpha

| Field | Type | Description |
|---|---|---|
| `apiObservations` | array<ApiObservation> | The ApiObservation from the specified project and location and ObservationJobs. |
| `nextPageToken` | string | A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. |

### `ListApiOperationsResponse`

- Message for response to listing ApiOperations
- Version: v1alpha

| Field | Type | Description |
|---|---|---|
| `apiOperations` | array<ApiOperation> | The ApiOperations from the specified project and location and ObservationJob and ApiObservation. |
| `nextPageToken` | string | A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. |

### `ListLocationsResponse`

- The response message for Locations.ListLocations.
- Version: v1alpha

| Field | Type | Description |
|---|---|---|
| `locations` | array<Location> | A list of locations that matches the specified filter in the request. |
| `nextPageToken` | string | The standard List next-page token. |

### `ListObservationJobsResponse`

- Message for response to listing ObservationJobs
- Version: v1alpha

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. |
| `observationJobs` | array<ObservationJob> | The ObservationJob from the specified project and location. |
| `unreachable` | array<string> | Locations that could not be reached. |

### `ListObservationSourcesResponse`

- Message for response to listing ObservationSources
- Version: v1alpha

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. |
| `observationSources` | array<ObservationSource> | The ObservationSource from the specified project and location. |
| `unreachable` | array<string> | Locations that could not be reached. |

### `ListOperationsResponse`

- The response message for Operations.ListOperations.
- Version: v1alpha

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | The standard List next-page token. |
| `operations` | array<Operation> | A list of operations that matches the specified filter in the request. |
| `unreachable` | array<string> | Unordered list. Unreachable resources. Populated when the request sets `ListOperationsRequest.return_partial_success` and reads across collections. For example, when attempting to list all resources across all supported locations. |

### `Location`

- A resource that represents a Google Cloud location.
- Version: v1alpha

| Field | Type | Description |
|---|---|---|
| `displayName` | string | The friendly name for this location, typically a nearby city name. For example, "Tokyo". |
| `labels` | object | Cross-service attributes for the location. For example {"cloud.googleapis.com/region": "us-east1"} |
| `locationId` | string | The canonical id for this location. For example: `"us-east1"`. |
| `metadata` | object | Service-specific metadata. For example the available capacity at the given location. |
| `name` | string | Resource name for the location, which may vary between implementations. For example: `"projects/example-project/locations/us-east1"` |

### `ObservationJob`

- Message describing ObservationJob object
- Version: v1alpha

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. \[Output only\] Create time stamp |
| `name` | string | Identifier. name of resource Format: projects/{project}/locations/{location}/observationJobs/{observation_job} |
| `sources` | array<string> | Optional. These should be of the same kind of source. |
| `state` | string enum | Output only. The observation job state Values: `STATE_UNSPECIFIED`, `CREATING`, `ENABLING`, `ENABLED`, `DISABLING`, `DISABLED`, `DELETING`, `ERROR`. |
| `updateTime` | string (google-datetime) | Output only. \[Output only\] Update time stamp |

### `ObservationSource`

- Observation source configuration types
- Version: v1alpha

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. \[Output only\] Create time stamp |
| `gclbObservationSource` | GclbObservationSource | The GCLB observation source |
| `name` | string | Identifier. name of resource For MVP, each region can only have 1 source. |
| `state` | string enum | Output only. The observation source state Values: `STATE_UNSPECIFIED`, `CREATING`, `CREATED`, `DELETING`, `ERROR`. |
| `updateTime` | string (google-datetime) | Output only. \[Output only\] Update time stamp |

### `Operation`

- This resource represents a long-running operation that is the result of a network API call.
- Version: v1alpha

| Field | Type | Description |
|---|---|---|
| `done` | boolean | If the value is `false`, it means the operation is still in progress. If `true`, the operation is completed, and either `error` or `response` is available. |
| `error` | Status | The error result of the operation in case of failure or cancellation. |
| `metadata` | object | Service-specific metadata associated with the operation. It typically contains progress information and common metadata such as create time. Some services might not provide such metadata. Any method that returns a long-running operation should document the metadata type, if any. |
| `name` | string | The server-assigned name, which is only unique within the same service that originally returns it. If you use the default HTTP mapping, the `name` should be a resource name ending with `operations/{unique_id}`. |
| `response` | object | The normal, successful response of the operation. If the original method returns no data on success, such as `Delete`, the response is `google.protobuf.Empty`. If the original method is standard `Get`/`Create`/`Update`, the response should be the resource. For other methods, the response should have the type `XxxResponse`, where `Xxx` is the original method name. For example, if the original method name is `TakeSnapshot()`, the inferred response type is `TakeSnapshotResponse`. |

### `OperationMetadata`

- Represents the metadata of the long-running operation.
- Version: v1alpha

| Field | Type | Description |
|---|---|---|
| `apiVersion` | string | Output only. API version used to start the operation. |
| `createTime` | string (google-datetime) | Output only. The time the operation was created. |
| `endTime` | string (google-datetime) | Output only. The time the operation finished running. |
| `requestedCancellation` | boolean | Output only. Identifies whether the user has requested cancellation of the operation. Operations that have been cancelled successfully have Operation.error value with a google.rpc.Status.code of 1, corresponding to `Code.CANCELLED`. |
| `statusMessage` | string | Output only. Human-readable status of the operation, if any. |
| `target` | string | Output only. Server-defined resource path for the target of the operation. |
| `verb` | string | Output only. Name of the verb executed by the operation. |

### `Status`

- The `Status` type defines a logical error model that is suitable for different programming environments, including REST APIs and RPC APIs. It is used by gRPC (https://github.com/grpc). Each `Status` message contains three pieces of data: error code, error message, and error details. You can find out more about this error model and how to work with it in the API Design Guide (https://cloud.google.com/apis/design/errors).
- Version: v1alpha

| Field | Type | Description |
|---|---|---|
| `code` | integer (int32) | The status code, which should be an enum value of google.rpc.Code. |
| `details` | array<object> | A list of messages that carry the error details. There is a common set of message types for APIs to use. |
| `message` | string | A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client. |

### `TagAction`

- Message for edit tag action
- Version: v1alpha

| Field | Type | Description |
|---|---|---|
| `action` | string enum | Required. Action to be applied Values: `ACTION_UNSPECIFIED`, `ADD`, `REMOVE`. |
| `tag` | string | Required. Tag to be added or removed |

### Shape of `ApiObservation`

Generated from the Discovery schema (not in the official docs); values show each field type:

```json
{
  "apiOperationCount": "string (int64)",
  "createTime": "string (google-datetime)",
  "hostname": "string",
  "lastEventDetectedTime": "string (google-datetime)",
  "name": "string",
  "serverIps": "array<string>",
  "sourceLocations": "array<string>",
  "style": "string enum",
  "tags": "array<string>",
  "updateTime": "string (google-datetime)"
}
```

## Notes

- Generated from the Discovery document(s) v1alpha of `apim` (retrieved 2026-11-14); a type with the same fields in several versions shows the preferred version; a type whose fields differ between versions is listed once per version (heading suffix `(version)`), and each type's `Version` line names the document it was taken from. A `$ref` resolves to the definition of the same version.
- Source: https://apim.googleapis.com/$discovery/rest?version=v1alpha (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
