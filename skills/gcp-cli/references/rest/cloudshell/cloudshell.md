---
source: https://cloudshell.googleapis.com/$discovery/rest?version=v1
---

# Cloud Shell API REST API (cloudshell)

## Signature / Usage

Base URL: `https://cloudshell.googleapis.com`. Methods are listed by `id`; the `Versions` line shows which API versions define the method (preferred: v1).

### `cloudshell.operations.cancel`

- Versions: v1
- `POST https://cloudshell.googleapis.com/v1/{+name}:cancel`
- Starts asynchronous cancellation on a long-running operation. The server makes a best effort to cancel the operation, but success is not guaranteed. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. Clients can use Operations.GetOperation or other methods to check whether the cancellation succeeded or whether the operation completed despite cancellation. On successful cancellation, the operation is not deleted; instead, it becomes an operation with an Operation.error value with a google.rpc.Status.code of `1`, corresponding to `Code.CANCELLED`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `CancelOperationRequest`; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource to be cancelled. |

### `cloudshell.operations.delete`

- Versions: v1
- `DELETE https://cloudshell.googleapis.com/v1/{+name}`
- Deletes a long-running operation. This method indicates that the client is no longer interested in the operation result. It does not cancel the operation. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource to be deleted. |

### `cloudshell.operations.get`

- Versions: v1
- `GET https://cloudshell.googleapis.com/v1/{+name}`
- Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource. |

### `cloudshell.operations.list`

- Versions: v1
- `GET https://cloudshell.googleapis.com/v1/{+name}`
- Lists operations that match the specified filter in the request. If the server doesn't support this method, it returns `UNIMPLEMENTED`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListOperationsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation's parent resource. |
| `filter` | query | string | no | The standard list filter. |
| `pageSize` | query | integer (int32) | no | The standard list page size. |
| `pageToken` | query | string | no | The standard list page token. |
| `returnPartialSuccess` | query | boolean | no | When set to `true`, operations that are reachable are returned as normal, and those that are unreachable are returned in the ListOperationsResponse.unreachable field. This can only be `true` when reading across collections. For example, when `parent` is set to `"projects/example/locations/-"`. This field is not supported by default and will result in an `UNIMPLEMENTED` error if set unless explicitly documented otherwise in service or product specific documentation. |

### `cloudshell.users.environments.addPublicKey`

- Versions: v1
- `POST https://cloudshell.googleapis.com/v1/{+environment}:addPublicKey`
- Adds a public SSH key to an environment, allowing clients with the corresponding private key to connect to that environment via SSH. If a key with the same content already exists, this will error with ALREADY_EXISTS.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `AddPublicKeyRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `environment` | path | string | yes | Environment this key should be added to, e.g. `users/me/environments/default`. |

### `cloudshell.users.environments.authorize`

- Versions: v1
- `POST https://cloudshell.googleapis.com/v1/{+name}:authorize`
- Sends OAuth credentials to a running environment on behalf of a user. When this completes, the environment will be authorized to run various Google Cloud command line tools without requiring the user to manually authenticate.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `AuthorizeEnvironmentRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Name of the resource that should receive the credentials, for example `users/me/environments/default` or `users/someone@example.com/environments/default`. |

### `cloudshell.users.environments.generateAccessToken`

- Versions: v1
- `GET https://cloudshell.googleapis.com/v1/{+environment}:generateAccessToken`
- Generates an access token for the user's environment.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GenerateAccessTokenResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `environment` | path | string | yes | Required. The environment to generate the access token for. |
| `expireTime` | query | string (google-datetime) | no | Desired expiration time of the access token. This value must be at most 24 hours in the future. If a value is not specified, the token's expiration time will be set to a default value of 1 hour in the future. |
| `ttl` | query | string (google-duration) | no | Desired lifetime duration of the access token. This value must be at most 24 hours. If a value is not specified, the token's lifetime will be set to a default value of 1 hour. |

### `cloudshell.users.environments.get`

- Versions: v1
- `GET https://cloudshell.googleapis.com/v1/{+name}`
- Gets an environment. Returns NOT_FOUND if the environment does not exist.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Environment`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the requested resource, for example `users/me/environments/default` or `users/someone@example.com/environments/default`. |

### `cloudshell.users.environments.removePublicKey`

- Versions: v1
- `POST https://cloudshell.googleapis.com/v1/{+environment}:removePublicKey`
- Removes a public SSH key from an environment. Clients will no longer be able to connect to the environment using the corresponding private key. If a key with the same content is not present, this will error with NOT_FOUND.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `RemovePublicKeyRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `environment` | path | string | yes | Environment this key should be removed from, e.g. `users/me/environments/default`. |

### `cloudshell.users.environments.start`

- Versions: v1
- `POST https://cloudshell.googleapis.com/v1/{+name}:start`
- Starts an existing environment, allowing clients to connect to it. The returned operation will contain an instance of StartEnvironmentMetadata in its metadata field. Users can wait for the environment to start by polling this operation via GetOperation. Once the environment has finished starting and is ready to accept connections, the operation will contain a StartEnvironmentResponse in its response field.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `StartEnvironmentRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Name of the resource that should be started, for example `users/me/environments/default` or `users/someone@example.com/environments/default`. |

### Example request skeleton

Generated from the Discovery entry of `cloudshell.operations.get` (not in the official docs); replace the `{...}` path variables (URL-encode query values):

```bash
curl -X GET \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  "https://cloudshell.googleapis.com/v1/{+name}"
```

## Notes

- Generated from the Discovery document(s) v1 of `cloudshell` (retrieved 2026-11-14). Resources on this page: operations, users.
- The Required column is `yes` for path variables and required parameters, and `conditional` when the description says "Required if ..." (mutually exclusive alternatives), when a `parent.child` parameter is required only inside an optional parent message or one branch of a oneof. Path variables are `yes` unless a note below names an alternative route without them.
- Message schemas (the request and response types named above) are listed under `references/rest-schemas/cloudshell/`; they are the `schemas` section of the Discovery documents in Source.
- Source: https://cloudshell.googleapis.com/$discovery/rest?version=v1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
