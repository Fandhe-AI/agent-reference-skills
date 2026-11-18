---
source: https://workflows.googleapis.com/$discovery/rest?version=v1
---

# Workflows API message schemas (workflows)

## Signature / Usage

Message types referenced by the methods listed under `references/rest/workflows/`.

### `Empty`

- A generic empty message that you can re-use to avoid defining duplicated empty messages in your APIs. A typical example is to use it as the request or the response type of an API method. For instance: service Foo { rpc Bar(google.protobuf.Empty) returns (google.protobuf.Empty); }
- Version: v1

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

### `ListWorkflowRevisionsResponse`

- Response for the ListWorkflowRevisions method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. |
| `workflows` | array<Workflow> | The revisions of the workflow, ordered in reverse chronological order. |

### `ListWorkflowsResponse`

- Response for the ListWorkflows method.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. |
| `unreachable` | array<string> | Unreachable resources. |
| `workflows` | array<Workflow> | The workflows that match the request. |

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
| `apiVersion` | string | API version used to start the operation. |
| `createTime` | string (google-datetime) | The time the operation was created. |
| `endTime` | string (google-datetime) | The time the operation finished running. |
| `target` | string | Server-defined resource path for the target of the operation. |
| `verb` | string | Name of the verb executed by the operation. |

### `StateError`

- Describes an error related to the current state of the workflow.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `details` | string | Provides specifics about the error. |
| `type` | string enum | The type of this state error. Values: `TYPE_UNSPECIFIED`, `KMS_ERROR`. |

### `Status`

