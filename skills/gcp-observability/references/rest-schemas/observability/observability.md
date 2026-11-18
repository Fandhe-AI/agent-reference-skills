---
source: https://observability.googleapis.com/$discovery/rest?version=v1
---

# Observability API message schemas (observability)

## Signature / Usage

Message types referenced by the methods listed under `references/rest/observability/`.

### `Bucket`

- Bucket configuration for storing observability data.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `cmekSettings` | CmekSettings | Optional. Settings for configuring CMEK on a bucket. |
| `createTime` | string (google-datetime) | Output only. Create timestamp. |
| `deleteTime` | string (google-datetime) | Output only. Delete timestamp. |
| `description` | string | Optional. Description of the bucket. |
| `displayName` | string | Optional. User friendly display name. |
| `name` | string | Identifier. Name of the bucket. The format is: projects/\[PROJECT_ID\]/locations/\[LOCATION\]/buckets/\[BUCKET_ID\] |
| `purgeTime` | string (google-datetime) | Output only. Timestamp when the bucket in soft-deleted state is purged. |
| `updateTime` | string (google-datetime) | Output only. Update timestamp. |

### `CancelOperationRequest`

- The request message for Operations.CancelOperation.
- Version: v1

### `CmekSettings`

- Settings for configuring CMEK for a bucket.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `kmsKey` | string | Optional. The resource name for the configured Cloud KMS key. The format is: projects/\[PROJECT_ID\]/locations/\[LOCATION\]/keyRings/\[KEYRING\]/cryptoKeys/\[KEY\] For example: projects/my-project/locations/us-central1/keyRings/my-ring/cryptoKeys/my-key |
| `kmsKeyVersion` | string | Output only. The CryptoKeyVersion resource name for the configured Cloud KMS key. The format is: projects/\[PROJECT_ID\]/locations/\[LOCATION\]/keyRings/\[KEYRING\]/cryptoKeys/\[KEY\]/cryptoKeyVersions/\[VERSION\] For example: projects/my-project/locations/us-central1/keyRings/my-ring/cryptoKeys/my-key/cryptoKeyVersions/1 This read-only field is used to convey the specific configured CryptoKeyVersion of the `kms_key` that has been configured. It is populated when the CMEK settings are bound to a single key version. |
| `serviceAccountId` | string | Output only. The service account used to access the key. |

### `Dataset`

- A dataset is a collection of data that has a specific configuration. A dataset can be backed by multiple tables. One bucket can have multiple datasets.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. Create timestamp. |
| `deleteTime` | string (google-datetime) | Output only. Delete timestamp. |
| `description` | string | Optional. Description of the dataset. |
| `displayName` | string | Optional. User friendly display name. |
| `name` | string | Identifier. Name of the dataset. The format is: projects/\[PROJECT_ID\]/locations/\[LOCATION\]/buckets/\[BUCKET_ID\]/datasets/\[DATASET_ID\] |
| `purgeTime` | string (google-datetime) | Output only. Timestamp when the dataset in soft-deleted state is purged. |

### `Empty`

- A generic empty message that you can re-use to avoid defining duplicated empty messages in your APIs. A typical example is to use it as the request or the response type of an API method. For instance: service Foo { rpc Bar(google.protobuf.Empty) returns (google.protobuf.Empty); }
- Version: v1

### `Link`

- A link lets a dataset be accessible to BigQuery via usage of linked datasets.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. Create timestamp. |
| `description` | string | Optional. Description of the link. |
| `displayName` | string | Optional. A user friendly display name. |
| `name` | string | Identifier. Name of the link. The format is: projects/\[PROJECT_ID\]/locations/\[LOCATION\]/buckets/\[BUCKET_ID\]/datasets/\[DATASET_ID\]/links/\[LINK_ID\] |

### `ListBucketsResponse`

- Response for listing buckets.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `buckets` | array<Bucket> | Optional. The list of buckets. |
| `nextPageToken` | string | Optional. A token that can be sent as `page_token` to retrieve the next page. When this field is omitted, there are no subsequent pages. |

