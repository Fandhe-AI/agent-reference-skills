---
source: https://bigquerydatapolicy.googleapis.com/$discovery/rest?version=v2
---

# BigQuery Data Policy API REST API (bigquerydatapolicy)

## Signature / Usage

Base URL: `https://bigquerydatapolicy.googleapis.com`. Methods are listed by `id`; the `Versions` line shows which API versions define the method (preferred: v2). The URL, parameters and request / response types shown for a method come from the first version on its `Versions` line; for another version, see the Discovery document of that version under Source in Notes.

### `bigquerydatapolicy.projects.locations.dataPolicies.addGrantees`

- Versions: v2
- `POST https://bigquerydatapolicy.googleapis.com/v2/{+dataPolicy}:addGrantees`
- Adds new grantees to a data policy. The new grantees will be added to the existing grantees. If the request contains a duplicate grantee, the grantee will be ignored. If the request contains a grantee that already exists, the grantee will be ignored.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `AddGranteesRequest`; Response: `DataPolicy`

### `bigquerydatapolicy.projects.locations.dataPolicies.create`

- Versions: v2, v1
- `POST https://bigquerydatapolicy.googleapis.com/v2/{+parent}/dataPolicies`
- Creates a new data policy in the parent `projects/{projectsId}/locations/{locationsId}` with the given `data_policy_id` (used as the display name), and data policy type. (Corrected from the Discovery document; the original description is quoted in Notes.)
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `CreateDataPolicyRequest`; Response: `DataPolicy`

### `bigquerydatapolicy.projects.locations.dataPolicies.delete`

- Versions: v2, v1
- `DELETE https://bigquerydatapolicy.googleapis.com/v2/{+name}`
- Deletes the data policy specified by its resource name.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `Empty`

### `bigquerydatapolicy.projects.locations.dataPolicies.get`

- Versions: v2, v1
- `GET https://bigquerydatapolicy.googleapis.com/v2/{+name}`
- Gets the data policy specified by its resource name.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `DataPolicy`

### `bigquerydatapolicy.projects.locations.dataPolicies.getIamPolicy`

- Versions: v2, v1
- `POST https://bigquerydatapolicy.googleapis.com/v2/{+resource}:getIamPolicy`
- Gets the IAM policy for the specified data policy.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `GetIamPolicyRequest`; Response: `Policy`

### `bigquerydatapolicy.projects.locations.dataPolicies.list`

- Versions: v2, v1
- `GET https://bigquerydatapolicy.googleapis.com/v2/{+parent}/dataPolicies`
- List all of the data policies in the parent `projects/{projectsId}/locations/{locationsId}`. (Corrected from the Discovery document; the original description is quoted in Notes.)
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: —; Response: `ListDataPoliciesResponse`

### `bigquerydatapolicy.projects.locations.dataPolicies.patch`

- Versions: v2, v1
- `PATCH https://bigquerydatapolicy.googleapis.com/v2/{+name}`
- Updates the metadata for an existing data policy. The target data policy can be specified by the resource name.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `DataPolicy`; Response: `DataPolicy`

### `bigquerydatapolicy.projects.locations.dataPolicies.removeGrantees`

- Versions: v2
- `POST https://bigquerydatapolicy.googleapis.com/v2/{+dataPolicy}:removeGrantees`
- Removes grantees from a data policy. The grantees will be removed from the existing grantees. If the request contains a grantee that does not exist, the grantee will be ignored.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `RemoveGranteesRequest`; Response: `DataPolicy`

### `bigquerydatapolicy.projects.locations.dataPolicies.rename`

- Versions: v1
- `POST https://bigquerydatapolicy.googleapis.com/v1/{+name}:rename`
- Renames the id (display name) of the specified data policy.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `RenameDataPolicyRequest`; Response: `DataPolicy`

### `bigquerydatapolicy.projects.locations.dataPolicies.setIamPolicy`

- Versions: v2, v1
- `POST https://bigquerydatapolicy.googleapis.com/v2/{+resource}:setIamPolicy`
- Sets the IAM policy for the specified data policy.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `SetIamPolicyRequest`; Response: `Policy`

### `bigquerydatapolicy.projects.locations.dataPolicies.testIamPermissions`

- Versions: v2, v1
- `POST https://bigquerydatapolicy.googleapis.com/v2/{+resource}:testIamPermissions`
- Returns the caller's permission on the specified data policy resource.
- Scopes: `https://www.googleapis.com/auth/bigquery`, `https://www.googleapis.com/auth/cloud-platform`
- Request: `TestIamPermissionsRequest`; Response: `TestIamPermissionsResponse`

### Example request line

Generated from the Discovery entry of `bigquerydatapolicy.projects.locations.dataPolicies.get` (not in the official docs); replace the `{...}` path variables (URL-encode query values). The request needs an OAuth 2.0 access token in an `Authorization: Bearer` header; the Google Cloud client libraries (the gcp-client-libraries skill) obtain and send it:

```http
GET https://bigquerydatapolicy.googleapis.com/v2/{+name}
```

## Options / Props

### `bigquerydatapolicy.projects.locations.dataPolicies.addGrantees` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `dataPolicy` | path | string | yes | Required. Resource name of this data policy, in the format of `projects/{project_number}/locations/{location_id}/dataPolicies/{data_policy_id}`. |

