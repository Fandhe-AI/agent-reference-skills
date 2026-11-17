---
source: https://vpcaccess.googleapis.com/$discovery/rest?version=v1
---

# Serverless VPC Access API message schemas (vpcaccess)

## Signature / Usage

Message types referenced by the methods listed under `references/rest/vpcaccess/`.

### `Connector`

- Definition of a Serverless VPC Access connector.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `connectedProjects` | array<string> | Output only. List of projects using the connector. |
| `ipCidrRange` | string | Optional. The range of internal addresses that follows RFC 4632 notation. Example: `10.132.0.0/28`. |
| `machineType` | string | Machine type of VM Instance underlying connector. Default is e2-micro |
| `maxInstances` | integer (int32) | Maximum value of instances in autoscaling group underlying the connector. |
| `maxThroughput` | integer (int32) | Maximum throughput of the connector in Mbps. Refers to the expected throughput when using an `e2-micro` machine type. Value must be a multiple of 100 from 300 through 1000. Must be higher than the value specified by --min-throughput. If both max-throughput and max-instances are provided, max-instances takes precedence over max-throughput. The use of `max-throughput` is discouraged in favor of `max-instances`. |
| `minInstances` | integer (int32) | Minimum value of instances in autoscaling group underlying the connector. |
| `minThroughput` | integer (int32) | Minimum throughput of the connector in Mbps. Refers to the expected throughput when using an `e2-micro` machine type. Value must be a multiple of 100 from 200 through 900. Must be lower than the value specified by --max-throughput. If both min-throughput and min-instances are provided, min-instances takes precedence over min-throughput. The use of `min-throughput` is discouraged in favor of `min-instances`. |
| `name` | string | The resource name in the format `projects/*/locations/*/connectors/*`. |
| `network` | string | Optional. Name of a VPC network. |
| `state` | string enum | Output only. State of the VPC access connector. Values: `STATE_UNSPECIFIED`, `READY`, `CREATING`, `DELETING`, `ERROR`, `UPDATING`. |
| `subnet` | Subnet | Optional. The subnet in which to house the VPC Access Connector. |

### `Connector` (v1beta1)

- Definition of a Serverless VPC Access connector.
- Version: v1beta1

| Field | Type | Description |
|---|---|---|
| `connectedProjects` | array<string> | Output only. List of projects using the connector. |
| `createTime` | string (google-datetime) | Output only. The creation time of the connector. |
| `ipCidrRange` | string | Optional. The range of internal addresses that follows RFC 4632 notation. Example: `10.132.0.0/28`. |
| `lastRestartTime` | string (google-datetime) | Output only. The last restart time of the connector. |
| `machineType` | string | Machine type of VM Instance underlying connector. Default is e2-micro |
| `maxInstances` | integer (int32) | Maximum value of instances in autoscaling group underlying the connector. |
| `maxThroughput` | integer (int32) | Maximum throughput of the connector in Mbps. Refers to the expected throughput when using an `e2-micro` machine type. Value must be a multiple of 100 from 300 through 1000. Must be higher than the value specified by --min-throughput. If both max-throughput and max-instances are provided, max-instances takes precedence over max-throughput. The use of `max-throughput` is discouraged in favor of `max-instances`. |
| `minInstances` | integer (int32) | Minimum value of instances in autoscaling group underlying the connector. |
| `minThroughput` | integer (int32) | Minimum throughput of the connector in Mbps. Refers to the expected throughput when using an `e2-micro` machine type. Value must be a multiple of 100 from 200 through 900. Must be lower than the value specified by --max-throughput. If both min-throughput and min-instances are provided, min-instances takes precedence over min-throughput. The use of `min-throughput` is discouraged in favor of `min-instances`. |
| `name` | string | The resource name in the format `projects/*/locations/*/connectors/*`. |
| `network` | string | Optional. Name of a VPC network. |
| `state` | string enum | Output only. State of the VPC access connector. Values: `STATE_UNSPECIFIED`, `READY`, `CREATING`, `DELETING`, `ERROR`, `UPDATING`. |
| `subnet` | Subnet | Optional. The subnet in which to house the VPC Access Connector. |

