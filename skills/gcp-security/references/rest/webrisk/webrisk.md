---
source: https://webrisk.googleapis.com/$discovery/rest?version=v1
---

# Web Risk API REST API (webrisk)

## Signature / Usage

Base URL: `https://webrisk.googleapis.com`. Methods are listed by `id`; the `Versions` line shows which API versions define the method (preferred: v1).

### `webrisk.hashes.search`

- Versions: v1
- `GET https://webrisk.googleapis.com/v1/hashes:search`
- Gets the full hashes that match the requested hash prefix. This is used after a hash prefix is looked up in a threatList and there is a match. The client side threatList only holds partial hashes so the client must query this method to determine if there is a full hash match of a threat.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudWebriskV1SearchHashesResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `hashPrefix` | query | string (byte) | no | A hash prefix, consisting of the most significant 4-32 bytes of a SHA256 hash. For JSON requests, this field is base64-encoded. Note that if this parameter is provided by a URI, it must be encoded using the web safe base64 variant (RFC 4648). |
| `threatTypes` | query | repeated string enum | yes | Required. The ThreatLists to search in. Multiple ThreatLists may be specified. Values: `THREAT_TYPE_UNSPECIFIED`, `MALWARE`, `SOCIAL_ENGINEERING`, `UNWANTED_SOFTWARE`, `SOCIAL_ENGINEERING_EXTENDED_COVERAGE`. |

### `webrisk.projects.operations.cancel`

- Versions: v1
- `POST https://webrisk.googleapis.com/v1/{+name}:cancel`
- Starts asynchronous cancellation on a long-running operation. The server makes a best effort to cancel the operation, but success is not guaranteed. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`. Clients can use Operations.GetOperation or other methods to check whether the cancellation succeeded or whether the operation completed despite cancellation. On successful cancellation, the operation is not deleted; instead, it becomes an operation with an Operation.error value with a google.rpc.Status.code of `1`, corresponding to `Code.CANCELLED`.
- Request: `GoogleLongrunningCancelOperationRequest`; Response: `GoogleProtobufEmpty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource to be cancelled. |

### `webrisk.projects.operations.delete`

- Versions: v1
- `DELETE https://webrisk.googleapis.com/v1/{+name}`
- Deletes a long-running operation. This method indicates that the client is no longer interested in the operation result. It does not cancel the operation. If the server doesn't support this method, it returns `google.rpc.Code.UNIMPLEMENTED`.
- Request: —; Response: `GoogleProtobufEmpty`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource to be deleted. |

### `webrisk.projects.operations.get`

- Versions: v1
- `GET https://webrisk.googleapis.com/v1/{+name}`
- Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleLongrunningOperation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource. |

### `webrisk.projects.operations.list`

- Versions: v1
- `GET https://webrisk.googleapis.com/v1/{+name}/operations`
- Lists operations that match the specified filter in the request. If the server doesn't support this method, it returns `UNIMPLEMENTED`.
- Request: —; Response: `GoogleLongrunningListOperationsResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation's parent resource. |
| `filter` | query | string | no | The standard list filter. |
| `pageSize` | query | integer (int32) | no | The standard list page size. |
| `pageToken` | query | string | no | The standard list page token. |
| `returnPartialSuccess` | query | boolean | no | When set to `true`, operations that are reachable are returned as normal, and those that are unreachable are returned in the ListOperationsResponse.unreachable field. This can only be `true` when reading across collections. For example, when `parent` is set to `"projects/example/locations/-"`. This field is not supported by default and will result in an `UNIMPLEMENTED` error if set unless explicitly documented otherwise in service or product specific documentation. |

### `webrisk.projects.submissions.create`

- Versions: v1
- `POST https://webrisk.googleapis.com/v1/{+parent}/submissions`
- Creates a Submission of a URI suspected of containing phishing content for review. If the review confirms malicious phishing content, Google adds the site to Google's Social Engineering lists (https://support.google.com/webmasters/answer/6350487/) to help protect users. Only allowlisted projects can use this method during Early Access. To obtain access, contact Sales or your customer engineer.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: `GoogleCloudWebriskV1Submission`; Response: `GoogleCloudWebriskV1Submission`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The name of the project that is making the submission. This string is in the format "projects/{project_number}". |