- The `Status` type defines a logical error model that is suitable for different programming environments, including REST APIs and RPC APIs. It is used by gRPC (https://github.com/grpc). Each `Status` message contains three pieces of data: error code, error message, and error details. You can find out more about this error model and how to work with it in the API Design Guide (https://cloud.google.com/apis/design/errors).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `code` | integer (int32) | The status code, which should be an enum value of google.rpc.Code. |
| `details` | array<object> | A list of messages that carry the error details. There is a common set of message types for APIs to use. |
| `message` | string | A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client. |

### `Workflow`

- Workflow program to be executed by Workflows.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `allKmsKeys` | array<string> | Output only. A list of all KMS crypto keys used to encrypt or decrypt the data associated with the workflow. |
| `allKmsKeysVersions` | array<string> | Output only. A list of all KMS crypto key versions used to encrypt or decrypt the data associated with the workflow. |
| `callLogLevel` | string enum | Optional. Describes the level of platform logging to apply to calls and call responses during executions of this workflow. If both the workflow and the execution specify a logging level, the execution level takes precedence. Values: `CALL_LOG_LEVEL_UNSPECIFIED`, `LOG_ALL_CALLS`, `LOG_ERRORS_ONLY`, `LOG_NONE`. |
| `createTime` | string (google-datetime) | Output only. The timestamp for when the workflow was created. This is a workflow-wide field and is not tied to a specific revision. |
| `cryptoKeyName` | string | Optional. The resource name of a KMS crypto key used to encrypt or decrypt the data associated with the workflow. Format: projects/{project}/locations/{location}/keyRings/{keyRing}/cryptoKeys/{cryptoKey} Using `-` as a wildcard for the `{project}` or not providing one at all will infer the project from the account. If not provided, data associated with the workflow will not be CMEK-encrypted. |
| `cryptoKeyVersion` | string | Output only. The resource name of a KMS crypto key version used to encrypt or decrypt the data associated with the workflow. Format: projects/{project}/locations/{location}/keyRings/{keyRing}/cryptoKeys/{cryptoKey}/cryptoKeyVersions/{cryptoKeyVersion} |
| `description` | string | Description of the workflow provided by the user. Must be at most 1000 Unicode characters long. This is a workflow-wide field and is not tied to a specific revision. |
| `executionHistoryLevel` | string enum | Optional. Describes the execution history level to apply to this workflow. Values: `EXECUTION_HISTORY_LEVEL_UNSPECIFIED`, `EXECUTION_HISTORY_BASIC`, `EXECUTION_HISTORY_DETAILED`. |
| `labels` | object | Labels associated with this workflow. Labels can contain at most 64 entries. Keys and values can be no longer than 63 characters and can only contain lowercase letters, numeric characters, underscores, and dashes. Label keys must start with a letter. International characters are allowed. This is a workflow-wide field and is not tied to a specific revision. |
| `name` | string | The resource name of the workflow. Format: projects/{project}/locations/{location}/workflows/{workflow}. This is a workflow-wide field and is not tied to a specific revision. |
| `revisionCreateTime` | string (google-datetime) | Output only. The timestamp for the latest revision of the workflow's creation. |
| `revisionId` | string | Output only. The revision of the workflow. A new revision of a workflow is created as a result of updating the following properties of a workflow: - Service account - Workflow code to be executed The format is "000001-a4d", where the first six characters define the zero-padded revision ordinal number. They are followed by a hyphen and three hexadecimal random characters. |
| `serviceAccount` | string | The service account associated with the latest workflow version. This service account represents the identity of the workflow and determines what permissions the workflow has. Format: projects/{project}/serviceAccounts/{account} or {account} Using `-` as a wildcard for the `{project}` or not providing one at all will infer the project from the account. The `{account}` value can be the `email` address or the `unique_id` of the service account. If not provided, workflow will use the project's default service account. Modifying this field for an existing workflow results in a new workflow revision. |
| `sourceContents` | string | Workflow code to be executed. The size limit is 128KB. |
| `state` | string enum | Output only. State of the workflow deployment. Values: `STATE_UNSPECIFIED`, `ACTIVE`, `UNAVAILABLE`. |
| `stateError` | StateError | Output only. Error regarding the state of the workflow. For example, this field will have error details if the execution data is unavailable due to revoked KMS key permissions. |
| `tags` | object | Optional. Input only. Immutable. Tags associated with this workflow. |
| `updateTime` | string (google-datetime) | Output only. The timestamp for when the workflow was last updated. This is a workflow-wide field and is not tied to a specific revision. |
| `userEnvVars` | object | Optional. User-defined environment variables associated with this workflow revision. This map has a maximum length of 20. Each string can take up to 4KiB. Keys cannot be empty strings and cannot start with "GOOGLE" or "WORKFLOWS". |

### `Workflow` (v1beta)

- Workflow program to be executed by Workflows.
- Version: v1beta

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. The timestamp of when the workflow was created. |
| `description` | string | Description of the workflow provided by the user. Must be at most 1000 unicode characters long. |
| `labels` | object | Labels associated with this workflow. Labels can contain at most 64 entries. Keys and values can be no longer than 63 characters and can only contain lowercase letters, numeric characters, underscores and dashes. Label keys must start with a letter. International characters are allowed. |
| `name` | string | The resource name of the workflow. Format: projects/{project}/locations/{location}/workflows/{workflow} |
| `revisionCreateTime` | string (google-datetime) | Output only. The timestamp that the latest revision of the workflow was created. |
| `revisionId` | string | Output only. The revision of the workflow. A new revision of a workflow is created as a result of updating the following properties of a workflow: - Service account - Workflow code to be executed The format is "000001-a4d", where the first 6 characters define the zero-padded revision ordinal number. They are followed by a hyphen and 3 hexadecimal random characters. |
| `serviceAccount` | string | The service account associated with the latest workflow version. This service account represents the identity of the workflow and determines what permissions the workflow has. Format: projects/{project}/serviceAccounts/{account} or {account} Using `-` as a wildcard for the `{project}` or not providing one at all will infer the project from the account. The `{account}` value can be the `email` address or the `unique_id` of the service account. If not provided, workflow will use the project's default service account. Modifying this field for an existing workflow results in a new workflow revision. |
| `sourceContents` | string | Workflow code to be executed. The size limit is 128KB. |
| `state` | string enum | Output only. State of the workflow deployment. Values: `STATE_UNSPECIFIED`, `ACTIVE`. |
| `updateTime` | string (google-datetime) | Output only. The last update timestamp of the workflow. |

### Shape of `ListLocationsResponse`

Generated from the Discovery schema (not in the official docs); values show each field type:

```json
{
  "locations": "array<Location>",
  "nextPageToken": "string"
}
```

## Notes

- Generated from the Discovery document(s) v1, v1beta of `workflows` (retrieved 2026-11-14); a type with the same fields in several versions shows the preferred version; a type whose fields differ between versions is listed once per version (heading suffix `(version)`), and each type's `Version` line names the document it was taken from. A `$ref` resolves to the definition of the same version.
- Source: https://workflows.googleapis.com/$discovery/rest?version=v1, https://workflows.googleapis.com/$discovery/rest?version=v1beta (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
