---
source: https://ids.googleapis.com/$discovery/rest?version=v1
---

# Cloud IDS API message schemas (ids)

## Signature / Usage

Message types referenced by the methods listed under `references/rest/ids/`.

### `CancelOperationRequest`

- The request message for Operations.CancelOperation.
- Version: v1

### `Empty`

- A generic empty message that you can re-use to avoid defining duplicated empty messages in your APIs. A typical example is to use it as the request or the response type of an API method. For instance: service Foo { rpc Bar(google.protobuf.Empty) returns (google.protobuf.Empty); }
- Version: v1

### `Endpoint`

- Endpoint describes a single IDS endpoint. It defines a forwarding rule to which packets can be sent for IDS inspection.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. The create time timestamp. |
| `description` | string | User-provided description of the endpoint |
| `endpointForwardingRule` | string | Output only. The fully qualified URL of the endpoint's ILB Forwarding Rule. |
| `endpointIp` | string | Output only. The IP address of the IDS Endpoint's ILB. |
| `labels` | object | The labels of the endpoint. |
| `name` | string | Output only. The name of the endpoint. |
| `network` | string | Required. The fully qualified URL of the network to which the IDS Endpoint is attached. |
| `satisfiesPzi` | boolean | Output only. \[Output Only\] Reserved for future use. |
| `satisfiesPzs` | boolean | Output only. \[Output Only\] Reserved for future use. |
| `severity` | string enum | Required. Lowest threat severity that this endpoint will alert on. Values: `SEVERITY_UNSPECIFIED`, `INFORMATIONAL`, `LOW`, `MEDIUM`, `HIGH`, `CRITICAL`. |
| `state` | string enum | Output only. Current state of the endpoint. Values: `STATE_UNSPECIFIED`, `CREATING`, `READY`, `DELETING`, `UPDATING`. |
| `threatExceptions` | array<string> | List of threat IDs to be excepted from generating alerts. |
| `trafficLogs` | boolean | Whether the endpoint should report traffic logs in addition to threat logs. |
| `updateTime` | string (google-datetime) | Output only. The update time timestamp. |

### `ListEndpointsResponse`

-
- Version: v1

| Field | Type | Description |
|---|---|---|
| `endpoints` | array<Endpoint> | The list of endpoints response. |
| `nextPageToken` | string | A token, which can be sent as `page_token` to retrieve the next page. If this field is omitted, there are no subsequent pages. |
| `unreachable` | array<string> | Locations that could not be reached. |

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
| `requestedCancellation` | boolean | Output only. Identifies whether the user has requested cancellation of the operation. Operations that have successfully been cancelled have google.longrunning.Operation.error value with a google.rpc.Status.code of 1, corresponding to `Code.CANCELLED`. |
| `statusMessage` | string | Output only. Human-readable status of the operation, if any. |
| `target` | string | Output only. Server-defined resource path for the target of the operation. |
| `verb` | string | Output only. Name of the verb executed by the operation. |

### `Status`

- The `Status` type defines a logical error model that is suitable for different programming environments, including REST APIs and RPC APIs. It is used by gRPC (https://github.com/grpc). Each `Status` message contains three pieces of data: error code, error message, and error details. You can find out more about this error model and how to work with it in the API Design Guide (https://cloud.google.com/apis/design/errors).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `code` | integer (int32) | The status code, which should be an enum value of google.rpc.Code. |
| `details` | array<object> | A list of messages that carry the error details. There is a common set of message types for APIs to use. |
| `message` | string | A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client. |

### Shape of `Endpoint`

Generated from the Discovery schema (not in the official docs); values show each field type:

```json
{
  "createTime": "string (google-datetime)",
  "description": "string",
  "endpointForwardingRule": "string",
  "endpointIp": "string",
  "labels": "object",
  "name": "string",
  "network": "string",
  "satisfiesPzi": "boolean",
  "satisfiesPzs": "boolean",
  "severity": "string enum",
  "state": "string enum",
  "threatExceptions": "array<string>",
  "trafficLogs": "boolean",
  "updateTime": "string (google-datetime)"
}
```

## Notes

- Generated from the Discovery document(s) v1 of `ids` (retrieved 2026-11-14); a type with the same fields in several versions shows the preferred version; a type whose fields differ between versions is listed once per version (heading suffix `(version)`), and each type's `Version` line names the document it was taken from. A `$ref` resolves to the definition of the same version.
- Source: https://ids.googleapis.com/$discovery/rest?version=v1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