### `ListConnectorsResponse`

- Response for listing Serverless VPC Access connectors.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `connectors` | array<Connector> | List of Serverless VPC Access connectors. |
| `nextPageToken` | string | Continuation token. |

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

- Metadata for google.longrunning.Operation.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. Time when the operation was created. |
| `endTime` | string (google-datetime) | Output only. Time when the operation completed. |
| `method` | string | Output only. Method that initiated the operation e.g. google.cloud.vpcaccess.v1.Connectors.CreateConnector. |
| `target` | string | Output only. Name of the resource that this operation is acting on e.g. projects/my-project/locations/us-central1/connectors/v1. |

### `OperationMetadataV1Alpha1`

- Metadata for google.longrunning.Operation.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `endTime` | string (google-datetime) | Output only. Time when the operation completed. |
| `insertTime` | string (google-datetime) | Output only. Time when the operation was created. |
| `method` | string | Output only. Method that initiated the operation e.g. google.cloud.vpcaccess.v1alpha1.Connectors.CreateConnector. |
| `target` | string | Output only. Name of the resource that this operation is acting on e.g. projects/my-project/locations/us-central1/connectors/v1. |

### `OperationMetadataV1Beta1`

- Metadata for google.longrunning.Operation.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `createTime` | string (google-datetime) | Output only. Time when the operation was created. |
| `endTime` | string (google-datetime) | Output only. Time when the operation completed. |
| `method` | string | Output only. Method that initiated the operation e.g. google.cloud.vpcaccess.v1beta1.Connectors.CreateConnector. |
| `target` | string | Output only. Name of the resource that this operation is acting on e.g. projects/my-project/locations/us-central1/connectors/v1. |

### `Status`

- The `Status` type defines a logical error model that is suitable for different programming environments, including REST APIs and RPC APIs. It is used by gRPC (https://github.com/grpc). Each `Status` message contains three pieces of data: error code, error message, and error details. You can find out more about this error model and how to work with it in the API Design Guide (https://cloud.google.com/apis/design/errors).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `code` | integer (int32) | The status code, which should be an enum value of google.rpc.Code. |
| `details` | array<object> | A list of messages that carry the error details. There is a common set of message types for APIs to use. |
| `message` | string | A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client. |

### `Subnet`

- The subnet in which to house the connector
- Version: v1

| Field | Type | Description |
|---|---|---|
| `name` | string | Optional. Subnet name (relative, not fully qualified). E.g. if the full subnet selfLink is https://compute.googleapis.com/compute/v1/projects/{project}/regions/{region}/subnetworks/{subnetName} the correct input for this field would be {subnetName} |
| `projectId` | string | Optional. Project in which the subnet exists. If not set, this project is assumed to be the project for which the connector create request was issued. |

### Shape of `Connector`

Generated from the Discovery schema (not in the official docs); values show each field type:

```json
{
  "connectedProjects": "array<string>",
  "ipCidrRange": "string",
  "machineType": "string",
  "maxInstances": "integer (int32)",
  "maxThroughput": "integer (int32)",
  "minInstances": "integer (int32)",
  "minThroughput": "integer (int32)",
  "name": "string",
  "network": "string",
  "state": "string enum",
  "subnet": "Subnet"
}
```

## Notes

- Generated from the Discovery document(s) v1, v1beta1 of `vpcaccess` (retrieved 2026-11-14); a type with the same fields in several versions shows the preferred version; a type whose fields differ between versions is listed once per version (heading suffix `(version)`), and each type's `Version` line names the document it was taken from. A `$ref` resolves to the definition of the same version.
- Source: https://vpcaccess.googleapis.com/$discovery/rest?version=v1, https://vpcaccess.googleapis.com/$discovery/rest?version=v1beta1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