### `bigquerydatapolicy.projects.locations.dataPolicies.create` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Resource name of the project that the data policy will belong to. The format is `projects/{project_number}/locations/{location_id}`. |

### `bigquerydatapolicy.projects.locations.dataPolicies.delete` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Resource name of the data policy to delete. Format is `projects/{project_number}/locations/{location_id}/dataPolicies/{id}`. |

### `bigquerydatapolicy.projects.locations.dataPolicies.get` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Resource name of the requested data policy. Format is `projects/{project_number}/locations/{location_id}/dataPolicies/{id}`. |

### `bigquerydatapolicy.projects.locations.dataPolicies.getIamPolicy` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. Format for this method (from its `flatPath`): `projects/{projectsId}/locations/{locationsId}/dataPolicies/{dataPoliciesId}`. |

### `bigquerydatapolicy.projects.locations.dataPolicies.list` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `parent` | path | string | yes | Required. Resource name of the project for which to list data policies. Format is `projects/{project_number}/locations/{location_id}`. |
| `filter` | query | string | no | Optional. Filters the data policies by policy tags that they are associated with. Currently filter only supports "policy_tag" based filtering and OR based predicates. Sample filter can be "policy_tag: projects/1/locations/us/taxonomies/2/policyTags/3". You may also use wildcard such as "policy_tag: projects/1/locations/us/taxonomies/2\*". Please note that OR predicates cannot be used with wildcard filters. |
| `pageSize` | query | integer (int32) | no | Optional. The maximum number of data policies to return. Must be a value between 1 and 1000. If not set, defaults to 50. |
| `pageToken` | query | string | no | Optional. The `nextPageToken` value returned from a previous list request, if any. If not set, defaults to an empty string. |

### `bigquerydatapolicy.projects.locations.dataPolicies.patch` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Identifier. Resource name of this data policy, in the format of `projects/{project_number}/locations/{location_id}/dataPolicies/{data_policy_id}`. |
| `allowMissing` | query | boolean | no | Optional. If set to true, and the data policy is not found, a new data policy will be created. In this situation, update_mask is ignored. |
| `updateMask` | query | string (google-fieldmask) | no | Optional. The update mask applies to the resource. For the `FieldMask` definition, see https://developers.google.com/protocol-buffers/docs/reference/google.protobuf#fieldmask If not set, defaults to all of the fields that are allowed to update. Updates to the `name` and `dataPolicyId` fields are not allowed. |

### `bigquerydatapolicy.projects.locations.dataPolicies.removeGrantees` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `dataPolicy` | path | string | yes | Required. Resource name of this data policy, in the format of `projects/{project_number}/locations/{location_id}/dataPolicies/{data_policy_id}`. |

### `bigquerydatapolicy.projects.locations.dataPolicies.rename` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `name` | path | string | yes | Required. Resource name of the data policy to rename. The format is `projects/{project_number}/locations/{location_id}/dataPolicies/{data_policy_id}` |

### `bigquerydatapolicy.projects.locations.dataPolicies.setIamPolicy` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy is being specified. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. Format for this method (from its `flatPath`): `projects/{projectsId}/locations/{locationsId}/dataPolicies/{dataPoliciesId}`. |

### `bigquerydatapolicy.projects.locations.dataPolicies.testIamPermissions` parameters

| Parameter | In | Type | Required | Description |
|---|---|---|---|---|
| `resource` | path | string | yes | REQUIRED: The resource for which the policy detail is being requested. See Resource names (https://cloud.google.com/apis/design/resource_names) for the appropriate value for this field. Format for this method (from its `flatPath`): `projects/{projectsId}/locations/{locationsId}/dataPolicies/{dataPoliciesId}`. |

## Notes

- Generated from the Discovery document(s) v2, v1 of `bigquerydatapolicy` (retrieved 2026-11-14). Resources on this page: projects.
- The Required column is `yes` for path variables and required parameters, and `conditional` when the description says "Required if ..." (mutually exclusive alternatives), when a `parent.child` parameter is required only inside an optional parent message or one branch of a oneof, or when the description says that some requests must specify it (for example, `options.requestedPolicyVersion` must be 3 to get a policy with conditional role bindings). Path variables are `yes` unless a note below names an alternative route without them.
- Message schemas (the request and response types named above) are listed under `references/rest-schemas/bigquerydatapolicy/`; they are the `schemas` section of the Discovery documents in Source.
- Corrected from the Discovery document: the description of `bigquerydatapolicy.projects.locations.dataPolicies.create` is "Creates a new data policy under a project with the given `data_policy_id` (used as the display name), and data policy type.", but the path pattern of `parent` is `^projects/[^/]+/locations/[^/]+$`, so a call covers only that parent; the summary of this method on this page names that parent.
- Corrected from the Discovery document: the description of `bigquerydatapolicy.projects.locations.dataPolicies.list` is "List all of the data policies in the specified parent project.", but the path pattern of `parent` is `^projects/[^/]+/locations/[^/]+$`, so a call covers only that parent; the summary of this method on this page names that parent.
- Source: https://bigquerydatapolicy.googleapis.com/$discovery/rest?version=v2, https://bigquerydatapolicy.googleapis.com/$discovery/rest?version=v1 (https://developers.google.com/discovery)

## Related

- [README.md](./README.md)
