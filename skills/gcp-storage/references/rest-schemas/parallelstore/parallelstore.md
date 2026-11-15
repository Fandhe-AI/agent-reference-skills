---
source: https://parallelstore.googleapis.com/$discovery/rest?version=v1
---

# Parallelstore API message schemas (parallelstore)

## Signature / Usage

Message types referenced by the methods listed under `references/rest/parallelstore/`.

### `CancelOperationRequest`

- The request message for Operations.CancelOperation.
- Version: v1

### `DestinationGcsBucket`

- Cloud Storage as the destination of a data transfer.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `uri` | string | Required. URI to a Cloud Storage bucket in the format: `gs:///`. The path inside the bucket is optional. |

### `DestinationParallelstore`

- Parallelstore as the destination of a data transfer.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `path` | string | Optional. Root directory path to the Paralellstore filesystem, starting with `/`. Defaults to `/` if unset. |

### `ExportDataRequest`

- Export data from Parallelstore to Cloud Storage.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `destinationGcsBucket` | DestinationGcsBucket | Cloud Storage destination. |
| `metadataOptions` | TransferMetadataOptions | Optional. The metadata options for the export data. |
| `requestId` | string | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `serviceAccount` | string | Optional. User-specified Service Account (SA) credentials to be used when performing the transfer. Use one of the following formats: \* `{EMAIL_ADDRESS_OR_UNIQUE_ID}` \* `projects/{PROJECT_ID_OR_NUMBER}/serviceAccounts/{EMAIL_ADDRESS_OR_UNIQUE_ID}` \* `projects/-/serviceAccounts/{EMAIL_ADDRESS_OR_UNIQUE_ID}` If unspecified, the Parallelstore service agent is used: `service-@gcp-sa-parallelstore.iam.gserviceaccount.com` |
| `sourceParallelstore` | SourceParallelstore | Parallelstore source. |

### `GoogleProtobufEmpty`

- A generic empty message that you can re-use to avoid defining duplicated empty messages in your APIs. A typical example is to use it as the request or the response type of an API method. For instance: service Foo { rpc Bar(google.protobuf.Empty) returns (google.protobuf.Empty); }
- Version: v1

### `ImportDataRequest`

- Import data from Cloud Storage into a Parallelstore instance.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `destinationParallelstore` | DestinationParallelstore | Parallelstore destination. |
| `metadataOptions` | TransferMetadataOptions | Optional. The transfer metadata options for the import data. |
| `requestId` | string | Optional. An optional request ID to identify requests. Specify a unique request ID so that if you must retry your request, the server will know to ignore the request if it has already been completed. The server will guarantee that for at least 60 minutes since the first request. For example, consider a situation where you make an initial request and the request times out. If you make the request again with the same request ID, the server can check if original operation with the same request ID was received, and if so, will ignore the second request. This prevents clients from accidentally creating duplicate commitments. The request ID must be a valid UUID with the exception that zero UUID is not supported (00000000-0000-0000-0000-000000000000). |
| `serviceAccount` | string | Optional. User-specified service account credentials to be used when performing the transfer. Use one of the following formats: \* `{EMAIL_ADDRESS_OR_UNIQUE_ID}` \* `projects/{PROJECT_ID_OR_NUMBER}/serviceAccounts/{EMAIL_ADDRESS_OR_UNIQUE_ID}` \* `projects/-/serviceAccounts/{EMAIL_ADDRESS_OR_UNIQUE_ID}` If unspecified, the Parallelstore service agent is used: `service-@gcp-sa-parallelstore.iam.gserviceaccount.com` |
| `sourceGcsBucket` | SourceGcsBucket | The Cloud Storage source bucket and, optionally, path inside the bucket. |

### `Instance`

