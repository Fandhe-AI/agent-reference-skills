---
source: https://apikeys.googleapis.com/$discovery/rest?version=v2
---

# API Keys API REST API (apikeys)

## Signature / Usage

Base URL: `https://apikeys.googleapis.com`. Methods are listed by `id`; the `Versions` line shows which API versions define the method (preferred: v2).

### `apikeys.keys.lookupKey`

- Versions: v2
- `GET https://apikeys.googleapis.com/v2/keys:lookupKey`
- Find the parent project and resource name of the API key that matches the key string in the request. If the API key has been purged, resource name will not be set. The service account must have the `apikeys.keys.lookup` permission on the parent project.
- Scopes: `https://www.googleapis.com/auth/apikeys`, `https://www.googleapis.com/auth/apikeys.readonly`, `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: —; Response: `V2LookupKeyResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `keyString` | query | string | yes | Required. Finds the project that owns the key string value. |

### `apikeys.operations.get`

- Versions: v2
- `GET https://apikeys.googleapis.com/v2/{+name}`
- Gets the latest state of a long-running operation. Clients can use this method to poll the operation result at intervals as recommended by the API service.
- Scopes: `https://www.googleapis.com/auth/apikeys`, `https://www.googleapis.com/auth/apikeys.readonly`, `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | The name of the operation resource. |

### `apikeys.projects.locations.keys.create`

- Versions: v2
- `POST https://apikeys.googleapis.com/v2/{+parent}/keys`
- Creates a new API key. NOTE: Key is a global resource; hence the only supported value for location is `global`.
- Scopes: `https://www.googleapis.com/auth/apikeys`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `V2Key`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. The project in which the API key is created. The parent field must be in format of "projects//locations/global". |
| `keyId` | query | string | no | User specified key id (optional). If specified, it will become the final component of the key resource name. The id must be unique within the project, must conform with RFC-1034, is restricted to lower-cased letters, and has a maximum length of 63 characters. In another word, the id must match the regular expression: `[a-z]([a-z0-9-]{0,61}[a-z0-9])?`. The id must NOT be a UUID-like string. |

### `apikeys.projects.locations.keys.delete`

- Versions: v2
- `DELETE https://apikeys.googleapis.com/v2/{+name}`
- Deletes an API key. Deleted key can be retrieved within 30 days of deletion. Afterward, key will be purged from the project. NOTE: Key is a global resource; hence the only supported value for location is `global`.
- Scopes: `https://www.googleapis.com/auth/apikeys`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the API key to be deleted. |
| `checkExistingUsage` | query | string enum | no | Optional. Defines the behavior for checking existing usage when deleting a key. Values: `CHECK_EXISTING_USAGE_UNSPECIFIED`, `SKIP`, `CHECK`. |
| `etag` | query | string | no | Optional. The etag known to the client for the expected state of the key. This is to be used for optimistic concurrency. |

### `apikeys.projects.locations.keys.get`

- Versions: v2
- `GET https://apikeys.googleapis.com/v2/{+name}`
- Gets the metadata for an API key. The key string of the API key isn't included in the response. NOTE: Key is a global resource; hence the only supported value for location is `global`.
- Scopes: `https://www.googleapis.com/auth/apikeys`, `https://www.googleapis.com/auth/apikeys.readonly`, `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: —; Response: `V2Key`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the API key to get. |

### `apikeys.projects.locations.keys.getKeyString`

- Versions: v2
- `GET https://apikeys.googleapis.com/v2/{+name}/keyString`
- Get the key string for an API key. NOTE: Key is a global resource; hence the only supported value for location is `global`.
- Scopes: `https://www.googleapis.com/auth/apikeys`, `https://www.googleapis.com/auth/apikeys.readonly`, `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: —; Response: `V2GetKeyStringResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the API key to be retrieved. |

### `apikeys.projects.locations.keys.list`

