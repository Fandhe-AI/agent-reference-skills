---
source: https://cloudshell.googleapis.com/$discovery/rest?version=v1
---

# Cloud Shell API message schemas (cloudshell)

## Signature / Usage

Message types referenced by the methods listed under `references/rest/cloudshell/`.

### `AddPublicKeyMetadata`

- Message included in the metadata field of operations returned from AddPublicKey.
- Version: v1

### `AddPublicKeyRequest`

- Request message for AddPublicKey.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `key` | string | Key that should be added to the environment. Supported formats are `ssh-dss` (see RFC4253), `ssh-rsa` (see RFC4253), `ecdsa-sha2-nistp256` (see RFC5656), `ecdsa-sha2-nistp384` (see RFC5656) and `ecdsa-sha2-nistp521` (see RFC5656). It should be structured as <format> <content>, where <content> part is encoded with Base64. |

### `AddPublicKeyResponse`

- Response message for AddPublicKey.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `key` | string | Key that was added to the environment. |

### `AuthorizeEnvironmentMetadata`

- Message included in the metadata field of operations returned from AuthorizeEnvironment.
- Version: v1

### `AuthorizeEnvironmentRequest`

- Request message for AuthorizeEnvironment.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `accessToken` | string | The OAuth access token that should be sent to the environment. |
| `expireTime` | string (google-datetime) | The time when the credentials expire. If not set, defaults to one hour from when the server received the request. |
| `idToken` | string | The OAuth ID token that should be sent to the environment. |

### `AuthorizeEnvironmentResponse`

- Response message for AuthorizeEnvironment.
- Version: v1

### `CancelOperationRequest`

- The request message for Operations.CancelOperation.
- Version: v1

### `CreateEnvironmentMetadata`

- Message included in the metadata field of operations returned from CreateEnvironment.
- Version: v1

### `DeleteEnvironmentMetadata`

- Message included in the metadata field of operations returned from DeleteEnvironment.
- Version: v1

### `Empty`

- A generic empty message that you can re-use to avoid defining duplicated empty messages in your APIs. A typical example is to use it as the request or the response type of an API method. For instance: service Foo { rpc Bar(google.protobuf.Empty) returns (google.protobuf.Empty); }
- Version: v1

### `Environment`

- A Cloud Shell environment, which is defined as the combination of a Docker image specifying what is installed on the environment and a home directory containing the user's data that will remain across sessions. Each user has at least an environment with the ID "default".
- Version: v1

| Field | Type | Description |
|---|---|---|
| `dockerImage` | string | Required. Immutable. Full path to the Docker image used to run this environment, e.g. "gcr.io/dev-con/cloud-devshell:latest". |
| `id` | string | Output only. The environment's identifier, unique among the user's environments. |
| `name` | string | Immutable. Full name of this resource, in the format `users/{owner_email}/environments/{environment_id}`. `{owner_email}` is the email address of the user to whom this environment belongs, and `{environment_id}` is the identifier of this environment. For example, `users/someone@example.com/environments/default`. |
| `publicKeys` | array<string> | Output only. Public keys associated with the environment. Clients can connect to this environment via SSH only if they possess a private key corresponding to at least one of these public keys. Keys can be added to or removed from the environment using the AddPublicKey and RemovePublicKey methods. |
| `sshHost` | string | Output only. Host to which clients can connect to initiate SSH sessions with the environment. |
| `sshPort` | integer (int32) | Output only. Port to which clients can connect to initiate SSH sessions with the environment. |
| `sshUsername` | string | Output only. Username that clients should use when initiating SSH sessions with the environment. |
| `state` | string enum | Output only. Current execution state of this environment. Values: `STATE_UNSPECIFIED`, `SUSPENDED`, `PENDING`, `RUNNING`, `DELETING`. |
| `webHost` | string | Output only. Host to which clients can connect to initiate HTTPS or WSS connections with the environment. |

### `GenerateAccessTokenResponse`

- Response message for GenerateAccessToken.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `accessToken` | string | The access token. |

### `ListOperationsResponse`

- The response message for Operations.ListOperations.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `nextPageToken` | string | The standard List next-page token. |
| `operations` | array<Operation> | A list of operations that matches the specified filter in the request. |
| `unreachable` | array<string> | Unordered list. Unreachable resources. Populated when the request sets `ListOperationsRequest.return_partial_success` and reads across collections. For example, when attempting to list all resources across all supported locations. |

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

### `RemovePublicKeyMetadata`

- Message included in the metadata field of operations returned from RemovePublicKey.
- Version: v1

### `RemovePublicKeyRequest`

- Request message for RemovePublicKey.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `key` | string | Key that should be removed from the environment. |

### `RemovePublicKeyResponse`

- Response message for RemovePublicKey.
- Version: v1

### `StartEnvironmentMetadata`

- Message included in the metadata field of operations returned from StartEnvironment.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `state` | string enum | Current state of the environment being started. Values: `STATE_UNSPECIFIED`, `STARTING`, `UNARCHIVING_DISK`, `AWAITING_COMPUTE_RESOURCES`, `FINISHED`. |

### `StartEnvironmentRequest`

- Request message for StartEnvironment.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `accessToken` | string | The initial access token passed to the environment. If this is present and valid, the environment will be pre-authenticated with gcloud so that the user can run gcloud commands in Cloud Shell without having to log in. This code can be updated later by calling AuthorizeEnvironment. |
| `publicKeys` | array<string> | Public keys that should be added to the environment before it is started. |

### `StartEnvironmentResponse`

- Message included in the response field of operations returned from StartEnvironment once the operation is complete.
- Version: v1

| Field | Type | Description |
|---|---|---|
| `environment` | Environment | Environment that was started. |

### `Status`

- The `Status` type defines a logical error model that is suitable for different programming environments, including REST APIs and RPC APIs. It is used by gRPC (https://github.com/grpc). Each `Status` message contains three pieces of data: error code, error message, and error details. You can find out more about this error model and how to work with it in the API Design Guide (https://cloud.google.com/apis/design/errors).
- Version: v1

| Field | Type | Description |
|---|---|---|
| `code` | integer (int32) | The status code, which should be an enum value of google.rpc.Code. |
| `details` | array<object> | A list of messages that carry the error details. There is a common set of message types for APIs to use. |
| `message` | string | A developer-facing error message, which should be in English. Any user-facing error message should be localized and sent in the google.rpc.Status.details field, or localized by the client. |

### Shape of `AddPublicKeyRequest`

Generated from the Discovery schema (not in the official docs); values show each field type:

```json
{
  "key": "string"
}
```

## Notes

- Generated from the Discovery document(s) v1 of `cloudshell` (retrieved 2026-11-14); a type with the same fields in several versions shows the preferred version; a type whose fields differ between versions is listed once per version (heading suffix `(version)`), and each type's `Version` line names the document it was taken from. A `$ref` resolves to the definition of the same version.
- Source: https://cloudshell.googleapis.com/$discovery/rest?version=v1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