- A Parallelstore instance.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `accessPoints` | array<string> | Output only. A list of IPv4 addresses used for client side configuration. |
| `capacityGib` | string (int64) | Required. Immutable. The instance's storage capacity in Gibibytes (GiB). Allowed values are between 12000 and 100000, in multiples of 4000; e.g., 12000, 16000, 20000, ... |
| `createTime` | string (google-datetime) | Output only. The time when the instance was created. |
| `daosVersion` | string | Output only. Deprecated: The version of DAOS software running in the instance. |
| `deploymentType` | string enum | Optional. Immutable. The deployment type of the instance. Allowed values are: \* `SCRATCH`: the instance is a scratch instance. \* `PERSISTENT`: the instance is a persistent instance. Values: `DEPLOYMENT_TYPE_UNSPECIFIED`, `SCRATCH`, `PERSISTENT`. |
| `description` | string | Optional. The description of the instance. 2048 characters or less. |
| `directoryStripeLevel` | string enum | Optional. Immutable. Stripe level for directories. Allowed values are: \* `DIRECTORY_STRIPE_LEVEL_MIN`: recommended when directories contain a small number of files. \* `DIRECTORY_STRIPE_LEVEL_BALANCED`: balances performance for workloads involving a mix of small and large directories. \* `DIRECTORY_STRIPE_LEVEL_MAX`: recommended for directories with a large number of files. Values: `DIRECTORY_STRIPE_LEVEL_UNSPECIFIED`, `DIRECTORY_STRIPE_LEVEL_MIN`, `DIRECTORY_STRIPE_LEVEL_BALANCED`, `DIRECTORY_STRIPE_LEVEL_MAX`. |
| `effectiveReservedIpRange` | string | Output only. Immutable. The ID of the IP address range being used by the instance's VPC network. This field is populated by the service and contains the value currently used by the service. |
| `fileStripeLevel` | string enum | Optional. Immutable. Stripe level for files. Allowed values are: \* `FILE_STRIPE_LEVEL_MIN`: offers the best performance for small size files. \* `FILE_STRIPE_LEVEL_BALANCED`: balances performance for workloads involving a mix of small and large files. \* `FILE_STRIPE_LEVEL_MAX`: higher throughput performance for larger files. Values: `FILE_STRIPE_LEVEL_UNSPECIFIED`, `FILE_STRIPE_LEVEL_MIN`, `FILE_STRIPE_LEVEL_BALANCED`, `FILE_STRIPE_LEVEL_MAX`. |
| `labels` | object | Optional. Cloud Labels are a flexible and lightweight mechanism for organizing cloud resources into groups that reflect a customer's organizational needs and deployment strategies. See https://cloud.google.com/resource-manager/docs/labels-overview for details. |
| `name` | string | Identifier. The resource name of the instance, in the format `projects/{project}/locations/{location}/instances/{instance_id}`. |
| `network` | string | Optional. Immutable. The name of the Compute Engine VPC network (https://cloud.google.com/vpc/docs/vpc) to which the instance is connected. |
| `reservedIpRange` | string | Optional. Immutable. The ID of the IP address range being used by the instance's VPC network. See Configure a VPC network (https://cloud.google.com/parallelstore/docs/vpc#create_and_configure_the_vpc). If no ID is provided, all ranges are considered. |
| `state` | string enum | Output only. The instance state. Values: `STATE_UNSPECIFIED`, `CREATING`, `ACTIVE`, `DELETING`, `FAILED`, `UPGRADING`, `REPAIRING`. |
| `updateTime` | string (google-datetime) | Output only. The time when the instance was updated. |

### `ListInstancesResponse`

- Response from ListInstances.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `instances` | array<Instance> | The list of Parallelstore instances. |
| `nextPageToken` | string | A token identifying a page of results the server should return. |
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
| `unreachable` | array<string> | Unordered list. Unreachable resources. Populated when the request sets `ListOperationsRequest.return_partial_success` and reads across collections e.g. when attempting to list all resources across all supported locations. |

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

- Long-running operation metadata.
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

### `ReconciliationOperationMetadata`

- Operation metadata returned by the CLH during resource state reconciliation.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `deleteResource` | boolean | DEPRECATED. Use exclusive_action instead. |
| `exclusiveAction` | string enum | Excluisive action returned by the CLH. Values: `UNKNOWN_REPAIR_ACTION`, `DELETE`, `RETRY`. |

### `SourceGcsBucket`

- Cloud Storage as the source of a data transfer.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `uri` | string | Required. URI to a Cloud Storage bucket in the format: `gs:///`. The path inside the bucket is optional. |

### `SourceParallelstore`

- Parallelstore as the source of a data transfer.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `path` | string | Optional. Root directory path to the Paralellstore filesystem, starting with `/`. Defaults to `/` if unset. |

### `Status`

- The `Status` type defines a logical error model that is suitable for different programming environments, including REST APIs and RPC APIs. It is used by gRPC (https://github.com/grpc). Each `Status` message contains three pieces of data: error code, error message, and error details. You can find out more about this error model and how to work with it in the API Design Guide (https://cloud.google.com/apis/design/errors).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `code` | integer (int32) | The status code, which should be an enum value of google.rpc.Code. |
| `details` | array<object> | A list of messages that carry the error details. There is a common set of message types for APIs to use. |
| `message` | string | A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client. |

### `TransferMetadataOptions`

- Transfer metadata options for the instance.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `gid` | string enum | Optional. The GID preservation behavior. Values: `GID_UNSPECIFIED`, `GID_SKIP`, `GID_NUMBER_PRESERVE`. |
| `mode` | string enum | Optional. The mode preservation behavior. Values: `MODE_UNSPECIFIED`, `MODE_SKIP`, `MODE_PRESERVE`. |
| `uid` | string enum | Optional. The UID preservation behavior. Values: `UID_UNSPECIFIED`, `UID_SKIP`, `UID_NUMBER_PRESERVE`. |

### Shape of `DestinationGcsBucket`

Generated from the Discovery schema (not in the official docs); values show each field type:

```json
{
  "uri": "string"
}
```

## Notes

- Generated from the Discovery document(s) v1 of `parallelstore` (retrieved 2026-11-14); a type with the same fields in several versions shows the preferred version; a type whose fields differ between versions is listed once per version (heading suffix `(version)`), and each type's `Version` line names the document it was taken from. A `$ref` resolves to the definition of the same version.
- Corrected from the official docs (the Discovery text above is verbatim): the source comments lost their angle-bracket placeholders: the Cloud Storage URI format `gs:///` stands for `gs://<bucket_name>/<path_inside_bucket>` (the path is optional), and the service agent `service-@gcp-sa-parallelstore.iam.gserviceaccount.com` stands for `service-<project_number>@gcp-sa-parallelstore.iam.gserviceaccount.com`.
- Descriptions are verbatim from Discovery, which drops angle-bracket placeholders of the source comments: a format such as `projects//locations/global` stands for `projects/{project}/locations/global` (likewise `"@.iam.gserviceaccount.com"` lost the account ID before `@`, and a name format ending in a collection such as `projects/*/locations/*/registrations/` lost its last ID), and an expression such as `... && in labels` lost its left operand (for example `'label_value' in labels`). Check the method or field in the product's REST reference before relying on such a format.
- Source: https://parallelstore.googleapis.com/$discovery/rest?version=v1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