### `webrisk.threatLists.computeDiff`

- Versions: v1
- `GET https://webrisk.googleapis.com/v1/threatLists:computeDiff`
- Gets the most recent threat list diffs. These diffs should be applied to a local database of hashes to keep it up-to-date. If the local database is empty or excessively out-of-date, a complete snapshot of the database will be returned. This Method only updates a single ThreatList at a time. To update multiple ThreatList databases, this method needs to be called once for each list.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudWebriskV1ComputeThreatListDiffResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `constraints.maxDatabaseEntries` | query | integer (int32) | no | Sets the maximum number of entries that the client is willing to have in the local database. This should be a power of 2 between 2\*\*10 and 2\*\*20. If zero, no database size limit is set. |
| `constraints.maxDiffEntries` | query | integer (int32) | no | The maximum size in number of entries. The diff will not contain more entries than this value. This should be a power of 2 between 2\*\*10 and 2\*\*20. If zero, no diff size limit is set. |
| `constraints.supportedCompressions` | query | repeated string enum | no | The compression types supported by the client. Values: `COMPRESSION_TYPE_UNSPECIFIED`, `RAW`, `RICE`. |
| `threatType` | query | string enum | yes | Required. The threat list to update. Only a single ThreatType should be specified per request. If you want to handle multiple ThreatTypes, you must make one request per ThreatType. Values: `THREAT_TYPE_UNSPECIFIED`, `MALWARE`, `SOCIAL_ENGINEERING`, `UNWANTED_SOFTWARE`, `SOCIAL_ENGINEERING_EXTENDED_COVERAGE`. |
| `versionToken` | query | string (byte) | no | The current version token of the client for the requested list (the client version that was received from the last successful diff). If the client does not have a version token (this is the first time calling ComputeThreatListDiff), this may be left empty and a full database snapshot will be returned. |

### `webrisk.uris.search`

- Versions: v1
- `GET https://webrisk.googleapis.com/v1/uris:search`
- This method is used to check whether a URI is on a given threatList. Multiple threatLists may be searched in a single query. The response will list all requested threatLists the URI was found to match. If the URI is not found on any of the requested ThreatList an empty response will be returned.
- Scopes: `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `GoogleCloudWebriskV1SearchUrisResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `threatTypes` | query | repeated string enum | yes | Required. The ThreatLists to search in. Multiple ThreatLists may be specified. Values: `THREAT_TYPE_UNSPECIFIED`, `MALWARE`, `SOCIAL_ENGINEERING`, `UNWANTED_SOFTWARE`, `SOCIAL_ENGINEERING_EXTENDED_COVERAGE`. |
| `uri` | query | string | yes | Required. The URI to be checked for matches. |

### Example request skeleton

Generated from the Discovery entry of `webrisk.hashes.search` (not in the official docs); replace the `{...}` path variables and required query parameters (URL-encode query values):

```bash
curl -X GET \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  "https://webrisk.googleapis.com/v1/hashes:search?threatTypes={threatTypes}"
```

## Notes

- Generated from the Discovery document(s) v1 of `webrisk` (retrieved 2026-11-14). Resources on this page: hashes, projects, threatLists, uris.
- The Required column is `yes` for path variables and required parameters, and `conditional` when the description says "Required if ..." (mutually exclusive alternatives), when a `parent.child` parameter is required only inside an optional parent message or one branch of a oneof. Path variables are `yes` unless a note below names an alternative route without them.
- Message schemas (the request and response types named above) are defined in the `schemas` section of the Discovery documents in Source.
- Deprecated (not in the Discovery document): the Submission API (`webrisk.projects.submissions.create`) is in a formal feature freeze and closed to new orders ahead of full deprecation no later than December 31, 2027; existing services stay operational until the end of the active contract (`web-risk/submission-api.md`, https://docs.cloud.google.com/web-risk/docs/submission-api). Do not use it for new integrations, despite the method description's pointer to Sales.
- Source: https://webrisk.googleapis.com/$discovery/rest?version=v1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