### `ListDatasetsResponse`

- Response for listing datasets.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `datasets` | array<Dataset> | The list of datasets. |
| `nextPageToken` | string | A token that can be sent as `page_token` to retrieve the next page. When this field is omitted, there are no subsequent pages. |

### `ListLinksResponse`

- Response for listing links.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `links` | array<Link> | The list of links. |
| `nextPageToken` | string | Optional. A token that can be sent as `page_token` to retrieve the next page. When this field is omitted, there are no subsequent pages. |

### `ListLocationsResponse`

- The response message for Locations.ListLocations.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `locations` | array<Location> | A list of locations that matches the specified filter in the request. |
| `nextPageToken` | string | The standard List next-page token. |

### `ListOperationsResponse`

- The response message for Operations.ListOperations.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | The standard List next-page token. |
| `operations` | array<Operation> | A list of operations that matches the specified filter in the request. |
| `unreachable` | array<string> | Unordered list. Unreachable resources. Populated when the request sets `ListOperationsRequest.return_partial_success` and reads across collections. For example, when attempting to list all resources across all supported locations. |

### `ListTraceScopesResponse`

- Response for listing TraceScopes.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | Optional. If there might be more results than appear in this response, then `next_page_token` is included. To get the next set of results, call the same method again using the value of `next_page_token` as `page_token`. |
| `traceScopes` | array<TraceScope> | Optional. A list of trace scopes. |

### `ListViewsResponse`

- Response for listing views.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | Optional. A token that can be sent as `page_token` to retrieve the next page. When this field is omitted, there are no subsequent pages. |
| `views` | array<View> | The list of views. |

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

### `Operation`

- This resource represents a long-running operation that is the result of a network API call.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `done` | boolean | If the value is `false`, it means the operation is still in progress. If `true`, the operation is completed, and either `error` or `response` is available. |
| `error` | Status | The error result of the operation in case of failure or cancellation. |
| `metadata` | object | Service-specific metadata associated with the operation. It typically contains progress information and common metadata such as create time. Some services might not provide such metadata. Any method that returns a long-running operation should document the metadata type, if any. |
| `name` | string | The server-assigned name, which is only unique within the same service that originally returns it. If you use the default HTTP mapping, the `name` should be a resource name ending with `operations/{unique_id}`. |
| `response` | object | The normal, successful response of the operation. If the original method returns no data on success, such as `Delete`, the response is `google.protobuf.Empty`. If the original method is standard `Get`/`Create`/`Update`, the response should be the resource. For other methods, the response should have the type `XxxResponse`, where `Xxx` is the original method name. For example, if the original method name is `TakeSnapshot()`, the inferred response type is `TakeSnapshotResponse`. |

### `OperationMetadata`

- Represents the metadata of the long-running operation.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `apiVersion` | string | Output only. API version used to start the operation. |
| `createTime` | string (google-datetime) | Output only. The time the operation was created. |
| `endTime` | string (google-datetime) | Output only. The time the operation finished running. |
| `requestedCancellation` | boolean | Output only. Identifies whether the user has requested cancellation of the operation. Operations that have been cancelled successfully have Operation.error value with a google.rpc.Status.code of 1, corresponding to `Code.CANCELLED`. |
| `statusMessage` | string | Output only. Human-readable status of the operation, if any. |
| `target` | string | Output only. Server-defined resource path for the target of the operation. |
| `verb` | string | Output only. Name of the verb executed by the operation. |

### `ReprovisionBucketRequest`

- Request for reprovisioning a bucket, replaces configuration with that of the configured Observability settings.
- Version: v1

### `Scope`

- Message describing Scope object
- Version: v1