- Versions: v2
- `GET https://apikeys.googleapis.com/v2/{+parent}/keys`
- Lists the API keys owned by a project. The key string of the API key isn't included in the response. NOTE: Key is a global resource; hence the only supported value for location is `global`.
- Scopes: `https://www.googleapis.com/auth/apikeys`, `https://www.googleapis.com/auth/apikeys.readonly`, `https://www.googleapis.com/auth/cloud-platform`, `https://www.googleapis.com/auth/cloud-platform.read-only`
- Request: —; Response: `V2ListKeysResponse`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Lists all API keys associated with this project. The parent field must be in format of "projects//locations/global". |
| `pageSize` | query | integer (int32) | no | Optional. Specifies the maximum number of results to be returned at a time. |
| `pageToken` | query | string | no | Optional. Requests a specific page of results. |
| `showDeleted` | query | boolean | no | Optional. Indicate that keys deleted in the past 30 days should also be returned. |

### `apikeys.projects.locations.keys.patch`

- Versions: v2
- `PATCH https://apikeys.googleapis.com/v2/{+name}`
- Patches the modifiable fields of an API key. The key string of the API key isn't included in the response. NOTE: Key is a global resource; hence the only supported value for location is `global`.
- Scopes: `https://www.googleapis.com/auth/apikeys`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `V2Key`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. The resource name of the key. The `name` has the form: `projects//locations/global/keys/`. For example: `projects/123456867718/locations/global/keys/b7ff1f9f-8275-410a-94dd-3855ee9b5dd2` NOTE: Key is a global resource; hence the only supported value for location is `global`. |
| `checkExistingUsage` | query | string enum | no | Optional. Defines the behavior for checking existing usage when updating a key. Values: `CHECK_EXISTING_USAGE_UNSPECIFIED`, `SKIP`, `CHECK`. |
| `updateMask` | query | string (google-fieldmask) | no | The field mask specifies which fields to be updated as part of this request. All other fields are ignored. Mutable fields are: `display_name`, `restrictions`, and `annotations`. If an update mask is not provided, the service treats it as an implied mask equivalent to all allowed fields that are set on the wire. If the field mask has a special value "\*", the service treats it equivalent to replace all allowed mutable fields. |

### `apikeys.projects.locations.keys.undelete`

- Versions: v2
- `POST https://apikeys.googleapis.com/v2/{+name}:undelete`
- Undeletes an API key which was deleted within 30 days. NOTE: Key is a global resource; hence the only supported value for location is `global`.
- Scopes: `https://www.googleapis.com/auth/apikeys`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `V2UndeleteKeyRequest`; Response: `Operation`

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. The resource name of the API key to be undeleted. |

### Example request skeleton

Generated from the Discovery entry of `apikeys.keys.lookupKey` (not in the official docs); replace the `{...}` path variables and required query parameters (URL-encode query values):

```bash
curl -X GET \
  -H "Authorization: Bearer $(gcloud auth print-access-token)" \
  "https://apikeys.googleapis.com/v2/keys:lookupKey?keyString={keyString}"
```

## Notes

- Generated from the Discovery document(s) v2 of `apikeys` (retrieved 2026-11-14). Resources on this page: keys, operations, projects.
- The Required column is `yes` for path variables and required parameters, and `conditional` when the description says "Required if ..." (mutually exclusive alternatives), when a `parent.child` parameter is required only inside an optional parent message or one branch of a oneof. Path variables are always `yes`.
- Message schemas (the request and response types named above) are listed under `references/rest-schemas/apikeys/`; they are the `schemas` section of the Discovery documents in Source.
- Descriptions are verbatim from Discovery, which drops angle-bracket placeholders of the source comments: a format such as `projects//locations/global` stands for `projects/{project}/locations/global` (likewise `"@.iam.gserviceaccount.com"` lost the account ID before `@`, and a name format ending in a collection such as `projects/*/locations/*/registrations/` lost its last ID), and an expression such as `... && in labels` lost its left operand (for example `'label_value' in labels`). Check the method or field in the product's REST reference before relying on such a format.
- Source: https://apikeys.googleapis.com/$discovery/rest?version=v2 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
