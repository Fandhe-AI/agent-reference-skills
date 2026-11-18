---
source: https://ondemandscanning.googleapis.com/$discovery/rest?version=v1
---

# On-Demand Scanning API REST API (ondemandscanning)

## Signature / Usage

Base URL: `https://ondemandscanning.googleapis.com`. Methods are listed by `id`; the `Versions` line shows which API versions define the method (preferred: v1).

### `ondemandscanning.projects.locations.operations.cancel`

- Versions: v1, v1beta1
- `POST https://ondemandscanning.googleapis.com/v1/{+name}:cancel`
- Starts asynchronous cancellation on a long-running operation. The server makes a best effort to cancel the operation, but success is not guaranteed. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. Clients can use Operations.GetOperation or other methods to check whether the cancellation succeeded or whether the operation completed despite cancellation. On successful cancellation, the operation is not deleted; instead, it becomes an operation with an Operation.error value with a google.rpc.Status.code of `1`, corresponding to `Code.CANCELLED`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource to be cancelled. |

### `ondemandscanning.projects.locations.operations.delete`

- Versions: v1, v1beta1
- `DELETE https://ondemandscanning.googleapis.com/v1/{+name}`
- Deletes a long-running operation. This method indicates that the client is no longer interested in the operation result. It does not cancel the operation. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Empty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource to be deleted. |

### `ondemandscanning.projects.locations.operations.get`

- Versions: v1, v1beta1
- `GET https://ondemandscanning.googleapis.com/v1/{+name}`
- Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource. |

### `ondemandscanning.projects.locations.operations.list`

- Versions: v1, v1beta1
- `GET https://ondemandscanning.googleapis.com/v1/{+name}/operations`
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

### `ondemandscanning.projects.locations.operations.wait`

- Versions: v1, v1beta1
- `POST https://ondemandscanning.googleapis.com/v1/{+name}:wait`
- Waits until the specified long-running operation is done or reaches at most a specified timeout, returning the latest state. If the operation is already done, the latest state is immediately returned. If the timeout specified is greater than the default HTTP/RPC timeout, the HTTP/RPC timeout is used. If the server does not support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. Note that this method is on a best-effort basis. It may return the latest state before the specified timeout (including immediately), meaning even an immediate response is no guarantee that the operation is done.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource to wait on. |
| `timeout` | query | string (google-duration) | no | The maximum duration to wait before timing out. If left blank, the wait will be at most the time permitted by the underlying HTTP/RPC protocol. If RPC context deadline is also specified, the shorter one will be used. |

### `ondemandscanning.projects.locations.scans.analyzePackages`

- Versions: v1, v1beta1
- `POST https://ondemandscanning.googleapis.com/v1/{+parent}/scans:analyzePackages`
- Initiates an analysis of the provided packages.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `AnalyzePackagesRequestV1`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent of the resource for which analysis is requested. Format: projects/\[project_name\]/locations/\[location\] |

### `ondemandscanning.projects.locations.scans.vulnerabilities.list`

- Versions: v1, v1beta1
- `GET https://ondemandscanning.googleapis.com/v1/{+parent}/vulnerabilities`
- Lists vulnerabilities resulting from a successfully completed scan.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListVulnerabilitiesResponseV1`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The parent of the collection of Vulnerabilities being requested. Format: projects/\[project_name\]/locations/\[location\]/scans/\[scan_id\] |
| `pageSize` | query | integer (int32) | no | The number of vulnerabilities to retrieve. |
| `pageToken` | query | string | no | The page token, resulting from a previous call to ListVulnerabilities. |

### Example request skeleton

Generated from the Discovery entry of `ondemandscanning.projects.locations.operations.get` (not in the official docs); replace the `{...}` path variables (URL-encode query values):

```bash
curl -X GET \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  "https://ondemandscanning.googleapis.com/v1/{+name}"
```

## Notes

- Generated from the Discovery document(s) v1, v1beta1 of `ondemandscanning` (retrieved 2026-11-14). Resources on this page: projects.
- The Required column is `yes` for path variables and required parameters, and `conditional` when the description says "Required if ..." (mutually exclusive alternatives), when a `parent.child` parameter is required only inside an optional parent message or one branch of a oneof. Path variables are `yes` unless a note below names an alternative route without them.
- Message schemas (the request and response types named above) are listed under `references/rest-schemas/ondemandscanning/`; they are the `schemas` section of the Discovery documents in Source.
- Source: https://ondemandscanning.googleapis.com/$discovery/rest?version=v1, https://ondemandscanning.googleapis.com/$discovery/rest?version=v1beta1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
