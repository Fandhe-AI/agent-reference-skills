---
source: https://devicerun.googleapis.com/$discovery/rest?version=v1
---

# Device Run API REST API (devicerun)

## Signature / Usage

Base URL: `https://devicerun.googleapis.com`. Methods are listed by `id`; the `Versions` line shows which API versions define the method (preferred: v1).

### `devicerun.projects.locations.devices.get`

- Versions: v1, v1alpha
- `GET https://devicerun.googleapis.com/v1/{+name}`
- Returns information about a specific device.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `CatalogDevice`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the device. Format: `projects/{project}/locations/global/devices/{device}`. |

### `devicerun.projects.locations.devices.list`

- Versions: v1, v1alpha
- `GET https://devicerun.googleapis.com/v1/{+parent}/devices`
- Lists all devices.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `CatalogListDevicesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent of the collection of devices. Format: `projects/{project}/locations/global`. |
| `filter` | query | string | no | Optional. An AIP-160 (https://google.aip.dev/160) filter expression restricting which devices are returned. An empty filter returns all devices. Filtering is supported over the `Device` fields, including nested fields via dot-path. Enum and string values must be double-quoted. Examples: \* `platform = "ANDROID"` \* `platform = "ANDROID" AND os_version = "34"` \* `hardware_type = "PHYSICAL" AND form_factor = "PHONE"` \* `android_details.build_type = "userdebug"` \* `availability.capacity = "HIGH"` |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of devices to return. The server may return fewer items than this value. |
| `pageToken` | query | string | no | Optional. A page token, received from a previous `ListDevices` call. Provide this to receive the subsequent page. When paginating, all other parameters provided to `ListDevices` must match the call that provided the page token. |

### `devicerun.projects.locations.get`

- Versions: v1, v1alpha
- `GET https://devicerun.googleapis.com/v1/{+name}`
- Gets information about a location.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Location`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Resource name for the location. |

### `devicerun.projects.locations.list`

- Versions: v1, v1alpha
- `GET https://devicerun.googleapis.com/v1/{+name}/locations`
- Lists information about the supported locations for this service. This method lists locations based on the resource scope provided in the ListLocationsRequest.name field: \* \*\*Global locations\*\*: If `name` is empty, the method lists the public locations available to all projects. \* \*\*Project-specific locations\*\*: If `name` follows the format `projects/{project}`, the method lists locations visible to that specific project. This includes public, private, or other project-specific locations enabled for the project. For gRPC and client library implementations, the resource name is passed as the `name` field. For direct service calls, the resource name is incorporated into the request path based on the specific service implementation and version.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListLocationsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The resource that owns the locations collection, if applicable. |
| `extraLocationTypes` | query | repeated string | no | Optional. Do not use this field unless explicitly documented otherwise. This is primarily for internal usage. |
| `filter` | query | string | no | A filter to narrow down results to a preferred subset. The filtering language accepts strings like `"displayName=tokyo"`, and is documented in more detail in AIP-160 (https://google.aip.dev/160). |
| `pageSize` | query | integer (int32) | no | The maximum number of results to return. If not set, the service selects a default. |
| `pageToken` | query | string | no | A page token received from the `next_page_token` field in the response. Send that page token to receive the subsequent page. |

### `devicerun.projects.locations.operations.cancel`

- Versions: v1, v1alpha
- `POST https://devicerun.googleapis.com/v1/{+name}:cancel`
- Starts asynchronous cancellation on a long-running operation. The server makes a best effort to cancel the operation, but success is not guaranteed. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. Clients can use Operations.GetOperation or other methods to check whether the cancellation succeeded or whether the operation completed despite cancellation. On successful cancellation, the operation is not deleted; instead, it becomes an operation with an Operation.error value with a google.rpc.Status.code of `1`, corresponding to `Code.CANCELLED`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleLongrunningCancelOperationRequest`; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource to be cancelled. |

### `devicerun.projects.locations.operations.delete`

- Versions: v1, v1alpha
- `DELETE https://devicerun.googleapis.com/v1/{+name}`
- Deletes a long-running operation. This method indicates that the client is no longer interested in the operation result. It does not cancel the operation. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource to be deleted. |

### `devicerun.projects.locations.operations.get`

- Versions: v1, v1alpha
- `GET https://devicerun.googleapis.com/v1/{+name}`
- Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource. |

### `devicerun.projects.locations.operations.list`

- Versions: v1, v1alpha
- `GET https://devicerun.googleapis.com/v1/{+name}/operations`
- Lists operations that match the specified filter in the request. If the server doesn't support this method, it returns `UNIMPLEMENTED`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleLongrunningListOperationsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation's parent resource. |
| `filter` | query | string | no | The standard list filter. |
| `pageSize` | query | integer (int32) | no | The standard list page size. |
| `pageToken` | query | string | no | The standard list page token. |
| `returnPartialSuccess` | query | boolean | no | When set to `true`, operations that are reachable are returned as normal, and those that are unreachable are returned in the ListOperationsResponse.unreachable field. This can only be `true` when reading across collections. For example, when `parent` is set to `"projects/example/locations/-"`. This field is not supported by default and will result in an `UNIMPLEMENTED` error if set unless explicitly documented otherwise in service or product specific documentation. |

### `devicerun.projects.locations.sessions.batchGet`

- Versions: v1alpha
- `GET https://devicerun.googleapis.com/v1alpha/{+parent}/sessions:batchGet`
- Retrieves multiple automation sessions in a single batch request. Sessions are returned in the same order as the `names` in the request. If any of the requested sessions does not exist, the whole request fails with `NOT_FOUND` and no sessions are returned. When calling this method over HTTP/REST with a large number of `names`, the request URL may exceed the maximum URL length (about 16 KB) and be rejected. In that case, send a `POST` request to the same URL with the `X-HTTP-Method-Override: GET` header and pass the request parameters in a JSON (`application/json`) or form-encoded (`application/x-www-form-urlencoded`) body. See https://cloud.google.com/apis/docs/http#long_request_urls.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `BatchGetSessionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource shared by all sessions being retrieved. Format: `projects/{project}/locations/{location}`. The `parent` field in the `BatchGetSessionsRequest` message must match the `parent` of all `Session` resource names in `names`. |
| `names` | query | repeated string | yes | Required. The names of the sessions to retrieve. A maximum of 500 sessions can be retrieved in a batch. Format: `projects/{project}/locations/{location}/sessions/{session}`. |

### `devicerun.projects.locations.sessions.cancel`

- Versions: v1alpha
- `POST https://devicerun.googleapis.com/v1alpha/{+name}:cancel`
- Cancels an in-progress automation session. This RPC returns immediately and cancellation proceeds asynchronously. If the session is already finished, this RPC will have no effect.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `CancelSessionRequest`; Response: `CancelSessionResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the session. Format: "projects/{project}/locations/{location}/sessions/{session}" |

### `devicerun.projects.locations.sessions.create`

- Versions: v1alpha
- `POST https://devicerun.googleapis.com/v1alpha/{+parent}/sessions`
- Starts an automation session with the specified configuration. This method returns a long-running `Operation`, awaiting the completion of all jobs in the session.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `Session`; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent resource where this session will be created. Format: `projects/{project}/locations/{location}`. |
| `requestId` | query | string | no | Optional. A unique identifier for this request. This request is only idempotent if both `request_id` and `session_id` are provided. If a retry with the same `request_id` and `session_id` is received, then the previous result will be returned. The server will guarantee that for at least 60 minutes after the first request. If `request_id` is provided without `session_id`, the server generates a new `session_id` on each attempt, and retries with the same `request_id` will fail with `INVALID_ARGUMENT`. The value must be a UUID (e.g., 123e4567-e89b-12d3-a456-426655440000). See github.com/google/uuid for more details. |
| `sessionId` | query | string | no | Optional. The ID to use for the session, which will become the final component of the resource name. If not provided, the server will generate a value for this field. To make the request idempotent when `request_id` is specified, callers must also provide `session_id` so that retries target the same resource name. When provided, this value must be between 4 and 63 characters, and match the following regex: ^a-z{2,61}\[a-z0-9\]$. |

### `devicerun.projects.locations.sessions.delete`

- Versions: v1alpha
- `DELETE https://devicerun.googleapis.com/v1alpha/{+name}`
- Deletes a session. This RPC returns immediately and deletion proceeds asynchronously. It will cancel the session at first if it is still running.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the session. Format: `projects/{project}/locations/{location}/sessions/{session}`. |
| `requestId` | query | string | no | Optional. A unique identifier for this request. This request is only idempotent if a `request_id` is provided, i.e. if a request with the same `request_id` is received, then the previous result will be returned. The server will guarantee that for at least 60 minutes after the first request. The value must be a UUID (e.g., 123e4567-e89b-12d3-a456-426655440000). See github.com/google/uuid for more details. |

### `devicerun.projects.locations.sessions.get`

- Versions: v1alpha
- `GET https://devicerun.googleapis.com/v1alpha/{+name}`
- Returns information about a previously created automation session.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Session`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the session. Format: `projects/{project}/locations/{location}/sessions/{session}`. |
| `view` | query | string enum | no | Optional. The view of the session to return. If not set, the `FULL` view will be returned. Values: `SESSION_VIEW_UNSPECIFIED`, `SESSION_VIEW_BASIC`, `SESSION_VIEW_FULL`. |

### `devicerun.projects.locations.sessions.list`

- Versions: v1alpha
- `GET https://devicerun.googleapis.com/v1alpha/{+parent}/sessions`
- Lists previously created automation sessions. Sessions may still be in-progress, or may have finished successfully, or unsuccessfully.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListSessionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Parent value for ListSessionsRequest The parent of the collection of sessions. Format: `projects/{project}/locations/{location}`. |
| `filter` | query | string | no | Optional. The raw filter text to constrain the results. |
| `orderBy` | query | string | no | Optional. The order to sort results by. Supported values: `name`, `name desc`, `create_time`, `create_time desc`. Values must use the snake_case field name; `createTime` is not accepted. Ordering by `create_time` is not supported when listing across all locations (`locations/-`). If unspecified, results are returned in an unspecified order. |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of sessions to return. The server may return fewer items than this value. If unspecified, at most 500 sessions will be returned. The maximum value is 1000, values above will be coerced to 1000. |
| `pageToken` | query | string | no | Optional. A page token, received from a previous `ListSessions` call. Provide this to receive the subsequent page. When paginating, all other parameters provided to `ListSessions` must match the call that provided the page token. |
| `view` | query | string enum | no | Optional. The view of the sessions to return. If not set, the `FULL` view will be returned. Values: `SESSION_VIEW_UNSPECIFIED`, `SESSION_VIEW_BASIC`, `SESSION_VIEW_FULL`. |

### `devicerun.projects.locations.softwareVersions.get`

- Versions: v1, v1alpha
- `GET https://devicerun.googleapis.com/v1/{+name}`
- Returns information about a specific software version.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `CatalogSoftwareVersion`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The name of the software version. Format: `projects/{project}/locations/global/softwareVersions/{software_version}`. |

### `devicerun.projects.locations.softwareVersions.list`

- Versions: v1, v1alpha
- `GET https://devicerun.googleapis.com/v1/{+parent}/softwareVersions`
- Lists all software versions.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `CatalogListSoftwareVersionsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent of the collection of software versions. Format: `projects/{project}/locations/global`. |
| `filter` | query | string | no | Optional. An AIP-160 (https://google.aip.dev/160) filter expression restricting which software versions are returned. An empty filter returns all software versions. Filtering is supported over the `SoftwareVersion` fields, including nested fields via dot-path. Enum and string values must be double-quoted. Examples: \* `software_type = "ANDROIDX_TEST_ORCHESTRATOR"` \* `software_type = "ANDROIDX_TEST_ORCHESTRATOR" AND is_default = true` \* `lifecycle.state = "ACTIVE"` \* `version = "1.4.1"` |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of software versions to return. The server may return fewer items than this value. |
| `pageToken` | query | string | no | Optional. A page token, received from a previous `ListSoftwareVersions` call. Provide this to receive the subsequent page. When paginating, all other parameters provided to `ListSoftwareVersions` must match the call that provided the page token. |

### Example request skeleton

Generated from the Discovery entry of `devicerun.projects.locations.devices.get` (not in the official docs); replace the `{...}` path variables (URL-encode query values):

```bash
curl -X GET \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  "https://devicerun.googleapis.com/v1/{+name}"
```

## Notes

- Generated from the Discovery document(s) v1, v1alpha of `devicerun` (retrieved 2026-11-14). Resources on this page: projects.
- The Required column is `yes` for path variables and required parameters, and `conditional` when the description says "Required if ..." (mutually exclusive alternatives), when a `parent.child` parameter is required only inside an optional parent message or one branch of a oneof. Path variables are `yes` unless a note below names an alternative route without them.
- Message schemas (the request and response types named above) are defined in the `schemas` section of the Discovery documents in Source.
- Caution (the Discovery text above is verbatim): Discovery dropped bracket expressions from the `sessionId` regular expression; as written, `^a-z{2,61}[a-z0-9]$` matches only a literal `a-` followed by 2 to 61 `z` characters and one lowercase letter or digit, not the IDs of 4 to 63 characters the same sentence describes; there is no Device Run proto in googleapis (`google/` and `google/cloud/` at commit `5ce0245`, checked 2026-11-19) and no Device Run docs page states the expression, so the original is not known; do not use the rendered text as a validation pattern.
- Source: https://devicerun.googleapis.com/$discovery/rest?version=v1, https://devicerun.googleapis.com/$discovery/rest?version=v1alpha (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