| Field | Type | Description |
|---|---|---|
| `logScope` | string | Required. The full resource name of the `logging.googleapis.com/LogScope`. For example: //logging.googleapis.com/projects/myproject/locations/global/logScopes/my-log-scope |
| `name` | string | Identifier. Name of the resource. The format is: projects/{project}/locations/{location}/scopes/{scope} The `{location}` field must be set to `global`. The `{scope}` field must be set to `_Default`. |
| `traceScope` | string | Required. The unqualified resource name of the `cloudtrace.googleapis.com/TraceScope`. For example: projects/myproject/locations/global/traceScopes/my-trace-scope |
| `updateTime` | string (google-datetime) | Output only. Update timestamp. Note: The Update timestamp for the default scope is initially unset. |

### `Settings`

- Describes the settings associated with a project, organization, or folder.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `defaultStorageLocation` | string | Optional. The location which should be used when any regional resources are provisioned by Google Cloud. |
| `kmsKeyName` | string | Optional. The resource name for the configured Cloud KMS key. KMS key name format: "projects/\[PROJECT_ID\]/locations/\[LOCATION\]/keyRings/\[KEYRING\]/cryptoKeys/\[KEY\]" For example: `"projects/my-project/locations/us-central1/keyRings/my-ring/cryptoKeys/my-key"` |
| `name` | string | Identifier. The resource name of the settings. |
| `serviceAccountId` | string | Output only. The service account for the given resource container, such as project or folder. This will be used by Cloud Observability to perform actions in the container's project like access KMS keys or create Links. Always the same service account per resource container regardless of region. |

### `Status`

- The `Status` type defines a logical error model that is suitable for different programming environments, including REST APIs and RPC APIs. It is used by gRPC (https://github.com/grpc). Each `Status` message contains three pieces of data: error code, error message, and error details. You can find out more about this error model and how to work with it in the API Design Guide (https://cloud.google.com/apis/design/errors).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `code` | integer (int32) | The status code, which should be an enum value of google.rpc.Code. |
| `details` | array<object> | A list of messages that carry the error details. There is a common set of message types for APIs to use. |
| `message` | string | A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client. |

### `TraceScope`

- A trace scope is a collection of resources whose traces are queried together.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. The creation timestamp of the trace scope. |
| `description` | string | Optional. Describes this trace scope. The maximum length of the description is 8000 characters. |
| `name` | string | Identifier. The resource name of the trace scope. For example: projects/my-project/locations/global/traceScopes/my-trace-scope |
| `resourceNames` | array<string> | Required. Names of the projects that are included in this trace scope. \* `projects/[PROJECT_ID]` A trace scope can include a maximum of 20 projects. |
| `updateTime` | string (google-datetime) | Output only. The last update timestamp of the trace scope. |

### `View`

- A view corresponds to a read-only representation of a subset of the data in a dataset.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. Create timestamp. |
| `description` | string | Optional. Description of the view. |
| `displayName` | string | Optional. User friendly display name. |
| `name` | string | Identifier. Name of the view. The format is: projects/\[PROJECT_ID\]/locations/\[LOCATION\]/buckets/\[BUCKET_ID\]/datasets/\[DATASET_ID\]/views/\[VIEW_ID\] |
| `updateTime` | string (google-datetime) | Output only. Update timestamp. |

### Shape of `Bucket`

Generated from the Discovery schema (not in the official docs); values show each field type:

```json
{
  "cmekSettings": "CmekSettings",
  "createTime": "string (google-datetime)",
  "deleteTime": "string (google-datetime)",
  "description": "string",
  "displayName": "string",
  "name": "string",
  "purgeTime": "string (google-datetime)",
  "updateTime": "string (google-datetime)"
}
```

## Notes

- Generated from the Discovery document(s) v1 of `observability` (retrieved 2026-11-14); a type with the same fields in several versions shows the preferred version; a type whose fields differ between versions is listed once per version (heading suffix `(version)`), and each type's `Version` line names the document it was taken from. A `$ref` resolves to the definition of the same version.
- Source: https://observability.googleapis.com/$discovery/rest?version=v1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
