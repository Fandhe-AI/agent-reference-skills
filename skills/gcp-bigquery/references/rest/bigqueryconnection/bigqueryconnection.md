---
source: https://bigqueryconnection.googleapis.com/$discovery/rest?version=v1
---

# BigQuery Connection API REST API (bigqueryconnection)

## Signature / Usage

Base URL: `https://bigqueryconnection.googleapis.com`. Methods are listed by `id`; the `Versions` line shows which API versions define the method (preferred: v1). The URL, parameters and request / response types shown for a method come from the first version on its `Versions` line; for another version, see the Discovery document of that version under Source in Notes.

### `bigqueryconnection.projects.locations.connections.create`

- Versions: v1, v1beta1
- `POST https://bigqueryconnection.googleapis.com/v1/{+parent}/connections`
- Creates a new connection.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `Connection`; Response: `Connection`

### `bigqueryconnection.projects.locations.connections.delete`

- Versions: v1, v1beta1
- `DELETE https://bigqueryconnection.googleapis.com/v1/{+name}`
- Deletes connection and associated credential.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Empty`

### `bigqueryconnection.projects.locations.connections.get`

- Versions: v1, v1beta1
- `GET https://bigqueryconnection.googleapis.com/v1/{+name}`
- Returns specified connection.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Connection`

### `bigqueryconnection.projects.locations.connections.getIamPolicy`

- Versions: v1, v1beta1
- `POST https://bigqueryconnection.googleapis.com/v1/{+resource}:getIamPolicy`
- Gets the access control policy for a resource. Returns an empty policy if the resource exists and does not have a policy set.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `GetIamPolicyRequest`; Response: `Policy`

### `bigqueryconnection.projects.locations.connections.list`

- Versions: v1, v1beta1
- `GET https://bigqueryconnection.googleapis.com/v1/{+parent}/connections`
- Returns a list of connections in the parent `projects/{projectsId}/locations/{locationsId}`. (Corrected from the Discovery document; the original description is quoted in Notes.)
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListConnectionsResponse`

### `bigqueryconnection.projects.locations.connections.patch`

- Versions: v1, v1beta1
- `PATCH https://bigqueryconnection.googleapis.com/v1/{+name}`
- Updates the specified connection. For security reasons, also resets credential if connection properties are in the update field mask.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `Connection`; Response: `Connection`

### `bigqueryconnection.projects.locations.connections.setIamPolicy`

- Versions: v1, v1beta1
- `POST https://bigqueryconnection.googleapis.com/v1/{+resource}:setIamPolicy`
- Sets the access control policy on the specified resource. Replaces any existing policy. Can return `NOT_FOUND`, `INVALID_ARGUMENT`, and `PERMISSION_DENIED` errors.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `SetIamPolicyRequest`; Response: `Policy`

### `bigqueryconnection.projects.locations.connections.testIamPermissions`

- Versions: v1, v1beta1
- `POST https://bigqueryconnection.googleapis.com/v1/{+resource}:testIamPermissions`
- Returns permissions that a caller has on the specified resource. If the resource does not exist, this will return an empty set of permissions, not a `NOT_FOUND` error. Note: This operation is designed to be used for building permission-aware UIs and command-line tools, not for authorization checking. This operation may "fail open" without warning.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `TestIamPermissionsRequest`; Response: `TestIamPermissionsResponse`

### `bigqueryconnection.projects.locations.connections.updateCredential`

- Versions: v1beta1
- `PATCH https://bigqueryconnection.googleapis.com/v1beta1/{+name}`
- Sets the credential for the specified connection.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `ConnectionCredential`; Response: `Empty`

### Example request line

Generated from the Discovery entry of `bigqueryconnection.projects.locations.connections.get` (not in the official docs); replace the `{...}` path variables (URL-encode query values). The request needs an OAuth 2.0 access token in an `Authorization: Bearer` header; the Google Cloud client libraries (the gcp-client-libraries skill) obtain and send it:

```http
GET https://bigqueryconnection.googleapis.com/v1/{+name}
```

## Options / Props

### `bigqueryconnection.projects.locations.connections.create` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Parent resource name. Must be in the format `projects/{project_id}/locations/{location_id}` |
| `connectionId` | query | string | no | Optional. Connection id that should be assigned to the created connection. |

### `bigqueryconnection.projects.locations.connections.delete` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the deleted connection, for example: `projects/{project_id}/locations/{location_id}/connections/{connection_id}` |

### `bigqueryconnection.projects.locations.connections.get` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the requested connection, for example: `projects/{project_id}/locations/{location_id}/connections/{connection_id}` |

### `bigqueryconnection.projects.locations.connections.getIamPolicy` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. Format for this method (from its `flatPath`): `projects/{projectsId}/locations/{locationsId}/connections/{connectionsId}`. |

### `bigqueryconnection.projects.locations.connections.list` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Parent resource name. Must be in the form: `projects/{project_id}/locations/{location_id}` |
| `pageSize` | query | integer (int32) | yes | Required. Page size. |
| `pageToken` | query | string | no | Page token. |

### `bigqueryconnection.projects.locations.connections.patch` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the connection to update, for example: `projects/{project_id}/locations/{location_id}/connections/{connection_id}` |
| `updateMask` | query | string (google-fieldmask) | yes | Required. Update mask for the connection fields to be updated. |

### `bigqueryconnection.projects.locations.connections.setIamPolicy` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. Format for this method (from its `flatPath`): `projects/{projectsId}/locations/{locationsId}/connections/{connectionsId}`. |

### `bigqueryconnection.projects.locations.connections.testIamPermissions` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. Format for this method (from its `flatPath`): `projects/{projectsId}/locations/{locationsId}/connections/{connectionsId}`. |

### `bigqueryconnection.projects.locations.connections.updateCredential` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Name of the connection, for example: `projects/{project_id}/locations/{location_id}/connections/{connection_id}/credential` |

## Notes

- Generated from the Discovery document(s) v1, v1beta1 of `bigqueryconnection` (retrieved 2026-11-14). Resources on this page: projects.
- The Required column is `yes` for path variables and required parameters, and `conditional` when the description says "Required if ..." (mutually exclusive alternatives), when a `parent.child` parameter is required only inside an optional parent message or one branch of a oneof, or when the description says that some requests must specify it (for example, `options.requestedPolicyVersion` must be 3 to get a policy with conditional role bindings). Path variables are `yes` unless a note below names an alternative route without them.
- Message schemas (the request and response types named above) are defined in the `schemas` section of the Discovery documents in Source.
- Corrected from the Discovery document: the description of `bigqueryconnection.projects.locations.connections.list` is "Returns a list of connections in the given project.", but the path pattern of `parent` is `^projects/[^/]+/locations/[^/]+$`, so a call covers only that parent; the summary of this method on this page names that parent.
- Source: https://bigqueryconnection.googleapis.com/$discovery/rest?version=v1, https://bigqueryconnection.googleapis.com/$discovery/rest?version=v1beta1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
